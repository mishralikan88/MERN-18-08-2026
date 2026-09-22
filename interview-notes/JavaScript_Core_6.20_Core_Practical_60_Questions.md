# 6.20 Core Practical 🔥🔥🔥

This is the **final JavaScript Core chapter**.

The goal here is not to learn new syntax.

The goal is to combine everything we already covered:

```text
Arrays
Objects
Strings
Dates
Sets
Maps
JSON
Regex
Error Handling
Destructuring
Spread / Rest
Functions
Conditions
Loops
```

Locked practical set:

```text
20 Coding Problems
10 API / Data Transformation Problems
10 Output Prediction Questions
8 Debugging Problems
6 Refactoring Problems
6 Machine-Coding Utilities

Total = 60 Questions
```

---

# PART 1 — 20 CODING PROBLEMS 🔥🔥🔥

# 1. Remove Duplicate Numbers

Problem:

```text
Input:
[1, 2, 2, 3, 3, 4]

Output:
[1, 2, 3, 4]
```

Code:

```js
const numbers = [
  1,
  2,
  2,
  3,
  3,
  4,
];

// Step 1:
// Convert array to Set.
// Set keeps only unique values.
const uniqueSet =
  new Set(
    numbers
  );

// Step 2:
// Convert Set back to array.
const result =
  [
    ...uniqueSet,
  ];

// Step 3:
console.log(
  result
); // Output: [1, 2, 3, 4]
```

Output:

```text
[1, 2, 3, 4]
```

Easy flow:

```text
array
↓ new Set()
unique values
↓ spread
new array
```

---

# 2. Find Duplicate Values

Problem:

```text
Input:
[1, 2, 2, 3, 4, 4]

Output:
[2, 4]
```

Code:

```js
const numbers = [
  1,
  2,
  2,
  3,
  4,
  4,
];

// Step 1:
// Track values already seen.
const seen =
  new Set();

// Step 2:
// Track duplicate values.
const duplicates =
  new Set();

// Step 3:
// Check each number.
for (
  const number
  of numbers
) {
  // Step 4:
  // If already seen,
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
    // Step 5:
    // First occurrence.
    seen.add(
      number
    );
  }
}

// Step 6:
// Convert duplicate Set to array.
const result =
  [
    ...duplicates,
  ];

console.log(
  result
); // Output: [2, 4]
```

Output:

```text
[2, 4]
```

---

# 3. Character Frequency

Problem:

```text
Input:
"banana"

Output:
{
  b: 1,
  a: 3,
  n: 2
}
```

Code:

```js

const text =
  "banana";

// Step 1:
// Start empty frequency object.
const frequency =
  {};

// Step 2:
// Visit each character.
for ( 
  const char
  of text
) {
  // Step 3:
  // Existing count or 0,
  // then add 1.
  frequency[char] =
    (
      frequency[char]
      ??
      0
    )
    +
    1;
}

// Step 4:
console.log(
  frequency
);
// Output:
// { b: 1, a: 3, n: 2 }
```

Output:

```text
{ b: 1, a: 3, n: 2 }
```

---

# 4. Word Frequency

Problem:

```text
Input:
"react node react javascript node react"

Output:
{
  react: 3,
  node: 2,
  javascript: 1
}
```

Code:

```js
const text =
  "react node react javascript node react";

// Step 1:
// Split sentence into words.
const words =
  text.split(
    " "
  );

// Step 2:
// Create frequency object.
const frequency =
  {};

// Step 3:
// Count each word.
for (
  const word
  of words
) {
  frequency[word] =
    (
      frequency[word]
      ??
      0
    )
    +
    1;
}

// Step 4:
console.log(
  frequency
);
// Output:
// {
//   react: 3,
//   node: 2,
//   javascript: 1
// }
```

Output:

```text
{ react: 3, node: 2, javascript: 1 }
```

---

# 5. Find Most Frequent Character

Problem:

```text
Input:
"banana"

Output:
"a"
```

Code:

```js
const text =
  "banana";

// Step 1:
// Build frequency map.
const frequency =
  {};

for (
  const char
  of text
) {
  frequency[char] =
    (
      frequency[char]
      ??
      0
    )
    +
    1;
}

// Step 2:
// Track current winner.
let maxChar =
  "";

let maxCount =
  0;

// Step 3:
// Compare each character count.
for (
  const [
    char,
    count,
  ]
  of Object.entries(
    frequency
  )
) {
  if (
    count
    >
    maxCount
  ) {
    maxCount =
      count;

    maxChar =
      char;
  }
}

// Step 4:
console.log(
  maxChar
); // Output: a
```

Output:

```text
a
```

---

# 6. Group Employees by Department

Problem:

```text
Group employee records using department.
```

Code:

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
    name: "Neha",
    department: "IT",
  },
];

// Step 1:
// Start with empty object.
const grouped =
  employees.reduce(
    (
      acc,
      employee
    ) => {
      // Step 2:
      const department =
        employee.department;

      // Step 3:
      // Create department array
      // if it does not exist.
      if (
        !acc[
          department
        ]
      ) {
        acc[
          department
        ] =
          [];
      }

      // Step 4:
      // Push employee into group.
      acc[
        department
      ].push(
        employee
      );

      // Step 5:
      return acc;
    },
    {}
  );

// Step 6:
console.log(
  grouped.IT.map(
    ({ name }) =>
      name
  )
); // Output: ["Rahul", "Neha"]
```

Output:

```text
["Rahul", "Neha"]
```

---

# 7. Count Employees by Department

Problem:

```text
Output:
{
  IT: 2,
  HR: 1
}
```

Code:

```js
const employees = [
  {
    department: "IT",
  },
  {
    department: "HR",
  },
  {
    department: "IT",
  },
];

// Step 1:
const counts =
  employees.reduce(
    (
      acc,
      employee
    ) => {
      // Step 2:
      const department =
        employee.department;

      // Step 3:
      acc[
        department
      ] =
        (
          acc[
            department
          ]
          ??
          0
        )
        +
        1;

      // Step 4:
      return acc;
    },
    {}
  );

// Step 5:
console.log(
  counts
); // Output: { IT: 2, HR: 1 }
```

Output:

```text
{ IT: 2, HR: 1 }
```

---

# 8. Sort Employees by Salary

Problem:

```text
Sort ascending by salary.
```

Code:

```js
const employees = [
  {
    name: "Rahul",
    salary: 70000,
  },
  {
    name: "Amit",
    salary: 50000,
  },
  {
    name: "Neha",
    salary: 60000,
  },
];

// Step 1:
// toSorted() creates
// a new sorted array.
const sorted =
  employees.toSorted(
    (
      a,
      b
    ) =>
      a.salary
      -
      b.salary
  );

// Step 2:
console.log(
  sorted.map(
    ({ name }) =>
      name
  )
);
// Output:
// ["Amit", "Neha", "Rahul"]
```

Output:

```text
["Amit", "Neha", "Rahul"]
```

---

# 9. Search Employees by Name

Problem:

```text
Search should ignore case.
```

Code:

```js
const employees = [
  {
    name: "Rahul Mishra",
  },
  {
    name: "Amit Kumar",
  },
  {
    name: "Ravi Rahul",
  },
];

const query =
  "rahul";

// Step 1:
// Normalize query.
const normalizedQuery =
  query
    .trim()
    .toLowerCase();

// Step 2:
// Filter matching employees.
const result =
  employees.filter(
    ({ name }) =>
      name
        .toLowerCase()
        .includes(
          normalizedQuery
        )
  );

// Step 3:
console.log(
  result.map(
    ({ name }) =>
      name
  )
);
// Output:
// ["Rahul Mishra", "Ravi Rahul"]
```

Output:

```text
["Rahul Mishra", "Ravi Rahul"]
```

---

# 10. Calculate Total Cart Price

Problem:

```text
price × quantity
for all items
```

Code:

```js
const cart = [
  {
    price: 100,
    quantity: 2,
  },
  {
    price: 50,
    quantity: 3,
  },
];

// Step 1:
// Reduce all line totals.
const total =
  cart.reduce(
    (
      sum,
      item
    ) => {
      // Step 2:
      const itemTotal =
        item.price
        *
        item.quantity;

      // Step 3:
      return (
        sum
        +
        itemTotal
      );
    },
    0
  );

// Step 4:
console.log(
  total
); // Output: 350
```

Output:

```text
350
```

---

# 11. Find Min and Max Salary

Code:

```js
const salaries = [
  50000,
  70000,
  60000,
  90000,
];

// Step 1:
const minSalary =
  Math.min(
    ...salaries
  );

// Step 2:
const maxSalary =
  Math.max(
    ...salaries
  );

// Step 3:
console.log(
  minSalary
); // Output: 50000

console.log(
  maxSalary
); // Output: 90000
```

Output:

```text
50000
90000
```

---

# 12. Reverse Words in a Sentence

Problem:

```text
Input:
"JavaScript is awesome"

Output:
"awesome is JavaScript"
```

Code:

```js
const text =
  "JavaScript is awesome";

// Step 1:
// Split into words.
const words =
  text.split(
    " "
  );

// Step 2:
// Reverse word order.
const reversed =
  words.toReversed();

// Step 3:
// Join back into string.
const result =
  reversed.join(
    " "
  );

// Step 4:
console.log(
  result
); // Output: awesome is JavaScript
```

Output:

```text
awesome is JavaScript
```

---

# 13. Check Palindrome

Problem:

```text
Input:
"madam"

Output:
true
```

Code:

```js
function isPalindrome(
  text
) {
  // Step 1:
  // Normalize.
  const normalized =
    text
      .toLowerCase();

  // Step 2:
  // Reverse characters.
  const reversed =
    [
      ...normalized,
    ]
      .reverse()
      .join(
        ""
      );

  // Step 3:
  return (
    normalized
    ===
    reversed
  );
}

// Step 4:
console.log(
  isPalindrome(
    "madam"
  )
); // Output: true
```

Output:

```text
true
```

---

# 14. Capitalize Every Word

Problem:

```text
Input:
"javascript interview preparation"

Output:
"Javascript Interview Preparation"
```

Code:

```js
const text =
  "javascript interview preparation";

// Step 1:
// Split words.
const words =
  text.split(
    " "
  );

// Step 2:
// Capitalize each word.
const result =
  words
    .map(
      (word) =>
        word[0]
          .toUpperCase()
        +
        word.slice(
          1
        )
    )
    .join(
      " "
    );

// Step 3:
console.log(
  result
);
// Output:
// Javascript Interview Preparation
```

Output:

```text
Javascript Interview Preparation
```

---

# 15. Chunk an Array

Problem:

```text
Input:
[1,2,3,4,5,6,7]
size = 3

Output:
[[1,2,3],[4,5,6],[7]]
```

Code:

```js
function chunkArray(
  items,
  size
) {
  // Step 1:
  const result =
    [];

  // Step 2:
  // Jump by chunk size.
  for (
    let index = 0;
    index < items.length;
    index += size
  ) {
    // Step 3:
    result.push(
      items.slice(
        index,
        index + size
      )
    );
  }

  // Step 4:
  return result;
}

// Step 5:
console.log(
  chunkArray(
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ],
    3
  )
);
// Output:
// [[1,2,3],[4,5,6],[7]]
```

Output:

```text
[[1, 2, 3], [4, 5, 6], [7]]
```

---

# 16. Flatten Nested Array One Level

Code:

```js
const values = [
  [
    1,
    2,
  ],
  [
    3,
    4,
  ],
];

// Step 1:
const result =
  values.flat();

// Step 2:
console.log(
  result
); // Output: [1, 2, 3, 4]
```

Output:

```text
[1, 2, 3, 4]
```

---

# 17. Flatten Deeply Nested Array

Code:

```js
const values = [
  1,
  [
    2,
    [
      3,
      [
        4,
      ],
    ],
  ],
];

// Step 1:
// Infinity means flatten
// all nesting levels.
const result =
  values.flat(
    Infinity
  );

// Step 2:
console.log(
  result
); // Output: [1, 2, 3, 4]
```

Output:

```text
[1, 2, 3, 4]
```

---

# 18. Convert Array to Object Indexed by ID

Code:

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

// Step 1:
const indexed =
  employees.reduce(
    (
      acc,
      employee
    ) => {
      // Step 2:
      acc[
        employee.id
      ] =
        employee;

      // Step 3:
      return acc;
    },
    {}
  );

// Step 4:
console.log(
  indexed[102].name
); // Output: Amit
```

Output:

```text
Amit
```

---

# 19. Merge Two Arrays Without Duplicates

Code:

```js
const first = [
  1,
  2,
  3,
];

const second = [
  3,
  4,
  5,
];

// Step 1:
// Merge both arrays.
const merged =
  [
    ...first,
    ...second,
  ];

// Step 2:
// Remove duplicates.
const result =
  [
    ...new Set(
      merged
    ),
  ];

// Step 3:
console.log(
  result
); // Output: [1, 2, 3, 4, 5]
```

Output:

```text
[1, 2, 3, 4, 5]
```

---

# 20. Update Nested Object Immutably

Problem:

```text
Change city without mutating original object.
```

Code:

```js
const employee = {
  id: 101,
  name: "Rahul",
  address: {
    city: "Hyderabad",
    country: "India",
  },
};

// Step 1:
// Copy outer object.
const updatedEmployee = {
  ...employee,

  // Step 2:
  // Copy nested address.
  address: {
    ...employee.address,

    // Step 3:
    // Change only city.
    city: "Bangalore",
  },
};

// Step 4:
console.log(
  employee.address.city
); // Output: Hyderabad

console.log(
  updatedEmployee.address.city
); // Output: Bangalore
```

Output:

```text
Hyderabad
Bangalore
```

---

# PART 2 — 10 API / DATA TRANSFORMATION PROBLEMS 🔥🔥🔥

# 21. Extract Active Employees From API Response

```js
const response = {
  success: true,
  data: [
    {
      id: 1,
      name: "Rahul",
      active: true,
    },
    {
      id: 2,
      name: "Amit",
      active: false,
    },
  ],
};

// Step 1:
// Read data array.
const employees =
  response.data;

// Step 2:
// Keep active employees.
const activeEmployees =
  employees.filter(
    ({ active }) =>
      active
  );

// Step 3:
console.log(
  activeEmployees.map(
    ({ name }) =>
      name
  )
); // Output: ["Rahul"]
```

Output:

```text
["Rahul"]
```

---

# 22. Convert API Records to Dropdown Options

Requirement:

```text
{id, name}
↓
{value, label}
```

Code:

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

// Step 1:
const options =
  employees.map(
    ({
      id,
      name,
    }) => ({
      value: id,
      label: name,
    })
  );

// Step 2:
console.log(
  options
);
// Output:
// [
//   { value: 101, label: "Rahul" },
//   { value: 102, label: "Amit" }
// ]
```

Output:

```text
[
  { value: 101, label: "Rahul" },
  { value: 102, label: "Amit" }
]
```

---

# 23. Normalize Missing API Fields

```js
const apiUsers = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: null,
  },
];

// Step 1:
const normalized =
  apiUsers.map(
    (user) => ({
      ...user,

      // Step 2:
      // Replace null/undefined name.
      name:
        user.name
        ??
        "Unknown",
    })
  );

// Step 3:
console.log(
  normalized.map(
    ({ name }) =>
      name
  )
); // Output: ["Rahul", "Unknown"]
```

Output:

```text
["Rahul", "Unknown"]
```

---

# 24. Sort API Records by Created Date

```js
const records = [
  {
    id: 1,
    createdAt:
      "2026-08-20T10:00:00Z",
  },
  {
    id: 2,
    createdAt:
      "2026-08-25T10:00:00Z",
  },
];

// Step 1:
// Sort newest first.
const sorted =
  records.toSorted(
    (
      a,
      b
    ) =>
      new Date(
        b.createdAt
      ).getTime()
      -
      new Date(
        a.createdAt
      ).getTime()
  );

// Step 2:
console.log(
  sorted.map(
    ({ id }) =>
      id
  )
); // Output: [2, 1]
```

Output:

```text
[2, 1]
```

---

# 25. Get Latest API Record

```js
const records = [
  {
    id: 1,
    createdAt:
      "2026-08-20T10:00:00Z",
  },
  {
    id: 2,
    createdAt:
      "2026-08-25T10:00:00Z",
  },
];

// Step 1:
const latest =
  records.reduce(
    (
      currentLatest,
      record
    ) => {
      // Step 2:
      const latestTime =
        new Date(
          currentLatest.createdAt
        ).getTime();

      // Step 3:
      const currentTime =
        new Date(
          record.createdAt
        ).getTime();

      // Step 4:
      return (
        currentTime
        >
        latestTime
      )
        ?
        record
        :
        currentLatest;
    }
  );

// Step 5:
console.log(
  latest.id
); // Output: 2
```

Output:

```text
2
```

---

# 26. Flatten Nested Skills From API

```js
const employees = [
  {
    name: "Rahul",
    skills: [
      "React",
      "Node",
    ],
  },
  {
    name: "Amit",
    skills: [
      "React",
      "JavaScript",
    ],
  },
];

// Step 1:
// Extract all skill arrays
// and flatten.
const allSkills =
  employees.flatMap(
    ({ skills }) =>
      skills
  );

// Step 2:
// Remove duplicates.
const uniqueSkills =
  [
    ...new Set(
      allSkills
    ),
  ];

// Step 3:
console.log(
  uniqueSkills
);
// Output:
// ["React", "Node", "JavaScript"]
```

Output:

```text
["React", "Node", "JavaScript"]
```

---

# 27. Build Department Summary

```js
const employees = [
  {
    department: "IT",
    salary: 50000,
  },
  {
    department: "IT",
    salary: 70000,
  },
  {
    department: "HR",
    salary: 40000,
  },
];

// Step 1:
const summary =
  employees.reduce(
    (
      acc,
      employee
    ) => {
      // Step 2:
      const department =
        employee.department;

      // Step 3:
      if (
        !acc[
          department
        ]
      ) {
        acc[
          department
        ] = {
          count: 0,
          totalSalary: 0,
        };
      }

      // Step 4:
      acc[
        department
      ].count++;

      // Step 5:
      acc[
        department
      ].totalSalary +=
        employee.salary;

      // Step 6:
      return acc;
    },
    {}
  );

// Step 7:
console.log(
  summary.IT
);
// Output:
// { count: 2, totalSalary: 120000 }
```

Output:

```text
{ count: 2, totalSalary: 120000 }
```

---

# 28. Clean API Filters Before Request

```js
const filters = {
  search: "rahul",
  department: "",
  page: 1,
  status: null,
};

// Step 1:
// Convert object to entries.
const entries =
  Object.entries(
    filters
  );

// Step 2:
// Remove empty values.
const cleanedEntries =
  entries.filter(
    (
      [
        ,
        value,
      ]
    ) =>
      value !== ""
      &&
      value !== null
      &&
      value !== undefined
  );

// Step 3:
// Convert back to object.
const cleanedFilters =
  Object.fromEntries(
    cleanedEntries
  );

// Step 4:
console.log(
  cleanedFilters
);
// Output:
// { search: "rahul", page: 1 }
```

Output:

```text
{ search: "rahul", page: 1 }
```

---

# 29. Paginate API Data

```js
const items = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
];

const page =
  2;

const pageSize =
  3;

// Step 1:
// Calculate start index.
const start =
  (
    page - 1
  )
  *
  pageSize;

// Step 2:
// Calculate end index.
const end =
  start
  +
  pageSize;

// Step 3:
// Slice current page.
const pageItems =
  items.slice(
    start,
    end
  );

// Step 4:
console.log(
  pageItems
); // Output: [4, 5, 6]
```

Output:

```text
[4, 5, 6]
```

---

# 30. Convert JSON API Text Safely

```js
function parseResponse(
  json
) {
  try {
    // Step 1:
    const data =
      JSON.parse(
        json
      );

    // Step 2:
    return data;
  } catch (
    error
  ) {
    // Step 3:
    return {
      success: false,
      data: [],
    };
  }
}

// Step 4:
console.log(
  parseResponse(
    '{"success":true,"data":[1,2]}'
  ).data
); // Output: [1, 2]

// Step 5:
console.log(
  parseResponse(
    "{bad}"
  ).data
); // Output: []
```

Output:

```text
[1, 2]
[]
```

---

# PART 3 — 10 OUTPUT PREDICTION QUESTIONS 🔥🔥🔥

# 31. `map()` Output

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1:
const result =
  numbers.map(
    (number) =>
      number * 2
  );

// Step 2:
console.log(
  result
);
```

Expected output:

```text
[2, 4, 6]
```

Why?

```text
1 → 2
2 → 4
3 → 6
```

---

# 32. `filter()` Output

```js
const numbers = [
  1,
  2,
  3,
  4,
];

// Step 1:
const result =
  numbers.filter(
    (number) =>
      number % 2 === 0
  );

// Step 2:
console.log(
  result
);
```

Expected output:

```text
[2, 4]
```

---

# 33. `reduce()` Output

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1:
const total =
  numbers.reduce(
    (
      sum,
      number
    ) =>
      sum + number,
    0
  );

// Step 2:
console.log(
  total
);
```

Expected output:

```text
6
```

Trace:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
```

---

# 34. `Set` Output

```js
const values =
  new Set(
    [
      1,
      1,
      2,
      2,
      3,
    ]
  );

// Step 1:
console.log(
  [
    ...values,
  ]
);
```

Expected output:

```text
[1, 2, 3]
```

---

# 35. Map Key Difference

```js
const map =
  new Map();

// Step 1:
map.set(
  1,
  "number"
);

// Step 2:
map.set(
  "1",
  "string"
);

// Step 3:
console.log(
  map.size
);

// Step 4:
console.log(
  map.get(
    1
  )
);
```

Expected output:

```text
2
number
```

Why?

```text
1
and
"1"

are different Map keys.
```

---

# 36. Object Reference Output

```js
const first = {
  id: 1,
};

const second = {
  id: 1,
};

// Step 1:
console.log(
  first === second
);
```

Expected output:

```text
false
```

Why?

```text
same content
but different object references
```

---

# 37. JSON Output

```js
const user = {
  name: "Rahul",
  age: undefined,
};

// Step 1:
console.log(
  JSON.stringify(
    user
  )
);
```

Expected output:

```text
{"name":"Rahul"}
```

Why?

```text
undefined object property
is omitted by JSON.stringify()
```

---

# 38. Date Output Concept

```js
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 1:
console.log(
  date.toISOString()
);
```

Expected output:

```text
2026-08-24T10:30:00.000Z
```

---

# 39. Regex Output

```js
const pattern =
  /^\d{3}$/;

// Step 1:
console.log(
  pattern.test(
    "123"
  )
);

// Step 2:
console.log(
  pattern.test(
    "1234"
  )
);
```

Expected output:

```text
true
false
```

---

# 40. `try-catch-finally` Output

```js
try {
  // Step 1:
  console.log(
    "A"
  );

  // Step 2:
  throw new Error(
    "Fail"
  );
} catch (
  error
) {
  // Step 3:
  console.log(
    "B"
  );
} finally {
  // Step 4:
  console.log(
    "C"
  );
}
```

Expected output:

```text
A
B
C
```

---

# PART 4 — 8 DEBUGGING PROBLEMS 🔥🔥🔥

# 41. Fix Numeric Sorting

Wrong:

```js
const numbers = [
  10,
  2,
  30,
];

console.log(
  numbers.toSorted()
);
```

Problem:

```text
Default sort compares values like strings.
```

Correct:

```js
const numbers = [
  10,
  2,
  30,
];

// Step 1:
// Numeric ascending comparator.
const result =
  numbers.toSorted(
    (
      a,
      b
    ) =>
      a - b
  );

// Step 2:
console.log(
  result
); // Output: [2, 10, 30]
```

Output:

```text
[2, 10, 30]
```

---

# 42. Fix `map()` Missing Return

Wrong:

```js
const result =
  [
    1,
    2,
    3,
  ].map(
    (number) => {
      number * 2;
    }
  );
```

Problem:

```text
Block-body arrow function
needs explicit return.
```

Correct:

```js
const result =
  [
    1,
    2,
    3,
  ].map(
    (number) => {
      // Step 1:
      return (
        number * 2
      );
    }
  );

// Step 2:
console.log(
  result
); // Output: [2, 4, 6]
```

Output:

```text
[2, 4, 6]
```

---

# 43. Fix `filter()` Condition

Wrong:

```js
const result =
  [
    1,
    2,
    3,
  ].filter(
    (number) =>
      number = 2
  );
```

Problem:

```text
=
is assignment

===
is comparison
```

Correct:

```js
const result =
  [
    1,
    2,
    3,
  ].filter(
    (number) =>
      number === 2
  );

// Step 1:
console.log(
  result
); // Output: [2]
```

Output:

```text
[2]
```

---

# 44. Fix Object Mutation

Wrong:

```js
const employee = {
  name: "Rahul",
};

const updated =
  employee;

updated.name =
  "Amit";
```

Problem:

```text
updated and employee
point to same object.
```

Correct:

```js
const employee = {
  name: "Rahul",
};

// Step 1:
// Create new object.
const updated = {
  ...employee,

  // Step 2:
  name: "Amit",
};

// Step 3:
console.log(
  employee.name
); // Output: Rahul

console.log(
  updated.name
); // Output: Amit
```

Output:

```text
Rahul
Amit
```

---

# 45. Fix Date Mutation

Wrong:

```js
function addOneDay(
  date
) {
  date.setDate(
    date.getDate() + 1
  );

  return date;
}
```

Problem:

```text
Original Date object is mutated.
```

Correct:

```js
function addOneDay(
  date
) {
  // Step 1:
  // Clone date.
  const copy =
    new Date(
      date.getTime()
    );

  // Step 2:
  // Update cloned date.
  copy.setDate(
    copy.getDate() + 1
  );

  // Step 3:
  return copy;
}

const original =
  new Date(
    2026,
    7,
    30
  );

// Step 4:
const next =
  addOneDay(
    original
  );

console.log(
  original.getDate()
); // Output: 30

console.log(
  next.getDate()
); // Output: 31
```

Output:

```text
30
31
```

---

# 46. Fix Regex Validation

Wrong:

```js
const pattern =
  /\d+/;

console.log(
  pattern.test(
    "ABC123"
  )
);
```

Problem:

```text
Pattern only checks
whether digits exist somewhere.
```

Correct:

```js
// Step 1:
// Entire string must be digits.
const pattern =
  /^\d+$/;

// Step 2:
console.log(
  pattern.test(
    "ABC123"
  )
); // Output: false
```

Output:

```text
false
```

---

# 47. Fix Map Access

Wrong:

```js
const map =
  new Map();

map.set(
  "name",
  "Rahul"
);

console.log(
  map["name"]
);
```

Problem:

```text
Map data is accessed using get(),
not bracket notation.
```

Correct:

```js
const map =
  new Map();

map.set(
  "name",
  "Rahul"
);

// Step 1:
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

# 48. Fix JSON Parse Crash

Wrong:

```js
const data =
  JSON.parse(
    userInput
  );
```

Problem:

```text
Invalid user JSON can throw.
```

Correct:

```js
function safeParse(
  userInput
) {
  try {
    // Step 1:
    return JSON.parse(
      userInput
    );
  } catch (
    error
  ) {
    // Step 2:
    return null;
  }
}

// Step 3:
console.log(
  safeParse(
    "{bad}"
  )
); // Output: null
```

Output:

```text
null
```

---

# PART 5 — 6 REFACTORING PROBLEMS 🔥🔥🔥

# 49. Refactor Repeated Lowercase Logic

Before:

```js
const result =
  employees.filter(
    (employee) =>
      employee.name
        .toLowerCase()
        .includes(
          query
            .toLowerCase()
        )
  );
```

Better:

```js
// Step 1:
// Normalize query once.
const normalizedQuery =
  query
    .trim()
    .toLowerCase();

// Step 2:
// Reuse normalized query.
const result =
  employees.filter(
    ({ name }) =>
      name
        .toLowerCase()
        .includes(
          normalizedQuery
        )
  );
```

Why better?

```text
less repeated work
clearer intention
easier to read
```

---

# 50. Refactor Nested `if`

Before:

```js
function saveUser(
  user
) {
  if (
    user
  ) {
    if (
      user.name
    ) {
      return "saved";
    }
  }

  return "invalid";
}
```

Better with guard clause:

```js
function saveUser(
  user
) {
  // Step 1:
  // Stop early if invalid.
  if (
    !user
    ||
    !user.name
  ) {
    return "invalid";
  }

  // Step 2:
  return "saved";
}

console.log(
  saveUser(
    {
      name: "Rahul",
    }
  )
); // Output: saved
```

Output:

```text
saved
```

---

# 51. Refactor Repeated Property Access

Before:

```js
const city =
  employee
    &&
    employee.address
    &&
    employee.address.city;
```

Better:

```js
// Step 1:
// Optional chaining safely
// accesses nested value.
const city =
  employee
    ?.address
    ?.city;

// Step 2:
console.log(
  city
);
```

Why better?

```text
shorter
clearer
safer
```

---

# 52. Refactor Manual Array Loop to `map()`

Before:

```js
const names =
  [];

for (
  const employee
  of employees
) {
  names.push(
    employee.name
  );
}
```

Better:

```js
// Step 1:
// Transform employee array
// into name array.
const names =
  employees.map(
    ({ name }) =>
      name
  );
```

Why?

```text
map clearly says:
transform every item
```

---

# 53. Refactor Manual Search to `find()`

Before:

```js
let found =
  null;

for (
  const employee
  of employees
) {
  if (
    employee.id
    ===
    101
  ) {
    found =
      employee;

    break;
  }
}
```

Better:

```js
// Step 1:
const found =
  employees.find(
    ({ id }) =>
      id === 101
  );
```

Why?

```text
find()
expresses the exact intent
```

---

# 54. Refactor Manual Unique Logic to `Set`

Before:

```js
const unique =
  [];

for (
  const item
  of items
) {
  if (
    !unique.includes(
      item
    )
  ) {
    unique.push(
      item
    );
  }
}
```

Better:

```js
// Step 1:
const unique =
  [
    ...new Set(
      items
    ),
  ];
```

Why?

```text
short
clear
built for uniqueness
```

---

# PART 6 — 6 MACHINE-CODING UTILITIES 🔥🔥🔥

# 55. Toggle Selection Utility

Problem:

```text
If ID exists → remove it.
If ID does not exist → add it.
```

Code:

```js
function toggleSelection(
  selectedIds,
  id
) {
  // Step 1:
  // Clone Set.
  const next =
    new Set(
      selectedIds
    );

  // Step 2:
  // Toggle ID.
  if (
    next.has(
      id
    )
  ) {
    next.delete(
      id
    );
  } else {
    next.add(
      id
    );
  }

  // Step 3:
  return next;
}

const selected =
  new Set(
    [
      1,
      2,
    ]
  );

// Step 4:
const next =
  toggleSelection(
    selected,
    2
  );

// Step 5:
console.log(
  [
    ...next,
  ]
); // Output: [1]
```

Output:

```text
[1]
```

---

# 56. Debounced Search Input Preparation — Core Version

Full debounce comes later in Advanced JS.

Here we prepare the reusable search function.

```js
function searchEmployees(
  employees,
  query
) {
  // Step 1:
  const normalizedQuery =
    query
      .trim()
      .toLowerCase();

  // Step 2:
  if (
    normalizedQuery
    ===
    ""
  ) {
    return employees;
  }

  // Step 3:
  return employees.filter(
    ({ name }) =>
      name
        .toLowerCase()
        .includes(
          normalizedQuery
        )
  );
}
```

Machine-coding flow:

```text
input
↓
normalize
↓
empty?
├── yes → all items
└── no  → filter
```

---

# 57. Pagination Utility

```js
function paginate(
  items,
  page,
  pageSize
) {
  // Step 1:
  const start =
    (
      page - 1
    )
    *
    pageSize;

  // Step 2:
  const end =
    start
    +
    pageSize;

  // Step 3:
  return items.slice(
    start,
    end
  );
}

// Step 4:
console.log(
  paginate(
    [
      1,
      2,
      3,
      4,
      5,
      6,
    ],
    2,
    2
  )
); // Output: [3, 4]
```

Output:

```text
[3, 4]
```

---

# 58. Sort Utility

```js
function sortEmployeesBySalary(
  employees,
  direction =
    "asc"
) {
  // Step 1:
  return employees.toSorted(
    (
      a,
      b
    ) => {
      // Step 2:
      if (
        direction
        ===
        "asc"
      ) {
        return (
          a.salary
          -
          b.salary
        );
      }

      // Step 3:
      return (
        b.salary
        -
        a.salary
      );
    }
  );
}

const employees = [
  {
    name: "Rahul",
    salary: 70000,
  },
  {
    name: "Amit",
    salary: 50000,
  },
];

// Step 4:
console.log(
  sortEmployeesBySalary(
    employees,
    "asc"
  ).map(
    ({ name }) =>
      name
  )
); // Output: ["Amit", "Rahul"]
```

Output:

```text
["Amit", "Rahul"]
```

---

# 59. Filter + Sort + Paginate Pipeline 🔥🔥🔥

This is a very common machine-coding flow.

```js
function getVisibleEmployees(
  employees,
  {
    query,
    page,
    pageSize,
  }
) {
  // Step 1:
  // Normalize query.
  const normalizedQuery =
    query
      .trim()
      .toLowerCase();

  // Step 2:
  // Filter.
  const filtered =
    employees.filter(
      ({ name }) =>
        name
          .toLowerCase()
          .includes(
            normalizedQuery
          )
    );

  // Step 3:
  // Sort by name.
  const sorted =
    filtered.toSorted(
      (
        a,
        b
      ) =>
        a.name.localeCompare(
          b.name
        )
    );

  // Step 4:
  // Calculate pagination start.
  const start =
    (
      page - 1
    )
    *
    pageSize;

  // Step 5:
  // Return current page.
  return sorted.slice(
    start,
    start + pageSize
  );
}

const employees = [
  {
    name: "Rahul",
  },
  {
    name: "Ravi",
  },
  {
    name: "Amit",
  },
  {
    name: "Raj",
  },
];

// Step 6:
console.log(
  getVisibleEmployees(
    employees,
    {
      query: "ra",
      page: 1,
      pageSize: 2,
    }
  ).map(
    ({ name }) =>
      name
  )
);
// Output:
// ["Rahul", "Raj"]
```

Output:

```text
["Rahul", "Raj"]
```

Flow:

```text
raw data
↓
filter
↓
sort
↓
paginate
↓
visible UI data
```

---

# 60. Final Mixed Utility — Normalize API Employees 🔥🔥🔥

Requirement:

```text
API may contain:
missing names
duplicate IDs
unsorted dates

Need:
1. remove duplicate IDs
2. normalize missing name
3. sort newest first
```

Code:

```js
function normalizeEmployees(
  employees
) {
  // Step 1:
  // Track IDs already used.
  const seenIds =
    new Set();

  // Step 2:
  // Remove duplicates.
  const uniqueEmployees =
    employees.filter(
      ({ id }) => {
        if (
          seenIds.has(
            id
          )
        ) {
          return false;
        }

        seenIds.add(
          id
        );

        return true;
      }
    );

  // Step 3:
  // Normalize missing names.
  const normalized =
    uniqueEmployees.map(
      (employee) => ({
        ...employee,

        name:
          employee.name
          ??
          "Unknown",
      })
    );

  // Step 4:
  // Sort newest first.
  const sorted =
    normalized.toSorted(
      (
        a,
        b
      ) =>
        new Date(
          b.createdAt
        ).getTime()
        -
        new Date(
          a.createdAt
        ).getTime()
    );

  // Step 5:
  return sorted;
}

const employees = [
  {
    id: 1,
    name: "Rahul",
    createdAt:
      "2026-08-20T10:00:00Z",
  },
  {
    id: 2,
    name: null,
    createdAt:
      "2026-08-25T10:00:00Z",
  },
  {
    id: 1,
    name: "Duplicate Rahul",
    createdAt:
      "2026-08-30T10:00:00Z",
  },
];

// Step 6:
const result =
  normalizeEmployees(
    employees
  );

// Step 7:
console.log(
  result.map(
    ({
      id,
      name,
    }) => ({
      id,
      name,
    })
  )
);
// Output:
// [
//   { id: 2, name: "Unknown" },
//   { id: 1, name: "Rahul" }
// ]
```

Output:

```text
[
  { id: 2, name: "Unknown" },
  { id: 1, name: "Rahul" }
]
```

Complete flow:

```text
API records
↓
remove duplicate IDs
↓
normalize missing values
↓
sort by date
↓
clean UI-ready data
```

---

# FINAL CORE MEMORY MAP 🧠🔥🔥🔥

When you see a coding problem, first identify the pattern.

```text
Need transform every item?
→ map()

Need keep matching items?
→ filter()

Need combine to one value/object?
→ reduce()

Need one matching item?
→ find()

Need yes/no?
→ some() / every()

Need unique values?
→ Set

Need key-value lookup?
→ Map / Object

Need frequency?
→ Object / Map

Need group records?
→ reduce()

Need sort?
→ toSorted()

Need search string?
→ includes() / Regex

Need copy array/object?
→ spread

Need nested safe access?
→ optional chaining

Need fallback?
→ ??

Need parse JSON?
→ JSON.parse()

Need send JSON?
→ JSON.stringify()

Need compare dates?
→ getTime()

Need handle risky code?
→ try/catch

Need create error?
→ throw new Error()

Need cleanup?
→ finally
```

---

# FINAL MACHINE-CODING FLOW 🔥🔥🔥

A very common frontend machine-coding pipeline is:

```text
API DATA
↓
normalize
↓
filter
↓
search
↓
sort
↓
paginate
↓
transform
↓
render
```

Example mental model:

```text
employees
↓ filter(active)
↓ search(name)
↓ sort(salary/date/name)
↓ paginate(page)
↓ map(UI shape)
↓ display
```

---

# ✅ 6.20 Core Practical Complete

We completed the locked:

```text
20 Coding Problems
10 API / Data Transformation Problems
10 Output Prediction Questions
8 Debugging Problems
6 Refactoring Problems
6 Machine-Coding Utilities

Total = 60 Questions ✅
```

# ✅ SECTION 6 — JAVASCRIPT CORE COMPLETE 🔥🔥🔥

Completed:

```text
6.1 Variables
6.2 Data Types
6.3 Type Conversion / Coercion
6.4 Operators
6.5 Conditions
6.6 Loops
6.7 Functions
6.8 Arrays
6.9 Objects
6.10 Destructuring
6.11 Spread / Rest
6.12 Strings
6.13 Dates
6.14 Sets
6.15 Maps
6.16 JSON
6.17 Modules
6.18 Regex
6.19 Error Handling
6.20 Core Practical
```

Next section:

```text
SECTION 7 — JAVASCRIPT INTERNALS 🔥🔥🔥
```

First topic:

```text
7.1 JavaScript Execution Model
+
Execution Context
+
Call Stack
```

**Next: 7.1 JavaScript Execution Model 🔥🔥🔥**
