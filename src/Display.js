import React from 'react';

function Display(props) {
   function adjustFontSize() {
      let display = document.getElementById("display");

      if (!display) return;

      const NUM_DIGITS = props.currentVal.length;

      if (NUM_DIGITS <= 12) {
         return "3.2em";
      } else if (NUM_DIGITS < 15) {
         return `${3.2 - ((NUM_DIGITS-12)*.23)}em`;
      } else if (NUM_DIGITS < 18) {
         return `${2.72 - ((NUM_DIGITS-14)*.15)}em`;
      } else if (NUM_DIGITS <= 20) {
         return `${2.27 - ((NUM_DIGITS-17)*.12)}em`;
      } else if (NUM_DIGITS < 23) {
         return "1.77em";
      } else {
         return "1.63em";
      }
   }

   const fontSize = adjustFontSize();

   return (
      <div className="display__screen">
         <span id="formula">{props.formula}</span>
         <span id="display" style={{fontSize: fontSize}}>{props.currentVal}</span>
      </div>
   );
}

export default Display;