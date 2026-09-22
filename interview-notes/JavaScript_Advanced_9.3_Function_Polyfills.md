# 9.3 Function Polyfills 🔥🔥🔥

In this chapter, we will rebuild:

```text
myCall()
myApply()
myBind()
```

These are custom versions of:

```text
Function.prototype.call()
Function.prototype.apply()
Function.prototype.bind()
```

This topic is extremely important because it tests whether you understand:

```text
this
function borrowing
dynamic context
arguments
spread
closures
returned functions
prototype methods
temporary object properties
Symbol
constructor awareness
```

Master mental model:

```text
call
→ execute NOW
→ arguments individually

apply
→ execute NOW
→ arguments in an array-like list

bind
→ do NOT execute now
→ return a new function
→ execute later with fixed this
```

---

# 1. First Understand the Problem 🔥🔥🔥

Suppose we have:

```js
const employee = {
  name:
    "Rahul",
};

function introduce(
  role
) {
  // Step 1: Read name from `this`
  // and role from the function argument.
  return (
    `${this.name} - ${role}`
  );
}
```

The function:

```js
introduce
```

does not belong to `employee`.

So if we call:

```js
introduce(
  "Developer"
);
```

`this.name` may not point to:

```text
employee.name
```

We need a way to say:

```text
Run introduce()
but use employee as this.
```

That is exactly what `call`, `apply`, and `bind` do.

---

# 2. Native `call()` 🔥🔥🔥

`call()` lets us execute a function immediately with a chosen `this`.

Syntax:

```js
functionName.call(
  thisValue,
  arg1,
  arg2,
  arg3
);
```

---

# 3. Native `call()` Example 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

function introduce(
  role,
  city
) {
  // Step 1: Read `name` from the object
  // supplied as `this`.
  // Step 2: Use role and city
  // from the normal function arguments.
  return (
    `${this.name} - ${role} - ${city}`
  );
}

// Step 3: Use employee as `this`.
// Step 4: Pass role and city individually.
const result =
  introduce.call(
    employee,
    "Developer",
    "Mumbai"
  );

// Step 5: Print the final returned string.
console.log(
  result
); // Output: Rahul - Developer - Mumbai
```

Output:

```text
Rahul - Developer - Mumbai
```

---

# 4. Native `call()` Mental Model

This:

```js
introduce.call(
  employee,
  "Developer",
  "Mumbai"
);
```

means conceptually:

```text
temporarily run introduce
as if it belongs to employee
```

You can mentally imagine:

```js
employee.introduce(
  "Developer",
  "Mumbai"
);
```

even though `introduce` is not actually a permanent method of `employee`.

---

# 5. Function Borrowing 🔥🔥🔥

One object can borrow another object's method.

```js
const employee1 = {
  name:
    "Rahul",

  introduce() {
    // Step 1: Return this object's name.
    return (
      `Hi ${this.name}`
    );
  },
};

const employee2 = {
  name:
    "Priya",
};

// Step 2: Borrow employee1.introduce
// and run it using employee2 as `this`.
const result =
  employee1
    .introduce
    .call(
      employee2
    );

// Step 3: Print borrowed-method result.
console.log(
  result
); // Output: Hi Priya
```

Output:

```text
Hi Priya
```

---

# 6. What Does `call()` Really Need to Do?

Our custom `myCall()` must:

```text
1. receive the object that should become `this`

2. temporarily attach the current function to that object

3. call the function through that object

4. pass arguments

5. store returned value

6. remove temporary property

7. return final value
```

---

# 7. Why Attach Function to the Object? 🔥🔥🔥

Remember:

```js
const employee = {
  name:
    "Rahul",

  showName() {
    // Step 1: Because showName is called
    // as employee.showName(),
    // `this` becomes employee.
    return this.name;
  },
};
```

When we call:

```js
employee.showName();
```

JavaScript sets:

```text
this = employee
```

So our polyfill can use the same idea.

---

# 8. First Simple `myCall()` 🔥🔥🔥

```js
Function.prototype.myCall =
  function (
    context,
    ...args
  ) {
    // Step 1: `this` is the function
    // on which myCall() was called.
    const fn =
      this;

    // Step 2: Temporarily add that function
    // as a property of the context object.
    context.tempFn =
      fn;

    // Step 3: Call the temporary method
    // through the context object.
    // Because we call context.tempFn(),
    // inside fn, `this` becomes context.
    const result =
      context.tempFn(
        ...args
      );

    // Step 4: Remove the temporary property
    // so we do not permanently change the object.
    delete context.tempFn;

    // Step 5: Return whatever the original
    // function returned.
    return result;
  };
```

---

# 9. Test Simple `myCall()` 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

function introduce(
  role
) {
  // Step 1: Read name from `this`.
  return (
    `${this.name} - ${role}`
  );
}

// Step 2: myCall receives employee as context.
// Inside myCall:
// context = employee
// fn = introduce
const result =
  introduce.myCall(
    employee,
    "Developer"
  );

// Step 3: Print returned result.
console.log(
  result
); // Output: Rahul - Developer
```

Output:

```text
Rahul - Developer
```

---

# 10. Internal Trace of Simple `myCall()` 🔥🔥🔥

Start:

```text
introduce.myCall(employee, "Developer")
```

Inside `myCall`:

```text
this
↓
introduce function
```

So:

```text
fn = introduce
context = employee
args = ["Developer"]
```

Then:

```text
employee.tempFn = introduce
```

Object becomes temporarily:

```js
{
  name:
    "Rahul",

  tempFn:
    introduce,
}
```

Then:

```js
employee.tempFn(
  "Developer"
);
```

Because function is called through `employee`:

```text
this = employee
```

Result:

```text
Rahul - Developer
```

Then:

```text
delete employee.tempFn
```

Original object is restored.

---

# 11. Problem With `tempFn` Property 🔥🔥🔥

What if the object already has:

```js
tempFn
```

?

Then our polyfill would overwrite it.

Example:

```js
const employee = {
  name:
    "Rahul",

  tempFn:
    "Important value",
};
```

Our implementation would destroy that property.

So we need a unique property key.

---

# 12. Use `Symbol()` to Avoid Collision 🔥🔥🔥

A Symbol creates a unique key.

```js
// Step 1: Create two Symbols
// with the same description.
const first =
  Symbol(
    "fn"
  );

const second =
  Symbol(
    "fn"
  );

// Step 2: Symbols are still unique.
console.log(
  first
  ===
  second
); // Output: false
```

Output:

```text
false
```

So a Symbol is safer for our temporary method.

---

# 13. Better `myCall()` With Symbol 🔥🔥🔥

```js
Function.prototype.myCall =
  function (
    context,
    ...args
  ) {
    // Step 1: Save the function
    // on which myCall was invoked.
    const fn =
      this;

    // Step 2: Convert null/undefined
    // into globalThis for this simplified polyfill.
    // Otherwise convert primitive values
    // into wrapper objects.
    const target =
      context
      == null
        ? globalThis
        : Object(
            context
          );

    // Step 3: Create a unique property key.
    // This prevents accidental collision
    // with existing object properties.
    const fnKey =
      Symbol(
        "fn"
      );

    // Step 4: Temporarily attach the function
    // to the target object.
    target[fnKey] =
      fn;

    // Step 5: Call it through target.
    // This makes `this` inside fn equal target.
    const result =
      target[fnKey](
        ...args
      );

    // Step 6: Remove the temporary method.
    delete target[fnKey];

    // Step 7: Return the original function's result.
    return result;
  };
```

---

# 14. Why `Object(context)`? 🔥🔥🔥

`call()` can also work with primitive values.

Example concept:

```text
"hello"
↓
String object wrapper

10
↓
Number object wrapper
```

`Object(context)` helps our simplified polyfill handle such values more safely.

---

# 15. `null` and `undefined` Awareness

In non-strict native function calls, `call(null)` or `call(undefined)` can use the global object.

In strict mode, `this` behavior differs.

For this interview polyfill we use:

```js
context
== null
  ? globalThis
  : Object(
      context
    );
```

This is a practical simplified approach.

Do not claim it reproduces every ECMAScript internal detail exactly.

---

# 16. `myCall()` With Multiple Arguments 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

function describe(
  role,
  city,
  experience
) {
  // Step 1: Build a string
  // from this.name and all arguments.
  return (
    `${this.name}, ${role}, ${city}, ${experience} years`
  );
}

// Step 2: Pass arguments individually.
const result =
  describe.myCall(
    employee,
    "Developer",
    "Mumbai",
    10
  );

// Step 3: Print returned text.
console.log(
  result
); // Output: Rahul, Developer, Mumbai, 10 years
```

Output:

```text
Rahul, Developer, Mumbai, 10 years
```

---

# 17. `call()` Key Rule 🔥🔥🔥

Remember:

```text
call
→ executes immediately
→ arguments individually
```

Example:

```js
fn.call(
  object,
  10,
  20,
  30
);
```

---

# 18. Native `apply()` 🔥🔥🔥

`apply()` is very similar to `call()`.

Main difference:

```text
call
→ arguments individually

apply
→ arguments as array / array-like list
```

Syntax:

```js
fn.apply(
  thisValue,
  [
    arg1,
    arg2,
    arg3,
  ]
);
```

---

# 19. Native `apply()` Example 🔥🔥🔥

```js
const employee = {
  name:
    "Priya",
};

function introduce(
  role,
  city
) {
  // Step 1: Read this.name
  // and supplied arguments.
  return (
    `${this.name} - ${role} - ${city}`
  );
}

// Step 2: employee becomes `this`.
// Step 3: role and city are supplied
// inside one array.
const result =
  introduce.apply(
    employee,
    [
      "Tester",
      "Pune",
    ]
  );

// Step 4: Print returned result.
console.log(
  result
); // Output: Priya - Tester - Pune
```

Output:

```text
Priya - Tester - Pune
```

---

# 20. Call vs Apply 🔥🔥🔥

```js
fn.call(
  obj,
  1,
  2,
  3
);
```

vs:

```js
fn.apply(
  obj,
  [
    1,
    2,
    3,
  ]
);
```

Only the argument format changes.

---

# 21. Build `myApply()` Step by Step 🔥🔥🔥

```js
Function.prototype.myApply =
  function (
    context,
    args = []
  ) {
    // Step 1: Save the original function.
    const fn =
      this;

    // Step 2: Prepare the target object.
    const target =
      context
      == null
        ? globalThis
        : Object(
            context
          );

    // Step 3: Create a unique temporary key.
    const fnKey =
      Symbol(
        "fn"
      );

    // Step 4: Attach the function
    // temporarily to target.
    target[fnKey] =
      fn;

    // Step 5: Spread the provided argument array
    // into individual function arguments.
    const result =
      target[fnKey](
        ...args
      );

    // Step 6: Remove temporary property.
    delete target[fnKey];

    // Step 7: Return original function result.
    return result;
  };
```

---

# 22. Test `myApply()` 🔥🔥🔥

```js
const employee = {
  name:
    "Priya",
};

function describe(
  role,
  city
) {
  // Step 1: Build string
  // using this.name and arguments.
  return (
    `${this.name} - ${role} - ${city}`
  );
}

// Step 2: Pass role and city
// inside one array.
const result =
  describe.myApply(
    employee,
    [
      "Tester",
      "Pune",
    ]
  );

// Step 3: Print final result.
console.log(
  result
); // Output: Priya - Tester - Pune
```

Output:

```text
Priya - Tester - Pune
```

---

# 23. Why Does `...args` Work Here?

Suppose:

```text
args = ["Tester", "Pune"]
```

Then:

```js
target[fnKey](
  ...args
);
```

becomes conceptually:

```js
target[fnKey](
  "Tester",
  "Pune"
);
```

That is exactly what we want.

---

# 24. `apply()` Real Use Case — Math.max 🔥🔥🔥

Historically, `apply()` was commonly used to pass array values as separate arguments.

```js
const numbers = [
  10,
  50,
  20,
];

// Step 1: Math.max expects separate numbers.
// apply spreads array values conceptually.
const maximum =
  Math.max.apply(
    null,
    numbers
  );

// Step 2: Print maximum value.
console.log(
  maximum
); // Output: 50
```

Output:

```text
50
```

Modern JavaScript often uses:

```js
Math.max(
  ...numbers
);
```

instead.

---

# 25. `apply()` Key Rule

```text
apply
→ executes immediately
→ arguments in array-like form
```

---

# 26. Native `bind()` 🔥🔥🔥

`bind()` is different.

`bind()` does **not** execute the function immediately.

Instead:

```text
bind
↓
creates a new function
↓
that new function remembers `this`
↓
you call it later
```

---

# 27. Native `bind()` Example 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

function introduce(
  role
) {
  // Step 1: Use bound this.name
  // and later role argument.
  return (
    `${this.name} - ${role}`
  );
}

// Step 2: bind does NOT execute introduce.
// It returns a new function
// with employee permanently attached as `this`.
const boundIntroduce =
  introduce.bind(
    employee
  );

// Step 3: Call the returned function later.
const result =
  boundIntroduce(
    "Developer"
  );

// Step 4: Print final returned text.
console.log(
  result
); // Output: Rahul - Developer
```

Output:

```text
Rahul - Developer
```

---

# 28. Bind Mental Model 🔥🔥🔥

```text
introduce.bind(employee)
↓
returns new function

new function remembers:
this = employee

later:
boundIntroduce("Developer")
↓
introduce runs
with this = employee
```

---

# 29. Why Is Bind Useful?

Common real-world issue:

```js
const employee = {
  name:
    "Rahul",

  showName() {
    // Step 1: Return current object's name.
    return this.name;
  },
};
```

If we detach the method:

```js
const fn =
  employee.showName;
```

we lose the original calling object.

`bind()` fixes that by permanently attaching `employee` as `this`.

---

# 30. Lost `this` Example 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",

  showName() {
    // Step 1: Read this.name.
    return this.name;
  },
};

// Step 2: Store method in standalone variable.
// It is no longer called as employee.showName().
const standalone =
  employee.showName;

// Step 3: In strict mode / module contexts,
// this may be undefined,
// so calling standalone() can fail
// or not access employee as expected.
```

The important point:

```text
function call-site determines `this`
```

unless we explicitly bind it.

---

# 31. Fix Lost `this` With `bind()` 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",

  showName() {
    // Step 1: Return name from bound object.
    return this.name;
  },
};

// Step 2: Create a new function
// permanently bound to employee.
const standalone =
  employee
    .showName
    .bind(
      employee
    );

// Step 3: Call it without employee.
// Bound `this` is still employee.
console.log(
  standalone()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 32. Build Simple `myBind()` 🔥🔥🔥

```js
Function.prototype.myBind =
  function (
    context,
    ...boundArgs
  ) {
    // Step 1: Save the original function.
    const fn =
      this;

    // Step 2: Return a brand-new function.
    // bind must NOT execute fn yet.
    return function (
      ...laterArgs
    ) {
      // Step 3: When the returned function
      // is finally called,
      // execute fn with fixed context.
      return fn.apply(
        context,
        [
          ...boundArgs,
          ...laterArgs,
        ]
      );
    };
  };
```

---

# 33. Why Does `myBind()` Need Closure? 🔥🔥🔥

Because the returned function must remember:

```text
fn
context
boundArgs
```

after `myBind()` has finished.

That is closure.

---

# 34. Test Simple `myBind()` 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

function introduce(
  role,
  city
) {
  // Step 1: Use bound this.name
  // and provided arguments.
  return (
    `${this.name} - ${role} - ${city}`
  );
}

// Step 2: Bind employee as `this`.
// Step 3: Also pre-bind role = "Developer".
const boundIntroduce =
  introduce.myBind(
    employee,
    "Developer"
  );

// Step 4: Call returned function later.
// "Mumbai" becomes the remaining city argument.
const result =
  boundIntroduce(
    "Mumbai"
  );

// Step 5: Print result.
console.log(
  result
); // Output: Rahul - Developer - Mumbai
```

Output:

```text
Rahul - Developer - Mumbai
```

---

# 35. Bound Arguments + Later Arguments 🔥🔥🔥

This is called:

```text
partial application
```

Example:

```js
introduce.bind(
  employee,
  "Developer"
);
```

stores:

```text
role = "Developer"
```

Later:

```js
boundIntroduce(
  "Mumbai"
);
```

provides:

```text
city = "Mumbai"
```

Final arguments:

```text
["Developer", "Mumbai"]
```

---

# 36. Internal Trace of `myBind()` 🔥🔥🔥

Call:

```text
introduce.myBind(employee, "Developer")
```

Inside `myBind`:

```text
fn = introduce
context = employee
boundArgs = ["Developer"]
```

It returns a new function.

Later:

```text
boundIntroduce("Mumbai")
```

Inside returned function:

```text
laterArgs = ["Mumbai"]
```

Combined:

```text
[
  ...boundArgs,
  ...laterArgs
]
```

becomes:

```text
["Developer", "Mumbai"]
```

Then:

```js
fn.apply(
  employee,
  [
    "Developer",
    "Mumbai",
  ]
);
```

Final output:

```text
Rahul - Developer - Mumbai
```

---

# 37. Call vs Apply vs Bind 🔥🔥🔥

| Method | Executes now? | How arguments are passed | Returns |
|---|---:|---|---|
| `call` | Yes | Individually | Function result |
| `apply` | Yes | Array / array-like | Function result |
| `bind` | No | Can pre-bind + later args | New function |

---

# 38. Easy Memory Trick 🔥🔥🔥

```text
CALL
→ Call Now

APPLY
→ Apply Now with Array

BIND
→ Bind Now, Call Later
```

---

# 39. Common Interview Question — `call` vs `apply`

Good answer:

```text
Both execute the function immediately
with an explicitly supplied `this`.

call accepts arguments individually.

apply accepts arguments
as an array or array-like collection.
```

---

# 40. Common Interview Question — `bind`

Good answer:

```text
bind does not execute immediately.

It returns a new function
with `this` permanently associated
with the provided context.

It can also pre-bind arguments.
```

---

# 41. Why `bind()` Is Different Internally 🔥🔥🔥

`call` and `apply`:

```text
execute original function now
```

So they can directly return:

```text
original function result
```

`bind`:

```text
must return another function
```

because execution happens later.

That is why closure is essential for `bind`.

---

# 42. `call()` Return Value 🔥🔥🔥

```js
function add(
  a,
  b
) {
  // Step 1: Return sum.
  return (
    a + b
  );
}

// Step 2: call() immediately executes add.
const result =
  add.call(
    null,
    10,
    20
  );

// Step 3: call() returns add's result.
console.log(
  result
); // Output: 30
```

Output:

```text
30
```

Our `myCall()` must also return the original function result.

---

# 43. `apply()` Return Value

```js
function multiply(
  a,
  b
) {
  // Step 1: Return product.
  return (
    a * b
  );
}

// Step 2: apply executes immediately.
const result =
  multiply.apply(
    null,
    [
      4,
      5,
    ]
  );

// Step 3: Print returned product.
console.log(
  result
); // Output: 20
```

Output:

```text
20
```

# 44. `bind()` Return Value 🔥🔥🔥

Important distinction:

```js
function add(
  a,
  b
) {
  // Step 1: Return sum.
  return (
    a + b
  );
}

// Step 2: bind returns a FUNCTION,
// not the final sum.
const boundAdd =
  add.bind(
    null,
    10
  );

// Step 3: Verify result of bind is a function.
console.log(
  typeof boundAdd
); // Output: function

// Step 4: Call returned function later.
console.log(
  boundAdd(
    20
  )
); // Output: 30
```

Output:

```text
function
30
```

---

# 45. `this` Is Determined by Call Site 🔥🔥🔥

Example:

```js
const employee = {
  name:
    "Rahul",

  show() {
    // Step 1: Return current this.name.
    return this.name;
  },
};

// Step 2: Called through employee,
// so this = employee.
console.log(
  employee.show()
); // Output: Rahul
```

Mental model:

```text
object.method()
↓
this = object
```

`call/apply/bind` let us override that.

---

# 46. Arrow Functions and `this` 🔥🔥🔥

Arrow functions do not create their own dynamic `this`.

Example:

```js
const employee = {
  name:
    "Rahul",

  show:
    () => {
      // Step 1: Arrow uses lexical `this`,
      // not employee as dynamic receiver.
      return this?.name;
    },
};
```

So doing:

```js
employee.show.call(
  anotherObject
);
```

does not rebind an arrow function's lexical `this` the same way it does for a normal function.

Important interview rule:

```text
call/apply/bind cannot change
an arrow function's lexical this
```

---

# 47. Demonstrate Arrow Function Binding Awareness

```js
const context = {
  name:
    "Rahul",
};

const arrow =
  () => {
    // Step 1: Arrow does not use
    // dynamic this from call().
    return this?.name;
  };

// Step 2: call cannot force
// arrow's lexical this to context.
const result =
  arrow.call(
    context
  );

// Step 3: Output depends on lexical environment,
// not context.name.
console.log(
  result
);
```

Do not memorize a fixed output here across all environments.

The key interview point is:

```text
call/apply/bind cannot dynamically rebind arrow `this`
```

---

# 48. Why Our Prototype Polyfills Use Normal Functions 🔥🔥🔥

We write:

```js
Function.prototype.myCall =
  function (...) {
```

not:

```js
Function.prototype.myCall =
  (...) => {
```

Why?

Because inside:

```js
someFunction.myCall(...)
```

we need:

```text
this = someFunction
```

A normal function gets dynamic `this`.

An arrow function would not.

---

# 49. Callback Validation Awareness

A robust polyfill should verify that:

```text
this
```

is actually callable.

Example:

```js
if (
  typeof this
  !==
  "function"
) {
  throw new TypeError(
    "myCall must be called on a function"
  );
}
```

For interviews, mentioning this is a good improvement.

---

# 50. Improved `myCall()` With Validation 🔥🔥🔥

```js
Function.prototype.myCall =
  function (
    context,
    ...args
  ) {
    // Step 1: Ensure myCall is being used
    // on a function.
    if (
      typeof this
      !==
      "function"
    ) {
      throw new TypeError(
        "myCall must be called on a function"
      );
    }

    // Step 2: Save the original function.
    const fn =
      this;

    // Step 3: Prepare context object.
    const target =
      context
      == null
        ? globalThis
        : Object(
            context
          );

    // Step 4: Create unique temporary key.
    const key =
      Symbol(
        "fn"
      );

    // Step 5: Attach function temporarily.
    target[key] =
      fn;

    try {
      // Step 6: Execute function
      // through target so this = target.
      return target[key](
        ...args
      );
    } finally {
      // Step 7: Always remove temporary property,
      // even if the original function throws.
      delete target[key];
    }
  };
```

---

# 51. Why Use `try/finally` in `myCall()`? 🔥🔥🔥

Suppose original function throws an error.

Without `finally`:

```text
temporary Symbol property
may remain on the object
```

With:

```js
try {
  ...
} finally {
  delete target[key];
}
```

cleanup always happens.

This is a stronger implementation.

---

# 52. Improved `myApply()` 🔥🔥🔥

```js
Function.prototype.myApply =
  function (
    context,
    args = []
  ) {
    // Step 1: Ensure this value is callable.
    if (
      typeof this
      !==
      "function"
    ) {
      throw new TypeError(
        "myApply must be called on a function"
      );
    }

    // Step 2: Save original function.
    const fn =
      this;

    // Step 3: Prepare context.
    const target =
      context
      == null
        ? globalThis
        : Object(
            context
          );

    // Step 4: Create unique temporary key.
    const key =
      Symbol(
        "fn"
      );

    // Step 5: Attach function temporarily.
    target[key] =
      fn;

    try {
      // Step 6: Spread argument list
      // and execute immediately.
      return target[key](
        ...args
      );
    } finally {
      // Step 7: Remove temporary property.
      delete target[key];
    }
  };
```

---

# 53. `myApply()` With Empty Arguments

```js
const employee = {
  name:
    "Rahul",
};

function showName() {
  // Step 1: Return this.name.
  return this.name;
}

// Step 2: No argument array needed.
const result =
  showName.myApply(
    employee
  );

// Step 3: Print result.
console.log(
  result
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 54. Improved `myBind()` 🔥🔥🔥

```js
Function.prototype.myBind =
  function (
    context,
    ...boundArgs
  ) {
    // Step 1: Validate that myBind
    // is called on a function.
    if (
      typeof this
      !==
      "function"
    ) {
      throw new TypeError(
        "myBind must be called on a function"
      );
    }

    // Step 2: Save the original function.
    const fn =
      this;

    // Step 3: Return a new function.
    return function (
      ...laterArgs
    ) {
      // Step 4: Combine pre-bound arguments
      // with arguments supplied later.
      const finalArgs = [
        ...boundArgs,
        ...laterArgs,
      ];

      // Step 5: Execute original function
      // with fixed context.
      return fn.apply(
        context,
        finalArgs
      );
    };
  };
```

---

# 55. Bind With Partial Arguments 🔥🔥🔥

```js
function calculate(
  a,
  b,
  c
) {
  // Step 1: Add all values.
  return (
    a + b + c
  );
}

// Step 2: Pre-bind a = 10 and b = 20.
const addLater =
  calculate.myBind(
    null,
    10,
    20
  );

// Step 3: Supply only c later.
const result =
  addLater(
    30
  );

// Step 4: Print final sum.
console.log(
  result
); // Output: 60
```

Output:

```text
60
```

Flow:

```text
boundArgs
=
[10, 20]

laterArgs
=
[30]

finalArgs
=
[10, 20, 30]

calculate(...)
=
60
```

---

# 56. Bind Used With Event Handlers 🔥🔥🔥

Classic example:

```js
const employee = {
  name:
    "Rahul",

  handleClick() {
    // Step 1: Use this.name.
    console.log(
      this.name
    );
  },
};
```

If an event system calls `handleClick` separately, `this` may be lost.

A common fix:

```js
const boundHandler =
  employee
    .handleClick
    .bind(
      employee
    );
```

Now `boundHandler` remembers `employee`.

---

# 57. Bind and Class Methods Awareness

In classes, developers often bind methods:

```js
this.handleClick =
  this.handleClick.bind(
    this
  );
```

This ensures the method keeps the instance as `this` when passed around.

Modern React function components use hooks instead, but the JavaScript concept is still important.

---

# 58. Constructor Problem With Simple `myBind()` 🔥🔥🔥

Native `bind()` has an advanced behavior:

A bound function can be used with:

```js
new
```

Example:

```js
function Employee(
  name
) {
  // Step 1: Assign name to new instance.
  this.name =
    name;
}

const BoundEmployee =
  Employee.bind(
    {
      ignored:
        true,
    },
    "Rahul"
  );

// Step 2: Using new creates a new object.
// The bound context object is ignored
// for constructor invocation.
const employee =
  new BoundEmployee();

// Step 3: New instance receives name.
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

Our simple `myBind()` does **not** fully reproduce this constructor behavior.

---

# 59. Why Constructor-Aware Bind Is Harder

Native bind must distinguish:

```text
normal call
vs
new boundFunction()
```

When called normally:

```text
use bound context
```

When called with `new`:

```text
use newly created instance as this
```

This is advanced interview territory.

---

# 60. Constructor-Aware `myBind()` 🔥🔥🔥

```js
Function.prototype.myBind =
  function (
    context,
    ...boundArgs
  ) {
    // Step 1: Save original function.
    const fn =
      this;

    // Step 2: Create the function
    // that will be returned by myBind.
    function boundFunction(
      ...laterArgs
    ) {
      // Step 3: Detect whether boundFunction
      // was called with `new`.
      const isCalledWithNew =
        this
        instanceof
        boundFunction;

      // Step 4: If called with new,
      // use the new instance as this.
      // Otherwise use the originally bound context.
      const finalContext =
        isCalledWithNew
          ? this
          : context;

      // Step 5: Combine bound and later arguments.
      const finalArgs = [
        ...boundArgs,
        ...laterArgs,
      ];

      // Step 6: Execute original function
      // with the correct context.
      return fn.apply(
        finalContext,
        finalArgs
      );
    }

    // Step 7: If original function has a prototype,
    // connect boundFunction's prototype
    // so instances can access original prototype methods.
    if (
      fn.prototype
    ) {
      boundFunction.prototype =
        Object.create(
          fn.prototype
        );
    }

    // Step 8: Return the bound function.
    return boundFunction;
  };
```

This is still an interview-level approximation, not a complete ECMAScript engine implementation.

---

# 61. Test Constructor-Aware `myBind()` 🔥🔥🔥

```js
function Employee(
  name,
  role
) {
  // Step 1: Assign values
  // to whichever object becomes this.
  this.name =
    name;

  this.role =
    role;
}

Employee.prototype.describe =
  function () {
    // Step 2: Read instance properties.
    return (
      `${this.name} - ${this.role}`
    );
  };

// Step 3: Pre-bind the first argument.
const BoundEmployee =
  Employee.myBind(
    {
      ignored:
        true,
    },
    "Rahul"
  );

// Step 4: Call with new.
// New instance should become `this`.
const employee =
  new BoundEmployee(
    "Developer"
  );

// Step 5: Print instance values.
console.log(
  employee.name
); // Output: Rahul

console.log(
  employee.role
); // Output: Developer

// Step 6: Prototype method should also work.
console.log(
  employee.describe()
); // Output: Rahul - Developer
```

Output:

```text
Rahul
Developer
Rahul - Developer
```

---

# 62. Why Bound Context Is Ignored With `new`

Native-style rule:

```text
bind normally fixes this
```

but:

```text
new boundFunction()
```

creates a new object, and that new object becomes the constructor's `this`.

This is an important advanced interview trap.

---

# 63. `instanceof` Awareness

In constructor-aware bind:

```js
this
instanceof
boundFunction
```

helps detect:

```text
Was this function invoked using new?
```

That allows us to switch context behavior.

---

# 64. `call()` Cannot Permanently Bind `this`

Example:

```js
fn.call(
  obj
);
```

only affects:

```text
that one invocation
```

Next normal call:

```js
fn();
```

does not remember `obj`.

---

# 65. `bind()` Permanently Stores Context 🔥🔥🔥

Example:

```js
const bound =
  fn.bind(
    obj
  );
```

Now every normal call:

```js
bound();
bound();
bound();
```

uses:

```text
obj as this
```

unless constructor invocation rules apply.

---

# 66. Can You Re-Bind an Already Bound Function? 🔥🔥🔥

Native behavior:

```js
const first =
  fn.bind(
    obj1
  );

const second =
  first.bind(
    obj2
  );
```

The original bound `this` generally stays:

```text
obj1
```

`obj2` does not replace it.

Arguments can still be further pre-bound.

This is a common interview question.

---

# 67. Bound Function Argument Accumulation

```js
function add(
  a,
  b,
  c
) {
  // Step 1: Return total.
  return (
    a + b + c
  );
}

// Step 2: Bind first argument.
const first =
  add.bind(
    null,
    10
  );

// Step 3: Bind another argument
// on the already bound function.
const second =
  first.bind(
    null,
    20
  );

// Step 4: Supply final argument.
console.log(
  second(
    30
  )
); // Output: 60
```

Output:

```text
60
```

Arguments accumulate.

---

# 68. Interview Trap — Arrow + Bind 🔥🔥🔥

```js
const obj = {
  value:
    100,
};

const arrow =
  () => {
    return this?.value;
  };

const bound =
  arrow.bind(
    obj
  );
```

Important answer:

```text
bind does not dynamically change
an arrow function's lexical this
```

Do not rely on `obj.value` appearing.

---

# 69. Interview Trap — Method Borrowing

```js
const user1 = {
  name:
    "Rahul",

  greet(
    message
  ) {
    // Step 1: Use this.name
    // and normal argument.
    return (
      `${message} ${this.name}`
    );
  },
};

const user2 = {
  name:
    "Priya",
};

// Step 2: Borrow greet from user1
// but execute with user2.
const result =
  user1.greet.call(
    user2,
    "Hello"
  );

// Step 3: Print result.
console.log(
  result
); // Output: Hello Priya
```

Output:

```text
Hello Priya
```

---

# 70. Interview Trap — `call()` vs Direct Method Call

```js
const user = {
  name:
    "Rahul",

  greet() {
    return this.name;
  },
};
```

Direct:

```js
user.greet();
```

means:

```text
this = user
```

Borrowed:

```js
user.greet.call(
  otherUser
);
```

means:

```text
this = otherUser
```

So `call()` overrides the normal receiver.

---

# 71. Interview Question — How Would You Implement `call()`? 🔥🔥🔥

Good answer:

```text
I take the function from `this`,
temporarily attach it to the target object
using a unique Symbol key,
invoke it through that object
so the target becomes `this`,
then remove the temporary property
and return the original function result.

I use try/finally
so cleanup still happens if the function throws.
```

---

# 72. Interview Question — How Would You Implement `apply()`?

Good answer:

```text
The logic is almost identical to call.

The main difference is that apply receives
arguments as an array or array-like collection,
so I spread those values when invoking the function.
```

---

# 73. Interview Question — How Would You Implement `bind()`? 🔥🔥🔥

Good answer:

```text
Bind must return a new function
instead of executing immediately.

The returned function closes over
the original function,
the bound context,
and any pre-bound arguments.

When called later,
it combines pre-bound and new arguments
and invokes the original function with the bound context.
```

---

# 74. Interview Question — Why Use Symbol in `myCall()`?

```text
To avoid overwriting
an existing property on the target object.

Each Symbol is unique,
so it is a safe temporary key.
```

---

# 75. Interview Question — Why Use `try/finally`? 🔥🔥🔥

```text
The temporary property must be removed
even if the original function throws.

finally guarantees cleanup.
```

---

# 76. Interview Question — `call` vs `bind`

```text
call
→ executes now
→ returns function result

bind
→ does not execute now
→ returns new function
```

---

# 77. Interview Question — `apply` vs Spread Syntax

Older style:

```js
Math.max.apply(
  null,
  numbers
);
```

Modern style:

```js
Math.max(
  ...numbers
);
```

Spread syntax often makes `apply` unnecessary just for argument spreading.

But `apply` is still important for explicit `this` control and interview understanding.

---

# 78. Debugging Checklist 🔥🔥🔥

```text
CALL / APPLY

Did I save the original function from `this`?

Did I prepare the context object?

Did I avoid property collisions?

Did I execute through the context object?

Did I pass arguments correctly?

Did I return the original result?

Did I clean up temporary property?

Did I use try/finally?


BIND

Did I return a function instead of executing now?

Did closure preserve the original function?

Did closure preserve context?

Did I preserve pre-bound arguments?

Did I append later arguments?

Do I need constructor/new behavior?

Am I trying to bind an arrow function's this?
```

---

# 79. Machine-Coding Decision Guide 🔥🔥🔥

```text
Need to run function now
with a specific this?
→ call

Need same,
but arguments already in array?
→ apply

Need a reusable function
that remembers this?
→ bind

Need to preconfigure arguments?
→ bind

Need temporary method borrowing?
→ call / apply
```

---

# 80. Final Master Code — `myCall()` 🔥🔥🔥

```js
Function.prototype.myCall =
  function (
    context,
    ...args
  ) {
    // Step 1: Ensure current value is a function.
    if (
      typeof this
      !==
      "function"
    ) {
      throw new TypeError(
        "myCall must be called on a function"
      );
    }

    // Step 2: Save original function.
    const fn =
      this;

    // Step 3: Normalize context.
    const target =
      context
      == null
        ? globalThis
        : Object(
            context
          );

    // Step 4: Create collision-safe key.
    const key =
      Symbol(
        "fn"
      );

    // Step 5: Temporarily attach function.
    target[key] =
      fn;

    try {
      // Step 6: Execute immediately
      // with target as this.
      return target[key](
        ...args
      );
    } finally {
      // Step 7: Always clean up.
      delete target[key];
    }
  };
```

---

# 81. Final Master Code — `myApply()` 🔥🔥🔥

```js
Function.prototype.myApply =
  function (
    context,
    args = []
  ) {
    // Step 1: Validate callable.
    if (
      typeof this
      !==
      "function"
    ) {
      throw new TypeError(
        "myApply must be called on a function"
      );
    }

    // Step 2: Save original function.
    const fn =
      this;

    // Step 3: Normalize context.
    const target =
      context
      == null
        ? globalThis
        : Object(
            context
          );

    // Step 4: Create unique temporary key.
    const key =
      Symbol(
        "fn"
      );

    // Step 5: Attach function.
    target[key] =
      fn;

    try {
      // Step 6: Spread array arguments
      // and execute immediately.
      return target[key](
        ...args
      );
    } finally {
      // Step 7: Remove temporary property.
      delete target[key];
    }
  };
```

---

# 82. Final Master Code — Simple `myBind()` 🔥🔥🔥

```js
Function.prototype.myBind =
  function (
    context,
    ...boundArgs
  ) {
    // Step 1: Validate callable.
    if (
      typeof this
      !==
      "function"
    ) {
      throw new TypeError(
        "myBind must be called on a function"
      );
    }

    // Step 2: Save original function.
    const fn =
      this;

    // Step 3: Return a function
    // instead of executing now.
    return function (
      ...laterArgs
    ) {
      // Step 4: Merge pre-bound
      // and later arguments.
      const finalArgs = [
        ...boundArgs,
        ...laterArgs,
      ];

      // Step 5: Execute original function
      // using fixed context.
      return fn.apply(
        context,
        finalArgs
      );
    };
  };
```

---

# 83. Final Master Test 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

function describe(
  role,
  city
) {
  // Step 1: Build text
  // using this.name and arguments.
  return (
    `${this.name} - ${role} - ${city}`
  );
}

// Step 2: myCall executes immediately
// with individual arguments.
console.log(
  describe.myCall(
    employee,
    "Developer",
    "Mumbai"
  )
); // Output: Rahul - Developer - Mumbai

// Step 3: myApply executes immediately
// with arguments inside an array.
console.log(
  describe.myApply(
    employee,
    [
      "Developer",
      "Mumbai",
    ]
  )
); // Output: Rahul - Developer - Mumbai

// Step 4: myBind does NOT execute yet.
// It returns a new function
// and pre-binds role.
const boundDescribe =
  describe.myBind(
    employee,
    "Developer"
  );

// Step 5: Call bound function later
// with the remaining city argument.
console.log(
  boundDescribe(
    "Mumbai"
  )
); // Output: Rahul - Developer - Mumbai
```

Output:

```text
Rahul - Developer - Mumbai
Rahul - Developer - Mumbai
Rahul - Developer - Mumbai
```

---

# 84. Final Comparison Trace 🔥🔥🔥

For:

```text
describe(employee, role, city)
```

`myCall`:

```text
describe.myCall(
  employee,
  "Developer",
  "Mumbai"
)

↓
execute now
↓
Rahul - Developer - Mumbai
```

`myApply`:

```text
describe.myApply(
  employee,
  [
    "Developer",
    "Mumbai"
  ]
)

↓
execute now
↓
Rahul - Developer - Mumbai
```

`myBind`:

```text
bound =
describe.myBind(
  employee,
  "Developer"
)

↓
returns function

bound("Mumbai")
↓
execute later
↓
Rahul - Developer - Mumbai
```

---

# 85. Quick Memory 🧠🔥🔥🔥

## `call`

```text
execute NOW
arguments individually
```

## `apply`

```text
execute NOW
arguments in array
```

## `bind`

```text
execute LATER
returns new function
```

## `myCall`

```text
function
↓
temporarily attach to object
↓
call through object
↓
cleanup
```

## `myApply`

```text
same as myCall
+
spread argument array
```

## `myBind`

```text
return function
↓
closure remembers:
fn
context
boundArgs
```

## Why Symbol?

```text
avoid property collision
```

## Why Normal Function?

```text
need dynamic this
```

## Arrow Function Rule

```text
call/apply/bind
cannot dynamically replace
an arrow function's lexical this
```

## Bind + `new`

```text
advanced behavior:
new instance becomes this
instead of bound context
```

---

# 86. Best Interview Answer 🔥🔥🔥

```text
call, apply, and bind
are used to control a normal function's `this`.

call executes immediately
and accepts arguments individually.

apply also executes immediately,
but accepts arguments as an array-like list.

bind does not execute immediately.
It returns a new function
that remembers the bound context
and any pre-bound arguments.

To implement call/apply,
I can temporarily attach the original function
to the target object with a unique Symbol,
invoke it through that object,
then remove the temporary property.

To implement bind,
I return a closure that remembers
the original function,
the context,
and bound arguments,
then combines them with later arguments.

For an advanced bind polyfill,
I also consider constructor invocation with `new`,
because native bind uses the new instance as `this`
when the bound function is used as a constructor.
```

---

# ✅ 9.3 Function Polyfills Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ← NEXT
9.5 Data Transformation
9.6 Machine-Coding Utilities
9.7 Promise Implementations
9.8 Event System
9.9 String Utilities
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.4 Build Utilities 🔥🔥🔥
├── flatten
├── flattenDepth
├── groupBy
├── chunk
├── unique
├── deepClone
├── deepEqual
├── deepGet
├── deepSet
├── debounce
├── throttle
├── curry
├── memoize
├── once
├── retry
├── compose
└── pipe
```

**Next: 9.4 Build Utilities 🔥🔥🔥**
