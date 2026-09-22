# 6.2 Data Types 🔥🔥🔥

JavaScript data types are very important because they affect:

```text id="0gbha3"
comparison
type conversion
functions
arrays
objects
API data
bugs
output questions
```

We’ll learn only what you actually need for coding and interviews.

---

# 1. What is a data type?

A data type tells JavaScript:

> What kind of value is stored here?

Example:

```js id="1gyn06"
const name = "Rahul";
const age = 30;
const isActive = true;
```

These values are different types:

```text id="tv6b8x"
"Rahul" → string
30      → number
true    → boolean
```

---

# 2. JavaScript data types are mainly 2 groups

```text id="x3dorx"
1. Primitive Types
2. Reference Types
```

Very important.

```text id="hfmx1y"
DATA TYPES
│
├── Primitive
│   ├── string
│   ├── number
│   ├── boolean
│   ├── undefined
│   ├── null
│   ├── bigint
│   └── symbol
│
└── Reference
    ├── Object
    ├── Array
    └── Function
```

We will understand reference behavior more deeply later.

---

# 3. String

A string represents text.

```js id="ud8wpx"
const name = "Rahul";
const city = "Hyderabad";
```

You can use:

```js id="m1rbyb"
"Rahul"
'Rahul'
`Rahul`
```

All are strings.

Check:

```js id="spd9is"
console.log(typeof name);
```

Output:

```text id="ltjhjx"
string
```

---

## Real example

```js id="qbuytv"
const employeeName = "Rahul Sharma";
const department = "Engineering";
```

Strings are heavily used for:

```text id="hcsakm"
names
emails
URLs
search terms
status
API data
form values
```

---

# 4. Number

JavaScript uses one main `number` type for normal numbers.

```js id="zqlx3d"
const age = 30;
const salary = 50000;
const rating = 4.5;
```

Check:

```js id="fzxhmd"
console.log(typeof salary);
```

Output:

```text id="29re08"
number
```

Both:

```js id="kxj93y"
10
10.5
```

are `number`.

---

# 5. Important number values

JavaScript also has:

```text id="yz70qt"
NaN
Infinity
-Infinity
```

Example:

```js id="ewb8g9"
console.log(10 / 0);
```

Output:

```text id="hnenlu"
Infinity
```

Example:

```js id="wdh0j5"
console.log("hello" * 10);
```

Output:

```text id="hwnl08"
NaN
```

`NaN` means:

```text id="uoxfjt"
Not a Number
```

But here comes an interview trap.

```js id="2ekzs9"
console.log(typeof NaN);
```

Output:

```text id="07zw46"
number
```

🔥 Remember:

```text id="ibtysd"
NaN is a special numeric value
```

---

# 6. Boolean

Boolean has only two values:

```js id="55p6sb"
true
false
```

Example:

```js id="qr1jrr"
const isLoggedIn = true;
const isAdmin = false;
```

Real application:

```js id="6fxw6r"
if (isLoggedIn) {
  console.log("Show dashboard");
}
```

Very common in:

```text id="ck38i8"
conditions
permissions
loading states
form validation
feature flags
```

---

# 7. Undefined 🔥

`undefined` usually means:

> A value has not been assigned.

Example:

```js id="q3opty"
let salary;

console.log(salary);
```

Output:

```text id="gqrm98"
undefined
```

And:

```js id="x0k5nt"
console.log(typeof salary);
```

Output:

```text id="1chiro"
undefined
```

---

## Another example

```js id="ag0zkg"
const employee = {
  name: "Rahul",
};

console.log(employee.salary);
```

Output:

```text id="0tu8g2"
undefined
```

Because:

```text id="5mtogh"
salary property does not exist
```

---

# 8. Null 🔥🔥

`null` means:

> Intentionally no value.

Example:

```js id="6zdo9s"
const selectedEmployee = null;
```

This might mean:

```text id="7rw3bs"
No employee selected yet
```

This is different from accidental missing data.

Think:

```text id="0p441y"
undefined
→ JavaScript / code does not currently have a value

null
→ developer intentionally says "no value"
```

---

# 9. `null` vs `undefined` 🔥🔥🔥

Example:

```js id="1qcm8v"
let user;

console.log(user);
```

Output:

```text id="dl9s98"
undefined
```

But:

```js id="5jf6gc"
let user = null;
```

means:

> I intentionally want `user` to have no value right now.

Real application:

```js id="5rjruk"
let selectedEmployee = null;
```

Later:

```js id="t34amx"
selectedEmployee = {
  id: 1,
  name: "Rahul",
};
```

Very common.

---

# 10. Weird interview question — `typeof null` 🔥🔥🔥

Run:

```js id="8tcm58"
console.log(typeof null);
```

Output:

```text id="r8gne0"
object
```

Yes.

This is a historical JavaScript behavior.

Do NOT think:

```text id="xnxxga"
null is actually an object
```

For practical coding:

```text id="efjrwy"
null is a primitive value
```

But:

```js id="qg1ed8"
typeof null
```

returns:

```text id="ym24sb"
"object"
```

Classic interview question.

---

# 11. BigInt

`BigInt` is used when an integer is larger than JavaScript's safe normal integer range.

Example:

```js id="ekxoph"
const bigNumber = 123456789012345678901234567890n;
```

Notice:

```text id="o4iaq5"
n
```

at the end.

Check:

```js id="ltqthg"
console.log(typeof bigNumber);
```

Output:

```text id="pv4f4d"
bigint
```

For normal application development, you won't use it often.

Interview awareness is enough.

---

# 12. Symbol

`Symbol` creates a unique value.

Example:

```js id="z6wr8k"
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);
```

Output:

```text id="xvzeip"
false
```

Even though both descriptions are `"id"`.

Why?

Each symbol is unique.

For your preparation:

```text id="0ye6ak"
Know what Symbol is
Know symbols are unique
Deep practical usage = low priority
```

---

# 13. Primitive types summary

```text id="djv1md"
string
number
boolean
undefined
null
bigint
symbol
```

Example:

```js id="263miv"
const name = "Rahul";       // string
const age = 30;             // number
const active = true;        // boolean
let manager;                // undefined
const selected = null;      // null
const huge = 123456789n;    // bigint
const id = Symbol("id");    // symbol
```

---

# 14. Reference types 🔥🔥🔥

Main reference types:

```text id="myx9su"
Object
Array
Function
```

Example:

```js id="dwinxk"
const employee = {
  name: "Rahul",
};
```

This is an object.

```js id="umkrg7"
const skills = ["React", "JavaScript"];
```

This is an array.

```js id="lpa09i"
function greet() {
  console.log("Hello");
}
```

This is a function.

---

# 15. Object

Objects store data as:

```text id="ylexom"
key → value
```

Example:

```js id="8p14v6"
const employee = {
  name: "Rahul",
  salary: 50000,
  active: true,
};
```

Conceptually:

```text id="3yia3i"
employee
│
├── name   → Rahul
├── salary → 50000
└── active → true
```

You'll use objects constantly with API data.

---

# 16. Array

An array stores multiple values.

```js id="sohgxm"
const employees = ["Rahul", "Amit", "John"];
```

Index positions:

```text id="1dddn8"
0 → Rahul
1 → Amit
2 → John
```

Access:

```js id="jxmr5k"
console.log(employees[0]);
```

Output:

```text id="9x66fs"
Rahul
```

Arrays are actually special objects in JavaScript.

And that causes another interview trap.

---

# 17. `typeof` array 🔥

Try:

```js id="8slolx"
const employees = [];

console.log(typeof employees);
```

Output:

```text id="xwsi79"
object
```

Not:

```text id="a9imqh"
array
```

So how do we correctly check an array?

Use:

```js id="nz9mlt"
Array.isArray(employees);
```

Example:

```js id="ew94q8"
console.log(Array.isArray(employees));
```

Output:

```text id="aa6eir"
true
```

🔥 Important.

---

# 18. Function type

Example:

```js id="cpw3jp"
function greet() {
  return "Hello";
}
```

Check:

```js id="s5fsfb"
console.log(typeof greet);
```

Output:

```text id="2jgdlt"
function
```

Functions are technically objects internally, but `typeof` returns:

```text id="xluef5"
function
```

for practical usage.

---

# 19. `typeof` 🔥🔥🔥

`typeof` tells us the type of a value.

Examples:

```js id="yoah1i"
console.log(typeof "Rahul");
console.log(typeof 100);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof function () {});
```

Outputs:

```text id="x1ekuf"
string
number
boolean
undefined
object
object
object
function
```

Memorize the weird ones:

```text id="mc1v2e"
typeof null
→ object

typeof []
→ object

typeof NaN
→ number
```

These are common interview questions.

---

# 20. Practical — API response

Suppose an API returns:

```js id="t26hg4"
const employee = {
  id: 101,
  name: "Rahul",
  salary: 75000,
  active: true,
  manager: null,
  skills: ["React", "JavaScript"],
};
```

Types:

```text id="a8rsgf"
id
→ number

name
→ string

salary
→ number

active
→ boolean

manager
→ null

skills
→ array
```

This is the type awareness you use every day.

---

# 21. Primitive vs Reference — basic mental model 🔥🔥🔥

For now, just understand this.

Primitive:

```js id="s2sh7o"
let a = 10;
let b = a;
```

Now:

```text id="i6jjyu"
a → 10
b → 10
```

Then:

```js id="ahhc99"
b = 20;
```

Now:

```text id="1sxh45"
a → 10
b → 20
```

Changing `b` does not affect `a`.

---

# 22. Reference example

```js id="ctfxo2"
const user1 = {
  name: "Rahul",
};

const user2 = user1;
```

Think:

```text id="rvpnzs"
user1 ─┐
       ├──→ same object
user2 ─┘
```

Now:

```js id="6h53xe"
user2.name = "Amit";
```

Then:

```js id="g92ml8"
console.log(user1.name);
```

Output:

```text id="ysw9wv"
Amit
```

Why?

Because both variables refer to the same object.

🔥 This becomes extremely important later for:

```text id="1vjutp"
mutation
React state
shallow copy
deep copy
object equality
interview output questions
```

We will go deeper later.

---

# 23. Practical output question 🔥

Predict:

```js id="30z0nu"
let a = 10;
let b = a;

b = 20;

console.log(a);
console.log(b);
```

Output:

```text id="39e2ln"
10
20
```

Because numbers are primitive values.

---

# 24. Practical output — Object 🔥🔥

Predict:

```js id="iplgov"
const user1 = {
  name: "Rahul",
};

const user2 = user1;

user2.name = "Amit";

console.log(user1.name);
```

Output:

```text id="n2w59o"
Amit
```

Because:

```text id="fnx374"
user1
and
user2

point to same object
```

---

# 25. Equality practical 🔥🔥

Consider:

```js id="2z7tgm"
const a = {
  name: "Rahul",
};

const b = {
  name: "Rahul",
};

console.log(a === b);
```

Output:

```text id="qf61gn"
false
```

Why?

They look identical, but they are two separate objects.

Conceptually:

```text id="7qikl4"
a → Object A

b → Object B
```

Different references.

---

## Compare this

```js id="ntoiyv"
const a = {
  name: "Rahul",
};

const b = a;

console.log(a === b);
```

Output:

```text id="ih1cw6"
true
```

Because both point to the same object.

This is a very important JavaScript interview concept.

---

# 26. `NaN` practical 🔥🔥

Consider:

```js id="jif4ib"
const result = Number("hello");

console.log(result);
```

Output:

```text id="hwrmqr"
NaN
```

How do we check?

Avoid relying on:

```js id="seru5e"
result === NaN;
```

Because:

```js id="rpoeay"
NaN === NaN
```

is:

```text id="2ymvzj"
false
```

Use:

```js id="gw8lqm"
Number.isNaN(result);
```

Example:

```js id="dnfktr"
console.log(Number.isNaN(result));
```

Output:

```text id="dfh6x6"
true
```

🔥 Important practical rule.

---

# 27. `typeof` debugging practical

Suppose:

```js id="4i5vf0"
const apiResponse = {
  total: "100",
};
```

You calculate:

```js id="qsldvs"
console.log(typeof apiResponse.total);
```

Output:

```text id="da5f9h"
string
```

This is a common API problem.

You may think API returned:

```text id="akacaa"
100
```

but actually it returned:

```text id="h9be9z"
"100"
```

This difference matters.

Later during type conversion we'll solve:

```js id="d5wwc4"
Number(apiResponse.total)
```

This is exactly why understanding data types matters in real projects.

---

# 28. `Array.isArray()` practical

Suppose API sends:

```js id="s6u3s6"
const data = ["React", "Node", "JavaScript"];
```

Correct validation:

```js id="oc3l8r"
if (Array.isArray(data)) {
  console.log("Valid array");
}
```

Don't use:

```js id="9mcbx5"
typeof data === "array";
```

Because that will never work.

---

# 29. Interview question — Primitive vs Reference

Easy interview answer:

> Primitive values are copied as values. Objects, arrays, and functions are reference values, so assigning them to another variable copies the reference to the same underlying object.

Example:

```js id="99y5m7"
let a = 10;
let b = a;
```

Independent values.

But:

```js id="0pex1c"
const a = {};
const b = a;
```

Both refer to the same object.

---

# 30. Interview question — `null` vs `undefined`

Good answer:

```text id="pazdlv"
undefined
→ value has not been assigned / doesn't exist

null
→ intentionally represents no value
```

Example:

```js id="4dcu2a"
let employee;
```

→ `undefined`

```js id="9h7rq6"
let selectedEmployee = null;
```

→ intentionally nothing selected.

---

# 31. Interview question — Why is `typeof null` `"object"`?

Correct short answer:

> It is a historical JavaScript quirk kept for backward compatibility. `null` itself is still a primitive value.

Enough for interview.

---

# 32. Interview question — How do you detect an array?

Use:

```js id="85vr1v"
Array.isArray(value);
```

Not:

```js id="bkbxjk"
typeof value === "array";
```

Because:

```js id="sxisos"
typeof []
```

returns:

```text id="2htryt"
object
```

---

# 33. Practical exercise — Predict all outputs 🔥🔥

```js id="lw7i32"
console.log(typeof "Hello");
console.log(typeof 100);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof []);
console.log(typeof {});
console.log(typeof NaN);
```

Answer:

```text id="s2tgxd"
string
number
boolean
undefined
object
object
object
number
```

This exact family of questions appears frequently in interviews.

---

# 34. Practical exercise — Reference behavior

Predict:

```js id="id2hbm"
const employee1 = {
  salary: 50000,
};

const employee2 = employee1;

employee2.salary = 80000;

console.log(employee1.salary);
```

Answer:

```text id="flzkl4"
80000
```

Reason:

```text id="g6k9ku"
employee1 ─┐
           ├── same object
employee2 ─┘
```

---

# 35. Real machine-coding scenario

Suppose API returns:

```js id="jg4qx3"
const employee = {
  id: 1,
  name: "Rahul",
  age: 30,
  active: true,
  manager: null,
  skills: ["React", "Node"],
};
```

Before manipulating data, you need to understand:

```text id="ohommm"
id      → number
name    → string
age     → number
active  → boolean
manager → null
skills  → array
```

Later this helps with:

```text id="6f50x2"
filter()
sort()
map()
validation
form handling
API transformation
```

---

# 36. Machine-coding rules 🔥🔥🔥

When handling unknown/API data:

```js id="jegtou"
typeof value
```

is useful for primitives.

For arrays:

```js id="o41sjp"
Array.isArray(value)
```

For `null`:

```js id="l4uplm"
value === null
```

Example:

```js id="63ythm"
if (Array.isArray(data)) {
  // safe to use array operations
}
```

And:

```js id="bk59ah"
if (employee.manager === null) {
  console.log("No manager assigned");
}
```

---

# Quick Memory 🧠

```text id="41yplw"
PRIMITIVES

string
number
boolean
undefined
null
bigint
symbol
```

```text id="j5g1ev"
REFERENCE VALUES

Object
Array
Function
```

Key interview traps:

```text id="8yy456"
typeof null
→ "object"

typeof []
→ "object"

Array.isArray([])
→ true

typeof NaN
→ "number"

NaN === NaN
→ false

Number.isNaN(NaN)
→ true
```

And:

```text id="ragb8p"
Primitive assignment
→ copies the value

Object/Array assignment
→ copies the reference
```

## ✅ 6.2 Data Types complete

**Next: 6.3 Type Conversion / Coercion 🔥🔥🔥** — one of the most common JavaScript output-question areas.
