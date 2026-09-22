# 6.12 Strings 🔥🔥🔥

Strings are used to store and work with text.

Examples:

```js
const name = "Rahul";
const role = "Frontend Developer";
const email = "rahul@example.com";
```

A string is a sequence of characters.

Think:

```text
"JavaScript"

J a v a S c r i p t
0 1 2 3 4 5 6 7 8 9
```

Strings are used everywhere:

```text
names
emails
search boxes
form inputs
URLs
API data
validation
formatting
labels
messages
machine coding
```

---

# 1. Creating Strings

You can create strings using:

```js
const a = "Hello";
const b = 'Hello';
const c = `Hello`;
```

All three create strings.

---

# 2. Double Quotes vs Single Quotes

These are both valid:

```js
const name1 = "Rahul";
const name2 = 'Rahul';
```

Choose one style and stay consistent.

---

# 3. Template Literals 🔥🔥🔥

Template literals use backticks:

```js
const name = "Rahul";

const message =
  `Hello ${name}`;
```

Output:

```text
Hello Rahul
```

`${}` allows expressions inside the string.

---

# 4. Template Literals With Expressions

```js
const price = 500;
const quantity = 3;

const message =
  `Total: ${price * quantity}`;
```

Output:

```text
Total: 1500
```

Inside `${}` you can run JavaScript expressions.

---

# 5. Multiline Strings

Template literals can span multiple lines.

```js
const message = `
Hello Rahul
Welcome back
`;
```

This is cleaner than manually adding `\n`.

---

# 6. String Length 🔥🔥🔥

Use:

```js
.length
```

Example:

```js
const text = "JavaScript";

console.log(
  text.length
);
```

Output:

```text
10
```

Important:

```text
length
→ number of UTF-16 code units
```

For normal interview/basic usage, think of it as character count for typical text.

---

# 7. Access Character by Index

```js
const text = "JavaScript";

console.log(
  text[0]
);
```

Output:

```text
J
```

Another:

```js
console.log(
  text[4]
);
```

Output:

```text
S
```

Strings use zero-based indexing.

---

# 8. Access Last Character

```js
const text = "JavaScript";

console.log(
  text[text.length - 1]
);
```

Output:

```text
t
```

---

# 9. `charAt()` 🔥🔥

```js
const text = "JavaScript";

console.log(
  text.charAt(0)
);
```

Output:

```text
J
```

---

# 10. `at()` 🔥🔥🔥

`at()` supports negative indexes.

```js
const text = "JavaScript";

console.log(
  text.at(0)
);
```

Output:

```text
J
```

Last character:

```js
console.log(
  text.at(-1)
);
```

Output:

```text
t
```

This is very convenient.

---

# 11. `text[index]` vs `charAt()` vs `at()`

```text
text[0]
→ modern simple access

charAt(0)
→ older method

text.at(-1)
→ convenient negative indexing
```

For last character:

```js
text.at(-1)
```

is clean.

---

# 12. Strings Are Immutable 🔥🔥🔥

This is extremely important.

```js
let text = "Hello";

text[0] = "Y";

console.log(text);
```

Output:

```text
Hello
```

The original string character cannot be changed directly.

Strings are immutable.

---

# 13. How to "Change" a String

You create a new string.

```js
let text = "Hello";

text =
  "Y" + text.slice(1);

console.log(text);
```

Output:

```text
Yello
```

The variable can point to a new string.

The original string itself was not mutated.

---

# 14. Concatenation With `+`

```js
const firstName = "Rahul";
const lastName = "Sharma";

const fullName =
  firstName + " " + lastName;
```

Output:

```text
Rahul Sharma
```

---

# 15. Prefer Template Literals for Readability

Instead of:

```js
const message =
  "Hello " +
  name +
  ", your salary is " +
  salary;
```

write:

```js
const message =
  `Hello ${name}, your salary is ${salary}`;
```

Usually easier to read.

---

# 16. `concat()`

```js
const first = "Hello";
const second = "World";

const result =
  first.concat(
    " ",
    second
  );
```

Output:

```text
Hello World
```

In modern code, template literals or `+` are often more common.

---

# 17. `includes()` 🔥🔥🔥

Checks whether a string contains another string.

```js
const text =
  "JavaScript Interview";

console.log(
  text.includes(
    "Script"
  )
);
```

Output:

```text
true
```

---

# 18. `includes()` Is Case-Sensitive

```js
const text =
  "JavaScript";

console.log(
  text.includes(
    "javascript"
  )
);
```

Output:

```text
false
```

Because:

```text
J
≠
j
```

---

# 19. Case-Insensitive Search 🔥🔥🔥

Normalize both sides.

```js
const text =
  "JavaScript Interview";

const query =
  "javascript";

const found =
  text
    .toLowerCase()
    .includes(
      query.toLowerCase()
    );

console.log(found);
```

Output:

```text
true
```

Very important for search functionality.

---

# 20. `indexOf()` 🔥🔥

Returns the first matching index.

```js
const text =
  "JavaScript";

console.log(
  text.indexOf(
    "Script"
  )
);
```

Output:

```text
4
```

---

# 21. `indexOf()` When Not Found

```js
console.log(
  "JavaScript".indexOf(
    "Python"
  )
);
```

Output:

```text
-1
```

So:

```text
found
→ index >= 0

not found
→ -1
```

---

# 22. `lastIndexOf()`

```js
const text =
  "one two one";

console.log(
  text.lastIndexOf(
    "one"
  )
);
```

Output:

```text
8
```

It finds the last matching occurrence.

---

# 23. `startsWith()` 🔥🔥

```js
const url =
  "https://example.com";

console.log(
  url.startsWith(
    "https://"
  )
);
```

Output:

```text
true
```

Useful for:

```text
URLs
prefix checks
file paths
validation
```

---

# 24. `endsWith()` 🔥🔥

```js
const file =
  "resume.pdf";

console.log(
  file.endsWith(
    ".pdf"
  )
);
```

Output:

```text
true
```

Useful for file-extension checks.

---

# 25. `slice()` 🔥🔥🔥

Extracts part of a string.

```js
const text =
  "JavaScript";

console.log(
  text.slice(
    0,
    4
  )
);
```

Output:

```text
Java
```

Important:

```text
start included
end excluded
```

---

# 26. `slice()` With One Argument

```js
const text =
  "JavaScript";

console.log(
  text.slice(4)
);
```

Output:

```text
Script
```

It takes from index `4` to the end.

---

# 27. `slice()` With Negative Index 🔥🔥🔥

```js
const text =
  "JavaScript";

console.log(
  text.slice(-6)
);
```

Output:

```text
Script
```

Negative index counts from the end.

---

# 28. `slice()` Last N Characters

```js
const text =
  "1234567890";

const last4 =
  text.slice(-4);

console.log(last4);
```

Output:

```text
7890
```

Useful for:

```text
masked cards
phone numbers
IDs
file extensions
```

---

# 29. `substring()` 🔥🔥

```js
const text =
  "JavaScript";

console.log(
  text.substring(
    0,
    4
  )
);
```

Output:

```text
Java
```

Looks similar to `slice()`.

---

# 30. `slice()` vs `substring()` 🔥🔥🔥

Main practical difference:

```text
slice()
→ supports negative indexes

substring()
→ negative values are treated like 0
```

Example:

```js
console.log(
  "JavaScript".slice(-6)
);
```

Output:

```text
Script
```

But:

```js
console.log(
  "JavaScript".substring(-6)
);
```

behaves like:

```js
"JavaScript".substring(0)
```

So practical recommendation:

```text
Prefer slice()
```

for most modern string extraction.

---

# 31. `split()` 🔥🔥🔥

Converts a string into an array.

```js
const text =
  "React,Node,JavaScript";

const skills =
  text.split(",");

console.log(skills);
```

Output:

```text
[
  "React",
  "Node",
  "JavaScript"
]
```

Mental model:

```text
String
↓ split()
Array
```

---

# 32. Split by Space

```js
const sentence =
  "JavaScript is powerful";

const words =
  sentence.split(" ");
```

Result:

```text
[
  "JavaScript",
  "is",
  "powerful"
]
```

---

# 33. Split Into Characters

```js
const text = "ABC";

const chars =
  text.split("");
```

Result:

```text
["A", "B", "C"]
```

Modern alternative:

```js
[...text]
```

---

# 34. Split + Join 🔥🔥🔥

A very common string transformation pattern.

```js
const text =
  "JavaScript";

const reversed =
  text
    .split("")
    .reverse()
    .join("");

console.log(reversed);
```

Output:

```text
tpircSavaJ
```

Flow:

```text
string
↓ split("")
array
↓ reverse()
array
↓ join("")
string
```

---

# 35. `join()` Is an Array Method

Important:

```text
split()
→ String → Array

join()
→ Array → String
```

Example:

```js
const words = [
  "Hello",
  "Rahul",
];

const sentence =
  words.join(" ");
```

Output:

```text
Hello Rahul
```

---

# 36. `replace()` 🔥🔥🔥

Replaces the first matching occurrence.

```js
const text =
  "I like JavaScript";

const result =
  text.replace(
    "JavaScript",
    "TypeScript"
  );

console.log(result);
```

Output:

```text
I like TypeScript
```

---

# 37. `replace()` Replaces First Match by Default

```js
const text =
  "cat cat cat";

const result =
  text.replace(
    "cat",
    "dog"
  );
```

Output:

```text
dog cat cat
```

Only the first string match was replaced.

---

# 38. `replaceAll()` 🔥🔥

```js
const text =
  "cat cat cat";

const result =
  text.replaceAll(
    "cat",
    "dog"
  );
```

Output:

```text
dog dog dog
```

---

# 39. `replace()` With Regex Awareness

```js
const text =
  "cat cat cat";

const result =
  text.replace(
    /cat/g,
    "dog"
  );
```

Output:

```text
dog dog dog
```

Regex will be covered separately later.

---

# 40. `trim()` 🔥🔥🔥

Removes whitespace from both ends.

```js
const input =
  "   Rahul   ";

console.log(
  input.trim()
);
```

Output:

```text
Rahul
```

Very important for form inputs.

---

# 41. `trimStart()`

```js
const text =
  "   Rahul   ";

console.log(
  text.trimStart()
);
```

Removes leading whitespace only.

---

# 42. `trimEnd()`

```js
const text =
  "   Rahul   ";

console.log(
  text.trimEnd()
);
```

Removes trailing whitespace only.

---

# 43. Form Input Cleanup 🔥🔥🔥

Typical pattern:

```js
const cleanedName =
  name.trim();
```

For email:

```js
const cleanedEmail =
  email
    .trim()
    .toLowerCase();
```

Very common in real applications.

---

# 44. `toUpperCase()`

```js
const text = "rahul";

console.log(
  text.toUpperCase()
);
```

Output:

```text
RAHUL
```

---

# 45. `toLowerCase()` 🔥🔥🔥

```js
const text = "RAHUL";

console.log(
  text.toLowerCase()
);
```

Output:

```text
rahul
```

Very important for:

```text
case-insensitive search
email normalization
comparison
filters
```

---

# 46. Case-Insensitive Equality

```js
const a =
  "JavaScript";

const b =
  "javascript";

console.log(
  a.toLowerCase() ===
  b.toLowerCase()
);
```

Output:

```text
true
```

---

# 47. `repeat()`

```js
const text = "Hi ";

console.log(
  text.repeat(3)
);
```

Output:

```text
Hi Hi Hi 
```

Useful occasionally for formatting or coding problems.

---

# 48. String Comparison

```js
console.log(
  "abc" === "abc"
);
```

Output:

```text
true
```

Strings are primitive values.

Equality compares their values.

---

# 49. Case-Sensitive Comparison

```js
console.log(
  "ABC" === "abc"
);
```

Output:

```text
false
```

---

# 50. Lexicographical Comparison 🔥🔥

```js
console.log(
  "apple" < "banana"
);
```

Output:

```text
true
```

Strings can be compared lexicographically.

For user-facing sorting, locale-aware methods may be more appropriate.

---

# 51. `localeCompare()` Awareness

```js
const names = [
  "Rahul",
  "Amit",
  "John",
];

names.sort(
  (a, b) =>
    a.localeCompare(b)
);
```

This is useful for string sorting.

Modern non-mutating variant:

```js
const sorted =
  names.toSorted(
    (a, b) =>
      a.localeCompare(b)
  );
```

---

# 52. Search Filter Example 🔥🔥🔥

Suppose:

```js
const employees = [
  {
    name: "Rahul",
  },
  {
    name: "Amit",
  },
  {
    name: "John",
  },
];
```

Search:

```js
const query =
  "ra";

const filtered =
  employees.filter(
    ({ name }) =>
      name
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
  );
```

Result:

```text
Rahul
```

This is a very common machine-coding pattern.

---

# 53. Better Search Normalization

Instead of calling `query.toLowerCase()` repeatedly:

```js
const normalizedQuery =
  query
    .trim()
    .toLowerCase();

const filtered =
  employees.filter(
    ({ name }) =>
      name
        .toLowerCase()
        .includes(
          normalizedQuery
        )
  );
```

Cleaner and more efficient.

---

# 54. Reverse a String 🔥🔥🔥

```js
function reverseString(
  text
) {
  return text
    .split("")
    .reverse()
    .join("");
}
```

Usage:

```js
console.log(
  reverseString(
    "hello"
  )
);
```

Output:

```text
olleh
```

---

# 55. Reverse String Without `reverse()`

Interview-style implementation:

```js
function reverseString(
  text
) {
  let result = "";

  for (
    let i =
      text.length - 1;
    i >= 0;
    i--
  ) {
    result += text[i];
  }

  return result;
}
```

Useful when interviewer asks:

```text
without built-in reverse()
```

---

# 56. Palindrome 🔥🔥🔥

A palindrome reads the same forward and backward.

Examples:

```text
madam
level
racecar
```

Implementation:

```js
function isPalindrome(
  text
) {
  const normalized =
    text.toLowerCase();

  const reversed =
    normalized
      .split("")
      .reverse()
      .join("");

  return (
    normalized === reversed
  );
}
```

---

# 57. Palindrome With Spaces

Suppose:

```text
"nurses run"
```

Normalize:

```js
function isPalindrome(
  text
) {
  const normalized =
    text
      .toLowerCase()
      .replaceAll(
        " ",
        ""
      );

  return (
    normalized ===
    normalized
      .split("")
      .reverse()
      .join("")
  );
}
```

Regex can make normalization more powerful later.

---

# 58. Reverse Words 🔥🔥🔥

Input:

```text
"JavaScript is powerful"
```

Expected:

```text
"powerful is JavaScript"
```

Implementation:

```js
function reverseWords(
  sentence
) {
  return sentence
    .trim()
    .split(" ")
    .reverse()
    .join(" ");
}
```

---

# 59. Reverse Each Word

Input:

```text
"hello world"
```

Expected:

```text
"olleh dlrow"
```

Implementation:

```js
function reverseEachWord(
  sentence
) {
  return sentence
    .split(" ")
    .map(
      (word) =>
        word
          .split("")
          .reverse()
          .join("")
    )
    .join(" ");
}
```

---

# 60. Character Frequency 🔥🔥🔥

Input:

```text
"banana"
```

Expected:

```js
{
  b: 1,
  a: 3,
  n: 2
}
```

Implementation:

```js
function charFrequency(
  text
) {
  const frequency = {};

  for (const char of text) {
    frequency[char] =
      (
        frequency[char]
        ?? 0
      ) + 1;
  }

  return frequency;
}
```

Very important interview pattern.

---

# 61. Case-Insensitive Character Frequency

```js
function charFrequency(
  text
) {
  const frequency = {};

  for (
    const char
    of text.toLowerCase()
  ) {
    frequency[char] =
      (
        frequency[char]
        ?? 0
      ) + 1;
  }

  return frequency;
}
```

---

# 62. Word Frequency 🔥🔥🔥

```js
function wordFrequency(
  sentence
) {
  const words =
    sentence
      .toLowerCase()
      .trim()
      .split(/\s+/);

  const frequency = {};

  for (const word of words) {
    frequency[word] =
      (
        frequency[word]
        ?? 0
      ) + 1;
  }

  return frequency;
}
```

Example:

```text
"js is good js"
```

Result:

```js
{
  js: 2,
  is: 1,
  good: 1
}
```

Regex detail comes later.

---

# 63. Remove Duplicate Characters 🔥🔥

Input:

```text
"banana"
```

Implementation:

```js
function uniqueChars(
  text
) {
  return [
    ...new Set(text),
  ].join("");
}
```

Output:

```text
ban
```

---

# 64. Remove Duplicate Words

```js
function uniqueWords(
  sentence
) {
  return [
    ...new Set(
      sentence.split(" ")
    ),
  ].join(" ");
}
```

Input:

```text
"js react js node"
```

Output:

```text
js react node
```

---

# 65. Capitalize First Letter 🔥🔥🔥

```js
function capitalize(
  text
) {
  if (!text) {
    return text;
  }

  return (
    text[0]
      .toUpperCase()
    +
    text.slice(1)
  );
}
```

Input:

```text
rahul
```

Output:

```text
Rahul
```

---

# 66. Capitalize Every Word 🔥🔥🔥

```js
function capitalizeWords(
  sentence
) {
  return sentence
    .split(" ")
    .map(
      (word) =>
        word
          ? word[0]
              .toUpperCase()
            +
            word.slice(1)
          : word
    )
    .join(" ");
}
```

Input:

```text
"javascript interview preparation"
```

Output:

```text
"JavaScript Interview Preparation"
```

---

# 67. Slug Generation 🔥🔥🔥

Input:

```text
"JavaScript Interview Questions"
```

Expected:

```text
javascript-interview-questions
```

Basic implementation:

```js
function slugify(
  text
) {
  return text
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .join("-");
}
```

---

# 68. Better Slug Generation

For multiple spaces:

```js
function slugify(
  text
) {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .join("-");
}
```

Later regex can handle punctuation too.

---

# 69. Email Parsing 🔥🔥

Suppose:

```js
const email =
  "rahul@example.com";
```

Split:

```js
const [
  username,
  domain,
] = email.split("@");
```

Now:

```text
username
→ "rahul"

domain
→ "example.com"
```

---

# 70. Extract Domain From Email

```js
function getEmailDomain(
  email
) {
  return email
    .split("@")
    .at(-1);
}
```

For:

```text
rahul@example.com
```

Result:

```text
example.com
```

---

# 71. URL Processing 🔥🔥🔥

Suppose:

```js
const url =
  "https://example.com/products/123";
```

Check protocol:

```js
url.startsWith(
  "https://"
);
```

Check path:

```js
url.includes(
  "/products/"
);
```

Extract last segment:

```js
const id =
  url
    .split("/")
    .filter(Boolean)
    .at(-1);
```

Result:

```text
123
```

---

# 72. Extract File Extension

```js
function getExtension(
  fileName
) {
  return fileName
    .split(".")
    .at(-1);
}
```

Input:

```text
resume.pdf
```

Output:

```text
pdf
```

---

# 73. Mask Sensitive Data 🔥🔥🔥

Suppose:

```text
9876543210
```

Show last four digits:

```js
function maskPhone(
  phone
) {
  const last4 =
    phone.slice(-4);

  return (
    "*".repeat(
      phone.length - 4
    ) + last4
  );
}
```

Output:

```text
******3210
```

---

# 74. Truncate String 🔥🔥🔥

```js
function truncate(
  text,
  maxLength
) {
  if (
    text.length <=
    maxLength
  ) {
    return text;
  }

  return (
    text.slice(
      0,
      maxLength
    ) + "..."
  );
}
```

Useful for cards and tables.

---

# 75. Better Truncate With Ellipsis Included

If max total length should include `...`:

```js
function truncate(
  text,
  maxLength
) {
  if (
    text.length <=
    maxLength
  ) {
    return text;
  }

  return (
    text.slice(
      0,
      maxLength - 3
    )
    + "..."
  );
}
```

---

# 76. Search Highlight Logic 🔥🔥🔥

Suppose:

```js
const text =
  "JavaScript Interview";

const query =
  "script";
```

Find index:

```js
const index =
  text
    .toLowerCase()
    .indexOf(
      query.toLowerCase()
    );
```

If:

```text
index >= 0
```

you can split into:

```text
before match
match
after match
```

Example:

```js
const before =
  text.slice(
    0,
    index
  );

const match =
  text.slice(
    index,
    index + query.length
  );

const after =
  text.slice(
    index + query.length
  );
```

This pattern is useful in search-result highlighting.

---

# 77. Count Occurrences of Character 🔥🔥

```js
function countChar(
  text,
  target
) {
  let count = 0;

  for (const char of text) {
    if (char === target) {
      count++;
    }
  }

  return count;
}
```

---

# 78. Count Occurrences With `split()`

```js
function countChar(
  text,
  target
) {
  return (
    text
      .split(target)
      .length - 1
  );
}
```

This is concise but less flexible.

---

# 79. Find First Non-Repeating Character 🔥🔥🔥

```js
function firstUniqueChar(
  text
) {
  const frequency = {};

  for (const char of text) {
    frequency[char] =
      (
        frequency[char]
        ?? 0
      ) + 1;
  }

  for (const char of text) {
    if (
      frequency[char] === 1
    ) {
      return char;
    }
  }

  return null;
}
```

Input:

```text
aabbcdde
```

Output:

```text
c
```

Classic interview problem.

---

# 80. Find Most Frequent Character 🔥🔥🔥

```js
function mostFrequentChar(
  text
) {
  const frequency = {};

  let maxChar = null;
  let maxCount = 0;

  for (const char of text) {
    frequency[char] =
      (
        frequency[char]
        ?? 0
      ) + 1;

    if (
      frequency[char] >
      maxCount
    ) {
      maxCount =
        frequency[char];

      maxChar = char;
    }
  }

  return maxChar;
}
```

---

# 81. Check Anagrams 🔥🔥🔥

Two words are anagrams if they contain the same characters with the same frequencies.

Example:

```text
listen
silent
```

Simple approach:

```js
function normalize(
  text
) {
  return text
    .toLowerCase()
    .split("")
    .sort()
    .join("");
}

function isAnagram(
  a,
  b
) {
  return (
    normalize(a) ===
    normalize(b)
  );
}
```

---

# 82. Anagram Frequency Approach

More interview-friendly for discussing complexity:

```js
function isAnagram(
  a,
  b
) {
  if (
    a.length !== b.length
  ) {
    return false;
  }

  const frequency = {};

  for (const char of a) {
    frequency[char] =
      (
        frequency[char]
        ?? 0
      ) + 1;
  }

  for (const char of b) {
    if (!frequency[char]) {
      return false;
    }

    frequency[char]--;
  }

  return true;
}
```

---

# 83. String to Number Awareness

```js
const value =
  "123";

console.log(
  Number(value)
);
```

Output:

```text
123
```

This belongs primarily to type conversion, but strings frequently arrive from:

```text
forms
query params
API responses
localStorage
```

---

# 84. Number to String Awareness

```js
const id = 101;

const text =
  String(id);
```

Result:

```text
"101"
```

---

# 85. Interview Output — String Immutability 🔥🔥🔥

```js
let text = "abc";

text[0] = "x";

console.log(text);
```

Output:

```text
abc
```

Because strings are immutable.

---

# 86. Interview Output — `slice()`

```js
const text =
  "JavaScript";

console.log(
  text.slice(
    4,
    10
  )
);
```

Output:

```text
Script
```

---

# 87. Interview Output — Negative `slice()`

```js
console.log(
  "JavaScript".slice(
    -6
  )
);
```

Output:

```text
Script
```

---

# 88. Interview Output — `includes()`

```js
console.log(
  "JavaScript".includes(
    "java"
  )
);
```

Output:

```text
false
```

Case-sensitive.

---

# 89. Interview Output — `indexOf()`

```js
console.log(
  "banana".indexOf(
    "na"
  )
);
```

Output:

```text
2
```

First matching index.

---

# 90. Interview Output — `lastIndexOf()`

```js
console.log(
  "banana".lastIndexOf(
    "na"
  )
);
```

Output:

```text
4
```

---

# 91. Interview Output — `split()`

```js
console.log(
  "a,b,c".split(",")
);
```

Output:

```text
["a", "b", "c"]
```

---

# 92. Interview Output — `replace()`

```js
console.log(
  "cat cat".replace(
    "cat",
    "dog"
  )
);
```

Output:

```text
dog cat
```

Only the first string match is replaced.

---

# 93. Interview Output — `replaceAll()`

```js
console.log(
  "cat cat".replaceAll(
    "cat",
    "dog"
  )
);
```

Output:

```text
dog dog
```

---

# 94. Interview Output — Default Search Trap

```js
const query = "JS";

const text =
  "javascript";

console.log(
  text.includes(query)
);
```

Output:

```text
false
```

Why?

Case-sensitive comparison.

Fix:

```js
text
  .toLowerCase()
  .includes(
    query.toLowerCase()
  );
```

---

# 95. Interview Question — Are Strings Mutable?

No.

Strings are immutable primitive values.

String methods return new strings rather than modifying the original string.

Example:

```js
const text = "abc";

const upper =
  text.toUpperCase();

console.log(text);
console.log(upper);
```

Output:

```text
abc
ABC
```

---

# 96. Interview Question — `slice()` vs `substring()`

Good answer:

```text
Both extract part of a string.

slice()
→ supports negative indexes

substring()
→ treats negative indexes as 0
```

For modern code:

```text
slice()
```

is usually easier and more flexible.

---

# 97. Interview Question — `includes()` vs `indexOf()`

```text
includes()
→ returns boolean

indexOf()
→ returns numeric index or -1
```

Use:

```text
includes()
```

when you only need:

```text
found / not found
```

Use:

```text
indexOf()
```

when you need the location.

---

# 98. Interview Question — `replace()` vs `replaceAll()`

```text
replace()
→ first string match by default

replaceAll()
→ all matching string occurrences
```

Regex can change `replace()` behavior.

---

# 99. Interview Question — How Do You Perform Case-Insensitive Search?

Normalize both values:

```js
text
  .toLowerCase()
  .includes(
    query.toLowerCase()
  );
```

Often also trim user input:

```js
const normalizedQuery =
  query
    .trim()
    .toLowerCase();
```

---

# 100. Debugging — Forgot `trim()` 🔥🔥🔥

Suppose user enters:

```text
"   Rahul   "
```

Comparison:

```js
input === "Rahul"
```

returns:

```text
false
```

Fix:

```js
input.trim() ===
"Rahul"
```

---

# 101. Debugging — Case-Sensitive Search

Bad:

```js
employee.name.includes(
  query
);
```

If casing differs, valid results may be missed.

Better:

```js
employee.name
  .toLowerCase()
  .includes(
    query
      .trim()
      .toLowerCase()
  );
```

---

# 102. Debugging — `replace()` Only Replaced One

Bad assumption:

```js
"1-2-3-4".replace(
  "-",
  ""
);
```

Output:

```text
12-3-4
```

If all should be removed:

```js
"1-2-3-4".replaceAll(
  "-",
  ""
);
```

Output:

```text
1234
```

---

# 103. Debugging — Splitting on Exact Single Space

Suppose input:

```text
"JavaScript   is   powerful"
```

This:

```js
text.split(" ")
```

may create empty strings.

Better:

```js
text
  .trim()
  .split(/\s+/);
```

Regex details come later.

---

# 104. Debugging — Forgetting Strings Are Immutable

Bad assumption:

```js
const text = "hello";

text.toUpperCase();

console.log(text);
```

Output:

```text
hello
```

Why?

`toUpperCase()` returns a new string.

Correct:

```js
const upper =
  text.toUpperCase();
```

or:

```js
text =
  text.toUpperCase();
```

if `text` was declared with `let`.

---

# 105. Machine-Coding Pattern — Search 🔥🔥🔥

```js
function matchesSearch(
  text,
  query
) {
  const normalizedText =
    text
      .trim()
      .toLowerCase();

  const normalizedQuery =
    query
      .trim()
      .toLowerCase();

  return normalizedText
    .includes(
      normalizedQuery
    );
}
```

Reusable for:

```text
employee search
product search
table filters
dropdown filtering
```

---

# 106. Machine-Coding Pattern — Search Multiple Fields 🔥🔥🔥

```js
function matchesEmployee(
  employee,
  query
) {
  const q =
    query
      .trim()
      .toLowerCase();

  return [
    employee.name,
    employee.email,
    employee.department,
  ].some(
    (value) =>
      String(
        value ?? ""
      )
        .toLowerCase()
        .includes(q)
  );
}
```

Very practical machine-coding utility.

---

# 107. Machine-Coding Pattern — Clean Form Data

```js
function normalizeForm(
  form
) {
  return {
    ...form,

    name:
      form.name.trim(),

    email:
      form.email
        .trim()
        .toLowerCase(),
  };
}
```

Useful before validation or API submission.

---

# 108. Machine-Coding Pattern — Slugify

```js
function slugify(
  text
) {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .join("-");
}
```

Later regex can improve punctuation handling.

---

# 109. Machine-Coding Pattern — Highlight Search Match 🔥🔥🔥

```js
function splitMatch(
  text,
  query
) {
  const index =
    text
      .toLowerCase()
      .indexOf(
        query.toLowerCase()
      );

  if (index === -1) {
    return {
      before: text,
      match: "",
      after: "",
    };
  }

  return {
    before:
      text.slice(
        0,
        index
      ),

    match:
      text.slice(
        index,
        index + query.length
      ),

    after:
      text.slice(
        index + query.length
      ),
  };
}
```

Very useful for search-result UIs.

---

# 110. Machine-Coding Pattern — Initials

Input:

```text
"Rahul Kumar Sharma"
```

Expected:

```text
RKS
```

Implementation:

```js
function getInitials(
  name
) {
  return name
    .trim()
    .split(/\s+/)
    .map(
      (word) =>
        word[0]
          .toUpperCase()
    )
    .join("");
}
```

---

# 111. Machine-Coding Pattern — Mask Email 🔥🔥

Input:

```text
rahul@example.com
```

Possible output:

```text
r****@example.com
```

Implementation:

```js
function maskEmail(
  email
) {
  const [
    username,
    domain,
  ] = email.split("@");

  if (
    !username ||
    !domain
  ) {
    return email;
  }

  const masked =
    username[0]
    +
    "*".repeat(
      Math.max(
        username.length - 1,
        0
      )
    );

  return (
    `${masked}@${domain}`
  );
}
```

---

# 112. Machine-Coding Pattern — Parse Comma-Separated Input

Input:

```text
"React, Node, JavaScript"
```

Normalize:

```js
function parseSkills(
  input
) {
  return input
    .split(",")
    .map(
      (skill) =>
        skill.trim()
    )
    .filter(Boolean);
}
```

Output:

```text
[
  "React",
  "Node",
  "JavaScript"
]
```

Very practical for tag inputs.

---

# 113. Machine-Coding Pattern — Normalize Tags 🔥🔥🔥

```js
function normalizeTags(
  input
) {
  return [
    ...new Set(
      input
        .split(",")
        .map(
          (tag) =>
            tag
              .trim()
              .toLowerCase()
        )
        .filter(Boolean)
    ),
  ];
}
```

Input:

```text
"React, react, Node, JavaScript"
```

Output:

```text
[
  "react",
  "node",
  "javascript"
]
```

---

# 114. Machine-Coding Pattern — Truncate Table Cell

```js
function truncate(
  text,
  maxLength = 20
) {
  const value =
    String(
      text ?? ""
    );

  if (
    value.length <=
    maxLength
  ) {
    return value;
  }

  return (
    value.slice(
      0,
      maxLength - 3
    )
    + "..."
  );
}
```

Useful for table/list UIs.

---

# 115. Machine-Coding Pattern — Safe String Conversion

API values may be:

```text
null
undefined
number
boolean
```

If you need searchable text:

```js
const text =
  String(
    value ?? ""
  );
```

This avoids crashes like:

```js
value.toLowerCase()
```

when `value` is null.

---

# 116. Practical Decision Guide 🔥🔥🔥

Ask:

```text
Need string length?
→ text.length

Need one character?
→ text[index] / text.at()

Need last character?
→ text.at(-1)

Need contains check?
→ includes()

Need position?
→ indexOf()

Need last position?
→ lastIndexOf()

Need prefix?
→ startsWith()

Need suffix?
→ endsWith()

Need extract part?
→ slice()

Need String → Array?
→ split()

Need replace first?
→ replace()

Need replace all?
→ replaceAll()

Need remove outer spaces?
→ trim()

Need normalize case?
→ toLowerCase() / toUpperCase()

Need repeat text?
→ repeat()

Need case-insensitive search?
→ normalize both sides

Need reverse string?
→ split + reverse + join

Need frequency count?
→ loop + object/Map
```

---

# 117. Most Important Rules 🔥🔥🔥

```text
Strings are immutable.

String indexes start at 0.

length gives string length.

at(-1) gets the last character cleanly.

includes() is case-sensitive.

indexOf() returns -1 when not found.

slice() is usually preferred for substring extraction.

split() converts String → Array.

join() converts Array → String.

replace() replaces the first string match by default.

replaceAll() replaces all string matches.

trim() is essential for form input cleanup.

Normalize case for user search.

String methods return new strings.
```

---

# Quick Memory 🧠

Create:

```js
const text =
  "JavaScript";
```

Template literal:

```js
const message =
  `Hello ${name}`;
```

Length:

```js
text.length
```

Character:

```js
text[0]
text.at(-1)
```

Search:

```js
text.includes(
  "Script"
);

text.indexOf(
  "Script"
);
```

Prefix / suffix:

```js
text.startsWith(
  "Java"
);

text.endsWith(
  "Script"
);
```

Extract:

```js
text.slice(
  0,
  4
);
```

String → Array:

```js
text.split("");
```

Array → String:

```js
array.join("");
```

Replace:

```js
text.replace(
  "old",
  "new"
);

text.replaceAll(
  "old",
  "new"
);
```

Cleanup:

```js
text.trim();
```

Case:

```js
text.toLowerCase();
text.toUpperCase();
```

Reverse:

```js
text
  .split("")
  .reverse()
  .join("");
```

Case-insensitive search:

```js
text
  .toLowerCase()
  .includes(
    query
      .trim()
      .toLowerCase()
  );
```

Important:

```text
STRING
→ immutable
```

Most important interview problems:

```text
reverse string
reverse words
palindrome
character frequency
word frequency
first unique character
most frequent character
anagram
remove duplicates
capitalize words
```

Most important machine-coding uses:

```text
search
filter
form cleanup
email parsing
URL processing
slug generation
highlight search text
truncate text
normalize tags
mask sensitive text
```

## ✅ 6.12 Strings complete

**Next: 6.13 Dates 🔥🔥**
