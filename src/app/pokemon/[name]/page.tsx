import PokemonDetailClient from "@/components/PokemonDetailClient";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { name } = await params;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <PokemonDetailClient name={name} />
      </div>
    </main>
  );
}
