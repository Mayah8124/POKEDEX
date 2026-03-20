import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../lib/api";

export function usePokemon(limit = 151) {
  return useQuery({
    queryKey: ["pokemon", limit],
    queryFn: () => fetchPokemonList(limit),
    staleTime: Infinity,
  });
}