# 7.14 Equality 🔥🔥🔥

Equality in JavaScript looks simple at first:

```text
Are these two values equal?
```

But interview questions become tricky because JavaScript has different comparison rules.

Master mental model:

```text
=== 
→ strict equality
→ no type coercion

==
→ loose equality
→ type coercion may happen

Object.is()
→ almost like ===
→ but treats NaN and ±0 differently

Objects / Arrays / Functions
→ compared by reference
```

This chapter covers:

```text
Primitive Equality
Reference Equality
== vs ===
Type Coercion
null / undefined
Boolean Equality
String / Number Equality
NaN
Object.is()
+0 / -0
Objects
Arrays
Functions
instanceof
SameValueZero Awareness
Set / Map Equality Awareness
Deep Equality Awareness
Output Questions
Debugging Traps
```

---

# 1. What Does Equality Mean?

Equality means checking whether two values should be considered the same.

Example:

```js
// Step 1:
console.log(
  10 === 10
); // Output: true
```

Output:

```text
true
```

---

# 2. JavaScript Has Multiple Equality Algorithms 🔥🔥🔥

The important ones for interviews are:

```text
==
=== 
Object.is()
```

And collections such as `Set` and `Map` use another equality rule internally called:

```text
SameValueZero
```

We will cover the practical differences.

---

# 3. Strict Equality `===` 🔥🔥🔥

Strict equality compares values without converting one type into another.

Example:

```js
// Step 1:
console.log(
  10 === 10
); // Output: true

// Step 2:
console.log(
  10 === "10"
); // Output: false
```

Output:

```text
true
false
```

---

# 4. Why `10 === "10"` Is False

Because:

```text
10
→ number

"10"
→ string
```

Strict equality says:

```text
different types
→ false
```

No conversion happens.

---

# 5. Loose Equality `==` 🔥🔥🔥

Loose equality may convert values before comparing.

Example:

```js
// Step 1:
console.log(
  10 == "10"
); // Output: true
```

Output:

```text
true
```

Why?

Conceptually:

```text
"10"
↓ converted
10
↓
10 == 10
↓
true
```

---

# 6. `==` vs `===` 🔥🔥🔥

Example:

```js
// Step 1:
console.log(
  10 == "10"
); // Output: true

// Step 2:
console.log(
  10 === "10"
); // Output: false
```

Output:

```text
true
false
```

Memory:

```text
==
→ coercion allowed

===
→ no coercion
```

---

# 7. Practical Recommendation

In normal application code, prefer:

```text
===
!== 
```

because the behavior is easier to predict.

Use `==` only when you intentionally want its coercion rules and understand them clearly.

---

# 8. Strict Inequality `!==`

```js
// Step 1:
console.log(
  10 !== "10"
); // Output: true
```

Output:

```text
true
```

Because number `10` and string `"10"` are different types.

---

# 9. Loose Inequality `!=`

```js
// Step 1:
console.log(
  10 != "10"
); // Output: false
```

Output:

```text
false
```

Because loose comparison converts `"10"` to `10`.

---

# 10. Primitive Equality — Numbers

```js
// Step 1:
console.log(
  5 === 5
); // Output: true

// Step 2:
console.log(
  5 === 6
); // Output: false
```

Output:

```text
true
false
```

---

# 11. Primitive Equality — Strings

```js
// Step 1:
console.log(
  "Rahul" === "Rahul"
); // Output: true

// Step 2:
console.log(
  "Rahul" === "rahul"
); // Output: false
```

Output:

```text
true
false
```

String comparison is case-sensitive.

---

# 12. Primitive Equality — Booleans

```js
// Step 1:
console.log(
  true === true
); // Output: true

// Step 2:
console.log(
  true === false
); // Output: false
```

Output:

```text
true
false
```

---

# 13. Boolean With Number Using `==` 🔥🔥🔥

```js
// Step 1:
console.log(
  true == 1
); // Output: true

// Step 2:
console.log(
  false == 0
); // Output: true
```

Output:

```text
true
true
```

Why?

Loose equality converts:

```text
true
→ 1

false
→ 0
```

---

# 14. Boolean With Number Using `===`

```js
// Step 1:
console.log(
  true === 1
); // Output: false

// Step 2:
console.log(
  false === 0
); // Output: false
```

Output:

```text
false
false
```

No coercion happens.

---

# 15. Empty String With Number 🔥🔥🔥

```js
// Step 1:
console.log(
  "" == 0
); // Output: true

// Step 2:
console.log(
  "" === 0
); // Output: false
```

Output:

```text
true
false
```

Loose equality converts the empty string to numeric `0`.

---

# 16. String Number Comparison

```js
// Step 1:
console.log(
  "5" == 5
); // Output: true

// Step 2:
console.log(
  "5" === 5
); // Output: false
```

Output:

```text
true
false
```

---

# 17. `null` and `undefined` 🔥🔥🔥

This is a famous JavaScript rule.

```js
// Step 1:
console.log(
  null == undefined
); // Output: true

// Step 2:
console.log(
  null === undefined
); // Output: false
```

Output:

```text
true
false
```

---

# 18. Why `null == undefined` Is True

Loose equality has a special rule:

```text
null
and
undefined
```

are considered equal to each other.

But they are different types, so strict equality gives:

```text
false
```

---

# 19. `null` Is Not Loosely Equal to `0`

```js
// Step 1:
console.log(
  null == 0
); // Output: false
```

Output:

```text
false
```

This surprises many developers.

Do not reason:

```text
null becomes 0 in every comparison
```

That is incorrect.

---

# 20. `undefined` Is Not Loosely Equal to `0`

```js
// Step 1:
console.log(
  undefined == 0
); // Output: false
```

Output:

```text
false
```

---

# 21. Practical `null == undefined` Use Case — Awareness 🔥🔥

Sometimes developers intentionally write:

```js
// Step 1:
const value =
  null;

// Step 2:
console.log(
  value == null
); // Output: true
```

This specific pattern checks for:

```text
null OR undefined
```

because:

```text
null == null
→ true

undefined == null
→ true
```

This is one of the few intentional `==` patterns you may see.

---

# 22. Prefer Explicit Check When Clarity Matters

```js
// Step 1:
const value =
  undefined;

// Step 2:
const isMissing =
  value === null
  ||
  value === undefined;

// Step 3:
console.log(
  isMissing
); // Output: true
```

Output:

```text
true
```

This is more explicit.

---

# 23. `NaN` Equality 🔥🔥🔥

`NaN` means:

```text
Not-a-Number
```

But it is still a JavaScript number value.

Important:

```js
// Step 1:
console.log(
  NaN === NaN
); // Output: false
```

Output:

```text
false
```

---

# 24. `NaN == NaN` Is Also False

```js
// Step 1:
console.log(
  NaN == NaN
); // Output: false
```

Output:

```text
false
```

So neither `==` nor `===` detects `NaN` by comparing it to itself.

---

# 25. Correct Way to Check `NaN` 🔥🔥🔥

Use:

```text
Number.isNaN()
```

Example:

```js
// Step 1:
const value =
  NaN;

// Step 2:
console.log(
  Number.isNaN(
    value
  )
); // Output: true
```

Output:

```text
true
```

---

# 26. Why Not Use `value === NaN`?

This is always false:

```js
// Step 1:
const value =
  NaN;

// Step 2:
console.log(
  value === NaN
); // Output: false
```

Output:

```text
false
```

So use:

```text
Number.isNaN(value)
```

---

# 27. `Object.is()` 🔥🔥🔥

`Object.is()` compares two values using rules very similar to strict equality.

Example:

```js
// Step 1:
console.log(
  Object.is(
    10,
    10
  )
); // Output: true

// Step 2:
console.log(
  Object.is(
    10,
    "10"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 28. `Object.is(NaN, NaN)` 🔥🔥🔥

This is one important difference from `===`.

```js
// Step 1:
console.log(
  Object.is(
    NaN,
    NaN
  )
); // Output: true

// Step 2:
console.log(
  NaN === NaN
); // Output: false
```

Output:

```text
true
false
```

---

# 29. `+0` and `-0` With `===`

```js
// Step 1:
console.log(
  +0 === -0
); // Output: true
```

Output:

```text
true
```

Strict equality treats `+0` and `-0` as equal.

---

# 30. `+0` and `-0` With `Object.is()` 🔥🔥🔥

```js
// Step 1:
console.log(
  Object.is(
    +0,
    -0
  )
); // Output: false
```

Output:

```text
false
```

This is the other major difference.

---

# 31. `===` vs `Object.is()` Summary 🔥🔥🔥

Most values:

```text
=== 
and
Object.is()
→ same result
```

Special cases:

```text
NaN === NaN
→ false

Object.is(NaN, NaN)
→ true
```

and:

```text
+0 === -0
→ true

Object.is(+0, -0)
→ false
```

---

# 32. When Is `Object.is()` Useful?

Use it when you specifically need:

```text
NaN to equal NaN
```

or when distinguishing:

```text
+0
from
-0
```

For normal business comparisons, `===` is usually clearer.

---

# 33. Object Equality Is Reference Equality 🔥🔥🔥

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second = {
  name: "Rahul",
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

Same content.

Different objects.

---

# 34. Same Object Reference Is Equal

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second =
  first;

// Step 3:
console.log(
  first === second
); // Output: true
```

Output:

```text
true
```

Both variables contain the same reference value.

---

# 35. `Object.is()` Also Uses Reference Identity for Objects

```js
// Step 1:
const first = {
  name: "Rahul",
};

// Step 2:
const second = {
  name: "Rahul",
};

// Step 3:
console.log(
  Object.is(
    first,
    second
  )
); // Output: false
```

Output:

```text
false
```

`Object.is()` does not perform deep comparison.

---

# 36. Arrays Are Compared by Reference 🔥🔥🔥

```js
// Step 1:
const first = [
  1,
  2,
];

// Step 2:
const second = [
  1,
  2,
];

// Step 3:
console.log(
  first === second
); // Output: false
```

Output:

```text
false
```

---

# 37. Same Array Reference

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
console.log(
  first === second
); // Output: true
```

Output:

```text
true
```

---

# 38. Functions Are Compared by Reference 🔥🔥🔥

```js
// Step 1:
const first =
  function () {
    return 1;
  };

// Step 2:
const second =
  function () {
    return 1;
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

Same code does not mean same function object.

---

# 39. Same Function Reference

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
  greet;

// Step 4:
console.log(
  first === second
); // Output: true
```

Output:

```text
true
```

---

# 40. Object Compared With Primitive Using `==` — Awareness 🔥🔥

Loose equality may convert an object to a primitive before comparison.

Example:

```js
// Step 1:
console.log(
  [1] == 1
); // Output: true
```

Output:

```text
true
```

Very simplified mental flow:

```text
[1]
↓ converted to primitive
"1"
↓ converted to number
1
↓
1 == 1
↓
true
```

These coercion rules are why `==` can become confusing.

---

# 41. Empty Array With Empty String — Awareness

```js
// Step 1:
console.log(
  [] == ""
); // Output: true
```

Output:

```text
true
```

The empty array converts to an empty string for this comparison.

This is another reason to prefer `===`.

---

# 42. Empty Array Is NOT Strictly Equal to Empty String

```js
// Step 1:
console.log(
  [] === ""
); // Output: false
```

Output:

```text
false
```

Types differ:

```text
array/object
vs
string
```

---

# 43. Two Empty Arrays Are Not Equal

```js
// Step 1:
console.log(
  [] === []
); // Output: false
```

Output:

```text
false
```

Each array literal creates a new array object.

---

# 44. Two Empty Objects Are Not Equal

```js
// Step 1:
console.log(
  {} === {}
); // Output: false
```

Output:

```text
false
```

Each object literal creates a new object.

---

# 45. Comparing Object Properties Instead of Objects

If you want to compare a specific field:

```js
// Step 1:
const first = {
  id: 101,
  name: "Rahul",
};

// Step 2:
const second = {
  id: 101,
  name: "Rahul",
};

// Step 3:
console.log(
  first.id
  ===
  second.id
); // Output: true
```

Output:

```text
true
```

---

# 46. Deep Equality Is a Different Problem 🔥🔥🔥

JavaScript does not have a simple built-in operator that means:

```text
recursively compare every nested property
```

This:

```text
a === b
```

only checks reference identity for objects.

---

# 47. Why `JSON.stringify()` Is Not a Perfect Deep Equality Tool

You may see:

```js
// Step 1:
const a = {
  x: 1,
  y: 2,
};

// Step 2:
const b = {
  x: 1,
  y: 2,
};

// Step 3:
console.log(
  JSON.stringify(
    a
  )
  ===
  JSON.stringify(
    b
  )
); // Output: true
```

Output:

```text
true
```

But this technique has limitations.

---

# 48. Property Order Can Break JSON String Comparison 🔥🔥

```js
// Step 1:
const a = {
  x: 1,
  y: 2,
};

// Step 2:
const b = {
  y: 2,
  x: 1,
};

// Step 3:
console.log(
  JSON.stringify(
    a
  )
  ===
  JSON.stringify(
    b
  )
); // Output: false
```

Output:

```text
false
```

The objects contain equivalent key/value data for many practical purposes, but serialized property order differs.

---

# 49. Deep Equality Requires Defined Rules

Before implementing deep equality, decide:

```text
Should property order matter?

Should array order matter?

How should Dates compare?

How should Maps/Sets compare?

How should NaN compare?

How should circular references work?
```

Deep equality is not one simple universal rule.

---

# 50. `instanceof` Is NOT an Equality Operator 🔥🔥🔥

`instanceof` checks prototype-chain relationship.

Example:

```js
class Employee {
  // Step 1:
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee
  instanceof
  Employee
); // Output: true
```

Output:

```text
true
```

It does not compare two values for equality.

---

# 51. How `instanceof` Works

For:

```text
employee instanceof Employee
```

JavaScript conceptually checks:

```text
Does Employee.prototype
exist in employee's prototype chain?
```

If yes:

```text
true
```

---

# 52. `instanceof Object`

```js
class Employee {
  // Step 1:
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee
  instanceof
  Object
); // Output: true
```

Output:

```text
true
```

Because:

```text
employee
↓
Employee.prototype
↓
Object.prototype
```

---

# 53. Primitive With `instanceof`

```js
// Step 1:
console.log(
  "Rahul"
  instanceof
  String
); // Output: false
```

Output:

```text
false
```

Primitive strings are not `String` wrapper instances.

---

# 54. Wrapper Object With `instanceof`

```js
// Step 1:
const value =
  new String(
    "Rahul"
  );

// Step 2:
console.log(
  value
  instanceof
  String
); // Output: true
```

Output:

```text
true
```

But normally avoid wrapper constructors like:

```text
new String()
new Number()
new Boolean()
```

for application data.

---

# 55. `typeof` vs `instanceof`

Use:

```text
typeof
```

mainly for primitive/type checks.

Use:

```text
instanceof
```

for constructor/prototype relationships.

Example:

```js
// Step 1:
console.log(
  typeof "Rahul"
); // Output: string

// Step 2:
console.log(
  []
  instanceof
  Array
); // Output: true
```

Output:

```text
string
true
```

---

# 56. Better Array Check: `Array.isArray()` 🔥🔥🔥

For arrays, prefer:

```js
// Step 1:
const value = [
  1,
  2,
];

// Step 2:
console.log(
  Array.isArray(
    value
  )
); // Output: true
```

Output:

```text
true
```

This is clearer and works reliably across realms compared with `instanceof Array`.

---

# 57. SameValueZero — Awareness 🔥🔥🔥

`Set`, `Map`, and some methods use an equality algorithm called:

```text
SameValueZero
```

Important practical behavior:

```text
NaN equals NaN
+0 equals -0
```

inside these collection comparisons.

---

# 58. `Set` Treats `NaN` as the Same Value 🔥🔥🔥

```js
// Step 1:
const values =
  new Set(
    [
      NaN,
      NaN,
    ]
  );

// Step 2:
console.log(
  values.size
); // Output: 1
```

Output:

```text
1
```

Even though:

```text
NaN === NaN
→ false
```

---

# 59. `Set` Treats `+0` and `-0` as Same

```js
// Step 1:
const values =
  new Set(
    [
      +0,
      -0,
    ]
  );

// Step 2:
console.log(
  values.size
); // Output: 1
```

Output:

```text
1
```

---

# 60. `Map` Object Keys Still Use Reference Identity

```js
// Step 1:
const firstKey = {
  id: 1,
};

// Step 2:
const secondKey = {
  id: 1,
};

// Step 3:
const map =
  new Map();

// Step 4:
map.set(
  firstKey,
  "Employee"
);

// Step 5:
console.log(
  map.get(
    firstKey
  )
); // Output: Employee

// Step 6:
console.log(
  map.get(
    secondKey
  )
); // Output: undefined
```

Output:

```text
Employee
undefined
```

Different object references remain different keys.

---

# 61. `includes()` Can Find `NaN` 🔥🔥

```js
// Step 1:
const values = [
  1,
  NaN,
  3,
];

// Step 2:
console.log(
  values.includes(
    NaN
  )
); // Output: true
```

Output:

```text
true
```

`includes()` uses SameValueZero-like comparison behavior.

---

# 62. `indexOf()` Cannot Find `NaN`

```js
// Step 1:
const values = [
  1,
  NaN,
  3,
];

// Step 2:
console.log(
  values.indexOf(
    NaN
  )
); // Output: -1
```

Output:

```text
-1
```

This difference is useful in interviews.

---

# 63. `Object.is()` Is NOT Deep Equality

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
  Object.is(
    a,
    b
  )
); // Output: false
```

Output:

```text
false
```

It still compares object identity.

---

# 64. Practical Example — Compare Employee IDs 🔥🔥🔥

When checking whether two API records represent the same employee, comparing IDs is often better than comparing whole object references.

```js
// Step 1:
const first = {
  id: 101,
  name: "Rahul",
};

// Step 2:
const second = {
  id: 101,
  name: "Rahul",
};

// Step 3:
const sameEmployee =
  first.id
  ===
  second.id;

// Step 4:
console.log(
  sameEmployee
); // Output: true
```

Output:

```text
true
```

---

# 65. Practical Example — Filter Selected Employee

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
const selectedId =
  2;

// Step 3:
const selected =
  employees.find(
    (employee) => {
      // Step 4:
      return (
        employee.id
        ===
        selectedId
      );
    }
  );

// Step 5:
console.log(
  selected.name
); // Output: Amit
```

Output:

```text
Amit
```

Use strict equality for IDs when types are controlled.

---

# 66. Debugging — API ID String vs Number 🔥🔥🔥

Common problem:

```js
// Step 1:
const employee = {
  id: 101,
};

// Step 2:
const routeId =
  "101";

// Step 3:
console.log(
  employee.id
  ===
  routeId
); // Output: false
```

Output:

```text
false
```

One is a number.

One is a string.

---

# 67. Better Fix — Normalize Types

```js
// Step 1:
const employee = {
  id: 101,
};

// Step 2:
const routeId =
  "101";

// Step 3:
const normalizedRouteId =
  Number(
    routeId
  );

// Step 4:
console.log(
  employee.id
  ===
  normalizedRouteId
); // Output: true
```

Output:

```text
true
```

Better than using `==` just to hide inconsistent data types.

---

# 68. Debugging — Comparing Objects From API

Problem:

```js
// Step 1:
const selectedEmployee = {
  id: 1,
  name: "Rahul",
};

// Step 2:
const apiEmployee = {
  id: 1,
  name: "Rahul",
};

// Step 3:
console.log(
  selectedEmployee
  ===
  apiEmployee
); // Output: false
```

Output:

```text
false
```

Compare stable keys instead:

```js
// Step 4:
console.log(
  selectedEmployee.id
  ===
  apiEmployee.id
); // Output: true
```

---

# 69. Interview Output 1 — String vs Number 🔥🔥🔥

```js
// Step 1:
console.log(
  5 == "5"
);

// Step 2:
console.log(
  5 === "5"
);
```

Expected output:

```text
true
false
```

---

# 70. Interview Output 2 — `null` vs `undefined`

```js
// Step 1:
console.log(
  null == undefined
);

// Step 2:
console.log(
  null === undefined
);
```

Expected output:

```text
true
false
```

---

# 71. Interview Output 3 — Boolean Coercion 🔥🔥🔥

```js
// Step 1:
console.log(
  false == 0
);

// Step 2:
console.log(
  false === 0
);
```

Expected output:

```text
true
false
```

---

# 72. Interview Output 4 — `NaN`

```js
// Step 1:
console.log(
  NaN === NaN
);

// Step 2:
console.log(
  Object.is(
    NaN,
    NaN
  )
);
```

Expected output:

```text
false
true
```

---

# 73. Interview Output 5 — `+0` / `-0` 🔥🔥🔥

```js
// Step 1:
console.log(
  +0 === -0
);

// Step 2:
console.log(
  Object.is(
    +0,
    -0
  )
);
```

Expected output:

```text
true
false
```

---

# 74. Interview Output 6 — Object References

```js
// Step 1:
const a = {
  x: 1,
};

// Step 2:
const b = {
  x: 1,
};

// Step 3:
const c =
  a;

// Step 4:
console.log(
  a === b
);

// Step 5:
console.log(
  a === c
);
```

Expected output:

```text
false
true
```

---

# 75. Interview Output 7 — Arrays

```js
// Step 1:
console.log(
  [] === []
);

// Step 2:
const a = [];

// Step 3:
const b =
  a;

// Step 4:
console.log(
  a === b
);
```

Expected output:

```text
false
true
```

---

# 76. Interview Output 8 — Set + `NaN`

```js
// Step 1:
const values =
  new Set(
    [
      NaN,
      NaN,
    ]
  );

// Step 2:
console.log(
  values.size
);
```

Expected output:

```text
1
```

---

# 77. Interview Output 9 — `includes()` vs `indexOf()` 🔥🔥🔥

```js
// Step 1:
const values = [
  NaN,
];

// Step 2:
console.log(
  values.includes(
    NaN
  )
);

// Step 3:
console.log(
  values.indexOf(
    NaN
  )
);
```

Expected output:

```text
true
-1
```

---

# 78. Interview Output 10 — `instanceof`

```js
class Employee {
  // Step 1:
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee
  instanceof
  Employee
);

// Step 4:
console.log(
  employee
  instanceof
  Object
);
```

Expected output:

```text
true
true
```

---

# 79. Interview Question — `==` vs `===` 🔥🔥🔥

Good answer:

```text
== performs loose equality
and may convert types before comparing.

=== performs strict equality
and does not coerce different types.

In normal application code,
=== is generally preferred.
```

---

# 80. Interview Question — Why Is `NaN === NaN` False?

Good answer:

```text
NaN has special equality behavior.

It is not equal to itself
under == or ===.

Use Number.isNaN()
to test for NaN,
or Object.is(NaN, NaN)
when comparing values.
```

---

# 81. Interview Question — `Object.is()` vs `===` 🔥🔥🔥

Good answer:

```text
They behave the same for most values.

Main differences:

Object.is(NaN, NaN)
→ true

NaN === NaN
→ false

Object.is(+0, -0)
→ false

+0 === -0
→ true
```

---

# 82. Interview Question — How Are Objects Compared?

Good answer:

```text
Objects, arrays, and functions
are compared by reference identity.

Two separate objects with the same content
are not strictly equal.

They are equal only if both variables
refer to the same object.
```

---

# 83. Interview Question — What Does `instanceof` Check?

Good answer:

```text
instanceof checks whether
a constructor's prototype exists
in an object's prototype chain.

It is a relationship check,
not a normal equality comparison.
```

---

# 84. Interview Question — Is There Built-In Deep Equality Operator?

Good answer:

```text
No.

=== and Object.is()
do not recursively compare object contents.

Deep equality needs custom logic
or a library,
depending on the comparison rules required.
```

---

# 85. Equality Decision Guide 🔥🔥🔥

```text
Same primitive type/value?
→ use ===

Different types but should still match?
→ normalize types first

Need null OR undefined check intentionally?
→ value == null
  is a known pattern

Need NaN check?
→ Number.isNaN(value)

Need NaN to equal NaN?
→ Object.is()

Need distinguish +0 and -0?
→ Object.is()

Comparing objects?
→ reference equality with ===

Need compare business identity?
→ compare stable key such as id

Need prototype relationship?
→ instanceof

Need deep object comparison?
→ define deep-equality rules
```

---

# 86. Final Master Trace 🔥🔥🔥

```js
// Step 1:
console.log(
  10 == "10"
); // Output: true

// Step 2:
console.log(
  10 === "10"
); // Output: false

// Step 3:
console.log(
  null == undefined
); // Output: true

// Step 4:
console.log(
  null === undefined
); // Output: false

// Step 5:
console.log(
  NaN === NaN
); // Output: false

// Step 6:
console.log(
  Object.is(
    NaN,
    NaN
  )
); // Output: true

// Step 7:
console.log(
  +0 === -0
); // Output: true

// Step 8:
console.log(
  Object.is(
    +0,
    -0
  )
); // Output: false

// Step 9:
const first = {
  id: 101,
};

// Step 10:
const second = {
  id: 101,
};

// Step 11:
const third =
  first;

// Step 12:
console.log(
  first === second
); // Output: false

// Step 13:
console.log(
  first === third
); // Output: true

// Step 14:
console.log(
  first.id
  ===
  second.id
); // Output: true
```

Output:

```text
true
false
true
false
false
true
true
false
false
true
true
```

Complete mental model:

```text
10 == "10"
↓
loose equality
↓
coercion
↓
true

10 === "10"
↓
strict equality
↓
different types
↓
false

NaN === NaN
↓
special NaN rule
↓
false

Object.is(NaN, NaN)
↓
SameValue comparison
↓
true

first === second
↓
different object references
↓
false

first === third
↓
same reference
↓
true

first.id === second.id
↓
primitive number comparison
↓
true
```

---

# Quick Memory 🧠🔥🔥🔥

## `===`

```text
strict equality
no type coercion
```

## `==`

```text
loose equality
coercion may happen
```

## Recommendation

```text
Prefer ===
unless coercion is intentional.
```

## `null` / `undefined`

```text
null == undefined
→ true

null === undefined
→ false
```

## `NaN`

```text
NaN === NaN
→ false

Number.isNaN(NaN)
→ true

Object.is(NaN, NaN)
→ true
```

## `+0` / `-0`

```text
+0 === -0
→ true

Object.is(+0, -0)
→ false
```

## Objects

```text
same content
does NOT mean
same reference
```

## Arrays

```text
[] === []
→ false
```

## Same Reference

```text
const b = a;

a === b
→ true
```

## `Object.is()`

```text
similar to ===

special differences:
NaN
+0 / -0
```

## `instanceof`

```text
checks prototype-chain relationship
```

## `Set`

```text
NaN considered same as NaN
+0 considered same as -0
```

## `includes()`

```text
can find NaN
```

## `indexOf()`

```text
cannot find NaN
```

## Deep Equality

```text
=== does NOT deeply compare objects
```

## Best Practical Rule

```text
Normalize data types first,
then use ===.
```

## Most Important Interview Answer

```text
JavaScript has multiple equality rules.

=== compares without type coercion.

== may coerce values before comparison.

Objects are compared by reference identity.

Object.is() behaves like strict equality
for most values but treats NaN as equal
to itself and distinguishes +0 from -0.
```

---

# ✅ 7.14 Equality Complete

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
7.14 Equality
```

Next topic:

```text
7.15 Memory Basics 🔥🔥🔥
├── Stack / Heap Mental Model
├── Primitive / Object Memory Awareness
├── References
├── Reachability
├── Garbage Collection
├── Object Lifetime
└── Interview Questions
```

**Next: 7.15 Memory Basics 🔥🔥🔥**
