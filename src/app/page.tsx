import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getPokemonList } from "@/services/pokemon";
import PokemonList from "@/components/PokemonList";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pokemon-list", 50, 0],
    queryFn: () => getPokemonList(50, 0),
  });

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-400">
          PokéApp - TanStack Query & Next.js
        </h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonList />
        </HydrationBoundary>
      </div>
    </main>
  );
}
