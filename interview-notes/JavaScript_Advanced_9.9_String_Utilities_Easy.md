# 9.9 String Utilities — Easy Version 🔥🔥🔥

This chapter is about small reusable functions for working with strings.

These are very common in:

```text
search
forms
validation
URLs
usernames
emails
table filters
display formatting
interview coding
machine-coding rounds
```

Main topics:

```text
normalizeText()
capitalize()
capitalizeWords()
reverseString()
reverseWords()
isPalindrome()
isAnagram()
countCharacters()
characterFrequency()
firstUniqueCharacter()
mostFrequentCharacter()
removeDuplicateCharacters()
truncate()
getInitials()
maskEmail()
slugify()
toSnakeCase()
toCamelCase()
toKebabCase()
countWords()
highlightMatch()
splitMatch()
escapeRegex()
containsText()
query-string parsing
query-string building
template replacement
safe string comparison
interview questions
debugging
```

---

# 1. What Is a String Utility?

A string utility is:

```text
a small reusable function
that does one string-related job
```

Example:

```js
function toLower(
  text
) {
  // Step 1: Convert text to lowercase.
  // Why?
  // So we can reuse this logic
  // wherever lowercase text is needed.
  return text.toLowerCase();
}

// Step 2: Test the utility.
console.log(
  toLower(
    "HELLO"
  )
); // Output: hello
```

Output:

```text
hello
```

---

# 2. Why Are String Utilities Important?

Real applications constantly receive text from:

```text
users
forms
URLs
APIs
search boxes
emails
file names
```

The text may contain:

```text
extra spaces
mixed uppercase/lowercase
special characters
duplicate spaces
different formats
```

So we often need to clean and transform it.

---

# 3. `normalizeText()` 🔥🔥🔥

Requirement:

```text
"   Rahul Sharma   "
↓
"rahul sharma"
```

---

# 4. Build `normalizeText()`

```js
function normalizeText(
  text
) {
  // Step 1: Convert input to string.
  // Why?
  // It makes the utility safer
  // for common non-string values.
  const value =
    String(
      text
      ??
      ""
    );

  // Step 2: Remove spaces
  // from the beginning and end.
  const trimmed =
    value.trim();

  // Step 3: Convert to lowercase.
  return trimmed.toLowerCase();
}
```

---

# 5. Test `normalizeText()`

```js
// Step 1: Clean text.
const result =
  normalizeText(
    "   Rahul Sharma   "
  );

// Step 2: Print result.
console.log(
  result
); // Output: rahul sharma
```

Output:

```text
rahul sharma
```

---

# 6. Why Normalize Search Text?

Suppose user enters:

```text
" RAHUL "
```

but data contains:

```text
"rahul"
```

Without normalization:

```text
comparison may fail
```

With normalization:

```text
" RAHUL "
↓
"rahul"

"rahul"
↓
"rahul"

match ✅
```

---

# 7. `capitalize()` 🔥🔥🔥

Requirement:

```text
rahul
↓
Rahul
```

---

# 8. Build `capitalize()`

```js
function capitalize(
  text
) {
  // Step 1: Handle empty string.
  if (
    text.length
    ===
    0
  ) {
    return "";
  }

  // Step 2: Take first character
  // and convert it to uppercase.
  const first =
    text[
      0
    ].toUpperCase();

  // Step 3: Take remaining characters.
  const rest =
    text.slice(
      1
    );

  // Step 4: Join both parts.
  return (
    first
    +
    rest
  );
}
```

---

# 9. Test `capitalize()`

```js
// Step 1: Capitalize word.
const result =
  capitalize(
    "rahul"
  );

// Step 2: Print result.
console.log(
  result
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 10. `capitalizeWords()` 🔥🔥🔥

Requirement:

```text
rahul sharma
↓
Rahul Sharma
```

---

# 11. Build `capitalizeWords()`

```js
function capitalizeWords(
  text
) {
  // Step 1: Split sentence
  // into words.
  const words =
    text.split(
      " "
    );

  // Step 2: Capitalize each word.
  const capitalized =
    words.map(
      (
        word
      ) => {
        return capitalize(
          word
        );
      }
    );

  // Step 3: Join words
  // back with spaces.
  return capitalized.join(
    " "
  );
}
```

---

# 12. Test `capitalizeWords()`

```js
// Step 1: Capitalize every word.
const result =
  capitalizeWords(
    "rahul sharma"
  );

// Step 2: Print result.
console.log(
  result
); // Output: Rahul Sharma
```

Output:

```text
Rahul Sharma
```

---

# 13. Reverse a String 🔥🔥🔥

Requirement:

```text
hello
↓
olleh
```

---

# 14. Build `reverseString()`

```js
function reverseString(
  text
) {
  // Step 1: Convert string
  // into character array.
  const chars =
    text.split(
      ""
    );

  // Step 2: Reverse the array.
  chars.reverse();

  // Step 3: Join characters
  // back into a string.
  return chars.join(
    ""
  );
}
```

---

# 15. Test Reverse String

```js
// Step 1: Reverse text.
const result =
  reverseString(
    "hello"
  );

// Step 2: Print result.
console.log(
  result
); // Output: olleh
```

Output:

```text
olleh
```

---

# 16. Reverse Words 🔥🔥🔥

Requirement:

```text
I love JavaScript
↓
JavaScript love I
```

---

# 17. Build `reverseWords()`

```js
function reverseWords(
  text
) {
  // Step 1: Split sentence
  // into words.
  const words =
    text.split(
      " "
    );

  // Step 2: Reverse word order.
  words.reverse();

  // Step 3: Join words again.
  return words.join(
    " "
  );
}
```

---

# 18. Test Reverse Words

```js
// Step 1: Reverse word order.
const result =
  reverseWords(
    "I love JavaScript"
  );

// Step 2: Print result.
console.log(
  result
); // Output: JavaScript love I
```

Output:

```text
JavaScript love I
```

---

# 19. Palindrome 🔥🔥🔥

A palindrome reads the same forward and backward.

Examples:

```text
madam
level
racecar
```

---

# 20. Build `isPalindrome()`

```js
function isPalindrome(
  text
) {
  // Step 1: Normalize text.
  const clean =
    normalizeText(
      text
    );

  // Step 2: Reverse cleaned text.
  const reversed =
    reverseString(
      clean
    );

  // Step 3: Compare both.
  return (
    clean
    ===
    reversed
  );
}
```

---

# 21. Test Palindrome

```js
// Step 1: Check palindrome.
console.log(
  isPalindrome(
    "madam"
  )
); // Output: true

// Step 2: Check non-palindrome.
console.log(
  isPalindrome(
    "hello"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 22. Anagram 🔥🔥🔥

Anagrams contain the same letters
in a different order.

Example:

```text
listen
silent
```

---

# 23. Simple Anagram Approach

Easy idea:

```text
normalize
↓
split
↓
sort
↓
join
↓
compare
```

---

# 24. Build `isAnagram()`

```js
function isAnagram(
  first,
  second
) {
  // Step 1: Normalize first text.
  const firstClean =
    normalizeText(
      first
    )
      .split(
        ""
      )
      .sort()
      .join(
        ""
      );

  // Step 2: Normalize second text.
  const secondClean =
    normalizeText(
      second
    )
      .split(
        ""
      )
      .sort()
      .join(
        ""
      );

  // Step 3: Compare sorted strings.
  return (
    firstClean
    ===
    secondClean
  );
}
```

---

# 25. Test Anagram

```js
// Step 1: Test two anagrams.
console.log(
  isAnagram(
    "listen",
    "silent"
  )
); // Output: true

// Step 2: Test non-anagrams.
console.log(
  isAnagram(
    "hello",
    "world"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 26. Character Frequency 🔥🔥🔥

Requirement:

```text
"aabca"
↓
{
  a: 3,
  b: 1,
  c: 1
}
```

---

# 27. Build `characterFrequency()`

```js
function characterFrequency(
  text
) {
  // Step 1: Create empty object
  // for counts.
  const frequency =
    {};

  // Step 2: Visit every character.
  for (
    const char
    of
    text
  ) {
    // Step 3: Read old count.
    // If missing, use 0.
    const oldCount =
      frequency[
        char
      ]
      ??
      0;

    // Step 4: Increase count.
    frequency[
      char
    ] =
      oldCount
      +
      1;
  }

  // Step 5: Return all counts.
  return frequency;
}
```

---

# 28. Test Character Frequency

```js
// Step 1: Count characters.
const result =
  characterFrequency(
    "aabca"
  );

// Step 2: Print counts.
console.log(
  result
); // Output: { a: 3, b: 1, c: 1 }
```

Output:

```text
{
  a: 3,
  b: 1,
  c: 1
}
```

---

# 29. Count One Character

Requirement:

```text
text = "banana"
char = "a"

Output:
3
```

---

# 30. Build `countCharacter()`

```js
function countCharacter(
  text,
  target
) {
  // Step 1: Start count at 0.
  let count =
    0;

  // Step 2: Visit every character.
  for (
    const char
    of
    text
  ) {
    // Step 3: Matching character?
    if (
      char
      ===
      target
    ) {
      count++;
    }
  }

  // Step 4: Return final count.
  return count;
}
```

---

# 31. Test Character Count

```js
// Step 1: Count "a".
console.log(
  countCharacter(
    "banana",
    "a"
  )
); // Output: 3
```

Output:

```text
3
```

---

# 32. First Unique Character 🔥🔥🔥

Requirement:

```text
aabbcddee
↓
c
```

---

# 33. Build `firstUniqueCharacter()`

```js
function firstUniqueCharacter(
  text
) {
  // Step 1: Count all characters.
  const frequency =
    characterFrequency(
      text
    );

  // Step 2: Visit characters
  // in original order.
  for (
    const char
    of
    text
  ) {
    // Step 3: First count of 1
    // is the first unique character.
    if (
      frequency[
        char
      ]
      ===
      1
    ) {
      return char;
    }
  }

  // Step 4: Nothing unique.
  return null;
}
```

---

# 34. Test First Unique Character

```js
// Step 1: Find first unique.
console.log(
  firstUniqueCharacter(
    "aabbcddee"
  )
); // Output: c
```

Output:

```text
c
```

---

# 35. Most Frequent Character 🔥🔥🔥

Requirement:

```text
aabbbcc
↓
b
```

---

# 36. Build `mostFrequentCharacter()`

```js
function mostFrequentCharacter(
  text
) {
  // Step 1: Count characters.
  const frequency =
    characterFrequency(
      text
    );

  // Step 2: Store current best character.
  let bestChar =
    null;

  // Step 3: Store highest count.
  let bestCount =
    0;

  // Step 4: Check each entry.
  for (
    const [
      char,
      count,
    ]
    of
    Object.entries(
      frequency
    )
  ) {
    // Step 5: Found bigger count?
    if (
      count
      >
      bestCount
    ) {
      bestChar =
        char;

      bestCount =
        count;
    }
  }

  // Step 6: Return most frequent character.
  return bestChar;
}
```

---

# 37. Test Most Frequent Character

```js
// Step 1: Find most frequent.
console.log(
  mostFrequentCharacter(
    "aabbbcc"
  )
); // Output: b
```

Output:

```text
b
```

---

# 38. Remove Duplicate Characters 🔥🔥🔥

Requirement:

```text
banana
↓
ban
```

Keep only first occurrence.

---

# 39. Build `removeDuplicateCharacters()`

```js
function removeDuplicateCharacters(
  text
) {
  // Step 1: Convert text to Set.
  // Set keeps unique characters.
  const uniqueChars =
    new Set(
      text
    );

  // Step 2: Convert Set
  // back to array.
  const chars = [
    ...uniqueChars,
  ];

  // Step 3: Join into string.
  return chars.join(
    ""
  );
}
```

---

# 40. Test Duplicate Removal

```js
// Step 1: Remove duplicates.
console.log(
  removeDuplicateCharacters(
    "banana"
  )
); // Output: ban
```

Output:

```text
ban
```

---

# 41. Truncate String 🔥🔥🔥

Requirement:

```text
"JavaScript Interview"
maxLength = 10
↓
"JavaScr..."
```

---

# 42. Build `truncate()`

```js
function truncate(
  text,
  maxLength = 20
) {
  // Step 1: If text already fits,
  // return it unchanged.
  if (
    text.length
    <=
    maxLength
  ) {
    return text;
  }

  // Step 2: If max length
  // is too small for "...",
  // slice directly.
  if (
    maxLength
    <=
    3
  ) {
    return text.slice(
      0,
      maxLength
    );
  }

  // Step 3: Keep room for dots.
  const visibleLength =
    maxLength
    -
    3;

  // Step 4: Return shortened text.
  return (
    text.slice(
      0,
      visibleLength
    )
    +
    "..."
  );
}
```

---

# 43. Test Truncate

```js
// Step 1: Truncate text.
console.log(
  truncate(
    "JavaScript Interview",
    10
  )
); // Output: JavaScr...
```

Output:

```text
JavaScr...
```

---

# 44. Get Initials 🔥🔥🔥

Requirement:

```text
Rahul Sharma
↓
RS
```

---

# 45. Build `getInitials()`

```js
function getInitials(
  fullName
) {
  // Step 1: Remove outer spaces.
  const cleanName =
    fullName.trim();

  // Step 2: Split into words.
  const parts =
    cleanName.split(
      /\s+/
    );

  // Step 3: Take first letter
  // from each word.
  const initials =
    parts.map(
      (
        part
      ) => {
        return part[
          0
        ].toUpperCase();
      }
    );

  // Step 4: Join initials.
  return initials.join(
    ""
  );
}
```

---

# 46. Test Initials

```js
// Step 1: Get initials.
console.log(
  getInitials(
    "Rahul Sharma"
  )
); // Output: RS
```

Output:

```text
RS
```

---

# 47. Mask Email 🔥🔥🔥

Requirement:

```text
rahul@gmail.com
↓
r****@gmail.com
```

---

# 48. Build `maskEmail()`

```js
function maskEmail(
  email
) {
  // Step 1: Split email
  // into username and domain.
  const [
    username,
    domain,
  ] =
    email.split(
      "@"
    );

  // Step 2: Invalid email?
  // Return original value.
  if (
    !username
    ||
    !domain
  ) {
    return email;
  }

  // Step 3: Keep first character.
  const first =
    username[
      0
    ];

  // Step 4: Create stars
  // for remaining username characters.
  const stars =
    "*".repeat(
      Math.max(
        username.length - 1,
        0
      )
    );

  // Step 5: Rebuild masked email.
  return (
    `${first}${stars}@${domain}`
  );
}
```

---

# 49. Test Mask Email

```js
// Step 1: Mask email.
console.log(
  maskEmail(
    "rahul@gmail.com"
  )
); // Output: r****@gmail.com
```

Output:

```text
r****@gmail.com
```

---

# 50. Invalid Email Example

```js
// Step 1: Missing @ and domain.
// Return original text.
console.log(
  maskEmail(
    "rahul"
  )
); // Output: rahul
```

Output:

```text
rahul
```

---

# 51. Slug Generation 🔥🔥🔥

Input:

```text
JavaScript Interview Questions
```

Output:

```text
javascript-interview-questions
```

---

# 52. Build `slugify()`

```js
function slugify(
  text
) {
  // Step 1: Convert to lowercase.
  const lower =
    text.toLowerCase();

  // Step 2: Remove outer spaces.
  const trimmed =
    lower.trim();

  // Step 3: Replace groups of
  // non-letter/non-number characters
  // with one hyphen.
  const slug =
    trimmed.replace(
      /[^a-z0-9]+/g,
      "-"
    );

  // Step 4: Remove hyphens
  // from start/end.
  return slug.replace(
    /^-+|-+$/g,
    ""
  );
}
```

---

# 53. Test Slug

```js
// Step 1: Create slug.
console.log(
  slugify(
    "JavaScript Interview Questions"
  )
); // Output: javascript-interview-questions
```

Output:

```text
javascript-interview-questions
```


---

# 54. Convert to Snake Case 🔥🔥🔥

Requirement:

```text
employee full name
↓
employee_full_name
```

---

# 55. Build `toSnakeCase()`

```js
function toSnakeCase(
  text
) {
  // Step 1: Normalize text.
  const clean =
    normalizeText(
      text
    );

  // Step 2: Replace spaces/hyphens
  // with underscore.
  return clean.replace(
    /[\s-]+/g,
    "_"
  );
}
```

---

# 56. Test Snake Case

```js
// Step 1: Convert to snake_case.
console.log(
  toSnakeCase(
    "Employee Full Name"
  )
); // Output: employee_full_name
```

Output:

```text
employee_full_name
```

---

# 57. Convert to Kebab Case

Requirement:

```text
Employee Full Name
↓
employee-full-name
```

---

# 58. Build `toKebabCase()`

```js
function toKebabCase(
  text
) {
  // Step 1: Normalize text.
  const clean =
    normalizeText(
      text
    );

  // Step 2: Replace spaces/underscores
  // with hyphens.
  return clean.replace(
    /[\s_]+/g,
    "-"
  );
}
```

---

# 59. Test Kebab Case

```js
// Step 1: Convert to kebab-case.
console.log(
  toKebabCase(
    "Employee Full Name"
  )
); // Output: employee-full-name
```

Output:

```text
employee-full-name
```

---

# 60. Convert to Camel Case 🔥🔥🔥

Requirement:

```text
employee full name
↓
employeeFullName
```

---

# 61. Build `toCamelCase()`

```js
function toCamelCase(
  text
) {
  // Step 1: Convert separators
  // into spaces and lowercase text.
  const clean =
    text
      .trim()
      .toLowerCase()
      .replace(
        /[-_]+/g,
        " "
      );

  // Step 2: Split into words.
  const words =
    clean.split(
      /\s+/
    );

  // Step 3: Keep first word lowercase.
  const first =
    words[
      0
    ]
    ??
    "";

  // Step 4: Capitalize remaining words.
  const rest =
    words
      .slice(
        1
      )
      .map(
        (
          word
        ) => {
          return capitalize(
            word
          );
        }
      )
      .join(
        ""
      );

  // Step 5: Join both parts.
  return (
    first
    +
    rest
  );
}
```

---

# 62. Test Camel Case

```js
// Step 1: Convert to camelCase.
console.log(
  toCamelCase(
    "employee full name"
  )
); // Output: employeeFullName
```

Output:

```text
employeeFullName
```

---

# 63. Count Words 🔥🔥🔥

Requirement:

```text
"JavaScript is very powerful"
↓
4
```

---

# 64. Build `countWords()`

```js
function countWords(
  text
) {
  // Step 1: Remove outer spaces.
  const clean =
    text.trim();

  // Step 2: Empty text?
  if (
    clean
    ===
    ""
  ) {
    return 0;
  }

  // Step 3: Split by one
  // or more whitespace characters.
  const words =
    clean.split(
      /\s+/
    );

  // Step 4: Return word count.
  return words.length;
}
```

---

# 65. Test Word Count

```js
// Step 1: Count words.
console.log(
  countWords(
    "JavaScript is very powerful"
  )
); // Output: 4
```

Output:

```text
4
```

---

# 66. Highlight/Search Split Utility 🔥🔥🔥

Suppose:

```text
text = "Rahul Sharma"
query = "Sharma"
```

We want:

```js
{
  before:
    "Rahul ",
  match:
    "Sharma",
  after:
    ""
}
```

Useful for search highlighting.

---

# 67. Build `splitMatch()`

```js
function splitMatch(
  text,
  query
) {
  // Step 1: Find match position
  // without caring about case.
  const index =
    text
      .toLowerCase()
      .indexOf(
        query.toLowerCase()
      );

  // Step 2: No match?
  if (
    index
    ===
    -1
  ) {
    return {
      before:
        text,
      match:
        "",
      after:
        "",
    };
  }

  // Step 3: Extract text before match.
  const before =
    text.slice(
      0,
      index
    );

  // Step 4: Extract exact matched part
  // from original text.
  const match =
    text.slice(
      index,
      index + query.length
    );

  // Step 5: Extract remaining text.
  const after =
    text.slice(
      index + query.length
    );

  // Step 6: Return all parts.
  return {
    before,
    match,
    after,
  };
}
```

---

# 68. Test `splitMatch()`

```js
// Step 1: Split matching text.
const result =
  splitMatch(
    "Rahul Sharma",
    "sharma"
  );

// Step 2: Print result.
console.log(
  result
);
// Output:
// {
//   before: "Rahul ",
//   match: "Sharma",
//   after: ""
// }
```

Output:

```text
{
  before: "Rahul ",
  match: "Sharma",
  after: ""
}
```

---

# 69. Why Keep Original Match Text?

User may search:

```text
sharma
```

but UI text is:

```text
Sharma
```

We want search to ignore case,
but display should preserve original casing.

---

# 70. Escape Regex Text 🔥🔥🔥

Problem:

User searches:

```text
1.0
```

In regex:

```text
.
```

has special meaning.

So user input must be escaped.

---

# 71. Build `escapeRegex()`

```js
function escapeRegex(
  value
) {
  // Step 1: Escape regex
  // special characters.
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}
```

---

# 72. Build `containsText()`

```js
function containsText(
  text,
  query
) {
  // Step 1: Make user query
  // safe for regex.
  const safeQuery =
    escapeRegex(
      query
    );

  // Step 2: Create
  // case-insensitive regex.
  const pattern =
    new RegExp(
      safeQuery,
      "i"
    );

  // Step 3: Test text.
  return pattern.test(
    text
  );
}
```

---

# 73. Test Regex-Safe Search

```js
// Step 1: Search literal "1.0".
console.log(
  containsText(
    "Version 1.0 released",
    "1.0"
  )
); // Output: true
```

Output:

```text
true
```

---

# 74. Why Escape Regex?

Without escaping:

```text
1.0
```

means:

```text
1
any character
0
```

After escaping:

```text
1\.0
```

means literal:

```text
1.0
```

---

# 75. Safe Case-Insensitive Comparison

Requirement:

```text
" Rahul "
and
"rahul"
```

should be equal.

---

# 76. Build `equalsIgnoreCase()`

```js
function equalsIgnoreCase(
  first,
  second
) {
  // Step 1: Normalize first value.
  const a =
    normalizeText(
      first
    );

  // Step 2: Normalize second value.
  const b =
    normalizeText(
      second
    );

  // Step 3: Compare.
  return (
    a
    ===
    b
  );
}
```

---

# 77. Test Comparison

```js
// Step 1: Compare normalized text.
console.log(
  equalsIgnoreCase(
    " Rahul ",
    "rahul"
  )
); // Output: true
```

Output:

```text
true
```

---

# 78. Parse Query String 🔥🔥🔥

Input:

```text
name=Rahul&department=IT&page=2
```

Wanted:

```js
{
  name:
    "Rahul",
  department:
    "IT",
  page:
    "2",
}
```

---

# 79. Build `parseQueryString()`

```js
function parseQueryString(
  queryString
) {
  // Step 1: Remove leading ?
  // when it exists.
  const clean =
    queryString.startsWith(
      "?"
    )
      ? queryString.slice(
          1
        )
      : queryString;

  // Step 2: Parse query.
  const params =
    new URLSearchParams(
      clean
    );

  // Step 3: Convert entries
  // into normal object.
  return Object.fromEntries(
    params.entries()
  );
}
```

---

# 80. Test Query Parsing

```js
// Step 1: Parse query.
const result =
  parseQueryString(
    "name=Rahul&department=IT&page=2"
  );

// Step 2: Print page.
console.log(
  result.page
); // Output: 2

// Step 3: Print name.
console.log(
  result.name
); // Output: Rahul
```

Output:

```text
2
Rahul
```

Important:

```text
query values are strings by default
```

---

# 81. Build Query String 🔥🔥🔥

Input:

```js
{
  name:
    "Rahul",
  department:
    "IT",
}
```

Wanted:

```text
name=Rahul&department=IT
```

---

# 82. Build `buildQueryString()`

```js
function buildQueryString(
  object
) {
  // Step 1: Convert object
  // into URLSearchParams.
  const params =
    new URLSearchParams(
      object
    );

  // Step 2: Convert to string.
  return params.toString();
}
```

---

# 83. Test Query Building

```js
// Step 1: Build query string.
const result =
  buildQueryString(
    {
      name:
        "Rahul",
      department:
        "IT",
    }
  );

// Step 2: Print result.
console.log(
  result
); // Output: name=Rahul&department=IT
```

Output:

```text
name=Rahul&department=IT
```

---

# 84. Template Replacement 🔥🔥🔥

Requirement:

```text
"Hello {name}"
+
{name: "Rahul"}

↓
"Hello Rahul"
```

---

# 85. Build `fillTemplate()`

```js
function fillTemplate(
  template,
  values
) {
  // Step 1: Find placeholders
  // like {name}.
  return template.replace(
    /\{(\w+)\}/g,
    (
      fullMatch,
      key
    ) => {
      // Step 2: Key exists?
      if (
        Object.hasOwn(
          values,
          key
        )
      ) {
        // Step 3: Replace placeholder.
        return String(
          values[
            key
          ]
        );
      }

      // Step 4: Missing key?
      // Keep original placeholder.
      return fullMatch;
    }
  );
}
```

---

# 86. Test Template Replacement

```js
// Step 1: Fill template.
const result =
  fillTemplate(
    "Hello {name}, your role is {role}",
    {
      name:
        "Rahul",
      role:
        "Developer",
    }
  );

// Step 2: Print result.
console.log(
  result
); // Output: Hello Rahul, your role is Developer
```

Output:

```text
Hello Rahul, your role is Developer
```

---

# 87. Remove Extra Spaces 🔥🔥🔥

Requirement:

```text
"   Rahul     Sharma   "
↓
"Rahul Sharma"
```

---

# 88. Build `normalizeSpaces()`

```js
function normalizeSpaces(
  text
) {
  // Step 1: Remove outer spaces.
  const trimmed =
    text.trim();

  // Step 2: Replace
  // one or more whitespace characters
  // with one normal space.
  return trimmed.replace(
    /\s+/g,
    " "
  );
}
```

---

# 89. Test Normalize Spaces

```js
// Step 1: Clean spaces.
console.log(
  normalizeSpaces(
    "   Rahul     Sharma   "
  )
); // Output: Rahul Sharma
```

Output:

```text
Rahul Sharma
```

---

# 90. Common Mistake — Strings Are Immutable 🔥🔥🔥

```js
let name =
  "rahul";

// Step 1: This returns a new string.
// It does NOT change name.
name.toUpperCase();

// Step 2: Original is unchanged.
console.log(
  name
); // Output: rahul
```

Output:

```text
rahul
```

Correct:

```js
name =
  name.toUpperCase();

console.log(
  name
); // Output: RAHUL
```

---

# 91. Common Mistake — `split()` Separator

```js
"ABC".split(
  ""
);
```

Output:

```text
["A", "B", "C"]
```

But:

```js
"Rahul Sharma".split(
  " "
);
```

Output:

```text
["Rahul", "Sharma"]
```

---

# 92. Common Mistake — Case-Sensitive Search

```js
"Rahul".includes(
  "rahul"
);
```

Output:

```text
false
```

Better:

```text
normalize both sides
```

---

# 93. Common Mistake — Regex With Raw User Input

Wrong:

```js
new RegExp(
  userInput
);
```

If input contains:

```text
.
+
*
?
(
)
```

regex meaning changes.

Use:

```text
escapeRegex(userInput)
```

first.

---

# 94. Common Mistake — Bad Email Split Assumption

`email.split("@")` does not automatically guarantee a valid email.

Check:

```text
username exists?
domain exists?
```

before masking.

---

# 95. Common Mistake — `trim()` Only Removes Outer Spaces

```text
"  Rahul   Sharma  "
↓ trim()
"Rahul   Sharma"
```

Inner repeated spaces remain.

Use:

```text
replace(/\s+/g, " ")
```

when you need to normalize all spacing.

---

# 96. Interview Question — Why Normalize Strings?

Easy answer:

```text
Normalization makes comparison predictable.

I usually trim outer spaces
and convert text to lowercase
for case-insensitive search.
```

---

# 97. Interview Question — How Do You Reverse a String?

```text
split into characters
↓
reverse array
↓
join back
```

---

# 98. Interview Question — Palindrome?

```text
normalize
↓
reverse
↓
compare
```

---

# 99. Interview Question — Anagram?

Easy answer:

```text
For a simple solution:
normalize both strings,
sort their characters,
and compare them.

For large inputs,
frequency counting can be more efficient.
```

---

# 100. Interview Question — Why Frequency Map?

```text
It tells us how many times
each character appears.

Useful for:
duplicates
unique characters
most frequent character
anagrams
```

---

# 101. Interview Question — Why Escape Regex?

```text
User text may contain
regex special characters.

Escaping makes those characters
behave like normal text.
```

---

# 102. Interview Question — Why URLSearchParams?

```text
It makes query-string parsing
and building much easier
than manual splitting.
```

---

# 103. Interview Question — Why Preserve Original Match Text?

```text
Search can ignore case,
but UI should usually show
the original formatting.
```

---

# 104. Quick Decision Guide 🔥🔥🔥

```text
Clean search text?
→ normalizeText

Uppercase first letter?
→ capitalize

Capitalize every word?
→ capitalizeWords

Reverse characters?
→ reverseString

Reverse word order?
→ reverseWords

Palindrome?
→ isPalindrome

Anagram?
→ isAnagram

Count characters?
→ characterFrequency

Count one character?
→ countCharacter

First unique?
→ firstUniqueCharacter

Most frequent?
→ mostFrequentCharacter

Remove duplicate characters?
→ removeDuplicateCharacters

Shorten text?
→ truncate

Avatar initials?
→ getInitials

Mask email?
→ maskEmail

URL slug?
→ slugify

snake_case?
→ toSnakeCase

camelCase?
→ toCamelCase

kebab-case?
→ toKebabCase

Count words?
→ countWords

Highlight search?
→ splitMatch

Regex-safe search?
→ escapeRegex + containsText

Parse query?
→ parseQueryString

Build query?
→ buildQueryString

Fill placeholders?
→ fillTemplate

Clean repeated spaces?
→ normalizeSpaces
```

---

# 105. Quick Memory 🧠🔥🔥🔥

```text
trim
→ remove outer spaces

toLowerCase
→ normalize case

split("")
→ string to characters

join("")
→ characters to string

reverse
→ reverse array

frequency object
→ count characters

Set
→ remove duplicates

slice
→ extract string part

repeat
→ repeat characters

replace
→ replace text/regex match

Regex
→ powerful search

URLSearchParams
→ query strings
```

---

# 106. Best Interview Answer 🔥🔥🔥

```text
For string utilities,
I first normalize input
when comparison is required.

Common helpers include:
capitalize,
reverse,
palindrome,
anagram,
frequency counting,
truncate,
maskEmail,
slugify,
case conversion,
word count,
search highlighting,
and query-string parsing.

For user search,
I normalize both query and source text.

If I create a regex from user input,
I escape regex special characters first.

For URL query strings,
I prefer URLSearchParams.

I also remember that JavaScript strings
are immutable,
so string methods return new strings
instead of modifying the original string.
```

---

# ✅ 9.9 String Utilities Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ✅
9.4 Build Utilities ✅
9.5 Data Transformation ✅
9.6 Machine-Coding Utilities ✅
9.7 Promise Implementations ✅
9.8 Event System ✅
9.9 String Utilities ✅

9.10 DOM / Browser Practical ← NEXT
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.10 DOM / Browser Practical 🔥🔥🔥
```
