// Define a function named 'Outer'
function Outer() {
    // Declare a local variable 'a' and assign it the value 10
    var a = 10;

    // Define an inner function named 'inner'
    function inner() {
        // Access and print the value of 'a' from the outer function scope
        console.log(a);
    }

    // Return the inner function (not executing it, just returning the function reference)
    return inner;
}

// Call the Outer function and immediately call the returned inner function
Outer()(); // Output: 10

/*
Explanation:
1. Calling 'Outer()' executes the outer function and returns the 'inner' function.
2. The first '()' triggers the 'Outer' function and returns the 'inner' function itself.
3. The second '()' immediately calls the returned 'inner' function.
4. Inside 'inner', the variable 'a' is accessed and printed.
   - This works because of **closures**, where the inner function retains access to the variables
     in its lexical scope (the 'Outer' function's scope) even after 'Outer' has finished executing.
*/





// Define a function named 'Outer'
function Outer() {
    // Define an inner function named 'inner'
    function inner() {
        // Access and print the value of 'a' from the outer function scope
        console.log(a);
    }

    // Declare a local variable 'a' and assign it the value 10
    var a = 10;

    // Return the inner function (not executing it, just returning the function reference)
    return inner;
}

// Call the Outer function and immediately call the returned inner function
Outer()(); // Output: 10

/*
Explanation:
1. Even though the variable 'a' is declared after the 'inner' function, JavaScript's **hoisting** mechanism
   moves the declaration of 'a' to the top of the 'Outer' function scope (without its initialization).
2. During the execution of the 'inner' function, it successfully finds 'a' in its lexical environment,
   since the value has already been assigned (10) before the inner function is invoked.
3. As a result, the output is 10.
4. This is an example of **closures** where the inner function retains access to its outer function's variables.
*/





// Define a function named 'Outer'
function Outer() {
    // Declare a local variable 'a' using 'let' and assign it the value 10
    let a = 10;

    // Define an inner function named 'inner'
    function inner() {
        // Access and print the value of 'a' from the outer function scope
        console.log(a);
    }

    // Return the inner function (not executing it, just returning the function reference)
    return inner;
}

// Call the Outer function and immediately call the returned inner function
Outer()(); // Output: 10

/*
Explanation:
1. In this version, we are using 'let' instead of 'var' to declare the variable 'a'.
2. Unlike 'var', 'let' does not get hoisted to the top of the function scope with an undefined value.
   Instead, 'let' has block scope and is hoisted differently, creating a "temporal dead zone" until initialization.
3. However, since the variable 'a' is declared and initialized before the 'inner' function is invoked,
   there is no difference in output compared to using 'var'.
4. The closure still works the same way, as the inner function 'inner' retains access to its lexical scope,
   which includes the variable 'a'.
*/





// Define a function named 'Outer' that takes a parameter 'str'
function Outer(str) {
    // Declare a local variable 'a' using 'let' and assign it the value 10
    let a = 10;

    // Define an inner function named 'inner'
    function inner() {
        // Access and print the values of 'a' and 'str' from the outer function scope
        console.log(a, str);
    }

    // Return the inner function (not executing it, just returning the function reference)
    return inner;
}

// Call the Outer function with the argument "Hello There" and immediately call the returned inner function
Outer("Hello There")(); // Output: 10 "Hello There"

/*
Explanation:
1. The 'Outer' function takes a parameter 'str', which allows us to pass in a dynamic value.
2. The local variable 'a' is declared and initialized with the value 10.
3. Inside the 'inner' function, both 'a' and 'str' are accessible because of the closure formed.
   The inner function "remembers" its lexical environment, which includes 'a' and 'str'.
4. The 'Outer' function is invoked with the argument "Hello There", and it returns the 'inner' function.
5. The returned function is immediately invoked using '()' at the end.
6. The output of the entire operation is:
   10 "Hello There"
*/





// Define the outermost function named 'outest'
function outest() {
    // Declare a variable 'c' with value 20
    var c = 20;

    // Define a function named 'outer' that takes a parameter 'str'
    function outer(str) {
        // Declare a variable 'a' with value 10
        let a = 10;

        // Define an inner function named 'inner'
        function inner() {
            // Log the values of 'a', 'c', and 'str' to the console
            console.log(a, c, str);
        }

        // Return the 'inner' function (not executed, just the function itself)
        return inner;
    }

    // Return the 'outer' function itself (not executed)
    return outer;
}

// Call 'outest()', which returns the 'outer' function
// Immediately call the returned 'outer' function with the argument "Hello"
// Immediately call the returned 'inner' function after that
outest()("Hello")(); // Output: 10 20 "Hello"

/*
Explanation:
1. The 'outest' function is called first and returns the 'outer' function.
2. The returned 'outer' function is then immediately called with the argument "Hello".
3. The 'outer' function returns the 'inner' function.
4. The returned 'inner' function is then immediately called to produce the output.

How Closures Work Here:
- The 'inner' function forms a closure that "remembers" the variables from its lexical scope.
- It has access to:
  - 'a' from the 'outer' function (because 'inner' is defined inside 'outer').
  - 'c' from the 'outest' function (because 'outer' is defined inside 'outest').
  - 'str' because it was passed as an argument to the 'outer' function.

Why This Works:
- Even though the functions have returned and their execution contexts have been popped off the stack,
  the variables ('a', 'c', and 'str') are still accessible to 'inner' because they are preserved in the closure.
*/






// Data hiding -

// var count = 0
// function increment(){
//     count++
//     console.log(count)
// }
// increment()
// increment()
// increment()
// count = 101 // The count variable is accessible here, allowing anyone to modify it.
// increment()
// increment()


// Achieving data encapsulation using closures

// function Counter(){
//     var count = 0
//     function increment(){
//         count++
//         console.log(count)
//     }
//     return increment
// }
// var counter=Counter()
// counter()
// counter()
// counter()
// console.log("=======")
// var counter1 = Counter()
// counter1()
// counter1()

// The count variable is not accessible outside the Counter function, ensuring data privacy. // The count variable is now hidden and remains private.




// Achieving data encapsulation using closures with a constructor function

function Counter() {
    var count = 0;

    // function increment(){
    //     count++
    //     console.log(count)
    // }

    // constructor functions

    this.IncrementCounter = function () { // this points to the current instance.
        count++
        console.log(count)
    }
    this.DecrementCounter = function () {
        count--
        console.log(count)
    }
}

// Now, Counter will act as a class. To access the constructor function within the class, we need to create objects.

var counter1 = new Counter() // counter1 is an instance of the Counter class.
counter1.IncrementCounter()
counter1.IncrementCounter()
counter1.DecrementCounter()
counter1.IncrementCounter()
counter1.IncrementCounter()
counter1.DecrementCounter()
console.log("=======")
var counter2 = new Counter() 
counter2.IncrementCounter()
counter2.IncrementCounter()