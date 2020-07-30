import React from 'react';
import Keyboard from './Keyboard';
import Display from './Display';

const Calculator = () => {
   return (
      <div>
         <h1>Standard Calculator</h1>
         <Display />
         <Keyboard />
      </div>
   );
}

export default Calculator;