import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Pokemon } from "../types";

export default function useGetPokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: async (): Promise<Pokemon[]> => {
      const { data } = await axios.get("/pokemon/all");
      return data?.pokemons || [];
    },
  });
}
