import { ChakraProvider } from "@chakra-ui/react";
import { OptimisticForm, StatusForm } from "./Components/Form";
import { UseHook } from "./Components/UseHook/UseHook";

export default function App() {
  return (
    <ChakraProvider>
      {/* <OptimisticForm /> */}
      {/* <StatusForm /> */}
      <UseHook />
    </ChakraProvider>
  );
}
