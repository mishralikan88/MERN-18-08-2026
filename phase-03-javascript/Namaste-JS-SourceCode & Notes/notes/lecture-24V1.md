# Promise.allSettled(<Iterable>) – 

✔ Promise.allSettled() is a built-in JavaScript method that runs multiple promises in parallel and returns a single promise.

✔ It waits for all the promises to settle (resolve or reject) and then returns an array of results.

✔ Unlike Promise.all(), it does not fail early if one promise rejects. Instead, it waits for all promises to finish.

✔ It takes the time of the slowest promise because it must wait for all to either resolve or reject.

✔ The results always maintain input order, even if promises settle at different times.

✔ It is useful when you need to track the status of multiple async tasks without stopping on failure (e.g., making multiple API calls and handling success/failure individually).


# 📌 Key Characteristics of Promise.allSettled()

✅ Runs Promises in Parallel → Executes all promises at the same time.

✅ Returns a Single Promise → The final result is wrapped in a single promise.

✅ Waits for All to Settle → Takes the time of the slowest promise because it waits for both resolved and rejected promises.

✅ Never Fails Early → Unlike Promise.all(), it never stops execution when a promise rejects; it waits for all promises to complete.

✅ Results in Input Order → Even if promises settle at different times, the results always maintain input order.

✅ Non-Promise Values Are Auto-Resolved → If an array contains normal values, they are treated as already resolved with a "fulfilled" status.


**Syntax for Promise.allSettled()** Promise.allSettled(iterable);

📌 Where:  iterable → An array (or any iterable) of promises.

 
**Case 1: All Promises Resolve**

✅ Scenario: All promises succeed.

```js

Promise.allSettled([
  Promise.resolve("A"),
  Promise.resolve("B"),
]).then(console.log);

```

Note - Yes, .then((data) => console.log(data)) and .then(console.log) are functionally the same in JavaScript.


✅ Output:

[
  { status: "fulfilled", value: "A" },
  { status: "fulfilled", value: "B" }
]
👉 Explanation:

Since both promises resolve, status: "fulfilled" is returned with their value.


**🔷 Case 2: Some Promises Reject**

✅ Scenario: Mixed resolved and rejected promises.

```js

Promise.allSettled([
  Promise.resolve("✅ Success"),
  Promise.reject("❌ Error"),
]).then(console.log);

```

✅ Output:

[
  { status: "fulfilled", value: "✅ Success" },
  { status: "rejected", reason: "❌ Error" }
]
👉 Explanation:

The resolved promise has status: "fulfilled" with value: "✅ Success".

The rejected promise has status: "rejected" with reason: "❌ Error".

**Case 3: All Promises Reject**

✅ Scenario: All promises fail.

```

Promise.allSettled([
  Promise.reject("❌ Error 1"),
  Promise.reject("❌ Error 2"),
]).then(console.log);

```

✅ Output:

[
  { status: "rejected", reason: "❌ Error 1" },
  { status: "rejected", reason: "❌ Error 2" }
]
👉 Explanation:

Since both promises reject, we get status: "rejected" and their reason values.


**Case 4: Handling Different Data Types**

✅ Scenario: Resolving promises with numbers, objects, and arrays.

```js

Promise.allSettled([
  Promise.resolve(42),
  Promise.resolve({ name: "Alice" }),
  Promise.resolve([1, 2, 3]),
]).then(console.log);

```

✅ Output:

[
  { status: "fulfilled", value: 42 },
  { status: "fulfilled", value: { name: "Alice" } },
  { status: "fulfilled", value: [1, 2, 3] }
]
👉 Explanation:

Promise.allSettled() works with any data type.


**Case 5: Handling a Mixed Array (Strings, Numbers, Booleans)**

✅ Scenario: Passing non-promise values inside Promise.allSettled().

```

Promise.allSettled([
  "Text",
  123,
  true,
  Promise.resolve("Resolved"),
  Promise.reject("Rejected"),
]).then(console.log);

```
✅ Output:

[
  { status: "fulfilled", value: "Text" },
  { status: "fulfilled", value: 123 },
  { status: "fulfilled", value: true },
  { status: "fulfilled", value: "Resolved" },
  { status: "rejected", reason: "Rejected" }
]
👉 Explanation:

Non-promise values are automatically converted to fulfilled promises.


**Case 6: Handling Errors Inside .then()**

✅ Scenario: A promise throws an error inside .then().

```js

const p = Promise.resolve("Success").then(() => {
  throw new Error("Error inside then()");
});

Promise.allSettled([p]).then(console.log);

```

✅ Output:

[
  { status: "rejected", reason: Error: "Error inside then()" }
]
👉 Explanation:

If an error is thrown inside .then(), the promise automatically rejects with that error.
we're not explicitly handling the rejection with a .catch(), but JavaScript implicitly catches the thrown error inside .then(). 


# Q How Promise Error Handling Works Inside .then()


✔ When you throw an error inside a .then() callback, JavaScript automatically converts that error into a rejected promise. So, below code

```js

const p = Promise.resolve("Success").then(() => {
  throw new Error("Error inside then()");
});

```

is functionally equivalent to


```js

const p = new Promise((resolve) => resolve("Success"))
  .then(() => Promise.reject(new Error("Error inside then()")));

```

✔ That means : 

```js

{
  throw new Error("Error inside then()");
}

```

is equal to 

```js

Promise.reject(new Error("Error inside then()"))

```


✔ Even though we're not explicitly handling p with .catch(), the error does not crash the script because:

1️⃣ Promise.allSettled([p]) is handling it.

-> Promise.allSettled() does not reject when any promise fails.

-> Instead, it returns an array where each promise's status is recorded.

2️⃣ Promise.allSettled() waits for p and logs its result:

    [
      { status: "rejected", reason: Error("Error inside then()") }
    ]



**Case 7: Using async/await With Promise.allSettled()**

✅ Scenario: Fetching data from an API and handling failures.

```js 

async function fetchData() {
  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/todos/1"),
    fetch("https://invalid-url.com"),
  ]);
  console.log(results);
}
fetchData();

```

✅ Output:

[
  { status: "fulfilled", value: Response },
  { status: "rejected", reason: TypeError: Failed to fetch }
]
👉 Explanation:

The first API call succeeds, returning a fulfilled response.

The second API call fails, returning rejected.


**Case 8: Filtering Only Fulfilled Results**


✅ Scenario: Extracting only successful values.

```js

const promise1 = Promise.resolve("✅ Good");
const promise2 = Promise.reject("❌ Bad");

const allPromises = Promise.allSettled([promise1, promise2]);

allPromises.then(results => {
 
  console.log(results);  // Logs the results array to inspect each promise's outcome

  // Expected output:
  // [
  //   { status: 'fulfilled', value: '✅ Good' },
  //   { status: 'rejected', reason: '❌ Bad' }
  // ]

  // Extracting fulfilled values

  const fulfilledValues = results
    .filter(result => result.status === "fulfilled")
    .map(result => result.value);

  // Output the fulfilled values
  console.log(fulfilledValues); // Expected output: [ "✅ Good" ]
});

```

✅ Output:

[ "✅ Good" ]

👉 Explanation:

Filters only fulfilled promises and extracts value.



**Case 9: Filtering Only Rejected Results**

✅ Scenario: Extracting only failed promises.

```js

const promise1 = Promise.resolve("✅ Good");
const promise2 = Promise.reject("❌ Bad");

const allPromises = Promise.allSettled([promise1, promise2]);

allPromises.then(results => {

  console.log(results); // Logs the results array to inspect each promise's outcome

  // Expected output:
  // [
  //   { status: 'fulfilled', value: '✅ Good' },
  //   { status: 'rejected', reason: '❌ Bad' }
  // ]

  // Extracting rejected reasons

  const rejectedReasons = results
    .filter(result => result.status === "rejected")
    .map(result => result.reason);

  // Output the rejected reasons
  console.log(rejectedReasons); // Expected output: [ "❌ Bad" ]
});

```
✅ Output:
[ "❌ Bad" ]


👉 Explanation:

Filters only rejected promises and extracts reason.


**Case 🔟: Handling undefined and null**

✅ Scenario: Resolving undefined and null values.

```js

Promise.allSettled([
  Promise.resolve(undefined),
  Promise.resolve(null),
]).then(console.log);

```

✅ Output:

[
  { status: "fulfilled", value: undefined },
  { status: "fulfilled", value: null }
]

👉 Explanation:

Promise.allSettled() correctly handles undefined and null.