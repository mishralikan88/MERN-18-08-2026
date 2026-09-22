# 9.8 Event System — Easy Version 🔥🔥🔥

An **event system** lets one part of an app say:

```text
Something happened
```

and other parts of the app can react.

Example:

```text
employeeAdded
↓
table refreshes
notification shows
analytics logs event
```

Main topics:

```text
Event
Listener
Publisher / Subscriber
EventEmitter
on()
emit()
off()
once()
Passing Data
Multiple Listeners
Unsubscribe
removeAllListeners()
listenerCount()
eventNames()
Event Bus
Pub/Sub
Async Listeners
Memory Leaks
Machine-Coding EventEmitter
Interview Questions
```

---

# 1. What Is an Event? 🔥🔥🔥

An event means:

```text
something happened
```

Examples:

```text
button clicked
employee added
user logged in
payment completed
file uploaded
```

---

# 2. What Is a Listener?

A listener is a function that waits for an event.

```js
function showMessage() {
  // Step 1: Run when the event happens.
  console.log(
    "Employee added"
  ); // Output when called: Employee added
}
```

Output:

```text
Employee added
```

---

# 3. Publisher and Subscriber 🔥🔥🔥

```text
Publisher
→ sends/announces an event

Subscriber
→ listens for that event
```

Example:

```text
Employee Form
→ publishes "employeeAdded"

Employee Table
→ subscribes to "employeeAdded"
```

---

# 4. Event System Mental Model

```text
on("employeeAdded", listener)
↓
store listener

emit("employeeAdded", employee)
↓
find listener
↓
call listener
```

---

# 5. What Is EventEmitter?

An EventEmitter usually gives methods like:

```text
on()
emit()
off()
once()
```

Meaning:

```text
on
→ listen

emit
→ send event

off
→ stop listening

once
→ listen only one time
```

---

# 6. Simplest Event Example

```js
const events =
  {};

// Step 1: Store one function.
events[
  "hello"
] =
  () => {
    console.log(
      "Hello Rahul"
    ); // Output: Hello Rahul
  };

// Step 2: Call stored function.
events[
  "hello"
]();
```

Output:

```text
Hello Rahul
```

---

# 7. Problem With Only One Listener

If we store:

```text
eventName
→ one function
```

then adding another listener may replace the old one.

Better:

```text
eventName
→ array of listeners
```

Example:

```text
employeeAdded
→ [listener1, listener2, listener3]
```

---

# 8. Start EventEmitter Class

```js
class EventEmitter {
  constructor() {
    // Step 1: Create empty storage.
    // Why?
    // We need a place to keep
    // event names and listeners.
    this.events =
      {};
  }
}
```

Initial value:

```text
{}
```

---

# 9. Build `on()` 🔥🔥🔥

`on()` means:

```text
register a listener
```

---

# 10. `on()` Implementation

```js
class EventEmitter {
  constructor() {
    this.events =
      {};
  }

  on(
    eventName,
    listener
  ) {
    // Step 1: Check whether
    // this event already exists.
    if (
      !this.events[
        eventName
      ]
    ) {
      // Step 2: New event?
      // Create empty listener array.
      this.events[
        eventName
      ] =
        [];
    }

    // Step 3: Add listener.
    this.events[
      eventName
    ].push(
      listener
    );
  }
}
```

---

# 11. What Does `on()` Do?

If we call:

```js
emitter.on(
  "employeeAdded",
  listener1
);
```

Storage becomes:

```text
employeeAdded
→ [listener1]
```

Call again:

```js
emitter.on(
  "employeeAdded",
  listener2
);
```

Now:

```text
employeeAdded
→ [listener1, listener2]
```

---

# 12. Build `emit()` 🔥🔥🔥

`emit()` means:

```text
event happened
↓
run its listeners
```

---

# 13. `emit()` Implementation

```js
emit(
  eventName
) {
  // Step 1: Get listeners
  // for this event.
  const listeners =
    this.events[
      eventName
    ];

  // Step 2: If no listeners exist,
  // stop safely.
  if (
    !listeners
  ) {
    return;
  }

  // Step 3: Run every listener.
  for (
    const listener
    of
    listeners
  ) {
    listener();
  }
}
```

---

# 14. Test Basic EventEmitter

```js
const emitter =
  new EventEmitter();

// Step 1: Register listener.
emitter.on(
  "hello",
  () => {
    console.log(
      "Hello"
    ); // Output: Hello
  }
);

// Step 2: Emit event.
emitter.emit(
  "hello"
);
```

Output:

```text
Hello
```

---

# 15. Multiple Listeners 🔥🔥🔥

```js
const emitter =
  new EventEmitter();

// Step 1: First listener.
emitter.on(
  "employeeAdded",
  () => {
    console.log(
      "Refresh table"
    ); // Output: Refresh table
  }
);

// Step 2: Second listener.
emitter.on(
  "employeeAdded",
  () => {
    console.log(
      "Show notification"
    ); // Output: Show notification
  }
);

// Step 3: Emit once.
emitter.emit(
  "employeeAdded"
);
```

Output:

```text
Refresh table
Show notification
```

---

# 16. Passing Data With Events 🔥🔥🔥

Usually event listeners need data.

Example:

```text
employeeAdded
+
employee object
```

So we want:

```js
emit(
  "employeeAdded",
  employee
);
```

---

# 17. Update `emit()` to Pass Data

```js
emit(
  eventName,
  ...args
) {
  // Step 1: Get listeners.
  const listeners =
    this.events[
      eventName
    ];

  // Step 2: No listeners?
  // Stop.
  if (
    !listeners
  ) {
    return;
  }

  // Step 3: Call each listener
  // with event data.
  for (
    const listener
    of
    listeners
  ) {
    listener(
      ...args
    );
  }
}
```

---

# 18. Test Passing Data

```js
const emitter =
  new EventEmitter();

// Step 1: Listener receives employee.
emitter.on(
  "employeeAdded",
  (
    employee
  ) => {
    console.log(
      employee.name
    ); // Output: Rahul
  }
);

// Step 2: Emit with employee object.
emitter.emit(
  "employeeAdded",
  {
    id:
      1,
    name:
      "Rahul",
  }
);
```

Output:

```text
Rahul
```

---

# 19. Passing Multiple Values

```js
emitter.on(
  "salaryUpdated",
  (
    id,
    salary
  ) => {
    // Step 1: Receive both values.
    console.log(
      id,
      salary
    ); // Output: 101 80000
  }
);

// Step 2: Emit two values.
emitter.emit(
  "salaryUpdated",
  101,
  80000
);
```

Output:

```text
101 80000
```

---

# 20. Why `...args`?

Because one event may send:

```text
no value
one value
many values
```

`...args` makes `emit()` reusable.

---

# 21. Build `off()` 🔥🔥🔥

`off()` means:

```text
remove a listener
```

---

# 22. `off()` Implementation

```js
off(
  eventName,
  listenerToRemove
) {
  // Step 1: Get listeners.
  const listeners =
    this.events[
      eventName
    ];

  // Step 2: Nothing exists?
  // Stop.
  if (
    !listeners
  ) {
    return;
  }

  // Step 3: Keep every listener
  // except the one being removed.
  this.events[
    eventName
  ] =
    listeners.filter(
      (
        listener
      ) => {
        return (
          listener
          !==
          listenerToRemove
        );
      }
    );
}
```

---

# 23. Test `off()`

```js
const emitter =
  new EventEmitter();

function handleHello() {
  console.log(
    "Hello"
  );
}

// Step 1: Register.
emitter.on(
  "hello",
  handleHello
);

// Step 2: Remove.
emitter.off(
  "hello",
  handleHello
);

// Step 3: Emit.
// Nothing should print.
emitter.emit(
  "hello"
);

// Output: nothing
```

Output:

```text
nothing
```

---

# 24. Important Function Reference Rule 🔥🔥🔥

This does NOT work correctly for removal:

```js
emitter.on(
  "hello",
  () => {
    console.log(
      "Hello"
    );
  }
);

emitter.off(
  "hello",
  () => {
    console.log(
      "Hello"
    );
  }
);
```

Why?

Because:

```text
first arrow function
≠
second arrow function
```

They are different function objects.

---

# 25. Correct Listener Removal

```js
const handleHello =
  () => {
    console.log(
      "Hello"
    );
  };

// Step 1: Register saved function.
emitter.on(
  "hello",
  handleHello
);

// Step 2: Remove same function.
emitter.off(
  "hello",
  handleHello
);
```

---

# 26. Build `once()` 🔥🔥🔥

`once()` means:

```text
listener should run only one time
```

---

# 27. `once()` Mental Model

```text
register wrapper
↓
event happens
↓
remove wrapper
↓
run original listener
```

---

# 28. Build `once()`

```js
once(
  eventName,
  listener
) {
  // Step 1: Create wrapper.
  const wrapper =
    (
      ...args
    ) => {
      // Step 2: Remove wrapper first.
      this.off(
        eventName,
        wrapper
      );

      // Step 3: Run real listener.
      listener(
        ...args
      );
    };

  // Step 4: Register wrapper.
  this.on(
    eventName,
    wrapper
  );
}
```

---

# 29. Test `once()`

```js
const emitter =
  new EventEmitter();

// Step 1: Register once listener.
emitter.once(
  "login",
  () => {
    console.log(
      "Welcome"
    ); // Output only once: Welcome
  }
);

// Step 2: First emit.
emitter.emit(
  "login"
);

// Step 3: Second emit.
// Listener already removed.
emitter.emit(
  "login"
);
```

Output:

```text
Welcome
```

---

# 30. Why Remove Before Running?

Suppose the listener itself emits the same event again.

If we remove it first:

```text
same listener cannot accidentally run again
```

That is safer.

---

# 31. Return Unsubscribe Function 🔥🔥🔥

A very useful pattern:

```js
const unsubscribe =
  emitter.on(
    "hello",
    listener
  );

unsubscribe();
```

---

# 32. Update `on()` to Return Unsubscribe

```js
on(
  eventName,
  listener
) {
  // Step 1: Create event array.
  if (
    !this.events[
      eventName
    ]
  ) {
    this.events[
      eventName
    ] =
      [];
  }

  // Step 2: Add listener.
  this.events[
    eventName
  ].push(
    listener
  );

  // Step 3: Return cleanup function.
  return () => {
    this.off(
      eventName,
      listener
    );
  };
}
```

---

# 33. Test Unsubscribe

```js
const emitter =
  new EventEmitter();

// Step 1: Subscribe.
const unsubscribe =
  emitter.on(
    "hello",
    () => {
      console.log(
        "Hello"
      ); // Output first time: Hello
    }
  );

// Step 2: Emit once.
emitter.emit(
  "hello"
);

// Step 3: Unsubscribe.
unsubscribe();

// Step 4: Emit again.
// Nothing prints.
emitter.emit(
  "hello"
);
```

Output:

```text
Hello
```

---

# 34. Build `removeAllListeners()` 🔥🔥🔥

Sometimes we want:

```text
remove every listener
for one event
```

or:

```text
remove everything
```

---

# 35. Implementation

```js
removeAllListeners(
  eventName
) {
  // Step 1: Event name provided?
  if (
    eventName
  ) {
    // Step 2: Remove only that event.
    delete this.events[
      eventName
    ];

    return;
  }

  // Step 3: No event name?
  // Clear all events.
  this.events =
    {};
}
```

---

# 36. Test Remove All

```js
const emitter =
  new EventEmitter();

emitter.on(
  "hello",
  () => {
    console.log(
      "A"
    );
  }
);

emitter.on(
  "hello",
  () => {
    console.log(
      "B"
    );
  }
);

// Step 1: Remove all hello listeners.
emitter.removeAllListeners(
  "hello"
);

// Step 2: Emit.
// Nothing prints.
emitter.emit(
  "hello"
);

// Output: nothing
```

Output:

```text
nothing
```


---

# 37. Build `listenerCount()` 🔥🔥🔥

Useful for debugging.

```js
listenerCount(
  eventName
) {
  // Step 1: Read listener array.
  const listeners =
    this.events[
      eventName
    ];

  // Step 2: Missing event?
  // Return 0.
  if (
    !listeners
  ) {
    return 0;
  }

  // Step 3: Return number of listeners.
  return listeners.length;
}
```

---

# 38. Test Listener Count

```js
const emitter =
  new EventEmitter();

emitter.on(
  "hello",
  () => {}
);

emitter.on(
  "hello",
  () => {}
);

// Step 1: Count listeners.
console.log(
  emitter.listenerCount(
    "hello"
  )
); // Output: 2
```

Output:

```text
2
```

---

# 39. Build `eventNames()` 🔥🔥🔥

This tells us which event names currently exist.

```js
eventNames() {
  // Step 1: Return object keys.
  return Object.keys(
    this.events
  );
}
```

---

# 40. Test Event Names

```js
const emitter =
  new EventEmitter();

emitter.on(
  "login",
  () => {}
);

emitter.on(
  "logout",
  () => {}
);

// Step 1: Read event names.
console.log(
  emitter.eventNames()
); // Output: ["login", "logout"]
```

Output:

```text
["login", "logout"]
```

---

# 41. Full Easy EventEmitter 🔥🔥🔥

```js
class EventEmitter {
  constructor() {
    // Step 1: Store events.
    this.events =
      {};
  }

  on(
    eventName,
    listener
  ) {
    // Step 2: New event?
    // Create listener array.
    if (
      !this.events[
        eventName
      ]
    ) {
      this.events[
        eventName
      ] =
        [];
    }

    // Step 3: Add listener.
    this.events[
      eventName
    ].push(
      listener
    );

    // Step 4: Return unsubscribe helper.
    return () => {
      this.off(
        eventName,
        listener
      );
    };
  }

  emit(
    eventName,
    ...args
  ) {
    // Step 5: Get listeners.
    const listeners =
      this.events[
        eventName
      ];

    // Step 6: No listeners?
    // Stop.
    if (
      !listeners
    ) {
      return;
    }

    // Step 7: Copy listeners.
    // Why?
    // A listener may remove itself
    // while emit() is running.
    const copy = [
      ...listeners,
    ];

    // Step 8: Run each listener.
    for (
      const listener
      of
      copy
    ) {
      listener(
        ...args
      );
    }
  }

  off(
    eventName,
    listenerToRemove
  ) {
    // Step 9: Get listeners.
    const listeners =
      this.events[
        eventName
      ];

    // Step 10: Nothing exists?
    if (
      !listeners
    ) {
      return;
    }

    // Step 11: Remove matching listener.
    this.events[
      eventName
    ] =
      listeners.filter(
        (
          listener
        ) => {
          return (
            listener
            !==
            listenerToRemove
          );
        }
      );

    // Step 12: Clean empty event.
    if (
      this.events[
        eventName
      ].length
      ===
      0
    ) {
      delete this.events[
        eventName
      ];
    }
  }

  once(
    eventName,
    listener
  ) {
    // Step 13: Create wrapper.
    const wrapper =
      (
        ...args
      ) => {
        // Step 14: Remove wrapper.
        this.off(
          eventName,
          wrapper
        );

        // Step 15: Run original listener.
        listener(
          ...args
        );
      };

    // Step 16: Register wrapper.
    return this.on(
      eventName,
      wrapper
    );
  }

  removeAllListeners(
    eventName
  ) {
    // Step 17: Remove one event.
    if (
      eventName
    ) {
      delete this.events[
        eventName
      ];

      return;
    }

    // Step 18: Remove everything.
    this.events =
      {};
  }

  listenerCount(
    eventName
  ) {
    // Step 19: Return count.
    return (
      this.events[
        eventName
      ]
        ?.length
      ??
      0
    );
  }

  eventNames() {
    // Step 20: Return all event names.
    return Object.keys(
      this.events
    );
  }
}
```

---

# 42. Why Copy Listener Array Before `emit()`?

Suppose listener A removes listener B while we are looping.

If we directly loop the same array,
the array changes during execution.

Safer:

```text
listeners
↓
copy
↓
loop copy
```

This gives more predictable behavior.

---

# 43. Test Full EventEmitter

```js
const emitter =
  new EventEmitter();

function showEmployee(
  employee
) {
  console.log(
    employee.name
  ); // Output: Rahul
}

// Step 1: Register listener.
emitter.on(
  "employeeAdded",
  showEmployee
);

// Step 2: Emit with data.
emitter.emit(
  "employeeAdded",
  {
    id:
      1,
    name:
      "Rahul",
  }
);
```

Output:

```text
Rahul
```

---

# 44. What Is an Event Bus? 🔥🔥🔥

An Event Bus is usually one shared EventEmitter.

Example:

```text
eventBus
↓
Header listens
Table listens
Notification listens
Analytics listens
```

---

# 45. Event Bus Example

```js
const eventBus =
  new EventEmitter();

// Step 1: Header listens.
eventBus.on(
  "userLoggedIn",
  (
    user
  ) => {
    console.log(
      `Header: ${user.name}`
    ); // Output: Header: Rahul
  }
);

// Step 2: Analytics listens too.
eventBus.on(
  "userLoggedIn",
  (
    user
  ) => {
    console.log(
      `Analytics: ${user.id}`
    ); // Output: Analytics: 101
  }
);

// Step 3: Emit one event.
eventBus.emit(
  "userLoggedIn",
  {
    id:
      101,
    name:
      "Rahul",
  }
);
```

Output:

```text
Header: Rahul
Analytics: 101
```

---

# 46. What Is Pub/Sub? 🔥🔥🔥

Pub/Sub means:

```text
Publish / Subscribe
```

Publisher:

```text
publishes event
```

Subscriber:

```text
listens to event
```

The publisher does not directly call every subscriber.

---

# 47. Direct Calls vs Pub/Sub

Direct calls:

```text
form
↓
table.refresh()
toast.show()
analytics.track()
```

Pub/Sub:

```text
form
↓
emit("employeeAdded")
↓
all interested listeners react
```

---

# 48. Why Is Pub/Sub Useful?

It reduces direct dependency.

Without event system:

```text
module A must know B
module A must know C
module A must know D
```

With event system:

```text
module A only knows event name
```

---

# 49. But Events Can Be Overused 🔥🔥🔥

Bad situation:

```text
event A
↓
listener emits B
↓
listener B emits C
↓
listener C emits D
```

Then debugging becomes hard.

Use event systems only when they make communication simpler.

---

# 50. Real Employee App Example

```text
Employee Form
↓
emit("employeeCreated", employee)

Employee Table
→ update row

Notification
→ show success

Analytics
→ track event
```

---

# 51. Employee App Code

```js
const bus =
  new EventEmitter();

// Step 1: Table listener.
bus.on(
  "employeeCreated",
  (
    employee
  ) => {
    console.log(
      `Table: ${employee.name}`
    ); // Output: Table: Priya
  }
);

// Step 2: Notification listener.
bus.on(
  "employeeCreated",
  (
    employee
  ) => {
    console.log(
      `${employee.name} created`
    ); // Output: Priya created
  }
);

// Step 3: Emit event.
bus.emit(
  "employeeCreated",
  {
    id:
      2,
    name:
      "Priya",
  }
);
```

Output:

```text
Table: Priya
Priya created
```

---

# 52. Async Listeners 🔥🔥🔥

A listener can be async.

```js
emitter.on(
  "save",
  async () => {
    // Step 1: Wait for async work.
    await Promise.resolve();

    // Step 2: Print after Promise resolves.
    console.log(
      "Saved"
    ); // Output later: Saved
  }
);
```

Normal `emit()` does not automatically wait for this listener.

---

# 53. Why Normal `emit()` Does Not Wait

An async function returns:

```text
Promise
```

Normal `emit()` simply calls the function.

It does not do:

```text
await listener()
```

unless we specifically design it that way.

---

# 54. Build `emitAsync()` 🔥🔥🔥

```js
async emitAsync(
  eventName,
  ...args
) {
  // Step 1: Get listeners.
  const listeners =
    this.events[
      eventName
    ]
    ??
    [];

  // Step 2: Call each listener
  // and collect results.
  const results =
    listeners.map(
      (
        listener
      ) => {
        return listener(
          ...args
        );
      }
    );

  // Step 3: Wait for all results.
  return Promise.all(
    results
  );
}
```

---

# 55. Test `emitAsync()`

```js
const emitter =
  new EventEmitter();

emitter.on(
  "calculate",
  async (
    value
  ) => {
    // Step 1: Return first result.
    return (
      value * 2
    );
  }
);

emitter.on(
  "calculate",
  async (
    value
  ) => {
    // Step 2: Return second result.
    return (
      value * 3
    );
  }
);

// Step 3: Wait for both listeners.
emitter.emitAsync(
  "calculate",
  10
).then(
  (
    results
  ) => {
    console.log(
      results
    ); // Output: [20, 30]
  }
);
```

Output:

```text
[20, 30]
```

---

# 56. What If One Async Listener Fails?

Because `emitAsync()` uses:

```text
Promise.all
```

one rejection causes:

```text
emitAsync rejects
```

If we need every result:

```text
Promise.allSettled
```

is another option.

---

# 57. Memory Leak Problem 🔥🔥🔥

Suppose:

```text
page opens
→ listener added

page closes
→ listener NOT removed

page opens again
→ another listener added
```

Now one event may run the same logic twice.

Over time:

```text
many unused listeners remain
```

This is a memory leak / duplicate-listener problem.

---

# 58. Fix Memory Leak

Always unsubscribe when the listener is no longer needed.

```js
// Step 1: Subscribe.
const unsubscribe =
  emitter.on(
    "employeeAdded",
    handleEmployee
  );

// Step 2: Later cleanup.
unsubscribe();
```

---

# 59. React Awareness

Conceptually:

```js
useEffect(
  () => {
    // Step 1: Subscribe.
    const unsubscribe =
      eventBus.on(
        "employeeAdded",
        handleEmployee
      );

    // Step 2: Cleanup on unmount.
    return unsubscribe;
  },
  []
);
```

We will keep React details separate.

---

# 60. Clear Event Names 🔥🔥🔥

Bad:

```text
"change"
"data"
"update"
```

Better:

```text
"employeeCreated"
"employeeDeleted"
"userLoggedIn"
"paymentCompleted"
```

Clear names make debugging easier.

---

# 61. Event Name Constants

```js
const EVENTS = {
  EMPLOYEE_CREATED:
    "employeeCreated",

  EMPLOYEE_DELETED:
    "employeeDeleted",
};
```

Use:

```js
emitter.emit(
  EVENTS.EMPLOYEE_CREATED,
  employee
);
```

This reduces spelling mistakes.

---

# 62. Output Question 1

```js
const emitter =
  new EventEmitter();

emitter.on(
  "test",
  () => {
    console.log(
      "A"
    ); // Output: A
  }
);

emitter.on(
  "test",
  () => {
    console.log(
      "B"
    ); // Output: B
  }
);

emitter.emit(
  "test"
);
```

Output:

```text
A
B
```

---

# 63. Output Question 2

```js
const emitter =
  new EventEmitter();

function hello() {
  console.log(
    "Hello"
  );
}

// Step 1: Add.
emitter.on(
  "test",
  hello
);

// Step 2: Remove.
emitter.off(
  "test",
  hello
);

// Step 3: Emit.
emitter.emit(
  "test"
);

// Output: nothing
```

Output:

```text
nothing
```

---

# 64. Output Question 3

```js
const emitter =
  new EventEmitter();

emitter.once(
  "test",
  () => {
    console.log(
      "Once"
    ); // Output only once: Once
  }
);

emitter.emit(
  "test"
);

emitter.emit(
  "test"
);
```

Output:

```text
Once
```

---

# 65. Output Question 4

```js
const emitter =
  new EventEmitter();

emitter.on(
  "sum",
  (
    a,
    b
  ) => {
    console.log(
      a + b
    ); // Output: 30
  }
);

emitter.emit(
  "sum",
  10,
  20
);
```

Output:

```text
30
```

---

# 66. Output Question 5 — Anonymous Function Trap 🔥🔥🔥

```js
const emitter =
  new EventEmitter();

emitter.on(
  "hello",
  () => {
    console.log(
      "Hello"
    ); // Output: Hello
  }
);

emitter.off(
  "hello",
  () => {
    console.log(
      "Hello"
    );
  }
);

emitter.emit(
  "hello"
);
```

Output:

```text
Hello
```

Because the function passed to `off()` is not the same function object.

---

# 67. Common Mistakes 🔥🔥🔥

```text
1. Store only one listener per event
2. Forget cleanup
3. Remove using a new anonymous function
4. Assume async listeners are awaited
5. Create too many hidden event chains
6. Use unclear event names
```

---

# 68. Interview Question — What Is EventEmitter?

Easy answer:

```text
EventEmitter stores listeners by event name.

on() adds listeners.

emit() calls listeners.

off() removes listeners.

once() runs a listener only one time.
```

---

# 69. Interview Question — Why Same Function Reference?

Easy answer:

```text
Functions are objects.

Two separately created functions
are different references,
even if their code looks the same.
```

---

# 70. Interview Question — EventEmitter vs Pub/Sub

Easy answer:

```text
EventEmitter is one implementation style.

Pub/Sub is the broader pattern:
publishers publish events
and subscribers listen.
```

---

# 71. Interview Question — How to Prevent Memory Leaks?

Easy answer:

```text
Unsubscribe listeners
when they are no longer needed.

Cleanup is especially important
when components/pages are destroyed.
```

---

# 72. Interview Question — What About Async Listeners?

Easy answer:

```text
Normal emit() usually does not wait.

If waiting is required,
I can build emitAsync()
and use Promise.all or allSettled.
```

---

# 73. Best Interview Build Order 🔥🔥🔥

If asked:

```text
Build EventEmitter
```

Do this:

```text
1. storage
2. on()
3. emit()
4. off()
5. once()
6. unsubscribe helper
7. edge cases
8. tests
```

Then add extra helpers only if time remains.

---

# 74. Complexity Awareness

If one event has `k` listeners:

```text
on()
→ usually O(1)

emit()
→ O(k)

off()
→ O(k)

listenerCount()
→ O(1)
```

---

# 75. Array vs Set for Listeners

Array:

```text
simple
ordered
duplicates allowed
```

Set:

```text
easy delete
same function stored once
ordered insertion
```

Both designs can work.

---

# 76. Final Event Flow 🔥🔥🔥

```text
Subscribe
↓
on(event, listener)

Publish
↓
emit(event, data)

React
↓
listeners run

Cleanup
↓
off(event, listener)
```

---

# 77. Quick Decision Guide

```text
Listen repeatedly?
→ on()

Listen once?
→ once()

Send event?
→ emit()

Stop one listener?
→ off()

Remove all?
→ removeAllListeners()

Count listeners?
→ listenerCount()

Get event names?
→ eventNames()

Wait for async listeners?
→ emitAsync()

Need easy cleanup?
→ return unsubscribe from on()
```

---

# 78. Quick Memory 🧠🔥🔥🔥

```text
Event
→ something happened

Listener
→ function waiting for event

Publisher
→ emits event

Subscriber
→ listens

on
→ subscribe

emit
→ publish

off
→ unsubscribe

once
→ run one time

Event Bus
→ shared emitter

Pub/Sub
→ publisher + subscribers

Cleanup
→ prevents leaks

emitAsync
→ waits for async listeners
```

---

# 79. Best Interview Answer 🔥🔥🔥

```text
An EventEmitter stores listeners
under event names.

on() registers a listener.

emit() calls all listeners
for that event
and can pass data to them.

off() removes a specific listener.

once() removes itself
after the first execution.

I also return an unsubscribe function
for easy cleanup.

Cleanup is important
because forgotten listeners
can cause memory leaks
and duplicate behavior.

For async listeners,
normal emit() does not automatically wait,
so I can provide emitAsync()
when that behavior is required.
```

---

# ✅ 9.8 Event System Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ✅
9.6 Machine-Coding Utilities ✅
9.7 Promise Implementations ✅
9.8 Event System ✅

9.9 String Utilities ← NEXT
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.9 String Utilities 🔥🔥🔥
```
