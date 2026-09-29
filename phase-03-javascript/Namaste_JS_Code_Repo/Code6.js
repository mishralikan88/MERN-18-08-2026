// var b = 10; // Global variable b
// function a() {
//     console.log(b); // 10, accessing the global variable b since no local b is defined inside function a
// }
// a(); // Invoking function a




// var b = 10; // Global variable b
// function a() {
//     function c() {
//         console.log(b); // 10, accessing the global variable b since no local b is defined inside c or a
//     }
//     c(); // Invoking function c
// }
// a(); // Invoking function a, which in turn calls c()




// var b = 10; // Global variable b
// function a() {
//     function c() {
//         console.log(window.b); // 10, accessing global scoped b via window object     
//         console.log(b); // undefined, due to hoisting, local b is declared but not assigned yet
        
//         var b = 100; // Local variable b inside function c, hoisted with an initial value of undefined
        
//         console.log(b); // 100, now local b is assigned a value inside function c
//     }
//     c(); // Invoking function c
// }
// console.log(b); // 10, accessing global scoped b
// a(); // Invoking function a




// var b = 10; // Global variable b
// function a() {
//     function c() {
//         console.log(b); // 10, accessing global variable b since no local b exists

//         b = 100; // This modifies the global variable b (equivalent to window.b = 100)

//         console.log(b); // 100, global variable b is now updated
//     }
//     c(); // Invoking function c
// }
// a(); // Invoking function a
// // Global variable b is modified here. Its value is now 100 instead of the original 10.




function a() {
    var b = 10; // b is a local variable inside function a
    function c() {
        console.log(b); // 10, c() can access b due to lexical scoping
    }
    c(); // Invoking function c inside function a
}
a(); // Invoking function a
console.log(b); // Error: b is not defined, since b is scoped to function a and is not accessible outside
// b is limited to the scope of function a. Once a() finishes execution, b is removed from memory (garbage collected).
// Trying to access b outside of a() results in an error because it is not defined in the global scope.