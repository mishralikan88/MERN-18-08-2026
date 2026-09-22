Sure bro. We’ll restart **JavaScript Core from Variables**, assuming you want the fundamentals clear first, but still keeping everything **interview + practical focused**.

# 6. JavaScript Core

# 6.1 Variables 🔥🔥🔥

## 1. What is a variable?

A variable is just a **name used to store a value**.

```js
let salary = 50000;
```

Think of it like:

```text
salary
   ↓
50000
```

Later we can use the variable instead of repeatedly writing the value.

```js
console.log(salary);

const bonus = salary * 0.1;

console.log(bonus);
```

---

# 2. JavaScript has 3 ways to create variables

```js
var
let
const
```

Modern JavaScript mainly uses:

```text
const → first preference
let   → when the value must change
var   → mostly legacy/interview knowledge
```

---

# 3. Declaration 🔥

Declaration means:

> Tell JavaScript that this variable exists.

```js
let salary;
```

Here we created the variable:

```text
salary
```

but we haven't given it our own value yet.

```js
console.log(salary);
```

Output:

```text
undefined
```

So:

```text
let salary;
    ↓
Declaration
```

---

# 4. Initialization 🔥

Initialization means:

> Give the variable its **first value**.

```js
let salary = 50000;
```

Here:

```text
let salary
    ↓
Declaration

50000
  ↓
Initial value
```

So declaration + initialization happened together.

---

# 5. Assignment

Assignment means putting a value into a variable.

```js
let salary;

salary = 50000;
```

Here:

```js
salary = 50000;
```

assigns the value.

---

# 6. Reassignment

Reassignment means changing the existing value.

```js
let salary = 50000;

salary = 70000;
```

Flow:

```text
salary
  ↓
50000

then

salary
  ↓
70000
```

This is very common in real applications.

Example:

```js
let currentPage = 1;

currentPage = 2;
currentPage = 3;
```

---

# 7. `let`

Use `let` when you know the variable value will change.

```js
let count = 0;

count = count + 1;

console.log(count);
```

Output:

```text
1
```

Short form:

```js
count++;
```

---

## Real example

Pagination:

```js
let currentPage = 1;

function nextPage() {
  currentPage++;
}

nextPage();
nextPage();

console.log(currentPage);
```

Output:

```text
3
```

Why `let`?

Because:

```text
currentPage

1 → 2 → 3
```

The value changes.

---

# 8. `const` 🔥🔥🔥

Use `const` when you don't want to reassign the variable.

```js
const API_URL = "https://api.example.com";
```

This is not allowed:

```js
API_URL = "https://another-api.com";
```

❌ Error.

Because `const` prevents reassignment.

---

# 9. Important `const` interview trap 🔥🔥🔥

Consider:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};
```

Can we change salary?

```js
employee.salary = 70000;
```

✅ Yes.

Now:

```js
console.log(employee);
```

Output:

```js
{
  name: "Rahul",
  salary: 70000
}
```

You may think:

> But employee is `const`. Why did it change?

Because `const` prevents **variable reassignment**.

It does NOT automatically make an object immutable.

Think:

```text
employee
    │
    │ points to
    ▼
{
  name: "Rahul",
  salary: 50000
}
```

We changed:

```text
salary: 50000
       ↓
salary: 70000
```

But `employee` still points to the **same object**.

---

## This would fail

```js
employee = {
  name: "Amit",
};
```

❌ Error.

Because now you're trying to make:

```text
employee
```

point to another object.

---

# 10. Same rule with arrays

```js
const employees = [];
```

This is allowed:

```js
employees.push("Rahul");
employees.push("Amit");
```

Result:

```js
["Rahul", "Amit"]
```

But:

```js
employees = [];
```

❌ Not allowed.

So remember:

```text
const array/object

Change contents ✅

Reassign variable ❌
```

Very important for:

```text
JavaScript interviews
React
State handling
Object mutation
Machine coding
```

---

# 11. `var`

Older JavaScript uses:

```js
var salary = 50000;
```

It allows reassignment:

```js
var salary = 50000;

salary = 70000;
```

✅

It also allows redeclaration:

```js
var salary = 50000;

var salary = 90000;
```

✅ JavaScript allows it.

Output:

```text
90000
```

This can make code harder to manage.

That's one reason modern JavaScript prefers:

```text
let
const
```

---

# 12. Redeclaration

Redeclaration means declaring the same variable again.

### `var`

```js
var name = "Rahul";

var name = "Amit";
```

✅ Allowed.

---

### `let`

```js
let name = "Rahul";

let name = "Amit";
```

❌ Error.

---

### `const`

```js
const name = "Rahul";

const name = "Amit";
```

❌ Error.

---

# 13. Block scope 🔥🔥

Consider:

```js
if (true) {
  let salary = 50000;

  console.log(salary);
}
```

Output:

```text
50000
```

But:

```js
if (true) {
  let salary = 50000;
}

console.log(salary);
```

❌ Error.

Why?

Because `let` belongs to the block:

```js
{
  ...
}
```

So:

```text
{
   let salary = 50000;
}

salary exists only here
```

---

# 14. `const` is also block scoped

```js
if (true) {
  const department = "Engineering";

  console.log(department);
}
```

✅

But:

```js
if (true) {
  const department = "Engineering";
}

console.log(department);
```

❌ Error.

---

# 15. `var` behaves differently

```js
if (true) {
  var salary = 50000;
}

console.log(salary);
```

Output:

```text
50000
```

Because `var` is **not block scoped**.

We'll understand this much more deeply when we cover:

```text
Scope
Hoisting
TDZ
Execution Context
```

For now just remember:

```text
var
→ function scoped

let
→ block scoped

const
→ block scoped
```

---

# 16. Practical — Which one should we use?

## Case 1

```js
_____ API_URL = "/api/employees";
```

Answer:

```js
const API_URL = "/api/employees";
```

Because we don't expect it to change.

---

## Case 2

```js
_____ currentPage = 1;

currentPage++;
```

Answer:

```js
let currentPage = 1;
```

Because it changes.

---

## Case 3

```js
_____ employees = [];

employees.push("Rahul");
```

Answer:

```js
const employees = [];
```

Important:

The array contents change, but the `employees` variable isn't reassigned.

---

# 17. Practical — Predict the output 🔥

```js
let salary = 50000;

salary = 60000;

console.log(salary);
```

Output:

```text
60000
```

---

# 18. Practical — Predict this

```js
const user = {
  name: "Rahul",
};

user.name = "Amit";

console.log(user.name);
```

Output:

```text
Amit
```

Because changing an object property is allowed.

---

# 19. Practical — Scope

```js
let status = "pending";

if (true) {
  let status = "completed";

  console.log(status);
}

console.log(status);
```

Output:

```text
completed
pending
```

Why?

There are actually **two separate variables**.

```text
Outer scope

status = "pending"


Inner block

status = "completed"
```

The inner variable doesn't replace the outer one.

---

# 20. Practical — `var`

```js
var count = 10;

if (true) {
  var count = 20;
}

console.log(count);
```

Output:

```text
20
```

But compare:

```js
let count = 10;

if (true) {
  let count = 20;
}

console.log(count);
```

Output:

```text
10
```

This difference is frequently tested.

---

# 21. Real application example

```js
const API_URL = "/api/employees";

let currentPage = 1;

const employees = [];

function nextPage() {
  currentPage++;
}

employees.push({
  id: 1,
  name: "Rahul",
});
```

Why these declarations?

```text
API_URL
→ const
→ no reassignment


currentPage
→ let
→ value changes


employees
→ const
→ same array reference
→ contents can change
```

---

# 22. Interview question 🔥

### What is the difference between `var`, `let`, and `const`?

Good interview answer:

```text
var
→ function scoped
→ can be reassigned
→ can be redeclared


let
→ block scoped
→ can be reassigned
→ cannot be redeclared in same scope


const
→ block scoped
→ cannot be reassigned
→ cannot be redeclared
```

And add:

> `const` does not make objects or arrays immutable. Their contents can still be modified.

That last sentence is important.

---

# 23. Declaration vs Initialization vs Assignment

Remember this example:

```js
let salary;

salary = 50000;

salary = 70000;
```

Think:

```text
let salary;
     ↓
Declaration


salary = 50000;
        ↓
First value / initialization


salary = 70000;
        ↓
Reassignment
```

---

# 24. Practical coding exercise

Try to predict before reading the answer:

```js
const employees = [];

let count = 0;

employees.push("Rahul");
employees.push("Amit");

count = employees.length;

console.log(employees);
console.log(count);
```

Output:

```text
["Rahul", "Amit"]

2
```

Notice:

```text
employees → const

but

employees.push() → allowed
```

because we never did:

```js
employees = anotherArray;
```

---

# 25. Machine-coding rule 🔥🔥🔥

Don't think:

```text
const = value never changes
```

Think:

```text
const = variable will not be reassigned
```

And use this rule:

```text
Start with const
      ↓
Do I need to reassign it?
      ↓
YES → let
NO  → keep const
```

Example:

```js
const users = getUsers();

let total = 0;

for (const user of users) {
  total += user.salary;
}
```

This is clean modern JavaScript.

---

# Quick Memory 🧠

```text
var
├── old style
├── function scoped
├── reassign ✅
└── redeclare ✅


let
├── block scoped
├── reassign ✅
└── redeclare ❌


const
├── block scoped
├── reassign ❌
├── redeclare ❌
└── object/array contents can change ✅
```

And:

```text
Declaration
→ create variable

Initialization
→ first value

Assignment
→ give a value

Reassignment
→ change existing value
```

## ✅ Variables — Foundation complete

Next we move to **Data Types**, again from the basics but taking it all the way to interview-level practical understanding.
