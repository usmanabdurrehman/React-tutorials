import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../queries/getPosts";

export const CacheUpdate = () => {
  const { mutateAsync: createPost } = useMutation({
    mutationFn: async (data: { text: string }) => {
      return await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async () => {
    await createPost({ text: "Post 1" });
    queryClient.invalidateQueries(getPosts);
  };

  return <Button onClick={onSubmit}>Submit</Button>;
};
