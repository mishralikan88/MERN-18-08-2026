// const array = [5, 1, 3, 2, 6]

// function findMax(arr) {
//     let max = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > max) {
//             max = arr[i]
//         }
//     }
//     return max
// }

// console.log(findMax(array))


// const max = array.reduce(function (max, curr, i, item) {
//     if (curr > max) {
//         max = curr
//     }
//     return max // new max
// }, 0)

// console.log(max)

// function findSum(arr) {
//     let sum = 0
//     for (let i = 0; i < arr.length; i++) {
//         sum = sum + arr[i]
//     }
//     return sum
// }

// console.log(findSum(array))

// const sum = array.reduce(function (acc, curr, i, item) {
//     acc = acc + curr
//     return acc // new acc
// }, 0)

// console.log(sum)

// Map Example 1

const users = [
    { firstName: "Alok", lastName: "Raj", age: 23 },
    { firstName: "Ashis", lastName: "Kumar", age: 29 },
    { firstName: "Ankit", lastName: "Roy", age: 29 },
    { firstName: "Amarnath", lastName: "Mishra", age: 30 }
]
const fullName = users.map((user) => {
    return user.firstName + " " + user.lastName
})
console.log(fullName)

// const usersAgeLessThanThirty = users.filter((user) => {
//     return user.age < 30 // Returns the array elements that satisfy this condition
// })

// console.log(usersAgeLessThanThirty)

// const usersFirstName = usersAgeLessThanThirty.map((user)=>{
// return user.firstName // Returns a modified array where the elements are the first names of the users
// })

// console.log(usersFirstName)



// HOF chaining

const userFirstNameWithAgeLessThanThirty = users.filter(user => user.age < 30).map(user => user.firstName)

// console.log(userFirstNameWithAgeLessThanThirty)

// using reduce :

const userFirstNameWithAgeLessThanThirtyReducedWay = users.reduce(function (acc, curr, i, arr) {
    if (curr.age < 30) {
        acc.push(curr.firstName)
    }
    return acc
}, [])

console.log(">>>>>", userFirstNameWithAgeLessThanThirtyReducedWay)