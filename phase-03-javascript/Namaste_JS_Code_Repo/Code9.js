// Closure - A function along with its lexical scope forms a closure.

// ############################## Example 1 ##########################################################################

function x() {
    var a = 7; // 'a' is declared inside function x()

    function y() {
        console.log(a); // Inside function y, we have access to:
        // 1️⃣ Global variables
        // 2️⃣ Local variables of y()
        // 3️⃣ Variables from the **lexical scope** of x() (closure)
    }

    y(); // Calling y() inside x()
}

x(); // Invoking x()

// Here, the function y(), along with its lexical environment (the scope of x()), forms a closure.


// ############################### Example 2 ##########################################################################

function x() {
    let a = 10;
    console.log("=== We are inside the local scope of function x ===");
    console.log("a =", a);

    function y() {
        let b = 20;
        console.log("=== We are inside the local scope of function y + the lexical environment of x ===");
        console.log("a =", a); // Accessing 'a' from function x (lexical scope)
        console.log("b =", b); // Accessing 'b' from function y (local scope)

        function z(c) {
            console.log("=== We are inside the local scope of function z + the lexical environment of y and x ===");
            console.log("a =", a); // Accessing 'a' from function x
            console.log("b =", b); // Accessing 'b' from function y
            console.log("c =", c); // Accessing 'c' from function z (local scope)
        }

        z(25); // Calling function z and passing 25 as an argument
    }

    y(); // Calling function y
}

x(); // Calling function x



// ################### Example 3 - Function returning another function ################################################

// The returned function 'y' is lexically scoped inside the parent function 'x'.

// function x() {
//     var a = 7; // 'a' is declared inside function x()

//     function y() {
//         console.log(a); // 'y' accesses 'a' from x()
//     }

//     return y; // Returning function y
// }

// var z = x(); // x() runs and returns function y, so now z holds y

// console.log(z); // Logs: function y() {...} (function definition)

// z(); // Calls y(), which prints 7 to the console

// Where does the JavaScript engine get the value of 'a'? 
// At this point, 'a' is not in the global scope, and it does not exist in the local scope of y() either.

// Answer: It fetches 'a' from the closure.

// A closure is a temporary memory space that stores variables from a function’s parent scope. 
// These values are kept as long as they are needed and are later garbage collected when unused. 

// In this case, the closure keeps 'a' accessible for y(), even after x() has finished executing. 
// Since 'a' is used inside function y() when y() is called, it remains in memory. 
// Once 'a' is no longer needed, it is garbage collected.

// ✔ Closures let a function remember variables from its parent function
// ✔ Even when the parent function is done, the returned function still has access to its variables
// ✔ JavaScript cleans up closures when they are no longer used

// ######################### Example 4 ###############################################################################

function x() {
    var a = 7; // 'a' is initially declared and assigned 7

    function y() {
        console.log(a); // y() tries to access 'a'
    }

    var a = 100; // 'a' is reassigned to 100 before returning y()

    return y; // Returns function y along with a reference to 'a' (not the value)
}

var returnedFunction = x(); // x() returns (function y + its lexical environment)

returnedFunction(); // Calls y(), which logs the latest value of 'a'

// What happens when returnedFunction() (i.e., y()) is called?

// Ans - returnedFunction() is actually y(), and when y() executes, it tries to access a.Since a is not found inside y(), JavaScript looks up in its lexical scope (inside x()).But by the time y() runs, the value of a is 100, not 7, because a was reassigned inside x().This proves that closures don’t store values; they store references to variables.

// 💡 Why doesn’t y() remember a = 7?
// Many assume that since y() was defined when a was 7, it should log 7.But JavaScript closures do not capture a snapshot of variable values.Instead, they keep a reference to the variable in memory, which means if the variable's value changes, the function will see the updated value.

// 🔹Key Takeaways About Closures and Variable References:
// ✔ Closures store a reference, not a value.
// ✔ If the variable is modified before the function is executed, the function sees the latest value.
// ✔ Closures don’t "freeze" variable values at the time they are created.

// ####################################### Example 5 #########################################################

function z() {
    var b = 900
    function x() {
        var a = 7
        function y() {
            console.log(a, b) // a comes from the closure of x, and b comes from the closure of z.
        }
        y()
    }
    x()
}
z()

// #########################################################################################################