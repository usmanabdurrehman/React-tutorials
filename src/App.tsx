import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryObserver,
  useIsFetching,
  useQuery,
} from "react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import ReactQuerySuspense from "./Components/ReactQuerySuspense/ReactQuerySuspense";
import { ReactQueryDevtools } from "react-query/devtools";
import { SWRConfig } from "swr";
import { SWRPagination } from "./Components/SWRPagination";
import { QueryCancellation } from "./Components/QueryCancellation";
import { ReactQueryLoadingIndicators } from "./Components/ReactQueryLoadingIndicators/ReactQueryLoadingIndicators";
import { Feedback } from "./Components/Feedback";

const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await axios.get(`http://localhost:7000${queryKey[0]}`);
  return data;
};

axios.defaults.baseURL = "http://localhost:7000";

export default function App() {
  const [feedback, setFeedback] = useState<"success" | "error" | undefined>();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0,
      },
      mutations: {
        onSettled: (data, error) => {
          if (data) setFeedback("success");
          if (error) setFeedback("error");
        },
      },
    },
  });

  useEffect(() => {
    feedback && setTimeout(() => setFeedback(undefined), 1000);
  }, [feedback]);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Feedback type={feedback} />
        <ReactQueryLoadingIndicators />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
