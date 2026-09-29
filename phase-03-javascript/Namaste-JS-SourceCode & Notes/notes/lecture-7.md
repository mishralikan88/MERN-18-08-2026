# Episode 7 : The Scope Chain, Scope & Lexical Environment

* **Scope** determines where a variable is accessible in your code.

* Let's observe the below examples-

```js
// CASE 1 
function a() { 
    console.log(b); // 10
    // Instead of printing undefined, it prints 10. This means the function 'a' 
    // can access the variable 'b' outside its own scope.
}
var b = 10;
a();

// In this case, JavaScript first tries to find 'b' inside the local function scope of 'a'. 
// Since it is not found there, JavaScript looks in its parent scope (the global scope) 
// and finds 'b' with the value 10.
```

```js
// CASE 2
function a() {
    c();
    function c() {
        console.log(b); // 10
    }
}
var b = 10;
a();

// In this case, JavaScript first tries to find 'b' inside the local scope of function 'c', 
// but it is not found there. Then, it looks in 'c's parent scope, which is function 'a', 
// but 'b' is not found there either. Finally, JavaScript looks in the global scope, 
// finds 'b' with the value 10, and prints it.
```

```js
// CASE 3
function a() {
    c();
    function c() {
        var b = 100;
        console.log(b); // 100
    }
}
var b = 10;
a();

// In this case, JavaScript first looks for 'b' inside the local scope of function 'c' 
// and finds it there. Since 'b' is declared with 'var' inside 'c', it is limited to 
// 'c's scope and does not affect the global variable 'b'. Therefore, 100 is printed.
```

```js
// CASE 4
function a() {
    var b = 10; // 'b' is declared inside function 'a' and is only accessible within 'a'.
    c();
    function c() {
        console.log(b); // 10 (JavaScript looks for 'b' inside 'c', doesn't find it, so it checks inside function 'a' and finds it there.)
    }
}
a();
console.log(b); // Error: b is not defined (because 'b' is scoped to function 'a' and not available globally).

```

```
To summarize the 4th case in terms of execution context, place a breakpoint inside function c(). At this point:

Call Stack: [GEC, a(), c()]
Memory allocation in each execution context:
c() → [[Lexical environment pointer → a()]]
a() → { b: 10, c: function c(), [Lexical environment pointer → GEC] }
GEC → { a: function a(), [Lexical environment pointer → null] }

```
![Lexical Scope Explaination](../assets/lexical.jpg "Lexical Scope")
   

* **Scope**:

The environment where a variable is accessible.

* **Lexical Environment**:

A Lexical Environment contains the local variables of a function and a reference to its parent scope.(surrounding scope).
Lexical Environment is the memory structure that stores local variables plus a reference to the parent environment.

* **Lexical Scope**: 

Lexical scope means a function can access variables from its parent scope.
Lexical Scope is the rule that lets a function access variables from its parent scope.

* Every Execution Context has its own Lexical Environment, which stores the variables and keeps a reference to its parent environment

 ![Lexical Scope Explaination](../assets/lexical.jpg "Lexical Scope")

The **orange mark** represents a reference pointing to the Lexical Environment of its parent.

The Lexical Environment is responsible for -

✔ storing variables.
✔ storing function declarations.
✔ linking to parent environment.
✔ enabling closures.


**Scope Chain**

* JavaScript first looks for a variable in the current function/block.
* If not found, it checks the parent’s Lexical Environment.
* It continues moving outward until it reaches the global scope.
* This step-by-step lookup is called the scope chain.

 ![Lexical Scope Explaination](../assets/lexical2.jpg "Lexical Scope")

In the diagram, the sequence 'local -> closure -> global' forms the Scope Chain. Here, JavaScript is searching for the variable b and finds it in the closure (function a's scope).

```js
function a() {
    function c() {
        // Function c is declared inside function a and has access to its scope.
    }
    c(); // Function c is called inside function a. It has lexical access to a's scope.
} 
// Function a is declared in the global execution context and has access to global variables.

```

* JS decides scope based on where functions are defined in the code.

```js

    Global {
        Outer {
            Inner
        }
    }

  //  Global → Outer → Inner  
  // "Inner is enclosed within the lexical scope of Outer."

```


* **Note** - 

An inner function can access variables from its outer functions, even if it is deeply nested. However, an outer function cannot access variables declared inside an inner function.


<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=uH-tVP8MUs8&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/uH-tVP8MUs8/0.jpg" width="750"
alt="The Scope Chain, Scope & Lexical Environment Youtube Link"/></a>