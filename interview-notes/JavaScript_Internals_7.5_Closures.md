# 7.5 Closures 🔥🔥🔥

Closure is one of the most important JavaScript interview topics.

Simple definition:

```text
A closure happens when a function
remembers variables from its outer scope
even after the outer function has finished.
```

Master mental model:

```text
outer function runs
↓
creates local variables
↓
returns inner function
↓
outer function finishes
↓
inner function still remembers
outer variables
↓
CLOSURE
```

This chapter covers:

```text
Closure Mental Model
Lexical Environment
Data Persistence
Private State
Function Factory
Callbacks
Event Handlers
Timers
Loops
Practical Closure Problems
Interview Output Questions
Debugging Traps
```

---

# 1. What Is a Closure? 🔥🔥🔥

A closure is created when an inner function uses variables from an outer function.

Example:

```js
function outer() {
  // Step 1:
  const message =
    "Hello";

  function inner() {
    // Step 2:
    // inner uses outer variable.
    console.log(
      message
    ); // Output: Hello
  }

  // Step 3:
  inner();
}

// Step 4:
outer();
```

Output:

```text
Hello
```

This already uses lexical scope.

But closure becomes more interesting when the inner function survives after the outer function finishes.

---

# 2. Closure After Outer Function Finishes 🔥🔥🔥

```js
function outer() {
  // Step 1:
  const message =
    "Hello";

  // Step 2:
  // Return inner function.
  return function inner() {
    console.log(
      message
    );
  };
}

// Step 3:
// outer() runs and returns inner().
const fn =
  outer();

// Step 4:
// outer() has already finished,
// but fn still remembers message.
fn(); // Output: Hello
```

Output:

```text
Hello
```

This is the real closure idea:

```text
outer finished
↓
message would normally seem gone
↓
inner still needs message
↓
JavaScript keeps it alive
```

---

# 3. Why Does Closure Work?

Because JavaScript uses lexical scope.

The inner function remembers the lexical environment where it was created.

Mental model:

```text
inner function
+
reference to outer lexical environment
=
closure behavior
```

---

# 4. What Is Lexical Environment? 🔥🔥🔥

Easy interview explanation:

```text
Lexical Environment
=
variables available in a scope
+
reference to outer lexical environment
```

Example:

```js
function outer() {
  const a =
    10;

  function inner() {
    const b =
      20;

    console.log(
      a + b
    ); // Output: 30
  }

  inner();
}

outer();
```

Output:

```text
30
```

For `inner()`:

```text
local:
b = 20

outer lexical environment:
a = 10
```

---

# 5. Closure Keeps Needed Outer Data Alive 🔥🔥🔥

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

// Step 5:
console.log(
  counter()
); // Output: 2

// Step 6:
console.log(
  counter()
); // Output: 3
```

Output:

```text
1
2
3
```

Important:

```text
count is NOT recreated
for every counter() call.

The returned function
keeps using the same count.
```

---

# 6. Data Persistence 🔥🔥🔥

Closure allows data to persist between function calls.

Without closure:

```js
function counter() {
  // Step 1:
  let count =
    0;

  // Step 2:
  count++;

  return count;
}

// Step 3:
console.log(
  counter()
); // Output: 1

// Step 4:
console.log(
  counter()
); // Output: 1
```

Output:

```text
1
1
```

Why?

```text
Every call
→ new count = 0
```

With closure:

```text
outer creates count once
↓
inner reuses same count
```

---

# 7. Closure Counter — Full Trace 🔥🔥🔥

Code:

```js
function createCounter() {
  let count =
    0;

  return function () {
    count++;

    return count;
  };
}

const counter =
  createCounter();

counter();
counter();
counter();
```

Trace:

```text
createCounter()
↓
count = 0
↓
returns inner function
↓
outer finishes

counter()
↓
count = 1

counter()
↓
count = 2

counter()
↓
count = 3
```

---

# 8. Each Closure Gets Its Own Private State 🔥🔥🔥

```js
function createCounter() {
  let count =
    0;

  return function () {
    count++;

    return count;
  };
}

// Step 1:
const firstCounter =
  createCounter();

// Step 2:
const secondCounter =
  createCounter();

// Step 3:
console.log(
  firstCounter()
); // Output: 1

console.log(
  firstCounter()
); // Output: 2

// Step 4:
console.log(
  secondCounter()
); // Output: 1
```

Output:

```text
1
2
1
```

Why?

Each call to `createCounter()` creates a new lexical environment.

So:

```text
firstCounter
→ own count

secondCounter
→ own count
```

---

# 9. Closure Can Create Private State 🔥🔥🔥

```js
function createBankAccount() {
  // Step 1:
  // Private variable.
  let balance =
    0;

  // Step 2:
  return {
    deposit(
      amount
    ) {
      balance +=
        amount;
    },

    getBalance() {
      return balance;
    },
  };
}

// Step 3:
const account =
  createBankAccount();

// Step 4:
account.deposit(
  1000
);

// Step 5:
console.log(
  account.getBalance()
); // Output: 1000
```

Output:

```text
1000
```

`balance` is not directly exposed.

---

# 10. Why Is That Private?

Outside code cannot directly do:

```text
account.balance
```

because `balance` is not a property of `account`.

It lives inside the closure.

Example:

```js
function createAccount() {
  let balance =
    100;

  return {
    getBalance() {
      return balance;
    },
  };
}

const account =
  createAccount();

// Step 1:
console.log(
  account.balance
); // Output: undefined

// Step 2:
console.log(
  account.getBalance()
); // Output: 100
```

Output:

```text
undefined
100
```

---

# 11. Closure Is Not Copying the Value 🔥🔥🔥

Important.

Closure usually keeps access to the variable binding, not a frozen copy.

Example:

```js
function outer() {
  let value =
    10;

  function inner() {
    console.log(
      value
    );
  }

  // Step 1:
  value =
    20;

  // Step 2:
  return inner;
}

// Step 3:
const fn =
  outer();

// Step 4:
fn(); // Output: 20
```

Output:

```text
20
```

Why not `10`?

Because the closure refers to the same `value` binding.

---

# 12. Closure Sees Latest Value of Outer Binding

```js
function createReader() {
  let name =
    "Rahul";

  function readName() {
    return name;
  }

  // Step 1:
  name =
    "Amit";

  // Step 2:
  return readName;
}

const reader =
  createReader();

// Step 3:
console.log(
  reader()
); // Output: Amit
```

Output:

```text
Amit
```

---

# 13. Function Factory 🔥🔥🔥

A function factory returns customized functions.

Example:

```js
function createMultiplier(
  multiplier
) {
  // Step 1:
  return function (
    value
  ) {
    // Step 2:
    return (
      value
      *
      multiplier
    );
  };
}

// Step 3:
const double =
  createMultiplier(
    2
  );

// Step 4:
const triple =
  createMultiplier(
    3
  );

// Step 5:
console.log(
  double(
    5
  )
); // Output: 10

console.log(
  triple(
    5
  )
); // Output: 15
```

Output:

```text
10
15
```

---

# 14. Why Function Factory Works

Each returned function remembers its own `multiplier`.

```text
double
→ remembers multiplier = 2

triple
→ remembers multiplier = 3
```

This is closure.

---

# 15. Practical Function Factory — Tax Calculator

```js
function createTaxCalculator(
  taxRate
) {
  // Step 1:
  return function (
    amount
  ) {
    // Step 2:
    return (
      amount
      *
      taxRate
    );
  };
}

// Step 3:
const gst18 =
  createTaxCalculator(
    0.18
  );

// Step 4:
console.log(
  gst18(
    1000
  )
); // Output: 180
```

Output:

```text
180
```

---

# 16. Practical Function Factory — Role Checker

```js
function createRoleChecker(
  requiredRole
) {
  // Step 1:
  return function (
    user
  ) {
    // Step 2:
    return (
      user.role
      ===
      requiredRole
    );
  };
}

// Step 3:
const isAdmin =
  createRoleChecker(
    "admin"
  );

// Step 4:
console.log(
  isAdmin(
    {
      role: "admin",
    }
  )
); // Output: true
```

Output:

```text
true
```

---

# 17. Closure With Callback 🔥🔥🔥

Callbacks often use variables from outer scope.

```js
function processUser(
  user
) {
  // Step 1:
  const prefix =
    "User:";

  // Step 2:
  [
    user.name,
  ].forEach(
    (name) => {
      // Step 3:
      // Callback closes over prefix.
      console.log(
        `${prefix} ${name}`
      ); // Output: User: Rahul
    }
  );
}

// Step 4:
processUser(
  {
    name: "Rahul",
  }
);
```

Output:

```text
User: Rahul
```

---

# 18. Closure With Array Methods

```js
function filterByDepartment(
  employees,
  department
) {
  // Step 1:
  return employees.filter(
    (employee) => {
      // Step 2:
      // Callback remembers department.
      return (
        employee.department
        ===
        department
      );
    }
  );
}

const employees = [
  {
    name: "Rahul",
    department: "IT",
  },
  {
    name: "Amit",
    department: "HR",
  },
];

// Step 3:
console.log(
  filterByDepartment(
    employees,
    "IT"
  ).map(
    ({ name }) =>
      name
  )
); // Output: ["Rahul"]
```

Output:

```text
["Rahul"]
```

---

# 19. Closure With Event Handler — Concept 🔥🔥🔥

Frontend example:

```js
function setupButton(
  button,
  userName
) {
  // Step 1:
  button.addEventListener(
    "click",
    () => {
      // Step 2:
      // Handler remembers userName.
      console.log(
        userName
      );
    }
  );
}
```

Mental flow:

```text
setupButton()
↓
userName exists
↓
event handler registered
↓
setupButton finishes
↓
later user clicks
↓
handler still remembers userName
```

That is closure.

---

# 20. Closure With Timer — Concept 🔥🔥🔥

```js
function delayedMessage(
  message
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      // Callback remembers message.
      console.log(
        message
      );
    },
    1000
  );
}

// Step 3:
delayedMessage(
  "Hello"
);
```

Expected later output:

```text
Hello
```

`delayedMessage()` finishes before the timer callback runs.

Still the callback remembers `message`.

Closure makes that possible.

---

# 21. Closure Is Common in React Too — Awareness

Example concept:

```js
function Component() {
  const value =
    "Hello";

  const handleClick =
    () => {
      console.log(
        value
      );
    };

  return handleClick;
}
```

`handleClick` closes over `value`.

This becomes very important later in React with:

```text
state
effects
callbacks
stale closures
```

For now, just remember the JavaScript concept.

---

# 22. Closure With Object Methods Returned From Function

```js
function createUser(
  name
) {
  // Step 1:
  let loginCount =
    0;

  // Step 2:
  return {
    login() {
      loginCount++;
    },

    getInfo() {
      return {
        name,
        loginCount,
      };
    },
  };
}

// Step 3:
const user =
  createUser(
    "Rahul"
  );

// Step 4:
user.login();
user.login();

// Step 5:
console.log(
  user.getInfo()
);
// Output:
// { name: "Rahul", loginCount: 2 }
```

Output:

```text
{ name: "Rahul", loginCount: 2 }
```

---

# 23. Closure With Getter + Setter Style

```js
function createValue(
  initialValue
) {
  // Step 1:
  let value =
    initialValue;

  // Step 2:
  return {
    get() {
      return value;
    },

    set(
      nextValue
    ) {
      value =
        nextValue;
    },
  };
}

// Step 3:
const store =
  createValue(
    10
  );

// Step 4:
console.log(
  store.get()
); // Output: 10

// Step 5:
store.set(
  50
);

// Step 6:
console.log(
  store.get()
); // Output: 50
```

Output:

```text
10
50
```

---

# 24. Closure With `once()` Utility 🔥🔥🔥

This is a practical utility pattern.

```js
function once(
  fn
) {
  // Step 1:
  let called =
    false;

  // Step 2:
  let result;

  // Step 3:
  return function (
    ...args
  ) {
    // Step 4:
    if (
      !called
    ) {
      result =
        fn(
          ...args
        );

      called =
        true;
    }

    // Step 5:
    return result;
  };
}

// Step 6:
const initialize =
  once(
    () =>
      "Initialized"
  );

// Step 7:
console.log(
  initialize()
); // Output: Initialized

console.log(
  initialize()
); // Output: Initialized
```

Output:

```text
Initialized
Initialized
```

But the wrapped function ran only once.

Closure stores:

```text
called
result
```

---

# 25. Closure With Memoization — Basic Preview

Full memoization comes later.

```js
function createSquareCache() {
  // Step 1:
  const cache =
    {};

  // Step 2:
  return function (
    number
  ) {
    if (
      cache[number]
      !==
      undefined
    ) {
      return cache[
        number
      ];
    }

    const result =
      number
      *
      number;

    cache[number] =
      result;

    return result;
  };
}

const square =
  createSquareCache();

// Step 3:
console.log(
  square(
    5
  )
); // Output: 25

// Step 4:
console.log(
  square(
    5
  )
); // Output: 25
```

Output:

```text
25
25
```

Closure keeps `cache` alive.

---

# 26. Closure Does Not Require Returning a Function

Common misconception:

```text
Closure only exists
when a function is returned.
```

Not true.

Example:

```js
function outer() {
  const value =
    10;

  function inner() {
    console.log(
      value
    );
  }

  inner();
}

outer();
```

`inner()` still closes over `value`.

Returning the function simply makes closure behavior easier to observe after outer finishes.

---

# 27. Closure Can Happen With Callback Without Return

```js
function process(
  items
) {
  const prefix =
    "Item";

  items.forEach(
    (
      item,
      index
    ) => {
      console.log(
        `${prefix} ${index}: ${item}`
      );
    }
  );
}

process(
  [
    "A",
    "B",
  ]
);
```

Output:

```text
Item 0: A
Item 1: B
```

The callback closes over `prefix`.

---

# 28. Closure + Loop With `var` 🔥🔥🔥

Classic interview question:

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

Expected later output:

```text
3
3
3
```

Why?

There is one shared `var i` binding.

By the time callbacks run:

```text
loop finished
↓
i = 3
↓
all callbacks read same i
```

---

# 29. Trace `var` Loop Closure 🔥🔥🔥

Loop:

```text
i = 0
→ callback created

i = 1
→ callback created

i = 2
→ callback created

loop ends
→ i = 3
```

Later callbacks run:

```text
callback 1 → reads i → 3
callback 2 → reads i → 3
callback 3 → reads i → 3
```

This is closure + shared binding.

---

# 30. Closure + Loop With `let` 🔥🔥🔥

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

Why?

`let` creates a separate binding for each loop iteration in this pattern.

Each callback closes over a different `i`.

---

# 31. `var` vs `let` Loop Mental Model 🔥🔥🔥

`var`:

```text
one shared i
↓
all callbacks use same binding
↓
3 3 3
```

`let`:

```text
iteration 1 → own i = 0
iteration 2 → own i = 1
iteration 3 → own i = 2
↓
0 1 2
```

---

# 32. Fix `var` Loop Using Closure Factory 🔥🔥🔥

Old-style fix:

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

Why?

Each IIFE call creates a new `currentI` binding.

Each callback closes over that separate binding.

---

# 33. Function Factory Version of Loop Fix

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

# 34. Closure and Mutation 🔥🔥🔥

```js
function createCounter() {
  let count =
    0;

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    getCount() {
      return count;
    },
  };
}

const counter =
  createCounter();

// Step 1:
counter.increment();

// Step 2:
counter.increment();

// Step 3:
counter.decrement();

// Step 4:
console.log(
  counter.getCount()
); // Output: 1
```

Output:

```text
1
```

All methods share the same closure state.

---

# 35. Multiple Returned Functions Can Share One Closure 🔥🔥🔥

```js
function createCounter() {
  let count =
    0;

  // Step 1:
  return {
    increment() {
      count++;
    },

    getCount() {
      return count;
    },
  };
}

const counter =
  createCounter();

// Step 2:
counter.increment();

// Step 3:
console.log(
  counter.getCount()
); // Output: 1
```

Output:

```text
1
```

Both methods use the same `count` binding.

---

# 36. Different Factory Calls Do Not Share State

```js
function createCounter() {
  let count =
    0;

  return {
    increment() {
      count++;
    },

    getCount() {
      return count;
    },
  };
}

// Step 1:
const a =
  createCounter();

// Step 2:
const b =
  createCounter();

// Step 3:
a.increment();

// Step 4:
console.log(
  a.getCount()
); // Output: 1

// Step 5:
console.log(
  b.getCount()
); // Output: 0
```

Output:

```text
1
0
```

---

# 37. Closure and Garbage Collection — Awareness

Normally, when a function finishes:

```text
its local data can become collectible
if nothing references it anymore
```

But if a closure still references some outer data:

```text
that required data must remain reachable
```

Example mental model:

```text
outer finished
↓
returned inner function still exists
↓
inner references count
↓
count remains reachable
```

This is useful, but can also contribute to memory leaks if you keep unnecessary closures alive.

Memory leaks are covered later.

---

# 38. Closure Does Not Keep Everything Forever

Important refinement.

JavaScript engines can optimize.

Conceptually:

```text
closure keeps access to
the outer data it needs
```

Do not say:

```text
closure always keeps every variable
from the outer function forever
```

Better interview answer:

```text
Referenced lexical state remains reachable
as long as the closure can still use it.
```

---

# 39. Closure Practical — ID Generator 🔥🔥🔥

```js
function createIdGenerator() {
  // Step 1:
  let id =
    0;

  // Step 2:
  return function () {
    id++;

    return id;
  };
}

const getNextId =
  createIdGenerator();

// Step 3:
console.log(
  getNextId()
); // Output: 1

console.log(
  getNextId()
); // Output: 2

console.log(
  getNextId()
); // Output: 3
```

Output:

```text
1
2
3
```

---

# 40. Closure Practical — Limit Function Calls

```js
function limitCalls(
  fn,
  limit
) {
  // Step 1:
  let count =
    0;

  // Step 2:
  return function (
    ...args
  ) {
    // Step 3:
    if (
      count
      >=
      limit
    ) {
      return "Limit reached";
    }

    // Step 4:
    count++;

    return fn(
      ...args
    );
  };
}

const greet =
  limitCalls(
    (
      name
    ) =>
      `Hello ${name}`,
    2
  );

// Step 5:
console.log(
  greet(
    "Rahul"
  )
); // Output: Hello Rahul

console.log(
  greet(
    "Amit"
  )
); // Output: Hello Amit

console.log(
  greet(
    "Neha"
  )
); // Output: Limit reached
```

Output:

```text
Hello Rahul
Hello Amit
Limit reached
```

---

# 41. Closure Practical — Simple Toggle

```js
function createToggle() {
  // Step 1:
  let value =
    false;

  // Step 2:
  return function () {
    value =
      !value;

    return value;
  };
}

const toggle =
  createToggle();

// Step 3:
console.log(
  toggle()
); // Output: true

console.log(
  toggle()
); // Output: false

console.log(
  toggle()
); // Output: true
```

Output:

```text
true
false
true
```

---

# 42. Closure Practical — Remember Previous Value

```js
function createPreviousTracker() {
  // Step 1:
  let previous;

  // Step 2:
  return function (
    current
  ) {
    const result =
      previous;

    previous =
      current;

    return result;
  };
}

const track =
  createPreviousTracker();

// Step 3:
console.log(
  track(
    "A"
  )
); // Output: undefined

console.log(
  track(
    "B"
  )
); // Output: A

console.log(
  track(
    "C"
  )
); // Output: B
```

Output:

```text
undefined
A
B
```

---

# 43. Closure Practical — Configured Formatter

```js
function createCurrencyFormatter(
  symbol
) {
  // Step 1:
  return function (
    amount
  ) {
    // Step 2:
    return (
      `${symbol}${amount}`
    );
  };
}

// Step 3:
const rupee =
  createCurrencyFormatter(
    "₹"
  );

// Step 4:
console.log(
  rupee(
    500
  )
); // Output: ₹500
```

Output:

```text
₹500
```

---

# 44. Interview Output 1 — Basic Closure 🔥🔥🔥

```js
function outer() {
  const value =
    10;

  return function () {
    return value;
  };
}

const fn =
  outer();

console.log(
  fn()
);
```

Expected output:

```text
10
```

---

# 45. Interview Output 2 — Updated Outer Variable

```js
function outer() {
  let value =
    10;

  const inner =
    function () {
      return value;
    };

  value =
    20;

  return inner;
}

const fn =
  outer();

console.log(
  fn()
);
```

Expected output:

```text
20
```

---

# 46. Interview Output 3 — Two Independent Closures 🔥🔥🔥

```js
function createCounter() {
  let count =
    0;

  return function () {
    count++;

    return count;
  };
}

const a =
  createCounter();

const b =
  createCounter();

console.log(
  a()
);

console.log(
  a()
);

console.log(
  b()
);
```

Expected output:

```text
1
2
1
```

---

# 47. Interview Output 4 — Shared Closure State

```js
function createStore() {
  let value =
    0;

  return {
    increment() {
      value++;
    },

    read() {
      return value;
    },
  };
}

const store =
  createStore();

store.increment();
store.increment();

console.log(
  store.read()
);
```

Expected output:

```text
2
```

---

# 48. Interview Output 5 — `var` Loop 🔥🔥🔥

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

Expected later output:

```text
3
3
3
```

---

# 49. Interview Output 6 — `let` Loop 🔥🔥🔥

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

---

# 50. Interview Question — What Is a Closure? 🔥🔥🔥

Good answer:

```text
A closure is when a function
retains access to variables
from its lexical outer scope
even after that outer function
has finished executing.
```

Short version:

```text
function + remembered outer scope
```

---

# 51. Interview Question — Why Are Closures Useful?

Good answer:

```text
Closures are useful for:

private state
data persistence
function factories
callbacks
event handlers
timers
memoization
once/debounce/throttle utilities
```

---

# 52. Interview Question — Does Closure Copy Values?

Good answer:

```text
No.

A closure keeps access to lexical bindings,
not simply a frozen copy of their current values.

So if the outer binding changes,
the closure can observe the updated value.
```

---

# 53. Interview Question — When Is a Closure Created?

Good answer:

```text
Whenever a function is created,
it is associated with its lexical environment.

Closure behavior becomes visible
when that function later accesses
outer-scope variables.
```

---

# 54. Interview Question — Closure vs Scope 🔥🔥🔥

Scope:

```text
Where can a variable be accessed?
```

Closure:

```text
How can a function keep access
to outer-scope variables
even after outer execution ends?
```

---

# 55. Interview Question — Closure vs Call Stack

Call Stack:

```text
tracks active function calls
```

Closure:

```text
keeps lexical access to outer data
```

When outer function finishes:

```text
its execution context leaves Call Stack
```

But closure can still keep needed lexical data reachable.

That distinction is important.

---

# 56. Debugging — Unexpected Shared State 🔥🔥🔥

Example:

```js
function createCounter() {
  let count =
    0;

  return function () {
    count++;

    return count;
  };
}

const counter =
  createCounter();

console.log(
  counter()
); // Output: 1

console.log(
  counter()
); // Output: 2
```

If you expected `1` both times, the mistake is:

```text
thinking count is recreated
for every inner call
```

It is not.

The closure reuses the same binding.

---

# 57. Debugging — Accidentally Creating Separate Closures

Example:

```js
function createCounter() {
  let count =
    0;

  return function () {
    count++;

    return count;
  };
}

// Step 1:
// New closure.
console.log(
  createCounter()()
); // Output: 1

// Step 2:
// Another new closure.
console.log(
  createCounter()()
); // Output: 1
```

Output:

```text
1
1
```

Why?

You called `createCounter()` twice.

Each call created a fresh `count`.

---

# 58. Debugging — Stale Closure Awareness 🔥🔥

A closure can keep access to an older lexical environment from a specific function execution.

This becomes especially important in:

```text
React callbacks
React effects
async callbacks
timers
```

Basic JavaScript concept:

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

const logOld =
  createLogger(
    "Old"
  );

const logNew =
  createLogger(
    "New"
  );

// Step 2:
logOld(); // Output: Old

// Step 3:
logNew(); // Output: New
```

Output:

```text
Old
New
```

Each function remembers the environment from its own creation call.

---

# 59. Closure Decision Guide 🔥🔥🔥

```text
Inner function uses outer variable?
→ closure behavior

Need persistent private state?
→ closure

Need customized function?
→ function factory + closure

Need callback to remember configuration?
→ closure

Need timer/event callback to remember data?
→ closure

Need independent state?
→ call factory separately

Need shared state between returned methods?
→ return multiple functions from same outer call
```

---

# 60. Final Master Trace 🔥🔥🔥

Code:

```js
function createEmployeeTracker(
  department
) {
  // Step 1:
  let count =
    0;

  // Step 2:
  return {
    addEmployee() {
      count++;

      return (
        `${department}: ${count}`
      );
    },

    getCount() {
      return count;
    },
  };
}

// Step 3:
const itTracker =
  createEmployeeTracker(
    "IT"
  );

// Step 4:
const hrTracker =
  createEmployeeTracker(
    "HR"
  );

// Step 5:
console.log(
  itTracker.addEmployee()
); // Output: IT: 1

// Step 6:
console.log(
  itTracker.addEmployee()
); // Output: IT: 2

// Step 7:
console.log(
  hrTracker.addEmployee()
); // Output: HR: 1

// Step 8:
console.log(
  itTracker.getCount()
); // Output: 2

// Step 9:
console.log(
  hrTracker.getCount()
); // Output: 1
```

Output:

```text
IT: 1
IT: 2
HR: 1
2
1
```

Complete mental model:

```text
createEmployeeTracker("IT")
↓
department = "IT"
count = 0
↓
returned methods close over same state
↓
itTracker owns that closure

createEmployeeTracker("HR")
↓
department = "HR"
count = 0
↓
different closure
↓
hrTracker owns separate state
```

---

# Quick Memory 🧠🔥🔥🔥

## Closure

```text
function
+
remembered lexical outer scope
=
closure
```

## Core Example

```js
function outer() {
  let count =
    0;

  return function () {
    count++;

    return count;
  };
}

const counter =
  outer();

console.log(
  counter()
); // Output: 1

console.log(
  counter()
); // Output: 2
```

## Why Data Persists

```text
returned function still references count
↓
count remains reachable
↓
same binding reused
```

## Independent Closures

```text
outer() call 1
→ own state

outer() call 2
→ separate state
```

## Function Factory

```text
createMultiplier(2)
→ function remembers 2

createMultiplier(3)
→ function remembers 3
```

## `var` Loop

```text
one shared binding
↓
3 3 3
```

## `let` Loop

```text
separate iteration bindings
↓
0 1 2
```

## Private State

```text
outer local variable
↓
returned methods can access it
↓
outside code cannot directly access it
```

## Most Important Interview Answer

```text
A closure is when a function
retains access to variables
from its lexical scope
even after the outer function
has finished executing.
```

---

# ✅ 7.5 Closures Complete

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
    + Mental Model
    + Lexical Environment
    + Data Persistence
    + Private State
    + Function Factory
    + Callbacks
    + Event Handlers
    + Timers
    + Loops
    + Practical Problems
```

Next topic:

```text
7.6 var vs let Loop Questions 🔥🔥🔥
├── var + setTimeout
├── let + setTimeout
├── Shared Binding
├── Per-Iteration Binding
├── Closure Fix
└── Output Questions
```

**Next: 7.6 var vs let Loop Questions 🔥🔥🔥**
