# 7.17 Internals Practical 🔥🔥🔥

This is the final practical chapter of **Section 7 — JavaScript Internals**.

The goal is not to learn a new theory topic.

The goal is to combine:

```text
Execution Context
Call Stack
Scope
Lexical Scope
Scope Chain
Hoisting
TDZ
Closures
var vs let
this
call / apply / bind
new
Prototype
Prototype Chain
Classes
Strict Mode
Reference Behaviour
Mutation
Equality
Memory
Memory Leaks
```

into real interview-style problems.

Master approach:

```text
1. Do NOT guess output
2. Identify declarations
3. Identify scope
4. Apply hoisting / TDZ rules
5. Trace execution order
6. Resolve this from call-site
7. Track references
8. Trace prototype lookup
9. Check reachability for memory questions
10. Then predict output
```

---

# PART A — EXECUTION + SCOPE + HOISTING + TDZ 🔥🔥🔥

# 1. Execution Order

Question:

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
function run() {
  console.log(
    "B"
  );
}

// Step 3:
run();

// Step 4:
console.log(
  "C"
);
```

Output:

```text
A
B
C
```

Explanation:

```text
Global code starts
↓
"A"

run() called
↓
new function execution context
↓
"B"

run() finishes
↓
"C"
```

---

# 2. Nested Function Call Stack

```js
function third() {
  // Step 1:
  console.log(
    "Third"
  );
}

function second() {
  // Step 2:
  console.log(
    "Second Start"
  );

  // Step 3:
  third();

  // Step 4:
  console.log(
    "Second End"
  );
}

function first() {
  // Step 5:
  console.log(
    "First Start"
  );

  // Step 6:
  second();

  // Step 7:
  console.log(
    "First End"
  );
}

// Step 8:
first();
```

Output:

```text
First Start
Second Start
Third
Second End
First End
```

Call stack:

```text
Global
↓
first
↓
second
↓
third
```

Then functions pop in reverse order.

---

# 3. Lexical Scope

```js
// Step 1:
const company =
  "ABC";

function outer() {
  // Step 2:
  const department =
    "IT";

  function inner() {
    // Step 3:
    console.log(
      company
    ); // Output: ABC

    // Step 4:
    console.log(
      department
    ); // Output: IT
  }

  // Step 5:
  inner();
}

// Step 6:
outer();
```

Output:

```text
ABC
IT
```

Why?

```text
inner
↓
search own scope
↓
outer scope
↓
global scope
```

---

# 4. Scope Shadowing 🔥🔥🔥

```js
// Step 1:
const name =
  "Global";

function run() {
  // Step 2:
  const name =
    "Local";

  // Step 3:
  console.log(
    name
  );
}

// Step 4:
run();

// Step 5:
console.log(
  name
);
```

Output:

```text
Local
Global
```

The local binding shadows the global one.

---

# 5. Block Scope

```js
// Step 1:
let value =
  10;

if (
  true
) {
  // Step 2:
  let value =
    20;

  // Step 3:
  console.log(
    value
  );
}

// Step 4:
console.log(
  value
);
```

Output:

```text
20
10
```

---

# 6. `var` Is Not Block Scoped 🔥🔥🔥

```js
function run() {
  if (
    true
  ) {
    // Step 1:
    var value =
      20;
  }

  // Step 2:
  console.log(
    value
  );
}

// Step 3:
run();
```

Output:

```text
20
```

`var` is function-scoped.

---

# 7. `var` Hoisting

```js
function run() {
  // Step 1:
  console.log(
    value
  );

  // Step 2:
  var value =
    10;

  // Step 3:
  console.log(
    value
  );
}

// Step 4:
run();
```

Output:

```text
undefined
10
```

Mental transformation:

```text
var value
→ binding exists at function start
→ initialized with undefined

later:
value = 10
```

---

# 8. `let` TDZ 🔥🔥🔥

```js
function run() {
  try {
    // Step 1:
    console.log(
      value
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.name
    );
  }

  // Step 3:
  let value =
    10;
}

// Step 4:
run();
```

Output:

```text
ReferenceError
```

`value` exists in the scope but is inside the TDZ before initialization.

---

# 9. `const` TDZ

```js
function run() {
  try {
    // Step 1:
    console.log(
      role
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.name
    );
  }

  // Step 3:
  const role =
    "Developer";
}

// Step 4:
run();
```

Output:

```text
ReferenceError
```

---

# 10. Function Declaration Hoisting 🔥🔥🔥

```js
// Step 1:
console.log(
  greet()
);

// Step 2:
function greet() {
  return "Hello";
}
```

Output:

```text
Hello
```

Function declaration is available before its source line executes.

---

# 11. Function Expression With `var`

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

Output:

```text
TypeError
```

Why?

```text
greet
→ hoisted
→ initialized undefined

undefined()
→ TypeError
```

---

# 12. Arrow Function With `let` 🔥🔥🔥

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
let greet =
  () => {
    return "Hello";
  };
```

Output:

```text
ReferenceError
```

Because `greet` is in the TDZ.

---

# 13. Shadowing + TDZ Trap 🔥🔥🔥

```js
// Step 1:
const value =
  10;

function run() {
  try {
    // Step 2:
    console.log(
      value
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.name
    );
  }

  // Step 4:
  let value =
    20;
}

// Step 5:
run();
```

Output:

```text
ReferenceError
```

Why doesn't it print global `10`?

Because the local `value` shadows the global binding for the entire local scope.

Before local initialization:

```text
local value
→ TDZ
```

JavaScript does not skip it and search global scope.

---

# PART B — CLOSURES + VAR/LET LOOP QUESTIONS 🔥🔥🔥

# 14. Basic Closure

```js
function outer() {
  // Step 1:
  const name =
    "Rahul";

  // Step 2:
  return function inner() {
    return name;
  };
}

// Step 3:
const getName =
  outer();

// Step 4:
console.log(
  getName()
);
```

Output:

```text
Rahul
```

The inner function retains access to `name`.

---

# 15. Closure State Persistence 🔥🔥🔥

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

// Step 6:
console.log(
  counter()
);
```

Output:

```text
1
2
3
```

---

# 16. Separate Closure Instances

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
const first =
  createCounter();

// Step 4:
const second =
  createCounter();

// Step 5:
console.log(
  first()
);

// Step 6:
console.log(
  first()
);

// Step 7:
console.log(
  second()
);
```

Output:

```text
1
2
1
```

Each outer call creates a fresh lexical environment.

---

# 17. Shared Closure State 🔥🔥🔥

```js
function createStore() {
  // Step 1:
  let value =
    0;

  // Step 2:
  return {
    increment() {
      value++;
    },

    getValue() {
      return value;
    },
  };
}

// Step 3:
const store =
  createStore();

// Step 4:
store.increment();

// Step 5:
store.increment();

// Step 6:
console.log(
  store.getValue()
);
```

Output:

```text
2
```

Both methods close over the same `value`.

---

# 18. `var` Loop + Stored Closures 🔥🔥🔥

```js
// Step 1:
const functions = [];

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 2:
  functions.push(
    function () {
      return i;
    }
  );
}

// Step 3:
console.log(
  functions[0]()
);

// Step 4:
console.log(
  functions[1]()
);

// Step 5:
console.log(
  functions[2]()
);
```

Output:

```text
3
3
3
```

All closures share the same `i` binding.

---

# 19. `let` Loop + Stored Closures 🔥🔥🔥

```js
// Step 1:
const functions = [];

for (
  let i = 0;
  i < 3;
  i++
) {
  // Step 2:
  functions.push(
    function () {
      return i;
    }
  );
}

// Step 3:
console.log(
  functions[0]()
);

// Step 4:
console.log(
  functions[1]()
);

// Step 5:
console.log(
  functions[2]()
);
```

Output:

```text
0
1
2
```

Classic `for` with `let` creates a per-iteration binding.

---

# 20. Fix `var` Loop With IIFE

```js
// Step 1:
const functions = [];

for (
  var i = 0;
  i < 3;
  i++
) {
  // Step 2:
  (
    function (
      current
    ) {
      functions.push(
        function () {
          return current;
        }
      );
    }
  )(
    i
  );
}

// Step 3:
console.log(
  functions[0]()
);

// Step 4:
console.log(
  functions[1]()
);

// Step 5:
console.log(
  functions[2]()
);
```

Output:

```text
0
1
2
```

Each IIFE call gets its own `current` binding.

---

# PART C — `this` + CALL/APPLY/BIND 🔥🔥🔥

# 21. Object Method `this`

```js
// Step 1:
const employee = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

// Step 2:
console.log(
  employee.showName()
);
```

Output:

```text
Rahul
```

Call-site:

```text
employee.showName()
```

Receiver:

```text
employee
```

Therefore:

```text
this = employee
```

---

# 22. Detached Method 🔥🔥🔥

```js
"use strict";

// Step 1:
const employee = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

// Step 2:
const fn =
  employee.showName;

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

Output:

```text
TypeError
```

The method was detached.

---

# 23. Fix Detached Method With `bind()`

```js
"use strict";

// Step 1:
const employee = {
  name: "Rahul",

  showName() {
    return this.name;
  },
};

// Step 2:
const fn =
  employee.showName.bind(
    employee
  );

// Step 3:
console.log(
  fn()
);
```

Output:

```text
Rahul
```

---

# 24. Nested Regular Function Loses Method `this` 🔥🔥🔥

```js
"use strict";

// Step 1:
const employee = {
  name: "Rahul",

  show() {
    function inner() {
      return this;
    }

    return inner();
  },
};

// Step 2:
console.log(
  employee.show()
);
```

Output:

```text
undefined
```

`inner()` is a standalone regular-function call.

---

# 25. Arrow Captures Outer `this`

```js
// Step 1:
const employee = {
  name: "Rahul",

  show() {
    const inner =
      () => {
        return this.name;
      };

    return inner();
  },
};

// Step 2:
console.log(
  employee.show()
);
```

Output:

```text
Rahul
```

Arrow gets lexical `this` from `show()`.

---

# 26. Arrow as Object Property Trap 🔥🔥🔥

```js
"use strict";

// Step 1:
const outerThis =
  this;

// Step 2:
const employee = {
  name: "Rahul",

  showName:
    () => {
      return this;
    },
};

// Step 3:
console.log(
  employee.showName()
  ===
  outerThis
);
```

Output:

```text
true
```

Important:

```text
arrow function
does NOT get this
from employee.showName()
```

It uses lexical `this`.

---

# 27. `call()`

```js
function show(
  prefix
) {
  // Step 1:
  return (
    `${prefix} ${this.name}`
  );
}

// Step 2:
const employee = {
  name: "Rahul",
};

// Step 3:
console.log(
  show.call(
    employee,
    "Hello"
  )
);
```

Output:

```text
Hello Rahul
```

---

# 28. `apply()`

```js
function total(
  a,
  b
) {
  // Step 1:
  return (
    this.base
    +
    a
    +
    b
  );
}

// Step 2:
const context = {
  base: 10,
};

// Step 3:
console.log(
  total.apply(
    context,
    [
      20,
      30,
    ]
  )
);
```

Output:

```text
60
```

---

# 29. `bind()` Returns a New Function 🔥🔥🔥

```js
function show() {
  // Step 1:
  return this.name;
}

// Step 2:
const employee = {
  name: "Rahul",
};

// Step 3:
const bound =
  show.bind(
    employee
  );

// Step 4:
console.log(
  typeof bound
);

// Step 5:
console.log(
  bound()
);
```

Output:

```text
function
Rahul
```

---

# 30. Bound `this` Cannot Be Replaced 🔥🔥🔥

```js
function show() {
  // Step 1:
  return this.name;
}

// Step 2:
const first = {
  name: "Rahul",
};

// Step 3:
const second = {
  name: "Amit",
};

// Step 4:
const bound =
  show.bind(
    first
  );

// Step 5:
console.log(
  bound.call(
    second
  )
);
```

Output:

```text
Rahul
```

The bound `this` remains `first`.

---

# PART D — `new` + PROTOTYPES + CLASSES 🔥🔥🔥

# 31. `new` Basic Trace

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
const employee =
  new Employee(
    "Rahul"
  );

// Step 3:
console.log(
  employee.name
);

// Step 4:
console.log(
  employee
  instanceof
  Employee
);
```

Output:

```text
Rahul
true
```

Mental flow:

```text
new
↓
create object
↓
link prototype
↓
call constructor with this = new object
↓
return object
```

---

# 32. Constructor Returning Primitive 🔥🔥🔥

```js
function Employee() {
  // Step 1:
  this.name =
    "Rahul";

  // Step 2:
  return 100;
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.name
);
```

Output:

```text
Rahul
```

Primitive return is ignored by `new`.

---

# 33. Constructor Returning Object

```js
function Employee() {
  // Step 1:
  this.name =
    "Rahul";

  // Step 2:
  return {
    name: "Amit",
  };
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.name
);

// Step 5:
console.log(
  employee
  instanceof
  Employee
);
```

Output:

```text
Amit
false
```

Explicit returned object replaces the newly created instance.

---

# 34. Prototype Method Sharing 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
Employee.prototype.showName =
  function () {
    return this.name;
  };

// Step 3:
const first =
  new Employee(
    "Rahul"
  );

// Step 4:
const second =
  new Employee(
    "Amit"
  );

// Step 5:
console.log(
  first.showName
  ===
  second.showName
);
```

Output:

```text
true
```

Both instances use the same prototype method.

---

# 35. Own Property Shadows Prototype Property

```js
function Employee() {
  // Step 1:
}

// Step 2:
Employee.prototype.role =
  "Developer";

// Step 3:
const employee =
  new Employee();

// Step 4:
employee.role =
  "Lead";

// Step 5:
console.log(
  employee.role
);

// Step 6:
console.log(
  Employee.prototype.role
);
```

Output:

```text
Lead
Developer
```

Own property is found before prototype property.

---

# 36. Delete Own Property Reveals Prototype 🔥🔥🔥

```js
function Employee() {
  // Step 1:
}

// Step 2:
Employee.prototype.role =
  "Developer";

// Step 3:
const employee =
  new Employee();

// Step 4:
employee.role =
  "Lead";

// Step 5:
delete employee.role;

// Step 6:
console.log(
  employee.role
);
```

Output:

```text
Developer
```

Lookup falls back to prototype.

---

# 37. `Object.create()`

```js
// Step 1:
const base = {
  role: "Developer",
};

// Step 2:
const employee =
  Object.create(
    base
  );

// Step 3:
employee.name =
  "Rahul";

// Step 4:
console.log(
  employee.name
);

// Step 5:
console.log(
  employee.role
);
```

Output:

```text
Rahul
Developer
```

---

# 38. Class Method Sharing 🔥🔥🔥

```js
class Employee {
  // Step 1:
  show() {
    return "Hello";
  }
}

// Step 2:
const first =
  new Employee();

// Step 3:
const second =
  new Employee();

// Step 4:
console.log(
  first.show
  ===
  second.show
);
```

Output:

```text
true
```

Normal class methods live on the prototype.

---

# 39. Class Inheritance

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

class Employee
  extends Person {
  // Step 2:
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
);

// Step 5:
console.log(
  employee
  instanceof
  Person
);
```

Output:

```text
Hello
true
```

---

# 40. Method Override + `super()` 🔥🔥🔥

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

class Employee
  extends Person {
  // Step 2:
  greet() {
    return (
      `${super.greet()} Rahul`
    );
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
);
```

Output:

```text
Hello Rahul
```

---

# PART E — STRICT MODE + REFERENCES + EQUALITY 🔥🔥🔥

# 41. Strict Mode Accidental Global

```js
function run() {
  // Step 1:
  "use strict";

  try {
    // Step 2:
    salary =
      50000;
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

Output:

```text
ReferenceError
```

---

# 42. Strict Mode Standalone `this`

```js
function showThis() {
  // Step 1:
  "use strict";

  // Step 2:
  return this;
}

// Step 3:
console.log(
  showThis()
);
```

Output:

```text
undefined
```

---

# 43. Primitive Copy

```js
// Step 1:
let first =
  10;

// Step 2:
let second =
  first;

// Step 3:
second =
  20;

// Step 4:
console.log(
  first
);
```

Output:

```text
10
```

---

# 44. Shared Object Reference 🔥🔥🔥

```js
// Step 1:
const first = {
  value: 10,
};

// Step 2:
const second =
  first;

// Step 3:
second.value =
  20;

// Step 4:
console.log(
  first.value
);
```

Output:

```text
20
```

---

# 45. Shallow Copy Trap

```js
// Step 1:
const original = {
  address: {
    city: "Pune",
  },
};

// Step 2:
const copy = {
  ...original,
};

// Step 3:
copy.address.city =
  "Mumbai";

// Step 4:
console.log(
  original.address.city
);
```

Output:

```text
Mumbai
```

Spread copied the nested reference.

---

# 46. Correct Nested Immutable Update 🔥🔥🔥

```js
// Step 1:
const original = {
  address: {
    city: "Pune",
  },
};

// Step 2:
const updated = {
  ...original,

  address: {
    ...original.address,
    city: "Mumbai",
  },
};

// Step 3:
console.log(
  original.address.city
);

// Step 4:
console.log(
  updated.address.city
);
```

Output:

```text
Pune
Mumbai
```

---

# 47. Parameter Mutation vs Reassignment 🔥🔥🔥

```js
function update(
  object
) {
  // Step 1:
  object.value =
    20;

  // Step 2:
  object = {
    value: 30,
  };

  // Step 3:
  console.log(
    object.value
  );
}

// Step 4:
const data = {
  value: 10,
};

// Step 5:
update(
  data
);

// Step 6:
console.log(
  data.value
);
```

Output:

```text
30
20
```

Trace:

```text
parameter initially points to same object
↓
mutation changes original to 20
↓
parameter reassigned to new object
↓
new object value = 30
↓
caller still points to original object
↓
original remains 20
```

---

# 48. Object Equality

```js
// Step 1:
const first = {
  id: 1,
};

// Step 2:
const second = {
  id: 1,
};

// Step 3:
const third =
  first;

// Step 4:
console.log(
  first === second
);

// Step 5:
console.log(
  first === third
);
```

Output:

```text
false
true
```

---

# 49. `==` vs `===` 🔥🔥🔥

```js
// Step 1:
console.log(
  10 == "10"
);

// Step 2:
console.log(
  10 === "10"
);

// Step 3:
console.log(
  null == undefined
);

// Step 4:
console.log(
  null === undefined
);
```

Output:

```text
true
false
true
false
```

---

# 50. `NaN` + `Object.is()` 🔥🔥🔥

```js
// Step 1:
console.log(
  NaN === NaN
);

// Step 2:
console.log(
  Number.isNaN(
    NaN
  )
);

// Step 3:
console.log(
  Object.is(
    NaN,
    NaN
  )
);
```

Output:

```text
false
true
true
```

---

# PART F — MEMORY + MEMORY LEAK DEBUGGING 🔥🔥🔥

# 51. Multiple References and Reachability

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
);
```

Output:

```text
Rahul
```

The object stays reachable through `second`.

---

# 52. Array Retains Object 🔥🔥🔥

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
);
```

Output:

```text
Rahul
```

---

# 53. Map Retains Object Key

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

Output:

```text
1
```

The `Map` still strongly retains the key object.

---

# 54. Closure Retention 🔥🔥🔥

```js
function createHandler() {
  // Step 1:
  const data =
    new Array(
      3
    ).fill(
      "employee"
    );

  // Step 2:
  return function () {
    return data.length;
  };
}

// Step 3:
const handler =
  createHandler();

// Step 4:
console.log(
  handler()
);
```

Output:

```text
3
```

The closure keeps `data` reachable.

---

# 55. Find the Memory Leak — Timer 🔥🔥🔥

Problem:

```js
function startPolling() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "data"
    );

  // Step 2:
  setInterval(
    () => {
      console.log(
        largeData.length
      );
    },
    1000
  );
}
```

Problem:

```text
interval handle is not stored
↓
cannot easily clear interval
↓
callback remains registered
↓
largeData remains reachable
```

Better:

```js
function startPolling() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "data"
    );

  // Step 2:
  const intervalId =
    setInterval(
      () => {
        console.log(
          largeData.length
        );
      },
      1000
    );

  // Step 3:
  return function cleanup() {
    clearInterval(
      intervalId
    );
  };
}
```

---

# 56. Find the Memory Leak — Event Listener 🔥🔥🔥

Problem:

```js
function setup() {
  // Step 1:
  window.addEventListener(
    "resize",
    () => {
      console.log(
        window.innerWidth
      );
    }
  );
}
```

Why difficult to clean?

```text
anonymous callback reference
was not stored
```

Better:

```js
function setup() {
  // Step 1:
  const handleResize =
    () => {
      console.log(
        window.innerWidth
      );
    };

  // Step 2:
  window.addEventListener(
    "resize",
    handleResize
  );

  // Step 3:
  return function cleanup() {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}
```

---

# 57. Find the Memory Leak — Unbounded Cache

Problem:

```js
// Step 1:
const cache =
  new Map();

// Step 2:
function save(
  id,
  data
) {
  cache.set(
    id,
    data
  );
}
```

If called forever with unique IDs:

```text
cache keeps growing
```

Possible strategy:

```js
// Step 1:
const cache =
  new Map();

// Step 2:
const MAX_SIZE =
  100;

// Step 3:
function save(
  id,
  data
) {
  cache.set(
    id,
    data
  );

  // Step 4:
  if (
    cache.size
    >
    MAX_SIZE
  ) {
    const firstKey =
      cache.keys().next().value;

    cache.delete(
      firstKey
    );
  }
}
```

This is a simple bounded example, not a full LRU implementation.

---

# 58. Find the Memory Leak — Subscription 🔥🔥🔥

```js
// Step 1:
const listeners =
  new Set();

// Step 2:
function subscribe(
  callback
) {
  listeners.add(
    callback
  );

  // Step 3:
  return function unsubscribe() {
    listeners.delete(
      callback
    );
  };
}

// Step 4:
const unsubscribe =
  subscribe(
    () => {
      console.log(
        "Changed"
      );
    }
  );

// Step 5:
console.log(
  listeners.size
); // Output: 1

// Step 6:
unsubscribe();

// Step 7:
console.log(
  listeners.size
); // Output: 0
```

Output:

```text
1
0
```

Cleanup removes the retained callback.

---

# PART G — FINAL MIXED INTERVIEW QUESTIONS 🔥🔥🔥

# 59. Mixed Output — Scope + Closure

```js
// Step 1:
let value =
  10;

function outer() {
  // Step 2:
  let value =
    20;

  // Step 3:
  return function () {
    return value;
  };
}

// Step 4:
const fn =
  outer();

// Step 5:
value =
  30;

// Step 6:
console.log(
  fn()
);
```

Output:

```text
20
```

Why?

The closure resolves `value` lexically from `outer`, not from global scope.

---

# 60. Mixed Output — Closure Tracks Binding 🔥🔥🔥

```js
function outer() {
  // Step 1:
  let value =
    10;

  // Step 2:
  const getValue =
    () => {
      return value;
    };

  // Step 3:
  value =
    20;

  // Step 4:
  return getValue;
}

// Step 5:
const fn =
  outer();

// Step 6:
console.log(
  fn()
);
```

Output:

```text
20
```

Closure captures the binding, not a frozen copy of `10`.

---

# 61. Mixed Output — Hoisting + Scope 🔥🔥🔥

```js
// Step 1:
var value =
  10;

function run() {
  // Step 2:
  console.log(
    value
  );

  // Step 3:
  var value =
    20;

  // Step 4:
  console.log(
    value
  );
}

// Step 5:
run();

// Step 6:
console.log(
  value
);
```

Output:

```text
undefined
20
10
```

Local `var value` shadows global `value`.

---

# 62. Mixed Output — TDZ + Shadowing

```js
// Step 1:
let value =
  10;

function run() {
  try {
    // Step 2:
    console.log(
      value
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.name
    );
  }

  // Step 4:
  let value =
    20;
}

// Step 5:
run();
```

Output:

```text
ReferenceError
```

---

# 63. Mixed Output — `this` + Arrow 🔥🔥🔥

```js
// Step 1:
const employee = {
  name: "Rahul",

  show() {
    const arrow =
      () => {
        return this.name;
      };

    return arrow();
  },
};

// Step 2:
console.log(
  employee.show()
);
```

Output:

```text
Rahul
```

---

# 64. Mixed Output — `bind()` + Object Mutation

```js
function show() {
  // Step 1:
  return this.name;
}

// Step 2:
const employee = {
  name: "Rahul",
};

// Step 3:
const bound =
  show.bind(
    employee
  );

// Step 4:
employee.name =
  "Amit";

// Step 5:
console.log(
  bound()
);
```

Output:

```text
Amit
```

Important:

```text
bind fixes the object reference used as this
```

It does NOT freeze the object's properties.

---

# 65. Mixed Output — Prototype Dynamic Lookup 🔥🔥🔥

```js
function Employee() {
  // Step 1:
}

// Step 2:
Employee.prototype.role =
  "Developer";

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.role
);

// Step 5:
Employee.prototype.role =
  "Lead";

// Step 6:
console.log(
  employee.role
);
```

Output:

```text
Developer
Lead
```

The instance reads the prototype property dynamically because it has no own `role`.

---

# 66. Mixed Output — Own Property Stops Prototype Change

```js
function Employee() {
  // Step 1:
}

// Step 2:
Employee.prototype.role =
  "Developer";

// Step 3:
const employee =
  new Employee();

// Step 4:
employee.role =
  "Manager";

// Step 5:
Employee.prototype.role =
  "Lead";

// Step 6:
console.log(
  employee.role
);
```

Output:

```text
Manager
```

Own property wins.

---

# 67. Mixed Output — Reference + Equality 🔥🔥🔥

```js
// Step 1:
const first = {
  id: 1,
};

// Step 2:
const second =
  first;

// Step 3:
const third = {
  id: 1,
};

// Step 4:
console.log(
  first === second
);

// Step 5:
console.log(
  first === third
);

// Step 6:
console.log(
  first.id
  ===
  third.id
);
```

Output:

```text
true
false
true
```

---

# 68. Mixed Output — Shallow Copy + Equality 🔥🔥🔥

```js
// Step 1:
const original = {
  nested: {
    value: 10,
  },
};

// Step 2:
const copy = {
  ...original,
};

// Step 3:
console.log(
  original === copy
);

// Step 4:
console.log(
  original.nested
  ===
  copy.nested
);
```

Output:

```text
false
true
```

---

# 69. Mixed Output — `Object.is()` Trap

```js
// Step 1:
console.log(
  NaN === NaN
);

// Step 2:
console.log(
  Object.is(
    NaN,
    NaN
  )
);

// Step 3:
console.log(
  +0 === -0
);

// Step 4:
console.log(
  Object.is(
    +0,
    -0
  )
);
```

Output:

```text
false
true
true
false
```

---

# 70. Mixed Output — Class + Detached Method 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
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

try {
  // Step 5:
  fn();
} catch (
  error
) {
  // Step 6:
  console.log(
    error.name
  );
}
```

Output:

```text
TypeError
```

Class methods use strict semantics.

---

# 71. Mixed Output — `super()` + Override

```js
class Person {
  // Step 1:
  describe() {
    return "Person";
  }
}

class Employee
  extends Person {
  // Step 2:
  describe() {
    return (
      `${super.describe()} Employee`
    );
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.describe()
);
```

Output:

```text
Person Employee
```

---

# 72. Mixed Debugging — Wrong Assumption About `const` 🔥🔥🔥

Code:

```js
// Step 1:
const employee = {
  name: "Rahul",
};

// Step 2:
employee.name =
  "Amit";

// Step 3:
console.log(
  employee.name
);
```

Output:

```text
Amit
```

Correct explanation:

```text
const prevents rebinding employee
but does not freeze the object
```

---

# 73. Mixed Debugging — Wrong Deep Copy Assumption

Code:

```js
// Step 1:
const first = {
  address: {
    city: "Pune",
  },
};

// Step 2:
const second = {
  ...first,
};

// Step 3:
second.address.city =
  "Mumbai";

// Step 4:
console.log(
  first.address.city
);
```

Output:

```text
Mumbai
```

Bug:

```text
spread is shallow
```

---

# 74. Mixed Debugging — Wrong `removeEventListener()` 🔥🔥🔥

Wrong:

```js
// Step 1:
window.addEventListener(
  "resize",
  () => {
    console.log(
      "Resize"
    );
  }
);

// Step 2:
window.removeEventListener(
  "resize",
  () => {
    console.log(
      "Resize"
    );
  }
);
```

Problem:

```text
two different function references
```

Correct:

```js
// Step 1:
const handleResize =
  () => {
    console.log(
      "Resize"
    );
  };

// Step 2:
window.addEventListener(
  "resize",
  handleResize
);

// Step 3:
window.removeEventListener(
  "resize",
  handleResize
);
```

---

# 75. Mixed Debugging — Constructor Without `new`

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
  );
}
```

Output:

```text
TypeError
```

Fix:

```js
// Step 1:
const employee =
  new Employee(
    "Rahul"
  );
```

---

# PART H — EXPLAIN WHILE CODING 🔥🔥🔥

# 76. How to Explain a Hoisting Question

Use this format:

```text
1. Identify declaration type
2. var → initialized undefined
3. let/const → TDZ
4. function declaration → callable
5. expression depends on its variable declaration
6. Then trace execution
```

Example:

```js
try {
  // Step 1:
  console.log(
    value
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  );
}

// Step 3:
let value =
  10;
```

Explain:

```text
value is a let binding
↓
binding exists
↓
not initialized yet
↓
access occurs in TDZ
↓
ReferenceError
```

---

# 77. How to Explain a Closure Question

Use:

```text
1. Which inner function survives?
2. Which outer variables does it reference?
3. Which lexical environment does it belong to?
4. Are bindings shared or fresh?
5. Then calculate output
```

---

# 78. How to Explain a `this` Question 🔥🔥🔥

Use this order:

```text
1. Is it an arrow?
2. If arrow → lexical this
3. If regular function → inspect call-site
4. obj.fn() → this = obj
5. fn() strict → this = undefined
6. call/apply/bind → explicit binding
7. new → new instance
```

Do not start by asking:

```text
Where was the function written?
```

for a normal regular-function `this` question.

Call-site is the key.

---

# 79. How to Explain a Prototype Question

Use:

```text
1. Check own property
2. If missing → object's prototype
3. Continue prototype chain
4. Stop when found
5. Or stop at null
```

Mental lookup:

```text
employee.property
↓
employee own property?
↓ no
Employee.prototype?
↓ no
Object.prototype?
↓ no
null
↓
undefined
```

---

# 80. How to Explain a Reference Question 🔥🔥🔥

Ask:

```text
Same object?
or
different object?
```

Then trace references.

Example mental model:

```text
a = object
b = a

a
 \
  → Object A
 /
b
```

If `b.x` changes:

```text
Object A changes
```

So `a.x` also sees the change.

---

# 81. How to Explain a Memory Leak Question

Use:

```text
1. What object should be dead?
2. What still references it?
3. Trace the retainer chain
4. Which lifecycle cleanup is missing?
5. Remove that reference/resource
```

Example:

```text
window
↓
resize listener
↓
callback
↓
closure
↓
component data
```

Fix:

```text
removeEventListener
```

at the correct lifecycle point.

---

# PART I — RAPID INTERVIEW ROUND 🔥🔥🔥

# 82. What Is an Execution Context?

Answer:

```text
An execution context is the environment
JavaScript creates to execute code.

It tracks things such as variables,
function declarations,
scope information,
and execution state.
```

---

# 83. What Is the Call Stack?

Answer:

```text
The call stack tracks active function calls.

When a function is called,
its execution context is pushed.

When it finishes,
it is popped.
```

---

# 84. What Is Lexical Scope?

Answer:

```text
Lexical scope means variable accessibility
is determined by where functions/scopes
are written in the source code.
```

---

# 85. What Is Hoisting?

Answer:

```text
Hoisting describes how declarations
are processed before normal execution.

var is initialized with undefined.

let and const exist but stay in TDZ.

Function declarations are available
before their source line executes.
```

---

# 86. What Is TDZ?

Answer:

```text
The Temporal Dead Zone is the period
from entering a lexical scope
until a let/const/class binding
is initialized.

Access during that period
throws ReferenceError.
```

---

# 87. What Is a Closure? 🔥🔥🔥

Answer:

```text
A closure is a function together with
access to its lexical environment.

It can continue accessing outer bindings
even after the outer function has finished.
```

---

# 88. Why Does `var` Loop Often Print Final Value?

Answer:

```text
var uses one function-scoped binding.

Closures created in the loop
share that same binding.

After the loop finishes,
they all read the final value.
```

---

# 89. How Is `this` Determined?

Answer:

```text
For regular functions,
this mainly depends on the call-site.

For arrow functions,
this is lexical.

call/apply/bind can explicitly bind
regular-function this.

new binds this to the new instance.
```

---

# 90. `call()` vs `apply()` vs `bind()` 🔥🔥🔥

Answer:

```text
call
→ invokes now
→ arguments separately

apply
→ invokes now
→ arguments as array-like collection

bind
→ returns new function
→ does not invoke immediately
```

---

# 91. What Does `new` Do?

Answer:

```text
Conceptually new:

1. creates a new object
2. links it to Constructor.prototype
3. calls constructor with this = new object
4. returns explicit object/function if constructor returns one
5. otherwise returns the new object
```

---

# 92. What Is a Prototype?

Answer:

```text
A prototype is an object
used for shared property/method lookup.

Objects can delegate missing-property lookup
through their prototype chain.
```

---

# 93. Are Classes Different From Prototypes?

Answer:

```text
JavaScript classes are cleaner syntax
over prototype-based object creation
and inheritance.

Normal class methods are still shared
through the prototype.
```

---

# 94. What Does Strict Mode Do?

Answer:

```text
Strict Mode removes or changes
some unsafe legacy behaviors.

It prevents accidental globals,
makes standalone regular-function this undefined,
and turns several silent failures into errors.
```

---

# 95. Is JavaScript Pass-by-Reference? 🔥🔥🔥

Answer:

```text
No.

JavaScript is pass-by-value.

For objects,
the value being copied/passed
is a reference value.
```

---

# 96. Shallow vs Deep Copy

Answer:

```text
Shallow copy:
new outer object,
nested references may still be shared.

Deep copy:
nested mutable structures are also copied
according to the cloning rules.
```

---

# 97. How Are Objects Compared?

Answer:

```text
Objects, arrays, and functions
are compared by reference identity.

Same content does not mean
same object reference.
```

---

# 98. `===` vs `Object.is()`

Answer:

```text
They behave the same for most values.

Differences:

NaN === NaN
→ false

Object.is(NaN, NaN)
→ true

+0 === -0
→ true

Object.is(+0, -0)
→ false
```

---

# 99. What Is Garbage Collection? 🔥🔥🔥

Answer:

```text
Garbage collection is automatic memory management
that reclaims memory for objects
that are no longer reachable
from live program roots.
```

---

# 100. What Is a Memory Leak?

Answer:

```text
A memory leak happens when data
is no longer needed
but is still reachable,
so garbage collection cannot reclaim it.
```

Common sources:

```text
timers
listeners
closures
globals
unbounded caches
Map/Set retention
detached DOM nodes
subscriptions
observers
```

---

# FINAL SECTION 7 MASTER CHECK 🔥🔥🔥

Before moving to Async JavaScript, you should be able to explain:

```text
Execution Context
Call Stack
Scope
Lexical Scope
Scope Chain
Hoisting
TDZ
Closures
var vs let loop behavior
this
call
apply
bind
new
prototype
prototype chain
Object.create
classes
extends
super
strict mode
primitive vs reference
mutation
immutability
shallow copy
deep copy
structuredClone
== vs ===
Object.is
NaN
instanceof
stack/heap mental model
reachability
garbage collection
memory leaks
```

---

# FINAL INTERNALS TRACE 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
Employee.prototype.showName =
  function () {
    return this.name;
  };

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
const bound =
  employee.showName.bind(
    employee
  );

// Step 5:
const copied = {
  employee,
};

// Step 6:
employee.name =
  "Amit";

// Step 7:
console.log(
  bound()
); // Output: Amit

// Step 8:
console.log(
  copied.employee
  ===
  employee
); // Output: true

// Step 9:
console.log(
  employee
  instanceof
  Employee
); // Output: true

// Step 10:
console.log(
  Object.getPrototypeOf(
    employee
  )
  ===
  Employee.prototype
); // Output: true
```

Output:

```text
Amit
true
true
true
```

Full reasoning:

```text
new Employee("Rahul")
↓
new object created
↓
linked to Employee.prototype
↓
constructor sets name
↓
employee created

bind(employee)
↓
bound function keeps employee as this

copied = { employee }
↓
copies employee reference
↓
both copied.employee and employee
point to same object

employee.name = "Amit"
↓
same shared object mutated

bound()
↓
this = employee
↓
returns Amit

copied.employee === employee
↓
same reference
↓
true

employee instanceof Employee
↓
Employee.prototype is in chain
↓
true
```

---

# Quick Memory 🧠🔥🔥🔥

## Scope Question

```text
Where is the variable declared?
```

## Hoisting Question

```text
var
→ undefined

let/const
→ TDZ

function declaration
→ callable
```

## Closure Question

```text
Which binding is being retained?
```

## `this` Question

```text
Regular function
→ inspect call-site

Arrow
→ lexical this
```

## `call`

```text
call now
arguments separately
```

## `apply`

```text
call now
arguments in array-like form
```

## `bind`

```text
return new function
fixed this
```

## `new`

```text
create
link prototype
bind this
run constructor
return instance/object
```

## Prototype Lookup

```text
own property
↓
prototype
↓
prototype chain
↓
null
```

## Classes

```text
clean syntax
over prototype-based behavior
```

## Strict Mode

```text
safer semantics
fewer silent mistakes
```

## References

```text
object variables
hold reference values
```

## Mutation

```text
change same object
```

## Immutability

```text
create new object/reference
for changed path
```

## Equality

```text
===
→ no coercion

objects
→ reference identity
```

## Memory

```text
reachable
→ alive

unreachable
→ GC-eligible
```

## Leak

```text
unused
+
still reachable
```

## Best Final Interview Rule

```text
Never guess JavaScript output.

Trace:

scope
↓
hoisting / TDZ
↓
execution
↓
this call-site
↓
references
↓
prototype lookup
↓
reachability
↓
output
```

---

# ✅ SECTION 7 — JAVASCRIPT INTERNALS COMPLETE 🔥🔥🔥

Completed:

```text
7.1 Execution Model ✅
7.2 Scope ✅
7.3 Hoisting ✅
7.4 TDZ ✅
7.5 Closures ✅
7.6 var vs let Loop Questions ✅
7.7 this ✅
7.8 call() / apply() / bind() ✅
7.9 new Operator ✅
7.10 Prototypes + Prototype Chain ✅
7.11 Classes ✅
7.12 Strict Mode ✅
7.13 Reference Behaviour + Mutation + Immutability ✅
7.14 Equality ✅
7.15 Memory Basics ✅
7.16 Common Memory Leaks ✅
7.17 Internals Practical ✅
```

Next section:

```text
8. Async JavaScript 🔥🔥🔥

8.1 Async Foundation
├── Sync vs Async
├── Single Thread
├── Call Stack
├── Web APIs
├── Event Loop
├── Microtask Queue
├── Task / Macrotask Queue
├── Priority
└── Execution Order
```

**Next: 8.1 Async JavaScript Foundation 🔥🔥🔥**
