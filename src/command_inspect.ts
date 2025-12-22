import { State } from "./state";


export async function commandInspectPokemon(state: State, ...args: string[]) {

  const name = args[0]
  const poke = await state.pokeAPI.fecthPokemon(name)

  console.log('');

  if (args.length !== 1) {
    throw new Error("you must provide a the name");
  }

  if (Object.values(state.ownedPokemon).length === 0) {
    throw new Error('you dont have any pokemon catch it first')    
  }

  if (!state.ownedPokemon[name]) {
    throw new Error('idk man you seems dont have it')
  }

  console.log(`Name: ${poke.name}`)
  console.log(`Height: ${poke.height}`)
  console.log(`Weight: ${poke.weight}`)

  console.log(`Stats:`)
  for (const stat of poke.stats) {
    console.log(`- ${stat.stat.name}: ${stat.base_stat}`)
  }

  console.log(`Type:`)
  for (const type of poke.types) {
    console.log(`- ${type.type.name}`)
  }

  console.log('');
}

export async function commandOwnedPokemon(state: State) {
  if (Object.values(state.ownedPokemon).length === 0) {
    throw new Error('\n you dont have any pokemon catch it first')
    
  }
  console.log("You have :")
  for (const poke of Object.values(state.ownedPokemon)) {
    console.log(`- ${poke.name}`)
  }
  console.log('')
}