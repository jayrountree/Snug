import { PostInterface } from "../versionA/page";
import { Stack, Image, AspectRatio, Box, Text, Icon } from "@chakra-ui/react";

const PostGroup = ({ title, icon, posts, color }) => {
  return (
    <Box bg={`${color}.200`} m={2} borderRadius="md" overflowX="auto">
      <Text
        bg={`${color}.300`}
        borderRadius="md"
        fontSize={32}
        fontWeight="bold"
        p={2}
      >
        {title} <Icon as={icon} />
      </Text>

      <Stack direction="row" spacing={4} m={4}>
        {posts.map((post, index) => {
          return (
            <AspectRatio width="200px" ratio={4 / 3} key={index}>
              <Image src={post.image} alt={post.name} borderRadius="md" />
            </AspectRatio>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PostGroup;
