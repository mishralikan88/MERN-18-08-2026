# 7.6 var vs let Loop Questions 🔥🔥🔥

This chapter is one of the most common JavaScript interview areas.

The classic question is:

```text
Why does var print:

3
3
3

but let prints:

0
1
2
```

The answer combines:

```text
Scope
+
Closures
+
Loop Bindings
+
Timers
```

Master mental model:

```text
var
→ one shared loop variable

let
→ new binding for each iteration
```

With delayed callbacks:

```text
callbacks run later
↓
they read the variable they closed over
```

This chapter covers:

```text
var + setTimeout
let + setTimeout
Shared Binding
Per-Iteration Binding
Closure Fix
IIFE Fix
Function Factory Fix
Loop Scope
Output Questions
Debugging Traps
```

---

# 1. The Classic `var` Loop Question 🔥🔥🔥

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      console.log(
        i
      );
    },
    0
  );
}
```

Expected later output:

```text
3
3
3
```

This surprises many people.

---

# 2. Why Does `var` Print `3 3 3`?

Because `var` is function-scoped.

There is only one shared `i`.

Mental model:

```text
one i variable
↓
iteration 1
i = 0
callback created

iteration 2
i = 1
callback created

iteration 3
i = 2
callback created

loop ends
i = 3
↓
callbacks run later
↓
all callbacks read same i
↓
3
3
3
```

---

# 3. Important: Callback Does Not Store `0`, `1`, `2`

Wrong mental model:

```text
callback 1 stores 0
callback 2 stores 1
callback 3 stores 2
```

Not with `var` here.

Better mental model:

```text
all callbacks remember
the same variable i
```

Later:

```text
i = 3
```

So all print `3`.

---

# 4. Trace `var` Loop Step by Step 🔥🔥🔥

Code:

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

Trace:

```text
Start:
i = 0

Check:
0 < 3
→ true

Create callback 1
→ closes over same i

Increment:
i = 1

Check:
1 < 3
→ true

Create callback 2
→ closes over same i

Increment:
i = 2

Check:
2 < 3
→ true

Create callback 3
→ closes over same i

Increment:
i = 3

Check:
3 < 3
→ false

Loop ends
```

Then callbacks run:

```text
callback 1 → i is 3
callback 2 → i is 3
callback 3 → i is 3
```

---

# 5. Why Do Callbacks Run Later? 🔥🔥

Because `setTimeout()` schedules the callback.

Even with:

```js
setTimeout(
  callback,
  0
);
```

the callback does not interrupt the current synchronous loop.

The loop finishes first.

Async internals come later in Section 8.

For now remember:

```text
current synchronous code finishes first
↓
timer callback runs later
```

---

# 6. `setTimeout(..., 0)` Does NOT Mean Immediate

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

So:

```text
0 milliseconds
does NOT mean
run before current code finishes
```

---

# 7. The Classic `let` Loop Question 🔥🔥🔥

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      console.log(
        i
      );
    },
    0
  );
}
```

Expected later output:

```text
0
1
2
```

---

# 8. Why Does `let` Print `0 1 2`?

In a `for` loop, `let` creates a separate binding for each iteration.

Mental model:

```text
iteration 1
→ own i = 0

iteration 2
→ own i = 1

iteration 3
→ own i = 2
```

Each callback closes over a different binding.

So later:

```text
callback 1 → 0
callback 2 → 1
callback 3 → 2
```

---

# 9. Shared Binding vs Per-Iteration Binding 🔥🔥🔥

`var`:

```text
one shared i
```

`let`:

```text
different i binding
for each iteration
```

This is the whole interview idea.

---

# 10. Visual Comparison 🔥🔥🔥

`var`:

```text
              ┌─────────────┐
callback 1 ──→│             │
callback 2 ──→│ shared i = 3│
callback 3 ──→│             │
              └─────────────┘
```

`let`:

```text
callback 1 ──→ i = 0

callback 2 ──→ i = 1

callback 3 ──→ i = 2
```

---

# 11. Why `let` Gets Per-Iteration Bindings

The `for` loop has special behavior for block-scoped `let`.

Conceptually:

```text
iteration starts
↓
binding for i exists for that iteration
↓
callback closes over that binding
↓
next iteration gets another binding
```

You do not manually create those bindings.

JavaScript handles it.

---

# 12. `var` Outside Loop After Completion

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  // Loop body.
}

// Step 2:
console.log(
  i
); // Output: 3
```

Output:

```text
3
```

Because `var` is not block-scoped.

---

# 13. `let` Outside Loop After Completion

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  // Step 1:
  // Loop body.
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
ReferenceError
```

Because `let i` belongs to the loop's block scope.

---

# 14. `var` Loop Without Timer

Important:

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  console.log(
    i
  );
}
```

Output:

```text
0
1
2
```

So `var` itself does NOT automatically cause `3 3 3`.

The classic problem happens because:

```text
callbacks run later
+
all callbacks share same var binding
```

---

# 15. `let` Loop Without Timer

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
}
```

Output:

```text
0
1
2
```

Same visible output as `var` in synchronous loop.

The difference becomes visible when closures survive beyond each iteration.

---

# 16. Closure Is the Key 🔥🔥🔥

With `var` timer:

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

The callback is a closure.

It uses outer variable:

```text
i
```

Since `var` provides one shared `i`, all callbacks share it.

---

# 17. `let` Callback Is Also a Closure

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

The callbacks are still closures.

But each one closes over a different per-iteration binding.

---

# 18. Same Pattern With Array of Functions — `var` 🔥🔥🔥

Timer is not required to demonstrate this.

```js
const functions =
  [];

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  functions.push(
    () =>
      i
  );
}

// Step 2:
console.log(
  functions[0]()
); // Output: 3

console.log(
  functions[1]()
); // Output: 3

console.log(
  functions[2]()
); // Output: 3
```

Output:

```text
3
3
3
```

Why?

All functions close over the same `var i`.

---

# 19. Same Array-of-Functions Pattern With `let`

```js
const functions =
  [];

for (
  let i = 0;
  i < 3;
  i++
) {
  // Step 1:
  functions.push(
    () =>
      i
  );
}

// Step 2:
console.log(
  functions[0]()
); // Output: 0

console.log(
  functions[1]()
); // Output: 1

console.log(
  functions[2]()
); // Output: 2
```

Output:

```text
0
1
2
```

---

# 20. Why This Example Is Useful

It proves:

```text
This is not only a setTimeout issue.
```

The real issue is:

```text
closure
+
shared/per-iteration binding
```

---

# 21. Fixing `var` With an IIFE 🔥🔥🔥

Before `let` became common, a classic fix was an IIFE.

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  (
    function (
      currentI
    ) {
      // Step 2:
      setTimeout(
        () => {
          console.log(
            currentI
          );
        },
        0
      );
    }
  )(
    i
  );
}
```

Expected later output:

```text
0
1
2
```

---

# 22. Why IIFE Fix Works

Every IIFE call gets a new parameter binding:

```text
call 1:
currentI = 0

call 2:
currentI = 1

call 3:
currentI = 2
```

Each timer callback closes over its own `currentI`.

---

# 23. IIFE Trace 🔥🔥🔥

Iteration 1:

```text
i = 0
↓
IIFE(0)
↓
currentI = 0
↓
callback remembers currentI
```

Iteration 2:

```text
i = 1
↓
IIFE(1)
↓
currentI = 1
```

Iteration 3:

```text
i = 2
↓
IIFE(2)
↓
currentI = 2
```

Later:

```text
0
1
2
```

---

# 24. Fixing `var` With Function Factory 🔥🔥🔥

```js
function createLogger(
  value
) {
  // Step 1:
  return function () {
    console.log(
      value
    );
  };
}

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 2:
  const logger =
    createLogger(
      i
    );

  // Step 3:
  setTimeout(
    logger,
    0
  );
}
```

Expected later output:

```text
0
1
2
```

---

# 25. Why Function Factory Fix Works

Each call:

```js
createLogger(
  i
);
```

creates a new function scope with its own:

```text
value
```

So:

```text
logger 1 → value = 0
logger 2 → value = 1
logger 3 → value = 2
```

---

# 26. Modern Fix — Just Use `let` 🔥🔥🔥

Today the simplest version is:

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

Expected later output:

```text
0
1
2
```

This is usually preferred.

---

# 27. `const` in a Classic Counter Loop?

This does not work:

```text
for (const i = 0; i < 3; i++)
```

because:

```text
i++
requires reassignment
```

and a `const` binding cannot be reassigned.

---

# 28. But `const` Works in `for...of` 🔥🔥

Example:

```js
const numbers = [
  10,
  20,
  30,
];

for (
  const number
  of numbers
) {
  // Step 1:
  console.log(
    number
  );
}
```

Output:

```text
10
20
30
```

Why?

Each iteration gets a new `number` binding.

We are not doing:

```text
number++
```

on the same `const`.

---

# 29. `const` With Delayed Callback in `for...of`

```js
const values = [
  "A",
  "B",
  "C",
];

for (
  const value
  of values
) {
  // Step 1:
  setTimeout(
    () => {
      console.log(
        value
      );
    },
    0
  );
}
```

Expected later output:

```text
A
B
C
```

Each iteration has its own `value` binding.

---

# 30. `var` in `for...of` Can Still Share One Binding 🔥🔥

```js
const values = [
  "A",
  "B",
  "C",
];

for (
  var value
  of values
) {
  // Step 1:
  setTimeout(
    () => {
      console.log(
        value
      );
    },
    0
  );
}
```

Expected later output:

```text
C
C
C
```

Because one function-scoped `var value` is reused.

---

# 31. Loop Variable + Direct Function Call

```js
function print(
  value
) {
  console.log(
    value
  );
}

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  print(
    i
  );
}
```

Output:

```text
0
1
2
```

Why not `3 3 3`?

Because `print(i)` executes immediately.

It receives the current value as an argument at that moment.

---

# 32. Passing Value Into Another Function Captures Current Value

```js
function createPrinter(
  value
) {
  return () => {
    console.log(
      value
    );
  };
}

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  setTimeout(
    createPrinter(
      i
    ),
    0
  );
}
```

Expected later output:

```text
0
1
2
```

Because each `value` parameter is separate.

---

# 33. `var` Inside Function Scope 🔥🔥🔥

```js
function run() {
  for (
    var i = 0;
    i < 3;
    i++
  ) {
    // Step 1:
    // Loop.
  }

  // Step 2:
  console.log(
    i
  ); // Output: 3
}

// Step 3:
run();
```

Output:

```text
3
```

`i` belongs to `run()` function scope.

---

# 34. `let` Inside Function Loop Scope

```js
function run() {
  for (
    let i = 0;
    i < 3;
    i++
  ) {
    // Step 1:
    // Loop.
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
}

// Step 4:
run();
```

Output:

```text
ReferenceError
```

---

# 35. Common Interview Trap — Delay Value Does Not Change Closure Rule

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    i * 100
  );
}
```

Expected later output:

```text
3
3
3
```

Different delays do not create separate `var` bindings.

---

# 36. Different Delays With `let`

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    i * 100
  );
}
```

Expected later output:

```text
0
1
2
```

Each callback closes over its own `i`.

---

# 37. Mutation of Shared `var` After Loop 🔥🔥🔥

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}

// Step 1:
// Change shared variable again.
i =
  100;
```

Expected later output:

```text
100
100
100
```

Why?

All callbacks share the same `i`.

---

# 38. Closure Reads Latest Shared Binding Value

This proves again:

```text
closure does not freeze
the value automatically
```

It reads the current value of the shared binding when callback executes.

---

# 39. `let` Version Is Independent

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

There is no outside `i` to change.

Each iteration binding stays separate.

---

# 40. Practical Frontend Example — Button Handlers With `var` 🔥🔥🔥

Concept:

```js
const buttons = [
  "A",
  "B",
  "C",
];

for (
  var i = 0;
  i < buttons.length;
  i++
) {
  // Step 1:
  // Imagine this callback is attached
  // to a button click.
  const handler =
    () => {
      console.log(
        i
      );
    };

  // Step 2:
  // Store handler for demo.
  buttons[i] = {
    label:
      buttons[i],
    handler,
  };
}

// Step 3:
buttons[0].handler(); // Output: 3
```

Output:

```text
3
```

Problem:

All handlers share one `i`.

---

# 41. Frontend Fix With `let`

```js
const buttons = [
  "A",
  "B",
  "C",
];

const handlers =
  [];

for (
  let i = 0;
  i < buttons.length;
  i++
) {
  // Step 1:
  handlers.push(
    () => {
      console.log(
        i
      );
    }
  );
}

// Step 2:
handlers[0](); // Output: 0

handlers[1](); // Output: 1

handlers[2](); // Output: 2
```

Output:

```text
0
1
2
```

---

# 42. Better Frontend Pattern — Use Actual Item, Not Index 🔥🔥

Often you do not need the index at all.

```js
const buttons = [
  "Save",
  "Edit",
  "Delete",
];

const handlers =
  [];

for (
  const label
  of buttons
) {
  // Step 1:
  handlers.push(
    () => {
      console.log(
        label
      );
    }
  );
}

// Step 2:
handlers[0](); // Output: Save

handlers[1](); // Output: Edit
```

Output:

```text
Save
Edit
```

This is clearer and safer.

---

# 43. Interview Output 1 — Basic `var` Timer 🔥🔥🔥

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

Expected output:

```text
3
3
3
```

---

# 44. Interview Output 2 — Basic `let` Timer 🔥🔥🔥

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  setTimeout(
    () => {
      console.log(
        i
      );
    },
    0
  );
}
```

Expected output:

```text
0
1
2
```

---

# 45. Interview Output 3 — `var` Function Array

```js
const functions =
  [];

for (
  var i = 0;
  i < 2;
  i++
) {
  functions.push(
    () =>
      i
  );
}

console.log(
  functions[0]()
);

console.log(
  functions[1]()
);
```

Expected output:

```text
2
2
```

---

# 46. Interview Output 4 — `let` Function Array

```js
const functions =
  [];

for (
  let i = 0;
  i < 2;
  i++
) {
  functions.push(
    () =>
      i
  );
}

console.log(
  functions[0]()
);

console.log(
  functions[1]()
);
```

Expected output:

```text
0
1
```

---

# 47. Interview Output 5 — `var` Direct Console

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  console.log(
    i
  );
}
```

Expected output:

```text
0
1
2
```

Important:

```text
No delayed callback
→ current value printed immediately
```

---

# 48. Interview Output 6 — `var` After Loop

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
}

// Step 2:
console.log(
  i
);
```

Expected output:

```text
3
```

---

# 49. Interview Output 7 — `let` After Loop

```js
for (
  let i = 0;
  i < 3;
  i++
) {
  // Step 1:
}

try {
  console.log(
    i
  );
} catch (
  error
) {
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

# 50. Interview Output 8 — `var` + IIFE 🔥🔥🔥

```js
for (
  var i = 0;
  i < 3;
  i++
) {
  (
    function (
      value
    ) {
      setTimeout(
        () => {
          console.log(
            value
          );
        },
        0
      );
    }
  )(
    i
  );
}
```

Expected later output:

```text
0
1
2
```

---

# 51. Interview Question — Why Does `var` Print `3 3 3`? 🔥🔥🔥

Good answer:

```text
var is function-scoped,
so all callbacks close over
the same i binding.

The callbacks run after the loop finishes.

At that time i is 3,
so every callback prints 3.
```

---

# 52. Interview Question — Why Does `let` Print `0 1 2`?

Good answer:

```text
A let variable in a for loop
gets a separate binding
for each iteration.

Each callback closes over
its own iteration's i,
so the outputs are 0, 1, and 2.
```

---

# 53. Interview Question — Is This Mainly an Event Loop Question?

Good answer:

```text
Partly.

The delayed execution is related
to asynchronous scheduling.

But the var vs let difference
is mainly about:

scope
+
closures
+
shared vs per-iteration bindings
```

---

# 54. Interview Question — Can We Fix `var` Without `let`?

Yes.

Common fixes:

```text
IIFE
Function Factory
Passing current value as function argument
```

All create a separate binding/value context for each callback.

---

# 55. Debugging Rule — Do Not Use `var` in Modern Loop Callbacks 🔥🔥🔥

Prefer:

```js
for (
  let i = 0;
  i < items.length;
  i++
) {
  // Step 1:
}
```

Or even better when possible:

```js
for (
  const item
  of items
) {
  // Step 1:
}
```

This avoids shared-index closure bugs.

---

# 56. Debugging Rule — Prefer Capturing the Item

Instead of:

```js
for (
  let i = 0;
  i < users.length;
  i++
) {
  handlers.push(
    () =>
      users[i]
  );
}
```

often prefer:

```js
for (
  const user
  of users
) {
  // Step 1:
  handlers.push(
    () =>
      user
  );
}
```

Why?

```text
clearer intent
less index dependence
fewer off-by-one mistakes
```

---

# 57. `var` vs `let` Decision Guide 🔥🔥🔥

```text
Loop callback runs immediately?
→ var and let may appear same

Loop callback runs later?
→ closure behavior matters

var in loop?
→ usually one shared binding

let in classic for loop?
→ per-iteration binding

Need callback to remember current iteration?
→ prefer let

Need item itself?
→ prefer const with for...of

Legacy var code?
→ IIFE or function factory can fix it
```

---

# 58. Final Master Trace 🔥🔥🔥

Code:

```js
const varCallbacks =
  [];

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 1:
  varCallbacks.push(
    () =>
      i
  );
}

const letCallbacks =
  [];

for (
  let j = 0;
  j < 3;
  j++
) {
  // Step 2:
  letCallbacks.push(
    () =>
      j
  );
}

// Step 3:
console.log(
  varCallbacks[0]()
); // Output: 3

console.log(
  varCallbacks[1]()
); // Output: 3

console.log(
  varCallbacks[2]()
); // Output: 3

// Step 4:
console.log(
  letCallbacks[0]()
); // Output: 0

console.log(
  letCallbacks[1]()
); // Output: 1

console.log(
  letCallbacks[2]()
); // Output: 2
```

Output:

```text
3
3
3
0
1
2
```

Complete mental model:

```text
var loop
↓
one shared i
↓
loop ends with i = 3
↓
all closures read 3

let loop
↓
iteration 1 → j = 0
iteration 2 → j = 1
iteration 3 → j = 2
↓
each closure keeps its own binding
```

---

# Quick Memory 🧠🔥🔥🔥

## `var` Loop

```text
one shared binding
```

Classic output:

```text
3
3
3
```

## `let` Loop

```text
new binding per iteration
```

Classic output:

```text
0
1
2
```

## Why Timer Matters

```text
loop finishes first
↓
callbacks run later
```

## Why Closure Matters

```text
callbacks remember variables
from outer scope
```

## `var`

```text
all callbacks
→ same i
```

## `let`

```text
callback 1 → i = 0
callback 2 → i = 1
callback 3 → i = 2
```

## Legacy Fix

```text
IIFE
or
Function Factory
```

## Modern Rule

```text
Use let for changing loop index.

Use const in for...of
when each item itself does not need reassignment.
```

## Most Important Interview Answer

```text
var uses one shared loop binding,
while let creates a new binding
for each for-loop iteration.

Delayed callbacks close over those bindings,
which is why var often prints the final value
and let preserves each iteration value.
```

---

# ✅ 7.6 var vs let Loop Questions Complete

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

7.5 Closures

7.6 var vs let Loop Questions
    + var + setTimeout
    + let + setTimeout
    + Shared Binding
    + Per-Iteration Binding
    + Closure Fix
    + IIFE Fix
    + Function Factory Fix
    + Output Questions
```

Next topic:

```text
7.7 this 🔥🔥🔥
├── Global this
├── Regular Function
├── Object Method
├── Nested Function
├── Arrow Function
├── Constructor
├── Class
├── Event Handler Awareness
├── Lost this
└── Fixing this
```

**Next: 7.7 `this` 🔥🔥🔥**
