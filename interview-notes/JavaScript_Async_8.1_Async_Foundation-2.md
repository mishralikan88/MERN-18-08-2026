# 8.1 Async JavaScript Foundation 🔥🔥🔥

Async JavaScript is one of the most important interview areas.

Before learning:

```text
Promises
async / await
fetch()
Promise.all()
AbortController
```

you must first understand the engine flow.

Master mental model:

```text
JavaScript
→ runs one call stack

Browser / runtime
→ can handle async work outside that stack

Async work finishes
↓
callback / continuation becomes ready
↓
goes to a queue
↓
event loop waits for call stack to become empty
↓
ready work moves back to the call stack
```

The most important execution priority:

```text
Current synchronous code
↓
Microtasks
↓
Next task / macrotask
```

This chapter covers:

```text
Synchronous JavaScript
Asynchronous JavaScript
Single-Threaded JavaScript
Call Stack
Browser / Runtime APIs
Web APIs
Timers
Promises Awareness
Event Loop
Task Queue
Macrotask Queue
Microtask Queue
Microtask Priority
Execution Order
Nested Async Flow
Output Questions
Debugging
Interview Questions
```

---

# 1. What Is Synchronous JavaScript?

Synchronous means:

```text
one statement runs
↓
finishes
↓
next statement runs
```

Example:

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
console.log(
  "B"
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

Execution is straightforward.

---

# 2. Synchronous Mental Model

```text
A
↓
B
↓
C
```

JavaScript does not move to `B` until `A` finishes.

---

# 3. Blocking Synchronous Code 🔥🔥🔥

If synchronous work takes a long time:

```text
Call Stack
→ remains busy
```

Other JavaScript cannot run on that same stack until the work finishes.

---

# 4. Blocking Example

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
let total =
  0;

// Step 3:
for (
  let i = 0;
  i < 1000000;
  i++
) {
  total +=
    i;
}

// Step 4:
console.log(
  "End"
);
```

Output:

```text
Start
End
```

The loop runs synchronously before `"End"`.

---

# 5. What Is Asynchronous JavaScript? 🔥🔥🔥

Asynchronous behavior allows some work to be started now and completed later.

Examples:

```text
Timer
Network request
User click
File operation
Database operation
Promise continuation
```

JavaScript does not necessarily wait synchronously for these to finish.

---

# 6. Basic Async Example

```js
// Step 1:
console.log(
  "Start"
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

// Step 3:
console.log(
  "End"
);
```

Output:

```text
Start
End
Timer
```

This is one of the most important async examples.

---

# 7. Why Doesn't `Timer` Print Before `End`? 🔥🔥🔥

Because:

```text
setTimeout callback
does NOT run immediately on the current call stack
```

Conceptually:

```text
Start
↓
setTimeout registers timer
↓
End
↓
current synchronous stack finishes
↓
timer callback can run
```

---

# 8. JavaScript Is Single-Threaded — What Does That Mean? 🔥🔥🔥

For normal JavaScript execution:

```text
one JavaScript call stack
```

means:

```text
one piece of JavaScript executes at a time
on that stack
```

This does NOT mean the entire browser/runtime can do only one thing.

---

# 9. Single-Threaded Does NOT Mean No Concurrency

The browser/runtime can handle work outside the JavaScript call stack.

Conceptual model:

```text
JavaScript Call Stack
→ one JS execution path

Browser / Runtime
→ timers
→ networking
→ events
→ other host work
```

This is how async behavior is possible.

---

# 10. Browser vs JavaScript Engine 🔥🔥🔥

Important distinction:

```text
JavaScript engine
→ executes JavaScript

Browser
→ provides APIs and environment
```

Examples of browser-provided APIs:

```text
setTimeout
fetch
DOM events
MutationObserver
```

Not all of these are part of the ECMAScript language itself.

---

# 11. Web APIs — Practical Mental Model

In browser explanations, people often say:

```text
Web APIs
```

to mean browser features that handle async work outside the call stack.

Examples:

```text
Timers
DOM Events
Network Requests
```

---

# 12. Runtime Differences Awareness

In Node.js, the host environment is different.

So instead of assuming:

```text
browser Web APIs everywhere
```

use the broader mental model:

```text
host/runtime APIs
```

For browser interview questions:

```text
Web APIs
```

is common terminology.

---

# 13. Call Stack Reminder 🔥🔥🔥

The call stack tracks currently executing functions.

Example:

```js
function second() {
  // Step 1:
  console.log(
    "Second"
  );
}

function first() {
  // Step 2:
  second();
}

// Step 3:
first();
```

Conceptual stack:

```text
Global
↓
first()
↓
second()
```

---

# 14. Async Work Does Not Stay on Call Stack Waiting

Suppose we call:

```text
setTimeout(callback, 1000)
```

JavaScript does not normally do:

```text
push callback
↓
wait on stack for 1 second
```

Instead:

```text
register timer with host
↓
continue JavaScript execution
```

---

# 15. Timer Registration Mental Model 🔥🔥🔥

```text
Call Stack
↓
setTimeout(...)
↓
host timer system
↓
JavaScript continues
```

When timer completes:

```text
callback becomes eligible to be queued
```

---

# 16. What Is the Event Loop? 🔥🔥🔥

The event loop coordinates when queued work can return to JavaScript execution.

Simplified mental model:

```text
Is the call stack empty?
↓
yes
↓
run ready queued work
```

---

# 17. Event Loop Is Not a Queue

Important:

```text
Event Loop
≠ Task Queue
```

The event loop is the coordination mechanism.

Queues hold ready work.

---

# 18. Task Queue / Macrotask Queue 🔥🔥🔥

A common interview term is:

```text
Task Queue
```

Many tutorials also call it:

```text
Macrotask Queue
```

For practical interview understanding, examples include:

```text
setTimeout callbacks
setInterval callbacks
many DOM event callbacks
```

---

# 19. Why "Macrotask" Is Informal

The HTML specification uses the term:

```text
task
```

"Macrotask" is common educational terminology used to contrast tasks with microtasks.

For interviews:

```text
Task / Macrotask
```

is usually understood.

---

# 20. Microtask Queue 🔥🔥🔥

Microtasks have higher priority than the next normal task.

Common examples:

```text
Promise .then()
Promise .catch()
Promise .finally()
queueMicrotask()
```

---

# 21. Core Priority Rule 🔥🔥🔥

Memorize:

```text
Current synchronous code
↓
Drain all available microtasks
↓
Run next task/macrotask
```

This solves a huge number of interview questions.

---

# 22. Promise vs Timer Basic Output 🔥🔥🔥

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

---

# 23. Why `C` Before `B`? 🔥🔥🔥

Trace:

```text
A
↓
timer registered

Promise .then()
→ microtask scheduled

D
↓
synchronous stack becomes empty

Microtask queue
→ C

Task queue
→ B
```

Therefore:

```text
A
D
C
B
```

---

# 24. Synchronous Code Always Finishes First

Even if microtask is already ready:

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

The current synchronous script runs first.

---

# 25. `setTimeout(..., 0)` Does NOT Mean Immediate 🔥🔥🔥

This:

```text
setTimeout(callback, 0)
```

means roughly:

```text
do not run callback before timer delay condition is satisfied
```

It does NOT mean:

```text
run callback immediately
```

The callback still waits for scheduling rules.

---

# 26. Timer Delay Is a Minimum-Like Delay

If the call stack is busy:

```text
timer becomes ready
BUT
callback cannot execute yet
```

It must wait.

---

# 27. Busy Stack Delays Timer 🔥🔥🔥

```js
// Step 1:
console.log(
  "Start"
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

// Step 3:
for (
  let i = 0;
  i < 1000000;
  i++
) {
  // Step 4:
  // Synchronous work keeps stack busy.
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
Timer
```

The timer cannot interrupt the currently running JavaScript stack.

---

# 28. Event Loop Does Not Interrupt Running JavaScript 🔥🔥🔥

This is crucial.

Once a JavaScript task is running:

```text
it runs until it yields/completes
```

The event loop does not pause that code in the middle just because a timer became ready.

---

# 29. Run-to-Completion Mental Model

For one JavaScript job/task:

```text
start
↓
execute synchronously
↓
finish
```

Then scheduling can move to subsequent queued work.

---

# 30. Microtask Checkpoint 🔥🔥🔥

After current synchronous work finishes, the runtime performs a microtask checkpoint.

Practical meaning:

```text
run queued microtasks
until the microtask queue is empty
```

before moving to the next normal task.

---

# 31. Multiple Microtasks

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

Microtasks generally execute in queue order.

---

# 32. Multiple Timers

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
setTimeout(
  () => {
    console.log(
      "T2"
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
T1
T2
```

For this common same-delay case, callbacks are queued in registration order once eligible.

---

# 33. Microtasks Can Schedule More Microtasks 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "P1"
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
    }
  );

// Step 3:
setTimeout(
  () => {
    console.log(
      "Timer"
    );
  },
  0
);
```

Output:

```text
P1
P2
Timer
```

---

# 34. Why Does Newly Added Microtask Run Before Timer?

Because the runtime continues draining microtasks.

Trace:

```text
P1 microtask runs
↓
P2 microtask added
↓
microtask queue not empty
↓
P2 runs
↓
only then next task
↓
Timer
```

---

# 35. Microtask Starvation Awareness 🔥🔥🔥

If code continuously creates new microtasks:

```text
microtask queue may keep refilling
```

This can delay normal tasks such as timers and rendering opportunities.

Do not create infinite microtask chains.

---

# 36. `queueMicrotask()` 🔥🔥

`queueMicrotask()` explicitly schedules a microtask.

Example:

```js
// Step 1:
queueMicrotask(
  () => {
    console.log(
      "Microtask"
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
Microtask
```

---

# 37. `queueMicrotask()` vs Timer

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
queueMicrotask(
  () => {
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
Timer
```

---

# 38. Promise Callback Is Not Synchronous 🔥🔥🔥

Even an already fulfilled promise:

```js
// Step 1:
const promise =
  Promise.resolve(
    "Done"
  );

// Step 2:
promise.then(
  (value) => {
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

`.then()` callback runs as a microtask, not immediately inline.

---

# 39. Promise Creation Executor Runs Synchronously 🔥🔥🔥

Important distinction:

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
      resolve(
        "Done"
      );
    }
  );

// Step 4:
promise.then(
  () => {
    console.log(
      "Then"
    );
  }
);

// Step 5:
console.log(
  "End"
);
```

Output:

```text
Executor
End
Then
```

---

# 40. Why Promise Executor Runs First

`new Promise(executor)` calls the executor synchronously.

But:

```text
.then(callback)
```

runs later as a microtask.

Mental model:

```text
Promise constructor executor
→ synchronous

then handler
→ microtask
```

---

# 41. Important Promise Foundation Distinction 🔥🔥🔥

Do not say:

```text
everything inside Promise is asynchronous
```

That is false.

Better:

```text
Promise executor runs synchronously.

Promise reaction handlers
like then/catch/finally
run asynchronously as microtasks.
```

---

# 42. Event Handler Awareness

Browser event handlers are also scheduled by the host environment.

Example mental model:

```text
user clicks
↓
browser detects event
↓
event callback becomes eligible
↓
event loop runs it when appropriate
```

---

# 43. Click Cannot Interrupt Current Script

If JavaScript is doing long synchronous work:

```text
user may click
```

but the click handler cannot run until the stack becomes available.

This is why long synchronous work can make UI feel frozen.

---

# 44. Long Task UI Problem 🔥🔥🔥

Long-running JavaScript can block:

```text
click handling
rendering opportunities
timer callbacks
other tasks
```

This is why performance matters.

---

# 45. Web API Flow Example 🔥🔥🔥

```text
JavaScript:
setTimeout(callback, 1000)
↓
browser timer API handles waiting
↓
timer completes
↓
callback queued as task
↓
event loop waits for stack to be free
↓
callback runs
```

---

# 46. Network Request Mental Model — Awareness

For something like `fetch()`:

```text
JavaScript starts request
↓
browser networking handles request
↓
request completes
↓
promise settles
↓
promise handlers become microtasks
```

We will cover this deeply later.

---

# 47. Async Does Not Always Mean Parallel 🔥🔥🔥

Important interview distinction:

```text
asynchronous
≠ automatically parallel
```

Async means:

```text
completion can happen later
without blocking current synchronous flow
```

Parallel means:

```text
multiple operations literally execute at the same time
```

Different concept.

---

# 48. Concurrency vs Parallelism Awareness

Concurrency:

```text
multiple operations make progress over overlapping time
```

Parallelism:

```text
multiple operations execute simultaneously
```

JavaScript async programming commonly gives concurrency.

The host/runtime may use other threads internally.

---

# 49. Single Thread + Async Together

This is not contradictory.

Mental model:

```text
JavaScript execution
→ one main call stack

Host environment
→ handles timers/network/events

Event loop
→ schedules callbacks back to JavaScript
```

---

# 50. Sync + Microtask + Timer Master Example 🔥🔥🔥

```js
// Step 1:
console.log(
  "1"
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "2"
    );
  },
  0
);

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "3"
      );
    }
  );

// Step 4:
console.log(
  "4"
);
```

Output:

```text
1
4
3
2
```

---

# 51. Trace the Master Example

```text
Step 1:
print 1

Step 2:
register timer

Step 3:
schedule promise microtask

Step 4:
print 4

Synchronous stack empty

Microtask:
print 3

Next task:
print 2
```

---

# 52. Nested Timer + Promise 🔥🔥🔥

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
            "Promise Inside Timer"
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
Promise Inside Timer
```

---

# 53. Why Promise Inside Timer Runs Immediately After Timer Callback

After the timer task finishes:

```text
microtask checkpoint occurs
```

So the newly created promise microtask runs before the next task.

---

# 54. Two Timers + Promise Inside First Timer 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    console.log(
      "T1"
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
  },
  0
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
```

Output:

```text
T1
P1
T2
```

---

# 55. Why `P1` Before `T2`?

Trace:

```text
T1 task starts
↓
prints T1
↓
creates P1 microtask
↓
T1 task finishes
↓
drain microtasks
↓
P1
↓
next task
↓
T2
```

---

# 56. Promise Chain Foundation 🔥🔥🔥

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

Each `.then()` in the chain runs in later microtask processing.

---

# 57. `then()` Return Scheduling Awareness

The second `.then()` does not run in the same synchronous function frame as the first.

After first handler completes:

```text
the next promise becomes settled
↓
next reaction gets queued as a microtask
```

Deep chaining rules come later in Promises.

---

# 58. Microtask Ordering Example 🔥🔥🔥

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "A"
      );
    }
  );

// Step 2:
queueMicrotask(
  () => {
    console.log(
      "B"
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
B
C
```

They are queued in that order.

---

# 59. Current Script Is Also a Task — Awareness

In browser event-loop explanations, the initial script itself runs as a task.

Practical mental model:

```text
script task starts
↓
all synchronous script runs
↓
microtasks drain
↓
next task
```

---

# 60. Rendering Awareness 🔥🔥

Browsers may render between tasks when appropriate.

Simplified browser flow:

```text
task
↓
microtasks
↓
rendering opportunity
↓
next task
```

Exact rendering behavior is browser-controlled.

---

# 61. Too Many Microtasks Can Delay Rendering

Because microtasks are drained before moving on:

```text
huge microtask chain
→ can delay rendering opportunity
```

This is another reason not to abuse microtasks.

---

# 62. `setInterval()` Foundation Awareness

`setInterval()` schedules repeated timer callbacks.

But if JavaScript is busy:

```text
callbacks can be delayed
```

The requested interval is not a guarantee of exact execution time.

---

# 63. Timers Are Not Precise Clocks 🔥🔥🔥

Do not assume:

```text
setTimeout(fn, 1000)
→ exactly 1000.000 ms later
```

Actual execution can be later because of:

```text
busy call stack
task scheduling
browser timer clamping
runtime behavior
```

---

# 64. Common Wrong Mental Model #1

Wrong:

```text
setTimeout runs callback after exactly N milliseconds
```

Better:

```text
after the delay threshold,
callback becomes eligible for scheduling
```

---

# 65. Common Wrong Mental Model #2 🔥🔥🔥

Wrong:

```text
Promise runs in parallel with JavaScript
```

Better:

```text
promise handlers are scheduled
to run later on the JavaScript execution stack
as microtasks
```

---

# 66. Common Wrong Mental Model #3

Wrong:

```text
event loop executes callbacks itself
```

Better:

```text
event loop coordinates when queued work
can be moved into JavaScript execution
```

---

# 67. Common Wrong Mental Model #4 🔥🔥🔥

Wrong:

```text
microtask means faster code
```

Better:

```text
microtask means higher scheduling priority
than the next normal task
```

It does not automatically mean the actual work is computationally faster.

---

# 68. Common Wrong Mental Model #5

Wrong:

```text
single-threaded JavaScript means browser can only do one thing
```

Better:

```text
JavaScript execution uses one main call stack,
while the host environment can perform other work
and later schedule callbacks.
```

---

# 69. Real App Example — Search Input

User types:

```text
"react"
```

Possible flow:

```text
input event
↓
JavaScript event handler
↓
start network request
↓
JavaScript continues
↓
network handled by browser
↓
response arrives
↓
promise settles
↓
microtask runs
↓
UI state updated
```

This is the async mental model behind search APIs.

---

# 70. Real App Example — Employee API

```text
click "Load Employees"
↓
click handler runs
↓
fetch request starts
↓
handler can finish
↓
browser performs network request
↓
response arrives later
↓
promise handlers / await continuation run
↓
employees displayed
```

---

# 71. Why Async Matters in Frontend Apps 🔥🔥🔥

Without async handling, operations like network requests would block the UI.

Async architecture allows:

```text
start operation
↓
continue app responsiveness
↓
handle result later
```

---

# 72. Interview Output 1

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

Expected output:

```text
A
C
B
```

---

# 73. Interview Output 2 🔥🔥🔥

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

# 74. Interview Output 3

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
```

Expected output:

```text
Promise
Timer
```

---

# 75. Interview Output 4 🔥🔥🔥

```js
// Step 1:
console.log(
  "1"
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "2"
    );
  },
  0
);

// Step 3:
Promise.resolve()
  .then(
    () => {
      console.log(
        "3"
      );
    }
  );

// Step 4:
console.log(
  "4"
);
```

Expected output:

```text
1
4
3
2
```

---

# 76. Interview Output 5 — Promise Executor 🔥🔥🔥

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

# 77. Interview Output 6 — Nested Microtask

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      console.log(
        "A"
      );

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

// Step 2:
setTimeout(
  () => {
    console.log(
      "C"
    );
  },
  0
);
```

Expected output:

```text
A
B
C
```

---

# 78. Interview Output 7 — Timer Creates Microtask 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    console.log(
      "A"
    );

    Promise.resolve()
      .then(
        () => {
          console.log(
            "B"
          );
        }
      );
  },
  0
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "C"
    );
  },
  0
);
```

Expected output:

```text
A
B
C
```

---

# 79. Interview Question — What Is the Event Loop? 🔥🔥🔥

Good answer:

```text
The event loop coordinates JavaScript execution
with queued asynchronous work.

When the current JavaScript stack is free,
the runtime processes ready work
according to scheduling rules,
including draining microtasks
before moving to the next normal task.
```

---

# 80. Interview Question — Microtask vs Macrotask 🔥🔥🔥

Good answer:

```text
Microtasks include Promise reactions
and queueMicrotask callbacks.

Normal tasks/macrotasks include things
such as timer callbacks.

After current synchronous code completes,
the runtime drains microtasks
before running the next normal task.
```

---

# 81. Interview Question — Why Does Promise Run Before `setTimeout(..., 0)`?

Good answer:

```text
Promise .then() callbacks are microtasks.

setTimeout callbacks are normal tasks.

After the current synchronous code finishes,
microtasks are drained before
the next task is processed.
```

---

# 82. Interview Question — Is JavaScript Really Single-Threaded? 🔥🔥🔥

Good answer:

```text
JavaScript execution normally uses one main call stack,
so one piece of JavaScript runs at a time there.

But the browser/runtime can handle timers,
networking, events, and other work outside that stack.

The event loop later schedules ready callbacks
back into JavaScript execution.
```

---

# 83. Interview Question — Does `setTimeout(fn, 0)` Run Immediately?

Good answer:

```text
No.

It schedules the callback as a future task.

The callback can run only after
the current JavaScript work finishes
and scheduling rules allow that task to run.
```

---

# 84. Interview Question — Is Promise Executor Async? 🔥🔥🔥

Good answer:

```text
No.

The function passed to new Promise()
runs synchronously.

But then/catch/finally handlers
run asynchronously as microtasks.
```

---

# 85. Async Foundation Decision Guide 🔥🔥🔥

```text
Normal statement?
→ synchronous

Function currently executing?
→ on call stack

Timer started?
→ host handles timer

Timer callback ready?
→ task queue

Promise handler ready?
→ microtask queue

Current stack still busy?
→ queued work waits

Stack becomes empty?
→ drain microtasks

Microtasks empty?
→ run next task
```

---

# 86. Final Master Trace 🔥🔥🔥

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
setTimeout(
  () => {
    console.log(
      "Timer 1"
    );

    // Step 3:
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

// Step 4:
Promise.resolve()
  .then(
    () => {
      console.log(
        "Promise 1"
      );

      // Step 5:
      queueMicrotask(
        () => {
          console.log(
            "Microtask 2"
          );
        }
      );
    }
  );

// Step 6:
setTimeout(
  () => {
    console.log(
      "Timer 2"
    );
  },
  0
);

// Step 7:
console.log(
  "End"
);
```

Output:

```text
Start
End
Promise 1
Microtask 2
Timer 1
Promise Inside Timer
Timer 2
```

Complete trace:

```text
Synchronous:
Start

Timer 1 registered

Promise 1 microtask queued

Timer 2 registered

End

Stack empty

Microtasks:
Promise 1
↓
queues Microtask 2

Microtask queue still not empty
↓
Microtask 2

Microtasks empty

Next task:
Timer 1
↓
queues Promise Inside Timer

Timer 1 task finishes

Microtask checkpoint:
Promise Inside Timer

Next task:
Timer 2
```

---

# Quick Memory 🧠🔥🔥🔥

## Synchronous

```text
finish current work
before next work
```

## Asynchronous

```text
start now
complete later
```

## JavaScript Execution

```text
one main call stack
```

## Host / Browser

```text
timers
networking
events
other async facilities
```

## Call Stack

```text
currently executing JavaScript
```

## Event Loop

```text
coordinates queued work
with JavaScript execution
```

## Task / Macrotask

```text
setTimeout
setInterval
many events
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
Synchronous
↓
Microtasks
↓
Next Task
```

## `setTimeout(..., 0)`

```text
not immediate
```

## Promise Executor

```text
synchronous
```

## Promise Handler

```text
microtask
```

## Important Rule

```text
event loop does not interrupt
currently running JavaScript
```

## Timer Delay

```text
minimum-like scheduling delay,
not exact execution time
```

## Async vs Parallel

```text
async
≠ automatically parallel
```

## Best Output Strategy

```text
1. Write synchronous output
2. Record microtasks
3. Record tasks
4. Finish sync code
5. Drain microtasks
6. Run next task
7. Drain new microtasks
8. Repeat
```

## Most Important Interview Answer

```text
JavaScript executes code on one main call stack.

The host environment handles asynchronous facilities
such as timers, networking, and events.

When asynchronous work becomes ready,
its continuation is queued.

The event loop coordinates execution:
after current synchronous code finishes,
microtasks are drained before
the next normal task is executed.
```

---

# ✅ 8.1 Async JavaScript Foundation Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
```

Next topic:

```text
8.2 Timers 🔥🔥🔥
├── setTimeout()
├── setInterval()
├── clearTimeout()
├── clearInterval()
├── Delay Behaviour
├── Timer Ordering
├── Nested Timers
├── Drift Awareness
├── Practical Timer Utilities
└── Interview Questions
```

**Next: 8.2 Timers 🔥🔥🔥**
