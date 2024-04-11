import React from "react";
import { getFirestore } from "firebase/firestore";
import jsonData from "../assets/posts.json";

const Home = () => {

  // const db = getFirestore();

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {jsonData.posts.map((i) => (
        <img className=" rounded-md max-w-xs" src={i.image} alt="" srcset="" />
      ))}
    </div>
  );
};

export default Home;
