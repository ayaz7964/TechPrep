const fs = require('fs');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }
function svgW(w, h, title, inner) {
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif">' +
    '<rect x="0" y="0" width="'+w+'" height="'+h+'" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>' +
    '<text x="'+(w/2)+'" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">'+title+'</text>' +
    inner + '</svg>';
}
function R(x,y,w,h,fill,stroke,t1,t2,c1,c2) {
  var box = '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+fill+'" stroke="'+(stroke||fill)+'" stroke-width="1"/>';
  if (t1) box += '<text x="'+(x+w/2)+'" y="'+(y+(t2?16:20))+'" text-anchor="middle" font-size="11" font-weight="bold" fill="'+(c1||'#fff')+'">'+t1+'</text>';
  if (t2) box += '<text x="'+(x+w/2)+'" y="'+(y+28)+'" text-anchor="middle" font-size="9" fill="'+(c2||'#ddd')+'">'+t2+'</text>';
  return box;
}
function A(x1,y1,x2,y2,c) {
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||'#666')+'" stroke-width="1.5" marker-end="url(#arrow)"/>';
}
function T(x,y,text,size,color,anchor) {
  return '<text x="'+x+'" y="'+y+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+text+'</text>';
}

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 200, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}


/* =================== TOPIC 1: Arrays =================== */
addTopic("dsa-arrays", "Arrays", "beginner", 20,
  ["Arrays store elements in contiguous memory with O(1) random access by index.",
   "Static arrays have fixed size; dynamic arrays (like JavaScript arrays, ArrayList) resize automatically.",
   "Insertion/deletion at end is O(1) amortized; insertion/deletion at beginning or middle is O(n) due to shifting.",
   "Key operations: access O(1), search O(n), insertion O(n), deletion O(n)."
  ],
  "An array is like a row of lockers numbered 0, 1, 2, 3... Each locker holds one item. You open locker #3 instantly because you know its exact position. But if you want to add a new locker at the front, you must shift every locker\x27s contents down one position.",
  [
    d("Static vs Dynamic Arrays", "Static arrays are allocated with a fixed size at creation (C, C++, Java). Dynamic arrays (ArrayList, vector, JavaScript/Python lists) start with a capacity and grow by doubling when full. Growth is O(n) but amortized over n insertions gives O(1) average. The growth factor is commonly 2x (Java) or 1.5x (C++)."),
    d("Memory Layout", "Array elements are stored in contiguous memory addresses. Element at index i is at address: base + i * elementSize. This enables O(1) random access. Cache locality is excellent since adjacent elements are stored together \u2014 modern CPUs load cache lines (64 bytes) of sequential memory."),
    d("Time Complexity Analysis", "Access by index: O(1). Search (unsorted): O(n). Search (sorted, binary search): O(log n). Insert at end: O(1) amortized. Insert at beginning/middle: O(n). Delete at end: O(1). Delete at beginning/middle: O(n). The O(n) operations make arrays poor for frequent insertions/deletions at arbitrary positions."),
    d("Applications", "Storing ordered data (lists, sequences). Matrix computations (2D arrays). Implementation of other data structures (heaps use arrays for complete binary trees). Buffer/queue with circular array. Lookup tables. Dynamic programming tabulation. Sorting algorithms (quicksort, mergesort) operate on arrays.")
  ],
  "Arrays are the most fundamental data structure. Master O(1) random access and understand the cost of insertions/deletions. Use arrays when you need fast access by index and mainly append operations. For frequent insertions in the middle, consider linked lists. For search-heavy workloads, sort and use binary search or use a hash table.",
  [
    q("What is the time complexity of array access by index?", "O(1) \u2014 direct memory address calculation."),
    q("What is the time complexity of searching an unsorted array?", "O(n) \u2014 linear search through all elements."),
    q("What is the growth factor of dynamic arrays?", "Typically 2x (Java ArrayList) or 1.5x (C++ vector)."),
    q("Why are arrays cache-friendly?", "Contiguous memory layout \u2014 adjacent elements are loaded together in CPU cache lines."),
    q("What is the amortized insertion cost at end of dynamic array?", "O(1) \u2014 occasional O(n) resize is spread across n insertions."),
    q("What is worst-case insertion cost at beginning of array?", "O(n) \u2014 all elements must shift right by one position."),
    q("What is the address formula for array element at index i?", "baseAddress + i * elementSize."),
    q("What data structure uses arrays for complete binary trees?", "Heaps (binary heaps use array indexing: left child at 2i+1, right at 2i+2)."),
    q("What is the time complexity of binary search on sorted array?", "O(log n)."),
    q("When should you NOT use an array?", "When you need frequent insertions/deletions in the middle \u2014 use a linked list instead.")
  ],
  R(10,35,100,25,"#0070f3","","Index 0","Element A") +
  R(10,65,100,25,"#28a745","","Index 1","Element B") +
  R(10,95,100,25,"#ffc107","","Index 2","Element C") +
  R(10,125,100,25,"#dc3545","","Index 3","Element D") +
  R(10,155,100,25,"#e83e8c","","Index 4","Element E") +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,"#17a2b8","","Array (Contiguous Memory)","O(1) access by index. Static: fixed size. Dynamic: auto-resizing.") +
  T(240,220,"Arrays: Contiguous memory, O(1) index access, O(n) insert/delete at arbitrary positions.",9,"#666","middle"),
  [
    e("Dynamic Array (JavaScript)", "Auto-resizing array implementation.", codeBlock([
      "class DynamicArray {",
      "  constructor(capacity = 4) {",
      "    this.capacity = capacity;",
      "    this.length = 0;",
      "    this.data = new Array(capacity);",
      "  }",
      "",
      "  get(index) {",
      "    if (index < 0 || index >= this.length)",
      "      throw new Error(\"Index out of bounds\");",
      "    return this.data[index];",
      "  }",
      "",
      "  push(element) {",
      "    if (this.length === this.capacity)",
      "      this._resize(this.capacity * 2);",
      "    this.data[this.length++] = element;",
      "  }",
      "",
      "  _resize(newCapacity) {",
      "    const newData = new Array(newCapacity);",
      "    for (let i = 0; i < this.length; i++)",
      "      newData[i] = this.data[i];",
      "    this.data = newData;",
      "    this.capacity = newCapacity;",
      "  }",
      "}"
    ]), "Dynamic array with doubling resize strategy \u2014 amortized O(1) push."),
    e("Two Sum (Hash Map)", "Classic array problem using hash map.", codeBlock([
      "function twoSum(nums, target) {",
      "  const map = new Map();",
      "  for (let i = 0; i < nums.length; i++) {",
      "    const complement = target - nums[i];",
      "    if (map.has(complement))",
      "      return [map.get(complement), i];",
      "    map.set(nums[i], i);",
      "  }",
      "  return [];",
      "}",
      "",
      "// nums = [2, 7, 11, 15], target = 9",
      "// Returns [0, 1] because 2 + 7 = 9"
    ]), "Two Sum \u2014 O(n) using hash map for complement lookup."),
    e("Rotate Array (Reversal)", "Rotate array k steps to the right.", codeBlock([
      "function rotate(nums, k) {",
      "  k = k % nums.length;",
      "  reverse(nums, 0, nums.length - 1);",
      "  reverse(nums, 0, k - 1);",
      "  reverse(nums, k, nums.length - 1);",
      "}",
      "",
      "function reverse(arr, start, end) {",
      "  while (start < end) {",
      "    [arr[start], arr[end]] = [arr[end], arr[start]];",
      "    start++;",
      "    end--;",
      "  }",
      "}",
      "",
      "// [1,2,3,4,5,6,7], k=3 => [5,6,7,1,2,3,4]"
    ]), "Rotate array in O(n) time and O(1) space using three reversals."),
    e("Maximum Subarray (Kadane)", "Find contiguous subarray with max sum.", codeBlock([
      "function maxSubArray(nums) {",
      "  let maxEndingHere = nums[0];",
      "  let maxSoFar = nums[0];",
      "",
      "  for (let i = 1; i < nums.length; i++) {",
      "    maxEndingHere = Math.max(",
      "      nums[i], maxEndingHere + nums[i]",
      "    );",
      "    maxSoFar = Math.max(maxSoFar, maxEndingHere);",
      "  }",
      "  return maxSoFar;",
      "}",
      "",
      "// [-2,1,-3,4,-1,2,1,-5,4] => 6 ([4,-1,2,1])"
    ]), "Kadane\x27s algorithm \u2014 O(n) time, O(1) space for maximum subarray sum."),
    e("Merge Sorted Arrays (Two Pointers)", "Merge two sorted arrays in O(m+n).", codeBlock([
      "function mergeSorted(nums1, m, nums2, n) {",
      "  let i = m - 1, j = n - 1, k = m + n - 1;",
      "",
      "  while (i >= 0 && j >= 0) {",
      "    if (nums1[i] > nums2[j])",
      "      nums1[k--] = nums1[i--];",
      "    else",
      "      nums1[k--] = nums2[j--];",
      "  }",
      "",
      "  while (j >= 0) nums1[k--] = nums2[j--];",
      "}"
    ]), "Merge two sorted arrays from the end using two pointers avoids overwriting.")
  ],
  [
    m("What is the time complexity of accessing an array by index?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 0, "Array access by index is O(1) \u2014 direct memory address calculation."),
    m("What is the amortized time complexity of push() on a dynamic array?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 0, "Amortized O(1) \u2014 occasional O(n) resize is spread across n insertions."),
    m("What technique finds the max subarray sum in O(n)?", ["Binary search", "Kadane\x27s algorithm", "Divide and conquer", "Two pointers"], 1, "Kadane\x27s algorithm finds the maximum subarray sum in O(n) time, O(1) space."),
    m("Why are arrays cache-friendly?", ["They use less memory", "Contiguous memory improves cache locality", "They are dynamically sized", "They support binary search"], 1, "Contiguous memory layout means adjacent elements are loaded together in CPU cache lines."),
    m("What is the formula for element address at index i?", ["base + i * 8", "base + i * elementSize", "base * i + elementSize", "base + elementSize^i"], 1, "Element address = baseAddress + i * elementSize."),
    m("What is the worst-case time for inserting at the beginning of an array?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 2, "Inserting at the beginning requires shifting all existing elements \u2014 O(n).")
  ]
);

/* =================== TOPIC 1: Arrays =================== */
addTopic("dsa-arrays", "Arrays", "beginner", 20,
  ["Arrays store elements in contiguous memory with O(1) random access by index.",
   "Static arrays have fixed size; dynamic arrays (like JavaScript arrays, ArrayList) resize automatically.",
   "Insertion/deletion at end is O(1) amortized; insertion/deletion at beginning or middle is O(n) due to shifting.",
   "Key operations: access O(1), search O(n), insertion O(n), deletion O(n)."
  ],
  "An array is like a row of lockers numbered 0, 1, 2, 3... Each locker holds one item. You open locker #3 instantly because you know its exact position. But if you want to add a new locker at the front, you must shift every locker\x27s contents down one position.",
  [
    d("Static vs Dynamic Arrays", "Static arrays are allocated with a fixed size at creation (C, C++, Java). Dynamic arrays (ArrayList, vector, JavaScript/Python lists) start with a capacity and grow by doubling when full. Growth is O(n) but amortized over n insertions gives O(1) average. The growth factor is commonly 2x (Java) or 1.5x (C++)."),
    d("Memory Layout", "Array elements are stored in contiguous memory addresses. Element at index i is at address: base + i * elementSize. This enables O(1) random access. Cache locality is excellent since adjacent elements are stored together \u2014 modern CPUs load cache lines (64 bytes) of sequential memory."),
    d("Time Complexity Analysis", "Access by index: O(1). Search (unsorted): O(n). Search (sorted, binary search): O(log n). Insert at end: O(1) amortized. Insert at beginning/middle: O(n). Delete at end: O(1). Delete at beginning/middle: O(n). The O(n) operations make arrays poor for frequent insertions/deletions at arbitrary positions."),
    d("Applications", "Storing ordered data (lists, sequences). Matrix computations (2D arrays). Implementation of other data structures (heaps use arrays for complete binary trees). Buffer/queue with circular array. Lookup tables. Dynamic programming tabulation. Sorting algorithms (quicksort, mergesort) operate on arrays.")
  ],
  "Arrays are the most fundamental data structure. Master O(1) random access and understand the cost of insertions/deletions. Use arrays when you need fast access by index and mainly append operations. For frequent insertions in the middle, consider linked lists. For search-heavy workloads, sort and use binary search or use a hash table.",
  [
    q("What is the time complexity of array access by index?", "O(1) \u2014 direct memory address calculation."),
    q("What is the time complexity of searching an unsorted array?", "O(n) \u2014 linear search through all elements."),
    q("What is the growth factor of dynamic arrays?", "Typically 2x (Java ArrayList) or 1.5x (C++ vector)."),
    q("Why are arrays cache-friendly?", "Contiguous memory layout \u2014 adjacent elements are loaded together in CPU cache lines."),
    q("What is the amortized insertion cost at end of dynamic array?", "O(1) \u2014 occasional O(n) resize is spread across n insertions."),
    q("What is worst-case insertion cost at beginning of array?", "O(n) \u2014 all elements must shift right by one position."),
    q("What is the address formula for array element at index i?", "baseAddress + i * elementSize."),
    q("What data structure uses arrays for complete binary trees?", "Heaps (binary heaps use array indexing: left child at 2i+1, right at 2i+2)."),
    q("What is the time complexity of binary search on sorted array?", "O(log n)."),
    q("When should you NOT use an array?", "When you need frequent insertions/deletions in the middle \u2014 use a linked list instead.")
  ],
  R(10,35,100,25,"#0070f3","","Index 0","Element A") +
  R(10,65,100,25,"#28a745","","Index 1","Element B") +
  R(10,95,100,25,"#ffc107","","Index 2","Element C") +
  R(10,125,100,25,"#dc3545","","Index 3","Element D") +
  R(10,155,100,25,"#e83e8c","","Index 4","Element E") +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,"#17a2b8","","Array (Contiguous Memory)","O(1) access by index. Static: fixed size. Dynamic: auto-resizing.") +
  T(240,220,"Arrays: Contiguous memory, O(1) index access, O(n) insert/delete at arbitrary positions.",9,"#666","middle"),
  [
    e("Dynamic Array (JavaScript)", "Auto-resizing array implementation.", codeBlock([
      "class DynamicArray {",
      "  constructor(capacity = 4) {",
      "    this.capacity = capacity;",
      "    this.length = 0;",
      "    this.data = new Array(capacity);",
      "  }",
      "",
      "  get(index) {",
      "    if (index < 0 || index >= this.length)",
      "      throw new Error(\"Index out of bounds\");",
      "    return this.data[index];",
      "  }",
      "",
      "  push(element) {",
      "    if (this.length === this.capacity)",
      "      this._resize(this.capacity * 2);",
      "    this.data[this.length++] = element;",
      "  }",
      "",
      "  _resize(newCapacity) {",
      "    const newData = new Array(newCapacity);",
      "    for (let i = 0; i < this.length; i++)",
      "      newData[i] = this.data[i];",
      "    this.data = newData;",
      "    this.capacity = newCapacity;",
      "  }",
      "}"
    ]), "Dynamic array with doubling resize strategy \u2014 amortized O(1) push."),
    e("Two Sum (Hash Map)", "Classic array problem using hash map.", codeBlock([
      "function twoSum(nums, target) {",
      "  const map = new Map();",
      "  for (let i = 0; i < nums.length; i++) {",
      "    const complement = target - nums[i];",
      "    if (map.has(complement))",
      "      return [map.get(complement), i];",
      "    map.set(nums[i], i);",
      "  }",
      "  return [];",
      "}",
      "",
      "// nums = [2, 7, 11, 15], target = 9",
      "// Returns [0, 1] because 2 + 7 = 9"
    ]), "Two Sum \u2014 O(n) using hash map for complement lookup."),
    e("Rotate Array (Reversal)", "Rotate array k steps to the right.", codeBlock([
      "function rotate(nums, k) {",
      "  k = k % nums.length;",
      "  reverse(nums, 0, nums.length - 1);",
      "  reverse(nums, 0, k - 1);",
      "  reverse(nums, k, nums.length - 1);",
      "}",
      "",
      "function reverse(arr, start, end) {",
      "  while (start < end) {",
      "    [arr[start], arr[end]] = [arr[end], arr[start]];",
      "    start++;",
      "    end--;",
      "  }",
      "}",
      "",
      "// [1,2,3,4,5,6,7], k=3 => [5,6,7,1,2,3,4]"
    ]), "Rotate array in O(n) time and O(1) space using three reversals."),
    e("Maximum Subarray (Kadane)", "Find contiguous subarray with max sum.", codeBlock([
      "function maxSubArray(nums) {",
      "  let maxEndingHere = nums[0];",
      "  let maxSoFar = nums[0];",
      "",
      "  for (let i = 1; i < nums.length; i++) {",
      "    maxEndingHere = Math.max(",
      "      nums[i], maxEndingHere + nums[i]",
      "    );",
      "    maxSoFar = Math.max(maxSoFar, maxEndingHere);",
      "  }",
      "  return maxSoFar;",
      "}",
      "",
      "// [-2,1,-3,4,-1,2,1,-5,4] => 6 ([4,-1,2,1])"
    ]), "Kadane\x27s algorithm \u2014 O(n) time, O(1) space for maximum subarray sum."),
    e("Merge Sorted Arrays (Two Pointers)", "Merge two sorted arrays in O(m+n).", codeBlock([
      "function mergeSorted(nums1, m, nums2, n) {",
      "  let i = m - 1, j = n - 1, k = m + n - 1;",
      "",
      "  while (i >= 0 && j >= 0) {",
      "    if (nums1[i] > nums2[j])",
      "      nums1[k--] = nums1[i--];",
      "    else",
      "      nums1[k--] = nums2[j--];",
      "  }",
      "",
      "  while (j >= 0) nums1[k--] = nums2[j--];",
      "}"
    ]), "Merge two sorted arrays from the end using two pointers avoids overwriting.")
  ],
  [
    m("What is the time complexity of accessing an array by index?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 0, "Array access by index is O(1) \u2014 direct memory address calculation."),
    m("What is the amortized time complexity of push() on a dynamic array?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 0, "Amortized O(1) \u2014 occasional O(n) resize is spread across n insertions."),
    m("What technique finds the max subarray sum in O(n)?", ["Binary search", "Kadane\x27s algorithm", "Divide and conquer", "Two pointers"], 1, "Kadane\x27s algorithm finds the maximum subarray sum in O(n) time, O(1) space."),
    m("Why are arrays cache-friendly?", ["They use less memory", "Contiguous memory improves cache locality", "They are dynamically sized", "They support binary search"], 1, "Contiguous memory layout means adjacent elements are loaded together in CPU cache lines."),
    m("What is the formula for element address at index i?", ["base + i * 8", "base + i * elementSize", "base * i + elementSize", "base + elementSize^i"], 1, "Element address = baseAddress + i * elementSize."),
    m("What is the worst-case time for inserting at the beginning of an array?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 2, "Inserting at the beginning requires shifting all existing elements \u2014 O(n).")
  ]
);

/* =================== TOPIC 2: Linked Lists =================== */
addTopic("dsa-linked-lists", "Linked Lists", "beginner", 20,
  ["A linked list is a linear data structure where elements (nodes) are connected via pointers, not stored contiguously.",
   "Singly linked: each node has data + next pointer. Doubly linked: each node has prev + next pointers.",
   "Insertion/deletion at head is O(1). No random access \u2014 must traverse from head to find an element (O(n)).",
   "Linked lists excel at frequent insertions/deletions but have poor cache locality due to scattered memory allocation."
  ],
  "A linked list is like a treasure hunt. Each clue (node) tells you where to find the next clue. To find the 5th clue, you must follow clues 1, 2, 3, and 4. But adding a new clue between two existing ones is easy \u2014 just change where the previous clue points.",
  [
    d("Singly vs Doubly Linked", "Singly linked: each node has data and next pointer. Traversal is one direction only (head to tail). Doubly linked: nodes have prev and next pointers. Traversal both directions. Doubly uses more memory (extra pointer per node) but enables O(1) deletion at tail and reverse traversal."),
    d("Time Complexity", "Insert at head: O(1). Insert at tail (if tail pointer): O(1). Insert in middle: O(n) to find position + O(1) to link. Delete at head: O(1). Delete at tail (singly): O(n). Delete at tail (doubly): O(1). Search: O(n). Access by index: O(n)."),
    d("Memory Overhead", "Each node stores data + 1 or 2 pointers. For integers, overhead can be 200-400% (16 bytes data + 8-16 bytes pointers). Poor cache locality: nodes are heap-allocated, scattered across memory. Iteration is slower than array iteration due to pointer chasing and cache misses."),
    d("Applications", "Implementation of stacks and queues. Undo functionality in editors (doubly linked list). LRU cache (doubly linked list + hash map). Polynomial arithmetic. Adjacency list representation of graphs. Memory allocators (free lists). When insertions/deletions are more frequent than access.")
  ],
  "Linked lists are ideal when you need frequent insertions/deletions and don\x27t need random access. The trade-off: O(n) access vs arrays\x27 O(1) access. In practice, arrays and arrayLists are often faster due to cache locality. Doubly linked lists are preferred over singly for the ability to delete from tail and traverse backwards.",
  [
    q("What is the time complexity of inserting at the head of a linked list?", "O(1) \u2014 just update the head pointer."),
    q("What is the time complexity of searching a linked list?", "O(n) \u2014 must traverse from head."),
    q("What are the two types of linked lists?", "Singly linked (one direction) and doubly linked (both directions)."),
    q("Why are linked lists not cache-friendly?", "Nodes are heap-allocated non-contiguously \u2014 pointer chasing causes cache misses."),
    q("What data structure can be implemented with a linked list?", "Stack (insert/pop at head O(1)), Queue (enqueue at tail, dequeue at head O(1))."),
    q("What is the memory overhead of a singly linked node?", "Data + next pointer. For integers, ~200% overhead (8 bytes data + 8 bytes pointer)."),
    q("How do you reverse a singly linked list?", "Iterate with prev, current, next pointers \u2014 O(n) time, O(1) space."),
    q("What is Floyd\x27s cycle detection algorithm?", "Two pointers (slow and fast). If they meet, there is a cycle. O(n) time, O(1) space."),
    q("What is the advantage of doubly linked over singly?", "O(1) deletion at tail, reverse traversal, easier node deletion given only the node reference."),
    q("What is an LRU cache?", "Most recently used items are at head. Least recently used are at tail. Doubly linked list + hash map for O(1) operations.")
  ],
  R(10,35,110,25,"#0070f3","","Head","Data | next") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Node A","Data | next") +
  A(270,48,300,48) +
  R(310,35,110,25,"#ffc107","","Node B","Data | next") +
  A(310,60,310,80) +
  R(10,70,110,25,"#dc3545","","Tail","Data | null") +
  R(10,100,110,25,"#e83e8c","","Insert Head","O(1)") +
  R(10,130,110,25,"#6610f2","","Delete Head","O(1)") +
  R(10,160,110,25,"#17a2b8","","Search","O(n)") +
  R(310,70,140,115,"#17a2b8","","Linked List","Linear structure with pointers. O(1) insert/delete at head. O(n) access.") +
  T(240,220,"Linked Lists: Nodes connected by pointers. Good for frequent insert/delete, poor random access.",9,"#666","middle"),
  [
    e("Singly Linked List Implementation", "Basic operations." , codeBlock([
      "class ListNode {",
      "  constructor(val) {",
      "    this.val = val;",
      "    this.next = null;",
      "  }",
      "}",
      "",
      "class LinkedList {",
      "  constructor() {",
      "    this.head = null;",
      "  }",
      "",
      "  prepend(val) {",
      "    const node = new ListNode(val);",
      "    node.next = this.head;",
      "    this.head = node;",
      "  }",
      "",
      "  delete(val) {",
      "    if (!this.head) return;",
      "    if (this.head.val === val) {",
      "      this.head = this.head.next;",
      "      return;",
      "    }",
      "    let curr = this.head;",
      "    while (curr.next && curr.next.val !== val)",
      "      curr = curr.next;",
      "    if (curr.next) curr.next = curr.next.next;",
      "  }",
      "}"
    ]), "Singly linked list with prepend (O(1)) and delete (O(n))."),
    e("Reverse Linked List", "Iterative reversal.", codeBlock([
      "function reverseList(head) {",
      "  let prev = null;",
      "  let curr = head;",
      "",
      "  while (curr) {",
      "    const next = curr.next;",
      "    curr.next = prev;",
      "    prev = curr;",
      "    curr = next;",
      "  }",
      "",
      "  return prev;",
      "}"
    ]), "Reverse linked list in O(n) time, O(1) space."),
    e("Detect Cycle (Floyd)", "Cycle detection.", codeBlock([
      "function hasCycle(head) {",
      "  let slow = head;",
      "  let fast = head;",
      "  while (fast && fast.next) {",
      "    slow = slow.next;",
      "    fast = fast.next.next;",
      "    if (slow === fast) return true;",
      "  }",
      "  return false;",
      "}"
    ]), "Floyd cycle detection O(n) time O(1) space."),
    e("Find Middle", "Fast/slow pointer.", codeBlock([
      "function middleNode(head) {",
      "  let slow = head;",
      "  let fast = head;",
      "  while (fast && fast.next) {",
      "    slow = slow.next;",
      "    fast = fast.next.next;",
      "  }",
      "  return slow;",
      "}"
    ]), "Find middle in one pass."),
    e("Merge Two Sorted Lists", "Iterative merge.", codeBlock([
      "function mergeTwoLists(l1, l2) {",
      "  const dummy = new ListNode(0);",
      "  let curr = dummy;",
      "  while (l1 && l2) {",
      "    if (l1.val < l2.val) {",
      "      curr.next = l1; l1 = l1.next;",
      "    } else {",
      "      curr.next = l2; l2 = l2.next;",
      "    }",
      "    curr = curr.next;",
      "  }",
      "  curr.next = l1 || l2;",
      "  return dummy.next;",
      "}"
    ]), "Merge sorted lists O(n+m).")
  ],
  [
    m("What is insert time at head of linked list?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 0, "O(1) \u2014 just update head pointer."),
    m("What is search time in linked list?", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 2, "Search requires traversal O(n)."),
    m("Why linked lists not cache-friendly?", ["Too many nodes", "Non-contiguous memory", "Excessive memory", "Dynamic"], 1, "Non-contiguous heap-allocated nodes cause cache misses."),
    m("Which algorithm detects cycle O(1) space?", ["Binary search", "Floyd algorithm", "BFS", "DFS"], 1, "Floyd uses slow/fast pointers."),
    m("Advantage of doubly linked?", ["Less memory", "Reverse traversal + O(1) tail delete", "Faster search", "Cache-friendly"], 1, "Doubly linked enables reverse traversal and O(1) tail deletion."),
    m("What uses linked list + hash map for O(1)?", ["Stack", "Queue", "LRU cache", "Heap"], 2, "LRU cache uses doubly linked list + hash map.")
  ]
);

/* =================== TOPIC 3: Stacks =================== */
addTopic("dsa-stacks", "Stacks", "beginner", 15,
  ["A stack is a linear data structure following LIFO (Last In, First Out) principle.",
   "Primary operations: push, pop, peek. All O(1).",
   "Can be implemented with arrays (cache-friendly) or linked lists (dynamic size).",
   "Underflow: popping from empty stack. Overflow: pushing beyond capacity."
  ],
  "A stack is like a stack of plates. You add a clean plate on top (push). You take a plate from the top (pop). You can look at the top plate without removing it (peek). The first plate placed at the bottom is the last one you use \u2014 LIFO.",
  [d("Stack Operations (O(1))", "push(item): add to top. pop(): remove and return top. peek(): view top without removing. isEmpty(): check if empty. All O(1)."),d("Array vs Linked List", "Array-based: contiguous memory, cache-friendly, fixed capacity. Linked-list-based: each push creates a new node, no capacity limit, more memory overhead."),d("Applications", "Function call stack (recursion). Expression evaluation. Syntax parsing (brackets). Undo/Redo. Back/Forward in browser. DFS algorithm."),d("Call Stack and Recursion", "Every function call pushes a stack frame. Recursion creates multiple frames. Stack overflow when recursion depth exceeds available memory.")],
  "Stacks are simple but powerful. LIFO behavior. Array-based stacks are more efficient. Stack is ideal for nested structures and reverse operations.",
  [q("What does LIFO stand for?", "Last In, First Out."),q("What are the three primary stack operations?", "Push, Pop, Peek. All O(1)."),q("How can stacks be implemented?", "Array-based or linked-list-based."),q("What is stack underflow?", "Attempting to pop from an empty stack."),q("What is a classic stack application?", "Matching parentheses."),q("What is a call stack?", "Stack of function call frames managed by the runtime."),q("What causes stack overflow?", "Excessive recursion depth."),q("How convert infix to postfix?", "Shunting Yard algorithm using a stack."),q("What does undo feature use?", "Two stacks: undo and redo."),q("Space complexity of stack with n elements?", "O(n).")],
  R(10,35,100,30,"#0070f3","","Top","peek()") + R(10,70,100,25,"#28a745","","Item 3","") + R(10,100,100,25,"#ffc107","","Item 2","") + R(10,130,100,25,"#dc3545","","Item 1","") + R(10,160,100,25,"#e83e8c","","Bottom","") + A(110,50,140,50) + R(150,35,120,150,"#17a2b8","","Stack (LIFO)","Push/Pop/Peek O(1)") + T(240,220,"Stack: LIFO. O(1) push/pop/peek. Recursion, parsing, DFS.",9,"#666","middle"),
  [e("Array-Based Stack", "Simple stack.", codeBlock(["class Stack {","  constructor() { this.items = []; }","  push(item) { this.items.push(item); }","  pop() { return this.items.length ? this.items.pop() : null; }","  peek() { return this.items.length ? this.items[this.items.length - 1] : null; }","  isEmpty() { return this.items.length === 0; }","}"]),"Array-based stack O(1) amortized."),e("Valid Parentheses", "Balanced brackets.", codeBlock(["function isValid(s) {","  const stack = [];","  const map = {')':'(','}':'{',']':'['};","  for (const c of s) {","    if ('({['.includes(c)) stack.push(c);","    else if (stack.pop() !== map[c]) return false;","  }","  return stack.length === 0;","}"]), "O(n) time using stack."),e("Min Stack", "Get min in O(1).", codeBlock(["class MinStack {","  constructor() {","    this.stack = [];","    this.minStack = [];","  }","  push(val) {","    this.stack.push(val);","    if (!this.minStack.length || val <= this.minStack[this.minStack.length-1])","      this.minStack.push(val);","  }","  pop() {","    const v = this.stack.pop();","    if (v === this.minStack[this.minStack.length-1]) this.minStack.pop();","    return v;","  }","  getMin() { return this.minStack[this.minStack.length-1]; }","}"]), "Auxiliary min stack O(1) all ops."),e("Daily Temperatures", "Monotonic stack.", codeBlock(["function dailyTemperatures(t) {","  const n = t.length, res = new Array(n).fill(0), stack = [];","  for (let i = 0; i < n; i++) {","    while (stack.length && t[i] > t[stack[stack.length-1]]) {","      const j = stack.pop();","      res[j] = i - j;","    }","    stack.push(i);","  }","  return res;","}"]),"Monotonic stack O(n).")],
  [m("What does LIFO stand for?", ["Last In, First Out", "First In, First Out", "Last In, Last Out", "First In, Last Out"], 0, "LIFO = Last In, First Out."),m("Time complexity of stack push/pop?", ["O(1)", "O(log n)", "O(n)", "O(n^2)"], 0, "Both O(1)."),m("Data structure used for recursion?", ["Queue", "Stack", "Tree", "Heap"], 1, "Call stack manages recursion."),m("MinStack uses what auxiliary structure?", ["Max stack", "Min stack", "Sorted stack", "Hash stack"], 1, "Auxiliary min stack."),m("Pop from empty stack causes?", ["Null return", "Stack overflow", "Stack underflow", "Undefined"], 2, "Stack underflow."),m("Monotonic stack solves?", ["Next greater element", "Sorting", "Searching", "Path finding"], 0, "Next greater/smaller element.")]
);

/* =================== TOPIC 4: Queues =================== */
addTopic("dsa-queues", "Queues", "beginner", 15,
  ["A queue follows FIFO (First In, First Out) principle.",
   "Enqueue (add to rear), Dequeue (remove from front), Peek. O(1).",
   "Array-based (circular buffer) or linked-list-based.",
   "JavaScript array.shift() is O(n) \u2014 use proper queue."
  ],
  "A queue is like a line at a coffee shop. People join at the back (enqueue). The person at the front gets served and leaves (dequeue). First come, first served \u2014 FIFO.",
  [d("FIFO Principle", "First In, First Out. Add at rear, remove from front. Opposite of stack (LIFO)."),d("Circular Buffer", "Fixed-size array with front/rear pointers. Wraps around using modulo. O(1) but fixed capacity."),d("Linked List Queue", "Head = front, Tail = rear. O(1) enqueue/dequeue. No capacity limit. More memory overhead."),d("Applications", "BFS, task scheduling, request queuing, message queues, I/O buffering, printer spooling.")],
  "Queues are fundamental for FIFO processing. Use circular buffer for bounded queues. Linked-list for unbounded. BFS requires a queue.",
  [q("What does FIFO stand for?", "First In, First Out."),q("What are the two primary queue operations?", "Enqueue (rear) and Dequeue (front). O(1)."),q("Why not array.shift()?", "shift() is O(n) \u2014 shifts all elements."),q("What is a circular buffer?", "Fixed-size array with modulo wrapping front/rear pointers."),q("What algorithm uses a queue?", "BFS (Breadth-First Search)."),q("What is a deque?", "Double-ended queue \u2014 O(1) at both ends."),q("Time complexity of enqueue/dequeue?", "O(1)."),q("What is priority queue?", "Elements have priority; heap-based."),q("Queues used in OS?", "Process scheduling, I/O buffering."),q("Linked list queue pointers?", "Head = front (dequeue), Tail = rear (enqueue).")],
  R(10,35,110,25,"#0070f3","","Front","dequeue()") + R(10,65,110,25,"#28a745","","Item A","") + R(10,95,110,25,"#ffc107","","Item B","") + R(10,125,110,25,"#dc3545","","Item C","") + R(10,155,110,25,"#e83e8c","","Rear","enqueue()") + A(120,83,150,83) + R(160,35,130,150,"#17a2b8","","Queue (FIFO)","Enqueue rear, Dequeue front") + T(240,220,"Queue: FIFO. O(1) enqueue/dequeue. BFS.",9,"#666","middle"),
  [e("Linked List Queue", "O(1) enqueue/dequeue.", codeBlock(["class Queue {","  constructor() { this.front = null; this.rear = null; }","  enqueue(val) {","    const n = {val, next: null};","    if (!this.front) this.front = n;","    else this.rear.next = n;","    this.rear = n;","  }","  dequeue() {","    if (!this.front) return null;","    const v = this.front.val;","    this.front = this.front.next;","    if (!this.front) this.rear = null;","    return v;","  }","}"]),"Linked list queue with front/rear O(1)."),e("Circular Array Queue", "Fixed capacity O(1).", codeBlock(["class CircularQueue {","  constructor(cap) {","    this.data = new Array(cap);","    this.cap = cap; this.front = 0; this.size = 0;","  }","  enqueue(val) {","    if (this.size === this.cap) return false;","    this.data[(this.front + this.size) % this.cap] = val;","    this.size++; return true;","  }","  dequeue() {","    if (!this.size) return null;","    const v = this.data[this.front];","    this.front = (this.front+1) % this.cap;","    this.size--; return v;","  }","}"]),"O(1) with modulo wrapping."),e("BFS Level Order", "Queue-based traversal.", codeBlock(["function levelOrder(root) {","  if (!root) return [];","  const q = [root], res = [];","  while (q.length) {","    const len = q.length, lvl = [];","    for (let i = 0; i < len; i++) {","      const n = q.shift();","      lvl.push(n.val);","      if (n.left) q.push(n.left);","      if (n.right) q.push(n.right);","    }","    res.push(lvl);","  }","  return res;","}"]),"O(n) BFS using queue.")],
  [m("What does FIFO mean?", ["First In, First Out", "Last In, First Out", "First In, Last Out", "Fast Input Output"], 0, "FIFO."),m("Time of enqueue/dequeue?", ["O(n)", "O(log n)", "O(1)", "O(n^2)"], 2, "O(1)."),m("Algorithm using queue?", ["DFS", "BFS", "Binary search", "Quick sort"], 1, "BFS uses queue."),m("Why not array.shift()?", ["O(n) shifts all elements", "O(1) but slow", "Cannot use", "Mutates array"], 0, "O(n)."),m("Circular buffer for?", ["Resizing", "O(1) fixed-capacity queue", "Traversal", "Sorting"], 1, "O(1) fixed-capacity queue."),m("What is deque?", ["Single-ended queue", "Double-ended queue", "Priority queue", "Blocking queue"], 1, "Double-ended queue.")]
);
