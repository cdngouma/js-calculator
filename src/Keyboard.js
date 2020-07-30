import React from 'react';

const Keyboard = () => {
   return (
      <div>
         <div className='row'>
            <button id="percent">&percnt;</button>
            <button id="clear">CE</button>
            <button id="reset">C</button>
            <button id="delete">AC</button>
         </div>
         <div>
            <button id="inverse">1/x</button>
            <button id="sqr">sqr</button>
            <button id="sqrt">sqrt</button>
            <button id="divide">&divide;</button>
         </div>
         <div className="row">
            <button id="seven">7</button>
            <button id="eight">8</button>
            <button id="nine">9</button>
            <button id="multiply" >&times;</button>
         </div>
         <div className="row">
            <button id="four">4</button>
            <button id="five">5</button>
            <button id="six">6</button>
            <button id="subtract">&minus;</button>
         </div>
         <div className="row">
            <button id="one">1</button>
            <button id="two">2</button>
            <button id="three">3</button>
            <button id="add">&plus;</button>
         </div>
         <div className="row">
            <button id="sign-toggle">&plus;/&minus;</button>
            <button id="zero">0</button>
            <button id="decimal">.</button>
            <button id="equals">&equals;</button>
         </div>
      </div>
   );
}

export default Keyboard;