import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import ReactQueryMistake from "./Components/ReactQueryMistake/ReactQueryMistake";

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

axios.defaults.baseURL = "http://localhost:7000";

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryMistake />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
