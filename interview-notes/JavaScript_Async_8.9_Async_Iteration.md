# 8.9 Async Iteration 🔥🔥🔥

Async iteration means:

```text
processing multiple items
when each item may involve asynchronous work
```

Examples:

```text
fetch employee details
upload multiple files
process orders
send notifications
save records
call APIs in batches
```

The main question is:

```text
Should items run:

one by one

or

together?
```

Master mental model:

```text
for...of + await
→ sequential

map(async ...)
+ Promise.all()
→ concurrent

forEach(async ...)
→ does NOT wait for callbacks

batching
→ controlled concurrency
```

This chapter covers:

```text
Sequential Processing
Concurrent Processing
for...of + await
forEach + async Trap
map(async ...)
Promise.all()
Order Preservation
Completion Order
Error Handling
Batch Processing
Controlled Concurrency
Dependent Iteration
Independent Iteration
Real API Loops
Bulk Update
Bulk Delete
Retry Awareness
Performance
Debugging
Output Questions
Interview Questions
Machine-Coding Usage
```

---

# 1. What Is Async Iteration? 🔥🔥🔥

Normal iteration:

```js
// Step 1:
const numbers = [
  1,
  2,
  3,
];

// Step 2:
for (
  const number
  of
  numbers
) {
  console.log(
    number
  );
}
```

Output:

```text
1
2
3
```

Everything is synchronous.

Async iteration means each loop step may return a Promise.

---

# 2. Example Async Operation

```js
function processValue(
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
          resolve(
            value * 2
          );
        },
        100
      );
    }
  );
}
```

Now each item needs asynchronous processing.

---

# 3. Two Main Strategies 🔥🔥🔥

```text
Strategy 1
Sequential

item 1
↓
wait
↓
item 2
↓
wait
↓
item 3
```

or:

```text
Strategy 2
Concurrent

start item 1
start item 2
start item 3
↓
wait for all
```

---

# 4. Sequential Processing 🔥🔥🔥

Use sequential processing when:

```text
order matters

next operation depends on previous

server rate limits

operations must not overlap

you need controlled pacing
```

---

# 5. Sequential `for...of + await` 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  for (
    const value
    of
    values
  ) {
    // Step 3:
    const result =
      await processValue(
        value
      );

    // Step 4:
    console.log(
      result
    );
  }
}

// Step 5:
run();
```

Output:

```text
2
4
6
```

---

# 6. Sequential Mental Flow

```text
value 1
↓
processValue(1)
↓
await
↓
2

value 2
↓
processValue(2)
↓
await
↓
4

value 3
↓
processValue(3)
↓
await
↓
6
```

---

# 7. Why `for...of` Works Well With `await`

Because the loop itself waits at each iteration.

```text
iteration starts
↓
await Promise
↓
Promise settles
↓
continue same iteration
↓
next iteration
```

---

# 8. Real Example — Sequential Orders 🔥🔥🔥

```js
async function processOrder(
  orderId
) {
  // Step 1:
  return Promise.resolve(
    `Processed ${orderId}`
  );
}

async function processOrders() {
  // Step 2:
  const orderIds = [
    101,
    102,
    103,
  ];

  // Step 3:
  for (
    const orderId
    of
    orderIds
  ) {
    const result =
      await processOrder(
        orderId
      );

    console.log(
      result
    );
  }
}

// Step 4:
processOrders();
```

Output:

```text
Processed 101
Processed 102
Processed 103
```

---

# 9. When Sequential Is Required 🔥🔥🔥

Suppose:

```text
Step 1
create user

Step 2
use created user.id
to create profile

Step 3
use profile.id
to create settings
```

These are dependent operations.

Do not run them all together.

---

# 10. Dependent Async Iteration

```js
async function runSteps(
  steps
) {
  // Step 1:
  let previousResult =
    null;

  // Step 2:
  for (
    const step
    of
    steps
  ) {
    // Step 3:
    previousResult =
      await step(
        previousResult
      );
  }

  // Step 4:
  return previousResult;
}
```

Each step receives previous result.

---

# 11. Sequential Performance Cost 🔥🔥🔥

Suppose each task takes:

```text
1 second
```

Three sequential tasks:

```text
Task 1
→ 1s

Task 2
→ 1s

Task 3
→ 1s

Total ≈ 3s
```

---

# 12. Independent Work Should Often Be Concurrent 🔥🔥🔥

If tasks do not depend on each other:

```text
Employee 1 API
Employee 2 API
Employee 3 API
```

we can start them together.

---

# 13. `map(async ...)` 🔥🔥🔥

```js
// Step 1:
const values = [
  1,
  2,
  3,
];

// Step 2:
const result =
  values.map(
    async (
      value
    ) => {
      return (
        value * 2
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

Important:

```text
map(async ...)
→ array of Promises
```

---

# 14. Why `map(async)` Returns Promises

Because every `async` function returns a Promise.

So:

```text
async callback
↓
Promise
```

Therefore:

```text
array.map(async callback)
↓
Promise[]
```

---

# 15. Wrong Expectation 🔥🔥🔥

Wrong:

```text
map(async ...)
→ resolved values
```

Actual:

```text
map(async ...)
→ Promise[]
```

---

# 16. Correct Concurrent Pattern 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  const promises =
    values.map(
      (
        value
      ) => {
        return processValue(
          value
        );
      }
    );

  // Step 3:
  const result =
    await Promise.all(
      promises
    );

  // Step 4:
  console.log(
    result
  );
}

// Step 5:
run();
```

Output:

```text
[2, 4, 6]
```

---

# 17. Shorter Concurrent Pattern

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  const result =
    await Promise.all(
      values.map(
        processValue
      )
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

# 18. Concurrent Mental Flow 🔥🔥🔥

```text
processValue(1) starts
processValue(2) starts
processValue(3) starts
↓
all in progress
↓
Promise.all waits
↓
all complete
↓
[2, 4, 6]
```

---

# 19. Sequential vs Concurrent Time 🔥🔥🔥

Suppose each takes 1 second.

Sequential:

```text
1s + 1s + 1s
≈ 3s
```

Concurrent:

```text
all start together
↓
slowest ≈ 1s
```

Ignoring overhead.

---

# 20. Do Not Say "Parallel" Carelessly

For API/network operations:

```text
concurrent
```

is often more accurate than saying:

```text
JavaScript executes all code in parallel
```

JavaScript still uses its event-loop model.

---

# 21. `forEach(async ...)` Trap 🔥🔥🔥

This is one of the most common async interview traps.

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  values.forEach(
    async (
      value
    ) => {
      // Step 3:
      await Promise.resolve();

      // Step 4:
      console.log(
        value
      );
    }
  );

  // Step 5:
  console.log(
    "Done"
  );
}

// Step 6:
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

# 22. Why `forEach(async)` Does Not Wait 🔥🔥🔥

`forEach()` itself is synchronous.

It calls each callback and ignores the returned Promise.

Mental flow:

```text
forEach callback 1 called
→ returns Promise

forEach callback 2 called
→ returns Promise

forEach callback 3 called
→ returns Promise

forEach finishes
↓
Done
↓
async callbacks continue later
```

---

# 23. Very Important Rule

```text
await inside callback
does not make forEach await that callback
```

The outer `forEach()` still does not wait.

---

# 24. Wrong Code — Assuming `forEach` Waits 🔥🔥🔥

```js
async function saveAll(
  employees
) {
  // Step 1:
  employees.forEach(
    async (
      employee
    ) => {
      // Step 2:
      await saveEmployee(
        employee
      );
    }
  );

  // Step 3:
  console.log(
    "All saved"
  );
}
```

Problem:

```text
"All saved"
may print
before saves finish
```

---

# 25. Correct Sequential Save

```js
async function saveAll(
  employees
) {
  // Step 1:
  for (
    const employee
    of
    employees
  ) {
    // Step 2:
    await saveEmployee(
      employee
    );
  }

  // Step 3:
  console.log(
    "All saved"
  );
}
```

Now:

```text
All saved
```

prints only after all sequential saves finish.

---

# 26. Correct Concurrent Save 🔥🔥🔥

```js
async function saveAll(
  employees
) {
  // Step 1:
  const tasks =
    employees.map(
      (
        employee
      ) => {
        return saveEmployee(
          employee
        );
      }
    );

  // Step 2:
  await Promise.all(
    tasks
  );

  // Step 3:
  console.log(
    "All saved"
  );
}
```

---

# 27. Which One Should You Choose?

Sequential:

```text
for...of + await
```

Concurrent:

```text
map()
+
Promise.all()
```

---

# 28. Error Behavior With Sequential Loop 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  try {
    // Step 2:
    for (
      const value
      of
      values
    ) {
      if (
        value
        ===
        2
      ) {
        throw new Error(
          "Failed at 2"
        );
      }

      console.log(
        value
      );
    }
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
1
Failed at 2
```

Loop stops after error.

---

# 29. Sequential Continue After Error

If each item should continue independently:

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  for (
    const value
    of
    values
  ) {
    try {
      // Step 3:
      if (
        value
        ===
        2
      ) {
        throw new Error(
          "Failed"
        );
      }

      console.log(
        value
      );
    } catch (
      error
    ) {
      // Step 4:
      console.log(
        `Error ${value}`
      );
    }
  }
}

// Step 5:
run();
```

Output:

```text
1
Error 2
3
```

---

# 30. Concurrent Error With `Promise.all()` 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    const result =
      await Promise.all(
        [
          Promise.resolve(
            1
          ),
          Promise.reject(
            new Error(
              "Failed"
            )
          ),
          Promise.resolve(
            3
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

---

# 31. Concurrent Partial Success

Use:

```text
Promise.allSettled()
```

when all tasks should finish and you want every outcome.

---

# 32. `allSettled()` With Iteration 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  const tasks =
    values.map(
      (
        value
      ) => {
        if (
          value
          ===
          2
        ) {
          return Promise.reject(
            new Error(
              "Failed"
            )
          );
        }

        return Promise.resolve(
          value * 2
        );
      }
    );

  // Step 3:
  const results =
    await Promise.allSettled(
      tasks
    );

  // Step 4:
  console.log(
    results[0].status
  );

  // Step 5:
  console.log(
    results[1].status
  );

  // Step 6:
  console.log(
    results[2].status
  );
}

// Step 7:
run();
```

Output:

```text
fulfilled
rejected
fulfilled
```

---

# 33. Order of Results With `Promise.all()` 🔥🔥🔥

Even if completion order is:

```text
2
3
1
```

result array follows:

```text
input order
```

---

# 34. Completion Order Example

```js
function delay(
  value,
  ms
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
            `Finished ${value}`
          );

          resolve(
            value
          );
        },
        ms
      );
    }
  );
}

async function run() {
  // Step 3:
  const result =
    await Promise.all(
      [
        delay(
          "A",
          300
        ),
        delay(
          "B",
          100
        ),
        delay(
          "C",
          200
        ),
      ]
    );

  // Step 4:
  console.log(
    result
  );
}

// Step 5:
run();
```

Output:

```text
Finished B
Finished C
Finished A
["A", "B", "C"]
```

---

# 35. This Distinction Is Important 🔥🔥🔥

```text
completion order
≠
result order
```

`Promise.all()` preserves input order.

---

# 36. Sequential Result Order

With:

```text
for...of + await
```

completion order naturally follows iteration order because only one task is active at a time.

---

# 37. Real API — Fetch Employees One by One 🔥🔥🔥

```js
async function getEmployeesByIds(
  ids
) {
  // Step 1:
  const employees =
    [];

  // Step 2:
  for (
    const id
    of
    ids
  ) {
    // Step 3:
    const employee =
      await getEmployeeById(
        id
      );

    // Step 4:
    employees.push(
      employee
    );
  }

  // Step 5:
  return employees;
}
```

This is sequential.

---

# 38. Same API Concurrently 🔥🔥🔥

```js
async function getEmployeesByIds(
  ids
) {
  // Step 1:
  const tasks =
    ids.map(
      (
        id
      ) => {
        return getEmployeeById(
          id
        );
      }
    );

  // Step 2:
  return await Promise.all(
    tasks
  );
}
```

Better when requests are independent and concurrency is acceptable.

---

# 39. Real Bulk Delete Sequential

```js
async function deleteEmployeesSequentially(
  ids
) {
  // Step 1:
  for (
    const id
    of
    ids
  ) {
    // Step 2:
    await deleteEmployee(
      id
    );
  }

  // Step 3:
  return true;
}
```

---

# 40. Real Bulk Delete Concurrent 🔥🔥🔥

```js
async function deleteEmployeesConcurrently(
  ids
) {
  // Step 1:
  const tasks =
    ids.map(
      (
        id
      ) => {
        return deleteEmployee(
          id
        );
      }
    );

  // Step 2:
  await Promise.all(
    tasks
  );

  // Step 3:
  return true;
}
```

---

# 41. Bulk Delete With Partial Failure 🔥🔥🔥

```js
async function deleteEmployees(
  ids
) {
  // Step 1:
  const tasks =
    ids.map(
      deleteEmployee
    );

  // Step 2:
  return await Promise.allSettled(
    tasks
  );
}
```

---

# 42. Real Bulk Update

```js
async function updateEmployees(
  employees
) {
  // Step 1:
  const tasks =
    employees.map(
      (
        employee
      ) => {
        return updateEmployee(
          employee.id,
          employee
        );
      }
    );

  // Step 2:
  return await Promise.allSettled(
    tasks
  );
}
```

---

# 43. Why Not Always Concurrent? 🔥🔥🔥

Because unlimited concurrency can cause:

```text
API rate limits
server overload
browser resource pressure
too many database writes
too many network connections
memory usage
```

---

# 44. Example Bad Unlimited Concurrency

```js
async function run(
  ids
) {
  // Step 1:
  const tasks =
    ids.map(
      (
        id
      ) => {
        return fetchEmployee(
          id
        );
      }
    );

  // Step 2:
  return await Promise.all(
    tasks
  );
}
```

If:

```text
ids.length = 100000
```

this can be a serious problem.

---

# 45. Controlled Concurrency 🔥🔥🔥

Instead of:

```text
1000 requests at once
```

use:

```text
10 requests
↓
wait
↓
next 10
```

This is batching.

---

# 46. Chunk Array Helper

```js
function chunk(
  items,
  size
) {
  // Step 1:
  const result =
    [];

  // Step 2:
  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    // Step 3:
    result.push(
      items.slice(
        index,
        index + size
      )
    );
  }

  // Step 4:
  return result;
}
```

---

# 47. Chunk Example 🔥🔥🔥

```js
// Step 1:
const result =
  chunk(
    [
      1,
      2,
      3,
      4,
      5,
    ],
    2
  );

// Step 2:
console.log(
  result
);
```

Output:

```text
[
  [1, 2],
  [3, 4],
  [5]
]
```

---

# 48. Batch Processing 🔥🔥🔥

```js
async function processInBatches(
  items,
  batchSize
) {
  // Step 1:
  const batches =
    chunk(
      items,
      batchSize
    );

  // Step 2:
  const finalResults =
    [];

  // Step 3:
  for (
    const batch
    of
    batches
  ) {
    // Step 4:
    const batchResults =
      await Promise.all(
        batch.map(
          processValue
        )
      );

    // Step 5:
    finalResults.push(
      ...batchResults
    );
  }

  // Step 6:
  return finalResults;
}
```

---

# 49. Batch Mental Model

```text
Batch 1
items 1,2,3
→ run together
→ wait

Batch 2
items 4,5,6
→ run together
→ wait

Batch 3
...
```

This gives controlled concurrency.

---

# 50. Batch Example 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const result =
    await processInBatches(
      [
        1,
        2,
        3,
        4,
        5,
      ],
      2
    );

  // Step 2:
  console.log(
    result
  );
}

// Step 3:
run();
```

Output:

```text
[2, 4, 6, 8, 10]
```

---

# 51. Why Batching Is Useful

```text
better server protection

avoids rate-limit spikes

controls memory

more predictable load
```

---

# 52. Batch Failure With `Promise.all()`

If one item in a batch fails:

```text
current batch rejects
```

Then processing stops unless caught.

---

# 53. Batch Partial Failure 🔥🔥🔥

Use:

```text
Promise.allSettled()
```

inside each batch.

```js
async function processBatchesSafely(
  items,
  batchSize
) {
  // Step 1:
  const batches =
    chunk(
      items,
      batchSize
    );

  // Step 2:
  const allResults =
    [];

  // Step 3:
  for (
    const batch
    of
    batches
  ) {
    // Step 4:
    const results =
      await Promise.allSettled(
        batch.map(
          processValue
        )
      );

    // Step 5:
    allResults.push(
      ...results
    );
  }

  // Step 6:
  return allResults;
}
```

---

# 54. Sequential Delay Between Requests 🔥🔥🔥

Sometimes rate limits require pacing.

```js
function sleep(
  ms
) {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      setTimeout(
        resolve,
        ms
      );
    }
  );
}
```

---

# 55. Pacing Example

```js
async function processSlowly(
  ids
) {
  // Step 1:
  for (
    const id
    of
    ids
  ) {
    // Step 2:
    await processOrder(
      id
    );

    // Step 3:
    await sleep(
      500
    );
  }
}
```

Mental flow:

```text
request
↓
500ms pause
↓
next request
```

---

# 56. `for...of` vs `for...in` 🔥🔥

For arrays:

```text
for...of
→ values

for...in
→ keys/indexes
```

For async array processing, `for...of` is usually the clearer choice.

---

# 57. Async `for...of` Example

```js
async function run() {
  // Step 1:
  const values = [
    10,
    20,
    30,
  ];

  // Step 2:
  for (
    const value
    of
    values
  ) {
    // Step 3:
    const result =
      await Promise.resolve(
        value
      );

    // Step 4:
    console.log(
      result
    );
  }
}

// Step 5:
run();
```

Output:

```text
10
20
30
```

---

# 58. Async Classic `for` Loop

You can also use:

```js
async function run() {
  // Step 1:
  const values = [
    10,
    20,
    30,
  ];

  // Step 2:
  for (
    let index = 0;
    index < values.length;
    index++
  ) {
    // Step 3:
    const result =
      await Promise.resolve(
        values[index]
      );

    // Step 4:
    console.log(
      result
    );
  }
}

// Step 5:
run();
```

Output:

```text
10
20
30
```

---

# 59. Why `for...of` Is Often Cleaner

It avoids:

```text
manual index
array[index]
index increment
```

Use classic `for` when index is actually needed.

---

# 60. Async Reduce Awareness 🔥🔥

You can create sequential Promise chains with `reduce()`.

But it is often harder to read.

Example:

```js
async function runSequentially(
  values
) {
  // Step 1:
  await values.reduce(
    async (
      previousPromise,
      value
    ) => {
      // Step 2:
      await previousPromise;

      // Step 3:
      await processValue(
        value
      );
    },
    Promise.resolve()
  );
}
```

---

# 61. Why Prefer `for...of` Over Async Reduce?

For most teams:

```text
for...of
→ easier to read
→ easier to debug
→ easier to explain
```

Async `reduce()` is valid but less clear for simple sequential workflows.

---

# 62. Async `filter()` Trap 🔥🔥🔥

This is another important trap.

Wrong:

```js
const result =
  values.filter(
    async (
      value
    ) => {
      return (
        value > 2
      );
    }
  );
```

Why wrong?

Because async callback returns:

```text
Promise
```

and Promise objects are truthy.

So `filter()` does not wait for boolean results.

---

# 63. Async Filter Example

```js
// Step 1:
const values = [
  1,
  2,
  3,
];

// Step 2:
const result =
  values.filter(
    async (
      value
    ) => {
      return (
        value > 1
      );
    }
  );

// Step 3:
console.log(
  result
);
```

Output:

```text
[1, 2, 3]
```

Because each callback returns a truthy Promise object.

---

# 64. Correct Async Filter Pattern 🔥🔥🔥

First compute async conditions:

```js
async function asyncFilter(
  values
) {
  // Step 1:
  const checks =
    await Promise.all(
      values.map(
        async (
          value
        ) => {
          return (
            value > 1
          );
        }
      )
    );

  // Step 2:
  return values.filter(
    (
      value,
      index
    ) => {
      return checks[index];
    }
  );
}
```

---

# 65. Async Filter Example Output

```js
async function run() {
  // Step 1:
  const result =
    await asyncFilter(
      [
        1,
        2,
        3,
      ]
    );

  // Step 2:
  console.log(
    result
  );
}

// Step 3:
run();
```

Output:

```text
[2, 3]
```

---

# 66. Async `some()` / `every()` Awareness 🔥🔥

Built-in `some()` and `every()` also do not await async callbacks.

So:

```text
async callback
→ Promise
→ truthy object
```

can produce incorrect logic.

---

# 67. Correct Async `some()` Pattern

```js
async function asyncSome(
  values,
  predicate
) {
  // Step 1:
  const results =
    await Promise.all(
      values.map(
        predicate
      )
    );

  // Step 2:
  return results.some(
    Boolean
  );
}
```

---

# 68. Correct Async `every()` Pattern

```js
async function asyncEvery(
  values,
  predicate
) {
  // Step 1:
  const results =
    await Promise.all(
      values.map(
        predicate
      )
    );

  // Step 2:
  return results.every(
    Boolean
  );
}
```

---

# 69. Important Array Method Rule 🔥🔥🔥

Methods like:

```text
forEach
filter
some
every
```

do not automatically understand async callbacks.

`map()` also does not await, but it is useful because:

```text
map(async ...)
→ Promise[]
```

which works naturally with `Promise.all()`.

---

# 70. Real API — Check Employee Permissions

Suppose each permission check is async.

```js
async function canEditEmployee(
  employee
) {
  // Step 1:
  return Promise.resolve(
    employee.role
    ===
    "ADMIN"
  );
}
```

Do not use async `filter()` directly.

---

# 71. Correct Permission Filter 🔥🔥🔥

```js
async function getEditableEmployees(
  employees
) {
  // Step 1:
  const permissions =
    await Promise.all(
      employees.map(
        canEditEmployee
      )
    );

  // Step 2:
  return employees.filter(
    (
      employee,
      index
    ) => {
      return permissions[index];
    }
  );
}
```

---

# 72. Sequential Error Strategy

Use one outer try/catch when:

```text
any failure should stop everything
```

---

# 73. Per-Item Error Strategy 🔥🔥🔥

Use inner try/catch when:

```text
failure of one item
should not stop others
```

```js
async function processAll(
  items
) {
  // Step 1:
  const results =
    [];

  // Step 2:
  for (
    const item
    of
    items
  ) {
    try {
      // Step 3:
      const value =
        await processValue(
          item
        );

      // Step 4:
      results.push(
        {
          success:
            true,
          value,
        }
      );
    } catch (
      error
    ) {
      // Step 5:
      results.push(
        {
          success:
            false,
          error,
        }
      );
    }
  }

  // Step 6:
  return results;
}
```

---

# 74. Concurrent Per-Item Error Strategy

Use:

```text
Promise.allSettled()
```

for concurrent work where every outcome matters.

---

# 75. Retry One Failed Item — Awareness 🔥🔥🔥

If processing fails:

```text
item 5 failed
```

you may retry only item 5.

Do not necessarily restart the whole batch.

Full retry utility comes later.

---

# 76. Real Upload Example

Sequential upload:

```text
upload file 1
wait
upload file 2
wait
upload file 3
```

Useful when server limits one upload at a time.

Concurrent upload:

```text
upload all 3
wait for all
```

Useful when server allows concurrency.

---

# 77. Upload Batch Example 🔥🔥🔥

```js
async function uploadFiles(
  files
) {
  // Step 1:
  const batches =
    chunk(
      files,
      3
    );

  // Step 2:
  const results =
    [];

  // Step 3:
  for (
    const batch
    of
    batches
  ) {
    // Step 4:
    const batchResult =
      await Promise.all(
        batch.map(
          uploadFile
        )
      );

    // Step 5:
    results.push(
      ...batchResult
    );
  }

  // Step 6:
  return results;
}
```

Only 3 files are uploaded concurrently per batch.

---

# 78. Machine-Coding Use Cases 🔥🔥🔥

Async iteration appears in:

```text
bulk delete
bulk edit
file upload
notifications
pagination prefetch
dashboard data
batch API calls
image processing
background queues
data migration tools
```

---

# 79. Interview Output Question 1 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  values.forEach(
    async (
      value
    ) => {
      await Promise.resolve();

      console.log(
        value
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

Expected output:

```text
Done
1
2
3
```

---

# 80. Interview Output Question 2 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const values = [
    1,
    2,
    3,
  ];

  // Step 2:
  for (
    const value
    of
    values
  ) {
    // Step 3:
    await Promise.resolve();

    // Step 4:
    console.log(
      value
    );
  }

  // Step 5:
  console.log(
    "Done"
  );
}

// Step 6:
run();
```

Expected output:

```text
1
2
3
Done
```

---

# 81. Interview Output Question 3 🔥🔥🔥

```js
async function run() {
  // Step 1:
  const result =
    await Promise.all(
      [
        Promise.resolve(
          1
        ),
        Promise.resolve(
          2
        ),
      ]
    );

  // Step 2:
  console.log(
    result
  );
}

// Step 3:
console.log(
  "Start"
);

// Step 4:
run();

// Step 5:
console.log(
  "End"
);
```

Expected output:

```text
Start
End
[1, 2]
```

---

# 82. Interview Output Question 4 — Async Filter Trap 🔥🔥🔥

```js
// Step 1:
const result =
  [
    1,
    2,
    3,
  ].filter(
    async (
      value
    ) => {
      return (
        value > 1
      );
    }
  );

// Step 2:
console.log(
  result
);
```

Expected output:

```text
[1, 2, 3]
```

Because every returned Promise is truthy.

---

# 83. Interview — Why `forEach(async)` Is Tricky? 🔥🔥🔥

Good answer:

```text
forEach does not await
the Promise returned by its callback.

So the outer flow continues immediately.

Use for...of + await
for sequential work,
or map + Promise.all
for concurrent work.
```

---

# 84. Interview — `for...of` vs `Promise.all()` 🔥🔥🔥

Good answer:

```text
for...of + await
→ sequential

Promise.all + map
→ concurrent

Use sequential when order,
dependency,
or rate limiting matters.

Use concurrent execution
when operations are independent.
```

---

# 85. Interview — Why Batch Requests?

Good answer:

```text
To limit concurrency
and avoid overwhelming
the browser,
network,
API,
or backend.

Batches balance performance
with resource control.
```

---

# 86. Interview — Does `Promise.all()` Preserve Input Order?

Yes.

```text
Even if tasks finish
in a different order,
the result array follows
the original input order.
```

---

# 87. Interview — What Does `map(async)` Return? 🔥🔥🔥

```text
An array of Promises.
```

Then use:

```text
await Promise.all(...)
```

to get final values.

---

# 88. Interview — Async `filter()` Problem

Good answer:

```text
filter expects a synchronous boolean.

An async callback returns a Promise,
and Promise objects are truthy.

So async filter logic must usually
compute async booleans first,
then perform synchronous filter.
```

---

# 89. Debugging Checklist 🔥🔥🔥

```text
Should this be sequential?

Should this be concurrent?

Did I use forEach(async)?

Did I forget Promise.all after map(async)?

Did I accidentally use async filter?

Did I accidentally use async some/every?

Are tasks dependent?

Is order important?

Am I launching too many requests?

Should I batch?

Should one failure stop everything?

Do I need allSettled?

Am I preserving result order?

Do I need per-item retry?
```

---

# 90. Async Iteration Decision Guide 🔥🔥🔥

```text
Need one-by-one?
→ for...of + await

Need independent concurrent work?
→ map + Promise.all

Need all outcomes?
→ map + Promise.allSettled

Need controlled concurrency?
→ batching

Need delay between items?
→ sequential + sleep

Need async filtering?
→ await predicate results first

Need partial failure?
→ per-item try/catch
or allSettled
```

---

# 91. Final Master Practical — Employee Batch Processing 🔥🔥🔥

```js
async function updateEmployee(
  employee
) {
  // Step 1:
  return Promise.resolve(
    {
      ...employee,
      updated:
        true,
    }
  );
}

async function updateEmployeesInBatches(
  employees,
  batchSize
) {
  // Step 2:
  const batches =
    chunk(
      employees,
      batchSize
    );

  // Step 3:
  const finalResults =
    [];

  // Step 4:
  for (
    const batch
    of
    batches
  ) {
    // Step 5:
    const results =
      await Promise.allSettled(
        batch.map(
          updateEmployee
        )
      );

    // Step 6:
    finalResults.push(
      ...results
    );
  }

  // Step 7:
  return finalResults;
}
```

Mental flow:

```text
employees
↓
split into batches
↓
batch 1 runs concurrently
↓
wait
↓
batch 2 runs concurrently
↓
wait
↓
collect all results
```

---

# 92. Final Master Trace 🔥🔥🔥

```js
function task(
  value,
  delay
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
            `Finished ${value}`
          );

          resolve(
            value * 10
          );
        },
        delay
      );
    }
  );
}

async function run() {
  // Step 3:
  console.log(
    "Sequential Start"
  );

  // Step 4:
  for (
    const value
    of
    [
      1,
      2,
    ]
  ) {
    const result =
      await task(
        value,
        20
      );

    console.log(
      result
    );
  }

  // Step 5:
  console.log(
    "Concurrent Start"
  );

  // Step 6:
  const results =
    await Promise.all(
      [
        task(
          3,
          30
        ),
        task(
          4,
          10
        ),
      ]
    );

  // Step 7:
  console.log(
    results
  );

  // Step 8:
  console.log(
    "Done"
  );
}

// Step 9:
run();
```

Expected output:

```text
Sequential Start
Finished 1
10
Finished 2
20
Concurrent Start
Finished 4
Finished 3
[30, 40]
Done
```

Important:

```text
sequential section
→ one task at a time

concurrent section
→ both start together

task 4 finishes first

but Promise.all result stays:
[30, 40]
```

---

# Quick Memory 🧠🔥🔥🔥

## Sequential

```text
for...of + await
```

## Concurrent

```text
map()
+
Promise.all()
```

## Partial Concurrent Results

```text
Promise.allSettled()
```

## `forEach(async)`

```text
does NOT wait
```

## `map(async)`

```text
returns Promise[]
```

## `filter(async)`

```text
wrong for normal filtering
because Promise is truthy
```

## Async Some / Every

```text
built-in methods do not await callbacks
```

## Result Order

```text
Promise.all preserves input order
```

## Completion Order

```text
may differ from result order
```

## Huge Request Lists

```text
do not run everything at once
```

## Controlled Concurrency

```text
batching
```

## Batch Pattern

```text
for...of batches
+
Promise.all inside each batch
```

## One Failure Stops Everything

```text
Promise.all
or outer try/catch
```

## Keep All Outcomes

```text
Promise.allSettled
```

## Best Interview Answer

```text
For async iteration,
I first decide whether the work
must be sequential or can be concurrent.

For sequential work,
I use for...of with await.

For independent concurrent work,
I map items to Promises
and await Promise.all.

I avoid forEach(async)
because forEach does not wait
for returned Promises.

For very large collections,
I use batching or a concurrency limit
instead of launching every request at once.

If partial failures are acceptable,
I use Promise.allSettled
or per-item error handling.
```

---

# ✅ 8.9 Async Iteration Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
8.2 Timers ✅
8.3 Callbacks ✅
8.4 Promises ✅
8.5 Async / Await ✅
8.6 Fetch + HTTP ✅
8.7 Real API Practical ✅
8.8 Promise Combinators ✅
8.9 Async Iteration ✅
```

Next topic:

```text
8.10 Async Error Handling 🔥🔥🔥
├── Promise Errors
├── catch()
├── try / catch
├── Rejected Promises
├── Error Propagation
├── finally
├── Unhandled Rejection
└── Real Error Strategies
```

**Next: 8.10 Async Error Handling 🔥🔥🔥**
