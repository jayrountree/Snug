"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

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
      <div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => {
          setSearchWords(search.split(' '));
        }}>Search</button>
      </div>
      
      {data.map((i, index) => (
        <img
          key={index}
          className=" rounded-md max-w-xs"
          src={i.image as string}
          alt={i.imageName}
        />
      ))}
    </div>
  );
};

export default Home;
