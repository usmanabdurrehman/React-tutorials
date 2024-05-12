import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const View = () => {
  useQuery({ queryKey: ["GET_TODOS"] });
  useInfiniteQuery({
    queryKey: ["GET_TODOS"],
    getNextPageParam: (lastPage: { nextCursor: number }) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  return null;
};
