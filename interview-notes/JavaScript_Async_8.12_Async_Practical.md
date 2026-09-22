# 8.12 Async Practical 🔥🔥🔥

This is the final practical chapter of Section 8.

Now we combine:

```text
Event Loop
Call Stack
Web APIs
Microtasks
Macrotasks
Timers
Callbacks
Promises
async / await
fetch
Promise Combinators
Async Iteration
Error Handling
Race Conditions
```

The goal is:

```text
predict output

debug broken async code

choose sequential vs concurrent

fix stale requests

build retry

build timeout

explain async flow while coding

handle interview-style problems
```

Master async mental model:

```text
Synchronous Code
↓
Call Stack finishes
↓
Microtasks
├── Promise.then
├── catch
├── finally
└── async/await continuation
↓
Next Macrotask
├── setTimeout
├── setInterval
└── other task-queue callbacks
```

Most important rule:

```text
Sync
↓
Microtasks
↓
Macrotasks
```

This chapter is mostly:

```text
questions
traces
bugs
fixes
machine-coding patterns
```

---

# 1. Output Question — Basic Timer 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "B"
    );
  },
  0
);

// Step 3:
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

Why:

```text
A
→ synchronous

timer registered

C
→ synchronous

stack empty

timer callback
→ task queue
→ runs later
```

---

# 2. Output Question — Promise vs Timer 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "B"
    );
  },
  0
);

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );

// Step 4:
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

Reason:

```text
sync
→ A
→ D

microtask
→ C

macrotask
→ B
```

---

# 3. Output Question — Multiple Promise Microtasks

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
Promise.resolve()
  .then(
    () => {
      console.log(
        "P1"
      );
    }
  );

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "P2"
      );
    }
  );

// Step 4:
console.log(
  "End"
);
```

Output:

```text
Start
End
P1
P2
```

Microtasks run in queued order.

---

# 4. Output Question — Promise Inside Promise 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "A"
      );

      // Step 2:
      Promise.resolve()
        .then(
          () => {
            console.log(
              "B"
            );
          }
        );
    }
  );

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );
```

Output:

```text
A
C
B
```

Why:

```text
initial microtasks:
A-handler
C-handler

A-handler runs
↓
queues B-handler

queue now:
C-handler
B-handler
```

---

# 5. Output Question — Timer Inside Promise

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Promise"
      );

      // Step 2:
      setTimeout(
        () => {
          console.log(
            "Timer"
          );
        },
        0
      );
    }
  );

// Step 3:
console.log(
  "Sync"
);
```

Output:

```text
Sync
Promise
Timer
```

---

# 6. Output Question — Promise Inside Timer 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    console.log(
      "Timer"
    );

    // Step 2:
    Promise.resolve()
      .then(
        () => {
          console.log(
            "Promise"
          );
        }
      );
  },
  0
);

// Step 3:
console.log(
  "Sync"
);
```

Output:

```text
Sync
Timer
Promise
```

Reason:

```text
timer callback runs as task
↓
it queues Promise microtask
↓
current timer callback ends
↓
microtask runs before next task
```

---

# 7. Output Question — Two Timers + Promise

```js
// Step 1:
setTimeout(
  () => {
    console.log(
      "T1"
    );
  },
  0
);

// Step 2:
Promise.resolve()
  .then(
    () => {
      console.log(
        "P"
      );
    }
  );

// Step 3:
setTimeout(
  () => {
    console.log(
      "T2"
    );
  },
  0
);

// Step 4:
console.log(
  "S"
);
```

Output:

```text
S
P
T1
T2
```

---

# 8. Output Question — `async` Before First Await 🔥🔥🔥

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
  "Start"
);

// Step 5:
run();

// Step 6:
console.log(
  "End"
);
```

Output:

```text
Start
A
End
B
```

Important:

```text
async function starts synchronously
until first await
```

---

# 9. Output Question — Await Normal Value

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

Output:

```text
A
C
B
```

Even awaiting a normal value causes async continuation later.

---

# 10. Output Question — `async` Return Value 🔥🔥🔥

```js
async function getValue() {
  // Step 1:
  return 100;
}

// Step 2:
const result =
  getValue();

// Step 3:
console.log(
  result instanceof Promise
); // Output: true
```

Output:

```text
true
```

---

# 11. Output Question — Async Throw

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

Output:

```text
Failed
```

---

# 12. Output Question — Await + Outer Promise 🔥🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "Run Start"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "Run End"
  );
}

// Step 4:
run();

// Step 5:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Outer"
      );
    }
  );
```

Output:

```text
Run Start
Run End
Outer
```

Why:

```text
run() reaches await first
↓
its continuation microtask is queued

then Outer microtask is queued
```

---

# 13. Output Question — Different Queue Order

```js
async function run() {
  // Step 1:
  await Promise.resolve();

  // Step 2:
  console.log(
    "Run"
  );
}

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Outer"
      );
    }
  );

// Step 4:
run();
```

Output:

```text
Outer
Run
```

Because Outer microtask was queued first.

---

# 14. Output Question — Async + Timer 🔥🔥🔥

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
      "T"
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
T
```

---

# 15. Output Question — Promise Chain 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  1
)
  .then(
    (
      value
    ) => {
      console.log(
        value
      );

      // Step 2:
      return (
        value + 1
      );
    }
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
1
2
```

---

# 16. Output Question — Missing Return

```js
// Step 1:
Promise.resolve(
  1
)
  .then(
    (
      value
    ) => {
      console.log(
        value
      );

      // Step 2:
      // No return.
    }
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
1
undefined
```

---

# 17. Output Question — Throw in Chain 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  1
)
  .then(
    (
      value
    ) => {
      throw new Error(
        "Boom"
      );
    }
  )
  .then(
    () => {
      console.log(
        "Never"
      );
    }
  )
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

# 18. Output Question — Catch Recovery

```js
// Step 1:
Promise.reject(
  "A"
)
  .catch(
    (
      error
    ) => {
      // Step 2:
      return "B";
    }
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

# 19. Output Question — Finally 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  10
)
  .finally(
    () => {
      console.log(
        "Cleanup"
      );
    }
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
Cleanup
10
```

---

# 20. Output Question — Finally Throw

```js
// Step 1:
Promise.resolve(
  10
)
  .finally(
    () => {
      throw new Error(
        "Cleanup Failed"
      );
    }
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

# 21. Output Question — Promise.all Order 🔥🔥🔥

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
      setTimeout(
        () => {
          console.log(
            `Done ${value}`
          );

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
  // Step 2:
  const result =
    await Promise.all(
      [
        delayValue(
          "A",
          200
        ),
        delayValue(
          "B",
          100
        ),
      ]
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
Done B
Done A
["A", "B"]
```

---

# 22. Output Question — Promise.all Reject

```js
async function run() {
  try {
    // Step 1:
    await Promise.all(
      [
        Promise.resolve(
          "A"
        ),
        Promise.reject(
          new Error(
            "B Failed"
          )
        ),
        Promise.resolve(
          "C"
        ),
      ]
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
B Failed
```

---

# 23. Output Question — allSettled

```js
async function run() {
  // Step 1:
  const result =
    await Promise.allSettled(
      [
        Promise.resolve(
          1
        ),
        Promise.reject(
          "X"
        ),
      ]
    );

  // Step 2:
  console.log(
    result[0].status
  );

  // Step 3:
  console.log(
    result[1].status
  );
}

// Step 4:
run();
```

Output:

```text
fulfilled
rejected
```

---

# 24. Output Question — race vs any 🔥🔥🔥

```js
async function run() {
  // Step 1:
  try {
    const raceResult =
      await Promise.race(
        [
          Promise.reject(
            "A"
          ),
          Promise.resolve(
            "B"
          ),
        ]
      );

    console.log(
      raceResult
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      `Race: ${error}`
    );
  }

  // Step 3:
  const anyResult =
    await Promise.any(
      [
        Promise.reject(
          "A"
        ),
        Promise.resolve(
          "B"
        ),
      ]
    );

  // Step 4:
  console.log(
    `Any: ${anyResult}`
  );
}

// Step 5:
run();
```

Output:

```text
Race: A
Any: B
```

---

# 25. Output Question — forEach(async) Trap 🔥🔥🔥

```js
async function run() {
  // Step 1:
  [
    1,
    2,
    3,
  ].forEach(
    async (
      value
    ) => {
      // Step 2:
      await Promise.resolve();

      // Step 3:
      console.log(
        value
      );
    }
  );

  // Step 4:
  console.log(
    "Done"
  );
}

// Step 5:
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

# 26. Output Question — for...of + await

```js
async function run() {
  // Step 1:
  for (
    const value
    of
    [
      1,
      2,
      3,
    ]
  ) {
    // Step 2:
    await Promise.resolve();

    // Step 3:
    console.log(
      value
    );
  }

  // Step 4:
  console.log(
    "Done"
  );
}

// Step 5:
run();
```

Output:

```text
1
2
3
Done
```

---

# 27. Output Question — Async Filter Trap 🔥🔥🔥

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

Output:

```text
[1, 2, 3]
```

Reason:

```text
async callback
→ Promise object

Promise object
→ truthy
```

---

# 28. Output Question — Race Condition

```js
let state =
  "";

function update(
  value,
  delay
) {
  // Step 1:
  setTimeout(
    () => {
      state =
        value;

      console.log(
        state
      );
    },
    delay
  );
}

// Step 2:
update(
  "Old",
  200
);

// Step 3:
update(
  "New",
  100
);
```

Output:

```text
New
Old
```

Final state:

```text
Old
```

Wrong for latest-wins semantics.

---

# 29. Output Question — Race Fix

```js
// Step 1:
let latestRequestId =
  0;

let state =
  "";

function update(
  value,
  delay
) {
  // Step 2:
  const requestId =
    ++latestRequestId;

  // Step 3:
  setTimeout(
    () => {
      if (
        requestId
        !==
        latestRequestId
      ) {
        return;
      }

      state =
        value;

      console.log(
        state
      );
    },
    delay
  );
}

// Step 4:
update(
  "Old",
  200
);

// Step 5:
update(
  "New",
  100
);
```

Output:

```text
New
```

---

# 30. Debugging Problem — Missing `await` 🔥🔥🔥

Wrong:

```js
async function loadEmployee() {
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

not employee data.

---

# 31. Fix Missing `await`

```js
async function loadEmployee() {
  // Step 1:
  const employee =
    await getEmployee();

  // Step 2:
  console.log(
    employee.name
  );
}
```

---

# 32. Debugging Problem — Forgetting Return in Promise Chain 🔥🔥🔥

Wrong:

```js
function loadEmployee() {
  // Step 1:
  return fetchEmployee()
    .then(
      (
        employee
      ) => {
        // Step 2:
        normalizeEmployee(
          employee
        );

        // Missing return.
      }
    );
}
```

Caller gets:

```text
undefined
```

---

# 33. Fix Missing Return

```js
function loadEmployee() {
  // Step 1:
  return fetchEmployee()
    .then(
      (
        employee
      ) => {
        // Step 2:
        return normalizeEmployee(
          employee
        );
      }
    );
}
```

---

# 34. Debugging Problem — Async forEach 🔥🔥🔥

Wrong:

```js
async function saveEmployees(
  employees
) {
  // Step 1:
  employees.forEach(
    async (
      employee
    ) => {
      await saveEmployee(
        employee
      );
    }
  );

  // Step 2:
  console.log(
    "Saved"
  );
}
```

`Saved` may print too early.

---

# 35. Fix Sequential

```js
async function saveEmployees(
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
    "Saved"
  );
}
```

---

# 36. Fix Concurrent 🔥🔥🔥

```js
async function saveEmployees(
  employees
) {
  // Step 1:
  await Promise.all(
    employees.map(
      saveEmployee
    )
  );

  // Step 2:
  console.log(
    "Saved"
  );
}
```

---

# 37. Debugging Problem — Accidental Sequential Requests 🔥🔥🔥

Slow:

```js
async function loadDashboard() {
  // Step 1:
  const employees =
    await getEmployees();

  // Step 2:
  const departments =
    await getDepartments();

  // Step 3:
  return {
    employees,
    departments,
  };
}
```

If independent, this is unnecessarily sequential.

---

# 38. Fix Concurrent Requests

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

---

# 39. When Sequential Is Correct 🔥🔥🔥

Do not optimize blindly.

Correct sequential example:

```js
async function loadOrders() {
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

Because second request depends on first.

---

# 40. Debugging Problem — HTTP 404 Not Caught Automatically 🔥🔥🔥

Wrong assumption:

```js
try {
  // Step 1:
  const response =
    await fetch(
      "/api/missing"
    );
} catch (
  error
) {
  // Step 2:
  console.log(
    "404"
  );
}
```

404 usually does not make fetch reject.

---

# 41. Fix HTTP Error Handling

```js
async function load() {
  // Step 1:
  const response =
    await fetch(
      "/api/missing"
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 42. Debugging Problem — try/catch Without Await 🔥🔥🔥

Wrong:

```js
async function failing() {
  // Step 1:
  throw new Error(
    "Failed"
  );
}

function run() {
  try {
    // Step 2:
    failing();
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      "Caught"
    );
  }
}

// Step 4:
run();
```

The synchronous `try/catch` does not catch the later Promise rejection.

---

# 43. Fix With Await

```js
async function run() {
  try {
    // Step 1:
    await failing();
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );
  }
}
```

---

# 44. Fix With `.catch()`

```js
function run() {
  // Step 1:
  failing()
    .catch(
      (
        error
      ) => {
        console.log(
          error.message
        );
      }
    );
}
```

---

# 45. Debugging Problem — Swallowed Error 🔥🔥🔥

```js
async function load() {
  try {
    // Step 1:
    return await getEmployee();
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // No throw.
  }
}
```

Caller now sees:

```text
fulfilled Promise
with undefined
```

---

# 46. Fix Swallowed Error

```js
async function load() {
  try {
    // Step 1:
    return await getEmployee();
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // Step 3:
    throw error;
  }
}
```

---

# 47. Debugging Problem — Promise.all Fails Whole Operation 🔥🔥🔥

```js
async function loadWidgets() {
  // Step 1:
  return await Promise.all(
    [
      loadWeather(),
      loadNews(),
      loadNotifications(),
    ]
  );
}
```

If one optional widget fails:

```text
whole Promise.all rejects
```

Maybe wrong requirement.

---

# 48. Fix With allSettled

```js
async function loadWidgets() {
  // Step 1:
  return await Promise.allSettled(
    [
      loadWeather(),
      loadNews(),
      loadNotifications(),
    ]
  );
}
```

Use when partial success is acceptable.

---

# 49. Debugging Problem — Stale Search Result 🔥🔥🔥

Wrong:

```js
async function search(
  query
) {
  // Step 1:
  const result =
    await searchApi(
      query
    );

  // Step 2:
  state =
    result;
}
```

Older request can overwrite newer state.

---

# 50. Fix With Request ID

```js
// Step 1:
let latestRequestId =
  0;

async function search(
  query
) {
  // Step 2:
  const requestId =
    ++latestRequestId;

  // Step 3:
  const result =
    await searchApi(
      query
    );

  // Step 4:
  if (
    requestId
    !==
    latestRequestId
  ) {
    return;
  }

  // Step 5:
  state =
    result;
}
```

---

# 51. Fix With AbortController 🔥🔥🔥

```js
// Step 1:
let controller;

async function search(
  query
) {
  // Step 2:
  controller?.abort();

  // Step 3:
  controller =
    new AbortController();

  try {
    // Step 4:
    const response =
      await fetch(
        `/api/search?q=${encodeURIComponent(
          query
        )}`,
        {
          signal:
            controller.signal,
        }
      );

    // Step 5:
    return await response.json();
  } catch (
    error
  ) {
    // Step 6:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 7:
    throw error;
  }
}
```

---

# 52. Machine-Coding Problem — Retry Utility 🔥🔥🔥

Requirement:

```text
run an async operation

if it fails
retry limited number of times

if all attempts fail
throw final error
```

---

# 53. Simple Retry Utility

```js
async function retry(
  operation,
  retries = 3
) {
  // Step 1:
  let lastError;

  // Step 2:
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3:
      return await operation();
    } catch (
      error
    ) {
      // Step 4:
      lastError =
        error;
    }
  }

  // Step 5:
  throw lastError;
}
```

---

# 54. Retry Count Meaning 🔥🔥🔥

With:

```text
retries = 3
```

the previous implementation allows:

```text
1 initial attempt
+
3 retries
=
4 total attempts
```

This distinction matters.

---

# 55. Retry Example

```js
// Step 1:
let attempts =
  0;

async function unstableTask() {
  // Step 2:
  attempts++;

  // Step 3:
  if (
    attempts
    <
    3
  ) {
    throw new Error(
      "Failed"
    );
  }

  // Step 4:
  return "Success";
}

async function run() {
  // Step 5:
  const result =
    await retry(
      unstableTask,
      3
    );

  // Step 6:
  console.log(
    result
  );

  // Step 7:
  console.log(
    attempts
  );
}

// Step 8:
run();
```

Output:

```text
Success
3
```

---

# 56. Retry With Delay 🔥🔥🔥

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

async function retryWithDelay(
  operation,
  retries = 3,
  delay = 500
) {
  // Step 2:
  let lastError;

  // Step 3:
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 4:
      return await operation();
    } catch (
      error
    ) {
      // Step 5:
      lastError =
        error;

      // Step 6:
      if (
        attempt
        <
        retries
      ) {
        await sleep(
          delay
        );
      }
    }
  }

  // Step 7:
  throw lastError;
}
```

---

# 57. Retry Decision Rule 🔥🔥🔥

Do not retry everything.

Potentially retry:

```text
network failures
502
503
temporary timeout
```

Usually do not blindly retry:

```text
400
401
403
validation errors
```

---

# 58. Retry POST Caution

Repeated POST may create duplicate resources.

For critical mutations:

```text
idempotency
```

must be considered.

---

# 59. Machine-Coding Problem — Timeout Utility 🔥🔥🔥

Requirement:

```text
reject if async operation
takes too long
```

---

# 60. Promise.race Timeout

```js
function timeout(
  ms
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
        ms
      );
    }
  );
}

async function withTimeout(
  operation,
  ms
) {
  // Step 3:
  return await Promise.race(
    [
      operation(),
      timeout(
        ms
      ),
    ]
  );
}
```

---

# 61. Timeout Does Not Cancel Underlying Work 🔥🔥🔥

Very important:

```text
Promise.race timeout
→ rejects caller

but original operation
may still continue
```

For fetch:

```text
AbortController
```

can actually abort the request flow.

---

# 62. Fetch Timeout With AbortController

```js
async function fetchWithTimeout(
  url,
  ms
) {
  // Step 1:
  const controller =
    new AbortController();

  // Step 2:
  const timeoutId =
    setTimeout(
      () => {
        controller.abort();
      },
      ms
    );

  try {
    // Step 3:
    return await fetch(
      url,
      {
        signal:
          controller.signal,
      }
    );
  } finally {
    // Step 4:
    clearTimeout(
      timeoutId
    );
  }
}
```

---

# 63. Machine-Coding Problem — Sequential Runner 🔥🔥🔥

Requirement:

```text
run async tasks one by one
in order
```

```js
async function runSequentially(
  tasks
) {
  // Step 1:
  const results =
    [];

  // Step 2:
  for (
    const task
    of
    tasks
  ) {
    // Step 3:
    const result =
      await task();

    // Step 4:
    results.push(
      result
    );
  }

  // Step 5:
  return results;
}
```

---

# 64. Sequential Runner Example

```js
async function run() {
  // Step 1:
  const tasks = [
    async () => {
      return "A";
    },
    async () => {
      return "B";
    },
    async () => {
      return "C";
    },
  ];

  // Step 2:
  const result =
    await runSequentially(
      tasks
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
["A", "B", "C"]
```

---

# 65. Machine-Coding Problem — Concurrent Runner 🔥🔥🔥

```js
async function runConcurrently(
  tasks
) {
  // Step 1:
  const promises =
    tasks.map(
      (
        task
      ) => {
        return task();
      }
    );

  // Step 2:
  return await Promise.all(
    promises
  );
}
```

---

# 66. Sequential vs Concurrent Decision

Ask:

```text
Does one task depend on previous result?
```

Yes:

```text
sequential
```

No:

```text
concurrent may be better
```

---

# 67. Machine-Coding Problem — Batch Runner 🔥🔥🔥

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

async function runInBatches(
  items,
  batchSize,
  worker
) {
  // Step 5:
  const batches =
    chunk(
      items,
      batchSize
    );

  // Step 6:
  const results =
    [];

  // Step 7:
  for (
    const batch
    of
    batches
  ) {
    // Step 8:
    const batchResults =
      await Promise.all(
        batch.map(
          worker
        )
      );

    // Step 9:
    results.push(
      ...batchResults
    );
  }

  // Step 10:
  return results;
}
```

---

# 68. Why Batch Runner?

Instead of:

```text
1000 requests at once
```

we can do:

```text
10 at once
wait
next 10
```

Controlled concurrency.

---

# 69. Machine-Coding Problem — Partial Batch Results 🔥🔥🔥

```js
async function runBatchSafely(
  items,
  worker
) {
  // Step 1:
  const tasks =
    items.map(
      worker
    );

  // Step 2:
  return await Promise.allSettled(
    tasks
  );
}
```

Use when:

```text
one failure should not hide other outcomes
```

---

# 70. Machine-Coding Problem — Latest-Only Runner 🔥🔥🔥

```js
function createLatestOnlyRunner() {
  // Step 1:
  let version =
    0;

  // Step 2:
  return async function (
    operation
  ) {
    // Step 3:
    const myVersion =
      ++version;

    // Step 4:
    const result =
      await operation();

    // Step 5:
    if (
      myVersion
      !==
      version
    ) {
      return {
        stale:
          true,
        value:
          null,
      };
    }

    // Step 6:
    return {
      stale:
        false,
      value:
        result,
    };
  };
}
```

---

# 71. Latest-Only Use Case

```text
search
autocomplete
pagination
tab change
profile switch
```

Only the latest result should update UI.

---

# 72. Machine-Coding Problem — Prevent Double Submit 🔥🔥🔥

```js
function createSubmitGuard() {
  // Step 1:
  let submitting =
    false;

  // Step 2:
  return async function (
    operation
  ) {
    // Step 3:
    if (
      submitting
    ) {
      return null;
    }

    // Step 4:
    submitting =
      true;

    try {
      // Step 5:
      return await operation();
    } finally {
      // Step 6:
      submitting =
        false;
    }
  };
}
```

---

# 73. Machine-Coding Problem — Active Request Counter

```js
function createRequestTracker() {
  // Step 1:
  let active =
    0;

  // Step 2:
  return async function (
    operation
  ) {
    // Step 3:
    active++;

    try {
      // Step 4:
      return await operation();
    } finally {
      // Step 5:
      active--;

      // Step 6:
      console.log(
        active
      );
    }
  };
}
```

Use when multiple requests may overlap.

---

# 74. Explain While Coding — Event Loop 🔥🔥🔥

Good interview explanation:

```text
JavaScript executes synchronous code
on the call stack first.

Async browser/runtime work
such as timers and network requests
is handled outside the stack.

When ready,
Promise continuations go to the microtask queue,
while timer callbacks go to the task/macrotask queue.

After the current stack becomes empty,
JavaScript drains microtasks
before taking the next macrotask.
```

---

# 75. Explain While Coding — Promise

Good answer:

```text
A Promise represents a future result.

It starts pending,
then settles once as fulfilled or rejected.

then handles fulfillment,
catch handles rejection,
finally is mainly for cleanup.

Each then/catch/finally returns a new Promise,
which is why chaining works.
```

---

# 76. Explain While Coding — Async/Await 🔥🔥🔥

Good answer:

```text
async/await is Promise-based syntax.

An async function always returns a Promise.

Code runs synchronously
until it reaches an await.

Await pauses only that async function's continuation,
not the whole JavaScript thread.

When the awaited Promise settles,
the function continues through a microtask.
```

---

# 77. Explain While Coding — Sequential vs Concurrent

Good answer:

```text
I use sequential await
when operations depend on one another
or order/rate limiting matters.

For independent operations,
I start them together
and use Promise.all
to reduce total waiting time.
```

---

# 78. Explain While Coding — Promise.all 🔥🔥🔥

Good answer:

```text
Promise.all waits for all inputs to fulfill.

It preserves input order in its result array,
not completion order.

If any input rejects,
the returned Promise rejects.

It does not automatically cancel
the other already-started operations.
```

---

# 79. Explain While Coding — Race Condition

Good answer:

```text
A race condition occurs when
multiple async operations overlap
and correctness depends on completion order.

In frontend search,
an old request can finish after a new request
and overwrite the latest state.

I solve it using AbortController,
request IDs,
or version guards.
```

---

# 80. Explain While Coding — Error Handling 🔥🔥🔥

Good answer:

```text
A rejected Promise
becomes an exception at the await point.

I catch only where I can recover
or add useful context.

If the caller still needs to know about failure,
I rethrow.

I use finally for cleanup,
and I avoid swallowing errors accidentally.
```

---

# 81. Interview Practical — Fix This Code 🔥🔥🔥

Problem:

```js
async function load() {
  // Step 1:
  const employee =
    getEmployee();

  // Step 2:
  console.log(
    employee.name
  );
}
```

Fix:

```js
async function load() {
  // Step 1:
  const employee =
    await getEmployee();

  // Step 2:
  console.log(
    employee.name
  );
}
```

Reason:

```text
getEmployee()
→ Promise

await
→ employee value
```

---

# 82. Interview Practical — Fix This Code

Problem:

```js
async function loadAll(
  ids
) {
  // Step 1:
  ids.forEach(
    async (
      id
    ) => {
      await loadEmployee(
        id
      );
    }
  );

  // Step 2:
  console.log(
    "Done"
  );
}
```

Fix concurrent:

```js
async function loadAll(
  ids
) {
  // Step 1:
  await Promise.all(
    ids.map(
      loadEmployee
    )
  );

  // Step 2:
  console.log(
    "Done"
  );
}
```

---

# 83. Interview Practical — Fix Performance 🔥🔥🔥

Problem:

```js
async function load() {
  // Step 1:
  const a =
    await getA();

  // Step 2:
  const b =
    await getB();

  // Step 3:
  const c =
    await getC();

  // Step 4:
  return {
    a,
    b,
    c,
  };
}
```

If independent:

```js
async function load() {
  // Step 1:
  const [
    a,
    b,
    c,
  ] =
    await Promise.all(
      [
        getA(),
        getB(),
        getC(),
      ]
    );

  // Step 2:
  return {
    a,
    b,
    c,
  };
}
```

---

# 84. Interview Practical — Preserve Partial Success

Problem:

```text
3 widgets
1 fails
whole dashboard should still render
```

Solution:

```js
async function loadWidgets() {
  // Step 1:
  return await Promise.allSettled(
    [
      loadA(),
      loadB(),
      loadC(),
    ]
  );
}
```

---

# 85. Interview Practical — Search Race Fix 🔥🔥🔥

Problem:

```text
old search response overwrites new one
```

Solution:

```js
// Step 1:
let latest =
  0;

async function search(
  query
) {
  // Step 2:
  const id =
    ++latest;

  // Step 3:
  const result =
    await searchApi(
      query
    );

  // Step 4:
  if (
    id
    !==
    latest
  ) {
    return;
  }

  // Step 5:
  updateUI(
    result
  );
}
```

---

# 86. Interview Practical — Timeout With Fetch

```js
async function fetchWithTimeout(
  url,
  ms
) {
  // Step 1:
  const controller =
    new AbortController();

  // Step 2:
  const timer =
    setTimeout(
      () => {
        controller.abort();
      },
      ms
    );

  try {
    // Step 3:
    return await fetch(
      url,
      {
        signal:
          controller.signal,
      }
    );
  } finally {
    // Step 4:
    clearTimeout(
      timer
    );
  }
}
```

---

# 87. Interview Practical — Retry With Final Error 🔥🔥🔥

```js
async function retry(
  operation,
  retries
) {
  // Step 1:
  let error;

  // Step 2:
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3:
      return await operation();
    } catch (
      currentError
    ) {
      // Step 4:
      error =
        currentError;
    }
  }

  // Step 5:
  throw error;
}
```

---

# 88. Interview Practical — Retry With Condition

```js
async function retryIf(
  operation,
  shouldRetry,
  retries = 3
) {
  // Step 1:
  let lastError;

  // Step 2:
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3:
      return await operation();
    } catch (
      error
    ) {
      // Step 4:
      lastError =
        error;

      // Step 5:
      if (
        !shouldRetry(
          error
        )
      ) {
        throw error;
      }
    }
  }

  // Step 6:
  throw lastError;
}
```

---

# 89. Interview Practical — Safe Bulk Processing 🔥🔥🔥

```js
async function processAll(
  items,
  worker
) {
  // Step 1:
  const results =
    await Promise.allSettled(
      items.map(
        worker
      )
    );

  // Step 2:
  const succeeded =
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
    );

  // Step 3:
  const failed =
    results.filter(
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

  // Step 4:
  return {
    succeeded,
    failed,
  };
}
```

---

# 90. Interview Practical — Batch Processing

```js
async function processInBatches(
  items,
  size,
  worker
) {
  // Step 1:
  const results =
    [];

  // Step 2:
  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    // Step 3:
    const batch =
      items.slice(
        index,
        index + size
      );

    // Step 4:
    const batchResults =
      await Promise.all(
        batch.map(
          worker
        )
      );

    // Step 5:
    results.push(
      ...batchResults
    );
  }

  // Step 6:
  return results;
}
```

---

# 91. Async Debugging Checklist 🔥🔥🔥

When async code is wrong, ask:

```text
Is this Promise awaited?

Did I forget return?

Is this async function returning Promise?

Is code before first await synchronous?

Is this callback a microtask or macrotask?

Did I confuse Promise queue with timer queue?

Did I use forEach(async)?

Did I use async filter/some/every incorrectly?

Should this be sequential?

Should this be concurrent?

Did I accidentally serialize independent work?

Did Promise.all reject because one optional task failed?

Should this use allSettled?

Did I forget response.ok?

Did I swallow the error?

Should I rethrow?

Did finally override a result?

Could an old request overwrite a new request?

Do I need AbortController?

Do I need request ID/version guard?

Can the user submit twice?

Am I retrying unsafe operations?

Does timeout actually cancel the underlying work?

Am I launching too many requests at once?
```

---

# 92. Async Decision Guide 🔥🔥🔥

```text
Need one async result?
→ await

Need dependent results?
→ sequential await

Need independent results?
→ Promise.all

Need every success/failure?
→ Promise.allSettled

Need first settled?
→ Promise.race

Need first success?
→ Promise.any

Need sequential iteration?
→ for...of + await

Need concurrent iteration?
→ map + Promise.all

Need controlled concurrency?
→ batching

Need retries?
→ retry utility

Need timeout?
→ Promise.race
or AbortController for fetch

Need latest result only?
→ abort/request ID

Need cleanup?
→ finally

Need recover?
→ catch and return fallback

Need caller to know failure?
→ rethrow
```

---

# 93. Final Interview Output Trace 🔥🔥🔥

```js
async function first() {
  // Step 1:
  console.log(
    "First Start"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  console.log(
    "First End"
  );

  // Step 4:
  return "F";
}

async function second() {
  // Step 5:
  console.log(
    "Second Start"
  );

  // Step 6:
  const value =
    await first();

  // Step 7:
  console.log(
    value
  );

  // Step 8:
  return "S";
}

// Step 9:
console.log(
  "A"
);

// Step 10:
setTimeout(
  () => {
    console.log(
      "Timer"
    );
  },
  0
);

// Step 11:
second()
  .then(
    (
      value
    ) => {
      console.log(
        value
      );
    }
  );

// Step 12:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Outer Promise"
      );
    }
  );

// Step 13:
console.log(
  "B"
);
```

Expected output:

```text
A
Second Start
First Start
B
First End
Outer Promise
F
S
Timer
```

Trace:

```text
A
↓
timer registered

second()
↓
Second Start

first()
↓
First Start
↓
await
↓
first continuation queued

Outer Promise queued

B

microtasks:
first continuation
↓
First End
↓
first resolves
↓
second continuation queued

Outer Promise
↓
Outer Promise

second continuation
↓
F
↓
second resolves
↓
.then queued

then
↓
S

next macrotask
↓
Timer
```

---

# 94. Final Machine-Coding Trace — Race Fix 🔥🔥🔥

```js
function fakeSearch(
  query,
  delay
) {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      setTimeout(
        () => {
          console.log(
            `${query} finished`
          );

          resolve(
            query
          );
        },
        delay
      );
    }
  );
}

// Step 2:
let latest =
  0;

async function search(
  query,
  delay
) {
  // Step 3:
  const id =
    ++latest;

  // Step 4:
  const result =
    await fakeSearch(
      query,
      delay
    );

  // Step 5:
  if (
    id
    !==
    latest
  ) {
    console.log(
      `${query} ignored`
    );

    return;
  }

  // Step 6:
  console.log(
    `UI: ${result}`
  );
}

// Step 7:
search(
  "old",
  300
);

// Step 8:
search(
  "new",
  100
);
```

Expected output:

```text
new finished
UI: new
old finished
old ignored
```

---

# 95. Final Machine-Coding Trace — Retry 🔥🔥🔥

```js
// Step 1:
let attempt =
  0;

async function task() {
  // Step 2:
  attempt++;

  // Step 3:
  console.log(
    `Attempt ${attempt}`
  );

  // Step 4:
  if (
    attempt
    <
    3
  ) {
    throw new Error(
      "Failed"
    );
  }

  // Step 5:
  return "Success";
}

async function run() {
  // Step 6:
  const result =
    await retry(
      task,
      3
    );

  // Step 7:
  console.log(
    result
  );
}

// Step 8:
run();
```

Expected output:

```text
Attempt 1
Attempt 2
Attempt 3
Success
```

---

# 96. Final Machine-Coding Trace — Sequential vs Concurrent 🔥🔥🔥

```js
function task(
  name,
  delay
) {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      setTimeout(
        () => {
          console.log(
            name
          );

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
  // Step 2:
  console.log(
    "Sequential"
  );

  // Step 3:
  await task(
    "A",
    20
  );

  // Step 4:
  await task(
    "B",
    10
  );

  // Step 5:
  console.log(
    "Concurrent"
  );

  // Step 6:
  const result =
    await Promise.all(
      [
        task(
          "C",
          30
        ),
        task(
          "D",
          10
        ),
      ]
    );

  // Step 7:
  console.log(
    result
  );
}

// Step 8:
run();
```

Expected output:

```text
Sequential
A
B
Concurrent
D
C
["C", "D"]
```

---

# 97. Final Senior-Level Async Rules 🔥🔥🔥

```text
1.
Never use await blindly.

2.
Ask whether work is dependent
or independent.

3.
Do not use forEach(async)
when you need completion control.

4.
Promise.all preserves input order,
not completion order.

5.
Promise.all rejects on one failure
but does not cancel the others.

6.
allSettled is for partial outcomes.

7.
Await pauses the async function,
not the JavaScript thread.

8.
Promise continuations are microtasks.

9.
Timers are tasks/macrotasks.

10.
Microtasks run before the next timer task.

11.
fetch usually does not reject for 404/500.

12.
Check response.ok/status.

13.
Abort stale requests when possible.

14.
Guard against stale responses.

15.
Do not swallow errors accidentally.

16.
Use finally for cleanup.

17.
Retry only when safe.

18.
Timeout does not necessarily cancel work.

19.
Limit concurrency for huge collections.

20.
Critical writes need backend consistency too.
```

---

# 98. Final Async Interview Checklist 🔥🔥🔥

You should now be comfortable explaining:

```text
Sync vs Async
Single Thread
Call Stack
Web APIs
Event Loop
Microtask Queue
Task Queue
Timers
Callbacks
Callback Hell
Promises
Promise States
then
catch
finally
Promise Chaining
Return Rules
Error Propagation
async
await
Sequential Execution
Concurrent Execution
fetch
HTTP Errors
Network Errors
AbortController
Promise.all
Promise.allSettled
Promise.race
Promise.any
for...of + await
map + Promise.all
forEach(async) Trap
Async filter Trap
Batch Processing
Unhandled Rejection
Race Conditions
Latest Request Wins
Request ID Guard
Retry
Timeout
Async Debugging
Output Prediction
```

---

# 99. Section 8 Machine-Coding Must-Know 🔥🔥🔥

You should be able to build without copying:

```text
retry()

sleep()

timeout()

fetchWithTimeout()

runSequentially()

runConcurrently()

processInBatches()

latest-request guard

AbortController search

double-submit guard

Promise.all dashboard

allSettled bulk operation

async filter pattern
```

---

# 100. Section 8 Final Mental Model 🔥🔥🔥

```text
JavaScript starts synchronous work
↓
Call Stack

Async operation starts
↓
runtime/browser handles waiting

when async result becomes ready
↓
continuation is queued

Promise / await continuation
→ Microtask

Timer callback
→ Task / Macrotask

current stack ends
↓
drain Microtasks
↓
run next Macrotask
↓
repeat
```

And for multiple async operations:

```text
Dependent?
→ sequential await

Independent?
→ concurrent

Need all?
→ Promise.all

Need every outcome?
→ allSettled

Need first settled?
→ race

Need first success?
→ any

Need latest only?
→ abort / version guard

Need controlled load?
→ batching
```

---

# Quick Memory 🧠🔥🔥🔥

## Event Loop Priority

```text
Sync
↓
Microtasks
↓
Macrotasks
```

## Promise

```text
future result
```

## `async`

```text
always returns Promise
```

## `await`

```text
pauses current async function continuation
```

## Sequential

```text
for...of + await
```

## Concurrent

```text
map + Promise.all
```

## Partial Results

```text
Promise.allSettled
```

## First Settled

```text
Promise.race
```

## First Success

```text
Promise.any
```

## Fetch HTTP Error

```text
check response.ok
```

## Cancellation

```text
AbortController
```

## Race Fix

```text
latest request wins
```

## Retry

```text
limited attempts
+
safe operation
```

## Timeout

```text
Promise.race
or
AbortController
```

## Big Collections

```text
batching
```

## Error Recovery

```text
catch returns fallback
```

## Error Propagation

```text
catch rethrows
or
no local catch
```

## Cleanup

```text
finally
```

## Most Important Interview Formula

```text
Synchronous code first
then Promise/await microtasks
then timer tasks.
```

## Best Final Async Interview Answer

```text
JavaScript executes synchronous code
on a single call stack.

Asynchronous work is coordinated
through the runtime and event loop.

Promise callbacks and async/await continuations
run as microtasks,
which are processed after the current stack
and before the next timer/task callback.

For multiple async operations,
I choose sequential execution
when there is dependency or ordering,
and concurrent execution
when operations are independent.

I use Promise.all for all required results,
allSettled for partial outcomes,
AbortController and request IDs
for stale-request races,
and try/catch/finally
for error handling and cleanup.

I also avoid async forEach,
limit concurrency for large workloads,
and only retry operations
when retrying is safe.
```

---

# ✅ 8.12 Async Practical Complete

# ✅ SECTION 8 — ASYNC JAVASCRIPT COMPLETE 🔥🔥🔥

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
8.10 Async Error Handling ✅
8.11 Race Conditions ✅
8.12 Async Practical ✅
```

Next major section:

```text
9. Advanced Practical JavaScript 🔥🔥🔥
```

Next chapter:

```text
9.1 Function Patterns
├── Debounce
├── Throttle
├── Currying
├── Memoization
├── Compose
├── Pipe
├── Once
└── Retry
```

**Next: 9.1 Function Patterns 🔥🔥🔥**
