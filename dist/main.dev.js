"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// alert("Alex is testing his connection");
var Calculator =
/*#__PURE__*/
function () {
  function Calculator(currentOperandTextElement, previousOperandTextElement) {
    _classCallCheck(this, Calculator);

    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  }, {
    key: "delete",
    value: function _delete() {}
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.currentOperand === '') return;

      if (this.previousOperand !== '') {
        this.compute();
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  }, {
    key: "compute",
    value: function compute() {
      var computation;
      var prev = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;

        case '-':
          computation = prev - current;
          break;

        case 'x':
          computation = prev * current;
          break;

        case '÷':
          computation = prev / current;
          break;

        default:
          return;
      }

      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand;
      this.previousOperandTextElement.innerText = this.previousOperand;
    }
  }]);

  return Calculator;
}();

var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals');
var deleteButton = document.querySelector('[data-delete');
var allClearButton = document.querySelector('[data-all-clear');
var previousOperandTextElement = document.querySelector('[data-previous-operand');
var currentOperandTextElement = document.querySelector('[data-current-operand');
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener('click', function (button) {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener('click', function (button) {
  calculator.clear();
  calculator.updateDisplay();
});