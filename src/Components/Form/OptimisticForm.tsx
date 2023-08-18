import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from "react";
import { Todo } from "../../types";
import { addTodo } from "../../utilities";

const initialTodos: Todo[] = [];

export function OptimisticForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [todos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (prevTodos, message: string) => [
      ...prevTodos,
      { message, id: prevTodos.length + 1 },
    ]
  );

  return (
    <div>
      <Box mt={4}>
        <List>
          {todos.map((m) => (
            <ListItem key={m.id}>{m.message}</ListItem>
          ))}
        </List>
      </Box>

      <form
        ref={formRef}
        action={async (formData) => {
          const message = formData.get("message");
          if (!message || typeof message !== "string") return;
          formRef.current && formRef.current.reset();
          addOptimisticTodo(message);
          await addTodo(message);
        }}
      >
        <Box m={4} width={300}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="message" />
          </FormControl>

          <Button mt={4} type="submit" colorScheme="whatsapp">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
