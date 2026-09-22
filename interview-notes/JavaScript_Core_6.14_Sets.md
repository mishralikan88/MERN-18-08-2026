# 6.14 Sets 🔥🔥🔥

A JavaScript `Set` stores **unique values**.

Easy mental model:

```text
Array
→ duplicates allowed

Set
→ duplicate values automatically ignored
```

Example:

```js
// Step 1: Create a Set from an array.
const values =
  new Set(
    [1, 2, 2, 3, 3]
  );

// Step 2: Convert the Set back to an array
// so the result is easy to see.
console.log(
  [...values]
);
```

Output:

```text
[1, 2, 3]
```

This makes Sets very useful for:

```text
removing duplicates
selected IDs
permissions
unique tags
visited items
membership checks
machine coding
```

---

# 1. What Is a Set?

A Set is a built-in JavaScript collection.

It can store:

```text
numbers
strings
booleans
objects
arrays
functions
```

But each stored value must be unique.

```js
// Step 1: Create an empty Set.
const values =
  new Set();

// Step 2: Add 10.
values.add(10);

// Step 3: Add 20.
values.add(20);

// Step 4: Try adding 10 again.
values.add(10);

// Step 5: Print the final values.
console.log(
  [...values]
);
```

Output:

```text
[10, 20]
```

### Easy Explanation

The second `10` was ignored because `10` already existed.

---

# 2. Why Do We Need Sets?

Suppose an API gives repeated skills:

```js
const skills = [
  "React",
  "JavaScript",
  "React",
  "Node",
  "JavaScript",
];
```

We want only unique skills:

```js
// Step 1: Convert the array to a Set.
// Duplicate primitive values are removed.
const uniqueSet =
  new Set(
    skills
  );

// Step 2: Convert the Set back to an array.
const uniqueSkills =
  [...uniqueSet];

// Step 3: Print the result.
console.log(
  uniqueSkills
);
```

Output:

```text
["React", "JavaScript", "Node"]
```

Flow:

```text
Array with duplicates
↓ new Set()
unique Set
↓ spread
unique Array
```

---

# 3. Create an Empty Set

Syntax:

```js
new Set()
```

Example:

```js
// Step 1: Create an empty Set.
const ids =
  new Set();

// Step 2: Check how many values it contains.
console.log(
  ids.size
);
```

Output:

```text
0
```

---

# 4. Create Set From Array 🔥🔥🔥

```js
// Step 1: Start with an array.
const numbers = [
  1,
  2,
  2,
  3,
  3,
];

// Step 2: Pass the array into Set.
const numbersSet =
  new Set(
    numbers
  );

// Step 3: Convert Set to array for display.
console.log(
  [...numbersSet]
);
```

Output:

```text
[1, 2, 3]
```

---

# 5. `add()` 🔥🔥🔥

Use `add()` to insert a value.

```js
// Step 1: Create an empty Set.
const ids =
  new Set();

// Step 2: Add first ID.
ids.add(
  101
);

// Step 3: Add second ID.
ids.add(
  102
);

// Step 4: Print values.
console.log(
  [...ids]
);
```

Output:

```text
[101, 102]
```

---

# 6. Duplicate Values With `add()`

```js
// Step 1: Create empty Set.
const values =
  new Set();

// Step 2: Add 10.
values.add(10);

// Step 3: Add 10 again.
values.add(10);

// Step 4: Add 10 one more time.
values.add(10);

// Step 5: Print result.
console.log(
  [...values]
);
```

Output:

```text
[10]
```

### Easy Explanation

A Set stores one copy of the primitive value `10`.

---

# 7. Chaining `add()`

`add()` returns the Set itself.

```js
// Step 1: Create empty Set.
const values =
  new Set();

// Step 2: Chain multiple add() calls.
values
  .add(10)
  .add(20)
  .add(30);

// Step 3: Print values.
console.log(
  [...values]
);
```

Output:

```text
[10, 20, 30]
```

---

# 8. `size` 🔥🔥🔥

A Set uses:

```js
set.size
```

not:

```js
set.length
```

Example:

```js
// Step 1: Create Set.
const values =
  new Set(
    [10, 20, 30]
  );

// Step 2: Read number of unique values.
console.log(
  values.size
);
```

Output:

```text
3
```

---

# 9. Set Has No `length`

```js
// Step 1: Create Set.
const values =
  new Set(
    [10, 20, 30]
  );

// Step 2: Try array-style length.
console.log(
  values.length
);

// Step 3: Use correct Set property.
console.log(
  values.size
);
```

Output:

```text
undefined
3
```

Memory:

```text
Array → length
Set   → size
```

---

# 10. `has()` 🔥🔥🔥

Use `has()` to check whether a value exists.

```js
// Step 1: Create Set.
const roles =
  new Set(
    [
      "admin",
      "editor",
    ]
  );

// Step 2: Check existing value.
console.log(
  roles.has(
    "admin"
  )
);

// Step 3: Check missing value.
console.log(
  roles.has(
    "viewer"
  )
);
```

Output:

```text
true
false
```

---

# 11. Real App Use of `has()`

Suppose selected row IDs are stored in a Set:

```js
const selectedIds =
  new Set(
    [10, 20, 30]
  );

// Step 1: Ask whether row 20 is selected.
const selected =
  selectedIds.has(
    20
  );

// Step 2: Print result.
console.log(
  selected
);
```

Output:

```text
true
```

This is useful for:

```text
checkboxes
permissions
selected rows
visited IDs
blocked IDs
```

---

# 12. `delete()` 🔥🔥🔥

Use `delete()` to remove one value.

```js
// Step 1: Create Set.
const ids =
  new Set(
    [10, 20, 30]
  );

// Step 2: Delete 20.
ids.delete(
  20
);

// Step 3: Print remaining values.
console.log(
  [...ids]
);
```

Output:

```text
[10, 30]
```

---

# 13. `delete()` Returns Boolean

```js
const ids =
  new Set(
    [10, 20]
  );

// Step 1: Delete an existing value.
const firstResult =
  ids.delete(
    20
  );

// Step 2: Try deleting a missing value.
const secondResult =
  ids.delete(
    50
  );

// Step 3: Print both results.
console.log(
  firstResult
);

console.log(
  secondResult
);
```

Output:

```text
true
false
```

Meaning:

```text
true
→ value existed and was removed

false
→ value did not exist
```

---

# 14. `clear()` 🔥🔥

Use `clear()` to remove everything.

```js
// Step 1: Create Set.
const ids =
  new Set(
    [10, 20, 30]
  );

// Step 2: Remove all values.
ids.clear();

// Step 3: Check size.
console.log(
  ids.size
);
```

Output:

```text
0
```

---

# 15. Core Set API Summary

```text
add(value)
→ add value

has(value)
→ check existence

delete(value)
→ remove one value

clear()
→ remove all values

size
→ count unique values
```

---

# 16. Set Preserves Insertion Order

```js
// Step 1: Create empty Set.
const values =
  new Set();

// Step 2: Add B first.
values.add("B");

// Step 3: Add A second.
values.add("A");

// Step 4: Add C third.
values.add("C");

// Step 5: Print values.
console.log(
  [...values]
);
```

Output:

```text
["B", "A", "C"]
```

### Easy Explanation

Set does not automatically sort values.

It keeps insertion order.

---

# 17. Iterate Set With `for...of` 🔥🔥🔥

```js
const skills =
  new Set(
    [
      "React",
      "JavaScript",
      "Node",
    ]
  );

// Step 1: Visit every Set value.
for (
  const skill
  of skills
) {
  // Step 2: Print the current value.
  console.log(
    skill
  );
}
```

Output:

```text
React
JavaScript
Node
```

---

# 18. Iterate Set With `forEach()`

```js
const skills =
  new Set(
    [
      "React",
      "JavaScript",
    ]
  );

// Step 1: forEach() visits every Set value.
skills.forEach(
  (skill) => {
    // Step 2: Print current skill.
    console.log(
      skill
    );
  }
);
```

Output:

```text
React
JavaScript
```

---

# 19. Set → Array Using Spread 🔥🔥🔥

```js
// Step 1: Create Set.
const values =
  new Set(
    [1, 2, 3]
  );

// Step 2: Spread Set values into a new array.
const array =
  [...values];

// Step 3: Print array.
console.log(
  array
);
```

Output:

```text
[1, 2, 3]
```

Flow:

```text
Set
↓ [...]
Array
```

---

# 20. Set → Array Using `Array.from()`

```js
// Step 1: Create Set.
const values =
  new Set(
    [1, 2, 3]
  );

// Step 2: Convert Set to array.
const array =
  Array.from(
    values
  );

// Step 3: Print.
console.log(
  array
);
```

Output:

```text
[1, 2, 3]
```

---

# 21. Array → Set 🔥🔥🔥

```js
// Step 1: Start with array.
const array = [
  1,
  1,
  2,
  3,
];

// Step 2: Convert array to Set.
const set =
  new Set(
    array
  );

// Step 3: Print unique values.
console.log(
  [...set]
);
```

Output:

```text
[1, 2, 3]
```

---

# 22. Remove Duplicates From Array 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  2,
  3,
  3,
  4,
];

// Step 1: Convert array to Set.
// Duplicate values disappear.
const uniqueSet =
  new Set(
    numbers
  );

// Step 2: Convert Set back to array.
const uniqueNumbers =
  [...uniqueSet];

// Step 3: Print final array.
console.log(
  uniqueNumbers
);
```

Output:

```text
[1, 2, 3, 4]
```

---

# 23. One-Line Duplicate Removal 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  2,
  3,
  3,
];

// Step 1: new Set(numbers) removes duplicates.
// Step 2: Spread converts the Set back to array.
const unique =
  [...new Set(
    numbers
  )];

// Step 3: Print.
console.log(
  unique
);
```

Output:

```text
[1, 2, 3]
```

Interview pattern:

```js
[...new Set(array)]
```

---

# 24. Remove Duplicate Strings

```js
const skills = [
  "React",
  "Node",
  "React",
  "JavaScript",
  "Node",
];

// Step 1: Remove duplicate strings.
const unique =
  new Set(
    skills
  );

// Step 2: Convert Set to array.
const result =
  [...unique];

// Step 3: Print.
console.log(
  result
);
```

Output:

```text
["React", "Node", "JavaScript"]
```

---

# 25. Set Is Case-Sensitive

```js
// Step 1: Add differently-cased strings.
const values =
  new Set(
    [
      "React",
      "react",
      "REACT",
    ]
  );

// Step 2: Print values.
console.log(
  [...values]
);
```

Output:

```text
["React", "react", "REACT"]
```

### Why?

String equality is case-sensitive.

---

# 26. Case-Insensitive Duplicate Removal

```js
const skills = [
  "React",
  "react",
  "NODE",
  "node",
];

// Step 1: Normalize every string first.
const normalized =
  skills.map(
    (skill) =>
      skill.toLowerCase()
  );

// Step 2: Remove duplicates from normalized values.
const unique =
  [...new Set(
    normalized
  )];

// Step 3: Print result.
console.log(
  unique
);
```

Output:

```text
["react", "node"]
```

Flow:

```text
normalize
↓
Set
↓
unique values
```

---

# 27. Set With `NaN`

```js
// Step 1: Add NaN multiple times.
const values =
  new Set(
    [
      NaN,
      NaN,
      NaN,
    ]
  );

// Step 2: Check size.
console.log(
  values.size
);

// Step 3: Check whether NaN exists.
console.log(
  values.has(
    NaN
  )
);
```

Output:

```text
1
true
```

### Easy Explanation

For Set membership, repeated `NaN` behaves as the same value.

---

# 28. Set With `0` and `-0`

```js
// Step 1: Add 0 and -0.
const values =
  new Set(
    [
      0,
      -0,
    ]
  );

// Step 2: Check size.
console.log(
  values.size
);
```

Output:

```text
1
```

---

# 29. Set With Objects 🔥🔥🔥

```js
// Step 1: Create object A.
const a =
  {
    id: 1,
  };

// Step 2: Create a separate object B
// with the same property values.
const b =
  {
    id: 1,
  };

// Step 3: Put both objects in Set.
const values =
  new Set(
    [a, b]
  );

// Step 4: Check size.
console.log(
  values.size
);
```

Output:

```text
2
```

### Why?

Objects are compared by reference.

```text
a !== b
```

even though their contents look the same.

---

# 30. Same Object Reference in Set

```js
// Step 1: Create one object.
const employee =
  {
    id: 1,
  };

// Step 2: Add the exact same reference repeatedly.
const values =
  new Set(
    [
      employee,
      employee,
      employee,
    ]
  );

// Step 3: Check size.
console.log(
  values.size
);
```

Output:

```text
1
```

### Easy Explanation

Same reference means same Set value.

---

# 31. Set Does Not Deduplicate Objects by Property 🔥🔥🔥

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 1,
    name: "Rahul",
  },
];

// Step 1: Create Set from the object array.
const unique =
  new Set(
    employees
  );

// Step 2: Check size.
console.log(
  unique.size
);
```

Output:

```text
2
```

### Why?

The objects are different references.

If you want uniqueness by `id`, you need custom logic.

---

# 32. Remove Duplicate Objects by ID 🔥🔥🔥

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
    name: "Rahul",
  },
];

// Step 1: Create a Set to remember IDs
// that we have already seen.
const seenIds =
  new Set();

// Step 2: Filter the employee array.
const uniqueEmployees =
  employees.filter(
    (employee) => {
      // Step 3: Check whether this ID
      // already exists in seenIds.
      if (
        seenIds.has(
          employee.id
        )
      ) {
        // Step 4: Duplicate ID.
        // Return false so filter removes it.
        return false;
      }

      // Step 5: First time seeing this ID.
      // Store it in the Set.
      seenIds.add(
        employee.id
      );

      // Step 6: Keep this employee.
      return true;
    }
  );

// Step 7: Show final IDs.
console.log(
  uniqueEmployees.map(
    ({ id }) => id
  )
);
```

Output:

```text
[1, 2]
```

Flow:

```text
employee
↓
has(id)?
↓
yes → duplicate → remove
no  → add id → keep
```

---

# 33. Find Duplicate Values 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  3,
  2,
  4,
  1,
];

// Step 1: Set of values we have seen.
const seen =
  new Set();

// Step 2: Set of duplicates found.
const duplicates =
  new Set();

// Step 3: Visit every number.
for (
  const number
  of numbers
) {
  // Step 4: If number already exists,
  // it is a duplicate.
  if (
    seen.has(
      number
    )
  ) {
    duplicates.add(
      number
    );
  } else {
    // Step 5: First appearance.
    seen.add(
      number
    );
  }
}

// Step 6: Convert duplicate Set to array.
const result =
  [...duplicates];

// Step 7: Print.
console.log(
  result
);
```

Output:

```text
[2, 1]
```

---

# 34. Check Whether Array Has Duplicates 🔥🔥🔥

```js
function hasDuplicates(
  array
) {
  // Step 1: Count every array value.
  const totalCount =
    array.length;

  // Step 2: Convert array to Set.
  const uniqueValues =
    new Set(
      array
    );

  // Step 3: Count only unique values.
  const uniqueCount =
    uniqueValues.size;

  // Step 4: If counts differ,
  // some duplicate value existed.
  return (
    totalCount !==
    uniqueCount
  );
}

console.log(
  hasDuplicates(
    [1, 2, 2, 3]
  )
);

console.log(
  hasDuplicates(
    [1, 2, 3]
  )
);
```

Output:

```text
true
false
```

Flow:

```text
array.length
vs
new Set(array).size

different?
→ duplicates exist
```

---

# 35. Count Unique Values

```js
function countUnique(
  values
) {
  // Step 1: Remove duplicates with Set.
  const uniqueValues =
    new Set(
      values
    );

  // Step 2: Return the unique count.
  return (
    uniqueValues.size
  );
}

console.log(
  countUnique(
    [
      1,
      2,
      2,
      3,
      3,
      4,
    ]
  )
);
```

Output:

```text
4
```

---

# 36. Unique Characters in a String

Strings are iterable.

```js
// Step 1: Start with a string.
const word =
  "banana";

// Step 2: Pass the string to Set.
// Set receives characters one by one.
const characters =
  new Set(
    word
  );

// Step 3: Convert Set to array.
console.log(
  [...characters]
);
```

Output:

```text
["b", "a", "n"]
```

---

# 37. Set Membership vs Array `includes()`

Array approach:

```js
const ids = [
  10,
  20,
  30,
];

// Step 1: Check whether array contains 20.
console.log(
  ids.includes(
    20
  )
);
```

Output:

```text
true
```

Set approach:

```js
const ids =
  new Set(
    [10, 20, 30]
  );

// Step 1: Check Set membership.
console.log(
  ids.has(
    20
  )
);
```

Output:

```text
true
```

### Practical Point

Set is especially useful when you do many membership checks.

---

# 38. Machine Coding — Selected IDs 🔥🔥🔥

Suppose a table allows row selection.

```js
// Step 1: Store selected IDs in a Set.
const selectedIds =
  new Set();

// Step 2: Select row 101.
selectedIds.add(
  101
);

// Step 3: Select row 102.
selectedIds.add(
  102
);

// Step 4: Check whether row 101 is selected.
console.log(
  selectedIds.has(
    101
  )
);
```

Output:

```text
true
```

Why Set fits:

```text
IDs stay unique
easy membership check
easy add
easy delete
```

---

# 39. Machine Coding — Toggle Selection 🔥🔥🔥

Problem:

```text
If ID is selected
→ unselect it.

If ID is not selected
→ select it.
```

```js
function toggleSelection(
  selectedIds,
  id
) {
  // Step 1: Clone the Set.
  // This avoids mutating the original state.
  const next =
    new Set(
      selectedIds
    );

  // Step 2: Check whether ID already exists.
  const alreadySelected =
    next.has(
      id
    );

  // Step 3: If selected, remove it.
  if (
    alreadySelected
  ) {
    next.delete(
      id
    );
  } else {
    // Step 4: Otherwise add it.
    next.add(
      id
    );
  }

  // Step 5: Return the new Set.
  return next;
}

const selected =
  new Set(
    [1, 2]
  );

// Step 6: Toggle ID 2.
const result =
  toggleSelection(
    selected,
    2
  );

// Step 7: Print final selection.
console.log(
  [...result]
);
```

Output:

```text
[1]
```

Complete flow:

```text
clone Set
↓
has(id)?
↓
yes → delete
no  → add
↓
return new Set
```

---

# 40. Machine Coding — Select All IDs 🔥🔥

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
    id: 3,
    name: "John",
  },
];

// Step 1: Extract all IDs.
const ids =
  employees.map(
    ({ id }) =>
      id
  );

// Step 2: Create Set from IDs.
const selectedIds =
  new Set(
    ids
  );

// Step 3: Print selected IDs.
console.log(
  [...selectedIds]
);
```

Output:

```text
[1, 2, 3]
```

---

# 41. Machine Coding — Unique Filter Options 🔥🔥🔥

Suppose API returns repeated departments:

```js
const employees = [
  {
    id: 1,
    department: "IT",
  },
  {
    id: 2,
    department: "HR",
  },
  {
    id: 3,
    department: "IT",
  },
  {
    id: 4,
    department: "Finance",
  },
];
```

We want:

```text
["IT", "HR", "Finance"]
```

Solution:

```js
function getUniqueDepartments(
  employees
) {
  // Step 1: Extract only department values.
  const departments =
    employees.map(
      (employee) =>
        employee.department
    );

  // Step 2: Convert array to Set.
  // Repeated departments disappear.
  const uniqueSet =
    new Set(
      departments
    );

  // Step 3: Convert Set back to array
  // because UI dropdowns usually map arrays.
  const uniqueDepartments =
    [...uniqueSet];

  // Step 4: Return final options.
  return uniqueDepartments;
}

// Step 5: Run function.
const result =
  getUniqueDepartments(
    employees
  );

// Step 6: Print.
console.log(
  result
);
```

Output:

```text
["IT", "HR", "Finance"]
```

Complete flow:

```text
API employees
↓
map department
↓
["IT", "HR", "IT", "Finance"]
↓
Set
↓
unique departments
↓
Array
↓
filter dropdown
```

---

# 42. Intersection of Two Sets 🔥🔥

Intersection means values present in both collections.

```js
const a =
  new Set(
    [1, 2, 3]
  );

const b =
  new Set(
    [2, 3, 4]
  );

// Step 1: Convert Set A to array.
const aValues =
  [...a];

// Step 2: Keep only values
// that are also present in Set B.
const commonValues =
  aValues.filter(
    (value) =>
      b.has(
        value
      )
  );

// Step 3: Convert result to Set.
const intersection =
  new Set(
    commonValues
  );

// Step 4: Print.
console.log(
  [...intersection]
);
```

Output:

```text
[2, 3]
```

---

# 43. Union of Two Sets 🔥🔥

Union means all unique values from both.

```js
const a =
  new Set(
    [1, 2, 3]
  );

const b =
  new Set(
    [3, 4, 5]
  );

// Step 1: Spread both Sets into one array.
const combined = [
  ...a,
  ...b,
];

// Step 2: Convert combined values to Set.
// Duplicate 3 is removed.
const union =
  new Set(
    combined
  );

// Step 3: Print.
console.log(
  [...union]
);
```

Output:

```text
[1, 2, 3, 4, 5]
```

---

# 44. Difference Between Sets 🔥🔥

Difference means:

```text
values in A
that are not in B
```

```js
const a =
  new Set(
    [1, 2, 3]
  );

const b =
  new Set(
    [2, 3, 4]
  );

// Step 1: Convert A to array.
const aValues =
  [...a];

// Step 2: Keep values
// that B does not contain.
const difference =
  aValues.filter(
    (value) =>
      !b.has(
        value
      )
  );

// Step 3: Print.
console.log(
  difference
);
```

Output:

```text
[1]
```

---

# 45. Unique Nested API Values 🔥🔥🔥

Suppose employees have skill arrays:

```js
const employees = [
  {
    id: 1,
    skills: [
      "React",
      "Node",
    ],
  },
  {
    id: 2,
    skills: [
      "React",
      "JavaScript",
    ],
  },
];
```

We want every unique skill.

```js
// Step 1: Extract each skills array.
const skillArrays =
  employees.map(
    ({ skills }) =>
      skills
  );

// Step 2: Flatten nested arrays.
const allSkills =
  skillArrays.flat();

// Step 3: Remove duplicate skills.
const uniqueSet =
  new Set(
    allSkills
  );

// Step 4: Convert Set back to array.
const uniqueSkills =
  [...uniqueSet];

// Step 5: Print final skills.
console.log(
  uniqueSkills
);
```

Output:

```text
["React", "Node", "JavaScript"]
```

Flow:

```text
employees
↓
skills arrays
↓ flat()
all skills
↓ Set
unique skills
↓ Array
UI options
```

---

# 46. Interview Output — Duplicate Primitive

```js
// Step 1: Create Set with repeated values.
const values =
  new Set(
    [1, 1, 2, 2]
  );

// Step 2: Count unique values.
console.log(
  values.size
);
```

Output:

```text
2
```

---

# 47. Interview Output — Different Objects 🔥🔥🔥

```js
// Step 1: Create two separate objects.
const a =
  { id: 1 };

const b =
  { id: 1 };

// Step 2: Add both objects to Set.
const values =
  new Set(
    [a, b]
  );

// Step 3: Count them.
console.log(
  values.size
);
```

Output:

```text
2
```

### Why?

Different object references.

---

# 48. Interview Output — Same Object Reference

```js
// Step 1: Create one object.
const employee =
  { id: 1 };

// Step 2: Add same reference twice.
const values =
  new Set(
    [
      employee,
      employee,
    ]
  );

// Step 3: Count values.
console.log(
  values.size
);
```

Output:

```text
1
```

---

# 49. Interview Question — Set vs Array 🔥🔥🔥

Good answer:

```text
Array
→ duplicates allowed
→ numeric indexes
→ length
→ many transformation methods

Set
→ unique values
→ no numeric index access
→ size
→ add/has/delete
→ very useful for membership and deduplication
```

---

# 50. Debugging — `length` vs `size`

Wrong:

```js
const values =
  new Set(
    [1, 2, 3]
  );

// Step 1: Set does not use length.
console.log(
  values.length
);
```

Output:

```text
undefined
```

Correct:

```js
// Step 1: Use size.
console.log(
  values.size
);
```

Output:

```text
3
```

---

# 51. Debugging — Expecting Object Deduplication

```js
const employees = [
  { id: 1 },
  { id: 1 },
];

// Step 1: Set checks object references,
// not property equality.
const values =
  new Set(
    employees
  );

// Step 2: Both objects remain.
console.log(
  values.size
);
```

Output:

```text
2
```

### Fix

Use a stable property like:

```text
id
email
username
```

and track it in another Set.

---

# 52. Practical Decision Guide 🔥🔥🔥

```text
Need unique values?
→ Set

Need add?
→ add()

Need existence check?
→ has()

Need remove one?
→ delete()

Need remove all?
→ clear()

Need count?
→ size

Need Array → Set?
→ new Set(array)

Need Set → Array?
→ [...set]

Need primitive deduplication?
→ [...new Set(array)]

Need selected IDs?
→ Set

Need toggle selection?
→ has + add/delete

Need unique API filters?
→ map + Set

Need duplicate detection?
→ array.length !== new Set(array).size
```

---

# 53. Most Important Set Rules 🔥🔥🔥

```text
Set stores unique values.

Set preserves insertion order.

Set uses size, not length.

add()
→ insert

has()
→ check

delete()
→ remove one

clear()
→ remove all

new Set(array)
→ Array to Set

[...set]
→ Set to Array

[...new Set(array)]
→ primitive duplicate removal

Objects are compared by reference.

Equal-looking objects can both exist
if they are different references.
```

---

# Quick Memory 🧠

Create:

```js
// Step 1: Create empty Set.
const set =
  new Set();
```

Add:

```js
// Step 1: Add value.
set.add(
  10
);
```

Check:

```js
// Step 1: Check membership.
set.has(
  10
);
```

Delete:

```js
// Step 1: Remove one value.
set.delete(
  10
);
```

Clear:

```js
// Step 1: Remove everything.
set.clear();
```

Size:

```js
// Step 1: Count unique values.
set.size;
```

Array → Set:

```js
// Step 1: Convert array to Set.
const set =
  new Set(
    array
  );
```

Set → Array:

```js
// Step 1: Spread Set values into array.
const array =
  [...set];
```

Remove duplicates:

```js
// Step 1: Set removes duplicates.
// Step 2: Spread gives array again.
const unique =
  [...new Set(
    array
  )];
```

Selected IDs:

```js
const selectedIds =
  new Set();

// Step 1: Select ID.
selectedIds.add(
  101
);

// Step 2: Check ID.
selectedIds.has(
  101
);

// Step 3: Unselect ID.
selectedIds.delete(
  101
);
```

Most important interview traps:

```text
size vs length
object reference equality
Set is not indexed like Array
duplicate primitives disappear
same object reference is stored once
different equal-looking objects remain separate
```

## ✅ 6.14 Sets complete

**JavaScript Core topics remaining after this: 6**

```text
6.15 Maps
6.16 JSON
6.17 Modules
6.18 Regex
6.19 Error Handling
6.20 Core Practical
```

**Next: 6.15 Maps 🔥🔥🔥**
