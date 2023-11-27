import prompts from "prompts";

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
}
