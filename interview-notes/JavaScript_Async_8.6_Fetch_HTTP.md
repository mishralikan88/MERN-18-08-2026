# 8.6 Fetch + HTTP 🔥🔥🔥

`fetch()` is the modern browser API used to make HTTP requests.

It is Promise-based.

Master mental model:

```text
fetch(url)
↓
returns Promise<Response>
↓
network request happens
↓
Response arrives
↓
check response.ok / response.status
↓
read body
↓
response.json()
↓
use data
```

Most important interview rule:

```text
fetch()
does NOT reject
just because server returns
404 or 500
```

`fetch()` mainly rejects for failures such as:

```text
network failure
DNS failure
request blocked
request aborted
```

So for normal HTTP errors:

```text
404
500
403
```

you usually need to check:

```text
response.ok
```

This chapter covers:

```text
fetch()
GET
POST
PUT
PATCH
DELETE
Headers
Content-Type
Authorization
Request Body
JSON.stringify()
response.json()
response.text()
response.ok
response.status
HTTP Errors
Network Errors
Query Parameters
URLSearchParams
AbortController
Request Cancellation
Timeout Pattern
CORS Awareness
Credentials Awareness
Body Consumption
API Error Handling
Real Employee API Flow
Debugging
Interview Questions
```

---

# 1. What Is `fetch()`? 🔥🔥🔥

`fetch()` starts an HTTP request.

Basic syntax:

```js
// Step 1:
const promise =
  fetch(
    "https://api.example.com/employees"
  );

// Step 2:
console.log(
  promise instanceof Promise
); // Output: true
```

Output:

```text
true
```

Important:

```text
fetch()
→ immediately returns a Promise
```

---

# 2. What Does `fetch()` Resolve With?

The Promise returned by `fetch()` resolves with a:

```text
Response object
```

not directly with your JSON data.

Mental model:

```text
fetch()
↓
Response
↓
read response body
↓
JSON / text / blob / etc.
```

---

# 3. Basic GET Request 🔥🔥🔥

```js
async function loadEmployees() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  console.log(
    response.status
  );
}

// Step 3:
loadEmployees();
```

The actual status depends on the server.

Typical successful status:

```text
200
```

---

# 4. GET Is Default Method

If you write:

```js
// Step 1:
fetch(
  "https://api.example.com/employees"
);
```

it is conceptually:

```text
GET /employees
```

You do not need to explicitly write:

```text
method: "GET"
```

unless you want to be explicit.

---

# 5. Explicit GET

```js
async function loadEmployees() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees",
      {
        method:
          "GET",
      }
    );

  // Step 2:
  console.log(
    response.status
  );
}

// Step 3:
loadEmployees();
```

---

# 6. `response.json()` 🔥🔥🔥

`response.json()` reads the body and parses JSON.

```js
async function loadEmployees() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  const employees =
    await response.json();

  // Step 3:
  console.log(
    employees
  );
}

// Step 4:
loadEmployees();
```

Important:

```text
response.json()
→ also returns a Promise
```

---

# 7. Why Do We Need Two `await`s? 🔥🔥🔥

Typical pattern:

```js
// Step 1:
const response =
  await fetch(
    url
  );

// Step 2:
const data =
  await response.json();
```

Why?

Because:

```text
fetch()
→ Promise<Response>

response.json()
→ Promise<parsed data>
```

Two asynchronous stages.

---

# 8. Fetch Mental Flow 🔥🔥🔥

```text
fetch(url)
↓
network starts
↓
Response headers/status available
↓
fetch Promise fulfills
↓
response.json()
↓
body is read and parsed
↓
JSON data available
```

---

# 9. `response.ok` 🔥🔥🔥

`response.ok` is a boolean.

It is usually:

```text
true
→ status 200–299

false
→ other status ranges
```

Example:

```js
async function loadEmployees() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  console.log(
    response.ok
  );
}

// Step 3:
loadEmployees();
```

---

# 10. Why `response.ok` Is Important 🔥🔥🔥

Because this may still resolve:

```text
404 Not Found
500 Internal Server Error
403 Forbidden
```

So:

```js
async function loadEmployees() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
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
  const data =
    await response.json();

  // Step 4:
  return data;
}
```

---

# 11. Fetch Does Not Reject on 404 🔥🔥🔥

Common wrong mental model:

```text
404
→ fetch Promise rejects
```

Usually false.

Better:

```text
404
→ fetch Promise fulfills with Response
→ response.ok is false
```

---

# 12. Fetch Does Not Reject on 500

Same idea:

```text
500
→ Response received
→ fetch Promise can still fulfill
→ response.ok = false
```

So HTTP status handling is your responsibility.

---

# 13. Network Error vs HTTP Error 🔥🔥🔥

HTTP error:

```text
server responded
with status like 404 / 500
```

Network error:

```text
request could not complete
at transport/network level
```

Different behavior.

---

# 14. Network Error Handling

```js
async function loadEmployees() {
  try {
    // Step 1:
    const response =
      await fetch(
        "https://api.example.com/employees"
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
    return await response.json();
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.message
    );

    throw error;
  }
}
```

---

# 15. Clean GET Pattern 🔥🔥🔥

```js
async function getEmployees() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `Request failed: ${response.status}`
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

# 16. `response.status` 🔥🔥🔥

`response.status` gives the HTTP status code.

Examples:

```text
200
201
204
400
401
403
404
409
500
```

Example:

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  console.log(
    response.status
  );
}

// Step 3:
run();
```

---

# 17. Important Common Status Codes 🔥🔥🔥

```text
200
→ OK

201
→ Created

204
→ No Content

400
→ Bad Request

401
→ Unauthorized

403
→ Forbidden

404
→ Not Found

409
→ Conflict

500
→ Internal Server Error
```

---

# 18. POST Request 🔥🔥🔥

Use POST to create data.

```js
async function createEmployee(
  employee
) {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees",
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

# 19. Why `JSON.stringify()`? 🔥🔥🔥

JavaScript object:

```js
// Step 1:
const employee = {
  name:
    "Rahul",
};
```

cannot automatically be sent as JSON text just because it is an object.

So:

```js
// Step 1:
const body =
  JSON.stringify(
    {
      name:
        "Rahul",
    }
  );

// Step 2:
console.log(
  body
); // Output: {"name":"Rahul"}
```

Output:

```text
{"name":"Rahul"}
```

---

# 20. `Content-Type: application/json` 🔥🔥🔥

When sending JSON:

```js
// Step 1:
const options = {
  method:
    "POST",

  headers: {
    "Content-Type":
      "application/json",
  },

  body:
    JSON.stringify(
      {
        name:
          "Rahul",
      }
    ),
};
```

This tells the server:

```text
request body contains JSON
```

---

# 21. Full POST Example 🔥🔥🔥

```js
async function createEmployee() {
  // Step 1:
  const employee = {
    name:
      "Rahul",
    department:
      "IT",
  };

  // Step 2:
  const response =
    await fetch(
      "https://api.example.com/employees",
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

  // Step 3:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 4:
  const created =
    await response.json();

  // Step 5:
  console.log(
    created
  );
}
```

---

# 22. POST Mental Flow

```text
JS object
↓
JSON.stringify
↓
HTTP request body
↓
server processes
↓
Response
↓
response.json()
↓
created record
```

---

# 23. PUT Request 🔥🔥🔥

`PUT` is commonly used to replace/update a resource.

```js
async function updateEmployee(
  id,
  employee
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
      {
        method:
          "PUT",

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
      `Update failed: ${response.status}`
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 24. PATCH Request 🔥🔥🔥

`PATCH` is commonly used for partial updates.

```js
async function updateEmployeeName(
  id,
  name
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
      {
        method:
          "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            {
              name,
            }
          ),
      }
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new Error(
      `Patch failed: ${response.status}`
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 25. PUT vs PATCH 🔥🔥🔥

Practical interview answer:

```text
PUT
→ commonly used for replacing/updating full resource representation

PATCH
→ commonly used for partial update
```

Exact server semantics depend on API design.

---

# 26. DELETE Request 🔥🔥🔥

```js
async function deleteEmployee(
  id
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
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

# 27. DELETE May Return No Body 🔥🔥🔥

A successful DELETE may return:

```text
204 No Content
```

If so, doing:

```text
await response.json()
```

can fail because there is no JSON body.

---

# 28. 204 Handling

```js
async function deleteEmployee(
  id
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
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
  if (
    response.status
    ===
    204
  ) {
    return null;
  }

  // Step 4:
  return await response.json();
}
```

---

# 29. Headers 🔥🔥🔥

Headers send metadata with the request.

Example:

```js
// Step 1:
const headers = {
  "Content-Type":
    "application/json",

  Accept:
    "application/json",
};
```

Common headers:

```text
Content-Type
Accept
Authorization
```

---

# 30. Authorization Header 🔥🔥🔥

Common Bearer-token pattern:

```js
async function getEmployees(
  token
) {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  // Step 2:
  return response;
}
```

---

# 31. Do Not Put Secrets in Frontend Code 🔥🔥🔥

Important:

```text
frontend JavaScript
is visible to users
```

So do not hardcode:

```text
private API secrets
server credentials
database passwords
```

A user token obtained through authentication is different from a server secret.

---

# 32. `Accept` Header

Example:

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees",
      {
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  // Step 2:
  return response;
}
```

`Accept` tells the server what response formats the client prefers.

---

# 33. Query Parameters 🔥🔥🔥

Example:

```text
/employees?page=2&limit=10
```

Used for:

```text
pagination
search
filtering
sorting
```

---

# 34. Manual Query String

```js
async function getEmployees(
  page,
  limit
) {
  // Step 1:
  const url =
    `https://api.example.com/employees?page=${page}&limit=${limit}`;

  // Step 2:
  return await fetch(
    url
  );
}
```

---

# 35. Search Query Must Be Encoded 🔥🔥🔥

User input may contain:

```text
spaces
&
?
/
special characters
```

So do not blindly concatenate raw input into URLs.

---

# 36. `URLSearchParams` 🔥🔥🔥

```js
// Step 1:
const params =
  new URLSearchParams(
    {
      search:
        "Rahul Kumar",
      page:
        "1",
    }
  );

// Step 2:
console.log(
  params.toString()
);
```

Output:

```text
search=Rahul+Kumar&page=1
```

---

# 37. Query Params With Fetch

```js
async function searchEmployees(
  search,
  page
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
      }
    );

  // Step 2:
  const url =
    `https://api.example.com/employees?${params}`;

  // Step 3:
  const response =
    await fetch(
      url
    );

  // Step 4:
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 5:
  return await response.json();
}
```

---

# 38. GET Request Should Usually Not Use Body 🔥🔥

Common REST-style pattern:

```text
GET
→ query parameters

POST/PUT/PATCH
→ request body
```

Do not rely on GET bodies.

---

# 39. `response.text()` 🔥🔥

Not every API response is JSON.

```js
async function loadText() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/message"
    );

  // Step 2:
  const text =
    await response.text();

  // Step 3:
  console.log(
    text
  );
}
```

---

# 40. `response.json()` Can Fail 🔥🔥🔥

If server says success but body contains invalid JSON:

```text
response.json()
→ rejects
```

So parsing itself can fail.

---

# 41. Invalid JSON Example — Concept

```js
async function loadData() {
  try {
    // Step 1:
    const response =
      await fetch(
        "https://api.example.com/data"
      );

    // Step 2:
    const data =
      await response.json();

    // Step 3:
    return data;
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      "Request or JSON parsing failed"
    );
  }
}
```

---

# 42. Response Body Is a Stream 🔥🔥🔥

A Response body is consumed when you read it.

For example:

```text
response.json()
```

reads the body.

You generally cannot read the same body again normally.

---

# 43. Body Used Once 🔥🔥🔥

Problem pattern:

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  const first =
    await response.json();

  // Step 3:
  console.log(
    first
  );

  // Step 4:
  // A second response.json()
  // would normally fail because
  // the body has already been consumed.
}
```

---

# 44. `response.bodyUsed`

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  console.log(
    response.bodyUsed
  ); // Usually false before reading.

  // Step 3:
  await response.json();

  // Step 4:
  console.log(
    response.bodyUsed
  ); // Usually true after reading.
}
```

Conceptual output:

```text
false
true
```

---

# 45. Clone Response — Awareness

If you genuinely need to read a Response twice:

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  const copy =
    response.clone();

  // Step 3:
  const json =
    await response.json();

  // Step 4:
  const text =
    await copy.text();

  // Step 5:
  console.log(
    json,
    text
  );
}
```

Use only when actually needed.

---

# 46. Standard Fetch Helper 🔥🔥🔥

A reusable helper:

```js
async function request(
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
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 3:
  return response;
}
```

---

# 47. JSON Fetch Helper

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
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 48. Better Error Object With Status 🔥🔥🔥

```js
class HttpError
  extends Error {
  constructor(
    message,
    status
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
  }
}
```

---

# 49. Use Custom HTTP Error

```js
async function requestJson(
  url
) {
  // Step 1:
  const response =
    await fetch(
      url
    );

  // Step 2:
  if (
    !response.ok
  ) {
    throw new HttpError(
      `Request failed`,
      response.status
    );
  }

  // Step 3:
  return await response.json();
}
```

---

# 50. Why Preserve Status? 🔥🔥🔥

Because UI may react differently:

```text
401
→ login again

403
→ no permission

404
→ show not found

500
→ show server error
```

---

# 51. Parse Error Body From Server 🔥🔥🔥

Many APIs return JSON error details.

Example pattern:

```js
async function requestJson(
  url
) {
  // Step 1:
  const response =
    await fetch(
      url
    );

  // Step 2:
  const data =
    await response.json();

  // Step 3:
  if (
    !response.ok
  ) {
    throw new Error(
      data.message
      ??
      `HTTP ${response.status}`
    );
  }

  // Step 4:
  return data;
}
```

---

# 52. But Error Body May Not Always Be JSON 🔥🔥

Be careful.

Server may return:

```text
JSON
HTML
plain text
empty body
```

So robust libraries often inspect content type or safely parse.

---

# 53. Safe JSON Parsing Helper — Practical

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

# 54. Better Request Helper 🔥🔥🔥

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
    const message =
      data?.message
      ??
      `HTTP ${response.status}`;

    throw new Error(
      message
    );
  }

  // Step 4:
  return data;
}
```

---

# 55. POST Helper Example

```js
async function createEmployee(
  employee
) {
  // Step 1:
  return await requestJson(
    "https://api.example.com/employees",
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
}
```

---

# 56. Default Headers Merge 🔥🔥🔥

If building a helper, be careful not to overwrite caller headers.

```js
async function requestJson(
  url,
  options = {}
) {
  // Step 1:
  const headers = {
    Accept:
      "application/json",

    ...options.headers,
  };

  // Step 2:
  const response =
    await fetch(
      url,
      {
        ...options,
        headers,
      }
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

# 57. Conditional JSON Content-Type 🔥🔥

Do not automatically set:

```text
Content-Type: application/json
```

for every possible body type.

For example:

```text
FormData
```

is handled differently.

---

# 58. FormData Awareness

```js
async function uploadForm(
  formData
) {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/upload",
      {
        method:
          "POST",

        body:
          formData,
      }
    );

  // Step 2:
  return response;
}
```

When using `FormData`, browsers usually set the multipart boundary automatically.

Do not manually set an incorrect multipart `Content-Type` boundary.

---

# 59. CORS Awareness 🔥🔥🔥

CORS means:

```text
Cross-Origin Resource Sharing
```

If frontend origin differs from API origin:

```text
browser may enforce CORS rules
```

---

# 60. CORS Is a Browser Security Mechanism

Example origins:

```text
https://app.example.com

https://api.other.com
```

Different origins.

The server must allow the browser request appropriately.

---

# 61. Frontend Cannot "Fix" Server CORS 🔥🔥🔥

Common mistake:

```text
CORS error
→ add random frontend header
```

Usually wrong.

The API/server must send correct CORS response headers.

---

# 62. `mode: "no-cors"` Is Not a Real Fix 🔥🔥🔥

Do not use:

```text
mode: "no-cors"
```

as a normal solution to CORS problems.

It can produce an opaque response that JavaScript cannot inspect normally.

---

# 63. Credentials Awareness 🔥🔥

Cookies are not always sent cross-origin automatically.

Fetch supports:

```text
credentials
```

Example:

```js
async function loadProfile() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/profile",
      {
        credentials:
          "include",
      }
    );

  // Step 2:
  return response;
}
```

---

# 64. Credentials Options — Awareness

Common values:

```text
same-origin
include
omit
```

Exact behavior also depends on cookies, SameSite, CORS, and server configuration.

---

# 65. AbortController 🔥🔥🔥

`AbortController` can cancel a fetch request.

Basic pattern:

```js
// Step 1:
const controller =
  new AbortController();

// Step 2:
const signal =
  controller.signal;

// Step 3:
fetch(
  "https://api.example.com/employees",
  {
    signal,
  }
);

// Step 4:
controller.abort();
```

---

# 66. Why Cancel Requests? 🔥🔥🔥

Common reasons:

```text
user navigated away
new search replaced old search
component unmounted
request no longer needed
manual cancel
timeout
```

---

# 67. Abort Fetch With Async/Await 🔥🔥🔥

```js
async function loadEmployees() {
  // Step 1:
  const controller =
    new AbortController();

  try {
    // Step 2:
    const response =
      await fetch(
        "https://api.example.com/employees",
        {
          signal:
            controller.signal,
        }
      );

    // Step 3:
    return await response.json();
  } finally {
    // Step 4:
    controller.abort();
  }
}
```

This example shows the API shape, but aborting in `finally` after completion is usually unnecessary.

Normally the controller is kept outside so another action can cancel the request while it is pending.

---

# 68. Practical Cancel Function 🔥🔥🔥

```js
function loadEmployees() {
  // Step 1:
  const controller =
    new AbortController();

  // Step 2:
  const promise =
    fetch(
      "https://api.example.com/employees",
      {
        signal:
          controller.signal,
      }
    );

  // Step 3:
  return {
    promise,

    cancel() {
      controller.abort();
    },
  };
}

// Step 4:
const request =
  loadEmployees();

// Step 5:
request.cancel();
```

---

# 69. Abort Error Handling 🔥🔥🔥

When a fetch is aborted, the Promise rejects.

Modern environments may expose an abort-related error such as:

```text
AbortError
```

Example:

```js
async function run(
  signal
) {
  try {
    // Step 1:
    await fetch(
      "https://api.example.com/employees",
      {
        signal,
      }
    );
  } catch (
    error
  ) {
    // Step 2:
    if (
      error.name
      ===
      "AbortError"
    ) {
      console.log(
        "Request cancelled"
      );

      return;
    }

    // Step 3:
    throw error;
  }
}
```

---

# 70. Search Race Condition Preview 🔥🔥🔥

User types:

```text
r
ra
rah
rahul
```

If each keystroke starts a request:

```text
older request may finish after newer request
```

Then stale results can overwrite fresh results.

AbortController can help.

Race conditions get a full chapter later.

---

# 71. Cancel Previous Search Request 🔥🔥🔥

```js
// Step 1:
let controller;

async function searchEmployees(
  query
) {
  // Step 2:
  controller?.abort();

  // Step 3:
  controller =
    new AbortController();

  try {
    // Step 4:
    const params =
      new URLSearchParams(
        {
          q:
            query,
        }
      );

    // Step 5:
    const response =
      await fetch(
        `https://api.example.com/employees?${params}`,
        {
          signal:
            controller.signal,
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

    throw error;
  }
}
```

---

# 72. Timeout With AbortController 🔥🔥🔥

`fetch()` has no universal simple timeout option like:

```text
timeout: 5000
```

in the basic API.

A common pattern is:

```text
timer
+
AbortController
```

---

# 73. Fetch Timeout Helper 🔥🔥🔥

```js
async function fetchWithTimeout(
  url,
  milliseconds
) {
  // Step 1:
  const controller =
    new AbortController();

  // Step 2:
  const timeoutId =
    setTimeout(
      () => {
        controller.abort();
      },
      milliseconds
    );

  try {
    // Step 3:
    return await fetch(
      url,
      {
        signal:
          controller.signal,
      }
    );
  } finally {
    // Step 4:
    clearTimeout(
      timeoutId
    );
  }
}
```

---

# 74. Why Clear Timeout?

If request finishes early:

```text
timeout timer is no longer needed
```

So cleanup:

```js
// Step 1:
clearTimeout(
  timeoutId
);
```

prevents unnecessary later work.

---

# 75. Timeout Error vs HTTP Error

Timeout/abort:

```text
fetch Promise rejects
```

HTTP 500:

```text
fetch Promise usually fulfills
with response.ok = false
```

Very important distinction.

---

# 76. Request Body Cannot Usually Be Plain Object 🔥🔥🔥

Wrong:

```js
// Step 1:
fetch(
  "https://api.example.com/employees",
  {
    method:
      "POST",

    body: {
      name:
        "Rahul",
    },
  }
);
```

For JSON API, use:

```text
JSON.stringify(object)
```

---

# 77. Correct JSON Body

```js
// Step 1:
fetch(
  "https://api.example.com/employees",
  {
    method:
      "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body:
      JSON.stringify(
        {
          name:
            "Rahul",
        }
      ),
  }
);
```

---

# 78. Common Bug — Forgetting `await response.json()` 🔥🔥🔥

Wrong:

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  const data =
    response.json();

  // Step 3:
  console.log(
    data instanceof Promise
  ); // Output: true
}
```

Output:

```text
true
```

---

# 79. Correct Parsing

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  const data =
    await response.json();

  // Step 3:
  console.log(
    data
  );
}
```

---

# 80. Common Bug — Checking Data Before Status 🔥🔥

Weak pattern:

```text
fetch
↓
parse
↓
assume success
```

Better:

```text
fetch
↓
check status
↓
parse/use response appropriately
```

Though sometimes you parse error JSON before throwing so you can show server message.

---

# 81. Common Bug — Treating 404 as Catch Automatically 🔥🔥🔥

Wrong:

```js
async function run() {
  try {
    // Step 1:
    const response =
      await fetch(
        "https://api.example.com/missing"
      );

    // Step 2:
    console.log(
      "This can still run on 404"
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      "404"
    );
  }
}
```

A normal 404 does not automatically enter `catch`.

---

# 82. Correct 404 Handling

```js
async function run() {
  try {
    // Step 1:
    const response =
      await fetch(
        "https://api.example.com/missing"
      );

    // Step 2:
    if (
      response.status
      ===
      404
    ) {
      console.log(
        "Not found"
      );

      return;
    }

    // Step 3:
    if (
      !response.ok
    ) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }
  } catch (
    error
  ) {
    // Step 4:
    console.log(
      error.message
    );
  }
}
```

---

# 83. Common Bug — Double JSON Parse

Wrong conceptual pattern:

```text
await response.json()
↓
await response.json() again
```

Body is already consumed.

Store parsed result once.

---

# 84. Common Bug — Forgetting `Content-Type`

If server expects JSON and you send JSON text without:

```text
Content-Type: application/json
```

the server may not parse it as expected.

API-specific behavior varies.

---

# 85. Common Bug — Wrong Method

Example:

```text
trying to create resource with GET
```

Usually wrong.

REST-style convention:

```text
GET
→ read

POST
→ create

PUT/PATCH
→ update

DELETE
→ remove
```

---

# 86. Common Bug — Sending Undefined Fields

```js
// Step 1:
const employee = {
  name:
    "Rahul",

  department:
    undefined,
};

// Step 2:
console.log(
  JSON.stringify(
    employee
  )
); // Output: {"name":"Rahul"}
```

Output:

```text
{"name":"Rahul"}
```

`undefined` object properties are omitted by `JSON.stringify()`.

---

# 87. Common Bug — Dates Become Strings

```js
// Step 1:
const payload = {
  createdAt:
    new Date(
      "2026-09-01T10:00:00Z"
    ),
};

// Step 2:
console.log(
  JSON.stringify(
    payload
  )
);
```

Output contains an ISO date string.

Important:

```text
JSON does not have Date type
```

---

# 88. Common Bug — BigInt Cannot Be JSON Stringified Normally 🔥🔥

```js
// Step 1:
const value =
  10n;

try {
  // Step 2:
  JSON.stringify(
    {
      value,
    }
  );
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  );
}
```

Output:

```text
TypeError
```

Convert BigInt intentionally if needed.

---

# 89. Real Employee GET Flow 🔥🔥🔥

```js
async function getEmployee(
  id
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`
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

# 90. Real Employee POST Flow 🔥🔥🔥

```js
async function createEmployee(
  employee
) {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees",
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
    response.status
    !==
    201
    &&
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

# 91. Real Employee PATCH Flow 🔥🔥🔥

```js
async function changeDepartment(
  id,
  department
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
      {
        method:
          "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            {
              department,
            }
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

# 92. Real Employee DELETE Flow

```js
async function removeEmployee(
  id
) {
  // Step 1:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
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

# 93. UI Loading Pattern 🔥🔥🔥

```js
async function loadEmployees() {
  // Step 1:
  let loading =
    true;

  try {
    // Step 2:
    const response =
      await fetch(
        "https://api.example.com/employees"
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
    const employees =
      await response.json();

    // Step 5:
    return employees;
  } finally {
    // Step 6:
    loading =
      false;

    // Step 7:
    console.log(
      loading
    ); // Output: false
  }
}
```

---

# 94. React-Style Data Loading Mental Model 🔥🔥🔥

```text
setLoading(true)
↓
fetch
↓
check response
↓
parse JSON
↓
setData(data)

catch
↓
setError(error)

finally
↓
setLoading(false)
```

---

# 95. Never Update UI With Stale Search Result 🔥🔥

For search/autocomplete:

```text
request A starts
request B starts later

B finishes first
A finishes later
```

If A updates UI last:

```text
stale results overwrite fresh results
```

Use:

```text
AbortController
request ID/version
race-condition guard
```

Full race conditions come later.

---

# 96. Fetch + `.then()` Style

```js
// Step 1:
fetch(
  "https://api.example.com/employees"
)
  .then(
    (
      response
    ) => {
      if (
        !response.ok
      ) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      // Step 2:
      return response.json();
    }
  )
  .then(
    (
      data
    ) => {
      console.log(
        data
      );
    }
  )
  .catch(
    (
      error
    ) => {
      console.log(
        error.message
      );
    }
  );
```

---

# 97. Fetch + Async/Await Style 🔥🔥🔥

```js
async function run() {
  try {
    // Step 1:
    const response =
      await fetch(
        "https://api.example.com/employees"
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
    const data =
      await response.json();

    // Step 4:
    console.log(
      data
    );
  } catch (
    error
  ) {
    // Step 5:
    console.log(
      error.message
    );
  }
}

// Step 6:
run();
```

---

# 98. Which Style Should You Use?

Both are Promise-based.

Use:

```text
.then()
```

when it is clearer.

Use:

```text
async/await
```

for readable sequential flows.

Do not mix both randomly.

---

# 99. Interview Output 1 — `fetch()` Returns Promise 🔥🔥🔥

```js
// Step 1:
const result =
  fetch(
    "https://api.example.com/employees"
  );

// Step 2:
console.log(
  result instanceof Promise
); // Output: true
```

Expected output:

```text
true
```

---

# 100. Interview Output 2 — `response.json()` Returns Promise 🔥🔥🔥

Conceptual example:

```js
async function run() {
  // Step 1:
  const response =
    await fetch(
      "https://api.example.com/employees"
    );

  // Step 2:
  const jsonPromise =
    response.json();

  // Step 3:
  console.log(
    jsonPromise instanceof Promise
  ); // Output: true
}
```

Expected output:

```text
true
```

assuming normal Fetch `Response`.

---

# 101. Interview Question — Does Fetch Reject on 404? 🔥🔥🔥

Good answer:

```text
No, not normally.

A 404 is still an HTTP response.

fetch usually fulfills with a Response object,
and response.ok is false.

You must check response.ok or response.status.
```

---

# 102. Interview Question — When Does Fetch Reject? 🔥🔥🔥

Good answer:

```text
fetch rejects when the request
cannot complete at the network/request level,
for example network failure,
request abort,
or some browser security failures.

Normal HTTP error statuses such as 404/500
usually do not reject fetch by themselves.
```

---

# 103. Interview Question — Why Two Awaits?

Good answer:

```text
The first await waits for fetch()
to produce a Response.

The second await waits for response.json()
to read and parse the response body.
```

---

# 104. Interview Question — `response.ok` vs `status` 🔥🔥🔥

Good answer:

```text
response.ok
→ convenient boolean for 200–299

response.status
→ exact numeric status code
```

Use status when specific handling is needed.

---

# 105. Interview Question — POST JSON Steps 🔥🔥🔥

Good answer:

```text
1. method: POST
2. Content-Type: application/json
3. JSON.stringify(payload)
4. await fetch()
5. check response.ok
6. parse response body
```

---

# 106. Interview Question — PUT vs PATCH

Good answer:

```text
PUT is commonly used for replacing
or fully updating a resource representation.

PATCH is commonly used for partial updates.

Exact behavior depends on API contract.
```

---

# 107. Interview Question — What Is AbortController? 🔥🔥🔥

Good answer:

```text
AbortController provides a signal
that can be passed to fetch.

Calling controller.abort()
causes the pending fetch
to reject with an abort-related error.

It is useful for cancellation,
search replacement,
unmount cleanup,
and timeout patterns.
```

---

# 108. Interview Question — How Do You Add Timeout to Fetch?

Good answer:

```text
Create an AbortController.

Start a timer.

If timer fires,
call controller.abort().

Pass controller.signal to fetch.

Clear timer in finally.
```

---

# 109. Interview Question — What Is CORS? 🔥🔥🔥

Good answer:

```text
CORS is a browser security mechanism
that controls whether frontend JavaScript
can access responses from another origin.

The server must allow the cross-origin request
using appropriate response headers.
```

---

# 110. Interview Question — Why `no-cors` Is Not a Fix?

Good answer:

```text
no-cors does not bypass server permission
in a useful normal API way.

It can produce an opaque response
that JavaScript cannot inspect normally.
```

---

# 111. Fetch Debugging Checklist 🔥🔥🔥

When fetch code fails, check:

```text
Is URL correct?

Is HTTP method correct?

Did I await fetch?

Did I check response.ok?

Did I inspect response.status?

Did I await response.json()?

Is response body actually JSON?

Did I send Content-Type correctly?

Did I JSON.stringify the body?

Are query parameters encoded?

Is authorization header correct?

Is CORS blocking browser access?

Are cookies/credentials configured?

Was request aborted?

Did I consume response body twice?

Is 204 response being parsed as JSON?

Is stale request overwriting new data?
```

---

# 112. Fetch Decision Guide 🔥🔥🔥

```text
Read resource?
→ GET

Create resource?
→ POST

Replace/full update?
→ PUT

Partial update?
→ PATCH

Delete?
→ DELETE

Send JSON?
→ Content-Type + JSON.stringify

Read JSON?
→ await response.json()

Check success?
→ response.ok

Need specific status?
→ response.status

Search/filter/pagination?
→ query parameters

Need safe query construction?
→ URLSearchParams

Need cancellation?
→ AbortController

Need timeout?
→ AbortController + timer

Need cross-origin access?
→ server CORS configuration
```

---

# 113. Final Master Practical — Employee API Client 🔥🔥🔥

```js
class HttpError
  extends Error {
  constructor(
    message,
    status
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
  }
}

async function safeJson(
  response
) {
  try {
    // Step 4:
    return await response.json();
  } catch (
    error
  ) {
    // Step 5:
    return null;
  }
}

async function requestJson(
  url,
  options = {}
) {
  // Step 6:
  const response =
    await fetch(
      url,
      options
    );

  // Step 7:
  const data =
    await safeJson(
      response
    );

  // Step 8:
  if (
    !response.ok
  ) {
    const message =
      data?.message
      ??
      `HTTP ${response.status}`;

    throw new HttpError(
      message,
      response.status
    );
  }

  // Step 9:
  return data;
}

async function getEmployees(
  search = ""
) {
  // Step 10:
  const params =
    new URLSearchParams(
      {
        search,
      }
    );

  // Step 11:
  return await requestJson(
    `https://api.example.com/employees?${params}`
  );
}

async function createEmployee(
  employee
) {
  // Step 12:
  return await requestJson(
    "https://api.example.com/employees",
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
}

async function updateEmployee(
  id,
  changes
) {
  // Step 13:
  return await requestJson(
    `https://api.example.com/employees/${id}`,
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
}

async function deleteEmployee(
  id
) {
  // Step 14:
  const response =
    await fetch(
      `https://api.example.com/employees/${id}`,
      {
        method:
          "DELETE",
      }
    );

  // Step 15:
  if (
    !response.ok
  ) {
    throw new HttpError(
      "Delete failed",
      response.status
    );
  }

  // Step 16:
  return true;
}
```

Complete flow:

```text
UI calls API function
↓
build URL / options
↓
fetch()
↓
Response
↓
read safe JSON
↓
check response.ok

success
→ return parsed data

failure
→ throw HttpError
↓
UI catch handles error
```

---

# 114. Final Master Trace — Search With Cancellation 🔥🔥🔥

```js
// Step 1:
let activeController;

async function searchEmployees(
  query
) {
  // Step 2:
  activeController?.abort();

  // Step 3:
  activeController =
    new AbortController();

  // Step 4:
  const params =
    new URLSearchParams(
      {
        q:
          query,
      }
    );

  try {
    // Step 5:
    const response =
      await fetch(
        `https://api.example.com/employees?${params}`,
        {
          signal:
            activeController.signal,
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
      console.log(
        "Old request cancelled"
      );

      return null;
    }

    // Step 9:
    throw error;
  }
}
```

Mental flow:

```text
search "ra"
↓
request A starts

search "rah"
↓
abort A
↓
request B starts

A rejection
→ ignored as expected cancellation

B completes
→ newest results shown
```

---

# 115. Final HTTP Memory Map 🔥🔥🔥

```text
GET
→ read

POST
→ create

PUT
→ replace/full update

PATCH
→ partial update

DELETE
→ remove
```

Request:

```text
URL
Method
Headers
Body
Signal
```

Response:

```text
status
ok
headers
body
```

JSON flow:

```text
JS Object
↓
JSON.stringify()
↓
request body

response body
↓
response.json()
↓
JS value
```

Error flow:

```text
Network/abort problem
→ fetch rejects

HTTP 404/500
→ fetch usually fulfills
→ response.ok false
→ throw manually
```

---

# Quick Memory 🧠🔥🔥🔥

## `fetch()`

```text
returns Promise<Response>
```

## GET

```text
default method
```

## POST

```text
create
```

## PUT

```text
replace/full update
```

## PATCH

```text
partial update
```

## DELETE

```text
remove
```

## JSON Request

```text
Content-Type: application/json
+
JSON.stringify(body)
```

## JSON Response

```text
await response.json()
```

## `response.ok`

```text
true for 200–299
```

## `response.status`

```text
exact status code
```

## 404 / 500

```text
fetch usually does NOT reject
```

## Network Failure

```text
fetch rejects
```

## Query Parameters

```text
URLSearchParams
```

## Cancellation

```text
AbortController
```

## Timeout

```text
setTimeout
+
AbortController
```

## 204

```text
No Content
do not blindly call response.json()
```

## Body

```text
normally consumed once
```

## CORS

```text
browser cross-origin security
server must allow
```

## `no-cors`

```text
not a normal CORS fix
```

## Credentials

```text
cookies/auth behavior
may require credentials option
```

## Best Fetch Pattern

```text
1. await fetch
2. check response.ok
3. inspect status when needed
4. parse body
5. return data
6. catch network/abort errors
```

## Most Important Interview Answer

```text
fetch is a Promise-based HTTP API.

fetch resolves with a Response object,
not directly with JSON.

You normally await fetch(),
check response.ok or response.status,
then await response.json().

A key difference is that
HTTP errors like 404 and 500
usually do not reject fetch automatically.

Network failures and aborted requests
can reject the fetch Promise.

Use AbortController for cancellation,
URLSearchParams for query strings,
and JSON.stringify with Content-Type
when sending JSON bodies.
```

---

# ✅ 8.6 Fetch + HTTP Complete

Completed in Section 8:

```text
8.1 Async Foundation ✅
8.2 Timers ✅
8.3 Callbacks ✅
8.4 Promises ✅
8.5 Async / Await ✅
8.6 Fetch + HTTP ✅
```

Next topic:

```text
8.7 Real API Practical 🔥🔥🔥
├── GET List
├── GET by ID
├── POST
├── PATCH
├── DELETE
├── Search
├── Pagination
├── Loading
├── Error Handling
├── Cancellation
├── Data Transformation
└── Full API Flow
```

**Next: 8.7 Real API Practical 🔥🔥🔥**
