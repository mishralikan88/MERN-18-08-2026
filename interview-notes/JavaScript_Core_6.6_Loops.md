# 6.6 Loops 🔥🔥

Loops let us repeat code.

Instead of writing:

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

we can write:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Loops are heavily used in:

```text
arrays
API data
pagination
batch processing
search
totals
nested data
coding problems
machine coding
```

---

# 1. Main Loops You Need

For JavaScript interviews and practical coding, focus on:

```text
for
while
do...while
for...of
for...in
break
continue
nested loops
```

Also remember:

```text
forEach()
map()
filter()
reduce()
```

are array methods, not language-level loops.

We will cover them deeply under Arrays.

---

# 2. `for` Loop 🔥🔥🔥

Basic syntax:

```js
for (initialization; condition; update) {
  // code
}
```

Example:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Output:

```text
1
2
3
4
5
```

---

# 3. Understand the `for` Loop Flow

This:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

works like:

```text
Step 1
let i = 1

Step 2
check i <= 3

Step 3
run loop body

Step 4
i++

Step 5
check condition again
```

Flow:

```text
i = 1
↓
1 <= 3 → true
↓
print 1
↓
i becomes 2
↓
2 <= 3 → true
↓
print 2
↓
i becomes 3
↓
3 <= 3 → true
↓
print 3
↓
i becomes 4
↓
4 <= 3 → false
↓
stop
```

---

# 4. Three Parts of a `for` Loop

```js
for (let i = 0; i < 5; i++) {
}
```

Break it into:

```text
let i = 0
→ initialization

i < 5
→ condition

i++
→ update
```

These are the three things you should immediately identify in a loop.

---

# 5. Why Arrays Usually Start at `0`

Suppose:

```js
const employees = ["Rahul", "Amit", "John"];
```

Indexes are:

```text
0 → Rahul
1 → Amit
2 → John
```

So the common loop is:

```js
for (let i = 0; i < employees.length; i++) {
  console.log(employees[i]);
}
```

Output:

```text
Rahul
Amit
John
```

---

# 6. Why We Use `< length`, Not `<= length` 🔥🔥🔥

Correct:

```js
for (let i = 0; i < employees.length; i++) {
  console.log(employees[i]);
}
```

For 3 items:

```text
length = 3
valid indexes = 0, 1, 2
```

If you write:

```js
i <= employees.length
```

then `i` eventually becomes:

```text
3
```

and:

```js
employees[3]
```

is:

```text
undefined
```

This is a very common off-by-one bug.

---

# 7. Practical Array Loop

```js
const salaries = [50000, 60000, 70000];

for (let i = 0; i < salaries.length; i++) {
  console.log(salaries[i]);
}
```

Output:

```text
50000
60000
70000
```

---

# 8. Calculate Total With `for` 🔥🔥🔥

```js
const salaries = [50000, 60000, 70000];

let total = 0;

for (let i = 0; i < salaries.length; i++) {
  total += salaries[i];
}

console.log(total);
```

Output:

```text
180000
```

Flow:

```text
total = 0

+ 50000
→ 50000

+ 60000
→ 110000

+ 70000
→ 180000
```

This same pattern later becomes:

```js
reduce()
```

---

# 9. Find an Item With a `for` Loop

```js
const employees = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" },
  { id: 3, name: "John" },
];

let foundEmployee = null;

for (let i = 0; i < employees.length; i++) {
  if (employees[i].id === 2) {
    foundEmployee = employees[i];
    break;
  }
}

console.log(foundEmployee);
```

Output:

```js
{
  id: 2,
  name: "Amit"
}
```

Notice:

```text
break
```

stops the loop once the employee is found.

---

# 10. Reverse Loop

You can loop backward.

```js
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
```

Output:

```text
5
4
3
2
1
```

Useful for:

```text
reverse traversal
some coding problems
processing items from end
```

---

# 11. Loop by Steps

You don't always need:

```js
i++
```

Example:

```js
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}
```

Output:

```text
0
2
4
6
8
10
```

---

# 12. Practical Even Numbers

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
```

Output:

```text
2
4
6
8
10
```

---

# 13. `while` Loop 🔥🔥

Syntax:

```js
while (condition) {
  // code
}
```

Example:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

Output:

```text
1
2
3
4
5
```

---

# 14. When Is `while` Useful?

Use `while` when:

```text
you don't necessarily know the exact number of iterations
```

Example idea:

```text
Keep fetching pages
while another page exists
```

or:

```text
Keep retrying
while attempts remain
```

---

# 15. `for` vs `while`

Use `for` when:

```text
iteration count / index progression is clear
```

Example:

```js
for (let i = 0; i < 10; i++) {
}
```

Use `while` when:

```text
you mainly care about a condition
```

Example:

```js
while (hasNextPage) {
}
```

---

# 16. Important `while` Bug — Infinite Loop 🔥🔥🔥

Bad:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
}
```

Problem:

```text
count never changes
```

So condition remains:

```text
count <= 5
```

forever.

This creates an infinite loop.

Correct:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

---

# 17. Practical `while` — Retry Example

```js
let attempts = 0;
const maxAttempts = 3;

while (attempts < maxAttempts) {
  attempts++;

  console.log("Attempt:", attempts);
}
```

Output:

```text
Attempt: 1
Attempt: 2
Attempt: 3
```

Later we'll build real async retry logic.

---

# 18. `do...while`

Syntax:

```js
do {
  // code
} while (condition);
```

Important difference:

> `do...while` runs at least once.

Example:

```js
let count = 10;

do {
  console.log(count);
  count++;
} while (count < 5);
```

Output:

```text
10
```

Even though:

```text
10 < 5
```

is false.

Why?

Because the condition is checked after the first execution.

---

# 19. `while` vs `do...while`

`while`:

```text
check first
↓
then execute
```

`do...while`:

```text
execute first
↓
then check
```

Easy memory:

```text
while
→ may run zero times

do...while
→ runs at least once
```

---

# 20. Practical `do...while`

```js
let page = 1;

do {
  console.log("Fetching page:", page);
  page++;
} while (page <= 3);
```

Output:

```text
Fetching page: 1
Fetching page: 2
Fetching page: 3
```

In normal frontend code, `do...while` is less common than:

```text
for
for...of
while
```

Know it, but don't overfocus on it.

---

# 21. `for...of` 🔥🔥🔥

`for...of` is one of the most useful modern JavaScript loops.

Use it to iterate over values from iterable collections like:

```text
Array
String
Set
Map
```

Example:

```js
const employees = ["Rahul", "Amit", "John"];

for (const employee of employees) {
  console.log(employee);
}
```

Output:

```text
Rahul
Amit
John
```

---

# 22. Why `for...of` Is Nice

Compare:

```js
for (let i = 0; i < employees.length; i++) {
  console.log(employees[i]);
}
```

with:

```js
for (const employee of employees) {
  console.log(employee);
}
```

If you only need each value:

```text
for...of
```

is usually cleaner.

---

# 23. `for...of` With Objects Inside an Array

```js
const employees = [
  { name: "Rahul", salary: 50000 },
  { name: "Amit", salary: 60000 },
  { name: "John", salary: 70000 },
];

for (const employee of employees) {
  console.log(employee.name);
}
```

Output:

```text
Rahul
Amit
John
```

This is extremely common practical JavaScript.

---

# 24. Calculate Total With `for...of`

```js
const employees = [
  { name: "Rahul", salary: 50000 },
  { name: "Amit", salary: 60000 },
  { name: "John", salary: 70000 },
];

let totalSalary = 0;

for (const employee of employees) {
  totalSalary += employee.salary;
}

console.log(totalSalary);
```

Output:

```text
180000
```

This is clean and readable.

---

# 25. `for...of` With Strings

Strings are iterable.

```js
const name = "RAM";

for (const character of name) {
  console.log(character);
}
```

Output:

```text
R
A
M
```

Useful for:

```text
string problems
character frequency
palindrome logic
interview coding
```

---

# 26. `for...of` With Set

```js
const skills = new Set([
  "React",
  "JavaScript",
  "Node",
]);

for (const skill of skills) {
  console.log(skill);
}
```

Output:

```text
React
JavaScript
Node
```

We'll cover Sets separately.

---

# 27. `for...of` With Map

```js
const employeeMap = new Map([
  [1, "Rahul"],
  [2, "Amit"],
]);

for (const entry of employeeMap) {
  console.log(entry);
}
```

Outputs entries like:

```text
[1, "Rahul"]
[2, "Amit"]
```

You can destructure them:

```js
for (const [id, name] of employeeMap) {
  console.log(id, name);
}
```

---

# 28. `for...in` 🔥🔥

`for...in` iterates over property keys.

Example:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
  department: "UI",
};

for (const key in employee) {
  console.log(key);
}
```

Output:

```text
name
salary
department
```

---

# 29. Access Values With `for...in`

```js
for (const key in employee) {
  console.log(key, employee[key]);
}
```

Output conceptually:

```text
name Rahul
salary 50000
department UI
```

Why bracket notation?

Because:

```text
key
```

is dynamic.

So:

```js
employee[key]
```

uses the current key value.

---

# 30. `for...of` vs `for...in` 🔥🔥🔥

This is a common interview question.

Easy mental model:

```text
for...of
→ VALUES

for...in
→ KEYS
```

Example array:

```js
const skills = ["React", "Node"];
```

`for...of`:

```js
for (const skill of skills) {
  console.log(skill);
}
```

Output:

```text
React
Node
```

`for...in`:

```js
for (const index in skills) {
  console.log(index);
}
```

Output:

```text
0
1
```

---

# 31. Don't Prefer `for...in` for Arrays 🔥🔥

You technically can do:

```js
for (const index in employees) {
  console.log(employees[index]);
}
```

But for arrays, prefer:

```text
for
for...of
array methods
```

`for...in` is mainly useful for object properties.

---

# 32. Better Object Iteration in Modern JavaScript

Instead of:

```js
for (const key in employee) {
}
```

you will often see:

```js
Object.keys(employee)
Object.values(employee)
Object.entries(employee)
```

Example:

```js
for (const [key, value] of Object.entries(employee)) {
  console.log(key, value);
}
```

This is a very clean modern pattern.

We'll cover these deeply under Objects.

---

# 33. `break` 🔥🔥🔥

`break` immediately stops the loop.

Example:

```js
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}
```

Output:

```text
1
2
3
4
```

When:

```text
i === 5
```

the loop ends completely.

---

# 34. Practical `break` — Search

```js
const employees = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" },
  { id: 3, name: "John" },
];

let found = null;

for (const employee of employees) {
  if (employee.id === 2) {
    found = employee;
    break;
  }
}

console.log(found);
```

Once found:

```text
no need to inspect remaining employees
```

That's a good use of `break`.

---

# 35. `continue` 🔥🔥

`continue` skips the current iteration and moves to the next one.

Example:

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

Output:

```text
1
2
4
5
```

`3` is skipped.

---

# 36. Practical `continue` — Skip Inactive Employees

```js
const employees = [
  { name: "Rahul", active: true },
  { name: "Amit", active: false },
  { name: "John", active: true },
];

for (const employee of employees) {
  if (!employee.active) {
    continue;
  }

  console.log(employee.name);
}
```

Output:

```text
Rahul
John
```

This is a good guard-style loop pattern.

---

# 37. `break` vs `continue`

Easy memory:

```text
break
→ stop the entire loop

continue
→ skip current iteration
→ continue with next iteration
```

---

# 38. Nested Loops 🔥🔥

A nested loop means:

```text
loop inside another loop
```

Example:

```js
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i, j);
  }
}
```

Output:

```text
1 1
1 2
2 1
2 2
3 1
3 2
```

---

# 39. Understand Nested Loop Flow

Outer loop:

```text
i = 1
```

Then inner loop fully runs:

```text
j = 1
j = 2
```

Then outer moves:

```text
i = 2
```

and inner loop starts again from the beginning.

Mental model:

```text
Outer item
↓
process all inner items
↓
next outer item
```

---

# 40. Real Nested Data Example 🔥🔥🔥

Suppose:

```js
const departments = [
  {
    name: "UI",
    employees: ["Rahul", "Amit"],
  },
  {
    name: "API",
    employees: ["John", "Sara"],
  },
];
```

You can iterate:

```js
for (const department of departments) {
  for (const employee of department.employees) {
    console.log(
      department.name,
      employee
    );
  }
}
```

Output:

```text
UI Rahul
UI Amit
API John
API Sara
```

This is practical nested-data traversal.

---

# 41. Nested Loop Performance Awareness 🔥🔥

Consider:

```js
for (const a of listA) {
  for (const b of listB) {
    // compare
  }
}
```

If both arrays contain many items, this can become expensive.

You do not need deep algorithm theory here yet.

Just understand:

```text
one loop
→ usually cheaper

loop inside loop
→ potentially much more work
```

Later frequency maps, Sets, and Maps can often reduce repeated searching.

---

# 42. Practical Duplicate Detection — Basic Nested Loop

```js
const numbers = [1, 2, 3, 2];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] === numbers[j]) {
      console.log("Duplicate:", numbers[i]);
    }
  }
}
```

Output:

```text
Duplicate: 2
```

This works.

Later we'll solve this more efficiently with:

```text
Set
frequency map
```

---

# 43. Off-by-One Errors 🔥🔥🔥

One of the most common loop bugs.

Suppose:

```js
const values = ["A", "B", "C"];
```

Correct:

```js
for (let i = 0; i < values.length; i++) {
  console.log(values[i]);
}
```

Wrong:

```js
for (let i = 0; i <= values.length; i++) {
  console.log(values[i]);
}
```

Last iteration:

```text
i = 3
```

Then:

```js
values[3]
→ undefined
```

Always check your boundary.

---

# 44. Infinite `for` Loop

This is possible:

```js
for (;;) {
  console.log("Runs forever");
}
```

because all three parts are optional.

You will rarely write this in frontend application code.

Know that it is possible.

---

# 45. Another Infinite Loop Bug

```js
for (let i = 0; i < 5; i--) {
  console.log(i);
}
```

Problem:

```text
i starts at 0
condition = i < 5
update = i--
```

So:

```text
0
-1
-2
-3
...
```

Condition stays true forever.

Always verify:

```text
Does my update move toward making the condition false?
```

Excellent debugging rule.

---

# 46. Mutating an Array While Looping 🔥🔥

Be careful when removing items while iterating forward.

Example:

```js
const numbers = [1, 2, 2, 3];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 2) {
    numbers.splice(i, 1);
  }
}

console.log(numbers);
```

You may expect:

```text
[1, 3]
```

But one `2` can be skipped because indexes shift after `splice()`.

This is a common mutation bug.

---

# 47. Why Items Can Be Skipped

Start:

```text
[1, 2, 2, 3]
    ↑
    i = 1
```

Remove index `1`.

Array becomes:

```text
[1, 2, 3]
```

The second `2` moves into index:

```text
1
```

But loop increments:

```text
i → 2
```

So the moved `2` is skipped.

---

# 48. Better Ways to Remove Matching Items

Often use:

```js
const result = numbers.filter(
  (number) => number !== 2
);
```

Or if mutation is required, iterate backward:

```js
for (let i = numbers.length - 1; i >= 0; i--) {
  if (numbers[i] === 2) {
    numbers.splice(i, 1);
  }
}
```

Why backward?

Removing a later index doesn't disturb earlier indexes you still need to visit.

---

# 49. Looping Over Sparse Arrays — Awareness

Consider:

```js
const arr = new Array(3);
```

This creates an array with empty slots.

Different iteration techniques can behave differently with sparse arrays.

This is low priority for normal application interviews.

The practical lesson:

```text
Don't create sparse arrays unless you actually need them.
```

---

# 50. `for...of` vs `forEach()` 🔥🔥🔥

Both iterate over array values.

`for...of`:

```js
for (const employee of employees) {
  console.log(employee);
}
```

`forEach()`:

```js
employees.forEach((employee) => {
  console.log(employee);
});
```

Important difference:

```text
for...of
→ supports break
→ supports continue
→ works naturally with await

forEach()
→ cannot break normally
→ cannot continue normally
→ async/await behavior can surprise you
```

This becomes very important in Async JavaScript.

---

# 51. `break` Doesn't Work Inside `forEach()`

You cannot do:

```js
employees.forEach((employee) => {
  if (employee.id === 2) {
    break;
  }
});
```

❌ Syntax error.

If you need:

```text
stop early
```

use:

```text
for
for...of
find()
some()
```

depending on the goal.

---

# 52. Choosing the Right Loop 🔥🔥🔥

Use normal `for` when:

```text
you need the index
custom increment/decrement
precise control
reverse traversal
```

Use `for...of` when:

```text
you mainly need values
you want clean readable iteration
you may need break / continue
you may use await
```

Use `for...in` when:

```text
iterating object property keys
```

Use `while` when:

```text
repeat until a condition changes
number of iterations is not naturally index-based
```

Use `do...while` when:

```text
the body must execute at least once
```

---

# 53. Machine-Coding Example — Total Active Salary 🔥🔥🔥

```js
const employees = [
  { name: "Rahul", salary: 50000, active: true },
  { name: "Amit", salary: 60000, active: false },
  { name: "John", salary: 70000, active: true },
];

let total = 0;

for (const employee of employees) {
  if (!employee.active) {
    continue;
  }

  total += employee.salary;
}

console.log(total);
```

Output:

```text
120000
```

Flow:

```text
Rahul active
→ add 50000

Amit inactive
→ continue

John active
→ add 70000
```

---

# 54. Machine-Coding Example — Search and Stop

```js
const employees = [
  { id: 101, name: "Rahul" },
  { id: 102, name: "Amit" },
  { id: 103, name: "John" },
];

const targetId = 102;

let result = null;

for (const employee of employees) {
  if (employee.id === targetId) {
    result = employee;
    break;
  }
}

console.log(result);
```

This is a clear manual search.

Later:

```js
find()
```

will make this shorter.

---

# 55. Machine-Coding Example — Build New Array

```js
const salaries = [50000, 60000, 70000];

const increasedSalaries = [];

for (const salary of salaries) {
  increasedSalaries.push(
    salary + 5000
  );
}

console.log(increasedSalaries);
```

Output:

```text
[55000, 65000, 75000]
```

This is manual transformation.

Later this becomes:

```js
salaries.map((salary) => salary + 5000);
```

Understanding the loop first makes `map()` easy.

---

# 56. Machine-Coding Example — Filter Manually

```js
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = [];

for (const number of numbers) {
  if (number % 2 === 0) {
    evenNumbers.push(number);
  }
}

console.log(evenNumbers);
```

Output:

```text
[2, 4, 6]
```

Later:

```js
numbers.filter((number) => number % 2 === 0);
```

This is why understanding loops matters.

---

# 57. Machine-Coding Example — Frequency Counter 🔥🔥🔥

Suppose:

```js
const skills = [
  "React",
  "Node",
  "React",
  "JavaScript",
  "React",
];
```

Build a frequency object:

```js
const frequency = {};

for (const skill of skills) {
  if (frequency[skill]) {
    frequency[skill]++;
  } else {
    frequency[skill] = 1;
  }
}

console.log(frequency);
```

Result:

```js
{
  React: 3,
  Node: 1,
  JavaScript: 1
}
```

This pattern is extremely important for:

```text
interview problems
duplicate counting
grouping
frequency analysis
machine coding
```

We'll practice it much more later.

---

# 58. Cleaner Frequency Counter

Using:

```js
frequency[skill] = (frequency[skill] ?? 0) + 1;
```

Complete:

```js
const frequency = {};

for (const skill of skills) {
  frequency[skill] =
    (frequency[skill] ?? 0) + 1;
}
```

Mental model:

```text
existing count?
↓
yes → use it
no  → start at 0
↓
+ 1
```

Very useful pattern.

---

# 59. Machine-Coding Example — Group Data 🔥🔥🔥

Suppose:

```js
const employees = [
  { name: "Rahul", department: "UI" },
  { name: "Amit", department: "API" },
  { name: "John", department: "UI" },
];
```

Group manually:

```js
const grouped = {};

for (const employee of employees) {
  const department = employee.department;

  if (!grouped[department]) {
    grouped[department] = [];
  }

  grouped[department].push(employee);
}

console.log(grouped);
```

Conceptual result:

```text
UI
├── Rahul
└── John

API
└── Amit
```

This is a very important real API transformation pattern.

---

# 60. Machine-Coding Example — Nested API Data

```js
const departments = [
  {
    name: "UI",
    employees: [
      { name: "Rahul", active: true },
      { name: "Amit", active: false },
    ],
  },
  {
    name: "API",
    employees: [
      { name: "John", active: true },
    ],
  },
];
```

Print active employees:

```js
for (const department of departments) {
  for (const employee of department.employees) {
    if (!employee.active) {
      continue;
    }

    console.log(
      department.name,
      employee.name
    );
  }
}
```

Output:

```text
UI Rahul
API John
```

This combines:

```text
nested loops
conditions
continue
nested API data
```

---

# 61. Interview Output 1 🔥

Predict:

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

Output:

```text
0
1
2
```

---

# 62. Interview Output 2

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

Output:

```text
1
2
3
```

---

# 63. Interview Output 3 — `break`

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }

  console.log(i);
}
```

Output:

```text
1
2
```

---

# 64. Interview Output 4 — `continue`

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

Output:

```text
1
2
4
5
```

---

# 65. Interview Output 5 — `while`

```js
let i = 1;

while (i < 4) {
  console.log(i);
  i++;
}
```

Output:

```text
1
2
3
```

---

# 66. Interview Output 6 — `do...while` 🔥🔥

```js
let i = 10;

do {
  console.log(i);
} while (i < 5);
```

Output:

```text
10
```

Because the body executes before the condition check.

---

# 67. Interview Output 7 — Nested Loop

```js
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i, j);
  }
}
```

Output:

```text
1 1
1 2
2 1
2 2
```

---

# 68. Interview Output 8 — `for...of`

```js
const values = ["A", "B"];

for (const value of values) {
  console.log(value);
}
```

Output:

```text
A
B
```

---

# 69. Interview Output 9 — `for...in`

```js
const user = {
  name: "Rahul",
  age: 30,
};

for (const key in user) {
  console.log(key);
}
```

Output:

```text
name
age
```

---

# 70. Interview Question — `for...of` vs `for...in` 🔥🔥🔥

Good answer:

```text
for...of
→ iterates values of an iterable
→ commonly arrays, strings, Sets, Maps

for...in
→ iterates enumerable property keys
→ commonly objects
```

Easy memory:

```text
of → values
in → keys
```

---

# 71. Interview Question — `break` vs `continue`

Good answer:

```text
break
→ exits the entire loop

continue
→ skips only the current iteration
→ moves to the next iteration
```

---

# 72. Interview Question — `while` vs `do...while`

Good answer:

```text
while
→ condition is checked first
→ can execute zero times

do...while
→ body executes first
→ always executes at least once
```

---

# 73. Interview Question — Why Prefer `for...of` Over Traditional `for` Sometimes?

Good answer:

> When I only need the values and not the index, `for...of` is usually cleaner and easier to read. It also supports `break`, `continue`, and works naturally with `await`.

---

# 74. Interview Question — Can You Use `break` Inside `forEach()`?

No.

```text
forEach()
→ callback-based iteration
→ normal break / continue are not supported
```

If early exit is needed, use something appropriate like:

```text
for
for...of
find()
some()
```

---

# 75. Debugging Problem — Wrong Boundary 🔥🔥🔥

Bad:

```js
const employees = ["Rahul", "Amit"];

for (let i = 0; i <= employees.length; i++) {
  console.log(employees[i]);
}
```

Output:

```text
Rahul
Amit
undefined
```

Fix:

```js
for (let i = 0; i < employees.length; i++) {
  console.log(employees[i]);
}
```

---

# 76. Debugging Problem — Update Going Wrong Direction

Bad:

```js
for (let i = 0; i < 5; i--) {
  console.log(i);
}
```

This becomes an infinite loop.

Fix:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Mental debugging question:

```text
Is my loop variable moving toward making the condition false?
```

---

# 77. Debugging Problem — Forgotten Increment

Bad:

```js
let i = 0;

while (i < 5) {
  console.log(i);
}
```

Infinite loop.

Fix:

```js
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

---

# 78. Debugging Problem — `for...in` on Array

Possible:

```js
const values = ["A", "B"];

for (const value in values) {
  console.log(value);
}
```

Output:

```text
0
1
```

If you expected:

```text
A
B
```

you used the wrong loop.

Correct:

```js
for (const value of values) {
  console.log(value);
}
```

---

# 79. Practical Rule — Don't Loop When a Built-In Expresses Intent Better 🔥🔥🔥

Manual search:

```js
let found;

for (const employee of employees) {
  if (employee.id === 2) {
    found = employee;
    break;
  }
}
```

Later you may write:

```js
const found = employees.find(
  (employee) => employee.id === 2
);
```

Both are valid.

But:

```text
find()
```

expresses the intent directly.

Similarly:

```text
map()
→ transform

filter()
→ select

reduce()
→ accumulate

some()
→ at least one?

every()
→ all?
```

The goal is not to avoid loops.

The goal is:

```text
Use the clearest tool for the job.
```

---

# 80. Machine-Coding Rule 🔥🔥🔥

When you see a loop problem, ask:

```text
Do I need the index?
Do I need values only?
Do I need to stop early?
Do I need to skip items?
Do I need to transform?
Do I need to filter?
Do I need to accumulate?
Do I need async await?
```

Then choose:

```text
for
for...of
while
find
map
filter
reduce
some
every
```

This decision-making is more important than memorizing syntax.

---

# Quick Memory 🧠

```text
for
→ precise control
→ index
→ custom start/end/update
```

```text
while
→ repeat while condition is true
→ watch for infinite loops
```

```text
do...while
→ runs at least once
```

```text
for...of
→ values
→ arrays / strings / Sets / Maps
→ break ✅
→ continue ✅
```

```text
for...in
→ keys
→ mainly objects
```

```text
break
→ stop entire loop
```

```text
continue
→ skip current iteration
```

Array boundary:

```js
for (
  let i = 0;
  i < array.length;
  i++
)
```

Not:

```js
i <= array.length
```

Important practical patterns:

```text
sum
search
filter manually
transform manually
frequency counter
grouping
nested data traversal
```

Most important machine-coding rule:

```text
Use a loop when it makes intent clear.

Use map/filter/reduce/find/etc.
when they express the operation more clearly.
```

## ✅ 6.6 Loops complete

**Next: 6.7 Functions 🔥🔥🔥**
