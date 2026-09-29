// console.log(xyz) // ReferenceError: xyz is not defined.  
// This error occurs because 'xyz' has never been declared in the program.  
// console.log(a) // ReferenceError: Cannot access 'a' before initialization.  
// 'a' is declared with let, so it is hoisted but remains in the Temporal Dead Zone (TDZ) until it is initialized.  
// console.log(b)  
// Prints 'undefined' due to var hoisting. 'b' is hoisted with an initial value of undefined.  
// let a = 10;  
// var b = 15; 

// ====== let vs const vs var - Difference 1 - Declaration Without Initialization =====

// let allows declaration without initialization
// let a;  
// a = 30;  
// console.log(a); // 30  
// const must be initialized at the time of declaration
// const a;  
// a = 30;  
// console.log(a); // SyntaxError: Missing initializer in const declaration  
// var also allows declaration without initialization  
// var a;  
// a = 35;  
// console.log(a); // 35  

// ====== let vs const vs var - Difference 2 - Reassignment  =====

// let allows reassignment
// let a = 20;  
// a = 30; // No error, value is updated  
// console.log(a); // 30  
// const does not allow reassignment after initialization  
// const a = 20;  
// a = 30; // TypeError: Assignment to constant variable  
// console.log(a);  
// var also allows reassignment  
// var a = 20;  
// a = 30; // No error, value is updated  
// console.log(a); // 30  

// ====== let vs const vs var - difference 3 - Redeclaration in the Same Scope  =====

// let does not allow redeclaration in the same scope
// let a = 20;  
// let a = 30; // SyntaxError: Cannot redeclare block-scoped variable 'a'  
// const also does not allow redeclaration in the same scope
// const a = 20;  
// const a = 30; // SyntaxError: Cannot redeclare block-scoped variable 'a'  
// var allows redeclaration within the same scope
// var a = 20;  
// var a = 30; // No error, the value is overwritten  
// console.log(a); // Output: 30  


// Strictness level - const > let > var