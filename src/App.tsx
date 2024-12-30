import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import TanstackForm from "./Components/Tanstack";
import FormikForm from "./Components/FormikForm";
import { MantineForm } from "./Components/MantineForm";
import RHFForm from "./Components/RHFForm";

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
        {/* <TanstackForm /> */}
        {/* <FormikForm /> */}
        <MantineForm />
        {/* <RHFForm /> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
