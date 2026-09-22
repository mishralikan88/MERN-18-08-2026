# 7.11 Classes 🔥🔥🔥

JavaScript classes are a cleaner syntax for creating objects and working with prototype-based inheritance.

Important:

```text
class syntax
↓
looks like classical OOP
↓
but JavaScript still uses prototypes underneath
```

Master mental model:

```text
class Employee
↓
constructor()
→ instance-specific data

prototype methods
→ shared behavior

new Employee()
↓
creates instance
↓
instance [[Prototype]]
→ Employee.prototype
```

This chapter covers:

```text
class
constructor
new with class
Instance Properties
Instance Methods
Prototype Behind Classes
this
extends
super
Method Overriding
static
Getters
Setters
Private Fields Awareness
Class Fields Awareness
Lost this
instanceof
Output Questions
Debugging Traps
```

---

# 1. What Is a JavaScript Class? 🔥🔥🔥

A class is syntax used to define:

```text
how objects should be created
+
what methods those objects should share
```

Example:

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  showName() {
    return this.name;
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.showName()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 2. Classes Still Use Prototypes 🔥🔥🔥

Very important interview point:

```text
JavaScript classes are NOT
a separate inheritance system.
```

Under the hood:

```text
class methods
→ stored on prototype
```

Example:

```js
class Employee {
  // Step 1:
  showName() {
    return "Rahul";
  }
}

// Step 2:
console.log(
  Object.hasOwn(
    Employee.prototype,
    "showName"
  )
); // Output: true
```

Output:

```text
true
```

---

# 3. Class Basic Syntax

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  getName() {
    return this.name;
  }
}
```

Main parts:

```text
class Employee
→ class name

constructor()
→ initialization

getName()
→ instance method
```

---

# 4. Creating an Instance With `new` 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

// Step 2:
const employee =
  new Employee(
    "Rahul"
  );

// Step 3:
console.log(
  employee.name
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 5. Classes Must Be Called With `new` 🔥🔥🔥

This fails:

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

try {
  // Step 2:
  Employee(
    "Rahul"
  );
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

Classes cannot be called like normal functions.

---

# 6. What Does `constructor()` Do?

`constructor()` runs automatically when you use:

```text
new ClassName()
```

Example:

```js
class Employee {
  // Step 1:
  constructor(
    name,
    salary
  ) {
    this.name =
      name;

    this.salary =
      salary;
  }
}

// Step 2:
const employee =
  new Employee(
    "Rahul",
    50000
  );

// Step 3:
console.log(
  employee.salary
); // Output: 50000
```

Output:

```text
50000
```

---

# 7. Constructor Runs Once Per Instance

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    console.log(
      `Creating ${name}`
    );

    this.name =
      name;
  }
}

// Step 2:
const first =
  new Employee(
    "Rahul"
  );

// Step 3:
const second =
  new Employee(
    "Amit"
  );
```

Output:

```text
Creating Rahul
Creating Amit
```

Each `new` call runs the constructor.

---

# 8. Constructor Is Optional

A class can exist without explicitly writing a constructor.

```js
class Employee {
  // Step 1:
  show() {
    return "Hello";
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee.show()
); // Output: Hello
```

Output:

```text
Hello
```

JavaScript supplies a default constructor behavior.

---

# 9. Instance Properties 🔥🔥🔥

Properties assigned using `this` inside the constructor become own properties of the instance.

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

// Step 2:
const employee =
  new Employee(
    "Rahul"
  );

// Step 3:
console.log(
  Object.hasOwn(
    employee,
    "name"
  )
); // Output: true
```

Output:

```text
true
```

---

# 10. Instance Methods 🔥🔥🔥

Methods written inside class body are shared through the prototype.

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  showName() {
    return this.name;
  }
}

// Step 3:
const first =
  new Employee(
    "Rahul"
  );

// Step 4:
const second =
  new Employee(
    "Amit"
  );

// Step 5:
console.log(
  first.showName
  ===
  second.showName
); // Output: true
```

Output:

```text
true
```

---

# 11. Why Are Class Methods Shared?

Because conceptually:

```text
Employee.prototype.showName
```

holds the method.

Instances inherit it.

Mental model:

```text
first
↓
Employee.prototype
→ showName()

second
↓
Employee.prototype
→ same showName()
```

---

# 12. Verify Class Prototype Link 🔥🔥🔥

```js
class Employee {
  // Step 1:
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  Object.getPrototypeOf(
    employee
  )
  ===
  Employee.prototype
); // Output: true
```

Output:

```text
true
```

---

# 13. `this` Inside Class Method 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  showName() {
    return this.name;
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.showName()
); // Output: Rahul
```

Output:

```text
Rahul
```

Call:

```text
employee.showName()
```

means:

```text
this = employee
```

---

# 14. Class Methods Can Update Instance State

```js
class Counter {
  // Step 1:
  constructor() {
    this.count =
      0;
  }

  // Step 2:
  increment() {
    this.count++;
  }
}

// Step 3:
const counter =
  new Counter();

// Step 4:
counter.increment();

// Step 5:
counter.increment();

// Step 6:
console.log(
  counter.count
); // Output: 2
```

Output:

```text
2
```

---

# 15. Different Instances Have Separate Data

```js
class Counter {
  // Step 1:
  constructor() {
    this.count =
      0;
  }

  // Step 2:
  increment() {
    this.count++;
  }
}

// Step 3:
const first =
  new Counter();

// Step 4:
const second =
  new Counter();

// Step 5:
first.increment();

// Step 6:
console.log(
  first.count
); // Output: 1

// Step 7:
console.log(
  second.count
); // Output: 0
```

Output:

```text
1
0
```

Methods are shared.

Instance data is separate.

---

# 16. Class Methods Are Not Own Properties

```js
class Employee {
  // Step 1:
  show() {
    return "Hello";
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  Object.hasOwn(
    employee,
    "show"
  )
); // Output: false

// Step 4:
console.log(
  Object.hasOwn(
    Employee.prototype,
    "show"
  )
); // Output: true
```

Output:

```text
false
true
```

---

# 17. `constructor` Lives on the Prototype Too — Awareness

```js
class Employee {
  // Step 1:
}

// Step 2:
console.log(
  Employee.prototype.constructor
  ===
  Employee
); // Output: true
```

Output:

```text
true
```

---

# 18. Classes Run in Strict Mode 🔥🔥🔥

Class bodies and class methods use strict-mode semantics automatically.

This matters for detached methods.

Example:

```js
class Employee {
  // Step 1:
  showThis() {
    return this;
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
const fn =
  employee.showThis;

// Step 4:
console.log(
  fn()
); // Output: undefined
```

Output:

```text
undefined
```

---

# 19. Lost `this` With Class Method 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  showName() {
    return this.name;
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
const fn =
  employee.showName;

try {
  // Step 5:
  console.log(
    fn()
  );
} catch (
  error
) {
  // Step 6:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

Because:

```text
fn()
→ standalone call
→ this = undefined
```

---

# 20. Fix Lost `this` With `bind()` 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  showName() {
    return this.name;
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
const bound =
  employee.showName.bind(
    employee
  );

// Step 5:
console.log(
  bound()
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 21. What Is Inheritance With Classes? 🔥🔥🔥

Inheritance lets one class reuse behavior from another class.

Example relationship:

```text
Person
↓
Employee
```

Meaning:

```text
Employee is a specialized Person
```

---

# 22. `extends` 🔥🔥🔥

Use `extends` to create a child class.

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

// Step 2:
class Employee
  extends Person {
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
); // Output: Hello
```

Output:

```text
Hello
```

`Employee` inherits `Person` methods.

---

# 23. Prototype Chain With `extends`

Conceptually:

```text
employee
↓
Employee.prototype
↓
Person.prototype
↓
Object.prototype
↓
null
```

That is still prototype-based inheritance.

---

# 24. Parent Constructor + Child Constructor 🔥🔥🔥

```js
class Person {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

class Employee
  extends Person {
  // Step 2:
  constructor(
    name,
    role
  ) {
    // Step 3:
    super(
      name
    );

    // Step 4:
    this.role =
      role;
  }
}

// Step 5:
const employee =
  new Employee(
    "Rahul",
    "Developer"
  );

// Step 6:
console.log(
  employee.name
); // Output: Rahul

// Step 7:
console.log(
  employee.role
); // Output: Developer
```

Output:

```text
Rahul
Developer
```

---

# 25. What Does `super()` Do? 🔥🔥🔥

Inside a derived class constructor:

```text
super(...)
```

calls the parent constructor.

Example:

```text
Employee extends Person
↓
super(name)
↓
Person constructor runs
↓
this.name is initialized
```

---

# 26. Must Call `super()` Before Using `this` in Derived Constructor 🔥🔥🔥

Wrong:

```js
class Person {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

class Employee
  extends Person {
  // Step 2:
  constructor(
    name,
    role
  ) {
    try {
      // Step 3:
      this.role =
        role;
    } catch (
      error
    ) {
      // Step 4:
      console.log(
        error.name
      );
    }

    // Step 5:
    super(
      name
    );
  }
}
```

In a derived constructor, `this` cannot be used before `super()` successfully runs.

Interview rule:

```text
extends + custom constructor
→ call super() before this
```

---

# 27. Why Must `super()` Come First?

For base class:

```text
new Base()
→ base constructor receives new this
```

For derived class:

```text
new Child()
↓
parent construction must establish this
↓
super()
↓
then child can use this
```

---

# 28. Child Can Inherit Parent Methods 🔥🔥🔥

```js
class Person {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  greet() {
    return (
      `Hello ${this.name}`
    );
  }
}

class Employee
  extends Person {
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.greet()
); // Output: Hello Rahul
```

Output:

```text
Hello Rahul
```

---

# 29. Child Can Add Its Own Methods

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

class Employee
  extends Person {
  // Step 2:
  getRole() {
    return "Developer";
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
); // Output: Hello

// Step 5:
console.log(
  employee.getRole()
); // Output: Developer
```

Output:

```text
Hello
Developer
```

---

# 30. Method Overriding 🔥🔥🔥

Child class can define a method with the same name as the parent.

```js
class Person {
  // Step 1:
  greet() {
    return "Hello from Person";
  }
}

class Employee
  extends Person {
  // Step 2:
  greet() {
    return "Hello from Employee";
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
);
// Output:
// Hello from Employee
```

Output:

```text
Hello from Employee
```

Child method shadows parent method in lookup.

---

# 31. Calling Parent Method With `super.method()` 🔥🔥🔥

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

class Employee
  extends Person {
  // Step 2:
  greet() {
    const parentMessage =
      super.greet();

    // Step 3:
    return (
      `${parentMessage} Rahul`
    );
  }
}

// Step 4:
const employee =
  new Employee();

// Step 5:
console.log(
  employee.greet()
); // Output: Hello Rahul
```

Output:

```text
Hello Rahul
```

---

# 32. `super()` vs `super.method()` 🔥🔥🔥

Remember:

```text
super(...)
→ call parent constructor

super.method()
→ call parent prototype method
```

---

# 33. `instanceof` With Inheritance 🔥🔥🔥

```js
class Person {
  // Step 1:
}

class Employee
  extends Person {
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee
  instanceof
  Employee
); // Output: true

// Step 4:
console.log(
  employee
  instanceof
  Person
); // Output: true

// Step 5:
console.log(
  employee
  instanceof
  Object
); // Output: true
```

Output:

```text
true
true
true
```

---

# 34. Why Is `employee instanceof Person` True?

Because:

```text
Person.prototype
```

appears in the prototype chain.

Mental model:

```text
employee
↓
Employee.prototype
↓
Person.prototype
```

---

# 35. Static Methods 🔥🔥🔥

A `static` method belongs to the class itself, not to instances.

```js
class Employee {
  // Step 1:
  static getCompany() {
    return "ABC";
  }
}

// Step 2:
console.log(
  Employee.getCompany()
); // Output: ABC
```

Output:

```text
ABC
```

---

# 36. Instance Cannot Normally Call Static Method

```js
class Employee {
  // Step 1:
  static getCompany() {
    return "ABC";
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  typeof employee.getCompany
); // Output: undefined
```

Output:

```text
undefined
```

Because:

```text
getCompany
→ belongs to Employee class
```

not the instance.

---

# 37. Static Method vs Instance Method 🔥🔥🔥

```js
class Employee {
  // Step 1:
  static company() {
    return "ABC";
  }

  // Step 2:
  getRole() {
    return "Developer";
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  Employee.company()
); // Output: ABC

// Step 5:
console.log(
  employee.getRole()
); // Output: Developer
```

Output:

```text
ABC
Developer
```

---

# 38. When Are Static Methods Useful?

Use static methods for behavior related to the class itself.

Examples:

```text
factory helpers
validation helpers
parsing helpers
class-level utilities
```

Example:

```js
class Employee {
  // Step 1:
  static isValidSalary(
    salary
  ) {
    return (
      salary
      >=
      0
    );
  }
}

// Step 2:
console.log(
  Employee.isValidSalary(
    50000
  )
); // Output: true
```

Output:

```text
true
```

---

# 39. Static Properties — Awareness 🔥🔥

Modern JavaScript also supports static fields.

```js
class Employee {
  // Step 1:
  static company =
    "ABC";
}

// Step 2:
console.log(
  Employee.company
); // Output: ABC
```

Output:

```text
ABC
```

---

# 40. Public Class Fields — Awareness 🔥🔥

Modern classes can define instance fields outside the constructor.

```js
class Employee {
  // Step 1:
  department =
    "IT";

  // Step 2:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
console.log(
  employee.department
); // Output: IT
```

Output:

```text
IT
```

---

# 41. Class Field Is an Own Property

```js
class Employee {
  // Step 1:
  department =
    "IT";
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  Object.hasOwn(
    employee,
    "department"
  )
); // Output: true
```

Output:

```text
true
```

---

# 42. Arrow Function as Class Field — Awareness 🔥🔥

You may see:

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  showName =
    () => {
      return this.name;
    };
}
```

This arrow function gets lexical `this` from the instance initialization context.

A useful effect:

```text
method extraction often keeps instance this
```

But:

```text
each instance gets its own function object
```

unlike prototype methods.

---

# 43. Prototype Method vs Arrow Class Field 🔥🔥🔥

Prototype method:

```text
showName() { ... }

→ shared via prototype
```

Arrow class field:

```text
showName = () => { ... }

→ own function per instance
```

Trade-off:

```text
prototype method
→ memory efficient/shared
→ can lose this when detached

arrow field
→ keeps lexical instance this
→ separate function per instance
```

---

# 44. Getter 🔥🔥

A getter lets a method-like calculation be accessed like a property.

```js
class Employee {
  // Step 1:
  constructor(
    firstName,
    lastName
  ) {
    this.firstName =
      firstName;

    this.lastName =
      lastName;
  }

  // Step 2:
  get fullName() {
    return (
      `${this.firstName} ${this.lastName}`
    );
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul",
    "Mishra"
  );

// Step 4:
console.log(
  employee.fullName
); // Output: Rahul Mishra
```

Output:

```text
Rahul Mishra
```

Notice:

```text
employee.fullName
```

not:

```text
employee.fullName()
```

---

# 45. Setter 🔥🔥

A setter lets assignment trigger custom logic.

```js
class Employee {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  set displayName(
    value
  ) {
    this.name =
      value.trim();
  }
}

// Step 3:
const employee =
  new Employee(
    "Rahul"
  );

// Step 4:
employee.displayName =
  "  Amit  ";

// Step 5:
console.log(
  employee.name
); // Output: Amit
```

Output:

```text
Amit
```

---

# 46. Getter + Setter Together 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    salary
  ) {
    this._salary =
      salary;
  }

  // Step 2:
  get salary() {
    return this._salary;
  }

  // Step 3:
  set salary(
    value
  ) {
    if (
      value
      >=
      0
    ) {
      this._salary =
        value;
    }
  }
}

// Step 4:
const employee =
  new Employee(
    50000
  );

// Step 5:
employee.salary =
  60000;

// Step 6:
console.log(
  employee.salary
); // Output: 60000
```

Output:

```text
60000
```

---

# 47. Why `_salary` Instead of `salary` in Setter?

If setter did:

```text
this.salary = value
```

inside:

```text
set salary(...)
```

it would trigger the setter again.

That can cause recursion.

Using another storage property such as:

```text
_salary
```

avoids that.

---

# 48. Private Fields `#` — Awareness 🔥🔥🔥

Modern JavaScript supports private class fields.

```js
class BankAccount {
  // Step 1:
  #balance =
    0;

  // Step 2:
  deposit(
    amount
  ) {
    this.#balance +=
      amount;
  }

  // Step 3:
  getBalance() {
    return this.#balance;
  }
}

// Step 4:
const account =
  new BankAccount();

// Step 5:
account.deposit(
  1000
);

// Step 6:
console.log(
  account.getBalance()
); // Output: 1000
```

Output:

```text
1000
```

---

# 49. Private Field Cannot Be Accessed Outside Class

Conceptually this is invalid:

```text
account.#balance
```

Private fields are enforced by JavaScript syntax.

They are not just naming conventions.

---

# 50. `_balance` Is Not Truly Private

Example:

```js
class Account {
  // Step 1:
  constructor() {
    this._balance =
      100;
  }
}

// Step 2:
const account =
  new Account();

// Step 3:
console.log(
  account._balance
); // Output: 100
```

Output:

```text
100
```

Leading underscore means:

```text
"please treat this as internal"
```

It does not enforce privacy.

---

# 51. `#balance` Is Actually Private 🔥🔥🔥

```text
_balance
→ naming convention only

#balance
→ language-enforced private field
```

This distinction is interview-worthy.

---

# 52. Private Methods — Awareness

Modern JavaScript also supports private methods.

```js
class Employee {
  // Step 1:
  #formatName(
    name
  ) {
    return name.trim();
  }

  // Step 2:
  createLabel(
    name
  ) {
    return this.#formatName(
      name
    );
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.createLabel(
    "  Rahul  "
  )
); // Output: Rahul
```

Output:

```text
Rahul
```

---

# 53. Class Expressions — Awareness

A class can also be assigned to a variable.

```js
const Employee =
  class {
    // Step 1:
    show() {
      return "Hello";
    }
  };

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee.show()
); // Output: Hello
```

Output:

```text
Hello
```

Most code uses class declarations.

---

# 54. Class Declarations Are in TDZ 🔥🔥

Classes behave like lexical declarations regarding early access.

Example concept:

```js
try {
  // Step 1:
  const employee =
    new Employee();
} catch (
  error
) {
  // Step 2:
  console.log(
    error.name
  ); // Output: ReferenceError
}

// Step 3:
class Employee {
}
```

Output:

```text
ReferenceError
```

Do not use the class before its declaration executes.

---

# 55. Classes Are Not Hoisted Like Function Declarations

Function declaration:

```text
can often be called before declaration
```

Class declaration:

```text
binding exists
but is in TDZ before declaration
```

So:

```text
class behaves closer to let/const
for early access
```

---

# 56. Class Inheritance + Method Override + `super` 🔥🔥🔥

```js
class Person {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  describe() {
    return (
      `Person: ${this.name}`
    );
  }
}

class Employee
  extends Person {
  // Step 3:
  constructor(
    name,
    role
  ) {
    super(
      name
    );

    this.role =
      role;
  }

  // Step 4:
  describe() {
    const parent =
      super.describe();

    return (
      `${parent}, Role: ${this.role}`
    );
  }
}

// Step 5:
const employee =
  new Employee(
    "Rahul",
    "Developer"
  );

// Step 6:
console.log(
  employee.describe()
);
// Output:
// Person: Rahul, Role: Developer
```

Output:

```text
Person: Rahul, Role: Developer
```

---

# 57. Static Method Inheritance 🔥🔥

Static methods can also be inherited by child classes.

```js
class Person {
  // Step 1:
  static category() {
    return "Human";
  }
}

class Employee
  extends Person {
}

// Step 2:
console.log(
  Employee.category()
); // Output: Human
```

Output:

```text
Human
```

---

# 58. Static Method `this` 🔥🔥

Inside a static method, `this` can refer to the class used for the call.

```js
class Employee {
  // Step 1:
  static company =
    "ABC";

  // Step 2:
  static getCompany() {
    return this.company;
  }
}

// Step 3:
console.log(
  Employee.getCompany()
); // Output: ABC
```

Output:

```text
ABC
```

---

# 59. Practical Example — Employee Class 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    id,
    name,
    salary
  ) {
    this.id =
      id;

    this.name =
      name;

    this.salary =
      salary;
  }

  // Step 2:
  increaseSalary(
    amount
  ) {
    this.salary +=
      amount;

    return this.salary;
  }

  // Step 3:
  getLabel() {
    return (
      `${this.id} - ${this.name}`
    );
  }
}

// Step 4:
const employee =
  new Employee(
    101,
    "Rahul",
    50000
  );

// Step 5:
console.log(
  employee.increaseSalary(
    5000
  )
); // Output: 55000

// Step 6:
console.log(
  employee.getLabel()
); // Output: 101 - Rahul
```

Output:

```text
55000
101 - Rahul
```

---

# 60. Practical Example — Manager Extends Employee 🔥🔥🔥

```js
class Employee {
  // Step 1:
  constructor(
    name,
    salary
  ) {
    this.name =
      name;

    this.salary =
      salary;
  }

  // Step 2:
  describe() {
    return (
      `${this.name} - ${this.salary}`
    );
  }
}

class Manager
  extends Employee {
  // Step 3:
  constructor(
    name,
    salary,
    teamSize
  ) {
    super(
      name,
      salary
    );

    this.teamSize =
      teamSize;
  }

  // Step 4:
  describe() {
    return (
      `${super.describe()} - Team: ${this.teamSize}`
    );
  }
}

// Step 5:
const manager =
  new Manager(
    "Rahul",
    80000,
    5
  );

// Step 6:
console.log(
  manager.describe()
);
// Output:
// Rahul - 80000 - Team: 5
```

Output:

```text
Rahul - 80000 - Team: 5
```

---

# 61. Interview Output 1 — Basic Class 🔥🔥🔥

```js
class User {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

// Step 2:
const user =
  new User(
    "Rahul"
  );

// Step 3:
console.log(
  user.name
);
```

Expected output:

```text
Rahul
```

---

# 62. Interview Output 2 — Shared Method

```js
class User {
  // Step 1:
  show() {
    return "Hello";
  }
}

// Step 2:
const a =
  new User();

// Step 3:
const b =
  new User();

// Step 4:
console.log(
  a.show
  ===
  b.show
);
```

Expected output:

```text
true
```

---

# 63. Interview Output 3 — Inheritance

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

class Employee
  extends Person {
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  employee.greet()
);
```

Expected output:

```text
Hello
```

---

# 64. Interview Output 4 — Override

```js
class Person {
  // Step 1:
  greet() {
    return "Person";
  }
}

class Employee
  extends Person {
  // Step 2:
  greet() {
    return "Employee";
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
);
```

Expected output:

```text
Employee
```

---

# 65. Interview Output 5 — `super.method()`

```js
class Person {
  // Step 1:
  greet() {
    return "Hello";
  }
}

class Employee
  extends Person {
  // Step 2:
  greet() {
    return (
      `${super.greet()} Rahul`
    );
  }
}

// Step 3:
const employee =
  new Employee();

// Step 4:
console.log(
  employee.greet()
);
```

Expected output:

```text
Hello Rahul
```

---

# 66. Interview Output 6 — Static

```js
class Employee {
  // Step 1:
  static company() {
    return "ABC";
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  Employee.company()
); // Output: ABC

// Step 4:
console.log(
  typeof employee.company
); // Output: undefined
```

Expected output:

```text
ABC
undefined
```

---

# 67. Interview Output 7 — Getter

```js
class User {
  // Step 1:
  constructor(
    first,
    last
  ) {
    this.first =
      first;

    this.last =
      last;
  }

  // Step 2:
  get fullName() {
    return (
      `${this.first} ${this.last}`
    );
  }
}

// Step 3:
const user =
  new User(
    "Rahul",
    "Mishra"
  );

// Step 4:
console.log(
  user.fullName
);
```

Expected output:

```text
Rahul Mishra
```

---

# 68. Interview Output 8 — Lost `this`

```js
class User {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  show() {
    return this.name;
  }
}

// Step 3:
const user =
  new User(
    "Rahul"
  );

// Step 4:
const fn =
  user.show;

try {
  // Step 5:
  console.log(
    fn()
  );
} catch (
  error
) {
  // Step 6:
  console.log(
    error.name
  );
}
```

Expected output:

```text
TypeError
```

---

# 69. Interview Question — Are Classes Different From Prototypes? 🔥🔥🔥

Good answer:

```text
JavaScript classes are mainly
a cleaner syntax over
prototype-based object creation
and inheritance.

Instance methods are still stored
on the class prototype.
```

---

# 70. Interview Question — What Does `extends` Do?

Good answer:

```text
extends creates an inheritance relationship
between classes.

The child class can reuse
methods from the parent class,
and the prototype chains are linked.
```

---

# 71. Interview Question — What Does `super()` Do?

Good answer:

```text
super() calls the parent class constructor.

In a derived class constructor,
super() must run before using this.
```

---

# 72. Interview Question — `super()` vs `super.method()` 🔥🔥🔥

Good answer:

```text
super(...)
→ calls parent constructor

super.method()
→ calls parent implementation
of that method
```

---

# 73. Interview Question — Static vs Instance Method

Good answer:

```text
An instance method is called
on an object created from the class.

A static method is called
on the class itself.

Example:

employee.getName()
→ instance method

Employee.create()
→ static method
```

---

# 74. Interview Question — Getter vs Normal Method

Good answer:

```text
A getter is defined like a method
but accessed like a property.

getter:
employee.fullName

normal method:
employee.getFullName()
```

---

# 75. Interview Question — What Are Private Fields?

Good answer:

```text
Private fields use # syntax.

They can only be accessed
from inside the class body.

Example:
#balance
```

---

# 76. Debugging — Forgetting `new` With Class 🔥🔥🔥

Wrong:

```js
class Employee {
  // Step 1:
}

try {
  // Step 2:
  Employee();
} catch (
  error
) {
  // Step 3:
  console.log(
    error.name
  ); // Output: TypeError
}
```

Output:

```text
TypeError
```

Correct:

```js
// Step 1:
const employee =
  new Employee();
```

---

# 77. Debugging — Forgetting `super()` 🔥🔥🔥

Derived class with a custom constructor:

```js
class Person {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }
}

class Employee
  extends Person {
  // Step 2:
  constructor(
    name
  ) {
    // Step 3:
    // Missing super(name)
    // makes using this invalid.
  }
}
```

Practical rule:

```text
extends + constructor
→ call super(...)
before this
```

---

# 78. Debugging — Calling Static Method on Instance

Wrong:

```js
class Employee {
  // Step 1:
  static company() {
    return "ABC";
  }
}

// Step 2:
const employee =
  new Employee();

// Step 3:
console.log(
  typeof employee.company
); // Output: undefined
```

Correct:

```js
// Step 1:
console.log(
  Employee.company()
); // Output: ABC
```

---

# 79. Debugging — Detached Class Method

Problem:

```text
const fn = employee.showName;
fn();
```

The receiver is lost.

Fix options:

```text
employee.showName.bind(employee)

or

arrow class field
when that trade-off is appropriate
```

---

# 80. Classes Decision Guide 🔥🔥🔥

```text
Need reusable object blueprint?
→ class

Need instance-specific data?
→ constructor / class fields

Need shared behavior?
→ normal class method

Need inheritance?
→ extends

Need parent constructor?
→ super(...)

Need parent method?
→ super.method()

Need class-level utility?
→ static

Need computed property-like access?
→ getter

Need controlled assignment?
→ setter

Need true class-private state?
→ #privateField

Need method to stay bound when detached?
→ bind() or arrow field pattern
```

---

# 81. Final Master Trace 🔥🔥🔥

```js
class Person {
  // Step 1:
  constructor(
    name
  ) {
    this.name =
      name;
  }

  // Step 2:
  greet() {
    return (
      `Hello ${this.name}`
    );
  }

  // Step 3:
  static category() {
    return "Person";
  }
}

class Employee
  extends Person {
  // Step 4:
  #salary;

  // Step 5:
  constructor(
    name,
    role,
    salary
  ) {
    super(
      name
    );

    this.role =
      role;

    this.#salary =
      salary;
  }

  // Step 6:
  get salary() {
    return this.#salary;
  }

  // Step 7:
  describe() {
    return (
      `${super.greet()} - ${this.role}`
    );
  }
}

// Step 8:
const employee =
  new Employee(
    "Rahul",
    "Developer",
    50000
  );

// Step 9:
console.log(
  employee.describe()
);
// Output:
// Hello Rahul - Developer

// Step 10:
console.log(
  employee.salary
); // Output: 50000

// Step 11:
console.log(
  Employee.category()
); // Output: Person

// Step 12:
console.log(
  employee
  instanceof
  Employee
); // Output: true

// Step 13:
console.log(
  employee
  instanceof
  Person
); // Output: true
```

Output:

```text
Hello Rahul - Developer
50000
Person
true
true
```

Complete mental model:

```text
new Employee(...)
↓
Employee constructor starts
↓
super(name)
↓
Person constructor runs
↓
this.name created
↓
back to Employee constructor
↓
this.role created
#salary created
↓
instance returned
```

Prototype chain:

```text
employee
↓
Employee.prototype
↓
Person.prototype
↓
Object.prototype
↓
null
```

Method lookup:

```text
employee.describe()
↓
Employee.prototype.describe
```

Inside:

```text
super.greet()
↓
Person.prototype.greet
↓
this is still employee
```

---

# Quick Memory 🧠🔥🔥🔥

## Class

```text
clean syntax
for constructor + prototype methods
```

## Constructor

```text
constructor(...)
→ runs during new
→ initializes instance data
```

## Instance Method

```text
method() { ... }
→ stored on Class.prototype
→ shared
```

## `extends`

```text
Child extends Parent
→ prototype inheritance
```

## `super()`

```text
calls parent constructor
```

## `super.method()`

```text
calls parent method
```

## Static

```text
static method()
→ belongs to class

Class.method()
```

## Getter

```text
get value()
→ accessed as obj.value
```

## Setter

```text
set value(x)
→ triggered by obj.value = x
```

## Private Field

```text
#value
→ accessible only inside class
```

## Class Field

```text
field = value
→ own instance property
```

## Prototype Method

```text
shared between instances
```

## Arrow Class Field

```text
own function per instance
+
lexical this
```

## Most Important Interview Answer

```text
JavaScript classes are cleaner syntax
over prototype-based object creation
and inheritance.

The constructor initializes instance data,
normal class methods are shared
through the prototype,
extends links inheritance,
and super accesses parent behavior.
```

---

# ✅ 7.11 Classes Complete

Completed in Section 7:

```text
7.1 Execution Model
7.2 Scope
7.3 Hoisting
7.4 TDZ
7.5 Closures
7.6 var vs let Loop Questions
7.7 this
7.8 call() / apply() / bind()
7.9 new Operator
7.10 Prototypes + Prototype Chain
7.11 Classes
```

Next topic:

```text
7.12 Strict Mode 🔥🔥🔥
├── "use strict"
├── Why Strict Mode Exists
├── Accidental Globals
├── this Behavior
├── Duplicate Parameters
├── Silent Errors
├── Modules / Classes Awareness
└── Interview Output Questions
```

**Next: 7.12 Strict Mode 🔥🔥🔥**
