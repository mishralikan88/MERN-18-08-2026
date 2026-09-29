# What is apply()?

-> apply() is a method similar to call(), used to invoke functions with a specified 'this' value.
-> The difference: apply() accepts an array of arguments, whereas call() takes arguments one by one.

# Syntax:

functionName.apply(thisArg, [argsArray]);

where,

thisArg: The object to be used as this inside the function.

[argsArray]: An array or array-like object with arguments for the function.


# Analogy: apply() is Like a Gym Pass Bundle.

Imagine you get a gym pass that allows you to bring a guest and give them access to multiple facilities at once (steam, sauna, weights).

GymOwner.AccessGym.apply(Guest, [facility1, facility2]);

Where:

GymOwner → Function owner

AccessGym → Function being used

apply() → Lets guest borrow it

Guest → New this

[facility1, facility2] → All extra perks in an array


# 🧪 Real World Example

```js

let gymMember = {
  name: "Lycan",
  accessGym: function(facility1, facility2) {
    console.log(this.name + " is using " + facility1 + " and " + facility2);
  }
};

let guest = { name: "Sachin" };

gymMember.accessGym.apply(guest, ["sauna", "treadmill"]);

```
✔️ Output:

Sachin is using sauna and treadmill


Explanation:

✔️ this inside accessGym now refers to guest.
✔️ Arguments are passed as an array.




# Deep Dive Use Cases of apply()

✅ Case 1: Borrowing Methods with Arguments


```js

const person = {
  greet: function(greeting, punctuation) {
    console.log(greeting + ", " + this.name + punctuation);
  }
};

const user = { name: "Likan" };

person.greet.apply(user, ["Hello", "!"]); // Hello, Likan!

```


✅ Case 2: Using apply() to Find Max/Min in Arrays

```js

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);
console.log(max); // 7

const min = Math.min.apply(null, numbers);
console.log(min); // 2

```
✔️ Math.max and Math.min don’t accept arrays directly, but apply() unpacks (spreads) the numbers while passing them into max().




✅ Case 3: Using apply() with Array-like Objects

```js

// ✅ A function that calculates the sum of all its arguments
function sum() {
  let total = 0;

  // 🔍 `arguments` is an array-like object that holds all values passed to the function
  // Even though `sum()` has no parameters, it still gets values from `arguments`
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i]; // ➕ Add each number to the total
  }

  return total; // 🔁 Return the final sum
}

// ✅ A wrapper function that uses apply() to call `sum` with an array of numbers
function callSumWithApply() {
  // 🔧 `apply()` allows you to pass arguments as an array to a function
  // Here, `sum.apply(null, [1, 2, 3, 4])` is like calling `sum(1, 2, 3, 4)`
  // `null` is passed as `this` context (not used in `sum`, so it doesn't matter)
  return sum.apply(null, [1, 2, 3, 4]);
}

// 🚀 Call the function and print the result
console.log(callSumWithApply()); // Output: 10


```


✅ Case 4: Converting NodeList to Array


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>apply() NodeList Example</title>
</head>
<body>
  <!-- Some divs to select -->
  <div>Apple</div>
  <div>Banana</div>
  <div>Cherry</div>

  <script>
    // Step 1: Select all <div> elements — this gives us a NodeList
    const nodeList = document.querySelectorAll("div");

    // Step 2: Convert NodeList to a real array using apply()
    const nodeArray = Array.prototype.slice.apply(nodeList);

    // Step 3: Log both nodeList and nodeArray
    console.log("🚩 NodeList (array-like, NOT a real array):", nodeList);
    console.log("✅ nodeArray (converted to REAL array):", nodeArray);

    // Step 4: Try using .map() on both to show difference

    // ❌ This will throw an error because NodeList doesn't have map
    try {
      nodeList.map((el) => console.log("NodeList item:", el.textContent));
    } catch (err) {
      console.warn("❌ nodeList.map() failed: NodeList has no map method");
    }

    // ✅ This works because nodeArray is a true array
    nodeArray.map((el, index) => {
      console.log(`nodeArray item ${index + 1}:`, el.textContent);
    });

    /*
    👉 OUTPUT in console:

    🚩 NodeList: NodeList(3) [div, div, div]
    ✅ nodeArray: [div, div, div]

    ❌ nodeList.map() failed: NodeList has no map method

    nodeArray item 1: Apple
    nodeArray item 2: Banana
    nodeArray item 3: Cherry
    */
  </script>
</body>
</html>


✔️ This is a classic way (before spread/rest syntax) to convert array-like objects to real arrays.




✅ Case 5: Using apply() to Chain Constructors (inheritance)

```js

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  console.log(this); // `this` is initially an empty object created by the `new` keyword: {}
  
  // The `Product.apply(this, [name, price])` method calls the parent constructor (Product),
  // setting `this` to the empty object created by `new Food()`, and adds `name` and `price` properties.
  Product.apply(this, [name, price]); // Now `this` is: { name: "Cheese", price: 5 }
  
  // Adding the `category` property to `this` inside the `Food` constructor.
  this.category = "food"; // Now `this` is: { name: "Cheese", price: 5, category: "food" }
}

const cheese = new Food("Cheese", 5); // `cheese` holds a reference to the `this` object inside `Food` constructor.
console.log(cheese); // Output: { name: "Cheese", price: 5, category: "food" }

```

**Code Execution Overview:**

1. Calling the Food constructor:

When you invoke new Food("Cheese", 5), an empty object {} is automatically created. This object is assigned to this inside the Food constructor function.

```js

const cheese = new Food("Cheese", 5);

```

2. this inside Food:

Inside the Food constructor, this initially points to the newly created empty object {}. This is logged by the console.log(this) statement:

```js

console.log(this); // this -> {}

```

3. Calling Product.apply(this, [name, price]):

The apply() method is used to call the Product constructor, setting the this context to the object created in step 1 (the empty object {}). This means that the Product constructor will now modify this empty object, adding the name and price properties:

```js

Product.apply(this, [name, price]); // this -> { name: "Cheese", price: 5 }

```

4. Adding category to this:

After the call to Product.apply(), the Food constructor continues, and this.category = "food" adds the category property to the object:

```js

this.category = "food"; // this -> { name: "Cheese", price: 5, category: "food" }

```

5. Final this (referenced by cheese):

After all the constructor code executes, the this object is now fully populated with the properties: name, price, and category. The final object is:

```js

{ name: "Cheese", price: 5, category: "food" }

```
cheese holds a reference to this object, and when you log cheese, it will output the final object:

```js

console.log(cheese); // { name: "Cheese", price: 5, category: "food" }

```

**Note**

-> cheese points to the same object that was initially assigned to this in the Food constructor.

-> The object starts as an empty object {} and is gradually populated:

-> The Product constructor adds name and price.

-> The Food constructor adds the category.

At the end, cheese holds the final object: { name: "Cheese", price: 5, category: "food" }


# ES6 Spread Alternative

Instead of:

someFn.apply(obj, [1, 2, 3]);

Use:

someFn.call(obj, ...[1, 2, 3]);

🧠 In modern JS, spread (...) can often replace apply().


# Performance Tip

-> apply() is powerful but slightly slower than spread or call because it does more checks under the hood. 

-> Use spread syntax where possible in performance-critical paths.