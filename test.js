import test from "ava";
import { Tree, Node } from "./classes/index.js";

test("Node: create node", (t) => {
  const node = new Node(42);

  t.is(typeof node.getID(), "string");
  t.deepEqual(node.getValue(), 42);
  t.deepEqual(node.getChild(), []);
});

test("Node: update node value", (t) => {
  const node = new Node(12);

  node.updateValue(24);
  t.deepEqual(node.getValue(), 24);
});

test("Node: insert a new child to a node", (t) => {
  const node = new Node(45);
  const nodeChild = new Node(66);

  node.insertChild(nodeChild);
  t.true(node.getChild().includes(nodeChild));
});

test("Node: remove child by id from a node", (t) => {
  const node = new Node(99);
  const childToRemove = new Node(0);

  t.deepEqual(node.getChild(), []);

  node.insertChild(childToRemove);
  node.insertChild(new Node(33));

  t.is(node.getChild().length, 2);

  node.removeChild(childToRemove.getID());

  t.is(node.getChild().length, 1);
});

test("Node: remove all children from a node", (t) => {
  const node = new Node(3);

  node.insertChild(new Node(6));
  node.insertChild(new Node(9));
  node.insertChild(new Node(12));

  t.is(node.getChild().length, 3);

  node.deleteAllChildren();

  t.deepEqual(node.getChild(), []);
});

test("Tree: create tree", (t) => {
  const tree = new Tree();

  t.is(tree.getRoot(), null);
  t.deepEqual(tree.getChild(), []);
});

test("Tree: add root node", (t) => {
  const tree = new Tree();

  t.is(tree.getRoot(), null);

  tree.insertChild(new Node(12));

  t.not(tree.getRoot(), null);
});

test("Tree: get root value", (t) => {
  const tree = new Tree();

  tree.insertChild(new Node(33));

  t.is(tree.getRoot().getValue(), 33);
});

test("Tree: update root value", (t) => {
  const tree = new Tree();

  tree.insertChild(new Node(77));
  tree.getRoot().updateValue(1);

  t.is(tree.getRoot().getValue(), 1);
});

test("Tree: insert child to root", (t) => {
  const tree = new Tree();

  t.deepEqual(tree.getChild(), []);

  tree.insertChild(new Node(8));
  tree.insertChild(new Node(9));

  t.is(tree.getChild().length, 1);
  t.is(tree.getChild()[0].getValue(), 9);
});

test("Tree: insert node by id", () => {});

test("Tree: get node by id", () => {});

test("Tree: delete node by id", () => {});
