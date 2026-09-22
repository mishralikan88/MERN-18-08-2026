# 8.5 Async / Await 🔥🔥🔥

`async` and `await` are cleaner syntax for working with Promises.

They do **not** replace Promises internally.

Master mental model:

```text
async function
↓
always returns a Promise

await promise
↓
pause only this async function
↓
let other JavaScript continue
↓
Promise settles
↓
resume async function later
```

Most important rule:

```text
await does NOT block the whole JavaScript thread.
```

It pauses the current `async` function until the awaited value is ready.

This chapter covers:

```text
async
await
Async Return Behaviour
Awaiting Promises
Awaiting Normal Values
Microtask Behaviour
Sequential Execution
Parallel Execution
Promise.all() Preview
Error Handling
try / catch
finally
Rejected Promises
Return Rules
Throwing Errors
Loops With await
for...of
forEach + async Trap
map() + async
Performance
Dependent Requests
Independent Requests
Real API-Style Flow
Output Questions
Debugging
Interview Questions
```

---

# 1. What Is `async`? 🔥🔥🔥

`async` is used before a function.

Example:

```js
// Step 1:
async function getValue() {
  // Step 2:
  return 100;
}

// Step 3:
console.log(
  getValue()
);
```

Output:

```text
Promise object
```

The exact Promise representation depends on the runtime.

Important:

```text
async function
→ always returns a Promise
```

---

# 2. Async Function Returning Normal Value

```js
// Step 1:
async function getValue() {
  // Step 2:
  return 100;
}

// Step 3:
getValue()
  .then(
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
100
```

The normal value `100` becomes the fulfillment value of the returned Promise.

---

# 3. Mental Model of Async Return 🔥🔥🔥

This:

```js
async function getValue() {
  // Step 1:
  return 100;
}
```

is conceptually similar to:

```js
function getValue() {
  // Step 1:
  return Promise.resolve(
    100
  );
}
```

Not literally identical implementation, but the return behavior is equivalent for normal usage.

---

# 4. Async Function Returning a Promise

```js
// Step 1:
async function getValue() {
  // Step 2:
  return Promise.resolve(
    100
  );
}

// Step 3:
getValue()
  .then(
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
100
```

The returned async function Promise adopts the returned Promise's eventual result.

---

# 5. Async Function Throwing Error 🔥🔥🔥

```js
// Step 1:
async function getValue() {
  // Step 2:
  throw new Error(
    "Failed"
  );
}

// Step 3:
getValue()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Failed
```

Important:

```text
throw inside async function
→ returned Promise rejects
```

---

# 6. What Is `await`? 🔥🔥🔥

`await` waits for a Promise-like value inside an async function.

Example:

```js
// Step 1:
async function run() {
  // Step 2:
  const value =
    await Promise.resolve(
      100
    );

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
100
```

---

# 7. `await` Requires Async Context

Normally:

```text
await
→ used inside async function
```

Example:

```js
// Step 1:
async function run() {
  // Step 2:
  const value =
    await Promise.resolve(
      10
    );

  // Step 3:
  return value;
}
```

Top-level `await` is also supported in JavaScript modules in environments that support it.

---

# 8. Await Does Not Block the Whole Thread 🔥🔥🔥

```js
// Step 1:
async function run() {
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run();

// Step 5:
console.log(
  "C"
);
```

Output:

```text
A
C
B
```

Why?

```text
run starts
↓
A

await reached
↓
run pauses

global code continues
↓
C

await continuation resumes later
↓
B
```

---

# 9. Await Continuation Uses Microtask Scheduling 🔥🔥🔥

When the awaited Promise settles:

```text
remaining async function
→ resumes later
→ through Promise/microtask machinery
```

That is why:

```text
A
C
B
```

not:

```text
A
B
C
```

---

# 10. Awaiting an Already Fulfilled Promise

```js
// Step 1:
async function run() {
  console.log(
    "Start"
  );

  // Step 2:
  await Promise.resolve(
    "Done"
  );

  // Step 3:
  console.log(
    "After Await"
  );
}

// Step 4:
run();

// Step 5:
console.log(
  "Outside"
);
```

Output:

```text
Start
Outside
After Await
```

Even an already fulfilled Promise causes the async function continuation to resume later.

---

# 11. Awaiting a Normal Value 🔥🔥

You can technically await a non-Promise value.

```js
// Step 1:
async function run() {
  // Step 2:
  const value =
    await 100;

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
100
```

Conceptually JavaScript treats it similarly to:

```text
Promise.resolve(100)
```

for awaiting purposes.

---

# 12. Awaiting Normal Value Still Yields

```js
// Step 1:
async function run() {
  console.log(
    "A"
  );

  // Step 2:
  await 100;

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run();

// Step 5:
console.log(
  "C"
);
```

Output:

```text
A
C
B
```

---

# 13. Basic Async/Await Promise Conversion 🔥🔥🔥

Promise style:

```js
function getEmployee() {
  // Step 1:
  return Promise.resolve(
    {
      id: 1,
      name: "Rahul",
    }
  );
}

// Step 2:
getEmployee()
  .then(
    (
      employee
    ) => {
      console.log(
        employee.name
      );
    }
  );
```

Async/await style:

```js
async function run() {
  // Step 1:
  const employee =
    await getEmployee();

  // Step 2:
  console.log(
    employee.name
  );
}

// Step 3:
run();
```

Output:

```text
Rahul
```

---

# 14. Why Async/Await Is Easier to Read

Promise chain:

```text
getUser()
.then(getOrders)
.then(getDetails)
.then(...)
```

Async/await:

```text
const user = await getUser();
const orders = await getOrders(user.id);
const details = await getDetails(orders[0].id);
```

It looks more like normal top-to-bottom code.

---

# 15. Async/Await Still Uses Promises 🔥🔥🔥

Important interview answer:

```text
async/await
is syntax built on top of Promises
```

So you still need to understand:

```text
Promise states
resolve/reject
microtasks
error propagation
Promise.all()
```

---

# 16. Async Function Returns Promise Immediately

```js
// Step 1:
async function run() {
  // Step 2:
  await new Promise(
    (
      resolve
    ) => {
      setTimeout(
        resolve,
        100
      );
    }
  );

  // Step 3:
  return "Done";
}

// Step 4:
const result =
  run();

// Step 5:
console.log(
  result instanceof Promise
); // Output: true
```

Output:

```text
true
```

The async function call returns a Promise immediately.

---

# 17. Caller Does Not Receive Final Value Directly 🔥🔥🔥

Wrong mental model:

```text
const result = asyncFunction();
→ final value
```

Actual:

```text
const result = asyncFunction();
→ Promise
```

To get final value:

```text
await asyncFunction()
```

or:

```text
asyncFunction().then(...)
```

---

# 18. Calling Async Function With `.then()`

```js
// Step 1:
async function getValue() {
  // Step 2:
  return 50;
}

// Step 3:
getValue()
  .then(
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
50
```

---

# 19. Calling Async Function With `await`

```js
// Step 1:
async function getValue() {
  // Step 2:
  return 50;
}

async function run() {
  // Step 3:
  const value =
    await getValue();

  // Step 4:
  console.log(
    value
  );
}

// Step 5:
run();
```

Output:

```text
50
```

---

# 20. Multiple Await Statements 🔥🔥🔥

```js
// Step 1:
async function run() {
  // Step 2:
  const first =
    await Promise.resolve(
      10
    );

  // Step 3:
  const second =
    await Promise.resolve(
      20
    );

  // Step 4:
  console.log(
    first + second
  );
}

// Step 5:
run();
```

Output:

```text
30
```

---

# 21. Sequential Await 🔥🔥🔥

If you write:

```js
// Step 1:
const first =
  await getFirst();

// Step 2:
const second =
  await getSecond();
```

then:

```text
getSecond()
starts only after getFirst() completes
```

This is sequential execution.

---

# 22. Sequential Timeline

```text
getFirst starts
↓
wait
↓
getFirst completes
↓
getSecond starts
↓
wait
↓
getSecond completes
```

Useful when:

```text
second operation depends on first result
```

---

# 23. Dependent Request Example 🔥🔥🔥

```js
function getUser() {
  // Step 1:
  return Promise.resolve(
    {
      id: 1,
    }
  );
}

function getOrders(
  userId
) {
  // Step 2:
  return Promise.resolve(
    [
      {
        id: 101,
        userId,
      },
    ]
  );
}

async function run() {
  // Step 3:
  const user =
    await getUser();

  // Step 4:
  const orders =
    await getOrders(
      user.id
    );

  // Step 5:
  console.log(
    orders[0].id
  );
}

// Step 6:
run();
```

Output:

```text
101
```

Sequential is correct because orders depend on user ID.

---

# 24. Independent Requests Should Not Always Be Sequential 🔥🔥🔥

Suppose:

```text
getEmployees()
getDepartments()
```

do not depend on each other.

This:

```js
// Step 1:
const employees =
  await getEmployees();

// Step 2:
const departments =
  await getDepartments();
```

runs sequentially.

That can be unnecessarily slower.

---

# 25. Sequential Independent Example

```js
function getEmployees() {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      setTimeout(
        () => {
          resolve(
            [
              "Rahul",
            ]
          );
        },
        100
      );
    }
  );
}

function getDepartments() {
  // Step 2:
  return new Promise(
    (
      resolve
    ) => {
      setTimeout(
        () => {
          resolve(
            [
              "IT",
            ]
          );
        },
        100
      );
    }
  );
}

async function run() {
  // Step 3:
  const employees =
    await getEmployees();

  // Step 4:
  const departments =
    await getDepartments();

  // Step 5:
  console.log(
    employees,
    departments
  );
}

// Step 6:
run();
```

Conceptually:

```text
~100ms
+
~100ms
≈ ~200ms
```

Ignoring scheduling overhead.

---

# 26. Start Independent Promises Together 🔥🔥🔥

Better pattern:

```js
async function run() {
  // Step 1:
  const employeesPromise =
    getEmployees();

  // Step 2:
  const departmentsPromise =
    getDepartments();

  // Step 3:
  const employees =
    await employeesPromise;

  // Step 4:
  const departments =
    await departmentsPromise;

  // Step 5:
  console.log(
    employees,
    departments
  );
}
```

Both operations start before the first await.

---

# 27. Parallel/Concurrent Promise Start Mental Model

```text
start employees request
start departments request
↓
both in progress
↓
await results
```

This is concurrency.

Do not automatically call it CPU parallelism.

---

# 28. `Promise.all()` Preview 🔥🔥🔥

A cleaner pattern for independent Promises:

```js
async function run() {
  // Step 1:
  const [
    employees,
    departments,
  ] =
    await Promise.all(
      [
        getEmployees(),
        getDepartments(),
      ]
    );

  // Step 2:
  console.log(
    employees,
    departments
  );
}
```

We will study Promise combinators deeply in 8.8.

---

# 29. Sequential vs Concurrent Rule 🔥🔥🔥

Use sequential when:

```text
B needs result of A
```

Use concurrent start when:

```text
A and B are independent
```

---

# 30. Performance Interview Question

Bad:

```text
await A
await B
await C
```

when all are independent.

Better:

```text
start A
start B
start C
↓
await together
```

---

# 31. `try / catch` With Async/Await 🔥🔥🔥

Async/await makes Promise error handling look like synchronous error handling.

```js
async function run() {
  try {
    // Step 1:
    const value =
      await Promise.resolve(
        100
      );

    // Step 2:
    console.log(
      value
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );
  }
}

// Step 4:
run();
```

Output:

```text
100
```

---

# 32. Catching Rejected Promise 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    await Promise.reject(
      new Error(
        "Failed"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );
  }
}

// Step 3:
run();
```

Output:

```text
Failed
```

---

# 33. Await Turns Rejection Into a Throw-Like Flow 🔥🔥🔥

Inside async function:

```text
await rejectedPromise
```

behaves conceptually like:

```text
throw rejection reason
```

so `try/catch` can handle it.

---

# 34. Error After Await

```js
async function run() {
  try {
    // Step 1:
    const value =
      await Promise.resolve(
        10
      );

    // Step 2:
    throw new Error(
      `Failed after ${value}`
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );
  }
}

// Step 4:
run();
```

Output:

```text
Failed after 10
```

---

# 35. Throw Inside Async Function Rejects Returned Promise 🔥🔥🔥

```js
async function run() {
  // Step 1:
  throw new Error(
    "Boom"
  );
}

// Step 2:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Boom
```

---

# 36. `finally` With Async/Await

```js
async function run() {
  try {
    // Step 1:
    console.log(
      "Start"
    );

    // Step 2:
    await Promise.resolve();
  } finally {
    // Step 3:
    console.log(
      "Cleanup"
    );
  }
}

// Step 4:
run();
```

Output:

```text
Start
Cleanup
```

---

# 37. `try/catch/finally` Pattern 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    console.log(
      "Loading"
    );

    // Step 2:
    const value =
      await Promise.resolve(
        100
      );

    // Step 3:
    console.log(
      value
    );
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.message
    );
  } finally {
    // Step 5:
    console.log(
      "Finished"
    );
  }
}

// Step 6:
run();
```

Output:

```text
Loading
100
Finished
```

---

# 38. Real UI Pattern

```text
try
→ set loading true
→ await API

catch
→ show error

finally
→ set loading false
```

Very common in frontend code.

---

# 39. Real Employee Loading Example 🔥🔥🔥

```js
function getEmployee() {
  // Step 1:
  return Promise.resolve(
    {
      id: 1,
      name: "Rahul",
    }
  );
}

async function loadEmployee() {
  try {
    // Step 2:
    console.log(
      "Loading"
    );

    // Step 3:
    const employee =
      await getEmployee();

    // Step 4:
    console.log(
      employee.name
    );
  } catch (
    error
  ) {
    // Step 5:
    console.log(
      error.message
    );
  } finally {
    // Step 6:
    console.log(
      "Finished"
    );
  }
}

// Step 7:
loadEmployee();
```

Output:

```text
Loading
Rahul
Finished
```

---

# 40. Do Not Forget to Await When Needed 🔥🔥🔥

Wrong:

```js
async function run() {
  // Step 1:
  const employee =
    getEmployee();

  // Step 2:
  console.log(
    employee.name
  );
}
```

Problem:

```text
employee
→ Promise
```

not final employee object.

---

# 41. Correct Await

```js
async function run() {
  // Step 1:
  const employee =
    await getEmployee();

  // Step 2:
  console.log(
    employee.name
  );
}

// Step 3:
run();
```

---

# 42. Forgetting Await Can Be Intentional

Sometimes you **want** the Promise itself.

Example:

```js
async function run() {
  // Step 1:
  const promise =
    getEmployee();

  // Step 2:
  const employee =
    await promise;

  // Step 3:
  console.log(
    employee.name
  );
}
```

This is useful when starting multiple operations together.

---

# 43. Awaiting Same Promise Later

```js
async function run() {
  // Step 1:
  const promise =
    Promise.resolve(
      100
    );

  // Step 2:
  const value =
    await promise;

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
100
```

---

# 44. Async Function Without Await 🔥🔥

An async function does not require `await`.

```js
// Step 1:
async function getValue() {
  // Step 2:
  return 100;
}

// Step 3:
getValue()
  .then(
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
100
```

---

# 45. Async Function Before First Await Runs Synchronously 🔥🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
console.log(
  "C"
);

// Step 5:
run();

// Step 6:
console.log(
  "D"
);
```

Output:

```text
C
A
D
B
```

---

# 46. Why `C A D B`?

Trace:

```text
C

run()
↓
A

await reached
↓
run pauses

D

microtask resumes run
↓
B
```

---

# 47. Multiple Async Functions 🔥🔥🔥

```js
async function first() {
  // Step 1:
  console.log(
    "First A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "First B"
  );
}

async function second() {
  // Step 4:
  console.log(
    "Second A"
  );

  // Step 5:
  await Promise.resolve();

  // Step 6:
  console.log(
    "Second B"
  );
}

// Step 7:
first();

// Step 8:
second();

// Step 9:
console.log(
  "End"
);
```

Output:

```text
First A
Second A
End
First B
Second B
```

---

# 48. Await + Existing Promise Microtask Ordering 🔥🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run();

// Step 5:
Promise.resolve()
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );

// Step 6:
console.log(
  "D"
);
```

Output:

```text
A
D
B
C
```

Why?

The await continuation microtask is queued before the later `.then()` callback.

---

# 49. Reverse Registration Order

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );

async function run() {
  // Step 2:
  console.log(
    "A"
  );

  // Step 3:
  await Promise.resolve();

  // Step 4:
  console.log(
    "B"
  );
}

// Step 5:
run();

// Step 6:
console.log(
  "D"
);
```

Output:

```text
A
D
C
B
```

Because `C` was queued first.

---

# 50. Await + Timer 🔥🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
setTimeout(
  () => {
    console.log(
      "Timer"
    );
  },
  0
);

// Step 5:
run();

// Step 6:
console.log(
  "C"
);
```

Output:

```text
A
C
B
Timer
```

Microtask continuation runs before timer task.

---

# 51. Awaiting Timer-Based Promise

```js
function delay() {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      // Step 2:
      setTimeout(
        resolve,
        0
      );
    }
  );
}

async function run() {
  // Step 3:
  console.log(
    "A"
  );

  // Step 4:
  await delay();

  // Step 5:
  console.log(
    "B"
  );
}

// Step 6:
run();

// Step 7:
console.log(
  "C"
);
```

Output:

```text
A
C
B
```

---

# 52. What Happens Internally in Await Delay? 🔥🔥🔥

```text
run()
↓
A

delay()
↓
Promise created
↓
timer registered

await pauses run

C

timer task runs
↓
resolve()

Promise settles
↓
async continuation queued as microtask

B
```

---

# 53. Await Return Value

```js
async function run() {
  // Step 1:
  const value =
    await Promise.resolve(
      10
    );

  // Step 2:
  return (
    value * 2
  );
}

// Step 3:
run()
  .then(
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
20
```

---

# 54. Await Rejection Without Catch 🔥🔥🔥

```js
async function run() {
  // Step 1:
  await Promise.reject(
    new Error(
      "Failed"
    )
  );

  // Step 2:
  console.log(
    "Never"
  );
}

// Step 3:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Failed
```

The line after the rejected await is skipped.

---

# 55. Catch Locally vs Caller Catch

Local:

```js
async function run() {
  try {
    // Step 1:
    await Promise.reject(
      new Error(
        "Failed"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );
  }
}

// Step 3:
run();
```

Caller:

```js
async function run() {
  // Step 1:
  await Promise.reject(
    new Error(
      "Failed"
    )
  );
}

// Step 2:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Both are valid patterns depending on responsibility.

---

# 56. Error Handling Responsibility 🔥🔥🔥

Handle an error where you can:

```text
recover
add meaningful context
show UI feedback
or make a decision
```

Otherwise:

```text
let it propagate
```

---

# 57. Re-throwing From Async Catch

```js
async function run() {
  try {
    // Step 1:
    await Promise.reject(
      new Error(
        "Original"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // Step 3:
    throw new Error(
      "Wrapped"
    );
  }
}

// Step 4:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Original
Wrapped
```

---

# 58. Returning From Catch Recovers 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    await Promise.reject(
      new Error(
        "Failed"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // Step 3:
    return 100;
  }
}

// Step 4:
run()
  .then(
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
Failed
100
```

The async function's returned Promise becomes fulfilled with `100`.

---

# 59. `finally` Can Override With Throw

```js
async function run() {
  try {
    // Step 1:
    return 100;
  } finally {
    // Step 2:
    throw new Error(
      "Cleanup Failed"
    );
  }
}

// Step 3:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Cleanup Failed
```

---

# 60. Sequential Loop With `for...of` 🔥🔥🔥

```js
function processItem(
  item
) {
  // Step 1:
  return Promise.resolve(
    item * 2
  );
}

async function run() {
  // Step 2:
  const items = [
    1,
    2,
    3,
  ];

  // Step 3:
  for (
    const item
    of
    items
  ) {
    const result =
      await processItem(
        item
      );

    console.log(
      result
    );
  }
}

// Step 4:
run();
```

Output:

```text
2
4
6
```

This processes items sequentially.

---

# 61. Why `for...of + await` Is Sequential

```text
iteration 1
↓
await
↓
complete

iteration 2
↓
await
↓
complete

iteration 3
```

Good when order matters or rate limiting is needed.

---

# 62. `forEach()` + Async Trap 🔥🔥🔥

Common mistake:

```js
async function run() {
  // Step 1:
  const items = [
    1,
    2,
    3,
  ];

  // Step 2:
  items.forEach(
    async (
      item
    ) => {
      await Promise.resolve();

      console.log(
        item
      );
    }
  );

  // Step 3:
  console.log(
    "Done"
  );
}

// Step 4:
run();
```

Output:

```text
Done
1
2
3
```

---

# 63. Why `forEach()` Does Not Wait 🔥🔥🔥

`forEach()` does not understand or await the Promises returned by its callback.

Mental model:

```text
forEach starts async callback 1
forEach starts async callback 2
forEach starts async callback 3
↓
forEach finishes immediately
↓
Done
↓
async callbacks continue later
```

---

# 64. Wrong Expectation With `forEach()`

Wrong:

```text
await inside forEach
→ outer function waits for all items
```

False.

The outer function does not automatically wait for those callback Promises.

---

# 65. Correct Sequential Loop

Use:

```text
for...of + await
```

when sequential processing is required.

---

# 66. Concurrent Array Processing With `map()` 🔥🔥🔥

If items are independent:

```js
function processItem(
  item
) {
  // Step 1:
  return Promise.resolve(
    item * 2
  );
}

async function run() {
  // Step 2:
  const items = [
    1,
    2,
    3,
  ];

  // Step 3:
  const promises =
    items.map(
      async (
        item
      ) => {
        return await processItem(
          item
        );
      }
    );

  // Step 4:
  const results =
    await Promise.all(
      promises
    );

  // Step 5:
  console.log(
    results
  );
}

// Step 6:
run();
```

Output:

```text
[2, 4, 6]
```

---

# 67. `map(async ...)` Returns Promises 🔥🔥🔥

This is critical.

```js
// Step 1:
const items = [
  1,
  2,
  3,
];

// Step 2:
const result =
  items.map(
    async (
      item
    ) => {
      return (
        item * 2
      );
    }
  );

// Step 3:
console.log(
  result.every(
    (
      item
    ) => {
      return (
        item instanceof Promise
      );
    }
  )
); // Output: true
```

Output:

```text
true
```

`map(async ...)` gives:

```text
Array<Promise>
```

---

# 68. Common `map(async)` Mistake

Wrong:

```js
// Step 1:
const result =
  [
    1,
    2,
    3,
  ].map(
    async (
      item
    ) => {
      return (
        item * 2
      );
    }
  );

// Step 2:
console.log(
  result
);
```

Output conceptually:

```text
[Promise, Promise, Promise]
```

not:

```text
[2, 4, 6]
```

---

# 69. Correct `map(async)` Pattern 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const promises =
    [
      1,
      2,
      3,
    ].map(
      async (
        item
      ) => {
        return (
          item * 2
        );
      }
    );

  // Step 2:
  const result =
    await Promise.all(
      promises
    );

  // Step 3:
  console.log(
    result
  );
}

// Step 4:
run();
```

Output:

```text
[2, 4, 6]
```

---

# 70. Avoid Redundant `return await` — Awareness 🔥🔥

Often this:

```js
async function getValue() {
  // Step 1:
  return await Promise.resolve(
    100
  );
}
```

can simply be:

```js
async function getValue() {
  // Step 1:
  return Promise.resolve(
    100
  );
}
```

However, `return await` can matter in some `try/catch` or stack-trace/error-handling situations.

So do not treat it as universally wrong.

---

# 71. `return await` Inside `try/catch` 🔥🔥🔥

```js
async function getValue() {
  try {
    // Step 1:
    return await Promise.reject(
      new Error(
        "Failed"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // Step 3:
    return 100;
  }
}

// Step 4:
getValue()
  .then(
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
Failed
100
```

Here `await` ensures the rejection occurs inside the `try` block.

---

# 72. Without Await in That `try/catch`

```js
async function getValue() {
  try {
    // Step 1:
    return Promise.reject(
      new Error(
        "Failed"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      "Local Catch"
    );

    return 100;
  }
}

// Step 3:
getValue()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Failed
```

The local synchronous `catch` does not intercept the returned Promise's later rejection in that form.

---

# 73. Await in Conditional Flow

```js
async function run(
  shouldLoad
) {
  // Step 1:
  if (
    shouldLoad
  ) {
    const value =
      await Promise.resolve(
        100
      );

    console.log(
      value
    );
  }

  // Step 2:
  console.log(
    "Done"
  );
}

// Step 3:
run(
  true
);
```

Output:

```text
100
Done
```

---

# 74. Await in `if` Does Not Block Other Code Globally

Only the current async function pauses.

Other events, timers, and JavaScript tasks can continue when scheduled.

---

# 75. Await in Loops — Use Case 🔥🔥🔥

Good use for sequential API calls:

```text
process order 1
↓
wait
process order 2
↓
wait
process order 3
```

Useful when:

```text
order matters
server rate limits
each step depends on previous
```

---

# 76. Avoid Sequential Await When Not Needed

If 100 independent requests are made one-by-one:

```text
await request 1
await request 2
...
await request 100
```

this may be much slower than controlled concurrency.

But firing all 100 at once can also overload systems.

Senior-level thinking:

```text
choose appropriate concurrency
```

not simply:

```text
parallelize everything
```

---

# 77. Controlled Concurrency Awareness 🔥🔥

Real systems may use:

```text
batching
concurrency limits
queues
workers
```

Full implementation can come later in advanced practice.

---

# 78. Async/Await + `Promise.all()` Error Behavior Preview

```js
async function run() {
  try {
    // Step 1:
    const result =
      await Promise.all(
        [
          Promise.resolve(
            10
          ),
          Promise.reject(
            new Error(
              "Failed"
            )
          ),
        ]
      );

    // Step 2:
    console.log(
      result
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );
  }
}

// Step 4:
run();
```

Output:

```text
Failed
```

`Promise.all()` rejects when one input rejects.

Deep details come in 8.8.

---

# 79. Async Function Returning Undefined 🔥🔥

```js
// Step 1:
async function run() {
  // Step 2:
  console.log(
    "Hello"
  );

  // No return.
}

// Step 3:
run()
  .then(
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
Hello
undefined
```

Because:

```text
no explicit return
→ undefined
→ returned Promise fulfills with undefined
```

---

# 80. Async Function Returning Object

```js
// Step 1:
async function getEmployee() {
  // Step 2:
  return {
    id: 1,
    name: "Rahul",
  };
}

// Step 3:
getEmployee()
  .then(
    (
      employee
    ) => {
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

# 81. Async Arrow Function 🔥🔥🔥

```js
// Step 1:
const getValue =
  async () => {
    // Step 2:
    return 100;
  };

// Step 3:
getValue()
  .then(
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
100
```

---

# 82. Async Method in Object

```js
// Step 1:
const employeeService = {
  async getEmployee() {
    // Step 2:
    return {
      id: 1,
      name: "Rahul",
    };
  },
};

// Step 3:
employeeService
  .getEmployee()
  .then(
    (
      employee
    ) => {
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

# 83. Async Class Method 🔥🔥

```js
class EmployeeService {
  // Step 1:
  async getEmployee() {
    return {
      id: 1,
      name: "Rahul",
    };
  }
}

// Step 2:
const service =
  new EmployeeService();

// Step 3:
service
  .getEmployee()
  .then(
    (
      employee
    ) => {
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

# 84. Async/Await Does Not Automatically Catch Errors 🔥🔥🔥

Wrong mental model:

```text
using await
→ errors automatically handled
```

False.

You still need:

```text
try/catch
```

or let the returned Promise reject and handle it elsewhere.

---

# 85. Unhandled Rejection Awareness

If an async function rejects and nobody handles it:

```text
runtime may report an unhandled Promise rejection
```

Exact reporting behavior depends on environment.

---

# 86. Fire-and-Forget Awareness 🔥🔥

Sometimes code intentionally starts async work without awaiting it.

But then you must still decide:

```text
How will errors be handled?
Who owns lifecycle?
Can it be cancelled?
```

Do not casually ignore returned Promises.

---

# 87. Common Bug — Missing Error Handling

```js
async function run() {
  // Step 1:
  await Promise.reject(
    new Error(
      "Failed"
    )
  );
}

// Step 2:
run();
```

This produces an unhandled rejection if nothing else handles it.

---

# 88. Better Caller Handling

```js
async function run() {
  // Step 1:
  await Promise.reject(
    new Error(
      "Failed"
    )
  );
}

// Step 2:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Failed
```

---

# 89. Real App — Load Multiple Dashboard Data 🔥🔥🔥

```js
function getEmployees() {
  // Step 1:
  return Promise.resolve(
    [
      "Rahul",
      "Priya",
    ]
  );
}

function getDepartments() {
  // Step 2:
  return Promise.resolve(
    [
      "IT",
      "HR",
    ]
  );
}

async function loadDashboard() {
  try {
    // Step 3:
    const [
      employees,
      departments,
    ] =
      await Promise.all(
        [
          getEmployees(),
          getDepartments(),
        ]
      );

    // Step 4:
    console.log(
      employees.length
    );

    // Step 5:
    console.log(
      departments.length
    );
  } catch (
    error
  ) {
    // Step 6:
    console.log(
      error.message
    );
  }
}

// Step 7:
loadDashboard();
```

Output:

```text
2
2
```

---

# 90. Real App — Dependent API Flow 🔥🔥🔥

```js
function getUser() {
  // Step 1:
  return Promise.resolve(
    {
      id: 1,
      name: "Rahul",
    }
  );
}

function getOrders(
  userId
) {
  // Step 2:
  return Promise.resolve(
    [
      {
        id: 101,
        userId,
      },
    ]
  );
}

function getOrderDetails(
  orderId
) {
  // Step 3:
  return Promise.resolve(
    {
      id: orderId,
      amount: 500,
    }
  );
}

async function loadData() {
  // Step 4:
  const user =
    await getUser();

  // Step 5:
  const orders =
    await getOrders(
      user.id
    );

  // Step 6:
  const details =
    await getOrderDetails(
      orders[0].id
    );

  // Step 7:
  console.log(
    details.amount
  );
}

// Step 8:
loadData();
```

Output:

```text
500
```

---

# 91. Promise Chain vs Async/Await 🔥🔥🔥

Promise chain:

```js
// Step 1:
getUser()
  .then(
    (
      user
    ) => {
      return getOrders(
        user.id
      );
    }
  )
  .then(
    (
      orders
    ) => {
      return getOrderDetails(
        orders[0].id
      );
    }
  )
  .then(
    (
      details
    ) => {
      console.log(
        details.amount
      );
    }
  );
```

Async/await:

```js
async function loadData() {
  // Step 1:
  const user =
    await getUser();

  // Step 2:
  const orders =
    await getOrders(
      user.id
    );

  // Step 3:
  const details =
    await getOrderDetails(
      orders[0].id
    );

  // Step 4:
  console.log(
    details.amount
  );
}
```

Same Promise-based model.

Different syntax.

---

# 92. Common Bug — Serializing Independent Work 🔥🔥🔥

Bad:

```js
async function run() {
  // Step 1:
  const a =
    await Promise.resolve(
      "A"
    );

  // Step 2:
  const b =
    await Promise.resolve(
      "B"
    );

  // Step 3:
  return [
    a,
    b,
  ];
}
```

Not logically wrong.

But if the operations are slow and independent, sequential waiting can waste time.

---

# 93. Better Independent Pattern

```js
async function run() {
  // Step 1:
  const aPromise =
    Promise.resolve(
      "A"
    );

  // Step 2:
  const bPromise =
    Promise.resolve(
      "B"
    );

  // Step 3:
  const [
    a,
    b,
  ] =
    await Promise.all(
      [
        aPromise,
        bPromise,
      ]
    );

  // Step 4:
  return [
    a,
    b,
  ];
}
```

---

# 94. Common Bug — `await` Inside `map()` but No `Promise.all()` 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const result =
    [
      1,
      2,
      3,
    ].map(
      async (
        item
      ) => {
        return (
          item * 2
        );
      }
    );

  // Step 2:
  console.log(
    result
  );
}
```

Output conceptually:

```text
[Promise, Promise, Promise]
```

---

# 95. Correct `map()` + Await

```js
async function run() {
  // Step 1:
  const promises =
    [
      1,
      2,
      3,
    ].map(
      async (
        item
      ) => {
        return (
          item * 2
        );
      }
    );

  // Step 2:
  const result =
    await Promise.all(
      promises
    );

  // Step 3:
  console.log(
    result
  );
}

// Step 4:
run();
```

Output:

```text
[2, 4, 6]
```

---

# 96. Common Bug — Expecting `await` Outside Async Function

Wrong in normal script/function context:

```js
function run() {
  // Step 1:
  // await Promise.resolve(10);
}
```

`await` requires an async function context, except supported top-level module usage.

---

# 97. Common Bug — Mixing `.then()` and `await` Unnecessarily 🔥🔥

Possible but often noisy:

```js
async function run() {
  // Step 1:
  const value =
    await Promise.resolve(
      10
    )
      .then(
        (
          value
        ) => {
          return (
            value * 2
          );
        }
      );

  // Step 2:
  console.log(
    value
  );
}
```

Output:

```text
20
```

Usually choose one clear style for a flow unless mixing has a specific reason.

---

# 98. Cleaner Version

```js
async function run() {
  // Step 1:
  const value =
    await Promise.resolve(
      10
    );

  // Step 2:
  const doubled =
    value * 2;

  // Step 3:
  console.log(
    doubled
  );
}
```

Output:

```text
20
```

---

# 99. Interview Output 1 🔥🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run();

// Step 5:
console.log(
  "C"
);
```

Expected output:

```text
A
C
B
```

---

# 100. Interview Output 2 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

async function run() {
  // Step 2:
  console.log(
    "B"
  );

  // Step 3:
  await Promise.resolve();

  // Step 4:
  console.log(
    "C"
  );
}

// Step 5:
run();

// Step 6:
console.log(
  "D"
);
```

Expected output:

```text
A
B
D
C
```

---

# 101. Interview Output 3 — Await Normal Value

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await 10;

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run();

// Step 5:
console.log(
  "C"
);
```

Expected output:

```text
A
C
B
```

---

# 102. Interview Output 4 — Async Return 🔥🔥🔥

```js
// Step 1:
async function getValue() {
  // Step 2:
  return 100;
}

// Step 3:
console.log(
  getValue()
  instanceof
  Promise
);
```

Expected output:

```text
true
```

---

# 103. Interview Output 5 — Throw in Async Function

```js
async function run() {
  // Step 1:
  throw new Error(
    "Failed"
  );
}

// Step 2:
run()
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

Expected output:

```text
Failed
```

---

# 104. Interview Output 6 — Await Rejection 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    await Promise.reject(
      new Error(
        "Failed"
      )
    );

    // Step 2:
    console.log(
      "Never"
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );
  }
}

// Step 4:
run();
```

Expected output:

```text
Failed
```

---

# 105. Interview Output 7 — Microtask Ordering 🔥🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
run();

// Step 5:
Promise.resolve()
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );

// Step 6:
console.log(
  "D"
);
```

Expected output:

```text
A
D
B
C
```

---

# 106. Interview Output 8 — Timer + Await

```js
async function run() {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "B"
  );
}

// Step 4:
setTimeout(
  () => {
    console.log(
      "Timer"
    );
  },
  0
);

// Step 5:
run();

// Step 6:
console.log(
  "C"
);
```

Expected output:

```text
A
C
B
Timer
```

---

# 107. Interview Output 9 — `forEach` Trap 🔥🔥🔥

```js
async function run() {
  // Step 1:
  [
    1,
    2,
    3,
  ].forEach(
    async (
      item
    ) => {
      await Promise.resolve();

      console.log(
        item
      );
    }
  );

  // Step 2:
  console.log(
    "Done"
  );
}

// Step 3:
run();
```

Expected output:

```text
Done
1
2
3
```

---

# 108. Interview Output 10 — Catch Recovery

```js
async function run() {
  try {
    // Step 1:
    await Promise.reject(
      new Error(
        "Failed"
      )
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // Step 3:
    return 100;
  }
}

// Step 4:
run()
  .then(
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
Failed
100
```

---

# 109. Interview Question — What Does `async` Do? 🔥🔥🔥

Good answer:

```text
async makes a function always return a Promise.

A normal returned value
becomes the fulfillment value.

A thrown error
makes the returned Promise reject.
```

---

# 110. Interview Question — What Does `await` Do? 🔥🔥🔥

Good answer:

```text
await pauses execution of the current async function
until the awaited value is resolved.

It does not block the whole JavaScript thread.

Other JavaScript can continue,
and the async function resumes later.
```

---

# 111. Interview Question — Does Await Block JavaScript?

Good answer:

```text
No.

await pauses only the current async function.

It releases control back to the runtime,
allowing other queued JavaScript work
to execute when scheduled.
```

---

# 112. Interview Question — Async/Await vs Promises 🔥🔥🔥

Good answer:

```text
async/await is syntax built on top of Promises.

It makes dependent asynchronous code
look more sequential and readable.

Promise mechanics still control
resolution, rejection, and scheduling.
```

---

# 113. Interview Question — Sequential vs Parallel Await 🔥🔥🔥

Good answer:

```text
Sequential:
await A
await B

B starts after A finishes.

Concurrent:
start A
start B
await both

Use sequential when dependencies exist.
Use concurrent execution when operations are independent.
```

---

# 114. Interview Question — Why Is `forEach(async ...)` Tricky?

Good answer:

```text
forEach does not await
the Promises returned by its callback.

So the outer flow may continue
before async callback work finishes.

Use for...of for sequential processing
or map + Promise.all for concurrent processing.
```

---

# 115. Interview Question — What Does `map(async ...)` Return? 🔥🔥🔥

Good answer:

```text
An array of Promises.

Because every async callback
returns a Promise.

Use Promise.all()
if you need the final resolved values.
```

---

# 116. Interview Question — How Do You Handle Errors With Await?

Good answer:

```text
Use try/catch around awaited operations,
or allow the async function's returned Promise
to reject and handle it with .catch() at the caller.
```

---

# 117. Interview Question — What Happens Before First Await? 🔥🔥🔥

Good answer:

```text
Code before the first await
runs synchronously
when the async function is called.

After await,
the continuation resumes later
through Promise/microtask scheduling.
```

---

# 118. Async/Await Debugging Checklist 🔥🔥🔥

When async/await code behaves incorrectly, check:

```text
Did I mark the function async?

Did I forget await?

Did I await something unnecessarily?

Am I accidentally serializing independent requests?

Should these requests start together?

Did I handle rejection?

Am I using forEach(async ...) incorrectly?

Did map(async ...) produce Promise[]?

Did I forget Promise.all()?

Am I mixing then() and await without need?

Am I expecting await to block the whole thread?

Did I forget the async function itself returns a Promise?
```

---

# 119. Async/Await Decision Guide 🔥🔥🔥

```text
Need clean Promise flow?
→ async/await

Need Promise result?
→ await

Need handle rejection locally?
→ try/catch

Need cleanup?
→ finally

Dependent operations?
→ sequential await

Independent operations?
→ start together / Promise.all

Sequential array work?
→ for...of + await

Concurrent array work?
→ map(async ...) + Promise.all

Need caller to handle failure?
→ let async function reject

Need one final value from async function?
→ return value
```

---

# 120. Final Master Trace 🔥🔥🔥

```js
function delayValue(
  value
) {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      // Step 2:
      setTimeout(
        () => {
          console.log(
            `Timer ${value}`
          );

          resolve(
            value
          );
        },
        0
      );
    }
  );
}

async function run() {
  // Step 3:
  console.log(
    "Run Start"
  );

  // Step 4:
  const first =
    await Promise.resolve(
      10
    );

  // Step 5:
  console.log(
    first
  );

  // Step 6:
  const secondPromise =
    delayValue(
      20
    );

  // Step 7:
  const thirdPromise =
    delayValue(
      30
    );

  try {
    // Step 8:
    const [
      second,
      third,
    ] =
      await Promise.all(
        [
          secondPromise,
          thirdPromise,
        ]
      );

    // Step 9:
    console.log(
      second + third
    );
  } catch (
    error
  ) {
    // Step 10:
    console.log(
      error.message
    );
  } finally {
    // Step 11:
    console.log(
      "Run Finished"
    );
  }

  // Step 12:
  return "Done";
}

// Step 13:
console.log(
  "Start"
);

// Step 14:
run()
  .then(
    (
      value
    ) => {
      console.log(
        value
      );
    }
  );

// Step 15:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Outer Promise"
      );
    }
  );

// Step 16:
console.log(
  "End"
);
```

Expected output:

```text
Start
Run Start
End
10
Outer Promise
Timer 20
Timer 30
50
Run Finished
Done
```

Complete trace:

```text
Synchronous:
Start

run()
↓
Run Start

await Promise.resolve(10)
↓
run pauses
↓
continuation queued as microtask

Outer Promise handler queued

End

Microtasks:
run continuation
↓
10

start delayValue(20)
start delayValue(30)
↓
two timers registered

await Promise.all(...)
↓
run pauses again

next microtask:
Outer Promise

Timer task:
Timer 20
↓
second Promise fulfills

Timer task:
Timer 30
↓
third Promise fulfills
↓
Promise.all fulfills
↓
run continuation queued

run resumes:
50
Run Finished
return "Done"

async run Promise fulfills
↓
final .then:
Done
```

---

# Quick Memory 🧠🔥🔥🔥

## `async`

```text
function always returns Promise
```

## Return Normal Value

```text
fulfilled Promise
```

## Throw Error

```text
rejected Promise
```

## `await`

```text
pause current async function
until value is ready
```

## Important

```text
await does NOT block whole JavaScript thread
```

## Before First Await

```text
runs synchronously
```

## After Await

```text
resumes later
through Promise/microtask scheduling
```

## Await Normal Value

```text
allowed
still resumes later
```

## Sequential

```text
await A
await B
```

## Independent Work

```text
start A
start B
await both
```

## Error Handling

```text
try
catch
finally
```

## Rejected Await

```text
acts like throw
inside async function
```

## `for...of + await`

```text
sequential
```

## `forEach(async ...)`

```text
outer flow does not wait
```

## `map(async ...)`

```text
returns Promise[]
```

## Resolve Mapped Results

```text
await Promise.all(promises)
```

## Async Function No Return

```text
Promise resolves with undefined
```

## Best Performance Rule

```text
Do not sequentially await
independent operations.
```

## Best Error Rule

```text
Handle where you can recover,
otherwise let rejection propagate.
```

## Most Important Interview Answer

```text
async/await is Promise-based syntax.

An async function always returns a Promise.

Code before the first await runs synchronously.

await pauses only the current async function,
not the entire JavaScript thread.

When the awaited Promise settles,
the function resumes later
through microtask scheduling.

Use sequential await for dependent operations,
and start independent operations together
for better performance.
```

---

# ✅ 8.5 Async / Await Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
8.2 Timers ✅
8.3 Callbacks ✅
8.4 Promises ✅
8.5 Async / Await ✅
```

Next topic:

```text
8.6 Fetch + HTTP 🔥🔥🔥
├── fetch()
├── GET
├── POST
├── PUT / PATCH
├── DELETE
├── Headers
├── Request Body
├── Query Parameters
├── response.json()
├── response.ok
├── status
├── HTTP Errors
├── Network Errors
└── AbortController
```

**Next: 8.6 Fetch + HTTP 🔥🔥🔥**
