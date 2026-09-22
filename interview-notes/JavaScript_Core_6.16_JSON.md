# 6.16 JSON 🔥🔥🔥

JSON is one of the most important formats in frontend/full-stack work because APIs usually send and receive data as JSON.

Easy mental model:

```text
JavaScript Object
→ used inside JavaScript code

JSON String
→ used to send/store data as text
```

The most important flow is:

```text
JavaScript Object
↓ JSON.stringify()
JSON String

JSON String
↓ JSON.parse()
JavaScript Object
```

---

# 1. What Is JSON?

JSON means:

```text
JavaScript Object Notation
```

It is a text format used to represent structured data.

Example JSON:

```json
{
  "name": "Rahul",
  "age": 30
}
```

### Easy Explanation

JSON looks similar to a JavaScript object, but JSON is text.

---

# 2. JavaScript Object vs JSON 🔥🔥🔥

JavaScript object:

```js
// Step 1: Create a normal JavaScript object.
const user = {
  name: "Rahul",
  age: 30,
};

// Step 2: Check its type.
console.log(
  typeof user
); // Output: object
```

Output:

```text
object
```

JSON string:

```js
// Step 1: Store JSON as text.
const json =
  '{"name":"Rahul","age":30}';

// Step 2: Check its type.
console.log(
  typeof json
); // Output: string
```

Output:

```text
string
```

### Easy Memory

```text
Object
→ actual JavaScript data structure

JSON
→ string/text representation
```

---

# 3. Why Do We Need JSON?

Suppose frontend needs to send this object to backend:

```js
const employee = {
  id: 101,
  name: "Rahul",
};
```

Usually it is converted to JSON text before transmission.

Flow:

```text
JavaScript object
↓
JSON.stringify()
↓
JSON string
↓
HTTP request body
```

---

# 4. `JSON.stringify()` 🔥🔥🔥

Use `JSON.stringify()` to convert JavaScript data into a JSON string.

```js
// Step 1: Create a JavaScript object.
const user = {
  name: "Rahul",
  age: 30,
};

// Step 2: Convert object to JSON string.
const json =
  JSON.stringify(
    user
  );

// Step 3: Print result.
console.log(
  json
); // Output: {"name":"Rahul","age":30}

// Step 4: Check type.
console.log(
  typeof json
); // Output: string
```

Output:

```text
{"name":"Rahul","age":30}
string
```

---

# 5. Object → JSON String Flow 🔥🔥🔥

```js
// Step 1: Create JavaScript object.
const employee = {
  id: 101,
  name: "Amit",
};

// Step 2: Convert it to JSON text.
const payload =
  JSON.stringify(
    employee
  );

// Step 3: Print payload.
console.log(
  payload
); // Output: {"id":101,"name":"Amit"}
```

Output:

```text
{"id":101,"name":"Amit"}
```

Flow:

```text
Object
↓ JSON.stringify()
String
```

---

# 6. `JSON.parse()` 🔥🔥🔥

Use `JSON.parse()` to convert JSON text back into JavaScript data.

```js
// Step 1: Start with JSON string.
const json =
  '{"name":"Rahul","age":30}';

// Step 2: Convert string to JavaScript object.
const user =
  JSON.parse(
    json
  );

// Step 3: Read object property.
console.log(
  user.name
); // Output: Rahul

// Step 4: Check result type.
console.log(
  typeof user
); // Output: object
```

Output:

```text
Rahul
object
```

---

# 7. JSON String → Object Flow 🔥🔥🔥

```js
// Step 1: Imagine this JSON came from storage/API.
const json =
  '{"id":101,"name":"Rahul"}';

// Step 2: Parse the JSON string.
const employee =
  JSON.parse(
    json
  );

// Step 3: Work with it as normal JavaScript object.
console.log(
  employee.id
); // Output: 101

console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
101
Rahul
```

Flow:

```text
JSON String
↓ JSON.parse()
JavaScript Object
```

---

# 8. Full Round Trip 🔥🔥🔥

```js
// Step 1: Start with JavaScript object.
const original = {
  id: 101,
  name: "Rahul",
};

// Step 2: Convert object to JSON string.
const json =
  JSON.stringify(
    original
  );

// Step 3: Convert JSON string back to object.
const restored =
  JSON.parse(
    json
  );

// Step 4: Print values.
console.log(
  json
); // Output: {"id":101,"name":"Rahul"}

console.log(
  restored.name
); // Output: Rahul
```

Output:

```text
{"id":101,"name":"Rahul"}
Rahul
```

Flow:

```text
Object
↓ stringify
JSON String
↓ parse
Object
```

---

# 9. JSON Property Names Use Double Quotes 🔥🔥🔥

Valid JSON:

```json
{
  "name": "Rahul",
  "age": 30
}
```

Invalid JSON:

```text
{
  name: "Rahul"
}
```

### Easy Explanation

In JSON:

```text
property names
→ double quotes required
```

---

# 10. JSON Strings Use Double Quotes

Valid:

```json
{
  "name": "Rahul"
}
```

Invalid:

```text
{
  "name": 'Rahul'
}
```

### Easy Explanation

Standard JSON uses double quotes.

---

# 11. JSON Supports Numbers

```js
// Step 1: JSON text contains a number.
const json =
  '{"salary":50000}';

// Step 2: Parse it.
const data =
  JSON.parse(
    json
  );

// Step 3: Check value and type.
console.log(
  data.salary
); // Output: 50000

console.log(
  typeof data.salary
); // Output: number
```

Output:

```text
50000
number
```

---

# 12. JSON Supports Booleans

```js
// Step 1: JSON contains boolean true.
const json =
  '{"active":true}';

// Step 2: Parse.
const data =
  JSON.parse(
    json
  );

// Step 3: Read boolean.
console.log(
  data.active
); // Output: true

console.log(
  typeof data.active
); // Output: boolean
```

Output:

```text
true
boolean
```

---

# 13. JSON Supports `null`

```js
// Step 1: JSON contains null.
const json =
  '{"manager":null}';

// Step 2: Parse.
const data =
  JSON.parse(
    json
  );

// Step 3: Read value.
console.log(
  data.manager
); // Output: null
```

Output:

```text
null
```

---

# 14. JSON Supports Arrays 🔥🔥🔥

```js
// Step 1: JSON string represents an array.
const json =
  '["React","Node","JavaScript"]';

// Step 2: Parse JSON.
const skills =
  JSON.parse(
    json
  );

// Step 3: Check array.
console.log(
  Array.isArray(
    skills
  )
); // Output: true

// Step 4: Read item.
console.log(
  skills[0]
); // Output: React
```

Output:

```text
true
React
```

---

# 15. JavaScript Array → JSON String

```js
// Step 1: Create JavaScript array.
const skills = [
  "React",
  "Node",
  "JavaScript",
];

// Step 2: Convert array to JSON string.
const json =
  JSON.stringify(
    skills
  );

// Step 3: Print.
console.log(
  json
); // Output: ["React","Node","JavaScript"]
```

Output:

```text
["React","Node","JavaScript"]
```

---

# 16. Nested JSON 🔥🔥🔥

JSON can contain nested objects.

```js
// Step 1: Create nested JSON string.
const json =
  `{
    "id": 101,
    "name": "Rahul",
    "address": {
      "city": "Hyderabad",
      "country": "India"
    }
  }`;

// Step 2: Parse it.
const employee =
  JSON.parse(
    json
  );

// Step 3: Access nested property.
console.log(
  employee.address.city
); // Output: Hyderabad
```

Output:

```text
Hyderabad
```

---

# 17. Nested Arrays Inside JSON

```js
// Step 1: JSON contains nested array.
const json =
  `{
    "name": "Rahul",
    "skills": [
      "React",
      "Node"
    ]
  }`;

// Step 2: Parse JSON.
const user =
  JSON.parse(
    json
  );

// Step 3: Read first skill.
console.log(
  user.skills[0]
); // Output: React
```

Output:

```text
React
```

---

# 18. Complex API-Style JSON 🔥🔥🔥

```js
// Step 1: Imagine backend sends this JSON text.
const json =
  `{
    "success": true,
    "data": [
      {
        "id": 101,
        "name": "Rahul"
      },
      {
        "id": 102,
        "name": "Amit"
      }
    ]
  }`;

// Step 2: Parse JSON into JavaScript object.
const response =
  JSON.parse(
    json
  );

// Step 3: Access nested API data.
console.log(
  response.data[1].name
); // Output: Amit
```

Output:

```text
Amit
```

---

# 19. API Response Handling Mental Model 🔥🔥🔥

Think:

```text
Backend
↓
JSON data
↓
Frontend receives/parses it
↓
JavaScript object/array
↓
map/filter/reduce
↓
UI
```

Example:

```js
// Step 1: Parsed API response.
const response = {
  success: true,
  data: [
    {
      id: 1,
      name: "Rahul",
    },
    {
      id: 2,
      name: "Amit",
    },
  ],
};

// Step 2: Extract names.
const names =
  response.data.map(
    ({ name }) =>
      name
  );

// Step 3: Print.
console.log(
  names
); // Output: ["Rahul", "Amit"]
```

Output:

```text
["Rahul", "Amit"]
```

---

# 20. `fetch()` Usually Gives Response Object First — Awareness

Typical flow:

```text
fetch()
↓
Response object
↓ response.json()
JavaScript data
```

Example shape:

```js
// Step 1: Fetch API.
fetch(
  "/api/employees"
)
  .then(
    (response) => {
      // Step 2: Convert response body
      // from JSON into JavaScript data.
      return response.json();
    }
  )
  .then(
    (data) => {
      // Step 3: Work with parsed JavaScript data.
      console.log(
        data
      );
    }
  );
```

### Easy Explanation

`response.json()` parses JSON for us.

We will study `fetch()` deeply in Async JavaScript.

---

# 21. POST Request Body Uses `JSON.stringify()` 🔥🔥🔥

Typical pattern:

```js
const employee = {
  name: "Rahul",
  role: "Developer",
};

// Step 1: Convert JavaScript object
// into JSON string for request body.
const body =
  JSON.stringify(
    employee
  );

// Step 2: Check type.
console.log(
  typeof body
); // Output: string
```

Output:

```text
string
```

Flow:

```text
JavaScript object
↓ JSON.stringify()
request body string
```

---

# 22. `Content-Type: application/json` — Awareness

Typical HTTP request:

```js
fetch(
  "/api/employees",
  {
    method: "POST",

    headers: {
      // Step 1:
      // Tell backend that request body contains JSON.
      "Content-Type":
        "application/json",
    },

    // Step 2:
    // Convert JavaScript object to JSON string.
    body:
      JSON.stringify(
        {
          name: "Rahul",
        }
      ),
  }
);
```

### Easy Explanation

Header says:

```text
This request body contains JSON.
```

---

# 23. `JSON.stringify()` Does Not Mutate Original Object

```js
// Step 1: Create object.
const user = {
  name: "Rahul",
};

// Step 2: Convert to JSON.
const json =
  JSON.stringify(
    user
  );

// Step 3: Original object still exists unchanged.
console.log(
  user.name
); // Output: Rahul

console.log(
  typeof user
); // Output: object

console.log(
  typeof json
); // Output: string
```

Output:

```text
Rahul
object
string
```

---

# 24. `JSON.parse()` Creates New Object 🔥🔥🔥

```js
// Step 1: Create original object.
const original = {
  name: "Rahul",
};

// Step 2: Convert to JSON.
const json =
  JSON.stringify(
    original
  );

// Step 3: Parse into a new object.
const copy =
  JSON.parse(
    json
  );

// Step 4: Compare object references.
console.log(
  original === copy
); // Output: false
```

Output:

```text
false
```

### Easy Explanation

The data looks the same, but `copy` is a new object reference.

---

# 25. `undefined` in Objects Is Omitted 🔥🔥🔥

```js
// Step 1: Object contains undefined property.
const user = {
  name: "Rahul",
  age: undefined,
};

// Step 2: Convert to JSON.
const json =
  JSON.stringify(
    user
  );

// Step 3: Print.
console.log(
  json
); // Output: {"name":"Rahul"}
```

Output:

```text
{"name":"Rahul"}
```

### Easy Explanation

`undefined` object properties are not represented in JSON.

---

# 26. Functions in Objects Are Omitted

```js
// Step 1: Object contains a function.
const user = {
  name: "Rahul",

  greet() {
    return "Hi";
  },
};

// Step 2: Convert to JSON.
const json =
  JSON.stringify(
    user
  );

// Step 3: Function is omitted.
console.log(
  json
); // Output: {"name":"Rahul"}
```

Output:

```text
{"name":"Rahul"}
```

---

# 27. Symbols Are Not Normal JSON Data

```js
// Step 1: Create object with Symbol value.
const data = {
  id: 1,
  value:
    Symbol(
      "x"
    ),
};

// Step 2: Convert to JSON.
const json =
  JSON.stringify(
    data
  );

// Step 3: Symbol-valued property is omitted.
console.log(
  json
); // Output: {"id":1}
```

Output:

```text
{"id":1}
```

---

# 28. `undefined` Inside Arrays Becomes `null` 🔥🔥

```js
// Step 1: Array contains undefined.
const values = [
  1,
  undefined,
  3,
];

// Step 2: Convert array to JSON.
const json =
  JSON.stringify(
    values
  );

// Step 3: Print.
console.log(
  json
); // Output: [1,null,3]
```

Output:

```text
[1,null,3]
```

### Important Difference

```text
undefined in object
→ property omitted

undefined in array
→ null
```

---

# 29. `NaN` and `Infinity` Become `null`

```js
// Step 1: Create array.
const values = [
  NaN,
  Infinity,
  -Infinity,
];

// Step 2: Convert to JSON.
const json =
  JSON.stringify(
    values
  );

// Step 3: Print.
console.log(
  json
); // Output: [null,null,null]
```

Output:

```text
[null,null,null]
```

---

# 30. Date Object With `JSON.stringify()` 🔥🔥🔥

Dates are converted to ISO strings.

```js
// Step 1: Create object containing Date.
const data = {
  createdAt:
    new Date(
      "2026-08-24T10:30:00Z"
    ),
};

// Step 2: Convert object to JSON.
const json =
  JSON.stringify(
    data
  );

// Step 3: Print.
console.log(
  json
);
// Output:
// {"createdAt":"2026-08-24T10:30:00.000Z"}
```

Output:

```text
{"createdAt":"2026-08-24T10:30:00.000Z"}
```

### Easy Explanation

Date object:

```text
Date
↓ stringify
ISO string
```

---

# 31. Parsed Date Comes Back as String 🔥🔥🔥

```js
// Step 1: JSON contains date text.
const json =
  '{"createdAt":"2026-08-24T10:30:00.000Z"}';

// Step 2: Parse JSON.
const data =
  JSON.parse(
    json
  );

// Step 3: Check createdAt type.
console.log(
  typeof data.createdAt
); // Output: string
```

Output:

```text
string
```

### Important

`JSON.parse()` does not automatically recreate a Date object.

---

# 32. Convert Parsed Date String Back to Date

```js
// Step 1: Parse JSON.
const data =
  JSON.parse(
    '{"createdAt":"2026-08-24T10:30:00.000Z"}'
  );

// Step 2: createdAt is currently string.
console.log(
  typeof data.createdAt
); // Output: string

// Step 3: Convert string to Date object manually.
const createdAt =
  new Date(
    data.createdAt
  );

// Step 4: Verify.
console.log(
  createdAt instanceof Date
); // Output: true
```

Output:

```text
string
true
```

Flow:

```text
Date object
↓ stringify
ISO string
↓ parse
string
↓ new Date()
Date object
```

---

# 33. Invalid JSON Throws Error 🔥🔥🔥

```js
const invalidJson =
  '{"name":"Rahul",}';

try {
  // Step 1: Try parsing invalid JSON.
  const data =
    JSON.parse(
      invalidJson
    );

  console.log(
    data
  );
} catch (
  error
) {
  // Step 2: Parsing failed.
  console.log(
    "Invalid JSON"
  ); // Output: Invalid JSON
}
```

Output:

```text
Invalid JSON
```

### Easy Explanation

`JSON.parse()` expects valid JSON syntax.

---

# 34. Safe JSON Parsing Pattern 🔥🔥🔥

```js
function safeParse(
  value
) {
  try {
    // Step 1: Try parsing JSON.
    const result =
      JSON.parse(
        value
      );

    // Step 2: Return parsed data if valid.
    return result;
  } catch (
    error
  ) {
    // Step 3: Return null if invalid.
    return null;
  }
}

// Step 4: Valid JSON.
console.log(
  safeParse(
    '{"id":1}'
  )
); // Output: { id: 1 }

// Step 5: Invalid JSON.
console.log(
  safeParse(
    "{id:1}"
  )
); // Output: null
```

Output:

```text
{ id: 1 }
null
```

---

# 35. Pretty Printing JSON 🔥🔥

`JSON.stringify()` can format JSON for readability.

```js
// Step 1: Create object.
const user = {
  name: "Rahul",
  age: 30,
};

// Step 2:
// Third argument 2 means
// indent using 2 spaces.
const json =
  JSON.stringify(
    user,
    null,
    2
  );

// Step 3: Print formatted JSON.
console.log(
  json
);
```

Output:

```json
{
  "name": "Rahul",
  "age": 30
}
```

### Practical Use

Useful for:

```text
debugging
logs
config files
displaying JSON
```

---

# 36. `JSON.stringify()` Replacer — Awareness

You can choose which properties are included.

```js
const user = {
  id: 101,
  name: "Rahul",
  password: "secret",
};

// Step 1:
// Include only selected properties.
const json =
  JSON.stringify(
    user,
    [
      "id",
      "name",
    ]
  );

// Step 2: Print.
console.log(
  json
); // Output: {"id":101,"name":"Rahul"}
```

Output:

```text
{"id":101,"name":"Rahul"}
```

### Easy Explanation

`password` was excluded.

---

# 37. `JSON.parse()` Reviver — Awareness

A reviver can transform values while parsing.

```js
const json =
  '{"age":30}';

// Step 1: Parse JSON.
// Step 2: Reviver sees every key/value.
const data =
  JSON.parse(
    json,
    (
      key,
      value
    ) => {
      // Step 3: Modify age during parsing.
      if (
        key === "age"
      ) {
        return (
          value + 1
        );
      }

      // Step 4: Keep other values unchanged.
      return value;
    }
  );

// Step 5: Print transformed age.
console.log(
  data.age
); // Output: 31
```

Output:

```text
31
```

Low-priority awareness, but useful to know.

---

# 38. JSON Deep Clone Pattern — Awareness 🔥🔥

A common old pattern:

```js
// Step 1: Create nested object.
const original = {
  user: {
    name: "Rahul",
  },
};

// Step 2: Convert object to JSON string.
const json =
  JSON.stringify(
    original
  );

// Step 3: Parse it back into a new object.
const copy =
  JSON.parse(
    json
  );

// Step 4: Compare nested references.
console.log(
  original.user
  ===
  copy.user
); // Output: false
```

Output:

```text
false
```

### Important

This is not a perfect general deep-clone solution.

Modern JavaScript often prefers:

```js
structuredClone()
```

when supported and appropriate.

---

# 39. Why JSON Clone Can Lose Data 🔥🔥🔥

```js
// Step 1: Create object with Date and undefined.
const original = {
  createdAt:
    new Date(
      "2026-08-24T10:30:00Z"
    ),
  optional:
    undefined,
};

// Step 2: JSON stringify + parse.
const copy =
  JSON.parse(
    JSON.stringify(
      original
    )
  );

// Step 3: Date became string.
console.log(
  typeof copy.createdAt
); // Output: string

// Step 4: undefined property disappeared.
console.log(
  "optional"
  in copy
); // Output: false
```

Output:

```text
string
false
```

### Easy Explanation

JSON cloning can change or drop unsupported JavaScript values.

---

# 40. Circular Reference Error 🔥🔥🔥

JSON cannot directly stringify circular objects.

```js
// Step 1: Create object.
const user = {
  name: "Rahul",
};

// Step 2: Make object point to itself.
user.self =
  user;

try {
  // Step 3: Try JSON conversion.
  JSON.stringify(
    user
  );
} catch (
  error
) {
  // Step 4: It fails.
  console.log(
    "Circular reference"
  ); // Output: Circular reference
}
```

Output:

```text
Circular reference
```

---

# 41. JSON and Local Storage — Practical Awareness 🔥🔥

Browser storage stores strings.

So object flow is usually:

```text
Object
↓ JSON.stringify()
String
↓ localStorage

localStorage string
↓ JSON.parse()
Object
```

Example:

```js
const settings = {
  theme: "dark",
  pageSize: 20,
};

// Step 1: Convert object to JSON text.
const value =
  JSON.stringify(
    settings
  );

// Step 2: value is now suitable for string storage.
console.log(
  typeof value
); // Output: string
```

Output:

```text
string
```

Storage itself is covered later in browser practical topics.

---

# 42. Machine Coding — Save Form Draft 🔥🔥🔥

Problem:

```text
User fills a form.
We want to serialize the draft before storing/sending.
```

```js
const formData = {
  name: "Rahul",
  role: "Developer",
  skills: [
    "React",
    "Node",
  ],
};

// Step 1: Start with normal JavaScript object.
console.log(
  typeof formData
); // Output: object

// Step 2: Convert form object to JSON string.
const serialized =
  JSON.stringify(
    formData
  );

// Step 3: Serialized value is now text.
console.log(
  typeof serialized
); // Output: string

// Step 4: Restore it later.
const restored =
  JSON.parse(
    serialized
  );

// Step 5: Work with restored object.
console.log(
  restored.skills[0]
); // Output: React
```

Output:

```text
object
string
React
```

Complete flow:

```text
form object
↓ stringify
JSON string
↓ store/send
↓ parse
form object again
```

---

# 43. Machine Coding — Parse API Configuration Safely 🔥🔥🔥

Problem:

```text
Configuration arrives as JSON string.
Invalid config should not crash the app.
```

```js
function parseConfig(
  json
) {
  try {
    // Step 1: Parse config.
    const config =
      JSON.parse(
        json
      );

    // Step 2: Return parsed object.
    return config;
  } catch (
    error
  ) {
    // Step 3: Use safe fallback.
    return {};
  }
}

// Step 4: Valid config.
const config =
  parseConfig(
    '{"pageSize":20}'
  );

// Step 5: Read property.
console.log(
  config.pageSize
); // Output: 20
```

Output:

```text
20
```

Flow:

```text
JSON string
↓
try parse
↓
valid? object
invalid? fallback
```

---

# 44. Machine Coding — Prepare API Payload 🔥🔥🔥

Problem:

```text
UI has employee object.
Backend expects JSON request body.
```

```js
function createEmployeePayload(
  employee
) {
  // Step 1: Receive JavaScript object.
  // Example:
  // { name: "Rahul", role: "Developer" }

  // Step 2: Convert object to JSON string.
  const body =
    JSON.stringify(
      employee
    );

  // Step 3: Return request-ready body.
  return body;
}

// Step 4: Create payload.
const payload =
  createEmployeePayload(
    {
      name: "Rahul",
      role: "Developer",
    }
  );

// Step 5: Print payload.
console.log(
  payload
);
// Output:
// {"name":"Rahul","role":"Developer"}
```

Output:

```text
{"name":"Rahul","role":"Developer"}
```

Complete flow:

```text
UI object
↓
JSON.stringify()
↓
JSON request body
↓
backend
```

---

# 45. Interview Output — `typeof JSON.stringify()`

```js
// Step 1: Create object.
const user = {
  id: 1,
};

// Step 2: Stringify.
const result =
  JSON.stringify(
    user
  );

// Step 3: Check type.
console.log(
  typeof result
); // Output: string
```

Output:

```text
string
```

---

# 46. Interview Output — `typeof JSON.parse()`

```js
// Step 1: Parse JSON object text.
const result =
  JSON.parse(
    '{"id":1}'
  );

// Step 2: Check type.
console.log(
  typeof result
); // Output: object
```

Output:

```text
object
```

---

# 47. Interview Output — Parse JSON Array

```js
// Step 1: Parse JSON array.
const result =
  JSON.parse(
    '[1,2,3]'
  );

// Step 2: typeof arrays is object.
console.log(
  typeof result
); // Output: object

// Step 3: Correct array check.
console.log(
  Array.isArray(
    result
  )
); // Output: true
```

Output:

```text
object
true
```

---

# 48. Interview Question — `JSON.stringify()` vs `JSON.parse()` 🔥🔥🔥

Good answer:

```text
JSON.stringify()
→ JavaScript value to JSON string

JSON.parse()
→ JSON string to JavaScript value
```

Memory:

```text
Object
↓ stringify
String

String
↓ parse
Object
```

---

# 49. Interview Question — Is JSON the Same as a JavaScript Object?

No.

Good answer:

```text
A JavaScript object is an in-memory JavaScript value.

JSON is a text format used to represent data.
```

Example:

```js
const object = {
  name: "Rahul",
};

const json =
  '{"name":"Rahul"}';

// Step 1: Compare types.
console.log(
  typeof object
); // Output: object

console.log(
  typeof json
); // Output: string
```

Output:

```text
object
string
```

---

# 50. Interview Question — What Values Does JSON Support?

JSON supports:

```text
string
number
boolean
null
object
array
```

JSON does not directly represent:

```text
undefined
function
Symbol
BigInt
Map
Set
Date object as Date
```

Some of these are omitted, transformed, or cause errors during `JSON.stringify()`.

---

# 51. BigInt With JSON — Interview Trap 🔥🔥

```js
try {
  // Step 1: Try to stringify BigInt.
  JSON.stringify(
    {
      id:
        10n,
    }
  );
} catch (
  error
) {
  // Step 2: Standard JSON.stringify
  // cannot directly serialize BigInt.
  console.log(
    "BigInt error"
  ); // Output: BigInt error
}
```

Output:

```text
BigInt error
```

---

# 52. Map With `JSON.stringify()` — Awareness 🔥🔥

```js
// Step 1: Create Map.
const map =
  new Map(
    [
      [
        "name",
        "Rahul",
      ],
    ]
  );

// Step 2: Stringify Map directly.
const json =
  JSON.stringify(
    map
  );

// Step 3: Print.
console.log(
  json
); // Output: {}
```

Output:

```text
{}
```

### Why?

JSON does not directly understand Map entries.

---

# 53. Convert Map Before JSON

```js
// Step 1: Create Map.
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

// Step 2: Convert Map to normal object.
const object =
  Object.fromEntries(
    map
  );

// Step 3: Convert object to JSON.
const json =
  JSON.stringify(
    object
  );

// Step 4: Print.
console.log(
  json
);
// Output:
// {"name":"Rahul","age":30}
```

Output:

```text
{"name":"Rahul","age":30}
```

Flow:

```text
Map
↓ Object.fromEntries()
Object
↓ JSON.stringify()
JSON String
```

---

# 54. Set With `JSON.stringify()` — Awareness

```js
// Step 1: Create Set.
const set =
  new Set(
    [1, 2, 3]
  );

// Step 2: Stringify Set directly.
const json =
  JSON.stringify(
    set
  );

// Step 3: Print.
console.log(
  json
); // Output: {}
```

Output:

```text
{}
```

---

# 55. Convert Set Before JSON

```js
// Step 1: Create Set.
const set =
  new Set(
    [1, 2, 3]
  );

// Step 2: Convert Set to array.
const array =
  [...set];

// Step 3: Convert array to JSON.
const json =
  JSON.stringify(
    array
  );

// Step 4: Print.
console.log(
  json
); // Output: [1,2,3]
```

Output:

```text
[1,2,3]
```

Flow:

```text
Set
↓ [...]
Array
↓ JSON.stringify()
JSON String
```

---

# 56. Debugging — Using `JSON.parse()` on an Object

Wrong:

```js
const user = {
  name: "Rahul",
};

try {
  // Step 1: JSON.parse expects JSON text,
  // not a normal object.
  JSON.parse(
    user
  );
} catch (
  error
) {
  // Step 2: Parsing fails.
  console.log(
    "Parse error"
  ); // Output: Parse error
}
```

Output:

```text
Parse error
```

Correct mental model:

```text
Object
→ stringify

String
→ parse
```

---

# 57. Debugging — Double Stringify 🔥🔥

```js
// Step 1: Create object.
const user = {
  name: "Rahul",
};

// Step 2: Stringify once.
const once =
  JSON.stringify(
    user
  );

// Step 3: Stringify the resulting string again.
const twice =
  JSON.stringify(
    once
  );

// Step 4: Print.
console.log(
  once
); // Output: {"name":"Rahul"}

console.log(
  twice
); // Output contains escaped quotes
```

Output:

```text
{"name":"Rahul"}
"{\"name\":\"Rahul\"}"
```

### Easy Explanation

Second stringify serializes the JSON string itself.

---

# 58. Debugging — Forgetting to Parse Stored JSON

```js
// Step 1: Imagine storage gives this string.
const stored =
  '{"name":"Rahul"}';

// Step 2: This is still a string.
console.log(
  stored.name
); // Output: undefined

// Step 3: Parse it.
const user =
  JSON.parse(
    stored
  );

// Step 4: Now property access works.
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
undefined
Rahul
```

---

# 59. Practical Decision Guide 🔥🔥🔥

```text
Need JavaScript object → JSON text?
→ JSON.stringify()

Need JSON text → JavaScript object?
→ JSON.parse()

Need pretty JSON?
→ JSON.stringify(value, null, 2)

Need parse without crashing?
→ try/catch

Need send POST body?
→ JSON.stringify(object)

Need receive JSON with fetch?
→ response.json()

Need Map in JSON?
→ Map → Object/Array first

Need Set in JSON?
→ Set → Array first

Need Date after JSON.parse?
→ new Date(parsedDateString)
```

---

# 60. Most Important JSON Rules 🔥🔥🔥

```text
JSON is text.

JavaScript object is not JSON.

JSON.stringify()
→ JavaScript value to JSON string.

JSON.parse()
→ JSON string to JavaScript value.

JSON property names use double quotes.

JSON supports:
string
number
boolean
null
object
array

undefined/function/Symbol
are not normal JSON values.

Date becomes ISO string.

Parsed Date stays string
until you call new Date().

Invalid JSON causes JSON.parse() to throw.

Map and Set should be converted
before JSON serialization.

JSON is heavily used in:
APIs
storage
config
request bodies
response data
```

---

# Quick Memory 🧠

Object → JSON:

```js
const user = {
  name: "Rahul",
};

// Step 1: Convert object to JSON string.
const json =
  JSON.stringify(
    user
  );

console.log(
  json
); // Output: {"name":"Rahul"}
```

Output:

```text
{"name":"Rahul"}
```

JSON → Object:

```js
const json =
  '{"name":"Rahul"}';

// Step 1: Parse JSON string.
const user =
  JSON.parse(
    json
  );

// Step 2: Read property.
console.log(
  user.name
); // Output: Rahul
```

Output:

```text
Rahul
```

Pretty JSON:

```js
const json =
  JSON.stringify(
    {
      name: "Rahul",
    },
    null,
    2
  );

console.log(
  json
);
```

Output:

```json
{
  "name": "Rahul"
}
```

Safe parse:

```js
function safeParse(
  value
) {
  try {
    // Step 1: Try parsing.
    return JSON.parse(
      value
    );
  } catch (
    error
  ) {
    // Step 2: Safe fallback.
    return null;
  }
}
```

Date round trip:

```text
Date object
↓ JSON.stringify()
ISO string inside JSON
↓ JSON.parse()
normal string
↓ new Date()
Date object again
```

Most important interview traps:

```text
Object vs JSON
stringify vs parse
undefined behavior
Date becomes string
invalid JSON throws
Map/Set stringify to {}
BigInt serialization error
double stringify
```

## ✅ 6.16 JSON complete

**JavaScript Core topics remaining after this: 4**

```text
6.17 Modules
6.18 Regex
6.19 Error Handling
6.20 Core Practical
```

**Next: 6.17 Modules 🔥🔥🔥**
