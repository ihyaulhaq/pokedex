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
      console.log("found the cache")
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
      console.log("adding the cache")
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
      console.log("found the cache")
      return cached
    }
    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log("adding the cache")
      const locationDetail: LocationDetail = await response.json();
      this.cache.add(url, locationDetail)

      return locationDetail;

    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
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
