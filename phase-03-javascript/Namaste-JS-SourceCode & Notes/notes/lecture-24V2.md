 
# Promise.race(<Iterable>) –

The promise that finishes first or gets settled first will be the winner.

The API will return the first settled promise result, irrespective of whether the promise is resolved or rejected.

Promise.race() is a powerful method in JavaScript that executes multiple promises in parallel and returns a single promise that settles as soon as the first promise resolves or rejects."

# Key Points About Promise.race()

✔ Returns a Single Promise → The final result is wrapped inside a single promise.

✔ Settles on the First Resolved or Rejected Promise → As soon as any promise settles (either resolves or rejects), Promise.race() returns that result immediately.

✔ Does Not Wait for All Promises → Unlike Promise.all() and Promise.allSettled(), it stops execution as soon as the first promise settles.

✔ Execution Order Matters → The result depends on which promise settles first, not the order in the input array.

✔ Useful for Performance Optimization → Ideal for timeout mechanisms, API fallbacks, and controlling execution speed.


#  Key Characteristics of Promise.race()

✅ Runs Promises in Parallel → All promises start execution at the same time.

✅ Settles on the First Completion → Returns the value of the first resolved or rejected promise.

✅ Does Not Wait for All Promises → Unlike Promise.allSettled(), it stops as soon as the fastest promise settles.

✅ Ignores Slower Promises → Any remaining promises continue executing, but their results are ignored.

✅ Useful for Timeouts and Fallbacks → Can be used to create timeouts for slow API requests.

✅ Non-Promise Values Are Auto-Resolved → If an array contains normal values, they are treated as already resolved with a "fulfilled" status.


**Syntax for Promise.race()**

Promise.race(iterable); Where: iterable → An array (or any iterable) of promises.


# 🚀 Promise.race() – Use Cases and Examples


**Case 1: First Promise Resolves**

✅ Scenario: If the first promise resolves fastest, it returns that value.

```js

Promise.race([
  new Promise(resolve => setTimeout(() => resolve("✅ Fast"), 1000)),
  new Promise(resolve => setTimeout(() => resolve("✅ Slow"), 3000)),
]).then(console.log);

```

✅ Output:

"✅ Fast"

👉 Explanation:

The first promise resolves in 1 second, so Promise.race() returns "✅ Fast" immediately, ignoring "✅ Slow".


**Case 2: First Promise Rejects**

✅ Scenario: If the first promise rejects, Promise.race() rejects with that reason.

```js

Promise.race([
  new Promise((_, reject) => setTimeout(() => reject("❌ Failed Fast"), 1000)),
  new Promise(resolve => setTimeout(() => resolve("✅ Success"), 3000)),
]).catch(console.log);


```

✅ Output:

"❌ Failed Fast"

👉 Explanation:

-> The first promise rejects in 1 second, so Promise.race() immediately rejects.
-> The second promise is ignored.


**Case 3: Handling Timeouts**

✅ Scenario: Setting a timeout for an API request.

```js

const fetchData = new Promise(resolve => setTimeout(() => resolve("📡 Data Loaded"), 3000));

const timeout = new Promise((_, reject) => setTimeout(() => reject("⏳ Timeout!"), 2000));

Promise.race([fetchData, timeout])
  .then(console.log)
  .catch(console.log);

```

✅ Output:

"⏳ Timeout!"

👉 Explanation:

-> If the API request (fetchData) takes longer than 2 seconds, the timeout rejects first.
-> Promise.race() immediately returns "⏳ Timeout!" and stops waiting.


**Case 4: Non-Promise Values**

✅ Scenario: Non-promise values resolve immediately.

```js

Promise.race([
  "🚀 Instant Value",
  new Promise(resolve => setTimeout(() => resolve("✅ Delayed"), 2000)),
]).then(console.log);

```

✅ Output:

"🚀 Instant Value"


👉 Explanation:

-> "🚀 Instant Value" is not a promise, so it resolves immediately.
-> Promise.race() ignores the second promise.


**Case 5: Fastest Rejected Promise**

✅ Scenario: If the fastest promise rejects, Promise.race() rejects immediately.

```js

Promise.race([
  new Promise((_, reject) => setTimeout(() => reject("❌ Quick Failure"), 500)),
  new Promise(resolve => setTimeout(() => resolve("✅ Success"), 2000)),
]).catch(console.log);

```
✅ Output:

"❌ Quick Failure"


👉 Explanation:

-> Since the rejection happens first in 500ms, Promise.race() immediately rejects.
-> The second promise is ignored.


**Case 6: Handling API Fallbacks**

✅ Scenario: Using multiple servers and picking the fastest one.

```js

const api1 = new Promise(resolve => setTimeout(() => resolve("📡 API 1 Response"), 3000));
const api2 = new Promise(resolve => setTimeout(() => resolve("📡 API 2 Response"), 2000));

Promise.race([api1, api2]).then(console.log);

```

✅ Output:

"📡 API 2 Response"


👉 Explanation:

-> The faster API (api2) responds in 2 seconds, so Promise.race() returns its result.
->api1 is ignored.