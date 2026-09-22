# 7.10 Prototypes + Prototype Chain 🔥🔥🔥

JavaScript uses **prototypes** to let objects inherit properties and methods from other objects.

Master mental model:

```text
object
↓
look for property on object
↓ not found
look at its prototype
↓ not found
look at prototype's prototype
↓
continue
↓
null
```

That lookup path is the:

```text
Prototype Chain
```

This chapter covers:

```text
prototype
[[Prototype]]
__proto__ Awareness
Property Lookup
Prototype Chain
Object.prototype
Constructor Functions
Shared Methods
Object.create()
Own vs Inherited Properties
Shadowing
Inheritance
instanceof
constructor Property
Prototype Mutation
Prototype Replacement
null Prototype
Classes Awareness
Output Questions
Debugging Traps
```

---

# 1. What Is a Prototype? 🔥🔥🔥

A prototype is another object that JavaScript can use as a fallback during property lookup.

Example:

```js
// Step 1:
const parent = {
  role: "Admin",
};

// Step 2:
const child =
  Object.create(
    parent
  );

// Step 3:
console.log(
  child.role
); // Output: Admin
```

Output:

```text
Admin
```

`child` does not directly contain `role`.

JavaScript finds `role` through the prototype.

---

# 2. Prototype Lookup Mental Model 🔥🔥🔥

When JavaScript sees:

```text
child.role
```

it conceptually does:

```text
Does child have role?
↓ no
Check child's prototype
↓
Does prototype have role?
↓ yes
Return value
```

---

# 3. What Is `[[Prototype]]`? 🔥🔥🔥

Every ordinary object has an internal prototype link.

The specification describes it conceptually as:

```text
[[Prototype]]
```

Example:

```text
child
[[Prototype]]
↓
parent
```

You cannot write:

```text
child.[[Prototype]]
```

directly in JavaScript.

Instead, use:

```js
// Step 1:
console.log(
  Object.getPrototypeOf(
    child
  )
  ===
  parent
); // Output: true
```

Output:

```text
true
```

---

# 4. `.prototype` vs `[[Prototype]]` 🔥🔥🔥

This is one of the biggest interview confusions.

`Function.prototypeProperty`:

```text
Constructor.prototype
```

is a normal property on constructor functions.

Example:

```text
Employee.prototype
```

`[[Prototype]]`:

```text
internal link of an object
```

Example:

```text
employee's [[Prototype]]
→ Employee.prototype
```

Do not mix them.

---

# 5. Constructor `.prototype` Example

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
console.log(
  typeof Employee.prototype
); // Output: object
```

Output:

```text
object
```

Regular constructible functions automatically have a `.prototype` object.

---

# 6. Instance `[[Prototype]]` Points to Constructor `.prototype` 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
const employee =
  new Employee(
    "Rahul"
  );

// Step 3:
console.log(
  Object.getPrototypeOf(
    employee
  )
  ===
  Employee.prototype
); // Output: true
```

Output:

```text
true
```

Mental model:

```text
employee
[[Prototype]]
↓
Employee.prototype
```

---

# 7. `__proto__` Awareness

You may see old examples like:

```js
// Step 1:
console.log(
  employee.__proto__
  ===
  Employee.prototype
); // Output: true
```

Output:

```text
true
```

But prefer:

```js
// Step 1:
Object.getPrototypeOf(
  employee
);
```

`__proto__` is historical/legacy syntax.

---

# 8. Property Lookup Starts on the Object 🔥🔥🔥

```js
const parent = {
  value: 10,
};

const child =
  Object.create(
    parent
  );

// Step 1:
child.name =
  "Rahul";

// Step 2:
console.log(
  child.name
); // Output: Rahul
```

Output:

```text
Rahul
```

JavaScript finds `name` directly on `child`, so prototype lookup is unnecessary.

---

# 9. If Property Is Missing, JavaScript Looks Upward

```js
const parent = {
  role: "Admin",
};

const child =
  Object.create(
    parent
  );

// Step 1:
console.log(
  child.role
); // Output: Admin
```

Output:

```text
Admin
```

Lookup:

```text
child.role
↓
not found on child
↓
check parent
↓
found Admin
```

---

# 10. If Property Is Missing Everywhere

```js
const parent = {
  role: "Admin",
};

const child =
  Object.create(
    parent
  );

// Step 1:
console.log(
  child.salary
); // Output: undefined
```

Output:

```text
undefined
```

Prototype lookup eventually reaches:

```text
null
```

and JavaScript returns `undefined`.

---

# 11. What Is the Prototype Chain? 🔥🔥🔥

Prototype Chain means:

```text
object
↓
its prototype
↓
prototype's prototype
↓
...
↓
null
```

Example:

```text
employee
↓
Employee.prototype
↓
Object.prototype
↓
null
```

---

# 12. `Object.prototype` 🔥🔥🔥

Most ordinary objects eventually inherit from:

```text
Object.prototype
```

Example:

```js
const user = {
  name: "Rahul",
};

// Step 1:
console.log(
  Object.getPrototypeOf(
    user
  )
  ===
  Object.prototype
); // Output: true
```

Output:

```text
true
```

---

# 13. `Object.prototype` Ends at `null`

```js
// Step 1:
console.log(
  Object.getPrototypeOf(
    Object.prototype
  )
); // Output: null
```

Output:

```text
null
```

So a common chain is:

```text
user
↓
Object.prototype
↓
null
```

---

# 14. Where Does `toString()` Come From? 🔥🔥🔥

Example:

```js
const user = {
  name: "Rahul",
};

// Step 1:
console.log(
  typeof user.toString
); // Output: function
```

Output:

```text
function
```

We did not define `toString`.

JavaScript finds it on:

```text
Object.prototype
```

---

# 15. Own Property vs Inherited Property 🔥🔥🔥

```js
const parent = {
  role: "Admin",
};

const child =
  Object.create(
    parent
  );

// Step 1:
child.name =
  "Rahul";

// Step 2:
console.log(
  Object.hasOwn(
    child,
    "name"
  )
); // Output: true

// Step 3:
console.log(
  Object.hasOwn(
    child,
    "role"
  )
); // Output: false
```

Output:

```text
true
false
```

`role` exists through inheritance, but is not an own property.

---

# 16. `in` Operator Checks Prototype Chain

```js
const parent = {
  role: "Admin",
};

const child =
  Object.create(
    parent
  );

// Step 1:
console.log(
  "role"
  in
  child
); // Output: true

// Step 2:
console.log(
  Object.hasOwn(
    child,
    "role"
  )
); // Output: false
```

Output:

```text
true
false
```

Difference:

```text
in
→ own + inherited

Object.hasOwn()
→ own only
```

---

# 17. Constructor Functions + Prototypes 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
Employee.prototype.showName =
  function () {
    return this.name;
  };

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.showName()
); // Output: Rahul
```

Output:

```text
Rahul
```

`showName` is inherited from `Employee.prototype`.

---

# 18. Why Put Methods on the Prototype? 🔥🔥🔥

Because all instances can share the same function.

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
Employee.prototype.showName =
  function () {
    return this.name;
  };

// Step 3:
const first =
  new Employee(
    "Rahul"
  );

// Step 4:
const second =
  new Employee(
    "Amit"
  );

// Step 5:
console.log(
  first.showName
  ===
  second.showName
); // Output: true
```

Output:

```text
true
```

---

# 19. Method Inside Constructor Is Not Shared

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.showName =
    function () {
      return this.name;
    };
}

// Step 3:
const first =
  new Employee(
    "Rahul"
  );

// Step 4:
const second =
  new Employee(
    "Amit"
  );

// Step 5:
console.log(
  first.showName
  ===
  second.showName
); // Output: false
```

Output:

```text
false
```

Each instance gets its own function object.

---

# 20. Prototype Method Lookup Trace 🔥🔥🔥

For:

```text
employee.showName()
```

JavaScript checks:

```text
employee has showName?
↓ no
Employee.prototype has showName?
↓ yes
use that function
↓
call as employee.showName()
↓
this = employee
```

---

# 21. Inherited Method Uses Instance `this` 🔥🔥🔥

```js
function Employee(
  name
) {
  this.name =
    name;
}

Employee.prototype.showName =
  function () {
    return this.name;
  };

const first =
  new Employee(
    "Rahul"
  );

const second =
  new Employee(
    "Amit"
  );

// Step 1:
console.log(
  first.showName()
); // Output: Rahul

// Step 2:
console.log(
  second.showName()
); // Output: Amit
```

Output:

```text
Rahul
Amit
```

Same function.

Different receiver.

Different `this`.

---

# 22. Property Shadowing 🔥🔥🔥

If the child has its own property with the same name, it hides the prototype property.

```js
const parent = {
  role: "User",
};

const child =
  Object.create(
    parent
  );

// Step 1:
child.role =
  "Admin";

// Step 2:
console.log(
  child.role
); // Output: Admin
```

Output:

```text
Admin
```

Lookup stops at the nearest matching property.

---

# 23. Shadowing Does Not Change Prototype

```js
const parent = {
  role: "User",
};

const child =
  Object.create(
    parent
  );

// Step 1:
child.role =
  "Admin";

// Step 2:
console.log(
  child.role
); // Output: Admin

// Step 3:
console.log(
  parent.role
); // Output: User
```

Output:

```text
Admin
User
```

The parent is unchanged.

---

# 24. Deleting Own Property Reveals Prototype Property 🔥🔥🔥

```js
const parent = {
  role: "User",
};

const child =
  Object.create(
    parent
  );

// Step 1:
child.role =
  "Admin";

// Step 2:
console.log(
  child.role
); // Output: Admin

// Step 3:
delete child.role;

// Step 4:
console.log(
  child.role
); // Output: User
```

Output:

```text
Admin
User
```

After deleting the own property, lookup continues to the prototype.

---

# 25. Updating Prototype Affects Existing Instances 🔥🔥🔥

```js
function Employee(
  name
) {
  this.name =
    name;
}

// Step 1:
const employee =
  new Employee(
    "Rahul"
  );

// Step 2:
Employee.prototype.role =
  "Developer";

// Step 3:
console.log(
  employee.role
); // Output: Developer
```

Output:

```text
Developer
```

Why?

The existing instance still points to the same `Employee.prototype` object.

---

# 26. Updating Existing Prototype Method

```js
function Employee(
  name
) {
  this.name =
    name;
}

Employee.prototype.show =
  function () {
    return "Old";
  };

const employee =
  new Employee(
    "Rahul"
  );

// Step 1:
console.log(
  employee.show()
); // Output: Old

// Step 2:
Employee.prototype.show =
  function () {
    return "New";
  };

// Step 3:
console.log(
  employee.show()
); // Output: New
```

Output:

```text
Old
New
```

---

# 27. Replacing the Entire Prototype Is Different 🔥🔥🔥

```js
function Employee(
  name
) {
  this.name =
    name;
}

// Step 1:
const first =
  new Employee(
    "Rahul"
  );

// Step 2:
Employee.prototype = {
  role: "Developer",
};

// Step 3:
const second =
  new Employee(
    "Amit"
  );

// Step 4:
console.log(
  first.role
); // Output: undefined

// Step 5:
console.log(
  second.role
); // Output: Developer
```

Output:

```text
undefined
Developer
```

Why?

`first` still points to the old prototype object.

`second` points to the new prototype object.

---

# 28. Mutating Prototype vs Replacing Prototype 🔥🔥🔥

Mutating:

```text
Employee.prototype.role = "Developer"
```

Existing instances see it because they still reference that prototype object.

Replacing:

```text
Employee.prototype = { ... }
```

Existing instances keep their old prototype reference.

New instances use the new object.

---

# 29. `.constructor` Property 🔥🔥

Default constructor prototype has:

```text
prototype.constructor
→ constructor function
```

Example:

```js
function Employee() {
  // Step 1:
}

// Step 2:
console.log(
  Employee.prototype.constructor
  ===
  Employee
); // Output: true
```

Output:

```text
true
```

---

# 30. Replacing Prototype Can Break `.constructor`

```js
function Employee() {
  // Step 1:
}

// Step 2:
Employee.prototype = {
  show() {
    return "Hello";
  },
};

// Step 3:
console.log(
  Employee.prototype.constructor
  ===
  Employee
); // Output: false
```

Output:

```text
false
```

The new object inherits its `constructor` from `Object.prototype`.

---

# 31. Restore `.constructor` When Replacing Prototype — Awareness

```js
function Employee() {
  // Step 1:
}

// Step 2:
Employee.prototype = {
  constructor:
    Employee,

  show() {
    return "Hello";
  },
};

// Step 3:
console.log(
  Employee.prototype.constructor
  ===
  Employee
); // Output: true
```

Output:

```text
true
```

---

# 32. `Object.create()` 🔥🔥🔥

`Object.create(proto)` creates a new object whose prototype is `proto`.

```js
const employeeMethods = {
  showName() {
    return this.name;
  },
};

// Step 1:
const employee =
  Object.create(
    employeeMethods
  );

// Step 2:
employee.name =
  "Rahul";

// Step 3:
console.log(
  employee.showName()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 33. Verify `Object.create()` Prototype

```js
const parent = {
  value: 10,
};

// Step 1:
const child =
  Object.create(
    parent
  );

// Step 2:
console.log(
  Object.getPrototypeOf(
    child
  )
  ===
  parent
); // Output: true
```

Output:

```text
true
```

---

# 34. `Object.create(null)` 🔥🔥

This creates an object with no prototype.

```js
// Step 1:
const dictionary =
  Object.create(
    null
  );

// Step 2:
dictionary.name =
  "Rahul";

// Step 3:
console.log(
  dictionary.name
); // Output: Rahul

// Step 4:
console.log(
  Object.getPrototypeOf(
    dictionary
  )
); // Output: null
```

Output:

```text
Rahul
null
```

---

# 35. No `Object.prototype` Methods With `Object.create(null)`

```js
// Step 1:
const dictionary =
  Object.create(
    null
  );

// Step 2:
console.log(
  typeof dictionary.toString
); // Output: undefined
```

Output:

```text
undefined
```

Why?

Prototype chain is:

```text
dictionary
↓
null
```

There is no `Object.prototype`.

---

# 36. Why Use `Object.create(null)`? — Awareness

Useful for very plain dictionary-like objects because keys such as:

```text
toString
constructor
hasOwnProperty
```

are not inherited.

But in most app code, normal objects or `Map` are easier.

---

# 37. `Object.getPrototypeOf()` 🔥🔥🔥

Use it to read an object's prototype.

```js
const parent = {
  value: 10,
};

const child =
  Object.create(
    parent
  );

// Step 1:
console.log(
  Object.getPrototypeOf(
    child
  )
  ===
  parent
); // Output: true
```

Output:

```text
true
```

---

# 38. `Object.setPrototypeOf()` — Awareness

JavaScript can change an object's prototype:

```js
const first = {
  value: 10,
};

const second = {
  role: "Admin",
};

// Step 1:
Object.setPrototypeOf(
  first,
  second
);

// Step 2:
console.log(
  first.role
); // Output: Admin
```

Output:

```text
Admin
```

But changing prototypes dynamically can hurt performance.

Practical rule:

```text
Prefer setting prototype at creation time
with new or Object.create().
```

---

# 39. Multi-Level Prototype Chain 🔥🔥🔥

```js
const grandParent = {
  company: "ABC",
};

const parent =
  Object.create(
    grandParent
  );

parent.department =
  "IT";

const child =
  Object.create(
    parent
  );

child.name =
  "Rahul";

// Step 1:
console.log(
  child.name
); // Output: Rahul

// Step 2:
console.log(
  child.department
); // Output: IT

// Step 3:
console.log(
  child.company
); // Output: ABC
```

Output:

```text
Rahul
IT
ABC
```

---

# 40. Multi-Level Lookup Trace

For:

```text
child.company
```

JavaScript checks:

```text
child
↓ not found
parent
↓ not found
grandParent
↓ found ABC
```

That is prototype-chain lookup.

---

# 41. Prototype Inheritance With Constructor Functions 🔥🔥🔥

```js
function Person(
  name
) {
  // Step 1:
  this.name =
    name;
}

Person.prototype.greet =
  function () {
    return (
      `Hello ${this.name}`
    );
  };

function Employee(
  name,
  role
) {
  // Step 2:
  Person.call(
    this,
    name
  );

  // Step 3:
  this.role =
    role;
}
```

At this point, `Employee` receives Person's instance properties, but we still need to link prototype methods.

---

# 42. Link Child Prototype to Parent Prototype 🔥🔥🔥

```js
// Step 1:
Employee.prototype =
  Object.create(
    Person.prototype
  );

// Step 2:
Employee.prototype.constructor =
  Employee;
```

Now:

```text
employee
↓
Employee.prototype
↓
Person.prototype
↓
Object.prototype
↓
null
```

---

# 43. Full Constructor Inheritance Example 🔥🔥🔥

```js
function Person(
  name
) {
  // Step 1:
  this.name =
    name;
}

Person.prototype.greet =
  function () {
    return (
      `Hello ${this.name}`
    );
  };

function Employee(
  name,
  role
) {
  // Step 2:
  Person.call(
    this,
    name
  );

  // Step 3:
  this.role =
    role;
}

// Step 4:
Employee.prototype =
  Object.create(
    Person.prototype
  );

// Step 5:
Employee.prototype.constructor =
  Employee;

// Step 6:
Employee.prototype.getRole =
  function () {
    return this.role;
  };

// Step 7:
const employee =
  new Employee(
    "Rahul",
    "Developer"
  );

// Step 8:
console.log(
  employee.greet()
); // Output: Hello Rahul

// Step 9:
console.log(
  employee.getRole()
); // Output: Developer
```

Output:

```text
Hello Rahul
Developer
```

---

# 44. Why Use `Person.call(this, name)`?

Because prototype inheritance alone does not run the parent constructor.

We need:

```js
Person.call(
  this,
  name
);
```

to initialize instance properties like:

```text
name
```

on the new employee object.

---

# 45. Why Use `Object.create(Person.prototype)`?

Because we want:

```text
Employee.prototype
[[Prototype]]
↓
Person.prototype
```

This allows employee instances to inherit Person methods.

---

# 46. `instanceof` and Prototype Chain 🔥🔥🔥

```js
// Step 1:
console.log(
  employee
  instanceof
  Employee
); // Output: true

// Step 2:
console.log(
  employee
  instanceof
  Person
); // Output: true

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
true
true
```

Because all those `.prototype` objects appear in the chain.

---

# 47. How `instanceof` Works — Mental Model

For:

```text
employee instanceof Person
```

JavaScript conceptually asks:

```text
Is Person.prototype
somewhere in employee's prototype chain?
```

If yes:

```text
true
```

---

# 48. Prototype Shadowing With Methods 🔥🔥🔥

```js
const parent = {
  greet() {
    return "Parent";
  },
};

const child =
  Object.create(
    parent
  );

// Step 1:
child.greet =
  function () {
    return "Child";
  };

// Step 2:
console.log(
  child.greet()
); // Output: Child
```

Output:

```text
Child
```

The own method shadows the inherited method.

---

# 49. Delete Child Method to Reveal Parent Method

```js
const parent = {
  greet() {
    return "Parent";
  },
};

const child =
  Object.create(
    parent
  );

child.greet =
  function () {
    return "Child";
  };

// Step 1:
console.log(
  child.greet()
); // Output: Child

// Step 2:
delete child.greet;

// Step 3:
console.log(
  child.greet()
); // Output: Parent
```

Output:

```text
Child
Parent
```

---

# 50. Arrays Also Use Prototypes 🔥🔥

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1:
console.log(
  Object.getPrototypeOf(
    numbers
  )
  ===
  Array.prototype
); // Output: true
```

Output:

```text
true
```

Methods like:

```text
map
filter
push
```

come from `Array.prototype`.

---

# 51. Array Prototype Chain

Mental model:

```text
numbers
↓
Array.prototype
↓
Object.prototype
↓
null
```

That is why arrays can use both:

```text
array methods
+
many object methods
```

---

# 52. Functions Also Have Prototype Chains 🔥🔥

Functions are objects too.

```js
function greet() {
  // Step 1:
}

// Step 2:
console.log(
  Object.getPrototypeOf(
    greet
  )
  ===
  Function.prototype
); // Output: true
```

Output:

```text
true
```

---

# 53. Function Prototype Chain

```text
greet
↓
Function.prototype
↓
Object.prototype
↓
null
```

Methods such as:

```text
call
apply
bind
```

come from:

```text
Function.prototype
```

---

# 54. Important: `Function.prototype` vs Function's `.prototype` 🔥🔥🔥

For:

```js
function Employee() {
  // Step 1:
}
```

there are TWO different prototype-related concepts:

```text
Object.getPrototypeOf(Employee)
→ Function.prototype

Employee.prototype
→ object used for instances created by new Employee()
```

Very important distinction.

---

# 55. Verify Both Prototype Relationships

```js
function Employee() {
  // Step 1:
}

// Step 2:
console.log(
  Object.getPrototypeOf(
    Employee
  )
  ===
  Function.prototype
); // Output: true

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  Object.getPrototypeOf(
    employee
  )
  ===
  Employee.prototype
); // Output: true
```

Output:

```text
true
true
```

---

# 56. Class Methods Also Live on the Prototype — Awareness 🔥🔥🔥

```js
class Employee {
  showName() {
    // Step 1:
    return "Rahul";
  }
}

// Step 2:
const first =
  new Employee();

// Step 3:
const second =
  new Employee();

// Step 4:
console.log(
  first.showName
  ===
  second.showName
); // Output: true
```

Output:

```text
true
```

Class method syntax uses prototypes underneath.

Classes get their own chapter next.

---

# 57. Class Method Is Not Usually an Own Property

```js
class Employee {
  showName() {
    return "Rahul";
  }
}

const employee =
  new Employee();

// Step 1:
console.log(
  Object.hasOwn(
    employee,
    "showName"
  )
); // Output: false

// Step 2:
console.log(
  Object.hasOwn(
    Employee.prototype,
    "showName"
  )
); // Output: true
```

Output:

```text
false
true
```

---

# 58. Interview Output 1 — Basic Prototype Lookup 🔥🔥🔥

```js
const parent = {
  value: 10,
};

const child =
  Object.create(
    parent
  );

console.log(
  child.value
);
```

Expected output:

```text
10
```

---

# 59. Interview Output 2 — Shadowing

```js
const parent = {
  value: 10,
};

const child =
  Object.create(
    parent
  );

child.value =
  20;

console.log(
  child.value
);

console.log(
  parent.value
);
```

Expected output:

```text
20
10
```

---

# 60. Interview Output 3 — `hasOwn` vs `in` 🔥🔥🔥

```js
const parent = {
  value: 10,
};

const child =
  Object.create(
    parent
  );

// Step 1:
console.log(
  Object.hasOwn(
    child,
    "value"
  )
);

// Step 2:
console.log(
  "value"
  in
  child
);
```

Expected output:

```text
false
true
```

---

# 61. Interview Output 4 — Shared Method

```js
function User(
  name
) {
  this.name =
    name;
}

User.prototype.show =
  function () {
    return this.name;
  };

const a =
  new User(
    "A"
  );

const b =
  new User(
    "B"
  );

console.log(
  a.show
  ===
  b.show
);
```

Expected output:

```text
true
```

---

# 62. Interview Output 5 — Delete Shadowing Property 🔥🔥🔥

```js
const parent = {
  role: "User",
};

const child =
  Object.create(
    parent
  );

child.role =
  "Admin";

delete child.role;

console.log(
  child.role
);
```

Expected output:

```text
User
```

---

# 63. Interview Output 6 — Existing Instance + Prototype Mutation

```js
function User() {
  // Step 1:
}

const user =
  new User();

// Step 2:
User.prototype.role =
  "Admin";

// Step 3:
console.log(
  user.role
);
```

Expected output:

```text
Admin
```

---

# 64. Interview Output 7 — Prototype Replacement 🔥🔥🔥

```js
function User() {
  // Step 1:
}

const first =
  new User();

// Step 2:
User.prototype = {
  role: "Admin",
};

// Step 3:
const second =
  new User();

// Step 4:
console.log(
  first.role
);

// Step 5:
console.log(
  second.role
);
```

Expected output:

```text
undefined
Admin
```

---

# 65. Interview Output 8 — Prototype Chain + `instanceof`

```js
function Person() {
  // Step 1:
}

function Employee() {
  // Step 2:
}

// Step 3:
Employee.prototype =
  Object.create(
    Person.prototype
  );

// Step 4:
Employee.prototype.constructor =
  Employee;

// Step 5:
const employee =
  new Employee();

// Step 6:
console.log(
  employee
  instanceof
  Person
);
```

Expected output:

```text
true
```

---

# 66. Interview Question — What Is Prototype? 🔥🔥🔥

Good answer:

```text
A prototype is an object
that another object can delegate
property lookup to.

If a property is not found
on the object itself,
JavaScript checks its prototype.
```

---

# 67. Interview Question — What Is Prototype Chain?

Good answer:

```text
The prototype chain is the sequence
JavaScript follows during property lookup:

object
→ prototype
→ prototype's prototype
→ ...
→ null
```

---

# 68. Interview Question — `.prototype` vs `[[Prototype]]` 🔥🔥🔥

Good answer:

```text
Constructor.prototype
is a normal property on constructor functions.

An object's [[Prototype]]
is its internal inheritance link.

When new Constructor() creates an object,
that object's [[Prototype]]
is normally set to Constructor.prototype.
```

---

# 69. Interview Question — Why Use Prototype Methods?

Good answer:

```text
Prototype methods are shared
between instances.

This avoids creating a separate
function object for the same method
inside every constructor call.
```

---

# 70. Interview Question — Own vs Inherited Property

Good answer:

```text
An own property exists directly
on the object.

An inherited property is found
through the prototype chain.

Object.hasOwn() checks own properties.

The in operator checks both
own and inherited properties.
```

---

# 71. Interview Question — What Happens When Property Is Shadowed?

Good answer:

```text
If an object has its own property
with the same name as a prototype property,
the own property is used first.

The prototype property still exists,
but it is hidden during lookup.
```

---

# 72. Interview Question — How Does `instanceof` Work?

Good answer:

```text
instanceof checks whether
Constructor.prototype appears
somewhere in the object's prototype chain.
```

---

# 73. Debugging — Confusing `.prototype` and `__proto__` 🔥🔥🔥

Wrong mental model:

```text
employee.prototype
```

for a normal instance.

Usually what you want is:

```js
// Step 1:
Object.getPrototypeOf(
  employee
);
```

And for constructor:

```js
// Step 2:
Employee.prototype;
```

Remember:

```text
constructor
→ .prototype

instance
→ [[Prototype]]
```

---

# 74. Debugging — Replacing Prototype After Instances Exist

If you do:

```js
function User() {
  // Step 1:
}

const oldUser =
  new User();

// Step 2:
User.prototype = {
  role: "Admin",
};
```

do not expect:

```text
oldUser.role
```

to automatically use the new prototype object.

Existing instances still reference the old one.

---

# 75. Debugging — Modifying Built-In Prototypes 🔥🔥

Avoid code like:

```js
// Step 1:
Array.prototype.myCustomThing =
  function () {
    return "Custom";
  };
```

in normal application code unless you have a very strong reason.

Why?

```text
global side effects
name collisions
unexpected behavior
library conflicts
maintenance problems
```

For interview polyfills we may intentionally work with prototypes later, but production code should be careful.

---

# 76. Prototype Decision Guide 🔥🔥🔥

```text
Property exists directly?
→ use own property

Property missing?
→ search prototype chain

Need shared instance method?
→ Constructor.prototype

Need object with chosen prototype?
→ Object.create(proto)

Need read prototype?
→ Object.getPrototypeOf(obj)

Need own-property check?
→ Object.hasOwn(obj, key)

Need own + inherited check?
→ key in obj

Need inheritance between constructors?
→ Object.create(Parent.prototype)

Need check relationship?
→ instanceof
```

---

# 77. Final Master Trace 🔥🔥🔥

```js
function Person(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
Person.prototype.greet =
  function () {
    return (
      `Hello ${this.name}`
    );
  };

function Employee(
  name,
  role
) {
  // Step 3:
  Person.call(
    this,
    name
  );

  // Step 4:
  this.role =
    role;
}

// Step 5:
Employee.prototype =
  Object.create(
    Person.prototype
  );

// Step 6:
Employee.prototype.constructor =
  Employee;

// Step 7:
Employee.prototype.getRole =
  function () {
    return this.role;
  };

// Step 8:
const employee =
  new Employee(
    "Rahul",
    "Developer"
  );

// Step 9:
console.log(
  employee.name
); // Output: Rahul

// Step 10:
console.log(
  employee.getRole()
); // Output: Developer

// Step 11:
console.log(
  employee.greet()
); // Output: Hello Rahul

// Step 12:
console.log(
  employee
  instanceof
  Employee
); // Output: true

// Step 13:
console.log(
  employee
  instanceof
  Person
); // Output: true
```

Output:

```text
Rahul
Developer
Hello Rahul
true
true
```

Complete mental model:

```text
employee
↓
own properties:
name
role
↓
Employee.prototype
getRole
↓
Person.prototype
greet
↓
Object.prototype
↓
null
```

Property lookup:

```text
employee.greet
↓
not own property
↓
Employee.prototype
↓
not there
↓
Person.prototype
↓
found greet
```

Then:

```text
employee.greet()
↓
this = employee
↓
Hello Rahul
```

---

# Quick Memory 🧠🔥🔥🔥

## Prototype

```text
fallback object used
during property lookup
```

## Prototype Chain

```text
object
↓
prototype
↓
prototype
↓
...
↓
null
```

## `.prototype`

```text
Constructor.prototype
```

is a property on constructible functions.

## `[[Prototype]]`

```text
internal link on an object
```

Use:

```js
// Step 1:
Object.getPrototypeOf(
  object
);
```

## `new`

```text
new Employee()
↓
instance [[Prototype]]
=
Employee.prototype
```

## Own vs Inherited

```text
Object.hasOwn()
→ own only

in
→ own + inherited
```

## Shadowing

```text
own property
wins over
prototype property
```

## Delete Shadow

```text
delete own property
↓
prototype property becomes visible
```

## Shared Methods

```text
Constructor.prototype.method
→ shared across instances
```

## `Object.create()`

```text
Object.create(parent)
↓
new object's prototype = parent
```

## `instanceof`

```text
checks whether
Constructor.prototype
exists in prototype chain
```

## Most Important Interview Answer

```text
JavaScript uses prototype-based inheritance.

If a property is not found directly
on an object, JavaScript follows
the object's prototype chain
until it finds the property
or reaches null.
```

---

# ✅ 7.10 Prototypes + Prototype Chain Complete

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
```

Next topic:

```text
7.11 Classes 🔥🔥🔥
├── class
├── constructor
├── Instance Methods
├── extends
├── super
├── static
├── Getters / Setters Awareness
└── Private Fields Awareness
```

**Next: 7.11 Classes 🔥🔥🔥**
