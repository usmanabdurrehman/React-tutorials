import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { usersQueryKeyFn } from "../queries/useUsers";

export const useCreateUser = (limit?: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (name: string) => {
      const { data } = await axios.post("/users", { name });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(usersQueryKeyFn(limit));
      },
    }
  );
};
