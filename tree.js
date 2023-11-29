import prompts from "prompts";
import { red, reset, cyan, green, lightYellow, magenta } from "kolorist";
import { Tree, Node } from "./blue-prints.js";

const dictActions = {
  exit: "exit",
  insertNode: "insertNode",
  insertNodeById: "insertNodeById",
  getNode: "getNode",
  deleteNode: "deleteNode",
};

async function getInput() {
  const response = await prompts([
    {
      type: "select",
      name: "action",
      message: "What do you want to do?",
      choices: [
        { title: reset("insert node"), value: dictActions.insertNode },
        {
          title: reset("insert node by id"),
          value: dictActions.insertNodeById,
        },
        { title: reset("get node"), value: dictActions.getNode },
        { title: reset("delete node"), value: dictActions.deleteNode },
        { title: reset("exit program"), value: dictActions.exit },
      ],
    },
    {
      type: (prev) =>
        prev === dictActions.insertNode || prev === dictActions.insertNodeById
          ? "text"
          : null,
      name: "value",
      message: green("Enter value of node (numbers only):"),
    },
    {
      type: (_, value) =>
        value.action === dictActions.insertNodeById ? "text" : null,
      name: "id",
      message: cyan("Enter parent id:"),
    },
    {
      type: (_, value) =>
        value.action === dictActions.deleteNode ? "text" : null,
      name: "id",
      message: red("Enter node id to be deleted:"),
    },
    {
      type: (_, value) =>
        value.action === dictActions.getNode ? "text" : null,
      name: "id",
      message: cyan("Enter node id to get:"),
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
      console.log(`added ${cyan(value)}`);
      break;

    case dictActions.insertNodeById:
      daTree.insertChildByID(id, new Node(value));
      console.log(`added ${green(value)} to parent ${cyan(id)}`);
      break;

    case dictActions.getNode:
      console.log(`get node of id: ${cyan(id)}`);
      console.log(daTree.getChildByID(id));
      break;

    case dictActions.deleteNode:
      if (!daTree.root?.id) {
        console.log(`Tree is empty`);
      } else {
        daTree.deleteNodeById(id);
        console.log(`deleted node of ${cyan(id)}`);
      }
      break;

    case dictActions.exit:
      console.log(lightYellow("program closed."));
      runningProgram = false;
      break;

    default:
      throw new Error("invalid action chosen!???");
  }

  console.log(magenta("------------------------------"));
}
