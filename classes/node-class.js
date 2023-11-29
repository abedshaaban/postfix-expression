import { nanoid } from "nanoid";

export default class Node {
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
