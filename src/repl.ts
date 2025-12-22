import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export async function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();

  rl.on("line", async (line) => {
    const input = cleanInput(line);

    if (input.length === 0) {
      rl.prompt();
      return;
    }

    const [commandName] = input;

    const command = commands[commandName];

    if (!command) {
      console.log(`Unknown command: ${commandName}`);
      rl.prompt();
      return;
    }
    try {
      await command.callback(state);
    } catch (e) {
      console.log((e as Error).message);
    }
    rl.prompt();
  });
}
