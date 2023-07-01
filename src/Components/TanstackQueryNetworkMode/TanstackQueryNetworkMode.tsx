import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex } from "@chakra-ui/react";

export const TanstackQueryNetworkMode = () => {
  const { refetch, fetchStatus } = useQuery(
    ["QUERY"],
    async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    },
    { networkMode: "offlineFirst" }
  );

  return (
    <Flex m={4} alignItems="center" gap={4}>
      <Flex>
        <Button onClick={() => refetch()} colorScheme="whatsapp">
          Refetch
        </Button>
      </Flex>
      <Flex>{fetchStatus}</Flex>
    </Flex>
  );
};
