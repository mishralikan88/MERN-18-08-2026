# 9.1 Function Patterns — Regenerated Beginner-to-Interview Notes 🔥🔥🔥

This version is written so that a fresher can understand **what the code is doing, why every step exists, what each function returns, and how the output is produced**.

We will cover:

```text
1. Debounce
2. Throttle
3. Currying
4. Memoization
5. Compose
6. Pipe
7. Once
8. Retry
```

For every important example, we will follow this pattern:

```text
What is it?
↓
Why do we need it?
↓
Code with descriptive Step comments
↓
Inline Output comment
↓
Separate Output
↓
Step-by-step flow
↓
Real use case
↓
Interview answer
```

---

# 1. First Understand the Big Picture 🔥🔥🔥

A function pattern usually means:

```text
Take a normal function
↓
Wrap or combine it
↓
Return a new function
↓
The new function changes HOW or WHEN the original function runs
```

Example:

```text
searchEmployee()
↓
debounce(searchEmployee, 500)
↓
debouncedSearchEmployee()
```

The original function knows:

```text
WHAT work to do
```

The wrapper knows:

```text
WHEN or HOW that work should happen
```

---

# 2. Higher-Order Function Reminder 🔥🔥🔥

A higher-order function is a function that:

```text
takes another function as an argument

or

returns another function
```

Example:

```js
function wrapper(
  fn
) {
  // Step 1: Return a new function.
  // The original fn is NOT executed yet.
  return function (
    value
  ) {
    // Step 2: When the returned function is called,
    // execute the original fn with the received value.
    return fn(
      value
    );
  };
}

function double(
  number
) {
  // Step 3: Multiply the number by 2
  // and return the calculated value.
  return (
    number * 2
  );
}

// Step 4: Pass double into wrapper.
// wrapper returns a NEW function.
const wrappedDouble =
  wrapper(
    double
  );

// Step 5: Call the returned function with 5.
// Inside it, double(5) will run.
const result =
  wrappedDouble(
    5
  );

// Step 6: Print the final returned value.
console.log(
  result
); // Output: 10
```

Output:

```text
10
```

Flow:

```text
wrapper(double)
↓
returns a new function
↓
wrappedDouble(5)
↓
fn(5)
↓
double(5)
↓
10
```

This higher-order-function idea is used heavily in:

```text
debounce
throttle
memoize
once
curry
```

---

# 3. Closure Reminder 🔥🔥🔥

Many function patterns need to remember some private value between calls.

That is where **closure** is used.

```js
function createCounter() {
  // Step 1: Create private state.
  // This variable is created once when createCounter runs.
  let count =
    0;

  // Step 2: Return an inner function.
  return function () {
    // Step 3: Increase the SAME remembered count.
    count++;

    // Step 4: Return the latest count value.
    return count;
  };
}

// Step 5: createCounter returns a function.
// That returned function remembers count.
const counter =
  createCounter();

// Step 6: count becomes 1.
console.log(
  counter()
); // Output: 1

// Step 7: count does NOT reset.
// The same remembered count becomes 2.
console.log(
  counter()
); // Output: 2
```

Output:

```text
1
2
```

Why did `count` not reset?

```text
returned function
↓
keeps access to count
↓
closure
```

This same idea appears in:

```text
Debounce → remembers timerId
Throttle → remembers allowed/last execution
Memoize → remembers cache
Once → remembers whether function already ran
Currying → remembers earlier arguments
```

---

# 4. DEBOUNCE 🔥🔥🔥

## What is debounce?

Debounce means:

```text
many quick calls
↓
keep cancelling previous timer
↓
wait until calls stop
↓
execute only the latest call
```

Simple definition:

> Debounce executes a function only after no new call has happened for a specified delay.

---

# 5. Why Do We Need Debounce?

Imagine the user types:

```text
R
Ra
Rah
Rahu
Rahul
```

Without debounce:

```text
5 changes
↓
5 API calls
```

But usually we only care about the final text:

```text
Rahul
```

With debounce:

```text
5 quick changes
↓
wait until typing stops
↓
1 API call
```

Real uses:

```text
Search box
Autocomplete
Form validation
Autosave
Resize handling
Expensive filtering
```

---

# 6. Debounce Mental Model 🔥🔥🔥

Suppose delay is 300ms.

```text
User types "R"
↓
Timer 1 starts

100ms later user types "Ra"
↓
Timer 1 cancelled
↓
Timer 2 starts

100ms later user types "Rahul"
↓
Timer 2 cancelled
↓
Timer 3 starts

User stops typing
↓
300ms passes
↓
Timer 3 executes
↓
search("Rahul")
```

The key idea is:

```text
Every new call resets the waiting period.
```

---

# 7. Build Debounce Step by Step 🔥🔥🔥

```js
function debounce(
  fn,
  delay
) {
  // Step 1: Create a variable to remember
  // the currently scheduled timer ID.
  // Closure keeps this value alive between calls.
  let timerId;

  // Step 2: Return the new controlled function.
  // This is the function we will call repeatedly.
  return function (
    ...args
  ) {
    // Step 3: Cancel the previous scheduled timer.
    // If this is the first call, timerId is undefined,
    // and clearTimeout(undefined) simply does nothing.
    clearTimeout(
      timerId
    );

    // Step 4: Start a fresh timer for this latest call.
    // Save its ID so the next call can cancel it.
    timerId =
      setTimeout(
        () => {
          // Step 5: Execute the original function
          // only if this timer was not cancelled
          // by a newer call.
          fn(
            ...args
          );
        },
        delay
      );
  };
}
```

What does `debounce()` return?

```text
NOT the final search result.

It returns a NEW FUNCTION.
```

That returned function controls the timer.

---

# 8. Debounce Search Example 🔥🔥🔥

```js
function searchEmployee(
  query
) {
  // Step 1: This is the real function we want to control.
  // It prints whichever query finally survives debounce.
  console.log(
    `Searching: ${query}`
  ); // Final Output: Searching: Rahul
}

// Step 2: Wrap searchEmployee with debounce.
// debounce returns a new function.
const debouncedSearch =
  debounce(
    searchEmployee,
    300
  );

// Step 3: First call schedules searchEmployee("R").
// It does NOT execute immediately.
debouncedSearch(
  "R"
);

// Step 4: This call cancels the previous "R" timer
// and schedules searchEmployee("Ra").
debouncedSearch(
  "Ra"
);

// Step 5: This call cancels the "Ra" timer
// and schedules searchEmployee("Rahul").
debouncedSearch(
  "Rahul"
);
```

Output after about 300ms from the **last** call:

```text
Searching: Rahul
```

Flow:

```text
debouncedSearch("R")
↓
timer #1 created

debouncedSearch("Ra")
↓
timer #1 cancelled
↓
timer #2 created

debouncedSearch("Rahul")
↓
timer #2 cancelled
↓
timer #3 created

300ms passes
↓
timer #3 executes
↓
searchEmployee("Rahul")
```

---

# 9. Why Does Debounce Need Closure? 🔥🔥🔥

Because this variable:

```js
let timerId;
```

must be remembered between calls.

First call:

```text
timerId = timer #1
```

Second call must still know:

```text
timer #1
```

so it can cancel it.

That remembered access is closure.

---

# 10. What Does `...args` Do in Debounce?

```js
function printEmployee(
  id,
  name
) {
  // Step 1: Print both received values.
  console.log(
    id,
    name
  ); // Output: 101 Rahul
}

// Step 2: Create a debounced version.
const debouncedPrint =
  debounce(
    printEmployee,
    200
  );

// Step 3: These values are collected by ...args.
// Inside debounce:
// args = [101, "Rahul"]
debouncedPrint(
  101,
  "Rahul"
);
```

Output after the delay:

```text
101 Rahul
```

Inside debounce:

```text
args = [101, "Rahul"]
```

Then:

```js
fn(
  ...args
);
```

conceptually becomes:

```js
printEmployee(
  101,
  "Rahul"
);
```

---

# 11. Preserve `this` in Debounce 🔥🔥🔥

A stronger implementation should preserve the caller's `this` value.

```js
function debounce(
  fn,
  delay
) {
  // Step 1: Remember the current timer.
  let timerId;

  // Step 2: Use a normal function here
  // so this function can receive dynamic `this`.
  return function (
    ...args
  ) {
    // Step 3: Save the `this` value from this call.
    const context =
      this;

    // Step 4: Cancel the previous timer.
    clearTimeout(
      timerId
    );

    // Step 5: Start a new timer.
    timerId =
      setTimeout(
        () => {
          // Step 6: Execute fn with:
          // this = context
          // arguments = args
          fn.apply(
            context,
            args
          );
        },
        delay
      );
  };
}
```

Why `apply()`?

```text
fn.apply(context, args)
↓
preserves the original this
+
passes all arguments
```

---

# 12. Debounce Does NOT Cancel an Already Started API Request 🔥🔥🔥

This distinction is important:

```text
Debounce
→ controls when a function STARTS

AbortController
→ can cancel an already-started fetch
```

So a strong search flow can be:

```text
Typing
↓
Debounce
↓
Start latest fetch
↓
Abort previous fetch if still running
↓
Latest response updates UI
```

---

# 13. Debounce Interview Answer

```text
Debounce delays execution until
no new call has occurred for a specified delay.

Every new call clears the previous timer
and starts a new timer.

It is commonly used in search inputs
to avoid an API call on every keystroke.
```

---

# 14. THROTTLE 🔥🔥🔥

## What is throttle?

Throttle means:

```text
allow one execution
↓
block repeated calls for some time
↓
when interval ends
allow another execution
```

Simple definition:

> Throttle limits how frequently a function can execute.

---

# 15. Why Do We Need Throttle?

A scroll event can fire many times per second.

Without throttle:

```text
scroll event
↓
handler
scroll event
↓
handler
scroll event
↓
handler
...
```

This may be unnecessarily expensive.

With throttle:

```text
first event
↓
handler runs

more events during interval
↓
ignored

interval ends
↓
next event may run
```

Real uses:

```text
Scroll
Mouse move
Drag
Resize
Analytics
Position tracking
```

---

# 16. Build Throttle Step by Step 🔥🔥🔥

```js
function throttle(
  fn,
  delay
) {
  // Step 1: Track whether execution
  // is currently allowed.
  let allowed =
    true;

  // Step 2: Return the controlled function.
  return function (
    ...args
  ) {
    // Step 3: If we are inside the throttle window,
    // stop immediately and ignore this call.
    if (
      !allowed
    ) {
      return;
    }

    // Step 4: Block additional calls.
    allowed =
      false;

    // Step 5: Execute the original function immediately
    // with the same this and arguments.
    fn.apply(
      this,
      args
    );

    // Step 6: After delay milliseconds,
    // allow the next call again.
    setTimeout(
      () => {
        allowed =
          true;
      },
      delay
    );
  };
}
```

---

# 17. Throttle Example 🔥🔥🔥

```js
function trackScroll(
  position
) {
  // Step 1: Print the scroll position
  // only when throttle allows execution.
  console.log(
    `Scroll: ${position}`
  ); // Immediate Output from these calls: Scroll: 10
}

// Step 2: Create a throttled version.
// Only one execution is allowed per 1000ms.
const throttledScroll =
  throttle(
    trackScroll,
    1000
  );

// Step 3: allowed is true,
// so this call executes immediately.
throttledScroll(
  10
);

// Step 4: allowed is now false,
// so this call is ignored.
throttledScroll(
  20
);

// Step 5: Still inside the same 1000ms window,
// so this call is also ignored.
throttledScroll(
  30
);
```

Immediate output:

```text
Scroll: 10
```

Flow:

```text
allowed = true
↓
call 10
↓
allowed = false
↓
trackScroll(10)

call 20
↓
allowed = false
↓
ignored

call 30
↓
allowed = false
↓
ignored

1000ms passes
↓
allowed = true again
```

---

# 18. Debounce vs Throttle 🔥🔥🔥

```text
DEBOUNCE

call
call
call
call
↓
activity stops
↓
execute once
```

```text
THROTTLE

execute
ignore
ignore
↓
interval ends
↓
execute again when next call comes
```

Easy memory trick:

```text
Debounce
→ Wait until you stop

Throttle
→ Slow down how often you run
```

---

# 19. Search vs Scroll

Search box:

```text
Debounce
```

Why?

```text
We usually want the final typed value.
```

Scroll tracking:

```text
Throttle
```

Why?

```text
Scrolling may continue for a long time,
but we still want periodic updates.
```

---

# 20. Throttle Interview Answer 🔥🔥🔥

```text
Throttle limits a function
to at most one execution
within a configured interval.

It is useful for high-frequency events
like scroll, resize, and mousemove.
```

---
# 21. CURRYING 🔥🔥🔥

## What is currying?

Currying transforms this:

```js
sum(
  a,
  b,
  c
);
```

into this:

```js
sum(
  a
)(
  b
)(
  c
);
```

Instead of giving all arguments at once, we provide them in stages.

---

# 22. Why Do We Need Currying?

Currying helps us:

```text
preconfigure functions
reuse part of a function
build specialized functions
use closures
compose logic
```

---

# 23. Simple Currying Example 🔥🔥🔥

```js
function add(
  a
) {
  // Step 1: Receive the first value.
  // a will be remembered by closure.

  // Step 2: Return another function
  // that waits for the second value.
  return function (
    b
  ) {
    // Step 3: Add the remembered a
    // and the newly received b.
    return (
      a + b
    );
  };
}

// Step 4: Call add(10).
// This does NOT return the final sum yet.
// It returns a function remembering a = 10.
const addTen =
  add(
    10
  );

// Step 5: Call the returned function with 5.
// Now b = 5 and remembered a = 10.
const result =
  addTen(
    5
  );

// Step 6: Print the final result.
console.log(
  result
); // Output: 15
```

Output:

```text
15
```

Flow:

```text
add(10)
↓
a = 10
↓
returns function

addTen(5)
↓
b = 5
↓
a + b
↓
10 + 5
↓
15
```

---

# 24. Same Curry in One Expression

```js
// Step 1: add(10) returns a function.
// Step 2: (5) immediately calls that returned function.
const result =
  add(
    10
  )(
    5
  );

// Step 3: Print the final sum.
console.log(
  result
); // Output: 15
```

Output:

```text
15
```

---

# 25. Three-Level Currying 🔥🔥🔥

```js
function calculate(
  a
) {
  // Step 1: Receive and remember a.
  return function (
    b
  ) {
    // Step 2: Receive and remember b.
    return function (
      c
    ) {
      // Step 3: Receive c and use all three values.
      return (
        a + b + c
      );
    };
  };
}

// Step 4: First call stores a = 1.
// Step 5: Second call stores b = 2.
// Step 6: Third call receives c = 3.
const result =
  calculate(
    1
  )(
    2
  )(
    3
  );

// Step 7: Print 1 + 2 + 3.
console.log(
  result
); // Output: 6
```

Output:

```text
6
```

---

# 26. Real Currying Example — Logger 🔥🔥🔥

Suppose we repeatedly need:

```text
ERROR
API
<changing message>
```

Currying lets us configure the fixed parts once.

```js
function createLogger(
  level
) {
  // Step 1: Receive and remember the log level.
  return function (
    module
  ) {
    // Step 2: Receive and remember the module name.
    return function (
      message
    ) {
      // Step 3: Build the final string
      // from all remembered/current values.
      return (
        `[${level}] [${module}] ${message}`
      );
    };
  };
}

// Step 4: Configure level once.
const errorLogger =
  createLogger(
    "ERROR"
  );

// Step 5: Configure module once.
const apiErrorLogger =
  errorLogger(
    "API"
  );

// Step 6: Supply only the changing message.
const output =
  apiErrorLogger(
    "Request failed"
  );

// Step 7: Print final formatted text.
console.log(
  output
); // Output: [ERROR] [API] Request failed
```

Output:

```text
[ERROR] [API] Request failed
```

Why useful?

```text
ERROR and API are configured once.
Only message changes later.
```

---

# 27. Currying vs Partial Application

Currying:

```text
f(a, b, c)
↓
f(a)(b)(c)
```

Partial application:

```text
give some arguments now
↓
get a new function
↓
give remaining arguments later
```

They are related, but not identical.

---

# 28. Generic Curry Utility — Interview Awareness 🔥🔥🔥

```js
function curry(
  fn
) {
  // Step 1: Return a reusable curried wrapper.
  return function curried(
    ...args
  ) {
    // Step 2: Check whether we already collected
    // enough arguments for the original function.
    if (
      args.length
      >=
      fn.length
    ) {
      // Step 3: Enough arguments are available,
      // so execute the original function now.
      return fn(
        ...args
      );
    }

    // Step 4: Not enough arguments yet.
    // Return another function to collect more.
    return function (
      ...nextArgs
    ) {
      // Step 5: Combine old and new arguments,
      // then check again by calling curried.
      return curried(
        ...args,
        ...nextArgs
      );
    };
  };
}

function sum(
  a,
  b,
  c
) {
  // Step 6: Add all three values.
  return (
    a + b + c
  );
}

// Step 7: Convert sum into a curried function.
const curriedSum =
  curry(
    sum
  );

// Step 8: Supply arguments one by one.
const result =
  curriedSum(
    1
  )(
    2
  )(
    3
  );

// Step 9: Print the final result.
console.log(
  result
); // Output: 6
```

Output:

```text
6
```

---

# 29. What Is `fn.length` Here?

For:

```js
function sum(
  a,
  b,
  c
) {
  // Step 1: Return the sum.
  return a + b + c;
}

// Step 2: Read how many parameters
// are declared before defaults/rest complications.
console.log(
  sum.length
); // Output: 3
```

Output:

```text
3
```

Our simple curry utility uses that `3` to know when enough arguments have been collected.

---

# 30. MEMOIZATION 🔥🔥🔥

## What is memoization?

Memoization means:

```text
run an expensive function
↓
store the result in cache

same input comes again
↓
return cached result
↓
do not calculate again
```

---

# 31. Why Do We Need Memoization?

Suppose this expensive calculation is called repeatedly with the same input.

Without memoization:

```text
calculate(5)
calculate(5)
calculate(5)
↓
calculate three times
```

With memoization:

```text
first calculate(5)
↓
store result

next calculate(5)
↓
return cache
```

Real uses:

```text
expensive calculations
repeated transformations
derived data
recursive algorithms
reusing API-like computed results
```

---

# 32. Build Memoize Step by Step 🔥🔥🔥

```js
function memoize(
  fn
) {
  // Step 1: Create a private cache.
  // Map will store input -> result.
  const cache =
    new Map();

  // Step 2: Return a wrapper function.
  return function (
    value
  ) {
    // Step 3: Check whether this input
    // already has a cached result.
    if (
      cache.has(
        value
      )
    ) {
      // Step 4: Cache hit.
      // Return the old result immediately.
      return cache.get(
        value
      );
    }

    // Step 5: Cache miss.
    // Execute the original function.
    const result =
      fn(
        value
      );

    // Step 6: Save the result for future calls.
    cache.set(
      value,
      result
    );

    // Step 7: Return the newly calculated result.
    return result;
  };
}
```

---

# 33. Memoization Example 🔥🔥🔥

```js
let calculationCount =
  0;

function square(
  number
) {
  // Step 1: Increase this counter only when
  // the REAL square function executes.
  calculationCount++;

  // Step 2: Calculate and return the square.
  return (
    number * number
  );
}

// Step 3: Create a memoized version of square.
const memoizedSquare =
  memoize(
    square
  );

// Step 4: First call with 5.
// Cache does not contain 5,
// so square(5) really runs.
console.log(
  memoizedSquare(
    5
  )
); // Output: 25

// Step 5: Second call with the same 5.
// Cache already contains 5,
// so square(5) does NOT run again.
console.log(
  memoizedSquare(
    5
  )
); // Output: 25

// Step 6: The original square function
// executed only once.
console.log(
  calculationCount
); // Output: 1
```

Output:

```text
25
25
1
```

Trace:

```text
memoizedSquare(5)
↓
cache.has(5) = false
↓
square(5)
↓
25
↓
cache.set(5, 25)

memoizedSquare(5)
↓
cache.has(5) = true
↓
return 25 from cache

calculationCount = 1
```

---

# 34. Why Is `Map` Useful Here?

`Map` directly gives us:

```text
cache.has(key)
cache.get(key)
cache.set(key, value)
```

That matches exactly what a cache needs.

---

# 35. Memoization Works Best With Pure Functions 🔥🔥🔥

A pure function gives:

```text
same input
→ same output
```

Good example:

```js
function double(
  value
) {
  // Step 1: Result depends only on value.
  return (
    value * 2
  );
}
```

Risky example:

```js
let taxRate =
  0.1;

function calculatePrice(
  price
) {
  // Step 1: Result depends on external taxRate too.
  return (
    price
    +
    price * taxRate
  );
}
```

If `taxRate` changes, an old cached result may become wrong.

---

# 36. Multi-Argument Memoization 🔥🔥🔥

For multiple arguments, we need one cache key representing all arguments.

Simple interview version:

```js
function memoizeMultiple(
  fn
) {
  // Step 1: Create the private cache.
  const cache =
    new Map();

  // Step 2: Accept any number of arguments.
  return function (
    ...args
  ) {
    // Step 3: Convert arguments into one string key.
    // Example: [10, 20] becomes "[10,20]".
    const key =
      JSON.stringify(
        args
      );

    // Step 4: If key already exists,
    // return its cached result.
    if (
      cache.has(
        key
      )
    ) {
      return cache.get(
        key
      );
    }

    // Step 5: Otherwise execute fn with all arguments.
    const result =
      fn(
        ...args
      );

    // Step 6: Store the result using the generated key.
    cache.set(
      key,
      result
    );

    // Step 7: Return the result.
    return result;
  };
}

function addNumbers(
  a,
  b
) {
  // Step 8: Add both numbers.
  return (
    a + b
  );
}

// Step 9: Create memoized add.
const memoizedAdd =
  memoizeMultiple(
    addNumbers
  );

// Step 10: First [10,20] call calculates 30.
console.log(
  memoizedAdd(
    10,
    20
  )
); // Output: 30

// Step 11: Same [10,20] key returns cached 30.
console.log(
  memoizedAdd(
    10,
    20
  )
); // Output: 30
```

Output:

```text
30
30
```

---

# 37. `JSON.stringify()` Cache-Key Limitation

This is easy for interviews, but it is not perfect for every production value.

Potential problems:

```text
circular objects
functions
symbols
undefined
large objects
special structures
```

So remember:

```text
Memoization does NOT mean
"always use JSON.stringify".
```

It is only one simple strategy.

---

# 38. Memoization Memory Risk 🔥🔥🔥

Every unique key can stay in memory.

```text
1 unique input
→ 1 cache entry

100000 unique inputs
→ potentially 100000 entries
```

Production strategies can include:

```text
TTL
LRU
cache-size limit
WeakMap
manual invalidation
```

---

# 39. Async Memoization Awareness

If the original function returns a Promise, memoization can cache the Promise itself.

That means:

```text
first caller starts request
↓
Promise cached
↓
second caller with same key
↓
gets same in-flight Promise
```

But be careful:

```text
If the cached Promise rejects,
do you want to keep that rejection forever?
```

Often you may remove failed entries so a later call can retry.

---

# 40. Memoization Interview Answer 🔥🔥🔥

```text
Memoization caches a function's result
for previously seen inputs.

When the same input appears again,
the cached result is returned
instead of recalculating.

It works best with pure functions,
and in production I also consider
cache-key design and memory growth.
```

---
# 41. COMPOSE 🔥🔥🔥

## What is compose?

Compose combines multiple small functions into one function.

The important rule is:

```text
COMPOSE
→ RIGHT TO LEFT
```

Example:

```text
compose(double, addOne)(5)
```

means:

```text
addOne(5)
↓
double(result)
```

---

# 42. Why Do We Need Compose?

Instead of writing one very large transformation function, we can create small reusable functions.

Example:

```text
trim text
↓
lowercase it
↓
add prefix
```

Small functions are easier to:

```text
read
test
reuse
debug
```

Compose joins them together.

---

# 43. Build Compose Step by Step 🔥🔥🔥

```js
function compose(
  ...functions
) {
  // Step 1: Collect all supplied functions into an array.
  // Example:
  // functions = [double, addOne]

  // Step 2: Return one new function
  // representing the whole composition.
  return function (
    value
  ) {
    // Step 3: Use reduceRight because compose
    // executes functions from RIGHT to LEFT.
    return functions.reduceRight(
      (
        result,
        fn
      ) => {
        // Step 4: Pass the current result
        // into the next function.
        return fn(
          result
        );
      },
      value
    );
  };
}
```

---

# 44. Compose Example 🔥🔥🔥

```js
function addOne(
  value
) {
  // Step 1: Add 1 to the value.
  return (
    value + 1
  );
}

function double(
  value
) {
  // Step 2: Multiply the value by 2.
  return (
    value * 2
  );
}

// Step 3: Compose runs RIGHT to LEFT.
// So addOne runs first,
// then double runs.
const calculate =
  compose(
    double,
    addOne
  );

// Step 4: Start with 5.
// addOne(5) -> 6
// double(6) -> 12
const result =
  calculate(
    5
  );

// Step 5: Print the final result.
console.log(
  result
); // Output: 12
```

Output:

```text
12
```

Flow:

```text
calculate(5)
↓
addOne(5)
↓
6
↓
double(6)
↓
12
```

---

# 45. Why `reduceRight()`?

If functions are:

```text
[f, g, h]
```

Compose executes:

```text
h
↓
g
↓
f
```

That is right-to-left traversal.

So:

```text
reduceRight()
```

matches the compose direction.

---

# 46. PIPE 🔥🔥🔥

## What is pipe?

Pipe is very similar to compose.

The difference is direction:

```text
PIPE
→ LEFT TO RIGHT
```

Example:

```text
pipe(addOne, double)(5)
```

means:

```text
addOne(5)
↓
double(result)
```

---

# 47. Build Pipe Step by Step 🔥🔥🔥

```js
function pipe(
  ...functions
) {
  // Step 1: Collect all transformation functions.

  // Step 2: Return one combined function.
  return function (
    value
  ) {
    // Step 3: Use normal reduce because pipe
    // executes from LEFT to RIGHT.
    return functions.reduce(
      (
        result,
        fn
      ) => {
        // Step 4: Send the current result
        // into the next function.
        return fn(
          result
        );
      },
      value
    );
  };
}
```

---

# 48. Pipe Example 🔥🔥🔥

```js
function addOne(
  value
) {
  // Step 1: Add 1.
  return (
    value + 1
  );
}

function double(
  value
) {
  // Step 2: Multiply by 2.
  return (
    value * 2
  );
}

// Step 3: Pipe runs LEFT to RIGHT.
// addOne runs first,
// then double.
const calculate =
  pipe(
    addOne,
    double
  );

// Step 4: Start with 5.
// addOne(5) -> 6
// double(6) -> 12
const result =
  calculate(
    5
  );

// Step 5: Print final result.
console.log(
  result
); // Output: 12
```

Output:

```text
12
```

---

# 49. Compose vs Pipe 🔥🔥🔥

```text
compose
→ right to left
→ reduceRight()

pipe
→ left to right
→ reduce()
```

Easy memory trick:

```text
Pipe looks like a real pipeline:

input
→ step 1
→ step 2
→ step 3
→ output
```

---

# 50. Real Pipe Example — Employee ID Normalization 🔥🔥🔥

```js
function trimText(
  value
) {
  // Step 1: Remove spaces from both ends.
  return value.trim();
}

function toLower(
  value
) {
  // Step 2: Convert the string to lowercase.
  return value.toLowerCase();
}

function addEmployeePrefix(
  value
) {
  // Step 3: Add a fixed prefix.
  return (
    `emp-${value}`
  );
}

// Step 4: Build a left-to-right transformation pipeline.
const normalizeEmployeeId =
  pipe(
    trimText,
    toLower,
    addEmployeePrefix
  );

// Step 5: Pass the raw value through all three steps.
const result =
  normalizeEmployeeId(
    "  ABC123  "
  );

// Step 6: Print the final normalized ID.
console.log(
  result
); // Output: emp-abc123
```

Output:

```text
emp-abc123
```

Flow:

```text
"  ABC123  "
↓
trimText
↓
"ABC123"
↓
toLower
↓
"abc123"
↓
addEmployeePrefix
↓
"emp-abc123"
```

---

# 51. ONCE 🔥🔥🔥

## What is `once()`?

`once()` wraps a function so that the original function executes only the first time.

Later calls either:

```text
return the first cached result
```

or, in another implementation:

```text
do nothing
```

We will use the cached-result version.

---

# 52. Why Do We Need `once()`?

Some work should happen only once:

```text
initialize SDK
load global config
setup connection
register one-time setup
initialize analytics
```

Calling such setup multiple times may be wasteful or dangerous.

---

# 53. Build `once()` Step by Step 🔥🔥🔥

```js
function once(
  fn
) {
  // Step 1: Remember whether fn has already executed.
  let called =
    false;

  // Step 2: Store the first result
  // so later calls can reuse it.
  let result;

  // Step 3: Return the wrapped function.
  return function (
    ...args
  ) {
    // Step 4: If fn already ran,
    // return the previously stored result.
    if (
      called
    ) {
      return result;
    }

    // Step 5: Mark it as called BEFORE execution
    // so later calls know initialization started.
    called =
      true;

    // Step 6: Execute the original function
    // and save its result.
    result =
      fn.apply(
        this,
        args
      );

    // Step 7: Return the first result.
    return result;
  };
}
```

---

# 54. Once Example 🔥🔥🔥

```js
let realCalls =
  0;

function initialize(
  name
) {
  // Step 1: Count how many times
  // the ORIGINAL function really executes.
  realCalls++;

  // Step 2: Build and return initialization result.
  return (
    `Ready ${name}`
  );
}

// Step 3: Wrap initialize with once.
const initializeOnce =
  once(
    initialize
  );

// Step 4: First call executes initialize("App").
console.log(
  initializeOnce(
    "App"
  )
); // Output: Ready App

// Step 5: Second call does NOT execute initialize again.
// It returns the first cached result,
// so "Other" is ignored by this implementation.
console.log(
  initializeOnce(
    "Other"
  )
); // Output: Ready App

// Step 6: Prove the original function ran only once.
console.log(
  realCalls
); // Output: 1
```

Output:

```text
Ready App
Ready App
1
```

Flow:

```text
first call
↓
called = false
↓
called becomes true
↓
initialize("App")
↓
result = "Ready App"

second call
↓
called = true
↓
return cached "Ready App"
↓
initialize does not run
```

---

# 55. `once()` With Async Function 🔥🔥🔥

If the original function returns a Promise, `once()` stores that Promise.

That means multiple callers can share the same in-flight work.

Example concept:

```text
first call
↓
start loadConfig()
↓
Promise stored

second call before completion
↓
returns same Promise
```

This can be useful for:

```text
loadConfigOnce()
initializeSdkOnce()
connectOnce()
```

---

# 56. Async `once()` Failure Caution

If the first Promise rejects and we permanently cache it:

```text
first call
→ rejected Promise cached

future calls
→ same rejected Promise again
```

Sometimes that is correct.

Sometimes we want:

```text
failure
↓
reset
↓
allow another attempt later
```

That requirement must be decided explicitly.

---

# 57. RETRY 🔥🔥🔥

## What is retry?

Retry means:

```text
run async operation
↓
failure?
↓
try again
↓
stop after a limit
```

Typical use cases:

```text
temporary network failure
502
503
504
timeout
unstable external service
```

---

# 58. Why Do We Need Retry?

Some failures are temporary.

Example:

```text
API request fails once
↓
network becomes stable
↓
second attempt succeeds
```

Instead of immediately failing the whole user flow, we may retry safely.

But:

```text
NOT every error should be retried.
```

---

# 59. Build Retry Step by Step 🔥🔥🔥

```js
async function retry(
  operation,
  retries = 3
) {
  // Step 1: Keep the most recent error.
  // If every attempt fails,
  // we will throw this final error.
  let lastError;

  // Step 2: Loop from attempt 0 through retries.
  // retries = 3 means:
  // 1 initial attempt + 3 retries = 4 total attempts.
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3: Execute the async operation.
      // If it succeeds, return immediately
      // and stop the loop.
      return await operation();
    } catch (
      error
    ) {
      // Step 4: Save this failure.
      // The loop will continue if attempts remain.
      lastError =
        error;
    }
  }

  // Step 5: If we reached here,
  // every attempt failed.
  throw lastError;
}
```

---

# 60. Retry Example 🔥🔥🔥

```js
let attemptCount =
  0;

async function unstableTask() {
  // Step 1: Count this attempt.
  attemptCount++;

  // Step 2: Show which attempt is currently running.
  console.log(
    `Attempt ${attemptCount}`
  );
  // Outputs across calls:
  // Attempt 1
  // Attempt 2
  // Attempt 3

  // Step 3: Fail attempts 1 and 2.
  if (
    attemptCount
    <
    3
  ) {
    throw new Error(
      "Temporary failure"
    );
  }

  // Step 4: Attempt 3 succeeds.
  return "Success";
}

async function run() {
  // Step 5: Allow up to 3 retries.
  // Our task will actually succeed on attempt 3.
  const result =
    await retry(
      unstableTask,
      3
    );

  // Step 6: Print the successful returned value.
  console.log(
    result
  ); // Final Output: Success
}

// Step 7: Start the retry flow.
run();
```

Output:

```text
Attempt 1
Attempt 2
Attempt 3
Success
```

Flow:

```text
Attempt 1
↓
throws
↓
catch saves error
↓
retry

Attempt 2
↓
throws
↓
catch saves error
↓
retry

Attempt 3
↓
returns "Success"
↓
retry() returns immediately
```

---

# 61. Very Important: Retries vs Total Attempts 🔥🔥🔥

In our implementation:

```text
retries = 3
```

means:

```text
1 original attempt
+
3 retries
=
4 possible total attempts
```

Interviewers may specifically ask this.

Do not confuse:

```text
retries
```

with:

```text
total attempts
```

---

# 62. Retry With Delay 🔥🔥🔥

Retrying immediately can hit the server repeatedly.

So we may wait between attempts.

First create `sleep()`:

```js
function sleep(
  ms
) {
  // Step 1: Return a Promise.
  return new Promise(
    (
      resolve
    ) => {
      // Step 2: Resolve that Promise
      // after ms milliseconds.
      setTimeout(
        resolve,
        ms
      );
    }
  );
}
```

Now use it in retry:

```js
async function retryWithDelay(
  operation,
  retries = 3,
  delay = 500
) {
  // Step 1: Remember the latest error.
  let lastError;

  // Step 2: Run the initial attempt
  // plus the allowed retries.
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3: Try the operation.
      // Success returns immediately.
      return await operation();
    } catch (
      error
    ) {
      // Step 4: Save the failure.
      lastError =
        error;

      // Step 5: If another retry remains,
      // wait before trying again.
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

  // Step 6: Every attempt failed.
  throw lastError;
}
```

---

# 63. Exponential Backoff Awareness 🔥🔥🔥

Instead of waiting the same time:

```text
500ms
500ms
500ms
```

we can increase the delay:

```text
500ms
1000ms
2000ms
4000ms
```

This is called:

```text
exponential backoff
```

Simple calculation:

```js
function getBackoffDelay(
  baseDelay,
  attempt
) {
  // Step 1: Double the delay for each attempt.
  return (
    baseDelay
    *
    2 ** attempt
  );
}

// Step 2: attempt 0 -> 500 * 1.
console.log(
  getBackoffDelay(
    500,
    0
  )
); // Output: 500

// Step 3: attempt 1 -> 500 * 2.
console.log(
  getBackoffDelay(
    500,
    1
  )
); // Output: 1000

// Step 4: attempt 2 -> 500 * 4.
console.log(
  getBackoffDelay(
    500,
    2
  )
); // Output: 2000
```

Output:

```text
500
1000
2000
```

---

# 64. Which Errors Should Be Retried? 🔥🔥🔥

Possible retry candidates:

```text
network interruption
502
503
504
temporary timeout
```

Usually do not blindly retry:

```text
400 bad request
401 unauthorized
403 forbidden
validation error
```

Why?

Because retrying the same invalid request usually changes nothing.

---

# 65. POST Retry Warning 🔥🔥🔥

Suppose this fails after the server already created the order:

```text
POST /orders
```

If we blindly retry:

```text
order 1 created
↓
client thinks request failed
↓
retry
↓
order 2 created
```

Possible duplicate.

So critical mutations may need:

```text
idempotency key
server-side duplicate protection
```

---

# 66. Debounce vs Throttle vs Memoize vs Once 🔥🔥🔥

```text
Debounce
→ controls WHEN after rapid calls

Throttle
→ controls HOW OFTEN

Memoize
→ controls repeated CALCULATION

Once
→ controls NUMBER OF EXECUTIONS
```

---

# 67. Curry vs Compose vs Pipe

```text
Currying
→ provide arguments in stages

Compose
→ combine functions right to left

Pipe
→ combine functions left to right
```

---

# 68. Pattern Decision Guide 🔥🔥🔥

```text
Search box?
→ Debounce

Scroll handler?
→ Throttle

Need reusable preconfigured function?
→ Currying / partial application

Same expensive input repeated?
→ Memoization

Need right-to-left transformations?
→ Compose

Need left-to-right transformations?
→ Pipe

Initialization must happen one time?
→ Once

Temporary async failure?
→ Retry
```

---

# 69. Output Question — Debounce 🔥🔥🔥

Assume all three calls happen quickly inside the debounce delay:

```js
function print(
  value
) {
  // Step 1: Print whichever call survives debounce.
  console.log(
    value
  ); // Final Output: C
}

// Step 2: Create a debounced print function.
const debouncedPrint =
  debounce(
    print,
    300
  );

// Step 3: Schedule A.
debouncedPrint(
  "A"
);

// Step 4: Cancel A and schedule B.
debouncedPrint(
  "B"
);

// Step 5: Cancel B and schedule C.
debouncedPrint(
  "C"
);
```

Output:

```text
C
```

Why?

```text
A timer cancelled
B timer cancelled
C timer survives
```

---

# 70. Output Question — Throttle 🔥🔥🔥

Assume the three calls happen immediately:

```js
function print(
  value
) {
  // Step 1: Print only an allowed call.
  console.log(
    value
  ); // Immediate Output: 1
}

// Step 2: Allow only one call per second.
const throttledPrint =
  throttle(
    print,
    1000
  );

// Step 3: First call is allowed.
throttledPrint(
  1
);

// Step 4: Blocked.
throttledPrint(
  2
);

// Step 5: Blocked.
throttledPrint(
  3
);
```

Immediate output:

```text
1
```

---

# 71. Output Question — Currying 🔥🔥🔥

```js
function multiply(
  a
) {
  // Step 1: Remember a.
  return function (
    b
  ) {
    // Step 2: Multiply remembered a by b.
    return (
      a * b
    );
  };
}

// Step 3: 5 is remembered as a,
// then 4 becomes b.
const result =
  multiply(
    5
  )(
    4
  );

// Step 4: Print 5 * 4.
console.log(
  result
); // Output: 20
```

Output:

```text
20
```

---

# 72. Output Question — Memoization 🔥🔥🔥

```js
let calls =
  0;

function double(
  value
) {
  // Step 1: Count actual calculations.
  calls++;

  // Step 2: Return doubled value.
  return (
    value * 2
  );
}

// Step 3: Memoize double.
const memoizedDouble =
  memoize(
    double
  );

// Step 4: First 10 is calculated and cached.
console.log(
  memoizedDouble(
    10
  )
); // Output: 20

// Step 5: Same 10 comes from cache.
console.log(
  memoizedDouble(
    10
  )
); // Output: 20

// Step 6: Original double ran once.
console.log(
  calls
); // Output: 1
```

Output:

```text
20
20
1
```

---

# 73. Output Question — Compose vs Pipe 🔥🔥🔥

```js
function plusTwo(
  value
) {
  // Step 1: Add 2.
  return (
    value + 2
  );
}

function timesThree(
  value
) {
  // Step 2: Multiply by 3.
  return (
    value * 3
  );
}

// Step 3: Compose is right to left.
// timesThree(4) -> 12
// plusTwo(12) -> 14
const composeResult =
  compose(
    plusTwo,
    timesThree
  )(
    4
  );

// Step 4: Pipe is left to right.
// plusTwo(4) -> 6
// timesThree(6) -> 18
const pipeResult =
  pipe(
    plusTwo,
    timesThree
  )(
    4
  );

// Step 5: Print compose result.
console.log(
  composeResult
); // Output: 14

// Step 6: Print pipe result.
console.log(
  pipeResult
); // Output: 18
```

Output:

```text
14
18
```

---

# 74. Output Question — Once 🔥🔥🔥

```js
let count =
  0;

function increment() {
  // Step 1: Increase the real count.
  count++;

  // Step 2: Return the new count.
  return count;
}

// Step 3: Make increment executable only once.
const incrementOnce =
  once(
    increment
  );

// Step 4: Original increment runs.
console.log(
  incrementOnce()
); // Output: 1

// Step 5: Original increment does not run again.
// Cached first result is returned.
console.log(
  incrementOnce()
); // Output: 1

// Step 6: Real count proves increment ran once.
console.log(
  count
); // Output: 1
```

Output:

```text
1
1
1
```

---

# 75. Interview — Debounce vs Throttle 🔥🔥🔥

Good answer:

```text
Debounce waits until calls stop
and then executes once.

Throttle allows execution
at a controlled maximum frequency
while calls continue.

I normally use debounce for search input
and throttle for scroll or mousemove events.
```

---

# 76. Interview — Why Does Debounce Use Closure?

```text
The returned function must remember
the previous timer ID between calls.

Closure keeps timerId alive,
so the next call can cancel the previous timer.
```

---

# 77. Interview — What Is Currying? 🔥🔥🔥

```text
Currying transforms a function
that accepts multiple arguments
into a sequence of function calls
that receive arguments in stages.

Example:
f(a, b, c)
becomes
f(a)(b)(c).

It is useful for creating reusable,
partially configured functions.
```

---

# 78. Interview — What Is Memoization?

```text
Memoization caches a function result
for a previously seen input.

When the same input appears again,
the cached result is returned
instead of recalculating.

It is most reliable with pure functions.
```

---

# 79. Interview — Compose vs Pipe 🔥🔥🔥

```text
Compose executes functions right to left.
Pipe executes functions left to right.

Both are used to combine small transformation functions
into one reusable flow.
```

---

# 80. Interview — What Is Once?

```text
Once wraps a function
so the original function executes only once.

Later calls can return the cached first result
without executing the original function again.
```

---

# 81. Interview — Retry Safety 🔥🔥🔥

```text
I retry only failures that may be temporary,
such as network issues or some 5xx responses.

I also check whether repeating the operation is safe.
For non-idempotent mutations like payments or orders,
a blind retry can create duplicate effects.
```

---

# 82. Debugging Checklist 🔥🔥🔥

```text
DEBOUNCE
Did I clear the previous timer?
Did I keep the latest arguments?
Did I preserve this when needed?

THROTTLE
Am I blocking calls during the interval?
Do I need leading or trailing behavior?

CURRYING
Am I returning another function?
Are earlier arguments remembered by closure?

MEMOIZATION
Is the function pure?
Is my cache key correct?
Can the cache grow forever?

COMPOSE / PIPE
Did I use the correct direction?
compose = right to left
pipe = left to right

ONCE
Should later calls reuse the first result?
What should happen if the first async call fails?

RETRY
What does retries mean?
How many total attempts are allowed?
Should there be a delay?
Should there be backoff?
Is the operation safe to repeat?
```

---

# 83. Final Real-App Decision Guide 🔥🔥🔥

```text
User typing search text rapidly
→ debounce

Scroll event firing constantly
→ throttle

Create reusable ERROR/API logger
→ currying

Expensive calculation with repeated same input
→ memoization

Transformation should read right to left
→ compose

Transformation should read left to right
→ pipe

SDK should initialize only once
→ once

Temporary API failure may succeed later
→ retry
```

---

# 84. Final Master Mental Model 🔥🔥🔥

```text
Debounce
→ wait until activity stops

Throttle
→ limit execution frequency

Currying
→ remember arguments in stages

Memoization
→ remember previous results

Compose
→ functions flow right to left

Pipe
→ functions flow left to right

Once
→ remember first execution/result

Retry
→ repeat failed async work safely
```

Notice how many of these depend on closure:

```text
Debounce
→ timerId

Throttle
→ allowed

Currying
→ previous arguments

Memoization
→ cache

Once
→ called + result
```

So closure is not just theory.
It directly powers these practical utilities.

---

# Quick Memory 🧠🔥🔥🔥

## Debounce

```text
Wait until calls stop.
```

## Throttle

```text
Limit how often calls can execute.
```

## Currying

```text
f(a, b, c)
→ f(a)(b)(c)
```

## Memoization

```text
same input
→ cached result
```

## Compose

```text
right → left
```

## Pipe

```text
left → right
```

## Once

```text
execute original function once
```

## Retry

```text
failure
↓
try again safely
↓
stop after limit
```

## Search

```text
Debounce
```

## Scroll

```text
Throttle
```

## Expensive Pure Calculation

```text
Memoize
```

## One-Time Initialization

```text
Once
```

## Temporary API Failure

```text
Retry
```

---

# 85. Best Interview Answer for the Whole Chapter 🔥🔥🔥

```text
Function patterns are reusable higher-order utilities
that control how other functions behave.

Debounce waits until rapid calls stop,
while throttle limits execution frequency.

Currying lets me provide arguments in stages
and reuse partially configured functions.

Memoization caches results for repeated inputs.

Compose and pipe combine small transformations,
with compose running right to left
and pipe running left to right.

Once guarantees one-time execution,
and retry repeats safe async operations
when temporary failures occur.

Most of these patterns rely heavily on closures,
because the returned function must remember state
such as timer IDs, cached values, previous arguments,
or whether execution already happened.
```

---

# ✅ 9.1 Function Patterns Complete — Regenerated Version

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ← NEXT
9.3 Function Polyfills
9.4 Build Utilities
9.5 Data Transformation
9.6 Machine-Coding Utilities
9.7 Promise Implementations
9.8 Event System
9.9 String Utilities
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.2 Array Polyfills 🔥🔥🔥
├── myForEach
├── myMap
├── myFilter
├── myReduce
├── myFind
├── mySome
└── myEvery
```

**Next: 9.2 Array Polyfills 🔥🔥🔥**
