# Episode 13: First Class Functions ft. Anonymous Functions

Functions are the heart ♥ of JavaScript.

# Q1: What is a Function Statement?

A function statement is the standard way of creating a function in JavaScript.

```js

    function a() {
       console.log("Hello");
    }
    a(); // Output: Hello

```

# Q2: What is a Function Expression?

Assigning a function to a variable is known as a Function Expression. Here, the function acts as a value.

```js

var b = function() {
  console.log("Hello");
}
b(); // Output: Hello
console.log(b); // Logs the entire function definition

```

# Q3: Difference between Function Statement and Function Expression

The key difference between the two lies in **Hoisting.**

```js

   a(); // Output: "Hello A"
   b(); // Throws TypeError: b is not a function

   function a() {
     console.log("Hello A");
    }

    var b = function() {
      console.log("Hello B");
    }


Function Statement (Declaration) Hoisting:

-> During the memory creation phase, the entire function definition of a() is hoisted to the top.
-> This means that the function a() is fully available even before its declaration in the code.


Function Expression Hoisting:

-> The variable b is hoisted, but its value is set to undefined.
-> The function itself is not hoisted, so when you try to call b() before the assignment, it throws a TypeError because b is still undefined at that point.

```

# Q4: What is a Function Declaration?

A function declaration is just another name for a function statement.

# Q5: What is an Anonymous Function?

An anonymous function is a function without a name.

function () {}

-> Anonymous functions don’t have their own identity.
-> They are mostly used as function expressions or callback functions where a name is not required.

**Function Expressions:**

In a function expression, an anonymous function is assigned to a variable. The variable itself becomes the function’s name, so the function doesn’t need an explicit name.

  // Anonymous function used as a function expression
  ```js

    const greet = function() {
        console.log("Hello!");
    };

    greet(); // Output: Hello!

  ```

Why use anonymous functions here?
Since the function is assigned to a variable (greet), providing it with an explicit name would be unnecessary. The function can be called using the variable name.

**Callback Functions:**

A callback function is a function that is passed as an argument to another function and is executed at a later time. In many cases, these functions don’t need a name because they are only used once, as part of an operation.

```js

setTimeout(function() {
    console.log("Callback executed!");
}, 1000);

```

Here, the anonymous function is used as a callback to the setTimeout function. Since the function is not reused elsewhere, there’s no need to name it.

Another example with an array method:

```js

const numbers = [1, 2, 3, 4];
const doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled); // Output: [2, 4, 6, 8]

```

The function inside map() is used as a callback and doesn’t need to be named since it is only executed within the map() operation.

# Q6: What is a Named Function Expression?

A Named Function Expression is similar to a function expression but includes a name.

```js

    var b = function xyz() {
      console.log("b called");
    }
    b();   // Output: "b called"
    xyz(); // Throws ReferenceError: xyz is not defined. In terms of execution context there is no xyz.

```
Named Function Expressions have a name that is only accessible within their own scope.

```js

var greet = function sayHello() {
  console.log("Inside function:", sayHello); // ✔ works
};

greet();    // ✔ works (function is assigned to greet)
sayHello(); // ❌ ReferenceError: sayHello is not defined


```

# Q7: Parameters vs Arguments?

**Parameters** are variables listed as part of the function definition.
**Arguments** are the actual values passed to the function during a call.

```js

var b = function(param1, param2) { // param1 and param2 are parameters
  console.log("b called");
}
b(arg1, arg2); // arg1 and arg2 are arguments

```

# Q8: What are First-Class Functions (aka First-Class Citizens)?

In JavaScript, functions are treated as first-class citizens, meaning:

Functions can be passed as arguments to other functions.
Functions can be returned from other functions.
Functions can be assigned to variables or stored in data structures.
These capabilities together are known as First-Class Functions.

```js

  // Passing a function as an argument
  var b = function(param1) {
    console.log(param1); // Logs: "f() {}"
  }
  b(function() {}); // Passing an anonymous function as an argument


  // Returning a function from another function
  var b = function() {
    return function() {
      console.log("Returned function");
    }
  }
  console.log(b()); // Logs the entire returned function

```

**Important Points**

-> Functions in JavaScript are treated as first-class citizens.
-> Function Statements and Function Expressions differ in terms of hoisting.
-> Anonymous Functions lack a name and are often used as callbacks.
-> Named Function Expressions have a name that is only accessible within their own scope.
-> Parameters are placeholders, while arguments are actual values passed.

# Q9: What is an IIFE ? 

-> An IIFE (Immediately Invoked Function Expression) is a function in JavaScript that runs as soon as it is defined.
-> It's like saying, "Hey function, run immediately and don't leave any trace behind!"
-> The main idea is to 'create a function & execute it right away' without needing to call it separately.


**Why Do We Use IIFEs?**

Avoid Polluting the Global Scope:

In JavaScript, variables declared outside of functions are added to the global scope. This can cause conflicts and bugs if different parts of your code accidentally use the same variable names.

An IIFE helps keep variables private by enclosing them inside a function, so they don't mess up the global scope.

Execute Code Immediately:

Sometimes you need to run some setup code right away (like configuration or initialization tasks).
An IIFE runs the moment it's defined, making it perfect for such use cases.


**📝 Syntax of an IIFE:**

Here’s the basic structure of an IIFE:

(function() {
    var message = "Hello from IIFE!";
    console.log(message);
})();  // Output: Hello from IIFE!


**Breaking Down the Syntax:**

1. Function Expression:

(function() {
    var message = "Hello from IIFE!";
    console.log(message);
})

The entire function is wrapped in parentheses () to treat it as an expression, not a declaration.

2. Immediately Invoked:

();

The extra () at the end tells JavaScript to immediately execute the function.

**Trying to Access Variables Outside the IIFE:**

// Trying to access "message" outside the IIFE
console.log(message);  // Error: message is not defined

-> Since the message variable is defined inside the IIFE, it cannot be accessed from the outside.
-> This ensures that the variable is kept private and doesn’t interfere with other parts of your code.


**🗝️ One-Liner Definition:**

An IIFE is a function that runs immediately after being defined, keeping its variables private and avoiding global scope pollution.


**🎯 Real-World Use Case:**

Imagine you're building a web page with multiple scripts. To prevent one script from interfering with another, you can use IIFEs to isolate each script's variables.


Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=SHINoHxvTso&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/SHINoHxvTso/0.jpg" width="750"
alt="First Class Functions ft. Anonymous Functions in JS Youtube Link"/></a>