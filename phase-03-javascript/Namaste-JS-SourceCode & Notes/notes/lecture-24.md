### Chapter 24: Promise APIS + Interview Questions

# What Are Promise APIs?

Promise APIs are static methods provided by the Promise class that help in handling multiple promises efficiently. These methods allow us to execute multiple asynchronous operations in parallel, control their execution, and manage their results.

**Examples of Promise APIs**

-> Promise.all
-> Promise.allSettled
-> Promise.race
-> Promise.any

**Why Do We Need Promise APIs?**

✅ Efficiently handle multiple async tasks (e.g., fetching multiple API responses together)
✅ Control execution flow (e.g., waiting for the first response with Promise.race)
✅ Gracefully handle both resolved and rejected cases (e.g., Promise.allSettled)
✅ Avoid unnecessary waiting (e.g., getting the first successful response with Promise.any)


# Promise.all()

**🔥📌 What is Promise.all() and Why Does It Work Like This?**

✔ Promise.all() is a built-in JavaScript method that runs multiple promises in parallel and returns a single promise.

✔ It waits for all the promises to resolve and then returns an array of results.

✔ If any one promise fails, it immediately rejects and ignores the rest.

✔ It takes the time of the slowest promise because it must wait for all to complete.

✔ It ensures results are always in input order, even if promises resolve at different times.

✔ It is useful when multiple independent async tasks need to be completed before proceeding (e.g., fetching multiple API responses together).


**📌 Key Characteristics of Promise.all()**

✅ Runs Promises in Parallel → Executes all promises at the same time.

✅ Returns a Single Promise → The final result is wrapped in a single promise.

✅ Waits for All to Finish → Takes the time of the slowest promise.

✅ Fails Fast → If any promise rejects, it immediately stops and rejects.

✅ Results in Input Order → Even if promises complete at different times, results maintain input order.

✅ Non-Promise Values Are Auto-Resolved → If an array contains normal values, they resolve instantly.

**🔥 Why is Promise.all() Called "Fail Fast"?**

Saves Time – No need to wait for everything if one is already broken.

Handles Errors Quickly – Helps in fixing issues faster.

Saves Resources – If one API call fails, no point in waiting for others.

**Syntax**

 Promise.all(iterable);

**What is iterable?**

In this context, an iterable refers to any object that can be looped through, such as:

✅ Array of Promises (Most Common)
✅ Set of Promises
✅ Any other iterable object containing Promises

❌ Plain values (strings, numbers, booleans) do NOT work unless wrapped in Promise.resolve().
❌ Objects are NOT valid unless they are iterable.


**📝 Case 1: Passing an Array of Promises ✅ (Common Use Case)**

```js 

const promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),  
  new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000)),  
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 3000))   
]);

console.log(promise);  // Pending initially

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output-

Promise { <pending> }  

// After 1s → P1 done
// After 2s → P2 done
// After 3s → P3 done → Now, final output:

Resolved: [ 'P1 done', 'P2 done', 'P3 done' ]


Explanation - 

✅ It takes the time of the slowest promise (P3 in this case, 3s).
✅ Returns results in the order of input (P1, P2, P3), NOT in the order of completion.

**📝 Case 2: Passing Non-Promises (Auto-Wrapped by Promise.resolve())**


```js

const promise = Promise.all([
  "Hello",  
  42,  
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 2000))   
]);

console.log(promise);  // Pending initially

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output:

Resolved: [ 'Hello', 42, 'P3 done' ]

Explanation -

✅ Instant values resolve immediately, only the promise (P3) takes time.


**📝 Case 3: Passing an Empty Array ✅**

```js

const promise = Promise.all([]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output:

Resolved: []

Explanation -

✅ Resolves immediately with an empty array ([]) since there is nothing to wait for.


**📝 Case 4: If Even One Promise Rejects ❌ (Fail Fast)**

```js

const promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 2000)),
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 3000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```
Explanation: The first rejection (P2) causes the entire Promise.all() to reject. No further promises are evaluated.

Output: Rejected: P2 failed

**📝 Case 5: Slowest Promise Determines Completion Time ⏳**

```js

const promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("Fast P1"), 1000)),  
  new Promise((resolve) => setTimeout(() => resolve("Medium P2"), 2000)),  
  new Promise((resolve) => setTimeout(() => resolve("Slow P3"), 5000))   
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output:

Resolved: [ 'Fast P1', 'Medium P2', 'Slow P3' ]

✅ Even though P1 and P2 finished earlier, Promise.all() waits for P3 (5s).


**📝 Case 6: A Promise That Never Resolves (Hangs Forever) ⏳**

```js

const promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),  
  new Promise(() => {}), // This never resolves or rejects!  
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 3000))   
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output:
(Hangs Forever... No output)
✅ Why? Promise.all() waits for every promise. If one never resolves, it never completes.

❌ How to Fix? → Add a timeout to reject if a promise takes too long.


**📝 Case 7: Thenable Object (Behaves Like a Promise)**


**What is a Thenable?**

A Thenable is just an object that has a .then() method. JavaScript treats it like a Promise, even if it’s not a real Promise instance.

If an object has .then(), JavaScript will automatically call it when used in promise-related functions like Promise.all(), Promise.resolve(), etc.

Example - 

```js 

const thenable = {
  then(resolve) {
    console.log("Inside thenable.then() - Received resolve function:", resolve); 
    setTimeout(() => resolve("Thenable resolved"), 2000); 
  }
};

```

**Alternative Syntax (Explicit Key-Value Format)**


If you prefer defining the .then() method as a key-value pair, you can write:

```js

const fakePromise = {
  then: function (resolve) {
    setTimeout(() => resolve("Thenable resolved"), 2000);
  }
};

```

✅ Both versions work the same way!



**Converting Thenable to Promise**


✅ Method 1: Using Promise.resolve(thenable) (Standard Approach)

```js

const thenable = {
  then(resolve) {
    setTimeout(() => resolve("Thenable resolved"), 2000);
  }
};

const promise = Promise.resolve(thenable);
promise.then((data) => console.log(data)); // After 2 sec → "Thenable resolved"

```

👉 Why? JavaScript automatically calls thenable.then() and passes its resolve function.
When you call Promise.resolve(thenable), JavaScript automatically passes a resolve function from the new promise to the then() method of the thenable.



✅ Method 2: Wrapping in a New Promise (Manual Approach)

```js

const thenable = {
  then(resolve) {
    setTimeout(() => resolve("Thenable resolved"), 2000);
  }
};

const promise = new Promise((resolve, reject) => {
  thenable.then(resolve, reject); // Manually passing resolve/reject
});

promise.then(console.log); // After 2 sec → "Thenable resolved"

```

👉 Why? Here, we manually pass resolve and reject instead of relying on Promise.resolve().



✅ Method 3: Using async/await (Implicit Conversion)

```js

const thenable = {
  then(resolve) {
    setTimeout(() => resolve("Thenable resolved"), 2000);
  }
};

async function getData() {
  const result = await thenable;  // `await` treats thenables like promises
  console.log(result);
}

getData(); // After 2 sec → "Thenable resolved"

```

👉 Why? await automatically treats thenables as promises and waits for resolution.


**🛠 How await Internally Works**

When 'await thenable;' runs, JavaScript internally transforms it into:

```js

new Promise((resolve) => {
  thenable.then(resolve);  // Passing `resolve` from the hidden promise
}).then(result => {
  console.log("After await:", result);
});

```

await works by creating a hidden promise and passing its resolve to thenable.then().


**Promise.reject(thenable) Does NOT Unwrap Thenables**

Promise.reject(thenable) does NOT wrap or unwrap the thenable. It immediately rejects with the thenable object as the error value, without calling .then(). The catch block receives the rejected thenable object.

```
const thenable = {
  then(resolve) {
    setTimeout(() => resolve("Thenable resolved"), 2000);
  }
};

const rejectedPromise = Promise.reject(thenable);

rejectedPromise
  .then(console.log)  // ❌ This will NOT run
  .catch((err) => console.log("Rejected with:", err)); 


```

output 
Rejected with: { then: [Function: then] }


Explanation:

❌ .then() is never called because Promise.reject() does NOT check for .then().
✅ The catch block directly receives the entire thenable object as an error.

conclusion - 

✔️ Promise.reject(value) does NOT check if value is thenable. It just rejects immediately and sends value to the catch block without calling .then().


```js

const thenable = {
  then(resolve) {
    console.log("Inside thenable.then() - Received resolve function:", resolve); // This confirms JS provides a resolve function
    setTimeout(() => resolve("Thenable resolved"), 2000); // Calls resolve after 2 sec
  }
};

// 🟢 Wrapping the thenable inside Promise.resolve() which converts the thenable into a real promise.
const wrappedThenable = Promise.resolve(thenable);
console.log("Wrapped Thenable (Before Resolving):", wrappedThenable); 

// 🟢 Creating a normal promise that resolves after 3 sec
const wrappedPromise = new Promise((resolve) => {
  setTimeout(() => resolve("P2 done"), 3000);
});
console.log("Wrapped Promise (Before Resolving):", wrappedPromise);

// 🟢 Using Promise.all() to wait for both promises to resolve
Promise.all([wrappedThenable, wrappedPromise]).then((result) => {
  console.log("Final Resolved:", result);
});


```
**output**

Inside thenable.then() - Received resolve function: [Function: resolve]
Wrapped Thenable (Before Resolving): Promise { <pending> }
Wrapped Promise (Before Resolving): Promise { <pending> }
Final Resolved: [ 'Thenable resolved', 'P2 done' ]

**Code explanation considering memory heap, stack memory, Web API, macrotask queue, microtask queue, call stack, and event loop.**

# >>>>>>>Make notes for these topics, which I will do later.>>>>>>>


**📝 Case 8: Synchronous Rejection (Fails Instantly) ❌**

```js

const promise = Promise.all([
  Promise.reject("Instant Failure"),  
  new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000)),  
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 3000))   
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output:
Rejected: Instant Failure
✅ Why? Since the first promise rejects immediately, Promise.all() fails before waiting for others.


**📝 Case 9: Mixing Sync & Async Failures (First Error Wins) ❌**

```js

const promise = Promise.all([
  new Promise((_, reject) => setTimeout(() => reject("Async Fail"), 3000)),  
  Promise.reject("Sync Fail")  // This fails immediately  
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Output:
Rejected: Sync Fail
✅ Why? First rejection wins. Even though the async promise fails later, Promise.all() immediately rejects when it sees Sync Fail.


**📝 Case 10: Handling Errors Individually (Using .catch() for Each Promise)**

```js

const p1 = new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000));
const p2 = new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 2000));
const p3 = new Promise((resolve) => setTimeout(() => resolve("P3 done"), 3000));

Promise.all([
  p1.catch(() => "P1 fallback"),  // Handles failure internally
  p2.catch(() => "P2 fallback"),  // Handles failure internally
  p3.catch(() => "P3 fallback")   // Handles failure internally
])
  .then((results) => console.log("All Results:", results));

```
Output:
All Results: [ 'P1 done', 'P2 fallback', 'P3 done' ]
✅ By catching errors individually, Promise.all() can still resolve even if some promises fail.



**📝 Case 11: Promise.all with Promises Returning Promises (Nested Promises)**

```js

const promise = Promise.all([
  new Promise((resolve) => resolve(new Promise((resolve) => resolve("Nested Promise done")))),
  new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: Promise.all() will resolve inner promises, even if they're wrapped in another promise.

Output:
Resolved: [ 'Nested Promise done', 'P2 done' ]



**📝 Case 12: Handling Multiple Rejections but with One Rejected Promise Before Others**

```js

const promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 2000)),
  new Promise((_, reject) => setTimeout(() => reject("P3 failed"), 3000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));


```

Explanation: As soon as the first rejection occurs, the entire Promise.all() will fail, and the other promises are ignored.

Output:
Rejected: P2 failed


**📝 Case 13: Using Promises That Resolve to Other Promises (Chain of Promises)**

```js

const promise = Promise.all([
  new Promise((resolve) => resolve(new Promise((resolve) => resolve("Chain P1")))),
  new Promise((resolve) => setTimeout(() => resolve("Chain P2"), 1000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: Even if the promises are nested, Promise.all() resolves the inner promises as well.

Output:
Resolved: [ 'Chain P1', 'Chain P2' ]


**📝 Case 14: Promise.all with Mixed Sync and Async Operations**

```js

async function asyncFunction() {
  const promise = Promise.all([
    new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),
    new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000)),
    Promise.resolve("Sync done"),
  ]);

  const result = await promise;
  console.log("All Resolved:", result);
}

asyncFunction();

```

Explanation: Mixing synchronous and asynchronous resolutions. Promise.all() works regardless of how a promise resolves (sync or async).
Output:
All Resolved: [ 'P1 done', 'P2 done', 'Sync done' ]


**📝 Case 15: Nested Promises with Rejection in Inner Promise**

```js

const promise = Promise.all([
  new Promise((resolve) => resolve(new Promise((_, reject) => reject("Inner Promise Rejected")))),
  new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: If an inner promise rejects, it propagates to Promise.all() rejection.
Output:
Rejected: Inner Promise Rejected



**📝 Case 16: Promise.all with Non-Promise Values and Rejections**

```js

const promise = Promise.all([
  42, // Non-Promise, treated as resolved immediately
  new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 1000)),
  "Hello", // Non-Promise, treated as resolved immediately
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: Non-promise values are treated as resolved immediately. However, one rejection causes Promise.all() to fail.

Output:
Rejected: P2 failed

**📝 Case 17: Using Promise.all() with Iterable Objects (Not Just Arrays)**

```js

const iterable = new Set([
  new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),
  new Promise((resolve) => setTimeout(() => resolve("P2 done"), 2000)),
]);

console.log("Iterable:", iterable); // Iterable: Set(2) { Promise { <pending> }, Promise { <pending> } }

const promise = Promise.all(iterable);

console.log("Promise:", promise); // Promise: Promise { <pending> }

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: Promise.all() can accept any iterable (like Set, Map, etc.), not just arrays.

Output:
Resolved: [ 'P1 done', 'P2 done' ]


**📝 Case 18: Mixed Sync and Async Failures with Different Times**


```js

const promise = Promise.all([
  Promise.reject("Async Failure"),
  new Promise((resolve) => setTimeout(() => resolve("Async Success"), 2000)),
  "Sync Success", // Resolved immediately
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```


Explanation: The immediate rejection ("Async Failure") causes Promise.all() to reject before evaluating the other promises, even though one is async and one is synchronous.
Output:
Rejected: Async Failure

**📝 Case 19: Rejecting All Promises but Continuing Execution**

```js

const promise = Promise.all([
  new Promise((_, reject) => setTimeout(() => reject("P1 failed"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 2000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => {
    console.log("All Promises Rejected:", error); // First rejection triggers catch
  });

```

Explanation: If all promises reject, Promise.all() rejects on the first encountered error. The second rejection is ignored.
Output:
All Promises Rejected: P1 failed


**📝 Case 20: Returning Promises in a Loop**

```js

const promises = Array.from({ length: 5 }, (_, index) =>
  new Promise((resolve) => setTimeout(() => resolve(`Promise ${index + 1} done`), (index + 1) * 1000))
);

const promise = Promise.all(promises);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: You can generate promises dynamically (e.g., in a loop). Promise.all() will still resolve or reject based on the state of the generated promises.

Output:
Resolved: [ 'Promise 1 done', 'Promise 2 done', 'Promise 3 done', 'Promise 4 done', 'Promise 5 done' ]


**📝 Case 21: Handling Promise.all() with setTimeout() and Multiple Rejections**

```js

const promise = Promise.all([
  new Promise((_, reject) => setTimeout(() => reject("P1 failed"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 1500)),
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 2000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));


```

Explanation: Even though the first two promises reject, Promise.all() will reject as soon as the first rejection occurs.

Output:
Rejected: P1 failed

**📝 Case 22: Handling Large Arrays with Multiple Promises**

```js

const largeArray = Array.from({ length: 1000000 }, (_, index) =>
  new Promise((resolve) => setTimeout(() => resolve(`Promise ${index + 1} resolved`), 1000))
);

const promise = Promise.all(largeArray);

promise
  .then((result) => console.log(`Resolved ${result.length} promises`))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: Promise.all() handles large arrays, but keep in mind the performance considerations for large numbers of promises (it could be slow).

Output:
Resolved 1000000 promises


**📝 Case 23: Mixing Resolved and Rejected Promises in Large Data**

```js

const largePromises = Array.from({ length: 1000000 }, (_, index) =>
  index % 2 === 0
    ? Promise.resolve(`Promise ${index + 1} resolved`)
    : Promise.reject(`Promise ${index + 1} rejected`)
);

const promise = Promise.all(largePromises);

promise
  .then((result) => console.log(`Resolved ${result.length} promises`))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: One rejected promise will cause Promise.all() to reject, even if most of them are resolved.

Output:
Rejected: Promise 2 rejected

**📝 Case 24: Non-Iterable Object Passed to Promise.all()**

```js

const promise = Promise.all({});

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: If you pass a non-iterable object (like an empty object {}) instead of an array or iterable, Promise.all() throws a TypeError.

Output:
Rejected: TypeError: You must pass an array or iterable object to Promise.all


**📝 Case 25: Passing Promise.all() Results into Another Promise.all()**

```js

const promise1 = Promise.all([
  new Promise((resolve) => resolve("P1 done")),
  new Promise((resolve) => resolve("P2 done")),
]);

const promise2 = Promise.all([promise1, new Promise((resolve) => resolve("P3 done"))]);

promise2
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: You can nest Promise.all() results into another Promise.all(), and it will wait for all promises to resolve.

Output:
Resolved: [ [ 'P1 done', 'P2 done' ], 'P3 done' ]


**📝 Case 26: Nesting Promise.all() with a Rejected Promise**

```js

const promise1 = Promise.all([
  new Promise((resolve) => resolve("P1 done")),
  new Promise((_, reject) => reject("P2 failed")), // This promise rejects
]);

const promise2 = Promise.all([
  promise1,
  new Promise((resolve) => resolve("P3 done")),
]);

promise2
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation:

-> promise1 contains a rejecting promise (P2 failed), so promise1 immediately rejects with "P2 failed".

-> promise2 waits for promise1, but since promise1 is already rejected, promise2 also rejects immediately with the same rejection reason.

-> "P3 done" is never executed because Promise.all() stops execution as soon as one promise rejects.

Output:
Rejected: P2 failed

👉 This case demonstrates rejection propagation in nested Promise.all() calls—if an inner Promise.all() rejects, the outer one also rejects with the same reason.

**📝 Case 27: Handling Mixed Types of Promises and Values in Arrays**

```js

const promise = Promise.all([
  new Promise((resolve) => resolve("Resolved P1")),
  "Immediate Success",
  42, // Non-Promise, treated as resolved immediately
  new Promise((_, reject) => setTimeout(() => reject("P4 failed"), 1000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: Mixed types (e.g., promises, immediate values, rejections) still work in Promise.all(). The non-promise values are treated as resolved promises.

Output:
Rejected: P4 failed


**📝 Case 28: Promise.all with Delayed Rejections (Rejected After Resolution)**

```js

const promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("P1 done"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("P2 failed"), 2000)),
  new Promise((resolve) => setTimeout(() => resolve("P3 done"), 3000)),
]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

Explanation: If a promise rejects after Promise.all() has started waiting, the rejection will terminate the operation.

Output:
Rejected: P2 failed


# Complex Behaviors and Edge Cases in Promise.all()


**1. Cyclic References in the Array of Promises**

What is a Cyclic Reference?
A cyclic reference occurs when an object contains a reference to itself, either directly or indirectly. In the context of an array of promises, it means the array contains a promise that refers back to the array itself, creating an infinite loop.

```js

const promises = [];
promises.push(new Promise((resolve) => resolve("First")));

const cyclicPromise = new Promise((resolve) => resolve(promises)); // Resolves with the array
promises.push(cyclicPromise);

const promise = Promise.all(promises);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

**Behavior of Promise.all() with Cyclic References:**

Resolution Process: In this case, Promise.all() will attempt to resolve all promises. The first promise resolves normally, but the second promise is a promise that resolves with an array that contains itself.

Stack Overflow: This will not cause a stack overflow directly, because the promises themselves don’t directly recurse into each other. However, it will result in an infinite loop or unresolved promise behavior, causing the Promise.all() to never resolve or reject.

The general recommendation is to avoid cyclic references in async structures, as they introduce undefined behavior, often leading to deadlocks or infinite loops.

Why This Happens:
JavaScript promises and their resolutions work with references. If a promise resolves to an array that contains itself, it causes an infinite chain of waiting for the array’s resolution that never ends.


**Super Simple Analogy 🎈**

Imagine you ask a robot: "What is your answer?"

🔹 Normal case:

The robot says: "The answer is 42." ✅ (Done!)

🔹 Cyclic case:

The robot says: "Ask the other robot."
The other robot says: "Ask the first robot."
Now, they keep pointing to each other forever! 🔄

🚨 Result? You never get an actual answer!

```js

const promises = []; // Create an empty array

promises.push(Promise.resolve("First promise")); // A normal resolved promise

const cyclicPromise = new Promise((resolve) => resolve(promises)); 
// This promise resolves with the array, which contains itself

promises.push(cyclicPromise); // Now, the array has a reference to itself

Promise.all(promises)
  .then((res) => console.log("Resolved:", res))
  .catch((err) => console.log("Rejected:", err));


```

**🛑 What happens?**

JavaScript sees that cyclicPromise resolves with the array.

But the array contains cyclicPromise, which needs to be resolved first!

It keeps waiting forever and never finishes. 😵‍💫

**Final Thoughts 💡**

Cyclic references = Endless loops. JavaScript keeps looking for a final value but never finds one.


**2. Promises Rejecting with Another Promise: Understanding the Behavior** 

Understanding the Code

```js

const p1 = new Promise((resolve, reject) => 
  reject(new Promise((resolve) => resolve("Rejected with another promise")))
);
const p2 = new Promise((resolve) => setTimeout(() => resolve("Resolved"), 1000));

const promise = Promise.all([p1, p2]);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));
Step-by-Step Execution
Step 1: Creating p1

const p1 = new Promise((resolve, reject) => 
  reject(new Promise((resolve) => resolve("Rejected with another promise")))
);

```
**Step 1: Creating p1**

```js

const p1 = new Promise((resolve, reject) => 
  reject(new Promise((resolve) => resolve("Rejected with another promise")))
);

```

This promise immediately rejects, but instead of rejecting with a normal value (like "Error!"), it rejects with another promise.

That inner promise (new Promise((resolve) => resolve("Rejected with another promise"))) will resolve later with the value "Rejected with another promise".

🚨 Key point: Rejecting with a promise is different from rejecting with a value because it introduces an extra level of complexity.

**Step 2: Creating p2**

```js

const p2 = new Promise((resolve) => setTimeout(() => resolve("Resolved"), 1000));

```
This promise will resolve after 1 second with "Resolved".
But since Promise.all() fails fast (rejects as soon as it sees a rejection), this promise won’t even matter.

**Step 3: Calling Promise.all([p1, p2])**

```js

const promise = Promise.all([p1, p2]);

```

Promise.all() starts waiting for both promises (p1 and p2) to either resolve or reject.
But before p2 even has a chance to resolve, p1 already rejects.


**Step 4: What Does Promise.all() Do?**

Normally, Promise.all() immediately rejects if any promise in the array rejects.

Here, p1 rejects immediately, but the rejection value itself is another promise.

The outer Promise.all() does not wait for that inner promise (Rejected with another promise) to resolve.

Instead, it rejects immediately with the inner promise itself, not its resolved value.

**Step 5: The catch() Block is Triggered**

```js

.catch((error) => console.log("Rejected:", error));

```

The catch() block receives the promise itself as the error, not the resolved value of that promise.So, instead of seeing "Rejected with another promise", we see the actual Promise object in the console.

🔴 Output (in console):
Rejected: Promise { <fulfilled>: "Rejected with another promise" }

💡 The Promise in the output means that Promise.all() rejected with another promise, but it didn't wait for that promise to resolve.

**Why Does This Happen?**

Promise.all() only cares about the first rejection, and it doesn’t unwrap nested promises when rejecting.

If a promise rejects with another promise, Promise.all() does not wait for that inner promise to resolve.

Instead, it immediately rejects with the inner promise itself, not its value.

**Final Takeaways**

✅ Promise.all() rejects as soon as it sees a rejection.
✅ If a promise rejects with another promise, Promise.all() does NOT wait for that inner promise to resolve.
✅ The rejection value is the inner promise itself, not its resolved value.


**3. Understanding Nested Arrays of Promises in Promise.all()**

Understanding Nested Arrays of Promises in Promise.all() Step by Step

**Step 1: Understanding Promise.all()**

Promise.all() takes an array of promises and waits for all of them to resolve (or rejects immediately if any one fails).

It does not modify the structure of the input array.

**Step 2: Defining Our Promises**

We create two promises that resolve after different delays:

const promise1 = new Promise((resolve) => setTimeout(() => resolve("Promise 1 done"), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Promise 2 done"), 2000));

promise1 resolves after 1 second with "Promise 1 done".
promise2 resolves after 2 seconds with "Promise 2 done".

**Step 3: Creating a Nested Array**

Now, we put these promises inside nested arrays:

const nestedPromises = [[promise1, promise2], [promise1]];

The outer array has two elements:

The first element is an array [promise1, promise2].
The second element is an array [promise1].

**Step 4: Passing the Nested Array to Promise.all()**

```js

const promise = Promise.all(nestedPromises);

```

Instead of resolving the inner promises separately, Promise.all() treats each sub-array as a separate item.
Since the sub-arrays are not actual promises, Promise.all() resolves them immediately as they are.

**Step 5: Final Output**

```js

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

```

✅ Expected Output:

Resolved: [ [ 'Promise 1 done', 'Promise 2 done' ], [ 'Promise 1 done' ] ]

**💡 Why?**

The first sub-array [promise1, promise2] resolves to ["Promise 1 done", "Promise 2 done"].

The second sub-array [promise1] resolves to ["Promise 1 done"].

Since Promise.all() does not flatten the array, the output remains nested.

**How to Fix This?**

If you want to flatten the promises and get a single array, use .flat() before passing it to Promise.all():

const flattenedPromises = nestedPromises.flat();
const promise = Promise.all(flattenedPromises);

promise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

**✅ Output After Fixing:**

Resolved: [ 'Promise 1 done', 'Promise 2 done', 'Promise 1 done' ]

**🚀 Key Takeaways:**

Promise.all() does not automatically flatten nested arrays.

If you pass a nested array, it treats each sub-array as a separate item.

To flatten the array before passing to Promise.all(), use .flat().


# In-Depth Understanding of Promise.all() in JavaScript

**1. Performance Considerations**
Promise.all() executes all promises simultaneously (concurrently). This is fast but can cause issues if you have too many promises running at once.

Example issue: If you request too many API calls at the same time, the server might slow down or reject some requests.

Better approach: Instead of calling 100 requests at once, break them into small groups (batch processing) or use Promise.allSettled() to handle failures better.

**2. Impact on Error Handling**

If any one promise rejects, the entire Promise.all() fails immediately.


```js

const p1 = Promise.resolve(1);
const p2 = Promise.reject("Error!");
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(console.log)
  .catch(console.error); // Logs: "Error!"

```

Problem: If p3 was important, we won’t even see its result.

Solution: Use Promise.allSettled() if you want to get all results, whether they resolve or reject.

**3. Comparison with Other Promise Methods**

Promise.all()	Fails immediately if any promise rejects.
Promise.allSettled()	Waits for all promises and returns results for each.
Promise.race()	Returns the first resolved or rejected promise.
Promise.any()	Returns the first resolved promise (ignores rejections unless all fail)

Example of Promise.allSettled():

```js

const p1 = Promise.resolve(1);
const p2 = Promise.reject("Error");
const p3 = Promise.resolve(3);

Promise.allSettled([p1, p2, p3]).then(console.log);

// Output:
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "Error" },
//   { status: "fulfilled", value: 3 }
// ]

```

Here, even though p2 fails, we still get results from p1 and p3.

**4. Chaining Promise.all()**

You can combine Promise.all() with async functions for more complex operations.

```js

async function fetchData() {
  const results = await Promise.all([
    fetch("https://api.example.com/data1"),
    fetch("https://api.example.com/data2"),
  ]);
  console.log(results);
}

```
Important: Even if you .then() after Promise.all(), it still waits for all promises to finish first.

**5. Memory Management and Cleanup**

-> If you create too many promises, they stay in memory until they resolve/reject.

-> Example problem: If a program creates thousands of promises, it could slow down or even crash.

-> Solution: Process data in small batches (instead of all at once).

**6. Complex Use Cases**

Handling timeouts with Promise.race() - If a task takes too long, cancel it using a timeout.

```js

const timeout = new Promise((_, reject) =>
  setTimeout(() => reject("Timeout!"), 5000)
);

Promise.race([fetch("https://api.example.com"), timeout])
  .then(console.log)
  .catch(console.error);

```

If the API takes too long, it automatically rejects after 5 seconds.


**7. Handling Large Numbers of Promises Efficiently**

If you have 1000 requests, running them at once is a bad idea.

Solution: Process them in batches:

```js

async function processInBatches(promises, batchSize) {
  let results = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results = results.concat(batchResults);
  }
  return results;
}

```
This ensures only a few promises run at a time, preventing overload.

**8. Debugging and Error Handling**

Debugging Promise.all() is hard because errors stop all other promises.

```js

Promise.all([
  fetch("https://valid-url.com"),
  fetch("https://invalid-url.com"), // This fails
  fetch("https://another-valid-url.com"),
])
  .then(console.log)
  .catch((error) => console.error("Error in Promise.all:", error));

```

Problem: If invalid-url.com fails, the entire chain fails.
Fix: Use .map() with catch() inside each promise to handle errors separately.


**9. Performance and Scalability Concerns**

Large-scale systems should limit how many promises run together.

Example fixes:
Use batching (see point #7)
Use Promise.allSettled() if you need results even if some fail.


**10. Custom Promise Libraries and Patterns**

Some libraries like p-limit can control concurrency.

```js

import pLimit from "p-limit";

const limit = pLimit(5); // Allows only 5 promises to run concurrently at any given time.

const tasks = urls.map((url) => limit(() => fetch(url)));

Promise.all(tasks).then(console.log);

```

Advantage: It prevents overloading by running only 5 at a time.


**11. Real-World Use Cases**

-> Batch API requests: Fetch many records but limit how many at a time.

-> Retry failed requests: If an API fails, try again before failing completely.


**12. Event Loop and Memory Management**

Promise.all() runs as microtasks, meaning:

It won’t block other JavaScript code.

It runs before setTimeout() but after synchronous code.


**13. Error Handling in Complex Chains**

If you have nested promises, use .catch() at each level:

```js

async function fetchData() {
  try {
    const results = await Promise.all([
      fetch(url1).catch((err) => "Failed: url1"),
      fetch(url2).catch((err) => "Failed: url2"),
    ]);
    console.log(results);
  } catch (error) {
    console.error("Main error:", error);
  }
}

```

This ensures individual failures don’t break everything.


**14. Advanced Patterns**

Using async generators with Promise.all():

```js 

async function* generatePromises() {
  yield fetch("url1");
  yield fetch("url2");
}

const promises = [];
for await (const promise of generatePromises()) {
  promises.push(promise);
}

const results = await Promise.all(promises);
console.log(results);

```

Why? This approach allows dynamically generating promises when needed.


**15. Edge Cases**

If a promise resolves another promise, it might cause unexpected behavior.

```js

const p = Promise.resolve(Promise.resolve(42));

p.then(console.log); // Logs: 42 (inner promise is auto-unwrapped)

```

**16. Polyfills and Shims**

Older JavaScript versions (before ES6) didn’t have Promise.all().

```js

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((p, i) => {
      p.then((val) => {
        results[i] = val;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}; 

```
