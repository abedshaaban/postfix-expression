import prompts from "prompts";
import { nanoid } from "nanoid";

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    case "*":
      return num1 * num2;
    default:
      throw new Error("Invalid operator:" + operator);
  }
}



function treeNode(char, childrenNode = []) {
  return { id: nanoid(4), value: char, children: childrenNode };
}

function getchildren(id, tr) {
  let val;
  for (let i = 0; i < tr.length; i++) {
    if (id === tr[i].id) {
      val = tr[i];
    }
  }

  return val;
}

function getNodesValue(node, tr) {
  const children = node.children;

  const child1 = getchildren(children[0], tr);
  const child2 = getchildren(children[1], tr);

  return operate(
    child2.children.length === 0 ? child2.value : getNodesValue(child2, tr),
    child1.children.length === 0 ? child1.value : getNodesValue(child1, tr),
    node.value
  );
}

function getTreeValue(tr) {
  let value = null;

  const parentNode = tr[tr.length - 1];

  if (!isNaN(parentNode.value)) {
    throw new Error("This is not a valid expression");
  } else {
    if (parentNode.children.length === 0) {
      value = parentNode.value;
    } else {
      value = getNodesValue(parentNode, tr);
    }
  }

  return value;
}

function treePostfix(expression) {
  let tree = [];

  if (expression.length === 1 && expression[0] === "") {
    throw new Error("Expression is empty");
  }

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (isNaN(char)) {
      const prevNode = tree[i - 1];
      const prevPrevNode = tree[i - 2];

      if (!isNaN(prevNode)) {
        const node = treeNode(parseInt(char));
        tree.push(node);
      } else {
        const node = treeNode(char, [prevNode.id, prevPrevNode.id]);
        tree.push(node);
      }
    } else {
      tree.push(treeNode(parseInt(char)));
    }
  }

  console.log(tree);
  return getTreeValue(tree);
}

(async () => {
  const response = await prompts({
    type: "text",
    name: "nums",
    message: "Enter math numbers & operators:",
  });
  const expression = response.nums;
  const expression_array = expression.split(" ");
  const treeResult = treePostfix(expression_array);

  console.log("stack value: ", stackResult);

  console.log("tree value:", treeResult);
})();
