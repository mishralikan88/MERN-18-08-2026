# 6.19 Error Handling 🔥🔥🔥

Error handling means:

```text
something goes wrong
↓
we detect it
↓
we handle it
↓
app should not crash unnecessarily
```

In JavaScript, the most important tools are:

```text
Error
throw
try
catch
finally
```

Easy mental model:

```text
risky code
↓
try
↓
error happens?
↓ yes
catch handles it
↓
finally runs at the end
```

---

# 1. What Is an Error?

An error means JavaScript could not complete something normally.

Example:

```js
// Step 1:
// JSON text is invalid.
const json =
  '{"name":"Rahul",}';

try {
  // Step 2:
  // This throws an error.
  JSON.parse(
    json
  );
} catch (
  error
) {
  // Step 3:
  // Handle the error.
  console.log(
    "Invalid JSON"
  ); // Output: Invalid JSON
}
```

Output:

```text
Invalid JSON
```

---

# 2. Why Do We Need Error Handling?

Without error handling:

```text
error occurs
↓
normal flow can stop
↓
feature may break
↓
user sees bad experience
```

With error handling:

```text
error occurs
↓
catch it
↓
show fallback / message / retry
↓
app continues safely
```

---

# 3. `try` Block 🔥🔥🔥

`try` contains code that may fail.

Syntax:

```js
try {
  // risky code
}
```

Example:

```js
try {
  // Step 1:
  // Try parsing valid JSON.
  const data =
    JSON.parse(
      '{"id":101}'
    );

  // Step 2:
  // This runs because parsing succeeded.
  console.log(
    data.id
  ); // Output: 101
} catch (
  error
) {
  console.log(
    "Something failed"
  );
}
```

Output:

```text
101
```

---

# 4. `catch` Block 🔥🔥🔥

`catch` runs when code inside `try` throws an error.

```js
try {
  // Step 1:
  // Invalid JSON causes error.
  JSON.parse(
    "{id:101}"
  );
} catch (
  error
) {
  // Step 2:
  // Control jumps here.
  console.log(
    "Parsing failed"
  ); // Output: Parsing failed
}
```

Output:

```text
Parsing failed
```

Flow:

```text
try
↓
error
↓
skip remaining try code
↓
catch
```

---

# 5. Code After the Error Inside `try` Is Skipped 🔥🔥🔥

```js
try {
  // Step 1:
  console.log(
    "A"
  ); // Output: A

  // Step 2:
  // This throws.
  JSON.parse(
    "{bad json}"
  );

  // Step 3:
  // This line is skipped.
  console.log(
    "B"
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    "C"
  ); // Output: C
}
```

Output:

```text
A
C
```

Why?

```text
A
↓
error happens
↓
B skipped
↓
catch
↓
C
```

---

# 6. Code After `catch` Continues Normally

```js
try {
  // Step 1:
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    "Handled"
  ); // Output: Handled
}

// Step 3:
// Program continues after catch.
console.log(
  "Continue"
); // Output: Continue
```

Output:

```text
Handled
Continue
```

---

# 7. The `error` Object 🔥🔥🔥

Inside `catch`, JavaScript gives us an error object.

```js
try {
  // Step 1:
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  // error is an Error-like object.
  console.log(
    error instanceof Error
  ); // Output: true
}
```

Output:

```text
true
```

---

# 8. `error.message` 🔥🔥🔥

The most useful property is usually:

```text
error.message
```

Example:

```js
try {
  // Step 1:
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  // Print human-readable message.
  console.log(
    error.message
  );
  // Output:
  // exact wording depends on JS engine
}
```

Output:

```text
A JSON parsing error message
```

Important:

```text
Exact error.message text can vary
between browsers / Node.js versions.
```

---

# 9. `error.name`

Errors also commonly have a name.

```js
try {
  // Step 1:
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: SyntaxError
}
```

Output:

```text
SyntaxError
```

---

# 10. Common Built-In Error Types — Awareness 🔥🔥

You may see:

```text
Error
TypeError
ReferenceError
SyntaxError
RangeError
```

Examples:

```text
ReferenceError
→ variable not defined

TypeError
→ invalid operation on a value

SyntaxError
→ invalid syntax / invalid JSON parse

RangeError
→ value outside allowed range
```

---

# 11. `ReferenceError` Example

```js
try {
  // Step 1:
  // unknownVariable does not exist.
  console.log(
    unknownVariable
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: ReferenceError
}
```

Output:

```text
ReferenceError
```

---

# 12. `TypeError` Example

```js
try {
  // Step 1:
  // null has no toUpperCase().
  const value =
    null;

  value.toUpperCase();
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

---

# 13. `SyntaxError` Example

```js
try {
  // Step 1:
  // Invalid JSON syntax.
  JSON.parse(
    '{"name":"Rahul",}'
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: SyntaxError
}
```

Output:

```text
SyntaxError
```

---

# 14. `throw` 🔥🔥🔥

`throw` lets us create an error ourselves.

Example requirement:

```text
Age must be at least 18.
```

Code:

```js
function validateAge(
  age
) {
  // Step 1:
  // Check invalid age.
  if (
    age < 18
  ) {
    // Step 2:
    // Throw our own error.
    throw new Error(
      "Age must be at least 18"
    );
  }

  // Step 3:
  // Return true if valid.
  return true;
}

try {
  // Step 4:
  validateAge(
    16
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: Age must be at least 18
}
```

Output:

```text
Age must be at least 18
```

---

# 15. Why Use `throw`?

Use `throw` when:

```text
JavaScript itself does not know
your business rule is invalid
```

Example:

```text
salary = -5000
```

JavaScript allows that number.

But your application may say:

```text
salary cannot be negative
```

So you throw your own error.

---

# 16. `throw new Error()` 🔥🔥🔥

Preferred pattern:

```js
throw new Error(
  "Something went wrong"
);
```

Example:

```js
function divide(
  a,
  b
) {
  // Step 1:
  // Prevent division by zero
  // based on our business rule.
  if (
    b === 0
  ) {
    throw new Error(
      "Cannot divide by zero"
    );
  }

  // Step 2:
  return (
    a / b
  );
}

try {
  // Step 3:
  console.log(
    divide(
      10,
      0
    )
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.message
  ); // Output: Cannot divide by zero
}
```

Output:

```text
Cannot divide by zero
```

---

# 17. `throw` Stops Current Function Flow 🔥🔥🔥

```js
function processUser(
  user
) {
  // Step 1:
  if (
    !user
  ) {
    // Step 2:
    // Function stops here.
    throw new Error(
      "User is required"
    );
  }

  // Step 3:
  // This does not run for invalid user.
  console.log(
    "Processing user"
  );
}

try {
  // Step 4:
  processUser(
    null
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: User is required
}
```

Output:

```text
User is required
```

---

# 18. Throwing Without `new Error()` — Awareness

JavaScript technically allows:

```js
throw "Something failed";
```

But better practice is:

```js
throw new Error(
  "Something failed"
);
```

Why?

```text
Error object gives:
name
message
stack
better debugging
```

---

# 19. `finally` 🔥🔥🔥

`finally` runs whether an error happens or not.

```js
try {
  // Step 1:
  console.log(
    "Try"
  ); // Output: Try
} catch (
  error
) {
  console.log(
    "Catch"
  );
} finally {
  // Step 2:
  console.log(
    "Finally"
  ); // Output: Finally
}
```

Output:

```text
Try
Finally
```

---

# 20. `finally` Also Runs When Error Happens

```js
try {
  // Step 1:
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    "Catch"
  ); // Output: Catch
} finally {
  // Step 3:
  console.log(
    "Finally"
  ); // Output: Finally
}
```

Output:

```text
Catch
Finally
```

---

# 21. Why Use `finally`?

Typical use cases:

```text
hide loading spinner
close connection
release resource
cleanup
reset temporary state
```

Mental model:

```text
success or failure
↓
finally
↓
cleanup
```

---

# 22. `try-catch-finally` Full Flow 🔥🔥🔥

```js
try {
  // Step 1:
  console.log(
    "Start"
  ); // Output: Start

  // Step 2:
  throw new Error(
    "Failed"
  );

  // Step 3:
  // Skipped.
  console.log(
    "After error"
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    error.message
  ); // Output: Failed
} finally {
  // Step 5:
  console.log(
    "Cleanup"
  ); // Output: Cleanup
}

// Step 6:
console.log(
  "Continue"
); // Output: Continue
```

Output:

```text
Start
Failed
Cleanup
Continue
```

---

# 23. Validation Example — Required Field 🔥🔥🔥

```js
function validateName(
  name
) {
  // Step 1:
  // Remove extra outer spaces.
  const cleaned =
    name.trim();

  // Step 2:
  // Empty value is invalid.
  if (
    cleaned === ""
  ) {
    throw new Error(
      "Name is required"
    );
  }

  // Step 3:
  return cleaned;
}

try {
  // Step 4:
  validateName(
    "   "
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: Name is required
}
```

Output:

```text
Name is required
```

---

# 24. Validation Example — Salary

```js
function validateSalary(
  salary
) {
  // Step 1:
  if (
    salary < 0
  ) {
    // Step 2:
    throw new Error(
      "Salary cannot be negative"
    );
  }

  // Step 3:
  return salary;
}

try {
  // Step 4:
  validateSalary(
    -5000
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: Salary cannot be negative
}
```

Output:

```text
Salary cannot be negative
```

---

# 25. Safe JSON Parsing 🔥🔥🔥

Very practical.

```js
function safeParse(
  value
) {
  try {
    // Step 1:
    // Try converting JSON text to JS value.
    return JSON.parse(
      value
    );
  } catch (
    error
  ) {
    // Step 2:
    // Safe fallback.
    return null;
  }
}

// Step 3: Valid JSON.
console.log(
  safeParse(
    '{"id":101}'
  )
); // Output: { id: 101 }

// Step 4: Invalid JSON.
console.log(
  safeParse(
    "{id:101}"
  )
); // Output: null
```

Output:

```text
{ id: 101 }
null
```

---

# 26. Safe Property Processing

```js
function getUpperName(
  user
) {
  try {
    // Step 1:
    // This may fail if name is missing/null.
    return user.name.toUpperCase();
  } catch (
    error
  ) {
    // Step 2:
    // Provide fallback.
    return "UNKNOWN";
  }
}

console.log(
  getUpperName(
    {
      name: "Rahul",
    }
  )
); // Output: RAHUL

console.log(
  getUpperName(
    {
      name: null,
    }
  )
); // Output: UNKNOWN
```

Output:

```text
RAHUL
UNKNOWN
```

Important:

```text
For simple missing-property cases,
optional chaining/default values
may be cleaner than try-catch.

Use try-catch for actual risky operations.
```

---

# 27. Do Not Use `try-catch` for Normal `if` Logic 🔥🔥

Bad idea:

```text
Use errors for every small condition.
```

Better:

```js
function getDiscount(
  isMember
) {
  // Step 1:
  // Normal condition.
  if (
    isMember
  ) {
    return 10;
  }

  // Step 2:
  return 0;
}

console.log(
  getDiscount(
    true
  )
); // Output: 10
```

Output:

```text
10
```

Use errors for exceptional/invalid situations, not ordinary branching.

---

# 28. Catch Specific Error Types — Awareness 🔥🔥

```js
try {
  // Step 1:
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  if (
    error instanceof SyntaxError
  ) {
    console.log(
      "Invalid syntax"
    ); // Output: Invalid syntax
  } else {
    console.log(
      "Unknown error"
    );
  }
}
```

Output:

```text
Invalid syntax
```

---

# 29. Re-Throwing an Error 🔥🔥

Sometimes we handle part of the error, then throw it again.

```js
function parseConfig(
  json
) {
  try {
    // Step 1:
    return JSON.parse(
      json
    );
  } catch (
    error
  ) {
    // Step 2:
    console.log(
      "Config parse failed"
    ); // Output: Config parse failed

    // Step 3:
    // Pass the error upward.
    throw error;
  }
}

try {
  // Step 4:
  parseConfig(
    "{bad}"
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    "Handled by caller"
  ); // Output: Handled by caller
}
```

Output:

```text
Config parse failed
Handled by caller
```

---

# 30. Error Propagation Mental Model 🔥🔥🔥

```text
function C throws
↓
C does not catch
↓
goes to caller B
↓
B does not catch
↓
goes to caller A
↓
A catches
```

Example:

```js
function level3() {
  // Step 1:
  throw new Error(
    "Level 3 failed"
  );
}

function level2() {
  // Step 2:
  level3();
}

function level1() {
  // Step 3:
  level2();
}

try {
  // Step 4:
  level1();
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: Level 3 failed
}
```

Output:

```text
Level 3 failed
```

---

# 31. Custom Error Basics 🔥🔥🔥

We can create our own error class.

```js
class ValidationError
  extends Error {
  constructor(
    message
  ) {
    // Step 1:
    // Call Error constructor.
    super(
      message
    );

    // Step 2:
    // Give custom name.
    this.name =
      "ValidationError";
  }
}
```

Usage:

```js
class ValidationError
  extends Error {
  constructor(
    message
  ) {
    super(
      message
    );

    this.name =
      "ValidationError";
  }
}

try {
  // Step 1:
  throw new ValidationError(
    "Email is invalid"
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: ValidationError

  // Step 3:
  console.log(
    error.message
  ); // Output: Email is invalid
}
```

Output:

```text
ValidationError
Email is invalid
```

---

# 32. Why Custom Errors?

Useful when you want to distinguish:

```text
ValidationError
NetworkError
AuthenticationError
PermissionError
```

Then calling code can handle each differently.

---

# 33. Custom Error Example — Employee Validation 🔥🔥🔥

```js
class ValidationError
  extends Error {
  constructor(
    message
  ) {
    super(
      message
    );

    this.name =
      "ValidationError";
  }
}

function validateEmployee(
  employee
) {
  // Step 1:
  if (
    !employee.name
  ) {
    // Step 2:
    throw new ValidationError(
      "Employee name is required"
    );
  }

  // Step 3:
  return true;
}

try {
  // Step 4:
  validateEmployee(
    {
      name: "",
    }
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.name
  ); // Output: ValidationError

  // Step 6:
  console.log(
    error.message
  ); // Output: Employee name is required
}
```

Output:

```text
ValidationError
Employee name is required
```

---

# 34. Machine Coding — Form Validation With Errors 🔥🔥🔥

Requirement:

```text
name required
age must be 18+
```

```js
function validateForm(
  form
) {
  // Step 1:
  // Validate name.
  if (
    !form.name
    ||
    form.name.trim() === ""
  ) {
    throw new Error(
      "Name is required"
    );
  }

  // Step 2:
  // Validate age.
  if (
    form.age < 18
  ) {
    throw new Error(
      "Age must be at least 18"
    );
  }

  // Step 3:
  // Return valid result.
  return true;
}

try {
  // Step 4:
  const result =
    validateForm(
      {
        name: "Rahul",
        age: 17,
      }
    );

  console.log(
    result
  );
} catch (
  error
) {
  // Step 5:
  console.log(
    error.message
  ); // Output: Age must be at least 18
}
```

Output:

```text
Age must be at least 18
```

---

# 35. Machine Coding — Safe API Response Parser 🔥🔥🔥

Suppose API gives JSON text.

```js
function parseApiResponse(
  json
) {
  try {
    // Step 1:
    // Parse response.
    const response =
      JSON.parse(
        json
      );

    // Step 2:
    // Validate expected structure.
    if (
      !Array.isArray(
        response.data
      )
    ) {
      throw new Error(
        "Invalid API data"
      );
    }

    // Step 3:
    return response.data;
  } catch (
    error
  ) {
    // Step 4:
    // Safe fallback.
    return [];
  }
}

// Step 5:
console.log(
  parseApiResponse(
    '{"data":[1,2,3]}'
  )
); // Output: [1, 2, 3]

// Step 6:
console.log(
  parseApiResponse(
    '{"data":"wrong"}'
  )
); // Output: []
```

Output:

```text
[1, 2, 3]
[]
```

---

# 36. Machine Coding — Loading State Cleanup With `finally` 🔥🔥🔥

Mental example:

```text
start loading
↓
try risky work
↓
success or error
↓
finally
↓
stop loading
```

Code:

```js
let loading =
  false;

function loadData() {
  try {
    // Step 1:
    loading =
      true;

    console.log(
      loading
    ); // Output: true

    // Step 2:
    // Simulate failure.
    throw new Error(
      "Load failed"
    );
  } catch (
    error
  ) {
    // Step 3:
    console.log(
      error.message
    ); // Output: Load failed
  } finally {
    // Step 4:
    // Always reset loading.
    loading =
      false;

    console.log(
      loading
    ); // Output: false
  }
}

// Step 5:
loadData();
```

Output:

```text
true
Load failed
false
```

---

# 37. Return Inside `try` + `finally` Awareness 🔥🔥

`finally` still runs even when `try` returns.

```js
function getValue() {
  try {
    // Step 1:
    return "result";
  } finally {
    // Step 2:
    // Still runs before function finishes.
    console.log(
      "cleanup"
    ); // Output: cleanup
  }
}

// Step 3:
console.log(
  getValue()
); // Output: result
```

Output:

```text
cleanup
result
```

---

# 38. Avoid Returning From `finally` 🔥🔥

Returning from `finally` can override earlier returns/errors.

Avoid patterns like:

```js
function risky() {
  try {
    return "A";
  } finally {
    return "B";
  }
}
```

Because:

```js
console.log(
  risky()
); // Output: B
```

Output:

```text
B
```

Practical rule:

```text
Use finally for cleanup.
Avoid return inside finally.
```

---

# 39. Error Stack — Awareness

Error objects often contain:

```text
error.stack
```

Useful for debugging where the error came from.

Example:

```js
try {
  // Step 1:
  throw new Error(
    "Something failed"
  );
} catch (
  error
) {
  // Step 2:
  console.log(
    typeof error.stack
  ); // Output: string
}
```

Output:

```text
string
```

Exact stack text depends on environment.

---

# 40. Logging Errors Properly

Instead of only:

```js
console.log(
  "Failed"
);
```

during development, useful info can include:

```js
console.error(
  error
);
```

Or:

```js
console.error(
  error.message
);
```

Production apps may send errors to monitoring systems.

---

# 41. Error Message for User vs Developer 🔥🔥🔥

Developer error:

```text
TypeError: Cannot read properties of undefined...
```

User-friendly message:

```text
Unable to load employee details.
Please try again.
```

Practical rule:

```text
developer
→ detailed technical error

user
→ simple helpful message
```

---

# 42. Interview Output — Basic `try-catch`

```js
try {
  // Step 1:
  console.log(
    "A"
  ); // Output: A

  // Step 2:
  throw new Error(
    "X"
  );

  // Step 3:
  // Skipped.
  console.log(
    "B"
  );
} catch (
  error
) {
  // Step 4:
  console.log(
    "C"
  ); // Output: C
}
```

Output:

```text
A
C
```

---

# 43. Interview Output — `finally`

```js
try {
  // Step 1:
  console.log(
    "A"
  ); // Output: A
} catch (
  error
) {
  console.log(
    "B"
  );
} finally {
  // Step 2:
  console.log(
    "C"
  ); // Output: C
}
```

Output:

```text
A
C
```

---

# 44. Interview Output — Error + Finally

```js
try {
  // Step 1:
  console.log(
    "A"
  ); // Output: A

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
  ); // Output: B
} finally {
  // Step 4:
  console.log(
    "C"
  ); // Output: C
}
```

Output:

```text
A
B
C
```

---

# 45. Interview Question — `throw` vs `return` 🔥🔥🔥

`return`:

```text
normal function result
```

`throw`:

```text
abnormal/error path
```

Example:

```js
function getAge(
  age
) {
  // Step 1:
  if (
    age < 0
  ) {
    // Step 2:
    throw new Error(
      "Invalid age"
    );
  }

  // Step 3:
  return age;
}
```

Memory:

```text
return
→ success path

throw
→ error path
```

---

# 46. Interview Question — Does `finally` Always Run?

Normally, yes:

```text
success
→ finally

error caught
→ finally

return inside try
→ finally still runs
```

For normal interview discussion, remember:

```text
finally is for cleanup
and runs regardless of success/failure
```

---

# 47. Debugging — Empty `catch` Block 🔥🔥

Bad:

```js
try {
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // nothing
}
```

Problem:

```text
error disappears
↓
hard to debug
```

Better:

```js
try {
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 1:
  console.error(
    error.message
  );
}
```

---

# 48. Debugging — Catching Too Much

Bad idea:

```text
wrap huge unrelated sections
inside one giant try-catch
```

Why?

```text
hard to know what failed
hard to recover correctly
```

Better:

```text
keep try block focused
around the risky operation
```

---

# 49. Debugging — Throwing Generic Errors Everywhere

Instead of:

```js
throw new Error(
  "Error"
);
```

prefer useful context:

```js
throw new Error(
  "Employee ID is required"
);
```

Good error messages make debugging faster.

---

# 50. Practical Decision Guide 🔥🔥🔥

```text
Risky operation?
→ try

Need handle failure?
→ catch

Need create your own failure?
→ throw

Need standard error object?
→ new Error(message)

Need cleanup regardless of result?
→ finally

Need inspect message?
→ error.message

Need inspect error type?
→ error.name

Need custom application error?
→ class extends Error

Need pass error upward?
→ throw error

Need safe fallback?
→ catch and return fallback
```

---

# 51. Most Important Error Handling Rules 🔥🔥🔥

```text
try
→ contains risky code

catch
→ handles thrown error

throw
→ creates/raises an error

Error
→ standard error object

finally
→ cleanup code
→ runs after try/catch

error.message
→ human-readable message

error.name
→ error type name

Common built-ins:
TypeError
ReferenceError
SyntaxError
RangeError

throw stops normal flow.

Code after a throw
inside the same flow
does not continue.

Errors propagate upward
until something catches them.

Custom errors:
class MyError extends Error

Use try-catch for exceptional situations,
not normal if/else logic.

Keep try blocks focused.

Do not silently swallow errors.

Use helpful error messages.
```

---

# Quick Memory 🧠

Basic:

```js
try {
  // Step 1:
  // Risky operation.
  JSON.parse(
    "{bad}"
  );
} catch (
  error
) {
  // Step 2:
  // Handle failure.
  console.log(
    "Invalid JSON"
  ); // Output: Invalid JSON
}
```

Output:

```text
Invalid JSON
```

Throw:

```js
function validateAge(
  age
) {
  // Step 1:
  if (
    age < 18
  ) {
    // Step 2:
    throw new Error(
      "Age must be at least 18"
    );
  }

  // Step 3:
  return true;
}
```

Finally:

```js
try {
  // Step 1:
  console.log(
    "work"
  ); // Output: work
} finally {
  // Step 2:
  console.log(
    "cleanup"
  ); // Output: cleanup
}
```

Output:

```text
work
cleanup
```

Custom Error:

```js
class ValidationError
  extends Error {
  constructor(
    message
  ) {
    // Step 1:
    super(
      message
    );

    // Step 2:
    this.name =
      "ValidationError";
  }
}
```

Most important flow:

```text
try
↓
risky code
↓
error?
├── no  → continue
└── yes → catch
          ↓
        handle
↓
finally
↓
cleanup
```

## ✅ 6.19 Error Handling complete

**JavaScript Core topics remaining after this: 1**

```text
6.20 Core Practical 🔥🔥🔥
```

And **6.20 Core Practical** is the final Core chapter with the locked **60-question practical set**.

After 6.20:

```text
Section 6 — JavaScript Core ✅ COMPLETE
↓
Section 7 — JavaScript Internals 🔥🔥🔥
```

**Next: 6.20 Core Practical 🔥🔥🔥**
