import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const todoIds = [
  "82471c5f-4207-4b1d-abcb-b98547e01a3e",
  "354ee16c-bfdd-44d3-afa9-e93679bda367",
];

interface Todo {
  title: string;
  done: boolean;
}

type State = {
  todos: Record<string, Todo>;
};

type Actions = {
  toggleTodo: (todoId: string) => void;
};

const initialTodos: Record<string, Todo> = {
  "82471c5f-4207-4b1d-abcb-b98547e01a3e": {
    title: "Learn Zustand",
    done: false,
  },
  "354ee16c-bfdd-44d3-afa9-e93679bda367": {
    title: "Learn Jotai",
    done: false,
  },
};

const useTodoStore = create<State & Actions>()((set) => ({
  todos: initialTodos,
  toggleTodo: (todoId: string) =>
    set((state) => {
      return {
        ...state,
        todos: {
          ...state.todos,
          [todoId]: {
            ...state.todos[todoId],
            done: !state.todos[todoId].done,
          },
        },
      };
    }),
}));

// const useTodoStore = create<State & Actions>()(
//   immer((set) => ({
//     todos: initialTodos,
//     toggleTodo: (todoId: string) =>
//       set((state) => {
//         state.todos[todoId].done = !state.todos[todoId].done;
//       }),
//   }))
// );

export const Todos = () => {
  const { todos, toggleTodo } = useTodoStore((state) => state);

  return (
    <Flex direction={"column"} gap={4} m={4}>
      {todoIds.map((todoId) => (
        <Flex
          key={todoId}
          justifyContent="space-between"
          boxShadow={"md"}
          borderRadius="md"
          p={4}
          alignItems="center"
        >
          <Text mb={0}>{todos[todoId].title}</Text>
          <Checkbox
            colorScheme={"whatsapp"}
            onClick={() => toggleTodo(todoId)}
            checked={todos[todoId].done}
          />
        </Flex>
      ))}
    </Flex>
  );
};
