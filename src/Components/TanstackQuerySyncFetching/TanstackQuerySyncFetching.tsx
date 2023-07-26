import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TanstackQuerySyncFetching() {
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  return (
    <Flex
      height="100vh"
      alignItems={"center"}
      justifyContent="center"
      bg="#bfffc9"
    >
      <Box boxShadow={"2xl"} width="350px" padding="10" rounded="xl" bg="white">
        <FormControl isInvalid={!!error}>
          <FormLabel>Enter Name</FormLabel>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme={"whatsapp"}
          onClick={async () => {
            const users = await queryClient.fetchQuery(
              ["FETCH_USERS"],
              async (): Promise<{ name: string }[]> => {
                const { data } = await axios.get(
                  "https://jsonplaceholder.typicode.com/users"
                );
                return data;
              },
              {
                staleTime: 5000,
              }
            );
            const isDuplicate = users.find((user) => user.name === name);
            if (isDuplicate) setError("The Name is Already Present");
            else setError("");
          }}
          mt={4}
        >
          Validate
        </Button>
      </Box>
    </Flex>
  );
}
