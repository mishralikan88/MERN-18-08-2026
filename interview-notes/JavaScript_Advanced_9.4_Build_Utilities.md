# 9.4 Build Utilities 🔥🔥🔥

In this chapter, we will build reusable JavaScript utility functions from scratch.

These utilities are common in:

```text
machine-coding rounds
frontend interviews
API data transformation
form handling
nested-object work
array processing
state utilities
real application helpers
```

We will cover:

```text
flatten()
flattenDepth()
groupBy()
chunk()
unique()
deepClone()
deepEqual()
deepGet()
deepSet()
debounce()
throttle()
curry()
memoize()
once()
retry()
compose()
pipe()
```

The goal is not just to memorize code.

For every utility, understand:

```text
What problem does it solve?
↓
What input does it receive?
↓
What output should it return?
↓
What is every step doing?
↓
What edge cases matter?
↓
Where would we use it?
```

---

# 1. What Is a Utility Function? 🔥🔥🔥

A utility function is:

```text
small
reusable
focused
general-purpose
```

Example:

```js
function add(
  a,
  b
) {
  // Step 1: Return the sum of both numbers.
  return (
    a + b
  );
}
```

A useful utility usually does one clear job.

---

# 2. Why Build Utilities?

Suppose several parts of your application need:

```text
flatten nested arrays
group employees by department
read nested object values safely
clone data
compare objects
limit event execution
retry API requests
```

Instead of rewriting logic everywhere:

```text
Component A
Component B
Component C
```

we create:

```text
shared utility
```

and reuse it.

---

# 3. Utility Design Rule 🔥🔥🔥

A good utility should usually be:

```text
predictable
small
reusable
easy to test
clear input/output
low side-effect
```

Interviewers often care about:

```text
correctness
edge cases
time complexity
mutation
recursion
clean naming
```

---

# 4. `flatten()` 🔥🔥🔥

## What does flatten do?

Input:

```text
[1, [2, [3, 4]], 5]
```

Output:

```text
[1, 2, 3, 4, 5]
```

It removes all nesting levels.

---

# 5. Flatten Mental Model

```text
value is normal?
→ push it

value is array?
→ go inside it
→ repeat same logic
```

This naturally suggests:

```text
recursion
```

---

# 6. Build `flatten()` Step by Step 🔥🔥🔥

```js
function flatten(
  input
) {
  // Step 1: Create the final flat result array.
  const result =
    [];

  // Step 2: Create a recursive helper
  // that can process one array at a time.
  function walk(
    array
  ) {
    // Step 3: Visit every value in the current array.
    for (
      const value
      of
      array
    ) {
      // Step 4: If current value is another array,
      // recursively process that nested array.
      if (
        Array.isArray(
          value
        )
      ) {
        walk(
          value
        );

        continue;
      }

      // Step 5: Current value is not an array,
      // so add it directly to result.
      result.push(
        value
      );
    }
  }

  // Step 6: Start processing from the original input.
  walk(
    input
  );

  // Step 7: Return the completely flattened array.
  return result;
}
```

---

# 7. Test `flatten()` 🔥🔥🔥

```js
const values = [
  1,
  [
    2,
    [
      3,
      4,
    ],
  ],
  5,
];

// Step 1: Flatten all nesting levels.
const result =
  flatten(
    values
  );

// Step 2: Print final flat array.
console.log(
  result
); // Output: [1, 2, 3, 4, 5]
```

Output:

```text
[1, 2, 3, 4, 5]
```

---

# 8. Flatten Execution Trace

Input:

```text
[1, [2, [3, 4]], 5]
```

Flow:

```text
1
→ push 1

[2, [3, 4]]
→ nested array
→ recurse

2
→ push 2

[3, 4]
→ nested array
→ recurse

3
→ push 3

4
→ push 4

5
→ push 5
```

Result:

```text
[1, 2, 3, 4, 5]
```

---

# 9. Why Recursion Works Here 🔥🔥🔥

The nested structure repeats the same shape:

```text
array
contains
value or another array
```

That means the same logic can call itself.

This is a classic recursive problem.

---

# 10. `flattenDepth()` 🔥🔥🔥

Sometimes we do not want to flatten everything.

Example:

```text
input:
[1, [2, [3, 4]], 5]

depth = 1
```

Output:

```text
[1, 2, [3, 4], 5]
```

Only one nesting level is removed.

---

# 11. Flatten Depth Mental Model

```text
depth > 0
AND
value is array
→ recurse with depth - 1

otherwise
→ push value
```

---

# 12. Build `flattenDepth()` 🔥🔥🔥

```js
function flattenDepth(
  input,
  depth = 1
) {
  // Step 1: Create the final result array.
  const result =
    [];

  // Step 2: Helper receives:
  // current array
  // remaining depth allowed.
  function walk(
    array,
    remainingDepth
  ) {
    // Step 3: Visit every value.
    for (
      const value
      of
      array
    ) {
      // Step 4: Flatten nested array
      // only when depth is still available.
      if (
        Array.isArray(
          value
        )
        &&
        remainingDepth
        >
        0
      ) {
        walk(
          value,
          remainingDepth
          -
          1
        );

        continue;
      }

      // Step 5: Either value is not an array,
      // or depth limit has been reached.
      result.push(
        value
      );
    }
  }

  // Step 6: Start with requested depth.
  walk(
    input,
    depth
  );

  // Step 7: Return partially flattened array.
  return result;
}
```

---

# 13. Test `flattenDepth()` 🔥🔥🔥

```js
const values = [
  1,
  [
    2,
    [
      3,
      4,
    ],
  ],
  5,
];

// Step 1: Flatten only one level.
const result =
  flattenDepth(
    values,
    1
  );

// Step 2: Print result.
console.log(
  result
); // Output: [1, 2, [3, 4], 5]
```

Output:

```text
[1, 2, [3, 4], 5]
```

---

# 14. Depth Trace

```text
outer depth = 1

[2, [3,4]]
↓
allowed to flatten
↓
remaining depth = 0

2
→ push

[3,4]
↓
depth = 0
↓
do NOT flatten
↓
push [3,4]
```

---

# 15. Flatten vs FlattenDepth

```text
flatten()
→ remove all levels

flattenDepth(array, 1)
→ remove one level

flattenDepth(array, 2)
→ remove two levels
```

---

# 16. `groupBy()` 🔥🔥🔥

## What does groupBy do?

Input:

```js
[
  {
    name:
      "Rahul",
    department:
      "IT",
  },
  {
    name:
      "Priya",
    department:
      "HR",
  },
  {
    name:
      "Amit",
    department:
      "IT",
  },
]
```

Output:

```text
IT → Rahul, Amit
HR → Priya
```

We group items using a key.

---

# 17. GroupBy Mental Model

For every item:

```text
find group key
↓
does group already exist?

no
→ create []

yes
→ reuse []

push current item
```

---

# 18. Build `groupBy()` Using Property Name 🔥🔥🔥

```js
function groupByProperty(
  items,
  key
) {
  // Step 1: Create object
  // that will hold all groups.
  const result =
    {};

  // Step 2: Visit every item.
  for (
    const item
    of
    items
  ) {
    // Step 3: Read group value dynamically.
    // Example:
    // item["department"] -> "IT"
    const groupKey =
      item[key];

    // Step 4: If group does not exist yet,
    // create an empty array for it.
    if (
      !result[
        groupKey
      ]
    ) {
      result[
        groupKey
      ] =
        [];
    }

    // Step 5: Add current item
    // into its matching group.
    result[
      groupKey
    ].push(
      item
    );
  }

  // Step 6: Return grouped object.
  return result;
}
```

---

# 19. Test Property `groupBy()` 🔥🔥🔥

```js
const employees = [
  {
    name:
      "Rahul",
    department:
      "IT",
  },
  {
    name:
      "Priya",
    department:
      "HR",
  },
  {
    name:
      "Amit",
    department:
      "IT",
  },
];

// Step 1: Group employees by department.
const grouped =
  groupByProperty(
    employees,
    "department"
  );

// Step 2: Print IT employee names.
console.log(
  grouped.IT.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Rahul", "Amit"]

// Step 3: Print HR employee names.
console.log(
  grouped.HR.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Priya"]
```

Output:

```text
["Rahul", "Amit"]
["Priya"]
```

---

# 20. GroupBy Trace 🔥🔥🔥

Rahul:

```text
department = IT
↓
IT missing
↓
create IT: []
↓
push Rahul
```

Priya:

```text
department = HR
↓
HR missing
↓
create HR: []
↓
push Priya
```

Amit:

```text
department = IT
↓
IT exists
↓
push Amit
```

---

# 21. More Flexible `groupBy()` With Callback 🔥🔥🔥

```js
function groupBy(
  items,
  getKey
) {
  // Step 1: Create empty grouped result.
  const result =
    {};

  // Step 2: Visit each item.
  for (
    const item
    of
    items
  ) {
    // Step 3: Let caller decide
    // how the group key is calculated.
    const groupKey =
      getKey(
        item
      );

    // Step 4: Create group if needed.
    if (
      !result[
        groupKey
      ]
    ) {
      result[
        groupKey
      ] =
        [];
    }

    // Step 5: Add current item.
    result[
      groupKey
    ].push(
      item
    );
  }

  // Step 6: Return grouped result.
  return result;
}
```

---

# 22. GroupBy Callback Example

```js
const numbers = [
  1,
  2,
  3,
  4,
  5,
];

// Step 1: Group values as odd/even.
const grouped =
  groupBy(
    numbers,
    (
      value
    ) => {
      // Step 2: Return group key.
      return (
        value % 2
        ===
        0
          ? "even"
          : "odd"
      );
    }
  );

// Step 3: Print grouped result.
console.log(
  grouped
);
// Output:
// {
//   odd: [1, 3, 5],
//   even: [2, 4]
// }
```

Output:

```text
{
  odd: [1, 3, 5],
  even: [2, 4]
}
```

---

# 23. `chunk()` 🔥🔥🔥

## What does chunk do?

Input:

```text
[1,2,3,4,5]
```

Size:

```text
2
```

Output:

```text
[[1,2], [3,4], [5]]
```

---

# 24. Chunk Real Use Cases

```text
pagination preparation
batch API processing
grid rows
upload batches
rate-limited work
```

---

# 25. Build `chunk()` Step by Step 🔥🔥🔥

```js
function chunk(
  items,
  size
) {
  // Step 1: Reject invalid chunk sizes.
  if (
    size
    <=
    0
  ) {
    throw new Error(
      "Chunk size must be greater than 0"
    );
  }

  // Step 2: Create final array of chunks.
  const result =
    [];

  // Step 3: Move through input
  // by `size` items each time.
  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    // Step 4: Extract one chunk
    // from index up to index + size.
    const currentChunk =
      items.slice(
        index,
        index + size
      );

    // Step 5: Add chunk to result.
    result.push(
      currentChunk
    );
  }

  // Step 6: Return all chunks.
  return result;
}
```

---

# 26. Test `chunk()` 🔥🔥🔥

```js
const values = [
  1,
  2,
  3,
  4,
  5,
];

// Step 1: Split into groups of 2.
const result =
  chunk(
    values,
    2
  );

// Step 2: Print chunks.
console.log(
  result
); // Output: [[1, 2], [3, 4], [5]]
```

Output:

```text
[[1, 2], [3, 4], [5]]
```

---

# 27. Chunk Trace

```text
index = 0
slice(0,2)
→ [1,2]

index = 2
slice(2,4)
→ [3,4]

index = 4
slice(4,6)
→ [5]
```

---

# 28. Why `index += size`?

If size is 2:

```text
0
2
4
6
```

We jump directly to the start of the next chunk.

---

# 29. `unique()` 🔥🔥🔥

## What does unique do?

Input:

```text
[1,2,2,3,3,3]
```

Output:

```text
[1,2,3]
```

---

# 30. Simplest `unique()` Using Set 🔥🔥🔥

```js
function unique(
  items
) {
  // Step 1: Set automatically
  // keeps only unique values.
  const uniqueValues =
    new Set(
      items
    );

  // Step 2: Convert Set back to array.
  return [
    ...uniqueValues,
  ];
}
```

---

# 31. Test `unique()` 🔥🔥🔥

```js
const values = [
  1,
  2,
  2,
  3,
  3,
  3,
];

// Step 1: Remove duplicates.
const result =
  unique(
    values
  );

// Step 2: Print unique values.
console.log(
  result
); // Output: [1, 2, 3]
```

Output:

```text
[1, 2, 3]
```

---

# 32. Unique Without Set — Interview Version 🔥🔥🔥

```js
function uniqueWithoutSet(
  items
) {
  // Step 1: Create result array.
  const result =
    [];

  // Step 2: Visit each value.
  for (
    const value
    of
    items
  ) {
    // Step 3: Add value only
    // if result does not already contain it.
    if (
      !result.includes(
        value
      )
    ) {
      result.push(
        value
      );
    }
  }

  // Step 4: Return duplicate-free array.
  return result;
}
```

---

# 33. Unique Primitive vs Object Caveat 🔥🔥🔥

```js
const a = {
  id:
    1,
};

const b = {
  id:
    1,
};

// Step 1: Same content does not mean
// same object reference.
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

So `Set` keeps both objects because their references are different.

---

# 34. Unique Objects By Key 🔥🔥🔥

```js
function uniqueBy(
  items,
  getKey
) {
  // Step 1: Track keys already seen.
  const seen =
    new Set();

  // Step 2: Store unique items.
  const result =
    [];

  // Step 3: Visit every item.
  for (
    const item
    of
    items
  ) {
    // Step 4: Calculate uniqueness key.
    const key =
      getKey(
        item
      );

    // Step 5: Skip item
    // when key was already seen.
    if (
      seen.has(
        key
      )
    ) {
      continue;
    }

    // Step 6: Remember new key.
    seen.add(
      key
    );

    // Step 7: Keep first item for that key.
    result.push(
      item
    );
  }

  // Step 8: Return unique items.
  return result;
}
```

---

# 35. Test `uniqueBy()` 🔥🔥🔥

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
  },
  {
    id:
      2,
    name:
      "Priya",
  },
  {
    id:
      1,
    name:
      "Rahul Duplicate",
  },
];

// Step 1: Keep first employee per id.
const result =
  uniqueBy(
    employees,
    (
      employee
    ) => {
      return employee.id;
    }
  );

// Step 2: Print kept names.
console.log(
  result.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Rahul", "Priya"]
```

Output:

```text
["Rahul", "Priya"]
```

---

# 36. `deepClone()` 🔥🔥🔥

## What problem does deep clone solve?

Shallow copy:

```js
const copy = {
  ...original,
};
```

copies only the top level.

Nested objects are still shared.

---

# 37. Shallow Copy Problem 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",

  address: {
    city:
      "Mumbai",
  },
};

// Step 1: Create shallow copy.
const copy = {
  ...employee,
};

// Step 2: Change nested city through copy.
copy.address.city =
  "Pune";

// Step 3: Original nested object also changed
// because both share the same address reference.
console.log(
  employee.address.city
); // Output: Pune
```

Output:

```text
Pune
```

---

# 38. Deep Clone Goal

We want:

```text
top-level object
→ new object

nested object
→ new object

nested array
→ new array
```

So changing clone should not affect original.

---

# 39. Simple Recursive `deepClone()` 🔥🔥🔥

```js
function deepCloneSimple(
  value
) {
  // Step 1: Primitive values
  // can be returned directly.
  if (
    value
    ===
    null
    ||
    typeof value
    !==
    "object"
  ) {
    return value;
  }

  // Step 2: If value is an array,
  // recursively clone every item.
  if (
    Array.isArray(
      value
    )
  ) {
    return value.map(
      (
        item
      ) => {
        return deepCloneSimple(
          item
        );
      }
    );
  }

  // Step 3: Otherwise create
  // a new plain object.
  const result =
    {};

  // Step 4: Visit every own enumerable property.
  for (
    const key
    of
    Object.keys(
      value
    )
  ) {
    // Step 5: Recursively clone each property value.
    result[key] =
      deepCloneSimple(
        value[key]
      );
  }

  // Step 6: Return fully cloned object.
  return result;
}
```

---

# 40. Test Simple `deepClone()` 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",

  address: {
    city:
      "Mumbai",
  },

  skills: [
    "JS",
    "React",
  ],
};

// Step 1: Create deep clone.
const copy =
  deepCloneSimple(
    employee
  );

// Step 2: Change nested clone value.
copy.address.city =
  "Pune";

// Step 3: Original stays unchanged.
console.log(
  employee.address.city
); // Output: Mumbai

// Step 4: Clone has changed value.
console.log(
  copy.address.city
); // Output: Pune
```

Output:

```text
Mumbai
Pune
```

---

# 41. Deep Clone Limitations 🔥🔥🔥

Our simple version handles:

```text
plain objects
arrays
primitives
```

But not perfectly:

```text
Date
Map
Set
RegExp
functions
class instances
property descriptors
circular references
```

When suitable and supported, modern JavaScript also provides:

```js
structuredClone(
  value
);
```

for many structured data cases.

---

# 42. Circular Reference Problem

```js
const user = {
  name:
    "Rahul",
};

user.self =
  user;
```

Naive recursion becomes:

```text
user.self
→ user
→ user.self
→ user
→ forever
```

We need to remember already-cloned objects.

---

# 43. Circular-Safe `deepClone()` With WeakMap 🔥🔥🔥

```js
function deepClone(
  value,
  seen = new WeakMap()
) {
  // Step 1: Return primitives directly.
  if (
    value
    ===
    null
    ||
    typeof value
    !==
    "object"
  ) {
    return value;
  }

  // Step 2: If this object
  // was already cloned,
  // reuse the earlier clone.
  if (
    seen.has(
      value
    )
  ) {
    return seen.get(
      value
    );
  }

  // Step 3: Create correct base container.
  const result =
    Array.isArray(
      value
    )
      ? []
      : {};

  // Step 4: Store mapping BEFORE recursion.
  // This breaks circular loops.
  seen.set(
    value,
    result
  );

  // Step 5: Clone every own enumerable property.
  for (
    const key
    of
    Object.keys(
      value
    )
  ) {
    result[key] =
      deepClone(
        value[key],
        seen
      );
  }

  // Step 6: Return cloned structure.
  return result;
}
```

---

# 44. Why WeakMap Here? 🔥🔥🔥

We need mapping:

```text
original object
→ cloned object
```

If recursion sees the same original object again:

```text
return existing clone
```

instead of cloning forever.

---

# 45. `deepEqual()` 🔥🔥🔥

## What does deepEqual do?

It asks:

```text
Do these two values
have the same nested structure and content?
```

Using `===` on separate objects checks references, not nested content.

---

# 46. Build `deepEqual()` Step by Step 🔥🔥🔥

```js
function deepEqual(
  first,
  second
) {
  // Step 1: Same reference or same primitive
  // means they are equal immediately.
  if (
    Object.is(
      first,
      second
    )
  ) {
    return true;
  }

  // Step 2: If either value is null
  // or not an object,
  // and Object.is already failed,
  // they are not deeply equal.
  if (
    first
    ===
    null
    ||
    second
    ===
    null
    ||
    typeof first
    !==
    "object"
    ||
    typeof second
    !==
    "object"
  ) {
    return false;
  }

  // Step 3: Array-vs-object mismatch
  // means structures differ.
  if (
    Array.isArray(
      first
    )
    !==
    Array.isArray(
      second
    )
  ) {
    return false;
  }

  // Step 4: Read own enumerable keys.
  const firstKeys =
    Object.keys(
      first
    );

  const secondKeys =
    Object.keys(
      second
    );

  // Step 5: Different key counts
  // means structures differ.
  if (
    firstKeys.length
    !==
    secondKeys.length
  ) {
    return false;
  }

  // Step 6: Compare every property recursively.
  for (
    const key
    of
    firstKeys
  ) {
    // Step 7: Second object must contain same key.
    if (
      !Object.hasOwn(
        second,
        key
      )
    ) {
      return false;
    }

    // Step 8: Nested values must also be equal.
    if (
      !deepEqual(
        first[key],
        second[key]
      )
    ) {
      return false;
    }
  }

  // Step 9: No difference was found.
  return true;
}
```

---

# 47. Test `deepEqual()` 🔥🔥🔥

```js
const first = {
  id:
    1,

  address: {
    city:
      "Mumbai",
  },
};

const second = {
  id:
    1,

  address: {
    city:
      "Mumbai",
  },
};

// Step 1: References are different.
console.log(
  first
  ===
  second
); // Output: false

// Step 2: Structural content is equal.
console.log(
  deepEqual(
    first,
    second
  )
); // Output: true
```

Output:

```text
false
true
```

---

# 48. DeepEqual Difference Example

```js
const first = {
  id:
    1,
};

const second = {
  id:
    2,
};

// Step 1: Property values differ.
console.log(
  deepEqual(
    first,
    second
  )
); // Output: false
```

Output:

```text
false
```

---

# 49. Why Use `Object.is()`?

Example:

```js
// Step 1: Object.is correctly treats NaN as equal to NaN.
console.log(
  Object.is(
    NaN,
    NaN
  )
); // Output: true
```

Output:

```text
true
```

---

# 50. DeepEqual Limitations

Simple recursive deep equality becomes more complex for:

```text
Date
Map
Set
RegExp
cycles
class instances
symbols
non-enumerable properties
```

In interviews, clearly state what data shape your implementation supports.

---

# 51. `deepGet()` 🔥🔥🔥

## What does deepGet do?

It safely reads a nested path.

Example:

```js
deepGet(
  employee,
  "address.city"
);
```

---

# 52. Why DeepGet?

Direct access:

```js
employee.address.city
```

can fail when an intermediate value is missing.

`deepGet()` can safely return:

```text
undefined
```

or a fallback.

---

# 53. Build `deepGet()` Step by Step 🔥🔥🔥

```js
function deepGet(
  object,
  path,
  defaultValue
) {
  // Step 1: Support either a string path
  // or an already-created array of keys.
  const keys =
    Array.isArray(
      path
    )
      ? path
      : path.split(
          "."
        );

  // Step 2: Start traversal
  // from the root object.
  let current =
    object;

  // Step 3: Visit every path segment.
  for (
    const key
    of
    keys
  ) {
    // Step 4: If current is null/undefined,
    // deeper lookup is impossible.
    if (
      current
      == null
    ) {
      return defaultValue;
    }

    // Step 5: Move one level deeper.
    current =
      current[key];
  }

  // Step 6: Return fallback only when
  // final value is actually undefined.
  return (
    current
    ===
    undefined
      ? defaultValue
      : current
  );
}
```

---

# 54. Test `deepGet()` 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",

  address: {
    city:
      "Mumbai",
  },
};

// Step 1: Read existing nested value.
console.log(
  deepGet(
    employee,
    "address.city"
  )
); // Output: Mumbai

// Step 2: Read missing path with fallback.
console.log(
  deepGet(
    employee,
    "address.pin",
    "Not Available"
  )
); // Output: Not Available
```

Output:

```text
Mumbai
Not Available
```

---

# 55. DeepGet Trace

Path:

```text
address.city
```

becomes:

```text
["address", "city"]
```

Then:

```text
current = employee
↓
current = employee.address
↓
current = employee.address.city
↓
"Mumbai"
```

---

# 56. `deepSet()` 🔥🔥🔥

## What does deepSet do?

It creates or updates a nested property using a path.

Example:

```js
deepSet(
  employee,
  "address.city",
  "Mumbai"
);
```

If `address` does not exist, it can create it.

---

# 57. Build `deepSet()` Step by Step 🔥🔥🔥

```js
function deepSet(
  object,
  path,
  value
) {
  // Step 1: Convert the path
  // into an array of keys.
  const keys =
    Array.isArray(
      path
    )
      ? path
      : path.split(
          "."
        );

  // Step 2: Start at the root object.
  let current =
    object;

  // Step 3: Walk through every key
  // except the final key.
  for (
    let index = 0;
    index < keys.length - 1;
    index++
  ) {
    const key =
      keys[index];

    // Step 4: If the intermediate value
    // does not exist or is not an object,
    // create an empty object.
    if (
      current[key]
      == null
      ||
      typeof current[key]
      !==
      "object"
    ) {
      current[key] =
        {};
    }

    // Step 5: Move one level deeper.
    current =
      current[key];
  }

  // Step 6: Read the final key.
  const finalKey =
    keys[
      keys.length
      -
      1
    ];

  // Step 7: Store the new value
  // at the final nested location.
  current[
    finalKey
  ] =
    value;

  // Step 8: Return the same root object
  // after mutation for convenience.
  return object;
}
```

---

# 58. Test `deepSet()` 🔥🔥🔥

```js
const employee = {
  name:
    "Rahul",
};

// Step 1: Create address.city
// even though address does not exist yet.
deepSet(
  employee,
  "address.city",
  "Mumbai"
);

// Step 2: Print the created nested value.
console.log(
  employee.address.city
); // Output: Mumbai
```

Output:

```text
Mumbai
```

---

# 59. DeepSet Mutation Warning 🔥🔥🔥

Our `deepSet()`:

```text
MUTATES the original object
```

That may be acceptable if documented.

But in React state updates, you often want:

```text
immutable update
```

So do not blindly mutate React state with this helper.

---

# 60. DeepGet vs DeepSet

```text
deepGet
→ read nested path safely

deepSet
→ create/update nested path
```

---

# 61. `debounce()` Utility 🔥🔥🔥

We already learned debounce in 9.1.

Here we include it as part of our reusable utility collection.

Goal:

```text
rapid calls
↓
reset timer
↓
execute only after quiet period
```

---

# 62. Reusable `debounce()` 🔥🔥🔥

```js
function debounce(
  fn,
  delay
) {
  // Step 1: Remember the active timer
  // between calls using closure.
  let timerId;

  // Step 2: Return the debounced wrapper.
  return function (
    ...args
  ) {
    // Step 3: Preserve the caller's `this`.
    const context =
      this;

    // Step 4: Cancel the previous scheduled call.
    clearTimeout(
      timerId
    );

    // Step 5: Schedule only the latest call.
    timerId =
      setTimeout(
        () => {
          // Step 6: Execute the original function
          // with the same this and latest arguments.
          fn.apply(
            context,
            args
          );
        },
        delay
      );
  };
}
```

---

# 63. Debounce Test

```js
function search(
  query
) {
  // Step 1: Print the final surviving query.
  console.log(
    query
  ); // Final Output: Rahul
}

// Step 2: Create the debounced version.
const debouncedSearch =
  debounce(
    search,
    300
  );

// Step 3: Earlier scheduled calls
// are cancelled by later calls.
debouncedSearch(
  "R"
);

debouncedSearch(
  "Ra"
);

debouncedSearch(
  "Rahul"
);
```

Output after the delay:

```text
Rahul
```

---

# 64. `throttle()` Utility 🔥🔥🔥

Goal:

```text
allow one execution
↓
block calls during interval
↓
allow again later
```

---

# 65. Reusable `throttle()` 🔥🔥🔥

```js
function throttle(
  fn,
  delay
) {
  // Step 1: Track whether execution
  // is currently allowed.
  let allowed =
    true;

  // Step 2: Return the throttled wrapper.
  return function (
    ...args
  ) {
    // Step 3: Ignore the call
    // while still inside the throttle window.
    if (
      !allowed
    ) {
      return;
    }

    // Step 4: Block the following calls.
    allowed =
      false;

    // Step 5: Execute the accepted call immediately.
    fn.apply(
      this,
      args
    );

    // Step 6: Re-enable execution after the delay.
    setTimeout(
      () => {
        allowed =
          true;
      },
      delay
    );
  };
}
```

---

# 66. Throttle Test

```js
function track(
  value
) {
  // Step 1: Print the accepted value.
  console.log(
    value
  ); // Immediate Output: 1
}

// Step 2: Allow one call per second.
const throttled =
  throttle(
    track,
    1000
  );

// Step 3: First call executes.
// The next two happen during the blocked window.
throttled(
  1
);

throttled(
  2
);

throttled(
  3
);
```

Immediate output:

```text
1
```

---

# 67. `curry()` Utility 🔥🔥🔥

Goal:

```text
f(a,b,c)
↓
f(a)(b)(c)
```

---

# 68. Build Generic `curry()` 🔥🔥🔥

```js
function curry(
  fn
) {
  // Step 1: Return a reusable argument collector.
  return function curried(
    ...args
  ) {
    // Step 2: If enough arguments
    // have been collected,
    // execute the original function.
    if (
      args.length
      >=
      fn.length
    ) {
      return fn(
        ...args
      );
    }

    // Step 3: Otherwise return another function
    // to collect more arguments.
    return function (
      ...nextArgs
    ) {
      // Step 4: Merge old and new arguments,
      // then check again.
      return curried(
        ...args,
        ...nextArgs
      );
    };
  };
}
```

---

# 69. Curry Test

```js
function sum(
  a,
  b,
  c
) {
  // Step 1: Return the total.
  return (
    a + b + c
  );
}

// Step 2: Convert sum into a curried function.
const curriedSum =
  curry(
    sum
  );

// Step 3: Supply values in stages.
console.log(
  curriedSum(
    1
  )(
    2
  )(
    3
  )
); // Output: 6
```

Output:

```text
6
```

---

# 70. `memoize()` Utility 🔥🔥🔥

Goal:

```text
same input
↓
reuse previous result
```

---

# 71. Build Generic `memoize()` 🔥🔥🔥

```js
function memoize(
  fn
) {
  // Step 1: Create a private cache.
  const cache =
    new Map();

  // Step 2: Return the cached wrapper.
  return function (
    ...args
  ) {
    // Step 3: Build a simple key
    // from the received arguments.
    const key =
      JSON.stringify(
        args
      );

    // Step 4: Return the cached result
    // when this key already exists.
    if (
      cache.has(
        key
      )
    ) {
      return cache.get(
        key
      );
    }

    // Step 5: Calculate the result.
    const result =
      fn.apply(
        this,
        args
      );

    // Step 6: Cache the calculated result.
    cache.set(
      key,
      result
    );

    // Step 7: Return the result.
    return result;
  };
}
```

---

# 72. Memoize Test

```js
let calls =
  0;

function add(
  a,
  b
) {
  // Step 1: Count actual executions.
  calls++;

  // Step 2: Return the sum.
  return (
    a + b
  );
}

// Step 3: Memoize add.
const memoizedAdd =
  memoize(
    add
  );

// Step 4: First call calculates and caches 30.
console.log(
  memoizedAdd(
    10,
    20
  )
); // Output: 30

// Step 5: Same arguments reuse the cached 30.
console.log(
  memoizedAdd(
    10,
    20
  )
); // Output: 30

// Step 6: Original function ran only once.
console.log(
  calls
); // Output: 1
```

Output:

```text
30
30
1
```

---

# 73. Memoize Cache-Key Warning

`JSON.stringify(args)` is simple but not universal.

Potential issues:

```text
functions
symbols
circular objects
special object types
large argument structures
```

For interviews, clearly state the assumptions your implementation supports.

---

# 74. `once()` Utility 🔥🔥🔥

Goal:

```text
first call
→ execute

later calls
→ reuse first result
```

---

# 75. Build `once()` 🔥🔥🔥

```js
function once(
  fn
) {
  // Step 1: Remember whether fn already ran.
  let called =
    false;

  // Step 2: Remember the first result.
  let result;

  // Step 3: Return the wrapper.
  return function (
    ...args
  ) {
    // Step 4: Reuse the stored result
    // after the first execution.
    if (
      called
    ) {
      return result;
    }

    // Step 5: Mark the function as called.
    called =
      true;

    // Step 6: Execute the original function once.
    result =
      fn.apply(
        this,
        args
      );

    // Step 7: Return the first result.
    return result;
  };
}
```

---

# 76. Once Test

```js
let calls =
  0;

function initialize() {
  // Step 1: Count real initializations.
  calls++;

  // Step 2: Return status.
  return "Ready";
}

// Step 3: Create a once wrapper.
const initializeOnce =
  once(
    initialize
  );

// Step 4: First call executes.
console.log(
  initializeOnce()
); // Output: Ready

// Step 5: Second call reuses the first result.
console.log(
  initializeOnce()
); // Output: Ready

// Step 6: Original function ran only once.
console.log(
  calls
); // Output: 1
```

Output:

```text
Ready
Ready
1
```

---

# 77. `retry()` Utility 🔥🔥🔥

Goal:

```text
async operation fails
↓
try again
↓
stop after retry limit
```

---

# 78. Build `retry()` 🔥🔥🔥

```js
async function retry(
  operation,
  retries = 3
) {
  // Step 1: Save the latest error.
  let lastError;

  // Step 2: Allow the initial attempt
  // plus the configured retries.
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3: Return immediately
      // when the operation succeeds.
      return await operation();
    } catch (
      error
    ) {
      // Step 4: Save this failure.
      lastError =
        error;
    }
  }

  // Step 5: Every attempt failed,
  // so throw the final error.
  throw lastError;
}
```

---

# 79. Retry Test 🔥🔥🔥

```js
let attempt =
  0;

async function unstable() {
  // Step 1: Count the current attempt.
  attempt++;

  // Step 2: Fail the first two attempts.
  if (
    attempt
    <
    3
  ) {
    throw new Error(
      "Temporary failure"
    );
  }

  // Step 3: Third attempt succeeds.
  return "Success";
}

async function run() {
  // Step 4: Retry when failures happen.
  const result =
    await retry(
      unstable,
      3
    );

  // Step 5: Print the final success value.
  console.log(
    result
  ); // Output: Success

  // Step 6: Show actual attempt count.
  console.log(
    attempt
  ); // Output: 3
}

// Step 7: Start the test.
run();
```

Output:

```text
Success
3
```

---

# 80. Retry Safety Rule 🔥🔥🔥

Do not blindly retry:

```text
payments
order creation
non-idempotent POST
validation errors
401
403
```

Possible retry candidates:

```text
temporary network failure
502
503
504
timeout
```

---

# 81. `compose()` Utility 🔥🔥🔥

Goal:

```text
functions execute
right to left
```

---

# 82. Build `compose()` 🔥🔥🔥

```js
function compose(
  ...functions
) {
  // Step 1: Return the combined function.
  return function (
    value
  ) {
    // Step 2: Start from the rightmost function.
    return functions.reduceRight(
      (
        result,
        fn
      ) => {
        // Step 3: Feed the current result
        // into the next function.
        return fn(
          result
        );
      },
      value
    );
  };
}
```

---

# 83. Compose Test

```js
function addOne(
  value
) {
  // Step 1: Add 1.
  return (
    value + 1
  );
}

function double(
  value
) {
  // Step 2: Double the value.
  return (
    value * 2
  );
}

// Step 3: Compose goes right to left.
// addOne(5) -> 6
// double(6) -> 12
const calculate =
  compose(
    double,
    addOne
  );

// Step 4: Print the final result.
console.log(
  calculate(
    5
  )
); // Output: 12
```

Output:

```text
12
```

---

# 84. `pipe()` Utility 🔥🔥🔥

Goal:

```text
functions execute
left to right
```

---

# 85. Build `pipe()` 🔥🔥🔥

```js
function pipe(
  ...functions
) {
  // Step 1: Return the combined function.
  return function (
    value
  ) {
    // Step 2: Normal reduce
    // processes left to right.
    return functions.reduce(
      (
        result,
        fn
      ) => {
        // Step 3: Pass the current result
        // into the next function.
        return fn(
          result
        );
      },
      value
    );
  };
}
```

---

# 86. Pipe Test

```js
function addOne(
  value
) {
  // Step 1: Add 1.
  return (
    value + 1
  );
}

function double(
  value
) {
  // Step 2: Double the value.
  return (
    value * 2
  );
}

// Step 3: Pipe goes left to right.
// addOne(5) -> 6
// double(6) -> 12
const calculate =
  pipe(
    addOne,
    double
  );

// Step 4: Print the result.
console.log(
  calculate(
    5
  )
); // Output: 12
```

Output:

```text
12
```

---

# 87. Utility Comparison 🔥🔥🔥

```text
flatten
→ remove all nested array levels

flattenDepth
→ remove limited nesting levels

groupBy
→ organize items into groups

chunk
→ split array into batches

unique
→ remove duplicates

deepClone
→ create independent nested copy

deepEqual
→ compare nested structures

deepGet
→ safely read nested value

deepSet
→ create/update nested value

debounce
→ wait until rapid calls stop

throttle
→ limit call frequency

curry
→ collect arguments in stages

memoize
→ cache repeated results

once
→ execute one time

retry
→ retry failed async operation

compose
→ right-to-left flow

pipe
→ left-to-right flow
```

---

# 88. Real Machine-Coding Example — Employee Data Pipeline 🔥🔥🔥

Suppose API returns duplicate employees.

We want:

```text
remove duplicates by id
↓
group by department
```

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
    department:
      "IT",
  },
  {
    id:
      2,
    name:
      "Priya",
    department:
      "HR",
  },
  {
    id:
      1,
    name:
      "Rahul Duplicate",
    department:
      "IT",
  },
];

// Step 1: Remove duplicate IDs.
const uniqueEmployees =
  uniqueBy(
    employees,
    (
      employee
    ) => {
      return employee.id;
    }
  );

// Step 2: Group remaining employees.
const grouped =
  groupBy(
    uniqueEmployees,
    (
      employee
    ) => {
      return employee.department;
    }
  );

// Step 3: Print IT count.
console.log(
  grouped.IT.length
); // Output: 1

// Step 4: Print HR count.
console.log(
  grouped.HR.length
); // Output: 1
```

Output:

```text
1
1
```

---

# 89. Real Machine-Coding Example — Batch API Data

```js
const employeeIds = [
  1,
  2,
  3,
  4,
  5,
];

// Step 1: Break IDs into batches of 2.
const batches =
  chunk(
    employeeIds,
    2
  );

// Step 2: Print batches.
console.log(
  batches
); // Output: [[1, 2], [3, 4], [5]]
```

Output:

```text
[[1, 2], [3, 4], [5]]
```

Useful for:

```text
controlled concurrency
bulk API requests
uploads
```

---

# 90. Real Machine-Coding Example — Safe Nested Access 🔥🔥🔥

```js
const response = {
  employee: {
    profile: {
      name:
        "Rahul",
    },
  },
};

// Step 1: Read an existing nested value.
const name =
  deepGet(
    response,
    "employee.profile.name",
    "Unknown"
  );

// Step 2: Read a missing value
// without throwing.
const city =
  deepGet(
    response,
    "employee.address.city",
    "Unknown"
  );

// Step 3: Print both values.
console.log(
  name
); // Output: Rahul

console.log(
  city
); // Output: Unknown
```

Output:

```text
Rahul
Unknown
```

---

# 91. Real Machine-Coding Example — Independent Clone 🔥🔥🔥

```js
const original = {
  employee: {
    name:
      "Rahul",
  },
};

// Step 1: Deep clone the original.
const copy =
  deepClone(
    original
  );

// Step 2: Change the nested clone.
copy.employee.name =
  "Priya";

// Step 3: Original remains independent.
console.log(
  original.employee.name
); // Output: Rahul

// Step 4: Clone contains the new value.
console.log(
  copy.employee.name
); // Output: Priya
```

Output:

```text
Rahul
Priya
```

---

# 92. Complexity Awareness 🔥🔥🔥

Approximate common complexities:

```text
flatten
→ O(n) over total nested elements

groupBy
→ O(n)

chunk
→ O(n)

unique with Set
→ O(n) average

unique with includes
→ O(n²) worst case

deepClone
→ O(n) over visited properties

deepEqual
→ O(n) over compared properties

deepGet
→ O(path length)

deepSet
→ O(path length)
```

Interviewers may ask:

```text
Can you improve this?
```

So complexity awareness matters.

---

# 93. Mutation Awareness 🔥🔥🔥

Utilities that primarily create new output structures:

```text
flatten
flattenDepth
groupBy
chunk
unique
deepClone
```

Our `deepSet()`:

```text
mutates the original object
```

That distinction should be documented.

---

# 94. Recursive Utilities in This Chapter

```text
flatten
deepClone
deepEqual
```

Why recursion?

Because their input can contain:

```text
the same kind of structure inside itself
```

Example:

```text
array inside array
object inside object
```

---

# 95. Closure-Based Utilities in This Chapter

```text
debounce
throttle
curry
memoize
once
```

They need to remember state such as:

```text
timer
allowed flag
previous arguments
cache
called flag
```

---

# 96. Interview Question — Flatten vs `flat()`

Good answer:

```text
Array.prototype.flat()
is the built-in solution.

Building flatten manually
tests recursion and nested-array handling.

A custom flatten can also support
special behavior or custom constraints.
```

---

# 97. Interview Question — Why WeakMap in Deep Clone? 🔥🔥🔥

Good answer:

```text
WeakMap lets me remember
which original object
has already been cloned.

That prevents infinite recursion
for circular references
and lets repeated references
reuse the same clone.
```

---

# 98. Interview Question — Deep Clone vs Shallow Clone

```text
Shallow clone
→ only top level is copied
→ nested references are shared

Deep clone
→ nested objects/arrays are copied too
→ clone can be modified independently
```

---

# 99. Interview Question — Deep Equal vs `===`

```text
=== on objects
→ compares references

deepEqual
→ compares nested structure and values
```

Example:

```js
// Step 1: Two different object references.
console.log(
  {}
  ===
  {}
); // Output: false
```

Output:

```text
false
```

---

# 100. Interview Question — DeepGet vs Optional Chaining

Optional chaining is great when the path is known in code:

```js
employee
  ?.address
  ?.city
```

`deepGet()` is useful when the path is dynamic:

```js
deepGet(
  employee,
  dynamicPath
);
```

Example dynamic path sources:

```text
configuration
form schema
table column definition
```

---

# 101. Interview Question — Why Chunk?

```text
Chunk divides a large array
into smaller fixed-size groups.

It is useful for pagination,
batch API calls,
controlled processing,
and limiting concurrency.
```

---

# 102. Interview Question — Why UniqueBy?

```text
Set removes duplicate primitive/reference values.

uniqueBy lets me define
what "duplicate" means,
for example employee.id.
```

---

# 103. Debugging Checklist 🔥🔥🔥

```text
FLATTEN
Did I recurse only for arrays?
Am I accidentally pushing nested arrays?

FLATTEN DEPTH
Did I decrease depth correctly?
What happens when depth = 0?

GROUP BY
Am I creating missing groups?
Is the group key correct?

CHUNK
Is size > 0?
Am I moving index by size?

UNIQUE
Are values primitives or objects?
Do I need uniqueBy?

DEEP CLONE
Am I handling null?
Arrays?
Circular references?
Special object types?

DEEP EQUAL
Did I compare key counts?
Nested values?
Array-vs-object type?

DEEP GET
What if an intermediate value is null?
Do I need a fallback?

DEEP SET
Am I okay with mutation?
Do I create missing intermediate objects?

DEBOUNCE / THROTTLE
Am I preserving this and args?

MEMOIZE
Is cache key safe?
Can cache grow forever?

RETRY
Is retry safe for this operation?
```

---

# 104. Final Utility Decision Guide 🔥🔥🔥

```text
Nested array?
→ flatten / flattenDepth

Categorize records?
→ groupBy

Process in batches?
→ chunk

Remove duplicates?
→ unique / uniqueBy

Independent nested copy?
→ deepClone

Compare nested structures?
→ deepEqual

Dynamic nested read?
→ deepGet

Dynamic nested write?
→ deepSet

Rapid search calls?
→ debounce

High-frequency scroll calls?
→ throttle

Arguments in stages?
→ curry

Expensive repeated calculation?
→ memoize

Initialize one time?
→ once

Temporary async failure?
→ retry

Right-to-left transforms?
→ compose

Left-to-right transforms?
→ pipe
```

---

# 105. Final Master Utility Example 🔥🔥🔥

```js
const employees = [
  {
    id:
      1,
    name:
      " Rahul ",
    department:
      "IT",
  },
  {
    id:
      2,
    name:
      "PRIYA",
    department:
      "HR",
  },
  {
    id:
      1,
    name:
      "Duplicate",
    department:
      "IT",
  },
];

// Step 1: Remove duplicate employee IDs.
const cleaned =
  uniqueBy(
    employees,
    (
      employee
    ) => {
      return employee.id;
    }
  );

// Step 2: Normalize employee names
// without mutating original objects.
const normalized =
  cleaned.map(
    (
      employee
    ) => {
      return {
        ...employee,

        name:
          employee.name
            .trim()
            .toLowerCase(),
      };
    }
  );

// Step 3: Group normalized employees
// by department.
const grouped =
  groupBy(
    normalized,
    (
      employee
    ) => {
      return employee.department;
    }
  );

// Step 4: Safely read the first IT employee name.
const firstITName =
  deepGet(
    grouped,
    "IT.0.name",
    "Unknown"
  );

// Step 5: Print the final result.
console.log(
  firstITName
); // Output: rahul
```

Output:

```text
rahul
```

Flow:

```text
raw employees
↓
uniqueBy(id)
↓
remove duplicate ID
↓
normalize names
↓
groupBy(department)
↓
deepGet("IT.0.name")
↓
rahul
```

---

# 106. Quick Memory 🧠🔥🔥🔥

## Flatten

```text
nested arrays
→ one flat array
```

## FlattenDepth

```text
flatten only N levels
```

## GroupBy

```text
item
→ key
→ group array
```

## Chunk

```text
big array
→ smaller batches
```

## Unique

```text
remove duplicates
```

## UniqueBy

```text
remove duplicates by custom key
```

## DeepClone

```text
independent nested copy
```

## DeepEqual

```text
compare nested content
```

## DeepGet

```text
safe dynamic nested read
```

## DeepSet

```text
dynamic nested write
```

## Debounce

```text
wait until calls stop
```

## Throttle

```text
limit call frequency
```

## Curry

```text
arguments in stages
```

## Memoize

```text
cache repeated result
```

## Once

```text
run once
```

## Retry

```text
try failed async work again
```

## Compose

```text
right → left
```

## Pipe

```text
left → right
```

---

# 107. Best Interview Answer 🔥🔥🔥

```text
Utility functions are small reusable helpers
that solve common data and control-flow problems.

For arrays,
I use helpers like flatten, chunk,
groupBy, and unique.

For nested objects,
I use deepClone, deepEqual,
deepGet, and deepSet.

For function behavior,
I use debounce, throttle,
curry, memoize, once, retry,
compose, and pipe.

When building these from scratch,
I focus on the exact input/output contract,
mutation behavior,
recursion,
closures,
edge cases,
and time complexity.

I also state the supported data types clearly,
because simple interview implementations
of deepClone or deepEqual
do not automatically cover every special JavaScript object.
```

---

# ✅ 9.4 Build Utilities Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ← NEXT
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
9.5 Data Transformation 🔥🔥🔥
```

**Next: 9.5 Data Transformation 🔥🔥🔥**
