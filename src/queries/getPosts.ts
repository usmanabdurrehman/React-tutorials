import { queryOptions } from "@tanstack/react-query";
import { Post } from "../types";

export const getPosts = queryOptions({
  queryKey: ["GET_POSTS"],
  queryFn: async (): Promise<Post[]> => {
    return [];
  },
});
