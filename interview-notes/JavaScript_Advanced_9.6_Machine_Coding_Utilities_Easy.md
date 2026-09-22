# 9.6 Machine-Coding Utilities — Easy Version 🔥🔥🔥

This chapter is about small helper functions that are useful in machine-coding rounds.

Think of a machine-coding round like this:

```text
You build a small app
↓
Employee Table / Todo App / Product List / Dashboard
↓
You need search, filter, sort, pagination,
selection, update, delete, loading, retry, etc.
```

Instead of writing everything inside one big function, we create small reusable utilities.

Main topics:

```text
Search
Filter
Sort
Pagination
Selection
Select All
Update By ID
Delete By ID
Upsert
Index By ID
Remove Duplicates
Move Item
Chunk
Clean Form Data
Find Changed Fields
Loading Counter
Submit Guard
Latest Request Guard
Cache
Request Deduplication
Retry
Timeout
Batch Processing
Final Table Flow
```

---

# 1. What Is a Utility Function?

A utility function is a small function that does one job.

Example:

```js
function add(
  a,
  b
) {
  // Step 1: Add both numbers.
  // Why?
  // Because this function's only job
  // is to return the total.
  return (
    a + b
  );
}

// Step 2: Call the utility.
console.log(
  add(
    10,
    20
  )
); // Output: 30
```

Output:

```text
30
```

Easy meaning:

```text
small job
↓
small function
↓
easy to reuse
```

---

# 2. Why Do We Need Utilities in Machine Coding?

Suppose you build an Employee Table.

You may need:

```text
search employee
filter by department
sort by salary
show page 1, page 2
select rows
edit one row
delete one row
```

If all logic is inside one huge function:

```text
hard to read
hard to debug
hard to test
```

Small utilities make it easier.

---

# 3. First Rule Before Writing a Utility

Always ask:

```text
What is the input?

What should be the output?

Should original data change?

What happens for empty input?
```

Example:

```text
paginate(items, page, pageSize)

Input:
array + page + pageSize

Output:
only items for that page

Original array:
should not change
```

---

# 4. Search Utility 🔥🔥🔥

Requirement:

```text
Search employee by name.

Search should ignore:
capital/small letters
extra spaces
```

Example:

```text
query = "  rahul "

Employee name = "Rahul Sharma"

Result:
match
```

---

# 5. Build `searchByName()`

```js
function searchByName(
  employees,
  query
) {
  // Step 1: Remove extra spaces
  // and convert query to lowercase.
  // Why?
  // So " Rahul " and "rahul"
  // are treated the same.
  const cleanQuery =
    query
      .trim()
      .toLowerCase();

  // Step 2: If query is empty,
  // return all employees.
  // Why?
  // Empty search means:
  // user is not searching anything.
  if (
    cleanQuery
    ===
    ""
  ) {
    return employees;
  }

  // Step 3: Check every employee.
  return employees.filter(
    (
      employee
    ) => {
      // Step 4: Make employee name lowercase.
      // Why?
      // For case-insensitive comparison.
      const cleanName =
        employee.name
          .trim()
          .toLowerCase();

      // Step 5: Keep employee
      // if name contains search text.
      return cleanName.includes(
        cleanQuery
      );
    }
  );
}
```

---

# 6. Test `searchByName()`

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul Sharma",
  },
  {
    id:
      2,
    name:
      "Priya Singh",
  },
];

// Step 1: Search "rahul".
const result =
  searchByName(
    employees,
    "  rahul "
  );

// Step 2: Print matching names.
console.log(
  result.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Rahul Sharma"]
```

Output:

```text
["Rahul Sharma"]
```

Easy flow:

```text
"  rahul "
↓ trim
"rahul"
↓ lowercase
"rahul"
↓ compare with employee names
↓
Rahul Sharma matches
```

---

# 7. Search in Multiple Fields 🔥🔥🔥

Sometimes user can search by:

```text
name
email
department
```

Example:

```text
query = "hr"
```

Even if employee name does not contain `hr`,
department may contain:

```text
HR
```

So employee should still match.

---

# 8. Build `searchEmployees()`

```js
function searchEmployees(
  employees,
  query
) {
  // Step 1: Clean the search text.
  const cleanQuery =
    query
      .trim()
      .toLowerCase();

  // Step 2: Empty query means
  // return all employees.
  if (
    cleanQuery
    ===
    ""
  ) {
    return employees;
  }

  // Step 3: Check every employee.
  return employees.filter(
    (
      employee
    ) => {
      // Step 4: Put all searchable fields
      // into one array.
      const fields = [
        employee.name,
        employee.email,
        employee.department,
      ];

      // Step 5: some() checks:
      // does ANY field match?
      return fields.some(
        (
          field
        ) => {
          // Step 6: Convert missing field
          // to empty string.
          const text =
            String(
              field
              ??
              ""
            )
              .toLowerCase();

          // Step 7: Check if field
          // contains search text.
          return text.includes(
            cleanQuery
          );
        }
      );
    }
  );
}
```

---

# 9. Test Multi-Field Search

```js
const employees = [
  {
    name:
      "Rahul",
    email:
      "rahul@test.com",
    department:
      "IT",
  },
  {
    name:
      "Priya",
    email:
      "priya@test.com",
    department:
      "HR",
  },
];

// Step 1: Search by department.
const result =
  searchEmployees(
    employees,
    "hr"
  );

// Step 2: Print matched names.
console.log(
  result.map(
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
["Priya"]
```

---

# 10. Why `some()`?

`some()` means:

```text
at least one value must match
```

Here:

```text
name matches?
OR
email matches?
OR
department matches?
```

If one is true:

```text
employee is kept
```

---

# 11. Filter Utility 🔥🔥🔥

Requirement:

Filter employees by:

```text
department
active status
minimum salary
```

But all filters are optional.

Example:

```text
department = IT
active = true

minSalary not provided
```

Then salary should not affect the result.

---

# 12. Build `filterEmployees()`

```js
function filterEmployees(
  employees,
  filters
) {
  // Step 1: Check every employee.
  return employees.filter(
    (
      employee
    ) => {
      // Step 2: Department match.
      // If no department filter is given,
      // consider it matched.
      const matchesDepartment =
        !filters.department
        ||
        employee.department
        ===
        filters.department;

      // Step 3: Active match.
      // undefined means:
      // user did not select active filter.
      const matchesActive =
        filters.active
        ===
        undefined
        ||
        employee.active
        ===
        filters.active;

      // Step 4: Salary match.
      // If minSalary is missing,
      // do not filter by salary.
      const matchesSalary =
        filters.minSalary
        ===
        undefined
        ||
        employee.salary
        >=
        filters.minSalary;

      // Step 5: Employee must match
      // all enabled filters.
      return (
        matchesDepartment
        &&
        matchesActive
        &&
        matchesSalary
      );
    }
  );
}
```

---

# 13. Test Filter Utility

```js
const employees = [
  {
    name:
      "Rahul",
    department:
      "IT",
    active:
      true,
    salary:
      80000,
  },
  {
    name:
      "Priya",
    department:
      "HR",
    active:
      true,
    salary:
      90000,
  },
];

// Step 1: Filter active IT employees.
const result =
  filterEmployees(
    employees,
    {
      department:
        "IT",
      active:
        true,
    }
  );

// Step 2: Print matched names.
console.log(
  result.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Rahul"]
```

Output:

```text
["Rahul"]
```

---

# 14. Sort Utility 🔥🔥🔥

Requirement:

```text
sort by salary
ascending or descending
```

We want a reusable function:

```text
sortBy(items, key, direction)
```

---

# 15. Build `sortBy()`

```js
function sortBy(
  items,
  key,
  direction = "asc"
) {
  // Step 1: Decide direction.
  // asc  -> normal comparison
  // desc -> reverse comparison
  const multiplier =
    direction
    ===
    "desc"
      ? -1
      : 1;

  // Step 2: Use toSorted()
  // so original array is not changed.
  return items.toSorted(
    (
      first,
      second
    ) => {
      // Step 3: Read values
      // using the dynamic key.
      const a =
        first[
          key
        ];

      const b =
        second[
          key
        ];

      // Step 4: If values are equal,
      // keep same order.
      if (
        a
        ===
        b
      ) {
        return 0;
      }

      // Step 5: Compare both values.
      // multiplier changes asc/desc.
      return (
        a
        >
        b
          ? 1
          : -1
      )
      *
      multiplier;
    }
  );
}
```

---

# 16. Test Sort Utility

```js
const employees = [
  {
    name:
      "Rahul",
    salary:
      50000,
  },
  {
    name:
      "Priya",
    salary:
      80000,
  },
];

// Step 1: Sort salary high to low.
const result =
  sortBy(
    employees,
    "salary",
    "desc"
  );

// Step 2: Print names.
console.log(
  result.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Priya", "Rahul"]
```

Output:

```text
["Priya", "Rahul"]
```

---

# 17. `sort()` vs `toSorted()`

```text
sort()
→ changes original array

toSorted()
→ returns new array
```

For frontend state:

```text
toSorted()
```

is safer when available.

---

# 18. Pagination Utility 🔥🔥🔥

Suppose:

```text
items =
[1,2,3,4,5,6,7]

page = 2
pageSize = 3
```

Expected:

```text
[4,5,6]
```

---

# 19. Pagination Formula

Formula:

```text
start =
(page - 1) * pageSize
```

For:

```text
page = 2
pageSize = 3
```

Calculation:

```text
start
=
(2 - 1) * 3
=
3
```

Then:

```text
slice(3, 6)
→ [4,5,6]
```

---

# 20. Build `paginate()`

```js
function paginate(
  items,
  page,
  pageSize
) {
  // Step 1: Invalid page
  // should return empty array.
  if (
    page
    <
    1
    ||
    pageSize
    <
    1
  ) {
    return [];
  }

  // Step 2: Calculate where
  // this page starts.
  const start =
    (
      page - 1
    )
    *
    pageSize;

  // Step 3: Calculate where
  // this page ends.
  const end =
    start
    +
    pageSize;

  // Step 4: Return only
  // that part of the array.
  return items.slice(
    start,
    end
  );
}
```

---

# 21. Test Pagination

```js
const values = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
];

// Step 1: Get page 2.
const result =
  paginate(
    values,
    2,
    3
  );

// Step 2: Print page data.
console.log(
  result
); // Output: [4, 5, 6]
```

Output:

```text
[4, 5, 6]
```

---

# 22. Page Information Utility 🔥🔥🔥

UI also needs:

```text
total pages
has next page?
has previous page?
```

---

# 23. Build `getPageInfo()`

```js
function getPageInfo(
  totalItems,
  page,
  pageSize
) {
  // Step 1: Calculate total pages.
  // Math.ceil is needed
  // because partial page also counts.
  const totalPages =
    Math.ceil(
      totalItems
      /
      pageSize
    );

  // Step 2: Previous page exists
  // when current page is above 1.
  const hasPrevious =
    page
    >
    1;

  // Step 3: Next page exists
  // when current page
  // is less than total pages.
  const hasNext =
    page
    <
    totalPages;

  // Step 4: Return page information.
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasPrevious,
    hasNext,
  };
}
```

---

# 24. Test Page Info

```js
const info =
  getPageInfo(
    45,
    2,
    10
  );

// Step 1: Print total pages.
console.log(
  info.totalPages
); // Output: 5

// Step 2: Print previous-page flag.
console.log(
  info.hasPrevious
); // Output: true

// Step 3: Print next-page flag.
console.log(
  info.hasNext
); // Output: true
```

Output:

```text
5
true
true
```

---

# 25. Toggle Row Selection 🔥🔥🔥

Suppose selected IDs are:

```text
1, 2
```

If user clicks:

```text
2
```

then `2` should be removed.

If user clicks:

```text
3
```

then `3` should be added.

`Set` is perfect for this.

---

# 26. Build `toggleSelection()`

```js
function toggleSelection(
  selectedIds,
  id
) {
  // Step 1: Copy the Set.
  // Why?
  // So we do not change
  // the original state.
  const next =
    new Set(
      selectedIds
    );

  // Step 2: Check whether
  // id already exists.
  const exists =
    next.has(
      id
    );

  // Step 3: If selected,
  // remove it.
  if (
    exists
  ) {
    next.delete(
      id
    );
  } else {
    // Step 4: If not selected,
    // add it.
    next.add(
      id
    );
  }

  // Step 5: Return new Set.
  return next;
}
```

---

# 27. Test Toggle Selection

```js
const selected =
  new Set(
    [
      1,
      2,
    ]
  );

// Step 1: Toggle ID 2.
// Since 2 exists,
// it should be removed.
const result =
  toggleSelection(
    selected,
    2
  );

// Step 2: Convert Set to array
// only for printing.
console.log(
  [
    ...result,
  ]
); // Output: [1]
```

Output:

```text
[1]
```

---

# 28. Why Use `Set`?

Because Set gives:

```text
has(id)
add(id)
delete(id)
```

That makes selection logic easy.

---

# 29. Select All Visible Rows 🔥🔥🔥

Requirement:

```text
If all visible rows are selected
→ unselect them

If not all are selected
→ select all visible rows
```

---

# 30. Build `toggleSelectAll()`

```js
function toggleSelectAll(
  selectedIds,
  visibleItems
) {
  // Step 1: Copy current selection.
  const next =
    new Set(
      selectedIds
    );

  // Step 2: Check whether
  // every visible item is selected.
  const allSelected =
    visibleItems.every(
      (
        item
      ) => {
        return next.has(
          item.id
        );
      }
    );

  // Step 3: If all are selected,
  // remove every visible ID.
  if (
    allSelected
  ) {
    for (
      const item
      of
      visibleItems
    ) {
      next.delete(
        item.id
      );
    }

    return next;
  }

  // Step 4: Otherwise,
  // add every visible ID.
  for (
    const item
    of
    visibleItems
  ) {
    next.add(
      item.id
    );
  }

  // Step 5: Return new Set.
  return next;
}
```

---

# 31. Test Select All

```js
const selected =
  new Set(
    [
      1,
    ]
  );

const visible = [
  {
    id:
      1,
  },
  {
    id:
      2,
  },
];

// Step 1: Not all visible rows
// are selected,
// so select both.
const result =
  toggleSelectAll(
    selected,
    visible
  );

// Step 2: Print selection.
console.log(
  [
    ...result,
  ]
); // Output: [1, 2]
```

Output:

```text
[1, 2]
```

---

# 32. Update One Item By ID 🔥🔥🔥

Requirement:

```text
update employee 1
without changing original array
```

---

# 33. Build `updateById()`

```js
function updateById(
  items,
  id,
  updates
) {
  // Step 1: Visit every item.
  return items.map(
    (
      item
    ) => {
      // Step 2: If ID does not match,
      // return old item as it is.
      if (
        item.id
        !==
        id
      ) {
        return item;
      }

      // Step 3: If ID matches,
      // create a new updated object.
      return {
        ...item,
        ...updates,
      };
    }
  );
}
```

---

# 34. Test Update By ID

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
    active:
      false,
  },
  {
    id:
      2,
    name:
      "Priya",
    active:
      true,
  },
];

// Step 1: Update Rahul.
const result =
  updateById(
    employees,
    1,
    {
      active:
        true,
    }
  );

// Step 2: New array has true.
console.log(
  result[
    0
  ].active
); // Output: true

// Step 3: Original array
// still has false.
console.log(
  employees[
    0
  ].active
); // Output: false
```

Output:

```text
true
false
```

---

# 35. Delete One Item By ID 🔥🔥🔥

Use `filter()`.

---

# 36. Build `removeById()`

```js
function removeById(
  items,
  id
) {
  // Step 1: Keep all items
  // whose id is NOT the one
  // we want to remove.
  return items.filter(
    (
      item
    ) => {
      return (
        item.id
        !==
        id
      );
    }
  );
}
```

---

# 37. Test Delete

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
];

// Step 1: Remove ID 1.
const result =
  removeById(
    employees,
    1
  );

// Step 2: Print remaining names.
console.log(
  result.map(
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
["Priya"]
```

---

# 38. Upsert 🔥🔥🔥

Upsert means:

```text
exists
→ update

does not exist
→ insert
```

---

# 39. Build `upsertById()`

```js
function upsertById(
  items,
  newItem
) {
  // Step 1: Check whether
  // same ID already exists.
  const exists =
    items.some(
      (
        item
      ) => {
        return (
          item.id
          ===
          newItem.id
        );
      }
    );

  // Step 2: If item exists,
  // update it.
  if (
    exists
  ) {
    return items.map(
      (
        item
      ) => {
        // Step 3: Keep non-matching items.
        if (
          item.id
          !==
          newItem.id
        ) {
          return item;
        }

        // Step 4: Update matching item.
        return {
          ...item,
          ...newItem,
        };
      }
    );
  }

  // Step 5: If item does not exist,
  // add it at the end.
  return [
    ...items,
    newItem,
  ];
}
```

---

# 40. Test Upsert

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
  },
];

// Step 1: Add new employee ID 2.
const result =
  upsertById(
    employees,
    {
      id:
        2,
      name:
        "Priya",
    }
  );

// Step 2: Total items become 2.
console.log(
  result.length
); // Output: 2
```

Output:

```text
2
```

---

# 41. Index By ID 🔥🔥🔥

Suppose you repeatedly need employee ID 500.

Using `find()` every time scans the array.

Better:

```text
build object once
↓
id → employee
```

---

# 42. Build `indexById()`

```js
function indexById(
  items
) {
  // Step 1: Create empty lookup object.
  const result =
    {};

  // Step 2: Visit each item.
  for (
    const item
    of
    items
  ) {
    // Step 3: Use item.id
    // as object key.
    result[
      item.id
    ] =
      item;
  }

  // Step 4: Return lookup.
  return result;
}
```

---

# 43. Test Index By ID

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
];

// Step 1: Create ID lookup.
const byId =
  indexById(
    employees
  );

// Step 2: Directly read ID 2.
console.log(
  byId[
    2
  ].name
); // Output: Priya
```

Output:

```text
Priya
```

---

# 44. Remove Duplicate Items 🔥🔥🔥

Requirement:

```text
same employee ID appears twice
↓
keep only first one
```

---

# 45. Build `uniqueBy()`

```js
function uniqueBy(
  items,
  getKey
) {
  // Step 1: Store keys
  // we have already seen.
  const seen =
    new Set();

  // Step 2: Store final result.
  const result =
    [];

  // Step 3: Visit every item.
  for (
    const item
    of
    items
  ) {
    // Step 4: Calculate key.
    const key =
      getKey(
        item
      );

    // Step 5: If key already exists,
    // skip this duplicate.
    if (
      seen.has(
        key
      )
    ) {
      continue;
    }

    // Step 6: Remember key.
    seen.add(
      key
    );

    // Step 7: Keep first item.
    result.push(
      item
    );
  }

  // Step 8: Return unique items.
  return result;
}
```

---

# 46. Test Unique By

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
      1,
    name:
      "Duplicate Rahul",
  },
];

// Step 1: Remove duplicate IDs.
const result =
  uniqueBy(
    employees,
    (
      employee
    ) => {
      return employee.id;
    }
  );

// Step 2: First item is kept.
console.log(
  result[
    0
  ].name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 47. Move Item 🔥🔥🔥

Useful for:

```text
drag and drop
reorder cards
move table row
```

Example:

```text
["A","B","C","D"]

move B
from index 1
to index 3

Result:
["A","C","D","B"]
```

---

# 48. Build `moveItem()`

```js
function moveItem(
  items,
  fromIndex,
  toIndex
) {
  // Step 1: Copy array.
  // Why?
  // So original array is not changed.
  const result = [
    ...items,
  ];

  // Step 2: Remove one item
  // from old position.
  const [
    movedItem,
  ] =
    result.splice(
      fromIndex,
      1
    );

  // Step 3: Insert that item
  // into new position.
  result.splice(
    toIndex,
    0,
    movedItem
  );

  // Step 4: Return reordered array.
  return result;
}
```

---

# 49. Test Move Item

```js
const values = [
  "A",
  "B",
  "C",
  "D",
];

// Step 1: Move B
// from index 1 to index 3.
const result =
  moveItem(
    values,
    1,
    3
  );

// Step 2: Print new order.
console.log(
  result
); // Output: ["A", "C", "D", "B"]

// Step 3: Original stays same.
console.log(
  values
); // Output: ["A", "B", "C", "D"]
```

Output:

```text
["A", "C", "D", "B"]
["A", "B", "C", "D"]
```

---

# 50. Chunk Utility 🔥🔥🔥

Chunk means:

```text
split one big array
into smaller arrays
```

Example:

```text
[1,2,3,4,5]

size = 2

Result:
[[1,2],[3,4],[5]]
```

---

# 51. Build `chunk()`

```js
function chunk(
  items,
  size
) {
  // Step 1: Invalid size
  // cannot make proper chunks.
  if (
    size
    <=
    0
  ) {
    return [];
  }

  // Step 2: Create final result.
  const result =
    [];

  // Step 3: Move through array
  // by chunk size.
  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    // Step 4: Take one piece
    // from current index.
    const currentChunk =
      items.slice(
        index,
        index + size
      );

    // Step 5: Save chunk.
    result.push(
      currentChunk
    );
  }

  // Step 6: Return all chunks.
  return result;
}
```

---

# 52. Test Chunk

```js
const values = [
  1,
  2,
  3,
  4,
  5,
];

// Step 1: Create chunks of 2.
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

# 53. Clean Form Data 🔥🔥🔥

Suppose form has:

```js
{
  name:
    "",
  age:
    0,
  active:
    false,
  city:
    "Mumbai",
  note:
    null,
}
```

We want to remove:

```text
""
null
undefined
```

But keep:

```text
0
false
```

because they may be valid values.

---

# 54. Build `cleanObject()`

```js
function cleanObject(
  object
) {
  // Step 1: Convert object
  // into [key, value] pairs.
  const entries =
    Object.entries(
      object
    );

  // Step 2: Remove unwanted values.
  const cleanedEntries =
    entries.filter(
      (
        [
          ,
          value,
        ]
      ) => {
        // Step 3: Keep 0 and false.
        // Remove only:
        // "", null, undefined.
        return (
          value
          !==
          ""
          &&
          value
          !==
          null
          &&
          value
          !==
          undefined
        );
      }
    );

  // Step 4: Convert entries
  // back to object.
  return Object.fromEntries(
    cleanedEntries
  );
}
```

---

# 55. Test Clean Object

```js
const form = {
  name:
    "",
  age:
    0,
  active:
    false,
  city:
    "Mumbai",
  note:
    null,
};

// Step 1: Clean form data.
const result =
  cleanObject(
    form
  );

// Step 2: Print final object.
console.log(
  result
);
// Output:
// {
//   age: 0,
//   active: false,
//   city: "Mumbai"
// }
```

Output:

```text
{
  age: 0,
  active: false,
  city: "Mumbai"
}
```

---

# 56. Why Not `filter(Boolean)`?

Because:

```text
Boolean(0)
→ false

Boolean(false)
→ false
```

So `filter(Boolean)` would wrongly remove valid values.

---

# 57. Find Changed Fields 🔥🔥🔥

Suppose form originally has:

```text
city = Mumbai
active = false
```

User changes:

```text
city = Pune
active = true
```

We want only changed fields:

```js
{
  city:
    "Pune",
  active:
    true,
}
```

Useful for:

```text
PATCH API
dirty form check
audit
```

---

# 58. Build `diffObject()`

```js
function diffObject(
  original,
  updated
) {
  // Step 1: Create empty diff object.
  const diff =
    {};

  // Step 2: Check every field
  // in the updated object.
  for (
    const key
    of
    Object.keys(
      updated
    )
  ) {
    // Step 3: Compare old value
    // and new value.
    if (
      !Object.is(
        original[
          key
        ],
        updated[
          key
        ]
      )
    ) {
      // Step 4: Store only changed field.
      diff[
        key
      ] =
        updated[
          key
        ];
    }
  }

  // Step 5: Return changed fields.
  return diff;
}
```

---

# 59. Test Diff Object

```js
const original = {
  name:
    "Rahul",
  city:
    "Mumbai",
  active:
    false,
};

const updated = {
  name:
    "Rahul",
  city:
    "Pune",
  active:
    true,
};

// Step 1: Find changes.
const result =
  diffObject(
    original,
    updated
  );

// Step 2: Print changed fields.
console.log(
  result
); // Output: { city: "Pune", active: true }
```

Output:

```text
{
  city: "Pune",
  active: true
}
```

Important:

```text
This simple version
compares top-level fields only.
```

---

# 60. Loading Counter 🔥🔥🔥

Problem with simple boolean:

```text
request A starts
loading = true

request B starts
loading = true

request A finishes
loading = false

But request B is still running.
```

So boolean can become wrong.

Better:

```text
count active requests
```

---

# 61. Build Loading Counter

```js
function createLoadingCounter() {
  // Step 1: Keep active request count.
  let activeRequests =
    0;

  return {
    start() {
      // Step 2: New request starts,
      // so increase count.
      activeRequests++;

      return activeRequests;
    },

    end() {
      // Step 3: Request finishes,
      // so reduce count.
      activeRequests =
        Math.max(
          0,
          activeRequests - 1
        );

      return activeRequests;
    },

    isLoading() {
      // Step 4: If count is above 0,
      // some request is still running.
      return (
        activeRequests
        >
        0
      );
    },

    count() {
      // Step 5: Return current count.
      return activeRequests;
    },
  };
}
```

---

# 62. Test Loading Counter

```js
const loading =
  createLoadingCounter();

// Step 1: Request A starts.
loading.start();

// Step 2: Request B starts.
loading.start();

// Step 3: Request A finishes.
loading.end();

// Step 4: Request B is still running.
console.log(
  loading.isLoading()
); // Output: true

// Step 5: One request remains.
console.log(
  loading.count()
); // Output: 1
```

Output:

```text
true
1
```

---

# 63. Submit Guard 🔥🔥🔥

Problem:

```text
user double-clicks Submit
↓
two API requests
```

We want:

```text
only first submit runs
second one is skipped
```

---

# 64. Build Submit Guard

```js
function createSubmitGuard() {
  // Step 1: Remember
  // whether submission is running.
  let submitting =
    false;

  return async function (
    operation
  ) {
    // Step 2: If already submitting,
    // skip this new request.
    if (
      submitting
    ) {
      return {
        skipped:
          true,
      };
    }

    // Step 3: Lock submit.
    submitting =
      true;

    try {
      // Step 4: Run the real operation.
      const value =
        await operation();

      // Step 5: Return successful result.
      return {
        skipped:
          false,
        value,
      };
    } finally {
      // Step 6: Always unlock submit.
      // Why?
      // Even if API fails,
      // user should be able to try again.
      submitting =
        false;
    }
  };
}
```

---

# 65. Why `finally` Is Important Here?

Because:

```text
API succeeds
→ unlock

API fails
→ also unlock
```

Without `finally`,
the form could stay locked forever after an error.

---

# 66. Latest Request Guard 🔥🔥🔥

Problem:

```text
user types "ra"
request 1 starts

user types "rahul"
request 2 starts

request 2 finishes first
request 1 finishes later

old "ra" result
can overwrite new "rahul" result
```

We need:

```text
only latest request can update UI
```

---

# 67. Build Latest Request Guard

```js
function createLatestRequestGuard() {
  // Step 1: Keep latest request number.
  let latestId =
    0;

  return {
    next() {
      // Step 2: Every new request
      // gets a bigger number.
      latestId++;

      return latestId;
    },

    isLatest(
      requestId
    ) {
      // Step 3: Only current latest ID
      // is allowed.
      return (
        requestId
        ===
        latestId
      );
    },
  };
}
```

---

# 68. Test Latest Request Guard

```js
const guard =
  createLatestRequestGuard();

// Step 1: First request starts.
const first =
  guard.next();

// Step 2: Second request starts.
const second =
  guard.next();

// Step 3: First request is now old.
console.log(
  guard.isLatest(
    first
  )
); // Output: false

// Step 4: Second request is latest.
console.log(
  guard.isLatest(
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

# 69. Simple Cache 🔥🔥🔥

Cache means:

```text
save result
↓
reuse later
```

Example:

```text
employee 10 already loaded
↓
read from cache
instead of fetching again
```

---

# 70. Build Simple Cache

```js
function createCache() {
  // Step 1: Create private Map.
  const cache =
    new Map();

  return {
    get(
      key
    ) {
      // Step 2: Return saved value.
      return cache.get(
        key
      );
    },

    set(
      key,
      value
    ) {
      // Step 3: Save value.
      cache.set(
        key,
        value
      );
    },

    has(
      key
    ) {
      // Step 4: Check whether key exists.
      return cache.has(
        key
      );
    },
  };
}
```

---

# 71. Test Cache

```js
const cache =
  createCache();

// Step 1: Save employee.
cache.set(
  1,
  {
    name:
      "Rahul",
  }
);

// Step 2: Read cached value.
console.log(
  cache.get(
    1
  ).name
); // Output: Rahul

// Step 3: Check cache.
console.log(
  cache.has(
    1
  )
); // Output: true
```

Output:

```text
Rahul
true
```

---

# 72. Request Deduplication 🔥🔥🔥

Problem:

```text
same request starts two times
before first one finishes
```

Example:

```text
getEmployee(10)
getEmployee(10)
```

Instead of 2 network calls:

```text
reuse same running Promise
```

---

# 73. Build Request Deduper

```js
function createRequestDeduper() {
  // Step 1: Store running Promises.
  const inFlight =
    new Map();

  return async function (
    key,
    operation
  ) {
    // Step 2: If same request
    // is already running,
    // return the same Promise.
    if (
      inFlight.has(
        key
      )
    ) {
      return inFlight.get(
        key
      );
    }

    // Step 3: Start a new operation.
    const promise =
      Promise.resolve()
        .then(
          () => {
            return operation();
          }
        );

    // Step 4: Save running Promise.
    inFlight.set(
      key,
      promise
    );

    try {
      // Step 5: Wait for result.
      return await promise;
    } finally {
      // Step 6: Remove request
      // after it finishes.
      inFlight.delete(
        key
      );
    }
  };
}
```

---

# 74. Request Dedup Mental Model

```text
request 10 starts
↓
save Promise in Map

request 10 starts again
↓
Map already has it
↓
reuse same Promise

request finishes
↓
remove from Map
```

---

# 75. Retry Utility 🔥🔥🔥

Retry means:

```text
operation fails
↓
try again
```

Important:

```text
retries = 2
```

usually means:

```text
1 first attempt
+
2 extra attempts
=
3 total attempts
```

---

# 76. Build Simple Retry

```js
async function retry(
  operation,
  retries = 2
) {
  // Step 1: Save last error.
  let lastError;

  // Step 2: Run first attempt
  // plus extra retries.
  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      // Step 3: If operation succeeds,
      // return immediately.
      return await operation();
    } catch (
      error
    ) {
      // Step 4: Save latest error.
      lastError =
        error;
    }
  }

  // Step 5: All attempts failed.
  throw lastError;
}
```

---

# 77. Retry Safety

Do not blindly retry:

```text
payment creation
order creation
non-idempotent POST
validation error
401
403
```

Better retry candidates:

```text
temporary network problem
timeout
502
503
504
```

---

# 78. Timeout Utility 🔥🔥🔥

Requirement:

```text
if operation takes too long
→ fail with timeout
```

---

# 79. Build `withTimeout()`

```js
function withTimeout(
  promise,
  ms
) {
  // Step 1: Create a Promise
  // that rejects after ms.
  const timeoutPromise =
    new Promise(
      (
        ,
        reject
      ) => {
        setTimeout(
          () => {
            reject(
              new Error(
                "Operation timed out"
              )
            );
          },
          ms
        );
      }
    );

  // Step 2: Race the real Promise
  // against the timeout Promise.
  // Whichever finishes first wins.
  return Promise.race(
    [
      promise,
      timeoutPromise,
    ]
  );
}
```

---

# 80. Important Timeout Rule

`Promise.race()` does:

```text
choose the first result
```

But it does **not** automatically cancel the other operation.

So:

```text
timeout wins
↓
original task may still continue
```

For `fetch()`,
use `AbortController`
when you need actual cancellation.

---

# 81. Batch Processing 🔥🔥🔥

Suppose IDs are:

```text
[1,2,3,4,5]
```

Batch size:

```text
2
```

We get:

```text
[1,2]
[3,4]
[5]
```

Inside each batch,
we can run tasks together.

---

# 82. Build `runInBatches()`

```js
async function runInBatches(
  items,
  batchSize,
  worker
) {
  // Step 1: Split items into batches.
  const batches =
    chunk(
      items,
      batchSize
    );

  // Step 2: Store all results.
  const results =
    [];

  // Step 3: Process one batch at a time.
  for (
    const batch
    of
    batches
  ) {
    // Step 4: Run all items
    // inside this batch together.
    const batchResults =
      await Promise.all(
        batch.map(
          (
            item
          ) => {
            return worker(
              item
            );
          }
        )
      );

    // Step 5: Add this batch's results
    // into final result.
    results.push(
      ...batchResults
    );
  }

  // Step 6: Return all results.
  return results;
}
```

---

# 83. Batch Processing Flow

```text
batch 1
[1,2]
→ run together
→ wait

batch 2
[3,4]
→ run together
→ wait

batch 3
[5]
→ run
```

---

# 84. Batch vs Concurrency Limit

Batching:

```text
fixed groups
```

Concurrency limit:

```text
always keep maximum N tasks running
```

They are not exactly the same.

For most basic machine-coding rounds,
batching is easier.

---

# 85. Full Employee Table Flow 🔥🔥🔥

A common machine-coding question:

```text
Build employee table with:

search
filter
sort
pagination
```

Correct client-side flow:

```text
search
↓
filter
↓
sort
↓
paginate
```

Pagination should normally come last.

---

# 86. Why Pagination Comes Last?

Wrong:

```text
paginate first
↓
search only current page
```

Correct:

```text
search full data
↓
filter full data
↓
sort result
↓
show required page
```

---

# 87. Build `buildEmployeeView()`

```js
function buildEmployeeView(
  employees,
  {
    search = "",
    filters = {},
    sortKey = "name",
    sortDirection = "asc",
    page = 1,
    pageSize = 10,
  }
) {
  // Step 1: Apply search.
  const searched =
    searchEmployees(
      employees,
      search
    );

  // Step 2: Apply filters.
  const filtered =
    filterEmployees(
      searched,
      filters
    );

  // Step 3: Sort result.
  const sorted =
    sortBy(
      filtered,
      sortKey,
      sortDirection
    );

  // Step 4: Get only current page rows.
  const rows =
    paginate(
      sorted,
      page,
      pageSize
    );

  // Step 5: Build page information.
  const pageInfo =
    getPageInfo(
      filtered.length,
      page,
      pageSize
    );

  // Step 6: Return everything
  // the UI needs.
  return {
    rows,
    pageInfo,
  };
}
```

---

# 88. Test Full Table Flow

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
    email:
      "rahul@test.com",
    department:
      "IT",
    active:
      true,
    salary:
      50000,
  },
  {
    id:
      2,
    name:
      "Priya",
    email:
      "priya@test.com",
    department:
      "HR",
    active:
      true,
    salary:
      80000,
  },
];

// Step 1: Search "a",
// keep active employees,
// sort salary high to low,
// show one row per page.
const view =
  buildEmployeeView(
    employees,
    {
      search:
        "a",

      filters: {
        active:
          true,
      },

      sortKey:
        "salary",

      sortDirection:
        "desc",

      page:
        1,

      pageSize:
        1,
    }
  );

// Step 2: Priya has higher salary.
console.log(
  view.rows[
    0
  ].name
); // Output: Priya

// Step 3: Two employees match,
// one row per page.
console.log(
  view.pageInfo.totalPages
); // Output: 2
```

Output:

```text
Priya
2
```

---

# 89. Common Mistake — Mutating Original Data

Wrong in state logic:

```js
items.sort();
```

or:

```js
items.splice();
```

Better:

```text
copy first
or
use immutable methods
```

Example:

```js
const copy = [
  ...items,
];
```

---

# 90. Common Mistake — Using `filter(Boolean)`

If data has:

```text
0
false
""
null
```

`filter(Boolean)` removes:

```text
0
false
```

too.

But they may be valid values.

Use explicit checks when business rules matter.

---

# 91. Common Mistake — Boolean Loading

Problem:

```text
two requests overlap
↓
first request finishes
↓
loading false
↓
second request still running
```

Use:

```text
loading counter
```

when requests can overlap.

---

# 92. Common Mistake — Retry Count

Remember:

```text
retries = 2
```

means:

```text
3 total attempts
```

if we count the first attempt.

---

# 93. Common Mistake — Request Deduper Not Cleaning Up

If completed Promise stays in Map:

```text
future request may reuse old result
```

So remove it in:

```text
finally
```

---

# 94. Interview Question — Why Small Utilities?

Easy answer:

```text
Small utilities make code easier
to read, test, reuse, and debug.

They also keep UI code cleaner.
```

---

# 95. Interview Question — Why Use Set for Selection?

Easy answer:

```text
Set gives:

has()
add()
delete()

So row selection becomes simple.
```

---

# 96. Interview Question — Why Clone Set?

Easy answer:

```text
To avoid changing old state directly.

We create a new Set,
change the new one,
and return it.
```

---

# 97. Interview Question — What Is Upsert?

Easy answer:

```text
If record exists
→ update it

If record does not exist
→ add it
```

---

# 98. Interview Question — Why Paginate Last?

Easy answer:

```text
Because search, filter, and sort
should normally work on the full client-side data.

After that,
we take only the current page.
```

---

# 99. Interview Question — Why Loading Counter?

Easy answer:

```text
Because multiple requests can run together.

A counter tells us
how many requests are still active.
```

---

# 100. Interview Question — Latest Request Guard?

Easy answer:

```text
It prevents an older API response
from replacing newer UI data.

Only the latest request
is allowed to update state.
```

---

# 101. Interview Question — Request Deduplication?

Easy answer:

```text
If the same request is already running,
reuse the same Promise
instead of starting another network request.
```

---

# 102. Interview Question — `finally` Use?

Easy answer:

```text
finally runs
whether async work succeeds or fails.

It is useful for cleanup.
```

Examples:

```text
unlock submit
remove request from Map
reduce loading count
```

---

# 103. Quick Decision Guide 🔥🔥🔥

```text
Need search?
→ searchEmployees

Need filters?
→ filterEmployees

Need sort?
→ sortBy

Need pagination?
→ paginate

Need page count?
→ getPageInfo

Need row select?
→ toggleSelection

Need select all?
→ toggleSelectAll

Need edit?
→ updateById

Need delete?
→ removeById

Need insert or update?
→ upsertById

Need fast ID lookup?
→ indexById

Need remove duplicates?
→ uniqueBy

Need reorder?
→ moveItem

Need batches?
→ chunk

Need clean form?
→ cleanObject

Need changed fields?
→ diffObject

Need multiple loading requests?
→ loading counter

Need stop double submit?
→ submit guard

Need latest response only?
→ latest request guard

Need reuse saved data?
→ cache

Need avoid duplicate API call?
→ request deduper

Need retry?
→ retry

Need timeout?
→ withTimeout

Need async batch processing?
→ runInBatches
```

---

# 104. Quick Memory 🧠🔥🔥🔥

```text
Search
→ includes()

Filter
→ filter()

Sort
→ toSorted()

Pagination
→ slice()

Selection
→ Set

Update
→ map()

Delete
→ filter()

Upsert
→ update or append

Index By ID
→ object lookup

Unique
→ Set

Reorder
→ clone + splice

Chunk
→ slice in loop

Clean Object
→ entries + filter + fromEntries

Diff
→ compare old vs new

Loading
→ counter

Submit Guard
→ lock + finally unlock

Latest Request
→ request number

Cache
→ Map

Request Dedup
→ Map of Promises

Retry
→ try again

Timeout
→ Promise.race

Batch
→ chunk + Promise.all
```

---

# 105. Best Interview Answer 🔥🔥🔥

```text
In machine-coding rounds,
I keep logic in small reusable utilities.

For table features,
I use separate functions for search,
filter, sort, and pagination.

For selection,
I use Set.

For CRUD updates,
I return new arrays
instead of mutating old state.

For async work,
I handle double-submit,
multiple loading requests,
stale responses,
duplicate requests,
retry, and timeout.

The main goal is:
small functions,
clear input and output,
easy debugging,
and predictable state updates.
```

---

# ✅ 9.6 Machine-Coding Utilities Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ✅
9.6 Machine-Coding Utilities ✅

9.7 Promise Implementations ← NEXT
9.8 Event System
9.9 String Utilities
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.7 Promise Implementations 🔥🔥🔥
```
