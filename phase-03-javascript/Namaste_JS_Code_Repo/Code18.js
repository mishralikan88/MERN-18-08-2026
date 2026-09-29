
// Polyfill for the filter method

const numbers = [1, 2, 3, 4]; // Sample array to demonstrate the filter method.
Array.prototype.myFilter = function (cb) { // Adding a custom filter method to the Array prototype.

    let temp = []; // Initialize an empty array to store the filtered elements.

    for (let i = 0; i < this.length; i++) {    // Loop through each element in the current array (referred to as 'this').
        
        if (cb(this[i])) {    // Call the callback function (cb) with the current element, If the callback returns true, push the element to the temp array.
            temp.push(this[i]);
        }
    }
    return temp;   // Returns the new array containing filtered elements.
}

const cb = function (num) {    // Callback function to filter numbers greater than 2
    return num > 2;
}

console.log(numbers.myFilter(cb)); // Output: [3, 4]


// 🔍 Why You Can't Use Arrow Functions in Polyfill ?


// ❌ Incorrect: Using an arrow function for polyfill
Array.prototype.myFilter = (cb) => {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i])) {
            temp.push(this[i]);
        }
    }
    return temp;
};


// 🚩 Why It Fails:

// Arrow functions don’t have their own this. Instead, they take this from where they are defined (the surrounding scope).

// When you define the polyfill using an arrow function, this doesn’t point to the array you are calling the method on. Instead, it points to the global object (or undefined in strict mode).

// That’s why using a regular function works correctly, as it sets this to the array you’re working with.