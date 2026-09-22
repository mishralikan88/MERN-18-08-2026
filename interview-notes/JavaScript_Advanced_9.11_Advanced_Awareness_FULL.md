# 9.11 Advanced Awareness — Easy Version 🔥🔥🔥

This chapter is awareness-level.

You do NOT need to master every internal detail.

Goal:

```text
understand what it is
understand why it exists
know basic syntax
know one easy example
know interview-level differences
```

Main topics:

```text
WeakMap
WeakSet
Iterator
Iterable
Symbol.iterator
Generators
yield
Symbols
Well-Known Symbols
Property Descriptors
Object.defineProperty
Getters / Setters
Proxy
Reflect
Private Class Fields
Interview Questions
Output Questions
Common Mistakes
```

---

# 1. Why Learn Advanced Awareness Topics?

Because senior JavaScript interviews may ask:

```text
Map vs WeakMap
Set vs WeakSet
What is iterable?
What is iterator?
How does for...of work?
What is Symbol.iterator?
What is a generator?
What does yield do?
What is Proxy?
What is Reflect?
What are property descriptors?
What are private class fields?
```

You usually do not need to build large projects with all of these.

You should mainly be able to:

```text
recognize them
explain them
show a simple example
compare similar concepts
```

---

# 2. WeakMap 🔥🔥🔥

WeakMap is similar to `Map`, but with important differences.

Main rule:

```text
WeakMap keys must be objects
```

---

# 3. WeakMap Basic Example

```js
const employee = {
  name:
    "Rahul",
};

// Step 1: Create WeakMap.
const weakMap =
  new WeakMap();

// Step 2: Use object as key.
weakMap.set(
  employee,
  "Admin"
);

// Step 3: Read value
// using the same object reference.
console.log(
  weakMap.get(
    employee
  )
); // Output: Admin
```

Output:

```text
Admin
```

---

# 4. Why Must WeakMap Key Be an Object?

WeakMap is designed around:

```text
object lifecycle
+
garbage collection
```

So keys are object references.

```js
const key =
  {};

const weakMap =
  new WeakMap();

// Step 1: Object key works.
weakMap.set(
  key,
  "value"
);
```

---

# 5. Primitive Key Is Not Allowed

```js
const weakMap =
  new WeakMap();

// Step 1: Number is a primitive.
// WeakMap does not accept it as a key.
weakMap.set(
  10,
  "value"
);
```

Output:

```text
TypeError
```

---

# 6. Why Is It Called "Weak"?

Because WeakMap does not strongly keep its key object alive.

```text
object exists somewhere
↓
WeakMap stores metadata for it

all normal references disappear
↓
object may be garbage-collected
```

WeakMap itself does not prevent that collection.

---

# 7. WeakMap Use Case 🔥🔥🔥

```js
const employee = {
  id:
    1,
  name:
    "Rahul",
};

const metadata =
  new WeakMap();

// Step 1: Store extra data
// using employee object as key.
metadata.set(
  employee,
  {
    selected:
      true,
  }
);

// Step 2: Read metadata.
console.log(
  metadata.get(
    employee
  ).selected
); // Output: true
```

Output:

```text
true
```

---

# 8. WeakMap Is Not Iterable 🔥🔥🔥

You cannot normally do:

```js
for (
  const item
  of
  weakMap
) {
}
```

WeakMap does not expose iteration.

---

# 9. Why WeakMap Is Not Iterable?

Because entries can disappear when key objects are garbage-collected.

So there is no:

```text
size
keys()
values()
entries()
```

---

# 10. WeakMap Main Methods

```text
set()
get()
has()
delete()
```

```js
const key =
  {};

const weakMap =
  new WeakMap();

// Step 1: Add value.
weakMap.set(
  key,
  100
);

// Step 2: Check key.
console.log(
  weakMap.has(
    key
  )
); // Output: true

// Step 3: Delete key.
weakMap.delete(
  key
);

// Step 4: Check again.
console.log(
  weakMap.has(
    key
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 11. Map vs WeakMap 🔥🔥🔥

```text
Map
→ keys can be any type
→ iterable
→ has size
→ strong references

WeakMap
→ keys must be objects
→ not iterable
→ no size
→ weak references to keys
```

---

# 12. WeakSet 🔥🔥🔥

WeakSet is similar to `Set`, but it stores objects only.

---

# 13. WeakSet Basic Example

```js
const employee = {
  id:
    1,
};

const weakSet =
  new WeakSet();

// Step 1: Add object.
weakSet.add(
  employee
);

// Step 2: Check same object.
console.log(
  weakSet.has(
    employee
  )
); // Output: true
```

Output:

```text
true
```

---

# 14. WeakSet Does Not Accept Primitive Values

```js
const weakSet =
  new WeakSet();

// Step 1: Number is primitive.
// This throws.
weakSet.add(
  10
);
```

Output:

```text
TypeError
```

---

# 15. WeakSet Use Case

Useful when you want to track:

```text
has this object already been seen?
```

```js
const visited =
  new WeakSet();

const employee = {
  id:
    1,
};

// Step 1: Mark object as visited.
visited.add(
  employee
);

// Step 2: Check it.
console.log(
  visited.has(
    employee
  )
); // Output: true
```

Output:

```text
true
```

---

# 16. Set vs WeakSet 🔥🔥🔥

```text
Set
→ any values
→ iterable
→ size available

WeakSet
→ object values only
→ not iterable
→ no size
→ weak references
```

---

# 17. Iterator 🔥🔥🔥

An iterator gives values one by one.

It has:

```text
next()
```

`next()` returns:

```js
{
  value:
    ...,
  done:
    false
}
```

or when finished:

```js
{
  value:
    undefined,
  done:
    true
}
```

---

# 18. Manual Iterator Example

```js
const iterator = {
  current:
    1,

  next() {
    // Step 1: If current is above 3,
    // iteration is finished.
    if (
      this.current
      >
      3
    ) {
      return {
        value:
          undefined,
        done:
          true,
      };
    }

    // Step 2: Save current value.
    const value =
      this.current;

    // Step 3: Move to next number.
    this.current++;

    // Step 4: Return iterator result.
    return {
      value,
      done:
        false,
    };
  },
};
```

---

# 19. Test Manual Iterator

```js
// Step 1: First item.
console.log(
  iterator.next()
); // Output: { value: 1, done: false }

// Step 2: Second item.
console.log(
  iterator.next()
); // Output: { value: 2, done: false }

// Step 3: Third item.
console.log(
  iterator.next()
); // Output: { value: 3, done: false }

// Step 4: Finished.
console.log(
  iterator.next()
); // Output: { value: undefined, done: true }
```

Output:

```text
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

---

# 20. Iterable 🔥🔥🔥

An iterable is something JavaScript can loop with:

```text
for...of
```

Examples:

```text
Array
String
Map
Set
```

---

# 21. What Makes Something Iterable?

It must have:

```text
Symbol.iterator
```

That method must return an iterator.

```text
iterable
↓
Symbol.iterator()
↓
iterator
↓
next()
↓
values
```

---

# 22. Arrays Are Iterable

```js
const values = [
  10,
  20,
];

// Step 1: Ask array for its iterator.
const iterator =
  values[
    Symbol.iterator
  ]();

// Step 2: Read first value.
console.log(
  iterator.next()
); // Output: { value: 10, done: false }
```

Output:

```text
{ value: 10, done: false }
```

---

# 23. Strings Are Iterable

```js
const text =
  "AB";

// Step 1: Loop string using for...of.
for (
  const char
  of
  text
) {
  console.log(
    char
  );
}

// Output:
// A
// B
```

Output:

```text
A
B
```

---

# 24. Plain Objects Are Not Iterable by Default 🔥🔥🔥

```js
const employee = {
  id:
    1,
  name:
    "Rahul",
};

// Step 1: Plain object
// is not iterable by default.
for (
  const item
  of
  employee
) {
}
```

Output:

```text
TypeError
```

Use:

```text
Object.keys()
Object.values()
Object.entries()
```

instead.

---

# 25. Make Custom Object Iterable 🔥🔥🔥

```js
const range = {
  start:
    1,

  end:
    3,

  [Symbol.iterator]() {
    // Step 1: Start from range.start.
    let current =
      this.start;

    const end =
      this.end;

    // Step 2: Return iterator object.
    return {
      next() {
        // Step 3: Still inside range?
        if (
          current
          <=
          end
        ) {
          return {
            value:
              current++,
            done:
              false,
          };
        }

        // Step 4: Range completed.
        return {
          value:
            undefined,
          done:
            true,
        };
      },
    };
  },
};
```

---

# 26. Test Custom Iterable

```js
// Step 1: for...of uses Symbol.iterator.
for (
  const value
  of
  range
) {
  console.log(
    value
  );
}

// Output:
// 1
// 2
// 3
```

Output:

```text
1
2
3
```

---

# 27. Symbol 🔥🔥🔥

Symbol creates a unique primitive value.

```js
const first =
  Symbol(
    "id"
  );

const second =
  Symbol(
    "id"
  );

// Step 1: Same description,
// but different Symbols.
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

---

# 28. Why Use Symbol?

Useful when you need:

```text
unique property keys
special built-in behavior hooks
avoid property-name collisions
```

---

# 29. Symbol as Object Key

```js
const idKey =
  Symbol(
    "id"
  );

const employee = {
  name:
    "Rahul",

  // Step 1: Symbol is a unique property key.
  [
    idKey
  ]:
    101,
};

// Step 2: Read Symbol property.
console.log(
  employee[
    idKey
  ]
); // Output: 101
```

Output:

```text
101
```

---

# 30. Symbol Properties and Object.keys()

```js
const idKey =
  Symbol(
    "id"
  );

const employee = {
  name:
    "Rahul",

  [
    idKey
  ]:
    101,
};

// Step 1: Object.keys()
// does not include Symbol keys.
console.log(
  Object.keys(
    employee
  )
); // Output: ["name"]
```

Output:

```text
["name"]
```

---

# 31. Get Symbol Keys

```js
const symbols =
  Object.getOwnPropertySymbols(
    employee
  );

// Step 1: Print Symbol-key count.
console.log(
  symbols.length
); // Output: 1
```

Output:

```text
1
```

---

# 32. Well-Known Symbols 🔥🔥🔥

JavaScript has built-in special Symbols.

Examples:

```text
Symbol.iterator
Symbol.toStringTag
Symbol.toPrimitive
```

Most important for this chapter:

```text
Symbol.iterator
```

because it controls iteration.

---

# 33. Generator Function 🔥🔥🔥

A generator is a special function that can pause and continue.

Syntax:

```js
function* generatorName() {
}
```

The `*` makes it a generator function.

---

# 34. `yield`

Inside a generator:

```text
yield
```

means:

```text
pause here
return a value
continue later
```

---

# 35. Simple Generator

```js
function* numbers() {
  // Step 1: Pause and return 1.
  yield 1;

  // Step 2: Resume and return 2.
  yield 2;

  // Step 3: Resume and return 3.
  yield 3;
}
```

---

# 36. Generator Returns an Iterator

```js
// Step 1: Calling generator
// returns an iterator.
const iterator =
  numbers();

// Step 2: First next().
console.log(
  iterator.next()
); // Output: { value: 1, done: false }

// Step 3: Second next().
console.log(
  iterator.next()
); // Output: { value: 2, done: false }
```

Output:

```text
{ value: 1, done: false }
{ value: 2, done: false }
```

---

# 37. Finish Generator

```js
const iterator =
  numbers();

iterator.next();
iterator.next();
iterator.next();

// Step 1: No more yields.
console.log(
  iterator.next()
); // Output: { value: undefined, done: true }
```

Output:

```text
{ value: undefined, done: true }
```

---

# 38. Generator Works With `for...of` 🔥🔥🔥

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

// Step 1: Generator object is iterable.
for (
  const value
  of
  numbers()
) {
  console.log(
    value
  );
}

// Output:
// 1
// 2
// 3
```

Output:

```text
1
2
3
```

---

# 39. Generator With Loop

```js
function* countTo(
  max
) {
  // Step 1: Start at 1.
  for (
    let value = 1;
    value <= max;
    value++
  ) {
    // Step 2: Yield one value at a time.
    yield value;
  }
}
```

---

# 40. Test Generator Loop

```js
// Step 1: Generate values 1 to 3.
console.log(
  [
    ...countTo(
      3
    ),
  ]
); // Output: [1, 2, 3]
```

Output:

```text
[1, 2, 3]
```

---

# 41. Why Generators Are Useful?

Generators are useful when:

```text
values can be produced one by one
you do not want everything at once
custom iteration is needed
lazy sequences are useful
```

---

# 42. Normal Function vs Generator 🔥🔥🔥

```text
Normal function
→ runs from start to finish
→ returns once

Generator
→ can pause
→ yield many times
→ resume later
```

---

# 43. `return` Inside Generator

```js
function* demo() {
  // Step 1: First yielded value.
  yield 1;

  // Step 2: return finishes generator.
  return 99;

  // Step 3: Never reached.
  yield 2;
}

const iterator =
  demo();

console.log(
  iterator.next()
); // Output: { value: 1, done: false }

console.log(
  iterator.next()
); // Output: { value: 99, done: true }
```

Output:

```text
{ value: 1, done: false }
{ value: 99, done: true }
```

---

# 44. Property Descriptor 🔥🔥🔥

Every object property has metadata.

Examples:

```text
value
writable
enumerable
configurable
```

This metadata is called:

```text
property descriptor
```

---

# 45. Inspect Property Descriptor

```js
const employee = {
  name:
    "Rahul",
};

// Step 1: Read descriptor.
const descriptor =
  Object.getOwnPropertyDescriptor(
    employee,
    "name"
  );

// Step 2: Print writable.
console.log(
  descriptor.writable
); // Output: true
```

Output:

```text
true
```

---

# 46. Descriptor Flags

For a property created normally:

```text
writable: true
enumerable: true
configurable: true
```

Memory:

```text
writable
→ can value change?

enumerable
→ appears in enumeration?

configurable
→ can descriptor/delete behavior change?
```

---

# 47. `Object.defineProperty()` 🔥🔥🔥

```js
const employee =
  {};

Object.defineProperty(
  employee,
  "id",
  {
    // Step 1: Set initial value.
    value:
      101,

    // Step 2: Prevent reassignment.
    writable:
      false,

    // Step 3: Allow Object.keys
    // to include this property.
    enumerable:
      true,

    // Step 4: Prevent reconfiguration.
    configurable:
      false,
  }
);

// Step 5: Read property.
console.log(
  employee.id
); // Output: 101
```

Output:

```text
101
```

---

# 48. Getter and Setter Descriptor 🔥🔥🔥

A property can use:

```text
get
set
```

instead of storing a normal direct value.

```js
const employee = {
  firstName:
    "Rahul",
  lastName:
    "Sharma",
};

Object.defineProperty(
  employee,
  "fullName",
  {
    // Step 1: Run whenever fullName is read.
    get() {
      return (
        `${this.firstName} ${this.lastName}`
      );
    },
  }
);

// Step 2: Read computed property.
console.log(
  employee.fullName
); // Output: Rahul Sharma
```

Output:

```text
Rahul Sharma
```

---

# 49. Setter Example 🔥🔥🔥

```js
const employee = {
  firstName:
    "Rahul",
  lastName:
    "Sharma",
};

Object.defineProperty(
  employee,
  "fullName",
  {
    // Step 1: Return combined name.
    get() {
      return (
        `${this.firstName} ${this.lastName}`
      );
    },

    // Step 2: Run when fullName gets a new value.
    set(
      value
    ) {
      // Step 3: Split full name.
      const [
        firstName,
        lastName,
      ] =
        value.split(
          " "
        );

      // Step 4: Update original fields.
      this.firstName =
        firstName;

      this.lastName =
        lastName;
    },
  }
);

// Step 5: Assign through setter.
employee.fullName =
  "Priya Singh";

// Step 6: Read updated fields.
console.log(
  employee.firstName
); // Output: Priya

console.log(
  employee.lastName
); // Output: Singh
```

Output:

```text
Priya
Singh
```

---

# 50. Property Descriptor Memory Trick 🧠

```text
writable
→ can value change?

enumerable
→ appears in Object.keys / loops?

configurable
→ can descriptor/delete behavior change?

get
→ runs when property is read

set
→ runs when property is assigned
```

---

# 51. Proxy 🔥🔥🔥

Proxy lets us intercept operations on an object.

Examples:

```text
property read
property write
property delete
"in" checks
function calls
```

```text
normal object operation
↓
Proxy stands in the middle
↓
custom logic can run
```

---

# 52. Proxy Syntax

```js
const target = {
  name:
    "Rahul",
};

// Step 1: Create Proxy around target.
const proxy =
  new Proxy(
    target,
    {
      // traps go here
    }
  );
```

---

# 53. Proxy `get` Trap 🔥🔥🔥

```js
const target = {
  name:
    "Rahul",
};

const proxy =
  new Proxy(
    target,
    {
      get(
        object,
        property
      ) {
        // Step 1: Log which property is read.
        console.log(
          `Reading ${String(property)}`
        ); // Output first: Reading name

        // Step 2: Return real value.
        return object[
          property
        ];
      },
    }
  );

// Step 3: Reading proxy.name triggers get trap.
console.log(
  proxy.name
); // Output second: Rahul
```

Output:

```text
Reading name
Rahul
```

---

# 54. Why Proxy `get` Can Be Useful?

```text
logging
default values
access control
tracking reads
reactivity
```

---

# 55. Proxy Default Value Example

```js
const employee = {
  name:
    "Rahul",
};

const proxy =
  new Proxy(
    employee,
    {
      get(
        object,
        property
      ) {
        // Step 1: Existing property?
        if (
          property
          in
          object
        ) {
          return object[
            property
          ];
        }

        // Step 2: Missing property?
        return "Not Available";
      },
    }
  );

console.log(
  proxy.name
); // Output: Rahul

console.log(
  proxy.department
); // Output: Not Available
```

Output:

```text
Rahul
Not Available
```

---

# 56. Proxy `set` Trap 🔥🔥🔥

```js
const target = {
  salary:
    50000,
};

const proxy =
  new Proxy(
    target,
    {
      set(
        object,
        property,
        value
      ) {
        // Step 1: Validate salary.
        if (
          property
          ===
          "salary"
          &&
          value
          <
          0
        ) {
          throw new Error(
            "Salary cannot be negative"
          );
        }

        // Step 2: Save valid value.
        object[
          property
        ] =
          value;

        // Step 3: Signal successful assignment.
        return true;
      },
    }
  );
```

---

# 57. Test Proxy `set`

```js
// Step 1: Assign valid salary.
proxy.salary =
  80000;

// Step 2: Read salary.
console.log(
  proxy.salary
); // Output: 80000
```

Output:

```text
80000
```

---

# 58. Proxy Invalid Value

```js
// Step 1: Invalid salary.
// Proxy validation throws.
proxy.salary =
  -100;
```

Output:

```text
Error: Salary cannot be negative
```

---

# 59. Proxy `deleteProperty` Awareness

```js
const employee = {
  id:
    1,
  name:
    "Rahul",
};

const proxy =
  new Proxy(
    employee,
    {
      deleteProperty(
        object,
        property
      ) {
        // Step 1: Prevent deleting ID.
        if (
          property
          ===
          "id"
        ) {
          return false;
        }

        // Step 2: Delete other properties.
        return delete object[
          property
        ];
      },
    }
  );
```

Awareness is enough.

---

# 60. Proxy Use Cases

```text
validation
logging
access control
reactive systems
default values
API wrappers
```

---

# 61. Proxy Caveat 🔥🔥🔥

This looks simple:

```js
proxy.salary =
  80000;
```

But internally it may run:

```text
validation
logging
permissions
transformations
```

Proxy is powerful, but overusing it can make debugging harder.

---

# 62. Reflect 🔥🔥🔥

Reflect provides functions for common object operations.

```text
Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.ownKeys()
```

---

# 63. `Reflect.get()`

```js
const employee = {
  name:
    "Rahul",
};

// Step 1: Read property using Reflect.
console.log(
  Reflect.get(
    employee,
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 64. `Reflect.set()`

```js
const employee = {
  salary:
    50000,
};

// Step 1: Set salary.
const success =
  Reflect.set(
    employee,
    "salary",
    80000
  );

// Step 2: Reflect.set returns a boolean.
console.log(
  success
); // Output: true

// Step 3: Check updated value.
console.log(
  employee.salary
); // Output: 80000
```

Output:

```text
true
80000
```

---

# 65. `Reflect.has()`

```js
const employee = {
  name:
    "Rahul",
};

// Step 1: Check property.
console.log(
  Reflect.has(
    employee,
    "name"
  )
); // Output: true
```

Output:

```text
true
```

---

# 66. `Reflect.deleteProperty()`

```js
const employee = {
  name:
    "Rahul",
  city:
    "Mumbai",
};

// Step 1: Delete city.
const deleted =
  Reflect.deleteProperty(
    employee,
    "city"
  );

// Step 2: Print delete result.
console.log(
  deleted
); // Output: true

// Step 3: Check property.
console.log(
  Reflect.has(
    employee,
    "city"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 67. Why Reflect With Proxy? 🔥🔥🔥

Inside Proxy, we can use:

```text
Reflect.get()
Reflect.set()
```

to forward normal behavior cleanly.

---

# 68. Proxy + Reflect Example

```js
const target = {
  name:
    "Rahul",
};

const proxy =
  new Proxy(
    target,
    {
      get(
        object,
        property,
        receiver
      ) {
        // Step 1: Log access.
        console.log(
          `Reading ${String(property)}`
        ); // Output first: Reading name

        // Step 2: Forward normal property read.
        return Reflect.get(
          object,
          property,
          receiver
        );
      },
    }
  );

// Step 3: Trigger Proxy get.
console.log(
  proxy.name
); // Output second: Rahul
```

Output:

```text
Reading name
Rahul
```

---

# 69. Proxy vs Reflect 🔥🔥🔥

```text
Proxy
→ intercept

Reflect
→ perform / forward
```

---

# 70. Private Class Fields 🔥🔥🔥

JavaScript classes can have truly private fields.

Syntax:

```text
#fieldName
```

```js
class BankAccount {
  #balance =
    0;

  deposit(
    amount
  ) {
    // Step 1: Access private field inside class.
    this.#balance +=
      amount;
  }

  getBalance() {
    // Step 2: Return private value.
    return this.#balance;
  }
}
```

---

# 71. Test Private Field

```js
const account =
  new BankAccount();

// Step 1: Deposit money.
account.deposit(
  100
);

// Step 2: Read through public method.
console.log(
  account.getBalance()
); // Output: 100
```

Output:

```text
100
```

---

# 72. Cannot Access `#field` Outside Class 🔥🔥🔥

```js
const account =
  new BankAccount();

// Step 1: Private field cannot be accessed here.
console.log(
  account.#balance
);
```

Output:

```text
SyntaxError
```

---

# 73. `_salary` Is Not Truly Private

```js
class Employee {
  constructor() {
    // Step 1: Underscore is only a convention.
    this._salary =
      50000;
  }
}

const employee =
  new Employee();

// Step 2: Still accessible outside.
console.log(
  employee._salary
); // Output: 50000
```

Output:

```text
50000
```

---

# 74. `_field` vs `#field` 🔥🔥🔥

```text
_salary
→ naming convention
→ still public

#salary
→ actual private field
→ JavaScript enforces privacy
```

---

# 75. Private Method Awareness

```js
class Employee {
  #calculateBonus() {
    // Step 1: Private method.
    return 1000;
  }

  getBonus() {
    // Step 2: Public method calls private method.
    return this.#calculateBonus();
  }
}

const employee =
  new Employee();

// Step 3: Call public method.
console.log(
  employee.getBonus()
); // Output: 1000
```

Output:

```text
1000
```

---

# 76. Static Private Field Awareness

```js
class Config {
  static #secret =
    "ABC";
}
```

Awareness is enough.

---

# 77. Output Question — WeakMap 🔥🔥🔥

```js
const key =
  {};

const weakMap =
  new WeakMap();

weakMap.set(
  key,
  10
);

// Step 1: Read value.
console.log(
  weakMap.get(
    key
  )
); // Output: 10
```

Output:

```text
10
```

---

# 78. Output Question — WeakSet

```js
const employee =
  {};

const weakSet =
  new WeakSet();

weakSet.add(
  employee
);

// Step 1: Check same object.
console.log(
  weakSet.has(
    employee
  )
); // Output: true
```

Output:

```text
true
```

---

# 79. Output Question — Symbol 🔥🔥🔥

```js
const a =
  Symbol(
    "id"
  );

const b =
  Symbol(
    "id"
  );

// Step 1: Symbols are unique.
console.log(
  a
  ===
  b
); // Output: false
```

Output:

```text
false
```

---

# 80. Output Question — Generator

```js
function* values() {
  yield "A";
  yield "B";
}

const iterator =
  values();

// Step 1: First value.
console.log(
  iterator.next().value
); // Output: A

// Step 2: Second value.
console.log(
  iterator.next().value
); // Output: B
```

Output:

```text
A
B
```

---

# 81. Output Question — Generator Done

```js
function* values() {
  yield 10;
}

const iterator =
  values();

console.log(
  iterator.next()
); // Output: { value: 10, done: false }

console.log(
  iterator.next()
); // Output: { value: undefined, done: true }
```

Output:

```text
{ value: 10, done: false }
{ value: undefined, done: true }
```

---

# 82. Output Question — Non-Enumerable

```js
const employee = {
  name:
    "Rahul",
};

Object.defineProperty(
  employee,
  "secret",
  {
    value:
      "ABC",
    enumerable:
      false,
  }
);

// Step 1: Object.keys skips secret.
console.log(
  Object.keys(
    employee
  )
); // Output: ["name"]

// Step 2: Direct access still works.
console.log(
  employee.secret
); // Output: ABC
```

Output:

```text
["name"]
ABC
```

---

# 83. Output Question — Proxy

```js
const target = {
  value:
    10,
};

const proxy =
  new Proxy(
    target,
    {
      get(
        object,
        property
      ) {
        // Step 1: Double numeric property read.
        return (
          object[
            property
          ]
          *
          2
        );
      },
    }
  );

console.log(
  proxy.value
); // Output: 20
```

Output:

```text
20
```

---

# 84. Output Question — Private Field

```js
class Counter {
  #count =
    0;

  increment() {
    // Step 1: Increase private field.
    this.#count++;
  }

  getCount() {
    // Step 2: Return current value.
    return this.#count;
  }
}

const counter =
  new Counter();

counter.increment();
counter.increment();

// Step 3: Read through method.
console.log(
  counter.getCount()
); // Output: 2
```

Output:

```text
2
```

---

# 85. Interview Question — Map vs WeakMap 🔥🔥🔥

```text
Map:
- any key type
- iterable
- has size
- strongly keeps keys

WeakMap:
- object keys only
- not iterable
- no size
- weakly references keys
```

---

# 86. Interview Question — Set vs WeakSet

```text
Set:
- any value
- iterable
- size available

WeakSet:
- objects only
- not iterable
- no size
- weak references
```

---

# 87. Interview Question — What Is an Iterator?

```text
An iterator is an object
with a next() method.

next() returns:
{
  value,
  done
}
```

---

# 88. Interview Question — What Is an Iterable?

```text
An iterable provides Symbol.iterator.

That method returns an iterator.

Arrays, strings, Maps, and Sets
are iterable.
```

---

# 89. Interview Question — Why Plain Object Is Not Iterable?

```text
A normal object does not provide
Symbol.iterator by default.

So for...of does not work directly.
```

Use:

```text
Object.keys()
Object.values()
Object.entries()
```

---

# 90. Interview Question — What Is `Symbol.iterator`? 🔥🔥🔥

```text
Symbol.iterator is a special method
that tells JavaScript
how to iterate an object.

for...of uses it.
```

---

# 91. Interview Question — What Is a Generator?

```text
A generator is a special function
declared with function*.

It can pause using yield
and continue later.

Calling it returns an iterator.
```

---

# 92. Interview Question — `yield` vs `return`

```text
yield
→ pauses
→ gives one value
→ can continue later

return
→ finishes generator
```

---

# 93. Interview Question — What Is Symbol?

```text
Symbol is a primitive type
that creates unique values.

It is useful for:
unique property keys
and built-in protocols
like Symbol.iterator.
```

---

# 94. Interview Question — Property Descriptor

```text
A property descriptor
describes metadata
about an object property.

Important fields:
writable
enumerable
configurable
get
set
```

---

# 95. Interview Question — Does Non-Enumerable Mean Private?

```text
No.

It only means
the property is skipped
by common enumeration.

Direct access can still work.
```

---

# 96. Interview Question — What Is Proxy? 🔥🔥🔥

```text
Proxy lets us intercept operations
on another object.

Examples:
get
set
delete
has checks

It can be used for:
validation
logging
access control
reactivity
```

---

# 97. Interview Question — What Is Reflect?

```text
Reflect provides functions
for standard object operations.

Examples:
Reflect.get
Reflect.set
Reflect.has
Reflect.deleteProperty

It is often used inside Proxy
to forward normal behavior.
```

---

# 98. Interview Question — Proxy vs Reflect

```text
Proxy
→ intercept

Reflect
→ perform / forward
```

---

# 99. Interview Question — What Is a Private Class Field?

```text
A private class field uses #.

Example:
#salary

It can only be accessed
inside the class body.
```

---

# 100. Interview Question — `_field` vs `#field`

```text
_field
→ convention only
→ still public

#field
→ true JavaScript private field
→ enforced by language
```

---

# 101. Which Topics Must You Really Remember? 🔥🔥🔥

Strong awareness:

```text
Map vs WeakMap
Set vs WeakSet
Iterator
Iterable
Symbol.iterator
Generator
yield
Proxy
Reflect
Private Fields
Property Descriptors
```

Basic awareness:

```text
Symbol.toPrimitive
Symbol.toStringTag
advanced Proxy traps
advanced descriptor edge cases
complex custom iterators
```

---

# 102. Common Mistake — WeakMap Is Just a Smaller Map

Wrong.

WeakMap is different because:

```text
object keys only
not iterable
no size
weak references
```

---

# 103. Common Mistake — Weak Means Data Is Immediately Deleted

Wrong.

```text
WeakMap does not prevent
garbage collection
when no strong references remain.
```

Garbage collection timing is controlled by the JavaScript engine.

---

# 104. Common Mistake — `yield` Is Same as `return`

Wrong.

```text
yield
→ pauses

return
→ finishes
```

---

# 105. Common Mistake — Same Symbol Description Means Same Symbol

```js
const a =
  Symbol(
    "id"
  );

const b =
  Symbol(
    "id"
  );

// Step 1: Same description
// does not mean same Symbol.
console.log(
  a === b
); // Output: false
```

Output:

```text
false
```

---

# 106. Common Mistake — Non-Enumerable Means Secure

Wrong.

```text
enumerable: false
does not make a property private
```

For class privacy:

```text
#privateField
```

is stronger.

---

# 107. Common Mistake — Proxy Must Always Be Used

No.

For simple objects,
normal code is easier.

Use Proxy only when interception actually helps.

---

# 108. Quick Decision Guide 🔥🔥🔥

```text
Need object metadata
without strongly keeping key alive?
→ WeakMap

Need to mark objects as seen?
→ WeakSet

Need one-by-one values?
→ Iterator

Need for...of support?
→ Symbol.iterator

Need pausable sequence?
→ Generator

Need unique key?
→ Symbol

Need property metadata?
→ Property Descriptor

Need computed property?
→ getter

Need intercept reads/writes?
→ Proxy

Need normal object operation helper?
→ Reflect

Need true class privacy?
→ #privateField
```

---

# 109. Quick Memory 🧠🔥🔥🔥

```text
WeakMap
→ object keys only
→ not iterable

WeakSet
→ object values only
→ not iterable

Iterator
→ next()
→ { value, done }

Iterable
→ Symbol.iterator

Generator
→ function*

yield
→ pause + produce value

Symbol
→ unique primitive

Descriptor
→ writable
→ enumerable
→ configurable
→ get/set

Proxy
→ intercept

Reflect
→ perform / forward

#field
→ private class field
```

---

# 110. Best Interview Answer 🔥🔥🔥

```text
For advanced JavaScript awareness,
I understand weak collections,
iteration protocols,
generators,
property descriptors,
Proxy and Reflect,
Symbols,
and private class fields.

WeakMap and WeakSet
work with objects
and are not iterable.

An iterable exposes Symbol.iterator,
which returns an iterator.

An iterator has next()
and returns { value, done }.

Generators are functions declared with function*
that can pause using yield
and resume later.

Property descriptors control
writable,
enumerable,
configurable,
and getter/setter behavior.

Proxy intercepts object operations,
while Reflect helps perform
or forward standard operations.

Private class fields use #
and are enforced by JavaScript.

For interviews,
I focus on behavior,
differences,
and practical use cases
rather than specification-level internals.
```

---

# ✅ 9.11 Advanced Awareness Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ✅
9.6 Machine-Coding Utilities ✅
9.7 Promise Implementations ✅
9.8 Event System ✅
9.9 String Utilities ✅
9.10 DOM / Browser Practical ✅
9.11 Advanced Awareness ✅

9.12 Final Interview Practical ← NEXT
```

Only one chapter remains:

```text
9.12 Final Interview Practical 🔥🔥🔥
```
