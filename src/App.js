import React, { useState } from 'react';
import './App.css';

const appName = "Standard Calculator";
const NUMBER_REGEX = /[0-9]+(\.[0-9]+)?/;
const OPERATION_REGEX = /(\+|\-|\*|\/)/;
const FUNCTION_REGEX = /(inv|sqr|sqrt)/;

function App() {
   const [formula, setFormula] = useState([]);
   const [currentVal, setCurrentVal] = useState([]);
   const [answer, setAnswer] = useState(0);
   const [lastEntered, setLastEntered] = useState('0');

   const handleNumbers = (event) => {
      const DIGIT_LIMIT = 16;
      const num = event.target.value;
      // If previous value entered is an operator, reset current value arr
      // and initialize it with new number entered
      if (lastEntered.match(OPERATION_REGEX)) {
         // Add one leading zero for decimal number < 0
         setCurrentVal(num === '.' ? ['0', '.'] : [num]);
         setLastEntered(num);
      }
      else {
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

   const handleOperations = (event) => {
      const op = event.target.value; // Operator

      if(lastEntered.match(NUMBER_REGEX)) {
         const value = parseFloat(currentVal.join("") || 0);
         setFormula([...formula, value, op]);
         setLastEntered(op);
      } else if(lastEntered.match(OPERATION_REGEX)) {
         formula.pop();
         setFormula([...formula, op]);
         setLastEntered(op);
      } else if(lastEntered === '=') {
         setFormula([answer, op]);
         setLastEntered(op);
      }
      // Unexpected error
      else {
         console.log('ERROR!! unrecognized value', lastEntered);
      }
   }

   function isDecimal(arr) {
      return arr.indexOf('.') >= 0;
   }

   function removeLastDigit() {
      currentVal.pop();
      // Remove last element from currenVal
      // Empty currentVal if it now only contains a zero
      if (currentVal.length === 1 && currentVal[0] === '0') {
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
      // Add current value to formula before evaluating
      const updatedFormula = [...formula, parseFloat(currentVal.join("") || 0)];
      setFormula([...updatedFormula, '=']);
      setLastEntered('=');

      const value = evaluate(updatedFormula);
      setCurrentVal(value.toString().split(""));
      setAnswer(value);
   }

   function evaluate(expression) {
      let values = [];
      let operators = [];
      console.log('formula used', expression);
    
      for(let i = 0; i < expression.length; i++) {
        let token = expression[i];
        console.log(token, typeof(token));
        // Current token is a number, push it onto values stack
        if(token.toString().match(/[0-9]+/)) {
          values.push(parseFloat(token));
        }
        // Current token is an operator (+, -, /, x)
        else if(token.match(/[+-/*]/)) {
          // While top of operators stack has a higher or equal level
          // of precedence to current token (which is also an operator)
          // apply operator on top of operators stack to two top values
          while(operators.length > 0 && precedence(token) >= precedence(operators[operators.length-1])) {
            // First value popped is second operand
            values.push(applyOperations(operators.pop(), values.pop(), values.pop()));
          }
          // Push current token to operators stack
          operators.push(token);
        }
      }
    
      // the entire expression has been parsed at this point, 
      // apply remaining operators to remaining values
      while(operators.length > 0) {
        // Remember, first value popped is second operand
        values.push(applyOperations(operators.pop(), values.pop(), values.pop()));
      }

      return values.pop();
    }
    
    function applyOperations(operator, y, x) {
      switch(operator) {
        case '+':
          return x + y;
        case '-':
          return x - y;
        case '*':
          return x*y;
        case '/':
          return x/y;
      }
    }
    
    function precedence(x) {
      switch(x) {
        case '*': case '/':
          return 2;
        case '+': case '-':
          return 1;
      }
    }

   /* Scientific Functions */

   function handleSciFunctions(event) {
      const func = event.target.value;
      const value = parseFloat(currentVal.join("") || 0);
      let result = undefined;
      switch(func) {
         case "inv":
            result = 1/value;
            break;
         case "sqr":
            result = Math.pow(value, 2);
            break;
         case "sqrt":
            result = Math.sqrt(value);
            break;
      }

      console.log("result", result, "func", func, value);
      setFormula([func, '(', value, ')', '=']);
      setLastEntered('=');
      setCurrentVal(result.toString().split(""));
      setAnswer(result);
   }

   return (
      <div className="App">
         <div id="calculator">
            <h1 id="app_name">{appName}</h1>
            <div id="display">
               <span id="formula-display">{formula.join(" ")}</span>
               <span id="result-display">{currentVal.join("") || 0}</span>
            </div>

            <div id="keyboard">
               {/* System buttons */}
               <button id="clear" className="app__func-btn" onClick={clearDisplay}>CE</button>
               <button id="reset" className="app__func-btn" onClick={resetCalculator}>C</button>
               <button id="delete" className="app__func-btn" onClick={removeLastDigit}>DEL</button>
               {/* Basic operators */}
               <button id="add" className="app__func-btn" value="+" onClick={handleOperations}>+</button>
               <button id="subtract" className="app__func-btn" value="-" onClick={handleOperations}>&minus;</button>
               <button id="multiply" className="app__func-btn" value="*" onClick={handleOperations}>&times;</button>
               <button id="divide" className="app__func-btn" value="/" onClick={handleOperations}>&divide;</button>
               {/* Scientific functions */}
               <button id="sqr" className="app__func-btn" value="sqr" onClick={handleSciFunctions}>sqr</button>
               <button id="sqrt" className="app__func-btn" value="sqrt" onClick={handleSciFunctions}>sqrt</button>
               <button id="inv" className="app__func-btn" value="inv" onClick={handleSciFunctions}>inv</button>
               <button id="percent" className="app__func-btn">%</button>
               {/* digits buttons */}
               <button id="zero" onClick={handleNumbers} value="0">0</button>
               <button id="one" onClick={handleNumbers} value="1">1</button>
               <button id="two" onClick={handleNumbers} value="2">2</button>
               <button id="three" onClick={handleNumbers} value="3">3</button>
               <button id="four" onClick={handleNumbers} value="4">4</button>
               <button id="five" onClick={handleNumbers} value="5">5</button>
               <button id="six" onClick={handleNumbers} value="6">6</button>
               <button id="seven" onClick={handleNumbers} value="7">7</button>
               <button id="eight" onClick={handleNumbers} value="8">8</button>
               <button id="nine" onClick={handleNumbers} value="9">9</button>
               {/* other buttons */}
               <button id="decimal" onClick={handleNumbers} value=".">.</button>
               <button id="equals" onClick={handleResult}>=</button>
            </div>
         </div>
         <div id="welcome">
            <p>Designed and Coded By <a href="https://www.github.com/cdngouma" target="_blank" rel="noopener noreferrer">cdngouma</a></p>
         </div>
      </div>
   );
}

export default App;