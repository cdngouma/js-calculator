import React from 'react';

function Display(props) {
   return (
      <div id="display">
         <span id="formula-display">{props.formula}</span>
         <span id="result-display">{props.currentVal}</span>
      </div>
   );
}

export default Display;