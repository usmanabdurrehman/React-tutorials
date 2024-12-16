import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import useGetPokemons from "../queries/useGetPokemons";
import useGetStats from "../queries/useGetStats";
import Stats from "./Stats";
import { useCreateStat } from "../mutations/useCreateStat";

export default function PokemonList() {
  const { data: pokemons = [] } = useGetPokemons();
  const { data: stats } = useGetStats();
  const { mutate: createStat } = useCreateStat();

  return (
    <Box p={4} bg="#d4e5ff">
      <Button
        onClick={() =>
          createStat({
            name: "Attack",
            value: 100,
          })
        }
        colorScheme="green"
      >
        Create Stat
      </Button>
      <Stats stats={stats} />
      <Flex alignItems={"center"} overflow="auto" mt={4}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={4}
          flex={1}
          justifyContent="center"
        >
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}
