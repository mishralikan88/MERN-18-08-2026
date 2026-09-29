
// Function Declaration / Function Statement - (Hoisting is allowed)
// function a(){
//     console.log("Hello")
// }
// a()



// Function Expression - (Hoisting is restricted)
// var b = function(){
//     console.log("Hello")
// }
// b()
// console.log(b)



// Anonymous Function
// function(){
// }



// Named Function
// var NamedFunction = function xyz() {
//     console.log("b called")
// }
// NamedFunction()
// xyz() // xyz function is not available in global space. Hence it cannot be called.
// Reference Error - xyz is not defined.



// First-Class Function / First-Class Citizen / Higher-Order Function (HOF)

// Example 1
var b = function (param) {
    console.log(param)
}
b(function () { })

// Example 2
var b = function (param) {
    console.log(param)
}
function xyz(){}
b(xyz)

// Example 3
var b = function(param1){
    console.log(param1)
    return function(){

    }
}
b(function xyz(){})

