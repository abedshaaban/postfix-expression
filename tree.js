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

  deleteAllChildren() {
    this.children = [];
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

  deleteNodeById(id) {
    if (this.root.id === id) {
      if (this.children.length === 0) this.root = null;
      else if (this.children.length >= 1)
        console.log(
          "Cannot delete root node since it has multiple child nodes."
        );
      else {
        const childNode = this.children.shift();
        this.root = childNode.deleteAllChildren();
        this.children.push(childNode.getChild());
      }
    } else {
      //  remove node
    }
  }
}

const dictActions = {
  exit: "exit",
  insertNode: "insertNode",
  insertNodeById: "insertNodeById",
  deleteNode: "deleteNode",
};

async function getInput() {
  const response = await prompts([
    {
      type: "select",
      name: "action",
      message: "What do you want to do?",
      choices: [
        { title: "insert node", value: dictActions.insertNode },
        { title: "insert node by id", value: dictActions.insertNodeById },
        { title: "delete node", value: dictActions.deleteNode },
        { title: "exit program", value: dictActions.exit },
      ],
    },
    {
      type: (prev) =>
        prev === dictActions.insertNode || prev === dictActions.insertNodeById
          ? "text"
          : null,
      name: "value",
      message: "Enter value of node (numbers only):",
    },
    {
      type: (_, value) =>
        value.action === dictActions.insertNodeById ? "text" : null,
      name: "id",
      message: "Enter parent id to insert into:",
    },
    {
      type: (_, value) =>
        value.action === dictActions.deleteNode ? "text" : null,
      name: "id",
      message: "Enter node id to be deleted:",
    },
    {
      type: (prev) => (prev === dictActions.exit ? null : ""),
      name: "value",
    },
  ]);

  return response;
}

const daTree = new Tree();
let runningProgram = true;

while (runningProgram) {
  const { action, id, value } = await getInput();

  console.clear();

  switch (action) {
    case dictActions.insertNode:
      daTree.insertChild(value);
      console.log(`added ${value}`);
      break;

    case dictActions.insertNodeById:
      daTree.insertChildByID(id, value);
      console.log(`added ${value} to parent ${id}`);
      break;

    case dictActions.deleteNode:
      if (!daTree.root?.id) {
        console.log(`Tree is empty`);
      } else {
        daTree.deleteNodeById(id);
        console.log(`deleted node of ${id}`);
      }
      break;

    case dictActions.exit:
      console.log("program closed.");
      runningProgram = false;
      break;

    default:
      throw new Error("invalid action chosen!???");
  }

  //   const nodex = new Node(12);
  //   const nodey = new Node(9);

  // nodeElement.insertChild(new Node(6));
  // nodeElement.insertChild(nodex);
  // nodeElement.insertChildByID(nodex.getID(), nodey);
  // console.log(nodeElement.getChildByID(nodex.getID()));
  // console.log(nodeElement);
}
