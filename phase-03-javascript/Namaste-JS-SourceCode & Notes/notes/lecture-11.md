# Episode 11 : setTimeout + Closures Interview Question

**Time, tide, and JavaScript wait for none.**


```js
    function x() {
    var i = 1;
    setTimeout(function() {
        console.log(i);
    }, 3000);
    console.log("Namaste Javascript");
     }
    x();

    // Output:
    // Namaste Javascript
    // 1 // after waiting 3 seconds

```

We might expect JavaScript to wait for 3 seconds, print 1, and then proceed to print the string. However, JavaScript prints the string immediately, waits for 3 seconds, and then prints 1.

Here’s why this happens:

* The function inside setTimeout forms a closure, meaning it remembers the reference to the variable i. Wherever the function goes, it carries this reference along with it.

* The setTimeout function takes this callback and attaches a timer of 3000 milliseconds (3 seconds), storing it for later execution. Meanwhile, JavaScript doesn’t wait and proceeds to the next line, printing the string "Namaste Javascript".

* Once the timer expires (after 3000 milliseconds), JavaScript places the callback function into the call stack and executes it, printing 1.

In summary, JavaScript’s asynchronous behavior allows the code to continue executing without waiting for the setTimeout timer to complete.

 
# Q1: Print the numbers 1 to 5 such that each number is printed after a delay equal to its value in seconds (e.g. 1 after 1 second, 2 after 2 seconds, and so on).
  
```js

    function x() {
    for(var i = 1; i<=5; i++){
        setTimeout(function() {
        console.log(i);
        }, i*1000);
        }
        console.log("Namaste Javascript");
    }
    x();

    // Output:
    // Namaste Javascript
    // 6
    // 6
    // 6
    // 6
    // 6

```
Code Explanation -

⭐ STEP 1 — GEC will be created which Stores function x in memory during memory creation phase .

Call stack:
| GEC |

⭐ STEP 2 — during code execution phase of GEC , x() is called

Call stack:

| x() |
| GEC |


JS now starts executing the body of x.

⭐ STEP 3 — The for loop begins

VERY IMPORTANT:

👉 The loop runs synchronously
👉 It runs FAST (microseconds)
👉 No timer runs during this time
👉 No callback executes during the loop

We analyze each iteration.

⭐ Iteration 1 → i = 1

JS hits: setTimeout(function() { console.log(i); }, 1000);


What happens?

✔ Web API receives the callback
✔ Web API starts a 1-second timer
✔ JS IMMEDIATELY continues the loop

(No waiting)

⭐ Iteration 2 → i = 2

JS hits: setTimeout(function() { console.log(i); }, 2000);

✔ Web API starts a 2-second timer
✔ Loop continues immediately


⭐ Iteration 3 → i = 3

Web API starts a 3-second timer.

⭐ Iteration 4 → i = 4

Web API starts a 4-second timer.

⭐ Iteration 5 → i = 5

Web API starts a 5-second timer.

⭐ AFTER LOOP ENDS → i becomes 6

Loop condition fails when i = 6.

Since var is function-scoped (i is in the local scope of function x.Because var i lives inside the function, NOT in global scope.)
The for loop does NOT create a new scope for var.This same i is overwritten in every iteration.

👉 There is only ONE shared i inside x()
👉 That same i becomes 6 at the end of the loop.



⭐ STEP 4 — Print "Namaste Javascript"

After loop ends:

console.log("Namaste Javascript");


This is normal synchronous code.

So it prints immediately:

Namaste Javascript


After this, function x finishes and returns.
Call stack becomes empty.

⭐ STEP 5 — Timers complete in Web API Environment .

When each Web API timer finishes, it sends its callback to the Callback Queue, where it waits until the Event Loop moves it to the Call Stack for execution.

Here’s the timing:

Time	Timer	What happens
1s	Timer1	callback → Callback Queue
2s	Timer2	callback → Callback Queue
3s	Timer3	callback → Callback Queue
4s	Timer4	callback → Callback Queue
5s	Timer5	callback → Callback Queue

Callbacks wait in the Callback Queue.

⭐ STEP 6 — Event Loop processes callbacks

Now the event loop sees:
Call stack empty
Callback Queue has a callback
So it pushes ONE callback at a time to the Call Stack
Each callback is: function() { console.log(i); }


Now important point:

❗ The callback uses the shared variable i, NOT its old value.
❗ And right now i = 6.

So each callback prints:

6

⭐ FINAL OUTPUT

Immediate (synchronous):

Namaste Javascript


After 1 second:

6


After 2 seconds:

6


After 3 seconds:

6


After 4 seconds:

6


After 5 seconds:

6


✔ Timers use the value of i DURING the loop to schedule delays
❌ But callbacks use the SAME single i, which becomes 6 after the loop
✔ So all callbacks print 6.

But we wanted 1 to be printed after 1 sec and 2 to be printed after 2 sec and so on ....


We can fix this - 

# Using let**

Replacing var with let in the for loop solves the issue.

✅ Why Does let Work?

let has block scope. This means a new i is created for every iteration of the loop.
Hence, each iteration has its own unique i value when the callback function is called.

 🔧 Code with let:

function x() {
    for (let i = 1; i <= 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
    console.log("Namaste Javascript");
}
x();

📝 Output:

Namaste Javascript
1
2
3
4
5

Code Explanation -

⭐ 1️⃣ JavaScript CREATES A NEW "Mini Scope" for each iteration

When you write: for (let i = 1; i <= 5; i++) { ... }

JavaScript actually does this internally:

Iteration 1 → creates scope #1 with i = 1  
Iteration 2 → creates scope #2 with i = 2  
Iteration 3 → creates scope #3 with i = 3  
Iteration 4 → creates scope #4 with i = 4  
Iteration 5 → creates scope #5 with i = 5


So there is NOT one i. There are 5 different i's, each stored in its own scope.

⭐ 2️⃣ Each callback closes over its OWN scope

Iteration 1:

Scope#1:
    i = 1
Callback#1 gets linked to Scope#1


Iteration 2:

Scope#2:
    i = 2
Callback#2 gets linked to Scope#2


Iteration 3:

Scope#3:
    i = 3
Callback#3 gets linked to Scope#3


…and so on.

This means:

👉 Callback#1 can ONLY see i = 1
👉 Callback#2 can ONLY see i = 2
👉 Callback#3 can ONLY see i = 3
👉 They cannot see each other's i
👉 They cannot override each other's i



⭐ 3️⃣ When the first callback runs (after 1 second)

JS executes: console.log(i)

But which i?

Not the global one.
Not a shared one.
It uses the i from Scope #1.
That’s the block it belongs to.
So output = 1

⭐ 4️⃣ Why can't i become 2 or 3 or 4?

Because:

❗ The callback is not reading from a single shared i
✔ It is reading from the i inside its own lexical environment, the environment created during that iteration.


# var + IIFE - 

If we want to use var, we can create a new copy of i by using an immediately invoked function expression (IIFE) or an inner function.


```js

function x() {
    for (var i = 1; i <= 5; i++) {

        // IIFE syntax - (function defination)(args..)

        (function(j) {
            setTimeout(function() {
                console.log(j);
            }, j * 1000);
        })(i);

    }
    console.log("Namaste Javascript");
}
x();

```

Developer-Friendly Explanation (with your line added)

✔ 1. In each iteration, the IIFE runs

When the loop runs: 

(function (j) { ... })(i);

this IIFE is executed immediately on every iteration.

So the loop behaves like:

Iteration 1 → run IIFE(j = 1)
Iteration 2 → run IIFE(j = 2)
Iteration 3 → run IIFE(j = 3)
Iteration 4 → run IIFE(j = 4)
Iteration 5 → run IIFE(j = 5)

✔ 2. Each IIFE call creates a New local scope.

Every time the IIFE runs, JavaScript creates a brand-new function scope.

Inside that new scope, a fresh variable j is created:

Scope 1: j = 1
Scope 2: j = 2
Scope 3: j = 3
Scope 4: j = 4
Scope 5: j = 5


✔ 3. The setTimeout callback closes over the IIFE's j

Inside each IIFE:

setTimeout(function () {
  console.log(j);
}, j * 1000);


Because this callback is defined inside the IIFE.
Its parent scope becomes the IIFE's local scope, not the loop scope.(The callback gets j from the IIFE, NOT i from the loop)

So callbacks remember:

Callback #1 → j = 1

Callback #2 → j = 2

Callback #3 → j = 3

Callback #4 → j = 4

Callback #5 → j = 5

These values never change.

✔ 4. i keeps changing, but j does NOT

var i goes: 1 → 2 → 3 → 4 → 5 → 6

But we no longer use i inside setTimeout

We use j, which is fixed for each IIFE call.

So final output:

1
2
3
4
5

⭐ One liner - In each iteration, the IIFE runs and creates a new scope with its own j, and the callback remembers that j instead of the changing i.


**📝 var + helper inner function.(Closure)**

```js

function x() {


  function makeTimer(num) {  // Inner helper function  
    setTimeout(function () {
      console.log(num);
    }, num * 1000);
  }

  for (var i = 1; i <= 5; i++) {
    makeTimer(i); // call the inner helper function and pass current i as num to inner function.
  }
  console.log("Namaste Javascript");
}

x();

``` 
✅ Why this Works ? 

✔ A new function is called inside each loop iteration - When makeTimer(i) runs, JavaScript creates a new function scope.

✔ Each function scope gets its own copy of i as num

So:

1st call → num = 1  
2nd call → num = 2  
3rd call → num = 3  
4th call → num = 4  
5th call → num = 5  

✔ var i keeps changing, but we STOP using it. We use num, not i.

✔ num is "frozen or fixed" in each scope.It does not change later.

✔ Each **setTimeout callback** closes over its own num.

So:

callback #1 → num = 1  
callback #2 → num = 2  
callback #3 → num = 3  
callback #4 → num = 4  
callback #5 → num = 5  

⭐ Output becomes -

1
2
3
4
5

⭐ 1. var case - var uses one i, so all callbacks print the final value 6.
⭐ 2. let case - let makes a new i for every loop, so callbacks print 1–5.
⭐ 3. var + IIFE - IIFE makes a new j each time, so callbacks print 1–5.
⭐ 4. var + inner function - Inner function gets a fresh copy (num) each time, so callbacks print 1–5.


# Q2 🚀 Where is setTimeout Registered?

-> setTimeout itself is not executed immediately.
-> It is registered in the browser's Web API environment, which sets up a timer.
-> After the timer expires, the callback function is moved to the Message Queue.
-> The Event Loop moves it to the Call Stack when the stack is empty.


# Q3 What are the use cases of the following concepts, and how are they practically applied in JavaScript?

**Module Design Pattern**
**Currying**
**Memoization**
**Data Hiding & Encapsulation**
**setTimeout**


**🚀 1. Module Design Pattern **

Use Case:

-> To organize code into small, manageable, and reusable parts.
-> To encapsulate implementation details and expose only necessary methods (like an API).
-> Helps in preventing global namespace pollution by creating private variables and functions.(IIFE). Internals of node JS.

Example:

```js

const CounterModule = (function() {
    let count = 0;  // private variable

    function increment() {
        count++;
        console.log(count);
    }

    function decrement() {
        count--;
        console.log(count);
    }

    return {
        increment,
        decrement
    };
})();

CounterModule.increment(); // 1
CounterModule.decrement(); // 0

```

**🌀 2. Currying**

Use Case: To transform a function with multiple arguments into a series of functions that take one argument at a time.

Example:

function add(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(add(1)(2)(3)); // 6


**⚡ 3. Memoization**

Use Case:

-> Boosts performance by caching the results of expensive function calls.
-> Avoids repeating the same heavy computation when the same inputs appear again
-> Very effective in dynamic programming, recursion (e.g., Fibonacci, factorial), and large computations.

Example:

```js 

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key]; // Return cached result
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const factorial = memoize((n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
});

console.log(factorial(5)); // 120
console.log(factorial(5)); // 120 (from cache)

```

**🔒 4. Data Hiding & Encapsulation**

Use Case:

To restrict direct access to the internal state of an object.
Improves security and data integrity.
Allows controlled access through getter and setter methods.

Example:

```js

function Person(name) {
    let _name = name; // Private variable

    this.getName = function() {
        return _name;
    };

    this.setName = function(newName) {
        _name = newName;
    };
}

const person = new Person("John");
console.log(person._name) // ❌ undefined → _name is private and cannot be accessed directly . undefined because '_name' is not a property of the person object.It only exists inside the Person function as a private variable.Trying to access a property on an object that does not exist always returns undefined. Refer Harshit Code repo to understand constructor functions and oop.
console.log(person.getName()); // John
person.setName("Doe");
console.log(person.getName()); // Doe

```



**⏳ 5. setTimeout**

Use Case:

-> To delay code execution by a specified time.
-> Useful for asynchronous operations, like API calls, animations, or timed events.
-> Schedules code to run later without blocking the main thread.

Example:

```js

console.log("Start");
setTimeout(() => {
    console.log("This runs after 2 seconds");
}, 2000);
console.log("End");

```


<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=eBTBG4nda2A&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/eBTBG4nda2A/0.jpg" width="750"
alt="setTimeout + Closures Interview Question in JS Youtube Link"/></a>

 

# Question - If Web API sends all the callbacks to the callback queue after their timer finishes and the call stack is busy for 10 minutes.Then when the call stack becomes empty will the callbacks still print at 1-second intervals?Or will they print all instantly one after another?

Answer -

❌ NO — You will NOT see 1-second gaps between prints.
✔ YES — All callbacks WILL print one after another immediately, with NO delay, even if the timers were originally set for 1s, 2s, 3s, 4s, 5s.
Why?

Because:

👉 Timer delay controls only WHEN the callback becomes READY

NOT when it executes.

👉 If the call stack is blocked for 10 minutes, ALL timers finish long before that.

So all callbacks will already be waiting inside the Callback Queue.

👉 Once the stack becomes free, the event loop pushes callbacks one by one instantly.
👉 There will be no delay between them, because the timer part is already done long ago.


```js
    function x() {
    var i = 1;
    setTimeout(function() {
        console.log(i);
    }, 3000);
    console.log("Namaste Javascript");
     }
    x();

    // Output:
    // Namaste Javascript
    // 1 // after waiting 3 seconds

```
# Question - If var i becomes 6 after the loop ends, then how does JavaScript still register the timers with delays of 1s, 2s, 3s, 4s, and 5s during the loop?

⭐ ANSWER

Because JavaScript uses the current value of i during each loop iteration ONLY to calculate the timer delay:

setTimeout(callback, i * 1000)

So during the loop:

When i = 1 → delay = 1000 ms

When i = 2 → delay = 2000 ms

When i = 3 → delay = 3000 ms

When i = 4 → delay = 4000 ms

When i = 5 → delay = 5000 ms

These delays are registered immediately.

However:

✔ The callback does NOT capture the value of i

✔ It captures the reference to variable i

✔ After the loop ends → i = 6

✔ Therefore every callback prints 6 when it eventually runs

So: Delay uses i's value at that moment

Callback uses i’s FINAL value


JavaScript reads the value of i during the loop to create different delays, but all callbacks share the same i, so when they run later, they all see i = 6.


# Question - When the call stack is busy running the for loop, does the Web API still do its job (start timers, count them, finish them)?"

⭐ ANSWER → YES. 100% YES.
✔ Web API works INDEPENDENTLY
✔ It does NOT wait for the call stack
✔ It keeps timers running in parallel
✔ It finishes timers even while the loop is running

The Web API does NOT care what the call stack is doing.