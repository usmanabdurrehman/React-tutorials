import { QueryClient, QueryClientProvider } from "react-query";
import { SetQueryData } from "./Components/SetQueryData";

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
      <SetQueryData />
    </QueryClientProvider>
  );
}
