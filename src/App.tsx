import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import Keys from "./Optimization101/Keys";
import Transition from "./Optimization101/Transition";
import Debounce from "./Optimization101/Debounce";
import Virtualization from "./Optimization101/Virtualization";

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
        {/* <Keys /> */}
        {/* <Transition /> */}
        {/* <Debounce /> */}
        <Virtualization />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
