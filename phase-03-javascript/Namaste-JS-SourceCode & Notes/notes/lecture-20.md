# Chapter 20 : Callback


# 🚀 What Are Callbacks?

A callback is just a function that you pass into another function **to run later**

There are 2 parts to callbacks: 


# Good Part of Callbacks:

**1. Asynchronous Operations:**

Callbacks are crucial for handling asynchronous tasks in JavaScript, allowing code to run without blocking the main thread.
Callbacks are used inside setTimeout() to delay the execution of the callback function and run it after a specified time.
Callbacks are used inside setInterval() to repeatedly execute the callback function at fixed time intervals.

**Why Use Callbacks?**

Callbacks let JavaScript continue other work first and run the callback function later when the asynchronous operation has finished.

```js

  console.log("Start");
  setTimeout(function() {
      console.log("Executed after 2 seconds");
  }, 2000);
  console.log("End");

  // Output:
  // Start
  // End
  // Executed after 2 seconds - The callback gets executed after 2 seconds.

```

**2. Event Handling:**

Callbacks are heavily used in event-driven programming to respond to user interactions like clicks, key presses, or form submissions.

Why Use Callbacks: They ensure that specific code runs when an event is triggered.


```js
    
    const button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        console.log("Button Clicked!");
    });

```


**3. Higher-Order Functions:**

Callbacks are often used with higher-order functions to make code more modular and readable.

Higher-order functions like map(), filter(), and reduce() accept callbacks to perform operations on each element of an array.

They make complex tasks simple because you don't write loops . You dont have to write the implementation of HOF (map, filter, reduce) - you just write what should happen.

```js

const numbers = [1, 2, 3, 4];
const squared = numbers.map(function(num) {
    return num * num;
});

console.log(squared); // [1, 4, 9, 16]

```

**4. Custom Logic Execution:**

Callbacks allow us to define custom logic that executes after completing a specific operation.

Example: Executing a function after processing some data or completing a calculation.

```js

  function processData(data, callback) {
      console.log("Processing data: " + data);
      callback();
  }

  processData("Sample Data", function() {
      console.log("Data processed successfully!");
  });

```

**5. Functional Programming:**

In functional programming, callbacks help write reusable and modular code.

Example: Passing a function as an argument to another function for performing specific tasks.


```js

const radiusArr = [1, 2, 3, 4];

// Logic to calculate area
const area = function(radius) {
    return Math.PI * radius * radius;
};

// Logic to calculate circumference
const circumference = function(radius) {
    return 2 * Math.PI * radius;
};

// Higher-Order Function (HOF) - Takes an array and operation as arguments
const calculate = function(radiusArr, operation) {
    const output = [];
    for (let i = 0; i < radiusArr.length; i++) {
        output.push(operation(radiusArr[i])); // Applying operation to each element
    }
    return output;
};

console.log(calculate(radiusArr, area));          // Calculates area
console.log(calculate(radiusArr, circumference)); // Calculates circumference

```


# Bad Part of Callbacks:

When callbacks are nested inside other callbacks, it leads to issues like:
Callback Hell (discussed later): Code becomes deeply nested and hard to read.
Inversion of Control(discussed later): Flow of control is given to the callback function, making error handling & debugging difficult.


# Synchronous Nature of JavaScript

JavaScript is a synchronous, single-threaded language. It can do just one thing at a time because it has only one call stack to execute code line by line. It does not wait for operations to complete.


console.log("Namaste");
console.log("JavaScript");
console.log("Season 2");

// Output:
// Namaste
// JavaScript
// Season 2


**Step-by-Step Explanation:**

-> console.log("Namaste") is executed first, printing Namaste.

-> Next, console.log("JavaScript") is executed, printing JavaScript.

-> Finally, console.log("Season 2") is executed, printing Season 2.

All statements are executed synchronously, one after another.


# ⏳ Delaying Code Execution Using Callbacks

What if we want to delay the execution of any line? We can utilize callbacks to achieve this.

```js

console.log("Namaste");

setTimeout(function () {
  console.log("JavaScript");
}, 5000);

console.log("Season 2");

// Output:
// Namaste
// Season 2
// JavaScript (after 5 seconds)

// 💡 Here we are delaying the execution using the callback approach of setTimeout.

```

# Why Are Callbacks Important?

Callbacks are important because they let JavaScript continue running other code while waiting for slow tasks like API calls or file reading. Without callbacks, JavaScript would get stuck and block the main thread.


# Understanding Callback Hell


**🔥 What is Callback Hell?**

Callback Hell happens when many callbacks are nested inside each other, creating messy, hard-to-read code that looks like a pyramid.




**🛒 Real-Life Scenario: e-Commerce Web App**

Imagine an e-commerce website where a user places an order. The user has added items like shoes, pants, and a kurta to the cart. To complete the order, the backend needs to perform the following steps sequentially:

  -> step 1 - Create an order
  -> step 2 - Proceed to payment
  -> step 3 - Show the order summary
  -> step 4 - Update the wallet balance

Since these steps have dependencies on each other, we must ensure that each operation only starts after the previous one finishes. 

This is where callbacks come into play.

**🚀 Simulating the api Object**

The api object is just a frontend simulation of backend APIs.
Each function uses setTimeout() to create a delay, so it behaves like a real backend request that takes time (network delay, server processing, etc.).


```js 

  const api = {
    
    createOrder: function (cart, callback) {  // Simulates creating an order
      console.log("Creating order with items:", cart);
      setTimeout(() => {
        console.log("✅ Order created successfully.");
        callback();  // Calls the next step
      }, 1000); 
    },

    
    proceedToPayment: function (callback) {  // Simulates proceeding to payment
      console.log("Proceeding to payment...");
      setTimeout(() => {
        console.log("💰 Payment processed successfully.");
        callback();  // Calls the next step
      }, 1000);
    },

    
    showOrderSummary: function (callback) { // Simulates showing the order summary
      console.log("Fetching order summary...");
      setTimeout(() => {
        console.log("📦 Order summary displayed.");
        callback(); // Calls the next step
      }, 1000);
    },

    
    updateWallet: function () { // Simulates updating the wallet
      console.log("Updating wallet balance...");
      setTimeout(() => {
        console.log("💵 Wallet balance updated.");
      }, 1000);
    },
  };

const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {     // Callback hell situation (Pyramid of Doom)
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet(); // Just logs the message, no next callback
    });
  });
});


```

Let's break down the entire callback chain, step by step:

**Step 1: Creating an Order**

api.createOrder(cart, function () {...})

-> The createOrder function is called with two arguments:
   cart: An array of items to order.
   callback: A function that will be executed after the order is created.

-> Inside createOrder: A message is logged:
   Creating order with items: ["shoes", "pants", "kurta"]


-> A setTimeout function simulates a delay of 1 second (1000 ms).
After the delay, it logs: ✅ Order created successfully.

-> Finally, the callback() function is called to proceed to the next step.

Why use a Callback here?

The callback ensures that the next step (proceeding to payment) only happens after the order creation is completed.

**Step 2: Proceeding to Payment**

api.proceedToPayment(function () {...})

-> After the order is created, the proceedToPayment function is called.

-> This function logs:Proceeding to payment...

-> Again, a setTimeout simulates a delay of 1 second.
After the delay, it logs: 💰 Payment processed successfully.

-> Finally, it calls the next callback function to show the order summary.

Why Chain Another Callback?

Since payment can only happen after an order is created, the callback ensures the flow is maintained without breaking the sequence.

**Step 3: Showing the Order Summary**


api.showOrderSummary(function () {...})

-> Once the payment is done, the showOrderSummary function is invoked.

-> It logs the message:Fetching order summary...

-> Another delay is simulated using setTimeout.
   After the delay, it logs:📦 Order summary displayed.

-> The callback function is then called to update the wallet.

Why Another Callback?

Order summary should only be shown after successful payment, maintaining the logical flow of operations.

**Step 4: Updating the Wallet**

api.updateWallet();

-> The final step is updating the wallet balance.

-> The updateWallet function logs: Updating wallet balance...

-> After a delay, it logs: 💵 Wallet balance updated.


Unlike the previous functions, there is no callback for updateWallet since it’s the final step.


# 🔥 Why Is Callback Hell a Problem?

When working with a large codebase that has a number of APIs with internal dependencies, we may encounter Callback Hell. This happens when asynchronous operations are nested within each other, making the code grow horizontally in a pyramid-like structure. As a result, the code becomes difficult to read and maintain. This problematic structure is commonly known as the Pyramid of Doom.


**😵 1. Difficult to Add or Modify Steps**

Adding or changing steps in a callback hell structure is a nightmare.

Example Scenario: Imagine you want to add a "Send Confirmation Email" step between showOrderSummary and updateWallet.

You have to:

-> Dig Deep: Find the correct place in the nested callbacks to add the new step.
-> Add Another Callback: Introduce a new callback inside the deepest level.

```js

const api = {
  createOrder: function (cart, successCallback) {
    console.log("Creating order with items:", cart);
    setTimeout(() => {
      console.log("✅ Order created successfully.");
      successCallback();
    }, 1000);
  },

  proceedToPayment: function (successCallback) {
    console.log("Proceeding to payment...");
    setTimeout(() => {
      console.log("💰 Payment processed successfully.");
      successCallback();
    }, 1000);
  },

  showOrderSummary: function (successCallback) {
    console.log("Fetching order summary...");
    setTimeout(() => {
      console.log("📦 Order summary displayed.");
      successCallback();
    }, 1000);
  },

  sendConfirmationEmail: function (successCallback) {
    console.log("Sending confirmation email...");
    setTimeout(() => {
      console.log("✉️ Confirmation email sent.");
      successCallback();
    }, 1000);
  },

  updateWallet: function (successCallback) {
    console.log("Updating wallet balance...");
    setTimeout(() => {
      console.log("💵 Wallet balance updated.");
      successCallback();
    }, 1000);
  },
};

const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.sendConfirmationEmail(function () { // New step added here
        api.updateWallet(function () {
          console.log("🎉 Order process completed!");
        });
      });
    });
  });
});


```
💡 Why It’s a Problem:

-> Messy Code: The more steps you add, the more cluttered and confusing it becomes.
-> Complex Modifications: Changing the order of steps or adding/removing steps is risky and error-prone.



**⚠️ 2. Hard to Track Errors**

Handling errors in a callback hell structure is chaotic.

Example Scenario:

If the proceedToPayment function fails due to a payment gateway issue, it's not clear where the error occurred.

```js

const api = {
  createOrder: function (cart, successCallback, errorCallback) {
    console.log("Creating order with items:", cart);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // Simulate success or failure
      if (isSuccess) {
        console.log("✅ Order created successfully.");
        successCallback();  
      } else {
        errorCallback("Failed to create order.");
      }
    }, 1000);
  },

  proceedToPayment: function (successCallback, errorCallback) {
    console.log("Proceeding to payment...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // Simulate success or failure
      if (isSuccess) {
        console.log("💰 Payment processed successfully.");
        successCallback();
      } else {
        errorCallback("Payment processing failed.");
      }
    }, 1000);
  },

  showOrderSummary: function (successCallback, errorCallback) {
    console.log("Fetching order summary...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // Simulate success or failure
      if (isSuccess) {
        console.log("📦 Order summary displayed.");
        successCallback();
      } else {
        errorCallback("Failed to display order summary.");
      }
    }, 1000);
  },

  sendConfirmationEmail: function (successCallback, errorCallback) {
    console.log("Sending confirmation email...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // Simulate success or failure
      if (isSuccess) {
        console.log("✉️ Confirmation email sent.");
        successCallback();
      } else {
        errorCallback("Failed to send confirmation email.");
      }
    }, 1000);
  },

  updateWallet: function (successCallback, errorCallback) {
    console.log("Updating wallet balance...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // Simulate success or failure
      if (isSuccess) {
        console.log("💵 Wallet balance updated.");
        successCallback();
      } else {
        errorCallback("Failed to update wallet balance.");
      }
    }, 1000);
  },
};


const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.sendConfirmationEmail(function () {  
        api.updateWallet(function () {
          console.log("🎉 Order process completed!");
        }, function (error) {
          console.error("❌ Wallet update error:", error);
        });
      }, function (error) {
        console.error("❌ Email sending error:", error);
      });
    }, function (error) {
      console.error("❌ Order summary error:", error);
    });
  }, function (error) {
    console.error("❌ Payment error:", error);
  });
}, function (error) {
  console.error("❌ Order creation error:", error);
});


```


💡 Why It’s a Problem:

-> Repetitive Logic: You end up writing similar error-handling code in every callback.
In the nested callback structure, each step of the process requires its own error-handling logic.
For example, in this code, each API call has an errorCallback that logs an error message:

Notice that every single step repeats the same pattern of:

  1.Performing an action.
  2.Checking if it succeeds.
  3.Handling an error if it doesn't.

This makes the code unnecessarily long and harder to maintain because:

  1.You are duplicating the same error-handling logic over and over.
  2.Any change to the error-handling mechanism would require updating multiple places.



-> Chaotic Flow: 


If one step fails, it becomes challenging to properly stop or reverse the previous steps.

For example:

If proceedToPayment fails, should you reverse the order creation?
If sendConfirmationEmail fails, should you roll back the payment?
Handling such scenarios in a callback hell structure is messy because -

  1.You would need to write additional callbacks to reverse each step.
  2.The code flow becomes chaotic and difficult to manage.

If a step like proceedToPayment or sendConfirmationEmail fails, the code returns an error message. However, returning an error message is not the same as rolling back or reversing the previous steps.


🔄 Rollback vs. Error Message -

Error Message: Simply logs the error and stops further execution. It doesn't undo the previous successful operations.

Rollback: Actively reverses or compensates for the changes made in the previous steps (like canceling the order if payment fails).

Example Scenario:

1.You successfully create an order (step 1).
2.The payment fails (step 2).
3.The error message "❌ Payment error: Payment processing failed" is logged.
Now you have an orphaned order in your system that was created but never paid for.
4.The problem is that:
    The order still exists even though the payment failed.
    You may need to delete or cancel the order to maintain consistency.
    In a real-world scenario, this would cause data inconsistencies and potential user confusion.


🚩 Why Callback Hell Makes It Worse ?

Handling such rollbacks becomes complicated because:
You would have to write separate rollback functions for each step.
You would also have to nest these rollback functions within each callback, making the structure even more chaotic and harder to maintain.

-> Debugging Nightmare: You must track errors manually at each step, which is error-prone.

Let's say you see this error in the console:

❌ Payment error: Payment processing failed.

Problem 1: No Clarity on the Root Cause.

You know that the payment step failed, but you don't know why. There could be multiple reasons:

Network Issue: The payment gateway itself might be down.
Invalid Order ID: The order ID generated in the createOrder step might be invalid or missing.
Internal Server Issue: The payment processing server could be experiencing issues.

🚩 Why Tracing Back Is Hard:
The error message in proceedToPayment only tells you that payment failed.

It doesn’t tell you:
Whether the previous step (createOrder) was successful in generating a valid order ID.
Whether there was a data issue passed from createOrder to proceedToPayment.

To find the root cause, you’d have to:
Go through the callback hierarchy manually.
Check the output of each preceding step.
Trace the data passed from one callback to another.

**What If Preceding Steps are the Problem?**

Suppose the createOrder step successfully calls the success callback, but it actually generated a corrupted order ID.

The proceedToPayment step would still run, using this corrupted ID.
Since the payment step only handles its own errors, it doesn’t know that the problem was caused by the previous step.
❌ Payment error: Payment processing failed.

However, the real problem was in createOrder, not proceedToPayment.


```js

const api = {
  // 🛒 Step 1: Create Order
  createOrder: function (cart, successCallback, errorCallback) {
    console.log("Creating order with items:", cart);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // Simulate success or failure
      if (isSuccess) {
        const order = {
          orderId: "ORD-" + Date.now(),
          cart,
          amount: 2500,          // fake total amount
          userId: "USER-123",    // fake user id
        };
        console.log("✅ Order created successfully:", order.orderId);
        successCallback(order);  // 👉 pass order object forward
      } else {
        errorCallback("Failed to create order.");
      }
    }, 1000);
  },

  // 💳 Step 2: Proceed to Payment
  proceedToPayment: function (order, successCallback, errorCallback) {
    console.log("Proceeding to payment for order:", order.orderId);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        const payment = {
          paymentId: "PAY-" + Date.now(),
          orderId: order.orderId,
          status: "SUCCESS",
        };
        console.log("💰 Payment processed successfully:", payment.paymentId);
        // 👉 pass both order + payment forward
        successCallback({ order, payment });
      } else {
        errorCallback("Payment processing failed.");
      }
    }, 1000);
  },

  // 📦 Step 3: Show Order Summary
  showOrderSummary: function (context, successCallback, errorCallback) {
    console.log("Fetching order summary for:", context.order.orderId);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        const summary = {
          orderId: context.order.orderId,
          items: context.order.cart,
          amount: context.order.amount,
          paymentStatus: context.payment.status,
        };
        console.log("📦 Order summary displayed.");
        // 👉 keep extending the context
        successCallback({ ...context, summary });
      } else {
        errorCallback("Failed to display order summary.");
      }
    }, 1000);
  },

  // ✉️ Step 4: Send Confirmation Email
  sendConfirmationEmail: function (context, successCallback, errorCallback) {
    console.log("Sending confirmation email for:", context.order.orderId);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        const emailInfo = {
          to: context.order.userId,
          status: "SENT",
        };
        console.log("✉️ Confirmation email sent to user:", context.order.userId);
        successCallback({ ...context, emailInfo });
      } else {
        errorCallback("Failed to send confirmation email.");
      }
    }, 1000);
  },

  // 💵 Step 5: Update Wallet
  updateWallet: function (context, successCallback, errorCallback) {
    console.log("Updating wallet for user:", context.order.userId);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        const walletInfo = {
          userId: context.order.userId,
          debitedAmount: context.order.amount,
          status: "DEBITED",
        };
        console.log("💵 Wallet balance updated.");
        successCallback({ ...context, walletInfo });
      } else {
        errorCallback("Failed to update wallet balance.");
      }
    }, 1000);
  },
};

// 🧺 Cart data coming from frontend
const cart = ["shoes", "pants", "kurta"];

// 😵 Callback Hell with Data Flow (Pyramid of Doom)
api.createOrder(
  cart,
  function (order) {
    api.proceedToPayment(
      order,
      function (contextAfterPayment) {
        api.showOrderSummary(
          contextAfterPayment,
          function (contextAfterSummary) {
            api.sendConfirmationEmail(
              contextAfterSummary,
              function (contextAfterEmail) {
                api.updateWallet(
                  contextAfterEmail,
                  function (finalContext) {
                    console.log("🎉 Order process completed!");
                    console.log("✅ Final Context:", finalContext);
                  },
                  function (error) {
                    console.error("❌ Wallet update error:", error);
                  }
                );
              },
              function (error) {
                console.error("❌ Email sending error:", error);
              }
            );
          },
          function (error) {
            console.error("❌ Order summary error:", error);
          }
        );
      },
      function (error) {
        console.error("❌ Payment error:", error);
      }
    );
  },
  function (error) {
    console.error("❌ Order creation error:", error);
  }
);

```



📝 Why Callback Hell Makes It Worse:
Isolated Error Handlers: Each step has its own error handler, making it hard to centralize error reporting.
Loss of Context: Once you move to the next callback, you lose context about the previous step.
Nested Structure: You would need to dive deep into nested functions to trace the issue.


**3.Hard to Read**


Why is Callback Hell Hard to Read?

Callback hell, also known as the "pyramid of doom," occurs when there are multiple nested callback functions. As asynchronous operations increase, the nesting becomes deeper and harder to manage. Let's break down why this structure is challenging to read and maintain.

1. Indentation Nightmare

-> The nested structure resembles a pyramid shape, where each new callback adds another level of indentation.
-> This makes the code visually cluttered and confusing.
-> The deeper the nesting, the harder it becomes to follow the flow.

2. Difficult to Follow the Flow

-> You can't quickly understand the sequence of steps just by looking at the code.
-> The logic becomes scattered across multiple nested functions.
-> It's time-consuming to trace each callback and understand the overall flow.

3. Repeated and Messy Error Handling

-> Each step often has its own error callback function.
-> This leads to repetitive error handling logic, making the code bloated.
-> Handling errors at multiple levels becomes confusing and error-prone.

4. Tight Coupling of Functions

In callback hell, each function depends heavily on the next one, making them tightly connected. This makes it difficult to reuse any step individually. If you change one function, it can break the entire chain because every step relies on the previous one’s structure and timing.



**🪲 4. Difficult to Debug**

When something breaks, finding the root cause in deeply nested callbacks is a headache.

Example Scenario: 
 
If you see an error message like "Payment failed", it’s hard to determine:
What triggered that failure.
Whether it was caused by the preceding steps or the current one.

🪲 Why It’s Hard to Debug in This Context:

1. Confusing Flow:
-> In callback hell, functions are nested within functions, making it hard to follow the flow.
-> The code doesn't follow a top-to-bottom linear path, so you have to jump between callbacks to understand the sequence.
-> Even if you see where the error was logged, it doesn't mean you actually know why it happened.

2. Time-Consuming:
-> You might spend hours tracing back through each callback to see if the failure originated in a previous step.
-> For example, if proceedToPayment fails, you might have to:
      Check the createOrder step to ensure the order ID was generated correctly.
      Validate the data passed between callbacks to see if something got corrupted or was missing.
-> If the error message only says "Payment processing failed", it doesn't tell you whether the problem was:
      A network issue during payment.
      An invalid order ID from the previous step.
 
      

Let’s understand the problem of debugging using the same example, but with clearer and better English.

```js

api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.sendConfirmationEmail(function () {
        api.updateWallet(function () {
          console.log("🎉 Order process completed!");
        }, function (error) {
          console.error("❌ Wallet update error:", error);
        });
      }, function (error) {
        console.error("❌ Email sending error:", error);
      });
    }, function (error) {
      console.error("❌ Order summary error:", error);
    });
  }, function (error) {
    console.error("❌ Payment error:", error);
  });
}, function (error) {
  console.error("❌ Order creation error:", error);
});

```

🔄 Problem in Debugging:

Nested Error Handling:
-> Each step has its own error callback.
-> If the payment step fails, the error handler only shows the payment error message, but it doesn’t indicate whether:
    - The order creation step produced an invalid ID.
    - There was inconsistent data passed between steps.

Disjointed Error Logs:
-> The error message is isolated to the current step.
-> You would have to go back manually and inspect previous logs to verify each step.

No Contextual Information:
-> The payment error message doesn’t provide insights about the preceding steps.
-> You would have to add debug statements at every level just to track the progress and data at each stage.



🚩 Why It’s a Problem:

-> The deep nesting makes it hard to see the entire flow at once.
-> You can’t tell whether the problem started earlier or if it genuinely failed at the current step.
-> Isolated error handlers make it difficult to correlate errors across multiple steps.



# 🔄 How Do We Propagate Errors in Callback Hell?

In the callback hell example, we are manually handling errors at each level. 
If an error occurs at any level, it is handled at that specific level itself using the error callback defined at that level. The error does not "pass back" to the previous level.

💻 Example: Error Propagation in Callbacks

```js

const api = {
  createOrder: function (cart, successCallback, errorCallback) {
    console.log("Creating order with items:", cart);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("✅ Order created successfully.");
        successCallback();
      } else {
        errorCallback("Failed to create order.");
      }
    }, 1000);
  },

  proceedToPayment: function (successCallback, errorCallback) {
    console.log("Proceeding to payment...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("💰 Payment processed successfully.");
        successCallback();
      } else {
        errorCallback("Payment processing failed.");
      }
    }, 1000);
  },

  showOrderSummary: function (successCallback, errorCallback) {
    console.log("Fetching order summary...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("📦 Order summary displayed.");
        successCallback();
      } else {
        errorCallback("Failed to display order summary.");
      }
    }, 1000);
  },

  sendConfirmationEmail: function (successCallback, errorCallback) {
    console.log("Sending confirmation email...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("✉️ Confirmation email sent.");
        successCallback();
      } else {
        errorCallback("Failed to send confirmation email.");
      }
    }, 1000);
  },

  updateWallet: function (successCallback, errorCallback) {
    console.log("Updating wallet balance...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("💵 Wallet balance updated.");
        successCallback();
      } else {
        errorCallback("Failed to update wallet balance.");
      }
    }, 1000);
  },
};


const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.sendConfirmationEmail(function () {
        api.updateWallet(function () {
          console.log("🎉 Order process completed!");
        }, function (error) {
          console.error("❌ Wallet update error:", error);
        });
      }, function (error) {
        console.error("❌ Email sending error:", error);
      });
    }, function (error) {
      console.error("❌ Order summary error:", error);
    });
  }, function (error) {
    console.error("❌ Payment error:", error);
  });
}, function (error) {
  console.error("❌ Order creation error:", error);
});

```

**🔁Error Propagation through the Chain-**

✅ Success Flow:
Order Creation Success: Moves to payment.
Payment Success: Moves to order summary.
Order Summary Success: Moves to email sending.
Email Sending Success: Moves to wallet update.
Wallet Update Success: Logs "🎉 Order process completed!".

❌ Error Flow:
Error at Any Step.
The error callback for that step gets called.
The error message is passed as an argument to that callback.
The error is immediately logged and stops further execution.


**🔗 Understanding Error Propagation**

Error propagation in callback chains is essential for handling failures effectively. 

In a callback chain, multiple functions are executed one after another, with each function having its own success and error callbacks.

When an error occurs at any level, it is immediately handled by the error callback defined at that level. 

The error does not automatically propagate back up to the calling function or the top-level API.

To understand this better, let's break it down with a real-world analogy.


**🍕 Analogy: The Pizza Delivery Chain**

Imagine a pizza delivery chain where each worker has a specific task in the pizza-making process:

Worker 1 (Order Taker): Takes the order and passes it to the next worker.

Worker 2 (Pizza Maker): Prepares the pizza and passes it to the next worker if successful.

Worker 3 (Quality Checker): Checks the pizza quality and passes it on.

Worker 4 (Packer): Packs the pizza and passes it to the delivery person.

Worker 5 (Delivery Person): Delivers the pizza to the customer.

❌ What if Something Goes Wrong?

If Worker 3 (Quality Checker) finds that the pizza is burnt, they immediately notify Worker 2 (Pizza Maker) to redo it. The error does not go back to Worker 1 (Order Taker) directly. Instead, Worker 2 is responsible for fixing it. The error stops there because it’s already caught and handled.


**🚀 Code Example: Error Callback Chain**

Here’s a simplified chain of how API calls are made:

```js 
api.createOrder(cart, function () {  // Level 1
  api.proceedToPayment(function () {  // Level 2
    api.showOrderSummary(function () {  // Level 3
      api.sendConfirmationEmail(function () {  // Level 4
        api.updateWallet(function () {  // Level 5
          console.log("🎉 Order process completed!");
        }, function (error) {  // Error Handler for Wallet Update (Level 5)
          console.error("❌ Wallet update error:", error);
        });
      }, function (error) {  // Error Handler for Email Sending (Level 4)
        console.error("❌ Email sending error:", error);
      });
    }, function (error) {  // Error Handler for Order Summary (Level 3)
      console.error("❌ Order summary error:", error);
    });
  }, function (error) {  // Error Handler for Payment (Level 2)
    console.error("❌ Payment error:", error);
  });
}, function (error) {  // Error Handler for Order Creation (Level 1)
  console.error("❌ Order creation error:", error);
});

```

**🕵️‍♂️ Breaking Down Error Propagation**

Deepest Level Error (Wallet Update Fails):

api.updateWallet() fails and calls its error callback.

The error callback function logs the error message:

function (error) {
  console.error("❌ Wallet update error:", error);
}

The error does not go back further because it's already handled at this level.

Mid-Level Error (Payment Fails):

api.proceedToPayment() fails and triggers its error callback.

The callback logs:

function (error) {
  console.error("❌ Payment error:", error);
}

The error stops here and does not propagate back to the top level.

✅ Key Takeaways - 

-> Each API function has its own success and error callback.

-> If an error occurs at a deeper level, it is handled immediately and does not propagate back up.

-> The top-level function only knows about errors that occur at its own level.

-> There is no automatic error bubbling in callbacks. Errors must be caught and handled at each specific level.


**🚩 What’s the Problem with This Approach?**

Manual Propagation:

In a callback-based system, every function must manually call its own error callback when something goes wrong.
If even one nested function forgets to call errorCallback(...), the error:

❌ does not move forward
❌ does not reach the outer levels
❌ does not get logged
❌ does not stop the chain safely

This makes the error silent and very hard to trace.

Missed Callbacks:

If you forget even one error callback, the entire chain fails silently. This means that the error will never be caught or logged, making it hard to trace the failure.

For example: If we forget to handle the error in proceedToPayment -

```js

api.proceedToPayment(function () {
  api.showOrderSummary(function () {
    // Next steps...
  }); 
}, <no error handler>); // 🔴 No error handling here!

```
In this case, if the payment processing fails, the error message will never be shown, and the order process will just stop without giving any feedback to the user.


Silent Failures:

If an error callback is not called properly, the failure may go unnoticed.
If we pass the wrong callback by mistake, the error will never be shown.

This means:

The error is treated as a success.
The program continues as if everything is fine.
The real problem becomes invisible.
Debugging becomes extremely difficult.

```js

api.proceedToPayment(function () {
  console.log("✅ Payment successful");
}, successCallback); // ❌ Wrong callback passed!

```

Here, successCallback is passed instead of the error callback.
So if payment fails: The system thinks it succeeded.
No error message is shown.
The flow becomes misleading.


**💡 Real Issue: Uncaught or Swallowed Errors**

When an error is not correctly handled at one level, it does not propagate up the chain to higher-level functions.
This results in silent failures, where the system appears to be working fine while errors are being ignored.
The lack of centralized error handling makes it extremely challenging to trace the problem and respond correctly.


# Avoiding Callback Hell

To overcome these challenges, we can use Promises or async/await to make the code cleaner, more readable, and easier to manage. 
We will explore these concepts in depth in the next chapter.
For now, if you come across such terms, there’s no need to worry or dive into them immediately. We’ll cover them thoroughly when the time comes.


**💡 How Promises and Async/Await Help**

Promises and async/await are designed to make asynchronous code more readable and manageable by eliminating callback hell.

**🚀 Promises**

-> Promises flatten the chain, making the code more linear and readable.
-> Errors are caught in one place, reducing repetitive error handling.
-> Chaining is clean and easy to follow.
-> With one .catch() at the end, any error from any step is automatically handled — no need to write error handling everywhere.


Promise-Based API Code Implementation -

```js

function createOrder(cart) {
  return new Promise((resolve, reject) => {
    console.log("Creating order with items:", cart);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("✅ Order created successfully.");
        resolve();
      } else {
        reject("Failed to create order.");
      }
    }, 1000);
  });
}

function proceedToPayment() {
  return new Promise((resolve, reject) => {
    console.log("Proceeding to payment...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("💰 Payment processed successfully.");
        resolve();
      } else {
        reject("Payment processing failed.");
      }
    }, 1000);
  });
}

function showOrderSummary() {
  return new Promise((resolve, reject) => {
    console.log("Fetching order summary...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("📦 Order summary displayed.");
        resolve();
      } else {
        reject("Failed to display order summary.");
      }
    }, 1000);
  });
}

function sendConfirmationEmail() {
  return new Promise((resolve, reject) => {
    console.log("Sending confirmation email...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("✉️ Confirmation email sent.");
        resolve();
      } else {
        reject("Failed to send confirmation email.");
      }
    }, 1000);
  });
}

function updateWallet() {
  return new Promise((resolve, reject) => {
    console.log("Updating wallet balance...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        console.log("💵 Wallet balance updated.");
        resolve();
      } else {
        reject("Failed to update wallet balance.");
      }
    }, 1000);
  });
}


createOrder(["shoes", "pants", "kurta"])
  .then(() => proceedToPayment())
  .then(() => showOrderSummary())
  .then(() => sendConfirmationEmail())
  .then(() => updateWallet())
  .then(() => console.log("Order process completed!"))
  .catch((error) => console.error("Error:", error));


 ``` 

**🌀 Async/Await**

-> Makes async code look and feel like synchronous code, making it easier to read and understand.
-> Uses try-catch to handle errors in one place, keeping the code clean and manageable.
-> Gets rid of deeply nested callbacks, reducing complexity and making the code flow naturally.
-> Makes error handling straightforward without needing to attach multiple .catch() methods.


🌟 Async/Await Code Example -

```js

async function processOrder(cart) {
  try {
    await createOrder(cart);
    await proceedToPayment();
    await showOrderSummary();
    await sendConfirmationEmail();
    await updateWallet();
    console.log("🎉 Order process completed!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

processOrder(["shoes", "pants", "kurta"]);

```

By using Promises and Async/Await, we address the major issues with callback hell and make asynchronous code more readable, maintainable, and error-resistant.

Don’t worry if you find it challenging to understand code written with Promises and async/await right now. We will take a deep dive into each of these concepts in the next chapter.

Up to this point, we've gained a good understanding of the concept of callback hell. 

Now, let's move on to discussing Inversion of Control. It’s crucial to grasp this concept to feel more comfortable with Promises.



# Inversion of Control 

**What is Inversion of Control (IoC)?**

-> Inversion of Control (IoC) is a programming principle where the control of executing a function is handed over to another function. In the context of JavaScript, this typically happens when using callbacks.

-> When we pass a callback function to another function, we are essentially putting our trust in the parent function to execute the callback correctly. We lose control over when and how many times that callback will be executed. This situation can result in issues like unexpected behavior, difficult-to-debug code & even callback hell.

**Easy Analogy for Callback Trust Issues**

Imagine you lend your car to a friend. You trust them to:

  - drive safely
  - return it on time
  - bring it back in good condition
  - But once they drive away, you have no control.
  - You can only hope they do the right thing.

This is exactly like callbacks:

When you pass a callback to another function,you trust that it will:

  - be called
  - be called at the right time
  - be called with the right data
  - not be skipped or misused
  - But you lose control over how and when it gets executed.

**Inversion of Control Problem**

When using callbacks, several issues may arise, such as:

-> Callback Not Called: The callback might not be invoked at all.
-> Callback Called Multiple Times: The callback may be executed more than once.
-> Wrong Timing: The callback may be called too early or too late.
-> Argument Tampering: The callback might receive modified or unexpected arguments.

**Example 1: Callback Not Called**

Problem Explanation: In this example, the callback may never be called if an error occurs. Since there is a return statement inside the error handling block, the callback is completely skipped.

Step-by-Step Problem Breakdown:

-> The fetchData function tries to simulate data fetching with a random error.
-> If an error occurs, the return statement gets executed, completely skipping the callback.
-> As a result, the callback function does not get a chance to be executed, leaving the operation incomplete.

  ```js 
  
  function fetchData(callback) {
    console.log("Fetching data...");

    setTimeout(() => {
      const error = Math.random() > 0.7; // simulating random error
      if (error) {
        console.log("Something went wrong!");
        return; // Problem: Callback not called at all
      }

      callback("Data fetched successfully!");
    }, 1000);
  }

function handleData(response) {
  console.log("Response:", response);
}

fetchData(handleData);

```


**Example 2: Callback Called Multiple Times**

Problem Explanation: Here, the callback function is called more than once, which can lead to unpredictable results. This occurs because there is no check to ensure that the callback is called only once.

Step-by-Step Problem Breakdown:

-> The fetchData function calls the callback twice intentionally.
-> Since there is no check to prevent multiple invocations, both calls are executed.
-> This results in unexpected outputs and potential issues in the application.

```js 

function fetchData(callback) {
  console.log("Fetching data...");

  setTimeout(() => {
    callback("Data fetched!");
    callback("Unexpected second call!"); // Problem: Called multiple times
  }, 1000);
}

fetchData((data) => console.log(data));

```

**Example 3: Wrong Timing**

Problem Explanation: In this example, the callback may execute too early or too late because the delay is unpredictable. 
This makes it challenging to control the timing of the callback execution.

Step-by-Step Problem Breakdown:

-> The delayedGreeting function sets a random delay before executing the callback.
-> This randomness makes it hard to predict when the callback will run.
-> The timing inconsistency could lead to unexpected behavior when dependent on timely responses.

```js 

  function delayedGreeting(callback) {
    setTimeout(() => {
      callback("Hello!");
    }, Math.random() * 3000); // Problem: Unpredictable timing
  }

  function greet(message) {
    console.log(message);
  }

  delayedGreeting(greet);

```

**Example 4: Argument Tampering**

Problem Explanation: 

When a callback receives an object, it doesn't get a copy - it gets the same object.
So if the original object is changed after the callback, the callback still 'sees' the updated data.
This causes unexpected results, because you think you're logging the 'old' data…
but JavaScript shows the modified data instead.

Step-by-Step Problem Breakdown:

-> The processData function creates an object and immediately calls the callback with it.
-> The callback logs the object data correctly.
-> After the callback execution, the original object is modified.

Since objects are passed by reference, this modification affects the logged data unexpectedly.

```js

function processData(callback) {
  const data = { id: 1, value: "Initial" };
  callback(data);
  data.value = "Tampered"; // Problem: Modifying after callback
}

processData((data) => console.log("Received:", data));

```
The output of the following code snippet processData((data) => console.log("Received:", data)); 
will be: Received: { id: 1, value: "Tampered" }

**But how can we get the OLD data inside callback?**

You must send a copy, not the original object.
Option 1 — Shallow Copy
callback({ ...data });

```js

function processData(callback) {
  const data = { id: 1, value: "Initial" };
  callback({ ...data });     // Send a copy
  data.value = "Tampered";
}

processData((data) => console.log("Received:", data));


```
o/p -

Received: { id: 1, value: "Initial" }

Note -

When you pass a primitive to a function → a copy is made.
When you pass an object to a function → JavaScript passes a reference (a pointer to the same object), not a copy.

**Why This Output Occurs**

-> The processData function creates an object with id: 1 and value: "Initial".
-> The callback is immediately invoked with the data object.
-> The callback logs the object, but since objects are passed by reference in JavaScript, any change to the object after the callback also reflects in the logged output.
-> After the callback is executed, the value property of the object is changed to "Tampered".
-> When the console.log statement inside the callback runs, it logs the updated value because the object reference is still pointing to the same object in memory.


# Fixing Inversion of Control with Promises

Promises fix all the major problems caused by callbacks because you no longer give control to someone else.
Instead, you hold the control, and the async function just returns a promise.

**How Promises Solve the Problems?**

-> Callback Not Called: 
Problem: In callbacks, someone may forget to call the success or error callback.
Fix: A promise will always either resolve or reject — it cannot be left hanging silently.
You always get a response.

-> Callback Called Multiple Times: The promise can be resolved or rejected only once.

-> Wrong Timing:
Problem: A callback might be called too early or too late.
Fix: Promise chaining (.then()) guarantees the correct order.
.then() runs after resolve.
.catch() runs after reject.
The chain runs in a predictable sequence
No more timing surprises.

-> Argument Tampering: Promises encapsulate data, preventing external tampering.


**Problem 1: Callback Not Called**

How Promises Fix It ?

Promises ensure that either resolve() or reject() is called, so the caller always gets a response (either success or failure).

```js

  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = Math.random() > 0.7;

        if (error) {
          reject("Something went wrong!"); // Rejecting the promise on error
          return;
        }

        resolve("Data fetched successfully!"); // Resolving the promise
      }, 1000);
    });
  }

  fetchData()
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
  
```

Why It Works:
The promise guarantees that either resolve() or reject() will be executed, unlike callbacks that might not be called.

**Problem 2: Callback Called Multiple Times**

How Promises Fix It: Promises can be resolved or rejected only once, preventing multiple callbacks.

```js

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched!");
      resolve("Unexpected second call!"); // This call is ignored.
    }, 1000);
  });
}

fetchData().then((data) => console.log(data));

```
Why It Works:
Once a promise is resolved or rejected, further calls to resolve() or reject() are ignored, ensuring that the callback is executed only once.

**Problem 3: Wrong Timing**

How Promises Fix It: Promises allow better control over the timing of operations by chaining .then() or using async/await, ensuring proper execution order.

```js

  function delayedGreeting() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello!");
      }, 2000); // Fixed delay, ensuring consistent timing
    });
  }

  async function greet() {
    const message = await delayedGreeting(); // Executes only after the promise is resolved
    console.log(message); 
  }

  greet();

```
Why It Works: The promise ensures that the callback execution waits for the asynchronous operation(setTimeOut) to complete, maintaining consistent timing.


**Problem 4: Argument Tampering**

How Promises Fix It:
Promises allow 'controlled data flow and encapsulation', preventing unintentional modifications.
To avoid this issue, we can use Promises along with a shallow copy of the original object. 
The best way to do this is to use the spread operator ({ ...data }) or Object.assign() to create a new object. 
This way, the original data remains untouched.

```js

function processData() {
  const originalData = { id: 1, value: "Initial" };  // Original object
  return new Promise((resolve) => {
    resolve({ ...originalData });   // Creating a shallow copy to prevent tampering
  }).then((data) => {
    console.log("Received:", data);  // Logs: { id: 1, value: "Initial" }
    data.value = "Modified";         // Modifying the received data
    console.log("After modification:", data);  // Logs: { id: 1, value: "Modified" }

    // Printing the original object to see if it is affected.
    console.log("Original object after modification:", originalData);  // Logs: { id: 1, value: "Initial" }
  });
}

processData();

```

🚀 How This Fix Works ?

-> The spread operator ({ ...data }) creates a new object with the same properties as the original.This ensures that the new object and the original object do not share the same reference.

-> The resolve() method sends the shallow copy to the .then() method.Any modifications made to the data inside .then() do not affect the original object.


# Fixing Inversion of Control with Async/Await 

**🔥 Problem 1: Callback Not Called (Using Async/Await)**

Why Use Async/Await:
-> Async/await syntax makes it easier to handle asynchronous operations & ensures that the code execution 'pauses' until the promise is resolved or rejected.

```js

async function fetchData() {
  try {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = Math.random() > 0.7;

        if (error) {
          reject("Something went wrong!"); // Rejecting the promise on error
          return;
        }

        resolve("Data fetched successfully!"); // Resolving the promise
      }, 1000);
    });

    console.log("Success:", data); // Executes if resolved
  } catch (error) {
    console.error("Error:", error); // Executes if rejected
  }
}

fetchData();

```

Why It Works:
The 'await' keyword ensures that the function execution pauses until the promise resolves or rejects, and the try...catch block handles any errors gracefully.

Additional notes - 

If resolve() Is Encountered -

The promise is marked as fulfilled.
The await keyword waits for the promise to be fulfilled and returns the resolved value.
The control moves to the next line after the await statement.
The code inside the try block continues executing, so:
console.log("Success:", data); gets executed.

If reject() Is Encountered -

The promise is marked as rejected.
The await keyword immediately throws an error and the control moves out of the try block and directly to the catch block.
The code inside the catch block executes: console.error("Error:", error); gets executed.

-> If resolve() is encountered, the code continues normally after the await.
-> If reject() is encountered, the code jumps directly to the catch block, skipping the rest of the try block.

**🔥 Problem 2: Callback Called Multiple Times (Using Async/Await)**

Why Use Async/Await: Async/await guarantees that once the promise is resolved or rejected, further attempts are ignored.


```js

async function fetchData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
      resolve("Unexpected second call!"); // This call is ignored
    }, 1000);
  });

  console.log(data); // Logs: Data fetched!
}

fetchData();

```
Why It Works: The promise can be resolved only once & async/await makes the syntax clean and readable.


**🔥 Problem 3: Wrong Timing (Using Async/Await)**

Why Use Async/Await: Async/await syntax makes it clear that the function waits for the asynchronous operation to complete before proceeding.

```js

function delayedGreeting() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello!");
    }, 2000); // Fixed delay, ensuring consistent timing.
  });
}

async function greet() {
  const message = await delayedGreeting();
  console.log(message); // Executes only after the promise is resolved.
}

greet();

```
Why it Works ?
Async/await makes sure that the greet() function pauses until the greeting message is available, maintaining predictable timing.


**🔥 Problem 4: Argument Tampering (Using Async/Await)**

Why Use Async/Await: Async/await helps maintain a structured flow & prevents unintended changes to the original object.

```js

function processData() {
  const originalData = { id: 1, value: "Initial" };  // Original object - { id: 1, value: "Initial" }
  return new Promise((resolve) => {
    resolve({
      copy: { ...originalData },    // Safe copy, Creating a shallow copy to prevent tampering.
      original: originalData        // Actual original reference.
    });   
  });
}

async function handleData() {
  const { copy, original } = await processData();

  console.log("Received (copy):", copy);  // { id: 1, value: "Initial" }

  // Modify the received copy
  copy.value = "Modified";
  console.log("After modification:", copy); // { id: 1, value: "Modified" }

  // Show originalData (untouched)
  console.log("Original inside handleData:", original); // { id: 1, value: "Initial" }
}

handleData();

```
Why It Works:
The spread operator in the promise ensures that the original object is not altered. 
The await keyword makes the promise handling smooth and make the code more readable.

**🚀 Why Use Async/Await**

Cleaner Syntax: No need for nested .then() calls, making the code more readable.

Error Handling: Errors can be caught using try...catch, which is more intuitive.

Predictable Flow: Code runs sequentially, making it easy to understand.

Avoiding Callback Hell: Eliminates deeply nested callbacks.


# Notes

-> Inversion of Control occurs when we hand over the control of function execution to another function, making the code prone to errors and harder to manage.

-> Promises & async/await help regain control by ensuring consistent sequential execution, reducing callback-related issues, and making asynchronous code more readable.

-> By using these modern techniques, we can eliminate callback hell and write more maintainable code.


<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=yEKtJGha3yM&list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX" target="_blank"><img src="https://img.youtube.com/vi/yEKtJGha3yM/0.jpg" width="750"
alt="callback Youtube Link"/></a>