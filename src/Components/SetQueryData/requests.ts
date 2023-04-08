import { Todo } from "./types";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useTodos = () => {
  return useQuery(["GET_TODOS"], async (): Promise<Todo[]> => {
    return [
      { id: 1, title: "Doing Laundary" },
      { id: 2, title: "Making Presentation" },
      { id: 3, title: "Editing Videos" },
      { id: 4, title: "Uploading Youtube videos" },
    ];
  });
};

export const useDeleteTodo = () => {
  return useMutation(async (id: number) => {
    const { data } = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return data;
  });
};

export const useCreateTodo = () => {
  return useMutation(async (title: string) => {
    const { data } = await axios.post(
      `https://jsonplaceholder.typicode.com/todos`,
      { title }
    );
    return data;
  });
};

export const useUpdateTodo = () => {
  return useMutation(async (payload: { id: number; title: string }) => {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
      payload
    );
    return data;
  });
};
