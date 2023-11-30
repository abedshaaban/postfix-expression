import { nanoid } from "nanoid";

/**
 * `Node` creates an object with an `id`, `value`, and `children`
 *
 * @param value value of the Node.
 */
export default class Node {
  constructor(value) {
    this.id = nanoid(4);
    this.value = parseInt(value);
    this.children = [];
  }

  /**
   *
   * @returns `Node` id
   */
  getID() {
    return this.id;
  }

  /**
   *
   * @returns `Node` value
   */
  getValue() {
    return this.value;
  }

  /**
   *
   * @returns list of `Node` children
   */
  getChild() {
    return this.children;
  }

  /**
   *
   * @returns Node's parent id
   */
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

  /**
   * updates `Node` value
   *
   * @param value new value of the node
   */
  updateValue(newValue) {
    this.value = newValue;
  }

  /**
   * inserts a new `Node` to the children
   *
   * @param Node
   */
  insertChild(node) {
    this.children.push(node);
  }

  /**
   * removes a child with id from a `Node`
   *
   * @param id Node's id
   */
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

  /**
   * delete all children of a `Node`
   *
   */
  deleteAllChildren() {
    this.children = [];
  }
}
