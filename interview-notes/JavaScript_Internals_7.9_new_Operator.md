# 7.9 `new` Operator 🔥🔥🔥

The `new` operator is used to create an object from a constructor function or class.

Master mental model:

```text
new Constructor(...)
↓
1. Create a new empty object
↓
2. Link that object to Constructor.prototype
↓
3. Call Constructor with this = new object
↓
4. Run constructor code
↓
5. Return the new object
```

This chapter covers:

```text
Constructor Functions
What new Does Internally
New Object Creation
this Binding
Prototype Linking
Return Behavior
Primitive Return
Object Return
Constructor Methods
Shared Prototype Methods
Arrow Function Limitation
Classes + new
instanceof
new.target Awareness
Output Questions
Debugging Traps
```

---

# 1. What Is the `new` Operator? 🔥🔥🔥

`new` tells JavaScript:

```text
Create a new object
using this constructor.
```

Example:

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
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 2. What Is a Constructor Function?

A constructor function is a normal function intended to create objects with `new`.

Example:

```js
function Employee(
  name,
  role
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.role =
    role;
}
```

Important convention:

```text
Constructor function names
usually start with a capital letter.
```

Example:

```text
Employee
User
Product
Order
```

---

# 3. Why Capital Letter?

JavaScript does not require:

```text
Employee
```

instead of:

```text
employee
```

But capitalizing constructors helps humans understand:

```text
This function is intended
to be called with new.
```

---

# 4. Basic Constructor Example 🔥🔥🔥

```js
function User(
  name,
  age
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.age =
    age;
}

// Step 3:
const user =
  new User(
    "Rahul",
    30
  );

// Step 4:
console.log(
  user
);
// Output:
// User { name: "Rahul", age: 30 }
// Exact console formatting can vary by runtime.
```

Conceptual result:

```text
{
  name: "Rahul",
  age: 30
}
```

---

# 5. What Does `new` Do Internally? 🔥🔥🔥

When JavaScript sees:

```js
const user =
  new User(
    "Rahul"
  );
```

Think:

```text
Step 1
Create new empty object

Step 2
Link object to User.prototype

Step 3
Call User with this = new object

Step 4
Execute constructor body

Step 5
Return the object
```

This is the most important `new` mental model.

---

# 6. Step 1 — Create a New Empty Object

Conceptually:

```text
const newObject = {};
```

But JavaScript does this internally for you.

You do not manually write it when using `new`.

---

# 7. Step 2 — Prototype Link Is Created 🔥🔥🔥

The new object is linked to:

```text
Constructor.prototype
```

Example:

```text
employee
↓
Employee.prototype
↓
Object.prototype
```

This prototype link allows instances to share methods.

Full prototype internals come in the next chapter.

---

# 8. Step 3 — `this` Becomes the New Object 🔥🔥🔥

Example:

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}
```

When called as:

```js
// Step 2:
const employee =
  new Employee(
    "Rahul"
  );
```

inside the constructor:

```text
this
→ newly created employee object
```

So:

```text
this.name = "Rahul"
```

becomes conceptually:

```text
newObject.name = "Rahul"
```

---

# 9. Step 4 — Constructor Body Runs

```js
function Employee(
  name,
  salary
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.salary =
    salary;
}
```

During:

```js
// Step 3:
const employee =
  new Employee(
    "Rahul",
    50000
  );
```

constructor body adds properties to the new object.

---

# 10. Step 5 — New Object Is Returned 🔥🔥🔥

If the constructor does not explicitly return another object, JavaScript returns the newly created instance.

Example:

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
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

No explicit:

```js
return this;
```

was needed.

---

# 11. `new` Creates Separate Objects 🔥🔥🔥

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
const first =
  new Employee(
    "Rahul"
  );

// Step 3:
const second =
  new Employee(
    "Amit"
  );

// Step 4:
console.log(
  first.name
); // Output: Rahul

// Step 5:
console.log(
  second.name
); // Output: Amit
```

Output:

```text
Rahul
Amit
```

Each `new` call creates a separate instance.

---

# 12. Instances Are Different References

```js
function User(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
const a =
  new User(
    "Rahul"
  );

// Step 3:
const b =
  new User(
    "Rahul"
  );

// Step 4:
console.log(
  a === b
); // Output: false
```

Output:

```text
false
```

Same values.

Different objects.

---

# 13. Constructor Parameters Become Instance Data

```js
function Product(
  id,
  name,
  price
) {
  // Step 1:
  this.id =
    id;

  // Step 2:
  this.name =
    name;

  // Step 3:
  this.price =
    price;
}

// Step 4:
const product =
  new Product(
    101,
    "Laptop",
    50000
  );

// Step 5:
console.log(
  product.price
); // Output: 50000
```

Output:

```text
50000
```

---

# 14. Constructor Can Run Logic

```js
function Employee(
  name,
  salary
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.salary =
    Number(
      salary
    );

  // Step 3:
  this.isHighSalary =
    this.salary
    >=
    50000;
}

// Step 4:
const employee =
  new Employee(
    "Rahul",
    "60000"
  );

// Step 5:
console.log(
  employee.isHighSalary
); // Output: true
```

Output:

```text
true
```

---

# 15. Forgetting `new` Changes Everything 🔥🔥🔥

Example:

```js
function Employee(
  name
) {
  // Step 1:
  "use strict";

  // Step 2:
  this.name =
    name;
}

try {
  // Step 3:
  Employee(
    "Rahul"
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

Why?

Without `new`:

```text
Employee("Rahul")
```

is a normal function call.

In strict mode:

```text
this = undefined
```

So:

```text
this.name = ...
```

fails.

---

# 16. With `new`, `this` Is Automatically Created

Compare:

```text
Employee("Rahul")
→ regular function call

new Employee("Rahul")
→ constructor call
```

With `new`:

```text
this = new object
```

Without `new`:

```text
this follows normal function-call rules
```

---

# 17. Constructor Method Defined Inside Constructor

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

This works.

But there is a memory consideration.

---

# 18. Method Inside Constructor Is Recreated Per Instance 🔥🔥🔥

```js
function Employee(
  name
) {
  this.name =
    name;

  this.showName =
    function () {
      return this.name;
    };
}

// Step 1:
const first =
  new Employee(
    "Rahul"
  );

// Step 2:
const second =
  new Employee(
    "Amit"
  );

// Step 3:
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

Why?

Each constructor call creates a new function object for `showName`.

---

# 19. Better: Share Methods Through Prototype 🔥🔥🔥

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
  first.showName()
); // Output: Rahul

// Step 6:
console.log(
  second.showName()
); // Output: Amit
```

Output:

```text
Rahul
Amit
```

Both instances use the same prototype method.

---

# 20. Prototype Method Is Shared 🔥🔥🔥

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
  first.showName
  ===
  second.showName
); // Output: true
```

Output:

```text
true
```

Because method lookup reaches the same function on:

```text
Employee.prototype
```

---

# 21. `new` Creates Prototype Connection 🔥🔥🔥

For:

```js
const employee =
  new Employee(
    "Rahul"
  );
```

conceptually:

```text
employee
[[Prototype]]
↓
Employee.prototype
```

We can verify with:

```js
// Step 1:
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

---

# 22. `__proto__` Awareness

You may see:

```text
employee.__proto__
```

in old interview examples.

Prefer:

```js
Object.getPrototypeOf(
  employee
);
```

`__proto__` exists historically but is not the preferred modern API.

---

# 23. `instanceof` With Constructor 🔥🔥🔥

```js
function Employee(
  name
) {
  this.name =
    name;
}

const employee =
  new Employee(
    "Rahul"
  );

// Step 1:
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

High-level reason:

JavaScript checks whether:

```text
Employee.prototype
```

appears in the object's prototype chain.

---

# 24. `instanceof Object`

```js
function Employee(
  name
) {
  this.name =
    name;
}

const employee =
  new Employee(
    "Rahul"
  );

// Step 1:
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

Prototype chain concept:

```text
employee
↓
Employee.prototype
↓
Object.prototype
```

---

# 25. Constructor Returning Nothing

```js
function User(
  name
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  // No explicit return.
}

// Step 3:
const user =
  new User(
    "Rahul"
  );

// Step 4:
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

JavaScript returns the new instance automatically.

---

# 26. Constructor Returning a Primitive 🔥🔥🔥

Important interview rule:

If a constructor called with `new` explicitly returns a primitive, that primitive is ignored.

```js
function User(
  name
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  return 100;
}

// Step 3:
const user =
  new User(
    "Rahul"
  );

// Step 4:
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

The number `100` is ignored.

---

# 27. Primitive Return Rule

With `new`:

```text
return number
return string
return boolean
return null
```

does not replace the constructed instance.

High-level rule:

```text
primitive return
→ ignored
→ new object returned
```

---

# 28. Constructor Returning an Object 🔥🔥🔥

Different rule.

If constructor explicitly returns an object, that object replaces the newly created instance.

```js
function User(
  name
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  return {
    name: "Override",
  };
}

// Step 3:
const user =
  new User(
    "Rahul"
  );

// Step 4:
console.log(
  user.name
); // Output: Override
```

Output:

```text
Override
```

---

# 29. Object Return Rule 🔥🔥🔥

With `new`:

```text
constructor returns object/function
→ returned object wins

constructor returns primitive/nothing
→ created instance wins
```

This is an important interview rule.

---

# 30. Constructor Returning Function — Awareness

Functions are objects in JavaScript.

```js
function Test() {
  // Step 1:
  this.value =
    10;

  // Step 2:
  return function () {
    return "Returned Function";
  };
}

// Step 3:
const result =
  new Test();

// Step 4:
console.log(
  typeof result
); // Output: function
```

Output:

```text
function
```

Because an explicitly returned function is an object value.

---

# 31. `return this` Is Allowed but Usually Unnecessary

```js
function User(
  name
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  return this;
}

// Step 3:
const user =
  new User(
    "Rahul"
  );

// Step 4:
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

But normally you do not need:

```js
return this;
```

JavaScript already returns the constructed instance.

---

# 32. Manual Approximation of `new` 🔥🔥🔥

Conceptually, we can build a simplified helper:

```js
function myNew(
  Constructor,
  ...args
) {
  // Step 1:
  const obj =
    Object.create(
      Constructor.prototype
    );

  // Step 2:
  const result =
    Constructor.apply(
      obj,
      args
    );

  // Step 3:
  const isObject =
    result !== null
    &&
    (
      typeof result
        ===
        "object"
      ||
      typeof result
        ===
        "function"
    );

  // Step 4:
  return (
    isObject
      ?
      result
      :
      obj
  );
}
```

This is a simplified mental implementation of `new`.

---

# 33. Use the Simplified `myNew()`

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
  myNew(
    Employee,
    "Rahul"
  );

// Step 3:
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 34. Why `Object.create(Constructor.prototype)`? 🔥🔥🔥

Because the new object must inherit from:

```text
Constructor.prototype
```

If we only did:

```js
const obj = {};
```

the object would inherit directly from:

```text
Object.prototype
```

and would miss the constructor's custom prototype methods.

---

# 35. Manual `new` Trace 🔥🔥🔥

Suppose:

```js
new Employee(
  "Rahul"
);
```

Conceptually:

```text
1.
obj = Object.create(Employee.prototype)

2.
Employee.apply(obj, ["Rahul"])

3.
inside Employee:
this = obj

4.
obj.name = "Rahul"

5.
return obj
```

That is the core of `new`.

---

# 36. Constructor Can Use Methods From Prototype

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;
}

Employee.prototype.greet =
  function () {
    return (
      `Hello ${this.name}`
    );
  };

// Step 2:
const employee =
  new Employee(
    "Rahul"
  );

// Step 3:
console.log(
  employee.greet()
); // Output: Hello Rahul
```

Output:

```text
Hello Rahul
```

`greet` is not an own property of `employee`.

It comes from the prototype.

---

# 37. Own Property vs Prototype Property 🔥🔥

```js
function Employee(
  name
) {
  this.name =
    name;
}

Employee.prototype.greet =
  function () {
    return "Hello";
  };

const employee =
  new Employee(
    "Rahul"
  );

// Step 1:
console.log(
  Object.hasOwn(
    employee,
    "name"
  )
); // Output: true

// Step 2:
console.log(
  Object.hasOwn(
    employee,
    "greet"
  )
); // Output: false
```

Output:

```text
true
false
```

Because:

```text
name
→ own property

greet
→ prototype property
```

---

# 38. `constructor` Property — Awareness

Typically:

```text
Employee.prototype.constructor
→ Employee
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

More prototype details come next.

---

# 39. Replacing `.prototype` Carelessly — Awareness

If you replace the entire prototype object:

```js
function Employee() {
  // Step 1:
}

Employee.prototype = {
  show() {
    return "Hello";
  },
};
```

the automatic `constructor` property is no longer the original default one unless you restore it.

For now, practical rule:

```text
Prefer adding methods to prototype
instead of replacing it blindly.
```

---

# 40. Arrow Functions Cannot Be Used With `new` 🔥🔥🔥

Arrow functions are not constructors.

```js
const User =
  (
    name
  ) => {
    // Step 1:
    return {
      name,
    };
  };

try {
  // Step 2:
  const user =
    new User(
      "Rahul"
    );
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

# 41. Why Arrow Functions Cannot Be Constructors

Arrow functions:

```text
do not have their own this
```

and are not constructible with `new`.

So:

```text
new ArrowFunction()
→ TypeError
```

---

# 42. Regular Functions Can Be Constructors

```js
function User(
  name
) {
  // Step 1:
  this.name =
    name;
}

// Step 2:
const user =
  new User(
    "Rahul"
  );

// Step 3:
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 43. Classes Also Use `new` 🔥🔥🔥

```js
class Employee {
  constructor(
    name
  ) {
    // Step 1:
    this.name =
      name;
  }
}

// Step 2:
const employee =
  new Employee(
    "Rahul"
  );

// Step 3:
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

Classes are covered in detail later.

---

# 44. Class Cannot Be Called Without `new`

```js
class Employee {
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

try {
  // Step 1:
  Employee(
    "Rahul"
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

Classes must be constructed with `new`.

---

# 45. `new.target` Awareness 🔥🔥

Inside a function, `new.target` can tell whether the function was called with `new`.

Example:

```js
function Employee(
  name
) {
  // Step 1:
  console.log(
    new.target
      ===
      Employee
  );

  // Step 2:
  this.name =
    name;
}

// Step 3:
new Employee(
  "Rahul"
); // Output: true
```

Output:

```text
true
```

---

# 46. Guard Constructor With `new.target` — Awareness

```js
function Employee(
  name
) {
  // Step 1:
  if (
    !new.target
  ) {
    throw new Error(
      "Use new Employee()"
    );
  }

  // Step 2:
  this.name =
    name;
}

try {
  // Step 3:
  Employee(
    "Rahul"
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.message
  ); // Output: Use new Employee()
}
```

Output:

```text
Use new Employee()
```

This is awareness-level modern defensive code.

---

# 47. Practical Example — Employee Model 🔥🔥🔥

```js
function Employee(
  id,
  name,
  department
) {
  // Step 1:
  this.id =
    id;

  // Step 2:
  this.name =
    name;

  // Step 3:
  this.department =
    department;
}

Employee.prototype.getLabel =
  function () {
    // Step 4:
    return (
      `${this.id} - ${this.name}`
    );
  };

// Step 5:
const employee =
  new Employee(
    101,
    "Rahul",
    "IT"
  );

// Step 6:
console.log(
  employee.getLabel()
); // Output: 101 - Rahul
```

Output:

```text
101 - Rahul
```

---

# 48. Practical Example — Cart Item

```js
function CartItem(
  name,
  price,
  quantity
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.price =
    price;

  // Step 3:
  this.quantity =
    quantity;
}

CartItem.prototype.getTotal =
  function () {
    // Step 4:
    return (
      this.price
      *
      this.quantity
    );
  };

// Step 5:
const item =
  new CartItem(
    "Mouse",
    500,
    2
  );

// Step 6:
console.log(
  item.getTotal()
); // Output: 1000
```

Output:

```text
1000
```

---

# 49. Interview Output 1 — Basic `new` 🔥🔥🔥

```js
function User(
  name
) {
  this.name =
    name;
}

const user =
  new User(
    "Rahul"
  );

console.log(
  user.name
);
```

Expected output:

```text
Rahul
```

---

# 50. Interview Output 2 — Separate Instances

```js
function User(
  name
) {
  this.name =
    name;
}

const a =
  new User(
    "A"
  );

const b =
  new User(
    "B"
  );

console.log(
  a === b
);

console.log(
  a.name,
  b.name
);
```

Expected output:

```text
false
A B
```

---

# 51. Interview Output 3 — Primitive Return 🔥🔥🔥

```js
function User() {
  this.name =
    "Rahul";

  return 100;
}

const user =
  new User();

console.log(
  user.name
);
```

Expected output:

```text
Rahul
```

Primitive return is ignored.

---

# 52. Interview Output 4 — Object Return 🔥🔥🔥

```js
function User() {
  this.name =
    "Rahul";

  return {
    name: "Amit",
  };
}

const user =
  new User();

console.log(
  user.name
);
```

Expected output:

```text
Amit
```

Returned object replaces the constructed instance.

---

# 53. Interview Output 5 — Prototype Link

```js
function User() {
  // Step 1:
}

const user =
  new User();

// Step 2:
console.log(
  Object.getPrototypeOf(
    user
  )
  ===
  User.prototype
);
```

Expected output:

```text
true
```

---

# 54. Interview Output 6 — `instanceof`

```js
function User() {
  // Step 1:
}

const user =
  new User();

// Step 2:
console.log(
  user
  instanceof
  User
);
```

Expected output:

```text
true
```

---

# 55. Interview Output 7 — Shared Prototype Method

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

# 56. Interview Output 8 — Arrow With `new`

```js
const User =
  () => {
    // Step 1:
  };

try {
  // Step 2:
  new User();
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  );
}
```

Expected output:

```text
TypeError
```

---

# 57. Interview Question — What Does `new` Do Internally? 🔥🔥🔥

Good answer:

```text
new performs four main steps:

1. Creates a new empty object.
2. Links that object to Constructor.prototype.
3. Calls the constructor with this set to the new object.
4. Returns the new object unless the constructor explicitly returns another object.
```

---

# 58. Interview Question — What Happens to `this` With `new`?

Good answer:

```text
When a regular constructor function
is called with new,
this points to the newly created object.
```

---

# 59. Interview Question — What If Constructor Returns a Primitive?

Good answer:

```text
The primitive is ignored,
and the newly created instance
is returned.
```

---

# 60. Interview Question — What If Constructor Returns an Object?

Good answer:

```text
The explicitly returned object
replaces the newly created instance
and becomes the result of the new expression.
```

---

# 61. Interview Question — Why Put Methods on Prototype?

Good answer:

```text
Methods placed on the prototype
can be shared by all instances.

If methods are created inside
the constructor,
each instance gets a separate
function object.
```

---

# 62. Interview Question — Can Arrow Function Be Used With `new`?

Good answer:

```text
No.

Arrow functions are not constructible
and do not have their own this binding.

Using new with an arrow function
throws TypeError.
```

---

# 63. Debugging — Constructor Called Without `new` 🔥🔥🔥

Problem:

```js
function Employee(
  name
) {
  this.name =
    name;
}

// Step 1:
// Wrong intention:
Employee(
  "Rahul"
);
```

In strict mode this fails.

In sloppy browser-style code it can create accidental global-object mutations.

Safer rule:

```text
Constructor-style functions
should be called with new.
```

---

# 64. Debugging — Creating Methods Inside Constructor

This is valid:

```js
function Employee(
  name
) {
  this.name =
    name;

  this.show =
    function () {
      return this.name;
    };
}
```

But for many instances:

```text
new Employee()
new Employee()
new Employee()
```

each gets another `show` function.

For shared behavior, prefer:

```text
Employee.prototype.show
```

or use class methods.

---

# 65. Debugging — Returning Object Accidentally 🔥🔥🔥

Example:

```js
function Employee(
  name
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  return {};
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.name
); // Output: undefined
```

Output:

```text
undefined
```

Why?

The explicit `{}` replaced the intended instance.

---

# 66. `new` Decision Guide 🔥🔥🔥

```text
Need many similar objects?
→ constructor/class may help

Using constructor function?
→ call with new

Need instance-specific data?
→ assign with this.property

Need shared methods?
→ Constructor.prototype

Constructor returns primitive?
→ ignored

Constructor returns object?
→ returned object wins

Need check constructor relationship?
→ instanceof

Using arrow function?
→ cannot use new
```

---

# 67. Final Master Trace 🔥🔥🔥

Code:

```js
function Employee(
  name,
  salary
) {
  // Step 1:
  this.name =
    name;

  // Step 2:
  this.salary =
    salary;
}

// Step 3:
Employee.prototype.getInfo =
  function () {
    return (
      `${this.name} - ${this.salary}`
    );
  };

// Step 4:
const employee =
  new Employee(
    "Rahul",
    50000
  );

// Step 5:
console.log(
  employee.getInfo()
); // Output: Rahul - 50000

// Step 6:
console.log(
  employee
  instanceof
  Employee
); // Output: true

// Step 7:
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
Rahul - 50000
true
true
```

Full internal mental model:

```text
new Employee("Rahul", 50000)
↓
create empty object
↓
link object → Employee.prototype
↓
call Employee
with this = new object
↓
this.name = "Rahul"
this.salary = 50000
↓
constructor returns no object
↓
new object becomes result
↓
employee.getInfo()
↓
method not found directly on employee
↓
prototype lookup
↓
Employee.prototype.getInfo found
↓
this = employee
↓
"Rahul - 50000"
```

---

# Quick Memory 🧠🔥🔥🔥

## `new`

```text
new Constructor()
↓
create object
↓
link prototype
↓
this = object
↓
run constructor
↓
return object
```

## Constructor Function

```text
function Employee(...) {
  this.property = value;
}
```

## Prototype Link

```text
instance
↓
Constructor.prototype
```

## Primitive Return

```text
return 10
→ ignored
→ instance returned
```

## Object Return

```text
return {}
→ returned object wins
```

## Methods

Inside constructor:

```text
new function per instance
```

On prototype:

```text
shared function
```

## `instanceof`

```text
instance instanceof Constructor
```

checks whether:

```text
Constructor.prototype
```

exists in the prototype chain.

## Arrow Function

```text
new arrowFunction()
→ TypeError
```

## Most Important Interview Answer

```text
The new operator creates a fresh object,
links it to the constructor's prototype,
calls the constructor with this pointing
to that object, and then returns the object
unless the constructor explicitly returns
another object.
```

---

# ✅ 7.9 `new` Operator Complete

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
```

Next topic:

```text
7.10 Prototypes + Prototype Chain 🔥🔥🔥
├── prototype
├── [[Prototype]]
├── __proto__ Awareness
├── Property Lookup
├── Object.create()
├── Constructor Functions
├── Shared Methods
└── Inheritance
```

**Next: 7.10 Prototypes + Prototype Chain 🔥🔥🔥**
