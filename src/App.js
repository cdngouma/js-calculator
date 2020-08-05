import React from 'react';
import './App.css';

import Display from './Display';
import Keyboard from './Keyboard';


const appName = "Standard Calculator";
const NUMBER_REGEX = /[0-9]+(\.[0-9]+)?/;
const OPERATION_REGEX = /(\+|-|\*|\/)/;

function App() {
   const [formula, setFormula] = React.useState([]);
   const [currentVal, setCurrentVal] = React.useState([]);
   const [answer, setAnswer] = React.useState(0);
   const [lastEntered, setLastEntered] = React.useState('0');
   const [backgroundColor, setbackgroundColor] = React.useState('#7fffd4');

   const handleNumbers = (event) => {
      const num = event.key || event.target.value;
      const DIGIT_LIMIT = 15;  // Max number of character in an input value
      
      // If previous value entered is an operator, reset current value list
      // and initialize it with the new value entered
      if (lastEntered.match(OPERATION_REGEX) || lastEntered === '=') {
         if (lastEntered === '=') {
            resetCalculator();
         }
         // Add one leading zero for decimal number < 0
         setCurrentVal(num === '.' ? ['0', '.'] : [num]);
         setLastEntered(num);
      } 
      // If previous value entered is a digit or decimal point (.),
      // keep adding digits to the current value list
      else {
         const prevVal = [...currentVal];
         if (prevVal.length < DIGIT_LIMIT) {
            if ((num === '0' && currentVal.length <= 0) ||
               (num === '.' && isDecimal(currentVal))) {
               // Prevent leading zeros for non decimal numbers
            } else {
               // Add one leading zero for decimal number < 0
               if (num === '.' && prevVal.length === 0) {
                  prevVal.push('0');
               }
               setCurrentVal([...prevVal, num]);
               setLastEntered(num);
            }
         } 
         // Print error message if digit limit is reached
         else {
            setCurrentVal(["    digit limit met"]);
            setTimeout(() => setCurrentVal([...prevVal]), 1200);
         }
      }
   }

   function isDecimal(arr) {
      return arr.indexOf('.') >= 0;
   }

   function toggleSign() {
      if (currentVal.length === 0 || 
            (currentVal.length === 1 &&  currentVal[0] === '0') || 
            lastEntered === '=') {
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
      const op = event.key || event.target.value; // Operator +, -, /, or *

      if (lastEntered.match(NUMBER_REGEX)) {
         const value = parseFloat(currentVal.join("") || 0);
         setFormula([...formula, value, op]);
         setLastEntered(op);
      } 
      // Update operator
      else if (lastEntered.match(OPERATION_REGEX)) {
         formula.pop();
         setFormula([...formula, op]);
         setLastEntered(op);
      } else if (lastEntered === '=') {
         setFormula([answer, op]);
         setLastEntered(op);
      }
      // Unexpected error
      else {
         console.error('ERROR!! operator not recognized:', lastEntered);
      }
   }

   function handleSciFunctions(event) {
      const func = event.target.value;
      const value = parseFloat(currentVal.join("") || 0);
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
         default:
      }

      setFormula([func, '(', value, ')', '=']);
      setLastEntered('=');
      setCurrentVal([result.toString()]);
      setAnswer(result);
   }

   function removeLastDigit() {
      currentVal.pop();
      const N = currentVal.length;

      if (lastEntered === '=') {
         setCurrentVal([]);
      }
      // Remove last element from currenVal. Empty currentVal if 
      // it now only contains ['0'], ['-', '0'], or ['-']
      else if ((N === 2 && currentVal[N - 2] === '-' && currentVal[N - 1] === '0') || 
               (currentVal[N - 1] === '-')) {
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
         const value = eval(updatedFormula.join(""));
         setCurrentVal([value.toString()]);
         setAnswer(value);
      }
   }

   function changeBgColor() {
      const COLORS = ['#7fffd4','#e9967a','#008b8b','#f0e68c','#ffdead','#bc8f8f','#008080'];
      setbackgroundColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
   }

   function handleKeyPress(event) {
      event.preventDefault();

      if (event.key.match(NUMBER_REGEX) || event.key === '.') {
         handleNumbers(event);
      } else if (event.key.match(OPERATION_REGEX)) {
         handleOperations(event);
      } else if (event.key === 'Enter') {
         handleResult();
      } else if (event.key === 'Backspace') {
         removeLastDigit();
      }
   }

   return (
      <div className="App" style={{backgroundColor: backgroundColor}}>
         <div id="calculator" tabIndex={-1} onKeyDown={handleKeyPress}>
            <div id="header">
               <h1 id="app_name">{appName}</h1>
               <i id="color" 
                  className="fa fa-paint-brush" 
                  aria-hidden="true" 
                  onClick={changeBgColor}></i>
            </div>
            <Display formula={formula.join(" ")} 
                     currentVal={currentVal.join("") || '0'} />
            <Keyboard clear={clearDisplay}
               reset={resetCalculator}
               delete={removeLastDigit}
               operations={handleOperations}
               functions={handleSciFunctions}
               numbers={handleNumbers}
               toggleSign={toggleSign}
               handleResult={handleResult} />
         </div>
         <div id="footer">
            <p>Designed and Coded By <a id="author" href="https://www.github.com/cdngouma" target="_blank" rel="noopener noreferrer">cdngouma</a>
            </p>
         </div>
      </div>
   );
}

export default App;