# 6.18 Regex — Practical Basics 🔥🔥🔥

Regex means **Regular Expression**.

A regex is simply a **pattern used to describe what kind of text we are looking for**.

Before using methods like:

```text
test()
match()
replace()
```

you should first understand:

```text
What does the regex pattern itself mean?
```

That is the most important part.

Easy mental model:

```text
Text
↓
Regex Pattern
↓
Pattern checks the text
↓
match / no match
```

Example:

```js
const pattern =
  /\d/;
```

Before running it, understand the pattern:

```text
/   /
→ regex starts and ends here

\d
→ any digit from 0 to 9
```

So:

```text
/\d/
```

means:

```text
Find at least one digit anywhere in the text.
```

Now use it:

```js
// Step 1:
// Pattern meaning:
// \d = any digit from 0 to 9.
const pattern =
  /\d/;

// Step 2:
// "Employee101" contains digits.
const result =
  pattern.test(
    "Employee101"
  );

// Step 3: Print result.
console.log(
  result
); // Output: true
```

Output:

```text
true
```

Why?

```text
Employee101
        ^^^
        digits exist
```

---

# 1. First Understand How to Read a Regex Pattern 🔥🔥🔥

Take this regex:

```js
/abc/
```

Break it:

```text
/
→ regex starts

abc
→ exact text we want to find

/
→ regex ends
```

So:

```text
/abc/
```

means:

```text
Find the exact text "abc".
```

Example:

```js
// Step 1:
// Pattern means:
// Find exact text "abc".
const pattern =
  /abc/;

// Step 2:
// "123abc456" contains "abc".
console.log(
  pattern.test(
    "123abc456"
  )
); // Output: true

// Step 3:
// "ABC" is different because regex
// is case-sensitive by default.
console.log(
  pattern.test(
    "ABC"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 2. Regex Is a Pattern, Not a Normal String

Compare:

```js
const word =
  "abc";
```

This is a normal JavaScript string.

But:

```js
const pattern =
  /abc/;
```

This is a regex pattern.

Check:

```js
const word =
  "abc";

const pattern =
  /abc/;

// Step 1: Normal text is string.
console.log(
  typeof word
); // Output: string

// Step 2: Regex is an object.
console.log(
  typeof pattern
); // Output: object
```

Output:

```text
string
object
```

---

# 3. What Does `test()` Do?

`test()` does NOT create the pattern.

The pattern already exists.

`test()` simply asks:

```text
Does this text match my pattern?
```

Example pattern:

```js
/\d/
```

Meaning:

```text
Does the text contain any digit?
```

Now:

```js
// Step 1:
// \d means any digit.
const pattern =
  /\d/;

// Step 2:
// Ask:
// Does "abc5" contain a digit?
const firstResult =
  pattern.test(
    "abc5"
  );

// Step 3:
// Ask:
// Does "abc" contain a digit?
const secondResult =
  pattern.test(
    "abc"
  );

// Step 4: Print.
console.log(
  firstResult
); // Output: true

console.log(
  secondResult
); // Output: false
```

Output:

```text
true
false
```

Flow:

```text
pattern
/\d/
↓
means "find a digit"
↓
test("abc5")
↓
digit found
↓
true
```

---

# 4. Exact Text Pattern

Pattern:

```js
/hello/
```

Breakdown:

```text
hello
→ exact characters h e l l o
```

Meaning:

```text
Find the exact lowercase text "hello" anywhere.
```

Example:

```js
const pattern =
  /hello/;

// Step 1:
// Text contains exact lowercase "hello".
console.log(
  pattern.test(
    "hello world"
  )
); // Output: true

// Step 2:
// "Hello" has uppercase H.
console.log(
  pattern.test(
    "Hello world"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 5. Regex Is Case-Sensitive by Default

Pattern:

```js
/hello/
```

means:

```text
exact lowercase "hello"
```

It does NOT automatically match:

```text
Hello
HELLO
HeLLo
```

Example:

```js
const pattern =
  /hello/;

// Step 1: Exact lowercase.
console.log(
  pattern.test(
    "hello"
  )
); // Output: true

// Step 2: Different casing.
console.log(
  pattern.test(
    "HELLO"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 6. `i` Flag — Ignore Case 🔥🔥🔥

Pattern:

```js
/hello/i
```

Break it:

```text
hello
→ text to find

i
→ ignore uppercase/lowercase difference
```

Meaning:

```text
Find "hello" in any letter case.
```

Example:

```js
// Step 1:
// i means case-insensitive.
const pattern =
  /hello/i;

// Step 2:
console.log(
  pattern.test(
    "hello"
  )
); // Output: true

// Step 3:
console.log(
  pattern.test(
    "HELLO"
  )
); // Output: true

// Step 4:
console.log(
  pattern.test(
    "HeLLo"
  )
); // Output: true
```

Output:

```text
true
true
true
```

---

# 7. `\d` Means Digit 🔥🔥🔥

Pattern:

```js
/\d/
```

Breakdown:

```text
\
→ introduces a special regex token

d
→ digit
```

Meaning:

```text
Match one digit from 0 to 9.
```

Matches:

```text
0
1
2
3
4
5
6
7
8
9
```

Example:

```js
const pattern =
  /\d/;

// Step 1:
// "A7" contains digit 7.
console.log(
  pattern.test(
    "A7"
  )
); // Output: true

// Step 2:
// No digit.
console.log(
  pattern.test(
    "ABC"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 8. `\d+` Means One or More Digits 🔥🔥🔥

Pattern:

```js
/\d+/
```

Break it:

```text
\d
→ digit

+
→ one or more of the previous thing
```

So:

```text
\d+
```

means:

```text
one or more consecutive digits
```

Examples it can match:

```text
1
12
123
9999
```

Example:

```js
const text =
  "Employee ID 101";

// Step 1:
// \d+ means one or more digits together.
const result =
  text.match(
    /\d+/
  );

// Step 2:
// It finds "101".
console.log(
  result[0]
); // Output: 101
```

Output:

```text
101
```

---

# 9. `match()` Gives the Actual Matching Text 🔥🔥🔥

Pattern:

```js
/\d+/
```

Meaning:

```text
Find one or more consecutive digits.
```

Now:

```js
const text =
  "Order number 500";

// Step 1:
// Find digit sequence.
const result =
  text.match(
    /\d+/
  );

// Step 2:
// result[0] is the matched text.
console.log(
  result[0]
); // Output: 500
```

Output:

```text
500
```

Difference:

```text
test()
→ Do I have a match?
→ true/false

match()
→ What exactly matched?
→ actual text
```

---

# 10. `\D` Means Non-Digit

Pattern:

```js
/\D/
```

Breakdown:

```text
\d
→ digit

\D
→ NOT a digit
```

Meaning:

```text
Find any character that is not 0-9.
```

Example:

```js
const pattern =
  /\D/;

// Step 1:
// A is not a digit.
console.log(
  pattern.test(
    "123A"
  )
); // Output: true

// Step 2:
// Every character is a digit.
console.log(
  pattern.test(
    "1234"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 11. `\w` Means Word Character

Pattern:

```js
/\w/
```

Meaning:

```text
letter
OR
digit
OR
underscore
```

Roughly:

```text
A-Z
a-z
0-9
_
```

Example:

```js
const pattern =
  /\w/;

// Step 1: Letter matches.
console.log(
  pattern.test(
    "A"
  )
); // Output: true

// Step 2: Digit matches.
console.log(
  pattern.test(
    "5"
  )
); // Output: true

// Step 3: Underscore matches.
console.log(
  pattern.test(
    "_"
  )
); // Output: true

// Step 4: @ is not a word character.
console.log(
  pattern.test(
    "@"
  )
); // Output: false
```

Output:

```text
true
true
true
false
```

---

# 12. `\W` Means Non-Word Character

Pattern:

```js
/\W/
```

Meaning:

```text
anything that is NOT:
letter
digit
underscore
```

Example:

```js
const pattern =
  /\W/;

// Step 1: @ is non-word.
console.log(
  pattern.test(
    "abc@123"
  )
); // Output: true

// Step 2:
// letters + underscore + digits only.
console.log(
  pattern.test(
    "abc_123"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 13. `\s` Means Whitespace

Pattern:

```js
/\s/
```

Meaning:

```text
space
tab
newline
other whitespace
```

Example:

```js
const pattern =
  /\s/;

// Step 1:
// Space exists between hello and world.
console.log(
  pattern.test(
    "hello world"
  )
); // Output: true

// Step 2:
// No whitespace.
console.log(
  pattern.test(
    "helloworld"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 14. `\S` Means Non-Whitespace

Pattern:

```js
/\S/
```

Meaning:

```text
Find a character that is NOT whitespace.
```

Example:

```js
const pattern =
  /\S/;

// Step 1:
// A is not whitespace.
console.log(
  pattern.test(
    "   A   "
  )
); // Output: true

// Step 2:
// Spaces only.
console.log(
  pattern.test(
    "     "
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 15. Character Class `[]` 🔥🔥🔥

Pattern:

```js
/[abc]/
```

Break it:

```text
[abc]
→ match ONE character
→ that character can be a OR b OR c
```

Meaning:

```text
Find either:
a
b
or c
```

Example:

```js
const pattern =
  /[abc]/;

// Step 1:
// "blue" contains b.
console.log(
  pattern.test(
    "blue"
  )
); // Output: true

// Step 2:
// No a, b, or c.
console.log(
  pattern.test(
    "xyz"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 16. Character Range `[a-z]`

Pattern:

```js
/[a-z]/
```

Breakdown:

```text
a-z
→ any lowercase English letter
```

Meaning:

```text
Find at least one lowercase letter.
```

Example:

```js
const pattern =
  /[a-z]/;

// Step 1:
// d is lowercase.
console.log(
  pattern.test(
    "ABCd"
  )
); // Output: true

// Step 2:
// No lowercase letters.
console.log(
  pattern.test(
    "ABC"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 17. `[A-Z]` Means Uppercase Letter

Pattern:

```js
/[A-Z]/
```

Meaning:

```text
Find an uppercase English letter.
```

Example:

```js
const pattern =
  /[A-Z]/;

// Step 1:
// R is uppercase.
console.log(
  pattern.test(
    "Rahul"
  )
); // Output: true

// Step 2:
// lowercase only.
console.log(
  pattern.test(
    "rahul"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 18. `[0-9]` Means Digit

Pattern:

```js
/[0-9]/
```

Meaning:

```text
Find any digit from 0 to 9.
```

This is similar to:

```js
/\d/
```

Example:

```js
const pattern =
  /[0-9]/;

console.log(
  pattern.test(
    "EMP5"
  )
); // Output: true
```

Output:

```text
true
```

---

# 19. `[^...]` Means NOT These Characters 🔥🔥🔥

Pattern:

```js
/[^0-9]/
```

Break it carefully:

```text
[ ]
→ character class

^ inside [ ]
→ NOT

0-9
→ digits
```

So:

```text
[^0-9]
```

means:

```text
Match any character that is NOT a digit.
```

Example:

```js
const pattern =
  /[^0-9]/;

// Step 1:
// A is not a digit.
console.log(
  pattern.test(
    "123A"
  )
); // Output: true

// Step 2:
// Digits only.
console.log(
  pattern.test(
    "1234"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 20. `^` Outside `[]` Means Start of String 🔥🔥🔥

Pattern:

```js
/^EMP/
```

Break it:

```text
^
→ start of string

EMP
→ exact text
```

Meaning:

```text
The string must START with EMP.
```

Example:

```js
const pattern =
  /^EMP/;

// Step 1:
// Starts with EMP.
console.log(
  pattern.test(
    "EMP101"
  )
); // Output: true

// Step 2:
// EMP exists,
// but not at the start.
console.log(
  pattern.test(
    "101EMP"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 21. `$` Means End of String 🔥🔥🔥

Pattern:

```js
/done$/
```

Break it:

```text
done
→ exact text

$
→ end of string
```

Meaning:

```text
The string must END with "done".
```

Example:

```js
const pattern =
  /done$/;

// Step 1:
console.log(
  pattern.test(
    "task done"
  )
); // Output: true

// Step 2:
console.log(
  pattern.test(
    "done task"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 22. Why `^` and `$` Are Important for Validation 🔥🔥🔥

Suppose requirement is:

```text
Only digits are allowed.
```

Pattern:

```js
/\d+/
```

means:

```text
Find digits somewhere.
```

So this incorrectly passes:

```text
ABC123XYZ
```

Example:

```js
console.log(
  /\d+/.test(
    "ABC123XYZ"
  )
); // Output: true
```

Output:

```text
true
```

But validation usually needs:

```text
the ENTIRE string must match
```

So we use:

```js
/^\d+$/
```

Break it:

```text
^
→ start

\d+
→ one or more digits

$
→ end
```

Meaning:

```text
From start to end,
only digits are allowed.
```

Example:

```js
const pattern =
  /^\d+$/;

console.log(
  pattern.test(
    "12345"
  )
); // Output: true

console.log(
  pattern.test(
    "ABC123"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 23. `+` Means One or More

Pattern:

```js
/a+/
```

Breakdown:

```text
a
→ character a

+
→ one or more a characters
```

Meaning:

```text
a
aa
aaa
aaaa
...
```

Example:

```js
const pattern =
  /^a+$/;

// Step 1: One a.
console.log(
  pattern.test(
    "a"
  )
); // Output: true

// Step 2: Multiple a.
console.log(
  pattern.test(
    "aaaa"
  )
); // Output: true

// Step 3: No a.
console.log(
  pattern.test(
    ""
  )
); // Output: false
```

Output:

```text
true
true
false
```

---

# 24. `*` Means Zero or More

Pattern:

```js
/ab*/
```

Breakdown:

```text
a
→ one a

b*
→ zero or more b characters
```

So valid examples include:

```text
a
ab
abb
abbb
```

Example:

```js
const pattern =
  /^ab*$/;

console.log(
  pattern.test(
    "a"
  )
); // Output: true

console.log(
  pattern.test(
    "abbb"
  )
); // Output: true
```

Output:

```text
true
true
```

---

# 25. `?` Means Zero or One 🔥🔥

Pattern:

```js
/colou?r/
```

Breakdown:

```text
colo
→ required

u?
→ u is optional

r
→ required
```

So both match:

```text
color
colour
```

Example:

```js
const pattern =
  /colou?r/;

console.log(
  pattern.test(
    "color"
  )
); // Output: true

console.log(
  pattern.test(
    "colour"
  )
); // Output: true
```

Output:

```text
true
true
```

---

# 26. `{n}` Means Exact Count 🔥🔥🔥

Pattern:

```js
/\d{6}/
```

Breakdown:

```text
\d
→ digit

{6}
→ exactly 6 times
```

So:

```text
\d{6}
```

means:

```text
exactly 6 consecutive digits
```

For full validation:

```js
/^\d{6}$/
```

means:

```text
entire string must be exactly 6 digits
```

Example:

```js
const pattern =
  /^\d{6}$/;

console.log(
  pattern.test(
    "768001"
  )
); // Output: true

console.log(
  pattern.test(
    "76800"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 27. `{n,}` Means At Least n Times

Pattern:

```js
/\d{3,}/
```

Breakdown:

```text
\d
→ digit

{3,}
→ at least 3 times
```

Matches:

```text
123
1234
12345
...
```

Example:

```js
const pattern =
  /^\d{3,}$/;

console.log(
  pattern.test(
    "123"
  )
); // Output: true

console.log(
  pattern.test(
    "123456"
  )
); // Output: true

console.log(
  pattern.test(
    "12"
  )
); // Output: false
```

Output:

```text
true
true
false
```

---

# 28. `{n,m}` Means Between n and m Times

Pattern:

```js
/\d{2,4}/
```

Breakdown:

```text
\d
→ digit

{2,4}
→ minimum 2
→ maximum 4
```

Example:

```js
const pattern =
  /^\d{2,4}$/;

console.log(
  pattern.test(
    "12"
  )
); // Output: true

console.log(
  pattern.test(
    "1234"
  )
); // Output: true

console.log(
  pattern.test(
    "12345"
  )
); // Output: false
```

Output:

```text
true
true
false
```

---

# 29. `.` Means Almost Any Single Character 🔥🔥

Pattern:

```js
/c.t/
```

Breakdown:

```text
c
→ exact c

.
→ almost any one character

t
→ exact t
```

So these can match:

```text
cat
cot
cut
c-t
c1t
```

Example:

```js
const pattern =
  /c.t/;

console.log(
  pattern.test(
    "cat"
  )
); // Output: true

console.log(
  pattern.test(
    "c-t"
  )
); // Output: true
```

Output:

```text
true
true
```

---

# 30. `\.` Means Literal Dot 🔥🔥🔥

Important difference:

```text
.
→ any character

\.
→ actual dot character
```

Pattern:

```js
/a\.b/
```

means:

```text
a
then actual .
then b
```

Example:

```js
const pattern =
  /a\.b/;

console.log(
  pattern.test(
    "a.b"
  )
); // Output: true

console.log(
  pattern.test(
    "a-b"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 31. `|` Means OR 🔥🔥🔥

Pattern:

```js
/React|Angular/
```

Breakdown:

```text
React
|
Angular
```

Meaning:

```text
React OR Angular
```

Example:

```js
const pattern =
  /React|Angular/;

console.log(
  pattern.test(
    "React Developer"
  )
); // Output: true

console.log(
  pattern.test(
    "Angular Developer"
  )
); // Output: true

console.log(
  pattern.test(
    "Vue Developer"
  )
); // Output: false
```

Output:

```text
true
true
false
```

---

# 32. `()` Groups a Pattern

Pattern:

```js
/(ha){2}/
```

Breakdown:

```text
(ha)
→ group "ha"

{2}
→ repeat that whole group exactly twice
```

So:

```text
(ha){2}
```

means:

```text
haha
```

Example:

```js
const pattern =
  /^(ha){2}$/;

console.log(
  pattern.test(
    "haha"
  )
); // Output: true

console.log(
  pattern.test(
    "ha"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 33. `g` Flag Means Global 🔥🔥🔥

Pattern:

```js
/cat/g
```

Breakdown:

```text
cat
→ find text cat

g
→ find ALL matches
```

Example:

```js
const text =
  "cat dog cat cat";

// Step 1:
// Find every "cat".
const result =
  text.match(
    /cat/g
  );

// Step 2: Print.
console.log(
  result
); // Output: ["cat", "cat", "cat"]
```

Output:

```text
["cat", "cat", "cat"]
```

Without `g`, normal `match()` returns only first-match information.

---

# 34. Combine `g` and `i`

Pattern:

```js
/cat/gi
```

Breakdown:

```text
cat
→ text to find

g
→ find all

i
→ ignore case
```

Example:

```js
const text =
  "Cat cat CAT";

// Step 1:
// Find all cat values,
// regardless of case.
const result =
  text.match(
    /cat/gi
  );

// Step 2: Print.
console.log(
  result
); // Output: ["Cat", "cat", "CAT"]
```

Output:

```text
["Cat", "cat", "CAT"]
```

---

# 35. `replace()` With Regex

Suppose we want:

```text
remove every digit
```

Pattern:

```js
/\d/g
```

Breakdown:

```text
\d
→ digit

g
→ every digit, not only first
```

Example:

```js
const text =
  "EMP101DEV202";

// Step 1:
// Find every digit
// and replace with empty string.
const result =
  text.replace(
    /\d/g,
    ""
  );

// Step 2: Print.
console.log(
  result
); // Output: EMPDEV
```

Output:

```text
EMPDEV
```

---

# 36. Keep Digits Only 🔥🔥🔥

Input:

```text
+91 98765-43210
```

Goal:

```text
919876543210
```

Pattern:

```js
/\D/g
```

Breakdown:

```text
\D
→ non-digit

g
→ all non-digits
```

Meaning:

```text
Find everything that is NOT a digit.
```

Then replace those characters with `""`.

```js
const phone =
  "+91 98765-43210";

// Step 1:
// Remove every non-digit.
const cleaned =
  phone.replace(
    /\D/g,
    ""
  );

// Step 2: Print.
console.log(
  cleaned
); // Output: 919876543210
```

Output:

```text
919876543210
```

---

# 37. Replace Multiple Spaces With One 🔥🔥🔥

Pattern:

```js
/\s+/g
```

Breakdown:

```text
\s
→ whitespace

+
→ one or more whitespace characters

g
→ all occurrences
```

Meaning:

```text
Find every group of one-or-more spaces/whitespace.
```

Example:

```js
const text =
  "Rahul    Kumar   Mishra";

// Step 1:
// Every group of spaces
// becomes one space.
const cleaned =
  text.replace(
    /\s+/g,
    " "
  );

// Step 2: Print.
console.log(
  cleaned
); // Output: Rahul Kumar Mishra
```

Output:

```text
Rahul Kumar Mishra
```

---

# 38. Remove Non-Alphanumeric Characters

Pattern:

```js
/[^a-z0-9]/gi
```

Breakdown:

```text
[ ]
→ character class

^
→ NOT

a-z
→ letters

0-9
→ digits

g
→ all matches

i
→ ignore case
```

Meaning:

```text
Find every character that is NOT a letter or digit.
```

Example:

```js
const text =
  "employee@101!";

// Step 1:
// Remove everything except
// letters and digits.
const cleaned =
  text.replace(
    /[^a-z0-9]/gi,
    ""
  );

// Step 2: Print.
console.log(
  cleaned
); // Output: employee101
```

Output:

```text
employee101
```

---

# 39. Validate Digits Only 🔥🔥🔥

Requirement:

```text
Entire value must contain digits only.
```

Pattern:

```js
/^\d+$/
```

Break it completely:

```text
^
→ start

\d
→ digit

+
→ one or more digits

$
→ end
```

Full meaning:

```text
From start to end,
there must be one or more digits
and nothing else.
```

Code:

```js
function isDigitsOnly(
  value
) {
  // Step 1:
  // Entire string must be digits.
  const pattern =
    /^\d+$/;

  // Step 2: Test input.
  return pattern.test(
    value
  );
}

console.log(
  isDigitsOnly(
    "12345"
  )
); // Output: true

console.log(
  isDigitsOnly(
    "12A45"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 40. Validate Indian PIN Code 🔥🔥🔥

Requirement:

```text
Exactly 6 digits.
```

Pattern:

```js
/^\d{6}$/
```

Breakdown:

```text
^
→ start

\d
→ digit

{6}
→ exactly six digits

$
→ end
```

Meaning:

```text
Entire string must be exactly six digits.
```

Code:

```js
function isValidPin(
  pin
) {
  // Step 1:
  // Exactly six digits.
  const pattern =
    /^\d{6}$/;

  // Step 2:
  // Return validation result.
  return pattern.test(
    pin
  );
}

console.log(
  isValidPin(
    "768001"
  )
); // Output: true

console.log(
  isValidPin(
    "76801"
  )
); // Output: false

console.log(
  isValidPin(
    "76800A"
  )
); // Output: false
```

Output:

```text
true
false
false
```

---

# 41. Validate 10-Digit Mobile Number 🔥🔥🔥

Requirement:

```text
Exactly 10 digits.
```

Pattern:

```js
/^\d{10}$/
```

Breakdown:

```text
^
→ start

\d
→ digit

{10}
→ exactly 10 digits

$
→ end
```

Code:

```js
function isValidMobile(
  mobile
) {
  // Step 1:
  // Require exactly 10 digits.
  const pattern =
    /^\d{10}$/;

  // Step 2: Validate.
  return pattern.test(
    mobile
  );
}

console.log(
  isValidMobile(
    "9876543210"
  )
); // Output: true

console.log(
  isValidMobile(
    "98765"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 42. Validate Letters Only

Requirement:

```text
Only English letters.
At least one letter.
```

Pattern:

```js
/^[A-Za-z]+$/
```

Breakdown:

```text
^
→ start

[A-Za-z]
→ uppercase OR lowercase letter

+
→ one or more letters

$
→ end
```

Code:

```js
function isLettersOnly(
  value
) {
  const pattern =
    /^[A-Za-z]+$/;

  return pattern.test(
    value
  );
}

console.log(
  isLettersOnly(
    "Rahul"
  )
); // Output: true

console.log(
  isLettersOnly(
    "Rahul101"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 43. Validate Username

Requirement:

```text
letters
digits
underscore
3 to 12 characters
```

Pattern:

```js
/^\w{3,12}$/
```

Breakdown:

```text
^
→ start

\w
→ letter, digit, underscore

{3,12}
→ minimum 3
→ maximum 12

$
→ end
```

Code:

```js
function isValidUsername(
  username
) {
  const pattern =
    /^\w{3,12}$/;

  return pattern.test(
    username
  );
}

console.log(
  isValidUsername(
    "rahul_101"
  )
); // Output: true

console.log(
  isValidUsername(
    "ab"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 44. Basic Email Validation 🔥🔥🔥

Use this practical pattern:

```js
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

It looks difficult, so break it carefully.

First part:

```text
^
→ start
```

Then:

```text
[^\s@]+
```

means:

```text
[ ]
→ character class

^ inside [ ]
→ NOT

\s
→ whitespace

@
→ @ symbol

[^\s@]
→ anything except whitespace or @

+
→ one or more
```

So first part means:

```text
one or more characters before @
but no spaces
and no @
```

Then:

```text
@
→ actual @ symbol
```

Then again:

```text
[^\s@]+
→ domain name part
```

Then:

```text
\.
→ actual dot
```

Then:

```text
[^\s@]+
→ final extension part
```

Finally:

```text
$
→ end
```

Full meaning:

```text
text
@
text
.
text
```

with no spaces around those parts.

Code:

```js
function isValidEmail(
  email
) {
  // Step 1:
  // Basic practical email format.
  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Step 2: Test.
  return pattern.test(
    email
  );
}

console.log(
  isValidEmail(
    "rahul@test.com"
  )
); // Output: true

console.log(
  isValidEmail(
    "rahultest.com"
  )
); // Output: false

console.log(
  isValidEmail(
    "rahul @test.com"
  )
); // Output: false
```

Output:

```text
true
false
false
```

Important:

```text
This is a practical basic email check.

Real email specifications are much more complex.
Frontend usually performs a reasonable format check,
and backend/server performs final validation.
```

---

# 45. Simple Password Validation 🔥🔥🔥

Requirement:

```text
minimum 8 characters
at least one lowercase
at least one uppercase
at least one digit
```

Pattern:

```js
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
```

This looks difficult.

Understand it piece by piece.

```text
^
→ start of string
```

Next:

```text
(?=.*[a-z])
```

For now, read this as:

```text
Make sure at least one lowercase letter exists somewhere.
```

Next:

```text
(?=.*[A-Z])
```

means:

```text
Make sure at least one uppercase letter exists somewhere.
```

Next:

```text
(?=.*\d)
```

means:

```text
Make sure at least one digit exists somewhere.
```

Next:

```text
.{8,}
```

Breakdown:

```text
.
→ any character

{8,}
→ at least 8 characters
```

Finally:

```text
$
→ end
```

Code:

```js
function isValidPassword(
  password
) {
  // Step 1:
  // Require lowercase,
  // uppercase,
  // digit,
  // and minimum length 8.
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Step 2: Test password.
  return pattern.test(
    password
  );
}

console.log(
  isValidPassword(
    "Rahul123"
  )
); // Output: true

console.log(
  isValidPassword(
    "rahul123"
  )
); // Output: false
```

Output:

```text
true
false
```

For now remember:

```text
(?=...)
→ lookahead
→ checks that something exists
without consuming it
```

Deep lookahead internals are not required here.

---

# 46. Extract All Numbers From Text 🔥🔥🔥

Input:

```text
Order 101 has 3 items costing 500
```

Goal:

```text
101
3
500
```

Pattern:

```js
/\d+/g
```

Breakdown:

```text
\d
→ digit

+
→ one or more consecutive digits

g
→ find every match
```

Code:

```js
const text =
  "Order 101 has 3 items costing 500";

// Step 1:
// Find every sequence of digits.
const numbers =
  text.match(
    /\d+/g
  );

// Step 2: Print.
console.log(
  numbers
); // Output: ["101", "3", "500"]
```

Output:

```text
["101", "3", "500"]
```

Important:

```text
These are strings,
not numbers yet.
```

---

# 47. Convert Extracted Number Strings to Numbers

```js
const text =
  "Order 101 has 3 items";

// Step 1:
// Extract digit strings.
const matches =
  text.match(
    /\d+/g
  );

// Step 2:
// Convert each string to number.
const numbers =
  matches.map(
    Number
  );

// Step 3: Print.
console.log(
  numbers
); // Output: [101, 3]
```

Output:

```text
[101, 3]
```

Flow:

```text
text
↓ regex match
["101", "3"]
↓ map(Number)
[101, 3]
```

---

# 48. Dynamic Regex With `new RegExp()`

Suppose search text comes from user input.

```js
const search =
  "javascript";
```

We cannot write:

```js
/javascript/i
```

if the value changes dynamically.

So we use:

```js
new RegExp(
  search,
  "i"
)
```

Breakdown:

```text
search
→ runtime pattern text

"i"
→ ignore case
```

Example:

```js
function containsWord(
  text,
  word
) {
  // Step 1:
  // Create regex from runtime value.
  const pattern =
    new RegExp(
      word,
      "i"
    );

  // Step 2:
  // Check whether text matches.
  return pattern.test(
    text
  );
}

console.log(
  containsWord(
    "Senior JavaScript Developer",
    "javascript"
  )
); // Output: true
```

Output:

```text
true
```

---

# 49. Important Warning With Dynamic Regex

Suppose user searches:

```text
1.0
```

Remember:

```text
.
→ special regex meaning
→ any character
```

So directly doing:

```js
new RegExp(
  "1.0"
)
```

means something closer to:

```text
1
any character
0
```

not necessarily:

```text
literal 1.0
```

Therefore normal user text should usually be escaped first.

---

# 50. Escape User Input Before Dynamic Search 🔥🔥🔥

Utility:

```js
function escapeRegex(
  value
) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}
```

You do NOT need to memorize this regex right now.

Its job is simply:

```text
take regex-special characters
↓
escape them
↓
treat them as normal text
```

Example:

```js
function escapeRegex(
  value
) {
  // Step 1:
  // Escape special regex symbols.
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function containsText(
  text,
  query
) {
  // Step 2:
  // Make user text safe.
  const safeQuery =
    escapeRegex(
      query
    );

  // Step 3:
  // Create case-insensitive regex.
  const pattern =
    new RegExp(
      safeQuery,
      "i"
    );

  // Step 4:
  // Test actual text.
  return pattern.test(
    text
  );
}

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

# 51. Machine Coding — Search Employees 🔥🔥🔥

Requirement:

```text
User enters a search query.
Search employee names.
Ignore uppercase/lowercase.
```

Example data:

```js
const employees = [
  {
    id: 1,
    name: "Rahul Mishra",
  },
  {
    id: 2,
    name: "Amit Kumar",
  },
  {
    id: 3,
    name: "Ravi Rahul",
  },
];
```

Pattern will be dynamic:

```text
query
↓
escape query
↓
new RegExp(query, "i")
```

Code:

```js
function escapeRegex(
  value
) {
  // Step 1:
  // Escape regex-special characters.
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function searchEmployees(
  employees,
  query
) {
  // Step 2:
  // Clean regex-sensitive input.
  const safeQuery =
    escapeRegex(
      query
    );

  // Step 3:
  // i means ignore case.
  const pattern =
    new RegExp(
      safeQuery,
      "i"
    );

  // Step 4:
  // Keep only matching employees.
  return employees.filter(
    ({ name }) =>
      pattern.test(
        name
      )
  );
}

const employees = [
  {
    id: 1,
    name: "Rahul Mishra",
  },
  {
    id: 2,
    name: "Amit Kumar",
  },
  {
    id: 3,
    name: "Ravi Rahul",
  },
];

// Step 5: Search for rahul.
const result =
  searchEmployees(
    employees,
    "rahul"
  );

// Step 6: Print names.
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

Complete flow:

```text
"rahul"
↓
escape special characters
↓
/rahul/i equivalent
↓
test each employee name
↓
matching employees
```

---

# 52. Machine Coding — Normalize User Name 🔥🔥🔥

Input:

```text
"  Rahul@@   Kumar123  "
```

Goal:

```text
"Rahul Kumar"
```

First pattern:

```js
/[^A-Za-z\s]/g
```

Breakdown:

```text
[ ]
→ character class

^ inside [ ]
→ NOT

A-Z
→ uppercase letters

a-z
→ lowercase letters

\s
→ whitespace

g
→ all matches
```

Meaning:

```text
Find everything that is NOT:
letter
or whitespace
```

Second pattern:

```js
/\s+/g
```

Meaning:

```text
Find repeated whitespace.
```

Code:

```js
function normalizeName(
  value
) {
  // Step 1:
  // Remove digits and symbols.
  const lettersAndSpaces =
    value.replace(
      /[^A-Za-z\s]/g,
      ""
    );

  // Step 2:
  // Convert multiple spaces into one.
  const singleSpaces =
    lettersAndSpaces.replace(
      /\s+/g,
      " "
    );

  // Step 3:
  // Remove spaces from beginning/end.
  return singleSpaces.trim();
}

console.log(
  normalizeName(
    "  Rahul@@   Kumar123  "
  )
); // Output: Rahul Kumar
```

Output:

```text
Rahul Kumar
```

---

# 53. Machine Coding — Extract Employee IDs

Input:

```text
EMP-101 EMP-205 EMP-999
```

Pattern:

```js
/EMP-\d+/g
```

Breakdown:

```text
EMP-
→ exact text

\d+
→ one or more digits

g
→ all matches
```

Meaning:

```text
Find every value that looks like:
EMP- followed by digits
```

Code:

```js
const text =
  "EMP-101 EMP-205 EMP-999";

// Step 1:
// Find complete employee codes.
const matches =
  text.match(
    /EMP-\d+/g
  );

// Step 2:
console.log(
  matches
);
// Output:
// ["EMP-101", "EMP-205", "EMP-999"]

// Step 3:
// Remove EMP- and convert to numbers.
const ids =
  matches.map(
    (value) =>
      Number(
        value.replace(
          "EMP-",
          ""
        )
      )
  );

// Step 4:
console.log(
  ids
); // Output: [101, 205, 999]
```

Output:

```text
["EMP-101", "EMP-205", "EMP-999"]
[101, 205, 999]
```

---

# 54. Capturing Groups — Awareness

Pattern:

```js
/^([A-Z]+)-(\d+)$/
```

Breakdown:

```text
^
→ start

([A-Z]+)
→ group 1
→ one or more uppercase letters

-
→ literal hyphen

(\d+)
→ group 2
→ one or more digits

$
→ end
```

For:

```text
EMP-101
```

we get:

```text
whole match
→ EMP-101

group 1
→ EMP

group 2
→ 101
```

Code:

```js
const text =
  "EMP-101";

// Step 1:
const result =
  text.match(
    /^([A-Z]+)-(\d+)$/
  );

// Step 2: Whole match.
console.log(
  result[0]
); // Output: EMP-101

// Step 3: First group.
console.log(
  result[1]
); // Output: EMP

// Step 4: Second group.
console.log(
  result[2]
); // Output: 101
```

Output:

```text
EMP-101
EMP
101
```

---

# 55. Debugging — Missing `g`

Requirement:

```text
remove ALL digits
```

Wrong pattern:

```js
/\d/
```

Meaning:

```text
find one digit
```

So:

```js
const text =
  "a1b2c3";

const result =
  text.replace(
    /\d/,
    ""
  );

console.log(
  result
); // Output: ab2c3
```

Output:

```text
ab2c3
```

Correct pattern:

```js
/\d/g
```

Meaning:

```text
find every digit
```

```js
const text =
  "a1b2c3";

const result =
  text.replace(
    /\d/g,
    ""
  );

console.log(
  result
); // Output: abc
```

Output:

```text
abc
```

---

# 56. Debugging — Missing `^` and `$`

Requirement:

```text
digits only
```

Wrong:

```js
/\d+/
```

Meaning:

```text
find digits somewhere
```

So:

```js
console.log(
  /\d+/.test(
    "ABC123"
  )
); // Output: true
```

Output:

```text
true
```

Correct:

```js
/^\d+$/
```

Meaning:

```text
from start to end:
digits only
```

```js
console.log(
  /^\d+$/.test(
    "ABC123"
  )
); // Output: false
```

Output:

```text
false
```

---

# 57. Debugging — `.` vs `\.`

Pattern:

```js
/a.b/
```

means:

```text
a
any one character
b
```

So:

```js
console.log(
  /a.b/.test(
    "a-b"
  )
); // Output: true
```

Output:

```text
true
```

But:

```js
/a\.b/
```

means:

```text
a
literal dot
b
```

Example:

```js
console.log(
  /a\.b/.test(
    "a.b"
  )
); // Output: true

console.log(
  /a\.b/.test(
    "a-b"
  )
); // Output: false
```

Output:

```text
true
false
```

---

# 58. Quick Pattern Reading Method 🔥🔥🔥

Whenever you see a regex, read it in this order:

```text
1. Look for ^
   → does it start-match?

2. Look for $
   → does it end-match?

3. Look for character tokens:
   \d
   \w
   \s
   [a-z]
   [A-Z]

4. Look for quantity:
   +
   *
   ?
   {n}
   {n,m}

5. Look for flags:
   g
   i
   m

6. Translate the whole thing
   into plain English.
```

Example:

```js
/^\d{10}$/
```

Read:

```text
^
→ start

\d
→ digit

{10}
→ exactly ten

$
→ end
```

Final English:

```text
The entire string must contain exactly 10 digits.
```

Only after that should you use:

```js
pattern.test(
  value
)
```

---

# 59. Practical Decision Guide 🔥🔥🔥

```text
Need exact text?
→ /hello/

Need any digit?
→ /\d/

Need digit sequence?
→ /\d+/

Need digits only?
→ /^\d+$/

Need exactly 6 digits?
→ /^\d{6}$/

Need exactly 10 digits?
→ /^\d{10}$/

Need lowercase letter?
→ /[a-z]/

Need uppercase letter?
→ /[A-Z]/

Need letters only?
→ /^[A-Za-z]+$/

Need whitespace?
→ /\s/

Need repeated whitespace?
→ /\s+/g

Need every match?
→ g

Need ignore case?
→ i

Need start?
→ ^

Need end?
→ $

Need literal dot?
→ \.

Need OR?
→ |

Need optional character?
→ ?

Need exact repetition?
→ {n}

Need actual match?
→ match()

Need yes/no?
→ test()

Need replace?
→ replace()
```

---

# 60. Most Important Regex Rules 🔥🔥🔥

```text
Regex is a pattern.

First understand the pattern.
Then call test(), match(), or replace().

test()
→ boolean

match()
→ matching text/data

replace()
→ replace matching text

\d
→ digit

\D
→ non-digit

\w
→ letter/digit/underscore

\W
→ non-word character

\s
→ whitespace

\S
→ non-whitespace

[a-z]
→ lowercase letter

[A-Z]
→ uppercase letter

[0-9]
→ digit

[^...]
→ NOT those characters

^
→ start

$
→ end

+
→ one or more

*
→ zero or more

?
→ zero or one

{n}
→ exactly n

{n,}
→ at least n

{n,m}
→ between n and m

.
→ almost any one character

\.
→ actual dot

|
→ OR

()
→ group

g
→ all matches

i
→ ignore case
```

---

# Quick Memory 🧠

Pattern:

```js
/^\d{6}$/
```

Read it:

```text
^
→ start

\d
→ digit

{6}
→ exactly 6

$
→ end
```

Meaning:

```text
Exactly 6 digits only.
```

Code:

```js
const pattern =
  /^\d{6}$/;

console.log(
  pattern.test(
    "768001"
  )
); // Output: true
```

Output:

```text
true
```

Pattern:

```js
/\s+/g
```

Read it:

```text
\s
→ whitespace

+
→ one or more

g
→ every occurrence
```

Meaning:

```text
Find every group of repeated whitespace.
```

Code:

```js
const text =
  "Rahul    Kumar";

const result =
  text.replace(
    /\s+/g,
    " "
  );

console.log(
  result
); // Output: Rahul Kumar
```

Output:

```text
Rahul Kumar
```

Pattern:

```js
/^[A-Za-z]+$/
```

Read it:

```text
^
→ start

[A-Za-z]
→ uppercase or lowercase English letter

+
→ one or more

$
→ end
```

Meaning:

```text
Letters only.
```

Code:

```js
console.log(
  /^[A-Za-z]+$/.test(
    "Rahul"
  )
); // Output: true
```

Output:

```text
true
```

Pattern:

```js
/^\d{10}$/
```

Read it:

```text
^
→ start

\d
→ digit

{10}
→ exactly 10

$
→ end
```

Meaning:

```text
Exactly 10 digits.
```

Code:

```js
console.log(
  /^\d{10}$/.test(
    "9876543210"
  )
); // Output: true
```

Output:

```text
true
```

Most important rule to remember:

```text
DO NOT start with test().

First:
read the regex pattern
↓
translate it into English
↓
then use test()/match()/replace()
```

## ✅ 6.18 Regex — Practical Basics complete

**JavaScript Core topics remaining after this: 2**

```text
6.19 Error Handling
6.20 Core Practical 🔥🔥🔥
```

**Next: 6.19 Error Handling 🔥🔥🔥**
