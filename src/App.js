import React, { useState } from 'react';
import './App.css';

import Display from './Display';
import Keyboard from './Keyboard';


const appName = "Standard Calculator";
const NUMBER_REGEX = /[0-9]+(\.[0-9]+)?/;
const OPERATION_REGEX = /(\+|\-|\*|\/)/;

function App() {
   const [formula, setFormula] = useState([]);
   const [currentVal, setCurrentVal] = useState([]);
   const [answer, setAnswer] = useState(0);
   const [lastEntered, setLastEntered] = useState('0');
   const [history, setHistory] = useState([]);

   const handleNumbers = (event) => {
      const DIGIT_LIMIT = 16;
      const num = event.target.value;
      // If previous value entered is an operator, reset current value arr
      // and initialize it with new number entered
      if (lastEntered.match(OPERATION_REGEX) || lastEntered === '=') {
         if (lastEntered === '=') {
            // Add formula to history
            formula.pop();
            setHistory([...history, { formula, answer }]);
            resetCalculator();
         }
         // Add one leading zero for decimal number < 0
         setCurrentVal(num === '.' ? ['0', '.'] : [num]);
         setLastEntered(num);
      } else {
         const prevVal = [...currentVal];
         if (prevVal.length < DIGIT_LIMIT) {
            // Prevent leading zeros
            if (num === '0' && currentVal.length <= 0 || num === '.' && isDecimal(currentVal)) {
               // pass
            } else {
               // Add one leading zero for decimal number < 0
               if (num === '.' && prevVal.length === 0) {
                  prevVal.push('0');
               }
               setCurrentVal([...prevVal, num]);
               setLastEntered(num);
            }
         } else {
            setCurrentVal(["[digit limit met]"]);
            setTimeout(() => setCurrentVal([...prevVal]), 1200);
         }
      }
   }

   function isDecimal(arr) {
      return arr.indexOf('.') >= 0;
   }

   function toggleSign() {
      if (currentVal.length === 0 || (currentVal.length === 1 && currentVal[0] === '0')) {
         return;
      }

      if (currentVal[0] === '-') {
         currentVal.shift();
         setCurrentVal([...currentVal]);
      } else {
         setCurrentVal(['-', ...currentVal]);
      }
   }

   const handleOperations = (event) => {
      const op = event.target.value; // Operator

      if (lastEntered.match(NUMBER_REGEX)) {
         const value = parseFloat(currentVal.join("") || 0);
         setFormula([...formula, value, op]);
         setLastEntered(op);
      } else if (lastEntered.match(OPERATION_REGEX)) {
         formula.pop();
         setFormula([...formula, op]);
         setLastEntered(op);
      } else if (lastEntered === '=') {
         setFormula([answer, op]);
         setLastEntered(op);
      }
      // Unexpected error
      else {
         console.log('ERROR!! unrecognized value', lastEntered);
      }
   }

   function handleSciFunctions(event) {
      const func = event.target.value;
      const value = Math.round(100000000000 * parseFloat(currentVal.join("") || 0)) / 100000000000;
      let result = undefined;

      switch (func) {
         case "inv":
            result = 1 / value;
            break;
         case "sqr":
            result = Math.pow(value, 2);
            break;
         case "sqrt":
            result = Math.sqrt(value);
            break;
         case "round":
            result = Math.round(value);
            break;
      }

      setFormula([func, '(', value, ')', '=']);
      setLastEntered('=');
      setCurrentVal(result.toString().split(""));
      setAnswer(result);
   }

   function removeLastDigit() {
      currentVal.pop();
      // Remove last element from currenVal. Empty currentVal if 
      // it now only contains ['0'], ['-', '0'], or ['-']
      const N = currentVal.length;
      if ((N == 2 && currentVal[N - 2] === '-' && currentVal[N - 1] === '0') || (currentVal[N - 1] === '-')) {
         setCurrentVal([]);
      } else {
         setCurrentVal([...currentVal]);
      }
   }

   function clearDisplay() {
      setCurrentVal([]);
   }

   function resetCalculator() {
      setCurrentVal([]);
      setFormula([]);
      setAnswer(0);
      setLastEntered('0');
   }

   function handleResult() {
      if (lastEntered === '=') {
         setFormula([answer, '=']);
         setCurrentVal(answer.toString().split(""));
         setLastEntered('=');
      } else {
         // Add current value to formula before evaluating
         const updatedFormula = [...formula, parseFloat(currentVal.join("") || 0)];
         setFormula([...updatedFormula, '=']);
         setLastEntered('=');

         const value = Math.round(100000000000 * evaluate(updatedFormula)) / 100000000000;
         setCurrentVal(value.toString().split(""));
         setAnswer(value);
      }

      // Add formula to history
      formula.pop();
      setHistory([...history, { formula, answer }]);
   }

   function evaluate(expression) {
      let values = [];
      let operators = [];

      for (let i = 0; i < expression.length; i++) {
         let token = expression[i];
         // Current token is a number, push it onto values stack
         if (token.toString().match(/[0-9]+/)) {
            values.push(parseFloat(token));
         }
         // Current token is an operator (+, -, /, x)
         else if (token.match(/[+-/*]/)) {
            // While top of operators stack has a higher or equal level
            // of precedence to current token (which is also an operator)
            // apply operator on top of operators stack to two top values
            while (operators.length > 0 && precedence(token) >= precedence(operators[operators.length - 1])) {
               // First value popped is second operand
               values.push(applyOperations(operators.pop(), values.pop(), values.pop()));
            }
            // Push current token to operators stack
            operators.push(token);
         }
      }

      // the entire expression has been parsed at this point, 
      // apply remaining operators to remaining values
      while (operators.length > 0) {
         // Remember, first value popped is second operand
         values.push(applyOperations(operators.pop(), values.pop(), values.pop()));
      }

      return values.pop();
   }

   function applyOperations(operator, y, x) {
      switch (operator) {
         case '+':
            return x + y;
         case '-':
            return x - y;
         case '*':
            return x * y;
         case '/':
            return x / y;
      }
   }

   function precedence(x) {
      switch (x) {
         case '*': case '/':
            return 2;
         case '+': case '-':
            return 1;
      }
   }

   return (
      <div className="App">
         <div id="calculator">
            <h1 id="app_name">{appName}</h1>
            <Display formula={formula.join(" ")} 
                     currentVal={currentVal.join("") || 0}
            />
            <Keyboard clear={clearDisplay}
                      reset={resetCalculator}
                      delete={removeLastDigit}
                      operations={handleOperations}
                      functions={handleSciFunctions}
                      numbers={handleNumbers}
                      toggleSign={toggleSign}
                      handleResult={handleResult}
            />
         </div>
         <div id="welcome">
            <p>Designed and Coded By 
               <a href="https://www.github.com/cdngouma" 
                  target="_blank" rel="noopener noreferrer">cdngouma</a>
            </p>
         </div>
      </div>
   );
}

export default App;