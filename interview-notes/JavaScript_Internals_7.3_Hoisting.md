# 7.3 Hoisting 🔥🔥🔥

Hoisting means JavaScript prepares declarations before normal line-by-line execution.

Very important:

```text
Hoisting does NOT mean
JavaScript physically moves your code
to the top of the file.
```

Better mental model:

```text
JavaScript enters a scope
↓
Creation Phase
↓
declarations are prepared
↓
Execution Phase starts
↓
code runs line by line
```

This chapter covers:

```text
var Hoisting
let Hoisting
const Hoisting
Function Declaration Hoisting
Function Expression Hoisting
Arrow Function Hoisting
Output Questions
Debugging Traps
```

---

# 1. What Is Hoisting?

Hoisting is JavaScript's behavior of preparing declarations before execution.

Example:

```js
// Step 1:
// We access age before the declaration line.
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

Why?

Because during the Creation Phase:

```text
var age
→ binding created
→ initialized with undefined
```

Then Execution Phase starts.

---

# 2. Do Not Think "Code Moves Up"

Many explanations say:

```text
JavaScript moves declarations to the top.
```

That is only a teaching shortcut.

Actual mental model:

```text
Code stays where it is.

JavaScript prepares bindings
before execution begins.
```

So this:

```js
console.log(
  age
);

var age =
  30;
```

should NOT literally be imagined as JavaScript rewriting your source file.

---

# 3. Creation Phase vs Execution Phase 🔥🔥🔥

Example:

```js
var name =
  "Rahul";

console.log(
  name
);
```

Creation Phase:

```text
name
→ created
→ initialized with undefined
```

Execution Phase:

```text
name = "Rahul"
↓
console.log(name)
↓
Rahul
```

---

# 4. `var` Hoisting 🔥🔥🔥

`var` declarations are hoisted and initialized with `undefined`.

Example:

```js
// Step 1:
// Binding already exists.
console.log(
  value
); // Output: undefined

// Step 2:
// Assignment happens here.
var value =
  10;

// Step 3:
console.log(
  value
); // Output: 10
```

Output:

```text
undefined
10
```

---

# 5. `var` Declaration vs Assignment 🔥🔥🔥

This is very important.

Code:

```js
var age =
  30;
```

Conceptually has two parts:

```text
Declaration:
var age

Assignment:
age = 30
```

Hoisting prepares the declaration.

The assignment still happens at its original line.

---

# 6. Trace `var` Hoisting Step by Step

Code:

```js
// Step 1:
console.log(
  age
);

// Step 2:
var age =
  30;

// Step 3:
console.log(
  age
);
```

Creation Phase:

```text
age = undefined
```

Execution Phase:

```text
console.log(age)
→ undefined

age = 30

console.log(age)
→ 30
```

Output:

```text
undefined
30
```

---

# 7. `var` Without Initialization

```js
// Step 1:
console.log(
  score
); // Output: undefined

// Step 2:
var score;

// Step 3:
console.log(
  score
); // Output: undefined
```

Output:

```text
undefined
undefined
```

Why?

There was never an assignment.

---

# 8. Multiple `var` Declarations

```js
// Step 1:
var count =
  1;

// Step 2:
var count =
  2;

// Step 3:
console.log(
  count
); // Output: 2
```

Output:

```text
2
```

`var` allows redeclaration in the same scope.

---

# 9. `var` Inside Function Is Hoisted to Function Scope 🔥🔥🔥

```js
function test() {
  // Step 1:
  console.log(
    value
  ); // Output: undefined

  // Step 2:
  var value =
    100;

  // Step 3:
  console.log(
    value
  ); // Output: 100
}

// Step 4:
test();
```

Output:

```text
undefined
100
```

The `var` belongs to `test()` function scope.

---

# 10. `var` Does Not Hoist Outside Its Function

```js
function test() {
  // Step 1:
  var value =
    100;

  // Step 2:
  console.log(
    value
  ); // Output: 100
}

// Step 3:
test();

try {
  // Step 4:
  console.log(
    value
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
100
ReferenceError
```

Hoisting happens within the variable's scope.

---

# 11. `let` Is Also Hoisted 🔥🔥🔥

This is a common interview trap.

Wrong statement:

```text
let is not hoisted.
```

Better statement:

```text
let is hoisted,
but it is not initialized for normal access
before the declaration line.
```

That period is called the:

```text
Temporal Dead Zone
```

We cover TDZ deeply next.

---

# 12. Accessing `let` Before Declaration

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

Important:

```text
var
→ undefined before declaration line

let
→ ReferenceError before declaration line
```

---

# 13. `const` Is Also Hoisted 🔥🔥🔥

Like `let`, `const` is hoisted but unavailable before its declaration line.

```js
try {
  // Step 1:
  console.log(
    role
  );

  // Step 2:
  const role =
    "Admin";
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

---

# 14. `let` and `const` Are in TDZ Before Declaration 🔥🔥🔥

Mental model:

```text
scope starts
↓
let/const binding exists
↓
but cannot be accessed yet
↓
declaration line reached
↓
TDZ ends
↓
normal access allowed
```

Example:

```js
{
  // Step 1:
  // TDZ for name starts at block start.

  const name =
    "Rahul";

  // Step 2:
  // TDZ has ended.
  console.log(
    name
  ); // Output: Rahul
}
```

Output:

```text
Rahul
```

---

# 15. `var` vs `let` Before Declaration 🔥🔥🔥

```js
// Step 1:
console.log(
  a
); // Output: undefined

// Step 2:
var a =
  10;

try {
  // Step 3:
  console.log(
    b
  );

  // Step 4:
  let b =
    20;
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
undefined
ReferenceError
```

---

# 16. Why `let`/`const` Behavior Is Safer

With `var`:

```js
// Step 1:
console.log(
  total
); // Output: undefined

// Step 2:
var total =
  500;
```

This can silently continue with `undefined`.

With `let`:

```js
try {
  // Step 1:
  console.log(
    total
  );

  // Step 2:
  let total =
    500;
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

That makes accidental early access easier to detect.

---

# 17. Function Declaration Hoisting 🔥🔥🔥

Function declarations are strongly hoisted.

Example:

```js
// Step 1:
// Function can be called
// before its declaration line.
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

Why?

Creation Phase prepares the function declaration itself.

---

# 18. Function Declaration Is Available During Creation Phase

Conceptual Creation Phase:

```text
greet
→ function object/reference available
```

Execution Phase:

```text
greet()
→ works immediately
```

So unlike `var`:

```text
var
→ initialized as undefined
```

function declaration:

```text
function declaration
→ function itself is available
```

---

# 19. Function Declaration Before and After Declaration Line

```js
// Step 1:
console.log(
  greet()
); // Output: Hello

// Step 2:
function greet() {
  return "Hello";
}

// Step 3:
console.log(
  greet()
); // Output: Hello
```

Output:

```text
Hello
Hello
```

---

# 20. Function Declaration Inside Function Scope

```js
function outer() {
  // Step 1:
  console.log(
    inner()
  ); // Output: Inner

  // Step 2:
  function inner() {
    return "Inner";
  }
}

// Step 3:
outer();
```

Output:

```text
Inner
```

The declaration is prepared inside `outer()`'s scope.

---

# 21. Function Expression Is Different 🔥🔥🔥

Function expression:

```js
const greet =
  function () {
    return "Hello";
  };
```

Important:

```text
The function itself is assigned to a variable.
```

So hoisting behavior depends on the variable declaration:

```text
var?
let?
const?
```

---

# 22. Function Expression With `var` 🔥🔥🔥

```js
try {
  // Step 1:
  greet();
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: TypeError
}

// Step 3:
var greet =
  function () {
    return "Hello";
  };
```

Output:

```text
TypeError
```

Why not `ReferenceError`?

Because:

```text
var greet
→ hoisted
→ initialized with undefined
```

So at Step 1:

```text
greet === undefined
```

Then JavaScript tries:

```text
undefined()
```

That causes:

```text
TypeError
```

---

# 23. Trace Function Expression With `var`

Code:

```js
greet();

var greet =
  function () {
    return "Hello";
  };
```

Creation Phase:

```text
greet = undefined
```

Execution Phase:

```text
greet()
↓
undefined()
↓
TypeError
```

Later:

```text
greet = function...
```

But execution already failed before reaching that assignment unless handled.

---

# 24. Function Expression With `let`

```js
try {
  // Step 1:
  greet();

  // Step 2:
  let greet =
    function () {
      return "Hello";
    };
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

Why?

`greet` is in TDZ before the declaration line.

---

# 25. Function Expression With `const`

```js
try {
  // Step 1:
  greet();

  // Step 2:
  const greet =
    function () {
      return "Hello";
    };
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

---

# 26. Arrow Function Hoisting 🔥🔥🔥

Arrow functions behave like function expressions because the arrow function is assigned to a variable.

Example:

```js
const add =
  (
    a,
    b
  ) =>
    a + b;
```

Hoisting depends on:

```text
const add
```

not on the fact that it is an arrow function.

---

# 27. Arrow Function With `const`

```js
try {
  // Step 1:
  console.log(
    add(
      2,
      3
    )
  );

  // Step 2:
  const add =
    (
      a,
      b
    ) =>
      a + b;
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

---

# 28. Arrow Function With `let`

```js
try {
  // Step 1:
  multiply(
    2,
    3
  );

  // Step 2:
  let multiply =
    (
      a,
      b
    ) =>
      a * b;
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

---

# 29. Arrow Function With `var`

```js
try {
  // Step 1:
  multiply(
    2,
    3
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: TypeError
}

// Step 3:
var multiply =
  (
    a,
    b
  ) =>
    a * b;
```

Output:

```text
TypeError
```

Why?

```text
multiply
→ undefined

undefined(...)
→ TypeError
```

---

# 30. Function Declaration vs Function Expression vs Arrow 🔥🔥🔥

Function Declaration:

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

Works.

Function Expression with `const`:

```js
try {
  // Step 1:
  greet();

  // Step 2:
  const greet =
    function () {
      return "Hello";
    };
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Fails.

Arrow with `const`:

```js
try {
  // Step 1:
  greet();

  // Step 2:
  const greet =
    () =>
      "Hello";
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Fails.

---

# 31. Hoisting Summary Table 🔥🔥🔥

```text
Declaration Type          Before Declaration Line

var                       undefined

let                       ReferenceError (TDZ)

const                     ReferenceError (TDZ)

function declaration      callable

var function expression   TypeError when called
                          because value is undefined

let function expression   ReferenceError

const function expression ReferenceError

var arrow function        TypeError when called

let arrow function        ReferenceError

const arrow function      ReferenceError
```

---

# 32. `typeof` With Undeclared Variable

Interesting JavaScript behavior:

```js
// Step 1:
// Variable was never declared.
console.log(
  typeof missingVariable
); // Output: undefined
```

Output:

```text
undefined
```

Notice:

```text
typeof undeclaredVariable
→ does not throw
→ returns "undefined"
```

---

# 33. `typeof` With TDZ Variable 🔥🔥🔥

Different case:

```js
try {
  // Step 1:
  console.log(
    typeof value
  );

  // Step 2:
  let value =
    10;
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

Why?

Because `value` is declared in the scope but currently in TDZ.

---

# 34. Undeclared vs Hoisted `var`

Undeclared:

```js
try {
  // Step 1:
  console.log(
    missing
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
ReferenceError
```

Hoisted `var`:

```js
// Step 1:
console.log(
  value
); // Output: undefined

// Step 2:
var value =
  10;
```

Output:

```text
undefined
```

Different situations.

---

# 35. Hoisting Happens Per Scope 🔥🔥🔥

```js
var value =
  "Global";

function test() {
  // Step 1:
  console.log(
    value
  ); // Output: undefined

  // Step 2:
  var value =
    "Local";

  // Step 3:
  console.log(
    value
  ); // Output: Local
}

// Step 4:
test();
```

Output:

```text
undefined
Local
```

Many people expect first output:

```text
Global
```

But it is:

```text
undefined
```

Why?

Because local `var value` is hoisted inside `test()` and shadows the global variable.

---

# 36. Important Shadowing + Hoisting Trap 🔥🔥🔥

Code:

```js
var name =
  "Global";

function show() {
  // Step 1:
  console.log(
    name
  );

  // Step 2:
  var name =
    "Local";

  // Step 3:
  console.log(
    name
  );
}

// Step 4:
show();
```

Output:

```text
undefined
Local
```

Creation Phase of `show()`:

```text
name = undefined
```

That local `name` shadows global `name` from the start of the function scope.

---

# 37. Same Trap With `let`

```js
let name =
  "Global";

function show() {
  try {
    // Step 1:
    console.log(
      name
    );

    // Step 2:
    let name =
      "Local";
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
show();
```

Output:

```text
ReferenceError
```

Why not `"Global"`?

Because local `let name` exists lexically inside `show()` and is in TDZ before its declaration line.

It shadows the outer `name`.

---

# 38. Block Hoisting With `let`

```js
let value =
  "Outer";

{
  try {
    // Step 1:
    console.log(
      value
    );

    // Step 2:
    let value =
      "Inner";
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

Again:

```text
inner let binding exists
↓
TDZ
↓
outer value is shadowed
```

---

# 39. Function Declaration and `var` With Same Name — Awareness

Example:

```js
// Step 1:
console.log(
  typeof greet
); // Output: function

// Step 2:
var greet;

// Step 3:
function greet() {
  return "Hello";
}
```

Output:

```text
function
```

High-level reason:

During creation, the function declaration provides the function value.

A plain `var greet;` does not replace it with `undefined`.

---

# 40. Assignment Can Replace Hoisted Function Later

```js
// Step 1:
console.log(
  greet()
); // Output: Hello

// Step 2:
function greet() {
  return "Hello";
}

// Step 3:
greet =
  function () {
    return "Changed";
  };

// Step 4:
console.log(
  greet()
); // Output: Changed
```

Output:

```text
Hello
Changed
```

Hoisting affects initial preparation.

Normal assignments still happen during execution.

---

# 41. Function Declaration Order — Awareness

```js
// Step 1:
console.log(
  greet()
); // Output: Second

// Step 2:
function greet() {
  return "First";
}

// Step 3:
function greet() {
  return "Second";
}
```

Output:

```text
Second
```

In non-module normal function-declaration scenarios, later declaration with the same name can replace the earlier one during declaration instantiation.

Practical rule:

```text
Do not intentionally duplicate function names.
```

---

# 42. Interview Output 1 — `var`

```js
// Step 1:
console.log(
  a
);

// Step 2:
var a =
  5;

// Step 3:
console.log(
  a
);
```

Expected output:

```text
undefined
5
```

---

# 43. Interview Output 2 — `let`

```js
try {
  // Step 1:
  console.log(
    a
  );

  // Step 2:
  let a =
    5;
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  );
}
```

Expected output:

```text
ReferenceError
```

---

# 44. Interview Output 3 — Function Declaration

```js
// Step 1:
console.log(
  add(
    2,
    3
  )
);

// Step 2:
function add(
  a,
  b
) {
  return (
    a + b
  );
}
```

Expected output:

```text
5
```

---

# 45. Interview Output 4 — `var` Function Expression 🔥🔥🔥

```js
try {
  // Step 1:
  greet();
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  );
}

// Step 3:
var greet =
  function () {
    return "Hello";
  };
```

Expected output:

```text
TypeError
```

Reason:

```text
greet = undefined
↓
undefined()
↓
TypeError
```

---

# 46. Interview Output 5 — `const` Arrow Function

```js
try {
  // Step 1:
  greet();

  // Step 2:
  const greet =
    () =>
      "Hello";
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  );
}
```

Expected output:

```text
ReferenceError
```

---

# 47. Interview Output 6 — Local `var` Shadows Global 🔥🔥🔥

```js
var value =
  10;

function test() {
  // Step 1:
  console.log(
    value
  );

  // Step 2:
  var value =
    20;
}

// Step 3:
test();
```

Expected output:

```text
undefined
```

Why?

```text
local var value
is hoisted inside test()

so local value shadows global value
```

---

# 48. Interview Output 7 — Local `let` Shadows Global

```js
let value =
  10;

function test() {
  try {
    // Step 1:
    console.log(
      value
    );

    // Step 2:
    let value =
      20;
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.name
    );
  }
}

// Step 4:
test();
```

Expected output:

```text
ReferenceError
```

---

# 49. Interview Output 8 — Assignment Before `var` Declaration

```js
// Step 1:
value =
  20;

// Step 2:
console.log(
  value
); // Output: 20

// Step 3:
var value;
```

Output:

```text
20
```

Why?

`var value` was already prepared during creation.

Then execution assigns:

```text
value = 20
```

---

# 50. Interview Question — Is `let` Hoisted? 🔥🔥🔥

Good answer:

```text
Yes.

let declarations are hoisted in the sense
that their bindings are created when the scope
is initialized.

But they remain inaccessible before the
declaration line because they are in the
Temporal Dead Zone.
```

Do NOT answer simply:

```text
let is not hoisted
```

That is incomplete.

---

# 51. Interview Question — Is `const` Hoisted?

Good answer:

```text
Yes.

Like let, const bindings are created
before execution but remain in the TDZ
until the declaration is evaluated.
```

---

# 52. Interview Question — Why Is `var` `undefined` Before Declaration?

Good answer:

```text
During the Creation Phase,
var bindings are created and initialized
with undefined.

The actual assignment happens later
during the Execution Phase.
```

---

# 53. Interview Question — Why Can Function Declarations Be Called Early?

Good answer:

```text
Function declarations are initialized
with their function value during
declaration instantiation / creation phase.

So the function is available
before the declaration line executes.
```

---

# 54. Interview Question — Why Does `var` Function Expression Give `TypeError`?

Example:

```js
try {
  // Step 1:
  greet();
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: TypeError
}

var greet =
  function () {};
```

Reason:

```text
var greet
→ hoisted
→ initialized to undefined

greet()
→ undefined()
→ TypeError
```

---

# 55. Debugging — Do Not Rely on Hoisting 🔥🔥🔥

This works:

```js
// Step 1:
run();

// Step 2:
function run() {
  console.log(
    "Running"
  );
}
```

But in production code, clearer order is often:

```js
// Step 1:
function run() {
  console.log(
    "Running"
  );
}

// Step 2:
run();
```

Why?

```text
easier to read
easier to maintain
less mental overhead
```

---

# 56. Debugging — Prefer `let`/`const` Over `var`

`var` can create confusing behavior:

```js
function test() {
  // Step 1:
  console.log(
    value
  ); // Output: undefined

  // Step 2:
  var value =
    10;
}
```

With `let`/`const`, early access fails immediately instead of silently returning `undefined`.

Practical rule:

```text
Prefer const by default.
Use let when reassignment is needed.
Avoid var in modern application code.
```

---

# 57. Hoisting Decision Guide 🔥🔥🔥

```text
See var?
→ binding exists before declaration
→ value is undefined until assignment

See let?
→ binding exists
→ TDZ before declaration
→ early access = ReferenceError

See const?
→ same TDZ behavior
→ early access = ReferenceError

See function declaration?
→ callable before declaration line

See function expression?
→ behavior depends on variable declaration

See arrow function?
→ behavior depends on variable declaration
```

---

# 58. Final Master Trace 🔥🔥🔥

Code:

```js
// Step 1:
console.log(
  a
); // Output: undefined

// Step 2:
console.log(
  greet()
); // Output: Hello

// Step 3:
var a =
  10;

// Step 4:
function greet() {
  return "Hello";
}

try {
  // Step 5:
  console.log(
    b
  );

  // Step 6:
  let b =
    20;
} catch (
  error
) {
  // Step 7:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
undefined
Hello
ReferenceError
```

Creation Phase mental model:

```text
a
→ undefined

greet
→ function available

b
→ binding created
→ TDZ
```

Execution Phase:

```text
console.log(a)
→ undefined

greet()
→ Hello

a = 10

try to access b
→ TDZ
→ ReferenceError
```

---

# Quick Memory 🧠🔥🔥🔥

## Hoisting

```text
Declarations are prepared
before normal execution.
```

## Do Not Say

```text
JavaScript literally moves code
to the top.
```

Better:

```text
Creation Phase prepares bindings.
```

## `var`

```text
hoisted
+
initialized with undefined
```

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

## `let`

```text
hoisted
+
TDZ
+
ReferenceError before declaration
```

## `const`

```text
hoisted
+
TDZ
+
ReferenceError before declaration
```

## Function Declaration

```text
function value available early
```

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

## `var` Function Expression

```text
variable = undefined initially
↓
calling it
↓
TypeError
```

## `let` / `const` Function Expression

```text
TDZ
↓
ReferenceError
```

## Arrow Function

```text
same variable-hoisting rules
as its declaration keyword
```

## Most Important Interview Table

```text
var
→ undefined

let
→ ReferenceError

const
→ ReferenceError

function declaration
→ works

var function expression
→ TypeError when called early

const/let function expression
→ ReferenceError

const/let arrow
→ ReferenceError
```

---

# ✅ 7.3 Hoisting Complete

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

7.3 Hoisting
    + var
    + let
    + const
    + Function Declaration
    + Function Expression
    + Arrow Function
    + Output Questions
```

Next topic:

```text
7.4 Temporal Dead Zone — TDZ 🔥🔥🔥
├── What TDZ Means
├── let TDZ
├── const TDZ
├── Start / End of TDZ
├── Shadowing + TDZ
├── typeof + TDZ
└── Output Questions
```

**Next: 7.4 Temporal Dead Zone — TDZ 🔥🔥🔥**
