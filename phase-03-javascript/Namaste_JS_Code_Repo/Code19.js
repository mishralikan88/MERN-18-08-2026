// Map : 

const array = [5, 1, 3, 2, 6]

function double(curr) {
    return curr * 2
}

// const doubleArray = array.map(double)

// console.log(doubleArray)


Array.prototype.myMap = function (cb) {
    let arr = []
    for (let i = 0; i < this.length; i++) {
        arr.push(cb(this[i]))
    }
    return arr
}

function double(item) {
    return item * 2
}

console.log(array.myMap(double))

// Binary

console.log(array.map((x) => x.toString(2)))


// Filter :

const OriginalArray = [5, 1, 3, 2, 6]

Array.prototype.myFilter = function (cb) {
    let isOdd = []
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i])) {
            isOdd.push(this[i])
        }
    }
    return isOdd
}

function isOdd(num) {
    return num % 2 !== 0
}

console.log(OriginalArray.myFilter(isOdd))

// console.log(OriginalArray.filter((currentELement)=> currentELement % 2 !== 0))



// Reduce :

const reduceArray = [5, 1, 3, 2, 6]

// const sumScalar = reduceArray.reduce(function (acc, curr, index, reduceArray) {
//     acc = acc + curr
//     return acc
// }, 0)

console.log("sum scalar value")

console.log(sumScalar)