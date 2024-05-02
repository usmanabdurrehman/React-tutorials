import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Pokemon } from "../types";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { pokemons } from "../constants";

export const PokemonView = () => {
  const containers = ["Favorite", "Ready"];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const [items, setItems] = useState<{ [id: string]: Pokemon[] }>({
    Favorite: [],
    Ready: [],
  });

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    const pokemon = pokemons.find((pokemon) => pokemon.id == active.id);
    console.log({ over, active, pokemon });
    if (!over?.id || !pokemon) return;
    setItems((prevItems) => ({
      ...prevItems,
      [over.id]: [...prevItems[over.id], pokemon],
    }));
  }

  console.log({ items });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Flex height="100vh" overflow={"hidden auto"} gap={2} p={1}>
        <Grid
          // overflow="hidden auto"
          flex="1"
          templateColumns={"180px 180px 180px"}
          mt={4}
          gap={2}
          p={1}
        >
          {pokemons?.map((pokemon: Pokemon, index) => (
            <GridItem key={pokemon.id} w="100%">
              <Draggable id={pokemon.id + ""}>
                <PokemonCard pokemon={pokemon} />
              </Draggable>
            </GridItem>
          ))}
        </Grid>
        {containers.map((id) => (
          <Flex width="300px" height="100%" direction="column">
            <Flex p={2} bg="orange" alignItems={"center"} borderRadius="md">
              <Text color="white" fontWeight={"bold"} mb={"2px"}>
                {id}
              </Text>
            </Flex>
            <Flex direction={"column"} gap={2}>
              {items[id].map((item) => (
                <PokemonCard pokemon={item} />
              ))}
            </Flex>
            <Box flex="1">
              <Droppable key={id} id={id}></Droppable>
            </Box>
          </Flex>
        ))}
      </Flex>
    </DndContext>
  );
};
