"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Searchbar from "./components/Searchbar";
import StarButton from "./components/StarButton";
import ThemeTag from "./components/ThemeTag";
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
  const [queryImage, setQueryImage] = useState(["", ""]); //[name, image]
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showSelected, setShowSelected] = useState(false);

  const [tags, setTags] = useState([]);

  const users = ["akshath.taduri", "jay.rountree", "shivab", "luke.knight"];

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

  async function queryImage1(base64: string = "") {
    const resImage = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image tags name _additional {id certainty distance}")
      .withNearImage({ image: base64 })

      .do();

    setData(
      resImage.data.Get.Image.filter((i) => {
        return i.name != queryImage[0];
      })
    );
  }

  async function queryImage2(base64: string = "", tags: string[] = []) {
    const resImage = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image tags name _additional {id certainty distance}")
      .withNearImage({ image: base64 })
      .withWhere({
        path: ["tags"],
        operator: "ContainsAll",
        valueTextArray: tags,
      })
      .do();

    setData(
      resImage.data.Get.Image.filter((i) => {
        return i.name != queryImage[0];
      })
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setData(await readImages());
    };
    if (tags.length != 0 && queryImage[0] != "") {
      queryImage2(queryImage[1], tags);
    } else if (tags.length != 0) {
      // Filter posts based on tags
      queryTags(tags);
    } else if (queryImage[0] != "") {
      queryImage1(queryImage[1]);
    } else {
      fetchData();
    }
  }, [tags, queryImage]);

  function render() {
    let dispData = data;
    if (showSelected) {
      dispData = data.filter((item) => selected.includes(item.name));
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center">
        {dispData.map((i, index) => (
          <div
            className="relative flex flex-col justify-end items-end "
            key={index}
          >
            <img
              className="rounded-lg object-cover h-60 w-60 hover:cursor-pointer"
              src={`data:image/png;base64,${i.image}`}
              alt={i.name}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Optional, adds smooth scrolling effect
                });
                setQueryImage([i.name, i.image]);
              }}
            />
            <div className="max-w-xs style-tags flex flex-col  items-end justify-center">
              <div className="flex justify-center items-center gap-4">
                <p className=" text-brown">
                  {i._additional &&
                    (i._additional.certainty * 100).toFixed(2) + "%"}
                </p>
                <button className=" flex justify-between w-full p-4">
                  {selected.includes(i.name) ? (
                    <StarIcon
                      color={"yellow.500"}
                      onClick={() =>
                        setSelected(selected.filter((item) => i.name != item))
                      }
                    />
                  ) : (
                    <StarIcon
                      onClick={() => setSelected([...selected, i.name])}
                    />
                  )}
                </button>
              </div>
              <div className=" flex justify-end items-center flex-wrap">
                {i.tags &&
                  i.tags.map((tag, index) => (
                    <ThemeTag key={index} tag={tag} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex py-2 justify-center items-center border-b-2  border-b-beige">
        <div className="flex w-full justify-center ">
          {queryImage[1] != "" && (
            <img
              width={200}
              className=" h-32 w-40 rounded-md max-w-xs"
              onClick={() => {
                setQueryImage(["", ""]);
              }}
              src={`data:image/png;base64,${queryImage[1]}`}
              alt=""
            />
          )}
        </div>
        <div className="flex justify-center items-center">
          <Searchbar setSearchWords={setTags}></Searchbar>

          <Button onClick={() => setShowSelected(!showSelected)}>
            {showSelected ? "Show All" : "Show Favorites"}
          </Button>
        </div>
      </div>

      <div className=" py-4">{render()}</div>
    </div>
  );
};

export default Home;

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
