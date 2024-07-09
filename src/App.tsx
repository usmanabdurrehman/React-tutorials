import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";
import List from "./List/List";
import "./index.css";

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
        <Box p={4}>
          <List />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
