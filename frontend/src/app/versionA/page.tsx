"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Searchbar from "../components/Searchbar";
import StarButton from "../components/StarButton";
import ThemeTag from "../components/ThemeTag";
import weaviate from "weaviate-ts-client";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const hsl = require("hsl-to-hex");

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

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
  // const db = getFirestore();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showSelected, setShowSelected] = useState(false);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await readImages());
    };

    fetchData();
  }, []);

  async function readImages() {
    const query = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image name tags")
      .do();
    return query.data.Get.Image;
  }

  async function queryTags(tags) {
    const res = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image name tags")
      .withWhere({
        path: ["tags"],
        operator: "ContainsAll",
        valueTextArray: tags,
      })
      .do();

    // console.log(res.data.Get);
    setData(res.data.Get.Image);
    // res.data.Get.Image((i) => console.log(i.name, i.tags));
  }

  useEffect(() => {
    const fetchData = async () => {
      setData(await readImages());
    };

    if (tags.length != 0) {
      // Filter posts based on tags
      queryTags(tags);
    } else {
      fetchData();
    }
  }, [tags]);

  // let u: string[] = [];
  // data.map((i) => {
  //   if (i.tags) {
  //     i.tags.map((j) => {
  //       if (!u.includes(j)) {
  //         u.push(j);
  //       }
  //     });
  //   }
  // });
  // console.log(u);

  function render() {
    let dispData = data;
    if (showSelected) {
      dispData = data.filter((item) => selected.includes(item.name));
    }
    return dispData.map((i, index) => (
      <div className="flex flex-col justify-center items-center " key={index}>
        <div className=" flex justify-center">
          <p>{"Posted by: " + "@akshath.taduri"}</p>
        </div>
        <img
          onClick={() => console.log(i.image)}
          className=" rounded-md max-w-xs"
          src={`data:image/png;base64,${i.image}`}
          alt={i.name}
        />
        <div className="max-w-xs style-tags flex flex-wrap items-center justify-center">
          <button className=" flex justify-center p-4">
            {selected.includes(i.name) ? (
              <StarIcon
                color={"yellow.500"}
                onClick={() =>
                  setSelected(selected.filter((item) => i.name != item))
                }
              />
            ) : (
              <StarIcon onClick={() => setSelected([...selected, i.name])} />
            )}
          </button>
          {i.tags &&
            i.tags.map((tag, index) => <ThemeTag key={index} tag={tag} />)}
        </div>
      </div>
    ));
  }

  return (
    <div>
      <div className="flex py-2 justify-center items-center">
        <Searchbar setSearchWords={setTags}></Searchbar>
        {/* <button onClick={() => queryTag("plants")}>Click</button> */}

        <Button onClick={() => setShowSelected(!showSelected)}>
          {showSelected ? "Show All" : "Show Favorites"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
        {render()}
      </div>
    </div>
  );
};

export default Home;
