import React, { useState } from 'react';
import './App.css';

const appName = "Standard Calculator";
const DIGIT_LIMIT = 16;
const NUMBER_REGEX = /[0-9]+(\.[0-9]+)?/;
const OPERATION_REGEX = /(\+|\-|\/|x)/;
const FUNCTION_REGEX = /(inv|sqr|sqrt)/;

function App() {
   const [formula, setFormula] = useState([]);
   const [currentVal, setCurrentVal] = useState([]);
   const [answer, setAnswer] = useState(0);
   const [lastEntered, setLastEntered] = useState('0');

   const handleDigitInput = (event) => {
      const digit = event.target.textContent;

      if (lastEntered.match(OPERATION_REGEX)) {
         setCurrentVal([digit]);
         setLastEntered(digit);
      }
      else {
         const oldVal = currentVal;

         if (oldVal.length < DIGIT_LIMIT) {
            if (digit === '0' && currentVal.length <= 0 || digit === '.' && isDecimal(currentVal)) {
               // pass
            } else {
               if (digit === '.' && oldVal.length === 0) {
                  oldVal.push('0');
               }

               setCurrentVal([...oldVal, digit]);
               setLastEntered(digit);
            }
         } else {
            setCurrentVal(["{Digit limit met}"]);
            setTimeout(() => setCurrentVal([...oldVal]), 1200);
         }
      }
   }

   const handleBasicOperationInput = (event) => {
      if (lastEntered.match(NUMBER_REGEX)) {
         const newAnswer = parseFloat(currentVal.join("") || 0);
         const op = event.target.textContent;

         setAnswer(newAnswer);
         setFormula([...formula, newAnswer, op]);
         setLastEntered(op);

      } else if (lastEntered.match(OPERATION_REGEX)) {
         const op = event.target.textContent;
         formula.pop();
         setFormula([...formula, op]);
         setLastEntered(op);
      } else {
         console.log('ERROR!! unrecognized value', lastEntered);
      }
   }

   function isDecimal(arr) {
      return arr.indexOf('.') >= 0;
   }

   function removeLastDigit() {
      currentVal.pop();

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

   function evaluate(expression) {

   }

   /* Scientific Functions */
   /*function inverse(x) {
      return 1/x;
   }

   function square(x) {
      return Math.pow(x, 2);
   }

   function squareRoot(x) {
      return Math.sqrt(x);
   }

   function percent(x) {
      return x * 100;
   }*/

   /* Basic Operations */
   /*function add(a, b) {
      return a + b;
   }

   function subtract(a, b) {
      return a - b;
   }

   function multiply(a, b) {
      return a * b;
   }

   function divide(a, b) {
      return 
   }*/

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
               <button id="add" className="app__func-btn" onClick={handleBasicOperationInput}>+</button>
               <button id="subtract" className="app__func-btn" onClick={handleBasicOperationInput}>-</button>
               <button id="multiply" className="app__func-btn" onClick={handleBasicOperationInput}>x</button>
               <button id="divide" className="app__func-btn" onClick={handleBasicOperationInput}>/</button>
               {/* Scientific functions */}
               <button id="sqr" className="app__func-btn">sqr</button>
               <button id="sqrt" className="app__func-btn">sqrt</button>
               <button id="inv" className="app__func-btn">inv</button>
               <button id="percent" className="app__func-btn">%</button>
               {/* digits buttons */}
               <button id="zero" onClick={handleDigitInput}>0</button>
               <button id="one" onClick={handleDigitInput}>1</button>
               <button id="two" onClick={handleDigitInput}>2</button>
               <button id="three" onClick={handleDigitInput}>3</button>
               <button id="four" onClick={handleDigitInput}>4</button>
               <button id="five" onClick={handleDigitInput}>5</button>
               <button id="six" onClick={handleDigitInput}>6</button>
               <button id="seven" onClick={handleDigitInput}>7</button>
               <button id="eight" onClick={handleDigitInput}>8</button>
               <button id="nine" onClick={handleDigitInput}>9</button>
               {/* other buttons */}
               <button id="decimal" onClick={handleDigitInput}>.</button>
               <button id="equals">=</button>
            </div>
         </div>
         <div id="welcome">
            <p>Designed and Coded By <a href="https://www.github.com/cdngouma" target="_blank" rel="noopener noreferrer">cdngouma</a></p>
         </div>
      </div>
   );
}

export default App;