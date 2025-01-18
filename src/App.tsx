import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ControlledPrefer } from "./Components/ControlledPrefer";
import { MultipleFormSubmissions } from "./Components/MultipleFormSubmissions";
import Watch from "./Components/Watch";

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
        <Box p={4} m={4} boxShadow={"md"} borderRadius="md">
          {/* <DynamicValueUpdate /> */}
          {/* <ControlledPrefer /> */}
          {/* <MultipleFormSubmissions /> */}
          <Watch />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
