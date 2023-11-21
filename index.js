import prompts from "prompts";

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

function evaluatePostfix(numbers) {
  const stack = [];
  for (let i = 0; i < numbers.length; i++) {
    if (!isNaN(numbers[i])) {
      stack.push(numbers[i]);
    } else {
      const operator = numbers[i];
      const num2 = parseInt(stack.pop());
      const num1 = parseInt(stack.pop());
      const result = operate(num1, num2, operator);
      stack.push(result);
    }
  }

  if (stack.length !== 1) {
    throw new Error("This is not a valid expression");
  }

  return stack.pop();
}

(async () => {
  const response = await prompts({
    type: "text",
    name: "nums",
    message: "Enter math numbers & operators:",
  });
  const expression = response.nums;
  const expression_array = expression.split(" ");
  const result = evaluatePostfix(expression_array);
  console.log(result);
})();
