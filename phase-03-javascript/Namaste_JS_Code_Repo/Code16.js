// ########### Case 1 #############

// console.log("start")
// setTimeout(function cb() {
//     console.log("callback")
// }, 5000)
// console.log("End")
// 1M Line of Code
// The callback function will wait for the 1 million lines of code to complete execution inside the call stack.
// Once the call stack is empty, the callback is moved from the macro task queue to the call stack for execution.




// ########### Case 2 #############

// console.log("start")
// setTimeout(function cb() {
//     console.log("callback")
// }, 0)
// console.log("End")



// ########### Case 3 ##############

console.log("start")

setTimeout(function cb() {
    console.log("callback")
}, 5000)

console.log("end")

let startDate = new Date().getTime() // startDate in ms]

let endDate = startDate // endDate in ms.

// We're purposely creating a delay of 10 seconds and we're blocking the main thread. 
// While loop runs for 10 seconds . 

while (endDate < startDate + 10000) {
    endDate = new Date().getTime();
}

console.log("While expires")

// (startDate + 10000) is fixed in each iteration whereas (endDate) is variable in each iteration.