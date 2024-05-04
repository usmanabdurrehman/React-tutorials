import { queryOptions, useQuery } from "@tanstack/react-query";

const getPosts = queryOptions({
  queryKey: ["GET_POSTS"],
  queryFn: async () => {
    return [];
  },
});

export const Posts = () => {
  const { data: posts = [] } = useQuery(getPosts);
  return null;
};
