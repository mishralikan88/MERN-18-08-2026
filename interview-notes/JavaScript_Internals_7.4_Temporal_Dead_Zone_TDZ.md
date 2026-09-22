# 7.4 Temporal Dead Zone — TDZ 🔥🔥🔥

TDZ means:

```text
Temporal Dead Zone
```

It is the period where a `let` or `const` binding already exists in the scope, but JavaScript does **not allow you to access it yet**.

Master mental model:

```text
scope starts
↓
let / const binding exists
↓
TDZ starts
↓
declaration executes
↓
binding gets initialized
↓
TDZ ends
↓
normal access allowed
```

This chapter covers:

```text
What TDZ Means
let TDZ
const TDZ
Start of TDZ
End of TDZ
Shadowing + TDZ
typeof + TDZ
Self-Reference Trap
Block TDZ
Function TDZ
Output Questions
Debugging Traps
```

---

# 1. What Is TDZ? 🔥🔥🔥

TDZ is the time between:

```text
entering the scope
```

and:

```text
executing the let/const declaration
```

During that period:

```text
the binding exists
but cannot be accessed
```

Example:

```js
try {
  // Step 1:
  // age exists in this scope,
  // but is still in TDZ.
  console.log(
    age
  );

  // Step 2:
  // TDZ ends when this declaration executes.
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

---

# 2. Why Is It Called "Temporal" Dead Zone?

`Temporal` means:

```text
related to time
```

The variable is not permanently inaccessible.

It is inaccessible only for a period of execution.

Example:

```js
{
  // Step 1:
  // name is in TDZ here.

  let name =
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

So:

```text
before declaration
→ dead zone

after declaration
→ accessible
```

---

# 3. TDZ Does NOT Mean Variable Does Not Exist

This is important.

Wrong mental model:

```text
Before let declaration,
variable does not exist.
```

Better mental model:

```text
binding exists
but is uninitialized
and inaccessible
```

That is why this gives:

```text
ReferenceError
```

instead of falling through to an outer variable in some cases.

We will see that soon.

---

# 4. `let` Is Hoisted + TDZ 🔥🔥🔥

Example:

```js
try {
  // Step 1:
  console.log(
    value
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

Reason:

```text
let value
→ binding created during scope setup
→ TDZ
→ declaration not executed yet
```

---

# 5. `const` Is Hoisted + TDZ 🔥🔥🔥

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

Same idea:

```text
const binding exists
↓
TDZ
↓
declaration executes
↓
normal access
```

---

# 6. `var` Does NOT Have the Same TDZ Behavior 🔥🔥🔥

Compare:

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

Why?

`var` is initialized with:

```text
undefined
```

during creation.

So:

```text
var
→ hoisted + initialized undefined

let / const
→ hoisted + TDZ
```

---

# 7. `var` vs `let` vs `const` Before Declaration 🔥🔥🔥

```js
// Step 1:
console.log(
  a
); // Output: undefined

// Step 2:
var a =
  1;

try {
  // Step 3:
  console.log(
    b
  );

  // Step 4:
  let b =
    2;
} catch (
  error
) {
  // Step 5:
  console.log(
    error.name
  ); // Output: ReferenceError
}

try {
  // Step 6:
  console.log(
    c
  );

  // Step 7:
  const c =
    3;
} catch (
  error
) {
  // Step 8:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
undefined
ReferenceError
ReferenceError
```

---

# 8. When Does TDZ Start? 🔥🔥🔥

TDZ starts when JavaScript enters the relevant scope.

Example:

```js
{
  // Step 1:
  // TDZ for value starts here.

  try {
    console.log(
      value
    );
  } catch (
    error
  ) {
    console.log(
      error.name
    ); // Output: ReferenceError
  }

  // Step 2:
  let value =
    10;
}
```

Output:

```text
ReferenceError
```

---

# 9. When Does TDZ End? 🔥🔥🔥

TDZ ends when the declaration is executed and the binding is initialized.

Example:

```js
{
  // Step 1:
  let value =
    10;

  // Step 2:
  // TDZ is over now.
  console.log(
    value
  ); // Output: 10
}
```

Output:

```text
10
```

---

# 10. `let` Without Initializer

Example:

```js
// Step 1:
let value;

// Step 2:
// Declaration executed,
// so TDZ is already over.
console.log(
  value
); // Output: undefined
```

Output:

```text
undefined
```

Important:

```text
let value;
```

does two things when executed:

```text
declaration executes
↓
binding initialized with undefined
↓
TDZ ends
```

---

# 11. `const` Must Be Initialized

This is different from `let`.

Valid:

```js
// Step 1:
const value =
  10;

// Step 2:
console.log(
  value
); // Output: 10
```

Output:

```text
10
```

Invalid syntax:

```text
const value;
```

A `const` declaration must have an initializer.

---

# 12. TDZ Happens Inside Blocks 🔥🔥🔥

```js
{
  try {
    // Step 1:
    console.log(
      message
    );

    // Step 2:
    let message =
      "Hello";
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

Because `let` is block-scoped.

---

# 13. TDZ Happens Inside Functions

```js
function test() {
  try {
    // Step 1:
    console.log(
      value
    );

    // Step 2:
    let value =
      100;
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
ReferenceError
```

The TDZ exists inside that function scope.

---

# 14. TDZ Happens Even If Outer Variable Has Same Name 🔥🔥🔥

This is one of the most important TDZ traps.

```js
const value =
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

Many people expect:

```text
Outer
```

But JavaScript does NOT use the outer `value`.

Why?

The inner `let value` already exists in this block and shadows the outer variable.

But it is still in TDZ.

---

# 15. Shadowing + TDZ Mental Model 🔥🔥🔥

Code structure:

```text
Outer scope
value = "Outer"

Inner block
let value = "Inner"
```

When JavaScript enters inner block:

```text
inner value binding exists
↓
outer value becomes shadowed
↓
inner value is still in TDZ
↓
access throws ReferenceError
```

This is why JavaScript does not fall back to the outer variable.

---

# 16. Same Trap Inside Function

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

Why?

```text
local let name
→ shadows global name
→ local name still in TDZ
```

---

# 17. Without Local Declaration, Outer Variable Works

Compare:

```js
let name =
  "Global";

function show() {
  // Step 1:
  // No local name declared,
  // so scope chain finds outer name.
  console.log(
    name
  ); // Output: Global
}

// Step 2:
show();
```

Output:

```text
Global
```

Difference:

```text
local declaration exists?
→ yes → use that binding, TDZ may apply

local declaration absent?
→ scope chain looks outward
```

---

# 18. TDZ + Lexical Scope 🔥🔥🔥

TDZ works together with lexical scoping.

Example:

```js
const role =
  "User";

function run() {
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
}

// Step 4:
run();
```

Output:

```text
ReferenceError
```

Lexical structure says:

```text
run() has its own role binding
```

TDZ says:

```text
you cannot access it before declaration
```

---

# 19. `typeof` With Undeclared Variable

This works:

```js
// Step 1:
// Variable does not exist anywhere.
console.log(
  typeof completelyMissing
); // Output: undefined
```

Output:

```text
undefined
```

Notice:

```text
typeof undeclaredVariable
→ "undefined"
```

---

# 20. `typeof` With TDZ Variable 🔥🔥🔥

Different situation:

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

`value` is not undeclared.

It exists in the scope but is still in TDZ.

---

# 21. Undeclared vs TDZ 🔥🔥🔥

Undeclared:

```text
No binding exists.
```

TDZ:

```text
Binding exists
but is not initialized yet.
```

Comparison:

```text
typeof missingVariable
→ "undefined"

typeof tdzVariable
→ ReferenceError
```

---

# 22. Self-Reference During Initialization 🔥🔥🔥

Look at this:

```js
try {
  // Step 1:
  let value =
    value;
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

Why?

During:

```text
let value = value
```

the right-side `value` is read before the new binding has been initialized.

So it is still in TDZ.

---

# 23. Self-Reference With Outer Variable Trap 🔥🔥🔥

```js
let value =
  10;

{
  try {
    // Step 1:
    let value =
      value + 1;
  } catch (
    error
  ) {
    // Step 2:
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

Many people expect:

```text
11
```

But the inner `value` shadows outer `value`.

So right-hand side refers to the inner binding, which is still in TDZ.

---

# 24. Correct Way If You Need Outer Value

Use a different variable name.

```js
let value =
  10;

{
  // Step 1:
  const nextValue =
    value + 1;

  // Step 2:
  console.log(
    nextValue
  ); // Output: 11
}
```

Output:

```text
11
```

---

# 25. TDZ With `if` Block

```js
if (
  true
) {
  try {
    // Step 1:
    console.log(
      count
    );

    // Step 2:
    let count =
      5;
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

The block creates a lexical scope for `let`.

---

# 26. TDZ With `for` Loop — Basic Awareness

```js
try {
  // Step 1:
  for (
    let i =
      i;
    i < 3;
    i++
  ) {
    console.log(
      i
    );
  }
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

Why?

The loop's `i` is referenced while its own binding is still being initialized.

---

# 27. `let` After Declaration Is Normal

```js
// Step 1:
let score =
  50;

// Step 2:
console.log(
  score
); // Output: 50

// Step 3:
score =
  60;

// Step 4:
console.log(
  score
); // Output: 60
```

Output:

```text
50
60
```

TDZ is only before initialization.

After that, normal `let` rules apply.

---

# 28. `const` After Declaration Is Readable

```js
// Step 1:
const tax =
  18;

// Step 2:
console.log(
  tax
); // Output: 18
```

Output:

```text
18
```

TDZ is over after the declaration executes.

---

# 29. TDZ Does Not Mean `const` Cannot Hold Objects

Unrelated concept, but common confusion.

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
// Object contents can change.
user.name =
  "Amit";

// Step 3:
console.log(
  user.name
); // Output: Amit
```

Output:

```text
Amit
```

TDZ is about:

```text
access before initialization
```

not:

```text
object mutability
```

---

# 30. TDZ Does Not Continue Forever

Example:

```js
{
  // Step 1:
  let status =
    "Ready";

  // Step 2:
  console.log(
    status
  ); // Output: Ready

  // Step 3:
  status =
    "Done";

  // Step 4:
  console.log(
    status
  ); // Output: Done
}
```

Output:

```text
Ready
Done
```

Once initialized:

```text
TDZ is finished for that binding
```

---

# 31. TDZ Is Per Binding

Example:

```js
{
  // Step 1:
  let a =
    1;

  // Step 2:
  console.log(
    a
  ); // Output: 1

  try {
    // Step 3:
    console.log(
      b
    );

    // Step 4:
    let b =
      2;
  } catch (
    error
  ) {
    // Step 5:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}
```

Output:

```text
1
ReferenceError
```

`a` is already initialized.

`b` is still in TDZ.

---

# 32. Nested Block TDZ

```js
let value =
  "Outer";

{
  let first =
    "First";

  {
    try {
      // Step 1:
      console.log(
        value
      ); // Output: Outer

      // Step 2:
      console.log(
        first
      ); // Output: First

      // Step 3:
      console.log(
        second
      );

      // Step 4:
      let second =
        "Second";
    } catch (
      error
    ) {
      // Step 5:
      console.log(
        error.name
      ); // Output: ReferenceError
    }
  }
}
```

Output:

```text
Outer
First
ReferenceError
```

---

# 33. TDZ and Scope Chain 🔥🔥🔥

When variable lookup finds a matching lexical binding in TDZ:

```text
lookup STOPS
```

JavaScript does not continue to an outer scope.

Example:

```js
const value =
  "Global";

{
  try {
    // Step 1:
    console.log(
      value
    );

    // Step 2:
    const value =
      "Block";
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

Lookup concept:

```text
inner block has value binding
↓
binding found
↓
but binding is in TDZ
↓
ReferenceError
↓
do NOT continue to global value
```

---

# 34. TDZ and Function Calls

Example:

```js
function run() {
  try {
    // Step 1:
    printValue();

    // Step 2:
    const value =
      "Hello";

    function printValue() {
      // Step 3:
      console.log(
        value
      );
    }
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
run();
```

Output:

```text
ReferenceError
```

Why?

`printValue()` is called before `value` is initialized.

The function can lexically see `value`, but the binding is still in TDZ.

---

# 35. Same Function Call After Initialization

```js
function run() {
  // Step 1:
  const value =
    "Hello";

  function printValue() {
    // Step 2:
    console.log(
      value
    ); // Output: Hello
  }

  // Step 3:
  printValue();
}

// Step 4:
run();
```

Output:

```text
Hello
```

Now TDZ has ended before the function reads `value`.

---

# 36. TDZ Can Expose Real Bugs Earlier 🔥🔥🔥

Example with `var`:

```js
// Step 1:
console.log(
  total
); // Output: undefined

// Step 2:
var total =
  500;
```

The program continues with `undefined`.

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

This fails loudly instead of silently using the wrong value.

---

# 37. Why TDZ Is Useful

TDZ helps prevent:

```text
using variables too early
using partially initialized state
accidental shadowing bugs
silent undefined behavior
```

Mental rule:

```text
declare first
then use
```

---

# 38. TDZ and Function Declarations Are Different

Function declarations are available before their declaration line.

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

There is no equivalent TDZ behavior for ordinary function declarations like there is for `let`/`const`.

---

# 39. TDZ and Function Expressions

Function expression stored in `const`:

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

Why?

Because the variable `greet` is a `const` binding in TDZ.

---

# 40. TDZ and Arrow Functions

```js
try {
  // Step 1:
  add(
    2,
    3
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

Again:

```text
arrow function itself is not the issue
↓
const binding is in TDZ
```

---

# 41. Interview Output 1 — Basic `let`

```js
try {
  // Step 1:
  console.log(
    x
  );

  // Step 2:
  let x =
    10;
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

# 42. Interview Output 2 — Basic `const`

```js
try {
  // Step 1:
  console.log(
    x
  );

  // Step 2:
  const x =
    10;
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

# 43. Interview Output 3 — `let` Without Initializer

```js
// Step 1:
let x;

// Step 2:
console.log(
  x
);
```

Expected output:

```text
undefined
```

Why?

The declaration executed before the read, so TDZ already ended.

---

# 44. Interview Output 4 — Outer Variable + Inner TDZ 🔥🔥🔥

```js
let x =
  10;

{
  try {
    // Step 1:
    console.log(
      x
    );

    // Step 2:
    let x =
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
```

Expected output:

```text
ReferenceError
```

Not:

```text
10
```

---

# 45. Interview Output 5 — `typeof` TDZ Trap 🔥🔥🔥

```js
try {
  // Step 1:
  console.log(
    typeof x
  );

  // Step 2:
  let x =
    10;
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

# 46. Interview Output 6 — `typeof` Undeclared

```js
// Step 1:
console.log(
  typeof notDeclared
);
```

Expected output:

```text
undefined
```

Important contrast:

```text
undeclared
→ typeof returns "undefined"

TDZ binding
→ typeof throws ReferenceError
```

---

# 47. Interview Output 7 — Self-Reference

```js
try {
  // Step 1:
  let x =
    x;
} catch (
  error
) {
  // Step 2:
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

# 48. Interview Output 8 — Function Reads TDZ Variable

```js
function test() {
  function show() {
    // Step 1:
    console.log(
      value
    );
  }

  try {
    // Step 2:
    show();

    // Step 3:
    let value =
      10;
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.name
    );
  }
}

// Step 5:
test();
```

Expected output:

```text
ReferenceError
```

---

# 49. Interview Output 9 — Function Reads After TDZ Ends

```js
function test() {
  function show() {
    // Step 1:
    console.log(
      value
    );
  }

  // Step 2:
  let value =
    10;

  // Step 3:
  show();
}

// Step 4:
test();
```

Expected output:

```text
10
```

---

# 50. Interview Output 10 — `var` Comparison

```js
function test() {
  // Step 1:
  console.log(
    value
  );

  // Step 2:
  var value =
    10;
}

// Step 3:
test();
```

Expected output:

```text
undefined
```

This is NOT TDZ behavior.

---

# 51. Interview Question — What Is TDZ? 🔥🔥🔥

Good answer:

```text
The Temporal Dead Zone is the period
from the start of a lexical scope
until a let or const declaration
is executed and initialized.

During this period,
the binding exists but cannot be accessed.
```

---

# 52. Interview Question — Does TDZ Mean `let` Is Not Hoisted?

Good answer:

```text
No.

let and const are hoisted in the sense
that their bindings are created
when the scope is initialized.

They are simply inaccessible
before initialization because of TDZ.
```

---

# 53. Interview Question — Why Does `typeof` Throw in TDZ?

Good answer:

```text
Because the variable is not undeclared.

A lexical binding already exists,
but it is still uninitialized.

Accessing it, even through typeof,
causes ReferenceError.
```

---

# 54. Interview Question — Why Doesn't JavaScript Use Outer Variable?

Example:

```js
let x =
  10;

{
  console.log(
    x
  );

  let x =
    20;
}
```

Good answer:

```text
The inner let x creates a lexical binding
for the whole block.

That inner binding shadows the outer x.

Before the declaration line,
the inner binding is in TDZ,
so access throws ReferenceError
instead of falling back to the outer variable.
```

---

# 55. Debugging Rule — Declare Before Use 🔥🔥🔥

Avoid:

```js
try {
  // Step 1:
  console.log(
    user
  );

  // Step 2:
  const user = {
    name: "Rahul",
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

Prefer:

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
console.log(
  user
); // Output: { name: "Rahul" }
```

Output:

```text
{ name: "Rahul" }
```

---

# 56. Debugging Rule — Watch for Shadowing

This can be confusing:

```js
const config =
  "Global";

function run() {
  try {
    // Step 1:
    console.log(
      config
    );

    // Step 2:
    const config =
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
run();
```

Output:

```text
ReferenceError
```

Safer naming or declaration order can avoid this confusion.

---

# 57. TDZ Decision Guide 🔥🔥🔥

```text
Using let before declaration?
→ ReferenceError

Using const before declaration?
→ ReferenceError

Using var before declaration?
→ undefined

Using let after declaration?
→ normal

Using const after declaration?
→ normal

Inner let/const shadows outer variable?
→ yes

Read inner binding before declaration?
→ TDZ
→ ReferenceError

typeof undeclared variable?
→ "undefined"

typeof TDZ variable?
→ ReferenceError

Self-reference during let/const initialization?
→ ReferenceError
```

---

# 58. Final Master Trace 🔥🔥🔥

Code:

```js
const value =
  "Global";

function run() {
  try {
    // Step 1:
    console.log(
      value
    );

    // Step 2:
    let value =
      "Local";

    // Step 3:
    console.log(
      value
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
run();
```

Output:

```text
ReferenceError
```

What happens internally?

```text
run() starts
↓
local let value binding exists
↓
local value shadows global value
↓
local value is still in TDZ
↓
console.log(value)
↓
ReferenceError
↓
assignment "Local" is never reached
```

This is the most important TDZ + shadowing pattern.

---

# Quick Memory 🧠🔥🔥🔥

## TDZ

```text
Temporal Dead Zone
=
binding exists
but cannot be accessed yet
```

## `let`

```text
scope starts
↓
TDZ
↓
let declaration executes
↓
initialized
↓
TDZ ends
```

## `const`

```text
scope starts
↓
TDZ
↓
const declaration + initializer execute
↓
TDZ ends
```

## `var`

```text
no same TDZ behavior

var
→ initialized with undefined
```

## Before Declaration

```text
var
→ undefined

let
→ ReferenceError

const
→ ReferenceError
```

## `typeof`

```text
typeof undeclaredVariable
→ "undefined"

typeof TDZVariable
→ ReferenceError
```

## Shadowing Trap

```js
const x =
  10;

{
  try {
    // Step 1:
    console.log(
      x
    );

    // Step 2:
    let x =
      20;
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

Why?

```text
inner x exists
↓
shadows outer x
↓
inner x still in TDZ
```

## Self-Reference Trap

```js
try {
  // Step 1:
  let x =
    x;
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

## Most Important Rule

```text
let / const:
declare first
then use
```

---

# ✅ 7.4 Temporal Dead Zone — TDZ Complete

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

7.4 Temporal Dead Zone — TDZ
    + let TDZ
    + const TDZ
    + Start / End
    + Shadowing
    + typeof
    + Output Questions
```

Next topic:

```text
7.5 Closures 🔥🔥🔥
├── Closure Mental Model
├── Lexical Environment
├── Data Persistence
├── Private State
├── Function Factory
├── Callbacks
├── Event Handlers
├── Timers
├── Loops
└── Practical Closure Problems
```

**Next: 7.5 Closures 🔥🔥🔥**
