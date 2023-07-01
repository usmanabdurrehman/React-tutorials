import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryObserver,
  useQuery,
} from "react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { QueryCancellation } from "./Components/QueryCancellation";
import { TanstackQueryOnlineManager } from "./Components/TanstackQueryOnlineManager";

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
    },
  },
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:7000",
});

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <TanstackQueryOnlineManager />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
