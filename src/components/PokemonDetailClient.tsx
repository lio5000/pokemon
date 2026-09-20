"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from "@/services/pokemon";
import Image from "next/image";
import Link from "next/link";

interface PokemonDetailClientProps {
  name: string;
}

export default function PokemonDetailClient({
  name,
}: PokemonDetailClientProps) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonDetail(name),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl text-yellow-400 animate-pulse">
          Cargando información del Pokémon...
        </p>
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-xl mb-4">
          Error al obtener los detalles del Pokémon.
        </p>
        <Link
          href="/"
          className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg"
        >
          Volver a la lista
        </Link>
      </div>
    );
  }

  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-block mb-6 text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
      >
        ← Volver a la lista
      </Link>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-48 h-48 bg-gray-900 rounded-xl p-4 flex items-center justify-center border border-gray-700">
          <Image
            src={artwork}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 100vw, 192px"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-extrabold text-white capitalize">
              {pokemon.name}
            </h1>
            <span className="text-gray-400 text-lg font-bold">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>

          <div className="flex gap-2 mb-4">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-xs px-3 py-1 rounded-full font-bold uppercase"
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
            <p>
              <strong className="text-gray-400">Altura:</strong>{" "}
              {pokemon.height / 10} m
            </p>
            <p>
              <strong className="text-gray-400">Peso:</strong>{" "}
              {pokemon.weight / 10} kg
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-1">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="bg-gray-700 text-gray-200 text-xs px-2.5 py-1 rounded-md capitalize"
                >
                  {a.ability.name} {a.is_hidden && "(Oculta)"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Estadísticas Base</h2>
        <div className="space-y-3">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name}>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-300 capitalize">{s.stat.name}</span>
                <span className="text-yellow-400">{s.base_stat}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (s.base_stat / 150) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
