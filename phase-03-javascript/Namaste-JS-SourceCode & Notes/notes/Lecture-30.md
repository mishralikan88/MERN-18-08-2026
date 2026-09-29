
#  What is 'this' in JavaScript?

this refers to the object that calls the function, and its value is determined at the time of invocation.

# Use Cases of this in JavaScript

Below are different scenarios where the value of this changes depending on how and where it's used.

✅ Case 1: Global Scope

```js

'use strict';
console.log(this); // this ->  undefined (strict mode)

console.log(this); // this ->  window (non-strict mode)

```

Explanation - 

-> In strict mode, this in the global scope is undefined to avoid accidental access to the global object.

-> In non-strict mode, it defaults to the global object (window in browsers).




✅ Case 2: Regular Function (Non-strict Mode)

```js

function show() {
  console.log(this); // ✅ Output: window
}
show();

```

Explanation:

-> A regular function called in the global context (non-strict mode) is not bound to any object.

-> So, 'this' defaults to the global object (window in browsers).

📌 Since the function isn't called as a method of any object, JavaScript binds this to the global object.



✅ Case 3: Regular Function (Strict Mode)

```js

"use strict";
function show() {
  console.log(this); // ✅ Output: undefined
}
show();

```

Explanation:

-> In strict mode, regular functions do not default 'this' to the global object.

-> Instead, this remains undefined if the function is not called as a method of an object.

📌 This helps prevent accidental access to global variables and enforces safer coding practices.





✅ Case 4: Object Method

```js

const obj = {
  name: "Likan",
  greet() {
    console.log(this.name); // ✅ Output: Likan
  }
};
obj.greet();

```
Explanation:

-> When a function is called as a method of an object, 'this' refers to the object itself.

-> So here, 'this' points to obj.

📌 Whenever a function is invoked using object.method(), this refers to that object.


✅ Case 5: Nested Object Method (Direct Call)


```js

const user = {
  name: "Likan",
  details: {
    showName() {
      console.log(this.name); // ✅ Output: undefined
    }
  }
};

user.details.showName();

```

Explanation:

-> The method showName() is called on the details object — not user.

-> So, this refers to the details object, which does not have a name property.

📌 If you add name: "XYZ" inside details, then that value would be logged instead.



✅ Case 6: Assign Method to Variable & Call

```js

const person = {
  name: "Likan",
  greet() {
    console.log(this.name); 
  }
};

const sayHi = person.greet;

sayHi();

```

Explanation:

When you assign person.greet to sayHi, you're detaching the method from its object.

Now sayHi() is called as a regular function, not as an object method.

📌 Since the method is no longer called on person

    -> 'this' is undefined in strict mode. this.name -> Error (❌ TypeError (cannot read 'name' of undefined))

    -> 'this' is window in non-strict mode, which likely doesn’t have a name property. this.name -> undefined.

Note - Accessing a non-existent property on window returns undefined but does not create it.


✅ Case 7: Arrow Function Inside Object

```js

const person = {
  name: "Likan",
  greet: () => {
    console.log(this.name); // ✅ Output: undefined
  }
};

person.greet(); // or window.person.greet(); -> non-strict mode

```

Explanation:

-> Arrow functions do not have their own this.

-> They inherit this from their lexical scope.

-> Although greet is inside the person object, its lexical scope is outside the object (i.e., the global scope).

-> So, this refers to the global object (window in non-strict mode, undefined in strict mode).That's why this.name logs undefined (or window.name), even though person.name is "Likan".




✅ Case 8: Arrow Function Inside a Regular Method

```js

const person = {
  name: "Likan",
  greet() {
    const inner = () => {
      console.log(this.name); // ✅ Output: Likan
    };
    inner();
  }
};

person.greet();


```

Explanation:

-> Arrow functions inherit this from their lexical (surrounding) scope.

-> Here, inner is inside the regular greet() method, so it takes this from greet().

-> greet() is called on the person object, so this refers to person.

-> That’s why this.name logs "Likan".





✅ Case 9: Function Inside Method (Regular Function)

```js

const person = {
  name: "Likan",
  greet() {
    function inner() {
      console.log(this.name); // ✅ Output: undefined
    }
    inner();
  }
};

person.greet();


```
Explanation:

-> inner() is a regular function, not an arrow function.

-> Regular functions have their own this, and don’t inherit it from their surrounding scope.

-> So, this inside inner() refers to the global object (window in non-strict mode, or undefined in strict mode).

-> That’s why this.name logs undefined, even though person.name exists.

📌 To fix this, you can either use an arrow function or store this in a variable like const self = this.


✅ Case 10: Constructor Function

```js

function Person(name) {
  this.name = name;
  console.log(this.name); // ✅ Output: Likan
}

const p1 = new Person("Likan");

```

Explanation:

-> When a function is called with the new keyword, it acts as a constructor.

-> The new keyword creates a new empty object.

-> 'this' inside the constructor refers to that newly created object.

-> The name is set on this new object and logged.

📌 That’s why this.name prints "Likan".



✅ Case 11: Class Method

```js

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(this.name); // ✅ Output: Likan
  }
}

const p1 = new Person("Likan"); // constructor is called & object p1 is instantiated . p1 = {name:"Likan"}

p1.greet();

```

Explanation:

-> We're calling the greet() method on an instance of the Person class.

-> In class methods, this refers to the instance that invokes the method.

-> Here, this refers to p1, and p1.name is "Likan".

📌 So this.name logs "Likan", just like in regular object methods.



✅ Case 12: setTimeout with Regular Function

```js

const person = {
  name: "Likan",
  greet() {
    setTimeout(function () {
      console.log(this.name); // ✅ Output: undefined
    }, 1000);
  }
};

person.greet();

```

Explanation:

-> The callback passed to setTimeout is a regular function, not bound to person.

-> So, this inside the callback refers to the global object (or undefined in strict mode).

-> It doesn't inherit the this from greet().

📌 That’s why this.name logs undefined even though person.name is "Likan".


✅ Case 13: setTimeout with Arrow Function

```js

const person = {
  name: "Likan",
  greet() {
    setTimeout(() => {
      console.log(this.name); // ✅ Output: Likan
    }, 1000);
  }
};

person.greet();

```

Explanation:

-> Arrow functions inherit this from their lexical scope.

-> Here, the arrow function is defined inside the greet() method, whose this refers to person.

So, this inside setTimeout callback refers to person.

📌 That’s why this.name correctly logs "Likan".



✅ Case 14: Event Listener with Regular Function


<button id="btn">Click Me</button>

<script>
  document.getElementById("btn").addEventListener("click", function () {
    console.log(this); // ✅ Output: <button id="btn">Click Me</button>
  });
</script>


Explanation:

-> The callback is a regular function bound as an event listener.

->  In this context, this refers to the DOM element that triggered the event.

📌 That’s why this points to the button element when clicked.



✅ Case 15: Event Listener with Arrow Function



<button id="btn">Click Me</button>

<script>
  document.getElementById("btn").addEventListener("click", () => {
    console.log(this); // ✅ Output: window
  });
</script>


Explanation:

-> Arrow functions do not have their own this.

-> this is inherited from the lexical scope, which in this case is the global scope (window).

📌 That’s why this inside the arrow function refers to window, not the button.

❗ Prefer regular functions for DOM event handlers if you need this to refer to the HTML element.



✅ Case 16: Manually Binding this with .bind()

```js

const person = {
  name: "Likan"
};

function greet() {
  console.log(this.name); // ✅ Output: Likan
}

const boundGreet = greet.bind(person);

boundGreet();

```

Explanation:

-> The bind() method returns a new function with this permanently set to the given object.

-> Here, this inside greet is bound to the person object.

📌 Use .bind() when you want to fix the value of this.



✅ Case 17: Manually Setting this with .call()

```js

function greet() {
  console.log(this.name); // ✅ Output: Likan
}

const person = { name: "Likan" };

greet.call(person);

```

Explanation:

-> The .call() method immediately invokes the function with this set to the provided object.

-> In this case, this becomes person, so this.name is "Likan".

📌 Think of .call() like saying:
👉 “Run this function as if it belongs to person.”



✅ Case 18: Using .apply()

```js

function greet(language, country) {
  console.log(`${this.name} speaks ${language} from ${country}`); 
  // ✅ Output: Likan speaks JavaScript from India
}

const person = { name: "Likan" };

greet.apply(person, ["JavaScript", "India"]);

```
Explanation:

-> .apply() works like .call(), but it takes arguments as an array.

-> this is set to person, and the arguments language and country are passed in as array elements.

📌 Use .apply() when your arguments are already packed in an array.




✅ Case 19: Losing this in Callback (e.g., Array Iteration)


```js

const obj = {
  name: "Likan",
  languages: ["JS", "Python"],
  showLangs() {
    this.languages.forEach(function (lang) {
      console.log(this.name + " knows " + lang);
      // ✅ Output: undefined knows JS / undefined knows Python
    });
  }
};
obj.showLangs();

```

Explanation:

-> Regular functions don't retain the outer this.

-> So, 'this' inside the callback refers to window (or undefined in strict mode).

📌 Fix with arrow function:


```js

this.languages.forEach((lang) => {
  console.log(this.name + " knows " + lang);
  // ✅ Output: Likan knows JS / Likan knows Python
});

```

-> Arrow functions inherit this from the lexical scope (showLangs() method).



✅ Case 20: Class Method with Regular Function (Detached Call)

```js

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  };
}

const p1 = new Person("Likan");
const greetFunc = p1.greet;
greetFunc(); // ❌ Output: undefined (in strict mode)

```

Explanation-

-> greet is a regular method, so this is not bound automatically.

-> When you assign p1.greet to greetFunc, you detach it from the p1 object.

-> Now, calling greetFunc() is just like calling a standalone function — this inside greet() doesn't point to p1 anymore.

-> 'this' refers to:

    -> In non-strict mode: this refers to window (or global in Node.js).

    -> In strict mode: this becomes undefined.



✅ Case 21: Class Field Arrow Function & Lexical this


```js

class Person {
  constructor(name) {
    this.name = name;
  }

  greet = () => {
    console.log(this.name);
  };
}

const p1 = new Person("Likan");
const greetFunc = p1.greet;
greetFunc(); // ✅ Output: Likan


```

Explanation -

-> The method greet is defined using arrow function + class field syntax — this combination changes the way 'this' is handled.

-> this refers to: p1 (the instance of Person)

✅ Output: Likan

📌 Why it works:

→ greet = () => {} is not stored on the prototype like regular methods.

→ Instead, it is treated like:

```js

constructor(name) {
  this.name = name;
  this.greet = () => {
    console.log(this.name);
  };
}

```

→ This means the arrow function is created during object construction, and thus:

    -> 'this' lexically binds to the current object instance (p1)

    -> Even if greet is detached and called later, it still retains the correct this


✅ Case 22: Using this in setTimeout Inside Class


```js

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    setTimeout(function () {
      console.log(this.name); 
      // ✅ Output: undefined
    }, 1000);
  }
}

const p1 = new Person("Likan");
p1.greet();

```

Explanation - 

-> greet() is called on the p1 object, so this inside greet() is p1.

-> But setTimeout is a global function, and its callback is a regular function.

-> So, the this inside the regular function doesn't refer to p1, even though it's inside greet().

-> 'this' refers to Global object (window in browsers) if not in strict mode , undefined in strict mode


Output: undefined

📌 Fix it using arrow function (lexical binding):

```js

setTimeout(() => {
  console.log(this.name); 
  // ✅ Output: Likan
}, 1000);

```
📘 Explanation:

-> Arrow functions don’t have their own this.

-> They lexically inherit this from the surrounding scope — in this case, from greet().

-> Since greet() is called on p1, this inside the arrow function refers to p1.



✅ Case 23: this in Immediately Invoked Function Expression (IIFE)

```js

(function () {
  console.log(this); 
  // ✅ Output: Window {...}
})();

```

Explanation:

-> In non-strict mode, an IIFE runs in the global context.

-> So, this inside it refers to the global object (window in browsers).

📌 In strict mode ('use strict'), this would be undefined.



✅ Case 24: DOM Event Listener with bind


<button id="btn">Click Me</button>
<script>
  const btn = document.getElementById("btn");

  function handleClick() {
    console.log(this); 
    // ✅ Output: { custom: "object" }
  }

  btn.addEventListener("click", handleClick.bind({ custom: "object" }));
</script>


Explanation:

-> bind() is used to explicitly set this to { custom: "object" }.

-> Normally, this in a DOM event handler refers to the element (button), but bind() overrides that.

📌 This approach is useful when you want the callback to operate in a custom context instead of the default element.



✅ Case 25: Assigning Arrow Function as Callback but Losing this

```js

const obj = {
  name: "Likan",
  showName: () => {
    console.log(this.name); // ✅ Output: undefined
  }
};

setTimeout(obj.showName, 1000);

```

Explanation:

-> Arrow functions do not have their own this.
-> this is inherited from the outer lexical environment, which is likely the global object (e.g., window in browsers).
-> Even though showName is inside obj, arrow functions don’t bind this to obj.

📌 Always use regular functions if you want this to refer to the object the function belongs to.




✅ Case 26: Reassigning Object Method

```js

const obj = {
  name: "Likan",
  greet() {
    console.log(this.name);  // ✅ Output: undefined
  }
};

const greetFunc = obj.greet;
greetFunc();

```

Explanation:

-> greetFunc is just a reference to obj.greet, detached from obj.
-> When called standalone, this no longer points to obj.
-> Instead, this defaults to window (or undefined in strict mode).

📌 Fix it by binding this manually:

```js

const greetFunc = obj.greet.bind(obj);
greetFunc(); // ✅ Likan

```




✅ Case 27: Nested Object – this Pitfall

```js

const obj = {
  name: "Outer",
  inner: {
    name: "Inner",
    greet() {
      console.log(this.name); 
      // ✅ Output: Inner
    }
  }
};

obj.inner.greet();

```

Explanation:

-> Even though greet() is deeply nested, what matters is the immediate caller.
-> Here, obj.inner is calling greet(), so this refers to inner.

📌 this is not influenced by full object nesting, only by the direct caller.



✅ Case 28: Strict Mode Function


```js

"use strict";

function show() {
  console.log(this); 
  // ✅ Output: undefined
}

show();

```

Explanation:

-> In strict mode, calling a standalone regular function causes this to be undefined.
-> Without 'use strict', this would default to the global object (i.e., window in browsers).

📌 Strict mode prevents accidental reference to the global object via this.




✅ Case 29: Arrow Function Inside Object (Declared Incorrectly)


```js

const obj = {
  name: "Likan",
  greet: () => {
    console.log(this.name); 
    // ✅ Output: undefined
  }
};

obj.greet();

```

Explanation:

→ Arrow functions don’t have their own this, so this is inherited from the outer lexical scope.
→ In this case, the outer scope is likely the global scope (window in browsers), not obj.

📌 Even though greet is inside obj, it doesn’t get obj's context.
➡ Use regular function syntax if you want this to refer to obj.



✅ Case 30: Arrow Function Inside a Method (Lexical this)

```JS

const obj = {
  name: "Likan",
  greet() {
    const arrowFunc = () => {
      console.log(this.name);  // ✅ Output: Likan
    };
    arrowFunc();
  }
};

obj.greet();

```

Explanation:

→ arrowFunc is defined inside the greet() method.
→ Arrow functions inherit this lexically — from where they are defined.
→ Since greet() is called on obj, this inside greet() refers to obj, and so does this in arrowFunc.

📌 This is a powerful pattern to retain the object context inside nested functions.



✅ Case 31: 'this' in Getters and Setters

```js

const user = {
  firstName: "Likan",
  lastName: "Roy",
  get fullName() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(user.fullName); // Output: "Likan Roy"

```

-> this inside a getter refers to the object that owns the getter — here it's user.




✅ Case 32: this in Inline DOM Event Handlers (Browser only)

<button onclick="console.log(this)">Click Me</button>

-> this refers to the DOM element itself — here, the <button>.

-> ⚠️ Only works for inline handlers like onclick="...". In script-based listeners, it's different.




✅ Case 33: this in ES6 Modules vs Global Scripts


```js

// In an ES6 module (type="module" in HTML)
console.log(this); // Output: undefined

// In a normal <script> (non-module)
console.log(this); // Output: window

```


-> In ES6 modules, top-level this is undefined.
-> In global scripts, it points to window.

✅ Case 34: this in IIFE (Immediately Invoked Function Expression)


```js

(function () {
  console.log(this); // window (in non-strict mode)
})();

(function () {
  "use strict";
  console.log(this); // undefined (in strict mode)
})();

```

-> IIFEs follow the same this rules as normal functions.




✅ Case 35: Arrow Functions Ignore .bind()

```js

const arrow = () => {
  console.log(this);
};

const boundArrow = arrow.bind({ name: "Likan" });
boundArrow(); // Output: Still outer lexical `this` (not { name: "Likan" })

```

-> Arrow functions do not care about .bind(), .call(), or .apply() — their this is permanently lexically bound.

