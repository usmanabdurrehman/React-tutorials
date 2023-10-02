import { ChakraProvider } from "@chakra-ui/react";
import { BasicTable } from "./Components/BasicTable";

export default function App() {
  return (
    <ChakraProvider>
      <BasicTable />
    </ChakraProvider>
  );
}
