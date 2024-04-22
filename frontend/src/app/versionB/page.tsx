"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { PostInterface } from "../versionA/page";
import weaviate from "weaviate-ts-client";
import { graphql } from "graphql";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const db = getFirestore();
  const [data, setData] = useState([]);
  const [queryImage, setQueryImage] = useState(["", ""]); //[name, image]
  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080",
  });
  const [showSelected, setShowSelected] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await readImages());
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setData(await readImages());
    };

    if (queryImage[0] != "") {
      queryImage1(queryImage[1]);
    } else {
      fetchData();
    }
  }, [queryImage]);

  async function readImages() {
    const query = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image name ")
      .do();
    return query.data.Get.Image.map((d) => {
      return d;
    });
  }

  async function queryImage1(base64: string) {
    const resImage = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image name _additional {id certainty distance}")
      .withNearImage({ image: base64 })
      .withWhere({
        path: ["tags"],
        operator: "ContainsAll",
        valueTextArray: ["gaming"],
      })
      .do();

    setData(
      resImage.data.Get.Image.filter((i) => {
        return i.name != queryImage[0];
      })
    );
  }

  // console.log(data);

  function renderImages() {
    let dispData = data;
    if (showSelected) {
      dispData = data.filter((item) => selected.includes(item.name));
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center">
        {dispData.map((i, index) => {
          return (
            <div
              className="relative flex flex-col justify-end items-end "
              key={index}
            >
              <div className="flex justify-between w-full ">
                <p className=" text-brown">
                  {i._additional && i._additional.certainty}
                </p>

                <button>
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

              <img
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Optional, adds smooth scrolling effect
                  });

                  setQueryImage([i.name, i.image]);
                }}
                className="rounded-lg object-cover h-60 w-60 hover:cursor-pointer"
                src={`data:image/png;base64,${i.image}`}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex w-full justify-center py-4 border-b-2  border-b-beige">
        <img
          width={200}
          className=" rounded-md max-w-xs"
          onClick={() => setQueryImage(["", ""])}
          src={`data:image/png;base64,${queryImage[1]}`}
          alt=""
        />
      </div>
      <div className="py-4">
        <div className="w-full flex justify-center py-2">
          <Button onClick={() => setShowSelected(!showSelected)}>
            {showSelected ? "Show All" : "Show Favorites"}
          </Button>
        </div>
        <div className="">
          {/* {data.map((i, index) => {
            return (
              <div
                className="relative flex flex-col justify-end items-end "
                key={index}
              >
                <button>
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
                <img
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Optional, adds smooth scrolling effect
                    });
                    setQueryImage([i.name, i.image]);
                  }}
                  className="rounded-lg object-cover h-60 w-60 hover:cursor-pointer"
                  src={`data:image/png;base64,${i.image}`}
                />
              </div>
            );
          })} */}
          {renderImages()}
        </div>
      </div>
    </div>
  );
};

export default Home;
