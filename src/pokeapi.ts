export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Response status: ${response.status} ${response.statusText}`
        );
      }

      const locations: ShallowLocations = await response.json();
      return locations;
    } catch (error) {
      throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
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
