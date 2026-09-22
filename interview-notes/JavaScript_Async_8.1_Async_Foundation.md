# 8.1 Async JavaScript Foundation 🔥🔥🔥

Async JavaScript is one of the most important interview topics.

Before learning:

```text
Callbacks
Promises
async/await
fetch
Promise.all()
race conditions
```

you must first understand the execution model.

Master mental model:

```text
JavaScript code
→ runs on one main call stack

Async work
→ can be handled by the runtime/environment

When async work is ready
→ callback/job waits in a queue

Event Loop
→ moves ready work to the call stack
  only when the stack is empty
```

The most important queues:

```text
Microtask Queue
→ Promise callbacks
→ queueMicrotask()

Task / Macrotask Queue
→ setTimeout()
→ setInterval()
→ many browser events
```

Priority mental model:

```text
Current synchronous code
↓
Microtasks
↓
Next task/macrotask
```

This chapter covers:

```text
Synchronous JavaScript
Asynchronous JavaScript
Single-Threaded Mental Model
Call Stack
Browser / Runtime APIs
Web APIs
Event Loop
Microtask Queue
Task / Macrotask Queue
Promise Jobs
setTimeout()
Execution Priority
Output Questions
Debugging
Interview Questions
```

---

# 1. What Is Synchronous JavaScript? 🔥🔥🔥

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

Nothing waits.

Nothing is scheduled for later.

---

# 2. Synchronous Execution Mental Model

```text
Statement 1
↓
complete

Statement 2
↓
complete

Statement 3
↓
complete
```

JavaScript executes the current synchronous code in order.

---

# 3. Long Synchronous Work Blocks Later Code 🔥🔥🔥

Example concept:

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
for (
  let i = 0;
  i < 1_000_000;
  i++
) {
  // Step 3:
  const value =
    i * 2;
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

But `End` cannot print until the loop finishes.

That is blocking synchronous work.

---

# 4. What Is Asynchronous JavaScript? 🔥🔥🔥

Asynchronous behavior means some work can be started now and completed later without blocking the current JavaScript call stack for the whole waiting period.

Example:

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
      "Timer"
    );
  },
  1000
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
Timer
```

---

# 5. Why Did `End` Print Before `Timer`?

Because JavaScript did not wait one second inside the call stack.

Mental flow:

```text
console.log("Start")
↓
runs now

setTimeout(...)
↓
timer registered with runtime

console.log("End")
↓
runs now

later timer becomes ready
↓
callback queued
↓
event loop eventually runs callback
```

---

# 6. JavaScript Is Single-Threaded — Practical Meaning 🔥🔥🔥

For normal JavaScript execution, think:

```text
one main call stack
```

That means:

```text
one JavaScript frame executes at a time
on that main stack
```

But this does NOT mean:

```text
the entire browser/runtime can only do one thing
```

---

# 7. Important Single-Threaded Correction 🔥🔥🔥

JavaScript can work with:

```text
timers
network requests
DOM events
file/system operations depending on runtime
```

because the host environment can manage work outside the main JavaScript call stack.

So:

```text
JavaScript execution
→ single main stack

Runtime/environment
→ can handle async operations
```

---

# 8. Call Stack Reminder 🔥🔥🔥

The Call Stack tracks active JavaScript function calls.

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
  console.log(
    "First Start"
  );

  // Step 3:
  second();

  // Step 4:
  console.log(
    "First End"
  );
}

// Step 5:
first();
```

Output:

```text
First Start
Second
First End
```

---

# 9. Call Stack Flow

```text
Global
↓
first()
↓
second()
```

Then:

```text
second finishes
↓
pop

first finishes
↓
pop
```

Async callbacks can only execute when JavaScript gets a chance to push them onto the stack.

---

# 10. What Are Web APIs? 🔥🔥🔥

In a browser, APIs such as:

```text
setTimeout
setInterval
fetch
DOM events
```

are provided by the browser environment.

They are not the JavaScript call stack itself.

---

# 11. Runtime APIs Mental Model

Think:

```text
JavaScript Engine
+
Host Environment
```

Browser example:

```text
JavaScript engine
+
Web APIs
+
Task queues
+
Event Loop
```

Node.js has a different host runtime internally, but the high-level async mental model remains similar.

---

# 12. `setTimeout()` Does Not Sleep the JavaScript Thread 🔥🔥🔥

Wrong mental model:

```text
setTimeout(1000)
→ JavaScript sleeps for one second
```

Correct mental model:

```text
register timer
↓
continue synchronous code
↓
timer becomes eligible later
↓
callback queued
```

---

# 13. Zero-Millisecond Timer Is Still Asynchronous 🔥🔥🔥

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

# 14. Why `setTimeout(..., 0)` Does Not Run Immediately

`0` does not mean:

```text
run right now
```

It means roughly:

```text
timer can become ready with no requested delay
```

But the callback still waits for:

```text
current synchronous work
↓
queue scheduling
↓
event loop
```

---

# 15. Event Loop 🔥🔥🔥

The Event Loop coordinates when queued async work can run.

Basic mental model:

```text
Is call stack empty?
↓
yes
↓
is there ready queued work?
↓
yes
↓
schedule next allowed callback/job
```

---

# 16. Event Loop Does Not Interrupt Running JavaScript 🔥🔥🔥

If JavaScript is currently executing a long synchronous function:

```text
event loop does NOT suddenly pause it
and run a timer callback in the middle
```

The current stack must finish first.

---

# 17. Long Blocking Example

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
let total =
  0;

// Step 4:
for (
  let i = 0;
  i < 1_000_000;
  i++
) {
  total += i;
}

// Step 5:
console.log(
  "Loop Done"
);
```

Output order:

```text
Loop Done
Timer
```

Even if the timer became ready earlier, its callback waits until synchronous work finishes.

---

# 18. Task / Macrotask Queue 🔥🔥🔥

A common interview mental model is:

```text
Task Queue
or
Macrotask Queue
```

Examples commonly associated with tasks:

```text
setTimeout callback
setInterval callback
many DOM events
message events
```

Terminology varies, but interviews often say:

```text
macrotask queue
```

---

# 19. Microtask Queue 🔥🔥🔥

Microtasks have higher priority than the next task.

Common sources:

```text
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()
```

---

# 20. Core Priority Rule 🔥🔥🔥

After current synchronous JavaScript finishes:

```text
drain microtasks
↓
then move to next task/macrotask
```

This rule is critical.

---

# 21. Promise Callback Example 🔥🔥🔥

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
Promise.resolve()
  .then(
    () => {
      // Step 3:
      console.log(
        "B"
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
C
B
```

The `.then()` callback is asynchronous.

---

# 22. Promise Callback Is a Microtask

Mental flow:

```text
Promise resolved
↓
.then callback scheduled
↓
Microtask Queue
↓
runs after synchronous code
```

---

# 23. Timer vs Promise 🔥🔥🔥

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

---

# 24. Why Promise Runs Before Timer

Because:

```text
Promise callback
→ microtask

setTimeout callback
→ task/macrotask
```

After sync code:

```text
microtasks first
↓
next task
```

---

# 25. Full Queue Mental Model 🔥🔥🔥

```text
Call Stack
↓
current synchronous code runs

Async APIs
↓
work happens / becomes ready

Microtask Queue
→ high-priority queued jobs

Task Queue
→ timers/events/etc.

Event Loop
↓
after current task:
drain microtasks
↓
then next task
```

---

# 26. Microtask Queue Is Drained 🔥🔥🔥

Important:

JavaScript generally processes:

```text
all currently queued microtasks
```

before moving to the next task.

So microtasks can schedule more microtasks.

---

# 27. Microtask Scheduling Another Microtask

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      console.log(
        "Microtask 1"
      );

      // Step 3:
      Promise.resolve()
        .then(
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
setTimeout(
  () => {
    // Step 6:
    console.log(
      "Timer"
    );
  },
  0
);
```

Output:

```text
Microtask 1
Microtask 2
Timer
```

---

# 28. `queueMicrotask()` 🔥🔥

`queueMicrotask()` explicitly schedules a microtask.

Example:

```js
// Step 1:
console.log(
  "A"
);

// Step 2:
queueMicrotask(
  () => {
    // Step 3:
    console.log(
      "B"
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
C
B
```

---

# 29. `queueMicrotask()` vs `setTimeout()`

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
queueMicrotask(
  () => {
    // Step 4:
    console.log(
      "Microtask"
    );
  }
);
```

Output:

```text
Microtask
Timer
```

---

# 30. Current Script Is Also a Task — Awareness 🔥🔥

In browser event-loop terminology, the currently executing script is itself run as part of a task.

Practical interview simplification:

```text
current sync code
↓
microtasks
↓
next task
```

This is usually enough.

---

# 31. Event Loop Does More Than Just Two Queues

Real environments are more complex than:

```text
one microtask queue
+
one macrotask queue
```

Browsers have task sources and rendering phases.

Node.js has event-loop phases.

But for interviews:

```text
sync
→ microtasks
→ tasks
```

is the essential starting model.

---

# 32. Output Question 1 🔥🔥🔥

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

---

# 33. Output Question 2

```js
// Step 1:
console.log(
  "Start"
);

// Step 2:
Promise.resolve()
  .then(
    () => {
      // Step 3:
      console.log(
        "Promise"
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
Promise
```

---

# 34. Output Question 3 🔥🔥🔥

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

# 35. Output Question 4 — Multiple Microtasks

```js
// Step 1:
Promise.resolve()
  .then(
    () => {
      // Step 2:
      console.log(
        "P1"
      );
    }
  );

// Step 3:
Promise.resolve()
  .then(
    () => {
      // Step 4:
      console.log(
        "P2"
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
P1
P2
```

Microtasks generally run in queue order.

---

# 36. Output Question 5 — Timer Creates Microtask 🔥🔥🔥

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer Start"
    );

    // Step 3:
    Promise.resolve()
      .then(
        () => {
          // Step 4:
          console.log(
            "Promise Inside Timer"
          );
        }
      );

    // Step 5:
    console.log(
      "Timer End"
    );
  },
  0
);
```

Output:

```text
Timer Start
Timer End
Promise Inside Timer
```

Why?

Inside the timer task:

```text
sync callback body runs first
↓
microtask runs after callback stack clears
```

---

# 37. Output Question 6 — Two Timers + Promise

```js
// Step 1:
setTimeout(
  () => {
    // Step 2:
    console.log(
      "Timer 1"
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
setTimeout(
  () => {
    // Step 6:
    console.log(
      "Timer 2"
    );
  },
  0
);
```

Typical output:

```text
Promise
Timer 1
Timer 2
```

The two timers are queued as tasks, while the Promise callback is a microtask.

---

# 38. Output Question 7 — Nested Promise 🔥🔥🔥

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
Promise.resolve()
  .then(
    () => {
      // Step 6:
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

Initial microtask queue:

```text
A callback
C callback
```

During `A`:

```text
B callback is added to end
```

So:

```text
A
C
B
```

---

# 39. Output Question 8 — Sync Inside Promise Setup

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
promise.then(
  () => {
    // Step 5:
    console.log(
      "Then"
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
Executor
End
Then
```

---

# 40. Promise Executor Runs Synchronously 🔥🔥🔥

Very important.

This part:

```js
// Step 1:
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
```

runs the executor function immediately.

What becomes asynchronous is the reaction callback such as:

```text
.then(...)
```

---

# 41. Promise Mental Model

```text
new Promise(executor)
↓
executor runs synchronously

resolve()
↓
promise becomes fulfilled

.then(callback)
↓
callback runs as microtask
```

---

# 42. `resolve()` Does Not Immediately Run `.then()` 🔥🔥🔥

```js
// Step 1:
const promise =
  new Promise(
    (
      resolve
    ) => {
      // Step 2:
      resolve();

      // Step 3:
      console.log(
        "Resolved"
      );
    }
  );

// Step 4:
promise.then(
  () => {
    // Step 5:
    console.log(
      "Then"
    );
  }
);
```

Output:

```text
Resolved
Then
```

---

# 43. Why Async JavaScript Exists 🔥🔥🔥

Without async handling, waiting operations such as:

```text
network request
timer
user interaction
```

could block the main JavaScript execution.

Async APIs allow JavaScript to:

```text
start waiting work
↓
continue useful work
↓
handle result later
```

---

# 44. Real App Example — API Search Mental Model

```text
User types "rahul"
↓
request starts
↓
JavaScript does not freeze UI waiting
↓
browser/runtime handles network
↓
response arrives
↓
continuation runs later
↓
UI updates
```

This is the foundation for `fetch()`.

---

# 45. Real App Example — Button Click

```text
page loads
↓
listener registered
↓
JavaScript continues
↓
user clicks later
↓
event callback becomes runnable
↓
callback executes
```

The callback does not run at registration time.

---

# 46. Event Listener Registration Example

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
      "Saved"
    );
  }
);
```

Mental model:

```text
register callback now
↓
execute callback later
when click event occurs
```

---

# 47. Blocking the Main Thread Hurts UI 🔥🔥🔥

In browser applications, long synchronous JavaScript can delay:

```text
click handling
typing responsiveness
rendering
timers
other callbacks
```

because the main JavaScript stack is busy.

---

# 48. Async Does NOT Automatically Mean Parallel JavaScript 🔥🔥🔥

Important interview correction.

Async means:

```text
work can complete later
without blocking the call stack during waiting
```

It does not automatically mean:

```text
two JavaScript callbacks run simultaneously
on the same main stack
```

They still execute one at a time on that stack.

---

# 49. Concurrency vs Parallelism — Awareness

Simple mental model:

```text
Concurrency
→ multiple operations can be in progress

Parallelism
→ multiple operations execute literally at same time
```

JavaScript async workflows often provide concurrency even though main-stack callback execution remains one-at-a-time.

---

# 50. Web Workers — Awareness Only 🔥🔥

Browsers can run JavaScript in separate worker contexts.

That is different from normal single-main-thread async callbacks.

For this chapter, remember:

```text
normal browser JS callback execution
→ main call stack

workers
→ separate execution context/thread
```

---

# 51. Debugging Rule — Separate Sync and Async 🔥🔥🔥

When predicting output:

First mark:

```text
S = synchronous
M = microtask
T = task/macrotask
```

Example:

```text
console.log("A") → S
Promise.then(...) → M
setTimeout(...) → T
console.log("B") → S
```

Then order:

```text
S
↓
M
↓
T
```

---

# 52. Debugging Example With Labels

```js
// Step 1: Synchronous.
console.log(
  "A"
);

// Step 2: Task.
setTimeout(
  () => {
    console.log(
      "B"
    );
  },
  0
);

// Step 3: Microtask.
Promise.resolve()
  .then(
    () => {
      console.log(
        "C"
      );
    }
  );

// Step 4: Synchronous.
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

# 53. Do Not Think "Declared First Means Runs First"

Wrong:

```text
timer written before Promise
→ timer must run first
```

Correct:

```text
queue priority matters
```

Promise microtask can run before an earlier timer task.

---

# 54. Do Not Think "0 ms Means Immediate" 🔥🔥🔥

Wrong:

```text
setTimeout(fn, 0)
→ immediate
```

Correct:

```text
setTimeout(fn, 0)
→ schedule callback for a future task
```

---

# 55. Do Not Think Promise Executor Is Async

Wrong:

```text
everything inside new Promise(...)
runs later
```

Correct:

```text
Promise executor
→ synchronous

.then/catch/finally callbacks
→ microtasks
```

---

# 56. Do Not Think Event Loop Runs While Stack Is Busy 🔥🔥🔥

Wrong:

```text
timer ready
→ interrupts current function
```

Correct:

```text
timer ready
→ waits
→ current stack must clear first
```

---

# 57. Interview Question — Is JavaScript Single-Threaded? 🔥🔥🔥

Good answer:

```text
JavaScript code on the main execution thread
uses one call stack and executes one frame at a time.

The host environment can handle asynchronous work
such as timers, network operations, and events
outside that stack.

Ready callbacks are scheduled back to JavaScript
through queues and the event loop.
```

---

# 58. Interview Question — What Is the Event Loop?

Good answer:

```text
The event loop coordinates queued asynchronous work
with the JavaScript call stack.

When the current stack/task finishes,
microtasks are processed,
and then the runtime can move to the next task.
```

---

# 59. Interview Question — Microtask vs Macrotask 🔥🔥🔥

Good answer:

```text
Microtasks include Promise reactions
and queueMicrotask callbacks.

Tasks/macrotasks include things such as
setTimeout and setInterval callbacks.

After synchronous execution,
microtasks are drained before
the next task is processed.
```

---

# 60. Interview Question — Why Does Promise Run Before `setTimeout(0)`?

Good answer:

```text
Promise callbacks are scheduled as microtasks.

setTimeout callbacks are scheduled as tasks.

After the current synchronous work finishes,
the runtime drains microtasks
before processing the next task.
```

---

# 61. Interview Question — Does `setTimeout(0)` Mean Zero Delay?

Good answer:

```text
No.

It means there is no requested waiting delay
beyond the timer scheduling rules,
but the callback still runs later.

It must wait for current JavaScript execution,
queue scheduling,
and the event loop.
```

---

# 62. Interview Question — Is `new Promise()` Asynchronous?

Good answer:

```text
The Promise executor runs synchronously.

Promise reaction callbacks such as
then, catch, and finally
run asynchronously as microtasks.
```

---

# 63. Interview Question — What Happens If the Stack Never Clears?

Good answer:

```text
Queued callbacks cannot run.

Timers, Promise continuations,
and event callbacks must wait
until current synchronous JavaScript yields.
```

---

# 64. Interview Question — Can Microtasks Delay Timers? 🔥🔥🔥

Good answer:

```text
Yes.

Microtasks are drained before the next task.

If code keeps scheduling more microtasks,
the next timer/task can be delayed.
```

This is sometimes called:

```text
microtask starvation
```

awareness.

---

# 65. Microtask Starvation Awareness

Concept:

```text
microtask
↓
adds another microtask
↓
adds another
↓
continues repeatedly
```

Then:

```text
next task may be delayed
```

Do not intentionally create endless microtask chains.

---

# 66. Real App Debugging Example 🔥🔥🔥

Problem:

```text
"I scheduled a timer for 0 ms,
but it runs late."
```

Possible reason:

```text
long synchronous JavaScript
↓
stack busy
↓
timer callback cannot execute yet
```

So check blocking work first.

---

# 67. Real App Debugging Example — Promise Order

Problem:

```text
"Why did my Promise callback run
before my timer?"
```

Answer:

```text
Promise callback
→ microtask

timer
→ task

microtask priority wins
after current sync code
```

---

# 68. Async Foundation Decision Guide 🔥🔥🔥

```text
Runs immediately?
→ synchronous

Promise.then/catch/finally?
→ microtask

queueMicrotask()?
→ microtask

setTimeout/setInterval?
→ task/macrotask

Current call stack busy?
→ async callbacks wait

Need output order?
→ trace:
  sync
  ↓
  microtasks
  ↓
  tasks
```

---

# 69. Final Master Output Trace 🔥🔥🔥

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
  },
  0
);

// Step 6:
Promise.resolve()
  .then(
    () => {
      // Step 7:
      console.log(
        "D"
      );

      // Step 8:
      queueMicrotask(
        () => {
          // Step 9:
          console.log(
            "E"
          );
        }
      );
    }
  );

// Step 10:
console.log(
  "F"
);
```

Output:

```text
A
F
D
E
B
C
```

---

# 70. Final Master Trace Explanation 🔥🔥🔥

Start:

```text
console.log("A")
→ synchronous
→ A
```

Timer:

```text
setTimeout(...)
→ callback scheduled for future task
```

Promise:

```text
Promise.then(...)
→ D callback becomes microtask
```

Then:

```text
console.log("F")
→ synchronous
→ F
```

Current synchronous code ends.

Now microtasks:

```text
D runs
↓
prints D
↓
queueMicrotask(E)
↓
E added to microtask queue
```

Microtask queue continues:

```text
E
```

Now next task:

```text
timer callback
↓
prints B
↓
schedules Promise microtask C
```

Timer callback finishes.

Then microtask checkpoint:

```text
C
```

Final:

```text
A
F
D
E
B
C
```

---

# Quick Memory 🧠🔥🔥🔥

## Synchronous

```text
run now
finish
next line
```

## Asynchronous

```text
start now
complete/continue later
```

## JavaScript Main Execution

```text
one main call stack
```

## Host Environment

```text
handles timers
network
events
other async work
```

## Event Loop

```text
coordinates
stack + queues
```

## Microtask

```text
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()
```

## Task / Macrotask

```text
setTimeout()
setInterval()
many events
```

## Priority

```text
Synchronous code
↓
Microtasks
↓
Next task
```

## `setTimeout(0)`

```text
not immediate
```

## Promise Executor

```text
runs synchronously
```

## `.then()`

```text
runs as microtask
```

## Stack Busy

```text
callbacks wait
```

## Best Output Rule

```text
Label each line:

S
M
T

Then execute:

S
↓
M
↓
T
```

## Most Important Interview Answer

```text
JavaScript uses one main call stack
for normal execution.

The host environment handles asynchronous work.

When async work becomes ready,
its callback/job is queued.

After current synchronous code finishes,
microtasks are processed before
the next task/macrotask.

That coordination is the core
of the JavaScript event loop model.
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
├── clearTimeout()
├── setInterval()
├── clearInterval()
├── Timer Delay
├── Zero Delay
├── Nested Timers
├── Timer Drift Awareness
├── Cleanup
├── Practical Polling
└── Output Questions
```

**Next: 8.2 Timers 🔥🔥🔥**
