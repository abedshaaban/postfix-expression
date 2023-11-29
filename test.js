import test from "ava";
import { Node } from "./classes/index.js";

test("Node create", (t) => {
  const node = new Node(42);

  t.is(typeof node.getID(), "string");
  t.deepEqual(node.getValue(), 42);
  t.deepEqual(node.getChild(), []);
});

test("Node update value", (t) => {
  const node = new Node(12);

  node.updateValue(24);
  t.deepEqual(node.getValue(), 24);
});

test("Node insert child", (t) => {
  const node = new Node(45);
  const nodeChild = new Node(66);

  node.insertChild(nodeChild);
  t.true(node.getChild().includes(nodeChild));
});

test("Node remove child by id", (t) => {
  const node = new Node(99);
  const childToRemove = new Node(0);

  t.deepEqual(node.getChild(), []);

  node.insertChild(childToRemove);
  node.insertChild(new Node(33));

  t.is(node.getChild().length, 2);

  node.removeChild(childToRemove.getID());

  t.is(node.getChild().length, 1);
});

test("Node remove all children", (t) => {
  const node = new Node(3);

  node.insertChild(new Node(6));
  node.insertChild(new Node(9));
  node.insertChild(new Node(12));

  t.is(node.getChild().length, 3);

  node.deleteAllChildren();

  t.deepEqual(node.getChild(), []);
});
