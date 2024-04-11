"use client";
import React, { useContext } from "react";
import { getFirestore } from "firebase/firestore";
import jsonData from "../assets/posts.json";
import { FirebaseContext } from "../layout";

const Home = () => {
  const app = useContext(FirebaseContext);
  const db = getFirestore();

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {jsonData.posts.map((i) => (
        <img className=" rounded-md max-w-xs" src={i.image} alt="" srcset="" />
      ))}
    </div>
  );
};

export default Home;
