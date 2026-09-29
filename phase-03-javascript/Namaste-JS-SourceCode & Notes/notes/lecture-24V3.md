# Promise.any(<Iterable>) – (Success seeking API)

-> Similar to Promise.race(), the only difference is that Promise.any() waits for the first fulfilled promise. It returns the first fulfilled promise's result.

-> Promise.any() is a built-in JavaScript method that runs multiple promises in parallel and returns the first fulfilled promise.

-> If all the promises are rejected, Promise.any() rejects with an AggregateError, which contains all rejection reasons.


# ✅ Key Points About Promise.any()

✔ Returns a Single Promise → The final result is wrapped inside a single promise.

✔ Resolves on the First Fulfilled Promise → Unlike Promise.race(), it ignores rejections and only returns the first resolved value.

✔ Waits for a Successful Resolution → If all promises reject, it fails with AggregateError.

✔ Does Not Stop on Failure → Unlike Promise.all(), it continues execution even if some promises reject.

✔ Useful for Fallbacks and First Successful Execution → Ideal when you want to return the first available successful result from multiple sources.


# 📌 Key Characteristics of Promise.any()

✅ Runs Promises in Parallel → Executes all promises simultaneously.

✅ Resolves as Soon as One Promise is Fulfilled → It ignores all rejections unless they all fail.

✅ Does Not Stop on Rejections → It keeps running until it finds a resolved promise.

✅ Fails Only If All Promises Reject → If all promises fail, it throws AggregateError.

✅ Useful for API Fallbacks & First Successful Execution → Ideal when requesting the same data from multiple servers and returning the first successful response.

✅ Non-Promise Values Are Auto-Resolved → If an array contains normal values, they are treated as already resolved with a "fulfilled" status.


**📌 Syntax for Promise.any()**

Promise.any(iterable);  📌 Where: iterable → An array (or any iterable) of promises.


# 🚀 Promise.any() – Use Cases and Examples


**Case 1: First Fulfilled Promise**

✅ Scenario: If the first promise resolves fastest, Promise.any() returns that value.

```js

Promise.any([
  new Promise(resolve => setTimeout(() => resolve("✅ Fast"), 1000)),
  new Promise(resolve => setTimeout(() => resolve("✅ Slow"), 3000)),
]).then(console.log);

```

✅ Output:

"✅ Fast"

👉 Explanation:

The first promise resolves in 1 second, so Promise.any() returns "✅ Fast", ignoring "✅ Slow".


**🔷 Case 2: Some Promises Reject, But One Resolves**


✅ Scenario: If some promises reject but at least one resolves, Promise.any() returns the first resolved value.

```js

Promise.any([
  new Promise((_, reject) => setTimeout(() => reject("❌ Failed Fast"), 1000)),
  new Promise(resolve => setTimeout(() => resolve("✅ Success"), 2000)),
]).then(console.log);

```

✅ Output:

"✅ Success"

👉 Explanation:

-> The first promise rejects, but Promise.any() ignores it.
-> The second promise resolves in 2 seconds, so Promise.any() returns "✅ Success".


**🔷 Case 3: All Promises Reject (Fails with AggregateError)**

✅ Scenario: If all promises reject, Promise.any() throws an AggregateError.

```js

Promise.any([
  new Promise((_, reject) => setTimeout(() => reject("❌ Error 1"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("❌ Error 2"), 2000)),
]).catch(error => console.log(error));

```

✅ Output:

AggregateError: All promises were rejected


✅ Exact output Format:

AggregateError: All promises were rejected
    at Promise.any (<anonymous>)
    at Object.<anonymous> (/path/to/file.js:6:3)
    at Module._compile (node:internal/modules/cjs/loader:1218:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)
    at Module.load (node:internal/modules/cjs/loader:1081:32)
    at Module._load (node:internal/modules/cjs/loader:922:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:85:12)
    at node:internal/main/run_main_module:23:47 {
  errors: [
    '❌ Error 1',
    '❌ Error 2'
  ]
}


👉 Explanation:

Since all promises fail, Promise.any() rejects with an AggregateError containing all errors.


**Case 4: Handling API Fallbacks (First Successful API Response)**

✅ Scenario: Trying multiple APIs and picking the first successful response.

```js

const api1 = new Promise((_, reject) => setTimeout(() => reject("❌ API 1 Down"), 1000));
const api2 = new Promise(resolve => setTimeout(() => resolve("📡 API 2 Response"), 2000));
const api3 = new Promise(resolve => setTimeout(() => resolve("📡 API 3 Response"), 3000));

Promise.any([api1, api2, api3]).then(console.log);

```

✅ Output:

"📡 API 2 Response"


👉 Explanation:

-> api1 fails → Ignored.
-> api2 succeeds (first) → Promise.any() returns "📡 API 2 Response".
-> api3 is ignored because api2 was successful.



**Case 5: Non-Promise Values (Instantly Resolved)**

✅ Scenario: If an array contains a normal value, Promise.any() immediately returns it.

```js

Promise.any([
  "🚀 Instant Value",
  new Promise(resolve => setTimeout(() => resolve("✅ Delayed"), 2000)),
]).then(console.log);

```

✅ Output:

"🚀 Instant Value"

👉 Explanation:

"🚀 Instant Value" is not a promise, so it resolves instantly, and the second promise is ignored.