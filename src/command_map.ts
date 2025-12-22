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
