import React from 'react';

function Keyboard(props) {
   return (
      <div className="keyboard">
         {/* System buttons */}
         <button id="clear" className="app__func-btn" onClick={props.clear}>CE</button>
         <button id="reset" className="app__func-btn" onClick={props.reset}>C</button>
         <button id="delete" className="app__func-btn" onClick={props.delete}>DEL</button>
         {/* Basic operators */}
         <button id="add" className="app__func-btn" value="+" onClick={props.operations}>+</button>
         <button id="subtract" className="app__func-btn" value="-" onClick={props.operations}>&minus;</button>
         <button id="multiply" className="app__func-btn" value="*" onClick={props.operations}>&times;</button>
         <button id="divide" className="app__func-btn" value="/" onClick={props.operations}>&divide;</button>
         {/* Scientific functions */}
         <button id="sqr" className="app__func-btn" value="sqr" onClick={props.functions}>sqr</button>
         <button id="sqrt" className="app__func-btn" value="sqrt" onClick={props.functions}>sqrt</button>
         <button id="inv" className="app__func-btn" value="inv" onClick={props.functions}>inv</button>
         <button id="percent" className="app__func-btn" value="round" onClick={props.functions}>round</button>
         {/* digits buttons */}
         <button id="zero" value="0" onClick={props.numbers}>0</button>
         <button id="one" value="1" onClick={props.numbers}>1</button>
         <button id="two" value="2" onClick={props.numbers}>2</button>
         <button id="three" value="3" onClick={props.numbers}>3</button>
         <button id="four" value="4" onClick={props.numbers}>4</button>
         <button id="five" value="5" onClick={props.numbers}>5</button>
         <button id="six" value="6" onClick={props.numbers}>6</button>
         <button id="seven" value="7" onClick={props.numbers}>7</button>
         <button id="eight" value="8" onClick={props.numbers}>8</button>
         <button id="nine" value="9" onClick={props.numbers}>9</button>
         {/* other buttons */}
         <button id="decimal" onClick={props.numbers} value=".">.</button>
         <button id="sign-toggle" onClick={props.toggleSign}>+/-</button>
         <button id="equals" onClick={props.handleResult}>=</button>
      </div>
   );
}

export default Keyboard;