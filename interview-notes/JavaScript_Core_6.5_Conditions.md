# 6.5 Conditions 🔥🔥

Conditions let JavaScript decide:

> Which code should run based on whether something is true or false.

They are used everywhere:

```text
form validation
permissions
authentication
API handling
search
filters
pagination
UI states
business rules
machine coding
```

Example:

```js
const age = 20;

if (age >= 18) {
  console.log("Eligible");
}
```

Output:

```text
Eligible
```

---

# 1. `if`

Use `if` when you want code to run only when a condition is truthy.

Syntax:

```js
if (condition) {
  // code
}
```

Example:

```js
const isLoggedIn = true;

if (isLoggedIn) {
  console.log("Show dashboard");
}
```

Output:

```text
Show dashboard
```

---

# 2. How `if` Works

JavaScript checks:

```text
condition
↓
truthy or falsy?
```

If truthy:

```text
run the block
```

If falsy:

```text
skip the block
```

Example:

```js
if (0) {
  console.log("Runs");
}
```

Nothing runs because:

```text
0
→ falsy
```

---

# 3. `if...else`

Use `else` when you want one block for true and another for false.

```js
const isLoggedIn = false;

if (isLoggedIn) {
  console.log("Dashboard");
} else {
  console.log("Login page");
}
```

Output:

```text
Login page
```

Flow:

```text
isLoggedIn?
│
├── true  → Dashboard
└── false → Login page
```

---

# 4. Real Application Example — Loading State

```js
const isLoading = true;

if (isLoading) {
  console.log("Loading...");
} else {
  console.log("Show data");
}
```

This same pattern appears constantly in UI code.

---

# 5. `else if`

Use `else if` when there are multiple conditions.

Example:

```js
const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("D");
}
```

Output:

```text
B
```

---

# 6. Important — First Matching Condition Wins 🔥🔥

JavaScript stops after the first matching condition.

Consider:

```js
const score = 95;

if (score >= 80) {
  console.log("B");
} else if (score >= 90) {
  console.log("A");
}
```

Output:

```text
B
```

Even though `95 >= 90` is also true.

Why?

The first condition:

```text
score >= 80
```

already matched.

JavaScript does not continue to the next `else if`.

So order matters.

---

# 7. Correct Condition Order

Better:

```js
const score = 95;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
```

Output:

```text
A
```

Practical rule:

```text
Put more specific / stricter conditions first.
```

---

# 8. Conditions With Comparison Operators

```js
const salary = 80000;

if (salary >= 50000) {
  console.log("Eligible");
}
```

Here:

```text
salary >= 50000
```

returns:

```text
true
or
false
```

Then `if` uses that result.

---

# 9. Conditions With `&&` 🔥🔥🔥

Use `&&` when all required conditions must be truthy.

```js
const isLoggedIn = true;
const isAdmin = true;

if (isLoggedIn && isAdmin) {
  console.log("Admin access");
}
```

Output:

```text
Admin access
```

Mental model:

```text
logged in?
AND
admin?
↓
both must pass
```

---

# 10. Real Permission Example

```js
const user = {
  isLoggedIn: true,
  role: "admin",
  isActive: true,
};

if (
  user.isLoggedIn &&
  user.role === "admin" &&
  user.isActive
) {
  console.log("Allow admin access");
}
```

This is common business-rule code.

---

# 11. Conditions With `||`

Use `||` when any one condition is enough.

```js
const role = "manager";

if (role === "admin" || role === "manager") {
  console.log("Can view reports");
}
```

Output:

```text
Can view reports
```

---

# 12. Conditions With `!`

Use `!` when you want the opposite.

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

---

# 13. Truthy / Falsy Conditions 🔥🔥🔥

You do not always need:

```js
if (name !== "") {
}
```

You can often write:

```js
if (name) {
}
```

Example:

```js
const name = "Rahul";

if (name) {
  console.log("Name exists");
}
```

Output:

```text
Name exists
```

Because:

```text
"Rahul"
→ truthy
```

---

# 14. Practical Empty-Value Check

```js
const email = "";

if (!email) {
  console.log("Email is required");
}
```

Output:

```text
Email is required
```

Because:

```text
""
→ falsy
```

---

# 15. Be Careful With `0` 🔥🔥

Suppose:

```js
const count = 0;

if (!count) {
  console.log("Count missing");
}
```

Output:

```text
Count missing
```

But maybe `0` is a valid count.

So don't automatically use truthy/falsy checks when `0`, `false`, or `""` can be valid values.

Better when needed:

```js
if (count === null || count === undefined) {
  console.log("Count missing");
}
```

Or:

```js
if (count == null) {
  console.log("Count missing");
}
```

The second version intentionally uses loose equality because:

```text
value == null
```

matches only:

```text
null
undefined
```

For normal comparisons, still prefer `===`.

---

# 16. Nested `if`

You can place one condition inside another.

```js
const isLoggedIn = true;
const role = "admin";

if (isLoggedIn) {
  if (role === "admin") {
    console.log("Admin dashboard");
  }
}
```

Output:

```text
Admin dashboard
```

---

# 17. Nested Conditions Can Become Hard to Read

Example:

```js
if (user) {
  if (user.isActive) {
    if (user.role === "admin") {
      if (user.hasPermission) {
        console.log("Allowed");
      }
    }
  }
}
```

This works, but it creates:

```text
deep nesting
harder debugging
harder reading
harder interview explanation
```

A better approach is often:

```text
Guard Clauses
```

---

# 18. Guard Clauses 🔥🔥🔥

A guard clause exits early when something is invalid.

Example:

```js
function accessDashboard(user) {
  if (!user) {
    return "No user";
  }

  if (!user.isActive) {
    return "Inactive user";
  }

  if (user.role !== "admin") {
    return "Access denied";
  }

  return "Admin dashboard";
}
```

This is much easier to read.

---

# 19. Why Guard Clauses Are Good

Compare:

```text
nested conditions
↓
more indentation
↓
harder mental tracking
```

with:

```text
guard clauses
↓
reject invalid cases early
↓
main success path stays simple
```

This style is excellent for:

```text
machine coding
API validation
forms
permissions
business rules
senior interviews
```

---

# 20. Real Form Validation With Guard Clauses 🔥🔥🔥

```js
function validateEmployee(employee) {
  if (!employee.name) {
    return "Name is required";
  }

  if (!employee.email) {
    return "Email is required";
  }

  if (employee.salary <= 0) {
    return "Salary must be greater than 0";
  }

  return "Valid employee";
}
```

Usage:

```js
const employee = {
  name: "Rahul",
  email: "",
  salary: 50000,
};

console.log(validateEmployee(employee));
```

Output:

```text
Email is required
```

---

# 21. `switch` Statement 🔥🔥

`switch` is useful when one value is compared against several exact cases.

Syntax:

```js
switch (value) {
  case value1:
    // code
    break;

  case value2:
    // code
    break;

  default:
    // fallback
}
```

---

# 22. Simple `switch` Example

```js
const role = "admin";

switch (role) {
  case "admin":
    console.log("Admin dashboard");
    break;

  case "manager":
    console.log("Manager dashboard");
    break;

  case "employee":
    console.log("Employee dashboard");
    break;

  default:
    console.log("Unknown role");
}
```

Output:

```text
Admin dashboard
```

---

# 23. Why `break` Is Important 🔥🔥🔥

Consider:

```js
const role = "admin";

switch (role) {
  case "admin":
    console.log("Admin");

  case "manager":
    console.log("Manager");

  default:
    console.log("Default");
}
```

Output:

```text
Admin
Manager
Default
```

Why?

Because without `break`, JavaScript continues into the next cases.

This is called:

```text
fall-through
```

---

# 24. Correct `switch`

```js
switch (role) {
  case "admin":
    console.log("Admin");
    break;

  case "manager":
    console.log("Manager");
    break;

  default:
    console.log("Default");
}
```

Now only the matching case executes.

---

# 25. Intentional Fall-Through

Sometimes multiple cases should do the same thing.

```js
const role = "manager";

switch (role) {
  case "admin":
  case "manager":
    console.log("Can view reports");
    break;

  default:
    console.log("No report access");
}
```

Output:

```text
Can view reports
```

This is intentional fall-through.

---

# 26. `switch` Uses Strict Matching 🔥🔥

`switch` compares cases similarly to strict equality.

Example:

```js
const value = 10;

switch (value) {
  case "10":
    console.log("String");
    break;

  case 10:
    console.log("Number");
    break;
}
```

Output:

```text
Number
```

Because:

```text
10 !== "10"
```

---

# 27. `if/else` vs `switch`

Use `if/else` when:

```text
ranges are involved
multiple different conditions
logical operators are involved
complex business rules
```

Example:

```js
if (salary >= 100000) {
}
```

Use `switch` when:

```text
one value
is compared against
multiple exact values
```

Example:

```js
switch (status) {
  case "pending":
  case "approved":
  case "rejected":
}
```

---

# 28. Real `switch` Example — API Status

```js
const status = "pending";

switch (status) {
  case "pending":
    console.log("Waiting for approval");
    break;

  case "approved":
    console.log("Request approved");
    break;

  case "rejected":
    console.log("Request rejected");
    break;

  default:
    console.log("Unknown status");
}
```

---

# 29. Ternary Operator 🔥🔥🔥

We covered the operator syntax already:

```js
condition ? valueIfTrue : valueIfFalse
```

Example:

```js
const isActive = true;

const label = isActive
  ? "Active"
  : "Inactive";

console.log(label);
```

Output:

```text
Active
```

---

# 30. When Ternary Is Good

Use ternary for:

```text
small value selection
simple UI labels
simple assignments
short conditional rendering
```

Example:

```js
const buttonText =
  isEditing ? "Update" : "Create";
```

Clean and readable.

---

# 31. When Ternary Is Bad

Avoid complicated nested ternaries.

Bad:

```js
const result =
  score >= 90
    ? "A"
    : score >= 80
    ? "B"
    : score >= 70
    ? "C"
    : "D";
```

It works, but readability suffers.

For several branches:

```text
if / else if
```

is usually clearer.

---

# 32. Real Machine-Coding Example — Search

Suppose:

```js
const searchTerm = "rahul";
const employeeName = "Rahul Sharma";
```

Condition:

```js
if (
  employeeName
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
) {
  console.log("Match");
}
```

Output:

```text
Match
```

Conditions often combine with string methods like this.

---

# 33. Real Machine-Coding Example — Filter

```js
const employees = [
  { name: "Rahul", department: "UI", active: true },
  { name: "Amit", department: "API", active: false },
  { name: "John", department: "UI", active: true },
];

const result = employees.filter((employee) => {
  return (
    employee.department === "UI" &&
    employee.active
  );
});

console.log(result);
```

Condition:

```text
department must be UI
AND
employee must be active
```

This is practical conditional logic inside array methods.

---

# 34. Real Machine-Coding Example — Optional Filter

Suppose the user may or may not select a department.

```js
const selectedDepartment = "UI";
```

You can write:

```js
const result = employees.filter((employee) => {
  if (
    selectedDepartment &&
    employee.department !== selectedDepartment
  ) {
    return false;
  }

  return true;
});
```

This is a simple guard-style filter pattern.

---

# 35. Better Combined Filter Example 🔥🔥

```js
const searchTerm = "ra";
const selectedDepartment = "UI";

const filteredEmployees = employees.filter((employee) => {
  const matchesSearch =
    employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesDepartment =
    !selectedDepartment ||
    employee.department === selectedDepartment;

  return matchesSearch && matchesDepartment;
});
```

This is strong machine-coding style because each condition has a clear name.

---

# 36. Named Conditions Improve Readability 🔥🔥🔥

Instead of:

```js
if (
  user &&
  user.active &&
  user.role === "admin" &&
  user.permissions?.includes("edit")
) {
}
```

You can write:

```js
const isActiveAdmin =
  user?.active &&
  user.role === "admin";

const canEdit =
  user?.permissions?.includes("edit");

if (isActiveAdmin && canEdit) {
  console.log("Allowed");
}
```

This makes code easier to:

```text
read
debug
test
explain in interview
```

---

# 37. Range Conditions 🔥🔥

Suppose salary must be between:

```text
50000 and 100000
```

Use:

```js
const salary = 75000;

if (salary >= 50000 && salary <= 100000) {
  console.log("Within range");
}
```

Output:

```text
Within range
```

JavaScript does not support this Python-style syntax:

```js
50000 <= salary <= 100000;
```

Do not use that.

---

# 38. Important Range Trap 🔥🔥🔥

This looks logical:

```js
console.log(10 < 20 < 30);
```

It returns:

```text
true
```

But this is not proper range checking.

JavaScript evaluates:

```text
10 < 20
↓
true
```

Then:

```text
true < 30
```

`true` becomes:

```text
1
```

So:

```text
1 < 30
→ true
```

For proper range checks, always use:

```js
value > min && value < max;
```

---

# 39. Another Range Trap

```js
console.log(30 > 20 > 10);
```

You may expect:

```text
true
```

But output is:

```text
false
```

Why?

First:

```text
30 > 20
→ true
```

Then:

```text
true > 10
```

`true` becomes:

```text
1
```

So:

```text
1 > 10
→ false
```

🔥 Good interview output question.

---

# 40. Conditions With Optional Chaining

Suppose:

```js
const employee = {
  manager: null,
};
```

You can safely write:

```js
if (employee.manager?.name) {
  console.log("Manager exists");
}
```

No crash occurs.

---

# 41. Conditions With Nullish Values

Suppose:

```js
const count = 0;
```

Don't write:

```js
if (!count) {
  console.log("Missing");
}
```

if `0` is valid.

Instead:

```js
if (count === null || count === undefined) {
  console.log("Missing");
}
```

This checks actual absence instead of falsiness.

---

# 42. Practical API Response Handling 🔥🔥🔥

Suppose:

```js
const response = {
  ok: true,
  data: [],
};
```

You can write:

```js
if (!response.ok) {
  console.log("Request failed");
} else if (response.data.length === 0) {
  console.log("No employees found");
} else {
  console.log("Show employees");
}
```

This models:

```text
error state
empty state
success state
```

Exactly what you do in real applications.

---

# 43. Practical Function Validation

```js
function calculateBonus(employee) {
  if (!employee) {
    return 0;
  }

  if (!employee.active) {
    return 0;
  }

  if (employee.salary < 50000) {
    return 0;
  }

  return employee.salary * 0.1;
}
```

Notice the guard clauses.

The successful logic remains simple:

```js
return employee.salary * 0.1;
```

---

# 44. Interview Output 1 🔥

Predict:

```js
const value = 10;

if (value) {
  console.log("A");
} else {
  console.log("B");
}
```

Output:

```text
A
```

Because:

```text
10
→ truthy
```

---

# 45. Interview Output 2

```js
const value = 0;

if (value) {
  console.log("A");
} else {
  console.log("B");
}
```

Output:

```text
B
```

Because:

```text
0
→ falsy
```

---

# 46. Interview Output 3 🔥🔥

```js
const value = "false";

if (value) {
  console.log("A");
} else {
  console.log("B");
}
```

Output:

```text
A
```

Because:

```text
"false"
```

is a non-empty string.

Therefore it is truthy.

---

# 47. Interview Output 4

```js
if ([]) {
  console.log("Array is truthy");
}
```

Output:

```text
Array is truthy
```

Empty arrays are truthy.

---

# 48. Interview Output 5

```js
if ({}) {
  console.log("Object is truthy");
}
```

Output:

```text
Object is truthy
```

Empty objects are truthy.

---

# 49. Interview Output 6 🔥🔥

```js
const score = 95;

if (score >= 80) {
  console.log("B");
} else if (score >= 90) {
  console.log("A");
}
```

Output:

```text
B
```

Reason:

```text
first matching condition wins
```

---

# 50. Interview Output 7 — `switch` Fall-Through 🔥🔥

```js
const value = 1;

switch (value) {
  case 1:
    console.log("One");

  case 2:
    console.log("Two");

  default:
    console.log("Default");
}
```

Output:

```text
One
Two
Default
```

Because there are no `break` statements.

---

# 51. Interview Output 8 — Strict `switch`

```js
const value = "1";

switch (value) {
  case 1:
    console.log("Number");
    break;

  case "1":
    console.log("String");
    break;
}
```

Output:

```text
String
```

Because switch matching is strict.

---

# 52. Interview Output 9 — Nested Condition

```js
const a = true;
const b = false;

if (a) {
  if (b) {
    console.log("A");
  } else {
    console.log("B");
  }
}
```

Output:

```text
B
```

---

# 53. Interview Question — `if` vs `switch`

Good answer:

> Use `if/else` for ranges, complex expressions, and multiple logical conditions. Use `switch` when one value is compared against multiple exact cases.

---

# 54. Interview Question — Why Use Guard Clauses?

Good answer:

> Guard clauses handle invalid or exceptional cases early, reduce nesting, and keep the main success path easier to read.

Example:

```js
if (!user) return;
if (!user.active) return;

// main logic
```

---

# 55. Interview Question — What Does `if` Actually Check?

Good answer:

> `if` converts the condition to a boolean using JavaScript truthy/falsy rules.

Example:

```js
if ("Rahul") {
}
```

runs because a non-empty string is truthy.

---

# 56. Interview Question — Is `switch` Better Than `if/else`?

No.

They solve different readability problems.

Use whichever expresses the logic more clearly.

```text
Ranges / complex conditions
→ if / else

Exact discrete values
→ switch
```

---

# 57. Debugging Problem 🔥🔥🔥

Suppose:

```js
const employeeCount = 0;

if (!employeeCount) {
  console.log("Employee count missing");
}
```

Output:

```text
Employee count missing
```

But `0` may simply mean:

```text
There are currently zero employees.
```

Bug:

```text
falsy check is too broad
```

Fix when checking absence:

```js
if (
  employeeCount === null ||
  employeeCount === undefined
) {
  console.log("Employee count missing");
}
```

---

# 58. Debugging Problem — Wrong Order

Bad:

```js
const salary = 120000;

if (salary >= 50000) {
  console.log("Medium");
} else if (salary >= 100000) {
  console.log("High");
}
```

Output:

```text
Medium
```

Wrong business result.

Fix:

```js
if (salary >= 100000) {
  console.log("High");
} else if (salary >= 50000) {
  console.log("Medium");
}
```

Output:

```text
High
```

---

# 59. Debugging Problem — Too Much Nesting

Bad:

```js
function processUser(user) {
  if (user) {
    if (user.active) {
      if (user.email) {
        return "Process user";
      }
    }
  }

  return "Invalid user";
}
```

Better:

```js
function processUser(user) {
  if (!user) {
    return "Invalid user";
  }

  if (!user.active) {
    return "Invalid user";
  }

  if (!user.email) {
    return "Invalid user";
  }

  return "Process user";
}
```

Even better if the message is the same:

```js
function processUser(user) {
  if (!user || !user.active || !user.email) {
    return "Invalid user";
  }

  return "Process user";
}
```

Choose whichever is clearest.

---

# 60. Machine-Coding Pattern — Validation 🔥🔥🔥

A strong machine-coding function often looks like:

```js
function validateForm(form) {
  if (!form.name?.trim()) {
    return "Name is required";
  }

  if (!form.email?.trim()) {
    return "Email is required";
  }

  if (
    form.salary === null ||
    form.salary === undefined
  ) {
    return "Salary is required";
  }

  if (form.salary <= 0) {
    return "Salary must be positive";
  }

  return null;
}
```

Usage:

```js
const error = validateForm(form);

if (error) {
  console.log(error);
  return;
}

// submit
```

This is clean practical conditional design.

---

# 61. Machine-Coding Pattern — API State

```js
function getMessage({
  loading,
  error,
  employees,
}) {
  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Something went wrong";
  }

  if (!employees?.length) {
    return "No employees found";
  }

  return "Employees loaded";
}
```

The order matters:

```text
loading
↓
error
↓
empty
↓
success
```

---

# 62. Machine-Coding Pattern — Role Access

```js
function canEditEmployee(user) {
  if (!user?.isLoggedIn) {
    return false;
  }

  if (!user.isActive) {
    return false;
  }

  return (
    user.role === "admin" ||
    user.role === "manager"
  );
}
```

This is much cleaner than deeply nested logic.

---

# 63. Machine-Coding Rule 🔥🔥🔥

When writing conditions:

```text
1. Handle invalid cases early
2. Keep the happy path simple
3. Name complex conditions
4. Avoid unnecessary nesting
5. Use strict equality
6. Be careful with 0 / false / ""
7. Put stricter else-if conditions first
8. Use switch for exact discrete values
9. Use ternary only for simple expressions
10. Optimize for readability
```

---

# Quick Memory 🧠

```text
if
→ run when condition is truthy
```

```text
if / else
→ choose between two paths
```

```text
else if
→ multiple conditions
→ first matching condition wins
```

```text
switch
→ one value
→ multiple exact cases
→ remember break
```

```text
ternary
→ simple value selection
```

```text
guard clause
→ reject invalid cases early
→ reduce nesting
```

Important:

```text
0
""
false
null
undefined
NaN
→ falsy
```

But:

```text
"false"
"0"
[]
{}
→ truthy
```

Range:

```js
value >= min && value <= max;
```

Don't write:

```js
min <= value <= max;
```

Practical rule:

```text
Readable condition
>
clever condition
```

## ✅ 6.5 Conditions complete

**Next: 6.6 Loops 🔥🔥**
