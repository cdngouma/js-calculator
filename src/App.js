import React from 'react';
import './App.css';

const appName = "Standard Calculator";

function App() {
   return (
      <div className="App">
         <h1 id="app_name">{appName}</h1>
         <div id="display">
            <div><span id="formula-display">1 + (2 x 3)</span></div>
            <div><span id="result-display">0</span></div>
         </div>
         <div id="keyboard">
            {/* System buttons */}
            <button id="clear" className="app__func-btn">CE</button>
            <button id="reset" className="app__func-btn">C</button>
            <button id="delete" className="app__func-btn">AC</button>
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
            <button id="zero">0</button>
            <button id="one">1</button>
            <button id="two">2</button>
            <button id="three">3</button>
            <button id="four">4</button>
            <button id="five">5</button>
            <button id="six">6</button>
            <button id="seven">7</button>
            <button id="eight">8</button>
            <button id="nine">9</button>
            {/* other buttons */}
            <button id="decimal">.</button>
            <button id="sign-toggler">+/-</button>
            <button id="equals">=</button>
         </div>
      </div>
   );
}

export default App;