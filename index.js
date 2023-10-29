const display = document.getElementById('display');

const buttons = Array.from(document.getElementsByClassName('button'));

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        switch (e.target.innerText) {
            case 'C':
                display.innerText = '';
                break;
            case '=':
                try {
                    display.innerText = evaluateExpression(display.innerText);
                } catch {
                    display.innerText = "Error";
                }
                break;
            case '←':
                if (display.innerText) {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});

function evaluateExpression(expression) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b

    };

    const tokens = expression.match(/\d+|\+|\-|\*|\//g);

    const postfix = infixToPostfix(tokens);

    const stack = [];

    for (const token of postfix) {
        if (operators.hasOwnProperty(token)) {
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            const result = operators[token](operand1, operand2);
            stack.push(result);
        } else {
            stack.push(parseFloat(token));
        }
    }

    return stack.pop();
}

function infixToPostfix(tokens) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const outputQueue = [];
    const operatorStack = [];

    for (const token of tokens) {
        if (/[+\-*/]/.test(token)) {
            while (
                operatorStack.length > 0 &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else {
            outputQueue.push(token);
        }
    }

    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
}
