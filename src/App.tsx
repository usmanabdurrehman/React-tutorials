import { ChakraProvider } from "@chakra-ui/react";
import { Count } from "./Components/Count";
import { Todos } from "./Components/Todos";
import { UserForm } from "./Components/UserForm";

export default function App() {
  return (
    <ChakraProvider>
      <Count />
      {/* <UserForm />
      <Todos /> */}
    </ChakraProvider>
  );
}
