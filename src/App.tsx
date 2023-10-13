import { ChakraProvider } from "@chakra-ui/react";
import List from "./Components/List";

export default function App() {
  return (
    <ChakraProvider>
      <List />
    </ChakraProvider>
  );
}
