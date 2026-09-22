# 6.9 Objects 🔥🔥🔥

Objects are one of the most important parts of JavaScript.

An object stores related data using:

```text
key → value
```

Example:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
  department: "UI",
};
```

Here:

```text
name
salary
department
```

are properties / keys.

And:

```text
"Rahul"
50000
"UI"
```

are values.

Objects are used everywhere:

```text
API responses
form data
employee records
configuration
React state
Redux state
request payloads
normalized data
machine coding
```

Mental model:

```text
employee
│
├── name       → "Rahul"
├── salary     → 50000
└── department → "UI"
```

---

# 1. Creating an Object

The most common way is an object literal:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
  active: true,
};
```

An object can contain different value types:

```js
const employee = {
  name: "Rahul",
  age: 30,
  active: true,
  manager: null,
  skills: ["React", "JavaScript"],
};
```

---

# 2. Access Property — Dot Notation

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

console.log(employee.name);
```

Output:

```text
Rahul
```

Another:

```js
console.log(employee.salary);
```

Output:

```text
50000
```

---

# 3. Access Property — Bracket Notation 🔥🔥

```js
console.log(employee["name"]);
```

Output:

```text
Rahul
```

Both:

```js
employee.name
```

and:

```js
employee["name"]
```

can access the same property.

---

# 4. Dynamic Property Access 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

const key = "salary";
```

Wrong:

```js
console.log(employee.key);
```

Output:

```text
undefined
```

Why?

JavaScript looks for a property literally called:

```text
key
```

Correct:

```js
console.log(employee[key]);
```

Output:

```text
50000
```

Flow:

```text
key
↓
"salary"
↓
employee["salary"]
↓
50000
```

---

# 5. Dot vs Bracket Notation

Use dot notation when the property name is known:

```js
employee.name
```

Use bracket notation when the property name is dynamic:

```js
employee[key]
```

Bracket notation is also useful when a property name contains spaces or special characters:

```js
const user = {
  "full name": "Rahul Sharma",
};

console.log(user["full name"]);
```

Output:

```text
Rahul Sharma
```

---

# 6. Add a Property

```js
const employee = {
  name: "Rahul",
};

employee.salary = 50000;

console.log(employee);
```

Result:

```js
{
  name: "Rahul",
  salary: 50000
}
```

JavaScript objects are dynamic.

---

# 7. Update a Property

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

employee.salary = 60000;

console.log(employee.salary);
```

Output:

```text
60000
```

Objects are mutable.

---

# 8. Delete a Property

Use:

```js
delete
```

Example:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

delete employee.salary;

console.log(employee);
```

Result:

```js
{
  name: "Rahul"
}
```

---

# 9. `const` Object Can Still Change 🔥🔥🔥

This works:

```js
const employee = {
  name: "Rahul",
};

employee.name = "Amit";
employee.salary = 50000;
```

But this does not:

```js
employee = {};
```

❌ Error.

Why?

```text
const
→ prevents reassignment of the variable

const
does NOT make object properties immutable
```

Important interview statement:

```text
const prevents reassignment of the binding.
It does not prevent mutation of the referenced object.
```

---

# 10. Nested Objects 🔥🔥

Objects can contain other objects.

```js
const employee = {
  name: "Rahul",

  address: {
    city: "Hyderabad",
    state: "Telangana",
  },
};
```

Access:

```js
console.log(employee.address.city);
```

Output:

```text
Hyderabad
```

Mental model:

```text
employee
│
├── name
│
└── address
    ├── city
    └── state
```

---

# 11. Update Nested Property

```js
employee.address.city = "Bangalore";
```

Now:

```js
console.log(employee.address.city);
```

Output:

```text
Bangalore
```

This mutates the existing nested object.

---

# 12. Optional Chaining With Objects 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
  manager: null,
};
```

This throws an error:

```js
console.log(employee.manager.name);
```

Because:

```text
manager
→ null
```

Safer:

```js
console.log(employee.manager?.name);
```

Output:

```text
undefined
```

---

# 13. Optional Chaining + Nullish Coalescing

```js
const managerName =
  employee.manager?.name ?? "No Manager";

console.log(managerName);
```

Output:

```text
No Manager
```

Very common when reading uncertain API data.

---

# 14. Computed Property Names 🔥🔥🔥

You can create a property dynamically.

```js
const key = "department";

const employee = {
  name: "Rahul",
  [key]: "UI",
};

console.log(employee);
```

Result:

```js
{
  name: "Rahul",
  department: "UI"
}
```

The brackets mean:

```text
evaluate this expression
and use the result as the property key
```

---

# 15. Real Computed Property Example

```js
const fieldName = "salary";
const fieldValue = 60000;

const update = {
  [fieldName]: fieldValue,
};
```

Result:

```js
{
  salary: 60000
}
```

This pattern is useful for:

```text
dynamic forms
filters
generic state updates
reusable utilities
```

---

# 16. Property Shorthand 🔥🔥

Suppose:

```js
const name = "Rahul";
const salary = 50000;
```

Instead of:

```js
const employee = {
  name: name,
  salary: salary,
};
```

write:

```js
const employee = {
  name,
  salary,
};
```

JavaScript understands:

```text
property name
=
variable name
```

---

# 17. Method Shorthand

Instead of:

```js
const employee = {
  greet: function () {
    console.log("Hello");
  },
};
```

write:

```js
const employee = {
  greet() {
    console.log("Hello");
  },
};
```

Call:

```js
employee.greet();
```

Output:

```text
Hello
```

---

# 18. Object References 🔥🔥🔥

Consider:

```js
const employee1 = {
  name: "Rahul",
};

const employee2 = employee1;
```

Both variables refer to the same object.

```text
employee1
   \
    → same object
   /
employee2
```

Now:

```js
employee2.name = "Amit";
```

Then:

```js
console.log(employee1.name);
```

Output:

```text
Amit
```

Because both variables point to the same object.

---

# 19. Object Equality 🔥🔥🔥

```js
const a = {
  name: "Rahul",
};

const b = {
  name: "Rahul",
};

console.log(a === b);
```

Output:

```text
false
```

Why?

They are different object references.

JavaScript does not recursively compare object contents with `===`.

---

# 20. Same Reference Equality

```js
const a = {
  name: "Rahul",
};

const b = a;

console.log(a === b);
```

Output:

```text
true
```

Because both variables point to the same object.

---

# 21. Spread Copy 🔥🔥🔥

You can copy an object using spread:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

const copy = {
  ...employee,
};
```

Now:

```js
console.log(copy);
```

Result:

```js
{
  name: "Rahul",
  salary: 50000
}
```

And:

```js
console.log(copy === employee);
```

Output:

```text
false
```

The outer object is new.

---

# 22. Update Object Immutably 🔥🔥🔥

Very common:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

const updatedEmployee = {
  ...employee,
  salary: 60000,
};
```

Now:

```text
employee.salary
→ 50000

updatedEmployee.salary
→ 60000
```

Original object remains unchanged.

Extremely important in:

```text
React
Redux
state management
machine coding
```

---

# 23. Spread Order Matters 🔥🔥🔥

Consider:

```js
const employee = {
  salary: 50000,
};
```

This:

```js
const updated = {
  ...employee,
  salary: 70000,
};
```

gives:

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

gives:

```text
50000
```

Why?

Later properties overwrite earlier properties.

Easy rule:

```text
last value wins
```

---

# 24. Merge Objects With Spread 🔥🔥

```js
const personal = {
  name: "Rahul",
};

const work = {
  department: "UI",
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
  department: "UI",
  salary: 50000
}
```

---

# 25. Merge Conflict

```js
const a = {
  name: "Rahul",
};

const b = {
  name: "Amit",
};

const result = {
  ...a,
  ...b,
};
```

Result:

```text
name = "Amit"
```

Again:

```text
last value wins
```

---

# 26. Mutation vs Immutability 🔥🔥🔥

Mutation:

```js
employee.salary = 60000;
```

Same object changes.

Immutable update:

```js
const updatedEmployee = {
  ...employee,
  salary: 60000,
};
```

A new object is created.

Easy mental model:

```text
Mutation
→ change existing object

Immutability
→ create new object with changes
```

---

# 27. Why Immutability Matters

Immutability makes changes easier to:

```text
track
compare
debug
test
undo
reason about
```

Very important for predictable state management.

---

# 28. Shallow Copy 🔥🔥🔥

Object spread creates a shallow copy.

Example:

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
copy.address.city = "Bangalore";
```

Then:

```js
console.log(employee.address.city);
```

Output:

```text
Bangalore
```

Why?

The outer object was copied.

The nested `address` object is still shared.

---

# 29. Shallow Copy Mental Model

```text
employee
│
├── name: "Rahul"
└── address ───────┐
                   ↓
              { city: "..." }
                   ↑
copy               │
│                  │
├── name: "Rahul"  │
└── address ───────┘
```

Top-level object:

```text
new reference
```

Nested object:

```text
shared reference
```

---

# 30. Copy Nested Object Correctly 🔥🔥🔥

If you want to update nested data immutably:

```js
const updatedEmployee = {
  ...employee,

  address: {
    ...employee.address,
    city: "Bangalore",
  },
};
```

Now the changed levels get new references.

This is a very important React pattern.

---

# 31. Deep Copy Basics

A deep copy creates new nested structures too.

Modern JavaScript provides:

```js
structuredClone()
```

Example:

```js
const employee = {
  name: "Rahul",

  address: {
    city: "Hyderabad",
  },
};

const copy =
  structuredClone(employee);
```

Now:

```js
copy.address.city = "Bangalore";
```

Original:

```js
console.log(employee.address.city);
```

Output:

```text
Hyderabad
```

---

# 32. `structuredClone()` 🔥🔥

Basic usage:

```js
const clone =
  structuredClone(original);
```

It supports many structured JavaScript values.

But don't automatically deep-clone everything.

Often the better approach is:

```text
copy only the levels that actually change
```

---

# 33. JSON Deep Copy Trick — Awareness

You may see:

```js
const copy = JSON.parse(
  JSON.stringify(object)
);
```

This can work for simple JSON-compatible data.

But it is not a universal deep-clone solution.

Some JavaScript values/types are lost or changed during JSON serialization.

Prefer understanding the data and using an appropriate cloning strategy.

---

# 34. `Object.keys()` 🔥🔥🔥

Returns an array of the object's own enumerable property keys.

```js
const employee = {
  name: "Rahul",
  salary: 50000,
  department: "UI",
};

console.log(
  Object.keys(employee)
);
```

Output:

```text
[
  "name",
  "salary",
  "department"
]
```

Important:

```text
Object.keys()
→ returns an array
```

---

# 35. Practical `Object.keys()`

```js
for (
  const key
  of Object.keys(employee)
) {
  console.log(
    key,
    employee[key]
  );
}
```

Useful for dynamic object processing.

---

# 36. `Object.values()` 🔥🔥

Returns an array of property values.

```js
console.log(
  Object.values(employee)
);
```

Output:

```text
[
  "Rahul",
  50000,
  "UI"
]
```

---

# 37. `Object.entries()` 🔥🔥🔥

Returns an array of:

```text
[key, value]
```

pairs.

```js
console.log(
  Object.entries(employee)
);
```

Conceptual output:

```js
[
  ["name", "Rahul"],
  ["salary", 50000],
  ["department", "UI"]
]
```

---

# 38. Iterate With `Object.entries()`

```js
for (
  const [key, value]
  of Object.entries(employee)
) {
  console.log(key, value);
}
```

This is a clean modern object iteration pattern.

---

# 39. Keys vs Values vs Entries 🧠

```text
Object.keys(obj)
→ ["name", "salary"]

Object.values(obj)
→ ["Rahul", 50000]

Object.entries(obj)
→ [
    ["name", "Rahul"],
    ["salary", 50000]
  ]
```

---

# 40. `Object.fromEntries()` 🔥🔥

Converts `[key, value]` entries back to an object.

```js
const entries = [
  ["name", "Rahul"],
  ["salary", 50000],
];

const employee =
  Object.fromEntries(entries);
```

Result:

```js
{
  name: "Rahul",
  salary: 50000
}
```

Mental model:

```text
Object.entries()
Object → Array

Object.fromEntries()
Array → Object
```

---

# 41. Practical `Object.fromEntries()` 🔥🔥🔥

Suppose:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
  password: "secret",
};
```

Remove a property using transformation:

```js
const safeEmployee =
  Object.fromEntries(
    Object.entries(employee).filter(
      ([key]) =>
        key !== "password"
    )
  );
```

Result:

```js
{
  name: "Rahul",
  salary: 50000
}
```

---

# 42. `Object.assign()` 🔥🔥

Copies properties into a target object.

```js
const employee = {
  name: "Rahul",
};

const result = Object.assign(
  {},
  employee,
  {
    salary: 50000,
  }
);
```

Result:

```js
{
  name: "Rahul",
  salary: 50000
}
```

Modern code often uses spread:

```js
const result = {
  ...employee,
  salary: 50000,
};
```

---

# 43. `Object.assign()` Can Mutate Target 🔥🔥

```js
const employee = {
  name: "Rahul",
};

Object.assign(
  employee,
  {
    salary: 50000,
  }
);
```

Now `employee` itself changed.

Why?

```text
first argument
→ target object
```

If you want a new object:

```js
Object.assign(
  {},
  employee,
  update
);
```

---

# 44. `Object.hasOwn()` 🔥🔥🔥

Checks whether an object itself has a property.

```js
const employee = {
  name: "Rahul",
};

console.log(
  Object.hasOwn(
    employee,
    "name"
  )
);
```

Output:

```text
true
```

Missing:

```js
console.log(
  Object.hasOwn(
    employee,
    "salary"
  )
);
```

Output:

```text
false
```

---

# 45. Existing Property With `undefined` Value 🔥🔥🔥

Consider:

```js
const employee = {
  manager: undefined,
};
```

This:

```js
console.log(
  employee.manager
);
```

outputs:

```text
undefined
```

But:

```js
console.log(
  Object.hasOwn(
    employee,
    "manager"
  )
);
```

outputs:

```text
true
```

Important:

```text
property exists with undefined value
≠
property does not exist
```

---

# 46. `in` vs `Object.hasOwn()` 🔥🔥

`in` checks:

```text
object itself
+
prototype chain
```

Example:

```js
"name" in employee
```

`Object.hasOwn()` checks only the object's own property:

```js
Object.hasOwn(
  employee,
  "name"
);
```

Prototype behavior will be covered deeply later.

---

# 47. `Object.create()` 🔥🔥

Creates a new object with a specified prototype.

```js
const person = {
  greet() {
    return "Hello";
  },
};

const employee =
  Object.create(person);

employee.name = "Rahul";
```

Now:

```js
console.log(
  employee.greet()
);
```

Output:

```text
Hello
```

Why?

`greet` is found through the prototype chain.

We will cover this deeply under prototypes.

---

# 48. `Object.freeze()` 🔥🔥🔥

Freezes an object's own top-level properties.

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

Object.freeze(employee);
```

Attempts to:

```text
add properties
delete properties
change existing own data properties
```

will not successfully modify the frozen object.

In strict mode, invalid writes can throw errors.

---

# 49. `Object.freeze()` Is Shallow 🔥🔥🔥

```js
const employee = {
  name: "Rahul",

  address: {
    city: "Hyderabad",
  },
};

Object.freeze(employee);
```

This top-level change is blocked:

```js
employee.name = "Amit";
```

But nested object mutation is still possible:

```js
employee.address.city =
  "Bangalore";
```

So:

```text
Object.freeze()
→ shallow
```

---

# 50. `Object.seal()`

`Object.seal()` prevents:

```text
adding new properties
deleting properties
```

But existing writable properties can still change.

Example:

```js
const employee = {
  name: "Rahul",
};

Object.seal(employee);

employee.name = "Amit";
```

Existing property can change.

But:

```js
employee.salary = 50000;
```

will not add the new property.

---

# 51. `freeze()` vs `seal()` 🔥🔥🔥

```text
Object.freeze()
→ cannot add
→ cannot delete
→ cannot normally modify existing own data properties

Object.seal()
→ cannot add
→ cannot delete
→ existing writable properties can change
```

Both are shallow.

---

# 52. Object Destructuring 🔥🔥🔥

Instead of:

```js
const name =
  employee.name;

const salary =
  employee.salary;
```

write:

```js
const {
  name,
  salary,
} = employee;
```

Now:

```text
name
salary
```

are separate variables.

---

# 53. Destructuring Rename

```js
const {
  name: employeeName,
} = employee;
```

Now:

```text
employeeName
```

contains:

```text
employee.name
```

---

# 54. Destructuring Default Value

```js
const employee = {
  name: "Rahul",
};

const {
  department = "General",
} = employee;

console.log(department);
```

Output:

```text
General
```

---

# 55. Nested Destructuring

```js
const employee = {
  address: {
    city: "Hyderabad",
  },
};

const {
  address: {
    city,
  },
} = employee;

console.log(city);
```

Output:

```text
Hyderabad
```

Use very deep destructuring carefully because readability can suffer.

---

# 56. Rest With Object Destructuring 🔥🔥🔥

```js
const employee = {
  id: 1,
  name: "Rahul",
  salary: 50000,
};

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

# 57. Remove Property Immutably 🔥🔥🔥

Suppose:

```js
const employee = {
  id: 1,
  name: "Rahul",
  password: "secret",
};
```

Use rest destructuring:

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

# 58. Destructuring Function Parameters

Instead of:

```js
function printEmployee(employee) {
  console.log(
    employee.name,
    employee.salary
  );
}
```

write:

```js
function printEmployee({
  name,
  salary,
}) {
  console.log(
    name,
    salary
  );
}
```

Very common in modern JavaScript.

---

# 59. Object → Array 🔥🔥🔥

Suppose:

```js
const salaries = {
  Rahul: 50000,
  Amit: 60000,
};
```

Convert:

```js
const entries =
  Object.entries(salaries);
```

Result:

```js
[
  ["Rahul", 50000],
  ["Amit", 60000]
]
```

Now you can use:

```text
map()
filter()
reduce()
sort()
```

on the entries.

---

# 60. Array → Object 🔥🔥🔥

Suppose:

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: "Amit",
  },
];
```

Create lookup object:

```js
const employeeById =
  employees.reduce(
    (acc, employee) => {
      acc[employee.id] =
        employee;

      return acc;
    },
    {}
  );
```

Result:

```js
{
  1: {
    id: 1,
    name: "Rahul"
  },

  2: {
    id: 2,
    name: "Amit"
  }
}
```

---

# 61. Why Index Data by ID? 🔥🔥🔥

Without indexed data:

```js
employees.find(
  (employee) =>
    employee.id === 2
);
```

With indexed data:

```js
employeeById[2]
```

Mental model:

```text
Array
→ search through records

Object indexed by ID
→ direct property lookup
```

Useful for:

```text
normalized state
lookup tables
machine coding
API transformations
```

---

# 62. Count Property Values 🔥🔥🔥

Suppose:

```js
const employees = [
  { department: "UI" },
  { department: "API" },
  { department: "UI" },
];
```

Count departments:

```js
const counts = {};

for (const employee of employees) {
  const department =
    employee.department;

  counts[department] =
    (counts[department] ?? 0) + 1;
}
```

Result:

```js
{
  UI: 2,
  API: 1
}
```

This is a frequency-map pattern.

---

# 63. Group Records by Property 🔥🔥🔥

```js
const employees = [
  {
    name: "Rahul",
    department: "UI",
  },
  {
    name: "Amit",
    department: "API",
  },
  {
    name: "John",
    department: "UI",
  },
];

const grouped = {};

for (const employee of employees) {
  const key =
    employee.department;

  if (!grouped[key]) {
    grouped[key] = [];
  }

  grouped[key].push(employee);
}
```

Result conceptually:

```text
UI
├── Rahul
└── John

API
└── Amit
```

Very important machine-coding transformation.

---

# 64. Normalize API Data 🔥🔥🔥

Suppose API gives:

```js
const employee = {
  id: "101",
  name: " Rahul ",
  salary: "50000",
};
```

Normalize:

```js
const normalized = {
  ...employee,

  id:
    Number(employee.id),

  name:
    employee.name.trim(),

  salary:
    Number(employee.salary),
};
```

Now:

```text
id
→ number

name
→ cleaned string

salary
→ number
```

---

# 65. Dynamic Object Update 🔥🔥🔥

Very useful in forms.

```js
const field = "salary";
const value = 60000;
```

Update:

```js
const updatedEmployee = {
  ...employee,
  [field]: value,
};
```

If:

```text
field = "salary"
```

the result behaves like:

```js
{
  ...employee,
  salary: 60000
}
```

---

# 66. Reusable Dynamic Update Function

```js
function updateField(
  object,
  field,
  value
) {
  return {
    ...object,
    [field]: value,
  };
}
```

Usage:

```js
const updated = updateField(
  employee,
  "department",
  "API"
);
```

Very useful in machine coding.

---

# 67. Interview Output — Shared Reference 🔥🔥🔥

```js
const a = {
  value: 10,
};

const b = a;

b.value = 20;

console.log(a.value);
```

Output:

```text
20
```

---

# 68. Interview Output — Different Objects

```js
console.log(
  {} === {}
);
```

Output:

```text
false
```

Each object literal creates a different object.

---

# 69. Interview Output — Same Reference

```js
const a = {};

const b = a;

console.log(a === b);
```

Output:

```text
true
```

---

# 70. Interview Output — Spread Copy

```js
const a = {
  value: 10,
};

const b = {
  ...a,
};

console.log(a === b);
```

Output:

```text
false
```

---

# 71. Interview Output — Shallow Copy 🔥🔥🔥

```js
const a = {
  address: {
    city: "A",
  },
};

const b = {
  ...a,
};

b.address.city = "B";

console.log(
  a.address.city
);
```

Output:

```text
B
```

Nested object reference is shared.

---

# 72. Interview Output — Spread Order 🔥🔥🔥

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

Because:

```text
last value wins
```

---

# 73. Interview Output — `Object.keys()`

```js
const user = {
  name: "Rahul",
  age: 30,
};

console.log(
  Object.keys(user)
);
```

Output:

```text
["name", "age"]
```

Remember:

```text
Object.keys()
→ array
```

---

# 74. Interview Output — Missing Property

```js
const user = {
  name: "Rahul",
};

console.log(user.age);
```

Output:

```text
undefined
```

---

# 75. Interview Output — Existing Undefined Property

```js
const user = {
  age: undefined,
};

console.log(user.age);

console.log(
  Object.hasOwn(
    user,
    "age"
  )
);
```

Output:

```text
undefined
true
```

---

# 76. Interview Question — Dot vs Bracket

Good answer:

```text
Dot notation
→ known normal property name

Bracket notation
→ dynamic property name
→ special property names
```

---

# 77. Interview Question — Why Is `{}` === `{}` False?

Because each object literal creates a different object reference.

Objects are compared by reference identity with `===`.

---

# 78. Interview Question — Shallow vs Deep Copy 🔥🔥🔥

Good answer:

```text
Shallow copy
→ top level copied
→ nested references can remain shared

Deep copy
→ nested structures are copied too
```

Example shallow copy:

```js
const copy = {
  ...object,
};
```

Example deep-copy tool for supported data:

```js
const copy =
  structuredClone(object);
```

---

# 79. Interview Question — `Object.keys()` vs `Object.entries()`

```text
Object.keys()
→ array of keys

Object.entries()
→ array of [key, value] pairs
```

---

# 80. Interview Question — Does Spread Deep Clone?

No.

```js
const copy = {
  ...original,
};
```

creates a shallow copy.

---

# 81. Interview Question — `freeze()` vs `seal()`

```text
freeze
→ no add
→ no delete
→ no normal updates

seal
→ no add
→ no delete
→ existing writable properties can update
```

Both are shallow.

---

# 82. Debugging — Accidental Mutation 🔥🔥🔥

Bad:

```js
function updateSalary(
  employee,
  salary
) {
  employee.salary = salary;

  return employee;
}
```

This mutates the original object.

If mutation is not intended:

```js
function updateSalary(
  employee,
  salary
) {
  return {
    ...employee,
    salary,
  };
}
```

---

# 83. Debugging — Nested Mutation 🔥🔥🔥

This looks like a safe copy:

```js
const updated = {
  ...employee,
};

updated.address.city =
  "Bangalore";
```

But nested `address` may still be shared.

Correct immutable update:

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

# 84. Debugging — Wrong Dynamic Access

Bad:

```js
const key = "salary";

console.log(
  employee.key
);
```

This searches for:

```text
"key"
```

Correct:

```js
console.log(
  employee[key]
);
```

---

# 85. Debugging — Wrong Spread Order 🔥🔥🔥

Suppose:

```js
const employee = {
  salary: 50000,
};
```

You want:

```text
70000
```

Wrong:

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

Correct:

```js
const updated = {
  ...employee,
  salary: 70000,
};
```

---

# 86. Machine-Coding Pattern — Nested Update 🔥🔥🔥

```js
function updateCity(
  employee,
  city
) {
  return {
    ...employee,

    address: {
      ...employee.address,
      city,
    },
  };
}
```

This creates new references for the changed levels.

---

# 87. Machine-Coding Pattern — Remove Sensitive Fields

```js
function sanitizeEmployee(
  employee
) {
  const {
    password,
    token,
    ...safeEmployee
  } = employee;

  return safeEmployee;
}
```

Useful before:

```text
displaying selected data
logging
creating safe payloads
```

---

# 88. Machine-Coding Pattern — Index by ID 🔥🔥🔥

```js
function indexById(
  employees
) {
  return employees.reduce(
    (acc, employee) => {
      acc[employee.id] =
        employee;

      return acc;
    },
    {}
  );
}
```

Usage:

```js
const employeeById =
  indexById(employees);

console.log(
  employeeById[2]
);
```

---

# 89. Machine-Coding Pattern — Count Property Values

```js
function countDepartments(
  employees
) {
  return employees.reduce(
    (acc, employee) => {
      const department =
        employee.department;

      acc[department] =
        (acc[department] ?? 0) + 1;

      return acc;
    },
    {}
  );
}
```

---

# 90. Machine-Coding Pattern — Group Records 🔥🔥🔥

```js
function groupByDepartment(
  employees
) {
  return employees.reduce(
    (acc, employee) => {
      const department =
        employee.department;

      if (!acc[department]) {
        acc[department] = [];
      }

      acc[department].push(
        employee
      );

      return acc;
    },
    {}
  );
}
```

---

# 91. Machine-Coding Pattern — Normalize API Response 🔥🔥🔥

```js
function normalizeEmployee(
  employee
) {
  return {
    ...employee,

    id:
      Number(employee.id),

    salary:
      Number(employee.salary),

    name:
      employee.name?.trim() ?? "",
  };
}
```

For an array:

```js
const normalizedEmployees =
  employees.map(
    normalizeEmployee
  );
```

---

# 92. Machine-Coding Pattern — Safe Nested Access

```js
function getManagerName(
  employee
) {
  return (
    employee.manager?.name ??
    "No Manager"
  );
}
```

Simple and safe.

---

# 93. Machine-Coding Pattern — Transform Object With Entries

Suppose:

```js
const filters = {
  department: "UI",
  active: true,
  search: "",
  page: 2,
};
```

Remove empty values:

```js
const cleanedFilters =
  Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
```

Useful for:

```text
query parameters
filter objects
API payload cleanup
```

---

# 94. Practical Object Decision Guide 🔥🔥🔥

```text
Known property?
→ obj.name

Dynamic property?
→ obj[key]

Need keys?
→ Object.keys()

Need values?
→ Object.values()

Need key + value?
→ Object.entries()

Need entries back to object?
→ Object.fromEntries()

Need own property check?
→ Object.hasOwn()

Need shallow copy?
→ { ...obj }

Need deep clone of supported data?
→ structuredClone()

Need dynamic update?
→ { ...obj, [key]: value }

Need nested immutable update?
→ copy every changed level
```

---

# 95. Most Important Rules 🔥🔥🔥

```text
Objects are reference values.

const does not make an object immutable.

Dot notation is for known properties.

Bracket notation is for dynamic properties.

Spread creates a shallow copy.

Nested objects may still share references.

Spread order matters.

Last property wins.

Use Object.keys / values / entries for iteration.

Use Object.hasOwn() for own-property existence.

Use optional chaining for uncertain nested data.

Use computed properties for dynamic updates.

Prefer immutable updates for React / Redux state.
```

---

# Quick Memory 🧠

Create:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};
```

Access:

```js
employee.name
employee["name"]
employee[key]
```

Add / update:

```js
employee.salary = 60000;
```

Delete:

```js
delete employee.salary;
```

Computed property:

```js
const obj = {
  [key]: value,
};
```

Property shorthand:

```js
const obj = {
  name,
  salary,
};
```

Object utilities:

```text
Object.keys()
Object.values()
Object.entries()
Object.fromEntries()
Object.assign()
Object.hasOwn()
Object.create()
Object.freeze()
Object.seal()
```

Shallow copy:

```js
const copy = {
  ...object,
};
```

Deep copy basics:

```js
const copy =
  structuredClone(object);
```

Immutable update:

```js
const updated = {
  ...employee,
  salary: 60000,
};
```

Nested immutable update:

```js
const updated = {
  ...employee,

  address: {
    ...employee.address,
    city: "Bangalore",
  },
};
```

Destructuring:

```js
const {
  name,
  salary,
} = employee;
```

Remove property immutably:

```js
const {
  password,
  ...safeEmployee
} = employee;
```

Most important interview concepts:

```text
reference equality
mutation vs immutability
shallow vs deep copy
spread order
dynamic properties
Object.keys / values / entries
Object.hasOwn()
Object.freeze / seal
```

Most important machine-coding patterns:

```text
dynamic form updates
nested object updates
remove properties
object ↔ array
group records
index by ID
count property values
normalize API data
safe nested access
```

## ✅ 6.9 Objects complete

**Next: 6.10 Destructuring 🔥🔥🔥**
