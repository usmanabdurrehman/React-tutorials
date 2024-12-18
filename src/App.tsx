import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Form from "./Components/Form";

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
        <Form />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
