# 8.1 Async JavaScript Foundation 🔥🔥🔥

JavaScript can start work now and finish some work later without blocking the entire application.

This chapter builds the foundation for:

```text
Callbacks
Promises
async / await
fetch()
Timers
Promise.all()
Race Conditions
AbortController
```

Master mental model:

```text
JavaScript executes synchronous code
on the Call Stack.

Some asynchronous work is handled
by the host environment.

When async work is ready,
its callback/reaction is queued.

When the Call Stack becomes empty,
the Event Loop allows queued work
to run according to queue priority.
```

The most important priority for interviews:

```text
Synchronous Code
↓
Microtasks
↓
Tasks / Macrotasks
```

Typical examples:

```text
Promise.then()
queueMicrotask()
→ Microtask Queue

setTimeout()
setInterval()
DOM events
→ Task Queue
```

Important accuracy note:

```text
"Macrotask" is a common teaching term.

Browser specifications normally use
the term "task".

For interviews:
Task / Macrotask Queue
is commonly understood.
```

---

# 1. What Is Synchronous JavaScript?

Synchronous code runs one statement after another.

Example:

```js
// Step 1:
console.log(
  "A"
); // Output: A

// Step 2:
console.log(
  "B"
); // Output: B

// Step 3:
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

Execution:

```text
A
↓
B
↓
C
```

---

# 2. What Is Asynchronous JavaScript? 🔥🔥🔥

Asynchronous JavaScript allows some work to complete later.

Examples:

```text
Timers
Network requests
User events
File operations in some runtimes
Promises
```

The program does not always sit and block until those operations finish.

---

# 3. Simple Async Example

```js
// Step 1:
console.log(
  "Start"
); // Output: Start

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      "Timer"
    ); // Output later: Timer
  },
  1000
);

// Step 4:
console.log(
  "End"
); // Output: End
```

Output:

```text
Start
End
Timer
```

The timer callback runs later.

---

# 4. Why Doesn't JavaScript Wait for `setTimeout()`?

Because the timer is handled by the host environment.

Conceptually:

```text
JavaScript
↓
register timer
↓
continue executing
↓
timer finishes in host environment
↓
callback becomes eligible to run later
```

---

# 5. JavaScript Is Single-Threaded — What Does That Mean? 🔥🔥🔥

For normal JavaScript execution in one execution context:

```text
one Call Stack
↓
one JavaScript task executes at a time
```

JavaScript does not execute two ordinary pieces of JS on the same Call Stack at the exact same moment.

---

# 6. Single-Threaded Does NOT Mean "Nothing Can Happen in Parallel"

The host environment can handle work outside the JavaScript Call Stack.

Examples:

```text
browser networking
timers
some platform APIs
```

So:

```text
JavaScript execution
→ single Call Stack

host environment
→ can manage external/background work
```

---

# 7. Browser Mental Model 🔥🔥🔥

Use this simplified diagram:

```text
JavaScript Engine
├── Call Stack
└── Heap

Browser / Host Environment
├── Timers
├── Network
├── DOM Events
└── Other Web APIs

Queues
├── Microtask Queue
└── Task Queue

Event Loop
→ coordinates when queued work
  can return to JavaScript
```

---

# 8. What Is the Call Stack?

The Call Stack tracks currently executing functions.

Example:

```js
function second() {
  // Step 1:
  console.log(
    "Second"
  ); // Output: Second
}

function first() {
  // Step 2:
  second();
}

// Step 3:
first();
```

Output:

```text
Second
```

Call Stack:

```text
Global
↓
first()
↓
second()
```

Then functions are removed in reverse order.

---

# 9. Call Stack Must Finish Current Work First 🔥🔥🔥

Queued async callbacks cannot interrupt currently running JavaScript.

Example:

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer"
    );
  },
  0
);

// Step 3:
console.log(
  "Sync"
); // Output first: Sync
```

Output:

```text
Sync
Timer
```

Even with `0` delay, synchronous code finishes first.

---

# 10. `setTimeout(..., 0)` Does NOT Mean "Run Immediately" 🔥🔥🔥

It means approximately:

```text
Do not run before the timer delay requirement is satisfied.

Then queue the callback as a task.

Run it only when JavaScript
is allowed to process that task.
```

So:

```text
0 ms
≠ immediate execution
```

---

# 11. Blocking the Call Stack Delays Async Work

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer"
    );
  },
  0
);

// Step 3:
const start =
  Date.now();

// Step 4:
while (
  Date.now()
  -
  start
  <
  100
) {
  // Step 5:
  // Intentionally block the Call Stack.
}

// Step 6:
console.log(
  "Finished blocking"
);
```

Output order:

```text
Finished blocking
Timer
```

The timer cannot run while the Call Stack is busy.

---

# 12. What Are Web APIs / Host APIs? 🔥🔥🔥

Functions such as:

```text
setTimeout()
fetch()
DOM event listeners
```

are provided by the environment.

They are not all part of the core ECMAScript language itself.

In a browser:

```text
Browser
provides these APIs.
```

---

# 13. Browser vs Node.js Awareness

Different runtimes provide different host APIs.

For example:

```text
Browser
→ DOM
→ window
→ browser timers
→ fetch

Node.js
→ filesystem APIs
→ server networking
→ timers
→ process APIs
```

The JavaScript language is the core.

The host adds environment-specific capabilities.

---

# 14. What Is the Event Loop? 🔥🔥🔥

The Event Loop coordinates when queued asynchronous work can execute.

Simple mental model:

```text
Is Call Stack empty?
↓
yes
↓
process queued work
according to scheduling rules
```

---

# 15. Event Loop Does NOT Execute Your Callback Itself

Better mental model:

```text
Event Loop
→ scheduling/coordinating mechanism

Call Stack
→ where JavaScript callback actually executes
```

---

# 16. What Is a Task Queue?

A task queue holds work such as:

```text
timer callbacks
some DOM event callbacks
message events
```

Common interview term:

```text
Macrotask Queue
```

Browser-spec term:

```text
Task Queue
```

---

# 17. What Is a Microtask Queue? 🔥🔥🔥

Microtasks are high-priority queued jobs that run after the current synchronous work finishes and before the browser proceeds to the next task.

Common microtask sources:

```text
Promise reactions
queueMicrotask()
MutationObserver callbacks
```

---

# 18. Promise `.then()` Is a Microtask 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
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
```

Even an already-resolved Promise schedules `.then()` asynchronously.

---

# 19. `queueMicrotask()` Example

```js
// Step 1:
queueMicrotask(
  () => {
    // Step 2:
    console.log(
      "Microtask"
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
Microtask
```

---

# 20. Microtask vs Timer 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer"
    );
  },
  0
);

// Step 3:
Promise.resolve()
  .then(
    () => {
      // Step 4:
      console.log(
        "Promise"
      );
    }
  );

// Step 5:
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

Priority:

```text
synchronous
↓
microtask
↓
task
```

---

# 21. The Most Important Interview Rule 🔥🔥🔥

After current synchronous code finishes:

```text
drain Microtask Queue
↓
then continue with next Task
```

This is the foundation of Promise output questions.

---

# 22. Current Script Is Also Executing as a Task — Awareness

In browser event-loop terms, the initial script itself is typically executed as part of a task.

During that script:

```text
synchronous code runs
↓
microtasks may be queued
↓
script finishes
↓
microtasks are drained
```

For interviews, you can simplify this to:

```text
Sync first
then microtasks
then later tasks
```

---

# 23. Execution Trace 1 🔥🔥🔥

```js
// Step 1:
console.log(
  1
);

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      2
    );
  },
  0
);

// Step 4:
console.log(
  3
);
```

Output:

```text
1
3
2
```

Trace:

```text
1
↓
timer registered
↓
3
↓
stack empty
↓
timer task runs
↓
2
```

---

# 24. Execution Trace 2 — Promise

```js
// Step 1:
console.log(
  1
);

// Step 2:
Promise.resolve()
  .then(
    () => {
      // Step 3:
      console.log(
        2
      );
    }
  );

// Step 4:
console.log(
  3
);
```

Output:

```text
1
3
2
```

---

# 25. Execution Trace 3 — Promise vs Timer 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      "B"
    );
  },
  0
);

// Step 4:
Promise.resolve()
  .then(
    () => {
      // Step 5:
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
C
B
```

---

# 26. Why Does Promise Run Before Timer?

Because after synchronous code:

```text
Microtask Queue
is processed before
the next Task Queue callback
```

So:

```text
Promise.then()
→ microtask

setTimeout()
→ task
```

Therefore Promise wins.

---

# 27. Multiple Microtasks Preserve Queue Order

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      console.log(
        "First"
      );
    }
  );

// Step 3:
Promise.resolve()
  .then(
    () => {
      // Step 4:
      console.log(
        "Second"
      );
    }
  );

// Step 5:
console.log(
  "Sync"
);
```

Output:

```text
Sync
First
Second
```

Microtasks execute in queued order.

---

# 28. Multiple Timers With Same Delay — Practical Mental Model

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "First"
    );
  },
  0
);

// Step 3:
setTimeout(
  () => {
    // Step 4:
    console.log(
      "Second"
    );
  },
  0
);
```

Typical output:

```text
First
Second
```

They are normally processed in the order they became eligible and were queued, but real scheduling is governed by the host environment.

---

# 29. Microtask Can Queue Another Microtask 🔥🔥🔥

```js
// Step 1:
queueMicrotask(
  () => {
    // Step 2:
    console.log(
      "Microtask 1"
    );

    // Step 3:
    queueMicrotask(
      () => {
        // Step 4:
        console.log(
          "Microtask 2"
        );
      }
    );
  }
);

// Step 5:
console.log(
  "Sync"
);
```

Output:

```text
Sync
Microtask 1
Microtask 2
```

---

# 30. Microtask Queue Is Drained 🔥🔥🔥

A key rule:

```text
When microtask processing starts,
new microtasks added during that processing
are generally processed before moving
to the next task.
```

This matters in nested Promise questions.

---

# 31. Nested Promise Example

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      console.log(
        "A"
      );

      // Step 3:
      Promise.resolve()
        .then(
          () => {
            // Step 4:
            console.log(
              "B"
            );
          }
        );
    }
  );

// Step 5:
console.log(
  "C"
);
```

Output:

```text
C
A
B
```

---

# 32. Microtasks Can Delay Timers 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer"
    );
  },
  0
);

// Step 3:
Promise.resolve()
  .then(
    () => {
      // Step 4:
      console.log(
        "Promise 1"
      );
    }
  )
  .then(
    () => {
      // Step 5:
      console.log(
        "Promise 2"
      );
    }
  );
```

Output:

```text
Promise 1
Promise 2
Timer
```

---

# 33. Microtask Starvation Awareness 🔥🔥

If code continuously creates more microtasks:

```text
microtask
↓
creates microtask
↓
creates another
↓
continues...
```

the runtime may have difficulty progressing to later tasks.

This is called:

```text
microtask starvation
```

Do not create endless microtask chains.

---

# 34. `setInterval()` Uses Repeated Tasks

```js
// Step 1:
let count =
  0;

// Step 2:
const id =
  setInterval(
    () => {
      count++;

      // Step 3:
      console.log(
        count
      );

      // Step 4:
      if (
        count === 2
      ) {
        clearInterval(
          id
        );
      }
    },
    10
  );
```

Output:

```text
1
2
```

Each interval callback executes later as scheduled work.

---

# 35. Timer Delay Is a Minimum-ish Scheduling Threshold 🔥🔥🔥

If you request:

```text
setTimeout(callback, 1000)
```

do not interpret it as:

```text
callback executes exactly at 1000.000 ms
```

Better:

```text
callback cannot run until
the timer is ready
AND
the event loop can schedule it
```

---

# 36. Long Synchronous Work Blocks UI 🔥🔥🔥

In a browser, heavy synchronous JavaScript can prevent:

```text
click handlers
timer callbacks
painting
other queued work
```

from progressing promptly.

This is why large blocking loops can freeze the page.

---

# 37. Blocking Example

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
const start =
  Date.now();

// Step 3:
while (
  Date.now()
  -
  start
  <
  200
) {
  // Step 4:
  // Busy work.
}

// Step 5:
console.log(
  "End"
);
```

Output:

```text
Start
End
```

During the loop:

```text
Call Stack is busy
```

---

# 38. Event Loop Does Not Make CPU-Heavy JS Automatically Non-Blocking

Important:

```text
async architecture
≠ every JavaScript operation becomes asynchronous
```

A huge synchronous calculation still blocks the thread.

---

# 39. DOM Event Example — Awareness

```js
// Step 1:
const button =
  document.querySelector(
    "#save"
  );

// Step 2:
button?.addEventListener(
  "click",
  () => {
    // Step 3:
    console.log(
      "Clicked"
    );
  }
);
```

The click callback waits until:

```text
user clicks
↓
event is scheduled
↓
JavaScript can process it
```

---

# 40. Event Callback Cannot Interrupt Running JS

If JavaScript is busy:

```text
user may click
↓
event becomes pending
↓
current JavaScript continues
↓
event callback runs later
```

This is another consequence of run-to-completion.

---

# 41. Run-to-Completion 🔥🔥🔥

JavaScript generally executes the current job/task until it finishes.

Concept:

```text
current JavaScript starts
↓
runs to completion
↓
then queued work gets a chance
```

This is important for avoiding arbitrary interruption in the middle of ordinary synchronous code.

---

# 42. Promise Executor Runs Synchronously 🔥🔥🔥

This is a famous trap.

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
    // Step 3:
    console.log(
      "B"
    );

    // Step 4:
    resolve();
  }
)
  .then(
    () => {
      // Step 5:
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
B
D
C
```

Important:

```text
Promise constructor executor
→ runs synchronously

.then callback
→ runs as microtask
```

---

# 43. Promise Creation Is Not Automatically Async

This:

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve
    ) => {
      // Step 2:
      console.log(
        "Inside"
      );

      // Step 3:
      resolve();
    }
  );

// Step 4:
console.log(
  "Outside"
);
```

Output:

```text
Inside
Outside
```

The executor runs immediately.

---

# 44. `.then()` Is Always Deferred 🔥🔥🔥

Even if Promise is already fulfilled:

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
    // Step 3:
    console.log(
      value
    );
  }
);

// Step 4:
console.log(
  "Sync"
);
```

Output:

```text
Sync
Done
```

---

# 45. `async` Function Begins Synchronously — Awareness 🔥🔥

```js
async function run() {
  // Step 1:
  console.log(
    "Inside"
  );

  // Step 2:
  return "Done";
}

// Step 3:
run();

// Step 4:
console.log(
  "Outside"
);
```

Output:

```text
Inside
Outside
```

The function body starts synchronously until it reaches an `await` that causes suspension.

We will cover this deeply later.

---

# 46. `await` Continuation Uses Microtask Scheduling — Awareness 🔥🔥🔥

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

Output:

```text
A
C
B
```

After `await`, continuation happens asynchronously through Promise/microtask mechanics.

---

# 47. `fetch()` Mental Model — Awareness

```js
// Step 1:
fetch(
  "/api/employees"
)
  .then(
    (
      response
    ) => {
      // Step 2:
      return response.json();
    }
  )
  .then(
    (
      data
    ) => {
      // Step 3:
      console.log(
        data
      );
    }
  );
```

Mental model:

```text
start network request
↓
browser handles network
↓
JavaScript continues
↓
request eventually settles
↓
Promise reactions become microtasks
```

---

# 48. Network Completion Does NOT Directly Push Callback Into Stack 🔥🔥🔥

Better model:

```text
network completes
↓
Promise settles
↓
reaction is queued
↓
Call Stack must become available
↓
microtask runs
```

This is more accurate than saying:

```text
API directly sends callback to Call Stack
```

---

# 49. Task vs Microtask Comparison 🔥🔥🔥

```text
TASK / MACROTASK
Examples:
setTimeout
setInterval
DOM events

MICROTASK
Examples:
Promise.then
Promise.catch
Promise.finally
queueMicrotask
```

Priority after current synchronous work:

```text
microtasks first
then next task
```

---

# 50. `Promise.catch()` Is Also a Microtask

```js
// Step 1:
Promise.reject(
  new Error(
    "Failed"
  )
)
  .catch(
    () => {
      // Step 2:
      console.log(
        "Caught"
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
Caught
```

---

# 51. `Promise.finally()` Reaction Is Also Async

```js
// Step 1:
Promise.resolve()
  .finally(
    () => {
      // Step 2:
      console.log(
        "Finally"
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
Finally
```

---

# 52. Mixed Queue Question 1 🔥🔥🔥

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      "Timeout"
    );
  },
  0
);

// Step 4:
queueMicrotask(
  () => {
    // Step 5:
    console.log(
      "Microtask"
    );
  }
);

// Step 6:
console.log(
  "End"
);
```

Output:

```text
Start
End
Microtask
Timeout
```

---

# 53. Mixed Queue Question 2 🔥🔥🔥

```js
// Step 1:
console.log(
  1
);

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      2
    );
  },
  0
);

// Step 4:
Promise.resolve()
  .then(
    () => {
      // Step 5:
      console.log(
        3
      );
    }
  );

// Step 6:
queueMicrotask(
  () => {
    // Step 7:
    console.log(
      4
    );
  }
);

// Step 8:
console.log(
  5
);
```

Output:

```text
1
5
3
4
2
```

Why?

Microtasks are processed in the order they were queued:

```text
Promise reaction
then
queueMicrotask callback
```

---

# 54. Mixed Queue Question 3 — Microtask Inside Timer 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer"
    );

    // Step 3:
    Promise.resolve()
      .then(
        () => {
          // Step 4:
          console.log(
            "Promise inside timer"
          );
        }
      );
  },
  0
);

// Step 5:
setTimeout(
  () => {
    // Step 6:
    console.log(
      "Second timer"
    );
  },
  0
);
```

Typical output:

```text
Timer
Promise inside timer
Second timer
```

After the first timer task finishes:

```text
microtasks are drained
before the next timer task runs
```

---

# 55. Mixed Queue Question 4 — Promise Creates Timer

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      console.log(
        "Promise"
      );

      // Step 3:
      setTimeout(
        () => {
          // Step 4:
          console.log(
            "Timer from Promise"
          );
        },
        0
      );
    }
  );

// Step 5:
console.log(
  "Sync"
);
```

Output:

```text
Sync
Promise
Timer from Promise
```

---

# 56. Mixed Queue Question 5 — Promise Chain 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      console.log(
        "A"
      );
    }
  )
  .then(
    () => {
      // Step 3:
      console.log(
        "B"
      );
    }
  );

// Step 4:
queueMicrotask(
  () => {
    // Step 5:
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

Why?

Initial microtasks:

```text
first .then → A
queueMicrotask → C
```

When `A` finishes, the next `.then` becomes queued after `C`.

---

# 57. This Promise Chain Order Is Very Important 🔥🔥🔥

Do not think:

```text
all chained .then callbacks
are queued immediately
```

Instead:

```text
first .then runs
↓
its returned Promise settles
↓
next .then becomes eligible
↓
next reaction is queued
```

---

# 58. Execution Trace Algorithm 🔥🔥🔥

For interview output questions:

```text
Step 1:
Run all synchronous statements.

Step 2:
Whenever Promise reaction / queueMicrotask appears,
write it in Microtask Queue.

Step 3:
Whenever timer/event task becomes ready,
write it in Task Queue.

Step 4:
When current stack is empty,
drain Microtask Queue.

Step 5:
Take next Task.

Step 6:
After that task,
drain Microtasks again.

Step 7:
Repeat.
```

---

# 59. Manual Queue Table Example

For:

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      "B"
    );
  },
  0
);

// Step 4:
Promise.resolve()
  .then(
    () => {
      // Step 5:
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

Track:

```text
Sync:
A
D

Microtask Queue:
C

Task Queue:
B
```

Final:

```text
A
D
C
B
```

---

# 60. Real App Example — Search Request Mental Model 🔥🔥🔥

Suppose a user searches employees.

```js
async function loadEmployees() {
  // Step 1:
  console.log(
    "Loading started"
  );

  // Step 2:
  const response =
    await fetch(
      "/api/employees"
    );

  // Step 3:
  const employees =
    await response.json();

  // Step 4:
  console.log(
    employees
  );
}
```

High-level flow:

```text
start function
↓
start fetch
↓
function suspends
↓
browser handles network
↓
JavaScript can do other work
↓
request resolves
↓
continuation scheduled
↓
function resumes later
```

Deep `async/await` behavior comes later.

---

# 61. Why Async Is Important in UI Applications

Without async handling:

```text
network request
timer
user interaction
```

could block the interface unnecessarily.

Async architecture allows:

```text
start waiting operation
↓
continue other work
↓
handle result when ready
```

---

# 62. Async Does NOT Guarantee Faster Code 🔥🔥🔥

Async mainly helps with:

```text
waiting
responsiveness
concurrency coordination
```

It does not automatically make a CPU-heavy loop faster.

---

# 63. Concurrency vs Parallelism — Awareness 🔥🔥

Concurrency:

```text
multiple operations make progress
over overlapping periods
```

Parallelism:

```text
multiple operations literally execute
at the same instant on different execution resources
```

Normal browser JavaScript on one main thread:

```text
uses concurrency heavily
```

The host may perform some operations in parallel outside the JS Call Stack.

---

# 64. Event Loop Is About Scheduling, Not Magic Threads

Do not say:

```text
Event Loop creates a new thread
for every callback
```

Better:

```text
Event Loop coordinates queued work
so callbacks execute when the JS stack
is available according to scheduling rules.
```

---

# 65. Browser Rendering Awareness 🔥🔥

Browsers also need opportunities to:

```text
render
paint
process user input
```

Long synchronous JavaScript or endless microtasks can delay those opportunities.

This becomes important in performance topics.

---

# 66. Interview Question — Is JavaScript Synchronous or Asynchronous?

Good answer:

```text
JavaScript execution itself is synchronous
and uses a single Call Stack.

The runtime provides asynchronous APIs
such as timers, network requests, and events.

The Event Loop and queues coordinate
when their callbacks or Promise reactions
can execute later.
```

---

# 67. Interview Question — Is JavaScript Single-Threaded? 🔥🔥🔥

Good answer:

```text
Normal JavaScript execution in one context
uses one main Call Stack
and executes one piece of JavaScript at a time.

However, the host environment can handle
timers, networking, and other work outside that stack,
so applications can still behave asynchronously.
```

---

# 68. Interview Question — What Is the Event Loop?

Good answer:

```text
The Event Loop coordinates execution
between the Call Stack and queued asynchronous work.

After current JavaScript finishes,
microtasks are processed,
then the runtime can proceed to later tasks.
```

---

# 69. Interview Question — Microtask vs Macrotask 🔥🔥🔥

Good answer:

```text
Microtasks include Promise reactions
and queueMicrotask callbacks.

Tasks/macrotasks include things such as
setTimeout callbacks and many DOM events.

After current synchronous work,
microtasks are drained before
the next task is processed.
```

---

# 70. Interview Question — Why Does Promise Run Before `setTimeout(..., 0)`?

Good answer:

```text
Because Promise reactions are microtasks,
while setTimeout callbacks are tasks.

After the current synchronous code finishes,
the runtime drains microtasks
before moving to the next task.
```

---

# 71. Interview Question — Is Promise Constructor Async? 🔥🔥🔥

Good answer:

```text
No.

The Promise executor runs synchronously
when the Promise is created.

But .then(), .catch(), and .finally()
callbacks run asynchronously
as Promise reactions/microtasks.
```

---

# 72. Interview Question — Why Can a 0 ms Timer Be Delayed?

Good answer:

```text
0 ms does not mean immediate execution.

The timer callback must first become eligible,
and then it waits until the Call Stack is free
and scheduling allows its task to run.

Synchronous work and microtasks
can delay it further.
```

---

# 73. Debugging Rule — "Why Is My Timer Late?" 🔥🔥🔥

Check:

```text
Is the Call Stack blocked?

Are many microtasks running?

Is the browser busy?

Was the requested timer delay only a minimum threshold?
```

Do not assume timer delay equals exact execution time.

---

# 74. Debugging Rule — "Why Does Promise Log Later?"

Because:

```text
Promise callback
→ microtask

current synchronous code
→ must finish first
```

Even a resolved Promise does not invoke `.then()` inline.

---

# 75. Debugging Rule — "Why Is the UI Frozen?" 🔥🔥🔥

Look for:

```text
large synchronous loops
heavy calculations
recursive synchronous work
too much work on main thread
microtask starvation
```

Async APIs cannot help if your own synchronous code never gives control back.

---

# 76. Machine-Coding Relevance 🔥🔥🔥

You need this foundation for:

```text
debounced search
API loading
autocomplete
pagination requests
polling
retry logic
request cancellation
race-condition handling
loading/error state
parallel API requests
timeouts
notifications
```

Without understanding the Event Loop, Promise behavior often looks random.

---

# 77. Final Master Output Question 🔥🔥🔥

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
setTimeout(
  () => {
    // Step 3:
    console.log(
      "Timer 1"
    );

    // Step 4:
    Promise.resolve()
      .then(
        () => {
          // Step 5:
          console.log(
            "Promise inside Timer"
          );
        }
      );
  },
  0
);

// Step 6:
Promise.resolve()
  .then(
    () => {
      // Step 7:
      console.log(
        "Promise 1"
      );
    }
  )
  .then(
    () => {
      // Step 8:
      console.log(
        "Promise 2"
      );
    }
  );

// Step 9:
queueMicrotask(
  () => {
    // Step 10:
    console.log(
      "Microtask"
    );
  }
);

// Step 11:
setTimeout(
  () => {
    // Step 12:
    console.log(
      "Timer 2"
    );
  },
  0
);

// Step 13:
console.log(
  "End"
);
```

Output:

```text
Start
End
Promise 1
Microtask
Promise 2
Timer 1
Promise inside Timer
Timer 2
```

---

# 78. Final Master Trace 🔥🔥🔥

Initial synchronous execution:

```text
Start
End
```

Queues after sync:

```text
Microtask Queue:
Promise 1
Microtask

Task Queue:
Timer 1
Timer 2
```

Now drain microtasks:

```text
Promise 1 runs
↓
queues Promise 2

Microtask runs

Promise 2 runs
```

So far:

```text
Start
End
Promise 1
Microtask
Promise 2
```

Then first task:

```text
Timer 1
```

Timer 1 queues a Promise microtask:

```text
Promise inside Timer
```

Before next task:

```text
drain microtasks
```

So:

```text
Promise inside Timer
```

Then:

```text
Timer 2
```

Final:

```text
Start
End
Promise 1
Microtask
Promise 2
Timer 1
Promise inside Timer
Timer 2
```

---

# Quick Memory 🧠🔥🔥🔥

## Synchronous

```text
runs now
one statement after another
```

## Asynchronous

```text
start work
continue other work
handle result later
```

## JavaScript Execution

```text
one Call Stack
one piece of JS at a time
```

## Host Environment

```text
timers
network
DOM events
other platform APIs
```

## Event Loop

```text
coordinates queued work
with Call Stack availability
```

## Task / Macrotask

```text
setTimeout
setInterval
DOM events
```

## Microtask

```text
Promise.then
Promise.catch
Promise.finally
queueMicrotask
```

## Priority

```text
Sync
↓
Microtasks
↓
Next Task
```

## Promise Executor

```text
runs synchronously
```

## Promise Reaction

```text
runs asynchronously
as microtask
```

## `setTimeout(..., 0)`

```text
not immediate
not exact
```

## Run-to-Completion

```text
current JavaScript finishes
before queued callbacks run
```

## Microtask Drain

```text
process microtasks
before next task
```

## Main Interview Pattern

```text
console.log
setTimeout
Promise.then
console.log

↓

// Sync first
console.log
console.log

// Then microtask
Promise.then

// Then task
setTimeout
```

## Best Output-Solving Method

```text
Write three areas:

SYNC

MICROTASK QUEUE

TASK QUEUE

Then trace movement
instead of guessing.
```

## Most Important Interview Answer

```text
JavaScript executes synchronous code
on a single Call Stack.

The host environment handles operations
such as timers, networking, and events.

When asynchronous work becomes ready,
follow-up work is queued.

After current JavaScript finishes,
microtasks such as Promise reactions
are processed before later tasks
such as setTimeout callbacks.
```

---

# ✅ 8.1 Async JavaScript Foundation Complete

Covered:

```text
Sync vs Async ✅
Single Thread ✅
Call Stack ✅
Host / Web APIs ✅
Event Loop ✅
Microtask Queue ✅
Task / Macrotask Queue ✅
Priority ✅
Execution Order ✅
Promise Executor Awareness ✅
Promise Microtasks ✅
Timer Scheduling ✅
Run-to-Completion ✅
Async/Await Preview ✅
Fetch Preview ✅
Output Questions ✅
Debugging ✅
Machine-Coding Relevance ✅
```

Next topic:

```text
8.2 Timers 🔥🔥🔥

├── setTimeout()
├── clearTimeout()
├── setInterval()
├── clearInterval()
├── Delay Behaviour
├── Timer IDs
├── Nested Timers
├── Drift Awareness
├── Practical Timer Utilities
├── Output Questions
└── Interview Questions
```

**Next: 8.2 Timers 🔥🔥🔥**
