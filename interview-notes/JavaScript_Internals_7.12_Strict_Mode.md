# 7.12 Strict Mode 🔥🔥🔥

Strict Mode makes JavaScript behave more safely by turning some silent mistakes into errors.

Master mental model:

```text
normal/sloppy JavaScript
→ some mistakes may be silently accepted

strict mode
→ more mistakes become clear errors
```

The classic syntax is:

```js
// Step 1:
"use strict";
```

This chapter covers:

```text
"use strict"
Why Strict Mode Exists
Accidental Globals
this Behavior
Silent Errors
Duplicate Parameters
Reserved Words Awareness
Delete Restrictions
Read-Only Properties
Classes + Strict Mode
Modules + Strict Mode
Function-Level Strict Mode
Output Questions
Debugging Traps
```

---

# 1. What Is Strict Mode? 🔥🔥🔥

Strict Mode is a stricter way of running JavaScript.

It helps catch unsafe or accidental behavior earlier.

Example:

```js
// Step 1:
"use strict";

// Step 2:
let name =
  "Rahul";

// Step 3:
console.log(
  name
); // Output: Rahul
```

Output:

```text
Rahul
```

The important difference appears when code makes mistakes.

---

# 2. Why Was Strict Mode Added?

Older JavaScript allowed some questionable behaviors.

Examples:

```text
accidental global variables
silent assignment failures
unsafe this behavior
duplicate parameters in some cases
```

Strict Mode was added to make those situations easier to detect.

---

# 3. Basic Syntax 🔥🔥🔥

Put this at the beginning of a script or function:

```js
// Step 1:
"use strict";

// Step 2:
console.log(
  "Strict mode active"
); // Output: Strict mode active
```

Output:

```text
Strict mode active
```

---

# 4. Strict Mode Must Be at the Beginning of the Scope

For script-level strict mode:

```js
// Step 1:
"use strict";

// Step 2:
const value =
  10;
```

The directive must appear before normal executable statements in that script scope.

---

# 5. Function-Level Strict Mode 🔥🔥🔥

Strict Mode can also apply only inside one function.

```js
function run() {
  // Step 1:
  "use strict";

  // Step 2:
  console.log(
    "Strict inside run"
  ); // Output: Strict inside run
}

// Step 3:
run();
```

Output:

```text
Strict inside run
```

Outside that function, surrounding code may still be non-strict depending on environment.

---

# 6. Strict Mode Applies to Nested Functions Too

```js
function outer() {
  // Step 1:
  "use strict";

  function inner() {
    // Step 2:
    console.log(
      "Inner is also strict"
    ); // Output: Inner is also strict
  }

  // Step 3:
  inner();
}

// Step 4:
outer();
```

Output:

```text
Inner is also strict
```

Nested functions inside a strict function are also strict.

---

# 7. Accidental Global Without Strict Mode — Concept 🔥🔥🔥

Historically, sloppy-mode code like:

```text
name = "Rahul"
```

could create a global property if no variable declaration existed.

That is dangerous because a typo can create hidden global state.

---

# 8. Strict Mode Prevents Accidental Globals 🔥🔥🔥

```js
function run() {
  // Step 1:
  "use strict";

  try {
    // Step 2:
    employeeName =
      "Rahul";
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

Why?

`employeeName` was never declared.

---

# 9. Correct Way — Declare the Variable

```js
function run() {
  // Step 1:
  "use strict";

  // Step 2:
  const employeeName =
    "Rahul";

  // Step 3:
  console.log(
    employeeName
  ); // Output: Rahul
}

// Step 4:
run();
```

Output:

```text
Rahul
```

---

# 10. Strict Mode Helps Catch Typos 🔥🔥🔥

Imagine this:

```js
function updateEmployee() {
  // Step 1:
  "use strict";

  const employeeName =
    "Rahul";

  try {
    // Step 2:
    employeName =
      "Amit";
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.name
    ); // Output: ReferenceError
  }

  // Step 4:
  console.log(
    employeeName
  ); // Output: Rahul
}

// Step 5:
updateEmployee();
```

Output:

```text
ReferenceError
Rahul
```

The typo:

```text
employeName
```

is caught immediately.

---

# 11. `this` in Standalone Regular Function 🔥🔥🔥

In strict mode:

```js
function showThis() {
  // Step 1:
  "use strict";

  // Step 2:
  console.log(
    this
  ); // Output: undefined
}

// Step 3:
showThis();
```

Output:

```text
undefined
```

This is a major interview point.

---

# 12. Why Does Strict Mode `this` Become `undefined`?

Standalone call:

```text
showThis()
```

has no object receiver.

Strict Mode does not automatically replace missing `this` with the global object.

So:

```text
this = undefined
```

---

# 13. Object Method `this` Still Works Normally

```js
const user = {
  name: "Rahul",

  showName() {
    // Step 1:
    "use strict";

    // Step 2:
    return this.name;
  },
};

// Step 3:
console.log(
  user.showName()
); // Output: Rahul
```

Output:

```text
Rahul
```

Strict Mode does not break normal method calls.

---

# 14. Detached Method in Strict Mode 🔥🔥🔥

```js
const user = {
  name: "Rahul",

  showName() {
    // Step 1:
    "use strict";

    return this.name;
  },
};

// Step 2:
const fn =
  user.showName;

try {
  // Step 3:
  console.log(
    fn()
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

Because:

```text
fn()
→ this = undefined
```

Then:

```text
this.name
```

fails.

---

# 15. Strict Mode Makes Lost `this` Bugs Easier to Notice

Without strict reasoning, lost `this` can sometimes behave differently depending on environment.

Strict Mode gives a clearer failure:

```text
this = undefined
```

This makes debugging easier.

---

# 16. Assignment to Read-Only Property 🔥🔥🔥

Strict Mode can turn silent assignment failures into errors.

Example:

```js
const user = {};

// Step 1:
Object.defineProperty(
  user,
  "id",
  {
    value: 101,
    writable: false,
  }
);

function update() {
  // Step 2:
  "use strict";

  try {
    // Step 3:
    user.id =
      202;
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.name
    ); // Output: TypeError
  }
}

// Step 5:
update();
```

Output:

```text
TypeError
```

---

# 17. Read-Only Property Stays Unchanged

```js
const user = {};

// Step 1:
Object.defineProperty(
  user,
  "id",
  {
    value: 101,
    writable: false,
  }
);

// Step 2:
console.log(
  user.id
); // Output: 101
```

Output:

```text
101
```

---

# 18. Assignment to Getter-Only Property 🔥🔥

```js
const user = {
  get name() {
    // Step 1:
    return "Rahul";
  },
};

function run() {
  // Step 2:
  "use strict";

  try {
    // Step 3:
    user.name =
      "Amit";
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.name
    ); // Output: TypeError
  }
}

// Step 5:
run();
```

Output:

```text
TypeError
```

There is no setter.

---

# 19. Deleting Non-Configurable Property 🔥🔥

```js
const user = {};

// Step 1:
Object.defineProperty(
  user,
  "id",
  {
    value: 101,
    configurable: false,
  }
);

function run() {
  // Step 2:
  "use strict";

  try {
    // Step 3:
    delete user.id;
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.name
    ); // Output: TypeError
  }
}

// Step 5:
run();
```

Output:

```text
TypeError
```

Strict Mode exposes the invalid delete attempt.

---

# 20. Deleting a Variable Name Is Not Allowed 🔥🔥🔥

You cannot do this in normal modern JavaScript syntax:

```text
delete variableName
```

`delete` is for object properties, not local variable bindings.

Example of valid delete:

```js
const user = {
  name: "Rahul",
};

// Step 1:
delete user.name;

// Step 2:
console.log(
  user.name
); // Output: undefined
```

Output:

```text
undefined
```

---

# 21. Duplicate Parameter Names 🔥🔥🔥

Strict Mode rejects duplicate parameter names in simple function parameter lists.

This code is invalid syntax in strict mode:

```text
function add(a, a) {
  "use strict";
}
```

Interview rule:

```text
duplicate parameter names
→ not allowed in strict mode
```

---

# 22. Why Duplicate Parameters Are Bad

Example idea:

```text
function test(a, a)
```

Which `a` should the developer mentally track?

Duplicate names make code confusing.

Strict Mode prevents that ambiguity.

---

# 23. `eval` and `arguments` Restrictions — Awareness 🔥🔥

Strict Mode restricts assigning to names like:

```text
eval
arguments
```

These are special language identifiers.

For interviews, remember:

```text
strict mode tightens several old JavaScript edge cases
around eval and arguments
```

No need to memorize every obscure restriction.

---

# 24. `arguments` Does Not Alias Parameters the Same Way 🔥🔥🔥

In strict mode, parameter values and `arguments` entries are more independent.

Example:

```js
function demo(
  value
) {
  // Step 1:
  "use strict";

  // Step 2:
  value =
    20;

  // Step 3:
  console.log(
    value
  ); // Output: 20

  // Step 4:
  console.log(
    arguments[0]
  ); // Output: 10
}

// Step 5:
demo(
  10
);
```

Output:

```text
20
10
```

This is an important strict-mode behavior difference.

---

# 25. Why Parameter / `arguments` Independence Helps

It makes behavior more predictable.

Mental model:

```text
parameter variable
and
arguments entry
```

are not magically synchronized in strict mode.

---

# 26. Assigning `arguments[0]` Does Not Update Parameter

```js
function demo(
  value
) {
  // Step 1:
  "use strict";

  // Step 2:
  arguments[0] =
    50;

  // Step 3:
  console.log(
    value
  ); // Output: 10

  // Step 4:
  console.log(
    arguments[0]
  ); // Output: 50
}

// Step 5:
demo(
  10
);
```

Output:

```text
10
50
```

---

# 27. Strict Mode and Octal-Like Legacy Syntax — Awareness 🔥🔥

Older JavaScript supported some legacy octal forms such as:

```text
010
```

Strict Mode rejects certain legacy octal syntax.

Modern code should use explicit modern forms if needed.

This is low-priority awareness.

---

# 28. Strict Mode and Reserved Words — Awareness

Strict Mode reserves or restricts some words for future language use in certain contexts.

You do not need to memorize all of them for practical interviews.

Main lesson:

```text
strict mode removes several legacy language ambiguities
```

---

# 29. Strict Mode Does NOT Make `const` Immutable Objects

Important misconception.

```js
// Step 1:
"use strict";

// Step 2:
const user = {
  name: "Rahul",
};

// Step 3:
user.name =
  "Amit";

// Step 4:
console.log(
  user.name
); // Output: Amit
```

Output:

```text
Amit
```

Strict Mode does not freeze objects.

---

# 30. `const` Binding vs Object Mutation

```text
const user = {...}
```

means:

```text
user variable cannot be reassigned
```

It does NOT mean:

```text
object cannot be mutated
```

Strict Mode does not change that rule.

---

# 31. Reassigning a `const` Still Fails

```js
// Step 1:
"use strict";

// Step 2:
const value =
  10;

try {
  // Step 3:
  value =
    20;
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

This is because of `const`, not specifically because of Strict Mode.

---

# 32. Strict Mode Does NOT Change Lexical Scope Rules

```js
// Step 1:
"use strict";

const outer =
  10;

function run() {
  // Step 2:
  const inner =
    20;

  // Step 3:
  console.log(
    outer + inner
  ); // Output: 30
}

// Step 4:
run();
```

Output:

```text
30
```

Scope still works normally.

---

# 33. Strict Mode Does NOT Disable Closures

```js
function createCounter() {
  // Step 1:
  "use strict";

  let count =
    0;

  // Step 2:
  return function () {
    count++;

    return count;
  };
}

// Step 3:
const counter =
  createCounter();

// Step 4:
console.log(
  counter()
); // Output: 1

// Step 5:
console.log(
  counter()
); // Output: 2
```

Output:

```text
1
2
```

Closures work normally.

---

# 34. Strict Mode Does NOT Disable `this`

Strict Mode changes default `this` behavior for standalone calls.

It does NOT remove `this`.

Example:

```js
const user = {
  name: "Rahul",

  show() {
    // Step 1:
    "use strict";

    return this.name;
  },
};

// Step 2:
console.log(
  user.show()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 35. `call()` Works in Strict Mode 🔥🔥🔥

```js
function show() {
  // Step 1:
  "use strict";

  return this.name;
}

const user = {
  name: "Rahul",
};

// Step 2:
console.log(
  show.call(
    user
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

Explicit `this` binding still works.

---

# 36. Strict Mode Preserves Primitive `thisArg` More Directly 🔥🔥

In strict mode:

```js
function showType() {
  // Step 1:
  "use strict";

  return typeof this;
}

// Step 2:
console.log(
  showType.call(
    5
  )
); // Output: number
```

Output:

```text
number
```

The primitive is not automatically boxed into a wrapper object.

---

# 37. Strict Mode `call(null)` 🔥🔥🔥

```js
function showThis() {
  // Step 1:
  "use strict";

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

Strict Mode preserves explicit `null`.

---

# 38. Class Methods Are Automatically Strict 🔥🔥🔥

You do NOT need:

```text
"use strict"
```

inside a class method.

Example:

```js
class Employee {
  // Step 1:
  showThis() {
    return this;
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
const fn =
  employee.showThis;

// Step 4:
console.log(
  fn()
); // Output: undefined
```

Output:

```text
undefined
```

Class methods already use strict semantics.

---

# 39. Class Constructors Are Automatically Strict

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}
```

The class body is already strict.

No explicit directive is required.

---

# 40. ES Modules Are Automatically Strict 🔥🔥🔥

When using:

```js
// Step 1:
export const value =
  10;
```

or:

```js
// Step 1:
import {
  value,
} from "./file.js";
```

the module code runs in strict mode automatically.

So you do not need:

```text
"use strict"
```

inside ES modules.

---

# 41. Modern App Code Often Already Runs Strict

Common modern environments:

```text
ES modules
classes
bundled applications
framework tooling
```

often give you strict semantics automatically.

Still, understanding Strict Mode is important for interviews and older scripts.

---

# 42. Strict Mode + Regular Function in Module Context — Awareness

Since ES modules are strict:

```text
standalone regular function call
→ this = undefined
```

This aligns with modern JavaScript expectations.

---

# 43. Strict Mode Helps Optimization — Awareness 🔥🔥

Historically and conceptually, Strict Mode removes some ambiguous behavior, which can make code easier for engines to reason about.

But for interviews, focus more on:

```text
safer semantics
clearer errors
fewer accidental globals
predictable this
```

rather than claiming guaranteed performance improvements.

---

# 44. Strict Mode Is Not a Security Sandbox

Important.

Strict Mode:

```text
does not isolate code
does not prevent network access
does not create permissions
does not sandbox JavaScript
```

It is a language behavior mode, not a security system.

---

# 45. Strict Mode Does Not Catch Every Bug

It helps catch certain categories of mistakes.

It does not catch:

```text
wrong business logic
wrong API endpoint
incorrect calculations
bad UI state
all async bugs
```

It is helpful, not magical.

---

# 46. Practical Example — Accidental Employee Global 🔥🔥🔥

```js
function createEmployee() {
  // Step 1:
  "use strict";

  try {
    // Step 2:
    employee =
      {
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
}

// Step 4:
createEmployee();
```

Output:

```text
ReferenceError
```

Correct:

```js
function createEmployee() {
  // Step 1:
  "use strict";

  // Step 2:
  const employee =
    {
      name: "Rahul",
    };

  // Step 3:
  return employee;
}
```

---

# 47. Practical Example — Lost `this` Detection 🔥🔥🔥

```js
const employee = {
  name: "Rahul",

  showName() {
    // Step 1:
    "use strict";

    return this.name;
  },
};

// Step 2:
const callback =
  employee.showName;

try {
  // Step 3:
  callback();
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

This makes the lost-context bug obvious.

---

# 48. Fix the Lost `this`

```js
const employee = {
  name: "Rahul",

  showName() {
    // Step 1:
    "use strict";

    return this.name;
  },
};

// Step 2:
const callback =
  employee.showName.bind(
    employee
  );

// Step 3:
console.log(
  callback()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 49. Strict Mode + Constructor Without `new` 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  "use strict";

  // Step 2:
  this.name =
    name;
}

try {
  // Step 3:
  Employee(
    "Rahul"
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

Strict Mode prevents accidental global-object mutation through `this`.

---

# 50. Same Constructor With `new`

```js
function Employee(
  name
) {
  // Step 1:
  "use strict";

  // Step 2:
  this.name =
    name;
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

`new` still provides a valid `this`.

---

# 51. Interview Output 1 — Standalone `this` 🔥🔥🔥

```js
function show() {
  // Step 1:
  "use strict";

  return this;
}

// Step 2:
console.log(
  show()
);
```

Expected output:

```text
undefined
```

---

# 52. Interview Output 2 — Accidental Global 🔥🔥🔥

```js
function run() {
  // Step 1:
  "use strict";

  try {
    // Step 2:
    total =
      100;
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
run();
```

Expected output:

```text
ReferenceError
```

---

# 53. Interview Output 3 — Method `this`

```js
const user = {
  name: "Rahul",

  show() {
    // Step 1:
    "use strict";

    return this.name;
  },
};

// Step 2:
console.log(
  user.show()
);
```

Expected output:

```text
Rahul
```

---

# 54. Interview Output 4 — Detached Method 🔥🔥🔥

```js
const user = {
  name: "Rahul",

  show() {
    // Step 1:
    "use strict";

    return this.name;
  },
};

// Step 2:
const fn =
  user.show;

try {
  // Step 3:
  fn();
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  );
}
```

Expected output:

```text
TypeError
```

---

# 55. Interview Output 5 — Parameter vs `arguments` 🔥🔥🔥

```js
function demo(
  value
) {
  // Step 1:
  "use strict";

  // Step 2:
  value =
    20;

  // Step 3:
  console.log(
    arguments[0]
  );
}

// Step 4:
demo(
  10
);
```

Expected output:

```text
10
```

---

# 56. Interview Output 6 — Class Method Detached

```js
class User {
  // Step 1:
  showThis() {
    return this;
  }
}

// Step 2:
const user =
  new User();

// Step 3:
const fn =
  user.showThis;

// Step 4:
console.log(
  fn()
);
```

Expected output:

```text
undefined
```

Because class methods are strict automatically.

---

# 57. Interview Question — What Is Strict Mode? 🔥🔥🔥

Good answer:

```text
Strict Mode is a stricter JavaScript execution mode
that removes or changes some unsafe legacy behaviors
and turns several silent mistakes into errors.
```

---

# 58. Interview Question — How Do You Enable Strict Mode?

Good answer:

```text
Use:

"use strict";

at the beginning of a script
or function.

ES modules and class bodies
already use strict semantics automatically.
```

---

# 59. Interview Question — Main Benefits of Strict Mode 🔥🔥🔥

Good answer:

```text
It helps prevent accidental globals,
makes standalone this undefined,
turns some silent assignment/delete failures into errors,
and removes several confusing legacy behaviors.
```

---

# 60. Interview Question — What Happens to `this` in Strict Mode?

Good answer:

```text
For a standalone regular function call,
this is undefined.

For object methods,
new calls,
call/apply/bind,
this still follows those normal binding rules.
```

---

# 61. Interview Question — Are Classes Strict Automatically?

Good answer:

```text
Yes.

Class bodies and class methods
use strict-mode semantics automatically.
```

---

# 62. Interview Question — Are ES Modules Strict Automatically?

Good answer:

```text
Yes.

ES module code runs in strict mode automatically,
so "use strict" is not required there.
```

---

# 63. Interview Question — Does Strict Mode Make Objects Immutable?

Good answer:

```text
No.

Strict Mode does not freeze objects.

Object mutability still depends on
normal JavaScript rules,
Object.freeze(),
property descriptors,
and const only protects the variable binding.
```

---

# 64. Debugging Rule — Undeclared Variable Error 🔥🔥🔥

If you see:

```text
ReferenceError
```

after assignment like:

```text
employeeNmae = "Rahul"
```

check for:

```text
typo
missing let
missing const
missing declaration
```

Strict Mode often exposes that mistake immediately.

---

# 65. Debugging Rule — `this` Is `undefined`

If a strict function has:

```text
this = undefined
```

ask:

```text
Was the method detached?

Was it passed as callback?

Was it called as fn() instead of obj.fn()?
```

Possible fixes:

```text
bind()
arrow callback
preserve object.method() call
```

---

# 66. Debugging Rule — Assignment Throws TypeError

In Strict Mode, assignment may fail loudly if property is:

```text
non-writable
getter-only
protected by property descriptor
```

Check the property descriptor.

---

# 67. Strict Mode Decision Guide 🔥🔥🔥

```text
Using old-style script?
→ "use strict" can improve safety

Using ES module?
→ already strict

Using class?
→ class body already strict

Undeclared assignment?
→ ReferenceError

Standalone regular function?
→ this = undefined

Object method?
→ this still comes from receiver

call/apply/bind?
→ explicit this still works

new Constructor()?
→ this = new instance

Need object immutability?
→ Strict Mode is NOT enough
```

---

# 68. Final Master Trace 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  "use strict";

  // Step 2:
  this.name =
    name;
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.name
); // Output: Rahul

function showName() {
  // Step 5:
  "use strict";

  return this?.name;
}

// Step 6:
console.log(
  showName()
); // Output: undefined

// Step 7:
console.log(
  showName.call(
    employee
  )
); // Output: Rahul

function testAccidentalGlobal() {
  // Step 8:
  "use strict";

  try {
    // Step 9:
    salary =
      50000;
  } catch (
    error
  ) {
    // Step 10:
    console.log(
      error.name
    ); // Output: ReferenceError
  }
}

// Step 11:
testAccidentalGlobal();
```

Output:

```text
Rahul
undefined
Rahul
ReferenceError
```

Complete mental model:

```text
new Employee("Rahul")
↓
new provides valid this
↓
strict mode does not break constructor
↓
employee.name = Rahul

showName()
↓
standalone strict call
↓
this = undefined
↓
optional chaining gives undefined

showName.call(employee)
↓
explicit binding
↓
this = employee
↓
Rahul

salary = 50000
without declaration
↓
strict mode
↓
ReferenceError
```

---

# Quick Memory 🧠🔥🔥🔥

## Enable Strict Mode

```js
// Step 1:
"use strict";
```

## Main Purpose

```text
catch unsafe mistakes earlier
```

## Accidental Global

```text
undeclared assignment
→ ReferenceError
```

## Standalone Function

```text
strict mode
+
fn()
→ this = undefined
```

## Object Method

```text
obj.method()
→ this = obj
```

## Constructor

```text
new Constructor()
→ this = new instance
```

## `call/apply/bind`

```text
explicit this still works
```

## Read-Only Assignment

```text
strict mode
→ TypeError
```

## Duplicate Parameters

```text
not allowed in strict mode
```

## `arguments`

```text
parameter and arguments entry
are not aliased the old sloppy-mode way
```

## Classes

```text
automatically strict
```

## ES Modules

```text
automatically strict
```

## Not Object Immutability

```text
strict mode
≠
Object.freeze()
```

## Most Important Interview Answer

```text
Strict Mode is a safer JavaScript mode
that prevents accidental globals,
makes standalone function this undefined,
turns several silent failures into errors,
and removes some confusing legacy behavior.

Classes and ES modules
already run with strict semantics automatically.
```

---

# ✅ 7.12 Strict Mode Complete

Completed in Section 7:

```text
7.1 Execution Model
7.2 Scope
7.3 Hoisting
7.4 TDZ
7.5 Closures
7.6 var vs let Loop Questions
7.7 this
7.8 call() / apply() / bind()
7.9 new Operator
7.10 Prototypes + Prototype Chain
7.11 Classes
7.12 Strict Mode
```

Next topic:

```text
7.13 Reference Behaviour + Mutation + Immutability 🔥🔥🔥
├── Primitive vs Reference
├── Pass-by-Value Mental Model
├── Object References
├── Mutation
├── Immutability
├── Shallow Copy
├── Deep Copy Basics
├── Spread Limitations
├── Object.assign() Limitations
└── structuredClone()
```

**Next: 7.13 Reference Behaviour + Mutation + Immutability 🔥🔥🔥**
