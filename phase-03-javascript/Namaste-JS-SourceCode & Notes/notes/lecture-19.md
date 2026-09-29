# Episode 19 : Map, Filter & Reduce in JavaScript

In JavaScript, map(), filter(), and reduce() are powerful Higher-Order Functions (HOFs) that help in transforming and processing arrays efficiently. These functions take another function as an argument and apply it to each element of the array.


# Map function

map() takes a callback function, runs it on every element of the array, and returns a new array. It does not mutate the original array.

**syntax** - const output = arr.map(callbackFunction)

**Example 1: Double Each Element**

```js

    const arr = [5, 1, 3, 2, 6];

    function double(x) {
      return x * 2;
    }

    const doubledArr = arr.map(double);  // Internally the map method executes the provided function for each element in the array, creating and returning a new array. It does not modify the original array.

    console.log(doubledArr); // [10, 2, 6, 4, 12]

```

**Example 2: Convert Elements to Binary**

```js

const binaryArr = arr.map((x) => x.toString(2)); // x.toString(2) -> gives binary value of x.

console.log(binaryArr); // ['101', '1', '11', '10', '110']

```

# Filter Function

filter() takes a callback function, runs it on every element, and returns a new array of only those elements for which the callback returns true.

**Syntax:**

const output = arr.filter(callbackFunction)

**Example: Filter Odd Numbers**

```js
  const arr = [5, 1, 3, 2, 6];

  function isOdd(x) {
    return x % 2 !== 0;
  }

  const oddArr = arr.filter(isOdd);
  console.log(oddArr); // [5, 1, 3]

  
```

-> The filter() function iterates over each element in an array and applies the given callback function. It creates a new array containing only the elements for which the callback function returns a truthy value (i.e., values that evaluate to true).

-> Just like map(), it does not modify the original array.


# Reduce Function

reduce() takes a reducer callback, runs it on every element, and accumulates the result into a single output value



**Syntax:**

const result = arr.reduce(callbackFunction, initialValue)

**Find the sum of all elements in an array (non-functional programming way).**

```js 

const array = [5, 1, 3, 2, 6];

function findSum(arr) {

  let sum = 0;  // Initialize a variable to hold the sum of the array elements.

  for (let i = 0; i < arr.length; i++) { // Iterate through each element in the array using a traditional for loop.
    sum = sum + arr[i];     // Add the current element to the sum.
  }
  return sum; // Return the total sum after the loop completes.
}

console.log(findSum(array)); // Prints the result of the findSum function i.e. 17

```

**Find the sum of all elements in an array (functional programming way using reduce).**

```js 

  const array = [5, 1, 3, 2, 6];

  const sumOfElem = array.reduce(function (accumulator, current) {
    accumulator = accumulator + current;
    return accumulator;
  }, 0); 

  console.log(sumOfElem); // Output: 17

```

**Code Explanation - What's Happening Here?**

-> The reduce method goes through each element in the array and calls the provided callback function on every iteration.

-> The second argument of the reduce function (e.g., 0) defines the initial value of the accumulator.
If no initial value is provided, reduce will use the first element of the array as the starting value.
    
-> Accumulator: A variable that holds the cumulative result after each iteration.
Current: The element currently being processed in the array.
    
-> During each iteration, the accumulator is updated by adding the current element to it.
The updated accumulator value is then returned and used as the accumulator in the next iteration.
    

**Step-by-Step Breakdown** 

const array = [5, 1, 3, 2, 6];
const result = arr.reduce(callbackFunction, 0)

-> Initialization:
The reduce method starts with the initial value of the accumulator, which we set to 0 here.
accumulator = 0
current = 5  (first element of the array)
Calculation:
accumulator + current = 0 + 5 = 5
The accumulator now becomes 5.

-> Second Iteration:
accumulator = 5  (result from the previous step)
current = 1  (second element of the array)
Calculation:
accumulator + current = 5 + 1 = 6
The accumulator now becomes 6.

-> Third Iteration:
accumulator = 6  (result from the previous step)
current = 3  (third element of the array)
Calculation:
accumulator + current = 6 + 3 = 9
The accumulator now becomes 9.

-> Fourth Iteration:
accumulator = 9  (result from the previous step)
current = 2  (fourth element of the array)
Calculation:
accumulator + current = 9 + 2 = 11
The accumulator now becomes 11.

-> Fifth Iteration:
accumulator = 11  (result from the previous step)
current = 6  (fifth element of the array)
Calculation:
accumulator + current = 11 + 6 = 17
The accumulator now becomes 17.

-> Final Step: After going through all the elements, the reduce method returns the final accumulated value:
17

**Note:**

reduce() loops through the array and keeps combining values step-by-step into one final accumulated result.

**Find the maximum element in an array (non-functional programming way).**

```js 

const array = [5, 1, 3, 2, 6];

function findMax(arr) {
 
  let max = 0;  // Initialize a variable to store the maximum value. Starting with 0 assumes that all numbers in the array are positive.

  for (let i = 0; i < arr.length; i++) {   // Loop through each element in the array.
    if (arr[i] > max) { // If the current element is greater than the stored max value,update the max value with the current element.
      max = arr[i];
    }
  }

  return max;   // Return the largest value found in the array.
}


console.log(findMax(array)); // Prints the maximum value i.e. 6

```

**Find the maximum element in an array (functional programming way using reduce).**


```js 

const array = [5, 1, 3, 2, 6];

const output = array.reduce((acc, current) => {

  if (current > acc) { // acc = max
    acc = current;
  }
  return acc;
}, 0);

console.log(output); // Output: 6

// Alternative version - Renaming the accumulator to 'max' for better clarity

const outputWithMax = array.reduce((max, current) => {

  /*

    Here, we use 'max' instead of 'acc' for the accumulator to make it more meaningful and relevant to the context.

    The logic remains the same:

    If the current value is greater than the maximum value found so far, update 'max'.
    Otherwise, retain the existing 'max' value.

  */

  if (current > max) {
    max = current;
  }
  return max;
}, 0);

console.log(outputWithMax); // Output: 6


```

**Code Explanation - How reduce Works Here**

const array = [5, 1, 3, 2, 6];
const result = arr.reduce(callback, 0)

-> In this approach, the reduce method is used to find the maximum value in an array.


-> Accumulator (acc): Stores the highest value encountered so far.
Current: Represents the element currently being processed in the array.


-> On each iteration:
The current element is compared with the accumulated maximum value.
If the current element is greater than the accumulator, the accumulator is updated with the current element.
The updated accumulator value is then returned and used in the next iteration.


-> Initial Value: The accumulator is initialized with 0, as specified by the second argument in the reduce method.
If no initial value is provided, the first element of the array will be used as the starting value.

**Step-by-Step Breakdown** 

-> Initialization:
The reduce method starts with the initial value of the accumulator, which we set to 0 here.
accumulator = 0
current = 5  (first element of the array)
Comparison:
current > accumulator → 5 > 0 → true
Since the condition is true, we update the accumulator with the current value:
accumulator = 5
The accumulator now becomes 5.


Second Iteration:
accumulator = 5  (result from the previous step)
current = 1  (second element of the array)
Comparison:
current > accumulator → 1 > 5 → false
Since the condition is false, we keep the accumulator as it is:
accumulator = 5
The accumulator remains 5.

Third Iteration:
accumulator = 5  (result from the previous step)
current = 3  (third element of the array)
Comparison:
current > accumulator → 3 > 5 → false
Since the condition is false, we keep the accumulator as it is:
accumulator = 5
The accumulator remains 5.

Fourth Iteration:
accumulator = 5  (result from the previous step)
current = 2  (fourth element of the array)
Comparison:
current > accumulator → 2 > 5 → false
Since the condition is false, we keep the accumulator as it is:
accumulator = 5
The accumulator remains 5.

Fifth Iteration:
accumulator = 5  (result from the previous step)
current = 6  (fifth element of the array)
Comparison:
current > accumulator → 6 > 5 → true
Since the condition is true, we update the accumulator with the current value:
accumulator = 6
The accumulator now becomes 6.

Final Step:
After going through all the elements, the reduce method returns the final accumulated value:
6

**Note:**

The reduce method keeps comparing the current element with the accumulated maximum value step by step. The final accumulated result is 6, which is the maximum value in the array.


# How does reduce() work when only a callback function is provided, without an initial value ?

```js
    
const arr = [5, 1, 3, 2, 6];
const sum = arr.reduce((acc, curr) => {
  acc = acc + curr;
  return acc;
});
console.log(sum); // 17

```

**Step-by-Step Breakdown**

const arr = [5, 1, 3, 2, 6];
const callBack = (acc, curr) => acc + curr
const sum = arr.reduce(callBack); 

Initial State:
Since no initial value is provided, the reduce() method automatically takes the first element of the array (5) as the initial accumulator value. The iteration starts from the second element (index 1).
Accumulator: 5
Current: 1
The callback function is invoked as:
acc + curr => 5 + 1 = 6
The accumulator now holds 6.

Second Iteration:
The accumulator from the previous step (6) is used. The current element is now 3 (at index 2).
Accumulator: 6
Current: 3
The callback function is invoked again:
acc + curr => 6 + 3 = 9
The accumulator now becomes 9.

Third Iteration:
The accumulator from the previous step (9) is used. The current element is now 2 (at index 3).
Accumulator: 9
Current: 2
The callback function is invoked as:
acc + curr => 9 + 2 = 11
The accumulator now holds 11.

Fourth Iteration:
The accumulator from the previous step (11) is used. The current element is now 6 (at index 4).
Accumulator: 11
Current: 6
The callback function is invoked as:
acc + curr => 11 + 6 = 17
The accumulator now holds 17.

Final Step:
The reduce() method completes the iteration, and the final accumulated value (17) is returned as the result.
Final Outpu
console.log(sum); // Output: 17


# Function Chaining

Function chaining is a powerful technique that allows multiple operations to be performed in a single line.

**How can I print the list of first names of employees whose ages are less than 30 by chaining filter and map methods ?**

```js

const users = [
  { firstName: "Alok", lastName: "Raj", age: 23 },
  { firstName: "Ashish", lastName: "Kumar", age: 29 },
  { firstName: "Ankit", lastName: "Roy", age: 29 },
  { firstName: "Pranav", lastName: "Mukherjee", age: 50 }
];

const youngUsers = users
  .filter((user) => user.age < 30)
  .map((user) => user.firstName);

console.log(youngUsers); // ['Alok', 'Ashish', 'Ankit']


-> The chained function call first uses filter() to create a new array containing users with age less than 30, and then uses map() on this filtered array to extract and return an array of their first names.


// Implement the same logic using the reduce method.

const output = users.reduce((acc, curr) => {
  if (curr.age < 30) {
    acc.push(curr.firstName);
  }
  return acc;
}, []);
console.log(output); // ["Alok", "Ashish", "Ankit"]. In every iteration we are updating the acc.


// Print full names in an array

const fullNames = users.map((user) => `${user.firstName} ${user.lastName}`);
console.log(fullNames);   // ['Alok Raj', 'Ashish Kumar', 'Ankit Roy', 'Pranav Mukherjee']

// map() iterates over each object in the users array and returns a new array containing the concatenated full names.

```

**How the Code Works with reduce:**

-> The reduce() method iterates through the users array, processing each element (referred to as curr).

-> Accumulator Initialization:
The second argument to reduce() is an empty array [], which serves as the initial value of the accumulator acc.
This means acc starts as an empty array and gets updated during each iteration.

-> Conditional Check: Inside the callback function, it checks if the current user's age (curr.age) is less than 30.
If true, it pushes the firstName of the current user (curr.firstName) to the acc array.

->Returning the Accumulator: After processing all elements, reduce() returns the final accumulated array, which contains the first names of users under 30.


**Step-by-Step Breakdown**

```js
const users = [
  { firstName: "Alok", lastName: "Raj", age: 23 },
  { firstName: "Ashish", lastName: "Kumar", age: 29 },
  { firstName: "Ankit", lastName: "Roy", age: 29 },
  { firstName: "Pranav", lastName: "Mukherjee", age: 50 }
];

const result = users.reduce(callbackFunction, [])

```

-> Initialization -
The reduce method starts with an initial value of the accumulator, which is an empty array [] in this case.
accumulator = []  
current = { firstName: "Alok", lastName: "Raj", age: 23 }  (first user object)  
Condition Check:Since the current user's age (23) is less than 30, it passes the condition.
Action:Push the first name "Alok" into the accumulator.
accumulator = ["Alok"]

-> Second Iteration -
accumulator = ["Alok"]  (result from the previous step)  
current = { firstName: "Ashish", lastName: "Kumar", age: 29 }  (second user object)  
Condition Check:Since the current user's age (29) is less than 30, it passes the condition.
Action:Push the first name "Ashish" into the accumulator.
accumulator = ["Alok", "Ashish"]

-> Third Iteration -
accumulator = ["Alok", "Ashish"]  (result from the previous step)  
current = { firstName: "Ankit", lastName: "Roy", age: 29 }  (third user object)  
Condition Check:Since the current user's age (29) is less than 30, it passes the condition.
Action:Push the first name "Ankit" into the accumulator.
accumulator = ["Alok", "Ashish", "Ankit"]

-> Fourth Iteration -
accumulator = ["Alok", "Ashish", "Ankit"]  (result from the previous step)  
current = { firstName: "Pranav", lastName: "Mukherjee", age: 50 }  (fourth user object)  
Condition Check:Since the current user's age (50) is not less than 30, it fails the condition.
accumulator = ["Alok", "Ashish", "Ankit"]

-> Final Step - After iterating through all users, the reduce method returns the final accumulated value: ["Alok", "Ashish", "Ankit"]


"Using polyfills helps to understand the internal workings of these functions and ensures compatibility with older browsers."


# Polyfill for map()

```js

    // Sample array 
    const arr = [5, 1, 3, 2, 6];

    // callback function
    function double(num) {
      return num * 2;
    }


    // Polyfill for map()
    Array.prototype.myMap = function( ) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
      }
     return result;
    };


    // Usage of the custom myMap() function
    const doubled = arr.myMap(double);
    console.log(doubled); // Output: [10, 2, 6, 4, 12]

```

**How the map Polyfill Works ?**

-> Prototype Extension:
Array.prototype.myMap = function(callback) {...}
This adds a new method called myMap to the Array prototype, making it available to all array instances.


-> Creating a Result Array:
Inside the function, an empty array called result is created to hold the transformed values:
const result = [];
This will store the results of each callback invocation.


-> Iterating Through the Array:
The for loop iterates through each element of the calling array (this).
for (let i = 0; i < this.length; i++) {...}
Here, this refers to the array on which myMap is called (arr in this case).


-> Calling the Callback:
Inside the loop, the callback function is called with three arguments:
this[i] → The current element
i → The current index
this → The entire array
result.push(callback(this[i], i, this));
The returned value from the callback is pushed into the result array.


-> Returning the Result:
After the loop completes, the result array is returned, containing all transformed values:
return result;


# Polyfill for filter()

```js
      // Sample array 
      const arr = [5, 1, 3, 2, 6];

      // Callback function to filter out even numbers
      function isEven(num) {
        return num % 2 === 0;
      }

      // Polyfill for filter()
      Array.prototype.myFilter = function(callback) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
          if (callback(this[i], i, this)) {
            result.push(this[i]);
          }
        }
        return result;
      };

      // Usage of the custom myFilter() function
      const evenNumbers = arr.myFilter(isEven);
      console.log(evenNumbers); // Output: [2, 6]

```

**💡 Step-by-Step Breakdown**

Adding a Custom Method to Array Prototype:
Array.prototype.myFilter = function(callback) {...}
This line defines a new method called myFilter and adds it to the Array prototype. This makes it accessible to all array instances.

Creating an Empty Array to Store Filtered Elements:
const result = [];
This will hold the elements that meet the condition specified by the callback function.

Iterating Through the Array:
for (let i = 0; i < this.length; i++) {...}
The loop goes through each element of the array on which myFilter is called.
this refers to the array itself.


Applying the Callback Function:
if (callback(this[i], i, this)) {...}
The callback function is called with three arguments:
-> this[i] → Current element
-> i → Current index
> this → Original array
If the callback returns true, it means the element satisfies the filtering condition.

Adding the Element to the Result Array:
result.push(this[i]);
If the element passes the test, it is pushed into the result array.

Returning the Filtered Array:
return result;

After iterating through the entire array, the function returns the new array containing all filtered elements.



# Polyfill for reduce()

```js


const arr = [5, 1, 3, 2, 6]; // 1. Sample array

Array.prototype.myReduce = function(callback, initialValue) { // 2. myReduce - reduce Polyphil
 
  let accumulator = initialValue !== undefined ? initialValue : this[0];   // Initialize accumulator with initialValue if provided, otherwise use the first element

  let startIndex = initialValue !== undefined ? 0 : 1;   // Start index is  0 if initialValue is provided, else start index is 1


  for (let i = startIndex; i < this.length; i++) {   // Iterate through the array

    accumulator = callback(accumulator, this[i], i, this);     // Update the accumulator by calling the callback
  
  }

  return accumulator;   // Return the final accumulated value
};


function sum(acc, curr) { // 3. Callback function to sum numbers
  return acc + curr;
}

const total = arr.myReduce(sum, 0); // 4. Usage of the custom myReduce() function

console.log(total); // Output: 17

```

**🚀 How the reduce() Polyfill Works**

Accumulator Initialization: If initialValue is provided, it’s set as the accumulator.
If not, the first element of the array becomes the accumulator.

Iteration and Accumulation:
If initialValue is given, iteration starts from index 0.
If not, iteration starts from index 1 (as the first element is already used as the accumulator).
In each iteration, the callback is called with:
accumulator (accumulated result so far).
currentValue (current element of the array).
currentIndex (index of the current element).
array (the entire array).
The result of the callback becomes the new accumulator value.

Return the Accumulated Value: Once all elements are processed, the final accumulated value is returned.


# Given an array of user objects, how can we count the number of users with the same age using the reduce() method?


const users = [
  { firstName: "Alok", lastName: "Raj", age: 23 },
  { firstName: "Ashish", lastName: "Kumar", age: 29 },
  { firstName: "Ankit", lastName: "Roy", age: 29 },
  { firstName: "Pranav", lastName: "Mukherjee", age: 50 },
];

// The expected output is: { 23: 1, 29: 2, 50: 1 }

**Coding**

```js

const users = [
  { firstName: "Alok", lastName: "Raj", age: 23 },
  { firstName: "Ashish", lastName: "Kumar", age: 29 },
  { firstName: "Ankit", lastName: "Roy", age: 29 },
  { firstName: "Pranav", lastName: "Mukherjee", age: 50 },
];

const report = users.reduce((acc, curr) => {
  if (acc[curr.age]) {
    acc[curr.age] = ++acc[curr.age];
  } else {
    acc[curr.age] = 1;
  }
  return acc;
}, {});

console.log(report); 

```

**Step-by-Step Breakdown:**

Step 1: Initialization
The reduce() method is called on the users array.
The accumulator (acc) is initialized to an empty object: {}.


Step 2: First Iteration (Processing "Alok")
Current object: { firstName: "Alok", lastName: "Raj", age: 23 }
acc (accumulator) is currently: {}
The age of the current user (curr.age) is 23.
The if condition checks whether acc[23] exists.
Since acc[23] is undefined, it enters the else block:
acc[23] = 1;
Updated accumulator: { 23: 1 }


Step 3: Second Iteration (Processing "Ashish")
Current object: { firstName: "Ashish", lastName: "Kumar", age: 29 }
acc is now: { 23: 1 }
The age of the current user (curr.age) is 29.
The if condition checks whether acc[29] exists.
Since acc[29] is undefined, it enters the else block:
acc[29] = 1;
Updated accumulator: { 23: 1, 29: 1 }


Step 4: Third Iteration (Processing "Ankit")
Current object: { firstName: "Ankit", lastName: "Roy", age: 29 }
acc is now: { 23: 1, 29: 1 }
The age of the current user (curr.age) is 29.
The if condition checks whether acc[29] exists.
Since acc[29] exists (value 1), it enters the if block and increments the count:
acc[29] = ++acc[29]; // 1 + 1 = 2
Updated accumulator: { 23: 1, 29: 2 }


Step 5: Fourth Iteration (Processing "Pranav")
Current object: { firstName: "Pranav", lastName: "Mukherjee", age: 50 }
acc is now: { 23: 1, 29: 2 }
The age of the current user (curr.age) is 50.
The if condition checks whether acc[50] exists.
Since acc[50] is undefined, it enters the else block:
acc[50] = 1;
Updated accumulator: { 23: 1, 29: 2, 50: 1 }


Final Step: Return the Accumulator
After all iterations are complete, the reduce() method returns the final accumulator:
{ 23: 1, 29: 2, 50: 1 }


**Why Use Reduce?**

We want to deduce a single value (an object) from an array, which makes reduce() the ideal choice.
reduce() allows us to accumulate data efficiently, transforming the array into an object with minimal code.

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=zdp0zrpKzIE&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP" target="_blank"><img src="https://img.youtube.com/vi/zdp0zrpKzIE/0.jpg" width="750"
alt="map, filter & reduce Youtube Link"/></a>


reduce polyphil - Finding Max

```js

const arr = [5, 1, 3, 2, 6]; 

Array.prototype.myReduce = function(callback, initialValue) { 
 
  let accumulator = initialValue !== undefined ? initialValue : this[0];

  let startIndex = initialValue !== undefined ? 0 : 1;


  for (let i = startIndex; i < this.length; i++) {   

    accumulator = callback(accumulator, this[i], i, this);    
  
  }

  return accumulator;  
};

// max logic

function max(acc, curr) { 

  if (curr > acc) return curr
  return acc
  
}

const Maximum = arr.myReduce(max, 0);

console.log(Maximum); 


```