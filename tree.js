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

  getChild() {
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

class Tree {
  constructor(node) {
    this.root = node === undefined ? null : node;
    this.children = [];
  }

  getChild() {
    return this.children;
  }

  getChildByID(id) {
    if (this.root.id === id) {
      return this.children;
    } else {
      let queue = [...this.children];

      while (queue.length > 0) {
        const child = queue.shift();

        const nodeChildren = child.getChild();

        if (child.getID() === id) {
          return child;
        }

        if (nodeChildren.length > 0) {
          for (let i = 0; i < nodeChildren.length; i++) {
            queue.push(nodeChildren[i]);
          }
        }
      }
    }
  }

  insertChild(node) {
    if (this.root === null) {
      this.root = node;
    } else {
      this.children.push(node);
    }
  }

  insertChildByID(id, node) {
    if (this.root.id === id) {
      this.children.push(node);
    } else {
      let queue = [...this.children];

      while (queue.length > 0) {
        const child = queue.shift();

        const nodeChildren = child.getChild();

        if (child.getID() === id) {
          child.insertChild(node);
          break;
        }

        if (nodeChildren.length > 0) {
          for (let i = 0; i < nodeChildren.length; i++) {
            queue.push(nodeChildren[i]);
          }
        }
      }
    }
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

// while (true) {
// const res = await getInput();

// if (res === "exit") {
//   console.log("program closed.");
// break;
// }

const nodeElement = new Tree();

const nodex = new Node(12);
const nodey = new Node(9);

nodeElement.insertChild(new Node(6));
nodeElement.insertChild(nodex);
nodeElement.insertChildByID(nodex.getID(), nodey);
console.log(nodeElement.getChildByID(nodex.getID()));
console.log(nodeElement);
// }
