import prompts from "prompts";
import { nanoid } from "nanoid";

class Node {
  constructor(value) {
    this.id = nanoid(4);
    this.value = parseInt(value);
    this.children = [];
  }

  getID() {
    return this.id;
  }

  getValue() {
    return this.value;
  }

  getChildren() {
    return this.children;
  }

  updateValue(newValue) {
    this.value = newValue;
  }

  insertChild(node) {
    this.children.push(node);
  }

  removeChild(childID) {
    if (this.children.length === 0) {
      return;
    }

    let newChildren = [];

    for (let i = 0; i < this.children.length; i++) {
      const childNode = this.children[i];

      if (childNode.getID() !== childID) {
        newChildren.push(childNode);
      }
    }

    this.children = newChildren;
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
