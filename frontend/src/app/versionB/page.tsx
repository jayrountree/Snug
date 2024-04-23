import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import weaviate from "weaviate-ts-client";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useFavoritedImages } from "../FavoritedImagesContext";

interface Image {
  name: string;
  image: string;
  _additional?: {
    certainty: number;
  };
}

const Home: React.FC = () => {
  const db = getFirestore();
  const [data, setData] = useState<Image[]>([]);
  const [queryImage, setQueryImage] = useState<[string, string]>(["", ""]); //[name, image]
  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080",
  });
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { favoritedImages, addFavoritedImage, removeFavoritedImage } = useFavoritedImages();

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

    if (queryImage[0] !== "") {
      queryImage1(queryImage[1]);
    } else {
      fetchData();
    }
  }, [queryImage]);

  async function readImages(): Promise<Image[]> {
    const query = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image name ")
      .do();
    return query.data.Get.Image.map((d: any) => d);
  }

  async function queryImage1(base64: string) {
    const resImage = await client.graphql
      .get()
      .withClassName("Image")
      .withFields("image name _additional {id certainty distance}")
      .withNearImage({ image: base64 })
      .do();

    setData(
      resImage.data.Get.Image.filter((i: any) => i.name !== queryImage[0])
    );
  }

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
              className="relative flex flex-col justify-end items-end"
              key={index}
            >
              <div className="flex justify-between w-full">
                <p className="text-brown">
                  {i._additional && i._additional.certainty}
                </p>

                <button onClick={() => {
                  if (selected.includes(i.name)) {
                    setSelected(selected.filter((item) => i.name !== item));
                    removeFavoritedImage(i.name);
                  } else {
                    setSelected([...selected, i.name]);
                    addFavoritedImage(i);
                  }
                }}>
                  <StarIcon color={selected.includes(i.name) ? "yellow.500" : undefined} />
                </button>
              </div>

              <img
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });

                  setQueryImage([i.name, i.image]);
                }}
                className="rounded-lg object-cover h-60 w-60 hover:cursor-pointer"
                src={`data:image/png;base64,${i.image}`}
                alt=""
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
          className="rounded-md max-w-xs"
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
          {renderImages()}
        </div>
      </div>
    </div>
  );
};

export default Home;
