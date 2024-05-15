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
  const queryClient = useQueryClient();

  const onSubmit = () => {
    const posts = queryClient.ensureQueryData(getPosts);
  };

  return <Button onClick={onSubmit}>Submit</Button>;
};
