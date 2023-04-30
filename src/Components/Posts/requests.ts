import axios from "axios";
import { useMutation, useQuery } from "react-query";

// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts/1

export const usePosts = () => {
  return useQuery(["/posts"]);
};

export const usePostById = (id: number, placeholderData: any) => {
  return useQuery([`/posts/${id}`], {
    placeholderData,
  });
};
