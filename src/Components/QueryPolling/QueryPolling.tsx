import axios from "axios";
import { useQuery } from "react-query";

export default function QueryPolling() {
  const { data } = useQuery(
    ["GET_TODOS"],
    async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
    }
  );
  return null;
}
