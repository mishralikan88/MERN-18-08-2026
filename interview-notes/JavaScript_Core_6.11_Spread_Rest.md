# 6.11 Spread / Rest 🔥🔥🔥

Spread and rest use the same syntax:

```js
...
```

But they do opposite jobs depending on where they are used.

Think:

```text
SPREAD
→ expand / unpack values

REST
→ collect remaining values
```

This is one of the most important modern JavaScript concepts because it appears constantly in:

```text
arrays
objects
function arguments
function parameters
React state
Redux
API transformations
machine coding
immutable updates
```

---

# 1. Same Syntax, Different Meaning 🔥🔥🔥

Both use:

```js
...
```

But context decides the meaning.

Spread:

```js
const copy = [
  ...numbers,
];
```

Here:

```text
...numbers
→ expands array items
```

Rest:

```js
function sum(
  ...numbers
) {
}
```

Here:

```text
...numbers
→ collects arguments into an array
```

Easy memory:

```text
SPREAD
→ one collection becomes many values

REST
→ many values become one collection
```

---

# 2. Array Spread 🔥🔥🔥

Suppose:

```js
const numbers = [
  10,
  20,
  30,
];
```

Using spread:

```js
console.log(
  ...numbers
);
```

Conceptually JavaScript sees:

```js
console.log(
  10,
  20,
  30
);
```

Output:

```text
10 20 30
```

---

# 3. Spread Expands Array Values

This:

```js
const values = [
  1,
  2,
  3,
];
```

Then:

```js
const result = [
  ...values,
];
```

is conceptually similar to:

```js
const result = [
  1,
  2,
  3,
];
```

---

# 4. Copy an Array With Spread 🔥🔥🔥

```js
const original = [
  1,
  2,
  3,
];

const copy = [
  ...original,
];
```

Now:

```js
console.log(copy);
```

Output:

```text
[1, 2, 3]
```

And:

```js
console.log(
  copy === original
);
```

Output:

```text
false
```

A new outer array was created.

---

# 5. Spread Copy Is Shallow 🔥🔥🔥

Important.

```js
const original = [
  {
    name: "Rahul",
  },
];

const copy = [
  ...original,
];
```

Now:

```js
copy[0].name = "Amit";
```

Then:

```js
console.log(
  original[0].name
);
```

Output:

```text
Amit
```

Why?

```text
outer array
→ new

nested object
→ same reference
```

So:

```text
spread
→ shallow copy
```

---

# 6. Add Item at End With Spread

```js
const employees = [
  "Rahul",
  "Amit",
];

const updated = [
  ...employees,
  "John",
];
```

Result:

```text
[
  "Rahul",
  "Amit",
  "John"
]
```

Very common immutable update pattern.

---

# 7. Add Item at Start With Spread

```js
const employees = [
  "Rahul",
  "Amit",
];

const updated = [
  "John",
  ...employees,
];
```

Result:

```text
[
  "John",
  "Rahul",
  "Amit"
]
```

---

# 8. Insert Item in the Middle 🔥🔥

Suppose:

```js
const employees = [
  "Rahul",
  "John",
];
```

Insert `"Amit"` between them:

```js
const updated = [
  ...employees.slice(0, 1),
  "Amit",
  ...employees.slice(1),
];
```

Result:

```text
[
  "Rahul",
  "Amit",
  "John"
]
```

This avoids mutating the original array.

---

# 9. Merge Arrays With Spread 🔥🔥🔥

```js
const frontend = [
  "React",
  "Vue",
];

const backend = [
  "Node",
  "Express",
];

const skills = [
  ...frontend,
  ...backend,
];
```

Result:

```text
[
  "React",
  "Vue",
  "Node",
  "Express"
]
```

---

# 10. Merge Multiple Arrays

```js
const a = [1, 2];
const b = [3, 4];
const c = [5, 6];

const result = [
  ...a,
  ...b,
  ...c,
];
```

Output:

```text
[1, 2, 3, 4, 5, 6]
```

---

# 11. Spread Order Matters in Arrays

```js
const a = [1, 2];
const b = [3, 4];
```

This:

```js
const result = [
  ...a,
  ...b,
];
```

gives:

```text
[1, 2, 3, 4]
```

But:

```js
const result = [
  ...b,
  ...a,
];
```

gives:

```text
[3, 4, 1, 2]
```

Spread preserves insertion order.

---

# 12. Clone Before Mutating 🔥🔥🔥

Suppose:

```js
const numbers = [
  3,
  1,
  2,
];
```

Bad if original must stay unchanged:

```js
numbers.sort();
```

Better:

```js
const sorted = [
  ...numbers,
].sort(
  (a, b) => a - b
);
```

Now:

```text
numbers
→ unchanged

sorted
→ sorted copy
```

---

# 13. Reverse Without Mutating Original

```js
const numbers = [
  1,
  2,
  3,
];

const reversed = [
  ...numbers,
].reverse();
```

Original remains unchanged.

Modern alternative awareness:

```js
numbers.toReversed();
```

---

# 14. Spread With Strings 🔥🔥

Strings are iterable.

```js
const text = "ABC";

const chars = [
  ...text,
];

console.log(chars);
```

Output:

```text
["A", "B", "C"]
```

Useful for some string problems.

---

# 15. Spread String Into Function Arguments

```js
const letters = [
  "A",
  "B",
  "C",
];

console.log(
  ...letters
);
```

Output:

```text
A B C
```

---

# 16. Spread With `Math.max()` 🔥🔥🔥

`Math.max()` expects separate arguments.

This does not work as intended:

```js
Math.max(
  [10, 50, 30]
);
```

Use spread:

```js
const numbers = [
  10,
  50,
  30,
];

const max =
  Math.max(
    ...numbers
  );

console.log(max);
```

Output:

```text
50
```

---

# 17. `Math.min()` With Spread

```js
const min =
  Math.min(
    ...numbers
  );
```

If:

```js
numbers = [
  10,
  50,
  30,
];
```

then:

```text
min
→ 10
```

---

# 18. Spread Function Arguments 🔥🔥🔥

Suppose:

```js
function add(
  a,
  b,
  c
) {
  return a + b + c;
}
```

And:

```js
const values = [
  10,
  20,
  30,
];
```

Call:

```js
const total =
  add(
    ...values
  );
```

JavaScript treats it like:

```js
add(
  10,
  20,
  30
);
```

Output:

```text
60
```

---

# 19. Spread With Extra Arguments

```js
function logValues(
  a,
  b,
  c,
  d
) {
  console.log(
    a,
    b,
    c,
    d
  );
}
```

Call:

```js
const values = [
  2,
  3,
];

logValues(
  1,
  ...values,
  4
);
```

Equivalent to:

```js
logValues(
  1,
  2,
  3,
  4
);
```

---

# 20. Object Spread 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};
```

Copy:

```js
const copy = {
  ...employee,
};
```

Result:

```js
{
  name: "Rahul",
  salary: 50000
}
```

---

# 21. Object Spread Creates New Outer Object

```js
console.log(
  copy === employee
);
```

Output:

```text
false
```

Spread copied the object's own enumerable properties into a new object.

---

# 22. Object Spread Is Shallow 🔥🔥🔥

```js
const employee = {
  name: "Rahul",

  address: {
    city: "Hyderabad",
  },
};

const copy = {
  ...employee,
};
```

Now:

```js
copy.address.city =
  "Bangalore";
```

Then:

```js
console.log(
  employee.address.city
);
```

Output:

```text
Bangalore
```

Nested reference is shared.

---

# 23. Update Object Immutably 🔥🔥🔥

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

const updated = {
  ...employee,
  salary: 60000,
};
```

Result:

```js
{
  name: "Rahul",
  salary: 60000
}
```

Original stays unchanged.

---

# 24. Object Spread Order Matters 🔥🔥🔥

```js
const employee = {
  salary: 50000,
};
```

Correct update:

```js
const updated = {
  ...employee,
  salary: 70000,
};
```

Result:

```text
70000
```

But:

```js
const updated = {
  salary: 70000,
  ...employee,
};
```

Result:

```text
50000
```

Rule:

```text
last property wins
```

---

# 25. Merge Objects With Spread 🔥🔥🔥

```js
const personal = {
  name: "Rahul",
  age: 30,
};

const work = {
  role: "Developer",
  salary: 50000,
};

const employee = {
  ...personal,
  ...work,
};
```

Result:

```js
{
  name: "Rahul",
  age: 30,
  role: "Developer",
  salary: 50000
}
```

---

# 26. Merge Conflict

```js
const a = {
  status: "old",
};

const b = {
  status: "new",
};
```

Then:

```js
const result = {
  ...a,
  ...b,
};
```

Result:

```text
status
→ "new"
```

Again:

```text
last property wins
```

---

# 27. Add New Object Property With Spread

```js
const employee = {
  name: "Rahul",
};
```

Create:

```js
const updated = {
  ...employee,
  department: "UI",
};
```

Result:

```js
{
  name: "Rahul",
  department: "UI"
}
```

---

# 28. Dynamic Property Update With Spread 🔥🔥🔥

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

const field =
  "salary";

const value =
  70000;
```

Update:

```js
const updated = {
  ...employee,
  [field]: value,
};
```

Result:

```text
salary
→ 70000
```

Very important for dynamic forms.

---

# 29. Nested Object Update 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",

  address: {
    city: "Hyderabad",
    state: "Telangana",
  },
};
```

Bad:

```js
const updated = {
  ...employee,
};

updated.address.city =
  "Bangalore";
```

Why bad?

Nested object is shared.

Correct:

```js
const updated = {
  ...employee,

  address: {
    ...employee.address,
    city: "Bangalore",
  },
};
```

---

# 30. Copy Every Changed Level 🔥🔥🔥

Mental model:

```text
employee
↓
address
↓
city
```

If changing:

```text
city
```

copy:

```text
employee
+
address
```

Example:

```js
const updated = {
  ...employee,

  address: {
    ...employee.address,
    city: "Bangalore",
  },
};
```

Important React / Redux rule:

```text
copy every level you change
```

---

# 31. Deep Nested Spread

Suppose:

```js
const user = {
  profile: {
    address: {
      city: "Hyderabad",
    },
  },
};
```

Update city:

```js
const updated = {
  ...user,

  profile: {
    ...user.profile,

    address: {
      ...user.profile.address,
      city: "Bangalore",
    },
  },
};
```

This works.

But deeply nested structures can become verbose.

That is one reason state shape matters.

---

# 32. Spread vs `Object.assign()`

These are similar for common shallow-copy cases.

Spread:

```js
const copy = {
  ...employee,
};
```

`Object.assign()`:

```js
const copy =
  Object.assign(
    {},
    employee
  );
```

Modern code often prefers spread because it is concise and readable.

Both are shallow.

---

# 33. Rest Parameters 🔥🔥🔥

Rest parameters collect multiple function arguments into an array.

Example:

```js
function sum(
  ...numbers
) {
  console.log(numbers);
}
```

Call:

```js
sum(
  10,
  20,
  30
);
```

Inside function:

```text
numbers
→ [10, 20, 30]
```

Important:

```text
rest parameter
→ always gives an array
```

---

# 34. Rest Parameters Solve Variable Argument Counts

Without rest:

```js
function sum(
  a,
  b,
  c
) {
  return a + b + c;
}
```

This only handles three parameters.

With rest:

```js
function sum(
  ...numbers
) {
  return numbers.reduce(
    (total, number) =>
      total + number,
    0
  );
}
```

Now:

```js
sum(1, 2);
sum(1, 2, 3);
sum(1, 2, 3, 4, 5);
```

all work.

---

# 35. Rest Parameter Must Be Last 🔥🔥🔥

Valid:

```js
function test(
  first,
  ...rest
) {
}
```

Invalid:

```js
function test(
  ...rest,
  last
) {
}
```

❌ Syntax error.

Why?

Rest means:

```text
collect all remaining arguments
```

Nothing can come after it.

---

# 36. Named Parameter + Rest

```js
function logEmployee(
  name,
  ...skills
) {
  console.log(name);
  console.log(skills);
}
```

Call:

```js
logEmployee(
  "Rahul",
  "React",
  "JavaScript",
  "Node"
);
```

Output:

```text
Rahul
["React", "JavaScript", "Node"]
```

---

# 37. Rest Parameter vs `arguments` 🔥🔥

Traditional regular functions have:

```js
arguments
```

But `arguments` is not a real array.

Rest:

```js
function test(
  ...args
) {
  console.log(
    Array.isArray(args)
  );
}
```

Output:

```text
true
```

Rest parameters are generally cleaner in modern JavaScript.

---

# 38. Arrow Functions and Rest 🔥🔥🔥

Arrow functions do not have their own `arguments` object.

But rest works perfectly:

```js
const sum = (
  ...numbers
) => {
  return numbers.reduce(
    (total, number) =>
      total + number,
    0
  );
};
```

This is one reason rest is important.

---

# 39. Rest With Array Destructuring 🔥🔥🔥

Suppose:

```js
const numbers = [
  10,
  20,
  30,
  40,
];
```

Use:

```js
const [
  first,
  ...rest
] = numbers;
```

Now:

```text
first
→ 10

rest
→ [20, 30, 40]
```

Here `...` means:

```text
REST
```

because it collects remaining values.

---

# 40. Rest With Object Destructuring 🔥🔥🔥

```js
const employee = {
  id: 1,
  name: "Rahul",
  salary: 50000,
};
```

Use:

```js
const {
  id,
  ...details
} = employee;
```

Now:

```text
id
→ 1
```

and:

```js
details
```

is:

```js
{
  name: "Rahul",
  salary: 50000
}
```

---

# 41. Remove Property With Object Rest 🔥🔥🔥

```js
const employee = {
  id: 1,
  name: "Rahul",
  password: "secret",
};
```

Use:

```js
const {
  password,
  ...safeEmployee
} = employee;
```

Result:

```js
{
  id: 1,
  name: "Rahul"
}
```

Original object remains unchanged.

---

# 42. Remove Multiple Properties

```js
const employee = {
  id: 1,
  name: "Rahul",
  password: "secret",
  token: "abc",
};
```

Use:

```js
const {
  password,
  token,
  ...publicEmployee
} = employee;
```

Result:

```js
{
  id: 1,
  name: "Rahul"
}
```

Very practical for sanitizing data.

---

# 43. Spread vs Rest — Array Example 🔥🔥🔥

Spread:

```js
const a = [
  1,
  2,
];

const b = [
  ...a,
  3,
];
```

Here:

```text
...a
→ expands
```

Rest:

```js
const [
  first,
  ...others
] = b;
```

Here:

```text
...others
→ collects
```

---

# 44. Spread vs Rest — Function Example 🔥🔥🔥

Spread:

```js
const values = [
  1,
  2,
  3,
];

sum(
  ...values
);
```

Meaning:

```text
array
→ separate arguments
```

Rest:

```js
function sum(
  ...values
) {
}
```

Meaning:

```text
separate arguments
→ array
```

This is the best mental model.

---

# 45. Direction Mental Model 🧠🔥🔥🔥

Spread:

```text
[1, 2, 3]
↓
...array
↓
1, 2, 3
```

Rest:

```text
1, 2, 3
↓
...args
↓
[1, 2, 3]
```

So:

```text
SPREAD
→ unpack

REST
→ pack
```

---

# 46. Spread API Data Into New Object

Suppose:

```js
const apiEmployee = {
  id: "101",
  name: " Rahul ",
  salary: "50000",
};
```

Normalize:

```js
const employee = {
  ...apiEmployee,

  id:
    Number(
      apiEmployee.id
    ),

  name:
    apiEmployee.name.trim(),

  salary:
    Number(
      apiEmployee.salary
    ),
};
```

Spread keeps unchanged fields while allowing selected fields to be transformed.

---

# 47. Merge API Results 🔥🔥🔥

Suppose:

```js
const basicInfo = {
  id: 1,
  name: "Rahul",
};

const salaryInfo = {
  salary: 50000,
};

const departmentInfo = {
  department: "UI",
};
```

Merge:

```js
const employee = {
  ...basicInfo,
  ...salaryInfo,
  ...departmentInfo,
};
```

Very common data transformation pattern.

---

# 48. Merge Arrays From Multiple APIs

```js
const page1 = [
  {
    id: 1,
    name: "Rahul",
  },
];

const page2 = [
  {
    id: 2,
    name: "Amit",
  },
];
```

Combine:

```js
const employees = [
  ...page1,
  ...page2,
];
```

Useful for:

```text
pagination
infinite scroll
batched API results
```

---

# 49. Infinite Scroll Pattern 🔥🔥🔥

Suppose current state:

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
  },
];
```

Next API response:

```js
const newEmployees = [
  {
    id: 2,
    name: "Amit",
  },
];
```

Update:

```js
const updatedEmployees = [
  ...employees,
  ...newEmployees,
];
```

Mental model:

```text
old results
+
new results
↓
combined list
```

---

# 50. React State Add Item 🔥🔥🔥

Bad mutation:

```js
employees.push(
  newEmployee
);

setEmployees(
  employees
);
```

Better:

```js
setEmployees([
  ...employees,
  newEmployee,
]);
```

This creates a new array reference.

---

# 51. React State Update Object 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};
```

Update:

```js
setEmployee({
  ...employee,
  salary: 60000,
});
```

New object reference.

---

# 52. React Dynamic Form Update 🔥🔥🔥

Suppose:

```js
const form = {
  name: "Rahul",
  department: "UI",
};
```

Generic handler concept:

```js
function updateField(
  field,
  value
) {
  setForm({
    ...form,
    [field]: value,
  });
}
```

This combines:

```text
object spread
+
computed property
```

Very common machine-coding pattern.

---

# 53. React Functional Update Awareness

When new state depends on previous state, a safer pattern is often:

```js
setEmployees(
  (previous) => [
    ...previous,
    newEmployee,
  ]
);
```

And object update:

```js
setEmployee(
  (previous) => ({
    ...previous,
    salary: 60000,
  })
);
```

This avoids depending on a potentially stale captured state value.

Deep React behavior belongs in React, but the spread syntax is pure JavaScript.

---

# 54. Deduplicate Primitives With Spread + Set 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  2,
  3,
];
```

Use:

```js
const unique = [
  ...new Set(numbers),
];
```

Result:

```text
[1, 2, 3]
```

Why spread?

`new Set(numbers)` gives a Set.

Spread expands its values into a new array.

---

# 55. Copy Set Into Array

```js
const uniqueValues =
  new Set([
    "React",
    "Node",
  ]);

const skills = [
  ...uniqueValues,
];
```

Result:

```text
["React", "Node"]
```

---

# 56. Spread Works With Iterables 🔥🔥

Spread can work with iterable values such as:

```text
arrays
strings
Sets
Maps
```

Example Set:

```js
const set =
  new Set([
    1,
    2,
    3,
  ]);

console.log([
  ...set,
]);
```

Output:

```text
[1, 2, 3]
```

---

# 57. Spread Map Into Entries

```js
const map =
  new Map([
    ["name", "Rahul"],
    ["salary", 50000],
  ]);

const entries = [
  ...map,
];
```

Result:

```js
[
  ["name", "Rahul"],
  ["salary", 50000]
]
```

Useful awareness.

---

# 58. Object Spread Is Different From Iterable Spread

Array spread usually expands iterable values:

```js
[
  ...array
]
```

Object spread copies enumerable properties:

```js
{
  ...object
}
```

Same syntax.

Different context.

---

# 59. Spread `null` / `undefined` Into Object — Awareness

Modern object spread safely ignores:

```text
null
undefined
```

Example:

```js
const result = {
  ...null,
  ...undefined,
  name: "Rahul",
};
```

Result:

```js
{
  name: "Rahul"
}
```

This is awareness, not a pattern you need to use frequently.

---

# 60. Conditional Object Spread 🔥🔥🔥

Very useful.

```js
const includeSalary =
  true;

const employee = {
  name: "Rahul",

  ...(
    includeSalary
      ? {
          salary: 50000,
        }
      : {}
  ),
};
```

Result when true:

```js
{
  name: "Rahul",
  salary: 50000
}
```

Useful for conditional payload construction.

---

# 61. Cleaner Conditional Spread Pattern

Often you may see:

```js
const employee = {
  name: "Rahul",

  ...(includeSalary && {
    salary: 50000,
  }),
};
```

When `includeSalary` is true:

```text
salary included
```

When false:

```text
salary omitted
```

This pattern is common, but use it only when readability stays clear.

---

# 62. Conditional Array Spread 🔥🔥

```js
const isAdmin =
  true;

const actions = [
  "view",
  "edit",

  ...(
    isAdmin
      ? ["delete"]
      : []
  ),
];
```

Result:

```text
[
  "view",
  "edit",
  "delete"
]
```

Useful for menus, permissions, and configuration arrays.

---

# 63. Build Request Payload With Spread 🔥🔥🔥

Suppose:

```js
const form = {
  name: "Rahul",
  salary: 50000,
};

const userId = 101;
```

Payload:

```js
const payload = {
  ...form,
  userId,
};
```

Result:

```js
{
  name: "Rahul",
  salary: 50000,
  userId: 101
}
```

---

# 64. Override API Fields During Merge

```js
const apiEmployee = {
  id: 1,
  name: "Rahul",
  active: false,
};
```

Override locally:

```js
const employee = {
  ...apiEmployee,
  active: true,
};
```

Output:

```text
active
→ true
```

Again:

```text
later value wins
```

---

# 65. Rest Parameters for Logging Utility

```js
function log(
  level,
  ...messages
) {
  console.log(
    level,
    messages
  );
}
```

Call:

```js
log(
  "INFO",
  "User loaded",
  "Employee API",
  200
);
```

Inside:

```text
level
→ "INFO"

messages
→ [
    "User loaded",
    "Employee API",
    200
  ]
```

---

# 66. Rest Parameters for Validation 🔥🔥

```js
function allTruthy(
  ...values
) {
  return values.every(
    Boolean
  );
}
```

Usage:

```js
console.log(
  allTruthy(
    "Rahul",
    10,
    true
  )
);
```

Output:

```text
true
```

---

# 67. Rest Parameters for `max()`

```js
function max(
  ...numbers
) {
  return Math.max(
    ...numbers
  );
}
```

Notice both are used:

```text
REST
→ collect arguments into numbers

SPREAD
→ expand numbers into Math.max()
```

This is a perfect example of both together.

---

# 68. Spread + Rest Together 🔥🔥🔥

```js
function multiplyAll(
  multiplier,
  ...numbers
) {
  return numbers.map(
    (number) =>
      number * multiplier
  );
}
```

Call:

```js
const values = [
  1,
  2,
  3,
];

const result =
  multiplyAll(
    10,
    ...values
  );
```

Here:

```text
...values
→ SPREAD

...numbers
→ REST
```

Result:

```text
[10, 20, 30]
```

---

# 69. Interview Output — Array Spread 🔥🔥🔥

```js
const a = [
  1,
  2,
];

const b = [
  ...a,
  3,
];

console.log(b);
```

Output:

```text
[1, 2, 3]
```

---

# 70. Interview Output — Spread Copy Equality

```js
const a = [
  1,
  2,
];

const b = [
  ...a,
];

console.log(
  a === b
);
```

Output:

```text
false
```

New outer array.

---

# 71. Interview Output — Shallow Array Copy 🔥🔥🔥

```js
const a = [
  {
    value: 10,
  },
];

const b = [
  ...a,
];

b[0].value = 20;

console.log(
  a[0].value
);
```

Output:

```text
20
```

Nested object is shared.

---

# 72. Interview Output — Object Spread Order 🔥🔥🔥

```js
const employee = {
  salary: 50000,
};

const updated = {
  salary: 70000,
  ...employee,
};

console.log(
  updated.salary
);
```

Output:

```text
50000
```

Last value wins.

---

# 73. Interview Output — Rest Parameter

```js
function test(
  first,
  ...rest
) {
  console.log(first);
  console.log(rest);
}

test(
  1,
  2,
  3,
  4
);
```

Output:

```text
1
[2, 3, 4]
```

---

# 74. Interview Output — Spread Into Function

```js
function add(
  a,
  b,
  c
) {
  return a + b + c;
}

const values = [
  1,
  2,
  3,
];

console.log(
  add(
    ...values
  )
);
```

Output:

```text
6
```

---

# 75. Interview Question — Spread vs Rest 🔥🔥🔥

Good answer:

```text
Both use ...

Spread
→ expands a collection into individual values

Rest
→ collects remaining values into an array/object
```

Examples:

```js
const copy = [
  ...arr
];
```

Spread.

```js
function test(
  ...args
) {
}
```

Rest.

---

# 76. Interview Question — Does Spread Deep Clone?

No.

```js
const copy = {
  ...object,
};
```

and:

```js
const copy = [
  ...array,
];
```

create shallow copies.

Nested reference values can remain shared.

---

# 77. Interview Question — Why Must Rest Be Last?

Because rest means:

```text
collect all remaining values
```

So JavaScript cannot determine meaningful parameters/items after it.

Invalid:

```js
function test(
  ...args,
  last
) {
}
```

---

# 78. Interview Question — Rest Parameter Type

Rest parameters produce:

```text
a real Array
```

Example:

```js
function test(
  ...args
) {
  console.log(
    Array.isArray(args)
  );
}
```

Output:

```text
true
```

---

# 79. Interview Question — Spread vs `push()`

Suppose:

```js
const arr = [
  1,
  2,
];
```

Mutation:

```js
arr.push(3);
```

Immutable-style new array:

```js
const updated = [
  ...arr,
  3,
];
```

Difference:

```text
push()
→ changes original

spread
→ can create a new array
```

---

# 80. Debugging — Wrong Object Spread Order 🔥🔥🔥

Goal:

```text
salary = 70000
```

Bad:

```js
const updated = {
  salary: 70000,
  ...employee,
};
```

If `employee.salary` is `50000`, result becomes:

```text
50000
```

Fix:

```js
const updated = {
  ...employee,
  salary: 70000,
};
```

---

# 81. Debugging — Assuming Deep Copy 🔥🔥🔥

Bad assumption:

```js
const copy = {
  ...employee,
};

copy.address.city =
  "Bangalore";
```

You may accidentally mutate original nested data.

Fix:

```js
const copy = {
  ...employee,

  address: {
    ...employee.address,
    city: "Bangalore",
  },
};
```

---

# 82. Debugging — Rest in Wrong Position

Invalid:

```js
const [
  ...rest,
  last
] = numbers;
```

Invalid:

```js
function test(
  ...args,
  last
) {
}
```

Rule:

```text
rest must be last
```

---

# 83. Debugging — Spread Non-Iterable Into Array 🔥🔥

This fails:

```js
const user = {
  name: "Rahul",
};

const result = [
  ...user,
];
```

Why?

A normal plain object is not iterable by default.

But object spread is valid:

```js
const copy = {
  ...user,
};
```

Important distinction:

```text
array spread context
→ needs iterable

object spread context
→ copies enumerable properties
```

---

# 84. Debugging — Mutating Then Spreading

This is technically possible:

```js
employees.push(
  newEmployee
);

const copy = [
  ...employees,
];
```

But the original array was already mutated before copying.

If immutability is the goal, do:

```js
const updated = [
  ...employees,
  newEmployee,
];
```

Avoid unnecessary mutation first.

---

# 85. Machine-Coding Pattern — Add Item 🔥🔥🔥

```js
function addEmployee(
  employees,
  employee
) {
  return [
    ...employees,
    employee,
  ];
}
```

Pure and reusable.

---

# 86. Machine-Coding Pattern — Merge Pages

```js
function appendPage(
  current,
  nextPage
) {
  return [
    ...current,
    ...nextPage,
  ];
}
```

Useful for:

```text
pagination
infinite scroll
load more
```

---

# 87. Machine-Coding Pattern — Update Form Field 🔥🔥🔥

```js
function updateField(
  form,
  field,
  value
) {
  return {
    ...form,
    [field]: value,
  };
}
```

Very important reusable pattern.

---

# 88. Machine-Coding Pattern — Merge Config 🔥🔥

```js
const defaultConfig = {
  pageSize: 20,
  sortOrder: "asc",
  retries: 3,
};

const userConfig = {
  pageSize: 50,
};

const config = {
  ...defaultConfig,
  ...userConfig,
};
```

Result:

```js
{
  pageSize: 50,
  sortOrder: "asc",
  retries: 3
}
```

User values override defaults because they come later.

---

# 89. Machine-Coding Pattern — Build Optional Payload

```js
function buildPayload({
  name,
  salary,
  department,
}) {
  return {
    name,

    ...(salary != null
      ? { salary }
      : {}),

    ...(department
      ? { department }
      : {}),
  };
}
```

Useful when only defined fields should be sent.

---

# 90. Machine-Coding Pattern — Variadic Utility 🔥🔥🔥

```js
function mergeArrays(
  ...arrays
) {
  return arrays.flat();
}
```

Call:

```js
mergeArrays(
  [1, 2],
  [3, 4],
  [5]
);
```

Output:

```text
[1, 2, 3, 4, 5]
```

Rest collects all arrays.

---

# 91. Machine-Coding Pattern — `unique()`

```js
function unique(
  values
) {
  return [
    ...new Set(values),
  ];
}
```

Usage:

```js
unique([
  1,
  2,
  2,
  3,
]);
```

Output:

```text
[1, 2, 3]
```

---

# 92. Machine-Coding Pattern — Max Utility

```js
function getMax(
  values
) {
  return Math.max(
    ...values
  );
}
```

Simple practical spread usage.

---

# 93. Practical Decision Guide 🔥🔥🔥

Ask:

```text
Need to copy an array?
→ [...array]

Need to merge arrays?
→ [...a, ...b]

Need to add item immutably?
→ [...array, item]

Need to copy object?
→ { ...object }

Need to merge objects?
→ { ...a, ...b }

Need dynamic object update?
→ { ...obj, [key]: value }

Need nested immutable update?
→ spread every changed level

Need array values as function arguments?
→ fn(...array)

Need variable number of function arguments?
→ function fn(...args)

Need remaining array values?
→ [first, ...rest]

Need remaining object properties?
→ { id, ...rest }
```

---

# 94. Most Important Rules 🔥🔥🔥

```text
Spread
→ expands values

Rest
→ collects values

Both use
→ ...

Array/object spread copies are shallow.

Object spread order matters.

Last property wins.

Rest parameters produce a real array.

Rest must be last.

Plain objects cannot normally be spread into arrays.

Spread is heavily used for immutable updates.

Copy every nested level you modify.
```

---

# Quick Memory 🧠

Spread array:

```js
const copy = [
  ...array,
];
```

Merge arrays:

```js
const merged = [
  ...a,
  ...b,
];
```

Add item:

```js
const updated = [
  ...array,
  item,
];
```

Spread object:

```js
const copy = {
  ...object,
};
```

Update object:

```js
const updated = {
  ...object,
  salary: 60000,
};
```

Dynamic update:

```js
const updated = {
  ...object,
  [key]: value,
};
```

Nested update:

```js
const updated = {
  ...employee,

  address: {
    ...employee.address,
    city: "Bangalore",
  },
};
```

Spread arguments:

```js
fn(
  ...values
);
```

Rest parameters:

```js
function fn(
  ...args
) {
}
```

Array rest:

```js
const [
  first,
  ...rest
] = array;
```

Object rest:

```js
const {
  id,
  ...rest
} = object;
```

Core mental model:

```text
SPREAD
collection
↓
individual values

REST
individual values
↓
collection
```

Important:

```text
spread copy
→ shallow

rest
→ must be last
```

Most important practical uses:

```text
immutable array updates
immutable object updates
merge arrays
merge objects
dynamic forms
API payloads
React state
infinite scroll
function arguments
variadic utilities
remove object properties
```

## ✅ 6.11 Spread / Rest complete

**Next: 6.12 Strings 🔥🔥🔥**
