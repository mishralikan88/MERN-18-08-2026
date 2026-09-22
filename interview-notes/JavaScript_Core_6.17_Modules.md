# 6.17 Modules 🔥🔥🔥

JavaScript Modules let us split a large application into **small reusable files**.

Easy mental model:

```text
one huge file
↓ split
many small files
↓ import/export
one application
```

The most important flow is:

```text
File A
↓ export
makes value available

File B
↓ import
uses that value
```

---

# 1. What Is a JavaScript Module?

A module is simply a JavaScript file that can:

```text
export values
import values
```

Example:

```js
// math.js

// Step 1: Create a function.
function add(
  a,
  b
) {
  return (
    a + b
  );
}

// Step 2: Export it.
export {
  add,
};
```

Then another file can use it:

```js
// app.js

// Step 1: Import add().
import {
  add,
} from "./math.js";

// Step 2: Call imported function.
console.log(
  add(
    2,
    3
  )
); // Output: 5
```

Output:

```text
5
```

---

# 2. Why Do We Need Modules?

Without modules:

```text
one giant file
→ difficult to maintain
→ difficult to reuse
→ difficult to test
→ naming conflicts
```

With modules:

```text
api.js
utils.js
validation.js
employee.js
constants.js
```

Each file has one clear responsibility.

---

# 3. Basic Module Flow 🔥🔥🔥

```text
math.js
↓ export add()

app.js
↓ import add()
↓ call add()
```

Example:

```js
// math.js

// Step 1: Create value.
const PI =
  3.14;

// Step 2: Export value.
export {
  PI,
};
```

```js
// app.js

// Step 1: Import PI.
import {
  PI,
} from "./math.js";

// Step 2: Use imported value.
console.log(
  PI
); // Output: 3.14
```

Output:

```text
3.14
```

---

# 4. Named Export 🔥🔥🔥

A named export exports a value using its own name.

```js
// math.js

// Step 1: Create function.
function add(
  a,
  b
) {
  return (
    a + b
  );
}

// Step 2: Export by name.
export {
  add,
};
```

Import it using the same name:

```js
// app.js

// Step 1: Import using exact exported name.
import {
  add,
} from "./math.js";

// Step 2: Use it.
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

---

# 5. Export During Declaration

Instead of exporting later:

```js
// math.js

// Step 1: Declare and export immediately.
export function add(
  a,
  b
) {
  return (
    a + b
  );
}
```

Usage:

```js
// app.js

// Step 1: Import named export.
import {
  add,
} from "./math.js";

// Step 2: Call it.
console.log(
  add(
    5,
    6
  )
); // Output: 11
```

Output:

```text
11
```

---

# 6. Named Export of Variables

```js
// constants.js

// Step 1: Export variables directly.
export const API_URL =
  "/api";

export const PAGE_SIZE =
  20;
```

Usage:

```js
// app.js

// Step 1: Import both named exports.
import {
  API_URL,
  PAGE_SIZE,
} from "./constants.js";

// Step 2: Print values.
console.log(
  API_URL
); // Output: /api

console.log(
  PAGE_SIZE
); // Output: 20
```

Output:

```text
/api
20
```

---

# 7. Multiple Named Exports 🔥🔥🔥

A module can have many named exports.

```js
// math.js

// Step 1: Create functions.
function add(
  a,
  b
) {
  return a + b;
}

function subtract(
  a,
  b
) {
  return a - b;
}

// Step 2: Export both.
export {
  add,
  subtract,
};
```

Usage:

```js
// app.js

// Step 1: Import both names.
import {
  add,
  subtract,
} from "./math.js";

// Step 2: Use them.
console.log(
  add(
    8,
    2
  )
); // Output: 10

console.log(
  subtract(
    8,
    2
  )
); // Output: 6
```

Output:

```text
10
6
```

---

# 8. Import Only What You Need

Even if a module exports many values, we can import only one.

```js
// math.js

export function add(
  a,
  b
) {
  return a + b;
}

export function subtract(
  a,
  b
) {
  return a - b;
}
```

```js
// app.js

// Step 1: Import only add().
import {
  add,
} from "./math.js";

// Step 2: Use add().
console.log(
  add(
    1,
    2
  )
); // Output: 3
```

Output:

```text
3
```

---

# 9. Named Import Must Match Exported Name 🔥🔥🔥

If module exports:

```js
export const PAGE_SIZE =
  20;
```

Correct:

```js
// Step 1: Use exact export name.
import {
  PAGE_SIZE,
} from "./constants.js";
```

Wrong:

```js
// Wrong:
// There is no named export called pageSize.
import {
  pageSize,
} from "./constants.js";
```

### Easy Explanation

Named imports are name-based.

---

# 10. Import Alias 🔥🔥🔥

We can rename a named import using `as`.

```js
// constants.js

export const PAGE_SIZE =
  20;
```

```js
// app.js

// Step 1: Import PAGE_SIZE.
// Step 2: Rename it locally to limit.
import {
  PAGE_SIZE
    as limit,
} from "./constants.js";

// Step 3: Use local name.
console.log(
  limit
); // Output: 20
```

Output:

```text
20
```

Flow:

```text
exported name
PAGE_SIZE
↓ as
local name
limit
```

---

# 11. Why Use Import Alias?

Useful when two modules export the same name.

Example:

```js
// employee.js
export const status =
  "employee-active";
```

```js
// order.js
export const status =
  "order-shipped";
```

```js
// app.js

// Step 1: Rename each import locally.
import {
  status
    as employeeStatus,
} from "./employee.js";

import {
  status
    as orderStatus,
} from "./order.js";

// Step 2: Use both safely.
console.log(
  employeeStatus
); // Output: employee-active

console.log(
  orderStatus
); // Output: order-shipped
```

Output:

```text
employee-active
order-shipped
```

---

# 12. Export Alias

We can also rename during export.

```js
// math.js

function add(
  a,
  b
) {
  return a + b;
}

// Step 1: Export add under a different name.
export {
  add
    as sum,
};
```

Usage:

```js
// app.js

// Step 1: Import exported name sum.
import {
  sum,
} from "./math.js";

// Step 2: Call it.
console.log(
  sum(
    4,
    5
  )
); // Output: 9
```

Output:

```text
9
```

---

# 13. Default Export 🔥🔥🔥

A module can have one default export.

```js
// logger.js

// Step 1: Create function.
function logger(
  message
) {
  return (
    `LOG: ${message}`
  );
}

// Step 2: Export as default.
export default logger;
```

Import:

```js
// app.js

// Step 1: Import default export.
import logger
  from "./logger.js";

// Step 2: Use it.
console.log(
  logger(
    "Saved"
  )
); // Output: LOG: Saved
```

Output:

```text
LOG: Saved
```

---

# 14. Default Export During Declaration

```js
// logger.js

// Step 1: Declare and default-export function directly.
export default function logger(
  message
) {
  return (
    `LOG: ${message}`
  );
}
```

Usage:

```js
// app.js

import logger
  from "./logger.js";

console.log(
  logger(
    "Done"
  )
); // Output: LOG: Done
```

Output:

```text
LOG: Done
```

---

# 15. Default Import Name Can Be Different 🔥🔥🔥

With default export, importer chooses the local name.

```js
// logger.js

export default function logger(
  message
) {
  return message;
}
```

```js
// app.js

// Step 1: Default import can use another local name.
import printMessage
  from "./logger.js";

// Step 2: Call using local name.
console.log(
  printMessage(
    "Hello"
  )
); // Output: Hello
```

Output:

```text
Hello
```

### Important

Default import is not name-matched like named imports.

---

# 16. Only One Default Export Per Module 🔥🔥🔥

Correct:

```js
// utils.js

function format() {
}

export default format;
```

Invalid concept:

```text
one file
→ two default exports
→ not allowed
```

Memory:

```text
Named exports
→ many allowed

Default export
→ only one
```

---

# 17. Named vs Default Export 🔥🔥🔥

Named:

```js
export const PAGE_SIZE =
  20;
```

Import:

```js
import {
  PAGE_SIZE,
} from "./constants.js";
```

Default:

```js
export default function logger() {
}
```

Import:

```js
import logger
  from "./logger.js";
```

### Easy Memory

```text
named
→ curly braces

default
→ no curly braces
```

---

# 18. Named Import Uses Curly Braces

```js
// constants.js
export const MAX_RETRY =
  3;
```

```js
// app.js

// Step 1: Named import uses {}.
import {
  MAX_RETRY,
} from "./constants.js";

console.log(
  MAX_RETRY
); // Output: 3
```

Output:

```text
3
```

---

# 19. Default Import Does Not Use Curly Braces

```js
// formatter.js

export default function format(
  value
) {
  return value.toUpperCase();
}
```

```js
// app.js

// Step 1: Default import has no {}.
import format
  from "./formatter.js";

console.log(
  format(
    "hello"
  )
); // Output: HELLO
```

Output:

```text
HELLO
```

---

# 20. Mixing Default and Named Exports 🔥🔥🔥

A file can have:

```text
one default export
+
many named exports
```

Example:

```js
// employee.js

// Step 1: Named export.
export const ROLE =
  "Developer";

// Step 2: Named export.
export const ACTIVE =
  true;

// Step 3: Default export.
export default function getEmployee() {
  return {
    id: 101,
    name: "Rahul",
  };
}
```

Import all:

```js
// app.js

// Step 1: Default import comes first.
// Step 2: Named imports go inside {}.
import getEmployee, {
  ROLE,
  ACTIVE,
} from "./employee.js";

// Step 3: Use them.
console.log(
  getEmployee().name
); // Output: Rahul

console.log(
  ROLE
); // Output: Developer

console.log(
  ACTIVE
); // Output: true
```

Output:

```text
Rahul
Developer
true
```

---

# 21. Import Everything as Namespace 🔥🔥

Syntax:

```js
import * as name
  from "./module.js";
```

Example:

```js
// math.js

export const PI =
  3.14;

export function add(
  a,
  b
) {
  return a + b;
}
```

```js
// app.js

// Step 1: Import whole module as math.
import * as math
  from "./math.js";

// Step 2: Access exports as properties.
console.log(
  math.PI
); // Output: 3.14

console.log(
  math.add(
    2,
    3
  )
); // Output: 5
```

Output:

```text
3.14
5
```

---

# 22. When Namespace Import Is Useful

Useful when:

```text
module exports many related utilities
you want one namespace
you want clear grouping
```

Example mental model:

```text
math.add()
math.subtract()
math.PI
```

Instead of many separate local names.

---

# 23. Re-Export Named Values — Awareness 🔥🔥

Suppose:

```text
math.js
string.js
```

and you want one central file:

```js
// index.js

// Step 1: Re-export named value from math.js.
export {
  add,
} from "./math.js";

// Step 2: Re-export named value from string.js.
export {
  capitalize,
} from "./string.js";
```

Then:

```js
// app.js

// Step 1: Import from one central file.
import {
  add,
  capitalize,
} from "./index.js";
```

This pattern is often called a barrel file.

---

# 24. `export *` — Awareness

```js
// index.js

// Step 1: Re-export all named exports.
export *
  from "./math.js";
```

Then another file can import those named exports through `index.js`.

### Important

Default exports are not re-exported by `export *` in the same way named exports are.

Low-priority awareness.

---

# 25. Module File Path 🔥🔥🔥

Relative imports commonly use:

```text
./
../
```

Example:

```js
import {
  add,
} from "./math.js";
```

Meaning:

```text
./
→ current folder
```

Example:

```js
import {
  format,
} from "../utils/format.js";
```

Meaning:

```text
../
→ parent folder
```

---

# 26. Modules Have Their Own Scope 🔥🔥🔥

Variables inside a module do not automatically become global.

```js
// user.js

// Step 1: Module-local variable.
const secret =
  "abc123";

// Step 2: Export only public value.
export const name =
  "Rahul";
```

Another module cannot import `secret` because it was not exported.

### Mental Model

```text
not exported
→ private to module

exported
→ available to importers
```

---

# 27. Import Bindings Are Read-Only 🔥🔥🔥

Suppose:

```js
// config.js
export let count =
  1;
```

In another module:

```js
// app.js

import {
  count,
} from "./config.js";

// Step 1: Read imported value.
console.log(
  count
); // Output: 1

// Step 2:
// You cannot directly reassign
// the imported binding here.
// count = 5; // Error
```

### Easy Explanation

Importer can read the binding but cannot directly replace it.

---

# 28. Imports Are Live Bindings — Awareness 🔥🔥

Module exports are connected to their source binding.

```js
// counter.js

export let count =
  0;

export function increment() {
  count++;
}
```

```js
// app.js

import {
  count,
  increment,
} from "./counter.js";

// Step 1: Initial value.
console.log(
  count
); // Output: 0

// Step 2: Update inside source module.
increment();

// Step 3: Imported binding reflects new value.
console.log(
  count
); // Output: 1
```

Output:

```text
0
1
```

---

# 29. Side-Effect Import — Awareness

Sometimes a file is imported only to execute it.

```js
// setup.js

console.log(
  "Setup loaded"
); // Output: Setup loaded
```

```js
// app.js

// Step 1: Import only for execution.
import "./setup.js";
```

Output:

```text
Setup loaded
```

No imported variable is needed.

---

# 30. Browser Modules Use `type="module"` — Awareness

In plain HTML:

```html
<script
  type="module"
  src="./app.js"
></script>
```

`type="module"` tells the browser:

```text
this JavaScript file uses ES modules
```

Modern build tools often handle this automatically.

---

# 31. ES Modules vs CommonJS — Awareness 🔥🔥

Modern ES Modules:

```js
export const value =
  10;

import {
  value,
} from "./file.js";
```

CommonJS:

```js
module.exports = {
  value: 10,
};

const {
  value,
} =
  require(
    "./file"
  );
```

### Easy Memory

```text
ESM
→ import / export

CommonJS
→ require / module.exports
```

For modern frontend JavaScript, ESM is the main focus.

---

# 32. Named Export Practical — Validation Utility 🔥🔥🔥

```js
// validation.js

// Step 1: Export email validator.
export function isEmailValid(
  email
) {
  return (
    email.includes(
      "@"
    )
  );
}

// Step 2: Export required-field validator.
export function isRequired(
  value
) {
  return (
    value.trim()
    !==
    ""
  );
}
```

Usage:

```js
// form.js

// Step 1: Import required validators.
import {
  isEmailValid,
  isRequired,
} from "./validation.js";

// Step 2: Use them.
console.log(
  isEmailValid(
    "a@test.com"
  )
); // Output: true

console.log(
  isRequired(
    "Rahul"
  )
); // Output: true
```

Output:

```text
true
true
```

---

# 33. Default Export Practical — API Client 🔥🔥🔥

```js
// apiClient.js

// Step 1: Create one main API client function.
function apiClient(
  url
) {
  return (
    `GET ${url}`
  );
}

// Step 2: Default-export it.
export default apiClient;
```

Usage:

```js
// employees.js

// Step 1: Import default API client.
import apiClient
  from "./apiClient.js";

// Step 2: Call it.
console.log(
  apiClient(
    "/employees"
  )
); // Output: GET /employees
```

Output:

```text
GET /employees
```

---

# 34. Practical Folder Structure 🔥🔥🔥

A real app may look like:

```text
src/
├── api/
│   └── employeeApi.js
├── utils/
│   ├── formatDate.js
│   └── validators.js
├── constants/
│   └── config.js
├── components/
│   └── EmployeeTable.js
└── app.js
```

Modules allow these files to work together cleanly.

---

# 35. Machine Coding — Split Search Utility 🔥🔥🔥

Suppose search logic should be reusable.

```js
// search.js

// Step 1: Export reusable function.
export function searchEmployees(
  employees,
  query
) {
  // Step 2: Normalize query.
  const normalizedQuery =
    query
      .trim()
      .toLowerCase();

  // Step 3: Filter employees.
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

Usage:

```js
// app.js

import {
  searchEmployees,
} from "./search.js";

const employees = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: "Amit",
  },
];

// Step 1: Search reusable utility.
const result =
  searchEmployees(
    employees,
    "rah"
  );

// Step 2: Print names.
console.log(
  result.map(
    ({ name }) =>
      name
  )
); // Output: ["Rahul"]
```

Output:

```text
["Rahul"]
```

Complete flow:

```text
search.js
↓ export function
app.js
↓ import function
↓ reusable search
```

---

# 36. Machine Coding — Constants Module 🔥🔥

```js
// constants.js

// Step 1: Export shared constants.
export const PAGE_SIZE =
  20;

export const DEFAULT_SORT =
  "name";
```

Usage:

```js
// pagination.js

import {
  PAGE_SIZE,
} from "./constants.js";

// Step 1: Calculate total pages.
const totalItems =
  45;

const totalPages =
  Math.ceil(
    totalItems /
    PAGE_SIZE
  );

// Step 2: Print.
console.log(
  totalPages
); // Output: 3
```

Output:

```text
3
```

### Why This Helps

```text
one shared value
↓
used everywhere
↓
less duplication
```

---

# 37. Machine Coding — Formatter Module 🔥🔥

```js
// formatters.js

// Step 1: Export reusable formatter.
export function formatName(
  name
) {
  return (
    name
      .trim()
      .toUpperCase()
  );
}
```

Usage:

```js
// app.js

import {
  formatName,
} from "./formatters.js";

// Step 1: Format input.
console.log(
  formatName(
    "  rahul  "
  )
); // Output: RAHUL
```

Output:

```text
RAHUL
```

---

# 38. Dynamic `import()` — Awareness 🔥🔥

Modules can also be loaded dynamically.

```js
async function loadMath() {
  // Step 1: Load module only when needed.
  const math =
    await import(
      "./math.js"
    );

  // Step 2: Use exported function.
  console.log(
    math.add(
      2,
      3
    )
  ); // Output: 5
}
```

Output when called:

```text
5
```

### Practical Use

```text
lazy loading
code splitting
load feature only when needed
```

Detailed async behavior comes later.

---

# 39. Static Import vs Dynamic Import

Static:

```js
import {
  add,
} from "./math.js";
```

Dynamic:

```js
const math =
  await import(
    "./math.js"
  );
```

Difference:

```text
static import
→ loaded as module dependency

dynamic import
→ loaded when code reaches it
```

---

# 40. Circular Dependency — Awareness 🔥🔥

Example problem:

```text
a.js imports b.js
b.js imports a.js
```

Flow:

```text
a.js
↓ imports
b.js
↓ imports
a.js
```

This can create confusing initialization behavior.

### Practical Advice

Prefer clear dependency direction.

```text
shared.js
↑       ↑
a.js   b.js
```

instead of making `a.js` and `b.js` depend heavily on each other.

---

# 41. Tree Shaking — Awareness

Modern bundlers can sometimes remove unused module exports.

Example:

```js
// math.js

export function add(
  a,
  b
) {
  return a + b;
}

export function subtract(
  a,
  b
) {
  return a - b;
}
```

If app imports only:

```js
import {
  add,
} from "./math.js";
```

a bundler may be able to exclude unused `subtract()` from production output.

### Easy Explanation

Modules help bundlers understand dependencies.

---

# 42. Interview Output — Named Import Alias

```js
// constants.js
export const LIMIT =
  10;
```

```js
// app.js

import {
  LIMIT
    as maxItems,
} from "./constants.js";

console.log(
  maxItems
); // Output: 10
```

Output:

```text
10
```

---

# 43. Interview Question — Named vs Default Export 🔥🔥🔥

Good answer:

```text
Named export
→ many per module
→ imported with {}
→ exported name matters

Default export
→ one per module
→ imported without {}
→ importer chooses local name
```

---

# 44. Interview Question — Can One Module Have Both?

Yes.

```js
// employee.js

export const TYPE =
  "employee";

export default function getEmployee() {
  return {
    id: 1,
  };
}
```

Import:

```js
import getEmployee, {
  TYPE,
} from "./employee.js";
```

---

# 45. Interview Question — What Does `import * as` Do?

Example:

```js
import * as math
  from "./math.js";
```

Meaning:

```text
collect module's named exports
↓
namespace object
↓
math.add()
math.PI
```

---

# 46. Debugging — Missing Curly Braces 🔥🔥🔥

Suppose:

```js
// math.js
export function add() {
}
```

Wrong:

```js
// Wrong:
// add is a named export,
// but this syntax asks for default export.
import add
  from "./math.js";
```

Correct:

```js
// Step 1: Named export needs {}.
import {
  add,
} from "./math.js";
```

### Memory

```text
named
→ {}

default
→ no {}
```

---

# 47. Debugging — Extra Curly Braces Around Default Import

Suppose:

```js
// logger.js
export default function logger() {
}
```

Wrong:

```js
// Wrong:
// logger is default export.
import {
  logger,
} from "./logger.js";
```

Correct:

```js
// Step 1: Default import has no {}.
import logger
  from "./logger.js";
```

---

# 48. Debugging — Wrong Export Name

Suppose:

```js
// constants.js
export const PAGE_SIZE =
  20;
```

Wrong:

```js
// Wrong:
// pageSize was never exported.
import {
  pageSize,
} from "./constants.js";
```

Correct:

```js
// Step 1: Use exact export name.
import {
  PAGE_SIZE,
} from "./constants.js";
```

Or alias it:

```js
// Step 1: Import exact name.
// Step 2: Rename locally.
import {
  PAGE_SIZE
    as pageSize,
} from "./constants.js";
```

---

# 49. Practical Decision Guide 🔥🔥🔥

```text
Need many exports from one file?
→ named exports

Need one main export?
→ default export

Need rename named import?
→ as

Need import everything under one name?
→ import * as

Need split utilities?
→ modules

Need shared constants?
→ modules

Need reusable validators?
→ modules

Need lazy loading?
→ dynamic import()

Need central re-export file?
→ re-export / barrel file
```

---

# 50. Most Important Module Rules 🔥🔥🔥

```text
Modules split code into reusable files.

export
→ makes value available.

import
→ uses exported value.

Named exports:
→ many allowed
→ use {}
→ name must match
→ can alias with as

Default export:
→ one per module
→ no {}
→ importer chooses local name

One module can contain:
one default
+
many named exports

Modules have their own scope.

Imports are live bindings.

Relative paths:
./ current folder
../ parent folder

ES Modules:
import / export

CommonJS:
require / module.exports
```

---

# Quick Memory 🧠

Named export:

```js
// math.js

// Step 1: Export named function.
export function add(
  a,
  b
) {
  return a + b;
}
```

Named import:

```js
// app.js

// Step 1: Import with {}.
import {
  add,
} from "./math.js";

console.log(
  add(
    2,
    3
  )
); // Output: 5
```

Output:

```text
5
```

Default export:

```js
// logger.js

// Step 1: Export one default value.
export default function logger(
  message
) {
  return message;
}
```

Default import:

```js
// app.js

// Step 1: No {} for default import.
import logger
  from "./logger.js";

console.log(
  logger(
    "Done"
  )
); // Output: Done
```

Output:

```text
Done
```

Alias:

```js
import {
  PAGE_SIZE
    as limit,
} from "./constants.js";
```

Namespace import:

```js
import * as math
  from "./math.js";
```

Mixed import:

```js
import getEmployee, {
  ROLE,
  ACTIVE,
} from "./employee.js";
```

Most important interview traps:

```text
named vs default
{} vs no {}
wrong exported name
default export count
import alias
module scope
object/function not global unless exported
```

## ✅ 6.17 Modules complete

**JavaScript Core topics remaining after this: 3**

```text
6.18 Regex
6.19 Error Handling
6.20 Core Practical
```

**Next: 6.18 Regex — Practical Basics 🔥🔥🔥**
