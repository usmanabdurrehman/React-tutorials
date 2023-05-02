import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { Pokemon } from "../PartialData/PartialData.types";
import PokemonCard from "../PartialData/PokemonCard";

const PAGE_SIZE = 4;

const Page = ({ index }: { index: number }) => {
  const { data } = useSWR<{ data: Pokemon[] }>(
    `/pokemon/?page=${index}&limit=${PAGE_SIZE}`
  );

  return (
    <Grid templateColumns="repeat(2, 400px)" gap={6} mt={4}>
      {data?.data?.map((pokemon) => (
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
          <Page index={pageIndex} />
        </Box>
      </Flex>

      <Flex justifyContent={"flex-end"} mt={4} gap={4}>
        <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous</Button>
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
      </Flex>
    </Flex>
  );
}
