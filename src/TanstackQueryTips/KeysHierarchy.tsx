import { Button } from "@chakra-ui/react";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = (path: string) => async () =>
  fetch(`https://jsonplaceholder.typicode.com/${path}`);

const getPosts = queryOptions({
  queryKey: ["posts"],
  queryFn: fetchData("posts"),
});

const getPostById = queryOptions({
  queryKey: ["posts", 1],
  queryFn: fetchData("posts/1"),
});

const getPostsByFilter = queryOptions({
  queryKey: ["posts", { active: true }],
  queryFn: fetchData("posts?active=true"),
});

export const Keys = () => {
  useQuery(getPosts);
  useQuery(getPostById);
  useQuery(getPostsByFilter);

  const queryClient = useQueryClient();

  return (
    <Button
      onClick={() => {
        queryClient.refetchQueries({ queryKey: ["posts"] });
      }}
    >
      Refetch Queries
    </Button>
  );
};
