import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";

export const Suspense = () => {
  useSuspenseQuery({ queryKey: ["GET_USER"], queryFn: () => {} });
  useSuspenseInfiniteQuery({
    queryKey: ["GET_USER"],
    queryFn: () => {},
    getNextPageParam: (lastPage, allPages) => 3,
    initialPageParam: 4,
  });
  useSuspenseQueries({
    queries: [{ queryKey: ["GET_USER"], queryFn: () => {} }],
  });

  return null;
};
