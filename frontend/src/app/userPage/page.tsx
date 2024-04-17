"use client";
import { HStack, VStack, Box, Text } from "@chakra-ui/react"
import { FaRegUser, FaRegBookmark } from "react-icons/fa";
import UserInfo from "../components/UserInfo"
import PostGroup from "../components/PostGroup";
import { myPosts, savedPosts } from "./postData"

export interface UserData {
    username: string;
    image: string;
    bio: string;
}

const testUserData = {
    username: "Dwayne Johnson",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg/220px-Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg",
    bio: "📚 Studying CS | 🏀 Basketball enthusiast | 🎸 Guitar player | 🎮 Gamer | Always up for new adventures! 🌟\n\"Trust in the Lord with all your heart; do not depend on your own understanding. Seek his will in all you do, and he will show you which path to take.\" - Proverbs 3:5-6 🙏",
}

const User = () => {

  return (
    <HStack align="flex-begin" w="100%">
        <UserInfo userData={testUserData}></UserInfo>
        <VStack>
            <PostGroup 
                title="My Posts"
                icon={FaRegUser}
                posts={myPosts}
                color={"red"}
            />
            <PostGroup 
                title="Saved Posts"
                icon={FaRegBookmark}
                posts={savedPosts}
                color={"green"}
            />
        </VStack>
    </HStack>
  );
};

export default User;