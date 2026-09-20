"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { getPokemonDetail } from "@/services/pokemon";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const queryClient = useQueryClient();

  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["pokemon", name],
      queryFn: () => getPokemonDetail(name),
    });
  };

  return (
    <Link
      href={`/pokemon/${name}`}
      onMouseEnter={handleMouseEnter}
      className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-4 flex flex-col items-center justify-center border border-gray-700 shadow-lg hover:scale-105 group"
    >
      <div className="relative w-32 h-32 mb-2">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 128px"
          className="object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      <span className="text-gray-400 text-sm font-bold">
        #{id?.padStart(3, "0")}
      </span>
      <h2 className="text-xl font-bold text-white capitalize">{name}</h2>
    </Link>
  );
}
