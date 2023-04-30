import { Text } from "@chakra-ui/react";
import React from "react";
import { usePostById } from "./requests";

export default function Post({
  id,
  placeholderData,
}: {
  id: number;
  placeholderData: any;
}) {
  const { data: post } = usePostById(id, placeholderData);
  return (
    <div>
      <Text fontSize="2xl">Post {post?.id}:</Text>
      <Text fontSize="m">{post?.title}</Text>
    </div>
  );
}
