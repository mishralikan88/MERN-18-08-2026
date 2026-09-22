# 9.10 DOM / Browser Practical — Easy Version 🔥🔥🔥

This chapter is about using JavaScript directly in the browser.

You will learn how JavaScript can:

```text
find HTML elements
change text
change styles
create/remove elements
listen to clicks
read form values
handle events
use event delegation
store data in browser
work with URL
use browser history
copy text
read screen/window information
```

This is important for:

```text
frontend interviews
machine-coding rounds
debugging
understanding React internals better
browser-based JavaScript questions
```

Main topics:

```text
DOM meaning
document
querySelector
querySelectorAll
getElementById
textContent
innerHTML
value
attributes
classList
style
createElement
append
prepend
remove
replaceWith
event listeners
event object
target/currentTarget
preventDefault
stopPropagation
event bubbling
event capturing
event delegation
form handling
input/change/click
data-* attributes
closest()
matches()
localStorage
sessionStorage
JSON with storage
URL
URLSearchParams
location
history
navigator
clipboard
window size
scroll
debounce awareness
DOMContentLoaded
MutationObserver awareness
IntersectionObserver awareness
machine-coding examples
interview questions
debugging
```

---

# 1. What Is DOM? 🔥🔥🔥

DOM means:

```text
Document Object Model
```

Easy meaning:

```text
Browser reads HTML
↓
creates JavaScript objects
↓
JavaScript can access/change them
```

Example HTML:

```html
<h1 id="title">
  Hello
</h1>
```

Browser gives JavaScript access to this element.

---

# 2. What Is `document`?

`document` represents the current HTML page.

```js
// Step 1: Read the document title.
console.log(
  document.title
); // Output: depends on current page title
```

Output:

```text
depends on current page
```

---

# 3. Select Element by ID 🔥🔥🔥

HTML:

```html
<h1 id="title">
  Hello
</h1>
```

JavaScript:

```js
// Step 1: Find element with id="title".
const title =
  document.getElementById(
    "title"
  );

// Step 2: Print its text.
console.log(
  title.textContent
); // Output: Hello
```

Output:

```text
Hello
```

---

# 4. `querySelector()` 🔥🔥🔥

`querySelector()` returns the first matching element.

HTML:

```html
<p class="message">
  First
</p>

<p class="message">
  Second
</p>
```

JavaScript:

```js
// Step 1: Find first .message element.
const message =
  document.querySelector(
    ".message"
  );

// Step 2: Print text.
console.log(
  message.textContent
); // Output: First
```

Output:

```text
First
```

---

# 5. `querySelectorAll()`

Returns all matching elements.

```js
// Step 1: Find all .message elements.
const messages =
  document.querySelectorAll(
    ".message"
  );

// Step 2: Print count.
console.log(
  messages.length
); // Output: 2
```

Output:

```text
2
```

---

# 6. `querySelector` Selector Rules

You can use normal CSS selectors.

```text
#title
→ id

.message
→ class

button
→ element

[data-id="10"]
→ attribute

.card button
→ nested element
```

---

# 7. Change Text With `textContent` 🔥🔥🔥

```js
const title =
  document.getElementById(
    "title"
  );

// Step 1: Change visible text.
title.textContent =
  "Welcome Rahul";

// Step 2: Read changed text.
console.log(
  title.textContent
); // Output: Welcome Rahul
```

Output:

```text
Welcome Rahul
```

---

# 8. `textContent` vs `innerHTML` 🔥🔥🔥

`textContent`:

```text
treats value as text
```

`innerHTML`:

```text
parses HTML
```

```js
const box =
  document.querySelector(
    "#box"
  );

// Step 1: HTML gets parsed.
box.innerHTML =
  "<strong>Hello</strong>";

// Output in page:
// Hello appears bold
```

---

# 9. Why Be Careful With `innerHTML`?

If untrusted user input is inserted into `innerHTML`,
it can create security problems such as XSS.

Safer for plain text:

```text
textContent
```

---

# 10. Read Input Value 🔥🔥🔥

```js
const input =
  document.getElementById(
    "nameInput"
  );

// Step 1: Read current value.
console.log(
  input.value
); // Output: depends on current input
```

---

# 11. Change Input Value

```js
const input =
  document.getElementById(
    "nameInput"
  );

// Step 1: Change input value.
input.value =
  "Priya";

// Step 2: Read new value.
console.log(
  input.value
); // Output: Priya
```

Output:

```text
Priya
```

---

# 12. Attributes 🔥🔥🔥

```js
const button =
  document.getElementById(
    "saveBtn"
  );

// Step 1: Add disabled attribute.
button.setAttribute(
  "disabled",
  ""
);

// Step 2: Check it.
console.log(
  button.hasAttribute(
    "disabled"
  )
); // Output: true
```

Output:

```text
true
```

---

# 13. Remove Attribute

```js
// Step 1: Remove disabled attribute.
button.removeAttribute(
  "disabled"
);

// Step 2: Check again.
console.log(
  button.hasAttribute(
    "disabled"
  )
); // Output: false
```

Output:

```text
false
```

---

# 14. `classList` 🔥🔥🔥

Useful methods:

```text
add()
remove()
toggle()
contains()
```

---

# 15. Add CSS Class

```js
const box =
  document.querySelector(
    "#box"
  );

// Step 1: Add active class.
box.classList.add(
  "active"
);

// Step 2: Check class.
console.log(
  box.classList.contains(
    "active"
  )
); // Output: true
```

Output:

```text
true
```

---

# 16. Remove CSS Class

```js
// Step 1: Remove active class.
box.classList.remove(
  "active"
);

// Step 2: Check class.
console.log(
  box.classList.contains(
    "active"
  )
); // Output: false
```

Output:

```text
false
```

---

# 17. Toggle CSS Class 🔥🔥🔥

```js
// Step 1: Toggle active.
// Missing class → added.
box.classList.toggle(
  "active"
);

// Step 2: Check.
console.log(
  box.classList.contains(
    "active"
  )
); // Output: true
```

Output:

```text
true
```

---

# 18. Inline Style

```js
const title =
  document.querySelector(
    "#title"
  );

// Step 1: Change inline font size.
title.style.fontSize =
  "30px";

// Step 2: Read inline value.
console.log(
  title.style.fontSize
); // Output: 30px
```

Output:

```text
30px
```

---

# 19. Prefer Classes for Larger Styling

Instead of many:

```text
element.style...
```

prefer:

```text
classList.add("active")
```

when styles belong in CSS.

---

# 20. Create Element 🔥🔥🔥

```js
// Step 1: Create a new li element.
const item =
  document.createElement(
    "li"
  );

// Step 2: Add text.
item.textContent =
  "Rahul";

// Step 3: Print tag name.
console.log(
  item.tagName
); // Output: LI
```

Output:

```text
LI
```

---

# 21. Append Element

```js
const list =
  document.getElementById(
    "employeeList"
  );

const item =
  document.createElement(
    "li"
  );

item.textContent =
  "Rahul";

// Step 1: Add item at the end.
list.append(
  item
);

// Output in page:
// Rahul
```

---

# 22. `append()` vs `appendChild()`

```text
append()
→ nodes, strings, multiple values

appendChild()
→ one Node
```

---

# 23. `prepend()`

```js
// Step 1: Add item
// at beginning of list.
list.prepend(
  item
);
```

---

# 24. Remove Element 🔥🔥🔥

```js
const item =
  document.querySelector(
    ".employee"
  );

// Step 1: Remove element.
item.remove();
```

---

# 25. Replace Element

```js
const oldElement =
  document.querySelector(
    "#old"
  );

const newElement =
  document.createElement(
    "div"
  );

newElement.textContent =
  "New";

// Step 1: Replace old node.
oldElement.replaceWith(
  newElement
);
```

---

# 26. Event Listener 🔥🔥🔥

```text
user clicks
↓
run JavaScript
```

---

# 27. `addEventListener()`

```js
const button =
  document.getElementById(
    "saveBtn"
  );

// Step 1: Listen for click.
button.addEventListener(
  "click",
  () => {
    // Step 2: Runs when clicked.
    console.log(
      "Saved"
    ); // Output on click: Saved
  }
);
```

Output after click:

```text
Saved
```

---

# 28. Event Object 🔥🔥🔥

```js
button.addEventListener(
  "click",
  (
    event
  ) => {
    // Step 1: Read event type.
    console.log(
      event.type
    ); // Output: click
  }
);
```

Output:

```text
click
```

---

# 29. `event.target` 🔥🔥🔥

`target` is the actual element that triggered the event.

```js
button.addEventListener(
  "click",
  (
    event
  ) => {
    console.log(
      event.target.tagName
    ); // Output: BUTTON
  }
);
```

Output:

```text
BUTTON
```

---

# 30. `event.currentTarget`

`currentTarget` is:

```text
the element whose listener is currently running
```

---

# 31. `target` vs `currentTarget` 🔥🔥🔥

If HTML is:

```html
<button id="saveBtn">
  <span>Save</span>
</button>
```

and user clicks the span:

```text
event.target
→ SPAN

event.currentTarget
→ BUTTON
```

---

# 32. `preventDefault()` 🔥🔥🔥

Stops the browser's normal action.

Example:

```text
form submit
→ may reload page
```

Use:

```js
event.preventDefault();
```

---

# 33. Form Submit Example

```js
const form =
  document.getElementById(
    "employeeForm"
  );

form.addEventListener(
  "submit",
  (
    event
  ) => {
    // Step 1: Stop normal form reload.
    event.preventDefault();

    // Step 2: Read input.
    const input =
      document.getElementById(
        "employeeName"
      );

    // Step 3: Print value.
    console.log(
      input.value
    ); // Output: depends on entered text
  }
);
```

---

# 34. `stopPropagation()` 🔥🔥🔥

Stops an event from moving farther through the propagation chain.

Use carefully.

---

# 35. Event Bubbling 🔥🔥🔥

Default flow usually goes upward:

```text
button
↓
parent
↓
grandparent
```

---

# 36. Bubbling Example

```js
const parent =
  document.getElementById(
    "parent"
  );

const child =
  document.getElementById(
    "child"
  );

parent.addEventListener(
  "click",
  () => {
    console.log(
      "Parent"
    ); // Output second: Parent
  }
);

child.addEventListener(
  "click",
  () => {
    console.log(
      "Child"
    ); // Output first: Child
  }
);
```

Click child.

Output:

```text
Child
Parent
```

---

# 37. Stop Bubbling

```js
child.addEventListener(
  "click",
  (
    event
  ) => {
    // Step 1: Stop bubbling.
    event.stopPropagation();

    // Step 2: Print child.
    console.log(
      "Child"
    ); // Output: Child
  }
);
```

Output:

```text
Child
```

---

# 38. Event Capturing Awareness

Event phases:

```text
capturing
↓
target
↓
bubbling
```

Capturing listener:

```js
element.addEventListener(
  "click",
  handler,
  true
);
```

---

# 39. Event Delegation 🔥🔥🔥

Very important.

Instead of:

```text
100 rows
→ 100 listeners
```

use:

```text
1 parent
→ 1 listener
```

Then inspect:

```text
event.target
```

---

# 40. Event Delegation Mental Model

```text
child clicked
↓
event bubbles to parent
↓
parent listener runs
↓
check which child was clicked
```

---

# 41. Delegation Example 🔥🔥🔥

```js
const list =
  document.getElementById(
    "employeeList"
  );

list.addEventListener(
  "click",
  (
    event
  ) => {
    // Step 1: Find nearest li.
    const item =
      event.target.closest(
        "li"
      );

    // Step 2: No row found?
    if (
      !item
    ) {
      return;
    }

    // Step 3: Read data-id.
    console.log(
      item.dataset.id
    ); // Output: depends on clicked row
  }
);
```

---

# 42. Why `closest()`?

If user clicks a nested span:

```text
event.target
→ SPAN
```

but we need:

```text
LI
```

`closest("li")` walks upward and finds it.

---

# 43. `matches()`

```js
if (
  event.target.matches(
    ".delete-btn"
  )
) {
  // Step 1: Handle delete click.
}
```

---

# 44. Data Attributes 🔥🔥🔥

HTML:

```html
<button
  data-id="101"
  data-action="delete"
>
  Delete
</button>
```

JavaScript:

```js
const button =
  document.querySelector(
    "button"
  );

// Step 1: Read data-id.
console.log(
  button.dataset.id
); // Output: 101

// Step 2: Read data-action.
console.log(
  button.dataset.action
); // Output: delete
```

Output:

```text
101
delete
```

---

# 45. Why `data-*`?

Useful for:

```text
row id
action type
product id
tab key
menu key
```

---

# 46. `input` Event 🔥🔥🔥

```js
const input =
  document.getElementById(
    "search"
  );

input.addEventListener(
  "input",
  (
    event
  ) => {
    // Step 1: Read latest text.
    console.log(
      event.target.value
    ); // Output: current typed value
  }
);
```

---

# 47. `change` Event

Useful for:

```text
select
checkbox
radio
committed input changes
```

For live text search:

```text
input
```

is usually better.

---

# 48. Checkbox State

```js
const checkbox =
  document.getElementById(
    "active"
  );

// Step 1: Read checked state.
console.log(
  checkbox.checked
); // Output: true or false
```

---

# 49. Select Value

```js
const select =
  document.getElementById(
    "department"
  );

// Step 1: Read selected value.
console.log(
  select.value
); // Output: depends on selected option
```

---

# 50. FormData 🔥🔥🔥

```js
const formData =
  new FormData(
    form
  );

// Step 1: Read field called "name".
console.log(
  formData.get(
    "name"
  )
); // Output: depends on form value
```

---

# 51. Convert FormData to Object

```js
const data =
  Object.fromEntries(
    formData.entries()
  );

// Step 1: Print object.
console.log(
  data
); // Output: depends on form fields
```

---

# 52. `DOMContentLoaded` 🔥🔥🔥

If script runs before HTML exists,
selectors may return:

```text
null
```

One solution:

```js
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Step 1: DOM is ready.
    console.log(
      "DOM ready"
    ); // Output: DOM ready
  }
);
```

Output:

```text
DOM ready
```

---

# 53. `defer`

Another common solution:

```html
<script
  defer
  src="app.js"
></script>
```

`defer` lets the browser parse HTML before running the script.

---

# 54. `localStorage` 🔥🔥🔥

Stores string data in the browser.

Usually survives:

```text
refresh
browser restart
```

until removed.

---

# 55. Save to localStorage

```js
// Step 1: Save string.
localStorage.setItem(
  "username",
  "Rahul"
);

// Step 2: Read it.
console.log(
  localStorage.getItem(
    "username"
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 56. Remove Storage Value

```js
// Step 1: Remove key.
localStorage.removeItem(
  "username"
);

// Step 2: Missing key returns null.
console.log(
  localStorage.getItem(
    "username"
  )
); // Output: null
```

Output:

```text
null
```

---

# 57. Objects in localStorage 🔥🔥🔥

Storage stores strings.

Correct pattern:

```js
const employee = {
  id:
    1,
  name:
    "Rahul",
};

// Step 1: Convert object to JSON.
const json =
  JSON.stringify(
    employee
  );

// Step 2: Save JSON string.
localStorage.setItem(
  "employee",
  json
);
```

---

# 58. Read Object From Storage

```js
// Step 1: Read JSON string.
const json =
  localStorage.getItem(
    "employee"
  );

// Step 2: Convert back to object.
const employee =
  JSON.parse(
    json
  );

// Step 3: Read field.
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 59. Safe JSON Storage Reader

```js
function readJSON(
  key,
  fallback = null
) {
  // Step 1: Read value.
  const value =
    localStorage.getItem(
      key
    );

  // Step 2: Missing value?
  if (
    value
    ===
    null
  ) {
    return fallback;
  }

  try {
    // Step 3: Parse JSON.
    return JSON.parse(
      value
    );
  } catch (
    error
  ) {
    // Step 4: Invalid JSON?
    return fallback;
  }
}
```

---

# 60. `sessionStorage`

Same style of API:

```js
sessionStorage.setItem(
  "step",
  "2"
);

console.log(
  sessionStorage.getItem(
    "step"
  )
); // Output: 2
```

Output:

```text
2
```

---

# 61. localStorage vs sessionStorage

```text
localStorage
→ persists longer

sessionStorage
→ current tab/session

Both
→ store strings
```

---

# 62. URL Object 🔥🔥🔥

```js
const url =
  new URL(
    "https://example.com/employees?page=2&department=IT"
  );

// Step 1: Read host.
console.log(
  url.hostname
); // Output: example.com

// Step 2: Read path.
console.log(
  url.pathname
); // Output: /employees
```

Output:

```text
example.com
/employees
```

---

# 63. URL Search Params

```js
const url =
  new URL(
    "https://example.com/employees?page=2"
  );

// Step 1: Read page parameter.
console.log(
  url.searchParams.get(
    "page"
  )
); // Output: 2
```

Output:

```text
2
```

---

# 64. Change Query Parameter

```js
const url =
  new URL(
    "https://example.com/employees?page=2"
  );

// Step 1: Change page.
url.searchParams.set(
  "page",
  "3"
);

// Step 2: Print URL.
console.log(
  url.toString()
); // Output: https://example.com/employees?page=3
```

Output:

```text
https://example.com/employees?page=3
```

---

# 65. `window.location`

Common properties:

```text
href
origin
pathname
search
hash
```

Example:

```js
console.log(
  window.location.pathname
); // Output: depends on page
```

---

# 66. `history.pushState()` Awareness

Change URL without full page reload:

```js
history.pushState(
  {},
  "",
  "?page=2"
);
```

Common in SPA navigation.

---

# 67. `history.replaceState()`

Replaces current history entry.

Useful when you do not want an extra Back-button entry.

---

# 68. `popstate`

```js
window.addEventListener(
  "popstate",
  () => {
    // Step 1: Browser back/forward changed history.
    console.log(
      "History changed"
    ); // Output on navigation: History changed
  }
);
```

---

# 69. `navigator` 🔥🔥🔥

Examples:

```text
navigator.language
navigator.onLine
navigator.clipboard
```

---

# 70. Online Status

```js
console.log(
  navigator.onLine
); // Output: true or false
```

Important:

```text
This is only a connectivity hint.
It does not guarantee your API is reachable.
```

---

# 71. Online / Offline Events

```js
window.addEventListener(
  "online",
  () => {
    console.log(
      "Online"
    ); // Output when online: Online
  }
);

window.addEventListener(
  "offline",
  () => {
    console.log(
      "Offline"
    ); // Output when offline: Offline
  }
);
```

---

# 72. Clipboard API 🔥🔥🔥

```js
async function copyText(
  text
) {
  // Step 1: Write text to clipboard.
  await navigator.clipboard.writeText(
    text
  );

  // Step 2: Return success.
  return true;
}
```

Usage:

```js
copyText(
  "Rahul"
).then(
  (
    result
  ) => {
    console.log(
      result
    ); // Output: true
  }
);
```

Output:

```text
true
```

Clipboard availability depends on browser/security permissions.

---

# 73. Window Size

```js
console.log(
  window.innerWidth
); // Output: depends on browser

console.log(
  window.innerHeight
); // Output: depends on browser
```

---

# 74. Resize Event

```js
window.addEventListener(
  "resize",
  () => {
    // Step 1: Read latest width.
    console.log(
      window.innerWidth
    ); // Output: current width
  }
);
```

Resize can fire many times.

---

# 75. Scroll Position

```js
console.log(
  window.scrollY
); // Output: current vertical scroll
```

---

# 76. Scroll Event

```js
window.addEventListener(
  "scroll",
  () => {
    console.log(
      window.scrollY
    ); // Output: changing scroll value
  }
);
```

---

# 77. Why Throttle Scroll/Resize?

Because these events may fire very frequently.

```text
many events
↓
heavy handler each time
↓
poor performance
```

Throttle limits execution frequency.

---

# 78. Search + Debounce Awareness

Without debounce:

```text
r
ra
rah
rahu
rahul
↓
5 API calls
```

With debounce:

```text
wait until typing stops
↓
1 API call
```

---

# 79. Simple DOM Search 🔥🔥🔥

```js
const search =
  document.getElementById(
    "search"
  );

const items =
  document.querySelectorAll(
    "#list li"
  );

search.addEventListener(
  "input",
  (
    event
  ) => {
    // Step 1: Normalize query.
    const query =
      event.target.value
        .trim()
        .toLowerCase();

    // Step 2: Check every row.
    items.forEach(
      (
        item
      ) => {
        // Step 3: Normalize row text.
        const text =
          item.textContent
            .toLowerCase();

        // Step 4: Hide non-matching rows.
        item.hidden =
          !text.includes(
            query
          );
      }
    );
  }
);
```

---

# 80. `hidden` Property

```js
element.hidden =
  true;
```

means:

```text
hide
```

and:

```js
element.hidden =
  false;
```

means:

```text
show
```

---

# 81. Machine-Coding: Counter 🔥🔥🔥

```js
let count =
  0;

const countElement =
  document.getElementById(
    "count"
  );

const incrementButton =
  document.getElementById(
    "increment"
  );

const decrementButton =
  document.getElementById(
    "decrement"
  );

incrementButton.addEventListener(
  "click",
  () => {
    // Step 1: Increase state.
    count++;

    // Step 2: Update UI.
    countElement.textContent =
      String(
        count
      );
  }
);

decrementButton.addEventListener(
  "click",
  () => {
    // Step 3: Decrease state.
    count--;

    // Step 4: Update UI.
    countElement.textContent =
      String(
        count
      );
  }
);
```

---

# 82. Counter Mental Model

```text
state
↓
count

event
↓
click

update
↓
count++

render
↓
textContent
```

---

# 83. Machine-Coding: Add Employee Row 🔥🔥🔥

```js
const nameInput =
  document.getElementById(
    "nameInput"
  );

const addButton =
  document.getElementById(
    "addBtn"
  );

const list =
  document.getElementById(
    "employeeList"
  );

addButton.addEventListener(
  "click",
  () => {
    // Step 1: Read and clean input.
    const name =
      nameInput.value.trim();

    // Step 2: Empty?
    if (
      name
      ===
      ""
    ) {
      return;
    }

    // Step 3: Create row.
    const item =
      document.createElement(
        "li"
      );

    // Step 4: Add name.
    item.textContent =
      name;

    // Step 5: Add row.
    list.append(
      item
    );

    // Step 6: Clear input.
    nameInput.value =
      "";
  }
);
```

---

# 84. Machine-Coding: Delete Row With Delegation 🔥🔥🔥

```js
const list =
  document.getElementById(
    "employeeList"
  );

list.addEventListener(
  "click",
  (
    event
  ) => {
    // Step 1: Find delete button.
    const deleteButton =
      event.target.closest(
        ".delete-btn"
      );

    // Step 2: Not delete click?
    if (
      !deleteButton
    ) {
      return;
    }

    // Step 3: Find row.
    const row =
      deleteButton.closest(
        "li"
      );

    // Step 4: Remove row.
    row.remove();
  }
);
```

---

# 85. Why Delegation Works for New Rows

Because listener is on:

```text
parent
```

not each individual row.

So rows added later still bubble clicks to the same parent.

---

# 86. Machine-Coding: Tabs 🔥🔥🔥

```js
const tabs =
  document.getElementById(
    "tabs"
  );

tabs.addEventListener(
  "click",
  (
    event
  ) => {
    // Step 1: Find clicked tab.
    const button =
      event.target.closest(
        "[data-tab]"
      );

    // Step 2: Not a tab?
    if (
      !button
    ) {
      return;
    }

    // Step 3: Read selected tab.
    const tab =
      button.dataset.tab;

    // Step 4: Print tab.
    console.log(
      tab
    ); // Output: depends on clicked tab
  }
);
```

---

# 87. Machine-Coding: Modal

```js
openButton.addEventListener(
  "click",
  () => {
    // Step 1: Show modal.
    modal.classList.remove(
      "hidden"
    );
  }
);

closeButton.addEventListener(
  "click",
  () => {
    // Step 2: Hide modal.
    modal.classList.add(
      "hidden"
    );
  }
);
```

---

# 88. `MutationObserver` Awareness 🔥🔥🔥

Watches DOM changes.

Useful for:

```text
child added
attribute changed
text changed
```

Basic:

```js
const observer =
  new MutationObserver(
    (
      mutations
    ) => {
      // Step 1: Runs after observed changes.
      console.log(
        mutations.length
      ); // Output: depends on DOM changes
    }
  );
```

---

# 89. Start/Stop MutationObserver

```js
observer.observe(
  document.body,
  {
    childList:
      true,
    subtree:
      true,
  }
);

// Step 1: Stop observing.
observer.disconnect();
```

---

# 90. `IntersectionObserver` Awareness 🔥🔥🔥

Useful for:

```text
lazy loading
infinite scroll
visibility tracking
```

---

# 91. IntersectionObserver Example

```js
const observer =
  new IntersectionObserver(
    (
      entries
    ) => {
      // Step 1: Check observed items.
      entries.forEach(
        (
          entry
        ) => {
          // Step 2: Is item visible?
          console.log(
            entry.isIntersecting
          ); // Output: true or false
        }
      );
    }
  );

// Step 3: Start observing.
observer.observe(
  targetElement
);
```

---

# 92. DOM Null Error 🔥🔥🔥

Common:

```text
Cannot read properties of null
```

Cause:

```js
const button =
  document.querySelector(
    "#missing"
  );

// button = null
```

---

# 93. Fix DOM Null Error

```js
if (
  button
) {
  // Step 1: Only use it
  // when element exists.
  button.addEventListener(
    "click",
    handler
  );
}
```

Also check:

```text
wrong selector
script timing
missing HTML
```

---

# 94. Common Mistake — `innerHTML` With User Input

Bad:

```js
box.innerHTML =
  userInput;
```

Safer for plain text:

```js
box.textContent =
  userInput;
```

---

# 95. Common Mistake — Too Many Listeners

```text
1000 rows
→ 1000 click listeners
```

When suitable:

```text
1 parent
→ event delegation
```

---

# 96. Common Mistake — Forgetting `preventDefault()`

If JavaScript handles a form submit,
the page may reload unless default behavior is prevented.

---

# 97. Common Mistake — Forgetting Cleanup

Clean up:

```text
event listeners
timers
observers
subscriptions
```

when they are no longer needed.

---

# 98. Remove Event Listener 🔥🔥🔥

```js
function handleResize() {
  console.log(
    window.innerWidth
  );
}

// Step 1: Add listener.
window.addEventListener(
  "resize",
  handleResize
);

// Step 2: Remove same function.
window.removeEventListener(
  "resize",
  handleResize
);
```

---

# 99. Anonymous Removal Trap

Wrong:

```js
window.addEventListener(
  "resize",
  () => {}
);

window.removeEventListener(
  "resize",
  () => {}
);
```

These are different function objects.

---

# 100. `DOMContentLoaded` vs `load`

```text
DOMContentLoaded
→ HTML parsed

load
→ page resources also loaded
```

For normal DOM setup,
`DOMContentLoaded` is usually enough.

---

# 101. Interview Question — What Is DOM? 🔥🔥🔥

```text
DOM is the browser's object representation
of the HTML document.

JavaScript uses it
to read and change page elements.
```

---

# 102. querySelector vs querySelectorAll

```text
querySelector
→ first matching element

querySelectorAll
→ all matching elements
```

---

# 103. textContent vs innerHTML

```text
textContent
→ plain text

innerHTML
→ parses HTML
```

---

# 104. target vs currentTarget

```text
target
→ actual triggering element

currentTarget
→ element whose listener is running
```

---

# 105. Event Bubbling

```text
An event starts at its target
and normally bubbles upward
through parent elements.
```

---

# 106. Event Delegation 🔥🔥🔥

```text
Attach one listener to a parent.

Because events bubble,
the parent can inspect event.target
and handle child interactions.
```

---

# 107. Why `closest()`?

```text
event.target may be a nested icon/span.

closest()
finds the intended parent,
such as button or row.
```

---

# 108. localStorage vs sessionStorage

```text
localStorage
→ persists longer

sessionStorage
→ current tab/session

Both
→ store strings
```

---

# 109. Why JSON.stringify for Storage?

```text
Storage stores strings.

JSON.stringify
→ object to string

JSON.parse
→ string back to object
```

---

# 110. preventDefault vs stopPropagation

```text
preventDefault
→ stops browser default action

stopPropagation
→ stops event propagation
```

---

# 111. Why Throttle Scroll/Resize?

```text
These events can fire very frequently.

Throttle limits
how often expensive work runs.
```

---

# 112. MutationObserver

```text
Watches DOM changes.
```

---

# 113. IntersectionObserver

```text
Watches element visibility/intersection.
```

Useful for:

```text
lazy loading
infinite scroll
```

---

# 114. Final Browser Decision Guide 🔥🔥🔥

```text
Find by ID?
→ getElementById

CSS selector?
→ querySelector

All matches?
→ querySelectorAll

Change text?
→ textContent

Read input?
→ value

Change classes?
→ classList

Create node?
→ createElement

Add node?
→ append / prepend

Remove node?
→ remove

Listen?
→ addEventListener

Stop form reload?
→ preventDefault

Handle many child clicks?
→ event delegation

Find parent match?
→ closest

Read data-*?
→ dataset

Persistent browser storage?
→ localStorage

Tab/session storage?
→ sessionStorage

URL work?
→ URL / URLSearchParams

SPA history?
→ pushState / replaceState

Copy text?
→ navigator.clipboard

Watch DOM changes?
→ MutationObserver

Watch visibility?
→ IntersectionObserver
```

---

# 115. Quick Memory 🧠🔥🔥🔥

```text
DOM
→ browser object model of HTML

document
→ current page

querySelector
→ first match

querySelectorAll
→ all matches

textContent
→ text

value
→ input value

classList
→ CSS classes

createElement
→ create node

append
→ add node

remove
→ remove node

addEventListener
→ listen

target
→ actual trigger

currentTarget
→ listener owner

preventDefault
→ stop default action

stopPropagation
→ stop propagation

bubbling
→ event moves upward

delegation
→ parent handles children

dataset
→ data-* values

localStorage
→ persistent strings

sessionStorage
→ session strings

URLSearchParams
→ URL query params

history
→ navigation state

MutationObserver
→ DOM changes

IntersectionObserver
→ visibility
```

---

# 116. Best Interview Answer 🔥🔥🔥

```text
The DOM is the browser's JavaScript representation
of the HTML document.

I use querySelector or getElementById
to find elements,
textContent, value, and classList
to update UI,
and createElement, append, and remove
to manage nodes.

For events,
I use addEventListener
and understand target,
currentTarget,
bubbling,
preventDefault,
stopPropagation,
and event delegation.

For dynamic lists,
event delegation is useful
because one parent listener
can handle existing and future children.

For browser storage,
I use localStorage or sessionStorage
and serialize objects using JSON.

For URL state,
I use URL,
URLSearchParams,
and the history APIs.

For high-frequency events
like scroll and resize,
I consider throttle or debounce.

I also clean up listeners,
timers,
and observers
when they are no longer required.
```

---

# ✅ 9.10 DOM / Browser Practical Complete

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
9.10 DOM / Browser Practical ✅

9.11 Advanced Awareness ← NEXT
9.12 Final Interview Practical
```

Next:

```text
9.11 Advanced Awareness 🔥🔥🔥
```
