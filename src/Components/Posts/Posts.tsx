import { useState } from "react";

import { usePosts } from "./requests";

import { Flex, List, ListItem } from "@chakra-ui/react";
import Post from "./Post";

export default function Posts() {
  const { data: posts = [] } = usePosts();
  const [postId, setPostId] = useState<number>();

  const [placeholderData, setPlaceholderData] = useState();

  return (
    <Flex height={"100vh"} bg="#d4e5ff" alignItems={"center"}>
      <Flex grow={1}>
        <Flex flex={1}>
          <List>
            {(posts as any[]).slice(0, 5).map((post: any) => (
              <ListItem
                bg="white"
                onClick={() => {
                  setPostId(post.id);
                  setPlaceholderData(post);
                }}
                cursor="pointer"
                p={4}
                boxShadow={"lg"}
                mt={2}
                borderRadius={5}
              >
                {post.title}
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex flex={1} justifyContent="flex-start">
          {postId && <Post id={postId} placeholderData={placeholderData} />}
        </Flex>
      </Flex>
    </Flex>
  );
}
