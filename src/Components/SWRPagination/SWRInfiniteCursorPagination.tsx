import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import useInfiniteSWR from "swr/infinite";
import { Pokemon } from "../PartialData/PartialData.types";
import PokemonCard from "../PartialData/PokemonCard";

const PAGE_SIZE = 4;

const getKey = (pageIndex: number, previousData: any) => {
  if (previousData && !previousData?.pokemons?.length) return null;
  if (pageIndex === 0) return `/pokemon?limit=${PAGE_SIZE}`;
  return `/pokemon?limit=${PAGE_SIZE}&cursor=${previousData.nextCursor}`;
};

export function SWRInfiniteCursorPagination() {
  const { data, setSize, size } = useInfiniteSWR<{ pokemons: Pokemon[] }>(
    getKey
  );

  return (
    <Box width={"100%"}>
      <Text fontSize="4xl" textAlign={"center"}>
        Pokemon List
      </Text>
      <Grid templateColumns="repeat(2, 400px)" gap={6} mt={4}>
        {data?.map((item) =>
          item?.pokemons?.map((pokemon) => (
            <GridItem key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </GridItem>
          ))
        )}
      </Grid>
      <Flex justifyContent={"center"} mt={4}>
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </Flex>
    </Box>
  );
}
