var TOPICS_DATA = TOPICS_DATA || {};
TOPICS_DATA["javascript"] = TOPICS_DATA["javascript"] || {};
TOPICS_DATA["javascript"]["apply"] = {
  "title": "apply()",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,

  "tldr": [
    "<code>apply()</code> is a method on all functions that calls the function with a specified <code>this</code> value and arguments provided as an <strong>array</strong> (or array-like object).",
    "It is nearly identical to <code>call()</code>, except <code>call()</code> expects arguments <strong>individually</strong> while <code>apply()</code> expects them as an <strong>array</strong>.",
    "Syntax: <code>fn.apply(thisArg, [argsArray])</code> — the function is invoked <strong>immediately</strong>.",
    "Common use cases: spreading an array as arguments to a function, method borrowing with dynamic argument lists, and variadic function calls."
  ],

  "laymanDefinition": "Imagine you are a chef with a recipe (the function) that needs ingredients (arguments). call() is like handing the ingredients one by one to the chef. apply() is like handing the chef a full shopping bag with all the ingredients inside. When you have your arguments already in an array (like a shopping list), apply() is the perfect tool — you just hand over the whole array at once. This is especially useful when you don't know in advance how many ingredients you'll have, or when they naturally come as a list.",

  "deepDive": [
    {
      "heading": "How apply() Works Internally",
      "text": "When fn.apply(thisArg, argsArray) is called, the engine performs a [[Call]] operation on fn with the specified 'this'. The second argument must be an array-like object (having a length property and indexed elements). If it is null or undefined, no arguments are passed. The engine iterates over the array-like and destructures its elements as positional arguments to the function. Like call(), if thisArg is null/undefined in non-strict mode, 'this' defaults to the global object."
    },
    {
      "heading": "apply() with Variadic Functions",
      "text": "Variadic functions (functions that accept any number of arguments) like Math.max, Math.min, or Array.prototype.push are natural candidates for apply(). Math.max.apply(null, [1, 5, 3]) returns 5. Without apply(), you would need to know all arguments at call time. apply() lets you pass an array of unknown length. In ES6, the spread operator (...arr) provides a cleaner alternative: Math.max(...arr)."
    },
    {
      "heading": "apply() vs Spread Operator",
      "list": [
        "<strong>apply():</strong> Works in all JavaScript environments, including older browsers. Sets 'this' in addition to spreading arguments.",
        "<strong>Spread operator (...):</strong> Cleaner syntax, only available in ES6+. Does not set 'this' — just spreads arguments. Generally preferred in modern code.",
        "<strong>When to use apply():</strong> When you need to both set 'this' and spread arguments from an array, or when targeting older environments.",
        "<strong>When to use spread:</strong> When you only need to spread arguments (no this binding needed), which is the most common case."
      ]
    },
    {
      "heading": "apply() for Array Concatenation and Pushing",
      "text": "Before ES6 spread, apply() was the standard way to concatenate arrays or push multiple values at once. Array.prototype.push.apply(arr1, arr2) pushes all elements of arr2 into arr1 in a single operation. Similarly, Array.prototype.concat.apply([], arrays) could merge multiple arrays. Modern code uses [...arr1, ...arr2] or arr1.push(...arr2)."
    },
    {
      "heading": "The argsArray Limitation",
      "text": "The second argument to apply() must be array-like (having length and indices). It can be a real array, the arguments object, a NodeList, or any custom object with a length property. If the argsArray is very large (tens of thousands of elements), apply() may throw a 'Maximum call stack size exceeded' error because the engine tries to spread all elements as individual arguments. For extremely large arrays, use a loop-based approach instead."
    }
  ],

  "interviewAnswer": "apply() is a function method that immediately invokes a function with a specified 'this' value and an array (or array-like) of arguments. Its primary use cases are: 1) Calling variadic functions with array data (e.g., Math.max.apply(null, numbers)). 2) Method borrowing when arguments are in array form. 3) Array concatenation and pushing multiple values. 4) Forwarding arguments from one function to another. The key distinction from call() is that apply() accepts arguments as an array. In modern JavaScript, the spread operator has largely replaced apply() for argument spreading, but apply() remains relevant when you need to simultaneously set 'this' and spread arguments, or when working with older codebases.",

  "interviewQuestions": [
    {
      "question": "What does apply() do?",
      "answer": "apply() invokes a function with a specified 'this' value and arguments provided as an array (or array-like object). Syntax: fn.apply(thisArg, [argsArray]). It immediately executes the function."
    },
    {
      "question": "What is the difference between apply() and call()?",
      "answer": "Both invoke a function immediately with a specified 'this'. The difference is argument format: call() takes arguments individually (fn.call(obj, 1, 2, 3)), while apply() takes them as an array (fn.apply(obj, [1, 2, 3])). Use call() when you know the arguments at call time and apply() when arguments are in an array."
    },
    {
      "question": "How do you find the maximum value in an array using apply()?",
      "answer": "Math.max.apply(null, array) returns the maximum value: <code>const nums = [1, 5, 3, 9, 2];\nconsole.log(Math.max.apply(null, nums)); // 9</code> Modern alternative: Math.max(...nums)."
    },
    {
      "question": "What happens if the argsArray is very large?",
      "answer": "If the argsArray has tens of thousands of elements, apply() may throw a 'Maximum call stack size exceeded' error. This happens because JavaScript engines have a limit on the number of function arguments. For large arrays, iterate in chunks or use a loop instead."
    },
    {
      "question": "How do you use apply() for array concatenation?",
      "answer": "Array.prototype.push.apply(arr1, arr2) pushes all elements of arr2 into arr1: <code>const a = [1, 2];\nconst b = [3, 4];\nArray.prototype.push.apply(a, b);\nconsole.log(a); // [1, 2, 3, 4]</code> Modern alternative: a.push(...b)."
    },
    {
      "question": "What qualifies as a valid second argument for apply()?",
      "answer": "The second argument must be array-like: an object with a 'length' property and numeric indices. Real arrays, the 'arguments' object, NodeLists, HTMLCollections, and custom objects like { 0: 'a', 1: 'b', length: 2 } all work. null or undefined means no arguments are passed."
    },
    {
      "question": "How is apply() used for forwarding arguments?",
      "answer": "apply() can forward arguments from one function to another: <code>function wrapper() {\n  return originalFn.apply(this, arguments);\n}</code> This preserves both 'this' and all arguments."
    },
    {
      "question": "What is the modern alternative to apply() for spreading arrays?",
      "answer": "The spread operator (...): <code>Math.max(...arr)</code> instead of <code>Math.max.apply(null, arr)</code>. The spread operator is cleaner and more intuitive. apply() is still needed when you also need to specify 'this' in a single operation."
    },
    {
      "question": "Can you use apply() with constructors?",
      "answer": "Yes, but 'new' cannot be used with apply() directly. Use Reflect.construct() instead: <code>const instance = Reflect.construct(Fn, argsArray);</code> This is the modern equivalent of 'new' with an array of arguments."
    },
    {
      "question": "How does apply() handle null or undefined as argsArray?",
      "answer": "If the argsArray is null or undefined, apply() calls the function with no arguments. The function is invoked with only the specified 'this' value (or the default if thisArg is also null/undefined)."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 400\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"380\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"16\" font-weight=\"bold\">Function.prototype.apply() — Flow</text><rect x=\"60\" y=\"65\" width=\"220\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"170\" y=\"90\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">fn (any function)</text><text x=\"170\" y=\"110\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">fn.apply(thisArg, [a, b, c])</text><line x1=\"280\" y1=\"105\" x2=\"340\" y2=\"105\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><text x=\"310\" y=\"95\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\">.apply()</text><rect x=\"340\" y=\"65\" width=\"300\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"490\" y=\"85\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold\">Effect on Function Execution</text><text x=\"490\" y=\"108\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">1. this = thisArg (explicit)</text><text x=\"490\" y=\"128\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">2. params: a, b, c (spread from array)</text><line x1=\"350\" y1=\"155\" x2=\"350\" y2=\"185\" stroke=\"#98c379\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"80\" y=\"185\" width=\"560\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"360\" y=\"207\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"13\" font-weight=\"bold\">Example: Math.max.apply(null, [3, 7, 1, 9, 4])</text><text x=\"360\" y=\"227\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">1. this = null (not used by Math.max)</text><text x=\"360\" y=\"245\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">2. Arguments: 3, 7, 1, 9, 4 (array spread individually)</text><line x1=\"360\" y1=\"265\" x2=\"360\" y2=\"295\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"295\" width=\"440\" height=\"50\" rx=\"25\" fill=\"url(#g1)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"360\" y=\"320\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"14\">Result: 9 (Math.max(3, 7, 1, 9, 4))</text></svg>",

  "codeExamples": [
    {
      "title": "Finding Max/Min in an Array with apply()",
      "useCase": "Variadic Functions with Array Data",
      "code": "const numbers = [45, 12, 89, 33, 71, 56];\n\nconst max = Math.max.apply(null, numbers);\nconst min = Math.min.apply(null, numbers);\n\nconsole.log(max); // 89\nconsole.log(min); // 12\n\n// Without apply(), you'd need to manually list:\n// Math.max(45, 12, 89, 33, 71, 56) — not dynamic!\n\n// Modern alternative:\n// const max = Math.max(...numbers);\n// const min = Math.min(...numbers);",
      "description": "Math.max and Math.min are variadic — they accept any number of arguments. apply() lets you pass array elements as individual arguments dynamically."
    },
    {
      "title": "Pushing Multiple Values with apply()",
      "useCase": "Array Concatenation",
      "code": "const shoppingCart = ['apple', 'banana'];\nconst newItems = ['orange', 'grape', 'kiwi'];\n\n// Push all new items at once\nArray.prototype.push.apply(shoppingCart, newItems);\n\nconsole.log(shoppingCart);\n// ['apple', 'banana', 'orange', 'grape', 'kiwi']\n\n// Equivalent with spread:\n// shoppingCart.push(...newItems);\n\n// Also works for merging arrays:\nconst merged = [];\nArray.prototype.push.apply(merged, shoppingCart);\nArray.prototype.push.apply(merged, ['mango', 'pear']);",
      "description": "apply() enables pushing multiple elements from an array into another array in one call. This was essential before ES6 spread syntax."
    },
    {
      "title": "Forwarding Arguments Between Functions",
      "useCase": "Decorator / Wrapper Pattern",
      "code": "function logAndExecute(fn) {\n  return function() {\n    console.log('Called with:', arguments);\n    const result = fn.apply(this, arguments);\n    console.log('Result:', result);\n    return result;\n  };\n}\n\nconst add = (a, b) => a + b;\nconst loggedAdd = logAndExecute(add);\n\nconsole.log(loggedAdd(3, 4));\n// 'Called with: [3, 4]'\n// 'Result: 7'\n// 7\n\n// The wrapper preserves both 'this' and all arguments\nconst obj = { factor: 10 };\nobj.multiply = function(x) { return this.factor * x; };\nobj.loggedMultiply = logAndExecute(obj.multiply);\nconsole.log(obj.loggedMultiply(5)); // 'Called with: [5]' then 'Result: 50'",
      "description": "apply(this, arguments) inside a wrapper perfectly forwards the call context, preserving both 'this' and all arguments to the original function."
    },
    {
      "title": "apply() with Array-Like Objects",
      "useCase": "Using Array Methods on Custom Objects",
      "code": "// Custom array-like object\nconst arrayLike = {\n  0: 'HTML',\n  1: 'CSS',\n  2: 'JavaScript',\n  length: 3\n};\n\n// Borrow .join from Array\nconst joined = Array.prototype.join.apply(arrayLike, [' + ']);\nconsole.log(joined); // 'HTML + CSS + JavaScript'\n\n// Borrow .filter to get short names\nconst short = Array.prototype.filter.apply(arrayLike, [\n  item => item.length < 4\n]);\nconsole.log(short); // ['CSS']\n\n// Note: apply() modifies the original array-like\nArray.prototype.push.apply(arrayLike, ['React', 'Node']);\nconsole.log(arrayLike.length); // 5",
      "description": "apply() works with any array-like object. You can borrow Array.prototype methods (join, filter, push, etc.) to operate on custom objects."
    },
    {
      "title": "Using apply() with a Spread Argument (Modern Hybrid)",
      "useCase": "Mixing apply and Spread",
      "code": "function introduce(greeting, title, name) {\n  return `${greeting}, ${title} ${name}!`;\n}\n\nconst args = ['Hello', 'Dr.', 'Smith'];\n\n// Old way:\nconsole.log(introduce.apply(null, args)); // 'Hello, Dr. Smith!'\n\n// ES6+ way:\nconsole.log(introduce(...args)); // 'Hello, Dr. Smith!'\n\n// Hybrid: apply with spread for complex scenarios\nfunction sumValues() {\n  // arguments is array-like, spread into apply\n  return Array.prototype.reduce.apply(\n    arguments,\n    [(sum, n) => sum + n, 0]\n  );\n}\n\nconsole.log(sumValues(1, 2, 3, 4)); // 10",
      "description": "While spread is preferred in modern code, apply() is still useful when you need both 'this' binding and argument spreading, or when dealing with array-like objects."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What does apply() do?",
      "options": ["Creates a new function with bound arguments", "Immediately invokes a function with specified this and array of args", "Returns a new array", "Calls a function asynchronously"],
      "answer": 1,
      "explanation": "apply() immediately invokes the function with a specified 'this' value and an array (or array-like) of arguments."
    },
    {
      "question": "What is the key difference between apply() and call()?",
      "options": ["apply() is faster", "apply() takes arguments as an array, call() takes them individually", "apply() does not accept thisArg", "apply() returns a new function"],
      "answer": 1,
      "explanation": "Both invoke immediately with specified 'this'. apply() uses an array for arguments; call() uses individual arguments."
    },
    {
      "question": "What will the following log? console.log(Math.max.apply(null, [1, 5, 2]));",
      "options": ["1", "5", "2", "null"],
      "answer": 1,
      "explanation": "apply() spreads the array elements as individual arguments to Math.max. Math.max(1, 5, 2) returns 5."
    },
    {
      "question": "What happens if you pass null as argsArray to apply()?",
      "options": ["It throws a TypeError", "The function is called with no arguments", "It uses the arguments from the previous call", "It defaults to an empty array"],
      "answer": 1,
      "explanation": "If argsArray is null or undefined, the function is called with no arguments."
    },
    {
      "question": "How do you merge two arrays using apply()?",
      "options": ["arr1.concat.apply(arr1, arr2)", "Array.prototype.push.apply(arr1, arr2)", "arr1.apply(arr2)", "arr1.merge.apply(arr1, arr2)"],
      "answer": 1,
      "explanation": "Array.prototype.push.apply(arr1, arr2) pushes all elements of arr2 into arr1 in a single operation."
    },
    {
      "question": "What modern syntax has largely replaced apply() for spreading arrays?",
      "options": ["Array.from()", "The spread operator (...)", "Array.of()", "for...of loops"],
      "answer": 1,
      "explanation": "The spread operator (...arr) provides a cleaner alternative to apply() for most argument-spreading use cases."
    },
    {
      "question": "Which objects can be used as the second argument to apply()?",
      "options": ["Only real arrays", "Only the arguments object", "Any array-like object with length and indices", "Only strings"],
      "answer": 2,
      "explanation": "Any array-like object (with length property and numeric indices) works: arrays, arguments, NodeLists, HTMLCollections, and custom objects."
    },
    {
      "question": "How do you use apply() with constructors?",
      "options": ["new Fn.apply(obj, args)", "Fn.apply(new obj, args)", "Reflect.construct(Fn, args)", "You cannot use apply() with constructors"],
      "answer": 2,
      "explanation": "Reflect.construct(Fn, argsArray) is the modern way to call a constructor with an array of arguments, equivalent to 'new Fn(...args)'."
    },
    {
      "question": "What will the following log? const arr = ['a', 'b']; Array.prototype.push.apply(arr, ['c', 'd']); console.log(arr.length);",
      "options": ["2", "3", "4", "5"],
      "answer": 2,
      "explanation": "push.apply adds two elements ('c', 'd') to the array. Original length was 2, now it's 4."
    },
    {
      "question": "What problem can occur when using apply() with a very large array?",
      "options": ["The array gets reversed", "Maximum call stack size exceeded error", "The thisArg gets ignored", "The function returns undefined"],
      "answer": 1,
      "explanation": "JavaScript engines have a limit on function arguments. Spreading a very large array via apply() can exceed this limit and throw a stack overflow error."
    }
  ]
}
;
TOPICS_DATA["javascript"]["bind"] = {
  "title": "bind()",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,

  "tldr": [
    "<code>bind()</code> is a method on all functions that creates a <strong>new function</strong> with a fixed <code>this</code> value and optionally pre-filled arguments (<strong>partial application</strong>).",
    "Unlike <code>call()</code> and <code>apply()</code>, <code>bind()</code> does <strong>not</strong> execute the function immediately — it returns a new bound function that can be called later.",
    "Once a function is bound, its <code>this</code> value <strong>cannot</strong> be changed — even by <code>call()</code>, <code>apply()</code>, or another <code>bind()</code>.",
    "Syntax: <code>const boundFn = fn.bind(thisArg, arg1, arg2, ...)</code>"
  ],

  "laymanDefinition": "Imagine you have a remote control that can operate any TV, but you want one that only works with your living room TV. You'd 'bind' the remote to that specific TV so it always controls that one. bind() does the same for functions: it creates a new function with a fixed 'this' value so no matter where or how you call it, it always uses the object you specified. Additionally, you can pre-set some of the function's arguments, like pre-programming a few favorite channels on that remote, so that when you press the button, it already knows the channel without you having to enter it every time.",
    
  "deepDive": [
    {
      "heading": "How bind() Works Internally",
      "text": "When you call fn.bind(thisArg, ...args), JavaScript creates a new function object called a 'bound function' (also called an 'exotic function' in the spec). This bound function has internal slots: [[BoundTargetFunction]] (the original function), [[BoundThis]] (the fixed this value), and [[BoundArguments]] (the pre-filled args). When the bound function is called, JavaScript internally calls [[BoundTargetFunction]] with [[BoundThis]] as 'this' and concatenating [[BoundArguments]] with any additional arguments passed at call time."
    },
    {
      "heading": "Partial Application with bind()",
      "text": "bind() does not just bind 'this' — it also pre-fills arguments. This is called partial application. For example, function multiply(a, b) { return a * b; } — calling multiply.bind(null, 2) creates a new function where 'a' is permanently 2. Calling that new function with a single argument (e.g., double(5)) returns 10. This is a functional programming technique that reduces function arity."
    },
    {
      "heading": "bind() vs Arrow Functions for this Binding",
      "list": [
        "<strong>bind():</strong> Creates a new function with bound 'this'. The original function remains unmodified. Useful when you need to pass a method as a callback with a specific 'this'.",
        "<strong>Arrow functions:</strong> Do not have their own 'this'; they inherit from the enclosing scope. Lighter weight — no new function creation with internal slots.",
        "<strong>When to use bind():</strong> When you need partial application, or when you're working with function constructors/methods that must use a specific 'this'.",
        "<strong>When to use arrows:</strong> In most callback situations where you just need to preserve the outer 'this' (e.g., event handlers inside classes)."
      ]
    },
    {
      "heading": "Bind and Constructor Behavior",
      "text": "A bound function can be used with the 'new' keyword. When a bound function is called with 'new', the behavior is special: the [[BoundThis]] is ignored, and 'this' is set to the newly created instance (as usual with 'new'). However, the [[BoundArguments]] are still pre-pended to any arguments passed to the constructor. This means you can create 'partial' constructors."
    },
    {
      "heading": "Use Cases for bind()",
      "text": "Common use cases include: 1) Fixing 'this' in event handlers (react class components, DOM listeners). 2) Creating function factories with preset arguments. 3) Borrowing methods from other objects with a permanent 'this'. 4) setTimeout/setInterval callbacks that need a specific context. 5) Currying and partial application in functional programming patterns."
    }
  ],

  "interviewAnswer": "bind() is a function method that returns a new function with a permanently bound 'this' value and optionally pre-filled arguments. Unlike call() and apply(), bind() does not immediately invoke the function — it creates a new bound function. The bound function's 'this' cannot be changed later, even by call(), apply(), or another bind(). This makes bind() essential for fixing 'this' in callbacks, event handlers, and asynchronous code. bind() also supports partial application, where you pre-fill some arguments to create a more specialized function. In ES6, arrow functions have largely replaced bind() for simple 'this' binding, but bind() remains valuable for partial application and when you need an actual callable function with a permanently bound context.",

  "interviewQuestions": [
    {
      "question": "What does bind() do in JavaScript?",
      "answer": "bind() creates a new function that, when called, has its 'this' keyword set to the provided value. It can also pre-fill arguments (partial application). The original function is not modified. Syntax: fn.bind(thisArg, ...args)"
    },
    {
      "question": "What is the difference between bind(), call(), and apply()?",
      "answer": "call() and apply() invoke the function immediately with the specified 'this'. bind() returns a new function with 'this' bound, without invoking it. call() takes arguments individually, apply() takes them as an array, and bind() returns a new function. Use bind() when you need a reusable callback with a fixed 'this'."
    },
    {
      "question": "Can you change the 'this' of a bound function?",
      "answer": "No. Once a function is bound with bind(), its 'this' is permanently fixed. Even calling call() or apply() on the bound function will not change it — those methods' first argument is ignored. Calling bind() again also does not change it."
    },
    {
      "question": "What is partial application with bind()?",
      "answer": "Partial application means pre-filling some of a function's arguments using bind(): <code>function add(a, b) { return a + b; }\nconst add5 = add.bind(null, 5);\nconsole.log(add5(3)); // 8\nconsole.log(add5(10)); // 15</code> The first argument (a) is permanently set to 5."
    },
    {
      "question": "When would you use bind() instead of an arrow function?",
      "answer": "Use bind() when: 1) You need partial application (pre-filling arguments). 2) You need to create a reusable bound function that can be passed around. 3) You're working with a codebase that doesn't support ES6. 4) You need the bound function to work with 'new' (arrow functions cannot be constructors). For simple 'this' preservation in callbacks, arrow functions are usually the better choice."
    },
    {
      "question": "How does bind() work with event handlers in DOM?",
      "answer": "In DOM event handlers, 'this' normally refers to the element that fired the event. If you want 'this' to be a different object (e.g., a class instance), you can use bind(): <code>element.addEventListener('click', this.handleClick.bind(this));</code> This ensures that inside handleClick, 'this' refers to the class instance, not the DOM element."
    },
    {
      "question": "What happens when you call a bound function with 'new'?",
      "answer": "When a bound function is used with 'new', the [[BoundThis]] is ignored and 'this' becomes the new instance. But the [[BoundArguments]] (pre-filled args) are still prepended to the constructor arguments. This allows for partial application of constructors."
    },
    {
      "question": "Does bind() modify the original function?",
      "answer": "No, bind() does not modify the original function. It returns a new function (a bound function) that wraps the original. The original function remains unchanged and can still be called with different 'this' values."
    },
    {
      "question": "What is the internal implementation of bind()?",
      "answer": "The bound function has internal slots: [[BoundTargetFunction]] (original fn), [[BoundThis]] (fixed this value), and [[BoundArguments]] (pre-filled args). When called, it internally calls [[BoundTargetFunction]] with [[BoundThis]] and concatenates [[BoundArguments]] with the call-time arguments. This is defined in the ECMAScript specification as Function.prototype.bind."
    },
    {
      "question": "Can you bind multiple times? What happens?",
      "answer": "You can chain bind() calls, but only the first bind() matters for 'this'. Subsequent bind() calls create a new bound function whose target is the first bound function. The inner bound function's [[BoundThis]] is already fixed, so the outer bind's thisArg has no effect. However, partial application arguments from multiple binds are concatenated in order."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrowR\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrowG\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#98c379\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"400\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"16\" font-weight=\"bold\">How bind() Works</text><!-- Original function --><rect x=\"60\" y=\"65\" width=\"250\" height=\"90\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"185\" y=\"88\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">Original Function</text><text x=\"185\" y=\"108\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">function greet(greeting, name) {</text><text x=\"185\" y=\"125\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"12\">return greeting + ' ' + this.title + ' ' + name;</text><text x=\"185\" y=\"142\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">}</text><!-- Arrow --><line x1=\"310\" y1=\"110\" x2=\"370\" y2=\"110\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrowR)\"/><text x=\"340\" y=\"100\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\">.bind(obj, 'Hello')</text><!-- Bound function --><rect x=\"370\" y=\"65\" width=\"260\" height=\"90\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"500\" y=\"88\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"13\" font-weight=\"bold\">Bound Function (new fn)</text><text x=\"500\" y=\"108\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">[[BoundTargetFunction]] = greet</text><text x=\"500\" y=\"125\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\">[[BoundThis]] = obj</text><text x=\"500\" y=\"142\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"12\">[[BoundArguments]] = ['Hello']</text><!-- Side note --><rect x=\"100\" y=\"185\" width=\"500\" height=\"75\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#aaa\" stroke-width=\"1\" stroke-dasharray=\"4\"/><text x=\"350\" y=\"210\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"13\" font-weight=\"bold\">When called: boundGreet('Dr.', 'Smith')</text><text x=\"350\" y=\"230\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">1. this = [[BoundThis]] = obj (ignoring call-site)</text><text x=\"350\" y=\"248\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">2. args = ['Hello'] + ['Dr.', 'Smith'] = ['Hello', 'Dr.', 'Smith']</text><line x1=\"350\" y1=\"260\" x2=\"350\" y2=\"285\" stroke=\"#98c379\" stroke-width=\"2\" marker-end=\"url(#arrowG)\"/><rect x=\"150\" y=\"285\" width=\"400\" height=\"50\" rx=\"25\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"310\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\">Result: 'Hello Dr. Smith'</text><text x=\"350\" y=\"360\" text-anchor=\"middle\" fill=\"#888\" font-size=\"12\">Note: Original greet function is NOT modified — a new function is created</text></svg>",

  "codeExamples": [
    {
      "title": "Basic this Binding with bind()",
      "useCase": "Fixing this in Callbacks",
      "code": "const user = {\n  name: 'Alice',\n  greet() { console.log(`Hello, ${this.name}`); }\n};\n\nconst unboundedGreet = user.greet;\nunboundedGreet(); // 'Hello, undefined' (wrong this)\n\nconst boundedGreet = user.greet.bind(user);\nboundedGreet(); // 'Hello, Alice' (correct)\n\n// Even when passed to setTimeout:\nsetTimeout(user.greet.bind(user), 100); // 'Hello, Alice'",
      "description": "bind() fixes 'this' so the function works correctly even when called standalone or as a callback."
    },
    {
      "title": "Partial Application with bind()",
      "useCase": "Pre-Filling Arguments",
      "code": "function multiply(a, b, c) {\n  return a * b * c;\n}\n\n// Pre-fill the first argument\nconst double = multiply.bind(null, 2);\nconsole.log(double(3, 4)); // 24 (2 * 3 * 4)\n\n// Pre-fill first two arguments\nconst tripleByFour = multiply.bind(null, 3, 4);\nconsole.log(tripleByFour(5)); // 60 (3 * 4 * 5)\n\n// Practical: tax calculator\nconst addTax = (rate, price) => price + (price * rate / 100);\nconst addSalesTax = addTax.bind(null, 8); // 8% tax\nconsole.log(addSalesTax(100)); // 108\nconsole.log(addSalesTax(200)); // 216",
      "description": "Partial application reduces a function's arity by pre-filling arguments. This creates more specialized functions from general ones."
    },
    {
      "title": "bind() in Event Handlers",
      "useCase": "DOM Event Handling",
      "code": "class Button {\n  constructor(label) {\n    this.label = label;\n    this.count = 0;\n    \n    // Without bind: 'this' would be the DOM element\n    const el = document.createElement('button');\n    el.textContent = label;\n    el.addEventListener('click', this.handleClick.bind(this));\n    document.body.appendChild(el);\n  }\n\n  handleClick() {\n    this.count++;\n    console.log(`${this.label} clicked ${this.count} times`);\n  }\n}\n\n// Arrow function alternative:\n// el.addEventListener('click', (e) => this.handleClick(e));",
      "description": "In DOM event handlers, 'this' normally refers to the element. bind(this) fixes it to refer to the class instance so we can access properties like this.label and this.count."
    },
    {
      "title": "Bound Functions Cannot Be Rebound",
      "useCase": "Permanent Binding",
      "code": "const obj1 = { x: 1 };\nconst obj2 = { x: 2 };\n\nfunction getX() { return this.x; }\n\nconst bound = getX.bind(obj1);\nconsole.log(bound());        // 1\n\n// These all still return 1:\nconsole.log(bound.call(obj2));   // 1 (obj2 ignored)\nconsole.log(bound.apply(obj2));  // 1 (obj2 ignored)\nconsole.log(bound.bind(obj2)()); // 1 (ignored)\n\n// Even Function.prototype.call on the bound function:\n// bound.call(obj2) is equivalent to:\n// (function() { return getX.apply(obj1, arguments); }).call(obj2)\n// The inner getX still uses obj1 as 'this'!",
      "description": "Once bound, always bound. No method can change the 'this' of a bound function. This is because bind() creates a new function with the target and this stored internally."
    },
    {
      "title": "bind() for setTimeout Callbacks",
      "useCase": "Async Context Preservation",
      "code": "class Logger {\n  constructor(prefix) {\n    this.prefix = prefix;\n    this.logCount = 0;\n  }\n\n  start() {\n    // Without bind: 'this' is the timeout global\n    setInterval(function() {\n      this.logCount++;\n      console.log(`${this.prefix}: ${this.logCount}`);\n    }.bind(this), 1000);\n    \n    // Alternative with arrow function:\n    // setInterval(() => {\n    //   this.logCount++;\n    //   console.log(`${this.prefix}: ${this.logCount}`);\n    // }, 1000);\n  }\n}\n\nconst logger = new Logger('LOG');\nlogger.start();\n// LOG: 1, LOG: 2, LOG: 3...",
      "description": "setTimeout and setInterval callbacks lose 'this'. bind() permanently sets 'this' to the class instance, making this.prefix and this.logCount accessible."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What does bind() return?",
      "options": ["The result of calling the function", "undefined", "A new function with bound this", "The original function modified in-place"],
      "answer": 2,
      "explanation": "bind() returns a new function with 'this' set to the provided value. It does not call the original function."
    },
    {
      "question": "What will the following log? const obj = { val: 1 }; function getVal() { return this.val; } const bound = getVal.bind(obj); console.log(bound.call({ val: 2 }));",
      "options": ["1", "2", "undefined", "TypeError"],
      "answer": 0,
      "explanation": "bind() permanently fixes 'this' to obj. Calling .call() on the bound function ignores the provided thisArg, so this.val is still 1."
    },
    {
      "question": "What is partial application?",
      "options": ["Calling a function partially", "Pre-filling some arguments of a function to create a more specific function", "Binding 'this' to null", "Splitting a function into multiple parts"],
      "answer": 1,
      "explanation": "Partial application is the technique of pre-filling some arguments of a function using bind(), creating a new function with fewer parameters."
    },
    {
      "question": "What will the following log? function add(a, b) { return a + b; } const add5 = add.bind(null, 5); console.log(add5(10));",
      "options": ["15", "5", "10", "undefined"],
      "answer": 0,
      "explanation": "bind(null, 5) pre-fills the first argument (a) as 5. When add5(10) is called, b is 10, so the result is 5 + 10 = 15."
    },
    {
      "question": "Which is NOT a difference between bind() and an arrow function?",
      "options": ["bind() creates a new function, arrow functions use lexical scoping", "bind() can do partial application, arrow functions cannot", "Arrow functions can be used as constructors, bound functions cannot", "Both preserve 'this' from a specific context"],
      "answer": 2,
      "explanation": "Arrow functions cannot be used as constructors (they throw TypeError if called with 'new'). Bound functions can be used with 'new' (though [[BoundThis]] is ignored)."
    },
    {
      "question": "What happens when you call bind() on a bound function?",
      "options": ["The 'this' is changed to the new value", "The 'this' from the first bind remains, but arguments from both binds are concatenated", "It throws an error", "The new bound function replaces the old one"],
      "answer": 1,
      "explanation": "A bound function's 'this' is already fixed and cannot be changed. The second bind() creates a wrapper, but the inner bound function still uses its original [[BoundThis]]. Arguments from both binds are concatenated."
    },
    {
      "question": "In the expression fn.bind(obj, 1, 2), what does 'this' become inside the new function?",
      "options": ["The first argument (obj)", "The function fn", "undefined", "window"],
      "answer": 0,
      "explanation": "The first argument to bind() is always the 'this' value for the new function. obj becomes 'this' inside the bound function."
    },
    {
      "question": "What is the internal [[BoundTargetFunction]]?",
      "options": ["The 'this' value of the bound function", "The original function that bind() was called on", "The new bound function itself", "The arguments array"],
      "answer": 1,
      "explanation": "[[BoundTargetFunction]] is an internal slot that stores a reference to the original function that bind() was called on. It is called when the bound function is invoked."
    },
    {
      "question": "Can a bound function be garbage collected?",
      "options": ["No, bound functions are permanent", "Yes, when there are no references to it", "Only if the original function is also garbage collected", "Bound functions are never collected"],
      "answer": 1,
      "explanation": "Bound functions are regular objects. Once all references to the bound function are gone, it becomes eligible for garbage collection. The original function can also be collected if nothing else references it."
    },
    {
      "question": "What will the following log? const obj = { x: 10 }; function fn() { console.log(this.x); } const b1 = fn.bind(obj); const b2 = b1.bind({ x: 20 }); b2();",
      "options": ["10", "20", "undefined", "TypeError"],
      "answer": 0,
      "explanation": "b1 is bound to obj. b2 is a bound function wrapping b1. When b2 is called, it calls b1 with b1's [[BoundThis]] (obj). The 'this' of b1 cannot be overridden, so this.x is 10."
    }
  ]
}
;
TOPICS_DATA["javascript"]["call-stack"] = {
  "title": "Call Stack",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "The <strong>Call Stack</strong> is a LIFO (Last In, First Out) data structure that tracks function calls in a program.",
    "Each function invocation pushes a <strong>stack frame</strong> (execution context) onto the top of the stack.",
    "When a function returns, its frame is <strong>popped</strong> off the stack and execution resumes in the previous frame.",
    "The Call Stack has a fixed size (approx 10k-15k frames). Exceeding it causes a <strong>Stack Overflow</strong>."
  ],
  "laymanDefinition": "Imagine a stack of sticky notes. You start with one note at the bottom (your main program). Whenever you call a function, you write it on a new sticky note and place it on top. You can only work on the top note. When you finish that task, you throw away that note and go back to working on the one below it. The Call Stack works exactly like this — it keeps track of where you are in the program. When a function calls another function, the new function goes on top. When it finishes, it's removed and you resume where you left off.",
  "deepDive": [
    {
      "heading": "LIFO: Last In, First Out",
      "text": "The Call Stack operates on a LIFO basis. The last function that was called (pushed onto the stack) is the first one to complete and be removed (popped off). This ensures that function execution happens in the correct order. The Global Execution Context is always at the bottom of the stack."
    },
    {
      "heading": "Stack Frames",
      "text": "Each entry on the Call Stack is called a <strong>stack frame</strong>. A stack frame contains: the function's execution context (its variables, parameters, and scope chain), the return address (where to continue execution after the function returns), and the function's arguments. The size of each frame depends on the number of local variables and the depth of the scope chain."
    },
    {
      "heading": "Blowing the Stack: Stack Overflow",
      "text": "The Call Stack has a finite size determined by the JavaScript engine (typically around 10,000 to 50,000 frames depending on the browser). When the stack exceeds this limit, a <strong>RangeError: Maximum call stack size exceeded</strong> is thrown. This most commonly occurs with infinite recursion (a function that calls itself without a base case) or very deep recursion."
    },
    {
      "heading": "Call Stack and Asynchronous Code",
      "text": "The Call Stack only handles synchronous code execution. When an asynchronous operation (like setTimeout, fetch, or a Promise) is encountered, its callback is not executed on the Call Stack immediately. Instead, it is moved to a <strong>task queue</strong> (macrotask or microtask queue). The Event Loop constantly checks if the Call Stack is empty; if it is, it dequeues tasks from the queues and pushes them onto the Call Stack for execution."
    }
  ],
  "interviewAnswer": "The Call Stack is a LIFO data structure used by JavaScript engines to track function execution. When a function is called, a new stack frame containing its execution context is pushed onto the top of the stack. When the function returns, its frame is popped off and execution resumes in the previous frame. The Global Execution Context sits at the bottom and is popped only when the program ends. The Call Stack has a limited capacity — exceeding it causes a stack overflow error. Asynchronous callbacks are not executed directly on the Call Stack; they are queued and processed by the Event Loop only when the stack is empty.",
  "interviewQuestions": [
    {
      "question": "What is the Call Stack and how does it work?",
      "answer": "The Call Stack is a LIFO (Last In, First Out) data structure that tracks the execution of function calls. When a function is invoked, its execution context is pushed onto the stack. When it returns, it is popped off. The currently executing function is always at the top of the stack."
    },
    {
      "question": "What information is stored in a stack frame?",
      "answer": "A stack frame contains: (1) the function's execution context (local variables, parameters, and scope chain), (2) the return address (where to resume execution after the function returns), and (3) the function's arguments. Some engines also store additional metadata for debugging and error handling."
    },
    {
      "question": "What is a stack overflow and how does it occur?",
      "answer": "A stack overflow occurs when the Call Stack exceeds its maximum capacity. This typically happens with infinite recursion or extremely deep recursion. The JavaScript engine throws a <code>RangeError: Maximum call stack size exceeded</code>. For example: <pre><code>function recurse() { recurse(); } recurse(); // Stack overflow</code></pre>"
    },
    {
      "question": "How does the Call Stack interact with asynchronous code?",
      "answer": "The Call Stack only handles synchronous execution. When an async operation completes (e.g., setTimeout fires), its callback is placed in a task queue, not directly on the Call Stack. The Event Loop checks if the Call Stack is empty; if it is, it takes the first callback from the queue and pushes it onto the Call Stack for execution."
    },
    {
      "question": "What is the difference between the Call Stack and the Memory Heap?",
      "answer": "The <strong>Call Stack</strong> stores function execution contexts (stack frames) in a structured LIFO order. It is fast, size-limited, and used for synchronous execution. The <strong>Memory Heap</strong> is a large, unstructured pool of memory where objects, arrays, and closures are allocated. It is slower, nearly unlimited in practice, and managed by garbage collection."
    },
    {
      "question": "How can you cause a stack overflow without recursion?",
      "answer": "While recursion is the most common cause, stack overflow can also happen with excessively deep call chains (e.g., deeply nested function calls), very large functions with many local variables (each frame is larger), or infinite loops combined with function calls. In practice, infinite recursion is by far the most common cause."
    },
    {
      "question": "What is the typical maximum size of the Call Stack in JavaScript?",
      "answer": "The maximum Call Stack size varies by engine: V8 (Chrome/Node.js) allows around 10,000-15,000 frames, SpiderMonkey (Firefox) around 20,000-30,000, and JavaScriptCore (Safari) around 40,000-50,000. The exact number depends on the memory available and the size of each frame."
    },
    {
      "question": "What happens to the Call Stack during a 'try/catch' block?",
      "answer": "When an error is thrown inside a try block, the Call Stack unwinds — frames are popped off — until it reaches a matching catch block in the nearest enclosing scope. If no catch is found, the stack continues unwinding until it reaches the Global Execution Context, which causes an uncaught error. This is why 'try/catch' can be expensive for deeply nested calls."
    },
    {
      "question": "Can you inspect the Call Stack programmatically?",
      "answer": "Yes. You can use <code>console.trace()</code> to print the Call Stack to the console. The <code>Error().stack</code> property also returns a stack trace string. In Node.js, the <code>console.trace()</code> method is available. These are invaluable for debugging complex call chains."
    },
    {
      "question": "How does 'tail call optimization' affect the Call Stack?",
      "answer": "Tail Call Optimization (TCO) is a technique where, if a function's last action is a call to another function (the tail call), the engine can reuse the current stack frame instead of creating a new one. This prevents stack overflow in recursive functions. ES6 specifies TCO in strict mode, but not all engines implement it (V8 does not, SpiderMonkey does)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 450\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"430\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Call Stack in Action</text><text x=\"350\" y=\"60\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">LIFO - Last In, First Out</text><!-- Code being executed --><rect x=\"30\" y=\"80\" width=\"280\" height=\"340\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"170\" y=\"105\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Code Execution</text><text x=\"45\" y=\"130\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">function multiply(a, b) {</text><text x=\"55\" y=\"148\" fill=\"#98c379\" font-size=\"10\" font-family=\"monospace\">return a * b;</text><text x=\"45\" y=\"166\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">}</text><text x=\"45\" y=\"190\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">function square(n) {</text><text x=\"55\" y=\"208\" fill=\"#98c379\" font-size=\"10\" font-family=\"monospace\">return multiply(n, n);</text><text x=\"45\" y=\"226\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">}</text><text x=\"45\" y=\"250\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">function main() {</text><text x=\"55\" y=\"268\" fill=\"#e5c07b\" font-size=\"10\" font-family=\"monospace\">const result = square(5);</text><text x=\"55\" y=\"286\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">console.log(result);</text><text x=\"45\" y=\"304\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">}</text><text x=\"45\" y=\"330\" fill=\"#d19a66\" font-size=\"10\" font-family=\"monospace\">main();  // Execution starts here</text><!-- Call Stack visualization --><rect x=\"350\" y=\"80\" width=\"320\" height=\"340\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"510\" y=\"105\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Call Stack (LIFO)</text><!-- Step 1: Global --><rect x=\"370\" y=\"120\" width=\"280\" height=\"55\" rx=\"4\" fill=\"#222639\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"510\" y=\"140\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"10\" font-weight=\"bold\">GLOBAL EXECUTION CONTEXT</text><text x=\"510\" y=\"158\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"9\">main() called -> push square(5)</text><text x=\"385\" y=\"172\" fill=\"#5f6578\" font-size=\"8\">(always at bottom)</text><!-- Step 2: main() --><rect x=\"370\" y=\"190\" width=\"280\" height=\"28\" rx=\"4\" fill=\"rgba(251,191,36,0.1)\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"510\" y=\"209\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\" font-family=\"monospace\">main()</text><!-- Step 3: square() --><rect x=\"370\" y=\"228\" width=\"280\" height=\"28\" rx=\"4\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"510\" y=\"247\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\" font-family=\"monospace\">square(n = 5)</text><!-- Step 4: multiply() - TOP --><rect x=\"370\" y=\"266\" width=\"280\" height=\"28\" rx=\"4\" fill=\"rgba(248,113,113,0.12)\" stroke=\"#f87171\" stroke-width=\"2\"/><text x=\"510\" y=\"285\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"10\" font-family=\"monospace\">multiply(a = 5, b = 5)  <- TOP</text><!-- Arrow pointing to top --><line x1=\"510\" y1=\"298\" x2=\"510\" y2=\"315\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><text x=\"520\" y=\"325\" fill=\"#f87171\" font-size=\"9\">Currently executing</text><!-- Step 5: return (popping) --><rect x=\"370\" y=\"345\" width=\"280\" height=\"55\" rx=\"4\" fill=\"#222639\" stroke=\"#34d399\" stroke-width=\"1\" stroke-dasharray=\"3\"/><text x=\"510\" y=\"365\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">After multiply returns:</text><text x=\"385\" y=\"385\" fill=\"#9aa0b0\" font-size=\"9\">multiply popped -> square returns 25</text><text x=\"385\" y=\"398\" fill=\"#9aa0b0\" font-size=\"9\">square popped -> main logs 25 -> done</text></svg>",
  "codeExamples": [
    {
      "title": "Visualizing Stack Frames with console.trace()",
      "useCase": "Debugging call chains",
      "code": "function first() {\n  second();\n}\n\nfunction second() {\n  third();\n}\n\nfunction third() {\n  console.trace('Stack trace:');\n  // Prints:\n  // Stack trace:\n  //   third\n  //   second\n  //   first\n  //   (anonymous)\n}\n\nfirst();",
      "description": "console.trace() prints the current Call Stack. The most recent call is listed first. This is invaluable for understanding how execution reached a particular point in the code."
    },
    {
      "title": "Stack Overflow from Infinite Recursion",
      "useCase": "Understanding stack limits",
      "code": "function recurse(depth = 1) {\n  console.log('Depth:', depth);\n  try {\n    recurse(depth + 1);\n  } catch (e) {\n    console.log('Max depth reached:', depth);\n    console.log('Error:', e.message);\n  }\n}\n\nrecurse();\n// Output:\n// Depth: 1\n// Depth: 2\n// ... (until ~10,000)\n// Max depth reached: 10473\n// Error: Maximum call stack size exceeded",
      "description": "Each recursive call pushes a new frame onto the Call Stack. When the stack limit is exceeded, a RangeError is thrown. Wrapping the recursive call in try/catch allows graceful handling."
    },
    {
      "title": "Call Stack Unwinding with Error Propagation",
      "useCase": "Error handling and stack traces",
      "code": "function A() {\n  B();\n}\n\nfunction B() {\n  C();\n}\n\nfunction C() {\n  throw new Error('Something went wrong in C');\n}\n\ntry {\n  A();\n} catch (err) {\n  console.log(err.message);\n  console.log(err.stack);\n  // Stack trace:\n  // at C (file.js:X:Y)\n  // at B (file.js:X:Y)\n  // at A (file.js:X:Y)\n  // at (anonymous) (file.js:X:Y)\n}\n\nconsole.log('Program continues...');  // This still runs",
      "description": "When an error is thrown, the Call Stack unwinds until a catch block is found. The stack trace shows the path execution took, with the error origin at the top."
    },
    {
      "title": "Recursive Factorial with and without Tail Call",
      "useCase": "Stack optimization patterns",
      "code": "// Standard recursion - builds up stack frames\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n  // Not tail-call: needs to multiply result after return\n}\n\nconsole.log(factorial(5));  // 120\n\n// Tail-call recursive (with helper)\nfunction factorialTCO(n, acc = 1) {\n  if (n <= 1) return acc;\n  return factorialTCO(n - 1, n * acc);\n  // Tail-call: returns directly, no computation after\n}\n\nconsole.log(factorialTCO(5));  // 120\n\n// Iterative - no stack concerns\nfunction factorialIterative(n) {\n  let result = 1;\n  for (let i = 2; i <= n; i++) result *= i;\n  return result;\n}",
      "description": "Standard recursion creates N stack frames. If TCO is supported, the tail-call version reuses a single frame. The iterative version uses no extra frames and is typically preferred for production code."
    },
    {
      "title": "Call Stack and the Event Loop",
      "useCase": "Synchronous vs asynchronous execution",
      "code": "console.log('Start');  // Stack: [global, log]\n\nsetTimeout(() => {\n  console.log('Timeout callback');\n}, 0);\n// Timer starts, callback goes to Macrotask Queue\n// NOT on the Call Stack yet\n\nPromise.resolve().then(() => {\n  console.log('Promise callback');\n});\n// .then() callback goes to Microtask Queue\n// NOT on the Call Stack yet\n\nconsole.log('End');  // Stack: [global, log]\n\n// Call Stack empty now\n// Event Loop: check Microtask Queue first\n// -> 'Promise callback'\n// Event Loop: then check Macrotask Queue\n// -> 'Timeout callback'\n\n// Output:\n// Start\n// End\n// Promise callback\n// Timeout callback",
      "description": "Synchronous code runs immediately on the Call Stack. Async callbacks (setTimeout, Promise.then) are queued and only execute when the Call Stack is empty. This is the core of JavaScript's concurrency model."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What data structure does the Call Stack use?",
      "options": ["FIFO (First In, First Out)", "LIFO (Last In, First Out)", "Priority Queue", "Binary Tree"],
      "answer": 1,
      "explanation": "The Call Stack uses LIFO — the last function pushed onto the stack is the first one to be popped off when it returns."
    },
    {
      "question": "What is a stack frame?",
      "options": ["A single line of code", "The execution context of a function call on the stack", "The global object", "A closure's memory allocation"],
      "answer": 1,
      "explanation": "A stack frame represents one function's execution context on the Call Stack, containing its variables, parameters, and return address."
    },
    {
      "question": "What causes 'Maximum call stack size exceeded'?",
      "options": ["Too many variables in a function", "Infinite recursion or excessively deep call chains", "Too many event listeners", "Memory leak in closures"],
      "answer": 1,
      "explanation": "This error occurs when the number of stack frames exceeds the engine's limit, most commonly due to infinite recursion or very deep recursive calls."
    },
    {
      "question": "Where does the Global Execution Context sit on the Call Stack?",
      "options": ["At the top", "At the bottom", "In the middle", "It is not on the Call Stack"],
      "answer": 1,
      "explanation": "The Global Execution Context is always at the bottom of the Call Stack. It is pushed when the script starts and popped only when the program terminates."
    },
    {
      "question": "What happens to the Call Stack when an error is thrown inside a function with no try/catch?",
      "options": ["Only the current frame is removed", "The stack unwinds until it reaches the global context or a catch block", "The stack freezes for debugging", "All frames above the error are moved to the heap"],
      "answer": 1,
      "explanation": "When an uncaught error occurs, the Call Stack unwinds — frames are popped one by one — until the engine reaches either a matching catch block or the Global Execution Context."
    },
    {
      "question": "Why does setTimeout(callback, 0) NOT execute the callback immediately?",
      "options": ["The timer needs time to start", "The callback must wait for the Call Stack to be empty", "setTimeout always has a 1ms minimum delay", "The callback is executed in a different thread"],
      "answer": 1,
      "explanation": "Even with 0ms delay, the callback goes to the Macrotask Queue. It only executes when the Event Loop finds the Call Stack empty, after all synchronous code and microtasks are done."
    },
    {
      "question": "What is the typical maximum stack depth in V8 (Chrome/Node.js)?",
      "options": ["100-200 frames", "1,000-2,000 frames", "10,000-15,000 frames", "1,000,000+ frames"],
      "answer": 2,
      "explanation": "V8 typically allows about 10,000-15,000 stack frames before throwing a stack overflow error. The exact number depends on available memory and frame size."
    },
    {
      "question": "What is the difference between synchronous and asynchronous code regarding the Call Stack?",
      "options": ["Both execute the same way on the stack", "Sync code executes directly on the stack; async callbacks wait in queues until the stack is empty", "Async code has its own separate stack", "Sync code uses the heap instead of the stack"],
      "answer": 1,
      "explanation": "Synchronous code runs immediately on the Call Stack. Asynchronous callbacks are queued in task queues (microtask or macrotask) and only execute when the Event Loop detects the Call Stack is empty."
    },
    {
      "question": "Which of the following would cause a stack overflow?",
      "options": ["An infinite for loop", "A function calling itself without a base case", "A while(true) loop", "An array with 1 million elements"],
      "answer": 1,
      "explanation": "Infinite loops (for/while) do not use the Call Stack — they run synchronously in a single frame. Recursion without a base case pushes new frames indefinitely, causing stack overflow."
    },
    {
      "question": "What is tail call optimization (TCO)?",
      "options": ["Making function names shorter", "Reusing the current stack frame when a function's last action is calling another function", "Caching function results", "Inlining small functions for performance"],
      "answer": 1,
      "explanation": "TCO allows the engine to reuse the current stack frame for a tail call (a function call that is the last action of the enclosing function), preventing stack growth in recursive patterns."
    }
  ]
}
;
TOPICS_DATA["javascript"]["call"] = {
  "title": "call()",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,

  "tldr": [
    "<code>call()</code> is a method on all functions that calls the function with a specified <code>this</code> value and arguments provided <strong>individually</strong> (comma-separated).",
    "It allows you to <strong>borrow methods</strong> from one object and use them on another, and to explicitly control what <code>this</code> refers to.",
    "Syntax: <code>fn.call(thisArg, arg1, arg2, ...)</code> — the function is invoked <strong>immediately</strong>.",
    "<code>call()</code> is similar to <code>apply()</code>, but <code>apply()</code> takes arguments as an <strong>array</strong>."
  ],

  "laymanDefinition": "Imagine you have a friend who is really good at fixing bikes. You don't know how to fix your own bike. With call(), it's like saying, 'Hey, bike-fixer friend, come over to my house and use my tools to fix my bike.' Your friend (the function) has a skill (the code), but you're saying 'Do it on my bike (this object) instead of yours.' More practically, call() lets you take a method from one object and run it 'as if' it belonged to a different object, passing in the arguments one by one.",
    
  "deepDive": [
    {
      "heading": "How call() Works Internally",
      "text": "When fn.call(thisArg, ...args) is called, the JavaScript engine internally performs a [[Call]] operation on fn. The thisArg becomes the 'this' value for the function execution. The remaining arguments are spread into the function's parameter list. If thisArg is null or undefined, 'this' defaults to the global object (or undefined in strict mode). If thisArg is a primitive, it is wrapped in its object wrapper (e.g., a string becomes a String object)."
    },
    {
      "heading": "Method Borrowing Pattern",
      "text": "One of the most powerful uses of call() is borrowing methods. For example, array methods can be called on array-like objects (like the arguments object, NodeLists, or any object with length and numeric properties). Array.prototype.slice.call(arguments, 0) converts the arguments object to a real array. Similarly, Object.prototype.toString.call(obj) gives the reliable [[Class]] tag like '[object Array]'."
    },
    {
      "heading": "call() vs Direct Invocation",
      "text": "A direct function call fn() is equivalent to fn.call(undefined) in non-strict mode or fn.call(undefined) in strict mode (where 'this' is actually undefined). The key difference is that call() gives you explicit control over 'this'. Without call(), you rely on implicit binding (how the function is called), which may not always give you the desired 'this'."
    },
    {
      "heading": "Primitive thisArg Boxing",
      "text": "When you pass a primitive value as thisArg to call(), JavaScript wraps it in the corresponding object type. For example, call('hello') boxes the string to a String object. This is why you can borrow methods that expect object 'this' values even when you only have primitives. However, in strict mode, primitives are not boxed — they are passed as-is, which may cause TypeErrors."
    },
    {
      "heading": "call() for Inheritance (Super Calls)",
      "text": "In constructor functions, call() is used to call the parent constructor with the current instance's 'this'. This enables constructor stealing: Parent.call(this, ...args) inside Child constructor sets up Parent's properties on the Child instance. This pattern was common before ES6 classes, where super() handles this automatically."
    }
  ],

  "interviewAnswer": "call() is a function method that immediately invokes the function with a specified 'this' value and arguments passed individually. Its primary use cases are: 1) Explicitly setting 'this' — overriding the default binding rules. 2) Method borrowing — using methods from one object on another object (e.g., Array.prototype.slice.call(arguments)). 3) Constructor chaining — calling a parent constructor from a child constructor. 4) Reliable type checking — Object.prototype.toString.call(val) for precise type detection. The key characteristic of call() is that arguments are passed as a comma-separated list (unlike apply() which uses an array). It's essential to understand call() for mastering 'this' binding, method borrowing, and working with array-like objects.",

  "interviewQuestions": [
    {
      "question": "What does call() do?",
      "answer": "call() invokes a function with a given 'this' value and arguments passed individually (comma-separated). Syntax: fn.call(thisArg, arg1, arg2, ...). It's used for explicit 'this' binding and method borrowing."
    },
    {
      "question": "What is the difference between call() and apply()?",
      "answer": "Both call() and apply() invoke a function immediately with a specified 'this'. The difference is in how arguments are passed: call() takes arguments as a comma-separated list (fn.call(obj, 1, 2, 3)), while apply() takes arguments as an array (fn.apply(obj, [1, 2, 3]))."
    },
    {
      "question": "How do you convert the arguments object to an array using call()?",
      "answer": "Array.prototype.slice.call(arguments) converts the array-like 'arguments' object into a real array. The arguments object has numeric indices and a length property, so slice() can operate on it. In modern JavaScript, Array.from() or the spread operator (...arguments) are preferred."
    },
    {
      "question": "What is method borrowing? Give an example.",
      "answer": "Method borrowing is taking a method from one object and using it on another object with call(): <code>const arrLike = { 0: 'a', 1: 'b', length: 2 };\nconst arr = Array.prototype.slice.call(arrLike, 0);\nconsole.log(arr); // ['a', 'b']</code>"
    },
    {
      "question": "How do you use call() for constructor chaining?",
      "answer": "In constructor functions, call() is used to invoke a parent constructor on the current instance: <code>function Parent(name) { this.name = name; }\nfunction Child(name, age) {\n  Parent.call(this, name); // Parent runs on Child instance\n  this.age = age;\n}\nconst c = new Child('Alice', 10);\nconsole.log(c.name); // 'Alice'</code>"
    },
    {
      "question": "What happens if you pass null or undefined as the thisArg to call()?",
      "answer": "In non-strict mode, null or undefined causes 'this' to default to the global object (window in browsers). In strict mode, 'this' remains null or undefined — it is not coerced to the global object."
    },
    {
      "question": "How can call() be used for reliable type checking?",
      "answer": "Object.prototype.toString.call(value) returns a string like '[object Array]', '[object Object]', '[object Function]', etc. This is more reliable than typeof because it distinguishes between arrays, objects, and null. For example, Object.prototype.toString.call([]) returns '[object Array]'."
    },
    {
      "question": "Can call() be used on methods that don't exist on the target object?",
      "answer": "Yes. call() simply invokes a function with a specified 'this'. The function doesn't need to be a method of the target object. The target object is used as 'this' inside the function body. If the function accesses properties that don't exist on the target, they will be undefined."
    },
    {
      "question": "How does call() handle primitive thisArg values?",
      "answer": "In non-strict mode, primitive values (string, number, boolean) are 'boxed' — converted to their object wrappers (String, Number, Boolean). In strict mode, primitives are used as-is. For example, fn.call('hello') passes a String object as 'this' in non-strict mode, but the primitive string 'hello' in strict mode."
    },
    {
      "question": "What is the performance implication of using call()?",
      "answer": "call() has a small performance cost compared to direct invocation because it involves additional argument handling and 'this' resolution. However, modern JavaScript engines heavily optimize call() and apply() with inline caching. The performance difference is negligible for most applications. The main cost is when call() is used in hot loops or with very large argument lists."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 400\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"380\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"16\" font-weight=\"bold\">Function.prototype.call() — Flow</text><!-- Function box --><rect x=\"60\" y=\"65\" width=\"220\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"170\" y=\"90\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">fn (any function)</text><text x=\"170\" y=\"110\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">fn.call(thisArg, a, b, c)</text><text x=\"170\" y=\"130\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"11\">Call the function...</text><!-- Arrow --><line x1=\"280\" y1=\"105\" x2=\"340\" y2=\"105\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><text x=\"310\" y=\"95\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\">.call()</text><!-- Right side boxes --><rect x=\"340\" y=\"65\" width=\"300\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"490\" y=\"85\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold\">Effect on Function Execution</text><text x=\"490\" y=\"108\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">1. this = thisArg (explicit)</text><text x=\"490\" y=\"128\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">2. params: (a, b, c) as given</text><line x1=\"350\" y1=\"155\" x2=\"350\" y2=\"185\" stroke=\"#98c379\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"80\" y=\"185\" width=\"560\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"360\" y=\"207\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"13\" font-weight=\"bold\">Example: greet.call(alice, 'Hello', '!')</text><text x=\"360\" y=\"227\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">1. this inside greet = alice object</text><text x=\"360\" y=\"245\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">2. greet receives: greeting='Hello', punctuation='!'</text><line x1=\"360\" y1=\"265\" x2=\"360\" y2=\"295\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"295\" width=\"440\" height=\"50\" rx=\"25\" fill=\"url(#g1)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"360\" y=\"320\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"14\">Immediate: function is invoked RIGHT NOW</text></svg>",

  "codeExamples": [
    {
      "title": "Basic call() Usage",
      "useCase": "Explicit this Binding",
      "code": "const alice = { name: 'Alice' };\nconst bob   = { name: 'Bob' };\n\nfunction greet(greeting) {\n  return `${greeting}, ${this.name}!`;\n}\n\nconsole.log(greet.call(alice, 'Hello')); // 'Hello, Alice!'\nconsole.log(greet.call(bob, 'Hi'));      // 'Hi, Bob!'\n\n// Without call() — this is undefined/global:\n// console.log(greet('Hello')); // 'Hello, undefined!' or error",
      "description": "call() lets us pass different 'this' values to the same function. The function can be used with any object that has a 'name' property."
    },
    {
      "title": "Method Borrowing: Array Methods on Array-Like Objects",
      "useCase": "Converting Array-Like to Array",
      "code": "function sum() {\n  // 'arguments' is array-like, not a real array\n  // We borrow slice from Array.prototype\n  const args = Array.prototype.slice.call(arguments, 0);\n  \n  // Now args is a real array with all array methods\n  return args.reduce((total, n) => total + n, 0);\n}\n\nconsole.log(sum(1, 2, 3, 4, 5)); // 15\n\n// Also works with NodeLists and HTMLCollections:\n// const divs = document.querySelectorAll('div');\n// const divArray = Array.prototype.slice.call(divs);",
      "description": "call() enables method borrowing. Array.prototype methods work on any array-like object with length and numeric indices."
    },
    {
      "title": "Constructor Chaining with call()",
      "useCase": "Inheritance Pattern",
      "code": "function Animal(type) {\n  this.type = type;\n  this.isAlive = true;\n}\n\nfunction Dog(name, breed) {\n  // Call parent constructor on 'this' instance\n  Animal.call(this, 'mammal');\n  \n  this.name = name;\n  this.breed = breed;\n}\n\nconst dog = new Dog('Buddy', 'Golden Retriever');\nconsole.log(dog.type);    // 'mammal' (set by Animal.call)\nconsole.log(dog.name);    // 'Buddy'\nconsole.log(dog.isAlive); // true",
      "description": "Animal.call(this, 'mammal') runs the Animal constructor on the new Dog instance, setting up inherited properties. This is constructor stealing."
    },
    {
      "title": "Reliable Type Detection with toString.call()",
      "useCase": "Accurate Type Checking",
      "code": "function getType(value) {\n  return Object.prototype.toString.call(value).slice(8, -1);\n}\n\nconsole.log(getType([]));           // 'Array'\nconsole.log(getType({}));           // 'Object'\nconsole.log(getType('hello'));      // 'String'\nconsole.log(getType(42));           // 'Number'\nconsole.log(getType(null));         // 'Null'\nconsole.log(getType(undefined));    // 'Undefined'\nconsole.log(getType(function(){})); // 'Function'\nconsole.log(getType(new Date()));   // 'Date'\n\n// More reliable than typeof:\n// typeof []        → 'object' (wrong)\n// typeof null      → 'object' (wrong!)",
      "description": "Object.prototype.toString.call() returns precise type strings like '[object Array]'. This is more accurate than typeof for arrays, null, and other objects."
    },
    {
      "title": "call() with Math Methods on Custom Objects",
      "useCase": "Borrowing Built-in Methods",
      "code": "const customObj = {\n  0: 10,\n  1: 20,\n  2: 30,\n  length: 3\n};\n\n// Borrow Math.max on array-like object\nconst maxVal = Math.max.call(null, ...Array.from(customObj));\nconsole.log(maxVal); // 30\n\n// More practically: borrow .push on array-like\nconst arrLike = { 0: 'a', 1: 'b', length: 2 };\nArray.prototype.push.call(arrLike, 'c');\nconsole.log(arrLike); // { 0: 'a', 1: 'b', 2: 'c', length: 3 }\n\n// But prefer modern alternatives:\n// const realArr = Array.from(customObj);\n// const realMax = Math.max(...realArr);",
      "description": "call() works with any function, including built-ins. You can borrow methods like push or Math.max to work with custom objects. However, modern ES6+ features often provide cleaner alternatives."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What does call() do?",
      "options": ["Creates a new function bound to this", "Immediately invokes a function with specified this and comma-separated args", "Calls a function asynchronously", "Returns a new array"],
      "answer": 1,
      "explanation": "call() immediately invokes the function with a specified 'this' value and arguments passed as a comma-separated list."
    },
    {
      "question": "What is the difference between call() and apply()?",
      "options": ["call() is faster than apply()", "call() takes arguments individually, apply() takes an array", "call() does not accept thisArg, apply() does", "There is no difference"],
      "answer": 1,
      "explanation": "Both invoke the function immediately. call() takes arguments as a comma-separated list (fn.call(obj, 1, 2)), while apply() takes them as an array (fn.apply(obj, [1, 2]))."
    },
    {
      "question": "What will the following log? function f() { console.log(this.x); } const obj = { x: 1 }; f.call(obj);",
      "options": ["undefined", "1", "window.x", "ReferenceError"],
      "answer": 1,
      "explanation": "call() sets 'this' to obj inside the function, so this.x is obj.x which is 1."
    },
    {
      "question": "What does Array.prototype.slice.call(arguments) do?",
      "options": ["Returns the first argument", "Converts the arguments object to a real array", "Calls slice on each element", "Returns the arguments as a string"],
      "answer": 1,
      "explanation": "This borrows Array.prototype.slice and calls it with the arguments object as 'this'. Since arguments is array-like, slice() converts it to a real array."
    },
    {
      "question": "What happens when you pass null as thisArg to call() in non-strict mode?",
      "options": ["It throws a TypeError", "'this' becomes the global object", "'this' becomes null", "The function is not called"],
      "answer": 1,
      "explanation": "In non-strict mode, null or undefined as thisArg causes 'this' to default to the global object (window in browsers)."
    },
    {
      "question": "How do you use call() for constructor chaining?",
      "options": ["Child.call(Parent, args)", "Parent.call(this, args)", "Parent.call(Child, args)", "call(Parent, this, args)"],
      "answer": 1,
      "explanation": "Parent.call(this, ...args) inside a Child constructor runs the Parent constructor on the current Child instance, setting up inherited properties on this."
    },
    {
      "question": "What is method borrowing?",
      "options": ["Copying all methods of an object", "Using a method from one object on another via call/apply", "Creating a new method on an object", "Deleting a method from an object"],
      "answer": 1,
      "explanation": "Method borrowing is the pattern of taking a method from one object (like Array.prototype.slice) and calling it on another object (like arguments) using call() or apply()."
    },
    {
      "question": "What will this return? Object.prototype.toString.call([]);",
      "options": ["'[object Array]'", "'array'", "'[object Object]'", "'Array'"],
      "answer": 0,
      "explanation": "Object.prototype.toString.call() returns a string in the format '[object Type]'. For arrays, it returns '[object Array]'."
    },
    {
      "question": "Does call() modify the original function?",
      "options": ["Yes, it permanently changes this", "No, the original function is unchanged", "Only in strict mode", "It depends on the arguments"],
      "answer": 1,
      "explanation": "call() does not modify the function. It only controls the 'this' value for that particular invocation."
    },
    {
      "question": "How do you call a function with multiple arguments using call()?",
      "options": ["fn.call(obj, ...args)", "fn.call(obj, arg1, arg2, arg3)", "fn.call(obj, [arg1, arg2, arg3])", "Both A and B"],
      "answer": 1,
      "explanation": "call() requires arguments to be passed individually (comma-separated). To pass an array of arguments, use apply() or the spread operator with call()."
    }
  ]
}
;
TOPICS_DATA["javascript"]["closures"] = {
  "title": "Closures",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,

  "tldr": [
    "A <strong>closure</strong> is a function that <strong>remembers</strong> the variables from its lexical scope even after the outer function has returned.",
    "Closures are created every time a function is defined inside another function and the inner function references variables from the outer function.",
    "They enable <strong>data privacy</strong>, <strong>function factories</strong>, <strong>currying</strong>, and <strong>callback preservation</strong>.",
    "Closures are <strong>not</strong> a feature you explicitly create -- they are a natural behavior of JavaScript's lexical scoping."
  ],

  "laymanDefinition": "Imagine you have a backpack. When you leave your house, you put a few items in it -- a snack, a phone charger, a book. Even after you leave your house far behind, you still have those items with you. A closure is like that backpack for a function. A function can carry variables from its birthplace (where it was defined) with it, even after the birthplace has been destroyed or is no longer accessible. This means a function can remember and use variables from the place it was created, long after that place is gone.",

  "deepDive": [
    {
      "heading": "Lexical Scoping: The Foundation",
      "text": "JavaScript uses lexical scoping, which means that the scope of a variable is determined by its location in the source code. When a function is defined, it captures a reference to its outer environment -- specifically, the variable environment of the enclosing function or global scope."
    },
    {
      "heading": "How Closures Work Internally",
      "text": "Every JavaScript function has an internal property called [[Environment]] that stores a reference to the environment in which the function was created. When the function executes, it creates a new execution context with its own variable environment, but it also retains a link to the outer environment via [[Environment]]. This chain of environment records forms the scope chain. A closure is formed when an inner function maintains a reference to variables from an outer scope that would otherwise have been garbage collected."
    },
    {
      "heading": "The Relationship Between Closures and Garbage Collection",
      "text": "Normally, when a function finishes executing, its local variables are eligible for garbage collection. However, if an inner function holds a reference to those variables (via closure), the JavaScript engine must keep those variables alive in memory. This is why closures can cause memory leaks if not used carefully -- the referenced variables cannot be garbage collected as long as the closure exists."
    },
    {
      "heading": "Common Use Cases",
      "list": [
        "<strong>Data Privacy / Module Pattern:</strong> Encapsulate private variables that cannot be accessed from outside the function.",
        "<strong>Function Factories:</strong> Create functions with preset arguments or behaviors.",
        "<strong>Event Handlers & Callbacks:</strong> Preserve state across asynchronous operations.",
        "<strong>Currying & Partial Application:</strong> Transform functions that take multiple arguments into a sequence of functions.",
        "<strong>Memoization:</strong> Cache function results based on arguments."
      ]
    },
    {
      "heading": "Closures in Loops: The Classic Pitfall",
      "text": "The most famous closure bug occurs when creating functions inside a loop using var (function-scoped). Each iteration shares the same variable binding, so by the time the callback runs, the loop variable has already reached its final value. The fix is to use let (block-scoped, creates a new binding per iteration) or wrap the closure in an IIFE that captures the current value."
    }
  ],

  "interviewAnswer": "A closure is the combination of a function bundled together with references to its lexical environment. In JavaScript, every function has access to variables from its outer scope even after the outer function has returned. This happens because functions carry an internal reference to the environment in which they were created, called [[Environment]]. Closures are fundamental to JavaScript because they enable data encapsulation, function factories, partial application, and stateful callbacks. For example, when a function is returned from another function, it retains access to the outer function's variables -- that is a closure in action. Understanding closures is essential for writing secure, modular, and efficient JavaScript code.",

  "interviewQuestions": [
    {
      "question": "What is a closure in JavaScript? Provide a code example.",
      "answer": "A closure is a function that retains access to its lexical scope even when executed outside that scope. <strong>Example:</strong><br/><br/><pre><code>function outer(x) {\n  return function inner(y) {\n    return x + y;\n  };\n}\nconst add5 = outer(5);\nconsole.log(add5(3)); // 8\n</code></pre><br/>Here, <code>inner</code> closes over <code>x</code> from <code>outer</code>'s scope. Even after <code>outer</code> has returned, <code>add5</code> retains access to <code>x = 5</code>."
    },
    {
      "question": "How do closures relate to the module pattern?",
      "answer": "The module pattern uses closures to create private variables and expose only a public API. <strong>Example:</strong><br/><br/><pre><code>const Counter = (function() {\n  let count = 0; // private variable\n  return {\n    increment() { count++; },\n    decrement() { count--; },\n    getCount() { return count; }\n  };\n})();\nCounter.increment();\nconsole.log(Counter.getCount()); // 1\nconsole.log(Counter.count); // undefined\n</code></pre><br/>The <code>count</code> variable is only accessible via the returned methods because those methods form closures over the IIFE's scope."
    },
    {
      "question": "What is the closure loop problem and how do you fix it?",
      "answer": "When using <code>var</code> inside a loop, all callbacks share the same variable binding, so they all see the final value. <strong>Problem:</strong><br/><br/><pre><code>for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n} // logs 3, 3, 3\n</code></pre><br/><strong>Fix 1 -- Use <code>let</code> (block scoping):</strong><br/><br/><pre><code>for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n} // logs 0, 1, 2\n</code></pre><br/><strong>Fix 2 -- IIFE wrapper:</strong><br/><br/><pre><code>for (var i = 0; i < 3; i++) {\n  ((j) => setTimeout(() => console.log(j), 100))(i);\n} // logs 0, 1, 2\n</code></pre>"
    },
    {
      "question": "Can closures cause memory leaks? How?",
      "answer": "Yes, closures can cause memory leaks when they unintentionally retain references to large objects that should be garbage collected. If a closure maintains a reference to a large data structure or DOM element, that data cannot be freed until the closure itself is released. <strong>Example of a leak:</strong><br/><br/><pre><code>function setupHandler() {\n  const largeData = new Array(1000000).fill('x');\n  document.getElementById('btn').onclick = function() {\n    console.log('clicked'); // closure over largeData\n  };\n}\n</code></pre><br/>The click handler's closure keeps <code>largeData</code> alive as long as the DOM element exists. <strong>Fix:</strong> Nullify the reference when no longer needed: <code>largeData = null</code>."
    },
    {
      "question": "Explain the difference between a closure and a regular function.",
      "answer": "A regular function with no free variables (variables from an outer scope) behaves the same regardless of where it is called. A closure, by contrast, captures and retains access to variables from its defining scope. This means a closure's behavior depends not just on its arguments but also on the captured lexical state. In practice, all functions in JavaScript are closures because they always have access to the global scope -- but the term 'closure' usually refers to functions that close over non-global, non-parameter variables from an enclosing function scope."
    },
    {
      "question": "How does JavaScript handle closure creation under the hood (engine level)?",
      "answer": "When a function is parsed, the JavaScript engine creates a function object with an internal [[Environment]] slot that references the current lexical environment. When the inner function is later invoked, its execution context's outer environment reference is set to [[Environment]], forming the scope chain. Variables referenced in the inner function are allocated on the heap rather than the stack (a process called 'heap allocation' or 'closure allocation') so they persist after the outer function returns. Modern engines use optimization techniques like 'local variable allocation analysis' to determine which variables need to live on the heap and which can stay on the stack."
    },
    {
      "question": "What is a 'function factory' and how do closures enable it?",
      "answer": "A function factory is a function that returns a new function with specific behavior configured by the factory's arguments. Closures make this possible because the returned function retains access to the factory's arguments. <strong>Example:</strong><br/><br/><pre><code>function multiply(factor) {\n  return function(number) {\n    return number * factor;\n  };\n}\nconst double = multiply(2);\nconst triple = multiply(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15\n</code></pre><br/><code>factor</code> is captured by each returned function via closure."
    },
    {
      "question": "How do closures work with async/await and promises?",
      "answer": "Closures are essential for preserving state in asynchronous code. A callback passed to <code>.then()</code> or defined inside an <code>async</code> function captures variables from its surrounding scope. <strong>Example:</strong><br/><br/><pre><code>function fetchUser(id) {\n  const baseUrl = 'https://api.example.com';\n  return fetch(`${baseUrl}/users/${id}`)\n    .then(res => res.json())\n    .then(data => {\n      console.log(`User ${id}:`, data); // `id` is captured via closure\n    });\n}\n</code></pre><br/>The <code>id</code> parameter and <code>baseUrl</code> are available inside the promise chain because each <code>.then</code> callback forms a closure over the <code>fetchUser</code> scope."
    },
    {
      "question": "What is the difference between a closure and a higher-order function?",
      "answer": "A <strong>higher-order function</strong> is a function that either takes a function as an argument or returns a function. A <strong>closure</strong> is a function that retains access to its lexical scope. The two concepts often overlap -- a function factory (a higher-order function) returns a closure. However, not all higher-order functions involve closures (e.g., <code>Array.prototype.map</code> is a higher-order function but the callback may not close over anything). And not all closures are created by higher-order functions -- closures can occur in nested function definitions even without explicit returning."
    },
    {
      "question": "How do closures behave with 'this' binding?",
      "answer": "Closures capture the <strong>lexical scope</strong> (variables), not the <strong>this</strong> binding. The value of <code>this</code> inside a closure depends on how the function is called, not where it is defined. This is a common source of bugs: <br/><br/><pre><code>const obj = {\n  name: 'MyObj',\n  logName: function() {\n    return function() {\n      console.log(this.name); // undefined (or global name)\n    };\n  }\n};\nobj.logName()();\n</code></pre><br/><strong>Fix:</strong> Use an arrow function (which captures <code>this</code> lexically), or capture <code>this</code> in a variable: <code>const self = this</code>."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"boxGrad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient><linearGradient id=\"boxGrad2\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#222639\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><!-- Outer scope --><rect x=\"40\" y=\"40\" width=\"340\" height=\"180\" rx=\"8\" fill=\"url(#boxGrad1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\" stroke-dasharray=\"4\"/><text x=\"210\" y=\"68\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold>outer() -- Execution Context (Lexical Environment)</text><!-- Variable in outer --><rect x=\"65\" y=\"86\" width=\"290\" height=\"36\" rx=\"4\" fill=\"#2a2f45\" stroke=\"var(--border)\"/><text x=\"75\" y=\"110\" fill=\"#e8eaed\" font-size=\"13\" font-family=\"monospace\">let x = 10;</text><!-- Inner function definition --><rect x=\"65\" y=\"140\" width=\"290\" height=\"60\" rx=\"4\" fill=\"rgba(108,159,255,0.06)\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"75\" y=\"162\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">function inner(y) {</text><text x=\"85\" y=\"182\" fill=\"#98c379\" font-size=\"12\" font-family=\"monospace\">return x + y;</text><text x=\"75\" y=\"198\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">}</text><!-- Arrow: inner closes over x --><line x1=\"210\" y1=\"200\" x2=\"210\" y2=\"260\" stroke=\"#fbbf24\" stroke-width=\"2\" stroke-dasharray=\"4\" marker-end=\"url(#arrow)\"/><text x=\"220\" y=\"240\" fill=\"#fbbf24\" font-size=\"11\">[[Environment]] -> outer's scope</text><!-- Closure after outer returns --><rect x=\"40\" y=\"265\" width=\"340\" height=\"100\" rx=\"8\" fill=\"url(#boxGrad2)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"210\" y=\"293\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold>After outer() returns</text><text x=\"60\" y=\"320\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">const add5 = outer(5);</text><text x=\"60\" y=\"340\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">add5(3)  ->  8</text><text x=\"60\" y=\"358\" fill=\"#9aa0b0\" font-size=\"11\">inner still has x=5 via closure</text><!-- Right side: memory diagram --><rect x=\"420\" y=\"40\" width=\"260\" height=\"400\" rx=\"8\" fill=\"url(#boxGrad1)\" stroke=\"var(--border)\"/><text x=\"550\" y=\"68\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"13\" font-weight=\"bold\">Memory / Heap Retention</text><rect x=\"440\" y=\"86\" width=\"220\" height=\"60\" rx=\"4\" fill=\"#2a2f45\" stroke=\"var(--border)\"/><text x=\"450\" y=\"108\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">function outer()</text><text x=\"450\" y=\"128\" fill=\"#9aa0b0\" font-size=\"11\">Created -> executed -> popped off stack</text><line x1=\"550\" y1=\"146\" x2=\"550\" y2=\"170\" stroke=\"#6c9fff\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"440\" y=\"172\" width=\"220\" height=\"80\" rx=\"4\" fill=\"rgba(108,159,255,0.06)\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"450\" y=\"194\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">Returned closure</text><text x=\"450\" y=\"214\" fill=\"#9aa0b0\" font-size=\"11\">inner() + [[Environment]]</text><text x=\"450\" y=\"234\" fill=\"#9aa0b0\" font-size=\"11\">-> keeps x alive on HEAP</text><line x1=\"550\" y1=\"252\" x2=\"550\" y2=\"276\" stroke=\"#fbbf24\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"440\" y=\"278\" width=\"220\" height=\"60\" rx=\"4\" fill=\"rgba(251,191,36,0.06)\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"450\" y=\"300\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">Heap: x = 5</text><text x=\"450\" y=\"320\" fill=\"#9aa0b0\" font-size=\"11\">NOT garbage collected</text><line x1=\"550\" y1=\"338\" x2=\"550\" y2=\"362\" stroke=\"#34d399\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"440\" y=\"364\" width=\"220\" height=\"55\" rx=\"4\" fill=\"#2a2f45\" stroke=\"var(--border)\"/><text x=\"450\" y=\"386\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">add5 = reference to closure</text><text x=\"450\" y=\"406\" fill=\"#9aa0b0\" font-size=\"11\">x persists until add5 is GC'd</text><!-- Conclusion label --><rect x=\"100\" y=\"400\" width=\"220\" height=\"36\" rx=\"18\" fill=\"rgba(52,211,153,0.12)\" stroke=\"rgba(52,211,153,0.3)\"/><text x=\"210\" y=\"423\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\"> Closures keep variables alive on heap</text></svg><div class=\"diagram-caption\">Visualization of a closure: outer() executes, returns inner(), but inner retains access to x via [[Environment]]. Blue dashed box shows outer's scope; yellow section shows the closure persisting in memory.</div>",

  "codeExamples": [
    {
      "title": "Data Privacy via Closure (Module Pattern)",
      "useCase": "Encapsulation & Security",
      "code": "function createBankAccount(initialBalance) {\n  let balance = initialBalance; // private\n\n  return {\n    deposit(amount) {\n      if (amount > 0) balance += amount;\n      return balance;\n    },\n    withdraw(amount) {\n      if (amount > 0 && amount <= balance) {\n        balance -= amount;\n        return amount;\n      }\n      return 0;\n    },\n    getBalance() { return balance; }\n  };\n}\n\nconst account = createBankAccount(1000);\naccount.deposit(500);\nconsole.log(account.getBalance()); // 1500\nconsole.log(account.balance);      // undefined (private!)",
      "description": "The balance variable is encapsulated within the closure. No external code can directly modify it -- it can only be accessed via the returned methods. This is the foundation of data hiding in JavaScript."
    },
    {
      "title": "Function Factory: Configurable Multipliers",
      "useCase": "Code Reuse",
      "code": "function createMultiplier(factor) {\n  return (value) => value * factor;\n}\n\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconst tax = createMultiplier(1.08);\n\nconsole.log(double(10));      // 20\nconsole.log(triple(10));      // 30\nconsole.log(tax(100));        // 108",
      "description": "Each returned arrow function closes over its own 'factor' variable. This demonstrates how closures enable function factories -- creating customized functions with preset behavior."
    },
    {
      "title": "Closures in Async Operations (Callback State Preservation)",
      "useCase": "Async State Management",
      "code": "function fetchWithRetry(url, maxRetries) {\n  let attempt = 0;\n\n  function tryFetch() {\n    attempt++;\n    return fetch(url)\n      .then(res => {\n        if (!res.ok && attempt < maxRetries) {\n          console.log(`Retry ${attempt}/${maxRetries}`);\n          return tryFetch(); // recursive call, keeps closure\n        }\n        return res;\n      })\n      .catch(() => {\n        if (attempt < maxRetries) return tryFetch();\n        throw new Error(`Failed after ${maxRetries} attempts`);\n      });\n  }\n\n  return tryFetch();\n}\n\nfetchWithRetry('https://api.example.com/data', 3)\n  .then(data => console.log('Success:', data))\n  .catch(err => console.error(err));",
      "description": "The 'attempt' variable is captured by the inner tryFetch function via closure. Each recursive call increments and checks the same 'attempt' variable across multiple invocations."
    },
    {
      "title": "Currying with Closures",
      "useCase": "Partial Application / FP",
      "code": "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}\n\nconst sum = (a, b, c) => a + b + c;\nconst curriedSum = curry(sum);\n\nconsole.log(curriedSum(1)(2)(3));       // 6\nconsole.log(curriedSum(1, 2)(3));       // 6\nconsole.log(curriedSum(1, 2, 3));       // 6",
      "description": "Each call to 'curried' returns a new closure that remembers the arguments collected so far. Once all arguments are collected (args.length >= fn.length), the original function is invoked."
    },
    {
      "title": "Closure-Based Memoization (Caching)",
      "useCase": "Performance Optimization",
      "code": "function memoize(fn) {\n  const cache = new Map(); // private cache via closure\n\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      console.log('Cache hit:', key);\n      return cache.get(key);\n    }\n    console.log('Cache miss:', key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst fibonacci = memoize(function fib(n) {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n});\n\nconsole.log(fibonacci(40)); // Computed fast via memoization",
      "description": "The 'cache' Map is private to the returned function via closure. The memoized fibonacci function reuses cached results, reducing time complexity from O(2^n) to O(n)."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What will the following code log? const fns = []; for (var i = 0; i < 3; i++) { fns.push(() => console.log(i)); } fns.forEach(fn => fn());",
      "options": ["0, 1, 2", "3, 3, 3", "undefined, undefined, undefined", "1, 2, 3"],
      "answer": 1,
      "explanation": "Using 'var' creates a single function-scoped binding for 'i'. All closures reference the same variable, which has value 3 after the loop ends."
    },
    {
      "question": "Which of the following correctly fixes the closure-in-loop problem?",
      "options": [
        "Replace 'var' with 'const' in the loop header",
        "Replace 'var' with 'let' in the loop header",
        "Use a regular function instead of an arrow function",
        "Declare 'i' outside the loop"
      ],
      "answer": 1,
      "explanation": "Using 'let' creates a new block-scoped binding for each iteration, so each closure captures a different 'i' value."
    },
    {
      "question": "In the module pattern, what makes the inner variables private?",
      "options": [
        "The 'private' keyword",
        "TypeScript interfaces",
        "Closures over the IIFE scope",
        "The '#' symbol before variable names"
      ],
      "answer": 2,
      "explanation": "The IIFE creates a new scope. Returned methods form closures over that scope, making the variables accessible only to those methods and not to external code."
    },
    {
      "question": "You have a large array that a closure references. When can it be garbage collected?",
      "options": [
        "Immediately after the outer function returns",
        "When the closure function itself is garbage collected",
        "When the array is set to null inside the closure",
        "After the next garbage collection cycle regardless"
      ],
      "answer": 1,
      "explanation": "The large array is kept alive as long as the closure exists and holds a reference to it. Only when the closure is no longer referenced can both be garbage collected."
    },
    {
      "question": "What does the following code return? function outer() { let x = 10; return function inner() { return x; }; } const fn = outer(); console.log(fn());",
      "options": ["undefined", "10", "null", "ReferenceError"],
      "answer": 1,
      "explanation": "The inner function forms a closure over 'x'. Even though outer() has returned, inner() retains access to x via its [[Environment]] reference."
    },
    {
      "question": "Which statement best describes the relationship between closures and the execution context stack?",
      "options": [
        "Closed-over variables remain on the execution context stack",
        "Closed-over variables are moved from the stack to the heap",
        "The entire outer execution context remains on the stack",
        "Closures create a new stack frame"
      ],
      "answer": 1,
      "explanation": "When the engine detects that variables are referenced by inner functions, it allocates them on the heap instead of the stack so they persist after the outer function returns."
    },
    {
      "question": "What will be logged? const obj = { name: 'Alice', greet: function() { return () => this.name; } }; console.log(obj.greet()());",
      "options": ["undefined", "Alice", "'' (empty string)", "Window (global object)"],
      "answer": 1,
      "explanation": "Arrow functions capture 'this' lexically from their enclosing scope. Here, 'this' refers to 'obj' because greet() is called as a method."
    },
    {
      "question": "A function that returns a new function with some arguments pre-filled is an example of:",
      "options": ["Recursion", "Closure + Partial Application", "Event Delegation", "Prototypal Inheritance"],
      "answer": 1,
      "explanation": "The outer function's arguments are captured via closure by the returned function, enabling partial application or currying."
    },
    {
      "question": "Why does the following NOT create a closure? function add(a, b) { return a + b; }",
      "options": [
        "It uses parameters, not outer variables",
        "It does not return a function or use nested functions",
        "Both a and b",
        "It uses the 'function' keyword"
      ],
      "answer": 1,
      "explanation": "A closure requires an inner function that references variables from an outer function's scope. This is a simple function with no nesting."
    },
    {
      "question": "In React, closures are commonly used to:",
      "options": [
        "Style components",
        "Preserve values in useEffect callbacks and event handlers",
        "Create JSX elements",
        "Define CSS classes"
      ],
      "answer": 1,
      "explanation": "React hooks like useEffect and useCallback rely on closures to capture props, state, and other values at the time of render."
    }
  ]
}
;
TOPICS_DATA["javascript"]["currying"] = {
  "title": "Currying",
  "difficulty": "advanced",
  "estimatedMinutes": 25,

  "tldr": [
    "<strong>Currying</strong> transforms a function that takes multiple arguments into a sequence of nested functions, each taking a <strong>single</strong> argument.",
    "Currying is a core concept in <strong>functional programming</strong> that enables <strong>partial application</strong>, <strong>function composition</strong>, and <strong>higher-order abstractions</strong>.",
    "A curried function returns a new function for each argument until all arguments are collected, at which point the original function is called.",
    "Currying is <strong>not</strong> the same as partial application — partial application pre-fills some arguments, while currying transforms the function's calling convention."
  ],

  "laymanDefinition": "Imagine you are ordering a custom pizza. Normally, you'd say 'I want a large pizza with cheese and pepperoni' all in one sentence. Currying is like saying 'I want a size' — you get a 'size chooser'. Then you say 'large' — now you get a 'topping chooser'. Then you say 'cheese' — you get a 'meat chooser'. Finally you say 'pepperoni' — and the pizza is made. Each step locks in one decision and returns a new machine that accepts the next decision. Currying turns a function that takes everything at once into a chain of functions that each take one thing.",
    
  "deepDive": [
    {
      "heading": "Currying vs Partial Application",
      "text": "These two concepts are often confused. Currying transforms a function with N arguments into N functions each with 1 argument. Partial application pre-fills some arguments of a function, returning a function that accepts the remaining arguments. Currying is a mathematical transformation; partial application is an operation on a function. In practice, currying enables partial application — when you supply the first argument to a curried function, you get a partially applied function back."
    },
    {
      "heading": "Manual Currying Implementation",
      "text": "A curried function can be implemented manually or via a curry utility. The manual approach for a 3-argument function: function f(a) { return function(b) { return function(c) { return a + b + c; }; }; }. The general curry utility checks if the accumulated arguments meet or exceed the original function's arity (fn.length). If yes, call the function. If no, return a new function that accepts the next argument(s) and recurses."
    },
    {
      "heading": "Currying in Functional Composition",
      "text": "Currying shines when combined with function composition. In a pipeline like 'processData -> validate -> format -> display', curried functions can be partially applied with configuration, then composed together. Libraries like Ramda and lodash/fp use currying as a fundamental primitive. For example, R.map(R.add(1)) creates a function that increments every element in an array — R.add(1) is a curried function partially applied with 1."
    },
    {
      "heading": "Arity and Currying",
      "text": "A function's arity is the number of parameters it expects (fn.length). For currying to work correctly, the curry utility needs to know the target arity. Some curry implementations (like lodash) allow currying functions with any arity and terminate when all arguments are collected. Others require specifying the arity explicitly. Variadic functions (with ...rest params) cannot be curried automatically because their length is 0."
    },
    {
      "heading": "Use Cases for Currying",
      "list": [
        "<strong>Configuration Functions:</strong> Create specialized functions from general ones (e.g., const fetchWithBase = curry(fetch)(baseUrl)).",
        "<strong>Event Handlers:</strong> Pre-configure event handlers with specific parameters.",
        "<strong>Functional Composition:</strong> Transform and compose data processing pipelines.",
        "<strong>Redux Selectors:</strong> Curried selectors enable parameterized state access.",
        "<strong>Validation:</strong> Create reusable validation chains with curried validators."
      ]
    }
  ],

  "interviewAnswer": "Currying is the transformation of a function that takes multiple arguments into a sequence of functions that each take a single argument. The curried function returns a new function for each argument until all arguments are provided, at which point the original function is invoked. For example, a function f(a, b, c) becomes f(a)(b)(c). Currying is distinct from partial application: currying changes the calling convention, while partial application pre-fills arguments. In JavaScript, currying is achieved through closures — each returned function captures the accumulated arguments. Currying enables powerful functional programming patterns like function composition, reusable configuration, and parameterized callbacks. Libraries like lodash/fp and Ramda provide curry utilities, or you can implement one manually using closures and fn.length.",

  "interviewQuestions": [
    {
      "question": "What is currying in JavaScript?",
      "answer": "Currying transforms a function that takes multiple arguments into a chain of functions that each take a single argument. Example: function add(a, b, c) { return a + b + c; } becomes function curriedAdd(a) { return function(b) { return function(c) { return a + b + c; }; }; }. Called as curriedAdd(1)(2)(3) // 6."
    },
    {
      "question": "What is the difference between currying and partial application?",
      "answer": "Currying transforms a multi-argument function into a sequence of single-argument functions. Partial application pre-fills some arguments of a function, returning a new function that accepts the remaining arguments. Currying is a transformation; partial application is an operation. Currying enables partial application naturally."
    },
    {
      "question": "How does a curry utility function work?",
      "answer": "A curry utility checks if the number of collected arguments (args.length) is >= the original function's arity (fn.length). If yes, it calls the function. If no, it returns a new function that accepts more arguments, concatenates them, and recursively checks again. This uses closures to accumulate arguments."
    },
    {
      "question": "Can variadic functions be curried?",
      "answer": "Variadic functions (with ...rest params) have fn.length of 0, so automatic curry utilities cannot determine their arity. You need to explicitly specify the arity or use a different approach. For example, lodash's curry(fn, arity) accepts an optional arity parameter."
    },
    {
      "question": "How does currying enable function composition?",
      "answer": "Currying allows you to partially apply functions to create single-argument functions that can be composed with pipe/compose: <code>const add1 = curry(add)(1);\nconst double = curry(multiply)(2);\nconst add1ThenDouble = pipe(add1, double);\nadd1ThenDouble(5); // 12</code> Each curried function returns a unary function suitable for composition."
    },
    {
      "question": "What is the relationship between closures and currying?",
      "answer": "Currying is implemented using closures. Each returned function closes over the previously collected arguments. When you call curriedAdd(1), it returns a function that has 'a' captured in its closure. When you call that function with (2), it returns a function with both 'a' and 'b' captured, and so on."
    },
    {
      "question": "How do you implement a simple curry function?",
      "answer": "<code>function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}</code> This returns a new function that collects arguments until enough are provided."
    },
    {
      "question": "What is an example of currying in a real library?",
      "answer": "Lodash/fp and Ramda use currying extensively. For example, in Ramda: <code>const add1 = R.add(1); // curried, returns function\nconst double = R.multiply(2);\nconst result = R.pipe(add1, double)(5); // 12\nR.map(add1, [1, 2, 3]); // [2, 3, 4]\nR.map(add1)([1, 2, 3]); // same (curried)</code> In Redux, selectors can be curried: <code>const selectItems = (state) => state.items;\nconst selectItemById = (id) => (state) => state.items[id];</code>"
    },
    {
      "question": "What is the arity problem with currying?",
      "answer": "The arity (fn.length) may not match the intended number of curried arguments if the function uses default parameters or rest params. Default parameters reset fn.length to the index of the first default parameter. Rest params make fn.length 0. The solution is to explicitly pass the arity: curry(fn, arity) or use a wrapper function with explicit parameter count."
    },
    {
      "question": "Is currying useful in production JavaScript?",
      "answer": "Currying is less common in typical production JavaScript than in functional-first languages like Haskell. However, it appears in: 1) Functional programming libraries (lodash/fp, Ramda). 2) Redux selectors and middleware configurations. 3) React higher-order components and custom hooks. 4) Validation and configuration patterns. It's a powerful tool to have in your toolbox but not a daily necessity for most JavaScript developers."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"400\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"16\" font-weight=\"bold\">Currying Transformation</text><text x=\"350\" y=\"62\" text-anchor=\"middle\" fill=\"#888\" font-size=\"12\">f(a, b, c) → f(a)(b)(c)</text><!-- Normal call --><rect x=\"60\" y=\"80\" width=\"580\" height=\"50\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"100\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">Normal: add(1, 2, 3) → returns 6 immediately</text><text x=\"350\" y=\"118\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"11\">All arguments provided at once, one call</text><line x1=\"350\" y1=\"130\" x2=\"350\" y2=\"150\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"60\" y=\"150\" width=\"580\" height=\"50\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"168\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\">Step 1: curriedAdd(1) → returns function(b) that has a=1 in closure</text><text x=\"350\" y=\"188\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"13\" font-weight=\"bold\">Curried: add(1)(2)(3)</text><line x1=\"350\" y1=\"200\" x2=\"350\" y2=\"215\" stroke=\"#98c379\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"60\" y=\"215\" width=\"580\" height=\"50\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"350\" y=\"235\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\">Step 2: curriedAdd(1)(2) → returns function(c) that has a=1, b=2 in closure</text><text x=\"350\" y=\"253\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"13\" font-weight=\"bold\">Each call returns a new function (closure)</text><line x1=\"350\" y1=\"265\" x2=\"350\" y2=\"280\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"60\" y=\"280\" width=\"580\" height=\"50\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"300\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"11\">Step 3: curriedAdd(1)(2)(3) → all args collected, executes, returns 6</text><text x=\"350\" y=\"318\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"13\" font-weight=\"bold\">Final call executes the original function</text><text x=\"350\" y=\"370\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">Each intermediate function captures previous arguments via closure until arity is satisfied</text></svg>",

  "codeExamples": [
    {
      "title": "Manual Currying",
      "useCase": "Understanding the Mechanics",
      "code": "// Uncurried version\nfunction add(a, b, c) {\n  return a + b + c;\n}\n\n// Manually curried version\nfunction curriedAdd(a) {\n  return function(b) {\n    return function(c) {\n      return a + b + c;\n    };\n  };\n}\n\nconsole.log(add(1, 2, 3));           // 6\nconsole.log(curriedAdd(1)(2)(3));    // 6\n\n// Partial application in action:\nconst add1 = curriedAdd(1);    // returns function(b) with a=1\nconst add1And2 = add1(2);      // returns function(c) with a=1, b=2\nconsole.log(add1And2(3));      // 6",
      "description": "The manually curried version uses three nested functions. Each level closes over its argument and returns the next function. The innermost function has all three arguments in scope."
    },
    {
      "title": "Generic Curry Utility",
      "useCase": "Reusable Currying Transform",
      "code": "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...nextArgs) {\n      return curried.apply(this, args.concat(nextArgs));\n    };\n  };\n}\n\nconst sum = (a, b, c) => a + b + c;\nconst curriedSum = curry(sum);\n\nconsole.log(curriedSum(1)(2)(3));       // 6\nconsole.log(curriedSum(1, 2)(3));       // 6\nconsole.log(curriedSum(1)(2, 3));       // 6\nconsole.log(curriedSum(1, 2, 3));       // 6\n\n// Also works for different arities:\nconst greet = (greeting, name) => `${greeting}, ${name}!`;\nconst curriedGreet = curry(greet);\nconst sayHello = curriedGreet('Hello');\nconsole.log(sayHello('World')); // 'Hello, World!'",
      "description": "A generic curry utility checks fn.length (arity) and recursively collects arguments via closure until enough are provided."
    },
    {
      "title": "Currying for API Configuration",
      "useCase": "Creating Reusable Configured Functions",
      "code": "const fetchWith = curry(\n  (baseUrl, endpoint, options) =>\n    fetch(`${baseUrl}${endpoint}`, options)\n      .then(res => res.json())\n);\n\n// Create a pre-configured API client\nconst api = fetchWith('https://api.example.com');\n\n// Get specific endpoints\nconst getUsers = api('/users');\nconst getPosts = api('/posts');\n\n// Use them\nconst users = await getUsers({ headers: { 'Auth': 'token' } });\nconst posts = await getPosts({ headers: { 'Auth': 'token' } });\n\n// Or pre-configure authentication too\nconst authenticatedApi = api.withAuth = \n  curry(fetchWith)('https://api.example.com')('/users');\n// Then: const users = await authenticatedApi({ headers: authHeaders });",
      "description": "Currying allows creating a pre-configured API client by partially applying the base URL. Each level of currying adds more specificity."
    },
    {
      "title": "Currying with Function Composition",
      "useCase": "Building Pipelines",
      "code": "// Utility functions\nconst add = curry((a, b) => a + b);\nconst multiply = curry((a, b) => a * b);\nconst map = curry((fn, arr) => arr.map(fn));\nconst filter = curry((fn, arr) => arr.filter(fn));\n\n// Pre-configure operations\nconst add1 = add(1);\nconst double = multiply(2);\nconst isEven = x => x % 2 === 0;\n\n// Compose pipeline\nconst processNumbers = pipe(\n  filter(isEven),\n  map(add1),\n  map(double)\n);\n\nconsole.log(processNumbers([1, 2, 3, 4, 5]));\n// filter even: [2, 4]\n// add1: [3, 5]\n// double: [6, 10]\n// Result: [6, 10]",
      "description": "Curried functions create single-argument functions suitable for composition. map(add1) returns a function that adds 1 to each element — perfect for pipe()."
    },
    {
      "title": "Currying with Placeholders (Advanced)",
      "useCase": "Flexible Argument Ordering",
      "code": "// Lodash-style curry with placeholder\nfunction curryWithPlaceholder(fn) {\n  const _ = curryWithPlaceholder._ = Symbol('placeholder');\n\n  return function curried(...args) {\n    const filled = args.filter(a => a !== _).length;\n    if (filled >= fn.length && args.length >= fn.length) {\n      // Replace placeholders with actual args from\n      // previous calls — simplified for clarity\n      return fn.apply(this, args);\n    }\n    return function(...nextArgs) {\n      const merged = args.map(a => a === _ && nextArgs.length ? nextArgs.shift() : a);\n      return curried.apply(this, merged.concat(nextArgs));\n    };\n  };\n}\n\n// Usage:\nconst _ = curryWithPlaceholder._;\nconst greet3 = (a, b, c) => `${a} ${b} ${c}`;\nconst curriedG = curryWithPlaceholder(greet3);\n\n// Skip the first argument, fill later\nconst withExclamation = curriedG(_, _, '!');\nconsole.log(withExclamation('Hello', 'World')); // 'Hello World !'\n// (Simplified — real placeholder curry is more complex)",
      "description": "Advanced currying with placeholders (like lodash's curry) allows skipping arguments to be filled later, providing even more flexibility in partial application."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What is currying?",
      "options": ["Calling a function with all its arguments at once", "Transforming a multi-argument function into a sequence of single-argument functions", "Combining multiple functions into one", "Calling a function asynchronously"],
      "answer": 1,
      "explanation": "Currying transforms f(a, b, c) into f(a)(b)(c) — a sequence of functions each taking one argument."
    },
    {
      "question": "What is the difference between currying and partial application?",
      "options": ["They are the same thing", "Currying transforms the calling convention; partial application pre-fills arguments", "Partial application returns a value; currying returns a function", "Currying works only with anonymous functions"],
      "answer": 1,
      "explanation": "Currying changes f(a,b,c) to f(a)(b)(c). Partial application takes f(a,b,c) and creates g(b,c) = f(1,b,c). Currying enables partial application."
    },
    {
      "question": "What does curriedAdd(1)(2)(3) return if add = (a,b,c) => a + b + c?",
      "options": ["function(c)", "6", "1 + 2 + 3 as a string", "undefined"],
      "answer": 1,
      "explanation": "After collecting all three arguments (1, 2, 3), the curried function executes the original sum function, returning 6."
    },
    {
      "question": "What is fn.length and why is it important for currying?",
      "options": ["It's the function name length", "It's the number of parameters (arity), used to know when all arguments are collected", "It's the function body length in characters", "It's the number of closures created"],
      "answer": 1,
      "explanation": "fn.length returns the number of formal parameters. A curry utility uses this to determine when all arguments have been collected."
    },
    {
      "question": "How do closures enable currying?",
      "options": ["Closures make functions run faster", "Each returned function closes over previously collected arguments", "Closures replace the need for arguments", "Closures convert the function to arrow syntax"],
      "answer": 1,
      "explanation": "Each nested function in a curried chain captures the arguments from outer calls via closure, accumulating them until all are present."
    },
    {
      "question": "What will the following log? const add = curry((a,b) => a + b); const add5 = add(5); console.log(add5(3));",
      "options": ["8", "function(b)", "5", "TypeError"],
      "answer": 0,
      "explanation": "add(5) returns a curried function with a=5 captured via closure. add5(3) provides b=3, so the original function executes: 5 + 3 = 8."
    },
    {
      "question": "Why can't variadic functions with rest params be automatically curried?",
      "options": ["They throw errors when curried", "Their fn.length is 0, so the curry utility cannot determine arity", "Rest params cannot be passed through closures", "Variadic functions don't accept arguments"],
      "answer": 1,
      "explanation": "Function.length reports 0 for rest parameters (...args). The curry utility doesn't know how many arguments to wait for."
    },
    {
      "question": "What is function composition in relation to currying?",
      "options": ["Composition is unrelated to currying", "Currying creates unary functions that can be easily composed with pipe()", "Composition replaces currying", "Composition is a type of currying"],
      "answer": 1,
      "explanation": "Curried functions can be partially applied to create unary (single-argument) functions, which can then be composed into pipelines using compose() or pipe()."
    },
    {
      "question": "In manual currying, what does each nested function return?",
      "options": ["The final result", "Another function (except the innermost)", "An array of arguments", "undefined"],
      "answer": 1,
      "explanation": "Each level of nesting returns a new function that accepts the next argument. Only the innermost function (when all args are collected) returns the actual result."
    },
    {
      "question": "Which JavaScript libraries are known for using currying?",
      "options": ["jQuery and React", "Lodash/fp and Ramda", "Express and Axios", "Moment.js and Lodash (main)"],
      "answer": 1,
      "explanation": "Lodash/fp and Ramda are functional programming libraries that use currying as a fundamental design principle."
    }
  ]
}
;
TOPICS_DATA["javascript"]["debouncing"] = {
  "title": "Debouncing & Throttling",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,

  "tldr": [
    "<strong>Debouncing</strong> ensures a function is called only after a specified period of <strong>inactivity</strong> — it waits for a 'pause' before executing.",
    "<strong>Throttling</strong> ensures a function is called at most once in a specified time period — it limits the <strong>execution rate</strong>.",
    "Both techniques optimize <strong>performance</strong> by reducing how often expensive operations (API calls, DOM updates, event handlers) are executed.",
    "Key difference: debouncing delays execution until after a pause; throttling spreads execution evenly over time."
  ],

  "laymanDefinition": "Debouncing is like an elevator: the doors start to close, but if someone else arrives, they open again and the timer resets. The elevator only departs after nobody has shown up for a few seconds. Throttling is like a bus schedule: the bus leaves every 10 minutes no matter what. Even if 20 people show up in one minute, the bus still only leaves every 10 minutes. Debouncing waits for a break in the action, while throttling limits how often something can happen, regardless of breaks.",

  "deepDive": [
    {
      "heading": "Debouncing: How It Works",
      "text": "Debouncing works by maintaining a timer. Each time the event fires, the timer is reset. If the timer completes without being reset (meaning no new events occurred), the function executes. This is ideal for scenarios where you want to wait until the user has 'finished' an action — such as typing in a search box, resizing a window, or stopping scrolling. The classic debounce implementation uses setTimeout and clearTimeout."
    },
    {
      "heading": "Throttling: How It Works",
      "text": "Throttling ensures a function is called at most once per specified interval. There are two common implementations: leading-edge (call immediately, then ignore subsequent calls for the duration) and trailing-edge (call at the end of the interval if a call was made). The leading-edge variant is often preferred for immediate feedback (like scroll position updates), while trailing-edge is useful for batched updates (like saving state)."
    },
    {
      "heading": "Debounce vs Throttle: When to Use Which",
      "list": [
        "<strong>Debounce:</strong> Search autocomplete, form validation, window resize, saving drafts — wait for the user to finish before acting.",
        "<strong>Leading-edge throttle:</strong> Scroll position tracking, progress monitoring, animation frame updates — need immediate response but can't run every frame.",
        "<strong>Trailing-edge throttle:</strong> Analytics logging, batched API calls, state snapshots — want to capture the last state within an interval.",
        "<strong>Neither:</strong> Click handlers (unless preventing double-submit), mouseenter/leave (fast enough natively)."
      ]
    },
    {
      "heading": "Implementing Debounce with Leading Option",
      "text": "A debounce can also be configured to execute on the leading edge (immediately on first call) and then debounce subsequent calls. This is useful when you want immediate feedback but still want to prevent rapid-fire calls. The implementation tracks both the timer and whether the function has been called yet. Leading debounce is essentially a combination of throttle (first call) and debounce (subsequent calls)."
    },
    {
      "heading": "requestAnimationFrame as an Alternative",
      "text": "For visual updates (animations, scroll effects), requestAnimationFrame (rAF) is often a better alternative to throttle. rAF fires roughly every 16.7ms (60fps) and automatically pauses when the tab is inactive. Throttle with a 16ms interval is similar but rAF provides better synchronization with the browser's rendering pipeline. For non-visual operations (API calls, localStorage), setTimeout-based debounce/throttle is more appropriate."
    }
  ],

  "interviewAnswer": "Debouncing and throttling are performance optimization techniques that limit how often a function executes. Debouncing delays execution until after a specified quiet period — every time the event fires, the timer resets. This is ideal for search-as-you-type, where you only want to query after the user stops typing. Throttling ensures a function executes at most once per specified interval — regardless of how many times the event fires. This is ideal for scroll handlers, where you want updates at a manageable rate like every 200ms. The key difference: debouncing waits for a pause; throttling enforces a maximum rate. Lodash provides both as _.debounce() and _.throttle(), but they are also straightforward to implement with setTimeout and clearTimeout.",

  "interviewQuestions": [
    {
      "question": "What is debouncing?",
      "answer": "Debouncing ensures a function is called only after a specified period of inactivity. Each time the event fires, a timer resets. The function executes only after the timer completes without interruption. Example: search input that queries the API only after the user stops typing for 300ms."
    },
    {
      "question": "What is throttling?",
      "answer": "Throttling ensures a function is called at most once per specified time interval. No matter how many times the event fires, the function executes at most once per interval. Example: scroll event handler that updates the UI every 200ms, not on every pixel scroll."
    },
    {
      "question": "What is the difference between debouncing and throttling?",
      "answer": "Debouncing delays execution until after a pause in events — it resets the timer on each new event. Throttling limits execution to a fixed maximum rate — it ignores events that occur within the same interval. Debounce is for 'wait until done'; throttle is for 'limit how often'."
    },
    {
      "question": "When would you use debounce vs throttle?",
      "answer": "Use debounce for: search autocomplete, form validation, window resize. Use throttle for: scroll tracking, progress bars, mouse move handlers, game input. The deciding factor: debounce if you want the final state; throttle if you want intermediate updates."
    },
    {
      "question": "How do you implement a basic debounce function?",
      "answer": "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } The returned function clears the previous timer and sets a new one on each call."
    },
    {
      "question": "How do you implement a basic throttle function?",
      "answer": "function throttle(fn, limit) { let inThrottle; return function(...args) { if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; } The flag prevents execution until the timeout clears it."
    },
    {
      "question": "What is leading vs trailing execution in debounce/throttle?",
      "answer": "Leading execution runs the function immediately on the first call. Trailing execution runs the function after the delay/interval. Leading throttle: first call runs immediately, subsequent calls are limited. Trailing throttle: calls queue up and execute at the end of each interval. Leading debounce: first call runs, then subsequent calls reset the timer."
    },
    {
      "question": "What is immediate/leading debounce and when would you use it?",
      "answer": "Leading debounce invokes the function immediately on the first call, then debounces subsequent calls. Useful for 'save' buttons — save immediately on first click, then ignore rapid clicks: <code>const save = debounce(doSave, 1000, { leading: true });</code>"
    },
    {
      "question": "How does requestAnimationFrame compare to throttle?",
      "answer": "requestAnimationFrame fires roughly every 16.7ms (60fps) and synchronizes with the browser's rendering pipeline. It's ideal for visual updates because 1) it runs at the optimal refresh rate, 2) it pauses when the tab is inactive, 3) it batches multiple changes into one render. Throttle with 16ms is similar but rAF is more efficient for DOM operations."
    },
    {
      "question": "Can debounce or throttle cause memory leaks?",
      "answer": "Yes, if not properly managed. Timers created by setTimeout keep references to the callback function and its closure. If the debounced/throttled function is attached to a DOM element that is removed, the timer may keep the element alive (preventing garbage collection). Always cancel pending timers when cleaning up (e.g., in React's useEffect cleanup or when removing event listeners)."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 460\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"440\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"37\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Debouncing vs Throttling — Timeline Comparison</text><!-- Events row --><text x=\"40\" y=\"68\" fill=\"#aaa\" font-size=\"12\" font-weight=\"bold\">Events:</text><rect x=\"120\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"180\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"200\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"260\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"290\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"310\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"370\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"410\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"500\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"530\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><rect x=\"560\" y=\"56\" width=\"30\" height=\"16\" rx=\"3\" fill=\"#f87171\" opacity=\"0.8\"/><text x=\"40\" y=\"108\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Debounce:</text><text x=\"120\" y=\"108\" fill=\"#aaa\" font-size=\"11\">timer resets on each event...</text><rect x=\"440\" y=\"94\" width=\"100\" height=\"20\" rx=\"10\" fill=\"#98c379\" opacity=\"0.9\"/><text x=\"490\" y=\"108\" text-anchor=\"middle\" fill=\"#000\" font-size=\"11\" font-weight=\"bold\">Executes once</text><text x=\"40\" y=\"148\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Throttle:</text><rect x=\"120\" y=\"134\" width=\"80\" height=\"20\" rx=\"10\" fill=\"#6c9fff\" opacity=\"0.9\"/><text x=\"160\" y=\"148\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"11\" font-weight=\"bold\">Exec</text><rect x=\"300\" y=\"134\" width=\"80\" height=\"20\" rx=\"10\" fill=\"#6c9fff\" opacity=\"0.9\"/><text x=\"340\" y=\"148\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"11\" font-weight=\"bold\">Exec</text><rect x=\"500\" y=\"134\" width=\"80\" height=\"20\" rx=\"10\" fill=\"#6c9fff\" opacity=\"0.9\"/><text x=\"540\" y=\"148\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"11\" font-weight=\"bold\">Exec</text><!-- Use case boxes --><rect x=\"60\" y=\"180\" width=\"580\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"350\" y=\"204\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"13\" font-weight=\"bold\">When to Debounce</text><text x=\"350\" y=\"224\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">Search autocomplete, window resize, form validation, save drafts</text><text x=\"350\" y=\"244\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"11\">'Wait until the user finishes, then act'</text><rect x=\"60\" y=\"280\" width=\"580\" height=\"80\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"304\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">When to Throttle</text><text x=\"350\" y=\"324\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">Scroll tracking, mouse move, game input, progress bars, API rate limiting</text><text x=\"350\" y=\"344\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"11\">'Act at most once per interval, no matter what'</text><rect x=\"120\" y=\"390\" width=\"480\" height=\"35\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1\" stroke-dasharray=\"4\"/><text x=\"360\" y=\"412\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\">Both: Use requestAnimationFrame for visual updates</text></svg>",

  "codeExamples": [
    {
      "title": "Debounce Implementation",
      "useCase": "Search-as-you-type Input",
      "code": "function debounce(fn, delay) {\n  let timer = null;\n  \n  return function(...args) {\n    const context = this;\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(context, args), delay);\n  };\n}\n\n// Usage: search input\nconst searchInput = document.getElementById('search');\nconst fetchSuggestions = debounce(async (query) => {\n  const results = await fetch(`/api/search?q=${query}`);\n  showDropdown(await results.json());\n}, 300);\n\nsearchInput.addEventListener('input', (e) => {\n  fetchSuggestions(e.target.value);\n});\n// Only fires 300ms after the user stops typing",
      "description": "The debounce function wraps the API call. Each keystroke resets the 300ms timer. The API call only happens after the user pauses typing."
    },
    {
      "title": "Throttle Implementation",
      "useCase": "Scroll Position Tracking",
      "code": "function throttle(fn, limit) {\n  let inThrottle = false;\n  let lastArgs = null;\n  let lastContext = null;\n  \n  return function(...args) {\n    if (inThrottle) {\n      lastArgs = args;\n      lastContext = this;\n      return;\n    }\n    \n    fn.apply(this, args);\n    inThrottle = true;\n    \n    setTimeout(() => {\n      inThrottle = false;\n      if (lastArgs) {\n        fn.apply(lastContext, lastArgs);\n        lastArgs = null;\n        lastContext = null;\n      }\n    }, limit);\n  };\n}\n\n// Usage: scroll handler\nconst updateScrollIndicator = throttle(() => {\n  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);\n  document.getElementById('progress').style.width = `${scrollPercent * 100}%`;\n}, 100);\n\nwindow.addEventListener('scroll', updateScrollIndicator);\n// Updates at most every 100ms, not on every scroll pixel",
      "description": "The throttle wraps the scroll handler. No matter how fast the user scrolls, the progress bar updates at most every 100ms. The trailing edge ensures the last scroll position is captured."
    },
    {
      "title": "Leading Debounce (Immediate)",
      "useCase": "Save Button Double-Click Prevention",
      "code": "function leadingDebounce(fn, delay) {\n  let timer = null;\n  let canCall = true;\n  \n  return function(...args) {\n    const context = this;\n    \n    if (canCall) {\n      fn.apply(context, args);\n      canCall = false;\n    }\n    \n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      canCall = true;\n    }, delay);\n  };\n}\n\n// Usage: prevent double submit\nconst saveButton = document.getElementById('save');\nconst handleSave = leadingDebounce(async () => {\n  await saveDocument();\n  showToast('Saved!');\n}, 2000);\n\nsaveButton.addEventListener('click', handleSave);\n// First click saves immediately, then blocks for 2 seconds",
      "description": "Leading debounce executes immediately on the first call, then ignores subsequent calls for the delay period. Perfect for preventing accidental double-clicks on submit buttons."
    },
    {
      "title": "Debounce with Cancel (Cleanup)",
      "useCase": "React Component Cleanup",
      "code": "function debounce(fn, delay) {\n  let timer = null;\n  \n  const debounced = function(...args) {\n    const context = this;\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(context, args), delay);\n  };\n  \n  debounced.cancel = function() {\n    clearTimeout(timer);\n    timer = null;\n  };\n  \n  debounced.flush = function() {\n    if (timer) {\n      clearTimeout(timer);\n      fn.apply(this, arguments);\n      timer = null;\n    }\n  };\n  \n  return debounced;\n}\n\n// React usage:\n// useEffect(() => {\n//   const handleResize = debounce(() => {\n//     setDimensions({ w: window.innerWidth, h: window.innerHeight });\n//   }, 200);\n//   \n//   window.addEventListener('resize', handleResize);\n//   \n//   return () => {\n//     handleResize.cancel(); // Cleanup! Prevents memory leak\n//     window.removeEventListener('resize', handleResize);\n//   };\n// }, []);",
      "description": "A .cancel() method allows cleanup when the debounced function is no longer needed. This prevents memory leaks from pending setTimeout callbacks in SPAs and React components."
    },
    {
      "title": "Throttle with requestAnimationFrame",
      "useCase": "Smooth Animation Updates",
      "code": "function rAFThrottle(fn) {\n  let scheduled = false;\n  \n  return function(...args) {\n    if (scheduled) return;\n    \n    scheduled = true;\n    requestAnimationFrame(() => {\n      fn.apply(this, args);\n      scheduled = false;\n    });\n  };\n}\n\n// Usage: smooth scroll-based animation\nconst updateParallax = rAFThrottle(() => {\n  const scrolled = window.scrollY;\n  document.querySelectorAll('.parallax-layer').forEach((layer, i) => {\n    const speed = (i + 1) * 0.2;\n    layer.style.transform = `translateY(${scrolled * speed}px)`;\n  });\n});\n\nwindow.addEventListener('scroll', updateParallax);\n// Smooth updates synced with browser's render cycle (60fps)",
      "description": "requestAnimationFrame-based throttle ensures updates are synchronized with the browser's rendering pipeline for smooth visual effects."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What is the main purpose of debouncing?",
      "options": ["To make code run faster", "To delay execution until after a period of inactivity", "To ensure a function runs exactly once", "To prevent errors in async code"],
      "answer": 1,
      "explanation": "Debouncing waits for a quiet period (no new events) before executing the function. This prevents rapid-fire executions."
    },
    {
      "question": "What is the main purpose of throttling?",
      "options": ["To limit function execution to at most once per time interval", "To make functions run as fast as possible", "To batch multiple calls into one", "To delay execution indefinitely"],
      "answer": 0,
      "explanation": "Throttling ensures a function executes at most once per specified time interval, regardless of how many times the event fires."
    },
    {
      "question": "Which scenario is best suited for debouncing?",
      "options": ["Scroll position tracking", "Search autocomplete input", "Animation frame updates", "Mouse move coordinate display"],
      "answer": 1,
      "explanation": "Search autocomplete benefits from debouncing because you want to query the API only after the user stops typing, not on every keystroke."
    },
    {
      "question": "Which scenario is best suited for throttling?",
      "options": ["Form validation on input", "Save draft on typing", "Scroll-based progress bar", "API search call on keyup"],
      "answer": 2,
      "explanation": "A scroll-based progress bar needs regular updates (throttle) but not on every scroll pixel. Debounce would only update after scrolling stops."
    },
    {
      "question": "In a basic debounce implementation, what does clearTimeout do?",
      "options": ["It cancels the previous timer, resetting the delay", "It ensures the function runs immediately", "It prevents memory leaks", "It throttles the function"],
      "answer": 0,
      "explanation": "clearTimeout cancels the previously set timer. This resets the delay window — the function will only execute after a fresh quiet period."
    },
    {
      "question": "What is the difference between leading and trailing debounce?",
      "options": ["Leading fires immediately on first call, trailing fires after delay", "Leading fires after delay, trailing fires immediately", "Leading is for scroll, trailing is for resize", "There is no difference"],
      "answer": 0,
      "explanation": "Leading debounce executes the function immediately on the first call, then debounces subsequent calls. Trailing debounce waits for the quiet period before executing."
    },
    {
      "question": "How does requestAnimationFrame compare to setTimeout-based throttle?",
      "options": ["rAF is always faster", "rAF synchronizes with the browser's render cycle and pauses when tab is inactive", "rAF cannot be cancelled", "rAF runs once per second"],
      "answer": 1,
      "explanation": "rAF fires roughly every 16.7ms (60fps) and synchronizes with the rendering pipeline. It also automatically pauses when the browser tab is in the background."
    },
    {
      "question": "What problem can debounce/throttle cause if not cleaned up?",
      "options": ["Memory leaks from pending timers holding references", "The function never runs", "The page crashes", "Event listeners stop working"],
      "answer": 0,
      "explanation": "Pending setTimeout callbacks keep references to the function and its closure variables. If the component is unmounted, these prevent garbage collection."
    },
    {
      "question": "What API is commonly used to implement debounce and throttle?",
      "options": ["fetch() and Promise", "setTimeout() and clearTimeout()", "Array.map() and Array.filter()", "addEventListener() and removeEventListener()"],
      "answer": 1,
      "explanation": "Debounce and throttle are typically implemented using setTimeout() to delay execution and clearTimeout() to cancel pending executions."
    },
    {
      "question": "If you want to update a UI element on every scroll position but not more than every 100ms, which technique do you use?",
      "options": ["Debounce with 100ms delay", "Throttle with 100ms limit", "requestAnimationFrame without limit", "No optimization needed"],
      "answer": 1,
      "explanation": "Throttling with a 100ms limit ensures the update runs at most every 100ms, providing regular but not excessive updates during scrolling."
    }
  ]
}
;
TOPICS_DATA["javascript"]["event-loop"] = {
  "title": "Event Loop",
  "difficulty": "advanced",
  "estimatedMinutes": 35,
  "tldr": [
    "The <strong>Event Loop</strong> is the mechanism that enables JavaScript's non-blocking, asynchronous concurrency model despite being single-threaded.",
    "It continuously checks if the <strong>Call Stack</strong> is empty; if so, it dequeues callbacks from the <strong>Microtask Queue</strong> first (draining it entirely), then from the <strong>Macrotask Queue</strong> (one at a time).",
    "JavaScript has one Call Stack and one Event Loop per execution environment (e.g., browser tab).",
    "The loop order: <strong>1) Sync code on Call Stack → 2) Drain Microtask Queue → 3) One Macrotask → 4) Re-render UI (if needed) → Repeat</strong>"
  ],
  "laymanDefinition": "Imagine a single chef in a kitchen (the Call Stack). Orders come in — some are quick (synchronous) like pouring water, others take time (asynchronous) like baking a cake. Instead of standing still waiting for the cake to bake, the chef puts a timer on and starts working on the next order. When the timer rings (callback ready), the chef doesn't stop immediately — he finishes his current task first, then checks a 'high priority' board (Microtask Queue), handles those, then checks a 'regular' board (Macrotask Queue). The Event Loop is the system that tells the chef when to check these boards. It keeps the kitchen running smoothly without ever blocking.",
  "deepDive": [
    {
      "heading": "Why JavaScript Needs an Event Loop",
      "text": "JavaScript is <strong>single-threaded</strong> — it has one Call Stack and one thread of execution. If the stack had to wait for network requests, file reads, or timers, the entire program would freeze. The Event Loop allows JavaScript to offload blocking operations to the browser APIs (Web APIs) or Node.js APIs, and then handle the results asynchronously when the stack is clear."
    },
    {
      "heading": "The Event Loop Phases (Browser)",
      "text": "<strong>1. Call Stack:</strong> Execute synchronous code until the stack is empty.<br/><strong>2. Microtask Queue (drain entirely):</strong> Execute all Promise.then/catch/finally callbacks, queueMicrotask, and MutationObserver callbacks. If a microtask adds more microtasks, they are also executed before moving on.<br/><strong>3. Rendering (browser):</strong> Update the DOM, apply CSS styles, and paint the UI (if needed).<br/><strong>4. Macrotask Queue (one task):</strong> Execute the oldest macrotask (setTimeout, setInterval, I/O, UI events).<br/><strong>5. Repeat</strong> — go back to step 1."
    },
    {
      "heading": "Microtasks vs Macrotasks Priority",
      "text": "Microtasks have higher priority than macrotasks. After every synchronous task, the Event Loop <strong>drains the entire Microtask Queue</strong> before processing even a single macrotask. This means if a microtask queues another microtask, the macrotask queue is delayed until all microtasks are processed. This is why Promise-based code executes before setTimeout callbacks, even when the timeout is 0ms."
    },
    {
      "heading": "Event Loop in Node.js",
      "text": "Node.js's Event Loop has <strong>six phases</strong>: (1) <strong>Timers</strong> — executes setTimeout/setInterval callbacks. (2) <strong>Pending I/O</strong> — executes I/O callbacks deferred from the previous cycle. (3) <strong>Idle/Prepare</strong> — internal use. (4) <strong>Poll</strong> — retrieve new I/O events. (5) <strong>Check</strong> — executes setImmediate callbacks. (6) <strong>Close</strong> — executes close event callbacks. Between each phase, the microtask queue is drained."
    }
  ],
  "interviewAnswer": "The Event Loop is the concurrency model that allows JavaScript, despite being single-threaded, to handle asynchronous operations without blocking. It works by continuously monitoring the Call Stack. When the stack is empty, the Event Loop first processes the entire Microtask Queue (Promise callbacks, queueMicrotask), then processes one Macrotask (setTimeout, setInterval, I/O callbacks), then potentially re-renders the UI, and repeats. Microtasks always have priority over macrotasks. This model is why Promise.then() executes before setTimeout(() => {}, 0). Understanding the Event Loop is essential for writing predictable asynchronous JavaScript code.",
  "interviewQuestions": [
    {
      "question": "What is the Event Loop in JavaScript?",
      "answer": "The Event Loop is a mechanism that enables JavaScript's non-blocking concurrency model. It continuously checks if the Call Stack is empty. If so, it processes callbacks from the Microtask Queue (entirely), then processes one callback from the Macrotask Queue, then optionally re-renders the UI, and repeats. It allows JavaScript to perform asynchronous operations without blocking the single thread."
    },
    {
      "question": "What is the difference between microtasks and macrotasks in the Event Loop?",
      "answer": "<strong>Microtasks</strong> (Promise.then/catch/finally, queueMicrotask, MutationObserver) are processed immediately after the current synchronous operation and the entire queue is drained before any macrotask. <strong>Macrotasks</strong> (setTimeout, setInterval, I/O, UI events) are processed one at a time per Event Loop iteration. Microtasks have higher priority. This is why Promise callbacks run before setTimeout callbacks."
    },
    {
      "question": "Will setTimeout(callback, 0) execute immediately?",
      "answer": "No. setTimeout(callback, 0) schedules the callback in the Macrotask Queue with a minimum delay of 0ms (browsers enforce a minimum of 4ms for nested timeouts). The callback only executes after: (1) All synchronous code on the Call Stack completes. (2) The entire Microtask Queue is drained. (3) The Event Loop picks the callback from the Macrotask Queue. So it will always run after Promise-based callbacks and other synchronous code."
    },
    {
      "question": "What is the output of: console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);",
      "answer": "Output: <strong>1, 4, 3, 2</strong>. Explanation: 1 and 4 are synchronous (run immediately). The setTimeout callback goes to the Macrotask Queue. The Promise.then callback goes to the Microtask Queue. After synchronous code completes, the Microtask Queue is drained first (logs 3), then one Macrotask is processed (logs 2)."
    },
    {
      "question": "Can the Event Loop be blocked? How?",
      "answer": "Yes. A long-running synchronous operation blocks the Event Loop because the Call Stack cannot be emptied. Examples: infinite loops, heavy computation, or synchronous AJAX calls. While the stack is blocked, no callbacks (microtasks or macrotasks) can execute, and the UI cannot re-render. This is why heavy computations should be offloaded to Web Workers or broken into chunks with setTimeout."
    },
    {
      "question": "What is the difference between the browser Event Loop and Node.js Event Loop?",
      "answer": "Both follow the same microtask/macrotask priority principle. The browser Event Loop has a rendering step (requestAnimationFrame, style calculation, paint) between microtask and macrotask processing. Node.js's Event Loop has six phases: Timers, Pending I/O, Idle/Prepare, Poll, Check (setImmediate), and Close. Between each phase, the microtask queue (nextTick and Promise callbacks) is drained. Node.js also has process.nextTick() which has higher priority than Promise microtasks."
    },
    {
      "question": "What happens if a microtask queues another microtask?",
      "answer": "The new microtask is added to the Microtask Queue and will be executed in the same microtask drain cycle. This can lead to <strong>microtask starvation</strong> — if microtasks continuously queue new microtasks, the Macrotask Queue never gets processed, effectively starving it. This can make UI updates and other macrotasks wait indefinitely."
    },
    {
      "question": "What is the role of 'requestAnimationFrame' in the Event Loop?",
      "answer": "requestAnimationFrame (rAF) callbacks are scheduled to run <strong>before</strong> the browser's rendering step but <strong>after</strong> macrotasks. rAF is specifically designed for visual updates and animations. The browser batches all rAF callbacks, runs them, then performs style calculation and paint. This makes rAF more efficient than using setTimeout for animations."
    },
    {
      "question": "How does the Event Loop handle multiple tabs/windows?",
      "answer": "Each browser tab or window runs its own Event Loop instance with its own Call Stack, Microtask Queue, and Macrotask Queue. They are completely isolated. Shared data between tabs (via localStorage, BroadcastChannel, etc.) is synchronized at the browser level, not the Event Loop level."
    },
    {
      "question": "What is 'stack overflow' in the context of the Event Loop?",
      "answer": "A stack overflow is unrelated to the Event Loop — it occurs when the Call Stack exceeds its limit due to excessive function calls (usually infinite recursion). The Event Loop pauses executing new callbacks until the Call Stack has space. However, a stack overflow is an error that propagates up the stack and, if not caught, terminates the current execution context without affecting the Event Loop's ability to process future callbacks."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 500\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"480\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">JavaScript Event Loop</text><!-- Call Stack --><rect x=\"30\" y=\"65\" width=\"180\" height=\"200\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"120\" y=\"90\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\">CALL STACK</text><rect x=\"45\" y=\"105\" width=\"150\" height=\"22\" rx=\"3\" fill=\"#222639\"/><text x=\"55\" y=\"121\" fill=\"#e8eaed\" font-size=\"8\" font-family=\"monospace\">console.log(4)</text><rect x=\"45\" y=\"131\" width=\"150\" height=\"22\" rx=\"3\" fill=\"#222639\"/><text x=\"55\" y=\"147\" fill=\"#e8eaed\" font-size=\"8\" font-family=\"monospace\">(anonymous)</text><rect x=\"45\" y=\"157\" width=\"150\" height=\"22\" rx=\"3\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"55\" y=\"173\" fill=\"#34d399\" font-size=\"8\" font-family=\"monospace\">Global EC (always at bottom)</text><text x=\"120\" y=\"210\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"9\">push on call</text><text x=\"120\" y=\"225\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"9\">pop on return</text><text x=\"120\" y=\"240\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"9\">Synchronous only</text><!-- Arrow: stack empty check --><line x1=\"210\" y1=\"160\" x2=\"255\" y2=\"160\" stroke=\"#9aa0b0\" stroke-width=\"1.5\" stroke-dasharray=\"4\" marker-end=\"url(#arrow)\"/><text x=\"232\" y=\"154\" fill=\"#9aa0b0\" font-size=\"8\" text-anchor=\"middle\">Stack empty?</text><!-- Microtask Queue --><rect x=\"260\" y=\"65\" width=\"180\" height=\"200\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"90\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\">MICROTASK QUEUE</text><text x=\"350\" y=\"108\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"9\">(Priority: HIGH)</text><rect x=\"275\" y=\"120\" width=\"150\" height=\"18\" rx=\"3\" fill=\"rgba(251,191,36,0.1)\"/><text x=\"285\" y=\"134\" fill=\"#fbbf24\" font-size=\"8\">Promise.then(callback)</text><rect x=\"275\" y=\"142\" width=\"150\" height=\"18\" rx=\"3\" fill=\"rgba(251,191,36,0.1)\"/><text x=\"285\" y=\"156\" fill=\"#fbbf24\" font-size=\"8\">queueMicrotask(fn)</text><rect x=\"275\" y=\"164\" width=\"150\" height=\"18\" rx=\"3\" fill=\"rgba(251,191,36,0.1)\"/><text x=\"285\" y=\"178\" fill=\"#fbbf24\" font-size=\"8\">MutationObserver</text><text x=\"350\" y=\"210\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"9\" font-weight=\"bold\">Drained ENTIRELY</text><text x=\"350\" y=\"230\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"9\">before any macrotask</text><text x=\"350\" y=\"250\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"8\">(can microtask-starve)</text><!-- Macrotask Queue --><rect x=\"490\" y=\"65\" width=\"180\" height=\"200\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"580\" y=\"90\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">MACROTASK QUEUE</text><text x=\"580\" y=\"108\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"9\">(Priority: LOW)</text><rect x=\"505\" y=\"120\" width=\"150\" height=\"18\" rx=\"3\" fill=\"rgba(52,211,153,0.1)\"/><text x=\"515\" y=\"134\" fill=\"#34d399\" font-size=\"8\">setTimeout(fn, 100)</text><rect x=\"505\" y=\"142\" width=\"150\" height=\"18\" rx=\"3\" fill=\"rgba(52,211,153,0.1)\"/><text x=\"515\" y=\"156\" fill=\"#34d399\" font-size=\"8\">setInterval(fn, 1000)</text><rect x=\"505\" y=\"164\" width=\"150\" height=\"18\" rx=\"3\" fill=\"rgba(52,211,153,0.1)\"/><text x=\"515\" y=\"178\" fill=\"#34d399\" font-size=\"8\">I/O callbacks</text><text x=\"580\" y=\"210\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"9\" font-weight=\"bold\">One per iteration</text><text x=\"580\" y=\"230\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"9\">after microtasks done</text><!-- Step labels --><rect x=\"30\" y=\"290\" width=\"640\" height=\"180\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"315\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Event Loop Iteration Steps</text><text x=\"50\" y=\"345\" fill=\"#6c9fff\" font-size=\"11\" font-weight=\"bold\">Step 1:</text><text x=\"120\" y=\"345\" fill=\"#e8eaed\" font-size=\"11\">Execute all synchronous code on the Call Stack</text><text x=\"50\" y=\"370\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">Step 2:</text><text x=\"120\" y=\"370\" fill=\"#e8eaed\" font-size=\"11\">Drain the ENTIRE Microtask Queue (Promise callbacks, etc.)</text><text x=\"50\" y=\"395\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Step 3:</text><text x=\"120\" y=\"395\" fill=\"#e8eaed\" font-size=\"11\">Take ONE macrotask from the Macrotask Queue and execute it</text><text x=\"50\" y=\"420\" fill=\"#a78bfa\" font-size=\"11\" font-weight=\"bold\">Step 4:</text><text x=\"120\" y=\"420\" fill=\"#e8eaed\" font-size=\"11\">(Browser) Re-render UI if needed (style + layout + paint)</text><text x=\"50\" y=\"448\" fill=\"#9aa0b0\" font-size=\"11\">Then repeat from Step 1 (check Call Stack, etc.)</text></svg>",
  "codeExamples": [
    {
      "title": "Event Loop Order: Synchronous, Micro, Macro",
      "useCase": "Understanding execution priority",
      "code": "console.log('1 - sync');\n\nsetTimeout(() => {\n  console.log('2 - macrotask (setTimeout)');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3 - microtask (Promise.then)');\n});\n\nqueueMicrotask(() => {\n  console.log('4 - microtask (queueMicrotask)');\n});\n\nconsole.log('5 - sync');\n\n// Output:\n// 1 - sync\n// 5 - sync\n// 3 - microtask (Promise.then)\n// 4 - microtask (queueMicrotask)\n// 2 - macrotask (setTimeout)",
      "description": "Synchronous code runs first (1, 5). Then the entire Microtask Queue is drained (3, 4) — Promises and queueMicrotask have equal priority. Finally, one macrotask is processed (2)."
    },
    {
      "title": "Microtask Starvation Example",
      "useCase": "When microtasks block macrotasks",
      "code": "function starve() {\n  let count = 0;\n\n  function doMicrotask() {\n    console.log('Microtask:', ++count);\n    if (count < 5) {\n      // Queue another microtask before the current one finishes\n      queueMicrotask(doMicrotask);\n    }\n  }\n\n  setTimeout(() => {\n    console.log('Macrotask finally runs!');\n  }, 0);\n\n  queueMicrotask(doMicrotask);\n}\n\nstarve();\n// Output:\n// Microtask: 1\n// Microtask: 2\n// Microtask: 3\n// Microtask: 4\n// Microtask: 5\n// Macrotask finally runs!\n\n// The setTimeout callback is delayed until ALL microtasks complete",
      "description": "When microtasks continuously queue new microtasks, the Microtask Queue is never fully emptied, so macrotasks (and UI rendering) are delayed. This is called microtask starvation."
    },
    {
      "title": "Blocking the Event Loop with Heavy Computation",
      "useCase": "Avoiding UI freezes",
      "code": "// BAD: blocks the Event Loop for seconds\nfunction heavyComputation() {\n  const start = Date.now();\n  while (Date.now() - start < 5000) {\n    // Busy wait - blocks everything!\n    Math.sqrt(Math.random());\n  }\n  console.log('Done');\n}\n\n// Click handlers, animations, etc. are blocked for 5 seconds\n\n// GOOD: break work into chunks using setTimeout\nfunction chunkedComputation(iterations, chunk = 1000) {\n  let i = 0;\n\n  function doChunk() {\n    for (let j = 0; j < chunk && i < iterations; j++, i++) {\n      Math.sqrt(Math.random());\n    }\n    if (i < iterations) {\n      // Yield to Event Loop so UI can update\n      setTimeout(doChunk, 0);\n    } else {\n      console.log('Done with chunks');\n    }\n  }\n\n  doChunk();\n}\n\n// BEST: use Web Worker for truly heavy work\n// const worker = new Worker('heavy-worker.js');",
      "description": "Long-running synchronous operations block the Event Loop, freezing the UI. Break work into chunks with setTimeout, or use Web Workers for parallel execution without blocking the main thread."
    },
    {
      "title": "Event Loop in Node.js: process.nextTick vs Promise",
      "useCase": "Node.js-specific microtask behavior",
      "code": "// In Node.js, process.nextTick has priority over Promise microtasks\nconsole.log('1 - sync');\n\nPromise.resolve().then(() => {\n  console.log('2 - Promise microtask');\n});\n\nprocess.nextTick(() => {\n  console.log('3 - nextTick (higher priority microtask)');\n});\n\nsetTimeout(() => {\n  console.log('4 - macrotask');\n}, 0);\n\nconsole.log('5 - sync');\n\n// Node.js Output:\n// 1 - sync\n// 5 - sync\n// 3 - nextTick (higher priority microtask)\n// 2 - Promise microtask\n// 4 - macrotask\n\n// In browsers, Promise and queueMicrotask have the same priority.\n// In Node.js, nextTick queue is checked BEFORE Promise microtasks.",
      "description": "Node.js has its own microtask phase ordering. The nextTick queue is drained before the Promise microtask queue, even though both are 'microtasks'. This is an important distinction when writing Node.js applications."
    },
    {
      "title": "await and the Event Loop",
      "useCase": "How async/await interacts with the loop",
      "code": "async function asyncFunction() {\n  console.log('A - inside async (sync part)');\n\n  await Promise.resolve();\n  // The code after await is wrapped in a microtask callback\n\n  console.log('C - after await (microtask)');\n}\n\nconsole.log('1 - sync');\n\nasyncFunction();\n\nconsole.log('2 - sync');\n\nsetTimeout(() => console.log('3 - macrotask'), 0);\n\nPromise.resolve().then(() => console.log('4 - Promise microtask'));\n\nconsole.log('5 - sync');\n\n// Output:\n// 1 - sync\n// A - inside async (sync part)\n// 2 - sync\n// 5 - sync\n// C - after await (microtask)\n// 4 - Promise microtask\n// 3 - macrotask\n\n// 'await' splits the function: the part before await is sync,\n// the part after await is a microtask continuation.",
      "description": "async/await doesn't change the Event Loop. The code before the first 'await' runs synchronously. The code after 'await' is scheduled as a microtask. This is why 'C' logs after all synchronous code but before setTimeout."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the correct execution order? setTimeout(() => console.log('A'), 0); Promise.resolve().then(() => console.log('B')); console.log('C');",
      "options": ["A, B, C", "C, A, B", "C, B, A", "A, C, B"],
      "answer": 2,
      "explanation": "C is synchronous (executes first). B is a microtask (executes after sync code, before macrotasks). A is a macrotask (executes last). Output: C, B, A."
    },
    {
      "question": "How many macrotasks does the Event Loop process per iteration?",
      "options": ["All of them", "The entire Macrotask Queue", "Exactly one", "As many as the microtask queue allows"],
      "answer": 2,
      "explanation": "The Event Loop processes exactly ONE macrotask per iteration (after draining the entire Microtask Queue). This ensures fairness and prevents macrotask starvation."
    },
    {
      "question": "What happens if a microtask queues another microtask?",
      "options": ["The new microtask waits for the next Event Loop iteration", "The new microtask is executed in the same microtask drain cycle", "An error is thrown", "The new microtask becomes a macrotask"],
      "answer": 1,
      "explanation": "The Microtask Queue is drained entirely in one cycle. If a microtask adds another microtask, it is executed immediately in the same cycle, potentially starving macrotasks."
    },
    {
      "question": "In the browser, when does UI rendering occur in the Event Loop?",
      "options": ["Before every microtask", "After macrotasks, before the next iteration", "Synchronously with every DOM change", "In a separate thread"],
      "answer": 1,
      "explanation": "UI rendering occurs after the current macrotask completes and before the next Event Loop iteration. The browser batches DOM changes and applies them during the render step."
    },
    {
      "question": "What is the minimum timeout value for nested setTimeout calls (>= 5th level) in browsers?",
      "options": ["0ms", "4ms", "10ms", "100ms"],
      "answer": 1,
      "explanation": "HTML5 spec requires that nested setTimeout calls (level 5+) have a minimum delay of 4ms. This prevents malicious code from starving the Event Loop with tiny timeouts."
    },
    {
      "question": "Which of the following is true about the Event Loop?",
      "options": ["JavaScript has multiple Call Stacks", "Microtasks are processed before macrotasks", "setTimeout(0) runs before synchronous code", "The Event Loop runs in a separate thread"],
      "answer": 1,
      "explanation": "Microtasks (Promise callbacks, queueMicrotask) are always processed before macrotasks (setTimeout, setInterval, I/O). This is a fundamental rule of the Event Loop."
    },
    {
      "question": "What Node.js microtask has higher priority than Promise callbacks?",
      "options": ["setTimeout", "process.nextTick", "setImmediate", "fs.readFile"],
      "answer": 1,
      "explanation": "In Node.js, the process.nextTick queue is drained before the Promise microtask queue, giving nextTick callbacks the highest priority among asynchronous callbacks."
    },
    {
      "question": "What happens to the Event Loop while a synchronous while loop runs for 5 seconds?",
      "options": ["Microtasks still execute", "The Event Loop is completely blocked", "Macrotasks still execute", "UI continues to update"],
      "answer": 1,
      "explanation": "The Call Stack cannot be emptied until the while loop finishes. Since the Event Loop can only process callbacks when the stack is empty, everything is blocked — microtasks, macrotasks, and UI rendering."
    },
    {
      "question": "What is the role of requestAnimationFrame in the Event Loop?",
      "options": ["It runs in the Microtask Queue", "It runs before the browser render step, after macrotasks", "It runs synchronously with setTimeout", "It bypasses the Event Loop entirely"],
      "answer": 1,
      "explanation": "requestAnimationFrame callbacks are scheduled to run before the browser's rendering step but after the current macrotask is processed. This makes them ideal for smooth, synchronized animations."
    },
    {
      "question": "What will this log? console.log('1'); setTimeout(() => console.log('2'), 0); queueMicrotask(() => console.log('3')); console.log('4');",
      "options": ["1, 2, 3, 4", "1, 4, 3, 2", "1, 4, 2, 3", "4, 1, 3, 2"],
      "answer": 1,
      "explanation": "Synchronous code (1, 4) runs first. Then microtasks (queueMicrotask logs 3) are drained. Then macrotasks (setTimeout logs 2). Output: 1, 4, 3, 2."
    }
  ]
}
;
TOPICS_DATA["javascript"]["execution-context"] = {
  "title": "Execution Context",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "An <strong>Execution Context</strong> is the environment where JavaScript code is evaluated and executed.",
    "There are three types: <strong>Global</strong> (default, one per program), <strong>Function</strong> (created per function call), and <strong>Eval</strong> (inside eval()).",
    "Each context has two phases: <strong>Creation Phase</strong> (hoisting, scope chain setup) and <strong>Execution Phase</strong> (code runs line by line).",
    "The <strong>Execution Context Stack</strong> (Call Stack) manages which context is currently running."
  ],
  "laymanDefinition": "Think of an execution context like a 'workspace' that JavaScript creates whenever it needs to run some code. It's like setting up a desk before you start working. First, you lay out all your tools (variables, functions) on the desk — that's the creation phase. Then you actually do the work — that's the execution phase. When you call a function, JavaScript creates a fresh workspace just for that function. When the function finishes, the workspace is cleared away. The global workspace is always there, like your main desk that never gets put away.",
  "deepDive": [
    {
      "heading": "The Three Types of Execution Contexts",
      "text": "1. <strong>Global Execution Context (GEC):</strong> Created when the JavaScript file first loads. There is only one GEC per program. In browsers, the global object is <code>window</code>. Variables declared with <code>var</code> at the top level become properties of the global object. <code>let</code> and <code>const</code> are also in the global scope but not attached to <code>window</code>.<br/><br/>2. <strong>Function Execution Context (FEC):</strong> Created whenever a function is invoked, regardless of how many times. Each call gets its own context with its own variable environment.<br/><br/>3. <strong>Eval Execution Context:</strong> Created inside <code>eval()</code> function. Rarely used and generally discouraged."
    },
    {
      "heading": "Creation Phase (Hoisting & Scope Setup)",
      "text": "Before executing a single line of code, the JavaScript engine performs the creation phase in this order:<br/><br/><strong>1. Create the Variable Object (VO):</strong> Sets up the scope chain, creates the argument object (for functions), and hoists declarations.<br/><strong>2. Create the Scope Chain:</strong> Links the current context's variable environment with its parent contexts.<br/><strong>3. Determine the value of <code>this</code>:</strong> The <code>this</code> binding is determined by how the function was called.<br/><br/>During this phase, function declarations are fully hoisted (available before declaration), while variable declarations are hoisted but initialized as <code>undefined</code> (<code>var</code>) or left in the Temporal Dead Zone (<code>let</code>/<code>const</code>)."
    },
    {
      "heading": "Execution Phase",
      "text": "After the creation phase, the engine executes the code line by line, assigning values to variables and executing function calls. When a function call is encountered, a new Function Execution Context is created and pushed onto the Execution Context Stack (Call Stack). The currently running context is always at the top of this stack. When a function returns, its context is popped from the stack and the previous context resumes execution."
    },
    {
      "heading": "The Execution Context Stack (Call Stack)",
      "text": "The Call Stack is a LIFO (Last In, First Out) data structure that tracks the execution of contexts. When a script starts, the Global Execution Context is pushed onto the stack. Each function invocation pushes a new context onto the stack. When the function completes, its context is popped off. The stack is never empty as long as the program is running because the Global Context remains at the bottom."
    }
  ],
  "interviewAnswer": "An execution context is an abstract environment where JavaScript code is evaluated and executed. There are three types: Global (one per program), Function (created per function call), and Eval. Each context goes through two phases: the Creation Phase, where the scope chain is built, variables and functions are hoisted, and 'this' is determined; and the Execution Phase, where code runs line by line. Execution contexts are managed by the Call Stack, which follows LIFO — pushing contexts on function calls and popping them on returns. Understanding execution contexts is fundamental to mastering hoisting, closures, scope, and the 'this' keyword.",
  "interviewQuestions": [
    {
      "question": "What is an execution context in JavaScript?",
      "answer": "An execution context is an abstract environment that contains the code being executed along with all the information needed to execute it — variables, functions, the scope chain, and the value of <code>this</code>. Every time JavaScript code runs, it does so within an execution context."
    },
    {
      "question": "What are the two phases of an execution context?",
      "answer": "<strong>Creation Phase:</strong> The engine creates the variable object, sets up the scope chain, determines the value of <code>this</code>, and hoists declarations. Variables are initialized (var gets <code>undefined</code>, let/const go into TDZ).<br/><br/><strong>Execution Phase:</strong> Code is executed line by line, values are assigned to variables, and functions are invoked."
    },
    {
      "question": "How does the Call Stack relate to execution contexts?",
      "answer": "The Call Stack is a LIFO data structure that manages execution contexts. When a script starts, the Global Execution Context is pushed onto the stack. Each function call pushes a new Function Execution Context onto the stack. When a function returns, its context is popped. The stack trace you see in errors is a snapshot of the Call Stack at the moment the error occurred."
    },
    {
      "question": "What is the difference between the Global Execution Context and a Function Execution Context?",
      "answer": "The GEC is created once when the script loads and persists until the program ends. It creates the global object (<code>window</code> in browsers) and <code>this</code> refers to that global object. A FEC is created fresh for each function invocation, has its own variable environment, arguments object (in non-arrow functions), and a new <code>this</code> binding. FECs are destroyed when the function returns."
    },
    {
      "question": "What happens in the creation phase for a function context?",
      "answer": "In the creation phase of a FEC: 1) An <strong>arguments</strong> object is created containing all passed arguments. 2) The <strong>scope chain</strong> is built by linking the current context's Variable Environment with the outer context's scope. 3) Variables and function declarations are <strong>hoisted</strong>. 4) The value of <code>this</code> is determined based on how the function was called."
    },
    {
      "question": "How many execution contexts can exist at one time?",
      "answer": "There is exactly one Global Execution Context that exists for the lifetime of the program. Multiple Function Execution Contexts can exist simultaneously on the Call Stack — one for each active (not yet returned) function call. The depth is limited by the browser's maximum Call Stack size (typically around 10,000-15,000 frames)."
    },
    {
      "question": "What is the difference between the Variable Environment and the Lexical Environment?",
      "answer": "In ES6+, each execution context has both a <strong>Variable Environment</strong> (for variables declared with <code>var</code>) and a <strong>Lexical Environment</strong> (for variables declared with <code>let</code> and <code>const</code>). The Variable Environment is hoisted with <code>undefined</code>, while the Lexical Environment enforces the Temporal Dead Zone. Both environments are part of the execution context and share the same outer scope reference."
    },
    {
      "question": "How does 'this' get determined in different execution contexts?",
      "answer": "In the Global Execution Context, <code>this</code> refers to the global object (<code>window</code> in browsers). In a Function Execution Context, <code>this</code> depends on how the function is called: as a method → the object; standalone → global (or <code>undefined</code> in strict mode); with <code>new</code> → the new instance; with <code>call/apply/bind</code> → the explicitly bound object. Arrow functions do not have their own <code>this</code> — they inherit it from the enclosing execution context."
    },
    {
      "question": "What is the relationship between execution context and lexical scope?",
      "answer": "An execution context's scope chain is determined by the <strong>lexical scope</strong> (where functions are defined in the source code), not where they are called. This is called static scoping. During the creation phase, the engine sets up the scope chain by linking the current context's variable environment to its parent context's variable environment. This chain is used during execution to resolve variable references."
    },
    {
      "question": "What error occurs when the Call Stack exceeds its limit?",
      "answer": "A <strong>Stack Overflow</strong> error (e.g., <code>Maximum call stack size exceeded</code>). This typically occurs with infinite recursion or very deep recursion. Each function call pushes a new context onto the stack, and when the stack exceeds its allocated memory, the browser throws this error to prevent crashing."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Execution Context Creation Phase</text><text x=\"350\" y=\"62\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Global Execution Context</text><!-- Global Context Box --><rect x=\"50\" y=\"80\" width=\"600\" height=\"180\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"105\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\">Creation Phase</text><!-- Var Env --><rect x=\"70\" y=\"120\" width=\"260\" height=\"120\" rx=\"5\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"200\" y=\"142\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">Variable Environment (var)</text><text x=\"85\" y=\"163\" fill=\"#9aa0b0\" font-size=\"10\" font-family=\"monospace\">var x = undefined (hoisted)</text><text x=\"85\" y=\"183\" fill=\"#9aa0b0\" font-size=\"10\" font-family=\"monospace\">function foo() { ... } (hoisted)</text><text x=\"85\" y=\"203\" fill=\"#9aa0b0\" font-size=\"10\" font-family=\"monospace\">---> outer: null (global)</text><text x=\"85\" y=\"223\" fill=\"#9aa0b0\" font-size=\"10\" font-family=\"monospace\">this -> window</text><!-- Lex Env --><rect x=\"370\" y=\"120\" width=\"260\" height=\"120\" rx=\"5\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"500\" y=\"142\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Lexical Environment (let/const)</text><text x=\"385\" y=\"163\" fill=\"#f87171\" font-size=\"10\" font-family=\"monospace\">let y = TDZ (temporal dead zone)</text><text x=\"385\" y=\"183\" fill=\"#f87171\" font-size=\"10\" font-family=\"monospace\">const z = TDZ (temporal dead zone)</text><text x=\"385\" y=\"203\" fill=\"#9aa0b0\" font-size=\"10\" font-family=\"monospace\">---> outer: null (global)</text><text x=\"385\" y=\"223\" fill=\"#9aa0b0\" font-size=\"10\" font-family=\"monospace\">this -> window</text><!-- Arrow to Execution Phase --><line x1=\"350\" y1=\"265\" x2=\"350\" y2=\"290\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrow)\" stroke-dasharray=\"5\"/><text x=\"360\" y=\"282\" fill=\"#6c9fff\" font-size=\"10\">Execution Phase</text><!-- Execution Phase --><rect x=\"100\" y=\"295\" width=\"500\" height=\"60\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"318\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">Execution Phase</text><text x=\"120\" y=\"342\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">x = 10;  y = 20;  z = 30;  foo();</text><!-- Call Stack --><rect x=\"150\" y=\"380\" width=\"400\" height=\"60\" rx=\"6\" fill=\"#222639\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"350\" y=\"400\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">Call Stack (LIFO)</text><text x=\"170\" y=\"425\" fill=\"#9aa0b0\" font-size=\"10\">[bottom] Global EC | Function EC (foo) | ... [top]</text></svg>",
  "codeExamples": [
    {
      "title": "Tracing Execution Context Creation Order",
      "useCase": "Understanding hoisting timing",
      "code": "console.log(a);  // undefined (var hoisted, not assigned yet)\nvar a = 10;\n\nconsole.log(b);  // ReferenceError: Cannot access 'b' before initialization\nlet b = 20;\n\nfoo();  // 'foo called' (function declaration fully hoisted)\nfunction foo() {\n  console.log('foo called');\n}\n\nbar();  // TypeError: bar is not a function (var hoisted as undefined)\nvar bar = function() {\n  console.log('bar called');\n};",
      "description": "This demonstrates the creation phase behavior: function declarations are fully hoisted, var is hoisted as undefined (accessible but not assigned), and let is in TDZ (inaccessible until declaration)."
    },
    {
      "title": "Function Call Creates New Execution Context",
      "useCase": "Context stack in action",
      "code": "function first() {\n  console.log('Inside first');\n  second();\n  console.log('Back in first');\n}\n\nfunction second() {\n  console.log('Inside second');\n  third();\n  console.log('Back in second');\n}\n\nfunction third() {\n  console.log('Inside third');\n}\n\nconsole.log('Global start');\nfirst();\nconsole.log('Global end');\n\n// Output order:\n// Global start\n// Inside first\n// Inside second\n// Inside third\n// Back in second\n// Back in first\n// Global end",
      "description": "Each function call pushes a new execution context onto the Call Stack. The stack unwinds as each function returns. The Global Context remains at the bottom throughout."
    },
    {
      "title": "The 'this' Binding in Different Contexts",
      "useCase": "Understanding context-dependent this",
      "code": "console.log(this);  // window (global context)\n\nfunction showThis() {\n  console.log(this);  // window (non-strict) or undefined (strict)\n}\n\nconst obj = {\n  name: 'MyObj',\n  showThis: function() {\n    console.log(this);  // obj (method call)\n  },\n  arrowShow: () => {\n    console.log(this);  // window (arrow inherits from global context)\n  }\n};\n\nobj.showThis();    // obj\nobj.arrowShow();   // window\n\nconst isolated = obj.showThis;\nisolated();        // window (lost context, standalone call)\n\nfunction Person(name) {\n  this.name = name;  // new instance (constructor call)\n}\nconst p = new Person('Alice');\nconsole.log(p.name);  // 'Alice'",
      "description": "The value of 'this' is determined by the execution context: global context → global object, method call → the object, constructor → new instance, standalone call → global (or undefined in strict mode). Arrow functions inherit 'this' from the enclosing context."
    },
    {
      "title": "Scope Chain Resolution During Execution",
      "useCase": "How variable lookup works across contexts",
      "code": "const globalVar = 'global';\n\nfunction outer() {\n  const outerVar = 'outer';\n\n  function inner() {\n    const innerVar = 'inner';\n    console.log(innerVar);  // 'inner' (own scope)\n    console.log(outerVar);  // 'outer' (one level up)\n    console.log(globalVar); // 'global' (two levels up)\n  }\n\n  inner();\n}\n\nouter();\n\n// Scope chain for inner():\n// [inner's scope] -> [outer's scope] -> [global scope]",
      "description": "During execution, if a variable is not found in the current execution context's variable environment, the engine traverses the scope chain (linked list of outer environments) until it finds the variable or reaches the global scope."
    },
    {
      "title": "Execution Context Creation with Parameters and Arguments",
      "useCase": "The arguments object in function contexts",
      "code": "function sum(a, b) {\n  console.log(arguments);\n  // Arguments object: { 0: 10, 1: 20, length: 2, callee: sum }\n  console.log(a, b);  // 10, 20\n  return a + b;\n}\n\nsum(10, 20);\n\nfunction dynamic() {\n  console.log(arguments[0]);  // first argument\n  console.log(arguments.length);  // number of arguments\n  \n  // Convert to array\n  const args = Array.from(arguments);\n  // or: const args = [...arguments];\n  console.log(args);\n}\n\ndynamic(1, 2, 3, 4);  // arguments = { 0: 1, 1: 2, 2: 3, 3: 4 }",
      "description": "Every Function Execution Context creates an arguments object (in non-arrow functions) containing all passed arguments. The arguments object is array-like but not a true Array. Modern code uses rest parameters instead: function dynamic(...args)."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is created first when a JavaScript program starts?",
      "options": ["Function Execution Context", "Global Execution Context", "Eval Execution Context", "Module Execution Context"],
      "answer": 1,
      "explanation": "The Global Execution Context is created first, before any code runs. It sets up the global object and 'this' binding."
    },
    {
      "question": "During the creation phase of a Function Execution Context, which of the following is NOT set up?",
      "options": ["Scope chain", "Variable assignments", "Arguments object", "this binding"],
      "answer": 1,
      "explanation": "Variable assignments happen during the Execution Phase, not the Creation Phase. The Creation Phase only hoists declarations and initializes var to undefined."
    },
    {
      "question": "How many Function Execution Contexts can exist at the same time?",
      "options": ["One per function definition", "One per active (non-returned) function call", "Maximum 10", "Unlimited"],
      "answer": 1,
      "explanation": "Each active function invocation creates its own FEC. Multiple can exist simultaneously on the Call Stack, limited only by the maximum stack depth."
    },
    {
      "question": "What happens to a Function Execution Context when the function returns?",
      "options": ["It stays in memory permanently", "It is popped from the Call Stack and becomes eligible for GC", "It moves to the heap", "It gets converted to a closure"],
      "answer": 1,
      "explanation": "When a function returns, its execution context is popped from the Call Stack. If no closures reference its variables, it becomes eligible for garbage collection."
    },
    {
      "question": "In which phase does variable assignment (e.g., x = 10) occur?",
      "options": ["Creation Phase", "Execution Phase", "Parse Phase", "Compilation Phase"],
      "answer": 1,
      "explanation": "Assignments occur during the Execution Phase. The Creation Phase only handles declarations and hoisting."
    },
    {
      "question": "What is contained in a Function Execution Context's Variable Environment?",
      "options": ["Only arguments", "var declarations and function declarations", "All local variables including let/const", "Global variables only"],
      "answer": 1,
      "explanation": "The Variable Environment contains var-declared variables and function declarations. let and const are stored in the separate Lexical Environment."
    },
    {
      "question": "What is the 'outer environment reference' in an execution context?",
      "options": ["A reference to the global object", "A link to the parent execution context's environment", "A reference to the Call Stack", "A link to the function's prototype"],
      "answer": 1,
      "explanation": "The outer environment reference links the current context's environment to the parent context's environment, forming the scope chain for variable resolution."
    },
    {
      "question": "When is the 'arguments' object created in a function context?",
      "options": ["During the Execution Phase", "During the Creation Phase", "Only when arguments are passed", "During the call to arguments.keys()"],
      "answer": 1,
      "explanation": "The arguments object is created during the Creation Phase of a Function Execution Context, before any code executes."
    },
    {
      "question": "What happens when a function calls itself recursively without a base case?",
      "options": ["The program crashes immediately", "New execution contexts are pushed until the Call Stack overflows", "The function is optimized to a loop", "JavaScript silently stops recursion at 100 calls"],
      "answer": 1,
      "explanation": "Each recursive call pushes a new FEC onto the Call Stack. Without a base case, this continues until the maximum stack size is exceeded, causing a stack overflow error."
    },
    {
      "question": "Which statement about the Global Execution Context is true?",
      "components": ["It is created once per function call", "It is destroyed when the last function returns", "var declarations become properties of the global object", "It does not have a scope chain"],
      "answer": 1,
      "explanation": "At the global level, var declarations create properties on the global object (window in browsers). let and const are globally scoped but not attached to the global object."
    }
  ]
}
;
TOPICS_DATA["javascript"]["hoisting"] = {
  "title": "Hoisting & Scope",
  "difficulty": "beginner",
  "estimatedMinutes": 20,

  "tldr": [
    "<strong>Hoisting</strong> is JavaScript's behavior of moving declarations to the top of their containing scope during the compile phase.",
    "<code>var</code> declarations are hoisted and initialized with <code>undefined</code>.",
    "<code>let</code> and <code>const</code> are hoisted but NOT initialized -- they enter the <strong>Temporal Dead Zone (TDZ)</strong> until the declaration is reached.",
    "<strong>Function declarations</strong> are hoisted entirely (definition + body).",
    "<strong>Function expressions</strong> (var/let/const) are hoisted according to their declaration keyword (var -> undefined, let/const -> TDZ)."
  ],

  "laymanDefinition": "Imagine you're reading a recipe book. Before you start cooking, you quickly glance through the entire recipe to see what ingredients you need. You 'hoist' the ingredient list to the top of your mind. JavaScript does the same thing -- before running your code, it scans for all variable and function declarations and moves them to the top of their scope. But there's a catch: if you use 'var', the variable exists but has no value yet (like a labeled empty jar -- you know the jar is there, but it's empty). If you use 'let' or 'const', the variable exists but you can't touch it yet -- it's in a 'temporal dead zone', like an ingredient that's still in the pantry but you're not allowed to open the pantry door until you reach that step in the recipe.",

  "deepDive": [
    {
      "heading": "The Two Phases: Compilation & Execution",
      "text": "JavaScript doesn't run code line by line in a single pass. First, the engine performs a compilation phase where it scans for all declarations (function, var, let, const) and sets up the scope. Then it executes the code. Hoisting is the mental model for understanding how declarations are processed during compilation before execution begins."
    },
    {
      "heading": "var Hoisting: Declaration vs Initialization",
      "text": "When you write <code>var x = 10;</code>, JavaScript splits this into two steps: (1) Declaration: <code>var x;</code> is hoisted to the top of the function scope and initialized with <code>undefined</code>. (2) Assignment: <code>x = 10;</code> stays in its original position. This is why accessing a var variable before its declaration returns <code>undefined</code>, not <code>ReferenceError</code>."
    },
    {
      "heading": "let/const and the Temporal Dead Zone (TDZ)",
      "text": "<code>let</code> and <code>const</code> declarations are also hoisted (they create the binding in the scope), but they are NOT initialized. The variable exists in the scope but is in the TDZ -- any access before the declaration throws a <code>ReferenceError</code>. The TDZ ends when the declaration is evaluated during execution. This provides better error detection than <code>var</code>'s silent <code>undefined</code>."
    },
    {
      "heading": "Function Declaration vs Function Expression Hoisting",
      "text": "A <strong>function declaration</strong> (<code>function foo() {}</code>) is fully hoisted -- both the binding and the function body. You can call a function declaration before its line in the source. A <strong>function expression</strong> (<code>const foo = function() {}</code>) follows the hoisting rules of its keyword -- <code>const</code> means TDZ, <code>var</code> means <code>undefined</code>."
    },
    {
      "heading": "Scope Types in JavaScript",
      "list": [
        "<strong>Global Scope:</strong> Variables declared outside any function or block. Accessible everywhere.",
        "<strong>Function Scope:</strong> Variables declared with <code>var</code> inside a function. Accessible anywhere within that function.",
        "<strong>Block Scope:</strong> Variables declared with <code>let</code> and <code>const</code> inside a block <code>{}</code>. Accessible only within that block.",
        "<strong>Lexical Scope:</strong> Inner functions have access to variables in their outer (parent) scopes -- determined by where functions are written in the code."
      ]
    }
  ],

  "interviewAnswer": "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase. 'var' declarations are hoisted and initialized with undefined, making them accessible (but undefined) before their declaration line. 'let' and 'const' are hoisted but remain in the Temporal Dead Zone until their declaration is evaluated -- accessing them before declaration throws a ReferenceError. Function declarations are fully hoisted and can be called before their definition. Function expressions follow the hoisting rules of the keyword used. Understanding hoisting and the TDZ is critical for avoiding bugs and writing predictable code.",

  "interviewQuestions": [
    {
      "question": "What is the Temporal Dead Zone (TDZ)?",
      "answer": "The Temporal Dead Zone is the period between entering a scope (where a let/const variable is hoisted) and the actual declaration of that variable. During the TDZ, the variable exists in the scope but cannot be accessed. Any attempt to read or write the variable throws a ReferenceError. <strong>Example:</strong><br/><br/><pre><code>{\n  console.log(x); // ReferenceError: Cannot access 'x' before initialization\n  let x = 10;\n}</code></pre>"
    },
    {
      "question": "What is the difference between var, let, and const hoisting?",
      "answer": "<strong>var:</strong> Hoisted and initialized with 'undefined'. Scoped to the enclosing function. Can be redeclared. <strong>let:</strong> Hoisted but NOT initialized (TDZ). Scoped to the enclosing block. Cannot be redeclared in the same scope. <strong>const:</strong> Same hoisting as let (TDZ). Must be initialized at declaration. Cannot be reassigned. <br/><br/><pre><code>console.log(a); // undefined (var)\nconsole.log(b); // ReferenceError (let TDZ)\nconsole.log(c); // ReferenceError (const TDZ)\nvar a = 1;\nlet b = 2;\nconst c = 3;</code></pre>"
    },
    {
      "question": "Explain the difference between function declaration hoisting and function expression hoisting.",
      "answer": "Function declarations are <strong>fully hoisted</strong> -- you can call them before their definition. Function expressions follow the hoisting rules of their assignment keyword. <strong>Example:</strong><br/><br/><pre><code>foo(); // Works: 'foo function'\nbar(); // TypeError: bar is not a function (var is undefined)\nbaz(); // ReferenceError: TDZ\n\nfunction foo() { console.log('foo function'); }\nvar bar = function() { console.log('bar function'); };\nconst baz = function() { console.log('baz function'); };</code></pre>"
    },
    {
      "question": "What does this code output and why? var x = 10; function test() { console.log(x); var x = 20; } test();",
      "answer": "Output: <strong>undefined</strong>. Inside test(), the <code>var x</code> declaration is hoisted to the top of the function scope. The local x shadows the global x. The code is interpreted as:<br/><br/><pre><code>var x = 10;\nfunction test() {\n  var x; // hoisted, initialized to undefined\n  console.log(x); // undefined\n  x = 20;\n}\ntest();</code></pre>"
    },
    {
      "question": "How does hoisting affect class declarations?",
      "answer": "Class declarations (<code>class Foo {}</code>) are hoisted but NOT initialized -- similar to let/const. They are in the TDZ until the declaration is reached. This means you cannot access a class before its definition. <strong>Example:</strong><br/><br/><pre><code>const obj = new Foo(); // ReferenceError: TDZ\nclass Foo {}</code></pre>"
    },
    {
      "question": "What is the scope chain and how does it relate to hoisting?",
      "answer": "The scope chain is the hierarchy of scopes that JavaScript traverses to resolve variable references. Each execution context has a reference to its outer environment. When resolving a variable, JS starts in the current scope, then moves outward. Hoisting affects each scope independently -- declarations are lifted to the top of their respective scope (function scope for var, block scope for let/const)."
    },
    {
      "question": "Does hoisting occur in ES modules?",
      "answer": "Yes, hoisting occurs exactly the same way in ES modules. The module scope behaves like a top-level scope. All hoisting rules (var -> undefined, let/const -> TDZ, function declarations -> fully hoisted) apply within module scope. The only difference is that module-level variables are not added to the global object."
    },
    {
      "question": "What will this code log? console.log(typeof foo); var foo = function() {}; console.log(typeof foo);",
      "answer": "Output: <strong>'undefined'</strong> then <strong>'function'</strong>. The var foo is hoisted (initialized as undefined). Before assignment, typeof undefined is 'undefined'. After the assignment, typeof foo is 'function'."
    },
    {
      "question": "How does hoisting work with IIFEs (Immediately Invoked Function Expressions)?",
      "answer": "IIFEs create a new function scope. Any var declarations inside the IIFE are hoisted to the top of the IIFE's scope, not the outer scope. Let/const declarations are hoisted to the block scope of the IIFE body (in TDZ until declaration). <strong>Example:</strong><br/><br/><pre><code>(function() {\n  console.log(x); // undefined (var hoisted)\n  var x = 5;\n})();\n\nconsole.log(typeof x); // 'undefined' -- x not accessible outside</code></pre>"
    },
    {
      "question": "What is the difference between 'undefined' and 'ReferenceError' in the context of hoisting?",
      "answer": "<strong>undefined</strong> means the variable exists (has been declared/hoisted) but hasn't been assigned a value yet. This occurs with 'var'. <strong>ReferenceError</strong> means the variable cannot be accessed at all -- either it doesn't exist in the scope, or it's in the TDZ (let/const before declaration). The TDZ ReferenceError is more helpful than 'var's silent 'undefined' because it alerts you to a potential logic error."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrowH\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Hoisting & Scope Comparison</text><!-- Header row for 3 columns --><rect x=\"40\" y=\"60\" width=\"190\" height=\"32\" rx=\"4\" fill=\"rgba(248,113,113,0.12)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"135\" y=\"80\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\">var</text><rect x=\"255\" y=\"60\" width=\"190\" height=\"32\" rx=\"4\" fill=\"rgba(251,191,36,0.12)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"80\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\">let</text><rect x=\"470\" y=\"60\" width=\"190\" height=\"32\" rx=\"4\" fill=\"rgba(52,211,153,0.12)\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"565\" y=\"80\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">const</text><!-- Scope --><text x=\"135\" y=\"120\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Function-scoped</text><text x=\"350\" y=\"120\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Block-scoped</text><text x=\"565\" y=\"120\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Block-scoped</text><!-- Hoisting visualization --><line x1=\"60\" y1=\"140\" x2=\"210\" y2=\"140\" stroke=\"var(--border)\" stroke-width=\"1\"/><line x1=\"275\" y1=\"140\" x2=\"425\" y2=\"140\" stroke=\"var(--border)\" stroke-width=\"1\"/><line x1=\"490\" y1=\"140\" x2=\"640\" y2=\"140\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"135\" y=\"165\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\">Hoisted </text><text x=\"350\" y=\"165\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">Hoisted </text><text x=\"565\" y=\"165\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Hoisted </text><!-- Initialization --><text x=\"135\" y=\"190\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Initialized: undefined</text><text x=\"350\" y=\"190\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Uninitialized (TDZ)</text><text x=\"565\" y=\"190\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Uninitialized (TDZ)</text><!-- TDZ bar for let/const --><rect x=\"260\" y=\"208\" width=\"180\" height=\"20\" rx=\"4\" fill=\"rgba(248,113,113,0.15)\" stroke=\"#f87171\" stroke-width=\"1\" stroke-dasharray=\"3\"/><text x=\"350\" y=\"222\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"10\"> TEMPORAL DEAD ZONE </text><rect x=\"475\" y=\"208\" width=\"180\" height=\"20\" rx=\"4\" fill=\"rgba(248,113,113,0.15)\" stroke=\"#f87171\" stroke-width=\"1\" stroke-dasharray=\"3\"/><text x=\"565\" y=\"222\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"10\"> TEMPORAL DEAD ZONE </text><!-- Redeclaration --><text x=\"135\" y=\"255\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Can redeclare </text><text x=\"350\" y=\"255\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Cannot redeclare </text><text x=\"565\" y=\"255\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Cannot redeclare </text><!-- Reassignment --><text x=\"135\" y=\"280\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Can reassign </text><text x=\"350\" y=\"280\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Can reassign </text><text x=\"565\" y=\"280\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"11\">Cannot reassign </text><!-- Code example section --><rect x=\"40\" y=\"300\" width=\"620\" height=\"140\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"322\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Code Example -- What the engine sees after hoisting</text><text x=\"60\" y=\"348\" fill=\"#abb2bf\" font-size=\"10\" font-family=\"monospace\">// What you write:</text><text x=\"60\" y=\"368\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">console.log(a); var a = 1;     // -> undefined</text><text x=\"60\" y=\"388\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">console.log(b); let b = 2;     // -> ReferenceError (TDZ)</text><text x=\"60\" y=\"408\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">console.log(c); const c = 3;   // -> ReferenceError (TDZ)</text><text x=\"60\" y=\"428\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">foo(); function foo() {}       // -> 'foo' works (full hoist)</text></svg><div class=\"diagram-caption\">Side-by-side comparison of var, let, and const hoisting behavior. All three are hoisted, but var is initialized to undefined while let/const remain in the Temporal Dead Zone until their declaration is reached.</div>",

  "codeExamples": [
    {
      "title": "var Hoisting -- The 'undefined' Surprise",
      "useCase": "Understanding var behavior",
      "code": "function hoistingExample() {\n  console.log(message); // undefined -- not ReferenceError!\n  var message = 'Hello';\n  console.log(message); // 'Hello'\n\n  // The above is interpreted as:\n  // var message;\n  // console.log(message); // undefined\n  // message = 'Hello';\n  // console.log(message); // 'Hello'\n}\n\nhoistingExample();",
      "description": "The var declaration is hoisted to the top of the function scope and initialized with undefined. The assignment stays in place. This can lead to confusing bugs."
    },
    {
      "title": "let TDZ -- Early Access Prevention",
      "useCase": "Safe variable usage",
      "code": "function tdzExample() {\n  // console.log(x); // Would throw ReferenceError (TDZ)\n  let x = 10;\n  console.log(x); // 10\n\n  {\n    // console.log(y); // Would throw ReferenceError (TDZ)\n    const y = 20;\n    console.log(y); // 20\n    // y = 30; // TypeError: Assignment to constant variable\n  }\n\n  // console.log(y); // ReferenceError: y is not defined (block scoped)\n}\n\ntdzExample();",
      "description": "let and const are hoisted but inaccessible until the declaration. The TDZ prevents accessing variables before initialization, catching bugs early."
    },
    {
      "title": "Function Declaration Hoisting vs Function Expression",
      "useCase": "Call before definition",
      "code": "// Function Declaration -- fully hoisted\nsayHello(); // 'Hello!'\n\nfunction sayHello() {\n  console.log('Hello!');\n}\n\n// Function Expression -- only variable is hoisted\n// sayGoodbye(); // TypeError: sayGoodbye is not a function\n\nvar sayGoodbye = function() {\n  console.log('Goodbye!');\n};\n\nsayGoodbye(); // 'Goodbye!' (works after assignment)\n\n// Arrow Function Expression\n// greet(); // ReferenceError: TDZ (const)\nconst greet = () => console.log('Hi!');\ngreet(); // 'Hi!'",
      "description": "Function declarations are fully hoisted (definition + body). Function expressions follow the hoisting rules of their binding keyword (var -> undefined, let/const -> TDZ)."
    },
    {
      "title": "Block Scope with let/const in Loops",
      "useCase": "Loop variable isolation",
      "code": "// var -- shares one binding across all iterations\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log('var:', i), 100);\n}\n// Output: var: 3, var: 3, var: 3\n\n// let -- creates a new binding per iteration\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log('let:', j), 100);\n}\n// Output: let: 0, let: 1, let: 2\n\n// const -- also block-scoped, but can't increment\n// for (const k = 0; k < 3; k++) {} // TypeError: Assignment to constant\n\n// With const + for...of:\nconst items = ['a', 'b', 'c'];\nfor (const item of items) {\n  console.log(item); // 'a', 'b', 'c' (new binding each iteration)\n}",
      "description": "var in loops creates a single function-scoped binding. let creates a new block-scoped binding per iteration, which is why closures capture the correct value."
    },
    {
      "title": "Hoisting with Classes and typeof",
      "useCase": "Edge cases & gotchas",
      "code": "// typeof before declaration -- tricky!\nconsole.log(typeof myVar); // 'undefined' (var hoisted)\nconsole.log(typeof myLet); // 'undefined' (not ReferenceError!)\nconsole.log(typeof myFunc); // 'function' (fully hoisted)\n// console.log(typeof MyClass); // ReferenceError: TDZ\n\nvar myVar = 1;\nlet myLet = 2;\nfunction myFunc() {}\nclass MyClass {}\n\n// Edge: typeof on undeclared variable returns 'undefined'\n// But accessing an undeclared variable throws ReferenceError\n// console.log(nonexistent); // ReferenceError\nconsole.log(typeof nonexistent); // 'undefined' (safe check)\n\n// Class expression with const\nconst User = class {\n  constructor(name) { this.name = name; }\n};\nconst user = new User('Alice');\nconsole.log(user.name); // 'Alice'",
      "description": "typeof is a safe check for undeclared variables but will still throw for let/const in TDZ. Classes are like let/const -- hoisted but in TDZ."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What is the output? console.log(a); var a = 5; console.log(a);",
      "options": ["ReferenceError, 5", "5, 5", "undefined, 5", "ReferenceError, ReferenceError"],
      "answer": 2,
      "explanation": "var a is hoisted and initialized to undefined. First console.log outputs undefined. Then a = 5 assigns the value. Second console.log outputs 5."
    },
    {
      "question": "What is the output? { console.log(x); let x = 10; }",
      "options": ["undefined", "10", "ReferenceError", "null"],
      "answer": 2,
      "explanation": "let x is hoisted but in the Temporal Dead Zone until the declaration is reached. Accessing it before the declaration throws a ReferenceError."
    },
    {
      "question": "Which of the following is NOT hoisted?",
      "options": ["var declaration", "function declaration", "class declaration", "All of the above are hoisted"],
      "answer": 3,
      "explanation": "var declarations, function declarations, and class declarations are all hoisted. However, class declarations (like let/const) are in the TDZ until initialized."
    },
    {
      "question": "What does this output? function test() { return bar(); var bar = function() { return 1; }; function bar() { return 2; } } console.log(test());",
      "options": ["1", "2", "undefined", "TypeError"],
      "answer": 1,
      "explanation": "Function declarations are hoisted above var. So the function bar() { return 2; } is hoisted first, then var bar (hoisted but ignored since bar already exists), then bar = function() { return 1; } overwrites it. So bar() returns 1."
    },
    {
      "question": "Which keyword creates function-scoped variables?",
      "options": ["let", "const", "var", "Both let and const"],
      "answer": 2,
      "explanation": "var creates function-scoped variables. let and const create block-scoped variables."
    },
    {
      "question": "What does this log? if (true) { var x = 10; let y = 20; } console.log(x); console.log(y);",
      "options": ["10, 20", "10, ReferenceError", "ReferenceError, ReferenceError", "undefined, undefined"],
      "answer": 1,
      "explanation": "var x is function-scoped (or global), so it's accessible outside the block. let y is block-scoped to the if block, so accessing it outside throws ReferenceError."
    },
    {
      "question": "What is the TDZ (Temporal Dead Zone)?",
      "options": [
        "The time between entering scope and variable declaration for let/const",
        "The time between variable declaration and assignment",
        "The period when a variable is garbage collected",
        "The delay in hoisting for function expressions"
      ],
      "answer": 0,
      "explanation": "The TDZ is the period from entering the scope (where let/const are hoisted) until the actual declaration line is executed. During this time, the variable cannot be accessed."
    },
    {
      "question": "What will this code output? var x = 1; function foo() { console.log(x); var x = 2; } foo();",
      "options": ["1", "2", "undefined", "ReferenceError"],
      "answer": 2,
      "explanation": "Inside foo(), var x is hoisted to the top of the function scope (initialized to undefined), shadowing the global x. So console.log(x) logs undefined."
    },
    {
      "question": "What is the correct execution order when JavaScript processes 'var x = 5;'?",
      "options": [
        "Allocation -> Declaration -> Initialization -> Assignment",
        "Declaration -> Assignment -> Initialization",
        "Declaration + Initialization (hoisted) -> Assignment (in place)",
        "Assignment -> Hoisting -> Declaration"
      ],
      "answer": 2,
      "explanation": "During compilation: var x is hoisted and initialized to undefined. During execution: x = 5 assigns the value at the original line."
    },
    {
      "question": "What does this code log? console.log(typeof foo); if (true) { function foo() {} } console.log(typeof foo);",
      "options": ["'undefined', 'function'", "'function', 'function'", "'undefined', 'undefined'", "ReferenceError"],
      "answer": 1,
      "explanation": "In non-strict mode, function declarations inside blocks are hoisted to the enclosing function/global scope. Both console.log calls see the function."
    }
  ]
}
;
TOPICS_DATA["javascript"]["lexical-scope"] = {
  "title": "Lexical Scope",
  "difficulty": "intermediate",
  "estimatedMinutes": 15,
  "tldr": [
    "<strong>Lexical Scope</strong> (also called Static Scope) means that the scope of a variable is determined by its location in the source code — where the function is <strong>defined</strong>, not where it is <strong>called</strong>.",
    "JavaScript uses lexical scoping exclusively. This is why closures work predictably.",
    "The <strong>scope chain</strong> is fixed at parse time based on the nesting structure of functions in the code.",
    "Lexical scope contrasts with <strong>dynamic scope</strong>, where scope is determined by the call stack at runtime (JavaScript does NOT use dynamic scoping)."
  ],
  "laymanDefinition": "Lexical scope means 'where you write the code determines what you can access'. Imagine you're in a building. If you write a note inside Room 5, it can see things inside Room 5 and things in the building's lobby. It doesn't matter if you tape the note to a drone and fly it to Room 10 — the note can still only see Room 5 and the lobby because that's where it was written. In programming, this means a function has access to the variables where the function was defined, NOT where it's called. This is why closures work — they remember the place they were created.",
  "deepDive": [
    {
      "heading": "Lexical vs Dynamic Scoping",
      "text": "<strong>Lexical scoping:</strong> The scope chain is based on the nesting of functions in the source code. It is determined during parsing/compilation. Function A defined inside Function B will always have access to B's variables, regardless of where or how A is called.<br/><br/><strong>Dynamic scoping (not used by JavaScript):</strong> The scope chain is based on the call stack. A function has access to variables of whatever function called it. This is harder to reason about, and JavaScript explicitly does not use it."
    },
    {
      "heading": "How Lexical Scoping Powers Closures",
      "text": "Closures work BECAUSE of lexical scoping. When a function is defined inside another function, it captures a reference to the outer function's lexical environment. This reference is stored in the function's internal [[Environment]] slot. Even when the outer function returns, the inner function retains access to the outer variables because the lexical scope was set at definition time."
    },
    {
      "heading": "The Scope Chain Is Fixed at Parse Time",
      "text": "During the parsing phase, the JavaScript engine builds a scope tree based on the nesting of functions and blocks in the source code. This tree determines which variables are accessible from which scopes. When a function is called, its execution context's outer environment reference is set to its parent's lexical environment — which was determined during parsing, not during the call."
    },
    {
      "heading": "Common Misconception: 'this' and Lexical Scope",
      "text": "<code>this</code> binding is NOT part of lexical scope. <code>this</code> is determined by how a function is <strong>called</strong> (execution context), not where it is <strong>defined</strong>. This is a key distinction. Arrow functions are an exception — they capture <code>this</code> lexically from their enclosing scope, which is why they behave differently."
    }
  ],
  "interviewAnswer": "Lexical scope means that a function's access to variables is determined by where the function is defined in the source code, not where it is called. JavaScript uses lexical (static) scoping exclusively. When a function is defined inside another function, the inner function has access to the outer function's variables, and this relationship is fixed at parse time. This is the foundation of closures — a closure retains access to its lexical scope even when executed outside that scope. Lexical scope should not be confused with 'this' binding, which is determined dynamically by the call site.",
  "interviewQuestions": [
    {
      "question": "What is lexical scope?",
      "answer": "Lexical scope is the region of a program where a variable is accessible based on its location in the source code. The scope is determined at compile/parse time by the nesting structure of functions and blocks. A function defined inside another function has access to the outer function's variables — this relationship is fixed and does not change at runtime."
    },
    {
      "question": "How does lexical scope differ from dynamic scope?",
      "answer": "In <strong>lexical scoping</strong>, scope is determined by where functions are written (nested in source code). In <strong>dynamic scoping</strong>, scope is determined by the call stack at runtime. JavaScript uses lexical scoping. For example, if function A is defined inside function B, A always has access to B's variables (lexical). Dynamic scoping would give A access to whatever function called it, not where it was defined."
    },
    {
      "question": "How does lexical scope enable closures?",
      "answer": "Closures are a direct consequence of lexical scoping. When a function is defined, it captures its lexical environment (the variables in scope at that location). This capture is permanent. Even if the function is returned from its parent and executed elsewhere, it retains access to those captured variables. Without lexical scoping, closures would not be possible."
    },
    {
      "question": "Is 'this' lexically scoped?",
      "answer": "No. <code>this</code> is determined by how a function is called (the call site), not where it is defined. This is dynamic binding, not lexical scoping. Arrow functions are an exception — they do not have their own <code>this</code> and instead capture <code>this</code> from the enclosing lexical scope."
    },
    {
      "question": "What is the relationship between lexical scope and the scope chain?",
      "answer": "The scope chain is the runtime manifestation of lexical scoping. During parsing, the engine determines which scopes are nested inside which — this is the lexical structure. At runtime, each execution context has an 'outer' reference that points to its parent's variable environment, forming the scope chain. The chain is built precisely according to the lexical nesting of the code."
    },
    {
      "question": "What happens if you have nested functions with the same variable name?",
      "answer": "This is called <strong>variable shadowing</strong>. The innermost variable with that name is used. The outer variable with the same name is 'shadowed' (hidden) but still exists in its own scope. This follows lexical scoping rules — the scope chain is searched from innermost to outermost, and the first match is used."
    },
    {
      "question": "When is lexical scope determined in the JavaScript engine?",
      "answer": "Lexical scope is determined during the <strong>parsing/compilation phase</strong>, before any code executes. The engine builds a scope tree based on the nesting structure of the source code. This is why JavaScript is called a 'lexically scoped' language — the scope structure is visible from the code itself."
    },
    {
      "question": "Can lexical scope change at runtime?",
      "answer": "No. Lexical scope is fixed at parse time. The structure of which variables are accessible from which scopes cannot change. However, the <strong>values</strong> of those variables can change, and <strong>which</strong> variables exist in scope can be affected by conditionals or eval. But the scope chain hierarchy itself is immutable."
    },
    {
      "question": "How does eval() affect lexical scoping?",
      "answer": "In non-strict mode, <code>eval()</code> can introduce new variables into the enclosing lexical scope, modifying the scope at runtime. This is called 'scope pollution' and is why eval is discouraged. In strict mode, eval runs in its own scope and does not affect the enclosing lexical scope. This is a rare exception to lexical scoping's compile-time determination."
    },
    {
      "question": "How do 'let' and 'const' fit into lexical scoping?",
      "answer": "let and const are also lexically scoped, but they are scoped to the nearest enclosing <strong>block</strong> { } rather than the nearest function. This is still lexical scoping — the block structure is determined by the source code at parse time. The difference is the granularity of the scope boundary: function-level (var) vs block-level (let/const)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"400\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Lexical vs Dynamic Scoping</text><text x=\"350\" y=\"60\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">JavaScript uses LEXICAL scoping (based on source code structure)</text><!-- Code area --><rect x=\"30\" y=\"80\" width=\"300\" height=\"300\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"180\" y=\"105\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Source Code Structure</text><text x=\"45\" y=\"130\" fill=\"#6c9fff\" font-size=\"11\" font-family=\"monospace\">1  const x = 'global';</text><text x=\"45\" y=\"152\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">2  function outer() {</text><text x=\"65\" y=\"174\" fill=\"#fbbf24\" font-size=\"11\" font-family=\"monospace\">3    const x = 'outer';</text><text x=\"65\" y=\"196\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">4    function inner() {</text><text x=\"85\" y=\"218\" fill=\"#34d399\" font-size=\"11\" font-family=\"monospace\">5      console.log(x);</text><text x=\"65\" y=\"240\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">6    }</text><text x=\"65\" y=\"262\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">7    return inner;</text><text x=\"45\" y=\"284\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">8  }</text><text x=\"45\" y=\"310\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">9  const fn = outer();</text><text x=\"45\" y=\"332\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">10 fn();  // What is logged?</text><text x=\"45\" y=\"358\" fill=\"#9aa0b0\" font-size=\"10\">Lexical: 'outer' (defines where 'x' refers to)</text><text x=\"45\" y=\"375\" fill=\"#f87171\" font-size=\"10\">Dynamic (if used): 'global' (based on call stack)</text><!-- Results side --><rect x=\"355\" y=\"80\" width=\"320\" height=\"300\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"515\" y=\"105\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\" font-weight=\"bold\">Scope Chain Resolution</text><text x=\"515\" y=\"130\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">inner()'s scope chain (defined at line 5):</text><!-- Scope boxes --><rect x=\"480\" y=\"150\" width=\"170\" height=\"55\" rx=\"5\" fill=\"rgba(52,211,153,0.08)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"565\" y=\"172\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\" font-weight=\"bold\">inner() scope</text><text x=\"495\" y=\"195\" fill=\"#e8eaed\" font-size=\"10\">console.log(x); // not found</text><line x1=\"515\" y1=\"210\" x2=\"515\" y2=\"225\" stroke=\"#fbbf24\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"480\" y=\"228\" width=\"170\" height=\"55\" rx=\"5\" fill=\"rgba(251,191,36,0.08)\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"565\" y=\"250\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"bold\">outer() scope</text><text x=\"495\" y=\"273\" fill=\"#34d399\" font-size=\"10\" font-weight=\"bold\">x = 'outer' <-- FOUND!</text><line x1=\"515\" y1=\"288\" x2=\"515\" y2=\"303\" stroke=\"#6c9fff\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"480\" y=\"306\" width=\"170\" height=\"50\" rx=\"5\" fill=\"rgba(108,159,255,0.08)\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"565\" y=\"328\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"10\" font-weight=\"bold\">global scope</text><text x=\"495\" y=\"348\" fill=\"#9aa0b0\" font-size=\"10\">x = 'global' (shadowed)</text></svg>",
  "codeExamples": [
    {
      "title": "Lexical Scope vs Call Site",
      "useCase": "Proving scope is by definition, not call",
      "code": "const x = 'global';\n\nfunction outer() {\n  const x = 'outer';\n  \n  function inner() {\n    // x is resolved based on WHERE inner is defined\n    // (lexically inside outer), not where it's called\n    console.log(x);\n  }\n  \n  return inner;\n}\n\nconst myFn = outer();\n\nfunction caller() {\n  const x = 'caller';\n  myFn();  // What does it log?\n}\n\ncaller();\n// Output: 'outer'\n// Even though we call myFn() inside caller() where x = 'caller',\n// inner still sees x = 'outer' because that was its lexical scope.\n\n// If JavaScript used dynamic scoping:\n// The output would be 'caller' (based on call stack).\n// But JavaScript uses LEXICAL scoping, so it's 'outer'.",
      "description": "This is the textbook example that proves JavaScript uses lexical scoping. inner() was defined inside outer(), so it sees outer's 'x', not the caller's 'x'. The scope is bound at definition time."
    },
    {
      "title": "Lexical Scoping with Block Scopes",
      "useCase": "Block-scoped let/const are also lexical",
      "code": "const outer = 'global';\n\n{\n  // Block scope (lexically scoped to this block)\n  const blockVar = 'block';\n  \n  {\n    // Nested block scope\n    const nestedVar = 'nested';\n    console.log(nestedVar);  // 'nested' (own scope)\n    console.log(blockVar);   // 'block' (from outer block)\n    console.log(outer);      // 'global' (from global)\n  }\n  \n  // console.log(nestedVar);  // ReferenceError (block-scoped)\n  console.log(blockVar);     // 'block' (still in scope)\n}\n\n// console.log(blockVar);  // ReferenceError (block-scoped)\n\n// The nesting structure of blocks determines the lexical scope,\n// exactly like nested functions.",
      "description": "Block scopes with let/const follow the same lexical scoping rules as functions. The scope chain is based on the nesting structure of blocks in the source code."
    },
    {
      "title": "Arrow Functions and Lexical 'this'",
      "useCase": "Arrow functions capture this lexically",
      "code": "const obj = {\n  name: 'MyObject',\n  regularMethod: function() {\n    // Regular function: 'this' depends on call site\n    console.log('regular:', this.name);\n    \n    const innerRegular = function() {\n      console.log('inner regular:', this.name);\n      // 'this' is global/undefined (lost context)\n    };\n    \n    const innerArrow = () => {\n      console.log('inner arrow:', this.name);\n      // Arrow: 'this' is lexically captured from regularMethod\n    };\n    \n    innerRegular();  // undefined or global\n    innerArrow();    // 'MyObject'\n  },\n  \n  arrowMethod: () => {\n    // Arrow function: 'this' is lexically from enclosing scope\n    console.log('arrow method:', this.name);\n    // 'this' is NOT obj — it's the global object!\n  }\n};\n\nobj.regularMethod();  // Works as expected\nobj.arrowMethod();    // undefined (arrow doesn't have own this)\n\n// Arrow functions capture 'this' from the enclosing lexical scope.\n// Regular functions get 'this' from the call site (dynamic).",
      "description": "Arrow functions capture 'this' from their lexical scope (where they are defined). Regular functions determine 'this' dynamically at the call site. This is the exception to the rule that 'this' is always dynamic."
    },
    {
      "title": "Lexical Scope in Callbacks and Asynchronous Code",
      "useCase": "Scope preservation in async operations",
      "code": "function delayedLogger(message, delay) {\n  // 'message' and 'delay' are lexically scoped to this function\n  \n  setTimeout(function() {\n    // This regular function runs LATER, but still has access\n    // to 'message' and 'delay' via lexical scoping\n    console.log(message + ' (after ' + delay + 'ms)');\n  }, delay);\n  \n  // The callback forms a CLOSURE over 'message' and 'delay'\n}\n\ndelayedLogger('Hello', 1000);\n// After 1 second: 'Hello (after 1000ms)'\n\n// The callback was defined INSIDE delayedLogger, so it\n// captures the lexical scope. This is WHY callbacks work!\n\n// Even though setTimeout's callback runs in a completely\n// different execution context, it still accesses the\n// original 'message' and 'delay' via lexical scoping.",
      "description": "Asynchronous callbacks rely on lexical scoping. The callback function captures the variables it needs from its defining scope. When the callback eventually executes (potentially long after the outer function returned), it still has access to those captured variables."
    },
    {
      "title": "Dynamic Scoping in JavaScript? (Using 'this' as an Analogy)",
      "useCase": "Contrasting lexical scope with dynamic behavior",
      "code": "// JavaScript does NOT use dynamic scoping for VARIABLES\n// But 'this' behaves similarly to dynamic scoping\n\nfunction showThis() {\n  console.log(this.name);\n}\n\nconst obj1 = { name: 'Object 1', show: showThis };\nconst obj2 = { name: 'Object 2', show: showThis };\n\nobj1.show();  // 'Object 1' (depends on CALL SITE — dynamic)\nobj2.show();  // 'Object 2' (depends on CALL SITE — dynamic)\n\n// This is DYNAMIC behavior — 'this' depends on how the\n// function is CALLED, not where it's DEFINED.\n\n// True lexical scope would make showThis always see the\n// same 'name' regardless of how it's called.\n\n// This is why 'this' is confusing — it's the ONE thing\n// in JavaScript that is NOT lexically scoped by default.",
      "description": "The 'this' keyword is the closest thing to dynamic scoping in JavaScript. Its value depends on the call site, not the definition site. This is why 'this' often behaves unexpectedly — it's not lexically scoped."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is lexical scope?",
      "options": ["Scope determined by where a function is called", "Scope determined by where a function is defined in the source code", "Scope that changes at runtime", "Scope that applies only to variables declared with var"],
      "answer": 1,
      "explanation": "Lexical (static) scope is determined by the nesting structure of functions and blocks in the source code at parse/compile time. It does not change based on how or where a function is called."
    },
    {
      "question": "What will this log? const x = 'A'; function outer() { const x = 'B'; function inner() { return x; } return inner; } const fn = outer(); console.log(fn());",
      "options": ["'A'", "'B'", "undefined", "ReferenceError"],
      "answer": 1,
      "explanation": "inner() was defined inside outer(), so it lexically captures outer's scope. Even when called outside outer(), inner() sees x = 'B'."
    },
    {
      "question": "What does 'static scope' mean?",
      "options": ["Scope is determined at compile time, not runtime", "Scope applies only to static methods", "Variables cannot change value", "Scope is determined by the call stack"],
      "answer": 0,
      "explanation": "Static scope (another name for lexical scope) means the scope structure is determined during parsing/compilation, before any code executes. It does not change at runtime."
    },
    {
      "question": "Does JavaScript use dynamic scoping?",
      "options": ["Yes, for all variables", "No, it uses lexical scoping exclusively for variables", "Only for global variables", "Only in strict mode"],
      "answer": 1,
      "explanation": "JavaScript uses lexical (static) scoping exclusively for variables. The scope chain is based on source code nesting, not the call stack. Dynamic scoping is not used."
    },
    {
      "question": "Which JavaScript feature behaves closest to dynamic scoping?",
      "options": ["Variable scope with let", "The 'this' keyword", "Closures", "The scope chain"],
      "answer": 1,
      "explanation": "'this' binding is determined by how a function is called (the call site), which is similar to dynamic scoping. This is why 'this' behaves differently from regular variable resolution."
    },
    {
      "question": "When is the lexical scope chain determined?",
      "options": ["During execution", "During parsing/compilation", "At variable assignment", "When the function is called"],
      "answer": 1,
      "explanation": "The lexical scope chain is determined during the parsing/compilation phase, before any code executes. The nesting structure of functions and blocks sets the scope hierarchy permanently."
    },
    {
      "question": "What will this log? function create() { const x = 10; return { getX: function() { return x; } }; } const obj = create(); console.log(obj.getX());",
      "options": ["undefined", "10", "ReferenceError", "null"],
      "answer": 1,
      "explanation": "getX() was defined inside create(), so it captures x = 10 from create's lexical scope via closure. Even after create() returns, getX() retains access to x."
    },
    {
      "question": "How does lexical scope differ from the call stack?",
      "options": ["The call stack determines scope; lexical scope determines execution order", "Lexical scope is about variable access based on code structure; the call stack tracks function execution order", "They are the same thing", "The call stack is used only in Node.js"],
      "answer": 1,
      "explanation": "Lexical scope determines which variables a function can access based on where it's defined. The call stack tracks which functions are currently executing."
    },
    {
      "question": "What would happen if JavaScript used dynamic scoping?",
      "options": ["Closures would still work the same", "The example with outer()/inner() would log 'global' instead of 'outer'", "Variables would be faster to resolve", "Functions could not be nested"],
      "answer": 1,
      "explanation": "With dynamic scoping, inner() would look at the call stack to resolve 'x', finding it from the calling context (which might be the global scope), not from where inner() was defined."
    },
    {
      "question": "How does an arrow function determine 'this'?",
      "options": ["It has its own 'this' based on the call site", "It captures 'this' lexically from the enclosing scope", "It always binds to the global object", "It doesn't have a 'this' at all"],
      "answer": 1,
      "explanation": "Arrow functions capture 'this' from the enclosing lexical scope — where the arrow function is defined, not where it's called. This is exceptional because regular functions determine 'this' dynamically."
    }
  ]
}
;
TOPICS_DATA["javascript"]["macro-task-queue"] = {
  "title": "Macro Task Queue",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "The <strong>Macrotask Queue</strong> (also called Task Queue or Callback Queue) holds callbacks from <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code> (Node), I/O operations, and <strong>UI events</strong> (clicks, keypresses, etc.).",
    "The Event Loop processes <strong>one macrotask per iteration</strong> — after draining the entire Microtask Queue.",
    "Between macrotask processing, the browser may <strong>re-render the UI</strong> (style calculation, layout, paint).",
    "Macrotasks have <strong>lower priority</strong> than microtasks. Even <code>setTimeout(cb, 0)</code> waits for all microtasks to complete first."
  ],
  "laymanDefinition": "The Macrotask Queue is your regular to-do list. When you receive a notification (like a message alert or a timer going off), you don't drop everything immediately. You finish your current task first, then handle all your priority tasks (microtasks), and THEN pick up one item from this regular list. After handling that one item, you check for priority tasks again before picking up the next regular task. This is why setTimeout and click handlers don't interrupt the current running code — they wait in line.",
  "deepDive": [
    {
      "heading": "What Feeds the Macrotask Queue?",
      "text": "The Macrotask Queue receives callbacks from: (1) <strong>Timers</strong> — setTimeout, setInterval. (2) <strong>I/O</strong> — file system operations (Node.js), network requests. (3) <strong>UI Events</strong> — clicks, keypresses, mouse events, focus events (in browsers). (4) <strong>setImmediate</strong> (Node.js only). (5) <strong>requestAnimationFrame</strong> — though this has special handling before the render step."
    },
    {
      "heading": "One Macrotask Per Iteration",
      "text": "The Event Loop processes exactly <strong>one</strong> macrotask per iteration. After executing that macrotask, it checks the Microtask Queue (drains it entirely), potentially re-renders the UI, and then picks the next macrotask. This 'one per iteration' rule ensures fairness — no single macrotask type can monopolize the Event Loop."
    },
    {
      "heading": "Macrotask Prioritization (Browser-Specific)",
      "text": "While the spec says one macrotask per iteration, browsers internally have different macrotask sources with different priorities. For example, user interaction events (clicks, keypresses) may be prioritized over setTimeout callbacks in some browsers. This is an optimization to make UI interactions feel more responsive."
    },
    {
      "heading": "Macrotasks and UI Rendering",
      "text": "Between processing macrotasks, the browser checks if a re-render is needed. If the DOM was modified, styles were changed, or an animation frame is due, the browser performs style calculation, layout, and paint. This is why heavy DOM manipulation in a macrotask can cause layout thrashing — the browser re-renders between macrotasks, not during them."
    }
  ],
  "interviewAnswer": "The Macrotask Queue holds callbacks from timers (setTimeout, setInterval), I/O operations, UI events (clicks, keypresses), and setImmediate (Node.js). The Event Loop processes exactly one macrotask per iteration, only after the Microtask Queue has been completely drained. Between macrotasks, the browser may re-render the UI. Macrotasks have lower priority than microtasks — even setTimeout with 0ms delay will not execute until all microtasks are processed. Understanding the distinction between microtasks and macrotasks is crucial for predicting JavaScript execution order.",
  "interviewQuestions": [
    {
      "question": "What types of callbacks go into the Macrotask Queue?",
      "answer": "The Macrotask Queue receives: setTimeout and setInterval callbacks, I/O callbacks (file reads, network requests), UI event callbacks (click, keypress, mousedown, etc.), setImmediate (Node.js), and requestAnimationFrame (special handling before render)."
    },
    {
      "question": "How many macrotasks does the Event Loop process per iteration?",
      "answer": "Exactly one. After processing one macrotask, the Event Loop drains the entire Microtask Queue, potentially re-renders the UI, and then processes the next macrotask. This one-per-iteration rule ensures fairness across different task sources."
    },
    {
      "question": "What is the difference between how the Microtask Queue and Macrotask Queue are processed?",
      "answer": "The Microtask Queue is <strong>drained entirely</strong> (all tasks) each time it is checked. The Macrotask Queue is processed <strong>one task at a time</strong> per Event Loop iteration. Microtasks always have priority — if a macrotask queues a microtask, that microtask runs before the next macrotask."
    },
    {
      "question": "Can a macrotask queue a microtask? What happens?",
      "answer": "Yes. When a macrotask callback runs, it can queue microtasks (e.g., resolve a Promise, call queueMicrotask). Those microtasks are executed <strong>immediately</strong> after the current macrotask completes, before the Event Loop picks the next macrotask. This is the mechanism by which Promise reactions become 'asynchronous but as soon as possible'."
    },
    {
      "question": "What happens to the Macrotask Queue during a long synchronous operation?",
      "answer": "Macrotasks accumulate in the queue. All pending macrotasks remain queued until the synchronous operation completes and the microtask queue is drained. Once the Event Loop resumes, it processes all accumulated microtasks, then the next macrotask. The delay can cause timer inaccuracies — a setTimeout of 100ms may actually fire after 500ms if the Event Loop was blocked."
    },
    {
      "question": "Are UI event callbacks (like click) macrotasks?",
      "answer": "Yes. UI event callbacks are macrotasks. When a user clicks a button, the click event is queued in the Macrotask Queue. However, some browsers prioritize user interaction events over timer callbacks to maintain responsiveness. This means a click handler might execute before a setTimeout that was queued earlier."
    },
    {
      "question": "How does setImmediate differ from setTimeout in Node.js?",
      "answer": "setImmediate callbacks are executed in the 'Check' phase of Node.js's Event Loop, which occurs immediately after the 'Poll' phase. setTimeout callbacks are executed in the 'Timers' phase, which comes first. setImmediate is specifically designed to run callbacks as soon as possible after I/O events, making it more efficient than setTimeout(fn, 0) for deferring execution until the next iteration."
    },
    {
      "question": "What is the minimum delay for setTimeout in browsers?",
      "answer": "The HTML5 spec specifies a minimum delay of 4ms for nested setTimeout calls (level 5+). For the first 4 levels, the minimum is 0ms (though browsers may enforce a small minimum). In practice, most browsers enforce at least 1-2ms even for the first call. These minimums exist to prevent timer-based CPU exhaustion."
    },
    {
      "question": "Can you have multiple Macrotask Queues?",
      "answer": "Yes, conceptually. The HTML spec defines multiple macrotask sources (timers, I/O, UI events), and browsers may maintain separate queues for different sources with different priorities. For example, user interaction tasks may have a separate, higher-priority queue than timer tasks. However, the fundamental rule of 'one task per iteration' still applies."
    },
    {
      "question": "How does 'debouncing' relate to the Macrotask Queue?",
      "answer": "Debouncing uses setTimeout (which queues a macrotask) to delay the execution of a function until after a specified quiet period. Each new invocation cancels the previous pending macrotask and schedules a new one. This pattern prevents functions from being called too frequently. Throttling is similar but ensures at most one call per specified interval by checking whether a macrotask is already pending."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 400\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"380\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Macrotask Queue — Event Loop Integration</text><text x=\"350\" y=\"60\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">One macrotask per iteration, after microtasks are drained</text><!-- Left: Call Stack + Microtask --><rect x=\"30\" y=\"80\" width=\"200\" height=\"270\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"105\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\">1. Call Stack + Microtasks</text><text x=\"45\" y=\"130\" fill=\"#e8eaed\" font-size=\"10\">Execute synchronous code</text><text x=\"45\" y=\"150\" fill=\"#fbbf24\" font-size=\"10\">⬇ Drain ALL microtasks</text><text x=\"45\" y=\"175\" fill=\"#9aa0b0\" font-size=\"10\">(Promise callbacks,</text><text x=\"45\" y=\"193\" fill=\"#9aa0b0\" font-size=\"10\"> queueMicrotask,</text><text x=\"45\" y=\"211\" fill=\"#9aa0b0\" font-size=\"10\"> MutationObserver)</text><rect x=\"45\" y=\"235\" width=\"170\" height=\"95\" rx=\"5\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"130\" y=\"257\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\" font-weight=\"bold\">Stack Empty Check</text><text x=\"60\" y=\"278\" fill=\"#9aa0b0\" font-size=\"9\">Event Loop asks:</text><text x=\"60\" y=\"296\" fill=\"#e8eaed\" font-size=\"9\">\"Is stack empty?\"</text><text x=\"60\" y=\"314\" fill=\"#e8eaed\" font-size=\"9\">Yes -> Process next step</text><!-- Arrow to Macrotask --><line x1=\"230\" y1=\"200\" x2=\"260\" y2=\"200\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><text x=\"245\" y=\"194\" fill=\"#34d399\" font-size=\"9\">stack empty</text><!-- Right: Macrotask Queue --><rect x=\"265\" y=\"80\" width=\"200\" height=\"270\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"365\" y=\"105\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">2. Macrotask Queue</text><!-- Queue items --><rect x=\"280\" y=\"120\" width=\"170\" height=\"30\" rx=\"4\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"365\" y=\"140\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">click event handler</text><rect x=\"280\" y=\"158\" width=\"170\" height=\"30\" rx=\"4\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"365\" y=\"178\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">setInterval callback</text><rect x=\"280\" y=\"196\" width=\"170\" height=\"30\" rx=\"4\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"365\" y=\"216\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\" font-weight=\"bold\">→ setTimeout(fn, 0)</text><rect x=\"280\" y=\"234\" width=\"170\" height=\"30\" rx=\"4\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"365\" y=\"254\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">I/O callback (fs.read)</text><text x=\"365\" y=\"290\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Take ONE from front</text><text x=\"365\" y=\"308\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Execute it</text><text x=\"365\" y=\"326\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"10\">Back to check microtasks!</text><!-- Right: Render --><rect x=\"500\" y=\"80\" width=\"170\" height=\"270\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#a78bfa\" stroke-width=\"1.5\"/><text x=\"585\" y=\"105\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"bold\">3. UI Render (Browser)</text><text x=\"515\" y=\"135\" fill=\"#e8eaed\" font-size=\"10\">Style calculation</text><text x=\"515\" y=\"158\" fill=\"#e8eaed\" font-size=\"10\">Layout (reflow)</text><text x=\"515\" y=\"181\" fill=\"#e8eaed\" font-size=\"10\">Paint</text><text x=\"515\" y=\"204\" fill=\"#e8eaed\" font-size=\"10\">Compositing</text><text x=\"585\" y=\"240\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Not every iteration!</text><text x=\"585\" y=\"258\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Only when needed</text><text x=\"585\" y=\"276\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">(~60fps target)</text><text x=\"585\" y=\"310\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"10\" font-weight=\"bold\">⬆ Back to step 1</text></svg>",
  "codeExamples": [
    {
      "title": "One Macrotask Per Iteration in Action",
      "useCase": "Understanding macrotask batching",
      "code": "console.log('1 - sync');\n\nsetTimeout(() => {\n  console.log('2 - macrotask A');\n}, 0);\n\nsetTimeout(() => {\n  console.log('3 - macrotask B');\n}, 0);\n\n// Schedule a microtask that will run BETWEEN the two macrotasks\nPromise.resolve().then(() => {\n  console.log('4 - microtask (runs between A and B)');\n});\n\nsetTimeout(() => {\n  console.log('5 - macrotask C');\n}, 0);\n\nconsole.log('6 - sync');\n\n// Output:\n// 1 - sync\n// 6 - sync\n// 4 - microtask (runs between A and B)\n// 2 - macrotask A\n// 4 - microtask (runs between A and B)\n// 3 - macrotask B\n// 4 - microtask (runs between A and B)\n// 5 - macrotask C\n\n// Wait, that's not right. Let me trace more carefully:\n// Actually the microtask was queued ONCE before any macrotask\n// So it runs ONCE after sync but before macrotask A:\n// 1, 6, 4, 2, 3, 5",
      "description": "The microtask (4) runs after all sync code but before the first macrotask. Then each macrotask (2, 3, 5) runs one per Event Loop iteration. The Promise.then only queues a single microtask, so it runs only once."
    },
    {
      "title": "Measuring Timer Accuracy with Event Loop Blocking",
      "useCase": "Timer drift under load",
      "code": "const start = Date.now();\n\n// Schedule a timer for 100ms\nsetTimeout(() => {\n  const actualDelay = Date.now() - start;\n  console.log(`Expected: 100ms, Actual: ${actualDelay}ms`);\n}, 100);\n\n// Block the Event Loop for 500ms\nconst blockStart = Date.now();\nwhile (Date.now() - blockStart < 500) {\n  // Busy wait\n}\n\nconsole.log('Event Loop was blocked for 500ms');\n\n// Output:\n// Event Loop was blocked for 500ms\n// Expected: 100ms, Actual: ~500ms (or more!)\n\n// The timer callback was queued at 100ms but couldn't execute\n// until the Event Loop was unblocked at 500ms.\n// Timers are NOT guaranteed to be precise — they specify\n// the MINIMUM delay, not an exact delay.",
      "description": "Timers are not precise. They specify the minimum delay before execution. If the Event Loop is blocked when the timer fires, the callback waits in the Macrotask Queue until the stack is empty. Always account for possible timer drift in production code."
    },
    {
      "title": "setTimeout vs setInterval Behavior",
      "useCase": "Understanding timer differences",
      "code": "// setTimeout: executes ONCE after delay\nlet timeoutId = setTimeout(() => {\n  console.log('Executed once after 1 second');\n}, 1000);\n\n// Cancelling a timeout\nclearTimeout(timeoutId); // Nothing happens\n\n// setInterval: executes REPEATEDLY every delay\nlet count = 0;\nconst intervalId = setInterval(() => {\n  count++;\n  console.log(`Interval execution #${count}`);\n  \n  if (count >= 3) {\n    clearInterval(intervalId);\n    console.log('Interval cleared');\n  }\n}, 500);\n\n// Important: setInterval doesn't account for callback execution time\n// If the callback takes 200ms and interval is 500ms:\n// Wait 500ms -> execute (200ms) -> wait 500ms from START of previous -> execute\n// This can cause overlapping executions if callback takes longer than interval!\n\n// Safer: recursive setTimeout\nfunction safeInterval(fn, delay) {\n  function wrapper() {\n    fn();\n    setTimeout(wrapper, delay);\n  }\n  setTimeout(wrapper, delay);\n}\n// This ensures the delay starts AFTER the callback completes",
      "description": "setTimeout runs once; setInterval runs repeatedly. Recursive setTimeout is often preferred over setInterval because it waits for the callback to complete before starting the next timer, preventing overlapping executions."
    },
    {
      "title": "UI Events Are Macrotasks: Click Handler Timing",
      "useCase": "Understanding event handler execution order",
      "code": "// In the browser:\n\ndocument.getElementById('btn').addEventListener('click', () => {\n  console.log('1 - click handler (macrotask)');\n  \n  Promise.resolve().then(() => {\n    console.log('2 - microtask queued by click handler');\n  });\n});\n\ndocument.getElementById('btn').addEventListener('click', () => {\n  console.log('3 - second click handler (same macrotask?)');\n});\n\n// When user clicks the button:\n// 1. Click event is queued in Macrotask Queue\n// 2. Event Loop processes it (stack empty, microtasks clear)\n// 3. First handler runs: logs '1 - click handler'\n// 4. Second handler runs: logs '3 - second click handler'\n// 5. Microtask from step 3 runs: logs '2 - microtask...'\n//\n// NOTE: Multiple handlers for the SAME event are in ONE macrotask!\n// They run sequentially without microtask check in between.",
      "description": "UI event callbacks are macrotasks. Multiple handlers for the same event are grouped into a single macrotask. Microtasks queued by event handlers execute after all handlers for that event complete, before the next macrotask."
    },
    {
      "title": "setImmediate in Node.js vs setTimeout(fn, 0)",
      "useCase": "Node.js-specific macrotask API",
      "code": "// Node.js only\nconst fs = require('fs');\n\n// setTimeout(cb, 0) - runs in 'Timers' phase\nsetTimeout(() => {\n  console.log('1 - setTimeout (Timers phase)');\n}, 0);\n\n// setImmediate - runs in 'Check' phase (after I/O)\nsetImmediate(() => {\n  console.log('2 - setImmediate (Check phase)');\n});\n\n// Inside an I/O callback, setImmediate ALWAYS runs before setTimeout\nfs.readFile(__filename, () => {\n  setTimeout(() => {\n    console.log('3 - setTimeout inside I/O');\n  }, 0);\n  \n  setImmediate(() => {\n    console.log('4 - setImmediate inside I/O (wins over setTimeout)');\n  });\n});\n\n// Outside I/O, the order is non-deterministic (depends on phase timing)\n// But inside I/O: setImmediate (4) always runs before setTimeout (3)",
      "description": "In Node.js, setImmediate callbacks run in the 'Check' phase, which occurs right after the 'Poll' phase (I/O callbacks). Inside an I/O callback, setImmediate always beats setTimeout(fn, 0) because setTimeout is in the earlier 'Timers' phase which already passed."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How many macrotasks does the Event Loop process per iteration?",
      "options": ["All of them", "Exactly one", "All that were queued before the last render", "Depends on the browser"],
      "answer": 1,
      "explanation": "The Event Loop processes exactly ONE macrotask per iteration. After that, it returns to drain the Microtask Queue before picking the next macrotask."
    },
    {
      "question": "What happens when you call setTimeout with 0ms delay?",
      "options": ["The callback executes immediately", "The callback is queued in the Macrotask Queue and runs after sync code and all microtasks", "The callback runs before synchronous code", "The callback is ignored"],
      "answer": 1,
      "explanation": "setTimeout(cb, 0) queues the callback in the Macrotask Queue. It runs after all synchronous code AND after the entire Microtask Queue is drained."
    },
    {
      "question": "Which of the following is NOT a macrotask source?",
      "options": ["setTimeout", "Promise.then", "setInterval", "UI event (click)"],
      "answer": 1,
      "explanation": "Promise.then callbacks are microtasks, not macrotasks. setTimeout, setInterval, and UI events are all macrotask sources."
    },
    {
      "question": "If a macrotask queues a microtask, when does that microtask execute?",
      "options": ["During the next macrotask", "Immediately after the current macrotask, before the next macrotask", "After all macrotasks are done", "In a separate thread"],
      "answer": 1,
      "explanation": "Microtasks queued by a macrotask are executed immediately after the current macrotask completes, before the Event Loop picks the next macrotask."
    },
    {
      "question": "What is the minimum delay enforced for nested setTimeout calls in browsers?",
      "options": ["0ms", "4ms", "10ms", "100ms"],
      "answer": 1,
      "explanation": "The HTML5 spec enforces a minimum 4ms delay for nested setTimeout calls (level 5+). This prevents timer-based CPU exhaustion attacks."
    },
    {
      "question": "What happens to a setTimeout callback if the Event Loop is blocked for 3 seconds?",
      "options": ["It executes immediately when the delay expires, even if blocked", "It waits in the Macrotask Queue until the stack is empty", "It is cancelled", "It runs in a background thread"],
      "answer": 1,
      "explanation": "The timer fires after its delay, but the callback waits in the Macrotask Queue. It only executes when the Call Stack is empty and all microtasks are drained."
    },
    {
      "question": "How do multiple event handlers for the same event execute?",
      "options": ["Each handler is a separate macrotask", "All handlers for the event execute as a single macrotask", "The first handler is a microtask, the rest are macrotasks", "They execute in random order"],
      "answer": 1,
      "explanation": "Multiple event listeners for the same event are dispatched as part of a single macrotask. They run sequentially, and microtasks queued by them run after all handlers complete."
    },
    {
      "question": "In Node.js, in which Event Loop phase does setImmediate run?",
      "options": ["Timers phase", "Check phase", "Poll phase", "Close phase"],
      "answer": 1,
      "explanation": "setImmediate callbacks run in the 'Check' phase of Node.js's Event Loop, which occurs immediately after the 'Poll' phase. This is why setImmediate often beats setTimeout(fn, 0) inside I/O callbacks."
    },
    {
      "question": "What will this log? setTimeout(() => console.log('A'), 0); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C')); console.log('D');",
      "options": ["D, C, A, B", "D, A, B, C", "D, C, B, A", "C, D, A, B"],
      "answer": 0,
      "explanation": "D is sync. C is a microtask (runs after sync, before macrotasks). A and B are macrotasks (run one per iteration). Output: D, C, A, B."
    },
    {
      "question": "What is a key difference between browser and Node.js macrotask handling?",
      "options": ["Node.js does not have macrotasks", "Browsers have a UI render step between macrotasks; Node.js does not", "setTimeout only works in browsers", "Macrotasks are processed randomly in Node.js"],
      "answer": 1,
      "explanation": "Browsers perform UI rendering (style, layout, paint) between macrotasks. Node.js has no rendering step but has additional phases (Timers, I/O, Poll, Check, Close) with different macrotask sources."
    }
  ]
}
;
TOPICS_DATA["javascript"]["memory-heap"] = {
  "title": "Memory Heap",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "The <strong>Memory Heap</strong> is a large, unstructured region of memory where objects, arrays, functions, and closures are stored.",
    "Unlike the Call Stack (structured LIFO), the Heap has no order — objects are allocated and freed as needed.",
    "Heap memory is managed by JavaScript's <strong>Garbage Collector</strong> (GC), which automatically frees memory that is no longer reachable.",
    "Common GC algorithms: <strong>Mark-and-Sweep</strong> (V8, SpiderMonkey) and <strong>Reference Counting</strong>."
  ],
  "laymanDefinition": "Imagine a giant warehouse where you can store anything — furniture, boxes, equipment — and you can place them anywhere there's space. This is the Memory Heap. Unlike the Call Stack (which is like a neat stack of trays), the Heap is messy and disorganized. When you create objects or arrays in JavaScript, they're stored in the Heap. When you no longer need something, a cleaning crew (the Garbage Collector) periodically walks through the warehouse, finds items that nobody is using anymore, and throws them away to make room for new things.",
  "deepDive": [
    {
      "heading": "Stack vs Heap: What Goes Where?",
      "text": "<strong>Primitive values</strong> (numbers, strings, booleans, null, undefined, symbols) are stored directly on the Call Stack as values. <strong>Reference values</strong> (objects, arrays, functions) are stored in the Heap, and a reference (pointer) to them is stored on the Call Stack. When you assign an object to a variable, the variable holds a reference to the object's location in the Heap, not the object itself."
    },
    {
      "heading": "Garbage Collection: Mark-and-Sweep",
      "text": "V8 (Chrome/Node.js) uses a generational garbage collector based on Mark-and-Sweep. Algorithm: 1) The GC starts from root references (global object, Call Stack local variables). 2) It traverses all references from these roots, <strong>marking</strong> every object it reaches. 3) Any object that was not marked is <strong>swept</strong> (freed) because it is unreachable. This runs periodically and during idle time to minimize performance impact."
    },
    {
      "heading": "Memory Leaks in the Heap",
      "text": "A memory leak occurs when objects are no longer needed but remain reachable, preventing garbage collection. Common causes: (1) <strong>Global variables</strong> — accidental globals are never freed. (2) <strong>Forgotten timers/callbacks</strong> — setInterval with a reference to DOM nodes. (3) <strong>Closures</strong> — capturing large objects in a closure scope. (4) <strong>Detached DOM nodes</strong> — removing DOM elements but keeping JS references. (5) <strong>Event listeners</strong> — not removing listeners when elements are removed."
    },
    {
      "heading": "V8 Heap Structure: New Space and Old Space",
      "text": "V8 divides the Heap into generations. <strong>New Space (Young Generation):</strong> Small (1-8 MB), where new objects are allocated. GC runs frequently here (Scavenge algorithm). Most objects die young. <strong>Old Space (Old Generation):</strong> Objects that survive multiple GC cycles are promoted here. GC runs less frequently but takes longer (Mark-Sweep-Compact). This generational approach optimizes for the fact that most objects have a short lifespan."
    }
  ],
  "interviewAnswer": "The Memory Heap is JavaScript's unstructured memory pool where all reference-type values (objects, arrays, closures, functions) are stored. Primitive values live on the Call Stack. Heap memory is managed automatically by the Garbage Collector, which primarily uses Mark-and-Sweep: it starts from root references and marks all reachable objects, then frees unmarked ones. V8 uses generational collection — young objects in New Space are collected frequently with Scavenge, while survivors are promoted to Old Space where Mark-Sweep-Compact runs less often. Common heap memory leaks include global variables, forgotten closures, detached DOM references, and uncleaned event listeners.",
  "interviewQuestions": [
    {
      "question": "What is the difference between the Stack and the Heap in JavaScript?",
      "answer": "The <strong>Stack</strong> stores primitive values and references to objects in a structured LIFO format. It is fast, small, and automatically managed by function calls/returns. The <strong>Heap</strong> stores actual objects, arrays, and functions. It is larger, slower to allocate, and managed by the Garbage Collector. Stack memory is freed when a function returns; Heap memory is freed when objects become unreachable."
    },
    {
      "question": "How does JavaScript's Garbage Collector work?",
      "answer": "JavaScript uses automatic garbage collection, primarily through the <strong>Mark-and-Sweep</strong> algorithm. The GC starts from root references (global object, local variables on the stack) and traverses all reachable objects, marking them. Objects that are not marked are considered unreachable and their memory is freed (swept). V8 enhances this with generational collection: frequent, fast collections in the young generation and infrequent, full collections in the old generation."
    },
    {
      "question": "What is a memory leak in JavaScript and how do you prevent one?",
      "answer": "A memory leak is when memory that is no longer needed is not freed because there is still a reference keeping it alive. Prevention: (1) Avoid accidental globals by using strict mode and declaring variables with let/const. (2) Clear timers/intervals with clearInterval/clearTimeout. (3) Remove event listeners when DOM elements are removed. (4) Nullify references to large objects when done. (5) Avoid retaining large data in closures unnecessarily. Use Chrome DevTools Memory tab to detect leaks."
    },
    {
      "question": "What is the difference between 'mark-and-sweep' and 'reference counting'?",
      "answer": "<strong>Mark-and-Sweep:</strong> Starts from roots and marks all reachable objects. Unmarked objects are freed. This correctly handles circular references. <strong>Reference Counting:</strong> Tracks how many references point to each object. When the count drops to zero, the object is freed. This fails with circular references (two objects referencing each other but no external references). Modern engines use Mark-and-Sweep exclusively."
    },
    {
      "question": "What are the V8 Heap's 'New Space' and 'Old Space'?",
      "answer": "<strong>New Space (Young Generation):</strong> 1-8 MB, where most objects are initially allocated. GC runs frequently using the Scavenge algorithm (fast, only collects this space). Objects that survive two GC cycles are promoted. <strong>Old Space (Old Generation):</strong> Where long-lived objects live. GC runs less frequently using Mark-Sweep-Compact (slower but more thorough). This generational approach is based on the observation that most objects die young."
    },
    {
      "question": "Are primitive values stored on the Heap or the Stack?",
      "answer": "Primitive values (string, number, boolean, null, undefined, symbol, bigint) are stored directly on the <strong>Call Stack</strong> as values, not references. However, strings that are very large may be stored in the Heap and a reference placed on the Stack. Modern engines optimize this internally. The key point: primitives are value types, objects are reference types."
    },
    {
      "question": "What happens to Heap memory when a function returns?",
      "answer": "The function's <strong>stack frame</strong> is popped from the Call Stack. If the function created objects in the Heap and no external references to those objects exist, they become unreachable and will be collected by the GC on its next sweep. If references to those objects are stored in global variables, closures, or returned from the function, they remain alive in the Heap."
    },
    {
      "question": "How can you detect memory leaks in JavaScript?",
      "answer": "Use browser DevTools: (1) <strong>Performance tab</strong> — record and look for growing heap usage with no GC drops. (2) <strong>Memory tab</strong> — take heap snapshots and compare them to find objects that should have been freed. (3) <strong>Timeline</strong> — watch for continuous allocation without deallocation. In Node.js, use <code>--inspect</code> flag with Chrome DevTools or the <code>process.memoryUsage()</code> API."
    },
    {
      "question": "What objects are considered 'roots' for garbage collection?",
      "answer": "Roots are the starting points for GC's reachability analysis: (1) The <strong>global object</strong> (window/globalThis). (2) <strong>Local variables</strong> and <strong>parameters</strong> on all active Call Stack frames. (3) <strong>Active closures</strong> — variables referenced by closures on the stack. (4) <strong>DOM elements</strong> referenced from the DOM tree. Any object reachable from these roots (via property references, array elements, etc.) is considered alive."
    },
    {
      "question": "Does assigning null to a variable free its heap memory immediately?",
      "answer": "No. Assigning <code>null</code> removes one reference to the object, but does NOT immediately free memory. The object becomes eligible for garbage collection only when there are zero references pointing to it. The actual memory reclamation happens during the next GC cycle, which runs at engine-determined intervals. This is why it's called 'garbage <strong>collection</strong>' not 'garbage <strong>deletion</strong>'. The GC decides when to run."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 460\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"440\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Memory Management: Stack vs Heap</text><!-- Stack side --><rect x=\"30\" y=\"65\" width=\"300\" height=\"180\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"180\" y=\"90\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">CALL STACK</text><text x=\"180\" y=\"108\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Stores primitives + references to heap objects</text><rect x=\"50\" y=\"122\" width=\"260\" height=\"28\" rx=\"4\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"65\" y=\"141\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">const name = 'Alice';     // primitive on stack</text><rect x=\"50\" y=\"156\" width=\"260\" height=\"28\" rx=\"4\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"65\" y=\"175\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">const age = 30;            // primitive on stack</text><rect x=\"50\" y=\"190\" width=\"260\" height=\"28\" rx=\"4\" fill=\"rgba(52,211,153,0.08)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"65\" y=\"209\" fill=\"#34d399\" font-size=\"10\" font-family=\"monospace\">const user = ---------------->  REFERENCE</text><!-- Arrow from stack to heap --><line x1=\"310\" y1=\"210\" x2=\"370\" y2=\"210\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><text x=\"340\" y=\"204\" fill=\"#34d399\" font-size=\"9\">pointer</text><!-- Heap side --><rect x=\"370\" y=\"65\" width=\"300\" height=\"370\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"520\" y=\"90\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold\">MEMORY HEAP</text><text x=\"520\" y=\"108\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Stores objects, arrays, functions, closures</text><!-- Objects in heap --><rect x=\"390\" y=\"122\" width=\"260\" height=\"50\" rx=\"4\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"405\" y=\"142\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">Object { name: 'Alice',</text><text x=\"405\" y=\"160\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">  age: 30, city: 'NYC' }</text><rect x=\"390\" y=\"182\" width=\"260\" height=\"50\" rx=\"4\" fill=\"#222639\" stroke=\"var(--border)\"/><text x=\"405\" y=\"202\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\">Array [ '🍎', '🍊', '🍋' ]</text><rect x=\"390\" y=\"242\" width=\"260\" height=\"50\" rx=\"4\" fill=\"rgba(248,113,113,0.08)\" stroke=\"#f87171\" stroke-width=\"1\" stroke-dasharray=\"3\"/><text x=\"405\" y=\"262\" fill=\"#f87171\" font-size=\"10\" font-family=\"monospace\">UNREACHABLE OBJECT</text><text x=\"405\" y=\"280\" fill=\"#f87171\" font-size=\"10\">(no references -> GC will sweep)</text><rect x=\"390\" y=\"305\" width=\"260\" height=\"110\" rx=\"4\" fill=\"rgba(167,139,250,0.06)\" stroke=\"#a78bfa\" stroke-width=\"1\"/><text x=\"520\" y=\"325\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"11\" font-weight=\"bold\">Garbage Collection (Mark-Sweep)</text><text x=\"405\" y=\"348\" fill=\"#9aa0b0\" font-size=\"9\">1. Start from ROOTS (global, stack)</text><text x=\"405\" y=\"366\" fill=\"#9aa0b0\" font-size=\"9\">2. MARK all reachable objects</text><text x=\"405\" y=\"384\" fill=\"#9aa0b0\" font-size=\"9\">3. SWEEP unmarked objects</text><text x=\"405\" y=\"402\" fill=\"#9aa0b0\" font-size=\"9\">4. COMPACT to reduce fragmentation</text></svg>",
  "codeExamples": [
    {
      "title": "Stack vs Heap: Primitive vs Reference Assignment",
      "useCase": "Understanding value vs reference behavior",
      "code": "// Primitives (Stack) - copied by value\nlet a = 10;\nlet b = a;\nb = 20;\nconsole.log(a); // 10 (unchanged)\nconsole.log(b); // 20\n\n// Objects (Heap) - copied by reference\nlet obj1 = { value: 10 };\nlet obj2 = obj1;\nobj2.value = 20;\nconsole.log(obj1.value); // 20 (changed!)\nconsole.log(obj2.value); // 20\n\n// The variable holds a REFERENCE to the heap object\n// Both obj1 and obj2 point to the SAME object on the heap\n\n// Creating a true copy (new heap allocation)\nlet obj3 = { ...obj1 }; // shallow copy\nobj3.value = 30;\nconsole.log(obj1.value); // 20 (unchanged)\nconsole.log(obj3.value); // 30",
      "description": "Primitives are stored directly on the stack and copied by value. Objects are stored on the heap and variables hold references (pointers) to them. This is why mutating an object through one variable affects all references to that object."
    },
    {
      "title": "Memory Leak from Accidental Global Variables",
      "useCase": "Common leak source",
      "code": "function createLeak() {\n  // Accidentally creates global variable (no 'let'/'const'/'var')\n  leaked = new Array(1000000).fill('leak');\n  // Assigns to global object (window.leaked)\n}\n\ncreateLeak();\n// After function returns, 'leaked' is still on the global object\n// => NEVER garbage collected\n\n// Fix: Always use strict mode\n'use strict';\nfunction noLeak() {\n  leaked = 'will throw ReferenceError'; // Error in strict mode\n}\n\n// Or always declare with let/const:\nfunction safeFunction() {\n  const data = new Array(1000).fill('safe');\n  // data is local - eligible for GC after function returns\n}",
      "description": "Without strict mode, assigning to an undeclared variable creates a property on the global object. Global properties are never garbage collected. Using strict mode ('use strict') prevents this by throwing a ReferenceError."
    },
    {
      "title": "Memory Leak from Forgotten Closures",
      "useCase": "Closures retaining large data",
      "code": "function createLeakyHandler() {\n  const largeData = new Array(100000).fill('data');\n  // largeData is captured by the closure below\n\n  document.getElementById('btn').addEventListener('click', function() {\n    console.log('Button clicked');\n    // This closure keeps largeData alive FOREVER\n    // even if we never use largeData here\n  });\n}\n\n// Fix: nullify references after use, or avoid capturing unnecessary data\nfunction createFixedHandler() {\n  const largeData = new Array(100000).fill('data');\n  // Use largeData synchronously\n  processData(largeData);\n\n  document.getElementById('btn').addEventListener('click', function() {\n    console.log('Button clicked');\n    // No reference to largeData here\n  });\n\n  // largeData can now be GC'd (no closure references it)\n}\n\n// Alternative: explicitly null the reference\nfunction createExplicitHandler() {\n  let largeData = new Array(100000).fill('data');\n\n  const handler = function() {\n    console.log('Button clicked');\n  };\n\n  document.getElementById('btn').addEventListener('click', handler);\n  largeData = null; // Remove the reference\n  // Now largeData can be GC'd even though the closure exists\n}",
      "description": "Closures capture the entire scope, not just the variables they use. If a closure references a function that contains a large object, that object stays in memory as long as the closure exists. Minimize closure scope and nullify large references when done."
    },
    {
      "title": "Detached DOM Tree Memory Leak",
      "useCase": "DOM reference leaks",
      "code": "function createDetachedNodes() {\n  const container = document.createElement('div');\n  const button = document.createElement('button');\n  button.textContent = 'Click';\n  container.appendChild(button);\n\n  // Removes from DOM but keeps JS reference\n  document.body.appendChild(container);\n\n  // Later, we remove from DOM\n  document.body.removeChild(container);\n  // BUT: 'container' variable still holds a reference\n  // => container and button are DETACHED but NOT GC'd\n\n  // The DOM tree in memory: container -> button\n  // Neither is in the document, but both are reachable via JS\n}\n\n// Fix: nullify the reference when removing\nfunction fixDetachedNodes() {\n  const container = document.createElement('div');\n  document.body.appendChild(container);\n\n  document.body.removeChild(container);\n  // container = null; // Now eligible for GC\n}",
      "description": "Detached DOM nodes are elements that are removed from the document but still referenced by JavaScript variables. The entire subtree of a detached node remains in memory. Always nullify references to removed DOM elements."
    },
    {
      "title": "WeakMap for Safe Object Associations",
      "useCase": "Memory-safe caching with WeakMap",
      "code": "// BAD: Map keeps references alive forever\nconst cache = new Map();\nfunction process(obj) {\n  if (cache.has(obj)) {\n    return cache.get(obj);\n  }\n  const result = expensiveComputation(obj);\n  cache.set(obj, result);\n  return result;\n}\n// cache prevents GC of any obj passed to process()\n\n// GOOD: WeakMap allows GC when object is no longer referenced\nconst weakCache = new WeakMap();\nfunction processWeak(obj) {\n  if (weakCache.has(obj)) {\n    return weakCache.get(obj);\n  }\n  const result = expensiveComputation(obj);\n  weakCache.set(obj, result);\n  return result;\n}\n// When 'obj' goes out of scope, the entry is automatically\n// removed from weakCache by the GC\n\n// WeakMaps hold 'weak' references - they don't prevent GC\n// Perfect for caches, metadata, and private data associations",
      "description": "WeakMap holds weak references to its keys, meaning it does not prevent garbage collection. When a key object is no longer referenced elsewhere, the entry is automatically removed from the WeakMap. This is ideal for caches and metadata to avoid memory leaks."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Where is the object stored in this code? const obj = { name: 'Test' };",
      "options": ["On the Call Stack", "On the Memory Heap", "In the CPU Register", "In the File System"],
      "answer": 1,
      "explanation": "Objects are always stored on the Heap. The variable 'obj' on the stack holds a reference (pointer) to the object's location on the heap."
    },
    {
      "question": "What does the Garbage Collector use as starting points for reachability analysis?",
      "options": ["All objects in memory", "Root references (global object, stack variables)", "All function declarations", "Only the global object"],
      "answer": 1,
      "explanation": "The GC starts from root references: the global object, local variables on the Call Stack, and active closure references. It then traverses all references from these roots."
    },
    {
      "question": "Which of the following would cause a memory leak?",
      "options": ["Declaring variables with let", "Using const", "Accidentally assigning to an undeclared variable", "Using strict mode"],
      "answer": 2,
      "explanation": "Assigning to an undeclared variable creates a property on the global object, which is never garbage collected. This is a common source of memory leaks."
    },
    {
      "question": "What is the difference between Map and WeakMap regarding memory?",
      "options": ["Map is faster than WeakMap", "WeakMap allows its keys to be garbage collected; Map does not", "Map stores values on the stack", "WeakMap can only store strings as keys"],
      "answer": 1,
      "explanation": "WeakMap holds weak references to its keys. If a key object has no other references, it can be GC'd, and the WeakMap entry is automatically removed. Map holds strong references, preventing GC."
    },
    {
      "question": "When does JavaScript's Garbage Collector run?",
      "options": ["Only when the program ends", "At engine-determined intervals (during idle time, allocations, etc.)", "Immediately when a variable goes out of scope", "Only when manually called via gc()"],
      "answer": 1,
      "explanation": "The GC runs automatically at intervals determined by the engine, typically triggered when memory is allocated and during idle time. It is not tied to variable scope or program termination."
    },
    {
      "question": "What happens to heap-allocated objects when a function returns?",
      "options": ["They are immediately freed", "They become eligible for GC if no longer reachable", "They are moved to the stack", "They are automatically deleted"],
      "answer": 1,
      "explanation": "When a function returns, its stack frame is popped. Objects in the heap that were only referenced by that function's local variables become unreachable and are eligible for GC."
    },
    {
      "question": "What is the Mark-and-Sweep algorithm?",
      "options": ["A sorting algorithm", "A garbage collection algorithm that marks reachable objects and sweeps unmarked ones", "A DOM manipulation technique", "A way to optimize function calls"],
      "answer": 1,
      "explanation": "Mark-and-Sweep starts from root references, marks all reachable objects, then sweeps (frees) unmarked objects. It correctly handles circular references, unlike reference counting."
    },
    {
      "question": "What are V8's 'New Space' and 'Old Space'?",
      "options": ["Two types of variables", "Generations in V8's generational heap: young objects (New) and survivors (Old)", "Two separate JavaScript engines", "Stack and Heap"],
      "answer": 1,
      "explanation": "V8 uses generational GC. New Space holds recently created objects (collected frequently). Survivors are promoted to Old Space (collected less often). This optimizes for the fact that most objects die young."
    },
    {
      "question": "What is a detached DOM node memory leak?",
      "options": ["A DOM element that is too large", "A DOM element removed from the document but still referenced by JavaScript", "A DOM element with too many event listeners", "A DOM element that was never added to the document"],
      "answer": 1,
      "explanation": "When a DOM node is removed from the document but a JavaScript variable still holds a reference to it, the entire node and its subtree remain in memory. This is a common memory leak in web applications."
    },
    {
      "question": "Does assigning null to an object variable free memory immediately?",
      "options": ["Yes, instantly", "No, it only removes one reference. The object becomes eligible for GC on the next GC cycle", "No, null has no effect on memory", "Yes, but only for arrays"],
      "answer": 1,
      "explanation": "Setting a variable to null removes one reference to the object. The object is freed only when there are zero references AND the GC runs its next cycle. Memory is not freed immediately."
    }
  ]
}
;
TOPICS_DATA["javascript"]["micro-task-queue"] = {
  "title": "Micro Task Queue",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "The <strong>Microtask Queue</strong> holds callbacks from Promises (<code>.then()</code>, <code>.catch()</code>, <code>.finally()</code>), <code>queueMicrotask()</code>, and <code>MutationObserver</code>.",
    "Microtasks are processed <strong>after</strong> the current synchronous operation completes and <strong>before</strong> any macrotask or UI rendering.",
    "The Microtask Queue is <strong>drained entirely</strong> in each Event Loop iteration — if a microtask adds another microtask, it runs in the same cycle.",
    "Microtasks enable JavaScript to handle Promise resolutions <strong>immediately</strong> after synchronous code, without waiting for macrotasks."
  ],
  "laymanDefinition": "The Microtask Queue is like a priority mailbox. When you receive an important letter (a Promise resolves), you don't throw it in the regular pile — you put it in a special 'high priority' box. As soon as you finish your current task, you check this box and handle ALL the letters in it before doing anything else (like reading the newspaper or taking a break). This is why Promise callbacks run before setTimeout callbacks — they go in this priority box.",
  "deepDive": [
    {
      "heading": "What Feeds the Microtask Queue?",
      "text": "The Microtask Queue receives callbacks from: (1) <strong>Promise</strong> reactions — <code>.then()</code>, <code>.catch()</code>, <code>.finally()</code>. (2) <strong>queueMicrotask()</strong> — explicitly queue a microtask. (3) <strong>MutationObserver</strong> — DOM mutation callbacks. (4) <strong>await</strong> continuations — after an <code>await</code>, the rest of the async function is scheduled as a microtask."
    },
    {
      "heading": "Microtask Drain Behavior",
      "text": "When the Event Loop checks the Microtask Queue, it does NOT just take one callback. It processes ALL callbacks currently in the queue, PLUS any callbacks that are added while processing. This means if a microtask callback queues another microtask, that new microtask is executed in the same cycle. The queue is only considered 'drained' when it is completely empty."
    },
    {
      "heading": "Microtask Starvation",
      "text": "Because microtasks are drained entirely before any macrotask, a recursive microtask scheduler (a microtask that keeps queueing more microtasks) can prevent macrotasks from ever executing. This is called 'microtask starvation'. It's rare in practice but important to understand. The browser may eventually detect this and throw an error, but it's best to avoid unbounded microtask recursion."
    },
    {
      "heading": "Microtasks vs Macrotasks: Key Differences",
      "text": "<strong>Microtasks:</strong> Processed after every macrotask, entire queue drained per cycle. Higher priority. Used for Promise reactions and async/await continuations. <strong>Macrotasks:</strong> Processed one per Event Loop iteration. Lower priority. Used for setTimeout, setInterval, I/O, and UI events."
    }
  ],
  "interviewAnswer": "The Microtask Queue is a high-priority queue in JavaScript's Event Loop that holds callbacks from Promise resolutions, queueMicrotask, and MutationObserver. After each synchronous operation on the Call Stack completes, the Event Loop drains the entire Microtask Queue (including any microtasks queued during draining) before processing a single macrotask or rendering the UI. This ensures that Promise-based asynchronous operations are handled promptly and predictably. Understanding microtasks is essential for mastering the timing of asynchronous operations in JavaScript.",
  "interviewQuestions": [
    {
      "question": "What goes into the Microtask Queue?",
      "answer": "The Microtask Queue receives: Promise .then()/.catch()/.finally() callbacks, queueMicrotask() callbacks, MutationObserver callbacks, and async function continuations after 'await'. These are all 'high-priority' asynchronous callbacks that should execute before any macrotask."
    },
    {
      "question": "How is the Microtask Queue different from the Macrotask Queue?",
      "answer": "The Microtask Queue is drained <strong>entirely</strong> after every synchronous operation and before any macrotask. The Macrotask Queue is processed <strong>one task at a time</strong> per Event Loop iteration. Microtasks have higher priority. If both queues have pending callbacks, all microtasks run before the first macrotask."
    },
    {
      "question": "What happens if a microtask callback throws an error?",
      "answer": "If a microtask throws an uncaught error, it propagates to the global error handler (window.onerror or process.on('uncaughtException')). The error does NOT prevent the Event Loop from continuing to drain the rest of the Microtask Queue. However, unhandled Promise rejections are an exception — they generate a warning but don't crash the process in modern environments."
    },
    {
      "question": "Can you create a microtask without using Promises?",
      "answer": "Yes, using <code>queueMicrotask(fn)</code>, which is available in modern browsers and Node.js. Also, <code>MutationObserver</code> callbacks are microtasks. In older environments, you could use <code>Promise.resolve().then(fn)</code> as a polyfill."
    },
    {
      "question": "When does the Microtask Queue NOT get drained?",
      "answer": "The Microtask Queue is NOT drained when the Call Stack is actively executing synchronous code. It is only checked when the stack is empty. If synchronous code runs for 10 seconds (e.g., a while loop), microtasks wait in the queue and are all processed immediately after the loop finishes."
    },
    {
      "question": "Are all Promise callbacks microtasks?",
      "answer": "Yes. Promise <code>.then()</code>, <code>.catch()</code>, and <code>.finally()</code> callbacks are always scheduled as microtasks. The Promise constructor's executor function (the callback passed to <code>new Promise(fn)</code>) runs synchronously, not as a microtask. Only the reaction callbacks (then/catch/finally) are microtasks."
    },
    {
      "question": "What is an example of microtask starvation?",
      "answer": "A microtask that queues itself recursively: <pre><code>function starve() {\n  queueMicrotask(() => {\n    console.log('microtask');\n    starve(); // queues another microtask\n  });\n}\nstarve();\nsetTimeout(() => console.log('macrotask'), 0);\n// The setTimeout callback NEVER runs</code></pre>This keeps the Microtask Queue non-empty forever, so macrotasks are never processed."
    },
    {
      "question": "How does 'await' interact with the Microtask Queue?",
      "answer": "When an async function hits <code>await</code>, the function is suspended and the rest of the function body is scheduled as a microtask. This means the code after <code>await</code> executes after all synchronous code but before any macrotask. If the awaited value is already a resolved Promise, the continuation is still a microtask (not synchronous)."
    },
    {
      "question": "What is the processing order inside the Microtask Queue?",
      "answer": "The Microtask Queue is a FIFO (First In, First Out) queue. Callbacks are processed in the order they were queued. If a microtask queues another microtask, the new one goes to the back of the queue and will be processed before the Event Loop checks the Macrotask Queue."
    },
    {
      "question": "How does MutationObserver use the Microtask Queue?",
      "answer": "MutationObserver callbacks are scheduled as microtasks, batched together. All DOM mutations that occurred since the last microtask check are reported in a single callback. This is more efficient than firing a callback per mutation. The callback runs after synchronous code but before macrotasks — which is why DOM changes made via Promise callbacks may not be visually rendered yet when the MutationObserver fires."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Microtask Queue — Processing Order</text><!-- Header --><rect x=\"40\" y=\"60\" width=\"620\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"85\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">After synchronous code completes, Event Loop drains ENTIRE Microtask Queue before any macrotask or render</text><!-- Queue items --><rect x=\"40\" y=\"120\" width=\"140\" height=\"36\" rx=\"4\" fill=\"rgba(251,191,36,0.12)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"110\" y=\"143\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"bold\">Promise 1</text><rect x=\"195\" y=\"120\" width=\"140\" height=\"36\" rx=\"4\" fill=\"rgba(251,191,36,0.12)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"265\" y=\"143\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"bold\">queueMicrotask</text><rect x=\"350\" y=\"120\" width=\"140\" height=\"36\" rx=\"4\" fill=\"rgba(251,191,36,0.12)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"420\" y=\"143\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"bold\">Promise 2</text><rect x=\"505\" y=\"120\" width=\"140\" height=\"36\" rx=\"4\" fill=\"rgba(251,191,36,0.12)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"575\" y=\"143\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\" font-weight=\"bold\">MutationObs</text><!-- Arrow pointing down to processing --><line x1=\"110\" y1=\"160\" x2=\"110\" y2=\"200\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><line x1=\"265\" y1=\"160\" x2=\"265\" y2=\"200\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><line x1=\"420\" y1=\"160\" x2=\"420\" y2=\"200\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><line x1=\"575\" y1=\"160\" x2=\"575\" y2=\"200\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><text x=\"350\" y=\"188\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">FIFO Processing Order</text><!-- Processing area --><rect x=\"40\" y=\"205\" width=\"620\" height=\"55\" rx=\"6\" fill=\"rgba(52,211,153,0.06)\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"228\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Processing... (drain entirely)</text><text x=\"60\" y=\"250\" fill=\"#9aa0b0\" font-size=\"10\">1. Execute Promise 1 .then()  -->  2. Execute queueMicrotask(fn)  -->  3. Execute Promise 2 .then()  -->  4. Execute MutationObserver</text><!-- If new microtask queued --><rect x=\"40\" y=\"280\" width=\"620\" height=\"60\" rx=\"6\" fill=\"rgba(248,113,113,0.06)\" stroke=\"#f87171\" stroke-width=\"1\" stroke-dasharray=\"3\"/><text x=\"350\" y=\"302\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"10\" font-weight=\"bold\">If a microtask queues ANOTHER microtask...</text><text x=\"60\" y=\"322\" fill=\"#f87171\" font-size=\"10\">It goes to the BACK of the Microtask Queue and is ALSO processed in the same drain cycle.</text><text x=\"60\" y=\"338\" fill=\"#f87171\" font-size=\"10\">Macrotasks are blocked until microtask queue is COMPLETELY empty.</text></svg>",
  "codeExamples": [
    {
      "title": "Using queueMicrotask Directly",
      "useCase": "Explicit microtask scheduling",
      "code": "console.log('Start');\n\n// Schedule a microtask explicitly\nqueueMicrotask(() => {\n  console.log('Microtask: runs after sync, before macrotasks');\n});\n\nsetTimeout(() => {\n  console.log('Macrotask: runs after microtasks');\n}, 0);\n\nconsole.log('End');\n\n// Output:\n// Start\n// End\n// Microtask: runs after sync, before macrotasks\n// Macrotask: runs after microtasks",
      "description": "queueMicrotask() directly schedules a callback in the Microtask Queue. It's a cleaner alternative to Promise.resolve().then(fn) for cases where you just need a microtask without a Promise."
    },
    {
      "title": "All Microtasks Drain Before Macrotasks",
      "useCase": "Multiple microtask types ordering",
      "code": "setTimeout(() => console.log('1 - macrotask'), 0);\n\nPromise.resolve().then(() => {\n  console.log('2 - Promise.then');\n});\n\nqueueMicrotask(() => {\n  console.log('3 - queueMicrotask');\n});\n\n// Microtasks that queue more microtasks\nPromise.resolve().then(() => {\n  console.log('4 - Promise.then that queues another');\n  queueMicrotask(() => {\n    console.log('5 - nested microtask still in same cycle');\n  });\n});\n\nconsole.log('6 - sync');\n\n// Output:\n// 6 - sync\n// 2 - Promise.then\n// 3 - queueMicrotask\n// 4 - Promise.then that queues another\n// 5 - nested microtask still in same cycle\n// 1 - macrotask\n\n// Note: 5 runs BEFORE 1, proving the entire microtask queue is drained",
      "description": "All microtasks run to completion before the first macrotask. Even nested microtasks (queued by other microtasks) are processed in the same cycle. The setTimeout callback only runs after the microtask queue is completely empty."
    },
    {
      "title": "Microtask vs Macrotask Error Handling",
      "useCase": "Error propagation differences",
      "code": "// Microtask error\nqueueMicrotask(() => {\n  throw new Error('Microtask error');\n});\n\n// Macrotask error\nsetTimeout(() => {\n  throw new Error('Macrotask error');\n}, 0);\n\nconsole.log('Sync code runs');\n\n// Both errors are caught by window.onerror or process.on('uncaughtException')\n// But the microtask error will be detected FIRST (before setTimeout)\n// However, if a microtask error goes unhandled:\n// - Node.js: process.on('unhandledRejection') for Promise, \n//   process.on('uncaughtException') for queueMicrotask\n// - Browser: window.onerror for both\n\n// Fix microtask errors with try/catch:\nqueueMicrotask(() => {\n  try {\n    throw new Error('Caught error');\n  } catch (e) {\n    console.log('Handled:', e.message);\n  }\n});",
      "description": "Errors in microtasks propagate to the global error handler, just like macrotasks. However, microtask errors surface earlier because microtasks run before macrotasks. Always use try/catch inside microtasks for proper error handling."
    },
    {
      "title": "MutationObserver Uses Microtasks",
      "useCase": "Observing DOM changes synchronously",
      "code": "// Create an observer\nconst observer = new MutationObserver((mutations) => {\n  console.log('Mutation observed:', mutations.length, 'changes');\n  console.log('This runs as a MICROTASK');\n});\n\n// Start observing\ntarget = document.getElementById('target');\nobserver.observe(target, { childList: true });\n\n// Make a change\ntarget.textContent = 'New text';\n// MutationObserver callback is scheduled as a microtask\n\nconsole.log('After mutation (sync)');\n\nPromise.resolve().then(() => {\n  console.log('Promise.then (also microtask)');\n});\n\nsetTimeout(() => {\n  console.log('setTimeout (macrotask)');\n}, 0);\n\n// Output:\n// After mutation (sync)\n// Mutation observed: 1 changes\n// Promise.then (also microtask)\n// setTimeout (macrotask)\n\n// Note: MutationObserver and Promise.then are in the same microtask queue\n// Their relative order depends on which was queued first",
      "description": "MutationObserver callbacks are microtasks, queued after the synchronous code that caused the mutation completes. They share the Microtask Queue with Promise callbacks, so all process before any setTimeouts."
    },
    {
      "title": "Await Continuation is a Microtask",
      "useCase": "Understanding async/await timing",
      "code": "async function demo() {\n  console.log('1 - async function starts (sync)');\n  \n  await Promise.resolve();\n  // The rest of this function is a MICROTASK continuation\n  \n  console.log('3 - after await (microtask)');\n}\n\ndemo();\n\nconsole.log('2 - sync after calling demo');\n\nsetTimeout(() => {\n  console.log('5 - setTimeout (macrotask)');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('4 - Promise.then (microtask)');\n});\n\nconsole.log('2.5 - more sync');\n\n// Output:\n// 1 - async function starts (sync)\n// 2 - sync after calling demo\n// 2.5 - more sync\n// 3 - after await (microtask)\n// 4 - Promise.then (microtask)\n// 5 - setTimeout (macrotask)",
      "description": "After 'await', the rest of the async function body is scheduled as a microtask. That's why code after await always runs after all synchronous code but before any setTimeout callbacks."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which APIs add callbacks to the Microtask Queue?",
      "options": ["setTimeout", "Promise.then, queueMicrotask, MutationObserver", "setInterval", "addEventListener"],
      "answer": 1,
      "explanation": "Promise.then/catch/finally, queueMicrotask, and MutationObserver all schedule callbacks in the Microtask Queue. setTimeout/setInterval and event listeners use the Macrotask Queue."
    },
    {
      "question": "What is the Event Loop's rule for processing the Microtask Queue?",
      "options": ["One microtask per iteration", "Drain the entire queue before any macrotask", "Process microtasks after macrotasks", "Microtasks run in a separate thread"],
      "answer": 1,
      "explanation": "The Microtask Queue is drained entirely — all pending microtasks are processed — before the Event Loop processes a single macrotask or re-renders the UI."
    },
    {
      "question": "What will this log? queueMicrotask(() => console.log('A')); setTimeout(() => console.log('B'), 0); console.log('C');",
      "options": ["A, B, C", "C, A, B", "C, B, A", "A, C, B"],
      "answer": 1,
      "explanation": "C is synchronous. A is a microtask (runs after sync, before macrotasks). B is a macrotask (runs last). Output: C, A, B."
    },
    {
      "question": "If a microtask queues another microtask, when does the second one run?",
      "options": ["In the next Event Loop iteration", "Immediately, in the same microtask drain cycle", "After the next macrotask", "Never — it's ignored"],
      "answer": 1,
      "explanation": "The Microtask Queue is drained continuously until empty. If a microtask queues another microtask, it runs in the same cycle before any macrotask is processed."
    },
    {
      "question": "What method allows you to explicitly queue a microtask without using Promises?",
      "options": ["setTimeout(fn, 0)", "queueMicrotask(fn)", "setImmediate(fn)", "requestAnimationFrame(fn)"],
      "answer": 1,
      "explanation": "queueMicrotask(fn) explicitly queues a function in the Microtask Queue. It's available in modern browsers and Node.js. The polyfill is Promise.resolve().then(fn)."
    },
    {
      "question": "Which of the following is NOT a microtask source?",
      "options": ["Promise.resolve().then(fn)", "queueMicrotask(fn)", "new MutationObserver(fn)", "setInterval(fn, 100)"],
      "answer": 3,
      "explanation": "setInterval callbacks go to the Macrotask Queue, not the Microtask Queue. The other three are all microtask sources."
    },
    {
      "question": "What is microtask starvation?",
      "options": ["When microtasks are never queued", "When microtasks keep queuing new microtasks, preventing macrotasks from executing", "When the microtask queue is empty", "When a macrotask runs before microtasks"],
      "answer": 1,
      "explanation": "Microtask starvation occurs when microtasks continuously queue new microtasks, keeping the Microtask Queue non-empty indefinitely and preventing macrotasks from ever being processed."
    },
    {
      "question": "When does the code after 'await' execute in the Event Loop?",
      "options": ["Synchronously, immediately", "As a microtask, after all sync code", "As a macrotask, after setTimeout", "In the next frame"],
      "answer": 1,
      "explanation": "After 'await', the rest of the async function is scheduled as a microtask. It executes after all synchronous code but before any macrotask callbacks."
    },
    {
      "question": "Does the Promise constructor's executor function run synchronously or as a microtask?",
      "options": ["As a microtask", "Synchronously", "As a macrotask", "It depends on the browser"],
      "answer": 1,
      "explanation": "The executor function passed to new Promise(fn) runs synchronously. Only the reaction callbacks (.then, .catch, .finally) are scheduled as microtasks."
    },
    {
      "question": "What will this code log? setTimeout(() => console.log('A'), 0); Promise.resolve().then(() => console.log('B')); Promise.resolve().then(() => { queueMicrotask(() => console.log('C')); }); console.log('D');",
      "options": ["D, B, A, C", "D, B, C, A", "D, A, B, C", "B, D, C, A"],
      "answer": 1,
      "explanation": "D is sync. B and C's outer .then are microtasks. C's queueMicrotask is a nested microtask that also runs in the same cycle. A is the macrotask. Output: D, B, C, A."
    }
  ]
}
;
TOPICS_DATA["javascript"]["promises"] = {
  "title": "Promises & Async/Await",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,

  "tldr": [
    "A <strong>Promise</strong> is an object representing the eventual completion (or failure) of an asynchronous operation.",
    "A Promise has 3 states: <strong>pending</strong>, <strong>fulfilled</strong> (resolved), or <strong>rejected</strong>.",
    "Use <code>.then()</code> for fulfilled, <code>.catch()</code> for rejected, and <code>.finally()</code> for cleanup.",
    "<strong>Async/Await</strong> is syntactic sugar over Promises that makes asynchronous code read like synchronous code.",
    "An <code>async</code> function always returns a Promise. <code>await</code> pauses execution until the Promise settles."
  ],

  "laymanDefinition": "Imagine ordering a pizza. When you place the order, you get a receipt (a Promise). You don't have the pizza yet -- it's pending. When the pizza arrives, it's fulfilled. If the restaurant burns down, the order is rejected. While waiting, you can watch TV instead of standing at the counter. When the pizza arrives (the Promise resolves), you act on it. Async/await is like having a friend who says 'I'll wait at the counter for you, call me when it's ready' -- the code pauses at 'await' until the pizza is ready, but without blocking the kitchen (the main thread) from making other pizzas.",

  "deepDive": [
    {
      "heading": "Why Promises Exist: Callback Hell",
      "text": "Before Promises, asynchronous code used callbacks. Nested callbacks created the infamous 'callback hell' or 'pyramid of doom' -- deeply nested, hard-to-read, error-prone code. Promises introduced a flat, chainable API that separates success and error handling."
    },
    {
      "heading": "Promise Lifecycle",
      "text": "A Promise starts in the <strong>pending</strong> state. Once the async operation completes, it transitions to either <strong>fulfilled</strong> (with a value) or <strong>rejected</strong> (with a reason/error). This transition happens exactly once -- a Promise is <strong>settled</strong> and cannot change state again."
    },
    {
      "heading": "Microtask Queue & Event Loop",
      "text": "Promise callbacks (.then, .catch, .finally) are executed as <strong>microtasks</strong>, which have higher priority than regular (macrotask) callbacks like setTimeout. Microtasks are processed after each macrotask and before the next render. This means Promise callbacks execute before setTimeout callbacks, even if the Promise resolves synchronously."
    },
    {
      "heading": "Async/Await Under the Hood",
      "text": "An <code>async</code> function is compiled by the JavaScript engine into a state machine -- similar to a generator. Each <code>await</code> creates a 'suspension point'. The function is paused, the microtask is scheduled, and when the awaited Promise settles, execution resumes from where it left off. This is why async/await is syntax sugar over Promises + generators."
    },
    {
      "heading": "Error Handling in Async/Await",
      "text": "Use <code>try/catch</code> blocks to handle errors in async functions. If a Promise is rejected inside an async function without a try/catch, the async function itself returns a rejected Promise. Unhandled rejections bubble up to the global 'unhandledrejection' event."
    },
    {
      "heading": "Promise Combinators",
      "list": [
        "<strong>Promise.all()</strong> -- Resolves when all Promises resolve. Rejects immediately if any Promise rejects (fail-fast).",
        "<strong>Promise.allSettled()</strong> -- Resolves when all Promises settle (resolve or reject). Returns an array of {status, value/reason}.",
        "<strong>Promise.race()</strong> -- Settles with the first Promise that settles (resolve or reject).",
        "<strong>Promise.any()</strong> -- Resolves with the first fulfilled Promise. Rejects with AggregateError if all reject."
      ]
    }
  ],

  "interviewAnswer": "A Promise is an object that represents the eventual result of an asynchronous operation. It has three states: pending, fulfilled, and rejected. Promises solve the problem of callback hell by providing a composable, chainable API with centralized error handling. Async/await is syntactic sugar built on top of Promises -- an async function always returns a Promise, and the await keyword pauses the function's execution until the awaited Promise settles, without blocking the main thread. Promise callbacks execute on the microtask queue, which gives them priority over regular asynchronous callbacks. Understanding the Promise lifecycle, the microtask queue, and Promise combinators like Promise.all and Promise.allSettled is essential for writing robust asynchronous JavaScript code.",

  "interviewQuestions": [
    {
      "question": "What is the difference between microtasks and macrotasks? How does this affect Promise execution?",
      "answer": "Microtasks (Promise callbacks, queueMicrotask, MutationObserver) execute after each macrotask and before the next UI render. Macrotasks (setTimeout, setInterval, I/O tasks) execute in the next iteration of the event loop. This means Promise .then() callbacks always execute before any setTimeout callbacks, even if the setTimeout delay is 0ms. <strong>Example:</strong><br/><br/><pre><code>console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output: 1, 4, 3, 2</code></pre>"
    },
    {
      "question": "How does async/await work under the hood?",
      "answer": "The JavaScript engine compiles an async function into a state machine, similar to a generator function coupled with a runner. Each 'await' creates a suspension point. The function is split into segments -- code before and after each await. When execution hits an await, it creates a .then() callback that will resume the function when the awaited Promise settles. The function's state is saved and restored between these suspension points. This is why async/await is described as 'syntactic sugar over Promises and generators'."
    },
    {
      "question": "What happens if you don't await a Promise inside an async function?",
      "answer": "The async function will continue executing immediately without waiting for the Promise to settle. The Promise will still execute (it's already started), but you lose the ability to catch its rejection or use its resolved value. The async function will return a Promise that resolves with whatever comes after the un-awaited Promise. <strong>Example:</strong><br/><br/><pre><code>async function example() {\n  Promise.reject('error'); // Unhandled rejection!\n  return 'done';\n}\nexample().then(console.log); // logs 'done' immediately</code></pre>"
    },
    {
      "question": "Explain Promise.all() vs Promise.allSettled() with a real-world scenario.",
      "answer": "<strong>Promise.all()</strong> fails fast -- it rejects as soon as any input Promise rejects. Use it when you need all operations to succeed (e.g., loading critical data for a page). <strong>Promise.allSettled()</strong> waits for all Promises to settle, regardless of outcome. Use it when you want to know the result of every operation even if some fail (e.g., batch updating user profiles where each update is independent). <strong>Example:</strong><br/><br/><pre><code>const promises = [fetch('/users'), fetch('/posts'), fetch('/invalid')];\n// Promise.all -- rejects immediately if any fails\n// Promise.allSettled -- returns status for all\nconst results = await Promise.allSettled(promises);\nresults.forEach(r => console.log(r.status, r.value || r.reason));</code></pre>"
    },
    {
      "question": "How do you convert a callback-based API to a Promise-based one?",
      "answer": "Wrap the callback call inside a new Promise constructor. In the executor function, call the async API and resolve/reject the Promise based on the callback's results. <strong>Example:</strong><br/><br/><pre><code>function readFilePromise(path) {\n  return new Promise((resolve, reject) => {\n    fs.readFile(path, 'utf8', (err, data) => {\n      if (err) reject(err);\n      else resolve(data);\n    });\n  });\n}\n// Usage:\nconst content = await readFilePromise('/path/to/file.txt');</code></pre>"
    },
    {
      "question": "What is the 'Promise constructor antipattern' and how do you avoid it?",
      "answer": "The antipattern is wrapping a Promise-returning function inside a new Promise when you already have a Promise. <strong>Bad (antipattern):</strong><br/><br/><pre><code>return new Promise((resolve, reject) => {\n  fetch(url).then(resolve).catch(reject);\n});</code></pre><br/><strong>Good:</strong><br/><br/><pre><code>return fetch(url);</code></pre><br/>The antipattern adds unnecessary nesting, loses error handling, and can cause unhandled rejections or memory leaks."
    },
    {
      "question": "How does error propagation work in Promise chains vs async/await?",
      "answer": "In Promise chains, errors propagate through the chain until they hit a .catch(). If no .catch() exists, the rejection becomes an unhandled rejection. In async/await, errors propagate via try/catch. If no try/catch is present, the async function returns a rejected Promise. Both mechanisms are equivalent -- async/await is just more readable. <strong>Promise chain:</strong><br/><br/><pre><code>fetch(url)\n  .then(res => res.json())\n  .then(data => process(data))\n  .catch(err => console.error(err));</code></pre><br/><strong>Async/await:</strong><br/><br/><pre><code>try {\n  const res = await fetch(url);\n  const data = await res.json();\n  await process(data);\n} catch (err) {\n  console.error(err);\n}</code></pre>"
    },
    {
      "question": "What is Promise.race() and when would you use it?",
      "answer": "Promise.race() returns a Promise that settles (fulfills or rejects) as soon as the first input Promise settles. Use it for timeouts: <br/><br/><pre><code>function withTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error('Timeout')), ms)\n  );\n  return Promise.race([promise, timeout]);\n}\n\ntry {\n  const data = await withTimeout(fetch(url), 5000);\n} catch (err) {\n  console.log('Request timed out or failed');\n}</code></pre>"
    },
    {
      "question": "Explain the async/await error handling pattern with try/catch vs .catch().",
      "answer": "In async/await, you use try/catch blocks. However, if you need to handle errors from a specific await statement differently, you can combine both approaches: <br/><br/><pre><code>async function handleMultiple() {\n  const result1 = await task1().catch(err => ({ error: err }));\n  if (result1.error) { /* handle task1 error */ }\n\n  try {\n    const result2 = await task2();\n    // process result2\n  } catch (err) {\n    // handle task2 error\n  }\n}</code></pre><br/>The choice depends on granularity needed -- per-call error handling vs. batch error handling."
    },
    {
      "question": "What is 'Promise.resolve()' and when would you use it?",
      "answer": "Promise.resolve(value) returns a Promise that is resolved with the given value. If the value is already a Promise, it returns that Promise. If it's a thenable (an object with .then), it unwraps it. If it's a plain value, it wraps it in a fulfilled Promise. <strong>Use cases:</strong> (1) Converting a value to a Promise for uniform async handling. (2) Starting a Promise chain synchronously. (3) In async function polyfills. <strong>Example:</strong><br/><br/><pre><code>// Normalize: function might return value or Promise\nfunction getUser(id) {\n  if (cache[id]) return Promise.resolve(cache[id]);\n  return fetchUserFromAPI(id);\n}</code></pre>"
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 520\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrowP\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrowG\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#34d399\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"500\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><!-- Title --><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Promise Lifecycle & Event Loop Integration</text><!-- Promise States Flow --><rect x=\"40\" y=\"60\" width=\"620\" height=\"180\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"82\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Promise States</text><!-- Pending --><rect x=\"80\" y=\"100\" width=\"120\" height=\"48\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"140\" y=\"120\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\"> PENDING</text><text x=\"140\" y=\"138\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Initial state</text><!-- Fulfilled --><rect x=\"290\" y=\"100\" width=\"120\" height=\"48\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"350\" y=\"120\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\"> FULFILLED</text><text x=\"350\" y=\"138\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">.then() callback</text><!-- Rejected --><rect x=\"500\" y=\"100\" width=\"120\" height=\"48\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#f87171\" stroke-width=\"2\"/><text x=\"560\" y=\"120\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\"> REJECTED</text><text x=\"560\" y=\"138\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">.catch() callback</text><!-- Arrows between states --><line x1=\"200\" y1=\"124\" x2=\"280\" y2=\"124\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrowG)\"/><text x=\"240\" y=\"116\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">resolve(val)</text><line x1=\"200\" y1=\"140\" x2=\"280\" y2=\"140\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrowP)\"/><text x=\"240\" y=\"152\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"10\">reject(err)</text><!-- Once settled --><text x=\"350\" y=\"178\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">A Promise can only settle ONCE. State is immutable after settlement.</text><!-- Event Loop section --><rect x=\"40\" y=\"260\" width=\"620\" height=\"220\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"282\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Event Loop Execution Order</text><!-- Call Stack --><rect x=\"60\" y=\"300\" width=\"150\" height=\"160\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"135\" y=\"322\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\">Call Stack</text><text x=\"75\" y=\"345\" fill=\"#e8eaed\" font-size=\"10\">sync code</text><text x=\"75\" y=\"365\" fill=\"#e8eaed\" font-size=\"10\">-> stack frames</text><text x=\"75\" y=\"385\" fill=\"#e8eaed\" font-size=\"10\">execute & pop</text><rect x=\"75\" y=\"400\" width=\"120\" height=\"30\" rx=\"4\" fill=\"rgba(108,159,255,0.1)\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"135\" y=\"419\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"10\">1. Global code</text><!-- Microtask Queue --><rect x=\"275\" y=\"300\" width=\"150\" height=\"160\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"322\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\">Microtask Queue</text><text x=\"290\" y=\"345\" fill=\"#e8eaed\" font-size=\"10\">Promise .then()</text><text x=\"290\" y=\"365\" fill=\"#e8eaed\" font-size=\"10\">queueMicrotask</text><text x=\"290\" y=\"385\" fill=\"#e8eaed\" font-size=\"10\">MutationObserver</text><rect x=\"290\" y=\"400\" width=\"120\" height=\"30\" rx=\"4\" fill=\"rgba(251,191,36,0.1)\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"350\" y=\"419\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\">2. Microtasks</text><!-- Macrotask Queue --><rect x=\"490\" y=\"300\" width=\"150\" height=\"160\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"565\" y=\"322\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">Macrotask Queue</text><text x=\"505\" y=\"345\" fill=\"#e8eaed\" font-size=\"10\">setTimeout</text><text x=\"505\" y=\"365\" fill=\"#e8eaed\" font-size=\"10\">setInterval</text><text x=\"505\" y=\"385\" fill=\"#e8eaed\" font-size=\"10\">I/O callbacks</text><rect x=\"505\" y=\"400\" width=\"120\" height=\"30\" rx=\"4\" fill=\"rgba(52,211,153,0.1)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"565\" y=\"419\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">3. Macrotasks</text><!-- Bottom note --><text x=\"350\" y=\"470\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"11\">Execution Order: Call Stack -> Microtask Queue (entirely) -> Macrotask Queue -> UI Render -> repeat</text></svg><div class=\"diagram-caption\">Promise state machine (top) and event loop queue priorities (bottom). Promise callbacks always execute in the microtask queue before macrotask callbacks.</div>",

  "codeExamples": [
    {
      "title": "Sequential vs Parallel Async Operations",
      "useCase": "Concurrency Patterns",
      "code": "// Sequential (slow) -- each waits for previous\nasync function sequential() {\n  const a = await fetch('/api/a').then(r => r.json());\n  const b = await fetch('/api/b').then(r => r.json());\n  const c = await fetch('/api/c').then(r => r.json());\n  return [a, b, c];\n}\n\n// Parallel (fast) -- all start simultaneously\nasync function parallel() {\n  const [a, b, c] = await Promise.all([\n    fetch('/api/a').then(r => r.json()),\n    fetch('/api/b').then(r => r.json()),\n    fetch('/api/c').then(r => r.json())\n  ]);\n  return [a, b, c];\n}\n\n// Race -- get the fastest response\nasync function raceExample() {\n  const result = await Promise.race([\n    fetch('/api/fast').then(r => r.json()),\n    fetch('/api/backup').then(r => r.json())\n  ]);\n  return result;\n}",
      "description": "Sequential execution is slower but preserves order. Parallel execution via Promise.all is faster but all requests fire simultaneously. Choose based on whether operations are dependent or independent."
    },
    {
      "title": "Async Iterator Pattern (Pagination)",
      "useCase": "Real-world Data Fetching",
      "code": "async function* paginate(baseUrl, pageSize = 50) {\n  let page = 1;\n  let hasMore = true;\n\n  while (hasMore) {\n    const url = `${baseUrl}?page=${page}&limit=${pageSize}`;\n    const res = await fetch(url);\n    const data = await res.json();\n\n    if (data.items.length === 0) hasMore = false;\n    else {\n      yield data.items;\n      page++;\n    }\n  }\n}\n\n// Usage\n(async () => {\n  const pages = paginate('https://api.example.com/users');\n  for await (const users of pages) {\n    console.log(`Got ${users.length} users`);\n  }\n})();",
      "description": "Async generators combine async/await with generators to lazily fetch paginated data. Each iteration awaits the next page before yielding."
    },
    {
      "title": "Promise-based Retry with Exponential Backoff",
      "useCase": "Resilient API Calls",
      "code": "async function fetchWithRetry(url, options = {}) {\n  const { maxRetries = 3, baseDelay = 1000 } = options;\n\n  for (let attempt = 1; attempt <= maxRetries; attempt++) {\n    try {\n      const res = await fetch(url);\n      if (res.ok) return res;\n      if (res.status < 500 && attempt < maxRetries) {\n        throw new Error(`HTTP ${res.status}`);\n      }\n    } catch (err) {\n      if (attempt === maxRetries) throw err;\n      const delay = baseDelay * Math.pow(2, attempt - 1);\n      console.log(`Retry ${attempt}/${maxRetries} after ${delay}ms`);\n      await new Promise(r => setTimeout(r, delay));\n    }\n  }\n}\n\nawait fetchWithRetry('https://api.example.com/data', {\n  maxRetries: 5,\n  baseDelay: 500\n});",
      "description": "Implements exponential backoff by awaiting a delayed Promise. Each retry doubles the wait time, preventing overwhelming the server during outages."
    },
    {
      "title": "Promise.allSettled -- Partial Success Handling",
      "useCase": "Bulk Operations",
      "code": "async function updateUsers(userIds) {\n  const promises = userIds.map(id =>\n    fetch(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify({ active: true }) })\n      .then(res => ({ id, status: res.ok ? 'updated' : 'failed' }))\n      .catch(() => ({ id, status: 'failed' }))\n  );\n\n  const results = await Promise.allSettled(promises);\n  const succeeded = [];\n  const failed = [];\n\n  results.forEach(result => {\n    if (result.status === 'fulfilled') {\n      succeeded.push(result.value);\n    } else {\n      failed.push(result.reason);\n    }\n  });\n\n  return { succeeded, failed };\n}",
      "description": "Unlike Promise.all, allSettled never short-circuits. It's ideal when you need to process partial results and report individual failures."
    },
    {
      "title": "Async/Await with Timeout and Cancellation",
      "useCase": "Timeouts & AbortController",
      "code": "async function fetchWithTimeout(url, timeoutMs = 5000) {\n  const controller = new AbortController();\n  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);\n\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    return response;\n  } catch (err) {\n    if (err.name === 'AbortError') {\n      throw new Error(`Request timed out after ${timeoutMs}ms`);\n    }\n    throw err;\n  } finally {\n    clearTimeout(timeoutId);\n  }\n}\n\n// Usage\ntry {\n  const data = await fetchWithTimeout('https://api.example.com', 3000);\n} catch (err) {\n  console.error(err.message);\n}",
      "description": "Combines AbortController with a timeout Promise. The finally block ensures the timeout is always cleared, preventing memory leaks."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What is the output? console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C')); console.log('D');",
      "options": ["A, B, C, D", "A, D, B, C", "A, D, C, B", "D, A, C, B"],
      "answer": 2,
      "explanation": "Synchronous code (A, D) runs first. Then microtasks (Promise .then) execute before macrotasks (setTimeout). So output is A, D, C, B."
    },
    {
      "question": "What does Promise.allSettled return when one Promise rejects?",
      "options": [
        "An error immediately",
        "An array of {status, value/reason} objects for all promises",
        "The first resolved value",
        "undefined"
      ],
      "answer": 1,
      "explanation": "Promise.allSettled never short-circuits. It waits for all Promises to settle and returns an array with the outcome of each."
    },
    {
      "question": "What will the following async function return? async function test() { return 42; }",
      "options": ["42", "Promise {<fulfilled>: 42}", "undefined", "ReferenceError"],
      "answer": 1,
      "explanation": "An async function always returns a Promise. If the return value is not a Promise, it's wrapped in Promise.resolve()."
    },
    {
      "question": "Which Promise combinator should you use when you need all operations to complete, but some may fail, and you want results from all of them?",
      "options": ["Promise.all()", "Promise.race()", "Promise.allSettled()", "Promise.any()"],
      "answer": 2,
      "explanation": "Promise.allSettled() waits for every Promise to settle (resolve or reject) and returns the status for each. Promise.all() would fail-fast on first rejection."
    },
    {
      "question": "What happens when you await a non-Promise value?",
      "options": [
        "It throws a TypeError",
        "It's wrapped in Promise.resolve()",
        "It returns undefined",
        "The await is ignored"
      ],
      "answer": 1,
      "explanation": "await Promise.resolve(nonPromiseValue) is implicit -- the non-Promise value is wrapped in a resolved Promise, and execution continues synchronously."
    },
    {
      "question": "In the event loop, what is the correct order of execution?",
      "options": [
        "Macrotask -> Microtask -> Render",
        "Microtask -> Macrotask -> Render",
        "Call Stack -> Microtask Queue (drained) -> Macrotask -> Render",
        "Render -> Microtask -> Macrotask"
      ],
      "answer": 2,
      "explanation": "The event loop: 1) Execute synchronous code on call stack. 2) Drain the microtask queue entirely. 3) Execute one macrotask. 4) Render if needed. Repeat."
    },
    {
      "question": "What will this log? Promise.reject('err').catch(v => v + ' handled').then(v => console.log(v));",
      "options": ["err handled", "undefined", "err", "UnhandledPromiseRejection error"],
      "answer": 0,
      "explanation": "The .catch() returns a fulfilled Promise with 'err handled'. The .then() receives it and logs it. The rejection is properly handled."
    },
    {
      "question": "Which approach correctly runs 3 async tasks in parallel?",
      "options": [
        "await task1(); await task2(); await task3();",
        "await Promise.all([task1(), task2(), task3()])",
        "task1(); task2(); task3(); await;",
        "Promise.all([await task1(), await task2(), await task3()])"
      ],
      "answer": 1,
      "explanation": "Promise.all starts all Promises simultaneously. Option A runs them sequentially. Option D would still run them sequentially due to await in array."
    },
    {
      "question": "What is the purpose of the 'finally' block in a Promise chain?",
      "options": [
        "To handle only rejected Promises",
        "To execute code regardless of fulfillment or rejection",
        "To transform the resolved value",
        "To catch specific error types"
      ],
      "answer": 1,
      "explanation": ".finally() runs regardless of whether the Promise was fulfilled or rejected. It's for cleanup and does not change the resolved value or rejection reason."
    },
    {
      "question": "What does this return? await Promise.resolve(1).then(x => x + 1).then(x => x * 2);",
      "options": ["2", "3", "4", "6"],
      "answer": 2,
      "explanation": "Chain: resolve(1) -> then(1+1=2) -> then(2*2=4). The awaited value is 4."
    }
  ]
}
;
TOPICS_DATA["javascript"]["prototype-chain"] = {
  "title": "Prototype Chain",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,

  "tldr": [
    "The <strong>prototype chain</strong> is the linked sequence of objects through which JavaScript resolves property accesses on an object.",
    "Every object has an internal <code>[[Prototype]]</code> reference, forming a chain that ends at <code>Object.prototype</code> whose <code>[[Prototype]]</code> is <code>null</code>.",
    "Property lookup follows the chain: own property → prototype → prototype's prototype → ... → <code>null</code> → <code>undefined</code>.",
    "The chain enables memory-efficient <strong>property sharing</strong> and dynamic inheritance — changes to a prototype are reflected in all inheriting objects at runtime."
  ],

  "laymanDefinition": "Imagine a family tree. If you need a specific book, you first check your own bookshelf. If it's not there, you check your parent's bookshelf. If still not found, you check your grandparent's bookshelf, and so on until you run out of relatives. The prototype chain works exactly like this: JavaScript checks the object itself, then its parent prototype, then its grandparent, all the way up to Object.prototype, and finally null. At each step, the moment the property is found, the search stops. This is how all JavaScript objects can share methods like toString() and hasOwnProperty() without each object storing a copy.",

  "deepDive": [
    {
      "heading": "How the Prototype Chain Is Formed",
      "text": "The prototype chain is formed when objects are created. Object literals ({}) automatically get Object.prototype as their [[Prototype]]. Arrays get Array.prototype. Functions get Function.prototype. When you use Object.create(proto), you explicitly set the [[Prototype]]. When you use new Constructor(), the new object's [[Prototype]] is set to Constructor.prototype. Each of these prototype objects has its own [[Prototype]], creating a chain that eventually reaches Object.prototype."
    },
    {
      "heading": "Property Lookup Algorithm in Detail",
      "list": [
        "1. The engine calls the internal [[Get]] operation on the object with the property name.",
        "2. It checks if the object has an <strong>own property</strong> with that name. If yes, return its value.",
        "3. If not, get the object's [[Prototype]] (its prototype object).",
        "4. If the prototype is null, return undefined.",
        "5. Recursively apply [[Get]] on the prototype object (go to step 2)."
      ]
    },
    {
      "heading": "Prototype Chain and Method Sharing",
      "text": "Methods defined on Constructor.prototype are not copied to each instance — they are inherited via the prototype chain. This means all instances share the same function object, saving significant memory. For example, Array.prototype.push is a single function object shared by every array. When you call [].push(1), JavaScript walks the chain: the empty array does not have own property 'push', so it looks up Array.prototype, finds it there, and calls it with the array as 'this'."
    },
    {
      "heading": "Modifying the Chain at Runtime",
      "text": "One of the most powerful (and dangerous) features of prototype chains is that you can modify them at runtime. Adding a method to Array.prototype instantly makes it available to all arrays, even existing ones. This is why extending built-in prototypes is controversial — it can lead to naming collisions and unexpected behavior in third-party code. However, for your own constructor functions, dynamic prototype modification is a legitimate technique."
    },
    {
      "heading": "Performance Considerations",
      "text": "Deeper prototype chains have a performance cost because property lookup traverses more objects. Modern JavaScript engines optimize this with inline caching (IC), which memorizes the shape of objects and the location of properties in the chain. However, certain operations like Object.setPrototypeOf() or deleting properties can de-optimize these caches. For best performance, keep prototype chains shallow (2-3 levels) and avoid mutating prototypes after objects have been created."
    }
  ],

  "interviewAnswer": "The prototype chain is the mechanism by which JavaScript resolves property access on objects. Each object has an internal [[Prototype]] reference to another object. When a property is accessed, JavaScript first checks the object's own properties. If not found, it follows the [[Prototype]] reference and checks the parent object, continuing recursively until the property is found or the chain ends at null (returning undefined). This is prototypal inheritance in action — objects inherit from objects. The chain is formed implicitly (e.g., object literals inherit from Object.prototype) or explicitly (via Object.create, constructor functions with new, or class extends). Understanding the prototype chain is crucial for debugging property resolution issues, implementing inheritance patterns, and writing efficient JavaScript code.",

  "interviewQuestions": [
    {
      "question": "What is the prototype chain?",
      "answer": "The prototype chain is a linked sequence of objects where each object has a reference to its prototype (parent object). When you access a property, JavaScript walks this chain until the property is found or null is reached. It's how inheritance works in JavaScript."
    },
    {
      "question": "How does JavaScript resolve property access on an object?",
      "answer": "JavaScript uses the [[Get]] internal method: 1) Check own properties. 2) If not found, follow [[Prototype]] to the prototype object. 3) Repeat until the property is found or the prototype is null. 4) Return undefined if not found anywhere."
    },
    {
      "question": "What is the difference between the prototype chain of an object literal and an array?",
      "answer": "An object literal's prototype chain is: obj → Object.prototype → null. An array's chain is: arr → Array.prototype → Object.prototype → null. The array's chain has an extra level (Array.prototype) which provides array-specific methods like push, pop, map, etc."
    },
    {
      "question": "Can you modify the prototype chain after objects are created?",
      "answer": "Yes, you can modify prototypes at any time. Adding a method to Array.prototype instantly makes it available to all array instances, even existing ones. You can also use Object.setPrototypeOf(), though this is discouraged for performance reasons."
    },
    {
      "question": "What is the end of every prototype chain?",
      "answer": "The end is null. Object.prototype is typically the last object in most chains, and its [[Prototype]] is null. When property lookup reaches null without finding the property, JavaScript returns undefined."
    },
    {
      "question": "How does the 'instanceof' operator use the prototype chain?",
      "answer": "The 'instanceof' operator checks the prototype chain of the left operand against the .prototype property of the right operand (a constructor function). It walks the left operand's prototype chain to see if Constructor.prototype appears anywhere. If found, it returns true."
    },
    {
      "question": "What is property shadowing in the prototype chain?",
      "answer": "Shadowing occurs when an object has an own property with the same name as a property on its prototype. The own property takes precedence and 'shadows' the inherited one. To restore access to the prototype property, you must delete the own property."
    },
    {
      "question": "How do you explicitly traverse the prototype chain?",
      "answer": "Use Object.getPrototypeOf() repeatedly: <code>let proto = Object.getPrototypeOf(obj);\nwhile (proto) {\n  console.log(proto.constructor.name);\n  proto = Object.getPrototypeOf(proto);\n}</code> The deprecated __proto__ property also works but is not recommended."
    },
    {
      "question": "What is the relationship between class extends and the prototype chain?",
      "answer": "Class 'extends' sets up the prototype chain for both instances and the class itself. ChildClass.prototype.[[Prototype]] is set to ParentClass.prototype (instance method inheritance). And ChildClass.[[Prototype]] is set to ParentClass (static method inheritance via the prototype chain)."
    },
    {
      "question": "Why is modifying built-in prototypes (like Array.prototype) discouraged?",
      "answer": "Modifying built-in prototypes can cause naming collisions with future JavaScript versions, break assumptions made by libraries or frameworks, and lead to unexpected behavior in code that iterates over properties. It's generally safer to use utility functions or wrapper classes instead."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 500\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrowChain\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#fbbf24\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"480\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Prototype Chain Property Lookup</text><text x=\"350\" y=\"62\" text-anchor=\"middle\" fill=\"#888\" font-size=\"12\">obj.toString() -- Property [[Get]] algorithm</text><!-- Step boxes --><rect x=\"175\" y=\"80\" width=\"350\" height=\"55\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"350\" y=\"102\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"13\" font-weight=\"bold\">Step 1: Check obj own properties</text><text x=\"350\" y=\"122\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"12\">'toString' not found on obj</text><!-- Arrow down --><line x1=\"350\" y1=\"135\" x2=\"350\" y2=\"155\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrowChain)\"/><rect x=\"175\" y=\"155\" width=\"350\" height=\"55\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"177\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold\">Step 2: Follow [[Prototype]]</text><text x=\"350\" y=\"197\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"12\">Check obj's prototype (parent object)</text><line x1=\"350\" y1=\"210\" x2=\"350\" y2=\"230\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrowChain)\"/><rect x=\"125\" y=\"230\" width=\"450\" height=\"55\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"252\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">Step 3: Check parent's own properties</text><text x=\"350\" y=\"272\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"12\">'toString' FOUND! Return it.</text><line x1=\"350\" y1=\"285\" x2=\"350\" y2=\"310\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrowChain)\"/><rect x=\"125\" y=\"310\" width=\"450\" height=\"45\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#aaa\" stroke-width=\"1\" stroke-dasharray=\"4\"/><text x=\"350\" y=\"330\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"12\">If not found: Continue up chain (grandparent, etc.)</text><line x1=\"350\" y1=\"355\" x2=\"350\" y2=\"375\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrowChain)\"/><rect x=\"175\" y=\"375\" width=\"350\" height=\"40\" rx=\"20\" fill=\"url(#g1)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"400\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"13\" font-weight=\"bold\">null reached → return undefined</text><text x=\"350\" y=\"445\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">Search stops at the first match or at null (whichever comes first)</text></svg>",

  "codeExamples": [
    {
      "title": "Walking the Prototype Chain Manually",
      "useCase": "Debugging Inheritance",
      "code": "const grandparent = { a: 1 };\nconst parent = Object.create(grandparent);\nparent.b = 2;\nconst child = Object.create(parent);\nchild.c = 3;\n\nfunction walkChain(obj) {\n  let proto = obj;\n  let depth = 0;\n  while (proto) {\n    const own = Object.keys(proto);\n    console.log(`Level ${depth}:`, own.length ? own : '[no own props]');\n    proto = Object.getPrototypeOf(proto);\n    depth++;\n  }\n  console.log('Chain ends at null');\n}\n\nwalkChain(child);\n// Level 0: ['c']\n// Level 1: ['b']\n// Level 2: ['a']\n// Level 3: [no own props]  (Object.prototype)\n// Chain ends at null",
      "description": "Object.getPrototypeOf() lets you manually traverse the chain. Starting from child, we see each level's own properties until reaching null."
    },
    {
      "title": "instanceof and the Prototype Chain",
      "useCase": "Type Checking",
      "code": "function Animal() {}\nfunction Dog() {}\n\n// Set up inheritance: Dog.prototype inherits from Animal.prototype\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\n\nconst d = new Dog();\n\nconsole.log(d instanceof Dog);    // true\nconsole.log(d instanceof Animal); // true\nconsole.log(d instanceof Object); // true\nconsole.log(d instanceof Array);  // false\n\n// instanceof walks d's prototype chain looking for Constructor.prototype",
      "description": "instanceof walks the left operand's prototype chain to see if the right operand's .prototype appears anywhere in it."
    },
    {
      "title": "Dynamic Prototype Modification",
      "useCase": "Runtime Inheritance Changes",
      "code": "function User(name) {\n  this.name = name;\n}\n\nconst u1 = new User('Alice');\nconst u2 = new User('Bob');\n\n// Add method after instances exist\nUser.prototype.sayHi = function() {\n  return `Hi, I'm ${this.name}`;\n};\n\nconsole.log(u1.sayHi()); // 'Hi, I'm Alice' (works!)\nconsole.log(u2.sayHi()); // 'Hi, I'm Bob' (works!)\n\n// Even works on pre-existing instances via prototype chain lookup",
      "description": "Adding a method to User.prototype after u1 and u2 are created still works because property lookup walks the chain dynamically at access time."
    },
    {
      "title": "Property Shadowing in the Chain",
      "useCase": "Overriding Inherited Behavior",
      "code": "const base = { version: '1.0', getVersion() { return this.version; } };\nconst extended = Object.create(base);\n\nconsole.log(extended.getVersion()); // '1.0' (inherited)\n\nextended.version = '2.0'; // shadowing\nconsole.log(extended.getVersion()); // '2.0' (own property used)\nconsole.log(base.version);          // '1.0' (unaffected)\n\ndelete extended.version;\nconsole.log(extended.getVersion()); // '1.0' (inherited again)",
      "description": "Creating an own property with the same name as an inherited property shadows (hides) the prototype version. Deleting it restores access to the inherited value."
    },
    {
      "title": "Prototype Chain with Built-in Types",
      "useCase": "Understanding Array/String/Function Chains",
      "code": "const arr = [1, 2, 3];\n\nconsole.log(Object.getPrototypeOf(arr) === Array.prototype);   // true\nconsole.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true\nconsole.log(Object.getPrototypeOf(Object.prototype)); // null\n\n// Chain: arr → Array.prototype → Object.prototype → null\n\nconst fn = function() {};\nconsole.log(Object.getPrototypeOf(fn) === Function.prototype); // true\n// Chain: fn → Function.prototype → Object.prototype → null\n\nconst str = 'hello';\n// Strings get auto-boxed: str → String.prototype → Object.prototype → null",
      "description": "Built-in types have their own prototype objects (Array.prototype, Function.prototype, String.prototype, etc.) that provide type-specific methods."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What happens when you access a property that doesn't exist anywhere on the prototype chain?",
      "options": ["JavaScript throws a ReferenceError", "The engine returns undefined", "The engine returns null", "It creates the property automatically"],
      "answer": 1,
      "explanation": "When property lookup reaches null (the end of the chain) without finding the property, JavaScript returns undefined."
    },
    {
      "question": "What is the prototype chain of a plain object literal {}?",
      "options": ["{} → null", "{} → Object.prototype → null", "{} → Array.prototype → null", "{} → Function.prototype → null"],
      "answer": 1,
      "explanation": "Object literals automatically get Object.prototype as their [[Prototype]], and Object.prototype's [[Prototype]] is null."
    },
    {
      "question": "What will the following log? const arr = [1]; arr.__proto__ = null; console.log(arr.push);",
      "options": ["The push function", "undefined", "TypeError", "null"],
      "answer": 1,
      "explanation": "Setting __proto__ to null breaks the prototype chain. Array methods like push are on Array.prototype, which is no longer reachable."
    },
    {
      "question": "How does 'extends' in class syntax affect the prototype chain?",
      "options": ["It creates a copy of parent methods", "It sets ChildClass.prototype.[[Prototype]] to ParentClass.prototype", "It merges the constructor functions", "It has no effect on the prototype chain"],
      "answer": 1,
      "explanation": "The 'extends' keyword sets the child class's .prototype's [[Prototype]] to the parent class's .prototype, linking the prototype chains for instance method inheritance."
    },
    {
      "question": "What is the prototype chain of a function?",
      "options": ["fn → Object.prototype → null", "fn → Function.prototype → null", "fn → Function.prototype → Object.prototype → null", "fn → null"],
      "answer": 2,
      "explanation": "Functions inherit from Function.prototype, which in turn inherits from Object.prototype, forming a two-level chain."
    },
    {
      "question": "If you add a method to Array.prototype after creating an array, will the existing array have access to it?",
      "options": ["No, only new arrays get it", "Yes, all existing arrays see it immediately", "Only if you call Object.setPrototypeOf again", "It throws an error"],
      "answer": 1,
      "explanation": "Prototype chains are live. Adding a method to Array.prototype instantly makes it available to all arrays, including existing ones, via dynamic property lookup."
    },
    {
      "question": "What does the 'in' operator check?",
      "options": ["Only own properties", "Only inherited properties", "Both own and inherited properties via the prototype chain", "Enumerable properties only"],
      "answer": 2,
      "explanation": "The 'in' operator walks the full prototype chain, returning true if the property exists at any level (own or inherited)."
    },
    {
      "question": "What is the correct way to traverse the prototype chain?",
      "options": ["Using obj.__proto__.__proto__", "Repeated calls to Object.getPrototypeOf()", "Using obj.prototype", "The prototype chain cannot be traversed"],
      "answer": 1,
      "explanation": "Object.getPrototypeOf() is the standard API for getting an object's prototype. Calling it repeatedly traverses the chain."
    },
    {
      "question": "Which of the following would NOT appear in an array's prototype chain?",
      "options": ["Array.prototype", "Object.prototype", "Function.prototype", "null"],
      "answer": 2,
      "explanation": "An array's chain is: arr → Array.prototype → Object.prototype → null. Function.prototype is only in a function's chain, not an array's."
    },
    {
      "question": "What happens when you delete a property that shadows a prototype property?",
      "options": ["Both the own and prototype properties are deleted", "The own property is removed, revealing the prototype property", "The operation is ignored", "The prototype chain is broken"],
      "answer": 1,
      "explanation": "Delete removes only the own property. After deletion, property lookup falls through to the prototype chain, revealing the inherited property again."
    }
  ]
}
;
TOPICS_DATA["javascript"]["prototype"] = {
  "title": "Prototype",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,

  "tldr": [
    "A <strong>prototype</strong> is a mechanism by which JavaScript objects <strong>inherit</strong> properties and methods from other objects.",
    "Every JavaScript object has an internal property called <code>[[Prototype]]</code> that points to another object (or <code>null</code>).",
    "When you access a property on an object, JavaScript first looks for it on the object itself; if not found, it walks up the <code>[[Prototype]]</code> chain.",
    "Functions have a <code>.prototype</code> property that is used when the function is invoked with <code>new</code> — it becomes the <code>[[Prototype]]</code> of the created instance."
  ],

  "laymanDefinition": "Think of a prototype as a 'backup object.' When you ask an object for a property it doesn't have, instead of giving up, it checks its backup object. If that backup doesn't have it either, it checks its backup's backup, and so on. It's like asking a family member for a tool — if you don't have it, you ask your sibling, then your parent, then your grandparent. The prototype chain is your object's family tree, and prototypes are the relatives that share their properties with you.",

  "deepDive": [
    {
      "heading": "What Is a Prototype?",
      "text": "In JavaScript, every object has an internal slot called [[Prototype]]. This is a reference to another object from which it can inherit properties. The prototype itself has its own [[Prototype]], forming a chain that ends with Object.prototype whose [[Prototype]] is null. This chain is what enables prototypal inheritance — a powerful and flexible alternative to classical inheritance."
    },
    {
      "heading": "The Difference Between [[Prototype]] and .prototype",
      "text": "The [[Prototype]] is an internal property of all objects (including functions). You can access it via Object.getPrototypeOf(obj) or the deprecated __proto__ getter/setter. The .prototype property, by contrast, exists only on functions (specifically those that can be used as constructors). When you call a function with new, the new object's [[Prototype]] is set to the function's .prototype. This is a common source of confusion: Function.prototype is the [[Prototype]] of functions, but a function's .prototype property is what gets assigned to instances created by that function."
    },
    {
      "heading": "Property Lookup via the Prototype Chain",
      "list": [
        "1. Check if the property exists as an <strong>own property</strong> of the object (hasOwnProperty returns true).",
        "2. If not found, walk up to the object's [[Prototype]] and check there.",
        "3. Continue up the chain until the property is found or [[Prototype]] is null.",
        "4. If the chain is exhausted without finding the property, return undefined."
      ]
    },
    {
      "heading": "Prototype Inheritance vs Classical Inheritance",
      "text": "Classical inheritance (like Java or C++) involves classes defining blueprints, and instances being copies of those blueprints. JavaScript's prototypal inheritance is delegation-based: objects are linked to other objects, and property access is delegated up the chain. This means changes to a prototype object are immediately reflected in all objects that inherit from it — something not possible with classical inheritance without recompilation."
    },
    {
      "heading": "Creating Objects with Specific Prototypes",
      "text": "You can set an object's prototype at creation time using Object.create(proto), which creates a new object with the specified [[Prototype]]. You can also modify an existing object's prototype via Object.setPrototypeOf(obj, proto), though this is discouraged for performance reasons. The modern approach is to use class syntax (which is syntactic sugar over prototypes) or Object.create."
    }
  ],

  "interviewAnswer": "A prototype is a base object from which other objects inherit properties and methods. In JavaScript, every object has an internal [[Prototype]] property that references another object. When a property is accessed on an object and not found, JavaScript follows the prototype chain until it finds the property or reaches null. Functions have a .prototype property that is used with the new keyword — it becomes the prototype of created instances. This forms the foundation of prototypal inheritance, which is delegation-based rather than copy-based like classical inheritance. Key methods include Object.create() for setting prototypes, Object.getPrototypeOf() for reading them, and hasOwnProperty() for distinguishing own vs inherited properties.",

  "interviewQuestions": [
    {
      "question": "What is a prototype in JavaScript?",
      "answer": "A prototype is an internal object from which other objects inherit properties. Every JavaScript object has a [[Prototype]] property (accessible via Object.getPrototypeOf()) that points to another object. When you access a property that doesn't exist on the object itself, JavaScript looks up the prototype chain."
    },
    {
      "question": "What is the difference between [[Prototype]] and prototype?",
      "answer": "[[Prototype]] is an internal property on every object that points to its parent in the inheritance chain. The 'prototype' property is a regular property that exists only on functions. It is used when the function is called with 'new' — the new instance's [[Prototype]] is set to the function's .prototype. Example: Array.prototype exists and its methods are inherited by all array instances via their [[Prototype]]."
    },
    {
      "question": "How does property lookup work with prototypes?",
      "answer": "When you access obj.prop, JavaScript: 1) Checks if obj has an own property named 'prop'. 2) If not, checks obj's [[Prototype]]. 3) Continues up the chain. 4) Returns undefined if not found at any level. This lookup is dynamic — if a property is later added to a prototype, all inheriting objects immediately see it."
    },
    {
      "question": "How do you create an object with a specific prototype?",
      "answer": "Use Object.create(proto): <code>const animal = { eat() { console.log('eating'); } };\nconst dog = Object.create(animal);\ndog.eat(); // inherited</code> You can also use the 'class' syntax with 'extends', which sets up prototype chains under the hood."
    },
    {
      "question": "What is Object.prototype and where does the chain end?",
      "answer": "Object.prototype is the root of the prototype chain for most objects. Its [[Prototype]] is null. This is why methods like toString(), hasOwnProperty(), and valueOf() are available on almost all objects — they are inherited via the prototype chain. When the chain reaches null, property lookup stops and returns undefined."
    },
    {
      "question": "What is the difference between own properties and inherited properties?",
      "answer": "Own properties are directly on the object itself. Inherited properties come from the prototype chain. Use hasOwnProperty() to distinguish: <code>obj.hasOwnProperty('toString') // false\n'toString' in obj // true (inherited)</code> The 'in' operator checks the full chain, while hasOwnProperty checks only the object itself."
    },
    {
      "question": "How does prototypal inheritance differ from classical inheritance?",
      "answer": "Prototypal inheritance is delegation-based: objects are linked to other objects, and property access is delegated up the chain. Classical inheritance (Java, C++) is copy-based: classes define blueprints and instances copy them. In JavaScript, changes to a prototype are immediately visible to all inheriting objects, which is not the case in classical inheritance."
    },
    {
      "question": "What is prototype shadowing?",
      "answer": "Shadowing occurs when an object defines its own property with the same name as a prototype property. The own property hides (shadows) the inherited one: <code>const obj = Object.create({ x: 10 });\nobj.x = 20; // shadows the prototype's x\nconsole.log(obj.x); // 20</code> The prototype's property still exists but is no longer accessible via that object (unless using delete or Reflect)."
    },
    {
      "question": "Can you change an object's prototype after creation?",
      "answer": "Yes, using Object.setPrototypeOf(obj, proto), but this is strongly discouraged for performance reasons. Changing prototypes after creation forces engines to de-optimize property access. It's better to set the prototype at creation time with Object.create() or use constructor functions / class syntax."
    },
    {
      "question": "How do constructor functions use prototypes?",
      "answer": "When a function is called with new, the new object's [[Prototype]] is set to the function's .prototype property. Methods added to Constructor.prototype are shared across all instances: <code>function Person(name) { this.name = name; }\nPerson.prototype.greet = function() { return 'Hi ' + this.name; };\nconst p = new Person('Alice');\np.greet(); // 'Hi Alice'</code>"
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"45\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"16\" font-weight=\"bold\">Prototype Chain Structure</text><!-- Object: dog --><rect x=\"200\" y=\"65\" width=\"300\" height=\"70\" rx=\"8\" fill=\"url(#grad1)\" stroke=\"#98c379\" stroke-width=\"1.5\"/><text x=\"350\" y=\"90\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"13\" font-weight=\"bold\">dog (Instance)</text><text x=\"220\" y=\"112\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">name: 'Buddy' (own)</text><text x=\"220\" y=\"128\" fill=\"#aaa\" font-size=\"12\" font-family=\"monospace\">[[Prototype]] --></text><!-- Arrow to Animal.prototype --><line x1=\"500\" y1=\"100\" x2=\"570\" y2=\"100\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><!-- Object: Animal.prototype --><rect x=\"570\" y=\"65\" width=\"110\" height=\"70\" rx=\"8\" fill=\"url(#grad1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"625\" y=\"90\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">Animal</text><text x=\"580\" y=\"108\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">speak()</text><text x=\"580\" y=\"124\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">eat()</text><line x1=\"625\" y1=\"135\" x2=\"625\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" stroke-dasharray=\"4\" marker-end=\"url(#arrow)\"/><!-- Object: Object.prototype --><rect x=\"200\" y=\"175\" width=\"300\" height=\"70\" rx=\"8\" fill=\"url(#grad1)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"200\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"13\" font-weight=\"bold\">Object.prototype</text><text x=\"220\" y=\"220\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">toString(), hasOwnProperty()</text><text x=\"220\" y=\"236\" fill=\"#e8eaed\" font-size=\"12\" font-family=\"monospace\">valueOf(), constructor...</text><line x1=\"350\" y1=\"245\" x2=\"350\" y2=\"285\" stroke=\"#6c9fff\" stroke-width=\"2\" stroke-dasharray=\"4\" marker-end=\"url(#arrow)\"/><!-- null --><rect x=\"275\" y=\"285\" width=\"150\" height=\"50\" rx=\"25\" fill=\"#2a2f45\" stroke=\"#aaa\" stroke-width=\"1\" stroke-dasharray=\"4\"/><text x=\"350\" y=\"316\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"14\" font-family=\"monospace\">null</text><text x=\"350\" y=\"380\" text-anchor=\"middle\" fill=\"#888\" font-size=\"12\">Property lookup walks up this chain until found or null</text></svg>",

  "codeExamples": [
    {
      "title": "Object.create for Prototypal Inheritance",
      "useCase": "Setting a Prototype at Creation",
      "code": "const animal = {\n  speak() { return `${this.name} makes a sound.`; },\n  eat()   { return `${this.name} is eating.`; }\n};\n\nconst dog = Object.create(animal);\ndog.name = 'Buddy';\n\nconsole.log(dog.speak()); // 'Buddy makes a sound.'\nconsole.log(dog.eat());   // 'Buddy is eating.'\nconsole.log(dog.hasOwnProperty('speak')); // false (inherited)",
      "description": "Object.create(animal) creates a new object with its [[Prototype]] set to animal. The dog object inherits speak() and eat() from its prototype."
    },
    {
      "title": "Constructor Function with .prototype",
      "useCase": "Shared Methods via Constructor",
      "code": "function Vehicle(type) {\n  this.type = type;\n  this.miles = 0;\n}\n\nVehicle.prototype.drive = function(dist) {\n  this.miles += dist;\n  return `Drove ${dist} miles. Total: ${this.miles}`;\n};\n\nconst car = new Vehicle('Car');\nconst truck = new Vehicle('Truck');\n\nconsole.log(car.drive(100)); // 'Drove 100 miles. Total: 100'\nconsole.log(truck.drive(50)); // 'Drove 50 miles. Total: 50'\nconsole.log(car.drive === truck.drive); // true (same function)",
      "description": "Methods added to Vehicle.prototype are shared across all instances. Both car and truck use the same drive function, saving memory."
    },
    {
      "title": "Checking Own vs Inherited Properties",
      "useCase": "Property Inspection",
      "code": "const parent = { inherited: true };\nconst child = Object.create(parent);\nchild.own = 'mine';\n\nconsole.log(child.own);        // 'mine'\nconsole.log(child.inherited);   // true (via prototype)\n\nconsole.log(child.hasOwnProperty('own'));       // true\nconsole.log(child.hasOwnProperty('inherited')); // false\n\nconsole.log('inherited' in child); // true (checks full chain)",
      "description": "hasOwnProperty() checks only the object itself. The 'in' operator checks the full prototype chain."
    },
    {
      "title": "Prototype Shadowing",
      "useCase": "Overriding Inherited Properties",
      "code": "const base = { value: 10 };\nconst derived = Object.create(base);\n\nconsole.log(derived.value); // 10 (inherited)\n\nderived.value = 20; // shadows the prototype property\nconsole.log(derived.value); // 20\nconsole.log(base.value);    // 10 (unchanged)\n\ndelete derived.value;\nconsole.log(derived.value); // 10 (inherited again)",
      "description": "Setting a property on the derived object creates an own property that shadows the inherited one. Deleting it restores access to the prototype version."
    },
    {
      "title": "Prototype Chain with Multiple Levels",
      "useCase": "Deep Inheritance",
      "code": "const grandParent = { grand: true };\nconst parent = Object.create(grandParent);\nparent.parentProp = 'from parent';\nconst child = Object.create(parent);\nchild.childProp = 'from child';\n\nconsole.log(child.childProp);       // 'from child' (own)\nconsole.log(child.parentProp);      // 'from parent' (1 level up)\nconsole.log(child.grand);           // true (2 levels up)\nconsole.log(child.toString);        // function (from Object.prototype)\n\n// Walk the chain manually:\nlet proto = Object.getPrototypeOf(child);\nwhile (proto) {\n  console.log(Object.keys(proto));\n  proto = Object.getPrototypeOf(proto);\n}",
      "description": "Prototype chains can be arbitrarily deep. Property lookup walks up the chain level by level until the property is found or null is reached."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What does Object.getPrototypeOf(obj) return?",
      "options": ["The obj's constructor function", "The obj's [[Prototype]]", "The obj's .prototype property", "A copy of obj"],
      "answer": 1,
      "explanation": "Object.getPrototypeOf(obj) returns the internal [[Prototype]] of the object, which is the object it inherits from."
    },
    {
      "question": "What is the [[Prototype]] of Object.prototype?",
      "options": ["undefined", "Function.prototype", "null", "Object.prototype itself"],
      "answer": 2,
      "explanation": "Object.prototype is at the root of the prototype chain. Its [[Prototype]] is null, which terminates property lookup."
    },
    {
      "question": "What will the following log? function F() {}; F.prototype.x = 10; const a = new F(); const b = new F(); a.x = 20; console.log(b.x);",
      "options": ["10", "20", "undefined", "ReferenceError"],
      "answer": 0,
      "explanation": "Setting a.x = 20 creates an own property on a, shadowing the prototype's x. b still inherits x from the prototype, so b.x is 10."
    },
    {
      "question": "Which method checks only own properties, ignoring the prototype chain?",
      "options": ["propertyIsEnumerable()", "hasOwnProperty()", "in operator", "Object.keys()"],
      "answer": 1,
      "explanation": "hasOwnProperty() checks only whether the property exists directly on the object, not on its prototype chain."
    },
    {
      "question": "What is the .prototype property of a function used for?",
      "options": ["To access the function's own prototype", "To set the [[Prototype]] of instances created via new", "To store static methods", "To configure the function's scope"],
      "answer": 1,
      "explanation": "When a function is called with 'new', the new object's [[Prototype]] is set to the function's .prototype property."
    },
    {
      "question": "What will this return? const a = { x: 1 }; const b = Object.create(a); console.log('x' in b);",
      "options": ["true", "false", "undefined", "TypeError"],
      "answer": 0,
      "explanation": "The 'in' operator checks the full prototype chain. 'x' exists on a which is b's prototype, so it returns true."
    },
    {
      "question": "Which of the following creates an object with a specific prototype?",
      "options": ["Object.assign()", "Object.create()", "Object.defineProperty()", "Object.freeze()"],
      "answer": 1,
      "explanation": "Object.create(proto) creates a new object with its [[Prototype]] set to the provided proto object."
    },
    {
      "question": "What happens when you add a method to a prototype after instances exist?",
      "options": ["Existing instances do not see the new method", "Only new instances get the method", "All existing instances immediately see the new method", "It throws an error"],
      "answer": 2,
      "explanation": "Prototypes are live. Adding a method to a prototype immediately makes it available to all existing instances via the prototype chain."
    },
    {
      "question": "What is the relationship between an array's prototype and Array.prototype?",
      "options": ["The array's [[Prototype]] is Array.prototype", "Array.prototype is the array's constructor", "The array copies Array.prototype methods", "There is no relationship"],
      "answer": 0,
      "explanation": "When you create an array with [] or new Array(), its internal [[Prototype]] is set to Array.prototype, giving it access to methods like push, pop, map, etc."
    },
    {
      "question": "What is prototype shadowing?",
      "options": ["Deleting a prototype property", "Creating an own property that hides a prototype property with the same name", "Adding a new method to the prototype", "Removing an object from the prototype chain"],
      "answer": 1,
      "explanation": "Shadowing occurs when an own property has the same name as a prototype property. The own property takes precedence in property lookup, effectively hiding the inherited one."
    }
  ]
}
;
TOPICS_DATA["javascript"]["scope"] = {
  "title": "Scope",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "<strong>Scope</strong> determines where variables and functions are accessible in your code.",
    "JavaScript has three main scopes: <strong>Global</strong>, <strong>Function</strong>, and <strong>Block</strong>.",
    "<code>var</code> is function-scoped; <code>let</code> and <code>const</code> are <strong>block-scoped</strong>.",
    "Inner scopes can access outer scope variables, but not vice versa — this is the <strong>scope chain</strong>."
  ],
  "laymanDefinition": "Scope is like the rooms in a house. The living room (global scope) is accessible from anywhere. The kitchen (function scope) is only accessible when you're in the kitchen. The pantry (block scope, with let/const) is even smaller — only accessible from inside the pantry. If you're in the living room, you can't see what's in the pantry. But if you're in the pantry, you can see everything in the living room and kitchen. 'var' is like having a sees-through wall between rooms — the pantry items can be seen from the kitchen. 'let' and 'const' have solid walls — what's in the pantry stays there.",
  "deepDive": [
    {
      "heading": "Global Scope",
      "text": "Variables declared outside any function or block are in the <strong>global scope</strong>. They are accessible from anywhere in the program. In browsers, the global object is <code>window</code>. <code>var</code> declarations at the global level create properties on the global object; <code>let</code> and <code>const</code> do not (but they are still globally scoped). Overusing global variables is considered bad practice because of namespace pollution and unintended mutation."
    },
    {
      "heading": "Function Scope",
      "text": "Variables declared with <code>var</code> inside a function are scoped to that entire function. They are accessible anywhere within the function, including inside nested blocks. This is why <code>var</code> is called 'function-scoped'. Each function creates its own scope. Parameters are also scoped to the function."
    },
    {
      "heading": "Block Scope (ES6+)",
      "text": "Variables declared with <code>let</code> and <code>const</code> are scoped to the nearest enclosing block <code>{}</code>. A block can be an if statement, for loop, while loop, or a standalone block. Block scoping is more predictable than function scoping and is a key improvement in ES6. Each iteration of a for loop with <code>let</code> creates a new binding."
    },
    {
      "heading": "The Scope Chain",
      "text": "When JavaScript resolves a variable, it starts in the current scope. If not found, it goes up one level to the outer scope. This continues until the global scope is reached. If the variable is not found in the global scope, a <code>ReferenceError</code> is thrown. The scope chain is determined by <strong>lexical scoping</strong> — where the code is written, not where it is executed."
    },
    {
      "heading": "Scope and Variable Shadowing",
      "text": "When a variable in an inner scope has the same name as a variable in an outer scope, the inner variable <strong>shadows</strong> the outer one. The outer variable is still accessible at its own scope level but is 'hidden' by the inner declaration within the inner scope."
    }
  ],
  "interviewAnswer": "Scope in JavaScript defines the region of code where a variable is accessible. There are three types: Global (accessible everywhere), Function (var declarations inside a function), and Block (let/const declarations inside { }). Inner scopes can access outer scope variables via the scope chain, but not vice versa. var is function-scoped; let and const are block-scoped. The scope chain is determined lexically — by where functions are written, not where they're called. Variable shadowing occurs when an inner scope declares a variable with the same name as an outer scope variable.",
  "interviewQuestions": [
    {
      "question": "What types of scope exist in JavaScript?",
      "answer": "JavaScript has three main scopes: <strong>Global scope</strong> (accessible everywhere, one per program), <strong>Function scope</strong> (var declarations inside a function are accessible throughout that function), and <strong>Block scope</strong> (let and const declarations inside { } are only accessible within that block). ES6 modules also create <strong>module scope</strong>."
    },
    {
      "question": "What is the difference between function scope and block scope?",
      "answer": "<strong>Function scope (var):</strong> Variables are accessible anywhere within the enclosing function, regardless of block boundaries. <strong>Block scope (let/const):</strong> Variables are only accessible within the enclosing { } block. Example: <code>if (true) { var x = 1; let y = 2; } console.log(x); // 1 (accessible) console.log(y); // ReferenceError (block-scoped)</code>"
    },
    {
      "question": "What is variable shadowing?",
      "answer": "Variable shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope. The inner variable 'shadows' (hides) the outer one within its scope. Example: <code>let x = 'outer'; function foo() { let x = 'inner'; console.log(x); } foo(); // 'inner' console.log(x); // 'outer'</code>"
    },
    {
      "question": "What is the scope chain?",
      "answer": "The scope chain is the hierarchy of nested scopes that JavaScript traverses when resolving a variable. Starting from the innermost scope, JavaScript looks for the variable in each enclosing scope until it finds it or reaches the global scope. If not found in global scope, a ReferenceError is thrown."
    },
    {
      "question": "Can you modify a global variable from inside a function?",
      "answer": "Yes, you can read and write global variables from inside a function (unless shadowed). However, if you declare a variable with the same name inside the function, it shadows the global. Without declaration (assignment to undeclared variable), you modify/create a global — but this is an error in strict mode."
    },
    {
      "question": "What is the difference between lexical scope and dynamic scope?",
      "answer": "JavaScript uses <strong>lexical (static) scope</strong>, which means that scope is determined by where functions are written in the source code. <strong>Dynamic scope</strong> would determine scope based on where functions are called. JavaScript's scope chain is fixed at parse/compile time and does not change at runtime. This is why closures work — inner functions always have access to their outer function's scope, regardless of where they are called."
    },
    {
      "question": "How does the 'for' loop scope work with var vs let?",
      "answer": "With <code>var</code>, there is one shared binding for the loop variable, accessible after the loop ends: <code>for (var i = 0; i < 3; i++) {} console.log(i); // 3</code>. With <code>let</code>, a new binding is created for each iteration: <code>for (let j = 0; j < 3; j++) {} console.log(j); // ReferenceError</code>. This is why closures in loops work correctly with let."
    },
    {
      "question": "What is the global object and how do scope rules apply to it?",
      "answer": "In browsers, the global object is <code>window</code>. <code>var</code> declarations at the top level create properties on <code>window</code>. <code>let</code> and <code>const</code> at the top level are globally scoped but do NOT create properties on <code>window</code>. In Node.js, the global object is <code>global</code>, and module-level variables are scoped to the module, not added to <code>global</code>."
    },
    {
      "question": "What happens when you assign to an undeclared variable?",
      "answer": "In non-strict mode, assigning to an undeclared variable creates a property on the global object (the variable becomes global). In strict mode (<code>'use strict'</code>), this throws a <code>ReferenceError</code>. Always use strict mode to catch accidental global creation."
    },
    {
      "question": "How does scope interact with closures?",
      "answer": "Closures are functions that retain access to their outer (enclosing) scope even after the outer function has returned. This works because the inner function captures a reference to the outer function's scope via the scope chain. The captured variables are kept alive on the heap (not the stack) for as long as the closure exists."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"400\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">JavaScript Scope Types</text><!-- Global Scope --><rect x=\"40\" y=\"65\" width=\"620\" height=\"100\" rx=\"8\" fill=\"rgba(108,159,255,0.06)\" stroke=\"#6c9fff\" stroke-width=\"1.5\" stroke-dasharray=\"6\"/><text x=\"60\" y=\"90\" fill=\"#6c9fff\" font-size=\"13\" font-weight=\"bold\">GLOBAL SCOPE</text><text x=\"60\" y=\"115\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">const appName = 'MyApp';  // accessible everywhere</text><text x=\"60\" y=\"135\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">var oldWay = 'global';    // window.oldWay (browser)</text><text x=\"60\" y=\"155\" fill=\"#9aa0b0\" font-size=\"10\">let and const at top level: globally scoped, NOT on window</text><!-- Function Scope --><rect x=\"60\" y=\"185\" width=\"580\" height=\"90\" rx=\"8\" fill=\"rgba(251,191,36,0.06)\" stroke=\"#fbbf24\" stroke-width=\"1.5\" stroke-dasharray=\"6\"/><text x=\"80\" y=\"210\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold\">FUNCTION SCOPE (var)</text><text x=\"80\" y=\"235\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">function myFunction() {</text><text x=\"100\" y=\"255\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">var functionScoped = 'accessible anywhere in function';</text><text x=\"80\" y=\"270\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">}</text><!-- Block Scope --><rect x=\"80\" y=\"295\" width=\"540\" height=\"90\" rx=\"8\" fill=\"rgba(52,211,153,0.06)\" stroke=\"#34d399\" stroke-width=\"1.5\" stroke-dasharray=\"6\"/><text x=\"100\" y=\"320\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\">BLOCK SCOPE (let/const)</text><text x=\"100\" y=\"345\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">if (condition) {</text><text x=\"120\" y=\"365\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">let blockScoped = 'only accessible inside this block';</text><text x=\"100\" y=\"380\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\">}</text></svg>",
  "codeExamples": [
    {
      "title": "Function Scope vs Block Scope",
      "useCase": "Understanding var vs let/const scoping",
      "code": "function scopeDemo() {\n  if (true) {\n    var functionScoped = 'accessible anywhere in function';\n    let blockScoped = 'only accessible in this block';\n    const alsoBlockScoped = 'same as let';\n  }\n\n  console.log(functionScoped);  // 'accessible anywhere in function'\n  // console.log(blockScoped);  // ReferenceError: blockScoped is not defined\n  // console.log(alsoBlockScoped); // ReferenceError\n\n  // var 'leaks' out of the if block\n  // let/const stay contained within the block\n}\n\nscopeDemo();\n\n// At the global level:\n// console.log(functionScoped); // ReferenceError (function scope)\n\n// Key takeaway: let and const are BLOCK-scoped\n// var is FUNCTION-scoped",
      "description": "var declarations are scoped to the enclosing function, not the block. This means var 'leaks' out of if/for/while blocks. let and const are properly block-scoped and stay within { }."
    },
    {
      "title": "For Loop Scope: var vs let",
      "useCase": "Loop closures",
      "code": "// var: single binding for all iterations\nconst varCallbacks = [];\nfor (var i = 0; i < 3; i++) {\n  varCallbacks.push(() => console.log('var:', i));\n}\nvarCallbacks.forEach(cb => cb());\n// Output: var: 3, var: 3, var: 3\n\n// let: new binding per iteration\nconst letCallbacks = [];\nfor (let j = 0; j < 3; j++) {\n  letCallbacks.push(() => console.log('let:', j));\n}\nletCallbacks.forEach(cb => cb());\n// Output: let: 0, let: 1, let: 2\n\n// let effectively does:\n// { let j = 0; callbacks.push(() => j); }\n// { let j = 1; callbacks.push(() => j); }\n// { let j = 2; callbacks.push(() => j); }",
      "description": "var creates one function-scoped binding for the loop variable. let creates a new block-scoped binding for each iteration, which is why closures capture the correct value."
    },
    {
      "title": "Scope Chain: Variable Resolution",
      "useCase": "How JavaScript finds variables",
      "code": "const planet = 'Earth';  // Level 0: Global scope\n\nfunction outer() {\n  const galaxy = 'Milky Way';  // Level 1: outer's scope\n  \n  function inner() {\n    const solarSystem = 'Solar System';  // Level 2: inner's scope\n    \n    // Variable resolution starts at the innermost scope\n    console.log(solarSystem);  // Found in Level 2\n    console.log(galaxy);       // Not in Level 2, check Level 1 -> found\n    console.log(planet);       // Not in Level 2 or 1, check Level 0 -> found\n  }\n  \n  inner();\n}\n\nouter();\n\n// Scope chain for inner:\n// inner's scope -> outer's scope -> global scope\n// inner can access: solarSystem, galaxy, planet\n// outer can access: galaxy, planet\n// Global can access: planet only",
      "description": "JavaScript starts looking for a variable in the current scope and moves outward until it finds it or reaches the global scope. Inner scopes can access outer scopes, but not vice versa."
    },
    {
      "title": "Variable Shadowing",
      "useCase": "Same name, different scopes",
      "code": "let name = 'Global Alice';\n\nfunction shadowDemo() {\n  let name = 'Local Bob';  // Shadows the global 'name'\n  console.log(name);  // 'Local Bob' (inner scope wins)\n  \n  function deeplyNested() {\n    let name = 'Deep Charlie';  // Shadows both\n    console.log(name);  // 'Deep Charlie'\n  }\n  \n  deeplyNested();\n  console.log(name);  // 'Local Bob' (back to middle scope)\n}\n\nshadowDemo();\nconsole.log(name);  // 'Global Alice' (global unchanged)\n\n// Shadowing is not the same as mutation!\n// Each 'name' is a SEPARATE variable in its own scope.\n// The global 'name' was never modified.",
      "description": "Shadowing creates a new variable in the inner scope that hides the outer variable. The outer variable is not affected. Shadowing is different from reassignment (mutation)."
    },
    {
      "title": "IIFE for Isolated Scope (Pre-ES6 Pattern)",
      "useCase": "Creating private scope before block scoping",
      "code": "// Before ES6 block scoping, IIFEs were used to create private scopes\n\n// Global scope\nconst globalValue = 'I am global';\n\n// IIFE creates a new function scope\n(function() {\n  // This variable is scoped to the IIFE, not global\n  const privateValue = 'I am private to the IIFE';\n  var alsoPrivate = 'Also private (var in function scope)';\n  \n  console.log(globalValue);  // 'I am global' (accessible via scope chain)\n  console.log(privateValue); // 'I am private to the IIFE'\n})();\n\n// console.log(privateValue);  // ReferenceError\n// console.log(alsoPrivate);   // ReferenceError\n\n// Modern alternative: just use a block\n{\n  let modernPrivate = 'Block scoped!';\n  console.log(modernPrivate); // 'Block scoped!'\n}\n// console.log(modernPrivate); // ReferenceError",
      "description": "Before let/const block scoping, IIFEs (Immediately Invoked Function Expressions) were the standard way to create private scopes. Modern JavaScript can use bare blocks { } with let/const instead."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What will this log? if (true) { var x = 10; let y = 20; } console.log(x); console.log(y);",
      "options": ["10, 20", "10, ReferenceError", "ReferenceError, ReferenceError", "undefined, undefined"],
      "answer": 1,
      "explanation": "x is function-scoped (var), accessible outside the block. y is block-scoped (let), not accessible outside the block. Output: 10, ReferenceError."
    },
    {
      "question": "What is variable shadowing?",
      "options": ["A variable being deleted", "An inner scope variable hiding an outer scope variable with the same name", "Variables with no scope", "A variable being accessible from everywhere"],
      "answer": 1,
      "explanation": "Shadowing occurs when an inner scope declares a variable with the same name as an outer scope variable. The inner variable 'shadows' the outer one within its scope."
    },
    {
      "question": "Which keyword creates block-scoped variables?",
      "options": ["var", "let and const", "function", "All of the above"],
      "answer": 1,
      "explanation": "Only let and const create block-scoped variables. var creates function-scoped variables. function creates function-scoped declarations (fully hoisted)."
    },
    {
      "question": "What will this log? for (var i = 0; i < 3; i++) {} console.log(i);",
      "options": ["undefined", "ReferenceError", "3", "0"],
      "answer": 2,
      "explanation": "var i is function-scoped. After the loop, i retains its last value (3). With let, it would throw a ReferenceError because let is block-scoped to the loop."
    },
    {
      "question": "What is the scope chain?",
      "options": ["A linked list of all variables in the program", "The hierarchy of nested scopes used for variable resolution", "A chain of function calls", "A prototype chain for objects"],
      "answer": 1,
      "explanation": "The scope chain is the hierarchy of nested scopes that JavaScript traverses to resolve variable references, starting from the innermost scope."
    },
    {
      "question": "What happens when JavaScript cannot find a variable in any scope?",
      "options": ["It returns undefined", "It throws a ReferenceError", "It creates the variable globally", "It returns null"],
      "answer": 1,
      "explanation": "If a variable is not found in any scope (including global), JavaScript throws a ReferenceError. Note: assignment to undeclared variables creates globals in non-strict mode."
    },
    {
      "question": "What is an IIFE and why was it used?",
      "options": ["A function that runs infinitely", "An Immediately Invoked Function Expression, used to create private scopes before ES6", "A function that is never called", "An inline function declaration"],
      "answer": 1,
      "explanation": "IIFEs create a new function scope, isolating variables from the global scope. They were heavily used before ES6 introduced block scoping with let and const."
    },
    {
      "question": "In strict mode, what happens when you assign to an undeclared variable?",
      "options": ["It creates a global variable", "It throws a ReferenceError", "It returns undefined", "It ignores the assignment"],
      "answer": 1,
      "explanation": "In strict mode, assignment to an undeclared variable throws a ReferenceError. In non-strict mode, it creates a property on the global object."
    },
    {
      "question": "What will this log? function test() { return innerVar; var innerVar = 'hoisted'; } console.log(test());",
      "options": ["'hoisted'", "undefined", "ReferenceError", "SyntaxError"],
      "answer": 1,
      "explanation": "var innerVar is hoisted to the top of the function scope and initialized to undefined. The assignment (innerVar = 'hoisted') happens after the return statement. So the function returns undefined."
    },
    {
      "question": "Which of the following is NOT a valid scope in JavaScript?",
      "options": ["Global scope", "Function scope", "Block scope", "File scope"],
      "answer": 3,
      "explanation": "JavaScript has Global, Function, Block, and Module scopes. There is no 'file scope' — files create either a global scope (script) or module scope (ES modules)."
    }
  ]
}
;
TOPICS_DATA["javascript"]["temporal-dead-zone"] = {
  "title": "Temporal Dead Zone",
  "difficulty": "intermediate",
  "estimatedMinutes": 15,
  "tldr": [
    "The <strong>Temporal Dead Zone (TDZ)</strong> is the time between entering a scope and the actual declaration of a <code>let</code> or <code>const</code> variable.",
    "During the TDZ, the variable exists (hoisted) but cannot be accessed. Any access throws a <code>ReferenceError</code>.",
    "<code>var</code> does NOT have a TDZ — it's hoisted and initialized with <code>undefined</code>.",
    "The TDZ prevents accessing variables before their declaration, catching bugs early instead of silently producing <code>undefined</code>."
  ],
  "laymanDefinition": "Imagine you're setting up a new desk. You decide where the keyboard will go (the space is reserved), but the keyboard hasn't been placed there yet. If you try to type on it, you'll hit empty air — the keyboard isn't ready to use. That's the Temporal Dead Zone. JavaScript reserves the name (the space) but the variable isn't ready to use yet. With 'var', it's like having a broken keyboard that's already there but doesn't work properly (it's 'undefined'). With 'let' and 'const', JavaScript simply says 'you can't use this yet' and throws an error, which is actually more helpful because it tells you something is wrong.",
  "deepDive": [
    {
      "heading": "What Creates the TDZ?",
      "text": "When JavaScript enters a scope (a block, function, or module), the engine scans for all declarations. <code>let</code> and <code>const</code> variables are <strong>hoisted</strong> (the binding is created in the scope's lexical environment), but they are <strong>not initialized</strong>. They enter an 'uninitialized' state — the TDZ. The TDZ lasts from the start of the scope until the actual declaration statement is evaluated during execution."
    },
    {
      "heading": "var vs let/const: Why TDZ Exists",
      "text": "With <code>var</code>, the variable is hoisted AND initialized to <code>undefined</code>. Accessing it before declaration gives <code>undefined</code> — this can mask bugs (a variable exists but has an unexpected value). With <code>let</code>/<code>const</code>, the TDZ throws a <code>ReferenceError</code>, making bugs immediately visible. The TDZ is a deliberate design choice to improve code quality."
    },
    {
      "heading": "TDZ and typeof",
      "text": "Interestingly, <code>typeof</code> for a variable in the TDZ throws a <code>ReferenceError</code>. However, <code>typeof</code> for a completely undeclared variable returns <code>'undefined'</code>. This means you cannot use <code>typeof</code> to safely check for the existence of a <code>let</code> or <code>const</code> variable before its declaration. This is a key difference from <code>var</code>, where <code>typeof</code> before declaration returns <code>'undefined'</code>."
    },
    {
      "heading": "TDZ and Class Declarations",
      "text": "Class declarations also have a TDZ. You cannot access a class before its declaration: <code>new MyClass()</code> before <code>class MyClass {}</code> throws a <code>ReferenceError</code>. Class expressions (<code>const MyClass = class {}</code>) follow the same TDZ rules as their binding keyword."
    }
  ],
  "interviewAnswer": "The Temporal Dead Zone is the period between entering a scope and the initialization of a let or const variable. During this period, the variable exists in the scope (it is hoisted) but is uninitialized — accessing it throws a ReferenceError. The TDZ was introduced in ES6 to improve code quality by eliminating the silent 'undefined' behavior of var. The TDZ ends when the declaration statement is reached during execution. Class declarations and default function parameters also have TDZ-like behavior. typeof throws a ReferenceError for TDZ variables but returns 'undefined' for undeclared variables.",
  "interviewQuestions": [
    {
      "question": "What is the Temporal Dead Zone (TDZ)?",
      "answer": "The TDZ is the time between entering a scope (where let/const variables are hoisted) and the actual declaration of that variable. During the TDZ, the variable cannot be accessed. Any attempt to read or write it throws a ReferenceError. <code>var</code> does not have a TDZ because it's initialized to <code>undefined</code> during hoisting."
    },
    {
      "question": "Why was the TDZ introduced in ES6?",
      "answer": "The TDZ was introduced to fix the confusing behavior of <code>var</code>, which silently returns <code>undefined</code> when accessed before declaration. The TDZ makes bugs visible immediately by throwing a ReferenceError, encouraging developers to declare variables before using them. It also aligns JavaScript with best practices from other languages."
    },
    {
      "question": "Does typeof throw a ReferenceError for TDZ variables?",
      "answer": "Yes. <code>typeof</code> on a let/const variable in the TDZ throws a <code>ReferenceError</code>. However, <code>typeof</code> on a completely undeclared variable returns <code>'undefined'</code>. This means <code>typeof</code> cannot be used as a safe check for let/const variables before their declaration."
    },
    {
      "question": "When does the TDZ end?",
      "answer": "The TDZ ends when the declaration statement is evaluated during execution. For example: <code>{ console.log(x); let x = 5; }</code> — the TDZ for x starts at the opening brace and ends at <code>let x = 5</code>. Accessing x before that line throws a ReferenceError; accessing it after works normally."
    },
    {
      "question": "Do function declarations have a TDZ?",
      "answer": "No. Function declarations are fully hoisted — both the binding and the function body are available immediately. You can call a function declaration before its line in the source. However, class declarations DO have a TDZ."
    },
    {
      "question": "What is the TDZ behavior in default function parameters?",
      "answer": "Default parameters have their own scope (a 'parameters scope'), and they have TDZ-like behavior. A parameter's default value cannot reference another parameter that hasn't been initialized yet: <code>function add(a = b, b = 10) {}</code> throws a ReferenceError because when initializing <code>a</code>, <code>b</code> is in the TDZ."
    },
    {
      "question": "How does the TDZ affect 'const' declarations?",
      "answer": "const declarations have the same TDZ rules as let. Additionally, const must be initialized at declaration: <code>const x; // SyntaxError</code>. The TDZ for const ends at its declaration and initialization. Once initialized, const cannot be reassigned."
    },
    {
      "question": "Does the TDZ exist in the global scope?",
      "answer": "Yes. let and const variables declared in the global scope still have a TDZ. Unlike var declarations, which create properties on the global object (window), let and const declarations do not create window properties. Accessing a global let/const before its declaration throws a ReferenceError."
    },
    {
      "question": "Can you have a ReferenceError from the TDZ that is NOT from accessing a variable?",
      "answer": "No. The TDZ only causes ReferenceErrors when you try to READ or WRITE a variable before its declaration. Passing a variable to a function before its declaration also throws: <code>foo(x); let x = 5;</code>. The variable itself being hoisted (just existing in the TDZ) does not cause any error on its own."
    },
    {
      "question": "What is the difference between 'undeclared', 'undefined', and 'TDZ'?",
      "answer": "<strong>Undeclared:</strong> Variable was never declared at all. Accessing throws ReferenceError. typeof returns 'undefined'. <strong>Undefined:</strong> Variable was declared (var) but not yet assigned a value. Accessing returns undefined. No error. <strong>TDZ:</strong> Variable was declared (let/const) but not yet initialized. Accessing throws ReferenceError. typeof throws ReferenceError."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"15\" font-weight=\"bold\">Temporal Dead Zone — let/const Hoisting Timeline</text><!-- Scope block --><rect x=\"40\" y=\"65\" width=\"620\" height=\"270\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"90\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"13\" font-weight=\"bold\">{  // Scope begins</text><text x=\"60\" y=\"110\" fill=\"#9aa0b0\" font-size=\"11\">→ let/const variables are HOISTED here (binding created)</text><line x1=\"60\" y1=\"125\" x2=\"640\" y2=\"125\" stroke=\"var(--border)\" stroke-dasharray=\"2\" stroke-width=\"1\"/><!-- TDZ zone --><rect x=\"60\" y=\"140\" width=\"560\" height=\"60\" rx=\"6\" fill=\"rgba(248,113,113,0.1)\" stroke=\"#f87171\" stroke-width=\"2\" stroke-dasharray=\"5\"/><text x=\"340\" y=\"165\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"14\" font-weight=\"bold\">⛔ TEMPORAL DEAD ZONE ⛔</text><text x=\"340\" y=\"188\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"11\">Cannot access variable // ReferenceError</text><text x=\"340\" y=\"205\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">(typeof also throws ReferenceError)</text><!-- Arrow from scope entry to TDZ --><line x1=\"80\" y1=\"110\" x2=\"80\" y2=\"140\" stroke=\"#f87171\" stroke-width=\"1.5\" stroke-dasharray=\"3\" marker-end=\"url(#arrow)\"/><text x=\"75\" y=\"128\" fill=\"#f87171\" font-size=\"9\">enter</text><!-- Declaration line --><line x1=\"60\" y1=\"218\" x2=\"640\" y2=\"218\" stroke=\"#34d399\" stroke-width=\"1.5\"/><rect x=\"200\" y=\"208\" width=\"300\" height=\"24\" rx=\"4\" fill=\"rgba(52,211,153,0.12)\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"350\" y=\"225\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">let x = 10;  ← TDZ ends here</text><!-- After TDZ --><rect x=\"60\" y=\"245\" width=\"560\" height=\"50\" rx=\"6\" fill=\"rgba(52,211,153,0.06)\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"340\" y=\"268\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\">✅ x is now accessible!</text><text x=\"340\" y=\"286\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">console.log(x); // 10  |  typeof x; // 'number'</text><!-- var comparison --><rect x=\"60\" y=\"310\" width=\"580\" height=\"20\" rx=\"4\" fill=\"#222639\"/><text x=\"75\" y=\"324\" fill=\"#fbbf24\" font-size=\"10\">var y = 20;</text><text x=\"220\" y=\"324\" fill=\"#9aa0b0\" font-size=\"10\">→ No TDZ. y is hoisted and initialized to</text><text x=\"520\" y=\"324\" fill=\"#fbbf24\" font-size=\"10\">undefined</text></svg>",
  "codeExamples": [
    {
      "title": "TDZ in Action: let and const",
      "useCase": "Understanding ReferenceError timing",
      "code": "{\n  // TDZ starts here for x, y, z\n  \n  // console.log(x); // ReferenceError: Cannot access 'x' before initialization\n  // console.log(y); // ReferenceError\n  // console.log(z); // ReferenceError\n  \n  let x = 10;    // TDZ ends for x\n  console.log(x); // 10 - Works!\n  \n  const y = 20;  // TDZ ends for y\n  console.log(y); // 20 - Works!\n  \n  let z = 30;    // TDZ ends for z\n  console.log(z); // 30 - Works!\n  \n  // TDZ is over for all variables now\n  console.log(x, y, z); // 10, 20, 30\n}",
      "description": "The TDZ starts when the scope is entered and ends individually for each variable when its declaration statement is reached. Each let/const variable has its own TDZ period."
    },
    {
      "title": "var Has No TDZ",
      "useCase": "Contrasting var vs let behavior",
      "code": "{\n  console.log(a);  // undefined (NOT a ReferenceError!)\n  // var is hoisted AND initialized to undefined\n  \n  var a = 10;\n  console.log(a);  // 10\n  \n  // console.log(b);  // ReferenceError: Cannot access 'b' before initialization\n  let b = 20;\n  console.log(b);  // 20\n  \n  // The var gives 'undefined' (silent, might mask bugs)\n  // The let gives ReferenceError (immediate, helps catch bugs)\n}",
      "description": "var hoisting gives the variable an initial value of undefined, making it accessible (but useless) before declaration. let/const TDZ prevents any access before declaration, surfacing bugs immediately."
    },
    {
      "title": "typeof and TDZ",
      "useCase": "typeof behavior differences",
      "code": "// var: typeof returns 'undefined' even before declaration\nconsole.log(typeof varVar);  // 'undefined' (no ReferenceError)\nvar varVar = 10;\n\n// let: typeof throws ReferenceError in TDZ\n// console.log(typeof letVar);  // ReferenceError!\nlet letVar = 20;\nconsole.log(typeof letVar);  // 'number' (after TDZ)\n\n// Undeclared variable: typeof returns 'undefined'\nconsole.log(typeof totallyUndeclared);  // 'undefined' (safe, no error)\n\n// Different behaviors:\n// 1. typeof undeclaredVar -> 'undefined' (safe check)\n// 2. typeof varVar before declaration -> 'undefined' (silent)\n// 3. typeof letVar before declaration -> ReferenceError! (not silent)\n\n// This means you CANNOT safely use typeof to check for\n// a let/const variable that may or may not be declared.",
      "description": "typeof behaves differently for var, let/const, and undeclared variables. This is an important edge case to know for defensive coding."
    },
    {
      "title": "Default Parameters and TDZ",
      "useCase": "TDZ in function parameter scope",
      "code": "// Default parameters have their own scope\n// Parameters are initialized left-to-right\n\n// This works: a is initialized before b uses it\nfunction add(a = 10, b = a) {\n  return a + b;\n}\nconsole.log(add());  // 20 (a=10, b=10)\n\n// This throws: b is in TDZ when a tries to use it\n// function bad(a = b, b = 10) {\n//   return a + b;\n// }\n// console.log(bad());  // ReferenceError: Cannot access 'b' before initialization\n\n// This also throws\n// function tricky(x = x) {\n//   return x;\n// }\n// console.log(tricky());  // ReferenceError\n\n// Correct way with default parameters\nfunction correct(x = 10, y = x * 2) {\n  return { x, y };\n}\nconsole.log(correct());  // { x: 10, y: 20 }\nconsole.log(correct(5)); // { x: 5, y: 10 }",
      "description": "Default function parameters are initialized left-to-right. Each parameter is in the TDZ until its own declaration is reached. A parameter cannot reference a later parameter in its default value."
    },
    {
      "title": "Class Declarations Have TDZ Too",
      "useCase": "Class hoisting behavior",
      "code": "// Class declarations are hoisted but NOT initialized (TDZ)\n\n// new MyClass();  // ReferenceError: Cannot access 'MyClass' before initialization\n\nclass MyClass {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello, ${this.name}`;\n  }\n}\n\n// After declaration, it works\nconst obj = new MyClass('Alice');\nconsole.log(obj.greet());  // 'Hello, Alice'\n\n// Class expression with const also has TDZ\n// new YourClass();  // ReferenceError\nconst YourClass = class {\n  constructor() {}\n};\n\n// var class expression... also has TDZ? No!\n// Actually, var classExpression doesn't exist because\n// class expression must be assigned. But:\n\n// var myVarClass = class {};  // var hoisting applies to the variable\n// console.log(myVarClass);  // undefined (var hoisted)\n// But the class ITSELF is in TDZ because classes are block-scoped like let\n\n// Summary:\n// - class declarations: TDZ (like let)\n// - const ClassExpr: TDZ (like const)\n// - var varClass = class: var is hoisted as undefined, \n//   but assignment (the class) is not yet executed",
      "description": "Class declarations have TDZ like let and const. You cannot access a class before its declaration, even though the binding is hoisted. This prevents the confusing temporal behavior of function declarations."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does this code log? { console.log(x); let x = 5; }",
      "options": ["undefined", "5", "ReferenceError", "null"],
      "answer": 2,
      "explanation": "x is in the Temporal Dead Zone from the start of the block until the 'let x = 5' declaration. Accessing it before that line throws a ReferenceError."
    },
    {
      "question": "What does this log? console.log(typeof y); var y = 10;",
      "options": ["'undefined'", "'number'", "ReferenceError", "SyntaxError"],
      "answer": 0,
      "explanation": "var y is hoisted and initialized to undefined. Before the assignment (y = 10), typeof returns 'undefined'. No ReferenceError because var doesn't have TDZ."
    },
    {
      "question": "Which variables have a Temporal Dead Zone?",
      "options": ["var, let, const", "let, const", "var only", "All variables including function declarations"],
      "answer": 1,
      "explanation": "Only let and const have a TDZ. var is hoisted and initialized to undefined immediately. Function declarations are fully hoisted with no TDZ."
    },
    {
      "question": "What does this log? console.log(typeof undeclaredVar);",
      "options": ["ReferenceError", "'undefined'", "'object'", "'null'"],
      "answer": 1,
      "explanation": "typeof on a completely undeclared variable returns 'undefined' (no error). This is different from accessing an undeclared variable directly (which throws ReferenceError)."
    },
    {
      "question": "When does the TDZ begin and end?",
      "options": ["Begins at declaration, ends at assignment", "Begins at scope entry, ends at declaration", "Begins at scope entry, ends at scope exit", "Begins at hoisting, ends at initialization"],
      "answer": 1,
      "explanation": "The TDZ begins when the scope (block, function, or module) is entered and the variable is hoisted. It ends when the declaration statement is evaluated during execution."
    },
    {
      "question": "What does this log? function test(a = b, b = 10) { return a + b; } test();",
      "options": ["20", "NaN", "ReferenceError", "undefined"],
      "answer": 2,
      "explanation": "Default parameters are initialized left-to-right. When initializing 'a', 'b' is in the TDZ because it hasn't been declared yet. This throws a ReferenceError."
    },
    {
      "question": "Does 'typeof' throw for a let variable in the TDZ?",
      "options": ["Yes, ReferenceError", "No, returns 'undefined'", "No, returns 'TDZ'", "Depends on strict mode"],
      "answer": 0,
      "explanation": "typeof on a let/const variable in the TDZ throws a ReferenceError. This is different from var (returns 'undefined') and undeclared variables (returns 'undefined')."
    },
    {
      "question": "What is the main purpose of the TDZ in ES6?",
      "options": ["To make JavaScript faster", "To catch bugs where variables are used before declaration", "To replace var entirely", "To enable block scoping"],
      "answer": 1,
      "explanation": "The TDZ catches bugs by throwing immediately when a variable is accessed before its declaration. This is better than var's silent 'undefined' which can mask logical errors."
    },
    {
      "question": "What will this log? { let x = x; }",
      "options": ["undefined", "ReferenceError", "x", "SyntaxError"],
      "answer": 1,
      "explanation": "The right-hand side of 'let x = x' is evaluated before x is initialized. At this point, x is still in the TDZ, so 'x' on the right throws a ReferenceError."
    },
    {
      "question": "Do class declarations have a TDZ?",
      "options": ["No, classes are fully hoisted", "Yes, like let and const", "Only in strict mode", "Only for static methods"],
      "answer": 1,
      "explanation": "Class declarations are hoisted but have a TDZ like let and const. You cannot access a class before its declaration."
    }
  ]
}
;
TOPICS_DATA["javascript"]["this-keyword"] = {
  "title": "this Keyword",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,

  "tldr": [
    "<code>this</code> is a special keyword in JavaScript that refers to the <strong>execution context</strong> — the object that is currently executing the function.",
    "Unlike most languages, <code>this</code> is <strong>not</strong> determined by where the function is defined, but by <strong>how</strong> it is called (with arrow functions being the exception).",
    "There are <strong>four rules</strong> for <code>this</code> binding: default binding (global/window), implicit binding (method call), explicit binding (call/apply/bind), and <code>new</code> binding (constructor).",
    "Arrow functions do <strong>not</strong> have their own <code>this</code> — they inherit <code>this</code> from their enclosing lexical scope."
  ],

  "laymanDefinition": "Think of 'this' as a pronoun like 'me'. The word 'me' refers to different people depending on who is speaking. When Alice says 'Give it to me', 'me' means Alice. When Bob says it, 'me' means Bob. Similarly, 'this' in JavaScript refers to whatever object is currently 'speaking' — the object that owns the function that is executing. If you call a method as obj.func(), then 'this' is obj. If you call a standalone function func(), then 'this' is the global object (window in browsers). If you use new, 'this' is the new instance being created. And if you use call/apply/bind, you explicitly say 'I want this to be this specific object'.",
    
  "deepDive": [
    {
      "heading": "Default Binding (Global Context)",
      "text": "When a function is called as a plain, standalone function (not as a method, not with new, not with call/apply/bind), 'this' defaults to the global object (window in browsers, global in Node.js). In strict mode ('use strict'), default binding results in 'this' being undefined instead of the global object — a safer behavior that prevents accidental global mutations."
    },
    {
      "heading": "Implicit Binding (Method Call)",
      "text": "When a function is called as a property of an object (obj.method()), 'this' is bound to that object (obj). This is the most intuitive binding rule. However, a common pitfall is when you detach the method from its object: const fn = obj.method; fn(); — here, 'this' reverts to default binding because the function is called standalone, not as a method."
    },
    {
      "heading": "Explicit Binding (call, apply, bind)",
      "text": "You can force 'this' to be whatever you want using Function.prototype.call(thisArg, ...args), Function.prototype.apply(thisArg, [argsArray]), or Function.prototype.bind(thisArg, ...args). call and apply invoke the function immediately with the specified 'this'. bind returns a new function with 'this' permanently bound."
    },
    {
      "heading": "new Binding (Constructor Calls)",
      "text": "When a function is called with the 'new' keyword, JavaScript creates a new object, sets its [[Prototype]] to the function's .prototype property, and binds 'this' to the new object inside the function. If the function does not return its own object, the new object is returned automatically. This is how constructor functions and ES6 classes establish 'this'."
    },
    {
      "heading": "Arrow Functions: Lexical this Binding",
      "text": "Arrow functions are the exception to the rule. They do not have their own 'this' binding. Instead, they capture 'this' from their surrounding lexical scope at definition time. This makes them ideal for callbacks, event handlers, and nested functions where you want to preserve the outer 'this'. Arrow functions cannot be rebound with call, apply, or bind — the first argument is ignored."
    }
  ],

  "interviewAnswer": "The 'this' keyword refers to the execution context — the object that owns the currently executing code. Its value is determined by how a function is called, not where it's defined. There are four binding rules with a clear precedence: new binding (highest), explicit binding (call/apply/bind), implicit binding (method call), and default binding (standalone function call). In strict mode, the default binding is undefined. Arrow functions are special — they don't have their own 'this' and instead inherit it lexically from the enclosing scope. Understanding 'this' is critical for debugging, writing correct object-oriented code, and working with event handlers, callbacks, and modern frameworks like React.",

  "interviewQuestions": [
    {
      "question": "What determines the value of 'this' in a regular function?",
      "answer": "The value of 'this' is determined by how the function is called, not where it is defined. There are four rules: 1) Default binding — standalone call, this = global (or undefined in strict mode). 2) Implicit binding — method call (obj.fn()), this = obj. 3) Explicit binding — call/apply/bind, this = the provided argument. 4) new binding — constructor call, this = the new instance."
    },
    {
      "question": "What is the value of 'this' in a standalone function call in strict mode?",
      "answer": "In strict mode, 'this' is undefined in a standalone function call. This is a safety feature — it prevents accidental mutations of the global object. Without strict mode, 'this' would be the global object (window in browsers), and assigning properties to it would create global variables."
    },
    {
      "question": "How does 'this' work in arrow functions?",
      "answer": "Arrow functions do not have their own 'this'. They capture 'this' from the enclosing lexical scope at definition time. This means an arrow function's 'this' is fixed and cannot be changed with call, apply, or bind. Arrow functions are useful for callbacks and event handlers where you want to preserve the enclosing 'this'."
    },
    {
      "question": "What will the following log? const obj = { name: 'Obj', log: function() { console.log(this.name); } }; const fn = obj.log; fn();",
      "answer": "It logs undefined (or window.name in browsers). When you assign obj.log to fn and call fn(), you lose the implicit binding. The function is called as a standalone function, so 'this' defaults to the global object (or is undefined in strict mode). This is called the 'lost this' problem."
    },
    {
      "question": "What is the precedence order for 'this' binding rules?",
      "answer": "From highest to lowest: 1) new binding (with 'new' keyword). 2) Explicit binding (call, apply, bind). 3) Implicit binding (method call). 4) Default binding (standalone function call). Arrow functions bypass all these rules entirely — they use lexical binding."
    },
    {
      "question": "Can you permanently bind 'this' for a function?",
      "answer": "Yes, using Function.prototype.bind(). bind() returns a new function with 'this' set to the provided value. The returned function's 'this' cannot be changed — even if you call call() or apply() on it. bind() also supports partial application (pre-filling arguments)."
    },
    {
      "question": "How does 'this' behave inside a DOM event handler?",
      "answer": "In a regular function used as an event handler, 'this' refers to the element that fired the event. In an arrow function, 'this' is inherited from the enclosing lexical scope (often the window or enclosing function), not the DOM element. This is why React class components use arrow functions or .bind() for event handlers."
    },
    {
      "question": "What is the value of 'this' inside a setTimeout callback?",
      "answer": "In a regular function, setTimeout's callback executes with 'this' set to the global object (window) or undefined in strict mode, regardless of how setTimeout is called. This is because setTimeout calls the callback as a standalone function. To preserve 'this', use an arrow function or .bind()."
    },
    {
      "question": "How does 'this' work with the 'new' keyword?",
      "answer": "When a function is called with 'new', JavaScript: 1) Creates a new empty object. 2) Sets the object's [[Prototype]] to the function's .prototype. 3) Binds 'this' to the new object inside the function. 4) Executes the function body. 5) Returns the new object (unless the function returns its own object)."
    },
    {
      "question": "What happens when you pass an object method as a callback?",
      "answer": "The method loses its 'this' binding: <code>const obj = { val: 42, get: function() { return this.val; } };\nsetTimeout(obj.get, 100); // undefined (or window.val)</code> When obj.get is passed as a reference to setTimeout, it is called later as a standalone function. Fix by wrapping: setTimeout(() => obj.get(), 100) or setTimeout(obj.get.bind(obj), 100)."
    }
  ],

  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#6c9fff\"/></marker><linearGradient id=\"g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" style=\"stop-color:#2a2f45\"/><stop offset=\"100%\" style=\"stop-color:#1a1d28\"/></linearGradient></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"40\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"16\" font-weight=\"bold\">'this' Binding Rules (in precedence order)</text><!-- 4 boxes --><rect x=\"140\" y=\"65\" width=\"420\" height=\"65\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"87\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"14\" font-weight=\"bold\">1. new Binding (Highest Priority)</text><text x=\"350\" y=\"107\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">new Constructor() → this = new instance</text><text x=\"350\" y=\"122\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">const obj = new Person('Alice'); // this = Person instance</text><line x1=\"350\" y1=\"130\" x2=\"350\" y2=\"145\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"145\" width=\"420\" height=\"65\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"167\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"bold\">2. Explicit Binding (call, apply, bind)</text><text x=\"350\" y=\"187\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">fn.call(obj) / fn.apply(obj) / fn.bind(obj) → this = obj</text><text x=\"350\" y=\"202\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">greet.call(alice, 'Hello'); // this = alice</text><line x1=\"350\" y1=\"210\" x2=\"350\" y2=\"225\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"225\" width=\"420\" height=\"65\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"247\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"14\" font-weight=\"bold\">3. Implicit Binding (Method Call)</text><text x=\"350\" y=\"267\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">obj.method() → this = obj</text><text x=\"350\" y=\"282\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">user.getName(); // this = user</text><line x1=\"350\" y1=\"290\" x2=\"350\" y2=\"305\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"305\" width=\"420\" height=\"65\" rx=\"6\" fill=\"url(#g1)\" stroke=\"#aaa\" stroke-width=\"1.5\" stroke-dasharray=\"4\"/><text x=\"350\" y=\"327\" text-anchor=\"middle\" fill=\"#aaa\" font-size=\"14\" font-weight=\"bold\">4. Default Binding (Lowest Priority)</text><text x=\"350\" y=\"347\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"12\">standalone fn() → this = window (or undefined in strict)</text><text x=\"350\" y=\"362\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">function foo() { console.log(this); } foo();</text><text x=\"350\" y=\"410\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"12\">Arrow functions: ignore all 4 rules — use lexical (enclosing) this</text><text x=\"350\" y=\"445\" text-anchor=\"middle\" fill=\"#888\" font-size=\"11\">const arrow = () => console.log(this); // this comes from outer scope</text></svg>",

  "codeExamples": [
    {
      "title": "Default vs Implicit Binding",
      "useCase": "Understanding Call Context",
      "code": "function showThis() {\n  console.log(this);\n}\n\nconst obj = {\n  name: 'My Object',\n  show: showThis\n};\n\nshowThis();      // window (default binding)\nobj.show();      // { name: 'My Object', show: ... } (implicit binding)\n\nconst detached = obj.show;\ndetached();      // window again! (lost implicit binding)",
      "description": "The same function behaves differently depending on how it is called. obj.show() gives implicit binding, but assigning it to a variable and calling it standalone reverts to default binding."
    },
    {
      "title": "Explicit Binding with call and apply",
      "useCase": "Borrowing Methods",
      "code": "const alice = { name: 'Alice' };\nconst bob   = { name: 'Bob' };\n\nfunction greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\n\nconsole.log(greet.call(alice, 'Hello', '!'));  // 'Hello, Alice!'\nconsole.log(greet.apply(bob, ['Hi', '?']));    // 'Hi, Bob?'\n\n// Borrow array methods from objects:\nconst args = { 0: 'a', 1: 'b', length: 2 };\nconsole.log(Array.prototype.slice.call(args, 0)); // ['a', 'b']",
      "description": "call and apply let you explicitly set 'this' to any value. call takes arguments spread out, apply takes them as an array. This is useful for borrowing methods."
    },
    {
      "title": "Permanent Binding with bind",
      "useCase": "Creating Bound Functions",
      "code": "const alice = { name: 'Alice' };\n\nfunction introduce(title) {\n  return `${title} ${this.name}`;\n}\n\nconst boundIntroduce = introduce.bind(alice);\n\nconsole.log(boundIntroduce('Dr.'));      // 'Dr. Alice'\nconsole.log(boundIntroduce('Prof.'));    // 'Prof. Alice'\n\n// Even call can't change a bound function's 'this':\nconsole.log(boundIntroduce.call({ name: 'Bob' }, 'Ms.')); // 'Ms. Alice' (ignored!)",
      "description": "bind returns a new function with 'this' permanently locked. Even calling call() or apply() on a bound function cannot change its 'this'."
    },
    {
      "title": "Arrow Functions and Lexical this",
      "useCase": "Preserving Context in Callbacks",
      "code": "function Timer() {\n  this.seconds = 0;\n\n  // Regular function loses 'this'\n  setInterval(function() {\n    this.seconds++; // this = window (wrong!)\n  }, 1000);\n\n  // Arrow function preserves 'this' from the enclosing scope\n  setInterval(() => {\n    this.seconds++; // this = Timer instance (correct!)\n  }, 1000);\n}\n\nconst t = new Timer();\n// After 3 seconds, t.seconds = 3 (only the arrow version works)",
      "description": "Arrow functions inherit 'this' from their definition scope. In a constructor, the arrow function captures 'this' (the new instance), while a regular function would get the global object."
    },
    {
      "title": "new Binding in Constructors",
      "useCase": "Creating Instances",
      "code": "function Car(make, model) {\n  // 'this' is a brand new object (created by 'new')\n  this.make = make;\n  this.model = model;\n  this.isRunning = false;\n\n  // If you forget 'new', 'this' becomes window!\n  // this.make = make would set window.make!\n}\n\nconst car1 = new Car('Toyota', 'Camry');\nconsole.log(car1.make);   // 'Toyota'\nconsole.log(car1.model);  // 'Camry'\n\n// Without 'new' (DANGER):\nconst car2 = Car('Honda', 'Civic'); // sets window.make, returns undefined\nconsole.log(car2); // undefined",
      "description": "With 'new', 'this' is the new instance. Without 'new', 'this' is the global object, and the function returns undefined. This is why class syntax enforces the use of 'new'."
    }
  ],

  "mcqQuestions": [
    {
      "question": "What will the following log? const obj = { x: 10, getX: function() { return this.x; } }; console.log(obj.getX());",
      "options": ["undefined", "10", "window.x", "ReferenceError"],
      "answer": 1,
      "explanation": "obj.getX() is a method call, so 'this' is bound to obj via implicit binding. obj.x is 10."
    },
    {
      "question": "What will the following log? const obj = { x: 10, getX: () => { return this.x; } }; console.log(obj.getX());",
      "options": ["10", "undefined", "window.x", "TypeError"],
      "answer": 1,
      "explanation": "Arrow functions do not have their own 'this'. They inherit 'this' from the outer lexical scope, which is the global scope (or module scope). this.x is undefined."
    },
    {
      "question": "In strict mode, what is the value of 'this' in a standalone function call?",
      "options": ["window", "global", "undefined", "null"],
      "answer": 2,
      "explanation": "In strict mode, default binding sets 'this' to undefined instead of the global object, preventing accidental global variable creation."
    },
    {
      "question": "What will the following log? function Foo() { this.val = 1; } const f = Foo(); console.log(f);",
      "options": ["undefined", "1", "Foo { val: 1 }", "window.val"],
      "answer": 0,
      "explanation": "Without 'new', Foo() is a standalone call. 'this' is the global object (or undefined in strict), and the function returns undefined. 'f' is undefined."
    },
    {
      "question": "Which of the following has the highest 'this' binding priority?",
      "options": ["Default binding", "Implicit binding (method call)", "new binding", "Explicit binding (call/apply)"],
      "answer": 2,
      "explanation": "new binding has the highest priority. If a function is called with 'new', 'this' is always the new instance, regardless of other rules."
    },
    {
      "question": "What will the following log? const obj = { name: 'obj', greet: function() { return function() { console.log(this.name); }; } }; obj.greet()();",
      "options": ["'obj'", "undefined", "window.name", "TypeError"],
      "answer": 2,
      "explanation": "obj.greet() returns a regular function. When that function is called standalone (the second ()), 'this' defaults to the global object. In a browser, window.name is often an empty string."
    },
    {
      "question": "How can you fix the callback 'this' problem in setTimeout?",
      "options": ["Use a string instead of a function", "Use an arrow function or .bind()", "Set timeout's this parameter", "It cannot be fixed"],
      "answer": 1,
      "explanation": "Arrow functions capture 'this' lexically. Alternatively, .bind(this) on the callback creates a bound function with the correct 'this'."
    },
    {
      "question": "What will be logged? const obj = { a: 1, b: function() { console.log(this.a); } }; const bRef = obj.b; bRef();",
      "options": ["1", "undefined", "window.a", "TypeError"],
      "answer": 1,
      "explanation": "bRef is called as a standalone function, not as a method on obj. Default binding applies, and 'this' is the global object. In strict mode, it would be undefined."
    },
    {
      "question": "Can you change the 'this' of an arrow function using .call()?",
      "options": ["Yes, .call() works on all functions", "No, arrow functions ignore the first argument of .call()", "Only if the arrow function is not strict", "It depends on the JavaScript engine"],
      "answer": 1,
      "explanation": "Arrow functions do not have their own 'this'. They capture it from the enclosing scope. .call(), .apply(), and .bind() all ignore the 'thisArg' parameter for arrow functions."
    },
    {
      "question": "What will the following log? const obj = { x: 10 }; function fn() { console.log(this.x); } const bound = fn.bind(obj); bound.call({ x: 20 });",
      "options": ["10", "20", "undefined", "TypeError"],
      "answer": 0,
      "explanation": "bind() creates a new function with 'this' permanently set to obj. Calling .call() on a bound function cannot change its 'this' — it remains obj, so this.x is 10."
    }
  ]
}
;

// Total topics: 20
