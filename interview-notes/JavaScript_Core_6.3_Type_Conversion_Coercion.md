# 6.3 Type Conversion / Coercion 🔥🔥🔥

This topic is very important for:

```text
JavaScript interviews
output questions
form handling
API data
comparisons
debugging
machine coding
```

The main thing you need to understand is:

```text
Type Conversion
→ we convert the value intentionally

Type Coercion
→ JavaScript converts the value automatically
```

---

# 1. What is Type Conversion?

Type conversion means:

> We manually convert one data type into another data type.

Example:

```js
const age = "30";

const convertedAge = Number(age);

console.log(convertedAge);
```

Output:

```text
30
```

Now check:

```js
console.log(typeof convertedAge);
```

Output:

```text
number
```

So:

```text
"30"
 ↓
Number()
 ↓
30
```

This is also called:

```text
Explicit Conversion
```

because **we explicitly told JavaScript to convert it**.

---

# 2. What is Type Coercion?

Type coercion means:

> JavaScript automatically converts a value from one type to another.

Example:

```js
console.log("10" + 5);
```

Output:

```text
105
```

Why?

Because with `+`:

```text
"10" + 5
```

JavaScript converts:

```text
5
↓
"5"
```

Then:

```text
"10" + "5"
↓
"105"
```

We did not manually convert anything.

JavaScript did it automatically.

That is:

```text
Implicit Coercion
```

---

# 3. Explicit vs Implicit

Easy memory:

```text
Explicit
→ Developer converts

Implicit
→ JavaScript converts
```

Example explicit:

```js
Number("100");
```

Example implicit:

```js
"100" * 2;
```

JavaScript converts `"100"` into `100` automatically.

Output:

```text
200
```

---

# 4. Convert to String

Use:

```js
String(value);
```

Example:

```js
const employeeId = 101;

const id = String(employeeId);

console.log(id);
console.log(typeof id);
```

Output:

```text
101
string
```

Flow:

```text
101
 ↓
String()
 ↓
"101"
```

---

# 5. Another way — `.toString()`

Example:

```js
const salary = 50000;

console.log(salary.toString());
```

Output:

```text
50000
```

Type:

```text
string
```

But for general conversion, this is safer:

```js
String(value);
```

Why?

Because:

```js
String(null);
```

works.

Output:

```text
"null"
```

But:

```js
null.toString();
```

❌ Error.

So for practical code:

```text
String(value)
```

is usually the safer general conversion.

---

# 6. String conversion examples

```js
console.log(String(100));
console.log(String(true));
console.log(String(false));
console.log(String(null));
console.log(String(undefined));
```

Outputs:

```text
"100"
"true"
"false"
"null"
"undefined"
```

---

# 7. Convert to Number 🔥🔥🔥

Use:

```js
Number(value);
```

Example:

```js
const salary = "50000";

const convertedSalary = Number(salary);

console.log(convertedSalary);
```

Output:

```text
50000
```

Type:

```text
number
```

---

# 8. Real API example 🔥🔥🔥

Suppose API or form data gives:

```js
const employee = {
  name: "Rahul",
  salary: "50000",
};
```

Notice:

```text
salary
→ string
```

If you do:

```js
console.log(employee.salary + 10000);
```

Output:

```text
5000010000
```

Wrong for salary calculation.

Why?

Because:

```text
"50000" + 10000
```

becomes string concatenation.

Correct:

```js
const salary = Number(employee.salary);

console.log(salary + 10000);
```

Output:

```text
60000
```

🔥 This is a very real machine-coding problem.

Form inputs commonly give values as strings.

---

# 9. `Number()` conversions

Look at these carefully:

```js
console.log(Number("100"));
console.log(Number("10.5"));
console.log(Number(""));
console.log(Number(" "));
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
console.log(Number(undefined));
console.log(Number("hello"));
```

Outputs:

```text
100
10.5
0
0
1
0
0
NaN
NaN
```

Important ones:

```text
Number(true)
→ 1

Number(false)
→ 0

Number(null)
→ 0

Number(undefined)
→ NaN

Number("hello")
→ NaN
```

---

# 10. `parseInt()` 🔥

`parseInt()` converts a string into an integer.

Example:

```js
console.log(parseInt("100"));
```

Output:

```text
100
```

Example:

```js
console.log(parseInt("10.75"));
```

Output:

```text
10
```

It removes the decimal part.

---

# 11. `parseFloat()`

Used when decimal values are needed.

```js
console.log(parseFloat("10.75"));
```

Output:

```text
10.75
```

So:

```text
parseInt()
→ integer

parseFloat()
→ decimal number
```

---

# 12. `Number()` vs `parseInt()` 🔥🔥

This is important.

Consider:

```js
console.log(Number("100px"));
```

Output:

```text
NaN
```

But:

```js
console.log(parseInt("100px"));
```

Output:

```text
100
```

Why?

`Number()` expects the whole string to represent a valid number.

```text
"100px"
```

is not a valid number.

But `parseInt()` starts reading from the beginning:

```text
100px
^^^
```

It gets:

```text
100
```

and stops when it reaches:

```text
p
```

---

# 13. Important `parseInt()` behavior

```js
console.log(parseInt("50abc"));
```

Output:

```text
50
```

But:

```js
console.log(parseInt("abc50"));
```

Output:

```text
NaN
```

Because parsing must start with something numeric.

---

# 14. Practical use of `parseInt()`

Suppose CSS-like data gives:

```js
const width = "300px";
```

You need the numeric part:

```js
const numericWidth = parseInt(width);

console.log(numericWidth);
```

Output:

```text
300
```

---

# 15. Convert to Boolean 🔥🔥🔥

Use:

```js
Boolean(value);
```

Example:

```js
console.log(Boolean(1));
```

Output:

```text
true
```

Example:

```js
console.log(Boolean(0));
```

Output:

```text
false
```

This leads to a very important JavaScript concept:

```text
Truthy
Falsy
```

---

# 16. Falsy Values 🔥🔥🔥

There are only a small number of common falsy values you need to remember:

```text
false
0
-0
0n
""
null
undefined
NaN
```

These become:

```text
false
```

when converted to Boolean.

Examples:

```js
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

All output:

```text
false
```

---

# 17. Truthy Values

Almost everything else is truthy.

Examples:

```js
console.log(Boolean("hello"));
console.log(Boolean("false"));
console.log(Boolean("0"));
console.log(Boolean(1));
console.log(Boolean(-10));
console.log(Boolean([]));
console.log(Boolean({}));
```

All output:

```text
true
```

🔥 Important interview traps:

```text
"false"
→ true

"0"
→ true

[]
→ true

{}
→ true
```

Why?

Because they are not among the falsy values.

---

# 18. Practical truthy / falsy example

```js
const employeeName = "";

if (employeeName) {
  console.log("Employee exists");
} else {
  console.log("Employee name missing");
}
```

Output:

```text
Employee name missing
```

Because:

```text
""
→ falsy
```

---

# 19. Real form validation example

```js
const email = "";

if (!email) {
  console.log("Email is required");
}
```

Here:

```text
email = ""
```

`""` is falsy.

So:

```text
!email
```

becomes:

```text
true
```

and validation runs.

---

# 20. Double NOT `!!` 🔥

You may see:

```js
!!value
```

This converts a value into a Boolean.

Example:

```js
console.log(!!"Rahul");
```

Output:

```text
true
```

Why?

First:

```text
!"Rahul"
```

Truthy becomes:

```text
false
```

Then:

```text
!false
```

becomes:

```text
true
```

So:

```js
!!value
```

is basically a shorter version of:

```js
Boolean(value);
```

---

# 21. `+` operator is special 🔥🔥🔥

This causes many interview questions.

The `+` operator can do:

```text
addition
or
string concatenation
```

Example:

```js
console.log(10 + 20);
```

Output:

```text
30
```

Both are numbers.

But:

```js
console.log("10" + 20);
```

Output:

```text
1020
```

Because one value is a string.

---

# 22. More `+` coercion examples

```js
console.log(10 + "20");
```

Output:

```text
1020
```

```js
console.log("10" + 20 + 30);
```

Let's execute from left to right:

```text
"10" + 20
↓
"1020"
```

Then:

```text
"1020" + 30
↓
"102030"
```

Output:

```text
102030
```

---

# 23. Very important output question 🔥🔥🔥

```js
console.log(10 + 20 + "30");
```

JavaScript evaluates left to right.

First:

```text
10 + 20
↓
30
```

Then:

```text
30 + "30"
↓
"3030"
```

Output:

```text
3030
```

Compare:

```js
console.log("10" + 20 + 30);
```

Output:

```text
102030
```

🔥 Classic interview question.

---

# 24. `-` behaves differently 🔥🔥

Consider:

```js
console.log("10" - 5);
```

Output:

```text
5
```

Why doesn't it become a string?

Because `-` cannot perform string concatenation.

JavaScript tries to convert:

```text
"10"
↓
10
```

Then:

```text
10 - 5
↓
5
```

---

# 25. Same with `*` and `/`

```js
console.log("10" * 2);
```

Output:

```text
20
```

```js
console.log("10" / 2);
```

Output:

```text
5
```

So easy mental rule:

```text
+
→ may concatenate strings

-, *, /
→ usually try numeric conversion
```

---

# 26. Practical output questions

Predict:

```js
console.log("5" + 2);
```

Output:

```text
52
```

---

Predict:

```js
console.log("5" - 2);
```

Output:

```text
3
```

---

Predict:

```js
console.log("5" * "2");
```

Output:

```text
10
```

---

Predict:

```js
console.log("hello" * 2);
```

Output:

```text
NaN
```

---

# 27. Equality — `==` vs `===` 🔥🔥🔥

This is one of the most important JavaScript interview topics.

`==` means:

```text
Loose Equality
```

It allows type coercion.

Example:

```js
console.log(5 == "5");
```

Output:

```text
true
```

Why?

JavaScript converts:

```text
"5"
↓
5
```

Then compares:

```text
5 == 5
```

So:

```text
true
```

---

# 28. Strict Equality `===`

`===` checks:

```text
value
+
type
```

Example:

```js
console.log(5 === "5");
```

Output:

```text
false
```

Because:

```text
5
→ number

"5"
→ string
```

Different types.

---

# 29. Practical rule 🔥🔥🔥

In normal application code:

```text
Prefer ===
```

and:

```text
Prefer !==
```

Why?

Because implicit conversion with `==` can create surprising results.

---

# 30. Important `==` interview outputs

```js
console.log(0 == false);
```

Output:

```text
true
```

Because:

```text
false
↓
0
```

---

```js
console.log("" == false);
```

Output:

```text
true
```

because both can coerce to:

```text
0
```

---

```js
console.log(null == undefined);
```

Output:

```text
true
```

This is a special loose equality rule.

But:

```js
console.log(null === undefined);
```

Output:

```text
false
```

because they are different types.

---

# 31. Strict equality examples

```js
console.log(0 === false);
```

Output:

```text
false
```

```js
console.log("" === false);
```

Output:

```text
false
```

```js
console.log(null === undefined);
```

Output:

```text
false
```

Much easier to reason about.

---

# 32. `!=` vs `!==`

Same idea.

```js
console.log(5 != "5");
```

Output:

```text
false
```

because loose comparison considers them equal.

But:

```js
console.log(5 !== "5");
```

Output:

```text
true
```

because their types differ.

---

# 33. Unary `+` conversion

You may see:

```js
const value = +"100";
```

This converts the string to a number.

```js
console.log(value);
```

Output:

```text
100
```

Type:

```text
number
```

So:

```js
+"100"
```

is similar to:

```js
Number("100");
```

But for readable application code:

```js
Number(value)
```

is usually clearer.

---

# 34. Real machine-coding example — Form values 🔥🔥🔥

Suppose:

```js
const formData = {
  name: "Rahul",
  salary: "50000",
  experience: "10",
};
```

HTML/form inputs commonly provide strings.

Wrong:

```js
const newSalary = formData.salary + 5000;

console.log(newSalary);
```

Output:

```text
500005000
```

Correct:

```js
const salary = Number(formData.salary);

const newSalary = salary + 5000;

console.log(newSalary);
```

Output:

```text
55000
```

This is a practical reason to understand type conversion.

---

# 35. Real API transformation

Suppose API returns:

```js
const employees = [
  {
    id: "1",
    name: "Rahul",
    salary: "50000",
  },
  {
    id: "2",
    name: "Amit",
    salary: "60000",
  },
];
```

You may normalize the data:

```js
const normalizedEmployees = employees.map((employee) => ({
  ...employee,
  id: Number(employee.id),
  salary: Number(employee.salary),
}));
```

Now:

```text
id
→ number

salary
→ number
```

This is a real data-transformation pattern.

---

# 36. `Boolean("false")` interview trap 🔥🔥🔥

Predict:

```js
console.log(Boolean("false"));
```

Output:

```text
true
```

Why?

Because `"false"` is a non-empty string.

Any non-empty string is truthy.

Same:

```js
Boolean("0");
```

Output:

```text
true
```

---

# 37. Empty arrays and objects are truthy 🔥🔥

Predict:

```js
if ([]) {
  console.log("Runs");
}
```

Output:

```text
Runs
```

And:

```js
if ({}) {
  console.log("Runs");
}
```

Output:

```text
Runs
```

Because:

```text
[]
{}
```

are truthy values.

This surprises many developers.

---

# 38. Empty array comparison trap — awareness

You may encounter weird questions such as:

```js
console.log([] == false);
```

This evaluates to:

```text
true
```

because loose equality performs multiple coercion steps.

But do not spend your preparation memorizing dozens of bizarre coercion puzzles.

The practical lesson is:

```text
Use ===
Use explicit conversion
Avoid relying on complicated implicit coercion
```

That is far more useful for real coding and senior interviews.

---

# 39. `Number.isNaN()` practical 🔥

When converting external input:

```js
const salary = Number("hello");
```

Result:

```text
NaN
```

Validate:

```js
if (Number.isNaN(salary)) {
  console.log("Invalid salary");
}
```

This is useful for:

```text
forms
query parameters
API data
user input
```

---

# 40. Real validation example

```js
const input = "50000";

const salary = Number(input);

if (Number.isNaN(salary)) {
  console.log("Invalid salary");
} else {
  console.log("Valid salary:", salary);
}
```

Output:

```text
Valid salary: 50000
```

---

# 41. Interview question — What is type coercion?

Good answer:

> Type coercion is JavaScript automatically converting a value from one type to another while evaluating an operation or comparison.

Example:

```js
"10" - 5
```

JavaScript converts `"10"` to `10`.

Result:

```text
5
```

---

# 42. Interview question — Explicit vs implicit conversion?

```text
Explicit Conversion
→ developer manually converts

Example:
Number("100")


Implicit Coercion
→ JavaScript automatically converts

Example:
"100" * 2
```

---

# 43. Interview question — `==` vs `===`

Good answer:

```text
==
→ loose equality
→ allows type coercion


===
→ strict equality
→ compares without type coercion
→ value and type must match
```

In application code:

```text
Prefer ===
```

---

# 44. Interview output set 🔥🔥🔥

Predict these:

```js
console.log("10" + 5);
console.log("10" - 5);
console.log("10" * 2);
console.log("10" / 2);
```

Outputs:

```text
105
5
20
5
```

---

Predict:

```js
console.log(10 + 20 + "30");
```

Output:

```text
3030
```

---

Predict:

```js
console.log("10" + 20 + 30);
```

Output:

```text
102030
```

---

Predict:

```js
console.log(5 == "5");
console.log(5 === "5");
```

Output:

```text
true
false
```

---

Predict:

```js
console.log(Boolean(""));
console.log(Boolean(" "));
```

Outputs:

```text
false
true
```

Why?

```text
"" 
→ empty string
→ falsy


" "
→ contains a space
→ non-empty string
→ truthy
```

🔥 Good interview trap.

---

# 45. Practical debugging problem 🔥🔥

Suppose:

```js
const quantity = "2";
const price = 1000;

const total = quantity + price;

console.log(total);
```

Output:

```text
21000
```

Bug:

```text
quantity is a string
```

Fix:

```js
const total = Number(quantity) * price;
```

Output:

```text
2000
```

This is the kind of type bug you should immediately notice during machine coding.

---

# 46. Practical safe conversion pattern

When input should be numeric:

```js
const value = Number(input);

if (Number.isNaN(value)) {
  // handle invalid input
}
```

Example:

```js
function parseSalary(input) {
  const salary = Number(input);

  if (Number.isNaN(salary)) {
    return null;
  }

  return salary;
}
```

Usage:

```js
console.log(parseSalary("50000"));
```

Output:

```text
50000
```

---

# 47. What should you actually memorize?

Do NOT memorize hundreds of weird coercion combinations.

Master these:

```text
String()
Number()
Boolean()
parseInt()
parseFloat()

Truthy / Falsy

+ with strings
- / * / numeric coercion

== vs ===

NaN handling
```

These cover the majority of practical and interview use cases.

---

# 48. Machine-coding rules 🔥🔥🔥

When working with:

```text
forms
API responses
URL parameters
localStorage
query strings
```

never blindly assume the type.

Example:

```js
const page = Number(searchParams.get("page"));
```

Or:

```js
const salary = Number(formData.salary);
```

Then validate when necessary:

```js
if (Number.isNaN(salary)) {
  // invalid salary
}
```

And for comparisons:

```js
id === selectedId
```

Prefer strict equality unless you have a deliberate reason to coerce.

---

# Quick Memory 🧠

```text
TYPE CONVERSION
→ developer converts manually

String()
Number()
Boolean()
parseInt()
parseFloat()
```

```text
TYPE COERCION
→ JavaScript converts automatically
```

Important:

```text
"10" + 5
→ "105"

"10" - 5
→ 5

"10" * 2
→ 20
```

Falsy values:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Remember:

```text
"false" → truthy
"0"     → truthy
" "     → truthy
[]      → truthy
{}      → truthy
```

Equality:

```text
5 == "5"
→ true

5 === "5"
→ false
```

Practical rule:

```text
Prefer explicit conversion
Prefer ===
Validate converted numeric input
Avoid depending on complex implicit coercion
```

## ✅ 6.3 Type Conversion / Coercion complete

**Next: 6.4 Operators 🔥🔥**
