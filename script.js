const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', (event) => {
  if (!event.target.closest('button')) return;
  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;

  const type = key.dataset.type;

  const previousKeyType = calculator.dataset.previousKeyType;

  if (type === 'number') {
    if (displayValue === '0') {
      display.textContent = keyValue;
    } else if (previousKeyType === 'operator') {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }
  if (type === 'plus-minus') {
    display.textContent = -displayValue;
  }
  if (type === 'persentage') {
    display.textContent = displayValue / 100;
  }
  if (type === 'operator') {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((key) => (key.dataset.state = ''));

    key.dataset.state = 'selected';
    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }
  calculator.dataset.previousKeyType = type;
  if (type === 'equal') {
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    const selected = document.querySelector('[data-state="selected"]');
    selected.dataset.state = '';

    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  if (type === 'clear') {
    display.textContent = 0;
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }
  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);
  let result = '';
  switch (operator) {
    case 'minus':
      result = firstNumber - secondNumber;
      break;
    case 'plus':
      result = firstNumber + secondNumber;
      break;
    case 'times':
      result = firstNumber * secondNumber;
      break;
    case 'divide':
      result = firstNumber / secondNumber;
      break;
  }
  return Number.isInteger(result) ? result : result.toFixed(2);
}
