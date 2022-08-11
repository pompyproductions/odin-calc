# Pompy Calculator
Calculator assignment from The Odin Project curriculum.

## NOTES
Operands are stored as integers and a decimal separator:  
[12345678, 3] means 12345.678

Math.floor(number / Math.pow(10, decimalPlaces)) gives you the whole part  
number % Math.pow(10, decimalPlaces) gives you the decimal part  
watch out, if the number is negative, you gotta use Math.ceil instead of floor  

When you make an operation, matchDecimals(a,b):
```
a[1] > b[1]: b[0] *= Math.pow(10, a[1] - b[1])
else: a[0] *= Math.pow(10, b[1] - a[1])
```

