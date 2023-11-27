import prompts from "prompts";
import { nanoid } from "nanoid";

class Node {
  constructor(value) {
    this.value = value;
    this.id = nanoid(4);
  }
}

async function getInput() {
  const response = await prompts({
    type: "text",
    name: "value",
    message: "Enter value to continue or 'exit' to close program:",
  });

  return response.value;
}

while (true) {
  const res = await getInput();

  if (res === "exit") {
    console.log("program closed.");
    break;
  }

  const nodeElement = new Node(res);
}
