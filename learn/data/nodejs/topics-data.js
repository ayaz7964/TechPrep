var TOPICS_DATA = TOPICS_DATA || {};
TOPICS_DATA["nodejs"] = TOPICS_DATA["nodejs"] || {};

TOPICS_DATA["nodejs"]["node-buffers"] = {
  "title": "Node.js Buffers",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Buffer is a Node.js global class for handling binary data directly - it represents fixed-size chunks of memory allocated outside the V8 heap.",
    "Buffer objects store raw binary data as arrays of bytes (0-255). They are similar to typed arrays (Uint8Array) but with additional Node.js-specific methods.",
    "Buffers are essential for working with streams, file I/O, network protocols, cryptography, and any scenario involving binary data.",
    "Buffers are allocated outside V8's garbage-collected heap, managed by Node.js with Buffer.poolSize (8192 bytes) for small allocations."
  ],
  "laymanDefinition": "Buffers in Node.js are like a storage container for raw binary data. Think of it as a box of 256 tiny compartments (0-255), each compartment holding one byte of information. When you read a file, receive data over a network, or work with images, the data arrives as raw bytes. Buffers provide a way to store, read, and manipulate these bytes. Unlike JavaScript strings which are great for text, Buffers are designed for any kind of binary data - images, videos, compressed files, encrypted data, or custom binary protocols. They live outside JavaScript memory (V8 heap), so they do not slow down garbage collection.",
  "deepDive": [
    {
      "heading": "Buffer Allocation and Memory Management",
      "text": "Buffers are allocated outside the V8 heap, managed by Node.js: (1) Buffer.alloc(size, fill) - allocates a zero-filled buffer of the given size (safe). (2) Buffer.allocUnsafe(size) - allocates without initialization (faster but may contain old data - must be filled manually). (3) Buffer.from(array/arrayBuffer/string) - creates a buffer from existing data. (4) Buffer.concat(list, totalLength) - concatenates multiple buffers. Memory pool: buffers smaller than Buffer.poolSize (8192 bytes) / 2 are allocated from an internal pool. Larger buffers are allocated directly with new Uint8Array(size). allocUnsafe is ~2x faster than alloc but the buffer may contain sensitive data (old memory). Always fill allocUnsafe buffers if you will write less than the allocated size. Use Buffer.alloc for new buffers unless performance is critical."
    },
    {
      "heading": "Reading and Writing Buffer Data",
      "text": "Buffers support reading/writing numeric types at specific offsets: (1) readUInt8(offset) / writeUInt8(value, offset) - unsigned 8-bit integer. (2) readInt16LE/BE(offset) / writeInt16LE/BE(value, offset) - 16-bit signed integer, little/big endian. (3) readUInt32LE/BE(offset) / writeUInt32LE/BE(value, offset) - 32-bit unsigned. (4) readFloatLE/BE(offset) / writeFloatLE/BE(value, offset) - 32-bit float. (5) readDoubleLE/BE(offset) / writeDoubleLE/BE(value, offset) - 64-bit double. (6) readBigInt64LE/BE(offset) / writeBigInt64LE/BE(value, offset) - 64-bit BigInt. Endianness matters: LE (little-endian) stores least significant byte first (x86), BE (big-endian) stores most significant byte first (network byte order). Binary protocols (TCP, file formats) often specify endianness. Invalid offset throws RangeError."
    },
    {
      "heading": "Buffer and String Conversions",
      "text": "Buffers convert to/from strings with various encodings: (1) \"utf8\" (default) - variable-width encoding, 1-4 bytes per character. (2) \"ascii\" - 7-bit ASCII, fast but drops high bits. (3) \"latin1\" (or \"binary\") - 8-bit Latin-1 encoding. (4) \"hex\" - each byte as two hex characters. (5) \"base64\" - binary to Base64 text. (6) \"base64url\" - URL-safe Base64 (Node 15+). (7) \"utf16le\" - 2 bytes per character. Conversion: buffer.toString(\"base64\") - buffer to string, Buffer.from(\"hello\", \"utf8\") - string to buffer. Important: not all byte sequences are valid UTF-8. Using wrong encoding corrupts data. Base64 is 33% larger than binary but safe for text-based protocols (JSON, HTML). Hex encoding doubles the size."
    },
    {
      "heading": "Buffer Slicing, Copying, and Manipulation",
      "text": "Buffers provide array-like operations: (1) buffer[index] - access individual byte (0-255). Assigning values > 255 are masked to lower 8 bits. (2) buffer.length - number of bytes (NOT the same as string length). (3) buffer.slice(start, end) - creates a new Buffer referencing the same memory (no copy, like TypedArray subarray). Modifying slice modifies original! (4) buffer.subarray(start, end) - same as slice. (5) buffer.copy(target, targetStart, sourceStart, sourceEnd) - copies bytes to another buffer (actual copy). (6) buffer.equals(otherBuffer) - compares byte-by-byte. (7) buffer.compare(otherBuffer) - ordering comparison (for sorting). (8) buffer.indexOf(value, byteOffset) - search for byte/buffer/string. (9) buffer.fill(value, offset, end) - fill with a value. (10) buffer.includes(value, byteOffset) - boolean check. slice() is dangerous - mutations affect the original buffer. Use Buffer.from(buffer.slice()) to create a real copy."
    },
    {
      "heading": "Buffer Pooling and Performance",
      "text": "Node.js optimizes Buffer allocation: (1) Small buffers (< 4KB) use a pre-allocated pool (Buffer.poolSize = 8192). (2) Buffer.allocUnsafe is faster because it does not zero-fill. (3) For large allocations (>= Buffer.poolSize/2), Node.js bypasses the pool. (4) Frequent small allocations waste pool space - reuse buffers when possible. Performance tips: (1) Use Buffer.allocUnsafe + fill() instead of Buffer.alloc for performance-critical code. (2) Pre-allocate buffer pools for high-throughput scenarios. (3) Use buffer.copy() instead of string concatenation for binary data. (4) Avoid creating many tiny buffers - use a single buffer with offset tracking. (5) Use buf.writeInt32LE() instead of manual byte operations (faster and clearer). (6) For JSON serialization of binary data, use Base64 encoding. (7) The --zero-fill-buffers flag forces all buffers to be zero-filled (security, but slower)."
    }
  ],
  "interviewAnswer": "Buffer is a global Node.js class for handling raw binary data in fixed-size chunks allocated outside the V8 heap. Key creation methods: Buffer.alloc(size) (safe, zero-filled), Buffer.allocUnsafe(size) (fast, uninitialized), Buffer.from(data). Buffers are essential for file I/O, streams, cryptography, and network protocols. They support various encodings (utf8, base64, hex, latin1) for string conversion. Numeric read/write methods (readInt32LE, writeUInt16BE, etc.) handle binary protocols with endianness control. Buffer.slice() shares memory (no copy), Buffer.copy() creates a copy. Small buffers (<4KB) use an internal pool. Performance: allocUnsafe is 2x faster than alloc but requires manual fill. Always use Buffer.from() or Buffer.alloc() unless performance-critical.",
  "interviewQuestions": [
    {
      "question": "What is the difference between Buffer.alloc() and Buffer.allocUnsafe()?",
      "answer": "Buffer.alloc(size) allocates and zero-fills the buffer (safe, slower). Buffer.allocUnsafe(size) allocates without initialization (faster, ~2x). allocUnsafe may contain old/ensitive data - must be filled before reading. Use alloc unless performance-critical."
    },
    {
      "question": "How does Buffer memory differ from V8 heap memory?",
      "answer": "Buffer memory is allocated outside the V8 heap using Node.js's C++ layer. This means Buffer operations do not trigger V8 garbage collection. The memory is managed by libuv and freed using Buffer.from() pool or direct deallocation. This makes Buffer suitable for large binary data without impacting GC."
    },
    {
      "question": "What is the Buffer.poolSize and how does it work?",
      "answer": "Buffer.poolSize is 8192 bytes. Small Buffer allocations (< poolSize/2 = 4096 bytes) use a shared memory pool. Multiple small Buffers share the same underlying ArrayBuffer. This reduces memory allocation overhead. Large allocations bypass the pool and get their own memory."
    },
    {
      "question": "What is the difference between Buffer.slice() and Buffer.copy()?",
      "answer": "Buffer.slice() creates a new Buffer that references the same memory (no copy). Mutating the slice affects the original buffer. Buffer.copy() copies bytes to a destination buffer (separate memory). Use slice() for read-only operations. Use Buffer.from(buf.slice()) for a true copy."
    },
    {
      "question": "What are the available string encodings for Buffer.toString()?",
      "answer": "\"utf8\" (default), \"ascii\", \"latin1\" (aka \"binary\"), \"hex\", \"base64\", \"base64url\" (Node 15+), \"utf16le\". Each encoding handles bytes differently. Using wrong encoding corrupts binary data. Base64 is common for transmitting binary in text formats."
    },
    {
      "question": "How do you handle endianness in Buffers?",
      "answer": "Use read/write methods with LE (little-endian) or BE (big-endian) suffix. x86 uses little-endian. Network protocols use big-endian. Examples: buf.readInt32LE(offset), buf.writeUInt16BE(value, offset). Choosing wrong endianness reads/writes bytes in reverse order."
    },
    {
      "question": "What happens when you assign a value > 255 to a Buffer byte?",
      "answer": "The value is masked to the lower 8 bits (value & 0xFF). For example: buf[0] = 300; // stores 44 (300 & 0xFF = 44). Values outside 0-255 are silently truncated without warning."
    },
    {
      "question": "How does Buffer.concat() work?",
      "answer": "Buffer.concat(list, totalLength) takes an array of Buffers and concatenates them into a single Buffer. If totalLength is not provided, it is calculated by iterating the list. Providing totalLength is faster. Useful for combining stream chunks."
    },
    {
      "question": "What is the difference between buffer.length and string.length?",
      "answer": "buffer.length returns the number of bytes. string.length returns the number of UTF-16 code units (characters). For multi-byte characters (emoji, CJK), buffer.length > string.length. \"Hello\".length === 5 but Buffer.from(\"Hello\").length === 5. However, \"é\".length === 1 but Buffer.from(\"é\").length === 2."
    },
    {
      "question": "How do you check if two Buffers have identical content?",
      "answer": "Use buffer.equals(otherBuffer) for byte-by-byte comparison. The === operator checks reference equality (different instances with same content return false). Use buffer.compare(otherBuffer) for sorting (returns -1, 0, or 1)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Buffer Memory Layout</text><rect x=\"30\" y=\"55\" width=\"660\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"360\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Buffer: Array of Bytes (0-255)</text><text x=\"360\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Allocated outside V8 heap, fixed size, raw binary storage</text><rect x=\"40\" y=\"115\" width=\"40\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"60\" y=\"125\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">0x48</text><text x=\"60\" y=\"142\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">72</text><rect x=\"85\" y=\"115\" width=\"40\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"105\" y=\"125\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">0x65</text><text x=\"105\" y=\"142\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">101</text><rect x=\"130\" y=\"115\" width=\"40\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"150\" y=\"125\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">0x6C</text><text x=\"150\" y=\"142\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">108</text><rect x=\"175\" y=\"115\" width=\"40\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"195\" y=\"125\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">0x6C</text><text x=\"195\" y=\"142\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">108</text><rect x=\"220\" y=\"115\" width=\"40\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"240\" y=\"125\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">0x6F</text><text x=\"240\" y=\"142\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">111</text><rect x=\"270\" y=\"115\" width=\"80\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#9aa0b0\" stroke-width=\"1.5\"/><text x=\"310\" y=\"125\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">...</text><text x=\"310\" y=\"142\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">more bytes</text><text x=\"360\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Typical usage: file reads, stream chunks, crypto, network protocols</text><text x=\"360\" y=\"165\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Bytes shown as hex (0x48 = \"H\") and decimal (72)</text><text x=\"360\" y=\"210\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"start\">Methods: alloc, from, concat, toString, slice, copy, fill, indexOf, read/write ints</text></svg>",
  "codeExamples": [
    {
      "title": "Buffer Creation and Basic Operations",
      "useCase": "Different ways to create and inspect Buffers",
      "code": "// Safe allocation (zero-filled)\nvar buf1 = Buffer.alloc(10);\nconsole.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>\n\n// Fast allocation (uninitialized)\nvar buf2 = Buffer.allocUnsafe(10).fill(0xFF);\nconsole.log(buf2); // <Buffer ff ff ff ff ff ff ff ff ff ff>\n\n// From string\nvar buf3 = Buffer.from(\"Hello\", \"utf8\");\nconsole.log(buf3); // <Buffer 48 65 6c 6c 6f>\nconsole.log(buf3.toString()); // \"Hello\"\nconsole.log(buf3.toString(\"hex\")); // \"48656c6c6f\"\nconsole.log(buf3.toString(\"base64\")); // \"SGVsbG8=\"\n\n// From array\nvar buf4 = Buffer.from([0x48, 0x65, 0x6C, 0x4C, 0x6F]);\nconsole.log(buf4.toString()); // \"HeLLo\"\n\n// Buffer length vs string length\nvar emoji = Buffer.from(\"😀\", \"utf8\");\nconsole.log(\"Bytes:\", emoji.length); // 4\nconsole.log(\"Chars:\", emoji.toString().length); // 2 (surrogate pair)",
      "description": "Buffer creation methods: alloc (safe/zero-filled), allocUnsafe (fast/dirty), from(string/array). Strings can encode to various formats. Multi-byte characters use more bytes than characters."
    },
    {
      "title": "Reading and Writing Binary Data",
      "useCase": "Parse and create binary protocol data",
      "code": "// Simulate a binary file header format:\n// [magic:4][version:2][flags:1][checksum:4][data...]\nvar header = Buffer.alloc(11);\nvar offset = 0;\n\n// Write magic bytes (\"NODE\")\nheader.write(\"NODE\", offset, \"utf8\"); offset += 4;\n\n// Write version (uint16)\nheader.writeUInt16BE(1, offset); offset += 2;\n\n// Write flags\nheader.writeUInt8(0xA5, offset); offset += 1;\n\n// Write checksum (uint32)\nheader.writeUInt32LE(0xDEADBEEF, offset);\n\nconsole.log(\"Header hex:\", header.toString(\"hex\"));\n\n// Read back\noffset = 0;\nconsole.log(\"Magic:\", header.toString(\"utf8\", offset, 4)); offset += 4;\nconsole.log(\"Version:\", header.readUInt16BE(offset)); offset += 2;\nconsole.log(\"Flags: 0x\" + header.readUInt8(offset).toString(16)); offset += 1;\nconsole.log(\"Checksum: 0x\" + header.readUInt32LE(offset).toString(16));",
      "description": "Binary protocol parsing uses read/write methods with explicit offset and endianness. This is how Node.js handles custom binary formats, TCP protocols, and file format headers. Always track offset manually."
    },
    {
      "title": "Buffer Slicing and Copying",
      "useCase": "Understanding shared vs copied memory",
      "code": "var original = Buffer.from(\"Hello World\");\n\n// slice() shares memory\nvar slice = original.slice(0, 5);\nconsole.log(\"Slice:\", slice.toString()); // \"Hello\"\n\n// Modifying slice affects original!\nslice[0] = 0x68; // \"h\" lowercase\nconsole.log(\"Original after slice mod:\", original.toString()); // \"hello World\"\n\n// copy() creates separate memory\nvar dest = Buffer.alloc(5);\noriginal.copy(dest, 0, 6, 11);\nconsole.log(\"Copied:\", dest.toString()); // \"World\"\n\n// True copy from slice\nvar safeCopy = Buffer.from(original.slice(0, 5));\nsafeCopy[0] = 0x48; // \"H\" uppercase\nconsole.log(\"Original:\", original.toString()); // \"hello World\" (unchanged)\n\n// indexOf and includes\nconsole.log(\"Index of World:\", original.indexOf(\"World\")); // 6\nconsole.log(\"Has World:\", original.includes(\"World\")); // true",
      "description": "slice() is zero-copy (shares memory) - mutations propagate. copy() creates independent memory. Buffer.from(slice) creates a true detached copy for safe mutation."
    },
    {
      "title": "Buffer Concatenation and Pooling",
      "useCase": "Combine and pool Buffers efficiently",
      "code": "var chunks = [];\n\n// Simulate receiving chunks\nchunks.push(Buffer.from(\"First \"));\nchunks.push(Buffer.from(\"Second \"));\nchunks.push(Buffer.from(\"Third\"));\n\n// Concatenate (with totalLength optimization)\nvar totalLength = chunks.reduce(function(sum, buf) {\n  return sum + buf.length;\n}, 0);\nvar combined = Buffer.concat(chunks, totalLength);\nconsole.log(\"Combined:\", combined.toString()); // \"First Second Third\"\n\n// Buffer pool for reuse\nvar pool = Buffer.allocUnsafe(1024);\nvar poolOffset = 0;\n\nfunction allocFromPool(size) {\n  if (poolOffset + size > pool.length) {\n    pool = Buffer.allocUnsafe(1024);\n    poolOffset = 0;\n  }\n  var buf = pool.slice(poolOffset, poolOffset + size);\n  poolOffset += size;\n  return buf;\n}\n\nvar a = allocFromPool(10);\nvar b = allocFromPool(20);\nconsole.log(\"Pool offset:\", poolOffset); // 30",
      "description": "Buffer.concat() efficiently joins multiple buffers. Custom pooling reuses a pre-allocated buffer by slicing portions, reducing allocation overhead in high-throughput scenarios."
    },
    {
      "title": "Buffer Comparison and Sorting",
      "useCase": "Sort and compare binary data",
      "code": "var list = [\n  Buffer.from(\"banana\"),\n  Buffer.from(\"apple\"),\n  Buffer.from(\"cherry\"),\n  Buffer.from(\"Apple\")  // uppercase A comes before lowercase\n];\n\n// equals() comparison\nvar a = Buffer.from(\"hello\");\nvar b = Buffer.from(\"hello\");\nvar c = Buffer.from(\"world\");\nconsole.log(\"a === b:\", a === b); // false (different objects)\nconsole.log(\"a.equals(b):\", a.equals(b)); // true\nconsole.log(\"a.equals(c):\", a.equals(c)); // false\n\n// Sorting with compare()\nlist.sort(function(a, b) { return a.compare(b); });\nconsole.log(\"Sorted:\", list.map(function(b) { return b.toString(); }));\n// [\"Apple\", \"apple\", \"banana\", \"cherry\"]\n\n// byte-level access\nvar buf = Buffer.from(\"ABC\");\nconsole.log(\"Byte 0:\", buf[0], \"char:\", String.fromCharCode(buf[0])); // 65 A\nconsole.log(\"Byte 1:\", buf[1], \"char:\", String.fromCharCode(buf[1])); // 66 B\n\nbuf[1] = 90; // Z\nconsole.log(\"Modified:\", buf.toString()); // \"AZC\"",
      "description": "Buffer.equals() compares content, not references. Buffer.compare() enables sorting binary data. Direct byte access with bracket notation for mutation. UTF-8 bytes differ from ASCII for non-ASCII characters."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which Buffer creation method is fastest but may contain old data?",
      "options": [
        "Buffer.alloc()",
        "Buffer.allocUnsafe()",
        "Buffer.from()",
        "Buffer.concat()"
      ],
      "answer": 1,
      "explanation": "allocUnsafe is fastest because it skips zero-filling, but the buffer may contain sensitive data from previous allocations."
    },
    {
      "question": "What is the default Buffer.poolSize in bytes?",
      "options": [
        "1024",
        "4096",
        "8192",
        "16384"
      ],
      "answer": 2,
      "explanation": "Buffer.poolSize = 8192. Buffers smaller than poolSize/2 (4096) use the shared pool. Larger buffers bypass the pool."
    },
    {
      "question": "Does Buffer.slice() create a copy of the data?",
      "options": [
        "Yes, it always creates a copy",
        "No, it shares memory with the original",
        "It depends on the buffer size",
        "It creates a deep copy"
      ],
      "answer": 1,
      "explanation": "slice() returns a new Buffer that references the same memory. Mutations to the slice affect the original buffer."
    },
    {
      "question": "What does buffer.length return?",
      "options": [
        "Number of characters",
        "Number of bytes",
        "Size in memory",
        "String length"
      ],
      "answer": 1,
      "explanation": "buffer.length returns the number of bytes stored. For multi-byte characters, this differs from string length."
    },
    {
      "question": "Which method compares two Buffers by content?",
      "options": [
        "=== operator",
        "buffer.compare()",
        "buffer.equals()",
        "Both equals() and compare()"
      ],
      "answer": 3,
      "explanation": "equals() returns boolean for equality. compare() returns -1/0/1 for ordering. === checks reference equality."
    },
    {
      "question": "What happens when you assign buf[0] = 300?",
      "options": [
        "Throws RangeError",
        "Stores 300",
        "Stores 44 (300 & 0xFF)",
        "Converts to string"
      ],
      "answer": 2,
      "explanation": "Values outside 0-255 are masked to the lower 8 bits (value & 0xFF). 300 & 0xFF = 44."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-child-processes"] = {
  "title": "Node.js Child Processes",
  "difficulty": "advanced",
  "estimatedMinutes": 25,
  "tldr": [
    "The child_process module enables spawning new processes from Node.js, allowing execution of system commands, scripts in other languages, and parallel computation.",
    "Four ways to create child processes: spawn(), exec(), execFile(), and fork() - each with different use cases for I/O handling, output buffering, and IPC.",
    "Child processes communicate with the parent via stdio streams (stdin, stdout, stderr) and optional IPC channels (send/on message).",
    "Child processes are separate OS processes with their own memory, V8 instance, and event loop - they provide isolation but have higher overhead than worker threads."
  ],
  "laymanDefinition": "The Child Processes module is like being able to hire temporary workers. Your main Node.js application (the boss) can launch other programs (temporary workers) to do specific tasks. For example, you might ask Python to process some data (child_process.exec(\"python script.py\")), run a shell command to compress files (child_process.exec(\"gzip file.txt\")), or start another Node.js program to handle background work. Each temporary worker has their own tools and workspace (separate memory and process), so if they crash, your main application keeps running. The boss can talk to the workers through pipes (stdin/stdout) or walkie-talkies (IPC messages).",
  "deepDive": [
    {
      "heading": "spawn() vs exec() vs execFile()",
      "text": "(1) child_process.spawn(command, args, options) - launches a new process with streaming I/O. Returns ChildProcess object with stdin/stdout/stderr streams. Does NOT buffer output - streams data as it arrives. Best for long-running processes or large output. Options: cwd, env, stdio, detached, shell. (2) child_process.exec(command, options, callback) - runs a command in a shell and buffers output. Callback receives (error, stdout, stderr). Max buffer size (default 1024KB) - exceeding kills the process. Best for short commands where you want the entire output as a string. (3) child_process.execFile(file, args, options, callback) - similar to exec but does NOT use a shell. Directly executes a file. More efficient and slightly more secure (no shell injection). Use execFile when you know the exact executable path and do not need shell features."
    },
    {
      "heading": "fork() and IPC Communication",
      "text": "child_process.fork(modulePath, args, options) - a special case of spawn() that creates a new Node.js process. Automatically establishes an IPC channel. The child process uses process.send() and process.on(\"message\") for communication. Parent uses child.send() and child.on(\"message\"). Messages are serialized as JSON using the internal IPC mechanism (libuv pipes). fork() options: execPath (custom Node executable), execArgv (Node flags like --inspect), silent (suppress stdout/stderr). Use cases: (1) Offloading CPU-intensive work. (2) Running untrusted code in isolation. (3) Creating a worker pool for parallel processing. (4) Monitoring/management tools. fork() inherits the parent's environment variables but can set custom env. The child modulePath is resolved relative to the parent's __dirname."
    },
    {
      "heading": "Stdio Configuration and Piping",
      "text": "The stdio option controls how the child's standard I/O connects to the parent. Configurations: (1) \"pipe\" (default) - creates a pipe between parent and child. Parent can read child.stdout or write to child.stdin. (2) \"inherit\" - child shares parent's stdio (output goes to the same terminal). (3) \"ignore\" - child's stdio is /dev/null. (4) \"ipc\" - creates an IPC channel (used automatically by fork()). (5) file descriptor number - child connects to an existing fd. (6) null/undefined - use default. (7) Array - specify each fd separately: [\"pipe\", \"pipe\", \"pipe\"] for all three. stdio options can be mixed: [\"inherit\", \"pipe\", \"pipe\"] sends stderr to parent terminal, pipes stdout. ChildProcess.stdin, .stdout, .stderr are streams. Handle \"error\" and \"close\" events on these streams."
    },
    {
      "heading": "Process Lifecycle and Error Handling",
      "text": "Events on ChildProcess: (1) \"error\" - failed to spawn or kill the process. (2) \"exit\" - process exited (code, signal). code is null if killed by signal. (3) \"close\" - all stdio streams are closed (after exit). (4) \"message\" - IPC message received. (5) \"disconnect\" - IPC channel closed. Error scenarios: (1) ENOENT - command not found. (2) EACCES - permission denied. (3) Non-zero exit code - command failed (check error.code and error.killed). (4) stdout/stderr buffer exceeded (exec/execFile). (5) Timeout - child.kill() after options.timeout. (6) Zombie processes - child processes that exit but are not reaped (wait for \"close\" event). Kill options: child.kill([signal]) - sends signal (SIGTERM default). child.kill(\"SIGKILL\") - force kill. Use child.exitCode and child.signalCode to check exit status."
    },
    {
      "heading": "Child Process Security Considerations",
      "text": "(1) Shell injection - NEVER pass unsanitized user input to exec() or spawn with shell:true. Use execFile() or spawn without shell. (2) Command injection via arg concatenation - pass args as an array, not a string. (3) Path traversal - verify file paths before execution. (4) Resource limits - child processes consume memory and CPU. Limit children with a pool pattern. (5) Timeouts - always set timeouts for child operations. (6) Detached mode options.detached:true - child runs independently of parent. Child's PID is different from parent's group. Use child.unref() so the parent can exit independently. (7) Signal handling - child processes inherit signal handlers. Reset handlers in children if needed. (8) Environment variables - child inherits process.env by default. Use options.env to restrict or override."
    }
  ],
  "interviewAnswer": "The child_process module spawns OS-level processes. Four methods: spawn() - streaming I/O, large output; exec() - shell command, buffered output; execFile() - direct binary, no shell; fork() - new Node.js process with IPC channel. Stdio options: \"pipe\" (streaming), \"inherit\" (shared), \"ignore\" (/dev/null). Events: \"error\" (spawn fail), \"exit\" (process exit), \"close\" (streams closed). IPC: process.send()/on(\"message\") for fork(). Security: never use shell with unsanitized input - shell injection risk. Use args array, not string concatenation. Set timeouts for child operations. Use detached + unref for background processes.",
  "interviewQuestions": [
    {
      "question": "What is the difference between spawn() and exec()?",
      "answer": "spawn() streams I/O via child.stdout/stdin/stderr streams. Does not buffer. exec() runs in a shell and buffers stdout/stderr, passing them to the callback. Use spawn() for large output or long-running processes; exec() for simple short commands."
    },
    {
      "question": "What is fork() and how is it different from spawn()?",
      "answer": "fork() is a special case of spawn() that creates a new Node.js process. It automatically sets up an IPC channel (process.send/on message). fork() is for running Node.js modules, spawn() can run any executable. fork() is used for creating worker processes."
    },
    {
      "question": "How do child processes communicate with the parent?",
      "answer": "(1) stdio streams - child.stdin.write(), parent reads child.stdout. (2) IPC messages - process.send() and process.on(\"message\") (fork() only). (3) Exit codes - child process.exit(code) communicates a numeric code. (4) Signals - parent sends signals with child.kill(signal)."
    },
    {
      "question": "What is a zombie process and how do you prevent it?",
      "answer": "A zombie process is a child process that has exited but has not been \"reaped\" (the parent has not collected its exit status). Node.js automatically reaps children on \"exit\" or \"close\" events. Always listen for the \"close\" event to properly clean up child processes."
    },
    {
      "question": "How do you handle shell injection vulnerabilities?",
      "answer": "(1) Use execFile() instead of exec() - it does not use a shell. (2) With spawn(), pass args as an array: spawn(\"ls\", [\"-l\", userPath]), not a string. (3) NEVER concatenate user input into command strings. (4) Sanitize and validate all user-provided path and argument values."
    },
    {
      "question": "What does options.detached do?",
      "answer": "detached:true makes the child process the leader of a new process group. The child can continue running after the parent exits. Use child.unref() so the parent does not wait for the child. Useful for background/daemon processes."
    },
    {
      "question": "How do you set a timeout for a child process?",
      "answer": "Pass options.timeout in milliseconds to spawn/exec/execFile. If the timeout expires, the child is killed (SIGTERM). Handle the \"close\" event to detect termination. Check child.killed property."
    },
    {
      "question": "What is the max buffer size for exec() and what happens when exceeded?",
      "answer": "Default max buffer is 1024KB (1MB). Configure with options.maxBuffer. When exceeded, the child process is terminated, and the callback receives an error with code ERR_CHILD_PROCESS_STDIO_MAXBUFFER."
    },
    {
      "question": "How do you spawn a child process with a shell on Windows?",
      "answer": "Use options.shell: true or options.shell: \"powershell.exe\". On Windows without shell, spawn() cannot run built-in commands (dir, echo) or .bat/.cmd files. With shell:true, it runs via cmd.exe."
    },
    {
      "question": "What is the difference between \"exit\" and \"close\" events on ChildProcess?",
      "answer": "\"exit\" fires when the process exits (code, signal). \"close\" fires when the process has exited AND all stdio streams are closed. \"close\" always comes after \"exit\". Listen for \"close\" to ensure all I/O is complete."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Child Process Methods and I/O Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">spawn(\"ls\", [\"-l\"])</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Streaming stdout/stderr</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">exec(\"ls -l\", callback)</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Buffered stdout + shell</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">execFile(\"/bin/ls\", [\"-l\"])</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Direct binary, no shell</text><rect x=\"30\" y=\"235\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"252.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">fork(\"./worker.js\")</text><text x=\"130\" y=\"269.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">New Node.js + IPC channel</text></svg>",
  "codeExamples": [
    {
      "title": "spawn() with Streaming Output",
      "useCase": "Run a command and process output as it arrives",
      "code": "var spawn = require(\"child_process\").spawn;\n\n// Spawn a child process with streaming I/O\nvar child = spawn(\"find\", [\".\", \"-name\", \"*.js\"]);\n\n// Stream stdout as it arrives\nchild.stdout.on(\"data\", function(data) {\n  process.stdout.write(\"STDOUT: \" + data);\n});\n\nchild.stderr.on(\"data\", function(data) {\n  console.error(\"STDERR: \" + data);\n});\n\nchild.on(\"close\", function(code) {\n  console.log(\"Child exited with code:\", code);\n});\n\nchild.on(\"error\", function(err) {\n  console.error(\"Failed to spawn:\", err.message);\n});\n\n// Write to stdin\nchild.stdin.write(\"additional input\\n\");\nchild.stdin.end();",
      "description": "spawn() streams output via events. stdout/stderr are Readable streams. The \"data\" event fires for each chunk. Handle \"error\" for spawn failures and \"close\" for process completion."
    },
    {
      "title": "exec() with Buffered Output",
      "useCase": "Run a shell command and get the complete result",
      "code": "var exec = require(\"child_process\").exec;\n\n// Buffered execution via shell\nexec(\"ls -la | findstr node\", function(err, stdout, stderr) {\n  if (err) {\n    console.error(\"Error:\", err.message);\n    console.error(\"Exit code:\", err.code);\n    return;\n  }\n  console.log(\"Output:\");\n  console.log(stdout);\n});\n\n// With timeout (kill after 5s)\nexec(\"long-running-command\", { timeout: 5000 }, function(err, stdout, stderr) {\n  if (err && err.killed) {\n    console.error(\"Command timed out\");\n    return;\n  }\n  console.log(stdout);\n});\n\n// Custom max buffer\nexec(\"find / -name *.log\", { maxBuffer: 5 * 1024 * 1024 }, function(err, stdout) {\n  if (err && err.code === \"ERR_CHILD_PROCESS_STDIO_MAXBUFFER\") {\n    console.error(\"Output too large, use spawn instead\");\n    return;\n  }\n  console.log(\"Found \" + stdout.split(\"\\n\").length + \" log files\");\n});",
      "description": "exec() buffers stdout/stderr entirely in memory. Use for short commands with predictable output. Set timeout to prevent hanging. Use maxBuffer for large output. For anything larger, use spawn()."
    },
    {
      "title": "fork() with IPC Communication",
      "useCase": "Create a Node.js worker with message passing",
      "code": "// parent.js\nvar fork = require(\"child_process\").fork;\nvar path = require(\"path\");\n\nvar child = fork(path.join(__dirname, \"worker.js\"));\n\nchild.on(\"message\", function(msg) {\n  console.log(\"Parent received:\", msg);\n  if (msg.type === \"result\") {\n    console.log(\"Computation result:\", msg.data);\n  }\n});\n\nchild.on(\"close\", function(code) {\n  console.log(\"Worker exited with code:\", code);\n});\n\n// Send task to worker\nchild.send({ type: \"task\", data: { from: 1, to: 1000000 } });\n\n// ---------- worker.js ----------\nprocess.on(\"message\", function(msg) {\n  if (msg.type === \"task\") {\n    // CPU-intensive work\n    var sum = 0;\n    for (var i = msg.data.from; i <= msg.data.to; i++) {\n      sum += i;\n    }\n    process.send({ type: \"result\", data: sum });\n    process.exit(0);\n  }\n});\n\n// Notify parent that worker is ready\nprocess.send({ type: \"ready\" });",
      "description": "fork() creates a Node.js child with automatic IPC. Messages are serialized JSON. Use for CPU-intensive work. The worker exits after completing its task. The parent listens for results and respawns as needed."
    },
    {
      "title": "Child Process Pool for Parallel Execution",
      "useCase": "Manage a pool of child processes for concurrent tasks",
      "code": "var fork = require(\"child_process\").fork;\nvar path = require(\"path\");\n\nfunction WorkerPool(modulePath, numWorkers) {\n  this.workers = [];\n  this.queue = [];\n  this.activeCount = 0;\n\n  for (var i = 0; i < numWorkers; i++) {\n    var worker = fork(modulePath);\n    var self = this;\n    worker.on(\"message\", function(msg) {\n      self.activeCount--;\n      if (this._callback) {\n        this._callback(null, msg);\n      }\n      self._processNext(this);\n    });\n    worker.on(\"error\", function(err) {\n      self.activeCount--;\n      if (this._callback) {\n        this._callback(err);\n      }\n      self._processNext(this);\n    });\n    this.workers.push(worker);\n  }\n}\n\nWorkerPool.prototype.send = function(msg, callback) {\n  this.queue.push({ msg: msg, callback: callback });\n  this._processNext(null);\n};\n\nWorkerPool.prototype._processNext = function(worker) {\n  if (!worker) {\n    // Find an idle worker\n    for (var i = 0; i < this.workers.length; i++) {\n      if (!this.workers[i]._callback) {\n        worker = this.workers[i];\n        break;\n      }\n    }\n  }\n\n  if (worker && this.queue.length > 0) {\n    var task = this.queue.shift();\n    worker._callback = task.callback;\n    this.activeCount++;\n    worker.send(task.msg);\n  }\n};\n\nvar pool = new WorkerPool(\"./worker.js\", 4);\npool.send({ task: \"compute\" }, function(err, result) {\n  console.log(\"Result:\", result);\n});",
      "description": "A worker pool manages a fixed number of forked processes. Tasks are queued and dispatched to idle workers. This prevents overwhelming the system with too many processes while maximizing parallel CPU utilization."
    },
    {
      "title": "Detached Process and Process Groups",
      "useCase": "Create a background process that outlives the parent",
      "code": "var spawn = require(\"child_process\").spawn;\n\n// Spawn a detached background process\nvar child = spawn(\"node\", [\"background-task.js\"], {\n  detached: true,\n  stdio: [\"ignore\", \"pipe\", \"pipe\"],\n  cwd: __dirname\n});\n\n// Unref so parent can exit independently\nchild.unref();\n\nconsole.log(\"Parent will exit, child continues running\");\nconsole.log(\"Child PID:\", child.pid);\nprocess.exit(0);\n\n// ---------- background-task.js ----------\nvar fs = require(\"fs\");\nvar stream = fs.createWriteStream(\"background.log\");\nvar count = 0;\n\nfunction log() {\n  count++;\n  stream.write(\"Background task running: \" + count + \"\\n\");\n  if (count < 10) {\n    setTimeout(log, 1000);\n  } else {\n    stream.end();\n    process.exit(0);\n  }\n}\n\nlog();\n\n// Handle SIGHUP (sent when parent exits)\nprocess.on(\"SIGHUP\", function() {\n  console.log(\"Parent disconnected, continuing...\");\n});",
      "description": "detached:true creates a new process group. child.unref() allows the parent to exit without waiting for the child. The child continues running in the background. stdio is configured to avoid blocking on parent's stdio streams."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which method creates a new Node.js process with IPC?",
      "options": [
        "spawn()",
        "exec()",
        "execFile()",
        "fork()"
      ],
      "answer": 3,
      "explanation": "fork() creates a new Node.js process with an IPC channel. It is a special case of spawn() for Node.js modules."
    },
    {
      "question": "Which method uses a shell by default?",
      "options": [
        "spawn()",
        "exec()",
        "execFile()",
        "fork()"
      ],
      "answer": 1,
      "explanation": "exec() runs commands through a shell (/bin/sh or cmd.exe). This enables shell features (pipes, redirects) but introduces shell injection risk."
    },
    {
      "question": "What does spawn() return for stdout?",
      "options": [
        "A string",
        "A Buffer",
        "A Readable stream",
        "A callback"
      ],
      "answer": 2,
      "explanation": "spawn() returns a ChildProcess object with child.stdout as a Readable stream. Data arrives via \"data\" events."
    },
    {
      "question": "What happens when exec() output exceeds maxBuffer?",
      "options": [
        "Output is truncated",
        "Child is killed and error is returned",
        "Output continues streaming",
        "Buffer is expanded"
      ],
      "answer": 1,
      "explanation": "When output exceeds maxBuffer (default 1024KB), the child is killed and the callback receives an error with code ERR_CHILD_PROCESS_STDIO_MAXBUFFER."
    },
    {
      "question": "How do you prevent shell injection with spawn()?",
      "options": [
        "Use spawn with shell:true",
        "Pass args as an array, not a string",
        "Sanitize input with regex",
        "Use exec() instead"
      ],
      "answer": 1,
      "explanation": "Pass arguments as an array: spawn(\"ls\", [\"-l\", userInput]). This avoids shell interpretation of special characters."
    },
    {
      "question": "What does child.unref() do?",
      "options": [
        "Kills the child process",
        "Allows parent to exit independently",
        "Removes IPC channel",
        "Detaches stdio"
      ],
      "answer": 1,
      "explanation": "unref() detaches the child from the parent's event loop reference count, allowing the parent to exit even if the child is still running. Used with detached:true."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-cluster-module"] = {
  "title": "Node.js Cluster Module",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "The cluster module allows you to create child processes (workers) that share the same server port, enabling Node.js to utilize multiple CPU cores for handling load.",
    "A master process manages worker processes, distributes incoming connections among them, and can restart workers that crash.",
    "Workers are spawned using child_process.fork(), meaning they are separate Node.js processes with their own V8 instance, event loop, and memory - they do not share memory.",
    "IPC messages via send() enable communication between master and workers for state coordination, health checks, and graceful shutdown."
  ],
  "laymanDefinition": "The Cluster module is like having a team of workers instead of a single employee. A single Node.js process can only use one CPU core at a time - like one person serving customers at a counter. With clustering, the master process acts like a manager who assigns each new customer to one of several workers (separate processes), each running on a different CPU core. If a worker crashes (gets sick), the manager immediately hires a replacement. This is how production Node.js servers handle many more requests than a single process can manage, by using all available CPU cores.",
  "deepDive": [
    {
      "heading": "Cluster Architecture and Process Model",
      "text": "The cluster module has two roles: (1) Master - the primary process that monitors workers, handles signals, and distributes connections. (2) Workers - child processes created via fork() that run the application code. Workers are independent Node.js processes with their own V8 heap, event loop, and memory space. They do NOT share memory with each other or the master. IPC channel: established automatically between master and each worker via process.send() and process.on(\"message\"). Worker identification: cluster.worker.id (1-indexed), cluster.worker.process.pid. The master does not serve requests - it only manages workers. Workers do the actual request handling. The event loop model: each worker has its own event loop, allowing true parallel request processing across CPU cores."
    },
    {
      "heading": "Connection Distribution (Load Balancing)",
      "text": "The cluster module distributes incoming connections to workers. Node.js uses round-robin load balancing by default on all platforms except Windows (where it uses shared socket handle). Round-robin: the master listens on the port, accepts connections, and distributes them to workers one at a time in order. This prevents one worker from being overloaded. With shared socket (Windows default), all workers share the same file descriptor, and the OS distributes connections. The scheduling policy is controlled by cluster.schedulingPolicy: cluster.SCHED_RR (round-robin) or cluster.SCHED_NONE (OS-assigned). Set via cluster.setupPrimary({ schedulingPolicy: cluster.SCHED_RR }). Server.listen() in the worker: when a worker calls server.listen(port), it actually shares the master's port - multiple workers can listen on the same port."
    },
    {
      "heading": "Worker Lifecycle and Health Management",
      "text": "Workers go through states: starting → online → listening → disconnected → exited. Events: (1) \"online\" - worker is forked and ready. (2) \"listening\" - worker's server is listening on the port. (3) \"disconnect\" - IPC channel closed. (4) \"exit\" - worker process exited (code, signal). Master handles crashes: (1) On \"exit\", check if it was an intentional disconnect or crash. (2) Fork a new worker to replace the crashed one. (3) Implement exponential backoff for respawning to prevent crash loops. (4) Log the crash reason and count restarts. Graceful shutdown: (1) worker.disconnect() closes IPC. (2) worker.kill(signal) sends signal (SIGTERM for graceful). (3) Workers should handle SIGTERM: stop accepting new connections, finish existing requests, then process.exit()."
    },
    {
      "heading": "State Management and Shared Resources",
      "text": "Workers are independent processes and do not share memory. Strategies for shared state: (1) External store - Redis, Memcached, database for session data, counters. (2) IPC messages - master can relay messages between workers. (3) Sticky sessions - for load balancers that require requests from the same client to go to the same worker. (4) Database - the source of truth for persistent state. (5) Shared memory - use shared buffers via SharedArrayBuffer or mmap (advanced). Stateless design: the best practice is to make workers stateless, storing session state in Redis or a database. This allows workers to be killed and replaced without losing state. For caching, each worker can maintain its own in-memory cache - this duplicates memory but avoids synchronization overhead. For coordinated caching, use Redis or similar."
    },
    {
      "heading": "Cluster Module vs Other Scaling Approaches",
      "text": "(1) Cluster - multi-process on a single machine, shares port. Best for utilizing all CPU cores on one server. (2) Child process - spawn arbitrary processes, not necessarily Node.js, no port sharing. (3) Worker threads - same process, shared memory, threads for CPU-intensive tasks. (4) PM2 - production process manager with clustering, auto-restart, monitoring. (5) Docker/Kubernetes - container orchestration, each container runs a single process, scaled horizontally. Trade-offs: clustering adds complexity (IPC, state management, crash handling). PM2 simplifies this with built-in clustering (pm2 start app.js -i max). For many production deployments, PM2 or container orchestration is preferred over raw cluster module usage. The cluster module is most useful when you need programmatic control over worker lifecycle."
    }
  ],
  "interviewAnswer": "The cluster module enables multi-core Node.js applications by forking worker processes that share the same port. The master manages workers; workers handle requests. Each worker has its own V8 instance and event loop - true parallelism for I/O-bound workloads. Connection distribution uses round-robin (SCHED_RR) or OS-assigned (SCHED_NONE). Workers communicate with the master via IPC (process.send()). State is not shared between workers - use Redis or a database for shared state. Handle worker crashes with respawning and exponential backoff. Graceful shutdown: handle SIGTERM, stop accepting connections, finish requests, exit. PM2 provides production-friendly clustering with less code. Clustering works best for I/O-bound apps on multi-core servers.",
  "interviewQuestions": [
    {
      "question": "How does the cluster module enable multi-core usage?",
      "answer": "It forks multiple worker processes (one per CPU core ideally), each with its own V8 instance and event loop. The master listens on the port and distributes connections to workers using round-robin or OS scheduling. This allows parallel processing of requests across CPU cores."
    },
    {
      "question": "What is the difference between cluster.SCHED_RR and cluster.SCHED_NONE?",
      "answer": "SCHED_RR (round-robin) - master accepts connections and distributes to workers in order. Ensures even load distribution. SCHED_NONE (OS-assigned) - workers share the port handle, OS distributes connections. Default: SCHED_RR on non-Windows, SCHED_NONE on Windows."
    },
    {
      "question": "How do workers communicate with each other?",
      "answer": "Workers do not have direct IPC to each other. They communicate via the master: worker.send() → master.on(\"message\") → otherWorker.send(). Or use an external message broker (Redis pub/sub, RabbitMQ). For most cases, workers use a shared database instead of direct communication."
    },
    {
      "question": "How do you handle a worker crash?",
      "answer": "Listen for \"exit\" event on workers. If worker.exitedAfterDisconnect is false, it was an unexpected crash - fork a new worker. Use exponential backoff (delay = Math.min(1000 * 2^attempts, 30000)) to prevent crash loops. Log the error and restart count."
    },
    {
      "question": "What is the difference between cluster and worker_threads?",
      "answer": "Cluster: separate processes, no memory sharing, IPC via messages, best for scaling I/O across CPU cores. Worker threads: same process, shared memory (SharedArrayBuffer), best for CPU-intensive tasks within the same application. Cluster workers are more isolated (separate crash)."
    },
    {
      "question": "How do you implement graceful shutdown in a cluster?",
      "answer": "(1) Master sends SIGTERM to worker. (2) Worker stops accepting new connections (server.close()). (3) Worker finishes existing requests. (4) Worker closes database connections and releases resources. (5) Worker calls process.exit(). (6) Master forks a new worker to replace the shutdown one."
    },
    {
      "question": "Why should workers be stateless?",
      "answer": "Workers are separate processes with separate memory. If a worker holds state in memory and crashes, that state is lost. Stateful workers also prevent flexible scaling - you cannot add/remove workers without considering state distribution. Use external stores (Redis, DB) for session state."
    },
    {
      "question": "What does cluster.isPrimary and cluster.isWorker do?",
      "answer": "cluster.isPrimary (formerly cluster.isMaster) - true in the master/primary process. cluster.isWorker - true in worker processes. Use these to run different code paths: the master manages workers, the worker handles requests. Node.js 16+ renamed isMaster/isWorker to isPrimary/isWorker."
    },
    {
      "question": "How do you pass environment variables to workers?",
      "answer": "cluster.fork() inherits the master's environment variables. Pass worker-specific vars: cluster.fork({ WORKER_ID: n }). cluster.settings.env can set default env for all workers. Workers can read via process.env."
    },
    {
      "question": "What happens when a worker calls server.listen(port)?",
      "answer": "The worker does not actually create a new TCP listener. Instead, it shares the master's listening file descriptor. Multiple workers can call listen() on the same port - the cluster module handles the sharing. The master actually accepts the connection and hands it to a worker."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Cluster Module Architecture</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Master Process</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Distributes connections, manages workers</text><line x1=\"50\" y1=\"100\" x2=\"50\" y2=\"130\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"130\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"210\" y1=\"100\" x2=\"210\" y2=\"130\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"20\" y=\"130\" width=\"60\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"50\" y=\"152.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Worker 1</text><text x=\"50\" y=\"169.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Handles requests</text><rect x=\"80\" y=\"130\" width=\"60\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"110\" y=\"152.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Worker 2</text><text x=\"110\" y=\"169.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Handles requests</text><rect x=\"140\" y=\"130\" width=\"60\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"170\" y=\"152.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Worker 3</text><text x=\"170\" y=\"169.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Handles requests</text><text x=\"225\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Round-robin connection distribution</text><text x=\"225\" y=\"158\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Each worker = separate V8 instance + event loop + memory</text><text x=\"225\" y=\"210\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">IPC: process.send() for master ↔ worker communication</text><text x=\"225\" y=\"260\" fill=\"#f87171\" font-size=\"10\" text-anchor=\"start\">Worker crash → master forks replacement</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Cluster Setup with Round-Robin",
      "useCase": "Create a clustered HTTP server using all CPU cores",
      "code": "var cluster = require(\"cluster\");\nvar http = require(\"http\");\nvar os = require(\"os\");\n\nif (cluster.isPrimary) {\n  // Master process\n  var cpuCount = os.cpus().length;\n  console.log(\"Master PID:\", process.pid);\n  console.log(\"Forking \" + cpuCount + \" workers\");\n\n  for (var i = 0; i < cpuCount; i++) {\n    cluster.fork();\n  }\n\n  cluster.on(\"exit\", function(worker, code, signal) {\n    console.log(\"Worker \" + worker.process.pid + \" exited\");\n    console.log(\"Forking replacement...\");\n    cluster.fork();\n  });\n} else {\n  // Worker process\n  http.createServer(function(req, res) {\n    res.writeHead(200, { \"Content-Type\": \"text/plain\" });\n    res.end(\"Worker \" + cluster.worker.id + \" handled request\\n\");\n  }).listen(3000);\n\n  console.log(\"Worker \" + cluster.worker.id + \" started, PID:\", process.pid);\n}",
      "description": "Master forks workers equal to CPU count. Workers share port 3000. Each request is handled by a different worker in round-robin order. If a worker crashes, the master forks a replacement."
    },
    {
      "title": "Graceful Shutdown with SIGTERM",
      "useCase": "Handle shutdown signals to prevent in-flight request loss",
      "code": "var cluster = require(\"cluster\");\nvar http = require(\"http\");\nvar os = require(\"os\");\n\nif (cluster.isPrimary) {\n  var workers = [];\n  for (var i = 0; i < os.cpus().length; i++) {\n    workers.push(cluster.fork());\n  }\n\n  // Graceful master shutdown\n  process.on(\"SIGTERM\", function() {\n    console.log(\"Master received SIGTERM, shutting down workers\");\n    workers.forEach(function(worker) {\n      worker.disconnect();\n      worker.kill(\"SIGTERM\");\n    });\n  });\n} else {\n  var server = http.createServer(function(req, res) {\n    // Simulate long request\n    setTimeout(function() {\n      res.end(\"Worker \" + cluster.worker.id + \" done\\n\");\n    }, 1000);\n  });\n\n  server.listen(3000);\n\n  // Graceful worker shutdown\n  process.on(\"SIGTERM\", function() {\n    console.log(\"Worker \" + cluster.worker.id + \" shutting down\");\n    server.close(function() {\n      console.log(\"Worker \" + cluster.worker.id + \" closed\");\n      process.exit(0);\n    });\n  });\n}",
      "description": "Graceful shutdown: SIGTERM causes the worker to stop accepting new connections (server.close()) and exit after existing requests complete. The master disconnects workers before killing them."
    },
    {
      "title": "Worker Health Monitoring and Crash Recovery",
      "useCase": "Implement exponential backoff for worker restarts",
      "code": "var cluster = require(\"cluster\");\nvar http = require(\"http\");\nvar os = require(\"os\");\n\nif (cluster.isPrimary) {\n  var restartCounts = {};\n\n  function createWorker() {\n    var worker = cluster.fork();\n    var id = worker.id;\n    if (!restartCounts[id]) restartCounts[id] = 0;\n\n    worker.on(\"exit\", function(code, signal) {\n      restartCounts[id]++;\n      var count = restartCounts[id];\n\n      if (count > 10) {\n        console.error(\"Worker \" + id + \" crashed too many times\");\n        return;\n      }\n\n      // Exponential backoff: 1s, 2s, 4s, 8s, ...\n      var delay = Math.min(1000 * Math.pow(2, count - 1), 30000);\n      console.log(\"Worker \" + id + \" crashed (attempt \" + count + \"),\",\n        \"restarting in \" + delay + \"ms\");\n\n      setTimeout(createWorker, delay);\n    });\n\n    // Health check via IPC\n    worker.on(\"message\", function(msg) {\n      if (msg.type === \"health\") {\n        restartCounts[id] = 0; // Reset on successful health check\n      }\n    });\n\n    return worker;\n  }\n\n  for (var i = 0; i < os.cpus().length; i++) {\n    createWorker();\n  }\n} else {\n  var server = http.createServer(function(req, res) {\n    res.end(\"OK from worker \" + cluster.worker.id);\n  }).listen(3000);\n\n  // Send periodic health check to master\n  setInterval(function() {\n    process.send({ type: \"health\", pid: process.pid });\n  }, 5000);\n}",
      "description": "Exponential backoff prevents crash loops from overwhelming the system. Workers send health check messages to the master. If a worker crashes, the master waits longer between each restart attempt, capped at 30 seconds."
    },
    {
      "title": "IPC Messaging Between Master and Workers",
      "useCase": "Coordinate activity across processes",
      "code": "var cluster = require(\"cluster\");\nvar http = require(\"http\");\n\nif (cluster.isPrimary) {\n  var worker = cluster.fork();\n\n  // Master receives messages from workers\n  worker.on(\"message\", function(msg) {\n    console.log(\"Master received:\", JSON.stringify(msg));\n    if (msg.type === \"request_count\") {\n      worker.send({ type: \"response\", data: \"Count: \" + msg.count });\n    }\n  });\n\n  // Master sends messages to workers\n  worker.send({ type: \"greeting\", text: \"Hello from master!\" });\n} else {\n  var requestCount = 0;\n\n  // Worker receives messages from master\n  process.on(\"message\", function(msg) {\n    console.log(\"Worker received:\", JSON.stringify(msg));\n  });\n\n  http.createServer(function(req, res) {\n    requestCount++;\n    res.end(\"OK\\n\");\n    // Notify master about request count periodically\n    if (requestCount % 5 === 0) {\n      process.send({\n        type: \"request_count\",\n        count: requestCount,\n        pid: process.pid\n      });\n    }\n  }).listen(3000);\n}",
      "description": "IPC uses serialized JSON messages via process.send() and process.on(\"message\"). Messages are asynchronous. Use IPC for coordination (health checks, stats reporting, task distribution) not for passing large data."
    },
    {
      "title": "Sticky Session Load Balancing with Cluster",
      "useCase": "Route clients to the same worker consistently",
      "code": "var cluster = require(\"cluster\");\nvar http = require(\"http\");\nvar crypto = require(\"crypto\");\n\n// Hash-based sticky session using client IP\nfunction getWorkerId(remoteAddress, numWorkers) {\n  var hash = crypto.createHash(\"md5\").update(remoteAddress).digest(\"hex\");\n  return parseInt(hash.slice(0, 8), 16) % numWorkers;\n}\n\nif (cluster.isPrimary) {\n  var numWorkers = 4;\n  for (var i = 0; i < numWorkers; i++) {\n    cluster.fork();\n  }\n\n  // Round-robin is default, but we handle sticky in the load balancer\n  cluster.on(\"exit\", function(worker) {\n    cluster.fork();\n  });\n} else {\n  var sessionData = {};\n  http.createServer(function(req, res) {\n    // Simulate session-based state\n    var sessionId = req.headers[\"cookie\"] || \"anon\";\n    if (!sessionData[sessionId]) {\n      sessionData[sessionId] = { visits: 0 };\n    }\n    sessionData[sessionId].visits++;\n    res.writeHead(200, { \"Content-Type\": \"text/plain\" });\n    res.end(\"Worker \" + cluster.worker.id\n      + \" - Visit \" + sessionData[sessionId].visits');\n  }).listen(3000);\n}",
      "description": "Sticky sessions route requests from the same client to the same worker. This example uses IP-based hashing. In production, use a reverse proxy (Nginx, HAProxy) with the ip_hash directive for proper sticky sessions."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does cluster.isPrimary check?",
      "options": [
        "If the process is a worker",
        "If the process is the master/primary",
        "If clustering is enabled",
        "If the process is running"
      ],
      "answer": 1,
      "explanation": "cluster.isPrimary is true in the master process. cluster.isWorker is true in worker processes. (Renamed from isMaster in Node 16)."
    },
    {
      "question": "How does round-robin scheduling work in clusters?",
      "options": [
        "OS distributes connections",
        "Master accepts and distributes connections evenly",
        "Workers compete for connections",
        "Random assignment"
      ],
      "answer": 1,
      "explanation": "SCHED_RR: master accepts connections and distributes them to workers in sequential order for even load distribution."
    },
    {
      "question": "What happens when a worker crashes?",
      "options": [
        "The entire cluster stops",
        "The master can fork a replacement worker",
        "Other workers automatically take over",
        "Node.js restarts automatically"
      ],
      "answer": 1,
      "explanation": "The master monitors \"exit\" events and can fork a replacement worker. The other workers continue serving requests unaffected."
    },
    {
      "question": "How do cluster workers share state?",
      "options": [
        "Through shared memory",
        "They do not share memory - use external store (Redis/DB)",
        "Via global variables",
        "Through file system"
      ],
      "answer": 1,
      "explanation": "Workers are separate processes with separate memory. Shared state requires an external store like Redis, a database, or IPC through the master."
    },
    {
      "question": "What is the purpose of worker.disconnect()?",
      "options": [
        "Kills the worker immediately",
        "Closes IPC channel, worker finishes requests then exits",
        "Removes worker from cluster",
        "Pauses the worker"
      ],
      "answer": 1,
      "explanation": "disconnect() closes the IPC channel between master and worker. The worker can finish handling existing requests before the process exits."
    },
    {
      "question": "Which is NOT a valid cluster scaling approach?",
      "options": [
        "Using PM2 with -i max",
        "Using worker_threads for I/O scaling",
        "Using Docker/Kubernetes containers",
        "Cluster module with os.cpus().length workers"
      ],
      "answer": 1,
      "explanation": "worker_threads are for CPU-intensive tasks within a single process, not for scaling I/O across cores. Cluster, PM2, and containers are for horizontal scaling."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-commonjs"] = {
  "title": "Node.js CommonJS Modules",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "CommonJS (CJS) is the original module system for Node.js, using require() to import modules and module.exports to export values.",
    "Modules are loaded synchronously and cached after the first require() call. Subsequent require() calls return the cached module.exports.",
    "module.exports and exports refer to the same object initially, but reassigning exports breaks the reference.",
    "The require resolution algorithm: built-in modules → relative paths → node_modules → global paths (NODE_PATH)."
  ],
  "laymanDefinition": "CommonJS is the default packaging system for Node.js. Think of it like a library catalog system. When you write code, you can put your functions in one file (a \"module\") and say \"this is what I want to share\" using module.exports. Then another file can say \"I need that\" using require(\"./my-module\"). Node.js remembers which modules it has loaded (caching), so if two files require the same module, they get the same copy - like checking out the same book from the library instead of buying two copies. The require function searches for modules in a specific order: first built-in Node.js modules, then files on your computer, then packages in node_modules.",
  "deepDive": [
    {
      "heading": "module.exports and exports Object",
      "text": "module.exports is the actual object returned by require(). exports is a shorthand reference to module.exports. Initially: exports === module.exports is true. Reassignment breaks: (1) module.exports = { foo: \"bar\" } - works, replaces the export object. (2) exports.foo = \"bar\" - works, adds property. (3) exports = { foo: \"bar\" } - does NOT work, breaks the reference. The module.exports is returned regardless of what exports points to. Common patterns: (1) Adding properties: exports.fn = function() {}. (2) Replacing: module.exports = function() {}. (3) Multiple exports: module.exports = { ClassA, ClassB }. (4) Singleton: module.exports = new Instance(). exports is safer to use {}. method is better for exporting multiple named values."
    },
    {
      "heading": "The require() Function and Module Resolution",
      "text": "require(id) resolves using this algorithm: (1) Built-in modules (fs, http, path) - checked first. (2) Relative paths starting with ./ or ../ - resolved relative to __dirname of the calling file. Tries extensions: .js, .json, .node. (3) Absolute paths starting with /. (4) node_modules lookup - walks up the directory tree checking each node_modules folder. (5) Global NODE_PATH directories. require.resolve(id) returns the resolved file path without loading the module. require.cache - an object containing all cached modules, keyed by resolved filename. Delete a cached module: delete require.cache[require.resolve(\"./module\")]. This forces re-evaluation on the next require (useful for hot reloading). require.main - the Module object representing the entry script. require.extensions - deprecated, used to add custom file type handlers."
    },
    {
      "heading": "Module Caching and the Module Object",
      "text": "Node.js caches modules after the first require(). The cache key is the resolved absolute path. Implications: (1) Modules are singletons - the same exports object is returned every time. (2) Module initialization code runs only once. (3) Circular dependencies are handled by returning the partial exports object (whatever was assigned at the time of the circular require). The Module constructor (require(\"module\").Module): Module._resolveFilename(), Module._load(), Module._extensions. module object inside each file: module.id (resolved path), module.filename (full path), module.loaded (boolean), module.parent (the module that required this one), module.children (modules required by this one), module.paths (lookup paths for require()). module.paths is useful for debugging resolution issues."
    },
    {
      "heading": "CommonJS vs ES Modules Interoperability",
      "text": "CommonJS can require() other CommonJS modules and most ES Modules (with limitations). (1) CJS can import ESM using dynamic import(): async function loadESM() { const mod = await import(\"./esm-module.mjs\"); }. (2) CJS cannot require() ESM directly - require() is synchronous, ESM is asynchronous. (3) ESM can import CJS modules using import default: import fs from \"fs\" (CJS default export), import { readFile } from \"fs\" (named exports detection). (4) ESM treats the entire CJS module.exports as a single default export - named exports are detected via static analysis for built-in CJS modules. (5) CJS wrapper: Node.js wraps CJS files in (function(exports, require, module, __filename, __dirname) { ... }). This provides the module-scoped variables. (6) __filename and __dirname are not available in ESM - use import.meta.url."
    },
    {
      "heading": "require() Performance and Best Practices",
      "text": "(1) require() is synchronous and blocks the event loop during module loading. Keep module-level side effects minimal. (2) Module resolution traverses the filesystem - deep node_modules trees increase startup time. (3) Cyclical require() patterns cause partial exports - restructure to avoid cycles. (4) Conditional requires: if (condition) { module = require(\"./optional\") } - works but breaks static analysis. (5) Lazy loading: require() inside functions loads modules on demand, reducing startup time. (6) Module factories: function createModule() { return require(\"./module\") } - ensures fresh instance. (7) Cache invalidation: delete require.cache[key] for hot reloading during development. (8) Module path resolution performance: use absolute paths or __dirname-based relative paths for faster resolution. (9) Consider bundle size: require() pulls in the entire module - tree shaking is not available in CJS (use ESM for that). (10) Use require.resolve.paths() to debug resolution paths."
    }
  ],
  "interviewAnswer": "CommonJS uses require() and module.exports. require() loads modules synchronously and caches them. module.exports is the returned value; exports is a reference (reassigning exports breaks it). Resolution order: built-in, relative (./), node_modules, NODE_PATH. require.cache stores loaded modules (keyed by resolved path). CJS is synchronous, blocking during module loading. For circular dependencies, CJS returns partial exports. CJS can import ESM via dynamic import(), but cannot require() ESM. ESM can import CJS as default export. Node wraps CJS in a function providing exports, require, module, __filename, __dirname. For performance: minimize module-level side effects, use lazy loading for infrequently used modules.",
  "interviewQuestions": [
    {
      "question": "What is the difference between module.exports and exports?",
      "answer": "exports is initially a reference to module.exports. module.exports is what require() returns. Adding properties to exports works (exports.foo = 1). Reassigning exports breaks the reference (exports = {} does not affect module.exports). Use module.exports to replace the entire export object."
    },
    {
      "question": "How does Node.js resolve require(\"./module\")?",
      "answer": "(1) Check for \"./module\" as file (tries .js, .json, .node). (2) Check \"./module/\" as directory with index.js/index.json/index.node. (3) If not found, throws MODULE_NOT_FOUND. For bare specifiers (require(\"lodash\")), walks up node_modules directories."
    },
    {
      "question": "How does module caching work?",
      "answer": "require() caches modules in require.cache (object keyed by resolved absolute path). After the first require, subsequent calls return the cached exports object. Delete: delete require.cache[path] to re-evaluate on next require. Cached modules are singletons."
    },
    {
      "question": "How do you handle circular dependencies in CommonJS?",
      "answer": "Node.js returns the partial exports object at the time of the circular require. Both modules get the other's exports in whatever state they were when the require was called. Restructure code to avoid cycles by extracting shared dependencies into a third module."
    },
    {
      "question": "What is the require.resolve() function?",
      "answer": "require.resolve(id) returns the resolved absolute path of a module without executing it. Useful for: checking if a module is available, getting the file path, or debugging resolution issues. Combined with require.cache for cache manipulation."
    },
    {
      "question": "Can CommonJS import ES Modules?",
      "answer": "CJS cannot use require() to import ESM (require is synchronous, ESM is asynchronous). CJS can use dynamic import(): async function load() { const mod = await import(\"./esm.mjs\"); }. This returns a module namespace object."
    },
    {
      "question": "What are the module-scoped variables in CommonJS?",
      "answer": "__filename (full path to current module), __dirname (directory of current module), exports (short for module.exports), require (the require function), module (the current Module instance). These are injected by Node.js module wrapper function."
    },
    {
      "question": "What is require.main?",
      "answer": "require.main is the Module object representing the entry point script (the one run with node app.js). Check require.main === module to detect if a file is the entry point (useful for making a file both a library and a CLI)."
    },
    {
      "question": "How do you implement hot reloading with require.cache?",
      "answer": "(1) Delete the cached module: delete require.cache[require.resolve(\"./module\")]. (2) Re-require: const mod = require(\"./module\"). (3) Clear all modules that depend on the changed one recursively. (4) Use chokidar or fs.watch to detect file changes. This is used in development tools like nodemon."
    },
    {
      "question": "What are require.extensions?",
      "answer": "require.extensions is an object mapping file extensions to loader functions. It is deprecated. Previously used to add custom handlers for .coffee, .ts files. Modern Node.js uses ESM loaders or --experimental-loader for custom resolution."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">CommonJS Module System</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">module.exports</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">What require() returns</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">require(\"./module\")</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Loads & caches module</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">require.cache</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Cached modules dict</text></svg>",
  "codeExamples": [
    {
      "title": "module.exports Patterns",
      "useCase": "Different ways to export values from CommonJS modules",
      "code": "// 1. Export an object with properties (most common)\nexports.add = function(a, b) { return a + b; };\nexports.subtract = function(a, b) { return a - b; };\n\n// 2. Replace module.exports with a function\n// module.exports = function(a, b) { return a + b; };\n\n// 3. Export a class/constructor\n// function Calculator() { this.result = 0; }\n// Calculator.prototype.add = function(n) { this.result += n; };\n// module.exports = Calculator;\n\n// 4. Export an instance (singleton)\n// module.exports = new Calculator();\n\n// 5. Named exports via destructuring\n// module.exports = { add, subtract, multiply, divide };\n\n// 6. Conditional exports\n// if (process.env.NODE_ENV === \"production\") {\n//   module.exports = require(\"./prod-config\");\n// } else {\n//   module.exports = require(\"./dev-config\");\n// }\n\n// Usage in another file:\n// const math = require(\"./math\");\n// math.add(2, 3); // 5\n\n// Or destructure:\n// const { add, subtract } = require(\"./math\");",
      "description": "CommonJS offers multiple export patterns: adding to exports (named exports), replacing module.exports (single export), exporting classes, singletons, or conditionally. Choose based on the module's purpose."
    },
    {
      "title": "Module Caching and Singleton Behavior",
      "useCase": "Demonstrate how caching works",
      "code": "// counter.js\nvar count = 0;\nmodule.exports = {\n  increment: function() { return ++count; },\n  getCount: function() { return count; }\n};\n\n// app.js\nvar counter1 = require(\"./counter\");\nvar counter2 = require(\"./counter\");\n\nconsole.log(\"Same instance:\", counter1 === counter2); // true\n\ncounter1.increment();\ncounter1.increment();\nconsole.log(\"Counter 1 count:\", counter1.getCount()); // 2\nconsole.log(\"Counter 2 count:\", counter2.getCount()); // 2\n\n// Bypass cache:\ndelete require.cache[require.resolve(\"./counter\")];\nvar counter3 = require(\"./counter\");\nconsole.log(\"After cache clear:\", counter3 === counter1); // false\nconsole.log(\"New counter:\", counter3.getCount()); // 0\n\n// require.cache structure:\nconsole.log(\"Cached modules:\", Object.keys(require.cache).length);\nrequire.cache[require.resolve(\"./counter\")].exports === counter3; // true",
      "description": "Caching ensures singletons - all require() calls return the same instance. Deleting from require.cache forces re-evaluation. module-level variables (count) persist across calls within the same cached instance."
    },
    {
      "title": "Circular Dependencies Handling",
      "useCase": "How Node.js handles circular require() calls",
      "code": "// a.js\nconsole.log(\"a.js starting\");\nexports.loaded = false;\nvar b = require(\"./b\");\nconsole.log(\"in a.js, b.loaded =\", b.loaded);\nexports.loaded = true;\nconsole.log(\"a.js done\");\n\n// b.js\nconsole.log(\"b.js starting\");\nexports.loaded = false;\nvar a = require(\"./a\");\nconsole.log(\"in b.js, a.loaded =\", a.loaded);\nexports.loaded = true;\nconsole.log(\"b.js done\");\n\n// main.js\nconsole.log(\"main.js starting\");\nvar a = require(\"./a\");\nvar b = require(\"./b\");\nconsole.log(\"Done. a.loaded:\", a.loaded, \"b.loaded:\", b.loaded);\n\n// Output:\n// main.js starting\n// a.js starting\n// b.js starting\n// in b.js, a.loaded = false  (partial export!)\n// b.js done\n// in a.js, b.loaded = true\n// a.js done\n// Done. a.loaded: true b.loaded: true",
      "description": "Circular dependencies: Node.js returns the partial exports object. b.js sees a.js with exports.loaded = false because a.js had not finished executing when b.js required it. This can cause subtle bugs - avoid circular dependencies."
    },
    {
      "title": "require() Resolution Algorithm",
      "useCase": "Understand how Node.js finds modules",
      "code": "var path = require(\"path\");\n\n// Check what paths Node.js searches for modules\nfunction showResolvePaths(moduleName) {\n  try {\n    var resolved = require.resolve(moduleName);\n    console.log(\"Resolved:\", moduleName, \"→\", resolved);\n  } catch (err) {\n    console.log(\"Not found:\", moduleName);\n  }\n}\n\n// Show module search paths for the current directory\nconsole.log(\"Search paths:\");\nrequire.resolve.paths(\"anything\").forEach(function(p) {\n  console.log(\"  \" + p);\n});\n\n// Resolution examples:\nshowResolvePaths(\"fs\");          // Built-in (no path)\nshowResolvePaths(\"./app\");        // Relative to __dirname\nshowResolvePaths(\"lodash\");       // node_modules\n\n// module.paths shows where Node.js looks for this file's requires\nconsole.log(\"Module paths:\");\nmodule.paths.forEach(function(p) {\n  console.log(\"  \" + p);\n});\n\n// require.main is the entry script\nconsole.log(\"Entry script:\", require.main.filename);\nconsole.log(\"Is this the entry?\", require.main === module);\n\n// Check if a module is available\nfunction isModuleAvailable(name) {\n  try { require.resolve(name); return true; }\n  catch (e) { return false; }\n}\n\nconsole.log(\"lodash available:\", isModuleAvailable(\"lodash\"));",
      "description": "Use require.resolve() to check if a module is available without loading it. require.resolve.paths() shows where Node.js searches. module.paths shows search paths for the current module. require.main identifies the entry script."
    },
    {
      "title": "Module Wrapper Function",
      "useCase": "Understand the function that wraps each CommonJS module",
      "code": "// Node.js wraps each module in:\n// (function(exports, require, module, __filename, __dirname) {\n//   // Module code goes here\n// });\n\n// This means we can inspect the wrapper:\nconsole.log(\"Module wrapper:\");\nconsole.log(require(\"module\").wrapper);\n\n// The wrapper provides:\n// - exports: shortcut for module.exports\n// - require: the require function\n// - module: the current module object\n// - __filename: absolute path to this file\n// - __dirname: absolute directory of this file\n\nconsole.log(\"__filename:\", __filename);\nconsole.log(\"__dirname:\", __dirname);\nconsole.log(\"module.id:\", module.id);\nconsole.log(\"module.filename:\", module.filename);\nconsole.log(\"module.loaded:\", module.loaded);\nconsole.log(\"module.parent:\", module.parent ? module.parent.filename : null);\nconsole.log(\"module.children count:\", module.children.length);\n\n// exports is just a reference:\nconsole.log(\"exports === module.exports:\", exports === module.exports);\n\n// module.loaded is true after the module finishes executing\nprocess.nextTick(function() {\n  console.log(\"module.loaded after tick:\", module.loaded); // true\n});",
      "description": "Node.js wraps each CJS module in a function that provides module-scoped variables. The wrapper isolates module scope and provides exports, require, module, __filename, __dirname. module.loaded is false during execution, true after completion."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does require() return?",
      "options": [
        "exports",
        "module.exports",
        "module",
        "require"
      ],
      "answer": 1,
      "explanation": "require() returns the value of module.exports. exports is initially a reference to it but is not returned directly."
    },
    {
      "question": "What happens if you reassign exports?",
      "options": [
        "module.exports is updated too",
        "The reference to module.exports is broken",
        "Nothing, it is ignored",
        "An error is thrown"
      ],
      "answer": 1,
      "explanation": "Reassigning exports (exports = {}) breaks the reference to module.exports. Properties added to exports BEFORE reassignment are preserved on module.exports."
    },
    {
      "question": "What is the first step in the require() resolution algorithm?",
      "options": [
        "Check node_modules",
        "Check built-in modules",
        "Check relative paths",
        "Check NODE_PATH"
      ],
      "answer": 1,
      "explanation": "Built-in modules (fs, http, path) are checked first. Then relative paths, then node_modules, then NODE_PATH."
    },
    {
      "question": "How are circular dependencies handled?",
      "options": [
        "They cause a stack overflow",
        "Node.js returns the partial exports object",
        "The module is re-evaluated",
        "An error is thrown"
      ],
      "answer": 1,
      "explanation": "For circular deps, Node.js returns whatever exports were assigned up to the point of the circular require(). This can lead to incomplete exports."
    },
    {
      "question": "What module property contains all cached modules?",
      "options": [
        "require.loaded",
        "require.cache",
        "module.registry",
        "module.cache"
      ],
      "answer": 1,
      "explanation": "require.cache is an object keyed by resolved absolute file paths with Module objects as values."
    },
    {
      "question": "How do you check if a module is available without loading it?",
      "options": [
        "require.exists(\"module\")",
        "require.resolve(\"module\")",
        "Module.isAvailable(\"module\")",
        "require.check(\"module\")"
      ],
      "answer": 1,
      "explanation": "require.resolve(\"module\") returns the resolved path without loading the module. Throws MODULE_NOT_FOUND if unavailable."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-env-variables"] = {
  "title": "Node.js Environment Variables",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "Environment variables are key-value pairs available to a process via process.env, inherited from the parent process and set at the system or shell level.",
    "Common conventions: NODE_ENV (development/production), PORT (HTTP port), DATABASE_URL (connection string), DEBUG (debug namespaces).",
    "Use .env files with dotenv package for local development to set environment variables without modifying system configuration.",
    "Environment variables are strings by default. Numbers and booleans must be explicitly parsed. Never store secrets in source code or .env files committed to version control."
  ],
  "laymanDefinition": "Environment variables are like settings that the operating system passes to every program when they start. Think of them as a bulletin board outside your application that contains important information: \"Your port is 3000\", \"Database is at db.example.com\", \"You are in development mode\". Any program can read these settings by looking at the board. They are useful because you can change the board without changing the program's code - the same code runs differently on your laptop (development) versus a server (production) just by changing the bulletin board contents.",
  "deepDive": [
    {
      "heading": "Accessing Environment Variables in Node.js",
      "text": "process.env is a plain JavaScript object where each key-value pair is a string. Access: process.env.NODE_ENV, process.env.PORT. If a variable is not set, it returns undefined. Set in code: process.env.MY_VAR = \"value\" - affects the current process and child processes. Delete: delete process.env.MY_VAR. All values are strings - must parse: parseInt(process.env.PORT, 10), process.env.DEBUG === \"true\". Platform-specific case sensitivity: Windows environment variable names are case-insensitive (Node.js normalizes to lowercase on Windows). Linux/Mac are case-sensitive. Use process.env.PATH or process.env.Path depending on platform (though PATH is universal in practice). process.env.NODE_ENV is a de facto standard but not built into Node.js itself. Express and many libraries check it."
    },
    {
      "heading": "Setting Environment Variables",
      "text": "(1) Shell: NODE_ENV=production node app.js (POSIX), set NODE_ENV=production && node app.js (Windows cmd), $env:NODE_ENV=\"production\"; node app.js (PowerShell). (2) .env files: create a .env file with KEY=VALUE format, load with require(\"dotenv\").config(). (3) package.json scripts: \"start\": \"NODE_ENV=production node server.js\" (POSIX), use cross-env for cross-platform: \"start\": \"cross-env NODE_ENV=production node server.js\". (4) Docker: ENV NODE_ENV=production in Dockerfile, or -e NODE_ENV=production in docker run. (5) CI/CD platforms: set via UI or YAML config (GitHub Actions env, GitLab CI variables). (6) .env vs .env.local vs .env.production - dotenv supports multiple files for different environments. (7) Windows system settings: System Properties > Advanced > Environment Variables."
    },
    {
      "heading": "The dotenv Package and .env Files",
      "text": "dotenv is the standard package for loading .env files. Basic usage: require(\"dotenv\").config() loads .env into process.env. options: path (custom file path), override (overwrite existing env vars, default false), debug (logging). Multi-file support: dotenv.config({ path: \".env.local\" }), dotenv.config({ path: \".env.production\" }). Order matters - later calls do NOT override existing variables by default. Best practices: (1) Add .env to .gitignore. (2) Create .env.example with placeholder values committed to repo. (3) Use .env.development, .env.production, .env.test for different environments. (4) .env file rules: no spaces around =, quotes are part of the value, # for comments, multiline values with \\n or double quotes. (5) The dotenv-expand package enables variable expansion: KEY=\"${OTHER_KEY}/subdir\"."
    },
    {
      "heading": "Security Considerations for Environment Variables",
      "text": "(1) Never commit .env files to version control. Use .env.example with placeholder values. (2) Secrets: API keys, database passwords, JWT secrets, encryption keys. Leaked secrets can compromise systems. (3) Process isolation: env vars are accessible to child processes - a compromised child process can read parent's secrets. (4) Memory exposure: env vars in process.env can be accessed via /proc/self/environ on Linux or process dump. (5) Logging: avoid logging process.env or printing secrets to console. (6) Injection: user-controlled env var names can override sensitive variables - sanitize var names. (7) Alternative for production: use secret managers (AWS Secrets Manager, HashiCorp Vault, Docker secrets, Kubernetes secrets) instead of env vars for sensitive data. (8) Validation: validate that required env vars exist at startup using libraries like envalid or joi."
    },
    {
      "heading": "Best Practices for Environment Configuration",
      "text": "(1) Use a config module to centralize env var access: module.exports = { port: parseInt(process.env.PORT, 10) || 3000 }. (2) Validate required variables early in the application lifecycle. (3) Provide sensible defaults for optional variables. (4) Use NODE_ENV consistently: \"development\", \"production\", \"test\". (5) Prefix app-specific vars with APP_: APP_DB_HOST, APP_SECRET. (6) Use TypeScript/envalid for typed env vars with validation. (7) Document all env vars in README or .env.example. (8) For 12-factor apps: store config in environment variables. (9) Use different .env files per environment but keep the schema consistent. (10) Avoid environment variable sprawl - consolidate related settings into structured config objects."
    }
  ],
  "interviewAnswer": "Environment variables are accessed via process.env in Node.js. All values are strings - parse numbers and booleans explicitly. Set via shell, .env files (dotenv package), or container orchestration. NODE_ENV is the de facto standard for environment detection. Best practices: centralize config access in a module, validate required vars at startup, provide defaults, never commit .env files (use .env.example). Security: avoid logging secrets, use secret managers in production, be aware child processes inherit env vars. For production, consider Docker secrets, Vault, or cloud secret managers instead of raw env vars for sensitive data.",
  "interviewQuestions": [
    {
      "question": "How do you access environment variables in Node.js?",
      "answer": "process.env.VAR_NAME or process.env[\"VAR_NAME\"]. All values are strings. Returns undefined if the variable is not set. Set: process.env.MY_VAR = \"value\". Delete: delete process.env.MY_VAR."
    },
    {
      "question": "What is NODE_ENV and why is it important?",
      "answer": "NODE_ENV is a convention to indicate the application environment: \"development\", \"production\", or \"test\". Frameworks like Express use it to enable/disable features (stack traces in dev, caching in prod). It is NOT built into Node.js - you must set it explicitly."
    },
    {
      "question": "How do you handle cross-platform env var setting in npm scripts?",
      "answer": "Use the cross-env package: \"start\": \"cross-env NODE_ENV=production node app.js\". Without cross-env, POSIX uses NODE_ENV=production node app.js, but this fails on Windows. cross-env normalizes the syntax."
    },
    {
      "question": "What is the dotenv package and how do you use it?",
      "answer": "dotenv loads .env file contents into process.env. Usage: require(\"dotenv\").config(). Supports custom paths: dotenv.config({ path: \".env.production\" }). The .env file should be in .gitignore. Use .env.example as a template."
    },
    {
      "question": "How do you validate that required environment variables are set?",
      "answer": "Check at startup: if (!process.env.DATABASE_URL) throw new Error(\"DATABASE_URL required\"). Use libraries like envalid or joi for typed validation with defaults. Validate early so the app fails fast with a clear message."
    },
    {
      "question": "What are the security risks of environment variables?",
      "answer": "(1) Leaking secrets if .env is committed. (2) Accessible to child processes. (3) Visible in process listings (ps aux). (4) Logged by accident. (5) Injected via user-controlled names. Mitigations: use .gitignore, use secret managers in production, validate required vars, never log process.env."
    },
    {
      "question": "How do environment variables work on different platforms?",
      "answer": "POSIX: export VAR=value (bash), set VAR=value (sh). Windows CMD: set VAR=value. PowerShell: $env:VAR=\"value\". Node.js normalizes Windows env var names to lowercase. Variable names are case-sensitive on POSIX, case-insensitive on Windows."
    },
    {
      "question": "What is the difference between .env, .env.local, and .env.production?",
      "answer": "dotenv conventions: .env (default, loaded first), .env.local (local overrides, gitignored), .env.development/.env.production/.env.test (environment-specific). Later files do not override existing vars. Order: .env → .env.development → .env.local."
    },
    {
      "question": "How do you structure environment variables for a 12-factor app?",
      "answer": "(1) Store config in environment variables. (2) One config per deployment (dev, staging, prod). (3) Never hardcode config in code. (4) Group related vars with prefixes (DB_HOST, DB_PORT, DB_NAME). (5) Use a config module that reads from process.env with validation."
    },
    {
      "question": "How do you handle boolean environment variables?",
      "answer": "Environment variables are strings. process.env.DEBUG === \"true\", not truthy check: if (process.env.DEBUG) // \"false\" would be truthy!. Proper check: process.env.DEBUG === \"true\" || process.env.DEBUG === \"1\". Use a helper: const toBool = (v) => v === \"true\" || v === \"1\"."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Environment Variables in Node.js</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">process.env</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Access all env vars as strings</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">dotenv .env</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Load from file</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Shell / OS</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Export or set command</text></svg>",
  "codeExamples": [
    {
      "title": "Centralized Configuration Module",
      "useCase": "Access and validate env vars from a single module",
      "code": "// config.js\nfunction required(name) {\n  var value = process.env[name];\n  if (!value) {\n    throw new Error(\"Missing required env var: \" + name);\n  }\n  return value;\n}\n\nfunction optional(name, defaultValue) {\n  var value = process.env[name];\n  return value !== undefined ? value : defaultValue;\n}\n\nvar config = {\n  env: process.env.NODE_ENV || \"development\",\n  isDev: process.env.NODE_ENV === \"development\",\n  isProd: process.env.NODE_ENV === \"production\",\n  port: parseInt(optional(\"PORT\", \"3000\"), 10),\n  db: {\n    host: optional(\"DB_HOST\", \"localhost\"),\n    port: parseInt(optional(\"DB_PORT\", \"5432\"), 10),\n    name: required(\"DB_NAME\"),\n    user: required(\"DB_USER\"),\n    password: required(\"DB_PASSWORD\")\n  },\n  redis: {\n    url: optional(\"REDIS_URL\", \"redis://localhost:6379\")\n  },\n  debug: process.env.DEBUG === \"true\",\n  logLevel: optional(\"LOG_LEVEL\", \"info\")\n};\n\nmodule.exports = config;",
      "description": "Centralize all process.env access in a config module. Use required() for mandatory vars (fail fast at startup), optional() for optional ones (with sensible defaults). Parse types (parseInt, boolean check) in one place."
    },
    {
      "title": "Using dotenv for Different Environments",
      "useCase": "Load environment-specific .env files",
      "code": "// Load dotenv at the very start of your app\nrequire(\"dotenv\").config();\n\n// .env file:\n// PORT=3000\n// DB_HOST=localhost\n// # This is a comment\n// MULTI_LINE=\"line1\\nline2\"\n\n// For specific environment files:\nvar envFile = \".env.\" + (process.env.NODE_ENV || \"development\");\nrequire(\"dotenv\").config({ path: envFile });\n\n// .env.development:\n// NODE_ENV=development\n// DEBUG=true\n// LOG_LEVEL=debug\n\n// .env.production:\n// NODE_ENV=production\n// DEBUG=false\n// LOG_LEVEL=error\n\n// .env.example (committed to git, .env is in .gitignore):\n// PORT=3000\n// DB_HOST=localhost\n// DB_NAME=myapp\n// # Fill in your credentials:\n// DB_USER=\n// DB_PASSWORD=\n\nconsole.log(\"Environment:\", process.env.NODE_ENV);\nconsole.log(\"Port:\", process.env.PORT);\nconsole.log(\"Debug:\", process.env.DEBUG);",
      "description": "dotenv loads .env files into process.env. Use environment-specific files (.env.development, .env.production). Commit .env.example (with placeholder values) but not .env (with real secrets). Load dotenv as early as possible, before any other module reads process.env."
    },
    {
      "title": "Setting and Reading Environment Variables at Runtime",
      "useCase": "Work with env vars programmatically",
      "code": "// Read environment variables\nconsole.log(\"PATH:\", process.env.PATH);\nconsole.log(\"HOME:\", process.env.HOME || process.env.USERPROFILE);\nconsole.log(\"OS:\", process.env.OS);\n\n// Set environment variables (affects current process and children)\nprocess.env.MY_CUSTOM_VAR = \"custom-value\";\nprocess.env.NODE_ENV = \"production\";\n\n// Child processes inherit current env\nvar spawn = require(\"child_process\").spawn;\nvar child = spawn(\"node\", [\"-e\", \"console.log(process.env.MY_CUSTOM_VAR)\"]);\nchild.stdout.on(\"data\", function(data) {\n  console.log(\"Child received:\", data.toString().trim());\n});\n\n// Delete environment variable\ndelete process.env.MY_CUSTOM_VAR;\nconsole.log(\"After delete:\", process.env.MY_CUSTOM_VAR); // undefined\n\n// List all environment variables (sorted)\nObject.keys(process.env).sort().forEach(function(key) {\n  // Avoid logging sensitive values in production\n  if (key.includes(\"SECRET\") || key.includes(\"PASSWORD\")) {\n    console.log(key + \"=***\");\n  } else {\n    console.log(key + \"=\" + process.env[key]);\n  }\n});",
      "description": "Environment variables can be read, set, and deleted at runtime. Changes affect the current process and child processes created after the change. Be careful not to log sensitive values. Use prefixes like SECRET to identify sensitive vars."
    },
    {
      "title": "Validation with Envalid Library",
      "useCase": "Use envalid for typed env var validation",
      "code": "// npm install envalid\nvar envalid = require(\"envalid\");\nvar { str, num, bool, url, email, json } = envalid;\n\nvar env = envalid.cleanEnv(process.env, {\n  NODE_ENV: str({ choices: [\"development\", \"production\", \"test\"] }),\n  PORT: num({ default: 3000, devDefault: 3000 }),\n  API_KEY: str({ desc: \"API key for external service\" }),\n  DEBUG: bool({ default: false }),\n  DB_URL: url({ desc: \"Database connection URL\" }),\n  ADMIN_EMAIL: email({ default: \"admin@example.com\" }),\n  REDIS_CONFIG: json({ desc: \"Redis config as JSON string\" })\n}, {\n  strict: true,  // Throw on unknown env vars\n  dotEnvPath: \".env\",  // Auto-load .env file\n});\n\n// env is a frozen object with typed values\nconsole.log(\"Port:\", env.PORT);  // number\nconsole.log(\"Debug:\", env.DEBUG);  // boolean\nconsole.log(\"Node env:\", env.NODE_ENV);  // string, validated\n\n// envalid provides:\n// - Type coercion (string → number/bool/url)\n// - Validation (choices, format)\n// - Defaults\n// - Clear error messages on failure\n// - .env auto-loading\n// - Strict mode catches typos",
      "description": "envalid provides typed environment variable validation with clear error messages. It supports str, num, bool, url, email, json types. Defaults, choices validation, and strict mode prevent misconfiguration. The returned object is frozen with validated values."
    },
    {
      "title": "Debugging with DEBUG Environment Variable",
      "useCase": "Use DEBUG namespace convention for selective logging",
      "code": "// Run: DEBUG=app:*,app:db* node app.js\n// Or use comma-separated: DEBUG=app:server,app:db node app.js\n\nvar debug = require(\"debug\");\n\nvar logServer = debug(\"app:server\");\nvar logDb = debug(\"app:db\");\nvar logAuth = debug(\"app:auth\");\n\nfunction startServer() {\n  logServer(\"Starting server on port %d\", 3000);\n  logServer(\"Server started in %s mode\", process.env.NODE_ENV);\n}\n\nfunction connectDatabase() {\n  logDb(\"Connecting to database at %s\", process.env.DB_HOST);\n  logDb(\"Connection pool size: %d\", 10);\n}\n\nfunction authenticateUser(user) {\n  logAuth(\"Authenticating user: %s\", user);\n}\n\nstartServer();\nconnectDatabase();\nauthenticateUser(\"alice\");\n\n// With DEBUG=app:server,app:db:\n// Starting server on port 3000\n// Server started in development mode\n// Connecting to database at localhost\n// Connection pool size: 10\n\n// With DEBUG=app:*:\n// All three namespaces are enabled\n\n// With DEBUG=app:*,-app:auth:\n// All app namespaces EXCEPT auth\n\n// The DEBUG env var controls the \"debug\" package:\n// - Namespaces with * wildcard\n// - Comma-separated namespaces\n// - Exclude with -namespace\n// - Colon-separated hierarchy (app:server:startup)",
      "description": "The DEBUG env var (used by the debug package) enables selective logging via namespaces. pattern: namespace:subnamespace. Supports wildcards (*), exclusions (-), and hierarchy. This is a widely used convention in the Node.js ecosystem for runtime-debuggable logging."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What type are all environment variable values in process.env?",
      "options": [
        "Number",
        "String",
        "Boolean",
        "Buffer"
      ],
      "answer": 1,
      "explanation": "All env var values are strings. Numbers and booleans must be explicitly parsed: parseInt(process.env.PORT, 10), process.env.DEBUG === \"true\"."
    },
    {
      "question": "What is the standard package for loading .env files?",
      "options": [
        "env-loader",
        "dotenv",
        "dotenv-expand",
        "config"
      ],
      "answer": 1,
      "explanation": "dotenv is the standard package. It loads .env file contents into process.env. Install: npm install dotenv. Use: require(\"dotenv\").config()."
    },
    {
      "question": "Which NODE_ENV value indicates production?",
      "options": [
        "\"prod\"",
        "\"production\"",
        "\"release\"",
        "\"live\""
      ],
      "answer": 1,
      "explanation": "The standard value is \"production\". Express and other frameworks check NODE_ENV === \"production\" to enable optimizations and disable debug output."
    },
    {
      "question": "How do you safely check a boolean environment variable?",
      "options": [
        "if (process.env.DEBUG)",
        "process.env.DEBUG === \"true\"",
        "Boolean(process.env.DEBUG)",
        "process.env.DEBUG == true"
      ],
      "answer": 1,
      "explanation": "env vars are strings. process.env.DEBUG === \"true\" is the correct check. Using truthy checks fails because \"false\" is truthy."
    },
    {
      "question": "What should you do with .env files in version control?",
      "options": [
        "Commit them with real values",
        "Add .env to .gitignore, commit .env.example",
        "Commit only .env.production",
        "Never use .env files"
      ],
      "answer": 1,
      "explanation": "Add .env to .gitignore to avoid leaking secrets. Commit .env.example with placeholder values to document required variables."
    },
    {
      "question": "How do you handle cross-platform env var setting in npm scripts?",
      "options": [
        "Use && on all platforms",
        "Use the cross-env package",
        "Use export command",
        "Set in the OS settings"
      ],
      "answer": 1,
      "explanation": "cross-env normalizes env var setting across platforms: \"cross-env NODE_ENV=production node app.js\". POSIX and Windows have different syntax for setting env vars."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-es-modules"] = {
  "title": "Node.js ES Modules",
  "difficulty": "advanced",
  "estimatedMinutes": 25,
  "tldr": [
    "ES Modules (ESM) are the JavaScript standard module system using import and export statements, supported natively since Node.js 12.",
    "ESM supports static analysis (tree shaking), top-level await, and stricter module semantics compared to CommonJS.",
    "Enable ESM via \"type\": \"module\" in package.json, .mjs extension, or --experimental-modules flag (legacy).",
    "ESM uses import.meta.url instead of __dirname/__filename, and import.meta.resolve() for module resolution."
  ],
  "laymanDefinition": "ES Modules are the modern, standardized way of organizing code that comes built into JavaScript itself (ECMAScript 2015). Think of CommonJS as a custom system that only Node.js understands, while ES Modules are the universal standard that browsers and Node.js both speak. With ES Modules, you say export to mark what you want to share and import to bring things in from other files. The big advantage is that tools can analyze your imports and exports without running your code (static analysis), which enables \"tree shaking\" - automatically removing unused code to make your app smaller. ES Modules also let you use await at the top level without wrapping in async functions.",
  "deepDive": [
    {
      "heading": "ESM Syntax and Semantics",
      "text": "import and export statements: (1) Named exports: export const name = \"value\"; export function fn() {}. (2) Default export: export default function() {}. (3) Named imports: import { name, fn } from \"./module.js\". (4) Default import: import whatever from \"./module.js\". (5) Mixed: import defaultExport, { named } from \"./module.js\". (6) Namespace: import * as mod from \"./module.js\". (7) Re-export: export { name } from \"./module.js\"; export * from \"./module.js\". (8) Import for side effects: import \"./polyfill.js\". ESM semantics: imports are live read-only bindings (not copies). Changes in the exporting module are reflected in the importing module. Imports are hoisted - they run before any other code in the module. ESM is always strict mode - no \"use strict\" needed. ESM modules are deferred - similar to script defer in browsers."
    },
    {
      "heading": "Enabling ESM and File Extensions",
      "text": "Three ways to enable ESM: (1) \"type\": \"module\" in package.json - all .js files in the package are ESM. (2) .mjs extension - always ESM regardless of package.json. (3) .cjs extension - force CommonJS regardless of package.json. Package scope: \"type\" applies to the package and its subdirectories (unless overridden by nested package.json). Mixing CJS and ESM: you can have both .cjs and .mjs files in the same package. .js files follow the closest package.json \"type\" field. The --input-type flag for eval/stdin: node --input-type=module -e \"import fs from 'fs'\". The --experimental-modules flag is no longer needed since Node 14. Node.js 18+ has full ESM support without any flags."
    },
    {
      "heading": "import.meta and Module Metadata",
      "text": "import.meta.url is the file URL of the current module: \"file:///path/to/module.js\". Convert to path: import.meta.url → fileURLToPath(import.meta.url). import.meta.resolve(specifier, parent) - resolves a module specifier (Node 20+). import.meta.dirname (Node 22+) - equivalent to __dirname in CJS. ESM equivalents to CJS globals: (1) __filename → fileURLToPath(import.meta.url). (2) __dirname → fileURLToPath(new URL(\".\", import.meta.url)). (3) require → use createRequire(import.meta.url) to create a CJS require function. (4) module, exports → not available in ESM. (5) __dirname polyfill: const __dirname = fileURLToPath(new URL(\".\", import.meta.url))."
    },
    {
      "heading": "ESM Module Resolution",
      "text": "ESM uses a different resolution algorithm from CJS: (1) Full specifiers required: import \"./module.js\" (extension required). (2) No automatic index.js resolution (must specify full path). (3) No directory imports: import \"./dir\" must be import \"./dir/index.js\". (4) Import maps: package.json \"imports\" and \"exports\" fields control resolution. (5) Data URLs: import \"data:text/javascript,export default 42\". (6) HTTPS imports: experimental network imports. (7) Self-referencing: package can import itself using its package name (if \"exports\" field is set). (8) Conditional exports: package.json \"exports\" field can provide different entry points for different environments (node, browser, default). (9) Subpath exports: \"./features/*\": \"./src/features/*.js\". (10) Pattern: \"exports\" replaces the traditional \"main\" field for ESM packages."
    },
    {
      "heading": "ESM vs CommonJS Comparison",
      "text": "(1) Loading: CJS sync, ESM async (supports top-level await). (2) Analysis: CJS runtime, ESM static (tree shaking). (3) Extension: CJS .js/.cjs, ESM .mjs/.js (with \"type\":\"module\"). (4) Resolution: CJS flexible (no extension required, index.js fallback), ESM strict (full specifiers, no automatic resolution). (5) Exports: CJS module.exports (value copy), ESM live bindings (exported values update live). (6) Circular deps: CJS partial exports, ESM live bindings (incomplete bindings for before evaluation). (7) Top-level await: CJS not supported, ESM supported. (8) Strict mode: CJS opt-in (\"use strict\"), ESM always strict. (9) this at top level: CJS = module.exports, ESM = undefined. (10) JSON modules: CJS require(\"./data.json\") works, ESM requires import assertions (Node 17+): import data from \"./data.json\" assert { type: \"json\" }."
    },
    {
      "heading": "Package Exports and Imports Fields",
      "text": "The package.json \"exports\" field controls how other packages import your ESM package: (1) Single entry: \"exports\": \"./index.js\". (2) Multiple entries: \"exports\": { \".\": \"./index.js\", \"./feature\": \"./feature.js\" }. (3) Conditional: \"exports\": { \".\": { \"import\": \"./esm/index.js\", \"require\": \"./cjs/index.cjs\" } }. (4) Subpath patterns: \"./utils/*\": \"./src/utils/*.js\". (5) The \"imports\" field controls internal package imports (private modules): \"imports\": { \"#utils\": \"./src/utils.js\" }. Usage: import \"#utils\" from within the package. These fields are part of the Node.js resolution algorithm for ESM and supersede the \"main\" field for modules that use \"exports\". The \"exports\" field also prevents users from importing internal files that are not explicitly exported (encapsulation)."
    }
  ],
  "interviewAnswer": "ES Modules use import/export and are the JavaScript standard. Enable via \"type\":\"module\" in package.json or .mjs extension. Key differences from CommonJS: ESM is async (supports top-level await), uses static analysis (tree shaking), requires full specifiers (import \"./file.js\", not \"./file\"), no automatic index.js resolution, use import.meta.url instead of __dirname. ESM live bindings - exports update in real-time. Package \"exports\" field controls entry points and encapsulation. CJS interop: CJS can import ESM via dynamic import(), ESM can import CJS modules (default export only). import assertions for JSON: import data from \"./data.json\" assert { type: \"json\" }.",
  "interviewQuestions": [
    {
      "question": "How do you enable ES Modules in Node.js?",
      "answer": "(1) \"type\": \"module\" in package.json (makes all .js files ESM in that package). (2) .mjs extension (always ESM). (3) .cjs extension (always CJS, overrides \"type\"). (4) --input-type=module for eval. Node 14+ supports ESM without flags."
    },
    {
      "question": "What is the difference between ESM and CJS exports?",
      "answer": "CJS: module.exports is a value (copy). ESM: exports are live bindings - changes in the exporting module are reflected in importing modules. ESM supports named exports, default exports, and re-exports. ESM exports are static (analyzed at parse time)."
    },
    {
      "question": "What is import.meta.url and how do you get __dirname in ESM?",
      "answer": "import.meta.url is the file URL (file:///path/to/module.js). Convert to path: const __dirname = fileURLToPath(new URL(\".\", import.meta.url)); or const __filename = fileURLToPath(import.meta.url);"
    },
    {
      "question": "How does ESM module resolution differ from CJS?",
      "answer": "ESM requires full specifiers: import \"./module.js\" (extension required). No automatic index.js resolution. No directory imports. Supports import maps and package.json \"exports\"/\"imports\" fields. Uses URL-based resolution (file://)."
    },
    {
      "question": "What are live bindings in ESM?",
      "answer": "exported values are bound to the original variable. If a module exports let count = 0 and later sets count = 1, importing modules see the updated value. Unlike CJS module.exports which returns a copy, ESM imports are live connections."
    },
    {
      "question": "How does ESM interop with CommonJS?",
      "answer": "ESM can import CJS modules: import fs from \"fs\" (CJS default export). ESM can also use named imports from CJS modules that Node.js can statically analyze. CJS can import ESM using dynamic import(): const mod = await import(\"./esm.mjs\"). CJS cannot require() ESM."
    },
    {
      "question": "What is the \"exports\" field in package.json?",
      "answer": "Controls entry points for your package. Restricts what files can be imported from your package. Supports conditional exports (different files for import vs require). Example: { \".\": { \"import\": \"./esm/index.js\", \"require\": \"./cjs/index.cjs\" } }."
    },
    {
      "question": "What is top-level await in ESM?",
      "answer": "The await keyword can be used at the top level of ESM modules without wrapping in an async function. This blocks the module's execution but does not block sibling modules. Top-level await is only available in ESM, not CJS."
    },
    {
      "question": "How do you import JSON in ESM?",
      "answer": "import data from \"./data.json\" assert { type: \"json\" } (Node 17+). The assert syntax validates the module type. Without the assert, Node.js throws an error. CJS require(\"./data.json\") works without assertions."
    },
    {
      "question": "What is the difference between export and export default?",
      "answer": "Named exports: export const name = \"value\". Import: import { name }. Multiple named exports per module. Default export: export default function() {}. Import: import anyName. One default export per module. Named exports are statically analyzable; default exports are less so for tree shaking."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">ES Modules in Node.js</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">import / export</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Standard JS syntax</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">import.meta.url</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Module URL metadata</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">\"type\": \"module\"</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">package.json config</text></svg>",
  "codeExamples": [
    {
      "title": "Basic ESM Import/Export Syntax",
      "useCase": "Working with named and default exports",
      "code": "// File: math.mjs\nexport const PI = 3.14159;\n\nexport function add(a, b) {\n  return a + b;\n}\n\nexport function subtract(a, b) {\n  return a - b;\n}\n\nexport default {\n  multiply: function(a, b) { return a * b; },\n  divide: function(a, b) { return a / b; }\n};\n\n// File: app.mjs\nimport utils, { PI, add, subtract } from \"./math.mjs\";\n\nconsole.log(\"PI:\", PI);\nconsole.log(\"Add:\", add(2, 3));\nconsole.log(\"Subtract:\", subtract(5, 2));\nconsole.log(\"Multiply:\", utils.multiply(3, 4));\n\n// Alternative import styles:\n// import * as math from \"./math.mjs\";\n// math.add(2, 3), math.default.multiply(3, 4)\n\n// Live bindings demonstration:\nexport let counter = 0;\nexport function increment() { counter++; }\n\n// In importing module:\n// import { counter, increment } from \"./app.mjs\";\n// console.log(counter); // 0\n// increment();\n// console.log(counter); // 1 (live binding!)",
      "description": "ESM supports named exports (export const/function) and default exports (export default). Imports use {} for named selections. Live bindings mean exported values update in real-time in importing modules. Use .mjs extension for explicit ESM."
    },
    {
      "title": "ESM Module Resolution and Package Exports",
      "useCase": "Using package.json exports for clean APIs",
      "code": "// package.json\n{\n  \"type\": \"module\",\n  \"exports\": {\n    \".\": {\n      \"import\": \"./src/index.js\",\n      \"require\": \"./dist/index.cjs\"\n    },\n    \"./utils\": {\n      \"import\": \"./src/utils.js\",\n      \"require\": \"./dist/utils.cjs\"\n    },\n    \"./internal/*\": null  // Block direct access\n  }\n}\n\n// Users can import:\nimport myLib from \"my-lib\";\nimport { helper } from \"my-lib/utils\";\n\n// Cannot import internal files:\n// import internals from \"my-lib/internal/secret.js\"; // Error!\n\n// Self-referencing: package can import itself\n// In package \"my-lib\":\n// import { helper } from \"my-lib/utils\";\n\n// Internal imports with \"imports\" field:\n// package.json:\n// \"imports\": {\n//   \"#helpers\": \"./src/helpers.js\"\n// }\n\n// In module code:\n// import { format } from \"#helpers\";\n\n// Conditional exports with environments:\n// \"exports\": {\n//   \".\": {\n//     \"node\": \"./node-build.js\",\n//     \"browser\": \"./browser-build.js\",\n//     \"default\": \"./default-build.js\"\n//   }\n// }",
      "description": "The \"exports\" field provides controlled entry points and conditional exports (different files for import vs require, or different environments). The \"imports\" field enables internal package aliases. Self-referencing allows a package to import itself."
    },
    {
      "title": "ESM with Top-Level Await",
      "useCase": "Use await at the module level without async functions",
      "code": "// config.mjs\nimport { readFile } from \"fs/promises\";\nimport { fileURLToPath } from \"url\";\nimport { dirname, join } from \"path\";\n\nconst __dirname = dirname(fileURLToPath(import.meta.url));\n\n// Top-level await: no async wrapper needed!\nconst config = JSON.parse(\n  await readFile(join(__dirname, \"config.json\"), \"utf8\")\n);\n\nexport default config;\n\n// app.mjs\nimport config from \"./config.mjs\";\n\n// config is already loaded before this runs\nconsole.log(\"Server port:\", config.port);\nconsole.log(\"Database:\", config.database.host);\n\n// Multiple top-level awaits run in order\nconst data1 = await fetch(\"https://api.example.com/data1\");\nconst data2 = await fetch(\"https://api.example.com/data2\");\n\n// Parallel top-level awaits:\nconst [a, b] = await Promise.all([\n  fetch(\"https://api.example.com/a\"),\n  fetch(\"https://api.example.com/b\")\n]);\n\nexport { data1, data2, a, b };",
      "description": "Top-level await blocks the module's execution but not sibling modules (they can evaluate in parallel). This enables configuration loading, data fetching, and database connections at module level without async function wrappers."
    },
    {
      "title": "ESM Live Bindings in Action",
      "useCase": "Demonstrate how ESM exports update in real-time",
      "code": "// live.mjs\nexport let value = 1;\n\nexport function increment() {\n  value++;\n}\n\nexport function setValue(v) {\n  value = v;\n}\n\n// In the same module, schedule an update\nsetTimeout(function() {\n  value = 100;\n}, 100);\n\n// importer.mjs\nimport { value, increment, setValue } from \"./live.mjs\";\n\nconsole.log(\"Initial:\", value); // 1\n\nincrement();\nconsole.log(\"After increment:\", value); // 2 (live!)\n\nsetValue(42);\nconsole.log(\"After setValue:\", value); // 42\n\n// Wait for the setTimeout to fire\nsetTimeout(function() {\n  console.log(\"After module timeout:\", value); // 100\n}, 200);\n\n// Compare with CJS:\n// In CJS, module.exports copies the value, so\n// changes to module-level variables after export are NOT reflected.\n// ESM live bindings always reflect the current value.",
      "description": "ESM live bindings: importing modules see changes to exported variables in real-time. This differs from CJS where module.exports returns a copy. Live bindings are particularly important for patterns like counters, state managers, and reactive exports."
    },
    {
      "title": "Creating require() in ESM for Interop",
      "useCase": "Use createRequire to load CJS modules in ESM",
      "code": "// esm-app.mjs\nimport { createRequire } from \"module\";\nimport { fileURLToPath } from \"url\";\nimport { dirname } from \"path\";\n\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = dirname(__filename);\n\n// Create a CJS require function in ESM\nconst require = createRequire(import.meta.url);\n\n// Now we can require CJS modules\nconst fs = require(\"fs\");\nconst lodash = require(\"lodash\");\nconst pkg = require(\"./package.json\");\n\nconsole.log(\"App name:\", pkg.name);\nconsole.log(\"Lodash version:\", lodash.VERSION);\n\n// Also use proper ESM imports for ESM packages\nimport { readFile } from \"fs/promises\";\n\n// Dynamic import() for ESM modules from CJS-compatible code\nasync function loadESM() {\n  const chalk = await import(\"chalk\");\n  console.log(chalk.default.green(\"ESM module loaded!\"));\n}\n\nloadESM();\n\n// Export both ESM and CJS compatible\nexport const greeting = \"Hello from ESM\";\n\n// Also set module.exports for CJS require()\nmodule.exports = { greeting }; // This works via createRequire",
      "description": "createRequire(import.meta.url) creates a CJS require function in ESM modules. This bridge enables gradual migration from CJS to ESM. Dynamic import() loads ESM modules from CJS. Use both patterns during migration before fully switching."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How do you enable ES Modules for .js files?",
      "options": [
        "Use .mjs extension",
        "Add \"type\": \"module\" to package.json",
        "Use --esm flag",
        "Both A and B"
      ],
      "answer": 3,
      "explanation": "Either \"type\":\"module\" in package.json or .mjs extension. .cjs forces CJS regardless of \"type\"."
    },
    {
      "question": "What syntax is required for ESM file imports?",
      "options": [
        "import \"./module\"",
        "import \"./module.js\"",
        "const mod = require(\"./module\")",
        "import mod from \"./module\""
      ],
      "answer": 1,
      "explanation": "ESM requires full specifiers including extensions: import \"./module.js\". No automatic index.js resolution."
    },
    {
      "question": "What does import.meta.url provide?",
      "options": [
        "The module's directory",
        "The file:// URL of the module",
        "The version of Node.js",
        "The module's exports"
      ],
      "answer": 1,
      "explanation": "import.meta.url is a string like \"file:///path/to/module.js\". Use fileURLToPath() to convert to a regular path."
    },
    {
      "question": "What are live bindings in ESM?",
      "options": [
        "Exports are copied by value",
        "Exports update in real-time in importing modules",
        "Exports are immutable",
        "Exports are lazy-loaded"
      ],
      "answer": 1,
      "explanation": "ESM exports are live connections to the exported variable. Changes in the exporting module are immediately visible in importing modules."
    },
    {
      "question": "Can CommonJS require() an ES Module?",
      "options": [
        "Yes, with require(\"./module.mjs\")",
        "No, require() is sync but ESM is async",
        "Only with --experimental-modules",
        "Only if the ESM has a default export"
      ],
      "answer": 1,
      "explanation": "CJS cannot require() ESM because require is synchronous while ESM loading is asynchronous. Use dynamic import() instead."
    },
    {
      "question": "How does the \"exports\" field benefit package authors?",
      "options": [
        "It increases performance",
        "It restricts which files can be imported, providing encapsulation",
        "It enables tree shaking",
        "It reduces bundle size"
      ],
      "answer": 1,
      "explanation": "The \"exports\" field controls the public API of a package. Only files explicitly listed in \"exports\" can be imported from outside the package, preventing users from accessing internal implementation details."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-event-driven-architecture"] = {
  "title": "Node.js Event Driven Architecture",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Node.js uses an event-driven architecture where the flow is determined by events such as user actions, messages, or sensor outputs.",
    "The EventEmitter class is the core pattern: objects emit named events that trigger listeners (callback functions).",
    "This architecture enables non-blocking I/O: instead of waiting for an operation to complete, Node.js registers a callback and continues processing other events.",
    "The event-driven pattern decouples event producers from consumers, making the system modular and extensible."
  ],
  "laymanDefinition": "Event-driven architecture in Node.js is like a busy restaurant kitchen. The chef (event loop) handles orders (events) as they come in. When an order needs a specific preparation step (like grilling), the chef delegates it to a station (libuv thread pool) and moves on to the next order. When the station finishes, it rings a bell (callback) to notify the chef. The chef does not wait around for each step to finish - they keep working on other tasks. This is why Node.js can handle thousands of \"orders\" simultaneously without getting overwhelmed.",
  "deepDive": [
    {
      "heading": "The EventEmitter Pattern",
      "text": "EventEmitter is a core Node.js class in the events module. It provides: (1) emitter.on(eventName, listener) - register a listener for a named event. (2) emitter.emit(eventName, ...args) - emit an event, triggering all registered listeners synchronously. (3) emitter.once(eventName, listener) - register a one-time listener that removes itself after first invocation. (4) emitter.removeListener(eventName, listener) / emitter.off() - remove a specific listener. (5) emitter.removeAllListeners(eventName) - remove all listeners for an event. (6) emitter.listenerCount(eventName) - count listeners. (7) emitter.setMaxListeners(n) - change the default max listener warning (default 10). Built-in Node.js modules like Stream, http.Server, and process inherit from EventEmitter. The pattern enables loose coupling: the emitter does not need to know what listeners are registered or what they do."
    },
    {
      "heading": "Synchronous vs Asynchronous Event Emission",
      "text": "EventEmitter.emit() calls listeners synchronously in the order they were registered. This is important: if a listener throws an error, uncaught listeners after it do NOT execute. For async events, the listener should perform async work and handle its own errors. The \"error\" event is special: if emitted and no listener is registered, Node.js throws the error and crashes the process. Always register an \"error\" listener on EventEmitters. The newListener and removeListener events are emitted when listeners are added/removed. EventEmitter.setMaxListeners() warns about potential memory leaks when more than 10 listeners are registered for an event."
    },
    {
      "heading": "Custom Event Emitters and Inheritance",
      "text": "Create custom event emitters by inheriting from EventEmitter: (1) Using ES6 class: class MyEmitter extends EventEmitter {}. (2) Using util.inherits() (legacy): util.inherits(MyEmitter, EventEmitter). (3) Using Object.create or factory functions. Best practices: (1) Document the events a custom emitter can emit. (2) Use string constants for event names to avoid typos. (3) Always emit \"error\" events with an Error object (not a string). (4) Consider backpressure - if listeners are slower than emits, events can pile up. (5) Use eventNames() to list all registered event names. (6) Use rawListeners() to get copies of listener arrays."
    },
    {
      "heading": "Event-Driven Patterns in Node.js Core",
      "text": "Node.js core modules use the event-driven pattern extensively: (1) http.Server emits \"request\", \"connection\", \"close\", \"error\", \"upgrade\", \"checkContinue\". (2) Streams emit \"data\", \"end\", \"close\", \"error\", \"pause\", \"resume\", \"drain\", \"finish\", \"pipe\", \"unpipe\". (3) process emits \"exit\", \"uncaughtException\", \"unhandledRejection\", \"beforeExit\", \"SIGINT\", \"SIGTERM\". (4) child_process emits \"message\", \"error\", \"close\", \"exit\", \"disconnect\". (5) fs.FSWatcher emits \"change\", \"error\". The event-driven architecture enables the observer pattern at the application level: you can create your own event buses, pub/sub systems, or message brokers using EventEmitter as the foundation."
    },
    {
      "heading": "Memory Leak Prevention and Performance",
      "text": "Common pitfalls: (1) Forgetting to remove listeners causes memory leaks - the emitter holds references to listener functions, preventing garbage collection. (2) Using anonymous arrow functions as listeners prevents removal (you have no reference to remove). Solution: store references to listener functions. (3) Emitting too many events per second (100k+) can overwhelm listeners - use throttling or batching. (4) Synchronous listeners block the event loop - keep listener logic lightweight or defer heavy work. (5) MaxListeners warning (default 10) does not limit listeners but warns about potential leaks. (6) Use emitter.once() for one-time events - the listener auto-removes after invocation. (7) Use AbortController with addEventListener (Node 16+) for modern listener management."
    }
  ],
  "interviewAnswer": "Node.js uses an event-driven architecture centered on the EventEmitter class. Objects emit named events, and registered listener functions handle them. The pattern is synchronous by default: emit() calls listeners in order. EventEmitter enables loose coupling between event producers and consumers. Built-in Node.js modules (Stream, http, process) inherit from EventEmitter. Key patterns: on() for persistent listeners, once() for one-time, emit() to trigger events. \"error\" events without a listener crash the process. Memory leaks occur when listeners are not removed. Use emitter.setMaxListeners() to adjust warnings. Custom event emitters extend EventEmitter via class inheritance or util.inherits().",
  "interviewQuestions": [
    {
      "question": "What is EventEmitter and how does it work?",
      "answer": "EventEmitter is a Node.js class that implements the observer pattern. It maintains a map of event names to arrays of listener functions. When emit(eventName) is called, all registered listeners for that event are invoked synchronously in registration order."
    },
    {
      "question": "How does error handling work in EventEmitter?",
      "answer": "The \"error\" event is special. If an \"error\" event is emitted and no listener is registered, Node.js throws the error and crashes the process. Always register an \"error\" listener: emitter.on(\"error\", (err) => console.error(err))."
    },
    {
      "question": "What is the difference between on() and once()?",
      "answer": "on() registers a persistent listener that fires every time the event is emitted. once() registers a one-time listener that auto-removes after its first invocation. once() internally calls on() and then removeListener() after execution."
    },
    {
      "question": "What happens if a listener throws an error?",
      "answer": "If a synchronous listener throws, subsequent listeners for the same event do not execute. The error propagates to the \"error\" event. If no \"error\" listener is registered, the process crashes. Always wrap listener code in try-catch or use async error handling."
    },
    {
      "question": "What is the default max listener warning threshold?",
      "answer": "10 listeners per event. This is a WARNING, not a limit. It alerts you to potential memory leaks where listeners are being added repeatedly without removal. Change it with emitter.setMaxListeners(n) or global setting: require(\"events\").EventEmitter.defaultMaxListeners = n."
    },
    {
      "question": "How do you avoid memory leaks with EventEmitter?",
      "answer": "(1) Always remove listeners when they are no longer needed using removeListener() or off(). (2) Use once() for one-time events. (3) Store references to listener functions (avoid anonymous arrow functions if removal is needed). (4) Use AbortController for modern listener lifecycle management. (5) Monitor listenerCount() for suspicious growth."
    },
    {
      "question": "What is the newListener and removeListener event?",
      "answer": "EventEmitter emits \"newListener\" when a listener is added, and \"removeListener\" when a listener is removed. These can be used for debugging, logging, or implementing custom behavior when the listener list changes."
    },
    {
      "question": "How do you inherit from EventEmitter?",
      "answer": "Class syntax: class MyEmitter extends EventEmitter {}. Legacy: util.inherits(MyEmitter, EventEmitter). Factory: Object.create(EventEmitter.prototype). The custom class can then use this.emit() and this.on() for internal events."
    },
    {
      "question": "What Node.js core modules use EventEmitter?",
      "answer": "http.Server (request, connection), Stream (data, end, error), process (exit, uncaughtException), child_process (message, exit, close), fs.FSWatcher (change, error), readline (line, close). Most async Node.js APIs are built on EventEmitter."
    },
    {
      "question": "How do you list all registered event listeners?",
      "answer": "emitter.eventNames() returns an array of event names with listeners. emitter.listeners(eventName) returns a copy of the listener array. emitter.rawListeners(eventName) returns a copy including wrappers (like once() wrappers)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Event-Driven Architecture</text><rect x=\"30\" y=\"55\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"110\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Event Source</text><text x=\"110\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Emits events via emit()</text><line x1=\"110\" y1=\"100\" x2=\"110\" y2=\"120\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"120\" width=\"160\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"110\" y=\"135\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">EventEmitter</text><text x=\"110\" y=\"152\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Routes events to listeners</text><line x1=\"110\" y1=\"160\" x2=\"50\" y2=\"180\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"110\" y1=\"160\" x2=\"170\" y2=\"180\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"110\" y1=\"160\" x2=\"110\" y2=\"200\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"20\" y=\"180\" width=\"60\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"50\" y=\"197.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Listener 1</text><text x=\"50\" y=\"214.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">on() registered</text><rect x=\"80\" y=\"180\" width=\"60\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"110\" y=\"197.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Listener 2</text><text x=\"110\" y=\"214.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">on() or once()</text><rect x=\"140\" y=\"180\" width=\"60\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"170\" y=\"197.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Listener N</text><text x=\"170\" y=\"214.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Any number</text><text x=\"225\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">User action, data arrival, timer</text><text x=\"225\" y=\"138\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Synchronous invocation</text><text x=\"225\" y=\"200\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Handlers run in registration order</text></svg>",
  "codeExamples": [
    {
      "title": "Basic EventEmitter Usage",
      "useCase": "Register listeners and emit events",
      "code": "var EventEmitter = require(\"events\");\nvar myEmitter = new EventEmitter();\n\nmyEmitter.on(\"greet\", function(name) {\n  console.log(\"Hello, \" + name + \"!\");\n});\n\nmyEmitter.on(\"greet\", function(name) {\n  console.log(\"Welcome to Node.js, \" + name);\n});\n\nmyEmitter.emit(\"greet\", \"Alice\");\n// Hello, Alice!\n// Welcome to Node.js, Alice",
      "description": "EventEmitter registers listeners with on() and triggers them with emit(). Listeners execute synchronously in registration order. Both listeners fire for the single emit() call."
    },
    {
      "title": "Custom EventEmitter with Error Handling",
      "useCase": "Build a download manager with proper error handling",
      "code": "var EventEmitter = require(\"events\");\n\nfunction Downloader() {\n  EventEmitter.call(this);\n}\nDownloader.prototype = Object.create(EventEmitter.prototype);\n\nDownloader.prototype.download = function(url) {\n  var self = this;\n  self.emit(\"start\", url);\n\n  setTimeout(function() {\n    if (!url) {\n      self.emit(\"error\", new Error(\"URL is required\"));\n      return;\n    }\n    self.emit(\"progress\", { url: url, pct: 50 });\n    setTimeout(function() {\n      self.emit(\"complete\", { url: url, data: \"file content\" });\n    }, 500);\n  }, 500);\n};\n\nvar dl = new Downloader();\ndl.on(\"start\", function(u) { console.log(\"Starting:\", u); });\ndl.on(\"progress\", function(p) { console.log(p.pct + \"% done\"); });\ndl.on(\"complete\", function(r) { console.log(\"Done:\", r.data); });\ndl.on(\"error\", function(err) { console.error(\"Error:\", err.message); });\n\ndl.download(\"https://example.com/file.zip\");",
      "description": "The custom Downloader class inherits from EventEmitter. It emits lifecycle events (start, progress, complete, error). The error event is handled with a dedicated listener, preventing process crash. Each stage of the download emits appropriate events."
    },
    {
      "title": "Memory Leak Detection with Listener Count",
      "useCase": "Monitor and prevent listener leaks",
      "code": "var EventEmitter = require(\"events\");\nvar emitter = new EventEmitter();\n\n// Simulate accidental listener leak\nsetInterval(function() {\n  emitter.on(\"data\", function() {\n    // This anonymous function cannot be removed later\n  });\n  var count = emitter.listenerCount(\"data\");\n  if (count > 10) {\n    console.warn(\"Warning: \" + count + \" listeners on data event\");\n  }\n  if (count > 20) {\n    console.error(\"Leak detected! Removing all listeners.\");\n    emitter.removeAllListeners(\"data\");\n  }\n}, 1000);\n\n// Proper pattern: store listener reference\nvar handler = function() { /* handle data */ };\nemitter.on(\"data\", handler);\n// Later: emitter.removeListener(\"data\", handler);\n\n// Check if emitter has listeners\nconsole.log(\"Has listeners:\", emitter.emit(\"data\") ? \"yes\" : \"no\");",
      "description": "The emit() method returns true if there were listeners for the event, false otherwise. Monitoring listenerCount() helps detect leaks early. Storing listener references allows proper cleanup."
    },
    {
      "title": "Building a Pub/Sub Event Bus",
      "useCase": "Create a publish-subscribe system with EventEmitter",
      "code": "var EventEmitter = require(\"events\");\n\nvar eventBus = new EventEmitter();\neventBus.setMaxListeners(100);\n\n// Publisher\nfunction publish(event, data) {\n  console.log(\"Publishing:\", event);\n  eventBus.emit(event, data);\n}\n\n// Subscriber\nfunction subscribe(event, handler) {\n  eventBus.on(event, handler);\n  return function unsubscribe() {\n    eventBus.off(event, handler);\n  };\n}\n\nvar unsub = subscribe(\"order:created\", function(order) {\n  console.log(\"New order: \" + order.id);\n  // Send email, update inventory, charge card\n});\n\npublish(\"order:created\", { id: 123, item: \"Widget\", qty: 2 });\n\n// Later: unsubscribe\nunsub();\n\npublish(\"order:created\", { id: 124, item: \"Gadget\", qty: 1 });\n// This does not trigger the first handler (unsubscribed)",
      "description": "The event bus pattern decouples publishers from subscribers. Each subscribe() returns an unsubscribe function for clean removal. setMaxListeners(100) increases the warning threshold for this bus with many subscribers."
    },
    {
      "title": "EventEmitter with Async Listeners",
      "useCase": "Handle async operations in event listeners",
      "code": "var EventEmitter = require(\"events\");\nvar emitter = new EventEmitter();\n\nemitter.on(\"process\", async function(item) {\n  try {\n    var result = await processItem(item);\n    emitter.emit(\"processed\", result);\n  } catch (err) {\n    emitter.emit(\"error\", err);\n  }\n});\n\n// Multiple listeners for same event\nemitter.on(\"processed\", function(result) {\n  console.log(\"Log: processed \" + result.id);\n});\n\nemitter.on(\"processed\", function(result) {\n  // Update cache\n  cache.set(result.id, result);\n});\n\n// Simulate async processing\nfunction processItem(item) {\n  return new Promise(function(resolve) {\n    setTimeout(function() {\n      resolve({ id: item.id, status: \"done\" });\n    }, 100);\n  });\n}\n\nemitter.emit(\"process\", { id: 1 });",
      "description": "Async listeners work but must handle their own errors (the emitter cannot catch rejections from async listeners). Each async listener independently processes and emits completion events. Multiple listeners for \"processed\" run in parallel."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does EventEmitter.emit() do?",
      "options": [
        "Creates a new event",
        "Triggers all listeners for the named event synchronously",
        "Removes all listeners",
        "Registers a new listener"
      ],
      "answer": 1,
      "explanation": "emit() calls all registered listeners for the event name synchronously in registration order."
    },
    {
      "question": "What happens if an \"error\" event has no listener?",
      "options": [
        "The event is ignored",
        "Node.js throws the error and crashes the process",
        "It is automatically retried",
        "The error is logged"
      ],
      "answer": 1,
      "explanation": "An \"error\" event without a listener causes Node.js to throw the error, which crashes the process if unhandled."
    },
    {
      "question": "What does once() do differently from on()?",
      "options": [
        "Runs listeners in reverse order",
        "Auto-removes the listener after first invocation",
        "Runs listeners asynchronously",
        "Limits to one listener total"
      ],
      "answer": 1,
      "explanation": "once() registers a listener that fires once and then removes itself. It is equivalent to on() followed by removeListener() inside the handler."
    },
    {
      "question": "What is the default maxListeners warning threshold?",
      "options": [
        "5",
        "10",
        "25",
        "Unlimited"
      ],
      "answer": 1,
      "explanation": "Default is 10. Set with emitter.setMaxListeners(n). The warning alerts about potential memory leaks, not a hard limit."
    },
    {
      "question": "How do you inherit from EventEmitter?",
      "options": [
        "class MyEmitter extends EventEmitter {}",
        "Object.create(emitter)",
        "EventEmitter.inherit(MyEmitter)",
        "new EventEmitter(MyEmitter)"
      ],
      "answer": 0,
      "explanation": "ES6: class MyEmitter extends EventEmitter {}. Legacy: util.inherits(MyEmitter, EventEmitter)."
    },
    {
      "question": "What does emitter.eventNames() return?",
      "options": [
        "Number of listeners",
        "Array of event names with registered listeners",
        "The last emitted event",
        "List of emitter properties"
      ],
      "answer": 1,
      "explanation": "eventNames() returns an array of strings of event names that currently have listeners registered."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-event-loop"] = {
  "title": "Node.js Event Loop",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "The event loop is the mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel when possible.",
    "It operates in six phases: timers, pending callbacks, idle/prepare, poll, check, and close callbacks.",
    "process.nextTick() and Promise callbacks are handled in special microtask queues between each phase.",
    "Understanding the event loop is critical for debugging performance issues, ordering, and preventing callback starvation."
  ],
  "laymanDefinition": "The event loop is like a busy airport control tower that coordinates all incoming and outgoing flights. The controller (event loop) continuously checks: \"Are there any planes waiting to land? (timers), Any messages from other towers? (callbacks), Any fuel requests? (check).\" Between each check, the controller handles urgent radio messages (nextTick) and runway status updates (Promise resolutions) because these are time-sensitive. The controller NEVER goes to sleep - they keep cycling through the checklist, handling each type of task in order. This constant cycling ensures every task gets attention within a predictable timeframe.",
  "deepDive": [
    {
      "heading": "Event Loop Phases Overview",
      "text": "The event loop has six phases, each with its own queue: (1) Timers - executes callbacks from setTimeout() and setInterval(). The timer specifies a minimum threshold, not a guaranteed execution time. (2) Pending callbacks - executes I/O callbacks deferred to the next loop iteration. (3) Idle/Prepare - internal use by libuv. (4) Poll - retrieves new I/O events, executes I/O callbacks (almost all callbacks except timers, close, and setImmediate). If the poll queue is empty, the loop checks for setImmediate callbacks or waits for new I/O events. (5) Check - setImmediate() callbacks execute here. (6) Close callbacks - close event callbacks (socket.on(\"close\")). The loop cycles through phases in order, and a phase runs until its queue is empty or a maximum number of callbacks is processed."
    },
    {
      "heading": "Microtasks: process.nextTick() and Promise Callbacks",
      "text": "Microtasks are not part of any event loop phase. They are processed between each phase and between each callback within a phase. process.nextTick() has higher priority than Promise callbacks. The nextTick queue is processed in its entirety at each interrupt point before moving to the Promise microtask queue. This means process.nextTick() can starve the event loop if called recursively (nextTick recursion prevents the loop from reaching the poll phase). Promises (and queueMicrotask()) are processed after nextTick but before the next phase. The event loop will not proceed to the next phase until both microtask queues are empty. This is why Promise.resolve().then() runs before setTimeout(fn, 0) - the Promise microtask is processed in the nextTick/microtask checkpoint between timer callbacks."
    },
    {
      "heading": "setTimeout(fn, 0) vs setImmediate() vs process.nextTick()",
      "text": "These three defer execution but at different priorities: (1) process.nextTick() - highest priority, runs before the next event loop phase. Executes after the current operation but before any I/O. (2) Promise.then() - runs after nextTick but before the next phase. (3) setImmediate() - runs in the \"check\" phase of the NEXT iteration, after the poll phase. (4) setTimeout(fn, 0) - runs in the \"timers\" phase of the next iteration. In practice: setImmediate() fires before setTimeout(fn, 0) in I/O callbacks (because the check phase comes after poll). Outside I/O callbacks, the order is non-deterministic (depends on loop startup). Always use setImmediate() when you mean \"run as soon as possible after I/O callbacks\". Use process.nextTick() sparingly - it can starve the event loop."
    },
    {
      "heading": "The Poll Phase and I/O Callbacks",
      "text": "The poll phase is the most important phase. It: (1) Calculates how long to block and wait for new I/O events. If there are setImmediate() callbacks scheduled, it does NOT block (moves to check phase). If there are timer callbacks ready, it calculates the time until the earliest timer and blocks for that duration. (2) Processes events in the poll queue (I/O callbacks) one by one. (3) If the queue is empty, checks for setImmediate() callbacks (go to check phase), or timer callbacks (go to timers phase), or blocks waiting for new events. The poll phase is where most application code runs - all I/O callbacks (file reads, network requests, database queries) execute here. Blocking the poll phase with CPU-intensive work prevents new I/O from being processed."
    },
    {
      "heading": "Event Loop Blocking and Starvation",
      "text": "When the event loop is blocked, all phases stall: (1) CPU-intensive operations block the loop - synchronous loops, large JSON.parse, heavy crypto operations. (2) Nested process.nextTick() calls starve the loop - the loop never reaches the poll phase. (3) Long-running timer callbacks delay subsequent timers. (4) Recursive synchronous operations without setImmediate() or nextTick() break the loop. Detection: use setTimeout() with a large delay to measure actual vs expected delay. Solution: (1) Offload CPU work to Worker Threads. (2) Break large operations with setImmediate() or nextTick(). (3) Use async iteration for large arrays. (4) Monitor with process.hrtime() or performance.now(). (5) Use --prof flag for event loop profiling."
    }
  ],
  "interviewAnswer": "The event loop has six phases: timers, pending callbacks, idle/prepare, poll, check, close callbacks. Microtasks (nextTick, Promise callbacks) run between phases. process.nextTick() has highest priority, then Promise.then(), then the next phase. setImmediate() runs in the check phase (after poll). setTimeout(fn, 0) runs in the timers phase (before poll). The poll phase processes I/O callbacks and is where most app code executes. Blocking the poll phase with CPU work stalls the loop. Microtask recursion (nextTick inside nextTick) starves the loop. Always use setImmediate() over nextTick() for deferring work.",
  "interviewQuestions": [
    {
      "question": "What are the six phases of the Node.js event loop?",
      "answer": "(1) Timers - setTimeout/setInterval. (2) Pending callbacks - I/O callbacks deferred. (3) Idle/Prepare - internal. (4) Poll - I/O callbacks. (5) Check - setImmediate. (6) Close callbacks - socket.on(\"close\")."
    },
    {
      "question": "What is the difference between process.nextTick() and setImmediate()?",
      "answer": "process.nextTick() runs before the next event loop phase (highest priority microtask). setImmediate() runs in the check phase, after the poll phase, on the next iteration. Use setImmediate() for deferring work; use nextTick() sparingly."
    },
    {
      "question": "What order do timers and setImmediate execute in an I/O callback?",
      "answer": "In an I/O callback: setImmediate() fires BEFORE setTimeout(fn, 0). The check phase (setImmediate) comes right after the poll phase (where I/O callbacks run). Timers fire in the next iteration's timers phase."
    },
    {
      "question": "What is the poll phase and what happens there?",
      "answer": "The poll phase retrieves new I/O events and executes I/O callbacks. It can block waiting for events if no timers or setImmediate callbacks are pending. This is where file reads, network requests, and database operations execute their callbacks."
    },
    {
      "question": "How can process.nextTick() starve the event loop?",
      "answer": "If nextTick() is called recursively (a nextTick schedules another nextTick), the microtask queue never empties. Since microtasks are processed before the next phase, the event loop never reaches the poll phase to process I/O, effectively starving all I/O operations."
    },
    {
      "question": "What is the relationship between Promises and process.nextTick()?",
      "answer": "Both are microtasks. process.nextTick() has higher priority and runs before Promise callbacks. The event loop processes the entire nextTick queue, then the entire Promise microtask queue, before moving to the next event loop phase."
    },
    {
      "question": "Why is setTimeout(fn, 0) not exactly 0ms?",
      "answer": "The minimum delay is 1ms (clamped by libuv/timers). Even with 0ms, the callback fires only after the event loop reaches the timers phase, which may be delayed by other phases. It is a minimum threshold, not a guaranteed execution time."
    },
    {
      "question": "How does libuv determine how long to block in the poll phase?",
      "answer": "If there are setImmediate() callbacks, poll does not block. If there are timer callbacks ready, poll calculates the earliest timer and blocks until that timer. Otherwise, poll blocks waiting for new I/O events."
    },
    {
      "question": "What happens if a timer callback takes 100ms?",
      "answer": "The timer callback executes during the timers phase. While it runs, the event loop is blocked - no I/O can be processed, no other timers can fire, no setImmediate callbacks execute. This delays everything by at least 100ms."
    },
    {
      "question": "How do you measure event loop lag?",
      "answer": "Use a high-resolution timer: record the time at the start of a setInterval, then measure the actual delay. var expected = Date.now() + 1000; setTimeout(function() { var lag = Date.now() - expected; }, 1000). Also use process.hrtime() for nanosecond precision."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 350\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"330\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Node.js Event Loop Phases</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. Timers</text><text x=\"130\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">setTimeout, setInterval</text><line x1=\"130\" y1=\"95\" x2=\"130\" y2=\"115\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"115\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"130\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. Pending</text><text x=\"130\" y=\"147\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">I/O callbacks deferred</text><line x1=\"130\" y1=\"155\" x2=\"130\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"175\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#9aa0b0\" stroke-width=\"1.5\"/><text x=\"130\" y=\"190\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. Idle/Prepare</text><text x=\"130\" y=\"207\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Internal libuv use</text><line x1=\"130\" y1=\"215\" x2=\"130\" y2=\"235\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"235\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"250\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. Poll</text><text x=\"130\" y=\"267\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">I/O callbacks (most code)</text><line x1=\"130\" y1=\"275\" x2=\"130\" y2=\"295\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"295\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"310\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">5. Check</text><text x=\"130\" y=\"327\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">setImmediate callbacks</text><line x1=\"130\" y1=\"335\" x2=\"130\" y2=\"348\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"348\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"363\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">6. Close</text><text x=\"130\" y=\"380\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">socket.on(\"close\")</text></svg>",
  "codeExamples": [
    {
      "title": "Event Loop Phase Order Demonstration",
      "useCase": "Visualize the execution order of different deferral mechanisms",
      "code": "console.log(\"1. sync - start\");\n\nsetTimeout(function() {\n  console.log(\"2. setTimeout(fn, 0)\");\n}, 0);\n\nsetImmediate(function() {\n  console.log(\"3. setImmediate\");\n});\n\nprocess.nextTick(function() {\n  console.log(\"4. process.nextTick\");\n});\n\nPromise.resolve().then(function() {\n  console.log(\"5. Promise.then\");\n});\n\nconsole.log(\"6. sync - end\");\n\n// Output (non-I/O context, order may vary between setTimeout/setImmediate):\n// 1. sync - start\n// 6. sync - end\n// 4. process.nextTick\n// 5. Promise.then\n// 3. setImmediate\n// 2. setTimeout(fn, 0)",
      "description": "Synchronous code runs first. Then microtasks: process.nextTick() before Promise.then(). Then setImmediate() and setTimeout() - in non-I/O context, their order depends on loop startup timing. In I/O callbacks, setImmediate always fires before setTimeout."
    },
    {
      "title": "Event Loop Starvation with process.nextTick()",
      "useCase": "Demonstrate how recursive nextTick blocks I/O",
      "code": "var fs = require(\"fs\");\n\nfunction recursiveNextTick() {\n  process.nextTick(recursiveNextTick);\n}\n\nrecursiveNextTick();\n\n// This file read will NEVER complete\nfs.readFile(__filename, function(err, data) {\n  console.log(\"File read complete!\");\n});\n\nsetTimeout(function() {\n  console.log(\"This timeout will never fire either\");\n}, 1000);\n\n// Fix: use setImmediate instead of process.nextTick for recursion\nfunction safeRecursion() {\n  setImmediate(safeRecursion); // Allows I/O to be processed\n}\n\n// Correct deferral pattern:\nfunction processLargeArray(items, callback) {\n  var i = 0;\n  function next() {\n    if (i >= items.length) { callback(); return; }\n    processItem(items[i]);\n    i++;\n    setImmediate(next); // yield to event loop after each item\n  }\n  next();\n}",
      "description": "Recursive process.nextTick() never lets the event loop reach the poll phase, so I/O callbacks never execute. setImmediate() allows the loop to process pending I/O between iterations. This is the correct pattern for deferring work without starvation."
    },
    {
      "title": "setTimeout vs setImmediate in I/O Callback",
      "useCase": "Deterministic ordering inside I/O callbacks",
      "code": "var fs = require(\"fs\");\n\nfs.readFile(__filename, function() {\n  console.log(\"1. I/O callback (poll phase)\");\n\n  setTimeout(function() {\n    console.log(\"2. setTimeout - next timers phase\");\n  }, 0);\n\n  setImmediate(function() {\n    console.log(\"3. setImmediate - next check phase\");\n  });\n\n  process.nextTick(function() {\n    console.log(\"4. nextTick - before next phase\");\n  });\n\n  Promise.resolve().then(function() {\n    console.log(\"5. Promise.then - after nextTick\");\n  });\n});\n\n// Output is ALWAYS deterministic inside I/O:\n// 1. I/O callback (poll phase)\n// 4. process.nextTick\n// 5. Promise.then\n// 3. setImmediate (check phase, IMMEDIATELY after poll)\n// 2. setTimeout (next loop iteration, timers phase)",
      "description": "Inside I/O callbacks (poll phase), the order is deterministic: microtasks (nextTick > Promise), then setImmediate (check phase - same iteration), then setTimeout (timer phase - next iteration). This is because check phase comes right after poll phase."
    },
    {
      "title": "Measuring Event Loop Lag",
      "useCase": "Detect and measure how much the event loop is blocked",
      "code": "function measureLag(sampleSize) {\n  if (sampleSize === undefined) sampleSize = 10;\n  var samples = [];\n  var last = Date.now();\n\n  function tick() {\n    var now = Date.now();\n    var elapsed = now - last;\n    last = now;\n    samples.push(elapsed);\n\n    if (samples.length >= sampleSize) {\n      var max = Math.max.apply(null, samples);\n      var avg = samples.reduce(function(s, v) { return s + v; }, 0) / samples.length;\n      console.log(\"Lag - avg: \" + avg.toFixed(2) + \"ms, max: \" + max + \"ms\");\n      console.log(\"Samples:\", samples.join(\", \"));\n      return;\n    }\n\n    setImmediate(tick);\n  }\n\n  setImmediate(tick);\n}\n\nmeasureLag(5);",
      "description": "This measures event loop lag by scheduling setImmediate() callbacks and measuring the time between them. Higher values indicate the event loop was blocked between callbacks. In production, use tools like the perf_hooks module or monitoring services."
    },
    {
      "title": "Preventing Event Loop Blocking with setImmediate",
      "useCase": "Break CPU-intensive work into chunks",
      "code": "var fs = require(\"fs\");\n\n// BAD: blocks the event loop for all entries\nfunction processAllFiles(files) {\n  files.forEach(function(file) {\n    var data = fs.readFileSync(file);\n    var result = heavyComputation(data);\n    fs.writeFileSync(file + \".out\", result);\n  });\n}\n\n// GOOD: yield to event loop between files\nfunction processFilesAsync(files, cb) {\n  var index = 0;\n  var results = [];\n\n  function next() {\n    if (index >= files.length) {\n      cb(null, results);\n      return;\n    }\n\n    var file = files[index];\n    index++;\n\n    fs.readFile(file, function(err, data) {\n      if (err) { cb(err); return; }\n      // Yield to event loop after each file\n      setImmediate(function() {\n        results.push(heavyComputation(data));\n        setImmediate(next);\n      });\n    });\n  }\n\n  setImmediate(next);\n}\n\nfunction heavyComputation(data) {\n  // Simulate CPU work\n  var start = Date.now();\n  while (Date.now() - start < 10) {}\n  return data.length;\n}",
      "description": "The async version uses setImmediate() to yield to the event loop between iterations. This allows I/O callbacks (incoming requests, data arriving) to be processed. Without yielding, a large file list blocks the event loop for the entire duration, making the server unresponsive."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the correct order of event loop phases?",
      "options": [
        "Timers, Poll, Check, Close, Pending, Idle",
        "Timers, Pending, Idle/Prepare, Poll, Check, Close",
        "Poll, Check, Close, Timers, Pending, Idle",
        "Check, Close, Timers, Poll, Pending, Idle"
      ],
      "answer": 1,
      "explanation": "The six phases in order: timers, pending callbacks, idle/prepare, poll, check, close callbacks."
    },
    {
      "question": "Which has the highest priority among deferral mechanisms?",
      "options": [
        "setTimeout(fn, 0)",
        "setImmediate()",
        "process.nextTick()",
        "Promise.resolve().then()"
      ],
      "answer": 2,
      "explanation": "process.nextTick() has the highest priority - it runs before the next event loop phase, before Promise microtasks."
    },
    {
      "question": "What happens if process.nextTick() is called recursively?",
      "options": [
        "The event loop handles it efficiently",
        "It starves the event loop - I/O never gets processed",
        "Node.js limits recursion to 1000",
        "It throws a stack overflow error"
      ],
      "answer": 1,
      "explanation": "Recursive nextTick prevents the loop from reaching the poll phase. I/O callbacks, timers, and setImmediate never execute. Use setImmediate instead."
    },
    {
      "question": "In an I/O callback, which fires first: setImmediate or setTimeout(fn, 0)?",
      "options": [
        "setTimeout(fn, 0)",
        "setImmediate",
        "Non-deterministic",
        "Depends on CPU load"
      ],
      "answer": 1,
      "explanation": "In I/O callbacks (poll phase), setImmediate fires in the check phase (same iteration), while setTimeout fires in the timers phase (next iteration)."
    },
    {
      "question": "What does the poll phase do when no timers or setImmediate callbacks are pending?",
      "options": [
        "Exits immediately",
        "Blocks waiting for new I/O events",
        "Throws an error",
        "Runs garbage collection"
      ],
      "answer": 1,
      "explanation": "The poll phase blocks waiting for new I/O events if there are no timers or setImmediate callbacks. This is Node.js efficient idle behavior."
    },
    {
      "question": "What mechanism would you use for the HIGHEST priority deferred execution?",
      "options": [
        "setTimeout(fn, 0)",
        "setImmediate()",
        "process.nextTick()",
        "queueMicrotask()"
      ],
      "answer": 2,
      "explanation": "process.nextTick() has the highest priority. It runs before Promise microtasks and before the next event loop phase. However, use it sparingly to avoid starving the loop."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-fs-module"] = {
  "title": "Node.js File System Module",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "The fs module provides an API for interacting with the file system, including reading, writing, deleting, renaming files, and working with directories.",
    "fs operations come in three flavors: synchronous (fs.readFileSync), callback-based async (fs.readFile), and promise-based async (fs.promises.readFile).",
    "The module supports file descriptors, streams for large files, file watching, permission changes, symbolic links, and file metadata (stats).",
    "All async fs operations are delegated to libuv's thread pool, making them non-blocking but not truly asynchronous at the OS level for all operations."
  ],
  "laymanDefinition": "The File System (fs) module is Node.js's built-in toolkit for working with files and folders on your computer. Think of it as having a personal assistant who can: read any file and give you its contents (fs.readFile), write new files or overwrite existing ones (fs.writeFile), create/delete/move folders (fs.mkdir, fs.rmdir, fs.rename), tell you information about a file like size and creation date (fs.stat), and even watch files for changes and alert you when they are modified (fs.watch). Every operation comes in three styles: \"do it now and wait\" (Sync suffix), \"do it and tell me when done\" (callback), and \"do it and give me a promise\" (promises API).",
  "deepDive": [
    {
      "heading": "File Reading and Writing",
      "text": "Three approaches to file I/O: (1) fs.readFile(path, options, callback) - reads entire file into memory as Buffer/string. Best for small files (<50MB). Options: encoding (utf8, base64, etc.), flag (r, w, a, r+). (2) fs.createReadStream(path, options) - uses streams for large files. Options: highWaterMark (chunk size), start/end (byte range). (3) fs.read(fd, buffer, offset, length, position, callback) - low-level read from file descriptor. For writing: fs.writeFile (overwrite), fs.appendFile (append), fs.createWriteStream (streaming), fs.write (low-level descriptor). Important: writeFile replaces the file entirely. appendFile adds to the end. For atomic writes: write to a temp file, then fs.rename to the target. rename is atomic on the same filesystem."
    },
    {
      "heading": "File Descriptors and Low-Level Operations",
      "text": "File descriptors (fd) are integer handles that represent open files. The OS limits open file descriptors per process (ulimit -n, default 256-1024). fs.open(path, flags, mode, callback) returns an fd. Common flags: \"r\" (read), \"w\" (write, creates/truncates), \"a\" (append, creates), \"r+\" (read+write, no truncate), \"wx\" (write, fails if exists). Low-level operations: fs.read(fd, buffer, offset, length, position, callback), fs.write(fd, buffer, offset, length, position, callback), fs.ftruncate(fd, len), fs.fsync(fd, callback), fs.fstat(fd, callback). Always close file descriptors with fs.close(fd) when done. Leaking fds causes EMFILE errors. The default file mode is 0o666 (read/write for all), modified by umask."
    },
    {
      "heading": "File System Operations: Directories, Links, Permissions",
      "text": "(1) Directories: fs.mkdir(path, { recursive: true }) - creates directory tree. fs.readdir(path, { withFileTypes: true }) - lists entries with type info (file/directory/symlink). fs.rmdir(path, { recursive: true }) - removes directory. fs.mkdtemp(prefix) - creates temporary directory. (2) Links: fs.symlink(target, path, type) - symbolic link (type: \"file\", \"dir\", \"junction\"). fs.link(existing, new) - hard link. fs.readlink(path) - reads link target. (3) Permissions: fs.chmod(path, mode) - change permissions. fs.chown(path, uid, gid) - change ownership. fs.access(path, mode) - check accessibility (F_OK, R_OK, W_OK, X_OK). (4) File types: fs.stat(path) - file/directory info. fs.lstat(path) - stats without following symlinks. fs.statSync - synchronous version."
    },
    {
      "heading": "File Watching and Change Detection",
      "text": "fs.watch(filename, options, listener) - watches for file changes using OS-native mechanisms. Options: persistent (keep process alive), recursive (watch subdirectories), encoding. Limitations: (1) Not guaranteed to work on all platforms. (2) The event type (\"change\", \"rename\") may be unreliable. (3) On some platforms, the same event fires multiple times. (4) Does not provide the changed content (use fs.watchFile for that). fs.watchFile(filename, options, listener) - polls file stats at intervals (default 5007ms). More reliable but less efficient. fs.watch is preferred for performance. For production file watching: use third-party libraries (chokidar) that handle cross-platform inconsistencies. Node.js 19+ stable recursive watching on all platforms."
    },
    {
      "heading": "fs Promises API and Best Practices",
      "text": "The fs.promises API (require(\"fs/promises\")) provides promise-based alternatives: (1) fs.promises.readFile(path, options) - returns Promise<Buffer|string>. (2) fs.promises.writeFile(path, data) - returns Promise<void>. (3) fs.promises.stat(path) - returns Promise<Stats>. (4) fs.promises.readdir(path) - returns Promise<string[]>. (5) fs.promises.mkdir(path, options) - returns Promise<void>. (6) fs.promises.unlink(path) - returns Promise<void>. (7) fs.promises.rm(path, options) - removes file/directory (Node 14+). (8) fs.promises.copyFile(src, dest, mode) - copies file. (9) fs.promises.realpath(path) - resolves symlinks. Best practices: (1) Always use async/promises API, never Sync in server code. (2) Handle ENOENT (file not found) errors gracefully. (3) Use streams for files > 50MB. (4) Use path.join() for cross-platform paths. (5) Use fs.constants for flags and modes. (6) Catch EEXIST errors in mkdir race conditions. (7) Prefer fs.promises for modern code."
    }
  ],
  "interviewAnswer": "The fs module provides file system operations in three styles: synchronous (Sync suffix, blocks event loop), callback-based async (delegated to libuv thread pool), and promise-based (fs.promises, modern approach). Key operations: readFile, writeFile, appendFile (high-level), read/write streams (large files), open/read/write/close (low-level descriptors). Directory ops: mkdir({ recursive: true }), readdir, rmdir. File info: stat, lstat. Watching: fs.watch (native), fs.watchFile (polling). Critical: always close file descriptors, handle ENOENT/EEXIST errors, use async API in production, use streams for large files. Atomic writes via write to temp + rename. fs.constants provides flags and permission constants.",
  "interviewQuestions": [
    {
      "question": "What are the three styles of fs operations?",
      "answer": "Synchronous (Sync suffix, blocks event loop), Callback-based async (thread pool, standard), Promise-based (fs.promises, modern async). Use async/promises in production code; use Sync only in CLI scripts or startup code."
    },
    {
      "question": "What is the difference between readFile and createReadStream?",
      "answer": "readFile loads the entire file into memory (Buffer/string). createReadStream reads in chunks (streams). Use readFile for small files (<50MB). Use createReadStream for large files to avoid memory exhaustion and enable early processing."
    },
    {
      "question": "How do you handle file not found errors?",
      "answer": "Check error.code === \"ENOENT\". Do not assume the file exists - race conditions exist (TOCTOU). Use fs.access() to check existence before operations, but handle errors anyway as the file may be deleted between check and operation."
    },
    {
      "question": "What are file descriptors and why must they be closed?",
      "answer": "File descriptors (fd) are integer handles for open files. The OS limits open fds per process (ulimit -n). Leaking fds causes EMFILE: \"too many open files\". Always close fds with fs.close(fd) in a finally block or use the 'wx' flag to avoid race conditions."
    },
    {
      "question": "How do you create nested directories?",
      "answer": "fs.mkdir(path, { recursive: true }) creates the entire directory tree. Without recursive: true, mkdir fails if parent directories do not exist. Before Node 10, you needed mkdirp or manual recursion."
    },
    {
      "question": "What does fs.stat() return and what can you check?",
      "answer": "fs.stat() returns a Stats object with: isFile(), isDirectory(), isSymbolicLink(), size, birthtime (creation), mtime (modification), atime (access), ctime (status change), mode (permissions), uid/gid. Stats also has blocks, blksize, ino, dev, nlink."
    },
    {
      "question": "How do you perform an atomic file write?",
      "answer": "Write to a temporary file, then fs.rename(tempPath, targetPath). rename is atomic on the same filesystem. This prevents partial writes: if the process crashes during write, the temporary file is discarded and the original remains intact."
    },
    {
      "question": "What is the difference between fs.watch and fs.watchFile?",
      "answer": "fs.watch uses OS-native file change notifications (inotify, FSEvents, ReadDirectoryChangesW). More efficient but platform-inconsistent. fs.watchFile polls file stats at intervals (default 5007ms). More reliable but CPU-intensive. Prefer fs.watch for performance."
    },
    {
      "question": "What are the common flag options for fs.open?",
      "answer": "\"r\" (read, default), \"w\" (write, creates/truncates), \"a\" (append, creates), \"r+\" (read+write), \"w+\" (read+write, truncates), \"a+\" (read+append), \"wx\" (write, fails if exists - exclusive). The \"x\" flag prevents overwriting existing files."
    },
    {
      "question": "How does the promises API differ from the callback API?",
      "answer": "fs.promises imports from \"fs/promises\". All methods return Promises instead of accepting callbacks. Methods have the same signatures (minus callback). Supports async/await. fs.promises.readFile(\"file\", \"utf8\") returns Promise<string>."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Node.js File System Module</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">fs.readFile / writeFile</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">High-level file ops</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">fs.createReadStream / createWriteStream</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Stream-based file ops</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">fs.open / read / write / close</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Low-level file descriptor ops</text><rect x=\"30\" y=\"235\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"252.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">fs.watch / fs.stat / fs.mkdir</text><text x=\"130\" y=\"269.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Directory, watch, metadata ops</text><text x=\"250\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Small files, entire content in memory</text><text x=\"250\" y=\"138\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Large files, chunk-by-chunk, backpressure</text><text x=\"250\" y=\"198\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Fine-grained control, manual buffer management</text><text x=\"250\" y=\"258\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Directory operations, file watching, stats/permissions</text></svg>",
  "codeExamples": [
    {
      "title": "Reading and Writing Files with Callbacks",
      "useCase": "Basic async file operations",
      "code": "var fs = require(\"fs\");\n\n// Read file\nfs.readFile(\"config.json\", \"utf8\", function(err, data) {\n  if (err) {\n    console.error(\"Read error:\", err.message);\n    return;\n  }\n  console.log(\"Config loaded:\", data);\n});\n\n// Write file (overwrites if exists)\nfs.writeFile(\"output.txt\", \"Hello, Node.js!\", \"utf8\", function(err) {\n  if (err) {\n    console.error(\"Write error:\", err.message);\n    return;\n  }\n  console.log(\"File written successfully\");\n});\n\n// Append to file\nfs.appendFile(\"log.txt\", new Date().toISOString() + \"\\n\", function(err) {\n  if (err) console.error(\"Append error:\", err.message);\n});",
      "description": "Callback-based fs operations. Always check err parameter. readFile loads entire file into memory. writeFile overwrites completely. appendFile adds to the end."
    },
    {
      "title": "fs Promises API with async/await",
      "useCase": "Modern promise-based file operations",
      "code": "var fs = require(\"fs/promises\");\n\nasync function fileOperations() {\n  try {\n    // Read file\n    var data = await fs.readFile(\"config.json\", \"utf8\");\n    console.log(\"Config:\", data);\n\n    // Parse and modify\n    var config = JSON.parse(data);\n    config.lastUpdated = new Date().toISOString();\n\n    // Write back\n    await fs.writeFile(\"config.json\", JSON.stringify(config, null, 2), \"utf8\");\n    console.log(\"Config updated\");\n\n    // Copy file\n    await fs.copyFile(\"config.json\", \"config.backup.json\");\n    console.log(\"Backup created\");\n\n    // Get file stats\n    var stats = await fs.stat(\"config.json\");\n    console.log(\"Size:\", stats.size, \"bytes\");\n    console.log(\"Modified:\", stats.mtime);\n  } catch (err) {\n    console.error(\"Operation failed:\", err.message);\n  }\n}\n\nfileOperations();",
      "description": "fs/promises provides all fs operations as promise-based functions. async/await makes sequential file operations readable. try/catch handles all errors. copyFile is an efficient file copy operation."
    },
    {
      "title": "Streaming Large File Processing",
      "useCase": "Process a large file line by line without loading it entirely",
      "code": "var fs = require(\"fs\");\nvar readline = require(\"readline\");\n\nvar rl = readline.createInterface({\n  input: fs.createReadStream(\"large-file.txt\"),\n  crlfDelay: Infinity\n});\n\nvar lineCount = 0;\nrl.on(\"line\", function(line) {\n  lineCount++;\n  // Process each line (no memory accumulation)\n});\n\nrl.on(\"close\", function() {\n  console.log(\"Processed \" + lineCount + \" lines\");\n});\n\n// For binary files: use stream directly\nvar readStream = fs.createReadStream(\"large-file.bin\", {\n  highWaterMark: 65536  // 64KB chunks\n});\n\nreadStream.on(\"data\", function(chunk) {\n  // Process binary chunk\n  console.log(\"Received\", chunk.length, \"bytes\");\n});\n\nreadStream.on(\"end\", function() {\n  console.log(\"File read complete\");\n});",
      "description": "fs.createReadStream + readline processes large text files line-by-line without loading the entire file. The highWaterMark controls chunk size (default 64KB). Always use streams for files > 50MB."
    },
    {
      "title": "Directory Operations and File Traversal",
      "useCase": "Navigate and manipulate directory structures",
      "code": "var fs = require(\"fs\");\nvar path = require(\"path\");\n\n// Create nested directories\nfs.mkdir(\"data/logs/2024\", { recursive: true }, function(err) {\n  if (err && err.code !== \"EEXIST\") {\n    console.error(\"Mkdir error:\", err.message);\n    return;\n  }\n  console.log(\"Directory created\");\n});\n\n// List directory contents with types\nfs.readdir(__dirname, { withFileTypes: true }, function(err, entries) {\n  if (err) { console.error(err); return; }\n  entries.forEach(function(entry) {\n    var type = entry.isDirectory() ? \"dir\" : \"file\";\n    console.log(\"[\" + type + \"] \" + entry.name);\n  });\n});\n\n// Check if file exists and get info\nfs.stat(\"config.json\", function(err, stats) {\n  if (err) { console.error(\"Not found\"); return; }\n  console.log(\"Size:\", stats.size);\n  console.log(\"File:\", stats.isFile());\n  console.log(\"Directory:\", stats.isDirectory());\n  console.log(\"Permissions:\", stats.mode.toString(8));\n});",
      "description": "recursive: true creates the entire directory tree. withFileTypes: true in readDir provides file type info without extra stat calls. fs.stat provides detailed file metadata. Handle EEXIST errors for concurrent mkdir calls."
    },
    {
      "title": "File Watching and Atomic Writes",
      "useCase": "Watch for changes and perform safe writes",
      "code": "var fs = require(\"fs\");\nvar path = require(\"path\");\n\n// Watch a file for changes\nfs.watch(\"config.json\", function(eventType, filename) {\n  console.log(\"File changed:\", eventType, filename);\n  fs.readFile(\"config.json\", \"utf8\", function(err, data) {\n    if (err) { console.error(\"Read error:\", err.message); return; }\n    try {\n      var config = JSON.parse(data);\n      console.log(\"New config:\", config);\n    } catch (e) {\n      console.error(\"Invalid JSON\");\n    }\n  });\n});\n\n// Atomic write pattern\nfunction safeWriteFile(filePath, data, callback) {\n  var tmpPath = filePath + \".tmp.\" + process.pid;\n  fs.writeFile(tmpPath, data, function(err) {\n    if (err) { callback(err); return; }\n    fs.rename(tmpPath, filePath, function(err) {\n      if (err) { fs.unlink(tmpPath, function() {}); callback(err); return; }\n      callback(null);\n    });\n});\n}\n\nsafeWriteFile(\"data.json\", JSON.stringify({ key: \"value\" }), function(err) {\n  if (err) console.error(\"Write failed:\", err.message);\n  else console.log(\"Atomic write complete\");\n});",
      "description": "fs.watch uses native OS notifications. Atomic writes use a temp file + rename to prevent corruption. If the process crashes during writeFile, the temp file is discarded and the original remains intact."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which fs API should you use for files > 50MB?",
      "options": [
        "fs.readFile",
        "fs.createReadStream",
        "fs.readSync",
        "fs.promises.readFile"
      ],
      "answer": 1,
      "explanation": "Use createReadStream for large files to avoid loading the entire file into memory. Streams process data in chunks."
    },
    {
      "question": "How do you create nested directories safely?",
      "options": [
        "fs.mkdirSync nested",
        "fs.mkdir with recursive: true",
        "fs.mkdtemp",
        "Multiple fs.mkdir calls"
      ],
      "answer": 1,
      "explanation": "mkdir({ recursive: true }) creates the entire directory tree. It does not error if the directory already exists."
    },
    {
      "question": "What error code indicates a file was not found?",
      "options": [
        "EACCES",
        "ENOENT",
        "EEXIST",
        "EMFILE"
      ],
      "answer": 1,
      "explanation": "ENOENT = \"Error NO ENTity\" - file or directory not found. EACCES = permission denied. EEXIST = already exists. EMFILE = too many open files."
    },
    {
      "question": "What is the recommended way to perform atomic file writes?",
      "options": [
        "Write directly to target path",
        "Write to temp file, then rename",
        "Use fs.writeFileSync",
        "Use fs.appendFile"
      ],
      "answer": 1,
      "explanation": "Write to a temp file, then fs.rename to the target. rename is atomic on the same filesystem, preventing partial/corrupt writes."
    },
    {
      "question": "Which method returns file type information (isFile, isDirectory)?",
      "options": [
        "fs.readdir",
        "fs.stat",
        "fs.open",
        "fs.links"
      ],
      "answer": 1,
      "explanation": "fs.stat() returns a Stats object with isFile(), isDirectory(), isSymbolicLink(), size, mtime, and other metadata."
    },
    {
      "question": "What is the difference between fs.watch and fs.watchFile?",
      "options": [
        "They are the same",
        "fs.watch uses OS notifications, fs.watchFile uses polling",
        "fs.watch is for directories only",
        "fs.watchFile is faster"
      ],
      "answer": 1,
      "explanation": "fs.watch uses native OS file change notifications (e.g., inotify). fs.watchFile polls file stats at intervals (default 5007ms)."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-node-runtime"] = {
  "title": "Node.js Runtime",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Node.js is a JavaScript runtime built on Chrome's V8 engine that executes JavaScript outside the browser.",
    "It provides APIs for file system access, networking, child processes, and other OS-level operations not available in browsers.",
    "Node.js uses a single-threaded event loop with a non-blocking I/O model, making it efficient for I/O-heavy applications.",
    "Libuv handles the asynchronous I/O operations, thread pool, and the event loop implementation in Node.js."
  ],
  "laymanDefinition": "Node.js is like giving JavaScript a superpower: the ability to run outside a web browser. Before Node.js, JavaScript could only run in the browser and interact with web pages. Node.js took the V8 engine (the brain of Chrome) and put it in a standalone environment with access to the file system, network, and operating system. This allowed developers to build servers, command-line tools, and desktop applications using JavaScript. Node.js is especially good at handling many simultaneous connections efficiently because it does not create a new thread for each request - it uses a single thread with an event loop to juggle multiple tasks.",
  "deepDive": [
    {
      "heading": "V8 Engine: The JavaScript Execution Core",
      "text": "Node.js uses Google's V8 JavaScript engine to compile and execute JavaScript. V8 is written in C++ and implements ECMAScript standards. It compiles JavaScript directly to native machine code (JIT compilation) rather than interpreting bytecode. V8 handles: (1) Parsing - converts source code into an Abstract Syntax Tree (AST). (2) Compilation - the Ignition interpreter generates bytecode, and the TurboFan compiler optimizes hot code paths. (3) Memory management - V8's garbage collector (Orinoco) reclaims unused memory. (4) Inline caching - optimizes property access patterns. Node.js extends V8 with additional APIs (require, fs, http) that are not part of the JavaScript language itself."
    },
    {
      "heading": "Libuv: The I/O Engine",
      "text": "Libuv is the C library that provides Node.js with its asynchronous I/O capabilities. Key features: (1) Event loop - the core mechanism that handles asynchronous operations. (2) Thread pool - a pool of 4 threads (default, configurable via UV_THREADPOOL_SIZE) for CPU-intensive or blocking operations like file I/O, DNS lookups, and crypto. (3) Async I/O - uses platform-specific mechanisms: epoll (Linux), kqueue (macOS), IOCP (Windows). (4) Timer management - setTimeout, setInterval, setImmediate. (5) Signals and child process management. Libuv abstracts the underlying OS differences, providing a consistent API across platforms. The thread pool size is a critical configuration for performance - setting it too high causes thread contention; too low causes I/O bottlenecks."
    },
    {
      "heading": "Node.js API Layer",
      "text": "Node.js provides a rich set of built-in modules that extend JavaScript beyond what browsers offer: (1) File System (fs) - read/write files, watch directories, create streams. (2) HTTP/HTTPS - create servers and make requests. (3) Path - manipulate file paths cross-platform. (4) OS - operating system information (CPU, memory, network interfaces). (5) Crypto - cryptographic functions (hashing, encryption, signing). (6) Stream - handle streaming data. (7) Events - event emitter pattern. (8) Buffer - handle binary data. (9) Cluster - scale across CPU cores. (10) Child Process - spawn system commands. These APIs follow the Node.js convention: callback-based by default, with promisified versions available via require(\"fs/promises\")."
    },
    {
      "heading": "Node.js Module System",
      "text": "Node.js uses two module systems: (1) CommonJS - the original system using require() and module.exports. Modules are loaded synchronously and cached after first load. require() resolves modules using a specific algorithm: built-in modules first, then node_modules, then local files with relative/absolute paths. (2) ES Modules (ESM) - the modern JavaScript standard using import/export. Enabled via \"type\": \"module\" in package.json or .mjs extension. ESM supports static analysis for tree shaking and top-level await. CommonJS and ESM can interoperate but with limitations: ESM can import CommonJS modules (as default exports), but CommonJS cannot import ESM modules (dynamic import() works as an async bridge)."
    },
    {
      "heading": "Node.js Runtime Architecture Performance Characteristics",
      "text": "Node.js excels at I/O-bound workloads but struggles with CPU-bound tasks. Performance characteristics: (1) I/O-bound (database queries, file reads, network requests) - Node.js handles thousands of concurrent connections with minimal overhead because I/O operations are delegated to libuv's thread pool or OS async facilities. (2) CPU-bound (image processing, JSON parsing, cryptography, data transformation) - blocks the event loop and degrades responsiveness. Solutions: use Worker Threads for CPU-intensive work, or offload to microservices. (3) Memory footprint - Node.js typically uses 10-50MB for basic applications, scaling with concurrent connections. (4) Startup time - cold start takes 50-300ms depending on module count and dependency resolution."
    }
  ],
  "interviewAnswer": "Node.js is a JavaScript runtime built on V8 and libuv, enabling JavaScript execution outside the browser. It uses a single-threaded event loop with non-blocking I/O, making it efficient for I/O-heavy applications. V8 compiles JavaScript to native code via JIT compilation. Libuv provides the event loop, thread pool, and async I/O. Node.js extends JavaScript with built-in modules (fs, http, path, crypto) for system-level operations. It supports both CommonJS and ES Module systems. Node.js excels at I/O-bound workloads but blocks on CPU-intensive operations - use Worker Threads for those. Key performance considerations: libuv thread pool size, event loop blocking, and module loading overhead.",
  "interviewQuestions": [
    {
      "question": "What is the relationship between V8 and Node.js?",
      "answer": "V8 is the JavaScript engine that compiles and executes JavaScript. Node.js embeds V8 and extends it with APIs for file system, networking, and OS operations. V8 handles the JavaScript language; Node.js provides the runtime environment."
    },
    {
      "question": "What is libuv and what does it provide?",
      "answer": "Libuv is a C library that provides Node.js with its asynchronous I/O capabilities. It implements the event loop, thread pool, async file I/O, DNS resolution, signal handling, and child process management. It abstracts OS differences across Linux, macOS, and Windows."
    },
    {
      "question": "How does Node.js handle I/O operations asynchronously?",
      "answer": "For non-blocking I/O (network sockets), Node.js uses OS-level async facilities (epoll, kqueue, IOCP). For blocking operations (file I/O, DNS, crypto), it uses libuv's thread pool. The event loop coordinates callbacks and results without blocking the main thread."
    },
    {
      "question": "What is the default libuv thread pool size and how do you change it?",
      "answer": "The default thread pool size is 4. Change it by setting the UV_THREADPOOL_SIZE environment variable (e.g., UV_THREADPOOL_SIZE=8). Each thread consumes ~1MB of stack space. The optimal value depends on CPU cores and workload type (I/O-bound vs CPU-bound)."
    },
    {
      "question": "What is the difference between CommonJS and ES Modules in Node.js?",
      "answer": "CommonJS uses require() and module.exports, is synchronous, and loads modules at runtime. ES Modules use import/export, support static analysis for tree shaking, and enable top-level await. ESM is enabled via \"type\": \"module\" in package.json or .mjs extension."
    },
    {
      "question": "Why does Node.js use a single-threaded event loop?",
      "answer": "Single-threaded event loop avoids thread context switching overhead and race conditions common in multi-threaded servers. For I/O-bound workloads, it handles thousands of concurrent connections more efficiently than thread-per-request models."
    },
    {
      "question": "How does Node.js handle CPU-intensive tasks?",
      "answer": "CPU-intensive tasks block the event loop, degrading responsiveness. Solutions: (1) Use Worker Threads for parallel CPU processing. (2) Offload to external services or microservices. (3) Use native addons (C++ via N-API) for heavy computation. (4) Break large tasks into chunks with setImmediate()."
    },
    {
      "question": "What is the module resolution algorithm in require()?",
      "answer": "require() resolves modules in this order: (1) Built-in modules (fs, http, path). (2) Relative paths (./ or ../) - resolves to file, .js, .json, .node. (3) node_modules directory - walks up the directory tree. (4) Global modules (NODE_PATH)."
    },
    {
      "question": "How does Node.js handle cross-platform compatibility?",
      "answer": "Libuv abstracts OS-level differences (file paths, process management, async I/O). The path module handles path separators (/ vs ). The os module provides normalized OS information. Node.js uses conditional compilation at build time and runtime feature detection via process.platform and process.arch."
    },
    {
      "question": "What is the startup sequence of a Node.js application?",
      "answer": "(1) V8 initializes. (2) Node.js bootstrap code runs (lib/internal/bootstrap/). (3) Event loop starts. (4) Module resolution and loading (main entry point). (5) require() calls execute synchronously. (6) Top-level code runs. (7) Event loop handles callbacks. (8) Process exits when event loop has no more work."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Node.js Runtime Architecture</text><rect x=\"30\" y=\"55\" width=\"160\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"110\" y=\"75\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">JavaScript Code</text><text x=\"110\" y=\"92\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">User application code</text><line x1=\"110\" y1=\"105\" x2=\"110\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"110\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">V8 Engine</text><text x=\"110\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Compiles & executes JS</text><line x1=\"110\" y1=\"170\" x2=\"110\" y2=\"190\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"190\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"110\" y=\"207.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Node.js APIs</text><text x=\"110\" y=\"224.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">fs, http, path, crypto</text><line x1=\"110\" y1=\"235\" x2=\"110\" y2=\"253\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"253\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"110\" y=\"270.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Libuv</text><text x=\"110\" y=\"287.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Event loop + thread pool</text></svg>",
  "codeExamples": [
    {
      "title": "Basic HTTP Server with Node.js Runtime APIs",
      "useCase": "Create a server using built-in http module",
      "code": "const http = require(\"http\");\nconst fs = require(\"fs\");\nconst path = require(\"path\");\n\nconst server = http.createServer((req, res) => {\n  if (req.url === \"/\") {\n    res.writeHead(200, { \"Content-Type\": \"text/html\" });\n    res.end(\"<h1>Node.js Runtime</h1><p>Serving from V8 + libuv</p>\");\n  } else if (req.url === \"/data\") {\n    fs.readFile(path.join(__dirname, \"data.json\"), \"utf8\", (err, data) => {\n      if (err) { res.writeHead(500); res.end(\"Error\"); return; }\n      res.writeHead(200, { \"Content-Type\": \"application/json\" });\n      res.end(data);\n    });\n  }\n});\n\nserver.listen(3000, () => {\n  console.log(\"Server running on port 3000\");\n  console.log(\"Process PID:\", process.pid);\n  console.log(\"Node version:\", process.version);\n  console.log(\"Platform:\", process.platform, process.arch);\n});",
      "description": "This example demonstrates Node.js runtime capabilities: the http module creates a server, fs reads a file asynchronously (delegated to libuv thread pool), path handles cross-platform paths. process provides runtime information about the Node.js instance."
    },
    {
      "title": "Understanding Libuv Thread Pool Impact",
      "useCase": "Demonstrate async operations using thread pool vs event loop",
      "code": "const crypto = require(\"crypto\");\nconst start = Date.now();\n\nfunction hash(index) {\n  crypto.pbkdf2(\"password\", \"salt\", 100000, 64, \"sha512\", () => {\n    console.log(\"Hash \" + index + \": \" + (Date.now() - start) + \"ms\");\n  });\n}\n\nfor (let i = 1; i <= 8; i++) {\n  hash(i);\n}\n\n// UV_THREADPOOL_SIZE=8 node app.js to increase pool",
      "description": "This demonstrates libuv's thread pool in action. crypto.pbkdf2 is CPU-intensive and uses the thread pool. With default pool size 4, the first 4 hashes run in parallel. The next 4 wait for threads to become free."
    },
    {
      "title": "Module Resolution and Caching",
      "useCase": "Demonstrate CommonJS module system behavior",
      "code": "// lib/counter.js\nlet count = 0;\nmodule.exports = {\n  increment: () => ++count,\n  getCount: () => count\n};\n\n// app.js\nconst counter1 = require(\"./lib/counter\");\nconst counter2 = require(\"./lib/counter\");\n\nconsole.log(counter1 === counter2);\nconsole.log(counter1.increment());\nconsole.log(counter2.increment());\nconsole.log(counter1.getCount());",
      "description": "CommonJS caches modules after the first require(). Subsequent require() calls return the same instance from the cache. Modules are effectively singletons."
    },
    {
      "title": "Event Loop Blocking Detection",
      "useCase": "Detect and measure event loop lag",
      "code": "function monitorEventLoop(threshold) {\n  if (threshold === undefined) threshold = 50;\n  var lastCheck = Date.now();\n  setInterval(function() {\n    var now = Date.now();\n    var lag = now - lastCheck - 1000;\n    if (lag > threshold) {\n      console.warn(\"Event loop lag: \" + lag + \"ms\");\n    }\n    lastCheck = now;\n  }, 1000);\n}\n\nfunction blockLoop(ms) {\n  var start = Date.now();\n  while (Date.now() - start < ms) {}\n}\n\nmonitorEventLoop();\nblockLoop(2000);",
      "description": "Event loop monitoring detects when the event loop is blocked by CPU-intensive operations. The setInterval check measures actual vs expected timing. A large lag indicates the event loop was blocked."
    },
    {
      "title": "Cross-Platform Path Handling",
      "useCase": "Handle file paths correctly across OS",
      "code": "var path = require(\"path\");\n\nvar goodPath = path.join(__dirname, \"data\", \"files\", \"config.json\");\n\nconsole.log(\"Path sep:\", path.sep);\nconsole.log(\"Delimiter:\", path.delimiter);\n\nvar filePath = \"/user/docs/file.txt\";\nconsole.log(\"dir:\", path.dirname(filePath));\nconsole.log(\"base:\", path.basename(filePath));\nconsole.log(\"ext:\", path.extname(filePath));\nconsole.log(path.parse(filePath));",
      "description": "Always use path methods instead of string concatenation for file paths. path.join() uses the correct separator for each platform."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What JavaScript engine does Node.js use?",
      "options": [
        "SpiderMonkey",
        "V8",
        "JavaScriptCore",
        "Chakra"
      ],
      "answer": 1,
      "explanation": "Node.js uses Google's V8 JavaScript engine."
    },
    {
      "question": "What library provides the event loop and async I/O?",
      "options": [
        "libevent",
        "libuv",
        "libev",
        "libio"
      ],
      "answer": 1,
      "explanation": "Libuv implements the event loop, thread pool, and async I/O for Node.js."
    },
    {
      "question": "Default libuv thread pool size?",
      "options": [
        "1",
        "4",
        "8",
        "16"
      ],
      "answer": 1,
      "explanation": "Default is 4. Change with UV_THREADPOOL_SIZE."
    },
    {
      "question": "Which workload does Node.js handle best?",
      "options": [
        "CPU-intensive",
        "I/O-bound operations",
        "Video processing",
        "ML training"
      ],
      "answer": 1,
      "explanation": "Node.js excels at I/O-bound workloads via the event loop. CPU work blocks the loop."
    },
    {
      "question": "How does require(\"./module\") resolve?",
      "options": [
        "Searches node_modules",
        "Relative to current file",
        "Global modules",
        "NODE_PATH"
      ],
      "answer": 1,
      "explanation": "./ resolves relative to the file calling require()."
    },
    {
      "question": "How to enable ES Modules in Node.js?",
      "options": [
        "Use .mjs extension",
        "Add \"type\":\"module\" to package.json",
        "All of the above",
        "Use the --esm flag"
      ],
      "answer": 2,
      "explanation": "ESM is enabled via \"type\":\"module\", .mjs extension, or --esm flag."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-npm"] = {
  "title": "npm (Node Package Manager)",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "npm is the default package manager for Node.js, used for installing, managing, and publishing packages. It comes bundled with Node.js.",
    "The package.json file defines a project's metadata, dependencies, scripts, and configuration. It is the central file for any Node.js project.",
    "npm installs packages in node_modules following a nested dependency tree (pre-v3) or a flat-as-possible tree (v3+ with deduplication).",
    "npm scripts (npm run build, npm test) provide a way to define and run project-specific commands without global installations."
  ],
  "laymanDefinition": "npm is like an app store for JavaScript code. When you need functionality in your project (like a date formatting library or an HTTP client), you type npm install <package-name> and npm downloads it from the public registry at registry.npmjs.org into a node_modules folder in your project. It also creates or updates a package.json file that lists all your project's dependencies - like a shopping list saying \"my project needs React version 18, Express version 4, and Lodash version 4.\" This way, anyone else who wants to run your project can just type npm install and get all the same packages.",
  "deepDive": [
    {
      "heading": "package.json Structure and Fields",
      "text": "package.json is the manifest file for Node.js projects. Essential fields: (1) name - package name (lowercase, no spaces, hyphens allowed). (2) version - semver (1.2.3). (3) description - brief description. (4) main - entry point (index.js default). (5) scripts - custom commands (npm run <script>). (6) dependencies - packages needed at runtime. (7) devDependencies - packages needed only during development (testing, building). (8) peerDependencies - packages that must be installed by the consumer (plugins). (9) optionalDependencies - packages that are optional (install failure does not block). (10) bundleDependencies - packages bundled with the published package. (11) engines - Node.js and npm version requirements. (12) type - \"module\" or \"commonjs\". (13) exports - ESM entry points. (14) private: true - prevents accidental publish. (15) workspaces - monorepo support. Semantic versioning (semver): ~1.2.3 (patch changes), ^1.2.3 (minor changes), 1.2.3 (exact), * (any)."
    },
    {
      "heading": "npm Install and Dependency Resolution",
      "text": "npm install <package> - installs a package and adds to dependencies. npm install --save-dev (or -D) adds to devDependencies. npm install --global (-g) installs globally. npm install (no args) installs everything from package-lock.json. npm ci - clean install from lockfile (faster, no updates). Dependency resolution: npm v3+ uses a flat node_modules structure where possible, with nested node_modules for conflicting versions. npm v7+ uses the \"audit\" and \"dedupe\" improved algorithms. Package-lock.json: locks exact versions for reproducibility. npm v7+ also supports yarn.lock. Shrinkwrap: npm shrinkwrap creates a locked dependency tree. npm pack: creates a tarball for offline installation. npm cache: stores downloaded packages (~/.npm). Global vs local: local installs in project node_modules, global in system prefix (npm root -g). Only CLI tools should be installed globally."
    },
    {
      "heading": "npm Scripts and Lifecycle Hooks",
      "text": "npm scripts are defined in package.json scripts field. Predefined scripts: (1) npm start - runs start script. (2) npm stop - runs stop script. (3) npm test - runs test script. (4) npm restart - runs stop + start. (5) npm version - creates a version commit and tag. (6) npm publish - publishes to registry. Lifecycle hooks: pre/post hooks for any script. Example: \"prebuild\" runs before \"build\", \"postbuild\" after. npm run env - shows script environment variables. PATH: npm adds node_modules/.bin to PATH during scripts, so local binaries work without global install. Script arguments: pass via --: npm run test -- --coverage. Cross-platform: use packages like cross-env, rimraf (cross-platform rm -rf). npm exec (npx): runs a command from a local or remote package: npx create-react-app my-app. npx was introduced in npm v5.2."
    },
    {
      "heading": "Package Publishing and Versioning",
      "text": "npm publish - publishes the package to the registry. Prerequisites: (1) npm adduser or npm login. (2) npm version [major|minor|patch] bumps version and creates git tag. (3) .npmignore or .gitignore controls what is published. (4) package.json \"files\" field specifies publishable files. npm unpublish - removes a published version (24 hour window, or limited to 72 hours). npm deprecate - marks a version as deprecated with a warning message. npm dist-tag - manage distribution tags (latest, beta, next). Scoped packages: @scope/package-name (useful for organizations). Private packages: npm private packages require a paid npm account. npm access - control package visibility. OTP (One-Time Password): npm publish --otp=123456 for 2FA. package-lock.json version 2 (npm v7+): includes package integrity hashes for security."
    },
    {
      "heading": "npm Security and Best Practices",
      "text": "(1) npm audit - scans dependencies for known vulnerabilities. (2) npm audit fix - automatically fixes vulnerable packages (may introduce breaking changes). (3) npm audit fix --force - updates major versions if needed. (4) npm outdated - shows available updates. (5) npm update - updates packages within semver range. (6) npm fund - shows funding information for dependencies. (7) Integrity checks: package-lock.json includes SHA hashes (subresource integrity). (8) Signatures: npm v7+ supports package signing. (9) Security best practices: (a) Regularly run npm audit. (b) Use npm ci in CI/CD (reproducible installs). (c) Pin versions in production (use lockfile). (d) Review package source before using. (e) Use npm vet (npm v10+) for package validation. (f) Avoid publishing secrets. (g) Use .npmrc for registry configuration. (h) Configure 2FA for publishing accounts. (i) Use npm token for CI authentication."
    }
  ],
  "interviewAnswer": "npm is the default Node.js package manager. Key files: package.json (metadata, scripts, dependencies), package-lock.json (exact version locking). npm install <pkg> adds to dependencies; --save-dev for dev deps. npm scripts (start, test, build) provide command shortcuts with PATH including node_modules/.bin. npx runs packages without installing. npm ci for clean installs in CI. npm audit checks vulnerabilities. Package resolution: flat node_modules with nesting for conflicting versions. Publishing: npm version + npm publish. Use .npmignore or \"files\" field to control publish content. Best practices: use lockfile, run audit, use npm ci in CI, pin versions for production.",
  "interviewQuestions": [
    {
      "question": "What is the difference between dependencies and devDependencies?",
      "answer": "dependencies are required at runtime (express, lodash). devDependencies are only needed during development (testing libraries, build tools, TypeScript). npm install --production or NODE_ENV=production only installs dependencies."
    },
    {
      "question": "What is package-lock.json and why is it important?",
      "answer": "package-lock.json locks exact dependency versions (including sub-dependencies) for reproducible builds. It ensures every install gets the same dependency tree. Always commit it to version control. npm ci uses it for deterministic installs."
    },
    {
      "question": "What is the difference between npm install and npm ci?",
      "answer": "npm install reads package.json and updates package-lock.json if needed. npm ci reads only package-lock.json, installs exact versions, and fails if lockfile is missing or out of sync. npm ci is faster and should be used in CI/CD."
    },
    {
      "question": "How does npx differ from npm install -g?",
      "answer": "npx executes a command from a package without globally installing it. It can run packages that are not even installed (downloads temporarily). npm install -g permanently installs the package globally. npx is better for one-off commands."
    },
    {
      "question": "What is the node_modules resolution algorithm?",
      "answer": "npm installs packages in a flat-as-possible node_modules tree. Dependencies are hoisted to the top level when they do not conflict. When multiple versions of the same package are needed, the newer version is hoisted and older versions are nested in the dependent's node_modules folder."
    },
    {
      "question": "What is the purpose of npm audit?",
      "answer": "npm audit scans the dependency tree for known security vulnerabilities. It reports severity levels (critical, high, moderate, low) and suggests fixes. npm audit fix automatically installs compatible updates. Use it as part of CI/CD pipelines."
    },
    {
      "question": "How do you publish a package to npm?",
      "answer": "(1) npm login. (2) Update version with npm version [patch|minor|major]. (3) npm publish. Use .npmignore to exclude files. For scoped packages: npm publish --access public. Configure 2FA for security."
    },
    {
      "question": "What are npm workspaces?",
      "answer": "Workspaces support monorepos by allowing multiple packages in a single repository. Defined in root package.json: \"workspaces\": [\"packages/*\"]. npm install installs all workspace packages and symlinks them. Enables shared dependencies and cross-package scripts."
    },
    {
      "question": "What is semantic versioning (semver)?",
      "answer": "semver: MAJOR.MINOR.PATCH. MAJOR - breaking changes. MINOR - new features (backwards compatible). PATCH - bug fixes (backwards compatible). npm uses semver: ^1.2.3 (allow minor/patch), ~1.2.3 (allow patch only), 1.2.3 (exact), * (any version)."
    },
    {
      "question": "How do you update outdated packages?",
      "answer": "npm outdated shows available updates. npm update updates within semver range. npm install <pkg>@latest updates to the latest version. Use npm-check-updates or npx npm-check-updates -u for major version bumps."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">npm Package Management Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">package.json</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Project manifest</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">npm install</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Install dependencies</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">node_modules</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Installed packages</text></svg>",
  "codeExamples": [
    {
      "title": "package.json with Scripts and Configuration",
      "useCase": "Comprehensive package.json example",
      "code": "{\n  \"name\": \"my-express-app\",\n  \"version\": \"1.2.3\",\n  \"description\": \"A sample Express application\",\n  \"main\": \"src/index.js\",\n  \"type\": \"commonjs\",\n  \"private\": true,\n  \"scripts\": {\n    \"start\": \"node src/index.js\",\n    \"dev\": \"node --watch src/index.js\",\n    \"test\": \"mocha tests/*.test.js\",\n    \"test:coverage\": \"c8 npm test\",\n    \"lint\": \"eslint src/ tests/\",\n    \"build\": \"mkdirp dist && cpy src/**/*.js dist/\",\n    \"prebuild\": \"echo Building...\",\n    \"postbuild\": \"echo Build complete!\",\n    \"prepublishOnly\": \"npm test && npm run lint\",\n    \"version\": \"echo Bumped to $npm_package_version\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.0\",\n    \"lodash\": \"^4.17.21\",\n    \"morgan\": \"^1.10.0\"\n  },\n  \"devDependencies\": {\n    \"mocha\": \"^10.0.0\",\n    \"c8\": \"^8.0.0\",\n    \"eslint\": \"^8.0.0\"\n  },\n  \"engines\": {\n    \"node\": \">=18.0.0\",\n    \"npm\": \">=9.0.0\"\n  }\n}",
      "description": "package.json defines the project. scripts: start (run app), dev (with watch mode), test (with coverage), lint. pre/post hooks run before/after scripts. engines specify Node.js/npm version requirements. private:true prevents accidental publish."
    },
    {
      "title": "npm Script Usage and Cross-Platform Commands",
      "useCase": "Run and chain npm scripts effectively",
      "code": "// Terminal commands:\n\n// npm start - runs the \"start\" script\n// npm test - runs the \"test\" script\n// npm run dev - runs the \"dev\" script\n\n// Chain scripts: \"pre\" and \"post\" hooks\n// npm run build\n// 1. Runs \"prebuild\" (if defined)\n// 2. Runs \"build\"\n// 3. Runs \"postbuild\" (if defined)\n\n// Pass arguments:\n// npm run test -- --grep \"auth\"\n// The -- passes remaining args to the script\n\n// Environment variables in scripts:\n// \"start:prod\": \"NODE_ENV=production node app.js\"\n// Cross-platform: use cross-env package\n// \"start:prod\": \"cross-env NODE_ENV=production node app.js\"\n\n// npm bin directory in scripts:\n// npm adds node_modules/.bin to PATH during scripts\n// So you can run:\n// \"test\": \"mocha tests/\"  // without global mocha install\n\n// Commonly used in scripts:\n// \"clean\": \"rimraf dist/\"\n// \"build\": \"mkdirp dist && babel src -d dist\"\n// \"dev\": \"nodemon src/index.js\"\n// \"typecheck\": \"tsc --noEmit\"\n\n// npm run env - shows all env vars available to scripts\n// $npm_package_name = package name\n// $npm_package_version = package version\n// These are available as environment variables",
      "description": "npm scripts provide command shortcuts with automatic PATH including local binaries. pre/post hooks enable lifecycle automation. Use cross-env for cross-platform environment variables. npm run env shows available script environment variables."
    },
    {
      "title": "npm Install Strategies and Lockfile Management",
      "useCase": "Different install strategies explained",
      "code": "// Clean install (for CI/CD)\n// npm ci\n// - Deletes node_modules\n// - Installs from package-lock.json only\n// - Fails if lockfile is missing or out of sync\n// - Faster than npm install (~2x)\n\n// Regular install (for development)\n// npm install\n// - Reads package.json\n// - Updates package-lock.json if needed\n// - Installs from registry\n\n// Install specific version\n// npm install lodash@4.17.21\n\n// Install latest version\n// npm install lodash@latest\n\n// Install globally\n// npm install -g nodemon\n\n// Install as dev dependency\n// npm install -D mocha\n\n// Install as optional dependency\n// npm install -O csv-parser\n\n// Install without saving to package.json\n// npm install --no-save temp-package\n\n// Install from a git repository\n// npm install https://github.com/user/repo.git\n\n// Install from a local path\n// npm install ./local-package\n\n// Audit for vulnerabilities\n// npm audit\n\n// Auto-fix vulnerabilities\n// npm audit fix\n\n// Show outdated packages\n// npm outdated",
      "description": "Different install strategies serve different purposes: npm ci for reproducible builds, npm install for development. npm audit ensures security. npm outdated shows available updates. Git and local path installs enable development on dependencies."
    },
    {
      "title": "Creating and Publishing a Package",
      "useCase": "Publish a package to npm registry",
      "code": "// 1. Create package.json\n// npm init -y\n\n// 2. Login to npm\n// npm login\n\n// 3. Configure package.json for publishing\n{\n  \"name\": \"@my-scope/hello-world\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A simple hello world package\",\n  \"main\": \"index.js\",\n  \"files\": [\"index.js\", \"README.md\"],\n  \"keywords\": [\"hello\", \"world\", \"demo\"],\n  \"license\": \"MIT\",\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git+https://github.com/user/hello-world.git\"\n  },\n  \"bugs\": {\n    \"url\": \"https://github.com/user/hello-world/issues\"\n  },\n  \"homepage\": \"https://github.com/user/hello-world#readme\"\n}\n\n// 4. Create .npmignore (or use .gitignore)\n// .npmignore:\n// tests/\n// src/\n// .git/\n\n// 5. Bump version\n// npm version patch  // 1.0.0 -> 1.0.1\n// npm version minor  // 1.0.1 -> 1.1.0\n// npm version major  // 1.1.0 -> 2.0.0\n\n// 6. Publish\n// npm publish\n\n// For scoped packages (public):\n// npm publish --access public\n\n// 7. Manage distribution tags\n// npm dist-tag add @my-scope/hello-world@1.0.0 beta\n// npm dist-tag ls @my-scope/hello-world\n\n// 8. Deprecate a version\n// npm deprecate @my-scope/hello-world@\"1.0.0\" \"Critical bug fixed in 1.0.1\"",
      "description": "Publishing workflow: initialize, login, configure, version bump, publish. Use .npmignore to exclude files. npm version creates a git tag. dist-tag manages release channels (latest, beta, next). deprecate warns users about problematic versions."
    },
    {
      "title": "npm Workspaces for Monorepos",
      "useCase": "Manage multiple packages in a single repository",
      "code": "// Root package.json\n{\n  \"private\": true,\n  \"workspaces\": [\n    \"packages/*\",\n    \"apps/*\"\n  ],\n  \"scripts\": {\n    \"test\": \"npm run test --workspaces\",\n    \"build\": \"npm run build --workspace=@myapp/core\",\n    \"lint\": \"npx eslint packages/*/src\"\n  }\n}\n\n// Directory structure:\n// root/\n//   package.json (workspaces config)\n//   packages/\n//     core/\n//       package.json (@myapp/core)\n//     utils/\n//       package.json (@myapp/utils)\n//   apps/\n//     web/\n//       package.json (@myapp/web, depends on @myapp/core)\n\n// Install all workspace dependencies:\n// npm install (from root)\n\n// Run script in specific workspace:\n// npm run build --workspace=packages/core\n\n// Run script in all workspaces:\n// npm test --workspaces\n\n// Add dependency to a specific workspace:\n// npm install lodash --workspace=packages/core\n\n// Workspace benefits:\n// - Shared node_modules (hoisted dependencies)\n// - Local packages are symlinked\n// - Single lockfile\n// - Cross-package script coordination\n// - Consistent versioning across packages",
      "description": "npm workspaces enable monorepo management. Multiple packages share a single node_modules and lockfile. Local packages are symlinked for development. Workspace-specific scripts coordinate builds across packages. Tools like Lerna and Nx extend workspace capabilities."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What file locks exact dependency versions?",
      "options": [
        "package.json",
        "package-lock.json",
        "npm-shrinkwrap.json",
        ".npmrc"
      ],
      "answer": 1,
      "explanation": "package-lock.json locks exact versions of all dependencies and sub-dependencies for reproducible builds."
    },
    {
      "question": "What is the difference between npm install and npm ci?",
      "options": [
        "They are identical",
        "npm ci installs from lockfile only, fails if out of sync",
        "npm ci is slower but safer",
        "npm ci installs global packages"
      ],
      "answer": 1,
      "explanation": "npm ci uses only package-lock.json (deletes node_modules first), fails if lockfile is missing or out of sync. Recommended for CI/CD."
    },
    {
      "question": "Which command checks for security vulnerabilities?",
      "options": [
        "npm check",
        "npm audit",
        "npm security",
        "npm scan"
      ],
      "answer": 1,
      "explanation": "npm audit scans dependencies for known vulnerabilities. npm audit fix auto-updates vulnerable packages."
    },
    {
      "question": "What does npm run test -- --coverage do?",
      "options": [
        "Runs test with coverage flag",
        "Passes --coverage to the test script",
        "Errors because of extra args",
        "Enables debug mode"
      ],
      "answer": 1,
      "explanation": "The -- passes remaining arguments to the script. npm run test -- --coverage passes --coverage to the test command defined in package.json."
    },
    {
      "question": "How do you install a package as a dev dependency?",
      "options": [
        "npm install -D package",
        "npm install --dev package",
        "npm install package --save-dev",
        "Both A and C"
      ],
      "answer": 3,
      "explanation": "npm install -D package and npm install package --save-dev both add to devDependencies."
    },
    {
      "question": "What does npx do?",
      "options": [
        "Installs packages globally",
        "Executes a package command without permanent install",
        "Removes packages",
        "Updates npm itself"
      ],
      "answer": 1,
      "explanation": "npx executes a command from a local or remote npm package without permanently installing it. Useful for one-off commands like create-react-app."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-os-module"] = {
  "title": "Node.js OS Module",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "The os module provides operating system-related utility methods and properties for retrieving information about the system Node.js is running on.",
    "It can retrieve CPU architecture, memory usage, network interfaces, system uptime, hostname, home directory, temp directory, and user info.",
    "The os module is synchronous and does not interact with the event loop or libuv - it returns cached or system-call-provided information.",
    "Common use cases: system monitoring tools, build scripts, configuration based on platform, load balancing with CPU core counts."
  ],
  "laymanDefinition": "The OS module is like a system information dashboard for your computer. It tells you things like: \"What type of processor does this computer have?\" (os.arch), \"How much memory is available?\" (os.freemem), \"How long has the computer been running?\" (os.uptime), \"What network connections are active?\" (os.networkInterfaces), \"How many CPU cores are there?\" (os.cpus). This is useful for making decisions like \"start one worker thread per CPU core\" or \"use this much memory for caching\".",
  "deepDive": [
    {
      "heading": "CPU and Architecture Information",
      "text": "os.arch() - returns the CPU architecture (x64, arm, arm64, ia32, mips, ppc, s390). os.cpus() - returns an array of CPU/core objects, each with: model (string description), speed (MHz), times (object with user, nice, sys, idle, irq - cumulative time). os.endianness() - returns \"BE\" or \"LE\" (endianness). os.freemem() - returns free system memory in bytes. os.totalmem() - returns total system memory in bytes. os.loadavg() - returns 1, 5, and 15 minute load averages (Windows returns [0, 0, 0] because load average is a Unix concept). The cpus() times are useful for calculating CPU usage percentages over time by comparing snapshots."
    },
    {
      "heading": "Network and Platform Information",
      "text": "os.networkInterfaces() - returns an object keyed by interface name with arrays of address objects. Each address has: address (IP), netmask, family (\"IPv4\"|\"IPv6\"), mac (MAC address), internal (true for loopback), cidr (CIDR notation), scopeid (IPv6 only). os.hostname() - returns the hostname of the OS. os.platform() - returns \"darwin\", \"linux\", \"win32\", \"aix\", \"freebsd\", \"openbsd\", \"sunos\", \"android\". os.release() - returns the OS release version (e.g., \"10.0.19045\" for Windows 10). os.type() - returns \"Windows_NT\", \"Linux\", \"Darwin\". os.machine() - returns the machine type (Node 18+, e.g., \"x86_64\"). Use os.platform() for conditional code that needs OS-specific behavior."
    },
    {
      "heading": "User, Directory, and Process Information",
      "text": "os.homedir() - returns the current user's home directory. os.tmpdir() - returns the default temp directory (from TMP, TEMP, TMPDIR env vars, or system default). os.userInfo(options) - returns user object: username, uid, gid, shell, homedir. os.EOL - the OS end-of-line marker: \"\n\" on POSIX, \"\r\n\" on Windows. os.devNull - the null device path: \"/dev/null\" on POSIX, \"\\\\.\\nul\" on Windows (Node 16+). os.availableParallelism() - returns the number of CPUs available (Node 19+, respects CPU affinity settings). os.version() - returns the OS version as a string (Node 13+). os.uptime() - returns system uptime in seconds. Use os.EOL for cross-platform file writing instead of hardcoded \"\n\"."
    },
    {
      "heading": "Memory and Process Priority",
      "text": "os.freemem() and os.totalmem() return bytes. For human-readable formatting: (bytes / 1024 / 1024).toFixed(2) + \" MB\". os.getPriority([pid]) - returns process priority (-20 to 19, lower = higher priority). os.setPriority([pid, ]priority) - sets process priority. Priority values: -20 (highest) to 19 (lowest). The default priority is 0. Setting priority requires appropriate OS privileges. os.constants.priority - contains PRIORITY_LOW (19), PRIORITY_BELOW_NORMAL (10), PRIORITY_NORMAL (0), PRIORITY_ABOVE_NORMAL (-7), PRIORITY_HIGH (-14), PRIORITY_HIGHEST (-20). These are used with os.setPriority()."
    },
    {
      "heading": "Practical Applications of OS Module",
      "text": "(1) Clustering: os.cpus().length to determine number of workers. (2) Memory monitoring: os.freemem() / os.totalmem() for health checks. (3) Platform detection: os.platform() for platform-specific code paths. (4) Temp files: path.join(os.tmpdir(), \"my-app\") for temporary storage. (5) Home directory config: path.join(os.homedir(), \".myapprc\") for user config files. (6) Network discovery: os.networkInterfaces() to find local IP addresses. (7) Load balancing: os.loadavg() to decide when to scale. (8) Uptime tracking: os.uptime() for monitoring. The os module methods are computationally cheap - they are direct system calls or cached values. Call them frequently in monitoring loops without performance concerns."
    }
  ],
  "interviewAnswer": "The os module provides system information. Key methods: os.arch() (CPU arch), os.cpus() (CPU details with times), os.freemem()/os.totalmem() (memory), os.platform() (OS type), os.hostname(), os.networkInterfaces() (IP/MAC addresses), os.homedir() (home directory), os.tmpdir() (temp dir), os.uptime() (system runtime). os.EOL is the platform EOL marker. os.availableParallelism() returns available CPU count (Node 19+). Common uses: clustering (cpus().length), platform detection (platform()), temp storage (tmpdir()), memory monitoring (freemem/totalmem). The module is synchronous and uses direct system calls.",
  "interviewQuestions": [
    {
      "question": "How do you determine the number of CPU cores in Node.js?",
      "answer": "os.cpus().length returns the number of logical CPU cores. This is commonly used to set the number of cluster workers or thread pool size. Each entry in the array represents a logical core (including hyperthreading)."
    },
    {
      "question": "What is the difference between os.platform() and os.arch()?",
      "answer": "os.platform() returns the OS type: \"linux\", \"darwin\", \"win32\". os.arch() returns the CPU architecture: \"x64\", \"arm\", \"arm64\". platform() is for OS-specific behavior; arch() is for native addon compatibility."
    },
    {
      "question": "How do you get the home directory of the current user?",
      "answer": "os.homedir() returns the home directory (e.g., /home/user or C:\\Users\\Name). It respects the HOME (POSIX) or USERPROFILE (Windows) environment variables."
    },
    {
      "question": "What does os.cpus() return?",
      "answer": "An array of objects, each with: model (string, e.g., \"Intel(R) Core(TM) i7-8700K\"), speed (MHz), times (object with user, nice, sys, idle, irq in milliseconds). Compare snapshots of times to calculate CPU usage percentage."
    },
    {
      "question": "How do you get the system temp directory?",
      "answer": "os.tmpdir() returns the default temp directory. On POSIX: /tmp or $TMPDIR. On Windows: %TEMP% or %TMP%. Use path.join(os.tmpdir(), \"myapp\") for temporary files."
    },
    {
      "question": "What is os.EOL and why is it useful?",
      "answer": "os.EOL is the end-of-line marker: \"\n\" on POSIX, \"\r\n\" on Windows. Use it when writing text files to ensure platform-appropriate line endings. Without it, files may show as one line on Windows or with ^M characters on POSIX."
    },
    {
      "question": "What does os.networkInterfaces() return?",
      "answer": "An object with network interface names as keys. Each value is an array of address objects with: address (IP), netmask, family (\"IPv4\"/\"IPv6\"), mac (colon-separated MAC), internal (loopback flag), cidr (CIDR notation). Filter by !internal to get external IPs."
    },
    {
      "question": "How do you check available system memory?",
      "answer": "os.freemem() returns free memory in bytes. os.totalmem() returns total memory. Calculate: os.freemem() / os.totalmem() for the percentage of free memory. For human-readable: (bytes / 1024 / 1024 / 1024).toFixed(2) + \" GB\"."
    },
    {
      "question": "What is the difference between os.uptime() and process.uptime()?",
      "answer": "os.uptime() returns how long the SYSTEM has been running (in seconds). process.uptime() returns how long the NODE PROCESS has been running. system uptime is useful for detecting system restarts; process uptime is useful for detecting process restarts."
    },
    {
      "question": "How do you find the local IP address of the machine?",
      "answer": "Iterate os.networkInterfaces(), filter for non-internal IPv4 addresses. The first non-internal address is typically the primary network interface IP. Use a library like \"ip\" for convenience."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">OS Module - System Information Categories</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">CPU & Memory</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">arch, cpus, freemem, totalmem</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Network & Platform</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">networkInterfaces, platform, release</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">User & Directories</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">homedir, tmpdir, userInfo, EOL</text></svg>",
  "codeExamples": [
    {
      "title": "CPU Core and Memory Information",
      "useCase": "Get system resources for clustering and monitoring",
      "code": "var os = require(\"os\");\n\n// CPU information\nvar cpus = os.cpus();\nconsole.log(\"CPU cores:\", cpus.length);\nconsole.log(\"CPU model:\", cpus[0].model);\nconsole.log(\"CPU speed:\", cpus[0].speed, \"MHz\");\n\n// Calculate CPU usage from first core\nvar times = cpus[0].times;\nvar total = times.user + times.nice + times.sys + times.idle + times.irq;\nconsole.log(\"CPU idle percentage:\", ((times.idle / total) * 100).toFixed(1) + \"%\");\n\n// Memory information\nvar freeMemMB = os.freemem() / 1024 / 1024;\nvar totalMemMB = os.totalmem() / 1024 / 1024;\nconsole.log(\"Free memory:\", freeMemMB.toFixed(2), \"MB\");\nconsole.log(\"Total memory:\", totalMemMB.toFixed(2), \"MB\");\nconsole.log(\"Memory usage:\", ((1 - freeMemMB / totalMemMB) * 100).toFixed(1) + \"%\");\n\n// Load average (Unix only, Windows returns [0,0,0])\nvar load = os.loadavg();\nconsole.log(\"Load average (1m, 5m, 15m):\", load.map(function(v) {\n  return v.toFixed(2);\n}).join(\", \"));",
      "description": "os.cpus() gives per-core CPU details. os.freemem() and os.totalmem() provide memory stats. os.loadavg() provides Unix load averages. CPU idle percentage is calculated from cumulative times."
    },
    {
      "title": "Network Interface Discovery",
      "useCase": "Find local IP addresses and MAC addresses",
      "code": "var os = require(\"os\");\n\nvar interfaces = os.networkInterfaces();\nvar addresses = [];\n\nObject.keys(interfaces).forEach(function(name) {\n  interfaces[name].forEach(function(info) {\n    if (info.family === \"IPv4\" && !info.internal) {\n      addresses.push({\n        name: name,\n        address: info.address,\n        netmask: info.netmask,\n        mac: info.mac,\n        cidr: info.cidr\n      });\n    }\n  });\n});\n\nconsole.log(\"External IPv4 addresses:\");\naddresses.forEach(function(a) {\n  console.log(\"  \" + a.name + \": \" + a.address + \"/\" + a.netmask);\n  console.log(\"    MAC: \" + a.mac);\n  console.log(\"    CIDR: \" + a.cidr);\n});\n\n// Simple server that shows its own IP\nif (addresses.length > 0) {\n  console.log(\"Server will bind to: \" + addresses[0].address);\n}",
      "description": "os.networkInterfaces() returns all network adapters. Filter for IPv4 and non-internal to find the external IP. MAC addresses are useful for hardware identification in licensing and network tools."
    },
    {
      "title": "Cross-Platform EOL and Directory Usage",
      "useCase": "Write cross-platform compatible code with OS module",
      "code": "var os = require(\"os\");\nvar fs = require(\"fs\");\nvar path = require(\"path\");\n\n// Use os.EOL for platform-appropriate line endings\nvar lines = [\"Line 1\", \"Line 2\", \"Line 3\"];\nvar content = lines.join(os.EOL);\n\n// Write to temp directory\nvar tmpFile = path.join(os.tmpdir(), \"example-\" + Date.now() + \".txt\");\nfs.writeFileSync(tmpFile, content, \"utf8\");\nconsole.log(\"Wrote to:\", tmpFile);\n\n// Read user home directory for config\nvar configPath = path.join(os.homedir(), \".myapp\", \"config.json\");\nconsole.log(\"Config location:\", configPath);\n\n// Platform detection\nconsole.log(\"Platform:\", os.platform());\nconsole.log(\"Type:\", os.type());\nconsole.log(\"Release:\", os.release());\nconsole.log(\"Architecture:\", os.arch());\nconsole.log(\"Hostname:\", os.hostname());\n\n// User info\nvar userInfo = os.userInfo();\nconsole.log(\"Username:\", userInfo.username);\nconsole.log(\"Home:\", userInfo.homedir);\n\n// System uptime\nvar uptimeHours = os.uptime() / 3600;\nconsole.log(\"System uptime:\", uptimeHours.toFixed(1), \"hours\");\n\n// Process uptime\nconsole.log(\"Process uptime:\", process.uptime().toFixed(1), \"seconds\");",
      "description": "os.EOL ensures correct line endings on each platform. os.tmpdir() and os.homedir() provide cross-platform directory paths. os.platform() enables conditional code for OS-specific behavior."
    },
    {
      "title": "Process Priority and Available Parallelism",
      "useCase": "Manage process priority and detect available CPUs",
      "code": "var os = require(\"os\");\n\n// Available parallelism (Node 19+)\nvar availableCpus = os.availableParallelism();\nconsole.log(\"Available CPUs:\", availableCpus);\nconsole.log(\"Total logical CPUs:\", os.cpus().length);\n\n// These numbers may differ due to CPU affinity/cgroups\n\n// Get current priority (POSIX: -20 to 19)\ntry {\n  var priority = os.getPriority();\n  console.log(\"Current priority:\", priority);\n  console.log(\"Priority label:\", getPriorityLabel(priority));\n} catch (err) {\n  console.log(\"Priority not supported on this platform\");\n}\n\nfunction getPriorityLabel(p) {\n  if (p <= -20) return \"HIGHEST\";\n  if (p <= -14) return \"HIGH\";\n  if (p <= -7) return \"ABOVE_NORMAL\";\n  if (p <= 0) return \"NORMAL\";\n  if (p <= 10) return \"BELOW_NORMAL\";\n  return \"LOW\";\n}\n\n// Set lower priority for background tasks\ntry {\n  os.setPriority(os.constants.priority.PRIORITY_BELOW_NORMAL);\n  console.log(\"Priority set to BELOW_NORMAL\");\n} catch (err) {\n  console.log(\"Cannot set priority:\", err.message);\n}",
      "description": "os.availableParallelism() (Node 19+) respects cgroup/container CPU limits unlike os.cpus().length. Process priority allows background tasks to yield CPU to foreground processes."
    },
    {
      "title": "System Health Monitoring Dashboard",
      "useCase": "Build a simple health check endpoint",
      "code": "var os = require(\"os\");\nvar http = require(\"http\");\n\nfunction getHealth() {\n  var totalMem = os.totalmem();\n  var freeMem = os.freemem();\n  var memUsage = ((1 - freeMem / totalMem) * 100).toFixed(1);\n\n  var uptimeDays = (os.uptime() / 86400).toFixed(1);\n\n  var cpus = os.cpus();\n  var cpuIdle = cpus.reduce(function(sum, cpu) {\n    var total = cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq;\n    return sum + (cpu.times.idle / total) * 100;\n  }, 0) / cpus.length;\n\n  return {\n    status: \"healthy\",\n    hostname: os.hostname(),\n    platform: os.platform() + \" \" + os.release(),\n    arch: os.arch(),\n    cpus: cpus.length,\n    cpuIdle: parseFloat(cpuIdle.toFixed(1)),\n    memory: {\n      total: (totalMem / 1073741824).toFixed(2) + \" GB\",\n      free: (freeMem / 1073741824).toFixed(2) + \" GB\",\n      usage: memUsage + \"%\"\n    },\n    uptime: uptimeDays + \" days\",\n    loadAvg: os.loadavg().map(function(v) { return v.toFixed(2); })\n  };\n}\n\nhttp.createServer(function(req, res) {\n  if (req.url === \"/health\") {\n    res.writeHead(200, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify(getHealth(), null, 2));\n  } else {\n    res.writeHead(404);\n    res.end(\"Not found\");\n  }\n}).listen(3000, function() {\n  console.log(\"Health endpoint: http://localhost:3000/health\");\n});",
      "description": "The OS module is ideal for system monitoring. This health check endpoint provides CPU, memory, uptime, and load information for operational dashboards and auto-scaling decisions."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How do you get the number of logical CPU cores?",
      "options": [
        "os.arch()",
        "os.cpus().length",
        "os.totalmem()",
        "os.platform()"
      ],
      "answer": 1,
      "explanation": "os.cpus().length returns the number of logical CPU cores. Use this for cluster worker count or thread pool sizing."
    },
    {
      "question": "What does os.platform() return for Windows?",
      "options": [
        "\"windows\"",
        "\"win\"",
        "\"win32\"",
        "\"Windows_NT\""
      ],
      "answer": 2,
      "explanation": "os.platform() returns \"win32\" for Windows. os.type() returns \"Windows_NT\". platform() is used for conditional OS-specific code."
    },
    {
      "question": "How do you get the system temp directory?",
      "options": [
        "os.homedir()",
        "os.tmpdir()",
        "os.userInfo().tmpdir",
        "process.env.TEMP"
      ],
      "answer": 1,
      "explanation": "os.tmpdir() returns the system temp directory. It checks TMPDIR, TMP, TEMP env vars and falls back to the platform default."
    },
    {
      "question": "What is os.EOL on POSIX systems?",
      "options": [
        "\"\\r\\n\"",
        "\"\\n\"",
        "\"\\r\"",
        "\"0x0D0A\""
      ],
      "answer": 1,
      "explanation": "os.EOL is \"\n\" on POSIX (Linux/Mac) and \"\r\n\" on Windows. Use it for cross-platform file writing."
    },
    {
      "question": "Which method returns the local IP addresses?",
      "options": [
        "os.hostname()",
        "os.networkInterfaces()",
        "os.cpus()",
        "os.userInfo()"
      ],
      "answer": 1,
      "explanation": "os.networkInterfaces() returns an object with network interface names and their address details (IP, netmask, MAC, family)."
    },
    {
      "question": "What is the difference between os.uptime() and process.uptime()?",
      "options": [
        "They return the same value",
        "os.uptime() is system uptime, process.uptime() is process uptime",
        "process.uptime() returns milliseconds",
        "os.uptime() only works on Linux"
      ],
      "answer": 1,
      "explanation": "os.uptime() returns how long the OS has been running. process.uptime() returns how long the current Node.js process has been running."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-package-management"] = {
  "title": "Node.js Package Management Ecosystem",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "The Node.js package ecosystem includes npm (default), Yarn (alternative by Meta), and pnpm (fast, disk-efficient). Each offers different trade-offs for speed, disk usage, and security.",
    "Package managers handle dependency resolution, version management, lockfiles, caching, and script execution for Node.js projects.",
    "Key package manager features: deterministic installs (lockfiles), offline caching, workspace/monorepo support, security auditing, and performance optimizations.",
    "The npm registry (registry.npmjs.org) is the central repository hosting over 2 million packages, used by all major package managers."
  ],
  "laymanDefinition": "Package management in Node.js is like having different supply chain systems for your project. npm is the default courier that comes with Node.js - reliable and universal. Yarn is like a faster courier that started as an improvement on npm, offering better caching and deterministic installs. pnpm is like a warehouse that stores packages in a central location and creates shortcuts - saving massive disk space when you have many projects using the same packages. All three use the same catalog (npm registry) and the same shopping lists (package.json), but they differ in how they fetch, store, and organize packages.",
  "deepDive": [
    {
      "heading": "npm vs Yarn vs pnpm - Key Differences",
      "text": "(1) npm: Default, bundled with Node.js. Uses flat node_modules with nesting for conflicts. Lockfile: package-lock.json (v2 with integrity hashes). Features: npx, workspaces, audit. Install speed: moderate. Disk usage: moderate (duplicates across projects). (2) Yarn: Created by Meta in 2016. Lockfile: yarn.lock (deterministic). Features: Plug'n'Play (no node_modules), workspaces, offline cache, resolution overrides. Install speed: fast (parallel downloads, caching). Disk usage: similar to npm. Yarn v2/v3 uses Plug'n'Play (generates a single .pnp.cjs file instead of node_modules). (3) pnpm: Created in 2017. Uses content-addressable storage - packages are stored in a global store (~/.pnpm-store) and node_modules uses hard links/symlinks. This saves massive disk space. Lockfile: pnpm-lock.yaml. Features: strict module resolution (prevents access to undeclared dependencies), workspaces, fast. Install speed: very fast. Disk usage: minimal (single copy of each package version across all projects)."
    },
    {
      "heading": "Lockfiles and Reproducible Builds",
      "text": "Lockfiles ensure that every install produces the exact same node_modules tree. (1) package-lock.json (npm) - JSON format, v2 includes integrity hashes, supported from npm v7+. (2) yarn.lock (Yarn) - YAML-like format, sorted by package name. (3) pnpm-lock.yaml (pnpm) - YAML format, compact. Lockfile contents: resolved version (not range), resolved URL, integrity hash (SHA512), sub-dependencies list. Benefits: (a) Reproducible builds - CI gets exact same versions as development. (b) Faster installs - resolve versions from lockfile instead of recalculating. (c) Security - integrity hashes verify package content. (d) Deterministic - same input produces same output. Best practices: (1) Always commit lockfiles. (2) Use npm ci / yarn install --frozen-lockfile / pnpm install --frozen-lockfile in CI. (3) Review lockfile changes in PRs to catch unexpected dependency updates."
    },
    {
      "heading": "Package Registry and Mirroring",
      "text": "The npm registry (registry.npmjs.org) is the primary package registry. Alternatives: (1) GitHub Packages - registry for packages published to GitHub. (2) Verdaccio - self-hosted npm registry. (3) Unpkg - CDN for npm packages. (4) jsDelivr - CDN for npm packages. (5) Cloudsmith - commercial private registry. Registry configuration: .npmrc file - registry=https://registry.npmjs.org/, @scope:registry=https://npm.pkg.github.com/. Authentication: npm login or NPM_TOKEN env var. Mirroring: using npm mirror for regions with poor connectivity - set registry=https://registry.npmmirror.com. Corporate registries: many companies run internal npm registries (Verdaccio, Artifactory) for security and caching. Publishing to custom registries: npm publish --registry=https://internal-registry.company.com."
    },
    {
      "heading": "Monorepo Support and Workspaces",
      "text": "Monorepo approaches: (1) npm workspaces - built-in since npm v7. \"workspaces\": [\"packages/*\"]. Shared node_modules, single lockfile. (2) Yarn workspaces - similar concept, compatible with npm workspaces. (3) pnpm workspaces - uses pnpm-workspace.yaml. Strict isolation between packages. (4) Lerna - popular tool for managing monorepos (integrates with npm/Yarn/pnpm). (5) Nx - build system with monorepo support, dependency graph, caching. (6) Turborepo - build orchestration for monorepos. (7) Rush - Microsoft's monorepo manager. Workspace benefits: shared dependencies (hoisted), single lockfile, cross-package commands (npm run test --workspaces), local package symlinks. Trade-offs: hoisting issues (package sees undeclared dependencies), version conflicts between packages. pnpm's strict mode enforces that packages can only use their declared dependencies."
    },
    {
      "heading": "Security, Supply Chain, and Best Practices",
      "text": "(1) Supply chain attacks: malicious packages targeting npm. Famous attacks: event-stream (copay bitcoin theft), ua-parser-js, eslint-scope. (2) Malware types: typosquatting (event-stream vs event-stream), dependency confusion, protestware. (3) Mitigation: (a) npm audit for vulnerability scanning. (b) npm fund to check funding sources. (c) Use Snyk, Socket.dev, or Dependabot for continuous monitoring. (d) Lockfile integrity hashes verify package content. (e) npm v9+ supports package signing. (f) npm v10+ includes npm vet for package validation. (4) Best practices: (a) Pin versions (use lockfile). (b) Review package source for critical dependencies. (c) Use fewer dependencies. (d) Regularly update dependencies. (e) Use npm ci in CI/CD. (f) Configure 2FA for npm publishing. (g) Use .npmrc for security configuration (audit-level=high). (h) Consider using pnpm for strict module isolation (prevents undeclared dependency access)."
    }
  ],
  "interviewAnswer": "The Node.js package ecosystem offers three main package managers: npm (default, bundled, flat node_modules), Yarn (fast, Plug'n'Play, yarn.lock), and pnpm (content-addressable store, disk-efficient, strict). All use the npm registry. Lockfiles (package-lock.json, yarn.lock, pnpm-lock.yaml) ensure reproducible builds by locking exact versions with integrity hashes. Monorepo support via workspaces. Security: npm audit for vulnerabilities, supply chain attack awareness (typosquatting, dependency confusion), package signing. Best practices: commit lockfiles, use frozen installs in CI, audit regularly, pin production dependencies, review dependency changes, use 2FA for publishing.",
  "interviewQuestions": [
    {
      "question": "What are the main differences between npm, Yarn, and pnpm?",
      "answer": "npm: default, flat node_modules, moderate speed, bundled with Node. Yarn: fast parallel installs, yarn.lock, Plug'n'Play mode (no node_modules). pnpm: content-addressable store (hard links), minimal disk usage, strict module isolation, pnpm-lock.yaml. All use the same npm registry."
    },
    {
      "question": "What is the advantage of pnpm's content-addressable storage?",
      "answer": "pnpm stores packages in a global store (~/.pnpm-store) and creates hard links in node_modules. If 10 projects use the same version of lodash, only one copy exists on disk. This saves significant disk space compared to npm/Yarn which duplicate packages per project."
    },
    {
      "question": "What is Yarn Plug'n'Play (PnP)?",
      "answer": "PnP is Yarn's alternative to node_modules. Instead of copying files, PnP generates a .pnp.cjs file that maps package names to their locations in the cache. This eliminates node_modules entirely, reduces install time, and improves performance. Requires compatibility from all dependencies."
    },
    {
      "question": "Why should you commit lockfiles?",
      "answer": "Lockfiles ensure reproducible builds. Without them, different machines may install different versions of dependencies (sub-dependencies may release updates). Lockfiles include integrity hashes for security. CI uses --frozen-lockfile to detect unexpected dependency changes."
    },
    {
      "question": "What is a supply chain attack in the npm ecosystem?",
      "answer": "A supply chain attack compromises a popular npm package to distribute malware to its users. Examples: event-stream (inserted malicious code to steal cryptocurrency), ua-parser-js (compromised to mine crypto). Mitigation: audit dependencies, verify package integrity, use fewer dependencies."
    },
    {
      "question": "What is dependency confusion?",
      "answer": "A security vulnerability where a private package name matches a public package on the npm registry. npm may resolve to the public package (with higher version) instead of the private one. Mitigation: use scoped packages (@company/package), configure .npmrc to scope-specific registries, use npm vet (npm 10+)."
    },
    {
      "question": "How do package managers handle monorepos?",
      "answer": "npm/Yarn/pnpm workspaces allow a single repository to contain multiple packages. They hoist shared dependencies to a root node_modules, create symlinks between workspace packages, and support cross-package scripts (npm run test --workspaces). Tools like Lerna, Nx, and Turborepo extend workspace capabilities."
    },
    {
      "question": "What is npm vet?",
      "answer": "npm vet (npm 10+) validates a package before publishing. It checks for: deprecated packages, mismatched metadata, unfilled package.json fields, missing files, and potential security issues. It helps catch problems before users encounter them."
    },
    {
      "question": "How do you choose between npm, Yarn, and pnpm?",
      "answer": "Consider: (1) npm - standard, no additional tooling needed, widely compatible. (2) Yarn - faster installs, PnP mode if compatible, strong monorepo support. (3) pnpm - best disk usage, strict dependency isolation (prevents undeclared dependency access), fastest for large projects. For new projects: pnpm is increasingly recommended. For existing: stick with what the project uses."
    },
    {
      "question": "What is the purpose of .npmrc?",
      "answer": ".npmrc configures npm behavior: registry URL, authentication tokens, proxy settings, cache location, audit level, package resolution settings. Per-project .npmrc, per-user ~/.npmrc, and global npm config. Example: registry=https://registry.npmjs.org/, @mycompany:registry=https://npm.pkg.github.com/"
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Node.js Package Manager Comparison</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">npm</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Flat node_modules, bundled</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Yarn</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Plug'n'Play, fast parallel</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">pnpm</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Content-addressable, strict</text></svg>",
  "codeExamples": [
    {
      "title": "Migrating Between Package Managers",
      "useCase": "Convert a project between npm, Yarn, and pnpm",
      "code": "// Converting from npm to Yarn:\n// 1. Install Yarn: npm install -g yarn\n// 2. Generate yarn.lock: yarn import\n//    (converts package-lock.json to yarn.lock)\n// 3. Delete package-lock.json and node_modules\n// 4. Install with Yarn: yarn install\n\n// Converting from npm/Yarn to pnpm:\n// 1. Install pnpm: npm install -g pnpm\n// 2. Generate pnpm-lock.yaml: pnpm import\n// 3. Delete node_modules and lockfile\n// 4. Install with pnpm: pnpm install\n\n// Converting from Yarn to npm:\n// 1. Delete node_modules and yarn.lock\n// 2. Install with npm: npm install\n// 3. Generates package-lock.json\n\n// Running the same commands across managers:\n// npm run build   | yarn build    | pnpm build\n// npm test         | yarn test     | pnpm test\n// npm install      | yarn          | pnpm install\n// npm ci           | yarn --frozen-lockfile | pnpm install --frozen-lockfile\n// npx command      | yarn dlx command | pnpm dlx command\n\n// CI configuration examples:\n// GitHub Actions for npm:\n// - run: npm ci\n// - run: npm test\n\n// GitHub Actions for pnpm:\n// - uses: pnpm/action-setup@v2\n// - run: pnpm install\n// - run: pnpm test",
      "description": "Migrating between package managers requires generating the appropriate lockfile and reinstalling. Each manager supports import to convert from another manager's lockfile. CI configuration differs slightly between managers."
    },
    {
      "title": "Using pnpm for Monorepo with Strict Isolation",
      "useCase": "Set up a pnpm workspace with strict dependency isolation",
      "code": "// pnpm-workspace.yaml (root)\npackages:\n  - \"packages/*\"\n  - \"apps/*\"\n\n// .npmrc (root, for pnpm strict mode)\n// shamefully-hoist=false (default) - strict isolation\n// strict-peer-dependencies=true - enforce peer deps\n\n// package.json (root)\n{\n  \"private\": true,\n  \"scripts\": {\n    \"build\": \"pnpm -r build\",\n    \"test\": \"pnpm -r test\",\n    \"lint\": \"pnpm -r lint\",\n    \"changeset\": \"changeset\"\n  },\n  \"devDependencies\": {\n    \"typescript\": \"^5.0.0\"\n  }\n}\n\n// packages/core/package.json\n{\n  \"name\": \"@myapp/core\",\n  \"dependencies\": {\n    \"lodash\": \"^4.17.21\"\n  }\n}\n\n// apps/web/package.json\n{\n  \"name\": \"@myapp/web\",\n  \"dependencies\": {\n    \"@myapp/core\": \"workspace:*\",\n    \"react\": \"^18.0.0\"\n  }\n}\n\n// Commands:\n// pnpm install - installs everything\n// pnpm -r run build - runs build in all packages\n// pnpm --filter @myapp/web add axios - adds dep to specific package\n// pnpm ls - shows dependency tree\n\n// Benefits of pnpm strict mode:\n// - @myapp/web cannot access lodash directly\n//   (only @myapp/core declared it)\n// - Prevents undeclared dependency usage\n// - Catches missing dependency bugs early",
      "description": "pnpm's strict mode enforces that packages can only import what they declare in their own dependencies. This catches bugs where a package accidentally uses a hoisted dependency that is not declared in its own package.json. The workspace:* protocol links local packages."
    },
    {
      "title": "Package Publishing with Changesets",
      "useCase": "Manage versioning and changelogs in monorepos",
      "code": "// .changeset/config.json\n{\n  \"$schema\": \"https://unpkg.com/@changesets/config@2/schema.json\",\n  \"changelog\": \"@changesets/cli/changelog\",\n  \"commit\": true,\n  \"linked\": [],\n  \"access\": \"public\",\n  \"baseBranch\": \"main\",\n  \"updateInternalDependencies\": \"patch\",\n  \"ignore\": []\n}\n\n// Creating a changeset:\n// npx changeset\n// Select packages that changed\n// Choose bump type (patch, minor, major)\n// Write summary (becomes changelog entry)\n\n// Changeset file (.changeset/seven-cats-itch.md):\n// ---\n// \"@myapp/core\": minor\n// \"@myapp/web\": patch\n// ---\n//\n// Added new utility functions to core\n// Fixed web app rendering issue\n\n// Version all packages:\n// npx changeset version\n// - Reads all changeset files\n// - Bumps versions accordingly\n// - Updates changelogs\n// - Removes changeset files\n\n// Publish:\n// npx changeset publish\n// - Builds packages if needed\n// - Publishes to npm\n// - Creates git tags\n\n// CI pipeline:\n// 1. pnpm changeset version (on main)\n// 2. pnpm build\n// 3. pnpm changeset publish\n// 4. git push --tags",
      "description": "Changesets is a popular tool for monorepo versioning. Developers create changeset files describing their changes. At release time, changeset version bumps all affected packages, generates changelogs, and publishes. This provides a structured workflow for coordinated releases."
    },
    {
      "title": "Dependency Auditing and Security Scanning",
      "useCase": "Comprehensive security checks for Node.js projects",
      "code": "// npm audit example output:\n// === npm audit security report ===\n//\n// # Run  npm install lodash@4.17.20  to resolve 1 vulnerability\n// SEMVER WARNING: Recommended action is a potentially breaking change\n//\n// ┌───────────────┬──────────────────────────────────────┐\n// │ Critical      │ Prototype Pollution in lodash        │\n// ├───────────────┼──────────────────────────────────────┤\n// │ Package       │ lodash                               │\n// ├───────────────┼──────────────────────────────────────┤\n// │ Dependency    │ express > lodash                     │\n// ├───────────────┼──────────────────────────────────────┤\n// │ Patched in    │ >=4.17.20                            │\n// └───────────────┴──────────────────────────────────────┘\n\n// Automated security in CI:\n// package.json:\n\"scripts\": {\n  \"audit\": \"npm audit --audit-level=high\",\n  \"ci\": \"npm ci && npm audit --audit-level=high\"\n}\n\n// Using Snyk for continuous monitoring:\n// npx snyk test\n// npx snyk monitor (continuous monitoring)\n\n// Using Socket.dev:\n// npx socket scan\n\n// Dependabot (GitHub):\n// .github/dependabot.yml\n// version: 2\n// updates:\n//   - package-ecosystem: \"npm\"\n//     directory: \"/\"\n//     schedule:\n//       interval: \"weekly\"\n\n// npm package scoring:\n// npm uses a package score (quality, popularity, maintenance)\n// View: npm view <package>\n// npm provides the score via the registry API\n\n// Checking package signatures:\n// npm audit signatures (npm 9+)\n// Verifies installed packages are signed by authorized maintainers",
      "description": "Security scanning is crucial for Node.js projects. npm audit checks known vulnerabilities. Snyk and Socket.dev provide deeper analysis. Dependabot automates dependency updates. Package signatures verify package authenticity. CI should fail on high/critical vulnerabilities."
    },
    {
      "title": "Offline Package Installation and Caching",
      "useCase": "Work without internet access",
      "code": "// npm cache management:\n// Cache location: ~/.npm (_cacache directory)\n// npm cache ls - list cache contents (limited)\n// npm cache verify - verify and clean cache\n// npm cache clean --force - clear all cache\n\n// Install from cache (offline):\n// npm install --prefer-offline\n// npm install --offline (fail if not cached)\n\n// Pre-populate cache:\n// npm pack <package>  // downloads tarball\n// npm install <tarball>  // install from file\n\n// Yarn offline mirror:\n// yarn config set yarn-offline-mirror ./offline-mirror\n// yarn install (downloads to offline-mirror)\n// yarn install --offline (uses mirror)\n\n// pnpm store management:\n// Store location: ~/.pnpm-store (content-addressable)\n// pnpm store status - check store integrity\n// pnpm store prune - remove unused packages\n// pnpm install --offline - install from store\n\n// Verdaccio (self-hosted registry):\n// npm install -g verdaccio\n// verdaccio (starts local registry at localhost:4873)\n// npm set registry http://localhost:4873/\n// Publishes to and caches from upstream registry\n\n// Creating tarballs for air-gapped environments:\n// npm pack (creates .tgz)\n// Copy .tgz files to air-gapped machine\n// npm install ./package-1.0.0.tgz\n\n// Offline development best practices:\n// 1. Pre-download all packages (npm install once)\n// 2. Use --prefer-offline flag\n// 3. Cache registry metadata\n// 4. Use local registry (Verdaccio) for teams",
      "description": "Offline installation requires cached packages. npm cache stores downloaded packages. Yarn offline mirror provides explicit offline support. pnpm's content-addressable store naturally supports offline. Verdaccio provides a full local registry proxy with caching. For air-gapped environments, pack tarballs explicitly."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which package manager uses content-addressable storage for disk efficiency?",
      "options": [
        "npm",
        "Yarn",
        "pnpm",
        "Lerna"
      ],
      "answer": 2,
      "explanation": "pnpm stores packages in a global content-addressable store and creates hard links, sharing a single copy across all projects."
    },
    {
      "question": "What is Yarn Plug'n'Play?",
      "options": [
        "A plugin system for Yarn",
        "An alternative to node_modules using a single file mapping",
        "A new package format",
        "A caching mechanism"
      ],
      "answer": 1,
      "explanation": "PnP replaces node_modules with a .pnp.cjs file that maps package names to cache locations, eliminating file copying."
    },
    {
      "question": "Why is dependency confusion a security risk?",
      "options": [
        "Dependencies crash frequently",
        "A public package with the same name as a private one can be substituted",
        "Dependencies are confusing to read",
        "npm confuses package versions"
      ],
      "answer": 1,
      "explanation": "Dependency confusion: npm may resolve to a public malicious package with the same name as a private one. Use scoped packages (@scope/name) and .npmrc scoped registries."
    },
    {
      "question": "What is the advantage of committing lockfiles?",
      "options": [
        "Smaller repository size",
        "Reproducible builds and integrity verification",
        "Faster npm install",
        "Better code documentation"
      ],
      "answer": 1,
      "explanation": "Lockfiles lock exact versions and include integrity hashes, ensuring every install produces the same dependency tree."
    },
    {
      "question": "Which tool provides continuous dependency updates?",
      "options": [
        "npm audit",
        "Snyk",
        "Dependabot",
        "npm vet"
      ],
      "answer": 2,
      "explanation": "Dependabot (GitHub) creates PRs for dependency updates. Snyk provides vulnerability monitoring. npm audit checks on demand. npm vet validates packages before publish."
    },
    {
      "question": "What does pnpm's strict mode prevent?",
      "options": [
        "Slow installs",
        "Access to undeclared dependencies",
        "Disk space usage",
        "Version conflicts"
      ],
      "answer": 1,
      "explanation": "pnpm strict mode prevents packages from importing dependencies they did not declare in their own package.json, catching bugs from hoisted undeclared dependencies."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-path-module"] = {
  "title": "Node.js Path Module",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "The path module provides utilities for working with file and directory paths in a cross-platform way, handling differences between POSIX (/) and Windows (\\) path separators.",
    "Key functions: path.join(), path.resolve(), path.parse(), path.format(), path.basename(), path.dirname(), path.extname(), and path.relative().",
    "path.join() concatenates path segments using the platform-specific separator. path.resolve() resolves a sequence of paths to an absolute path.",
    "The path module does NOT check whether a path actually exists - it only performs string manipulation on path strings."
  ],
  "laymanDefinition": "The Path module is like a GPS for file locations on your computer. Different operating systems use different formats for file paths - Windows uses backslashes (C:\\Users\\Name) while Mac/Linux use forward slashes (/home/user). The Path module handles these differences automatically so your code works everywhere without modification. It can join path pieces together correctly (path.join), find the file name from a full path (path.basename), extract the file extension (path.extname), figure out the parent directory (path.dirname), and convert relative paths to absolute ones (path.resolve).",
  "deepDive": [
    {
      "heading": "Path Joining and Resolution",
      "text": "path.join([...paths]) - joins all segments with the platform separator, normalizes the result. path.resolve([...paths]) - resolves to an absolute path. If the first segment starts with /, it is treated as root. If no absolute path is produced, the current working directory is prepended. path.resolve() does NOT check if the path exists - it only performs string manipulation. Key difference: path.join(\"a\", \"b\", \"..\", \"c\") => \"a/c\". path.resolve(\"a\", \"b\", \"..\", \"c\") => \"/current/working/dir/a/c\". path.resolve(\"/a\", \"b\", \"c\") => \"/a/b/c\". path.normalize(path) - resolves . and .. segments. path.isAbsolute(path) - returns true if the path is absolute. path.relative(from, to) - returns the relative path from \"from\" to \"to\"."
    },
    {
      "heading": "Path Parsing and Formatting",
      "text": "path.parse(path) - returns an object with: root (root directory, e.g., \"/\" or \"C:\\\"), dir (directory path), base (file name + extension), name (file name without extension), ext (file extension). path.format(pathObject) - reverses parse(), takes a path object and returns a string. Properties: dir (preferred), root, base (preferred), name, ext. If dir is provided, root is ignored. If base is provided, name and ext are ignored. path.sep - platform path separator: \"/\" on POSIX, \"\\\" on Windows. path.delimiter - platform path delimiter: \":\" on POSIX, \";\" on Windows (used in PATH environment variable). path.win32 and path.posix - platform-specific implementations accessible regardless of the current platform."
    },
    {
      "heading": "Common Path Operations",
      "text": "(1) Extract directory: path.dirname(\"/user/docs/file.txt\") => \"/user/docs\". (2) Extract file name: path.basename(\"/user/docs/file.txt\") => \"file.txt\", path.basename(\"/user/docs/file.txt\", \".txt\") => \"file\". (3) Extract extension: path.extname(\"/user/docs/file.txt\") => \".txt\", path.extname(\"/user/docs/archive.tar.gz\") => \".gz\", path.extname(\"/user/docs/\") => \"\" (trailing slash), path.extname(\"/user/docs/.gitignore\") => \"\" (hidden file without extension). (4) Get relative path: path.relative(\"/user/docs\", \"/user/docs/tasks/file.txt\") => \"tasks/file.txt\". (5) Check absolute: path.isAbsolute(\"/foo\") => true, path.isAbsolute(\"foo\") => false. (6) Normalize: path.normalize(\"foo/bar/..\\baz\") => \"foo\\baz\" (on Windows)."
    },
    {
      "heading": "Cross-Platform Path Handling Strategies",
      "text": "(1) Always use path.join() or path.resolve() instead of string concatenation with \"/\" or \"\\\". (2) Use path.sep and path.delimiter for splitting path lists. (3) For web URLs (which always use /), use path.posix methods: path.posix.join(\"a\", \"b\"). (4) In package.json scripts, use cross-env for environment variables. (5) For import/require paths, Node.js accepts both separators, but prefer forward slashes for consistency. (6) Use path.win32 and path.posix explicitly for platform-independent parsing. (7) The URL class and file:// protocol use forward slashes - use url.pathToFileURL and url.fileURLToPath for conversion. (8) Beware: Windows paths can have drive letters (C:) and UNC paths (\\\\server\\share). path.parse handles these correctly."
    },
    {
      "heading": "Path Module Performance and Best Practices",
      "text": "(1) Path operations are pure string operations - they are very fast (sub-microsecond). (2) Cache resolved paths when used repeatedly. (3) For URL paths (HTTP routing), use the URL API, not path.join. (4) Use path.resolve over path.join when you need an absolute path. (5) Avoid __dirname concatenation - use path.join(__dirname, \"relative/path\") instead. (6) For temporary files, use the os.tmpdir() or fs.mkdtemp() with path.join. (7) Node.js 20+ added path.matchesGlob(pattern) for glob matching. (8) For configurable paths, accept both relative and absolute inputs and normalize with path.resolve. (9) The path.format() method is useful for programmatic path construction. (10) Always handle user-provided paths carefully to prevent path traversal attacks: filter .. segments and null bytes."
    }
  ],
  "interviewAnswer": "The path module provides cross-platform path manipulation. path.join() concatenates segments with platform separator. path.resolve() returns absolute paths (prepends cwd if needed). path.parse() decomposes a path into root/dir/base/name/ext. path.format() reverses it. Key properties: path.sep (separator: / or \\), path.delimiter (PATH delimiter: : or ;). Use path.join(__dirname, \"file\") instead of string concatenation. path.isAbsolute() checks absolute paths. path.relative() computes relative paths between two absolute paths. Path operations are pure string manipulation (no filesystem access). For URLs, use URL API or path.posix for forward-slash paths.",
  "interviewQuestions": [
    {
      "question": "What is the difference between path.join() and path.resolve()?",
      "answer": "path.join() concatenates segments with the platform separator and normalizes. path.resolve() resolves to an absolute path, prepending the current working directory if the result is not absolute. resolve treats segments starting with / as absolute roots."
    },
    {
      "question": "How do you extract the file name without extension from a path?",
      "answer": "path.basename(\"/a/b/file.txt\", path.extname(\"/a/b/file.txt\")) returns \"file\". Or path.parse(\"/a/b/file.txt\").name returns \"file\". path.basename(path) returns \"file.txt\" (with extension)."
    },
    {
      "question": "What does path.parse() return?",
      "answer": "An object with: root (root dir), dir (directory), base (file + ext), name (file only), ext (extension). Example: path.parse(\"/user/docs/file.txt\") => { root: \"/\", dir: \"/user/docs\", base: \"file.txt\", name: \"file\", ext: \".txt\" }."
    },
    {
      "question": "What are path.sep and path.delimiter?",
      "answer": "path.sep is the platform path separator: \"/\" on POSIX, \"\\\" on Windows. path.delimiter is the PATH environment variable separator: \":\" on POSIX, \";\" on Windows."
    },
    {
      "question": "How do you convert a file path to a file:// URL?",
      "answer": "Use url.pathToFileURL(path) - returns a URL object. Use url.fileURLToPath(url) to convert back. The URL module handles proper encoding of special characters and forward slashes."
    },
    {
      "question": "How does path.resolve() handle arguments starting with /?",
      "answer": "If an argument starts with / (or a drive letter on Windows), it becomes the new root. Subsequent segments are resolved relative to that root. Earlier segments are discarded. path.resolve(\"/a\", \"b\") => \"/a/b\". path.resolve(\"/a\", \"/b\", \"c\") => \"/b/c\"."
    },
    {
      "question": "What is the difference between path.dirname() and path.basename()?",
      "answer": "path.dirname() returns the directory path (everything except the last segment). path.basename() returns the last segment (file or directory name). path.dirname(\"/a/b/c.txt\") => \"/a/b\". path.basename(\"/a/b/c.txt\") => \"c.txt\"."
    },
    {
      "question": "How do you get a relative path between two absolute paths?",
      "answer": "path.relative(from, to) returns the relative path from \"from\" to \"to\". path.relative(\"/data/docs\", \"/data/images/photo.jpg\") => \"../images/photo.jpg\". Both arguments should be absolute paths."
    },
    {
      "question": "What is path.normalize() used for?",
      "answer": "path.normalize() resolves . and .. segments and adjusts separators to the platform default. path.normalize(\"/foo/bar/../baz//qux\") => \"/foo/baz/qux\". It does not check if the path exists."
    },
    {
      "question": "How do you prevent path traversal security issues?",
      "answer": "(1) Use path.resolve() and check the result starts with an allowed directory. (2) Path traversal uses ../ to escape. path.resolve(userInput) may resolve outside the intended directory. (3) Use path.basename() to strip directory components from user-provided filenames. (4) Never concatenate user input directly into path strings."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 260\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"240\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Path Module Operations</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">path.join()</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Concatenate segments</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">path.resolve()</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Absolute path resolution</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">path.parse() / format()</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Decompose/compose paths</text><rect x=\"30\" y=\"218\" width=\"200\" height=\"42\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"234\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">path.relative()</text><text x=\"130\" y=\"251\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Relative path between two</text></svg>",
  "codeExamples": [
    {
      "title": "Path Joining and Resolution Examples",
      "useCase": "Understand the difference between join and resolve",
      "code": "var path = require(\"path\");\n\n// path.join - simple concatenation with normalization\nconsole.log(path.join(\"usr\", \"local\", \"bin\"));\n// POSIX: \"usr/local/bin\", Windows: \"usr\\local\\bin\"\n\nconsole.log(path.join(\"/base\", \"..\", \"other\", \".\", \"file.txt\"));\n// \"/base/../other/./file.txt\" → \"/other/file.txt\"\n\n// path.resolve - produces absolute paths\nconsole.log(path.resolve(\"a\", \"b\"));\n// \"/current/working/dir/a/b\"\n\nconsole.log(path.resolve(\"/absolute\", \"b\", \"c\"));\n// \"/absolute/b/c\"  (leading / resets to root)\n\nconsole.log(path.resolve(\"..\"));\n// \"/current/working\" (parent of cwd)\n\n// Check if absolute\nconsole.log(path.isAbsolute(\"/foo\")); // true\nconsole.log(path.isAbsolute(\"foo\")); // false\nconsole.log(path.isAbsolute(\"C:\\foo\")); // true (Windows)",
      "description": "join concatenates; resolve makes absolute. resolve prepends cwd for relative paths. Leading / resets the resolution root. isAbsolute checks for leading / or drive letter."
    },
    {
      "title": "Parsing and Formatting Paths",
      "useCase": "Extract and construct path components",
      "code": "var path = require(\"path\");\n\n// Parse a full path into components\nvar parsed = path.parse(\"/user/docs/projects/app.js\");\nconsole.log(\"root:\", parsed.root);  // \"/\"\nconsole.log(\"dir:\", parsed.dir);    // \"/user/docs/projects\"\nconsole.log(\"base:\", parsed.base);  // \"app.js\"\nconsole.log(\"name:\", parsed.name);  // \"app\"\nconsole.log(\"ext:\", parsed.ext);    // \".js\"\n\n// Format path object back to string\nvar obj = {\n  dir: \"/home/user\",\n  base: \"readme.md\"\n};\nconsole.log(path.format(obj)); // \"/home/user/readme.md\"\n\n// Using dir vs root (dir takes precedence)\nvar obj2 = {\n  root: \"/ignored\",\n  dir: \"/used\",\n  base: \"file.txt\"\n};\nconsole.log(path.format(obj2)); // \"/used/file.txt\"\n\n// Using base vs name+ext (base takes precedence)\nvar obj3 = {\n  dir: \"/docs\",\n  name: \"archive\",\n  ext: \".tar.gz\"\n};\nconsole.log(path.format(obj3)); // \"/docs/archive.tar.gz\"",
      "description": "path.parse() decomposes a path into root/dir/base/name/ext. path.format() builds a path string from components. dir takes precedence over root. base takes precedence over name+ext."
    },
    {
      "title": "Cross-Platform Path Building",
      "useCase": "Write path code that works everywhere",
      "code": "var path = require(\"path\");\n\n// BAD: hardcoded separator - fails on Windows\nvar badPath = __dirname + \"/data/config.json\";\n\n// GOOD: use path.join\nvar goodPath = path.join(__dirname, \"data\", \"config.json\");\n\n// Accessing platform-specific implementations\nconsole.log(\"POSIX sep:\", path.posix.sep);    // \"/\"\nconsole.log(\"POSIX join:\", path.posix.join(\"a\", \"b\")); // \"a/b\"\nconsole.log(\"Win32 sep:\", path.win32.sep);    // \"\\\"\nconsole.log(\"Win32 join:\", path.win32.join(\"a\", \"b\")); // \"a\\b\"\n\n// URL paths always use forward slashes\nvar urlPath = path.posix.join(\"/api\", \"v2\", \"users\", \"123\");\nconsole.log(\"URL path:\", urlPath); // \"/api/v2/users/123\"\n\n// Using path.delimiter for PATH parsing\nvar envPath = process.env.PATH || \"\";\nvar dirs = envPath.split(path.delimiter);\nconsole.log(\"PATH directories:\", dirs.length);\n\n// Safe relative path construction\nvar relativePath = path.relative(\n  \"/home/user/docs\",\n  \"/home/user/docs/projects/file.txt\"\n);\nconsole.log(\"Relative:\", relativePath); // \"projects/file.txt\"",
      "description": "Always use path methods over string concatenation for cross-platform compatibility. path.posix and path.win32 provide platform-specific operations regardless of the current OS. path.delimiter handles PATH variable splitting."
    },
    {
      "title": "File Extension and Name Manipulation",
      "useCase": "Work with file extensions and base names",
      "code": "var path = require(\"path\");\n\nvar files = [\n  \"/docs/report.pdf\",\n  \"/images/photo.jpg\",\n  \"/archive/backup.tar.gz\",\n  \"/config/.env\",\n  \"/projects/app.\",\n  \"noExtension\",\n  \"/dir/\",\n];\n\nfiles.forEach(function(file) {\n  console.log(\"File: \" + file);\n  console.log(\"  basename:\", path.basename(file));\n  console.log(\"  extname:\", path.extname(file));\n  console.log(\"  dirname:\", path.dirname(file));\n  console.log(\"  name:\", path.basename(file, path.extname(file)));\n  console.log(\"---\");\n});\n\n// Change file extension\nfunction changeExt(filePath, newExt) {\n  var dir = path.dirname(filePath);\n  var name = path.basename(filePath, path.extname(filePath));\n  return path.join(dir, name + newExt);\n}\n\nconsole.log(changeExt(\"/docs/report.pdf\", \".html\"));\n// \"/docs/report.html\"\n\nconsole.log(changeExt(\"/archive/backup.tar.gz\", \".zip\"));\n// \"/archive/backup.zip\" (only last extension removed)",
      "description": "path.extname() returns the last extension (.gz for .tar.gz). path.basename(file, ext) strips the extension. path.dirname gets the parent directory. The changeExt function demonstrates extension replacement."
    },
    {
      "title": "Security: Path Traversal Prevention",
      "useCase": "Protect against directory traversal attacks",
      "code": "var path = require(\"path\");\n\nvar ALLOWED_DIR = \"/var/app/data\";\n\n// UNSAFE: Direct user input concatenation\nfunction unsafeResolve(userInput) {\n  return path.join(ALLOWED_DIR, userInput);\n}\n\n// SAFE: Resolve and verify\nfunction safeResolve(userInput) {\n  // Remove null bytes\n  userInput = userInput.replace(/\\0/g, \"\");\n\n  // Resolve to absolute path\n  var resolved = path.resolve(ALLOWED_DIR, userInput);\n\n  // Verify it starts with the allowed directory\n  if (!resolved.startsWith(ALLOWED_DIR)) {\n    throw new Error(\"Path traversal detected\");\n  }\n\n  return resolved;\n}\n\n// Demonstration\ntry {\n  console.log(safeResolve(\"user/file.txt\"));\n  // OK: /var/app/data/user/file.txt\n\n  console.log(safeResolve(\"../../etc/passwd\"));\n  // Error: Path traversal detected\n} catch (err) {\n  console.error(\"Security:\", err.message);\n}\n\n// Alternative: strip directory components\nfunction safeBasename(userFilename) {\n  return path.basename(userFilename);\n}\n\nconsole.log(safeBasename(\"../../../etc/passwd\")); // \"passwd\"\nconsole.log(safeBasename(\"safe.txt\")); // \"safe.txt\"",
      "description": "Path traversal attacks use ../ to escape the intended directory. Always resolve and verify the result starts with the allowed directory. path.basename() strips directory components from filenames. Null byte injection (%00) must be sanitized."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the difference between path.join() and path.resolve()?",
      "options": [
        "Both are identical",
        "join concatenates, resolve makes absolute",
        "join normalizes, resolve joins",
        "join is async, resolve is sync"
      ],
      "answer": 1,
      "explanation": "join() concatenates path segments. resolve() returns an absolute path, prepending cwd if needed."
    },
    {
      "question": "What does path.parse(\"/a/b.txt\").name return?",
      "options": [
        "\"a\"",
        "\"b\"",
        "\"b.txt\"",
        "\"txt\""
      ],
      "answer": 1,
      "explanation": "path.parse(\"/a/b.txt\").name returns \"b\" (file name without extension). .base returns \"b.txt\". .ext returns \".txt\"."
    },
    {
      "question": "What is path.sep on Windows?",
      "options": [
        "\":\"",
        "\"\\\\\"",
        "\"/\"",
        "\";\""
      ],
      "answer": 1,
      "explanation": "path.sep is \"\\\" on Windows and \"/\" on POSIX. path.delimiter is \";\" on Windows and \":\" on POSIX."
    },
    {
      "question": "Which method removes the last file extension?",
      "options": [
        "path.extname()",
        "path.basename(file, ext)",
        "path.parse().name",
        "path.dirname()"
      ],
      "answer": 1,
      "explanation": "path.basename(file, path.extname(file)) returns the file name without extension. parse().name also works."
    },
    {
      "question": "Does path.resolve() access the filesystem?",
      "options": [
        "Yes, it checks if path exists",
        "No, it only manipulates strings",
        "It depends on the platform",
        "It creates the path if missing"
      ],
      "answer": 1,
      "explanation": "path operations are pure string manipulation. They do not access the filesystem. Use fs.realpath or fs.exists if filesystem access is needed."
    },
    {
      "question": "How do you prevent path traversal attacks?",
      "options": [
        "Use path.join()",
        "Resolve and verify result starts with allowed dir",
        "Use path.basename()",
        "All of the above"
      ],
      "answer": 3,
      "explanation": "All three techniques are valid: join prevents some cases, resolve+startsWith verifies boundaries, basename strips directory components."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-process-object"] = {
  "title": "Node.js Process Object",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "The process object is a global that provides information about the current Node.js process and control over its execution.",
    "Key properties: process.argv (command-line arguments), process.env (environment variables), process.pid (process ID), process.cwd() (current directory), process.uptime() (process runtime).",
    "Key methods: process.exit(), process.nextTick(), process.chdir(), process.cpuUsage(), process.memoryUsage().",
    "The process object is an EventEmitter that emits events: \"exit\", \"beforeExit\", \"uncaughtException\", \"unhandledRejection\", \"warning\", and signals like \"SIGINT\", \"SIGTERM\"."
  ],
  "laymanDefinition": "The Process object is like the control panel for your Node.js application. It tells you everything about your running program: what arguments were passed when it started (process.argv), what its ID number is (process.pid), what folder it is running from (process.cwd()), how long it has been running (process.uptime()), how much memory it is using (process.memoryUsage()), and what system environment variables are set (process.env). It also lets you control the program: exit gracefully (process.exit), schedule high-priority tasks (process.nextTick), change directories (process.chdir), and listen for important events like crashes (uncaughtException) and shutdown signals (SIGTERM).",
  "deepDive": [
    {
      "heading": "Command-Line Arguments and Environment",
      "text": "process.argv is an array: [0] Node.js executable path, [1] script path, [2+] user arguments. process.argv.slice(2) gives user args. process.env is an object of environment variables. Changes to process.env affect the current process and child processes (but not the system). process.env.NODE_ENV is a common convention for \"development\" vs \"production\". process.execPath - path to the Node.js executable. process.execArgv - Node.js flags passed to the executable (e.g., --inspect, --max-old-space-size). process.exitCode - set exit code without calling process.exit(). process.features - object describing Node.js build features (debug, IPv6, TLS, etc.). process.version - Node.js version string. process.versions - object with versions of dependencies (v8, uv, zlib, etc.). process.release - release metadata (name, sourceUrl, headersUrl)."
    },
    {
      "heading": "Process Lifecycle Events",
      "text": "The process object emits lifecycle events: (1) \"beforeExit\" - emitted when the event loop is empty and about to exit. If additional work is scheduled, the event loop continues. Does NOT fire on explicit process.exit(). (2) \"exit\" - emitted just before the process exits. Only synchronous operations work here - callbacks scheduled here do NOT run. (3) \"uncaughtException\" - emitted when an exception bubbles to the event loop without being caught. If not handled, the process prints the error and exits. Handle with care: the application may be in an inconsistent state. (4) \"unhandledRejection\" - emitted when a Promise rejection is not handled. Similar to uncaughtException but for promises. (5) \"warning\" - emitted for process warnings (deprecations, memory issues). (6) \"rejectionHandled\" - emitted when a rejection is handled after unhandledRejection was emitted. (7) \"multipleResolves\" - emitted when a Promise is resolved/rejected multiple times."
    },
    {
      "heading": "Process Resource Usage and Metrics",
      "text": "process.memoryUsage() returns: rss (resident set size), heapTotal (V8 heap allocated), heapUsed (V8 heap used), external (C++ objects memory), arrayBuffers (ArrayBuffer memory). process.cpuUsage() returns: user (user CPU time in microseconds), system (system CPU time). process.resourceUsage() (Node 12+) returns detailed resource usage: userCPUTime, systemCPUTime, maxRSS, sharedMemorySize, unsharedDataSize, unsharedStackSize, minorPageFault, majorPageFault, swappedOut, fsRead, fsWrite, ipcSent, ipcReceived, signalsCount, voluntaryContextSwitches, involuntaryContextSwitches. process.uptime() - process uptime in seconds (float). process.hrtime.bigint() - high-resolution time in nanoseconds (useful for precise timing). process.hrtime() - returns [seconds, nanoseconds] tuple. process.performance - performance timing (Node 16+)."
    },
    {
      "heading": "Process Control and Signal Handling",
      "text": "process.exit([code]) - exits the process synchronously. Sets exit code (0 = success, non-zero = error). process.kill(pid, signal) - sends a signal to a process. Does NOT kill the process necessarily - it sends a signal. process.abort() - forces immediate process abort (core dump). process.chdir(directory) - changes the current working directory. process.cwd() - returns current working directory. Signal handling: process.on(\"SIGINT\") - Ctrl+C. process.on(\"SIGTERM\") - termination request. process.on(\"SIGHUP\") - terminal closed. process.on(\"SIGUSR1\") - user-defined signal (also used by Node.js for debugger). SIGKILL and SIGSTOP cannot be handled. process.ppid - parent process ID (Node 15+). process.title - process title shown in ps/top. process.config - compile-time configuration options."
    },
    {
      "heading": "process.nextTick() and Microtasks",
      "text": "process.nextTick(callback, ...args) - schedules a callback to execute in the microtask queue, before any I/O or timer callbacks. It is NOT part of the event loop phases - it runs between each phase and between each individual callback within a phase. Priority: nextTick > Promise > event loop phase. Always runs before \"beforeExit\" and \"exit\" events. Warnings: (1) Recursive nextTick starves the event loop. (2) Use setImmediate() for deferring work to avoid nextTick recursion. (3) process.nextTick() has a maximum call stack depth - extreme recursion causes RangeError. (4) nextTick callbacks are processed in FIFO order within the same phase. (5) Use process.nextTick for: ensuring callbacks are async, handling errors in event emitters, running cleanup after the current operation but before I/O."
    }
  ],
  "interviewAnswer": "The process object is a global EventEmitter providing process info and control. Key: process.argv (CLI args), process.env (environment), process.pid, process.cwd(), process.memoryUsage() (rss, heapTotal, heapUsed), process.cpuUsage(), process.uptime(). Events: \"exit\" (synchronous cleanup), \"beforeExit\" (async cleanup), \"uncaughtException\" (handle critical errors), \"unhandledRejection\" (promise errors), \"SIGINT\"/\"SIGTERM\" (graceful shutdown). process.nextTick() schedules microtasks before next event loop phase. Use process.exitCode instead of process.exit() when possible. Exit codes: 0 success, 1 uncaught exception, non-zero for specific errors.",
  "interviewQuestions": [
    {
      "question": "What is the difference between process.exit() and process.exitCode?",
      "answer": "process.exit(code) exits the process immediately, preventing any queued async work. process.exitCode = code sets the exit code but allows the process to exit naturally when the event loop empties. Prefer exitCode for graceful shutdown."
    },
    {
      "question": "What does process.memoryUsage() return?",
      "answer": "An object with: rss (resident set size - total memory allocated), heapTotal (V8 heap allocated), heapUsed (V8 heap in use), external (C++ object memory), arrayBuffers (ArrayBuffer memory). All values are in bytes."
    },
    {
      "question": "What is the difference between \"exit\" and \"beforeExit\" events?",
      "answer": "\"exit\" fires when the process is about to terminate - only synchronous code runs. \"beforeExit\" fires when the event loop is empty but the process has not been asked to exit yet - async operations scheduled here can keep the process alive. \"exit\" fires on process.exit(); \"beforeExit\" does not."
    },
    {
      "question": "How do you handle uncaught exceptions?",
      "answer": "process.on(\"uncaughtException\", (err) => { /* cleanup */ process.exit(1); }). The handler should perform cleanup and exit - the application is in an unknown state. Do NOT try to resume normal operation. Use domains or process.on for logging before exit."
    },
    {
      "question": "What is process.argv and how do you parse CLI arguments?",
      "answer": "process.argv[0] = Node executable path, [1] = script path, [2+] = user arguments. Use process.argv.slice(2) to get user args. For complex parsing, use libraries like yargs or commander. For simple cases, manually parse --flags."
    },
    {
      "question": "What happens when a SIGTERM signal is received?",
      "answer": "The process can handle it: process.on(\"SIGTERM\", handler). The handler should perform graceful shutdown: stop accepting new connections, close database connections, save state, then exit. Without a handler, the process terminates immediately."
    },
    {
      "question": "What is process.nextTick() and when should you use it?",
      "answer": "nextTick() schedules a callback to run before the next event loop phase, in the microtask queue. Use it to: (1) Ensure callbacks are always async (you get the same behavior regardless of sync/async completion). (2) Clean up resources after the current operation. (3) Handle errors in event emitters. Avoid recursive nextTick - use setImmediate for recurring deferred work."
    },
    {
      "question": "How do you get the process uptime?",
      "answer": "process.uptime() returns the number of seconds the process has been running (as a float with microsecond precision). process.hrtime.bigint() gives nanosecond-precision time. os.uptime() gives system uptime (different from process uptime)."
    },
    {
      "question": "What is the process.env object?",
      "answer": "An object containing the user environment variables. process.env.PATH, process.env.HOME, etc. Setting process.env.FOO = \"bar\" affects the current process and child processes. It does NOT affect the system or parent process. process.env.NODE_ENV is conventionally set to \"production\" or \"development\"."
    },
    {
      "question": "What does process.cwd() vs __dirname return?",
      "answer": "process.cwd() returns the current working directory (the directory where the node command was executed). __dirname returns the directory of the currently executing script. They can be different if the script was run from a different directory: node /path/to/script.js from /different/dir."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Process Object Overview</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">process.argv</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">CLI arguments array</text><rect x=\"30\" y=\"115\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">process.env</text><text x=\"130\" y=\"149.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Environment variables</text><rect x=\"30\" y=\"175\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"192.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">process.memoryUsage()</text><text x=\"130\" y=\"209.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Heap, RSS, external memory</text></svg>",
  "codeExamples": [
    {
      "title": "Command-Line Argument Parsing",
      "useCase": "Parse CLI arguments without external libraries",
      "code": "// node app.js --port 3000 --env production --verbose\n\nvar args = process.argv.slice(2);\nvar options = {};\n\nfor (var i = 0; i < args.length; i++) {\n  if (args[i].startsWith(\"--\")) {\n    var key = args[i].slice(2);\n    if (i + 1 < args.length && !args[i + 1].startsWith(\"--\")) {\n      options[key] = args[i + 1];\n      i++;\n    } else {\n      options[key] = true;\n    }\n  }\n}\n\nconsole.log(\"Parsed options:\", options);\n// { port: \"3000\", env: \"production\", verbose: true }\n\n// Set environment variable from CLI arg\nif (options.env) {\n  process.env.NODE_ENV = options.env;\n}\n\n// Use parsed options\nvar port = parseInt(options.port) || 8080;\nconsole.log(\"Starting on port\", port, \"in\", process.env.NODE_ENV, \"mode\");",
      "description": "process.argv gives CLI arguments. Simple key-value parsing handles --flag and --key value patterns. Set process.env.NODE_ENV early for other modules to read."
    },
    {
      "title": "Graceful Shutdown with Signal Handling",
      "useCase": "Handle termination signals for clean shutdown",
      "code": "var http = require(\"http\");\n\nvar server = http.createServer(function(req, res) {\n  res.end(\"OK\");\n});\n\nserver.listen(3000, function() {\n  console.log(\"Server running, PID:\", process.pid);\n});\n\n// Graceful shutdown handler\nfunction gracefulShutdown(signal) {\n  console.log(\"Received\", signal, \"- starting graceful shutdown\");\n\n  // Stop accepting new connections\n  server.close(function() {\n    console.log(\"All connections closed\");\n\n    // Close database connections\n    // db.close();\n\n    // Exit with success code\n    process.exit(0);\n  });\n\n  // Force shutdown after timeout (30s)\n  setTimeout(function() {\n    console.error(\"Forced shutdown after timeout\");\n    process.exit(1);\n  }, 30000).unref();\n}\n\nprocess.on(\"SIGTERM\", gracefulShutdown);\nprocess.on(\"SIGINT\", gracefulShutdown);\n\n// Log uncaught errors before crash\nprocess.on(\"uncaughtException\", function(err) {\n  console.error(\"Uncaught exception:\", err);\n  gracefulShutdown(\"uncaughtException\");\n});",
      "description": "Graceful shutdown: handle SIGTERM/SIGINT, stop accepting connections, finish in-flight requests, close resources, then exit. A timeout forces shutdown if cleanup takes too long."
    },
    {
      "title": "Memory and CPU Usage Monitoring",
      "useCase": "Track process resource consumption over time",
      "code": "function printMemoryUsage() {\n  var mem = process.memoryUsage();\n  console.log(\"=== Memory Usage ===\");\n  console.log(\"RSS:\", (mem.rss / 1024 / 1024).toFixed(2) + \" MB\");\n  console.log(\"Heap Total:\", (mem.heapTotal / 1024 / 1024).toFixed(2) + \" MB\");\n  console.log(\"Heap Used:\", (mem.heapUsed / 1024 / 1024).toFixed(2) + \" MB\");\n  console.log(\"External:\", (mem.external / 1024 / 1024).toFixed(2) + \" MB\");\n}\n\n// Monitor memory every 5 seconds\nvar interval = setInterval(printMemoryUsage, 5000);\n\n// Simulate memory allocation\nvar leaks = [];\nsetInterval(function() {\n  leaks.push(Buffer.alloc(1024 * 1024)); // 1MB per second\n  console.log(\"Allocated 1MB, total:\", leaks.length, \"MB\");\n\n  if (leaks.length > 20) {\n    console.log(\"Clearing leak\");\n    leaks = [];\n  }\n}, 1000);\n\n// CPU usage since process start\nvar startCpu = process.cpuUsage();\nsetTimeout(function() {\n  var elapsed = process.cpuUsage(startCpu);\n  console.log(\"CPU used:\", (elapsed.user / 1000).toFixed(2), \"ms user,\",\n    (elapsed.system / 1000).toFixed(2), \"ms system\");\n}, 10000);\n\n// Process uptime\nconsole.log(\"Process uptime:\", process.uptime().toFixed(2), \"s\");\n\n// Exit safely after demo\nsetTimeout(function() {\n  clearInterval(interval);\n  process.exit(0);\n}, 25000);",
      "description": "process.memoryUsage() monitors heap, RSS, and external memory. process.cpuUsage(start) calculates CPU time since a starting point. Monitor these in production to detect memory leaks and CPU spikes."
    },
    {
      "title": "process.nextTick() for Async Consistency",
      "useCase": "Ensure callbacks are always async",
      "code": "function readConfig(callback) {\n  var config = global.__cachedConfig;\n  if (config) {\n    // BAD: sometimes sync, sometimes async (Zalgo)\n    // callback(null, config);\n\n    // GOOD: always async using nextTick\n    process.nextTick(function() {\n      callback(null, config);\n    });\n    return;\n  }\n\n  // Simulate async config load\n  setTimeout(function() {\n    global.__cachedConfig = { theme: \"dark\" };\n    callback(null, global.__cachedConfig);\n  }, 100);\n}\n\n// Example: without nextTick, first call is sync, second is async\nconsole.log(\"Start\");\n\nreadConfig(function(err, config) {\n  console.log(\"First callback:\", config);\n});\n\nreadConfig(function(err, config) {\n  console.log(\"Second callback:\", config);\n});\n\nconsole.log(\"End\");\n\n// Output is ALWAYS:\n// Start\n// End\n// First callback: { theme: \"dark\" }\n// Second callback: { theme: \"dark\" }\n\n// Without nextTick, output would be:\n// Start\n// First callback: { theme: \"dark\" }  (sync!)\n// End\n// Second callback: { theme: \"dark\" } (async)",
      "description": "process.nextTick() ensures callbacks are always async, preventing \"Zalgo\" issues where synchronous paths in async functions cause inconsistent timing. This is critical for API design to avoid subtle bugs."
    },
    {
      "title": "Exit Codes and Process Exit Strategies",
      "useCase": "Use appropriate exit codes for different failure modes",
      "code": "// Standard exit codes:\n// 0 - Success\n// 1 - Uncaught fatal exception\n// 2 - Reserved (bash built-in misuse)\n// 3-5 - Reserved\n// 6-64 - Application-specific errors\n// 65-74 - EX data format errors\n// 75-78 - EX can't create user process\n// 126 - Command invoked cannot execute\n// 127 - Command not found\n// 128 - Invalid argument to exit\n// 130 - Terminated by Ctrl+C (128 + SIGINT)\n\nfunction validateConfig(config) {\n  if (!config) {\n    console.error(\"Fatal: Config file missing\");\n    process.exit(66); // EX_NOINPUT\n  }\n  try {\n    var parsed = JSON.parse(config);\n    if (!parsed.port) {\n      process.exitCode = 65; // EX_DATAERR\n      console.error(\"Config error: port required\");\n      return;\n    }\n    return parsed;\n  } catch (err) {\n    process.exitCode = 65;\n    console.error(\"Config parse error:\", err.message);\n  }\n}\n\n// Prefer exitCode over exit() for async cleanup\nfunction shutdown() {\n  process.exitCode = 0;\n  // Close resources, they may be async\n  // Process exits naturally when event loop empties\n}\n\n// Safe exit with cleanup\nfunction safeExit(code) {\n  process.exitCode = code;\n  // Perform synchronous cleanup\n  console.log(\"Cleanup complete, exiting with code\", code);\n  process.exit(code);\n}\n\n// Test different scenarios\nconsole.log(\"Current exit code:\", process.exitCode); // undefined\nprocess.exitCode = 0;\nconsole.log(\"Set to 0:\", process.exitCode);",
      "description": "Use appropriate exit codes (0 success, 1+ errors). Prefer process.exitCode for async cleanup. Use process.exit() with code for immediate exit. Standard exit codes follow /usr/include/sysexits.h convention."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does process.memoryUsage().rss represent?",
      "options": [
        "V8 heap used",
        "Total memory allocated for the process",
        "C++ object memory",
        "ArrayBuffer memory"
      ],
      "answer": 1,
      "explanation": "rss (Resident Set Size) is the total memory allocated for the process, including heap, stack, and code segments."
    },
    {
      "question": "Which event fires when the event loop is empty but process has not been asked to exit?",
      "options": [
        "\"exit\"",
        "\"beforeExit\"",
        "\"uncaughtException\"",
        "\"empty\""
      ],
      "answer": 1,
      "explanation": "\"beforeExit\" fires when the event loop is empty. Async work scheduled here keeps the process alive. It does NOT fire on explicit process.exit()."
    },
    {
      "question": "What is process.argv[0]?",
      "options": [
        "First user argument",
        "Script path",
        "Node.js executable path",
        "Current working directory"
      ],
      "answer": 2,
      "explanation": "process.argv[0] is the path to the Node.js executable. argv[1] is the script path. argv[2+] are user arguments."
    },
    {
      "question": "What happens without a SIGTERM handler?",
      "options": [
        "The signal is ignored",
        "The process terminates immediately",
        "An error is thrown",
        "The process pauses"
      ],
      "answer": 1,
      "explanation": "Without a handler, SIGTERM terminates the process immediately. Handle it for graceful shutdown: process.on(\"SIGTERM\", handler)."
    },
    {
      "question": "What is the recommended alternative to process.exit() for async cleanup?",
      "options": [
        "process.abort()",
        "process.exitCode",
        "process.kill()",
        "process.chdir()"
      ],
      "answer": 1,
      "explanation": "Set process.exitCode and let the process exit naturally when the event loop empties. This allows queued async cleanup to complete."
    },
    {
      "question": "Why use process.nextTick() for callback consistency?",
      "options": [
        "It makes callbacks faster",
        "It ensures callbacks are always async",
        "It prevents errors",
        "It improves readability"
      ],
      "answer": 1,
      "explanation": "nextTick() ensures callbacks are always asynchronous, preventing \"Zalgo\" - where a function behaves synchronously sometimes and asynchronously other times depending on conditions."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-streams"] = {
  "title": "Node.js Streams",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Streams are objects that let you read/write data from a source or to a destination in continuous chunks, processing data as it arrives rather than loading it all into memory.",
    "There are four types of streams in Node.js: Readable (source of data), Writable (destination), Duplex (both readable and writable), and Transform (modify data during read/write).",
    "Streams implement the EventEmitter interface and emit events like \"data\", \"end\", \"error\", \"finish\", \"drain\", and \"close\".",
    "Streams handle backpressure automatically - if a Writable stream cannot accept data as fast as a Readable produces it, the Readable is paused until the Writable catches up."
  ],
  "laymanDefinition": "Streams in Node.js are like a water pipe connecting two tanks. Instead of waiting for the source tank to fill completely and then dumping it all at once into the destination tank (which would require a huge holding tank), a pipe sends a continuous small flow of water. As soon as a drop of water enters the pipe, it starts coming out the other end. This means you can start processing data (like a large video file) the moment the first chunk arrives, without waiting for the entire file to be in memory. If the destination tank is getting full, the pipe automatically slows the flow (backpressure) until there is room again.",
  "deepDive": [
    {
      "heading": "Readable Streams",
      "text": "Readable streams produce data that can be read. Two modes: (1) Flowing mode - data is read automatically and emitted via \"data\" events. (2) Paused mode - data must be explicitly read by calling stream.read(). Methods: pipe(), unpipe(), read([size]), setEncoding(), pause(), resume(), isPaused(). Events: \"data\" (new chunk available), \"end\" (no more data), \"close\" (stream closed), \"error\" (error occurred), \"pause\"/\"resume\" (flow changes). Implement a custom readable: extend stream.Readable and implement _read(size) that pushes data via this.push(chunk) or this.push(null) to signal end. Backpressure: if push() returns false, stop pushing until _read() is called again."
    },
    {
      "heading": "Writable Streams",
      "text": "Writable streams consume data written to them. Methods: write(chunk, encoding, callback) - returns false if the internal buffer exceeds highWaterMark (backpressure signal), end(chunk, encoding, callback) - signals no more writes. Events: \"drain\" - emitted when the internal buffer is empty and it is safe to write again, \"finish\" - emitted after end() is called and all data is flushed, \"error\" - error occurred, \"pipe\"/\"unpipe\" - when a readable is piped to/from. Implement a custom writable: extend stream.Writable and implement _write(chunk, encoding, callback). Call the callback when the chunk is fully consumed. The highWaterMark (default 16KB for objectMode: false, 16 for objectMode: true) controls buffer size and backpressure thresholds."
    },
    {
      "heading": "Duplex and Transform Streams",
      "text": "Duplex streams implement both Readable and Writable interfaces. The readable and writable sides are independent - data written to the writable side does NOT automatically appear on the readable side. Example: net.Socket. Transform streams are a special type of Duplex where the output (readable side) is computed from the input (writable side). Implement _transform(chunk, encoding, callback) - process and push transformed data. Implement _flush(callback) - called before \"end\" to push any remaining data. Common transform streams: zlib.createGzip (compression), crypto.createCipheriv (encryption). The _transform function is called for each chunk and must call callback() after processing. Multiple chunks can be pushed per _transform call, or no chunks (passthrough)."
    },
    {
      "heading": "Backpressure and HighWaterMark",
      "text": "Backpressure is the mechanism that prevents the writable stream buffer from growing unbounded when the consumer is slower than the producer. The highWaterMark (default 16KB) is the threshold. When the internal buffer exceeds highWaterMark, stream.write() returns false. The readable stream should pause until it receives a \"drain\" event (indicating the writable's buffer has been drained below highWaterMark). In flowing mode, the \"data\" event stops firing when pause() is called. The pipe() method handles backpressure automatically - this is why pipe() is recommended over manual event handling. ObjectMode streams have a highWaterMark of 16 objects by default. The buffer length is accessible via stream.writableLength / stream.readableLength. Backpressure is critical for memory management - without it, streaming a 10GB file would require 10GB of RAM."
    },
    {
      "heading": "Stream Best Practices and Common Patterns",
      "text": "(1) Always use pipe() for connecting streams unless you need custom logic - it handles backpressure, errors, and end-of-stream automatically. (2) Use pipeline() from stream/promises (Node 15+) for automatic stream cleanup and error propagation: pipeline( readable, transform, writable, callback ). (3) Always handle \"error\" events - unhandled stream errors crash the process. (4) Use finished() from stream/util to detect stream completion: finished(stream, callback). (5) For large files, use fs.createReadStream() and fs.createWriteStream() instead of readFile/writeFile. (6) Set encoding on Readable streams for string data: readable.setEncoding(\"utf8\"). (7) Use Transform streams for data processing (compression, encryption, parsing). (8) Avoid mixing flowing and paused modes on the same stream. (9) Handle backpressure manually only when pipe() is insufficient (e.g., rate limiting). (10) Use highWaterMark tuning for performance - larger values improve throughput but increase memory usage."
    }
  ],
  "interviewAnswer": "Node.js streams process data chunk-by-chunk rather than loading everything into memory. Four types: Readable (data source - \"data\", \"end\" events), Writable (data destination - \"drain\", \"finish\" events), Duplex (both, independent), Transform (Duplex where output derives from input). Streams handle backpressure via the highWaterMark (16KB default) - when the write buffer exceeds it, write() returns false, signaling the producer to pause. pipe() handles backpressure automatically. Custom streams extend stream.Readable (implement _read()), stream.Writable (implement _write()), or stream.Transform (implement _transform()). Use pipeline() (Node 15+) for proper error handling. Key patterns: fs.createReadStream for large files, zlib streams for compression, Transform for parsing. Always handle \"error\" events on streams.",
  "interviewQuestions": [
    {
      "question": "What are the four types of streams in Node.js?",
      "answer": "Readable (data source), Writable (data destination), Duplex (both, independent I/O), Transform (Duplex where output is computed from input). Readable examples: fs.createReadStream, http.IncomingMessage. Writable: fs.createWriteStream, http.ServerResponse, process.stdout."
    },
    {
      "question": "What is backpressure and why is it important?",
      "answer": "Backpressure occurs when a Writable stream cannot process data as fast as a Readable produces it. Without backpressure, the internal buffer grows unbounded, consuming all available memory. pipe() handles it automatically by pausing the Readable when write() returns false and resuming on \"drain\"."
    },
    {
      "question": "What is the default highWaterMark?",
      "answer": "16KB (16384 bytes) for binary streams, 16 objects for objectMode streams. It is configurable in stream options. Increasing highWaterMark improves throughput but uses more memory."
    },
    {
      "question": "What is the difference between flowing and paused mode in Readable streams?",
      "answer": "Flowing mode: data is read automatically and emitted via \"data\" events. Paused mode: data must be explicitly read by calling stream.read(). pipe() sets flowing mode. Adding a \"data\" listener switches to flowing mode. Removing it switches to paused."
    },
    {
      "question": "How do you create a custom Transform stream?",
      "answer": "Extend stream.Transform and implement _transform(chunk, encoding, callback). Call this.push(data) to output transformed data. Call callback() when done with the chunk. Optionally implement _flush(callback) to push remaining data before end."
    },
    {
      "question": "What does stream.write() returning false mean?",
      "answer": "It means the internal buffer has exceeded highWaterMark. The writable stream is asking the producer to stop writing. The producer should pause until a \"drain\" event is emitted, indicating the buffer has been emptied below highWaterMark."
    },
    {
      "question": "How does pipeline() differ from pipe()?",
      "answer": "pipeline() (stream.promises pipeline or stream.pipeline) provides: (1) Automatic cleanup - destroys all streams on error. (2) Error propagation - errors from any stream in the pipeline are forwarded to the callback. (3) Proper backpressure handling across multiple streams. pipe() does not destroy streams on error and does not propagate errors automatically."
    },
    {
      "question": "What is the purpose of the finished() function?",
      "answer": "finished(stream, callback) from stream/promises detects when a stream is no longer readable/writable/transferable/error. It handles edge cases that the \"end\" and \"finish\" events miss, such as premature destruction or errors."
    },
    {
      "question": "How do you handle errors in streams?",
      "answer": "Attach \"error\" event listeners to each stream. With pipe(), errors are not propagated - each stream needs its own error handler. With pipeline(), errors are automatically forwarded to the callback. Unhandled stream errors crash the process."
    },
    {
      "question": "What is objectMode in streams?",
      "answer": "objectMode allows streams to work with JavaScript objects instead of Buffer/String chunks. HighWaterMark defaults to 16 objects. Used for parsing CSV/JSON lines, database query results, or any structured data stream. Without objectMode, streams only handle Buffer or string data."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Node.js Stream Types and Flow</text><rect x=\"30\" y=\"55\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"110\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Readable</text><text x=\"110\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Data source</text><line x1=\"110\" y1=\"100\" x2=\"110\" y2=\"120\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"120\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"110\" y=\"137.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Transform</text><text x=\"110\" y=\"154.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Processing (gzip, encrypt)</text><line x1=\"110\" y1=\"165\" x2=\"110\" y2=\"185\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"185\" width=\"160\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"110\" y=\"202.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Writable</text><text x=\"110\" y=\"219.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Data destination</text><text x=\"210\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">fs.createReadStream, http req</text><text x=\"210\" y=\"143\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">zlib.createGzip, crypto cipher</text><text x=\"210\" y=\"208\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">fs.createWriteStream, http res</text><text x=\"260\" y=\"255\" fill=\"#f87171\" font-size=\"10\" text-anchor=\"start\">Backpressure: write() returns false, readable pauses until \"drain\"</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Readable/Writable Stream with pipe",
      "useCase": "Copy a file using streams",
      "code": "var fs = require(\"fs\");\n\n// Create a readable stream from source file\nvar readable = fs.createReadStream(\"input.txt\", { highWaterMark: 4096 });\n\n// Create a writable stream to destination file\nvar writable = fs.createWriteStream(\"output.txt\");\n\n// Pipe handles backpressure automatically\nreadable.pipe(writable);\n\n// Listen for completion\nwritable.on(\"finish\", function() {\n  console.log(\"File copied successfully\");\n});\n\nreadable.on(\"error\", function(err) {\n  console.error(\"Read error:\", err.message);\n});\n\nwritable.on(\"error\", function(err) {\n  console.error(\"Write error:\", err.message);\n});",
      "description": "pipe() connects a Readable to a Writable, handling backpressure automatically. The highWaterMark of 4096 bytes controls chunk size. pipe() does NOT destroy streams on error - always attach error handlers to both ends."
    },
    {
      "title": "Custom Transform Stream: Uppercase Converter",
      "useCase": "Create a transform that converts text to uppercase",
      "code": "var Transform = require(\"stream\").Transform;\n\nfunction UpperCaseTransform() {\n  Transform.call(this, { encoding: \"utf8\" });\n}\n\nUpperCaseTransform.prototype = Object.create(Transform.prototype);\n\nUpperCaseTransform.prototype._transform = function(chunk, encoding, callback) {\n  try {\n    var upper = chunk.toString().toUpperCase();\n    this.push(upper);\n    callback();\n  } catch (err) {\n    callback(err);\n  }\n};\n\nvar upper = new UpperCaseTransform();\nprocess.stdin.pipe(upper).pipe(process.stdout);\n\n// Usage: echo \"hello world\" | node upper.js\n// Output: HELLO WORLD",
      "description": "Transform streams modify data in transit. _transform() receives each chunk, processes it, pushes the result, and calls callback(). This uppercase converter extends Transform and implements _transform() to convert each chunk to uppercase."
    },
    {
      "title": "Backpressure Handling Without pipe()",
      "useCase": "Manual backpressure control",
      "code": "var fs = require(\"fs\");\n\nvar readable = fs.createReadStream(\"large-file.txt\");\nvar writable = fs.createWriteStream(\"output.txt\");\n\nfunction writeData() {\n  var chunk;\n  while (null !== (chunk = readable.read())) {\n    var canContinue = writable.write(chunk);\n    if (!canContinue) {\n      console.log(\"Backpressure: pausing read\");\n      readable.pause();\n      writable.once(\"drain\", function() {\n        console.log(\"Buffer drained: resuming read\");\n        writeData();\n      });\n      return;\n    }\n  }\n}\n\nreadable.on(\"readable\", writeData);\n\nwritable.on(\"finish\", function() {\n  console.log(\"Write complete\");\n});",
      "description": "Manual backpressure: read() returns null when buffer is empty. write() returns false when highWaterMark is exceeded, then pause() the readable until \"drain\" fires. This is what pipe() does internally."
    },
    {
      "title": "Streaming HTTP Response Processing",
      "useCase": "Process a large HTTP response chunk by chunk",
      "code": "var http = require(\"http\");\n\nhttp.get(\"http://example.com/large-file\", function(response) {\n  var chunks = [];\n  var totalSize = 0;\n\n  response.on(\"data\", function(chunk) {\n    chunks.push(chunk);\n    totalSize += chunk.length;\n    console.log(\"Received chunk:\", chunk.length, \"bytes\");\n  });\n\n  response.on(\"end\", function() {\n    var buffer = Buffer.concat(chunks);\n    console.log(\"Total received:\", totalSize, \"bytes\");\n    console.log(\"Complete body:\", buffer.toString());\n  });\n\n  response.on(\"error\", function(err) {\n    console.error(\"Stream error:\", err.message);\n  });\n\n  // Pause if we need to slow down consumption\n  response.pause();\n  setTimeout(function() { response.resume(); }, 1000);\n}).on(\"error\", function(err) {\n  console.error(\"Request error:\", err.message);\n});",
      "description": "HTTP responses are Readable streams. The \"data\" event fires for each chunk as it arrives. pause() and resume() control backpressure. For large downloads, pipe directly to a file write stream instead of accumulating in memory."
    },
    {
      "title": "Stream Pipeline with Error Propagation",
      "useCase": "Use pipeline() for proper error handling across multiple streams",
      "code": "var fs = require(\"fs\");\nvar zlib = require(\"zlib\");\nvar pipeline = require(\"stream\").pipeline;\n\n// Read a file, compress it, and write to new file\nvar source = fs.createReadStream(\"input.txt\");\nvar gzip = zlib.createGzip();\nvar destination = fs.createWriteStream(\"input.txt.gz\");\n\npipeline(source, gzip, destination, function(err) {\n  if (err) {\n    console.error(\"Pipeline failed:\", err.message);\n    return;\n  }\n  console.log(\"File compressed successfully\");\n});\n\n// pipeline() destroys all streams on error automatically\n// Unlike pipe(), errors propagate to the callback\n// All streams are properly cleaned up even on failure",
      "description": "pipeline() (Node 15+) provides proper error propagation and cleanup across all streams in the chain. If any stream errors, all streams are destroyed and the callback receives the error. This is the recommended approach over chained pipe() calls."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which stream type is both readable and writable with independent I/O?",
      "options": [
        "Duplex",
        "Transform",
        "Readable",
        "Writable"
      ],
      "answer": 0,
      "explanation": "Duplex streams implement both Readable and Writable independently (e.g., net.Socket). Transform is a special Duplex where output derives from input."
    },
    {
      "question": "What does stream.write() returning false indicate?",
      "options": [
        "Data was written successfully",
        "Backpressure - buffer exceeds highWaterMark",
        "Stream has ended",
        "Invalid chunk type"
      ],
      "answer": 1,
      "explanation": "write() returns false when the internal buffer exceeds highWaterMark, signaling the producer should pause until \"drain\" fires."
    },
    {
      "question": "What is the default highWaterMark for binary streams?",
      "options": [
        "1024 bytes",
        "4096 bytes",
        "8192 bytes",
        "16384 bytes"
      ],
      "answer": 3,
      "explanation": "Default is 16384 bytes (16KB). For objectMode, it defaults to 16 objects."
    },
    {
      "question": "Which method handles backpressure automatically?",
      "options": [
        "stream.read()",
        "stream.write()",
        "stream.pipe()",
        "stream.end()"
      ],
      "answer": 2,
      "explanation": "pipe() handles backpressure automatically by pausing the readable when write() returns false and resuming on \"drain\" events."
    },
    {
      "question": "What event indicates a writable stream is ready for more data after backpressure?",
      "options": [
        "\"ready\"",
        "\"drain\"",
        "\"flush\"",
        "\"resume\""
      ],
      "answer": 1,
      "explanation": "The \"drain\" event fires when the internal buffer has been emptied below highWaterMark, signaling it is safe to write again."
    },
    {
      "question": "How does pipeline() improve on pipe()?",
      "options": [
        "It is faster",
        "It provides automatic cleanup and error propagation",
        "It increases highWaterMark",
        "It supports objectMode"
      ],
      "answer": 1,
      "explanation": "pipeline() destroys all streams on error and propagates errors to the callback. pipe() does not destroy streams on error and does not propagate errors."
    }
  ]
};

TOPICS_DATA["nodejs"]["node-worker-threads"] = {
  "title": "Node.js Worker Threads",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Worker threads allow running JavaScript in parallel on separate threads within the same process, sharing memory via SharedArrayBuffer while avoiding the overhead of separate processes.",
    "Unlike child_process (separate processes) or cluster (separate processes sharing a port), worker threads exist in the same process and can share memory efficiently.",
    "Each Worker has its own V8 context and event loop but shares the same process ID, file descriptors, and module cache (except with specific configuration).",
    "Use worker threads for CPU-intensive JavaScript operations, while child processes are better for running non-JS executables or requiring strong isolation."
  ],
  "laymanDefinition": "Worker threads are like having extra hands in the same workshop. Instead of hiring entirely separate companies (child processes) with their own buildings, you get additional workers in your existing workshop. They share the same tools (process resources), can pass notes directly (shared memory via SharedArrayBuffer), and talk through walkie-talkies (message passing). But unlike cluster workers that are completely separate processes, worker threads can access the same memory space - like two workers writing on the same whiteboard. This makes them perfect for CPU-heavy tasks like data processing or image manipulation, where sharing memory avoids the cost of serializing/deserializing data between processes.",
  "deepDive": [
    {
      "heading": "Worker Threads vs Child Processes vs Cluster",
      "text": "Worker threads: same process, shared memory (SharedArrayBuffer), lower overhead (~2MB per worker), limited to JavaScript operations. Ideal for CPU-intensive JS tasks (data processing, image manipulation, ML inference). Child processes: separate processes, no shared memory, IPC via serialization, higher overhead (~30MB+ per process). Ideal for running non-JS executables, strong isolation. Cluster: separate processes sharing a port via IPC, no shared memory. Ideal for scaling I/O across CPU cores. Worker threads are NOT for I/O scaling (the event loop already handles I/O efficiently). Worker threads are for parallel JavaScript computation that would block the event loop. Each worker thread has its own V8 isolate - this means its own heap, GC, and event loop, but they share the same libuv thread pool."
    },
    {
      "heading": "Worker Creation and Communication",
      "text": "const { Worker } = require(\"worker_threads\"); new Worker(filename, options). Options: workerData (passed as-is via structured clone), eval (evaluate string instead of file), execArgv (Node flags), env (environment object or SHARE_ENV to share), resourceLimits (max memory/CPU). Communication: (1) parentPort.postMessage(data) - send messages to parent. (2) worker.postMessage(data) - parent sends to worker. (3) MessagePort - create additional communication channels via MessageChannel. (4) SharedArrayBuffer - shared memory, no serialization. (5) worker.on(\"message\"), parentPort.on(\"message\") - receive messages. (6) worker.on(\"error\") - uncaught exceptions. (7) worker.on(\"exit\") - thread exited. Messages use structured clone algorithm (supports objects, arrays, Map, Set, RegExp, Blob, ArrayBuffer). Functions and symbols cannot be transferred."
    },
    {
      "heading": "SharedArrayBuffer and Memory Sharing",
      "text": "SharedArrayBuffer allows multiple threads to read/write the same memory without serialization. (1) Create: const sab = new SharedArrayBuffer(1024); (2) Worker receives via transferList: worker.postMessage(sab, [sab]); (3) Access via TypedArray: const view = new Int32Array(sab); (4) Atomics: use Atomics.add(), Atomics.store(), Atomics.load(), Atomics.wait(), Atomics.notify() for synchronization. Without Atomics, concurrent access causes race conditions. Atomics methods are atomic - they complete without interruption. Atomics.wait() allows blocking the worker until a value changes (for producer-consumer patterns). SharedArrayBuffer requires specific conditions: (1) Cross-Origin Isolation headers for browsers. (2) Node.js enables it by default. (3) Threads must use Atomics for synchronization. (4) No race conditions on non-atomic operations. Performance: SharedArrayBuffer eliminates serialization overhead entirely (zero-copy)."
    },
    {
      "heading": "Worker Pool Pattern and Resource Management",
      "text": "Creating a worker per task is expensive. Worker pools reuse workers: (1) Create N workers at startup. (2) Queue tasks when all workers are busy. (3) Workers process tasks and send results back. (4) Workers stay alive for the next task. Pool size: optimal size depends on CPU cores and task characteristics. For CPU-bound tasks: pool size = os.cpus().length - 1 (leave one for main thread). For mixed tasks: tune based on profiling. Resource limits: options.resourceLimits can set maxOldGenerationSizeMb, maxYoungGenerationSizeMb, codeRangeSizeMb. Worker termination: worker.terminate() forcefully stops the worker. Handle cleanup: worker.on(\"exit\") for resource cleanup. For long-running workers, implement periodic health checks (ping/pong via messages). Worker thread overhead: ~2MB memory per worker, ~20-50ms startup time."
    },
    {
      "heading": "Practical Use Cases and Limitations",
      "text": "Good uses: (1) Image/video processing (Sharp library uses worker threads). (2) Data transformation (JSON parsing, CSV processing, XML conversion). (3) Cryptography (hashing, encryption of large data). (4) Machine learning inference (TensorFlow.js, ONNX runtime). (5) Compression/decompression (zlib for large files). (6) Code compilation (Babel, TypeScript, SASS). Limitations: (1) Cannot access DOM (not applicable for Node.js). (2) Cannot access all Node.js APIs - require('worker_threads') is not available inside workers for re-creating threads. (3) Shared state requires careful synchronization (Atomics). (4) Debugging is harder than single-threaded. (5) Module resolution differs - workers resolve modules relative to their file, not the parent. (6) Workers have their own require cache - modules loaded in parent are not automatically available in workers. (7) Circular message references cause errors."
    }
  ],
  "interviewAnswer": "Worker threads enable parallel JavaScript execution within the same process, sharing memory via SharedArrayBuffer. Each worker has its own V8 isolate and event loop. Communication via parentPort.postMessage() (structured clone) or SharedArrayBuffer + Atomics for zero-copy sharing. Worker pools reuse workers to avoid creation overhead. Use workers for CPU-intensive tasks (data processing, crypto, image manipulation) that would block the event loop. Not for I/O (event loop handles that). Overhead: ~2MB memory per worker. Key differences from child_process: same process (shared memory), lower overhead, JavaScript only. Use Atomics for SharedArrayBuffer synchronization (atomic operations prevent race conditions).",
  "interviewQuestions": [
    {
      "question": "What is the difference between worker threads and child processes?",
      "answer": "Worker threads: same process, shared memory via SharedArrayBuffer, lower overhead (~2MB/worker), JavaScript only. Child processes: separate processes, no shared memory, higher overhead (~30MB+), can run any executable. Use workers for CPU-intensive JS; child processes for non-JS or strong isolation."
    },
    {
      "question": "How do workers communicate with the parent?",
      "answer": "(1) Message passing: parentPort.postMessage() / worker.postMessage() using structured clone. (2) SharedArrayBuffer: zero-copy shared memory with Atomics synchronization. (3) MessageChannel: additional communication ports. (4) TransferList: transfer ArrayBuffer ownership (zero-copy)."
    },
    {
      "question": "What is SharedArrayBuffer and how is it synchronized?",
      "answer": "SharedArrayBuffer is a fixed-length memory buffer shared between threads. Use Atomics for synchronization: Atomics.add(), Atomics.store(), Atomics.load(), Atomics.wait(). Without Atomics, concurrent reads/writes cause race conditions. Atomics operations are guaranteed to be atomic."
    },
    {
      "question": "When should you use worker threads instead of the event loop?",
      "answer": "The event loop handles I/O efficiently. Workers are for CPU-intensive tasks that would block the event loop: data transformation, image processing, complex math, ML inference, compression. If it takes >10ms of CPU time off the event loop."
    },
    {
      "question": "What is the overhead of creating a worker thread?",
      "answer": "~2MB memory per worker, ~20-50ms startup time. This is significantly less than child processes (~30MB+ for a Node.js process). Worker pools reuse workers to avoid per-task overhead."
    },
    {
      "question": "How do you pass functions or complex objects to workers?",
      "answer": "Via postMessage() using structured clone algorithm. Supports: objects, arrays, Map, Set, RegExp, Blob, ArrayBuffer. Does NOT support: functions, Symbols, DOM elements, circular references. Use SharedArrayBuffer for large data to avoid serialization cost."
    },
    {
      "question": "What is the workerData option?",
      "answer": "workerData is passed to the worker at creation time and is available via require(\"worker_threads\").workerData. It is copied using structured clone algorithm - no transfer overhead for small data. Useful for initial configuration."
    },
    {
      "question": "How do you terminate a worker thread?",
      "answer": "worker.terminate() forcefully stops the worker. It returns a Promise that resolves once the worker is stopped. The worker.on(\"exit\") event fires. For graceful shutdown, send a shutdown message and let the worker clean up."
    },
    {
      "question": "Can a worker create its own workers?",
      "answer": "No. The worker_threads module is not available inside workers for creating new workers. This prevents nested worker creation. Workers can only be created from the main thread. Use child_process.fork() inside workers for sub-processes."
    },
    {
      "question": "How does error handling work in worker threads?",
      "answer": "Uncaught errors in workers emit \"error\" on the worker object. Unhandled Promise rejections emit \"error\". Workers do NOT crash the main process on uncaught exceptions - they terminate the worker only. Always handle \"error\" events on workers."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Worker Threads Architecture</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Main Thread</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Event loop, I/O, coordination</text><line x1=\"50\" y1=\"100\" x2=\"50\" y2=\"130\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"130\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"210\" y1=\"100\" x2=\"210\" y2=\"130\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"20\" y=\"130\" width=\"60\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"50\" y=\"152.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Worker 1</text><text x=\"50\" y=\"169.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">CPU task</text><rect x=\"80\" y=\"130\" width=\"60\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"110\" y=\"152.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Worker 2</text><text x=\"110\" y=\"169.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">CPU task</text><rect x=\"140\" y=\"130\" width=\"60\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"170\" y=\"152.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Worker N</text><text x=\"170\" y=\"169.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">CPU task</text><rect x=\"310\" y=\"55\" width=\"80\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#9aa0b0\" stroke-width=\"1.5\"/><text x=\"350\" y=\"65\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"normal\" text-anchor=\"middle\">Shared Memory</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Worker Thread with postMessage",
      "useCase": "Offload a CPU-intensive computation to a worker",
      "code": "// main.js\nvar Worker = require(\"worker_threads\").Worker;\n\nvar worker = new Worker(\"./cpu-worker.js\");\n\nworker.on(\"message\", function(result) {\n  console.log(\"Worker result:\", result);\n});\n\nworker.on(\"error\", function(err) {\n  console.error(\"Worker error:\", err.message);\n});\n\nworker.on(\"exit\", function(code) {\n  if (code !== 0) {\n    console.error(\"Worker stopped with exit code\", code);\n  }\n});\n\n// Send data to worker\nworker.postMessage({ numbers: [1,2,3,4,5,6,7,8,9,10] });\n\n// ---------- cpu-worker.js ----------\nvar parentPort = require(\"worker_threads\").parentPort;\n\nparentPort.on(\"message\", function(data) {\n  // CPU-intensive: Fibonacci calculation\n  function fib(n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n  }\n\n  var results = data.numbers.map(function(n) {\n    return { input: n, result: fib(40 + n) };\n  });\n\n  parentPort.postMessage({ type: \"result\", data: results });\n});",
      "description": "Create a Worker with a file path. Communicate via postMessage and on(\"message\"). Workers handle CPU work without blocking the main event loop. Errors in workers do not crash the main process."
    },
    {
      "title": "SharedArrayBuffer with Atomics Synchronization",
      "useCase": "Zero-copy shared memory between threads",
      "code": "// main.js\nvar Worker = require(\"worker_threads\").Worker;\n\n// Shared counter in shared memory\nvar sab = new SharedArrayBuffer(4 * 4); // 4 int32 slots\nvar counter = new Int32Array(sab);\ncounter[0] = 0; // task counter\ncounter[1] = 0; // completed counter\n\nvar worker = new Worker(\"./shared-worker.js\");\n\n// Transfer SharedArrayBuffer (zero-copy)\nworker.postMessage({ sab: sab }, [sab]);\n\n// Main thread updates counter\nAtomics.add(counter, 0, 10); // Add 10 tasks\n\n// Wait for worker to complete all tasks\nAtomics.wait(counter, 1, 0); // Wait until completed !== 0\nconsole.log(\"All tasks completed:\", Atomics.load(counter, 1));\n\nworker.terminate();\n\n// ---------- shared-worker.js ----------\nvar parentPort = require(\"worker_threads\").parentPort;\n\nparentPort.on(\"message\", function(msg) {\n  var sab = msg.sab;\n  var counter = new Int32Array(sab);\n\n  // Read total tasks\n  var total = Atomics.load(counter, 0);\n\n  // Process tasks\n  for (var i = 0; i < total; i++) {\n    // Simulate work\n    Atomics.add(counter, 1, 1); // Increment completed\n  }\n\n  // Notify main thread\n  Atomics.notify(counter, 1, 1);\n});",
      "description": "SharedArrayBuffer provides shared memory. Atomics.store/load/add synchronize access without serialization overhead. Atomics.wait/notify enable producer-consumer coordination. The buffer is transferred (zero-copy) via the transfer list."
    },
    {
      "title": "Worker Pool Implementation",
      "useCase": "Reuse workers for multiple tasks to reduce overhead",
      "code": "var Worker = require(\"worker_threads\").Worker;\nvar os = require(\"os\");\n\nfunction WorkerPool(workerFile, poolSize) {\n  this.workers = [];\n  this.queue = [];\n  this.activeCount = 0;\n\n  for (var i = 0; i < (poolSize || os.cpus().length - 1); i++) {\n    this._addWorker(workerFile);\n  }\n}\n\nWorkerPool.prototype._addWorker = function(workerFile) {\n  var worker = new Worker(workerFile);\n  var self = this;\n\n  worker.on(\"message\", function(result) {\n    self.activeCount--;\n    if (worker._currentResolve) {\n      worker._currentResolve(result);\n      worker._currentResolve = null;\n    }\n    self._processQueue(worker);\n  });\n\n  worker.on(\"error\", function(err) {\n    self.activeCount--;\n    if (worker._currentReject) {\n      worker._currentReject(err);\n      worker._currentReject = null;\n    }\n    self._addWorker(workerFile); // Replace failed worker\n  });\n\n  this.workers.push(worker);\n};\n\nWorkerPool.prototype.exec = function(data) {\n  var self = this;\n  return new Promise(function(resolve, reject) {\n    self.queue.push({ data: data, resolve: resolve, reject: reject });\n    self._processNext();\n  });\n};\n\nWorkerPool.prototype._processNext = function() {\n  if (this.queue.length === 0) return;\n  for (var i = 0; i < this.workers.length; i++) {\n    var w = this.workers[i];\n    if (!w._currentResolve) {\n      var task = this.queue.shift();\n      w._currentResolve = task.resolve;\n      w._currentReject = task.reject;\n      w.postMessage(task.data);\n      this.activeCount++;\n      return;\n    }\n  }\n};\n\n// Usage\nvar pool = new WorkerPool(\"./task-worker.js\", 4);\npool.exec({ numbers: [1,2,3] }).then(function(result) {\n  console.log(\"Task result:\", result);\n});",
      "description": "Worker pools reduce per-task overhead by reusing workers. Workers are created once and process tasks sequentially. The pool maintains a queue and dispatches to idle workers. Failed workers are replaced automatically."
    },
    {
      "title": "TransferList for Zero-Copy ArrayBuffer",
      "useCase": "Transfer large data without copying",
      "code": "// main.js\nvar Worker = require(\"worker_threads\").Worker;\n\n// Create a large buffer\nvar size = 100 * 1024 * 1024; // 100MB\nvar buffer = new ArrayBuffer(size);\nvar view = new Uint8Array(buffer);\nfor (var i = 0; i < size; i++) {\n  view[i] = i % 256;\n}\n\nconsole.log(\"Buffer size:\", buffer.byteLength, \"bytes\");\n\nvar worker = new Worker(\"./transfer-worker.js\");\n\n// WITHOUT transfer: copies the data (slow, 100MB copy)\n// WITH transfer: moves ownership (fast, 0-copy)\nworker.postMessage({ data: buffer }, [buffer]);\n\n// After transfer, buffer is neutered (cannot be used)\nconsole.log(\"Buffer after transfer:\", buffer.byteLength); // 0\n\nworker.on(\"message\", function(msg) {\n  console.log(\"Worker processed:\", msg.result);\n});\n\n// ---------- transfer-worker.js ----------\nvar parentPort = require(\"worker_threads\").parentPort;\n\nparentPort.on(\"message\", function(msg) {\n  var buffer = msg.data;\n  var view = new Uint8Array(buffer);\n\n  // Modify data in place\n  var sum = 0;\n  for (var i = 0; i < view.length; i++) {\n    sum += view[i];\n    view[i] = 255 - view[i];\n  }\n\n  // Send back the modified buffer\n  parentPort.postMessage({ result: sum, data: buffer }, [buffer]);\n});",
      "description": "TransferList enables zero-copy ownership transfer. After transfer, the sender loses access to the buffer (neutered). This is essential for large data to avoid serialization overhead and double memory usage."
    },
    {
      "title": "Resource Limits on Workers",
      "useCase": "Prevent workers from using too much memory or CPU",
      "code": "// main.js\nvar Worker = require(\"worker_threads\").Worker;\n\nvar worker = new Worker(\"./resource-worker.js\", {\n  resourceLimits: {\n    maxOldGenerationSizeMb: 50,  // Max heap size: 50MB\n    maxYoungGenerationSizeMb: 10,\n    codeRangeSizeMb: 5,\n    stackSizeMb: 1\n  }\n});\n\nworker.on(\"error\", function(err) {\n  console.error(\"Worker error (may exceed limits):\", err.message);\n});\n\nworker.on(\"exit\", function(code) {\n  console.log(\"Worker exited with code:\", code);\n});\n\nworker.postMessage({ action: \"allocate\", size: 30 * 1024 * 1024 });\n\n// ---------- resource-worker.js ----------\nvar parentPort = require(\"worker_threads\").parentPort;\n\nparentPort.on(\"message\", function(msg) {\n  if (msg.action === \"allocate\") {\n    // This may fail if it exceeds maxOldGenerationSizeMb\n    try {\n      var buffer = Buffer.alloc(msg.size);\n      buffer.fill(1);\n      parentPort.postMessage({ status: \"ok\", size: buffer.length });\n    } catch (err) {\n      parentPort.postMessage({ status: \"error\", error: err.message });\n    }\n  }\n});",
      "description": "resourceLimits restricts worker memory and CPU usage. If exceeded, the worker is terminated. This prevents a misbehaving worker from consuming all available memory and affecting other workers or the main process."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the main purpose of worker threads?",
      "options": [
        "I/O operations",
        "CPU-intensive JavaScript operations",
        "Network requests",
        "File system operations"
      ],
      "answer": 1,
      "explanation": "Worker threads are for CPU-intensive JavaScript tasks that would block the event loop. I/O is already handled efficiently by the event loop."
    },
    {
      "question": "How do workers communicate without serialization overhead?",
      "options": [
        "JSON.stringify",
        "SharedArrayBuffer with Atomics",
        "Base64 encoding",
        "Compression"
      ],
      "answer": 1,
      "explanation": "SharedArrayBuffer provides zero-copy shared memory. Atomics methods synchronize access. No serialization is needed."
    },
    {
      "question": "What does postMessage with a transfer list do?",
      "options": [
        "Copies the data",
        "Transfers ownership (zero-copy)",
        "Compresses the data",
        "Encrypts the data"
      ],
      "answer": 1,
      "explanation": "TransferList transfers ownership of ArrayBuffer/MessagePort. The sender loses access (neuter), but no copy is made."
    },
    {
      "question": "What is the approximate memory overhead per worker thread?",
      "options": [
        "~2MB",
        "~30MB",
        "~1GB",
        "~100KB"
      ],
      "answer": 0,
      "explanation": "~2MB per worker thread. Child processes are ~30MB+. Worker threads are lightweight because they share the same process."
    },
    {
      "question": "Can a worker thread create its own workers?",
      "options": [
        "Yes, like the main thread",
        "No, workers cannot create workers",
        "Only with special flags",
        "Only in Node 20+"
      ],
      "answer": 1,
      "explanation": "Worker threads cannot create their own workers. This prevents nested thread creation. Use child_process.fork() inside workers for sub-processes."
    },
    {
      "question": "What happens when a worker exceeds resourceLimits?",
      "options": [
        "It continues with degraded performance",
        "The worker is terminated",
        "An event is emitted but continues",
        "Memory is swapped to disk"
      ],
      "answer": 1,
      "explanation": "When resourceLimits are exceeded, the worker is terminated and emits an \"error\" event. This prevents a runaway worker from consuming system resources."
    }
  ]
};

