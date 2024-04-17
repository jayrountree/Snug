"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Searchbar from "../components/Searchbar";
import LikeButton from "../components/LikeButton";
import StarButton from "../components/StarButton";
import ThemeTag from "../components/ThemeTag";

const hsl = require('hsl-to-hex');

export interface PostInterface {
  imageName: string;
  image: string;
  themeTags: string[];
  itemTags: string[];
  likes: number;
  user: string;
  timePosted: number;
}

const Home = () => {
  const db = getFirestore();
  const [data, setData] = useState<PostInterface[]>([]);

  const [searchWords, setSearchWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all posts initially
      const querySnapshot = await getDocs(collection(db, "all-posts"));
      const allPosts = querySnapshot.docs.map((doc) => doc.data() as PostInterface);

      if (searchWords.length == 0) {
        setData(allPosts);
      } else {
        // Filter posts based on tags
        const q = query(collection(db, "all-posts"), where('itemTags', 'array-contains-any', searchWords));
        const filteredQuerySnapshot = await getDocs(q);
        const filteredPosts = filteredQuerySnapshot.docs.map((doc) => doc.data() as PostInterface);
        setData(filteredPosts);
      }
    };

    fetchData();
  }, [db, searchWords]);

  // console.log(data);

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Searchbar setSearchWords={setSearchWords}></Searchbar>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
      
    
      {data.map((i, index) => (
        <div className="bg-white p-4 rounded-md post" key={index}>
          <div className="my-2 username">{"Posted by: " + i.user}</div>
          <img
            className=" rounded-md max-w-xs"
            src={i.image as string}
            alt={i.imageName}
          />
          <div className="flex flex-row justfy-center justify-between my-4 buttons">
            <div className="likes">
              <LikeButton />
              <div className="font-bold like-count">{i.likes + " likes"}</div>
            </div>
            <div className="star">
              <StarButton />
            </div>
          </div>
          <div className="max-w-xs style-tags">
            {
              i.themeTags.map(tag => 
              <ThemeTag
                key={i.themeTags.indexOf(tag)}
                tag={tag}
              />)
            }
          </div>
        </div>
      ))
      }
    </div>
    </div>
    
  );
};

export default Home;
