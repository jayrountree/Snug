"use client";
import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import weaviate from "weaviate-ts-client";

const Page = () => {
  const [fileContent, setFileContent] = useState(null);
  const [tags, setTags] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileRead = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64String = fileReader.result;
      setFileContent(
        base64String?.toString().substring("data:image/jpeg;base64,".length)
      );
    };
    fileReader.readAsDataURL(file);
  };

  const handleFileChosen = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080",
  });

  async function uploadImage() {
    const res = await client.data
      .creator()
      .withClassName("Image")
      .withProperties({ image: fileContent, name: fileName, tags: tags })
      .do();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" text-2xl py-4">Upload your own image! </h1>

      <div className="flex flex-col justify-center">
        <FormControl>
          <Text mt="8px">File Name</Text>

          <Input onChange={(e) => setFileName(e.target.value)} />
          <Text mt="8px">Choose Image</Text>

          <Input type="file" accept="image/*" onChange={handleFileChosen} />
          <Text mt="8px">Add Tags</Text>

          <Searchbar setSearchWords={setTags} />
          <Button
            onClick={async () => await uploadImage()}
            size="lg"
            width={"100%"}
            colorScheme="green"
          >
            Post Image!
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Page;
