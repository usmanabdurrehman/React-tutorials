import { Flex, List, ListItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Pokemon } from "./PartialData.types";
import PokemonCard from "./PokemonCard";

export default function PartialData() {
  const [pokemonId, setPokemonId] = useState<number>();

  const { data: pokemons = [] } = useQuery<Pokemon[]>(["/pokemon"]);
  const [placeholderData, setPlaceholderData] = useState<Pokemon>();

  return (
    <Flex height={"100vh"} bg="#d4e5ff" alignItems={"center"}>
      <Flex grow={1} alignItems="center" justifyContent="center">
        <Flex flex={1} justifyContent="center">
          <List>
            {pokemons.slice(0, 5).map((pokemon) => (
              <ListItem
                bg="white"
                onClick={() => {
                  setPokemonId(pokemon.id);
                  setPlaceholderData(pokemon);
                }}
                cursor="pointer"
                p={4}
                boxShadow={"lg"}
                mt={2}
                borderRadius={5}
              >
                {pokemon.name}
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex flex={1} justifyContent="center">
          {pokemonId && placeholderData && (
            <PokemonCard id={pokemonId} placeholderData={placeholderData} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
