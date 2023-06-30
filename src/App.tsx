import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { TanstackTableVirtualized } from "./Components/TanstackTableVirtualized";

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
        <TanstackTableVirtualized />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
