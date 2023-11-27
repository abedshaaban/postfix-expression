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

  getParentID() {
    let queue = [...this.children];

    while (queue.length > 0) {
      const child = queue.shift();

      const nodeChildren = child.getChild();

      for (let i = 0; i < nodeChildren.length; i++) {
        if (nodeChildren[i].getID() === id) {
          queue = [];
          return child.getID();
        } else {
          queue.push(nodeChildren[i]);
        }
      }
    }
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

        for (let i = 0; i < nodeChildren.length; i++) {
          queue.push(nodeChildren[i]);
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

        for (let i = 0; i < nodeChildren.length; i++) {
          queue.push(nodeChildren[i]);
        }
      }
    }
  }

  deleteNodeById(id) {
    if (this.root.id === id) {
      if (this.children.length === 0) this.root = null;
      else if (this.children.length > 1)
        console.log(
          "Cannot delete root node since it has multiple child nodes."
        );
      else {
        const childNode = this.children.shift();
        this.children.push(...childNode.getChild());
        childNode.deleteAllChildren();
        this.root = childNode;
      }
    } else {
      const upcomingTree = new Tree();
      upcomingTree.root = this.root;

      const queue = [...this.children];
      const queueSecond = [];

      while (queue.length > 0 || queueSecond > 0) {
        const currentNode =
          queue.length > 0 ? queue.shift() : queueSecond.shift();

        if (currentNode.getID() !== id) {
          if (queue.length >= 0) {
            upcomingTree.insertChild(new Node(currentNode.getValue()));
          } else if (queueSecond.length > 0) {
            upcomingTree.insertChildByID(
              currentNode.getParentID(),
              new Node(currentNode.getValue())
            );
          }
        }

        for (let i = 0; i < currentNode.getChild().length; i++) {
          queueSecond.push(currentNode.getChild()[i]);
        }
      }

      this.children = [...upcomingTree.getChild()];
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
  console.log(daTree);

  const { action, id, value } = await getInput();

  console.clear();

  switch (action) {
    case dictActions.insertNode:
      daTree.insertChild(new Node(value));
      console.log(`added ${value}`);
      break;

    case dictActions.insertNodeById:
      daTree.insertChildByID(id, new Node(value));
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
}
