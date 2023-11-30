import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import Todos from "./Components/Todos/Todos";

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

broadcastQueryClient({
  queryClient,
});

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
