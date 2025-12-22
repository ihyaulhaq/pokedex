import { State } from "./state.js";

export async function commandCatchPoke(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a the name");
  }
  const name = args[0]
  const poke = await state.pokeAPI.fecthPokemon(name)
  const catchChance = poke.base_experience
  const randomChance = Math.random() * 700

  console.log(`Throwing a Pokeball at ${name}...`)

  if (randomChance < catchChance) {
    console.log(`${name} escaped!`)
    console.log(`${poke.base_experience} \n ${randomChance}`)
    return
  }
  console.log(`${name}was caught!`)
  console.log(`${poke.base_experience} \n ${randomChance}`)

}

