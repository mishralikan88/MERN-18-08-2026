# 6.4 Operators 🔥🔥

Operators are symbols or keywords that let us:

```text
calculate values
compare values
assign values
combine conditions
check types
provide defaults
safely access nested data
```

You already use operators constantly in real JavaScript.

Examples:

```js
const total = price * quantity;

if (age >= 18 && isActive) {
  console.log("Allowed");
}
```

Here:

```text
*
>=
&&
```

are operators.

---

# 1. Main Operator Groups

For interviews and practical coding, focus on:

```text
Arithmetic Operators
Assignment Operators
Comparison Operators
Logical Operators
Unary Operators
Increment / Decrement
Ternary Operator
typeof
instanceof
in
Optional Chaining ?.
Nullish Coalescing ??
Logical Assignment
Short-Circuit Evaluation
```

---

# 2. Arithmetic Operators

Main arithmetic operators:

```text
+   Addition
-   Subtraction
*   Multiplication
/   Division
%   Remainder
**  Exponentiation
```

Example:

```js
const a = 10;
const b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);
```

Outputs:

```text
13
7
30
3.3333333333333335
1
1000
```

---

# 3. Addition `+`

With numbers:

```js
const salary = 50000;
const bonus = 10000;

console.log(salary + bonus);
```

Output:

```text
60000
```

But remember from coercion:

```js
console.log("50000" + 10000);
```

Output:

```text
5000010000
```

Because `+` can mean:

```text
numeric addition
or
string concatenation
```

This is why input/API types matter.

---

# 4. Subtraction `-`

```js
const total = 100;
const discount = 20;

console.log(total - discount);
```

Output:

```text
80
```

Real application:

```js
const finalPrice = price - discount;
```

---

# 5. Multiplication `*`

```js
const price = 1000;
const quantity = 3;

const total = price * quantity;

console.log(total);
```

Output:

```text
3000
```

Very common in:

```text
cart totals
salary calculations
tax calculations
billing
```

---

# 6. Division `/`

```js
const total = 100;
const employees = 4;

console.log(total / employees);
```

Output:

```text
25
```

---

# 7. Modulus `%` 🔥🔥

`%` gives the remainder after division.

Example:

```js
console.log(10 % 3);
```

Output:

```text
1
```

Because:

```text
10 / 3
→ 3 remainder 1
```

---

# 8. Practical `%` — Even / Odd

Very common coding pattern:

```js
const number = 10;

if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
```

Output:

```text
Even
```

Why?

```text
10 % 2
→ 0
```

No remainder means even.

---

# 9. Practical `%` — Every nth Item

Suppose:

```js
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    console.log(i);
  }
}
```

Output:

```text
3
6
9
```

Useful for:

```text
batch processing
layout logic
pagination calculations
coding problems
```

---

# 10. Exponentiation `**`

```js
console.log(2 ** 3);
```

Output:

```text
8
```

Meaning:

```text
2 × 2 × 2
```

Equivalent idea:

```js
Math.pow(2, 3);
```

For frontend machine coding, this is lower priority but know the syntax.

---

# 11. Assignment Operator `=`

The basic assignment operator is:

```js
=
```

Example:

```js
let salary = 50000;
```

Here:

```text
salary
gets
50000
```

Later:

```js
salary = 60000;
```

This reassigns the value.

---

# 12. Compound Assignment Operators 🔥🔥

Instead of:

```js
let total = 100;

total = total + 50;
```

You can write:

```js
total += 50;
```

Now:

```text
total = 150
```

Common compound operators:

```text
+=
-=
*=
/=
%=
**=
```

---

# 13. Practical Compound Assignment

```js
let totalSalary = 0;

totalSalary += 50000;
totalSalary += 60000;
totalSalary += 70000;

console.log(totalSalary);
```

Output:

```text
180000
```

This pattern appears constantly inside loops and `reduce()` logic.

---

# 14. Comparison Operators 🔥🔥🔥

Comparison operators return:

```text
true
or
false
```

Main ones:

```text
>
<
>=
<=
==
===
!=
!==
```

Example:

```js
console.log(10 > 5);
```

Output:

```text
true
```

---

# 15. Greater Than / Less Than

```js
console.log(10 > 5);
console.log(10 < 5);
```

Outputs:

```text
true
false
```

Real application:

```js
if (salary > 100000) {
  console.log("High salary");
}
```

---

# 16. Greater Than or Equal / Less Than or Equal

```js
const age = 18;

console.log(age >= 18);
```

Output:

```text
true
```

Useful for:

```text
age checks
minimum limits
pagination bounds
score validation
range filtering
```

---

# 17. Strict Equality `===` 🔥🔥🔥

Use:

```js
===
```

to compare without type coercion.

```js
console.log(10 === 10);
```

Output:

```text
true
```

But:

```js
console.log(10 === "10");
```

Output:

```text
false
```

Because:

```text
10
→ number

"10"
→ string
```

---

# 18. Strict Inequality `!==`

```js
console.log(10 !== "10");
```

Output:

```text
true
```

Because their types are different.

Practical rule:

```text
Prefer ===
Prefer !==
```

---

# 19. Loose Equality `==` — Interview Awareness

```js
console.log(10 == "10");
```

Output:

```text
true
```

because JavaScript performs coercion.

We already covered this in Type Conversion / Coercion.

For real application code:

```text
Prefer ===
```

---

# 20. Comparing Strings

JavaScript can compare strings.

```js
console.log("apple" === "apple");
```

Output:

```text
true
```

And:

```js
console.log("apple" === "Apple");
```

Output:

```text
false
```

String comparison is case-sensitive.

---

# 21. Object Comparison 🔥🔥

Remember:

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

Because object comparison checks references.

But:

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

Same object reference.

---

# 22. Logical Operators 🔥🔥🔥

Main logical operators:

```text
&&   AND
||   OR
!    NOT
```

They are heavily used in:

```text
conditions
validation
permissions
defaults
conditional rendering
machine coding
```

---

# 23. Logical AND `&&`

`&&` means:

> Both conditions should be truthy.

Example:

```js
const isLoggedIn = true;
const isAdmin = true;

if (isLoggedIn && isAdmin) {
  console.log("Admin dashboard");
}
```

Output:

```text
Admin dashboard
```

---

# 24. AND Truth Table

```text
true  && true  → true
true  && false → false
false && true  → false
false && false → false
```

Easy memory:

```text
&&
→ both required
```

---

# 25. Real Validation Example with `&&`

```js
const email = "rahul@gmail.com";
const password = "123456";

if (email && password) {
  console.log("Form can submit");
}
```

Both values are non-empty strings, so both are truthy.

---

# 26. Logical OR `||`

`||` means:

> At least one condition should be truthy.

Example:

```js
const isAdmin = false;
const isManager = true;

if (isAdmin || isManager) {
  console.log("Can access reports");
}
```

Output:

```text
Can access reports
```

---

# 27. OR Truth Table

```text
true  || true  → true
true  || false → true
false || true  → true
false || false → false
```

Easy memory:

```text
||
→ any one is enough
```

---

# 28. Logical NOT `!`

`!` reverses truthiness.

```js
console.log(!true);
```

Output:

```text
false
```

```js
console.log(!false);
```

Output:

```text
true
```

---

# 29. Practical `!`

```js
const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("Please login");
}
```

Output:

```text
Please login
```

Because:

```text
!false
→ true
```

---

# 30. `!` Works With Truthy / Falsy Values

```js
console.log(!"Rahul");
```

Output:

```text
false
```

Because:

```text
"Rahul"
→ truthy

!truthy
→ false
```

---

# 31. Double NOT `!!`

```js
console.log(!!"Rahul");
```

Output:

```text
true
```

This converts a value into an actual Boolean.

Equivalent idea:

```js
Boolean("Rahul");
```

---

# 32. Short-Circuit Evaluation 🔥🔥🔥

This is very important.

JavaScript does not always evaluate both sides of:

```text
&&
||
```

It stops as soon as the result is known.

This is called:

```text
Short-Circuit Evaluation
```

---

# 33. `&&` Short-Circuit

Example:

```js
false && console.log("Hello");
```

Nothing is printed.

Why?

With `&&`:

```text
first value is falsy
↓
whole expression cannot succeed
↓
JavaScript stops
```

---

# 34. Practical `&&` Pattern

```js
const user = {
  name: "Rahul",
};

user && console.log(user.name);
```

Output:

```text
Rahul
```

Historically this was commonly used for safe conditional access.

Today optional chaining is usually cleaner for nested property access.

---

# 35. `||` Short-Circuit

Example:

```js
true || console.log("Hello");
```

Nothing after `||` runs.

Why?

With OR:

```text
first value already truthy
↓
result is already determined
↓
JavaScript stops
```

---

# 36. `||` for Default Values 🔥🔥

Example:

```js
const username = "";

const displayName = username || "Guest";

console.log(displayName);
```

Output:

```text
Guest
```

Because:

```text
username = ""
→ falsy
```

So JavaScript returns:

```text
"Guest"
```

---

# 37. Important `||` Default Trap 🔥🔥🔥

Consider:

```js
const count = 0;

const value = count || 10;

console.log(value);
```

Output:

```text
10
```

But maybe `0` was a valid value.

Problem:

```text
||
uses truthy / falsy
```

So it treats:

```text
0
""
false
```

as missing.

This is where:

```text
??
```

becomes useful.

---

# 38. Nullish Coalescing `??` 🔥🔥🔥

`??` provides a fallback only when the left side is:

```text
null
or
undefined
```

Example:

```js
const username = null;

const displayName = username ?? "Guest";

console.log(displayName);
```

Output:

```text
Guest
```

---

# 39. `||` vs `??` 🔥🔥🔥

Consider:

```js
const count = 0;
```

Using `||`:

```js
console.log(count || 10);
```

Output:

```text
10
```

Using `??`:

```js
console.log(count ?? 10);
```

Output:

```text
0
```

Why?

Because `0` is not:

```text
null
undefined
```

So `??` preserves it.

---

# 40. Another `||` vs `??` Example

```js
const name = "";
```

Using:

```js
console.log(name || "Guest");
```

Output:

```text
Guest
```

But:

```js
console.log(name ?? "Guest");
```

Output:

```text
""
```

Because an empty string is not nullish.

---

# 41. Practical Rule — `||` vs `??`

Use:

```text
||
```

when you want a fallback for **any falsy value**.

Use:

```text
??
```

when you only want a fallback for:

```text
null
undefined
```

This distinction matters in real applications.

---

# 42. Optional Chaining `?.` 🔥🔥🔥

Optional chaining safely accesses nested properties.

Suppose:

```js
const employee = {
  name: "Rahul",
  manager: null,
};
```

This can fail:

```js
console.log(employee.manager.name);
```

❌ Error.

Because:

```text
manager
→ null
```

You cannot access:

```text
null.name
```

---

# 43. Optional Chaining Solution

Use:

```js
console.log(employee.manager?.name);
```

Output:

```text
undefined
```

No crash.

Flow:

```text
employee.manager
↓
null

?. detects null / undefined
↓
stops safely
↓
undefined
```

---

# 44. Nested Optional Chaining

Suppose:

```js
const response = {
  employee: {
    address: {
      city: "Hyderabad",
    },
  },
};
```

Access:

```js
console.log(response.employee?.address?.city);
```

Output:

```text
Hyderabad
```

If `address` is missing:

```js
const response = {
  employee: {},
};
```

Then:

```js
console.log(response.employee?.address?.city);
```

Output:

```text
undefined
```

No runtime error.

---

# 45. Optional Chaining With Methods

Suppose:

```js
const user = {
  name: "Rahul",
};
```

You can safely call an optional method:

```js
user.logout?.();
```

If `logout` doesn't exist, JavaScript simply returns `undefined` instead of trying to call it.

Useful when a callback or method is optional.

---

# 46. Optional Chaining With Arrays

Example:

```js
const employees = [];

console.log(employees?.[0]?.name);
```

Output:

```text
undefined
```

This is useful with uncertain API data.

---

# 47. Optional Chaining + Nullish Coalescing 🔥🔥🔥

Very useful combination:

```js
const employee = {
  manager: null,
};

const managerName =
  employee.manager?.name ?? "No Manager";

console.log(managerName);
```

Output:

```text
No Manager
```

Flow:

```text
employee.manager?.name
↓
undefined

undefined ?? "No Manager"
↓
"No Manager"
```

This is a very practical pattern.

---

# 48. Ternary Operator 🔥🔥🔥

Syntax:

```js
condition ? valueIfTrue : valueIfFalse
```

Example:

```js
const age = 20;

const status = age >= 18 ? "Adult" : "Minor";

console.log(status);
```

Output:

```text
Adult
```

---

# 49. Ternary vs `if/else`

This:

```js
let status;

if (age >= 18) {
  status = "Adult";
} else {
  status = "Minor";
}
```

can become:

```js
const status = age >= 18 ? "Adult" : "Minor";
```

Use ternary when the condition is simple.

---

# 50. Practical Ternary Example

```js
const isActive = true;

const label = isActive ? "Active" : "Inactive";

console.log(label);
```

Output:

```text
Active
```

Common in:

```text
UI labels
status text
small assignments
conditional rendering
```

---

# 51. Avoid Deeply Nested Ternaries

This is technically possible:

```js
const result =
  score > 90
    ? "A"
    : score > 80
    ? "B"
    : score > 70
    ? "C"
    : "D";
```

But it becomes harder to read.

For complex conditions:

```text
prefer if / else
or
extract logic into a function
```

Machine-coding readability matters.

---

# 52. `typeof` Operator 🔥🔥

You already used:

```js
typeof value
```

Example:

```js
console.log(typeof "Rahul");
```

Output:

```text
string
```

Useful for checking primitive types.

---

# 53. Practical `typeof`

```js
function printValue(value) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

Usage:

```js
printValue("rahul");
```

Output:

```text
RAHUL
```

---

# 54. Important `typeof` Traps

Remember:

```js
typeof null
// "object"
```

```js
typeof []
// "object"
```

So:

```text
typeof
```

is not enough to detect arrays.

Use:

```js
Array.isArray(value);
```

---

# 55. `instanceof` 🔥🔥

`instanceof` checks whether an object is linked to a constructor's prototype.

Simple practical example:

```js
const date = new Date();

console.log(date instanceof Date);
```

Output:

```text
true
```

---

# 56. `instanceof` With Arrays

```js
const values = [];

console.log(values instanceof Array);
```

Output:

```text
true
```

But for checking arrays in normal application code:

```js
Array.isArray(values);
```

is generally preferred.

---

# 57. `instanceof` With Custom Classes

```js
class Employee {}

const employee = new Employee();

console.log(employee instanceof Employee);
```

Output:

```text
true
```

Meaning:

```text
employee
was created through
Employee's prototype chain
```

We’ll understand this deeply under:

```text
Prototype
Prototype Chain
Classes
```

For now, know the practical usage.

---

# 58. `typeof` vs `instanceof`

Easy difference:

```text
typeof
→ useful mainly for primitive type checks

instanceof
→ checks object / constructor relationship
```

Example:

```js
typeof "Rahul";
// "string"
```

```js
new Date() instanceof Date;
// true
```

---

# 59. `in` Operator 🔥

The `in` operator checks whether a property exists in an object.

Example:

```js
const employee = {
  name: "Rahul",
  salary: 50000,
};

console.log("name" in employee);
```

Output:

```text
true
```

---

# 60. `in` Checks Property Existence

```js
console.log("department" in employee);
```

Output:

```text
false
```

This is different from simply checking the property's value.

---

# 61. Important Property Check Difference 🔥🔥

Consider:

```js
const employee = {
  manager: undefined,
};
```

Now:

```js
console.log(employee.manager);
```

Output:

```text
undefined
```

But:

```js
console.log("manager" in employee);
```

Output:

```text
true
```

Why?

The property exists.

Its value just happens to be:

```text
undefined
```

Important distinction.

---

# 62. Logical Assignment Operators 🔥🔥

Modern JavaScript supports:

```text
||=
&&=
??=
```

These combine logical checks with assignment.

---

# 63. OR Assignment `||=`

Example:

```js
let username = "";

username ||= "Guest";

console.log(username);
```

Output:

```text
Guest
```

Conceptually:

```js
username = username || "Guest";
```

---

# 64. `||=` Trap

```js
let count = 0;

count ||= 10;

console.log(count);
```

Output:

```text
10
```

Because `0` is falsy.

If `0` is valid, `||=` may not be what you want.

---

# 65. Nullish Assignment `??=` 🔥🔥🔥

```js
let count = 0;

count ??= 10;

console.log(count);
```

Output:

```text
0
```

Because:

```text
0
```

is neither:

```text
null
nor
undefined
```

---

# 66. `??=` Example

```js
let username;

username ??= "Guest";

console.log(username);
```

Output:

```text
Guest
```

Because the original value was:

```text
undefined
```

---

# 67. AND Assignment `&&=`

Example:

```js
let status = "active";

status &&= "verified";

console.log(status);
```

Output:

```text
verified
```

Because the original `status` was truthy.

Conceptually:

```js
status = status && "verified";
```

This is less commonly used than:

```text
??=
||=
```

but know it for interviews.

---

# 68. Increment Operator `++`

```js
let count = 1;

count++;

console.log(count);
```

Output:

```text
2
```

Equivalent idea:

```js
count = count + 1;
```

---

# 69. Decrement Operator `--`

```js
let count = 5;

count--;

console.log(count);
```

Output:

```text
4
```

---

# 70. Prefix vs Postfix 🔥🔥🔥

This is a common output-question area.

Postfix:

```js
let x = 5;

const y = x++;
```

What happens?

```text
y gets old x
then x increments
```

So:

```js
console.log(x);
console.log(y);
```

Output:

```text
6
5
```

---

# 71. Prefix Increment

```js
let x = 5;

const y = ++x;
```

Now:

```text
x increments first
then new value is assigned
```

Output:

```js
console.log(x);
console.log(y);
```

```text
6
6
```

---

# 72. Easy Prefix/Postfix Memory

```text
x++
→ use old value
→ then increment


++x
→ increment first
→ use new value
```

Same idea for:

```text
x--
--x
```

---

# 73. Unary Minus

Unary minus converts/negates a numeric value.

```js
const value = 10;

console.log(-value);
```

Output:

```text
-10
```

It can also trigger numeric conversion:

```js
console.log(-"10");
```

Output:

```text
-10
```

Awareness is enough.

---

# 74. Unary Plus

As covered earlier:

```js
console.log(+"10");
```

Output:

```text
10
```

It converts the string into a number.

For readable business code:

```js
Number("10");
```

is usually clearer.

---

# 75. Operator Precedence — Practical Awareness 🔥🔥

Consider:

```js
console.log(2 + 3 * 4);
```

Output:

```text
14
```

Why?

Multiplication happens before addition:

```text
3 * 4
→ 12

2 + 12
→ 14
```

---

# 76. Parentheses Make Intent Clear

```js
console.log((2 + 3) * 4);
```

Output:

```text
20
```

In practical code:

```text
Use parentheses when expression order might be unclear.
```

Readable code is more important than showing off precedence knowledge.

---

# 77. Practical Permission Check 🔥🔥🔥

Suppose:

```js
const user = {
  isLoggedIn: true,
  role: "admin",
};
```

You can write:

```js
if (user.isLoggedIn && user.role === "admin") {
  console.log("Allow admin access");
}
```

This combines:

```text
&&
===
```

Very common real-world code.

---

# 78. Practical Search Default

Suppose:

```js
const searchTerm = null;
```

You can write:

```js
const query = searchTerm ?? "";

console.log(query);
```

Output:

```text
""
```

Now downstream string operations can safely use the fallback.

---

# 79. Practical Nested API Data 🔥🔥🔥

Suppose API returns:

```js
const response = {
  employee: {
    manager: null,
  },
};
```

Safe access:

```js
const managerName =
  response.employee?.manager?.name ?? "Not Assigned";

console.log(managerName);
```

Output:

```text
Not Assigned
```

This combines:

```text
?.
??
```

This is a very useful machine-coding pattern.

---

# 80. Practical Pagination Bounds

```js
let currentPage = 1;
const totalPages = 5;

if (currentPage < totalPages) {
  currentPage++;
}
```

Operators involved:

```text
<
++
```

This prevents moving beyond the last page.

---

# 81. Practical Filter Condition

```js
const employees = [
  { name: "Rahul", salary: 80000, active: true },
  { name: "Amit", salary: 40000, active: false },
  { name: "John", salary: 90000, active: true },
];

const result = employees.filter(
  (employee) =>
    employee.active &&
    employee.salary >= 50000
);

console.log(result);
```

This is exactly how operators are used in real array transformations.

Condition:

```text
active must be truthy
AND
salary must be >= 50000
```

---

# 82. Interview Output 1 🔥

Predict:

```js
console.log(10 > 5 && 20 > 10);
```

Output:

```text
true
```

Both conditions are true.

---

# 83. Interview Output 2

```js
console.log(10 > 5 && 20 < 10);
```

Output:

```text
false
```

Second condition fails.

---

# 84. Interview Output 3 🔥

```js
console.log(false || "Rahul");
```

Output:

```text
Rahul
```

Important:

Logical operators don't always return actual booleans.

They return one of their operands.

---

# 85. `&&` and `||` Return Values 🔥🔥🔥

This is important.

```js
console.log("Rahul" && "Amit");
```

Output:

```text
Amit
```

Why?

With `&&`:

```text
first value truthy
↓
evaluate and return second value
```

---

# 86. Another `&&` Example

```js
console.log("" && "Amit");
```

Output:

```text
""
```

Because the first value is falsy, JavaScript stops and returns it.

Mental rule:

```text
A && B
→ first falsy value
→ otherwise B
```

---

# 87. `||` Return Values

```js
console.log("" || "Guest");
```

Output:

```text
Guest
```

Because the first value is falsy.

Another:

```js
console.log("Rahul" || "Guest");
```

Output:

```text
Rahul
```

Mental rule:

```text
A || B
→ first truthy value
→ otherwise B
```

---

# 88. `??` Return Values

```js
console.log(null ?? "Guest");
```

Output:

```text
Guest
```

But:

```js
console.log(0 ?? 100);
```

Output:

```text
0
```

Mental rule:

```text
A ?? B
→ use B only if A is null or undefined
```

---

# 89. Interview Output 4 🔥🔥

Predict:

```js
console.log(0 || 100);
console.log(0 ?? 100);
```

Output:

```text
100
0
```

This exact difference is important.

---

# 90. Interview Output 5

```js
console.log("" || "Default");
console.log("" ?? "Default");
```

Output:

```text
Default
""
```

Again:

```text
||
→ falsy check

??
→ null / undefined check
```

---

# 91. Interview Output 6 🔥🔥

```js
let x = 5;

console.log(x++);
console.log(x);
```

Output:

```text
5
6
```

Because postfix returns the old value first.

---

# 92. Interview Output 7

```js
let x = 5;

console.log(++x);
console.log(x);
```

Output:

```text
6
6
```

Because prefix increments first.

---

# 93. Interview Question — `||` vs `??`

Good answer:

> `||` uses truthy/falsy rules, while `??` only falls back when the left value is `null` or `undefined`.

Example:

```js
0 || 10;
// 10
```

```js
0 ?? 10;
// 0
```

---

# 94. Interview Question — What is optional chaining?

Good answer:

> Optional chaining `?.` safely accesses a property or method when an earlier value may be `null` or `undefined`. Instead of throwing an error, the chain returns `undefined`.

Example:

```js
employee.manager?.name;
```

---

# 95. Interview Question — What is short-circuit evaluation?

Good answer:

> With logical operators, JavaScript stops evaluating as soon as the result can already be determined.

Example:

```js
false && doSomething();
```

`doSomething()` is not executed.

---

# 96. Interview Question — `typeof` vs `instanceof`

Good answer:

```text
typeof
→ checks the type category of a value
→ especially useful for primitives

instanceof
→ checks whether an object's prototype chain includes a constructor's prototype
```

Example:

```js
typeof "Rahul";
// "string"
```

```js
new Date() instanceof Date;
// true
```

---

# 97. Debugging Problem 🔥🔥

Suppose:

```js
const config = {
  retries: 0,
};

const retries = config.retries || 3;

console.log(retries);
```

Output:

```text
3
```

But `0` was intentionally configured.

Bug:

```text
||
treats 0 as falsy
```

Fix:

```js
const retries = config.retries ?? 3;
```

Now output:

```text
0
```

This is exactly the kind of bug senior developers should notice.

---

# 98. Debugging Nested API Data

Bad:

```js
const city = response.user.address.city;
```

If:

```text
user
or
address
```

is missing, the code crashes.

Safer:

```js
const city =
  response.user?.address?.city ?? "Unknown";
```

Now the application can handle incomplete data.

---

# 99. Machine-Coding Rule 🔥🔥🔥

When handling defaults:

Don't automatically write:

```js
value || defaultValue
```

First ask:

```text
Should 0 be preserved?
Should false be preserved?
Should "" be preserved?
```

If yes:

```js
value ?? defaultValue
```

is usually correct.

---

# 100. Machine-Coding Rule — Conditions

Prefer readable conditions:

```js
const canEdit =
  user.isLoggedIn &&
  user.role === "admin";
```

instead of deeply embedding everything inside UI code.

Then:

```js
if (canEdit) {
  // edit logic
}
```

This improves:

```text
readability
debugging
testing
interview explanation
```

---

# Quick Memory 🧠

Arithmetic:

```text
+  -  *  /  %  **
```

Comparison:

```text
>  <  >=  <=
===  !==
```

Logical:

```text
&&
||
!
```

Defaults:

```text
||
→ fallback for any falsy value

??
→ fallback only for null / undefined
```

Safe access:

```text
?.
```

Examples:

```js
user?.address?.city
```

```js
user?.address?.city ?? "Unknown"
```

Logical assignment:

```text
||=
&&=
??=
```

Increment:

```text
x++
→ use old value, then increment

++x
→ increment first, then use value
```

Type / property operators:

```text
typeof
instanceof
in
```

Practical rules:

```text
Prefer === / !==

Use ?? when 0, false or "" are valid values

Use ?. for uncertain nested data

Use parentheses when expression order is unclear

Avoid complicated nested ternaries

Keep conditions readable
```

## ✅ 6.4 Operators complete

**Next: 6.5 Conditions 🔥🔥**
