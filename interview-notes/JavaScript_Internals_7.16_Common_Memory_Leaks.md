# 7.16 Common Memory Leaks 🔥🔥🔥

A **memory leak** happens when memory stays reachable even though the application no longer needs it.

Master mental model:

```text
unused data
+
still reachable
+
not released
=
memory leak
```

This is different from:

```text
temporary high memory usage
```

A memory leak means:

```text
memory keeps staying alive
because something still references it
```

Common JavaScript memory leak sources:

```text
Timers
Event Listeners
Closures
Global Variables
Caches
Detached DOM Nodes
Subscriptions
Observers
Long-Lived Collections
Forgotten References
```

The most important debugging question is:

```text
Who is still retaining this object?
```

This chapter covers:

```text
What Is a Memory Leak?
Reachability Reminder
Timers
setInterval()
setTimeout()
Event Listeners
Anonymous Listener Problem
Closures
Global Variables
Caches
Map / Set Retention
Detached DOM Nodes
Subscriptions
Observers
AbortController Cleanup Awareness
React Cleanup Mental Model
Memory Leak Symptoms
Heap Snapshots
Retainers
Debugging Strategy
Output Questions
Interview Questions
```

---

# 1. What Is a Memory Leak? 🔥🔥🔥

A memory leak happens when:

```text
the program no longer needs some data
```

but:

```text
that data is still reachable
```

Therefore:

```text
garbage collector cannot reclaim it
```

---

# 2. Memory Leak vs Normal Memory Usage 🔥🔥🔥

Normal:

```text
create data
↓
use data
↓
data becomes unreachable
↓
GC can reclaim it
```

Leak:

```text
create data
↓
use data
↓
should be finished
↓
some reference still keeps it alive
↓
GC cannot reclaim it
```

---

# 3. Reachability Reminder 🔥🔥🔥

Garbage collector works mainly from reachability.

If an object is still reachable through:

```text
global
timer
listener
closure
cache
collection
DOM reference
subscription
```

then it stays alive.

---

# 4. Leak Does NOT Mean Garbage Collector Is Broken

Usually the garbage collector is doing the correct thing.

If an object is still reachable:

```text
GC must keep it
```

The bug is often:

```text
application forgot to release a reference
```

---

# 5. Common Leak Pattern

```text
create resource
↓
register/store reference
↓
resource no longer needed
↓
cleanup forgotten
↓
reference remains
↓
memory remains reachable
```

This same pattern appears in many different forms.

---

# 6. Timer Leak — `setInterval()` 🔥🔥🔥

`setInterval()` keeps running until you stop it.

Example:

```js
// Step 1:
const intervalId =
  setInterval(
    () => {
      // Step 2:
      console.log(
        "Running"
      );
    },
    1000
  );

// Step 3:
console.log(
  typeof intervalId
);
```

Output:

```text
environment-dependent timer handle type
```

The exact timer ID type depends on the runtime.

Important point:

```text
interval remains active
until cleared
```

---

# 7. Why `setInterval()` Can Cause Memory Leaks 🔥🔥🔥

If the interval callback closes over data:

```text
interval
→ callback
→ closure
→ data
```

that data can remain reachable as long as the interval exists.

---

# 8. Interval Retaining Data Example 🔥🔥🔥

```js
function startTracker() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "employee"
    );

  // Step 2:
  const intervalId =
    setInterval(
      () => {
        // Step 3:
        console.log(
          largeData.length
        );
      },
      1000
    );

  // Step 4:
  return intervalId;
}

// Step 5:
const intervalId =
  startTracker();
```

Mental model:

```text
interval
↓
callback
↓
largeData
```

Even after `startTracker()` finishes, `largeData` remains reachable.

---

# 9. Correct Interval Cleanup 🔥🔥🔥

```js
// Step 1:
const intervalId =
  setInterval(
    () => {
      // Step 2:
      console.log(
        "Running"
      );
    },
    1000
  );

// Step 3:
clearInterval(
  intervalId
);
```

Cleanup rule:

```text
setInterval()
→ clearInterval()
```

---

# 10. Cleanup Function Pattern 🔥🔥🔥

A very useful pattern is returning a cleanup function.

```js
function startTracking() {
  // Step 1:
  const intervalId =
    setInterval(
      () => {
        // Step 2:
        console.log(
          "Tracking"
        );
      },
      1000
    );

  // Step 3:
  return function cleanup() {
    // Step 4:
    clearInterval(
      intervalId
    );
  };
}

// Step 5:
const cleanup =
  startTracking();

// Step 6:
cleanup();
```

This pattern appears everywhere in frontend development.

---

# 11. `setTimeout()` Can Also Retain Data 🔥🔥

A timeout usually runs once.

But until it runs or is cancelled:

```text
timer
→ callback
→ captured data
```

can remain reachable.

---

# 12. Timeout Retention Example

```js
function scheduleTask() {
  // Step 1:
  const data =
    new Array(
      1000
    ).fill(
      "data"
    );

  // Step 2:
  const timeoutId =
    setTimeout(
      () => {
        // Step 3:
        console.log(
          data.length
        );
      },
      60000
    );

  // Step 4:
  return timeoutId;
}

// Step 5:
const timeoutId =
  scheduleTask();
```

For the timeout lifetime:

```text
data stays reachable
```

through the callback.

---

# 13. Cancel Timeout When No Longer Needed

```js
// Step 1:
const timeoutId =
  setTimeout(
    () => {
      // Step 2:
      console.log(
        "Done"
      );
    },
    60000
  );

// Step 3:
clearTimeout(
  timeoutId
);
```

Rule:

```text
setTimeout()
→ clearTimeout()
when cancellation is needed
```

---

# 14. Timer Leak Mental Model 🔥🔥🔥

```text
Component / Feature starts
↓
timer registered
↓
feature ends
↓
timer still alive
↓
callback still reachable
↓
captured data still reachable
↓
possible leak
```

---

# 15. Event Listener Leak 🔥🔥🔥

Event listeners can keep callback functions alive.

And callbacks can keep other data alive through closures.

Mental model:

```text
event target
↓
listener callback
↓
closure
↓
data
```

---

# 16. Basic Event Listener

```js
function handleClick() {
  // Step 1:
  console.log(
    "Clicked"
  );
}

// Step 2:
document.addEventListener(
  "click",
  handleClick
);
```

This listener stays registered until removed.

---

# 17. Remove Event Listener Correctly 🔥🔥🔥

```js
function handleClick() {
  // Step 1:
  console.log(
    "Clicked"
  );
}

// Step 2:
document.addEventListener(
  "click",
  handleClick
);

// Step 3:
document.removeEventListener(
  "click",
  handleClick
);
```

Important:

```text
removeEventListener()
needs the same function reference
```

---

# 18. Anonymous Listener Cleanup Problem 🔥🔥🔥

Problem:

```js
// Step 1:
document.addEventListener(
  "click",
  () => {
    // Step 2:
    console.log(
      "Clicked"
    );
  }
);
```

Later, this does NOT remove the original listener:

```js
// Step 1:
document.removeEventListener(
  "click",
  () => {
    // Step 2:
    console.log(
      "Clicked"
    );
  }
);
```

Why?

Those are two different function objects.

---

# 19. Function Reference Equality Explains Listener Cleanup

```js
// Step 1:
const first =
  () => {
    return 1;
  };

// Step 2:
const second =
  () => {
    return 1;
  };

// Step 3:
console.log(
  first === second
); // Output: false
```

Output:

```text
false
```

Same code does not mean same function reference.

---

# 20. Better Listener Pattern 🔥🔥🔥

```js
// Step 1:
const handleClick =
  () => {
    console.log(
      "Clicked"
    );
  };

// Step 2:
document.addEventListener(
  "click",
  handleClick
);

// Step 3:
document.removeEventListener(
  "click",
  handleClick
);
```

Store the callback reference if you will need to remove it.

---

# 21. Listener Retaining Large Data 🔥🔥🔥

```js
function setup() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "employee"
    );

  // Step 2:
  const handler =
    () => {
      return largeData.length;
    };

  // Step 3:
  document.addEventListener(
    "click",
    handler
  );

  // Step 4:
  return handler;
}
```

Mental model:

```text
document
↓
handler
↓
largeData
```

If handler is never removed:

```text
largeData can remain reachable
```

---

# 22. Listener Cleanup Function Pattern

```js
function setup() {
  // Step 1:
  const handler =
    () => {
      console.log(
        "Clicked"
      );
    };

  // Step 2:
  document.addEventListener(
    "click",
    handler
  );

  // Step 3:
  return function cleanup() {
    // Step 4:
    document.removeEventListener(
      "click",
      handler
    );
  };
}

// Step 5:
const cleanup =
  setup();

// Step 6:
cleanup();
```

---

# 23. Closures Can Retain Data 🔥🔥🔥

Closures are not leaks by themselves.

But a closure can keep large data alive longer than intended.

Example:

```js
function createHandler() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "data"
    );

  // Step 2:
  return function handler() {
    return largeData.length;
  };
}

// Step 3:
const handler =
  createHandler();

// Step 4:
console.log(
  handler()
); // Output: 1000
```

Output:

```text
1000
```

---

# 24. Closure Retention Is Normal When Needed

Here:

```text
handler needs largeData
```

So retaining it is correct.

The question is:

```text
Does the application still need handler?
```

If yes:

```text
not a leak
```

If no, but handler is still retained:

```text
possible leak
```

---

# 25. Closure Leak Pattern 🔥🔥🔥

```text
long-lived listener/timer/cache
↓
stores callback
↓
callback closes over large object
↓
large object remains reachable
↓
feature no longer needs it
↓
memory leak
```

---

# 26. Global Variable Leak 🔥🔥🔥

Globals often live for the whole app lifetime.

Example:

```js
// Step 1:
globalThis.employeeData =
  new Array(
    1000
  ).fill(
    "employee"
  );

// Step 2:
console.log(
  globalThis.employeeData.length
); // Output: 1000
```

Output:

```text
1000
```

As long as the global reference exists:

```text
data remains reachable
```

---

# 27. Accidental Globals Were Historically Dangerous

In sloppy mode, code like:

```text
employeeData = [...]
```

could create a global.

Strict Mode helps prevent that.

This connects directly to the Strict Mode chapter.

---

# 28. Avoid Unnecessary Globals 🔥🔥🔥

Prefer local/module scope when possible.

Bad mental model:

```text
everything stored on globalThis
```

Better:

```text
keep data in smallest useful scope
```

Smaller scope usually means easier lifetime management.

---

# 29. Cache Leak 🔥🔥🔥

Caches are useful.

But an unlimited cache can become a leak-like memory problem.

Example:

```js
// Step 1:
const cache =
  new Map();

// Step 2:
function saveEmployee(
  employee
) {
  cache.set(
    employee.id,
    employee
  );
}

// Step 3:
saveEmployee(
  {
    id: 1,
    name: "Rahul",
  }
);

// Step 4:
console.log(
  cache.size
); // Output: 1
```

Output:

```text
1
```

The object remains reachable through `cache`.

---

# 30. Cache Is Not Automatically a Leak

A cache is legitimate if:

```text
stored data is useful
+
bounded/managed
+
removed when appropriate
```

It becomes problematic when:

```text
cache grows forever
+
old entries are never removed
+
data is no longer useful
```

---

# 31. Unbounded Cache Pattern 🔥🔥🔥

```text
request arrives
↓
store result in cache
↓
next request
↓
store result
↓
never evict
↓
cache grows forever
```

That is a classic memory-growth problem.

---

# 32. Simple Cache Cleanup

```js
// Step 1:
const cache =
  new Map();

// Step 2:
cache.set(
  1,
  {
    name: "Rahul",
  }
);

// Step 3:
cache.delete(
  1
);

// Step 4:
console.log(
  cache.size
); // Output: 0
```

Output:

```text
0
```

---

# 33. Clear Entire Cache When Appropriate

```js
// Step 1:
const cache =
  new Map(
    [
      [
        1,
        "A",
      ],
      [
        2,
        "B",
      ],
    ]
  );

// Step 2:
cache.clear();

// Step 3:
console.log(
  cache.size
); // Output: 0
```

Output:

```text
0
```

---

# 34. Cache Eviction Awareness 🔥🔥

Real caches often need an eviction strategy such as:

```text
maximum size
TTL
LRU
manual invalidation
```

Deep cache design is outside this chapter.

Interview point:

```text
a cache needs a lifetime policy
```

---

# 35. `Map` Can Retain Object Keys 🔥🔥🔥

```js
// Step 1:
let user = {
  id: 1,
};

// Step 2:
const map =
  new Map();

// Step 3:
map.set(
  user,
  "metadata"
);

// Step 4:
user =
  null;

// Step 5:
console.log(
  map.size
); // Output: 1
```

Output:

```text
1
```

The original object key is still strongly retained by the `Map`.

---

# 36. `Set` Can Retain Objects Too

```js
// Step 1:
let user = {
  id: 1,
};

// Step 2:
const set =
  new Set();

// Step 3:
set.add(
  user
);

// Step 4:
user =
  null;

// Step 5:
console.log(
  set.size
); // Output: 1
```

Output:

```text
1
```

---

# 37. WeakMap Awareness for Metadata 🔥🔥

For object-associated metadata, `WeakMap` can be useful.

Mental model:

```text
object key
↓
WeakMap metadata
```

If the object becomes otherwise unreachable:

```text
WeakMap does not keep it alive by itself
```

---

# 38. WeakMap Is Not a Normal Cache Replacement

WeakMap restrictions matter.

For example:

```text
keys must be objects or non-registered symbols
entries are not normally enumerable
size is not exposed
```

Use it when weak-key lifetime behavior is actually desired.

---

# 39. Detached DOM Node Leak 🔥🔥🔥

A detached DOM node is:

```text
removed from the document
BUT
still referenced by JavaScript
```

Then the node cannot be garbage-collected.

---

# 40. Detached DOM Mental Model

```text
DOM
↓
element

remove element from DOM
↓
DOM no longer references it

BUT

JavaScript variable/cache
↓
still references element

therefore:
element stays alive
```

---

# 41. Detached DOM Example

```js
// Step 1:
const element =
  document.createElement(
    "div"
  );

// Step 2:
document.body.appendChild(
  element
);

// Step 3:
element.remove();

// Step 4:
console.log(
  element.tagName
); // Output: DIV
```

Output:

```text
DIV
```

The node was removed from the DOM.

But the JavaScript variable still references it.

---

# 42. Detached DOM Is Not Automatically a Leak

If the code still intentionally needs `element`:

```text
keeping reference is fine
```

It becomes a leak when:

```text
node is no longer needed
BUT
long-lived code keeps referencing it
```

---

# 43. Long-Lived DOM Cache Problem 🔥🔥🔥

```js
// Step 1:
const nodeCache = [];

// Step 2:
const element =
  document.createElement(
    "div"
  );

// Step 3:
nodeCache.push(
  element
);

// Step 4:
element.remove();

// Step 5:
console.log(
  nodeCache.length
); // Output: 1
```

Output:

```text
1
```

The cache still retains the detached node.

---

# 44. DOM Cache Cleanup

```js
// Step 1:
const nodeCache = [];

// Step 2:
const element =
  document.createElement(
    "div"
  );

// Step 3:
nodeCache.push(
  element
);

// Step 4:
nodeCache.pop();

// Step 5:
console.log(
  nodeCache.length
); // Output: 0
```

Output:

```text
0
```

If no other references remain:

```text
node may become collectible
```

---

# 45. Subscription Leak 🔥🔥🔥

Many systems use subscriptions.

Examples:

```text
WebSocket
event bus
RxJS observable
custom store
message stream
third-party SDK
```

Pattern:

```text
subscribe
↓
callback registered
↓
feature ends
↓
unsubscribe forgotten
↓
callback still retained
```

---

# 46. Custom Subscription Example

```js
// Step 1:
const listeners =
  new Set();

// Step 2:
function subscribe(
  listener
) {
  listeners.add(
    listener
  );

  // Step 3:
  return function unsubscribe() {
    listeners.delete(
      listener
    );
  };
}

// Step 4:
const unsubscribe =
  subscribe(
    () => {
      console.log(
        "Updated"
      );
    }
  );

// Step 5:
console.log(
  listeners.size
); // Output: 1

// Step 6:
unsubscribe();

// Step 7:
console.log(
  listeners.size
); // Output: 0
```

Output:

```text
1
0
```

---

# 47. Why Subscription Cleanup Matters 🔥🔥🔥

The subscription source may keep:

```text
callback
↓
closure
↓
component/feature data
```

alive.

So cleanup removes the entire retention path.

---

# 48. Observer Leak Awareness 🔥🔥

Browser APIs may also register observers.

Examples:

```text
MutationObserver
ResizeObserver
IntersectionObserver
```

These often have cleanup methods such as:

```text
disconnect()
unobserve()
```

The exact method depends on the API.

---

# 49. MutationObserver Cleanup Example

```js
// Step 1:
const observer =
  new MutationObserver(
    () => {
      console.log(
        "Changed"
      );
    }
  );

// Step 2:
observer.observe(
  document.body,
  {
    childList: true,
  }
);

// Step 3:
observer.disconnect();
```

Cleanup:

```text
observer.disconnect()
```

---

# 50. AbortController Cleanup Awareness 🔥🔥

`AbortController` can help cancel certain async operations or event listeners.

Example:

```js
// Step 1:
const controller =
  new AbortController();

// Step 2:
document.addEventListener(
  "click",
  () => {
    console.log(
      "Clicked"
    );
  },
  {
    signal:
      controller.signal,
  }
);

// Step 3:
controller.abort();
```

Aborting removes listeners registered with that signal.

---

# 51. Async Operation Retention Awareness

An async task may retain:

```text
callback
promise chain
captured data
request state
```

until completion or cancellation.

This is not automatically a leak.

The question is:

```text
Should this operation still be alive?
```

---

# 52. React Cleanup Mental Model 🔥🔥🔥

In React, a common pattern is:

```text
component mounts
↓
start timer/listener/subscription
↓
component unmounts
↓
cleanup resource
```

Conceptually:

```text
setup
→ return cleanup
```

---

# 53. React `useEffect` Cleanup Example 🔥🔥🔥

```js
useEffect(
  () => {
    // Step 1:
    const intervalId =
      setInterval(
        () => {
          console.log(
            "Polling"
          );
        },
        1000
      );

    // Step 2:
    return () => {
      clearInterval(
        intervalId
      );
    };
  },
  []
);
```

Mental model:

```text
effect starts interval
↓
cleanup clears interval
```

---

# 54. React Listener Cleanup Example

```js
useEffect(
  () => {
    // Step 1:
    const handleResize =
      () => {
        console.log(
          window.innerWidth
        );
      };

    // Step 2:
    window.addEventListener(
      "resize",
      handleResize
    );

    // Step 3:
    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  },
  []
);
```

---

# 55. Missing Effect Cleanup Can Cause Problems 🔥🔥🔥

Bad pattern:

```js
useEffect(
  () => {
    // Step 1:
    window.addEventListener(
      "resize",
      () => {
        console.log(
          window.innerWidth
        );
      }
    );
  },
  []
);
```

Problems:

```text
anonymous callback reference not stored
cleanup missing
listener can remain registered
```

---

# 56. Repeated Setup Without Cleanup 🔥🔥🔥

Another leak pattern:

```text
render/setup
↓
register listener
↓
render/setup again
↓
register another listener
↓
repeat
```

If previous listeners are never removed:

```text
number of listeners keeps increasing
```

---

# 57. Duplicate Listener Example — Concept

```js
function attach() {
  // Step 1:
  const handler =
    () => {
      console.log(
        "Resize"
      );
    };

  // Step 2:
  window.addEventListener(
    "resize",
    handler
  );

  // Step 3:
  return handler;
}
```

Calling `attach()` repeatedly creates different callback references each time.

Without cleanup:

```text
listeners accumulate
```

---

# 58. Long-Lived Array Leak Pattern 🔥🔥🔥

```js
// Step 1:
const history = [];

// Step 2:
function record(
  event
) {
  history.push(
    event
  );
}

// Step 3:
record(
  {
    type: "CLICK",
  }
);

// Step 4:
console.log(
  history.length
); // Output: 1
```

Output:

```text
1
```

If `history` grows forever:

```text
memory usage can grow forever
```

---

# 59. Bounded History Pattern

```js
// Step 1:
const history = [];

// Step 2:
function record(
  event
) {
  history.push(
    event
  );

  // Step 3:
  if (
    history.length
    >
    100
  ) {
    history.shift();
  }
}
```

Now history has an upper bound.

---

# 60. Large Object Stored in Closure + Global Callback 🔥🔥🔥

```js
function createHandler() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "data"
    );

  // Step 2:
  return () => {
    return largeData.length;
  };
}

// Step 3:
globalThis.handler =
  createHandler();

// Step 4:
console.log(
  globalThis.handler()
); // Output: 1000
```

Output:

```text
1000
```

Retention chain:

```text
globalThis
↓
handler
↓
closure
↓
largeData
```

---

# 61. Removing Global Reference

```js
// Step 1:
globalThis.handler =
  null;

// Step 2:
console.log(
  globalThis.handler
); // Output: null
```

If nothing else references the function or captured data:

```text
they may become collectible
```

---

# 62. Memory Leak Symptoms 🔥🔥🔥

Common symptoms:

```text
memory usage keeps increasing
page gets slower over time
tab crashes after long usage
navigation repeatedly increases memory
same action becomes progressively slower
many detached DOM nodes
listener count keeps increasing
large heap snapshots grow across cycles
```

One spike alone does not prove a leak.

---

# 63. Good Leak Test Pattern 🔥🔥🔥

A useful manual test:

```text
1. Open feature
2. Use feature
3. Close feature
4. Repeat multiple times
5. Observe whether memory stabilizes
```

If memory:

```text
rises
then later stabilizes
```

that may be normal.

If it:

```text
keeps rising with every cycle
```

investigate retainers.

---

# 64. Heap Snapshot 🔥🔥🔥

A heap snapshot shows objects currently retained in memory.

Useful questions:

```text
Which object types are growing?

How many instances exist?

What is retaining them?

Are detached DOM nodes present?
```

---

# 65. Retainers 🔥🔥🔥

A retainer is something that keeps another object reachable.

Example:

```text
Window
↓
cache
↓
array
↓
employee object
```

If employee should be gone:

```text
cache is part of the retention path
```

---

# 66. Retainer Chain Example

```text
window
↓
listener
↓
callback
↓
closure
↓
component data
```

This chain explains:

```text
why GC cannot collect component data
```

---

# 67. Allocation Profiling Awareness

Allocation profiling helps answer:

```text
What objects are being created over time?
```

Useful when:

```text
memory grows during repeated interaction
```

Heap snapshots tell you what exists.

Allocation profiling helps show what keeps getting allocated.

---

# 68. Memory Leak Debugging Strategy 🔥🔥🔥

Use this sequence:

```text
1. Reproduce the growth
2. Take baseline snapshot
3. Perform action repeatedly
4. Take another snapshot
5. Compare object counts
6. Find growing objects
7. Inspect retainers
8. Find forgotten reference
9. Add cleanup
10. Repeat test
```

---

# 69. Debugging Question 1 — Is It Actually a Leak?

Before fixing anything:

```text
Does memory eventually stabilize?
```

GC may run later.

So:

```text
temporary memory increase
≠ guaranteed memory leak
```

---

# 70. Debugging Question 2 — What Is Retaining It? 🔥🔥🔥

Look for:

```text
timer
listener
global
cache
closure
Map
Set
DOM node
subscription
observer
```

Do not just set random variables to `null`.

Find the actual retention path.

---

# 71. Debugging Question 3 — Is Cleanup Symmetrical?

Useful rule:

```text
start something
→ stop something
```

Examples:

```text
setInterval
→ clearInterval

addEventListener
→ removeEventListener

subscribe
→ unsubscribe

observe
→ disconnect/unobserve

open resource
→ close resource
```

---

# 72. Symmetry Rule 🔥🔥🔥

Memory cleanup often follows symmetry.

```text
setup
↓
resource exists
↓
cleanup
```

This is one of the best mental rules for frontend work.

---

# 73. Interview Output 1 — Map Retains Object 🔥🔥🔥

```js
// Step 1:
let key = {
  id: 1,
};

// Step 2:
const map =
  new Map();

// Step 3:
map.set(
  key,
  "Employee"
);

// Step 4:
key =
  null;

// Step 5:
console.log(
  map.size
);
```

Expected output:

```text
1
```

The `Map` still strongly retains the key object.

---

# 74. Interview Output 2 — Set Retains Object

```js
// Step 1:
let user = {
  id: 1,
};

// Step 2:
const set =
  new Set(
    [
      user,
    ]
  );

// Step 3:
user =
  null;

// Step 4:
console.log(
  set.size
);
```

Expected output:

```text
1
```

---

# 75. Interview Output 3 — Listener Function References 🔥🔥🔥

```js
// Step 1:
const first =
  () => {
    return 1;
  };

// Step 2:
const second =
  () => {
    return 1;
  };

// Step 3:
console.log(
  first === second
);
```

Expected output:

```text
false
```

This explains why recreating a callback does not remove the original listener.

---

# 76. Interview Output 4 — Closure Retention

```js
function createCounter() {
  // Step 1:
  let count =
    0;

  // Step 2:
  return () => {
    count++;

    return count;
  };
}

// Step 3:
const counter =
  createCounter();

// Step 4:
console.log(
  counter()
);

// Step 5:
console.log(
  counter()
);
```

Expected output:

```text
1
2
```

The closure keeps `count` reachable.

This is normal, not a leak by itself.

---

# 77. Interview Question — What Is a Memory Leak? 🔥🔥🔥

Good answer:

```text
A memory leak happens when data
is no longer useful to the application
but remains reachable through references,
so garbage collection cannot reclaim it.
```

---

# 78. Interview Question — Common JS Memory Leak Sources 🔥🔥🔥

Good answer:

```text
Common sources include:

uncleared timers
unremoved event listeners
closures retaining large data
global references
unbounded caches
Maps/Sets retaining objects
detached DOM nodes
forgotten subscriptions
observers not disconnected
```

---

# 79. Interview Question — Are Closures Memory Leaks?

Good answer:

```text
No.

Closures intentionally retain variables
that they still need.

They become part of a leak only when
the closure itself stays reachable longer than intended
and keeps unnecessary data alive.
```

---

# 80. Interview Question — Why Can Event Listeners Leak Memory? 🔥🔥🔥

Good answer:

```text
The event target retains the callback.

The callback may retain other values
through its closure.

If the listener is no longer needed
but is never removed,
that entire reference chain can remain alive.
```

---

# 81. Interview Question — Why Can `setInterval()` Leak?

Good answer:

```text
An active interval keeps its callback registered.

The callback can retain captured data.

If the interval should have stopped
but clearInterval() is never called,
the callback and captured data can stay reachable.
```

---

# 82. Interview Question — Why Can `Map` Cause Retention? 🔥🔥🔥

Good answer:

```text
Map strongly retains its keys and values.

Setting an outside variable to null
does not free an object if the Map
still references that object.

Entries should be deleted or cleared
when no longer needed.
```

---

# 83. Interview Question — Map vs WeakMap for Memory

Good answer:

```text
Map strongly retains object keys.

WeakMap does not keep object keys alive
when those keys are otherwise unreachable.

WeakMap is useful for metadata
whose lifetime should follow the key object's lifetime.
```

---

# 84. Interview Question — Are Circular References Leaks?

Good answer:

```text
Not automatically.

If an entire circular structure becomes unreachable,
modern tracing garbage collectors can collect it.

The real issue is whether the cycle
is still reachable from live roots.
```

---

# 85. Interview Question — How Do You Debug a Memory Leak? 🔥🔥🔥

Good answer:

```text
Reproduce the growth,
take heap snapshots,
repeat the action,
compare snapshots,
find objects whose count keeps increasing,
inspect their retainers,
identify the long-lived reference,
add cleanup,
and retest.
```

---

# 86. Memory Leak Decision Guide 🔥🔥🔥

```text
Started interval?
→ clearInterval()

Scheduled cancellable timeout?
→ clearTimeout()

Added listener?
→ removeEventListener()

Subscribed?
→ unsubscribe()

Started observer?
→ disconnect()/unobserve()

Stored items in cache?
→ define eviction policy

Stored object in Map/Set?
→ delete/clear when done

Removed DOM node?
→ remove stale JS references too

Closure keeps large data?
→ check whether closure still needs to live

Global variable stores temporary data?
→ reduce scope or release reference

Memory grows after repeated feature cycles?
→ inspect heap retainers
```

---

# 87. Final Master Trace 🔥🔥🔥

```js
function setupFeature() {
  // Step 1:
  const largeData =
    new Array(
      1000
    ).fill(
      "employee"
    );

  // Step 2:
  const handleClick =
    () => {
      console.log(
        largeData.length
      );
    };

  // Step 3:
  document.addEventListener(
    "click",
    handleClick
  );

  // Step 4:
  const intervalId =
    setInterval(
      () => {
        console.log(
          "Polling"
        );
      },
      1000
    );

  // Step 5:
  return function cleanup() {
    // Step 6:
    document.removeEventListener(
      "click",
      handleClick
    );

    // Step 7:
    clearInterval(
      intervalId
    );
  };
}

// Step 8:
const cleanup =
  setupFeature();

// Step 9:
cleanup();
```

Complete retention model before cleanup:

```text
document
↓
handleClick
↓
closure
↓
largeData

timer system
↓
interval callback
```

After cleanup:

```text
removeEventListener()
↓
document no longer retains handleClick

clearInterval()
↓
timer system no longer retains interval callback
```

If no other references remain:

```text
callbacks
+
captured data
can become unreachable
↓
eligible for GC
```

---

# Quick Memory 🧠🔥🔥🔥

## Memory Leak

```text
unused
+
still reachable
=
leak
```

## Best Question

```text
Who is still retaining this object?
```

## Timer

```text
setInterval()
→ clearInterval()
```

## Timeout

```text
setTimeout()
→ clearTimeout()
when cancellation is needed
```

## Listener

```text
addEventListener()
→ removeEventListener()
```

## Listener Callback

```text
same function reference required
```

## Closure

```text
closure retains what it still references
```

## Global

```text
globals often live for app lifetime
```

## Cache

```text
cache needs eviction policy
```

## Map / Set

```text
strongly retain objects
```

## WeakMap

```text
does not keep key alive by itself
```

## Detached DOM

```text
removed from DOM
BUT
still referenced by JS
```

## Subscription

```text
subscribe()
→ unsubscribe()
```

## Observer

```text
observe()
→ disconnect()/unobserve()
```

## React Mental Model

```text
useEffect setup
↓
return cleanup
```

## Memory Leak Symptoms

```text
memory keeps growing
after repeated feature cycles
```

## Debugging

```text
snapshot
↓
repeat action
↓
snapshot
↓
compare
↓
find growing objects
↓
inspect retainers
```

## Symmetry Rule

```text
start something
→ stop something
```

## Most Important Interview Answer

```text
A JavaScript memory leak usually happens
when data is no longer needed
but remains reachable through
a timer, listener, closure, global,
cache, collection, DOM reference,
subscription, or observer.

Because the object is still reachable,
garbage collection cannot reclaim it.

The fix is to identify the retaining reference
and clean it up at the correct lifecycle point.
```

---

# ✅ 7.16 Common Memory Leaks Complete

Completed in Section 7:

```text
7.1 Execution Model
7.2 Scope
7.3 Hoisting
7.4 TDZ
7.5 Closures
7.6 var vs let Loop Questions
7.7 this
7.8 call() / apply() / bind()
7.9 new Operator
7.10 Prototypes + Prototype Chain
7.11 Classes
7.12 Strict Mode
7.13 Reference Behaviour + Mutation + Immutability
7.14 Equality
7.15 Memory Basics
7.16 Common Memory Leaks
```

Only one major topic remains in Section 7:

```text
7.17 Internals Practical 🔥🔥🔥
├── Output Questions
├── Scope Questions
├── Hoisting Questions
├── TDZ Questions
├── Closure Problems
├── this Problems
├── call/apply/bind Problems
├── new / Prototype Problems
├── Mutation / Equality Problems
├── Memory / Leak Debugging
└── Final Mixed Interview Problems
```

**Next: 7.17 Internals Practical 🔥🔥🔥**
