import { commandCatchPoke } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandInspectPokemon, commandOwnedPokemon } from "./command_inspect.js";
import { commandExploreMap, commandMapBackward, commandMapForward } from "./command_map.js";
import { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp
    },
    map: {
      name: "map",
      description: "show 20 location ahead of you",
      callback: commandMapForward
    },
    mapb: {
      name: "mapb",
      description: "show 20 location behind you",
      callback: commandMapBackward
    },
    explore: {
      name: "explore<location_name>",
      description: "Show pokemon inside an area",
      callback: commandExploreMap
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Catch pokemon",
      callback: commandCatchPoke
    },
    pokedex: {
      name: "pokedex",
      description: "Show pokemon ypu catch",
      callback: commandOwnedPokemon
    },
    inspect: {
      name: "Inspect <pokemon_name>",
      description: "Inspect pokemon you owned",
      callback: commandInspectPokemon
    },
  };
}
