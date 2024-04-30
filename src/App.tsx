import { ChakraProvider } from "@chakra-ui/react";
import { Paint } from "./Components/Paint";

export default function App() {
  return (
    <ChakraProvider>
      <Paint />
    </ChakraProvider>
  );
}
