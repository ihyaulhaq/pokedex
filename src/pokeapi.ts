import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url)
    if (cached) {      
      return cached
    }
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Response status: ${response.status} ${response.statusText}`
        );
      }

      const locations: ShallowLocations = await response.json();      
      this.cache.add(url, locations)
      return locations;
    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<LocationDetail> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<LocationDetail>(url)

    if (cached) {      
      return cached
    }
    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }      
      const locationDetail: LocationDetail = await response.json();
      this.cache.add(url, locationDetail)

      return locationDetail;

    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fecthPokemon(pokemonName: string): Promise<PokemonDetail>{
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.cache.get<PokemonDetail>(url)

    if (cached) {      
      return cached
    }
    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }      
      const pokemonDetail: PokemonDetail = await response.json();
      this.cache.add(url, pokemonDetail)
      return pokemonDetail;
    } catch (error) {
      throw new Error(`Error fetching pokemon : ${(error as Error).message}`);
    }
  }
  
}
export type ShallowLocations = {
  count: number;
  next: string;
  previous: any;
  results: Result[];
};

type Result = {
  name: string;
  url: string;
};

export type LocationDetail = {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: Location;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

type EncounterMethodRate = {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
};

type EncounterMethod = {
  name: string;
  url: string;
};

type VersionDetail = {
  rate: number;
  version: Version;
};

type Version = {
  name: string;
  url: string;
};

type Location = {
  name: string;
  url: string;
};

type Name = {
  language: Language;
  name: string;
};

type Language = {
  name: string;
  url: string;
};

type PokemonEncounter = {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
};

type Pokemon = {
  name: string;
  url: string;
};

type VersionDetail2 = {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
};

type EncounterDetail = {
  chance: number;
  condition_values: ConditionValue[];
  max_level: number;
  method: Method;
  min_level: number;
};

type ConditionValue = {
  name: string;
  url: string;
};

type Method = {
  name: string;
  url: string;
};

type Version2 = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  base_experience: number
  cries: {
    latest: string
    legacy: string
  }
  forms: Array<{
    name: string
    url: string
  }>
  game_indices: Array<{
    game_index: number
    version: {
      name: string
      url: string
    }
  }>
  height: number
  held_items: Array<any>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<{
    move: {
      name: string
      url: string
    }
    version_group_details: Array<{
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      order?: number
      version_group: {
        name: string
        url: string
      }
    }>
  }>
  name: string
  order: number
  past_abilities: Array<{
    abilities: Array<{
      ability: any
      is_hidden: boolean
      slot: number
    }>
    generation: {
      name: string
      url: string
    }
  }>
  past_types: Array<any>
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: {
      dream_world: {
        front_default: string
        front_female: any
      }
      home: {
        front_default: string
        front_female: any
        front_shiny: string
        front_shiny_female: any
      }
      "official-artwork": {
        front_default: string
        front_shiny: string
      }
      showdown: {
        back_default: string
        back_female: any
        back_shiny: string
        back_shiny_female: any
        front_default: string
        front_female: any
        front_shiny: string
        front_shiny_female: any
      }
    }
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
        yellow: {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
      }
      "generation-ii": {
        crystal: {
          back_default: string
          back_shiny: string
          back_shiny_transparent: string
          back_transparent: string
          front_default: string
          front_shiny: string
          front_shiny_transparent: string
          front_transparent: string
        }
        gold: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
        silver: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
      }
      "generation-iii": {
        emerald: {
          front_default: string
          front_shiny: string
        }
        "firered-leafgreen": {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
        "ruby-sapphire": {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
      }
      "generation-iv": {
        "diamond-pearl": {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        "heartgold-soulsilver": {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        platinum: {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-ix": {
        "scarlet-violet": {
          front_default: string
          front_female: any
        }
      }
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string
            back_female: any
            back_shiny: string
            back_shiny_female: any
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        "x-y": {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-vii": {
        icons: {
          front_default: string
          front_female: any
        }
        "ultra-sun-ultra-moon": {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-viii": {
        "brilliant-diamond-shining-pearl": {
          front_default: string
          front_female: any
        }
        icons: {
          front_default: string
          front_female: any
        }
      }
    }
  }
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  weight: number
}
