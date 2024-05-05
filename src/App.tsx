import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import Rabbit from "./Rabbit";

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
        <Flex
          height="100vh"
          width="100vw"
          alignItems={"center"}
          justifyContent="center"
        >
          <Rabbit />
        </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
