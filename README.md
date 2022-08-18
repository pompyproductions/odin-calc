# Pompy Calculator
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

