# Chapter 23 (Season 2 : Episode 4) : async await 


# Q: What is async?

async is a keyword used before a function to declare an async function. It ensures that the function always returns a promise, even if it returns a non-promise value.

# Q: How is an Async Function Different from a Normal Function?

1️⃣ Return Type Difference

🔹 Normal functions return a direct value (string, number, object, etc.).
🔹 Async functions always return a promise, even if the function returns a simple value.

**Normal Function Example: Returns a Direct Value**

```js

function normalFunction() {
  return "Hello from normal function!";
}

const result = normalFunction();
console.log(result);  
// Output: Hello from normal function!

```

✅ Since this is a normal function, it simply returns a string without wrapping it in a promise.

**Async Function Example: Always Returns a Promise**

```js

async function asyncFunction() {
  return "Hello from async function!";
}

const promiseResult = asyncFunction();
console.log(promiseResult);  
// Output: Promise {<fulfilled>: "Hello from async function!"}

promiseResult.then(res => console.log(res));  
// Output: Hello from async function!

```

✅ Even though asyncFunction() returns a string, JavaScript automatically wraps it in a promise.


2️⃣ Handling Asynchronous Code

🔹 Normal functions don't support await. You have to use .then() manually for promises.
🔹 Async functions allow await, making the code more readable.

**Normal Function Example: Handling Promises Manually**

```js

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 2000);
  });
}

const data = fetchData();
console.log(data);   // Output: Promise { <pending> }  (because the promise is not yet resolved)

data.then(res => console.log(res));   // Output (after 2 seconds): Data loaded!

```

✅ We have to use .then() to extract the value from the promise.


**Async Function Example: Using await**


```js

function fetchDataAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 2000);
  });
}

async function main() {
  console.log("Fetching...");
  const data = await fetchDataAsync();  
  console.log(data);  
}

main();

```
Output:
// Fetching...
// (after 2 seconds): Data loaded!

✅ await pauses execution until the promise resolves, making the function look synchronous.


3️⃣ Error Handling

🔹 Normal functions require .catch() for handling errors in promises.
🔹 Async functions can use try...catch for structured error handling.

**Normal Function Example: Handling Errors with .catch()**

```js

function fetchDataWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error: Something went wrong!");
    }, 2000);
  });
}

fetchDataWithError()
  .then(data => console.log(data))
  .catch(error => console.error(error));  

// Output (after 2 seconds): Error: Something went wrong!

```
✅ Error handling is done using .catch().

**Async Function Example: Handling Errors with try...catch**

```js

function fetchDataWithErrorAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error: Something went wrong!");
    }, 2000);
  });
}

async function main() {
  try {
    const data = await fetchDataWithErrorAsync();
    console.log(data);
  } catch (error) {
    console.error("Caught error:", error);
  }
}

main();
// Output (after 2 seconds): Caught error: Error: Something went wrong!

```

When await fetchDataWithErrorAsync() is executed:

-> If the function resolves successfully, data will hold the resolved value.
-> If the function rejects with an error, the catch block will handle the error.
-> Since await waits for the promise to settle (either resolve or reject), console.log(data); will never run if the promise rejects.

✅ try...catch makes error handling cleaner and more structured.


# ✅ Does await show synchronous behavior?

Yes, await makes JavaScript pause execution of the current function until the awaited promise settles (either resolves or rejects). This makes it behave like synchronous code, but JavaScript is still running asynchronously under the hood.


# 1️⃣ Async Function Returning a Non-Promise Value

Even if we return a normal string, async automatically wraps it in a promise.

```js

async function getData() {
  return "Namaste JavaScript";  // Normal value
}

const dataPromise = getData();

console.log(dataPromise);  
// Output: Promise {<fulfilled>: 'Namaste JavaScript'}

dataPromise.then(res => console.log(res));  
// Output: Namaste JavaScript

```

**✅ Explanation**

The function returns a string, but since it's async, JS automatically wraps it in a promise.

We extract the value using .then().



# 2️⃣ Async Function Returning a Promise

If an async function returns a promise, it does not wrap it again, but simply returns it as is.

```js

const p = new Promise((resolve, reject) => {
  resolve('Promise resolved value!!');
});

async function getData() {
  return p; // Directly returning a promise
}

const dataPromise = getData();

console.log(dataPromise);  
// Output: Promise {<fulfilled>: 'Promise resolved value!!'}

dataPromise.then(res => console.log(res));  
// Output: Promise resolved value!!

```

**✅ Explanation:**

Since we already return a promise, async does not wrap it again.

The behavior remains the same as a normal promise.


# Q: What is await?

await is a JavaScript keyword used inside async functions to pause execution until a promise is resolved or rejected.

The await keyword pauses the execution of the function until the promise resolves or rejects. However, this pause is only inside the async function—it does not block the entire JavaScript execution (because JavaScript is still single-threaded and event-driven).


# Q: How can we use await along with async function?

await must be used inside an async function.

-> It waits for a promise to settle (resolve or reject) before moving to the next line of code.

->It simplifies handling asynchronous code compared to .then() and .catch().


**✅ Example: Using await inside async function**

```js

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Data loaded!");
    }, 2000);
  });
}

async function main() {
  console.log("Fetching...");

  const data = await fetchData(); // ⏳ Waits here until promise resolves

  console.log(data); // ✅ Logs after 2 sec: "Data loaded!"
}

main();

```

Explanation -

console.log("Fetching...") runs immediately.
await fetchData(); pauses execution until fetchData() resolves.
After 2 sec, the resolved value "✅ Data loaded!" is stored in data.
"✅ Data loaded!" is logged.



# Q: Is this statement true? "async and await combo is used to handle promises."


✔ Yes, this statement is true.

-> async ensures a function always returns a promise.
-> await pauses execution inside an async function until the promise resolves or rejects.
-> Together, they make handling asynchronous code simpler and more readable, avoiding .then() and .catch().


# Q Async/Await vs. Promise.then/.catch

1️⃣ Readability & Simplicity:

-> async/await provides a cleaner, more readable syntax for handling asynchronous code.

-> .then() requires chaining, which can sometimes make code harder to read.

2️⃣ Error Handling:

-> async/await allows for try...catch, making error handling straightforward.

-> .then().catch() requires explicit chaining to catch errors.

3️⃣ Execution Order & Behavior:

-> async/await makes code appear synchronous, even though it remains asynchronous.

-> .then() executes callback functions when the promise resolves.

4️⃣ Handling Multiple Promises:

-> async/await executes each await one after another, unless handled differently.

-> .then() does not inherently run promises in parallel—it depends on whether you return a promise inside the chain. If a .then() returns a promise, the next .then() waits for it to resolve before executing. If you don’t return a promise, the next .then() runs immediately.

5️⃣ When to Use:

-> Use async/await for better readability when dealing with sequential asynchronous operations.

-> Use .then() when you need better control over parallel execution or prefer chaining.


# Handling Promises Before async and await

Before async and await were introduced, we handled promises using .then() and .catch().

```js

const p = new Promise((resolve, reject) => {
  resolve("Promise resolved value!!");
});

function getData() {
  p.then(res => console.log(res));
}

getData(); // Output: Promise resolved value!!

```

📌 Here, we manually use .then() to extract the resolved value of the promise.

**Handling Promises with async and await**

With async/await, handling promises becomes more readable and structured.

```js

const p = new Promise((resolve, reject) => {
  resolve("Promise resolved value!!");
});

async function getData() {
  const val = await p;
  console.log(val);
}

getData(); // Output: Promise resolved value!!

```

📌 await pauses execution inside the async function until the promise resolves.

**Important Rule About await**

await can only be used inside an async function. If used outside, it results in a syntax error.

```js

await function() {}; // ❌ SyntaxError: await is only valid inside an async function.

```

# Error Handling with .catch() in Async-Await

Even though async-await is a cleaner way to handle asynchronous code, it does not have built-in error handling like .catch() in Promises. However, errors in async-await functions can still be caught using .catch() 

**Using .catch() on the async function call**

Since an async function always returns a Promise, we can attach .catch() to handle errors:

```js
async function fetchData() {
  let response = await fetch("https://api.github.com/users/alok722");
  let data = await response.json();
  return data;
}
fetchData()
  .then(data => console.log(data))
  .catch(error => console.log("Error:", error));

```

📌 Here, if an error occurs inside fetchData(), it will be caught by .catch().

📌 We can use the traditional try...catch block to handle errors in async-await functions.


**Which one should you use?**

-> ✅ Use try-catch inside async functions when you want localized error handling within the function.

-> ✅ Use .catch() on the function call when you want to handle errors globally outside the function.

-> ✅ You can also combine both approaches, using try-catch for specific error handling and .catch() for unexpected failures.



# Real-World Example of async/await

Let's understand how async/await works with a real-world example using the fetch API:

```js

async function handlePromise() {

  // Fetching data from the GitHub API
  const response = await fetch('https://api.github.com/users/alok722'); // `fetch()` returns a Promise that resolves to a Response object

  // Extracting JSON data from the Response object
  const data = await response.json();   // `.json()` also returns a Promise, so we use `await` again to resolve it

  console.log(data); // Logging the retrieved JSON data

}

handlePromise();

```

Explanation:

fetch() Returns a Promise:
The fetch() function makes a network request and returns a Promise that resolves to a Response object.
We use await to pause execution until the request completes and the Response object is available.

Parsing the Response:
The .json() method of the Response object is also asynchronous and returns a Promise that resolves to the parsed JSON data.
We use another await to pause execution until the JSON data is fully extracted.

Final Output:
Once both promises are resolved, the JSON data is logged to the console.

**Why Use async/await Instead of .then()?**

Better Readability: The code flows naturally from top to bottom, making it easier to understand.
Avoids Callback Hell: No need for nested .then() chains.
Error Handling: Works seamlessly with try...catch for handling errors.



# What Makes async-await Special?

To understand the significance of async-await, let's compare it with the traditional .then/.catch method for handling promises. We'll modify our promise p to include a delay and observe how both approaches handle execution flow.

**Comparing .then/.catch vs async-await in Promise Handling**

**Using .then/.catch**

```js

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value!!');
  }, 3000);
});

// 📌 Handling Promise using then and catch

function getData() {
  // JS engine will not wait for the promise to resolve
  p.then(res => console.log(res));
  console.log('Hello There!');
}
getData(); 

```

// Output:
// Hello There!
// Promise resolved value!!

**Explanation:**

-> JavaScript does not wait for the promise to resolve.
-> The engine registers the promise callback separately and attaches a 3-second timer to it.
-> Meanwhile, it moves to the next line and logs "Hello There!" immediately.
-> Once the timer expires, the .then() method executes and logs the resolved promise value.

**Using async-await**

**Handling Promise using async and await**

```js

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value!!');
  }, 3000);
});

async function handlePromise() {
  // JS engine will wait for the promise to resolve
  const val = await p;
  console.log('Hello There!');
  console.log(val);
}

handlePromise(); 

```

Output (after 3 seconds):
Hello There!
Promise resolved value!!


**Explanation:**

-> The await keyword makes JavaScript pause execution at that line until the promise resolves.
-> Unlike the .then() approach, execution does not proceed immediately after encountering await.
-> After 3 seconds, await p resolves, and only then does the next line (console.log('Hello There!')) execute.
-> This ensures that "Hello There!" is printed after the promise resolution instead of before.


**💡 Why is async-await Special?**

Improves readability – Code using async-await looks synchronous and is easier to understand.

Better error handling – Works seamlessly with try-catch, making debugging simpler.

Reduces callback nesting – Avoids "callback hell" by flattening asynchronous code.

More control over execution flow – Allows sequential execution without needing chained .then() calls.

.then/.catch	Moves to the next line without waiting for the promise to resolve.
async-await	Pauses execution at await until the promise resolves.


# Understanding await and Execution Flow in JavaScript

-> await pauses execution of the async function it is inside
-> When await is encountered, the function execution pauses at that point until the Promise resolves.
-> Other synchronous code continues to run
-> While the function is waiting, JavaScript does not block the entire program.
-> Other code (outside the async function) executes normally.
-> The Event Loop resumes the paused function after the Promise resolves
-> Once the Promise is resolved, the rest of the async function executes from where it was paused.


```js

const p = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Promise resolved value!!');
    }, 3000); // 3 seconds delay
});

async function handlePromise() {
    console.log('Step 1: Start'); // (1)
    const val = await p;  // (2) Pauses execution here
    console.log('Step 3: After await'); // (3)
    console.log(val);  // (4) Output: Promise resolved value!!
}

handlePromise();

console.log('Step 2: This runs while waiting!'); // (5)

```

**Execution Flow Step-by-Step**

Promise p is created with a 3-second delay before resolving.

Function handlePromise() is called, and execution starts inside it.

console.log('Step 1: Start'); → ✅ Output: Step 1: Start

await p; is encountered → Function pauses here until the Promise resolves.

The function is paused, but JavaScript continues executing other code.

console.log('Step 2: This runs while waiting!'); → ✅ Output: Step 2: This runs while waiting!

After 3 seconds, the Promise resolves, and the async function resumes execution.

console.log('Step 3: After await'); → ✅ Output: Step 3: After await

console.log(val); → ✅ Output: Promise resolved value!!


**Final Output (Correct Execution Order)**

Step 1: Start
Step 2: This runs while waiting!
Step 3: After await
Promise resolved value!!

**Key points**

✅ await pauses only the function, not the entire script.
✅ Synchronous code outside the function continues running while waiting.
✅ Once the Promise resolves, execution resumes from where it was paused.


# Deep Dive into Async-Await Execution in JavaScript - 

**Understanding the Execution Order of Async-Await with Promises**

In this context, we will analyze how JavaScript handles async-await under the hood, breaking it down step by step. We will examine what goes into the call stack, microtask queue, and macrotask queue, and determine the actual waiting behavior.

### Case 1: Two Promises Resolving at the Same Time**

```js 

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value!!');
  }, 5000);
});

async function handlePromise() {
  console.log('Hi');  // (1)
  const val = await p;  // (2)
  console.log('Hello There!');  // (3)
  console.log(val);  // (4)

  const val2 = await p;  // (5)
  console.log('Hello There! 2');  // (6)
  console.log(val2);  // (7)
}
handlePromise();

```

🚀 Execution Breakdown from GEC

**📌 Step 1: Global Execution Context (GEC) Creation**

JavaScript begins execution and creates the Global Execution Context (GEC).

Memory Allocation Phase:
p is declared but uninitialized.
handlePromise is stored as a function reference.


stack memory:
p → uninitialized
handlePromise → Function reference


**📌 Step 2: Execution of const p = new Promise(...)**

1. The engine reaches const p = new Promise((resolve, reject) => { ... });

When the JavaScript engine encounters the following line

```js

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done!");
  }, 5000);
});

```

2. What happens?

new Promise(...) executes immediately
The Promise constructor is invoked, and a new Promise object is created.

A new Promise object is created
The Promise starts in the Pending state.
The newly created Promise object is assigned to the variable p.

The executor function runs immediately
The function (resolve, reject) => { ... } inside the Promise runs synchronously.

Inside the executor function, setTimeout(...) is called
setTimeout is a Web API function, so it is sent to the Web API.
A 5-second timer (5000ms) starts counting down in the background.

The executor function completes execution
Since the executor function only contains setTimeout, it does not block the main thread.
The Promise remains in the Pending state, waiting for resolve("Done!") to be called after 5 seconds.

Memory Heap (After Execution Starts):
p → Pending Promise


3. Web API (Timer)

setTimeout(() => { resolve('Promise resolved value!!'); }, 5000)

This registers a 5s timer in the Web API.
Nothing happens yet because the timer is still running.


**📌 Step 3: Execution of handlePromise();**

The engine encounters handlePromise();
A new Function Execution Context (FEC) is created for handlePromise().
handlePromise is pushed onto the Call Stack.

Call Stack:
[GEC]
[handlePromise]


**📌 Step 4: Execution of console.log('Hi');**

The JavaScript engine encounters console.log("Hi");.

console.log is a built-in JavaScript function, so it is pushed onto the Call Stack.

The JavaScript engine calls the console API (which is part of the browser's environment, not JavaScript itself).

The actual logging is handled by the console API (which interacts with the browser's developer tools).

Once the function call is complete, console.log('Hi') is removed from the Call Stack.

Output: Hi


**📌 Step 5: Execution of await p; (First await)**

The engine reaches const val = await p;

What Happens?

await pauses execution of handlePromise().
The function execution suspends and is removed from the Call Stack.
JavaScript does not block but continues running other code.
p is still in the Pending state, waiting for setTimeout to complete.

Call Stack:

[GEC]  ✅ handlePromise is removed (paused)


**📌 Step 6: setTimeout Completes (After 5 Seconds)**

After 5 seconds, the timer expires.

What Happens When setTimeout Expires?
After 5 seconds, the setTimeout callback is pushed into the Macrotask Queue because Timers (setTimeout, setInterval) belong to the Macrotask Queue (Task Queue).

JavaScript schedules these tasks after the specified delay and places them in the Macrotask Queue.

The Macrotask Queue will look like this:

Macrotask Queue:
[
  () => { resolve('Promise resolved value!!'); }
]


🔹 Does It Go to the Call Stack Immediately?
No!


Before executing anything from the Macrotask Queue, the Event Loop follows this order:

1️⃣ Check if the Call Stack is empty (Yes, it's empty after handlePromise() was paused).
2️⃣ Check the Microtask Queue first (has higher priority than Macrotasks).
3️⃣ If the Microtask Queue is empty, pick from the Macrotask Queue.

Since the Microtask Queue is empty at this point, the Event Loop takes the first task from the Macrotask Queue and pushes it onto the Call Stack.

Now the Call Stack looks like this:

Call Stack:
[
  () => { resolve('Promise resolved value!!'); }
]

✅ The function executes immediately and calls resolve('Promise resolved value!!').



Detailed Explanation of resolve() Execution

1️⃣ When the setTimeout callback runs after 5 seconds, it executes:

resolve('Promise resolved value!!');

This resolve function is executed inside the Call Stack.
It does not execute the await or .then() logic immediately.

2️⃣ What happens inside resolve()?

The Promise state (p) changes from Pending → Fulfilled.
The resolved value ('Promise resolved value!!') is stored in Heap Memory.
Since Promise reactions (like await p and .then()) do not execute inside the Call Stack immediately, JavaScript schedules them in the Microtask Queue instead.

3️⃣ resolve() finishes execution and is popped from the Call Stack.



❓ But Why Doesn't await p; Resume Inside the Call Stack?

🔸 Rule of JavaScript Event Loop
💡 Promise reactions (.then(), await) NEVER execute inside the Call Stack immediately.
💡 They must always be scheduled in the Microtask Queue first.


Since the Call Stack is now empty, the Event Loop first processes tasks from the microtask queue before handling any macrotasks.


So, at this moment:

Microtask Queue:
[
  Resume handlePromise() at `await p;`
]
✅ The Microtask Queue is now filled.


🔹 What Happens Next?

1️⃣ The Event Loop checks the Call Stack → It's empty.
2️⃣ Since the Call Stack is empty, The Event Loop checks the Microtask Queue first and then takes handlePromise() from the Microtask Queue and resumes execution.


Call Stack:

[GEC]
[handlePromise]  🔥 Resumed


🚀 Key points - 

1️⃣ Promise resolution handlers (.then(), .catch(), .finally(), and await resumption) always go into the Microtask Queue.
2️⃣ The Microtask Queue has higher priority than the Macrotask Queue in the Event Loop.
3️⃣ This means 'all microtasks must be cleared before a macrotask runs.'


🔹 Why Does Microtask Queue Have Higher Priority?

JavaScript ensures Promise resolution happens as soon as possible after the Call Stack is empty.
This prevents unnecessary delays in handling async logic.

**📌 Step 7: Execution Resumes (console.log('Hello There!'))**

Runs Immediately 

Output
Hello There!
console.log('Hello There!') is removed from the Call Stack.



**📌 Step 8: Execution of console.log(val);**

Runs Immediately → Outputs:
Promise resolved value!!
console.log(val); is removed from the Call Stack.


**📌 Step 9: Execution of await p; (Second await)**

The engine reaches:
const val2 = await p;

What Happens?
Since p is already resolved, it does not pause execution.
Execution continues immediately without removing handlePromise() from the callstack.


Call Stack:
[GEC]
[handlePromise]  🔥 Continues


**📌 Step 10: Execution of console.log('Hello There! 2');**

Runs Immediately → Outputs:
Hello There! 2

console.log('Hello There! 2') is removed from the Call Stack.

**📌 Step 11: Execution of console.log(val2);**

Runs Immediately → Outputs:
Promise resolved value!!
console.log(val2); is removed from the Call Stack.

**📌 Step 12: Function handlePromise() Completes**

handlePromise() finishes execution and is removed from the Call Stack.
The Global Execution Context (GEC) remains until the script ends.

Call Stack:
[GEC]  

When the program ends, GEC is removed from the call stack.

Call Stack:
<Empty>

**📌 Final Output**

Hi
(5s delay)
Hello There!
Promise resolved value!!
Hello There! 2
Promise resolved value!!


**💡 Key Takeaways**

✔ new Promise(...) runs immediately when encountered.

✔ await suspends execution of the function and removes it from the Call Stack.

✔ Resolved Promises go to the Microtask Queue (higher priority than Macrotasks).

✔ Subsequent await calls don't pause execution if the Promise is already resolved.

✔ The Event Loop ensures execution resumes when the Call Stack is empty.


### Case 2 - Execution Order of Async Code with Two Promises Resolving at Different Times 

```js

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value!!');
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value by p2!!');
  }, 2000);
})

async function handlePromise() {
  console.log('Hi');
  const val = await p1;
  console.log('Hello There!');
  console.log(val);

  const val2 = await p2;
  console.log('Hello There! 2');
  console.log(val2);
}

handlePromise(); 

```

**📌 Step 1: Global Execution Context (GEC) Creation**

✔ JavaScript starts execution.
✔ The Global Execution Context (GEC) is created.
✔ Variables and functions are allocated in memory.

📌 stack memory (Before Execution Starts)
p1 → uninitialized
p2 → uninitialized
handlePromise → Function reference


**📌 Step 2: Execution of const p1 = new Promise(...)**

✔ A new Promise (p1) is created.
✔ Its executor function runs immediately.
✔ setTimeout(() => resolve(...), 3000) is called.
✔ The Web API registers a 3-second timer but does nothing yet.

📌 Memory Heap (After Execution of p1)
p1 → Pending Promise

**📌 Step 3: Execution of const p2 = new Promise(...)**

✔ Another Promise (p2) is created.
✔ Its executor function runs.
✔ setTimeout(() => resolve(...), 2000) is called.
✔ The Web API registers a 2-second timer.

📌 Memory Heap (After Execution of p2)
p1 → Pending Promise
p2 → Pending Promise

📌 Web API (Timers Running)
p1 → Resolves in 3s
p2 → Resolves in 2s


**📌 Step 4: Execution of handlePromise();**

✔ A Function Execution Context (FEC) is created for handlePromise() and pushed onto the Call Stack.

✅ Call Stack:
[GEC]
[handlePromise]


**📌 Step 5: Execution of console.log('Hi');**

✔ console.log("Hi"); executes.
✔ It is pushed to the Call Stack, runs, and pops immediately.

✅ Output:
Hi

✅ Call Stack (After Execution):
[GEC]
[handlePromise]


**📌 Step 6: Execution of await p1; (First Await)**

✔ The engine encounters const val = await p1;
✔ Since p1 is still pending, execution pauses at this point.
✔ handlePromise() is removed from the Call Stack.
✔ No microtask is scheduled yet because p1 is still pending.

✅ Call Stack (After Suspension):
[GEC]

✅ Microtask Queue:
[Empty]

✅ Macrotask Queue:
[Empty]

**📌 Step 7: p2 Resolves After 2 Seconds**

✔ The setTimeout for p2 expires after 2 seconds.
✔ The Web API moves the callback to the Macrotask Queue.
✔ The Event Loop sees that the Call Stack is empty, so it moves the callback from the Macrotask Queue to the Call Stack.

✅ Macrotask Queue:
[ () => resolve('Promise resolved value by p2!!') ]

✅ Call Stack (Before Execution):
[GEC]
[resolve('Promise resolved value by p2!!')]

✔ The resolve() function runs.
✔ The state of p2 is updated to Fulfilled.

📌 Memory Heap Update:
p1 → Pending
p2 → Fulfilled ("Promise resolved value by p2!!")
✔ No microtasks are created because nothing await-ed p2.
✔ The Microtask Queue remains empty.

✅ Microtask Queue:
[Empty]

✅ Macrotask Queue (After Execution):
[Empty]

**📌 Step 8: p1 Resolves After 3 Seconds**

✔ The setTimeout for p1 expires after 3 seconds.
✔ The Web API moves the callback to the Macrotask Queue.

✅ Macrotask Queue:
[ () => resolve('Promise resolved value!!') ]
✔ The Event Loop moves this callback to the Call Stack.

✅ Call Stack:
[GEC]
[resolve('Promise resolved value!!')]

✔ The resolve() function runs.
✔ The state of p1 is updated to Fulfilled.

📌 Memory Heap Update:
p1 → Fulfilled ("Promise resolved value!!")
p2 → Fulfilled ("Promise resolved value by p2!!")
✔ Now that p1 is resolved, JavaScript schedules a microtask to resume handlePromise() at await p1;.

✅ Microtask Queue:
[ Resume handlePromise at await p1; ]

✅ Macrotask Queue (After Execution):
[Empty]

**📌 Step 9: Resuming Execution of handlePromise()**

✔ The Event Loop picks the microtask from the Microtask Queue.
✔ handlePromise() resumes right after await p1;.
✔ The resolved value "Promise resolved value!!" is assigned to val.

✅ Call Stack:
[GEC]
[handlePromise] 🔥 Resumed
✔ Next, console.log("Hello There!"); executes.

✅ Output:
Hello There!

**📌 Step 10: Execution of console.log(val);**

✔ console.log(val); executes.

✅ Output:
Promise resolved value!!

**📌 Step 11: Execution of await p2; (Second Await)**

✔ Since p2 is already resolved, execution does not pause.
✔ The resolved value "Promise resolved value by p2!!" is assigned to val2.

✅ Call Stack:
[GEC]
[handlePromise]

**📌 Step 12: Execution of console.log('Hello There! 2');**

✔ console.log("Hello There! 2"); executes.

✅ Output:
Hello There! 2

**📌 Step 13: Execution of console.log(val2);**

✔ console.log(val2); executes.

✅ Output:
Promise resolved value by p2!!

✅ Call Stack (After Execution Completes):
[GEC] ✅ (handlePromise finished)


**🎯 Final Output:**

Hi
(3s delay)
Hello There!
Promise resolved value!!
Hello There! 2
Promise resolved value by p2!!

**📌 Key Fixes & Valid Points**

✔ Step 7: Microtask Queue is still empty because p1 is still pending.
✔ Step 8: Only after p1 resolves, the Microtask Queue gets [ Resume handlePromise at await p1; ].
✔ Macrotask vs. Microtask: setTimeout callbacks go to the Macrotask Queue, while await resumption happens via the Microtask Queue.
✔ Why does await p2; not pause execution? Because p2 was already resolved in Step 7.


 ### Case 3: Execution Order of Async Code with Reversed Promise Resolution, following the correct event loop behavior step by step.


```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value!!');
  }, 3000);
});


// Let's create one promise and then resolve two different promise.
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value by p2!!');
  }, 2000);
})

async function handlePromise() {
  console.log('Hi');
  const val = await p2;
  console.log('Hello There!');
  console.log(val);

  const val2 = await p1;
  console.log('Hello There! 2');
  console.log(val2);
}

handlePromise(); 

```

**📌 Step 1: Global Execution Context (GEC) Creation**

✔ JavaScript starts execution.
✔ The Global Execution Context (GEC) is created.
✔ Variables and functions are allocated in memory.

📌 stack memory (Before Execution Starts)
p1 → uninitialized  
p2 → uninitialized  
handlePromise → Function reference  

**📌 Step 2: Execution of const p1 = new Promise(...)**

✔ A new Promise (p1) is created.
✔ Its executor function runs immediately.
✔ setTimeout(() => resolve(...), 3000) is called.
✔ The Web API registers a 3-second timer but does nothing yet.

📌 Memory Heap (After Execution of p1)
p1 → Pending Promise  

**📌 Step 3: Execution of const p2 = new Promise(...)**

✔ Another Promise (p2) is created.
✔ Its executor function runs immediately.
✔ setTimeout(() => resolve(...), 2000) is called.
✔ The Web API registers a 2-second timer.

📌 Memory Heap (After Execution of p2)
p1 → Pending Promise  
p2 → Pending Promise  

📌 Web API (Timers Running)
p1 → Resolves in 3s  
p2 → Resolves in 2s  

**📌 Step 4: Execution of handlePromise();**

✔ A Function Execution Context (FEC) is created for handlePromise() and pushed onto the Call Stack.

✅ Call Stack:
[GEC]  
[handlePromise]  

**📌 Step 5: Execution of console.log('Hi');**

✔ console.log("Hi"); executes.
✔ It is pushed to the Call Stack, runs, and pops immediately.

✅ Output:
Hi  

✅ Call Stack (After Execution):
[GEC]  
[handlePromise]  

**📌 Step 6: Execution of await p2; (First Await)**

✔ The engine encounters:
const val = await p2;
✔ Since p2 is still pending, execution pauses at this point.
✔ handlePromise() is removed from the Call Stack.
✔ No microtask is scheduled yet because p2 is still pending.

✅ Call Stack (After Suspension):
[GEC]  

✅ Microtask Queue:
[Empty]  

✅ Macrotask Queue:
[Empty]  


**📌 Step 7: p2 Resolves After 2 Seconds**

✔ The setTimeout for p2 expires after 2 seconds.
✔ The Web API moves the callback to the Macrotask Queue.
✔ The Event Loop sees that the Call Stack is empty, so it moves the callback from the Macrotask Queue to the Call Stack.

✅ Macrotask Queue:
[ () => resolve('Promise resolved value by p2!!') ]  

✅ Call Stack (Before Execution):
[GEC]  
[resolve('Promise resolved value by p2!!')]  


✔ The resolve() function runs.
✔ The state of p2 is updated to Fulfilled.

📌 Memory Heap Update:
p1 → Pending  
p2 → Fulfilled ("Promise resolved value by p2!!")  
✔ Since p2 was awaited in handlePromise(), JavaScript schedules a microtask to resume execution at await p2;.

✅ Microtask Queue:
[ Resume `handlePromise` at `await p2;` ]  

✅ Macrotask Queue (After Execution):
[Empty]  


**📌 Step 8: Resuming Execution of handlePromise() at await p2;**

✔ The Event Loop picks the microtask from the Microtask Queue.
✔ handlePromise() resumes execution right after await p2;.
✔ The resolved value "Promise resolved value by p2!!" is assigned to val.

✅ Call Stack:
[GEC]  
[handlePromise] 🔥 Resumed  

✔ Next, console.log("Hello There!"); executes.

✅ Output:
Hello There!  

**📌 Step 9: Execution of console.log(val);**

✔ console.log(val); executes.

✅ Output:
Promise resolved value by p2!!  

**📌 Step 10: Execution of await p1; (Second Await)**

✔ Since p1 is still pending, execution pauses again.
✔ handlePromise() is removed from the Call Stack.

✅ Call Stack (After Suspension):
[GEC]  

✅ Microtask Queue:
[Empty]  

✅ Macrotask Queue:
[Empty]  


**📌 Step 11: p1 Resolves After 1 More Second (Total 3 Seconds Elapsed)**

✔ The setTimeout for p1 expires 1 second later (total 3 seconds elapsed).
✔ The Web API moves the callback to the Macrotask Queue.

✅ Macrotask Queue:
[ () => resolve('Promise resolved value!!') ]  

✔ The Event Loop moves this callback to the Call Stack.

✅ Call Stack:
[GEC]  
[resolve('Promise resolved value!!')]  

✔ The resolve() function runs.
✔ The state of p1 is updated to Fulfilled.

📌 Memory Heap Update:
p1 → Fulfilled ("Promise resolved value!!")  
p2 → Fulfilled ("Promise resolved value by p2!!")  
✔ Since p1 was awaited in handlePromise(), JavaScript schedules a microtask to resume execution at await p1;.

✅ Microtask Queue:
[ Resume `handlePromise` at `await p1;` ]  

✅ Macrotask Queue (After Execution):
[Empty]  

**📌 Step 12: Resuming Execution of handlePromise() at await p1;**

✔ The Event Loop picks the microtask from the Microtask Queue.
✔ handlePromise() resumes execution right after await p1;.
✔ The resolved value "Promise resolved value!!" is assigned to val2.

✅ Call Stack:
[GEC]  
[handlePromise] 🔥 Resumed  

✔ Next, console.log("Hello There! 2"); executes.

✅ Output:
Hello There! 2  

**📌 Step 13: Execution of console.log(val2);**

✔ console.log(val2); executes.

✅ Output:
Promise resolved value!!  

✅ Call Stack (After Execution Completes):
[GEC] ✅ (`handlePromise` finished)  


**🎯 Final Output Sequence:**

Hi  
(After 2 seconds)  
Hello There!  
Promise resolved value by p2!!  
(After 1 more second)  
Hello There! 2  
Promise resolved value!!  

**🔥 Key Takeaways:**

✔ p1 resolves after a total of 3 seconds (not 3 additional seconds!).
✔ Microtasks resume execution immediately after the promise is resolved.


# Does JavaScript actually "wait"?

❌ No, JavaScript does not wait.
✅ Instead, it offloads async tasks and resumes execution when needed.

When await is encountered inside an async function:

-> Execution pauses at that point, but only within that function.

-> The function removes itself from the Call Stack to avoid blocking execution.

-> This means the browser is free to handle other tasks (like UI updates).

-> The Promise is handed over to the Web API (if it's pending).

-> If the Promise is still unresolved, JavaScript does not block execution.

-> Instead, it lets the Web API handle the async operation (like a timer or network request).

-> When the Promise resolves, JavaScript schedules a Microtask.

-> The resolved value is added to the Microtask Queue.

-> The Event Loop ensures that microtasks execute before any macrotasks (like setTimeout callbacks).

-> The function resumes execution from where it paused.

-> The resolved value is assigned to the variable (const val = await somePromise;).

-> The function continues execution normally.

✅ So, JavaScript itself never waits—it just defers execution while keeping the main thread free.



# 📌 Stack Memory vs Heap Memory in the Memory Phase

In JavaScript, during the Memory Allocation Phase (also called Creation Phase), the engine scans the code and allocates memory before executing it. Here's how Stack and Heap memory behave in this phase:

**📌 Stack Memory (Primitive Values & References to Heap)**

Used for storing:

Primitive values (undefined, number, boolean, etc.).
Function reference
References to objects stored in the Heap.

**📌 Heap Memory (Objects & Complex Data Structures)**

Used for storing:
Objects, including Promises.
Functions (since functions are also objects in JS).
Arrays.

The Heap is an unstructured memory space where objects are dynamically allocated.

Example -

```js

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value!!");
  }, 5000);
});

```

**📌 Memory Phase (Before Execution Begins)**

1️⃣ Stack Memory (Stores References & Primitive Values)
p → undefined   // Initially, `p` is undefined in Stack Memory.

2️⃣ Heap Memory (Empty at this phase)
(No objects created yet)



**📌 Execution Phase (After Promise is Created)**

-> new Promise(...) Creates an Object in Heap
-> When new Promise(...) is executed, a Promise object is allocated in Heap Memory.
-> The variable p in Stack Memory now holds a reference to this Heap object.

Updated Memory

✅ Stack Memory
p → (Reference to Heap)

✅ Heap Memory
{ state: "pending", result: undefined }



📌 After 5 Seconds (When Promise Resolves)
Heap Memory is updated when resolve("Promise resolved value!!") executes.

Updated Memory

✅ Stack Memory (Unchanged)
p → (Reference to Heap)

✅ Heap Memory (Updated)
{ state: "fulfilled", result: "Promise resolved value!!" }


Note -  "The same memory management applies to both objects and arrays.

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=6nv3qy3oNkc&list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX&index=4&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/6nv3qy3oNkc/0.jpg" width="750"
alt="async-await in Javascript Youtube Link"/></a> 