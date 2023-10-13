import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { users } from "./data";

const verifiedUserIds = [users[0].id, users[3].id];

export default function List() {
  return (
    <Flex direction={"column"} gap={4} m={4} width={500}>
      {users.map((user) => (
        <Box key={user.id} boxShadow="lg" p={4}>
          {verifiedUserIds.find((userId) => userId === user.id) && (
            <Badge colorScheme="green">Verified</Badge>
          )}
          <Text fontSize={"xl"} mb={2}>
            {user.firstName} {user.lastName}
          </Text>
          <Text mb={0}>{user.email}</Text>
          <Text mb={0}>{moment(user.birthday).format("DD/MM/YYYY")}</Text>
        </Box>
      ))}
    </Flex>
  );
}
