function replaceAnswers(firstSet, secondSet) {

    // Replace answers in the first set
    const data = firstSet.map((question, index) => {
        return {
            ...question,
            answer: secondSet[index].answer,
        };
    });

    return JSON.stringify(data);
}

const secondSet = [
    {
        "id": 1,
        "title": "Q1: What is the object type?",
        "answer": "The object type depends on the context in which it is used. For example, if the object is a student, the object type would be 'student'."
    },
    {
        "id": 2,
        "title": "Q2: Explain arrays in JavaScript",
        "answer": "Arrays in JavaScript are ordered lists of values that can be of any type, including strings, numbers, objects, and even other arrays. They are index-based, meaning that values are accessed using numerical indexes, starting from 0. Arrays are mutable, meaning that their elements can be changed. They can also be dynamically resized, as elements can be added or removed as needed. Arrays can also be used to store data of the same type in an organized fashion."
    },
    {
        "id": 3,
        "title": "Q3: What is typeof operator?",
        "answer": "The typeof operator is a JavaScript operator that returns the data type of its operand in the form of a string. It can be used to determine the type of a variable, a literal, an object, or any other value."
    },
    {
        "id": 4,
        "title": "Q4: Explain equality in JavaScript",
        "answer": "Equality in JavaScript is expressed through the double equals operator (==). This operator checks for weak equality and will attempt to convert values of different types in order to compare them. Weak equality will return true if two values are equal, even if they are of different types.For example, '5' == 5 would return true.If you want to check for strict equality, which requires both the type and value to be equal, then you would use the triple equals operator (===). This operator will return false if two values are not of the same type and/or have different values.For example, '5' === 5 would return false."
    },
    {
        "id": 5,
        "title": "Q5: What is Scope in JavaScript?",
        "answer": "Scope in JavaScript refers to the current context of execution. It determines the visibility of variables and functions defined in the code, as well as other aspects of the execution environment. Global scope is the top-level scope, which is created when the code is executed. Local scope is created when a function or block of code is executed. Variables and functions defined in the global scope are accessible from within any local scope, but variables and functions defined in a local scope are only accessible from within that scope."
    },
    {
        "id": 6,
        "title": "Q6: Explain what is Linear (Sequential) Search and when may we use one? JSPY ",
        "answer": "Linear (sequential) search is a method of searching for a particular item in a collection of items by checking each item in order one-by-one until the desired item is found. It is a simple and straightforward approach that can be used when the list of items is relatively small or when the items are already sorted. It is not an efficient search algorithm for large datasets as it requires a linear amount of time to search for an item."
    },
    {
        "id": 7,
        "title": "Q7: Explain Values and Types in JavaScript"
    },
    {
        "id": 8,
        "title": "Q8: What is let keyword in JavaScript?",
        "answer": "The let keyword is used to declare a block-scoped local variable. Variables declared using let are accessible only within the block they are defined in, unlike variables declared with the var keyword, which are accessible within the entire function."
    },
    {
        "id": 9,
        "title": "Q9: Explain what is Binary Search JSJavaPY",
        "answer": "Binary Search is a search algorithm used to locate an element within a sorted array. It works by comparing the target value to the middle element of the array. If the target value is greater than the middle element, the search continues in the upper half of the array. If the target value is less than the middle element, the search continues in the lower half of the array. This process is repeated until the target value is found or the array is exhausted. Binary Search is much faster than linear search as the array is halved with each iteration. Binary Search is commonly used in JavaScript, Java, and Python. "
    },
    {
        "id": 10,
        "title": "Q10: Explain the same-origin policy with regards to JavaScript.",
        "answer": "The same-origin policy is a security measure that restricts how a script hosted on one origin (a combination of the domain, protocol, and port of a URL) can interact with resources on a different origin. This policy helps to protect against malicious attacks and data theft by preventing a malicious script on one domain from accessing data on another domain. It also prevents a script from reading the response from a different origin, which could be used to exploit a vulnerability. This policy applies to all JavaScript code, regardless of whether it is embedded in a web page or downloaded from a server."
    },
    {
        "id": 12,
        "title": "Q12: Is there anyway to force using strict mode in Node.js?:",
        "answer": "Yes, it is possible to force the use of strict mode in Node.js. This can be done by adding the following line of code at the top of the Node.js file:'use strict';"
    },
    {
        "id": 13,
        "title": "Q13: Why would you use something like the load event?  Does this event have disadvantages? Do you know any alternatives, and why would you use those?:",
        "answer": "The load event is used to detect when a web page or resource has finished loading. It is one of the most widely used events in web development because it allows code to be executed as soon as the page is ready. The main disadvantage of the load event is that it can slow down page loading times if code is executed too early. Additionally, some browsers may not fire the event if the page is cached. Alternatives to the load event include the DOMContentLoaded event, which is fired when the document has been entirely loaded and parsed, and the readystatechange event, which is fired when the document's readyState changes. These events are preferable to the load event because they are fired earlier and can help to improve page loading times."
    },
    {
        "id": 14,
        "title": "Q14: What is strict mode?:",
        "answer": "Strict mode is a feature in ECMAScript 5 (ES5) that allows you to place a program, or a function, in a 'strict' operating context. This strict context prevents certain actions from being taken and throws more exceptions. Strict mode eliminates some JavaScript silent errors by changing them to throw errors. Strict mode also fixes mistakes that make it difficult for JavaScript engines to perform optimizations. Strict mode is declared by adding 'use strict'; to the beginning of a script or a function."
    },
    {
        "id": 15,
        "title": "Q15: What's the difference between Host objects and Native objects?:",
        "answer": "Host objects are provided by the host environment (such as the browser) and are not part of the JavaScript language. Native objects are built into the JavaScript language and are part of the JavaScript specification. Host objects may provide access to features that are not part of the JavaScript language and may have different behaviors than the native objects."
    },
    {
        "id": 16,
        "title": "Q16: What language constructions do you use for iterating over object properties and array items?:",
        "answer": "For iterating over object properties, the most common language constructions are for-in loops and Object.keys(). For iterating over array items, the most common language constructions are for loops, for-each loops, and array.forEach()."
    },
    {
        "id": 17,
        "title": "Q17: What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?:"
    },
    {
        "id": 18,
        "title": "Q18: Explain event bubbling and how one may prevent it:",
        "answer": "Event bubbling is a process by which the event is propagated from the targeted element to its parent elements, and then to its parent’s parent elements, and so on. In other words, it is the process of an event firing on the element it was intended for and then propagating up the DOM tree.One can prevent event bubbling by using the stopPropagation() method. This method prevents the event from bubbling up the DOM tree and prevents any parent handlers from being executed. This method is typically used when an event has already been handled by an element and there is no need for parent elements to handle it as well."
    },
    {
        "id": 19,
        "title": "Q19: What does use strict do?:",
        "answer": "Use strict is a keyword in JavaScript that enables strict mode, which is a way to write secure and more optimized code. Strict mode eliminates some JavaScript silent errors by changing them to throw errors. It also disables features that are potentially confusing and/or dangerous."
    },
    {
        "id": 20,
        "title": "Q20: Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?:",
        "answer": "It is important to leave the global scope of a website as-is for a number of reasons. For one, the global scope contains elements that are essential for the functioning of the entire website, such as global variables and functions. Altering or deleting these elements could lead to unexpected and potentially catastrophic results. Additionally, if you ever need to debug or update the website, having an unaltered global scope makes it easier to understand the structure of the website and pinpoint any problems."
    },
    {
        "id": 21,
        "title": "Q21: What is a Polyfill?:",
        "answer": "A polyfill is a piece of code (usually JavaScript) used to provide modern functionality on older browsers that do not natively support it. It essentially fills in the gap in functionality for older browsers by mimicking the expected behavior of modern browsers."
    },
    {
        "id": 22,
        "title": "Q22: Explain Null and Undefined in JavaScript:Null:",
        "answer": "Null is a special data type in JavaScript which can have only one value: null. It is explicitly used to represent an empty or non-existent value. Null is an assignment value which means nothing and it is not an object. It is a primitive value and is not an object.Undefined: Undefined is a special data type in JavaScript which can have only one value: undefined. It is used to indicate that a variable has not been assigned a value or that a property of an object does not have a value. It is a primitive value and is not an object."
    },
    {
        "id": 23,
        "title": "Q23: What's the difference between throw Error('msg') vs throw new Error('msg')?:",
        "answer": "The difference is that throw Error('msg') will throw a generic JavaScript error, while throw new Error('msg') will throw an instance of the JavaScript Error object, which provides more information about the error."
    },
    {
        "id": 24,
        "title": "Q24: What is Callback Hell and what is the main cause of it? :",
        "answer": "Callback Hell is a term used to describe a coding style in which callbacks or functions are nested within each other, leading to unreadable and hard-to-debug code. The main cause of Callback Hell is the use of callbacks to handle asynchronous programming, which can quickly lead to a 'pyramid' or 'spaghetti' code structure."
    },
    {
        "id": 25,
        "title": "Q25: Explain what is Interpolation Search JSPY :",
        "answer": "Interpolation Search is an algorithm used for searching for a given item in a sorted list by using the information about the relative location of the desired item. It works by dividing the search area into two parts based on the values of the item being searched for. The algorithm then uses linear interpolation to determine a more precise location of the item. This is an improvement over the Binary Search algorithm, which requires a more exhaustive search of the list. With Interpolation Search, the time complexity is O(log log n) in the average case, compared to O(log n) with Binary Search."
    },
    {
        "id": 26,
        "title": "Q26: What is IIFEs (Immediately Invoked Function Expressions)?:",
        "answer": "An immediately-invoked function expression (IIFE) is a JavaScript function that runs as soon as it is defined. It is often used to group related code, declare variables, or add functions to the global scope. IIFEs are defined using parentheses and an anonymous function, and are immediately executed or 'invoked' using another set of parentheses."
    },
    {
        "id": 27,
        "title": "Q27: What is Coercion in JavaScript?:",
        "answer": "Coercion in JavaScript is the process of converting a value from one type to another (such as a string to a number, an object to a string, or a boolean to a string). This is done implicitly (automatically) by JavaScript, and can sometimes lead to unexpected results if not taken into account."
    },
    {
        "id": 28,
        "title": "Q28: What is the difference between a shim and a polyfill?:",
        "answer": "A shim is a piece of code that adds a feature that is missing from a browser or environment. It is designed to bring a browser up to speed with the latest standards, but does not add any extra features. A polyfill is a piece of code that adds a feature to a browser or environment that is needed for a specific purpose. It is designed to add extra features that are not part of the current standards."
    },
    {
        "id": 29,
        "title": "Q29: What is a Jump (or Block) Search? JSJavaPY :",
        "answer": "A jump search, or block search, is a searching algorithm that works by jumping ahead a set number of elements at a time when searching for a specific value in an array or list. It is helpful for finding a specific element in an array or list without having to check every element. This type of search is most effective when the elements in the array or list are sorted."
    },
    {
        "id": 30,
        "title": "Q30: What is the definition of a Higher-Order Function?:",
        "answer": "A Higher-Order Function is a function that takes one or more functions as arguments, or returns a function as a result."
    },
    {
        "id": 31,
        "title": "Q31: What do you think of AMD vs CommonJS?:",
        "answer": "AMD (Asynchronous Module Definition) and CommonJS are both popular module systems used in JavaScript development. AMD is more focused on the browser while CommonJS is more focused on the server-side. AMD modules are loaded asynchronously, which can improve performance, but may be difficult to debug. CommonJS modules are synchronous and easier to debug, but can be less efficient in the browser. Ultimately, it depends on the specific need of the project which module system should be used."
    },
    {
        "id": 32,
        "title": "Q32: Explain the differences on the usage of foo between function foo() {} and var foo = function() {}:",
        "answer": "The main difference between the two is that the first one creates a named function called foo, and the second one creates an anonymous function assigned to a variable called foo.Function foo() {} creates a named function called foo and is invoked using the function name.var foo = function() {} creates an anonymous function assigned to a variable called foo and is invoked using the variable name."
    },
    {
        "id": 33,
        "title": "Q33: What is the drawback of creating true private in JavaScript?:",
        "answer": "The main drawback of creating true private variables in JavaScript is that it requires more effort to implement than using standard public variables. This added complexity can lead to more bugs and errors and can make the code more difficult to read and maintain. Additionally, true private variables cannot be accessed outside of the object they are declared in, which can limit the ability to extend and customize the object."
    },
    {
        "id": 34,
        "title": "Q34: What's the difference between .call and .apply?:",
        "answer": "The main difference between .call and .apply is the way in which arguments are passed to the function. With .call, the arguments are passed in as a list of arguments separated by commas, while with .apply, the arguments are passed in as an array. Additionally, .call allows you to directly specify the context in which the function will be called, while .apply sets the context to the first argument in the array."
    },
    {
        "id": 35,
        "title": "Q35: What is the preferred syntax for defining enums in JavaScript?:",
        "answer": "The preferred syntax for defining enums in JavaScript is the object literal syntax:enum MyEnum { VALUE_1 = 'value_1', VALUE_2 = 'value_2', VALUE_3 = 'value_3' }"
    },
    {
        "id": 36,
        "title": "Q36: Describe Closure concept in JavaScript as best as you could:",
        "answer": "A closure is a feature in JavaScript that allows a function to have access to its surrounding state or environment, even after the outer function has returned. This is achieved by creating a 'closure' around the inner function which preserves the variables and parameters from the outer function. Closures are useful for creating private variables, as the inner function has access to the variables within the closure, but the outer function does not. Closures are a powerful tool for creating complex and reusable code."
    },
    {
        "id": 37,
        "title": "Q37: Could you explain the difference between ES5 and ES6?:",
        "answer": "ES5 (ECMAScript 5) is the fifth version of the ECMAScript language specification. It was finalized in 2009 and is supported by most modern browsers. It includes features like Object-Oriented Programming, Anonymous Functions, and more.ES6 (ECMAScript 6) is the sixth version of the ECMAScript language specification. It was released in 2015 and is supported by all modern browsers. It includes features like Block-Level Scoping, Arrow Functions, Promises, Classes, Modules, and more."
    },
    {
        "id": 38,
        "title": "Q38: When should we use generators in ES6?:",
        "answer": "Generators can be used to pause and resume functions in ES6. Generators are useful for asynchronous programming, allowing us to pause a function until a promise is resolved and then resume the function after the promise is fulfilled. They are also useful for iterating over data structures such as arrays, objects, and maps."
    },
    {
        "id": 39,
        "title": "Q39: Explain Function.prototype.bind.:",
        "answer": "Function.prototype.bind is a method on all functions that allows you to create a new function with the same body and scope as the original function, but with some of the arguments already set. It can also be used to set the this keyword to a specific object. It is useful when you need to preserve the context of a function, or when you need to partially apply arguments to a function."
    },
    {
        "id": 40,
        "title": "Q40: What are the benefits of using spread syntax in ES6 and how is it different from rest syntax?:",
        "answer": "Spread syntax allows developers to expand an iterable collection of elements (such as an array or object) into individual elements. It is different from rest syntax in that rest syntax allows developers to collect elements into an array or object. With spread syntax, developers can take already existing elements and spread them out into individual elements. This allows developers to more easily add new elements to an array or object, or to combine multiple arrays or objects into one."
    },
    {
        "id": 41,
        "title": "Q41: When should I use Arrow Functions in ES6?:",
        "answer": "Arrow functions should be used when you need to write a function that has a concise syntax, such as when you're writing a callback function or an anonymous function. Arrow functions also work well when you need to preserve the context of the this keyword."
    },
    {
        "id": 42,
        "title": "Q42: Explain the difference between undefined and not defined in JavaScript?:",
        "answer": "Undefined is a variable that has been declared but has not yet been assigned a value. On the other hand, Not Defined is an error given when a variable is referenced that has not been declared."
    },
    {
        "id": 43,
        "title": "Q43: What are the advantages and disadvantages of using use strict?:"
    },
    {
        "id": 44,
        "title": "Q44: What is Currying?:",
        "answer": "Currying is a technique in functional programming in which a function is broken down into a series of functions that each take a single argument. It is named after the mathematician Haskell Curry. In essence, currying allows a function to be called with fewer arguments than it is defined with, by returning a new function that takes the remaining arguments."
    },
    {
        "id": 45,
        "title": "Q45: What are the differences between ES6 class and ES5 function constructors?:",
        "answer": "ES6 classes are syntactical sugar over the ES5 function constructors. The differences between the two are:1.    ES6 classes are easier to read and write as they use a class-based syntax with clear method definitions.2.  ES6 classes support inheritance and super calls, allowing for easier code reuse and better code organization.3. ES6 classes support a constructor function which can be used to create objects.4.   ES6 classes use the new keyword to create objects, while ES5 function constructors use the new operator.5.  ES6 classes don’t have the concept of a prototype chain, while ES5 function constructors do.6.  ES6 classes support static methods, while ES5 function constructors do not."
    },
    {
        "id": 46,
        "title": "Q46: Why should we use ES6 classes?:",
        "answer": "ES6 classes provide a much simpler and clear syntax to create objects and deal with inheritance. They also provide easier access to super class methods and properties, and they support prototype-based inheritance. By using classes, code becomes more organized and easier to maintain."
    },
    {
        "id": 47,
        "title": "Q47: Explain the difference between Object.freeze() vs const:",
        "answer": "Object.freeze() is a method used to prevent any modifications to an object, preventing properties from being added, removed or changed. It is a shallow freeze, meaning that while the object itself cannot be modified, any objects contained within the frozen object can still be changed.const is a keyword used to declare a constant variable. A constant variable's value cannot be changed or reassigned, however the object the variable is pointing to can still be modified. It is a deep freeze, so any objects contained within the constant variable cannot be changed."
    },
    {
        "id": 48,
        "title": "Q48: How to compare two objects in JavaScript?:",
        "answer": "You can use the JavaScript comparison operators (== and ===) to compare two objects. The == operator will compare the objects by their values, while the === operator will compare them by both their values and their types."
    },
    {
        "id": 50,
        "title": "Q50: What is a closure, and how/why would you use one?:",
        "answer": "A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function’s variables, and it has access to the global variables.Closures are used to create a private scope for a function, or to create a persistent scope which outlives the function call. A closure can be used to create a function within a function and maintain access to the variables from the outer scope. This is useful for creating functions that can be passed around and used in different parts of your code."
    },
    {
        "id": 52,
        "title": "Q52: What's a typical use case for anonymous functions?:",
        "answer": "Anonymous functions are often used as callback functions, which are functions that are passed as arguments to other functions. They can also be used as inline functions, which are functions that are defined and used within a single statement."
    },
    {
        "id": 53,
        "title": "Q53: Suggest one simple way of removing duplicates from an array using ES6:"
    },
    {
        "id": 54,
        "title": "Q54: What is generator in JS?:",
        "answer": "A generator in JavaScript is a function that can be paused and resumed at any time, allowing it to produce sequence of values, and potentially infinite sequences. It can be used to create iterators and asynchronous functions."
    },
    {
        "id": 55,
        "title": "Q55: What is the difference between document load event and document DOMContentLoaded event?:",
        "answer": "The document load event is fired when the whole page, including all dependent resources, such as images and stylesheets, are loaded. The document DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading."
    },
    {
        "id": 56,
        "title": "Q56: What's the difference between using let and var to declare a variable in ES6?:",
        "answer": "The main difference between let and var is the scope in which the variables are declared. Variables declared with var are scoped to the nearest function block, while variables declared with let are scoped to the nearest enclosing block, which can be smaller than a function block. Additionally, variables declared with let are not accessible before they are declared in their enclosing block. Lastly, variables declared with let can be reassigned, but cannot be redeclared in the same scope."
    },
    {
        "id": 57,
        "title": "Q57: What is the motivation for bringing Symbol to ES6?:",
        "answer": "Symbol was added to ES6 to provide developers with a way to create unique, immutable, and private property keys. It also serves as a primitive datatype that can be used in place of a string or number. Symbol can also be used to create iterators, which makes for better code readability and maintainability."
    },
    {
        "id": 58,
        "title": "Q58: Why is extending built-in JavaScript objects not a good idea?:",
        "answer": "Extending built-in JavaScript objects can lead to unexpected and inconsistent behavior, as other libraries and code may rely on the expected behavior of the built-in objects. Additionally, extending core objects can lead to compatibility issues when working with other libraries. Lastly, it is generally considered bad practice to modify the behavior of built-in JavaScript objects."
    },
    {
        "id": 59,
        "title": "Q59: What advantages are using arrow functions?:"
    },
    {
        "id": 60,
        "title": "Q60: What is the difference between Anonymous and Named functions?:",
        "answer": "Anonymous functions are those that are declared without a name, usually as part of a larger statement. These are often used as arguments to other functions. Named functions are those that are declared with a name and can be reused throughout a program. Named functions also allow for more structured code and better debugging."
    },
    {
        "id": 61,
        "title": "Q61: What is export default in JavaScript? :",
        "answer": "Export default in JavaScript is a special keyword that is used to export a single module or value from a script file. It is used to make objects, functions, and other values available for other scripts or modules to use. It is also used to set a default export in the script file which can be imported by other modules without having to specify the name of the exported entity."
    },
    {
        "id": 62,
        "title": "Q62: What is the new keyword in JavaScript?:",
        "answer": "The new keyword in JavaScript is used to create a new instance of an object. It is used as a constructor for objects, allowing you to create new objects with a specific set of parameters. The new keyword can also be used to create a shorthand way to call a constructor function, instead of having to type out the full function name."
    },
    {
        "id": 63,
        "title": "Q63: Explain Prototype Inheritance in JavaScript?:",
        "answer": "Prototype inheritance in JavaScript is a way of sharing properties and methods between different objects. Every object in JavaScript has a prototype. When an object is created, it will inherit all of the properties and methods from its prototype. This allows objects to share the same methods and properties, reducing code duplication and improving code readability. Additionally, prototype inheritance allows objects to be extended and customized with additional properties and methods, making it easy to create a variety of objects with the same base functionality."
    },
    {
        "id": 64,
        "title": "Q64: What does the term Transpiling stand for?:",
        "answer": "Transpiling is a term used to describe the process of converting code written in one programming language into another programming language. It is sometimes referred to as 'source-to-source compilation' because it involves translating code from one language into another language with a similar syntax."
    },
    {
        "id": 65,
        "title": "Q65: Can you give an example for destructuring an object or an array in ES6?:"
    },
    {
        "id": 66,
        "title": "Q66: Explain the Prototype Design Pattern:",
        "answer": "Prototype design pattern is a creational design pattern that is used to create objects by cloning an existing object. This pattern is used when the creation of a new object is expensive or complex. It provides a way to create a new object from an existing object without having to go through the complex process of creating a new one from scratch. This pattern is best suited for creating objects that have similar properties and behavior but different values."
    },
    {
        "id": 67,
        "title": "Q67: Describe the JS module design pattern:",
        "answer": "The JavaScript Module design pattern is a commonly used approach to organizing code into reusable chunks. The pattern focuses on breaking up code into individual files or modules that each perform a single, well-defined task. Each module is then responsible for its own state and any private methods and variables. This pattern helps to keep code organized and maintainable, and also encourages code reuse. It also allows for better separation of concerns and better scalability."
    },
    {
        "id": 68,
        "title": "Q68: Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?:",
        "answer": "The main difference between a .forEach loop and a .map() loop is that the .forEach loop does not return a new array, while the .map() loop does. The .forEach loop is used to iterate over an array and perform an action on each element, while the .map() loop is used to create a new array, based on the original array, by transforming each element and returning a new value."
    },
    {
        "id": 70,
        "title": "Q70: How can you share code between files?:",
        "answer": "You can share code between files by using a library, creating a module, or using a source code management system such as Git. Libraries can be used to store commonly used code snippets, while modules can be used to create reusable pieces of code that can be imported into multiple files. Source code management systems like Git allow you to store and share code between multiple files, allowing for collaboration and version control."
    },
    {
        "id": 71,
        "title": "Q71: What are the actual uses of ES6 WeakMap?:",
        "answer": "ES6 WeakMap objects are used to store key/value pairs in which the keys are objects and the values can be arbitrary values. WeakMap objects are particularly useful in situations where you want to associate objects with private state, as the keys are held weakly and are not enumerable. They can also be used for caching or memoization, as the entries will be automatically released from memory when the associated objects are no longer in use."
    },
    {
        "id": 72,
        "title": "Q72: Explain difference between: function Person(){}, var person = Person(), and var person = new Person()?:",
        "answer": "Function Person(){} is a function declaration that creates a function object. var person = Person() is a function invocation that calls the function and assigns the return value to the person variable. var person = new Person() is a constructor invocation that creates a new object and assigns it to the person variable. The newly created object inherits from the Person's prototype."
    },
    {
        "id": 73,
        "title": "Q73: Check if a given string is a isomorphic:",
        "answer": "Yes, a given string can be isomorphic. Isomorphic strings are strings that have the same characters but are rearranged differently. For example, 'add' and 'egg' are isomorphic strings."
    },
    {
        "id": 74,
        "title": "Q74: What is Hoisting in JavaScript?:",
        "answer": "Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. This means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local. This behavior allows variables to be used before they are declared, which can lead to unexpected behavior and bugs if not understood properly."
    },
    {
        "id": 75,
        "title": "Q75: When should you NOT use arrow functions in ES6? Name three or more cases.:"
    },
    {
        "id": 76,
        "title": "Q76: What's the difference between a variable that is: null, undefined or undeclared? How would you go about checking for any of these states?:",
        "answer": "Null is a value that is explicitly assigned to a variable that means it has no value. It is a representation of no value., Undefined is a value that is automatically assigned to a variable that has not been assigned a value yet. Undeclared is a variable that has not been declared in the program yet. To check for any of these states, you can use the typeof operator in JavaScript. The typeof operator will return 'undefined' for variables that are undefined or undeclared, and 'object' for variables that are null."
    },
    {
        "id": 77,
        "title": "Q77: What is the Temporal Dead Zone in ES6?:",
        "answer": "The Temporal Dead Zone (TDZ) is a mechanism in ECMAScript 6 (ES6) which prevents the use of a variable before it has been declared by the interpreter. This is designed to provide better control over the scope of variables and to ensure that variables are not accessed before they have been assigned a value."
    },
    {
        "id": 78,
        "title": "Q78: Explain how JSONP works (and how it's not really Ajax):",
        "answer": "JSONP (JSON with padding) is an unconventional technique used to bypass the same-origin policy enforced by modern browsers. It works by creating a 'script' tag and setting its src attribute to a URL that responds with a JavaScript file containing the JSON data. This 'script' tag is then inserted into the DOM of the requesting page. The request is not actually an Ajax request, but rather a regular HTTP request. This means that JSONP is not subject to the same-origin policy, which restricts Ajax requests to the same domain that the requesting page is on. JSONP also has a few drawbacks; for example, it can only be used to make GET requests and does not support headers or authentication. Additionally, the response data is not directly accessible from the JavaScript code, so it must be parsed from the script tag."
    },
    {
        "id": 79,
        "title": "Q79: Could you compare usage of Module Pattern vs Constructor/Prototype pattern?:",
        "answer": "The Module Pattern is a design pattern used to create a single global object with a set of private properties and methods. It is more flexible than the Constructor/Prototype pattern as it allows for multiple instances of the same object, and provides a way to safely encapsulate data and methods. The Constructor/Prototype pattern is a design pattern used to create objects with their own properties and methods, and to construct new objects that inherit from a prototype object. It is more rigid than the Module Pattern as it only allows for one instance of the object, but it does provide a more robust inheritance model."
    },
    {
        "id": 80,
        "title": "Q80: What tools can be used to assure consistent code style?:",
        "answer": "Answer: Commonly used tools to ensure consistent code style include code linters, code formatters, and code style checkers. Examples of these include ESLint, Prettier, and Stylelint."
    },
    {
        "id": 81,
        "title": "Q81: Does JavaScript have a map function to iterate over an object properties? :",
        "answer": "Yes, JavaScript has a map function which can be used to iterate over an object's properties."
    },
    {
        "id": 82,
        "title": "Q82: When would you use import * as X from 'X' ?  :",
        "answer": "You would use 'import * as X from 'X'' when you want to import all of the exports from a module and assign them to a single variable called X. This can be useful for simplifying the syntax of importing multiple named exports from the same module."
    },
    {
        "id": 84,
        "title": "Q84: What's the difference between ES6 Map and WeakMap?:",
        "answer": "The main difference between ES6 Map and WeakMap is that a WeakMap only holds objects as keys and does not have any methods for iteration, such as size and forEach. WeakMaps also have a garbage collection feature which allows them to automatically remove references to objects that are no longer in use. This makes them a better choice for storing objects that are not always needed and can be discarded. Maps on the other hand, can hold any type of value as a key and have methods for iteration."
    },
    {
        "id": 85,
        "title": "Q85: What is the difference between the await keyword and the yield keyword?:",
        "answer": "The await keyword is used to pause the execution of an async function and wait for the promise to be resolved. The yield keyword is used to pause the execution of a generator function and return a value to the caller."
    },
    {
        "id": 86,
        "title": "Q86: Compare Async/Await and Generators usage to achive same functionality:",
        "answer": "Both Async/Await and Generators can be used to achieve asynchronous programming in JavaScript."
    },
    {
        "id": 87,
        "title": "Q87: How to deep-freeze object in JavaScript?:",
        "answer": "You can't deep-freeze an object in JavaScript. However, you can use Object.freeze() to freeze the object at the root level. This prevents the object from being modified, but any child objects can still be modified."
    },
    {
        "id": 88,
        "title": "Q88: Is it possible to reset an ECMAScript 6 generator to its initial state?:",
        "answer": "Yes, it is possible to reset an ECMAScript 6 generator to its initial state. The generator can be reset by calling the generator's “reset” method. This method will reset the generator to its initial state and allow it to be called again."
    },
    {
        "id": 90,
        "title": "Q90: In JavaScript, why is the this operator inconsistent?:",
        "answer": "The this operator can be inconsistent in JavaScript because it depends on the context in which it is used. Depending on the context, the this operator can refer to different objects, such as the global object, the owner object, or even the HTML element that triggered the event."
    },
    {
        "id": 91,
        "title": "Q91: Can you give an example of a curry function and why this syntax offers an advantage?:",
        "answer": "A curry function is a function that takes a function with multiple parameters and returns a function with fewer parameters. The advantage of this syntax is that it allows us to create functions that are more specific to our needs, and to more easily compose functions together."
    },
    {
        "id": 92,
        "title": "Q92: Does JavaScript pass by references or pass by values?:",
        "answer": "JavaScript passes variables by value when primitive data types (booleans, numbers, strings, etc.) are involved. Variables are passed by reference when objects are involved."
    }
]


const firstSet = [
    {
        "id": "javascript-1",
        "title": "What is the object type?",
        "answer": "The object type depends on the context in which it is used. For example, if the object is a student, the object type would be 'student'.",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-2",
        "title": "Explain arrays in JavaScript",
        "answer": "Arrays in JavaScript are ordered lists of values that can be of any type, including strings, numbers, objects, and even other arrays. They are index-based, meaning that...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-3",
        "title": "What is typeof operator?",
        "answer": "The typeof operator is a JavaScript operator that returns the data type of its operand in the form of a string. It can be used to determine the type of a variable, a literal, an object, or any other value.",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-4",
        "title": "Explain equality in JavaScript",
        "answer": "Equality in JavaScript is expressed through the double equals operator (==). This operator checks... For example, '5' == 5 would return true.",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-5",
        "title": "What is Scope in JavaScript?",
        "answer": "Scope in JavaScript refers to the current context of execution. It determines the visibility of variables and functions defined in the code, as well as other aspects of the execution environment...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-6",
        "title": "Explain what is Linear (Sequential) Search and when may we use one? JSPY",
        "answer": "Linear (sequential) search is a method of searching for a particular item in a collection of items by checking each item in order one-by-one until the desired item is found...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-7",
        "title": "Explain Values and Types in JavaScript",
        "answer": "",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-8",
        "title": "What is let keyword in JavaScript?",
        "answer": "The let keyword is used to declare a block-scoped local variable. Variables declared using let are accessible only within the block they are defined in, unlike variables declared with the var keyword...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-9",
        "title": "Explain what is Binary Search JSJavaPY",
        "answer": "Binary Search is a search algorithm used to locate an element within a sorted array...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-10",
        "title": "Explain the same-origin policy with regards to JavaScript.",
        "answer": "The same-origin policy is a security measure that restricts how a script hosted on one origin can interact with resources on a different origin...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-12",
        "title": "Is there anyway to force using strict mode in Node.js?:",
        "answer": "Yes, it is possible to force the use of strict mode in Node.js. This can be done by adding the following line of code at the top of the Node.js file: 'use strict';",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-13",
        "title": "Why would you use something like the load event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?:",
        "answer": "The load event is used to detect when a web page or resource has finished loading...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-14",
        "title": "What is strict mode?:",
        "answer": "Strict mode is a feature in ECMAScript 5 (ES5) that allows you to place a program, or a function, in a 'strict' operating context...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-15",
        "title": "What's the difference between Host objects and Native objects?:",
        "answer": "Host objects are provided by the host environment (such as the browser) and are not part of the JavaScript language...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-16",
        "title": "What language constructions do you use for iterating over object properties and array items?:",
        "answer": "For iterating over object properties, the most common language constructions are for-in loops and Object.keys()...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-17",
        "title": "What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?:",
        "answer": "",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-18",
        "title": "Explain event bubbling and how one may prevent it:",
        "answer": "Event bubbling is a process by which the event is propagated from the targeted element to its parent elements...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-19",
        "title": "What does use strict do?:",
        "answer": "Use strict is a keyword in JavaScript that enables strict mode, which is a way to write secure and more optimized code...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-20",
        "title": "Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?:",
        "answer": "It is important to leave the global scope of a website as-is for a number of reasons...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-21",
        "title": "What is a Polyfill?:",
        "answer": "A polyfill is a piece of code (usually JavaScript) used to provide modern functionality on older browsers that do not natively support it...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-22",
        "title": "Explain Null and Undefined in JavaScript:Null:",
        "answer": "Null is a special data type in JavaScript which can have only one value: null...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-23",
        "title": "What's the difference between throw Error('msg') vs throw new Error('msg')?:",
        "answer": "The difference is that throw Error('msg') will throw a generic JavaScript error, while throw new Error('msg') will throw an instance of the JavaScript Error object...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-24",
        "title": "What is Callback Hell and what is the main cause of it? :",
        "answer": "Callback Hell is a term used to describe a coding style in which callbacks or functions are nested within each other, leading to unreadable and hard-to-debug code...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-25",
        "title": "Explain what is Interpolation Search JSPY :",
        "answer": "Interpolation Search is an algorithm used for searching for a given item in a sorted list by using the information about the relative location of the desired item...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-26",
        "title": "What is IIFEs (Immediately Invoked Function Expressions)?:",
        "answer": "An immediately-invoked function expression (IIFE) is a JavaScript function that runs as soon as it is defined...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-27",
        "title": "What is Coercion in JavaScript?:",
        "answer": "Coercion in JavaScript is the process of converting a value from one type to another...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-28",
        "title": "What is the difference between a shim and a polyfill?:",
        "answer": "A shim is a piece of code that adds a feature that is missing from a browser or environment...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-29",
        "title": "What is a Jump (or Block) Search? JSJavaPY :",
        "answer": "A jump search, or block search, is a searching algorithm that works by jumping ahead a set number of elements at a time...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-30",
        "title": "What is the definition of a Higher-Order Function?:",
        "answer": "A Higher-Order Function is a function that takes one or more functions as arguments, or returns a function as a result.",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-31",
        "title": "What do you think of AMD vs CommonJS?:",
        "answer": "AMD (Asynchronous Module Definition) and CommonJS are both popular module systems used in JavaScript development...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-32",
        "title": "Explain the differences on the usage of foo between function foo() {} and var foo = function() {}:",
        "answer": "The main difference between the two is that the first one creates a named function called foo, and the second one creates an anonymous function assigned to a variable called foo...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-33",
        "title": "What is the drawback of creating true private in JavaScript?:",
        "answer": "The main drawback of creating true private variables in JavaScript is that it requires more effort to implement than using standard public variables...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-34",
        "title": "What's the difference between .call and .apply?:",
        "answer": "The main difference between .call and .apply is the way in which arguments are passed to the function...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-35",
        "title": "What is the preferred syntax for defining enums in JavaScript?:",
        "answer": "The preferred syntax for defining enums in JavaScript is the object literal syntax...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-36",
        "title": "Describe Closure concept in JavaScript as best as you could:",
        "answer": "A closure is a feature in JavaScript that allows a function to have access to its surrounding state or environment, even after the outer function has returned...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-37",
        "title": "Could you explain the difference between ES5 and ES6?:",
        "answer": "ES5 (ECMAScript 5) is the fifth version of the ECMAScript language specification. It was finalized in 2009 and is supported by most modern browsers...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-38",
        "title": "When should we use generators in ES6?:",
        "answer": "Generators can be used to pause and resume functions in ES6. Generators are useful for asynchronous programming...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-39",
        "title": "Explain Function.prototype.bind.:",
        "answer": "Function.prototype.bind is a method on all functions that allows you to create a new function with the same body and scope as the original function...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-40",
        "title": "What are the benefits of using spread syntax in ES6 and how is it different from rest syntax?:",
        "answer": "Spread syntax allows developers to expand an iterable collection of elements (such as an array or object) into individual elements...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-41",
        "title": "When should I use Arrow Functions in ES6?:",
        "answer": "Arrow functions should be used when you need to write a function that has a concise syntax...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-42",
        "title": "Explain the difference between undefined and not defined in JavaScript?:",
        "answer": "Undefined is a variable that has been declared but has not yet been assigned a value...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-43",
        "title": "What are the advantages and disadvantages of using use strict?:",
        "answer": "",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-44",
        "title": "What is Currying?:",
        "answer": "Currying is a technique in functional programming in which a function is broken down into a series of functions that each take a single argument...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-45",
        "title": "What are the differences between ES6 class and ES5 function constructors?:",
        "answer": "ES6 classes are syntactical sugar over the ES5 function constructors. The differences between the two are...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-46",
        "title": "Why should we use ES6 classes?:",
        "answer": "ES6 classes provide a much simpler and clear syntax to create objects and deal with inheritance...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-47",
        "title": "Explain the difference between Object.freeze() vs const:",
        "answer": "Object.freeze() is a method used to prevent any modifications to an object, preventing properties from being added, removed or changed...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-48",
        "title": "How to compare two objects in JavaScript?:",
        "answer": "You can use the JavaScript comparison operators (== and ===) to compare two objects...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-50",
        "title": "What is a closure, and how/why would you use one?:",
        "answer": "A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-52",
        "title": "What's a typical use case for anonymous functions?:",
        "answer": "Anonymous functions are often used as callback functions, which are functions that are passed as arguments to other functions...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-53",
        "title": "Suggest one simple way of removing duplicates from an array using ES6:",
        "answer": "",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-54",
        "title": "What is generator in JS?:",
        "answer": "A generator in JavaScript is a function that can be paused and resumed at any time, allowing it to produce sequence of values, and potentially infinite sequences...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-55",
        "title": "What is the difference between document load event and document DOMContentLoaded event?:",
        "answer": "The document load event is fired when the whole page, including all dependent resources, such as images and stylesheets, are loaded...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-56",
        "title": "What's the difference between using let and var to declare a variable in ES6?:",
        "answer": "The main difference between let and var is the scope in which the variables are declared...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-57",
        "title": "What is the motivation for bringing Symbol to ES6?:",
        "answer": "Symbol was added to ES6 to provide developers with a way to create unique, immutable, and private property keys...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-58",
        "title": "Why is extending built-in JavaScript objects not a good idea?:",
        "answer": "Extending built-in JavaScript objects can lead to unexpected and inconsistent behavior...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-59",
        "title": "What advantages are using arrow functions?:",
        "answer": "",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-60",
        "title": "What is the difference between Anonymous and Named functions?:",
        "answer": "Anonymous functions are those that are declared without a name, usually as part of a larger statement...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-61",
        "title": "What is export default in JavaScript? :",
        "answer": "Export default in JavaScript is a special keyword that is used to export a single module or value from a script file...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-62",
        "title": "What is the new keyword in JavaScript?:",
        "answer": "The new keyword in JavaScript is used to create a new instance of an object...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-63",
        "title": "Explain Prototype Inheritance in JavaScript?:",
        "answer": "Prototype inheritance in JavaScript is a way of sharing properties and methods between different objects...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-64",
        "title": "What does the term Transpiling stand for?:",
        "answer": "Transpiling is a term used to describe the process of converting code written in one programming language into another...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-65",
        "title": "Can you give an example for destructuring an object or an array in ES6?:",
        "answer": "",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-66",
        "title": "Explain the Prototype Design Pattern:",
        "answer": "Prototype design pattern is a creational design pattern that is used to create objects by cloning an existing object...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-67",
        "title": "Describe the JS module design pattern:",
        "answer": "The JavaScript Module design pattern is a commonly used approach to organizing code into reusable chunks...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-68",
        "title": "Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?:",
        "answer": "The main difference between a .forEach loop and a .map() loop is that the .forEach loop does not return a new array...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-70",
        "title": "How can you share code between files?:",
        "answer": "You can share code between files by using a library, creating a module, or using a source code management system...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-71",
        "title": "What are the actual uses of ES6 WeakMap?:",
        "answer": "ES6 WeakMap objects are used to store key/value pairs in which the keys are objects and the values can be arbitrary values...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-72",
        "title": "Explain difference between: function Person(){}, var person = Person(), and var person = new Person()?:",
        "answer": "Function Person(){} is a function declaration that creates a function object...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-73",
        "title": "Check if a given string is a isomorphic:",
        "answer": "Yes, a given string can be isomorphic...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-74",
        "title": "What is Hoisting in JavaScript?:",
        "answer": "Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-75",
        "title": "When should you NOT use arrow functions in ES6? Name three or more cases.:",
        "answer": "",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-76",
        "title": "What's the difference between a variable that is: null, undefined or undeclared? How would you go about checking for any of these states?:",
        "answer": "Null is a value that is explicitly assigned to a variable that means it has no value...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-77",
        "title": "What is the Temporal Dead Zone in ES6?:",
        "answer": "The Temporal Dead Zone (TDZ) is a mechanism in ECMAScript 6 (ES6) which prevents the use of a variable before it has been declared...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-78",
        "title": "Explain how JSONP works (and how it's not really Ajax):",
        "answer": "JSONP (JSON with padding) is an unconventional technique used to bypass the same-origin policy enforced by modern browsers...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-79",
        "title": "Could you compare usage of Module Pattern vs Constructor/Prototype pattern?:",
        "answer": "The Module Pattern is a design pattern used to create a single global object with a set of private properties and methods...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-80",
        "title": "What tools can be used to assure consistent code style?:",
        "answer": "Answer: Commonly used tools to ensure consistent code style include code linters, code formatters, and code style checkers...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-81",
        "title": "Does JavaScript have a map function to iterate over an object properties? :",
        "answer": "Yes, JavaScript has a map function which can be used to iterate over an object's properties.",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-82",
        "title": "When would you use import * as X from 'X' ? :",
        "answer": "You would use 'import * as X from 'X'' when you want to import all of the exports from a module and assign them to a single variable called X...",
        "level": "junior",
        "category": "javascript"
    },
    {
        "id": "javascript-84",
        "title": "What's the difference between ES6 Map and WeakMap?:",
        "answer": "The main difference between ES6 Map and WeakMap is that a WeakMap only holds objects as keys and does not have any methods for iteration...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-85",
        "title": "What is the difference between the await keyword and the yield keyword?:",
        "answer": "The await keyword is used to pause the execution of an async function and wait for the promise to be resolved...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-86",
        "title": "Compare Async/Await and Generators usage to achieve same functionality:",
        "answer": "Both Async/Await and Generators can be used to achieve asynchronous programming in JavaScript.",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-87",
        "title": "How to deep-freeze object in JavaScript?:",
        "answer": "You can't deep-freeze an object in JavaScript. However, you can use Object.freeze() to freeze the object at the root level...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-88",
        "title": "Is it possible to reset an ECMAScript 6 generator to its initial state?:",
        "answer": "Yes, it is possible to reset an ECMAScript 6 generator to its initial state...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-90",
        "title": "In JavaScript, why is the this operator inconsistent?:",
        "answer": "The this operator can be inconsistent in JavaScript because it depends on the context in which it is used...",
        "level": "mid",
        "category": "javascript"
    },
    {
        "id": "javascript-91",
        "title": "Can you give an example of a curry function and why this syntax offers an advantage?:",
        "answer": "A curry function is a function that takes a function with multiple parameters and returns a function with fewer parameters...",
        "level": "senior",
        "category": "javascript"
    },
    {
        "id": "javascript-92",
        "title": "Does JavaScript pass by references or pass by values?:",
        "answer": "JavaScript passes variables by value when primitive data types (booleans, numbers, strings, etc.) are involved...",
        "level": "mid",
        "category": "javascript"
    }
]


console.log(replaceAnswers(firstSet, secondSet));