# 9.7 Promise Implementations — Easy Version 🔥🔥🔥

This chapter is about building important Promise utilities from scratch.

You already know how to use:

```text
Promise
.then()
.catch()
.finally()
async/await
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
```

Now we will understand how some of these can be implemented.

Main topics:

```text
Promise Mental Model
Promise Constructor
resolve / reject
Promise States
Executor Runs Immediately
Then / Catch Basics
Delay Promise
Custom Promise.all
Custom Promise.allSettled
Custom Promise.race
Custom Promise.any
Promisify Callback
Sequential Promise Runner
Parallel Promise Runner
Retry Utility
Timeout Utility
Promise Pool Awareness
Simplified MyPromise
Interview Questions
Output Questions
Debugging
```

---

# 1. Why Build Promise Utilities From Scratch? 🔥🔥🔥

Because interviewers may ask:

```text
Implement Promise.all
Implement Promise.race
Implement Promise.allSettled
Implement retry
Convert callback to Promise
Run promises sequentially
```

They are checking whether you understand:

```text
resolve
reject
order
error handling
async flow
```

---

# 2. Promise Mental Model

A Promise represents:

```text
future result
```

It can be:

```text
pending
↓
fulfilled

or

pending
↓
rejected
```

Important:

```text
A Promise settles only once.
```

---

# 3. Very Basic Promise

```js
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 1: Complete the Promise successfully.
      // Why?
      // resolve() changes the Promise
      // from pending to fulfilled.
      resolve(
        "Success"
      );
    }
  );

// Step 2: Read fulfilled value.
promise.then(
  (
    value
  ) => {
    console.log(
      value
    ); // Output: Success
  }
);
```

Output:

```text
Success
```

---

# 4. Rejected Promise

```js
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 1: Reject the Promise.
      // Why?
      // Something failed.
      reject(
        new Error(
          "Failed"
        )
      );
    }
  );

// Step 2: Handle the rejection.
promise.catch(
  (
    error
  ) => {
    console.log(
      error.message
    ); // Output: Failed
  }
);
```

Output:

```text
Failed
```

---

# 5. Executor Runs Immediately 🔥🔥🔥

The function passed to `new Promise()` is called the executor.

It runs immediately.

```js
console.log(
  "A"
); // Output: A

const promise =
  new Promise(
    (
      resolve
    ) => {
      // Step 1: Promise executor runs immediately.
      console.log(
        "B"
      ); // Output: B

      // Step 2: Fulfill Promise.
      resolve();
    }
  );

console.log(
  "C"
); // Output: C
```

Output:

```text
A
B
C
```

---

# 6. `.then()` Callback Runs Later

```js
console.log(
  "A"
); // Output: A

Promise.resolve().then(
  () => {
    // Step 1: then callback
    // goes to microtask queue.
    console.log(
      "B"
    ); // Output later: B
  }
);

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

Easy flow:

```text
normal code
↓
A
C

microtask
↓
B
```

---

# 7. Promise Resolves Only Once 🔥🔥🔥

```js
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 1: First settle wins.
      resolve(
        "First"
      );

      // Step 2: Ignored.
      resolve(
        "Second"
      );

      // Step 3: Also ignored.
      reject(
        new Error(
          "Failed"
        )
      );
    }
  );

promise.then(
  (
    value
  ) => {
    console.log(
      value
    ); // Output: First
  }
);
```

Output:

```text
First
```

---

# 8. Error Inside Promise Executor 🔥🔥🔥

If executor throws:

```text
Promise becomes rejected
```

```js
const promise =
  new Promise(
    () => {
      // Step 1: Throw an error
      // inside the Promise executor.
      throw new Error(
        "Boom"
      );
    }
  );

// Step 2: Promise automatically rejects.
promise.catch(
  (
    error
  ) => {
    console.log(
      error.message
    ); // Output: Boom
  }
);
```

Output:

```text
Boom
```

---

# 9. Build a `delay()` Promise 🔥🔥🔥

Requirement:

```text
wait 1 second
then resolve
```

---

# 10. Build `delay()`

```js
function delay(
  ms
) {
  // Step 1: Return a Promise.
  return new Promise(
    (
      resolve
    ) => {
      // Step 2: Start timer.
      setTimeout(
        () => {
          // Step 3: Resolve
          // after the timer finishes.
          resolve(
            `Waited ${ms}ms`
          );
        },
        ms
      );
    }
  );
}
```

---

# 11. Test `delay()`

```js
async function run() {
  // Step 1: Wait for Promise.
  const result =
    await delay(
      100
    );

  // Step 2: Print resolved value.
  console.log(
    result
  ); // Output after about 100ms: Waited 100ms
}

run();
```

Output:

```text
Waited 100ms
```

Important:

```text
100ms is minimum delay.
Exact timing can be slightly later.
```

---

# 12. Custom `Promise.all()` 🔥🔥🔥

Behavior:

```text
all succeed
→ resolve with all values

one fails
→ reject immediately

result order
→ same as input order
```

---

# 13. Promise.all Example

```js
const p1 =
  Promise.resolve(
    "A"
  );

const p2 =
  Promise.resolve(
    "B"
  );

// Step 1: Wait for all Promises.
Promise.all(
  [
    p1,
    p2,
  ]
).then(
  (
    values
  ) => {
    console.log(
      values
    ); // Output: ["A", "B"]
  }
);
```

Output:

```text
["A", "B"]
```

---

# 14. Build `myPromiseAll()` Step by Step 🔥🔥🔥

```js
function myPromiseAll(
  values
) {
  // Step 1: Return one new Promise.
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2: Empty input
      // should resolve immediately.
      if (
        values.length
        ===
        0
      ) {
        resolve(
          []
        );

        return;
      }

      // Step 3: Create result array.
      const results =
        new Array(
          values.length
        );

      // Step 4: Count completed items.
      let completed =
        0;

      // Step 5: Visit every input.
      values.forEach(
        (
          value,
          index
        ) => {
          // Step 6: Promise.resolve()
          // lets normal values and Promises
          // both work.
          Promise.resolve(
            value
          ).then(
            (
              result
            ) => {
              // Step 7: Save result
              // at original input index.
              results[
                index
              ] =
                result;

              // Step 8: Increase completed count.
              completed++;

              // Step 9: When all finish,
              // resolve final result.
              if (
                completed
                ===
                values.length
              ) {
                resolve(
                  results
                );
              }
            },
            (
              error
            ) => {
              // Step 10: Any rejection
              // rejects the whole Promise.
              reject(
                error
              );
            }
          );
        }
      );
    }
  );
}
```

---

# 15. Why Use `new Array(values.length)`?

Because we want to preserve input order.

Even if Promise 2 finishes first,
its result must still go into index 1.

---

# 16. Test `myPromiseAll()`

```js
const p1 =
  Promise.resolve(
    "Rahul"
  );

const p2 =
  Promise.resolve(
    "Priya"
  );

// Step 1: Run custom Promise.all.
myPromiseAll(
  [
    p1,
    p2,
  ]
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: ["Rahul", "Priya"]
  }
);
```

Output:

```text
["Rahul", "Priya"]
```

---

# 17. Promise.all Keeps Input Order 🔥🔥🔥

```js
const slow =
  new Promise(
    (
      resolve
    ) => {
      setTimeout(
        () => {
          resolve(
            "Slow"
          );
        },
        100
      );
    }
  );

const fast =
  Promise.resolve(
    "Fast"
  );

// Step 1: Fast finishes first,
// but Slow is input index 0.
myPromiseAll(
  [
    slow,
    fast,
  ]
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: ["Slow", "Fast"]
  }
);
```

Output:

```text
["Slow", "Fast"]
```

---

# 18. Promise.all Rejection Behavior 🔥🔥🔥

```js
const good =
  Promise.resolve(
    "OK"
  );

const bad =
  Promise.reject(
    new Error(
      "Failed"
    )
  );

// Step 1: One rejection
// rejects the entire result.
myPromiseAll(
  [
    good,
    bad,
  ]
).catch(
  (
    error
  ) => {
    console.log(
      error.message
    ); // Output: Failed
  }
);
```

Output:

```text
Failed
```

---

# 19. Empty Promise.all

```js
myPromiseAll(
  []
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: []
  }
);
```

Output:

```text
[]
```

---

# 20. Custom `Promise.allSettled()` 🔥🔥🔥

Behavior:

```text
wait for everything
do not fail early
return status for every item
```

---

# 21. Build `myPromiseAllSettled()`

```js
function myPromiseAllSettled(
  values
) {
  // Step 1: Return a new Promise.
  return new Promise(
    (
      resolve
    ) => {
      // Step 2: Empty input.
      if (
        values.length
        ===
        0
      ) {
        resolve(
          []
        );

        return;
      }

      // Step 3: Prepare result array.
      const results =
        new Array(
          values.length
        );

      // Step 4: Count settled items.
      let settled =
        0;

      // Step 5: Process every input.
      values.forEach(
        (
          value,
          index
        ) => {
          Promise.resolve(
            value
          ).then(
            (
              result
            ) => {
              // Step 6: Fulfilled result.
              results[
                index
              ] = {
                status:
                  "fulfilled",
                value:
                  result,
              };
            },
            (
              error
            ) => {
              // Step 7: Rejected result.
              results[
                index
              ] = {
                status:
                  "rejected",
                reason:
                  error,
              };
            }
          ).finally(
            () => {
              // Step 8: This item settled.
              settled++;

              // Step 9: Resolve
              // after everything settles.
              if (
                settled
                ===
                values.length
              ) {
                resolve(
                  results
                );
              }
            }
          );
        }
      );
    }
  );
}
```

---

# 22. Test `myPromiseAllSettled()`

```js
const good =
  Promise.resolve(
    "Success"
  );

const bad =
  Promise.reject(
    "Failed"
  );

// Step 1: Wait for both.
myPromiseAllSettled(
  [
    good,
    bad,
  ]
).then(
  (
    result
  ) => {
    console.log(
      result[
        0
      ].status
    ); // Output: fulfilled

    console.log(
      result[
        1
      ].status
    ); // Output: rejected
  }
);
```

Output:

```text
fulfilled
rejected
```

---

# 23. Promise.all vs Promise.allSettled

```text
Promise.all
→ one fails
→ whole thing rejects

Promise.allSettled
→ waits for all
→ tells success/failure separately
```

---

# 24. Custom `Promise.race()` 🔥🔥🔥

Behavior:

```text
first settled Promise wins
```

It may be fulfilled or rejected.

---

# 25. Build `myPromiseRace()`

```js
function myPromiseRace(
  values
) {
  // Step 1: Return one Promise.
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2: Attach handlers
      // to every input.
      for (
        const value
        of
        values
      ) {
        Promise.resolve(
          value
        ).then(
          // Step 3: First fulfillment wins.
          resolve,

          // Step 4: First rejection also wins.
          reject
        );
      }
    }
  );
}
```

---

# 26. Test `myPromiseRace()`

```js
const slow =
  new Promise(
    (
      resolve
    ) => {
      setTimeout(
        () => {
          resolve(
            "Slow"
          );
        },
        100
      );
    }
  );

const fast =
  Promise.resolve(
    "Fast"
  );

// Step 1: First settled Promise wins.
myPromiseRace(
  [
    slow,
    fast,
  ]
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: Fast
  }
);
```

Output:

```text
Fast
```

---

# 27. Promise.race Can Reject First

```js
const rejected =
  Promise.reject(
    new Error(
      "Failed First"
    )
  );

const success =
  delay(
    100
  );

// Step 1: Rejection settles first.
myPromiseRace(
  [
    rejected,
    success,
  ]
).catch(
  (
    error
  ) => {
    console.log(
      error.message
    ); // Output: Failed First
  }
);
```

Output:

```text
Failed First
```

---

# 28. Empty Promise.race

```text
Promise.race([])
```

stays pending forever.

Our implementation behaves the same,
because nothing calls resolve or reject.

---

# 29. Custom `Promise.any()` 🔥🔥🔥

Behavior:

```text
first fulfilled Promise wins

rejections are ignored
until everything rejects
```

If all reject:

```text
AggregateError
```

---

# 30. Build `myPromiseAny()`

```js
function myPromiseAny(
  values
) {
  // Step 1: Return one Promise.
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2: Empty input
      // has no possible success.
      if (
        values.length
        ===
        0
      ) {
        reject(
          new AggregateError(
            [],
            "All promises were rejected"
          )
        );

        return;
      }

      // Step 3: Save errors
      // in input order.
      const errors =
        new Array(
          values.length
        );

      // Step 4: Count rejections.
      let rejectedCount =
        0;

      // Step 5: Process every value.
      values.forEach(
        (
          value,
          index
        ) => {
          Promise.resolve(
            value
          ).then(
            (
              result
            ) => {
              // Step 6: First success wins.
              resolve(
                result
              );
            },
            (
              error
            ) => {
              // Step 7: Save error.
              errors[
                index
              ] =
                error;

              rejectedCount++;

              // Step 8: All failed?
              if (
                rejectedCount
                ===
                values.length
              ) {
                reject(
                  new AggregateError(
                    errors,
                    "All promises were rejected"
                  )
                );
              }
            }
          );
        }
      );
    }
  );
}
```

---

# 31. Test `myPromiseAny()`

```js
const bad =
  Promise.reject(
    "Failed"
  );

const good =
  Promise.resolve(
    "Success"
  );

// Step 1: First fulfilled value wins.
myPromiseAny(
  [
    bad,
    good,
  ]
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: Success
  }
);
```

Output:

```text
Success
```

---

# 32. Promise.any All-Rejected Case

```js
const p1 =
  Promise.reject(
    "A failed"
  );

const p2 =
  Promise.reject(
    "B failed"
  );

// Step 1: Everything rejects.
myPromiseAny(
  [
    p1,
    p2,
  ]
).catch(
  (
    error
  ) => {
    console.log(
      error instanceof AggregateError
    ); // Output: true
  }
);
```

Output:

```text
true
```

---

# 33. Promise.race vs Promise.any 🔥🔥🔥

```text
race
→ first settled wins
→ success OR failure

any
→ first success wins
→ failures are ignored
→ unless all fail
```

---

# 34. Promise Combinator Memory Trick

```text
all
→ ALL must succeed

allSettled
→ wait for ALL results

race
→ FIRST settled wins

any
→ ANY first success wins
```

---

# 35. Convert Callback to Promise 🔥🔥🔥

Old APIs may use callbacks.

We may want to convert:

```text
callback style
↓
Promise style
↓
async/await
```

This is called `promisify`.

---

# 36. Callback Style Example

```js
function getEmployee(
  id,
  callback
) {
  // Step 1: Simulate async work.
  setTimeout(
    () => {
      // Step 2: Send result
      // through callback.
      callback(
        null,
        {
          id,
          name:
            "Rahul",
        }
      );
    },
    10
  );
}

// Step 3: Use callback.
getEmployee(
  1,
  (
    error,
    employee
  ) => {
    console.log(
      employee.name
    ); // Output: Rahul
  }
);
```

Output:

```text
Rahul
```

---

# 37. Build a Promise Wrapper

```js
function getEmployeePromise(
  id
) {
  // Step 1: Return a Promise.
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2: Call old callback API.
      getEmployee(
        id,
        (
          error,
          employee
        ) => {
          // Step 3: Error?
          // Reject Promise.
          if (
            error
          ) {
            reject(
              error
            );

            return;
          }

          // Step 4: Success?
          // Resolve with employee.
          resolve(
            employee
          );
        }
      );
    }
  );
}
```

---

# 38. Use Promise Wrapper

```js
async function run() {
  // Step 1: Await Promise version.
  const employee =
    await getEmployeePromise(
      1
    );

  // Step 2: Print employee.
  console.log(
    employee.name
  ); // Output: Rahul
}

run();
```

Output:

```text
Rahul
```

---

# 39. Generic `promisify()` 🔥🔥🔥

Assumption:

```text
callback(error, result)
```

---

# 40. Build `promisify()`

```js
function promisify(
  fn
) {
  // Step 1: Return a new function.
  return function (
    ...args
  ) {
    // Step 2: New function returns Promise.
    return new Promise(
      (
        resolve,
        reject
      ) => {
        // Step 3: Call original function.
        fn(
          ...args,
          (
            error,
            result
          ) => {
            // Step 4: Error?
            if (
              error
            ) {
              reject(
                error
              );

              return;
            }

            // Step 5: Success?
            resolve(
              result
            );
          }
        );
      }
    );
  };
}
```

---

# 41. Sequential Promise Runner 🔥🔥🔥

Requirement:

```text
task 1
↓ wait
task 2
↓ wait
task 3
```

---

# 42. Build `runSequentially()`

```js
async function runSequentially(
  tasks
) {
  // Step 1: Store results.
  const results =
    [];

  // Step 2: Process one task
  // after another.
  for (
    const task
    of
    tasks
  ) {
    // Step 3: Start current task
    // and wait for it.
    const result =
      await task();

    // Step 4: Save result.
    results.push(
      result
    );
  }

  // Step 5: Return results.
  return results;
}
```

---

# 43. Test Sequential Runner

```js
const tasks = [
  () =>
    Promise.resolve(
      "A"
    ),

  () =>
    Promise.resolve(
      "B"
    ),

  () =>
    Promise.resolve(
      "C"
    ),
];

// Step 1: Run one by one.
runSequentially(
  tasks
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: ["A", "B", "C"]
  }
);
```

Output:

```text
["A", "B", "C"]
```

---

# 44. Why Store Functions Instead of Promises? 🔥🔥🔥

If you write:

```js
[
  task1(),
  task2(),
  task3(),
]
```

the tasks may start immediately.

For real sequential execution:

```js
[
  () => task1(),
  () => task2(),
  () => task3(),
]
```

Then we control when each task starts.

---

# 45. Parallel Runner

```js
async function runParallel(
  tasks
) {
  // Step 1: Start all tasks.
  const promises =
    tasks.map(
      (
        task
      ) => {
        return task();
      }
    );

  // Step 2: Wait for all.
  return Promise.all(
    promises
  );
}
```

---

# 46. Sequential vs Parallel

```text
Sequential:
task 1
↓
task 2
↓
task 3

Parallel:
task 1 ─┐
task 2 ─┼→ together
task 3 ─┘
```

---

# 47. Retry Utility 🔥🔥🔥

```text
operation fails
↓
try again
```

Remember:

```text
retries = 2
=
1 initial attempt
+
2 extra retries
=
3 total attempts
```

---

# 48. Build `retry()`

```js
async function retry(
  operation,
  retries = 2
) {
  // Step 1: Save final error.
  let lastError;

  // Step 2: Run first attempt
  // plus extra retries.
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3: Success?
      // Return immediately.
      return await operation();
    } catch (
      error
    ) {
      // Step 4: Save failure.
      lastError =
        error;
    }
  }

  // Step 5: Everything failed.
  throw lastError;
}
```

---

# 49. Test Retry

```js
let attempts =
  0;

async function unstableTask() {
  // Step 1: Count attempts.
  attempts++;

  // Step 2: Fail first two times.
  if (
    attempts
    <
    3
  ) {
    throw new Error(
      "Temporary error"
    );
  }

  // Step 3: Third succeeds.
  return "Success";
}

async function run() {
  // Step 4: Retry failed task.
  const result =
    await retry(
      unstableTask,
      2
    );

  console.log(
    result
  ); // Output: Success

  console.log(
    attempts
  ); // Output: 3
}

run();
```

Output:

```text
Success
3
```

---

# 50. Retry Safety

Do not blindly retry:

```text
payment
create order
non-idempotent POST
validation error
401
403
```

Possible retry cases:

```text
temporary network error
timeout
502
503
504
```


---

# 51. Timeout Utility 🔥🔥🔥

Requirement:

```text
if Promise takes too long
→ reject
```

---

# 52. Build `withTimeout()`

```js
function withTimeout(
  promise,
  ms
) {
  // Step 1: Create timeout Promise.
  const timeout =
    new Promise(
      (
        ,
        reject
      ) => {
        setTimeout(
          () => {
            reject(
              new Error(
                "Timed out"
              )
            );
          },
          ms
        );
      }
    );

  // Step 2: First settled Promise wins.
  return Promise.race(
    [
      promise,
      timeout,
    ]
  );
}
```

---

# 53. Timeout Important Rule 🔥🔥🔥

`Promise.race()` does not cancel the losing task.

So:

```text
timeout wins
↓
original Promise may still continue
```

For fetch cancellation:

```text
AbortController
```

is better.

---

# 54. Promise Pool Awareness 🔥🔥🔥

Suppose 100 API tasks exist.

You may not want:

```text
100 requests at once
```

You may want:

```text
maximum 3 at a time
```

This is called:

```text
concurrency limiting
```

It is different from simple batching.

---

# 55. Batch vs Pool

Batch:

```text
[1,2,3]
wait
[4,5,6]
wait
```

Pool:

```text
3 running

one finishes
↓
start next immediately
```

Pool usually uses resources better.

---

# 56. Simplified `MyPromise` — Awareness 🔥🔥🔥

Now we will build a very simplified Promise-like class.

Important:

```text
This is for understanding/interview learning.
It is NOT a full JavaScript Promise specification.
```

We will support only:

```text
pending
fulfilled
rejected
then()
catch()
basic async callback handling
```

---

# 57. Promise States in Our Class

```text
PENDING
FULFILLED
REJECTED
```

Once it becomes fulfilled/rejected,
it should not change again.

---

# 58. Start `MyPromise`

```js
class MyPromise {
  constructor(
    executor
  ) {
    // Step 1: Initial state.
    this.state =
      "pending";

    // Step 2: Store success value.
    this.value =
      undefined;

    // Step 3: Store failure reason.
    this.reason =
      undefined;

    // Step 4: Store success callbacks.
    this.successCallbacks =
      [];

    // Step 5: Store failure callbacks.
    this.failureCallbacks =
      [];
  }
}
```

---

# 59. Add `resolve()`

```js
class MyPromise {
  constructor(
    executor
  ) {
    this.state =
      "pending";

    this.value =
      undefined;

    this.reason =
      undefined;

    this.successCallbacks =
      [];

    this.failureCallbacks =
      [];

    // Step 1: Create resolve function.
    const resolve =
      (
        value
      ) => {
        // Step 2: Ignore
        // if already settled.
        if (
          this.state
          !==
          "pending"
        ) {
          return;
        }

        // Step 3: Change state.
        this.state =
          "fulfilled";

        // Step 4: Save value.
        this.value =
          value;

        // Step 5: Run stored callbacks.
        this.successCallbacks.forEach(
          (
            callback
          ) => {
            callback(
              value
            );
          }
        );
      };
  }
}
```

---

# 60. Add `reject()`

```js
const reject =
  (
    reason
  ) => {
    // Step 1: Ignore
    // if already settled.
    if (
      this.state
      !==
      "pending"
    ) {
      return;
    }

    // Step 2: Change state.
    this.state =
      "rejected";

    // Step 3: Save reason.
    this.reason =
      reason;

    // Step 4: Run stored failure callbacks.
    this.failureCallbacks.forEach(
      (
        callback
      ) => {
        callback(
          reason
        );
      }
    );
  };
```

This belongs inside the constructor.

---

# 61. Run Executor Safely 🔥🔥🔥

```js
try {
  // Step 1: Run executor immediately.
  executor(
    resolve,
    reject
  );
} catch (
  error
) {
  // Step 2: Thrown error
  // becomes rejection.
  reject(
    error
  );
}
```

---

# 62. Add Simple `.then()`

```js
then(
  onFulfilled,
  onRejected
) {
  // Step 1: Already fulfilled?
  if (
    this.state
    ===
    "fulfilled"
  ) {
    queueMicrotask(
      () => {
        onFulfilled(
          this.value
        );
      }
    );

    return;
  }

  // Step 2: Already rejected?
  if (
    this.state
    ===
    "rejected"
  ) {
    queueMicrotask(
      () => {
        onRejected(
          this.reason
        );
      }
    );

    return;
  }

  // Step 3: Still pending?
  // Save callbacks for later.
  this.successCallbacks.push(
    (
      value
    ) => {
      queueMicrotask(
        () => {
          onFulfilled(
            value
          );
        }
      );
    }
  );

  this.failureCallbacks.push(
    (
      reason
    ) => {
      queueMicrotask(
        () => {
          onRejected(
            reason
          );
        }
      );
    }
  );
}
```

---

# 63. Why `queueMicrotask()`?

Real Promise handlers run as microtasks.

So `.then()` should not run immediately.

`queueMicrotask()` makes this simple demo behave closer to real Promises.

---

# 64. Add Simple `.catch()`

Conceptually:

```text
catch(onRejected)
≈
then(undefined, onRejected)
```

Simple version:

```js
catch(
  onRejected
) {
  // Step 1: Reuse then()
  // for failure handling.
  return this.then(
    undefined,
    onRejected
  );
}
```

Important:

```text
Our simple then()
does not return a new Promise yet.

So full chaining is not implemented.
```

---

# 65. Full Simplified `MyPromise` 🔥🔥🔥

```js
class MyPromise {
  constructor(
    executor
  ) {
    // Step 1: Start pending.
    this.state =
      "pending";

    // Step 2: Prepare value/reason.
    this.value =
      undefined;

    this.reason =
      undefined;

    // Step 3: Prepare callback queues.
    this.successCallbacks =
      [];

    this.failureCallbacks =
      [];

    // Step 4: Resolve function.
    const resolve =
      (
        value
      ) => {
        if (
          this.state
          !==
          "pending"
        ) {
          return;
        }

        this.state =
          "fulfilled";

        this.value =
          value;

        this.successCallbacks.forEach(
          (
            callback
          ) => {
            callback(
              value
            );
          }
        );
      };

    // Step 5: Reject function.
    const reject =
      (
        reason
      ) => {
        if (
          this.state
          !==
          "pending"
        ) {
          return;
        }

        this.state =
          "rejected";

        this.reason =
          reason;

        this.failureCallbacks.forEach(
          (
            callback
          ) => {
            callback(
              reason
            );
          }
        );
      };

    // Step 6: Run executor immediately.
    try {
      executor(
        resolve,
        reject
      );
    } catch (
      error
    ) {
      reject(
        error
      );
    }
  }

  then(
    onFulfilled,
    onRejected
  ) {
    // Step 7: Default success handler.
    const successHandler =
      typeof onFulfilled
      ===
      "function"
        ? onFulfilled
        : (
            value
          ) => {
            return value;
          };

    // Step 8: Default failure handler.
    const failureHandler =
      typeof onRejected
      ===
      "function"
        ? onRejected
        : (
            reason
          ) => {
            throw reason;
          };

    // Step 9: Already fulfilled.
    if (
      this.state
      ===
      "fulfilled"
    ) {
      queueMicrotask(
        () => {
          successHandler(
            this.value
          );
        }
      );

      return;
    }

    // Step 10: Already rejected.
    if (
      this.state
      ===
      "rejected"
    ) {
      queueMicrotask(
        () => {
          failureHandler(
            this.reason
          );
        }
      );

      return;
    }

    // Step 11: Still pending.
    this.successCallbacks.push(
      (
        value
      ) => {
        queueMicrotask(
          () => {
            successHandler(
              value
            );
          }
        );
      }
    );

    this.failureCallbacks.push(
      (
        reason
      ) => {
        queueMicrotask(
          () => {
            failureHandler(
              reason
            );
          }
        );
      }
    );
  }

  catch(
    onRejected
  ) {
    // Step 12: Reuse then()
    // for rejection handling.
    return this.then(
      undefined,
      onRejected
    );
  }
}
```

---

# 66. Test Simplified MyPromise

```js
const promise =
  new MyPromise(
    (
      resolve
    ) => {
      // Step 1: Resolve custom Promise.
      resolve(
        "Hello"
      );
    }
  );

// Step 2: Read value.
promise.then(
  (
    value
  ) => {
    console.log(
      value
    ); // Output: Hello
  }
);
```

Output:

```text
Hello
```

---

# 67. Important Limitation of Our `MyPromise` 🔥🔥🔥

It is NOT complete.

Missing:

```text
proper then() chaining
Promise resolution procedure
thenable adoption
cycle detection
finally()
static resolve/reject
all/allSettled/race/any methods
full specification behavior
```

Say this clearly in an interview.

---

# 68. Why Real `.then()` Must Return a New Promise?

Because chaining works like this:

```js
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 1: Return new value.
      return (
        value + 5
      );
    }
  )
  .then(
    (
      value
    ) => {
      console.log(
        value
      ); // Output: 15
    }
  );
```

Output:

```text
15
```

Each `.then()` returns another Promise.

---

# 69. Missing Return Trap 🔥🔥🔥

```js
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 1: Calculate,
      // but do not return.
      value + 5;
    }
  )
  .then(
    (
      value
    ) => {
      console.log(
        value
      ); // Output: undefined
    }
  );
```

Output:

```text
undefined
```

Why?

```text
first then returned nothing
↓
undefined
↓
next then gets undefined
```

---

# 70. Throw Inside `.then()`

```js
Promise.resolve(
  "Start"
)
  .then(
    () => {
      // Step 1: Throw error.
      throw new Error(
        "Failed"
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 2: Error becomes rejection.
      console.log(
        error.message
      ); // Output: Failed
    }
  );
```

Output:

```text
Failed
```

---

# 71. Catch Can Recover 🔥🔥🔥

```js
Promise.reject(
  new Error(
    "Failed"
  )
)
  .catch(
    (
      error
    ) => {
      // Step 1: Handle rejection.
      // Step 2: Return normal value.
      return "Recovered";
    }
  )
  .then(
    (
      value
    ) => {
      console.log(
        value
      ); // Output: Recovered
    }
  );
```

Output:

```text
Recovered
```

---

# 72. `.catch(fn)` Mental Model

Conceptually:

```js
promise.catch(
  fn
);
```

is similar to:

```js
promise.then(
  undefined,
  fn
);
```

---

# 73. `.then(success, failure)` Trap 🔥🔥🔥

The failure handler in the same `.then()` does not catch an error thrown by that same success handler.

```js
Promise.resolve(
  "A"
)
  .then(
    () => {
      // Step 1: Success handler throws.
      throw new Error(
        "Boom"
      );
    },
    (
      error
    ) => {
      // Step 2: This does not catch
      // the error thrown above.
      console.log(
        "Not reached"
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 3: Next catch handles it.
      console.log(
        error.message
      ); // Output: Boom
    }
  );
```

Output:

```text
Boom
```

---

# 74. `finally()` Pass-Through 🔥🔥🔥

```js
Promise.resolve(
  "Data"
)
  .finally(
    () => {
      // Step 1: Cleanup.
      console.log(
        "Cleanup"
      ); // Output: Cleanup
    }
  )
  .then(
    (
      value
    ) => {
      // Step 2: Original value continues.
      console.log(
        value
      ); // Output: Data
    }
  );
```

Output:

```text
Cleanup
Data
```

---

# 75. `finally()` Can Override With Rejection

```js
Promise.resolve(
  "Data"
)
  .finally(
    () => {
      // Step 1: finally returns
      // a rejected Promise.
      return Promise.reject(
        new Error(
          "Cleanup failed"
        )
      );
    }
  )
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      ); // Output: Cleanup failed
    }
  );
```

Output:

```text
Cleanup failed
```

---

# 76. Output Question 1 🔥🔥🔥

```js
console.log(
  "A"
); // Output: A

new Promise(
  (
    resolve
  ) => {
    // Step 1: Executor runs immediately.
    console.log(
      "B"
    ); // Output: B

    resolve();
  }
).then(
  () => {
    // Step 2: then runs later.
    console.log(
      "C"
    ); // Output later: C
  }
);

console.log(
  "D"
); // Output: D
```

Output:

```text
A
B
D
C
```

---

# 77. Output Question 2

```js
Promise.resolve(
  1
)
  .then(
    (
      value
    ) => {
      // Step 1: Return 2.
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
      ); // Output: 2
    }
  );
```

Output:

```text
2
```

---

# 78. Output Question 3

```js
Promise.reject(
  "Error"
)
  .catch(
    (
      error
    ) => {
      // Step 1: Recover
      // with normal value.
      return "Recovered";
    }
  )
  .then(
    (
      value
    ) => {
      console.log(
        value
      ); // Output: Recovered
    }
  );
```

Output:

```text
Recovered
```

---

# 79. Output Question 4

```js
Promise.resolve(
  5
)
  .then(
    (
      value
    ) => {
      // Step 1: No return.
      value * 2;
    }
  )
  .then(
    (
      value
    ) => {
      console.log(
        value
      ); // Output: undefined
    }
  );
```

Output:

```text
undefined
```

---

# 80. Common Debugging Mistake — Forgetting Return

Wrong:

```js
.then(
  (
    data
  ) => {
    transform(
      data
    );
  }
)
```

If next `.then()` needs the transformed result,
return it.

---

# 81. Common Debugging Mistake — Promise.all for Partial Success

If you want:

```text
successful results
+
failed results
```

use:

```text
Promise.allSettled()
```

not plain `Promise.all()`.

---

# 82. Common Debugging Mistake — Promise.any vs race

```text
race
→ first settled

any
→ first fulfilled
```

---

# 83. Common Debugging Mistake — Sequential Work Starts Early

Wrong:

```js
const tasks = [
  fetchA(),
  fetchB(),
  fetchC(),
];
```

Those Promises may start immediately.

For true sequence:

```js
const tasks = [
  () => fetchA(),
  () => fetchB(),
  () => fetchC(),
];
```

---

# 84. Common Debugging Mistake — Timeout Means Cancellation

Wrong:

```text
Promise.race timeout
=
request cancelled
```

Correct:

```text
race only chooses the winner
```

---

# 85. Interview Question — How Does Promise.all Keep Order? 🔥🔥🔥

Easy answer:

```text
I save each resolved value
using its original input index.

So completion order can differ,
but result order stays the same.
```

---

# 86. Interview Question — Why `Promise.resolve(value)`?

Easy answer:

```text
Promise combinators can receive
normal values or Promises.

Promise.resolve(value)
lets both cases follow Promise logic.
```

---

# 87. Interview Question — Why Does Promise.all Fail Fast?

Easy answer:

```text
If one required operation fails,
the combined result cannot be
fully successful.

So Promise.all rejects.
```

---

# 88. Interview Question — When Use allSettled?

Easy answer:

```text
When I want every result,
even if some operations fail.

Example:
upload many files
and show status for each file.
```

---

# 89. Interview Question — When Use race?

Easy answer:

```text
When I care about
the first settled result.

A common example is timeout logic.
```

---

# 90. Interview Question — When Use any?

Easy answer:

```text
When I want the first successful result
and can ignore earlier failures.
```

---

# 91. Interview Question — Why Promisify?

Easy answer:

```text
Promisify converts callback-style async code
into Promise-style code.

Then I can use:
then/catch
or
async/await.
```

---

# 92. Interview Question — Why Store Functions for Sequential Execution?

Easy answer:

```text
Creating a Promise may start work immediately.

A function lets me choose
when the task starts.
```

---

# 93. Interview Question — What Does `finally()` Do?

Easy answer:

```text
finally is mainly for cleanup.

It runs after success or failure.

Normally it passes through
the old value/error
unless finally itself fails.
```

---

# 94. Interview Question — What Is Missing From Simplified MyPromise?

Good answer:

```text
It demonstrates states,
resolve/reject,
stored callbacks,
and microtask-style handlers.

But it is not spec-complete.

A real implementation needs
proper then chaining,
thenable resolution,
cycle protection,
static methods,
and more edge cases.
```

---

# 95. Final Promise Decision Guide 🔥🔥🔥

```text
Need all success?
→ Promise.all

Need every result?
→ Promise.allSettled

Need first settled?
→ Promise.race

Need first success?
→ Promise.any

Need callback → Promise?
→ promisify

Need one-by-one execution?
→ runSequentially

Need all together?
→ Promise.all / runParallel

Temporary failure?
→ retry

Need maximum wait time?
→ timeout wrapper

Need max N active tasks?
→ concurrency pool
```

---

# 96. Quick Memory 🧠🔥🔥🔥

```text
Promise states
→ pending / fulfilled / rejected

Executor
→ runs immediately

then/catch handlers
→ microtasks

Promise settles
→ only once

Promise.all
→ all success

Promise.allSettled
→ all results

Promise.race
→ first settled

Promise.any
→ first success

Promisify
→ callback to Promise

Sequential
→ await one by one

Parallel
→ start together

Retry
→ try again after failure

Timeout
→ Promise.race

MyPromise
→ state + callbacks + resolve/reject
```

---

# 97. Best Interview Answer 🔥🔥🔥

```text
A Promise represents a future result
and moves from pending
to either fulfilled or rejected.

For custom Promise utilities,
I preserve input order,
handle normal values using Promise.resolve,
reject correctly,
and handle empty input.

Promise.all waits for all successes
and rejects on the first failure.

Promise.allSettled waits for everything.

Promise.race returns the first settled result.

Promise.any returns the first fulfilled result
and rejects only if all inputs reject.

For machine coding,
I also use Promise-based utilities
for retry, timeout,
sequential execution,
parallel execution,
and callback-to-Promise conversion.

If I build a custom Promise class,
I clearly state that a simple interview version
is not the full Promise specification.
```

---

# ✅ 9.7 Promise Implementations Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ✅
9.6 Machine-Coding Utilities ✅
9.7 Promise Implementations ✅

9.8 Event System ← NEXT
9.9 String Utilities
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.8 Event System 🔥🔥🔥
```
