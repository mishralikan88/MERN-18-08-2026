# What is bind()?

bind() is a method that returns a new function. When this new function is invoked, it has its this value set to a specified object, and it can also have predefined arguments passed to it. These predefined arguments are fixed in advance, and when the function is called, they are used along with any additional arguments provided during the call.

Unlike call() and apply(), bind() doesn’t immediately invoke the function but returns a new function with a permanently bound this context.

```js

function greet(greeting, name) {
  console.log(greeting + ", " + name);
}

const sayHello = greet.bind(null, "Hello"); // Creating a new function `sayHello` where the 'this' value is set to null and "Hello" is a predefined argument.

sayHello("Alice"); // Output: "Hello, Alice"

```

# Syntax:

functionName.bind(thisArg, arg1, arg2, ...);

Where:

thisArg: The value to which this will be set in the new function.

arg1, arg2, ...: Arguments that will be prepended to the arguments passed when the new function is called.


# Key Differences between bind() vs call() vs apply():

bind() returns a new function that can be invoked later.

call() and apply() invoke the function immediately, but with call(), arguments are passed individually, whereas apply() takes an array of arguments.


# Analogy: bind() is Like Booking a Meeting for Later

Imagine you're booking a meeting with your team, but instead of having a direct meeting, you schedule it to occur in the future.

-> You decide who will be part of the meeting (this).

-> You decide what will happen in the meeting (the function and its parameters).

-> The meeting takes place when you call it later (the new function is executed later).

In code, it’s like binding an event or method for future execution with the specified context.


# Real-World Example

```js

let person = {
  name: "Likan",
  greet: function(greeting) {
    console.log(greeting + ", " + this.name);
  }
};

let greetLikan = person.greet.bind(person, "Hello"); // Binding greet() with 'this' set to 'person' and passing an argument

greetLikan(); // Output: Hello, Likan

```

Explanation: greetLikan is a function created by bind(). It has its this set to person, and it always greets with the word "Hello".


# Deep Dive Use Cases of bind()


**✅ Case 1: Pre-setting Arguments for Later Invocation**

```js

const multiply = function(a, b) {
    // this -> null (strict mode)
    // this -> window (non-strict mode)
    return a * b;
};

const multiplyBy2 = multiply.bind(null, 2); // this = null , a = 2 (a and this value is locked)

let returnedValue = multiplyBy2(5); // this = null , a = 2 , b = 5 (a and this value are locked)
console.log(returnedValue); // 10 

returnedValue = multiplyBy2(10); // this = null , a = 2 , b = 10 (a and this value are locked)
console.log(returnedValue); // 20

```


Explanation:


```js

multiply.bind(null, 2);

```

The bind() method creates a new function based on the original function (multiply). It initializes this to null inside the new function, and it pre-sets the first argument (a) to 2. This means the new function will always use 2 as the value of a.

Technically, bind() returns a new function that has this set to null and the first argument (a) set to 2.

```js

const multiplyBy2 = multiply.bind(null, 2);

```
Here, multiplyBy2 refers to the new function created by bind(). It is a specialized version of the multiply function where:

this is set to null.

The first argument (a) is always preset to 2.


```js 

multiplyBy2(5);

```


When you call multiplyBy2(5), you're supplying 5 as the second argument (b). The new function now uses:

a = 2 (preset),

b = 5 (supplied when calling multiplyBy2).

Now, the new function executes and returns the result of 2 * 5 = 10.


```js

const returnedValue = multiplyBy2(5);

```
Here, returnedValue stores the result, which is 10 (as explained above).


If you call it again with a different value for b:

```js
const returnedValue = multiplyBy2(10);

```
This will return 2 * 10 = 20 and store that value in returnedValue.


What We Learned in This Example:

👉 **Locking a and this**: By using bind(), we **"lock"** the value of ato2andthistonull. These values are fixed in the new function created by bind(). This ensures that every time the new function is called, awill always be2, and thisremains unaffected because it's not used in themultiply` function.

👉 Flexible b:
While a is locked, b remains flexible. Each time we call the new function (multiplyBy2), we provide a new value for b. This allows us to reuse the same function with different second arguments, making the function adaptable for various scenarios.

👉 Use Case:
The bind() method is useful when we want to preset some arguments while still having the flexibility to supply others when calling the function. It’s an effective way to create specialized versions of a function without needing to rewrite or duplicate the logic.



**✅ Case 1.1: Pre-setting 'this' and Arguments for Later Invocation**

```js

let name1 = {
  firstName: "Lycan", 
  lastName: "Mishra", 
  getFullName: function (city, state) {
    console.log(this.firstName + " " + this.lastName + " is from " + city + ", " + state);
  }
};

let name2 = {
  firstName: "Sachin", 
  lastName: "TendulKar"
};

// name2 is borrowing the getFullName function from name1 and using name2's context (this)
let printMyName = name1.getFullName.bind(name2, "Sambalpur", "odisha");

printMyName();  // Outputs: "Sachin TendulKar is from Sambalpur, odisha"
   

```

Explanation:

```js

name1.getFullName.bind(name2, "Sambalpur", "odisha");

```

bind() does not just borrow the method; it creates a new function based on the original getFullName method.

The bind() method:

    -> Sets this to name2 for the new function, meaning the new function will use name2 as its context (this).

    -> Pre-sets the values for the arguments city and state to "Sambalpur" and "odisha", respectively, so these values are locked into the new function.

After the binding process, the bind() method returns the new function with the pre-set values.

```js

let printMyName = name1.getFullName.bind(name2, "Sambalpur", "odisha");

```

In this line, the new function (created by bind()) is assigned to the printMyName variable.

printMyName() is now the new function that has name2 as this and has "Sambalpur" and "odisha" pre-set as its arguments.

Finally, when you call printMyName():

```js

printMyName();

```

It executes with:

    -> this referring to name2 (so this.firstName is "Sachin" and this.lastName is "TendulKar").

    -> The pre-set arguments (city = "Sambalpur" and state = "odisha") are passed automatically.

Output:

Sachin TendulKar is from Sambalpur, odisha


👉 bind() creates a new function with specific values for this and arguments.

👉 bind() doesn't directly execute the method; it returns a new function that can be invoked later.

The new function can be invoked multiple times with additional arguments if needed.



**✅ Case 2: bind() for Event Listeners**


```js

let button = document.querySelector('button');

let person = {
  name: 'Likan',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};

// Binding greet() with `this` set to `person`
button.addEventListener('click', person.greet.bind(person));

```

Explanation: Without bind(), this inside the greet() function would refer to the button element when it’s called. With bind(), we ensure that this always refers to the person object.



✅ Case 3: bind() for Constructor Functions


```js

function Animal(name) {
    console.log("->", this);
    this.name = name;
    console.log("->", this);
    this.speak = function() {
      console.log(this.name + " says hello!");
    };
    console.log("->", this);
}

// Create a new instance of Animal
const dog = new Animal("Bob");

dog.speak();

// Create a new object 'cat' with a 'name' property
const cat = { name: "Sherin" };

// Borrow the 'speak' method from 'dog' and bind it to the 'cat' object
const speak = dog.speak.bind(cat);

speak();  // Outputs: "Sherin says hello!"

// Bind the 'speak' method to 'dog' again
const dogSpeaks = dog.speak.bind(dog);

dogSpeaks();  // Outputs: "Bob says hello!"

```


Step-by-Step Explanation:

The Animal Constructor Function:

    The Animal function is a constructor, meaning it is used to create new objects. When you use new Animal("Bob"), it creates a new object and sets this to refer to that object.

First console.log in Animal:

    Inside the constructor, this refers to the newly created object. Initially, it is empty ({}).

    console.log("->", this) will print: -> {}.

Setting name Property:

    We then set this.name = name;, where name is the argument passed to the constructor (in this case, "Bob").

    this now looks like { name: "Bob" }.

    console.log("->", this) prints: -> { name: "Bob" }.

Adding speak Method:

    Next, we add the speak method to the object using this.speak = function() {...}. This method will log a message that includes the object's name property.

    Now, this looks like { name: "Bob", speak: ƒ }, where ƒ represents the function.

    console.log("->", this) prints: -> { name: "Bob", speak: ƒ }.

Creating dog Object:

    We create a new instance of Animal by calling new Animal("Bob"). This creates a new object (dog), which has the name property set to "Bob" and a speak method.

    When dog.speak() is called, it logs: "Bob says hello!" because this in the speak method refers to the dog object.

Creating cat Object:

    We create a new object, cat, with a name property set to "Sherin".

    cat does not have a speak method, but we want to borrow the speak method from dog.

Binding speak Method to cat:

    const speak = dog.speak.bind(cat); uses bind() to create a new function where this inside speak is explicitly set to refer to the cat object instead of dog.

    When speak() is called, it logs: "Sherin says hello!" because this now refers to cat.

Binding speak Method Back to dog:

    We also create a new function const dogSpeaks = dog.speak.bind(dog); which ensures that this always refers to dog when calling speak().

Calling dogSpeaks() will log: "Bob says hello!" because this now refers to dog again.




✅ Case 4: Partial Function Application


```js

function sum(a, b, c) {
  return a + b + c;
}

const add5 = sum.bind(null, 5); // Pre-setting the first argument to 5

console.log(add5(2, 3)); // Output: 10

```

Explanation: bind() allows us to create a version of the sum function where the first argument is fixed. Later, we can provide the remaining arguments when invoking the function.



✅ Case 5: Using .bind() to Control this in Event Handlers

When working with event listeners or callbacks, JavaScript’s this keyword might not always point to the object you expect. This can be especially tricky in event handlers. .bind() can help you control what this refers to, ensuring it points to the desired object.

**Problem Example: Without .bind()**

```js

<button id="greetButton">Greet</button>

const obj = {
  name: "Likan",
  greet: function() {
    console.log("Hello, " + this.name);  // `this` should refer to `obj`
  }
};

const button = document.getElementById("greetButton");

// Without .bind(), `this` will refer to the button, not `obj`
button.addEventListener("click", obj.greet);

```

Output:
When the button is clicked, this inside greet refers to the button, not the obj. Since the button doesn’t have a name property, it prints:
Hello, undefined


**Solution: Using .bind() to Control this**

```js

<button id="greetButton">Greet</button>

const obj = {
  name: "Likan",
  greet: function() {
    console.log("Hello, " + this.name);  // `this` should refer to `obj`
  }
};

const button = document.getElementById("greetButton");

button.addEventListener("click", obj.greet.bind(obj)); // Use .bind() to ensure `this` refers to `obj`

```

Output:
By using .bind(obj), we ensure that this inside greet always refers to obj, so when the button is clicked, it correctly prints:
Hello, Likan


# Why .bind() is Useful

-> Without .bind(): this points to the element (button).

-> With .bind(obj): this always refers to the obj object.


# ES6 Arrow Functions and bind()

Arrow functions don’t have their own this but inherit it from their surrounding context, so bind() is usually not needed with arrow functions.

```js


const obj = {
    name: "Likan",
    greet: () => console.log("Hello, " + this.name)   // "(In non-strict mode) window.name = undefined (since there is no name property inside window, JavaScript simply creates a new name property and assigns undefined to it). In strict mode, it remains undefined."
  };
  
  const obj2 = {
      name:"Amar"
  }
  
  const greet = obj.greet.bind(obj2)

  console.log(greet())  // Hello
```


In this case, bind() would be ineffective because the arrow function doesn't have its own this context; it inherits this from the surrounding context.


# Performance Tip

bind() is a powerful tool for creating functions with a fixed context, but it’s slower than using call() and apply() for immediate invocation.

However, bind() is much more useful when dealing with event handling, partial application, or creating functions to be used later.

# When to Use bind()?

When you need to create a function with a specific context (this).

When you want to pass arguments later (partial application).


When using event listeners and callbacks where this context needs to be controlled.


# Difference between call appl bind

-> call(): Calls the function immediately, allowing you to pass arguments individually and specify the this context.

-> apply(): Similar to call(), but accepts an array of arguments instead of individual ones.

-> bind(): Creates and returns a new function with a specified this context and optional pre-set arguments, to be invoked later.