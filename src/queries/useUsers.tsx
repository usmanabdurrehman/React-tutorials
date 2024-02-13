import axios from "axios";
import { useQuery } from "react-query";
import { User } from "../types";

export const usersQueryKeyFn = (limit?: number) => ["GET_USERS", limit];

export const useUsers = (limit?: number) =>
  useQuery(usersQueryKeyFn(limit), async (): Promise<User[]> => {
    const { data } = await axios.get("/users", { params: { limit } });
    return data;
  });
