import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, FieldArray, Formik } from "formik";
import React from "react";
import { Pokemon } from "../PartialData/PartialData.types";
import PokemonCard from "../PartialData/PokemonCard";

type FormFields = {
  pokemon: string;
  pokemons: Pokemon[];
};

export default function FormikFieldArrayHelpers() {
  const getPokemonByName = async (name: string) => {
    const { data: pokemonDetail }: any = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (pokemonDetail === "Not Found") return;
    const pokemon: Pokemon = {
      id: pokemonDetail?.id,
      name: pokemonDetail?.name,
      image: pokemonDetail?.sprites?.other?.dream_world?.front_default,
      types: pokemonDetail?.types?.map(({ type }: any) => type?.name),
      stats: pokemonDetail?.stats?.map((stat: any) => ({
        baseStat: stat?.base_stat,
        name: stat?.stat?.name,
      })),
    };
    return pokemon;
  };

  return (
    <Box p={4}>
      <Formik initialValues={{ pokemon: "", pokemons: [] }} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          return (
            <Box>
              <FieldArray name="pokemons">
                {(arrayHelpers) => (
                  <Box>
                    <Flex gap={4} mb={4}>
                      <Button onClick={() => arrayHelpers.pop()}>pop</Button>
                      <Button onClick={() => arrayHelpers.swap(0, 1)}>
                        Swap 1st and 2nd
                      </Button>
                      <Button
                        onClick={() =>
                          arrayHelpers.replace(0, values?.pokemons?.[2])
                        }
                      >
                        Replace 1st with second
                      </Button>
                      <Button onClick={() => arrayHelpers.move(0, 2)}>
                        Move 1st item to 3rd position
                      </Button>
                    </Flex>
                    <Field name="pokemon">
                      {({ field }: any) => (
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Pokemon Name"
                            onKeyDown={async (e) => {
                              if (e.key !== "Enter") return;
                              const pokemon = await getPokemonByName(
                                values.pokemon.toLowerCase()
                              );
                              arrayHelpers.insert(1, pokemon);
                              setFieldValue("pokemon", "");
                            }}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Grid
                      templateColumns={
                        "repeat( auto-fill, minmax(400px, 1fr) )"
                      }
                      mt={4}
                      gap={4}
                    >
                      {values.pokemons?.map((pokemon: Pokemon, index) => (
                        <GridItem key={pokemon.id} w="100%">
                          <PokemonCard
                            pokemon={pokemon}
                            onDelete={() => arrayHelpers.remove(index)}
                          />
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>
                )}
              </FieldArray>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}
