import { State } from "./state.js";

export async function commandCatchPoke(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a the name");
  }
  const name = args[0]
  const pokemon = await state.pokeAPI.fecthPokemon(name)
  const catchChance = pokemon.base_experience
  const randomChance = Math.random() * 700

  console.log(`Throwing a Pokeball at ${name}...`)

  if (randomChance < catchChance) {
    console.log(`${name} escaped!`)    
    return
  }
  console.log(`${name} was caught!`)
  console.log("You may now inspect it with the inspect command.");  
  state.ownedPokemon[pokemon.name] = pokemon
}

