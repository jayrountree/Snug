"use client";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
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

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "all-posts"));
      const newData = querySnapshot.docs.map(
        (doc) => doc.data() as PostInterface
      );
      setData(newData);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
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
