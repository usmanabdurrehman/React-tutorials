import {
  QueryClient,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const getPosts = queryOptions({
  queryKey: ["GET_POSTS"],
  queryFn: async () => {
    return [];
  },
});

export const Posts = () => {
  const { data: posts = [] } = useQuery(getPosts);

  const queryClient = useQueryClient();

  queryClient.prefetchQuery(getPosts);
  queryClient.refetchQueries(getPosts);
  queryClient.cancelQueries(getPosts);

  return null;
};
