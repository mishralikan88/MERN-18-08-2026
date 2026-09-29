# Episode 5 : Shortest JS Program, window & this keyword

* The shortest JS program is an empty file. Even in this case, JS engine does a lot of things. It creates the GEC which has memory phase and the code execution phase.

* The JavaScript engine creates something known as the window object, which serves as the global object in a browser. It contains numerous functions and variables that can be accessed from anywhere in the program. The JavaScript engine also creates the this keyword, which, at the global level, refers to the window object. In summary, along with the Global Execution Context (GEC), a global object (window) and the this keyword are created.

* In different JavaScript engines, the name of the global object varies. In browsers, it is called window, while in Node.js, it has a different name. At the global level, the this keyword refers to the global object.

* If a variable is declared in the global scope, it becomes a property of the global object.

eg:
```js
var x = 10;
console.log(x); // 10
console.log(this.x); // 10
console.log(window.x); // 10
```

<hr>

Watch Live On Youtube below:

<a href="https://www.youtube.com/watch?v=QCRpVw2KXf8&ab_channel=AkshaySaini" target="_blank"><img src="https://img.youtube.com/vi/QCRpVw2KXf8/0.jpg" width="750"
alt="Shortest JS Program, window & this keyword Youtube Link"/></a>