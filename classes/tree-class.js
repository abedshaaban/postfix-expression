import Node from "./node-class.js";

/**
 * `Tree` creates a tree object
 */
export default class Tree {
  constructor(node) {
    this.root = node === undefined ? null : node;
    this.children = [];
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
   * @returns `Node` with a specific id
   */
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

  /**
   * inserts a new `Node` to the children
   *
   * @param Node
   */
  insertChild(node) {
    if (this.root === null) {
      this.root = node;
    } else {
      this.children.push(node);
    }
  }

  /**
   * inserts a new `Node` to a specific parent `Node`
   *
   * @param Node
   */
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

  /**
   * deletes a `Node` with id
   *
   * @param id Node's id
   */
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

export { Node, Tree };
