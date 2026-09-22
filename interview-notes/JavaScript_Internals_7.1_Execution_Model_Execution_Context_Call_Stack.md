# 7.1 JavaScript Execution Model + Execution Context + Call Stack 🔥🔥🔥

This is the **first chapter of JavaScript Internals**.

Until now, we mostly focused on:

```text
What does the code do?
```

Now we start understanding:

```text
How does JavaScript actually run that code internally?
```

The three most important ideas in this chapter are:

```text
1. JavaScript Execution Model
2. Execution Context
3. Call Stack
```

Easy master flow:

```text
JavaScript code
↓
JavaScript engine
↓
Execution Context created
↓
code starts running
↓
function called?
↓ yes
new Function Execution Context
↓
pushed onto Call Stack
↓
function finishes
↓
popped from Call Stack
```

---

# 1. What Is the JavaScript Execution Model?

The JavaScript execution model means:

```text
How JavaScript reads,
prepares,
and executes our code.
```

Example:

```js
// Step 1:
// JavaScript sees this variable declaration.
const name =
  "Rahul";

// Step 2:
// JavaScript executes this function call.
console.log(
  name
); // Output: Rahul
```

Output:

```text
Rahul
```

The important question for Internals is:

```text
What happened before console.log() ran?
```

Answer:

```text
JavaScript created an execution environment
for the code first.
```

That environment is called an:

```text
Execution Context
```

---

# 2. JavaScript Runs Inside a JavaScript Engine

Your JavaScript does not execute by itself.

It is executed by a JavaScript engine.

Examples:

```text
Chrome
→ V8

Node.js
→ V8

Firefox
→ SpiderMonkey

Safari
→ JavaScriptCore
```

For interviews, you do NOT need to memorize engine internals deeply here.

Remember:

```text
JavaScript source code
↓
JavaScript engine
↓
code gets executed
```

---

# 3. JavaScript Is Single-Threaded — Core Mental Model 🔥🔥🔥

For normal JavaScript execution, think:

```text
one main thread
→ one piece of JavaScript runs at a time
```

Example:

```js
// Step 1:
console.log(
  "A"
); // Output: A

// Step 2:
console.log(
  "B"
); // Output: B

// Step 3:
console.log(
  "C"
); // Output: C
```

Output:

```text
A
B
C
```

JavaScript executes these statements synchronously from top to bottom.

Mental model:

```text
A
↓
B
↓
C
```

---

# 4. What Does Synchronous Mean?

Synchronous means:

```text
finish the current work first
↓
then move to the next work
```

Example:

```js
function first() {
  // Step 1:
  console.log(
    "First"
  ); // Output: First
}

function second() {
  // Step 2:
  console.log(
    "Second"
  ); // Output: Second
}

// Step 3:
first();

// Step 4:
second();
```

Output:

```text
First
Second
```

`second()` waits until `first()` finishes.

---

# 5. What Is an Execution Context? 🔥🔥🔥

An Execution Context is the environment JavaScript creates to execute code.

Easy definition:

```text
Execution Context
=
place where JavaScript keeps
what it needs to execute some code
```

It includes things such as:

```text
variables
functions
scope-related information
this binding information
execution state
```

Do not think of it as a physical object that you manually create.

JavaScript creates it internally.

---

# 6. Main Types of Execution Context 🔥🔥🔥

For this syllabus, focus on two main types:

```text
1. Global Execution Context
2. Function Execution Context
```

There is also module-related execution behavior, but the interview foundation is:

```text
Global Context
+
Function Contexts
```

---

# 7. Global Execution Context 🔥🔥🔥

When JavaScript starts running a normal script, it creates the Global Execution Context first.

Example:

```js
// Step 1:
const appName =
  "Employee App";

// Step 2:
console.log(
  appName
); // Output: Employee App
```

Before this code executes, conceptually:

```text
JavaScript starts
↓
Global Execution Context created
↓
code runs inside it
```

---

# 8. Only One Global Execution Context Per Script Execution

For one normal script execution, think:

```text
one Global Execution Context
```

Then every function call can create additional Function Execution Contexts.

Mental model:

```text
Global Execution Context
├── function call → Function Context
├── another function call → Function Context
└── another function call → Function Context
```

---

# 9. Function Execution Context 🔥🔥🔥

Every time a function is called, JavaScript creates a new Function Execution Context for that call.

Example:

```js
function greet(
  name
) {
  // Step 1:
  const message =
    `Hello ${name}`;

  // Step 2:
  return message;
}

// Step 3:
const result =
  greet(
    "Rahul"
  );

// Step 4:
console.log(
  result
); // Output: Hello Rahul
```

When `greet("Rahul")` is called:

```text
new Function Execution Context
is created for greet()
```

That context contains information for that specific call, including:

```text
name = "Rahul"
message = "Hello Rahul"
```

---

# 10. Every Function Call Gets a New Context 🔥🔥🔥

Suppose the same function is called twice.

```js
function greet(
  name
) {
  // Step 1:
  return `Hello ${name}`;
}

// Step 2:
console.log(
  greet(
    "Rahul"
  )
); // Output: Hello Rahul

// Step 3:
console.log(
  greet(
    "Amit"
  )
); // Output: Hello Amit
```

Output:

```text
Hello Rahul
Hello Amit
```

Internally think:

```text
Call 1
↓
new greet context
name = Rahul
↓
context finishes

Call 2
↓
new greet context
name = Amit
↓
context finishes
```

Same function definition.

Different function calls.

Different execution contexts.

---

# 11. Execution Context Has Two Important Phases 🔥🔥🔥

For interview understanding, think of an execution context in two broad phases:

```text
1. Creation Phase
2. Execution Phase
```

Mental model:

```text
Execution Context
├── Creation Phase
│   ↓
│   prepare declarations/bindings
│
└── Execution Phase
    ↓
    execute statements
```

---

# 12. Creation Phase — What Happens?

Before normal line-by-line execution, JavaScript prepares declarations.

Very simplified interview model:

```text
var
→ created and initialized with undefined

function declaration
→ function is available

let / const
→ bindings are created
→ but not usable before declaration line
→ TDZ applies
```

We will study Hoisting and TDZ deeply later.

For now remember:

```text
JavaScript prepares declarations
before executing normal statements.
```

---

# 13. Execution Phase — What Happens?

During the Execution Phase:

```text
assignments happen
expressions are evaluated
functions are called
console.log runs
conditions run
loops run
```

Example:

```js
// Step 1:
var age;

// Step 2:
age =
  30;

// Step 3:
console.log(
  age
); // Output: 30
```

Conceptually:

```text
Creation Phase
→ var age prepared

Execution Phase
→ age = 30
→ console.log(age)
```

---

# 14. Simple Creation + Execution Example 🔥🔥🔥

Code:

```js
var name =
  "Rahul";

function greet() {
  return "Hello";
}

console.log(
  name
);

console.log(
  greet()
);
```

Conceptual Creation Phase:

```text
name
→ undefined

greet
→ function available
```

Conceptual Execution Phase:

```text
name = "Rahul"
↓
console.log(name)
↓
greet()
↓
console.log("Hello")
```

Output:

```text
Rahul
Hello
```

---

# 15. Why Can Function Declarations Be Called Before Their Line? — Preview

Example:

```js
// Step 1:
console.log(
  greet()
); // Output: Hello

// Step 2:
function greet() {
  return "Hello";
}
```

Output:

```text
Hello
```

High-level reason:

```text
Creation Phase
↓
function declaration is prepared
↓
Execution Phase starts
↓
greet() is already available
```

Full Hoisting chapter comes later.

---

# 16. `var` During Creation Phase — Preview 🔥🔥

Example:

```js
// Step 1:
console.log(
  age
); // Output: undefined

// Step 2:
var age =
  30;
```

Output:

```text
undefined
```

Simplified explanation:

```text
Creation Phase
→ age created
→ age initialized as undefined

Execution Phase
→ console.log(age)
→ undefined
→ age = 30
```

Full Hoisting later.

---

# 17. `let` / `const` During Creation Phase — Preview

Example:

```js
try {
  // Step 1:
  console.log(
    age
  );

  // Step 2:
  let age =
    30;
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
ReferenceError
```

High-level reason:

```text
let binding exists
but cannot be accessed yet
↓
Temporal Dead Zone
```

TDZ gets its own chapter later.

---

# 18. What Is the Call Stack? 🔥🔥🔥

The Call Stack tracks which function is currently executing.

Easy definition:

```text
Call Stack
=
stack of active execution contexts
```

Think of a stack of plates:

```text
last plate added
→ first plate removed
```

This is called:

```text
LIFO
Last In, First Out
```

---

# 19. Global Execution Context Starts on the Call Stack

When JavaScript starts:

```text
Call Stack
┌─────────────────────────┐
│ Global Execution Context│
└─────────────────────────┘
```

Then function calls are pushed on top.

---

# 20. Simple Function Call Stack Example 🔥🔥🔥

Code:

```js
function greet() {
  // Step 1:
  console.log(
    "Hello"
  ); // Output: Hello
}

// Step 2:
greet();
```

Call Stack flow:

```text
Start:

┌──────────────┐
│ Global       │
└──────────────┘

Call greet():

┌──────────────┐
│ greet()      │ ← top
├──────────────┤
│ Global       │
└──────────────┘

greet finishes:

┌──────────────┐
│ Global       │
└──────────────┘
```

---

# 21. Push and Pop 🔥🔥🔥

When a function is called:

```text
its execution context
is PUSHED onto the stack
```

When the function finishes:

```text
its execution context
is POPPED from the stack
```

Memory:

```text
function called
→ PUSH

function finished
→ POP
```

---

# 22. Nested Function Calls 🔥🔥🔥

Code:

```js
function third() {
  // Step 1:
  console.log(
    "Third"
  ); // Output: Third
}

function second() {
  // Step 2:
  third();

  // Step 3:
  console.log(
    "Second"
  ); // Output: Second
}

function first() {
  // Step 4:
  second();

  // Step 5:
  console.log(
    "First"
  ); // Output: First
}

// Step 6:
first();
```

Output:

```text
Third
Second
First
```

Why?

```text
first()
↓ calls
second()
↓ calls
third()
↓ finishes
second continues
↓ finishes
first continues
```

---

# 23. Trace the Nested Call Stack 🔥🔥🔥

Starting:

```text
┌──────────────┐
│ Global       │
└──────────────┘
```

`first()` called:

```text
┌──────────────┐
│ first()      │
├──────────────┤
│ Global       │
└──────────────┘
```

`second()` called:

```text
┌──────────────┐
│ second()     │
├──────────────┤
│ first()      │
├──────────────┤
│ Global       │
└──────────────┘
```

`third()` called:

```text
┌──────────────┐
│ third()      │ ← currently running
├──────────────┤
│ second()     │
├──────────────┤
│ first()      │
├──────────────┤
│ Global       │
└──────────────┘
```

Then:

```text
third pops
↓
second continues
↓
second pops
↓
first continues
↓
first pops
```

---

# 24. The Top of the Stack Is Currently Running

Important rule:

```text
The execution context at the top
of the Call Stack
is the one currently executing.
```

Example stack:

```text
┌──────────────┐
│ calculate()  │ ← currently executing
├──────────────┤
│ checkout()   │
├──────────────┤
│ Global       │
└──────────────┘
```

`checkout()` is waiting for `calculate()` to finish.

---

# 25. Function Returns → Context Is Removed

Example:

```js
function add(
  a,
  b
) {
  // Step 1:
  return (
    a + b
  );
}

// Step 2:
const result =
  add(
    2,
    3
  );

// Step 3:
console.log(
  result
); // Output: 5
```

Flow:

```text
Global
↓
add() pushed
↓
returns 5
↓
add() popped
↓
Global continues
↓
result = 5
```

---

# 26. Local Variables Live With Their Function Execution 🔥🔥

Example:

```js
function calculate() {
  // Step 1:
  const subtotal =
    100;

  // Step 2:
  const tax =
    20;

  // Step 3:
  return (
    subtotal
    +
    tax
  );
}

// Step 4:
console.log(
  calculate()
); // Output: 120
```

Output:

```text
120
```

During `calculate()` execution, its context contains its local bindings conceptually:

```text
subtotal = 100
tax = 20
```

After the function finishes, that function execution context is removed from the Call Stack.

Closures can keep some referenced data alive; we will study that later.

---

# 27. Parameters Belong to the Function Call Context

Example:

```js
function multiply(
  a,
  b
) {
  // Step 1:
  return (
    a * b
  );
}

// Step 2:
console.log(
  multiply(
    4,
    5
  )
); // Output: 20
```

Output:

```text
20
```

For this call:

```text
multiply Function Context
↓
a = 4
b = 5
```

Another call gets another set of parameter values.

---

# 28. Same Function, Multiple Calls, Separate Contexts 🔥🔥🔥

```js
function square(
  number
) {
  // Step 1:
  return (
    number
    *
    number
  );
}

// Step 2:
const first =
  square(
    2
  );

// Step 3:
const second =
  square(
    5
  );

// Step 4:
console.log(
  first,
  second
); // Output: 4 25
```

Output:

```text
4 25
```

Mental model:

```text
square(2)
→ context 1
→ number = 2

square(5)
→ context 2
→ number = 5
```

---

# 29. Call Stack Explains Execution Order 🔥🔥🔥

Code:

```js
function one() {
  // Step 1:
  console.log(
    "one-start"
  ); // Output: one-start

  // Step 2:
  two();

  // Step 3:
  console.log(
    "one-end"
  ); // Output: one-end
}

function two() {
  // Step 4:
  console.log(
    "two"
  ); // Output: two
}

// Step 5:
one();
```

Output:

```text
one-start
two
one-end
```

Why?

```text
one starts
↓
two pushed on top
↓
two finishes
↓
two popped
↓
one continues
```

---

# 30. JavaScript Does Not Skip Ahead in Normal Synchronous Code

Example:

```js
function slowWork() {
  // Step 1:
  let total =
    0;

  // Step 2:
  for (
    let i = 0;
    i < 3;
    i++
  ) {
    total +=
      i;
  }

  // Step 3:
  return total;
}

// Step 4:
console.log(
  "Before"
); // Output: Before

// Step 5:
console.log(
  slowWork()
); // Output: 3

// Step 6:
console.log(
  "After"
); // Output: After
```

Output:

```text
Before
3
After
```

Normal synchronous code waits for the current work to finish.

---

# 31. Blocking the Call Stack — Important Concept 🔥🔥🔥

If JavaScript runs a long synchronous task, other JavaScript cannot run on the same call stack until it finishes.

Mental model:

```text
huge loop
↓
Call Stack busy
↓
next JavaScript waits
```

Example concept:

```js
// Step 1:
console.log(
  "Start"
); // Output: Start

// Step 2:
// Imagine this loop is extremely expensive.
let total =
  0;

for (
  let i = 0;
  i < 1000;
  i++
) {
  total +=
    i;
}

// Step 3:
console.log(
  "End"
); // Output: End
```

Output:

```text
Start
End
```

The browser cannot execute another JavaScript stack frame in the middle of that synchronous loop.

---

# 32. Where Does Async JavaScript Fit? — Preview Only

You may ask:

```text
If JavaScript is single-threaded,
how does setTimeout/fetch work?
```

High-level preview:

```text
JavaScript Call Stack
+
Browser / runtime APIs
+
queues
+
Event Loop
```

Async work is covered deeply in Section 8.

For now remember:

```text
Call Stack still executes
one JavaScript task at a time.
```

---

# 33. `setTimeout()` Does Not Make the Call Stack Parallel — Preview

Example:

```js
// Step 1:
console.log(
  "A"
); // Output: A

// Step 2:
setTimeout(
  () => {
    console.log(
      "B"
    ); // Output later: B
  },
  0
);

// Step 3:
console.log(
  "C"
); // Output: C
```

Output:

```text
A
C
B
```

Do not deeply analyze the queue yet.

For this chapter just remember:

```text
callback does not interrupt
currently running Call Stack
```

---

# 34. Execution Context vs Call Stack 🔥🔥🔥

This is a very important interview distinction.

Execution Context:

```text
The environment created
for executing some code.
```

Call Stack:

```text
The structure that tracks
active execution contexts.
```

Easy analogy:

```text
Execution Context
→ one plate

Call Stack
→ stack of plates
```

---

# 35. Global Context vs Function Context

Global Context:

```text
created when script starts
```

Function Context:

```text
created every time a function is called
```

Example:

```js
const app =
  "Demo";

function run() {
  // Step 1:
  const status =
    "running";

  // Step 2:
  return status;
}

// Step 3:
console.log(
  run()
); // Output: running
```

Mental model:

```text
Global Context
→ app
→ run function reference

run() called
↓
Function Context
→ status
```

---

# 36. Function Definition Does NOT Mean Function Call 🔥🔥🔥

Example:

```js
function greet() {
  // Step 1:
  console.log(
    "Hello"
  );
}
```

At this point:

```text
greet is defined
but its body is not running yet
```

Only after:

```js
// Step 2:
greet(); // Output: Hello
```

does JavaScript create a Function Execution Context for that call.

Output:

```text
Hello
```

---

# 37. Arrow Function Calls Also Need Execution Contexts — Awareness

Example:

```js
const add =
  (
    a,
    b
  ) => {
    // Step 1:
    return (
      a + b
    );
  };

// Step 2:
console.log(
  add(
    2,
    3
  )
); // Output: 5
```

Output:

```text
5
```

Calling the arrow function still executes function code and creates function-call execution state.

Arrow functions differ in things like their own `this` and `arguments`, which we will cover later.

---

# 38. Recursion Uses the Call Stack 🔥🔥🔥

A recursive function calls itself.

Example:

```js
function countdown(
  number
) {
  // Step 1:
  if (
    number === 0
  ) {
    return;
  }

  // Step 2:
  console.log(
    number
  );

  // Step 3:
  countdown(
    number - 1
  );
}

// Step 4:
countdown(
  3
);
```

Output:

```text
3
2
1
```

Call Stack concept:

```text
countdown(3)
↓
countdown(2)
↓
countdown(1)
↓
countdown(0)
```

Each call gets its own Function Execution Context.

---

# 39. Recursive Call Stack Trace 🔥🔥🔥

At the deepest point:

```text
┌────────────────┐
│ countdown(0)   │
├────────────────┤
│ countdown(1)   │
├────────────────┤
│ countdown(2)   │
├────────────────┤
│ countdown(3)   │
├────────────────┤
│ Global         │
└────────────────┘
```

Then calls return in reverse order.

That is LIFO again.

---

# 40. Stack Overflow 🔥🔥🔥

If functions keep calling without eventually returning, the Call Stack can become too large.

Example concept:

```js
function recurseForever() {
  // Step 1:
  // Calls itself with no stopping condition.
  recurseForever();
}

// Step 2:
// Calling this eventually causes
// a maximum call stack error.
// recurseForever();
```

Typical result if executed:

```text
RangeError:
Maximum call stack size exceeded
```

Exact wording can vary by environment.

---

# 41. Why Base Case Matters in Recursion

Correct recursion needs a stopping condition.

```js
function countDown(
  number
) {
  // Step 1:
  // Base case.
  if (
    number <= 0
  ) {
    return;
  }

  // Step 2:
  console.log(
    number
  );

  // Step 3:
  countDown(
    number - 1
  );
}

// Step 4:
countDown(
  3
);
```

Output:

```text
3
2
1
```

Base case prevents infinite stack growth.

---

# 42. Call Stack and Error Stack Traces 🔥🔥

When an error occurs, the stack trace often shows the chain of function calls.

Example:

```js
function third() {
  // Step 1:
  throw new Error(
    "Failed"
  );
}

function second() {
  // Step 2:
  third();
}

function first() {
  // Step 3:
  second();
}

try {
  // Step 4:
  first();
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: Failed
}
```

Output:

```text
Failed
```

A real stack trace may show something like:

```text
third
second
first
```

which helps you understand how execution reached the error.

---

# 43. Interview Output Question — Nested Calls 🔥🔥🔥

```js
function a() {
  // Step 1:
  console.log(
    "A1"
  );

  // Step 2:
  b();

  // Step 3:
  console.log(
    "A2"
  );
}

function b() {
  // Step 4:
  console.log(
    "B"
  );
}

// Step 5:
a();
```

Expected output:

```text
A1
B
A2
```

Trace:

```text
Global
↓
a()
↓
prints A1
↓
b() pushed
↓
prints B
↓
b() popped
↓
a() continues
↓
prints A2
```

---

# 44. Interview Output Question — Multiple Function Calls

```js
function addOne(
  value
) {
  // Step 1:
  return (
    value + 1
  );
}

// Step 2:
const first =
  addOne(
    1
  );

// Step 3:
const second =
  addOne(
    first
  );

// Step 4:
console.log(
  second
); // Output: 3
```

Output:

```text
3
```

Contexts:

```text
addOne(1)
→ value = 1
→ returns 2

addOne(2)
→ value = 2
→ returns 3
```

---

# 45. Interview Question — What Is an Execution Context? 🔥🔥🔥

Good answer:

```text
An Execution Context is the internal environment
JavaScript creates to execute code.

The Global Execution Context is created first,
and every function call creates a new
Function Execution Context.
```

Short version:

```text
Execution Context
→ environment for executing code
```

---

# 46. Interview Question — What Is the Call Stack? 🔥🔥🔥

Good answer:

```text
The Call Stack is a LIFO structure
used by JavaScript to track active
execution contexts / function calls.

When a function is called,
its context is pushed.

When it returns,
its context is popped.
```

---

# 47. Interview Question — Why Is JavaScript Called Single-Threaded?

Good answer:

```text
JavaScript executes one piece of JavaScript
at a time on its main Call Stack.

Asynchronous behavior is coordinated
with runtime APIs, queues, and the Event Loop,
but JavaScript callbacks still execute
one at a time on the Call Stack.
```

We will study that deeply in Section 8.

---

# 48. Debugging Mental Model — “Where Am I in the Stack?” 🔥🔥🔥

When debugging nested code, ask:

```text
Which function am I currently inside?

Who called this function?

What function is below it on the stack?

What local variables belong to this call?
```

Example:

```text
saveEmployee()
↓ calls
validateEmployee()
↓ calls
validateEmail()
```

If error occurs inside `validateEmail()`:

```text
Top of stack
→ validateEmail()

Below
→ validateEmployee()

Below
→ saveEmployee()
```

This mental model is extremely useful in real debugging.

---

# 49. Execution Context vs Scope — Do Not Mix Them 🔥🔥🔥

They are related, but not identical.

Execution Context:

```text
created when code/function executes
```

Scope:

```text
controls where variables can be accessed
```

Example:

```js
function outer() {
  // Step 1:
  const name =
    "Rahul";

  function inner() {
    // Step 2:
    console.log(
      name
    ); // Output: Rahul
  }

  // Step 3:
  inner();
}

// Step 4:
outer();
```

Output:

```text
Rahul
```

Why `inner()` can access `name` is mainly a **Lexical Scope / Scope Chain** topic.

That is coming next in Section 7.

---

# 50. Final Master Trace 🔥🔥🔥

Code:

```js
const appName =
  "Employee App";

function getEmployeeName() {
  // Step 1:
  const name =
    "Rahul";

  // Step 2:
  return name;
}

function showEmployee() {
  // Step 3:
  const employeeName =
    getEmployeeName();

  // Step 4:
  console.log(
    employeeName
  ); // Output: Rahul
}

// Step 5:
console.log(
  appName
); // Output: Employee App

// Step 6:
showEmployee();
```

Output:

```text
Employee App
Rahul
```

Complete execution flow:

```text
JavaScript starts
↓
Global Execution Context created
↓
Global pushed onto Call Stack
↓
appName assigned
↓
function declarations available
↓
console.log(appName)
↓
Employee App
↓
showEmployee() called
↓
showEmployee Function Context pushed
↓
getEmployeeName() called
↓
getEmployeeName Function Context pushed
↓
name = Rahul
↓
return Rahul
↓
getEmployeeName context popped
↓
showEmployee continues
↓
employeeName = Rahul
↓
console.log(Rahul)
↓
showEmployee finishes
↓
showEmployee context popped
↓
Global continues
↓
script finishes
```

At deepest point:

```text
┌───────────────────────┐
│ getEmployeeName()     │ ← running
├───────────────────────┤
│ showEmployee()        │
├───────────────────────┤
│ Global                │
└───────────────────────┘
```

---

# Quick Memory 🧠🔥🔥🔥

## JavaScript Execution Model

```text
JavaScript engine
↓
creates execution context
↓
executes code
↓
tracks function calls using Call Stack
```

## Execution Context

```text
Environment created to execute code.
```

Main types:

```text
Global Execution Context
Function Execution Context
```

## Two Broad Phases

```text
Creation Phase
→ declarations/bindings prepared

Execution Phase
→ statements actually execute
```

## Call Stack

```text
tracks active function calls

LIFO
→ Last In, First Out
```

## Push / Pop

```text
function called
→ PUSH context

function returns
→ POP context
```

## Nested Calls

```text
Global
↓
first()
↓
second()
↓
third()
```

Deepest stack:

```text
third()
second()
first()
Global
```

## Recursion

```text
function calls itself
↓
new context for every call
↓
base case required
```

Without stopping condition:

```text
Call Stack keeps growing
↓
Maximum call stack size exceeded
```

## Most Important Interview Difference

```text
Execution Context
→ one execution environment

Call Stack
→ structure holding active execution contexts
```

## Most Important Rule

```text
Top of the Call Stack
=
currently executing JavaScript context
```

---

# ✅ 7.1 JavaScript Execution Model + Execution Context + Call Stack Complete

We have now started:

```text
SECTION 7 — JAVASCRIPT INTERNALS 🔥🔥🔥
```

Completed:

```text
7.1 JavaScript Execution Model
7.1 Execution Context
7.1 Call Stack
```

Next topic:

```text
7.2 Scope
├── Global Scope
├── Function Scope
├── Block Scope
├── Lexical Scope
└── Scope Chain
```

**Next: 7.2 Scope + Lexical Scope + Scope Chain 🔥🔥🔥**
