// if (true) {
//     var a = 10;
//     let b = 20;
//     const c = 30;
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }

// if (true) {
//     var a = 10;
//     let b = 20;
//     const c = 30;
//     console.log(c)
// }
// console.log(a)
// console.log(b)
// console.log(window.b)

// console.log(x) // ❌ ReferenceError: x is not defined (x does not exist in any scope)
// console.log(window.x) // ✅ undefined (x is not declared, but accessing it via `window` does not throw an error)


// var-var shadowing

// var a = 10
// {
//     var a = 20
//     var b = 30
//     console.log("a inside block", a)
// }

// console.log("a outside block ", a) // global scoped 'a' is manipulated.

// var a = 10
// {
//     a = 20
//     var b = 30
//     console.log("a inside block", a)
// }

// console.log("a outside block", a) // global scoped 'a' is manipulated.



// let-let shadowing


// let a = 10; // ✅ 'a' is declared in the script (global) scope

// {
// let a = 20; // ✅ 'a' is declared in a new block scope (separate from global 'a')
// var b = 30; // ✅ 'b' is declared with var (which does NOT respect block scope)
// console.log("a inside block", a); // 20 (accessing block-scoped 'a')
// }

// console.log("a outside block", a)

// let a = 10; // ✅ 'a' is declared in the script (global) scope
// {
//     a = 20; // ✅ This modifies the existing script-scoped 'a' (no new declaration)
//     var b = 30; // ✅ 'b' is declared with 'var' (which does NOT respect block scope)
//     console.log("a inside block", a); // 20
// }

// console.log("a outside block", a); // 20



// var-let shadowing

// var a = 10; // 🌍 Global-scoped 'a'
// {
//     let a = 20; // 🔲 Block-scoped 'a' (only exists inside this block)
//     var b = 30; // 🌍 Global-scoped 'b' (var ignores block scope)
//     console.log("a inside block", a); // 🖨️ 20 (block-scoped 'a' is accessed)
// }

// console.log("a outside block", a); // 🖨️ 10 (global 'a' remains unchanged)




// let a = 10  // 🔷 Script-scoped 'a' (declared using let)
// {
//     var a = 20  // 🌍 Global-scoped 'a' (declared using var, tries to redeclare 'a')
//     var b = 30
//     console.log("a inside block", a);
// }

// console.log("a outside block", a);

// ❌ Syntax Error: 'a' has already been declared.
// The compiler gets confused because `let a` (script-scoped) and `var a` (global-scoped) cannot coexist.
// JS throws an error upfront: "Identifier 'a' has already been declared."

// ❌ More redeclaration examples:

// var a = 10
// let a = 10
// console.log(a); 

// ❌ Syntax Error: 'a' has already been declared.


// let a = 10
// var a = 10
// console.log(a); 

// ❌ Syntax Error: 'a' has already been declared.

// 🔹 'let' restricts variable redeclaration in the same scope, while 'var' allows it.
// 🔹 This is why 'let' is stricter than 'var'.


// ✅ Bypassing let-var shadowing using a function (since 'var' is function-scoped):

// Meaning: If we declare a variable within a function, it is only accessible inside that function and not outside.

let a = 10;  // 🔷 Script-scoped 'a'

function x() {
    var a = 20;  // 🟠 Function-scoped 'a' (does not affect script-scoped 'a')
    console.log("a inside function", a); // 🖨️ 20 (accessing function-scoped 'a')
}
x();

console.log("a outside function", a); // 🖨️ 10 (script-scoped 'a' remains unchanged)

// ✅ Nested block:
// {
//     let x = 10; // Block scope variable
//     {
//       let y = 20; // Nested block scope variable
//       console.log(x); // ✅ Accessible (outer block variable)
//       console.log(y); // ✅ Accessible (same block)
//     }
//     console.log(x); // ✅ Accessible
//     console.log(y); // ❌ ReferenceError (not accessible outside inner block)
//   }
//   The inner block can access variables from the outer block.
//   The outer block cannot access variables declared inside the inner block. 

// Nested Blocks with if Statements
// {
//     let x = 10; // Block scope variable
//     {
//       let y = 20; // Nested block scope variable
//       console.log(x); // ✅ Accessible (outer block variable)
//       console.log(y); // ✅ Accessible (same block)
//     }
//     console.log(x); // ✅ Accessible
//     console.log(y); // ❌ ReferenceError (not accessible outside inner block)
//   }

// Variables declared inside an inner block (let or const) do not leak to the outer block.



// Nested Loops and Scope

// for (let i = 0; i < 2; i++) {
//     console.log(`Outer loop i: ${i}`);
//     for (let j = 0; j < 2; j++) {
//       console.log(`  Inner loop j: ${j}`);
//     }
//   }
// console.log(i); // ❌ ReferenceError (i is block-scoped)
// i and j are block-scoped to their respective loops.
// Each iteration of the outer loop creates a new scope for the inner loop.

// Nested Functions and Scope

// function outerFunction() {
//     let outerVar = "I'm outside!";
//     function innerFunction() {
//       let innerVar = "I'm inside!";
//       console.log(outerVar); // ✅ Accessible
//       console.log(innerVar); // ✅ Accessible
//     }
//     innerFunction();
//     // console.log(innerVar); // ❌ ReferenceError (not accessible)
//   }
//   outerFunction();

// Inner functions can access variables from their outer function.
// Outer functions cannot access variables from inner functions.


// Hoisting in Nested Blocks

// {
//     console.log(a); // ❌ ReferenceError (TDZ - Temporal Dead Zone)
//     let a = 5;
// }

// let and const declarations are hoisted but remain in the Temporal Dead Zone (TDZ) until they are initialized.

// Just like the scope chain follows specific rules for accessing variables within lexical environments, the same rules apply to nested block scopes. Variables declared in an inner block can access variables from their outer blocks, but outer blocks cannot access variables declared inside inner blocks.




// var a = 1; // a is in global scope 
// function foo() {
//   a = 10;  // a is in local scope . both a's are different
//   return;
//   function a() {}
// }
// foo();
// console.log(a); // 1 

// Function Hoisting
// In JavaScript, function declarations are hoisted to the top of their scope. This means that inside foo(), before any code executes, JavaScript moves the function a() to the top of the function's scope.
// So, internally, foo() gets interpreted like this:
// function foo() {
//   function a() {} // Hoisted function declaration
//   a = 10; // ⚠️ This is now modifying the local 'a' (which is a function), NOT the global 'a'!
//   return;
// }

// Why is a = 10; Not Global?
// Normally, if you write a = 10; without a var, let, or const, JavaScript assigns it to the global scope.
// However, in this case, the function declaration function a() {} creates a local a inside foo().
// Since a exists locally due to hoisting, a = 10; modifies this local a, NOT the global one.

// What Happens When We Run foo()?
// Hoisting happens:
// Inside foo(), function a() {} is hoisted to the top.
// Now, there is a local a (a function) inside foo().
// Assignment:
// a = 10; does not create a global a. Instead, it modifies the hoisted local a function.
// return executes, and foo() exits.
// The global a remains unchanged because foo() only modified its own local a.





const c = 100; // 'c' is declared in the global scope

function x() {
    const c = 10; // This 'c' is locally scoped to function 'x'
    console.log(c); // 10 → The function refers to its own local 'c', not the global one
}

x(); // Calls function 'x', printing 10

console.log(c); // 100 → The global 'c' remains unchanged since functions have their own scope