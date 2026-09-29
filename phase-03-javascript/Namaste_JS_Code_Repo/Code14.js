// document.getElementById("clickMe").addEventListener("click",function xyz(){
//     console.log("button clicked")
// })

// document.getElementById("clickMe").addEventListener("click",()=>{
//     console.log("Arrow function invoked by button click")
// })

// let count = 0;
// document.getElementById("clickMe").addEventListener("click", function xyz() { 
//     console.log("Button clicked", ++count);
// });


// Event listener + Closure - The callback function xyz forms a closure with the outer function attachEventList's scope.

function createCounter() {
    let count = 0; // Local variable inside the closure
    return function () {
        console.log("Button clicked", ++count);
    };
}

const increment = createCounter();
document.getElementById("clickMe").addEventListener("click", increment);