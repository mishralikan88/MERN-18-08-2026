# 7.8 call() / apply() / bind() 🔥🔥🔥

These three methods are used to control `this` explicitly for regular functions.

Master mental model:

```text
call()
→ call NOW
→ arguments separately

apply()
→ call NOW
→ arguments in array / array-like list

bind()
→ do NOT call now
→ return a NEW function
→ this is fixed
```

This chapter covers:

```text
Explicit this Binding
call()
apply()
bind()
Differences
Function Borrowing
Lost this Fix
Partial Application Awareness
Practical Examples
Output Questions
Debugging Traps
```

---

# 1. Why Do We Need `call()`, `apply()`, and `bind()`?

Suppose we have:

```js
function showName() {
  // Step 1:
  return this.name;
}

const user = {
  name: "Rahul",
};
```

If we call:

```js
// Step 2:
console.log(
  showName.call(
    user
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

`call()` explicitly tells JavaScript:

```text
Inside showName()
this = user
```

---

# 2. Explicit `this` Binding 🔥🔥🔥

Normally:

```text
object.method()
→ this from call site
```

With explicit binding:

```text
function.call(object)
function.apply(object)
function.bind(object)
```

we manually choose the `this` value.

---

# 3. `call()` Basic Syntax

Syntax:

```js
functionName.call(
  thisArg,
  arg1,
  arg2,
  arg3
);
```

Meaning:

```text
thisArg
→ what this should be

arg1, arg2...
→ normal function arguments
```

---

# 4. `call()` Basic Example 🔥🔥🔥

```js
function greet() {
  // Step 1:
  return (
    `Hello ${this.name}`
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const result =
  greet.call(
    user
  );

// Step 3:
console.log(
  result
); // Output: Hello Rahul
```

Output:

```text
Hello Rahul
```

---

# 5. `call()` With Arguments

```js
function introduce(
  city,
  role
) {
  // Step 1:
  return (
    `${this.name} - ${city} - ${role}`
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const result =
  introduce.call(
    user,
    "Bangalore",
    "Developer"
  );

// Step 3:
console.log(
  result
);
// Output:
// Rahul - Bangalore - Developer
```

Output:

```text
Rahul - Bangalore - Developer
```

---

# 6. What Exactly Happens With `call()`?

Example:

```js
show.call(
  user,
  10,
  20
);
```

Mental model:

```text
call function immediately
↓
inside function:
this = user

arguments:
10
20
```

---

# 7. `apply()` Basic Syntax

Syntax:

```js
functionName.apply(
  thisArg,
  [
    arg1,
    arg2,
    arg3,
  ]
);
```

Main difference from `call()`:

```text
call
→ arguments separately

apply
→ arguments grouped in array / array-like value
```

---

# 8. `apply()` Basic Example 🔥🔥🔥

```js
function introduce(
  city,
  role
) {
  // Step 1:
  return (
    `${this.name} - ${city} - ${role}`
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const result =
  introduce.apply(
    user,
    [
      "Bangalore",
      "Developer",
    ]
  );

// Step 3:
console.log(
  result
);
// Output:
// Rahul - Bangalore - Developer
```

Output:

```text
Rahul - Bangalore - Developer
```

---

# 9. `call()` vs `apply()` 🔥🔥🔥

These both:

```text
call the function immediately
```

Difference:

```text
call:
fn.call(obj, a, b, c)

apply:
fn.apply(obj, [a, b, c])
```

Memory:

```text
C → Call → Comma-separated arguments

A → Apply → Array arguments
```

---

# 10. `bind()` Basic Syntax

Syntax:

```js
const newFunction =
  functionName.bind(
    thisArg
  );
```

Important:

```text
bind() does NOT execute the original function immediately.
```

It returns a new function.

---

# 11. `bind()` Basic Example 🔥🔥🔥

```js
function showName() {
  // Step 1:
  return this.name;
}

const user = {
  name: "Rahul",
};

// Step 2:
const boundShowName =
  showName.bind(
    user
  );

// Step 3:
console.log(
  boundShowName()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 12. `bind()` Mental Model 🔥🔥🔥

```text
original function
↓
bind object
↓
returns new function
↓
new function remembers fixed this
↓
call later
```

Example:

```text
showName
↓ bind(user)
boundShowName
↓ later
boundShowName()
↓
this = user
```

---

# 13. `bind()` With Arguments

```js
function introduce(
  city,
  role
) {
  // Step 1:
  return (
    `${this.name} - ${city} - ${role}`
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const boundIntroduce =
  introduce.bind(
    user,
    "Bangalore"
  );

// Step 3:
console.log(
  boundIntroduce(
    "Developer"
  )
);
// Output:
// Rahul - Bangalore - Developer
```

Output:

```text
Rahul - Bangalore - Developer
```

Here:

```text
"Bangalore"
```

was pre-filled during `bind()`.

---

# 14. Partial Application Awareness 🔥🔥

`bind()` can pre-fill arguments.

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
const double =
  multiply.bind(
    null,
    2
  );

// Step 3:
console.log(
  double(
    5
  )
); // Output: 10
```

Output:

```text
10
```

We fixed:

```text
a = 2
```

Later:

```text
b = 5
```

---

# 15. Why `null` in `bind(null, 2)`?

In this example:

```js
function multiply(
  a,
  b
) {
  return a * b;
}
```

the function does not use `this`.

So we do not care about `thisArg`.

We can write:

```js
multiply.bind(
  null,
  2
);
```

---

# 16. `call()` Executes Immediately 🔥🔥🔥

```js
function show() {
  // Step 1:
  console.log(
    this.name
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
show.call(
  user
); // Output: Rahul
```

Output:

```text
Rahul
```

No new function stored.

It runs immediately.

---

# 17. `apply()` Executes Immediately 🔥🔥🔥

```js
function show(
  city
) {
  // Step 1:
  console.log(
    this.name,
    city
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
show.apply(
  user,
  [
    "Bangalore",
  ]
);
// Output:
// Rahul Bangalore
```

Output:

```text
Rahul Bangalore
```

---

# 18. `bind()` Does NOT Execute Immediately 🔥🔥🔥

```js
function show() {
  // Step 1:
  console.log(
    this.name
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const bound =
  show.bind(
    user
  );

// Step 3:
// Nothing printed yet.

// Step 4:
bound(); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 19. Main Difference Table 🔥🔥🔥

```text
Method   Calls Now?   How Arguments Are Passed

call     Yes          Separately

apply    Yes          Array / array-like

bind     No           Returns new function
```

And:

```text
all three can explicitly control this
for regular functions
```

---

# 20. Function Borrowing 🔥🔥🔥

One object can borrow another object's method.

```js
const firstUser = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

const secondUser = {
  name: "Amit",
};

// Step 1:
const result =
  firstUser.showName.call(
    secondUser
  );

// Step 2:
console.log(
  result
); // Output: Amit
```

Output:

```text
Amit
```

The method belongs to `firstUser`, but we temporarily use:

```text
this = secondUser
```

---

# 21. Function Borrowing With Arguments

```js
const employee = {
  getInfo(
    city
  ) {
    return (
      `${this.name} - ${city}`
    );
  },
};

const manager = {
  name: "Amit",
};

// Step 1:
console.log(
  employee.getInfo.call(
    manager,
    "Hyderabad"
  )
);
// Output:
// Amit - Hyderabad
```

Output:

```text
Amit - Hyderabad
```

---

# 22. Reusable Function Without Putting It on Every Object

```js
function getFullName() {
  // Step 1:
  return (
    `${this.firstName} ${this.lastName}`
  );
}

const first = {
  firstName: "Rahul",
  lastName: "Mishra",
};

const second = {
  firstName: "Amit",
  lastName: "Kumar",
};

// Step 2:
console.log(
  getFullName.call(
    first
  )
); // Output: Rahul Mishra

// Step 3:
console.log(
  getFullName.call(
    second
  )
); // Output: Amit Kumar
```

Output:

```text
Rahul Mishra
Amit Kumar
```

---

# 23. Lost `this` Problem 🔥🔥🔥

```js
const user = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

// Step 1:
const fn =
  user.showName;

try {
  // Step 2:
  console.log(
    fn()
  );
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  );
}
```

Depending on strict context, `this` is no longer `user`.

This is lost `this`.

---

# 24. Fix Lost `this` With `bind()` 🔥🔥🔥

```js
const user = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

// Step 1:
const fn =
  user.showName.bind(
    user
  );

// Step 2:
console.log(
  fn()
); // Output: Rahul
```

Output:

```text
Rahul
```

This is one of the most common real uses of `bind()`.

---

# 25. Passing Method as Callback Can Lose `this`

```js
const user = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

function execute(
  fn
) {
  // Step 1:
  return fn();
}

try {
  // Step 2:
  console.log(
    execute(
      user.showName
    )
  );
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  );
}
```

Call becomes:

```text
fn()
```

not:

```text
user.showName()
```

So object context is lost.

---

# 26. Fix Callback With `bind()`

```js
const user = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

function execute(
  fn
) {
  // Step 1:
  return fn();
}

// Step 2:
const bound =
  user.showName.bind(
    user
  );

// Step 3:
console.log(
  execute(
    bound
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 27. `call()` for One-Time Invocation

Use `call()` when:

```text
I want to call this function now
with this specific this
```

Example:

```js
function show() {
  return this.name;
}

const user = {
  name: "Rahul",
};

// Step 1:
console.log(
  show.call(
    user
  )
); // Output: Rahul
```

---

# 28. `apply()` for Existing Argument Array

Use `apply()` when you already have arguments grouped.

```js
function sum(
  a,
  b,
  c
) {
  // Step 1:
  return (
    a + b + c
  );
}

const numbers = [
  10,
  20,
  30,
];

// Step 2:
console.log(
  sum.apply(
    null,
    numbers
  )
); // Output: 60
```

Output:

```text
60
```

---

# 29. Modern Alternative to `apply()` for Arguments 🔥🔥

With spread syntax:

```js
function sum(
  a,
  b,
  c
) {
  return (
    a + b + c
  );
}

const numbers = [
  10,
  20,
  30,
];

// Step 1:
console.log(
  sum(
    ...numbers
  )
); // Output: 60
```

Output:

```text
60
```

So `apply()` is less necessary just for array argument spreading in modern JavaScript.

But it is still important for interviews and explicit `this` binding.

---

# 30. `Math.max.apply()` — Classic Example

Older style:

```js
const numbers = [
  10,
  50,
  20,
];

// Step 1:
const max =
  Math.max.apply(
    null,
    numbers
  );

// Step 2:
console.log(
  max
); // Output: 50
```

Output:

```text
50
```

Modern version:

```js
// Step 1:
console.log(
  Math.max(
    ...numbers
  )
); // Output: 50
```

---

# 31. `bind()` Can Be Reused Many Times 🔥🔥🔥

```js
function greet(
  greeting
) {
  // Step 1:
  return (
    `${greeting} ${this.name}`
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const greetRahul =
  greet.bind(
    user
  );

// Step 3:
console.log(
  greetRahul(
    "Hello"
  )
); // Output: Hello Rahul

// Step 4:
console.log(
  greetRahul(
    "Hi"
  )
); // Output: Hi Rahul
```

Output:

```text
Hello Rahul
Hi Rahul
```

---

# 32. Bound Function Keeps Fixed `this` 🔥🔥🔥

```js
function show() {
  return this.name;
}

const first = {
  name: "Rahul",
};

const second = {
  name: "Amit",
};

// Step 1:
const bound =
  show.bind(
    first
  );

// Step 2:
console.log(
  bound()
); // Output: Rahul

// Step 3:
console.log(
  bound.call(
    second
  )
); // Output: Rahul
```

Output:

```text
Rahul
Rahul
```

Important:

Once a normal function is bound with `bind()`, later `call()` does not replace that bound `this`.

---

# 33. Can We Re-Bind a Bound Function? 🔥🔥

```js
function show() {
  return this.name;
}

const first = {
  name: "Rahul",
};

const second = {
  name: "Amit",
};

// Step 1:
const firstBound =
  show.bind(
    first
  );

// Step 2:
const secondBound =
  firstBound.bind(
    second
  );

// Step 3:
console.log(
  secondBound()
); // Output: Rahul
```

Output:

```text
Rahul
```

The original bound `this` remains.

---

# 34. Arrow Functions and `call()` 🔥🔥🔥

Arrow functions do not have their own `this`.

So:

```js
const arrow =
  () =>
    this;

// Step 1:
const result =
  arrow.call(
    {
      name: "Rahul",
    }
  );

// Step 2:
// result still uses lexical this,
// not the object passed to call().
```

Important:

```text
call()
cannot override arrow function this
```

---

# 35. Arrow Functions and `apply()`

Same rule:

```text
apply()
cannot replace lexical this
of an arrow function
```

---

# 36. Arrow Functions and `bind()`

Same again:

```text
bind()
cannot create a new this binding
for an arrow function
```

The arrow keeps lexical `this`.

---

# 37. `call()` With Primitive `thisArg` — Awareness

Example:

```js
function showType() {
  // Step 1:
  return typeof this;
}

// Step 2:
console.log(
  showType.call(
    5
  )
);
```

The exact behavior can differ with strict vs non-strict mode because primitives may be boxed in non-strict functions.

Interview rule:

```text
Do not over-focus on primitive thisArg edge cases.
Focus on objects and strict-mode reasoning.
```

---

# 38. Strict Mode `call(null)` — Awareness

In strict functions:

```js
function showThis() {
  "use strict";

  // Step 1:
  return this;
}

// Step 2:
console.log(
  showThis.call(
    null
  )
); // Output: null
```

Output:

```text
null
```

Strict mode preserves the explicit `thisArg`.

---

# 39. `bind()` Returns a New Function 🔥🔥🔥

```js
function show() {
  return this.name;
}

const user = {
  name: "Rahul",
};

// Step 1:
const bound =
  show.bind(
    user
  );

// Step 2:
console.log(
  bound === show
); // Output: false
```

Output:

```text
false
```

Because `bind()` creates a new function object.

---

# 40. Original Function Is Unchanged

```js
function show() {
  return this?.name;
}

const user = {
  name: "Rahul",
};

// Step 1:
const bound =
  show.bind(
    user
  );

// Step 2:
console.log(
  bound()
); // Output: Rahul

// Step 3:
console.log(
  show()
);
// Output depends on standalone call context,
// not automatically Rahul.
```

`bind()` does not modify the original function.

---

# 41. `bind()` for Event Handler — Concept 🔥🔥

Classic browser pattern:

```js
const controller = {
  name: "EmployeeController",

  handleClick() {
    console.log(
      this.name
    );
  },
};

// Step 1:
const handler =
  controller.handleClick.bind(
    controller
  );

// Step 2:
// button.addEventListener(
//   "click",
//   handler
// );
```

The bound handler remembers:

```text
this = controller
```

---

# 42. `bind()` for Class Method Callback — Awareness

```js
class Employee {
  constructor(
    name
  ) {
    // Step 1:
    this.name =
      name;

    // Step 2:
    this.showName =
      this.showName.bind(
        this
      );
  }

  showName() {
    return this.name;
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
const fn =
  employee.showName;

// Step 5:
console.log(
  fn()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 43. Method Borrowing With `apply()`

```js
function describe(
  city,
  role
) {
  // Step 1:
  return (
    `${this.name} - ${city} - ${role}`
  );
}

const user = {
  name: "Rahul",
};

const args = [
  "Bangalore",
  "Developer",
];

// Step 2:
console.log(
  describe.apply(
    user,
    args
  )
);
// Output:
// Rahul - Bangalore - Developer
```

Output:

```text
Rahul - Bangalore - Developer
```

---

# 44. Method Borrowing With `bind()`

```js
function describe(
  city
) {
  // Step 1:
  return (
    `${this.name} - ${city}`
  );
}

const user = {
  name: "Rahul",
};

// Step 2:
const describeRahul =
  describe.bind(
    user
  );

// Step 3:
console.log(
  describeRahul(
    "Bangalore"
  )
);
// Output:
// Rahul - Bangalore
```

Output:

```text
Rahul - Bangalore
```

---

# 45. Interview Output 1 — `call()` 🔥🔥🔥

```js
function show() {
  return this.name;
}

const user = {
  name: "Rahul",
};

console.log(
  show.call(
    user
  )
);
```

Expected output:

```text
Rahul
```

---

# 46. Interview Output 2 — `apply()` 🔥🔥🔥

```js
function add(
  a,
  b
) {
  return (
    `${this.name}: ${a + b}`
  );
}

const user = {
  name: "Rahul",
};

console.log(
  add.apply(
    user,
    [
      2,
      3,
    ]
  )
);
```

Expected output:

```text
Rahul: 5
```

---

# 47. Interview Output 3 — `bind()` 🔥🔥🔥

```js
function show() {
  return this.name;
}

const user = {
  name: "Rahul",
};

const bound =
  show.bind(
    user
  );

console.log(
  bound()
);
```

Expected output:

```text
Rahul
```

---

# 48. Interview Output 4 — `bind()` Does Not Call Immediately

```js
function show() {
  console.log(
    this.name
  );
}

const user = {
  name: "Rahul",
};

// Step 1:
const bound =
  show.bind(
    user
  );

// Step 2:
console.log(
  "Before"
);

// Step 3:
bound();
```

Expected output:

```text
Before
Rahul
```

Not:

```text
Rahul
Before
```

---

# 49. Interview Output 5 — Bound `this` Cannot Be Replaced

```js
function show() {
  return this.name;
}

const a = {
  name: "A",
};

const b = {
  name: "B",
};

const bound =
  show.bind(
    a
  );

console.log(
  bound.call(
    b
  )
);
```

Expected output:

```text
A
```

---

# 50. Interview Output 6 — Partial Argument Binding

```js
function add(
  a,
  b
) {
  return (
    a + b
  );
}

const addTen =
  add.bind(
    null,
    10
  );

console.log(
  addTen(
    5
  )
);
```

Expected output:

```text
15
```

---

# 51. Interview Question — Difference Between `call`, `apply`, `bind` 🔥🔥🔥

Good answer:

```text
call()
→ invokes function immediately
→ arguments separately

apply()
→ invokes function immediately
→ arguments in array / array-like form

bind()
→ does not invoke immediately
→ returns a new function
→ fixes this for later calls
```

---

# 52. Interview Question — What Is Function Borrowing?

Good answer:

```text
Function borrowing means
using a function or method
with another object by changing this.

call(), apply(), or bind()
can be used for this.
```

---

# 53. Interview Question — Why Use `bind()`?

Good answer:

```text
bind() is useful when
a function will be called later
and we need to preserve a specific this.

Common cases:
callbacks
event handlers
class methods
detached object methods
```

---

# 54. Interview Question — Can `call/apply/bind` Change Arrow `this`?

Good answer:

```text
No.

Arrow functions do not have their own this.
They capture this lexically
from the surrounding scope.

So call/apply/bind
cannot replace that lexical this.
```

---

# 55. Interview Question — Does `bind()` Modify Original Function?

Good answer:

```text
No.

bind() returns a new function
with fixed this and optionally
pre-filled arguments.

The original function stays unchanged.
```

---

# 56. Debugging — Using `call()` When You Need a Reusable Function

If you need:

```text
same this
many times later
```

do not repeatedly write:

```js
show.call(
  user
);

show.call(
  user
);

show.call(
  user
);
```

Prefer:

```js
// Step 1:
const bound =
  show.bind(
    user
  );

// Step 2:
bound();

// Step 3:
bound();

// Step 4:
bound();
```

---

# 57. Debugging — Using `bind()` But Forgetting to Call Result

Wrong expectation:

```js
function show() {
  console.log(
    this.name
  );
}

const user = {
  name: "Rahul",
};

// Step 1:
show.bind(
  user
);

// Nothing is printed.
```

Why?

```text
bind()
returns a function
but does not execute it
```

Correct:

```js
// Step 1:
const bound =
  show.bind(
    user
  );

// Step 2:
bound(); // Output: Rahul
```

---

# 58. Decision Guide 🔥🔥🔥

```text
Need to invoke NOW?
→ call() or apply()

Arguments already in array?
→ apply()

Arguments separate?
→ call()

Need function for LATER?
→ bind()

Need fix lost this?
→ bind()

Need one-time method borrowing?
→ call()

Need reusable borrowed function?
→ bind()

Need pre-filled arguments?
→ bind()
```

---

# 59. Final Master Example 🔥🔥🔥

```js
function describeEmployee(
  city,
  role
) {
  // Step 1:
  return (
    `${this.name} - ${city} - ${role}`
  );
}

const employee = {
  name: "Rahul",
};

// Step 2:
// call()
const callResult =
  describeEmployee.call(
    employee,
    "Bangalore",
    "Developer"
  );

// Step 3:
console.log(
  callResult
);
// Output:
// Rahul - Bangalore - Developer

// Step 4:
// apply()
const applyResult =
  describeEmployee.apply(
    employee,
    [
      "Hyderabad",
      "Lead",
    ]
  );

// Step 5:
console.log(
  applyResult
);
// Output:
// Rahul - Hyderabad - Lead

// Step 6:
// bind()
const boundDescribe =
  describeEmployee.bind(
    employee,
    "Pune"
  );

// Step 7:
const bindResult =
  boundDescribe(
    "Architect"
  );

// Step 8:
console.log(
  bindResult
);
// Output:
// Rahul - Pune - Architect
```

Output:

```text
Rahul - Bangalore - Developer
Rahul - Hyderabad - Lead
Rahul - Pune - Architect
```

Complete mental model:

```text
call
↓
run now
↓
this = employee
↓
args separately

apply
↓
run now
↓
this = employee
↓
args array

bind
↓
create new function
↓
this = employee fixed
↓
some args can be pre-filled
↓
run later
```

---

# 60. Final Comparison Table 🔥🔥🔥

```text
call()

When?
→ Now

Returns?
→ Function result

Arguments?
→ Separate

this?
→ Explicitly set
```

```text
apply()

When?
→ Now

Returns?
→ Function result

Arguments?
→ Array / array-like

this?
→ Explicitly set
```

```text
bind()

When?
→ Later

Returns?
→ New function

Arguments?
→ Can pre-fill

this?
→ Fixed for returned function
```

---

# Quick Memory 🧠🔥🔥🔥

## `call()`

```text
Call NOW
Arguments separately
```

Example:

```js
fn.call(
  user,
  1,
  2
);
```

## `apply()`

```text
Call NOW
Arguments in array
```

Example:

```js
fn.apply(
  user,
  [
    1,
    2,
  ]
);
```

## `bind()`

```text
Call LATER
Returns new function
```

Example:

```js
const bound =
  fn.bind(
    user
  );

bound();
```

## Easy Memory Trick

```text
call
→ commas

apply
→ array

bind
→ bind now, call later
```

## Lost `this`

```text
const fn = obj.method;
fn();
↓
this lost
```

Fix:

```js
const fn =
  obj.method.bind(
    obj
  );
```

## Arrow Warning

```text
call/apply/bind
cannot replace arrow function this
```

## Most Important Interview Answer

```text
call and apply invoke immediately.

call takes arguments separately.

apply takes arguments as an array.

bind returns a new function
with fixed this
and optionally pre-filled arguments.
```

---

# ✅ 7.8 call() / apply() / bind() Complete

Completed in Section 7:

```text
7.1 JavaScript Execution Model
    + Execution Context
    + Call Stack

7.2 Scope
    + Lexical Scope
    + Scope Chain

7.3 Hoisting

7.4 Temporal Dead Zone — TDZ

7.5 Closures

7.6 var vs let Loop Questions

7.7 this

7.8 call() / apply() / bind()
    + Explicit this Binding
    + call()
    + apply()
    + bind()
    + Function Borrowing
    + Lost this Fix
    + Partial Application Awareness
    + Output Questions
```

Next topic:

```text
7.9 new Operator 🔥🔥🔥
├── Constructor Functions
├── What new Does Internally
├── New Object Creation
├── this Binding
├── Prototype Linking
├── Return Behavior
└── Output Questions
```

**Next: 7.9 `new` Operator 🔥🔥🔥**
