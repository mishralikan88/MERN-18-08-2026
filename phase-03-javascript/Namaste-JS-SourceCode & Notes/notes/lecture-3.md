# Episode 3 : Hoisting in JavaScript (variables & functions)

* Let's observe the below code and it's explaination:
```js
getName(); // Namaste Javascript
console.log(x); // undefined
console.log(getName); // f{...}

var x = 7;
function getName() {
 console.log("Namaste Javascript");
}
```

* In many other programming languages, this would result in an outright error because accessing something that is not yet defined is not allowed. However, in JavaScript, during the memory creation phase, variables declared with var are assigned undefined, and function declarations are stored in memory. During the code execution phase, JavaScript executes the code line by line. Since x was hoisted and initialized as undefined, it prints undefined instead of throwing an error. 

* However, if var x = 7; is removed, it results in 'Uncaught ReferenceError: x is not defined.'

```js
getName(); // Namaste JavaScript
console.log(x); // Uncaught Reference: x is not defined.
console.log(getName); // f getName(){ console.log("Namaste JavaScript); }
function getName(){
    console.log("Namaste JavaScript");
}
```

* Hoisting is a concept in JavaScript that allows variables and functions to be accessed before they are initialized or assigned a value without causing an error. This happens due to the memory creation phase of the Execution Context.


In the previous lecture, we learned that the execution context is created in two phases. Even before the code executes, memory is allocated. For variables, this means they are initialized as undefined, while for functions, the entire function code is stored in memory.Now let's observe a different example and try to understand the output.

```js

console.log(x); 
// ❌ Error: Uncaught ReferenceError: x is not defined
// Explanation: `x` is not declared anywhere in the code, so JavaScript throws a ReferenceError.

getName(); 
// ❌ Error: Uncaught TypeError: getName is not a function
// Explanation: 
// - `var getName;` is hoisted and initialized as `undefined` in the memory creation phase.
// - Function expressions are NOT hoisted like function declarations.
// - When we call `getName()`, we are actually calling `undefined()`, which results in a TypeError.

console.log(getName); 
// ✅ Output: undefined
// Explanation: 
// - `var getName;` is hoisted and set to `undefined` during memory creation.
// - The actual function is assigned later during code execution.

var getName = function () {
    console.log("Namaste JavaScript");
};
// ✅ This is a function expression.
// Note: Function expressions and arrow functions are hoisted differently. 
// Only the variable (`getName`) is hoisted, not the function itself.


```


// Execute the code below in the console with debugging enabled and check the Call Stack.

<!-- var x = 10;

function getName() {
  console.log("Namaste Javascript");
}

getName();
console.log(x);
console.log(getName); -->


<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=Fnlnw8uY6jo&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/Fnlnw8uY6jo/0.jpg" width="750"
alt="Hoisting Youtube Link"/></a>