# 7.15 Memory Basics 🔥🔥🔥

JavaScript manages memory automatically.

You normally do **not** manually allocate and free memory like in lower-level languages.

But for interviews and debugging, you must understand:

```text
Where values conceptually live
How references work
What stays reachable
When objects become collectible
How garbage collection works
```

Master mental model:

```text
Primitive / local execution data
→ think Stack

Objects / Arrays / Functions
→ think Heap

Variables holding objects
→ hold references

Reachable object
→ must stay alive

Unreachable object
→ eligible for garbage collection
```

Important accuracy note:

```text
Stack and Heap are useful mental models.

The JavaScript specification does NOT require
engines to store every value exactly this way.

Real engines can optimize memory internally.
```

So for interviews:

```text
Use Stack / Heap as a conceptual model,
not as an absolute implementation guarantee.
```

This chapter covers:

```text
Stack / Heap Mental Model
Primitive Memory Awareness
Object Memory Awareness
References
Function Calls
Call Stack
Object Lifetime
Reachability
Roots
Garbage Collection
Mark-and-Sweep Mental Model
Removing References
Closures and Memory
Arrays and Objects
Circular References
Global References
Weak References Awareness
Memory Debugging Basics
Output Questions
Interview Questions
```

---

# 1. Why Do We Need to Understand Memory? 🔥🔥🔥

Because many JavaScript behaviors make more sense when you understand memory.

Examples:

```text
Why does changing one object affect another variable?

Why does a closure remember data?

Why can an object stay in memory?

Why does garbage collection happen automatically?

Why can memory leaks still happen?
```

Memory knowledge connects many topics we already learned.

---

# 2. JavaScript Manages Memory Automatically

In JavaScript, you normally write:

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

You do not manually write something like:

```text
allocate memory
free memory
```

The JavaScript engine manages that automatically.

---

# 3. High-Level Memory Lifecycle 🔥🔥🔥

Think of memory in three stages:

```text
1. Allocate
↓
2. Use
↓
3. Release when no longer reachable
```

Example:

```text
create object
↓
use object
↓
remove all useful references
↓
object becomes unreachable
↓
garbage collector may reclaim memory
```

---

# 4. Stack / Heap Mental Model 🔥🔥🔥

For interviews, a useful simplified model is:

```text
STACK
→ execution contexts
→ function-call data
→ local variables
→ primitive-like values/references

HEAP
→ objects
→ arrays
→ functions
→ dynamically allocated objects
```

Again:

```text
This is a mental model,
not a strict ECMAScript storage guarantee.
```

---

# 5. Stack Mental Model

Think of the stack as organized function-call memory.

Example:

```js
function add(
  a,
  b
) {
  // Step 1:
  const result =
    a + b;

  // Step 2:
  return result;
}

// Step 3:
console.log(
  add(
    10,
    20
  )
); // Output: 30
```

Output:

```text
30
```

Conceptually, while `add()` runs:

```text
Function Execution Context
a = 10
b = 20
result = 30
```

is associated with that function call.

---

# 6. Call Stack Connection 🔥🔥🔥

We already learned the Call Stack.

Example:

```js
function second() {
  // Step 1:
  return 20;
}

function first() {
  // Step 2:
  return second();
}

// Step 3:
console.log(
  first()
); // Output: 20
```

Output:

```text
20
```

Conceptual call stack:

```text
Global
↓
first()
↓
second()
```

Then:

```text
second finishes
↓
pop

first finishes
↓
pop
```

---

# 7. Heap Mental Model 🔥🔥🔥

Objects are conceptually stored in heap-like memory.

Example:

```js
// Step 1:
const user = {
  name: "Rahul",
  role: "Developer",
};

// Step 2:
console.log(
  user.role
); // Output: Developer
```

Output:

```text
Developer
```

Mental model:

```text
user variable
→ reference
→ Object A in heap-like memory
```

---

# 8. Primitive Mental Model

Example:

```js
// Step 1:
let age =
  30;

// Step 2:
let copy =
  age;

// Step 3:
copy =
  40;

// Step 4:
console.log(
  age
); // Output: 30
```

Output:

```text
30
```

For mental-model purposes:

```text
age
→ 30

copy
→ 30
```

Primitive values behave independently when copied.

---

# 9. Object Reference Mental Model 🔥🔥🔥

Example:

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second =
  first;

// Step 3:
second.name =
  "Amit";

// Step 4:
console.log(
  first.name
); // Output: Amit
```

Output:

```text
Amit
```

Memory model:

```text
first
  \
   → Object A
  /
second
```

One object.

Two references.

---

# 10. Variable Does Not Contain Entire Object Copy

For:

```js
const user = {
  name: "Rahul",
};
```

do not imagine:

```text
user variable literally contains
the whole object structure
inside the variable slot
```

Better mental model:

```text
user
→ reference
→ object
```

---

# 11. References Are Values Too 🔥🔥🔥

When we write:

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second =
  first;
```

JavaScript copies the reference value.

So:

```text
first reference
→ Object A

second gets copy of reference
→ Object A
```

This connects directly to pass-by-value.

---

# 12. Separate Objects Need Separate Memory

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second = {
  name: "Rahul",
};

// Step 3:
console.log(
  first === second
); // Output: false
```

Output:

```text
false
```

Mental model:

```text
first
→ Object A

second
→ Object B
```

Same content.

Different objects.

---

# 13. Arrays Are Objects in Memory 🔥🔥🔥

```js
// Step 1:
const numbers = [
  10,
  20,
  30,
];

// Step 2:
console.log(
  Array.isArray(
    numbers
  )
); // Output: true

// Step 3:
console.log(
  typeof numbers
); // Output: object
```

Output:

```text
true
object
```

Conceptually:

```text
numbers variable
→ reference
→ Array object
```

---

# 14. Functions Are Objects Too 🔥🔥🔥

```js
// Step 1:
function greet() {
  return "Hello";
}

// Step 2:
const another =
  greet;

// Step 3:
console.log(
  greet === another
); // Output: true
```

Output:

```text
true
```

Both variables refer to the same function object.

---

# 15. Function Calls Create Temporary Execution Data

Example:

```js
function calculate(
  price
) {
  // Step 1:
  const tax =
    price * 0.1;

  // Step 2:
  return (
    price + tax
  );
}

// Step 3:
console.log(
  calculate(
    100
  )
); // Output: 110
```

Output:

```text
110
```

While `calculate()` runs, its execution data is needed.

When the function finishes:

```text
normal call-frame data
can be removed
```

unless something remains reachable through a closure or another reference.

---

# 16. Function Call Finishes ≠ Every Related Value Immediately Disappears 🔥🔥🔥

Closures are the classic exception.

Example:

```js
function createCounter() {
  // Step 1:
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
```

Output:

```text
1
```

`createCounter()` finished.

But `count` is still needed by the returned function.

---

# 17. Closure Memory Mental Model 🔥🔥🔥

Conceptually:

```text
createCounter()
↓
creates count
↓
returns inner function
↓
inner function references count
↓
outer call finishes
BUT
count is still reachable
through closure
```

Therefore the engine keeps the needed lexical environment alive.

---

# 18. Reachability 🔥🔥🔥

Garbage collection is primarily about:

```text
reachability
```

Simple idea:

```text
Can the program still reach/use this object
through active references?
```

If yes:

```text
keep it
```

If no:

```text
it can become garbage-collectable
```

---

# 19. Reachable Object Example

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

`user` still references the object.

So the object is reachable.

---

# 20. Removing a Reference 🔥🔥🔥

```js
// Step 1:
let user = {
  name: "Rahul",
};

// Step 2:
user =
  null;

// Step 3:
console.log(
  user
); // Output: null
```

Output:

```text
null
```

If no other references point to the old object:

```text
old object becomes unreachable
```

and is eligible for garbage collection.

---

# 21. Eligible for GC Does NOT Mean Immediately Deleted 🔥🔥🔥

Very important.

When an object becomes unreachable:

```text
eligible for garbage collection
```

does NOT mean:

```text
memory is instantly freed
on that exact line
```

The engine decides when garbage collection runs.

---

# 22. Do Not Predict Exact GC Timing

You should not write logic that depends on:

```text
"this object will be collected right now"
```

Garbage collection timing is implementation-controlled.

Practical rule:

```text
Make unused objects unreachable.
Let the engine decide when to reclaim memory.
```

---

# 23. Multiple References Keep Object Alive 🔥🔥🔥

```js
// Step 1:
let first = {
  name: "Rahul",
};

// Step 2:
let second =
  first;

// Step 3:
first =
  null;

// Step 4:
console.log(
  second.name
); // Output: Rahul
```

Output:

```text
Rahul
```

The object is still reachable through `second`.

---

# 24. Remove the Last Reference

Continuing the mental model:

```text
first
→ null

second
→ Object A
```

Object A is still alive.

After:

```text
second = null
```

if there are no other references:

```text
Object A
→ unreachable
→ eligible for GC
```

---

# 25. Reference Graph Mental Model 🔥🔥🔥

Think of memory as a graph:

```text
root/reference
↓
Object A
↓
Object B
↓
Object C
```

If the chain is reachable:

```text
A, B, C
must stay alive
```

If the connection from roots disappears:

```text
those objects may become collectible
```

---

# 26. What Are Garbage Collector Roots? 🔥🔥🔥

High-level roots are starting points that the running program can still access.

Examples include things associated with:

```text
global environment
currently executing functions
active local variables
reachable closures
host/runtime references
```

Do not memorize engine-specific implementation details.

Understand:

```text
GC begins from known live roots
and follows references.
```

---

# 27. Global Variables Can Keep Objects Reachable

Example:

```js
// Step 1:
globalThis.appCache = {
  employees: [
    1,
    2,
    3,
  ],
};

// Step 2:
console.log(
  globalThis.appCache
    .employees
    .length
); // Output: 3
```

Output:

```text
3
```

As long as the global reference exists:

```text
appCache remains reachable
```

---

# 28. Local Object Can Become Unreachable After Function Ends

```js
function run() {
  // Step 1:
  const temporary = {
    value: 100,
  };

  // Step 2:
  console.log(
    temporary.value
  ); // Output: 100
}

// Step 3:
run();
```

Output:

```text
100
```

After `run()` finishes:

```text
temporary local binding is gone
```

If nothing else references the object:

```text
object becomes eligible for GC
```

---

# 29. Returning Object Keeps It Reachable 🔥🔥🔥

```js
function createUser() {
  // Step 1:
  const user = {
    name: "Rahul",
  };

  // Step 2:
  return user;
}

// Step 3:
const employee =
  createUser();

// Step 4:
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

The local variable `user` disappears after the function call.

But the object survives because:

```text
employee
→ same object
```

---

# 30. Object Lifetime Depends on Reachability, Not Original Scope 🔥🔥🔥

This is important.

An object created inside a function:

```text
does not automatically die
when function returns
```

If it is returned, stored, captured, or otherwise referenced:

```text
it remains reachable
```

---

# 31. Garbage Collection 🔥🔥🔥

Garbage collection means:

```text
automatically finding memory
that the program can no longer reach
and reclaiming it
```

JavaScript engines perform this automatically.

---

# 32. Mark-and-Sweep Mental Model 🔥🔥🔥

A common high-level garbage collection model is:

```text
1. Start from roots
2. Mark reachable objects
3. Follow their references
4. Mark everything reachable
5. Unmarked objects are unreachable
6. Reclaim their memory
```

This is a useful interview explanation.

---

# 33. Mark Phase Mental Model

Suppose:

```text
Root
↓
Object A
↓
Object B

Object C
```

If `C` is not connected to any root:

```text
A → marked
B → marked
C → not marked
```

Then:

```text
C can be collected
```

---

# 34. Sweep Phase Mental Model

After marking reachable objects:

```text
marked
→ keep

unmarked
→ reclaim
```

That gives the name:

```text
Mark and Sweep
```

Modern engines use more advanced strategies too, but this mental model is sufficient for interviews.

---

# 35. Circular References Are Not Automatically Memory Leaks 🔥🔥🔥

Old myths sometimes say:

```text
circular reference = memory leak
```

That is not generally true with modern tracing garbage collectors.

Example:

```js
// Step 1:
let first = {};

// Step 2:
let second = {};

// Step 3:
first.other =
  second;

// Step 4:
second.other =
  first;

// Step 5:
first =
  null;

// Step 6:
second =
  null;
```

Now the two objects reference each other.

But if nothing reachable references them:

```text
the cycle itself is unreachable
```

so it can be collected.

---

# 36. Circular Reference Mental Model 🔥🔥🔥

Before removing outer references:

```text
first → A ↔ B ← second
```

Reachable.

After:

```text
first = null
second = null
```

we get:

```text
A ↔ B
```

but no reachable root points to them.

Therefore:

```text
eligible for GC
```

---

# 37. Reachable Cycle Must Stay Alive

If a global variable still references the cycle:

```js
// Step 1:
const first = {};

// Step 2:
const second = {};

// Step 3:
first.other =
  second;

// Step 4:
second.other =
  first;

// Step 5:
globalThis.saved =
  first;
```

Then:

```text
globalThis.saved
→ first
→ second
→ first
```

The cycle remains reachable.

---

# 38. Removing Object Property Can Remove a Reference

```js
// Step 1:
const user = {
  profile: {
    city: "Pune",
  },
};

// Step 2:
delete user.profile;

// Step 3:
console.log(
  user.profile
); // Output: undefined
```

Output:

```text
undefined
```

If no other reference points to the old profile object:

```text
it may become unreachable
```

---

# 39. Replacing Nested Object Can Make Old Object Collectible

```js
// Step 1:
const user = {
  address: {
    city: "Pune",
  },
};

// Step 2:
user.address = {
  city: "Mumbai",
};

// Step 3:
console.log(
  user.address.city
); // Output: Mumbai
```

Output:

```text
Mumbai
```

The old address object may become unreachable if nothing else points to it.

---

# 40. Shared Nested Object Can Keep It Alive 🔥🔥🔥

```js
// Step 1:
const address = {
  city: "Pune",
};

// Step 2:
const user = {
  address,
};

// Step 3:
user.address = {
  city: "Mumbai",
};

// Step 4:
console.log(
  address.city
); // Output: Pune
```

Output:

```text
Pune
```

The original address still survives because:

```text
address variable
→ old object
```

---

# 41. Arrays Can Keep Objects Reachable 🔥🔥🔥

```js
// Step 1:
let employee = {
  name: "Rahul",
};

// Step 2:
const employees = [
  employee,
];

// Step 3:
employee =
  null;

// Step 4:
console.log(
  employees[0].name
); // Output: Rahul
```

Output:

```text
Rahul
```

The array still references the object.

---

# 42. Removing Array Entry Can Release a Reference

```js
// Step 1:
const employees = [
  {
    name: "Rahul",
  },
];

// Step 2:
employees.pop();

// Step 3:
console.log(
  employees.length
); // Output: 0
```

Output:

```text
0
```

If no other references exist:

```text
removed object may become eligible for GC
```

---

# 43. Map Can Keep Object Keys Reachable 🔥🔥

A normal `Map` strongly references its object keys.

```js
// Step 1:
let user = {
  id: 1,
};

// Step 2:
const map =
  new Map();

// Step 3:
map.set(
  user,
  "Employee"
);

// Step 4:
user =
  null;

// Step 5:
console.log(
  map.size
); // Output: 1
```

Output:

```text
1
```

The `Map` still holds the key object.

---

# 44. Set Can Keep Objects Reachable

```js
// Step 1:
let user = {
  id: 1,
};

// Step 2:
const set =
  new Set();

// Step 3:
set.add(
  user
);

// Step 4:
user =
  null;

// Step 5:
console.log(
  set.size
); // Output: 1
```

Output:

```text
1
```

The `Set` still holds the object reference.

---

# 45. WeakMap Awareness 🔥🔥

`WeakMap` is designed so its object keys do not prevent those keys from being garbage-collected.

High-level idea:

```text
Map
→ strong key reference

WeakMap
→ weak key reference
```

This is awareness-level for now.

---

# 46. WeakSet Awareness

Similarly:

```text
Set
→ strong references to objects

WeakSet
→ weak references to objects
```

Weak collections have special restrictions and are not general replacements for `Map` or `Set`.

---

# 47. Why Weak Collections Exist

A common use case is associating metadata with objects without forcing those objects to stay alive forever.

Mental model:

```text
object exists
↓
WeakMap can associate metadata

object becomes otherwise unreachable
↓
WeakMap should not keep it alive
```

---

# 48. Closures Can Intentionally Keep Data Alive 🔥🔥🔥

```js
function createEmployeeTracker() {
  // Step 1:
  const employees = [
    "Rahul",
    "Amit",
  ];

  // Step 2:
  return function () {
    return employees.length;
  };
}

// Step 3:
const getCount =
  createEmployeeTracker();

// Step 4:
console.log(
  getCount()
); // Output: 2
```

Output:

```text
2
```

The returned function needs `employees`.

Therefore:

```text
employees remains reachable
through closure
```

---

# 49. Closure Does NOT Automatically Mean Memory Leak

A closure retaining required data is normal.

Example:

```text
counter function needs count
→ count remains alive
→ correct behavior
```

A leak is when memory stays reachable longer than intended and is no longer useful.

We cover that deeply in **7.16 Common Memory Leaks**.

---

# 50. Closure Can Retain Large Objects — Preview 🔥🔥

Example:

```js
function createHandler() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "data"
    );

  // Step 2:
  return function () {
    return largeData.length;
  };
}

// Step 3:
const handler =
  createHandler();

// Step 4:
console.log(
  handler()
); // Output: 1000
```

Output:

```text
1000
```

Because the handler still needs `largeData`, that data stays reachable.

This is not automatically a bug.

---

# 51. Global References Usually Live a Long Time 🔥🔥🔥

Example:

```js
// Step 1:
globalThis.employeeCache = {
  data: [
    1,
    2,
    3,
  ],
};

// Step 2:
console.log(
  globalThis.employeeCache
    .data
    .length
); // Output: 3
```

Output:

```text
3
```

Globals can stay reachable for most or all of the application lifetime.

---

# 52. Local Variables Usually Have Shorter Lifetime

```js
function calculate() {
  // Step 1:
  const temporary =
    100;

  // Step 2:
  return (
    temporary * 2
  );
}

// Step 3:
console.log(
  calculate()
); // Output: 200
```

Output:

```text
200
```

After the function finishes, `temporary` is no longer needed.

---

# 53. Returned Primitive Does Not Keep Local Object Alive

```js
function getName() {
  // Step 1:
  const user = {
    name: "Rahul",
  };

  // Step 2:
  return user.name;
}

// Step 3:
const name =
  getName();

// Step 4:
console.log(
  name
); // Output: Rahul
```

Output:

```text
Rahul
```

After the function:

```text
name
→ primitive string
```

If nothing else references the `user` object:

```text
user object can become collectible
```

---

# 54. Returning Nested Object Keeps That Nested Object Alive 🔥🔥🔥

```js
function createData() {
  // Step 1:
  const user = {
    profile: {
      city: "Pune",
    },
  };

  // Step 2:
  return user.profile;
}

// Step 3:
const profile =
  createData();

// Step 4:
console.log(
  profile.city
); // Output: Pune
```

Output:

```text
Pune
```

The outer `user` object may become unnecessary.

But the returned `profile` object remains reachable.

---

# 55. Garbage Collector Follows Actual Reachability

It does not care that:

```text
profile originally came from user
```

It cares about the current reference graph.

If:

```text
profile variable
→ profile object
```

then that object is reachable.

---

# 56. Memory Is Not Just "Stack vs Heap" 🔥🔥🔥

Senior interview correction:

Do not say:

```text
all primitives are always physically on stack
and all objects are always physically on heap
in every JavaScript engine
```

That is too absolute.

Better answer:

```text
Stack/heap is a useful conceptual model.

Actual JavaScript engines may optimize,
box, unbox, inline, move, or represent values
differently internally.
```

---

# 57. Better Interview Stack / Heap Answer 🔥🔥🔥

Good answer:

```text
Conceptually, function execution and local call data
are associated with stack-like structures,
while objects are dynamically allocated
in heap-like memory.

Variables referring to objects hold reference values.

The exact physical representation
is engine-dependent.
```

That is much safer and more senior-level.

---

# 58. Garbage Collection Is Usually Generational — Awareness 🔥🔥

Modern engines often optimize GC based on an observation:

```text
many objects die young
few objects live a long time
```

So engines may divide memory into generations.

You do not need engine-specific details here.

Interview awareness:

```text
modern GC is more advanced
than one simple full mark-and-sweep pass
```

---

# 59. Young vs Long-Lived Objects — Mental Model

Example:

```text
temporary API transform object
→ may die quickly

global cache
→ may live much longer
```

Engines can optimize around different object lifetimes.

This is implementation awareness, not application logic.

---

# 60. Garbage Collection Can Cause Runtime Work

GC itself takes processing work.

Therefore:

```text
creating huge numbers of unnecessary objects
can increase garbage-collection pressure
```

But do not prematurely optimize normal object creation.

First focus on:

```text
correct code
appropriate data lifetime
avoiding real leaks
```

---

# 61. Memory Pressure vs Memory Leak 🔥🔥🔥

These are different.

Memory pressure:

```text
application legitimately uses a lot of memory
```

Memory leak:

```text
memory remains reachable
even though the application no longer needs it
```

An app can use a lot of memory without leaking.

---

# 62. Example of Temporary Memory Pressure

```js
function buildData() {
  // Step 1:
  const data =
    new Array(
      10000
    ).fill(
      0
    );

  // Step 2:
  return data.length;
}

// Step 3:
console.log(
  buildData()
); // Output: 10000
```

Output:

```text
10000
```

The large array is temporary.

If nothing retains it afterward:

```text
it can become collectible
```

---

# 63. Example of Long-Lived Reachability — Preview

```js
// Step 1:
const cache = [];

// Step 2:
function save(
  item
) {
  cache.push(
    item
  );
}

// Step 3:
save(
  {
    id: 1,
  }
);

// Step 4:
console.log(
  cache.length
); // Output: 1
```

Output:

```text
1
```

The object stays alive because `cache` still references it.

Whether this is correct or a leak depends on application intent.

---

# 64. Setting Variable to `null` Is Not Always Necessary 🔥🔥

Some developers write:

```text
variable = null
```

everywhere.

That is usually unnecessary for short-lived local variables.

When a local scope naturally ends and no references escape:

```text
the object can become unreachable automatically
```

Use explicit cleanup where a long-lived reference really needs to be released.

---

# 65. Useful Explicit Cleanup Case

Suppose a long-lived object holds a large temporary reference:

```js
// Step 1:
const state = {
  largeResult:
    new Array(
      1000
    ).fill(
      "data"
    ),
};

// Step 2:
state.largeResult =
  null;

// Step 3:
console.log(
  state.largeResult
); // Output: null
```

Output:

```text
null
```

If no other references exist, the old large array may now become collectible.

---

# 66. Garbage Collection Does Not Mean "Delete Variables"

GC primarily concerns memory occupied by unreachable dynamically managed values/objects.

Lexical bindings and execution contexts have their own lifetimes tied to execution and reachability.

For interviews, keep the explanation high-level:

```text
GC reclaims unreachable memory.
```

---

# 67. DevTools Memory Awareness 🔥🔥

When debugging memory issues in a browser, useful tools include:

```text
Memory snapshots
Heap snapshots
Allocation profiling
Retainers / reference paths
```

The key question is usually:

```text
What is still retaining this object?
```

We will use this mental model in the memory-leak chapter.

---

# 68. Retainer Mental Model 🔥🔥🔥

A retainer is something that still keeps an object reachable.

Example:

```text
global cache
↓
array
↓
employee object
```

If employee object should be gone, investigate:

```text
who is still pointing to it?
```

That is memory-debugging thinking.

---

# 69. Interview Output 1 — Shared Reference 🔥🔥🔥

```js
// Step 1:
let first = {
  value: 10,
};

// Step 2:
let second =
  first;

// Step 3:
first =
  null;

// Step 4:
console.log(
  second.value
);
```

Expected output:

```text
10
```

Why?

`second` still keeps the object reachable.

---

# 70. Interview Output 2 — Separate Objects

```js
// Step 1:
const first = {
  value: 10,
};

// Step 2:
const second = {
  value: 10,
};

// Step 3:
console.log(
  first === second
);
```

Expected output:

```text
false
```

Two different objects.

---

# 71. Interview Output 3 — Array Retains Object 🔥🔥🔥

```js
// Step 1:
let user = {
  name: "Rahul",
};

// Step 2:
const users = [
  user,
];

// Step 3:
user =
  null;

// Step 4:
console.log(
  users[0].name
);
```

Expected output:

```text
Rahul
```

The array still references the object.

---

# 72. Interview Output 4 — Closure Keeps State

```js
function createCounter() {
  // Step 1:
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
);

// Step 5:
console.log(
  counter()
);
```

Expected output:

```text
1
2
```

The closed-over `count` remains reachable.

---

# 73. Interview Output 5 — Map Retains Key 🔥🔥

```js
// Step 1:
let key = {
  id: 1,
};

// Step 2:
const map =
  new Map();

// Step 3:
map.set(
  key,
  "Employee"
);

// Step 4:
key =
  null;

// Step 5:
console.log(
  map.size
);
```

Expected output:

```text
1
```

The `Map` still retains the original key object.

---

# 74. Interview Question — Stack vs Heap 🔥🔥🔥

Good answer:

```text
Stack and heap are useful conceptual models.

Function-call execution data is often explained
with stack-like memory,
while objects are dynamically allocated
in heap-like memory.

Variables holding objects contain references.

Exact physical storage is engine-dependent.
```

---

# 75. Interview Question — What Is Reachability? 🔥🔥🔥

Good answer:

```text
Reachability means an object can still be accessed
through a chain of references
from live program roots.

Reachable objects must stay alive.

Unreachable objects become eligible
for garbage collection.
```

---

# 76. Interview Question — What Is Garbage Collection?

Good answer:

```text
Garbage collection is automatic memory management
that finds objects no longer reachable
by the running program
and reclaims their memory.
```

---

# 77. Interview Question — What Is Mark-and-Sweep? 🔥🔥🔥

Good answer:

```text
At a high level,
the collector starts from live roots,
marks everything reachable,
follows their references,
and treats unmarked objects as unreachable.

Those unreachable objects can then be reclaimed.
```

---

# 78. Interview Question — When Does GC Run?

Good answer:

```text
The JavaScript engine decides when GC runs.

Developers should not depend on
an exact garbage-collection time.

We make objects unreachable when no longer needed,
and the engine reclaims memory when appropriate.
```

---

# 79. Interview Question — Does `obj = null` Immediately Free Memory? 🔥🔥🔥

Good answer:

```text
No.

It only removes that particular reference.

If no other references remain,
the object becomes eligible for garbage collection.

Actual memory reclamation happens later
when the engine runs GC.
```

---

# 80. Interview Question — Are Circular References Memory Leaks?

Good answer:

```text
Not automatically.

Modern tracing garbage collectors
can collect circularly referenced objects
if the entire cycle is unreachable from live roots.

The problem is reachability,
not simply the existence of a cycle.
```

---

# 81. Interview Question — How Do Closures Affect Memory? 🔥🔥🔥

Good answer:

```text
A closure can keep outer variables reachable
after the outer function has finished.

That is normal and required behavior.

It becomes a problem only when large or unused data
is retained longer than intended.
```

---

# 82. Interview Question — Map vs WeakMap for Memory

Good answer:

```text
Map strongly retains object keys.

WeakMap does not prevent its object keys
from being garbage-collected
when they are otherwise unreachable.

WeakMap is useful for object-associated metadata
where key lifetime should control metadata lifetime.
```

---

# 83. Debugging Rule — Ask "Who Still References This?" 🔥🔥🔥

When an object should be gone but memory remains high:

```text
Do not only ask:
"Why didn't GC run?"

Ask:
"What is still keeping this object reachable?"
```

Look for:

```text
global variables
arrays
maps
caches
closures
event listeners
timers
DOM references
```

The last four get deeper treatment in the next chapter.

---

# 84. Memory Decision Guide 🔥🔥🔥

```text
Primitive copy?
→ independent primitive value

Object assignment?
→ copied reference value

Another reference still exists?
→ object stays reachable

No references remain?
→ object may become GC-eligible

Function returns object?
→ returned reference keeps object alive

Closure captures variable?
→ required data remains reachable

Array/Map/Set contains object?
→ collection can retain it

Need object-associated metadata
without forcing lifetime?
→ WeakMap awareness

Memory keeps growing?
→ inspect retainers/reference paths
```

---

# 85. Final Master Trace 🔥🔥🔥

```js
function createTracker() {
  // Step 1:
  const employees = [
    {
      id: 1,
      name: "Rahul",
    },
  ];

  // Step 2:
  return function () {
    return employees.length;
  };
}

// Step 3:
let tracker =
  createTracker();

// Step 4:
console.log(
  tracker()
); // Output: 1

// Step 5:
let user = {
  name: "Amit",
};

// Step 6:
const list = [
  user,
];

// Step 7:
user =
  null;

// Step 8:
console.log(
  list[0].name
); // Output: Amit

// Step 9:
list.pop();

// Step 10:
console.log(
  list.length
); // Output: 0

// Step 11:
tracker =
  null;

// Step 12:
console.log(
  tracker
); // Output: null
```

Output:

```text
1
Amit
0
null
```

Complete memory mental model:

```text
createTracker()
↓
employees created
↓
returned function captures employees
↓
tracker references returned function
↓
employees remains reachable through closure

user object created
↓
user variable references object
↓
list also references same object
↓
user = null
↓
object still reachable through list
↓
list.pop()
↓
if no other references exist,
object becomes GC-eligible

tracker = null
↓
returned function may become unreachable
↓
captured employees may also become unreachable
↓
memory can later be reclaimed by GC
```

---

# Quick Memory 🧠🔥🔥🔥

## Stack / Heap Mental Model

```text
Stack
→ function-call / execution data

Heap
→ objects / arrays / functions
```

But remember:

```text
conceptual model
not exact specification guarantee
```

## Primitive

```text
copy primitive value
```

## Object

```text
variable holds reference value
```

## Shared Object

```text
a
 \
  → object
 /
b
```

## Reachability

```text
still reachable
→ keep alive

unreachable
→ eligible for GC
```

## Garbage Collection

```text
automatic memory reclamation
for unreachable data
```

## Mark-and-Sweep Mental Model

```text
roots
↓
mark reachable
↓
follow references
↓
unmarked = unreachable
↓
reclaim
```

## `obj = null`

```text
removes one reference

does NOT guarantee
immediate memory release
```

## Multiple References

```text
one reference removed
+
another still exists
→ object stays alive
```

## Closure

```text
captured data
can remain reachable
after outer function returns
```

## Circular References

```text
cycle alone
≠ memory leak

reachable cycle
→ stays

unreachable cycle
→ collectible
```

## Map

```text
strongly holds object keys
```

## WeakMap

```text
does not keep key alive
by itself
```

## Memory Leak Mental Model

```text
unused data
+
still reachable
+
stays longer than intended
```

## Best Debugging Question

```text
Who is still retaining this object?
```

## Most Important Interview Answer

```text
JavaScript manages memory automatically.

A useful mental model is that
function execution uses stack-like memory
while objects live in heap-like memory,
although exact storage is engine-dependent.

Garbage collection is based on reachability:
objects reachable from live roots remain alive,
while unreachable objects become eligible
for garbage collection.
```

---

# ✅ 7.15 Memory Basics Complete

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
7.13 Reference Behaviour + Mutation + Immutability
7.14 Equality
7.15 Memory Basics
```

Next topic:

```text
7.16 Common Memory Leaks 🔥🔥🔥
├── Timers
├── Event Listeners
├── Closures
├── Global Variables
├── Caches
├── Detached DOM References
├── Subscription Cleanup
├── Debugging Memory Leaks
└── Interview Questions
```

**Next: 7.16 Common Memory Leaks 🔥🔥🔥**
