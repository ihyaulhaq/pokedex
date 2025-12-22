import { State } from "./state.js";

export async function commandMapForward(state: State){
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next
  state.prevLocationsURL = locations.previous

  for(const res of locations.results){
    console.log(res.name);    
  }
  console.log();
}

export async function commandMapBackward(state: State){
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = locations.next
  state.prevLocationsURL = locations.previous

  for(const res of locations.results){
    console.log(res.name);    
  }
  console.log();
}

export async function commandExploreMap(state: State, ...args: string[]){
  if(args.length !== 1){
    throw new Error("you must provide a location name");
  }
  const name = args[0];
  const location = await state.pokeAPI.fetchLocation(name);

  console.log(`Exploring ${name}...`);
  console.log("Found Pokemon:");  
  for(const pokemons of location.pokemon_encounters){
    console.log("- "+pokemons.pokemon.name)
  }
  console.log()
}