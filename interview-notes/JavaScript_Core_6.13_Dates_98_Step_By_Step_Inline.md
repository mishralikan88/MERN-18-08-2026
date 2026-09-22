# 6.13 Dates 🔥🔥🔥

JavaScript Dates are used when an application works with time-related data.

Examples:

```text
current date/time
API timestamps
createdAt / updatedAt
expiry checks
deadlines
sorting by date
age calculation
date filters
latest / oldest records
machine coding
```

The most important Date flow is:

```text
API STRING
"2026-08-24T10:30:00Z"

        ↓ new Date(...)

DATE OBJECT

        ↓ getTime()

TIMESTAMP NUMBER

        ↓ new Date(timestamp)

DATE OBJECT

        ↓ toISOString() / toLocaleDateString()

STRING AGAIN
```

---

# 1. Create Current Date and Time 🔥🔥

```js
// Step 1: Call the Date constructor without arguments.
// This means: create a Date for the current moment.
const now = new Date();

// Step 2: Print the Date object.
console.log(now);
```

Output looks similar to:

```text
Mon Aug 24 2026 16:45:00 GMT+0530
```

Meaning:

```text
new Date()
→ current date
+ current time
```

---

# 2. `Date` Is an Object

```js
// Step 1: Create a Date object.
const now = new Date();

// Step 2: Check its JavaScript type.
console.log(
  typeof now
);

// Step 3: Check whether it came from Date.
console.log(
  now instanceof Date
);
```

Output:

```text
object
true
```

Meaning:

```text
Date
→ object
```

---

# 3. Why We Need Dates

```js
// Step 1: Imagine this came from an API.
const employee = {
  id: 1,
  name: "Rahul",
  joinedAt:
    "2026-08-24T10:30:00Z",
};

// Step 2: joinedAt is currently only a string.
console.log(
  typeof employee.joinedAt
);
```

Output:

```text
string
```

We usually convert it to a Date when we need:

```text
sorting
comparison
formatting
date calculations
```

---

# 4. ISO Date String 🔥🔥🔥

```js
// Step 1: Store an ISO date-time string.
const value =
  "2026-08-24T10:30:00Z";

// Step 2: It is still just text.
console.log(
  typeof value
);
```

Output:

```text
string
```

ISO breakdown:

```text
2026        → year
08          → month
24          → date
10:30:00    → time
Z           → UTC
```

---

# 5. ISO String → Date Object 🔥🔥🔥

```js
// Step 1: API gives us a string.
const apiDate =
  "2026-08-24T10:30:00Z";

// Step 2: Convert that string into a Date object.
const date =
  new Date(
    apiDate
  );

// Step 3: Confirm that the result is now an object.
console.log(
  typeof date
);

// Step 4: Confirm it is specifically a Date object.
console.log(
  date instanceof Date
);
```

Output:

```text
object
true
```

Flow:

```text
String
↓ new Date(...)
Date object
```

---

# 6. Date Object → ISO String 🔥🔥🔥

```js
// Step 1: Create a Date object.
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Convert the Date object back to an ISO string.
const iso =
  date.toISOString();

// Step 3: Print the string.
console.log(
  iso
);

// Step 4: Confirm the result is now a string.
console.log(
  typeof iso
);
```

Output:

```text
2026-08-24T10:30:00.000Z
string
```

Flow:

```text
Date object
↓ toISOString()
String
```

---

# 7. Full String → Object → String Flow 🔥🔥🔥

```js
// Step 1: API sends a string.
const apiValue =
  "2026-08-24T10:30:00Z";

// Step 2: Convert string to Date object.
const dateObject =
  new Date(
    apiValue
  );

// Step 3: Work with the Date object.
// Here we simply read the year.
const year =
  dateObject.getFullYear();

// Step 4: Convert Date object back to an ISO string.
const backToString =
  dateObject.toISOString();

// Step 5: Print everything.
console.log(
  year
);

console.log(
  backToString
);
```

Output:

```text
2026
2026-08-24T10:30:00.000Z
```

Flow:

```text
API string
↓
Date object
↓
work with date
↓
string again
```

---

# 8. Create Date With Numbers

```js
// Step 1: Pass year, monthIndex, and day.
// Month 7 means August.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Read year.
console.log(
  date.getFullYear()
);

// Step 3: Read month index.
console.log(
  date.getMonth()
);

// Step 4: Read day of month.
console.log(
  date.getDate()
);
```

Output:

```text
2026
7
24
```

---

# 9. Month Is Zero-Based 🔥🔥🔥

```js
// Step 1: Create January 1, 2026.
// January uses month index 0.
const january =
  new Date(
    2026,
    0,
    1
  );

// Step 2: Read the month index.
console.log(
  january.getMonth()
);
```

Output:

```text
0
```

Remember:

```text
January → 0
August → 7
December → 11
```

---

# 10. Human Month vs JavaScript Month

```js
// Step 1: Create August 24, 2026.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: JavaScript month index.
const jsMonth =
  date.getMonth();

// Step 3: Convert it to normal human month numbering.
const humanMonth =
  jsMonth + 1;

// Step 4: Print both.
console.log(
  jsMonth
);

console.log(
  humanMonth
);
```

Output:

```text
7
8
```

---

# 11. `Date.now()` 🔥🔥🔥

```js
// Step 1: Get current timestamp.
const timestamp =
  Date.now();

// Step 2: Print it.
console.log(
  timestamp
);

// Step 3: Check its type.
console.log(
  typeof timestamp
);
```

Output:

```text
a large number
number
```

Meaning:

```text
milliseconds since
January 1, 1970 UTC
```

---

# 12. Timestamp Mental Model

```js
// Step 1: Get timestamp for current time.
const now =
  Date.now();

// Step 2: Check that it is a finite number.
console.log(
  Number.isFinite(
    now
  )
);
```

Output:

```text
true
```

Think:

```text
1970
↓
milliseconds increase
↓
current moment
```

---

# 13. `getTime()` 🔥🔥🔥

```js
// Step 1: Create a Date object.
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Convert Date object into a timestamp.
const timestamp =
  date.getTime();

// Step 3: Print its type.
console.log(
  typeof timestamp
);
```

Output:

```text
number
```

Flow:

```text
Date object
↓ getTime()
timestamp
```

---

# 14. `Date.now()` vs `getTime()`

```js
// Step 1: Current timestamp.
const currentTimestamp =
  Date.now();

// Step 2: Create a specific Date.
const joinedDate =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 3: Timestamp of that specific Date.
const joinedTimestamp =
  joinedDate.getTime();

// Step 4: Print both types.
console.log(
  typeof currentTimestamp
);

console.log(
  typeof joinedTimestamp
);
```

Output:

```text
number
number
```

Difference:

```text
Date.now()
→ now

date.getTime()
→ that specific Date
```

---

# 15. Timestamp → Date Object 🔥🔥🔥

```js
// Step 1: Convert ISO string to Date.
const originalDate =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Convert Date to timestamp.
const timestamp =
  originalDate.getTime();

// Step 3: Convert timestamp back to Date object.
const dateAgain =
  new Date(
    timestamp
  );

// Step 4: Convert back to readable ISO string.
console.log(
  dateAgain.toISOString()
);
```

Output:

```text
2026-08-24T10:30:00.000Z
```

Flow:

```text
String
→ Date
→ Timestamp
→ Date
→ String
```

---

# 16. `getFullYear()`

```js
// Step 1: Create a Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Extract year.
const year =
  date.getFullYear();

// Step 3: Print year.
console.log(
  year
);
```

Output:

```text
2026
```

---

# 17. `getMonth()` 🔥🔥🔥

```js
// Step 1: Create August 24, 2026.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Read zero-based month.
const month =
  date.getMonth();

// Step 3: Print it.
console.log(
  month
);
```

Output:

```text
7
```

---

# 18. `getDate()` 🔥🔥

```js
// Step 1: Create August 24.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Read day of month.
const dayOfMonth =
  date.getDate();

// Step 3: Print it.
console.log(
  dayOfMonth
);
```

Output:

```text
24
```

---

# 19. `getDay()` 🔥🔥🔥

```js
// Step 1: Create Monday, August 24, 2026.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Read weekday index.
// Sunday = 0, Monday = 1, ..., Saturday = 6.
const weekday =
  date.getDay();

// Step 3: Print it.
console.log(
  weekday
);
```

Output:

```text
1
```

---

# 20. `getDate()` vs `getDay()` 🔥🔥🔥

```js
// Step 1: Create a Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Day of month.
const dateNumber =
  date.getDate();

// Step 3: Day of week.
const weekDay =
  date.getDay();

// Step 4: Print both.
console.log(
  dateNumber
);

console.log(
  weekDay
);
```

Output:

```text
24
1
```

Meaning:

```text
24 → day of month
1  → Monday
```

---

# 21. Time Getters

```js
// Step 1: Create a Date with local time 15:45:30.
const date =
  new Date(
    2026,
    7,
    24,
    15,
    45,
    30
  );

// Step 2: Read hour.
const hour =
  date.getHours();

// Step 3: Read minute.
const minute =
  date.getMinutes();

// Step 4: Read second.
const second =
  date.getSeconds();

// Step 5: Print them.
console.log(
  hour,
  minute,
  second
);
```

Output:

```text
15 45 30
```

---

# 22. UTC Getters

```js
// Step 1: Create a UTC timestamp.
// Z means UTC.
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Read UTC hour.
const utcHour =
  date.getUTCHours();

// Step 3: Print it.
console.log(
  utcHour
);
```

Output:

```text
10
```

---

# 23. Local Time vs UTC 🔥🔥🔥

```js
// Step 1: Create a Date from UTC timestamp.
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Read UTC hour.
const utcHour =
  date.getUTCHours();

// Step 3: Read local hour.
const localHour =
  date.getHours();

// Step 4: Print both.
console.log(
  utcHour
);

console.log(
  localHour
);
```

Output:

```text
10
depends on local timezone
```

Flow:

```text
same Date object
↓
UTC view
or
local-time view
```

---

# 24. `toISOString()` 🔥🔥🔥

```js
// Step 1: Create Date object.
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Convert Date object to ISO string.
const iso =
  date.toISOString();

// Step 3: Print it.
console.log(
  iso
);
```

Output:

```text
2026-08-24T10:30:00.000Z
```

---

# 25. `toISOString()` Is UTC

```js
// Step 1: Create a Date object.
const date =
  new Date(
    "2026-08-24T10:30:00Z"
  );

// Step 2: Convert to ISO.
// ISO output always uses UTC.
const result =
  date.toISOString();

// Step 3: Print.
console.log(
  result
);
```

Output:

```text
2026-08-24T10:30:00.000Z
```

`Z` means:

```text
UTC
```

---

# 26. `toDateString()`

```js
// Step 1: Create a Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Convert only date portion to readable string.
const result =
  date.toDateString();

// Step 3: Print it.
console.log(
  result
);
```

Output:

```text
Mon Aug 24 2026
```

---

# 27. `toTimeString()`

```js
// Step 1: Create Date with local time.
const date =
  new Date(
    2026,
    7,
    24,
    15,
    30
  );

// Step 2: Convert time portion to string.
const result =
  date.toTimeString();

// Step 3: Print it.
console.log(
  result
);
```

Output looks similar to:

```text
15:30:00 GMT+0530
```

---

# 28. `toLocaleDateString()` 🔥🔥🔥

```js
// Step 1: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Format date for Indian English.
const formatted =
  date.toLocaleDateString(
    "en-IN"
  );

// Step 3: Print formatted date.
console.log(
  formatted
);
```

Possible output:

```text
24/8/2026
```

---

# 29. Locale Formatting With Options 🔥🔥🔥

```js
// Step 1: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Tell JavaScript exactly how to display it.
const formatted =
  date.toLocaleDateString(
    "en-IN",
    {
      // Two-digit day.
      day: "2-digit",

      // Short month name.
      month: "short",

      // Full year.
      year: "numeric",
    }
  );

// Step 3: Print formatted result.
console.log(
  formatted
);
```

Output looks similar to:

```text
24 Aug 2026
```

---

# 30. `toLocaleString()` 🔥🔥

```js
// Step 1: Create Date with time.
const date =
  new Date(
    2026,
    7,
    24,
    15,
    30
  );

// Step 2: Format both date and time.
const formatted =
  date.toLocaleString(
    "en-IN"
  );

// Step 3: Print it.
console.log(
  formatted
);
```

Output looks similar to:

```text
24/8/2026, 3:30:00 pm
```

---

# 31. `Intl.DateTimeFormat()` Awareness

```js
// Step 1: Create reusable formatter.
const formatter =
  new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

// Step 2: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 3: Use formatter on Date.
const result =
  formatter.format(
    date
  );

// Step 4: Print result.
console.log(
  result
);
```

Output looks similar to:

```text
24 Aug 2026
```

---

# 32. Date Setters

```js
// Step 1: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Change day of month to 15.
date.setDate(
  15
);

// Step 3: Read changed day.
console.log(
  date.getDate()
);
```

Output:

```text
15
```

---

# 33. Date Objects Are Mutable 🔥🔥🔥

```js
// Step 1: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Mutate same object.
date.setDate(
  25
);

// Step 3: Read the new value.
console.log(
  date.getDate()
);
```

Output:

```text
25
```

Meaning:

```text
Date object
→ mutable
```

---

# 34. Copy Date Before Mutation 🔥🔥

```js
// Step 1: Create original Date.
const original =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Get original timestamp.
const timestamp =
  original.getTime();

// Step 3: Build a new Date from that timestamp.
const copy =
  new Date(
    timestamp
  );

// Step 4: Change only the copy.
copy.setDate(
  25
);

// Step 5: Print both.
console.log(
  original.getDate()
);

console.log(
  copy.getDate()
);
```

Output:

```text
24
25
```

---

# 35. Add Days to a Date 🔥🔥🔥

```js
function addDays(
  input,
  days
) {
  // Step 1: Clone/convert the input into a new Date.
  const date =
    new Date(
      input
    );

  // Step 2: Read the current day of month.
  const currentDay =
    date.getDate();

  // Step 3: Add the requested number of days.
  const newDay =
    currentDay + days;

  // Step 4: Set the new day back into the Date.
  date.setDate(
    newDay
  );

  // Step 5: Return the updated Date.
  return date;
}

// Step 6: Call the function.
const result =
  addDays(
    new Date(
      2026,
      7,
      24
    ),
    5
  );

// Step 7: Read final day.
console.log(
  result.getDate()
);
```

Output:

```text
29
```

Flow:

```text
24
↓ +5
29
```

---

# 36. Subtract Days

```js
function subtractDays(
  input,
  days
) {
  // Step 1: Convert/clone input.
  const date =
    new Date(
      input
    );

  // Step 2: Read current day.
  const currentDay =
    date.getDate();

  // Step 3: Subtract requested days.
  const newDay =
    currentDay - days;

  // Step 4: Update Date.
  date.setDate(
    newDay
  );

  // Step 5: Return Date.
  return date;
}

const result =
  subtractDays(
    new Date(
      2026,
      7,
      24
    ),
    4
  );

console.log(
  result.getDate()
);
```

Output:

```text
20
```

---

# 37. JavaScript Handles Month Rollover

```js
// Step 1: Create August 30.
const date =
  new Date(
    2026,
    7,
    30
  );

// Step 2: Read current day.
const currentDay =
  date.getDate();

// Step 3: Add 5 days.
date.setDate(
  currentDay + 5
);

// Step 4: Read resulting month and date.
console.log(
  date.getMonth()
);

console.log(
  date.getDate()
);
```

Output:

```text
8
4
```

Meaning:

```text
September 4
```

---

# 38. Date Difference in Milliseconds 🔥🔥🔥

```js
// Step 1: Create start Date.
const start =
  new Date(
    "2026-08-01T00:00:00Z"
  );

// Step 2: Create end Date.
const end =
  new Date(
    "2026-08-02T00:00:00Z"
  );

// Step 3: Convert start to timestamp.
const startTime =
  start.getTime();

// Step 4: Convert end to timestamp.
const endTime =
  end.getTime();

// Step 5: Subtract timestamps.
const difference =
  endTime - startTime;

// Step 6: Print difference in milliseconds.
console.log(
  difference
);
```

Output:

```text
86400000
```

---

# 39. Millisecond Conversion Constants

```js
// Step 1: 1 second = 1000 milliseconds.
const SECOND =
  1000;

// Step 2: 1 minute = 60 seconds.
const MINUTE =
  60 * SECOND;

// Step 3: 1 hour = 60 minutes.
const HOUR =
  60 * MINUTE;

// Step 4: 1 day = 24 hours.
const DAY =
  24 * HOUR;

// Step 5: Print values.
console.log(
  SECOND,
  MINUTE,
  HOUR,
  DAY
);
```

Output:

```text
1000 60000 3600000 86400000
```

---

# 40. Days Between Dates 🔥🔥🔥

```js
function daysBetween(
  start,
  end
) {
  // Step 1: Convert start string/value to Date.
  const startDate =
    new Date(
      start
    );

  // Step 2: Convert end string/value to Date.
  const endDate =
    new Date(
      end
    );

  // Step 3: Convert start Date to timestamp.
  const startTime =
    startDate.getTime();

  // Step 4: Convert end Date to timestamp.
  const endTime =
    endDate.getTime();

  // Step 5: Find difference in milliseconds.
  const diff =
    endTime - startTime;

  // Step 6: Convert milliseconds to days.
  const days =
    diff /
    (
      1000 *
      60 *
      60 *
      24
    );

  // Step 7: Return days.
  return days;
}

console.log(
  daysBetween(
    "2026-08-01T00:00:00Z",
    "2026-08-05T00:00:00Z"
  )
);
```

Output:

```text
4
```

Flow:

```text
Date 1
↓ timestamp

Date 2
↓ timestamp

subtract
↓ milliseconds

divide
↓ days
```

---

# 41. Absolute Date Difference

```js
// Step 1: Create two Dates.
const a =
  new Date(
    "2026-08-05T00:00:00Z"
  );

const b =
  new Date(
    "2026-08-01T00:00:00Z"
  );

// Step 2: Find timestamp difference.
const rawDifference =
  b.getTime()
  -
  a.getTime();

// Step 3: Remove negative sign.
const absoluteDifference =
  Math.abs(
    rawDifference
  );

// Step 4: Convert to days.
const days =
  absoluteDifference /
  86400000;

// Step 5: Print.
console.log(
  days
);
```

Output:

```text
4
```

---

# 42. Difference in Hours

```js
function hoursBetween(
  start,
  end
) {
  // Step 1: Convert start to timestamp.
  const startTime =
    new Date(
      start
    ).getTime();

  // Step 2: Convert end to timestamp.
  const endTime =
    new Date(
      end
    ).getTime();

  // Step 3: Find milliseconds difference.
  const diff =
    endTime - startTime;

  // Step 4: Convert milliseconds to hours.
  return (
    diff /
    (
      1000 *
      60 *
      60
    )
  );
}

console.log(
  hoursBetween(
    "2026-08-24T10:00:00Z",
    "2026-08-24T15:00:00Z"
  )
);
```

Output:

```text
5
```

---

# 43. Date Subtraction 🔥🔥🔥

```js
// Step 1: Create later Date.
const end =
  new Date(
    "2026-08-24T00:00:00Z"
  );

// Step 2: Create earlier Date.
const start =
  new Date(
    "2026-08-20T00:00:00Z"
  );

// Step 3: Subtract Date objects.
// JavaScript converts them to numeric timestamps.
const diff =
  end - start;

// Step 4: Convert milliseconds to days.
console.log(
  diff /
  86400000
);
```

Output:

```text
4
```

---

# 44. Date Addition Trap 🔥🔥🔥

```js
// Step 1: Create Date object.
const date =
  new Date(
    "2026-08-24T00:00:00Z"
  );

// Step 2: Add a number with +.
// Date can become a string in this operation.
const badResult =
  date + 1000;

// Step 3: Check type.
console.log(
  typeof badResult
);
```

Output:

```text
string
```

Correct:

```js
// Step 1: Create Date.
const date =
  new Date(
    "2026-08-24T00:00:00Z"
  );

// Step 2: Convert Date to timestamp.
const timestamp =
  date.getTime();

// Step 3: Add 1000 milliseconds.
const newTimestamp =
  timestamp + 1000;

// Step 4: Convert timestamp back to Date.
const newDate =
  new Date(
    newTimestamp
  );

// Step 5: Convert Date to ISO string.
console.log(
  newDate.toISOString()
);
```

Output:

```text
2026-08-24T00:00:01.000Z
```

---

# 45. Compare Dates With `<` and `>`

```js
// Step 1: Create earlier Date.
const start =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 2: Create later Date.
const end =
  new Date(
    "2026-02-01T00:00:00Z"
  );

// Step 3: Compare them.
const result =
  start < end;

// Step 4: Print result.
console.log(
  result
);
```

Output:

```text
true
```

---

# 46. Date Object Equality Trap 🔥🔥🔥

```js
// Step 1: Create first Date object.
const a =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 2: Create another Date object with same value.
const b =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 3: Compare object references.
console.log(
  a === b
);
```

Output:

```text
false
```

Meaning:

```text
same date value
but
different objects
```

---

# 47. Correct Date Equality 🔥🔥🔥

```js
// Step 1: Create two Date objects.
const a =
  new Date(
    "2026-01-01T00:00:00Z"
  );

const b =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 2: Convert both to timestamps.
const aTime =
  a.getTime();

const bTime =
  b.getTime();

// Step 3: Compare numeric values.
console.log(
  aTime === bTime
);
```

Output:

```text
true
```

---

# 48. Sort Dates Ascending 🔥🔥🔥

```js
const employees = [
  {
    name: "Rahul",
    joinedAt:
      "2026-03-10T00:00:00Z",
  },
  {
    name: "Amit",
    joinedAt:
      "2025-12-01T00:00:00Z",
  },
];

// Step 1: Create a new sorted array.
const sorted =
  employees.toSorted(
    (a, b) => {
      // Step 2: Convert a.joinedAt to timestamp.
      const aTime =
        new Date(
          a.joinedAt
        ).getTime();

      // Step 3: Convert b.joinedAt to timestamp.
      const bTime =
        new Date(
          b.joinedAt
        ).getTime();

      // Step 4: Smaller timestamp first.
      return (
        aTime - bTime
      );
    }
  );

// Step 5: Show final order.
console.log(
  sorted.map(
    ({ name }) => name
  )
);
```

Output:

```text
["Amit", "Rahul"]
```

Flow:

```text
date strings
↓
timestamps
↓
compare
↓
oldest first
```

---

# 49. Sort Dates Descending 🔥🔥🔥

```js
const employees = [
  {
    name: "Rahul",
    joinedAt:
      "2026-03-10T00:00:00Z",
  },
  {
    name: "Amit",
    joinedAt:
      "2025-12-01T00:00:00Z",
  },
];

// Step 1: Sort into a new array.
const sorted =
  employees.toSorted(
    (a, b) => {
      // Step 2: Convert both strings to timestamps.
      const aTime =
        new Date(
          a.joinedAt
        ).getTime();

      const bTime =
        new Date(
          b.joinedAt
        ).getTime();

      // Step 3: Larger timestamp first.
      return (
        bTime - aTime
      );
    }
  );

// Step 4: Show order.
console.log(
  sorted.map(
    ({ name }) => name
  )
);
```

Output:

```text
["Rahul", "Amit"]
```

---

# 50. Find Latest Date 🔥🔥🔥

```js
const dates = [
  "2026-01-01T00:00:00Z",
  "2026-05-10T00:00:00Z",
  "2026-03-15T00:00:00Z",
];

// Step 1: Convert each date string to timestamp.
const timestamps =
  dates.map(
    (value) =>
      new Date(
        value
      ).getTime()
  );

// Step 2: Find largest timestamp.
const latestTimestamp =
  Math.max(
    ...timestamps
  );

// Step 3: Convert timestamp back to Date.
const latestDate =
  new Date(
    latestTimestamp
  );

// Step 4: Convert Date to readable ISO string.
console.log(
  latestDate.toISOString()
);
```

Output:

```text
2026-05-10T00:00:00.000Z
```

---

# 51. Find Oldest Date

```js
const dates = [
  "2026-01-01T00:00:00Z",
  "2026-05-10T00:00:00Z",
  "2026-03-15T00:00:00Z",
];

// Step 1: Convert strings to timestamps.
const timestamps =
  dates.map(
    (value) =>
      new Date(
        value
      ).getTime()
  );

// Step 2: Find smallest timestamp.
const oldestTimestamp =
  Math.min(
    ...timestamps
  );

// Step 3: Convert timestamp to Date.
const oldestDate =
  new Date(
    oldestTimestamp
  );

// Step 4: Convert Date to ISO string.
console.log(
  oldestDate.toISOString()
);
```

Output:

```text
2026-01-01T00:00:00.000Z
```

---

# 52. Expiry Check 🔥🔥🔥

```js
// Step 1: Expiry comes from API as a string.
const expiresAt =
  "2020-01-01T00:00:00Z";

// Step 2: Convert expiry string to Date.
const expiryDate =
  new Date(
    expiresAt
  );

// Step 3: Convert Date to timestamp.
const expiryTime =
  expiryDate.getTime();

// Step 4: Get current timestamp.
const nowTime =
  Date.now();

// Step 5: Compare.
// If expiry is before now, it has expired.
const isExpired =
  expiryTime < nowTime;

// Step 6: Print result.
console.log(
  isExpired
);
```

Output:

```text
true
```

Flow:

```text
expiry string
↓ Date
↓ timestamp
compare with Date.now()
↓
expired / active
```

---

# 53. Reusable Expiry Function

```js
function isExpired(
  expiresAt
) {
  // Step 1: Convert API expiry string to Date.
  const expiryDate =
    new Date(
      expiresAt
    );

  // Step 2: Convert Date to timestamp.
  const expiryTime =
    expiryDate.getTime();

  // Step 3: Get current timestamp.
  const nowTime =
    Date.now();

  // Step 4: Return true if expiry already passed.
  return (
    expiryTime <
    nowTime
  );
}

// Step 5: Test the function.
console.log(
  isExpired(
    "2020-01-01T00:00:00Z"
  )
);
```

Output:

```text
true
```

---

# 54. Check Future Date

```js
function isFutureDate(
  value
) {
  // Step 1: Convert input to Date.
  const date =
    new Date(
      value
    );

  // Step 2: Convert Date to timestamp.
  const time =
    date.getTime();

  // Step 3: Get current timestamp.
  const now =
    Date.now();

  // Step 4: Future means time is larger than now.
  return (
    time > now
  );
}

console.log(
  isFutureDate(
    "2099-01-01T00:00:00Z"
  )
);
```

Output:

```text
true
```

---

# 55. Check Past Date

```js
function isPastDate(
  value
) {
  // Step 1: Convert input string to Date.
  const date =
    new Date(
      value
    );

  // Step 2: Convert Date to timestamp.
  const time =
    date.getTime();

  // Step 3: Compare against current timestamp.
  return (
    time <
    Date.now()
  );
}

console.log(
  isPastDate(
    "2020-01-01T00:00:00Z"
  )
);
```

Output:

```text
true
```

---

# 56. Age Calculation 🔥🔥🔥

```js
function calculateAge(
  birthDate
) {
  // Step 1: Convert birth date input to Date.
  const birth =
    new Date(
      birthDate
    );

  // Step 2: Get today's Date.
  const today =
    new Date();

  // Step 3: Start with raw year difference.
  let age =
    today.getFullYear()
    -
    birth.getFullYear();

  // Step 4: Compare current month with birth month.
  const monthDiff =
    today.getMonth()
    -
    birth.getMonth();

  // Step 5:
  // If birth month has not happened yet,
  // or we are in the birth month but before birth day,
  // birthday has not happened this year.
  const birthdayNotReached =
    monthDiff < 0
    ||
    (
      monthDiff === 0
      &&
      today.getDate()
      <
      birth.getDate()
    );

  // Step 6: Adjust age.
  if (
    birthdayNotReached
  ) {
    age--;
  }

  // Step 7: Return final age.
  return age;
}
```

Flow:

```text
birth string
↓ Date
get birth year/month/day
↓
compare with today
↓
correct age
```

---

# 57. Why Age Is Not Just Year Difference

```js
// Step 1: Imagine today is before the person's birthday.
const birth =
  new Date(
    2000,
    11,
    20
  );

// Step 2: Raw year difference alone ignores month/day.
const rawAge =
  new Date()
    .getFullYear()
  -
  birth.getFullYear();

// Step 3: This may be one year too high.
console.log(
  rawAge
);
```

Meaning:

```text
year difference alone
→ not enough
```

---

# 58. Format API Date for UI 🔥🔥🔥

```js
function formatDate(
  apiValue
) {
  // Step 1: API gives us a string.
  // Example:
  // "2026-08-24T10:30:00Z"

  // Step 2: Convert string into Date object.
  const date =
    new Date(
      apiValue
    );

  // Step 3: Convert Date into user-friendly string.
  const formatted =
    date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  // Step 4: Return formatted UI string.
  return formatted;
}

// Step 5: Test.
console.log(
  formatDate(
    "2026-08-24T10:30:00Z"
  )
);
```

Output looks similar to:

```text
24 Aug 2026
```

Flow:

```text
API string
↓
Date object
↓
formatted UI string
```

---

# 59. Format Date and Time

```js
function formatDateTime(
  apiValue
) {
  // Step 1: Convert API string to Date.
  const date =
    new Date(
      apiValue
    );

  // Step 2: Format both date and local time.
  const formatted =
    date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  // Step 3: Return display string.
  return formatted;
}

console.log(
  formatDateTime(
    "2026-08-24T10:30:00Z"
  )
);
```

Output:

```text
formatted date + local time
```

---

# 60. Invalid Date 🔥🔥🔥

```js
// Step 1: Pass an invalid string.
const date =
  new Date(
    "hello"
  );

// Step 2: Convert Date to readable string.
console.log(
  date.toString()
);

// Step 3: Check its JavaScript type.
console.log(
  typeof date
);
```

Output:

```text
Invalid Date
object
```

Meaning:

```text
still a Date object
but
invalid internal time value
```

---

# 61. Check Invalid Date Correctly 🔥🔥🔥

```js
function isValidDate(
  value
) {
  // Step 1: Try converting input to Date.
  const date =
    new Date(
      value
    );

  // Step 2: Convert Date to timestamp.
  const timestamp =
    date.getTime();

  // Step 3: Invalid Date gives NaN.
  const invalid =
    Number.isNaN(
      timestamp
    );

  // Step 4: We want valid, so reverse the boolean.
  return !invalid;
}

console.log(
  isValidDate(
    "2026-08-24T10:30:00Z"
  )
);

console.log(
  isValidDate(
    "hello"
  )
);
```

Output:

```text
true
false
```

---

# 62. `Number.isNaN()` for Date Validation

```js
// Step 1: Create invalid Date.
const date =
  new Date(
    "invalid"
  );

// Step 2: Convert to timestamp.
const timestamp =
  date.getTime();

// Step 3: Check whether timestamp is NaN.
console.log(
  Number.isNaN(
    timestamp
  )
);
```

Output:

```text
true
```

---

# 63. Date Parsing Caution 🔥🔥🔥

```js
// Step 1: This format can be ambiguous.
const ambiguous =
  "08/09/2026";

// Step 2: Different systems may interpret it differently.
console.log(
  ambiguous
);
```

Prefer:

```js
// Step 1: Use a clear ISO date.
const clear =
  "2026-08-09T00:00:00Z";

// Step 2: Convert safely to Date.
const date =
  new Date(
    clear
  );

// Step 3: Convert back to ISO.
console.log(
  date.toISOString()
);
```

Output:

```text
2026-08-09T00:00:00.000Z
```

---

# 64. ISO Format Is Safer for APIs 🔥🔥🔥

```js
// Step 1: Backend sends standard ISO.
const apiValue =
  "2026-08-24T10:30:00Z";

// Step 2: Frontend converts it to Date.
const date =
  new Date(
    apiValue
  );

// Step 3: Frontend can send it back as ISO.
const valueForApi =
  date.toISOString();

// Step 4: Print.
console.log(
  valueForApi
);
```

Output:

```text
2026-08-24T10:30:00.000Z
```

Flow:

```text
Backend ISO string
↓
Frontend Date object
↓
Frontend operations
↓
ISO string
↓
Backend
```

---

# 65. Date-Only Strings vs Exact Timestamp

```js
// Step 1: Calendar date only.
const birthday =
  "2026-08-24";

// Step 2: Exact instant.
const meeting =
  "2026-08-24T10:30:00Z";

// Step 3: Print both.
console.log(
  birthday
);

console.log(
  meeting
);
```

Output:

```text
2026-08-24
2026-08-24T10:30:00Z
```

Meaning:

```text
birthday
→ day matters

meeting
→ exact time matters
```

---

# 66. Timestamp vs Calendar Date 🔥🔥🔥

```js
// Step 1: A due date may only care about the calendar day.
const dueDate =
  "2026-08-24";

// Step 2: createdAt represents an exact instant.
const createdAt =
  "2026-08-24T10:30:00Z";

// Step 3: They solve different business problems.
console.log(
  dueDate,
  createdAt
);
```

Output:

```text
2026-08-24 2026-08-24T10:30:00Z
```

---

# 67. Start of Day

```js
// Step 1: Create local Date at 3:30 PM.
const date =
  new Date(
    2026,
    7,
    24,
    15,
    30
  );

// Step 2: Set hour/min/sec/ms to zero.
date.setHours(
  0,
  0,
  0,
  0
);

// Step 3: Read hour.
console.log(
  date.getHours()
);
```

Output:

```text
0
```

---

# 68. End of Day

```js
// Step 1: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Set to final millisecond of local day.
date.setHours(
  23,
  59,
  59,
  999
);

// Step 3: Verify hour and milliseconds.
console.log(
  date.getHours()
);

console.log(
  date.getMilliseconds()
);
```

Output:

```text
23
999
```

---

# 69. Same Calendar Day 🔥🔥🔥

```js
function isSameDay(
  a,
  b
) {
  // Step 1: Convert both inputs to Date.
  const first =
    new Date(
      a
    );

  const second =
    new Date(
      b
    );

  // Step 2: Compare year.
  const sameYear =
    first.getFullYear()
    ===
    second.getFullYear();

  // Step 3: Compare month.
  const sameMonth =
    first.getMonth()
    ===
    second.getMonth();

  // Step 4: Compare day of month.
  const sameDate =
    first.getDate()
    ===
    second.getDate();

  // Step 5: All must match.
  return (
    sameYear
    &&
    sameMonth
    &&
    sameDate
  );
}

console.log(
  isSameDay(
    new Date(
      2026,
      7,
      24,
      10
    ),
    new Date(
      2026,
      7,
      24,
      18
    )
  )
);
```

Output:

```text
true
```

---

# 70. Timestamp Equality vs Same Day

```js
// Step 1: Create morning time.
const morning =
  new Date(
    2026,
    7,
    24,
    10
  );

// Step 2: Create evening time.
const evening =
  new Date(
    2026,
    7,
    24,
    18
  );

// Step 3: Compare exact timestamps.
const sameTimestamp =
  morning.getTime()
  ===
  evening.getTime();

// Step 4: Print result.
console.log(
  sameTimestamp
);
```

Output:

```text
false
```

But they are still on the same calendar day.

---

# 71. Filter Records by Date 🔥🔥🔥

```js
const records = [
  {
    id: 1,
    createdAt:
      "2026-08-24T08:00:00Z",
  },
  {
    id: 2,
    createdAt:
      "2026-08-20T08:00:00Z",
  },
];

// Step 1: Create cutoff Date.
const cutoff =
  new Date(
    "2026-08-22T00:00:00Z"
  );

// Step 2: Filter records.
const filtered =
  records.filter(
    ({ createdAt }) => {
      // Step 3: Convert API string to Date.
      const recordDate =
        new Date(
          createdAt
        );

      // Step 4: Keep record if date is on/after cutoff.
      return (
        recordDate >= cutoff
      );
    }
  );

// Step 5: Show matching IDs.
console.log(
  filtered.map(
    ({ id }) => id
  )
);
```

Output:

```text
[1]
```

---

# 72. Filter Date Range 🔥🔥🔥

```js
function filterByDateRange(
  records,
  start,
  end
) {
  // Step 1: Convert start boundary to timestamp.
  const startTime =
    new Date(
      start
    ).getTime();

  // Step 2: Convert end boundary to timestamp.
  const endTime =
    new Date(
      end
    ).getTime();

  // Step 3: Visit every record.
  return records.filter(
    ({ createdAt }) => {
      // Step 4: Convert record API date string to timestamp.
      const recordTime =
        new Date(
          createdAt
        ).getTime();

      // Step 5:
      // Keep record only when it is inside the range.
      return (
        recordTime >= startTime
        &&
        recordTime <= endTime
      );
    }
  );
}
```

Flow:

```text
start string → timestamp
end string   → timestamp

for each record:
createdAt string
↓
timestamp
↓
start <= record <= end
```

---

# 73. Latest Record by Date 🔥🔥🔥

```js
const records = [
  {
    id: 1,
    createdAt:
      "2026-08-10T00:00:00Z",
  },
  {
    id: 2,
    createdAt:
      "2026-08-24T00:00:00Z",
  },
  {
    id: 3,
    createdAt:
      "2026-08-20T00:00:00Z",
  },
];

function getLatest(
  records
) {
  // Step 1: reduce() keeps one record as the current winner.
  return records.reduce(
    (
      latest,
      current
    ) => {
      // Step 2: Convert latest record date to timestamp.
      const latestTime =
        new Date(
          latest.createdAt
        ).getTime();

      // Step 3: Convert current record date to timestamp.
      const currentTime =
        new Date(
          current.createdAt
        ).getTime();

      // Step 4:
      // If current is newer, current becomes the new winner.
      if (
        currentTime >
        latestTime
      ) {
        return current;
      }

      // Step 5:
      // Otherwise keep the existing latest record.
      return latest;
    }
  );
}

// Step 6: Run function.
const latestRecord =
  getLatest(
    records
  );

// Step 7: Print result.
console.log(
  latestRecord.id
);
```

Output:

```text
2
```

---

# 74. Oldest Record by Date

```js
function getOldest(
  records
) {
  // Step 1: reduce() compares records one by one.
  return records.reduce(
    (
      oldest,
      current
    ) => {
      // Step 2: Convert oldest date to timestamp.
      const oldestTime =
        new Date(
          oldest.createdAt
        ).getTime();

      // Step 3: Convert current date to timestamp.
      const currentTime =
        new Date(
          current.createdAt
        ).getTime();

      // Step 4: Smaller timestamp means older record.
      if (
        currentTime <
        oldestTime
      ) {
        return current;
      }

      // Step 5: Otherwise keep existing oldest.
      return oldest;
    }
  );
}
```

---

# 75. Sort API Data by Date 🔥🔥🔥

```js
function sortNewestFirst(
  records
) {
  // Step 1: toSorted() creates a new array.
  return records.toSorted(
    (a, b) => {
      // Step 2: Convert a.createdAt string to timestamp.
      const aTime =
        new Date(
          a.createdAt
        ).getTime();

      // Step 3: Convert b.createdAt string to timestamp.
      const bTime =
        new Date(
          b.createdAt
        ).getTime();

      // Step 4:
      // bTime - aTime puts larger/newer dates first.
      return (
        bTime - aTime
      );
    }
  );
}
```

Flow:

```text
API string
↓
Date
↓
timestamp
↓
sort timestamps
↓
newest first
```

---

# 76. Avoid Repeated Date Parsing

```js
// Step 1: Convert API records once.
const normalized =
  records.map(
    (record) => {
      // Step 2: Parse createdAt only once.
      const createdAtTime =
        new Date(
          record.createdAt
        ).getTime();

      // Step 3: Return original record
      // plus a numeric timestamp.
      return {
        ...record,
        createdAtTime,
      };
    }
  );

// Step 4: Future sorting can use number directly.
const sorted =
  normalized.toSorted(
    (a, b) =>
      b.createdAtTime
      -
      a.createdAtTime
  );
```

Meaning:

```text
parse once
↓
reuse timestamp
```

---

# 77. Interview Output — Date Object Equality

```js
// Step 1: Create object A.
const a =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 2: Create separate object B.
const b =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 3: Compare references.
console.log(
  a === b
);
```

Output:

```text
false
```

---

# 78. Interview Output — Timestamp Equality

```js
// Step 1: Create two separate Dates.
const a =
  new Date(
    "2026-01-01T00:00:00Z"
  );

const b =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 2: Convert both to timestamps.
const aTime =
  a.getTime();

const bTime =
  b.getTime();

// Step 3: Compare numeric values.
console.log(
  aTime === bTime
);
```

Output:

```text
true
```

---

# 79. Interview Output — Month Index

```js
// Step 1: Month 0 means January.
const date =
  new Date(
    2026,
    0,
    1
  );

// Step 2: Read month index.
console.log(
  date.getMonth()
);
```

Output:

```text
0
```

---

# 80. Interview Output — `getDate()` vs `getDay()`

```js
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 1: Day of month.
console.log(
  date.getDate()
);

// Step 2: Weekday index.
console.log(
  date.getDay()
);
```

Output:

```text
24
1
```

---

# 81. Interview Output — Invalid Date

```js
// Step 1: Try invalid input.
const date =
  new Date(
    "hello"
  );

// Step 2: Ask for timestamp.
const timestamp =
  date.getTime();

// Step 3: Print it.
console.log(
  timestamp
);
```

Output:

```text
NaN
```

---

# 82. Interview Question — What Does `Date.now()` Return?

```js
// Step 1: Get current timestamp.
const value =
  Date.now();

// Step 2: Verify its type.
console.log(
  typeof value
);
```

Output:

```text
number
```

Answer:

```text
Date.now()
returns current timestamp
in milliseconds since Jan 1, 1970 UTC.
```

---

# 83. Interview Question — `Date.now()` vs `new Date()`

```js
// Step 1: Date.now() returns number.
const timestamp =
  Date.now();

// Step 2: new Date() returns object.
const date =
  new Date();

// Step 3: Print types.
console.log(
  typeof timestamp
);

console.log(
  typeof date
);
```

Output:

```text
number
object
```

---

# 84. Interview Question — Why Is Month Zero-Based?

```js
// Step 1: Create January.
const january =
  new Date(
    2026,
    0,
    1
  );

// Step 2: Create December.
const december =
  new Date(
    2026,
    11,
    1
  );

// Step 3: Print month indexes.
console.log(
  january.getMonth()
);

console.log(
  december.getMonth()
);
```

Output:

```text
0
11
```

---

# 85. Interview Question — How Do You Compare Dates? 🔥🔥🔥

```js
const a =
  new Date(
    "2026-01-01T00:00:00Z"
  );

const b =
  new Date(
    "2026-02-01T00:00:00Z"
  );

// Step 1: Before/after comparison.
const before =
  a < b;

// Step 2: Exact equality comparison using timestamps.
const equal =
  a.getTime()
  ===
  b.getTime();

// Step 3: Print.
console.log(
  before
);

console.log(
  equal
);
```

Output:

```text
true
false
```

---

# 86. Interview Question — How Do You Validate a Date?

```js
const value =
  "2026-08-24T10:30:00Z";

// Step 1: Convert string to Date.
const date =
  new Date(
    value
  );

// Step 2: Convert Date to timestamp.
const timestamp =
  date.getTime();

// Step 3: Check whether timestamp is NaN.
const valid =
  !Number.isNaN(
    timestamp
  );

// Step 4: Print.
console.log(
  valid
);
```

Output:

```text
true
```

---

# 87. Interview Question — Are Date Objects Mutable?

```js
// Step 1: Create Date.
const date =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Change same Date object.
date.setDate(
  25
);

// Step 3: Read changed value.
console.log(
  date.getDate()
);
```

Output:

```text
25
```

Answer:

```text
Yes.
Date setter methods mutate the Date object.
```

---

# 88. Debugging — Month Off by One 🔥🔥🔥

Wrong:

```js
// Step 1: Developer wants August.
// But month index 8 actually means September.
const date =
  new Date(
    2026,
    8,
    24
  );

// Step 2: Check month index.
console.log(
  date.getMonth()
);
```

Output:

```text
8
```

Correct:

```js
// Step 1: August uses index 7.
const august =
  new Date(
    2026,
    7,
    24
  );

// Step 2: Verify.
console.log(
  august.getMonth()
);
```

Output:

```text
7
```

---

# 89. Debugging — Comparing Dates With `===`

Wrong:

```js
// Step 1: Create two separate objects.
const a =
  new Date(
    "2026-01-01T00:00:00Z"
  );

const b =
  new Date(
    "2026-01-01T00:00:00Z"
  );

// Step 2: Reference comparison fails.
console.log(
  a === b
);
```

Output:

```text
false
```

Correct:

```js
// Step 1: Convert both to timestamps.
const aTime =
  a.getTime();

const bTime =
  b.getTime();

// Step 2: Compare values.
console.log(
  aTime === bTime
);
```

Output:

```text
true
```

---

# 90. Debugging — Mutating Original Date

```js
function addOneDayWrong(
  date
) {
  // Step 1: This changes the original Date object.
  date.setDate(
    date.getDate() + 1
  );

  // Step 2: Return same mutated object.
  return date;
}
```

Safer:

```js
function addOneDay(
  input
) {
  // Step 1: Read original timestamp.
  const timestamp =
    input.getTime();

  // Step 2: Create a new Date object.
  const copy =
    new Date(
      timestamp
    );

  // Step 3: Change the copy.
  copy.setDate(
    copy.getDate() + 1
  );

  // Step 4: Return copy.
  return copy;
}
```

---

# 91. Debugging — Ambiguous Date String

Bad:

```js
// Step 1: This may mean different things in different regions.
const value =
  "08/09/2026";

// Step 2: Avoid depending on ambiguous parsing.
console.log(
  value
);
```

Better:

```js
// Step 1: Use explicit ISO.
const value =
  "2026-08-09T00:00:00Z";

// Step 2: Convert to Date.
const date =
  new Date(
    value
  );

// Step 3: Convert back to standard ISO.
console.log(
  date.toISOString()
);
```

Output:

```text
2026-08-09T00:00:00.000Z
```

---

# 92. Debugging — Ignoring Timezone 🔥🔥🔥

```js
// Step 1: Backend sends UTC time.
const value =
  "2026-08-24T23:30:00Z";

// Step 2: Convert to Date object.
const date =
  new Date(
    value
  );

// Step 3: Read UTC date.
const utcDate =
  date.getUTCDate();

// Step 4: Read local calendar date.
const localDate =
  date.getDate();

// Step 5: Print both.
console.log(
  utcDate
);

console.log(
  localDate
);
```

Output:

```text
24
depends on timezone
```

---

# 93. Machine Coding — Format API Date Properly 🔥🔥🔥

Problem:

```text
API gives:
"2026-08-24T10:30:00Z"

UI should show:
"24 Aug 2026"

Invalid input should show:
"Invalid date"
```

Solution:

```js
function formatDate(
  value
) {
  // Step 1:
  // Receive the API string.
  // Example:
  // "2026-08-24T10:30:00Z"

  // Step 2:
  // Convert the string into a Date object.
  const date =
    new Date(
      value
    );

  // Step 3:
  // Convert Date object to timestamp.
  // We use this to check validity.
  const timestamp =
    date.getTime();

  // Step 4:
  // If timestamp is NaN,
  // JavaScript could not understand the date.
  if (
    Number.isNaN(
      timestamp
    )
  ) {
    return "Invalid date";
  }

  // Step 5:
  // Convert Date object into a UI-friendly string.
  const formatted =
    date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  // Step 6:
  // Return the final UI string.
  return formatted;
}

// Step 7: Test valid API input.
console.log(
  formatDate(
    "2026-08-24T10:30:00Z"
  )
);

// Step 8: Test invalid input.
console.log(
  formatDate(
    "hello"
  )
);
```

Output:

```text
24 Aug 2026
Invalid date
```

Complete flow:

```text
API string
↓
new Date()
↓
Date object
↓
getTime()
↓
validate
↓
toLocaleDateString()
↓
UI string
```

---

# 94. Machine Coding — Expiry Check Proper Flow 🔥🔥🔥

Problem:

```text
API gives token expiry.

Return:
true  → expired
false → still active
```

Solution:

```js
function isExpired(
  expiresAt
) {
  // Step 1:
  // Receive expiry from API as a string.
  // Example:
  // "2026-08-25T10:00:00Z"

  // Step 2:
  // Convert expiry string into Date object.
  const expiryDate =
    new Date(
      expiresAt
    );

  // Step 3:
  // Convert Date object into timestamp.
  const expiryTime =
    expiryDate.getTime();

  // Step 4:
  // Validate the date.
  // Invalid Date gives NaN.
  if (
    Number.isNaN(
      expiryTime
    )
  ) {
    // Business decision:
    // invalid expiry is treated as expired.
    return true;
  }

  // Step 5:
  // Get current time as timestamp.
  const currentTime =
    Date.now();

  // Step 6:
  // If expiry happened before current time,
  // the token is expired.
  const expired =
    expiryTime <
    currentTime;

  // Step 7:
  // Return final boolean.
  return expired;
}
```

Mental flow:

```text
expiresAt string
↓
Date object
↓
timestamp
↓
validate
↓
compare with Date.now()
↓
expired true/false
```

---

# 95. Machine Coding — Sort API Records by Date 🔥🔥🔥

Problem:

```text
API gives employees.

Newest joined employee
should appear first.
```

Example data:

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
    joinedAt:
      "2026-03-10T00:00:00Z",
  },
  {
    id: 2,
    name: "Amit",
    joinedAt:
      "2025-12-01T00:00:00Z",
  },
  {
    id: 3,
    name: "John",
    joinedAt:
      "2026-05-01T00:00:00Z",
  },
];
```

Solution:

```js
function sortNewestFirst(
  employees
) {
  // Step 1:
  // Use toSorted() so original API array is not mutated.
  return employees.toSorted(
    (a, b) => {
      // Step 2:
      // a.joinedAt is an API string.
      // Convert it to Date object,
      // then to timestamp.
      const aTime =
        new Date(
          a.joinedAt
        ).getTime();

      // Step 3:
      // Do the same for b.
      const bTime =
        new Date(
          b.joinedAt
        ).getTime();

      // Step 4:
      // Larger timestamp means newer date.
      // bTime - aTime puts newer record first.
      return (
        bTime - aTime
      );
    }
  );
}

// Step 5:
// Run the sorter.
const sorted =
  sortNewestFirst(
    employees
  );

// Step 6:
// Show final order.
console.log(
  sorted.map(
    ({ name }) => name
  )
);
```

Output:

```text
["John", "Rahul", "Amit"]
```

Complete flow:

```text
API array
↓
joinedAt string
↓
Date object
↓
timestamp
↓
compare timestamps
↓
new sorted array
```

---

# 96. Machine Coding — Date Range Filter Proper Flow 🔥🔥🔥

Problem:

```text
User selects:

Start:
2026-08-15

End:
2026-08-25

Show only records
inside that date range.
```

Solution:

```js
function filterByDateRange(
  records,
  start,
  end
) {
  // Step 1:
  // Convert selected start date
  // into a timestamp once.
  const startTime =
    new Date(
      start
    ).getTime();

  // Step 2:
  // Convert selected end date
  // into a timestamp once.
  const endTime =
    new Date(
      end
    ).getTime();

  // Step 3:
  // Visit every API record.
  return records.filter(
    (record) => {
      // Step 4:
      // Read record's date string.
      const value =
        record.createdAt;

      // Step 5:
      // Convert record string to Date object,
      // then to timestamp.
      const recordTime =
        new Date(
          value
        ).getTime();

      // Step 6:
      // Check lower boundary.
      const afterStart =
        recordTime >=
        startTime;

      // Step 7:
      // Check upper boundary.
      const beforeEnd =
        recordTime <=
        endTime;

      // Step 8:
      // Keep only when both are true.
      return (
        afterStart
        &&
        beforeEnd
      );
    }
  );
}
```

Complete flow:

```text
start string
→ timestamp

end string
→ timestamp

each record:
createdAt string
→ Date
→ timestamp
→ compare boundaries
→ keep/remove
```

This pattern is common in:

```text
order filters
transaction reports
audit history
analytics dashboards
employee joining filters
```

---

# 97. Machine Coding — Latest Record Proper Flow 🔥🔥🔥

Problem:

```text
Given many records,
find the one with the latest createdAt.
```

Solution:

```js
function getLatestRecord(
  records
) {
  // Step 1:
  // Handle empty array.
  if (
    records.length === 0
  ) {
    return null;
  }

  // Step 2:
  // reduce() compares records
  // and keeps one winner.
  return records.reduce(
    (
      latest,
      current
    ) => {
      // Step 3:
      // Convert latest.createdAt string
      // to Date and then timestamp.
      const latestTime =
        new Date(
          latest.createdAt
        ).getTime();

      // Step 4:
      // Convert current.createdAt string
      // to Date and then timestamp.
      const currentTime =
        new Date(
          current.createdAt
        ).getTime();

      // Step 5:
      // If current is newer,
      // current becomes the new latest record.
      if (
        currentTime >
        latestTime
      ) {
        return current;
      }

      // Step 6:
      // Otherwise keep existing latest.
      return latest;
    }
  );
}
```

Example:

```js
const records = [
  {
    id: 1,
    createdAt:
      "2026-08-10T00:00:00Z",
  },
  {
    id: 2,
    createdAt:
      "2026-08-24T00:00:00Z",
  },
  {
    id: 3,
    createdAt:
      "2026-08-20T00:00:00Z",
  },
];

// Step 7:
// Find latest record.
const latest =
  getLatestRecord(
    records
  );

// Step 8:
// Print winner.
console.log(
  latest.id
);
```

Output:

```text
2
```

Flow:

```text
record 1 vs record 2
↓
record 2 wins

record 2 vs record 3
↓
record 2 still wins

final
↓
record 2
```

---

# 98. Most Important Rules + Decision Guide 🔥🔥🔥

```js
// Step 1:
// Current Date object.
const now =
  new Date();

// Step 2:
// Current timestamp number.
const nowTimestamp =
  Date.now();

// Step 3:
// Convert Date object to timestamp.
const timestamp =
  now.getTime();

// Step 4:
// Convert Date object to ISO string.
const iso =
  now.toISOString();

// Step 5:
// Convert Date object to UI string.
const display =
  now.toLocaleDateString(
    "en-IN"
  );

console.log(
  typeof now
);

console.log(
  typeof nowTimestamp
);

console.log(
  typeof timestamp
);

console.log(
  typeof iso
);

console.log(
  typeof display
);
```

Output:

```text
object
number
number
string
string
```

Final memory:

```text
API date string
→ new Date()
→ Date object

Date object
→ getTime()
→ timestamp

timestamp
→ new Date(timestamp)
→ Date object

Date object
→ toISOString()
→ API string

Date object
→ toLocaleDateString()
→ UI string
```

Most important rules:

```text
Date is an object.

new Date()
→ Date object.

Date.now()
→ current timestamp number.

getTime()
→ timestamp of Date object.

Months are zero-based.

getDate()
→ day of month.

getDay()
→ weekday.

Date objects are mutable.

Two separate Date objects are not ===
even if they represent the same time.

For equality:
compare getTime().

ISO strings are preferred for APIs.

toISOString()
returns UTC.

Timezone matters.

Invalid Date
returns NaN from getTime().
```

Most important interview traps:

```text
month index
getDate vs getDay
Date equality
Date mutation
Invalid Date
UTC vs local time
ambiguous date formats
```

Most important machine-coding patterns:

```text
API string → Date → UI string

expiry string
→ Date
→ timestamp
→ compare with now

date sorting
→ string
→ Date
→ timestamp
→ comparator

date range
→ boundaries to timestamps
→ record date to timestamp
→ compare

latest record
→ reduce
→ compare timestamps
→ keep newest
```

## ✅ 6.13 Dates complete

**Next: 6.14 Sets 🔥🔥**
