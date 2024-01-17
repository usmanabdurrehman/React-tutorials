import { ChakraProvider } from "@chakra-ui/react";
import { Paint } from "./Components/Paint";
import { PaintDemo } from "./Components/PaintDemo";

export default function App() {
  return (
    <ChakraProvider>
      <Paint />
    </ChakraProvider>
  );
}
