import React, { useState, useEffect } from 'react';
import './App.css';

const appName = "Standard Calculator";
const DIGIT_LIMIT = 15;

function App() {
   //const [formula, setFormula] = useState([]);
   const [currentVal, setCurrentVal] = useState([]);
   //const [result, setResult] = useState(0);
   //const [lastEntered, setLastEntered] = useState(0);

   const handleDigitInput = (event) => {
      const digit = event.target.textContent;
      const oldVal = currentVal;

      if (oldVal.length < DIGIT_LIMIT) {
         setCurrentVal([...oldVal, digit]);
      } else {
         setCurrentVal(["{Digit limit met}"]);
         setTimeout(() => setCurrentVal([...oldVal]), 1200);
      }
   }

   const removeLastDigit = (event) => {
      const newVal = [...currentVal];
      newVal.pop();
      setCurrentVal(newVal);
   }

   const clearDisplay = (event) => {
      setCurrentVal([]);
   }

   const resetCalculator = () => {
      setCurrentVal([]);
      //setFormula([]);
      //setResult(0);
      //setLastEntered(0);
   }

   return (
      <div className="App">
         <div id="calculator">
            <h1 id="app_name">{appName}</h1>
            <div id="display">
               <span id="formula-display">1 + (2 x 3)</span>
               <span id="result-display">{currentVal.join("") || 0}</span>
            </div>

            <div id="keyboard">
               {/* System buttons */}
               <button id="clear" className="app__func-btn" onClick={clearDisplay}>CE</button>
               <button id="reset" className="app__func-btn" onClick={resetCalculator}>C</button>
               <button id="delete" className="app__func-btn" onClick={removeLastDigit}>DEL</button>
               {/* Basic operators */}
               <button id="add" className="app__func-btn">+</button>
               <button id="subtract" className="app__func-btn">-</button>
               <button id="multiply" className="app__func-btn">x</button>
               <button id="divide" className="app__func-btn">/</button>
               {/* Scientific functions */}
               <button id="sqr" className="app__func-btn">sqr</button>
               <button id="sqrt" className="app__func-btn">sqrt</button>
               <button id="inv" className="app__func-btn">1/x</button>
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
               <button id="decimal">.</button>
               <button id="sign-toggler">+/-</button>
               <button id="equals">=</button>
            </div>
         </div>
      </div>
   );
}

export default App;