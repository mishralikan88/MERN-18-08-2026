# 8.7 Real API Practical 🔥🔥🔥

This chapter combines everything from:

```text
Promises
async / await
fetch()
HTTP methods
response.ok
response.status
JSON
AbortController
error handling
data transformation
```

into one realistic Employee API flow.

The goal is not only:

```text
"How do I call an API?"
```

The real goal is:

```text
How do I build
clean,
safe,
interview-ready,
production-style
API code?
```

Master mental model:

```text
UI Action
↓
API Function
↓
Build URL / Request
↓
fetch()
↓
Check HTTP Status
↓
Parse Response
↓
Transform Data
↓
Return Clean Result
↓
UI Updates State
```

Error flow:

```text
Network Error
or
HTTP Error
or
Parsing Error
↓
throw Error
↓
catch
↓
show useful UI message
```

This chapter covers:

```text
GET List
GET by ID
POST
PATCH
DELETE
Search
Filtering
Sorting
Pagination
Loading State
Error State
Empty State
404 Handling
401 Handling
500 Handling
Request Helper
Custom Error
Data Transformation
Normalize API Data
AbortController
Search Cancellation
Stale Response Protection
Retry Awareness
Optimistic Update Awareness
Full CRUD Service
Full UI Flow
Debugging
Interview Questions
Machine-Coding Usage
```

---

# 1. Our Example API

We will imagine this API:

```text
GET    /employees
GET    /employees/:id
POST   /employees
PATCH  /employees/:id
DELETE /employees/:id
```

Base URL:

```js
// Step 1:
const API_URL =
  "https://api.example.com";
```

---

# 2. Example Employee Shape

```js
// Step 1:
const employee = {
  id: 1,
  name:
    "Rahul",
  department:
    "IT",
  salary:
    75000,
  active:
    true,
};
```

---

# 3. Real API Rule #1 🔥🔥🔥

Do not directly write large `fetch()` logic everywhere in UI code.

Bad mental model:

```text
Button Component
↓
20 lines fetch logic

Table Component
↓
20 lines fetch logic

Edit Modal
↓
20 lines fetch logic
```

Better:

```text
UI
↓
employeeApi
↓
shared request helper
```

---

# 4. Basic GET List 🔥🔥🔥

```js
async function getEmployees() {
  // Step 1:
  const response =
    await fetch(
      `${API_URL}/employees`
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 3:
  const employees =
    await response.json();

  // Step 4:
  return employees;
}
```

---

# 5. Using GET List

```js
async function run() {
  try {
    // Step 1:
    const employees =
      await getEmployees();

    // Step 2:
    console.log(
      employees
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );
  }
}

// Step 4:
run();
```

---

# 6. GET by ID 🔥🔥🔥

```js
async function getEmployeeById(
  id
) {
  // Step 1:
  const response =
    await fetch(
      `${API_URL}/employees/${id}`
    );

  // Step 2:
  if (
    response.status
    ===
    404
  ) {
    return null;
  }

  // Step 3:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 4:
  return await response.json();
}
```

---

# 7. Why Return `null` for 404?

Because:

```text
404 employee not found
```

may be an expected business case.

Then caller can write:

```js
async function showEmployee(
  id
) {
  // Step 1:
  const employee =
    await getEmployeeById(
      id
    );

  // Step 2:
  if (
    !employee
  ) {
    console.log(
      "Employee not found"
    );

    return;
  }

  // Step 3:
  console.log(
    employee.name
  );
}
```

---

# 8. POST — Create Employee 🔥🔥🔥

```js
async function createEmployee(
  employee
) {
  // Step 1:
  const response =
    await fetch(
      `${API_URL}/employees`,
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            employee
          ),
      }
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `Create failed: ${response.status}`
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 9. Create Employee Usage

```js
async function run() {
  try {
    // Step 1:
    const employee = {
      name:
        "Rahul",
      department:
        "IT",
      salary:
        75000,
    };

    // Step 2:
    const created =
      await createEmployee(
        employee
      );

    // Step 3:
    console.log(
      created
    );
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.message
    );
  }
}

// Step 5:
run();
```

---

# 10. PATCH — Partial Update 🔥🔥🔥

```js
async function updateEmployee(
  id,
  changes
) {
  // Step 1:
  const response =
    await fetch(
      `${API_URL}/employees/${id}`,
      {
        method:
          "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            changes
          ),
      }
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `Update failed: ${response.status}`
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 11. Update Only Department

```js
async function run() {
  // Step 1:
  const updated =
    await updateEmployee(
      1,
      {
        department:
          "Engineering",
      }
    );

  // Step 2:
  console.log(
    updated
  );
}
```

---

# 12. DELETE Employee 🔥🔥🔥

```js
async function deleteEmployee(
  id
) {
  // Step 1:
  const response =
    await fetch(
      `${API_URL}/employees/${id}`,
      {
        method:
          "DELETE",
      }
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `Delete failed: ${response.status}`
    );
  }

  // Step 3:
  return true;
}
```

---

# 13. Delete Usage

```js
async function run() {
  try {
    // Step 1:
    const success =
      await deleteEmployee(
        1
      );

    // Step 2:
    console.log(
      success
    ); // Output: true
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    );
  }
}
```

Output on successful request:

```text
true
```

---

# 14. Search API 🔥🔥🔥

Suppose API supports:

```text
GET /employees?search=rahul
```

```js
async function searchEmployees(
  search
) {
  // Step 1:
  const params =
    new URLSearchParams(
      {
        search,
      }
    );

  // Step 2:
  const response =
    await fetch(
      `${API_URL}/employees?${params}`
    );

  // Step 3:
  if (
    !response.ok
  ) {
    throw new Error(
      `Search failed: ${response.status}`
    );
  }

  // Step 4:
  return await response.json();
}
```

---

# 15. Why `URLSearchParams`?

Instead of:

```text
?search=Rahul Kumar & IT
```

which may break URL meaning,

use:

```js
// Step 1:
const params =
  new URLSearchParams(
    {
      search:
        "Rahul Kumar & IT",
    }
  );

// Step 2:
console.log(
  params.toString()
);
```

Output:

```text
search=Rahul+Kumar+%26+IT
```

---

# 16. Pagination API 🔥🔥🔥

Suppose API supports:

```text
GET /employees?page=2&limit=10
```

```js
async function getEmployeePage(
  page,
  limit
) {
  // Step 1:
  const params =
    new URLSearchParams(
      {
        page:
          String(
            page
          ),
        limit:
          String(
            limit
          ),
      }
    );

  // Step 2:
  const response =
    await fetch(
      `${API_URL}/employees?${params}`
    );

  // Step 3:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 4:
  return await response.json();
}
```

---

# 17. Typical Pagination Response

```js
// Step 1:
const response = {
  items: [
    {
      id: 11,
      name:
        "Rahul",
    },
    {
      id: 12,
      name:
        "Priya",
    },
  ],

  page:
    2,

  limit:
    10,

  total:
    42,
};
```

---

# 18. Total Pages Calculation 🔥🔥🔥

```js
function getTotalPages(
  total,
  limit
) {
  // Step 1:
  return Math.ceil(
    total
    /
    limit
  );
}

// Step 2:
console.log(
  getTotalPages(
    42,
    10
  )
); // Output: 5
```

Output:

```text
5
```

---

# 19. Search + Pagination Together 🔥🔥🔥

```js
async function getEmployees(
  {
    search = "",
    page = 1,
    limit = 10,
  } = {}
) {
  // Step 1:
  const params =
    new URLSearchParams(
      {
        search,
        page:
          String(
            page
          ),
        limit:
          String(
            limit
          ),
      }
    );

  // Step 2:
  const response =
    await fetch(
      `${API_URL}/employees?${params}`
    );

  // Step 3:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 4:
  return await response.json();
}
```

---

# 20. Add Sort Parameter

Suppose:

```text
sortBy=salary
order=desc
```

```js
async function getEmployees(
  {
    page = 1,
    limit = 10,
    sortBy =
      "name",
    order =
      "asc",
  } = {}
) {
  // Step 1:
  const params =
    new URLSearchParams(
      {
        page:
          String(
            page
          ),
        limit:
          String(
            limit
          ),
        sortBy,
        order,
      }
    );

  // Step 2:
  const response =
    await fetch(
      `${API_URL}/employees?${params}`
    );

  // Step 3:
  return response;
}
```

---

# 21. Filter Parameter

Example:

```text
department=IT
active=true
```

```js
// Step 1:
const params =
  new URLSearchParams(
    {
      department:
        "IT",
      active:
        "true",
    }
  );

// Step 2:
console.log(
  params.toString()
);
```

Output:

```text
department=IT&active=true
```

---

# 22. Real Query Builder 🔥🔥🔥

Do not send unnecessary empty values.

```js
function buildEmployeeParams(
  filters
) {
  // Step 1:
  const params =
    new URLSearchParams();

  // Step 2:
  if (
    filters.search
  ) {
    params.set(
      "search",
      filters.search
    );
  }

  // Step 3:
  if (
    filters.department
  ) {
    params.set(
      "department",
      filters.department
    );
  }

  // Step 4:
  if (
    filters.page
  ) {
    params.set(
      "page",
      String(
        filters.page
      )
    );
  }

  // Step 5:
  return params;
}
```

---

# 23. Query Builder Example

```js
// Step 1:
const params =
  buildEmployeeParams(
    {
      search:
        "Rahul",
      department:
        "IT",
      page:
        2,
    }
  );

// Step 2:
console.log(
  params.toString()
);
```

Output:

```text
search=Rahul&department=IT&page=2
```

---

# 24. Real API State 🔥🔥🔥

A UI commonly tracks:

```text
data
loading
error
```

Mental model:

```text
before request
loading = true
error = null

success
data = response
loading = false

failure
error = error
loading = false
```

---

# 25. Simple Loading State

```js
async function loadEmployees() {
  // Step 1:
  let loading =
    true;

  try {
    // Step 2:
    const employees =
      await getEmployees();

    // Step 3:
    return employees;
  } finally {
    // Step 4:
    loading =
      false;

    // Step 5:
    console.log(
      loading
    ); // Output: false
  }
}
```

---

# 26. Loading + Error State 🔥🔥🔥

```js
async function loadEmployees() {
  // Step 1:
  let loading =
    true;

  // Step 2:
  let error =
    null;

  try {
    // Step 3:
    return await getEmployees();
  } catch (
    caughtError
  ) {
    // Step 4:
    error =
      caughtError;

    // Step 5:
    throw caughtError;
  } finally {
    // Step 6:
    loading =
      false;

    // Step 7:
    console.log(
      loading,
      error
    );
  }
}
```

---

# 27. Empty State 🔥🔥🔥

Successful API response can still contain no records.

```js
function getEmployeeState(
  employees
) {
  // Step 1:
  if (
    employees.length
    ===
    0
  ) {
    return "EMPTY";
  }

  // Step 2:
  return "READY";
}

// Step 3:
console.log(
  getEmployeeState(
    []
  )
); // Output: EMPTY
```

Output:

```text
EMPTY
```

---

# 28. UI Has More Than Success/Error

Real state:

```text
IDLE
LOADING
SUCCESS
EMPTY
ERROR
```

This mental model helps machine-coding rounds.

---

# 29. Custom HTTP Error 🔥🔥🔥

```js
class HttpError
  extends Error {
  constructor(
    message,
    status,
    data = null
  ) {
    // Step 1:
    super(
      message
    );

    // Step 2:
    this.name =
      "HttpError";

    // Step 3:
    this.status =
      status;

    // Step 4:
    this.data =
      data;
  }
}
```

---

# 30. Safe JSON Parser

```js
async function safeJson(
  response
) {
  try {
    // Step 1:
    return await response.json();
  } catch (
    error
  ) {
    // Step 2:
    return null;
  }
}
```

---

# 31. Shared Request Helper 🔥🔥🔥

```js
async function requestJson(
  url,
  options = {}
) {
  // Step 1:
  const response =
    await fetch(
      url,
      options
    );

  // Step 2:
  const data =
    await safeJson(
      response
    );

  // Step 3:
  if (
    !response.ok
  ) {
    throw new HttpError(
      data?.message
      ??
      `HTTP ${response.status}`,
      response.status,
      data
    );
  }

  // Step 4:
  return data;
}
```

---

# 32. Why Shared Helper?

Without helper:

```text
check response.ok
parse JSON
throw HTTP error
```

repeated everywhere.

With helper:

```text
requestJson()
↓
one consistent rule
```

---

# 33. Employee API Service 🔥🔥🔥

```js
const employeeApi = {
  async list(
    filters = {}
  ) {
    // Step 1:
    const params =
      buildEmployeeParams(
        filters
      );

    // Step 2:
    return await requestJson(
      `${API_URL}/employees?${params}`
    );
  },

  async getById(
    id
  ) {
    // Step 3:
    return await requestJson(
      `${API_URL}/employees/${id}`
    );
  },

  async create(
    employee
  ) {
    // Step 4:
    return await requestJson(
      `${API_URL}/employees`,
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            employee
          ),
      }
    );
  },

  async update(
    id,
    changes
  ) {
    // Step 5:
    return await requestJson(
      `${API_URL}/employees/${id}`,
      {
        method:
          "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            changes
          ),
      }
    );
  },
};
```

---

# 34. Add DELETE to Service

```js
employeeApi.remove =
  async function (
    id
  ) {
    // Step 1:
    const response =
      await fetch(
        `${API_URL}/employees/${id}`,
        {
          method:
            "DELETE",
        }
      );

    // Step 2:
    if (
      !response.ok
    ) {
      throw new HttpError(
        "Delete failed",
        response.status
      );
    }

    // Step 3:
    return true;
  };
```

---

# 35. Normalize API Data 🔥🔥🔥

Server data may not match UI needs.

Example raw API:

```js
// Step 1:
const apiEmployee = {
  employee_id:
    101,
  full_name:
    "Rahul Kumar",
  dept_name:
    "IT",
  annual_salary:
    900000,
};
```

UI wants:

```js
// Step 1:
const employee = {
  id:
    101,
  name:
    "Rahul Kumar",
  department:
    "IT",
  salary:
    900000,
};
```

---

# 36. Normalize One Employee

```js
function normalizeEmployee(
  employee
) {
  // Step 1:
  return {
    id:
      employee.employee_id,

    name:
      employee.full_name,

    department:
      employee.dept_name,

    salary:
      employee.annual_salary,
  };
}
```

---

# 37. Normalize Employee List 🔥🔥🔥

```js
function normalizeEmployees(
  employees
) {
  // Step 1:
  return employees.map(
    (
      employee
    ) => {
      return normalizeEmployee(
        employee
      );
    }
  );
}
```

---

# 38. Normalize API Response

```js
async function getNormalizedEmployees() {
  // Step 1:
  const data =
    await requestJson(
      `${API_URL}/employees`
    );

  // Step 2:
  return normalizeEmployees(
    data.items
  );
}
```

---

# 39. Why Normalize?

Benefits:

```text
UI does not depend on backend naming

backend changes isolated

less repeated mapping

easier testing

cleaner components
```

---

# 40. Client-Side Filter After API 🔥🔥🔥

Suppose API returns all employees.

```js
function getActiveEmployees(
  employees
) {
  // Step 1:
  return employees.filter(
    (
      employee
    ) => {
      return employee.active;
    }
  );
}
```

---

# 41. Client-Side Sort

```js
function sortEmployeesBySalary(
  employees
) {
  // Step 1:
  return employees.toSorted(
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

# 42. Search Client-Side

```js
function searchLocalEmployees(
  employees,
  query
) {
  // Step 1:
  const normalizedQuery =
    query
      .trim()
      .toLowerCase();

  // Step 2:
  return employees.filter(
    (
      employee
    ) => {
      return employee.name
        .toLowerCase()
        .includes(
          normalizedQuery
        );
    }
  );
}
```

---

# 43. Server Search vs Client Search 🔥🔥🔥

Client-side search:

```text
good for small loaded dataset
```

Server-side search:

```text
better for large datasets
pagination
permissions
fresh backend data
```

---

# 44. Pagination Should Usually Be Server-Side for Large Data

Bad for huge dataset:

```text
download 100,000 employees
↓
paginate 10 at a time in browser
```

Better:

```text
GET /employees?page=1&limit=10
```

---

# 45. Loading Page 2 🔥🔥🔥

```js
async function loadPage(
  page
) {
  // Step 1:
  const result =
    await employeeApi.list(
      {
        page,
        limit:
          10,
      }
    );

  // Step 2:
  return result;
}
```

---

# 46. Page Change Flow

```text
user clicks page 2
↓
set loading
↓
request page 2
↓
replace table rows
↓
update current page
↓
remove loading
```

---

# 47. Search Resets Page 🔥🔥🔥

Common UX rule:

```text
current page = 5
↓
user changes search
↓
reset page = 1
```

Otherwise page 5 of new search may not exist.

---

# 48. Search With Pagination

```js
async function loadEmployees(
  search,
  page
) {
  // Step 1:
  return await employeeApi.list(
    {
      search,
      page,
      limit:
        10,
    }
  );
}
```

---

# 49. Debounce Awareness 🔥🔥🔥

Do not call API on every keystroke instantly if unnecessary.

```text
r
ra
rah
rahu
rahul
```

can produce:

```text
5 requests
```

Debounce can reduce this.

Full debounce comes in Section 9.

---

# 50. Cancellation Is Still Needed

Debounce reduces requests.

AbortController handles:

```text
a request that already started
but is now stale
```

These solve different problems.

---

# 51. Search Cancellation 🔥🔥🔥

```js
// Step 1:
let searchController;

async function searchEmployees(
  query
) {
  // Step 2:
  searchController?.abort();

  // Step 3:
  searchController =
    new AbortController();

  try {
    // Step 4:
    const params =
      new URLSearchParams(
        {
          search:
            query,
        }
      );

    // Step 5:
    const response =
      await fetch(
        `${API_URL}/employees?${params}`,
        {
          signal:
            searchController.signal,
        }
      );

    // Step 6:
    if (
      !response.ok
    ) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    // Step 7:
    return await response.json();
  } catch (
    error
  ) {
    // Step 8:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 9:
    throw error;
  }
}
```

---

# 52. Why Abort Old Search?

Without cancellation:

```text
request "rah"
starts

request "rahul"
starts

"rahul" finishes first
↓
correct UI

"rah" finishes later
↓
wrong stale UI
```

---

# 53. Request ID Alternative 🔥🔥🔥

Cancellation is not always possible.

Another approach:

```js
// Step 1:
let latestRequestId =
  0;

async function searchEmployees(
  query
) {
  // Step 2:
  const requestId =
    ++latestRequestId;

  // Step 3:
  const result =
    await employeeApi.list(
      {
        search:
          query,
      }
    );

  // Step 4:
  if (
    requestId
    !==
    latestRequestId
  ) {
    return null;
  }

  // Step 5:
  return result;
}
```

---

# 54. Stale Response Guard Mental Model

```text
request 1
id = 1

request 2
id = 2

request 1 finishes
↓
1 !== latest 2
↓
ignore

request 2 finishes
↓
2 === latest 2
↓
use
```

---

# 55. HTTP 401 Handling 🔥🔥🔥

```js
function getFriendlyError(
  error
) {
  // Step 1:
  if (
    error.status
    ===
    401
  ) {
    return "Please sign in again.";
  }

  // Step 2:
  return error.message;
}
```

---

# 56. HTTP 403 Handling

```text
401
→ not authenticated

403
→ authenticated but not allowed
```

Simplified interview distinction.

---

# 57. HTTP 404 Handling

```text
resource does not exist
```

Possible UI:

```text
Employee not found
```

---

# 58. HTTP 500 Handling 🔥🔥🔥

```text
server-side failure
```

UI should usually show a safe message:

```text
Something went wrong.
Please try again.
```

Do not expose sensitive server internals.

---

# 59. Friendly Error Mapping 🔥🔥🔥

```js
function getFriendlyError(
  error
) {
  // Step 1:
  if (
    error.status
    ===
    401
  ) {
    return "Session expired.";
  }

  // Step 2:
  if (
    error.status
    ===
    403
  ) {
    return "You do not have permission.";
  }

  // Step 3:
  if (
    error.status
    ===
    404
  ) {
    return "Employee not found.";
  }

  // Step 4:
  if (
    error.status
    >=
    500
  ) {
    return "Server error. Please try again.";
  }

  // Step 5:
  return (
    error.message
    ??
    "Something went wrong."
  );
}
```

---

# 60. Network Error Handling

A network failure may not have:

```text
error.status
```

So fallback matters.

---

# 61. One Real Load Function 🔥🔥🔥

```js
async function loadEmployeeTable(
  filters
) {
  // Step 1:
  let loading =
    true;

  // Step 2:
  let errorMessage =
    "";

  try {
    // Step 3:
    const result =
      await employeeApi.list(
        filters
      );

    // Step 4:
    return {
      items:
        result.items,

      total:
        result.total,
    };
  } catch (
    error
  ) {
    // Step 5:
    errorMessage =
      getFriendlyError(
        error
      );

    // Step 6:
    throw error;
  } finally {
    // Step 7:
    loading =
      false;

    // Step 8:
    console.log(
      loading,
      errorMessage
    );
  }
}
```

---

# 62. Create Flow in UI 🔥🔥🔥

```text
user submits form
↓
validate input
↓
set saving = true
↓
POST employee
↓
success
↓
add employee to UI / reload list
↓
close form
↓
set saving = false
```

---

# 63. Create Flow Code

```js
async function handleCreate(
  form
) {
  // Step 1:
  if (
    !form.name
      .trim()
  ) {
    throw new Error(
      "Name is required"
    );
  }

  try {
    // Step 2:
    const created =
      await employeeApi.create(
        form
      );

    // Step 3:
    return created;
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      getFriendlyError(
        error
      )
    );

    throw error;
  }
}
```

---

# 64. Update Flow 🔥🔥🔥

```text
user edits employee
↓
PATCH changes
↓
receive updated employee
↓
replace item in local state
```

---

# 65. Replace Updated Employee Locally

```js
function replaceEmployee(
  employees,
  updatedEmployee
) {
  // Step 1:
  return employees.map(
    (
      employee
    ) => {
      if (
        employee.id
        ===
        updatedEmployee.id
      ) {
        return updatedEmployee;
      }

      return employee;
    }
  );
}
```

---

# 66. Example Replace

```js
// Step 1:
const employees = [
  {
    id: 1,
    name:
      "Rahul",
  },
  {
    id: 2,
    name:
      "Priya",
  },
];

// Step 2:
const updated = {
  id: 1,
  name:
    "Rahul Kumar",
};

// Step 3:
console.log(
  replaceEmployee(
    employees,
    updated
  )
);
```

Output:

```text
[
  { id: 1, name: "Rahul Kumar" },
  { id: 2, name: "Priya" }
]
```

---

# 67. Delete Flow 🔥🔥🔥

```text
user confirms delete
↓
DELETE request
↓
success
↓
remove employee from local state
```

---

# 68. Remove Employee Locally

```js
function removeEmployeeFromList(
  employees,
  id
) {
  // Step 1:
  return employees.filter(
    (
      employee
    ) => {
      return (
        employee.id
        !==
        id
      );
    }
  );
}
```

---

# 69. Example Remove

```js
// Step 1:
const employees = [
  {
    id: 1,
    name:
      "Rahul",
  },
  {
    id: 2,
    name:
      "Priya",
  },
];

// Step 2:
console.log(
  removeEmployeeFromList(
    employees,
    1
  )
);
```

Output:

```text
[
  { id: 2, name: "Priya" }
]
```

---

# 70. Optimistic Update Awareness 🔥🔥🔥

Normal update:

```text
request
↓
wait
↓
success
↓
update UI
```

Optimistic update:

```text
update UI immediately
↓
send request
↓
if failure
rollback UI
```

Useful for fast UX, but needs rollback logic.

---

# 71. Optimistic Delete Mental Model

```text
remove item from UI
↓
DELETE request
↓
success
→ keep removed

failure
→ restore old list
```

Full implementation belongs more to application state management.

---

# 72. Retry Awareness 🔥🔥🔥

Some failures may be temporary.

Potential retry candidates:

```text
network failure
temporary 502
temporary 503
```

Do not blindly retry:

```text
400 validation errors
401 auth errors
all POST requests without thinking
```

Retry utility comes later.

---

# 73. Idempotency Awareness

Repeated GET:

```text
usually safe
```

Repeated POST:

```text
may create duplicates
```

So automatic retries need API knowledge.

Senior interview point.

---

# 74. API Transformation Example 🔥🔥🔥

Raw response:

```js
// Step 1:
const apiData = {
  employees: [
    {
      employee_id:
        1,
      full_name:
        "Rahul",
      salary:
        "75000",
      is_active:
        1,
    },
  ],
};
```

UI needs:

```text
id number
name string
salary number
active boolean
```

---

# 75. Transform API Data

```js
function normalizeEmployee(
  employee
) {
  // Step 1:
  return {
    id:
      Number(
        employee.employee_id
      ),

    name:
      employee.full_name,

    salary:
      Number(
        employee.salary
      ),

    active:
      Boolean(
        employee.is_active
      ),
  };
}
```

---

# 76. Normalize Full Response

```js
function normalizeEmployeeResponse(
  response
) {
  // Step 1:
  return {
    items:
      response.employees.map(
        normalizeEmployee
      ),

    total:
      Number(
        response.total
        ??
        response.employees.length
      ),
  };
}
```

---

# 77. Why Convert API Types?

Because APIs may send:

```text
"75000"
instead of
75000
```

If you do not normalize:

```text
sorting
math
comparison
```

can become buggy.

---

# 78. Bad Salary Sort With Strings 🔥🔥🔥

```js
// Step 1:
const salaries = [
  "9",
  "100",
  "20",
];

// Step 2:
console.log(
  salaries.toSorted()
);
```

Output:

```text
["100", "20", "9"]
```

String sorting, not numeric sorting.

---

# 79. Correct Numeric Normalize

```js
// Step 1:
const salaries = [
  "9",
  "100",
  "20",
];

// Step 2:
const normalized =
  salaries.map(
    Number
  );

// Step 3:
console.log(
  normalized.toSorted(
    (
      a,
      b
    ) => {
      return (
        a - b
      );
    }
  )
);
```

Output:

```text
[9, 20, 100]
```

---

# 80. API Response Validation Awareness 🔥🔥🔥

Never assume external data is perfect.

Potential problems:

```text
missing fields
null values
wrong types
unexpected shape
empty body
```

At minimum, use safe access.

---

# 81. Safe Nested Access

```js
function getEmployeeName(
  response
) {
  // Step 1:
  return (
    response?.employee?.name
    ??
    "Unknown"
  );
}

// Step 2:
console.log(
  getEmployeeName(
    {}
  )
); // Output: Unknown
```

Output:

```text
Unknown
```

---

# 82. API Contract vs Defensive Code

If backend contract guarantees:

```text
employee.name always exists
```

you do not need endless optional chaining everywhere.

Use defensive code where uncertainty is real.

---

# 83. Machine-Coding API Layer 🔥🔥🔥

A strong machine-coding structure:

```text
api/
  request.js
  employeeApi.js

utils/
  normalizeEmployee.js

features/
  employeeList.js
```

Separation:

```text
request
API endpoint logic
data transformation
UI logic
```

---

# 84. Full Request Helper 🔥🔥🔥

```js
async function requestJson(
  url,
  options = {}
) {
  // Step 1:
  const response =
    await fetch(
      url,
      options
    );

  // Step 2:
  const data =
    await safeJson(
      response
    );

  // Step 3:
  if (
    !response.ok
  ) {
    throw new HttpError(
      data?.message
      ??
      `HTTP ${response.status}`,
      response.status,
      data
    );
  }

  // Step 4:
  return data;
}
```

---

# 85. Full Employee API 🔥🔥🔥

```js
const employeeApi = {
  async list(
    {
      search = "",
      page = 1,
      limit = 10,
    } = {}
  ) {
    // Step 1:
    const params =
      new URLSearchParams(
        {
          search,
          page:
            String(
              page
            ),
          limit:
            String(
              limit
            ),
        }
      );

    // Step 2:
    return await requestJson(
      `${API_URL}/employees?${params}`
    );
  },

  async getById(
    id
  ) {
    // Step 3:
    return await requestJson(
      `${API_URL}/employees/${id}`
    );
  },

  async create(
    employee
  ) {
    // Step 4:
    return await requestJson(
      `${API_URL}/employees`,
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            employee
          ),
      }
    );
  },

  async update(
    id,
    changes
  ) {
    // Step 5:
    return await requestJson(
      `${API_URL}/employees/${id}`,
      {
        method:
          "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            changes
          ),
      }
    );
  },

  async remove(
    id
  ) {
    // Step 6:
    const response =
      await fetch(
        `${API_URL}/employees/${id}`,
        {
          method:
            "DELETE",
        }
      );

    // Step 7:
    if (
      !response.ok
    ) {
      throw new HttpError(
        "Delete failed",
        response.status
      );
    }

    // Step 8:
    return true;
  },
};
```

---

# 86. Full Table Loading Function 🔥🔥🔥

```js
async function loadEmployeeTable(
  {
    search = "",
    page = 1,
  } = {}
) {
  // Step 1:
  const response =
    await employeeApi.list(
      {
        search,
        page,
        limit:
          10,
      }
    );

  // Step 2:
  const employees =
    response.items.map(
      normalizeEmployee
    );

  // Step 3:
  return {
    employees,

    page:
      response.page,

    total:
      response.total,

    totalPages:
      Math.ceil(
        response.total
        /
        response.limit
      ),
  };
}
```

---

# 87. Full UI State Flow 🔥🔥🔥

```js
async function loadScreen(
  filters
) {
  // Step 1:
  const state = {
    loading:
      true,
    error:
      null,
    employees:
      [],
  };

  try {
    // Step 2:
    const result =
      await loadEmployeeTable(
        filters
      );

    // Step 3:
    state.employees =
      result.employees;

    // Step 4:
    return state;
  } catch (
    error
  ) {
    // Step 5:
    state.error =
      getFriendlyError(
        error
      );

    // Step 6:
    return state;
  } finally {
    // Step 7:
    state.loading =
      false;
  }
}
```

---

# 88. Important `finally` Return Caution 🔥🔥🔥

Do not casually `return` from `finally`.

It can override earlier return/error behavior.

Prefer:

```text
finally
→ cleanup only
```

---

# 89. Interview Question — Why Separate API Layer? 🔥🔥🔥

Good answer:

```text
It keeps HTTP logic out of UI code.

It centralizes:
URLs,
headers,
status handling,
error mapping,
and response parsing.

It also makes testing and maintenance easier.
```

---

# 90. Interview Question — Where Should Data Transformation Happen?

Good answer:

```text
Usually near the API boundary
or in a dedicated normalization layer.

That keeps UI components
working with a stable internal shape.
```

---

# 91. Interview Question — Search: Debounce vs AbortController 🔥🔥🔥

Good answer:

```text
Debounce prevents unnecessary requests
from starting too frequently.

AbortController cancels
a request that has already started
and is now no longer needed.

They solve different problems
and can be used together.
```

---

# 92. Interview Question — How Do You Prevent Stale API Results?

Good answer:

```text
Cancel old requests with AbortController,
or track a request ID/version
and ignore responses
that are not the latest.
```

---

# 93. Interview Question — Client vs Server Pagination 🔥🔥🔥

Good answer:

```text
Client pagination is okay
for small datasets already loaded.

Server pagination is better
for large datasets
because it reduces network,
memory,
and processing cost.
```

---

# 94. Interview Question — What State Do You Track for API UI?

Good answer:

```text
At minimum:

data
loading
error

Often also:

empty state
pagination
search/filter state
request status
```

---

# 95. Interview Question — How Do You Handle 204?

Good answer:

```text
204 means No Content.

Do not blindly call response.json()
because there may be no response body.
```

---

# 96. Interview Question — Why Normalize API Data? 🔥🔥🔥

Good answer:

```text
To isolate backend response shape
from UI/business logic.

It also converts incorrect or inconvenient types
into the shape the application expects.
```

---

# 97. Interview Question — Why Not Retry Every Failure?

Good answer:

```text
Some failures are permanent,
such as validation errors or authorization failures.

Some operations like POST
may not be safe to repeat automatically.

Retry policy must understand
the error and operation semantics.
```

---

# 98. Debugging Checklist 🔥🔥🔥

When API flow breaks, check:

```text
Correct endpoint?

Correct method?

Correct query params?

Correct request body?

JSON.stringify used?

Headers correct?

Authorization present?

Did fetch reject?

Did server return HTTP error?

Did I check response.ok?

Did parsing fail?

Is response body empty?

Did normalization fail?

Did I forget await?

Did I accidentally return Promise instead of data?

Is old search request overwriting new results?

Did pagination reset after search?

Did loading state clear in finally?

Did I mutate state accidentally?
```

---

# 99. Real API Decision Guide 🔥🔥🔥

```text
Need list?
→ GET collection

Need one item?
→ GET /:id

Create?
→ POST

Partial edit?
→ PATCH

Delete?
→ DELETE

Large dataset?
→ server pagination

Search input?
→ debounce + cancellation

Different backend shape?
→ normalize

HTTP error?
→ custom error with status

Network failure?
→ catch/retry strategy

Independent requests?
→ Promise.all when appropriate

Stale requests?
→ AbortController/request ID
```

---

# 100. Final Machine-Coding Flow 🔥🔥🔥

Imagine:

```text
Employee Management Screen
```

Features:

```text
List Employees
Search
Pagination
Create
Edit
Delete
Loading
Error
Empty State
```

Architecture:

```text
Employee Screen
↓
employeeApi
↓
requestJson
↓
fetch
↓
Backend
```

Data flow:

```text
Backend Raw Data
↓
normalizeEmployee
↓
UI Employee Model
↓
table
```

Search flow:

```text
User types
↓
debounce
↓
abort previous request
↓
fetch latest search
↓
ignore stale response
↓
update table
```

Create flow:

```text
submit form
↓
validate
↓
POST
↓
created employee
↓
add/reload
```

Update flow:

```text
edit
↓
PATCH
↓
updated employee
↓
replace local item
```

Delete flow:

```text
confirm
↓
DELETE
↓
remove local item
```

Error flow:

```text
401
→ session message

403
→ permission message

404
→ not found

500
→ server error message

network error
→ connection message
```

---

# 101. Final Practical — Complete Search Loader 🔥🔥🔥

```js
// Step 1:
let latestController;

async function loadEmployeeSearch(
  {
    search,
    page,
  }
) {
  // Step 2:
  latestController?.abort();

  // Step 3:
  latestController =
    new AbortController();

  // Step 4:
  const params =
    new URLSearchParams(
      {
        search,
        page:
          String(
            page
          ),
        limit:
          "10",
      }
    );

  try {
    // Step 5:
    const response =
      await fetch(
        `${API_URL}/employees?${params}`,
        {
          signal:
            latestController.signal,
        }
      );

    // Step 6:
    const data =
      await safeJson(
        response
      );

    // Step 7:
    if (
      !response.ok
    ) {
      throw new HttpError(
        data?.message
        ??
        `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    // Step 8:
    const employees =
      data.items.map(
        normalizeEmployee
      );

    // Step 9:
    return {
      employees,

      total:
        data.total,

      page:
        data.page,

      totalPages:
        Math.ceil(
          data.total
          /
          data.limit
        ),
    };
  } catch (
    error
  ) {
    // Step 10:
    if (
      error.name
      ===
      "AbortError"
    ) {
      return null;
    }

    // Step 11:
    throw error;
  }
}
```

Full flow:

```text
new search/page request
↓
abort previous
↓
build URLSearchParams
↓
fetch
↓
safe JSON parse
↓
HTTP check
↓
normalize employees
↓
calculate total pages
↓
return clean UI-ready result
```

---

# 102. Final Master Example — Local State Update 🔥🔥🔥

```js
// Step 1:
let employees = [
  {
    id: 1,
    name:
      "Rahul",
  },
  {
    id: 2,
    name:
      "Priya",
  },
];

async function saveEmployeeName(
  id,
  name
) {
  // Step 2:
  const updated =
    await employeeApi.update(
      id,
      {
        name,
      }
    );

  // Step 3:
  employees =
    replaceEmployee(
      employees,
      updated
    );

  // Step 4:
  return employees;
}
```

Mental flow:

```text
PATCH request
↓
server returns updated item
↓
replace old item immutably
↓
UI receives new array
```

---

# Quick Memory 🧠🔥🔥🔥

## API Architecture

```text
UI
↓
API Service
↓
Request Helper
↓
fetch
↓
Backend
```

## GET List

```text
GET /employees
```

## GET One

```text
GET /employees/:id
```

## Create

```text
POST /employees
```

## Update

```text
PATCH /employees/:id
```

## Delete

```text
DELETE /employees/:id
```

## Search

```text
URLSearchParams
```

## Large Data

```text
server pagination
```

## API UI State

```text
loading
data
error
empty
```

## Normalize

```text
backend shape
↓
UI shape
```

## Search Performance

```text
debounce
+
AbortController
```

## Stale Results

```text
abort
or
request ID
```

## Update Local State

```text
map()
```

## Delete Local State

```text
filter()
```

## HTTP Error

```text
custom error + status
```

## 404

```text
expected not-found case
```

## 500

```text
server error
```

## Retry

```text
only when operation/error is safe
```

## Most Important Real API Rule

```text
Do not mix:
HTTP logic
data normalization
and UI logic
into one giant function.
```

## Best Interview Answer

```text
For real API code,
I keep HTTP logic in a service layer,
centralize response and error handling,
normalize backend data into a stable UI model,
track loading/error/empty states,
use server-side pagination for large datasets,
and protect search flows from stale responses
with cancellation or request IDs.

For mutations,
I update local state immutably
after a successful create/update/delete,
or use optimistic updates only when rollback is safe.
```

---

# ✅ 8.7 Real API Practical Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
8.2 Timers ✅
8.3 Callbacks ✅
8.4 Promises ✅
8.5 Async / Await ✅
8.6 Fetch + HTTP ✅
8.7 Real API Practical ✅
```

Next topic:

```text
8.8 Promise Combinators 🔥🔥🔥
├── Promise.all()
├── Promise.allSettled()
├── Promise.race()
├── Promise.any()
├── Success / Failure Behaviour
├── Ordering
├── Real API Use Cases
├── Performance
└── Output Questions
```

**Next: 8.8 Promise Combinators 🔥🔥🔥**
