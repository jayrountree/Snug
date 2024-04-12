"use client"
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; 
import { collection, getDocs, getFirestore, DocumentData } from "firebase/firestore";
import { PostInterface } from "../versionA/page";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

const PostDetailModal = dynamic(() => import("./PostDetailModal"), { ssr: false });

const Home: React.FC = () => {
  const db = getFirestore();
  const [data, setData] = useState<PostInterface[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostInterface | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "all-posts"));
        const newData: PostInterface[] = querySnapshot.docs.map(
          (doc: DocumentData) => doc.data() as PostInterface
        );
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (post: PostInterface) => {
    setSelectedPost(post);
    onOpen();
  };

  const closeModal = () => {
    onClose();
  };

  // Function to generate random grid item size
  const getRandomGridSize = () => {
    return Math.floor(Math.random() * 2) + 1; // Returns 1 or 2
  };

  // Generate an array of random numbers to represent column spans for each item
  const columnSpans = data.map(() => getRandomGridSize());

  return (
    <div className="grid grid-cols-3 gap-2" style={{ gridAutoRows: "auto" }}>
      {data.map((post: PostInterface, index: number) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => openModal(post)}
          style={{
            gridColumnEnd: `span ${columnSpans[index]}`,
          }}
        >
          <img
            className="w-full max-h-300 object-cover rounded-md"
            src={post.image as string}
            alt={post.imageName}
          />
        </div>
      ))}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPost?.imageName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img
              className="w-full h-auto rounded-md mb-4"
              src={selectedPost?.image}
              alt={selectedPost?.imageName}
            />
            <p>{selectedPost?.user}</p>
            <p>{selectedPost?.likes}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
