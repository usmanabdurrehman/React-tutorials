import { Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CacheUpdate = () => {
  const { mutateAsync: createPost } = useMutation({
    mutationFn: async (data: { text: string }) => {
      return await fetch("https://jsonplaceholder.typicode.com/posts");
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async () => {
    const post = await createPost({ text: "Post 1" });
    queryClient.setQueryData(getPosts);
  };

  return <Button onClick={onSubmit}>Submit</Button>;
};
