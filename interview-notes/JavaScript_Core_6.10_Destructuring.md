# 6.10 Destructuring 🔥🔥🔥

Destructuring is a JavaScript syntax used to extract values from:

```text
arrays
objects
```

and store them in variables.

Instead of repeatedly writing:

```js
const name = employee.name;
const salary = employee.salary;
```

we can write:

```js
const {
  name,
  salary,
} = employee;
```

Think:

```text
Object / Array
↓
pick values
↓
store them in variables
```

Destructuring is used constantly in:

```text
React props
React state
API responses
function parameters
configuration
array processing
object transformations
machine coding
```

---

# 1. Array Destructuring 🔥🔥🔥

Suppose:

```js
const skills = [
  "JavaScript",
  "React",
  "Node",
];
```

Traditional way:

```js
const first = skills[0];
const second = skills[1];
const third = skills[2];
```

Using destructuring:

```js
const [
  first,
  second,
  third,
] = skills;
```

Now:

```js
console.log(first);
console.log(second);
console.log(third);
```

Output:

```text
JavaScript
React
Node
```

---

# 2. Array Destructuring Uses Position 🔥🔥🔥

This is extremely important.

Array destructuring works by:

```text
position / index
```

Example:

```js
const colors = [
  "red",
  "green",
  "blue",
];

const [
  first,
  second,
] = colors;
```

Result:

```text
first
→ "red"

second
→ "green"
```

The variable names can be anything.

```js
const [
  a,
  b,
] = colors;
```

still means:

```text
a
→ index 0

b
→ index 1
```

---

# 3. Skip Array Items

Suppose:

```js
const values = [
  "A",
  "B",
  "C",
];
```

If we only need the first and third values:

```js
const [
  first,
  ,
  third,
] = values;
```

Now:

```js
console.log(first);
console.log(third);
```

Output:

```text
A
C
```

The empty position skips:

```text
index 1
```

---

# 4. Array Destructuring Default Values 🔥🔥

```js
const values = [
  "A",
];

const [
  first,
  second = "Default",
] = values;
```

Now:

```text
first
→ "A"

second
→ "Default"
```

Default values are useful when an array item may be missing.

---

# 5. Default Value Applies to `undefined`

```js
const values = [
  undefined,
  null,
];
```

Destructure:

```js
const [
  first = "A",
  second = "B",
] = values;
```

Result:

```text
first
→ "A"

second
→ null
```

Important:

```text
default value
→ used for undefined

default value
→ NOT used for null
```

Same rule as default function parameters.

---

# 6. Array Destructuring Rest 🔥🔥🔥

Use rest syntax to collect remaining values.

```js
const numbers = [
  10,
  20,
  30,
  40,
];
```

Destructure:

```js
const [
  first,
  second,
  ...rest
] = numbers;
```

Now:

```text
first
→ 10

second
→ 20

rest
→ [30, 40]
```

Important:

```text
rest
→ collects remaining values into an array
```

---

# 7. Rest Must Be Last

Valid:

```js
const [
  first,
  ...rest
] = numbers;
```

Invalid:

```js
const [
  ...rest,
  last
] = numbers;
```

❌ Syntax error.

Why?

Rest means:

```text
collect everything remaining
```

so nothing can come after it.

---

# 8. Swap Variables Using Array Destructuring 🔥🔥

Traditional swap may require a temporary variable.

Destructuring version:

```js
let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a);
console.log(b);
```

Output:

```text
20
10
```

Useful interview syntax.

---

# 9. Nested Array Destructuring

Suppose:

```js
const data = [
  "Rahul",
  [
    "React",
    "JavaScript",
  ],
];
```

Destructure:

```js
const [
  name,
  [
    firstSkill,
    secondSkill,
  ],
] = data;
```

Now:

```text
name
→ "Rahul"

firstSkill
→ "React"

secondSkill
→ "JavaScript"
```

---

# 10. Practical Array Destructuring — API Tuple

Some APIs or utilities return arrays where positions have meaning.

Example:

```js
const result = [
  true,
  {
    id: 1,
    name: "Rahul",
  },
];
```

Destructure:

```js
const [
  success,
  employee,
] = result;
```

Now:

```text
success
→ true

employee
→ employee object
```

---

# 11. React-Style Array Destructuring 🔥🔥🔥

You have seen syntax like:

```js
const [
  count,
  setCount,
] = useState(0);
```

Conceptually:

```text
useState(...)
↓
returns an array
↓
[index 0, index 1]
↓
[count, setCount]
```

The variable names are chosen by us.

Position determines what value we receive.

---

# 12. Object Destructuring 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
  department: "UI",
};
```

Traditional:

```js
const name =
  employee.name;

const salary =
  employee.salary;
```

Destructuring:

```js
const {
  name,
  salary,
} = employee;
```

Now:

```text
name
→ "Rahul"

salary
→ 50000
```

---

# 13. Object Destructuring Uses Property Names 🔥🔥🔥

This is the main difference from arrays.

Array destructuring:

```text
position matters
```

Object destructuring:

```text
property name matters
```

Example:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};
```

This works:

```js
const {
  salary,
  name,
} = employee;
```

Even though order is different.

Why?

JavaScript matches:

```text
salary → salary property
name   → name property
```

---

# 14. Array vs Object Destructuring 🔥🔥🔥

Array:

```js
const [
  first,
  second,
] = values;
```

Meaning:

```text
first
→ index 0

second
→ index 1
```

Object:

```js
const {
  name,
  salary,
} = employee;
```

Meaning:

```text
name
→ property "name"

salary
→ property "salary"
```

Easy memory:

```text
Array destructuring
→ POSITION

Object destructuring
→ PROPERTY NAME
```

---

# 15. Object Destructuring Rename 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
};
```

You want a variable called:

```text
employeeName
```

Use:

```js
const {
  name: employeeName,
} = employee;
```

Now:

```text
employeeName
→ "Rahul"
```

Important:

```text
name
→ property name

employeeName
→ new variable name
```

---

# 16. Rename Does Not Create Both Variables

After:

```js
const {
  name: employeeName,
} = employee;
```

this exists:

```text
employeeName
```

But this does not:

```text
name
```

unless it was declared separately.

Common interview trap.

---

# 17. Object Destructuring Default Value 🔥🔥

```js
const employee = {
  name: "Rahul",
};
```

Destructure:

```js
const {
  name,
  department = "General",
} = employee;
```

Now:

```text
name
→ "Rahul"

department
→ "General"
```

---

# 18. Default Applies Only to `undefined`

```js
const employee = {
  department: null,
};
```

Destructure:

```js
const {
  department = "General",
} = employee;
```

Result:

```text
department
→ null
```

Why?

Default values are used when the property value is:

```text
undefined
```

not:

```text
null
```

---

# 19. Rename + Default Together 🔥🔥🔥

You can rename and provide a default value.

```js
const employee = {};
```

Destructure:

```js
const {
  name: employeeName = "Unknown",
} = employee;
```

Now:

```text
employeeName
→ "Unknown"
```

Read it as:

```text
property "name"
↓
store in variable employeeName
↓
default to "Unknown" if undefined
```

---

# 20. Object Rest Destructuring 🔥🔥🔥

Suppose:

```js
const employee = {
  id: 1,
  name: "Rahul",
  salary: 50000,
  department: "UI",
};
```

Destructure:

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

contains:

```js
{
  name: "Rahul",
  salary: 50000,
  department: "UI"
}
```

---

# 21. Remove Property Immutably 🔥🔥🔥

Very useful pattern.

```js
const employee = {
  id: 1,
  name: "Rahul",
  password: "secret",
};
```

Remove `password` without changing the original object:

```js
const {
  password,
  ...safeEmployee
} = employee;
```

Now:

```js
console.log(safeEmployee);
```

Result:

```js
{
  id: 1,
  name: "Rahul"
}
```

Original object still has `password`.

---

# 22. Rest Creates a New Object

Example:

```js
const {
  password,
  ...safeEmployee
} = employee;
```

Then:

```js
console.log(
  safeEmployee === employee
);
```

Output:

```text
false
```

`safeEmployee` is a new object.

But remember:

```text
object rest
→ shallow copy
```

Nested objects may still be shared.

---

# 23. Nested Object Destructuring 🔥🔥🔥

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

Destructure city:

```js
const {
  address: {
    city,
  },
} = employee;
```

Now:

```text
city
→ "Hyderabad"
```

---

# 24. Important Nested Destructuring Trap 🔥🔥🔥

After:

```js
const {
  address: {
    city,
  },
} = employee;
```

you get:

```text
city
```

But you do NOT automatically get a separate variable named:

```text
address
```

Here `address` is used as the path to reach `city`.

---

# 25. Keep Both Nested Object and Property

If you need both:

```text
address
and
city
```

you can do:

```js
const {
  address,
  address: {
    city,
  },
} = employee;
```

Now both variables exist.

But avoid overly clever destructuring if readability suffers.

---

# 26. Nested Default Values 🔥🔥

Suppose:

```js
const employee = {
  address: {},
};
```

Use:

```js
const {
  address: {
    city = "Unknown",
  },
} = employee;
```

Now:

```text
city
→ "Unknown"
```

---

# 27. Missing Nested Object Trap 🔥🔥🔥

This can fail:

```js
const employee = {};

const {
  address: {
    city,
  },
} = employee;
```

Why?

```text
employee.address
→ undefined
```

Then JavaScript tries to destructure `city` from `undefined`.

That throws an error.

---

# 28. Safe Nested Destructuring With Default Object

Use:

```js
const employee = {};

const {
  address: {
    city = "Unknown",
  } = {},
} = employee;
```

Now:

```text
city
→ "Unknown"
```

Important pattern:

```text
nested object may be missing
→ default it to {}
```

---

# 29. Function Parameter Destructuring 🔥🔥🔥

Instead of:

```js
function printEmployee(employee) {
  console.log(employee.name);
  console.log(employee.salary);
}
```

write:

```js
function printEmployee({
  name,
  salary,
}) {
  console.log(name);
  console.log(salary);
}
```

Call:

```js
printEmployee({
  name: "Rahul",
  salary: 50000,
});
```

Output:

```text
Rahul
50000
```

---

# 30. Why Parameter Destructuring Is Useful

It makes required inputs visible immediately.

Compare:

```js
function createCard(employee) {
}
```

vs:

```js
function createCard({
  name,
  role,
  department,
}) {
}
```

The second version tells us what properties the function uses.

---

# 31. Function Parameter Defaults 🔥🔥🔥

Suppose:

```js
function printEmployee({
  name = "Unknown",
  department = "General",
}) {
  console.log(
    name,
    department
  );
}
```

Call:

```js
printEmployee({
  name: "Rahul",
});
```

Output:

```text
Rahul General
```

---

# 32. Missing Function Argument Trap 🔥🔥🔥

This function:

```js
function printEmployee({
  name,
}) {
  console.log(name);
}
```

If called like:

```js
printEmployee();
```

throws an error.

Why?

JavaScript tries to destructure from:

```text
undefined
```

---

# 33. Safe Function Parameter Destructuring

Use a default object:

```js
function printEmployee({
  name = "Unknown",
} = {}) {
  console.log(name);
}
```

Now:

```js
printEmployee();
```

Output:

```text
Unknown
```

Very useful defensive pattern.

---

# 34. Destructuring API Response 🔥🔥🔥

Suppose API response:

```js
const response = {
  data: {
    employees: [
      {
        id: 1,
        name: "Rahul",
      },
    ],
  },

  status: 200,
};
```

Instead of:

```js
const employees =
  response.data.employees;

const status =
  response.status;
```

we can write:

```js
const {
  data: {
    employees,
  },
  status,
} = response;
```

Now:

```text
employees
→ employee array

status
→ 200
```

---

# 35. More Readable API Destructuring

Sometimes deeply nested destructuring is harder to read.

Instead of:

```js
const {
  data: {
    employees,
  },
} = response;
```

you may prefer:

```js
const {
  data,
} = response;

const {
  employees,
} = data;
```

Both are valid.

Practical rule:

```text
Use destructuring to improve readability,
not to show off syntax.
```

---

# 36. Destructure Inside Array Methods 🔥🔥🔥

Suppose:

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
    salary: 50000,
  },
  {
    id: 2,
    name: "Amit",
    salary: 60000,
  },
];
```

Instead of:

```js
const names = employees.map(
  (employee) =>
    employee.name
);
```

you can destructure the callback parameter:

```js
const names = employees.map(
  ({ name }) => name
);
```

Output:

```text
["Rahul", "Amit"]
```

Very common modern JavaScript pattern.

---

# 37. Destructuring in `filter()`

```js
const activeEmployees =
  employees.filter(
    ({ active }) => active
  );
```

Read:

```text
for each employee
↓
extract active
↓
return active
```

---

# 38. Destructuring in `reduce()`

Suppose:

```js
const employees = [
  {
    salary: 50000,
  },
  {
    salary: 60000,
  },
];
```

Use:

```js
const total =
  employees.reduce(
    (
      sum,
      { salary }
    ) =>
      sum + salary,
    0
  );
```

Output:

```text
110000
```

---

# 39. Destructuring `Object.entries()` 🔥🔥🔥

Remember:

```js
Object.entries(object)
```

returns:

```text
[key, value]
```

pairs.

So:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};
```

We can write:

```js
for (
  const [key, value]
  of Object.entries(employee)
) {
  console.log(key, value);
}
```

Here:

```text
[key, value]
```

is array destructuring.

---

# 40. Practical `Object.entries()` Transformation

```js
const filters = {
  department: "UI",
  active: true,
  search: "",
};
```

Use:

```js
const activeFilters =
  Object.entries(filters).filter(
    ([key, value]) =>
      value !== ""
  );
```

Here:

```text
key
value
```

come from each entry array.

---

# 41. Destructuring With `for...of`

```js
const entries = [
  ["name", "Rahul"],
  ["salary", 50000],
];
```

Instead of:

```js
for (const entry of entries) {
  console.log(
    entry[0],
    entry[1]
  );
}
```

use:

```js
for (
  const [key, value]
  of entries
) {
  console.log(key, value);
}
```

Cleaner and easier to understand.

---

# 42. Array Destructuring Returned Function Values

Suppose:

```js
function getEmployeeInfo() {
  return [
    "Rahul",
    50000,
  ];
}
```

Use:

```js
const [
  name,
  salary,
] = getEmployeeInfo();
```

Now:

```text
name
→ "Rahul"

salary
→ 50000
```

---

# 43. Object Destructuring Returned Function Values

```js
function getEmployee() {
  return {
    name: "Rahul",
    salary: 50000,
  };
}
```

Use:

```js
const {
  name,
  salary,
} = getEmployee();
```

Very common with utilities and API helpers.

---

# 44. Array vs Object Return Design — Practical Awareness

Array return:

```js
return [
  data,
  error,
];
```

Usage:

```js
const [
  data,
  error,
] = result;
```

Object return:

```js
return {
  data,
  error,
};
```

Usage:

```js
const {
  data,
  error,
} = result;
```

Difference:

```text
Array
→ caller depends on position

Object
→ caller depends on property names
```

For many values, object returns can be easier to understand.

---

# 45. Destructuring Assignment Without Declaration 🔥🔥

Normally:

```js
const {
  name,
} = employee;
```

But destructuring can also assign to existing variables.

Object example:

```js
let name;
let salary;

({
  name,
  salary,
} = employee);
```

Notice the parentheses:

```text
(...)
```

They are required here so JavaScript interprets `{}` as an object destructuring assignment rather than a block.

This is more interview awareness than daily-use priority.

---

# 46. Array Assignment Without Declaration

Much simpler:

```js
let a;
let b;

[a, b] = [10, 20];
```

Now:

```text
a
→ 10

b
→ 20
```

No extra parentheses needed.

---

# 47. Destructuring Does Not Mutate Source 🔥🔥🔥

Example:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

const {
  name,
} = employee;
```

This does not modify:

```js
employee
```

It only reads values.

Same for array destructuring:

```js
const [
  first,
] = numbers;
```

It does not remove the first item.

---

# 48. Destructured Primitive Is Independent

```js
const employee = {
  salary: 50000,
};

let {
  salary,
} = employee;

salary = 70000;

console.log(
  employee.salary
);
```

Output:

```text
50000
```

Why?

`salary` is a primitive number copied into a separate variable.

Changing the variable does not change the object property.

---

# 49. Destructured Object Can Share Reference 🔥🔥🔥

Suppose:

```js
const employee = {
  address: {
    city: "Hyderabad",
  },
};
```

Destructure:

```js
const {
  address,
} = employee;
```

Now:

```js
address.city = "Bangalore";
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

Why?

`address` is an object reference.

Destructuring does not deep-clone it.

---

# 50. Important Mental Model

Destructuring:

```text
does NOT mean cloning everything
```

It means:

```text
extract values
```

For primitives:

```text
copied primitive value
```

For objects/arrays:

```text
copied reference value
```

We will go deeper into reference behavior later.

---

# 51. Renaming API Fields 🔥🔥🔥

Suppose API returns:

```js
const employee = {
  first_name: "Rahul",
  annual_salary: 50000,
};
```

You want cleaner local names:

```js
const {
  first_name: firstName,
  annual_salary: salary,
} = employee;
```

Now:

```text
firstName
→ "Rahul"

salary
→ 50000
```

Very useful when API naming conventions differ from frontend naming conventions.

---

# 52. Destructuring Configuration

Suppose:

```js
const config = {
  pageSize: 20,
  sortOrder: "asc",
};
```

Function:

```js
function loadEmployees({
  pageSize = 10,
  sortOrder = "desc",
} = {}) {
  console.log(
    pageSize,
    sortOrder
  );
}
```

Call:

```js
loadEmployees(config);
```

Output:

```text
20 asc
```

This pattern is excellent when a function has multiple optional settings.

---

# 53. Why Config Object Is Better Than Many Parameters 🔥🔥🔥

Instead of:

```js
loadEmployees(
  20,
  "asc",
  true,
  "UI"
);
```

use:

```js
loadEmployees({
  pageSize: 20,
  sortOrder: "asc",
  activeOnly: true,
  department: "UI",
});
```

Then destructure:

```js
function loadEmployees({
  pageSize,
  sortOrder,
  activeOnly,
  department,
}) {
}
```

Advantages:

```text
readable call-site
argument order less fragile
easy optional values
easy defaults
easy extension
```

Very useful in machine coding.

---

# 54. Real Form Example 🔥🔥🔥

Suppose form state:

```js
const form = {
  name: "Rahul",
  email: "rahul@example.com",
  department: "UI",
};
```

Extract:

```js
const {
  name,
  email,
  department,
} = form;
```

Then validation becomes cleaner:

```js
if (!name.trim()) {
  console.log(
    "Name required"
  );
}
```

---

# 55. Real API Function Example

```js
function normalizeEmployee({
  id,
  name,
  salary,
  department = "General",
}) {
  return {
    id: Number(id),

    name:
      name?.trim() ?? "",

    salary:
      Number(salary),

    department,
  };
}
```

Usage:

```js
const normalized =
  normalizeEmployee({
    id: "101",
    name: " Rahul ",
    salary: "50000",
  });
```

Very practical combination of:

```text
parameter destructuring
defaults
type conversion
object creation
```

---

# 56. Machine-Coding Pattern — Search Callback

Instead of:

```js
employees.filter(
  (employee) =>
    employee.name
      .toLowerCase()
      .includes(query)
);
```

you can write:

```js
employees.filter(
  ({ name }) =>
    name
      .toLowerCase()
      .includes(query)
);
```

Good when only a few properties are needed.

---

# 57. Machine-Coding Pattern — Sorting Callback

```js
employees.toSorted(
  (
    { salary: salaryA },
    { salary: salaryB }
  ) =>
    salaryA - salaryB
);
```

This is valid.

But compare readability with:

```js
employees.toSorted(
  (a, b) =>
    a.salary - b.salary
);
```

Practical rule:

```text
Destructure only when it improves clarity.
```

Do not force destructuring everywhere.

---

# 58. Machine-Coding Pattern — Remove Multiple Properties 🔥🔥🔥

```js
function sanitizeUser(user) {
  const {
    password,
    token,
    internalId,
    ...publicUser
  } = user;

  return publicUser;
}
```

This is a clean immutable transformation.

---

# 59. Machine-Coding Pattern — Separate Metadata

```js
const employee = {
  id: 1,
  name: "Rahul",
  salary: 50000,
  createdAt: "2026-01-01",
  updatedAt: "2026-02-01",
};
```

Use:

```js
const {
  createdAt,
  updatedAt,
  ...employeeData
} = employee;
```

Now:

```text
employeeData
→ business fields

createdAt / updatedAt
→ metadata
```

---

# 60. Interview Output 1 — Array Position 🔥🔥🔥

```js
const values = [
  "A",
  "B",
];

const [
  second,
  first,
] = values;

console.log(
  first,
  second
);
```

Output:

```text
B A
```

Why?

Variable names do not affect position.

```text
second
→ index 0 → "A"

first
→ index 1 → "B"
```

---

# 61. Interview Output 2 — Object Order

```js
const user = {
  name: "Rahul",
  age: 30,
};

const {
  age,
  name,
} = user;

console.log(
  name,
  age
);
```

Output:

```text
Rahul 30
```

Object destructuring matches property names, not declaration order.

---

# 62. Interview Output 3 — Default Value 🔥🔥

```js
const user = {
  name: undefined,
};

const {
  name = "Guest",
} = user;

console.log(name);
```

Output:

```text
Guest
```

---

# 63. Interview Output 4 — `null` With Default

```js
const user = {
  name: null,
};

const {
  name = "Guest",
} = user;

console.log(name);
```

Output:

```text
null
```

Default only replaces:

```text
undefined
```

---

# 64. Interview Output 5 — Rename 🔥🔥

```js
const user = {
  name: "Rahul",
};

const {
  name: userName,
} = user;

console.log(userName);
```

Output:

```text
Rahul
```

But:

```js
console.log(name);
```

would fail if `name` was not declared elsewhere.

---

# 65. Interview Output 6 — Array Rest

```js
const [
  first,
  ...rest
] = [
  1,
  2,
  3,
  4,
];

console.log(first);
console.log(rest);
```

Output:

```text
1
[2, 3, 4]
```

---

# 66. Interview Output 7 — Object Rest 🔥🔥🔥

```js
const user = {
  id: 1,
  name: "Rahul",
  age: 30,
};

const {
  id,
  ...details
} = user;

console.log(id);
console.log(details);
```

Output:

```text
1
```

and:

```js
{
  name: "Rahul",
  age: 30
}
```

---

# 67. Interview Output 8 — Nested Reference 🔥🔥🔥

```js
const user = {
  address: {
    city: "A",
  },
};

const {
  address,
} = user;

address.city = "B";

console.log(
  user.address.city
);
```

Output:

```text
B
```

Because `address` is still a reference to the same nested object.

---

# 68. Interview Output 9 — Skip Values

```js
const values = [
  10,
  20,
  30,
];

const [
  first,
  ,
  third,
] = values;

console.log(
  first,
  third
);
```

Output:

```text
10 30
```

---

# 69. Interview Output 10 — Missing Array Item

```js
const [
  first,
  second,
] = [10];

console.log(
  first,
  second
);
```

Output:

```text
10 undefined
```

---

# 70. Interview Question — What Is Destructuring?

Good answer:

> Destructuring is JavaScript syntax for extracting values from arrays or properties from objects into variables.

---

# 71. Interview Question — Array vs Object Destructuring 🔥🔥🔥

Good answer:

```text
Array destructuring
→ based on position

Object destructuring
→ based on property names
```

---

# 72. Interview Question — How Do You Rename an Object Property?

```js
const {
  name: employeeName,
} = employee;
```

Meaning:

```text
read property "name"
↓
store in variable employeeName
```

---

# 73. Interview Question — How Do Defaults Work?

```js
const {
  role = "User",
} = object;
```

The default is used when the extracted value is:

```text
undefined
```

It is not used for:

```text
null
false
0
""
```

---

# 74. Interview Question — What Does Rest Do in Destructuring?

Array:

```js
const [
  first,
  ...rest
] = arr;
```

Rest collects remaining array items.

Object:

```js
const {
  id,
  ...rest
} = obj;
```

Rest collects remaining object properties into a new object.

---

# 75. Interview Question — Does Destructuring Clone Nested Objects?

No.

Example:

```js
const {
  address,
} = employee;
```

`address` receives the same nested object reference.

Destructuring does not automatically deep-clone values.

---

# 76. Debugging — Wrong Array Order 🔥🔥🔥

Suppose:

```js
const result = [
  data,
  error,
];
```

Wrong assumption:

```js
const [
  error,
  data,
] = result;
```

Now values are reversed.

Why?

Array destructuring depends on position.

---

# 77. Debugging — Wrong Object Property Name

```js
const employee = {
  name: "Rahul",
};
```

This:

```js
const {
  employeeName,
} = employee;
```

gives:

```text
undefined
```

Why?

JavaScript looks for a property called:

```text
employeeName
```

Correct rename:

```js
const {
  name: employeeName,
} = employee;
```

---

# 78. Debugging — Missing Nested Object 🔥🔥🔥

Bad:

```js
const user = {};

const {
  address: {
    city,
  },
} = user;
```

Error because:

```text
user.address
→ undefined
```

Safer:

```js
const {
  address: {
    city,
  } = {},
} = user;
```

---

# 79. Debugging — Missing Function Argument 🔥🔥🔥

Bad:

```js
function greet({
  name,
}) {
  console.log(name);
}

greet();
```

This throws because JavaScript destructures `undefined`.

Fix:

```js
function greet({
  name = "Guest",
} = {}) {
  console.log(name);
}
```

---

# 80. Debugging — Over-Destructuring

This is valid:

```js
const {
  company: {
    department: {
      manager: {
        profile: {
          name,
        },
      },
    },
  },
} = data;
```

But it may be painful to:

```text
read
debug
handle missing levels
maintain
```

Sometimes better:

```js
const department =
  data.company?.department;

const managerName =
  department?.manager?.profile?.name;
```

Important:

```text
Shorter syntax is not always clearer syntax.
```

---

# 81. Practical Decision Guide 🔥🔥🔥

```text
Need array items by position?
→ array destructuring

Need object properties by name?
→ object destructuring

Need to rename a property?
→ { oldName: newName }

Need fallback value?
→ { value = defaultValue }

Need remaining array items?
→ [first, ...rest]

Need remaining object properties?
→ { id, ...rest }

Need nested property?
→ nested destructuring

Nested property may be missing?
→ default nested object to {}

Function receives object config?
→ parameter destructuring
```

---

# 82. When Destructuring Helps Most 🔥🔥🔥

Use it when it improves readability.

Strong use cases:

```text
React props
useState-style tuples
API response extraction
function configuration objects
array callbacks
Object.entries()
removing object properties
renaming API fields
default values
```

---

# 83. When Not to Overuse It

Avoid destructuring just because you can.

Example:

```js
const {
  address: {
    location: {
      coordinates: {
        latitude,
        longitude,
      },
    },
  },
} = user;
```

may be harder to understand than a few clear intermediate variables.

Machine-coding rule:

```text
Readable
beats
clever
```

---

# Quick Memory 🧠

Array destructuring:

```js
const [
  first,
  second,
] = array;
```

Remember:

```text
ARRAY
→ POSITION
```

Skip item:

```js
const [
  first,
  ,
  third,
] = array;
```

Array rest:

```js
const [
  first,
  ...rest
] = array;
```

Object destructuring:

```js
const {
  name,
  salary,
} = employee;
```

Remember:

```text
OBJECT
→ PROPERTY NAME
```

Rename:

```js
const {
  name: employeeName,
} = employee;
```

Default:

```js
const {
  role = "User",
} = employee;
```

Rename + default:

```js
const {
  name: employeeName = "Unknown",
} = employee;
```

Object rest:

```js
const {
  id,
  ...details
} = employee;
```

Nested:

```js
const {
  address: {
    city,
  },
} = employee;
```

Safe nested:

```js
const {
  address: {
    city = "Unknown",
  } = {},
} = employee;
```

Function parameter:

```js
function printEmployee({
  name,
  salary,
}) {
}
```

Safe parameter:

```js
function printEmployee({
  name = "Unknown",
} = {}) {
}
```

Most important rules:

```text
Array destructuring
→ position matters

Object destructuring
→ property name matters

Defaults
→ apply to undefined

Rest
→ must be last

Destructuring
→ does not deep clone

Nested references
→ can still be shared
```

Most important practical uses:

```text
React props
API responses
function parameters
Object.entries()
remove properties
rename API fields
default config values
machine-coding transformations
```

## ✅ 6.10 Destructuring complete

**Next: 6.11 Spread / Rest 🔥🔥🔥**
