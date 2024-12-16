import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateStat = () => {
  return useMutation({
    mutationFn: ({ name, value }: { name: string; value: number }) => {
      return axios.post("/pokemon/stat", { name, value });
    },
  });
};
