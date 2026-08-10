const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.btn');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateScreen() {
  screen.textContent = displayValue;
}

function clearCalculator() {
  displayValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateScreen();
}

function inputNumber(number) {
  if (waitingForSecondValue) {
    displayValue = String(number);
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === '0' ? String(number) : displayValue + number;
  }

  updateScreen();
}

function inputDecimal() {
  if (waitingForSecondValue) {
    displayValue = '0.';
    waitingForSecondValue = false;
  } else if (!displayValue.includes('.')) {
    displayValue += '.';
  }

  updateScreen();
}

function performCalculation(n1, n2, operation) {
  const a = Number(n1);
  const b = Number(n2);

  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        return 'Error';
      }
      return a / b;
    default:
      return b;
  }
}

function handleOperator(nextOperator) {
  const inputValue = Number(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = inputValue;
  } else if (operator) {
    const result = performCalculation(firstValue, inputValue, operator);
    displayValue = String(result);
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
  updateScreen();
}

function handleEquals() {
  if (operator === null || waitingForSecondValue) {
    return;
  }

  const inputValue = Number(displayValue);
  const result = performCalculation(firstValue, inputValue, operator);
  displayValue = String(result);
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateScreen();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'number') {
      inputNumber(value);
    } else if (action === 'decimal') {
      inputDecimal();
    } else if (action === 'operator') {
      handleOperator(value);
    } else if (action === 'equals') {
      handleEquals();
    } else if (action === 'clear') {
      clearCalculator();
    } else if (action === 'delete') {
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
      } else {
        displayValue = '0';
      }
      updateScreen();
    }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    inputNumber(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleOperator(key);
  } else if (key === 'Enter' || key === '=') {
    handleEquals();
  } else if (key === 'Escape') {
    clearCalculator();
  } else if (key === 'Backspace') {
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
    } else {
      displayValue = '0';
    }
    updateScreen();
  }
});

updateScreen();