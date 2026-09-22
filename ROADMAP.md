Reference -




🚀 MERN FULL-STACK PRACTICAL MASTER ROADMAP
GOAL
│
├── Understand Client Requirement
├── Break Requirement into Features
├── Design UI
├── Design Database
├── Design APIs
├── Build Frontend
├── Build Backend
├── Integrate Database
├── Authentication & Authorization
├── Testing
├── Security
├── Debugging
├── Deployment
├── Monitoring
└── Maintain Production Application


#### PHASE 1 — FULL-STACK BASICS & PROJECT SETUP

1. HOW A WEB APPLICATION WORKS 
   ├── Frontend → Backend → Database           ✅
   ├── Request & Response                      ✅
   ├── HTTP                                    ✅
   ├── HTTP Methods                            ✅
   ├── CRUD                                    ✅
   ├── URL + API + Endpoint                    ✅
   ├── Request Parts                           ✅
   │   ├── Method
   │   ├── URL
   │   ├── Headers
   │   ├── Body
   │   └── Payload
   ├── JSON                                    ✅
   ├── HTTP Status Codes                       ✅
   │   ├── 200 / 201
   │   ├── 400
   │   ├── 401
   │   ├── 403
   │   ├── 404
   │   └── 500
   ├── Route Params vs Query Params            ✅
   ├── REST / RESTful APIs                     ✅
   ├── Frontend vs Backend Validation          ✅
   ├── Business Logic                          ✅
   ├── Authentication vs Authorization         ✅
   ├── Cookies / localStorage / sessionStorage ✅
   ├── CORS                                    ✅
   ├── HTTP vs HTTPS + DNS                     ✅
   ├── Node / Express / MongoDB roles          ✅
   ├── TypeScript / Tailwind roles             ✅
   └── Requirement → Technical Breakdown       ✅


2. DEVELOPMENT SETUP                                      ✅

├── 2.1 Node + npm                                       ✅
│   ├── What is Node.js?                                 ✅
│   ├── JavaScript runtime                               ✅
│   ├── What is npm?                                     ✅
│   ├── Packages                                         ✅
│   ├── Dependencies                                     ✅
│   ├── package.json                                     ✅
│   ├── package-lock.json                                ✅
│   ├── node_modules                                     ✅
│   └── npm install                                      ✅
│
├── 2.2 React + TypeScript + Vite                        ✅
│   ├── React's role in the project                      ✅
│   ├── TypeScript's role                                ✅
│   ├── What is Vite?                                    ✅
│   ├── Vite development server                          ✅
│   ├── Client project structure                         ✅
│   ├── src folder                                       ✅
│   ├── main.tsx                                         ✅
│   ├── App.tsx                                          ✅
│   ├── index.html                                       ✅
│   ├── vite.config.ts                                   ✅
│   └── tsconfig files                                   ✅
│
├── 2.3 Express + TypeScript                             ✅
│   ├── What is Express?                                 ✅
│   ├── Node.js vs Express                               ✅
│   ├── Creating Express application                     ✅
│   ├── app.listen()                                     ✅
│   ├── PORT                                             ✅
│   ├── Routes                                           ✅
│   ├── req / res                                        ✅
│   ├── Middleware                                       ✅
│   ├── app.use()                                        ✅
│   ├── express.json()                                   ✅
│   └── TypeScript on the backend                        ✅
│
├── 2.4 Git + GitHub                                     ✅
│   ├── Git vs GitHub                                    ✅
│   ├── Repository                                       ✅
│   ├── git init                                         ✅
│   ├── git status                                       ✅
│   ├── git add                                          ✅
│   ├── git commit                                       ✅
│   ├── git push                                         ✅
│   └── .gitignore                                       ✅
│
├── 2.5 React → Express                                  ✅
│   ├── Client and server run separately                 ✅
│   ├── Client port vs server port                       ✅
│   ├── API_URL                                          ✅
│   ├── fetch()                                          ✅
│   ├── Sending HTTP request                             ✅
│   ├── Receiving HTTP response                          ✅
│   ├── res.json()                                       ✅
│   └── React → HTTP → Express flow                      ✅
│
├── 2.6 CORS                                             ✅
│   ├── Why CORS is required                             ✅
│   ├── Origin                                           ✅
│   ├── localhost:5173 vs localhost:5000                 ✅
│   ├── cors package                                     ✅
│   └── app.use(cors())                                  ✅
│
├── 2.7 Environment Variables                            ✅
│   ├── What is an environment variable?                 ✅
│   ├── .env file                                        ✅
│   ├── Why we use .env                                  ✅
│   ├── PORT                                             ✅
│   ├── MONGO_URI                                        ✅
│   ├── Why secrets shouldn't be hardcoded               ✅
│   ├── dotenv package                                   ✅
│   ├── dotenv.config()                                  ✅
│   ├── process.env                                      ✅
│   ├── process.env.PORT                                 ✅
│   ├── process.env.MONGO_URI                            ✅
│   ├── `as string`                                      ✅
│   ├── .env + .gitignore                                ✅
│   └── Why .env should not be pushed to GitHub          ✅
│
├── 2.8 MongoDB Atlas + Mongoose                         ✅
│   ├── MongoDB's role                                   ✅
│   ├── What is MongoDB Atlas?                           ✅
│   ├── Local database vs cloud database                 ✅
│   ├── Atlas project / deployment                       ✅
│   ├── Database user                                    ✅
│   ├── Database username + password                     ✅
│   ├── Network access                                   ✅
│   ├── IP access                                        ✅
│   ├── Connection string / URI                          ✅
│   ├── What is Mongoose?                                ✅
│   └── MongoDB vs Mongoose                              ✅
│
├── 2.9 Database Connection                              ✅
│   ├── mongoose.connect()                               ✅
│   ├── MONGO_URI                                        ✅
│   ├── Connection Promise                               ✅
│   ├── .then()                                          ✅
│   ├── .catch()                                         ✅
│   ├── Successful connection                            ✅
│   ├── Failed connection                                ✅
│   ├── app.listen() after DB connection                 ✅
│   └── Complete database connection flow                ✅
│
├── 2.10 Employee Model                                  ✅
│   ├── What is a Schema?                                ✅
│   ├── What is a Model?                                 ✅
│   ├── Schema vs Model                                  ✅
│   ├── IEmployee interface                              ✅
│   ├── Schema<IEmployee>                                ✅
│   ├── String fields                                    ✅
│   ├── Number fields                                    ✅
│   ├── required: true                                   ✅
│   ├── unique: true                                     ✅
│   ├── timestamps: true                                 ✅
│   ├── _id                                              ✅
│   ├── createdAt / updatedAt                            ✅
│   └── model<IEmployee>()                               ✅
│
├── 2.11 POST /api/employees                             ✅
│   ├── app.post()                                       ✅
│   ├── /api/employees                                   ✅
│   ├── Request object — req                             ✅
│   ├── Response object — res                            ✅
│   ├── req.body                                         ✅
│   ├── express.json() → req.body                        ✅
│   ├── async route handler                              ✅
│   ├── await                                            ✅
│   ├── try / catch                                      ✅
│   ├── Employee.create()                                ✅
│   ├── res.status()                                     ✅
│   ├── 201 Created                                      ✅
│   └── 400 error response                               ✅
│
├── 2.12 Save Employee to MongoDB                        ✅
│   ├── Form data                                        ✅
│   ├── JSON.stringify()                                 ✅
│   ├── JSON request body                                ✅
│   ├── Express receives request                         ✅
│   ├── express.json() parses JSON                       ✅
│   ├── req.body                                         ✅
│   ├── Employee.create(req.body)                        ✅
│   ├── Mongoose validates against Schema                ✅
│   ├── MongoDB document                                 ✅
│   ├── MongoDB saves employee                           ✅
│   └── Created employee returned                        ✅
│
├── 2.13 GET Employees from MongoDB                      ✅
│   ├── app.get()                                        ✅
│   ├── GET /api/employees                               ✅
│   ├── Employee.find()                                  ✅
│   ├── await Employee.find()                            ✅
│   ├── Employee array                                   ✅
│   ├── res.status(200)                                  ✅
│   ├── res.json()                                       ✅
│   ├── try / catch                                      ✅
│   └── 500 server error                                 ✅
│
├── 2.14 Show Employees in React                         ✅
│   ├── Employee TypeScript interface                    ✅
│   ├── useState<Employee[]>()                           ✅
│   ├── API_URL                                          ✅
│   ├── fetchEmployees()                                 ✅
│   ├── fetch()                                          ✅
│   ├── await fetch()                                    ✅
│   ├── res.json()                                       ✅
│   ├── setEmployees()                                   ✅
│   ├── useEffect()                                      ✅
│   ├── Empty dependency array []                        ✅
│   ├── employees.map()                                  ✅
│   ├── key={emp._id}                                    ✅
│   ├── FormData                                         ✅
│   ├── form.get()                                       ✅
│   ├── Number()                                         ✅
│   ├── handleSubmit()                                   ✅
│   ├── preventDefault()                                 ✅
│   ├── Content-Type: application/json                   ✅
│   ├── JSON.stringify()                                 ✅
│   ├── form.reset()                                     ✅
│   └── fetchEmployees() after POST                      ✅
│
└── 2.15 Full React → API → MongoDB Flow                 ✅
    ├── User fills employee form                         ✅
    ├── React collects form values                       ✅
    ├── handleSubmit()                                   ✅
    ├── POST /api/employees                              ✅
    ├── Headers + JSON payload                           ✅
    ├── Express receives request                         ✅
    ├── express.json() parses body                       ✅
    ├── req.body created                                 ✅
    ├── Employee.create()                                ✅
    ├── Mongoose Schema + Model                          ✅
    ├── MongoDB Atlas stores document                    ✅
    ├── Express returns 201                              ✅
    ├── React calls fetchEmployees()                     ✅
    ├── GET /api/employees                               ✅
    ├── Employee.find()                                  ✅
    ├── Express returns employee array                   ✅
    ├── setEmployees(data)                               ✅
    ├── React re-renders                                 ✅
    └── Employee appears on UI                           ✅


#### PHASE 2 — FRONTEND FOUNDATION

3. HTML — Practical Foundation
├── Semantic HTML
├── Document structure
├── Text & content
├── Links
├── Images
├── Forms
├── Labels & inputs
├── Buttons
├── Native validation
├── Tables
├── Accessibility
├── ARIA basics
└── SEO / Meta basics


PRACTICAL
├── Dashboard skeleton
├── Login form
├── Registration form
├── Contact form
├── Profile page
├── Employee form
├── Employee table
└── Complete dashboard
4. CSS
CORE
├── Box Model
├── Selectors
├── Specificity
├── Cascade
├── Units
├── Width / Height
└── Overflow


LAYOUT
├── Display
├── Position
├── Flexbox
├── Grid
├── z-index
└── Stacking Context


RESPONSIVE
├── Media Queries
├── Mobile First
├── Responsive Units
├── min() / max()
└── clamp()


UI
├── Typography
├── Borders
├── Shadows
├── Pseudo Selectors
├── Transitions
├── Transform
├── Animations
└── CSS Variables


PRACTICAL
├── Navbar
├── Sidebar
├── Login Page
├── Dashboard
├── Cards
├── Modal
├── Responsive Table
├── Responsive Form
└── Landing Page
5. Tailwind CSS
├── Setup
├── Utility Classes
├── Spacing
├── Sizing
├── Typography
├── Flex
├── Grid
├── Responsive Breakpoints
├── States
├── Dark Mode
├── Themes
└── Reusable Styling Patterns


PRACTICAL
└── Complete responsive dashboard



#### PHASE 3 — JAVASCRIPT

# 6. JavaScript Core 🔥🔥🔥

```text
6. JAVASCRIPT CORE

VARIABLES
├── var / let / const
├── Declaration
├── Initialization
├── Assignment
├── Reassignment
├── Redeclaration
├── Scope Differences
├── Hoisting Basics
└── TDZ Basics


DATA TYPES
├── Primitive Types
│   ├── string
│   ├── number
│   ├── boolean
│   ├── undefined
│   ├── null
│   ├── bigint
│   └── symbol
├── Reference Types
│   ├── Object
│   ├── Array
│   └── Function
├── typeof
├── instanceof
├── Array.isArray()
├── null vs undefined
├── NaN
└── Number.isNaN()


TYPE CONVERSION / COERCION
├── Explicit Conversion
├── Implicit Coercion
├── String()
├── Number()
├── Boolean()
├── parseInt()
├── parseFloat()
├── Truthy / Falsy
├── == vs ===
├── != vs !==
├── + Operator Coercion
└── Output Questions


OPERATORS
├── Arithmetic
├── Assignment
├── Comparison
├── Logical
├── Unary
├── Increment / Decrement
├── Ternary
├── typeof
├── instanceof
├── in
├── Optional Chaining ?.
├── Nullish Coalescing ??
├── Logical Assignment
│   ├── ||=
│   ├── &&=
│   └── ??=
└── Short-Circuit Evaluation


CONDITIONS
├── if
├── else
├── else if
├── switch
├── Ternary
├── Nested Conditions
└── Guard Clauses


LOOPS
├── for
├── while
├── do...while
├── for...of
├── for...in
├── break
├── continue
└── Nested Loops


FUNCTIONS
├── Function Declaration
├── Function Expression
├── Arrow Function
├── Parameters / Arguments
├── Default Parameters
├── Rest Parameters
├── Return
├── Callback Function
├── Higher-Order Function
├── First-Class Functions
├── Anonymous Functions
├── Pure / Impure Functions
├── IIFE
├── Recursion
└── Function Scope


ARRAYS

BASICS
├── Creating Arrays
├── Accessing / Updating Values
├── length
├── Array.isArray()
└── Iteration

ADD / REMOVE
├── push()
├── pop()
├── shift()
├── unshift()
└── splice()

COPY / EXTRACT
├── slice()
├── Spread [...]
├── Array.from()
└── Array.of()

SEARCH
├── includes()
├── indexOf()
├── lastIndexOf()
├── find()
└── findIndex()

ITERATION / TRANSFORMATION
├── forEach()
├── map() 🔥🔥🔥
├── filter() 🔥🔥🔥
├── reduce() 🔥🔥🔥
├── reduceRight() Awareness
├── some()
└── every()

SORTING
├── sort() 🔥🔥
├── Numeric Sorting
├── String Sorting
├── Object Sorting
├── Ascending / Descending
└── toSorted() Awareness

OTHER METHODS
├── concat()
├── join()
├── reverse()
├── flat()
├── flatMap()
├── fill()
└── at()


ARRAY PRACTICAL 🔥🔥🔥
├── Remove Duplicates
├── Find Duplicates
├── Frequency Counting
├── Group Data
├── Sort API Data
├── Filter API Data
├── Search Data
├── Pagination Data
├── Calculate Totals
├── Merge Arrays
├── Flatten Arrays
├── Chunk Arrays
├── Find Min / Max
├── Nested Array Transformations
└── Array ↔ Object Transformations



OBJECTS
├── Object Creation
├── Dot / Bracket Notation
├── Dynamic Properties
├── Add / Update / Delete
├── Nested Objects
├── Computed Properties
├── Property Shorthand
├── Method Shorthand
├── Object.keys()
├── Object.values()
├── Object.entries()
├── Object.fromEntries()
├── Object.assign()
├── Object.hasOwn()
├── Object.create()
├── Object.freeze()
├── Object.seal()
├── Mutation vs Immutability
├── Shallow Copy
├── Deep Copy Basics
├── structuredClone()
└── Optional Chaining


OBJECT PRACTICAL 🔥🔥🔥
├── Merge Objects
├── Update Nested Objects
├── Remove Properties
├── Dynamic Property Access
├── Object ↔ Array
├── Group Records
├── Index Data by ID
├── Count Property Values
└── Normalize API Data


DESTRUCTURING
├── Array Destructuring
├── Object Destructuring
├── Nested Destructuring
├── Default Values
├── Renaming
├── Rest with Destructuring
└── Function Parameter Destructuring


SPREAD / REST
├── Array Spread
├── Object Spread
├── Rest Parameters
├── Copying
├── Merging
└── Practical Usage


STRINGS
├── String Creation
├── Template Literals
├── length
├── Character Access
├── charAt()
├── at()
├── includes()
├── indexOf()
├── lastIndexOf()
├── slice()
├── substring()
├── split()
├── replace()
├── replaceAll()
├── trim()
├── trimStart()
├── trimEnd()
├── startsWith()
├── endsWith()
├── toUpperCase()
├── toLowerCase()
├── repeat()
├── concat()
└── String Immutability


STRING PRACTICAL
├── Reverse String
├── Reverse Words
├── Palindrome
├── Character Frequency
├── Word Frequency
├── Remove Duplicates
├── Capitalize Words
├── Search / Highlight
├── URL Processing
├── Email Parsing
├── Slug Generation
└── Form Input Cleanup


DATES
├── Date / new Date()
├── Date.now()
├── getTime()
├── Date Getters
├── Date Setters Awareness
├── Date Comparison
├── Date Difference
├── Sorting by Date
├── ISO Dates
└── Formatting Basics


DATE PRACTICAL
├── Days Between Dates
├── Expiry Check
├── Age Calculation
├── Latest / Oldest Sorting
└── API Date Formatting


SETS
├── new Set()
├── add()
├── has()
├── delete()
├── clear()
├── size
├── Iteration
├── Set ↔ Array
└── Duplicate Removal


MAPS
├── new Map()
├── set()
├── get()
├── has()
├── delete()
├── clear()
├── size
├── keys()
├── values()
├── entries()
├── Iteration
├── Map vs Object
└── Frequency Map Usage


JSON
├── JSON vs JavaScript Object
├── JSON.stringify()
├── JSON.parse()
├── Nested JSON
└── API Response Handling


MODULES
├── import
├── export
├── export default
├── Named Export
├── Default Export
├── Import Alias
└── Named vs Default Export


REGEX — PRACTICAL BASICS
├── Basic Syntax
├── Character Classes
├── Anchors
├── Quantifiers
├── Flags
├── test()
├── match()
├── replace()
└── Common Validation / Search


ERROR HANDLING
├── Error Object
├── throw
├── try
├── catch
├── finally
└── Custom Errors Basics


CORE PRACTICAL 🔥🔥🔥  

# >>

├── 50+ Selective JS Problems
├── Array Problems
├── Object Problems
├── String Problems
├── Frequency Problems
├── Grouping Problems
├── Sorting / Search Problems
├── Nested Data Problems
├── Real API Transformations
├── Output Questions
├── Debugging Problems
├── Refactoring Problems
└── Explain Code While Coding
```

# 7. JavaScript Internals 🔥🔥🔥

```text
7. JAVASCRIPT INTERNALS

EXECUTION
├── JavaScript Execution Model
├── Execution Context 🔥🔥🔥
│   ├── Global Execution Context
│   ├── Function Execution Context
│   ├── Creation Phase
│   └── Execution Phase
└── Call Stack 🔥🔥🔥


SCOPE
├── Global Scope
├── Function Scope
├── Block Scope
├── Lexical Scope
├── Scope Chain
└── Variable Lookup


HOISTING
├── var
├── let
├── const
├── Function Declaration
├── Function Expression
├── Arrow Function
└── Output Questions


TEMPORAL DEAD ZONE
├── TDZ Meaning
├── let
├── const
├── TDZ Start / End
└── Output Questions


CLOSURES 🔥🔥🔥
├── Closure Mental Model
├── Lexical Environment
├── Data Persistence
├── Private State
├── Function Factory
├── Callbacks
├── Event Handlers
├── Timers
├── Loops
└── Practical Closure Problems


VAR / LET LOOP QUESTIONS 🔥🔥
├── var + setTimeout
├── let + setTimeout
├── Closure Solution
└── Output Prediction


THIS 🔥🔥🔥
├── Global Context
├── Regular Function
├── Object Method
├── Nested Function
├── Arrow Function
├── Constructor Function
├── Class Method
├── Event Handler Awareness
├── Explicit Binding
├── Lost this Context
└── Fixing this


CALL / APPLY / BIND
├── call()
├── apply()
├── bind()
├── Differences
├── Function Borrowing
└── Practical Usage


NEW OPERATOR
├── Constructor Functions
├── What new Does Internally
├── Object Creation
├── this Binding
├── Prototype Linking
└── Return Behaviour


PROTOTYPES
├── prototype
├── __proto__ Awareness
├── Prototype Chain
├── Property Lookup
├── Object.create()
├── Constructor Functions
├── Prototype Methods
└── Inheritance Basics


CLASSES
├── class
├── constructor
├── Instance Methods
├── extends
├── super
├── Static Methods
├── Getters / Setters Awareness
└── Private Fields Awareness


STRICT MODE
├── "use strict"
└── Important Behaviour Differences


REFERENCE BEHAVIOUR
├── Primitive vs Reference Values
├── Pass-by-Value Mental Model
├── Object Reference Behaviour
├── Mutation
├── Immutability
├── Shallow Copy
├── Deep Copy
├── Spread Limitations
├── Object.assign() Limitations
└── structuredClone()


EQUALITY
├── Primitive Equality
├── Reference Equality
├── == vs ===
├── Object.is()
├── NaN Cases
└── instanceof


MEMORY BASICS
├── Stack / Heap Mental Model
├── Primitive vs Reference Memory
├── Garbage Collection
├── Reachability
├── Unreachable Objects
└── Memory Leak Awareness


COMMON MEMORY LEAKS
├── Forgotten Timers
├── Event Listeners
├── Closures Holding References
├── Global Variables
└── Large Cached Objects


INTERNALS PRACTICAL 🔥🔥🔥
├── Output Prediction
├── Scope Questions
├── Hoisting / TDZ Questions
├── Closure Questions
├── var / let Loop Questions
├── this Questions
├── call / apply / bind Questions
├── new Operator Questions
├── Prototype Questions
├── Mutation / Reference Questions
├── Shallow vs Deep Copy Problems
├── Debugging Questions
└── Explain Execution Step-by-Step
```

# 8. Async JavaScript 🔥🔥🔥

```text
8. ASYNC JAVASCRIPT

FOUNDATION
├── Sync vs Async
├── JavaScript Single Thread
├── How JS Handles Async Work
├── Call Stack
├── Web APIs
├── Event Loop 🔥🔥🔥
├── Microtask Queue 🔥🔥🔥
├── Task / Macrotask Queue
├── Microtask Priority
└── Execution Order


TIMERS
├── setTimeout()
├── clearTimeout()
├── setInterval()
├── clearInterval()
├── Zero-Delay Behaviour
└── Timer Output Questions


CALLBACKS
├── Callback
├── Sync Callback
├── Async Callback
├── Error-First Callback Awareness
├── Nested Callbacks
└── Callback Hell


PROMISES 🔥🔥🔥
├── Promise
├── Creating Promise
├── Promise Executor
├── resolve()
├── reject()
├── Pending / Fulfilled / Rejected
├── Promise.resolve()
├── Promise.reject()
├── then()
├── catch()
├── finally()
├── Returning Values from then()
├── Returning Promises from then()
├── Promise Chaining
├── Promise Return Rules
├── Error Propagation
├── Throwing Inside then()
├── Recovering in catch()
├── finally() Behaviour Awareness
├── Promise Hell
└── Promise Output Questions


ASYNC / AWAIT 🔥🔥🔥
├── async
├── await
├── What async Returns
├── What await Does
├── Rejected Promises
├── try / catch / finally
├── Sequential Await
├── Parallel Execution 🔥🔥🔥
├── await in Loops
├── Common Performance Mistakes
└── async/await vs Promise Chains


FETCH / HTTP 🔥🔥🔥
├── fetch()
├── Request
├── Response
├── JSON
├── response.json()
├── GET
├── POST
├── PUT
├── PATCH
├── DELETE
├── Headers
├── Content-Type
├── Request Body
├── Query Parameters
├── HTTP Errors
├── response.ok
├── response.status
├── Network Error vs HTTP Error
├── AbortController
└── Request Cancellation


REAL API PRACTICAL 🔥🔥🔥
├── Fetch List
├── Fetch by ID
├── Create Record
├── Update Record
├── Delete Record
├── Loading State Logic
├── Error Handling
├── Empty State
├── Retry Failed API
├── Parallel API Calls
├── Sequential API Calls
├── Cancel Search Requests
└── Transform API Responses


PROMISE COMBINATORS
├── Promise.all() 🔥🔥🔥
├── Promise.allSettled()
├── Promise.race()
├── Promise.any()
├── Failure Behaviour
└── When to Use Which


ASYNC ITERATION
├── for...of + await
├── Promise.all() + map()
├── Why forEach + await Is Problematic
├── Sequential Processing
└── Parallel Processing


ASYNC ERROR HANDLING
├── catch()
├── try/catch
├── throw
├── Error Propagation
├── Partial Failure
├── Retry Strategies
└── finally Cleanup


RACE CONDITIONS
├── Multiple Requests
├── Stale Response Problem
├── Search Request Race
├── Request Cancellation
└── Latest Request Wins Pattern


ASYNC PRACTICAL 🔥🔥🔥
├── Execution-Order Problems
├── Timer + Promise Output
├── Microtask vs Task
├── Nested Promise Questions
├── async/await Output Questions
├── Sequential vs Parallel Problems
├── Multiple API Calls
├── Debug Async Code
├── API Failure Handling
├── Retry Failed Request
├── Timeout Request
├── Cancel Request
├── Race-Condition Problems
└── Explain Event Loop While Coding
```

# 9. Advanced Practical JavaScript 🔥🔥🔥

```text
9. ADVANCED PRACTICAL JAVASCRIPT

FUNCTION PATTERNS

DEBOUNCE 🔥🔥🔥
├── Concept
├── Implementation
├── Search Input
├── API Search
└── Leading / Trailing Awareness


THROTTLE 🔥🔥🔥
├── Concept
├── Implementation
├── Scroll
├── Resize
└── Repeated Click Prevention


CURRYING
├── Basic Currying
├── Multiple Arguments
├── Infinite Currying Awareness
└── Practical Usage


MEMOIZATION
├── Cache
├── Arguments → Result
├── Implementation
└── Practical Usage


FUNCTION COMPOSITION
├── compose()
├── pipe()
└── Transformation Pipeline


ONCE
├── once()
├── Prevent Repeated Execution
└── Implementation


RETRY
├── retry()
├── Retry Count
├── Delay
├── Promise Retry
└── API Retry


ARRAY POLYFILLS 🔥🔥🔥
├── myForEach()
├── myMap()
├── myFilter()
├── myReduce()
├── myFind()
├── mySome()
└── myEvery()


FUNCTION POLYFILL AWARENESS
├── custom call()
├── custom apply()
└── custom bind()


BUILD UTILITIES 🔥🔥🔥
├── flatten()
├── flattenDepth()
├── groupBy()
├── chunk()
├── unique()
├── deepClone()
├── deepEqual()
├── deepGet()
├── deepSet()
├── debounce()
├── throttle()
├── curry()
├── memoize()
├── once()
├── retry()
├── compose()
└── pipe()


DATA TRANSFORMATION 🔥🔥🔥
├── Array → Object
├── Object → Array
├── Group by Property
├── Index by ID
├── Frequency Map
├── Deduplicate Objects
├── Merge API Results
├── Sort Nested Records
├── Filter Nested Records
├── Flatten Nested Response
├── Tree → Flat
├── Flat → Tree
├── Parent / Child Mapping
└── Normalize API Response


MACHINE-CODING UTILITIES 🔥🔥🔥
├── Search
├── Filter
├── Sort
├── Pagination
├── Infinite Scroll Logic
├── Debounced Search
├── Form Validation
├── Dynamic Filters
├── Multi-Column Sorting
├── Selected Items Logic
├── Toggle Selection
├── Select All
├── Pagination Calculations
├── Cache API Response
└── Request Deduplication Awareness


PROMISE IMPLEMENTATIONS 🔥🔥
├── Custom Promise.all()
├── Custom Promise.allSettled()
├── Custom Promise.race()
└── Custom Promise.any()


EVENT SYSTEM 🔥🔥
└── EventEmitter
    ├── on()
    ├── emit()
    ├── off()
    └── once()


STRING UTILITIES
├── Capitalize
├── camelCase
├── kebab-case
├── snake_case
├── Slugify
├── Truncate
└── Highlight Search Text


DOM / BROWSER PRACTICAL
├── DOM Selection
├── Event Handling
├── Event Object
├── preventDefault()
├── Event Bubbling
├── Event Capturing Awareness
├── Event Delegation 🔥🔥
├── localStorage
├── sessionStorage
├── JSON Storage
├── Storage CRUD
└── Browser Timers


ADVANCED AWARENESS — LOW PRIORITY
├── WeakMap
├── WeakSet
├── Symbol
├── Iterators
├── Generators
├── Symbol.iterator
├── Property Descriptors
├── Object.defineProperty()
├── Proxy
└── Reflect


FINAL INTERVIEW PRACTICAL 🔥🔥🔥
├── Coding Problems
├── Output Prediction
├── Debugging
├── Code Refactoring
├── Array / Object / String Problems
├── Frequency Problems
├── Data Transformations
├── Nested Data Problems
├── Polyfills
├── Closure Problems
├── this Problems
├── Promise Problems
├── Event Loop Problems
├── Async Problems
├── Real API Problems
├── Error Handling Problems
├── Performance Problems
├── Edge Cases
├── Explain While Coding
└── Timed No-AI Practice
```


#### PHASE 4 — TYPESCRIPT

10. TypeScript for Full-Stack Development
CORE
├── Types
├── Type Inference
├── Functions
├── Arrays
├── Objects
├── Tuples
├── Enums
├── Union
├── Intersection
├── Literal Types
├── Type vs Interface
├── Optional Properties
├── readonly
└── Function Types


TYPE SAFETY
├── Type Guards
├── Narrowing
└── Discriminated Unions


ADVANCED
├── Generics
├── Generic Constraints
├── keyof
├── typeof
├── Indexed Access
├── Mapped Types
├── Conditional Types
└── infer


UTILITY TYPES
├── Partial
├── Required
├── Pick
├── Omit
├── Record
├── Exclude
├── Extract
├── ReturnType
└── Parameters


PRODUCTION TYPESCRIPT
├── API Response Typing
├── DTOs
├── Error Types
├── React Typing
├── Express Typing
├── Environment Typing
└── Generic Reusable Models


PRACTICAL
└── Convert/build application using strict TypeScript



PHASE 5 — REACT

11. React Core
├── JSX
├── Components
├── Props
├── State
├── Events
├── Lists
├── Keys
├── Conditional Rendering
├── Forms
├── Controlled vs Uncontrolled
├── Lifting State
└── Composition


PRACTICAL
└── 15–20 React components
12. React Hooks
├── useState
├── useEffect
├── useRef
├── useContext
├── useReducer
├── useMemo
├── useCallback
├── useLayoutEffect
├── useImperativeHandle
├── useId
├── useTransition
├── useDeferredValue
└── Custom Hooks

13. React Router
├── Routing
├── Dynamic Routes
├── Nested Routes
├── Layouts
├── Query Parameters
├── Protected Routes
├── Role-Based Routes
├── Lazy Routes
└── 404

14. Forms & Validation
├── React Forms
├── React Hook Form
├── Schema Validation
├── Reusable Inputs
├── Dynamic Forms
├── Server Errors
└── File Inputs

15. State Management
STATE TYPES
├── Local
├── Global
├── Server
├── Form
└── URL


CONTEXT
├── Context
├── Provider
└── Performance


REDUX TOOLKIT
├── Store
├── Slice
├── Actions
├── Reducers
├── Selectors
├── Middleware
└── Async Thunks


RTK QUERY
├── Queries
├── Mutations
├── Cache
├── Invalidation
└── Optimistic Updates

16. React Architecture & Performance
├── Feature-Based Architecture
├── Reusable Components
├── Custom Hooks
├── API Layer
├── Separation of Concerns
├── Error Boundaries
├── Loading / Error / Empty States
├── Re-rendering
├── React.memo
├── useMemo / useCallback
├── Lazy Loading
├── Code Splitting
├── Virtualization
└── Profiling

PHASE 6 — FRONTEND MACHINE CODING
17. Machine Coding
BASIC
├── Todo
├── Accordion
├── Tabs
├── Modal
├── Star Rating
├── Progress Bar
├── Stopwatch
└── OTP


INTERMEDIATE
├── Autocomplete
├── Debounced Search
├── Carousel
├── Pagination
├── Toast
├── Dropdown
├── Multi-Select
├── Stepper
└── Shopping Cart


ADVANCED
├── Data Table
├── Infinite Scroll
├── Nested Comments
├── File Explorer
├── Nested Checkboxes
├── Dynamic Forms
├── Drag & Drop
├── Kanban
├── Calendar
├── Chat UI
├── Form Builder
└── Virtualized List


TARGET → 40+ problems
PHASE 7 — BACKEND
18. Node.js
├── Node Runtime
├── V8 Basics
├── CommonJS / ESM
├── Event Loop
├── Async I/O
├── Events
├── fs / path
├── Buffer
├── Streams
├── Process
├── Errors
├── Memory
├── Worker Threads Basics
└── Graceful Shutdown
19. Express.js
├── Server Setup
├── Routing
├── Middleware
├── Controllers
├── Services
├── Repository Layer
├── Validation
├── Async Errors
├── Central Error Handling
├── Configuration
└── Logging


Route
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
20. REST API Design
├── GET / POST / PUT / PATCH / DELETE
├── Status Codes
├── Params
├── Query
├── Body
├── DTOs
├── Validation
├── Pagination
├── Sorting
├── Filtering
├── Searching
├── Error Responses
├── API Versioning
├── Idempotency
└── Swagger / OpenAPI
20B. Backend Machine Coding / LLD

This is one of the important additions from the second roadmap.

FOUNDATIONS
├── OOP / OOD
├── SOLID
├── Clean Class Boundaries
└── Extensible Design


DESIGN PATTERNS
├── Factory
├── Strategy
├── Observer
├── Singleton
├── Decorator
├── State
└── Builder


MACHINE CODING
├── Rate Limiter
├── LRU Cache
├── Parking Lot
├── Tic-Tac-Toe
├── Snake & Ladder
├── Splitwise
├── Elevator System
├── In-Memory Pub/Sub
├── BookMyShow-Lite
├── Notification System
└── In-Memory Transactional DB


TARGET
└── Solve within 60–90 minutes
PHASE 8 — DATABASE
21. MongoDB + Mongoose
MONGODB
├── Database / Collection / Document
├── CRUD
├── Query Operators
├── Projection
├── Updates
├── Sorting
└── Pagination


DATA MODELING
├── Embedding
├── Referencing
├── Relationships
├── One-to-One
├── One-to-Many
├── Many-to-Many
└── Denormalization


MONGOOSE
├── Schema
├── Model
├── Validation
├── Middleware
├── Virtuals
├── Populate
└── Timestamps


ADVANCED
├── Indexes
├── Compound Indexes
├── Aggregation
├── Transactions
├── explain()
├── Query Optimization
├── Replication Concepts
└── Sharding Concepts
PHASE 9 — REAL FULL-STACK DEVELOPMENT
22. Authentication & Authorization
Register
 ↓
Email Verification
 ↓
Login
 ↓
Access Token
 ↓
Refresh Token
 ↓
Protected Routes
 ↓
Roles / Permissions
 ↓
Forgot Password
 ↓
Reset Password
 ↓
Logout


├── Password Hashing
├── JWT
├── Cookies
├── Session Concepts
├── Authentication
├── Authorization
├── RBAC
└── Refresh Rotation
23. Common Freelance Features
├── CRUD
├── Search
├── Filters
├── Sorting
├── Pagination
├── File Upload
├── Image Upload
├── Email
├── Notifications
├── CSV Import / Export
├── PDF Generation
├── Audit Logs
├── Soft Delete
├── Scheduled Tasks
├── Background Jobs
└── Third-Party APIs
24. Realtime + Advanced Backend
WEBSOCKETS
├── WebSockets
├── Socket.IO
├── Rooms
├── Events
├── Reconnection
├── Presence
├── Notifications
└── Chat


REDIS
├── Caching
├── TTL
├── Cache Invalidation
├── Rate Limiting
└── Pub/Sub


BACKGROUND JOBS
├── Queue
├── Worker
├── Retry
├── Scheduling
└── Failed Jobs
25. Payments & Third-Party Integrations
├── Payment Flow
├── Orders
├── Payment Verification
├── Webhooks
├── Refund Concepts
├── Idempotency
├── OAuth
├── External APIs
├── API Failure Handling
└── Retry
PHASE 10 — TESTING + SECURITY
26. Testing
FRONTEND
├── Unit Testing
├── React Testing Library
├── Component Tests
├── Mocks
└── API Mocks


BACKEND
├── Unit Tests
├── Integration Tests
├── Supertest
├── Database Tests
└── Authentication Tests


E2E
├── Playwright / Cypress
└── Critical User Flows
27. Security
├── XSS
├── CSRF
├── CORS
├── Injection
├── NoSQL Injection
├── Broken Authorization
├── Brute Force
├── Secure Cookies
├── Secure Headers
├── Rate Limiting
├── Input Validation
├── Secret Management
└── Upload Security
PHASE 11 — PRODUCTION
28. Docker + Deployment
DOCKER
├── Images
├── Containers
├── Dockerfile
├── Volumes
├── Networks
├── Docker Compose
└── Multi-Stage Builds


DEPLOYMENT
├── Development
├── Staging
├── Production
├── Environment Variables
├── Build
├── Domain
├── DNS
├── HTTPS
├── Reverse Proxy / Nginx
└── Cloud Deployment


CI/CD
├── GitHub Actions
├── Lint
├── Test
├── Build
├── Deploy
└── Rollback
29. Production Monitoring & Maintenance
├── Logging
├── Request IDs
├── Error Tracking
├── Health Checks
├── Monitoring
├── Performance
├── Backups
├── Restore
├── Dependency Updates
├── Production Bugs
├── Rollback
└── Incident Handling
PHASE 12 — MASTER FULL-STACK PROJECT
30. WorkForge — Production SaaS
├── Registration / Login
├── RBAC
├── Users
├── Teams
├── Clients
├── Projects
├── Tasks
├── Subtasks
├── Kanban
├── Drag & Drop
├── Comments
├── Attachments
├── Search
├── Filters
├── Pagination
├── Notifications
├── Realtime Chat
├── Dashboard
├── Charts
├── Time Tracking
├── Estimates
├── Invoices
└── Audit Logs


PRODUCTION LAYER
├── Testing
├── Security
├── Redis
├── Caching
├── Queues
├── Docker
├── CI/CD
├── Deployment
├── Logging
├── Monitoring
├── Backups
└── Documentation
PHASE 13 — INDEPENDENT FULL-STACK PROJECTS
PROJECT 1 — WorkForge
└── High Guidance


PROJECT 2 — Appointment Booking
└── Medium Guidance


PROJECT 3 — Recruitment System
└── Low Guidance


PROJECT 4 — Ecommerce
└── Review Only


PROJECT 5 — UNKNOWN CLIENT PROJECT
└── Completely Independent

Final independent flow:

Requirement Gathering
        ↓
Clarification
        ↓
Feature Breakdown
        ↓
Estimation
        ↓
Architecture
        ↓
Database Design
        ↓
API Design
        ↓
UI Design
        ↓
Frontend
        ↓
Backend
        ↓
Integration
        ↓
Testing
        ↓
Security
        ↓
Deployment
        ↓
Monitoring
        ↓
Documentation
        ↓
Handover
PHASE 14 — INTERVIEW PREPARATION
31. JavaScript + TypeScript Interview
├── Coding
├── Output Questions
├── Debugging
├── Async
├── Polyfills
└── Practical Problems
32. React Interview
├── Hooks
├── Coding
├── Architecture
├── State Management
├── Performance
└── Debugging
33. Backend Interview
├── Node
├── Express
├── MongoDB
├── API Design
├── Authentication
├── Security
├── Performance
└── Coding
34A. Backend System Design / HLD
CONCEPTS
├── Scaling
├── Load Balancing
├── Caching
├── Redis
├── Queues
├── CDN
├── Database Scaling
├── WebSockets
├── Object Storage
├── Monolith vs Microservices
└── Observability


DESIGN
├── Ecommerce
├── Booking Platform
├── Chat System
├── Project Management System
├── Notification System
├── File Storage
└── Dashboard
34B. Frontend System Design

This was another important addition in the consolidated roadmap.

├── Large-Scale Component Architecture
├── Design Systems
├── Shared Component Libraries
├── State Architecture
├── Micro-Frontends
├── Module Federation Concepts
├── Monorepo vs Polyrepo
├── Bundling Strategy
├── Code Splitting Strategy
├── CSR / SSR / SSG / ISR
├── Core Web Vitals
├── Performance Budgets
├── Browser/CDN Caching
├── Large-Scale API Layer
├── Offline Support
├── Accessibility at Scale
└── i18n Architecture
35. DSA
DATA STRUCTURES
├── Arrays
├── Strings
├── Map / Set
├── Stack
├── Queue
├── Linked List
├── Trees
├── Heap
└── Graph Basics


PATTERNS
├── Two Pointers
├── Sliding Window
├── Frequency Map
├── Prefix Sum
├── Binary Search
├── Recursion
├── Backtracking
├── BFS / DFS
├── Intervals
└── Top K


TARGET → ~150 selected problems
35B. Behavioral / Leadership

The consolidated syllabus explicitly adds this as a separate senior-level interview track.

├── STAR Format
├── Tell Me About Yourself
├── Conflict Resolution
├── Technical Leadership
├── Failure / Learning
├── Mentoring
├── End-to-End Ownership
├── Disagreement / Decision Making
├── Handling Ambiguity
├── Cross-Team Collaboration
├── Project Storytelling
└── Questions for Interviewer


TARGET
└── 6–8 strong real stories
35C. HR + Offer Negotiation
├── Expected CTC
├── Salary Negotiation
├── Fixed vs Variable
├── ESOP Basics
├── Why Are You Leaving?
├── Notice Period
├── Joining Date
├── Background Verification
├── Other Offers Question
├── Culture-Fit Questions
└── Offer Red Flags
36. FINAL MOCK INTERVIEW
ROUND 1  → JavaScript
ROUND 2  → TypeScript
ROUND 3  → React
ROUND 4  → Frontend Machine Coding
ROUND 5  → Backend LLD / Machine Coding
ROUND 6  → Node + Express
ROUND 7  → MongoDB
ROUND 8  → Full-Stack Coding
ROUND 9  → Debugging
ROUND 10 → Backend System Design
ROUND 11 → Frontend System Design
ROUND 12 → Project Deep Dive
ROUND 13 → Senior-Level Questions
ROUND 14 → Behavioral / Leadership
ROUND 15 → HR / Offer Negotiation


NO AI
NO HINTS
REAL TIME LIMIT
PHASE 15 — FREELANCING
37. Freelance Project Handling
├── Finding Projects
├── Reading Job Requirements
├── Discovery Calls
├── Asking Client Questions
├── Requirement Documents
├── Scope
├── MVP
├── Estimation
├── Milestones
├── Proposal
├── Pricing
├── Git Workflow
├── Client Updates
├── Demo
├── Change Requests
├── Scope Creep
├── Bug Handling
├── Production Support
├── Documentation
├── Handover
└── Maintenance
🏁 FINAL ROADMAP
PHASE 1   Full-Stack Basics + Setup              
   ↓
PHASE 2   HTML + CSS + Tailwind
   ↓
PHASE 3   JavaScript
   ↓
PHASE 4   TypeScript
   ↓
PHASE 5   React
   ↓
PHASE 6   Frontend Machine Coding
   ↓
PHASE 7   Node + Express + REST + Backend LLD
   ↓
PHASE 8   MongoDB + Mongoose
   ↓
PHASE 9   Real Full-Stack Features
   ↓
PHASE 10  Testing + Security
   ↓
PHASE 11  Docker + Deployment + Production
   ↓
PHASE 12  WorkForge Production SaaS
   ↓
PHASE 13  Independent Projects
   ↓
PHASE 14  Interview + DSA + System Design
           + Behavioral + HR
   ↓
PHASE 15  Freelancing
   ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       INDEPENDENT MERN DEVELOPER
       + SENIOR INTERVIEW READY
       + FREELANCE PROJECT READY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is the single roadmap I would use going forward. It combines the original detailed practical syllabus with the missing senior-level tracks from the second syllabus, without creating separate duplicate learning tracks. The learning rule also stays 20% explanation → 80% coding, progressing from short notes to small code, coding task, real feature, interview questions, and finally doing it without help.

And Topics 1 and 2 stay locked exactly as you gave them.