import { QueryClient, QueryClientProvider } from "react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";
import PokemonCard from "./ReactTypescript/Card";

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

const pokemon = {
  id: 25,
  name: "pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
  types: ["electric"],
  stats: [
    {
      baseStat: 35,
      name: "hp",
    },
    {
      baseStat: 55,
      name: "attack",
    },
    {
      baseStat: 40,
      name: "defense",
    },
    {
      baseStat: 50,
      name: "special-attack",
    },
    {
      baseStat: 50,
      name: "special-defense",
    },
    {
      baseStat: 90,
      name: "speed",
    },
  ],
};

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Box m={10}>
          <PokemonCard pokemon={pokemon} />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
