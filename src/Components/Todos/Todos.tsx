import { Box, Flex, Input } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Todos() {
  const { data: todos } = useQuery({
    queryKey: ["GET_TODOS"],
    queryFn: async () => {
      return ["Do Groceries", "Update Windows"];
    },
  });

  const queryClient = useQueryClient();

  const [todo, setTodo] = useState("");

  return (
    <Box m={12} width={300}>
      <Input
        placeholder="Add Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            queryClient.setQueryData(["GET_TODOS"], (todos: string[] = []) => {
              return [...(todos || []), todo];
            });
            setTodo("");
          }
        }}
      />
      <Flex direction={"column"} gap={2} mt={4}>
        {todos?.map((todo) => (
          <Box p={4} borderRadius="lg" boxShadow={"lg"}>
            {todo}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
