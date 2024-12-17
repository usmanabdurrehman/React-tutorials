import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Button } from "./components/ui/button";
import { ChakraProvider } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Button variant="destructive">Click me</Button>
        <ChakraButton colorScheme="red">Click me</ChakraButton>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
