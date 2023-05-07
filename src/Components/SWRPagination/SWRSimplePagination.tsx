import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { Pokemon } from "../PartialData/PartialData.types";
import PokemonCard from "../PartialData/PokemonCard";

const PAGE_SIZE = 4;

const Page = ({ pageIndex }: { pageIndex: number }) => {
  const { data } = useSWR<{ pokemons: Pokemon[] }>(
    `/pokemon?limit=${PAGE_SIZE}&page=${pageIndex}`
  );

  return (
    <Grid templateColumns="repeat(2, 400px)" gap={6} mt={4}>
      {data?.pokemons?.map((pokemon) => (
        <GridItem key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </GridItem>
      ))}
    </Grid>
  );
};

export function SWRIndexPagination() {
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <Flex direction={"column"} height="100%">
      <Flex grow={1}>
        <Box width={"100%"}>
          <Text fontSize="4xl" textAlign={"center"}>
            Pokemon List
          </Text>
          <Page pageIndex={pageIndex} />
        </Box>
      </Flex>
      <Flex p={4} gap={4} justifyContent="flex-end">
        <Button onClick={() => setPageIndex(pageIndex - 1)}>Prev</Button>
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
      </Flex>
    </Flex>
  );
}
