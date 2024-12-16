import { getAccessToken } from "../utils/tokenHandler";
import axios from "axios";

export const getNewRefreshToken = async (): Promise<{
  token: string;
}> => {
  const { data } = await axios.post(`/refresh-token`, {
    token: getAccessToken(),
  });
  return data;
};
