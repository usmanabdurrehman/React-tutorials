import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import useInfiniteSWR from "swr/infinite";
import { Pokemon } from "../PartialData/PartialData.types";
import PokemonCard from "../PartialData/PokemonCard";

const PAGE_SIZE = 4;

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData?.data?.length) return null;
  console.log({ pageIndex });
  return `/pokemon/?page=${pageIndex}&limit=${PAGE_SIZE}`;
};

export function SWRInfiniteIndexPagination() {
  const { data, size, setSize } = useInfiniteSWR<{ data: Pokemon[] }>(getKey);

  console.log({ size });

  return (
    <Box>
      <Text fontSize="4xl" textAlign={"center"}>
        Pokemon List
      </Text>
      <Grid templateColumns="repeat(2, 400px)" gap={6} mt={4}>
        {data?.map((item) =>
          item?.data?.map((pokemon) => (
            <GridItem key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </GridItem>
          ))
        )}
      </Grid>

      <Flex p={4} justifyContent="center">
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </Flex>
    </Box>
  );
}
