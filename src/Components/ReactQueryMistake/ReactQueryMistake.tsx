import { Box, Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useCreateUser } from "../../mutations/useCreateUser";
import { useUsers } from "../../queries/useUsers";

export default function ReactQueryMistake() {
  const { data: users = [] } = useUsers(2);
  const { mutate: createUser, isLoading } = useCreateUser(2);
  const [name, setName] = useState("");

  return (
    <Flex h="98vh" p={4} gap={4}>
      <Flex flex="1" gap={2} direction="column">
        {users.map(({ name, id }) => (
          <Box key={id} p={4} borderRadius="md" boxShadow={"md"}>
            {name}
          </Box>
        ))}
      </Flex>
      <Box flex="1">
        <Box>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            border="2px solid blue !important"
          />
          <Button
            onClick={() => {
              createUser(name);
              setName("");
            }}
            mt={4}
            colorScheme="whatsapp"
          >
            {isLoading ? <Spinner size="xs" /> : "Add User"}
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
