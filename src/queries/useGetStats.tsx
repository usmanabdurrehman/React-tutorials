import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stats } from "../types";

export default function useGetStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Stats> => {
      const { data } = await axios.get("/pokemon/stats");
      return data;
    },
  });
}
