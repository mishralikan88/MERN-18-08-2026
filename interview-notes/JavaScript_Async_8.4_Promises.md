# 8.4 Promises 🔥🔥🔥

A **Promise** represents the eventual result of an asynchronous operation.

A Promise can be:

```text
Pending
Fulfilled
Rejected
```

Master mental model:

```text
Promise created
↓
Pending
↓
either

Fulfilled
→ success value

OR

Rejected
→ error / rejection reason
```

Most important rule:

```text
A Promise settles only once.
```

After it becomes:

```text
Fulfilled
or
Rejected
```

its state cannot change again.

Promises solve many problems found in deeply nested callbacks:

```text
Callback Hell
Manual error propagation
Inversion-of-control problems
Difficult async composition
```

This chapter covers:

```text
Promise Creation
Promise Executor
Pending
Fulfilled
Rejected
resolve()
reject()
then()
catch()
finally()
Promise Chaining
Return Rules
Returning Values
Returning Promises
Throwing Errors
Error Propagation
Catch Recovery
Microtask Behaviour
Multiple Handlers
Promise.resolve()
Promise.reject()
Promise Settlement
Callback → Promise Conversion
Real API-Style Flow
Output Questions
Debugging
Interview Questions
```

---

# 1. What Is a Promise? 🔥🔥🔥

A Promise is an object representing:

```text
a value that may be available
now,
later,
or fail
```

Example idea:

```text
Order food
↓
you receive order token
↓
food is not ready yet

Later:
food ready
→ success

or
order failed
→ error
```

The token is similar to a Promise.

---

# 2. Promise States 🔥🔥🔥

A Promise has three major states:

```text
Pending
Fulfilled
Rejected
```

---

# 3. Pending State

When a Promise is created and has not completed yet:

```text
Pending
```

Example mental model:

```text
request started
↓
waiting for result
↓
Pending
```

---

# 4. Fulfilled State 🔥🔥🔥

When async work succeeds:

```text
resolve(value)
↓
Promise becomes Fulfilled
```

The success value becomes available to:

```text
.then()
```

---

# 5. Rejected State 🔥🔥🔥

When async work fails:

```text
reject(error)
↓
Promise becomes Rejected
```

The rejection can be handled by:

```text
.catch()
```

or a rejection handler.

---

# 6. Promise Creation Syntax 🔥🔥🔥

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      resolve(
        "Success"
      );
    }
  );

// Step 3:
console.log(
  promise
);
```

The exact console representation depends on the runtime.

Conceptually:

```text
Promise fulfilled with "Success"
```

---

# 7. Promise Constructor

Syntax:

```text
new Promise((resolve, reject) => {
  ...
})
```

The function passed into `new Promise()` is called the:

```text
executor
```

---

# 8. Promise Executor Runs Synchronously 🔥🔥🔥

This is extremely important.

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
new Promise(
  (
    resolve
  ) => {
    console.log(
      "B"
    );

    resolve();
  }
);

// Step 3:
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

The executor itself runs immediately.

---

# 9. Executor vs `.then()` 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
const promise =
  new Promise(
    (
      resolve
    ) => {
      console.log(
        "B"
      );

      resolve(
        "Done"
      );
    }
  );

// Step 3:
promise.then(
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
  "C"
);
```

Output:

```text
A
B
C
Done
```

Why?

```text
Promise executor
→ synchronous

.then handler
→ microtask
```

---

# 10. `resolve()` 🔥🔥🔥

`resolve()` tells the Promise:

```text
operation succeeded
```

Example:

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve
    ) => {
      // Step 2:
      resolve(
        100
      );
    }
  );

// Step 3:
promise.then(
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

# 11. `reject()` 🔥🔥🔥

`reject()` tells the Promise:

```text
operation failed
```

Example:

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      reject(
        new Error(
          "Failed"
        )
      );
    }
  );

// Step 3:
promise.catch(
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

# 12. Promise Settles Only Once 🔥🔥🔥

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      resolve(
        "First"
      );

      // Step 3:
      resolve(
        "Second"
      );

      // Step 4:
      reject(
        new Error(
          "Error"
        )
      );
    }
  );

// Step 5:
promise.then(
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
First
```

Only the first settlement matters.

---

# 13. Resolve Then Reject

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      resolve(
        "Success"
      );

      // Step 3:
      reject(
        "Failure"
      );
    }
  );

// Step 4:
promise
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
Success
```

---

# 14. Reject Then Resolve 🔥🔥🔥

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      reject(
        "Failure"
      );

      // Step 3:
      resolve(
        "Success"
      );
    }
  );

// Step 4:
promise
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
Failure
```

---

# 15. `.then()` 🔥🔥🔥

`.then()` is used to handle fulfillment.

```js
// Step 1:
Promise.resolve(
  "Employee loaded"
)
  .then(
    (
      message
    ) => {
      console.log(
        message
      );
    }
  );
```

Output:

```text
Employee loaded
```

---

# 16. `.catch()` 🔥🔥🔥

`.catch()` handles rejection.

```js
// Step 1:
Promise.reject(
  new Error(
    "Employee not found"
  )
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
Employee not found
```

---

# 17. `.finally()` 🔥🔥🔥

`.finally()` runs whether the Promise fulfills or rejects.

Success:

```js
// Step 1:
Promise.resolve(
  "Success"
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
  .finally(
    () => {
      console.log(
        "Cleanup"
      );
    }
  );
```

Output:

```text
Success
Cleanup
```

---

# 18. `.finally()` on Rejection

```js
// Step 1:
Promise.reject(
  new Error(
    "Failed"
  )
)
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  )
  .finally(
    () => {
      console.log(
        "Cleanup"
      );
    }
  );
```

Output:

```text
Failed
Cleanup
```

---

# 19. Why Use `.finally()`?

Common uses:

```text
hide loader
close spinner
release temporary resource
reset UI state
cleanup
```

Because it runs after either outcome.

---

# 20. Promise Handlers Run as Microtasks 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Promise"
      );
    }
  );

// Step 2:
console.log(
  "Sync"
);
```

Output:

```text
Sync
Promise
```

---

# 21. Promise vs Timer 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    console.log(
      "Timer"
    );
  },
  0
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

# 22. `.then()` Returns a New Promise 🔥🔥🔥

This is the foundation of chaining.

```js
// Step 1:
const first =
  Promise.resolve(
    10
  );

// Step 2:
const second =
  first.then(
    (
      value
    ) => {
      return (
        value * 2
      );
    }
  );

// Step 3:
second.then(
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

Important:

```text
first !== second
```

---

# 23. Confirm `.then()` Returns New Promise

```js
// Step 1:
const first =
  Promise.resolve(
    10
  );

// Step 2:
const second =
  first.then(
    (
      value
    ) => {
      return value;
    }
  );

// Step 3:
console.log(
  first === second
); // Output: false
```

Output:

```text
false
```

---

# 24. Promise Chaining 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
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
  )
  .then(
    (
      value
    ) => {
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
      );
    }
  );
```

Output:

```text
25
```

---

# 25. Chaining Mental Model

```text
Promise 1
↓
then returns value 20
↓
next Promise fulfills with 20
↓
then returns value 25
↓
next Promise fulfills with 25
```

---

# 26. Return Value Rule 🔥🔥🔥

If a `.then()` callback returns a normal value:

```text
return 100
```

then the Promise returned by `.then()` fulfills with:

```text
100
```

---

# 27. Return Value Example

```js
// Step 1:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 2:
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
      );
    }
  );
```

Output:

```text
15
```

---

# 28. No Return Means `undefined` 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 2:
      console.log(
        value
      );

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
10
undefined
```

This is a very common interview question.

---

# 29. Why Does Next `.then()` Receive `undefined`?

Because a JavaScript function without an explicit return gives:

```text
undefined
```

So:

```text
.then callback returns undefined
↓
next Promise fulfills with undefined
```

---

# 30. Returning Another Promise 🔥🔥🔥

If `.then()` returns a Promise:

```text
the chain waits for that Promise
```

Example:

```js
// Step 1:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 2:
      return Promise.resolve(
        value * 2
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
20
```

---

# 31. Promise Adoption Mental Model 🔥🔥🔥

```text
then callback
↓
returns Promise B
↓
outer chain waits for Promise B
↓
Promise B fulfills/rejects
↓
chain continues with same outcome
```

---

# 32. Return Delayed Promise Example

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
          resolve(
            value
          );
        },
        100
      );
    }
  );
}

// Step 3:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      return delayValue(
        value * 2
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

Output later:

```text
20
```

---

# 33. Forgetting to Return Promise 🔥🔥🔥

Wrong:

```js
function delayValue(
  value
) {
  // Step 1:
  return Promise.resolve(
    value
  );
}

// Step 2:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 3:
      delayValue(
        value * 2
      );

      // Promise not returned.
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
undefined
```

---

# 34. Correct: Return the Promise

```js
function delayValue(
  value
) {
  // Step 1:
  return Promise.resolve(
    value
  );
}

// Step 2:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 3:
      return delayValue(
        value * 2
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
20
```

---

# 35. Throwing Inside `.then()` 🔥🔥🔥

If a `.then()` handler throws:

```text
returned Promise becomes rejected
```

Example:

```js
// Step 1:
Promise.resolve(
  "Start"
)
  .then(
    () => {
      // Step 2:
      throw new Error(
        "Failed"
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
Failed
```

---

# 36. Throw = Rejection in Promise Chain 🔥🔥🔥

```text
throw error
inside promise handler
↓
returned Promise rejects
↓
nearest rejection handler catches it
```

---

# 37. Executor Throw Automatically Rejects 🔥🔥🔥

```js
// Step 1:
const promise =
  new Promise(
    () => {
      // Step 2:
      throw new Error(
        "Executor Failed"
      );
    }
  );

// Step 3:
promise.catch(
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
Executor Failed
```

---

# 38. Error Propagation 🔥🔥🔥

If a Promise rejects and a `.then()` has no rejection handler:

```text
rejection flows down the chain
```

until a suitable `.catch()` handles it.

---

# 39. Error Propagation Example

```js
// Step 1:
Promise.reject(
  new Error(
    "API Failed"
  )
)
  .then(
    () => {
      console.log(
        "Step 1"
      );
    }
  )
  .then(
    () => {
      console.log(
        "Step 2"
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
API Failed
```

The fulfillment handlers are skipped.

---

# 40. Error in Middle of Chain 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
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
  )
  .then(
    () => {
      // Step 2:
      throw new Error(
        "Middle Failed"
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
Middle Failed
```

---

# 41. `.catch()` Can Recover 🔥🔥🔥

If `.catch()` returns a normal value:

```text
chain becomes fulfilled again
```

Example:

```js
// Step 1:
Promise.reject(
  new Error(
    "Failed"
  )
)
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );

      // Step 2:
      return 100;
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
Failed
100
```

---

# 42. Catch Recovery Mental Model

```text
Rejected
↓
catch handles error
↓
catch returns 100
↓
new Promise fulfills with 100
↓
next then runs
```

---

# 43. `.catch()` Can Re-throw 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  new Error(
    "Original"
  )
)
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );

      // Step 2:
      throw new Error(
        "New Error"
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
Original
New Error
```

---

# 44. `.catch()` Is Similar to Rejection Handler in `.then()` 🔥🔥

Conceptually:

```text
promise.catch(onRejected)
```

is similar to:

```text
promise.then(undefined, onRejected)
```

For readability:

```text
.catch()
```

is usually preferred for end-of-chain error handling.

---

# 45. `.then()` Can Take Two Handlers — Awareness

Syntax:

```text
promise.then(
  onFulfilled,
  onRejected
)
```

Example:

```js
// Step 1:
Promise.reject(
  "Failed"
)
  .then(
    (
      value
    ) => {
      console.log(
        value
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
Failed
```

---

# 46. Why `.catch()` Is Often Cleaner

This:

```text
.then(success)
.catch(error)
```

usually makes:

```text
success path
+
error path
```

easier to read and lets `.catch()` handle errors thrown by earlier fulfillment handlers too.

---

# 47. Important Difference: `.then(success, error)` vs `.then(success).catch(error)` 🔥🔥🔥

If the `success` handler itself throws:

```text
.then(success, error)
```

the error handler in that same `.then()` does not handle the error thrown by `success`.

But:

```text
.then(success)
.catch(error)
```

can handle it downstream.

---

# 48. Example of Downstream Catch

```js
// Step 1:
Promise.resolve(
  "Success"
)
  .then(
    (
      value
    ) => {
      console.log(
        value
      );

      // Step 2:
      throw new Error(
        "Handler Failed"
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
Success
Handler Failed
```

---

# 49. `.finally()` Does Not Normally Replace the Value 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  100
)
  .finally(
    () => {
      // Step 2:
      return 999;
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
100
```

A normal return from `finally()` does not replace the original fulfillment value.

---

# 50. `.finally()` Preserves Rejection Too

```js
// Step 1:
Promise.reject(
  new Error(
    "Failed"
  )
)
  .finally(
    () => {
      console.log(
        "Cleanup"
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
Cleanup
Failed
```

---

# 51. But `finally()` Can Change Outcome If It Throws 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  "Success"
)
  .finally(
    () => {
      // Step 2:
      throw new Error(
        "Cleanup Failed"
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

# 52. Multiple `.then()` on Same Promise 🔥🔥🔥

```js
// Step 1:
const promise =
  Promise.resolve(
    10
  );

// Step 2:
promise.then(
  (
    value
  ) => {
    console.log(
      value + 1
    );
  }
);

// Step 3:
promise.then(
  (
    value
  ) => {
    console.log(
      value + 2
    );
  }
);
```

Output:

```text
11
12
```

Both handlers receive the original fulfilled value `10`.

---

# 53. Multiple Handlers Are Not a Chain

This:

```text
promise.then(A)
promise.then(B)
```

means:

```text
two handlers attached to same Promise
```

It is different from:

```text
promise
  .then(A)
  .then(B)
```

which creates a chain.

---

# 54. Multiple Handlers vs Chain 🔥🔥🔥

Same Promise:

```js
// Step 1:
const promise =
  Promise.resolve(
    10
  );

// Step 2:
promise.then(
  (
    value
  ) => {
    return (
      value * 2
    );
  }
);

// Step 3:
promise.then(
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
10
```

The second handler is attached to the original Promise.

---

# 55. Chained Version

```js
// Step 1:
Promise.resolve(
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
20
```

---

# 56. `Promise.resolve()` 🔥🔥🔥

`Promise.resolve(value)` creates/returns a fulfilled Promise for that value.

```js
// Step 1:
Promise.resolve(
  50
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
50
```

---

# 57. `Promise.reject()` 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  new Error(
    "Rejected"
  )
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
Rejected
```

---

# 58. `Promise.resolve()` With Existing Promise 🔥🔥

If you pass an actual Promise:

```js
// Step 1:
const first =
  Promise.resolve(
    100
  );

// Step 2:
const second =
  Promise.resolve(
    first
  );

// Step 3:
console.log(
  first === second
); // Output: true
```

Output:

```text
true
```

For a native Promise of the same constructor, `Promise.resolve()` can return it directly.

---

# 59. Resolving With Another Promise 🔥🔥🔥

```js
// Step 1:
const inner =
  Promise.resolve(
    100
  );

// Step 2:
const outer =
  new Promise(
    (
      resolve
    ) => {
      // Step 3:
      resolve(
        inner
      );
    }
  );

// Step 4:
outer.then(
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

The outer Promise adopts the inner Promise's eventual state.

---

# 60. Promise Resolution Is More Than "Set Value" 🔥🔥🔥

When you do:

```text
resolve(otherPromise)
```

the Promise may:

```text
adopt the state
of otherPromise
```

rather than immediately fulfill with the Promise object itself.

---

# 61. Async Timer-Based Promise 🔥🔥🔥

```js
function getEmployee() {
  // Step 1:
  return new Promise(
    (
      resolve
    ) => {
      // Step 2:
      setTimeout(
        () => {
          resolve(
            {
              id: 1,
              name: "Rahul",
            }
          );
        },
        100
      );
    }
  );
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

Output later:

```text
Rahul
```

---

# 62. Promise Failure Example

```js
function getEmployee() {
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
              "Employee not found"
            )
          );
        },
        100
      );
    }
  );
}

// Step 3:
getEmployee()
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

Output later:

```text
Employee not found
```

---

# 63. Real App Pattern — Loading Employee 🔥🔥🔥

```js
function fetchEmployee() {
  // Step 1:
  return Promise.resolve(
    {
      id: 1,
      name: "Rahul",
    }
  );
}

// Step 2:
console.log(
  "Loading"
);

// Step 3:
fetchEmployee()
  .then(
    (
      employee
    ) => {
      console.log(
        employee.name
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
  )
  .finally(
    () => {
      console.log(
        "Finished"
      );
    }
  );

// Step 4:
console.log(
  "Request Started"
);
```

Output:

```text
Loading
Request Started
Rahul
Finished
```

---

# 64. Callback Version vs Promise Version 🔥🔥🔥

Callback style:

```text
getUser(callback)
↓
callback receives result
```

Promise style:

```text
getUser()
↓
returns Promise
↓
.then receives result
```

Promises make async values composable.

---

# 65. Convert Callback API to Promise 🔥🔥🔥

Callback API:

```js
function getEmployeeCallback(
  callback
) {
  // Step 1:
  setTimeout(
    () => {
      callback(
        null,
        {
          id: 1,
          name: "Rahul",
        }
      );
    },
    100
  );
}
```

Promise wrapper:

```js
function getEmployeePromise() {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      getEmployeeCallback(
        (
          error,
          employee
        ) => {
          if (
            error
          ) {
            reject(
              error
            );

            return;
          }

          // Step 3:
          resolve(
            employee
          );
        }
      );
    }
  );
}

// Step 4:
getEmployeePromise()
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

Output later:

```text
Rahul
```

---

# 66. Promise Chaining Avoids Deep Nesting 🔥🔥🔥

Instead of:

```text
getUser(callback)
  getOrders(callback)
    getDetails(callback)
```

Promises allow:

```text
getUser()
.then(getOrders)
.then(getDetails)
.catch(handleError)
```

Cleaner control flow.

---

# 67. Dependent Promise Chain Example 🔥🔥🔥

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
  user
) {
  // Step 2:
  return Promise.resolve(
    [
      {
        id: 101,
        userId:
          user.id,
      },
    ]
  );
}

function getDetails(
  orders
) {
  // Step 3:
  return Promise.resolve(
    {
      orderId:
        orders[0].id,
      amount: 500,
    }
  );
}

// Step 4:
getUser()
  .then(
    getOrders
  )
  .then(
    getDetails
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

Output:

```text
500
```

---

# 68. Why Returning Matters in Dependent Chains 🔥🔥🔥

Each step should usually:

```text
return value
or
return Promise
```

so the next `.then()` receives the correct result.

---

# 69. Bad Nested Promise Pattern

Promises can still be nested badly.

```js
// Step 1:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 2:
      Promise.resolve(
        value * 2
      )
        .then(
          (
            result
          ) => {
            console.log(
              result
            );
          }
        );
    }
  );
```

Output:

```text
20
```

But this loses the benefit of chaining.

---

# 70. Better Flattened Promise Chain 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 2:
      return Promise.resolve(
        value * 2
      );
    }
  )
  .then(
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
20
```

---

# 71. Promise Handlers Always Run Later 🔥🔥🔥

Even this:

```js
// Step 1:
const promise =
  Promise.resolve(
    "Done"
  );

// Step 2:
promise.then(
  (
    value
  ) => {
    console.log(
      value
    );
  }
);

// Step 3:
console.log(
  "After"
);
```

Output:

```text
After
Done
```

Fulfilled already does not mean handler runs synchronously.

---

# 72. Promise Handler Ordering

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "P1"
      );
    }
  );

// Step 2:
Promise.resolve()
  .then(
    () => {
      console.log(
        "P2"
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
P1
P2
```

---

# 73. Promise Chain Scheduling 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "A"
      );
    }
  )
  .then(
    () => {
      console.log(
        "B"
      );
    }
  );

// Step 2:
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

---

# 74. Why `A C B`? 🔥🔥🔥

Initial microtasks:

```text
A handler
C handler
```

Run A:

```text
prints A
↓
settles next promise
↓
queues B
```

Queue becomes:

```text
C
B
```

Therefore:

```text
A
C
B
```

---

# 75. Returning a Value Adds Next Chain Step Later

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

Each handler runs in its own Promise reaction job/microtask.

---

# 76. Promise Executor + Timer + Then 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
const promise =
  new Promise(
    (
      resolve
    ) => {
      console.log(
        "B"
      );

      // Step 3:
      setTimeout(
        () => {
          console.log(
            "C"
          );

          resolve(
            "D"
          );
        },
        0
      );
    }
  );

// Step 4:
promise.then(
  (
    value
  ) => {
    console.log(
      value
    );
  }
);

// Step 5:
console.log(
  "E"
);
```

Output:

```text
A
B
E
C
D
```

---

# 77. Why Does `D` Run After `C`?

Inside timer task:

```text
print C
↓
resolve promise
↓
.then handler queued as microtask
↓
timer callback finishes
↓
microtask runs
↓
print D
```

---

# 78. Promise Resolution Does Not Stop Executor 🔥🔥🔥

```js
// Step 1:
new Promise(
  (
    resolve
  ) => {
    // Step 2:
    resolve(
      "Done"
    );

    // Step 3:
    console.log(
      "After Resolve"
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
After Resolve
Done
```

`resolve()` settles the Promise but does not `return` from the executor automatically.

---

# 79. Same for `reject()`

```js
// Step 1:
new Promise(
  (
    resolve,
    reject
  ) => {
    // Step 2:
    reject(
      "Failed"
    );

    // Step 3:
    console.log(
      "After Reject"
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
After Reject
Failed
```

---

# 80. Use `return` After Resolve/Reject When Needed 🔥🔥

For control flow clarity:

```js
function createPromise(
  success
) {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      if (
        success
      ) {
        // Step 2:
        resolve(
          "Success"
        );

        return;
      }

      // Step 3:
      reject(
        "Failed"
      );
    }
  );
}
```

`return` is for stopping executor logic, not for making settlement stronger.

---

# 81. Promise Rejection Reason Can Be Any Value

Technically:

```js
// Step 1:
Promise.reject(
  "Failed"
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

But in real code, prefer:

```text
Error objects
```

because they contain useful error information such as stack traces.

---

# 82. Prefer `Error` Objects 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  new Error(
    "Employee not found"
  )
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
Employee not found
```

---

# 83. Common Promise Bug — Forgetting `return` 🔥🔥🔥

```js
function getValue() {
  // Step 1:
  Promise.resolve(
    100
  );

  // No return.
}

// Step 2:
console.log(
  getValue()
); // Output: undefined
```

Output:

```text
undefined
```

Correct:

```js
function getValue() {
  // Step 1:
  return Promise.resolve(
    100
  );
}

// Step 2:
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

# 84. Common Promise Bug — Forgetting Chain Return

Wrong:

```js
// Step 1:
Promise.resolve(
  10
)
  .then(
    (
      value
    ) => {
      // Step 2:
      Promise.resolve(
        value * 2
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
undefined
```

---

# 85. Common Promise Bug — Swallowing Error 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  new Error(
    "Failed"
  )
)
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );

      // Step 2:
      // No throw and no rejected Promise returned.
    }
  )
  .then(
    () => {
      console.log(
        "Continued"
      );
    }
  );
```

Output:

```text
Failed
Continued
```

Because `.catch()` handled the rejection and returned `undefined`.

---

# 86. Re-throw If Failure Should Continue 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  new Error(
    "Failed"
  )
)
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );

      // Step 2:
      throw error;
    }
  )
  .catch(
    (
      error
    ) => {
      console.log(
        `Final: ${error.message}`
      );
    }
  );
```

Output:

```text
Failed
Final: Failed
```

---

# 87. Common Promise Bug — Creating Unnecessary Promise

If an API already returns a Promise, avoid wrapping it for no reason.

Instead of:

```text
new Promise(resolve => {
  existingPromise.then(resolve)
})
```

usually return:

```text
existingPromise
```

This keeps code simpler.

---

# 88. Promise Constructor Is for Bridging Callback-Based Work 🔥🔥

Good use:

```text
callback API
↓
new Promise(...)
↓
resolve/reject from callback
```

Not every Promise-returning function needs `new Promise()`.

---

# 89. Promise vs Callback — One-Time Settlement 🔥🔥🔥

Callback:

```text
can be called zero times
one time
many times
```

Promise:

```text
settles once
```

That is one important reliability difference.

---

# 90. Promise Does Not Mean Work Is Automatically Async 🔥🔥🔥

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve
    ) => {
      // Step 2:
      console.log(
        "Executor"
      );

      // Step 3:
      resolve();
    }
  );

// Step 4:
console.log(
  "After"
);
```

Output:

```text
Executor
After
```

The executor is synchronous.

---

# 91. Real Employee Transformation Chain 🔥🔥🔥

```js
function getEmployees() {
  // Step 1:
  return Promise.resolve(
    [
      {
        id: 1,
        name: "Rahul",
        active: true,
      },
      {
        id: 2,
        name: "Amit",
        active: false,
      },
      {
        id: 3,
        name: "Priya",
        active: true,
      },
    ]
  );
}

// Step 2:
getEmployees()
  .then(
    (
      employees
    ) => {
      // Step 3:
      return employees.filter(
        (
          employee
        ) => {
          return employee.active;
        }
      );
    }
  )
  .then(
    (
      activeEmployees
    ) => {
      // Step 4:
      return activeEmployees.map(
        (
          employee
        ) => {
          return employee.name;
        }
      );
    }
  )
  .then(
    (
      names
    ) => {
      console.log(
        names
      );
    }
  );
```

Output:

```text
["Rahul", "Priya"]
```

---

# 92. Real Validation + Save Chain 🔥🔥🔥

```js
function validateEmployee(
  employee
) {
  // Step 1:
  if (
    !employee.name
  ) {
    return Promise.reject(
      new Error(
        "Name required"
      )
    );
  }

  // Step 2:
  return Promise.resolve(
    employee
  );
}

function saveEmployee(
  employee
) {
  // Step 3:
  return Promise.resolve(
    {
      ...employee,
      saved: true,
    }
  );
}

// Step 4:
validateEmployee(
  {
    id: 1,
    name: "Rahul",
  }
)
  .then(
    saveEmployee
  )
  .then(
    (
      employee
    ) => {
      console.log(
        employee.saved
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
true
```

---

# 93. Validation Failure Flow

```js
function validateEmployee(
  employee
) {
  // Step 1:
  if (
    !employee.name
  ) {
    return Promise.reject(
      new Error(
        "Name required"
      )
    );
  }

  // Step 2:
  return Promise.resolve(
    employee
  );
}

// Step 3:
validateEmployee(
  {
    id: 1,
    name: "",
  }
)
  .then(
    (
      employee
    ) => {
      console.log(
        employee
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
Name required
```

---

# 94. Interview Output 1 🔥🔥🔥

```js
// Step 1:
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

// Step 3:
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

# 95. Interview Output 2 — Executor 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
new Promise(
  (
    resolve
  ) => {
    console.log(
      "B"
    );

    resolve();
  }
)
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );

// Step 3:
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

# 96. Interview Output 3 — Chain Return

```js
// Step 1:
Promise.resolve(
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

Expected output:

```text
20
```

---

# 97. Interview Output 4 — Missing Return 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  10
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
10
undefined
```

---

# 98. Interview Output 5 — Catch Recovery 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  "Error"
)
  .catch(
    (
      error
    ) => {
      console.log(
        error
      );

      // Step 2:
      return "Recovered";
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

Expected output:

```text
Error
Recovered
```

---

# 99. Interview Output 6 — Error Propagation

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      throw new Error(
        "Failed"
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

Expected output:

```text
Failed
```

---

# 100. Interview Output 7 — Multiple `.then()` 🔥🔥🔥

```js
// Step 1:
const promise =
  Promise.resolve(
    5
  );

// Step 2:
promise.then(
  (
    value
  ) => {
    console.log(
      value * 2
    );
  }
);

// Step 3:
promise.then(
  (
    value
  ) => {
    console.log(
      value * 3
    );
  }
);
```

Expected output:

```text
10
15
```

---

# 101. Interview Output 8 — Promise Scheduling 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "A"
      );
    }
  )
  .then(
    () => {
      console.log(
        "B"
      );
    }
  );

// Step 2:
Promise.resolve()
  .then(
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

# 102. Interview Output 9 — Resolve Does Not Stop Executor

```js
// Step 1:
new Promise(
  (
    resolve
  ) => {
    // Step 2:
    resolve(
      "Done"
    );

    // Step 3:
    console.log(
      "After"
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

Expected output:

```text
After
Done
```

---

# 103. Interview Output 10 — `finally()` 🔥🔥🔥

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

      // Step 2:
      return 100;
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

Expected output:

```text
Cleanup
10
```

---

# 104. Interview Question — What Is a Promise? 🔥🔥🔥

Good answer:

```text
A Promise is an object
representing the eventual completion
or failure of an asynchronous operation
and its resulting value.
```

---

# 105. Interview Question — Promise States

Good answer:

```text
Pending
→ not settled yet

Fulfilled
→ completed successfully

Rejected
→ completed with failure
```

---

# 106. Interview Question — Can Promise State Change Multiple Times? 🔥🔥🔥

Good answer:

```text
No.

A Promise settles only once.

After fulfillment or rejection,
later resolve/reject calls
do not change its state.
```

---

# 107. Interview Question — Is Promise Executor Async?

Good answer:

```text
No.

The executor passed to new Promise()
runs synchronously.

Promise reaction handlers such as
then/catch/finally
run asynchronously as microtasks.
```

---

# 108. Interview Question — What Does `.then()` Return? 🔥🔥🔥

Good answer:

```text
.then() always returns a new Promise.

The state/value of that Promise
depends on what the handler returns
or throws.
```

---

# 109. Interview Question — Promise Return Rules 🔥🔥🔥

Memorize:

```text
return normal value
→ next Promise fulfills with value

return Promise
→ chain waits for it

return nothing
→ next Promise fulfills with undefined

throw error
→ next Promise rejects
```

---

# 110. Interview Question — What Does `.catch()` Do?

Good answer:

```text
.catch() handles Promise rejection.

It can also recover the chain
by returning a normal value.

If it throws again,
the chain remains rejected.
```

---

# 111. Interview Question — What Does `.finally()` Do? 🔥🔥🔥

Good answer:

```text
.finally() runs after fulfillment or rejection.

It is commonly used for cleanup.

A normal return from finally
does not replace the original value/reason,
but throwing or returning a rejected Promise
can change the final outcome.
```

---

# 112. Interview Question — Why Are Promises Better Than Callback Hell?

Good answer:

```text
Promises provide structured chaining,
centralized error propagation,
one-time settlement,
and easier composition
for dependent asynchronous operations.
```

---

# 113. Promise Debugging Checklist 🔥🔥🔥

When Promise code is wrong, check:

```text
Did the function actually return the Promise?

Did I return from inside .then()?

Did I accidentally nest instead of chain?

Did I swallow an error in catch?

Did I throw inside a handler?

Am I expecting .then() to run synchronously?

Did I confuse executor timing with handler timing?

Am I attaching multiple handlers
to the same Promise
instead of chaining?

Did I create an unnecessary new Promise?

Did I handle rejection?
```

---

# 114. Promise Decision Guide 🔥🔥🔥

```text
Need represent one future result?
→ Promise

Success?
→ resolve(value)

Failure?
→ reject(error)

Handle success?
→ then()

Handle failure?
→ catch()

Cleanup regardless of outcome?
→ finally()

Need next step to receive transformed value?
→ return value

Need next step to wait for async work?
→ return Promise

Need propagate error?
→ throw or return rejected Promise

Need recover?
→ catch and return normal value
```

---

# 115. Final Master Trace 🔥🔥🔥

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
const promise =
  new Promise(
    (
      resolve
    ) => {
      console.log(
        "Executor"
      );

      // Step 3:
      setTimeout(
        () => {
          console.log(
            "Timer"
          );

          resolve(
            10
          );
        },
        0
      );
    }
  );

// Step 4:
promise
  .then(
    (
      value
    ) => {
      console.log(
        value
      );

      // Step 5:
      return (
        value * 2
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

      // Step 6:
      throw new Error(
        "Chain Failed"
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

      // Step 7:
      return 100;
    }
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

// Step 8:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Outer Microtask"
      );
    }
  );

// Step 9:
console.log(
  "End"
);
```

Output:

```text
Start
Executor
End
Outer Microtask
Timer
10
20
Chain Failed
Cleanup
100
```

Complete trace:

```text
Synchronous:
Start
Executor
timer registered
Outer Microtask queued
End

Microtasks:
Outer Microtask

Next task:
Timer
↓
resolve promise with 10

Timer task ends
↓
promise .then microtask

First then:
10
return 20

Next microtask:
20
throw Chain Failed

Next rejection handler:
Chain Failed
return 100

finally:
Cleanup
preserve 100

final then:
100
```

---

# Quick Memory 🧠🔥🔥🔥

## Promise

```text
future result
```

## States

```text
Pending
Fulfilled
Rejected
```

## Settlement

```text
only once
```

## `resolve(value)`

```text
success
```

## `reject(error)`

```text
failure
```

## Executor

```text
synchronous
```

## `.then()`

```text
fulfillment handler
returns new Promise
```

## `.catch()`

```text
rejection handler
```

## `.finally()`

```text
cleanup regardless of outcome
```

## Promise Handler Timing

```text
microtask
```

## Return Normal Value

```text
next Promise
fulfills with that value
```

## Return Promise

```text
chain waits
```

## Return Nothing

```text
undefined
```

## Throw Error

```text
next Promise rejects
```

## Catch Returns Value

```text
chain recovers
```

## Catch Throws

```text
chain stays rejected
```

## Multiple `.then()` on Same Promise

```text
same original value
```

## Chained `.then()`

```text
next receives previous return
```

## `Promise.resolve()`

```text
create/adopt fulfilled resolution
```

## `Promise.reject()`

```text
create rejected Promise
```

## Most Important Return Rules

```text
return value
→ fulfill

return Promise
→ wait

no return
→ undefined

throw
→ reject
```

## Most Important Scheduling Rule

```text
Sync
↓
Promise microtasks
↓
Timer tasks
```

## Best Promise Interview Answer

```text
A Promise represents one eventual result.

It starts pending
and settles once as fulfilled or rejected.

The Promise executor runs synchronously,
while then/catch/finally handlers
run as microtasks.

Every then/catch returns a new Promise,
which enables chaining.

What a handler returns determines
the next Promise:
normal value fulfills,
returned Promise is adopted,
no return gives undefined,
and throw creates rejection.
```

---

# ✅ 8.4 Promises Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
8.2 Timers ✅
8.3 Callbacks ✅
8.4 Promises ✅
```

Next topic:

```text
8.5 Async / Await 🔥🔥🔥
├── async
├── await
├── Return Behaviour
├── Error Handling
├── Sequential Execution
├── Parallel Execution
├── Loops With await
├── Performance
├── Promise Relationship
└── Output Questions
```

**Next: 8.5 Async / Await 🔥🔥🔥**
