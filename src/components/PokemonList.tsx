"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "@/services/pokemon";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon-list", 50, 0],
    queryFn: () => getPokemonList(50, 0),
  });

  if (isLoading) {
    return (
      <p className="text-center text-white py-10">
        Cargando lista de Pokémon...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">
        Error al cargar la lista de Pokémon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data?.results.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
}
