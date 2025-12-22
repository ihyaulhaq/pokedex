import { createInterface, type Interface } from "readline";
import { PokeAPI, PokemonDetail } from "./pokeapi.js";
import { getCommands } from "./commands.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readLine: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  ownedPokemon: Record<string, PokemonDetail>
};

export function initState(cacheInterval: number): State {
  const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });

  return {
    readLine,
    commands: getCommands(),
    pokeAPI: new PokeAPI(cacheInterval),
    nextLocationsURL: '',
    prevLocationsURL: '',
    ownedPokemon: {}
  };
}
