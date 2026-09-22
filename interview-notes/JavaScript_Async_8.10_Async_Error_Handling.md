# 8.10 Async Error Handling 🔥🔥🔥

Async error handling means:

```text
how errors move
through Promises
async / await
fetch flows
and asynchronous callbacks
```

The main goal is not only:

```text
"catch the error"
```

The real goal is:

```text
catch it
at the correct layer

recover when possible

add useful context

avoid swallowing errors

avoid duplicate handling

clean up resources

and keep the app state correct
```

Master mental model:

```text
Promise rejects
↓
catch()
or
await throws into try/catch
↓
handle / recover / rethrow
↓
caller may continue handling
```

Most important rules:

```text
throw inside async function
→ returned Promise rejects

await rejected Promise
→ behaves like throw

catch that returns a value
→ recovers

catch that throws again
→ rejection continues

finally
→ cleanup

unhandled rejection
→ nobody handled the rejected Promise
```

This chapter covers:

```text
Promise Rejection
throw
catch()
try / catch
finally
Error Propagation
Rethrowing
Recovery
Rejected Promises
Unhandled Rejection
Async Callback Errors
fetch Errors
HTTP Errors
Network Errors
Promise.all Errors
Promise.allSettled Errors
Sequential Loop Errors
Concurrent Errors
Per-Item Errors
Custom Errors
Error Cause Awareness
Cleanup
Logging
UI Error Mapping
Retry Awareness
Debugging
Interview Questions
Output Questions
Machine-Coding Error Strategy
```

---

# 1. What Is an Async Error? 🔥🔥🔥

In Promise-based code, an error usually appears as:

```text
Promise rejection
```

Example:

```js
// Step 1:
const promise =
  Promise.reject(
    new Error(
      "Failed"
    )
  );
```

That Promise is now:

```text
rejected
```

---

# 2. Promise Rejection Mental Model

```text
Promise
↓
pending

something fails
↓
reject(error)

Promise
↓
rejected
```

A rejection stays rejected until something handles it.

---

# 3. `catch()` Handles Promise Rejection 🔥🔥🔥

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
      // Step 2:
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

# 4. `throw` Inside `.then()` Creates Rejection 🔥🔥🔥

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
      throw new Error(
        `Failed at ${value}`
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 3:
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Failed at 10
```

Mental model:

```text
throw inside Promise handler
↓
returned Promise rejects
↓
next catch handles it
```

---

# 5. Throw Inside Async Function 🔥🔥🔥

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

Important:

```text
async function throws
→ returned Promise rejects
```

---

# 6. `await` Rejected Promise Behaves Like Throw 🔥🔥🔥

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

Mental model:

```text
await rejectedPromise
↓
throw rejection reason
inside async function
```

---

# 7. `try/catch` With Async/Await 🔥🔥🔥

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

# 8. Rejection Skips Remaining `try` Code

```js
async function run() {
  try {
    // Step 1:
    console.log(
      "A"
    );

    // Step 2:
    await Promise.reject(
      new Error(
        "Failed"
      )
    );

    // Step 3:
    console.log(
      "B"
    );
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.message
    );
  }
}

// Step 5:
run();
```

Output:

```text
A
Failed
```

`B` never runs.

---

# 9. Error Propagation 🔥🔥🔥

If an error is not handled locally:

```text
it propagates to caller
```

Example:

```js
async function getEmployee() {
  // Step 1:
  throw new Error(
    "Employee load failed"
  );
}

async function loadScreen() {
  // Step 2:
  await getEmployee();
}

// Step 3:
loadScreen()
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
Employee load failed
```

---

# 10. Error Propagation Chain

```text
getEmployee()
↓
rejects

loadScreen()
awaits it
↓
loadScreen also rejects

caller catches
```

---

# 11. Catch Can Recover 🔥🔥🔥

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
    return 100;
  }
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
100
```

Important:

```text
catch returns normal value
→ Promise becomes fulfilled
```

---

# 12. Catch in Promise Chain Can Recover

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
      // Step 2:
      return 100;
    }
  )
  .then(
    (
      value
    ) => {
      // Step 3:
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

# 13. Catch That Throws Again 🔥🔥🔥

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
      // Step 2:
      throw new Error(
        "Wrapped"
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 3:
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Wrapped
```

---

# 14. Rethrow Same Error

```js
async function loadData() {
  try {
    // Step 1:
    await getEmployee();
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      "Logging locally"
    );

    // Step 3:
    throw error;
  }
}
```

This means:

```text
log here
but caller still owns final handling
```

---

# 15. Do Not Swallow Errors Accidentally 🔥🔥🔥

Problem:

```js
async function loadData() {
  try {
    // Step 1:
    await getEmployee();
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );

    // No rethrow.
  }
}
```

Caller sees:

```text
fulfilled Promise with undefined
```

because the error was handled and swallowed.

---

# 16. Swallowed Error Example

```js
async function run() {
  try {
    // Step 1:
    throw new Error(
      "Failed"
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
undefined
```

---

# 17. When Swallowing Is Okay

Sometimes it is intentional.

Example:

```text
optional analytics failed
↓
ignore safely
↓
main user flow continues
```

But make that decision intentionally.

---

# 18. `finally` 🔥🔥🔥

`finally` runs after:

```text
success
or
failure
```

Example:

```js
async function run() {
  try {
    // Step 1:
    console.log(
      "Work"
    );
  } finally {
    // Step 2:
    console.log(
      "Cleanup"
    );
  }
}

// Step 3:
run();
```

Output:

```text
Work
Cleanup
```

---

# 19. `finally` With Error

```js
async function run() {
  try {
    // Step 1:
    throw new Error(
      "Failed"
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      error.message
    );
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
Failed
Cleanup
```

---

# 20. Best Use of `finally` 🔥🔥🔥

Use `finally` for cleanup:

```text
loading = false
clear timer
close connection
release lock
remove temporary state
```

Avoid business logic there.

---

# 21. UI Loading With `finally` 🔥🔥🔥

```js
async function loadEmployees() {
  // Step 1:
  let loading =
    true;

  try {
    // Step 2:
    return await getEmployees();
  } finally {
    // Step 3:
    loading =
      false;

    // Step 4:
    console.log(
      loading
    ); // Output: false
  }
}
```

---

# 22. `finally` Does Not Normally Replace Result

```js
async function run() {
  try {
    // Step 1:
    return 100;
  } finally {
    // Step 2:
    console.log(
      "Cleanup"
    );
  }
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
Cleanup
100
```

---

# 23. But `return` in `finally` Can Override 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    return 100;
  } finally {
    // Step 2:
    return 200;
  }
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
200
```

This is why:

```text
avoid return in finally
```

---

# 24. Throw in `finally` Can Override Too 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    return 100;
  } finally {
    // Step 2:
    throw new Error(
      "Cleanup failed"
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
Cleanup failed
```

---

# 25. Promise `.finally()` 🔥🔥🔥

```js
// Step 1:
Promise.resolve(
  100
)
  .finally(
    () => {
      // Step 2:
      console.log(
        "Cleanup"
      );
    }
  )
  .then(
    (
      value
    ) => {
      // Step 3:
      console.log(
        value
      );
    }
  );
```

Output:

```text
Cleanup
100
```

---

# 26. Promise `.finally()` Does Not Receive Main Value Normally

Use `finally` for cleanup, not transformation.

```text
then
→ transform success

catch
→ handle/recover error

finally
→ cleanup
```

---

# 27. Promise Chain Error Propagation 🔥🔥🔥

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
        value * 2
      );
    }
  )
  .then(
    (
      value
    ) => {
      // Step 3:
      throw new Error(
        `Failed at ${value}`
      );
    }
  )
  .then(
    () => {
      // Step 4:
      console.log(
        "Never"
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 5:
      console.log(
        error.message
      );
    }
  );
```

Output:

```text
Failed at 20
```

---

# 28. Why Intermediate `.then()` Is Skipped

Once chain becomes rejected:

```text
success handlers are skipped
```

until a rejection handler catches it.

Mental model:

```text
fulfilled
↓
fulfilled
↓
rejected
↓
skip success handlers
↓
catch
```

---

# 29. Catch Can Resume Success Chain 🔥🔥🔥

```js
// Step 1:
Promise.reject(
  "Failed"
)
  .catch(
    (
      error
    ) => {
      // Step 2:
      return 10;
    }
  )
  .then(
    (
      value
    ) => {
      // Step 3:
      console.log(
        value * 2
      );
    }
  );
```

Output:

```text
20
```

---

# 30. Returning Rejected Promise From `.then()`

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
      return Promise.reject(
        new Error(
          "Failed"
        )
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 3:
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

# 31. Throw vs `Promise.reject()` in Promise Handler

Inside Promise-based flow:

```text
throw new Error(...)
```

and:

```text
return Promise.reject(...)
```

both can produce rejection.

Usually `throw` is simpler inside async functions and handlers.

---

# 32. `try/catch` Does Not Catch Future Callback Errors 🔥🔥🔥

Common trap:

```js
try {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      throw new Error(
        "Async failure"
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

The outer catch will not catch that future timer error.

---

# 33. Why Outer `try/catch` Fails Here

Timeline:

```text
try block runs
↓
timer registered
↓
try/catch finishes

later
↓
timer callback runs on another turn
↓
error thrown

original catch is gone
```

---

# 34. Handle Error Inside Callback

```js
setTimeout(
  () => {
    try {
      // Step 1:
      throw new Error(
        "Async failure"
      );
    } catch (
      error
    ) {
      // Step 2:
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
Async failure
```

---

# 35. Promisify Async Callback Flow 🔥🔥🔥

Better modern pattern:

```js
function waitAndFail() {
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
              "Async failure"
            )
          );
        },
        0
      );
    }
  );
}
```

Then:

```js
async function run() {
  try {
    // Step 1:
    await waitAndFail();
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
Async failure
```

---

# 36. Unhandled Rejection 🔥🔥🔥

An unhandled rejection means:

```text
Promise rejected
and
no rejection handler handled it
```

Example:

```js
async function run() {
  // Step 1:
  throw new Error(
    "Unhandled"
  );
}

// Step 2:
run();
```

If nothing handles it, the runtime may report an unhandled rejection.

Exact reporting differs by environment.

---

# 37. Avoid Unhandled Rejection

Use:

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

# 38. Fire-and-Forget Risk 🔥🔥🔥

This:

```js
// Step 1:
saveAnalytics();
```

may return a Promise.

If you intentionally do not await it:

```text
you still need an error strategy
```

Example:

```js
// Step 1:
saveAnalytics()
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

---

# 39. `void` Awareness for Intentional Fire-and-Forget

In some codebases you may see:

```js
// Step 1:
void saveAnalytics();
```

This communicates:

```text
we intentionally ignore the returned value
```

But it does **not** automatically handle rejection.

So error handling may still be needed.

---

# 40. Fetch Error Handling 🔥🔥🔥

Fetch has two major error categories:

```text
1. Network/request failure
2. HTTP failure
```

Do not confuse them.

---

# 41. Network Error

```js
async function loadEmployees() {
  try {
    // Step 1:
    const response =
      await fetch(
        "/api/employees"
      );

    // Step 2:
    return response;
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      "Network/request failed"
    );

    throw error;
  }
}
```

---

# 42. HTTP Error Must Usually Be Checked Manually 🔥🔥🔥

```js
async function loadEmployees() {
  // Step 1:
  const response =
    await fetch(
      "/api/employees"
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

# 43. 404 Is Not Normally a Fetch Rejection

```text
404
→ fetch fulfills with Response
→ response.ok false
```

So this:

```text
try/catch
```

alone is not enough.

You still need:

```text
response.ok/status check
```

---

# 44. Custom HTTP Error 🔥🔥🔥

```js
class HttpError
  extends Error {
  constructor(
    message,
    status,
    data = null
  ) {
    // Step 1:
    super(
      message
    );

    // Step 2:
    this.name =
      "HttpError";

    // Step 3:
    this.status =
      status;

    // Step 4:
    this.data =
      data;
  }
}
```

---

# 45. Why Custom Error?

Now UI can do:

```text
error.status === 401
error.status === 403
error.status === 404
error.status >= 500
```

instead of parsing strings.

---

# 46. Request Helper With Custom Error 🔥🔥🔥

```js
async function requestJson(
  url
) {
  // Step 1:
  const response =
    await fetch(
      url
    );

  // Step 2:
  const data =
    await response.json();

  // Step 3:
  if (
    !response.ok
  ) {
    throw new HttpError(
      data?.message
      ??
      `HTTP ${response.status}`,
      response.status,
      data
    );
  }

  // Step 4:
  return data;
}
```

---

# 47. Error Mapping for UI 🔥🔥🔥

```js
function getErrorMessage(
  error
) {
  // Step 1:
  if (
    error.status
    ===
    401
  ) {
    return "Please sign in again.";
  }

  // Step 2:
  if (
    error.status
    ===
    403
  ) {
    return "You do not have permission.";
  }

  // Step 3:
  if (
    error.status
    ===
    404
  ) {
    return "Employee not found.";
  }

  // Step 4:
  if (
    error.status
    >=
    500
  ) {
    return "Server error. Please try again.";
  }

  // Step 5:
  return (
    error.message
    ??
    "Something went wrong."
  );
}
```

---

# 48. Error Handling by Layer 🔥🔥🔥

A good architecture:

```text
API layer
→ creates technical error

service layer
→ adds domain context

UI layer
→ shows user-friendly message
```

Avoid every layer showing toast/logging the same error.

---

# 49. Duplicate Error Handling Problem

Bad flow:

```text
API logs error
Service logs error
Component logs error
Global handler logs error
Toast shown twice
```

This creates noisy debugging.

Choose ownership clearly.

---

# 50. Add Context Then Rethrow 🔥🔥🔥

```js
async function loadEmployeeProfile(
  id
) {
  try {
    // Step 1:
    return await getEmployeeById(
      id
    );
  } catch (
    error
  ) {
    // Step 2:
    throw new Error(
      `Failed to load employee ${id}`,
      {
        cause:
          error,
      }
    );
  }
}
```

This preserves higher-level meaning.

`Error` cause support is modern JavaScript awareness.

---

# 51. Error Cause Awareness

Concept:

```text
high-level error
↓
cause
↓
original low-level error
```

Useful for debugging without exposing technical details to users.

---

# 52. Do Not Expose Sensitive Errors to UI 🔥🔥🔥

Server may return:

```text
database connection string
stack trace
internal path
SQL details
```

UI should show safe messages.

Logs can retain detailed technical context where appropriate.

---

# 53. Promise.all Error Handling 🔥🔥🔥

```js
async function loadDashboard() {
  try {
    // Step 1:
    const result =
      await Promise.all(
        [
          getEmployees(),
          getDepartments(),
          getPermissions(),
        ]
      );

    // Step 2:
    return result;
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

If any one rejects:

```text
Promise.all rejects
```

---

# 54. Promise.all Does Not Cancel Others

Even after one rejection:

```text
other started requests
may continue
```

Use cancellation separately if needed.

---

# 55. Promise.allSettled for Partial Failure 🔥🔥🔥

```js
async function loadWidgets() {
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
  return results;
}
```

No need for outer catch just because one input rejects.

---

# 56. Handle allSettled Results

```js
function mapSettledResult(
  result
) {
  // Step 1:
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

  // Step 2:
  return {
    success:
      false,
    error:
      result.reason,
  };
}
```

---

# 57. Sequential Loop Error Stops Loop 🔥🔥🔥

```js
async function processAll(
  items
) {
  // Step 1:
  for (
    const item
    of
    items
  ) {
    // Step 2:
    await processItem(
      item
    );
  }
}
```

If `processItem()` rejects:

```text
loop stops
unless caught
```

---

# 58. Per-Item Error Handling 🔥🔥🔥

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
        await processItem(
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

# 59. When One Failure Should Stop Everything

Use:

```text
outer try/catch
```

and let rejection propagate.

---

# 60. When One Failure Should Not Stop Others

Use:

```text
per-item try/catch
```

or:

```text
Promise.allSettled()
```

depending on sequential vs concurrent needs.

---

# 61. Error Handling With `forEach(async)` Is Dangerous 🔥🔥🔥

```js
async function run(
  items
) {
  try {
    // Step 1:
    items.forEach(
      async (
        item
      ) => {
        // Step 2:
        await processItem(
          item
        );
      }
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      "May not catch callback rejection"
    );
  }
}
```

Why?

Because `forEach()` does not await returned Promises.

---

# 62. Better Sequential Version

```js
async function run(
  items
) {
  try {
    // Step 1:
    for (
      const item
      of
      items
    ) {
      // Step 2:
      await processItem(
        item
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
```

---

# 63. Better Concurrent Version 🔥🔥🔥

```js
async function run(
  items
) {
  try {
    // Step 1:
    await Promise.all(
      items.map(
        processItem
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
```

---

# 64. Retry Awareness 🔥🔥🔥

Some errors may be temporary:

```text
network interruption
502
503
temporary timeout
```

Possible retry.

Some errors should usually not be retried blindly:

```text
400
401
403
validation errors
```

---

# 65. Retry Must Consider Operation Semantics

GET:

```text
often safe to retry
```

POST:

```text
may create duplicate resource
```

unless API supports idempotency.

---

# 66. Simple Retry Awareness

```js
async function retryOnce(
  operation
) {
  try {
    // Step 1:
    return await operation();
  } catch (
    firstError
  ) {
    // Step 2:
    return await operation();
  }
}
```

This is only a simple concept.

Full retry strategy comes later.

---

# 67. Why Blind Retry Is Bad 🔥🔥🔥

Could cause:

```text
duplicate order
duplicate payment
duplicate employee
extra load
repeated auth failures
```

Retry must be deliberate.

---

# 68. Abort Is Not Always an Error to Show 🔥🔥🔥

If user starts a new search:

```text
old request aborted intentionally
```

That should usually not show:

```text
"Something went wrong"
```

Treat expected cancellation separately.

---

# 69. Abort Error Handling

```js
async function run(
  signal
) {
  try {
    // Step 1:
    return await fetch(
      "/api/employees",
      {
        signal,
      }
    );
  } catch (
    error
  ) {
    // Step 2:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 3:
    throw error;
  }
}
```

---

# 70. Expected vs Unexpected Errors 🔥🔥🔥

Expected:

```text
404 employee not found
validation error
user cancellation
```

Unexpected:

```text
broken invariant
unexpected null
server crash
programming bug
```

Handle them differently.

---

# 71. Validation Error Is Not Always Exception-Level Failure

Example form:

```text
Name is required
```

That can be normal validation state, not necessarily a system crash.

---

# 72. Error Object Properties

Common:

```text
error.name
error.message
error.stack
```

Custom errors may add:

```text
status
code
data
cause
```

---

# 73. Use Error Objects Instead of Raw Strings 🔥🔥🔥

Prefer:

```js
// Step 1:
throw new Error(
  "Failed"
);
```

over:

```js
// Step 1:
throw "Failed";
```

Why?

Error objects provide:

```text
name
message
stack
better debugging
```

---

# 74. Error Code Awareness

Sometimes use stable codes:

```js
class AppError
  extends Error {
  constructor(
    message,
    code
  ) {
    // Step 1:
    super(
      message
    );

    // Step 2:
    this.code =
      code;
  }
}
```

Then:

```text
EMPLOYEE_NOT_FOUND
SESSION_EXPIRED
NETWORK_FAILURE
```

can be easier than parsing messages.

---

# 75. Logging Strategy 🔥🔥🔥

Good logging answers:

```text
what failed?
where?
which operation?
which request ID?
which relevant non-sensitive context?
```

Do not log:

```text
passwords
tokens
private secrets
sensitive personal data
```

---

# 76. User Message vs Developer Log

User:

```text
Unable to load employees.
Please try again.
```

Developer log:

```text
GET /employees failed
status 503
requestId xyz
```

Different audiences.

---

# 77. Error Boundary Awareness

In React:

```text
Error Boundaries
```

handle rendering errors in component trees.

They do not replace Promise/API error handling.

Async request errors still need their own handling.

---

# 78. Global Error Handler Awareness 🔥🔥

Applications may have:

```text
global logging
unhandled rejection reporting
monitoring tools
```

But local recovery still belongs near the operation that understands the context.

---

# 79. Output Question 1 🔥🔥🔥

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
      throw new Error(
        "Failed"
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 3:
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

# 80. Output Question 2 — Recovery 🔥🔥🔥

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
      // Step 3:
      console.log(
        value
      );
    }
  );
```

Expected output:

```text
B
```

---

# 81. Output Question 3 — Async Throw 🔥🔥🔥

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

Expected output:

```text
Boom
```

---

# 82. Output Question 4 — Catch Recovery

```js
async function run() {
  try {
    // Step 1:
    throw new Error(
      "Failed"
    );
  } catch (
    error
  ) {
    // Step 2:
    return 100;
  }
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

Expected output:

```text
100
```

---

# 83. Output Question 5 — Finally 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    console.log(
      "A"
    );

    // Step 2:
    return "B";
  } finally {
    // Step 3:
    console.log(
      "C"
    );
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
A
C
B
```

---

# 84. Output Question 6 — Finally Override 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    return "A";
  } finally {
    // Step 2:
    return "B";
  }
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

Expected output:

```text
B
```

---

# 85. Output Question 7 — Error Propagation 🔥🔥🔥

```js
async function first() {
  // Step 1:
  throw new Error(
    "Failed"
  );
}

async function second() {
  // Step 2:
  await first();

  // Step 3:
  console.log(
    "Never"
  );
}

// Step 4:
second()
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

# 86. Output Question 8 — Promise Chain Skip

```js
// Step 1:
Promise.resolve(
  1
)
  .then(
    (
      value
    ) => {
      // Step 2:
      throw new Error(
        "X"
      );
    }
  )
  .then(
    () => {
      // Step 3:
      console.log(
        "Y"
      );
    }
  )
  .catch(
    (
      error
    ) => {
      // Step 4:
      console.log(
        error.message
      );
    }
  );
```

Expected output:

```text
X
```

---

# 87. Interview — What Happens When Async Function Throws? 🔥🔥🔥

Good answer:

```text
The async function's returned Promise rejects
with the thrown error.
```

---

# 88. Interview — What Happens When Awaited Promise Rejects?

```text
await behaves like a throw
inside the async function.

The nearest matching try/catch can handle it.
```

---

# 89. Interview — `catch()` vs `try/catch` 🔥🔥🔥

Good answer:

```text
Both handle Promise rejection.

.catch() is Promise-chain syntax.

try/catch is usually cleaner
with async/await.

They use the same Promise rejection model.
```

---

# 90. Interview — What Is Error Propagation?

```text
If a function does not handle an error,
the rejection continues to its caller
until some layer handles it.
```

---

# 91. Interview — When Should You Rethrow? 🔥🔥🔥

```text
Rethrow when the current layer
cannot fully recover
and the caller still needs to know
the operation failed.
```

---

# 92. Interview — What Does Catch Return Do?

```text
If catch returns a normal value,
the Promise chain recovers
and becomes fulfilled with that value.
```

---

# 93. Interview — What Is an Unhandled Rejection? 🔥🔥🔥

```text
A Promise rejected
without a rejection handler
handling that failure.
```

The runtime may report it.

---

# 94. Interview — Why Is `finally` Useful?

```text
Cleanup that must happen
on both success and failure.

Examples:
loading false,
timer cleanup,
resource cleanup.
```

---

# 95. Interview — Can Outer Try/Catch Catch setTimeout Error? 🔥🔥🔥

Good answer:

```text
No, not if the error is thrown later
inside the timer callback.

The original try/catch stack
has already finished.

Handle inside the callback
or convert the async operation
into a Promise and await it.
```

---

# 96. Interview — HTTP Error vs Network Error

```text
HTTP error:
server responded with status like 404/500

Network error:
request could not complete

fetch usually rejects for network/request failures,
but not simply because status is 404/500.
```

---

# 97. Interview — Promise.all Error Strategy 🔥🔥🔥

```text
Promise.all is all-or-nothing.

If one input rejects,
Promise.all rejects.

If partial results matter,
use Promise.allSettled
or handle individual failures.
```

---

# 98. Debugging Checklist 🔥🔥🔥

```text
Did I forget catch?

Did I forget try/catch around await?

Did I swallow the error accidentally?

Should I rethrow?

Did catch return a value and recover unexpectedly?

Did finally override return/error?

Did I throw raw string instead of Error?

Did I assume outer try/catch catches future callbacks?

Did I forget response.ok check?

Did I treat 404 as network rejection?

Did Promise.all hide partial results?

Should this use allSettled?

Did forEach(async) create unhandled rejections?

Did I treat intentional abort as real failure?

Am I retrying an unsafe operation?

Am I showing technical server details to users?
```

---

# 99. Async Error Decision Guide 🔥🔥🔥

```text
Can this layer recover?
→ catch and recover

Need caller to know?
→ rethrow

Need cleanup?
→ finally

Optional failure?
→ fallback value

All-or-nothing concurrent work?
→ Promise.all

Need every outcome?
→ Promise.allSettled

Expected cancellation?
→ handle separately

HTTP status failure?
→ inspect response.ok/status

Network failure?
→ catch fetch rejection

Future callback error?
→ handle inside callback
or Promise-wrap it

Need retry?
→ only if error + operation are retry-safe
```

---

# 100. Final Master Practical — API Error Strategy 🔥🔥🔥

```js
class HttpError
  extends Error {
  constructor(
    message,
    status,
    data = null
  ) {
    // Step 1:
    super(
      message
    );

    // Step 2:
    this.name =
      "HttpError";

    // Step 3:
    this.status =
      status;

    // Step 4:
    this.data =
      data;
  }
}

async function safeJson(
  response
) {
  try {
    // Step 5:
    return await response.json();
  } catch (
    error
  ) {
    // Step 6:
    return null;
  }
}

async function requestJson(
  url,
  options = {}
) {
  try {
    // Step 7:
    const response =
      await fetch(
        url,
        options
      );

    // Step 8:
    const data =
      await safeJson(
        response
      );

    // Step 9:
    if (
      !response.ok
    ) {
      throw new HttpError(
        data?.message
        ??
        `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    // Step 10:
    return data;
  } catch (
    error
  ) {
    // Step 11:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 12:
    throw error;
  }
}
```

Flow:

```text
fetch
↓
network failure?
→ catch

response received
↓
safe parse
↓
response.ok false?
→ HttpError

success
→ return data

AbortError?
→ expected cancellation
→ return null

other error?
→ rethrow
```

---

# 101. Final Master Practical — UI Layer 🔥🔥🔥

```js
async function loadEmployeeScreen() {
  // Step 1:
  let loading =
    true;

  // Step 2:
  let errorMessage =
    "";

  try {
    // Step 3:
    const employees =
      await requestJson(
        "/api/employees"
      );

    // Step 4:
    return employees;
  } catch (
    error
  ) {
    // Step 5:
    errorMessage =
      getErrorMessage(
        error
      );

    // Step 6:
    console.log(
      errorMessage
    );

    // Step 7:
    throw error;
  } finally {
    // Step 8:
    loading =
      false;

    // Step 9:
    console.log(
      loading
    ); // Output: false
  }
}
```

Mental flow:

```text
loading true
↓
API request

success
→ data

failure
→ friendly message
→ optionally rethrow

finally
→ loading false
```

---

# 102. Final Master Trace 🔥🔥🔥

```js
async function first() {
  // Step 1:
  console.log(
    "First Start"
  );

  // Step 2:
  await Promise.resolve();

  // Step 3:
  throw new Error(
    "First Failed"
  );
}

async function second() {
  try {
    // Step 4:
    await first();

    // Step 5:
    console.log(
      "Never"
    );
  } catch (
    error
  ) {
    // Step 6:
    console.log(
      error.message
    );

    // Step 7:
    return "Recovered";
  } finally {
    // Step 8:
    console.log(
      "Cleanup"
    );
  }
}

// Step 9:
console.log(
  "Start"
);

// Step 10:
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

// Step 11:
console.log(
  "End"
);
```

Expected output:

```text
Start
First Start
End
First Failed
Cleanup
Recovered
```

Trace:

```text
Start

second()
↓
first()
↓
First Start
↓
await
↓
pause

End

microtask resumes first
↓
throw Error
↓
first rejects

second await receives rejection
↓
catch
↓
First Failed

finally
↓
Cleanup

catch returned "Recovered"
↓
second fulfills

.then
↓
Recovered
```

---

# Quick Memory 🧠🔥🔥🔥

## Promise Failure

```text
reject(error)
```

## Async Throw

```text
throw inside async function
→ Promise rejects
```

## Await Rejection

```text
await rejected Promise
→ behaves like throw
```

## Handle With

```text
.catch()
or
try/catch
```

## Catch Returns Value

```text
recovery
→ Promise fulfills
```

## Catch Throws Again

```text
rejection continues
```

## No Catch

```text
error propagates
```

## `finally`

```text
cleanup
```

## Avoid

```text
return in finally
unless intentionally overriding
```

## Unhandled Rejection

```text
rejected Promise
without handling
```

## Callback Error

```text
outer try/catch
does not catch future timer callback error
```

## Fetch

```text
network failure
→ fetch rejects

404/500
→ check response.ok/status
```

## Concurrent All-or-Nothing

```text
Promise.all
```

## Concurrent Partial Results

```text
Promise.allSettled
```

## Sequential Partial Errors

```text
per-item try/catch
```

## Expected Abort

```text
do not show as generic failure
```

## Retry

```text
only if safe
```

## Best Interview Answer

```text
In Promise-based JavaScript,
errors are represented as rejections.

Throwing inside an async function
rejects its returned Promise,
and awaiting a rejected Promise
behaves like a throw inside that async function.

I handle errors with catch()
or try/catch,
recover only when the current layer can recover,
otherwise I rethrow so the caller knows the operation failed.

I use finally for cleanup,
avoid swallowing errors unintentionally,
distinguish HTTP errors from network errors,
and treat expected cancellations separately.

For concurrent work,
I use Promise.all for all-or-nothing behavior
and Promise.allSettled when partial failures matter.
```

---

# ✅ 8.10 Async Error Handling Complete

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
8.10 Async Error Handling ✅
```

Next topic:

```text
8.11 Race Conditions 🔥🔥🔥
├── What Is a Race Condition?
├── Stale API Response
├── Search Request Race
├── Request Cancellation
├── Latest Request Wins
├── AbortController
├── Request ID Guard
├── State Update Problems
└── Real UI Fixes
```

**Next: 8.11 Race Conditions 🔥🔥🔥**
