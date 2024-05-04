import { Button } from "@chakra-ui/react";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const getPosts = queryOptions({
  queryKey: ["GET_POSTS"],
  queryFn: async () => {
    return [];
  },
});

export const SyncQuery = () => {
  const { data: posts, refetch } = useQuery(getPosts);

  useEffect(() => {
    // Post Logic
  }, [posts]);

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const posts = queryClient.ensureQueryData(getPosts);
    // Post Logic
    refetch();
  };

  return <Button onClick={onSubmit}>Submit</Button>;
};
