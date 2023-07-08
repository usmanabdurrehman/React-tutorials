import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import TanstackQueryQueryKeyFilters from "./Components/TanstackQueryQueryKeyFilters/TanstackQueryQueryKeyFilters";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

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
        <TanstackQueryQueryKeyFilters />
        <ReactQueryDevtoolsPanel
          style={{ height: "100%" }}
          setIsOpen={() => {}}
          onDragStart={() => {}}
        />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
