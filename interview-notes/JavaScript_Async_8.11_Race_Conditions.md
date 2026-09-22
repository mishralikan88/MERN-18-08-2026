# 8.11 Race Conditions 🔥🔥🔥

A race condition happens when:

```text
multiple asynchronous operations
are running

and

the final result depends on
which one finishes first
```

This is extremely common in frontend applications.

Examples:

```text
search API
autocomplete
filters
pagination
tab switching
profile loading
form autosave
multiple button clicks
rapid route changes
component remounts
```

The biggest frontend race-condition problem is:

```text
an OLD request finishes AFTER a NEW request
and overwrites the latest UI state
```

Master mental model:

```text
Request A starts
↓
Request B starts later
↓
B finishes first
↓
UI shows B
↓
A finishes later
↓
A overwrites UI
❌ stale state
```

Correct mental model:

```text
latest request wins
```

Main solutions:

```text
AbortController
Request ID / Version Guard
Ignore Stale Result
Disable Duplicate Actions
Serialize When Required
Use Correct State Update Pattern
```

This chapter covers:

```text
What Is a Race Condition?
Stale API Response
Search Request Race
Latest Request Wins
AbortController
Request Cancellation
Request ID Guard
Version Counter
State Update Race
Rapid Button Clicks
Autosave Race
Pagination Race
Tab Switching Race
Component Cleanup
Promise Race vs Race Condition
Sequential Fix
Concurrent Fix
Optimistic Update Awareness
Debugging
Output Questions
Interview Questions
Machine-Coding Patterns
```

---

# 1. What Is a Race Condition? 🔥🔥🔥

A race condition means:

```text
two or more async operations compete

and

the final result changes
depending on completion order
```

The problem is not:

```text
"two things are async"
```

The problem is:

```text
completion timing affects correctness
```

---

# 2. Simple Race Example

Imagine:

```text
Request A
→ search "ra"

Request B
→ search "rahul"
```

B started later.

But A may finish later.

That can produce stale UI.

---

# 3. Stale Response Problem 🔥🔥🔥

Timeline:

```text
t1
user types "ra"

t2
request A starts

t3
user types "rahul"

t4
request B starts

t5
request B finishes

t6
UI shows "rahul" results

t7
request A finishes

t8
UI gets overwritten by "ra" results
```

Final UI is wrong.

---

# 4. Why Does This Happen?

Because:

```text
request start order
≠
request completion order
```

Async operations may complete in any order.

---

# 5. Fake Search API

```js
function searchApi(
  query,
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
            {
              query,
              results: [
                `${query}-1`,
                `${query}-2`,
              ],
            }
          );
        },
        delay
      );
    }
  );
}
```

---

# 6. Race Condition Example 🔥🔥🔥

```js
let uiState =
  null;

async function search(
  query,
  delay
) {
  // Step 1:
  const result =
    await searchApi(
      query,
      delay
    );

  // Step 2:
  uiState =
    result;

  // Step 3:
  console.log(
    uiState.query
  );
}

// Step 4:
search(
  "ra",
  300
);

// Step 5:
search(
  "rahul",
  100
);
```

Output:

```text
rahul
ra
```

Final state:

```text
ra
```

Wrong.

---

# 7. Why Final State Is Wrong

Because:

```text
"rahul"
finished first
and updated state

then

older "ra"
finished later
and overwrote it
```

---

# 8. Important Rule 🔥🔥🔥

```text
Latest request started
does not guarantee
latest request finishes last
```

This is the core race-condition rule.

---

# 9. Solution 1 — Abort Previous Request 🔥🔥🔥

When a new request starts:

```text
cancel old request
```

Best fit:

```text
fetch()
```

using:

```text
AbortController
```

---

# 10. Basic AbortController Flow

```text
create controller
↓
pass signal to fetch
↓
new request starts
↓
abort previous controller
↓
old fetch rejects with AbortError
↓
ignore expected cancellation
```

---

# 11. Basic Search Cancellation 🔥🔥🔥

```js
// Step 1:
let controller;

async function searchEmployees(
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
        `/api/employees?search=${encodeURIComponent(
          query
        )}`,
        {
          signal:
            controller.signal,
        }
      );

    // Step 5:
    if (
      !response.ok
    ) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    // Step 6:
    return await response.json();
  } catch (
    error
  ) {
    // Step 7:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 8:
    throw error;
  }
}
```

---

# 12. Abort Mental Flow

```text
search "ra"
↓
controller A
↓
request A

search "rahul"
↓
abort controller A
↓
request A cancelled

controller B
↓
request B
↓
result B used
```

---

# 13. Expected Cancellation Is Not a Real Error 🔥🔥🔥

Do not show:

```text
"Something went wrong"
```

when user simply typed a newer search.

Instead:

```text
AbortError
→ expected
→ ignore
```

---

# 14. Abort Only Works If Operation Supports It

`fetch()` supports `AbortSignal`.

But a custom Promise does not magically cancel just because you created an `AbortController`.

The operation must actually listen to the signal.

---

# 15. Abortable Custom Task — Awareness

```js
function delayTask(
  delay,
  signal
) {
  // Step 1:
  return new Promise(
    (
      resolve,
      reject
    ) => {
      // Step 2:
      const timerId =
        setTimeout(
          () => {
            resolve(
              "Done"
            );
          },
          delay
        );

      // Step 3:
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(
            timerId
          );

          reject(
            new DOMException(
              "Aborted",
              "AbortError"
            )
          );
        },
        {
          once:
            true,
        }
      );
    }
  );
}
```

---

# 16. Solution 2 — Request ID Guard 🔥🔥🔥

Sometimes cancellation is unavailable.

Then use:

```text
request ID
```

Mental model:

```text
each new request gets bigger ID

only response whose ID
matches latest ID
may update state
```

---

# 17. Request ID Example 🔥🔥🔥

```js
// Step 1:
let latestRequestId =
  0;

let uiState =
  null;

async function search(
  query,
  delay
) {
  // Step 2:
  const requestId =
    ++latestRequestId;

  // Step 3:
  const result =
    await searchApi(
      query,
      delay
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
  uiState =
    result;

  // Step 6:
  console.log(
    uiState.query
  );
}

// Step 7:
search(
  "ra",
  300
);

// Step 8:
search(
  "rahul",
  100
);
```

Output:

```text
rahul
```

Old `"ra"` response is ignored.

---

# 18. Request ID Trace

```text
search "ra"
requestId = 1

search "rahul"
requestId = 2

"rahul" finishes
2 === latest 2
→ update UI

"ra" finishes
1 !== latest 2
→ ignore
```

---

# 19. Request ID vs AbortController 🔥🔥🔥

AbortController:

```text
tries to stop old work
```

Request ID:

```text
lets old work finish
but ignores stale result
```

---

# 20. Which Is Better?

Best practical answer:

```text
If cancellation is supported,
abort old work.

Even then,
a latest-request guard can add extra safety.

If cancellation is not supported,
use request ID/version checking.
```

---

# 21. Version Counter Pattern 🔥🔥🔥

Same idea, different name:

```js
// Step 1:
let version =
  0;

async function loadData() {
  // Step 2:
  const myVersion =
    ++version;

  // Step 3:
  const data =
    await getData();

  // Step 4:
  if (
    myVersion
    !==
    version
  ) {
    return null;
  }

  // Step 5:
  return data;
}
```

---

# 22. Latest Request Wins Pattern

```text
new action
↓
increment version
↓
start async work
↓
work completes
↓
compare local version
with latest version

same?
→ use result

different?
→ stale
→ ignore
```

---

# 23. Search Race Condition 🔥🔥🔥

Search is the classic example because users can type quickly.

```text
r
ra
rah
rahu
rahul
```

Potentially:

```text
5 overlapping requests
```

---

# 24. Debounce Does Not Fully Solve Race Conditions 🔥🔥🔥

Debounce reduces request count.

But if:

```text
request A already started

then

request B starts later
```

A can still finish after B.

So:

```text
debounce
≠
race-condition fix by itself
```

---

# 25. Best Search Pattern

```text
debounce
+
AbortController
+
optional latest-request guard
```

Each solves a different problem.

---

# 26. Pagination Race 🔥🔥🔥

User clicks:

```text
Page 2
then quickly
Page 3
```

Possible:

```text
Page 3 response arrives first
↓
UI shows page 3

Page 2 response arrives later
↓
UI incorrectly shows page 2
```

Same race condition.

---

# 27. Pagination Fix With Request ID

```js
// Step 1:
let latestPageRequest =
  0;

async function loadPage(
  page,
  delay
) {
  // Step 2:
  const requestId =
    ++latestPageRequest;

  // Step 3:
  const result =
    await fakePageApi(
      page,
      delay
    );

  // Step 4:
  if (
    requestId
    !==
    latestPageRequest
  ) {
    return null;
  }

  // Step 5:
  return result;
}
```

---

# 28. Tab Switching Race 🔥🔥🔥

User clicks:

```text
Profile
then
Settings
```

Profile request is slow.

Settings request is fast.

Without protection:

```text
Settings displays
then Profile overwrites screen
```

---

# 29. Tab Guard

```js
// Step 1:
let activeTab =
  "profile";

async function loadTab(
  tab
) {
  // Step 2:
  activeTab =
    tab;

  // Step 3:
  const data =
    await fetchTabData(
      tab
    );

  // Step 4:
  if (
    activeTab
    !==
    tab
  ) {
    return null;
  }

  // Step 5:
  return data;
}
```

---

# 30. Component Unmount Race 🔥🔥🔥

A component starts an API request.

Then user navigates away.

Later response returns.

Potential problem:

```text
old screen
tries to update state
after it is no longer relevant
```

---

# 31. Cleanup With AbortController

React-style mental model:

```text
component mounts
↓
start fetch with controller

component unmounts
↓
controller.abort()
```

This prevents unnecessary stale work.

---

# 32. React-Style Cleanup Awareness

```js
useEffect(
  () => {
    // Step 1:
    const controller =
      new AbortController();

    // Step 2:
    fetch(
      "/api/employees",
      {
        signal:
          controller.signal,
      }
    );

    // Step 3:
    return () => {
      controller.abort();
    };
  },
  []
);
```

Full React behavior belongs in React lessons, but this is the async concept.

---

# 33. State Update Race 🔥🔥🔥

Race conditions are not only about network requests.

They can happen with:

```text
multiple async state updates
```

Example:

```text
read old state
wait
write based on old state
```

---

# 34. Lost Update Example

Imagine:

```text
counter = 0

Operation A reads 0
Operation B reads 0

A later writes 1
B later writes 1
```

Expected:

```text
2
```

Actual:

```text
1
```

One update was lost.

---

# 35. Fake Lost Update Example

```js
let count =
  0;

async function increment(
  delay
) {
  // Step 1:
  const current =
    count;

  // Step 2:
  await new Promise(
    (
      resolve
    ) => {
      setTimeout(
        resolve,
        delay
      );
    }
  );

  // Step 3:
  count =
    current + 1;
}

// Step 4:
increment(
  200
);

// Step 5:
increment(
  100
);
```

Both can read:

```text
0
```

and both write:

```text
1
```

---

# 36. Lost Update Mental Model

```text
count = 0

A reads 0
B reads 0

B writes 1
A writes 1

final = 1
```

Race condition.

---

# 37. Fix Depends on State System

In React:

```text
functional state update
```

helps avoid stale state snapshots.

Example awareness:

```js
// Step 1:
setCount(
  (
    current
  ) => {
    return (
      current + 1
    );
  }
);
```

---

# 38. Important Difference 🔥🔥🔥

Two different race problems:

```text
stale response race
→ old async result overwrites new result

lost update race
→ multiple operations use stale shared state
```

Both are race conditions.

---

# 39. Rapid Button Click Race 🔥🔥🔥

User double-clicks:

```text
Submit
Submit
```

Potential:

```text
two POST requests
two orders
two employees
double payment
```

Very serious.

---

# 40. Disable During Submit

Common UI protection:

```text
click submit
↓
set submitting = true
↓
disable button
↓
await request
↓
finally
set submitting = false
```

---

# 41. Submit Guard Example

```js
// Step 1:
let submitting =
  false;

async function submitForm() {
  // Step 2:
  if (
    submitting
  ) {
    return;
  }

  // Step 3:
  submitting =
    true;

  try {
    // Step 4:
    await createEmployee();
  } finally {
    // Step 5:
    submitting =
      false;
  }
}
```

---

# 42. Frontend Guard Is Not Enough for Critical Operations 🔥🔥🔥

For payments/orders:

```text
backend idempotency
```

may also be required.

Frontend disabling alone cannot guarantee correctness.

---

# 43. Idempotency Awareness

Idempotency means:

```text
same operation repeated
does not create unintended duplicate effect
```

Example:

```text
same payment request
with same idempotency key
→ backend processes once
```

Senior-level interview awareness.

---

# 44. Autosave Race 🔥🔥🔥

User edits document:

```text
Version A
then
Version B
```

Autosave A is slow.

Autosave B is fast.

If A finishes later:

```text
server may end with old Version A
```

---

# 45. Autosave Fix Strategies

Possible:

```text
serialize saves

version numbers

server-side revision check

cancel old save if possible

latest-write validation
```

---

# 46. Serialize When Order Matters 🔥🔥🔥

Sometimes correct solution is not:

```text
run everything concurrently
```

Instead:

```text
wait for previous save
then send next save
```

---

# 47. Sequential Autosave Mental Model

```text
save version 1
↓
finish
↓
save version 2
↓
finish
```

Guarantees write order.

---

# 48. Versioned Autosave

Client sends:

```text
version: 5
```

Then server can reject older:

```text
version: 4
```

arriving later.

This is stronger because server also enforces correctness.

---

# 49. Request Cancellation Is Not Always Enough

A request may already reach server before abort happens.

Abort can stop client waiting/reading, but:

```text
server-side work may already have happened
```

So for critical mutations:

```text
server-side consistency still matters
```

---

# 50. Read Race vs Write Race 🔥🔥🔥

Read race:

```text
old GET overwrites new GET result
```

Write race:

```text
old mutation finishes after new mutation
and changes final server state
```

Write races are usually more serious.

---

# 51. Promise.race Is NOT a Race Condition 🔥🔥🔥

Important interview distinction:

```text
Promise.race()
```

is a Promise combinator.

A race condition is:

```text
a correctness bug caused by timing/order
```

They are not the same thing.

---

# 52. Promise.race Example

```js
// Step 1:
const result =
  Promise.race(
    [
      taskA,
      taskB,
    ]
  );
```

This intentionally chooses first settled result.

Not automatically a bug.

---

# 53. Race Condition Example

```text
A and B both update shared state
and final state depends accidentally
on who finishes last
```

That is the bug.

---

# 54. Latest-Only Helper 🔥🔥🔥

We can build a reusable helper.

```js
function createLatestOnly() {
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

# 55. Latest-Only Usage

```js
// Step 1:
const runLatest =
  createLatestOnly();

async function search(
  query
) {
  // Step 2:
  const result =
    await runLatest(
      () => {
        return searchApi(
          query
        );
      }
    );

  // Step 3:
  if (
    result.stale
  ) {
    return;
  }

  // Step 4:
  console.log(
    result.value
  );
}
```

---

# 56. Abort + Request ID Together 🔥🔥🔥

For extra safety:

```text
new request
↓
abort previous request
↓
increment request ID
↓
start latest request
↓
when result returns
verify ID
↓
update UI
```

---

# 57. Combined Pattern Example

```js
// Step 1:
let controller;

// Step 2:
let latestRequestId =
  0;

async function searchEmployees(
  query
) {
  // Step 3:
  controller?.abort();

  // Step 4:
  controller =
    new AbortController();

  // Step 5:
  const requestId =
    ++latestRequestId;

  try {
    // Step 6:
    const response =
      await fetch(
        `/api/employees?search=${encodeURIComponent(
          query
        )}`,
        {
          signal:
            controller.signal,
        }
      );

    // Step 7:
    const data =
      await response.json();

    // Step 8:
    if (
      requestId
      !==
      latestRequestId
    ) {
      return null;
    }

    // Step 9:
    return data;
  } catch (
    error
  ) {
    // Step 10:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 11:
    throw error;
  }
}
```

---

# 58. Loading State Race 🔥🔥🔥

Another subtle bug:

```text
Request A starts
loading = true

Request B starts
loading = true

B finishes
loading = false

A still running
```

Now UI says:

```text
not loading
```

even though A is still active.

---

# 59. Loading Boolean Can Be Too Simple

For overlapping requests, a single:

```text
loading = true/false
```

may be incorrect.

Possible solutions:

```text
latest-request-only model

active request counter

separate loading state per operation
```

---

# 60. Active Request Counter 🔥🔥🔥

```js
// Step 1:
let activeRequests =
  0;

async function trackedRequest(
  operation
) {
  // Step 2:
  activeRequests++;

  try {
    // Step 3:
    return await operation();
  } finally {
    // Step 4:
    activeRequests--;

    // Step 5:
    console.log(
      activeRequests
    );
  }
}
```

Loading is:

```text
activeRequests > 0
```

---

# 61. Separate Loading States

Instead of one:

```text
loading
```

use:

```text
loadingEmployees
savingEmployee
deletingEmployee
loadingPermissions
```

when operations are independent.

---

# 62. Error State Race 🔥🔥🔥

Possible:

```text
new request succeeds
↓
clear error

old request fails later
↓
sets error
```

Now UI shows error for an obsolete request.

Same stale-result problem.

---

# 63. Guard Error Updates Too

Do not only guard successful results.

Guard:

```text
data
error
loading
```

for stale requests when using latest-only semantics.

---

# 64. Stale Error Guard Example 🔥🔥🔥

```js
// Step 1:
let latestRequestId =
  0;

async function loadData() {
  // Step 2:
  const requestId =
    ++latestRequestId;

  try {
    // Step 3:
    const data =
      await fetchData();

    // Step 4:
    if (
      requestId
      !==
      latestRequestId
    ) {
      return;
    }

    // Step 5:
    console.log(
      data
    );
  } catch (
    error
  ) {
    // Step 6:
    if (
      requestId
      !==
      latestRequestId
    ) {
      return;
    }

    // Step 7:
    console.log(
      error.message
    );
  }
}
```

---

# 65. Finally Can Also Create Stale State Bug 🔥🔥🔥

Suppose:

```text
Request A starts
Request B starts

B finishes
→ loading false

A finishes later
→ loading false again
```

That seems okay.

But if state semantics are tied to latest request, older `finally` can still interfere with more complex flags.

Guard cleanup if needed.

---

# 66. Request-Specific Loading

Better for list search:

```text
latest request owns current loading state
```

Use request ID to ensure only latest request updates it.

---

# 67. Race From Closure 🔥🔥🔥

Closures can capture old values.

Example:

```text
query = "ra"

async callback captures "ra"

later query changes to "rahul"

old callback still uses "ra"
```

Closure behavior itself is correct.

The bug is using stale captured data without checking relevance.

---

# 68. Stale Closure vs Race Condition

Stale closure:

```text
callback uses old captured value
```

Race condition:

```text
multiple async completions compete
```

They can happen together, but are conceptually different.

---

# 69. Race in Optimistic Updates 🔥🔥🔥

User changes:

```text
status → ACTIVE
then quickly
status → INACTIVE
```

Optimistic UI updates twice.

Server responses return opposite order.

Old response can overwrite latest state.

---

# 70. Optimistic Update Fix

Use:

```text
mutation version
latest-write guard
server revision/version
query invalidation
```

depending on architecture.

---

# 71. Mutation Version Example

```js
// Step 1:
let mutationVersion =
  0;

async function saveStatus(
  status
) {
  // Step 2:
  const myVersion =
    ++mutationVersion;

  // Step 3:
  const saved =
    await updateStatus(
      status
    );

  // Step 4:
  if (
    myVersion
    !==
    mutationVersion
  ) {
    return null;
  }

  // Step 5:
  return saved;
}
```

---

# 72. Disable Duplicate Mutation vs Latest-Wins

Two different strategies.

Disable:

```text
only one mutation at a time
```

Latest-wins:

```text
allow overlap
but only latest result may affect state
```

Choose based on business requirement.

---

# 73. Sequential Queue Strategy 🔥🔥🔥

When order must be preserved:

```text
queue operations
```

Mental model:

```text
operation 1
↓
operation 2
↓
operation 3
```

No overlap.

---

# 74. Simple Promise Queue Awareness

```js
// Step 1:
let queue =
  Promise.resolve();

function enqueue(
  operation
) {
  // Step 2:
  queue =
    queue.then(
      () => {
        return operation();
      }
    );

  // Step 3:
  return queue;
}
```

This serializes operations.

---

# 75. Queue Error Caution

If queue rejects and you do nothing:

```text
future chained operations
may also skip success handler
```

A robust queue needs deliberate error recovery.

Full utility belongs later.

---

# 76. Race Condition Debugging Technique 🔥🔥🔥

Add request IDs to logs.

Example:

```text
[req 1] start search "ra"
[req 2] start search "rahul"

[req 2] success
[req 1] success
```

Now stale ordering becomes obvious.

---

# 77. Add Timestamps

Helpful logs:

```text
request id
query
start time
finish time
status
```

This makes race bugs much easier to reproduce.

---

# 78. Artificial Delay Testing 🔥🔥🔥

Race bugs can be hidden on fast local networks.

Test with:

```text
network throttling
artificial delays
random delays
```

to force out-of-order completion.

---

# 79. Random Delay Test Helper

```js
function randomDelay() {
  // Step 1:
  return Math.floor(
    Math.random()
    *
    500
  );
}
```

Useful in local testing to expose timing assumptions.

---

# 80. Interview Output Question 1 🔥🔥🔥

```js
let state =
  "";

function task(
  value,
  delay
) {
  // Step 1:
  setTimeout(
    () => {
      // Step 2:
      state =
        value;

      // Step 3:
      console.log(
        state
      );
    },
    delay
  );
}

// Step 4:
task(
  "A",
  200
);

// Step 5:
task(
  "B",
  100
);
```

Expected output:

```text
B
A
```

Final state:

```text
A
```

---

# 81. Interview Output Question 2 — Latest Guard 🔥🔥🔥

```js
let latest =
  0;

let state =
  "";

function task(
  value,
  delay
) {
  // Step 1:
  const id =
    ++latest;

  // Step 2:
  setTimeout(
    () => {
      // Step 3:
      if (
        id
        !==
        latest
      ) {
        return;
      }

      // Step 4:
      state =
        value;

      // Step 5:
      console.log(
        state
      );
    },
    delay
  );
}

// Step 6:
task(
  "A",
  200
);

// Step 7:
task(
  "B",
  100
);
```

Expected output:

```text
B
```

Final state:

```text
B
```

---

# 82. Interview Output Question 3 — Lost Update 🔥🔥🔥

Concept:

```text
count = 0

A reads 0
B reads 0

B writes 1
A writes 1
```

Final:

```text
1
```

not:

```text
2
```

---

# 83. Interview — What Is a Race Condition? 🔥🔥🔥

Good answer:

```text
A race condition happens when
multiple asynchronous operations overlap
and program correctness depends
on which one finishes first.

In frontend apps,
a common example is an older API response
overwriting a newer response.
```

---

# 84. Interview — How Do You Fix Stale Search Responses? 🔥🔥🔥

Good answer:

```text
Abort the previous request with AbortController
when a new search starts,
or assign request IDs/versions
and ignore responses that are no longer latest.

Often I use debounce as well,
but debounce alone does not fully solve stale responses.
```

---

# 85. Interview — AbortController vs Request ID 🔥🔥🔥

```text
AbortController
→ attempts to cancel old work

Request ID
→ ignores old result if it still completes
```

---

# 86. Interview — Does Abort Guarantee Server Work Stops?

No.

Good answer:

```text
Abort stops the client-side fetch flow,
but the server may already have received
and started processing the request.

Critical write consistency
must also be handled server-side.
```

---

# 87. Interview — Why Debounce Alone Is Not Enough? 🔥🔥🔥

```text
Debounce reduces how often requests start.

But if two requests already started,
the older one can still finish later
and overwrite newer state.
```

---

# 88. Interview — Read Race vs Write Race

```text
Read race
→ stale response overwrites current UI

Write race
→ older mutation affects final server state
```

Write races are usually more serious.

---

# 89. Interview — How to Prevent Double Submit? 🔥🔥🔥

```text
Disable or guard the submit action
while request is in progress.

For critical operations,
also use server-side idempotency.
```

---

# 90. Interview — Promise.race vs Race Condition

```text
Promise.race
→ deliberate combinator
→ first settled Promise wins

Race condition
→ timing-dependent correctness bug
```

---

# 91. Debugging Checklist 🔥🔥🔥

```text
Can two async operations overlap?

Can an older response finish after a newer one?

Can stale success overwrite latest data?

Can stale error overwrite latest success?

Can stale finally change loading state?

Should old request be cancelled?

Do I need request ID/version guard?

Can user double-submit?

Do writes need server idempotency?

Does order matter?

Should operations be serialized?

Am I using stale captured state?

Can optimistic updates return out of order?

Does one global loading boolean represent overlapping requests correctly?

Have I tested with artificial network delay?
```

---

# 92. Race Condition Decision Guide 🔥🔥🔥

```text
New request replaces old request?
→ AbortController

Cannot cancel?
→ request ID/version guard

Critical mutation?
→ frontend guard + backend consistency

Order matters?
→ serialize / queue

Independent operation?
→ concurrency may be okay

Latest value should win?
→ latest-only guard

Multiple active operations?
→ request counter or separate loading states

Rapid typing?
→ debounce + cancellation

Duplicate submit?
→ submitting guard + idempotency
```

---

# 93. Final Master Practical — Search Latest Wins 🔥🔥🔥

```js
// Step 1:
let controller;

// Step 2:
let latestRequestId =
  0;

async function searchEmployees(
  query
) {
  // Step 3:
  controller?.abort();

  // Step 4:
  controller =
    new AbortController();

  // Step 5:
  const requestId =
    ++latestRequestId;

  try {
    // Step 6:
    const params =
      new URLSearchParams(
        {
          search:
            query,
        }
      );

    // Step 7:
    const response =
      await fetch(
        `/api/employees?${params}`,
        {
          signal:
            controller.signal,
        }
      );

    // Step 8:
    if (
      !response.ok
    ) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    // Step 9:
    const data =
      await response.json();

    // Step 10:
    if (
      requestId
      !==
      latestRequestId
    ) {
      return null;
    }

    // Step 11:
    return data;
  } catch (
    error
  ) {
    // Step 12:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 13:
    if (
      requestId
      !==
      latestRequestId
    ) {
      return null;
    }

    // Step 14:
    throw error;
  }
}
```

Flow:

```text
new query
↓
abort previous
↓
increment request ID
↓
fetch
↓
response returns
↓
check ID

latest?
→ use data

stale?
→ ignore
```

---

# 94. Final Master Practical — Prevent Double Submit 🔥🔥🔥

```js
// Step 1:
let submitting =
  false;

async function handleSubmit(
  formData
) {
  // Step 2:
  if (
    submitting
  ) {
    return null;
  }

  // Step 3:
  submitting =
    true;

  try {
    // Step 4:
    const result =
      await createEmployee(
        formData
      );

    // Step 5:
    return result;
  } finally {
    // Step 6:
    submitting =
      false;
  }
}
```

Mental flow:

```text
first click
→ submitting true
→ request starts

second click
→ submitting already true
→ ignored

request finishes
→ finally
→ submitting false
```

---

# 95. Final Master Trace 🔥🔥🔥

```js
function fakeRequest(
  name,
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
            `${name} finished`
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

// Step 3:
let latestRequestId =
  0;

// Step 4:
let state =
  "";

async function load(
  name,
  delay
) {
  // Step 5:
  const requestId =
    ++latestRequestId;

  // Step 6:
  const result =
    await fakeRequest(
      name,
      delay
    );

  // Step 7:
  if (
    requestId
    !==
    latestRequestId
  ) {
    console.log(
      `${name} ignored`
    );

    return;
  }

  // Step 8:
  state =
    result;

  // Step 9:
  console.log(
    `State: ${state}`
  );
}

// Step 10:
console.log(
  "Start"
);

// Step 11:
load(
  "Old",
  300
);

// Step 12:
load(
  "New",
  100
);

// Step 13:
console.log(
  "End"
);
```

Expected output:

```text
Start
End
New finished
State: New
Old finished
Old ignored
```

Final state:

```text
New
```

---

# Quick Memory 🧠🔥🔥🔥

## Race Condition

```text
correctness depends
on async completion order
```

## Classic Frontend Bug

```text
old request finishes later
and overwrites new state
```

## Main Rule

```text
latest request wins
```

## Fix 1

```text
AbortController
```

## Fix 2

```text
Request ID / Version Guard
```

## AbortController

```text
tries to stop old work
```

## Request ID

```text
ignores stale result
```

## Debounce

```text
reduces request count
but does not fully prevent races
```

## Search Best Pattern

```text
debounce
+
abort
+
latest guard
```

## Lost Update Race

```text
two operations read old state
then both write based on old value
```

## Double Submit

```text
submitting guard
+
backend idempotency for critical actions
```

## Read Race

```text
stale GET overwrites UI
```

## Write Race

```text
old mutation changes final server state
```

## Promise.race

```text
NOT same as race condition
```

## Loading Race

```text
single boolean may be wrong
when requests overlap
```

## Better Loading

```text
request counter
or
separate loading states
```

## Order Matters

```text
serialize operations
```

## Best Interview Answer

```text
A race condition happens when
multiple asynchronous operations overlap
and the final program state depends
on which one finishes first.

In frontend applications,
the most common example is
an older API request finishing after a newer request
and overwriting the latest UI state.

I usually fix that by aborting stale requests
with AbortController,
or by using a request ID/version guard
so only the latest request can update state.

For duplicate writes,
I also guard the UI action,
and for critical operations
I rely on server-side consistency or idempotency.

Debounce helps reduce request volume,
but it does not by itself guarantee
that stale responses cannot win.
```

---

# ✅ 8.11 Race Conditions Complete

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
8.11 Race Conditions ✅
```

Only one chapter remains in Section 8:

```text
8.12 Async Practical 🔥🔥🔥
├── Event Loop Output Questions
├── Microtask vs Macrotask
├── Promise Output Questions
├── async/await Output Questions
├── Debugging Async Code
├── Sequential vs Concurrent Problems
├── Retry Utility
├── Timeout Utility
├── Race Condition Fixes
└── Explain Async Flow While Coding
```

**Next: 8.12 Async Practical 🔥🔥🔥**
