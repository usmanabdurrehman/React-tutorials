import { ChakraProvider } from "@chakra-ui/react";
import { BasicTable } from "./Components/BasicTable";
import { DiagramEditor } from "./Components/X";

export default function App() {
  return (
    <ChakraProvider>
      {/* <BasicTable /> */}
      <DiagramEditor />
    </ChakraProvider>
  );
}
