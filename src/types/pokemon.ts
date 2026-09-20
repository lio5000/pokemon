export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  species: {
    url: string;
  };
}

export interface EvolutionChainNode {
  species: {
    name: string;
  };
  evolves_to: EvolutionChainNode[];
}

export interface EvolutionChainResponse {
  chain: EvolutionChainNode;
}
