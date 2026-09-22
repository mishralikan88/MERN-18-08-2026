# 7.2 Scope + Lexical Scope + Scope Chain 🔥🔥🔥

Scope means:

```text
Where can a variable be accessed?
```

That is the main question.

Easy mental model:

```text
Variable created
↓
JavaScript asks:
"From which parts of code
can this variable be used?"
↓
That accessibility area
is called Scope
```

Main scope types in this chapter:

```text
1. Global Scope
2. Function Scope
3. Block Scope
4. Lexical Scope
5. Scope Chain
```

---

# 1. What Is Scope?

Scope controls the visibility and accessibility of variables.

Example:

```js
const appName =
  "Employee App";

function showApp() {
  // Step 1:
  // appName is accessible here.
  console.log(
    appName
  ); // Output: Employee App
}

// Step 2:
showApp();
```

Output:

```text
Employee App
```

Why?

```text
appName
↓
created outside function
↓
global scope
↓
function can access outer variable
```

---

# 2. Why Scope Is Important

Scope helps us avoid:

```text
variable name conflicts
accidental changes
global pollution
hard-to-debug code
```

It also helps JavaScript know:

```text
Which variable should this name refer to?
```

---

# 3. Global Scope 🔥🔥🔥

A variable declared outside functions and blocks is generally in global scope.

Example:

```js
// Step 1:
// Global variable.
const company =
  "OpenAI";

function printCompany() {
  // Step 2:
  // Function can access global variable.
  console.log(
    company
  ); // Output: OpenAI
}

// Step 3:
printCompany();

// Step 4:
// Global variable is also accessible here.
console.log(
  company
); // Output: OpenAI
```

Output:

```text
OpenAI
OpenAI
```

---

# 4. Global Variable Can Be Read From Inner Scope

Example:

```js
const taxRate =
  0.18;

function calculateTax(
  amount
) {
  // Step 1:
  // taxRate comes from outer/global scope.
  return (
    amount
    *
    taxRate
  );
}

// Step 2:
console.log(
  calculateTax(
    1000
  )
); // Output: 180
```

Output:

```text
180
```

Flow:

```text
calculateTax scope
↓
taxRate not found locally
↓
look outside
↓
global scope
↓
taxRate found
```

---

# 5. Function Scope 🔥🔥🔥

Variables declared inside a function belong to that function's scope.

Example:

```js
function greet() {
  // Step 1:
  // message belongs to greet().
  const message =
    "Hello";

  // Step 2:
  console.log(
    message
  ); // Output: Hello
}

// Step 3:
greet();
```

Output:

```text
Hello
```

Outside the function, `message` is not available.

---

# 6. Function Variable Is Not Available Outside

```js
function greet() {
  // Step 1:
  const message =
    "Hello";

  // Step 2:
  console.log(
    message
  ); // Output: Hello
}

// Step 3:
greet();

try {
  // Step 4:
  // message does not exist here.
  console.log(
    message
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
Hello
ReferenceError
```

---

# 7. Each Function Has Its Own Scope

```js
function first() {
  // Step 1:
  const value =
    "First";

  // Step 2:
  console.log(
    value
  ); // Output: First
}

function second() {
  // Step 3:
  const value =
    "Second";

  // Step 4:
  console.log(
    value
  ); // Output: Second
}

// Step 5:
first();

// Step 6:
second();
```

Output:

```text
First
Second
```

Why no conflict?

```text
first() scope
→ value = "First"

second() scope
→ value = "Second"
```

Different scopes.

---

# 8. Function Parameters Are Also Function-Scoped 🔥🔥

```js
function greet(
  name
) {
  // Step 1:
  // name is available inside function.
  console.log(
    name
  ); // Output: Rahul
}

// Step 2:
greet(
  "Rahul"
);
```

Output:

```text
Rahul
```

`name` belongs to that function call's local environment.

---

# 9. Nested Functions Can Access Outer Function Variables 🔥🔥🔥

```js
function outer() {
  // Step 1:
  const name =
    "Rahul";

  function inner() {
    // Step 2:
    // inner can access outer variable.
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

This is the beginning of **Lexical Scope**.

---

# 10. Outer Function Cannot Access Inner Variable

```js
function outer() {
  function inner() {
    // Step 1:
    const secret =
      "ABC";
  }

  // Step 2:
  inner();

  try {
    // Step 3:
    // outer cannot access
    // variable created inside inner.
    console.log(
      secret
    );
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}

// Step 5:
outer();
```

Output:

```text
ReferenceError
```

Important direction:

```text
inner
→ can look outward

outer
→ cannot look inward
```

---

# 11. Block Scope 🔥🔥🔥

A block is code inside:

```text
{
  ...
}
```

Common examples:

```text
if block
for block
while block
standalone block
```

`let` and `const` are block-scoped.

---

# 12. `let` Inside Block

```js
if (
  true
) {
  // Step 1:
  let message =
    "Hello";

  // Step 2:
  console.log(
    message
  ); // Output: Hello
}

try {
  // Step 3:
  // message does not exist outside block.
  console.log(
    message
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
Hello
ReferenceError
```

---

# 13. `const` Inside Block

```js
{
  // Step 1:
  const role =
    "Admin";

  // Step 2:
  console.log(
    role
  ); // Output: Admin
}

try {
  // Step 3:
  console.log(
    role
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
Admin
ReferenceError
```

---

# 14. `var` Is Not Block-Scoped 🔥🔥🔥

Important difference.

```js
if (
  true
) {
  // Step 1:
  var status =
    "Active";
}

// Step 2:
// var escapes the block.
console.log(
  status
); // Output: Active
```

Output:

```text
Active
```

Why?

```text
var
→ function-scoped
not block-scoped
```

---

# 15. `var` Inside Function + Block

```js
function test() {
  if (
    true
  ) {
    // Step 1:
    var value =
      10;
  }

  // Step 2:
  // Accessible inside same function.
  console.log(
    value
  ); // Output: 10
}

// Step 3:
test();
```

Output:

```text
10
```

---

# 16. `let` Inside Function + Block

```js
function test() {
  if (
    true
  ) {
    // Step 1:
    let value =
      10;

    console.log(
      value
    ); // Output: 10
  }

  try {
    // Step 2:
    // Not accessible outside block.
    console.log(
      value
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}

// Step 4:
test();
```

Output:

```text
10
ReferenceError
```

---

# 17. Block Scope in `for` Loop 🔥🔥🔥

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  // Step 1:
  console.log(
    i
  );
  // Output:
  // 0
  // 1
  // 2
}

try {
  // Step 2:
  console.log(
    i
  );
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
0
1
2
ReferenceError
```

---

# 18. What Is Lexical Scope? 🔥🔥🔥

Lexical Scope means:

```text
A function can access variables
based on where the function
was written in the source code.
```

Very important:

```text
where function is WRITTEN
matters
```

not:

```text
where function is CALLED
```

---

# 19. Lexical Scope Basic Example

```js
const globalName =
  "Global";

function outer() {
  // Step 1:
  const outerName =
    "Outer";

  function inner() {
    // Step 2:
    console.log(
      globalName
    ); // Output: Global

    // Step 3:
    console.log(
      outerName
    ); // Output: Outer
  }

  // Step 4:
  inner();
}

// Step 5:
outer();
```

Output:

```text
Global
Outer
```

Why?

`inner()` is written inside `outer()`.

So its lexical environment includes access to outer scopes.

---

# 20. Lexical Scope Is Decided by Code Structure 🔥🔥🔥

Look at the nesting:

```text
Global
└── outer()
    └── inner()
```

So `inner()` can search:

```text
inner scope
↓
outer scope
↓
global scope
```

That lookup path is the **Scope Chain**.

---

# 21. What Is Scope Chain? 🔥🔥🔥

Scope Chain is the path JavaScript follows when resolving a variable name.

Mental model:

```text
Use variable "x"
↓
check current scope
↓ not found
check outer scope
↓ not found
check next outer scope
↓
continue
```

If still not found:

```text
ReferenceError
```

---

# 22. Scope Chain Example

```js
const company =
  "ABC";

function department() {
  const departmentName =
    "IT";

  function employee() {
    const employeeName =
      "Rahul";

    // Step 1:
    console.log(
      employeeName
    ); // Output: Rahul

    // Step 2:
    console.log(
      departmentName
    ); // Output: IT

    // Step 3:
    console.log(
      company
    ); // Output: ABC
  }

  employee();
}

department();
```

Output:

```text
Rahul
IT
ABC
```

Lookup:

```text
employeeName
→ current employee scope

departmentName
→ employee scope not found
→ department scope found

company
→ employee not found
→ department not found
→ global found
```

---

# 23. Scope Lookup Stops When Variable Is Found

```js
const value =
  "Global";

function outer() {
  const value =
    "Outer";

  function inner() {
    // Step 1:
    console.log(
      value
    ); // Output: Outer
  }

  // Step 2:
  inner();
}

// Step 3:
outer();
```

Output:

```text
Outer
```

Why?

Lookup:

```text
inner scope
↓ no local value
outer scope
↓ value found = "Outer"
STOP
```

JavaScript does not continue to global after finding the nearest matching variable.

---

# 24. Variable Shadowing 🔥🔥🔥

Variable shadowing means:

```text
inner scope declares
same variable name
as outer scope
```

Example:

```js
const role =
  "User";

function showRole() {
  // Step 1:
  const role =
    "Admin";

  // Step 2:
  console.log(
    role
  ); // Output: Admin
}

// Step 3:
showRole();

// Step 4:
console.log(
  role
); // Output: User
```

Output:

```text
Admin
User
```

Inner `role` shadows outer `role`.

---

# 25. Shadowing Does Not Change Outer Variable

```js
let count =
  1;

function test() {
  // Step 1:
  let count =
    10;

  // Step 2:
  count++;

  // Step 3:
  console.log(
    count
  ); // Output: 11
}

// Step 4:
test();

// Step 5:
console.log(
  count
); // Output: 1
```

Output:

```text
11
1
```

Different variables with the same name.

---

# 26. Updating Outer Variable Without Shadowing

```js
let count =
  1;

function increment() {
  // Step 1:
  // No local count declared.
  // Scope chain finds outer count.
  count++;
}

// Step 2:
increment();

// Step 3:
console.log(
  count
); // Output: 2
```

Output:

```text
2
```

Important:

```text
no local declaration
↓
outer variable is used
```

---

# 27. Local Variable Wins Over Outer Variable 🔥🔥🔥

```js
const name =
  "Global Rahul";

function test() {
  // Step 1:
  const name =
    "Local Amit";

  // Step 2:
  console.log(
    name
  ); // Output: Local Amit
}

// Step 3:
test();
```

Output:

```text
Local Amit
```

Rule:

```text
nearest scope wins
```

---

# 28. Scope Is Lexical, Not Dynamic 🔥🔥🔥

This is an important interview concept.

Example:

```js
const name =
  "Global";

function printName() {
  // Step 1:
  console.log(
    name
  ); // Output: Global
}

function run() {
  // Step 2:
  const name =
    "Run";

  // Step 3:
  printName();
}

// Step 4:
run();
```

Output:

```text
Global
```

Many people expect:

```text
Run
```

But output is:

```text
Global
```

Why?

`printName()` was written in global scope.

It does NOT get access to `run()`'s local scope just because `run()` called it.

---

# 29. Lexical Scope Example — Written Location Matters

Structure:

```text
Global
├── printName()
└── run()
```

`printName()` is NOT inside `run()`.

So `printName()`'s outer scope is:

```text
Global
```

not:

```text
run()
```

Therefore:

```js
const name =
  "Global";

function printName() {
  console.log(
    name
  );
}

function run() {
  const name =
    "Run";

  printName();
}

run();
```

Output:

```text
Global
```

---

# 30. Nested Function Has Access to Parent Scope

```js
function outer() {
  // Step 1:
  const token =
    "ABC123";

  function inner() {
    // Step 2:
    console.log(
      token
    ); // Output: ABC123
  }

  // Step 3:
  inner();
}

// Step 4:
outer();
```

Output:

```text
ABC123
```

Because:

```text
inner was written inside outer
```

---

# 31. Sibling Functions Cannot Access Each Other's Locals

```js
function outer() {
  function first() {
    // Step 1:
    const secret =
      "FIRST";
  }

  function second() {
    try {
      // Step 2:
      console.log(
        secret
      );
    } catch (
      error
    ) {
      // Step 3:
      console.log(
        error.name
      ); // Output: ReferenceError
    }
  }

  // Step 4:
  first();

  // Step 5:
  second();
}

// Step 6:
outer();
```

Output:

```text
ReferenceError
```

Why?

```text
first() local scope
and
second() local scope

are separate sibling scopes.
```

---

# 32. Inner Function Can Access Multiple Outer Levels 🔥🔥🔥

```js
const app =
  "Employee App";

function level1() {
  const department =
    "IT";

  function level2() {
    const role =
      "Developer";

    function level3() {
      // Step 1:
      console.log(
        app
      ); // Output: Employee App

      // Step 2:
      console.log(
        department
      ); // Output: IT

      // Step 3:
      console.log(
        role
      ); // Output: Developer
    }

    level3();
  }

  level2();
}

level1();
```

Output:

```text
Employee App
IT
Developer
```

Scope chain:

```text
level3
↓
level2
↓
level1
↓
global
```

---

# 33. What Happens If Variable Is Not Found Anywhere?

```js
function test() {
  try {
    // Step 1:
    console.log(
      missingValue
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}

// Step 3:
test();
```

Output:

```text
ReferenceError
```

Lookup:

```text
test scope
↓ not found
global scope
↓ not found
ReferenceError
```

---

# 34. Scope and Execution Context Are Related but Different 🔥🔥🔥

Execution Context:

```text
created when code/function executes
```

Scope:

```text
determines where variables
can be accessed
```

Example:

```js
function greet() {
  const message =
    "Hello";

  console.log(
    message
  );
}
```

When `greet()` is called:

```text
Function Execution Context created
```

And `message` belongs to:

```text
greet function scope
```

---

# 35. Scope Chain and Call Stack Are Different 🔥🔥🔥

Call Stack answers:

```text
Which function is currently running?
Who called whom?
```

Scope Chain answers:

```text
Where should JavaScript look
for this variable name?
```

Very important distinction.

---

# 36. Call Stack vs Scope Chain Example

```js
const globalValue =
  "Global";

function outer() {
  const outerValue =
    "Outer";

  function inner() {
    // Step 1:
    console.log(
      outerValue
    ); // Output: Outer

    // Step 2:
    console.log(
      globalValue
    ); // Output: Global
  }

  // Step 3:
  inner();
}

// Step 4:
outer();
```

Call Stack at deepest point:

```text
inner()
outer()
Global
```

Scope Chain for `globalValue`:

```text
inner scope
↓
outer scope
↓
global scope
```

They look similar here, but they represent different ideas.

---

# 37. Scope Chain Does Not Depend on Caller 🔥🔥🔥

This proves lexical scoping again.

```js
const value =
  "Global";

function show() {
  // Step 1:
  console.log(
    value
  ); // Output: Global
}

function caller() {
  // Step 2:
  const value =
    "Caller";

  // Step 3:
  show();
}

// Step 4:
caller();
```

Output:

```text
Global
```

Call stack:

```text
show()
caller()
Global
```

But scope chain for `show()`:

```text
show scope
↓
global scope
```

NOT:

```text
show
↓
caller scope
```

This is a critical interview point.

---

# 38. Block Shadowing

```js
const status =
  "Global";

{
  // Step 1:
  const status =
    "Block";

  // Step 2:
  console.log(
    status
  ); // Output: Block
}

// Step 3:
console.log(
  status
); // Output: Global
```

Output:

```text
Block
Global
```

---

# 39. Nested Block Scope

```js
{
  const first =
    "A";

  {
    const second =
      "B";

    // Step 1:
    console.log(
      first
    ); // Output: A

    // Step 2:
    console.log(
      second
    ); // Output: B
  }
}
```

Output:

```text
A
B
```

Inner block can look outward.

---

# 40. Outer Block Cannot Access Inner Block Variable

```js
{
  {
    // Step 1:
    const secret =
      "ABC";
  }

  try {
    // Step 2:
    console.log(
      secret
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}
```

Output:

```text
ReferenceError
```

---

# 41. `for` Loop With `let` Creates Block-Scoped Loop Variable

```js
for (
  let i = 0;
  i < 2;
  i++
) {
  // Step 1:
  console.log(
    i
  );
  // Output:
  // 0
  // 1
}
```

Output:

```text
0
1
```

Outside:

```js
try {
  console.log(
    i
  );
} catch (
  error
) {
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
ReferenceError
```

---

# 42. `var` Loop Variable Escapes the Block — Preview

```js
for (
  var i = 0;
  i < 2;
  i++
) {
  // Step 1:
  console.log(
    i
  );
  // Output:
  // 0
  // 1
}

// Step 2:
console.log(
  i
); // Output: 2
```

Output:

```text
0
1
2
```

This becomes very important in:

```text
var + setTimeout
vs
let + setTimeout
```

We will cover that later in Internals.

---

# 43. Function Declaration Scope — Practical Awareness

A function declared inside another function is local to that outer function.

```js
function outer() {
  // Step 1:
  function helper() {
    return "Helper";
  }

  // Step 2:
  console.log(
    helper()
  ); // Output: Helper
}

// Step 3:
outer();

try {
  // Step 4:
  console.log(
    helper()
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
Helper
ReferenceError
```

---

# 44. Practical Example — Form Validation Scope

```js
const minAge =
  18;

function validateUser(
  user
) {
  // Step 1:
  // local function variable.
  const name =
    user.name.trim();

  // Step 2:
  // minAge comes from outer/global scope.
  const isAdult =
    user.age
    >=
    minAge;

  // Step 3:
  return {
    name,
    isAdult,
  };
}

// Step 4:
console.log(
  validateUser(
    {
      name: " Rahul ",
      age: 20,
    }
  )
);
// Output:
// { name: "Rahul", isAdult: true }
```

Output:

```text
{ name: "Rahul", isAdult: true }
```

Scope use:

```text
name
→ function scope

minAge
→ outer/global scope
```

---

# 45. Practical Example — Avoid Global Pollution 🔥🔥🔥

Bad:

```js
let result =
  0;

function calculate() {
  result =
    100;
}
```

Better:

```js
function calculate() {
  // Step 1:
  // Keep result local
  // when it does not need to be global.
  const result =
    100;

  // Step 2:
  return result;
}

// Step 3:
console.log(
  calculate()
); // Output: 100
```

Output:

```text
100
```

Rule:

```text
Keep variables
in the smallest useful scope.
```

---

# 46. Interview Output — Shadowing 🔥🔥🔥

```js
const value =
  10;

function test() {
  const value =
    20;

  console.log(
    value
  );
}

test();

console.log(
  value
);
```

Expected output:

```text
20
10
```

Why?

```text
local value shadows global value
```

---

# 47. Interview Output — Scope Chain

```js
const a =
  1;

function outer() {
  const b =
    2;

  function inner() {
    const c =
      3;

    console.log(
      a + b + c
    );
  }

  inner();
}

outer();
```

Expected output:

```text
6
```

Lookup:

```text
c
→ inner

b
→ outer

a
→ global
```

---

# 48. Interview Output — Lexical Scope Trap 🔥🔥🔥

```js
const x =
  "Global";

function printX() {
  console.log(
    x
  );
}

function run() {
  const x =
    "Run";

  printX();
}

run();
```

Expected output:

```text
Global
```

Why?

```text
printX was written in global scope.
```

Not:

```text
Run
```

---

# 49. Interview Question — Global vs Function vs Block Scope 🔥🔥🔥

Good answer:

```text
Global Scope
→ available broadly from outermost script scope

Function Scope
→ available inside the function

Block Scope
→ available only inside { }

let / const
→ block-scoped

var
→ function-scoped
```

---

# 50. Interview Question — What Is Lexical Scope? 🔥🔥🔥

Good answer:

```text
Lexical Scope means
a function's access to variables
is determined by where that function
is written in the source code,
not where it is called.
```

Short memory:

```text
Lexical
→ location in code
```

---

# 51. Interview Question — What Is Scope Chain? 🔥🔥🔥

Good answer:

```text
Scope Chain is the variable lookup path.

JavaScript checks:
current scope
↓
outer scope
↓
next outer scope
↓
global scope

It stops when the variable is found.
```

---

# 52. Interview Question — What Is Variable Shadowing?

Good answer:

```text
Variable shadowing happens when
an inner scope declares a variable
with the same name as an outer variable.

The inner variable hides the outer one
inside that inner scope.
```

---

# 53. Debugging — Wrong Assumption About Caller Scope 🔥🔥🔥

Wrong assumption:

```text
If function A calls function B,
B can access A's local variables.
```

Not true in lexical scoping.

Example:

```js
function show() {
  try {
    // Step 1:
    console.log(
      secret
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}

function run() {
  const secret =
    "ABC";

  // Step 3:
  show();
}

// Step 4:
run();
```

Output:

```text
ReferenceError
```

Why?

```text
show()
was not written inside run()
```

---

# 54. Debugging — Accidental Global-Like Design

Avoid unnecessary broad scope.

Instead of:

```js
let currentUser =
  null;

function setUser(
  user
) {
  currentUser =
    user;
}
```

when possible, prefer passing values explicitly:

```js
function getUserName(
  user
) {
  // Step 1:
  return (
    user.name
  );
}

// Step 2:
console.log(
  getUserName(
    {
      name: "Rahul",
    }
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

This reduces hidden dependencies.

---

# 55. Scope Decision Guide 🔥🔥🔥

```text
Variable needed everywhere?
→ outer/global scope only if truly necessary

Variable needed only in one function?
→ function scope

Variable needed only inside if/loop/block?
→ block scope

Need inner function to use outer data?
→ lexical scope handles it

Variable name not found locally?
→ scope chain searches outward

Same name exists locally and globally?
→ nearest scope wins
```

---

# 56. Final Master Trace 🔥🔥🔥

Code:

```js
const company =
  "ABC";

function createEmployee() {
  const department =
    "IT";

  function buildProfile() {
    const name =
      "Rahul";

    // Step 1:
    console.log(
      name
    ); // Output: Rahul

    // Step 2:
    console.log(
      department
    ); // Output: IT

    // Step 3:
    console.log(
      company
    ); // Output: ABC
  }

  // Step 4:
  buildProfile();
}

// Step 5:
createEmployee();
```

Output:

```text
Rahul
IT
ABC
```

Full scope structure:

```text
Global Scope
│
├── company = "ABC"
│
└── createEmployee()
    │
    ├── department = "IT"
    │
    └── buildProfile()
        │
        └── name = "Rahul"
```

When `buildProfile()` looks for:

```text
name
```

JavaScript checks:

```text
buildProfile scope
↓
found
```

When it looks for:

```text
department
```

JavaScript checks:

```text
buildProfile scope
↓ not found
createEmployee scope
↓ found
```

When it looks for:

```text
company
```

JavaScript checks:

```text
buildProfile scope
↓ not found
createEmployee scope
↓ not found
global scope
↓ found
```

That complete lookup path is the:

```text
Scope Chain
```

---

# Quick Memory 🧠🔥🔥🔥

## Scope

```text
Scope
→ where a variable can be accessed
```

## Global Scope

```text
declared in outermost scope
→ broadly accessible
```

## Function Scope

```text
declared inside function
→ available inside that function
```

## Block Scope

```text
declared with let/const inside { }
→ available only inside that block
```

## `var`

```text
var
→ function-scoped
→ not block-scoped
```

## `let` / `const`

```text
let / const
→ block-scoped
```

## Lexical Scope

```text
access depends on
where function is written
```

## Scope Chain

```text
current scope
↓
outer scope
↓
next outer scope
↓
global
```

## Variable Shadowing

```text
same variable name
in inner scope
↓
inner one hides outer one
```

## Most Important Direction

```text
inner scope
→ can look outward

outer scope
→ cannot look inward
```

## Most Important Interview Trap

```text
Caller scope does NOT become
the called function's outer scope.

Lexical location wins.
```

Example:

```js
const value =
  "Global";

function show() {
  console.log(
    value
  );
}

function run() {
  const value =
    "Run";

  show();
}

run();
```

Output:

```text
Global
```

---

# ✅ 7.2 Scope + Lexical Scope + Scope Chain Complete

Completed in Section 7:

```text
7.1 JavaScript Execution Model
    + Execution Context
    + Call Stack

7.2 Scope
    + Global Scope
    + Function Scope
    + Block Scope
    + Lexical Scope
    + Scope Chain
```

Next topic:

```text
7.3 Hoisting 🔥🔥🔥
├── var Hoisting
├── let / const Hoisting
├── Function Declaration Hoisting
├── Function Expression Hoisting
├── Arrow Function Hoisting
└── Output Questions
```

**Next: 7.3 Hoisting 🔥🔥🔥**
