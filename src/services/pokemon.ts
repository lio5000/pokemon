import { PokemonDetail, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit = 50,
  offset = 0,
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) {
    throw new Error("Error al obtener la lista de Pokémon");
  }
  return res.json();
}

export async function getPokemonDetail(
  nameOrId: string,
): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
  if (!res.ok) {
    throw new Error(`Error al obtener los detalles del Pokémon ${nameOrId}`);
  }
  return res.json();
}
