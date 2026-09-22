# 8.8 Promise Combinators 🔥🔥🔥

Promise combinators let us work with **multiple Promises together**.

The four important combinators are:

```text
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
```

Master mental model:

```text
Promise.all()
→ need ALL to succeed

Promise.allSettled()
→ need result of EVERY Promise
  whether success or failure

Promise.race()
→ first settled Promise wins

Promise.any()
→ first fulfilled Promise wins
```

This topic is extremely important for:

```text
Parallel API calls
Dashboard loading
Multiple independent requests
Fallback servers
Timeout patterns
Partial failure handling
Interview output questions
Machine-coding rounds
```

---

# 1. Why Promise Combinators? 🔥🔥🔥

Suppose we need:

```text
Employees
Departments
Permissions
```

If all three are independent, this is unnecessarily sequential:

```js
async function loadDashboard() {
  // Step 1:
  const employees =
    await getEmployees();

  // Step 2:
  const departments =
    await getDepartments();

  // Step 3:
  const permissions =
    await getPermissions();

  // Step 4:
  return {
    employees,
    departments,
    permissions,
  };
}
```

Mental flow:

```text
Employees complete
↓
Departments start
↓
Departments complete
↓
Permissions start
```

Instead, independent work can start together.

---

# 2. The Four Combinators 🔥🔥🔥

```text
Promise.all()
→ all must fulfill

Promise.allSettled()
→ wait for all outcomes

Promise.race()
→ first settlement wins

Promise.any()
→ first fulfillment wins
```

Memory trick:

```text
ALL
→ everyone must win

ALL SETTLED
→ collect everyone's result

RACE
→ first finish wins

ANY
→ first success wins
```

---

# 3. `Promise.all()` 🔥🔥🔥

Syntax:

```js
// Step 1:
const result =
  Promise.all(
    [
      promise1,
      promise2,
      promise3,
    ]
  );
```

It returns:

```text
a new Promise
```

---

# 4. Basic `Promise.all()` Example

```js
async function run() {
  // Step 1:
  const result =
    await Promise.all(
      [
        Promise.resolve(
          10
        ),
        Promise.resolve(
          20
        ),
        Promise.resolve(
          30
        ),
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
[10, 20, 30]
```

---

# 5. `Promise.all()` Waits for All 🔥🔥🔥

```text
P1 fulfilled
P2 fulfilled
P3 fulfilled
↓
Promise.all fulfills
```

Result:

```text
[value1, value2, value3]
```

---

# 6. Result Order Is Input Order 🔥🔥🔥

This is important.

Completion order does **not** control result order.

Example:

```js
function delayValue(
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
          resolve(
            value
          );
        },
        delay
      );
    }
  );
}

async function run() {
  // Step 3:
  const result =
    await Promise.all(
      [
        delayValue(
          "A",
          300
        ),
        delayValue(
          "B",
          100
        ),
        delayValue(
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

Completion order:

```text
B
C
A
```

Result order:

```text
["A", "B", "C"]
```

Because output order follows input order.

---

# 7. `Promise.all()` Rejects Fast 🔥🔥🔥

If one input Promise rejects:

```text
Promise.all()
→ rejects
```

Example:

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
          Promise.resolve(
            30
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

# 8. Fail-Fast Mental Model

```text
P1 success
P2 failure
P3 still running
↓
Promise.all rejects
```

Important:

```text
Promise.all rejecting
does NOT automatically cancel
other already-started operations
```

---

# 9. `Promise.all()` Does Not Cancel Others 🔥🔥🔥

This is a common interview trap.

```text
Promise A rejects
↓
Promise.all rejects

Promise B/C
→ may still continue running
```

If cancellation is required:

```text
AbortController
or
custom cancellation logic
```

must be used.

---

# 10. Real Dashboard With `Promise.all()` 🔥🔥🔥

```js
async function loadDashboard() {
  // Step 1:
  const [
    employees,
    departments,
    permissions,
  ] =
    await Promise.all(
      [
        getEmployees(),
        getDepartments(),
        getPermissions(),
      ]
    );

  // Step 2:
  return {
    employees,
    departments,
    permissions,
  };
}
```

Best when:

```text
all results are required
```

---

# 11. Why `Promise.all()` Improves Performance

Sequential:

```text
A → 2 sec
then B → 2 sec
then C → 2 sec

total ≈ 6 sec
```

Concurrent:

```text
A → 2 sec
B → 2 sec
C → 2 sec
all start together

total ≈ slowest one
≈ 2 sec
```

Ignoring scheduling/network overhead.

---

# 12. Important: `Promise.all()` Does Not Start Promises 🔥🔥🔥

This is subtle.

These function calls start the work:

```js
// Step 1:
const a =
  getEmployees();

// Step 2:
const b =
  getDepartments();
```

`Promise.all()` coordinates already-created Promises.

This:

```js
// Step 1:
await Promise.all(
  [
    getEmployees(),
    getDepartments(),
  ]
);
```

starts both because both functions are called while creating the array.

---

# 13. `Promise.all()` With Normal Values

Normal values are accepted too.

```js
async function run() {
  // Step 1:
  const result =
    await Promise.all(
      [
        10,
        Promise.resolve(
          20
        ),
        30,
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
[10, 20, 30]
```

Non-Promise values are treated like fulfilled values.

---

# 14. Empty `Promise.all()` 🔥🔥

```js
async function run() {
  // Step 1:
  const result =
    await Promise.all(
      []
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
[]
```

---

# 15. Common `map(async)` + `Promise.all()` 🔥🔥🔥

```js
async function processEmployees(
  employees
) {
  // Step 1:
  const promises =
    employees.map(
      async (
        employee
      ) => {
        return {
          ...employee,
          processed:
            true,
        };
      }
    );

  // Step 2:
  const result =
    await Promise.all(
      promises
    );

  // Step 3:
  return result;
}
```

---

# 16. Why `Promise.all()` With `map(async)`?

Because:

```text
map(async ...)
→ Promise[]
```

Then:

```text
Promise.all(Promise[])
→ final resolved values[]
```

---

# 17. Common Mistake Without `Promise.all()`

```js
// Step 1:
const result =
  [
    1,
    2,
    3,
  ].map(
    async (
      value
    ) => {
      return (
        value * 2
      );
    }
  );

// Step 2:
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

---

# 18. Correct Mapped Result

```js
async function run() {
  // Step 1:
  const result =
    await Promise.all(
      [
        1,
        2,
        3,
      ].map(
        async (
          value
        ) => {
          return (
            value * 2
          );
        }
      )
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
[2, 4, 6]
```

---

# 19. When Not to Use `Promise.all()` 🔥🔥🔥

Do not use it when:

```text
B depends on A
```

Example:

```text
getUser()
↓
need user.id
↓
getOrders(user.id)
```

These should remain sequential.

---

# 20. Dependent Example

```js
async function run() {
  // Step 1:
  const user =
    await getUser();

  // Step 2:
  const orders =
    await getOrders(
      user.id
    );

  // Step 3:
  return orders;
}
```

Correct because B depends on A.

---

# 21. `Promise.allSettled()` 🔥🔥🔥

`Promise.allSettled()` waits for **every Promise to settle**.

It does not fail fast.

Syntax:

```js
// Step 1:
const result =
  Promise.allSettled(
    [
      promise1,
      promise2,
      promise3,
    ]
  );
```

---

# 22. Basic `allSettled()` Example

```js
async function run() {
  // Step 1:
  const result =
    await Promise.allSettled(
      [
        Promise.resolve(
          10
        ),
        Promise.reject(
          "Failed"
        ),
        Promise.resolve(
          30
        ),
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

Conceptual output:

```text
[
  {
    status: "fulfilled",
    value: 10
  },
  {
    status: "rejected",
    reason: "Failed"
  },
  {
    status: "fulfilled",
    value: 30
  }
]
```

---

# 23. `allSettled()` Result Shape 🔥🔥🔥

Fulfilled result:

```text
{
  status: "fulfilled",
  value: ...
}
```

Rejected result:

```text
{
  status: "rejected",
  reason: ...
}
```

---

# 24. `allSettled()` Does Not Fail Fast

If one input rejects:

```text
it records rejection
and continues waiting
```

Mental model:

```text
P1 success
P2 failure
P3 success
↓
wait for all
↓
return all three outcomes
```

---

# 25. When to Use `allSettled()` 🔥🔥🔥

Use when:

```text
partial success is acceptable
```

Example:

```text
weather
notifications
recommendations
analytics
```

One failure should not destroy the whole page.

---

# 26. Dashboard Partial Failure Example

```js
async function loadWidgets() {
  // Step 1:
  const results =
    await Promise.allSettled(
      [
        loadEmployees(),
        loadNotifications(),
        loadReports(),
      ]
    );

  // Step 2:
  return results;
}
```

---

# 27. Extract Fulfilled Results 🔥🔥🔥

```js
function getSuccessfulValues(
  results
) {
  // Step 1:
  return results
    .filter(
      (
        result
      ) => {
        return (
          result.status
          ===
          "fulfilled"
        );
      }
    )
    .map(
      (
        result
      ) => {
        return result.value;
      }
    );
}
```

---

# 28. Extract Failed Results

```js
function getFailures(
  results
) {
  // Step 1:
  return results.filter(
    (
      result
    ) => {
      return (
        result.status
        ===
        "rejected"
      );
    }
  );
}
```

---

# 29. `all()` vs `allSettled()` 🔥🔥🔥

```text
Promise.all()
→ all success required
→ one rejection rejects whole result

Promise.allSettled()
→ wait for every outcome
→ gives success + failure objects
```

---

# 30. Real Bulk Update With `allSettled()` 🔥🔥🔥

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

This lets us report:

```text
4 updated
1 failed
```

---

# 31. Count Bulk Success/Failure

```js
function summarizeResults(
  results
) {
  // Step 1:
  const successCount =
    results.filter(
      (
        result
      ) => {
        return (
          result.status
          ===
          "fulfilled"
        );
      }
    ).length;

  // Step 2:
  const failureCount =
    results.length
    -
    successCount;

  // Step 3:
  return {
    successCount,
    failureCount,
  };
}
```

---

# 32. `Promise.race()` 🔥🔥🔥

`Promise.race()` settles with the **first Promise that settles**.

Important:

```text
first fulfilled
OR
first rejected
```

wins.

---

# 33. Basic `Promise.race()` Success

```js
function delayValue(
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
          resolve(
            value
          );
        },
        delay
      );
    }
  );
}

async function run() {
  // Step 3:
  const result =
    await Promise.race(
      [
        delayValue(
          "Slow",
          300
        ),
        delayValue(
          "Fast",
          100
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
Fast
```

---

# 34. Race Can Reject 🔥🔥🔥

```js
function rejectLater(
  message,
  delay
) {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      setTimeout(
        () => {
          reject(
            new Error(
              message
            )
          );
        },
        delay
      );
    }
  );
}

async function run() {
  try {
    // Step 3:
    const result =
      await Promise.race(
        [
          rejectLater(
            "Failed First",
            100
          ),
          delayValue(
            "Success Later",
            300
          ),
        ]
      );

    // Step 4:
    console.log(
      result
    );
  } catch (
    error
  ) {
    // Step 5:
    console.log(
      error.message
    );
  }
}

// Step 6:
run();
```

Output:

```text
Failed First
```

---

# 35. Race Mental Model

```text
P1
P2
P3
↓
whichever settles first
↓
Promise.race adopts that outcome
```

Settled means:

```text
fulfilled
OR
rejected
```

---

# 36. Common Race Use Case — Timeout 🔥🔥🔥

```js
function timeout(
  milliseconds
) {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      setTimeout(
        () => {
          reject(
            new Error(
              "Timeout"
            )
          );
        },
        milliseconds
      );
    }
  );
}
```

Then:

```js
async function loadWithTimeout() {
  // Step 1:
  return await Promise.race(
    [
      fetch(
        "/api/employees"
      ),
      timeout(
        5000
      ),
    ]
  );
}
```

---

# 37. Important Timeout Warning 🔥🔥🔥

Using `Promise.race()` timeout:

```text
does NOT cancel fetch automatically
```

The fetch may continue.

For actual request cancellation:

```text
AbortController
```

is better.

---

# 38. Race With Normal Values

```js
async function run() {
  // Step 1:
  const result =
    await Promise.race(
      [
        10,
        Promise.resolve(
          20
        ),
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
10
```

---

# 39. Empty `Promise.race()` 🔥🔥

```js
// Step 1:
const promise =
  Promise.race(
    []
  );

// Step 2:
console.log(
  promise instanceof Promise
); // Output: true
```

Output:

```text
true
```

Important:

```text
Promise.race([])
→ remains pending forever
```

---

# 40. `Promise.any()` 🔥🔥🔥

`Promise.any()` fulfills with the:

```text
first fulfilled Promise
```

Rejected Promises are ignored unless:

```text
all Promises reject
```

---

# 41. Basic `Promise.any()` Example

```js
async function run() {
  // Step 1:
  const result =
    await Promise.any(
      [
        Promise.reject(
          "Server A failed"
        ),
        Promise.resolve(
          "Server B success"
        ),
        Promise.resolve(
          "Server C success"
        ),
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
Server B success
```

---

# 42. `Promise.any()` Ignores Early Rejection 🔥🔥🔥

```text
P1 rejects first
↓
ignore

P2 fulfills
↓
Promise.any fulfills
```

This differs from `Promise.race()`.

---

# 43. `race()` vs `any()` 🔥🔥🔥

```text
Promise.race()
→ first settlement wins
→ success OR failure

Promise.any()
→ first fulfillment wins
→ failures ignored until all fail
```

---

# 44. `Promise.any()` All Reject 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    await Promise.any(
      [
        Promise.reject(
          "A failed"
        ),
        Promise.reject(
          "B failed"
        ),
      ]
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.name
    );
  }
}

// Step 3:
run();
```

Output:

```text
AggregateError
```

---

# 45. `AggregateError` 🔥🔥🔥

When all inputs reject:

```text
Promise.any()
→ rejects with AggregateError
```

The error can contain individual rejection reasons.

---

# 46. Reading `AggregateError.errors`

```js
async function run() {
  try {
    // Step 1:
    await Promise.any(
      [
        Promise.reject(
          "A failed"
        ),
        Promise.reject(
          "B failed"
        ),
      ]
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.errors
    );
  }
}

// Step 3:
run();
```

Conceptual output:

```text
["A failed", "B failed"]
```

---

# 47. Real `Promise.any()` Use Case 🔥🔥🔥

Suppose same data is available from:

```text
Server A
Server B
Server C
```

We need first successful result.

```js
async function getFromAnyServer() {
  // Step 1:
  return await Promise.any(
    [
      fetchFromServerA(),
      fetchFromServerB(),
      fetchFromServerC(),
    ]
  );
}
```

---

# 48. Fallback CDN Example

```text
CDN A fails
↓
ignore

CDN B succeeds
↓
use B

CDN C may still continue
```

Again:

```text
Promise.any()
does not automatically cancel
remaining work
```

---

# 49. Empty `Promise.any()` 🔥🔥

```js
async function run() {
  try {
    // Step 1:
    await Promise.any(
      []
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.name
    );
  }
}

// Step 3:
run();
```

Output:

```text
AggregateError
```

---

# 50. All Four — Master Comparison 🔥🔥🔥

```text
Promise.all()
→ wait all
→ reject if any rejects
→ use when every result is required

Promise.allSettled()
→ wait all
→ collect every outcome
→ use when partial results matter

Promise.race()
→ first settled wins
→ fulfillment or rejection
→ use for race/timeout-style logic

Promise.any()
→ first fulfilled wins
→ rejects only if all reject
→ use for first-success/fallback logic
```

# 51. Quick Comparison Table

| Method | Fulfills When | Rejects When |
|---|---|---|
| `Promise.all()` | all inputs fulfill | first input rejection |
| `Promise.allSettled()` | all inputs settle | input rejections are returned as results |
| `Promise.race()` | first settlement is fulfillment | first settlement is rejection |
| `Promise.any()` | first fulfillment | all inputs reject |

---

# 52. Real Dashboard Decision 🔥🔥🔥

Need all three:

```text
employees
departments
permissions
```

Use:

```text
Promise.all()
```

---

# 53. Real Widgets Decision

Widgets are independent and partial failure is okay:

```text
weather
news
notifications
recommendations
```

Use:

```text
Promise.allSettled()
```

---

# 54. Real Timeout Decision

Need whichever settles first:

```text
API response
or
timeout rejection
```

Use:

```text
Promise.race()
```

But use `AbortController` when actual cancellation is required.

---

# 55. Real Mirror Decision

Need:

```text
first successful CDN/API
```

Use:

```text
Promise.any()
```

---

# 56. `Promise.all()` Output Question 1 🔥🔥🔥

```js
// Step 1:
Promise.all(
  [
    Promise.resolve(
      1
    ),
    Promise.resolve(
      2
    ),
  ]
)
  .then(
    (
      values
    ) => {
      console.log(
        values
      );
    }
  );
```

Output:

```text
[1, 2]
```

---

# 57. `Promise.all()` Output Question 2

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
Promise.all(
  [
    Promise.resolve(
      1
    ),
    Promise.resolve(
      2
    ),
  ]
)
  .then(
    (
      values
    ) => {
      console.log(
        values
      );
    }
  );

// Step 3:
console.log(
  "B"
);
```

Output:

```text
A
B
[1, 2]
```

Because `.then()` runs as a microtask.

---

# 58. `Promise.all()` Output Question 3 🔥🔥🔥

```js
// Step 1:
Promise.all(
  [
    Promise.resolve(
      "A"
    ),
    Promise.reject(
      "B"
    ),
    Promise.resolve(
      "C"
    ),
  ]
)
  .then(
    (
      values
    ) => {
      console.log(
        values
      );
    }
  )
  .catch(
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
B
```

---

# 59. `allSettled()` Output Question 🔥🔥🔥

```js
// Step 1:
Promise.allSettled(
  [
    Promise.resolve(
      10
    ),
    Promise.reject(
      "Failed"
    ),
  ]
)
  .then(
    (
      results
    ) => {
      // Step 2:
      console.log(
        results[0].status
      );

      // Step 3:
      console.log(
        results[1].status
      );
    }
  );
```

Output:

```text
fulfilled
rejected
```

---

# 60. `race()` Output Question 🔥🔥🔥

```js
// Step 1:
Promise.race(
  [
    Promise.resolve(
      "A"
    ),
    Promise.resolve(
      "B"
    ),
  ]
)
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
A
```

---

# 61. `any()` Output Question 🔥🔥🔥

```js
// Step 1:
Promise.any(
  [
    Promise.reject(
      "A"
    ),
    Promise.resolve(
      "B"
    ),
    Promise.resolve(
      "C"
    ),
  ]
)
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
B
```

---

# 62. Interview Trap — `race()` First Rejection

```js
// Step 1:
Promise.race(
  [
    Promise.reject(
      "Failed"
    ),
    Promise.resolve(
      "Success"
    ),
  ]
)
  .then(
    (
      value
    ) => {
      console.log(
        value
      );
    }
  )
  .catch(
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
Failed
```

---

# 63. Interview Trap — `any()` Same Inputs

```js
// Step 1:
Promise.any(
  [
    Promise.reject(
      "Failed"
    ),
    Promise.resolve(
      "Success"
    ),
  ]
)
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
Success
```

---

# 64. Result Ordering in `allSettled()` 🔥🔥🔥

Like `Promise.all()`:

```text
result order
→ follows input order
```

not completion order.

---

# 65. Example `allSettled()` Order

```js
async function run() {
  // Step 1:
  const result =
    await Promise.allSettled(
      [
        delayValue(
          "Slow",
          300
        ),
        delayValue(
          "Fast",
          100
        ),
      ]
    );

  // Step 2:
  console.log(
    result[0].value
  );

  // Step 3:
  console.log(
    result[1].value
  );
}

// Step 4:
run();
```

Output:

```text
Slow
Fast
```

Even though `Fast` completes first.

---

# 66. Async/Await With `Promise.all()` 🔥🔥🔥

```js
async function loadDashboard() {
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
  return {
    employees,
    departments,
  };
}
```

This is one of the most common real-world async patterns.

---

# 67. Sequential vs `Promise.all()` Interview Example

Sequential:

```js
async function runSequential() {
  // Step 1:
  const a =
    await getA();

  // Step 2:
  const b =
    await getB();

  // Step 3:
  return [
    a,
    b,
  ];
}
```

Concurrent:

```js
async function runConcurrent() {
  // Step 1:
  const [
    a,
    b,
  ] =
    await Promise.all(
      [
        getA(),
        getB(),
      ]
    );

  // Step 2:
  return [
    a,
    b,
  ];
}
```

---

# 68. Important Performance Rule 🔥🔥🔥

Ask:

```text
Does B depend on A?
```

If yes:

```text
sequential
```

If no:

```text
consider concurrent execution
```

---

# 69. Do Not Fire Unlimited Requests Blindly 🔥🔥🔥

This can be dangerous:

```js
async function loadAll(
  ids
) {
  // Step 1:
  return await Promise.all(
    ids.map(
      (
        id
      ) => {
        return fetchEmployee(
          id
        );
      }
    )
  );
}
```

If `ids` contains:

```text
100,000 items
```

you may create excessive concurrency.

Senior-level thinking:

```text
batching
or
concurrency limits
```

---

# 70. Batch Processing Awareness

Example idea:

```text
100 requests
↓
process 5 or 10 at a time
```

We will practice this more in async iteration and advanced utilities.

---

# 71. `Promise.all()` Error Recovery Pattern 🔥🔥🔥

If one optional operation should use a fallback:

```js
async function run() {
  // Step 1:
  const result =
    await Promise.all(
      [
        Promise.resolve(
          "A"
        ),

        Promise.reject(
          new Error(
            "Failed"
          )
        )
          .catch(
            () => {
              return "Fallback";
            }
          ),
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
["A", "Fallback"]
```

---

# 72. Why Does the Previous Example Succeed?

Because:

```text
Promise rejects
↓
catch handles rejection
↓
catch returns "Fallback"
↓
that Promise becomes fulfilled
↓
Promise.all sees success
```

---

# 73. Real API Partial Fallback 🔥🔥🔥

```js
async function loadDashboard() {
  // Step 1:
  const [
    employees,
    notifications,
  ] =
    await Promise.all(
      [
        getEmployees(),

        getNotifications()
          .catch(
            () => {
              return [];
            }
          ),
      ]
    );

  // Step 2:
  return {
    employees,
    notifications,
  };
}
```

Here:

```text
employees
→ required

notifications
→ optional
```

---

# 74. When `allSettled()` Is Better

If you need:

```text
which succeeded?
which failed?
why did each fail?
```

then:

```text
Promise.allSettled()
```

is often cleaner than manually catching every Promise.

---

# 75. Real Bulk Delete With `allSettled()` 🔥🔥🔥

```js
async function deleteEmployees(
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
  const results =
    await Promise.allSettled(
      tasks
    );

  // Step 3:
  return results;
}
```

---

# 76. Bulk Delete Summary

```js
function summarizeBulkDelete(
  results
) {
  // Step 1:
  const deleted =
    results.filter(
      (
        result
      ) => {
        return (
          result.status
          ===
          "fulfilled"
        );
      }
    ).length;

  // Step 2:
  const failed =
    results.length
    -
    deleted;

  // Step 3:
  return {
    deleted,
    failed,
  };
}
```

---

# 77. Real `Promise.any()` API Mirror 🔥🔥🔥

```js
async function loadConfig() {
  // Step 1:
  return await Promise.any(
    [
      fetchConfig(
        "https://a.example.com"
      ),
      fetchConfig(
        "https://b.example.com"
      ),
      fetchConfig(
        "https://c.example.com"
      ),
    ]
  );
}
```

Use when:

```text
first successful source is enough
```

---

# 78. Real `Promise.race()` Resource Race

```js
async function loadFirstSettled() {
  // Step 1:
  return await Promise.race(
    [
      getFromCache(),
      getFromNetwork(),
    ]
  );
}
```

Important:

```text
if cache rejects first
→ race rejects
```

If requirement is:

```text
first successful source
```

then `Promise.any()` may be more appropriate.

---

# 79. Cache + Network: `race()` vs `any()` 🔥🔥🔥

`race()`:

```text
first success OR failure
```

`any()`:

```text
first success
```

Choose based on requirement.

---

# 80. Interview — What Is `Promise.all()`? 🔥🔥🔥

Good answer:

```text
Promise.all accepts an iterable of values/Promises
and returns one Promise.

It fulfills when all inputs fulfill,
with values in the original input order.

It rejects when any input rejects.
```

---

# 81. Interview — Does `Promise.all()` Preserve Order?

Yes.

```text
Result order follows input order,
not completion order.
```

---

# 82. Interview — Does `Promise.all()` Cancel Remaining Requests? 🔥🔥🔥

No.

```text
Promise.all rejecting
does not automatically cancel
other already-started operations.
```

Use separate cancellation logic such as:

```text
AbortController
```

for fetch.

---

# 83. Interview — `all()` vs `allSettled()` 🔥🔥🔥

```text
Promise.all()
→ all-or-nothing success

Promise.allSettled()
→ collect every success/failure outcome
```

---

# 84. Interview — `race()` vs `any()` 🔥🔥🔥

```text
Promise.race()
→ first settled outcome
→ success or failure

Promise.any()
→ first fulfilled result
→ ignores failures until all fail
```

---

# 85. Interview — What If All `Promise.any()` Inputs Reject?

```text
Promise.any()
→ rejects with AggregateError
```

---

# 86. Interview — Best Use Case for `Promise.all()`

```text
Multiple independent operations
where all results are required.
```

Example:

```text
employees
departments
permissions
```

---

# 87. Interview — Best Use Case for `allSettled()`

```text
Multiple independent operations
where partial success is acceptable.
```

Example:

```text
bulk updates
dashboard widgets
batch notifications
```

---

# 88. Interview — Best Use Case for `race()`

```text
Need the first settled outcome.
```

Common example:

```text
operation
vs
timeout
```

---

# 89. Interview — Best Use Case for `any()`

```text
Need the first successful result
from multiple alternatives.
```

Example:

```text
fallback servers
mirrors
CDNs
```

---

# 90. Debugging Checklist 🔥🔥🔥

```text
Are operations independent?

Should all succeed?

Is partial failure okay?

Do I need first settlement?

Do I need first success?

Did I accidentally serialize requests?

Did I forget Promise.all after map(async)?

Did I assume completion order equals result order?

Did I assume Promise.all cancels remaining work?

Did I use race where any was required?

Did I handle AggregateError from Promise.any?

Am I launching too many requests at once?
```

---

# 91. Decision Guide 🔥🔥🔥

```text
Need all values?
→ Promise.all()

Need every outcome?
→ Promise.allSettled()

Need first settled result?
→ Promise.race()

Need first successful result?
→ Promise.any()

Dependent work?
→ sequential await

Independent work?
→ combinator/concurrent execution

Huge number of requests?
→ concurrency limit/batching
```

---

# 92. Final Master Example — Dashboard 🔥🔥🔥

```js
async function loadDashboard() {
  try {
    // Step 1:
    const [
      employees,
      departments,
      permissions,
    ] =
      await Promise.all(
        [
          getEmployees(),
          getDepartments(),
          getPermissions(),
        ]
      );

    // Step 2:
    return {
      employees,
      departments,
      permissions,
    };
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );

    throw error;
  }
}
```

Flow:

```text
start Employees
start Departments
start Permissions
↓
all run concurrently
↓
wait for all

all success
→ return dashboard

one fails
→ Promise.all rejects
```

---

# 93. Final Master Example — Optional Widgets 🔥🔥🔥

```js
async function loadOptionalWidgets() {
  // Step 1:
  const results =
    await Promise.allSettled(
      [
        loadWeather(),
        loadNews(),
        loadNotifications(),
      ]
    );

  // Step 2:
  return results.map(
    (
      result
    ) => {
      if (
        result.status
        ===
        "fulfilled"
      ) {
        return {
          success:
            true,
          data:
            result.value,
        };
      }

      // Step 3:
      return {
        success:
          false,
        error:
          result.reason,
      };
    }
  );
}
```

---

# 94. Final Master Example — First Successful Server 🔥🔥🔥

```js
async function loadFromFastestAvailableServer() {
  try {
    // Step 1:
    const result =
      await Promise.any(
        [
          loadFromServerA(),
          loadFromServerB(),
          loadFromServerC(),
        ]
      );

    // Step 2:
    return result;
  } catch (
    error
  ) {
    // Step 3:
    if (
      error.name
      ===
      "AggregateError"
    ) {
      throw new Error(
        "All servers failed"
      );
    }

    // Step 4:
    throw error;
  }
}
```

---

# 95. Final Master Example — Timeout Race 🔥🔥🔥

```js
function timeout(
  milliseconds
) {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      setTimeout(
        () => {
          reject(
            new Error(
              "Request timed out"
            )
          );
        },
        milliseconds
      );
    }
  );
}

async function loadWithTimeout() {
  try {
    // Step 3:
    const result =
      await Promise.race(
        [
          loadEmployees(),
          timeout(
            3000
          ),
        ]
      );

    // Step 4:
    return result;
  } catch (
    error
  ) {
    // Step 5:
    console.log(
      error.message
    );

    throw error;
  }
}
```

Important:

```text
race timeout
does not cancel loadEmployees()
```

---

# 96. Final Output Trace 🔥🔥🔥

```js
function task(
  name,
  delay,
  shouldReject =
    false
) {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      setTimeout(
        () => {
          console.log(
            name
          );

          // Step 3:
          if (
            shouldReject
          ) {
            reject(
              new Error(
                `${name} failed`
              )
            );

            return;
          }

          // Step 4:
          resolve(
            name
          );
        },
        delay
      );
    }
  );
}

async function run() {
  // Step 5:
  console.log(
    "Start"
  );

  // Step 6:
  const allResult =
    await Promise.all(
      [
        task(
          "A",
          30
        ),
        task(
          "B",
          10
        ),
      ]
    );

  // Step 7:
  console.log(
    allResult
  );

  // Step 8:
  const settled =
    await Promise.allSettled(
      [
        Promise.resolve(
          "C"
        ),
        Promise.reject(
          "D"
        ),
      ]
    );

  // Step 9:
  console.log(
    settled[0].status
  );

  // Step 10:
  console.log(
    settled[1].status
  );

  // Step 11:
  const anyResult =
    await Promise.any(
      [
        Promise.reject(
          "E"
        ),
        Promise.resolve(
          "F"
        ),
      ]
    );

  // Step 12:
  console.log(
    anyResult
  );

  // Step 13:
  console.log(
    "End"
  );
}

// Step 14:
run();
```

Expected output:

```text
Start
B
A
["A", "B"]
fulfilled
rejected
F
End
```

Notice:

```text
B finishes before A

but Promise.all result remains:
["A", "B"]
```

---

# Quick Memory 🧠🔥🔥🔥

## `Promise.all()`

```text
ALL must fulfill
```

Failure:

```text
one rejects
→ whole Promise rejects
```

Order:

```text
input order preserved
```

Best use:

```text
all results required
```

---

## `Promise.allSettled()`

```text
wait for ALL outcomes
```

Result:

```text
fulfilled
or
rejected objects
```

Best use:

```text
partial success allowed
```

---

## `Promise.race()`

```text
first SETTLED wins
```

Can win with:

```text
fulfillment
or
rejection
```

Best use:

```text
race / timeout-style logic
```

---

## `Promise.any()`

```text
first FULFILLED wins
```

Rejects only when:

```text
all inputs reject
```

Error:

```text
AggregateError
```

Best use:

```text
fallback servers
first successful source
```

---

## Most Important Difference

```text
all
→ all success

allSettled
→ every outcome

race
→ first settlement

any
→ first success
```

---

## Performance Rule

```text
Independent requests
→ start together

Dependent requests
→ sequential await
```

---

## Cancellation Rule

```text
Promise combinators
do NOT automatically cancel
other running operations
```

---

## `map(async)` Rule

```text
map(async ...)
→ Promise[]

await Promise.all(...)
→ values[]
```

---

## Best Interview Answer

```text
Promise combinators coordinate multiple Promises.

Promise.all is all-or-nothing:
it fulfills when all succeed
and rejects on the first rejection,
while preserving input order.

Promise.allSettled waits for every Promise
and gives both fulfilled and rejected outcomes.

Promise.race returns the first settled outcome,
whether success or failure.

Promise.any returns the first successful result
and rejects with AggregateError
only if every input rejects.

For independent API calls,
Promise.all is often the best performance pattern,
but combinators do not automatically cancel
the remaining operations.
```

---

# ✅ 8.8 Promise Combinators Complete

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
```

Next topic:

```text
8.9 Async Iteration 🔥🔥🔥
├── for...of + await
├── Promise.all() + map()
├── Sequential vs Parallel
├── Why forEach + async Is Tricky
├── Batch Processing
└── Real API Iteration
```

**Next: 8.9 Async Iteration 🔥🔥🔥**
