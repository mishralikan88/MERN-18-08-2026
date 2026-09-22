# 6.7 Functions 🔥🔥🔥

Functions are one of the most important parts of JavaScript.

A function is:

> A reusable block of code that performs a task.

Instead of repeating the same logic again and again, we put that logic inside a function and call it whenever we need it.

Functions are used everywhere:

```text
form handling
API calls
validation
calculations
array methods
event handlers
callbacks
React components
business logic
machine coding
```

---

# 1. Basic Function

```js
function greet() {
  console.log("Hello");
}

greet();
```

Output:

```text
Hello
```

Here:

```text
function greet()
→ defines the function

greet()
→ calls / executes the function
```

---

# 2. Function Declaration 🔥🔥🔥

Syntax:

```js
function functionName() {
  // code
}
```

Example:

```js
function showEmployee() {
  console.log("Rahul");
}

showEmployee();
```

Output:

```text
Rahul
```

Defining a function does not execute it.

```text
Function Definition
↓
JavaScript stores the function

Function Call
↓
JavaScript executes the function body
```

---

# 3. Parameters 🔥🔥

Parameters are variables written in the function definition.

```js
function greet(name) {
  console.log("Hello", name);
}
```

Here:

```text
name
→ parameter
```

---

# 4. Arguments

Arguments are the actual values passed when calling the function.

```js
greet("Rahul");
```

Here:

```text
"Rahul"
→ argument
```

Easy memory:

```text
Parameter
→ placeholder in function definition

Argument
→ actual value during function call
```

---

# 5. Multiple Parameters

```js
function add(a, b) {
  console.log(a + b);
}

add(10, 20);
```

Output:

```text
30
```

Here:

```text
a → 10
b → 20
```

---

# 6. `return` 🔥🔥🔥

`return` sends a value back from the function.

```js
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

Flow:

```text
add(10, 20)
↓
10 + 20
↓
return 30
↓
result = 30
```

---

# 7. `console.log()` vs `return` 🔥🔥🔥

These are not the same.

```js
function add(a, b) {
  console.log(a + b);
}

const result = add(10, 20);

console.log(result);
```

Output:

```text
30
undefined
```

Why?

The function printed `30`, but it returned nothing.

So:

```text
result
→ undefined
```

Practical rule:

```text
console.log()
→ display / debug a value

return
→ send a value back to the caller
```

---

# 8. Function Without `return`

```js
function test() {
  const value = 10;
}

console.log(test());
```

Output:

```text
undefined
```

When a JavaScript function finishes without returning a value, it returns:

```text
undefined
```

---

# 9. `return` Stops Function Execution

```js
function test() {
  console.log("A");

  return;

  console.log("B");
}

test();
```

Output:

```text
A
```

Why?

```text
return
→ exits the function immediately
```

This is why `return` is useful in guard clauses.

---

# 10. Default Parameters 🔥🔥

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}

console.log(greet());
```

Output:

```text
Hello Guest
```

If we provide a value:

```js
console.log(greet("Rahul"));
```

Output:

```text
Hello Rahul
```

---

# 11. Default Parameter Important Behavior

```js
function greet(name = "Guest") {
  console.log(name);
}

greet(undefined);
greet(null);
```

Output:

```text
Guest
null
```

Default parameters apply when the argument is:

```text
undefined
```

not when it is:

```text
null
```

---

# 12. Function Expression 🔥🔥🔥

A function can be stored in a variable.

```js
const add = function (a, b) {
  return a + b;
};

console.log(add(10, 20));
```

Output:

```text
30
```

This is called:

```text
Function Expression
```

---

# 13. Function Declaration vs Function Expression

Function Declaration:

```js
function add(a, b) {
  return a + b;
}
```

Function Expression:

```js
const add = function (a, b) {
  return a + b;
};
```

Their important interview difference is:

```text
Hoisting
```

We will cover that deeply in JavaScript Internals.

---

# 14. Anonymous Function

A function without its own explicit name is called an anonymous function.

```js
const greet = function () {
  console.log("Hello");
};
```

This part:

```js
function () {
}
```

is anonymous.

---

# 15. Arrow Function 🔥🔥🔥

Normal function:

```js
function add(a, b) {
  return a + b;
}
```

Arrow function:

```js
const add = (a, b) => {
  return a + b;
};
```

Output:

```js
console.log(add(10, 20));
```

```text
30
```

---

# 16. Arrow Function Implicit Return

This:

```js
const add = (a, b) => {
  return a + b;
};
```

can become:

```js
const add = (a, b) => a + b;
```

When an arrow function contains one expression, it can return it automatically.

This is called:

```text
Implicit Return
```

---

# 17. Arrow Function With One / Zero Parameters

One parameter:

```js
const square = number => number * number;

console.log(square(5));
```

Output:

```text
25
```

No parameters:

```js
const greet = () => {
  console.log("Hello");
};
```

---

# 18. Returning an Object From Arrow Function 🔥🔥🔥

Important syntax trap.

Correct:

```js
const createEmployee = () => ({
  name: "Rahul",
  salary: 50000,
});
```

Why parentheses?

```text
()
→ tells JavaScript the braces represent an object expression
```

Without the parentheses, the braces are interpreted as the function body.

---

# 19. Arrow Functions and `this` 🔥🔥🔥

Arrow functions do not create their own `this`.

Easy memory for now:

```text
Regular Function
→ this depends on how the function is called

Arrow Function
→ no own this
→ uses surrounding lexical this
```

This is extremely important, but we will cover it deeply under:

```text
JavaScript Internals
→ this
```

---

# 20. Rest Parameters 🔥🔥🔥

Rest parameters allow a function to accept multiple arguments.

```js
function sum(...numbers) {
  console.log(numbers);
}

sum(10, 20, 30);
```

Output:

```text
[10, 20, 30]
```

So:

```text
...numbers
→ collects remaining arguments into an array
```

---

# 21. Practical Rest Parameter

```js
function sum(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sum(10, 20, 30));
```

Output:

```text
60
```

---

# 22. Rest Parameter Must Be Last

Valid:

```js
function test(a, ...rest) {
}
```

Invalid:

```js
function test(...rest, a) {
}
```

❌ Error.

Why?

Rest means:

```text
collect all remaining arguments
```

so it must be the last parameter.

---

# 23. Callback Function 🔥🔥🔥

A callback is:

> A function passed to another function so that the receiving function can execute it when needed.

Example:

```js
function greet(name) {
  console.log("Hello", name);
}

function processUser(callback) {
  callback("Rahul");
}

processUser(greet);
```

Output:

```text
Hello Rahul
```

---

# 24. Function Reference vs Function Call 🔥🔥🔥

This is extremely important.

```js
processUser(greet);
```

Here:

```text
greet
→ function reference
→ function itself is passed
```

But:

```js
processUser(greet());
```

means:

```text
greet()
→ execute greet immediately
→ pass its return value
```

Easy memory:

```text
greet
→ function itself

greet()
→ execute function
```

---

# 25. Callback With Arrow Function

```js
function processUser(callback) {
  callback("Rahul");
}

processUser((name) => {
  console.log("Hello", name);
});
```

Output:

```text
Hello Rahul
```

This callback pattern appears everywhere:

```text
map()
filter()
reduce()
forEach()
event listeners
timers
Promises
API handling
```

---

# 26. Higher-Order Function 🔥🔥🔥

A higher-order function is a function that:

```text
takes another function as an argument
OR
returns another function
```

Example:

```js
function execute(callback) {
  callback();
}
```

`execute` is a higher-order function because it accepts another function.

Common built-in higher-order functions:

```text
map()
filter()
reduce()
forEach()
find()
some()
every()
```

---

# 27. Function Returning Another Function

```js
function createGreeting(message) {
  return function (name) {
    return `${message} ${name}`;
  };
}

const sayHello =
  createGreeting("Hello");

console.log(sayHello("Rahul"));
```

Output:

```text
Hello Rahul
```

This connects later to:

```text
Closures
Currying
Function Factories
```

---

# 28. First-Class Functions 🔥🔥🔥

JavaScript treats functions like values.

Functions can be:

```text
stored in variables
passed as arguments
returned from functions
stored in objects
stored in arrays
```

This is called:

```text
First-Class Functions
```

Example:

```js
const greet = function () {
  return "Hello";
};
```

Here the function is stored just like another value.

---

# 29. Function Inside Object

```js
const employee = {
  name: "Rahul",

  greet: function () {
    console.log("Hello");
  },
};

employee.greet();
```

A function stored as an object property is commonly called a:

```text
method
```

Modern shorthand:

```js
const employee = {
  greet() {
    console.log("Hello");
  },
};
```

---

# 30. Function Scope 🔥🔥🔥

Variables declared inside a function are available inside that function.

```js
function test() {
  const salary = 50000;

  console.log(salary);
}

test();
```

But this outside the function:

```js
console.log(salary);
```

causes:

```text
ReferenceError
```

because `salary` is local to the function.

---

# 31. Function Can Access Outer Variables

```js
const company = "OpenAI";

function showCompany() {
  console.log(company);
}

showCompany();
```

Output:

```text
OpenAI
```

A function can access variables from its outer scope.

This connects to:

```text
Lexical Scope
Scope Chain
Closures
```

---

# 32. Pure Function 🔥🔥

A pure function:

```text
returns the same output for the same input
and
does not modify outside state
```

Example:

```js
function add(a, b) {
  return a + b;
}
```

Same input:

```text
10, 20
```

always returns:

```text
30
```

---

# 33. Impure Function

```js
let total = 0;

function addToTotal(value) {
  total += value;
}
```

This modifies:

```text
outside state
```

So it is impure.

Another example:

```js
function increaseSalary(employee) {
  employee.salary += 5000;

  return employee;
}
```

This mutates the original object.

---

# 34. Pure Version

```js
function increaseSalary(employee) {
  return {
    ...employee,
    salary: employee.salary + 5000,
  };
}
```

This returns a new object instead of changing the original object.

Very important in:

```text
React
Redux
state management
predictable business logic
testing
```

---

# 35. IIFE — Immediately Invoked Function Expression

IIFE means:

```text
Immediately Invoked Function Expression
```

Example:

```js
(function () {
  console.log("Runs immediately");
})();
```

Output:

```text
Runs immediately
```

Arrow version:

```js
(() => {
  console.log("Runs immediately");
})();
```

Historically, IIFEs were often used to create private scope.

Today:

```text
IIFE
→ interview awareness
→ lower daily-use priority
```

---

# 36. Recursion 🔥🔥

Recursion means:

> A function calls itself.

Example:

```js
function countdown(number) {
  if (number === 0) {
    return;
  }

  console.log(number);

  countdown(number - 1);
}

countdown(3);
```

Output:

```text
3
2
1
```

---

# 37. Base Case 🔥🔥🔥

A recursive function needs a stopping condition.

This is called:

```text
Base Case
```

Here:

```js
if (number === 0) {
  return;
}
```

Without a stopping condition:

```text
function keeps calling itself
↓
call stack keeps growing
↓
stack overflow
```

---

# 38. Practical Recursion — Factorial

```js
function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

console.log(factorial(5));
```

Output:

```text
120
```

Recursion is particularly useful for:

```text
tree structures
nested comments
folder structures
menus
deep nested data
```

---

# 39. Practical Function — Validation 🔥🔥🔥

```js
function validateEmployee(employee) {
  if (!employee) {
    return "Employee is required";
  }

  if (!employee.name?.trim()) {
    return "Name is required";
  }

  if (!employee.email?.trim()) {
    return "Email is required";
  }

  if (employee.salary <= 0) {
    return "Invalid salary";
  }

  return null;
}
```

Usage:

```js
const error = validateEmployee({
  name: "Rahul",
  email: "",
  salary: 50000,
});

console.log(error);
```

Output:

```text
Email is required
```

---

# 40. Practical Function — Transform API Data

```js
function normalizeEmployee(employee) {
  return {
    ...employee,
    id: Number(employee.id),
    salary: Number(employee.salary),
  };
}
```

Usage:

```js
const employee = normalizeEmployee({
  id: "101",
  name: "Rahul",
  salary: "50000",
});
```

Now:

```text
id
→ number

salary
→ number
```

This is a strong machine-coding pattern.

---

# 41. Practical Function — Reusable Search

```js
function matchesSearch(employee, searchTerm) {
  return employee.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
}
```

Usage:

```js
const employee = {
  name: "Rahul Sharma",
};

console.log(
  matchesSearch(employee, "rahul")
);
```

Output:

```text
true
```

Functions let us reuse business logic instead of duplicating it.

---

# 42. Good Function Naming

Good:

```text
calculateTotal()
validateEmployee()
fetchEmployees()
filterEmployees()
formatDate()
getEmployeeById()
```

Avoid vague names when possible:

```text
doThing()
abc()
processStuff()
```

The function name should explain its job.

---

# 43. Keep Functions Focused 🔥🔥

Avoid one huge function doing:

```text
validation
API transformation
filtering
sorting
calculation
formatting
```

Split logic when it improves readability:

```js
validateEmployee();
normalizeEmployee();
filterEmployees();
calculateTotalSalary();
```

This improves:

```text
readability
testing
debugging
reuse
interview explanation
```

---

# 44. Too Many Parameters — Practical Awareness

This can become hard to use:

```js
function createEmployee(
  name,
  email,
  salary,
  department,
  position,
  active
) {
}
```

Often clearer:

```js
function createEmployee(employee) {
}
```

Call:

```js
createEmployee({
  name: "Rahul",
  email: "rahul@gmail.com",
  salary: 50000,
  department: "UI",
  position: "Developer",
  active: true,
});
```

Now every value has a clear name.

---

# 45. Interview Output 1 🔥

```js
function test() {
  console.log("Hello");
}

const result = test();

console.log(result);
```

Output:

```text
Hello
undefined
```

Reason:

```text
console.log()
≠
return
```

---

# 46. Interview Output 2

```js
function test() {
  return 10;

  console.log("Hello");
}

console.log(test());
```

Output:

```text
10
```

Anything after `return` in that execution path does not run.

---

# 47. Interview Output 3 — Default Parameter 🔥🔥

```js
function greet(name = "Guest") {
  console.log(name);
}

greet();
greet(undefined);
greet(null);
```

Output:

```text
Guest
Guest
null
```

---

# 48. Interview Output 4

```js
function add(a, b) {
  return a + b;
}

console.log(add(10));
```

Output:

```text
NaN
```

Why?

```text
a = 10
b = undefined
```

Then:

```text
10 + undefined
→ NaN
```

---

# 49. Interview Output 5 — Extra Arguments

```js
function test(a, b) {
  console.log(a, b);
}

test(1, 2, 3, 4);
```

Output:

```text
1 2
```

Extra arguments are allowed.

Only `a` and `b` are used here.

---

# 50. Interview Output 6 — Rest Parameter

```js
function test(a, ...rest) {
  console.log(a);
  console.log(rest);
}

test(1, 2, 3, 4);
```

Output:

```text
1
[2, 3, 4]
```

---

# 51. Interview Question — Parameter vs Argument

Good answer:

```text
Parameter
→ variable in function definition

Argument
→ actual value passed during function call
```

---

# 52. Interview Question — Function Declaration vs Expression

Function declaration:

```js
function add() {
}
```

Function expression:

```js
const add = function () {
};
```

Important interview difference:

```text
hoisting behavior
```

We will cover that under JavaScript Internals.

---

# 53. Interview Question — Arrow vs Regular Function 🔥🔥🔥

Good short answer:

```text
Arrow Function
→ shorter syntax
→ no own this
→ no own arguments object
→ cannot be called with new as a constructor

Regular Function
→ this depends on call-site
→ has arguments object
→ can be used as constructor when appropriate
```

The most important interview difference is:

```text
this
```

---

# 54. Interview Question — What Is a Callback?

Good answer:

> A callback is a function passed to another function so that the receiving function can execute it when needed.

Example:

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
```

The arrow function is the callback.

---

# 55. Interview Question — Higher-Order Function

Good answer:

> A higher-order function accepts another function, returns another function, or both.

Examples:

```text
map()
filter()
reduce()
```

---

# 56. Interview Question — First-Class Functions

Good answer:

> JavaScript treats functions as values, so they can be stored in variables, passed as arguments, and returned from functions.

---

# 57. Debugging Problem — Missing `return` 🔥🔥🔥

Bad:

```js
function calculateTotal(price, quantity) {
  price * quantity;
}

const total =
  calculateTotal(1000, 3);

console.log(total);
```

Output:

```text
undefined
```

Fix:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

Output:

```text
3000
```

---

# 58. Debugging Problem — Passing vs Calling Function 🔥🔥🔥

Suppose:

```js
function greet() {
  console.log("Hello");
}

function execute(callback) {
  callback();
}
```

Correct:

```js
execute(greet);
```

Wrong:

```js
execute(greet());
```

Why?

```text
greet
→ pass function reference

greet()
→ execute immediately
→ pass returned value
```

If `greet()` returns `undefined`, then `execute()` later tries to call `undefined`.

---

# 59. Debugging Problem — Arrow Object Return

Wrong:

```js
const createUser = () => {
  name: "Rahul"
};
```

Correct:

```js
const createUser = () => ({
  name: "Rahul",
});
```

Remember:

```text
Implicit object return
→ wrap object with ()
```

---

# 60. Machine-Coding Rule 🔥🔥🔥

When writing a function, ask:

```text
What does this function do?
What are its inputs?
What should it return?
Does it mutate anything?
Can invalid cases return early?
Is the name clear?
Is it doing too many things?
```

Strong machine-coding functions are usually:

```text
small
focused
predictable
reusable
easy to test
easy to explain
```

---

# Quick Memory 🧠

Function Declaration:

```js
function add(a, b) {
  return a + b;
}
```

Function Expression:

```js
const add = function (a, b) {
  return a + b;
};
```

Arrow Function:

```js
const add = (a, b) => a + b;
```

Parameter vs Argument:

```text
parameter
→ placeholder

argument
→ actual value
```

`return`:

```text
returns a value
and
stops function execution
```

Default Parameter:

```js
function greet(name = "Guest") {
}
```

Rest Parameter:

```js
function sum(...numbers) {
}
```

Callback:

```text
function passed to another function
```

Higher-Order Function:

```text
takes a function
or
returns a function
```

First-Class Functions:

```text
functions behave like values
```

Pure Function:

```text
same input → same output
no outside mutation
```

Recursion:

```text
function calls itself
must have a base case
```

Most important distinction:

```text
greet
→ function reference

greet()
→ function execution
```

Most important practical rule:

```text
Functions should make logic
reusable,
readable,
testable,
and easy to reason about.
```

## ✅ 6.7 Functions complete

**Next: 6.8 Arrays 🔥🔥🔥**
