import { useState } from "react";
import { QueryClient, QueryClientProvider, QueryObserver } from "react-query";
import { BMICalculator } from "./Components/BMICalculator/BMICalculator";
import { BMICalculatorComplete } from "./Components/BMICalculator/BMICalculatorComplete";
import { ChakraProvider } from "@chakra-ui/react";
const MAX_AGE = 24000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 0,
      retry: 0,
      cacheTime: MAX_AGE,
    },
  },
});

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BMICalculator />
        {/* <BMICalculatorComplete /> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
