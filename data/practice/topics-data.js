var TOPICS_DATA = TOPICS_DATA || {};
TOPICS_DATA["practice"] = TOPICS_DATA["practice"] || {};

TOPICS_DATA["practice"]["practice-algorithms"] = {
  "id": "practice-algorithms",
  "title": "Top Algorithm Coding Problems",
  "difficulty": "intermediate",
  "estimatedMinutes": 45,
  "tldr": [
    "Must-practice patterns: Two Pointers, Sliding Window, Binary Search, BFS/DFS, Dynamic Programming, Backtracking.",
    "Two Sum and its variations (sorted input, multiple pairs, 3Sum, 4Sum) appear in 80% of FAANG interviews.",
    "Master the sliding window pattern for substring/ subarray problems — O(n) time, O(1) space.",
    "Tree traversals (inorder, preorder, postorder, level-order) are foundational for 90% of tree problems.",
    "Dynamic Programming: start with Fibonacci (top-down memoization), then 0/1 Knapsack, LCS, and grid paths."
  ],
  "laymanDefinition": "Algorithm problems are like solving puzzles with code. The interviewer gives you a puzzle (like \"find the missing number in an array\"), and you need to write an efficient solution. The key is recognizing patterns: if the problem says \"contiguous subarray\", think sliding window. If it says \"sorted array\", think binary search or two pointers. Like learning chess openings, mastering these patterns helps you recognize the right approach within seconds of reading the problem.",
  "deepDive": [
    {
      "heading": "Two Pointers Pattern",
      "text": "Used for sorted arrays and linked lists. Classic problems: Two Sum (sorted), Remove Duplicates, Container With Most Water, Trapping Rain Water. The pattern: place left at start, right at end, move based on sum comparison. Time: O(n), Space: O(1). For Three Sum: fix one element, run two pointers on the rest. For Linked Lists: Fast/Slow pointer pattern for cycle detection, middle of list, or finding intersection point."
    },
    {
      "heading": "Sliding Window Pattern",
      "text": "For subarray/substring problems: Maximum Sum Subarray of Size K, Longest Substring Without Repeating Characters, Minimum Window Substring. Fixed window: maintain window sum, slide right one step at a time. Variable window: expand right pointer, shrink left when condition breaks. The key insight: once you find a valid window, you can compute all subarrays ending at right that satisfy the condition in O(1) using the left pointer position."
    },
    {
      "heading": "Binary Search Pattern",
      "text": "Beyond basic search: Find First/Last Position of Element, Search in Rotated Sorted Array, Find Peak Element, Sqrt(x). Template: while (left < right) { mid = left + (right - left) / 2; if (condition(mid)) right = mid; else left = mid + 1; } return left; This template works for \"find first\" problems. For \"find last\", swap the logic. Binary search also applies to non-array problems: find the minimum capacity to ship packages within D days, split array largest sum."
    },
    {
      "heading": "Tree Traversals & DFS/BFS",
      "text": "Preorder: root → left → right (clone a tree). Inorder: left → root → right (BST gives sorted order). Postorder: left → right → root (delete tree, evaluate expression). Level-order: BFS using queue. Key problems: Validate BST (inorder must be sorted), Lowest Common Ancestor, Maximum Depth, Diameter of Tree, Serialize/Deserialize. Use recursion for DFS (implicit stack), iterative BFS for shortest path in graphs with unweighted edges."
    },
    {
      "heading": "Dynamic Programming Patterns",
      "text": "1D DP: Fibonacci, Climbing Stairs, House Robber — dp[i] depends on dp[i-1] and dp[i-2]. 2D DP: Grid paths, Edit Distance — dp[i][j] depends on dp[i-1][j], dp[i][j-1], dp[i-1][j-1]. Knapsack: 0/1 (each item once) vs Unbounded (unlimited use). For 0/1 Knapsack: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wi] + vi). State compression: reduce 2D to 1D by iterating backwards. LCS: if chars match, dp[i][j] = 1 + dp[i-1][j-1]; else dp[i][j] = max(dp[i-1][j], dp[i][j-1])."
    },
    {
      "heading": "Backtracking Pattern",
      "text": "Used for generating all permutations, combinations, subsets. Template: function backtrack(start, path) { if goal met, push path; for each option: push, recurse, pop }. Key problems: N-Queens, Sudoku Solver, Letter Combinations of a Phone Number, Palindrome Partitioning. Optimization: prune invalid paths early (branch and bound). For permutations, use a used[] boolean array. For combinations, pass start index to avoid duplicates."
    }
  ],
  "interviewAnswer": "For algorithm interviews, master these patterns: 1) Two Pointers — sorted arrays, linked lists; 2) Sliding Window — subarray/substring optimization; 3) Binary Search — search space reduction; 4) BFS/DFS — trees, graphs, shortest paths; 5) Dynamic Programming — optimal substructure with overlapping subproblems; 6) Backtracking — exhaustive search with pruning. Always start with a brute force solution, then optimize. Communicate your thought process clearly. Test with edge cases: empty input, single element, duplicates, negative numbers, overflow.",
  "interviewQuestions": [
    {
      "question": "Given an array of integers, return indices of two numbers that add up to target.",
      "answer": "Use a hash map: iterate array, for each num, check if target - num exists in map. O(n) time, O(n) space. Edge cases: duplicates, no solution, multiple solutions (return first)."
    },
    {
      "question": "Find the longest substring without repeating characters.",
      "answer": "Sliding window with hash set. Expand right pointer, if char exists in set, shrink left pointer until char is removed. Track max window size. O(n) time, O(min(m, n)) space where m is charset size."
    },
    {
      "question": "Given a binary tree, validate if it is a BST.",
      "answer": "Inorder traversal must yield sorted values. Recursive: pass min/max range to each node. Iterative: inorder with stack, track previous value. Left subtree values < root < right subtree values. Watch for integer bounds — use null or Long.MIN_VALUE."
    },
    {
      "question": "Find the maximum subarray sum (Kadane's Algorithm).",
      "answer": "Initialize maxSoFar = nums[0], maxEndingHere = nums[0]. For each element: maxEndingHere = max(num, maxEndingHere + num); maxSoFar = max(maxSoFar, maxEndingHere). O(n) time, O(1) space. Works for both positive and negative numbers."
    },
    {
      "question": "Reverse a linked list iteratively and recursively.",
      "answer": "Iterative: prev = null, current = head; while current, store next = current.next, current.next = prev, prev = current, current = next; return prev. Recursive: if (!head || !head.next) return head; newHead = reverseList(head.next); head.next.next = head; head.next = null; return newHead."
    },
    {
      "question": "Find the lowest common ancestor of two nodes in a binary tree.",
      "answer": "Recursive: if root is null or matches either p or q, return root. Search left and right. If both return non-null, root is LCA. If only one returns non-null, that's the LCA. O(n) time, O(h) space for recursion stack."
    },
    {
      "question": "Implement a function to check if a string is a valid palindrome (alphanumeric only, ignore case).",
      "answer": "Two pointers: left = 0, right = len-1. While left < right: skip non-alphanumeric chars, compare char.toLowerCase(). If mismatch, return false. O(n) time, O(1) space. Edge: empty string is valid palindrome."
    },
    {
      "question": "Design a LRU (Least Recently Used) Cache.",
      "answer": "HashMap + Doubly Linked List. Map stores key → node. On get: move node to head, return value. On put: if exists, update value and move to head; if new, create node at head. If over capacity, remove tail node and map entry. All operations O(1)."
    },
    {
      "question": "Find the merge point of two linked lists.",
      "answer": "Method 1: calculate lengths, advance longer list by difference, then move both until they meet. Method 2: two pointers, when one reaches end, redirect to other list's head — they meet at intersection after at most 2 passes. O(n + m) time, O(1) space."
    },
    {
      "question": "Given a matrix of 0s and 1s, find the size of the largest square submatrix of 1s.",
      "answer": "DP: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) if matrix[i][j] == 1. Track max side length. Area = side^2. O(mn) time, O(mn) space, can be optimized to O(n) space using only previous row."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 600 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:600px;\"><defs><marker id=\"alArr\" markerWidth=\"8\" markerHeight=\"6\" refX=\"8\" refY=\"3\" orient=\"auto\"><polygon points=\"0 0,8 3,0 6\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"580\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"300\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Algorithm Patterns Decision Tree</text><rect x=\"40\" y=\"55\" width=\"140\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"110\" y=\"78\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Sorted Array?</text><text x=\"280\" y=\"78\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">→ Yes → Two Pointers / Binary Search</text><rect x=\"40\" y=\"100\" width=\"140\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"110\" y=\"123\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Subarray/Substring?</text><text x=\"280\" y=\"123\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">→ Sliding Window O(n)</text><rect x=\"40\" y=\"145\" width=\"140\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"110\" y=\"168\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Optimal Substructure?</text><text x=\"280\" y=\"168\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">→ Dynamic Programming</text><rect x=\"40\" y=\"190\" width=\"140\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"110\" y=\"213\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">All Combos/Perms?</text><text x=\"280\" y=\"213\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">→ Backtracking + Pruning</text><rect x=\"40\" y=\"235\" width=\"140\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"110\" y=\"258\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Tree/Graph?</text><text x=\"280\" y=\"258\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">→ BFS (shortest) / DFS (all paths)</text></svg>",
  "codeExamples": [
    {
      "title": "Sliding Window: Longest Substring Without Repeating",
      "useCase": "O(n) solution for classic substring problem",
      "code": "function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\n// Edge cases: \"abcabcbb\" → 3, \"bbbbb\" → 1, \"\" → 0\n// Time: O(n), Space: O(min(m,n)) where m = charset size",
      "description": "Sliding window with Set: expand right pointer, shrink left when duplicate found. Track max window size."
    },
    {
      "title": "DP: 0/1 Knapsack",
      "useCase": "Classic DP with space optimization",
      "code": "function knapsack(weights, values, capacity) {\n  const n = weights.length;\n  const dp = new Array(capacity + 1).fill(0);\n  for (let i = 0; i < n; i++) {\n    for (let w = capacity; w >= weights[i]; w--) {\n      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);\n    }\n  }\n  return dp[capacity];\n}\n// Items: weight[2,3,4,5], value[3,4,5,6], capacity=5 → 7\n// Time: O(n*C), Space: O(C) with 1D optimization",
      "description": "1D DP array: iterate items outer loop, capacity backward inner loop. This ensures each item is used at most once."
    },
    {
      "title": "Backtracking: Generate All Subsets",
      "useCase": "Classic combination pattern",
      "code": "function subsets(nums) {\n  const result = [];\n  function backtrack(start, path) {\n    result.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);\n      backtrack(i + 1, path);\n      path.pop();\n    }\n  }\n  backtrack(0, []);\n  return result;\n}\n// nums = [1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n// Time: O(2^n), Space: O(n) for recursion stack",
      "description": "Backtracking template: push choice → recurse → pop choice. The start index prevents duplicate combinations."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the time complexity of Kadane's algorithm for maximum subarray sum?",
      "options": [
        "O(n²)",
        "O(n log n)",
        "O(n)",
        "O(1)"
      ],
      "answer": 2,
      "explanation": "Kadane's runs in O(n) time with O(1) space."
    },
    {
      "question": "Which data structure is best for an LRU Cache?",
      "options": [
        "Array",
        "HashMap + Doubly Linked List",
        "Binary Search Tree",
        "Heap"
      ],
      "answer": 1,
      "explanation": "HashMap provides O(1) lookup; Doubly Linked List maintains order with O(1) removal/insertion."
    },
    {
      "question": "For the \"Longest Substring Without Repeating Characters\", which pattern is optimal?",
      "options": [
        "Brute force O(n³)",
        "Two pointers O(n²)",
        "Sliding window O(n)",
        "Binary search O(n log n)"
      ],
      "answer": 2,
      "explanation": "Sliding window with hash set gives O(n) time, O(1) space."
    },
    {
      "question": "What does the recursive reverse linked list function return?",
      "options": [
        "void",
        "The last node (original tail)",
        "The first node (original head)",
        "Nothing"
      ],
      "answer": 1,
      "explanation": "The recursive function returns the new head, which is the original tail of the list."
    },
    {
      "question": "In 0/1 Knapsack DP, why do we iterate capacity backward?",
      "options": [
        "Faster execution",
        "Prevents reusing the same item multiple times",
        "Less memory usage",
        "Easier to understand"
      ],
      "answer": 1,
      "explanation": "Backward iteration ensures each item is counted at most once (0/1 property)."
    },
    {
      "question": "Which tree traversal produces sorted order for a BST?",
      "options": [
        "Preorder",
        "Inorder",
        "Postorder",
        "Level-order"
      ],
      "answer": 1,
      "explanation": "Inorder traversal of a BST visits nodes in ascending sorted order."
    }
  ]
};

TOPICS_DATA["practice"]["practice-system-design"] = {
  "id": "practice-system-design",
  "title": "System Design Interview Problems",
  "difficulty": "advanced",
  "estimatedMinutes": 45,
  "tldr": [
    "System design interviews test your ability to architect large-scale systems handling millions of users.",
    "Use the 4-step framework: Requirements → High-Level Design → Deep Dive → Wrap-Up.",
    "Always estimate scale first: DAU, QPS, storage, bandwidth to guide your design decisions.",
    "Key components: Load Balancer, API Gateway, Application Servers, Cache (Redis), Database (SQL/NoSQL), CDN, Message Queue.",
    "Discuss trade-offs: consistency vs availability, SQL vs NoSQL, synchronous vs async, sharding vs replication."
  ],
  "laymanDefinition": "System design is like being asked to design a city's transportation system. You start with requirements (population, traffic patterns, budget), sketch the major highways and train lines (high-level architecture), then dive into details like traffic light timing at a specific intersection (deep dive), and finally discuss how the system handles rush hour (scale) or a bridge closure (failure). The interviewer wants to see that you can think at multiple levels of abstraction and make reasonable engineering trade-offs.",
  "deepDive": [
    {
      "heading": "Step 1: Requirements Gathering",
      "text": "Start by clarifying functional requirements: what features does the system need? (e.g., URL shortener: create short URL, redirect to original, analytics). Then non-functional: scale (100M DAU?), latency (p99 < 200ms?), availability (99.99%?), durability. Estimate QPS: DAU × actions per user / 86400 seconds. Peak = 2-3x average. Storage: per-item size × items × retention period. Bandwidth: QPS × response size. These estimates guide your architecture decisions — no need to shard below 10K QPS."
    },
    {
      "heading": "Step 2: High-Level Design",
      "text": "Draw the main components and data flow as boxes and arrows. Typical flow: Client → CDN (static) → Load Balancer → API Gateway → App Servers (stateless) → Cache → Database. For write-heavy systems: add Message Queue + Workers + Database. For read-heavy systems: add Cache layer + Read Replicas + CDN for static. Show how a request flows end-to-end. Start simple (3-5 components), then add detail."
    },
    {
      "heading": "Step 3: Deep Dive — Database",
      "text": "SQL for structured data, ACID transactions, complex queries (financial systems, relational data). NoSQL for flexible schema, horizontal scaling, simple queries (Cassandra for time-series, DynamoDB for key-value, MongoDB for documents). Remember: SQL can scale too — with read replicas, sharding, connection pooling. Common choice: SQL + Read Replicas for most systems; NoSQL + Denormalization for social feeds, real-time analytics."
    },
    {
      "heading": "Step 3: Deep Dive — Caching",
      "text": "Cache-Aside pattern: check cache → miss → read DB → populate cache. Set TTL for stale data. Eviction policies: LRU (most common), LFU, FIFO. Cache types: Redis (advanced data structures, persistence), Memcached (simple, multi-threaded). Cache levels: L1 (in-memory, app server), L2 (distributed, Redis cluster). Cache hit ratio target: > 80%. Watch out for: cache stampede (thundering herd), cache penetration (requesting non-existent keys)."
    },
    {
      "heading": "Step 3: Deep Dive — Scaling",
      "text": "Horizontal scaling: add more servers behind load balancer. Stateless apps scale easily. Database scaling: Vertical (bigger machine, has limits) → Read Replicas (scale reads) → Sharding (scale writes). Sharding strategies: hash-based (consistent hashing for minimal rebalancing), range-based (for range queries), directory-based (lookup table). Consistent hashing adds virtual nodes for better distribution. Rebalancing data during resharding is the hardest problem."
    },
    {
      "heading": "Step 4: Wrap-Up",
      "text": "Summarize the design in 2-3 sentences. Discuss improvements: what would you add with more time? (Monitoring, alerting, disaster recovery, multi-region deployment, rate limiting, circuit breakers). Mention trade-offs: why SQL over NoSQL here? Why cache at this layer? Why async for this operation? Every decision should have a clear rationale tied to the requirements gathered in Step 1."
    }
  ],
  "interviewAnswer": "Use the 4-step framework: 1) Requirements — functional + non-functional with scale estimates. 2) High-level design — draw components and data flow (Client → LB → App Servers → Cache → DB). 3) Deep dive — focus on 1-2 components (database choice, caching strategy, sharding approach, consistency model). 4) Wrap-up — summarize, list improvements, discuss trade-offs. Always estimate QPS, storage, and bandwidth first. Every decision must tie back to requirements. Communicate trade-offs explicitly: \"I choose SQL for ACID compliance despite the scaling complexity because financial data requires consistency.\"",
  "interviewQuestions": [
    {
      "question": "Design a URL shortener like bit.ly.",
      "answer": "Generate unique short keys (Base62 encode auto-increment ID or use KGS — Key Generation Service). Store in DynamoDB/Cassandra for scale. Redirect with 301 (permanent, cached) for existing URLs. Estimate: 100M DAU, 1 shortening/day per user → ~1160 QPS for shorten, 10 redirects/day → ~11600 QPS for redirect. Cache popular redirects in Redis. Analytics via Kafka + batch processing."
    },
    {
      "question": "Design a chat system like WhatsApp or Messenger.",
      "answer": "WebSocket for real-time messaging. Store messages in Cassandra (write-optimized, time-ordered). Fan-out on write for small groups (write message once to sender's timeline + each recipient's inbox). Fan-out on read for large groups (write once to group timeline, recipients pull on read). For 1:1 chats: direct inbox delivery. For groups: hybrid approach based on group size. Handle online presence via Redis pub/sub. Media: upload to S3, send CDN URL."
    },
    {
      "question": "Design Twitter feed / News Feed.",
      "answer": "Pre-generate (fan-out on write) timeline for active users: when user tweets, write to all followers' timelines in Redis sorted sets. For celebrities with millions of followers: fan-out on read — celebrity tweets go to a separate timeline, fetched on read and merged with pre-generated feed. Hybrid approach: pre-generate for users with < 10K followers, fan-out on read for larger accounts. Timeline: Redis sorted set by timestamp. Cached for fast retrieval. Trending topics: Spark streaming + MapReduce."
    },
    {
      "question": "Design a video streaming platform like YouTube.",
      "answer": "Upload flow: upload to S3 → async encoding pipeline (transcode to multiple resolutions: 360p, 720p, 1080p, 4K) → store in CDN. Streaming: adaptive bitrate (ABR) — client requests segments based on network conditions. CDN caches popular content at edge. Metadata in SQL (PostgreSQL with read replicas). Search: Elasticsearch. Recommendations: Spark ML on view history. Comments: Cassandra. Watch history: time-series DB."
    },
    {
      "question": "Design a ride-sharing service like Uber.",
      "answer": "Key flows: rider requests ride → match with nearby driver → track trip → payment. Use Redis GEO for real-time driver locations (GEOADD, GEORADIUS). Match algorithm: find nearest available driver within radius, publish to driver's WebSocket. Trip state machine: REQUESTED → ACCEPTED → ARRIVED → IN_PROGRESS → COMPLETED. Handle failures: no driver found (expand radius, retry), driver cancels (re-match). Payments: async via Stripe webhook. Surge pricing: dynamic based on supply/demand ratio."
    },
    {
      "question": "Design a rate limiter (e.g., for an API gateway).",
      "answer": "Token Bucket: tokens added at fixed rate, each request consumes a token. Refill bucket periodically. Sliding Window Log: maintain timestamp log per user, count requests in window. Sliding Window Counter: Redis sorted set with timestamps, ZREMRANGEBYSCORE to remove old entries, ZCARD to count. For distributed rate limiting: Redis cluster, Lua scripts for atomicity. Return 429 + Retry-After header on limit exceeded. Fail open (allow through if Redis is down) vs fail closed."
    },
    {
      "question": "Design a web crawler.",
      "answer": "BFS from seed URLs. Frontier (queue) manages URLs to crawl. Deduplication: Bloom Filter for visited URLs (tolerates false positives, memory efficient). Prioritization: crawl high-quality/popular pages first (PriorityQueue based on PageRank, freshness). Politeness: delay between requests to same domain (robots.txt compliance). Store raw HTML in S3, processed content in Elasticsearch for indexing. Distributed: multiple workers, shared frontier via Redis or Kafka."
    },
    {
      "question": "Design a distributed key-value store (like DynamoDB).",
      "answer": "Partitioning: consistent hashing with virtual nodes. Replication: each key replicated to N nodes (e.g., N=3). Write: quorum consensus — W replicas must acknowledge. Read: R replicas must respond. Tune (R,W,N) for consistency vs availability: (R+W > N) = strong consistency; (R+W <= N) = eventual consistency. Hinted handoff for temporary failures. Merkle trees for anti-entropy (detect and resolve conflicts). Vector clocks for causal ordering."
    },
    {
      "question": "Design a notification system.",
      "answer": "Types: push (mobile), email, SMS, in-app. Architecture: Notification Service → Template Engine → Provider Router → Providers (FCM/APNs for push, SendGrid for email, Twilio for SMS). Rate limiting per user and per channel. Deduplication: idempotency keys. Priority queue: critical notifications bypass rate limit. User preferences: which channels and which notification types. Analytics: delivery rate, open rate, click rate."
    },
    {
      "question": "Design a real-time leaderboard (e.g., for a game).",
      "answer": "Redis Sorted Set is perfect: ZADD to update scores, ZREVRANGE to get top N, ZREVRANK to get user's rank. For millions of users: shard sorted sets by score range. Cache top 100 in memory. For tie-breaking: use score + timestamp (encode as float: score.timestamp). Alternative: skip list data structure. For live updates: WebSocket sends leaderboard deltas. Periodic full refresh for consistency."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 650 350\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:650px;\"><defs><marker id=\"sdArr\" markerWidth=\"8\" markerHeight=\"6\" refX=\"8\" refY=\"3\" orient=\"auto\"><polygon points=\"0 0,8 3,0 6\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"630\" height=\"330\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"325\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">System Design 4-Step Framework</text><rect x=\"30\" y=\"55\" width=\"130\" height=\"40\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"95\" y=\"80\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. Requirements</text><line x1=\"160\" y1=\"75\" x2=\"190\" y2=\"75\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#sdArr)\"/><rect x=\"195\" y=\"55\" width=\"130\" height=\"40\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"260\" y=\"80\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. High-Level</text><line x1=\"325\" y1=\"75\" x2=\"355\" y2=\"75\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#sdArr)\"/><rect x=\"360\" y=\"55\" width=\"130\" height=\"40\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"425\" y=\"80\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. Deep Dive</text><line x1=\"490\" y1=\"75\" x2=\"520\" y2=\"75\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#sdArr)\"/><rect x=\"525\" y=\"55\" width=\"100\" height=\"40\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"575\" y=\"80\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. Wrap</text><line x1=\"575\" y1=\"95\" x2=\"575\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#sdArr)\"/><rect x=\"420\" y=\"125\" width=\"200\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"520\" y=\"150\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Common Architecture</text><text x=\"520\" y=\"165\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Client → CDN → LB → API GW → App → Cache → DB</text><rect x=\"30\" y=\"110\" width=\"200\" height=\"80\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"132\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Estimate Scale First</text><text x=\"130\" y=\"148\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">DAU → QPS → Peak QPS</text><text x=\"130\" y=\"162\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Storage → Bandwidth</text><text x=\"130\" y=\"176\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Cache Hit Ratio Target</text><rect x=\"30\" y=\"210\" width=\"590\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"325\" y=\"233\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Key Decisions &amp; Trade-offs</text><text x=\"325\" y=\"252\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">SQL vs NoSQL | Consistency vs Availability | Synchronous vs Async | Sharding vs Replication | Cache vs DB</text><rect x=\"120\" y=\"280\" width=\"400\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"320\" y=\"306\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Always tie decisions to requirements from Step 1</text></svg>",
  "codeExamples": [
    {
      "title": "Consistent Hashing Implementation",
      "useCase": "Virtual nodes for even distribution",
      "code": "class ConsistentHash {\n  constructor(vnodes = 150) {\n    this.vnodes = vnodes;\n    this.ring = new Map(); // hash → node\n    this.sortedHashes = [];\n    this.nodes = new Set();\n  }\n  _hash(key) {\n    let h = 0;\n    for (let i = 0; i < key.length; i++) {\n      h = ((h << 5) - h) + key.charCodeAt(i);\n      h |= 0;\n    }\n    return h;\n  }\n  addNode(node) {\n    this.nodes.add(node);\n    for (let i = 0; i < this.vnodes; i++) {\n      const hash = this._hash(`${node}:vnode:${i}`);\n      if (!this.ring.has(hash)) {\n        this.ring.set(hash, node);\n        this.sortedHashes.push(hash);\n      }\n    }\n    this.sortedHashes.sort((a, b) => a - b);\n  }\n  getNode(key) {\n    if (this.sortedHashes.length === 0) return null;\n    const hash = this._hash(key);\n    let idx = this.lowerBound(hash);\n    if (idx === this.sortedHashes.length) idx = 0;\n    return this.ring.get(this.sortedHashes[idx]);\n  }\n  lowerBound(target) {\n    let lo = 0, hi = this.sortedHashes.length;\n    while (lo < hi) {\n      const mid = Math.floor((lo + hi) / 2);\n      if (this.sortedHashes[mid] < target) lo = mid + 1;\n      else hi = mid;\n    }\n    return lo;\n  }\n  removeNode(node) {\n    this.nodes.delete(node);\n    for (let i = 0; i < this.vnodes; i++) {\n      const hash = this._hash(`${node}:vnode:${i}`);\n      if (this.ring.has(hash)) {\n        this.ring.delete(hash);\n        const idx = this.sortedHashes.indexOf(hash);\n        if (idx > -1) this.sortedHashes.splice(idx, 1);\n      }\n    }\n  }\n}",
      "description": "Consistent hashing with virtual nodes ensures only 1/N keys move when a node joins or leaves."
    },
    {
      "title": "Redis Rate Limiter (Sliding Window)",
      "useCase": "Atomic Lua script for distributed rate limiting",
      "code": "const RATE_LIMIT_SCRIPT = `\nlocal key = KEYS[1]\nlocal limit = tonumber(ARGV[1])\nlocal window = tonumber(ARGV[2]) -- in seconds\nlocal now = tonumber(ARGV[3])\nlocal pre_win = now - window\n\n-- Remove expired entries\nredis.call(\"ZREMRANGEBYSCORE\", key, 0, pre_win)\n\n-- Count current window entries\nlocal count = redis.call(\"ZCARD\", key)\n\nif count < limit then\n  redis.call(\"ZADD\", key, now, now .. \":\" .. math.random())\n  redis.call(\"EXPIRE\", key, window)\n  return {1, limit - count - 1} -- allowed, remaining\nelse\n  return {0, 0} -- blocked\nend\n`;\n\nasync function checkRateLimit(userId, limit = 100, windowSec = 60) {\n  const now = Date.now() / 1000;\n  const key = `ratelimit:${userId}`;\n  const result = await redis.eval(RATE_LIMIT_SCRIPT, 1, key, limit, windowSec, now);\n  return { allowed: result[1] === 1, remaining: result[1] === 1 ? result[2] : 0 };\n}",
      "description": "Sliding window rate limiter using Redis sorted set. Atomic Lua script ensures race-condition-free counting."
    },
    {
      "title": "URL Shortener Key Generation",
      "useCase": "Base62 encoding with KGS",
      "code": "const BASE62 = \"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\";\n\nfunction base62Encode(num) {\n  if (num === 0) return BASE62[0];\n  let result = \"\";\n  while (num > 0) {\n    result = BASE62[num % 62] + result;\n    num = Math.floor(num / 62);\n  }\n  return result;\n}\n\n// KGS: pre-generate keys to avoid DB contention on ID generation\nclass KGS {\n  constructor() {\n    this.counter = Date.now() * 1000; // timestamp-based start\n    this.batch = [];\n    this.batchSize = 10000;\n  }\n  getNextKey() {\n    if (this.batch.length === 0) {\n      this.refillBatch();\n    }\n    return this.batch.pop();\n  }\n  refillBatch() {\n    for (let i = 0; i < this.batchSize; i++) {\n      this.batch.push(base62Encode(this.counter++));\n    }\n  }\n}\n\n// 7 chars of Base62 = 62^7 ≈ 3.5 trillion unique keys\n// Performance: nanoseconds per encoding, batch of 10K keys uses ~100KB memory",
      "description": "Base62 encoding generates short unique keys from numeric IDs. KGS pre-generates batches to avoid DB contention. 7 characters suffice for trillions of URLs."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the first step in a system design interview?",
      "options": [
        "Draw the database schema",
        "Estimate scale (DAU, QPS, storage)",
        "Choose the tech stack",
        "Discuss trade-offs"
      ],
      "answer": 1,
      "explanation": "Always start with requirements and scale estimates to guide all subsequent decisions."
    },
    {
      "question": "Which caching pattern checks the cache first, falls back to DB, then populates the cache?",
      "options": [
        "Write-Through",
        "Cache-Aside",
        "Write-Behind",
        "Read-Through"
      ],
      "answer": 1,
      "explanation": "Cache-Aside: check cache → miss → read DB → populate cache. Most common pattern."
    },
    {
      "question": "For a chat system with 1:1 messaging, which storage is best?",
      "options": [
        "MySQL",
        "MongoDB",
        "Cassandra (write-optimized, time-ordered)",
        "PostgreSQL"
      ],
      "answer": 2,
      "explanation": "Cassandra excels at write-heavy, time-ordered data with horizontal scaling."
    },
    {
      "question": "What does consistent hashing solve?",
      "options": [
        "Faster queries",
        "Minimal key redistribution when nodes change",
        "Data compression",
        "Authentication"
      ],
      "answer": 1,
      "explanation": "Consistent hashing ensures only 1/N of keys move when a node is added or removed."
    },
    {
      "question": "What is the purpose of a CDN?",
      "options": [
        "Store database backups",
        "Cache static content at edge servers close to users",
        "Run application code",
        "Manage user authentication"
      ],
      "answer": 1,
      "explanation": "CDNs cache static assets (images, CSS, JS, video) at geographically distributed edge servers."
    },
    {
      "question": "In the CAP theorem, what does the P stand for?",
      "options": [
        "Performance",
        "Partition Tolerance",
        "Persistence",
        "Parallelism"
      ],
      "answer": 1,
      "explanation": "Partition Tolerance means the system continues to function despite network partitions between nodes."
    }
  ]
};

TOPICS_DATA["practice"]["practice-sql"] = {
  "id": "practice-sql",
  "title": "SQL Practice Problems",
  "difficulty": "intermediate",
  "estimatedMinutes": 35,
  "tldr": [
    "Master JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN — and when each applies.",
    "Window functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER(PARTITION BY ... ORDER BY ...).",
    "Common table expressions (CTEs) with WITH clause simplify complex queries dramatically.",
    "Indexing strategy: B-tree for equality and range queries, composite indexes for multi-column filters, covering indexes to avoid table lookups.",
    "Query planning: use EXPLAIN ANALYZE to find sequential scans, missing indexes, and sort operations."
  ],
  "laymanDefinition": "SQL practice is like learning to ask a librarian very specific questions about a massive library. Instead of saying \"give me all books,\" you learn to say \"give me the titles of books published after 2020 by authors who have at least 3 books in the fantasy genre, sorted by popularity, and only show the top 10.\" Each clause (JOIN, WHERE, GROUP BY, HAVING, ORDER BY) is like a filter the librarian applies. Window functions are like asking \"for each book, show how it ranks compared to other books by the same author.\"",
  "deepDive": [
    {
      "heading": "JOIN Fundamentals",
      "text": "INNER JOIN: only matching rows from both tables (most common). LEFT JOIN: all rows from left table, NULLs for non-matching right. RIGHT JOIN: opposite. FULL OUTER JOIN: all rows from both, NULLs where no match. CROSS JOIN: Cartesian product (every row × every row). SELF JOIN: join a table to itself (aliases required) — useful for hierarchical data (employees and managers). The key: always specify the JOIN condition with ON — omitting it creates a CROSS JOIN."
    },
    {
      "heading": "Window Functions",
      "text": "Window functions perform calculations across a set of rows related to the current row without collapsing them like GROUP BY. ROW_NUMBER() — unique sequential number per partition. RANK() — same rank for ties, skips numbers. DENSE_RANK() — same rank for ties, no skip. LAG(column, offset) — access previous row's value. LEAD() — access next row's value. SUM() OVER(PARTITION BY dept ORDER BY salary) — running total per department. Frame clause: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."
    },
    {
      "heading": "Subqueries and CTEs",
      "text": "Subquery: nested query inside SELECT, FROM, WHERE, or HAVING. Correlated subquery: references outer query (runs per row — can be slow). EXISTS vs IN: EXISTS is faster for large result sets (stops on first match). WITH (CTE): define named temporary result sets for cleaner, more maintainable queries. Recursive CTEs: for hierarchical data (org charts, category trees). WITH RECURSIVE cte AS (anchor UNION ALL recursive) enables querying tree structures without application-level recursion."
    },
    {
      "heading": "Indexing Strategy",
      "text": "B-tree indexes: default, good for equality and range queries (=, >, <, BETWEEN, LIKE without leading %). Composite indexes: column order matters — put most selective column first (highest cardinality). Covering indexes: include all columns needed by a query so only the index is accessed (no table lookup). Partial indexes: WHERE clause on index (e.g., WHERE status = 'active') — smaller, faster for specific queries. Indexes speed reads but slow writes — don't over-index."
    },
    {
      "heading": "Query Optimization",
      "text": "Use EXPLAIN ANALYZE before optimizing. Red flags: Sequential Scan on large tables (missing index), Nested Loop with many rows (should use Hash Join or Merge Join), Sort operations on large datasets, Temporary files (work_mem too low). Optimizations: (1) Add indexes on JOIN and WHERE columns. (2) Avoid SELECT * — only fetch needed columns. (3) Use EXISTS instead of IN for subqueries. (4) Avoid functions on indexed columns in WHERE (WHERE YEAR(date) = 2023 → WHERE date >= '2023-01-01' AND date < '2024-01-01')."
    }
  ],
  "interviewAnswer": "For SQL interviews, master INNER/LEFT JOINs, GROUP BY with HAVING, window functions (ROW_NUMBER, RANK, LAG), and CTEs. Common patterns: find duplicates (GROUP BY + HAVING COUNT > 1), top N per group (window function + WHERE rank <= N), running totals (SUM OVER ORDER BY), date range queries (BETWEEN, date_trunc), and hierarchical queries (recursive CTEs). For optimization: EXPLAIN ANALYZE, add indexes on JOIN/WHERE columns, prefer EXISTS over IN for large subquery results. Write readable, well-formatted SQL with consistent capitalization and indentation.",
  "interviewQuestions": [
    {
      "question": "Write a query to find the second highest salary from an Employee table.",
      "answer": "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee). Or with window: SELECT DISTINCT salary FROM (SELECT salary, DENSE_RANK() OVER(ORDER BY salary DESC) rk FROM Employee) WHERE rk = 2. Handle ties with DENSE_RANK."
    },
    {
      "question": "Find employees who earn more than their manager.",
      "answer": "SELECT e.name FROM Employee e JOIN Employee m ON e.manager_id = m.id WHERE e.salary > m.salary. Self-join with aliases. Edge case: CEO with no manager (manager_id IS NULL) excluded by INNER JOIN."
    },
    {
      "question": "Write a query to find departments with more than 5 employees.",
      "answer": "SELECT d.name, COUNT(e.id) as emp_count FROM Department d JOIN Employee e ON d.id = e.dept_id GROUP BY d.id, d.name HAVING COUNT(e.id) > 5. HAVING filters after GROUP BY, WHERE filters before."
    },
    {
      "question": "Find the top 3 products by sales in each category.",
      "answer": "SELECT category, product, total_sales FROM (SELECT c.name as category, p.name as product, SUM(od.quantity * od.price) as total_sales, ROW_NUMBER() OVER(PARTITION BY c.id ORDER BY SUM(od.quantity * od.price) DESC) rn FROM Category c JOIN Product p ON c.id = p.category_id JOIN OrderDetail od ON p.id = od.product_id GROUP BY c.id, c.name, p.id, p.name) ranked WHERE rn <= 3."
    },
    {
      "question": "Find all dates with more than 100 orders.",
      "answer": "SELECT DATE(order_date) as order_day, COUNT(*) as order_count FROM Orders GROUP BY DATE(order_date) HAVING COUNT(*) > 100. Use DATE() to truncate timestamp to day."
    },
    {
      "question": "Find customers who haven't ordered in the last 90 days.",
      "answer": "SELECT c.* FROM Customer c LEFT JOIN Orders o ON c.id = o.customer_id AND o.order_date >= DATEADD(day, -90, GETDATE()) WHERE o.id IS NULL. LEFT JOIN + IS NULL = anti-join pattern."
    },
    {
      "question": "Calculate a running total of sales by date.",
      "answer": "SELECT order_date, amount, SUM(amount) OVER(ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as running_total FROM Orders. Window function SUM OVER ORDER BY."
    },
    {
      "question": "Find duplicate email addresses in a Users table.",
      "answer": "SELECT email, COUNT(*) FROM Users GROUP BY email HAVING COUNT(*) > 1. To delete duplicates: use ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) and delete rows with rn > 1."
    },
    {
      "question": "Write a query to pivot rows to columns (e.g., monthly sales as columns).",
      "answer": "SELECT product, SUM(CASE WHEN MONTH(order_date)=1 THEN amount END) as Jan, SUM(CASE WHEN MONTH(order_date)=2 THEN amount END) as Feb FROM Sales GROUP BY product. Alternatively: CROSSTAB from tablefunc extension."
    },
    {
      "question": "Find the difference between current and previous month sales for each product.",
      "answer": "SELECT product_id, month, sales, LAG(sales) OVER(PARTITION BY product_id ORDER BY month) as prev_sales, sales - LAG(sales) OVER(PARTITION BY product_id ORDER BY month) as diff FROM monthly_sales. LAG accesses previous row's value."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 600 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:600px;\"><defs><marker id=\"sqArr\" markerWidth=\"8\" markerHeight=\"6\" refX=\"8\" refY=\"3\" orient=\"auto\"><polygon points=\"0 0,8 3,0 6\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"580\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"300\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">SQL Query Execution Order</text><rect x=\"80\" y=\"55\" width=\"440\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"300\" y=\"78\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. FROM → JOIN → ON (Tables &amp; Joins)</text><rect x=\"80\" y=\"97\" width=\"440\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"300\" y=\"120\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. WHERE (Row Filter)</text><rect x=\"80\" y=\"139\" width=\"440\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"300\" y=\"162\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. GROUP BY → Aggregations</text><rect x=\"80\" y=\"181\" width=\"440\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"300\" y=\"204\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. HAVING (Group Filter)</text><rect x=\"80\" y=\"223\" width=\"440\" height=\"36\" rx=\"5\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"300\" y=\"246\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">5. SELECT → DISTINCT → ORDER BY → LIMIT</text></svg>",
  "codeExamples": [
    {
      "title": "Window Functions: Top N Per Group",
      "useCase": "Find top 3 products by revenue per category",
      "code": "WITH ranked_products AS (\n  SELECT\n    c.name AS category,\n    p.name AS product,\n    SUM(od.quantity * od.unit_price) AS revenue,\n    ROW_NUMBER() OVER (\n      PARTITION BY c.id\n      ORDER BY SUM(od.quantity * od.unit_price) DESC\n    ) AS rn\n  FROM categories c\n  JOIN products p ON p.category_id = c.id\n  JOIN order_details od ON od.product_id = p.id\n  GROUP BY c.id, c.name, p.id, p.name\n)\nSELECT category, product, revenue\nFROM ranked_products\nWHERE rn <= 3\nORDER BY category, rn;",
      "description": "ROW_NUMBER() OVER(PARTITION BY category ORDER BY revenue DESC) gives rank per category. CTE simplifies the outer query."
    },
    {
      "title": "Recursive CTE: Org Chart",
      "useCase": "Employee hierarchy tree",
      "code": "WITH RECURSIVE org_chart AS (\n  -- Anchor: top-level managers\n  SELECT id, name, manager_id, 1 AS level,\n         CAST(name AS VARCHAR(500)) AS path\n  FROM employees\n  WHERE manager_id IS NULL\n  UNION ALL\n  -- Recursive: their reports\n  SELECT e.id, e.name, e.manager_id,\n         oc.level + 1,\n         CAST(oc.path || ' → ' || e.name AS VARCHAR(500))\n  FROM employees e\n  JOIN org_chart oc ON e.manager_id = oc.id\n)\nSELECT level, path\nFROM org_chart\nORDER BY path;",
      "description": "Recursive CTE walks the employee-manager hierarchy. Anchor query gets roots (no manager), recursive step joins children."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which SQL clause filters rows after GROUP BY?",
      "options": [
        "WHERE",
        "HAVING",
        "FILTER",
        "LIMIT"
      ],
      "answer": 1,
      "explanation": "HAVING filters grouped results (after aggregation). WHERE filters individual rows (before aggregation)."
    },
    {
      "question": "What does ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) do?",
      "options": [
        "Groups employees by department",
        "Assigns a unique rank to each employee within their department, ordered by salary descending",
        "Calculates average salary per department",
        "Filters top salaries"
      ],
      "answer": 1,
      "explanation": "ROW_NUMBER() assigns a unique sequential number per partition."
    },
    {
      "question": "Which JOIN returns all rows from the left table?",
      "options": [
        "INNER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN",
        "CROSS JOIN"
      ],
      "answer": 1,
      "explanation": "LEFT JOIN returns all rows from the left table with NULLs where no match in right."
    },
    {
      "question": "What is the purpose of EXPLAIN ANALYZE?",
      "options": [
        "Format query output",
        "Show query execution plan with actual times",
        "Compress query results",
        "Validate JSON"
      ],
      "answer": 1,
      "explanation": "EXPLAIN ANALYZE shows the execution plan with actual timing and row counts for query optimization."
    },
    {
      "question": "Which index type is the default in PostgreSQL?",
      "options": [
        "Hash",
        "B-tree",
        "GiST",
        "GIN"
      ],
      "answer": 1,
      "explanation": "B-tree is the default index type, good for equality and range queries."
    },
    {
      "question": "What does LAG(column, 1) OVER(ORDER BY date) return?",
      "options": [
        "The next row's value",
        "The previous row's value in the ordered sequence",
        "The first row's value",
        "NULL for all rows"
      ],
      "answer": 1,
      "explanation": "LAG accesses the previous row's value within the window frame. LEAD accesses the next row."
    }
  ]
};

TOPICS_DATA["practice"]["practice-javascript"] = {
  "id": "practice-javascript",
  "title": "JavaScript Coding Challenges",
  "difficulty": "intermediate",
  "estimatedMinutes": 35,
  "tldr": [
    "Master polyfills: implement your own Promise.all, Array.map, Array.filter, Array.reduce, Function.bind.",
    "Understand closures and their practical uses: module pattern, memoization, currying, event handlers in loops.",
    "Event loop phases: timers → I/O callbacks → idle → poll → check (setImmediate) → close callbacks. Microtasks (Promise.then) run between phases.",
    "Deep vs shallow copy: structuredClone() for deep cloning, spread operator for shallow. Watch for circular references.",
    "Debouncing and throttling are essential for performance optimization — know when to use each."
  ],
  "laymanDefinition": "JavaScript coding challenges test your understanding of how the language actually works under the hood. It's like being an auto mechanic who needs to know not just how to drive a car (write code) but how the engine works (closures, event loop, prototypal inheritance). Interviewers ask you to implement Array.map from scratch to prove you understand what .map actually does — not just that you can use it. These questions separate developers who truly understand JS from those who just copy-paste from Stack Overflow.",
  "deepDive": [
    {
      "heading": "Polyfills: Implementing Array Methods",
      "text": "Array.map: create new array, call callback on each element with (element, index, array), return new array. Array.filter: create new array, push elements where callback returns truthy. Array.reduce: accumulator starts with initialValue or first element, callback runs for each element. Function.bind: returns new function with fixed this and partial args. Promise.all: returns a promise that resolves when all input promises resolve, or rejects on first rejection. Implement each without using the built-in method."
    },
    {
      "heading": "Closures in Practice",
      "text": "A closure is a function that retains access to its outer scope even after the outer function has returned. Practical uses: (1) Module pattern — encapsulate private variables with public API. (2) Memoization — cache function results. (3) Currying — transform multi-argument functions into chained single-argument functions. (4) Event handlers in loops — the classic \"var in loop\" bug is solved by closures (IIFE or let). (5) Factory functions — create functions with preset configuration."
    },
    {
      "heading": "Event Loop Deep Dive",
      "text": "Call stack: synchronous execution. Web APIs: setTimeout, fetch, DOM events (run in browser threads). Task queue (macrotasks): setTimeout callbacks, setInterval, I/O. Microtask queue: Promise.then/catch/finally, queueMicrotask, MutationObserver. Event loop: (1) Execute all synchronous code. (2) Process all microtasks (clear the microtask queue). (3) Process one macrotask. (4) Re-render UI if needed. (5) Repeat. This explains why setTimeout(0) doesn't run immediately — it's a macrotask and waits for microtasks."
    },
    {
      "heading": "Async/Await and Error Handling",
      "text": "async function returns a Promise. await pauses execution until the promise settles. Error handling: try/catch around await, or .catch() on the returned promise. Multiple awaits: sequential (slow) vs Promise.all (parallel). Common pitfall: forgetting await inside loops — use for...of with await, or Promise.allSettled for parallel with partial failure. Top-level await: available in modules. Always handle promise rejections — unhandled rejections crash Node.js."
    },
    {
      "heading": "Prototypal Inheritance vs Classes",
      "text": "JavaScript uses prototypal inheritance: objects inherit from other objects via [[Prototype]]. The `new` keyword: (1) creates empty object, (2) sets prototype, (3) calls constructor with `this` bound, (4) returns object. Class syntax is syntactic sugar over prototypes. Understand: Object.create(), constructor.prototype, __proto__, instanceof, hasOwnProperty(). Interview trick: implement `new` operator from scratch: function myNew(Constructor, ...args) { const obj = Object.create(Constructor.prototype); const result = Constructor.apply(obj, args); return typeof result === 'object' && result !== null ? result : obj; }."
    }
  ],
  "interviewAnswer": "For JavaScript interviews, master: (1) Polyfills — implement map, filter, reduce, bind, Promise.all from scratch. (2) Closures — module pattern, memoization, currying, var/let loop behavior. (3) Event loop — microtask vs macrotask ordering, explain Promise.then vs setTimeout order. (4) Async/await — error handling, Promise.all vs allSettled, sequential vs parallel. (5) Prototypal inheritance — implement `new`, understand `this` binding, Object.create. (6) Debounce vs throttle — implement both from scratch. Write clean code with proper error handling and edge case coverage.",
  "interviewQuestions": [
    {
      "question": "Implement Array.prototype.map from scratch.",
      "answer": "Array.prototype.myMap = function(callback, thisArg) { const result = []; for (let i = 0; i < this.length; i++) { if (i in this) result.push(callback.call(thisArg, this[i], i, this)); } return result; }. Handle sparse arrays with `in` operator."
    },
    {
      "question": "Implement Function.prototype.bind.",
      "answer": "Function.prototype.myBind = function(thisArg, ...boundArgs) { const fn = this; return function(...args) { return fn.apply(thisArg, [...boundArgs, ...args]); }; }. Handle new operator: if called with `new`, ignore thisArg."
    },
    {
      "question": "Implement a debounce function.",
      "answer": "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }. Leading edge option: invoke immediately then suppress subsequent calls within window."
    },
    {
      "question": "Implement a throttle function.",
      "answer": "function throttle(fn, limit) { let inThrottle; return function(...args) { if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }. Trailing edge: ensure last call executes after limit."
    },
    {
      "question": "Implement Promise.all.",
      "answer": "Promise.myAll = function(promises) { return new Promise((resolve, reject) => { const results = new Array(promises.length); let remaining = promises.length; if (remaining === 0) resolve(results); promises.forEach((p, i) => Promise.resolve(p).then(val => { results[i] = val; if (--remaining === 0) resolve(results); }, reject)); }); }. Handles non-promise values with Promise.resolve."
    },
    {
      "question": "Explain the output of: console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);",
      "answer": "Output: 1, 4, 3, 2. Explanation: 1 and 4 are synchronous. Promise.then is a microtask (runs before next macrotask). setTimeout(0) is a macrotask (runs after microtasks are cleared)."
    },
    {
      "question": "Implement deep clone (handle circular references).",
      "answer": "function deepClone(obj, map = new WeakMap()) { if (obj === null || typeof obj !== 'object') return obj; if (map.has(obj)) return map.get(obj); const clone = Array.isArray(obj) ? [] : {}; map.set(obj, clone); for (const key of Object.keys(obj)) clone[key] = deepClone(obj[key], map); return clone; }. WeakMap tracks circular references. For production: structuredClone()."
    },
    {
      "question": "Explain \"this\" binding rules.",
      "answer": "(1) Default: global (or undefined in strict mode). (2) Implicit: obj.method() → obj. (3) Explicit: call, apply, bind. (4) New: new Constructor() → new instance. (5) Arrow: inherits this from enclosing scope (lexical). Priority: new > explicit > implicit > default."
    },
    {
      "question": "Implement an EventEmitter (pub/sub) class.",
      "answer": "class EventEmitter { constructor() { this.events = {}; } on(event, listener) { (this.events[event] ||= []).push(listener); return () => this.off(event, listener); } off(event, listener) { if (!this.events[event]) return; this.events[event] = this.events[event].filter(l => l !== listener); } emit(event, ...args) { (this.events[event] || []).forEach(l => l(...args)); } once(event, listener) { const wrapper = (...args) => { listener(...args); this.off(event, wrapper); }; this.on(event, wrapper); } }."
    },
    {
      "question": "Implement a memoization function.",
      "answer": "function memoize(fn) { const cache = new Map(); return function(...args) { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn.apply(this, args); cache.set(key, result); return result; }; }. For recursive functions (like Fibonacci), the memoized version must call the memoized wrapper, not itself. Use WeakMap for object keys."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 600 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:600px;\"><defs><marker id=\"jsArr\" markerWidth=\"8\" markerHeight=\"6\" refX=\"8\" refY=\"3\" orient=\"auto\"><polygon points=\"0 0,8 3,0 6\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"580\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"300\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">JavaScript Event Loop</text><rect x=\"30\" y=\"55\" width=\"180\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"120\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Call Stack</text><text x=\"120\" y=\"93\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Synchronous code</text><line x1=\"210\" y1=\"80\" x2=\"270\" y2=\"80\" stroke=\"#f87171\" stroke-width=\"2\"/><text x=\"240\" y=\"70\" fill=\"#f87171\" font-size=\"8\" text-anchor=\"middle\">1 macrotask</text><rect x=\"270\" y=\"55\" width=\"150\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"345\" y=\"73\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Render (ui)</text><text x=\"345\" y=\"93\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Browser paint</text><line x1=\"420\" y1=\"80\" x2=\"480\" y2=\"80\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"450\" y=\"70\" fill=\"#fbbf24\" font-size=\"8\" text-anchor=\"middle\">microtasks</text><rect x=\"480\" y=\"55\" width=\"100\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"530\" y=\"78\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Microtasks</text><text x=\"530\" y=\"93\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Promise.then</text><rect x=\"30\" y=\"130\" width=\"550\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"305\" y=\"155\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Macrotask Queue: setTimeout, setInterval, I/O, DOM events</text><rect x=\"30\" y=\"180\" width=\"550\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"305\" y=\"205\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Microtask Queue: Promise callbacks, queueMicrotask, MutationObserver</text><rect x=\"30\" y=\"235\" width=\"550\" height=\"35\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"305\" y=\"257\" fill=\"#f87171\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Order: 1 Call Stack → 2 Clear Microtasks → 3 One Macrotask → 4 Render → Repeat</text></svg>",
  "codeExamples": [
    {
      "title": "EventEmitter Implementation",
      "useCase": "Pub/sub pattern from scratch",
      "code": "class EventEmitter {\n  constructor() {\n    this._events = new Map();\n  }\n  on(event, listener) {\n    if (!this._events.has(event)) {\n      this._events.set(event, []);\n    }\n    this._events.get(event).push(listener);\n    return () => this.off(event, listener);\n  }\n  off(event, listenerToRemove) {\n    if (!this._events.has(event)) return;\n    const filtered = this._events.get(event)\n      .filter(l => l !== listenerToRemove);\n    if (filtered.length === 0) this._events.delete(event);\n    else this._events.set(event, filtered);\n  }\n  emit(event, ...args) {\n    if (!this._events.has(event)) return false;\n    this._events.get(event).forEach(l => l(...args));\n    return true;\n  }\n  once(event, listener) {\n    const wrapper = (...args) => {\n      listener(...args);\n      this.off(event, wrapper);\n    };\n    this.on(event, wrapper);\n  }\n}\n\n// Usage\nconst ee = new EventEmitter();\nconst off = ee.on(\"data\", d => console.log(d));\nee.emit(\"data\", \"hello\"); // logs \"hello\"\noff();\nee.emit(\"data\", \"world\"); // nothing logged",
      "description": "EventEmitter implements the observer pattern. on() returns an unsubscribe function for easy cleanup. once() auto-removes after first emit."
    },
    {
      "title": "Currying with Placeholder Support",
      "useCase": "Advanced currying similar to lodash",
      "code": "const _ = Symbol(\"placeholder\");\n\nfunction curry(fn, arity = fn.length, ...args) {\n  return function(...nextArgs) {\n    const merged = [];\n    let argsIdx = 0, nextIdx = 0;\n    while (argsIdx < args.length || nextIdx < nextArgs.length) {\n      const a = argsIdx < args.length ? args[argsIdx] : _;\n      const n = nextIdx < nextArgs.length ? nextArgs[nextIdx] : _;\n      if (a !== _ && a !== undefined) {\n        merged.push(a);\n        argsIdx++;\n      } else if (n !== _ && n !== undefined) {\n        merged.push(n);\n        nextIdx++;\n      } else { break; }\n    }\n    const remaining = [...merged, ...nextArgs.slice(nextIdx)];\n    if (remaining.length >= arity\n        && remaining.filter(a => a === _).length === 0) {\n      return fn(...remaining);\n    }\n    return curry(fn, arity, ...remaining);\n  };\n}\n\n// Usage:\nconst add = curry((a, b, c) => a + b + c);\nadd(1, 2, 3); // 6\nadd(1)(2)(3); // 6",
      "description": "Currying transforms a multi-argument function into a sequence of unary functions. Placeholder support enables skipping arguments."
    },
    {
      "title": "Promise Pool: Limit Concurrency",
      "useCase": "Run N async tasks with max concurrency",
      "code": "async function promisePool(tasks, limit) {\n  const results = [];\n  const executing = new Set();\n\n  for (const [index, task] of tasks.entries()) {\n    const promise = Promise.resolve().then(() => task());\n    results[index] = promise;\n    executing.add(promise);\n\n    const cleanup = () => executing.delete(promise);\n    promise.then(cleanup, cleanup);\n\n    if (executing.size >= limit) {\n      await Promise.race(executing);\n    }\n  }\n\n  return Promise.all(results);\n}\n\n// Usage: process 100 URLs with 5 concurrent connections\nconst urls = Array.from({length: 100}, (_, i) =>\n  () => fetch(`https://api.example.com/item/${i}`)\n);\nconst responses = await promisePool(urls, 5);",
      "description": "Promise pool limits concurrent execution. When limit is reached, race() waits for any task to complete before starting the next."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the output of: setTimeout(() => console.log(1), 0); Promise.resolve().then(() => console.log(2)); console.log(3);",
      "options": [
        "3, 1, 2",
        "3, 2, 1",
        "1, 2, 3",
        "2, 3, 1"
      ],
      "answer": 1,
      "explanation": "Promise.then (microtask) runs before setTimeout (macrotask). Synchronous code runs first."
    },
    {
      "question": "Which method creates a new array by applying a function to each element?",
      "options": [
        "filter()",
        "map()",
        "reduce()",
        "forEach()"
      ],
      "answer": 1,
      "explanation": "map() creates a new array with transformed elements. filter() selects, reduce() aggregates, forEach() iterates."
    },
    {
      "question": "What does the `new` keyword do?",
      "options": [
        "Calls a function",
        "Creates object, sets prototype, binds this, returns object",
        "Copies an object",
        "Declares a variable"
      ],
      "answer": 1,
      "explanation": "new: creates empty object, sets [[Prototype]], calls constructor with this bound, returns the object."
    },
    {
      "question": "Which of these is a microtask source?",
      "options": [
        "setTimeout",
        "Promise.then",
        "setInterval",
        "DOM event listener"
      ],
      "answer": 1,
      "explanation": "Promise callbacks are microtasks. setTimeout, setInterval, and DOM events are macrotasks."
    },
    {
      "question": "What is the primary use case for debounce?",
      "options": [
        "Limit execution rate (e.g., scroll handler)",
        "Delay execution until after a pause (e.g., search input)",
        "Parallel execution",
        "Error handling"
      ],
      "answer": 1,
      "explanation": "Debounce: wait for a pause before executing (search input). Throttle: limit rate (scroll handler)."
    },
    {
      "question": "How does structuredClone() handle circular references?",
      "options": [
        "Throws an error",
        "Returns undefined for circular refs",
        "Handles them correctly via internal reference tracking",
        "Creates infinite recursion"
      ],
      "answer": 2,
      "explanation": "structuredClone() uses an internal reference map to handle circular references correctly."
    }
  ]
};

TOPICS_DATA["practice"]["practice-react"] = {
  "id": "practice-react",
  "title": "React Coding Challenges",
  "difficulty": "advanced",
  "estimatedMinutes": 40,
  "tldr": [
    "Build these from scratch: custom hooks (useLocalStorage, useDebounce, useIntersectionObserver), compound components, render props pattern.",
    "State management challenges: implement a mini-Redux with useReducer + Context, build a shopping cart with proper state architecture.",
    "Performance challenges: memoize expensive computations, implement virtualization for long lists, optimize re-renders with useMemo/useCallback.",
    "Form handling: controlled vs uncontrolled, validation, dynamic form fields, multi-step forms with state persistence.",
    "Testing: write component tests with React Testing Library focusing on behavior, mock API calls with msw, test error states and edge cases."
  ],
  "laymanDefinition": "React coding challenges are like being asked to build specific furniture pieces from scratch rather than assembling IKEA kits. Anyone can use a ready-made hook or component library, but interviewers want to see if you understand the underlying mechanics. Can you build a custom hook that syncs state with localStorage? Can you implement a tab component using the compound components pattern? Can you create a mini state management system using just useReducer and Context? These challenges prove you understand React deeply, not just how to use it.",
  "deepDive": [
    {
      "heading": "Custom Hooks: Reusable Logic",
      "text": "Custom hooks extract component logic into reusable functions. useLocalStorage: sync state with localStorage. useDebounce: delay value updates for search inputs. useIntersectionObserver: trigger when element enters viewport. useMediaQuery: responsive breakpoints. useInterval: declarative setInterval that respects dependencies. usePrevious: track previous value. The rule: prefix with \"use\", only call hooks at top level, don't call hooks inside conditions or loops. Custom hooks compose: one hook can call another hook."
    },
    {
      "heading": "Compound Components Pattern",
      "text": "A parent component manages implicit state and shares it with child components via Context. Use cases: Tabs (TabList, Tab, TabPanels), Accordion, Select, Form controls. Pattern: parent creates context with state + setters, children use useContext to access and modify state. Children are flexible — they render whatever JSX is passed, but get behavior from context. Example: <Tabs><TabList><Tab>One</Tab><Tab>Two</Tab></TabList><TabPanels><Panel>Content 1</Panel><Panel>Content 2</Panel></TabPanels></Tabs>."
    },
    {
      "heading": "State Management Architecture",
      "text": "For complex state (e.g., shopping cart): (1) Normalize state — store as entities map + IDs array. (2) Use useReducer for related state transitions. (3) Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, APPLY_COUPON. (4) Selectors: derived data (subtotal, tax, total, item count). (5) Split contexts: CartContext for data, CartDispatchContext for actions (avoids unnecessary re-renders). (6) Persist cart to localStorage with effect. Test reducer logic as a pure function."
    },
    {
      "heading": "Performance Optimization",
      "text": "(1) React.memo — prevent re-render when props haven't changed (shallow comparison). (2) useMemo — memoize expensive computations (reselect-style selectors). (3) useCallback — memoize callbacks passed to memoized children. (4) useTransition — mark non-urgent state updates. (5) Virtualization — render only visible items in long lists (react-window, react-virtuoso). (6) Code splitting — React.lazy + Suspense for route-level chunks. (7) Avoid: creating new objects/arrays in render, inline arrow functions in props of memoized children."
    },
    {
      "heading": "Error Boundaries and Edge Cases",
      "text": "Error boundaries catch rendering errors in child components. Implement with componentDidCatch or a reusable ErrorBoundary wrapper. Test error states: simulate API failure, invalid props, missing context. Edge cases: empty state (no data to display), loading state (skeleton/spinner), error state (retry button), partial data (some fields missing), race conditions (stale closures in useEffect cleanup), memory leaks (unsubscribed listeners, unclosed WebSockets)."
    }
  ],
  "interviewAnswer": "For React coding challenges, focus on: (1) Custom hooks — build useLocalStorage, useDebounce, useIntersectionObserver from scratch. (2) Compound components — implement Tabs or Accordion without external libraries. (3) State management — use useReducer + Context to create a mini state management system. (4) Performance — React.memo, useMemo, useCallback, virtualization with react-window. (5) Testing — RTL with msw for API mocking, test loading/error/success states. (6) Edge cases — empty states, race conditions, memory leaks, error boundaries. Write clean, TypeScript-friendly code with proper error handling.",
  "interviewQuestions": [
    {
      "question": "Implement a useLocalStorage custom hook.",
      "answer": "function useLocalStorage(key, initialValue) { const [value, setValue] = useState(() => { try { const item = localStorage.getItem(key); return item !== null ? JSON.parse(item) : initialValue; } catch { return initialValue; } }); useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error('localStorage error', e); } }, [key, value]); return [value, setValue]; }. Handle SSR (no localStorage), JSON parse errors, quota exceeded."
    },
    {
      "question": "Implement a compound Tabs component.",
      "answer": "Create TabContext. Tabs component provides context with activeTab and setActiveTab. Tab reads context, sets activeTab on click. TabPanel reads context, renders only when active. Pattern: export { Tabs, Tab, TabPanel } as compound components. Parent manages state, children consume via useContext. Flexible API allows any rendering structure."
    },
    {
      "question": "Build a search input with debounce (300ms).",
      "answer": "function useDebounce(value, delay) { const [debounced, setDebounced] = useState(value); useEffect(() => { const timer = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(timer); }, [value, delay]); return debounced; }. Usage: const debouncedQuery = useDebounce(query, 300); useEffect(() => { fetchResults(debouncedQuery); }, [debouncedQuery]);"
    },
    {
      "question": "Implement a mini-Redux with useReducer + Context.",
      "answer": "Create a Provider that holds useReducer(state, reducer). Create two contexts: StateContext and DispatchContext. Export useDispatch() and useSelector(selector) hooks. useSelector subscribes to state changes and returns selected slice. Provider wraps the app. This gives Redux-like architecture without the library."
    },
    {
      "question": "Build a controlled form with validation.",
      "answer": "State: { values, errors, touched }. Validation function returns errors object. onChange: update values, validate field, update errors. onSubmit: validate all, if no errors, submit. Show errors only after first blur (touched field). Use useReducer for complex forms. Handle async validation (email uniqueness) with debounce. Dynamic fields: store as array in state, add/remove with index."
    },
    {
      "question": "Implement a simple virtualized list (render only visible items).",
      "answer": "Track scroll position. Calculate which items are in the visible viewport. Render only those items + a small buffer above and below. Maintain the total height of the list via a spacer div. On scroll, recalculate visible range. Basic formula: startIdx = Math.floor(scrollTop / rowHeight); endIdx = Math.min(startIdx + visibleCount + buffer, items.length). In production: use react-window or react-virtuoso."
    },
    {
      "question": "Handle a race condition in useEffect data fetching.",
      "answer": "Use an abort controller or a local flag: useEffect(() => { let cancelled = false; fetchData().then(data => { if (!cancelled) setData(data); }).catch(err => { if (!cancelled) setError(err); }); return () => { cancelled = true; }; }, [id]);. Cleaner: AbortController — signal.abort() cancels the fetch. Cancel the effect when component unmounts or dependencies change before the async operation completes."
    },
    {
      "question": "Build a reusable ErrorBoundary component.",
      "answer": "class ErrorBoundary extends React.Component { state = { hasError: false, error: null }; static getDerivedStateFromError(error) { return { hasError: true, error }; } componentDidCatch(error, info) { logErrorToService(error, info); } render() { if (this.state.hasError) return this.props.fallback || <h1>Something went wrong</h1>; return this.props.children; } }. Usage: <ErrorBoundary fallback={<ErrorScreen />}><MyComponent /></ErrorBoundary>."
    },
    {
      "question": "How would you optimize a slow component that renders a large list?",
      "answer": "(1) Virtualization: only render visible rows (react-window). (2) React.memo: prevent re-render when props haven't changed. (3) useMemo: memoize row computations. (4) Stable callbacks: avoid recreating event handlers on each render. (5) Key: stable, unique keys per item (index only as last resort). (6) Windowing: use FixedSizeList for uniform heights, VariableSizeList for dynamic."
    },
    {
      "question": "Implement an accordion using compound components.",
      "answer": "Accordion context provides { openIndex, setOpenIndex, allowMultiple }. AccordionItem reads context, renders header (clickable, calls setOpenIndex) and content (visible only when openIndex matches). For allowMultiple: keep a Set of open indices. Basic: single open (toggle). Advanced: multiple open + close all option. Animation: CSS max-height transition or framer-motion AnimatePresence."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 650 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:650px;\"><defs><marker id=\"rcArr\" markerWidth=\"8\" markerHeight=\"6\" refX=\"8\" refY=\"3\" orient=\"auto\"><polygon points=\"0 0,8 3,0 6\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"630\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"325\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Component Architecture Patterns</text><rect x=\"40\" y=\"55\" width=\"260\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"170\" y=\"80\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. Custom Hooks: useLocalStorage()</text><rect x=\"350\" y=\"55\" width=\"260\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"480\" y=\"80\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. Compound: &lt;Tabs&gt;&lt;Tab&gt;</text><rect x=\"40\" y=\"110\" width=\"260\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"170\" y=\"135\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. Render Props: DataProvider</text><rect x=\"350\" y=\"110\" width=\"260\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"480\" y=\"135\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. HOC: withAuth(), withLogger()</text><rect x=\"40\" y=\"165\" width=\"260\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"170\" y=\"190\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">5. Context + useReducer = Mini-Redux</text><rect x=\"350\" y=\"165\" width=\"260\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"480\" y=\"190\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">6. Error Boundary: catch + fallback</text><rect x=\"40\" y=\"230\" width=\"570\" height=\"35\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"325\" y=\"252\" fill=\"#f87171\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Key: Test behavior, not implementation | Handle loading/error/empty/success states | Memoize wisely</text></svg>",
  "codeExamples": [
    {
      "title": "Mini-Redux with useReducer + Context",
      "useCase": "State management without external libraries",
      "code": "const StoreContext = createContext();\nconst DispatchContext = createContext();\n\nfunction StoreProvider({ reducer, initialState, children }) {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  return (\n    <DispatchContext.Provider value={dispatch}>\n      <StoreContext.Provider value={state}>\n        {children}\n      </StoreContext.Provider>\n    </DispatchContext.Provider>\n  );\n}\n\nfunction useDispatch() {\n  return useContext(DispatchContext);\n}\n\nfunction useSelector(selector) {\n  const state = useContext(StoreContext);\n  return selector(state);\n}\n\n// Usage:\nconst cartReducer = (state, action) => {\n  switch (action.type) {\n    case \"ADD_ITEM\":\n      return { ...state,\n        items: [...state.items, action.payload] };\n    case \"REMOVE_ITEM\":\n      return { ...state,\n        items: state.items.filter(i => i.id !== action.id) };\n    default: return state;\n  }\n};\n\nfunction Cart() {\n  const items = useSelector(s => s.items);\n  const dispatch = useDispatch();\n  return items.map(item =>\n    <div key={item.id}>\n      {item.name}\n      <button onClick={() =>\n        dispatch({ type: \"REMOVE_ITEM\", id: item.id })}>×</button>\n    </div>\n  );\n}",
      "description": "Split contexts (state vs dispatch) prevent unnecessary re-renders. Components only re-render when their selected state changes."
    },
    {
      "title": "Compound Tabs Component",
      "useCase": "Flexible tab UI without external library",
      "code": "const TabsContext = createContext();\n\nfunction Tabs({ defaultTab, children }) {\n  const [activeTab, setActiveTab] = useState(defaultTab);\n  return (\n    <TabsContext.Provider value={{ activeTab, setActiveTab }}>\n      {children}\n    </TabsContext.Provider>\n  );\n}\n\nfunction Tab({ id, children }) {\n  const { activeTab, setActiveTab } = useContext(TabsContext);\n  return (\n    <button\n      className={activeTab === id ? \"active\" : \"\"}\n      onClick={() => setActiveTab(id)}\n    >\n      {children}\n    </button>\n  );\n}\n\nfunction TabPanel({ id, children }) {\n  const { activeTab } = useContext(TabsContext);\n  if (activeTab !== id) return null;\n  return <div className=\"tab-panel\">{children}</div>;\n}\n\n// Usage:\n<Tabs defaultTab=\"profile\">\n  <Tab id=\"profile\">Profile</Tab>\n  <Tab id=\"settings\">Settings</Tab>\n  <TabPanel id=\"profile\"><UserProfile /></TabPanel>\n  <TabPanel id=\"settings\"><SettingsForm /></TabPanel>\n</Tabs>",
      "description": "Compound components share implicit state via Context. Parent provides state + setters, children consume them. Flexible, declarative API."
    },
    {
      "title": "Intersection Observer Custom Hook",
      "useCase": "Lazy loading and infinite scroll",
      "code": "function useIntersectionObserver(\n  ref, { threshold = 0, rootMargin = \"0px\", enabled = true } = {}\n) {\n  const [isIntersecting, setIsIntersecting] = useState(false);\n\n  useEffect(() => {\n    if (!enabled || !ref.current) return;\n\n    const observer = new IntersectionObserver(\n      ([entry]) => setIsIntersecting(entry.isIntersecting),\n      { threshold, rootMargin }\n    );\n\n    observer.observe(ref.current);\n    return () => observer.disconnect();\n  }, [ref, threshold, rootMargin, enabled]);\n\n  return isIntersecting;\n}\n\n// Usage: infinite scroll\nfunction Feed() {\n  const sentinelRef = useRef();\n  const isVisible = useIntersectionObserver(\n    sentinelRef, { rootMargin: \"100px\" }\n  );\n\n  useEffect(() => {\n    if (isVisible && !loading) loadMore();\n  }, [isVisible]);\n\n  return (\n    <div>\n      {posts.map(p => <Post key={p.id} post={p} />)}\n      <div ref={sentinelRef} />\n    </div>\n  );\n}",
      "description": "Custom hook encapsulates IntersectionObserver logic. The sentinel div triggers when scrolled into view, enabling infinite scroll."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does useLocalStorage hook need to handle?",
      "options": [
        "Only string values",
        "JSON serialization/deserialization, SSR, parse errors, quota exceeded",
        "Only in component state",
        "Requires Redux"
      ],
      "answer": 1,
      "explanation": "useLocalStorage must handle: JSON parse errors, SSR (no localStorage), quota exceeded exceptions, and sync across tabs."
    },
    {
      "question": "Which pattern uses Context to share implicit state between parent and children?",
      "options": [
        "Render Props",
        "Higher-Order Component",
        "Compound Components",
        "Custom Hooks"
      ],
      "answer": 2,
      "explanation": "Compound components share state via Context. Parent manages state, children consume it."
    },
    {
      "question": "What is the main advantage of splitting state and dispatch into separate contexts?",
      "options": [
        "Smaller bundle size",
        "Prevents unnecessary re-renders (components using dispatch don't re-render on state change)",
        "Faster initial render",
        "Better TypeScript support"
      ],
      "answer": 1,
      "explanation": "Components that only dispatch actions don't need to re-render when state changes. Separate contexts prevent this."
    },
    {
      "question": "Which React feature prevents re-render when props haven't changed?",
      "options": [
        "useMemo",
        "useCallback",
        "React.memo",
        "useRef"
      ],
      "answer": 2,
      "explanation": "React.memo wraps a component to skip re-rendering if props are equal (shallow comparison)."
    },
    {
      "question": "What does the cleanup function in useEffect prevent?",
      "options": [
        "Memory leaks (unsubscribed listeners, stale closures)",
        "Slow renders",
        "Bundle size increase",
        "TypeScript errors"
      ],
      "answer": 0,
      "explanation": "Cleanup prevents memory leaks by unsubscribing, canceling timers, aborting fetches, and disconnecting observers."
    },
    {
      "question": "What is the purpose of an Error Boundary?",
      "options": [
        "Handle async errors",
        "Catch rendering errors in child components and show fallback UI",
        "Validate props",
        "Optimize performance"
      ],
      "answer": 1,
      "explanation": "Error boundaries catch errors during rendering, lifecycle methods, and constructors in the child tree below them."
    }
  ]
};

TOPICS_DATA["practice"]["practice-behavioral"] = {
  "id": "practice-behavioral",
  "title": "Behavioral & Real-World Scenarios",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,
  "tldr": [
    "Use the STAR method: Situation, Task, Action, Result — structure every behavioral answer.",
    "Common themes: conflict resolution, failure/recovery, leadership, technical disagreement, tight deadlines, mentoring.",
    "Amazon Leadership Principles, Google Googleyness, and Netflix Culture are common frameworks — tailor examples to them.",
    "Real-world scenarios test debugging, performance optimization, production incident response, and technical decision-making.",
    "Every answer should demonstrate ownership, impact, and learning. Quantify results when possible (e.g., \"reduced latency by 40%\")."
  ],
  "laymanDefinition": "Behavioral interview questions are like being asked to tell stories from your work life. The interviewer wants to see how you handle real situations: disagreements with coworkers, project failures, tight deadlines, or ambiguous requirements. They're not testing your technical skills — they're testing if you're someone they want to work with. The STAR method (Situation, Task, Action, Result) is like a story structure: set the scene, describe your role, explain what you did, and share the outcome. Real-world scenarios test your engineering judgment: how would you debug a production issue? How would you convince your team to adopt a new technology?",
  "deepDive": [
    {
      "heading": "STAR Method: Situation + Task",
      "text": "Set the context briefly (1-2 sentences). Situation: \"Our team was migrating a monolith to microservices with a 3-month deadline.\" Task: \"I was responsible for designing the API gateway layer that would route traffic between 12 new services.\" Keep the situation relevant to the role. Don't overshare — stick to what's needed for understanding. The situation should create tension (a problem to solve) that makes your actions meaningful."
    },
    {
      "heading": "STAR Method: Action",
      "text": "This is the most detailed section (60% of your answer). Describe YOUR specific actions — use \"I\" not \"we\". Examples: \"I proposed an incremental migration strategy starting with read-only services. I created a compatibility layer that allowed old and new systems to work in parallel. I wrote integration tests covering 200+ endpoints. I presented the plan to stakeholders and addressed their concerns about downtime.\" Show initiative, collaboration, technical judgment, and leadership."
    },
    {
      "heading": "STAR Method: Result",
      "text": "Quantify the impact. \"The migration completed 2 weeks early with zero downtime. API response times improved by 35% due to the new caching layer. The team adopted this incremental approach for future migrations.\" If the result wasn't positive, share what you learned: \"The approach didn't scale as expected because we underestimated data volume. I led a post-mortem and we redesigned the system to use event-driven architecture, reducing load by 60%.\""
    },
    {
      "heading": "Real-World Debugging Scenarios",
      "text": "Systematic approach: (1) Reproduce the issue — get a reliable reproduction case. (2) Isolate — narrow down to the failing component (binary search through the stack). (3) Read logs and metrics — check error rates, latency spikes, memory/CPU. (4) Check recent changes — git bisect, deploy history. (5) Add logging — targeted debug logs around the failure point. (6) Fix and verify — write a regression test first. Example: \"Production is serving 502 errors for 10% of requests\" — check load balancer logs, upstream health, recent deployments, database connection pool."
    },
    {
      "heading": "Performance Optimization Scenarios",
      "text": "Approach: (1) Measure — establish baseline metrics (p50/p99 latency, throughput, error rate). (2) Profile — find the bottleneck (CPU? I/O? memory? network?). Use profiling tools (Chrome DevTools, Node.js --prof, React DevTools). (3) Hypothesize — what's causing the bottleneck? (N+1 queries? Unoptimized images? Re-render cascade?). (4) Implement — one change at a time, measure impact. (5) Verify — A/B test or gradual rollout. Common wins: DB index optimization, caching layer, code splitting, lazy loading, debouncing/throttling."
    },
    {
      "heading": "Technical Decision-Making",
      "text": "Framework for decisions: (1) Define the problem — what are we actually solving? (2) List options — at least 3, including \"do nothing\". (3) Evaluation criteria — performance, developer experience, maintenance cost, learning curve, ecosystem, team expertise. (4) Prototype — build a small proof-of-concept for top 2 options. (5) Decide and document — write an RFC with the decision and rationale. (6) Revisit — set a reminder to review the decision in 3-6 months. Example: \"Why choose Zustand over Redux for a new project?\" — smaller bundle, simpler API, sufficient for the app's complexity, team familiarity."
    }
  ],
  "interviewAnswer": "Use STAR (Situation, Task, Action, Result) for every behavioral answer. Prepare 5-7 stories covering: technical conflict, failure/recovery, leadership, tight deadline, mentoring, ambiguity, and cross-team collaboration. Quantify results. For real-world scenarios (debugging, performance, decision-making), show a systematic approach: measure, isolate, fix, verify. Demonstrate ownership — \"I owned the incident response and coordinated the fix.\" Show learning — \"I wrote a post-mortem and we implemented monitoring to prevent recurrence.\" Be honest about failures but focus on what you learned and improved.",
  "interviewQuestions": [
    {
      "question": "Tell me about a time you disagreed with a technical decision made by your team.",
      "answer": "STAR: Situation — team wanted to migrate to a new framework before a major release. Task — I needed to evaluate the risk. Action — I created a comparison matrix, built a POC for the critical path, identified 3 breaking issues that would delay the release. Proposed a phased migration after release instead. Result — we shipped on time, completed the migration the next quarter with no production incidents."
    },
    {
      "question": "Describe a project that failed or didn't meet expectations.",
      "answer": "STAR: Situation — I built a real-time dashboard that kept crashing under load. Task — I needed to stabilize it. Action — I profiled the bottleneck (WebSocket reconnection storm), implemented exponential backoff with jitter, added connection pooling, and wrote load tests. Result — system handled 10x the expected load. I learned to always load-test early and design for failure from day one."
    },
    {
      "question": "How do you handle tight deadlines with multiple priorities?",
      "answer": "I prioritize by impact and urgency. First, I clarify the deadline and the minimum viable scope with stakeholders. Then I break work into must-have, should-have, and nice-to-have. I communicate progress daily and flag risks early. If something has to slip, I propose alternatives. I use time-blocking for focused work and protect deep work hours from meetings. Example: \"For the Q3 release with 3 major features due in 6 weeks, I negotiated a phased delivery — core functionality in week 4, optimizations in week 6, nice-to-haves deferred.\""
    },
    {
      "question": "Tell me about a time you mentored someone.",
      "answer": "STAR: Situation — a junior developer was struggling with our microservices architecture. Task — I needed to help them become productive. Action — I set up weekly 1:1s, paired on complex features, created a \"microservices 101\" internal guide, and gradually increased their responsibility from bug fixes to independent feature development. I gave specific, actionable feedback after each code review. Result — within 3 months they were shipping features independently and later mentored a new hire."
    },
    {
      "question": "Walk me through how you would debug a production issue where users are seeing 503 errors.",
      "answer": "1) Check the monitoring dashboard — error rate spike, which endpoints, which regions. 2) Check recent deployments — git log for the last hour, rollback if a bad deploy is identified. 3) Check infrastructure metrics — CPU, memory, disk, network on affected servers. 4) Check upstream dependencies — database connection pool exhausted? Redis down? Third-party API latency? 5) Check application logs — look for stack traces, slow queries, OOM errors. 6) Reproduce in staging — isolate the root cause. 7) Fix, write regression test, deploy with gradual rollout, monitor."
    },
    {
      "question": "Describe a time you had to make a decision with incomplete information.",
      "answer": "STAR: Situation — a critical third-party API was deprecated with 2 weeks notice. Task — I needed to choose a replacement quickly. Action — I evaluated 3 alternatives in 2 days based on: API compatibility, pricing, SLA, migration effort. Chose the one that required minimal code changes despite not being the cheapest. Built an abstraction layer to isolate the integration. Result — migration completed in 5 days with zero downtime. The abstraction made future provider switches trivial."
    },
    {
      "question": "How would you convince your team to adopt a new technology or practice?",
      "answer": "I never push from opinion alone. I: 1) Identify a concrete problem the new technology solves. 2) Build a small POC (2-3 days maximum). 3) Present the POC with clear pros/cons, migration cost, and expected benefits quantified. 4) Address concerns — learning curve, migration effort, maintenance burden. 5) Propose an incremental adoption — start with one non-critical service, measure results, iterate. 6) Write a decision document (RFC) for team discussion. Example: proposing TypeScript — the POC caught 3 bugs at compile time that would have been runtime issues."
    },
    {
      "question": "Tell me about a time you went above and beyond for a customer or user.",
      "answer": "STAR: Situation — a enterprise customer was experiencing intermittent timeouts and was considering leaving. Task — I needed to resolve their issue and restore confidence. Action — I set up dedicated Slack channel, gave them a direct line to engineering. I analyzed their usage patterns, found their workload caused connection pool exhaustion. I implemented connection pooling with dynamic sizing and added circuit breakers. I created a runbook for their support team. Result — zero timeouts after the fix. The customer renewed their contract and expanded usage by 3x."
    },
    {
      "question": "How do you stay current with technology trends?",
      "answer": "I have a structured learning approach: 1) Daily: follow 5-10 key newsletters and RSS feeds (JavaScript Weekly, React Status, High Scalability). 2) Weekly: read 2-3 technical blog posts or RFCs. 3) Monthly: build a small project or POC with one new technology. 4) Quarterly: attend a conference or watch talks. 5) I contribute to open source (small PRs, issues) which forces deeper understanding. I focus depth over breadth — deep knowledge in my stack, awareness of adjacent technologies."
    },
    {
      "question": "What's your approach to code review?",
      "answer": "I review for: correctness (edge cases, error handling), readability (naming, structure, comments), performance (bottlenecks, N+1 queries, unnecessary re-renders), security (injection, auth, data exposure), and test coverage. I use a mentorship mindset — I explain WHY something should change, not just WHAT. I approve quickly when the code is good. I'm specific in feedback: \"This useEffect will re-run on every render because `items` is recreated. Consider using useMemo or move it outside.\" I never merge my own PRs."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 600 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:600px;\"><defs><marker id=\"bhArr\" markerWidth=\"8\" markerHeight=\"6\" refX=\"8\" refY=\"3\" orient=\"auto\"><polygon points=\"0 0,8 3,0 6\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"580\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"300\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">STAR Method Framework</text><rect x=\"40\" y=\"55\" width=\"240\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"160\" y=\"80\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">S — Situation (Context)</text><line x1=\"280\" y1=\"75\" x2=\"320\" y2=\"75\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#bhArr)\"/><rect x=\"320\" y=\"55\" width=\"240\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"440\" y=\"80\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">T — Task (Your Role)</text><line x1=\"440\" y1=\"95\" x2=\"440\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#bhArr)\"/><rect x=\"320\" y=\"125\" width=\"240\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"440\" y=\"150\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">A — Action (What YOU Did)</text><line x1=\"320\" y1=\"165\" x2=\"280\" y2=\"165\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#bhArr)\"/><rect x=\"40\" y=\"125\" width=\"240\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"160\" y=\"150\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">R — Result (Quantified Impact)</text><rect x=\"40\" y=\"195\" width=\"520\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"300\" y=\"218\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Key: Use \"I\" not \"we\" | Be specific | Quantify impact (%, time, money)</text><text x=\"300\" y=\"238\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Prepare 5-7 stories covering: conflict, failure, leadership, deadlines, mentoring, ambiguity, cross-team</text></svg>",
  "codeExamples": [
    {
      "title": "Production Incident Response Runbook",
      "useCase": "Systematic debugging template",
      "code": "## Production Incident Response\n\n### 1. Detect\n- Check monitoring dashboard (error rate, latency, throughput)\n- Alert: who is affected? How many users?\n- Severity: SEV1 (users blocked) / SEV2 (degraded) / SEV3 (minor)\n\n### 2. Respond\n- Acknowledge in incident channel\n- Declare severity and assign roles (lead, comms, engineering)\n- Consider immediate mitigation: rollback, feature flag off, scale up\n\n### 3. Investigate\n- Check deploy log: what changed in the last hour?\n- git bisect if needed to find the breaking commit\n- Check infrastructure: CPU, memory, disk, network\n- Check dependencies: DB connection pool, Redis, external APIs\n- Check application logs: stack traces, error rates per endpoint\n- Check recent scaling events (deploy, traffic spike, cron job)\n\n### 4. Mitigate\n- Apply the targeted fix (not a hack — fix the root cause)\n- Deploy with gradual rollout (10% → 50% → 100%)\n- Monitor the rollout for side effects\n\n### 5. Learn\n- Write post-mortem within 48 hours\n- Root cause, impact timeline, what went well, what went wrong\n- Action items: monitoring, testing, process improvements\n- Share with the team in the next tech review",
      "description": "Standardized incident response ensures quick, systematic debugging and learning. Post-mortem culture prevents repeat incidents."
    },
    {
      "title": "RFC Template: Technical Decision Document",
      "useCase": "Structured decision-making framework",
      "code": "# RFC: [Title]\n\n## Status: [Draft | Proposed | Accepted | Rejected]\n\n## Problem Statement\nWhat specific problem are we solving? What happens if we do nothing?\n\n## Goals & Non-Goals\n- Goals: measurable outcomes we want to achieve\n- Non-goals: explicitly out of scope\n\n## Options Considered\n| Option | Pros | Cons | Effort |\n|--------|------|------|-------|\n| A: [option] | ... | ... | X days |\n| B: [option] | ... | ... | X days |\n| C: Do nothing | ... | ... | 0 |\n\n## Recommended Option\n[Option] because [clear rationale tied to goals]\n\n## Implementation Plan\n1. Phase 1: [2 days] — POC in staging\n2. Phase 2: [1 week] — Production rollout to 10%\n3. Phase 3: [2 weeks] — Full rollout + monitoring\n\n## Risks & Mitigations\n- Risk 1: [mitigation]\n- Risk 2: [mitigation]\n\n## Open Questions\n- [Question 1: @owner]",
      "description": "An RFC (Request for Comments) documents technical decisions with rationale, alternatives, and risks. It enables asynchronous, inclusive decision-making."
    },
    {
      "title": "Performance Audit Checklist",
      "useCase": "Systematic performance optimization",
      "code": "## Frontend Performance Audit\n\n### Network\n- [ ] Bundle size analysis (webpack-bundle-analyzer)\n- [ ] Code splitting (React.lazy, dynamic imports)\n- [ ] Tree shaking — remove dead code\n- [ ] Image optimization (WebP, srcset, lazy loading)\n- [ ] HTTP/2 multiplexing, gzip/brotli compression\n- [ ] CDN for static assets\n- [ ] Preload critical resources, prefetch likely-next\n\n### Rendering\n- [ ] React.memo on pure components\n- [ ] useMemo for expensive computations\n- [ ] useCallback for stable function references\n- [ ] Virtualization for long lists (react-window)\n- [ ] Avoid unnecessary re-renders (React DevTools Profiler)\n- [ ] Suspense for streaming data loading\n\n### Runtime\n- [ ] Debounce/throttle scroll, resize, input handlers\n- [ ] Web Workers for CPU-intensive tasks\n- [ ] requestAnimationFrame for visual updates\n- [ ] Avoid layout thrashing (batch DOM reads/writes)\n\n### Backend\n- [ ] Database query optimization (EXPLAIN ANALYZE)\n- [ ] N+1 query detection and batching\n- [ ] Caching strategy (Redis, CDN, HTTP caching)\n- [ ] Connection pooling for DB and external APIs\n- [ ] Pagination for list endpoints (cursor-based)",
      "description": "A systematic performance audit checklist ensures no common optimization is missed. Always measure before and after each change."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does STAR stand for?",
      "options": [
        "Situation, Task, Action, Result",
        "Start, Think, Act, Review",
        "Scope, Time, Action, Resolution",
        "State, Target, Apply, Return"
      ],
      "answer": 0,
      "explanation": "STAR: Situation (context), Task (your role), Action (what you did), Result (quantified impact)."
    },
    {
      "question": "What should be the main focus of the Action section in STAR?",
      "options": [
        "What the team did collectively",
        "Your specific actions (use \"I\")",
        "The technical details of the project",
        "The deadline pressure"
      ],
      "answer": 1,
      "explanation": "The Action section should focus on YOUR specific contributions. Use \"I\" not \"we\" to show your individual impact."
    },
    {
      "question": "What is the first step in debugging a production issue?",
      "options": [
        "Roll back immediately",
        "Reproduce and isolate the issue",
        "Call a team meeting",
        "Restart all servers"
      ],
      "answer": 1,
      "explanation": "First reproduce the issue reliably, then isolate the failing component through systematic investigation."
    },
    {
      "question": "What is the best approach to optimizing frontend performance?",
      "options": [
        "Rewrite everything in a faster framework",
        "Measure first (baseline), then profile bottlenecks, then optimize one change at a time",
        "Add more servers",
        "Use latest JavaScript features"
      ],
      "answer": 1,
      "explanation": "Always measure first. Without a baseline, you can't know if your optimization actually improved anything."
    },
    {
      "question": "What is a post-mortem in incident response?",
      "options": [
        "A post-incident party",
        "A written analysis of what happened, why, and what to improve",
        "A rollback script",
        "A customer apology email"
      ],
      "answer": 1,
      "explanation": "A post-mortem is a blameless analysis of the incident, its root cause, timeline, and actionable improvements."
    },
    {
      "question": "How should you convince your team to adopt a new technology?",
      "options": [
        "Argue loudly in meetings",
        "Build a POC showing concrete benefits for a real problem the team faces",
        "Ask for permission from management",
        "Sneak it into the codebase"
      ],
      "answer": 1,
      "explanation": "The most effective approach is building a small proof-of-concept that demonstrates clear, measurable value for a problem the team already faces."
    }
  ]
};
