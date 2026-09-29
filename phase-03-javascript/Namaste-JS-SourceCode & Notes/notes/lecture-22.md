# Chapter 22: Creating a Promise, Chaining, and Error Handling

# Consuming a Promise – Understanding How a Promise is Used

```js

const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart)
  .then(function(orderId) {
    console.log("Order ID:", orderId);
    return api.proceedToPayment(orderId); 
  })

 ```

 We are consuming the promise by using .then() to handle the resolved value (orderId) from api.createOrder(cart), ensuring the next .then() executes only after the promise is fulfilled. Now, let's see how createOrder is implemented to return a promise. In short, we'll learn how to create a Promise and return it.



# Promise – Producer Part: How a Promise is Created


**Creating a Promise in JavaScript**

A promise is created using the Promise constructor, which accepts an executor function as a callback.

**What is an Executor Function?**

The executor function is a callback that receives two parameters:

resolve → Called when the operation is successful.

reject → Called when the operation fails.

**Syntax for Creating a Promise**

const myPromise = new Promise((resolve, reject) => {
  // ✅ Perform an asynchronous task (API call, DB operation, etc.)
  let condition = true; // Simulating success/failure

  if (condition) {
    resolve("Success! 🎉"); // ✅ If successful, resolve the promise
  } else {
    reject("Something went wrong ❌"); // ❌ If failed, reject the promise
  }
});


```js

const getUserData = new Promise((resolve, reject) => {

  console.log("Fetching user data...");

  setTimeout(() => {
    let success = true;  // Simulating a condition
    if (success) {
      resolve({ id: 1, name: "Likan" });  // ✅ Resolve the promise
    } else {
      reject("Failed to fetch user data"); // ❌ Reject the promise
    }
  }, 2000);
});


```

**How It Works?:**

The Promise constructor immediately executes the asynchronous code inside the executor function.

After 2 seconds, one of the following happens:

-> ✅ If success === true, the promise is resolved with user data.
-> ❌ If success === false, the promise is rejected with an error message.


**Consuming a Promise (.then() & .catch())**

To handle the promise result, we use:

.then() → Runs when the promise is resolved.
.catch() → Runs when the promise is rejected.


```js

getUserData
  .then((user) => {
    console.log("✅ User Data:", user); // Success case
  })
  .catch((error) => {
    console.error("❌ Error:", error); // Failure case
  });


```

Let's implement createOrder, which returns a promise:

```js 

const api = {

  // Producer Code

  createOrder: function (cart) {
    return new Promise((resolve, reject) => {
      console.log("Processing order...");

      setTimeout(() => {
        if (cart.length === 0) {
          reject("Cart is empty!"); // ❌ Rejecting promise if no items in cart
        } else {
          const orderId = "12345"; // Simulated order ID
          resolve(orderId); // ✅ Resolving promise with order ID
        }
      }, 2000);
    });
  }
};

// Consumer code

const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart)
  .then((orderId) => {
    console.log("✅ Order ID:", orderId); // Order created successfully
  })
  .catch((error) => {
    console.error("❌ Error:", error); // Handle order creation failure
  });


```

-> In the code above, if the cart contains items, the promise will be resolved (success case). However, if the cart is empty, the promise will be rejected.

-> To handle the rejection, we use .catch(), which catches and processes any errors that occur during the promise execution.



# A Promise Can Be Resolved Only Once

Once a Promise is resolved or rejected, its state becomes final (settled), meaning it cannot be changed again.

**How It Works?**

A Promise has three states:
1️⃣ Pending – The initial state, before the operation completes.
2️⃣ Fulfilled (Resolved) – The operation completed successfully.
3️⃣ Rejected – The operation failed.

👉 Once a Promise is resolved or rejected, it remains in that state permanently and ignores any further resolve() or reject() calls.

**Example: Resolving a Promise More Than Once**

```js

const myPromise = new Promise((resolve, reject) => {
  resolve("First success!"); // ✅ First resolve call (Promise is now settled)
  resolve("Second success!"); // ❌ This will be ignored
  reject("This will also be ignored"); // ❌ This will be ignored too
});

myPromise.then(result => console.log(result))
         .catch(error => console.error(error));

```

Output:
First success!

🔹 The second resolve("Second success!") and reject("This will also be ignored") are ignored because the promise is already resolved.


✔ A Promise can be resolved or rejected only once.
✔ Once settled, additional resolve() or reject() calls do nothing.
✔ This prevents unexpected changes in asynchronous operations.



# Directly Resolving and Rejecting a Promise in JavaScript


# 1️⃣ Understanding Promise.resolve(value)**

The Promise.resolve(value) method immediately returns a fulfilled promise with the given value.

**Internal Equivalent of Promise.resolve(value)**

Promise.resolve(value) === new Promise((resolve) => resolve(value));


**🔹 Use Case 1: Wrapping a Synchronous Value into a Promise**

✅ Converts a normal value into a resolved promise immediately.
📌 Why? Sometimes, we want a consistent promise-based API, even for synchronous values.

```js

const syncValue = 42;
const wrappedPromise = Promise.resolve(syncValue);

console.log(wrappedPromise); // Promise { 42 }

wrappedPromise.then((value) => {
  console.log("Resolved value:", value); // Resolved value: 42
});

```

**Explanation:**

-> syncValue (42) is converted into a resolved promise.
-> The promise immediately fulfills with 42.



**🔹 Use Case 2: Returning a Resolved Promise from an Async Function**

✅ Async functions always return a promise, even if they return a normal value.
📌 Why? If you need to ensure an async function returns a resolved promise without an explicit await.

```js

async function getData() {
  return Promise.resolve("✅ Async Data Loaded");
}

getData().then((data) => console.log(data)); // ✅ Async Data Loaded

```

**Explanation:**

-> getData() is an async function that returns a resolved promise with "✅ Async Data Loaded".
-> The .then() method runs immediately, logging the resolved value.


**🔹 Use Case 3: Simplifying Promise-Based Operations Without an Executor Function**

✅ Avoids manually creating a new Promise with resolve inside an executor function.
📌 Why? When you already have a value and don't need to run any logic before resolving.

```js

// Instead of this 👇

const promise1 = new Promise((resolve) => resolve("🎉 Success!")); 

// We can simplify using Promise.resolve()

const promise2 = Promise.resolve("🎉 Success!"); 

promise2.then((message) => console.log(message)); // 🎉 Success!

```

**Explanation:**

-> The Promise.resolve() method creates a resolved promise immediately.

-> The .then() callback gets executed without needing an executor function.



# 2️⃣ Understanding Promise.reject(error)**

The Promise.reject(error) method immediately returns a rejected promise with the given error value.


**✅ Internal Equivalent of Promise.reject(reason)**

Promise.reject(reason) === new Promise((_, reject) => reject(reason));



**🔹 Use Case 1: Returning an Immediate Failure**

✅ Directly returns a rejected promise without any asynchronous operations.
📌 Why? When we already know that an operation should fail, we can immediately return a rejected promise.

```js

const immediateFailure = Promise.reject("❌ Operation failed!");

immediateFailure.catch((error) => {
  console.error("Caught Error:", error); // Caught Error: ❌ Operation failed!
});

```

Explanation:

-> Promise.reject("❌ Operation failed!") creates a rejected promise instantly.
-> The .catch() method captures and logs the error.



**🔹 Use Case 2: Handling Errors in an Async Function**

✅ Allows returning an error as a rejected promise inside an async function.

📌 Why? async functions always return a promise, so using Promise.reject() ensures the error is properly propagated.

```js 

async function fetchData() {
  return Promise.reject("❌ Data fetch failed!");
}

fetchData()
  .then((data) => console.log("Data:", data))
  .catch((error) => console.error("Caught Error:", error));

```
Explanation:

-> The function fetchData() returns a rejected promise using Promise.reject().
-> The .catch() block handles the rejection.

**🔹 Use Case 3: Explicitly Rejecting Promises in Custom Logic**

✅ Rejects a promise conditionally based on logic.
📌 Why? Ensures structured error handling in a promise-based workflow.

```js

function validateUser(user) {
  if (!user) {
    return Promise.reject("❌ User is not found!");
  }
  return Promise.resolve(`✅ Welcome, ${user}!`);
}

validateUser(null)
  .then((message) => console.log(message))
  .catch((error) => console.error("Caught Error:", error)); // Caught Error: ❌ User is not found!

validateUser("Likan")
  .then((message) => console.log(message)) // ✅ Welcome, Likan!
  .catch((error) => console.error("Caught Error:", error));


```
Explanation:

-> If user is null, the function rejects the promise.
-> If a valid user is provided, it resolves successfully.


# Understanding Promise Logging Behavior

When you log a Promise object, you might initially see it as pending. 

This happens because promises are asynchronous, and their state (fulfilled or rejected) gets updated only after the execution phase is complete.

**🔹 Why does this happen?**

-> JavaScript executes synchronous code first before handling promise resolutions.
-> If you log a promise immediately after creating it, the state may still be pending.
-> The state updates only after the event loop has had a chance to process it.
-> To see the updated state, you should log it after a delay (e.g., inside setTimeout()).

**Example Without setTimeout (Immediate Logging)**

```js

const promise = Promise.resolve("✅ Success!");

// Logging the promise immediately
console.log("Logging Immediately:", promise);

```

🔹 Expected Output (in some browsers/consoles)

Logging Immediately: Promise { <pending> }

🔹 Even though Promise.resolve("✅ Success!") resolves immediately, the log might still show pending because the promise resolution happens asynchronously.The log statement runs before the promise is settled.(either resolved or rejected)

**Example with setTimeout (correct way)**

To ensure you see the final resolved state, log it inside a setTimeout(). This ensures the event loop has time to process the promise.

```js 

const promise = Promise.resolve("✅ Success!");

console.log("Logging Immediately:", promise); // Might still show as pending

setTimeout(() => {
  console.log("Logging After Event Loop:", promise); // Now it will show fulfilled
}, 0);

```

🔹 Expected Output

Logging Immediately: Promise { <pending> }
Logging After Event Loop: Promise { '✅ Success!' }

🔹 Explanation:

First log happens synchronously → The promise state may still be pending.

Second log (inside setTimeout) happens after the event loop has processed the promise, so the state is now "fulfilled".

**Example With Promise.reject()**

The same logic applies if a promise is rejected:

```js

const rejectedPromise = Promise.reject("❌ Error occurred!");

console.log("Logging Immediately:", rejectedPromise); // Might still show as pending

setTimeout(() => {
  console.log("Logging After Event Loop:", rejectedPromise); // Now it will show rejected
}, 0);

```

🔹 Expected Output

Logging Immediately: Promise { <pending> }
Uncaught (in promise) ❌ Error occurred!  <-- Might appear in some browsers
Logging After Event Loop: Promise { <rejected> '❌ Error occurred!' }

🔹 Why is the error logged separately?

In some environments (like browsers), an unhandled rejected promise might throw an error before setTimeout runs.
To catch the error properly, use .catch().


<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=U74BJcr8NeQ&list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX&index=4&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/U74BJcr8NeQ/0.jpg" width="750"
alt="promise in Javascript Youtube Link"/></a>