import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export async function startREPL(state: State) {
  const {
    readLine,
    commands
  } = state;

  readLine.prompt();

  readLine.on("line", async (line) => {
    const cleanWord = cleanInput(line);

    if (cleanWord.length === 0) {
      readLine.prompt();
      return;
    }

    const commandName = cleanWord[0];

    const command = commands[commandName];

    if (!command) {
      console.log(`Unknown command: ${commandName}`);
      readLine.prompt();
      return;
    }
    try {
      await command.callback(state);
    } catch (e) {
      console.log((e as Error).message);
    }
    readLine.prompt();
  });
}
