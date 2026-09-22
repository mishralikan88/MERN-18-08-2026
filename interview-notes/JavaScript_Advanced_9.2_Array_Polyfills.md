# 9.2 Array Polyfills 🔥🔥🔥

A **polyfill** means:

```text
recreate the behavior
of a built-in JavaScript method
using your own code
```

For this chapter we will build:

```text
myForEach()
myMap()
myFilter()
myReduce()
myFind()
mySome()
myEvery()
```

These are very important in interviews because the interviewer is checking whether you actually understand:

```text
how array methods work internally
callbacks
return values
accumulators
truthy/falsy
early return
closures
iteration
sparse arrays awareness
edge cases
```

---

# 1. First Understand What a Polyfill Is 🔥🔥🔥

Suppose JavaScript already gives us:

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1: Native map() transforms each value.
const result =
  numbers.map(
    (
      value
    ) => {
      // Step 2: Return double of each value.
      return (
        value * 2
      );
    }
  );

// Step 3: Print the transformed array.
console.log(
  result
); // Output: [2, 4, 6]
```

Output:

```text
[2, 4, 6]
```

A polyfill means we build our own:

```text
myMap()
```

that behaves similarly.

---

# 2. Why Interviewers Ask Polyfills 🔥🔥🔥

Because simply knowing:

```js
array.map(...)
```

does not prove that you understand how `map()` works.

When you build `myMap()`, you must understand:

```text
How iteration happens
What callback receives
What callback returns
How result array is created
Why original array is not modified
What happens on each index
```

That is why polyfills are common in senior JavaScript interviews.

---

# 3. Important Callback Pattern 🔥🔥🔥

Most array callbacks receive:

```text
value
index
original array
```

Example:

```js
const employees = [
  "Rahul",
  "Priya",
];

// Step 1: forEach passes value, index, and original array.
employees.forEach(
  (
    value,
    index,
    array
  ) => {
    // Step 2: Print callback arguments.
    console.log(
      value,
      index,
      array.length
    );
  }
);
```

Output:

```text
Rahul 0 2
Priya 1 2
```

Our polyfills should understand this callback shape.

---

# 4. Important Warning Before Polyfills

In real production projects, you normally should **not casually modify `Array.prototype`** because:

```text
name collisions
unexpected behavior
library conflicts
maintenance problems
```

But interviewers often ask:

```text
Implement Array.prototype.myMap
```

So we will do that here for learning.

---

# 5. `myForEach()` 🔥🔥🔥

Native `forEach()` means:

```text
visit each array item
↓
run callback
↓
do not build a new result array
↓
return undefined
```

---

# 6. Native forEach Example

```js
const numbers = [
  10,
  20,
  30,
];

// Step 1: forEach visits each value.
const result =
  numbers.forEach(
    (
      value
    ) => {
      // Step 2: Print the current value.
      console.log(
        value
      );
    }
  );

// Step 3: Native forEach returns undefined.
console.log(
  result
); // Output: undefined
```

Output:

```text
10
20
30
undefined
```

---

# 7. Build `myForEach()` Step by Step 🔥🔥🔥

```js
Array.prototype.myForEach =
  function (
    callback
  ) {
    // Step 1: `this` is the array
    // on which myForEach() was called.
    const array =
      this;

    // Step 2: Loop from index 0
    // until the end of the array.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 3: Skip missing indexes
      // so behavior is closer to native forEach
      // for sparse arrays.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 4: Call the callback
      // with value, index, and original array.
      callback(
        array[index],
        index,
        array
      );
    }

    // Step 5: Do not return anything.
    // JavaScript automatically returns undefined.
  };
```

---

# 8. Test `myForEach()` 🔥🔥🔥

```js
const numbers = [
  10,
  20,
  30,
];

// Step 1: Call our custom myForEach.
const result =
  numbers.myForEach(
    (
      value,
      index
    ) => {
      // Step 2: Print value and index.
      console.log(
        index,
        value
      );
    }
  );

// Step 3: myForEach returns undefined.
console.log(
  result
); // Output: undefined
```

Output:

```text
0 10
1 20
2 30
undefined
```

---

# 9. `myForEach()` Internal Flow

For:

```text
[10, 20, 30]
```

flow is:

```text
index 0
↓
callback(10, 0, array)

index 1
↓
callback(20, 1, array)

index 2
↓
callback(30, 2, array)

loop ends
↓
undefined
```

---

# 10. Why `forEach()` Does Not Need a Result Array

Because its purpose is:

```text
perform side effect
```

Examples:

```text
console.log
update external counter
send analytics
perform DOM operation
```

It is not designed to transform the array.

---

# 11. `myMap()` 🔥🔥🔥

Native `map()` means:

```text
visit each item
↓
run callback
↓
take callback return value
↓
put it into a NEW array
```

---

# 12. Native Map Example

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1: map runs callback for each value.
const result =
  numbers.map(
    (
      value
    ) => {
      // Step 2: Return transformed value.
      return (
        value * 2
      );
    }
  );

// Step 3: map returns a new array.
console.log(
  result
); // Output: [2, 4, 6]
```

Output:

```text
[2, 4, 6]
```

---

# 13. The Most Important Map Rule 🔥🔥🔥

`map()` does not automatically know what transformation you want.

It simply does:

```text
callback(value)
↓
whatever callback RETURNS
↓
put that into result array
```

So:

```js
value => value * 2
```

returns:

```text
2
4
6
```

Therefore result becomes:

```text
[2, 4, 6]
```

---

# 14. Build `myMap()` Step by Step 🔥🔥🔥

```js
Array.prototype.myMap =
  function (
    callback
  ) {
    // Step 1: `this` is the original array.
    const array =
      this;

    // Step 2: Create a new array
    // that will hold transformed values.
    const result =
      new Array(
        array.length
      );

    // Step 3: Visit every index.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 4: Native map skips missing
      // indexes in sparse arrays.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 5: Call callback with:
      // current value,
      // current index,
      // original array.
      const transformedValue =
        callback(
          array[index],
          index,
          array
        );

      // Step 6: Store callback's RETURN value
      // at the same index in the new result array.
      result[index] =
        transformedValue;
    }

    // Step 7: Return the new transformed array.
    return result;
  };
```

---

# 15. Test `myMap()` 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1: Call custom myMap.
const doubled =
  numbers.myMap(
    (
      value
    ) => {
      // Step 2: Return double of current value.
      return (
        value * 2
      );
    }
  );

// Step 3: Print the new transformed array.
console.log(
  doubled
); // Output: [2, 4, 6]

// Step 4: Original array remains unchanged.
console.log(
  numbers
); // Output: [1, 2, 3]
```

Output:

```text
[2, 4, 6]
[1, 2, 3]
```

---

# 16. `myMap()` Full Trace 🔥🔥🔥

Original:

```text
[1, 2, 3]
```

Iteration 1:

```text
value = 1
↓
callback returns 2
↓
result[0] = 2
```

Iteration 2:

```text
value = 2
↓
callback returns 4
↓
result[1] = 4
```

Iteration 3:

```text
value = 3
↓
callback returns 6
↓
result[2] = 6
```

Final:

```text
[2, 4, 6]
```

---

# 17. What Happens If Map Callback Does Not Return? 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1: Callback uses braces,
// but does not return anything.
const result =
  numbers.myMap(
    (
      value
    ) => {
      // Step 2: Calculate something
      // but forget to return it.
      value * 2;
    }
  );

// Step 3: Every callback call returned undefined.
console.log(
  result
); // Output: [undefined, undefined, undefined]
```

Output:

```text
[undefined, undefined, undefined]
```

This is a common interview/debugging question.

---

# 18. Real App Map Example — Employee Names

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: "Priya",
  },
];

// Step 1: Use myMap to transform objects
// into just their names.
const names =
  employees.myMap(
    (
      employee
    ) => {
      // Step 2: Return only employee.name.
      return employee.name;
    }
  );

// Step 3: Print new array of names.
console.log(
  names
); // Output: ["Rahul", "Priya"]
```

Output:

```text
["Rahul", "Priya"]
```

---

# 19. `myFilter()` 🔥🔥🔥

Native `filter()` means:

```text
visit each value
↓
callback returns truthy/falsy
↓
truthy?
→ keep value

falsy?
→ remove value
```

---

# 20. Native Filter Example

```js
const numbers = [
  1,
  2,
  3,
  4,
];

// Step 1: Keep only even numbers.
const result =
  numbers.filter(
    (
      value
    ) => {
      // Step 2: true for even values,
      // false for odd values.
      return (
        value % 2
        ===
        0
      );
    }
  );

// Step 3: Print filtered array.
console.log(
  result
); // Output: [2, 4]
```

Output:

```text
[2, 4]
```

---

# 21. Build `myFilter()` Step by Step 🔥🔥🔥

```js
Array.prototype.myFilter =
  function (
    callback
  ) {
    // Step 1: `this` is the original array.
    const array =
      this;

    // Step 2: Create a new array
    // for values that pass the condition.
    const result =
      [];

    // Step 3: Visit every array index.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 4: Skip missing sparse-array indexes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 5: Ask callback whether
      // current value should be kept.
      const shouldKeep =
        callback(
          array[index],
          index,
          array
        );

      // Step 6: If callback returns truthy,
      // push the ORIGINAL value into result.
      if (
        shouldKeep
      ) {
        result.push(
          array[index]
        );
      }
    }

    // Step 7: Return the filtered array.
    return result;
  };
```

---

# 22. Test `myFilter()` 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  3,
  4,
];

// Step 1: Keep values greater than 2.
const result =
  numbers.myFilter(
    (
      value
    ) => {
      // Step 2: Return true for 3 and 4.
      return (
        value > 2
      );
    }
  );

// Step 3: Print kept values.
console.log(
  result
); // Output: [3, 4]
```

Output:

```text
[3, 4]
```

---

# 23. `myFilter()` Full Trace

For:

```text
[1, 2, 3, 4]
```

condition:

```text
value > 2
```

Flow:

```text
1 → false → skip
2 → false → skip
3 → true  → push 3
4 → true  → push 4
```

Result:

```text
[3, 4]
```

---

# 24. Important Filter Rule 🔥🔥🔥

Filter callback determines:

```text
KEEP or REMOVE
```

But the result contains:

```text
original values
```

not the callback return value.

Example:

```js
const values = [
  10,
  20,
];

// Step 1: Return string "yes",
// which is truthy.
const result =
  values.myFilter(
    (
      value
    ) => {
      return "yes";
    }
  );

// Step 2: Original values are kept.
console.log(
  result
); // Output: [10, 20]
```

Output:

```text
[10, 20]
```

Not:

```text
["yes", "yes"]
```

That distinction between `map()` and `filter()` is very important.

---

# 25. Map vs Filter 🔥🔥🔥

```text
map
→ callback return value becomes result item

filter
→ callback return value only decides keep/remove
→ original item goes into result
```

---

# 26. Real App Filter Example — Active Employees

```js
const employees = [
  {
    name: "Rahul",
    active: true,
  },
  {
    name: "Priya",
    active: false,
  },
  {
    name: "Amit",
    active: true,
  },
];

// Step 1: Filter only active employees.
const activeEmployees =
  employees.myFilter(
    (
      employee
    ) => {
      // Step 2: Return employee.active.
      // true means keep the employee.
      return employee.active;
    }
  );

// Step 3: Convert kept objects to names
// only for easy output display.
console.log(
  activeEmployees.map(
    (
      employee
    ) => {
      return employee.name;
    }
  )
); // Output: ["Rahul", "Amit"]
```

Output:

```text
["Rahul", "Amit"]
```

---

# 27. `myReduce()` 🔥🔥🔥

`reduce()` is the most important array polyfill.

Reduce means:

```text
take many array values
↓
combine them step by step
↓
produce one final accumulated result
```

That result can be:

```text
number
object
array
string
Map
anything
```

---

# 28. Native Reduce Example — Sum

```js
const numbers = [
  10,
  20,
  30,
];

// Step 1: Start accumulator at 0.
const total =
  numbers.reduce(
    (
      accumulator,
      value
    ) => {
      // Step 2: Return the new accumulator.
      return (
        accumulator
        +
        value
      );
    },
    0
  );

// Step 3: Print final accumulated value.
console.log(
  total
); // Output: 60
```

Output:

```text
60
```

---

# 29. Reduce Mental Model 🔥🔥🔥

Array:

```text
[10, 20, 30]
```

Initial accumulator:

```text
0
```

Flow:

```text
acc = 0
value = 10
↓
return 10

acc = 10
value = 20
↓
return 30

acc = 30
value = 30
↓
return 60
```

Final:

```text
60
```

---

# 30. Build `myReduce()` With Initial Value 🔥🔥🔥

```js
Array.prototype.myReduce =
  function (
    callback,
    initialValue
  ) {
    // Step 1: `this` is the source array.
    const array =
      this;

    // Step 2: Detect whether caller
    // actually supplied an initial value.
    const hasInitialValue =
      arguments.length
      >=
      2;

    // Step 3: Create accumulator and start index.
    let accumulator;
    let startIndex;

    // Step 4: If an initial value was supplied,
    // use it as accumulator and start from index 0.
    if (
      hasInitialValue
    ) {
      accumulator =
        initialValue;

      startIndex =
        0;
    } else {
      // Step 5: No initial value was supplied.
      // Find the first existing array element
      // and use it as the initial accumulator.
      let found =
        false;

      for (
        let index = 0;
        index < array.length;
        index++
      ) {
        if (
          index in array
        ) {
          accumulator =
            array[index];

          startIndex =
            index + 1;

          found =
            true;

          break;
        }
      }

      // Step 6: Native reduce throws
      // on an empty array without initial value.
      if (
        !found
      ) {
        throw new TypeError(
          "Reduce of empty array with no initial value"
        );
      }
    }

    // Step 7: Continue reducing from startIndex.
    for (
      let index =
        startIndex;
      index < array.length;
      index++
    ) {
      // Step 8: Skip missing sparse-array indexes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 9: Callback returns the NEXT accumulator.
      accumulator =
        callback(
          accumulator,
          array[index],
          index,
          array
        );
    }

    // Step 10: Return the final accumulated result.
    return accumulator;
  };
```

---

# 31. Test `myReduce()` With Initial Value 🔥🔥🔥

```js
const numbers = [
  10,
  20,
  30,
];

// Step 1: Start accumulator at 0.
const total =
  numbers.myReduce(
    (
      accumulator,
      value
    ) => {
      // Step 2: Add current value
      // and return the next accumulator.
      return (
        accumulator
        +
        value
      );
    },
    0
  );

// Step 3: Print final total.
console.log(
  total
); // Output: 60
```

Output:

```text
60
```

---

# 32. Test `myReduce()` Without Initial Value 🔥🔥🔥

```js
const numbers = [
  10,
  20,
  30,
];

// Step 1: No initial value is supplied.
// Therefore 10 becomes the first accumulator.
const total =
  numbers.myReduce(
    (
      accumulator,
      value
    ) => {
      // Step 2: Combine accumulator and current value.
      return (
        accumulator
        +
        value
      );
    }
  );

// Step 3: Print result.
console.log(
  total
); // Output: 60
```

Output:

```text
60
```

Flow:

```text
No initial value

accumulator = first value = 10

next value = 20
↓
30

next value = 30
↓
60
```

---

# 33. The Biggest Reduce Mistake 🔥🔥🔥

Forgetting to return the next accumulator.

Wrong:

```js
const numbers = [
  1,
  2,
  3,
];

// Step 1: Start with 0.
const result =
  numbers.myReduce(
    (
      accumulator,
      value
    ) => {
      // Step 2: Calculation happens,
      // but nothing is returned.
      accumulator
      +
      value;
    },
    0
  );

// Step 3: After first callback,
// accumulator becomes undefined.
console.log(
  result
); // Output: NaN
```

Output:

```text
NaN
```

Why?

```text
first callback
0 + 1 calculated
but not returned
↓
undefined becomes next accumulator

undefined + 2
↓
NaN
```

---

# 34. Real Reduce Example — Total Salary 🔥🔥🔥

```js
const employees = [
  {
    name: "Rahul",
    salary: 50000,
  },
  {
    name: "Priya",
    salary: 60000,
  },
];

// Step 1: Start total salary at 0.
const totalSalary =
  employees.myReduce(
    (
      total,
      employee
    ) => {
      // Step 2: Add current employee salary
      // to accumulated total.
      return (
        total
        +
        employee.salary
      );
    },
    0
  );

// Step 3: Print final total.
console.log(
  totalSalary
); // Output: 110000
```

Output:

```text
110000
```

---

# 35. Real Reduce Example — Frequency Count 🔥🔥🔥

```js
const departments = [
  "IT",
  "HR",
  "IT",
  "Finance",
  "IT",
];

// Step 1: Start accumulator as empty object.
const frequency =
  departments.myReduce(
    (
      result,
      department
    ) => {
      // Step 2: Read old count.
      // If missing, use 0.
      const currentCount =
        result[department]
        ??
        0;

      // Step 3: Store incremented count.
      result[department] =
        currentCount
        +
        1;

      // Step 4: Return the SAME accumulator object
      // for the next iteration.
      return result;
    },
    {}
  );

// Step 5: Print final frequency object.
console.log(
  frequency
); // Output: { IT: 3, HR: 1, Finance: 1 }
```

Output:

```text
{
  IT: 3,
  HR: 1,
  Finance: 1
}
```

---

# 36. `myFind()` 🔥🔥🔥

Native `find()` means:

```text
check values one by one
↓
first value whose callback is truthy
↓
return that value immediately
```

If nothing matches:

```text
undefined
```

---

# 37. Native Find Example

```js
const numbers = [
  4,
  7,
  10,
  12,
];

// Step 1: Find first number greater than 8.
const result =
  numbers.find(
    (
      value
    ) => {
      // Step 2: true first occurs at 10.
      return (
        value > 8
      );
    }
  );

// Step 3: find stops at first match.
console.log(
  result
); // Output: 10
```

Output:

```text
10
```

---

# 38. Build `myFind()` Step by Step 🔥🔥🔥

```js
Array.prototype.myFind =
  function (
    callback
  ) {
    // Step 1: `this` is the source array.
    const array =
      this;

    // Step 2: Visit indexes from left to right.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 3: Read current value.
      // For a simple native-like find,
      // even an empty slot is observed as undefined.
      const value =
        array[index];

      // Step 4: Ask callback whether
      // this is the wanted value.
      const matched =
        callback(
          value,
          index,
          array
        );

      // Step 5: The FIRST truthy match
      // is returned immediately.
      if (
        matched
      ) {
        return value;
      }
    }

    // Step 6: No match was found.
    return undefined;
  };
```

---

# 39. Test `myFind()` 🔥🔥🔥

```js
const employees = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: "Priya",
  },
];

// Step 1: Search for employee id 2.
const employee =
  employees.myFind(
    (
      item
    ) => {
      // Step 2: true only for Priya object.
      return (
        item.id
        ===
        2
      );
    }
  );

// Step 3: Print found employee name.
console.log(
  employee.name
); // Output: Priya
```

Output:

```text
Priya
```

---

# 40. `find()` Stops Early 🔥🔥🔥

This is important.

For:

```text
[1, 2, 3, 4, 5]
```

if callback matches `3`:

```text
1 → false
2 → false
3 → true
↓
RETURN 3
↓
4 and 5 are never checked
```

This is called:

```text
short-circuiting / early exit
```

---

# 41. Find vs Filter 🔥🔥🔥

```text
find
→ first matching VALUE
→ stops early
→ returns value or undefined
```

```text
filter
→ ALL matching values
→ checks full array
→ returns array
```

---

# 42. `mySome()` 🔥🔥🔥

Native `some()` asks:

```text
Does AT LEAST ONE value pass?
```

Returns:

```text
true
or
false
```

---

# 43. Native Some Example

```js
const numbers = [
  1,
  3,
  8,
];

// Step 1: Ask whether at least one value is even.
const result =
  numbers.some(
    (
      value
    ) => {
      // Step 2: 8 makes this true.
      return (
        value % 2
        ===
        0
      );
    }
  );

// Step 3: Print boolean result.
console.log(
  result
); // Output: true
```

Output:

```text
true
```

---

# 44. Build `mySome()` Step by Step 🔥🔥🔥

```js
Array.prototype.mySome =
  function (
    callback
  ) {
    // Step 1: `this` is the source array.
    const array =
      this;

    // Step 2: Visit each existing value.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 3: Skip missing sparse-array indexes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 4: If callback is truthy
      // for even one item,
      // return true immediately.
      if (
        callback(
          array[index],
          index,
          array
        )
      ) {
        return true;
      }
    }

    // Step 5: No item passed the condition.
    return false;
  };
```

---

# 45. Test `mySome()` 🔥🔥🔥

```js
const employees = [
  {
    name: "Rahul",
    active: false,
  },
  {
    name: "Priya",
    active: true,
  },
];

// Step 1: Ask whether at least one employee is active.
const hasActiveEmployee =
  employees.mySome(
    (
      employee
    ) => {
      // Step 2: Priya returns true.
      return employee.active;
    }
  );

// Step 3: some stops when first true is found.
console.log(
  hasActiveEmployee
); // Output: true
```

Output:

```text
true
```

---

# 46. `some()` Stops Early

```text
false
false
true
↓
return true immediately
```

Remaining values are not checked.

That makes `some()` useful for:

```text
permission exists?
duplicate exists?
validation failure exists?
selected item exists?
```

---

# 47. `myEvery()` 🔥🔥🔥

Native `every()` asks:

```text
Do ALL values pass?
```

Returns:

```text
true
or
false
```

---

# 48. Native Every Example

```js
const numbers = [
  2,
  4,
  6,
];

// Step 1: Check whether every number is even.
const result =
  numbers.every(
    (
      value
    ) => {
      // Step 2: All values return true.
      return (
        value % 2
        ===
        0
      );
    }
  );

// Step 3: Print final boolean.
console.log(
  result
); // Output: true
```

Output:

```text
true
```

---

# 49. Build `myEvery()` Step by Step 🔥🔥🔥

```js
Array.prototype.myEvery =
  function (
    callback
  ) {
    // Step 1: `this` is the source array.
    const array =
      this;

    // Step 2: Visit each existing item.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 3: Skip sparse-array holes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 4: If even ONE item fails,
      // return false immediately.
      if (
        !callback(
          array[index],
          index,
          array
        )
      ) {
        return false;
      }
    }

    // Step 5: If loop finishes,
    // every checked item passed.
    return true;
  };
```

---

# 50. Test `myEvery()` 🔥🔥🔥

```js
const employees = [
  {
    name: "Rahul",
    active: true,
  },
  {
    name: "Priya",
    active: true,
  },
];

// Step 1: Check whether all employees are active.
const allActive =
  employees.myEvery(
    (
      employee
    ) => {
      // Step 2: Both employees return true.
      return employee.active;
    }
  );

// Step 3: Print final result.
console.log(
  allActive
); // Output: true
```

Output:

```text
true
```

---

# 51. Every Stops on First Failure 🔥🔥🔥

Example:

```text
true
true
false
↓
return false immediately
```

Remaining values are not checked.

---

# 52. Some vs Every 🔥🔥🔥

```text
some()
→ at least ONE true is enough
```

```text
every()
→ ALL must be true
```

Memory trick:

```text
some
→ "someone passed"

every
→ "everyone passed"
```

---

# 53. Empty Array Behavior — Some 🔥🔥🔥

Native:

```js
// Step 1: No element exists that can satisfy condition.
const result =
  [].some(
    () => {
      return true;
    }
  );

// Step 2: some on empty array is false.
console.log(
  result
); // Output: false
```

Output:

```text
false
```

Our `mySome()` behaves the same because loop never finds a true value.

---

# 54. Empty Array Behavior — Every 🔥🔥🔥

Native:

```js
// Step 1: There is no element that violates condition.
const result =
  [].every(
    () => {
      return false;
    }
  );

// Step 2: every on empty array is true.
console.log(
  result
); // Output: true
```

Output:

```text
true
```

This surprises many candidates.

Why?

```text
every returns false
only if it finds a failing value

empty array
→ finds no failing value
→ true
```

---

# 55. All Polyfills Comparison 🔥🔥🔥

```text
myForEach
→ execute callback
→ returns undefined

myMap
→ callback return becomes result item
→ returns new array

myFilter
→ callback decides keep/remove
→ returns new array

myReduce
→ callback builds next accumulator
→ returns accumulated result

myFind
→ first matching value
→ returns value / undefined

mySome
→ at least one match?
→ returns boolean

myEvery
→ all match?
→ returns boolean
```

---

# 56. Callback Return Meaning Comparison 🔥🔥🔥

This is one of the most important sections.

```text
map callback returns:
→ NEW VALUE

filter callback returns:
→ KEEP? true/false

reduce callback returns:
→ NEXT ACCUMULATOR

find callback returns:
→ IS THIS THE MATCH?

some callback returns:
→ DID ONE PASS?

every callback returns:
→ DID THIS ITEM PASS?

forEach callback return:
→ ignored
```

---

# 57. Machine-Coding Question — Rebuild Map 🔥🔥🔥

Requirement:

```text
Given an array,
transform every item
without using native map().
```

Solution pattern:

```text
new result array
↓
loop
↓
callback(value, index, array)
↓
store callback return
↓
return result
```

That is exactly what `myMap()` does.

---

# 58. Machine-Coding Question — Rebuild Filter

Requirement:

```text
Return only matching employees
without using filter().
```

Pattern:

```text
result = []
↓
loop
↓
callback condition
↓
true?
push original item
↓
return result
```

---

# 59. Machine-Coding Question — Rebuild Reduce 🔥🔥🔥

Requirement:

```text
Calculate total salary
without using reduce().
```

Pattern:

```text
accumulator
↓
loop
↓
accumulator = callback(accumulator, value)
↓
return accumulator
```

---

# 60. Common Bug — `map()` Using Push vs Same Index

A simple dense-array polyfill can do:

```js
result.push(
  transformedValue
);
```

But for more native-like sparse-array behavior, using:

```js
result[index] =
  transformedValue;
```

preserves empty positions more accurately.

That is why our `myMap()` creates:

```js
new Array(
  array.length
);
```

and writes to the same indexes.

---

# 61. Sparse Array Awareness 🔥🔥

Example:

```js
// Step 1: Create an array with a missing index 1.
const values = [
  10,
  ,
  30,
];

// Step 2: Native map skips the hole.
const result =
  values.map(
    (
      value
    ) => {
      return (
        value * 2
      );
    }
  );

// Step 3: Length remains 3,
// and index 1 is still empty.
console.log(
  result.length
); // Output: 3
```

Output:

```text
3
```

For interview basics, just remember:

```text
forEach/map/filter/reduce/some/every
generally skip sparse holes

find checks indexes and may observe undefined
```

You do not need to overfocus on sparse arrays unless interviewer asks.

---

# 62. Why We Check `index in array`

This:

```js
if (
  !(index in array)
) {
  continue;
}
```

means:

```text
Does this index actually exist?
```

It helps our polyfill behave closer to native methods on sparse arrays.

---

# 63. Common Bug — Wrong `this` 🔥🔥🔥

Inside:

```js
Array.prototype.myMap =
  function (...) {
```

we use a normal function because:

```text
numbers.myMap(...)
↓
inside myMap
↓
this === numbers
```

If we used an arrow function for the prototype method:

```js
Array.prototype.myMap =
  (...) => {
```

the arrow would not get dynamic `this`.

That is why normal function syntax is important here.

---

# 64. Common Bug — Forgetting Callback Validation

A production-quality polyfill would also check:

```text
Is callback actually a function?
```

Example awareness:

```js
if (
  typeof callback
  !==
  "function"
) {
  throw new TypeError(
    "callback must be a function"
  );
}
```

Interviewers may ask this as an improvement.

---

# 65. Common Bug — Mutating Original Array

For:

```text
map
filter
```

we normally create a new result array.

Do not accidentally do:

```text
array[index] = transformedValue
```

because then you mutate the original array.

---

# 66. Common Bug — Reduce Initial Value 🔥🔥🔥

Two different calls:

```js
numbers.myReduce(
  callback,
  0
);
```

and:

```js
numbers.myReduce(
  callback
);
```

are not the same.

With initial value:

```text
accumulator = initialValue
start at index 0
```

Without initial value:

```text
accumulator = first existing array value
start after that value
```

This distinction is extremely important.

---

# 67. Common Bug — Empty Reduce

```js
// Step 1: Empty array with an initial value is valid.
const result =
  [].myReduce(
    (
      acc,
      value
    ) => {
      return (
        acc + value
      );
    },
    0
  );

// Step 2: No values exist,
// so initial accumulator is returned.
console.log(
  result
); // Output: 0
```

Output:

```text
0
```

But:

```js
[].myReduce(
  callback
);
```

should throw because there is no first value to use as accumulator.

---

# 68. Interview Question — Difference Between Map and forEach 🔥🔥🔥

Good answer:

```text
forEach executes a callback for each item
and returns undefined.

map executes a callback for each item
and creates a new array
using each callback return value.
```

---

# 69. Interview Question — Difference Between Find and Filter

```text
find
→ first matching value
→ returns value or undefined
→ stops early

filter
→ all matching values
→ returns array
→ continues through array
```

---

# 70. Interview Question — Some vs Every 🔥🔥🔥

```text
some
→ true if at least one item passes

every
→ true only if all items pass
```

Both can stop early.

---

# 71. Interview Question — Why Does Reduce Need Return?

Good answer:

```text
The callback return value
becomes the accumulator
for the next iteration.

If I forget to return,
the next accumulator becomes undefined.
```

---

# 72. Interview Question — What Does Map Callback Receive?

```text
current value
current index
original array
```

Our polyfill should pass the same three values.

---

# 73. Interview Question — Why Use Normal Function on Prototype? 🔥🔥🔥

```text
Because normal functions receive dynamic this.

When I call:
numbers.myMap(...)

inside myMap:
this === numbers

Arrow functions do not create
their own dynamic this.
```

---

# 74. Interview Question — Why Polyfills Matter?

Good answer:

```text
Polyfills prove that I understand
the internal behavior of native methods,
not just their syntax.

They test callbacks,
iteration,
return values,
accumulators,
early exits,
this,
and edge cases.
```

---

# 75. Final Master Code — All Seven Polyfills 🔥🔥🔥

```js
Array.prototype.myForEach =
  function (
    callback
  ) {
    // Step 1: Use the current array as source.
    const array =
      this;

    // Step 2: Visit each existing index.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 3: Skip sparse holes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 4: Execute callback.
      callback(
        array[index],
        index,
        array
      );
    }
  };

Array.prototype.myMap =
  function (
    callback
  ) {
    // Step 5: Use current array as source.
    const array =
      this;

    // Step 6: Create same-length result array.
    const result =
      new Array(
        array.length
      );

    // Step 7: Visit each index.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 8: Skip sparse holes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 9: Store callback return value.
      result[index] =
        callback(
          array[index],
          index,
          array
        );
    }

    // Step 10: Return transformed array.
    return result;
  };

Array.prototype.myFilter =
  function (
    callback
  ) {
    // Step 11: Use current array as source.
    const array =
      this;

    // Step 12: Create result array.
    const result =
      [];

    // Step 13: Visit each existing item.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 14: Skip sparse holes.
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 15: Keep original item
      // only when callback is truthy.
      if (
        callback(
          array[index],
          index,
          array
        )
      ) {
        result.push(
          array[index]
        );
      }
    }

    // Step 16: Return filtered values.
    return result;
  };

Array.prototype.myReduce =
  function (
    callback,
    initialValue
  ) {
    // Step 17: Use current array.
    const array =
      this;

    // Step 18: Detect initial value.
    const hasInitialValue =
      arguments.length
      >=
      2;

    // Step 19: Prepare accumulator and start index.
    let accumulator;
    let startIndex;

    if (
      hasInitialValue
    ) {
      // Step 20: Use supplied initial value.
      accumulator =
        initialValue;

      startIndex =
        0;
    } else {
      // Step 21: Find first existing value.
      let found =
        false;

      for (
        let index = 0;
        index < array.length;
        index++
      ) {
        if (
          index in array
        ) {
          accumulator =
            array[index];

          startIndex =
            index + 1;

          found =
            true;

          break;
        }
      }

      // Step 22: Throw if no value exists.
      if (
        !found
      ) {
        throw new TypeError(
          "Reduce of empty array with no initial value"
        );
      }
    }

    // Step 23: Continue accumulation.
    for (
      let index =
        startIndex;
      index < array.length;
      index++
    ) {
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 24: Callback return
      // becomes next accumulator.
      accumulator =
        callback(
          accumulator,
          array[index],
          index,
          array
        );
    }

    // Step 25: Return final accumulator.
    return accumulator;
  };

Array.prototype.myFind =
  function (
    callback
  ) {
    // Step 26: Use current array.
    const array =
      this;

    // Step 27: Check indexes from left to right.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      // Step 28: Read current value.
      const value =
        array[index];

      // Step 29: Return first matching value.
      if (
        callback(
          value,
          index,
          array
        )
      ) {
        return value;
      }
    }

    // Step 30: No match.
    return undefined;
  };

Array.prototype.mySome =
  function (
    callback
  ) {
    // Step 31: Use current array.
    const array =
      this;

    // Step 32: Search for at least one passing value.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 33: One true is enough.
      if (
        callback(
          array[index],
          index,
          array
        )
      ) {
        return true;
      }
    }

    // Step 34: Nothing passed.
    return false;
  };

Array.prototype.myEvery =
  function (
    callback
  ) {
    // Step 35: Use current array.
    const array =
      this;

    // Step 36: Check every existing value.
    for (
      let index = 0;
      index < array.length;
      index++
    ) {
      if (
        !(index in array)
      ) {
        continue;
      }

      // Step 37: One failure is enough
      // to make every() false.
      if (
        !callback(
          array[index],
          index,
          array
        )
      ) {
        return false;
      }
    }

    // Step 38: No failures were found.
    return true;
  };
```

---

# 76. Final Master Test 🔥🔥🔥

```js
const numbers = [
  1,
  2,
  3,
  4,
];

// Step 1: myMap transforms every value.
console.log(
  numbers.myMap(
    (
      value
    ) => {
      return (
        value * 2
      );
    }
  )
); // Output: [2, 4, 6, 8]

// Step 2: myFilter keeps only even values.
console.log(
  numbers.myFilter(
    (
      value
    ) => {
      return (
        value % 2
        ===
        0
      );
    }
  )
); // Output: [2, 4]

// Step 3: myReduce adds all values.
console.log(
  numbers.myReduce(
    (
      total,
      value
    ) => {
      return (
        total + value
      );
    },
    0
  )
); // Output: 10

// Step 4: myFind returns first value > 2.
console.log(
  numbers.myFind(
    (
      value
    ) => {
      return (
        value > 2
      );
    }
  )
); // Output: 3

// Step 5: mySome checks whether
// at least one value is > 3.
console.log(
  numbers.mySome(
    (
      value
    ) => {
      return (
        value > 3
      );
    }
  )
); // Output: true

// Step 6: myEvery checks whether
// every value is greater than 0.
console.log(
  numbers.myEvery(
    (
      value
    ) => {
      return (
        value > 0
      );
    }
  )
); // Output: true
```

Output:

```text
[2, 4, 6, 8]
[2, 4]
10
3
true
true
```

---

# 77. Final Memory Table 🔥🔥🔥

| Method | Callback return means | Method returns |
|---|---|---|
| `forEach` | Mostly ignored | `undefined` |
| `map` | New transformed value | New array |
| `filter` | Keep/remove decision | New filtered array |
| `reduce` | Next accumulator | Final accumulator |
| `find` | Is this the match? | First value / `undefined` |
| `some` | Did one pass? | Boolean |
| `every` | Did this item pass? | Boolean |

---

# 78. Quick Memory 🧠🔥🔥🔥

## `myForEach`

```text
loop
→ callback
→ no result array
```

## `myMap`

```text
loop
→ callback
→ store callback RETURN
→ new array
```

## `myFilter`

```text
loop
→ callback truthy?
→ push ORIGINAL value
```

## `myReduce`

```text
accumulator
→ callback
→ return next accumulator
```

## `myFind`

```text
first truthy match
→ return value
```

## `mySome`

```text
one true
→ true
```

## `myEvery`

```text
one false
→ false
```

---

# 79. Best Interview Answer 🔥🔥🔥

```text
Array polyfills recreate the behavior
of built-in array methods.

ForEach executes the callback
and returns undefined.

Map builds a new array
from callback return values.

Filter uses the callback only
to decide whether the original value should be kept.

Reduce carries an accumulator,
and each callback return becomes
the next accumulator.

Find returns the first matching value,
some returns true on the first passing item,
and every returns false on the first failing item.

While implementing polyfills,
I also pay attention to callback arguments,
this binding,
initial values,
early exits,
sparse arrays,
and avoiding mutation
where the native method returns a new array.
```

---

# ✅ 9.2 Array Polyfills Complete

Section 9 progress:

```text
9.1 Function Patterns ✅
9.2 Array Polyfills ✅
9.3 Function Polyfills ← NEXT
9.4 Build Utilities
9.5 Data Transformation
9.6 Machine-Coding Utilities
9.7 Promise Implementations
9.8 Event System
9.9 String Utilities
9.10 DOM / Browser Practical
9.11 Advanced Awareness
9.12 Final Interview Practical
```

Next:

```text
9.3 Function Polyfills 🔥🔥🔥
├── custom call()
├── custom apply()
├── custom bind()
├── this handling
├── arguments handling
└── interview traps
```

**Next: 9.3 Function Polyfills 🔥🔥🔥**
