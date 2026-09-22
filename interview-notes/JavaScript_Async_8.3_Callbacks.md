# 8.3 Callbacks 🔥🔥🔥

A **callback** is a function passed to another function so it can be executed later.

Master mental model:

```text
function A
↓
receives function B
↓
function A decides
WHEN
to call function B
```

That function B is the callback.

Callbacks are used in:

```text
Array methods
Timers
Event listeners
Network APIs
File operations
Database APIs
Subscriptions
Custom utilities
```

Callbacks are important because they are the foundation behind:

```text
Promises
async / await
Event-driven programming
```

This chapter covers:

```text
What Is a Callback?
Function Reference
Passing Functions
Invoking Callbacks
Synchronous Callbacks
Asynchronous Callbacks
Timers
Array Callbacks
Custom Callbacks
Callback Parameters
Return Values
Error Handling
Error-First Callback Awareness
Nested Callbacks
Callback Hell
Inversion of Control
Practical Async Flow
Output Questions
Debugging
Interview Questions
```

---

# 1. What Is a Callback? 🔥🔥🔥

A callback is:

```text
a function passed into another function
```

and that receiving function later calls it.

Example:

```js
function greet(
  name
) {
  // Step 1:
  console.log(
    `Hello ${name}`
  );
}

function processUser(
  callback
) {
  // Step 2:
  callback(
    "Rahul"
  );
}

// Step 3:
processUser(
  greet
);
```

Output:

```text
Hello Rahul
```

---

# 2. Callback Mental Model

```text
greet
↓
passed into processUser
↓
processUser receives it as callback
↓
callback("Rahul")
↓
greet("Rahul")
```

---

# 3. Function Reference vs Function Call 🔥🔥🔥

Very important.

This:

```text
greet
```

means:

```text
function reference
```

This:

```text
greet()
```

means:

```text
call the function now
```

---

# 4. Correct Callback Passing

```js
function greet() {
  // Step 1:
  console.log(
    "Hello"
  );
}

function run(
  callback
) {
  // Step 2:
  callback();
}

// Step 3:
run(
  greet
);
```

Output:

```text
Hello
```

---

# 5. Wrong: Calling Before Passing 🔥🔥🔥

```js
function greet() {
  // Step 1:
  console.log(
    "Hello"
  );
}

function run(
  callback
) {
  // Step 2:
  if (
    typeof callback
    ===
    "function"
  ) {
    callback();
  }
}

// Step 3:
run(
  greet()
);
```

Output:

```text
Hello
```

But here:

```text
greet()
runs immediately
```

Its return value is passed into `run()`.

So `greet()` was not passed as the callback.

---

# 6. Functions Are First-Class Values 🔥🔥🔥

Callbacks are possible because functions can be:

```text
stored in variables
passed as arguments
returned from functions
stored in objects
stored in arrays
```

Example:

```js
// Step 1:
const greet =
  function () {
    return "Hello";
  };

// Step 2:
const another =
  greet;

// Step 3:
console.log(
  another()
); // Output: Hello
```

Output:

```text
Hello
```

---

# 7. Callback Parameter Name Can Be Anything

```js
function execute(
  fn
) {
  // Step 1:
  fn();
}

// Step 2:
execute(
  () => {
    console.log(
      "Done"
    );
  }
);
```

Output:

```text
Done
```

`fn` is just a parameter name.

You could call it:

```text
callback
cb
handler
fn
onComplete
```

---

# 8. Anonymous Function as Callback 🔥🔥🔥

```js
function execute(
  callback
) {
  // Step 1:
  callback();
}

// Step 2:
execute(
  function () {
    console.log(
      "Completed"
    );
  }
);
```

Output:

```text
Completed
```

---

# 9. Arrow Function as Callback

```js
function execute(
  callback
) {
  // Step 1:
  callback();
}

// Step 2:
execute(
  () => {
    console.log(
      "Completed"
    );
  }
);
```

Output:

```text
Completed
```

---

# 10. Named Callback vs Inline Callback

Named:

```js
function handleSuccess() {
  // Step 1:
  console.log(
    "Success"
  );
}

function run(
  callback
) {
  // Step 2:
  callback();
}

// Step 3:
run(
  handleSuccess
);
```

Inline:

```js
function run(
  callback
) {
  // Step 1:
  callback();
}

// Step 2:
run(
  () => {
    console.log(
      "Success"
    );
  }
);
```

Both are callbacks.

---

# 11. Synchronous Callback 🔥🔥🔥

A synchronous callback is executed immediately during the current call.

Example:

```js
function process(
  callback
) {
  // Step 1:
  console.log(
    "Before"
  );

  // Step 2:
  callback();

  // Step 3:
  console.log(
    "After"
  );
}

// Step 4:
process(
  () => {
    console.log(
      "Callback"
    );
  }
);
```

Output:

```text
Before
Callback
After
```

---

# 12. Why Is It Synchronous?

Because:

```text
process()
↓
calls callback directly
↓
callback runs immediately
↓
then process continues
```

No timer.

No queue.

No async host API.

---

# 13. Array Methods Use Synchronous Callbacks 🔥🔥🔥

Methods like:

```text
map()
filter()
reduce()
forEach()
find()
some()
every()
```

typically call your callback synchronously.

---

# 14. `map()` Callback Example

```js
// Step 1:
const numbers = [
  1,
  2,
  3,
];

// Step 2:
const doubled =
  numbers.map(
    (
      number
    ) => {
      return (
        number * 2
      );
    }
  );

// Step 3:
console.log(
  doubled
); // Output: [2, 4, 6]
```

Output:

```text
[2, 4, 6]
```

---

# 15. `filter()` Callback Example

```js
// Step 1:
const numbers = [
  1,
  2,
  3,
  4,
];

// Step 2:
const even =
  numbers.filter(
    (
      number
    ) => {
      return (
        number % 2 === 0
      );
    }
  );

// Step 3:
console.log(
  even
); // Output: [2, 4]
```

Output:

```text
[2, 4]
```

---

# 16. Callback Receives Arguments 🔥🔥🔥

A higher-order function can pass values into the callback.

```js
function calculate(
  a,
  b,
  callback
) {
  // Step 1:
  const result =
    callback(
      a,
      b
    );

  // Step 2:
  return result;
}

// Step 3:
const total =
  calculate(
    10,
    20,
    (
      x,
      y
    ) => {
      return (
        x + y
      );
    }
  );

// Step 4:
console.log(
  total
); // Output: 30
```

Output:

```text
30
```

---

# 17. Callback Can Return a Value

```js
function run(
  callback
) {
  // Step 1:
  const result =
    callback();

  // Step 2:
  return result;
}

// Step 3:
const value =
  run(
    () => {
      return 100;
    }
  );

// Step 4:
console.log(
  value
); // Output: 100
```

Output:

```text
100
```

---

# 18. Callback Return Value Belongs to Caller 🔥🔥🔥

The receiving function decides whether to:

```text
ignore callback return
store it
return it
transform it
```

Example:

```js
function run(
  callback
) {
  // Step 1:
  callback();

  // Step 2:
  return "Done";
}

// Step 3:
const result =
  run(
    () => {
      return "Callback Result";
    }
  );

// Step 4:
console.log(
  result
); // Output: Done
```

Output:

```text
Done
```

The callback returned a value, but `run()` ignored it.

---

# 19. Asynchronous Callback 🔥🔥🔥

An asynchronous callback runs later.

Example:

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "Callback"
    );
  },
  0
);

// Step 3:
console.log(
  "End"
);
```

Output:

```text
Start
End
Callback
```

---

# 20. Timer Callback Is Asynchronous

The function passed to:

```text
setTimeout()
```

is a callback.

But unlike a synchronous callback:

```text
it runs later
```

after scheduling rules allow.

---

# 21. Sync vs Async Callback 🔥🔥🔥

Synchronous:

```text
function receives callback
↓
calls callback now
```

Asynchronous:

```text
function/API receives callback
↓
some work happens
↓
callback runs later
```

---

# 22. Compare Sync and Async

```js
function syncRun(
  callback
) {
  // Step 1:
  callback();
}

// Step 2:
syncRun(
  () => {
    console.log(
      "Sync Callback"
    );
  }
);

// Step 3:
setTimeout(
  () => {
    console.log(
      "Async Callback"
    );
  },
  0
);

// Step 4:
console.log(
  "End"
);
```

Output:

```text
Sync Callback
End
Async Callback
```

---

# 23. Custom Async Function With Timer 🔥🔥🔥

```js
function getEmployee(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      const employee = {
        id: 1,
        name: "Rahul",
      };

      // Step 3:
      callback(
        employee
      );
    },
    100
  );
}

// Step 4:
getEmployee(
  (
    employee
  ) => {
    console.log(
      employee.name
    );
  }
);
```

Output later:

```text
Rahul
```

---

# 24. Real App Callback Mental Model

```text
request employee
↓
work happens
↓
employee becomes available
↓
callback(employee)
↓
UI handles employee
```

---

# 25. Callback Lets Caller Decide What Happens Next 🔥🔥🔥

Example:

```js
function getEmployee(
  callback
) {
  // Step 1:
  const employee = {
    id: 1,
    name: "Rahul",
  };

  // Step 2:
  callback(
    employee
  );
}

// Step 3:
getEmployee(
  (
    employee
  ) => {
    console.log(
      employee.name
    );
  }
);

// Step 4:
getEmployee(
  (
    employee
  ) => {
    console.log(
      employee.id
    );
  }
);
```

Output:

```text
Rahul
1
```

Same producer.

Different callback behavior.

---

# 26. Success Callback Pattern 🔥🔥🔥

```js
function saveEmployee(
  employee,
  onSuccess
) {
  // Step 1:
  console.log(
    `Saving ${employee.name}`
  );

  // Step 2:
  onSuccess(
    employee
  );
}

// Step 3:
saveEmployee(
  {
    id: 1,
    name: "Rahul",
  },
  (
    employee
  ) => {
    console.log(
      `Saved ${employee.id}`
    );
  }
);
```

Output:

```text
Saving Rahul
Saved 1
```

---

# 27. Success + Error Callback Pattern

Before Promises became common, APIs often used separate callbacks.

```js
function divide(
  a,
  b,
  onSuccess,
  onError
) {
  // Step 1:
  if (
    b === 0
  ) {
    onError(
      "Cannot divide by zero"
    );

    return;
  }

  // Step 2:
  onSuccess(
    a / b
  );
}

// Step 3:
divide(
  10,
  2,
  (
    result
  ) => {
    console.log(
      result
    );
  },
  (
    error
  ) => {
    console.log(
      error
    );
  }
);
```

Output:

```text
5
```

---

# 28. Error Callback Example 🔥🔥🔥

```js
function divide(
  a,
  b,
  onSuccess,
  onError
) {
  // Step 1:
  if (
    b === 0
  ) {
    onError(
      "Cannot divide by zero"
    );

    return;
  }

  // Step 2:
  onSuccess(
    a / b
  );
}

// Step 3:
divide(
  10,
  0,
  (
    result
  ) => {
    console.log(
      result
    );
  },
  (
    error
  ) => {
    console.log(
      error
    );
  }
);
```

Output:

```text
Cannot divide by zero
```

---

# 29. Error-First Callback Pattern 🔥🔥🔥

Node.js traditionally uses:

```text
callback(error, result)
```

Mental model:

```text
error exists
→ handle error

error is null
→ use result
```

---

# 30. Error-First Callback Success Example

```js
function getEmployee(
  callback
) {
  // Step 1:
  const employee = {
    id: 1,
    name: "Rahul",
  };

  // Step 2:
  callback(
    null,
    employee
  );
}

// Step 3:
getEmployee(
  (
    error,
    employee
  ) => {
    // Step 4:
    if (
      error
    ) {
      console.log(
        error
      );

      return;
    }

    // Step 5:
    console.log(
      employee.name
    );
  }
);
```

Output:

```text
Rahul
```

---

# 31. Error-First Callback Error Example 🔥🔥🔥

```js
function getEmployee(
  callback
) {
  // Step 1:
  const error =
    new Error(
      "Employee not found"
    );

  // Step 2:
  callback(
    error,
    null
  );
}

// Step 3:
getEmployee(
  (
    error,
    employee
  ) => {
    // Step 4:
    if (
      error
    ) {
      console.log(
        error.message
      );

      return;
    }

    // Step 5:
    console.log(
      employee.name
    );
  }
);
```

Output:

```text
Employee not found
```

---

# 32. Why Error Comes First

Convention:

```text
callback(error, result)
```

makes the first check predictable:

```js
function handleResult(
  error,
  result
) {
  // Step 1:
  if (
    error
  ) {
    return;
  }

  // Step 2:
  console.log(
    result
  );
}
```

---

# 33. Callback Can Be Called More Than Once 🔥🔥🔥

Unlike a Promise settlement, a normal callback has no built-in "only once" rule.

Example:

```js
function run(
  callback
) {
  // Step 1:
  callback(
    1
  );

  // Step 2:
  callback(
    2
  );
}

// Step 3:
run(
  (
    value
  ) => {
    console.log(
      value
    );
  }
);
```

Output:

```text
1
2
```

---

# 34. This Can Be Useful or Dangerous

Useful for:

```text
events
subscriptions
interval-like behavior
streams
```

Dangerous when caller expects:

```text
one completion only
```

---

# 35. Callback Contract 🔥🔥🔥

When designing callback APIs, define:

```text
When is callback called?
How many times?
What arguments?
What does error look like?
Is it sync or async?
Can it be cancelled?
```

Unclear callback contracts cause bugs.

---

# 36. Callback Timing Must Be Predictable 🔥🔥🔥

A function that sometimes calls callback synchronously and sometimes asynchronously can be confusing.

Bad conceptual pattern:

```text
cache hit
→ callback now

cache miss
→ callback later
```

Caller behavior becomes harder to reason about.

---

# 37. Consistent Async Timing Pattern

```js
function getValue(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      callback(
        100
      );
    },
    0
  );
}

// Step 2:
console.log(
  "Before"
);

// Step 3:
getValue(
  (
    value
  ) => {
    console.log(
      value
    );
  }
);

// Step 4:
console.log(
  "After"
);
```

Output:

```text
Before
After
100
```

---

# 38. Nested Callbacks 🔥🔥🔥

Suppose:

```text
Step 1: get user
Step 2: get orders
Step 3: get order details
```

With callbacks, one operation may depend on the previous one.

---

# 39. Two-Level Nested Callback

```js
function getUser(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      callback(
        {
          id: 1,
        }
      );
    },
    0
  );
}

function getOrders(
  userId,
  callback
) {
  // Step 2:
  setTimeout(
    () => {
      callback(
        [
          {
            id: 101,
            userId,
          },
        ]
      );
    },
    0
  );
}

// Step 3:
getUser(
  (
    user
  ) => {
    getOrders(
      user.id,
      (
        orders
      ) => {
        console.log(
          orders[0].id
        );
      }
    );
  }
);
```

Output later:

```text
101
```

---

# 40. Three-Level Nested Callback 🔥🔥🔥

```js
function getUser(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      callback(
        {
          id: 1,
        }
      );
    },
    0
  );
}

function getOrders(
  userId,
  callback
) {
  // Step 2:
  setTimeout(
    () => {
      callback(
        [
          {
            id: 101,
            userId,
          },
        ]
      );
    },
    0
  );
}

function getOrderDetails(
  orderId,
  callback
) {
  // Step 3:
  setTimeout(
    () => {
      callback(
        {
          id: orderId,
          amount: 500,
        }
      );
    },
    0
  );
}

// Step 4:
getUser(
  (
    user
  ) => {
    getOrders(
      user.id,
      (
        orders
      ) => {
        getOrderDetails(
          orders[0].id,
          (
            details
          ) => {
            console.log(
              details.amount
            );
          }
        );
      }
    );
  }
);
```

Output later:

```text
500
```

---

# 41. Callback Hell 🔥🔥🔥

When many dependent async callbacks are nested:

```text
callback
  callback
    callback
      callback
```

the code becomes difficult to:

```text
read
debug
maintain
handle errors
reuse
```

This is called:

```text
Callback Hell
```

---

# 42. Callback Hell Visual

```text
getUser(...)
└── callback
    └── getOrders(...)
        └── callback
            └── getDetails(...)
                └── callback
                    └── save(...)
```

This is sometimes called:

```text
Pyramid of Doom
```

---

# 43. Callback Hell Is Not "Callbacks Are Bad"

Callbacks themselves are fundamental.

The problem is:

```text
deeply nested dependent asynchronous control flow
```

Callbacks are still excellent for:

```text
event handlers
array methods
small utilities
subscriptions
one-step completion handlers
```

---

# 44. Named Functions Can Reduce Nesting 🔥🔥🔥

Instead of putting everything inline, extract functions.

```js
function handleDetails(
  details
) {
  // Step 1:
  console.log(
    details.amount
  );
}

function handleOrders(
  orders
) {
  // Step 2:
  getOrderDetails(
    orders[0].id,
    handleDetails
  );
}

function handleUser(
  user
) {
  // Step 3:
  getOrders(
    user.id,
    handleOrders
  );
}

// Step 4:
getUser(
  handleUser
);
```

This improves readability.

---

# 45. But Named Callbacks Do Not Solve Everything

They reduce visual nesting.

But you may still have:

```text
manual error propagation
inversion of control
complex sequencing
hard composition
```

Promises were designed to improve these problems.

---

# 46. Inversion of Control 🔥🔥🔥

With callbacks, you give another function/API your callback.

Then that code controls:

```text
when callback runs
how many times it runs
what arguments it receives
whether it runs at all
```

This is called:

```text
Inversion of Control
```

---

# 47. Inversion of Control Mental Model

Without callback:

```text
I call my function directly
```

With callback:

```text
I give my function to someone else
↓
they decide when to call it
```

---

# 48. Why Inversion of Control Can Be Risky 🔥🔥🔥

Imagine a third-party function accidentally:

```text
calls callback twice
```

or:

```text
never calls callback
```

Your application flow can break.

---

# 49. Callback Called Twice Example

```js
function thirdParty(
  callback
) {
  // Step 1:
  callback(
    "Success"
  );

  // Step 2:
  callback(
    "Success Again"
  );
}

// Step 3:
thirdParty(
  (
    result
  ) => {
    console.log(
      result
    );
  }
);
```

Output:

```text
Success
Success Again
```

---

# 50. Callback Never Called Example

```js
function thirdParty(
  callback
) {
  // Step 1:
  const shouldRun =
    false;

  // Step 2:
  if (
    shouldRun
  ) {
    callback();
  }
}

// Step 3:
thirdParty(
  () => {
    console.log(
      "Completed"
    );
  }
);
```

Output:

```text
(no output)
```

---

# 51. Guarding Against Multiple Callback Calls 🔥🔥

A simple `once` wrapper can help.

```js
function once(
  callback
) {
  // Step 1:
  let called =
    false;

  // Step 2:
  return function (
    ...args
  ) {
    if (
      called
    ) {
      return;
    }

    called =
      true;

    // Step 3:
    callback(
      ...args
    );
  };
}

// Step 4:
const done =
  once(
    (
      value
    ) => {
      console.log(
        value
      );
    }
  );

// Step 5:
done(
  "First"
);

// Step 6:
done(
  "Second"
);
```

Output:

```text
First
```

Full `once` utility comes later in Advanced JavaScript.

---

# 52. Callback Error Handling Problem 🔥🔥🔥

With deeply nested callbacks, error handling can repeat.

Conceptual pattern:

```text
operation 1
↓ error?
operation 2
↓ error?
operation 3
↓ error?
```

This becomes noisy.

---

# 53. Error-First Nested Example

```js
function getUser(
  callback
) {
  // Step 1:
  callback(
    null,
    {
      id: 1,
    }
  );
}

function getOrders(
  userId,
  callback
) {
  // Step 2:
  callback(
    null,
    [
      {
        id: 101,
        userId,
      },
    ]
  );
}

// Step 3:
getUser(
  (
    userError,
    user
  ) => {
    if (
      userError
    ) {
      console.log(
        userError
      );

      return;
    }

    // Step 4:
    getOrders(
      user.id,
      (
        ordersError,
        orders
      ) => {
        if (
          ordersError
        ) {
          console.log(
            ordersError
          );

          return;
        }

        // Step 5:
        console.log(
          orders[0].id
        );
      }
    );
  }
);
```

Output:

```text
101
```

The repeated error checks are one reason Promises became popular.

---

# 54. Callback vs Event Handler

An event handler is a callback.

Example:

```js
function handleClick() {
  // Step 1:
  console.log(
    "Clicked"
  );
}

// Step 2:
document.addEventListener(
  "click",
  handleClick
);
```

The browser calls `handleClick` when the event occurs.

---

# 55. Callback vs Higher-Order Function 🔥🔥🔥

A higher-order function:

```text
accepts a function
or
returns a function
```

A callback:

```text
is the function passed in
for later/direct execution
```

Example:

```js
function execute(
  callback
) {
  // Step 1:
  callback();
}
```

Here:

```text
execute
→ higher-order function

callback
→ callback function
```

---

# 56. Real App Example — Form Submit

```text
user submits form
↓
browser invokes submit callback
↓
validate form
↓
save data
↓
show success
```

The submit handler itself is a callback.

---

# 57. Real App Example — Button Click

```js
function handleSave() {
  // Step 1:
  console.log(
    "Save employee"
  );
}

// Step 2:
button.addEventListener(
  "click",
  handleSave
);
```

When button is clicked:

```text
browser calls handleSave
```

---

# 58. Real App Example — Employee Search 🔥🔥🔥

```js
function searchEmployees(
  query,
  callback
) {
  // Step 1:
  const employees = [
    "Rahul",
    "Amit",
    "Priya",
  ];

  // Step 2:
  const result =
    employees.filter(
      (
        name
      ) => {
        return name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          );
      }
    );

  // Step 3:
  callback(
    result
  );
}

// Step 4:
searchEmployees(
  "ra",
  (
    employees
  ) => {
    console.log(
      employees
    );
  }
);
```

Output:

```text
["Rahul"]
```

---

# 59. Real Async Employee Example 🔥🔥🔥

```js
function fetchEmployee(
  id,
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      const employee = {
        id,
        name: "Rahul",
      };

      // Step 3:
      callback(
        employee
      );
    },
    100
  );
}

// Step 4:
console.log(
  "Loading"
);

// Step 5:
fetchEmployee(
  1,
  (
    employee
  ) => {
    console.log(
      employee.name
    );
  }
);

// Step 6:
console.log(
  "Request Started"
);
```

Output:

```text
Loading
Request Started
Rahul
```

---

# 60. Async Callback Does Not Return to Original Variable 🔥🔥🔥

Common mistake:

```js
function getEmployee() {
  // Step 1:
  let result;

  // Step 2:
  setTimeout(
    () => {
      result = {
        id: 1,
      };
    },
    0
  );

  // Step 3:
  return result;
}

// Step 4:
console.log(
  getEmployee()
); // Output: undefined
```

Output:

```text
undefined
```

---

# 61. Why Is It `undefined`?

Trace:

```text
result = undefined
↓
timer registered
↓
return result immediately
↓
undefined returned
↓
timer callback runs later
```

The function already returned.

---

# 62. Correct Async Callback Pattern 🔥🔥🔥

```js
function getEmployee(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      const employee = {
        id: 1,
      };

      // Step 3:
      callback(
        employee
      );
    },
    0
  );
}

// Step 4:
getEmployee(
  (
    employee
  ) => {
    console.log(
      employee.id
    );
  }
);
```

Output later:

```text
1
```

---

# 63. Common Callback Bug — Forgetting to Invoke It

```js
function run(
  callback
) {
  // Step 1:
  console.log(
    "Running"
  );

  // Step 2:
  // callback is never called.
}

// Step 3:
run(
  () => {
    console.log(
      "Done"
    );
  }
);
```

Output:

```text
Running
```

---

# 64. Common Callback Bug — Calling It Too Early 🔥🔥🔥

```js
function run(
  callback
) {
  // Step 1:
  callback();

  // Step 2:
  console.log(
    "Work"
  );
}

// Step 3:
run(
  () => {
    console.log(
      "Done"
    );
  }
);
```

Output:

```text
Done
Work
```

If completion callback is supposed to mean "work finished", this order is wrong.

---

# 65. Correct Completion Order

```js
function run(
  callback
) {
  // Step 1:
  console.log(
    "Work"
  );

  // Step 2:
  callback();
}

// Step 3:
run(
  () => {
    console.log(
      "Done"
    );
  }
);
```

Output:

```text
Work
Done
```

---

# 66. Common Callback Bug — Wrong Argument Order 🔥🔥

If API contract is:

```text
callback(error, result)
```

but you call:

```text
callback(result, null)
```

the consumer can think the result is an error.

Callback argument contracts must be consistent.

---

# 67. Common Callback Bug — Throwing Inside Async Callback

A `try/catch` around the timer setup does not catch an error thrown later inside the timer callback.

```js
try {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      throw new Error(
        "Timer Error"
      );
    },
    0
  );
} catch (
  error
) {
  // Step 3:
  console.log(
    "Caught"
  );
}
```

The outer `catch` does not catch the later async throw.

---

# 68. Why Outer `try/catch` Does Not Catch It 🔥🔥🔥

Because:

```text
try block runs
↓
timer registered
↓
try block finishes
↓
later:
timer callback runs in another task
↓
throw happens after original try/catch is gone
```

This becomes easier with Promises and async/await.

---

# 69. Handle Error Inside Async Callback

```js
// Step 1:
setTimeout(
  () => {
    try {
      // Step 2:
      throw new Error(
        "Timer Error"
      );
    } catch (
      error
    ) {
      // Step 3:
      console.log(
        error.message
      );
    }
  },
  0
);
```

Output:

```text
Timer Error
```

---

# 70. Callback + Closure 🔥🔥🔥

```js
function createProcessor(
  prefix
) {
  // Step 1:
  return function (
    value
  ) {
    console.log(
      `${prefix}: ${value}`
    );
  };
}

// Step 2:
const callback =
  createProcessor(
    "Employee"
  );

// Step 3:
callback(
  "Rahul"
);
```

Output:

```text
Employee: Rahul
```

The callback closes over `prefix`.

---

# 71. Callback Can Lose `this` 🔥🔥🔥

```js
"use strict";

// Step 1:
const employee = {
  name: "Rahul",

  showName() {
    console.log(
      this.name
    );
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
  );
}
```

Output:

```text
TypeError
```

The method was detached.

---

# 72. Fix Callback `this` With `bind()`

```js
// Step 1:
const employee = {
  name: "Rahul",

  showName() {
    console.log(
      this.name
    );
  },
};

// Step 2:
const callback =
  employee.showName.bind(
    employee
  );

// Step 3:
callback();
```

Output:

```text
Rahul
```

---

# 73. Fix Callback `this` With Arrow Wrapper

```js
// Step 1:
const employee = {
  name: "Rahul",

  showName() {
    console.log(
      this.name
    );
  },
};

// Step 2:
const callback =
  () => {
    employee.showName();
  };

// Step 3:
callback();
```

Output:

```text
Rahul
```

---

# 74. Interview Output 1 🔥🔥🔥

```js
function run(
  callback
) {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  callback();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run(
  () => {
    console.log(
      "C"
    );
  }
);
```

Expected output:

```text
A
C
B
```

---

# 75. Interview Output 2 — Async Callback

```js
function run(
  callback
) {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  setTimeout(
    callback,
    0
  );

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run(
  () => {
    console.log(
      "C"
    );
  }
);
```

Expected output:

```text
A
B
C
```

---

# 76. Interview Output 3 — Callback Return 🔥🔥🔥

```js
function run(
  callback
) {
  // Step 1:
  return callback();
}

// Step 2:
const result =
  run(
    () => {
      return 50;
    }
  );

// Step 3:
console.log(
  result
);
```

Expected output:

```text
50
```

---

# 77. Interview Output 4 — Callback Called Twice

```js
function run(
  callback
) {
  // Step 1:
  callback(
    "A"
  );

  // Step 2:
  callback(
    "B"
  );
}

// Step 3:
run(
  (
    value
  ) => {
    console.log(
      value
    );
  }
);
```

Expected output:

```text
A
B
```

---

# 78. Interview Output 5 — Async Return Trap 🔥🔥🔥

```js
function getValue() {
  // Step 1:
  let value =
    0;

  // Step 2:
  setTimeout(
    () => {
      value =
        100;
    },
    0
  );

  // Step 3:
  return value;
}

// Step 4:
console.log(
  getValue()
);
```

Expected output:

```text
0
```

The timer updates `value` later.

---

# 79. Interview Output 6 — Callback + Timer + Promise 🔥🔥🔥

```js
function run(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      callback();
    },
    0
  );
}

// Step 2:
run(
  () => {
    console.log(
      "Callback"
    );
  }
);

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Promise"
      );
    }
  );

// Step 4:
console.log(
  "Sync"
);
```

Expected output:

```text
Sync
Promise
Callback
```

---

# 80. Interview Question — What Is a Callback? 🔥🔥🔥

Good answer:

```text
A callback is a function passed
to another function or API
so that the receiving code
can invoke it at the appropriate time.
```

---

# 81. Interview Question — Are All Callbacks Asynchronous?

Good answer:

```text
No.

Callbacks can be synchronous or asynchronous.

Array methods such as map and filter
use synchronous callbacks.

Timers and event handlers
typically involve asynchronous callbacks.
```

---

# 82. Interview Question — Callback vs Higher-Order Function 🔥🔥🔥

Good answer:

```text
A higher-order function
accepts or returns functions.

A callback is the function
passed to another function
for execution by that function.

The receiving function may itself
be a higher-order function.
```

---

# 83. Interview Question — What Is Callback Hell? 🔥🔥🔥

Good answer:

```text
Callback hell happens when multiple
dependent asynchronous operations
are deeply nested inside callbacks.

It makes code harder to read,
maintain, reuse, and handle errors in.
```

---

# 84. Interview Question — What Is Inversion of Control?

Good answer:

```text
With callbacks,
we give another function or API
control over when and how
our callback is executed.

That transfer of control
is called inversion of control.
```

---

# 85. Interview Question — What Is Error-First Callback? 🔥🔥🔥

Good answer:

```text
An error-first callback follows:

callback(error, result)

If error is present,
handle the error.

If error is null,
use the result.

This pattern is common in traditional Node.js APIs.
```

---

# 86. Interview Question — Why Did Promises Become Popular?

Good answer:

```text
Promises provide a structured way
to represent one future completion.

They improve composition,
chaining, and error propagation
compared with deeply nested callbacks.
```

---

# 87. Callback Debugging Checklist 🔥🔥🔥

When callback code behaves incorrectly, check:

```text
Did I pass function reference
or call it immediately?

Is callback synchronous or asynchronous?

Is callback actually invoked?

Is callback invoked more than once?

Are callback arguments in correct order?

Is async result being returned too early?

Did callback lose this?

Is error handled?

Is nesting becoming callback hell?

Who controls callback execution?
```

---

# 88. Callback Decision Guide 🔥🔥🔥

```text
Need custom behavior passed into function?
→ callback

Need array transformation?
→ callback with map/filter/reduce

Need event handling?
→ callback

Need timer handling?
→ async callback

Need one simple completion handler?
→ callback can be fine

Many dependent async operations?
→ Promises / async-await are usually cleaner

Need traditional Node callback?
→ callback(error, result)

Need preserve method this?
→ bind or arrow wrapper
```

---

# 89. Final Master Trace 🔥🔥🔥

```js
function getEmployee(
  callback
) {
  // Step 1:
  console.log(
    "Get Employee Start"
  );

  // Step 2:
  setTimeout(
    () => {
      console.log(
        "Employee Timer"
      );

      // Step 3:
      callback(
        null,
        {
          id: 1,
          name: "Rahul",
        }
      );

      // Step 4:
      Promise.resolve()
        .then(
          () => {
            console.log(
              "Promise Inside Timer"
            );
          }
        );
    },
    0
  );

  // Step 5:
  console.log(
    "Get Employee End"
  );
}

// Step 6:
console.log(
  "Start"
);

// Step 7:
getEmployee(
  (
    error,
    employee
  ) => {
    if (
      error
    ) {
      console.log(
        error
      );

      return;
    }

    // Step 8:
    console.log(
      employee.name
    );
  }
);

// Step 9:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Outer Promise"
      );
    }
  );

// Step 10:
console.log(
  "End"
);
```

Output:

```text
Start
Get Employee Start
Get Employee End
End
Outer Promise
Employee Timer
Rahul
Promise Inside Timer
```

Complete trace:

```text
Synchronous:
Start

getEmployee()
↓
Get Employee Start

timer registered

Get Employee End

outer Promise microtask queued

End

Synchronous stack empty

Microtask:
Outer Promise

Next task:
Employee Timer

callback(error, employee)
↓
Rahul

Promise Inside Timer microtask queued

Timer callback finishes

Microtask checkpoint:
Promise Inside Timer
```

---

# Quick Memory 🧠🔥🔥🔥

## Callback

```text
function passed
into another function
```

## Function Reference

```text
greet
```

## Function Call

```text
greet()
```

## Synchronous Callback

```text
called now
inside current execution
```

## Asynchronous Callback

```text
called later
after async work/scheduling
```

## Array Methods

```text
map
filter
reduce
forEach
→ synchronous callbacks
```

## Timer Callback

```text
asynchronous
```

## Error-First Callback

```text
callback(error, result)
```

## Success

```text
error = null
result = value
```

## Failure

```text
error = Error
result usually null/undefined
```

## Callback Hell

```text
deep nested callbacks
```

## Inversion of Control

```text
give callback to other code
↓
other code controls execution
```

## Async Return Trap

```text
async callback runs later
↓
outer function may return first
```

## `this` Trap

```text
passing obj.method
can lose receiver
```

## Fix `this`

```text
bind()
or
arrow wrapper
```

## Best Callback Rule

```text
Know:
WHEN it runs
HOW MANY times
WHAT arguments
HOW errors work
```

## Most Important Interview Answer

```text
A callback is a function
passed to another function or API
so that receiving code
can execute it at the appropriate time.

Callbacks can be synchronous,
like map/filter callbacks,
or asynchronous,
like timer and event callbacks.

Deeply nested dependent async callbacks
can create callback hell,
which is one reason Promises
and async/await became popular.
```

---

# ✅ 8.3 Callbacks Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
8.2 Timers ✅
8.3 Callbacks ✅
```

Next topic:

```text
8.4 Promises 🔥🔥🔥
├── Promise Creation
├── Pending / Fulfilled / Rejected
├── resolve()
├── reject()
├── then()
├── catch()
├── finally()
├── Promise Chaining
├── Return Rules
├── Error Propagation
├── Microtask Behaviour
└── Output Questions
```

**Next: 8.4 Promises 🔥🔥🔥**
