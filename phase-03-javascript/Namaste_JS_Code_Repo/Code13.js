// callback example - 1

// setTimeout(function(){
//     console.log("Timer")
// },3000)

// callback function y doesn't get called immidiately. It is x's responsibility to call the function y .Thats why the name of call back function is call back.

// function x(y){
//     console.log("x")
//     y()
// }
// x(function y(){
//     console.log("y")
// })

// console.log("Random value:",Math.floor(Math.random()*100))

// callback example - 2

function printStr(str, cb) {
    setTimeout(() => {
        console.log(str)
        cb()
    }, Math.floor(Math.random() * 100) + 1)
}


function printCallbacks() {
    printStr("A", () => {
        printStr("B", () => {
            printStr("C", () => { console.log("deep callback function") })
        })
    })
}

printCallbacks()