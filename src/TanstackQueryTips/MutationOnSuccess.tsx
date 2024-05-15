import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../queries/getPosts";

export const CacheUpdate = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createPost } = useMutation({
    mutationFn: async (data: { text: string }) => {
      return await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries(getPosts);
    },
  });

  const onSubmit = async () => {
    await createPost({ text: "Post 1" });
  };

  return <Button onClick={onSubmit}>Submit</Button>;
};
