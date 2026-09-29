# Episode 6 : undefined vs not defined in JS

* During the memory allocation phase, JavaScript assigns a placeholder value called undefined to each variable.
undefined means that memory has been allocated for the variable, but no value has been assigned yet.

* If a variable or object is not declared (i.e., it does not exist in memory) and an attempt is made to access it, JavaScript throws a ReferenceError: not defined.

* Not defined ≠ Undefined

* If a variable is declared but not assigned a value, its value is undefined. However, if the variable itself is not declared and is referenced in the code, it gives a not defined error.

```js
console.log(x); // undefined
var x = 25;
console.log(x); // 25
console.log(a); // Uncaught ReferenceError: a is not defined
```

* JavaScript is a loosely typed (weakly typed) language, meaning variables are not bound to a specific data type. For example, we can declare var a = 5, then later assign a = true (boolean) or a = 'hello' (string).

Never manually assign undefined to a variable—let JavaScript handle it automatically.

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=B7iF6G3EyIk&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/B7iF6G3EyIk/0.jpg" width="750"
alt="undefined vs not defined in JS Youtube Link"/></a>