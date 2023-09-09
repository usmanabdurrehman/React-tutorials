import axios from "axios";

export const QUERY_KEY = ["GET_USERS"];
export const QUERY_FN = async () => {
  const { data } = await axios.get("some/url");
  return data;
};
