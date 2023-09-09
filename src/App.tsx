import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NewOptimistic } from "./Features/NewOptimistic";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => alert(`Something went wrong: ${error.message}`),
  }),
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewOptimistic />
    </QueryClientProvider>
  );
}
