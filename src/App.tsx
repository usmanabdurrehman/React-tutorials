import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/Home";
import { getAccessToken } from "./utils/tokenHandler";

axios.defaults.baseURL = "http://localhost:7000";

axios.interceptors.request.use(
  (config: any) => {
    config.headers["Authorization"] = getAccessToken();
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
        <Box p={4}>
          <BrowserRouter>
            <Flex gap={2} alignItems={"center"} p={2} bg={"gray.100"} mb={4}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
              <NavLink
                to="/pokemons"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Pokemons
              </NavLink>
            </Flex>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/pokemons" element={<PokemonList />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
