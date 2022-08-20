# Pompy Verbose Calculator
Calculator assignment from The Odin Project curriculum.

## NOTES
Operands are stored as floats and a decimal separator:  
[-12345.678, 3] means -12345.678  

This is so that, when the calculator displays nice numbers,  
it would use toFixed() with the decimal place entered by the user.  
You could also use toFixed() for easy string operations.

"add" and "subtract" operations remember the decimal point,  
"divide" probably sets it to -1 so that toFixed() is no longer applied

about "multiply": what happens if I do 0.25 * 4? avoid having 1.00 here

## Roadmap
_NOTE: this part (the roadmap) was lost to a "git reset --hard" disaster, so the new version was hastily written and is less articulate/precise. Consider most of it "to be rephrased"._

This roadmap broadly follows a "Now/Next/Later" format, with an additional 3-letter prefix to summarize the nature of the alteration:
- FIX: correcting parts of the program that are behaving incorrectly;
- REF _(refactor)_: refactoring code internally, without substantial changes to its architecture;
- ADD: new functionality to the program;
- MOD _(modify)_: change functionality;
- DEL _(delete)_: remove existing functionality;
- REW _(rewrite)_: implement a structural change.

### Now
- FIX: verbose onClick functionality. Retain history after rolling back and entering new operation with the same operand.
- ADD: backspace. Opposite of appendNumber, and also gradually removes (first decimals, then decimal point, then negative...).
- ADD: escape. For now, reset all.
- ADD: reintroduce willReset. after submitting operation, new number 

### Next
- MOD: reset functionality. implement steps instead of resetting all in one go.
- MOD: willReset.
- FIX: division bugs, where (probably because of willy-nilly truncation) memory.history\[pointer\].evaluate() does NOT equal the operand printed on the calculator.

### Later
- FIX: numbers not appearing when entering decimals, until a non-zero digit is entered.
- ADD: uses for the rest of the UI. e.g. the about and help buttons, the logo, the "made by pompy productions" should all do something when clicked.
- REW: introduce OOP elements, e.g. for operations, for operands, for operators.

## Changelog

### v0.2.0: Extended functionality

#### Overview
Working more with one-off objects:
- numDisplay and calculator,
- verboseDisplay and memory,
- operations.

Accepts decimals, but truncation is quirky.  
Negative operands can be manually entered.  
Also values like -0.035, but the number does not appear until a non-zero digit is pressed.  
Pressing an operator when both operands are in now submits the operation.  
Reset functionality removed for now.  
Clicking on verbose elements now prints the whole operation instead of the result, but does not retain history afterwards.  
Still doesn't display the subtotal on verboseDisplay.

#### numDisplay and calculator
Calculator handles the functionality: receiving operands and operators, submitting operations etc.  
Tightly connected with numDisplay (updates it often), loosely connected with verboseDisplay (updates on submit).

#### verboseDisplay and memory
Memory handles the operation history, which is then printed on verboseDisplay.  
Clicking on verboseDisplay elements revert to a previous calculation.

### v0.1.0: Initial prototype

#### Overview
Semi-functional prototype with verbose functionality.

#### Calculator functionality:
- Does not accept decimals.
- Does not accept manual negative input.
- Pressing an operator while entering the second operand changes the operator _(should submit the operation instead)_.

#### Calculator buttons:
- Basic operators. Does not accept "-" in the beginning to define a negative number.
- Digits 0-9, and "."; no functionality written for decimals yet.
- Enter for submitting and C for reset, but reset is buggy.

#### Basic verbose display:
- First operation is written fully _(e.g. 1394 plus 383)_.
- Further operations are abbreviated _(e.g. ... minus 383)_.
- Doesn't display the subtotal at every operation _(should)_.
- Clicking on verbose elements reverts to the subtotal _(should revert to the operation itself)_.

#### Basic number display:
- Tripartite number display _(top, middle, bottom)_.
- Negative numbers work, but the decimals are not truncated.
- Hides if the value is 0.