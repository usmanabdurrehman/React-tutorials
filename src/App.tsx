import { ChakraProvider } from "@chakra-ui/react";
import OpenTodo from "./Components/OpenTodo/OpenTodo";

export default function App() {
  return (
    <ChakraProvider>
      <OpenTodo />
    </ChakraProvider>
  );
}
