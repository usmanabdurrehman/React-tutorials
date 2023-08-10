import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQuerySuspense } from "./Components/ReactQuerySuspense";
import axios from "axios";

const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await axios.get(`http://localhost:7000${queryKey[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      queryFn: defaultQueryFn,
      suspense: true,
    },
  },
});

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQuerySuspense />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
