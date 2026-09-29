getName()
console.log(x)
console.log(getName)
var x = 20
function getName() {
    console.log("Namaste Javascript")
}

// console.log(x)
// console.log(getName)
// // getName() // Error because arrow function & function expression cannot be hoisted.
// var x = 20
// var getName = () => {  
//     console.log("Namaste Javascript")
// }


// Hoisting - 

// Hoisting is a JavaScript mechanism that allows variables and functions to be accessed before they are explicitly declared in the code. This occurs due to the memory creation phase of the execution context, during which:

// Function declarations are fully hoisted, meaning both the function name and its body are moved to the top of their containing scope. This allows functions to be called before their declaration appears in the code.

// var declarations are hoisted with their names but not their initializations. Variables declared with var are set to undefined until the execution reaches their assignment.

// let and const declarations are also hoisted but are not initialized. They remain in a Temporal Dead Zone (TDZ), meaning accessing them before their declaration results in a ReferenceError.

// In summary, hoisting allows variables and functions to be used before they are declared, due to the way JavaScript sets up the execution context during the memory creation phase.