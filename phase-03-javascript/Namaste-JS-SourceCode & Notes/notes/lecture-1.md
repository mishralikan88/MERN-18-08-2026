# Episode 1 : Execution Context

- Everything in JS happens inside the execution context. Imagine a sealed-off container inside which JS runs.

  ![Execution Context](../assets/execution-context.jpg "Execution Context")

- In the container the first component is **memory component** and the 2nd one is **code component**.

- Memory component has all the variables and functions in key value pairs. It is also called **Variable environment**.

- Code component is the place where code is executed one line at a time. It is also called the **Thread of Execution**.

- JS is a **synchronous**, **single-threaded** language. It will go to the next line once the current line has been finished executing.



# Single-Threaded Nature of JavaScript

1️⃣ JavaScript does one thing at a time

JS has only one call stack, so it can run only one task at a moment.
It cannot execute two pieces of code at the same time.

2️⃣ The call stack tracks function calls

When a function runs → it gets pushed onto the stack.
When it finishes → it gets popped off.

This is how JavaScript knows what to run next.

3️⃣ Long tasks freeze everything

If a function takes too long, it blocks the only call stack.
Since nothing else can run, the app may hang or become unresponsive.

# Synchronous Execution

JavaScript runs code line by line and it waits for each line to finish before moving to the next.

Example:

console.log("Task 1");
console.log("Task 2");
console.log("Task 3");

Output:

Task 1  
Task 2  
Task 3  

Because each line runs in order, JS executes them one after the other.

# Why It’s a Problem (The Synchronous Blocking Issue)

Imagine you have a time-consuming operation, like reading a large file or making a network request. If JavaScript handled it synchronously, the entire UI would freeze until the operation completes.

Because of this synchronous nature we face below problems -

The UI won’t update
Buttons won’t work
Nothing reacts
App feels stuck

# Asynchronous Mechanism to Handle Blocking

To solve this problem, JavaScript uses asynchronous programming. Instead of waiting for the operation to complete, it uses callbacks, promises, and async/await to handle long-running tasks without blocking the main thread.

# How Asynchronous Works?

When an asynchronous function (like setTimeout or a network call) is encountered, JavaScript:

-> Registers the function and sends it to a Web API (like setTimeout, fetch, etc.).
-> Continues executing the next line of code without waiting.

When the operation completes, the callback function moves to the Message Queue.
The Event Loop checks if the call stack is empty and, if so, moves the callback function from the queue to the stack for execution.

Example with setTimeout:

console.log("Start");

setTimeout(() => {
    console.log("Asynchronous Task");
}, 2000);

console.log("End");

Output:

Start  
End  
Asynchronous Task 

# Why This Happens?

-> console.log("Start") is executed and logged immediately.

-> setTimeout is called, and the function is registered in the Web API environment with a timer.

-> console.log("End") is executed and logged immediately because setTimeout doesn’t block the stack.

-> After 2 seconds, the callback function (console.log("Asynchronous Task")) is moved to the Message Queue.

-> The Event Loop moves the callback to the stack once it’s empty, and the function is executed.
 

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=ZvbzSrg0afE&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP" target="_blank"><img src="https://img.youtube.com/vi/ZvbzSrg0afE/0.jpg" width="750"
alt="Execution Context Youtube Link"/></a>
