import {
  Button,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Pokemon } from "./Pokemon.types";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [tabIndex, setTabIndex] = useState(0);

  const { data: pokemons } = useQuery<Pokemon[]>(["/pokemon"], {
    enabled: tabIndex === 0,
  });

  useQuery(["/s"], {
    enabled: tabIndex === 1,
  });

  if (!pokemons) return null;

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="green"
      onChange={(index) => setTabIndex(index)}
    >
      <TabList>
        <Tab>Pokemons</Tab>
        <Tab>Animals</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid templateColumns="repeat(2, 400px)" gap={6} mt={4}>
            {pokemons.map((pokemon) => (
              <GridItem key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </GridItem>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
}
