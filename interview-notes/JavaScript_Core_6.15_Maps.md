# 6.15 Maps 🔥🔥🔥

A JavaScript `Map` stores data as **key-value pairs**.

Easy mental model:

```text
Object
→ key-value storage

Map
→ key-value storage
→ but keys can be ANY data type
```

Example:

```js
// Step 1: Create an empty Map.
const employee =
  new Map();

// Step 2: Store values using set().
employee.set(
  "name",
  "Rahul"
);

employee.set(
  "role",
  "Developer"
);

// Step 3: Read a value using get().
console.log(
  employee.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

Maps are useful for:

```text
lookup tables
frequency counting
caching
indexing API data
storing metadata
dynamic key-value data
machine coding
```

---

# 1. What Is a Map?

A `Map` is a built-in JavaScript collection that stores:

```text
key → value
```

Example:

```js
// Step 1: Create a Map.
const user =
  new Map();

// Step 2: Add a key-value pair.
user.set(
  "name",
  "Amit"
);

// Step 3: Add another key-value pair.
user.set(
  "age",
  30
);

// Step 4: Read values.
console.log(
  user.get(
    "name"
  )
); // Output: Amit

console.log(
  user.get(
    "age"
  )
); // Output: 30
```

Output:

```text
Amit
30
```

### Easy Explanation

Think:

```text
"name" → "Amit"
"age"  → 30
```

---

# 2. Why Do We Need Maps?

Suppose we repeatedly need to find an employee by ID.

Array:

```js
const employees = [
  {
    id: 101,
    name: "Rahul",
  },
  {
    id: 102,
    name: "Amit",
  },
];
```

A Map can index employees by ID.

```js
// Step 1: Create empty Map.
const employeeById =
  new Map();

// Step 2: Store each employee using ID as key.
employeeById.set(
  101,
  {
    id: 101,
    name: "Rahul",
  }
);

employeeById.set(
  102,
  {
    id: 102,
    name: "Amit",
  }
);

// Step 3: Directly get employee 102.
console.log(
  employeeById.get(
    102
  )
); // Output: { id: 102, name: "Amit" }
```

Output:

```text
{ id: 102, name: "Amit" }
```

### Easy Flow

```text
employee ID
↓
Map key
↓
employee object
```

---

# 3. Create an Empty Map

Syntax:

```js
new Map()
```

Example:

```js
// Step 1: Create empty Map.
const data =
  new Map();

// Step 2: Check how many entries it has.
console.log(
  data.size
); // Output: 0
```

Output:

```text
0
```

---

# 4. Create Map With Initial Values 🔥🔥🔥

A Map can be created from nested key-value pairs.

```js
// Step 1: Each inner array is:
// [key, value]
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "role",
        "Developer",
      ],
    ]
  );

// Step 2: Read values.
console.log(
  user.get(
    "name"
  )
); // Output: Rahul

console.log(
  user.get(
    "role"
  )
); // Output: Developer
```

Output:

```text
Rahul
Developer
```

### Easy Explanation

Map constructor expects entries like:

```text
[
  [key, value],
  [key, value]
]
```

---

# 5. `set()` 🔥🔥🔥

Use `set()` to add or update a key-value pair.

```js
// Step 1: Create empty Map.
const user =
  new Map();

// Step 2: Add name.
user.set(
  "name",
  "Rahul"
);

// Step 3: Add age.
user.set(
  "age",
  30
);

// Step 4: Read values.
console.log(
  user.get(
    "name"
  )
); // Output: Rahul

console.log(
  user.get(
    "age"
  )
); // Output: 30
```

Output:

```text
Rahul
30
```

---

# 6. `set()` Updates Existing Key

If the key already exists, its value is replaced.

```js
// Step 1: Create Map.
const user =
  new Map();

// Step 2: Set role.
user.set(
  "role",
  "Developer"
);

// Step 3: Update the same key.
user.set(
  "role",
  "Senior Developer"
);

// Step 4: Read current value.
console.log(
  user.get(
    "role"
  )
); // Output: Senior Developer
```

Output:

```text
Senior Developer
```

### Easy Explanation

A Map cannot contain the same key twice.

The latest value replaces the older one.

---

# 7. `set()` Is Chainable

`set()` returns the Map itself.

```js
// Step 1: Create Map.
const user =
  new Map();

// Step 2: Chain multiple set() calls.
user
  .set(
    "name",
    "Rahul"
  )
  .set(
    "role",
    "Developer"
  )
  .set(
    "active",
    true
  );

// Step 3: Read values.
console.log(
  user.get(
    "name"
  )
); // Output: Rahul

console.log(
  user.get(
    "active"
  )
); // Output: true
```

Output:

```text
Rahul
true
```

---

# 8. `get()` 🔥🔥🔥

Use `get(key)` to read a value.

```js
// Step 1: Create Map with data.
const user =
  new Map(
    [
      [
        "name",
        "Amit",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 2: Read name.
const name =
  user.get(
    "name"
  );

// Step 3: Print result.
console.log(
  name
); // Output: Amit
```

Output:

```text
Amit
```

---

# 9. `get()` for Missing Key

If the key does not exist:

```js
// Step 1: Create Map.
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
    ]
  );

// Step 2: Ask for missing key.
console.log(
  user.get(
    "salary"
  )
); // Output: undefined
```

Output:

```text
undefined
```

### Easy Explanation

Missing Map key returns:

```text
undefined
```

---

# 10. `has()` 🔥🔥🔥

Use `has()` to check whether a key exists.

```js
// Step 1: Create Map.
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
    ]
  );

// Step 2: Check existing key.
console.log(
  user.has(
    "name"
  )
); // Output: true

// Step 3: Check missing key.
console.log(
  user.has(
    "age"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 11. Why `has()` Is Better Than Checking `get()` Sometimes

Suppose the stored value itself is `undefined`.

```js
// Step 1: Create Map.
const data =
  new Map();

// Step 2: Store undefined intentionally.
data.set(
  "value",
  undefined
);

// Step 3: get() returns undefined.
console.log(
  data.get(
    "value"
  )
); // Output: undefined

// Step 4: has() proves the key actually exists.
console.log(
  data.has(
    "value"
  )
); // Output: true
```

Output:

```text
undefined
true
```

### Easy Explanation

`get()` answers:

```text
What is the value?
```

`has()` answers:

```text
Does the key exist?
```

---

# 12. `delete()` 🔥🔥🔥

Use `delete()` to remove one entry.

```js
// Step 1: Create Map.
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 2: Delete age.
user.delete(
  "age"
);

// Step 3: Check whether age still exists.
console.log(
  user.has(
    "age"
  )
); // Output: false
```

Output:

```text
false
```

---

# 13. `delete()` Returns Boolean

```js
// Step 1: Create Map.
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
    ]
  );

// Step 2: Delete existing key.
const firstResult =
  user.delete(
    "name"
  );

// Step 3: Try deleting missing key.
const secondResult =
  user.delete(
    "salary"
  );

// Step 4: Print both results.
console.log(
  firstResult
); // Output: true

console.log(
  secondResult
); // Output: false
```

Output:

```text
true
false
```

---

# 14. `clear()` 🔥🔥

Use `clear()` to remove all entries.

```js
// Step 1: Create Map.
const data =
  new Map(
    [
      [
        "a",
        1,
      ],
      [
        "b",
        2,
      ],
    ]
  );

// Step 2: Remove everything.
data.clear();

// Step 3: Check size.
console.log(
  data.size
); // Output: 0
```

Output:

```text
0
```

---

# 15. `size` 🔥🔥🔥

Map uses:

```js
map.size
```

not:

```js
map.length
```

Example:

```js
// Step 1: Create Map with two entries.
const data =
  new Map(
    [
      [
        "a",
        1,
      ],
      [
        "b",
        2,
      ],
    ]
  );

// Step 2: Count entries.
console.log(
  data.size
); // Output: 2
```

Output:

```text
2
```

---

# 16. Map Has No `length`

```js
// Step 1: Create Map.
const data =
  new Map(
    [
      [
        "a",
        1,
      ],
    ]
  );

// Step 2: Try length.
console.log(
  data.length
); // Output: undefined

// Step 3: Use correct property.
console.log(
  data.size
); // Output: 1
```

Output:

```text
undefined
1
```

Memory:

```text
Array → length
Map   → size
```

---

# 17. Map Keys Can Be Strings

```js
// Step 1: Create Map.
const user =
  new Map();

// Step 2: Use string key.
user.set(
  "name",
  "Rahul"
);

// Step 3: Read value.
console.log(
  user.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 18. Map Keys Can Be Numbers 🔥🔥🔥

Unlike normal object property access, Map can preserve numeric keys.

```js
// Step 1: Create Map.
const employees =
  new Map();

// Step 2: Use number 101 as key.
employees.set(
  101,
  "Rahul"
);

// Step 3: Read using number 101.
console.log(
  employees.get(
    101
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 19. Number Key and String Key Are Different 🔥🔥🔥

```js
// Step 1: Create Map.
const data =
  new Map();

// Step 2: Store number key.
data.set(
  1,
  "number key"
);

// Step 3: Store string key.
data.set(
  "1",
  "string key"
);

// Step 4: Read both.
console.log(
  data.get(
    1
  )
); // Output: number key

console.log(
  data.get(
    "1"
  )
); // Output: string key

// Step 5: Check size.
console.log(
  data.size
); // Output: 2
```

Output:

```text
number key
string key
2
```

### Easy Explanation

Map keeps key types.

```text
1
and
"1"
```

are different keys.

---

# 20. Map Keys Can Be Booleans

```js
// Step 1: Create Map.
const labels =
  new Map();

// Step 2: Use boolean keys.
labels.set(
  true,
  "Active"
);

labels.set(
  false,
  "Inactive"
);

// Step 3: Read values.
console.log(
  labels.get(
    true
  )
); // Output: Active

console.log(
  labels.get(
    false
  )
); // Output: Inactive
```

Output:

```text
Active
Inactive
```

---

# 21. Map Keys Can Be Objects 🔥🔥🔥

This is one major Map feature.

```js
// Step 1: Create an object.
const employee =
  {
    id: 101,
  };

// Step 2: Create Map.
const metadata =
  new Map();

// Step 3: Use the object itself as key.
metadata.set(
  employee,
  {
    selected: true,
  }
);

// Step 4: Read using same object reference.
console.log(
  metadata.get(
    employee
  )
); // Output: { selected: true }
```

Output:

```text
{ selected: true }
```

---

# 22. Object Key Uses Reference Identity 🔥🔥🔥

```js
// Step 1: Create two separate objects.
const a =
  {
    id: 1,
  };

const b =
  {
    id: 1,
  };

// Step 2: Create Map.
const data =
  new Map();

// Step 3: Store value using object a as key.
data.set(
  a,
  "Employee A"
);

// Step 4: Read using a.
console.log(
  data.get(
    a
  )
); // Output: Employee A

// Step 5: Read using different object b.
console.log(
  data.get(
    b
  )
); // Output: undefined
```

Output:

```text
Employee A
undefined
```

### Why?

```text
a !== b
```

Map object keys use reference identity.

---

# 23. Map Keys Can Be Functions

```js
// Step 1: Create a function.
function save() {
  return "saved";
}

// Step 2: Create Map.
const metadata =
  new Map();

// Step 3: Use function as key.
metadata.set(
  save,
  "save handler"
);

// Step 4: Read value.
console.log(
  metadata.get(
    save
  )
); // Output: save handler
```

Output:

```text
save handler
```

---

# 24. Map Preserves Insertion Order

```js
// Step 1: Create Map.
const data =
  new Map();

// Step 2: Insert entries in this order.
data.set(
  "b",
  2
);

data.set(
  "a",
  1
);

data.set(
  "c",
  3
);

// Step 3: Iterate keys.
for (
  const key
  of data.keys()
) {
  console.log(
    key
  );
  // Output order:
  // b
  // a
  // c
}
```

Output:

```text
b
a
c
```

---

# 25. Iterate Map With `for...of` 🔥🔥🔥

Each Map item is:

```text
[key, value]
```

Example:

```js
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "role",
        "Developer",
      ],
    ]
  );

// Step 1: Destructure each [key, value] pair.
for (
  const [
    key,
    value,
  ]
  of user
) {
  // Step 2: Print key and value.
  console.log(
    key,
    value
  );
  // Output:
  // name Rahul
  // role Developer
}
```

Output:

```text
name Rahul
role Developer
```

---

# 26. Iterate Map With `forEach()`

```js
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 1: Map forEach receives:
// value first,
// key second.
user.forEach(
  (
    value,
    key
  ) => {
    // Step 2: Print.
    console.log(
      key,
      value
    );
    // Output:
    // name Rahul
    // age 30
  }
);
```

Output:

```text
name Rahul
age 30
```

### Interview Trap

Map `forEach()` callback order is:

```text
(value, key)
```

not:

```text
(key, value)
```

---

# 27. `keys()` 🔥🔥

```js
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 1: Get key iterator.
const keys =
  user.keys();

// Step 2: Convert iterator to array.
console.log(
  [...keys]
); // Output: ["name", "age"]
```

Output:

```text
["name", "age"]
```

---

# 28. `values()` 🔥🔥

```js
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 1: Get values iterator.
const values =
  user.values();

// Step 2: Convert to array.
console.log(
  [...values]
); // Output: ["Rahul", 30]
```

Output:

```text
["Rahul", 30]
```

---

# 29. `entries()` 🔥🔥🔥

`entries()` gives:

```text
[key, value]
```

pairs.

```js
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 1: Get entries iterator.
const entries =
  user.entries();

// Step 2: Convert to array.
console.log(
  [...entries]
);
// Output:
// [
//   ["name", "Rahul"],
//   ["age", 30]
// ]
```

Output:

```text
[
  ["name", "Rahul"],
  ["age", 30]
]
```

---

# 30. Map Is Directly Iterable

This:

```js
for (
  const entry
  of map
) {
}
```

behaves like iterating:

```js
map.entries()
```

Example:

```js
const data =
  new Map(
    [
      [
        "a",
        1,
      ],
      [
        "b",
        2,
      ],
    ]
  );

// Step 1: Iterate entries directly.
for (
  const entry
  of data
) {
  console.log(
    entry
  );
  // Output:
  // ["a", 1]
  // ["b", 2]
}
```

Output:

```text
["a", 1]
["b", 2]
```

---

# 31. Map → Array 🔥🔥🔥

```js
const user =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 1: Spread Map entries into an array.
const array =
  [...user];

// Step 2: Print.
console.log(
  array
);
// Output:
// [
//   ["name", "Rahul"],
//   ["age", 30]
// ]
```

Output:

```text
[
  ["name", "Rahul"],
  ["age", 30]
]
```

---

# 32. Array of Entries → Map

```js
const entries = [
  [
    "name",
    "Rahul",
  ],
  [
    "age",
    30,
  ],
];

// Step 1: Convert entries array to Map.
const user =
  new Map(
    entries
  );

// Step 2: Read value.
console.log(
  user.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 33. Object → Map 🔥🔥🔥

Suppose we have:

```js
const user = {
  name: "Rahul",
  age: 30,
};
```

Convert using `Object.entries()`.

```js
const user = {
  name: "Rahul",
  age: 30,
};

// Step 1: Convert object into entries.
const entries =
  Object.entries(
    user
  );

// Step 2: Convert entries into Map.
const map =
  new Map(
    entries
  );

// Step 3: Read from Map.
console.log(
  map.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

Flow:

```text
Object
↓ Object.entries()
[key, value] pairs
↓ new Map()
Map
```

---

# 34. Map → Object 🔥🔥🔥

If Map keys are valid property keys like strings:

```js
const map =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
      [
        "age",
        30,
      ],
    ]
  );

// Step 1: Convert Map entries into object.
const object =
  Object.fromEntries(
    map
  );

// Step 2: Print object.
console.log(
  object
);
// Output:
// { name: "Rahul", age: 30 }
```

Output:

```text
{ name: "Rahul", age: 30 }
```

---

# 35. Map vs Object 🔥🔥🔥

Both store key-value data.

Main difference:

```text
Object
→ keys are string/symbol property keys

Map
→ keys can be any value
```

Example:

```js
// Step 1: Create object key.
const objectKey =
  {
    id: 1,
  };

// Step 2: Use object as Map key.
const map =
  new Map();

map.set(
  objectKey,
  "metadata"
);

// Step 3: Read it back.
console.log(
  map.get(
    objectKey
  )
); // Output: metadata
```

Output:

```text
metadata
```

---

# 36. Map vs Object — Quick Decision Guide 🔥🔥🔥

Use Object when:

```text
representing normal structured data
API payload
employee object
configuration object
JSON serialization
```

Use Map when:

```text
dynamic key-value collection
non-string keys
frequent add/remove
lookup table
cache
frequency counting
metadata keyed by objects
```

---

# 37. Frequency Counting With Map 🔥🔥🔥

Very important practical pattern.

Input:

```js
const fruits = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "apple",
];
```

We want:

```text
apple  → 3
banana → 2
orange → 1
```

Solution:

```js
const fruits = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "apple",
];

// Step 1: Create empty frequency Map.
const frequency =
  new Map();

// Step 2: Visit every fruit.
for (
  const fruit
  of fruits
) {
  // Step 3: Read current count.
  // If missing, use 0.
  const currentCount =
    frequency.get(
      fruit
    ) ?? 0;

  // Step 4: Increase count by 1.
  const newCount =
    currentCount + 1;

  // Step 5: Save updated count.
  frequency.set(
    fruit,
    newCount
  );
}

// Step 6: Print final entries.
console.log(
  [...frequency]
);
// Output:
// [
//   ["apple", 3],
//   ["banana", 2],
//   ["orange", 1]
// ]
```

Output:

```text
[
  ["apple", 3],
  ["banana", 2],
  ["orange", 1]
]
```

Complete flow:

```text
item
↓
get old count
↓
missing? use 0
↓
+1
↓
set new count
```

---

# 38. Character Frequency With Map 🔥🔥🔥

```js
const word =
  "banana";

// Step 1: Create empty frequency Map.
const frequency =
  new Map();

// Step 2: Visit every character.
for (
  const char
  of word
) {
  // Step 3: Read current count or 0.
  const count =
    frequency.get(
      char
    ) ?? 0;

  // Step 4: Save incremented count.
  frequency.set(
    char,
    count + 1
  );
}

// Step 5: Print result.
console.log(
  [...frequency]
);
// Output:
// [
//   ["b", 1],
//   ["a", 3],
//   ["n", 2]
// ]
```

Output:

```text
[
  ["b", 1],
  ["a", 3],
  ["n", 2]
]
```

---

# 39. Index API Data by ID 🔥🔥🔥

Suppose API returns:

```js
const employees = [
  {
    id: 101,
    name: "Rahul",
  },
  {
    id: 102,
    name: "Amit",
  },
  {
    id: 103,
    name: "John",
  },
];
```

Create fast lookup by ID:

```js
const employees = [
  {
    id: 101,
    name: "Rahul",
  },
  {
    id: 102,
    name: "Amit",
  },
  {
    id: 103,
    name: "John",
  },
];

// Step 1: Create empty Map.
const employeeById =
  new Map();

// Step 2: Visit every employee.
for (
  const employee
  of employees
) {
  // Step 3: Use employee ID as key.
  employeeById.set(
    employee.id,
    employee
  );
}

// Step 4: Directly look up ID 102.
console.log(
  employeeById.get(
    102
  )
); // Output: { id: 102, name: "Amit" }
```

Output:

```text
{ id: 102, name: "Amit" }
```

Flow:

```text
employee array
↓
id → employee
↓
Map
↓
direct lookup
```

---

# 40. Machine Coding — Cache API Results 🔥🔥🔥

Problem:

```text
If employee data was already fetched,
reuse it instead of fetching again.
```

Basic cache:

```js
// Step 1: Create cache Map.
const cache =
  new Map();

function saveEmployee(
  employee
) {
  // Step 2: Use employee ID as cache key.
  cache.set(
    employee.id,
    employee
  );
}

function getEmployee(
  id
) {
  // Step 3: Check whether cache already has the ID.
  if (
    cache.has(
      id
    )
  ) {
    // Step 4: Return cached value.
    return cache.get(
      id
    );
  }

  // Step 5: Missing cache value.
  return null;
}

// Step 6: Save employee.
saveEmployee(
  {
    id: 101,
    name: "Rahul",
  }
);

// Step 7: Read cached employee.
console.log(
  getEmployee(
    101
  )
); // Output: { id: 101, name: "Rahul" }
```

Output:

```text
{ id: 101, name: "Rahul" }
```

Complete flow:

```text
ID
↓
cache.has(id)?
↓
yes → cache.get(id)
no  → fetch / return missing
```

---

# 41. Machine Coding — Selected Item Metadata

Sometimes a Set is not enough.

Suppose we need:

```text
selected?
quantity?
note?
```

Then Map is useful.

```js
// Step 1: Create metadata Map.
const selectedItems =
  new Map();

// Step 2: Use item ID as key.
selectedItems.set(
  101,
  {
    quantity: 2,
    note: "urgent",
  }
);

// Step 3: Read metadata.
console.log(
  selectedItems.get(
    101
  )
);
// Output:
// { quantity: 2, note: "urgent" }
```

Output:

```text
{ quantity: 2, note: "urgent" }
```

---

# 42. Machine Coding — Group Records With Map 🔥🔥🔥

Suppose employees belong to departments.

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
    department: "IT",
  },
  {
    id: 2,
    name: "Amit",
    department: "HR",
  },
  {
    id: 3,
    name: "John",
    department: "IT",
  },
];
```

Group them:

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
    department: "IT",
  },
  {
    id: 2,
    name: "Amit",
    department: "HR",
  },
  {
    id: 3,
    name: "John",
    department: "IT",
  },
];

// Step 1: Create empty Map.
const groups =
  new Map();

// Step 2: Visit every employee.
for (
  const employee
  of employees
) {
  // Step 3: Read department key.
  const department =
    employee.department;

  // Step 4: Get existing group,
  // or create an empty array.
  const group =
    groups.get(
      department
    ) ?? [];

  // Step 5: Add employee to that group.
  group.push(
    employee
  );

  // Step 6: Store updated group.
  groups.set(
    department,
    group
  );
}

// Step 7: Read IT group.
console.log(
  groups.get(
    "IT"
  ).map(
    ({ name }) =>
      name
  )
); // Output: ["Rahul", "John"]
```

Output:

```text
["Rahul", "John"]
```

Complete flow:

```text
employee
↓
department key
↓
get existing array
↓
push employee
↓
set group back
```

---

# 43. Machine Coding — Deduplicate by Key Using Map 🔥🔥🔥

Map can also deduplicate objects by ID.

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: "Amit",
  },
  {
    id: 1,
    name: "Rahul Updated",
  },
];

// Step 1: Create Map keyed by ID.
const byId =
  new Map();

// Step 2: Visit every employee.
for (
  const employee
  of employees
) {
  // Step 3: Same ID replaces previous value.
  byId.set(
    employee.id,
    employee
  );
}

// Step 4: Convert Map values back to array.
const uniqueEmployees =
  [...byId.values()];

// Step 5: Print names.
console.log(
  uniqueEmployees.map(
    ({ name }) =>
      name
  )
);
// Output:
// ["Rahul Updated", "Amit"]
```

Output:

```text
["Rahul Updated", "Amit"]
```

### Easy Explanation

Because Map keys are unique:

```text
id 1
→ first employee

id 1 again
→ replaces previous employee
```

---

# 44. First Value vs Last Value When Deduplicating

Using:

```js
map.set(
  id,
  employee
)
```

means:

```text
later duplicate
→ replaces earlier duplicate
```

Example:

```js
const map =
  new Map();

// Step 1: Store first value.
map.set(
  1,
  "first"
);

// Step 2: Store same key again.
map.set(
  1,
  "second"
);

// Step 3: Read final value.
console.log(
  map.get(
    1
  )
); // Output: second
```

Output:

```text
second
```

---

# 45. Interview Output — Number vs String Key 🔥🔥🔥

```js
// Step 1: Create Map.
const map =
  new Map();

// Step 2: Set numeric key.
map.set(
  1,
  "A"
);

// Step 3: Set string key.
map.set(
  "1",
  "B"
);

// Step 4: Print size.
console.log(
  map.size
); // Output: 2

// Step 5: Read numeric key.
console.log(
  map.get(
    1
  )
); // Output: A

// Step 6: Read string key.
console.log(
  map.get(
    "1"
  )
); // Output: B
```

Output:

```text
2
A
B
```

---

# 46. Interview Output — Missing Key

```js
const map =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
    ]
  );

// Step 1: Read missing key.
console.log(
  map.get(
    "age"
  )
); // Output: undefined

// Step 2: Check missing key.
console.log(
  map.has(
    "age"
  )
); // Output: false
```

Output:

```text
undefined
false
```

---

# 47. Interview Output — Updating Existing Key

```js
const map =
  new Map();

// Step 1: Set first value.
map.set(
  "role",
  "Developer"
);

// Step 2: Update same key.
map.set(
  "role",
  "Lead"
);

// Step 3: Print size.
console.log(
  map.size
); // Output: 1

// Step 4: Read current value.
console.log(
  map.get(
    "role"
  )
); // Output: Lead
```

Output:

```text
1
Lead
```

---

# 48. Interview Question — Map vs Set 🔥🔥🔥

Good answer:

```text
Set
→ stores unique values only

Map
→ stores unique keys with associated values
```

Example:

```text
Set:
101
102
103

Map:
101 → Rahul
102 → Amit
103 → John
```

---

# 49. Interview Question — Map vs Object 🔥🔥🔥

Good answer:

```text
Object:
best for normal structured records
and JSON-style data

Map:
best for dynamic key-value collections,
non-string keys,
frequent lookup,
caching,
frequency counting
```

---

# 50. Debugging — Using Object Syntax on Map

Wrong:

```js
const map =
  new Map();

// Step 1: This creates a normal object property
// on the Map object itself.
// It does NOT create a Map entry.
map.name =
  "Rahul";

// Step 2: Map get() cannot find it.
console.log(
  map.get(
    "name"
  )
); // Output: undefined
```

Output:

```text
undefined
```

Correct:

```js
// Step 1: Use set().
map.set(
  "name",
  "Rahul"
);

// Step 2: Use get().
console.log(
  map.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 51. Debugging — Using Bracket Access on Map

Wrong:

```js
const map =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
    ]
  );

// Step 1: Map is not read with bracket syntax.
console.log(
  map[
    "name"
  ]
); // Output: undefined
```

Output:

```text
undefined
```

Correct:

```js
// Step 1: Use get().
console.log(
  map.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 52. Practical Decision Guide 🔥🔥🔥

```text
Need key-value collection?
→ Map

Need add/update?
→ set(key, value)

Need read?
→ get(key)

Need existence check?
→ has(key)

Need remove one?
→ delete(key)

Need remove all?
→ clear()

Need count entries?
→ size

Need keys?
→ keys()

Need values?
→ values()

Need key-value pairs?
→ entries()

Need Object → Map?
→ new Map(Object.entries(obj))

Need Map → Object?
→ Object.fromEntries(map)

Need frequency counter?
→ Map

Need cache?
→ Map

Need API lookup by ID?
→ Map

Need object/function as key?
→ Map
```

---

# 53. Most Important Map Rules 🔥🔥🔥

```text
Map stores key-value pairs.

Map keys are unique.

set()
adds or updates.

get()
reads a value.

has()
checks key existence.

delete()
removes one entry.

clear()
removes all entries.

size
counts entries.

Map preserves insertion order.

Map keys can be:
string
number
boolean
object
array
function
and more.

1 and "1"
are different Map keys.

Object keys use reference identity.

Map is directly iterable.

for...of gives:
[key, value]

Map forEach callback is:
(value, key)

Object → Map:
new Map(Object.entries(obj))

Map → Object:
Object.fromEntries(map)
```

---

# 54. Quick Memory 🧠

Create:

```js
// Step 1: Create empty Map.
const map =
  new Map();
```

Set:

```js
// Step 1: Add key-value pair.
map.set(
  "name",
  "Rahul"
);
```

Get:

```js
// Step 1: Read value.
console.log(
  map.get(
    "name"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

Has:

```js
// Step 1: Check key.
console.log(
  map.has(
    "name"
  )
); // Output: true
```

Output:

```text
true
```

Delete:

```js
// Step 1: Remove one entry.
map.delete(
  "name"
);
```

Clear:

```js
// Step 1: Remove all entries.
map.clear();
```

Size:

```js
// Step 1: Count entries.
console.log(
  map.size
);
```

Object → Map:

```js
const object = {
  name: "Rahul",
  age: 30,
};

// Step 1: Object to entries.
// Step 2: Entries to Map.
const map =
  new Map(
    Object.entries(
      object
    )
  );
```

Map → Object:

```js
// Step 1: Convert Map entries to object properties.
const object =
  Object.fromEntries(
    map
  );
```

Frequency pattern:

```js
const frequency =
  new Map();

for (
  const item
  of items
) {
  // Step 1: Read old count or 0.
  const count =
    frequency.get(
      item
    ) ?? 0;

  // Step 2: Increase and save.
  frequency.set(
    item,
    count + 1
  );
}
```

Most important interview traps:

```text
size vs length
get() vs bracket syntax
set() vs object property assignment
number key vs string key
object key reference identity
forEach(value, key)
```

## ✅ 6.15 Maps complete

**JavaScript Core topics remaining after this: 5**

```text
6.16 JSON
6.17 Modules
6.18 Regex
6.19 Error Handling
6.20 Core Practical
```

**Next: 6.16 JSON 🔥🔥🔥**
