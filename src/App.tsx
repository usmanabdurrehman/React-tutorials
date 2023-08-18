import { ChakraProvider } from "@chakra-ui/react";
import { OptimisticForm, StatusForm } from "./Components/Form";

export default function App() {
  return (
    <ChakraProvider>
      {/* <OptimisticForm /> */}
      <StatusForm />
    </ChakraProvider>
  );
}
