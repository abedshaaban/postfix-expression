import test from "ava";
import { Node } from "./classes/index.js";

test("Creating a node", (t) => {
  const node = new Node(42);

  t.is(typeof node.getID(), "string");
  t.is(node.getValue(), 42);
  t.is(node.getChild(), []);
});
