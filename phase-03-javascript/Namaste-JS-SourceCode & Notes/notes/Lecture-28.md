# 📌 What is Currying?

Currying is a technique where:

👉 A function that takes multiple arguments is changed into a series of functions, each taking one argument at a time.

📌 Instead of: f(a, b) We write: f(a)(b)


# Regular Multi-Argument Function

```js

function sum(a, b, c) {
  return a + b + c;
}

```
This function takes all 3 arguments at once: sum(1, 2, 3).



# Curried Version: Series of Functions

We're going to re-write this into a series of functions, each taking one parameter:

```js

function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

```
Each function takes only one parameter:

sum(a) ➡️ returns function(b)

function(b) ➡️ returns function(c)

function(c) ➡️ returns a + b + c


**Calling the Curried Function**

```js


function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// calling the Curried Function

console.log(sum(1)(2)(3)); //   Output: 6

```

This is a chain of function calls using currying, where sum returns another function at each step until the final value is calculated.



**Step-by-Step Breakdown of the Curried Function**

```js

function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const step1 = sum(1);     // a = 1 
console.log(step1);       // function(b){...} → has closure over a = 1

const step2 = step1(2);   // b = 2      
console.log(step2);       // function(c){...} → has closure over a = 1 and b = 2

const result = step2(3);  // c = 3     
console.log(result);      // 1 + 2 + 3 = 6
 

```
**Visual Closure Chain**

```js


sum(a)
  ↓     (a = 1)
  returns function(b)
            ↓     (b = 2, remembers a)
            returns function(c)
                      ↓     (c = 3, remembers a & b)
                      returns a + b + c


```




# 1. Currying using Closures

A closure gives us access to an outer function’s scope even after it has finished execution.

```js

function multiply(x) {
  return function (y) {
    return x * y;
  };
}

const multiplyBy2 = multiply(2);  // x is fixed as 2

console.log(multiplyBy2(3));      // y is 3 → Output: 6

// Or directly:
console.log(multiply(2)(3));      // Output: 6

```

**What's Happening?**

```js

const multiplyBy2 = multiply(2);

```

When multiply(2) is called, it returns a function function(y) { ... }, and multiplyBy2 becomes a reference to that function. At this point, multiply(2) has finished executing. Now, when we call multiplyBy2(3), we're passing y = 3, and it returns x * y = 2 * 3 = 6. But where does x come from? It comes from a closure — the inner function remembers the value of x from the outer multiply function even after it has completed. That’s how closures work.



# 2. Currying using bind() method

The bind() method creates a new function by presetting one or more arguments of the original function.

✅ Syntax:

```js

function multiply(x, y) {
  return x * y;
}

const multiplyBy2 = multiply.bind(this, 2);  // x is fixed as 2

console.log(multiplyBy2(4));                 // y is 4 → Output: 8

```

🔍 What's Happening?

bind(this, 2) creates a new copy of the multiply function with x permanently set to 2

You still need to provide the second argument y when calling multiplyBy2


# why Currying ?


-> Currying helps me break down functions into smaller, reusable, and configurable units. 

-> I use it for partial application, composing logic, dynamic UI handlers, reusable utilities, and cleaner testable code.


# use cases of currying 


✅ Use Case 1: Partial Application

Pre-setting some arguments and reusing the function.

```js

function multiply(x) {
  return function (y) {
    return x * y;
  };
}

var double = multiply(2);      
console.log(double(5));         // 10 
console.log(double(10));        // 20 

```

Explanation -

-> multiply(x) is a curried function that returns another function expecting y.

-> When you call multiply(2), you're pre-setting the first argument x = 2.

-> This returns a new function: function (y) { return 2 * y; }.

-> That new function is stored in the variable double.

-> Now you can reuse double with different y values like double(5) or double(10).

-> You're not writing multiply(2) every time — it's already preset once.

-> This shows how currying helps preset some arguments and reuse the logic with new inputs.


✅ Use Case 2: Composing Logic

Building complex behavior using small, curried functions.

```js

function add(base) {           
  return function (num) {  
    return base + num;
  };
}

function square(value) {       
  return value * value; 
}

function composed(input) {
  var added = add(2)(input);    // Function Currying - add(2)(3) - returns 2 + 3 = 5 
  var result = square(added);   // returns 5 * 5 = 25 
  return result;  
}

console.log(composed(3));       // 25    

```

✅  Use case 3:  Cleaner, Testable Code

```js

function isGreaterThan(x) {
  return function (y) {
    return y > x;
  };
}

var greaterThan10 = isGreaterThan(10);

console.log(greaterThan10(12)); // true

```

-> isGreaterThan(x) is a curried function returning another function.

-> When called as isGreaterThan(10), it returns function(y) { return y > 10; }.

-> This returned function is stored in greaterThan10.

-> greaterThan10(12) checks if 12 > 10 and returns true.

-> ♻️ Reusability - You can reuse the logic by calling isGreaterThan() with any value like isGreaterThan(5) or isGreaterThan(100).

-> 🧪 Testability - Easy to test — just change the input value like greaterThan10(5), greaterThan10(12), greaterThan10(20), etc.



# How it follows the Single Responsibility Principle (SRP) ? 

-> isGreaterThan(x) follows SRP because it only creates comparison logic.

-> The returned function follows SRP because it only performs the comparison using that logic.



✅  Use case 4: Reusable Utilities

Reusable utility = a function you set up once, then reuse again and again with different inputs.


```js

function logger(level) {
  return function (message) {
    console.log("[" + level + "] " + message);
  };
}

var warn = logger("WARN");

warn("Low disk space"); // logger("WARN")("Low disk space") - Function Currying 

// Output: [WARN] Low disk space


// Explanation - 

// logger("WARN") creates a custom warn logger. 

// You don’t have to write the full log message every time. 

// Just reuse it like: warn("Low battery"), warn("Disk full"), etc. 

```

Why logger is reusable?

Because one function (logger) creates many custom loggers:

logger("WARN") → makes a warn() function

logger("INFO") → makes an info() function

logger("ERROR") → makes an error() function

➡️ All of them reuse the same logger function logic — no need to rewrite the log formatting every time.



✅  Use case 5: Dynamic UI Handlers


Creating flexible event handlers (like in React or forms).

```js

function handleChange(field) {
  return function (event) {
    console.log(field + ": " + event.target.value);
  };
}

// Simulating event object

handleChange("email")({ target: { value: "likan@example.com" } });

// Output: email: likan@example.com

```



# Function Expression vs Arrow Function – Currying Style


```js

// ✅ Function Expression Currying

const multiply = function(x) {
  return function(y) {
    return x * y;
  };
};

const double1 = multiply(2);
console.log(double1(5)); // 10


// ✅ Arrow Function Currying

const multiplyArrow = x => y => x * y;

const double2 = multiplyArrow(2);
console.log(double2(5)); // 10

```