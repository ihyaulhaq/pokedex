import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'pokedex > '
  });
  rl.prompt()
  rl.on("line", (line)=>{
    const command = cleanInput(line)
    if(command.length === 0){
      rl.prompt()
      return
    }
    console.log(`Your command was: ${command[0]}`)
    rl.prompt()
  })
}
