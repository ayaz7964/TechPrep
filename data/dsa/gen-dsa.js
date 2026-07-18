const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 300, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: Arrays =================== */
addTopic('dsa-arrays', 'Arrays', 'beginner', 20,
  ['Arrays store elements in contiguous memory with O(1) random access by index.',
   'Static arrays have fixed size; dynamic arrays (like JavaScript arrays, ArrayList) resize automatically.',
   'Insertion/deletion at end is O(1) amortized; insertion/deletion at beginning or middle is O(n) due to shifting.',
   'Key operations: access O(1), search O(n), insertion O(n), deletion O(n).'
  ],
  'An array is like a row of lockers numbered 0, 1, 2, 3... Each locker holds one item. You open locker #3 instantly because you know its exact position. But if you want to add a new locker at the front, you must shift every locker\'s contents down one position.',
  [
    d('Static vs Dynamic Arrays', 'Static arrays are allocated with a fixed size at creation (C, C++, Java). Dynamic arrays (ArrayList, vector, JavaScript/Python lists) start with a capacity and grow by doubling when full. Growth is O(n) but amortized over n insertions gives O(1) average. The growth factor is commonly 2x (Java) or 1.5x (C++).'),
    d('Memory Layout', 'Array elements are stored in contiguous memory addresses. Element at index i is at address: base + i * elementSize. This enables O(1) random access. Cache locality is excellent since adjacent elements are stored together \u2014 modern CPUs load cache lines (64 bytes) of sequential memory.'),
    d('Time Complexity Analysis', 'Access by index: O(1). Search (unsorted): O(n). Search (sorted, binary search): O(log n). Insert at end: O(1) amortized. Insert at beginning/middle: O(n). Delete at end: O(1). Delete at beginning/middle: O(n). The O(n) operations make arrays poor for frequent insertions/deletions at arbitrary positions.'),
    d('Applications', 'Storing ordered data (lists, sequences). Matrix computations (2D arrays). Implementation of other data structures (heaps use arrays for complete binary trees). Buffer/queue with circular array. Lookup tables. Dynamic programming tabulation. Sorting algorithms (quicksort, mergesort) operate on arrays.')
  ],
  'Arrays are the most fundamental data structure. Master O(1) random access and understand the cost of insertions/deletions. Use arrays when you need fast access by index and mainly append operations. For frequent insertions in the middle, consider linked lists. For search-heavy workloads, sort and use binary search or use a hash table.',
  [
    q('What is the time complexity of array access by index?', 'O(1) \u2014 direct memory address calculation.'),
    q('What is the time complexity of searching an unsorted array?', 'O(n) \u2014 linear search through all elements.'),
    q('What is the growth factor of dynamic arrays?', 'Typically 2x (Java ArrayList) or 1.5x (C++ vector).'),
    q('Why are arrays cache-friendly?', 'Contiguous memory layout \u2014 adjacent elements are loaded together in CPU cache lines.'),
    q('What is the amortized insertion cost at end of dynamic array?', 'O(1) \u2014 occasional O(n) resize is spread across n insertions.'),
    q('What is worst-case insertion cost at beginning of array?', 'O(n) \u2014 all elements must shift right by one position.'),
    q('What is the address formula for array element at index i?', 'baseAddress + i * elementSize.'),
    q('What data structure uses arrays for complete binary trees?', 'Heaps (binary heaps use array indexing: left child at 2i+1, right at 2i+2).'),
    q('What is the time complexity of binary search on sorted array?', 'O(log n).'),
    q('When should you NOT use an array?', 'When you need frequent insertions/deletions in the middle \u2014 use a linked list instead.')
  ],
  R(10,35,100,25,'#0070f3','','Index 0','Element A') +
  R(10,65,100,25,'#28a745','','Index 1','Element B') +
  R(10,95,100,25,'#ffc107','','Index 2','Element C') +
  R(10,125,100,25,'#dc3545','','Index 3','Element D') +
  R(10,155,100,25,'#e83e8c','','Index 4','Element E') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','Array (Contiguous Memory)','O(1) access by index. Static: fixed size. Dynamic: auto-resizing.') +
  T(240,220,'Arrays: Contiguous memory, O(1) index access, O(n) insert/delete at arbitrary positions.',9,'#666','middle'),
  [
    e('Dynamic Array (JavaScript)', 'Auto-resizing array implementation.', codeBlock([
      'class DynamicArray {',
      '  constructor(capacity = 4) {',
      '    this.capacity = capacity;',
      '    this.length = 0;',
      '    this.data = new Array(capacity);',
      '  }',
      '',
      '  get(index) {',
      '    if (index < 0 || index >= this.length)',
      '      throw new Error("Index out of bounds");',
      '    return this.data[index];',
      '  }',
      '',
      '  push(element) {',
      '    if (this.length === this.capacity)',
      '      this._resize(this.capacity * 2);',
      '    this.data[this.length++] = element;',
      '  }',
      '',
      '  _resize(newCapacity) {',
      '    const newData = new Array(newCapacity);',
      '    for (let i = 0; i < this.length; i++)',
      '      newData[i] = this.data[i];',
      '    this.data = newData;',
      '    this.capacity = newCapacity;',
      '  }',
      '}'
    ]), 'Dynamic array with doubling resize strategy \u2014 amortized O(1) push.'),
    e('Two Sum (Hash Map)', 'Classic array problem using hash map.', codeBlock([
      'function twoSum(nums, target) {',
      '  const map = new Map();',
      '  for (let i = 0; i < nums.length; i++) {',
      '    const complement = target - nums[i];',
      '    if (map.has(complement))',
      '      return [map.get(complement), i];',
      '    map.set(nums[i], i);',
      '  }',
      '  return [];',
      '}'
    ]), 'Two Sum \u2014 O(n) using hash map for complement lookup.'),
    e('Rotate Array (Reversal)', 'Rotate array k steps to the right.', codeBlock([
      'function rotate(nums, k) {',
      '  k = k % nums.length;',
      '  reverse(nums, 0, nums.length - 1);',
      '  reverse(nums, 0, k - 1);',
      '  reverse(nums, k, nums.length - 1);',
      '}',
      '',
      'function reverse(arr, start, end) {',
      '  while (start < end) {',
      '    [arr[start], arr[end]] = [arr[end], arr[start]];',
      '    start++; end--;',
      '  }',
      '}'
    ]), 'Rotate array in O(n) time and O(1) space using three reversals.'),
    e('Maximum Subarray (Kadane)', 'Find contiguous subarray with max sum.', codeBlock([
      'function maxSubArray(nums) {',
      '  let maxEndingHere = nums[0];',
      '  let maxSoFar = nums[0];',
      '  for (let i = 1; i < nums.length; i++) {',
      '    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);',
      '    maxSoFar = Math.max(maxSoFar, maxEndingHere);',
      '  }',
      '  return maxSoFar;',
      '}'
    ]), 'Kadane\'s algorithm \u2014 O(n) time, O(1) space for maximum subarray sum.'),
    e('Merge Sorted Arrays (Two Pointers)', 'Merge two sorted arrays in O(m+n).', codeBlock([
      'function mergeSorted(nums1, m, nums2, n) {',
      '  let i = m - 1, j = n - 1, k = m + n - 1;',
      '  while (i >= 0 && j >= 0) {',
      '    if (nums1[i] > nums2[j]) nums1[k--] = nums1[i--];',
      '    else nums1[k--] = nums2[j--];',
      '  }',
      '  while (j >= 0) nums1[k--] = nums2[j--];',
      '}'
    ]), 'Merge two sorted arrays from the end using two pointers avoids overwriting.')
  ],
  [
    m('What is the time complexity of accessing an array by index?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 0, 'Array access by index is O(1) \u2014 direct memory address calculation.'),
    m('What is the amortized time complexity of push() on a dynamic array?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 0, 'Amortized O(1) \u2014 occasional O(n) resize is spread across n insertions.'),
    m('What technique finds the max subarray sum in O(n)?', ['Binary search', 'Kadane\'s algorithm', 'Divide and conquer', 'Two pointers'], 1, 'Kadane\'s algorithm finds the maximum subarray sum in O(n) time, O(1) space.'),
    m('Why are arrays cache-friendly?', ['They use less memory', 'Contiguous memory improves cache locality', 'They are dynamically sized', 'They support binary search'], 1, 'Contiguous memory layout means adjacent elements are loaded together in CPU cache lines.'),
    m('What is the formula for element address at index i?', ['base + i * 8', 'base + i * elementSize', 'base * i + elementSize', 'base + elementSize^i'], 1, 'Element address = baseAddress + i * elementSize.'),
    m('What is the worst-case time for inserting at the beginning of an array?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 2, 'Inserting at the beginning requires shifting all existing elements \u2014 O(n).')
  ]
);

/* =================== TOPIC 2: Linked Lists =================== */
addTopic('dsa-linked-lists', 'Linked Lists', 'beginner', 20,
  ['A linked list is a linear data structure where elements (nodes) are connected via pointers, not stored contiguously.',
   'Singly linked: each node has data + next pointer. Doubly linked: each node has prev + next pointers.',
   'Insertion/deletion at head is O(1). No random access \u2014 must traverse from head to find an element (O(n)).',
   'Linked lists excel at frequent insertions/deletions but have poor cache locality due to scattered memory allocation.'
  ],
  'A linked list is like a treasure hunt. Each clue (node) tells you where to find the next clue. To find the 5th clue, you must follow clues 1, 2, 3, and 4. But adding a new clue between two existing ones is easy \u2014 just change where the previous clue points.',
  [
    d('Singly vs Doubly Linked', 'Singly linked: each node has data and next pointer. Traversal is one direction only (head to tail). Doubly linked: nodes have prev and next pointers. Traversal both directions. Doubly uses more memory (extra pointer per node) but enables O(1) deletion at tail and reverse traversal.'),
    d('Time Complexity', 'Insert at head: O(1). Insert at tail (if tail pointer): O(1). Insert in middle: O(n) to find position + O(1) to link. Delete at head: O(1). Delete at tail (singly): O(n). Delete at tail (doubly): O(1). Search: O(n). Access by index: O(n).'),
    d('Memory Overhead', 'Each node stores data + 1 or 2 pointers. For integers, overhead can be 200-400%. Poor cache locality: nodes are heap-allocated, scattered across memory. Iteration is slower than array iteration due to pointer chasing and cache misses.'),
    d('Applications', 'Implementation of stacks and queues. Undo functionality in editors (doubly linked list). LRU cache (doubly linked list + hash map). Polynomial arithmetic. Adjacency list representation of graphs. Memory allocators (free lists).')
  ],
  'Linked lists are ideal when you need frequent insertions/deletions and don\'t need random access. The trade-off: O(n) access vs arrays\' O(1) access. In practice, arrays are often faster due to cache locality. Doubly linked lists are preferred for the ability to delete from tail and traverse backwards.',
  [
    q('What is the time complexity of inserting at the head of a linked list?', 'O(1) \u2014 just update the head pointer.'),
    q('What is the time complexity of searching a linked list?', 'O(n) \u2014 must traverse from head.'),
    q('What are the two types of linked lists?', 'Singly linked (one direction) and doubly linked (both directions).'),
    q('Why are linked lists not cache-friendly?', 'Nodes are heap-allocated non-contiguously \u2014 pointer chasing causes cache misses.'),
    q('What data structure can be implemented with a linked list?', 'Stack and Queue.'),
    q('What is Floyd\'s cycle detection algorithm?', 'Two pointers (slow and fast). If they meet, there is a cycle. O(n) time, O(1) space.'),
    q('How do you reverse a singly linked list?', 'Iterate with prev, current, next pointers \u2014 O(n) time, O(1) space.'),
    q('What is the advantage of doubly linked over singly?', 'O(1) deletion at tail, reverse traversal, easier node deletion given only the node reference.'),
    q('What is an LRU cache?', 'Most recently used items are at head. Doubly linked list + hash map for O(1) operations.'),
    q('What is the memory overhead of a singly linked node?', 'Data + next pointer. For integers, ~200% overhead.')
  ],
  R(10,35,110,25,'#0070f3','','Head','Data | next') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Node A','Data | next') +
  A(270,48,300,48) +
  R(310,35,110,25,'#ffc107','','Node B','Data | next') +
  A(310,60,310,80) +
  R(10,70,110,25,'#dc3545','','Tail','Data | null') +
  R(10,100,110,25,'#e83e8c','','Insert Head','O(1)') +
  R(10,130,110,25,'#6610f2','','Delete Head','O(1)') +
  R(10,160,110,25,'#17a2b8','','Search','O(n)') +
  R(310,70,140,115,'#17a2b8','','Linked List','Linear structure with pointers. O(1) insert/delete at head. O(n) access.') +
  T(240,220,'Linked Lists: Nodes connected by pointers. Good for frequent insert/delete, poor random access.',9,'#666','middle'),
  [
    e('Singly Linked List', 'Basic operations.', codeBlock([
      'class ListNode { constructor(val) { this.val = val; this.next = null; } }',
      'class LinkedList {',
      '  constructor() { this.head = null; }',
      '  prepend(val) { const n = new ListNode(val); n.next = this.head; this.head = n; }',
      '  delete(val) {',
      '    if (!this.head) return;',
      '    if (this.head.val === val) { this.head = this.head.next; return; }',
      '    let curr = this.head;',
      '    while (curr.next && curr.next.val !== val) curr = curr.next;',
      '    if (curr.next) curr.next = curr.next.next;',
      '  }',
      '}'
    ]), 'Singly linked list with prepend (O(1)) and delete (O(n)).'),
    e('Reverse Linked List', 'Iterative reversal.', codeBlock([
      'function reverseList(head) {',
      '  let prev = null, curr = head;',
      '  while (curr) {',
      '    const next = curr.next; curr.next = prev;',
      '    prev = curr; curr = next;',
      '  }',
      '  return prev;',
      '}'
    ]), 'Reverse linked list in O(n) time, O(1) space.'),
    e('Detect Cycle (Floyd)', 'Cycle detection.', codeBlock([
      'function hasCycle(head) {',
      '  let slow = head, fast = head;',
      '  while (fast && fast.next) {',
      '    slow = slow.next; fast = fast.next.next;',
      '    if (slow === fast) return true;',
      '  }',
      '  return false;',
      '}'
    ]), 'Floyd cycle detection O(n) time O(1) space.'),
    e('Find Middle', 'Fast/slow pointer.', codeBlock([
      'function middleNode(head) {',
      '  let slow = head, fast = head;',
      '  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }',
      '  return slow;',
      '}'
    ]), 'Find middle in one pass.'),
    e('Merge Two Sorted Lists', 'Iterative merge.', codeBlock([
      'function mergeTwoLists(l1, l2) {',
      '  const dummy = new ListNode(0); let curr = dummy;',
      '  while (l1 && l2) {',
      '    if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }',
      '    else { curr.next = l2; l2 = l2.next; }',
      '    curr = curr.next;',
      '  }',
      '  curr.next = l1 || l2; return dummy.next;',
      '}'
    ]), 'Merge sorted lists O(n+m).')
  ],
  [
    m('What is insert time at head of linked list?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 0, 'O(1) \u2014 just update head pointer.'),
    m('What is search time in linked list?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 2, 'Search requires traversal O(n).'),
    m('Why linked lists not cache-friendly?', ['Too many nodes', 'Non-contiguous memory', 'Excessive memory', 'Dynamic'], 1, 'Non-contiguous heap-allocated nodes cause cache misses.'),
    m('Which algorithm detects cycle O(1) space?', ['Binary search', 'Floyd algorithm', 'BFS', 'DFS'], 1, 'Floyd uses slow/fast pointers.'),
    m('Advantage of doubly linked?', ['Less memory', 'Reverse traversal + O(1) tail delete', 'Faster search', 'Cache-friendly'], 1, 'Doubly linked enables reverse traversal and O(1) tail deletion.'),
    m('What uses linked list + hash map for O(1)?', ['Stack', 'Queue', 'LRU cache', 'Heap'], 2, 'LRU cache uses doubly linked list + hash map.')
  ]
);

/* =================== TOPIC 3: Stacks =================== */
addTopic('dsa-stacks', 'Stacks', 'beginner', 15,
  ['A stack is a linear data structure following LIFO (Last In, First Out) principle.',
   'Primary operations: push, pop, peek. All O(1).',
   'Can be implemented with arrays (cache-friendly) or linked lists (dynamic size).',
   'Underflow: popping from empty stack. Overflow: pushing beyond capacity (array-based).'
  ],
  'A stack is like a stack of plates. You add a clean plate on top (push). You take a plate from the top (pop). You can look at the top plate without removing it (peek). The first plate placed at the bottom is the last one you use \u2014 LIFO.',
  [
    d('Stack Operations', 'push(item): add to top. pop(): remove and return top. peek(): view top without removing. isEmpty(): check if empty. All O(1).'),
    d('Array vs Linked List', 'Array-based: contiguous memory, cache-friendly, fixed capacity. Linked-list-based: each push creates a new node, no capacity limit, more memory overhead.'),
    d('Applications', 'Function call stack (recursion). Expression evaluation (postfix). Syntax parsing (brackets). Undo/Redo. Back/Forward in browser. DFS algorithm.'),
    d('Call Stack and Recursion', 'Every function call pushes a stack frame. Recursion creates multiple frames. Stack overflow when recursion depth exceeds available memory.')
  ],
  'Stacks are simple but powerful. LIFO makes them ideal for nested structures and reverse operations. Array-based stacks are more efficient. Use stacks for expression parsing, undo functionality, and DFS traversal.',
  [
    q('What does LIFO stand for?', 'Last In, First Out.'),
    q('What are the three primary stack operations?', 'Push, Pop, Peek. All O(1).'),
    q('How can stacks be implemented?', 'Array-based or linked-list-based.'),
    q('What is stack underflow?', 'Attempting to pop from an empty stack.'),
    q('What is a classic stack application?', 'Matching parentheses / validating brackets.'),
    q('What is a call stack?', 'Stack of function call frames managed by the runtime.'),
    q('What causes stack overflow?', 'Excessive recursion depth or infinite recursion.'),
    q('How to convert infix to postfix?', 'Shunting Yard algorithm using a stack.'),
    q('What does undo feature use?', 'Two stacks: undo and redo stacks.'),
    q('What is the space complexity of a stack with n elements?', 'O(n).')
  ],
  R(10,35,100,30,'#0070f3','','Top','peek()') +
  R(10,70,100,25,'#28a745','','Item 3','') +
  R(10,100,100,25,'#ffc107','','Item 2','') +
  R(10,130,100,25,'#dc3545','','Item 1','') +
  R(10,160,100,25,'#e83e8c','','Bottom','') +
  A(110,50,140,50) +
  R(150,35,120,150,'#17a2b8','','Stack (LIFO)','Push/Pop/Peek O(1)') +
  T(240,220,'Stack: LIFO. O(1) push/pop/peek. Recursion, parsing, DFS.',9,'#666','middle'),
  [
    e('Array-Based Stack', 'Simple stack implementation.', codeBlock([
      'class Stack {',
      '  constructor() { this.items = []; }',
      '  push(item) { this.items.push(item); }',
      '  pop() { return this.items.length ? this.items.pop() : null; }',
      '  peek() { return this.items.length ? this.items[this.items.length - 1] : null; }',
      '  isEmpty() { return this.items.length === 0; }',
      '}'
    ]), 'Array-based stack O(1) amortized.'),
    e('Valid Parentheses', 'Balanced brackets using stack.', codeBlock([
      'function isValid(s) {',
      '  const stack = [];',
      "  const map = {')':'(', '}':'{', ']':'['};",
      '  for (const c of s) {',
      "    if ('({['.includes(c)) stack.push(c);",
      '    else if (stack.pop() !== map[c]) return false;',
      '  }',
      '  return stack.length === 0;',
      '}'
    ]), 'O(n) time using stack for bracket matching.'),
    e('Min Stack', 'Get minimum in O(1).', codeBlock([
      'class MinStack {',
      '  constructor() { this.stack = []; this.minStack = []; }',
      '  push(val) {',
      '    this.stack.push(val);',
      '    if (!this.minStack.length || val <= this.minStack[this.minStack.length-1])',
      '      this.minStack.push(val);',
      '  }',
      '  pop() {',
      '    const v = this.stack.pop();',
      '    if (v === this.minStack[this.minStack.length-1]) this.minStack.pop();',
      '    return v;',
      '  }',
      '  getMin() { return this.minStack[this.minStack.length-1]; }',
      '}'
    ]), 'Auxiliary min stack for O(1) min retrieval.'),
    e('Daily Temperatures', 'Monotonic stack.', codeBlock([
      'function dailyTemperatures(t) {',
      '  const n = t.length, res = new Array(n).fill(0), stack = [];',
      '  for (let i = 0; i < n; i++) {',
      '    while (stack.length && t[i] > t[stack[stack.length-1]]) {',
      '      const j = stack.pop(); res[j] = i - j;',
      '    }',
      '    stack.push(i);',
      '  }',
      '  return res;',
      '}'
    ]), 'Monotonic stack O(n) for next greater element.'),
    e('Evaluate Postfix', 'Postfix expression evaluation.', codeBlock([
      'function evalPostfix(expr) {',
      '  const stack = [];',
      '  for (const token of expr.split(" ")) {',
      '    if (!isNaN(token)) { stack.push(Number(token)); }',
      '    else {',
      '      const b = stack.pop(), a = stack.pop();',
      '      if (token === "+") stack.push(a + b);',
      '      else if (token === "-") stack.push(a - b);',
      '      else if (token === "*") stack.push(a * b);',
      '      else if (token === "/") stack.push(a / b);',
      '    }',
      '  }',
      '  return stack.pop();',
      '}'
    ]), 'Postfix evaluation using stack O(n).')
  ],
  [
    m('What does LIFO stand for?', ['Last In, First Out', 'First In, First Out', 'Last In, Last Out', 'First In, Last Out'], 0, 'LIFO = Last In, First Out.'),
    m('Time complexity of stack push/pop?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 0, 'Both O(1).'),
    m('Data structure used for recursion?', ['Queue', 'Stack', 'Tree', 'Heap'], 1, 'Call stack manages recursion.'),
    m('MinStack uses what auxiliary structure?', ['Max stack', 'Min stack', 'Sorted stack', 'Hash stack'], 1, 'Auxiliary min stack tracks minimums.'),
    m('Pop from empty stack causes?', ['Null return', 'Stack overflow', 'Stack underflow', 'Undefined'], 2, 'Stack underflow.'),
    m('Monotonic stack primarily solves?', ['Next greater element', 'Sorting', 'Searching', 'Path finding'], 0, 'Next greater/smaller element problems.')
  ]
);

/* =================== TOPIC 4: Queues =================== */
addTopic('dsa-queues', 'Queues', 'beginner', 15,
  ['A queue follows FIFO (First In, First Out) principle.',
   'Enqueue (add to rear), Dequeue (remove from front), Peek. O(1).',
   'Array-based (circular buffer) or linked-list-based.',
   'JavaScript array.shift() is O(n) \u2014 use a proper queue implementation.'
  ],
  'A queue is like a line at a coffee shop. People join at the back (enqueue). The person at the front gets served and leaves (dequeue). First come, first served \u2014 FIFO.',
  [
    d('FIFO Principle', 'First In, First Out. Add at rear, remove from front. Opposite of stack (LIFO).'),
    d('Circular Buffer', 'Fixed-size array with front/rear pointers. Wraps around using modulo. O(1) but fixed capacity.'),
    d('Linked List Queue', 'Head = front, Tail = rear. O(1) enqueue/dequeue. No capacity limit. More memory overhead.'),
    d('Applications', 'BFS, task scheduling, request queuing, message queues, I/O buffering, printer spooling.')
  ],
  'Queues are fundamental for FIFO processing. Use circular buffer for bounded queues. Linked-list for unbounded. BFS requires a queue. Deque (double-ended queue) allows O(1) at both ends.',
  [
    q('What does FIFO stand for?', 'First In, First Out.'),
    q('What are the two primary queue operations?', 'Enqueue (rear) and Dequeue (front). O(1).'),
    q('Why not use array.shift() for dequeue?', 'shift() is O(n) \u2014 all elements shift left.'),
    q('What is a circular buffer?', 'Fixed-size array with modulo wrapping front/rear pointers.'),
    q('What algorithm uses a queue?', 'BFS (Breadth-First Search).'),
    q('What is a deque?', 'Double-ended queue \u2014 O(1) operations at both ends.'),
    q('Time complexity of enqueue/dequeue?', 'O(1).'),
    q('What is a priority queue?', 'Elements have priority; typically heap-based.'),
    q('How are queues used in OS?', 'Process scheduling, I/O buffering, message passing.'),
    q('Linked list queue pointers?', 'Head = front (dequeue), Tail = rear (enqueue).')
  ],
  R(10,35,110,25,'#0070f3','','Front','dequeue()') +
  R(10,65,110,25,'#28a745','','Item A','') +
  R(10,95,110,25,'#ffc107','','Item B','') +
  R(10,125,110,25,'#dc3545','','Item C','') +
  R(10,155,110,25,'#e83e8c','','Rear','enqueue()') +
  A(120,83,150,83) +
  R(160,35,130,150,'#17a2b8','','Queue (FIFO)','Enqueue rear, Dequeue front') +
  T(240,220,'Queue: FIFO. O(1) enqueue/dequeue. BFS.',9,'#666','middle'),
  [
    e('Linked List Queue', 'O(1) enqueue/dequeue.', codeBlock([
      'class Queue {',
      '  constructor() { this.front = null; this.rear = null; }',
      '  enqueue(val) {',
      '    const n = {val, next: null};',
      '    if (!this.front) this.front = n; else this.rear.next = n;',
      '    this.rear = n;',
      '  }',
      '  dequeue() {',
      '    if (!this.front) return null;',
      '    const v = this.front.val;',
      '    this.front = this.front.next;',
      '    if (!this.front) this.rear = null; return v;',
      '  }',
      '}'
    ]), 'Linked list queue with front/rear O(1).'),
    e('Circular Array Queue', 'Fixed capacity O(1).', codeBlock([
      'class CircularQueue {',
      '  constructor(cap) { this.data = new Array(cap); this.cap = cap; this.front = 0; this.size = 0; }',
      '  enqueue(val) {',
      '    if (this.size === this.cap) return false;',
      '    this.data[(this.front + this.size) % this.cap] = val;',
      '    this.size++; return true;',
      '  }',
      '  dequeue() {',
      '    if (!this.size) return null;',
      '    const v = this.data[this.front];',
      '    this.front = (this.front+1) % this.cap; this.size--; return v;',
      '  }',
      '}'
    ]), 'O(1) with modulo wrapping.'),
    e('BFS Level Order', 'Queue-based tree traversal.', codeBlock([
      'function levelOrder(root) {',
      '  if (!root) return [];',
      '  const q = [root], res = [];',
      '  while (q.length) {',
      '    const len = q.length, lvl = [];',
      '    for (let i = 0; i < len; i++) {',
      '      const n = q.shift(); lvl.push(n.val);',
      '      if (n.left) q.push(n.left);',
      '      if (n.right) q.push(n.right);',
      '    }',
      '    res.push(lvl);',
      '  }',
      '  return res;',
      '}'
    ]), 'O(n) BFS using queue.'),
    e('Deque (Double-Ended Queue)', 'O(1) both ends.', codeBlock([
      'class Deque {',
      '  constructor() { this.items = {}; this.front = 0; this.rear = 0; }',
      '  addFront(val) { this.items[--this.front] = val; }',
      '  addRear(val) { this.items[this.rear++] = val; }',
      '  removeFront() {',
      '    if (this.front === this.rear) return null;',
      '    const v = this.items[this.front]; delete this.items[this.front++]; return v;',
      '  }',
      '  removeRear() {',
      '    if (this.front === this.rear) return null;',
      '    const v = this.items[--this.rear]; delete this.items[this.rear]; return v;',
      '  }',
      '}'
    ]), 'Deque O(1) operations both ends.')
  ],
  [
    m('What does FIFO mean?', ['First In, First Out', 'Last In, First Out', 'First In, Last Out', 'Fast Input Output'], 0, 'FIFO.'),
    m('Time of enqueue/dequeue?', ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], 2, 'O(1).'),
    m('Algorithm using queue?', ['DFS', 'BFS', 'Binary search', 'Quick sort'], 1, 'BFS uses queue.'),
    m('Why not array.shift() for queue?', ['O(n) shifts all elements', 'O(1) but slow', 'Cannot use', 'Mutates array'], 0, 'O(n) because all elements shift.'),
    m('Circular buffer used for?', ['Resizing arrays', 'O(1) fixed-capacity queue', 'Tree traversal', 'Sorting'], 1, 'O(1) fixed-capacity queue.'),
    m('What is deque?', ['Single-ended queue', 'Double-ended queue', 'Priority queue', 'Blocking queue'], 1, 'Double-ended queue.')
  ]
);

/* =================== TOPIC 5: Hash Tables =================== */
addTopic('dsa-hash-tables', 'Hash Tables', 'intermediate', 20,
  ['Hash tables store key-value pairs with O(1) average-time insert, delete, and search.',
   'A hash function maps keys to array indices. Collisions are handled by chaining or open addressing.',
   'Load factor = n/m (entries/slots). When load factor exceeds threshold, resize and rehash all entries.',
   'Good hash functions distribute keys uniformly. Bad hash functions cause clustering and degrade to O(n).'
  ],
  'A hash table is like a library with a magical filing system. Each book (value) has a unique ID (key). The librarian uses a formula (hash function) to instantly compute which shelf the book belongs on. If two books map to the same slot (collision), they are stacked together (chaining).',
  [
    d('Hash Function Requirements', 'Deterministic: same key always maps to same index. Uniform distribution: keys spread evenly across slots. Fast to compute. Examples: division method (key % m), multiplication method.'),
    d('Collision: Chaining', 'Each slot points to a linked list. Insert: O(1) at head. Search: traverse chain O(1 + load factor). Delete: O(1 + load factor). Worst case: all keys hash to same slot, O(n).'),
    d('Collision: Open Addressing', 'All entries stored in array slots. Probing: linear (slot+1, slot+2...), quadratic (slot+1, slot+4...), double hashing. Deletion uses tombstones. Load factor must stay below 0.7.'),
    d('Applications', 'Database indexing, caching (Redis, Memcached), symbol tables in compilers, object representation in dynamic languages, deduplication, frequency maps.')
  ],
  'Hash tables offer the best average-case performance for dictionary operations. The hash function quality and load factor are critical. Choose chaining for simpler implementation, open addressing for better cache performance. Always handle collisions. Resize when load factor exceeds threshold.',
  [
    q('What is the average time complexity of hash table operations?', 'O(1) average for insert, search, delete.'),
    q('What is a hash collision?', 'Two different keys produce the same hash index.'),
    q('What are the two main collision resolution strategies?', 'Chaining (linked list per slot) and Open addressing (probing).'),
    q('What is load factor?', 'n/m \u2014 number of entries divided by number of slots.'),
    q('When do hash tables degrade to O(n)?', 'When load factor is too high or hash function causes many collisions.'),
    q('What is a good hash function property?', 'Uniform distribution \u2014 keys spread evenly across all slots.'),
    q('What is rehashing?', 'Resizing the table and recomputing hash indices for all entries.'),
    q('What is the typical resize factor?', 'Double the table size (2x) when load factor exceeds threshold.'),
    q('What is a tombstone in open addressing?', 'A marker for deleted slots to maintain probe sequence integrity.'),
    q('What data structures use hashing internally?', 'JavaScript Maps, Python dicts, Java HashMap, Redis, database indexes.')
  ],
  R(10,35,130,25,'#0070f3','','Key "name"','Hash function') +
  A(140,48,170,48) +
  R(180,35,100,25,'#28a745','','Hash: 42','Index') +
  A(280,48,310,48) +
  R(320,35,120,25,'#ffc107','','Slot 42','["name" -> "Alice"]') +
  R(10,70,130,25,'#dc3545','','Collision!','Chain entries') +
  R(10,100,130,25,'#e83e8c','','Load Factor','n/m threshold') +
  R(10,130,130,25,'#6610f2','','Resize','Double + rehash') +
  R(320,70,120,115,'#17a2b8','','Hash Table','O(1) average. Chaining or open addressing.') +
  T(240,220,'Hash Tables: O(1) average insert/search/delete. Collisions resolved via chaining or probing.',9,'#666','middle'),
  [
    e('Hash Table with Chaining', 'Separate chaining implementation.', codeBlock([
      'class HashTable {',
      '  constructor(size = 53) { this.table = new Array(size); this.size = size; }',
      '  _hash(key) {',
      '    let hash = 0;',
      '    for (let i = 0; i < key.length; i++)',
      '      hash = (hash * 31 + key.charCodeAt(i)) % this.size;',
      '    return hash;',
      '  }',
      '  set(key, value) {',
      '    const idx = this._hash(key);',
      '    if (!this.table[idx]) this.table[idx] = [];',
      '    for (const pair of this.table[idx])',
      '      if (pair[0] === key) { pair[1] = value; return; }',
      '    this.table[idx].push([key, value]);',
      '  }',
      '  get(key) {',
      '    const idx = this._hash(key);',
      '    if (!this.table[idx]) return undefined;',
      '    for (const pair of this.table[idx])',
      '      if (pair[0] === key) return pair[1];',
      '    return undefined;',
      '  }',
      '}'
    ]), 'Hash table with separate chaining for collision resolution.'),
    e('First Non-Repeating Character', 'Counting with hash map.', codeBlock([
      'function firstNonRepeating(s) {',
      '  const freq = new Map();',
      '  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);',
      '  for (let i = 0; i < s.length; i++)',
      '    if (freq.get(s[i]) === 1) return i;',
      '  return -1;',
      '}'
    ]), 'Hash map for frequency counting O(n).'),
    e('Group Anagrams', 'Hash map with sorted key.', codeBlock([
      'function groupAnagrams(strs) {',
      '  const map = new Map();',
      '  for (const s of strs) {',
      '    const key = s.split("").sort().join("");',
      '    if (!map.has(key)) map.set(key, []);',
      '    map.get(key).push(s);',
      '  }',
      '  return Array.from(map.values());',
      '}'
    ]), 'Group anagrams O(n * k log k).'),
    e('LRU Cache', 'Hash map + doubly linked list.', codeBlock([
      'class LRUCache {',
      '  constructor(cap) { this.cap = cap; this.cache = new Map(); }',
      '  get(key) {',
      '    if (!this.cache.has(key)) return -1;',
      '    const val = this.cache.get(key);',
      '    this.cache.delete(key); this.cache.set(key, val);',
      '    return val;',
      '  }',
      '  put(key, value) {',
      '    if (this.cache.has(key)) this.cache.delete(key);',
      '    this.cache.set(key, value);',
      '    if (this.cache.size > this.cap)',
      '      this.cache.delete(this.cache.keys().next().value);',
      '  }',
      '}'
    ]), 'LRU cache using Map (insertion order) for O(1) operations.')
  ],
  [
    m('Average time complexity of hash table search?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 0, 'O(1) average.'),
    m('What resolves collisions with linked lists?', ['Chaining', 'Open addressing', 'Double hashing', 'Linear probing'], 0, 'Chaining uses linked lists at each slot.'),
    m('What is load factor?', ['n/m entries per slot', 'Hash function speed', 'Table size', 'Collision rate'], 0, 'Load factor = n/m.'),
    m('When does hash table degrade to O(n)?', ['Low load factor', 'Many collisions', 'Small table', 'Good hash function'], 1, 'Many collisions cause O(n) degradation.'),
    m('What is rehashing?', ['Resizing and recomputing hashes', 'Hashing again', 'Double hashing', 'Collision detection'], 0, 'Rehash all entries after resize.'),
    m('What marks deleted slots in open addressing?', ['Null', 'Tombstone', 'Empty marker', 'Delete flag'], 1, 'Tombstone marks deleted entries in open addressing.')
  ]
);

/* =================== TOPIC 6: Trees =================== */
addTopic('dsa-trees', 'Trees', 'intermediate', 20,
  ['A tree is a hierarchical data structure with a root node and child nodes forming parent-child relationships.',
   'Binary trees: each node has at most 2 children (left and right).',
   'Tree traversal: Preorder (root, left, right), Inorder (left, root, right), Postorder (left, right, root).',
   'Tree height: number of edges on longest path from root to leaf. Depth: number of edges from root to node.'
  ],
  'A tree is like a company org chart. The CEO (root) has VPs (children) who have directors (grandchildren) who have managers. Each person reports to exactly one parent. The org chart branches out but never has cycles.',
  [
    d('Tree Terminology', 'Root: topmost node. Leaf: node with no children. Parent: node with children. Child: node connected below parent. Subtree: a node and all descendants. Height: max edges root to leaf. Depth: edges from root to node.'),
    d('Binary Tree Types', 'Full: every node has 0 or 2 children. Complete: all levels filled except possibly last. Perfect: all internal nodes have 2 children, all leaves at same level. Balanced: height is O(log n).'),
    d('Tree Traversals', 'BFS (level order): process level by level using queue. DFS: Preorder (root, left, right), Inorder (left, root, right \u2014 sorted for BST), Postorder (left, right, root \u2014 for deletion).'),
    d('Applications', 'File systems (directory hierarchy). HTML DOM (element tree). Compilers (AST). Networking (routing trees). Databases (B-trees). Machine learning (decision trees).')
  ],
  'Trees are the foundation for hierarchical data. Binary trees are most common. Master recursion for traversal algorithms. Understand DFS vs BFS. Balanced trees keep operations O(log n). Trees are everywhere in CS \u2014 from compilers to databases.',
  [
    q('What is a tree in data structures?', 'A hierarchical structure with a root node and child nodes forming parent-child relationships.'),
    q('What is the root of a tree?', 'The topmost node with no parent.'),
    q('What is a leaf node?', 'A node with no children.'),
    q('What is tree height?', 'The number of edges on the longest path from root to a leaf.'),
    q('What is a binary tree?', 'A tree where each node has at most 2 children (left and right).'),
    q('What are the three DFS traversals?', 'Preorder (root, left, right), Inorder (left, root, right), Postorder (left, right, root).'),
    q('What traversal uses a queue?', 'BFS / Level-order traversal.'),
    q('What is a balanced tree?', 'A tree where height is O(log n) \u2014 operations remain efficient.'),
    q('Difference between tree and graph?', 'Trees are acyclic, connected graphs. Trees have exactly n-1 edges for n nodes.'),
    q('What is a subtree?', 'A node and all its descendants, which forms a tree itself.')
  ],
  R(10,35,110,25,'#0070f3','','Root','CEO') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Child A','VP Eng') +
  R(160,65,110,25,'#ffc107','','Child B','VP Sales') +
  A(120,78,160,78) +
  R(10,100,110,25,'#dc3545','','Leaf','No children') +
  R(10,130,110,25,'#e83e8c','','Height','Edges root-leaf') +
  R(10,160,110,25,'#6610f2','','Depth','Edges root-node') +
  R(300,35,180,150,'#17a2b8','','Tree','Hierarchical. Root, children, leaves.') +
  T(240,220,'Trees: Hierarchical data structure. Root, parent, child, leaf.',9,'#666','middle'),
  [
    e('Binary Tree Node', 'Basic node structure.', codeBlock([
      'class TreeNode { constructor(val) { this.val = val; this.left = null; this.right = null; } }',
      'const root = new TreeNode(1);',
      'root.left = new TreeNode(2); root.right = new TreeNode(3);',
      'root.left.left = new TreeNode(4);'
    ]), 'TreeNode class for building binary trees.'),
    e('DFS Traversals (Recursive)', 'Preorder, Inorder, Postorder.', codeBlock([
      'function preorder(root) { if (!root) return; console.log(root.val); preorder(root.left); preorder(root.right); }',
      'function inorder(root) { if (!root) return; inorder(root.left); console.log(root.val); inorder(root.right); }',
      'function postorder(root) { if (!root) return; postorder(root.left); postorder(root.right); console.log(root.val); }'
    ]), 'DFS traversals O(n) time, O(h) stack space.'),
    e('BFS (Level Order)', 'Queue-based level traversal.', codeBlock([
      'function levelOrder(root) {',
      '  if (!root) return []; const q = [root], res = [];',
      '  while (q.length) {',
      '    const len = q.length, lvl = [];',
      '    for (let i = 0; i < len; i++) {',
      '      const n = q.shift(); lvl.push(n.val);',
      '      if (n.left) q.push(n.left); if (n.right) q.push(n.right);',
      '    }',
      '    res.push(lvl);',
      '  }',
      '  return res;',
      '}'
    ]), 'Level order BFS O(n) using queue.'),
    e('Max Depth of Tree', 'Find tree height.', codeBlock([
      'function maxDepth(root) {',
      '  if (!root) return 0;',
      '  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));',
      '}'
    ]), 'Recursive max depth O(n).'),
    e('Same Tree Check', 'Compare two trees.', codeBlock([
      'function isSameTree(p, q) {',
      '  if (!p && !q) return true;',
      '  if (!p || !q) return false;',
      '  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);',
      '}'
    ]), 'Recursive tree comparison O(n).')
  ],
  [
    m('What is a leaf node?', ['Root node', 'Node with no children', 'Node with one child', 'Topmost node'], 1, 'Leaf node has no children.'),
    m('What is tree height?', ['Total nodes', 'Edges root to deepest leaf', 'Number of leaves', 'Width of tree'], 1, 'Height = edges on longest root-to-leaf path.'),
    m('Which traversal is root, left, right?', ['Inorder', 'Preorder', 'Postorder', 'Level order'], 1, 'Preorder: root, left, right.'),
    m('Which traversal uses a queue?', ['DFS', 'BFS', 'Preorder', 'Postorder'], 1, 'BFS (level order) uses a queue.'),
    m('Max children in binary tree?', ['1', '2', '3', 'Unlimited'], 1, 'Binary tree: max 2 children.'),
    m('What makes a tree balanced?', ['Height = O(log n)', 'Height = O(n)', 'All nodes full', 'No leaves'], 0, 'Balanced tree height is O(log n).')
  ]
);

/* =================== TOPIC 7: Binary Trees =================== */
addTopic('dsa-binary-trees', 'Binary Trees', 'intermediate', 20,
  ['A binary tree is a tree where each node has at most two children (left and right child).',
   'Binary trees can be implemented via nodes with left/right pointers or arrays (for complete trees).',
   'Common operations: insert, delete, search, traversal \u2014 all O(n) worst case for unbalanced trees.',
   'Special binary trees: binary search trees, heaps, segment trees, Fenwick trees, Huffman trees.'
  ],
  'A binary tree is like a family tree where each person (node) can have at most two children. You can go left or right. If organized properly (like a phone book), finding a name is fast because you know which branch to follow.',
  [
    d('Types of Binary Trees', 'Full: every node has 0 or 2 children. Complete: all levels filled except last, left-packed. Perfect: all internal nodes have 2 children, all leaves same level. Degenerate: each node has 1 child \u2014 behaves like linked list O(n).'),
    d('Array Representation', 'Complete binary trees stored compactly in arrays. Root at index 0. Left child: 2i+1. Right child: 2i+2. Parent: (i-1)/2. Used by binary heaps. Space efficient: no pointer overhead.'),
    d('Binary Tree Properties', 'Maximum nodes at level L: 2^L. Maximum nodes in perfect tree of height h: 2^(h+1) - 1. Minimum height for n nodes: floor(log2 n). Number of leaf nodes = internal nodes + 1 (full tree).'),
    d('Operations and Complexity', 'Insertion: O(n) worst. Deletion: O(n) worst. Search: O(n) worst. Traversal: O(n). For balanced BST: O(log n) for insert/search/delete.')
  ],
  'Binary trees are the foundation of many advanced data structures. A binary tree alone does not guarantee O(log n) \u2014 that requires balance (BST, AVL, Red-Black). Use arrays for complete binary trees (heaps). Master recursive patterns for tree manipulation.',
  [
    q('What is a binary tree?', 'A tree where each node has at most 2 children (left and right).'),
    q('What is the array index formula for left child?', 'Left child index = 2i + 1 (root at 0).'),
    q('What is a complete binary tree?', 'All levels filled except possibly last, which is filled left to right.'),
    q('What is a degenerate tree?', 'A tree where each node has only one child \u2014 effectively a linked list.'),
    q('Maximum nodes in perfect binary tree of height h?', '2^(h+1) - 1 nodes.'),
    q('What is the height of a perfect binary tree with n nodes?', 'floor(log2 n).'),
    q('What traversal gives sorted order in BST?', 'Inorder traversal (left, root, right).'),
    q('When do binary trees have O(log n) operations?', 'When balanced (BST, AVL, Red-Black Tree).'),
    q('What data structure uses array-based binary tree?', 'Binary heap.'),
    q('Difference between full and complete binary tree?', 'Full: each node has 0 or 2 children. Complete: filled left-to-right.')
  ],
  R(10,35,100,30,'#0070f3','','Root','1') +
  A(110,50,140,50) +
  R(150,35,100,25,'#28a745','','Left: 2','Left child') +
  R(150,65,100,25,'#ffc107','','Right: 3','Right child') +
  A(200,50,200,65) +
  R(10,100,100,25,'#dc3545','','Array: [1,2,3]','Root at 0') +
  R(10,130,100,25,'#e83e8c','','2i+1 = Left','i=0 -> 1') +
  R(10,160,100,25,'#6610f2','','2i+2 = Right','i=0 -> 2') +
  R(280,35,200,150,'#17a2b8','','Binary Tree','Max 2 children per node. Array or node representation.') +
  T(240,220,'Binary Trees: Each node has 0, 1, or 2 children. Foundation for BSTs, Heaps.',9,'#666','middle'),
  [
    e('Count Nodes in Complete Tree', 'Efficient count O(log^2 n).', codeBlock([
      'function countNodes(root) {',
      '  if (!root) return 0;',
      '  function leftDepth(n) { let d = 0; while (n) { n = n.left; d++; } return d; }',
      '  function rightDepth(n) { let d = 0; while (n) { n = n.right; d++; } return d; }',
      '  const l = leftDepth(root), r = rightDepth(root);',
      '  if (l === r) return Math.pow(2, l) - 1;',
      '  return 1 + countNodes(root.left) + countNodes(root.right);',
      '}'
    ]), 'Count nodes in complete tree O(log^2 n).'),
    e('Diameter of Binary Tree', 'Longest path between any two nodes.', codeBlock([
      'function diameter(root) {',
      '  let max = 0;',
      '  function dfs(node) {',
      '    if (!node) return 0;',
      '    const l = dfs(node.left), r = dfs(node.right);',
      '    max = Math.max(max, l + r);',
      '    return 1 + Math.max(l, r);',
      '  }',
      '  dfs(root); return max;',
      '}'
    ]), 'Diameter O(n) using DFS.'),
    e('Serialize and Deserialize', 'Tree to string and back.', codeBlock([
      'function serialize(root) {',
      '  const res = [];',
      '  function dfs(n) {',
      '    if (!n) { res.push("null"); return; }',
      '    res.push(n.val); dfs(n.left); dfs(n.right);',
      '  }',
      '  dfs(root); return res.join(",");',
      '}',
      'function deserialize(data) {',
      '  const arr = data.split(",");',
      '  function dfs() {',
      '    const v = arr.shift();',
      '    if (v === "null") return null;',
      '    const n = new TreeNode(Number(v));',
      '    n.left = dfs(); n.right = dfs(); return n;',
      '  }',
      '  return dfs();',
      '}'
    ]), 'Serialize/deserialize using preorder DFS.'),
    e('Lowest Common Ancestor', 'LCA in binary tree.', codeBlock([
      'function lowestCommonAncestor(root, p, q) {',
      '  if (!root || root === p || root === q) return root;',
      '  const left = lowestCommonAncestor(root.left, p, q);',
      '  const right = lowestCommonAncestor(root.right, p, q);',
      '  if (left && right) return root;',
      '  return left || right;',
      '}'
    ]), 'LCA O(n) using recursive DFS.'),
    e('Invert Binary Tree', 'Swap left and right children.', codeBlock([
      'function invertTree(root) {',
      '  if (!root) return null;',
      '  const temp = root.left; root.left = root.right; root.right = temp;',
      '  invertTree(root.left); invertTree(root.right);',
      '  return root;',
      '}'
    ]), 'Invert binary tree O(n) recursive.')
  ],
  [
    m('Max children in a binary tree?', ['1', '2', '3', '4'], 1, 'Binary tree: max 2 children.'),
    m('Array index for left child of i?', ['2i', '2i+1', '2i+2', 'i/2'], 1, 'Left child = 2i+1 (0-indexed).'),
    m('What is a complete binary tree?', ['All nodes have 2 children', 'All levels filled left to right', 'All leaves at same depth', 'Height is O(log n)'], 1, 'Complete tree fills levels left to right.'),
    m('Height of perfect binary tree with n nodes?', ['n-1', 'log2 n', 'sqrt(n)', 'n/2'], 1, 'Height = floor(log2 n).'),
    m('What traversal gives sorted order in BST?', ['Preorder', 'Inorder', 'Postorder', 'Level order'], 1, 'Inorder gives sorted order.'),
    m('When does binary tree degrade to O(n)?', ['Balanced', 'Skewed/degenerate', 'Perfect', 'Complete'], 1, 'Skewed tree behaves like linked list O(n).')
  ]
);

/* =================== TOPIC 8: Binary Search Trees =================== */
addTopic('dsa-bst', 'Binary Search Trees', 'intermediate', 20,
  ['A Binary Search Tree (BST) is a binary tree where left child values < parent value < right child values.',
   'BST property enables O(log n) average-time search, insert, and delete operations.',
   'Inorder traversal of a BST visits nodes in sorted ascending order.',
   'Worst-case O(n) when tree becomes skewed (sorted input). Self-balancing trees (AVL, Red-Black) prevent this.'
  ],
  'A BST is like a well-organized phone book. You start at the middle. If the name comes before, go left. If after, go right. Each step eliminates half of the remaining names. When well-organized, finding a name takes O(log n) steps.',
  [
    d('BST Property', 'Left subtree: all values less than parent. Right subtree: all values greater than parent. No duplicates typically. This ordering enables binary search on the tree.'),
    d('BST Operations', 'Search: compare with root, go left/right recursively O(h). Insert: search for position, add leaf O(h). Delete: 3 cases \u2014 leaf (remove), one child (replace with child), two children (replace with inorder successor).'),
    d('BST vs Array Binary Search', 'BST: dynamic insert/delete O(log n) average. Array: binary search O(log n) but insert/delete O(n). BST is better when data changes frequently.'),
    d('Self-Balancing BSTs', 'AVL trees: height difference <= 1. Rotations rebalance. Red-Black trees: 5 constraints guarantee O(log n) height. B-Trees: multi-way search trees optimized for disk I/O.')
  ],
  'BSTs are the go-to for ordered dynamic data. The BST property enables O(log n) operations when balanced. For guaranteed O(log n) in production, use AVL or Red-Black trees.',
  [
    q('What is the BST property?', 'Left child < parent < right child for all nodes.'),
    q('Average BST search complexity?', 'O(log n) for balanced tree.'),
    q('Worst-case BST search time?', 'O(n) \u2014 skewed tree (sorted input).'),
    q('What traversal gives sorted order in BST?', 'Inorder traversal (left, root, right).'),
    q('How to find minimum value in BST?', 'Keep going left until no left child.'),
    q('How to find maximum value in BST?', 'Keep going right until no right child.'),
    q('What is a successor in BST?', 'The next larger value. For node with right child: leftmost of right subtree.'),
    q('What is deletion case with two children?', 'Replace with inorder successor, then delete successor.'),
    q('Difference between BST and AVL tree?', 'AVL self-balances to guarantee O(log n) height. BST can become skewed.'),
    q('What data structure uses BST internally?', 'C++ std::map, std::set (Red-Black tree).')
  ],
  R(10,35,110,25,'#0070f3','','Root: 8','') +
  A(120,48,150,48) + A(120,55,150,72) +
  R(160,35,100,25,'#28a745','','Left: 3','< 8') +
  R(160,65,100,25,'#ffc107','','Right: 10','> 8') +
  A(210,48,210,65) + A(210,78,210,100) +
  R(10,100,100,25,'#dc3545','','Left: 1','< 3') +
  R(10,130,100,25,'#e83e8c','','Right: 6','> 3, < 8') +
  R(160,100,100,25,'#6610f2','','Right: 14','> 10') +
  R(290,35,190,150,'#17a2b8','','BST','Left < Parent < Right. O(log n) balanced.') +
  T(240,220,'BST: Left child < parent < right child. O(log n) search/insert/delete when balanced.',9,'#666','middle'),
  [
    e('BST Search', 'Recursive and iterative.', codeBlock([
      'function searchBST(root, val) {',
      '  if (!root || root.val === val) return root;',
      '  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);',
      '}',
      'function searchIterative(root, val) {',
      '  while (root && root.val !== val)',
      '    root = val < root.val ? root.left : root.right;',
      '  return root;',
      '}'
    ]), 'BST search O(h) recursive and iterative.'),
    e('BST Insert', 'Insert maintaining BST property.', codeBlock([
      'function insertBST(root, val) {',
      '  if (!root) return new TreeNode(val);',
      '  if (val < root.val) root.left = insertBST(root.left, val);',
      '  else if (val > root.val) root.right = insertBST(root.right, val);',
      '  return root;',
      '}'
    ]), 'BST insert O(h) recursive.'),
    e('BST Delete', 'Delete node with three cases.', codeBlock([
      'function deleteBST(root, val) {',
      '  if (!root) return null;',
      '  if (val < root.val) root.left = deleteBST(root.left, val);',
      '  else if (val > root.val) root.right = deleteBST(root.right, val);',
      '  else {',
      '    if (!root.left) return root.right;',
      '    if (!root.right) return root.left;',
      '    let succ = root.right; while (succ.left) succ = succ.left;',
      '    root.val = succ.val;',
      '    root.right = deleteBST(root.right, succ.val);',
      '  }',
      '  return root;',
      '}'
    ]), 'BST delete O(h) with inorder successor.'),
    e('Validate BST', 'Check if tree satisfies BST property.', codeBlock([
      'function isValidBST(root) {',
      '  function validate(node, min, max) {',
      '    if (!node) return true;',
      '    if (node.val <= min || node.val >= max) return false;',
      '    return validate(node.left, min, node.val) && validate(node.right, node.val, max);',
      '  }',
      '  return validate(root, -Infinity, Infinity);',
      '}'
    ]), 'Validate BST using min/max range.'),
    e('Kth Smallest in BST', 'Inorder traversal tracking kth.', codeBlock([
      'function kthSmallest(root, k) {',
      '  const stack = []; let curr = root;',
      '  while (curr || stack.length) {',
      '    while (curr) { stack.push(curr); curr = curr.left; }',
      '    curr = stack.pop();',
      '    if (--k === 0) return curr.val;',
      '    curr = curr.right;',
      '  }',
      '  return -1;',
      '}'
    ]), 'Kth smallest using iterative inorder O(n).')
  ],
  [
    m('What is the BST property?', ['Left < Root < Right', 'Left > Root > Right', 'Left = Root = Right', 'No ordering'], 0, 'Left child < parent < right child.'),
    m('Average BST search complexity?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 1, 'O(log n) when balanced.'),
    m('Worst-case BST search?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 2, 'O(n) for skewed tree.'),
    m('What traversal gives sorted BST values?', ['Preorder', 'Inorder', 'Postorder', 'Level order'], 1, 'Inorder gives sorted values.'),
    m('How to find min in BST?', ['Go left until null', 'Go right until null', 'Search all nodes', 'Use recursion'], 0, 'Leftmost node is minimum.'),
    m('What ensures O(log n) in production BST?', ['Random input', 'Self-balancing (AVL/RB)', 'Hash tables', 'Arrays'], 1, 'Self-balancing trees guarantee O(log n).')
  ]
);

/* =================== TOPIC 9: Heaps =================== */
addTopic('dsa-heaps', 'Heaps', 'intermediate', 20,
  ['A heap is a complete binary tree with the heap property: parent is >= (max-heap) or <= (min-heap) children.',
   'Heaps are stored compactly in arrays: root at index 0, left child at 2i+1, right child at 2i+2.',
   'Insert: O(log n) \u2014 add at end, bubble up. Extract min/max: O(log n) \u2014 swap with last, bubble down.',
   'Heapify: building a heap from an array in O(n) time using bottom-up approach.'
  ],
  'A heap is like a pyramid of numbers. In a max-heap, the largest number sits at the top (root). Each parent is larger than its children. When you remove the top, the next largest bubbles up to replace it \u2014 always keeping the largest accessible in O(1).',
  [
    d('Max-Heap vs Min-Heap', 'Max-heap: root is maximum. Parent >= children. For priority queues wanting highest priority first. Min-heap: root is minimum. Parent <= children. For Dijkstra, Huffman coding.'),
    d('Heap Operations', 'Insert: append to array, bubble up while parent < value (min-heap). Extract: swap root with last, remove last, bubble down. Peek: O(1) return root.'),
    d('Heapify (Build Heap)', 'Start from last internal node (n/2 - 1) and bubble down each. O(n) because most nodes are near leaves with minimal work.'),
    d('Applications', 'Priority queues (OS scheduling). Dijkstra. HeapSort: O(n log n). K-way merge. Median finding (two heaps). Sliding window maximum.')
  ],
  'Heaps are the go-to for priority queue operations. Insert and extract in O(log n). Peek in O(1). Heapify in O(n). JavaScript does not have built-in heap \u2014 implement or use library. HeapSort is an in-place O(n log n) sort.',
  [
    q('What is a heap?', 'A complete binary tree with heap property (parent >= or <= children).'),
    q('What is the heap property for max-heap?', 'Parent >= children. Root is the maximum element.'),
    q('How are heaps stored in memory?', 'As an array: root at 0, left child at 2i+1, right at 2i+2.'),
    q('Time complexity of heap insert?', 'O(log n) \u2014 add at end, bubble up.'),
    q('Time complexity of extract min/max?', 'O(log n) \u2014 swap with last, bubble down.'),
    q('What is heapify time complexity?', 'O(n) \u2014 building heap from array bottom-up.'),
    q('What is HeapSort complexity?', 'O(n log n) time, O(1) extra space (in-place).'),
    q('What data structure uses heap for priority queue?', 'Min-heap or max-heap depending on priority order.'),
    q('How do you find median using heaps?', 'Max-heap for lower half, min-heap for upper half.'),
    q('Index of parent for node i?', 'Parent index = Math.floor((i-1)/2).')
  ],
  R(10,35,100,25,'#0070f3','','Root: 50','Max') +
  A(110,48,140,48) + A(110,55,140,72) +
  R(150,35,100,25,'#28a745','','Left: 30','') +
  R(150,65,100,25,'#ffc107','','Right: 20','') +
  A(200,48,200,65) + A(200,78,200,100) +
  R(10,100,100,25,'#dc3545','','Left: 15','') +
  R(10,130,100,25,'#e83e8c','','Right: 10','') +
  R(150,100,100,25,'#6610f2','','Left: 8','') +
  R(10,160,100,25,'#17a2b8','','Array: [50,30,20,15,10,8]','') +
  R(290,35,190,150,'#17a2b8','','Heap (Max-Heap)','Complete tree. Parent >= children. Array storage.') +
  T(240,220,'Heap: Complete binary tree with heap property. Priority queue. HeapSort O(n log n).',9,'#666','middle'),
  [
    e('Min-Heap Implementation', 'Array-based min-heap.', codeBlock([
      'class MinHeap {',
      '  constructor() { this.heap = []; }',
      '  parent(i) { return Math.floor((i-1)/2); }',
      '  left(i) { return 2*i+1; } right(i) { return 2*i+2; }',
      '  push(val) { this.heap.push(val); this._bubbleUp(this.heap.length-1); }',
      '  _bubbleUp(i) {',
      '    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {',
      '      [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];',
      '      i = this.parent(i);',
      '    }',
      '  }',
      '  pop() {',
      '    if (!this.heap.length) return null;',
      '    const min = this.heap[0]; const last = this.heap.pop();',
      '    if (this.heap.length) { this.heap[0] = last; this._bubbleDown(0); }',
      '    return min;',
      '  }',
      '  _bubbleDown(i) {',
      '    const l = this.left(i), r = this.right(i); let smallest = i;',
      '    if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;',
      '    if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;',
      '    if (smallest !== i) {',
      '      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];',
      '      this._bubbleDown(smallest);',
      '    }',
      '  }',
      '}'
    ]), 'Complete min-heap with push/pop O(log n).'),
    e('Heapify (Build Heap)', 'O(n) bottom-up build.', codeBlock([
      'function heapify(arr) {',
      '  const n = arr.length;',
      '  for (let i = Math.floor(n/2) - 1; i >= 0; i--) bubbleDown(arr, n, i);',
      '  return arr;',
      '}',
      'function bubbleDown(arr, n, i) {',
      '  let largest = i; const l = 2*i+1, r = 2*i+2;',
      '  if (l < n && arr[l] > arr[largest]) largest = l;',
      '  if (r < n && arr[r] > arr[largest]) largest = r;',
      '  if (largest !== i) { [arr[i], arr[largest]] = [arr[largest], arr[i]]; bubbleDown(arr, n, largest); }',
      '}'
    ]), 'Heapify builds max-heap in O(n).'),
    e('HeapSort', 'O(n log n) in-place sort.', codeBlock([
      'function heapSort(arr) {',
      '  const n = arr.length;',
      '  for (let i = Math.floor(n/2) - 1; i >= 0; i--) bubbleDown(arr, n, i);',
      '  for (let i = n - 1; i > 0; i--) {',
      '    [arr[0], arr[i]] = [arr[i], arr[0]];',
      '    bubbleDown(arr, i, 0);',
      '  }',
      '  return arr;',
      '}'
    ]), 'HeapSort: build heap + extract all O(n log n).'),
    e('Kth Largest Element', 'Min-heap of size k.', codeBlock([
      'function findKthLargest(nums, k) {',
      '  const heap = new MinHeap();',
      '  for (const n of nums) { heap.push(n); if (heap.heap.length > k) heap.pop(); }',
      '  return heap.pop();',
      '}'
    ]), 'Kth largest using min-heap of size k O(n log k).')
  ],
  [
    m('What data structure is a heap?', ['Complete binary tree', 'Linked list', 'Hash table', 'Balanced BST'], 0, 'Heap is a complete binary tree stored in array.'),
    m('Time complexity of heap insert?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 1, 'Insert: O(log n) bubble up.'),
    m('Time complexity of heapify?', ['O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)'], 1, 'Heapify builds heap in O(n).'),
    m('HeapSort time complexity?', ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], 1, 'HeapSort: O(n log n).'),
    m('Index of left child in 0-indexed heap?', ['2i', '2i+1', 'i/2', '2i+2'], 1, 'Left child = 2i+1.'),
    m('What is a max-heap property?', ['Parent <= children', 'Parent >= children', 'Parent = children', 'No ordering'], 1, 'Max-heap: parent >= children.')
  ]
);

/* =================== TOPIC 10: Graphs =================== */
addTopic('dsa-graphs', 'Graphs', 'advanced', 25,
  ['A graph is a collection of vertices (nodes) connected by edges. G = (V, E).',
   'Directed vs undirected, weighted vs unweighted, cyclic vs acyclic.',
   'Representations: adjacency matrix (V^2 space), adjacency list (V+E space, preferred for sparse graphs).',
   'Graphs model real-world networks: social networks, maps, internet routing, dependency resolution.'
  ],
  'A graph is like a city map. Intersections are vertices (nodes). Roads are edges (connections). Some roads are one-way (directed). Some roads have tolls (weighted). You want to find the shortest route from your home to the airport.',
  [
    d('Graph Representations', 'Adjacency Matrix: V x V boolean matrix. O(V^2) space. O(1) edge lookup. Adjacency List: array of lists. O(V+E) space. Good for sparse graphs. Edge List: list of (u,v,w) tuples.'),
    d('Directed vs Undirected', 'Undirected: edges have no direction (friend connections). Directed (digraph): edges have direction (Twitter follow). Undirected edges are bidirectional.'),
    d('Graph Terminology', 'Degree: number of edges incident to a vertex. Path: sequence of vertices connected by edges. Cycle: path with same start/end. Connected: path exists between any two vertices.'),
    d('Common Graph Algorithms', 'DFS/BFS: traversal, connectivity. Dijkstra: shortest path (non-negative). Bellman-Ford: shortest path (negative). Topological Sort: DAG ordering. Kruskal/Prim: MST.')
  ],
  'Graphs model relationships. Choose representation based on density: adjacency list for sparse, matrix for dense. Master BFS (shortest path in unweighted) and DFS (connectivity, cycles). Dijkstra for weighted shortest path.',
  [
    q('What is a graph?', 'A collection of vertices and edges connecting them. G = (V, E).'),
    q('Difference between directed and undirected?', 'Directed: edges have direction (u->v). Undirected: edges are bidirectional.'),
    q('What are the two main graph representations?', 'Adjacency matrix (O(V^2)) and adjacency list (O(V+E)).'),
    q('Which representation for sparse graphs?', 'Adjacency list \u2014 uses O(V+E) space vs O(V^2) for matrix.'),
    q('What is the degree of a vertex?', 'Number of edges incident to the vertex.'),
    q('What is a cycle in a graph?', 'A path that starts and ends at the same vertex.'),
    q('What is a connected graph?', 'A path exists between every pair of vertices.'),
    q('What algorithm finds shortest path in unweighted graphs?', 'BFS (Breadth-First Search) \u2014 O(V+E).'),
    q('Difference between tree and graph?', 'A tree is an acyclic connected graph with exactly V-1 edges.'),
    q('What is a DAG?', 'Directed Acyclic Graph \u2014 used for topological sort and dependency resolution.')
  ],
  R(10,35,100,25,'#0070f3','','Vertex A','Node') +
  R(200,35,100,25,'#28a745','','Vertex B','Node') +
  A(110,48,200,48) +
  R(10,70,100,25,'#ffc107','','Edge','A -> B') +
  R(10,100,100,25,'#dc3545','','Weight','Cost') +
  R(10,130,100,25,'#e83e8c','','Adj List','Map<V, List<E>>') +
  R(10,160,100,25,'#6610f2','','Adj Matrix','V x V bool') +
  R(330,35,150,150,'#17a2b8','','Graph','G = (V, E). Directed/Undirected. Weighted. Adj list preferred.') +
  T(240,220,'Graphs: Vertices connected by edges. BFS, DFS, Dijkstra, Topological Sort.',9,'#666','middle'),
  [
    e('Adjacency List Graph', 'Graph implementation.', codeBlock([
      'class Graph {',
      '  constructor() { this.adjList = new Map(); }',
      '  addVertex(v) { if (!this.adjList.has(v)) this.adjList.set(v, []); }',
      '  addEdge(u, v, weight = 1) { this.addVertex(u); this.addVertex(v); this.adjList.get(u).push({node:v, weight}); }',
      '  getNeighbors(v) { return this.adjList.get(v) || []; }',
      '}'
    ]), 'Adjacency list graph representation O(V+E).'),
    e('DFS Traversal (Graph)', 'Recursive DFS.', codeBlock([
      'function dfs(graph, start) {',
      '  const visited = new Set(); const result = [];',
      '  function explore(v) { visited.add(v); result.push(v);',
      '    for (const {node} of graph.getNeighbors(v)) if (!visited.has(node)) explore(node); }',
      '  explore(start); return result;',
      '}'
    ]), 'DFS traversal using recursion O(V+E).'),
    e('BFS Traversal (Graph)', 'Queue-based BFS.', codeBlock([
      'function bfs(graph, start) {',
      '  const visited = new Set([start]); const q = [start], result = [];',
      '  while (q.length) {',
      '    const v = q.shift(); result.push(v);',
      '    for (const {node} of graph.getNeighbors(v)) if (!visited.has(node)) { visited.add(node); q.push(node); }',
      '  }',
      '  return result;',
      '}'
    ]), 'BFS traversal using queue O(V+E).'),
    e('Detect Cycle (Directed)', 'DFS with recursion stack.', codeBlock([
      'function hasCycle(graph) {',
      '  const visited = new Set(), recStack = new Set();',
      '  function dfs(v) { visited.add(v); recStack.add(v);',
      '    for (const {node} of graph.getNeighbors(v)) {',
      '      if (!visited.has(node)) { if (dfs(node)) return true; }',
      '      else if (recStack.has(node)) return true;',
      '    }',
      '    recStack.delete(v); return false;',
      '  }',
      '  for (const v of graph.adjList.keys()) if (!visited.has(v) && dfs(v)) return true;',
      '  return false;',
      '}'
    ]), 'Cycle detection using DFS with recursion stack.'),
    e('Clone Graph', 'Deep copy of graph.', codeBlock([
      'function cloneGraph(node, map = new Map()) {',
      '  if (!node) return null;',
      '  if (map.has(node.val)) return map.get(node.val);',
      '  const copy = new Node(node.val); map.set(node.val, copy);',
      '  for (const neighbor of node.neighbors) copy.neighbors.push(cloneGraph(neighbor, map));',
      '  return copy;',
      '}'
    ]), 'DFS clone graph using hash map for visited tracking.')
  ],
  [
    m('Space of adjacency matrix?', ['O(V+E)', 'O(V^2)', 'O(E)', 'O(V)'], 1, 'Adjacency matrix: O(V^2).'),
    m('What is degree of vertex?', ['Number of edges', 'Number of neighbors', 'Number of paths', 'Number of cycles'], 0, 'Degree = edges incident to vertex.'),
    m('Which representation for sparse graph?', ['Adjacency matrix', 'Adjacency list', 'Edge list', 'Incidence matrix'], 1, 'Adjacency list: O(V+E).'),
    m('What finds shortest path in unweighted graph?', ['DFS', 'BFS', 'Dijkstra', 'Bellman-Ford'], 1, 'BFS finds shortest path.'),
    m('What is a DAG?', ['Directed Acyclic Graph', 'Dynamic Algorithmic Graph', 'Dense Aggregate Graph', 'Direct Access Graph'], 0, 'Directed Acyclic Graph.'),
    m('Which algorithm handles negative edges?', ['Dijkstra', 'Bellman-Ford', 'BFS', 'DFS'], 1, 'Bellman-Ford handles negative edges.')
  ]
);

/* =================== TOPIC 11: DFS =================== */
addTopic('dsa-dfs', 'DFS (Depth-First Search)', 'intermediate', 20,
  ['DFS explores a graph/tree by going as deep as possible along each branch before backtracking.',
   'DFS can be implemented recursively (implicit stack via call stack) or iteratively (explicit stack).',
   'Applications: topological sort, connected components, cycle detection, maze solving, backtracking.',
   'Time: O(V+E). Space: O(V) worst-case for recursion stack.'
  ],
  'DFS is like exploring a cave maze. You pick a tunnel and walk until you hit a dead end. Then you backtrack to the last intersection and try the next tunnel. You mark tunnels you\'ve already explored so you don\'t go in circles.',
  [
    d('DFS Algorithm', 'Start at root. Mark as visited. For each unvisited neighbor, recursively call DFS. Backtrack when no unvisited neighbors remain. Uses stack (implicit via recursion or explicit).'),
    d('Recursive vs Iterative', 'Recursive: elegant, uses call stack. Stack overflow for deep graphs. Iterative: uses explicit Stack. Same O(V+E). Recursive simpler for trees; iterative preferred for deep graphs.'),
    d('DFS on Trees vs Graphs', 'Trees: no cycles, no visited set needed. Three traversals: preorder, inorder, postorder. Graphs: cycles possible, MUST use visited set to avoid infinite loops.'),
    d('DFS Applications', 'Topological sort (post-order). Connected components. Cycle detection (back edges). Path finding in mazes. Solving puzzles (Sudoku, N-Queens).')
  ],
  'DFS is essential for exploring hierarchical and connected structures. Use recursion for simplicity, iteration for depth safety. Always track visited nodes in graphs (cycles). Post-order DFS gives topological sort.',
  [
    q('What is DFS?', 'Depth-First Search \u2014 explores as deep as possible along each branch before backtracking.'),
    q('What data structure does DFS use?', 'Stack \u2014 implicit (recursion call stack) or explicit.'),
    q('What is the time complexity of DFS?', 'O(V+E) for graphs, O(n) for trees.'),
    q('What is the space complexity of DFS?', 'O(V) worst case for recursion/explicit stack.'),
    q('Difference between DFS on trees and graphs?', 'Trees: no visited set needed. Graphs: need visited set to avoid cycles.'),
    q('What traversal does Topological Sort use?', 'Post-order DFS (process after children).'),
    q('How does DFS detect cycles in directed graphs?', 'Track recursion stack \u2014 back edge indicates cycle.'),
    q('What is pre-order traversal?', 'Process node before its children (root, left, right).'),
    q('What is post-order traversal?', 'Process node after its children (left, right, root).'),
    q('What problem does DFS solve in mazes?', 'Path finding \u2014 explores one path fully before alternatives.')
  ],
  R(10,35,110,25,'#0070f3','','Start: A','Visit') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','DFS: B','Go deep') +
  A(270,48,300,48) +
  R(310,35,110,25,'#ffc107','','DFS: D','Deepest') +
  A(310,60,310,80) +
  R(10,100,110,25,'#dc3545','','Backtrack','To B') +
  A(120,113,150,113) +
  R(10,130,110,25,'#e83e8c','','DFS: C','Next branch') +
  A(120,143,150,143) +
  R(10,160,110,25,'#6610f2','','DFS: E','Explore') +
  R(300,100,180,85,'#17a2b8','','DFS (Deep First)','Stack-based. Go deep, backtrack, continue.') +
  T(240,220,'DFS: Depth-First Search. Stack-based traversal. Topological sort, cycle detection.',9,'#666','middle'),
  [
    e('DFS on Graph (Recursive)', 'Recursive DFS traversal.', codeBlock([
      'function dfsRecursive(graph, start) {',
      '  const visited = new Set(); const result = [];',
      '  function explore(v) { visited.add(v); result.push(v);',
      '    for (const neighbor of graph.get(v) || []) if (!visited.has(neighbor)) explore(neighbor); }',
      '  explore(start); return result;',
      '}'
    ]), 'Recursive DFS O(V+E).'),
    e('DFS on Graph (Iterative)', 'Iterative DFS using stack.', codeBlock([
      'function dfsIterative(graph, start) {',
      '  const visited = new Set(); const stack = [start]; const result = [];',
      '  while (stack.length) {',
      '    const v = stack.pop(); if (visited.has(v)) continue;',
      '    visited.add(v); result.push(v);',
      '    for (const neighbor of graph.get(v) || []) if (!visited.has(neighbor)) stack.push(neighbor);',
      '  }',
      '  return result;',
      '}'
    ]), 'Iterative DFS using explicit stack O(V+E).'),
    e('Topological Sort (DFS)', 'Ordering DAG vertices.', codeBlock([
      'function topologicalSort(graph) {',
      '  const visited = new Set(); const stack = [];',
      '  function dfs(v) { visited.add(v);',
      '    for (const neighbor of graph.get(v) || []) if (!visited.has(neighbor)) dfs(neighbor);',
      '    stack.push(v);',
      '  }',
      '  for (const v of graph.keys()) if (!visited.has(v)) dfs(v);',
      '  return stack.reverse();',
      '}'
    ]), 'Topological sort using post-order DFS O(V+E).'),
    e('Number of Islands', 'DFS for connected components.', codeBlock([
      'function numIslands(grid) {',
      '  let count = 0;',
      '  function dfs(r, c) {',
      '    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === "0") return;',
      '    grid[r][c] = "0"; dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);',
      '  }',
      '  for (let r = 0; r < grid.length; r++)',
      '    for (let c = 0; c < grid[0].length; c++)',
      '      if (grid[r][c] === "1") { count++; dfs(r,c); }',
      '  return count;',
      '}'
    ]), 'Number of islands using DFS O(V).'),
    e('Path Exists (Graph)', 'DFS path finding.', codeBlock([
      'function validPath(n, edges, start, end) {',
      '  const graph = Array.from({length: n}, () => []);',
      '  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }',
      '  const visited = new Set();',
      '  function dfs(v) { if (v === end) return true; visited.add(v);',
      '    for (const n of graph[v]) if (!visited.has(n) && dfs(n)) return true; return false; }',
      '  return dfs(start);',
      '}'
    ]), 'DFS path existence check O(V+E).')
  ],
  [
    m('What data structure does DFS use?', ['Queue', 'Stack', 'Priority queue', 'Hash table'], 1, 'DFS uses a stack.'),
    m('DFS time complexity?', ['O(V+E)', 'O(V)', 'O(E)', 'O(n log n)'], 0, 'DFS: O(V+E) for graphs.'),
    m('What traversal gives topological sort?', ['Pre-order', 'In-order', 'Post-order', 'Level-order'], 2, 'Post-order DFS gives topological sort.'),
    m('What does DFS need that tree traversal does not?', ['Stack', 'Visited set', 'Queue', 'Parent pointer'], 1, 'Graphs need visited set to avoid cycles.'),
    m('How does DFS detect cycle in directed graph?', ['Visited set', 'Parent check', 'Recursion stack tracking', 'Color marking'], 2, 'Recursion stack tracks back edges.'),
    m('Maximum recursion depth risk in DFS?', ['Stack overflow', 'Queue overflow', 'Cycle detection', 'Memory leak'], 0, 'Deep recursion can cause stack overflow.')
  ]
);

/* =================== TOPIC 12: BFS =================== */
addTopic('dsa-bfs', 'BFS (Breadth-First Search)', 'intermediate', 20,
  ['BFS explores a graph level by level, visiting all neighbors of a node before moving to the next level.',
   'BFS uses a queue data structure (FIFO) to track nodes to visit.',
   'BFS finds the shortest path in unweighted graphs \u2014 first time a node is visited is via the shortest path.',
   'Time: O(V+E). Space: O(V) for queue and visited set.'
  ],
  'BFS is like a search party spreading out from a starting point. Everyone takes one step outward, then another, then another. The first person to find the target took the shortest route. It is like ripples spreading from a stone dropped in water.',
  [
    d('BFS Algorithm', 'Start at root. Add to queue. Mark visited. While queue not empty: dequeue, process, enqueue all unvisited neighbors. Guarantees shortest path in unweighted graphs because all edges have equal weight.'),
    d('BFS vs DFS', 'BFS: queue, level-order, shortest path, O(V+E) space. DFS: stack, depth-first, not guaranteed shortest, O(V) space. BFS for shortest paths, DFS for topological sort and cycle detection.'),
    d('BFS Applications', 'Shortest path in unweighted graph. Web crawling. Social network degrees of separation. GPS navigation. Connected components. Level-order tree traversal.'),
    d('BFS Variation: 0-1 BFS', 'For edge weights 0 or 1, use deque. If weight is 0, push to front. If 1, push to back. Still O(V+E). Multi-source BFS: start from multiple nodes simultaneously.')
  ],
  'BFS is the go-to for shortest path in unweighted graphs and level-order processing. Queue-based, O(V+E). Use when you need the minimum number of steps/edges. BFS on grids (2D arrays) is extremely common in coding interviews.',
  [
    q('What is BFS?', 'Breadth-First Search \u2014 explores a graph level by level using a queue.'),
    q('What data structure does BFS use?', 'Queue (FIFO).'),
    q('Time complexity of BFS?', 'O(V+E) for graphs, O(n) for trees.'),
    q('Space complexity of BFS?', 'O(V) \u2014 queue can hold up to all vertices at the widest level.'),
    q('What does BFS guarantee for unweighted graphs?', 'Shortest path in terms of number of edges.'),
    q('Difference between BFS and DFS?', 'BFS: queue, level-order, shortest path. DFS: stack, depth-first, topological sort.'),
    q('What is multi-source BFS?', 'BFS starting from multiple initial nodes simultaneously.'),
    q('What is 0-1 BFS?', 'Variant using deque for edge weights 0 or 1.'),
    q('What is the BFS approach for grid shortest path?', 'Each cell is a node. Adjacent cells are neighbors. BFS finds minimum steps.'),
    q('What problem does BFS solve in social networks?', 'Degrees of separation.')
  ],
  R(10,35,110,25,'#0070f3','','Level 0','Start') +
  R(10,65,110,25,'#28a745','','Level 1','Neighbors') +
  R(10,95,110,25,'#ffc107','','Level 2','Neighbors^2') +
  R(10,125,110,25,'#dc3545','','Level 3','Neighbors^3') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) +
  R(160,35,140,130,'#17a2b8','','BFS (Broad First)','Queue-based. Level by level. Shortest path.') +
  T(240,210,'BFS: Breadth-First Search. Queue-based level-order traversal. Shortest path in unweighted graphs.',9,'#666','middle'),
  [
    e('BFS on Graph', 'Iterative BFS using queue.', codeBlock([
      'function bfs(graph, start) {',
      '  const visited = new Set([start]); const q = [start], result = [];',
      '  while (q.length) {',
      '    const v = q.shift(); result.push(v);',
      '    for (const neighbor of graph.get(v) || [])',
      '      if (!visited.has(neighbor)) { visited.add(neighbor); q.push(neighbor); }',
      '  }',
      '  return result;',
      '}'
    ]), 'Standard BFS O(V+E).'),
    e('Shortest Path in Binary Matrix', 'BFS on grid.', codeBlock([
      'function shortestPathBinaryMatrix(grid) {',
      '  if (grid[0][0] === 1) return -1; const n = grid.length;',
      '  const dirs = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];',
      '  const q = [[0,0,1]]; grid[0][0] = 1;',
      '  while (q.length) {',
      '    const [r, c, dist] = q.shift();',
      '    if (r === n-1 && c === n-1) return dist;',
      '    for (const [dr, dc] of dirs) { const nr = r+dr, nc = c+dc;',
      '      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) { grid[nr][nc] = 1; q.push([nr, nc, dist+1]); }',
      '    }',
      '  }',
      '  return -1;',
      '}'
    ]), 'Shortest path in binary matrix BFS O(n^2).'),
    e('Word Ladder', 'BFS transforming words.', codeBlock([
      'function ladderLength(beginWord, endWord, wordList) {',
      '  const set = new Set(wordList); if (!set.has(endWord)) return 0;',
      '  const q = [[beginWord, 1]];',
      '  while (q.length) {',
      '    const [word, level] = q.shift(); if (word === endWord) return level;',
      '    for (let i = 0; i < word.length; i++) {',
      '      for (let c = 97; c <= 122; c++) {',
      '        const next = word.slice(0,i) + String.fromCharCode(c) + word.slice(i+1);',
      '        if (set.has(next)) { set.delete(next); q.push([next, level+1]); }',
      '      }',
      '    }',
      '  }',
      '  return 0;',
      '}'
    ]), 'Word ladder BFS O(n * l * 26).'),
    e('Rotting Oranges', 'Multi-source BFS.', codeBlock([
      'function orangesRotting(grid) {',
      '  const q = []; let fresh = 0, minutes = 0;',
      '  const rows = grid.length, cols = grid[0].length;',
      '  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {',
      '    if (grid[r][c] === 1) fresh++; else if (grid[r][c] === 2) q.push([r,c,0]); }',
      '  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];',
      '  while (q.length) {',
      '    const [r, c, m] = q.shift(); minutes = Math.max(minutes, m);',
      '    for (const [dr, dc] of dirs) { const nr = r+dr, nc = c+dc;',
      '      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) { grid[nr][nc] = 2; fresh--; q.push([nr, nc, m+1]); }',
      '    }',
      '  }',
      '  return fresh === 0 ? minutes : -1;',
      '}'
    ]), 'Rotting oranges \u2014 multi-source BFS.')
  ],
  [
    m('What data structure does BFS use?', ['Stack', 'Queue', 'Priority queue', 'Hash set'], 1, 'BFS uses a queue.'),
    m('BFS time complexity?', ['O(V+E)', 'O(V)', 'O(E)', 'O(log V)'], 0, 'BFS: O(V+E) for graphs.'),
    m('What does BFS guarantee in unweighted graphs?', ['Shortest path', 'Minimum spanning tree', 'Topological order', 'Maximum flow'], 0, 'BFS guarantees shortest path.'),
    m('BFS space complexity?', ['O(1)', 'O(V)', 'O(log V)', 'O(V^2)'], 1, 'BFS: O(V) for queue.'),
    m('Difference between BFS and DFS?', ['BFS stack, DFS queue', 'BFS queue, DFS stack', 'Same', 'Both queue'], 1, 'BFS = queue, DFS = stack.'),
    m('What is multi-source BFS?', ['Multiple parents', 'Multiple starting points', 'Multiple graphs', 'Parallel BFS'], 1, 'Multi-source BFS starts from multiple nodes.')
  ]
);

/* =================== TOPIC 13: Dynamic Programming =================== */
addTopic('dsa-dynamic-programming', 'Dynamic Programming', 'advanced', 30,
  ['Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems and storing their results.',
   'Two approaches: top-down (memoization \u2014 recursion + cache) and bottom-up (tabulation \u2014 iterative table filling).',
   'DP is applicable when a problem has optimal substructure and overlapping subproblems.',
   'Common patterns: Fibonacci, knapsack, longest common subsequence, matrix chain, edit distance.'
  ],
  'DP is like a student studying for exams. Instead of re-learning a topic from scratch each time, they take notes (memoization). When a similar question appears, they check their notes instead of recalculating. Bottom-up DP is like building a study guide from basics to advanced step by step.',
  [
    d('Top-Down (Memoization)', 'Recursive approach with caching. Start with full problem. Recursively solve subproblems. Store results in cache. Check cache before computing. Pros: only computes needed subproblems. Cons: recursion overhead, stack overflow.'),
    d('Bottom-Up (Tabulation)', 'Iterative approach building from base cases. Fill table starting from smallest subproblems. Use computed values to compute larger ones. Usually loops and arrays. Pros: no recursion. Cons: computes all subproblems.'),
    d('DP Problem Identification', 'Optimal substructure: solution depends on optimal solutions to subproblems. Overlapping subproblems: same subproblems solved multiple times. Classic signs: "minimum/maximum", "number of ways".'),
    d('DP Patterns', '0/1 Knapsack: include/exclude. Unbounded Knapsack: unlimited items. LCS: match/mismatch. LIS: increasing subsequence. DP on trees: DFS with return values. DP on grids: paths.')
  ],
  'DP is about recognizing problems with overlapping subproblems and optimal substructure. Start with recursive brute force, add memoization (top-down), then convert to iterative (bottom-up). The hardest part is identifying the state and recurrence relation.',
  [
    q('What is Dynamic Programming?', 'Solving problems by breaking into overlapping subproblems and storing results.'),
    q('What are the two DP approaches?', 'Top-down (memoization) and bottom-up (tabulation).'),
    q('What are the preconditions for DP?', 'Optimal substructure and overlapping subproblems.'),
    q('What is optimal substructure?', 'Optimal solution from optimal solutions of its subproblems.'),
    q('What is overlapping subproblems?', 'Same subproblems solved multiple times in naive recursion.'),
    q('What is memoization?', 'Storing computed subproblem results to avoid redundant computation.'),
    q('What is tabulation?', 'Building a table iteratively from base cases to final solution.'),
    q('Difference between DP and divide and conquer?', 'D&C divides into non-overlapping subproblems. DP has overlapping subproblems.'),
    q('Space optimization technique in DP?', 'Using only previous row/columns instead of full table.'),
    q('What is the time complexity of DP with n states?', 'O(n * transition cost).')
  ],
  R(10,35,110,25,'#0070f3','','Problem','Solve(n)') +
  A(120,48,150,48) + A(120,55,150,72) +
  R(160,35,100,25,'#28a745','','Subproblem 1','n-1') +
  R(160,65,100,25,'#ffc107','','Subproblem 2','n-2') +
  A(210,48,210,65) + A(210,78,210,100) +
  R(10,100,100,25,'#dc3545','','Memo Cache','Store results') +
  R(10,130,100,25,'#e83e8c','','Base Cases','n=0, n=1') +
  R(10,160,100,25,'#6610f2','','Bottom-Up','Table filling') +
  R(290,35,190,150,'#17a2b8','','Dynamic Programming','Optimal substructure + overlapping subproblems.') +
  T(240,220,'DP: Solve complex problems via overlapping subproblems. Memoization or Tabulation.',9,'#666','middle'),
  [
    e('Fibonacci (Top-Down)', 'Memoization approach.', codeBlock([
      'function fib(n, memo = {}) {',
      '  if (n <= 1) return n;',
      '  if (memo[n] !== undefined) return memo[n];',
      '  memo[n] = fib(n-1, memo) + fib(n-2, memo); return memo[n];',
      '}'
    ]), 'Fibonacci with memoization: O(n) time vs O(2^n).'),
    e('Fibonacci (Bottom-Up)', 'Tabulation approach.', codeBlock([
      'function fib(n) {',
      '  if (n <= 1) return n;',
      '  let a = 0, b = 1;',
      '  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];',
      '  return b;',
      '}'
    ]), 'Fibonacci bottom-up: O(n) time, O(1) space.'),
    e('Coin Change (Min Coins)', 'Unbounded knapsack DP.', codeBlock([
      'function coinChange(coins, amount) {',
      '  const dp = new Array(amount + 1).fill(Infinity); dp[0] = 0;',
      '  for (let i = 1; i <= amount; i++)',
      '    for (const coin of coins)',
      '      if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1);',
      '  return dp[amount] === Infinity ? -1 : dp[amount];',
      '}'
    ]), 'Coin change min coins O(amount * coins).'),
    e('Longest Common Subsequence', 'LCS DP.', codeBlock([
      'function longestCommonSubsequence(text1, text2) {',
      '  const m = text1.length, n = text2.length;',
      '  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));',
      '  for (let i = 1; i <= m; i++)',
      '    for (let j = 1; j <= n; j++)',
      '      if (text1[i-1] === text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;',
      '      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);',
      '  return dp[m][n];',
      '}'
    ]), 'LCS O(m*n) DP.'),
    e('Unique Paths', 'Grid DP.', codeBlock([
      'function uniquePaths(m, n) {',
      '  const dp = Array.from({length: m}, () => new Array(n).fill(1));',
      '  for (let i = 1; i < m; i++)',
      '    for (let j = 1; j < n; j++)',
      '      dp[i][j] = dp[i-1][j] + dp[i][j-1];',
      '  return dp[m-1][n-1];',
      '}'
    ]), 'Grid DP O(m*n) number of paths.')
  ],
  [
    m('What does DP stand for?', ['Dynamic Programming', 'Direct Processing', 'Data Propagation', 'Distributed Processing'], 0, 'Dynamic Programming.'),
    m('What are the two DP approaches?', ['Left-right, right-left', 'Top-down, bottom-up', 'Forward, backward', 'Linear, binary'], 1, 'Top-down (memoization) and bottom-up (tabulation).'),
    m('What is required for DP?', ['Optimal substructure + overlapping subproblems', 'Greedy choice property', 'Divide and conquer', 'Recursion only'], 0, 'Optimal substructure and overlapping subproblems.'),
    m('What is memoization?', ['Cache subproblem results', 'Iterative table filling', 'Divide and conquer', 'Memo writing'], 0, 'Memoization caches subproblem results.'),
    m('Space optimization in DP?', ['Use only previous row', 'Use 2D table', 'Use linked list', 'Use hash table'], 0, 'Store only previous row/column when possible.'),
    m('Time complexity of Fibonacci DP?', ['O(2^n)', 'O(n)', 'O(log n)', 'O(n^2)'], 1, 'Fibonacci DP: O(n) time.')
  ]
);

/* =================== TOPIC 14: Recursion =================== */
addTopic('dsa-recursion', 'Recursion', 'intermediate', 20,
  ['Recursion is a technique where a function calls itself to solve smaller instances of the same problem.',
   'Every recursive function needs: base case (terminates recursion) and recursive case (calls itself with smaller input).',
   'Recursion uses the call stack \u2014 each call pushes a frame. Stack overflow if recursion is too deep.',
   'Recursion is elegant for problems with self-similar structure: trees, divide and conquer, backtracking.'
  ],
  'Recursion is like standing between two mirrors \u2014 you see infinite reflections of yourself. In programming, a function is recursive when it calls itself. The base case is like a mirror at the end of a hall that does not reflect \u2014 it stops the infinite loop.',
  [
    d('Base Case and Recursive Case', 'Base case: simplest input returning directly. Prevents infinite recursion. Recursive case: function calls itself with modified arguments converging toward base case.'),
    d('Call Stack Mechanics', 'Each recursive call pushes a new stack frame. When base case is reached, frames are popped in reverse order (unwinding). Deep recursion can exhaust stack memory.'),
    d('Recursion vs Iteration', 'Recursion: elegant, self-documenting. Higher memory (call stack). Risk of stack overflow. Iteration: efficient, lower memory, no stack risk. Choose recursion for trees, D&C, backtracking.'),
    d('Common Recursion Patterns', 'Linear: single recursive call (factorial). Binary: two recursive calls (Fibonacci, trees). Divide and Conquer: split, recurse, combine. Tail recursion: last operation is recursive call.')
  ],
  'Recursion is a fundamental problem-solving technique. Identify the base case first, then the recursive relation. Trace the call stack for small inputs. Recursion shines for tree traversal, divide and conquer, and backtracking. Be aware of stack limits.',
  [
    q('What is recursion?', 'A function that calls itself to solve smaller instances of the same problem.'),
    q('What are the two essential parts of recursion?', 'Base case (termination) and recursive case (self-call with smaller input).'),
    q('What happens if there is no base case?', 'Infinite recursion leading to stack overflow.'),
    q('What data structure does recursion use implicitly?', 'The call stack.'),
    q('What is the difference between recursion and iteration?', 'Recursion uses call stack (more memory) but is often more elegant. Iteration uses loops (less memory).'),
    q('What is tail recursion?', 'A recursive call that is the last operation in the function.'),
    q('What is the time complexity of recursive Fibonacci?', 'O(2^n) without memoization, O(n) with memoization.'),
    q('What is divide and conquer?', 'A recursive pattern: divide problem, recurse on each part, combine results.'),
    q('What is backtracking?', 'A recursive technique to explore all possibilities, undoing choices that lead to dead ends.'),
    q('What is mutual recursion?', 'Two or more functions calling each other recursively.')
  ],
  R(10,35,110,25,'#0070f3','','Function','fib(n)') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Calls','fib(n-1)') +
  A(270,48,300,48) +
  R(310,35,110,25,'#ffc107','','Calls','fib(n-2)') +
  A(310,60,310,80) +
  R(10,100,110,25,'#dc3545','','Base Case','n <= 1') +
  R(10,130,110,25,'#e83e8c','','Stack Frame','Local vars') +
  R(10,160,110,25,'#6610f2','','Unwind','Return values') +
  R(300,100,180,85,'#17a2b8','','Recursion','Function calls itself. Base case + recursive case.') +
  T(240,220,'Recursion: Function calls itself. Base case terminates. Stack-based. Elegant for trees, D&C.',9,'#666','middle'),
  [
    e('Factorial (Recursive)', 'Linear recursion.', codeBlock([
      'function factorial(n) {',
      '  if (n <= 1) return 1;',
      '  return n * factorial(n - 1);',
      '}'
    ]), 'Linear recursion O(n) time, O(n) stack space.'),
    e('Fibonacci (Recursive)', 'Binary recursion.', codeBlock([
      'function fib(n) {',
      '  if (n <= 1) return n;',
      '  return fib(n-1) + fib(n-2);',
      '}'
    ]), 'Binary recursion O(2^n) without memoization.'),
    e('Power (Exponentiation)', 'Recursive exponentiation.', codeBlock([
      'function power(x, n) {',
      '  if (n === 0) return 1;',
      '  if (n % 2 === 0) { const half = power(x, n/2); return half * half; }',
      '  return x * power(x, n-1);',
      '}'
    ]), 'Fast exponentiation O(log n).'),
    e('Tower of Hanoi', 'Classic recursion problem.', codeBlock([
      'function towerOfHanoi(n, from, to, aux) {',
      '  if (n === 1) { console.log(`Move disk 1 ${from} -> ${to}`); return; }',
      '  towerOfHanoi(n-1, from, aux, to);',
      '  console.log(`Move disk ${n} ${from} -> ${to}`);',
      '  towerOfHanoi(n-1, aux, to, from);',
      '}'
    ]), 'Tower of Hanoi O(2^n).'),
    e('Generate Subsets', 'Recursive subset generation.', codeBlock([
      'function subsets(nums) {',
      '  const result = [];',
      '  function backtrack(start, curr) {',
      '    result.push([...curr]);',
      '    for (let i = start; i < nums.length; i++) {',
      '      curr.push(nums[i]);',
      '      backtrack(i + 1, curr);',
      '      curr.pop();',
      '    }',
      '  }',
      '  backtrack(0, []); return result;',
      '}'
    ]), 'Generate all subsets O(n * 2^n).')
  ],
  [
    m('What is recursion?', ['Function calling itself', 'Function calling another', 'Loop iteration', 'Array mapping'], 0, 'Recursion = function calls itself.'),
    m('What terminates recursion?', ['Loop counter', 'Base case', 'Return statement', 'Break keyword'], 1, 'Base case terminates recursion.'),
    m('Data structure used by recursion?', ['Queue', 'Stack', 'Heap', 'Linked list'], 1, 'Call stack.'),
    m('What is tail recursion?', ['First operation is recursive call', 'Last operation is recursive call', 'Middle operation', 'No recursion'], 1, 'Tail recursion: recursive call is the last operation.'),
    m('Time of Fibonacci without memo?', ['O(n)', 'O(log n)', 'O(2^n)', 'O(n^2)'], 2, 'O(2^n) exponential.'),
    m('What is divide and conquer?', ['Same as dynamic programming', 'Divide, recurse, combine', 'Iterative approach', 'Greedy algorithm'], 1, 'Divide and conquer: divide, recurse on parts, combine.')
  ]
);

/* =================== TOPIC 15: Backtracking =================== */
addTopic('dsa-backtracking', 'Backtracking', 'advanced', 25,
  ['Backtracking is a recursive technique for solving problems by trying all possible candidates and abandoning (backtracking) those that fail.',
   'Key components: choice (decisions at each step), constraints (rules limiting choices), goal (condition to stop).',
   'Backtracking explores a state space tree. Pruning (branch and bound) cuts branches that cannot lead to a solution.',
   'Time complexity is often exponential (O(2^n), O(n!)) \u2014 pruning is essential for performance.'
  ],
  'Backtracking is like solving a maze with a piece of string. At each intersection (decision point), you pick a path (choice). If you hit a dead end, you retrace your steps (backtrack) and try the next path. The string ensures you never try the same path twice.',
  [
    d('Backtracking Algorithm Template', '1. If goal reached, record solution. 2. For each valid choice: make the choice, recursively explore, undo the choice (backtrack). This is known as "choose, explore, unchoose" pattern.'),
    d('Pruning (Branch and Bound)', 'Eliminate branches that cannot lead to a valid solution. Use constraints to cut early. Example: in N-Queens, don\'t place queens on attacked squares. Pruning transforms exponential into feasible.'),
    d('Backtracking vs Brute Force', 'Brute force generates all possibilities then checks constraints. Backtracking checks constraints DURING construction \u2014 pruning invalid branches early. Both exponential worst case, but backtracking is much faster in practice.'),
    d('Applications', 'N-Queens, Sudoku solver, Permutations/Combinations, Subset sum, Graph coloring, Hamiltonian path, Crossword puzzles, Constraint satisfaction problems.')
  ],
  'Backtracking systematically searches for solutions by building candidates incrementally. The "choose, explore, unchoose" pattern is the foundation. Pruning is critical \u2014 cut branches as early as possible. Master backtracking for permutation, combination, and constraint satisfaction problems.',
  [
    q('What is backtracking?', 'A recursive technique that explores all candidates by making choices and undoing (backtracking) those that fail.'),
    q('What are the three key components?', 'Choice (decisions), Constraints (rules), Goal (condition to stop).'),
    q('What is the "choose, explore, unchoose" pattern?', 'Make a choice, recursively explore, undo the choice to try alternatives.'),
    q('What is pruning in backtracking?', 'Cutting branches that cannot lead to a valid solution \u2014 improves performance.'),
    q('What is the time complexity of backtracking?', 'Often exponential (O(2^n), O(n!)) \u2014 pruning reduces practical runtime.'),
    q('What is the difference between backtracking and brute force?', 'Backtracking prunes invalid branches during construction. Brute force generates all then checks.'),
    q('What is N-Queens problem?', 'Place N queens on NxN board so no two attack each other.'),
    q('What is Sudoku solved with?', 'Backtracking with constraint propagation.'),
    q('What data structure is commonly used?', 'Recursion (call stack) for state tracking.'),
    q('What is a state space tree?', 'Tree representing all possible states/choices in the search space.')
  ],
  R(10,35,110,25,'#0070f3','','Choose','Make decision') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Explore','Recurse deeper') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Validate','Check constraints') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Dead End?','Backtrack!') +
  A(270,83,300,83) +
  R(310,70,110,25,'#e83e8c','','Unchoose','Undo decision') +
  R(10,105,110,25,'#6610f2','','Prune','Cut bad branches') +
  R(10,140,110,25,'#17a2b8','','Solution','Goal reached') +
  R(300,100,180,85,'#17a2b8','','Backtracking','Choose, Explore, Unchoose. Pruning is essential for performance.') +
  T(240,220,'Backtracking: Recursive search with pruning. N-Queens, Sudoku, permutations.',9,'#666','middle'),
  [
    e('Generate Permutations', 'Backtracking permutations.', codeBlock([
      'function permute(nums) {',
      '  const result = [];',
      '  function backtrack(path, used) {',
      '    if (path.length === nums.length) { result.push([...path]); return; }',
      '    for (let i = 0; i < nums.length; i++) {',
      '      if (used[i]) continue;',
      '      used[i] = true; path.push(nums[i]);',
      '      backtrack(path, used);',
      '      path.pop(); used[i] = false;',
      '    }',
      '  }',
      '  backtrack([], []); return result;',
      '}'
    ]), 'Generate all permutations O(n * n!).'),
    e('N-Queens', 'Place N queens on NxN board.', codeBlock([
      'function solveNQueens(n) {',
      '  const result = [];',
      '  function backtrack(board, row) {',
      '    if (row === n) { result.push(board.map(r => r.join(""))); return; }',
      '    for (let col = 0; col < n; col++) {',
      '      if (isSafe(board, row, col)) {',
      '        board[row][col] = "Q";',
      '        backtrack(board, row + 1);',
      '        board[row][col] = ".";',
      '      }',
      '    }',
      '  }',
      '  function isSafe(board, row, col) {',
      '    for (let i = 0; i < row; i++) {',
      '      if (board[i][col] === "Q") return false;',
      '      if (col - (row - i) >= 0 && board[i][col - (row - i)] === "Q") return false;',
      '      if (col + (row - i) < n && board[i][col + (row - i)] === "Q") return false;',
      '    }',
      '    return true;',
      '  }',
      '  const board = Array.from({length: n}, () => new Array(n).fill("."));',
      '  backtrack(board, 0); return result;',
      '}'
    ]), 'N-Queens backtracking with constraint checks.'),
    e('Subset Sum', 'Find subset with target sum.', codeBlock([
      'function subsetSum(nums, target) {',
      '  const result = [];',
      '  function backtrack(start, curr, sum) {',
      '    if (sum === target) { result.push([...curr]); return; }',
      '    if (sum > target || start >= nums.length) return;',
      '    for (let i = start; i < nums.length; i++) {',
      '      curr.push(nums[i]);',
      '      backtrack(i + 1, curr, sum + nums[i]);',
      '      curr.pop();',
      '    }',
      '  }',
      '  backtrack(0, [], 0); return result;',
      '}'
    ]), 'Subset sum with pruning (sum > target).'),
    e('Combination Sum', 'Unlimited candidates.', codeBlock([
      'function combinationSum(candidates, target) {',
      '  const result = [];',
      '  function backtrack(start, curr, sum) {',
      '    if (sum === target) { result.push([...curr]); return; }',
      '    if (sum > target) return;',
      '    for (let i = start; i < candidates.length; i++) {',
      '      curr.push(candidates[i]);',
      '      backtrack(i, curr, sum + candidates[i]);',
      '      curr.pop();',
      '    }',
      '  }',
      '  backtrack(0, [], 0); return result;',
      '}'
    ]), 'Combination sum with unlimited use of candidates.'),
    e('Sudoku Solver', 'Backtracking for Sudoku.', codeBlock([
      'function solveSudoku(board) {',
      '  function isValid(board, row, col, num) {',
      '    for (let i = 0; i < 9; i++) {',
      '      if (board[row][i] === num) return false;',
      '      if (board[i][col] === num) return false;',
      '      const br = 3 * Math.floor(row/3) + Math.floor(i/3);',
      '      const bc = 3 * Math.floor(col/3) + i % 3;',
      '      if (board[br][bc] === num) return false;',
      '    }',
      '    return true;',
      '  }',
      '  function solve() {',
      '    for (let r = 0; r < 9; r++)',
      '      for (let c = 0; c < 9; c++)',
      '        if (board[r][c] === ".") {',
      '          for (let num = 1; num <= 9; num++) {',
      '            if (isValid(board, r, c, num.toString())) {',
      '              board[r][c] = num.toString();',
      '              if (solve()) return true;',
      '              board[r][c] = ".";',
      '            }',
      '          }',
      '          return false;',
      '        }',
      '    return true;',
      '  }',
      '  solve(); return board;',
      '}'
    ]), 'Sudoku solver using backtracking with constraint propagation.')
  ],
  [
    m('What is backtracking?', ['Brute force all', 'Recursive search with pruning', 'Iterative loop', 'Greedy choice'], 1, 'Recursive search exploring candidates with pruning.'),
    m('What is the core pattern?', ['Choose, explore, unchoose', 'Divide and conquer', 'BFS traversal', 'Dynamic programming'], 0, 'Choose, explore, unchoose.'),
    m('What is pruning?', ['Cutting invalid branches', 'Sorting data', 'Memoization', 'Randomization'], 0, 'Pruning cuts branches that cannot lead to solution.'),
    m('Time complexity of backtracking?', ['O(n)', 'O(log n)', 'O(n!)', 'O(1)'], 2, 'Often exponential (O(n!), O(2^n)).'),
    m('What problem places N queens?', ['N-Queens', 'Sudoku', 'Hamiltonian path', 'Graph coloring'], 0, 'N-Queens problem.'),
    m('What does "unchoose" mean?', ['Undo the last choice', 'Make new choice', 'Skip choice', 'Finalize choice'], 0, 'Undo the last decision to try alternatives.')
  ]
);

/* =================== TOPIC 16: Greedy Algorithms =================== */
addTopic('dsa-greedy', 'Greedy Algorithms', 'intermediate', 20,
  ['Greedy algorithms make the locally optimal choice at each step, hoping to find the global optimum.',
   'Not all problems can be solved greedily \u2014 the problem must have the greedy choice property and optimal substructure.',
   'Greedy does not have overlapping subproblems (unlike DP). It makes one pass, never revisits decisions.',
   'Classic greedy problems: Fractional Knapsack, Activity Selection, Huffman Coding, Dijkstra\'s algorithm.'
  ],
  'A greedy algorithm is like a hiker who always takes the steepest path up the mountain. At each step, they choose what looks best right now without considering future consequences. Sometimes this reaches the peak (global optimum), sometimes it gets stuck on a smaller hill (local optimum).',
  [
    d('Greedy Choice Property', 'A globally optimal solution can be arrived at by making a locally optimal (greedy) choice. You never need to reconsider previous choices. Proof technique: exchange argument \u2014 show any optimal solution can be transformed to the greedy one without worsening.'),
    d('Greedy vs DP', 'Greedy: one pass, no subproblem overlap, makes decision once, faster O(n log n) typically. DP: considers all options, overlapping subproblems, may revisit decisions, O(n^2) or more. If greedy works, it is almost always the better choice.'),
    d('Interval Scheduling (Activity Selection)', 'Given start/end times, select maximum non-overlapping activities. Greedy: sort by end time, always pick the activity with earliest finish that doesn\'t conflict. Optimal because picking earlier finish leaves more room for others.'),
    d('Applications', 'Activity selection, Fractional knapsack, Huffman coding, Dijkstra, Prim\'s MST, Kruskal\'s MST, Coin change (canonical systems), Job sequencing with deadlines, Minimum spanning tree.')
  ],
  'Greedy algorithms are simple and efficient when applicable. The key is proving the greedy choice property. Use greedy when making the locally best choice leads to the global optimum. Check exchange argument. When unsure, DP is safer but slower.',
  [
    q('What is a greedy algorithm?', 'Makes the locally optimal choice at each step, hoping to find the global optimum.'),
    q('What is the greedy choice property?', 'A global optimum can be reached by making locally optimal choices at each step.'),
    q('What is the difference between greedy and DP?', 'Greedy: one pass, no reconsideration. DP: considers all options, revisits decisions.'),
    q('When does greedy fail?', 'When a locally optimal choice does not lead to a globally optimal solution.'),
    q('What is the classic activity selection greedy?', 'Sort by end time, pick non-conflicting activities with earliest finish.'),
    q('What is Fractional Knapsack?', 'Items can be divided. Greedy: take highest value/weight ratio first. O(n log n).'),
    q('What algorithm uses greedy for compression?', 'Huffman coding \u2014 merges lowest frequency characters first.'),
    q('What is Dijkstra\'s algorithm?', 'Greedy shortest path \u2014 always visit the closest unvisited vertex.'),
    q('What is Prim\'s algorithm?', 'Greedy MST \u2014 adds the cheapest edge connecting visited to unvisited.'),
    q('What is an exchange argument?', 'Proof technique showing any optimal solution can be transformed to the greedy one.')
  ],
  R(10,35,110,25,'#0070f3','','Items','Sorted by value') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','Pick Best','Local choice') +
  A(260,48,290,48) +
  R(300,35,100,25,'#ffc107','','Next Best','Keep going') +
  R(10,70,110,25,'#dc3545','','DP vs Greedy','Greedy: one pass') +
  R(10,100,110,25,'#e83e8c','','Exchange Arg','Proof technique') +
  R(10,130,110,25,'#6610f2','','Optimal?','If true, greedy works') +
  R(10,160,110,25,'#17a2b8','','Fallback: DP','If greedy fails') +
  R(300,70,140,115,'#17a2b8','','Greedy Algorithm','Local optimum -> global optimum. Fast O(n log n). Exchange argument proof.') +
  T(240,220,'Greedy: Locally optimal choices. Activity selection, Huffman, Dijkstra.',9,'#666','middle'),
  [
    e('Activity Selection', 'Maximum non-overlapping activities.', codeBlock([
      'function activitySelection(activities) {',
      '  activities.sort((a, b) => a.end - b.end);',
      '  const selected = [activities[0]];',
      '  let lastEnd = activities[0].end;',
      '  for (let i = 1; i < activities.length; i++) {',
      '    if (activities[i].start >= lastEnd) { selected.push(activities[i]); lastEnd = activities[i].end; }',
      '  }',
      '  return selected;',
      '}'
    ]), 'Activity selection O(n log n) greedy by end time.'),
    e('Fractional Knapsack', 'Take highest value/weight ratio.', codeBlock([
      'function fractionalKnapsack(items, capacity) {',
      '  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));',
      '  let total = 0;',
      '  for (const item of items) {',
      '    if (capacity >= item.weight) { total += item.value; capacity -= item.weight; }',
      '    else { total += (capacity / item.weight) * item.value; break; }',
      '  }',
      '  return total;',
      '}'
    ]), 'Fractional knapsack O(n log n).'),
    e('Jump Game', 'Can you reach the end?', codeBlock([
      'function canJump(nums) {',
      '  let maxReach = 0;',
      '  for (let i = 0; i < nums.length; i++) {',
      '    if (i > maxReach) return false;',
      '    maxReach = Math.max(maxReach, i + nums[i]);',
      '  }',
      '  return true;',
      '}'
    ]), 'Jump game greedy O(n).'),
    e('Minimum Coins (Canonical)', 'Greedy coin change.', codeBlock([
      'function minCoins(coins, amount) {',
      '  coins.sort((a, b) => b - a);',
      '  let count = 0;',
      '  for (const coin of coins) {',
      '    if (amount >= coin) { count += Math.floor(amount / coin); amount %= coin; }',
      '  }',
      '  return amount === 0 ? count : -1;',
      '}'
    ]), 'Greedy coin change for canonical systems (US coins).'),
    e('Gas Station', 'Circular gas station tour.', codeBlock([
      'function canCompleteCircuit(gas, cost) {',
      '  let total = 0, curr = 0, start = 0;',
      '  for (let i = 0; i < gas.length; i++) {',
      '    total += gas[i] - cost[i]; curr += gas[i] - cost[i];',
      '    if (curr < 0) { start = i + 1; curr = 0; }',
      '  }',
      '  return total >= 0 ? start : -1;',
      '}'
    ]), 'Gas station greedy O(n).')
  ],
  [
    m('What is a greedy algorithm?', ['Local optimal choice', 'Global search', 'Random decision', 'Brute force'], 0, 'Local optimal choice at each step.'),
    m('Greedy vs DP?', ['Greedy one pass, DP explores all', 'Same', 'Greedy slower', 'DP one pass'], 0, 'Greedy: one pass no reconsideration. DP: explores all.'),
    m('What sorts activities for greedy?', ['Start time', 'End time', 'Duration', 'Name'], 1, 'Sort by end time for activity selection.'),
    m('What is Fractional Knapsack greedy?', ['Highest weight first', 'Highest value/weight ratio first', 'Lowest weight first', 'Random'], 1, 'Highest value/weight ratio first.'),
    m('When does greedy fail?', ['Always works', 'When local -> global not guaranteed', 'Only for small inputs', 'Never fails'], 1, 'Fails when local optimum does not lead to global optimum.'),
    m('Proof technique for greedy?', ['Induction', 'Exchange argument', 'Contradiction', 'Case analysis'], 1, 'Exchange argument shows any optimal can be made greedy.')
  ]
);

/* =================== TOPIC 17: Divide and Conquer =================== */
addTopic('dsa-divide-conquer', 'Divide and Conquer', 'intermediate', 20,
  ['Divide and Conquer (D&C) recursively breaks a problem into independent subproblems, solves them, and combines results.',
   'Three steps: Divide (split into subproblems), Conquer (solve subproblems recursively), Combine (merge results).',
   'Unlike DP, D&C subproblems are independent (non-overlapping). Classic examples: MergeSort, QuickSort, Binary Search.',
   'Time complexity: typically O(n log n) for divide-and-conquer algorithms like MergeSort and QuickSort.'
  ],
  'Divide and Conquer is like organizing a large group project. The manager divides the work into independent tasks, assigns each to a team (conquer), then combines the results into the final deliverable (combine). Each team works independently without needing to coordinate.',
  [
    d('D&C vs DP', 'D&C: subproblems are independent (non-overlapping). No memoization needed. Examples: MergeSort, QuickSort, Binary Search. DP: subproblems overlap. Memoization or tabulation needed. Examples: Fibonacci, LCS, Knapsack.'),
    d('Master Theorem', 'T(n) = aT(n/b) + f(n). a: number of subproblems. b: factor input shrinks. f(n): cost of divide+combine. Three cases compare f(n) to n^(log_b a). Used to analyze D&C recurrence relations.'),
    d('MergeSort Analysis', 'Divide: O(1) find middle. Conquer: 2T(n/2) sort halves. Combine: O(n) merge. Recurrence: T(n) = 2T(n/2) + O(n). Master theorem case 2: O(n log n). Space: O(n) for merge.'),
    d('Applications', 'MergeSort (sorting), QuickSort (sorting), Binary Search (search), Closest Pair (geometry), Strassen (matrix multiplication), Karatsuba (multiplication), FFT (polynomials).')
  ],
  'Divide and Conquer is a powerful problem-solving paradigm. The key insight: independent subproblems make it efficient and easy to parallelize. Use Master Theorem for complexity analysis. MergeSort guarantees O(n log n). QuickSort is faster in practice but has O(n^2) worst case.',
  [
    q('What is Divide and Conquer?', 'A paradigm that recursively breaks a problem into independent subproblems, solves them, and combines results.'),
    q('What are the three steps?', 'Divide, Conquer, Combine.'),
    q('What is the difference between D&C and DP?', 'D&C: independent (non-overlapping) subproblems. DP: overlapping subproblems.'),
    q('What does the Master Theorem analyze?', 'Recurrence relations of the form T(n) = aT(n/b) + f(n).'),
    q('What is the recurrence for MergeSort?', 'T(n) = 2T(n/2) + O(n). Solved: O(n log n).'),
    q('What is QuickSort\'s worst case?', 'O(n^2) when pivot is min or max (already sorted array).'),
    q('What is the space complexity of MergeSort?', 'O(n) for the auxiliary merge array.'),
    q('What is Binary Search complexity?', 'O(log n) \u2014 T(n) = T(n/2) + O(1).'),
    q('What is Strassen\'s algorithm?', 'Matrix multiplication using D&C \u2014 O(n^2.81) vs naive O(n^3).'),
    q('What is the Closest Pair problem?', 'Find closest pair of points using D&C in O(n log n).')
  ],
  R(10,35,110,25,'#0070f3','','Input','Problem') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','Divide','Split') +
  A(160,60,160,80) + A(160,55,190,72) +
  R(10,70,100,25,'#ffc107','','Sub 1','Solve') +
  R(200,70,100,25,'#dc3545','','Sub 2','Solve') +
  A(60,95,60,120) + A(250,95,250,120) +
  R(10,130,100,25,'#e83e8c','','Result 1','') +
  R(200,130,100,25,'#6610f2','','Result 2','') +
  A(60,155,155,155) + A(250,155,155,155) +
  R(165,145,110,25,'#17a2b8','','Combine','Merge results') +
  T(240,220,'Divide and Conquer: Divide, Conquer (recurse), Combine. MergeSort O(n log n).',9,'#666','middle'),
  [
    e('MergeSort', 'O(n log n) divide and conquer sort.', codeBlock([
      'function mergeSort(arr) {',
      '  if (arr.length <= 1) return arr;',
      '  const mid = Math.floor(arr.length / 2);',
      '  const left = mergeSort(arr.slice(0, mid));',
      '  const right = mergeSort(arr.slice(mid));',
      '  return merge(left, right);',
      '}',
      'function merge(left, right) {',
      '  const result = [];',
      '  while (left.length && right.length)',
      '    result.push(left[0] < right[0] ? left.shift() : right.shift());',
      '  return [...result, ...left, ...right];',
      '}'
    ]), 'MergeSort O(n log n) with O(n) space.'),
    e('QuickSort (Lomuto)', 'In-place divide and conquer sort.', codeBlock([
      'function quickSort(arr, low = 0, high = arr.length - 1) {',
      '  if (low < high) {',
      '    const pi = partition(arr, low, high);',
      '    quickSort(arr, low, pi - 1);',
      '    quickSort(arr, pi + 1, high);',
      '  }',
      '  return arr;',
      '}',
      'function partition(arr, low, high) {',
      '  const pivot = arr[high];',
      '  let i = low - 1;',
      '  for (let j = low; j < high; j++)',
      '    if (arr[j] < pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }',
      '  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];',
      '  return i + 1;',
      '}'
    ]), 'QuickSort O(n log n) average, O(n^2) worst, O(log n) space.'),
    e('Binary Search', 'O(log n) search in sorted array.', codeBlock([
      'function binarySearch(arr, target) {',
      '  let left = 0, right = arr.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (arr[mid] === target) return mid;',
      '    if (arr[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return -1;',
      '}'
    ]), 'Binary search O(log n) iterative.'),
    e('Closest Pair of Points', 'D&C closest points.', codeBlock([
      'function closestPair(points) {',
      '  points.sort((a, b) => a.x - b.x);',
      '  function recurse(l, r) {',
      '    if (r - l <= 3) return bruteForce(points, l, r);',
      '    const mid = Math.floor((l + r) / 2);',
      '    const dLeft = recurse(l, mid);',
      '    const dRight = recurse(mid + 1, r);',
      '    let d = Math.min(dLeft, dRight);',
      '    const strip = [];',
      '    for (let i = l; i <= r; i++)',
      '      if (Math.abs(points[i].x - points[mid].x) < d) strip.push(points[i]);',
      '    strip.sort((a, b) => a.y - b.y);',
      '    for (let i = 0; i < strip.length; i++)',
      '      for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < d; j++)',
      '        d = Math.min(d, dist(strip[i], strip[j]));',
      '    return d;',
      '  }',
      '  return recurse(0, points.length - 1);',
      '}'
    ]), 'Closest pair O(n log n) D&C.'),
    e('Maximum Subarray (D&C)', 'D&C approach for max subarray.', codeBlock([
      'function maxSubArray(nums) {',
      '  function crossSum(l, m, r) {',
      '    let leftSum = -Infinity, sum = 0;',
      '    for (let i = m; i >= l; i--) { sum += nums[i]; leftSum = Math.max(leftSum, sum); }',
      '    let rightSum = -Infinity; sum = 0;',
      '    for (let i = m+1; i <= r; i++) { sum += nums[i]; rightSum = Math.max(rightSum, sum); }',
      '    return leftSum + rightSum;',
      '  }',
      '  function divide(l, r) {',
      '    if (l === r) return nums[l];',
      '    const m = Math.floor((l+r)/2);',
      '    return Math.max(divide(l,m), divide(m+1,r), crossSum(l,m,r));',
      '  }',
      '  return divide(0, nums.length-1);',
      '}'
    ]), 'Maximum subarray D&C O(n log n).')
  ],
  [
    m('What are the three D&C steps?', ['Input, Process, Output', 'Divide, Conquer, Combine', 'Split, Sort, Merge', 'Start, Loop, End'], 1, 'Divide, Conquer, Combine.'),
    m('Difference between D&C and DP?', ['D&C has overlapping subproblems', 'D&C has independent subproblems', 'Same', 'D&C uses memoization'], 1, 'D&C subproblems are independent.'),
    m('MergeSort recurrence?', ['T(n) = 2T(n/2) + O(1)', 'T(n) = 2T(n/2) + O(n)', 'T(n) = T(n-1) + O(n)', 'T(n) = T(n/2) + O(1)'], 1, 'T(n) = 2T(n/2) + O(n) -> O(n log n).'),
    m('QuickSort worst case?', ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'], 1, 'O(n^2) when pivot is extreme (sorted array).'),
    m('Binary Search recurrence?', ['T(n) = 2T(n/2) + O(1)', 'T(n) = T(n/2) + O(1)', 'T(n) = T(n-1) + O(1)', 'T(n) = 2T(n/2) + O(n)'], 1, 'T(n) = T(n/2) + O(1) -> O(log n).'),
    m('What analyzes D&C recurrences?', ['Master Theorem', 'Greedy choice', 'Exchange argument', 'Induction'], 0, 'Master Theorem analyzes D&C recurrences.')
  ]
);

/* =================== TOPIC 18: Sorting Algorithms =================== */
addTopic('dsa-sorting', 'Sorting Algorithms', 'intermediate', 20,
  ['Sorting arranges elements in a specific order (ascending/descending). Essential for efficient searching and data organization.',
   'Comparison-based sorts: Bubble, Selection, Insertion (O(n^2)), MergeSort, QuickSort, HeapSort (O(n log n)).',
   'Non-comparison sorts: Counting Sort, Radix Sort, Bucket Sort (O(n + k) linear in certain cases).',
   'Stable sorts preserve relative order of equal elements. In-place sorts use O(1) extra space.'
  ],
  'Sorting is like organizing a deck of cards. Each sorting algorithm is a different strategy. Insertion Sort: pick a card and insert it in the correct position. MergeSort: split the deck in half, sort each, then merge. QuickSort: pick a pivot card and arrange smaller cards before it, larger after.',
  [
    d('Comparison Sorts (O(n^2))', 'Bubble Sort: repeatedly swap adjacent elements O(n^2). Selection Sort: find minimum and place at front O(n^2). Insertion Sort: insert each element into sorted portion O(n^2) but O(n) for nearly sorted data.'),
    d('Comparison Sorts (O(n log n))', 'MergeSort: stable, O(n log n), O(n) space. QuickSort: in-place, O(n log n) average, O(n^2) worst. HeapSort: in-place, O(n log n), not stable. TimSort (Python/Java): hybrid of MergeSort and InsertionSort.'),
    d('Non-Comparison Sorts (Linear)', 'Counting Sort: count occurrences, O(n + k) where k is range. Radix Sort: sort by digits, O(d * (n + k)). Bucket Sort: distribute into buckets, sort each. All require specific data characteristics for linear time.'),
    d('Sorting Properties', 'Stable: Insertion, Merge, Bubble, Counting, TimSort. Unstable: QuickSort (Lomuto), HeapSort, Selection, ShellSort. In-place: Insertion, Selection, Bubble, QuickSort, HeapSort, ShellSort. Not in-place: MergeSort, Counting, Radix.')
  ],
  'Choose sorting algorithm based on data characteristics and requirements. For general-purpose, QuickSort is fastest in practice. Use MergeSort for stability. Use HeapSort when O(1) space needed. Use Counting/Radix for integers with limited range. Nearly sorted data: Insertion Sort is O(n).',
  [
    q('What is the best general-purpose sort?', 'QuickSort \\u2014 fastest in practice O(n log n) average.'),
    q('What is a stable sort?', 'A sort that preserves the relative order of equal elements.'),
    q('What is an in-place sort?', 'A sort using O(1) extra space (besides input).'),
    q('What is MergeSort\'s advantage?', 'Stable and guaranteed O(n log n).'),
    q('What is QuickSort\'s worst case?', 'O(n^2) when array is already sorted and pivot is first/last element.'),
    q('What is the space complexity of MergeSort?', 'O(n) for the auxiliary merge array.'),
    q('What sorting algorithm is O(n) for nearly sorted data?', 'Insertion Sort \\u2014 O(n) for nearly sorted arrays.'),
    q('When is Counting Sort used?', 'When the range of values (k) is small relative to n. O(n + k).'),
    q('What algorithm does JavaScript use?', 'TimSort (hybrid of MergeSort and InsertionSort), stable, O(n log n).'),
    q('What is HeapSort\'s space complexity?', 'O(1) \u2014 in-place sort.')
  ],
  R(10,35,100,25,'#0070f3','','Unsorted','[5,3,8,1,9]') +
  A(110,48,140,48) +
  R(150,35,120,25,'#28a745','','Bubble Sort','O(n^2)') +
  R(150,65,120,25,'#ffc107','','QuickSort','O(n log n)') +
  R(150,95,120,25,'#dc3545','','MergeSort','Stable O(n log n)') +
  R(150,125,120,25,'#e83e8c','','Counting Sort','O(n+k)') +
  R(150,155,120,25,'#6610f2','','HeapSort','In-place O(n log n)') +
  R(290,35,190,150,'#17a2b8','','Sorting Algorithms','Comparison: O(n^2) and O(n log n). Non-comparison: O(n+k). Stable vs in-place.') +
  T(240,220,'Sorting: Compare-based (O(n^2), O(n log n)) and non-comparison (O(n+k)). Stable vs in-place.',9,'#666','middle'),
  [
    e('Bubble Sort', 'Simple O(n^2) sort.', codeBlock([
      'function bubbleSort(arr) {',
      '  const n = arr.length;',
      '  for (let i = 0; i < n-1; i++)',
      '    for (let j = 0; j < n-i-1; j++)',
      '      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];',
      '  return arr;',
      '}'
    ]), 'Bubble Sort O(n^2) in-place stable.'),
    e('Selection Sort', 'Select minimum repeatedly.', codeBlock([
      'function selectionSort(arr) {',
      '  const n = arr.length;',
      '  for (let i = 0; i < n-1; i++) {',
      '    let minIdx = i;',
      '    for (let j = i+1; j < n; j++)',
      '      if (arr[j] < arr[minIdx]) minIdx = j;',
      '    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];',
      '  }',
      '  return arr;',
      '}'
    ]), 'Selection Sort O(n^2) in-place unstable.'),
    e('Insertion Sort', 'Insert into sorted portion.', codeBlock([
      'function insertionSort(arr) {',
      '  for (let i = 1; i < arr.length; i++) {',
      '    let key = arr[i], j = i - 1;',
      '    while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }',
      '    arr[j+1] = key;',
      '  }',
      '  return arr;',
      '}'
    ]), 'Insertion Sort O(n^2), O(n) for nearly sorted, stable.'),
    e('Counting Sort', 'Linear sort for small range.', codeBlock([
      'function countingSort(arr, maxVal) {',
      '  const count = new Array(maxVal + 1).fill(0);',
      '  for (const num of arr) count[num]++;',
      '  let idx = 0;',
      '  for (let i = 0; i <= maxVal; i++)',
      '    while (count[i] > 0) { arr[idx++] = i; count[i]--; }',
      '  return arr;',
      '}'
    ]), 'Counting Sort O(n+k) stable.'),
    e('QuickSort (Hoare Partition)', 'Faster partition scheme.', codeBlock([
      'function quickSortHoare(arr, low = 0, high = arr.length - 1) {',
      '  if (low < high) {',
      '    const pi = partition(arr, low, high);',
      '    quickSortHoare(arr, low, pi);',
      '    quickSortHoare(arr, pi + 1, high);',
      '  }',
      '  return arr;',
      '}',
      'function partition(arr, low, high) {',
      '  const pivot = arr[Math.floor((low + high) / 2)];',
      '  let i = low - 1, j = high + 1;',
      '  while (true) {',
      '    do { i++; } while (arr[i] < pivot);',
      '    do { j--; } while (arr[j] > pivot);',
      '    if (i >= j) return j;',
      '    [arr[i], arr[j]] = [arr[j], arr[i]];',
      '  }',
      '}'
    ]), 'QuickSort Hoare partition O(n log n) average.')
  ],
  [
    m('Best general-purpose sort?', ['Bubble Sort', 'QuickSort', 'Selection Sort', 'Counting Sort'], 1, 'QuickSort is fastest in practice.'),
    m('What is a stable sort?', ['Preserves equal element order', 'In-place', 'O(n log n)', 'Uses extra memory'], 0, 'Stable preserves relative order of equal elements.'),
    m('MergeSort space complexity?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 2, 'O(n) extra space for merge.'),
    m('QuickSort worst case?', ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'], 2, 'O(n^2) for sorted array with bad pivot.'),
    m('Which sort is O(n) for nearly sorted?', ['QuickSort', 'Insertion Sort', 'MergeSort', 'HeapSort'], 1, 'Insertion Sort O(n) for nearly sorted.'),
    m('Counting Sort works when?', ['Range is small', 'Range is large', 'Data is random', 'Data is sorted'], 0, 'When the range of values is small.')
  ]
);

/* =================== TOPIC 19: Searching Algorithms =================== */
addTopic('dsa-searching', 'Searching Algorithms', 'intermediate', 15,
  ['Searching finds the position of a target value within a collection of data.',
   'Linear Search: O(n) \u2014 checks each element sequentially. Works on unsorted data.',
   'Binary Search: O(log n) \u2014 repeatedly divides sorted array in half. Requires sorted input.',
   'Other search methods: Jump Search, Interpolation Search, Exponential Search, Ternary Search, Fibonacci Search.'
  ],
  'Searching is like finding a name in a list. Linear search is reading the list from top to bottom. Binary search is opening the phone book in the middle and deciding which half to check based on alphabet. Binary search is much faster but requires the list to be sorted.',
  [
    d('Linear Search', 'Sequential check of each element. O(n) time. Works on any data (unsorted or sorted). Simple to implement. Best for small arrays or unsorted data. Early exit if target found. One pass through data.'),
    d('Binary Search', 'Divide: find middle element. Compare: if target equals middle, return. If target < middle, search left half. If target > middle, search right half. O(log n). Requires sorted array. Can be iterative or recursive.'),
    d('Search Algorithms Comparison', 'Linear: O(n). Binary: O(log n). Jump: O(sqrt(n)). Interpolation: O(log log n) average, O(n) worst. Exponential: O(log n). Ternary: O(log_3 n) but more comparisons. Fibonacci: O(log n). Binary is the most practical for sorted arrays.'),
    d('Binary Search Variants', 'Find first/last occurrence (duplicates). Find closest element. Find insertion point. Search in rotated sorted array. Search in 2D matrix. Binary search on answer space (predicate-based).')
  ],
  'Binary search is the most important search algorithm for sorted data. Know the standard implementation and its variants (first/last occurrence, rotated array). Linear search is fine for unsorted data. Many problems reduce to binary search on the answer space.',
  [
    q('What is Linear Search?', 'Sequential check of each element. O(n) time complexity.'),
    q('What is Binary Search?', 'Divide-and-conquer search on sorted array. O(log n) time complexity.'),
    q('What is the prerequisite for Binary Search?', 'The array must be sorted.'),
    q('What is the recurrence for Binary Search?', 'T(n) = T(n/2) + O(1) \u2014 O(log n).'),
    q('What is Jump Search?', 'Jump by sqrt(n) blocks, then linear search within block. O(sqrt(n)).'),
    q('What is Interpolation Search?', 'Probe based on value distribution. O(log log n) average, O(n) worst.'),
    q('How do you find first occurrence in binary search?', 'Modify binary search: when found, continue searching left half.'),
    q('What is binary search on answer space?', 'Binary search on the range of possible answers rather than array indices.'),
    q('What is Exponential Search?', 'Find range by doubling, then binary search. O(log n).'),
    q('What is Ternary Search?', 'Divide into three parts. O(log_3 n) but more comparisons than binary.')
  ],
  R(10,35,110,25,'#0070f3','','Unsorted','Linear Search O(n)') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Sorted? Yes','Binary Search O(log n)') +
  R(10,70,110,25,'#ffc107','','Mid Element','Compare') +
  R(10,100,110,25,'#dc3545','','Left Half','< mid') +
  R(10,130,110,25,'#e83e8c','','Right Half','> mid') +
  R(10,160,110,25,'#6610f2','','Found!','Return index') +
  R(290,35,190,150,'#17a2b8','','Searching','Linear: O(n) unsorted. Binary: O(log n) sorted. Variants: first/last, rotated.') +
  T(240,220,'Searching: Linear (O(n)) vs Binary (O(log n)). Binary requires sorted array. Know variants.',9,'#666','middle'),
  [
    e('Linear Search', 'Sequential search.', codeBlock([
      'function linearSearch(arr, target) {',
      '  for (let i = 0; i < arr.length; i++)',
      '    if (arr[i] === target) return i;',
      '  return -1;',
      '}'
    ]), 'Linear search O(n).'),
    e('Binary Search (Iterative)', 'Standard binary search.', codeBlock([
      'function binarySearch(arr, target) {',
      '  let left = 0, right = arr.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (arr[mid] === target) return mid;',
      '    if (arr[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return -1;',
      '}'
    ]), 'Binary search O(log n) iterative.'),
    e('First/Last Occurrence', 'Binary search with duplicates.', codeBlock([
      'function firstOccurrence(arr, target) {',
      '  let left = 0, right = arr.length - 1, result = -1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (arr[mid] === target) { result = mid; right = mid - 1; }',
      '    else if (arr[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return result;',
      '}'
    ]), 'Find first occurrence using binary search.'),
    e('Search in Rotated Sorted Array', 'Binary search variant.', codeBlock([
      'function searchRotated(nums, target) {',
      '  let left = 0, right = nums.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (nums[mid] === target) return mid;',
      '    if (nums[left] <= nums[mid]) {',
      '      if (target >= nums[left] && target < nums[mid]) right = mid - 1;',
      '      else left = mid + 1;',
      '    } else {',
      '      if (target > nums[mid] && target <= nums[right]) left = mid + 1;',
      '      else right = mid - 1;',
      '    }',
      '  }',
      '  return -1;',
      '}'
    ]), 'Search in rotated sorted array O(log n).'),
    e('Binary Search on Answer', 'Predicate-based search.', codeBlock([
      'function sqrt(x) {',
      '  let left = 0, right = x;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    const sq = mid * mid;',
      '    if (sq === x) return mid;',
      '    if (sq < x) { left = mid + 1; }',
      '    else { right = mid - 1; }',
      '  }',
      '  return right;',
      '}'
    ]), 'Binary search on answer space for sqrt.'),
    e('Jump Search', 'Jump by sqrt(n).', codeBlock([
      'function jumpSearch(arr, target) {',
      '  const n = arr.length, step = Math.floor(Math.sqrt(n));',
      '  let prev = 0;',
      '  while (arr[Math.min(step, n) - 1] < target) { prev = step; step += Math.floor(Math.sqrt(n)); if (prev >= n) return -1; }',
      '  while (arr[prev] < target) { prev++; if (prev === Math.min(step, n)) return -1; }',
      '  return arr[prev] === target ? prev : -1;',
      '}'
    ]), 'Jump search O(sqrt(n)).')
  ],
  [
    m('Linear Search time?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 2, 'O(n).'),
    m('Binary Search time?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 1, 'O(log n).'),
    m('Prerequisite for binary search?', ['Sorted array', 'Unsorted array', 'Unique values', 'Integers only'], 0, 'Array must be sorted.'),
    m('Binary search recurrence?', ['T(n) = T(n/2) + O(1)', 'T(n) = 2T(n/2) + O(1)', 'T(n) = T(n-1) + O(1)', 'T(n) = 2T(n/2) + O(n)'], 0, 'T(n) = T(n/2) + O(1) -> O(log n).'),
    m('What search finds first occurrence?', ['Binary search with left bias', 'Linear search', 'Jump search', 'Interpolation'], 0, 'Modified binary search continuing left after match.'),
    m('Jump Search complexity?', ['O(log n)', 'O(sqrt(n))', 'O(n)', 'O(n log n)'], 1, 'O(sqrt(n)).')
  ]
);

/* =================== TOPIC 20: Two Pointers =================== */
addTopic('dsa-two-pointers', 'Two Pointers', 'intermediate', 15,
  ['Two Pointers is a technique using two pointers to traverse data (usually sorted array) in a single pass.',
   'Common patterns: opposite ends (toward each other), same direction (one fast, one slow), sliding window.',
   'Typically reduces O(n^2) brute force to O(n) time and O(1) space.',
   'Key applications: two-sum in sorted array, palindrome checking, removing duplicates, trapping rain water.'
  ],
  'Two Pointers is like two bookmarks in a book. One bookmark starts at the beginning, one at the end. You move them toward each other based on what you are looking for. This is much faster than checking every pair of pages (brute force).',
  [
    d('Opposite Ends (Colliding)', 'Left pointer at start, right pointer at end. Move toward each other. Use when you need pairs from a sorted array. Classic: two-sum sorted, container with most water, trapping rain water, palindrome check.'),
    d('Same Direction (Fast/Slow)', 'Both start at beginning. One moves faster than the other. Use for: removing duplicates, linked list cycle detection, find middle, partition arrays. Fast pointer explores ahead, slow pointer marks position.'),
    d('Two Pointers vs Hash Map', 'Two pointers: O(1) space, requires sorted array. Hash map: O(n) space, works on unsorted. Two pointers is better when space is constrained and sorting is acceptable.'),
    d('Applications', 'Two sum (sorted), 3Sum, 4Sum, container with most water, trapping rain water, remove duplicates, sort colors (Dutch flag), palindrome checking, merge sorted arrays.')
  ],
  'Two Pointers is a powerful O(n) technique for sorted arrays. Opposite ends for pair problems, same direction for partitioning/removal. Always consider if the problem can be solved by moving pointers based on some comparison.',
  [
    q('What is the Two Pointers technique?', 'Using two pointers to traverse data efficiently, often reducing O(n^2) to O(n).'),
    q('What are the two common patterns?', 'Opposite ends (colliding) and same direction (fast/slow).'),
    q('What is the space complexity of two pointers?', 'O(1) \u2014 no extra data structures needed.'),
    q('What requirement does two pointers often need?', 'Sorted array.'),
    q('What is the 3Sum problem?', 'Find all triplets summing to zero. Two pointers reduces O(n^3) to O(n^2).'),
    q('What problem uses fast and slow pointers?', 'Cycle detection in linked lists.'),
    q('What is the Dutch National Flag problem?', 'Sort three values using three pointers (0s, 1s, 2s).'),
    q('What is Container With Most Water?', 'Two pointers from ends, move the shorter line inward. O(n).'),
    q('How does two pointers solve two-sum sorted?', 'Left + right pointers. If sum < target, left++. If sum > target, right--.'),
    q('What is a common mistake with two pointers?', 'Not checking array bounds or off-by-one errors.')
  ],
  R(10,35,100,25,'#0070f3','','Left','Index 0') +
  A(110,48,140,48) + A(110,168,140,168) +
  R(150,35,100,25,'#28a745','','Sorted Array','[1,2,3,4,5,6]') +
  R(10,155,100,25,'#dc3545','','Right','Index n-1') +
  R(10,100,100,25,'#ffc107','','Sum < target?','Move right') +
  R(150,100,100,25,'#e83e8c','','Sum > target?','Move left') +
  R(10,130,100,25,'#6610f2','','Sum = target?','Found!') +
  R(290,35,190,150,'#17a2b8','','Two Pointers','Opposite ends: pair problems. Same direction: removal/partition. O(n) time, O(1) space.') +
  T(240,220,'Two Pointers: O(n) time, O(1) space. Pairs, removal, cycle detection.',9,'#666','middle'),
  [
    e('Two Sum (Sorted)', 'Opposite ends colliding.', codeBlock([
      'function twoSumSorted(nums, target) {',
      '  let left = 0, right = nums.length - 1;',
      '  while (left < right) {',
      '    const sum = nums[left] + nums[right];',
      '    if (sum === target) return [left, right];',
      '    if (sum < target) left++; else right--;',
      '  }',
      '  return [];',
      '}'
    ]), 'Two sum sorted O(n) O(1).'),
    e('Remove Duplicates', 'Fast/slow pointers.', codeBlock([
      'function removeDuplicates(nums) {',
      '  if (!nums.length) return 0;',
      '  let slow = 0;',
      '  for (let fast = 1; fast < nums.length; fast++)',
      '    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast];',
      '  return slow + 1;',
      '}'
    ]), 'Remove duplicates O(n) O(1).'),
    e('3Sum', 'Find triplets summing to zero.', codeBlock([
      'function threeSum(nums) {',
      '  nums.sort((a, b) => a - b);',
      '  const result = [];',
      '  for (let i = 0; i < nums.length - 2; i++) {',
      '    if (i > 0 && nums[i] === nums[i-1]) continue;',
      '    let left = i + 1, right = nums.length - 1;',
      '    while (left < right) {',
      '      const sum = nums[i] + nums[left] + nums[right];',
      '      if (sum === 0) { result.push([nums[i], nums[left], nums[right]]); while (left < right && nums[left] === nums[left+1]) left++; while (left < right && nums[right] === nums[right-1]) right--; left++; right--; }',
      '      else if (sum < 0) left++;',
      '      else right--;',
      '    }',
      '  }',
      '  return result;',
      '}'
    ]), '3Sum O(n^2) with two pointers.'),
    e('Container With Most Water', 'Opposite ends.', codeBlock([
      'function maxArea(height) {',
      '  let left = 0, right = height.length - 1, max = 0;',
      '  while (left < right) {',
      '    const area = Math.min(height[left], height[right]) * (right - left);',
      '    max = Math.max(max, area);',
      '    if (height[left] < height[right]) left++; else right--;',
      '  }',
      '  return max;',
      '}'
    ]), 'Container with most water O(n) O(1).'),
    e('Sort Colors (Dutch Flag)', 'Three pointer sort.', codeBlock([
      'function sortColors(nums) {',
      '  let low = 0, mid = 0, high = nums.length - 1;',
      '  while (mid <= high) {',
      '    if (nums[mid] === 0) { [nums[low], nums[mid]] = [nums[mid], nums[low]]; low++; mid++; }',
      '    else if (nums[mid] === 1) mid++;',
      '    else { [nums[mid], nums[high]] = [nums[high], nums[mid]]; high--; }',
      '  }',
      '}'
    ]), 'Dutch flag sort O(n) O(1) with three pointers.')
  ],
  [
    m('Two pointers reduces O(n^2) to?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 2, 'O(n) typical.'),
    m('Space complexity of two pointers?', ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'O(1) \u2014 no extra structures.'),
    m('What does two pointers often require?', ['Sorted array', 'Unsorted array', 'Hash set', 'Binary tree'], 0, 'Sorted array typically needed.'),
    m('How to move pointers for two sum?', ['Both left++', 'Both right--', 'Sum < target: left++', 'Random'], 2, 'If sum < target: left++. If sum > target: right--.'),
    m('What detects linked list cycles?', ['Opposite ends', 'Fast/slow pointers', 'Binary search', 'Two stacks'], 1, 'Fast/slow (Floyd) pointer technique.'),
    m('Dutch flag sorts how many values?', ['2', '3', '4', 'n'], 1, 'Three values (0, 1, 2) using three pointers.')
  ]
);

/* =================== TOPIC 21: Sliding Window =================== */
addTopic('dsa-sliding-window', 'Sliding Window', 'intermediate', 15,
  ['Sliding Window is a technique for processing arrays/lists by maintaining a window (subarray) that slides across the data.',
   'Fixed window: window size is constant. Variable window: window expands/shrinks based on conditions.',
   'Sliding window reduces O(n^2) brute force to O(n) time and often O(1) or O(k) space.',
   'Key applications: maximum subarray sum, longest substring without repeating characters, minimum window substring.'
  ],
  'Sliding Window is like looking through a moving frame at a landscape painting. Instead of looking at every possible rectangle (O(n^2)), you slide the frame across and update only what changes at the edges. This is much faster.',
  [
    d('Fixed Window', 'Window size k is predetermined. Slide one step at a time. Compute: add new element (right), remove old element (left). Classic: maximum sum of subarray of size k, max sliding window, average of subarrays.'),
    d('Variable (Dynamic) Window', 'Window expands (right++) until condition is met, then contracts (left++) to maintain condition. Classic: longest substring without repeating, minimum window substring, smallest subarray with sum >= target.'),
    d('Sliding Window vs Two Pointers', 'Sliding window usually involves a window/subarray. Two pointers often focus on two positions/elements. Sliding window maintains a contiguous range. Both use two indices but have different problem domains.'),
    d('Applications', 'Maximum sum subarray (fixed k). Longest substring without repeating chars. Minimum window substring. Maximum average subarray. String anagrams/substring search. Fruit basket problem.')
  ],
  'Sliding Window is one of the most powerful O(n) patterns. Fixed window: maintain sum/count, slide right, remove left. Variable window: expand right until condition breaks, then contract left. Always track window state to avoid recomputation.',
  [
    q('What is Sliding Window?', 'A technique maintaining a window (subarray) that slides across data for O(n) processing.'),
    q('What are the two types?', 'Fixed window (constant size) and variable window (expands/shrinks).'),
    q('What does sliding window reduce?', 'O(n^2) brute force to O(n).'),
    q('How does fixed window work?', 'Slide right by 1, add new element, remove left element. O(n).'),
    q('How does variable window work?', 'Expand right until condition violated, then contract left until condition satisfied.'),
    q('What is a classic variable window problem?', 'Longest substring without repeating characters.'),
    q('What data structure is often used?', 'Map/set to track window contents or character counts.'),
    q('What problem finds smallest subarray with sum >= target?', 'Variable sliding window (minimum size subarray sum).'),
    q('What is the time complexity of sliding window?', 'O(n) \u2014 each element added and removed at most once.'),
    q('What is the space complexity?', 'O(1) or O(k) where k is the character set size / window size.')
  ],
  R(10,35,110,25,'#0070f3','','Left','Window start') +
  R(200,35,110,25,'#28a745','','Right','Window end') +
  R(10,65,110,25,'#ffc107','','Window','Subarray content') +
  A(120,48,200,48) +
  R(130,65,70,25,'#dc3545','','[...]','Ongoing') +
  R(10,100,110,25,'#e83e8c','','Slide','Right++') +
  R(10,130,110,25,'#6610f2','','Adjust','Left++ if needed') +
  R(10,160,110,25,'#17a2b8','','Result','Track max/min') +
  R(340,35,145,150,'#17a2b8','','Sliding Window','Fixed or variable. O(n) time. Add right, remove left. Track window state.') +
  T(240,220,'Sliding Window: O(n) time. Fixed window (size k) or variable (condition-based).',9,'#666','middle'),
  [
    e('Maximum Sum Subarray (Fixed K)', 'Fixed window of size k.', codeBlock([
      'function maxSumSubarray(arr, k) {',
      '  let sum = 0, max = -Infinity;',
      '  for (let i = 0; i < arr.length; i++) {',
      '    sum += arr[i];',
      '    if (i >= k - 1) { max = Math.max(max, sum); sum -= arr[i - k + 1]; }',
      '  }',
      '  return max;',
      '}'
    ]), 'Fixed window O(n).'),
    e('Longest Substring Without Repeating', 'Variable window.', codeBlock([
      'function lengthOfLongestSubstring(s) {',
      '  const set = new Set();',
      '  let left = 0, maxLen = 0;',
      '  for (let right = 0; right < s.length; right++) {',
      '    while (set.has(s[right])) set.delete(s[left++]);',
      '    set.add(s[right]);',
      '    maxLen = Math.max(maxLen, right - left + 1);',
      '  }',
      '  return maxLen;',
      '}'
    ]), 'Longest substring O(n).'),
    e('Minimum Window Substring', 'Variable window with map.', codeBlock([
      'function minWindow(s, t) {',
      '  const need = {}; for (const c of t) need[c] = (need[c] || 0) + 1;',
      '  let have = 0, left = 0, minLen = Infinity, start = 0, needLen = Object.keys(need).length;',
      '  const window = {};',
      '  for (let right = 0; right < s.length; right++) {',
      '    const c = s[right]; window[c] = (window[c] || 0) + 1;',
      '    if (window[c] === need[c]) have++;',
      '    while (have === needLen) {',
      '      if (right - left + 1 < minLen) { minLen = right - left + 1; start = left; }',
      '      const leftC = s[left]; window[leftC]--;',
      '      if (window[leftC] < need[leftC]) have--;',
      '      left++;',
      '    }',
      '  }',
      '  return minLen === Infinity ? "" : s.substring(start, start + minLen);',
      '}'
    ]), 'Min window substring O(n).'),
    e('Longest Repeating Character Replacement', 'Variable window with char count.', codeBlock([
      'function characterReplacement(s, k) {',
      '  const count = {}; let maxFreq = 0, left = 0, maxLen = 0;',
      '  for (let right = 0; right < s.length; right++) {',
      '    const c = s[right]; count[c] = (count[c] || 0) + 1;',
      '    maxFreq = Math.max(maxFreq, count[c]);',
      '    while ((right - left + 1) - maxFreq > k) { count[s[left]]--; left++; }',
      '    maxLen = Math.max(maxLen, right - left + 1);',
      '  }',
      '  return maxLen;',
      '}'
    ]), 'Longest repeating char replacement O(n).'),
    e('Max Sliding Window (Deque)', 'Monotonic deque for max in window.', codeBlock([
      'function maxSlidingWindow(nums, k) {',
      '  const result = [], deque = [];',
      '  for (let i = 0; i < nums.length; i++) {',
      '    while (deque.length && nums[deque[deque.length-1]] < nums[i]) deque.pop();',
      '    deque.push(i);',
      '    if (deque[0] <= i - k) deque.shift();',
      '    if (i >= k - 1) result.push(nums[deque[0]]);',
      '  }',
      '  return result;',
      '}'
    ]), 'Maximum in sliding window O(n) using deque.')
  ],
  [
    m('What does sliding window reduce?', ['O(1) to O(log n)', 'O(n^2) to O(n)', 'O(n) to O(log n)', 'O(n log n) to O(n)'], 1, 'O(n^2) to O(n).'),
    m('What are the two types?', ['Fixed and variable', 'Fast and slow', 'Left and right', 'Top and bottom'], 0, 'Fixed window (constant size) and variable window.'),
    m('Time complexity of sliding window?', ['O(n^2)', 'O(n)', 'O(log n)', 'O(n log n)'], 1, 'O(n) \u2014 each element processed twice max.'),
    m('What tracks window contents?', ['Map/Set', 'Stack', 'Tree', 'Queue'], 0, 'Map/Set for frequency tracking.'),
    m('What problem finds longest substring without repeats?', ['Fixed window', 'Variable window', 'Two pointers opposite', 'Binary search'], 1, 'Variable window expanding with set.'),
    m('Deque used for?', ['Max in sliding window', 'Variable window', 'Fixed sum', 'Pair finding'], 0, 'Monotonic deque for max/min in window.')
  ]
);

/* =================== TOPIC 22: Prefix Sum =================== */
addTopic('dsa-prefix-sum', 'Prefix Sum', 'intermediate', 10,
  ['Prefix sum is an array where prefix[i] = sum of elements from index 0 to i. Enables O(1) range sum queries.',
   'Construction: prefix[i] = prefix[i-1] + arr[i]. O(n) preprocessing, O(1) per query.',
   'Range sum: sum(L, R) = prefix[R] - prefix[L-1] (with 0-indexed, prefix[-1] = 0).',
   '2D prefix sum: sum of submatrix in O(1) after O(m*n) preprocessing.'
  ],
  'Prefix sum is like keeping a running total of your expenses. Instead of adding up receipts from June to December every time, you write down your running total at the end of each month. To get June-December total, you subtract May\'s total from December\'s total.',
  [
    d('1D Prefix Sum', 'prefix[0] = arr[0]. prefix[i] = prefix[i-1] + arr[i]. Range query: sum(L,R) = prefix[R] - (L > 0 ? prefix[L-1] : 0). Also: prefix product, prefix XOR, prefix modulo.'),
    d('2D Prefix Sum', 'ps[i][j] = sum of submatrix (0,0) to (i,j). Formula: ps[i][j] = arr[i][j] + ps[i-1][j] + ps[i][j-1] - ps[i-1][j-1]. Submatrix sum (r1,c1) to (r2,c2): ps[r2][c2] - ps[r1-1][c2] - ps[r2][c1-1] + ps[r1-1][c1-1].'),
    d('Difference Array', 'Optimizes range updates. diff[i] = arr[i] - arr[i-1]. Range update (L,R,+val): diff[L] += val, diff[R+1] -= val. Reconstruct: prefix sum of diff. Used for multiple range updates with few queries.'),
    d('Applications', 'Range sum queries. Subarray sum equals k. Equilibrium index. Product of array except self. 2D matrix block sum. Number of subarrays with sum condition. Difference array for range updates.')
  ],
  'Prefix sum is the simplest pattern for O(1) range queries after O(n) preprocessing. Key insight: precompute cumulative sums. Works for sum, product, XOR, or any associative operation. 2D extension for matrices. Difference array for range updates.',
  [
    q('What is prefix sum?', 'An array where prefix[i] = sum from arr[0] to arr[i].'),
    q('What is the time for range sum query?', 'O(1) after O(n) preprocessing.'),
    q('What is the formula for range sum?', 'sum(L,R) = prefix[R] - (L > 0 ? prefix[L-1] : 0).'),
    q('What is a difference array?', 'diff[i] = arr[i] - arr[i-1] \\u2014 optimized for range updates.'),
    q('How does 2D prefix sum work?', 'ps[i][j] = arr[i][j] + ps[i-1][j] + ps[i][j-1] - ps[i-1][j-1].'),
    q('What is the equilibrium index?', 'Index where sum of left elements equals sum of right elements.'),
    q('What is Subarray Sum Equals K?', 'Count subarrays with sum = k using prefix sum + hash map.'),
    q('What is the space complexity of prefix sum?', 'O(n) for 1D, O(m*n) for 2D.'),
    q('What operations work with prefix technique?', 'Addition, multiplication, XOR \\u2014 any associative operation with inverse.'),
    q('What is product except self?', 'For each index, product of all elements except itself, using prefix/postfix products.')
  ],
  R(10,35,110,25,'#0070f3','','Array','[1,2,3,4,5]') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Prefix','[1,3,6,10,15]') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Query: sum(1,3)','= prefix[3] - prefix[0]') +
  R(10,100,110,25,'#dc3545','','2D Prefix','Matrix block sum') +
  R(10,130,110,25,'#e83e8c','','Diff Array','Range updates') +
  R(10,160,110,25,'#6610f2','','Subarray Sum = K','Prefix + hash map') +
  R(300,35,180,150,'#17a2b8','','Prefix Sum','O(1) range queries. O(n) preprocessing. Sum, XOR, product. Difference array.') +
  T(240,220,'Prefix Sum: Cumulative sum for O(1) range queries. Difference array for range updates.',9,'#666','middle'),
  [
    e('1D Prefix Sum', 'Basic prefix sum construction.', codeBlock([
      'class PrefixSum {',
      '  constructor(arr) {',
      '    this.prefix = [0];',
      '    for (const num of arr) this.prefix.push(this.prefix[this.prefix.length-1] + num);',
      '  }',
      '  rangeSum(L, R) { return this.prefix[R+1] - this.prefix[L]; }',
      '}'
    ]), 'O(1) range sum after O(n) build.'),
    e('Subarray Sum Equals K', 'Prefix sum + hash map.', codeBlock([
      'function subarraySum(nums, k) {',
      '  const map = new Map(); map.set(0, 1);',
      '  let sum = 0, count = 0;',
      '  for (const num of nums) {',
      '    sum += num;',
      '    if (map.has(sum - k)) count += map.get(sum - k);',
      '    map.set(sum, (map.get(sum) || 0) + 1);',
      '  }',
      '  return count;',
      '}'
    ]), 'Count subarrays with sum = k O(n).'),
    e('Product of Array Except Self', 'Prefix and suffix products.', codeBlock([
      'function productExceptSelf(nums) {',
      '  const n = nums.length, result = new Array(n);',
      '  result[0] = 1;',
      '  for (let i = 1; i < n; i++) result[i] = result[i-1] * nums[i-1];',
      '  let suffix = 1;',
      '  for (let i = n-1; i >= 0; i--) { result[i] *= suffix; suffix *= nums[i]; }',
      '  return result;',
      '}'
    ]), 'Product except self O(n) O(1) space.'),
    e('2D Prefix Sum (Matrix)', 'O(1) submatrix sum.', codeBlock([
      'class NumMatrix {',
      '  constructor(matrix) {',
      '    const rows = matrix.length, cols = matrix[0].length;',
      '    this.ps = Array.from({length: rows+1}, () => new Array(cols+1).fill(0));',
      '    for (let r = 0; r < rows; r++)',
      '      for (let c = 0; c < cols; c++)',
      '        this.ps[r+1][c+1] = matrix[r][c] + this.ps[r][c+1] + this.ps[r+1][c] - this.ps[r][c];',
      '  }',
      '  sumRegion(r1, c1, r2, c2) {',
      '    return this.ps[r2+1][c2+1] - this.ps[r1][c2+1] - this.ps[r2+1][c1] + this.ps[r1][c1];',
      '  }',
      '}'
    ]), '2D prefix sum for O(1) submatrix sum.'),
    e('Difference Array', 'Range update optimization.', codeBlock([
      'class DifferenceArray {',
      '  constructor(n) { this.diff = new Array(n+1).fill(0); }',
      '  rangeUpdate(L, R, val) { this.diff[L] += val; this.diff[R+1] -= val; }',
      '  build() { for (let i = 1; i < this.diff.length; i++) this.diff[i] += this.diff[i-1]; return this.diff.slice(0, -1); }',
      '}'
    ]), 'Difference array for efficient range updates O(1) per update.')
  ],
  [
    m('Prefix sum enables what query time?', ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], 2, 'O(1) range sum queries.'),
    m('Preprocessing time for prefix sum?', ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], 2, 'O(n) preprocessing.'),
    m('Range sum formula?', ['prefix[R] - prefix[L]', 'prefix[R] + prefix[L]', 'prefix[R] * prefix[L]', 'prefix[R] / prefix[L]'], 0, 'sum(L,R) = prefix[R] - prefix[L-1].'),
    m('What does difference array optimize?', ['Range sum', 'Range updates', 'Point queries', 'Sorting'], 1, 'Multiple range updates with few queries.'),
    m('Subarray sum equals K uses?', ['Binary search', 'Prefix sum + hash map', 'Two pointers', 'Sliding window'], 1, 'Prefix sum and hash map.'),
    m('2D prefix sum preprocessing time?', ['O(n)', 'O(m*n)', 'O(n^2)', 'O(log n)'], 1, 'O(m*n) for 2D matrix.')
  ]
);

/* =================== TOPIC 23: Bit Manipulation =================== */
addTopic('dsa-bit-manipulation', 'Bit Manipulation', 'advanced', 20,
  ['Bit manipulation operates directly on the binary representation of numbers for fast, memory-efficient operations.',
   'Core operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>).',
   'Bit operations are O(1) and extremely fast \\u2014 they operate at the hardware level.',
   'Common tricks: check if bit is set, set/clear/toggle bit, count set bits (Brian Kernighan algorithm), power of 2 check.'
  ],
  'Bit manipulation is like controlling individual light switches in a massive building. Each bit is a switch. Instead of turning lights on/off with a complex system, you use simple operations: AND checks if a light is on, OR turns lights on, XOR toggles, NOT flips all.',
  [
    d('Bit Operations', 'AND: both bits 1 -> 1. OR: one or both 1 -> 1. XOR: bits differ -> 1. NOT: flip all bits. Left shift (<< n): multiply by 2^n. Right shift (>> n): divide by 2^n (floor).'),
    d('Bit Tricks', 'Check if kth bit is set: (num >> k) & 1. Set kth bit: num | (1 << k). Clear kth bit: num & ~(1 << k). Toggle kth bit: num ^ (1 << k). Check power of 2: n > 0 && (n & (n-1)) === 0.'),
    d('XOR Properties', 'a ^ a = 0 (self-inverse). a ^ 0 = a (identity). a ^ b ^ a = b (cancellation). XOR is commutative and associative. Used to find unique element, swap without temp, detect parity.'),
    d('Applications', 'Find unique element (XOR all). Count bits (Brian Kernighan). Subsets (bitmask enumeration). Fast multiplication/division by powers of 2. Flags and permissions. Cryptography. Error detection (parity bits).')
  ],
  'Bit manipulation is essential for performance-critical code and low-level programming. Master the bit tricks: check/set/clear/toggle, XOR properties, and counting bits. Bit manipulation is also common in coding interviews for specific problem patterns.',
  [
    q('What is bit manipulation?', 'Operating directly on binary representation of numbers at the bit level.'),
    q('What does AND (&) do?', 'Both bits must be 1 for result to be 1.'),
    q('What does XOR (^) do?', 'Bits must differ for result to be 1.'),
    q('What does left shift (<<) do?', 'Shifts bits left, multiplies by 2^n.'),
    q('How to check if kth bit is set?', '(num >> k) & 1.'),
    q('How to set kth bit?', 'num | (1 << k).'),
    q('How to clear kth bit?', 'num & ~(1 << k).'),
    q('What is the XOR property?', 'a ^ a = 0, a ^ 0 = a, a ^ b ^ a = b.'),
    q('How to check power of 2?', 'n > 0 && (n & (n-1)) === 0.'),
    q('What is Brian Kernighan algorithm?', 'Count set bits: while (n) { count++; n &= n - 1; } O(number of set bits).')
  ],
  R(10,35,100,25,'#0070f3','','Number 5','101 binary') +
  A(110,48,140,48) +
  R(150,35,100,25,'#28a745','','5 & 3 = 1','101 & 011 = 001') +
  R(150,65,100,25,'#ffc107','','5 | 3 = 7','101 | 011 = 111') +
  R(150,95,100,25,'#dc3545','','5 ^ 3 = 6','101 ^ 011 = 110') +
  R(150,125,100,25,'#e83e8c','','5 << 1 = 10','1010 binary') +
  R(150,155,100,25,'#6610f2','','5 >> 1 = 2','10 binary') +
  R(290,35,190,150,'#17a2b8','','Bit Manipulation','AND, OR, XOR, shift. XOR tricks, power of 2, count bits, bitmask.') +
  T(240,220,'Bit Manipulation: AND, OR, XOR, shifts. XOR a^a=0, bit tricks, bitmask for subsets.',9,'#666','middle'),
  [
    e('Unique Number (XOR)', 'Find single non-duplicate.', codeBlock([
      'function singleNumber(nums) {',
      '  return nums.reduce((a, b) => a ^ b, 0);',
      '}',
      '// [2,2,1] => 1'
    ]), 'XOR all elements \\u2014 duplicates cancel.'),
    e('Count Set Bits', 'Brian Kernighan algorithm.', codeBlock([
      'function countBits(n) {',
      '  let count = 0;',
      '  while (n) { n &= (n - 1); count++; }',
      '  return count;',
      '}'
    ]), 'Brian Kernighan: O(number of set bits).'),
    e('Power of Two', 'Check if power of 2.', codeBlock([
      'function isPowerOfTwo(n) {',
      '  return n > 0 && (n & (n - 1)) === 0;',
      '}'
    ]), 'Power of 2 check.'),
    e('Subsets (Bitmask)', 'Generate all subsets using bitmasks.', codeBlock([
      'function subsets(nums) {',
      '  const result = [];',
      '  for (let mask = 0; mask < (1 << nums.length); mask++) {',
      '    const subset = [];',
      '    for (let i = 0; i < nums.length; i++)',
      '      if (mask & (1 << i)) subset.push(nums[i]);',
      '    result.push(subset);',
      '  }',
      '  return result;',
      '}'
    ]), 'Bitmask enumeration for subsets O(n * 2^n).'),
    e('Sum Without Arithmetic', 'Add using bit operations.', codeBlock([
      'function getSum(a, b) {',
      '  while (b) { const carry = a & b; a = a ^ b; b = carry << 1; }',
      '  return a;',
      '}'
    ]), 'Add two numbers using XOR and AND.'),
    e('Missing Number', 'Find missing in 0..n.', codeBlock([
      'function missingNumber(nums) {',
      '  const n = nums.length;',
      '  let xor = 0;',
      '  for (let i = 1; i <= n; i++) xor ^= i;',
      '  for (const num of nums) xor ^= num;',
      '  return xor;',
      '}'
    ]), 'Missing number using XOR O(n).')
  ],
  [
    m('What does XOR (^) do?', ['Bits must differ -> 1', 'Both bits 1 -> 1', 'Flip all bits', 'Shift left'], 0, 'XOR: bits differ -> 1.'),
    m('XOR property a ^ a = ?', ['0', '1', 'a', '2a'], 0, 'a ^ a = 0.'),
    m('How to check power of 2?', ['n & (n-1) === 0', 'n & n === 0', 'n | n === 0', 'n ^ n === 0'], 0, 'n > 0 && (n & (n-1)) === 0.'),
    m('Left shift by 1 is?', ['Divide by 2', 'Multiply by 2', 'Add 1', 'Subtract 1'], 1, 'Left shift (<< 1) multiply by 2.'),
    m('How to set kth bit?', ['num & (1<<k)', 'num | (1<<k)', 'num ^ (1<<k)', 'num ~ (1<<k)'], 1, 'num | (1 << k) sets the kth bit.'),
    m('Brian Kernighan counts what?', ['Total bits', 'Set bits', 'Unset bits', 'Leading zeros'], 1, 'Counts set (1) bits.')
  ]
);

/* =================== TOPIC 24: Trie =================== */
addTopic('dsa-trie', 'Trie (Prefix Tree)', 'advanced', 20,
  ['A Trie is a tree-like data structure for storing strings, where each node represents a character prefix.',
   'Root is empty. Each path from root to a node spells out a string. Nodes mark if they represent the end of a word.',
   'Insert: O(L). Search: O(L). StartsWith (prefix search): O(L). Where L is the length of the word.',
   'Space: O(total characters stored) \\u2014 shared prefixes save significant space for related strings.'
  ],
  'A Trie is like a phone directory where names are organized by letter sequences. To find "Bob", you go to the B shelf, then BO, then BOB. All names starting with BO are in one place. This is much faster than scanning every name for finding prefixes.',
  [
    d('Trie Node Structure', 'Each node has: children (map of char -> node), isEndOfWord flag. Usually contains 26 or 256 child pointers (for lowercase or ASCII). Space optimized with hash map for sparse character sets.'),
    d('Operations', 'Insert: traverse/create nodes for each character, mark last node as end. Search: traverse nodes for each character, check isEndOfWord at last node. StartsWith: traverse, return true if path exists (end flag not needed).'),
    d('Trie Variations', 'Compressed Trie (Radix Tree): merges single-child nodes. Suffix Tree: stores all suffixes. Ternary Search Tree: three-way branching (less memory). Bitwise Trie (for IP routing). Patricia Trie: compact prefix tree.'),
    d('Applications', 'Autocomplete/search suggestions. Spell checker. IP routing (longest prefix match). Word games (Boggle solver). Prefix-based search. Dictionary implementation. T9 predictive text.')
  ],
  'Trie is the optimal structure for prefix-based string operations. All operations are O(L) \\u2014 independent of the number of stored words. Use for autocomplete, spell check, and any problem involving string prefixes. The space cost is significant for large alphabets.',
  [
    q('What is a Trie?', 'A tree data structure for storing strings where nodes represent character prefixes.'),
    q('What are the time complexities?', 'Insert: O(L), Search: O(L), StartsWith: O(L) \\u2014 L = word length.'),
    q('What is stored in each node?', 'Children map/array and a boolean flag (isEndOfWord).'),
    q('What is the space complexity?', 'O(total characters stored) \\u2014 shared prefixes save space.'),
    q('What is Trie vs Hash Set?', 'Trie: prefix search, O(L), more memory. Hash Set: O(1) exact match, no prefix search.'),
    q('What is a compressed Trie?', 'Radix tree \\u2014 merges nodes with single child for memory efficiency.'),
    q('What is a suffix tree?', 'A Trie storing all suffixes of a string \\u2014 powerful for substring search.'),
    q('What problem does autocomplete solve?', 'Prefix search (StartsWith) + DFS to find all words with a prefix.'),
    q('What a Trie node typically contains?', 'An array of 26 (for lowercase letters) or a hash map for children.'),
    q('What is a Ternary Search Tree?', 'Three-way branching Trie variant using less memory than 26-way array.')
  ],
  R(10,35,110,25,'#0070f3','','Root','Empty') +
  A(120,48,150,48) + A(120,55,140,72) +
  R(160,35,70,25,'#28a745','','c','') +
  R(235,35,70,25,'#ffc107','','a','') +
  A(230,48,235,48) + A(230,55,250,72) +
  R(160,65,70,25,'#dc3545','','a','end') +
  R(235,65,70,25,'#e83e8c','','t','end') +
  R(10,100,110,25,'#6610f2','','Insert "cat"','c->a->t') +
  R(10,130,110,25,'#17a2b8','','Search "cat"','c->a->t found') +
  R(10,160,110,25,'#17a2b8','','Prefix "ca"','c->a found') +
  R(330,35,155,150,'#17a2b8','','Trie (Prefix Tree)','O(L) insert/search/prefix. Shared prefixes save space. Autocomplete, spell check.') +
  T(240,220,'Trie: Prefix tree. O(L) operations. Autocomplete, spell check, prefix search.',9,'#666','middle'),
  [
    e('Trie Implementation', 'Basic trie with hash map children.', codeBlock([
      'class TrieNode { constructor() { this.children = new Map(); this.isEnd = false; } }',
      'class Trie {',
      '  constructor() { this.root = new TrieNode(); }',
      '  insert(word) {',
      '    let node = this.root;',
      '    for (const c of word) { if (!node.children.has(c)) node.children.set(c, new TrieNode()); node = node.children.get(c); }',
      '    node.isEnd = true;',
      '  }',
      '  search(word) {',
      '    let node = this.root;',
      '    for (const c of word) { if (!node.children.has(c)) return false; node = node.children.get(c); }',
      '    return node.isEnd;',
      '  }',
      '  startsWith(prefix) {',
      '    let node = this.root;',
      '    for (const c of prefix) { if (!node.children.has(c)) return false; node = node.children.get(c); }',
      '    return true;',
      '  }',
      '}'
    ]), 'Full Trie with insert, search, startsWith.'),
    e('Word Search II (Trie + DFS)', 'Find words on a board.', codeBlock([
      'function findWords(board, words) {',
      '  const trie = new Trie(); for (const w of words) trie.insert(w);',
      '  const result = new Set(), rows = board.length, cols = board[0].length;',
      '  function dfs(r, c, node, path) {',
      '    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] === "#") return;',
      '    const ch = board[r][c];',
      '    if (!node.children.has(ch)) return;',
      '    node = node.children.get(ch); path += ch;',
      '    if (node.isEnd) result.add(path);',
      '    board[r][c] = "#";',
      '    dfs(r+1,c,node,path); dfs(r-1,c,node,path); dfs(r,c+1,node,path); dfs(r,c-1,node,path);',
      '    board[r][c] = ch;',
      '  }',
      '  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dfs(r, c, trie.root, "");',
      '  return Array.from(result);',
      '}'
    ]), 'Word search using Trie for efficient prefix checking.'),
    e('Prefix Matching (Autocomplete)', 'Find words with prefix.', codeBlock([
      'function autocomplete(trie, prefix) {',
      '  let node = trie.root;',
      '  for (const c of prefix) { if (!node.children.has(c)) return []; node = node.children.get(c); }',
      '  const results = [];',
      '  function dfs(n, path) {',
      '    if (n.isEnd) results.push(path);',
      '    for (const [ch, child] of n.children) dfs(child, path + ch);',
      '  }',
      '  dfs(node, prefix); return results;',
      '}'
    ]), 'DFS from prefix node to collect all words.'),
    e('Longest Common Prefix', 'Using Trie for LCP.', codeBlock([
      'function longestCommonPrefix(strs) {',
      '  if (!strs.length) return "";',
      '  const trie = new Trie();',
      '  for (const s of strs) trie.insert(s);',
      '  let node = trie.root, prefix = "";',
      '  while (node.children.size === 1 && !node.isEnd) {',
      '    const [ch] = node.children.keys(); prefix += ch;',
      '    node = node.children.get(ch);',
      '  }',
      '  return prefix;',
      '}'
    ]), 'Longest common prefix using Trie walk.'),
    e('Array-Based Trie (26 slots)', 'Faster array-based Trie.', codeBlock([
      'class ArrayTrieNode { constructor() { this.children = new Array(26).fill(null); this.isEnd = false; } }',
      'class ArrayTrie {',
      '  constructor() { this.root = new ArrayTrieNode(); }',
      '  _idx(c) { return c.charCodeAt(0) - 97; }',
      '  insert(word) {',
      '    let node = this.root;',
      '    for (const c of word) { const i = this._idx(c); if (!node.children[i]) node.children[i] = new ArrayTrieNode(); node = node.children[i]; }',
      '    node.isEnd = true;',
      '  }',
      '  search(word) {',
      '    let node = this.root;',
      '    for (const c of word) { const i = this._idx(c); if (!node.children[i]) return false; node = node.children[i]; }',
      '    return node.isEnd;',
      '  }',
      '}'
    ]), 'Array-based Trie for lowercase letters (faster than Map).')
  ],
  [
    m('What is a Trie?', ['Prefix tree for strings', 'Binary search tree', 'Hash table', 'Balanced tree'], 0, 'Prefix tree for strings.'),
    m('Time complexity of Trie search?', ['O(1)', 'O(log n)', 'O(L) word length', 'O(n)'], 2, 'O(L) where L is word length.'),
    m('What does each Trie node contain?', ['Children + isEnd flag', 'Value + next', 'Key + hash', 'Parent + sibling'], 0, 'Children map/array and isEnd flag.'),
    m('What does isEnd flag indicate?', ['End of string', 'Start of string', 'Leaf node', 'Root node'], 0, 'End of a valid word.'),
    m('What is Trie vs Hash Set?', ['Trie supports prefix search', 'Same', 'Hash set supports prefix', 'Trie faster exact match'], 0, 'Trie supports prefix search, hash set does not.'),
    m('What is a compressed Trie called?', ['Suffix tree', 'Radix tree', 'AVL tree', 'Red-black tree'], 1, 'Radix tree / compressed Trie.')
  ]
);

/* =================== TOPIC 25: Union Find =================== */
addTopic('dsa-union-find', 'Union Find (Disjoint Set Union)', 'advanced', 20,
  ['Union Find (DSU) tracks a partition of elements into disjoint (non-overlapping) sets.',
   'Core operations: Find (determine which set an element belongs to) and Union (merge two sets).',
   'Optimizations: Path compression (flatten tree during find) and Union by rank/size (attach smaller tree under larger).',
   'With both optimizations, operations are nearly O(1) amortized \\u2014 inverse Ackermann function complexity.'
  ],
  'Union Find is like managing friend groups at a party. Each person starts alone. When two people become friends, their groups merge (union). To check if two people are in the same group, you ask "who is the group leader?" (find). Path compression means everyone remembers the leader directly.',
  [
    d('Data Structure', 'Array of parents: parent[i] = j means i points to j. Root: parent[i] = i. Initially, each element is its own parent (singleton set). Find follows parent pointers until reaching the root.'),
    d('Path Compression', 'During find, set parent of each visited node directly to the root. Flattens the tree. Makes subsequent finds O(1). Implemented recursively or iteratively. Critical for near-O(1) amortized performance.'),
    d('Union by Rank/Size', 'Rank: depth of tree. Union attaches shallower tree under deeper tree. Size: number of elements. Union attaches smaller size under larger size. Prevents tall trees. Without this, union could create O(n) chains.'),
    d('Applications', 'Connected components in graphs. Kruskal\'s MST algorithm. Number of islands (dynamic). Percolation. Redundant connections. Detecting cycles in undirected graphs. Friend circles / social networks.')
  ],
  'Union Find is the go-to structure for dynamic connectivity problems. Both optimizations (path compression + union by rank) are essential for near-O(1) performance. Master the implementation pattern: parent array with find() and union() methods.',
  [
    q('What is Union Find?', 'A data structure tracking disjoint sets, supporting find and union operations.'),
    q('What does Find do?', 'Returns the representative (root) of the set containing an element.'),
    q('What does Union do?', 'Merges two sets into one.'),
    q('What is path compression?', 'During find, point all visited nodes directly to the root.'),
    q('What is union by rank?', 'Attach the shallower tree under the deeper tree to maintain balance.'),
    q('What is the amortized time complexity?', 'Inverse Ackermann \\u03b1(n) \u2014 effectively O(1) for all practical input sizes.'),
    q('What algorithm uses Union Find?', 'Kruskal\'s Minimum Spanning Tree algorithm.'),
    q('How is Union Find initialized?', 'Each element is its own parent: parent[i] = i.'),
    q('What is a use case for Union Find?', 'Dynamic connectivity \\u2014 number of connected components as edges are added.'),
    q('Can Union Find detect cycles?', 'Yes \\u2014 if union finds two elements already in same set, adding edge creates cycle.')
  ],
  R(10,35,110,25,'#0070f3','','Init','Each own parent') +
  R(10,65,110,25,'#28a745','','Find(3)','Follow parent -> root') +
  R(10,95,110,25,'#ffc107','','Path Compress','Point 3 to root directly') +
  R(10,125,110,25,'#dc3545','','Union(1,2)','Merge sets') +
  R(10,155,110,25,'#e83e8c','','By Rank','Shallow under deep') +
  R(150,35,140,150,'#17a2b8','','Union Find','Disjoint Set Union. Find + Union with optimizations. Near O(1).') +
  T(240,220,'Union Find: Disjoint sets. Find + Union. Path compression + union by rank = near O(1).',9,'#666','middle'),
  [
    e('Union Find Implementation', 'Full DSU with optimizations.', codeBlock([
      'class UnionFind {',
      '  constructor(n) {',
      '    this.parent = Array.from({length: n}, (_, i) => i);',
      '    this.rank = new Array(n).fill(0);',
      '  }',
      '  find(x) {',
      '    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);',
      '    return this.parent[x];',
      '  }',
      '  union(x, y) {',
      '    const px = this.find(x), py = this.find(y);',
      '    if (px === py) return false;',
      '    if (this.rank[px] < this.rank[py]) [px, py] = [py, px];',
      '    this.parent[py] = px;',
      '    if (this.rank[px] === this.rank[py]) this.rank[px]++;',
      '    return true;',
      '  }',
      '  connected(x, y) { return this.find(x) === this.find(y); }',
      '}'
    ]), 'Full DSU with path compression and union by rank.'),
    e('Number of Connected Components', 'Dynamic connectivity.', codeBlock([
      'function countComponents(n, edges) {',
      '  const uf = new UnionFind(n);',
      '  for (const [u, v] of edges) uf.union(u, v);',
      '  const set = new Set();',
      '  for (let i = 0; i < n; i++) set.add(uf.find(i));',
      '  return set.size;',
      '}'
    ]), 'Count connected components O(E * alpha(n)).'),
    e('Kruskal MST', 'Minimum spanning tree with DSU.', codeBlock([
      'function kruskalMST(n, edges) {',
      '  edges.sort((a, b) => a[2] - b[2]);',
      '  const uf = new UnionFind(n);',
      '  let mstWeight = 0, edgesUsed = 0;',
      '  for (const [u, v, w] of edges) {',
      '    if (uf.union(u, v)) { mstWeight += w; edgesUsed++; if (edgesUsed === n-1) break; }',
      '  }',
      '  return mstWeight;',
      '}'
    ]), 'Kruskal MST O(E log E).'),
    e('Redundant Connection', 'Find edge creating cycle.', codeBlock([
      'function findRedundantConnection(edges) {',
      '  const uf = new UnionFind(edges.length);',
      '  for (const [u, v] of edges)',
      '    if (!uf.union(u, v)) return [u, v];',
      '  return [];',
      '}'
    ]), 'First edge connecting already-connected nodes is redundant.'),
    e('Number of Islands II', 'Dynamic island counting.', codeBlock([
      'function numIslands2(m, n, positions) {',
      '  const grid = Array.from({length: m}, () => new Array(n).fill(0));',
      '  const uf = new UnionFind(m * n);',
      '  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];',
      '  let count = 0, result = [];',
      '  for (const [r, c] of positions) {',
      '    if (grid[r][c] === 1) { result.push(count); continue; }',
      '    grid[r][c] = 1; count++;',
      '    for (const [dr, dc] of dirs) {',
      '      const nr = r+dr, nc = c+dc;',
      '      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1)',
      '        if (uf.union(r*n + c, nr*n + nc)) count--;',
      '    }',
      '    result.push(count);',
      '  }',
      '  return result;',
      '}'
    ]), 'Dynamic number of islands using DSU.')
  ],
  [
    m('What are the two Union Find operations?', ['Push and Pop', 'Find and Union', 'Add and Remove', 'Insert and Delete'], 1, 'Find and Union.'),
    m('What does path compression do?', ['Merge trees', 'Flatten tree during find', 'Increase rank', 'Sort elements'], 1, 'Points all visited nodes to root.'),
    m('What does union by rank do?', ['Flatten tree', 'Attach shallow under deep', 'Compress path', 'Increase size'], 1, 'Attaches shallower tree under deeper tree.'),
    m('Amortized time complexity?', ['O(1)', 'O(log n)', 'O(n)', '\\u03b1(n) inverse Ackermann'], 3, 'Inverse Ackermann \\u03b1(n) \u2014 effectively near O(1).'),
    m('What algorithm uses DSU?', ['Dijkstra', 'Kruskal MST', 'BFS', 'DFS'], 1, 'Kruskal\'s algorithm uses DSU.'),
    m('How to detect cycle using DSU?', ['Union returns false', 'Find returns null', 'Union throws', 'Connected returns false'], 0, 'If union returns false, elements already connected -> cycle.')
  ]
);

/* =================== TOPIC 26: Topological Sort =================== */
addTopic('dsa-topological-sort', 'Topological Sort', 'advanced', 15,
  ['Topological sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u->v, u comes before v.',
   'Only possible for DAGs (Directed Acyclic Graphs). If the graph has a cycle, topological sort does not exist.',
   'Two main algorithms: Kahn\'s algorithm (BFS using in-degree) and DFS-based (post-order traversal with stack).',
   'Time: O(V+E) for both approaches. Space: O(V) for the result and auxiliary structures.'
  ],
  'Topological sort is like planning a college course schedule. Prerequisite courses must be taken before advanced courses. You list courses in an order such that no course appears before its prerequisites. If there is a circular prerequisite chain, it is impossible.',
  [
    d('Kahn\'s Algorithm (BFS)', 'Count in-degrees for each vertex. Add all vertices with in-degree 0 to queue. While queue: remove vertex, add to result, decrement in-degree of neighbors. If neighbor in-degree becomes 0, add to queue. If result size != V, graph has cycle.'),
    d('DFS-Based Topological Sort', 'Perform DFS on graph. After visiting all neighbors of a vertex (post-order), push it onto a stack. Reverse the stack to get topological order. Detect cycle: if we encounter a vertex in current recursion stack, cycle exists.'),
    d('Applications', 'Build systems (Make, Bazel) resolve dependency order. Package managers (npm, pip) install dependencies. Task scheduling with prerequisites. Course prerequisite planning. Instruction scheduling in compilers. Data pipeline orchestration.'),
    d('Kahn\'s vs DFS', 'Kahn\'s: iterative, easier to understand, naturally detects cycles (result size != V). DFS: recursive, stack required for ordering, detects cycles via recursion stack. Both O(V+E). Kahn\'s is generally preferred for its simplicity.')
  ],
  'Topological sort orders DAG vertices respecting edge direction. Kahn\'s algorithm (in-degree based) is the most intuitive. DFS approach uses post-order stacking. Both O(V+E). Always check for cycles first - topological sort only exists for DAGs.',
  [
    q('What is topological sort?', 'A linear ordering of DAG vertices where u comes before v for every edge u->v.'),
    q('What type of graph can be topologically sorted?', 'Only Directed Acyclic Graphs (DAGs).'),
    q('What are the two main algorithms?', 'Kahn\'s algorithm (BFS, in-degree) and DFS-based (post-order stack).'),
    q('How does Kahn\'s algorithm detect cycles?', 'If result size != number of vertices, a cycle exists.'),
    q('What data structure does Kahn\'s use?', 'Queue for vertices with in-degree 0.'),
    q('What is the time complexity?', 'O(V+E) for both Kahn\'s and DFS-based approaches.'),
    q('What is a real-world application?', 'Build systems, package managers, course scheduling.'),
    q('What does in-degree mean?', 'Number of incoming edges to a vertex. In-degree 0 means no prerequisites.'),
    q('How does DFS topological sort work?', 'DFS, push vertex to stack after visiting all neighbors (post-order), then reverse stack.'),
    q('What happens if graph has a cycle?', 'Topological sort does not exist. Kahn\'s will have result size < V.')
  ],
  R(10,35,110,25,'#0070f3','','In-degree 0','Queue them') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','Process','Add to result') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Decrement','Neighbors in-degree') +
  A(120,83,150,83) +
  R(160,70,100,25,'#dc3545','','In-degree 0?','Add to queue') +
  R(10,105,110,25,'#e83e8c','','Result Size','= V?') +
  R(170,105,130,25,'#6610f2','','Yes -> Done','Topological order') +
  R(10,140,110,25,'#17a2b8','','No -> Cycle','Invalid!') +
  R(320,35,160,150,'#17a2b8','','Topological Sort','Order DAG: u before v for every edge. Kahn\'s or DFS. O(V+E). No cycles allowed.') +
  T(240,220,'Topological Sort: Linear ordering of DAG. Kahn\'s (BFS in-degree) or DFS (post-order). O(V+E).',9,'#666','middle'),
  [
    e('Kahn\'s Algorithm', 'BFS-based topological sort.', codeBlock([
      'function topologicalSortKahn(n, edges) {',
      '  const graph = Array.from({length: n}, () => []);',
      '  const inDegree = new Array(n).fill(0);',
      '  for (const [u, v] of edges) { graph[u].push(v); inDegree[v]++; }',
      '  const q = [];',
      '  for (let i = 0; i < n; i++) if (inDegree[i] === 0) q.push(i);',
      '  const result = [];',
      '  while (q.length) {',
      '    const u = q.shift(); result.push(u);',
      '    for (const v of graph[u]) if (--inDegree[v] === 0) q.push(v);',
      '  }',
      '  return result.length === n ? result : [];',
      '}'
    ]), 'Kahn\'s algorithm O(V+E). Returns empty if cycle.'),
    e('DFS Topological Sort', 'DFS-based approach.', codeBlock([
      'function topologicalSortDFS(n, edges) {',
      '  const graph = Array.from({length: n}, () => []);',
      '  for (const [u, v] of edges) graph[u].push(v);',
      '  const visited = new Set(), recStack = new Set(), result = [];',
      '  function dfs(u) {',
      '    visited.add(u); recStack.add(u);',
      '    for (const v of graph[u]) {',
      '      if (recStack.has(v)) return true;',
      '      if (!visited.has(v) && dfs(v)) return true;',
      '    }',
      '    recStack.delete(u); result.push(u); return false;',
      '  }',
      '  for (let i = 0; i < n; i++) if (!visited.has(i) && dfs(i)) return [];',
      '  return result.reverse();',
      '}'
    ]), 'DFS topological sort with cycle detection O(V+E).'),
    e('Course Schedule (LeetCode 207)', 'Detect if prerequisites possible.', codeBlock([
      'function canFinish(numCourses, prerequisites) {',
      '  const graph = Array.from({length: numCourses}, () => []);',
      '  const inDegree = new Array(numCourses).fill(0);',
      '  for (const [course, prereq] of prerequisites) { graph[prereq].push(course); inDegree[course]++; }',
      '  const q = []; for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);',
      '  let count = 0;',
      '  while (q.length) { const u = q.shift(); count++; for (const v of graph[u]) if (--inDegree[v] === 0) q.push(v); }',
      '  return count === numCourses;',
      '}'
    ]), 'Course schedule using Kahn\'s algorithm.'),
    e('Course Schedule II', 'Return order if possible.', codeBlock([
      'function findOrder(numCourses, prerequisites) {',
      '  const graph = Array.from({length: numCourses}, () => []);',
      '  const inDegree = new Array(numCourses).fill(0);',
      '  for (const [course, prereq] of prerequisites) { graph[prereq].push(course); inDegree[course]++; }',
      '  const q = []; for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);',
      '  const result = [];',
      '  while (q.length) { const u = q.shift(); result.push(u); for (const v of graph[u]) if (--inDegree[v] === 0) q.push(v); }',
      '  return result.length === numCourses ? result : [];',
      '}'
    ]), 'Return topological order or empty if cycle.'),
    e('Alien Dictionary', 'Topological sort from word ordering.', codeBlock([
      'function alienOrder(words) {',
      '  const graph = new Map(); const inDegree = new Map();',
      '  for (const w of words) { for (const c of w) { if (!graph.has(c)) graph.set(c, new Set()); if (!inDegree.has(c)) inDegree.set(c, 0); } }',
      '  for (let i = 0; i < words.length - 1; i++) {',
      '    const w1 = words[i], w2 = words[i+1];',
      '    for (let j = 0; j < Math.min(w1.length, w2.length); j++)',
      '      if (w1[j] !== w2[j]) { if (!graph.get(w1[j]).has(w2[j])) { graph.get(w1[j]).add(w2[j]); inDegree.set(w2[j], inDegree.get(w2[j]) + 1); } break; }',
      '  }',
      '  const q = []; for (const [c, d] of inDegree) if (d === 0) q.push(c);',
      '  const result = [];',
      '  while (q.length) { const c = q.shift(); result.push(c); for (const neighbor of graph.get(c) || []) { inDegree.set(neighbor, inDegree.get(neighbor) - 1); if (inDegree.get(neighbor) === 0) q.push(neighbor); } }',
      '  return result.length === inDegree.size ? result.join("") : "";',
      '}'
    ]), 'Alien dictionary using topological sort.')
  ],
  [
    m('What graph can be topologically sorted?', ['Any graph', 'DAG only', 'Undirected only', 'Weighted only'], 1, 'Only Directed Acyclic Graphs (DAGs).'),
    m('What does Kahn\'s algorithm use?', ['Stack', 'Queue', 'Priority queue', 'Hash set'], 1, 'Queue for vertices with in-degree 0.'),
    m('Time complexity of topological sort?', ['O(V)', 'O(E)', 'O(V+E)', 'O(V log V)'], 2, 'O(V+E).'),
    m('What indicates a cycle in Kahn\'s?', ['Queue becomes empty early', 'Result size != V', 'In-degree never 0', 'Stack overflow'], 1, 'If result.size !== V, there is a cycle.'),
    m('What does topological sort order?', ['Vertices respecting edges', 'Edges by weight', 'Vertices by value', 'Components'], 0, 'Orders vertices respecting edge direction.'),
    m('What is a real-world use?', ['Sorting numbers', 'Course prerequisite planning', 'Graph coloring', 'Path finding'], 1, 'Course scheduling / build systems.')
  ]
);

/* =================== TOPIC 27: Shortest Path =================== */
addTopic('dsa-shortest-path', 'Shortest Path', 'advanced', 20,
  ['Shortest path algorithms find the minimum distance/cost path between vertices in a weighted graph.',
   'Dijkstra: O((V+E) log V) using priority queue. Works for non-negative weights only.',
   'Bellman-Ford: O(V*E). Works with negative weights. Detects negative cycles.',
   'BFS: O(V+E). Shortest path in unweighted graphs. Floyd-Warshall: O(V^3). All-pairs shortest path.'
  ],
  'Shortest path is like finding the fastest route on Google Maps. Given roads with different travel times (weights), you want the path minimizing total travel time. Dijkstra always picks the closest unvisited city. Bellman-Ford handles roads with negative times.',
  [
    d('Dijkstra\'s Algorithm', 'Initialize distances: source=0, others=Infinity. Use min-priority queue. While queue not empty: extract min distance vertex, relax all its edges (if new distance < old, update and push). Cannot handle negative edges \u2014 already visited nodes are final.'),
    d('Bellman-Ford Algorithm', 'Initialize distances: source=0, others=Infinity. Repeat V-1 times: relax all edges (for each edge u->v, if dist[u] + w < dist[v], update). After V-1 iterations, if any edge can still be relaxed, negative cycle exists.'),
    d('BFS (Unweighted)', 'All edges have unit weight. BFS from source guarantees shortest path in terms of number of edges. First time a node is discovered, it is at minimum distance. Use queue, track parent for path reconstruction.'),
    d('Applications', 'GPS navigation (Dijkstra variant for road networks). Network routing (OSPF uses Dijkstra). Social network shortest connection. Airline ticket pricing (Bellman-Ford for negative edges). Game AI path finding (A* variant).')
  ],
  'Choose shortest path algorithm based on graph characteristics: BFS for unweighted, Dijkstra for non-negative weights, Bellman-Ford for graphs with negative weights. For all-pairs, Floyd-Warshall. Dijkstra is the most commonly used in practice.',
  [
    q('What is the shortest path problem?', 'Finding the minimum distance path between vertices in a weighted graph.'),
    q('What algorithm is best for non-negative weights?', 'Dijkstra\'s algorithm \u2014 O((V+E) log V).'),
    q('What does Bellman-Ford handle that Dijkstra cannot?', 'Negative edge weights.'),
    q('What Bellman-Ford also detects?', 'Negative cycles (if relaxation continues after V-1 iterations).'),
    q('What algorithm is best for unweighted graphs?', 'BFS \u2014 O(V+E).'),
    q('What algorithm solves all-pairs shortest path?', 'Floyd-Warshall \u2014 O(V^3).'),
    q('What data structure does Dijkstra use?', 'Min-priority queue (min-heap).'),
    q('What is edge relaxation?', 'If dist[u] + weight(u,v) < dist[v], update dist[v].'),
    q('Can Dijkstra handle negative edges?', 'No. Already-visited nodes are considered final and will not be updated.'),
    q('What is the space complexity of Dijkstra?', 'O(V) for distances and O(V) for the priority queue.')
  ],
  R(10,35,110,25,'#0070f3','','Source','dist=0') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','Neighbor A','dist=5') +
  R(160,65,100,25,'#ffc107','','Neighbor B','dist=3') +
  A(160,60,160,80) +
  R(10,70,110,25,'#dc3545','','Relax Edge','Update if smaller') +
  R(10,100,110,25,'#e83e8c','','Dijkstra','Non-negative only') +
  R(10,130,110,25,'#6610f2','','Bellman-Ford','Negative allowed') +
  R(10,160,110,25,'#17a2b8','','BFS','Unweighted') +
  R(290,35,190,150,'#17a2b8','','Shortest Path','Dijkstra (non-negative). Bellman-Ford (negative). BFS (unweighted). Floyd-Warshall (all-pairs).') +
  T(240,220,'Shortest Path: Dijkstra (non-negative), Bellman-Ford (negative weights), BFS (unweighted).',9,'#666','middle'),
  [
    e('Dijkstra (Priority Queue)', 'Dijkstra with min-heap.', codeBlock([
      'function dijkstra(graph, source) {',
      '  const dist = new Array(graph.length).fill(Infinity); dist[source] = 0;',
      '  const pq = new MinHeap(); pq.push(0, source);',
      '  while (pq.heap.length) {',
      '    const [d, u] = pq.pop();',
      '    if (d > dist[u]) continue;',
      '    for (const [v, w] of graph[u]) {',
      '      if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push(dist[v], v); }',
      '    }',
      '  }',
      '  return dist;',
      '}'
    ]), 'Dijkstra O((V+E) log V) with min-heap.'),
    e('Bellman-Ford', 'Shortest path with negative weights.', codeBlock([
      'function bellmanFord(edges, V, source) {',
      '  const dist = new Array(V).fill(Infinity); dist[source] = 0;',
      '  for (let i = 0; i < V - 1; i++)',
      '    for (const [u, v, w] of edges)',
      '      if (dist[u] !== Infinity && dist[u] + w < dist[v]) dist[v] = dist[u] + w;',
      '  for (const [u, v, w] of edges)',
      '    if (dist[u] !== Infinity && dist[u] + w < dist[v]) { console.log("Negative cycle detected"); return null; }',
      '  return dist;',
      '}'
    ]), 'Bellman-Ford O(V*E) with negative cycle detection.'),
    e('BFS Shortest Path (Unweighted)', 'Shortest path using BFS.', codeBlock([
      'function bfsShortestPath(graph, source) {',
      '  const dist = new Array(graph.length).fill(-1); dist[source] = 0;',
      '  const q = [source];',
      '  while (q.length) {',
      '    const u = q.shift();',
      '    for (const v of graph[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }',
      '  }',
      '  return dist;',
      '}'
    ]), 'BFS shortest path for unweighted graphs O(V+E).'),
    e('Network Delay Time', 'Dijkstra application.', codeBlock([
      'function networkDelayTime(times, n, k) {',
      '  const graph = Array.from({length: n+1}, () => []);',
      '  for (const [u, v, w] of times) graph[u].push([v, w]);',
      '  const dist = new Array(n+1).fill(Infinity); dist[k] = 0;',
      '  const pq = new MinHeap(); pq.push(0, k);',
      '  while (pq.heap.length) { const [d, u] = pq.pop(); if (d > dist[u]) continue; for (const [v, w] of graph[u]) { if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push(dist[v], v); } } }',
      '  const max = Math.max(...dist.slice(1)); return max === Infinity ? -1 : max;',
      '}'
    ]), 'Network delay time using Dijkstra.'),
    e('Floyd-Warshall (All-Pairs)', 'All-pairs shortest path.', codeBlock([
      'function floydWarshall(graph) {',
      '  const V = graph.length, dist = graph.map(row => [...row]);',
      '  for (let k = 0; k < V; k++)',
      '    for (let i = 0; i < V; i++)',
      '      for (let j = 0; j < V; j++)',
      '        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];',
      '  return dist;',
      '}'
    ]), 'Floyd-Warshall O(V^3) for all-pairs shortest path.')
  ],
  [
    m('Best algorithm for non-negative weights?', ['Bellman-Ford', 'Dijkstra', 'BFS', 'Floyd-Warshall'], 1, 'Dijkstra.'),
    m('Dijkstra time complexity?', ['O(V*E)', 'O((V+E) log V)', 'O(V+E)', 'O(V^3)'], 1, 'O((V+E) log V) with min-heap.'),
    m('What does Bellman-Ford handle?', ['Only positive weights', 'Negative weights', 'Only unweighted', 'Dense graphs'], 1, 'Negative edge weights.'),
    m('What does Bellman-Ford detect?', ['Connected components', 'Negative cycles', 'Bridges', 'Articulation points'], 1, 'Negative cycles.'),
    m('BFS shortest path for?', ['Weighted graphs', 'Unweighted graphs', 'Negative weights', 'Dense graphs'], 1, 'Unweighted graphs only.'),
    m('Floyd-Warshall complexity?', ['O(V+E)', 'O(V^2)', 'O(V^3)', 'O(V log V)'], 2, 'O(V^3) \u2014 all-pairs.')
  ]
);

/* =================== TOPIC 28: Minimum Spanning Tree =================== */
addTopic('dsa-min-spanning-tree', 'Minimum Spanning Tree', 'advanced', 15,
  ['A Minimum Spanning Tree (MST) connects all vertices in a weighted undirected graph with minimum total edge weight.',
   'MST has exactly V-1 edges for V vertices. No cycles. Minimum possible total weight.',
   'Two main algorithms: Kruskal\'s (sort edges, use DSU) and Prim\'s (greedy, start from any vertex).',
   'Both Kruskal and Prim run in O(E log E) or O(E log V) time depending on implementation.'
  ],
  'MST is like planning the cheapest road network to connect all cities. You want to build roads such that every city is connected, no redundant roads (no cycles), and the total construction cost is minimized. You can skip expensive roads if cheaper alternatives connect the same cities.',
  [
    d('Kruskal\'s Algorithm', 'Sort all edges by weight. Process edges in increasing order. If adding edge does not create a cycle (using DSU Union-Find), include it in MST. Stop when V-1 edges added. Time: O(E log E) for sorting + O(E * alpha(V)) for DSU operations.'),
    d('Prim\'s Algorithm', 'Start from any vertex. Use min-priority queue of edges. While queue not empty: pop minimum weight edge. If it connects visited to unvisited vertex, add to MST, add all edges from newly visited vertex to queue. O(E log V) with binary heap.'),
    d('MST Properties', 'Cut property: minimum weight edge crossing any cut belongs to some MST. Cycle property: maximum weight edge in any cycle is not in any MST. Unique: if all edge weights are distinct, MST is unique.'),
    d('Applications', 'Network design (wiring, fiber, pipelines). Approximation algorithms (TSP). Cluster analysis (find clusters by removing heavy edges). Image segmentation. Circuit design.')
  ],
  'MST connects all vertices with minimum total weight. Kruskal: sort edges, use DSU to avoid cycles. Prim: grow tree from start vertex using min-priority queue. Choose Kruskal for sparse graphs. Choose Prim for dense graphs. Both O(E log E).',
  [
    q('What is MST?', 'A tree connecting all vertices with minimum total edge weight.'),
    q('How many edges does MST have?', 'V-1 edges for V vertices.'),
    q('What are the two main MST algorithms?', 'Kruskal\'s (edges sorted, DSU) and Prim\'s (priority queue, greedy).'),
    q('What data structure does Kruskal use?', 'Disjoint Set Union (Union-Find) for cycle detection.'),
    q('What data structure does Prim use?', 'Min-priority queue (min-heap).'),
    q('Time complexity of Kruskal?', 'O(E log E) for sorting + O(E * alpha(V)) for DSU.'),
    q('Time complexity of Prim with binary heap?', 'O(E log V).'),
    q('What is the cut property of MST?', 'Minimum weight edge crossing any cut belongs to some MST.'),
    q('What is the cycle property of MST?', 'Maximum weight edge in any cycle is not in any MST.'),
    q('When is MST unique?', 'When all edge weights are distinct.')
  ],
  R(10,35,110,25,'#0070f3','','All vertices','Disconnected') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','Sort Edges','By weight') +
  A(260,48,290,48) +
  R(300,35,100,25,'#ffc107','','Add if no cycle','DSU Union') +
  A(350,60,350,80) +
  R(10,70,110,25,'#dc3545','','V-1 edges?','Done!') +
  R(10,100,110,25,'#e83e8c','','Kruskal','Sort + DSU') +
  R(10,130,110,25,'#6610f2','','Prim','Start + PQ') +
  R(10,160,110,25,'#17a2b8','','Cut Property','Min edge in cut') +
  R(300,70,130,115,'#17a2b8','','Minimum Spanning Tree','Connects all V vertices with V-1 edges. Minimum total weight.') +
  T(240,220,'MST: Minimum Spanning Tree. Kruskal (DSU) or Prim (PQ). V-1 edges, min weight, no cycles.',9,'#666','middle'),
  [
    e('Kruskal\'s Algorithm', 'DSU-based MST.', codeBlock([
      'function kruskal(vertices, edges) {',
      '  edges.sort((a, b) => a[2] - b[2]);',
      '  const uf = new UnionFind(vertices);',
      '  const mst = []; let cost = 0;',
      '  for (const [u, v, w] of edges) {',
      '    if (uf.union(u, v)) { mst.push([u, v, w]); cost += w; if (mst.length === vertices - 1) break; }',
      '  }',
      '  return { mst, cost };',
      '}'
    ]), 'Kruskal O(E log E) using DSU.'),
    e('Prim\'s Algorithm', 'Priority queue based MST.', codeBlock([
      'function prim(graph, start = 0) {',
      '  const visited = new Set([start]);',
      '  const pq = new MinHeap();',
      '  for (const [v, w] of graph[start]) pq.push(w, start, v);',
      '  const mst = []; let cost = 0;',
      '  while (pq.heap.length && mst.length < graph.length - 1) {',
      '    const [w, u, v] = pq.pop(); if (visited.has(v)) continue;',
      '    visited.add(v); mst.push([u, v, w]); cost += w;',
      '    for (const [neighbor, nw] of graph[v]) if (!visited.has(neighbor)) pq.push(nw, v, neighbor);',
      '  }',
      '  return { mst, cost };',
      '}'
    ]), 'Prim O(E log V) using min-heap.'),
    e('Connecting Cities (LeetCode)', 'MST to connect all points.', codeBlock([
      'function minimumCost(n, connections) {',
      '  const uf = new UnionFind(n + 1);',
      '  connections.sort((a, b) => a[2] - b[2]);',
      '  let cost = 0, edges = 0;',
      '  for (const [u, v, w] of connections) {',
      '    if (uf.union(u, v)) { cost += w; edges++; if (edges === n - 1) return cost; }',
      '  }',
      '  return -1;',
      '}'
    ]), 'Connect cities with minimum cost using Kruskal.'),
    e('Min Cost to Connect Points (Prim)', 'MST on 2D points.', codeBlock([
      'function minCostConnectPoints(points) {',
      '  const n = points.length;',
      '  const visited = new Array(n).fill(false);',
      '  const minDist = new Array(n).fill(Infinity); minDist[0] = 0;',
      '  let cost = 0, edges = 0;',
      '  while (edges < n) {',
      '    let u = -1;',
      '    for (let i = 0; i < n; i++) if (!visited[i] && (u === -1 || minDist[i] < minDist[u])) u = i;',
      '    visited[u] = true; cost += minDist[u]; edges++;',
      '    for (let v = 0; v < n; v++) if (!visited[v]) { const d = Math.abs(points[u][0]-points[v][0]) + Math.abs(points[u][1]-points[v][1]); if (d < minDist[v]) minDist[v] = d; }',
      '  }',
      '  return cost;',
      '}'
    ]), 'MST on points using Prim O(V^2).'),
    e('Critical Connections (Tarjan)', 'Find bridges in graph.', codeBlock([
      'function criticalConnections(n, connections) {',
      '  const graph = Array.from({length: n}, () => []);',
      '  for (const [u, v] of connections) { graph[u].push(v); graph[v].push(u); }',
      '  const visited = new Array(n).fill(false);',
      '  const disc = new Array(n).fill(0);',
      '  const low = new Array(n).fill(0);',
      '  const result = []; let time = 0;',
      '  function dfs(u, parent) { visited[u] = true; disc[u] = low[u] = ++time;',
      '    for (const v of graph[u]) {',
      '      if (v === parent) continue;',
      '      if (!visited[v]) { dfs(v, u); low[u] = Math.min(low[u], low[v]); if (low[v] > disc[u]) result.push([u, v]); }',
      '      else low[u] = Math.min(low[u], disc[v]);',
      '    }',
      '  }',
      '  for (let i = 0; i < n; i++) if (!visited[i]) dfs(i, -1);',
      '  return result;',
      '}'
    ]), 'Find bridges (Tarjan algorithm) O(V+E).')
  ],
  [
    m('How many edges in MST?', ['V', 'V-1', 'V+1', 'E'], 1, 'V-1 edges.'),
    m('What data structure for Kruskal?', ['Queue', 'Stack', 'DSU (Union-Find)', 'Hash set'], 2, 'DSU for cycle detection.'),
    m('Kruskal time complexity?', ['O(V+E)', 'O(E log E)', 'O(V^2)', 'O(E*V)'], 1, 'O(E log E) for sorting.'),
    m('Prim time complexity with heap?', ['O(V+E)', 'O(E log V)', 'O(V^2)', 'O(E log E)'], 1, 'O(E log V) with binary heap.'),
    m('What property says min edge in cut is in MST?', ['Cycle property', 'Cut property', 'Path property', 'Edge property'], 1, 'Cut property.'),
    m('When is MST unique?', ['Always unique', 'When weights are distinct', 'Never unique', 'For complete graphs'], 1, 'Unique when all edge weights are distinct.')
  ]
);

/* =================== TOPIC 29: String Matching =================== */
addTopic('dsa-string-matching', 'String Matching', 'intermediate', 15,
  ['String matching algorithms find occurrences of a pattern string within a text string efficiently.',
   'Naive: O(n*m) \u2014 simple but slow for large inputs. KMP: O(n+m) \u2014 uses prefix function to avoid re-scanning.',
   'Rabin-Karp: O(n+m) average, O(n*m) worst \u2014 uses rolling hash for efficient comparison.',
   'Boyer-Moore: O(n*m) worst, sublinear average \u2014 skips sections using bad character and good suffix rules.'
  ],
  'String matching is like searching for a word in a book. You want to find every page where a specific word appears. Naive approach checks every word position. KMP is smarter: when a mismatch occurs, it uses knowledge of the pattern to skip ahead, like knowing that "ab" in "abc" means you don\'t need to re-check "ab".',
  [
    d('KMP (Knuth-Morris-Pratt)', 'Preprocess pattern to create LPS (Longest Prefix Suffix) array. LPS[i] = length of longest proper prefix matching suffix for pattern[0..i]. When mismatch occurs, shift pattern by i - LPS[i-1] characters. Never backtrack text pointer. O(n+m) guaranteed.'),
    d('Rabin-Karp', 'Compute hash of pattern and hash of each window of text. If hashes match, verify character by character. Rolling hash: subtract leftmost char, add rightmost char in O(1). Good for multiple pattern search. Worst-case O(n*m) when many hash collisions.'),
    d('Boyer-Moore', 'Compare pattern from rightmost character. Bad character rule: shift right until mismatch aligns with same char in pattern. Good suffix rule: shift right until matched suffix appears again. Sublinear average case. Used in GNU grep.'),
    d('Applications', 'Text editors (Ctrl+F). DNA sequence matching. Plagiarism detection. Intrusion detection systems. Web search. diff/patch tools. Version control (git diff).')
  ],
  'String matching finds pattern occurrences in text. Naive O(n*m). KMP O(n+m) with LPS array. Rabin-Karp uses rolling hash. Boyer-Moore sublinear average. KMP is the most interview-relevant. Know how LPS array is computed and used.',
  [
    q('What is string matching?', 'Finding occurrences of a pattern string within a text string.'),
    q('What is naive string matching complexity?', 'O(n*m) where n is text length, m is pattern length.'),
    q('What is KMP complexity?', 'O(n+m) \u2014 linear in both text and pattern length.'),
    q('What does LPS array store?', 'Length of longest proper prefix of pattern[0..i] that is also a suffix.'),
    q('What is the key insight of KMP?', 'Use matching information from previous comparisons to skip ahead.'),
    q('What does Rabin-Karp use?', 'Rolling hash for efficient O(1) sliding window comparison.'),
    q('What is the worst-case of Rabin-Karp?', 'O(n*m) when many hash collisions occur.'),
    q('What is the average case of Rabin-Karp?', 'O(n+m).'),
    q('Which algorithm is best in practice?', 'Boyer-Moore has sublinear average case. Used in GNU grep.'),
    q('What is rolling hash?', 'Hash that can be computed from previous hash in O(1) by removing left char and adding right char.')
  ],
  R(10,35,110,25,'#0070f3','','Pattern','abcab') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','LPS Array','[0,0,0,1,2]') +
  R(10,70,110,25,'#ffc107','','Text','abcabcab') +
  A(120,83,150,83) +
  R(160,70,100,25,'#dc3545','','Match?','Yes/No') +
  R(10,105,110,25,'#e83e8c','','Mismatch','Shift by LPS') +
  R(10,135,110,25,'#6610f2','','KMP','O(n+m)') +
  R(130,135,110,25,'#17a2b8','','Rabin-Karp','Rolling Hash') +
  R(280,35,160,150,'#17a2b8','','String Matching','KMP (LPS), Rabin-Karp (hash), Boyer-Moore (skip rules). O(n+m).') +
  T(240,220,'String Matching: KMP O(n+m) with LPS array. Rabin-Karp with rolling hash. Boyer-Moore sublinear.',9,'#666','middle'),
  [
    e('Naive String Matching', 'Brute force approach.', codeBlock([
      'function naiveSearch(text, pattern) {',
      '  const result = [];',
      '  for (let i = 0; i <= text.length - pattern.length; i++) {',
      '    let match = true;',
      '    for (let j = 0; j < pattern.length; j++)',
      '      if (text[i + j] !== pattern[j]) { match = false; break; }',
      '    if (match) result.push(i);',
      '  }',
      '  return result;',
      '}'
    ]), 'Naive O(n*m).'),
    e('KMP Algorithm', 'Linear time string matching.', codeBlock([
      'function kmp(text, pattern) {',
      '  function buildLPS(p) {',
      '    const lps = new Array(p.length).fill(0);',
      '    let len = 0, i = 1;',
      '    while (i < p.length) {',
      '      if (p[i] === p[len]) { len++; lps[i] = len; i++; }',
      '      else if (len > 0) len = lps[len - 1];',
      '      else { lps[i] = 0; i++; }',
      '    }',
      '    return lps;',
      '  }',
      '  const lps = buildLPS(pattern);',
      '  const result = [];',
      '  let i = 0, j = 0;',
      '  while (i < text.length) {',
      '    if (text[i] === pattern[j]) { i++; j++; }',
      '    if (j === pattern.length) { result.push(i - j); j = lps[j - 1]; }',
      '    else if (i < text.length && text[i] !== pattern[j]) {',
      '      if (j !== 0) j = lps[j - 1]; else i++;',
      '    }',
      '  }',
      '  return result;',
      '}'
    ]), 'KMP O(n+m).'),
    e('Rabin-Karp', 'Rolling hash string matching.', codeBlock([
      'function rabinKarp(text, pattern) {',
      '  const base = 256, mod = 101;',
      '  const n = text.length, m = pattern.length;',
      '  let pHash = 0, tHash = 0, h = 1;',
      '  for (let i = 0; i < m - 1; i++) h = (h * base) % mod;',
      '  for (let i = 0; i < m; i++) { pHash = (pHash * base + pattern.charCodeAt(i)) % mod; tHash = (tHash * base + text.charCodeAt(i)) % mod; }',
      '  const result = [];',
      '  for (let i = 0; i <= n - m; i++) {',
      '    if (pHash === tHash && text.slice(i, i + m) === pattern) result.push(i);',
      '    if (i < n - m) { tHash = (base * (tHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % mod; if (tHash < 0) tHash += mod; }',
      '  }',
      '  return result;',
      '}'
    ]), 'Rabin-Karp O(n+m) average, O(n*m) worst.'),
    e('Longest Palindromic Substring', 'Expand around center.', codeBlock([
      'function longestPalindrome(s) {',
      '  if (!s || s.length < 2) return s;',
      '  let start = 0, maxLen = 1;',
      '  function expand(l, r) { while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; } return [l + 1, r - l - 1]; }',
      '  for (let i = 0; i < s.length; i++) {',
      '    const [l1, len1] = expand(i, i); const [l2, len2] = expand(i, i + 1);',
      '    if (len1 > maxLen) { start = l1; maxLen = len1; }',
      '    if (len2 > maxLen) { start = l2; maxLen = len2; }',
      '  }',
      '  return s.slice(start, start + maxLen);',
      '}'
    ]), 'Expand around center O(n^2).'),
    e('Word Break (DP)', 'Check if string can be segmented.', codeBlock([
      'function wordBreak(s, wordDict) {',
      '  const set = new Set(wordDict);',
      '  const dp = new Array(s.length + 1).fill(false); dp[0] = true;',
      '  for (let i = 1; i <= s.length; i++)',
      '    for (let j = 0; j < i; j++)',
      '      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }',
      '  return dp[s.length];',
      '}'
    ]), 'Word break DP O(n^2).')
  ],
  [
    m('KMP time complexity?', ['O(n*m)', 'O(n+m)', 'O(n log m)', 'O(n^2)'], 1, 'O(n+m) linear.'),
    m('What does LPS stand for?', ['Longest Pattern String', 'Longest Prefix Suffix', 'Linear Pattern Search', 'Lowest Possible Shift'], 1, 'Longest Prefix Suffix.'),
    m('Rabin-Karp uses what technique?', ['Prefix sums', 'Rolling hash', 'Binary search', 'Dynamic programming'], 1, 'Rolling hash for O(1) window update.'),
    m('Boyer-Moore compares from which side?', ['Left', 'Right', 'Middle', 'Random'], 1, 'Compares from rightmost character.'),
    m('What is the worst case for Rabin-Karp?', ['O(n+m)', 'O(n*m)', 'O(n^2)', 'O(m log n)'], 1, 'O(n*m) with many hash collisions.'),
    m('What is the best average case algorithm?', ['Naive', 'KMP', 'Boyer-Moore', 'Rabin-Karp'], 2, 'Boyer-Moore has sublinear average case.')
  ]
);

/* =================== TOPIC 30: Time Complexity =================== */
addTopic('dsa-time-complexity', 'Time Complexity', 'beginner', 10,
  ['Time complexity describes how the runtime of an algorithm grows as input size increases, using Big-O notation.',
   'Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n), O(n^2) quadratic, O(2^n) exponential.',
   'Big-O is upper bound (worst-case). Big-Theta is tight bound. Big-Omega is lower bound (best-case).',
   'Space complexity measures how much extra memory an algorithm needs, also in terms of input size.'
  ],
  'Time complexity is like estimating how long a recipe takes as you scale up ingredients. Chopping one onion takes constant time. Peeling a bag of potatoes takes linear time (each potato). Comparing every pair of ingredients takes quadratic time. It helps predict if your algorithm will be fast enough for large inputs.',
  [
    d('Big-O Notation', 'O(g(n)) = { f(n): there exist positive constants c and n0 such that 0 <= f(n) <= c*g(n) for all n >= n0 }. Upper bound. Dropping constants and lower-order terms. O(n^2 + n + 1) = O(n^2).'),
    d('Common Complexity Classes', 'O(1): array access. O(log n): binary search. O(n): linear search. O(n log n): merge sort. O(n^2): bubble sort. O(2^n): subsets. O(n!): permutations. Each order of magnitude slower for large n.'),
    d('How to Analyze', 'Count operations as function of input size. Nested loops multiply. Sequential loops add. Recursion: solve recurrence T(n) = a*T(n/b) + f(n) using Master Theorem: T(n) = a*T(n/b) + O(n^d). If d > log_b(a), O(n^d). If d = log_b(a), O(n^d log n). If d < log_b(a), O(n^(log_b(a))).'),
    d('Space Complexity', 'In-place algorithms: O(1) extra space. Recursive algorithms: O(depth) for call stack. DP tables: O(n*m). Auxiliary data structures: O(n). Always consider whether input size is counted or not.')
  ],
  'Time complexity quantifies algorithm efficiency using Big-O. Analyze loops (nested = multiply, sequential = add). Recursion via Master Theorem. Always consider both time and space. Dropping constants is standard. O(n log n) is generally the best achievable for comparison-based sorting.',
  [
    q('What is time complexity?', 'A measure of how algorithm runtime grows with input size.'),
    q('What is Big-O notation?', 'Upper bound on growth rate. O(g(n)) means runtime grows no faster than g(n).'),
    q('What is O(1)?', 'Constant time \u2014 does not depend on input size.'),
    q('What is O(log n)?', 'Logarithmic \u2014 divides problem in half each step (binary search).'),
    q('What is O(n)?', 'Linear \u2014 proportional to input size.'),
    q('What is O(n^2)?', 'Quadratic \u2014 nested loops over input.'),
    q('What is the difference between Big-O and Big-Theta?', 'Big-O is upper bound. Big-Theta is tight bound (both upper and lower).'),
    q('What is space complexity?', 'Measure of extra memory needed by an algorithm.'),
    q('How to analyze nested loops?', 'Multiply complexities of each loop.'),
    q('What is the best sorting complexity?', 'O(n log n) for comparison-based sorting.')
  ],
  R(10,35,110,25,'#0070f3','','O(1)','Constant') +
  R(10,65,110,25,'#28a745','','O(log n)','Logarithmic') +
  R(10,95,110,25,'#ffc107','','O(n)','Linear') +
  R(10,125,110,25,'#dc3545','','O(n log n)','Linearithmic') +
  R(10,155,110,25,'#e83e8c','','O(n^2)','Quadratic') +
  R(10,185,110,25,'#6610f2','','O(2^n)','Exponential') +
  R(250,35,200,170,'#17a2b8','','Big-O Complexity','Upper bound. Drop constants and lower terms. n^2 + n + 1 = O(n^2). Analyze loops and recursion.') +
  T(240,235,'Time Complexity: Big-O measures growth rate. O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n). Master Theorem for recursion.',9,'#666','middle'),
  [
    e('Analyzing Loops', 'Count operations from nested loops.', codeBlock([
      'function exampleOofN2(n) {',
      '  let count = 0;',
      '  // O(n) * O(n) = O(n^2)',
      '  for (let i = 0; i < n; i++)',
      '    for (let j = 0; j < n; j++)',
      '      count++;',
      '  return count; // n^2 operations',
      '}',
      'function exampleOofN(n) {',
      '  let count = 0;',
      '  for (let i = 0; i < n; i += 2)',
      '    count++; // n/2 = O(n)',
      '  for (let i = 1; i < n; i *= 2)',
      '    count++; // log n = O(log n)',
      '  return count; // O(n) total',
      '}'
    ]), 'Nested loops multiply, sequential loops add.'),
    e('Recursion Analysis', 'Using recurrence relations.', codeBlock([
      '// Merge Sort: T(n) = 2*T(n/2) + O(n)',
      '// Master Theorem: a=2, b=2, d=1 => O(n log n)',
      '',
      '// Binary Search: T(n) = T(n/2) + O(1)',
      '// Master Theorem: a=1, b=2, d=0 => O(log n)',
      '',
      '// Fibonacci (naive): T(n) = T(n-1) + T(n-2) + O(1)',
      '// Fibonacci: O(2^n) exponential!',
      '',
      '// Fibonacci (DP): O(n) linear with memoization'
    ]), 'Recurrence analysis using Master Theorem.'),
    e('Space Complexity Examples', 'Different space usage patterns.', codeBlock([
      '// O(1) - in-place',
      'function sum(arr) { let s = 0; for (const x of arr) s += x; return s; }',
      '',
      '// O(n) - extra array',
      'function copy(arr) { return [...arr]; }',
      '',
      '// O(n^2) - matrix',
      'function matrix(n) { return Array.from({length: n}, () => new Array(n).fill(0)); }',
      '',
      '// O(log n) - recursion depth (binary search)',
      'function binarySearch(arr, x, lo, hi) {',
      '  if (lo > hi) return -1;',
      '  const mid = Math.floor((lo + hi) / 2);',
      '  if (arr[mid] === x) return mid;',
      '  return arr[mid] > x ? binarySearch(arr, x, lo, mid - 1) : binarySearch(arr, x, mid + 1, hi);',
      '}'
    ]), 'Space complexity: O(1), O(n), O(n^2), O(log n).'),
    e('Big-O Ranking', 'Visual growth comparison.', codeBlock([
      '// n = 10, 100, 1000, 10000',
      '// O(1):    1, 1, 1, 1',
      '// O(log n): 1, 2, 3, 4',
      '// O(n):    10, 100, 1000, 10000',
      '// O(n log n): 10, 200, 3000, 40000',
      '// O(n^2):  100, 10000, 1M, 100M',
      '// O(2^n):  1024, 1.27e30, huge, huge',
      '// Choose wisely! n log n vs n^2 matters.',
      '// For n=100k: n log n ~ 1.7M, n^2 ~ 10B.'
    ]), 'Growth comparison shows why complexity matters.'),
    e('Master Theorem', 'Solving recurrence relations.', codeBlock([
      '// T(n) = a*T(n/b) + O(n^d)',
      '// Case 1: d > log_b(a) => O(n^d)',
      '// Case 2: d = log_b(a) => O(n^d * log n)',
      '// Case 3: d < log_b(a) => O(n^(log_b(a)))',
      '',
      '// Examples:',
      '// Merge Sort: a=2, b=2, d=1 => log_2(2)=1 => d=1 => O(n log n)',
      '// Binary Search: a=1, b=2, d=0 => log_2(1)=0 => d=0 => O(log n)',
      '// Strassen: a=7, b=2, d=2 => log_2(7)~2.81 > 2 => O(n^2.81)'
    ]), 'Master Theorem for divide-and-conquer recurrences.')
  ],
  [
    m('What does Big-O represent?', ['Average case', 'Upper bound', 'Lower bound', 'Tight bound'], 1, 'Upper bound (worst-case).'),
    m('What is O(log n)?', ['Constant', 'Linear', 'Logarithmic', 'Quadratic'], 2, 'Logarithmic \u2014 binary search.'),
    m('What is the complexity of merge sort?', ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'], 2, 'O(n log n).'),
    m('How to analyze nested loops?', ['Add', 'Subtract', 'Multiply', 'Divide'], 2, 'Multiply the complexities.'),
    m('What is the best sorting complexity?', ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], 1, 'O(n log n) for comparison-based.'),
    m('What does Master Theorem solve?', ['Graph problems', 'Recurrence relations', 'Sorting networks', 'Hash collisions'], 1, 'Recurrence relations T(n) = a*T(n/b) + f(n).')
  ]
);

/* =================== GENERATE DSA TOPICS =================== */
var dataDir = __dirname;
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["dsa"] = TOPICS_DATA["dsa"] || {};');

for (var id in topics) {
  lines.push('TOPICS_DATA["dsa"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}

var padTopics = require('../pad-topics.js');
padTopics(topics);
console.log('Generated DSA topics: ' + Object.keys(topics).length);
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated DSA topics: ' + Object.keys(topics).length);


