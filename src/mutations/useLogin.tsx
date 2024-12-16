import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setAccessToken } from "../utils/tokenHandler";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (): Promise<{ token: string }> => {
      const { data } = await axios.post("/login", {});
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.token);
    },
  });
};
