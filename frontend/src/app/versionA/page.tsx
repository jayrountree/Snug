"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Searchbar from "../components/Searchbar";
import LikeButton from "../components/LikeButton";
import StarButton from "../components/StarButton";

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

  const [searchWords, setSearchWords] = useState([""]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all posts initially
      const querySnapshot = await getDocs(collection(db, "all-posts"));
      const allPosts = querySnapshot.docs.map((doc) => doc.data() as PostInterface);

      if (!search.trim()) {
        setData(allPosts);
      } else {
        // Filter posts based on tags
        const q = query(collection(db, "all-posts"), where('itemTags', 'array-contains-any', search.trim().split(' ')));
        const filteredQuerySnapshot = await getDocs(q);
        const filteredPosts = filteredQuerySnapshot.docs.map((doc) => doc.data() as PostInterface);
        setData(filteredPosts);
      }
    };

    fetchData();
  }, [db, searchWords]);

  console.log(data);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Searchbar search={search} setSearch={setSearch} setSearchWords={setSearchWords}></Searchbar>

      {data.map((i, index) => (
        <div className="bg-white p-4 rounded-md post">
          <div className="my-2 username">{"Posted by: " + i.user}</div>
          <img
            key={index}
            className=" rounded-md max-w-xs"
            src={i.image as string}
            alt={i.imageName}
          />
          <div className="flex flex-row justfy-center justify-between buttons my-4">
            <div className="likes">
              <LikeButton />
              <div className="font-bold like-count">{i.likes + " likes"}</div>
            </div>
            <div className="star">
              <StarButton />
            </div>
          </div>
          <div className="style-tags max-w-xs">{"Styles: " + i.themeTags.join(", ")}</div>
          <div className="item-tags max-w-xs">{"Items: " + i.itemTags.join(", ")}</div>
        </div>
      ))
      }
    </div>
  );
};

export default Home;
