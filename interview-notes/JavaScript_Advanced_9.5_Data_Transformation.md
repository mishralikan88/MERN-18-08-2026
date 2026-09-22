# 9.5 Data Transformation 🔥🔥🔥

Data transformation means:

```text
take data in one shape
↓
convert it into another shape
↓
make it easier for UI,
API usage,
reporting,
search,
sorting,
grouping,
or business logic
```

This is one of the most important real-world JavaScript skills.

In frontend and full-stack interviews, you are often given:

```text
API response
nested objects
duplicate records
different field names
multiple API responses
raw dates
status codes
pagination data
```

and asked to transform them into the shape the application actually needs.

This chapter covers:

```text
Normalization
Field Renaming
Computed Fields
Filtering
Sorting
Searching
Grouping
Indexing by ID
Counting
Deduplication
Object ↔ Array
Nested Data Transformation
Flattening API Data
Merging API Responses
Joining Records by ID
Lookup Maps
Pagination Transformation
Cleaning Null/Undefined Values
Aggregations
Tree → Flat
Flat → Tree
Real Employee API Problems
Machine-Coding Transformations
Interview Questions
```

---

# 1. What Is Data Transformation? 🔥🔥🔥

Suppose API gives:

```js
{
  emp_id:
    101,
  emp_name:
    "Rahul",
  active_flag:
    "Y",
}
```

But UI wants:

```js
{
  id:
    101,
  name:
    "Rahul",
  active:
    true,
}
```

That conversion is:

```text
data transformation
```

---

# 2. Why Is Data Transformation Needed?

Backend data is often designed for:

```text
database
legacy systems
API contracts
other services
```

Frontend wants data optimized for:

```text
display
search
filter
dropdowns
tables
forms
state
```

So a transformation layer keeps UI code cleaner.

---

# 3. Transformation Mental Model 🔥🔥🔥

Always think:

```text
INPUT SHAPE
↓
RULES
↓
OUTPUT SHAPE
```

Before coding, write the expected output first.

That prevents confusion.

---

# 4. Start With a Very Simple Transformation

Input:

```js
const employee = {
  emp_id:
    101,
  emp_name:
    "Rahul",
};
```

Wanted output:

```js
{
  id:
    101,
  name:
    "Rahul",
}
```

Code:

```js
const employee = {
  emp_id:
    101,
  emp_name:
    "Rahul",
};

// Step 1: Create a new object
// with the field names needed by the UI.
const normalizedEmployee = {
  id:
    employee.emp_id,

  name:
    employee.emp_name,
};

// Step 2: Print the transformed object.
console.log(
  normalizedEmployee
);
// Output:
// {
//   id: 101,
//   name: "Rahul"
// }
```

Output:

```text
{
  id: 101,
  name: "Rahul"
}
```

---

# 5. Why Create a New Object? 🔥🔥🔥

We normally prefer:

```text
raw API object
↓
new normalized object
```

instead of mutating the API response.

Why?

```text
safer
predictable
easier debugging
cleaner state updates
preserves original data
```

---

# 6. Transform an Array With `map()` 🔥🔥🔥

If API returns multiple employees:

```js
const employees = [
  {
    emp_id:
      101,
    emp_name:
      "Rahul",
  },
  {
    emp_id:
      102,
    emp_name:
      "Priya",
  },
];

// Step 1: map visits every API record.
const normalized =
  employees.map(
    (
      employee
    ) => {
      // Step 2: Return the new UI-friendly object.
      // Whatever map callback returns
      // becomes one item in the result array.
      return {
        id:
          employee.emp_id,

        name:
          employee.emp_name,
      };
    }
  );

// Step 3: Print the transformed array.
console.log(
  normalized
);
// Output:
// [
//   { id: 101, name: "Rahul" },
//   { id: 102, name: "Priya" }
// ]
```

Output:

```text
[
  { id: 101, name: "Rahul" },
  { id: 102, name: "Priya" }
]
```

---

# 7. Real API Normalization 🔥🔥🔥

Raw record:

```js
{
  emp_id:
    101,
  first_name:
    "Rahul",
  last_name:
    "Sharma",
  active_flag:
    "Y",
  salary_amount:
    "50000",
}
```

Wanted:

```js
{
  id:
    101,
  fullName:
    "Rahul Sharma",
  active:
    true,
  salary:
    50000,
}
```

---

# 8. Build a Normalizer Function 🔥🔥🔥

```js
function normalizeEmployee(
  employee
) {
  // Step 1: Rename emp_id to id.
  const id =
    employee.emp_id;

  // Step 2: Combine first and last name
  // into one display-friendly value.
  const fullName =
    `${employee.first_name} ${employee.last_name}`;

  // Step 3: Convert backend Y/N flag
  // into a real boolean.
  const active =
    employee.active_flag
    ===
    "Y";

  // Step 4: Convert salary string
  // into a number.
  const salary =
    Number(
      employee.salary_amount
    );

  // Step 5: Return one clean normalized object.
  return {
    id,
    fullName,
    active,
    salary,
  };
}
```

---

# 9. Test Normalizer 🔥🔥🔥

```js
const rawEmployee = {
  emp_id:
    101,
  first_name:
    "Rahul",
  last_name:
    "Sharma",
  active_flag:
    "Y",
  salary_amount:
    "50000",
};

// Step 1: Normalize raw API record.
const employee =
  normalizeEmployee(
    rawEmployee
  );

// Step 2: Print the cleaned object.
console.log(
  employee
);
// Output:
// {
//   id: 101,
//   fullName: "Rahul Sharma",
//   active: true,
//   salary: 50000
// }
```

Output:

```text
{
  id: 101,
  fullName: "Rahul Sharma",
  active: true,
  salary: 50000
}
```

---

# 10. Computed Fields 🔥🔥🔥

A computed field does not directly exist in API data.

Example:

```text
firstName + lastName
↓
fullName
```

Another example:

```text
price * quantity
↓
total
```

---

# 11. Computed Salary Band Example

```js
const employee = {
  name:
    "Rahul",
  salary:
    80000,
};

// Step 1: Compute a new field
// from an existing salary value.
const result = {
  ...employee,

  salaryBand:
    employee.salary
    >=
    75000
      ? "HIGH"
      : "NORMAL",
};

// Step 2: Print transformed object.
console.log(
  result
);
// Output:
// {
//   name: "Rahul",
//   salary: 80000,
//   salaryBand: "HIGH"
// }
```

Output:

```text
{
  name: "Rahul",
  salary: 80000,
  salaryBand: "HIGH"
}
```

---

# 12. Keep Only Needed Fields 🔥🔥🔥

Sometimes API sends 30 fields.

UI may need only:

```text
id
name
department
```

Use `map()` to project only required fields.

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
    department:
      "IT",
    salary:
      50000,
    internalCode:
      "X1",
  },
];

// Step 1: Return only fields
// required by the UI.
const uiEmployees =
  employees.map(
    (
      employee
    ) => {
      return {
        id:
          employee.id,

        name:
          employee.name,

        department:
          employee.department,
      };
    }
  );

// Step 2: Print reduced UI shape.
console.log(
  uiEmployees
);
// Output:
// [
//   {
//     id: 1,
//     name: "Rahul",
//     department: "IT"
//   }
// ]
```

Output:

```text
[
  {
    id: 1,
    name: "Rahul",
    department: "IT"
  }
]
```

---

# 13. Filter Then Map 🔥🔥🔥

Common real-app requirement:

```text
take active employees only
↓
convert them to dropdown options
```

---

# 14. Active Employees → Dropdown Options 🔥🔥🔥

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
    active:
      true,
  },
  {
    id:
      2,
    name:
      "Priya",
    active:
      false,
  },
  {
    id:
      3,
    name:
      "Amit",
    active:
      true,
  },
];

// Step 1: Keep only active employees.
const activeEmployees =
  employees.filter(
    (
      employee
    ) => {
      return employee.active;
    }
  );

// Step 2: Convert each active employee
// into dropdown-friendly {value, label}.
const options =
  activeEmployees.map(
    (
      employee
    ) => {
      return {
        value:
          employee.id,

        label:
          employee.name,
      };
    }
  );

// Step 3: Print final dropdown options.
console.log(
  options
);
// Output:
// [
//   { value: 1, label: "Rahul" },
//   { value: 3, label: "Amit" }
// ]
```

Output:

```text
[
  { value: 1, label: "Rahul" },
  { value: 3, label: "Amit" }
]
```

---

# 15. Can We Chain Filter and Map?

Yes.

```js
const options =
  employees
    .filter(
      (
        employee
      ) => {
        // Step 1: Keep only active records.
        return employee.active;
      }
    )
    .map(
      (
        employee
      ) => {
        // Step 2: Convert kept records
        // into dropdown options.
        return {
          value:
            employee.id,

          label:
            employee.name,
        };
      }
    );

// Step 3: Print final transformed array.
console.log(
  options
);
// Output:
// [
//   { value: 1, label: "Rahul" },
//   { value: 3, label: "Amit" }
// ]
```

Output:

```text
[
  { value: 1, label: "Rahul" },
  { value: 3, label: "Amit" }
]
```

---

# 16. Transformation Order Matters 🔥🔥🔥

These can produce different results:

```text
filter → map
```

vs:

```text
map → filter
```

Ask:

```text
Do I want to remove records first?

or

Do I need transformed values
before deciding what to keep?
```

---

# 17. Search Transformation 🔥🔥🔥

Common requirement:

```text
search employee by name
case-insensitive
ignore extra spaces
```

---

# 18. Normalize Search Input

```js
function normalizeText(
  value
) {
  // Step 1: Convert value to string
  // so the utility can safely work
  // with common input values.
  const text =
    String(
      value
    );

  // Step 2: Remove outer spaces.
  const trimmed =
    text.trim();

  // Step 3: Convert to lowercase
  // for case-insensitive comparison.
  return trimmed.toLowerCase();
}
```

---

# 19. Search Employees 🔥🔥🔥

```js
const employees = [
  {
    name:
      "Rahul Sharma",
  },
  {
    name:
      "Priya Singh",
  },
];

// Step 1: Normalize user query once.
const query =
  normalizeText(
    "  rahul "
  );

// Step 2: Filter records
// whose normalized name contains the query.
const result =
  employees.filter(
    (
      employee
    ) => {
      const normalizedName =
        normalizeText(
          employee.name
        );

      return normalizedName.includes(
        query
      );
    }
  );

// Step 3: Print matching names.
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

---

# 20. Sort API Data 🔥🔥🔥

Suppose salary arrives as strings.

Raw:

```text
"50000"
"9000"
"100000"
```

String sorting can be wrong numerically.

So transform to numbers first or compare with `Number()`.

---

# 21. Sort Employees by Salary

```js
const employees = [
  {
    name:
      "Rahul",
    salary:
      "50000",
  },
  {
    name:
      "Priya",
    salary:
      "90000",
  },
];

// Step 1: Normalize salary into a number.
const normalized =
  employees.map(
    (
      employee
    ) => {
      return {
        ...employee,

        salary:
          Number(
            employee.salary
          ),
      };
    }
  );

// Step 2: Sort a copied array
// from highest salary to lowest.
const sorted =
  normalized.toSorted(
    (
      a,
      b
    ) => {
      return (
        b.salary
        -
        a.salary
      );
    }
  );

// Step 3: Print sorted names.
console.log(
  sorted.map(
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

# 22. Why Use `toSorted()` Here? 🔥🔥🔥

`sort()` mutates the array.

`toSorted()` returns a new sorted array.

Mental model:

```text
sort()
→ mutates original

toSorted()
→ new array
```

For immutable transformations, `toSorted()` is often cleaner when available.

---

# 23. Object → Array Transformation 🔥🔥🔥

Input:

```js
const salaries = {
  Rahul:
    50000,
  Priya:
    60000,
};
```

Wanted:

```js
[
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
      60000,
  },
]
```

---

# 24. Object → Array With `Object.entries()` 🔥🔥🔥

```js
const salaries = {
  Rahul:
    50000,
  Priya:
    60000,
};

// Step 1: Object.entries converts object
// into [key, value] pairs.
const entries =
  Object.entries(
    salaries
  );

// Step 2: Convert each pair
// into a normal object.
const employees =
  entries.map(
    (
      [
        name,
        salary,
      ]
    ) => {
      return {
        name,
        salary,
      };
    }
  );

// Step 3: Print final array.
console.log(
  employees
);
// Output:
// [
//   { name: "Rahul", salary: 50000 },
//   { name: "Priya", salary: 60000 }
// ]
```

Output:

```text
[
  { name: "Rahul", salary: 50000 },
  { name: "Priya", salary: 60000 }
]
```

---

# 25. Array → Object Transformation 🔥🔥🔥

Input:

```js
[
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
]
```

Wanted:

```js
{
  1: {
    id:
      1,
    name:
      "Rahul",
  },

  2: {
    id:
      2,
    name:
      "Priya",
  },
}
```

This is called:

```text
indexing by ID
```

---

# 26. `indexById()` With Reduce 🔥🔥🔥

```js
function indexById(
  employees
) {
  // Step 1: Start accumulator
  // as an empty object.
  return employees.reduce(
    (
      result,
      employee
    ) => {
      // Step 2: Use employee.id
      // as dynamic object key.
      result[
        employee.id
      ] =
        employee;

      // Step 3: Return accumulator
      // for the next iteration.
      return result;
    },
    {}
  );
}
```

---

# 27. Test `indexById()` 🔥🔥🔥

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

// Step 1: Index the array by ID.
const indexed =
  indexById(
    employees
  );

// Step 2: Read employee 2 directly.
console.log(
  indexed[
    2
  ].name
); // Output: Priya
```

Output:

```text
Priya
```

---

# 28. Why Index By ID? 🔥🔥🔥

Without index:

```text
find employee ID 500
↓
scan array
↓
O(n)
```

With lookup object/Map:

```text
employeesById[500]
↓
direct lookup
↓
approximately O(1)
```

Very useful when repeated lookups happen.

---

# 29. Array → Object With `Object.fromEntries()` 🔥🔥🔥

Another approach:

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

// Step 1: Convert each employee
// into [key, value].
const entries =
  employees.map(
    (
      employee
    ) => {
      return [
        employee.id,
        employee,
      ];
    }
  );

// Step 2: Convert entries into object.
const indexed =
  Object.fromEntries(
    entries
  );

// Step 3: Read by key.
console.log(
  indexed[
    1
  ].name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 30. `countBy()` 🔥🔥🔥

Requirement:

```text
count employees
per department
```

Input:

```text
IT
HR
IT
Finance
IT
```

Output:

```text
IT: 3
HR: 1
Finance: 1
```

---

# 31. Build `countBy()` 🔥🔥🔥

```js
function countBy(
  items,
  getKey
) {
  // Step 1: Start with empty counts object.
  const result =
    {};

  // Step 2: Visit every item.
  for (
    const item
    of
    items
  ) {
    // Step 3: Calculate the counting key.
    const key =
      getKey(
        item
      );

    // Step 4: Read existing count,
    // or use 0 when key is new.
    const oldCount =
      result[
        key
      ]
      ??
      0;

    // Step 5: Store incremented count.
    result[
      key
    ] =
      oldCount
      +
      1;
  }

  // Step 6: Return all counts.
  return result;
}
```

---

# 32. Test `countBy()` 🔥🔥🔥

```js
const employees = [
  {
    department:
      "IT",
  },
  {
    department:
      "HR",
  },
  {
    department:
      "IT",
  },
];

// Step 1: Count employees by department.
const counts =
  countBy(
    employees,
    (
      employee
    ) => {
      return employee.department;
    }
  );

// Step 2: Print counts.
console.log(
  counts
); // Output: { IT: 2, HR: 1 }
```

Output:

```text
{
  IT: 2,
  HR: 1
}
```

---

# 33. Grouping vs Counting 🔥🔥🔥

```text
groupBy
→ keeps actual records

countBy
→ keeps only counts
```

Example:

```text
groupBy IT
→ [Rahul, Amit]

countBy IT
→ 2
```

---

# 34. Deduplication by ID 🔥🔥🔥

APIs sometimes return duplicate records.

Requirement:

```text
keep one record per employee ID
```

---

# 35. Deduplicate With Map 🔥🔥🔥

```js
function dedupeById(
  employees
) {
  // Step 1: Create Map
  // where key is employee ID.
  const byId =
    new Map();

  // Step 2: Visit every employee.
  for (
    const employee
    of
    employees
  ) {
    // Step 3: Store employee by ID.
    // If same ID appears again,
    // the newer record replaces the older one.
    byId.set(
      employee.id,
      employee
    );
  }

  // Step 4: Convert Map values back to array.
  return [
    ...byId.values(),
  ];
}
```

---

# 36. Dedupe Test — Last Record Wins 🔥🔥🔥

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul Old",
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
      "Rahul New",
  },
];

// Step 1: Deduplicate by id.
const result =
  dedupeById(
    employees
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
); // Output: ["Rahul New", "Priya"]
```

Output:

```text
["Rahul New", "Priya"]
```

---

# 37. First Record Wins vs Last Record Wins

Using:

```js
map.set(
  id,
  employee
);
```

every time means:

```text
last duplicate wins
```

If requirement is:

```text
first duplicate wins
```

check:

```js
if (
  !map.has(
    id
  )
)
```

before setting.

---

# 38. Clean Empty Filter Values 🔥🔥🔥

A search form may contain:

```js
{
  name:
    "",
  department:
    "IT",
  status:
    null,
  page:
    1,
}
```

We may want to remove:

```text
""
null
undefined
```

but keep:

```text
0
false
1
```

---

# 39. Build `cleanObject()` 🔥🔥🔥

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

  // Step 2: Keep only meaningful values.
  const cleanedEntries =
    entries.filter(
      (
        [
          ,
          value,
        ]
      ) => {
        // Step 3: Explicitly reject
        // empty string, null, and undefined.
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

  // Step 4: Convert remaining entries
  // back into an object.
  return Object.fromEntries(
    cleanedEntries
  );
}
```

---

# 40. Test `cleanObject()` 🔥🔥🔥

```js
const filters = {
  name:
    "",
  department:
    "IT",
  status:
    null,
  page:
    1,
  active:
    false,
};

// Step 1: Remove only unwanted empty values.
const result =
  cleanObject(
    filters
  );

// Step 2: Print cleaned filters.
console.log(
  result
);
// Output:
// {
//   department: "IT",
//   page: 1,
//   active: false
// }
```

Output:

```text
{
  department: "IT",
  page: 1,
  active: false
}
```

---

# 41. Why Not Use `filter(Boolean)` Here? 🔥🔥🔥

Because `Boolean` would remove valid values such as:

```text
0
false
```

Example:

```js
Boolean(
  false
);
```

Output:

```text
false
```

But sometimes:

```text
active: false
```

is meaningful and must remain.

So transformation rules must match business meaning.

---

# 42. Clean Array Values

If array contains:

```js
[
  "React",
  "",
  null,
  "Node",
]
```

we can explicitly clean it.

```js
const skills = [
  "React",
  "",
  null,
  "Node",
];

// Step 1: Keep only non-empty values.
const cleaned =
  skills.filter(
    (
      skill
    ) => {
      return (
        skill
        !==
        ""
        &&
        skill
        !==
        null
        &&
        skill
        !==
        undefined
      );
    }
  );

// Step 2: Print cleaned array.
console.log(
  cleaned
); // Output: ["React", "Node"]
```

Output:

```text
["React", "Node"]
```

---

# 43. Nested API Response Transformation 🔥🔥🔥

Raw API:

```js
{
  employee:
    {
      id:
        1,
      profile:
        {
          firstName:
            "Rahul",
          lastName:
            "Sharma",
        },
      department:
        {
          id:
            10,
          name:
            "IT",
        },
    },
}
```

UI may want:

```js
{
  id:
    1,
  name:
    "Rahul Sharma",
  departmentId:
    10,
  departmentName:
    "IT",
}
```

---

# 44. Flatten Nested Employee Response 🔥🔥🔥

```js
function flattenEmployee(
  response
) {
  // Step 1: Read nested employee once
  // so repeated access is simpler.
  const employee =
    response.employee;

  // Step 2: Read nested profile.
  const profile =
    employee.profile;

  // Step 3: Read nested department.
  const department =
    employee.department;

  // Step 4: Return a flat UI-friendly object.
  return {
    id:
      employee.id,

    name:
      `${profile.firstName} ${profile.lastName}`,

    departmentId:
      department.id,

    departmentName:
      department.name,
  };
}
```

---

# 45. Test Nested Flattening 🔥🔥🔥

```js
const response = {
  employee: {
    id:
      1,

    profile: {
      firstName:
        "Rahul",
      lastName:
        "Sharma",
    },

    department: {
      id:
        10,
      name:
        "IT",
    },
  },
};

// Step 1: Flatten nested response.
const result =
  flattenEmployee(
    response
  );

// Step 2: Print final object.
console.log(
  result
);
// Output:
// {
//   id: 1,
//   name: "Rahul Sharma",
//   departmentId: 10,
//   departmentName: "IT"
// }
```

Output:

```text
{
  id: 1,
  name: "Rahul Sharma",
  departmentId: 10,
  departmentName: "IT"
}
```

---

# 46. Nested Array Transformation 🔥🔥🔥

Suppose each department contains employees:

```js
[
  {
    department:
      "IT",
    employees: [
      "Rahul",
      "Amit",
    ],
  },
  {
    department:
      "HR",
    employees: [
      "Priya",
    ],
  },
]
```

Wanted:

```js
[
  {
    name:
      "Rahul",
    department:
      "IT",
  },
  ...
]
```

---

# 47. Use `flatMap()` 🔥🔥🔥

```js
const departments = [
  {
    department:
      "IT",

    employees: [
      "Rahul",
      "Amit",
    ],
  },
  {
    department:
      "HR",

    employees: [
      "Priya",
    ],
  },
];

// Step 1: flatMap lets each department
// return multiple employee records.
const employees =
  departments.flatMap(
    (
      department
    ) => {
      // Step 2: Convert each employee name
      // into an object containing department.
      return department.employees.map(
        (
          name
        ) => {
          return {
            name,

            department:
              department.department,
          };
        }
      );
    }
  );

// Step 3: Print flattened employee list.
console.log(
  employees
);
// Output:
// [
//   { name: "Rahul", department: "IT" },
//   { name: "Amit", department: "IT" },
//   { name: "Priya", department: "HR" }
// ]
```

Output:

```text
[
  { name: "Rahul", department: "IT" },
  { name: "Amit", department: "IT" },
  { name: "Priya", department: "HR" }
]
```

---

# 48. Why `flatMap()` Here?

Normal `map()` would produce:

```text
[
  [IT employees],
  [HR employees]
]
```

`flatMap()`:

```text
maps
+
flattens one level
```

So final output is one employee array.

---

# 49. Merge Two API Responses 🔥🔥🔥

Suppose:

API 1:

```js
employees
```

API 2:

```js
departments
```

Employees contain only:

```text
departmentId
```

We want:

```text
departmentName
```

---

# 50. Example Data

```js
const employees = [
  {
    id:
      1,
    name:
      "Rahul",
    departmentId:
      10,
  },
  {
    id:
      2,
    name:
      "Priya",
    departmentId:
      20,
  },
];

const departments = [
  {
    id:
      10,
    name:
      "IT",
  },
  {
    id:
      20,
    name:
      "HR",
  },
];
```

---

# 51. Simple Join With `find()` 🔥🔥🔥

```js
// Step 1: Transform each employee.
const result =
  employees.map(
    (
      employee
    ) => {
      // Step 2: Find matching department.
      const department =
        departments.find(
          (
            item
          ) => {
            return (
              item.id
              ===
              employee.departmentId
            );
          }
        );

      // Step 3: Return employee
      // plus department name.
      return {
        ...employee,

        departmentName:
          department
            ?.name
          ??
          "Unknown",
      };
    }
  );

// Step 4: Print merged records.
console.log(
  result
);
// Output:
// [
//   {
//     id: 1,
//     name: "Rahul",
//     departmentId: 10,
//     departmentName: "IT"
//   },
//   {
//     id: 2,
//     name: "Priya",
//     departmentId: 20,
//     departmentName: "HR"
//   }
// ]
```

Output:

```text
[
  {
    id: 1,
    name: "Rahul",
    departmentId: 10,
    departmentName: "IT"
  },
  {
    id: 2,
    name: "Priya",
    departmentId: 20,
    departmentName: "HR"
  }
]
```

---

# 52. Performance Problem With `find()` Inside `map()` 🔥🔥🔥

If there are:

```text
10,000 employees
10,000 departments
```

then repeated `find()` can become expensive.

Pattern:

```text
for every employee
↓
scan departments
```

Possible complexity:

```text
O(n × m)
```

Better:

```text
build lookup map once
↓
direct lookup
```

---

# 53. Build Department Lookup 🔥🔥🔥

```js
function indexBy(
  items,
  getKey
) {
  // Step 1: Create a Map
  // for fast key-based lookup.
  const result =
    new Map();

  // Step 2: Visit each item.
  for (
    const item
    of
    items
  ) {
    // Step 3: Calculate key
    // and store item.
    result.set(
      getKey(
        item
      ),
      item
    );
  }

  // Step 4: Return lookup Map.
  return result;
}
```

---

# 54. Efficient Join With Lookup Map 🔥🔥🔥

```js
// Step 1: Build department lookup once.
const departmentsById =
  indexBy(
    departments,
    (
      department
    ) => {
      return department.id;
    }
  );

// Step 2: Transform employees.
const result =
  employees.map(
    (
      employee
    ) => {
      // Step 3: Directly read department by ID.
      const department =
        departmentsById.get(
          employee.departmentId
        );

      // Step 4: Return merged record.
      return {
        ...employee,

        departmentName:
          department
            ?.name
          ??
          "Unknown",
      };
    }
  );

// Step 5: Print first merged department.
console.log(
  result[
    0
  ].departmentName
); // Output: IT
```

Output:

```text
IT
```

---

# 55. Why Lookup Maps Are Powerful 🔥🔥🔥

Instead of:

```text
map
→ find
→ scan
→ scan
→ scan
```

we do:

```text
build lookup once
↓
Map.get(id)
```

Very common in:

```text
Redux normalized state
table rendering
permissions
departments
countries/states
lookup catalogs
```

---

# 56. Merge Data From Three Sources 🔥🔥🔥

Suppose we have:

```text
employees
departments
roles
```

Employee contains:

```text
departmentId
roleId
```

Wanted UI object contains:

```text
departmentName
roleName
```

---

# 57. Three-Way Join Pattern

```js
const departmentsById =
  indexBy(
    departments,
    (
      department
    ) => {
      return department.id;
    }
  );

const roles = [
  {
    id:
      100,
    name:
      "Developer",
  },
];

const rolesById =
  indexBy(
    roles,
    (
      role
    ) => {
      return role.id;
    }
  );

const rawEmployees = [
  {
    id:
      1,
    name:
      "Rahul",
    departmentId:
      10,
    roleId:
      100,
  },
];

// Step 1: Transform each employee.
const result =
  rawEmployees.map(
    (
      employee
    ) => {
      // Step 2: Lookup related department.
      const department =
        departmentsById.get(
          employee.departmentId
        );

      // Step 3: Lookup related role.
      const role =
        rolesById.get(
          employee.roleId
        );

      // Step 4: Return enriched employee.
      return {
        ...employee,

        departmentName:
          department
            ?.name
          ??
          "Unknown",

        roleName:
          role
            ?.name
          ??
          "Unknown",
      };
    }
  );

// Step 5: Print transformed record.
console.log(
  result[
    0
  ].roleName
); // Output: Developer
```

Output:

```text
Developer
```

---

# 58. Aggregation 🔥🔥🔥

Aggregation means:

```text
many records
↓
summary value
```

Examples:

```text
total salary
average salary
employee count
department totals
minimum
maximum
```

---

# 59. Total Salary 🔥🔥🔥

```js
const employees = [
  {
    salary:
      50000,
  },
  {
    salary:
      70000,
  },
];

// Step 1: Start total at 0.
const total =
  employees.reduce(
    (
      sum,
      employee
    ) => {
      // Step 2: Add current salary
      // to accumulated total.
      return (
        sum
        +
        employee.salary
      );
    },
    0
  );

// Step 3: Print final total.
console.log(
  total
); // Output: 120000
```

Output:

```text
120000
```

---

# 60. Average Salary 🔥🔥🔥

```js
const employees = [
  {
    salary:
      50000,
  },
  {
    salary:
      70000,
  },
];

// Step 1: Sum all salaries.
const total =
  employees.reduce(
    (
      sum,
      employee
    ) => {
      return (
        sum
        +
        employee.salary
      );
    },
    0
  );

// Step 2: Avoid division by zero.
const average =
  employees.length
  ===
  0
    ? 0
    : total
      /
      employees.length;

// Step 3: Print average salary.
console.log(
  average
); // Output: 60000
```

Output:

```text
60000
```

---

# 61. Aggregate by Department 🔥🔥🔥

Wanted:

```text
IT → total salary 120000
HR → total salary 50000
```

---

# 62. Department Salary Totals 🔥🔥🔥

```js
const employees = [
  {
    department:
      "IT",
    salary:
      50000,
  },
  {
    department:
      "IT",
    salary:
      70000,
  },
  {
    department:
      "HR",
    salary:
      50000,
  },
];

// Step 1: Start with empty totals object.
const totals =
  employees.reduce(
    (
      result,
      employee
    ) => {
      // Step 2: Read old total for department.
      const oldTotal =
        result[
          employee.department
        ]
        ??
        0;

      // Step 3: Add current employee salary.
      result[
        employee.department
      ] =
        oldTotal
        +
        employee.salary;

      // Step 4: Return accumulator.
      return result;
    },
    {}
  );

// Step 5: Print department totals.
console.log(
  totals
); // Output: { IT: 120000, HR: 50000 }
```

Output:

```text
{
  IT: 120000,
  HR: 50000
}
```

---

# 63. Build Summary Object in One Reduce 🔥🔥🔥

We can calculate:

```text
count
totalSalary
averageSalary
```

in one pass.

---

# 64. Employee Summary

```js
const employees = [
  {
    salary:
      50000,
  },
  {
    salary:
      70000,
  },
];

// Step 1: Accumulate count and salary
// in one pass.
const summary =
  employees.reduce(
    (
      result,
      employee
    ) => {
      // Step 2: Increase employee count.
      result.count++;

      // Step 3: Add salary.
      result.totalSalary +=
        employee.salary;

      // Step 4: Return accumulator.
      return result;
    },
    {
      count:
        0,
      totalSalary:
        0,
    }
  );

// Step 5: Add computed average
// after reduction.
summary.averageSalary =
  summary.count
  ===
  0
    ? 0
    : summary.totalSalary
      /
      summary.count;

// Step 6: Print summary.
console.log(
  summary
);
// Output:
// {
//   count: 2,
//   totalSalary: 120000,
//   averageSalary: 60000
// }
```

Output:

```text
{
  count: 2,
  totalSalary: 120000,
  averageSalary: 60000
}
```

---

# 65. Pagination Transformation 🔥🔥🔥

API may return:

```js
{
  data: [...],
  page:
    2,
  pageSize:
    10,
  total:
    45,
}
```

UI may need:

```text
rows
currentPage
totalPages
hasNext
hasPrevious
```

---

# 66. Build Pagination View Model 🔥🔥🔥

```js
function transformPagination(
  response
) {
  // Step 1: Calculate total pages.
  const totalPages =
    Math.ceil(
      response.total
      /
      response.pageSize
    );

  // Step 2: Determine navigation flags.
  const hasPrevious =
    response.page
    >
    1;

  const hasNext =
    response.page
    <
    totalPages;

  // Step 3: Return UI-friendly pagination shape.
  return {
    rows:
      response.data,

    currentPage:
      response.page,

    pageSize:
      response.pageSize,

    totalItems:
      response.total,

    totalPages,

    hasPrevious,

    hasNext,
  };
}
```

---

# 67. Test Pagination Transformation 🔥🔥🔥

```js
const response = {
  data: [
    "A",
    "B",
  ],
  page:
    2,
  pageSize:
    10,
  total:
    45,
};

// Step 1: Transform API pagination response.
const pagination =
  transformPagination(
    response
  );

// Step 2: Print calculated values.
console.log(
  pagination.totalPages
); // Output: 5

console.log(
  pagination.hasPrevious
); // Output: true

console.log(
  pagination.hasNext
); // Output: true
```

Output:

```text
5
true
true
```

---

# 68. Why `Math.ceil()`?

If:

```text
45 items
10 per page
```

then:

```text
4 full pages
+
1 partial page
=
5 pages
```

So:

```js
Math.ceil(
  45 / 10
);
```

returns:

```text
5
```

---

# 69. Normalize Date Fields 🔥🔥🔥

API may return:

```text
created_at
```

as ISO string.

For sorting, repeatedly calling `new Date()` inside comparator can be wasteful.

We can normalize once.

---

# 70. Precompute Timestamp

```js
const records = [
  {
    id:
      1,
    createdAt:
      "2026-08-01T10:00:00Z",
  },
  {
    id:
      2,
    createdAt:
      "2026-08-03T10:00:00Z",
  },
];

// Step 1: Convert date string once
// into numeric timestamp.
const normalized =
  records.map(
    (
      record
    ) => {
      return {
        ...record,

        createdAtTime:
          new Date(
            record.createdAt
          ).getTime(),
      };
    }
  );

// Step 2: Sort newest first
// using numbers.
const sorted =
  normalized.toSorted(
    (
      a,
      b
    ) => {
      return (
        b.createdAtTime
        -
        a.createdAtTime
      );
    }
  );

// Step 3: Print newest record ID.
console.log(
  sorted[
    0
  ].id
); // Output: 2
```

Output:

```text
2
```

---

# 71. Normalize Boolean Flags 🔥🔥🔥

Backend possibilities:

```text
"Y" / "N"
1 / 0
"true" / "false"
```

UI wants:

```text
true / false
```

---

# 72. Boolean Normalizer

```js
function normalizeBoolean(
  value
) {
  // Step 1: Treat known true representations
  // as boolean true.
  if (
    value
    ===
    true
    ||
    value
    ===
    1
    ||
    value
    ===
    "1"
    ||
    value
    ===
    "Y"
    ||
    value
    ===
    "true"
  ) {
    return true;
  }

  // Step 2: Everything else
  // becomes false in this simplified rule.
  return false;
}
```

---

# 73. Test Boolean Normalizer

```js
// Step 1: Normalize Y.
console.log(
  normalizeBoolean(
    "Y"
  )
); // Output: true

// Step 2: Normalize 0.
console.log(
  normalizeBoolean(
    0
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 74. Normalize Status Codes 🔥🔥🔥

Backend:

```text
A
I
P
```

UI:

```text
Active
Inactive
Pending
```

---

# 75. Status Lookup Map

```js
const STATUS_LABELS = {
  A:
    "Active",
  I:
    "Inactive",
  P:
    "Pending",
};

function getStatusLabel(
  code
) {
  // Step 1: Read label
  // from lookup object.
  // Step 2: Use Unknown
  // when code is not mapped.
  return (
    STATUS_LABELS[
      code
    ]
    ??
    "Unknown"
  );
}

// Step 3: Test mapped value.
console.log(
  getStatusLabel(
    "A"
  )
); // Output: Active

// Step 4: Test unknown value.
console.log(
  getStatusLabel(
    "X"
  )
); // Output: Unknown
```

Output:

```text
Active
Unknown
```

---

# 76. Why Lookup Objects Are Better Than Huge `if` Chains

Instead of:

```text
if A
else if I
else if P
...
```

we can use:

```text
code
→ lookup table
→ label
```

This is easier to:

```text
read
extend
test
reuse
```

---

# 77. Build Lookup Options From Object 🔥🔥🔥

Input:

```js
{
  A:
    "Active",
  I:
    "Inactive",
}
```

Wanted:

```js
[
  {
    value:
      "A",
    label:
      "Active",
  },
  ...
]
```

---

# 78. Status Object → Dropdown Options

```js
const STATUS_LABELS = {
  A:
    "Active",
  I:
    "Inactive",
};

// Step 1: Convert object entries
// into dropdown option objects.
const options =
  Object.entries(
    STATUS_LABELS
  ).map(
    (
      [
        value,
        label,
      ]
    ) => {
      return {
        value,
        label,
      };
    }
  );

// Step 2: Print options.
console.log(
  options
);
// Output:
// [
//   { value: "A", label: "Active" },
//   { value: "I", label: "Inactive" }
// ]
```

Output:

```text
[
  { value: "A", label: "Active" },
  { value: "I", label: "Inactive" }
]
```

---

# 79. Multi-Condition Filtering 🔥🔥🔥

Real table filtering may have:

```text
search text
department
active status
minimum salary
```

We should make each filter optional.

---

# 80. Build `filterEmployees()` 🔥🔥🔥

```js
function filterEmployees(
  employees,
  filters
) {
  // Step 1: Normalize search query once.
  const query =
    (
      filters.search
      ??
      ""
    )
      .trim()
      .toLowerCase();

  // Step 2: Check each employee.
  return employees.filter(
    (
      employee
    ) => {
      // Step 3: Search condition.
      const matchesSearch =
        query
        ===
        ""
        ||
        employee.name
          .toLowerCase()
          .includes(
            query
          );

      // Step 4: Department condition.
      const matchesDepartment =
        !filters.department
        ||
        employee.department
        ===
        filters.department;

      // Step 5: Active condition.
      // undefined means:
      // do not filter by active.
      const matchesActive =
        filters.active
        ===
        undefined
        ||
        employee.active
        ===
        filters.active;

      // Step 6: Salary condition.
      const matchesSalary =
        filters.minSalary
        ===
        undefined
        ||
        employee.salary
        >=
        filters.minSalary;

      // Step 7: Employee must satisfy
      // every enabled condition.
      return (
        matchesSearch
        &&
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

# 81. Test Multi-Condition Filtering 🔥🔥🔥

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

// Step 1: Apply two active filters.
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

// Step 2: Print matching names.
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

# 82. Dynamic Sort Transformation 🔥🔥🔥

Requirement:

```text
sort by selected field
ascending or descending
```

---

# 83. Build `sortBy()` 🔥🔥🔥

```js
function sortBy(
  items,
  key,
  direction = "asc"
) {
  // Step 1: Decide numeric/string direction multiplier.
  const multiplier =
    direction
    ===
    "desc"
      ? -1
      : 1;

  // Step 2: Return a new sorted array.
  return items.toSorted(
    (
      first,
      second
    ) => {
      const a =
        first[
          key
        ];

      const b =
        second[
          key
        ];

      // Step 3: Equal values need no movement.
      if (
        a
        ===
        b
      ) {
        return 0;
      }

      // Step 4: Compare values
      // and apply requested direction.
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

# 84. Test Dynamic Sort

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

// Step 1: Sort salary descending.
const result =
  sortBy(
    employees,
    "salary",
    "desc"
  );

// Step 2: Print sorted names.
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

# 85. Tree → Flat Transformation 🔥🔥🔥

Nested data:

```text
Engineering
├── Frontend
└── Backend
```

Sometimes UI wants one flat list.

---

# 86. Example Tree

```js
const tree = [
  {
    id:
      1,
    name:
      "Engineering",

    children: [
      {
        id:
          2,
        name:
          "Frontend",
        children:
          [],
      },
      {
        id:
          3,
        name:
          "Backend",
        children:
          [],
      },
    ],
  },
];
```

---

# 87. Build `flattenTree()` 🔥🔥🔥

```js
function flattenTree(
  nodes,
  parentId = null
) {
  // Step 1: Create result
  // for this recursion level.
  const result =
    [];

  // Step 2: Visit every node.
  for (
    const node
    of
    nodes
  ) {
    // Step 3: Add a flat version
    // without nested children.
    result.push(
      {
        id:
          node.id,

        name:
          node.name,

        parentId,
      }
    );

    // Step 4: If children exist,
    // recursively flatten them.
    if (
      node.children
      ?.length
    ) {
      const flatChildren =
        flattenTree(
          node.children,
          node.id
        );

      // Step 5: Add flattened children
      // after their parent.
      result.push(
        ...flatChildren
      );
    }
  }

  // Step 6: Return flattened nodes.
  return result;
}
```

---

# 88. Test Tree → Flat 🔥🔥🔥

```js
// Step 1: Flatten the nested tree.
const flat =
  flattenTree(
    tree
  );

// Step 2: Print simple id-parent pairs.
console.log(
  flat.map(
    (
      item
    ) => {
      return (
        `${item.id}:${item.parentId}`
      );
    }
  )
);
// Output:
// ["1:null", "2:1", "3:1"]
```

Output:

```text
["1:null", "2:1", "3:1"]
```

---

# 89. Flat → Tree Transformation 🔥🔥🔥

Input:

```js
[
  {
    id:
      1,
    parentId:
      null,
  },
  {
    id:
      2,
    parentId:
      1,
  },
]
```

Wanted:

```text
1
└── 2
```

---

# 90. Build Flat → Tree Efficiently 🔥🔥🔥

```js
function buildTree(
  items
) {
  // Step 1: Create lookup map
  // containing cloned nodes
  // with empty children arrays.
  const byId =
    new Map();

  for (
    const item
    of
    items
  ) {
    byId.set(
      item.id,
      {
        ...item,
        children:
          [],
      }
    );
  }

  // Step 2: Store root nodes separately.
  const roots =
    [];

  // Step 3: Visit original items again.
  for (
    const item
    of
    items
  ) {
    // Step 4: Read cloned node.
    const node =
      byId.get(
        item.id
      );

    // Step 5: No parent means root.
    if (
      item.parentId
      == null
    ) {
      roots.push(
        node
      );

      continue;
    }

    // Step 6: Find parent directly.
    const parent =
      byId.get(
        item.parentId
      );

    // Step 7: Attach node
    // to parent's children.
    if (
      parent
    ) {
      parent.children.push(
        node
      );
    }
  }

  // Step 8: Return root nodes.
  return roots;
}
```

---

# 91. Test Flat → Tree

```js
const items = [
  {
    id:
      1,
    name:
      "Engineering",
    parentId:
      null,
  },
  {
    id:
      2,
    name:
      "Frontend",
    parentId:
      1,
  },
];

// Step 1: Build nested tree.
const result =
  buildTree(
    items
  );

// Step 2: Print child name.
console.log(
  result[
    0
  ].children[
    0
  ].name
); // Output: Frontend
```

Output:

```text
Frontend
```

---

# 92. Why Flat → Tree Uses a Lookup Map 🔥🔥🔥

Without map:

```text
for each child
↓
scan all items to find parent
```

Potentially:

```text
O(n²)
```

With `Map`:

```text
build map O(n)
+
attach nodes O(n)
```

approximately:

```text
O(n)
```

---

# 93. Rename Object Keys Dynamically 🔥🔥🔥

Suppose mapping is:

```js
{
  emp_id:
    "id",
  emp_name:
    "name",
}
```

We can build a reusable renamer.

---

# 94. Build `renameKeys()` 🔥🔥🔥

```js
function renameKeys(
  object,
  mapping
) {
  // Step 1: Create output object.
  const result =
    {};

  // Step 2: Visit every original entry.
  for (
    const [
      key,
      value,
    ]
    of
    Object.entries(
      object
    )
  ) {
    // Step 3: Use mapped key
    // when mapping exists.
    // Otherwise keep original key.
    const newKey =
      mapping[
        key
      ]
      ??
      key;

    // Step 4: Store value
    // under final key.
    result[
      newKey
    ] =
      value;
  }

  // Step 5: Return renamed object.
  return result;
}
```

---

# 95. Test `renameKeys()` 🔥🔥🔥

```js
const raw = {
  emp_id:
    101,
  emp_name:
    "Rahul",
  department:
    "IT",
};

// Step 1: Rename only configured keys.
const result =
  renameKeys(
    raw,
    {
      emp_id:
        "id",
      emp_name:
        "name",
    }
  );

// Step 2: Print transformed object.
console.log(
  result
);
// Output:
// {
//   id: 101,
//   name: "Rahul",
//   department: "IT"
// }
```

Output:

```text
{
  id: 101,
  name: "Rahul",
  department: "IT"
}
```

---

# 96. Pick Fields 🔥🔥🔥

Sometimes we want only selected keys.

Example:

```text
pick:
id
name
```

---

# 97. Build `pick()` 🔥🔥🔥

```js
function pick(
  object,
  keys
) {
  // Step 1: Create output object.
  const result =
    {};

  // Step 2: Visit requested keys.
  for (
    const key
    of
    keys
  ) {
    // Step 3: Copy key only
    // when it belongs to the object.
    if (
      Object.hasOwn(
        object,
        key
      )
    ) {
      result[
        key
      ] =
        object[
          key
        ];
    }
  }

  // Step 4: Return selected fields.
  return result;
}
```

---

# 98. Test `pick()`

```js
const employee = {
  id:
    1,
  name:
    "Rahul",
  salary:
    50000,
  department:
    "IT",
};

// Step 1: Keep only public display fields.
const result =
  pick(
    employee,
    [
      "id",
      "name",
    ]
  );

// Step 2: Print selected object.
console.log(
  result
); // Output: { id: 1, name: "Rahul" }
```

Output:

```text
{
  id: 1,
  name: "Rahul"
}
```

---

# 99. Omit Fields 🔥🔥🔥

Opposite of pick:

```text
remove selected keys
keep everything else
```

---

# 100. Build `omit()` 🔥🔥🔥

```js
function omit(
  object,
  keys
) {
  // Step 1: Convert excluded keys
  // into a Set for fast lookup.
  const excluded =
    new Set(
      keys
    );

  // Step 2: Keep entries
  // whose key is not excluded.
  const entries =
    Object.entries(
      object
    ).filter(
      (
        [
          key,
        ]
      ) => {
        return (
          !excluded.has(
            key
          )
        );
      }
    );

  // Step 3: Convert kept entries
  // back to an object.
  return Object.fromEntries(
    entries
  );
}
```

---

# 101. Test `omit()`

```js
const employee = {
  id:
    1,
  name:
    "Rahul",
  password:
    "secret",
};

// Step 1: Remove sensitive field.
const result =
  omit(
    employee,
    [
      "password",
    ]
  );

// Step 2: Print safe object.
console.log(
  result
); // Output: { id: 1, name: "Rahul" }
```

Output:

```text
{
  id: 1,
  name: "Rahul"
}
```

---

# 102. Transformation Pipeline 🔥🔥🔥

Real applications often combine several transformations:

```text
raw API
↓
normalize
↓
filter
↓
dedupe
↓
sort
↓
map to UI shape
```

The order should be intentional.

---

# 103. Full Employee Transformation Pipeline 🔥🔥🔥

```js
const rawEmployees = [
  {
    emp_id:
      1,
    emp_name:
      " Rahul ",
    active_flag:
      "Y",
    salary:
      "70000",
  },
  {
    emp_id:
      2,
    emp_name:
      "Priya",
    active_flag:
      "N",
    salary:
      "80000",
  },
  {
    emp_id:
      1,
    emp_name:
      "Rahul Duplicate",
    active_flag:
      "Y",
    salary:
      "70000",
  },
];

// Step 1: Normalize raw backend fields.
const normalized =
  rawEmployees.map(
    (
      employee
    ) => {
      return {
        id:
          employee.emp_id,

        name:
          employee.emp_name
            .trim(),

        active:
          employee.active_flag
          ===
          "Y",

        salary:
          Number(
            employee.salary
          ),
      };
    }
  );

// Step 2: Keep active employees only.
const active =
  normalized.filter(
    (
      employee
    ) => {
      return employee.active;
    }
  );

// Step 3: Remove duplicate IDs.
// Last duplicate wins in this implementation.
const unique =
  dedupeById(
    active
  );

// Step 4: Sort highest salary first.
const sorted =
  unique.toSorted(
    (
      a,
      b
    ) => {
      return (
        b.salary
        -
        a.salary
      );
    }
  );

// Step 5: Convert to final UI row shape.
const rows =
  sorted.map(
    (
      employee
    ) => {
      return {
        id:
          employee.id,

        displayName:
          employee.name,

        salaryText:
          `₹${employee.salary}`,
      };
    }
  );

// Step 6: Print final rows.
console.log(
  rows
);
```

Output:

```text
[
  {
    id: 1,
    displayName: "Rahul Duplicate",
    salaryText: "₹70000"
  }
]
```

---

# 104. Why Transform in Stages? 🔥🔥🔥

Instead of one huge callback:

```text
hard to read
hard to debug
hard to test
```

stages make it easier to inspect:

```text
normalized
active
unique
sorted
rows
```

In production, you may combine steps for performance if needed, but clarity comes first unless profiling says otherwise.

---

# 105. Machine-Coding Problem — Build Employee Table Rows 🔥🔥🔥

Requirement:

```text
Input:
raw API employees

Need:
only active employees
full name
department label
salary number
sorted by salary descending
```

Approach:

```text
normalize
↓
filter
↓
enrich with department lookup
↓
sort
↓
return rows
```

---

# 106. Machine-Coding Solution 🔥🔥🔥

```js
function buildEmployeeRows(
  employees,
  departments
) {
  // Step 1: Build department lookup once.
  const departmentById =
    indexBy(
      departments,
      (
        department
      ) => {
        return department.id;
      }
    );

  // Step 2: Normalize backend employee fields.
  const normalized =
    employees.map(
      (
        employee
      ) => {
        return {
          id:
            employee.emp_id,

          fullName:
            `${employee.first_name} ${employee.last_name}`,

          active:
            employee.active_flag
            ===
            "Y",

          salary:
            Number(
              employee.salary
            ),

          departmentId:
            employee.department_id,
        };
      }
    );

  // Step 3: Keep active records.
  const active =
    normalized.filter(
      (
        employee
      ) => {
        return employee.active;
      }
    );

  // Step 4: Add department label.
  const enriched =
    active.map(
      (
        employee
      ) => {
        const department =
          departmentById.get(
            employee.departmentId
          );

        return {
          ...employee,

          departmentName:
            department
              ?.name
            ??
            "Unknown",
        };
      }
    );

  // Step 5: Sort highest salary first.
  return enriched.toSorted(
    (
      a,
      b
    ) => {
      return (
        b.salary
        -
        a.salary
      );
    }
  );
}
```

---

# 107. Debugging Checklist 🔥🔥🔥

```text
NORMALIZATION
Did I convert strings to numbers?
Did I convert flags to booleans?
Did I rename fields correctly?

FILTERING
Am I removing valid false/0 values by mistake?
Are optional filters truly optional?

SORTING
Am I sorting strings numerically by mistake?
Am I mutating the original array?

GROUPING
Am I creating groups before pushing?
Do I need group records or only counts?

DEDUPLICATION
Should first duplicate win?
Or last duplicate win?

JOINS
Am I repeatedly using find inside map?
Should I build a lookup Map?

NESTED DATA
Can an intermediate property be missing?
Should I flatten the shape?

AGGREGATION
Did I initialize accumulator correctly?
Did I return accumulator?

PAGINATION
Did I use Math.ceil?
What happens on the last page?

TREE DATA
Can I avoid O(n²) parent lookups?

CLEANING
Should false and 0 be kept?
```

---

# 108. Interview Question — What Is Data Normalization? 🔥🔥🔥

Good answer:

```text
Data normalization converts raw data
into a consistent application-friendly shape.

For example,
I may rename backend fields,
convert strings to numbers,
convert Y/N into booleans,
and compute display fields.

It reduces repeated transformation logic
inside UI components.
```

---

# 109. Interview Question — Why Normalize API Data Once?

```text
If every component independently converts
the same backend format,
logic becomes duplicated and inconsistent.

Normalizing once gives the application
a predictable internal data shape.
```

---

# 110. Interview Question — `map` vs `reduce` for Transformation

```text
map
→ best when one input item
produces one output item

reduce
→ useful when building
a different accumulated structure
such as object, groups, counts,
or one summary value
```

---

# 111. Interview Question — Why Build Lookup Maps? 🔥🔥🔥

```text
If I repeatedly search one collection
while transforming another collection,
using find inside map can become O(n × m).

I can index the lookup collection once
with Map or an object,
then perform direct lookups
while transforming.
```

---

# 112. Interview Question — Filter Then Map or Map Then Filter?

Good answer:

```text
It depends on the requirement.

If filtering can be done on raw data,
I often filter first
so fewer records need transformation.

If filtering depends on computed values,
I transform first and filter after.

The important thing is
to choose the order intentionally.
```

---

# 113. Interview Question — Why Avoid Mutation? 🔥🔥🔥

```text
Immutable transformations
are easier to reason about,
especially in frontend state management.

They reduce side effects,
make debugging simpler,
and work better with change detection patterns.

But mutation can be acceptable
inside a controlled local accumulator
when the contract is clear.
```

---

# 114. Interview Question — How Do You Transform Large Data Efficiently?

Good answer:

```text
I avoid repeated scans,
build lookup maps for joins,
precompute expensive derived values once,
use one-pass reductions when it improves clarity,
and avoid unnecessary intermediate arrays
only when performance actually matters.

I first keep the code correct and readable,
then optimize based on data size and profiling.
```

---

# 115. Interview Question — Tree to Flat and Flat to Tree

```text
Tree to flat
→ recursion is natural

Flat to tree
→ build an ID lookup map first
→ then attach each child to its parent

The lookup-map approach avoids
repeated parent searches.
```

---

# 116. Final Data Transformation Decision Guide 🔥🔥🔥

```text
Rename backend fields?
→ map / normalizer

Add calculated values?
→ computed fields

Remove records?
→ filter

Create dropdown options?
→ filter + map

Group records?
→ groupBy / reduce

Count categories?
→ countBy / reduce

Fast lookup by ID?
→ indexBy / Map

Remove duplicates?
→ Set / Map / uniqueBy

Object to array?
→ Object.entries + map

Array to object?
→ reduce / Object.fromEntries

Flatten nested API shape?
→ map / flatMap / custom normalizer

Merge related APIs?
→ lookup Map + map

Clean filters?
→ Object.entries + filter + Object.fromEntries

Aggregate totals?
→ reduce

Paginated UI metadata?
→ transform page response

Dynamic nested hierarchy?
→ tree ↔ flat transforms
```

---

# 117. Quick Memory 🧠🔥🔥🔥

## Normalize

```text
raw backend shape
→ application shape
```

## Map

```text
one item
→ one transformed item
```

## Filter

```text
keep/remove records
```

## Reduce

```text
many records
→ one accumulated structure/value
```

## Index By ID

```text
array
→ lookup object/Map
```

## GroupBy

```text
records
→ grouped arrays
```

## CountBy

```text
records
→ grouped counts
```

## Join

```text
employees
+
departments
↓
enriched employees
```

## Lookup Map

```text
build once
→ reuse many times
```

## Clean Object

```text
remove null
undefined
empty string
but preserve meaningful false/0
```

## Tree → Flat

```text
recursion
```

## Flat → Tree

```text
ID lookup
+
attach children
```

---

# 118. Best Interview Answer 🔥🔥🔥

```text
Data transformation means converting raw data
into the shape the application actually needs.

I commonly normalize API fields,
convert data types,
add computed values,
filter and sort records,
group or index data,
merge related API responses,
clean empty values,
and build summaries.

For repeated joins,
I prefer lookup maps
instead of calling find inside map
for every record.

For nested structures,
I use recursion when appropriate,
for example tree-to-flat transformations.

I also pay attention to mutation,
time complexity,
business rules for null/false/zero,
and whether the transformation
should happen once at the API boundary
or repeatedly inside the UI.
```

---

# ✅ 9.5 Data Transformation Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ✅
9.6 Machine-Coding Utilities ← NEXT
9.7 Promise Implementations
9.8 Event System
9.9 String Utilities
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.6 Machine-Coding Utilities 🔥🔥🔥
```

**Next: 9.6 Machine-Coding Utilities 🔥🔥🔥**
