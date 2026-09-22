# 7.13 Reference Behaviour + Mutation + Immutability 🔥🔥🔥

This chapter explains one of the most important JavaScript mental models:

```text
Why changing one object
sometimes changes another variable too.
```

Master mental model:

```text
Primitive
→ variable stores the primitive value

Object / Array / Function
→ variable stores a reference value
→ that reference points to an object
```

Very important interview correction:

```text
JavaScript is pass-by-value.

For objects,
the VALUE being copied/passed
is the reference value.
```

So the safe mental model is:

```text
primitive variable
→ value

object variable
→ reference value
→ object
```

This chapter covers:

```text
Primitive vs Reference
Pass-by-Value Mental Model
Object References
Reference Equality
Mutation
Reassignment
Immutability
Shallow Copy
Spread Copy
Object.assign()
Nested Object Problem
Nested Array Problem
Deep Copy Basics
structuredClone()
JSON Clone Limitations
Function Parameters
Arrays as References
Functions as References
React / State Relevance
Debugging Traps
Output Questions
```

---

# 1. Primitive Values 🔥🔥🔥

Primitive values include:

```text
string
number
boolean
undefined
null
bigint
symbol
```

Example:

```js
// Step 1:
let first =
  10;

// Step 2:
let second =
  first;

// Step 3:
second =
  20;

// Step 4:
console.log(
  first
); // Output: 10

// Step 5:
console.log(
  second
); // Output: 20
```

Output:

```text
10
20
```

Changing `second` does not change `first`.

---

# 2. Why Primitive Copy Is Independent

When we write:

```text
let second = first;
```

and `first` contains a primitive:

```text
10
```

the primitive value is copied.

Mental model:

```text
first
→ 10

second
→ 10
```

After:

```text
second = 20
```

we get:

```text
first
→ 10

second
→ 20
```

They are independent bindings.

---

# 3. Object Variables Behave Differently 🔥🔥🔥

Example:

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second =
  first;

// Step 3:
second.name =
  "Amit";

// Step 4:
console.log(
  first.name
); // Output: Amit

// Step 5:
console.log(
  second.name
); // Output: Amit
```

Output:

```text
Amit
Amit
```

Why?

Both variables point to the same object.

---

# 4. Object Reference Mental Model 🔥🔥🔥

Think:

```text
first
   \
    → Object A
   /
second
```

More explicitly:

```text
first
→ reference to Object A

second
→ copied reference to Object A
```

There is still only:

```text
ONE object
```

---

# 5. Important: The Object Is NOT Copied Here

This:

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second =
  first;
```

does NOT create:

```text
Object A
Object B
```

It creates:

```text
Object A

first  → Object A
second → Object A
```

---

# 6. Mutation 🔥🔥🔥

Mutation means:

```text
changing an existing object
```

Example:

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
user.name =
  "Amit";

// Step 3:
console.log(
  user.name
); // Output: Amit
```

Output:

```text
Amit
```

The original object was changed.

That is mutation.

---

# 7. Adding a Property Is Mutation

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
user.role =
  "Developer";

// Step 3:
console.log(
  user.role
); // Output: Developer
```

Output:

```text
Developer
```

We changed the existing object.

---

# 8. Deleting a Property Is Mutation

```js
// Step 1:
const user = {
  name: "Rahul",
  role: "Developer",
};

// Step 2:
delete user.role;

// Step 3:
console.log(
  user.role
); // Output: undefined
```

Output:

```text
undefined
```

The existing object was modified.

---

# 9. Array Mutation 🔥🔥🔥

Arrays are objects.

So methods like:

```text
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

can mutate the existing array.

Example:

```js
// Step 1:
const numbers = [
  1,
  2,
];

// Step 2:
numbers.push(
  3
);

// Step 3:
console.log(
  numbers
); // Output: [1, 2, 3]
```

Output:

```text
[1, 2, 3]
```

---

# 10. Two Variables Sharing One Array

```js
// Step 1:
const first = [
  1,
  2,
];

// Step 2:
const second =
  first;

// Step 3:
second.push(
  3
);

// Step 4:
console.log(
  first
); // Output: [1, 2, 3]
```

Output:

```text
[1, 2, 3]
```

Because:

```text
first
and
second
```

point to the same array.

---

# 11. Reassignment Is Different From Mutation 🔥🔥🔥

Mutation:

```text
change existing object
```

Reassignment:

```text
make variable point to another value
```

Example:

```js
// Step 1:
let user = {
  name: "Rahul",
};

// Step 2:
user = {
  name: "Amit",
};

// Step 3:
console.log(
  user.name
); // Output: Amit
```

Output:

```text
Amit
```

We did not mutate the first object.

We changed what `user` points to.

---

# 12. Mutation vs Reassignment Visual 🔥🔥🔥

Mutation:

```text
user
↓
Object A
name: Rahul

change property
↓

user
↓
same Object A
name: Amit
```

Reassignment:

```text
user
↓
Object A

user = new object
↓

user
↓
Object B
```

Different concepts.

---

# 13. `const` Does NOT Make Objects Immutable 🔥🔥🔥

Very common interview question.

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
user.name =
  "Amit";

// Step 3:
console.log(
  user.name
); // Output: Amit
```

Output:

```text
Amit
```

This is allowed.

---

# 14. What Does `const` Actually Protect?

`const` protects the variable binding.

This is not allowed:

```js
// Step 1:
const user = {
  name: "Rahul",
};

try {
  // Step 2:
  user = {
    name: "Amit",
  };
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

---

# 15. `const` Rule 🔥🔥🔥

Remember:

```text
const object
→ cannot reassign variable

BUT

object properties
→ can still mutate
```

---

# 16. Reference Equality 🔥🔥🔥

Objects are compared by reference.

Example:

```js
// Step 1:
const a = {
  name: "Rahul",
};

// Step 2:
const b =
  a;

// Step 3:
console.log(
  a === b
); // Output: true
```

Output:

```text
true
```

Both contain the same reference value.

---

# 17. Same Content Does NOT Mean Same Object

```js
// Step 1:
const a = {
  name: "Rahul",
};

// Step 2:
const b = {
  name: "Rahul",
};

// Step 3:
console.log(
  a === b
); // Output: false
```

Output:

```text
false
```

Even though values look identical:

```text
Object A ≠ Object B
```

---

# 18. Arrays Also Compare by Reference

```js
// Step 1:
const a = [
  1,
  2,
];

// Step 2:
const b = [
  1,
  2,
];

// Step 3:
console.log(
  a === b
); // Output: false
```

Output:

```text
false
```

---

# 19. Same Array Reference Is Equal

```js
// Step 1:
const a = [
  1,
  2,
];

// Step 2:
const b =
  a;

// Step 3:
console.log(
  a === b
); // Output: true
```

Output:

```text
true
```

---

# 20. JavaScript Is Pass-by-Value 🔥🔥🔥

This is a very important interview answer.

JavaScript always passes values to functions.

For an object variable, the value is a reference.

Mental model:

```text
variable contains reference value
↓
function parameter receives COPY
of that reference value
↓
both references point to same object
```

---

# 21. Primitive Function Argument

```js
function change(
  value
) {
  // Step 1:
  value =
    100;
}

// Step 2:
let number =
  10;

// Step 3:
change(
  number
);

// Step 4:
console.log(
  number
); // Output: 10
```

Output:

```text
10
```

The primitive value was copied into `value`.

---

# 22. Object Function Argument 🔥🔥🔥

```js
function change(
  user
) {
  // Step 1:
  user.name =
    "Amit";
}

// Step 2:
const employee = {
  name: "Rahul",
};

// Step 3:
change(
  employee
);

// Step 4:
console.log(
  employee.name
); // Output: Amit
```

Output:

```text
Amit
```

Why?

The parameter received a copied reference to the same object.

---

# 23. Function Parameter Reference Diagram 🔥🔥🔥

Before function:

```text
employee
→ Object A
```

During function:

```text
employee
→ Object A
user
→ Object A
```

Two reference values.

One object.

So:

```text
user.name = "Amit"
```

changes Object A.

---

# 24. Reassigning Object Parameter Does NOT Reassign Caller Variable 🔥🔥🔥

```js
function replace(
  user
) {
  // Step 1:
  user = {
    name: "Amit",
  };

  // Step 2:
  console.log(
    user.name
  ); // Output: Amit
}

// Step 3:
const employee = {
  name: "Rahul",
};

// Step 4:
replace(
  employee
);

// Step 5:
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Amit
Rahul
```

Very important.

---

# 25. Why Parameter Reassignment Does Not Affect Caller

Initially:

```text
employee
→ Object A

user
→ Object A
```

Then:

```text
user = Object B
```

Now:

```text
employee
→ Object A

user
→ Object B
```

Caller variable was never reassigned.

---

# 26. This Proves JavaScript Is NOT Pass-by-Reference 🔥🔥🔥

If JavaScript were truly pass-by-reference to the variable itself:

```text
reassigning parameter
would reassign caller variable
```

But it does not.

So correct interview answer:

```text
JavaScript is pass-by-value.

For objects,
the passed value is a reference value.
```

---

# 27. Immutability 🔥🔥🔥

Immutability means:

```text
do not change the existing object
```

Instead:

```text
create a new object
with the required changes
```

Example:

```js
// Step 1:
const user = {
  name: "Rahul",
  role: "Developer",
};

// Step 2:
const updatedUser = {
  ...user,
  name: "Amit",
};

// Step 3:
console.log(
  user.name
); // Output: Rahul

// Step 4:
console.log(
  updatedUser.name
); // Output: Amit
```

Output:

```text
Rahul
Amit
```

---

# 28. Immutable Update Mental Model

Instead of:

```text
change Object A
```

we do:

```text
Object A
↓
copy data
↓
create Object B
↓
apply changed property
```

So old state remains untouched.

---

# 29. Why Immutability Is Useful 🔥🔥🔥

Benefits:

```text
predictable state changes
easier debugging
easier change detection
safer shared data
works well with React/Redux patterns
undo/history patterns become easier
```

---

# 30. Object Spread Creates a New Outer Object 🔥🔥🔥

```js
// Step 1:
const user = {
  name: "Rahul",
  role: "Developer",
};

// Step 2:
const copy = {
  ...user,
};

// Step 3:
console.log(
  copy === user
); // Output: false
```

Output:

```text
false
```

The outer object is new.

---

# 31. Spread Copies Top-Level Properties

```js
// Step 1:
const user = {
  name: "Rahul",
  role: "Developer",
};

// Step 2:
const copy = {
  ...user,
};

// Step 3:
console.log(
  copy.name
); // Output: Rahul

// Step 4:
console.log(
  copy.role
); // Output: Developer
```

Output:

```text
Rahul
Developer
```

---

# 32. Spread Is a Shallow Copy 🔥🔥🔥

This is extremely important.

Example:

```js
// Step 1:
const user = {
  name: "Rahul",
  address: {
    city: "Pune",
  },
};

// Step 2:
const copy = {
  ...user,
};

// Step 3:
console.log(
  copy === user
); // Output: false

// Step 4:
console.log(
  copy.address
  ===
  user.address
); // Output: true
```

Output:

```text
false
true
```

---

# 33. What Does Shallow Copy Mean? 🔥🔥🔥

Shallow copy means:

```text
top-level object
→ new

nested objects
→ references copied
```

Mental model:

```text
user
→ Object A
   address → Object X

copy
→ Object B
   address → same Object X
```

---

# 34. Shallow Copy Nested Mutation Problem 🔥🔥🔥

```js
// Step 1:
const user = {
  name: "Rahul",
  address: {
    city: "Pune",
  },
};

// Step 2:
const copy = {
  ...user,
};

// Step 3:
copy.address.city =
  "Mumbai";

// Step 4:
console.log(
  user.address.city
); // Output: Mumbai
```

Output:

```text
Mumbai
```

Why?

`address` was still shared.

---

# 35. Correct Immutable Nested Update 🔥🔥🔥

```js
// Step 1:
const user = {
  name: "Rahul",
  address: {
    city: "Pune",
  },
};

// Step 2:
const updatedUser = {
  ...user,

  address: {
    ...user.address,
    city: "Mumbai",
  },
};

// Step 3:
console.log(
  user.address.city
); // Output: Pune

// Step 4:
console.log(
  updatedUser.address.city
); // Output: Mumbai
```

Output:

```text
Pune
Mumbai
```

---

# 36. Nested Immutable Update Flow

```text
copy outer object
↓
copy nested object
↓
change property on nested copy
```

For:

```text
user.address.city
```

we copied:

```text
user
AND
user.address
```

---

# 37. Array Spread Is Also Shallow 🔥🔥🔥

```js
// Step 1:
const employees = [
  {
    name: "Rahul",
  },
];

// Step 2:
const copy = [
  ...employees,
];

// Step 3:
console.log(
  copy === employees
); // Output: false

// Step 4:
console.log(
  copy[0]
  ===
  employees[0]
); // Output: true
```

Output:

```text
false
true
```

Outer array is new.

Nested object is shared.

---

# 38. Array Shallow-Copy Mutation Problem

```js
// Step 1:
const employees = [
  {
    name: "Rahul",
  },
];

// Step 2:
const copy = [
  ...employees,
];

// Step 3:
copy[0].name =
  "Amit";

// Step 4:
console.log(
  employees[0].name
); // Output: Amit
```

Output:

```text
Amit
```

---

# 39. Immutable Array Object Update 🔥🔥🔥

```js
// Step 1:
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

// Step 2:
const updatedEmployees =
  employees.map(
    (employee) => {
      // Step 3:
      if (
        employee.id
        ===
        1
      ) {
        return {
          ...employee,
          name: "Neha",
        };
      }

      // Step 4:
      return employee;
    }
  );

// Step 5:
console.log(
  employees[0].name
); // Output: Rahul

// Step 6:
console.log(
  updatedEmployees[0].name
); // Output: Neha
```

Output:

```text
Rahul
Neha
```

---

# 40. `Object.assign()` Creates a Shallow Copy 🔥🔥🔥

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
const copy =
  Object.assign(
    {},
    user
  );

// Step 3:
console.log(
  copy === user
); // Output: false
```

Output:

```text
false
```

---

# 41. `Object.assign()` and Spread Are Similar for Basic Copying

```text
Object.assign({}, user)
```

and:

```text
{ ...user }
```

both usually create:

```text
new outer object
+
shallow copy of properties
```

---

# 42. `Object.assign()` Can Mutate Its Target 🔥🔥🔥

Important difference.

```js
// Step 1:
const target = {
  name: "Rahul",
};

// Step 2:
Object.assign(
  target,
  {
    role: "Developer",
  }
);

// Step 3:
console.log(
  target
);
// Output:
// { name: "Rahul", role: "Developer" }
```

Output:

```text
{ name: "Rahul", role: "Developer" }
```

`target` itself was mutated.

---

# 43. Safe `Object.assign()` Copy Pattern

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
const updated =
  Object.assign(
    {},
    user,
    {
      role: "Developer",
    }
  );

// Step 3:
console.log(
  user.role
); // Output: undefined

// Step 4:
console.log(
  updated.role
); // Output: Developer
```

Output:

```text
undefined
Developer
```

---

# 44. Spread Limitation 🔥🔥🔥

Spread is not a deep clone.

It copies only one level.

Example:

```text
{
  ...user
}
```

does NOT recursively clone every nested object.

---

# 45. `Object.assign()` Limitation

`Object.assign()` is also shallow.

Nested references remain shared.

Example mental model:

```text
source.address
and
copy.address
→ same nested object
```

---

# 46. Deep Copy 🔥🔥🔥

A deep copy means:

```text
outer object
→ new

nested objects
→ new

nested arrays
→ new

deeper nested values
→ copied recursively
```

So the copy does not share those nested mutable objects.

---

# 47. Deep Copy Mental Model

Original:

```text
Object A
↓
Address X
↓
Location Y
```

Deep copy:

```text
Object B
↓
Address Z
↓
Location Q
```

No shared nested objects.

---

# 48. `structuredClone()` 🔥🔥🔥

Modern JavaScript provides:

```text
structuredClone()
```

for deep cloning many common data types.

Example:

```js
// Step 1:
const user = {
  name: "Rahul",
  address: {
    city: "Pune",
  },
};

// Step 2:
const copy =
  structuredClone(
    user
  );

// Step 3:
copy.address.city =
  "Mumbai";

// Step 4:
console.log(
  user.address.city
); // Output: Pune

// Step 5:
console.log(
  copy.address.city
); // Output: Mumbai
```

Output:

```text
Pune
Mumbai
```

---

# 49. Verify `structuredClone()` Nested References

```js
// Step 1:
const user = {
  address: {
    city: "Pune",
  },
};

// Step 2:
const copy =
  structuredClone(
    user
  );

// Step 3:
console.log(
  copy === user
); // Output: false

// Step 4:
console.log(
  copy.address
  ===
  user.address
); // Output: false
```

Output:

```text
false
false
```

---

# 50. `structuredClone()` Handles Arrays Too

```js
// Step 1:
const data = {
  employees: [
    {
      name: "Rahul",
    },
  ],
};

// Step 2:
const copy =
  structuredClone(
    data
  );

// Step 3:
copy.employees[0].name =
  "Amit";

// Step 4:
console.log(
  data.employees[0].name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 51. `structuredClone()` Does NOT Clone Functions 🔥🔥

Functions cannot be cloned by `structuredClone()`.

Example concept:

```js
const data = {
  // Step 1:
  name: "Rahul",

  // Step 2:
  greet() {
    return "Hello";
  },
};

try {
  // Step 3:
  structuredClone(
    data
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: DataCloneError
}
```

Expected output in supporting environments:

```text
DataCloneError
```

---

# 52. JSON Deep Clone Pattern — Old Technique 🔥🔥

You may see:

```js
// Step 1:
const copy =
  JSON.parse(
    JSON.stringify(
      original
    )
  );
```

This can deep-clone simple JSON-compatible data.

But it has limitations.

---

# 53. JSON Clone Loses `undefined`

```js
// Step 1:
const original = {
  name: "Rahul",
  value: undefined,
};

// Step 2:
const copy =
  JSON.parse(
    JSON.stringify(
      original
    )
  );

// Step 3:
console.log(
  "value"
  in
  copy
); // Output: false
```

Output:

```text
false
```

---

# 54. JSON Clone Changes Date Into String 🔥🔥🔥

```js
// Step 1:
const original = {
  createdAt:
    new Date(
      "2026-01-01T00:00:00Z"
    ),
};

// Step 2:
const copy =
  JSON.parse(
    JSON.stringify(
      original
    )
  );

// Step 3:
console.log(
  typeof copy.createdAt
); // Output: string
```

Output:

```text
string
```

The `Date` object was not preserved as a `Date`.

---

# 55. JSON Clone Cannot Handle Circular References

Example concept:

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
user.self =
  user;

try {
  // Step 3:
  JSON.stringify(
    user
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

---

# 56. `structuredClone()` Can Handle Many Circular Structures 🔥🔥

```js
// Step 1:
const user = {
  name: "Rahul",
};

// Step 2:
user.self =
  user;

// Step 3:
const copy =
  structuredClone(
    user
  );

// Step 4:
console.log(
  copy.self
  ===
  copy
); // Output: true
```

Output:

```text
true
```

---

# 57. Shallow Copy Is Often Enough

Do not deep clone everything automatically.

If only one nested path changes:

```text
user.address.city
```

you can immutably copy only that path.

This is often more efficient and clearer than deep-cloning the whole object.

---

# 58. React State Relevance 🔥🔥🔥

In React-like state patterns, mutation can create bugs because change detection often relies on references.

Bad mental pattern:

```text
same object reference
+
mutated property
```

Preferred pattern:

```text
new object reference
+
updated value
```

---

# 59. React-Style Immutable Update Example

```js
// Step 1:
const state = {
  user: {
    name: "Rahul",
  },
};

// Step 2:
const nextState = {
  ...state,

  user: {
    ...state.user,
    name: "Amit",
  },
};

// Step 3:
console.log(
  state === nextState
); // Output: false

// Step 4:
console.log(
  state.user
  ===
  nextState.user
); // Output: false
```

Output:

```text
false
false
```

---

# 60. Unchanged Nested References Can Be Reused 🔥🔥🔥

Immutability does NOT mean every object must always be copied.

Example:

```js
// Step 1:
const state = {
  user: {
    name: "Rahul",
  },

  settings: {
    theme: "dark",
  },
};

// Step 2:
const nextState = {
  ...state,

  user: {
    ...state.user,
    name: "Amit",
  },
};

// Step 3:
console.log(
  state.settings
  ===
  nextState.settings
); // Output: true
```

Output:

```text
true
```

`settings` did not change, so sharing that reference is fine.

---

# 61. Structural Sharing 🔥🔥

This pattern is often called structural sharing.

Meaning:

```text
changed path
→ new references

unchanged paths
→ old references reused
```

This is common in immutable state updates.

---

# 62. Functions Are Reference Values Too

```js
// Step 1:
function greet() {
  return "Hello";
}

// Step 2:
const first =
  greet;

// Step 3:
const second =
  first;

// Step 4:
console.log(
  first === second
); // Output: true
```

Output:

```text
true
```

Both variables reference the same function object.

---

# 63. Two Identical Function Expressions Are Different References

```js
// Step 1:
const first =
  function () {
    return "Hello";
  };

// Step 2:
const second =
  function () {
    return "Hello";
  };

// Step 3:
console.log(
  first === second
); // Output: false
```

Output:

```text
false
```

Same code.

Different function objects.

---

# 64. Map / Set Reference Behaviour Awareness 🔥🔥

Objects used as keys in `Map` are matched by reference.

Example:

```js
// Step 1:
const key = {
  id: 1,
};

// Step 2:
const map =
  new Map();

// Step 3:
map.set(
  key,
  "Employee"
);

// Step 4:
console.log(
  map.get(
    key
  )
); // Output: Employee

// Step 5:
console.log(
  map.get(
    {
      id: 1,
    }
  )
); // Output: undefined
```

Output:

```text
Employee
undefined
```

---

# 65. Common Bug — Mutating Shared Config Object 🔥🔥🔥

```js
// Step 1:
const defaultConfig = {
  pageSize: 10,
};

// Step 2:
const screenConfig =
  defaultConfig;

// Step 3:
screenConfig.pageSize =
  50;

// Step 4:
console.log(
  defaultConfig.pageSize
); // Output: 50
```

Output:

```text
50
```

Problem:

```text
screenConfig
and
defaultConfig
```

are the same object.

---

# 66. Fix Shared Config Bug

```js
// Step 1:
const defaultConfig = {
  pageSize: 10,
};

// Step 2:
const screenConfig = {
  ...defaultConfig,
  pageSize: 50,
};

// Step 3:
console.log(
  defaultConfig.pageSize
); // Output: 10

// Step 4:
console.log(
  screenConfig.pageSize
); // Output: 50
```

Output:

```text
10
50
```

---

# 67. Interview Output 1 — Primitive Copy 🔥🔥🔥

```js
// Step 1:
let a =
  10;

// Step 2:
let b =
  a;

// Step 3:
b =
  20;

// Step 4:
console.log(
  a
);
```

Expected output:

```text
10
```

---

# 68. Interview Output 2 — Shared Object

```js
// Step 1:
const a = {
  value: 10,
};

// Step 2:
const b =
  a;

// Step 3:
b.value =
  20;

// Step 4:
console.log(
  a.value
);
```

Expected output:

```text
20
```

---

# 69. Interview Output 3 — Object Equality 🔥🔥🔥

```js
// Step 1:
const a = {
  value: 10,
};

// Step 2:
const b = {
  value: 10,
};

// Step 3:
console.log(
  a === b
);
```

Expected output:

```text
false
```

---

# 70. Interview Output 4 — Shallow Copy

```js
// Step 1:
const a = {
  nested: {
    value: 10,
  },
};

// Step 2:
const b = {
  ...a,
};

// Step 3:
b.nested.value =
  20;

// Step 4:
console.log(
  a.nested.value
);
```

Expected output:

```text
20
```

---

# 71. Interview Output 5 — Parameter Reassignment 🔥🔥🔥

```js
function replace(
  obj
) {
  // Step 1:
  obj = {
    value: 20,
  };
}

// Step 2:
const original = {
  value: 10,
};

// Step 3:
replace(
  original
);

// Step 4:
console.log(
  original.value
);
```

Expected output:

```text
10
```

---

# 72. Interview Output 6 — Parameter Mutation

```js
function change(
  obj
) {
  // Step 1:
  obj.value =
    20;
}

// Step 2:
const original = {
  value: 10,
};

// Step 3:
change(
  original
);

// Step 4:
console.log(
  original.value
);
```

Expected output:

```text
20
```

---

# 73. Interview Output 7 — Array Spread

```js
// Step 1:
const a = [
  {
    value: 10,
  },
];

// Step 2:
const b = [
  ...a,
];

// Step 3:
b[0].value =
  20;

// Step 4:
console.log(
  a[0].value
);
```

Expected output:

```text
20
```

---

# 74. Interview Output 8 — `structuredClone()`

```js
// Step 1:
const a = {
  nested: {
    value: 10,
  },
};

// Step 2:
const b =
  structuredClone(
    a
  );

// Step 3:
b.nested.value =
  20;

// Step 4:
console.log(
  a.nested.value
);
```

Expected output:

```text
10
```

---

# 75. Interview Question — Is JavaScript Pass-by-Reference? 🔥🔥🔥

Good answer:

```text
No.

JavaScript is pass-by-value.

For objects,
the value being passed
is a reference value.

The function receives a copy
of that reference,
so both references can point
to the same object.
```

---

# 76. Interview Question — Mutation vs Reassignment

Good answer:

```text
Mutation changes an existing object.

Reassignment changes what
a variable points to.

They are different operations.
```

---

# 77. Interview Question — What Is a Shallow Copy? 🔥🔥🔥

Good answer:

```text
A shallow copy creates a new outer object,
but nested object references are copied
rather than recursively cloned.

So nested objects may still be shared.
```

---

# 78. Interview Question — What Is a Deep Copy?

Good answer:

```text
A deep copy creates new nested objects
recursively so mutable nested structures
are not shared with the original.
```

---

# 79. Interview Question — Spread vs `structuredClone()` 🔥🔥🔥

Good answer:

```text
Spread creates a shallow copy.

structuredClone() performs a deep clone
for many supported built-in data types.

structuredClone() does not clone functions.
```

---

# 80. Interview Question — Does `const` Make Object Immutable?

Good answer:

```text
No.

const prevents reassignment
of the variable binding.

It does not prevent mutation
of the object's properties.
```

---

# 81. Debugging Rule — Ask "Same Object or New Object?" 🔥🔥🔥

When reference behavior is confusing, ask:

```text
Are these variables pointing
to the same object?
```

Check:

```js
// Step 1:
console.log(
  first === second
);
```

If true:

```text
mutation through one reference
can be visible through the other
```

---

# 82. Debugging Rule — Check Nested References

Outer objects may be different while nested objects are shared.

Check:

```js
// Step 1:
console.log(
  first === second
);

// Step 2:
console.log(
  first.address
  ===
  second.address
);
```

Possible output:

```text
false
true
```

That means:

```text
outer copied
nested shared
```

---

# 83. Debugging Rule — Know Which Array Methods Mutate 🔥🔥🔥

Common mutating methods:

```text
push
pop
shift
unshift
splice
sort
reverse
fill
```

Common non-mutating / new-result patterns:

```text
map
filter
slice
concat
toSorted
toReversed
spread
```

Always check whether the method changes the original array.

---

# 84. Reference Behaviour Decision Guide 🔥🔥🔥

```text
Primitive assigned to new variable?
→ primitive value copied

Object assigned to new variable?
→ reference value copied

Mutate object?
→ all references can observe change

Reassign one variable?
→ only that variable changes target

Need new top-level object?
→ spread / Object.assign({}, ...)

Nested object also changing?
→ copy nested path too

Need deep clone of supported data?
→ structuredClone()

Simple JSON-compatible deep clone?
→ JSON technique possible,
  but know its limitations

Need immutable state update?
→ create new references
  along changed path
```

---

# 85. Final Master Trace 🔥🔥🔥

```js
// Step 1:
const original = {
  name: "Rahul",

  address: {
    city: "Pune",
  },

  skills: [
    "JS",
    "React",
  ],
};

// Step 2:
const shared =
  original;

// Step 3:
shared.name =
  "Amit";

// Step 4:
console.log(
  original.name
); // Output: Amit

// Step 5:
const shallow = {
  ...original,
};

// Step 6:
console.log(
  shallow === original
); // Output: false

// Step 7:
console.log(
  shallow.address
  ===
  original.address
); // Output: true

// Step 8:
shallow.address.city =
  "Mumbai";

// Step 9:
console.log(
  original.address.city
); // Output: Mumbai

// Step 10:
const immutable = {
  ...original,

  address: {
    ...original.address,
    city: "Delhi",
  },
};

// Step 11:
console.log(
  original.address.city
); // Output: Mumbai

// Step 12:
console.log(
  immutable.address.city
); // Output: Delhi

// Step 13:
const deep =
  structuredClone(
    original
  );

// Step 14:
deep.skills.push(
  "Node"
);

// Step 15:
console.log(
  original.skills
); // Output: ["JS", "React"]

// Step 16:
console.log(
  deep.skills
); // Output: ["JS", "React", "Node"]
```

Output:

```text
Amit
false
true
Mumbai
Mumbai
Delhi
["JS", "React"]
["JS", "React", "Node"]
```

Complete mental model:

```text
shared = original
↓
same reference
↓
same object
↓
mutation affects original

shallow = { ...original }
↓
new outer object
↓
nested address still shared
↓
nested mutation affects original

immutable nested update
↓
new outer object
↓
new address object
↓
original nested value preserved

structuredClone(original)
↓
new outer object
↓
new nested objects/arrays
↓
supported mutable nested structures
are independent
```

---

# Quick Memory 🧠🔥🔥🔥

## Primitive

```text
copy value
```

## Object

```text
copy reference value
```

## Shared Reference

```text
a = object
b = a

a
 \
  → same object
 /
b
```

## Mutation

```text
change existing object
```

## Reassignment

```text
variable points to another value
```

## JavaScript Parameter Passing

```text
JavaScript is pass-by-value.

Object variables contain reference values,
so functions receive a copy
of the reference value.
```

## `const`

```text
cannot reassign binding
BUT
object can still mutate
```

## Reference Equality

```text
same object
→ true

different objects with same content
→ false
```

## Spread

```text
{ ...obj }
[ ...array ]

→ shallow copy
```

## Shallow Copy

```text
outer = new
nested references = may be shared
```

## Nested Immutable Update

```text
copy outer
+
copy changed nested path
```

## `Object.assign()`

```text
shallow copy

Object.assign({}, source)
→ new target

Object.assign(existingTarget, source)
→ mutates target
```

## Deep Copy

```text
nested mutable objects
also become separate
```

## `structuredClone()`

```text
deep clone for many supported values

does not clone functions
```

## JSON Clone

```text
JSON.parse(JSON.stringify(value))
```

Limitations include:

```text
undefined lost
functions lost
Date becomes string
circular references fail
```

## Most Important Interview Answer

```text
JavaScript is pass-by-value.

For objects,
variables hold reference values.

Assigning or passing an object
copies that reference value,
so multiple variables can point
to the same object.

Mutation changes that shared object,
while immutable updates create
new object references.
```

---

# ✅ 7.13 Reference Behaviour + Mutation + Immutability Complete

Completed in Section 7:

```text
7.1 Execution Model
7.2 Scope
7.3 Hoisting
7.4 TDZ
7.5 Closures
7.6 var vs let Loop Questions
7.7 this
7.8 call() / apply() / bind()
7.9 new Operator
7.10 Prototypes + Prototype Chain
7.11 Classes
7.12 Strict Mode
7.13 Reference Behaviour + Mutation + Immutability
```

Next topic:

```text
7.14 Equality 🔥🔥🔥
├── Primitive Equality
├── Reference Equality
├── == vs ===
├── Object.is()
├── NaN
├── +0 / -0
├── instanceof
└── Output Questions
```

**Next: 7.14 Equality 🔥🔥🔥**
