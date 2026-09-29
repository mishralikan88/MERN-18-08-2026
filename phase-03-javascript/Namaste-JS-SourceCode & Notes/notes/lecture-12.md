# Episode 12: Famous Interview Questions ft. Closures

# Q1: What is a Closure in JavaScript?

Ans: A closure is formed when a function, along with its reference to the outer environment, is bundled together. In other words, a closure is a combination of a function and its lexical scope.

Example:

```js

function outer() {
    var a = 10; // Local scope within the function
    function inner() {
        console.log(a);
    } // 'inner' forms a closure with 'outer'
    return inner;
}
outer()(); // 10
// The first '()' returns the inner function, and the second '()' invokes it.


```

# Q2: Does the code below still form a closure?

```js

function outer() {
    function inner() {
        console.log(a);
    }
    var a = 10;
    return inner;
}
outer()(); // 10

```
Ans: Yes, the inner function still forms a closure with its outer environment. The sequence of variable declaration does not matter in this case.

# Q3: Will changing var to let make any difference?

```js
function outer() {
    let a = 10; // Local scope within the function
    function inner() {
        console.log(a);
    }
    return inner;
}
outer()(); // 10
```
Ans: No, it will still behave the same way. The difference between var and let does not affect closure formation here.

# Q4: Will the inner function have access to the outer function's argument?

```js

function outer(str) {
    let a = 10;
    function inner() {
        console.log(a, str);
    }
    return inner;
}
outer("Hello There")(); // 10 "Hello There"

```
Ans: Yes, the inner function forms a closure and has access to both the local variable a and the argument str from the outer function.

# Q5: In the code below, will the inner function form a closure with outest?

```js
function outest() {
    var c = 20;
    function outer(str) {
        let a = 10;
        function inner() {
            console.log(a, c, str);
        }
        return inner;
    }
    return outer;
}
outest()("Hello There")(); // 10 20 "Hello There"
```
Ans: Yes, the inner function will have access to all its outer environments, including variables from outest, outer, and any arguments passed.

# Q6: What is the output of the code below, and what is the explanation?

```js

function outest() {
    var c = 20;
    function outer(str) {
        let a = 10;
        function inner() {
            console.log(a, c, str);
        }
        return inner;
    }
    return outer;
}
let a = 100;
outest()("Hello There")(); // 10 20 "Hello There"

```
Ans: The output will still be 10 20 "Hello There". The inner function resolves variables by looking up the scope chain, prioritizing the closest scope. Since a is found within outer, it does not move up the chain to access the global a. If no local a existed, it would then search in outer scopes, ultimately finding the global a or throwing a ReferenceError.


# Q7: What are the advantages of using closures?

-> Module Design Pattern: Helps create private variables and methods.
-> Currying: Allows partial function application.
-> Memoization: Stores the result of expensive function calls.
-> Data Hiding and Encapsulation: Restricts access to variables.
-> Managing Async Operations: Useful with setTimeout and callbacks.

# Q8: How do closures facilitate data hiding and encapsulation?

**Without Closures**

```js

  var count = 0;
  function increment() {
      count++;
  }

```

// Anyone can access & modify the `count` variable from the global scope.No data hiding here.

**With Closures (Achieving Data Hiding)**

```js

  function counter() {
      var count = 0;
      return function increment() {
          count++;
          console.log(count);
      };
  }
  var counter1 = counter();
  counter1(); // 1
  counter1(); // 2

  var counter2 = counter();
  counter2(); // 1

  // Each counter instance has its own isolated state.

```

-> The statement "Each counter instance has its own isolated state" means that every time you call the counter() function, it creates a new, independent instance of the count variable. This is because the count variable is defined inside the counter() function and is therefore part of its local scope.

-> When you call counter() and store the result in counter1, it creates a new closure that contains its own copy of the count variable.

-> When you call counter() again and store the result in counter2, it creates another new closure with a separate count variable.

-> So, even though both counter1 and counter2 are created from the same function definition, they do not share the same state. They have independent copies of the count variable.

-> That's why when you call:
counter1(); twice, it prints 1 and 2, because count in counter1 is incremented.
counter2(); prints 1, because it starts from a fresh count since it is a separate instance.

-> In short, each invocation of counter() creates a new closure with its own independent state, and they do not interfere with each other.


**Using Constructor Functions (More Scalable)** - (this + new + no constructor)

```js 
  function Counter() {

    var count = 0; // Private variable

    // Public method to increment count
    this.increment = function() {
        count++; // Accesses and updates the private variable
        console.log(count);
    };

    // Public method to decrement count
    this.decrement = function() {
        count--; // Accesses and updates the private variable
        console.log(count);
    };
}

var counter1 = new Counter();
counter1.increment(); // Output: 1
counter1.increment(); // Output: 2
counter1.decrement(); // Output: 1

```

1. Encapsulation: Encapsulation means keeping certain data private and exposing only necessary parts through controlled access.

In this example -
The variable count is defined inside the Counter function, making it private.
The methods increment and decrement are public and can access the count variable because they form a closure over it.
Since count is not returned directly or exposed, it cannot be accessed or modified from outside the Counter function.

🔒 Why is this beneficial?

Ans - No one can directly change the count value from outside the object.

console.log(counter1.count); // undefined

This ensures that count is always managed through the provided methods (increment and decrement), maintaining data integrity.



2. Scalability: This approach is more scalable because

> Modularity:

    - The constructor function 'Counter' keeps all the related logic within the same function, promoting a modular design.
    - We can easily add more methods to the Counter object without affecting the existing code.
    - This makes the code easy to extend and maintain as new requirements come up.

> Flexibility:

    - You can easily extend the functionality without changing the underlying implementation.

    For example:

    this.reset = function() {
        count = 0;
        console.log("Counter reset to:", count);
    };

> Multiple Instances:

     - You can create multiple instances of the counter without any conflicts because each instance has its own isolated state.

    var counter1 = new Counter();
    var counter2 = new Counter();
    counter1.increment(); // 1
    counter2.increment(); // 1
    counter1.increment(); // 2

    // Both instances operate independently because each call to Counter() creates a new closure with its own count.

> Data Hiding:

    - As the count variable is private, it is shielded from accidental changes or external tampering.
    - The only way to change count is via the methods provided (increment and decrement), ensuring controlled access.

    Example: Adding New Methods-

    ```js

    function Counter() {
      var count = 0;

      this.increment = function() {
          count++;
          console.log(count);
      };

      this.decrement = function() {
          count--;
          console.log(count);
      };

      // Adding a new method to reset the counter
      this.reset = function() {
          count = 0;
          console.log("Counter reset to:", count);
      };

      // Adding a method to get the current count
      this.getCount = function() {
          console.log("Current count:", count);
      };
    }

    var counter1 = new Counter();
    counter1.increment(); // 1
    counter1.increment(); // 2
    counter1.getCount();  // Current count: 2
    counter1.reset();     // Counter reset to: 0

    ```


3. Why Not Use a Global Variable?

If we had used a global variable instead of a closure, the variable would be:
    - Accessible and modifiable from anywhere, making it prone to bugs and unintended changes.
    - Shared between instances, causing unexpected behavior.

    ```js 

    var count = 0;
    function increment() {
        count++;
        console.log(count);
    }

    increment(); // 1
    increment(); // 2
    count = 100; // Oops, unintended change
    increment(); // 101

    // In contrast, the closure-based design prevents such problems.

```

4. Why Not Use let or const Directly Inside Methods?

If you declare count using let or const directly inside the increment or decrement methods:

    - Each time the method is called, a new variable will be created.
    - The variable will not persist between calls, defeating the purpose of maintaining a state.


5. Why Use a Constructor Function Instead of a Plain Function?

    - Using a constructor function (like Counter) instead of a plain function, makes the code more scalable and flexible. Here’s why:

    - Multiple Instances:With a constructor, you can create many independent counters. Each counter has its own separate count value.
      
      For example:

      var counter1 = new Counter();
      var counter2 = new Counter();

      counter1.increment(); // 1
      counter2.increment(); // 1
      
      // Both counters work independently without interfering with each other.

    - Methods Are Part of the Object: Methods like increment and decrement are part of the counter object.This means you can call them directly on each instance, like counter1.increment().

    - Easy to Add More Methods: If you want to add new methods (like reset or getCount), you can easily do that.Just add them inside the constructor function, and every instance will have those methods.

    - Automatic Setup with new: When you use new Counter(), it automatically sets up the 'this' keyword to refer to the 'new object'.You don't have to manually bind methods.

# Q9: What are the disadvantages of closures?

**Memory Consumption:**

Closures hold references to outer variables, preventing them from being garbage collected. 

This can lead to increased memory usage and potential memory leaks.

Example: Memory Leak with Closures

```js

function a() {
    var x = 0;
    return function b() {
        console.log(x);
    };
}

var y = a(); // 'y' holds a reference to 'b', which holds a reference to 'x'
y();

```

Garbage Collection: Ideally, x should be garbage collected after a() finishes execution, but since b() holds a reference to x, it remains in memory. JavaScript engines like V8 use advanced garbage collection algorithms, like the Mark-and-Sweep algorithm, to handle such cases and clean up unused variables.


# Q10: What is the Mark and Sweep Algorithm?

Ans:The Mark and Sweep Algorithm is a garbage collection technique used by JavaScript engines (like V8 in Chrome) to automatically free up memory that is no longer in use.

**Explanation:**

Mark Phase: The algorithm goes through all the variables and objects that are still being used (reachable or accessible) and marks them as active.
Sweep Phase: It then sweeps away (deletes) all the objects that are not marked (meaning they are no longer reachable).

Let’s understand the Mark-and-Sweep algorithm with a closure example in a simple way!

**step 1 - Memory allocation** 

```js

function outer() {
    let a = 10; // Local variable
    return function inner() {
        console.log(a); // Accesses 'a' from outer
    };
}

let closureFunc = outer(); // Creates a closure
closureFunc(); // Output: 10

```
🧩 1. Global Phase (before running code)

JS creates the Global Execution Context (GEC).
Global Memory:
outer → function
closureFunc → undefined

🧩 2. Line: let closureFunc = outer();
outer() is called → JS creates a Function Execution Context (FEC) for outer.
Outer FEC – Memory:
a = 10
inner = function() { console.log(a); }
inner is created inside outer, so it has a link to outer’s scope (where a lives).

🧩 3. outer returns inner
outer() does not execute inner().
It returns the function inner.
So after outer() finishes:
Global Memory becomes:
outer → function
closureFunc → inner (with closure attached)
The Outer FEC is removed from the call stack.

🧩 4. What JS keeps (Closure)
Normally, when a function ends:
Its execution context is destroyed
Its local variables (a) are eligible for garbage collection
But here:
inner() still needs a (console.log(a))
So JS does NOT delete a.
Instead, it stores a in a hidden closure environment attached to inner:
closureFunc.[[Closure]] = { a: 10 }
Think of closureFunc (inner) carrying a backpack:
Backpack = closure
Inside: { a: 10 }

🧩 5. Line: closureFunc();
Now we call:
closureFunc();
This means:
JS creates a Function Execution Context for inner().
Inner FEC – Memory:
No local a
Code: console.log(a);
Variable lookup:
Local scope? → no a
Closure scope (backpack)? → a = 10 → ✅ found
So:
console.log(a); // 10
Even though outer() finished earlier,
a is still available via the closure.

🧩 6. Execution Context Summary
When outer() ran:
FEC had: a = 10, inner = function
After outer() returned:
Outer FEC removed
Closure for inner kept: { a: 10 }
When closureFunc() (inner) runs:
It reads a from its closure, not from global

⭐ One-line Summary - outer()'s execution context is destroyed after it returns, but its variable a is kept alive in a closure attached to inner(), so closureFunc() can still log 10.”

**🔥step 2- Mark-and-Sweep in Action**

-> Mark Phase ✅- The algorithm scans through all objects starting from the global scope and marks all reachable (accessible) objects.
Since closureFunc still holds a reference to the inner function, and inner keeps a reference to a, both are marked as "reachable" and are not eligible for garbage collection.

-> Sweep Phase ❌- The algorithm then looks for unmarked (unreachable) objects and deletes them to free memory.
Since both inner and a are still reachable, no memory is freed in this case.


**step 3 -Breaking the Reference**

If we break the reference, memory can be freed.
closureFunc = null; // Removing reference to inner function
Now, the inner function and variable 'a' are no longer reachable.

-> ✅ Mark Phase Again: The algorithm now finds that closureFunc is null, so the inner function and a are no longer reachable.

-> ❌ Sweep Phase: Since both are unmarked, the engine frees up the memory occupied by them.


# Q11: Why Closures Can Cause Memory Leaks??

If closures hold references to variables that are no longer needed, those variables will stay in memory because the garbage collector cannot free them.

To avoid this:

-> Manually remove references when they are no longer needed.
-> Use closures wisely and avoid keeping unnecessary data inside them.
-> Closures keep variables alive even after the outer function has returned.
-> If we do not break references, the Mark-and-Sweep algorithm won't collect those variables, causing memory leaks.

Setting the closure to null allows the garbage collector to free up memory.


Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=t1nFAMws5FI&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/t1nFAMws5FI/0.jpg" width="750"
alt="Closures Interview Question in JS Youtube Link"/></a>