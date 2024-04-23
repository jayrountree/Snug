import { Card, CardBody } from "@chakra-ui/card";
import { Text, Heading, Image, AspectRatio, Flex, Spacer, Stack } from "@chakra-ui/react";
import { UserData } from '../userPage/page'

const UserInfo = ({userData}) => {
    return(
        <Stack width="xs" textAlign="center" m={4}>
            <AspectRatio ratio={1} width="xs">
                <Image 
                    src={userData.image} 
                    alt="user's profile image"
                    borderRadius="full"/>
            </AspectRatio>
            <Heading mt="2" mb="8">{userData.username}</Heading>
            <Text maxWidth="xs">{userData.bio}</Text>
        </Stack>
    );
}

export default UserInfo;