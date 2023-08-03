import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryKit } from "./Components/ReactQueryKit";

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryKit />
    </QueryClientProvider>
  );
}
