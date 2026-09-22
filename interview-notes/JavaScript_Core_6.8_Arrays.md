# 6.8 Arrays 🔥🔥🔥

Arrays are one of the most important parts of JavaScript interviews and machine coding.

An array stores multiple values inside one variable.

```js
const employees = ["Rahul", "Amit", "John"];
```

Instead of:

```js
const employee1 = "Rahul";
const employee2 = "Amit";
const employee3 = "John";
```

we use:

```text
Array
↓
multiple related values
↓
one variable
```

Arrays are used constantly for:

```text
API lists
employees
products
orders
search results
table data
pagination
filters
sorting
totals
grouping
machine coding
```

---

# 1. Creating an Array

```js
const employees = ["Rahul", "Amit", "John"];
```

Each value is called an:

```text
element
or
item
```

Indexes:

```text
0 → Rahul
1 → Amit
2 → John
```

Important:

```text
JavaScript arrays start from index 0.
```

---

# 2. Access an Array Item

```js
const employees = ["Rahul", "Amit", "John"];

console.log(employees[0]);
```

Output:

```text
Rahul
```

Another:

```js
console.log(employees[2]);
```

Output:

```text
John
```

---

# 3. Accessing an Invalid Index

```js
const employees = ["Rahul", "Amit"];

console.log(employees[10]);
```

Output:

```text
undefined
```

JavaScript does not throw an error for a missing array index.

---

# 4. Update an Array Item

```js
const employees = ["Rahul", "Amit", "John"];

employees[1] = "Sara";

console.log(employees);
```

Output:

```text
["Rahul", "Sara", "John"]
```

Arrays are mutable.

---

# 5. `const` Array Can Still Change 🔥🔥🔥

```js
const employees = ["Rahul"];

employees.push("Amit");
```

This works.

But:

```js
employees = [];
```

❌ Error.

Why?

```text
const
→ prevents reassignment

const
does NOT make the array immutable
```

You can modify its contents.

---

# 6. `length`

```js
const employees = ["Rahul", "Amit", "John"];

console.log(employees.length);
```

Output:

```text
3
```

Remember:

```text
last index
=
length - 1
```

So:

```js
employees[employees.length - 1];
```

returns:

```text
John
```

---

# 7. `at()` 🔥

Modern JavaScript provides:

```js
array.at(index)
```

Example:

```js
const employees = ["Rahul", "Amit", "John"];

console.log(employees.at(0));
```

Output:

```text
Rahul
```

Main benefit:

```js
console.log(employees.at(-1));
```

Output:

```text
John
```

So:

```text
array.at(-1)
→ last item
```

---

# 8. Check Whether a Value Is an Array 🔥🔥🔥

Do not use:

```js
typeof [];
```

because output is:

```text
object
```

Correct:

```js
Array.isArray([]);
```

Output:

```text
true
```

Example:

```js
const data = ["React", "Node"];

if (Array.isArray(data)) {
  console.log("Array received");
}
```

---

# 9. Iterate an Array

Traditional loop:

```js
const employees = ["Rahul", "Amit", "John"];

for (let i = 0; i < employees.length; i++) {
  console.log(employees[i]);
}
```

Modern clean version:

```js
for (const employee of employees) {
  console.log(employee);
}
```

We'll also use array methods like:

```text
forEach()
map()
filter()
reduce()
```

---

# 10. `push()` 🔥🔥

Adds item(s) to the end.

```js
const employees = ["Rahul", "Amit"];

employees.push("John");

console.log(employees);
```

Output:

```text
["Rahul", "Amit", "John"]
```

---

# 11. `push()` Return Value

Important interview point:

```js
const employees = ["Rahul", "Amit"];

const result = employees.push("John");

console.log(result);
```

Output:

```text
3
```

`push()` returns:

```text
new array length
```

not the array.

---

# 12. `pop()`

Removes the last item.

```js
const employees = ["Rahul", "Amit", "John"];

const removed = employees.pop();

console.log(removed);
console.log(employees);
```

Output:

```text
John
["Rahul", "Amit"]
```

`pop()` returns the removed item.

---

# 13. `unshift()`

Adds item(s) to the beginning.

```js
const employees = ["Amit", "John"];

employees.unshift("Rahul");

console.log(employees);
```

Output:

```text
["Rahul", "Amit", "John"]
```

---

# 14. `shift()`

Removes the first item.

```js
const employees = ["Rahul", "Amit", "John"];

const removed = employees.shift();

console.log(removed);
```

Output:

```text
Rahul
```

Array becomes:

```text
["Amit", "John"]
```

---

# 15. `push/pop` vs `shift/unshift`

```text
push()
→ add at end

pop()
→ remove from end

unshift()
→ add at start

shift()
→ remove from start
```

In large arrays:

```text
push/pop
```

are generally cheaper than:

```text
shift/unshift
```

because inserting/removing at the beginning can require index shifting.

---

# 16. `slice()` 🔥🔥🔥

`slice()` extracts part of an array.

Important:

```text
slice()
→ does NOT mutate original array
```

Example:

```js
const numbers = [10, 20, 30, 40, 50];

const result = numbers.slice(1, 4);

console.log(result);
```

Output:

```text
[20, 30, 40]
```

Rule:

```text
start index included
end index excluded
```

---

# 17. `slice()` With One Argument

```js
const numbers = [10, 20, 30, 40];

console.log(numbers.slice(2));
```

Output:

```text
[30, 40]
```

Meaning:

```text
start at index 2
continue to end
```

---

# 18. `slice()` With Negative Index

```js
const numbers = [10, 20, 30, 40];

console.log(numbers.slice(-2));
```

Output:

```text
[30, 40]
```

Useful for getting items from the end.

---

# 19. Copy an Array With `slice()`

```js
const original = [1, 2, 3];

const copy = original.slice();

console.log(copy);
```

Output:

```text
[1, 2, 3]
```

But remember:

```text
This is a shallow copy.
```

Nested objects are still shared.

---

# 20. Spread Copy 🔥🔥🔥

Modern syntax:

```js
const original = [1, 2, 3];

const copy = [...original];
```

Again:

```text
shallow copy
```

not deep copy.

---

# 21. Shallow Copy Trap 🔥🔥🔥

```js
const original = [
  { name: "Rahul" },
];

const copy = [...original];

copy[0].name = "Amit";

console.log(original[0].name);
```

Output:

```text
Amit
```

Why?

The outer array was copied.

But the inner object reference is shared.

We'll cover shallow vs deep copy deeply later.

---

# 22. `splice()` 🔥🔥🔥

`splice()` can:

```text
remove items
add items
replace items
```

Important:

```text
splice()
→ MUTATES original array
```

Syntax:

```js
array.splice(start, deleteCount, ...items)
```

---

# 23. Remove With `splice()`

```js
const employees = [
  "Rahul",
  "Amit",
  "John",
  "Sara",
];

const removed = employees.splice(1, 2);

console.log(removed);
console.log(employees);
```

Output:

```text
["Amit", "John"]
["Rahul", "Sara"]
```

Meaning:

```text
start at index 1
remove 2 items
```

---

# 24. Add With `splice()`

```js
const employees = ["Rahul", "John"];

employees.splice(1, 0, "Amit");

console.log(employees);
```

Output:

```text
["Rahul", "Amit", "John"]
```

Here:

```text
deleteCount = 0
```

so nothing is removed.

---

# 25. Replace With `splice()`

```js
const employees = [
  "Rahul",
  "Amit",
  "John",
];

employees.splice(1, 1, "Sara");

console.log(employees);
```

Output:

```text
["Rahul", "Sara", "John"]
```

---

# 26. `slice()` vs `splice()` 🔥🔥🔥

Very common interview question.

```text
slice()
→ extracts/copies
→ original array unchanged

splice()
→ add/remove/replace
→ original array mutated
```

Easy memory:

```text
slice = copy

splice = change
```

---

# 27. `includes()` 🔥🔥

Checks whether an array contains a value.

```js
const skills = [
  "React",
  "JavaScript",
  "Node",
];

console.log(skills.includes("React"));
```

Output:

```text
true
```

---

# 28. `indexOf()`

Returns the first matching index.

```js
const skills = [
  "React",
  "Node",
  "React",
];

console.log(skills.indexOf("React"));
```

Output:

```text
0
```

If not found:

```js
console.log(skills.indexOf("Angular"));
```

Output:

```text
-1
```

---

# 29. `lastIndexOf()`

Returns the last matching index.

```js
const skills = [
  "React",
  "Node",
  "React",
];

console.log(skills.lastIndexOf("React"));
```

Output:

```text
2
```

---

# 30. `find()` 🔥🔥🔥

`find()` returns the first element that matches a condition.

```js
const employees = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" },
  { id: 3, name: "John" },
];

const employee = employees.find(
  (employee) => employee.id === 2
);

console.log(employee);
```

Result:

```js
{
  id: 2,
  name: "Amit"
}
```

---

# 31. `find()` When Nothing Matches

```js
const result = employees.find(
  (employee) => employee.id === 100
);
```

Result:

```text
undefined
```

---

# 32. `findIndex()`

Returns the index of the first matching item.

```js
const index = employees.findIndex(
  (employee) => employee.id === 2
);

console.log(index);
```

Output:

```text
1
```

If not found:

```text
-1
```

---

# 33. `forEach()` 🔥🔥

Used to execute logic for every item.

```js
const employees = ["Rahul", "Amit", "John"];

employees.forEach((employee) => {
  console.log(employee);
});
```

Output:

```text
Rahul
Amit
John
```

---

# 34. `forEach()` Return Value 🔥🔥

Important:

```js
const result = [1, 2, 3].forEach(
  (number) => number * 2
);

console.log(result);
```

Output:

```text
undefined
```

`forEach()` is for:

```text
side effects
```

not for creating a transformed array.

---

# 35. `map()` 🔥🔥🔥

`map()` transforms every item and returns a new array.

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(
  (number) => number * 2
);

console.log(doubled);
```

Output:

```text
[2, 4, 6]
```

Original:

```text
[1, 2, 3]
```

remains unchanged.

---

# 36. Real `map()` Example

```js
const employees = [
  { name: "Rahul", salary: 50000 },
  { name: "Amit", salary: 60000 },
];

const names = employees.map(
  (employee) => employee.name
);

console.log(names);
```

Output:

```text
["Rahul", "Amit"]
```

Use `map()` when:

```text
input array
↓
transform each item
↓
new array
```

---

# 37. `map()` Updating Objects

```js
const employees = [
  { id: 1, name: "Rahul", salary: 50000 },
  { id: 2, name: "Amit", salary: 60000 },
];

const updated = employees.map((employee) => ({
  ...employee,
  salary: employee.salary + 5000,
}));
```

This creates new employee objects.

Very important for:

```text
React state
Redux
immutable updates
API transformations
```

---

# 38. `filter()` 🔥🔥🔥

`filter()` keeps items that match a condition.

```js
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(
  (number) => number % 2 === 0
);

console.log(evenNumbers);
```

Output:

```text
[2, 4, 6]
```

---

# 39. Real `filter()` Example

```js
const employees = [
  { name: "Rahul", active: true },
  { name: "Amit", active: false },
  { name: "John", active: true },
];

const activeEmployees = employees.filter(
  (employee) => employee.active
);
```

Result contains:

```text
Rahul
John
```

---

# 40. `map()` vs `filter()` 🔥🔥🔥

```text
map()
→ transform every item
→ output length usually same

filter()
→ keep/remove items
→ output length may be smaller
```

Example:

```js
[1, 2, 3].map(x => x * 2)
```

Output:

```text
[2, 4, 6]
```

Example:

```js
[1, 2, 3].filter(x => x > 1)
```

Output:

```text
[2, 3]
```

---

# 41. `reduce()` 🔥🔥🔥

`reduce()` combines an array into a single accumulated result.

Example:

```js
const numbers = [10, 20, 30];

const total = numbers.reduce(
  (accumulator, number) => {
    return accumulator + number;
  },
  0
);

console.log(total);
```

Output:

```text
60
```

---

# 42. Understand `reduce()`

```text
accumulator
→ running result

number
→ current array item

0
→ initial accumulator value
```

Flow:

```text
acc = 0

0 + 10
→ 10

10 + 20
→ 30

30 + 30
→ 60
```

---

# 43. Short `reduce()` Syntax

```js
const total = numbers.reduce(
  (acc, number) => acc + number,
  0
);
```

---

# 44. Real `reduce()` — Total Salary

```js
const employees = [
  { name: "Rahul", salary: 50000 },
  { name: "Amit", salary: 60000 },
];

const totalSalary = employees.reduce(
  (total, employee) =>
    total + employee.salary,
  0
);

console.log(totalSalary);
```

Output:

```text
110000
```

---

# 45. `reduce()` Can Build Objects 🔥🔥🔥

Frequency map:

```js
const skills = [
  "React",
  "Node",
  "React",
];

const frequency = skills.reduce(
  (acc, skill) => {
    acc[skill] = (acc[skill] ?? 0) + 1;

    return acc;
  },
  {}
);

console.log(frequency);
```

Result:

```js
{
  React: 2,
  Node: 1
}
```

Very important interview pattern.

---

# 46. `some()` 🔥🔥

Returns `true` if at least one item matches.

```js
const numbers = [1, 3, 5, 8];

const hasEven = numbers.some(
  (number) => number % 2 === 0
);

console.log(hasEven);
```

Output:

```text
true
```

Easy memory:

```text
some()
→ at least one?
```

---

# 47. `every()`

Returns `true` only if all items match.

```js
const numbers = [2, 4, 6];

const allEven = numbers.every(
  (number) => number % 2 === 0
);

console.log(allEven);
```

Output:

```text
true
```

Easy memory:

```text
every()
→ all?
```

---

# 48. `some()` vs `every()`

```text
some()
→ one match is enough

every()
→ all items must match
```

Very useful for:

```text
form validation
permissions
selection state
business rules
```

---

# 49. `sort()` 🔥🔥🔥

`sort()` sorts an array.

Important:

```text
sort()
→ MUTATES original array
```

Example:

```js
const names = ["John", "Amit", "Rahul"];

names.sort();

console.log(names);
```

Output:

```text
["Amit", "John", "Rahul"]
```

---

# 50. Numeric Sort Trap 🔥🔥🔥

This:

```js
const numbers = [100, 2, 30, 10];

numbers.sort();

console.log(numbers);
```

does NOT produce normal numeric ordering.

Why?

Default `sort()` compares values as strings.

Use:

```js
numbers.sort((a, b) => a - b);
```

Ascending:

```text
[2, 10, 30, 100]
```

---

# 51. Descending Numeric Sort

```js
numbers.sort((a, b) => b - a);
```

Result:

```text
[100, 30, 10, 2]
```

Easy memory:

```text
a - b
→ ascending

b - a
→ descending
```

---

# 52. Sort Objects by Number

```js
const employees = [
  { name: "Rahul", salary: 70000 },
  { name: "Amit", salary: 50000 },
  { name: "John", salary: 90000 },
];

employees.sort(
  (a, b) => a.salary - b.salary
);
```

Ascending salary.

---

# 53. Sort Strings Inside Objects

```js
employees.sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

This is better than trying:

```js
a.name - b.name
```

because strings are not numbers.

---

# 54. Avoid Mutating Original During Sort 🔥🔥🔥

Because `sort()` mutates:

```js
const sorted = [...employees].sort(
  (a, b) => a.salary - b.salary
);
```

Now:

```text
employees
→ unchanged

sorted
→ new sorted array
```

Very important with React state.

---

# 55. `toSorted()` — Awareness

Modern JavaScript provides:

```js
const sorted = employees.toSorted(
  (a, b) => a.salary - b.salary
);
```

Unlike `sort()`:

```text
toSorted()
→ returns a new array
→ does not mutate original
```

Know it for modern JavaScript awareness.

---

# 56. `concat()`

Combines arrays.

```js
const frontend = ["React", "Vue"];
const backend = ["Node", "Express"];

const skills = frontend.concat(backend);

console.log(skills);
```

Output:

```text
["React", "Vue", "Node", "Express"]
```

Original arrays are unchanged.

---

# 57. Spread Merge

Modern alternative:

```js
const skills = [
  ...frontend,
  ...backend,
];
```

Very common.

---

# 58. `join()` 🔥

Converts array items into a string.

```js
const skills = [
  "React",
  "Node",
  "MongoDB",
];

console.log(skills.join(", "));
```

Output:

```text
React, Node, MongoDB
```

Useful for:

```text
display text
CSV-like strings
labels
URLs
```

---

# 59. `reverse()`

Reverses the array.

```js
const numbers = [1, 2, 3];

numbers.reverse();

console.log(numbers);
```

Output:

```text
[3, 2, 1]
```

Important:

```text
reverse()
→ MUTATES original array
```

---

# 60. Avoid Reverse Mutation

Use:

```js
const reversed = [...numbers].reverse();
```

or modern:

```js
numbers.toReversed();
```

Awareness is enough for `toReversed()`.

---

# 61. `flat()` 🔥🔥

Flattens nested arrays.

```js
const numbers = [
  1,
  [2, 3],
  4,
];

console.log(numbers.flat());
```

Output:

```text
[1, 2, 3, 4]
```

Default depth:

```text
1
```

---

# 62. `flat(2)`

```js
const values = [
  1,
  [2, [3, 4]],
];

console.log(values.flat(2));
```

Output:

```text
[1, 2, 3, 4]
```

For deeply nested arrays:

```js
values.flat(Infinity);
```

can flatten all levels.

---

# 63. `flatMap()` 🔥🔥

`flatMap()` is basically:

```text
map()
+
flat(1)
```

Example:

```js
const words = [
  "hello world",
  "javascript arrays",
];

const result = words.flatMap(
  (text) => text.split(" ")
);

console.log(result);
```

Output:

```text
[
  "hello",
  "world",
  "javascript",
  "arrays"
]
```

---

# 64. `fill()`

Fills array positions with the same value.

```js
const values = [1, 2, 3, 4];

values.fill(0);

console.log(values);
```

Output:

```text
[0, 0, 0, 0]
```

Important:

```text
fill()
→ mutates array
```

---

# 65. `Array.from()` 🔥🔥

Creates an array from an iterable or array-like value.

Example:

```js
const text = "ABC";

console.log(Array.from(text));
```

Output:

```text
["A", "B", "C"]
```

---

# 66. `Array.from()` With Mapping

```js
const numbers = Array.from(
  { length: 5 },
  (_, index) => index + 1
);

console.log(numbers);
```

Output:

```text
[1, 2, 3, 4, 5]
```

Useful for generating ranges.

---

# 67. `Array.of()`

Creates an array from arguments.

```js
const values = Array.of(1, 2, 3);

console.log(values);
```

Output:

```text
[1, 2, 3]
```

Lower practical priority, but know it.

---

# 68. Remove Duplicates With `Set` 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  2,
  3,
  3,
];

const unique = [
  ...new Set(numbers),
];

console.log(unique);
```

Output:

```text
[1, 2, 3]
```

Very common interview pattern.

---

# 69. Find Duplicates — Frequency Pattern

```js
const numbers = [
  1,
  2,
  2,
  3,
  3,
  3,
];

const frequency = {};

for (const number of numbers) {
  frequency[number] =
    (frequency[number] ?? 0) + 1;
}
```

Now:

```js
const duplicates = Object.keys(
  frequency
).filter(
  (key) => frequency[key] > 1
);
```

This pattern is useful for many interview problems.

---

# 70. Search API Data 🔥🔥🔥

```js
const employees = [
  { name: "Rahul Sharma" },
  { name: "Amit Kumar" },
  { name: "John Doe" },
];

const searchTerm = "rah";

const result = employees.filter(
  (employee) =>
    employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);
```

Result:

```text
Rahul Sharma
```

This is a classic machine-coding search pattern.

---

# 71. Pagination With `slice()` 🔥🔥🔥

Suppose:

```js
const employees = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const page = 2;
const pageSize = 2;
```

Calculate:

```js
const start =
  (page - 1) * pageSize;

const end =
  start + pageSize;
```

Then:

```js
const pageData =
  employees.slice(start, end);

console.log(pageData);
```

Output:

```text
["C", "D"]
```

This is very important machine-coding logic.

---

# 72. Pagination Formula 🧠

```text
start
=
(page - 1) * pageSize

end
=
start + pageSize
```

Then:

```js
array.slice(start, end);
```

---

# 73. Find Min / Max

```js
const salaries = [
  50000,
  80000,
  60000,
];

console.log(
  Math.max(...salaries)
);
```

Output:

```text
80000
```

Minimum:

```js
Math.min(...salaries);
```

---

# 74. Array to Object Index 🔥🔥🔥

Suppose:

```js
const employees = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" },
];
```

Convert to:

```text
{
  1: employee1,
  2: employee2
}
```

Using `reduce()`:

```js
const employeeById =
  employees.reduce(
    (acc, employee) => {
      acc[employee.id] = employee;

      return acc;
    },
    {}
  );
```

Useful for:

```text
fast lookup
normalized state
API transformations
```

---

# 75. Group by Property 🔥🔥🔥

```js
const employees = [
  { name: "Rahul", department: "UI" },
  { name: "Amit", department: "API" },
  { name: "John", department: "UI" },
];

const grouped =
  employees.reduce(
    (acc, employee) => {
      const department =
        employee.department;

      if (!acc[department]) {
        acc[department] = [];
      }

      acc[department].push(employee);

      return acc;
    },
    {}
  );
```

Result conceptually:

```text
UI
├── Rahul
└── John

API
└── Amit
```

Very important interview and API transformation pattern.

---

# 76. Chain Array Methods 🔥🔥🔥

You can combine methods.

Example:

```js
const employees = [
  { name: "Rahul", salary: 80000, active: true },
  { name: "Amit", salary: 40000, active: false },
  { name: "John", salary: 90000, active: true },
];

const names =
  employees
    .filter(
      (employee) => employee.active
    )
    .map(
      (employee) => employee.name
    );

console.log(names);
```

Output:

```text
["Rahul", "John"]
```

Flow:

```text
employees
↓
filter active
↓
map to names
```

---

# 77. Method Chaining Readability

Good:

```js
const result = employees
  .filter((employee) => employee.active)
  .sort((a, b) => b.salary - a.salary)
  .map((employee) => employee.name);
```

But don't create extremely long chains if they become hard to debug.

You can split:

```js
const activeEmployees =
  employees.filter(...);

const sortedEmployees =
  activeEmployees.toSorted(...);

const names =
  sortedEmployees.map(...);
```

Readable code matters.

---

# 78. Mutating vs Non-Mutating Methods 🔥🔥🔥

Important interview distinction.

Common mutating methods:

```text
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
fill()
```

Common non-mutating methods:

```text
slice()
concat()
map()
filter()
reduce()
find()
findIndex()
some()
every()
includes()
join()
flat()
flatMap()
```

This matters heavily in React.

---

# 79. React / State Mutation Trap 🔥🔥🔥

Bad:

```js
employees.push(newEmployee);
setEmployees(employees);
```

Problem:

```text
original array mutated
same reference may be reused
```

Better:

```js
setEmployees([
  ...employees,
  newEmployee,
]);
```

Same idea for removal:

```js
setEmployees(
  employees.filter(
    (employee) =>
      employee.id !== id
  )
);
```

---

# 80. Update One Object in an Array 🔥🔥🔥

```js
const updatedEmployees =
  employees.map((employee) =>
    employee.id === 2
      ? {
          ...employee,
          salary: 70000,
        }
      : employee
  );
```

Very important machine-coding / React pattern.

Mental model:

```text
matching item
→ return updated copy

other items
→ return unchanged
```

---

# 81. Remove One Item

```js
const updatedEmployees =
  employees.filter(
    (employee) =>
      employee.id !== 2
  );
```

This creates a new array without the matching employee.

---

# 82. Add One Item

```js
const updatedEmployees = [
  ...employees,
  newEmployee,
];
```

Add at start:

```js
const updatedEmployees = [
  newEmployee,
  ...employees,
];
```

---

# 83. Interview Output — `push()`

```js
const arr = [1, 2];

const result = arr.push(3);

console.log(result);
console.log(arr);
```

Output:

```text
3
[1, 2, 3]
```

Remember:

```text
push()
returns new length
```

---

# 84. Interview Output — `pop()`

```js
const arr = [1, 2, 3];

const result = arr.pop();

console.log(result);
console.log(arr);
```

Output:

```text
3
[1, 2]
```

---

# 85. Interview Output — `slice()`

```js
const arr = [10, 20, 30, 40];

console.log(arr.slice(1, 3));
console.log(arr);
```

Output:

```text
[20, 30]
[10, 20, 30, 40]
```

Original unchanged.

---

# 86. Interview Output — `splice()`

```js
const arr = [10, 20, 30, 40];

const removed =
  arr.splice(1, 2);

console.log(removed);
console.log(arr);
```

Output:

```text
[20, 30]
[10, 40]
```

Original changed.

---

# 87. Interview Output — `map()`

```js
const arr = [1, 2, 3];

const result =
  arr.map((value) => value * 2);

console.log(result);
console.log(arr);
```

Output:

```text
[2, 4, 6]
[1, 2, 3]
```

---

# 88. Interview Output — `filter()`

```js
const arr = [1, 2, 3, 4];

const result =
  arr.filter((value) => value > 2);

console.log(result);
```

Output:

```text
[3, 4]
```

---

# 89. Interview Output — `find()` vs `filter()` 🔥🔥🔥

```js
const numbers = [2, 4, 6, 8];

console.log(
  numbers.find(
    (number) => number > 4
  )
);
```

Output:

```text
6
```

But:

```js
console.log(
  numbers.filter(
    (number) => number > 4
  )
);
```

Output:

```text
[6, 8]
```

Difference:

```text
find()
→ first matching item

filter()
→ all matching items
```

---

# 90. Interview Output — `some()` vs `every()`

```js
const numbers = [2, 4, 5];

console.log(
  numbers.some(
    (number) => number % 2 === 0
  )
);
```

Output:

```text
true
```

```js
console.log(
  numbers.every(
    (number) => number % 2 === 0
  )
);
```

Output:

```text
false
```

---

# 91. Interview Question — `map()` vs `forEach()` 🔥🔥🔥

Good answer:

```text
map()
→ transforms items
→ returns a new array

forEach()
→ runs a callback for each item
→ returns undefined
```

Use:

```text
map()
```

when you need a new transformed array.

Use:

```text
forEach()
```

for side effects.

---

# 92. Interview Question — `find()` vs `filter()`

Good answer:

```text
find()
→ first matching element
→ returns element or undefined

filter()
→ all matching elements
→ always returns an array
```

---

# 93. Interview Question — `slice()` vs `splice()` 🔥🔥🔥

Good answer:

```text
slice()
→ non-mutating
→ extracts a portion

splice()
→ mutating
→ add/remove/replace items
```

---

# 94. Interview Question — Does `sort()` Mutate?

Yes.

```text
sort()
→ mutates the original array
```

Safer when original should remain unchanged:

```js
const sorted = [...arr].sort(...);
```

or:

```js
arr.toSorted(...);
```

---

# 95. Debugging Problem — Numeric Sort 🔥🔥🔥

Bad:

```js
const numbers = [
  100,
  2,
  30,
];

numbers.sort();
```

Problem:

```text
default sort
→ string-based comparison
```

Fix:

```js
numbers.sort(
  (a, b) => a - b
);
```

---

# 96. Debugging Problem — Missing `return` in `map()` 🔥🔥🔥

Bad:

```js
const result = [1, 2, 3].map(
  (number) => {
    number * 2;
  }
);

console.log(result);
```

Output:

```text
[
  undefined,
  undefined,
  undefined
]
```

Why?

Block-bodied arrow function requires explicit `return`.

Fix:

```js
const result = [1, 2, 3].map(
  (number) => {
    return number * 2;
  }
);
```

or:

```js
const result =
  [1, 2, 3].map(
    (number) => number * 2
  );
```

---

# 97. Debugging Problem — Mutation During Iteration

```js
const numbers = [1, 2, 2, 3];

for (
  let i = 0;
  i < numbers.length;
  i++
) {
  if (numbers[i] === 2) {
    numbers.splice(i, 1);
  }
}
```

One `2` may be skipped because indexes shift.

Better when you want a new array:

```js
const result =
  numbers.filter(
    (number) => number !== 2
  );
```

---

# 98. Machine-Coding Decision Guide 🔥🔥🔥

Ask:

```text
Need every item transformed?
→ map()

Need only matching items?
→ filter()

Need first matching item?
→ find()

Need matching index?
→ findIndex()

Need one final result?
→ reduce()

Need at least one match?
→ some()

Need all items to match?
→ every()

Need simple side effect?
→ forEach()

Need early break / continue?
→ for...of

Need portion of array?
→ slice()

Need to mutate positions?
→ splice()
```

---

# Quick Memory 🧠

Creation:

```js
const arr = [];
```

Access:

```js
arr[0]
arr.at(-1)
```

Add/remove:

```text
push()    → add end
pop()     → remove end
unshift() → add start
shift()   → remove start
```

Copy/extract:

```text
slice()
[...arr]
Array.from()
```

Search:

```text
includes()
indexOf()
lastIndexOf()
find()
findIndex()
```

Transform / iterate:

```text
forEach()
map()
filter()
reduce()
some()
every()
```

Sorting:

```text
sort()
toSorted()
```

Other useful methods:

```text
concat()
join()
reverse()
flat()
flatMap()
fill()
at()
```

Most important differences:

```text
map()
→ transform

filter()
→ select

find()
→ first match

reduce()
→ accumulate

some()
→ any?

every()
→ all?
```

Mutation awareness:

```text
MUTATES

push
pop
shift
unshift
splice
sort
reverse
fill
```

Common non-mutating methods:

```text
slice
map
filter
reduce
find
some
every
concat
flat
flatMap
```

Most important machine-coding patterns:

```text
search
filter
sort
pagination
totals
deduplication
frequency counting
grouping
update item
remove item
API transformation
```

## ✅ 6.8 Arrays complete

**Next: 6.9 Objects 🔥🔥🔥**
