import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { getTodoStyles } from "./styles";

type Todo = { id: number; name: string };

const initialTodos = [
  { id: 1, name: "Groceries" },
  { id: 2, name: "Watering Plants" },
  { id: 3, name: "Updating Windows" },
];

const TodoForm = ({
  todo,
  onSave,
}: {
  todo: Todo;
  onSave: (newTodo: Todo) => void;
}) => {
  const [todoText, setTodoText] = useState(todo.name);

  useEffect(() => {
    console.log("Component Mounted");
    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return (
    <Box p={3}>
      <Heading fontSize={"lg"}>Edit Todo</Heading>
      <Input
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
        mt={2}
        autoFocus
      />
      <Button
        mt={4}
        colorScheme="whatsapp"
        onClick={() => onSave({ ...todo, name: todoText })}
      >
        Save
      </Button>
    </Box>
  );
};

export default function OpenTodo() {
  const [currentTodo, setCurrentTodo] = useState<Todo>();
  const [todos, setTodos] = useState(initialTodos);

  const onSave = useCallback(
    (newTodo: Todo) =>
      setTodos(
        todos.map((prevTodo) =>
          prevTodo.id === newTodo.id ? newTodo : prevTodo
        )
      ),
    []
  );

  return (
    <Flex m={8} gap={4}>
      <Flex flex="1" gap={4} direction="column">
        {todos.map((todo) => (
          <Box
            {...getTodoStyles({ isSelected: todo.id === currentTodo?.id })}
            onClick={() => setCurrentTodo(todo)}
          >
            {todo.name}
          </Box>
        ))}
      </Flex>
      <Box flex="1">
        {currentTodo && (
          <TodoForm key={currentTodo.id} todo={currentTodo} onSave={onSave} />
        )}
      </Box>
    </Flex>
  );
}
