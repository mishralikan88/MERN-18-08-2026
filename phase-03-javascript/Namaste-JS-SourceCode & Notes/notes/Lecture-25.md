# 🚀 What is call()?

-> call() is a function borrowing method.
-> It allows us to explicitly define what 'this' should refer to when invoking a function.

**Syntax:**

functionName.call(thisArg, arg1, arg2, ...);

where thisArg is the object we want this to refer to.
arg1, arg2, ... are Optional arguments to pass to the function.


#  Analogy: Call() is Like Borrowing a Friend's Gym Membership**


**Conceptual Representation of call()**

GymOwner.AccessGym.call(Guest, extraFacilities);

where,

GymOwner → The person who owns the gym membership (original object).

AccessGym → The function that grants access to the gym (borrowed function).

call() → The method that allows the guest to temporarily use the function as if they were the owner.

Guest → The person who borrows the membership (new this).

extraFacilities → Optional add-ons, like a sauna or personal trainer (function arguments).


**🏋️‍♂️ Real-World Example in Code**

```js

let gymMember = {
  name: "Lycan",
  accessGym: function (facility) {
    console.log(this.name + " is working out using " + facility);
  }
};

let guest = { name: "Sachin" };


gymMember.accessGym.call(guest, "treadmill");  // Sachin borrows Lycan's gym access for a day

// 'guest' temporarily becomes 'this' inside the 'accessGym' method, so 'this' now refers to 'guest' (Sachin), not 'gymMember'.

```

Output:
Sachin is working out using treadmill

Explanation:
✔️ accessGym() belongs to gymMember, but we temporarily borrowed it for guest (Sachin) using .call().
✔️ call(guest, "treadmill") makes this refer to guest, so the function runs as if guest owns it.
✔️ Sachin is now treated like Lycan and gets gym access for a day!



# How call() Works (Lender-Borrower Analogy)

Lender.FunctionName.call(Borrower, arg1, arg2, ...)


**Explanation of Terms:**

Lender → The object that originally owns the function.

FunctionName → The function being borrowed.

call() → The method that temporarily changes this to a new object.

Borrower → The object that temporarily uses the function.

arg1, arg2, ... → Optional arguments passed to the function.

```js

let person1 = {
  firstName: "Lycan",
  lastName: "Mishra",
  getFullName: function () {
    console.log(this.firstName + " " + this.lastName);
  }
};

let person2 = {
  firstName: "Sachin",
  lastName: "Tendulkar"
};

person1.getFullName.call(person2); // Sachin Tendulkar

```

✔️ Here, getFullName() is borrowed from person1 and used with person2.
✔️ this now refers to person2, so it prints "Sachin Tendulkar".


# Understanding call() in JavaScript: A Step-by-Step Guide

**Normal Function Call (Without Borrowing)**

```js

let person1 = {
  firstName: "Lycan",
  lastName: "Mishra",
  getFullName: function () {
    console.log(this.firstName + " " + this.lastName);
  }
};

person1.getFullName(); // Output: Lycan Mishra

```

✔️ Here, this inside getFullName() refers to person1, so it works fine.

**Borrowing a Method from Another Object**

```js

let person2 = {
  firstName: "Sachin",
  lastName: "Tendulkar"
};

person1.getFullName.call(person2); // Output: Sachin Tendulkar

```

✔️ Here, call() borrows the getFullName() function from person1 and uses it for person2.
✔️ Now, this inside getFullName() refers to person2, so it prints "Sachin Tendulkar" instead.



**Call() Works Even If the Function Is Outside**

```js

function sayHello() {
    console.log("Hello, " + this.name);
}

const user = { name: "Likan" };

sayHello.call(user); // Output: Hello, Likan

```

✔️ Normally, sayHello() has no idea what this.name is.
✔️ But call(user) forces this to refer to user, so it works!



**Call() with Arguments**

```js

function introduce(city, country) {
    console.log(this.firstName + " is from " + city + ", " + country);
}

const person = { firstName: "Likan" };

introduce.call(person, "Bhubaneswar", "India"); // Output: Likan is from Bhubaneswar, India

```

✔️ First argument is the object (person).
✔️ The rest are function arguments (city and country).


**Essential Facts About call()**

✅ call() lets you borrow a function from another object.
✅ The first argument in call() decides what this refers to.
✅ Any extra arguments are passed normally to the function.



# 💡 Ultimate Memory Trick

Think of call() as saying:
💬 “Hey function, treat this object as this for now!”

**Syntax:**

Function.call(thisArg, arg1, arg2, ...);

✅ thisArg → The object that should be treated as this.
✅ arg1, arg2, ... → Optional arguments passed to the function.



# 🛠 12 Cases of call() 

**✅ Case 1: Borrowing a Method from Another Object**

```js

const person = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

const person1 = {
  firstName: "John",
  lastName: "Doe"
};

const person2 = {
  firstName: "Mary",
  lastName: "Doe"
};

// Using person.fullName method for person1
console.log(person.fullName.call(person1)); // Output: John Doe

// Using person.fullName method for person2
console.log(person.fullName.call(person2)); // Output: Mary Doe

```

Explanation: The fullName method, defined in the person object, is utilized for person1 and person2 by using call(), setting their respective contexts.

**✅ Case 2: Calling a Function with a Specific this Value**

```js

function greet() {
  console.log(this.animal + " typically sleep between " + this.sleepDuration);
}

const obj = {
  animal: "Cats",
  sleepDuration: "12 and 16 hours"
};

greet.call(obj); // Output: Cats typically sleep between 12 and 16 hours

```

Explanation: The greet function is called with obj as its context, allowing access to obj properties within the function.


**✅ Case 3: Using call() with Multiple Arguments**

```js

function introduce(city, country) {
  console.log(this.name + " is from " + city + ", " + country);
}

const person = { name: "Alice" };

introduce.call(person, "Paris", "France");

// Output: Alice is from Paris, France

```

Explanation: call() passes multiple arguments (city and country) to the introduce function, with 'this' set to the person object.

**✅ Case 4: Using call() with null or undefined**

```js

globalThis.globalVar = "I'm a global variable";

function show() {
  console.log(this.globalVar);
}

show.call(null); // Output: I'm a global variable

```

Explanation: When null or undefined is passed as the context, this defaults to the global object (globalThis in this case).

**✅ Case 5: Using call() with Primitive Values (Auto-Boxing)**

 
 Autoboxing refers to the automatic process where primitive values—such as strings, numbers, and booleans—are temporarily wrapped with their corresponding object wrappers when methods or properties are accessed on them. This allows primitives to behave like objects, enabling method calls directly on these values.

```js

const upperCase = String.prototype.toUpperCase.call("hello");
console.log(upperCase); // Output: HELLO

```
Note- The toUpperCase method is defined on String.prototype, which contains methods available to all string instances.

Explanation: JavaScript automatically wraps the string primitive "hello" with a String object, allowing the toUpperCase method to be called.



**Using call() with Numbers:**

The Number.prototype.toFixed() method formats a number using fixed-point notation. Here's how to use it with call():​

```js

const number = 5.6789;
const fixedNumber = Number.prototype.toFixed.call(number, 2);
console.log(fixedNumber); // Output: "5.68"

```

Explanation:
Number.prototype.toFixed.call(number, 2) invokes the toFixed() method on the number primitive, specifying 2 decimal places.​
The result is the string "5.68", representing the number rounded to two decimal places.​


**Using call() with Booleans:**

The Boolean.prototype.toString() method returns the string representation of a boolean value. Here's how to use it with call():​

```js

const bool = true;
const boolString = Boolean.prototype.toString.call(bool);
console.log(boolString); // Output: "true"

```

Explanation:
Boolean.prototype.toString.call(bool) invokes the toString() method on the bool primitive.​
The result is the string "true", representing the boolean value as a string.​


**✅ Case 6: Using call() on Array-Like Objects**



Ques: What is an Array-Like Object?

Ans: An array-like object is an object that:

-> has indexed properties (like an array).
-> has a length property (which helps define its size).
-> does not have built-in array methods like .push(), .map(), etc.


```js

const obj = { 0: "A", 1: "B", length: 2 };  // Looks like an array but is an object.

Array.prototype.push.call(obj, "C");

console.log(obj);  // Output: { '0': 'A', '1': 'B', '2': 'C', length: 3 }

```

Explanation: 

-> call() enables array methods like push to operate on array-like objects by setting the appropriate context.

-> setting the appropriate context means call() explicitly sets the value of this inside the method to the object we provide.

**What does call() do here?**

In JavaScript, .call() allows us to invoke a function with a specific context.

Array.prototype.push.call(obj, "C")

    -> Calls push but uses obj as 'this'.(inside the push method, this refers to obj instead of an actual array.)

    -> Tricks push into thinking obj is an array.


**How does push() work internally?**

Normally, Array.prototype.push(element) does the following:

-> Adds element at the length index.
   obj[obj.length] = "C"; // obj[2] = "C"

-> Increases length by 1.
   obj.length++;           // length becomes 3

Since obj has a length property, push() modifies it like an array.


**Final obj After Execution**

```js

console.log(obj); // { '0': 'A', '1': 'B', '2': 'C', length: 3 }

```

"C" was added at index 2 (length was 2 before push).

length was updated to 3.


**✅ Case 7: Borrowing Methods from Built-in Objects**

```js

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.call(null, ...numbers);

console.log(max); // Output: 7

```

Explanation: Math.max is borrowed to find the maximum number in the numbers array by spreading its elements as arguments.


**📌 Does Math.max() Accept an Array?**

No! Math.max() only accepts individual numbers as arguments. If we try to pass an array directly, it will fail:

```js

const numbers = [5, 6, 2, 3, 7];

console.log(Math.max(numbers));  // ❌ Output: NaN (because numbers is an array)

```

**📌 How Does .call() Help?**

.call() allows us to pass the numbers one by one instead of an array.

```js

Math.max.call(null, ...numbers);



This spreads the array, turning:

Math.max.call(null, ...[5, 6, 2, 3, 7]);

into:

Math.max.call(null, 5, 6, 2, 3, 7);


which works because Math.max() accepts individual numbers.


```
Note - Math.max() does not use this at all internally. It only cares about the arguments passed to it.

**Alternative: .apply()**

Another clean way to achieve the same result is:

Math.max.apply(null, numbers);

This works because .apply() automatically passes the array as individual arguments, just like spreading.


**✅ Case 8: Using call() in Constructor Functions**

```js

// Defining a constructor function named "Person"

function Person(name, age) {
  this.name = name; // Assigning the "name" parameter to the object's "name" property
  this.age = age;   // Assigning the "age" parameter to the object's "age" property
}

// Defining another constructor function named "Employee"

function Employee(name, age, position) {

  // Calling the "Person" constructor function inside "Employee" using "call()"
  // "this" refers to the new Employee object being created
  Person.call(this, name, age);

  // Adding an additional property specific to Employee
  this.position = position;
}

// Creating a new instance of Employee
const emp = new Employee("Bob", 30, "Developer");

// Printing the object to the console
console.log(emp); 

```
Output:

Employee { name: 'Bob', age: 30, position: 'Developer' }

Explanation: 

-> Person constructor is called within Employee constructor to initialize inherited properties.
-> "Person.call(this, name, age)" ensures that the "name" and "age" properties are inherited from the "Person" function.
-> The "position" property is then added specifically to Employee.
-> As a result, "emp" contains all three properties: name, age, and position.


**✅ Case 9: Using call() for Function Borrowing**

```js

const person = {
  name: "Charlie",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

const anotherPerson = { name: "Dave" };

person.greet.call(anotherPerson); // Output: Hello, Dave

```

Explanation: The greet method from person is borrowed and called with anotherPerson as its context.

**✅ Case 10: Using call() with Functions That Don't Use this**

```js

function logMessage(message) {
  console.log(message);
}

logMessage.call(null, "Hello, World!");  // Output: Hello, World!

```

Explanation: Even though logMessage doesn't utilize this, call() can still invoke it with arguments.

**✅ Case 11: Using call() for Function Currying**

```js

function multiply(a, b) {
  return a * b;
}

const double = multiply.call(null, 2, 5);

console.log(double); // Output: 10

```

Explanation: call() is used to preset the first argument of multiply, effectively creating a curried function.

**✅ Case 12: Using call() with this as window**

```js

function showWindow() {

  // 'this' points to window object

  console.log(this === window);
}

showWindow.call(window); // Output: true

```

Explanation: Demonstrates that call() can set this explicitly to the global window object.



# 🛑 call() with Arrow Functions - The Exception



**Arrow functions IGNORE .call()**

👉 Unlike regular functions, arrow functions do not bind their own this to the object passed inside .call().

👉 Instead, they inherit this from their surrounding lexical scope.

👉 This means that even if you use .call(), the this value will not change in an arrow function.


**Example 1: Arrow Function Inside an Object**

```js

let user = {
  name: "Likan",
  showName: () => {
    console.log(this.name);
  },
};

user.showName.call({ name: "Sachin" });

// Output: undefined (or empty in strict mode)

```

❌ Why does this happen?

showName is an arrow function, so this is not bound to user or { name: "Sachin" }.
'this' comes from where the function was defined, which is the global scope (window in browsers, undefined in strict mode).



**Example 2: Passing Parameters to Arrow Functions using .call()**

Even though arrow functions ignore the 'this' from .call(),parameters passed still work as expected.

Example: Arrow Function with Parameters + .call()

```js

const greet = (msg) => {
  console.log(`${msg}, I am ${this.name}`);
};

const user = { name: "Likan" };

greet.call(user, "Hello");

// Output: Hello, I am undefined ❌

```

🔍 Why?

👉 "Hello" is passed as the first parameter (msg) → works fine.

👉 this.name is undefined because:

👉 Arrow functions do not bind this

👉 The this value from .call(user) is ignored

👉 this comes from the lexical scope (likely global), not user




**Example 3: Regular Function vs. Arrow Function with call()**

```js

let obj = {
  name: "Likan",
  regularFunc: function () {
    console.log("Regular:", this.name);
  },
  arrowFunc: () => {
    console.log("Arrow:", this.name);
  },
};

let anotherObj = { name: "Sachin" };


obj.regularFunc.call(anotherObj); // Regular function respects `call()`

// Output: Regular: Sachin ✅ (this is changed)

obj.arrowFunc.call(anotherObj); // Arrow function ignores `call()`

// Output: Arrow: undefined ❌ (this remains from lexical scope)

```


**When you use .call(obj):**

👉 If the function is a regular function, then obj becomes the value of this inside the function.

👉 If the function is an arrow function, then obj does NOT become this. Arrow functions ignore .call() and inherit this from where they were defined.

**Important points**

👉 Regular functions respect call() and update this.

👉 Arrow functions ignore call() and keep this from their outer scope.They inherit this from their surrounding lexical scope.

👉 If you need call(), use a regular function instead of an arrow function.



**Example 3: Arrow Function Defined in Global Scope**


```js

let greet = () => {
  console.log(`Hello, ${this.name}!`);
};

let user = { name: "Likan" };

greet.call(user);

// Output: Hello, undefined! ❌ (this is still global)

```

Why? Because arrow functions don’t bind this, it stays as window in non-strict mode or undefined in strict mode.


# 🚀 More Edge Cases of call()

**1️⃣ Using .call() with null or undefined**


What does this become?
It depends on whether you're in strict mode or non-strict mode.

**Non-strict Mode (Default)**

👉 this becomes the global object (window in browsers)


```js

function showName() {
  console.log(this);        // 👉 In non-strict mode, this === window
  console.log(this.name);   // 👉 Accesses the 'name' property on window
}

// Setting a property 'name' on the global (window) object
window.name = "Global";

showName.call(null);        // ❗️null is ignored, this → window
showName.call(undefined);   // ❗️undefined is ignored, this → window

```

✅ Output:

Window {...}
Global

Window {...}
Global


🔹 Why?

When null or undefined is passed, JavaScript ignores it and defaults this to the global object.


**2️⃣ call() with Primitive Values (string, number, boolean)**

JavaScript autoboxes primitive values (string, number, boolean) into their object wrappers (String, Number, Boolean).

```js

function showThis() {
  console.log("👉 typeof this:", typeof this);
  console.log("👉 this:", this);
}

// 🔢 Number case
console.log("🔢 Number case:");
showThis.call(42);

/* Output:
👉 typeof this: object
👉 this: [Number: 42]
*/

// 🧵 String case
console.log("🧵 String case:");
showThis.call("hello");

/* Output:
👉 typeof this: object
👉 this: [String: 'hello']
*/

// ✅ Boolean case
console.log("✅ Boolean case:");
showThis.call(true);

/* Output:
👉 typeof this: object
👉 this: [Boolean: true]
*/

```

🔹 Why?

JavaScript wraps primitives in their object equivalents (Number, String, Boolean).

Whenever you use .call() with a primitive like 42, "hello", or true...

👉 JavaScript autoboxes the value:

42 → becomes new Number(42)

"hello" → becomes new String("hello")

true → becomes new Boolean(true)

And then: 🔹 this inside the function points to the wrapper object (not the primitive).So typeof this === "object" every time!


**3️⃣ call() with an Array as this**

If an array is passed as this, it behaves like a regular object, meaning you can access its properties.

```js

let arr = [10, 20, 30];

// ✅ Internally, this array is converted into an object like:
{
  // 🔹 Own properties (directly on the array)
  0: 10,                   // 👉 Stored as a property with key "0" (string key)
  1: 20,                   // 👉 Stored as a property with key "1"
  2: 30,                   // 👉 Stored as a property with key "2"
  length: 3,               // 👉 Maintained automatically by JS engine
  __proto__: Array.prototype  // 👉 Link to shared methods (push, pop, etc.)
}

// 🔍 Prototype Chain Lookup
// When you access a property on arr, JS engine does this:

// Step 1️⃣: Look for the property on arr itself (own properties)
// Step 2️⃣: If not found, check arr.__proto__ → Array.prototype
// Step 3️⃣: If still not found, check Array.prototype.__proto__ → Object.prototype

// ✅ Let's verify this with some logs:

console.log(arr.constructor.name);    
// "Array" ✅ → from Array.prototype.constructor

console.log(arr.hasOwnProperty(1));   
// true ✅ → inherited from Object.prototype.hasOwnProperty

console.log(typeof arr.push);         
// "function" ✅ → inherited from Array.prototype.push

// - Arrays are special objects with numeric keys + auto-managed length.
// - Their methods like push/pop are NOT stored on the array itself.
// - Those methods are inherited via prototype chain.
// - __proto__ gives access to Array.prototype, which itself inherits from Object.prototype.


```

Arrays are objects in JavaScript, so call() treats them like any other object.


# Prototype Chain

```js

arr = [10, 20, 30]

arr
  └── __proto__ → Array.prototype
                      └── __proto__ → Object.prototype
                                            └── __proto__ → null (end of chain)

```
👉 How Prototype Lookup Works in JavaScript

🧩 When you call arr.push()

-> Check if push exists directly on arr
-> Not found

-> Check arr.__proto__ → which is Array.prototype
-> Found push method here

So, arr.push() works by inheriting from Array.prototype

🧩 When you call arr.hasOwnProperty()

-> Check if hasOwnProperty exists directly on arr
-> Not found

-> Check arr.__proto__ → Array.prototype
-> Still not found

-> Check Array.prototype.__proto__ → which is Object.prototype
-> Found hasOwnProperty here

So, arr.hasOwnProperty() works by inheriting from Object.prototype