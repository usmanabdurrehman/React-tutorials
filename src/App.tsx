import { ChakraProvider } from "@chakra-ui/react";
import TableComponent from "./Components/Table";

export default function App() {
  return (
    <ChakraProvider>
      <TableComponent />
    </ChakraProvider>
  );
}
