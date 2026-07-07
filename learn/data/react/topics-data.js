var TOPICS_DATA = TOPICS_DATA || {};
TOPICS_DATA["react"] = TOPICS_DATA["react"] || {};

TOPICS_DATA["react"]["react-architecture"] = {
  "id": "react-architecture",
  "title": "React SPA Architecture",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "React SPAs load a single HTML page and dynamically update content via JavaScript, avoiding full page reloads.",
    "The architecture uses a component tree, virtual DOM, and a unidirectional data flow (parent to child via props).",
    "Client-side routing (e.g., React Router) manages URL changes and renders the correct component tree without server round-trips.",
    "State management solutions (Context API, Redux) handle cross-component data sharing across the SPA."
  ],
  "laymanDefinition": "Think of a React SPA like a multi-room museum inside a single building. When you enter, you get a map (the initial HTML). Instead of leaving the building to see each new exhibit, you just walk to a different room.",
  "deepDive": [
    {
      "heading": "Single HTML Shell",
      "text": "The server sends a minimal HTML file with a single root <code>&lt;div id=\"root\"&gt;&lt;/div&gt;</code>. React renders the entire UI into this div."
    },
    {
      "heading": "Component Tree Architecture",
      "text": "React applications are structured as a tree of components. Data flows down via props, and actions flow up via callbacks."
    },
    {
      "heading": "Client-Side Routing",
      "text": "React Router enables navigation without page reloads using the History API."
    },
    {
      "heading": "State Management Layer",
      "text": "For complex SPAs with global state, libraries like Redux or Zustand provide a centralized store."
    },
    {
      "heading": "Build & Deployment Considerations",
      "text": "Critical: configure the server to serve index.html for all routes (fallback) so deep links work on refresh."
    }
  ],
  "interviewAnswer": "React SPA architecture centers on a single HTML host page where React renders a component tree into a root DOM node. Client-side routing (React Router) intercepts URL changes and swaps components without full page reloads.",
  "interviewQuestions": [
    {
      "question": "What is a Single Page Application (SPA)?",
      "answer": "An SPA loads a single HTML page and dynamically updates content via JavaScript. React implements this by rendering a component tree into a root DOM element."
    },
    {
      "question": "How does client-side routing work?",
      "answer": "React Router uses the History API (pushState, replaceState) and a popstate event listener to update the URL and render matching components."
    },
    {
      "question": "Advantages and disadvantages of SPA?",
      "answer": "Advantages: faster navigation, smoother UX, reduced server load. Disadvantages: larger initial bundle, SEO challenges, JavaScript dependency."
    },
    {
      "question": "Explain unidirectional data flow.",
      "answer": "Data flows from parent to child through props. Children use callback functions to communicate upward."
    },
    {
      "question": "How do you handle deep linking?",
      "answer": "The server must serve index.html for all routes (catch-all fallback). React Router renders the correct component on initial load."
    },
    {
      "question": "What is code splitting?",
      "answer": "Dividing the bundle into smaller chunks loaded on demand. React.lazy() and Suspense enable component-level splitting."
    },
    {
      "question": "Compare SSR vs CSR.",
      "answer": "CSR renders in browser after JS loads. SSR renders HTML on server, sending a fully populated page for better SEO."
    },
    {
      "question": "How to manage auth state across a SPA?",
      "answer": "Store tokens in localStorage or cookies, sync with global state on app init. Use protected route wrappers."
    },
    {
      "question": "Role of a bundler in a React SPA?",
      "answer": "Bundles source code (JSX, ES modules, CSS) into optimized static files handling transpilation, code splitting, and tree shaking."
    },
    {
      "question": "Explain the 'root' div concept.",
      "answer": "The HTML shell has &lt;div id=\"root\"&gt;. ReactDOM.createRoot().render() attaches the component tree to this element."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrB\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\">React SPA Architecture</text><rect x=\"180\" y=\"55\" width=\"340\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"78\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\">&lt;div id=\"root\"&gt; - HTML Shell</text><text x=\"350\" y=\"95\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Single HTML page served by server</text><line x1=\"350\" y1=\"105\" x2=\"350\" y2=\"130\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrB)\"/><rect x=\"180\" y=\"130\" width=\"340\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"155\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">ReactDOM.createRoot().render(&lt;App/&gt;)</text><line x1=\"350\" y1=\"170\" x2=\"350\" y2=\"195\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrB)\"/><rect x=\"60\" y=\"195\" width=\"580\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"218\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\">Component Tree: App &gt; Header / Sidebar / Main / Footer</text><line x1=\"350\" y1=\"255\" x2=\"350\" y2=\"280\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrB)\"/><rect x=\"60\" y=\"280\" width=\"580\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"303\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\">React Router: /home, /users, /products, /settings</text><line x1=\"350\" y1=\"330\" x2=\"350\" y2=\"355\" stroke=\"#e5c07b\" stroke-width=\"2\" marker-end=\"url(#arrB)\"/><rect x=\"100\" y=\"355\" width=\"500\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"378\" text-anchor=\"middle\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\">State Layer: Context API / Redux / Zustand</text><line x1=\"350\" y1=\"405\" x2=\"350\" y2=\"430\" stroke=\"#98c379\" stroke-width=\"2\" marker-end=\"url(#arrB)\"/><rect x=\"180\" y=\"430\" width=\"340\" height=\"30\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#98c379\" stroke-width=\"1\"/><text x=\"350\" y=\"450\" text-anchor=\"middle\" fill=\"#98c379\" font-size=\"11\" font-weight=\"bold\">API Calls: fetch / axios</text></svg>",
  "codeExamples": [
    {
      "title": "Basic SPA Structure with Router",
      "useCase": "Application Shell",
      "code": "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav><Link to=\"/\">Home</Link><Link to=\"/users\">Users</Link></nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/users\" element={<Users />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
      "description": "BrowserRouter wraps the app. Routes define which component renders for each path."
    },
    {
      "title": "API Fetching with Loading State",
      "useCase": "Data Integration",
      "code": "function Users() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch('/api/users').then(res => res.json()).then(data => {\n      setUsers(data);\n      setLoading(false);\n    });\n  }, []);\n  if (loading) return <div>Loading...</div>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
      "description": "Fetch data on mount, show loading state, then render."
    },
    {
      "title": "Protected Route",
      "useCase": "Auth Guard",
      "code": "function PrivateRoute({ children }) {\n  const { user } = useContext(AuthContext);\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return children;\n}",
      "description": "Checks auth state and redirects if not logged in."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a Single Page Application?",
      "options": [
        "Multiple HTML pages pre-rendered",
        "Single HTML page updates dynamically via JS",
        "No routing used",
        "All server-side rendering"
      ],
      "answer": 1,
      "explanation": "An SPA loads one HTML page and dynamically rewrites content."
    },
    {
      "question": "How does client-side routing work?",
      "options": [
        "Server redirects",
        "History API + matching components",
        "Hidden iframe",
        "Hash fragments only"
      ],
      "answer": 1,
      "explanation": "React Router uses the History API."
    },
    {
      "question": "What server config is needed for deep linking?",
      "options": [
        "None",
        "Serve index.html for all routes",
        "Redirect to 404",
        "Each route needs its own HTML"
      ],
      "answer": 1,
      "explanation": "Without fallback, server returns 404 for non-root paths."
    },
    {
      "question": "What is a disadvantage of SPAs?",
      "options": [
        "Reduced server load",
        "Larger initial bundle",
        "Faster navigation",
        "Desktop-like UX"
      ],
      "answer": 1,
      "explanation": "All app code must download before first render."
    },
    {
      "question": "What is code splitting?",
      "options": [
        "Split code into repos",
        "Load chunks on demand",
        "Split components into apps",
        "Remove libraries"
      ],
      "answer": 1,
      "explanation": "Reduces initial bundle size."
    },
    {
      "question": "Where to store auth tokens for persistence?",
      "options": [
        "Local component state",
        "localStorage/cookies synced with global state",
        "Redux only",
        "Text file on server"
      ],
      "answer": 1,
      "explanation": "State is lost on refresh; persist in localStorage."
    }
  ]
};

TOPICS_DATA["react"]["react-virtual-dom"] = {
  "id": "react-virtual-dom",
  "title": "React Virtual DOM",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "The Virtual DOM (VDOM) is a lightweight JavaScript object representation of the real DOM, used to optimize rendering.",
    "When state changes, React creates a new VDOM tree and diffs it against the previous one (diffing algorithm).",
    "Only the minimal set of real DOM mutations (patches) are applied, avoiding expensive full re-renders.",
    "The VDOM makes React declarative - developers describe what the UI should look like, not how to update it."
  ],
  "laymanDefinition": "Imagine you have a huge whiteboard drawing (the real DOM). Instead of erasing and redrawing the entire board, you first sketch changes on tracing paper (VDOM), compare, and only erase/redraw the parts that changed.",
  "deepDive": [
    {
      "heading": "What is the Virtual DOM?",
      "text": "The Virtual DOM is a JavaScript object mirroring the real DOM structure. Each React element is a plain object with type, props, and children. React keeps two VDOM trees: current and new."
    },
    {
      "heading": "The Diffing Algorithm",
      "text": "React compares new VDOM with previous using heuristics: different element types produce different trees; keys match children across renders. Algorithm runs in O(n) time."
    },
    {
      "heading": "Batching and Fiber",
      "text": "React batches state updates. The render phase builds new VDOM and computes diffs. The commit phase applies mutations. Fiber enables incremental rendering."
    },
    {
      "heading": "Why Not Just Use the Real DOM?",
      "text": "Real DOM operations are slow (layout recalculations, repaints). VDOM objects are cheap to create and compare, avoiding unnecessary layout thrashing."
    }
  ],
  "interviewAnswer": "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to optimize rendering: when state or props change, a new VDOM tree is created and compared (diffed) against the previous one using a heuristic O(n) algorithm. The diff produces minimal mutations applied in a single commit phase batch.",
  "interviewQuestions": [
    {
      "question": "What is the Virtual DOM and why does React use it?",
      "answer": "It is a JS object tree representing the real DOM. React uses it to minimize expensive real DOM manipulations by diffing and batching updates."
    },
    {
      "question": "How does React's diffing algorithm work?",
      "answer": "Compares VDOM trees element by element. Different types rebuild subtrees. Keys match list children. Runs in O(n) time using heuristics."
    },
    {
      "question": "Difference between Virtual DOM and Shadow DOM?",
      "answer": "VDOM is a JS representation for diffing. Shadow DOM is a browser spec for encapsulating DOM/CSS in web components."
    },
    {
      "question": "How does React batch updates?",
      "answer": "Collects all setState calls, computes new VDOM, diffs it, and applies all mutations in a single commit phase."
    },
    {
      "question": "What happens when you call setState()?",
      "answer": "Marks component dirty, schedules re-render, produces new VDOM, diffs it, and applies updates to real DOM."
    },
    {
      "question": "Is VDOM always faster than direct DOM?",
      "answer": "No - for simple isolated updates, direct DOM can be faster. VDOM excels in complex state-driven UIs."
    },
    {
      "question": "How does the key prop optimize diffing?",
      "answer": "Keys help identify changed/added/removed list items, enabling efficient matching and minimal DOM operations."
    },
    {
      "question": "Render phase vs commit phase?",
      "answer": "Render: builds VDOM and computes diffs (can be paused). Commit: applies mutations to DOM (synchronous)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 400\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrV\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrG\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#34d399\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"380\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\">Virtual DOM Workflow</text><rect x=\"60\" y=\"55\" width=\"580\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"75\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\">State Change (setState / dispatch)</text><line x1=\"350\" y1=\"110\" x2=\"350\" y2=\"140\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrV)\"/><rect x=\"60\" y=\"140\" width=\"580\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"160\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\">Render Phase: Build new VDOM tree</text><line x1=\"350\" y1=\"185\" x2=\"350\" y2=\"215\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrV)\"/><rect x=\"60\" y=\"215\" width=\"580\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"235\" text-anchor=\"middle\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\">Diffing: Compare new VDOM vs previous VDOM</text><line x1=\"350\" y1=\"260\" x2=\"350\" y2=\"290\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrG)\"/><rect x=\"60\" y=\"290\" width=\"580\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"310\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">Commit Phase: Apply minimal patches to Real DOM</text><line x1=\"350\" y1=\"335\" x2=\"350\" y2=\"360\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrG)\"/><rect x=\"200\" y=\"360\" width=\"300\" height=\"28\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#f87171\" stroke-width=\"1\"/><text x=\"350\" y=\"379\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\">Browser repaint & reflow</text></svg>",
  "codeExamples": [
    {
      "title": "Key Prop for List Optimization",
      "useCase": "Efficient list rendering",
      "code": "function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}>\n          <TodoItem todo={todo} />\n        </li>\n      ))}\n    </ul>\n  );\n}",
      "description": "Stable keys let React match elements across renders. Only changed DOM nodes are updated."
    },
    {
      "title": "VDOM with createElement",
      "useCase": "Under the hood",
      "code": "// JSX compiles to React.createElement calls\nconst element = <div className=\"container\"><h1>Hello</h1></div>;\n// Equivalent VDOM:\nconst vdom = {\n  type: 'div',\n  props: { className: 'container', children: [\n    { type: 'h1', props: { children: 'Hello' } }\n  ]}\n};",
      "description": "JSX produces plain JavaScript objects (the VDOM). React diffs these objects, not the real DOM."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Primary purpose of Virtual DOM?",
      "options": [
        "Replace real DOM entirely",
        "Minimize expensive real DOM manipulations via diffing",
        "Compile JSX to HTML",
        "Manage CSS"
      ],
      "answer": 1,
      "explanation": "VDOM computes minimal DOM updates."
    },
    {
      "question": "Time complexity of React's diffing?",
      "options": [
        "O(n³)",
        "O(n log n)",
        "O(n) using heuristics",
        "O(1)"
      ],
      "answer": 2,
      "explanation": "Runs in O(n) time using heuristics."
    },
    {
      "question": "What happens during commit phase?",
      "options": [
        "Builds new VDOM",
        "Diffs old and new VDOM",
        "Applies minimal mutations to real DOM",
        "Runs useEffect"
      ],
      "answer": 2,
      "explanation": "Commit phase applies patches synchronously."
    },
    {
      "question": "Why avoid array index as key?",
      "options": [
        "Syntax error",
        "Incorrect element matching and re-renders",
        "Unresponsive list",
        "Slows JS engine"
      ],
      "answer": 1,
      "explanation": "Index keys cause misidentification of items."
    },
    {
      "question": "Is VDOM always faster than direct DOM?",
      "options": [
        "Yes always",
        "No - simple isolated updates can be faster direct",
        "Not related to performance",
        "Only in React 18+"
      ],
      "answer": 1,
      "explanation": "Direct DOM is faster for simple updates."
    },
    {
      "question": "Fiber render phase capability?",
      "options": [
        "Can be paused, resumed, prioritized",
        "Runs synchronously",
        "Skips diffing",
        "Modifies real DOM directly"
      ],
      "answer": 0,
      "explanation": "Fiber enables incremental rendering."
    }
  ]
};

TOPICS_DATA["react"]["react-fiber"] = {
  "id": "react-fiber",
  "title": "React Fiber",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "React Fiber is a complete rewrite of React's reconciliation engine, first released in React 16.",
    "It enables incremental rendering - splitting rendering work into chunks spread over multiple frames.",
    "Fiber introduces a tree of 'fiber nodes' representing units of work, with linked lists for traversal.",
    "Features enabled: concurrent mode, Suspense, error boundaries, and prioritized updates."
  ],
  "laymanDefinition": "Imagine assembling a huge Lego castle but you must finish in one go - that was the old Stack reconciler. Now imagine you can pause, answer a phone call (higher priority), then resume exactly where you left off - that's Fiber.",
  "deepDive": [
    {
      "heading": "The Problem with Stack Reconciler",
      "text": "The old Stack reconciler used recursive synchronous traversal. Once started, it blocked the main thread until completion, causing jank in animations and poor UX."
    },
    {
      "heading": "Fiber Node Architecture",
      "text": "A Fiber is a JS object representing a unit of work. Key properties: tag, type, key, child, sibling, return (parent), pendingProps, memoizedProps, memoizedState, effectTag, alternate. Fibers form a linked list tree."
    },
    {
      "heading": "Work Loop and Scheduling",
      "text": "Fiber uses cooperative scheduling. The work loop processes one fiber unit at a time, checking shouldYield() after each unit. If higher-priority work exists, it yields to the browser."
    },
    {
      "heading": "Priority Levels",
      "text": "Immediate (mouse events), UserBlocking (keyboard, scroll), Normal (network, state), Low (prefetching), Idle (analytics). Higher-priority interrupts lower-priority work."
    },
    {
      "heading": "Effects from Fiber",
      "text": "Enables Suspense (pause rendering for data), Concurrent Mode (interruptible rendering), Error Boundaries (catch render errors), and Automatic Batching."
    }
  ],
  "interviewAnswer": "React Fiber replaces the recursive Stack reconciler with an interruptible, priority-driven architecture. Each component is a fiber node with child/sibling/return pointers forming a linked list. The work loop processes fibers one at a time, yielding for high-priority work. This enables incremental rendering, Suspense, error boundaries, and concurrent mode.",
  "interviewQuestions": [
    {
      "question": "What problem does Fiber solve?",
      "answer": "The Stack reconciler was recursive and synchronous, blocking the main thread. Fiber makes rendering interruptible, chunkable, and prioritizable."
    },
    {
      "question": "What is a fiber node?",
      "answer": "A JS object representing a unit of work. Properties: tag, type, key, child, sibling, return, pendingProps, memoizedProps, memoizedState, effectTag, alternate."
    },
    {
      "question": "How does the work loop enable interruption?",
      "answer": "Processes one fiber at a time, then checks shouldYield(). Yields to browser if higher-priority work is pending."
    },
    {
      "question": "What is the 'alternate' property?",
      "answer": "Links a fiber to its counterpart from the previous render. Enables double buffering between current and work-in-progress trees."
    },
    {
      "question": "How do priority levels work?",
      "answer": "Lanes: Immediate (click), UserBlocking (scroll), Normal (fetch), Low (prefetch), Idle (analytics). Highest lane processed first."
    },
    {
      "question": "How does Fiber enable Suspense?",
      "answer": "When a component throws a Promise, Fiber catches it, shows fallback, and retries when the promise resolves."
    },
    {
      "question": "Render phase vs commit phase in Fiber?",
      "answer": "Render: builds effect list (interruptible). Commit: applies effects synchronously (not interruptible)."
    },
    {
      "question": "How does Fiber improve error handling?",
      "answer": "Error boundaries catch fiber-level errors during render phase. Prevents full app crashes."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrF\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrR\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#f87171\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\">React Fiber Architecture</text><rect x=\"40\" y=\"55\" width=\"620\" height=\"170\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"78\" text-anchor=\"middle\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\">Fiber Tree (Linked List)</text><rect x=\"60\" y=\"90\" width=\"130\" height=\"40\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"125\" y=\"110\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"11\" font-weight=\"bold\">Fiber: App</text><line x1=\"190\" y1=\"110\" x2=\"240\" y2=\"110\" stroke=\"#9aa0b0\" stroke-width=\"1\"/><rect x=\"240\" y=\"90\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"310\" y=\"110\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">Fiber: Header</text><line x1=\"380\" y1=\"110\" x2=\"430\" y2=\"110\" stroke=\"#9aa0b0\" stroke-width=\"1\"/><rect x=\"430\" y=\"90\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"500\" y=\"110\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Fiber: Main</text><rect x=\"40\" y=\"240\" width=\"620\" height=\"200\" rx=\"8\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"263\" text-anchor=\"middle\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\">Fiber Work Loop (Cooperative Scheduling)</text><rect x=\"60\" y=\"275\" width=\"180\" height=\"36\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#6c9fff\" stroke-width=\"1\"/><text x=\"150\" y=\"292\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"10\">Process one fiber node</text><rect x=\"260\" y=\"275\" width=\"180\" height=\"36\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#fbbf24\" stroke-width=\"1\"/><text x=\"350\" y=\"292\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"10\">Check shouldYield()</text><rect x=\"460\" y=\"275\" width=\"180\" height=\"36\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"550\" y=\"292\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">Yield to browser</text></svg>",
  "codeExamples": [
    {
      "title": "useTransition for Deferred Updates",
      "useCase": "Priority-based rendering",
      "code": "function SearchPage() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [isPending, startTransition] = useTransition();\n  function handleChange(e) {\n    setQuery(e.target.value);\n    startTransition(() => setResults(filterData(e.target.value)));\n  }\n  return <div>\n    <input value={query} onChange={handleChange} />\n    {isPending ? <Spinner /> : <ResultsList data={results} />}\n  </div>;\n}",
      "description": "setQuery is high-priority (input stays responsive). setResults is deferred via startTransition."
    },
    {
      "title": "Suspense with Fiber",
      "useCase": "Interruptible data loading",
      "code": "function User({ id }) {\n  const [user, setUser] = useState(null);\n  if (user === null) throw fetchUser(id).then(setUser);\n  return <div>{user.name}</div>;\n}\nfunction App() {\n  return (<Suspense fallback={<div>Loading...</div>}>\n    <User id={1} />\n  </Suspense>);\n}",
      "description": "Fiber catches the thrown Promise, shows fallback, retries when resolved."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Main limitation of Stack reconciler?",
      "options": [
        "No JSX support",
        "Recursive and synchronous, blocking main thread",
        "No list handling",
        "Required jQuery"
      ],
      "answer": 1,
      "explanation": "Stack reconciler blocked main thread until completion."
    },
    {
      "question": "How does a fiber link to its parent?",
      "options": [
        "child pointer",
        "sibling pointer",
        "return pointer",
        "alternate pointer"
      ],
      "answer": 2,
      "explanation": "Return pointer links to parent fiber."
    },
    {
      "question": "What does 'alternate' represent?",
      "options": [
        "Parallel universe twin",
        "Previous render's counterpart",
        "Fallback component",
        "Alternative path"
      ],
      "answer": 1,
      "explanation": "Links work-in-progress to current (committed) fiber."
    },
    {
      "question": "API used for cooperative scheduling?",
      "options": [
        "setTimeout/setInterval",
        "requestIdleCallback/requestAnimationFrame",
        "Web Workers",
        "MutationObserver"
      ],
      "answer": 1,
      "explanation": "Uses requestIdleCallback and requestAnimationFrame."
    },
    {
      "question": "What happens when component throws a Promise?",
      "options": [
        "App crashes",
        "React catches it, shows fallback, retries",
        "Promise ignored",
        "Synchronous wait"
      ],
      "answer": 1,
      "explanation": "Fiber suspends and retries on resolve."
    },
    {
      "question": "Which feature is NOT enabled by Fiber?",
      "options": [
        "Suspense",
        "Error Boundaries",
        "JSX transformation",
        "Concurrent Mode"
      ],
      "answer": 2,
      "explanation": "JSX is compile-time (Babel), not Fiber runtime."
    }
  ]
};

TOPICS_DATA["react"]["react-reconciliation"] = {
  "id": "react-reconciliation",
  "title": "React Reconciliation",
  "difficulty": "advanced",
  "estimatedMinutes": 25,
  "tldr": [
    "Reconciliation is the process by which React updates the DOM by comparing the new VDOM tree with the previous one.",
    "React uses a heuristic O(n) algorithm: different element types produce different trees; stable keys identify elements across renders.",
    "When root element types differ, React tears down the old tree and builds a new one from scratch.",
    "Keys on list children allow React to match, reuse, and reorder elements efficiently."
  ],
  "laymanDefinition": "Like comparing new photos with current ones on a bulletin board. If the frame changed (element type), replace entirely. For photos in a row, use name tags (keys) to know which stayed, which are new, which were removed.",
  "deepDive": [
    {
      "heading": "The Two Assumptions",
      "text": "1) Different element types produce different trees. 2) Developers provide stable keys for element identity across renders. These enable O(n) complexity."
    },
    {
      "heading": "Recursing on Children",
      "text": "When diffing same-type elements, React recurses on children positionally. Matching type updates existing DOM node. Different type removes old and inserts new."
    },
    {
      "heading": "List Reconciliation with Keys",
      "text": "Keys allow React to match children across renders. React determines insertions, deletions, reorderings, and updates using key identity."
    },
    {
      "heading": "Component Instance Reuse",
      "text": "Same type and key = reuse component instance. State persists (useState), only props update."
    },
    {
      "heading": "Step by Step Process",
      "text": "1. Render phase: produce new VDOM. 2. Diff: compare element by element. 3. Effect list: insert/update/remove/reorder. 4. Commit: apply to real DOM."
    }
  ],
  "interviewAnswer": "Reconciliation is React's algorithm for efficiently updating the DOM when state changes. It compares new VDOM with previous using heuristic O(n) diffing. Same type + key = component instance preserved. Split into render phase (interruptible diffing) and commit phase (synchronous DOM mutations).",
  "interviewQuestions": [
    {
      "question": "What is reconciliation?",
      "answer": "The process of updating the DOM to match the new VDOM tree, computing minimal DOM mutations."
    },
    {
      "question": "What happens with different element types at same position?",
      "answer": "React tears down old component and builds new one from scratch. State lost, new DOM subtree inserted."
    },
    {
      "question": "How do keys help list reconciliation?",
      "answer": "Uniquely identify items across renders. React matches, preserves state, efficiently inserts/removes."
    },
    {
      "question": "Why is array index as key problematic?",
      "answer": "Incorrect matching when items are added/removed/reordered. React matches by position, not identity."
    },
    {
      "question": "What happens when type and key match?",
      "answer": "Component instance reused. DOM node updated with new props. Hook state preserved."
    },
    {
      "question": "Render phase vs commit phase?",
      "answer": "Render: compute diff (can pause). Commit: apply mutations (synchronous)."
    },
    {
      "question": "How to skip unnecessary reconciliation?",
      "answer": "React.memo, shouldComponentUpdate, useMemo, useCallback prevent re-rendering when props unchanged."
    },
    {
      "question": "Wrong key bug?",
      "answer": "Non-unique/unstable keys cause element mismatch and state corruption. Keys must be stable and unique among siblings."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 460\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrRec\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"440\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\">Reconciliation Process</text><rect x=\"40\" y=\"55\" width=\"290\" height=\"160\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"185\" y=\"78\" text-anchor=\"middle\" fill=\"#6c9fff\" font-size=\"11\" font-weight=\"bold\">Previous VDOM Tree</text><rect x=\"60\" y=\"90\" width=\"250\" height=\"28\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"185\" y=\"109\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;div&gt;</text><rect x=\"75\" y=\"125\" width=\"220\" height=\"28\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"185\" y=\"144\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;h1&gt;Hello&lt;/h1&gt;</text><rect x=\"75\" y=\"158\" width=\"220\" height=\"28\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"185\" y=\"177\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;p&gt;World&lt;/p&gt;</text><rect x=\"370\" y=\"55\" width=\"290\" height=\"160\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"515\" y=\"78\" text-anchor=\"middle\" fill=\"#e5c07b\" font-size=\"11\" font-weight=\"bold\">New VDOM Tree</text><rect x=\"390\" y=\"90\" width=\"250\" height=\"28\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"109\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;div&gt;</text><rect x=\"405\" y=\"125\" width=\"220\" height=\"28\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"144\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;h1&gt;Goodbye&lt;/h1&gt;</text><rect x=\"405\" y=\"158\" width=\"220\" height=\"28\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"177\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;span&gt;World&lt;/span&gt;</text><line x1=\"330\" y1=\"107\" x2=\"368\" y2=\"107\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrRec)\"/><line x1=\"320\" y1=\"144\" x2=\"376\" y2=\"144\" stroke=\"#fbbf24\" stroke-width=\"2\" stroke-dasharray=\"4\"/><line x1=\"320\" y1=\"173\" x2=\"376\" y2=\"173\" stroke=\"#f87171\" stroke-width=\"2\"/><text x=\"350\" y=\"100\" fill=\"#fbbf24\" font-size=\"8\" text-anchor=\"middle\">same type update</text><text x=\"350\" y=\"137\" fill=\"#fbbf24\" font-size=\"8\" text-anchor=\"middle\">same type text change</text><text x=\"350\" y=\"167\" fill=\"#f87171\" font-size=\"8\" text-anchor=\"middle\">type changed replace</text><line x1=\"350\" y1=\"220\" x2=\"350\" y2=\"250\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrRec)\"/><rect x=\"100\" y=\"250\" width=\"500\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"273\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\">Commit Phase: Apply minimal DOM mutations</text><text x=\"350\" y=\"290\" text-anchor=\"middle\" fill=\"#9aa0b0\" font-size=\"10\">Update h1 text | Replace p with span</text></svg>",
  "codeExamples": [
    {
      "title": "Correct Key Usage",
      "useCase": "Efficient list rendering",
      "code": "function TaskList({ tasks }) {\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          <TaskCard task={task} />\n        </li>\n      ))}\n    </ul>\n  );\n}",
      "description": "Stable keys (task.id) let React optimally reconcile list updates."
    },
    {
      "title": "React.memo for Skipping",
      "useCase": "Prevent unnecessary re-renders",
      "code": "const ExpensiveList = React.memo(function ExpensiveList({ items }) {\n  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;\n});\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <div>\n    <button onClick={() => setCount(c => c + 1)}>{count}</button>\n    <ExpensiveList items={items} />\n  </div>;\n}",
      "description": "React.memo skips re-rendering if props haven't changed (shallow comparison)."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Different types at same position?",
      "options": [
        "Updates existing node",
        "Unmounts old and mounts new",
        "Reuses DOM node",
        "Throws warning"
      ],
      "answer": 1,
      "explanation": "Different types = different trees."
    },
    {
      "question": "Why recommend stable keys?",
      "options": [
        "Syntax correctness",
        "Efficient matching across renders",
        "Accessibility only",
        "Optional no impact"
      ],
      "answer": 1,
      "explanation": "Keys enable optimal DOM updates."
    },
    {
      "question": "Consequence of index as key?",
      "options": [
        "No issues",
        "Wrong instance reuse, state bugs",
        "App crash",
        "Ignored"
      ],
      "answer": 1,
      "explanation": "Index keys cause incorrect positioning."
    },
    {
      "question": "When is component state preserved?",
      "options": [
        "When type and key match",
        "Only class components",
        "No state components",
        "Never"
      ],
      "answer": 0,
      "explanation": "Matching type+key preserves state."
    },
    {
      "question": "What does React.memo do?",
      "options": [
        "Skips render if props unchanged",
        "Caches state",
        "Prevents unmount",
        "Optimizes bundle"
      ],
      "answer": 0,
      "explanation": "Shallow compares props to skip re-render."
    },
    {
      "question": "Which phase can be interrupted?",
      "options": [
        "Both",
        "Only render",
        "Only commit",
        "Neither"
      ],
      "answer": 1,
      "explanation": "Render phase is interruptible."
    }
  ]
};

TOPICS_DATA["react"]["react-jsx"] = {
  "id": "react-jsx",
  "title": "React JSX",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "JSX is a syntax extension for JavaScript that looks like HTML but compiles to React.createElement calls.",
    "JSX expressions use curly braces {} to embed JavaScript values.",
    "Every JSX element must be closed, and adjacent elements must be wrapped in a fragment or parent element.",
    "JSX prevents injection attacks by default - values are escaped before rendering."
  ],
  "laymanDefinition": "JSX is like a recipe card that mixes text instructions (HTML-like tags) with variables in curly braces. {sugar} is a placeholder filled with an actual number.",
  "deepDive": [
    {
      "heading": "JSX is Syntactic Sugar",
      "text": "JSX compiles to React.createElement(type, props, ...children) calls at build time via Babel or TypeScript."
    },
    {
      "heading": "Embedding Expressions",
      "text": "Any JS expression works in {}: variables, function calls, ternary, map(). Statements (if/else, for) are NOT allowed."
    },
    {
      "heading": "JSX vs HTML Differences",
      "text": "className vs class, htmlFor vs for, camelCase properties (onClick), self-closing tags need slash, style takes object."
    },
    {
      "heading": "Fragments",
      "text": "JSX needs a single root. Use <></> to group without adding DOM nodes."
    }
  ],
  "interviewAnswer": "JSX is a syntax extension for JavaScript allowing HTML-like markup in JS files. It compiles to React.createElement calls, producing VDOM objects. Values in {} are escaped, preventing XSS. camelCase attributes, style objects, and fragments are key differences from HTML.",
  "interviewQuestions": [
    {
      "question": "What is JSX and why use it?",
      "answer": "HTML-like syntax in JS. Familiar, compile-time errors, compiles to createElement calls, allows embedding JS expressions."
    },
    {
      "question": "How does JSX prevent XSS?",
      "answer": "Escapes all values in curly braces before rendering. Strings are HTML-escaped."
    },
    {
      "question": "Key JSX vs HTML differences?",
      "answer": "className, htmlFor, camelCase events, style as object, closed tags, {/* comments */}."
    },
    {
      "question": "Why can't JSX return two adjacent elements?",
      "answer": "createElement returns one root. Use fragments to group."
    },
    {
      "question": "What does JSX compile to?",
      "answer": "React.createElement(type, props, ...children) producing VDOM objects."
    },
    {
      "question": "Can you use statements in JSX?",
      "answer": "No. Only expressions (ternary, &&, map). if/else/for are statements."
    },
    {
      "question": "What are fragments?",
      "answer": "<></> groups children without adding DOM nodes."
    },
    {
      "question": "How to add inline styles?",
      "answer": "As JS object with camelCase: <div style={{ backgroundColor: 'blue' }}>."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrJ\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\">JSX Compilation Pipeline</text><rect x=\"40\" y=\"55\" width=\"290\" height=\"130\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"185\" y=\"78\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">JSX Source Code</text><rect x=\"55\" y=\"90\" width=\"260\" height=\"80\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"185\" y=\"108\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;div className=\"hero\"&gt;</text><text x=\"185\" y=\"126\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">  &lt;h1&gt;{title}&lt;/h1&gt;</text><text x=\"185\" y=\"144\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">  &lt;p&gt;{content}&lt;/p&gt;</text><text x=\"185\" y=\"162\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\">&lt;/div&gt;</text><line x1=\"330\" y1=\"120\" x2=\"370\" y2=\"120\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrJ)\"/><rect x=\"370\" y=\"55\" width=\"290\" height=\"130\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"515\" y=\"78\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Compiled (Babel)</text><rect x=\"385\" y=\"90\" width=\"260\" height=\"80\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"108\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\">React.createElement(</text><text x=\"515\" y=\"124\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\">  'div', { className: 'hero' },</text><text x=\"515\" y=\"140\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\">  createElement('h1', null, title),</text><text x=\"515\" y=\"156\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\">  createElement('p', null, content)</text><text x=\"515\" y=\"168\" text-anchor=\"middle\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\">)</text><line x1=\"350\" y1=\"200\" x2=\"350\" y2=\"230\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrJ)\"/><rect x=\"40\" y=\"230\" width=\"620\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"253\" text-anchor=\"middle\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\">React processes createElement output (VDOM Tree)</text><line x1=\"350\" y1=\"280\" x2=\"350\" y2=\"310\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrJ)\"/><rect x=\"120\" y=\"310\" width=\"460\" height=\"36\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#34d399\" stroke-width=\"1\"/><text x=\"350\" y=\"332\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">Real DOM: &lt;div class=\"hero\"&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;p&gt;World&lt;/p&gt;&lt;/div&gt;</text></svg>",
  "codeExamples": [
    {
      "title": "Embedding Expressions",
      "useCase": "Dynamic content",
      "code": "const name = 'Alice';\nconst element = (\n  <div className=\"welcome\">\n    <h1>Hello, {name}!</h1>\n    {unreadCount > 10 && <div className=\"alert\">High volume!</div>}\n  </div>\n);",
      "description": "Curly braces embed any JS expression. Ternary and && work for conditionals."
    },
    {
      "title": "Fragments",
      "useCase": "Multiple elements without extra div",
      "code": "function UserProfile({ user }) {\n  return (\n    <>\n      <h1>{user.name}</h1>\n      <p>{user.bio}</p>\n      {user.isAdmin && <span>Admin</span>}\n    </>\n  );\n}",
      "description": "Fragments (<></>) group children without adding DOM nodes."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does JSX compile to?",
      "options": [
        "HTML strings",
        "React.createElement calls",
        "Direct DOM manipulation",
        "CSS"
      ],
      "answer": 1,
      "explanation": "Compiles to createElement calls."
    },
    {
      "question": "How to embed a variable in JSX?",
      "options": [
        "{{var}}",
        "${var}",
        "{var}",
        "[var]"
      ],
      "answer": 2,
      "explanation": "Use single curly braces."
    },
    {
      "question": "Which HTML attribute is different in JSX?",
      "options": [
        "id",
        "className (not class)",
        "href",
        "src"
      ],
      "answer": 1,
      "explanation": "class becomes className."
    },
    {
      "question": "How to return multiple elements without wrapper?",
      "options": [
        "Return array",
        "Use fragment (<></>)",
        "Comma separator",
        "Not possible"
      ],
      "answer": 1,
      "explanation": "Fragments group without DOM node."
    },
    {
      "question": "What CANNOT be used in JSX braces?",
      "options": [
        "Ternary",
        "array.map()",
        "if/else statement",
        "Function call"
      ],
      "answer": 2,
      "explanation": "Only expressions, not statements."
    },
    {
      "question": "How does JSX handle XSS?",
      "options": [
        "Doesn't escape",
        "Escapes all values in braces",
        "Uses CSP",
        "Disables inline scripts"
      ],
      "answer": 1,
      "explanation": "React escapes all rendered values."
    }
  ]
};

TOPICS_DATA["react"]["react-functional-components"] = {
  "id": "react-functional-components",
  "title": "React Functional Components",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "Functional components are plain JavaScript functions that accept props and return JSX.",
    "With hooks (useState, useEffect), functional components can manage state and side effects.",
    "They are simpler, more concise, and easier to test than class components.",
    "Functional components are the modern standard for React development since React 16.8."
  ],
  "laymanDefinition": "Think of functional components as LEGO instruction cards. Each card says 'Here are pieces (props), here's what to build (JSX).' Before hooks, you needed complex machines (classes). Now each card can also say 'remember this color' (useState) or 'fetch these pieces' (useEffect).",
  "deepDive": [
    {
      "heading": "What Is a Functional Component?",
      "text": "A JavaScript function that accepts props and returns JSX. No this, no render() method, no lifecycle methods - the function IS the render."
    },
    {
      "heading": "Hooks - The Game Changer",
      "text": "React 16.8 introduced hooks: useState for state, useEffect for side effects, useContext for context. Hooks enable stateful logic reuse without classes."
    },
    {
      "heading": "Functional vs Class Components",
      "text": "Functional: less boilerplate, no this binding, easier testing, composition over inheritance. React recommends functional components for all new code."
    },
    {
      "heading": "Pure Functional Components",
      "text": "Should be pure functions of props - same props always return same UI. Side effects go in useEffect, not the function body."
    }
  ],
  "interviewAnswer": "Functional components are JS functions that accept props and return JSX. With hooks (useState, useEffect, useReducer), they manage state and side effects, equivalent to class components with less boilerplate. Modern React exclusively uses functional components with hooks.",
  "interviewQuestions": [
    {
      "question": "What is a functional component?",
      "answer": "A JS function taking props and returning JSX. With hooks, manages state and side effects."
    },
    {
      "question": "Advantages over class components?",
      "answer": "Less boilerplate, no this binding, easier testing, hooks enable logic reuse, better tree-shaking, smaller bundles."
    },
    {
      "question": "Can functional components have state?",
      "answer": "Yes, via useState: const [count, setCount] = useState(0). Also useReducer for complex state."
    },
    {
      "question": "How do they handle side effects?",
      "answer": "useEffect: useEffect(() => { fetch('/api/data').then(setData); }, []);"
    },
    {
      "question": "Why called stateless originally?",
      "answer": "Before 16.8, they couldn't manage state. Hooks made them fully featured."
    },
    {
      "question": "How to optimize against re-renders?",
      "answer": "React.memo, useMemo, useCallback, useRef, proper dependency arrays."
    },
    {
      "question": "What happens on re-render?",
      "answer": "Entire function re-executes. Hooks persist state via fiber node."
    },
    {
      "question": "Can they throw errors?",
      "answer": "Yes, caught by error boundaries. Hooks must be called before the throw."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrFC\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Functional Component Lifecycle with Hooks</text><rect x=\"40\" y=\"55\" width=\"290\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"185\" y=\"75\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">1. Component Mounts</text><line x1=\"185\" y1=\"105\" x2=\"185\" y2=\"135\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrFC)\"/><rect x=\"40\" y=\"135\" width=\"290\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"185\" y=\"155\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">2. useEffect (after render)</text><line x1=\"185\" y1=\"175\" x2=\"185\" y2=\"205\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrFC)\"/><rect x=\"40\" y=\"205\" width=\"290\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"185\" y=\"225\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">3. State/Props Change</text><line x1=\"185\" y1=\"245\" x2=\"185\" y2=\"275\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrFC)\"/><rect x=\"40\" y=\"275\" width=\"290\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"185\" y=\"295\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">4. useEffect Cleanup + Re-run</text><line x1=\"185\" y1=\"315\" x2=\"185\" y2=\"340\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrFC)\"/><rect x=\"40\" y=\"340\" width=\"290\" height=\"28\" rx=\"4\" fill=\"#2a2f45\" stroke=\"#f87171\" stroke-width=\"1\"/><text x=\"185\" y=\"359\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Unmount: useEffect cleanup runs</text><rect x=\"370\" y=\"55\" width=\"290\" height=\"310\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"515\" y=\"78\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Available Hooks</text><rect x=\"385\" y=\"95\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"115\" fill=\"#6c9fff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useState() - Local state</text><rect x=\"385\" y=\"135\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"155\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useEffect() - Side effects</text><rect x=\"385\" y=\"175\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"195\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useContext() - Context access</text><rect x=\"385\" y=\"215\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"235\" fill=\"#e5c07b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useReducer() - Complex state</text><rect x=\"385\" y=\"255\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"275\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useMemo() - Memoized values</text><rect x=\"385\" y=\"295\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"315\" fill=\"#98c379\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useCallback() - Memoized functions</text><rect x=\"385\" y=\"335\" width=\"260\" height=\"34\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"355\" fill=\"#6c9fff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useRef() - Mutable references</text></svg>",
  "codeExamples": [
    {
      "title": "Counter with useState",
      "useCase": "Local state",
      "code": "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}",
      "description": "useState returns state variable and setter. Each setter call triggers re-render."
    },
    {
      "title": "Props with Defaults",
      "useCase": "Reusable component",
      "code": "function Greeting({ name, greeting = 'Hello' }) {\n  return <div className=\"greeting\"><span>{greeting}, {name}!</span></div>;\n}\n<Greeting name=\"Alice\" />  // Hello, Alice!\n<Greeting name=\"Bob\" greeting=\"Hi\" />  // Hi, Bob!",
      "description": "Destructure props with defaults. Component is pure function of props."
    },
    {
      "title": "Data Fetching Pattern",
      "useCase": "Async data with loading/error",
      "code": "function UserData({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    let cancelled = false;\n    fetch('/api/users/' + userId)\n      .then(res => res.json())\n      .then(data => { if (!cancelled) { setUser(data); setLoading(false); } });\n    return () => { cancelled = true; };\n  }, [userId]);\n  if (loading) return <div>Loading...</div>;\n  return <div>{user.name}</div>;\n}",
      "description": "Cleanup flag prevents setState on unmounted component."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a functional component?",
      "options": [
        "Class extending Component",
        "JS function taking props returning JSX",
        "DOM manipulator",
        "CSS-in-JS"
      ],
      "answer": 1,
      "explanation": "Plain JS function with props and JSX return."
    },
    {
      "question": "How do functional components manage state?",
      "options": [
        "Cannot manage state",
        "useState hook",
        "this.state",
        "Constructor"
      ],
      "answer": 1,
      "explanation": "useState adds state to functional components."
    },
    {
      "question": "What replaces lifecycle methods?",
      "options": [
        "Nothing",
        "useEffect hook",
        "Same as class components",
        "useState"
      ],
      "answer": 1,
      "explanation": "useEffect covers mount/update/unmount."
    },
    {
      "question": "Benefit over class components?",
      "options": [
        "Faster",
        "Less boilerplate, no this, hooks reuse",
        "Support inheritance",
        "Can use jQuery"
      ],
      "answer": 1,
      "explanation": "Simpler code with hooks."
    },
    {
      "question": "When do they re-render?",
      "options": [
        "Browser refresh",
        "Props/state changes or parent re-render",
        "Explicit call only",
        "Every second"
      ],
      "answer": 1,
      "explanation": "Re-render on state, props, or parent change."
    },
    {
      "question": "Can they throw errors?",
      "options": [
        "No",
        "Yes, hooks before throw",
        "Only wrapped in try",
        "Throwing ignored"
      ],
      "answer": 1,
      "explanation": "Errors caught by boundaries; hooks unconditional."
    }
  ]
};

TOPICS_DATA["react"]["react-component-lifecycle"] = {
  "id": "react-component-lifecycle",
  "title": "React Component Lifecycle",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Every React component goes through three phases: Mount (birth), Update (growth), and Unmount (death).",
    "Class components have explicit lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount.",
    "Functional components use the useEffect hook to replicate all lifecycle behaviors.",
    "The dependency array controls when effects run: [] for mount/unmount, [deps] for updates."
  ],
  "laymanDefinition": "Like a houseplant. Mounting = first pot (insert into DOM). Updating = watering/sunlight (props/state change). Unmounting = throwing away (remove from DOM). Lifecycle methods are instructions: 'when you first get it, water it' (componentDidMount).",
  "deepDive": [
    {
      "heading": "Mounting Phase",
      "text": "Constructor runs, render() returns JSX, React updates DOM, then componentDidMount runs / useEffect with [] runs after paint."
    },
    {
      "heading": "Updating Phase",
      "text": "Triggered by setState or prop changes. shouldComponentUpdate (class), render(), getSnapshotBeforeUpdate, then componentDidUpdate / useEffect with deps."
    },
    {
      "heading": "Unmounting Phase",
      "text": "componentWillUnmount (class) or useEffect cleanup (functional). Cancel requests, clear timers, remove listeners."
    },
    {
      "heading": "useEffect as Unified Lifecycle",
      "text": "useEffect(() => { effect; return () => cleanup; }, [deps]). [] = mount/unmount only. [deps] = mount + when deps change + unmount."
    }
  ],
  "interviewAnswer": "React lifecycle: Mounting (component created, inserted into DOM), Updating (re-rendered due to state/prop changes), Unmounting (removed from DOM). Class components use explicit methods; functional components use useEffect with dependency arrays. Strict Mode double-invokes effects to detect bugs.",
  "interviewQuestions": [
    {
      "question": "Three lifecycle phases?",
      "answer": "Mounting (creation + DOM insertion), Updating (re-render), Unmounting (removal)."
    },
    {
      "question": "Mounting order in class?",
      "answer": "constructor -> getDerivedStateFromProps -> render() -> componentDidMount."
    },
    {
      "question": "useEffect correspondence to lifecycle?",
      "answer": "[] = componentDidMount + componentWillUnmount. [deps] = componentDidUpdate. No array = every render."
    },
    {
      "question": "Purpose of cleanup?",
      "answer": "Cancel requests, clear timers, remove listeners, unsubscribe before unmount or re-run."
    },
    {
      "question": "shouldComponentUpdate and equivalent?",
      "answer": "Class method returning bool (skip re-render). Functional: React.memo + useMemo/useCallback."
    },
    {
      "question": "Strict Mode effects?",
      "answer": "Double-invokes in dev to detect missing cleanup and impure effects."
    },
    {
      "question": "getSnapshotBeforeUpdate used for?",
      "answer": "Captures DOM info (scroll position) before mutation, passed to componentDidUpdate."
    },
    {
      "question": "No cleanup function in useEffect?",
      "answer": "No cleanup runs. Fine for logging; bad for subscriptions/timers causing memory leaks."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 480\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrL\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"460\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Component Lifecycle Phases</text><rect x=\"40\" y=\"55\" width=\"190\" height=\"170\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"135\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">1. MOUNT</text><rect x=\"55\" y=\"108\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"135\" y=\"123\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Constructor / Function body</text><rect x=\"55\" y=\"134\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"135\" y=\"149\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">render() / JSX returned</text><rect x=\"55\" y=\"160\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"135\" y=\"175\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">React commits to DOM</text><rect x=\"55\" y=\"186\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"135\" y=\"201\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">componentDidMount / useEffect[]</text><rect x=\"255\" y=\"55\" width=\"190\" height=\"260\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">2. UPDATE</text><rect x=\"270\" y=\"108\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"123\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">New props / setState()</text><rect x=\"270\" y=\"134\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"149\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">shouldComponentUpdate?</text><rect x=\"270\" y=\"160\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"175\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">render() / new JSX</text><rect x=\"270\" y=\"186\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"201\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">React computes diff</text><rect x=\"270\" y=\"212\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"227\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Commits to DOM</text><rect x=\"270\" y=\"264\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"279\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">componentDidUpdate / useEffect[deps]</text><rect x=\"470\" y=\"55\" width=\"190\" height=\"120\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"565\" y=\"78\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">3. UNMOUNT</text><rect x=\"485\" y=\"108\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"565\" y=\"123\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">componentWillUnmount</text><rect x=\"485\" y=\"134\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"565\" y=\"149\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">useEffect cleanup runs</text><rect x=\"485\" y=\"160\" width=\"160\" height=\"22\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"565\" y=\"175\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">State cleared, DOM removed</text></svg>",
  "codeExamples": [
    {
      "title": "useEffect for Subscriptions",
      "useCase": "Event listeners with cleanup",
      "code": "function OnlineStatus() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    function handleOnline() { setIsOnline(true); }\n    function handleOffline() { setIsOnline(false); }\n    window.addEventListener('online', handleOnline);\n    window.addEventListener('offline', handleOffline);\n    return () => {\n      window.removeEventListener('online', handleOnline);\n      window.removeEventListener('offline', handleOffline);\n    };\n  }, []);\n  return <div>{isOnline ? 'Online' : 'Offline'}</div>;\n}",
      "description": "Listeners added on mount, removed on unmount. Without cleanup, they accumulate causing memory leaks."
    },
    {
      "title": "Class Component Lifecycle",
      "useCase": "Traditional pattern",
      "code": "class DataFetcher extends React.Component {\n  constructor(props) { super(props); this.state = { data: null, loading: true }; }\n  componentDidMount() { this.fetchData(this.props.url); }\n  componentDidUpdate(prevProps) { if (prevProps.url !== this.props.url) this.fetchData(this.props.url); }\n  componentWillUnmount() { if (this.abortController) this.abortController.abort(); }\n  async fetchData(url) {\n    this.abortController = new AbortController();\n    try {\n      const res = await fetch(url, { signal: this.abortController.signal });\n      const data = await res.json();\n      this.setState({ data, loading: false });\n    } catch (err) { if (err.name !== 'AbortError') this.setState({ error: err, loading: false }); }\n  }\n  render() { return this.state.loading ? <div>Loading...</div> : <div>{this.state.data}</div>; }\n}",
      "description": "componentDidMount fetches, componentDidUpdate compares URL, componentWillUnmount aborts pending requests."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which method fires after first render?",
      "options": [
        "constructor",
        "componentDidMount",
        "componentDidUpdate",
        "render"
      ],
      "answer": 1,
      "explanation": "componentDidMount fires after first DOM insertion."
    },
    {
      "question": "How to replicate componentWillUnmount in functional?",
      "options": [
        "Use class instead",
        "Return cleanup from useEffect",
        "Call onUnmount function",
        "Use useUnmountEffect hook"
      ],
      "answer": 1,
      "explanation": "useEffect return function runs on unmount."
    },
    {
      "question": "What does [] dependency array do?",
      "options": [
        "Runs after every render",
        "Runs only on mount, cleans up on unmount",
        "Never runs",
        "Runs only on state changes"
      ],
      "answer": 1,
      "explanation": "[] = effect runs once on mount."
    },
    {
      "question": "Correct mounting order?",
      "options": [
        "render->constructor->componentDidMount",
        "constructor->render->componentDidMount",
        "componentDidMount->render->constructor",
        "constructor->componentDidMount->render"
      ],
      "answer": 1,
      "explanation": "constructor, render, then componentDidMount."
    },
    {
      "question": "Why Strict Mode double-invokes effects?",
      "options": [
        "Bug",
        "Detect missing cleanup and impure effects",
        "Performance",
        "Test twice"
      ],
      "answer": 1,
      "explanation": "Double-invoke surfaces bugs in development."
    },
    {
      "question": "What to do in cleanup?",
      "options": [
        "Update parent state",
        "Cancel requests, clear timers, remove listeners",
        "Call setState",
        "Render farewell"
      ],
      "answer": 1,
      "explanation": "Cleanup releases resources."
    }
  ]
};

TOPICS_DATA["react"]["react-props"] = {
  "id": "react-props",
  "title": "React Props",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "Props are read-only data passed from parent to child component.",
    "Props flow downward - unidirectional data flow. Children cannot modify props.",
    "Props can be any JS value: strings, numbers, booleans, objects, arrays, functions, or React elements.",
    "Children prop (props.children) represents content between opening and closing tags."
  ],
  "laymanDefinition": "Props are gift boxes from parent to child. The child can open and read the gift, but cannot change it. The child sends messages back by calling functions the parent included (callback functions).",
  "deepDive": [
    {
      "heading": "Unidirectional Data Flow",
      "text": "Data flows from parent to child via props. Makes application predictable. When parent re-renders with new props, child receives updated values and re-renders."
    },
    {
      "heading": "Props Are Read-Only",
      "text": "Component must never modify its own props. Mutable data should be state, managed by the component itself or lifted up."
    },
    {
      "heading": "Children Prop",
      "text": "Special prop containing content between component's opening and closing tags. Enables composition: <Card><p>Content</p></Card>."
    },
    {
      "heading": "Prop Destructuring and Defaults",
      "text": "Modern React destructures props: function User({ name, age = 0 }). Defaults apply when prop is undefined."
    }
  ],
  "interviewAnswer": "Props are the mechanism for passing data from parent to child in React. They are read-only and enable unidirectional data flow. The children prop holds nested JSX content. PropTypes or TypeScript validate props at runtime or compile time.",
  "interviewQuestions": [
    {
      "question": "What are props?",
      "answer": "Read-only arguments passed from parent to child. Can be any JS value."
    },
    {
      "question": "Can a component modify its props?",
      "answer": "No - props are immutable. Use state for mutable data or callbacks for parent communication."
    },
    {
      "question": "What is the children prop?",
      "answer": "Contains content between opening and closing tags. Enables component composition."
    },
    {
      "question": "How to pass functions as props?",
      "answer": "<Child onAction={handleAction} />. Child calls props.onAction(data) to communicate upward."
    },
    {
      "question": "What is prop drilling?",
      "answer": "Passing props through intermediate components that don't use them, just forwarding deeper. Solved by Context API or composition."
    },
    {
      "question": "How to set default prop values?",
      "answer": "Destructure with defaults: function Card({ title = 'Untitled' }),"
    },
    {
      "question": "Difference between props and state?",
      "answer": "Props: from parent, read-only. State: internal, mutable by component."
    },
    {
      "question": "How to validate props?",
      "answer": "PropTypes package for runtime, TypeScript for compile-time."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrD\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrU\" markerWidth=\"10\" markerHeight=\"7\" refX=\"0\" refY=\"3.5\" orient=\"auto\"><polygon points=\"10 0,0 3.5,10 7\" fill=\"#f87171\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Props Down, Callbacks Up</text><rect x=\"180\" y=\"55\" width=\"340\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"350\" y=\"78\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Parent Component</text><line x1=\"280\" y1=\"105\" x2=\"160\" y2=\"145\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrD)\"/><line x1=\"420\" y1=\"105\" x2=\"540\" y2=\"145\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrD)\"/><rect x=\"40\" y=\"145\" width=\"240\" height=\"90\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"160\" y=\"168\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Child A</text><rect x=\"55\" y=\"198\" width=\"210\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"160\" y=\"215\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Receives props, read-only</text><rect x=\"420\" y=\"145\" width=\"240\" height=\"90\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"540\" y=\"168\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Child B</text><rect x=\"435\" y=\"198\" width=\"210\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"540\" y=\"215\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Reads props, invokes callbacks</text><line x1=\"160\" y1=\"235\" x2=\"280\" y2=\"280\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrU)\"/><line x1=\"540\" y1=\"235\" x2=\"420\" y2=\"280\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrU)\"/><rect x=\"160\" y=\"280\" width=\"380\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"300\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Callbacks Flow Up: child calls props.onX()</text></svg>",
  "codeExamples": [
    {
      "title": "Props and Children Composition",
      "useCase": "Reusable component",
      "code": "function App() {\n  return (\n    <Card title=\"Welcome\" variant=\"primary\">\n      <p>Card body content</p>\n      <button onClick={handleClick}>Click</button>\n    </Card>\n  );\n}\nfunction Card({ title, variant, children }) {\n  return (\n    <div className={`card card-${variant}`}>\n      <h2>{title}</h2>\n      <div className=\"card-body\">{children}</div>\n    </div>\n  );\n}",
      "description": "Card receives title, variant as props, children as nested content. Parent controls data."
    },
    {
      "title": "Callback Props for Upward Communication",
      "useCase": "Child to parent data flow",
      "code": "function TodoApp() {\n  const [todos, setTodos] = useState([]);\n  function addTodo(text) { setTodos([...todos, { id: Date.now(), text }]); }\n  return (\n    <div>\n      <AddTodo onAdd={addTodo} />\n      <TodoList items={todos} />\n    </div>\n  );\n}\nfunction AddTodo({ onAdd }) {\n  const [text, setText] = useState('');\n  return <div><input value={text} onChange={e => setText(e.target.value)} />\n    <button onClick={() => { onAdd(text); setText(''); }}>Add</button></div>;\n}",
      "description": "Parent passes addTodo as callback. Child calls it to communicate upward."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What are props?",
      "options": [
        "Internal state",
        "Read-only data from parent",
        "Global variables",
        "CSS classes"
      ],
      "answer": 1,
      "explanation": "Props are read-only from parent."
    },
    {
      "question": "Can child modify props?",
      "options": [
        "Yes with setProps()",
        "No - immutable",
        "Only with var",
        "Only in classes"
      ],
      "answer": 1,
      "explanation": "Props are immutable to child."
    },
    {
      "question": "What does children prop contain?",
      "options": [
        "Internal state",
        "Content between tags",
        "Component name",
        "CSS classes"
      ],
      "answer": 1,
      "explanation": "children is content between tags."
    },
    {
      "question": "How to send data from child to parent?",
      "options": [
        "Modify props",
        "Call callback function prop",
        "Use global variable",
        "Throw event"
      ],
      "answer": 1,
      "explanation": "Child calls callback passed as prop."
    },
    {
      "question": "What is prop drilling?",
      "options": [
        "Creating props dynamically",
        "Passing through unused intermediates",
        "Deep validation",
        "Too many props"
      ],
      "answer": 1,
      "explanation": "Passing through layers that don't use them."
    },
    {
      "question": "Props vs state?",
      "options": [
        "Props=class, state=functional",
        "Props=external/readonly, state=internal/mutable",
        "Props=mutable, state=immutable",
        "No difference"
      ],
      "answer": 1,
      "explanation": "Props from parent (read-only), state is internal (mutable)."
    }
  ]
};

TOPICS_DATA["react"]["react-state"] = {
  "id": "react-state",
  "title": "React State",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "State is data that changes over time within a component. When state changes, the component re-renders.",
    "useState is the primary hook: const [value, setValue] = useState(initial).",
    "State updates are asynchronous and batched in React 18+.",
    "State should be treated as immutable - always replace it, never mutate directly."
  ],
  "laymanDefinition": "State is like a sports scoreboard. The scoreboard shows current score. When a team scores, someone updates the number. The audience (UI) sees the new score. If the operator scribbled without pressing 'update' (setState), the audience wouldn't see the change.",
  "deepDive": [
    {
      "heading": "What is State?",
      "text": "State represents data that changes over time and affects rendering. Unlike props (from outside, read-only), state is internal and can be updated by the component."
    },
    {
      "heading": "useState Hook",
      "text": "useState(initial) returns [value, setter]. State persists across renders via fiber node. Setter can take new value or function: setCount(c => c + 1)."
    },
    {
      "heading": "Async and Batched Updates",
      "text": "setState does not update immediately. React batches multiple setState calls within an event handler into a single update. React 18 extends batching to timeouts and promises."
    },
    {
      "heading": "Immutability",
      "text": "Treat state as immutable. For objects/arrays, create a new copy instead of mutating: setUsers([...users, newUser]) or setUser({ ...user, name: 'New' })."
    }
  ],
  "interviewAnswer": "State is mutable data owned by a component. useState returns [value, setter] where the setter triggers re-render. State updates are async and batched. Never mutate state directly - always create new copies. The functional update form (setCount(c => c + 1)) is preferred when new state depends on old state.",
  "interviewQuestions": [
    {
      "question": "What is state in React?",
      "answer": "Data that changes over time within a component. When state updates, the component re-renders."
    },
    {
      "question": "How does useState work?",
      "answer": "useState(initial) returns [currentValue, setterFunction]. State persists across renders via fiber node."
    },
    {
      "question": "Are state updates synchronous?",
      "answer": "No - they are asynchronous. Multiple setState calls are batched into one update for performance."
    },
    {
      "question": "What is the functional update form?",
      "answer": "setCount(prev => prev + 1). Preferred when new state depends on previous state, avoids stale closures."
    },
    {
      "question": "How to update objects/arrays in state?",
      "answer": "Create new copies: setUsers([...users, newUser]) or setUser({ ...user, name: 'New' }). Never mutate directly."
    },
    {
      "question": "What is automatic batching?",
      "answer": "React 18 batches state updates across all contexts (event handlers, timeouts, promises), not just React events."
    },
    {
      "question": "What happens if you mutate state directly?",
      "answer": "React won't detect the change because the reference hasn't changed. No re-render occurs."
    },
    {
      "question": "Can you have multiple state variables?",
      "answer": "Yes, call useState multiple times for independent values. Use useReducer for complex state objects."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 360\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrS\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"340\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">State Update Lifecycle</text><rect x=\"40\" y=\"55\" width=\"620\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">1. Event triggers setState(newValue)</text><line x1=\"350\" y1=\"100\" x2=\"350\" y2=\"128\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrS)\"/><rect x=\"40\" y=\"128\" width=\"620\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"350\" y=\"148\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">2. React batches the update (async)</text><text x=\"350\" y=\"164\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Multiple setState calls in same handler are batched</text><line x1=\"350\" y1=\"173\" x2=\"350\" y2=\"200\" stroke=\"#e5c07b\" stroke-width=\"2\" marker-end=\"url(#arrS)\"/><rect x=\"40\" y=\"200\" width=\"620\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"220\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">3. Component re-renders with new state</text><text x=\"350\" y=\"236\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">New VDOM tree is created and diffed</text><line x1=\"350\" y1=\"245\" x2=\"350\" y2=\"272\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrS)\"/><rect x=\"40\" y=\"272\" width=\"620\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"292\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">4. DOM updated with minimal mutations</text><text x=\"350\" y=\"308\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Commit phase applies patches to real DOM</text></svg>",
  "codeExamples": [
    {
      "title": "useState with Different Data Types",
      "useCase": "State management patterns",
      "code": "function StateExamples() {\n  const [count, setCount] = useState(0);\n  const [user, setUser] = useState({ name: '', age: 0 });\n  const [items, setItems] = useState([]);\n\n  // Primitive: direct replacement\n  const increment = () => setCount(c => c + 1);\n\n  // Object: spread to preserve other fields\n  const updateName = (name) => setUser(u => ({ ...u, name }));\n\n  // Array: spread or concat for immutable update\n  const addItem = (item) => setItems(i => [...i, item]);\n\n  return <div>...</div>;\n}",
      "description": "Always create new copies for objects/arrays. Use functional updates (prev => new) for correctness."
    },
    {
      "title": "State vs Props Example",
      "useCase": "Understanding ownership",
      "code": "function Parent() {\n  const [count, setCount] = useState(0); // state owned here\n  return (\n    <div>\n      <p>Parent count: {count}</p>\n      <Child count={count} onIncrement={() => setCount(c => c + 1)} />\n    </div>\n  );\n}\nfunction Child({ count, onIncrement }) {\n  // count is a prop here - read-only\n  return <button onClick={onIncrement}>Child: {count}</button>;\n}",
      "description": "State lives in Parent (the owner). Child receives count as a prop (read-only) and calls onIncrement to request changes."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is state?",
      "options": [
        "Data from parent",
        "Internal mutable data that triggers re-render on change",
        "CSS styling",
        "Component name"
      ],
      "answer": 1,
      "explanation": "State is internal data that causes re-render when changed."
    },
    {
      "question": "What does useState return?",
      "options": [
        "A single value",
        "An array [value, setter]",
        "An object {value, setter}",
        "A tuple"
      ],
      "answer": 1,
      "explanation": "Returns [currentValue, setterFunction]."
    },
    {
      "question": "Are state updates synchronous?",
      "options": [
        "Yes, immediately",
        "No, async and batched",
        "Only in classes",
        "Only in production"
      ],
      "answer": 1,
      "explanation": "Updates are async and batched for performance."
    },
    {
      "question": "How to update object state immutably?",
      "options": [
        "Direct mutation",
        "setUser({ ...user, name: 'New' })",
        "setUser(user)",
        "user.name = 'New'"
      ],
      "answer": 1,
      "explanation": "Spread operator creates new object copy."
    },
    {
      "question": "What is functional update?",
      "options": [
        "setCount(0)",
        "setCount(c => c + 1)",
        "count++",
        "count = count + 1"
      ],
      "answer": 1,
      "explanation": "(prev => new) form uses previous state."
    },
    {
      "question": "What happens if you mutate state directly?",
      "options": [
        "Component re-renders",
        "No re-render (reference unchanged)",
        "Error thrown",
        "State resets"
      ],
      "answer": 1,
      "explanation": "Direct mutation doesn't change reference, no re-render."
    }
  ]
};

TOPICS_DATA["react"]["react-controlled-components"] = {
  "id": "react-controlled-components",
  "title": "React Controlled Components",
  "difficulty": "intermediate",
  "estimatedMinutes": 15,
  "tldr": [
    "A controlled component has its value controlled by React state rather than the DOM.",
    "The input's value is set by state, and changes are handled via onChange.",
    "The single source of truth is React state, not the DOM.",
    "Controlled components give React full control over form inputs."
  ],
  "laymanDefinition": "Think of controlled components like a puppeteer controlling a puppet. The puppeteer (React) directly controls every movement of the puppet (input value). The puppet cannot move on its own - every change must go through the puppeteer. This gives the puppeteer complete control over what the puppet does.",
  "deepDive": [
    {
      "heading": "What Is a Controlled Component?",
      "text": "A form element (<input>, <textarea>, <select>) whose value is controlled by React state. The component stores the current value in state and updates it via onChange. React becomes the single source of truth."
    },
    {
      "heading": "How It Works",
      "text": "1. State holds the current value (e.g., useState('')). 2. The input's value prop is set to the state variable. 3. onChange handler calls the setter with e.target.value. 4. React re-renders with the new value."
    },
    {
      "heading": "Benefits Over Uncontrolled",
      "text": "Instant validation, conditional disabling, dynamic formatting, reset capability, and the ability to react to every keystroke. The entire form state is predictable and testable."
    },
    {
      "heading": "Common Patterns",
      "text": "Multiple inputs use a single onChange handler with computed property names. Checkboxes use checked prop instead of value. Select dropdowns use the same value/onChange pattern."
    }
  ],
  "interviewAnswer": "A controlled component is a form element whose value is driven by React state. The input's value prop is bound to state, and onChange updates that state. This gives React full control over the input, enabling instant validation, formatting, and conditional rendering. React is the single source of truth.",
  "interviewQuestions": [
    {
      "question": "What is a controlled component?",
      "answer": "A form input whose value is controlled by React state via value prop and onChange handler."
    },
    {
      "question": "How does it differ from uncontrolled?",
      "answer": "Controlled: state manages value. Uncontrolled: input manages its own state internally, accessed via ref."
    },
    {
      "question": "What is the single source of truth?",
      "answer": "React state. The DOM input value always reflects the state value, not vice versa."
    },
    {
      "question": "How to handle multiple inputs?",
      "answer": "Use computed property names: const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });"
    },
    {
      "question": "Why use controlled components?",
      "answer": "Instant validation, conditional formatting, reset capability, predictable state, easier testing."
    },
    {
      "question": "How to handle checkboxes and selects?",
      "answer": "Checkbox: checked={isChecked} onChange={handleCheckbox}. Select: value={selected} onChange={handleSelect}."
    },
    {
      "question": "Performance concerns with many inputs?",
      "answer": "For large forms, debounce onChange, use refs for read-only fields, or use libraries like Formik/React Hook Form."
    },
    {
      "question": "Can you mix controlled and uncontrolled?",
      "answer": "No - React warns if an input switches between controlled and uncontrolled. Choose one pattern per input."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 340\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrC\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"320\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Controlled Component Data Flow</text><rect x=\"40\" y=\"55\" width=\"280\" height=\"100\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"180\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">React State</text><rect x=\"55\" y=\"90\" width=\"250\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"180\" y=\"107\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\" text-anchor=\"middle\">const [value, setValue] = useState('')</text><line x1=\"180\" y1=\"155\" x2=\"180\" y2=\"185\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrC)\"/><rect x=\"40\" y=\"185\" width=\"280\" height=\"110\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"180\" y=\"208\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Input Element</text><rect x=\"55\" y=\"220\" width=\"250\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"180\" y=\"237\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\" text-anchor=\"middle\">&lt;input value={value} /&gt;</text><rect x=\"55\" y=\"252\" width=\"250\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"180\" y=\"269\" fill=\"#e8eaed\" font-size=\"11\" font-family=\"monospace\" text-anchor=\"middle\">onChange={e =&gt; setValue(e.target.value)}</text><path d=\"M 320 110 Q 450 110 450 185 L 320 240\" fill=\"none\" stroke=\"#f87171\" stroke-width=\"1.5\" stroke-dasharray=\"4\" marker-end=\"url(#arrC)\"/><text x=\"400\" y=\"145\" fill=\"#f87171\" font-size=\"9\" text-anchor=\"middle\">user types</text><text x=\"400\" y=\"210\" fill=\"#6c9fff\" font-size=\"9\" text-anchor=\"middle\">new value applied</text></svg>",
  "codeExamples": [
    {
      "title": "Controlled Input with Validation",
      "useCase": "Form with real-time validation",
      "code": "function EmailInput() {\n  const [email, setEmail] = useState('');\n  const [error, setError] = useState('');\n\n  function handleChange(e) {\n    const value = e.target.value;\n    setEmail(value);\n    if (value && !value.includes('@')) {\n      setError('Invalid email address');\n    } else {\n      setError('');\n    }\n  }\n\n  return (\n    <div>\n      <input type=\"email\" value={email} onChange={handleChange} />\n      {error && <span style={{color:'red'}}>{error}</span>}\n      <button disabled={!!error || !email}>Submit</button>\n    </div>\n  );\n}",
      "description": "State controls both the value and validation. The input cannot change without going through React."
    },
    {
      "title": "Multiple Controlled Inputs",
      "useCase": "Form with many fields",
      "code": "function SignupForm() {\n  const [form, setForm] = useState({ name: '', email: '', age: '' });\n\n  function handleChange(e) {\n    const { name, value } = e.target;\n    setForm(prev => ({ ...prev, [name]: value }));\n  }\n\n  return (\n    <form>\n      <input name=\"name\" value={form.name} onChange={handleChange} placeholder=\"Name\" />\n      <input name=\"email\" value={form.email} onChange={handleChange} placeholder=\"Email\" />\n      <input name=\"age\" type=\"number\" value={form.age} onChange={handleChange} placeholder=\"Age\" />\n    </form>\n  );\n}",
      "description": "Computed property name [e.target.name] maps each input to its state key. Single handler manages all inputs."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a controlled component?",
      "options": [
        "Input managed by DOM",
        "Input value controlled by React state",
        "Input with default value",
        "Input without onChange"
      ],
      "answer": 1,
      "explanation": "React state controls the input value."
    },
    {
      "question": "How does a controlled input update?",
      "options": [
        "Direct DOM manipulation",
        "State setter via onChange handler",
        "Browser auto-fill",
        "Ref assignment"
      ],
      "answer": 1,
      "explanation": "onChange handler calls state setter."
    },
    {
      "question": "What is the single source of truth?",
      "options": [
        "The DOM",
        "React state",
        "The browser",
        "The input element"
      ],
      "answer": 1,
      "explanation": "React state is the single source of truth."
    },
    {
      "question": "What happens if value is set but onChange is missing?",
      "options": [
        "Works fine",
        "React warns and input is read-only",
        "Error thrown",
        "Input becomes uncontrolled"
      ],
      "answer": 1,
      "explanation": "Without onChange, input is effectively read-only."
    },
    {
      "question": "Why use controlled over uncontrolled?",
      "options": [
        "Easier validation, formatting, and reset",
        "Better performance",
        "Less code required",
        "No state management needed"
      ],
      "answer": 0,
      "explanation": "Controlled gives full control over input behavior."
    },
    {
      "question": "How to handle multiple inputs?",
      "options": [
        "Separate handler per input",
        "Computed property names with name attr",
        "Global event listener",
        "Inline functions"
      ],
      "answer": 1,
      "explanation": "Use [e.target.name] with a single handler."
    }
  ]
};

TOPICS_DATA["react"]["react-uncontrolled-components"] = {
  "id": "react-uncontrolled-components",
  "title": "React Uncontrolled Components",
  "difficulty": "intermediate",
  "estimatedMinutes": 15,
  "tldr": [
    "Uncontrolled components store their own internal state in the DOM, not in React state.",
    "Access the current value via a ref (useRef) instead of an onChange handler.",
    "Useful for simple, read-once inputs like file uploads or integrating with non-React code.",
    "React provides defaultValue to set an initial value without controlling the input."
  ],
  "laymanDefinition": "An uncontrolled component is like a vending machine. The machine (input) manages its own state internally. You don't need to tell it what to display - you just ask it later what was selected (via ref). Controlled is like a soda fountain where an attendant (React) pushes the button for you.",
  "deepDive": [
    {
      "heading": "What Is an Uncontrolled Component?",
      "text": "A form element that manages its own value internally (in the DOM). React does not set the value via state. Instead, you use a ref to read the current value when needed (e.g., on form submission)."
    },
    {
      "heading": "Default Values with defaultValue",
      "text": "React provides defaultValue (and defaultChecked for checkboxes) to set an initial value for uncontrolled inputs. This is the only React-controlled aspect - after initial render, the input manages itself."
    },
    {
      "heading": "When to Use Uncontrolled",
      "text": "File inputs (which are inherently uncontrolled), simple forms where you only need values on submit, integrating with non-React libraries that manipulate the DOM directly, and performance-critical scenarios with many inputs."
    },
    {
      "heading": "Refs to Read Values",
      "text": "useRef creates a mutable object with a .current property. Attach to the input via ref prop. Read the value on submit: inputRef.current.value. Refs don't cause re-renders when updated."
    }
  ],
  "interviewAnswer": "Uncontrolled components keep their state in the DOM rather than React state. Use useRef to access the input's current value when needed. React sets an initial value via defaultValue, then the browser manages the input. Uncontrolled is simpler for basic forms but lacks the real-time validation and control of controlled components.",
  "interviewQuestions": [
    {
      "question": "What is an uncontrolled component?",
      "answer": "A form input that manages its own state in the DOM. React reads the value via ref when needed."
    },
    {
      "question": "How do you set an initial value?",
      "answer": "Use defaultValue prop (not value). React sets initial value, then the DOM takes over."
    },
    {
      "question": "How do you read the current value?",
      "answer": "Via a ref: const inputRef = useRef(); <input ref={inputRef} />. Read: inputRef.current.value."
    },
    {
      "question": "When to use uncontrolled over controlled?",
      "answer": "File inputs, simple submit-only forms, third-party DOM integration, performance optimization for many inputs."
    },
    {
      "question": "What is a ref?",
      "answer": "A mutable object (useRef) that persists across renders. Updating .current doesn't trigger re-render."
    },
    {
      "question": "Can uncontrolled inputs have validation?",
      "answer": "Yes, but validation happens on submit (reading ref value) rather than on each keystroke."
    },
    {
      "question": "Can you mix controlled and uncontrolled?",
      "answer": "React warns if an input switches patterns. Stick to one pattern per input."
    },
    {
      "question": "What about initial values for uncontrolled inputs?",
      "answer": "Only defaultValue works. The value prop is ignored because React doesn't control it."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrUC\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Uncontrolled Component</text><rect x=\"40\" y=\"55\" width=\"300\" height=\"70\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"190\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">React Component</text><rect x=\"55\" y=\"90\" width=\"270\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"190\" y=\"107\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">useRef initializes ref</text><rect x=\"40\" y=\"145\" width=\"300\" height=\"70\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"190\" y=\"168\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">DOM manages value</text><rect x=\"55\" y=\"180\" width=\"270\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"190\" y=\"197\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Input stores value internally</text><line x1=\"340\" y1=\"90\" x2=\"420\" y2=\"140\" stroke=\"#6c9fff\" stroke-width=\"2\" stroke-dasharray=\"4\" marker-end=\"url(#arrUC)\"/><text x=\"410\" y=\"100\" fill=\"#f87171\" font-size=\"9\" text-anchor=\"middle\">ref.current.value<br/>(read on submit)</text><rect x=\"400\" y=\"145\" width=\"260\" height=\"70\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"530\" y=\"168\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Form Submit Handler</text><rect x=\"415\" y=\"180\" width=\"230\" height=\"26\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"530\" y=\"197\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Access ref.current.value</text></svg>",
  "codeExamples": [
    {
      "title": "Uncontrolled Input with Ref",
      "useCase": "Simple form, submit-only read",
      "code": "function SimpleForm() {\n  const nameRef = useRef(null);\n  const emailRef = useRef(null);\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    const data = {\n      name: nameRef.current.value,\n      email: emailRef.current.value\n    };\n    console.log('Submitted:', data);\n    // send to API\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input ref={nameRef} defaultValue=\"\" placeholder=\"Name\" />\n      <input ref={emailRef} defaultValue=\"\" placeholder=\"Email\" />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}",
      "description": "Inputs manage their own state. Refs read values on submit. No onChange or state needed."
    },
    {
      "title": "File Input (Inherently Uncontrolled)",
      "useCase": "File upload",
      "code": "function FileUpload() {\n  const fileRef = useRef(null);\n\n  function handleUpload() {\n    const file = fileRef.current.files[0];\n    if (file) {\n      const reader = new FileReader();\n      reader.onload = (e) => console.log('File content:', e.target.result);\n      reader.readAsDataURL(file);\n    }\n  }\n\n  return (\n    <div>\n      <input type=\"file\" ref={fileRef} />\n      <button onClick={handleUpload}>Upload</button>\n    </div>\n  );",
      "description": "File inputs are inherently uncontrolled (read-only value). Use ref to access the selected File object."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is an uncontrolled component?",
      "options": [
        "Value controlled by React state",
        "Value managed by DOM internally",
        "Always uses onChange",
        "Requires useState"
      ],
      "answer": 1,
      "explanation": "DOM manages the input's state."
    },
    {
      "question": "How to set initial value?",
      "options": [
        "value prop",
        "defaultValue prop",
        "Both work",
        "Neither"
      ],
      "answer": 1,
      "explanation": "defaultValue sets initial value only."
    },
    {
      "question": "How to read current value?",
      "options": [
        "event.target.value from onChange",
        "ref.current.value",
        "state variable",
        "direct DOM query"
      ],
      "answer": 1,
      "explanation": "Use ref to read value when needed."
    },
    {
      "question": "When to use uncontrolled?",
      "options": [
        "File inputs, simple forms",
        "Complex validation",
        "Real-time formatting",
        "Conditional disabling"
      ],
      "answer": 0,
      "explanation": "File inputs and simple submit-only forms."
    },
    {
      "question": "What is defaultValue for?",
      "options": [
        "Controlling the input",
        "Setting initial value for uncontrolled inputs",
        "Validation",
        "Styling"
      ],
      "answer": 1,
      "explanation": "Sets initial value for uncontrolled inputs."
    },
    {
      "question": "Can uncontrolled inputs have real-time validation?",
      "options": [
        "Yes, same as controlled",
        "No, validation on submit only",
        "Only with special library",
        "Not possible"
      ],
      "answer": 1,
      "explanation": "Validation happens on submit when reading ref."
    }
  ]
};

TOPICS_DATA["react"]["react-lifting-state-up"] = {
  "id": "react-lifting-state-up",
  "title": "React Lifting State Up",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Lifting state up means moving shared state to the nearest common ancestor component.",
    "Multiple sibling components that need the same data should get it from a shared parent.",
    "The parent owns the state and passes it down via props, along with callback functions to modify it.",
    "This follows React's unidirectional data flow and keeps components predictable."
  ],
  "laymanDefinition": "Imagine three kids sharing a single toy. Instead of giving each kid their own toy (duplicating state), you put one toy in the living room (parent component) and all kids come to the living room to play with it. The living room (parent) controls who can play with it and when - this is lifting state up.",
  "deepDive": [
    {
      "heading": "The Problem: Sibling Communication",
      "text": "Siblings cannot directly share state. React data flows down (props). If two siblings need to sync, the state must live in a common parent, not in either sibling."
    },
    {
      "heading": "How Lifting Works",
      "text": "1. Identify the common ancestor of components that need shared data. 2. Move state to that ancestor. 3. Pass state down as props. 4. Pass callbacks down for children to update the shared state."
    },
    {
      "heading": "Example: Two Dependent Inputs",
      "text": "A Celsius and Fahrenheit converter. Both inputs need to show the same temperature. State (temperature in Celsius) lives in the parent. Each input receives value as prop and calls onChange callback. Parent converts between units."
    },
    {
      "heading": "When Not to Lift",
      "text": "Lifting too high can cause unnecessary re-renders. Use Context or state management for deeply shared global state. Only lift to the nearest common ancestor, not all the way to the root."
    }
  ],
  "interviewAnswer": "Lifting state up is moving state to the nearest common ancestor of components that need to share it. The ancestor owns the state and passes it down via props. Children communicate changes via callback props. This keeps data flow predictable and components reusable. For deeply nested or global state, prefer Context API or state management.",
  "interviewQuestions": [
    {
      "question": "What is lifting state up?",
      "answer": "Moving shared state to the nearest common ancestor of components that need it."
    },
    {
      "question": "Why lift state up instead of duplicating?",
      "answer": "Duplicating causes sync issues. One source of truth in the parent ensures consistency."
    },
    {
      "question": "How do children update lifted state?",
      "answer": "The parent passes down callback functions. Children call them with new values."
    },
    {
      "question": "What is the common ancestor?",
      "answer": "The first parent component that is an ancestor of all components needing the shared state."
    },
    {
      "question": "When should you NOT lift state up?",
      "answer": "When state is global or deeply nested - use Context API or Redux instead."
    },
    {
      "question": "Does lifting state up cause performance issues?",
      "answer": "Can cause unnecessary re-renders if lifted too high. Use React.memo and useMemo to optimize."
    },
    {
      "question": "How does lifting affect component reusability?",
      "answer": "Components become more reusable - they receive data via props and don't depend on sibling state."
    },
    {
      "question": "What's the alternative to lifting?",
      "answer": "Context API for shared state without prop drilling. Redux/Zustand for complex global state."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrL\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker><marker id=\"arrLU\" markerWidth=\"10\" markerHeight=\"7\" refX=\"0\" refY=\"3.5\" orient=\"auto\"><polygon points=\"10 0,0 3.5,10 7\" fill=\"#f87171\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Lifting State Up</text><rect x=\"180\" y=\"55\" width=\"340\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"350\" y=\"78\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Parent (Common Ancestor)</text><text x=\"350\" y=\"95\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Owns the state: const [value, setValue] = useState('')</text><line x1=\"220\" y1=\"115\" x2=\"120\" y2=\"155\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrL)\"/><line x1=\"480\" y1=\"115\" x2=\"580\" y2=\"155\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrL)\"/><rect x=\"30\" y=\"155\" width=\"240\" height=\"80\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"150\" y=\"178\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Sibling A</text><rect x=\"45\" y=\"192\" width=\"210\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"150\" y=\"211\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Receives value and onValueChange</text><rect x=\"430\" y=\"155\" width=\"240\" height=\"80\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"550\" y=\"178\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Sibling B</text><rect x=\"445\" y=\"192\" width=\"210\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"550\" y=\"211\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Displays value, can trigger change</text><line x1=\"150\" y1=\"235\" x2=\"350\" y2=\"280\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrLU)\"/><line x1=\"550\" y1=\"235\" x2=\"350\" y2=\"280\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrLU)\"/><rect x=\"100\" y=\"280\" width=\"500\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"350\" y=\"303\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Callbacks Flow Up: siblings call onValueChange(newValue)</text></svg>",
  "codeExamples": [
    {
      "title": "Temperature Converter (Lifted State)",
      "useCase": "Sibling sync",
      "code": "function TemperatureConverter() {\n  const [celsius, setCelsius] = useState(0);\n\n  return (\n    <div>\n      <CelsiusInput value={celsius} onChange={setCelsius} />\n      <FahrenheitDisplay celsius={celsius} />\n    </div>\n  );\n}\nfunction CelsiusInput({ value, onChange }) {\n  return (\n    <input type=\"number\" value={value}\n      onChange={e => onChange(Number(e.target.value))} />\n  );\n}\nfunction FahrenheitDisplay({ celsius }) {\n  const f = (celsius * 9/5) + 32;\n  return <p>{celsius}C = {f}F</p>;\n}",
      "description": "State (celsius) lifted to TemperatureConverter. Both children receive data via props. Input component sends changes via callback."
    },
    {
      "title": "Seat Selector Example",
      "useCase": "Coordinated UI state",
      "code": "function MovieApp() {\n  const [selectedSeat, setSelectedSeat] = useState(null);\n  return (\n    <div>\n      <SeatGrid selected={selectedSeat} onSelect={setSelectedSeat} />\n      <BookingPanel selected={selectedSeat} />\n    </div>\n  );\n}",
      "description": "selectedSeat state lives in MovieApp. SeatGrid displays and updates selection. BookingPanel reads the selection. Both sync via lifted state."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is lifting state up?",
      "options": [
        "Adding more state",
        "Moving state to common ancestor",
        "Removing state",
        "Duplicating state"
      ],
      "answer": 1,
      "explanation": "State moves to nearest shared ancestor."
    },
    {
      "question": "Why lift state instead of duplicating?",
      "options": [
        "Duplicating causes sync issues",
        "It's faster",
        "Less code",
        "Easier styling"
      ],
      "answer": 0,
      "explanation": "Single source of truth in parent."
    },
    {
      "question": "How do children update lifted state?",
      "options": [
        "Directly modify state",
        "Via callback props",
        "Using global variables",
        "Through refs"
      ],
      "answer": 1,
      "explanation": "Children call callback functions from props."
    },
    {
      "question": "What is the common ancestor?",
      "options": [
        "The app root",
        "Nearest ancestor of all needing state",
        "Any parent",
        "The child itself"
      ],
      "answer": 1,
      "explanation": "Nearest common ancestor of sibling components."
    },
    {
      "question": "When use Context instead of lifting?",
      "options": [
        "Always",
        "For deeply nested global state",
        "Never",
        "Only in classes"
      ],
      "answer": 1,
      "explanation": "Context for deeply shared state avoids excessive lifting."
    },
    {
      "question": "Does lifting improve reusability?",
      "options": [
        "Yes, components are prop-driven",
        "No, makes them less reusable",
        "No effect",
        "Depends"
      ],
      "answer": 0,
      "explanation": "Components become more reusable with props."
    }
  ]
};

TOPICS_DATA["react"]["react-prop-drilling"] = {
  "id": "react-prop-drilling",
  "title": "React Prop Drilling",
  "difficulty": "intermediate",
  "estimatedMinutes": 15,
  "tldr": [
    "Prop drilling is passing props through many intermediate components that don't use them, just to reach deeply nested components.",
    "It creates tight coupling, makes refactoring difficult, and adds unnecessary complexity.",
    "Solutions: Context API, component composition (lifting content up), or state management libraries.",
    "It's not an error - it's a design smell that indicates the architecture needs improvement."
  ],
  "laymanDefinition": "Prop drilling is like passing a message through 10 people in a line to reach the last person. Each person in the middle doesn't need the message, they just pass it along. It works, but it's inefficient and if someone in the middle changes, the whole chain breaks. Better to just call or text the last person directly (Context API).",
  "deepDive": [
    {
      "heading": "What Is Prop Drilling?",
      "text": "When a parent component passes a prop to a child, which passes it to its child, and so on, through several levels, just to reach a deeply nested component that actually uses the prop. Intermediate components act as mere pass-through conduits."
    },
    {
      "heading": "Why It's a Problem",
      "text": "1. Tight coupling: intermediate components must know about and forward props they don't use. 2. Refactoring burden: adding a prop means updating every intermediate component. 3. Reduced component reusability: pass-through components are tied to specific parent-child data paths."
    },
    {
      "heading": "Solution 1: Context API",
      "text": "React.createContext creates a context. A Provider (at any level) supplies the value. Any descendant Consumer or useContext hook accesses it directly, skipping intermediate components."
    },
    {
      "heading": "Solution 2: Component Composition",
      "text": "Instead of passing props through layers, lift the relevant JSX up. The parent renders the deeply nested content and passes it as children or a render prop, eliminating the need for prop drilling."
    }
  ],
  "interviewAnswer": "Prop drilling is passing props through components that don't need them, solely to reach deeper components. It's not a bug but a design smell. Solutions: Context API (direct access to values), component composition (pass JSX as children), or state management libraries (Redux, Zustand). Prop drilling makes refactoring hard and couples components unnecessarily.",
  "interviewQuestions": [
    {
      "question": "What is prop drilling?",
      "answer": "Passing props through multiple intermediate components that don't use them, just to reach deeply nested components."
    },
    {
      "question": "Why is prop drilling bad?",
      "answer": "Tight coupling, difficult refactoring, reduced reusability, unnecessary complexity in intermediate components."
    },
    {
      "question": "How does Context API solve prop drilling?",
      "answer": "Provider supplies value at any level. Descendants use useContext to access it directly, bypassing all intermediates."
    },
    {
      "question": "How does component composition help?",
      "answer": "The parent renders the content directly and passes it as children/render prop, eliminating the need to drill."
    },
    {
      "question": "What is a pass-through component?",
      "answer": "A component that receives props only to forward them to a child, without using them itself."
    },
    {
      "question": "When is prop drilling acceptable?",
      "answer": "For shallow hierarchies (1-2 levels), small apps, or when prototyping. Refactor to Context when it grows."
    },
    {
      "question": "Does Redux eliminate prop drilling?",
      "answer": "Yes - Redux store is accessible from any connected component via useSelector/connect, skipping intermediate components."
    },
    {
      "question": "How to identify prop drilling in code review?",
      "answer": "Look for components that accept many props but don't use them in their own JSX - just pass them deeper."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 400\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrP\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#f87171\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"380\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Prop Drilling vs Context API</text><rect x=\"40\" y=\"55\" width=\"290\" height=\"300\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"185\" y=\"78\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Prop Drilling</text><rect x=\"55\" y=\"90\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"185\" y=\"110\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">Page (owns data) -- passes prop</text><line x1=\"185\" y1=\"122\" x2=\"185\" y2=\"140\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrP)\"/><rect x=\"55\" y=\"140\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"185\" y=\"160\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">Section (passes through)</text><line x1=\"185\" y1=\"172\" x2=\"185\" y2=\"190\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrP)\"/><rect x=\"55\" y=\"190\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"185\" y=\"210\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">Card (passes through)</text><line x1=\"185\" y1=\"222\" x2=\"185\" y2=\"240\" stroke=\"#f87171\" stroke-width=\"1.5\" marker-end=\"url(#arrP)\"/><rect x=\"55\" y=\"240\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"185\" y=\"260\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">Button (actually uses prop)</text><rect x=\"370\" y=\"55\" width=\"290\" height=\"300\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"515\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Context API</text><rect x=\"385\" y=\"90\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"110\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">Page owns data + Provider</text><line x1=\"450\" y1=\"122\" x2=\"450\" y2=\"240\" stroke=\"#34d399\" stroke-width=\"1.5\" stroke-dasharray=\"4\" marker-end=\"url(#arrP)\"/><rect x=\"385\" y=\"140\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"160\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"middle\">Section (no props needed)</text><rect x=\"385\" y=\"190\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"210\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"middle\">Card (no props needed)</text><rect x=\"385\" y=\"240\" width=\"260\" height=\"32\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"515\" y=\"260\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">Button (uses useContext directly)</text></svg>",
  "codeExamples": [
    {
      "title": "Prop Drilling Example",
      "useCase": "Demonstrating the problem",
      "code": "function Page() {\n  const [user, setUser] = useState(null);\n  return <MainSection user={user} setUser={setUser} />;\n}\nfunction MainSection({ user, setUser }) {\n  return <ContentCard user={user} setUser={setUser} />;\n}\nfunction ContentCard({ user, setUser }) {\n  return <UserButton user={user} setUser={setUser} />;\n}\nfunction UserButton({ user, setUser }) {\n  return <button onClick={() => setUser({ name: 'Alice' })}>{user?.name}</button>;\n}",
      "description": "MainSection and ContentCard don't use user/setUser - they only forward props. This is prop drilling."
    },
    {
      "title": "Context API Fix",
      "useCase": "Eliminating drilling",
      "code": "const UserContext = createContext();\nfunction Page() {\n  const [user, setUser] = useState(null);\n  return (\n    <UserContext.Provider value={{ user, setUser }}>\n      <MainSection />\n    </UserContext.Provider>\n  );\n}\nfunction MainSection() { return <ContentCard />; }\nfunction ContentCard() { return <UserButton />; }\nfunction UserButton() {\n  const { user, setUser } = useContext(UserContext);\n  return <button onClick={() => setUser({ name: 'Alice' })}>{user?.name}</button>;\n}",
      "description": "Context provides user/setUser to any descendant. MainSection and ContentCard are clean - no props to forward."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is prop drilling?",
      "options": [
        "Optimizing props",
        "Passing props through unused intermediates",
        "Creating new props",
        "Validating props"
      ],
      "answer": 1,
      "explanation": "Props pass through components that don't use them."
    },
    {
      "question": "Why is prop drilling problematic?",
      "options": [
        "Faster performance",
        "Tight coupling and hard refactoring",
        "Better reusability",
        "Simpler code"
      ],
      "answer": 1,
      "explanation": "Causes coupling and refactoring burden."
    },
    {
      "question": "How does Context API solve it?",
      "options": [
        "By providing values directly to descendants",
        "By removing all props",
        "By using global variables",
        "By caching requests"
      ],
      "answer": 0,
      "explanation": "Provider makes value available to any descendant."
    },
    {
      "question": "What is component composition?",
      "options": [
        "Passing JSX as children instead of drilling props through layers",
        "Merging components",
        "Creating HOCs",
        "Using render props"
      ],
      "answer": 0,
      "explanation": "Parent provides rendered content directly."
    },
    {
      "question": "When is prop drilling acceptable?",
      "options": [
        "For deeply nested components",
        "For shallow hierarchies during prototyping",
        "Always",
        "Never"
      ],
      "answer": 1,
      "explanation": "Acceptable for shallow or temporary code."
    },
    {
      "question": "How to identify prop drilling?",
      "options": [
        "Components using all props",
        "Components accepting props they don't use",
        "Components with no props",
        "Components with useRef"
      ],
      "answer": 1,
      "explanation": "Look for unused intermediate props."
    }
  ]
};

TOPICS_DATA["react"]["react-context-api"] = {
  "id": "react-context-api",
  "title": "React Context API",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Context API provides a way to share values across the component tree without prop drilling.",
    "createContext creates a context object. Provider makes the value available. useContext (or Consumer) reads it.",
    "Context is designed for shared global data: theme, user auth, locale, UI state.",
    "Context triggers re-render in all consumers when the value changes."
  ],
  "laymanDefinition": "Context API is like a radio broadcast tower. The Provider is the transmitter broadcasting a signal (the value). Any radio (component) within range can tune in (useContext) and hear the broadcast without needing a direct wire from the broadcast studio. Components between the tower and the radio don't need to relay the signal.",
  "deepDive": [
    {
      "heading": "createContext and Provider",
      "text": "createContext(defaultValue) creates a context object. The Provider component wraps a subtree and accepts a value prop. All descendants can access this value via useContext or Context.Consumer."
    },
    {
      "heading": "useContext Hook",
      "text": "useContext(MyContext) returns the current context value. It's the modern way to consume context in functional components. The component re-renders when the context value changes."
    },
    {
      "heading": "When to Use Context",
      "text": "Theme (light/dark), user authentication state, locale/language, UI state (sidebar open/close), feature flags. NOT for data that changes frequently at high volume (use Redux or Zustand instead)."
    },
    {
      "heading": "Performance Considerations",
      "text": "Context re-renders ALL consumers when the value changes, even if they only read a subset. Split contexts to avoid unnecessary re-renders: separate ThemeContext from UserContext from LocaleContext."
    },
    {
      "heading": "Context vs State Management",
      "text": "Context is not a state management tool - it's a dependency injection mechanism. You still need useState or useReducer to manage the value. Redux/Zustand provide managed stores with selectors to avoid unnecessary re-renders."
    }
  ],
  "interviewAnswer": "React Context API enables sharing values across the component tree without prop drilling. createContext creates a context, Provider supplies the value, and useContext reads it in any descendant. Context is ideal for global data like theme, auth, and locale that doesn't change at high frequency. For frequently changing data, use state management with selector-based subscriptions to avoid re-rendering all consumers.",
  "interviewQuestions": [
    {
      "question": "What is Context API?",
      "answer": "A React feature for sharing values across the component tree without passing props through intermediate components."
    },
    {
      "question": "What are the three parts of Context?",
      "answer": "createContext (creates context), Provider (supplies value), useContext/Consumer (reads value)."
    },
    {
      "question": "When should you use Context?",
      "answer": "Global data that many components need: theme, auth, locale, UI state. Not for frequently changing data."
    },
    {
      "question": "How does useContext work?",
      "answer": "const value = useContext(MyContext). Returns the current context value. Component re-renders on value change."
    },
    {
      "question": "What happens when context value changes?",
      "answer": "All consumers (components using useContext) re-render. React does not skip consumers even if they use part of the value."
    },
    {
      "question": "How to optimize context performance?",
      "answer": "Split contexts by concern (ThemeContext, UserContext). Use useMemo for the value object to prevent unnecessary re-renders."
    },
    {
      "question": "Is Context a state management solution?",
      "answer": "No - it's dependency injection. You pair it with useState/useReducer to provide state. Redux has selectors to prevent unnecessary re-renders."
    },
    {
      "question": "What is the defaultValue parameter?",
      "answer": "The value used when a component reads context outside of a Provider. Useful for testing or optional contexts."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrCtx\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"400\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Context API Architecture</text><rect x=\"150\" y=\"55\" width=\"400\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"350\" y=\"78\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Provider: &lt;ThemeContext.Provider value={theme}&gt;</text><rect x=\"50\" y=\"125\" width=\"600\" height=\"80\" rx=\"6\" fill=\"#1a1d28\" stroke=\"var(--border)\"/><text x=\"350\" y=\"148\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"middle\">Intermediate Components (no props needed)</text><rect x=\"65\" y=\"158\" width=\"130\" height=\"36\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"130\" y=\"180\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Header</text><rect x=\"215\" y=\"158\" width=\"130\" height=\"36\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"280\" y=\"180\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Sidebar</text><rect x=\"365\" y=\"158\" width=\"130\" height=\"36\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"430\" y=\"180\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Main</text><rect x=\"515\" y=\"158\" width=\"130\" height=\"36\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"580\" y=\"180\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Footer</text><line x1=\"350\" y1=\"205\" x2=\"350\" y2=\"240\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrCtx)\"/><rect x=\"50\" y=\"240\" width=\"600\" height=\"90\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"263\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Consumers (useContext access Provider value)</text><rect x=\"65\" y=\"275\" width=\"250\" height=\"40\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"190\" y=\"297\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\" text-anchor=\"middle\">const theme = useContext(ThemeContext)</text><rect x=\"385\" y=\"275\" width=\"250\" height=\"40\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"510\" y=\"297\" fill=\"#e8eaed\" font-size=\"10\" font-family=\"monospace\" text-anchor=\"middle\">&lt;ThemeContext.Consumer&gt;{...}</text><rect x=\"200\" y=\"355\" width=\"300\" height=\"35\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#e5c07b\" stroke-width=\"1\"/><text x=\"350\" y=\"378\" fill=\"#e5c07b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Value change re-renders ALL consumers</text></svg>",
  "codeExamples": [
    {
      "title": "Theme Context with Toggle",
      "useCase": "Global theme switching",
      "code": "const ThemeContext = createContext('light');\n\nfunction App() {\n  const [theme, setTheme] = useState('light');\n  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');\n\n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      <Page />\n    </ThemeContext.Provider>\n  );\n}\nfunction ThemedButton() {\n  const { theme, toggleTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={toggleTheme}\n      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>\n      Current: {theme}\n    </button>\n  );\n}",
      "description": "App owns theme state and provides it via context. ThemedButton reads and toggles theme without prop drilling."
    },
    {
      "title": "Multiple Contexts for Separation",
      "useCase": "Avoiding unnecessary re-renders",
      "code": "const UserContext = createContext(null);\nconst ThemeContext = createContext('light');\n\nfunction App() {\n  const [user, setUser] = useState(null);\n  const [theme, setTheme] = useState('light');\n\n  return (\n    <ThemeContext.Provider value={theme}>\n      <UserContext.Provider value={{ user, setUser }}>\n        <Dashboard />\n      </UserContext.Provider>\n    </ThemeContext.Provider>\n  );\n}\nfunction ThemeToggle() {\n  const theme = useContext(ThemeContext); // only re-renders when theme changes\n  return <button className={theme}>Toggle</button>;\n}\nfunction UserAvatar() {\n  const { user } = useContext(UserContext); // only re-renders when user changes\n  return <span>{user?.name}</span>;\n}",
      "description": "Separate contexts prevent components from re-rendering when unrelated state changes. ThemeToggle won't re-render when user changes."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does Context API solve?",
      "options": [
        "Styling issues",
        "Prop drilling",
        "Performance",
        "Bundle size"
      ],
      "answer": 1,
      "explanation": "Context eliminates prop drilling."
    },
    {
      "question": "What are the three parts of Context?",
      "options": [
        "State, props, children",
        "createContext, Provider, useContext",
        "Component, Element, Instance",
        "Store, reducer, dispatch"
      ],
      "answer": 1,
      "explanation": "createContext, Provider, useContext."
    },
    {
      "question": "When to use Context?",
      "options": [
        "Theme, auth, locale",
        "Local form state",
        "Input validation",
        "Animation state"
      ],
      "answer": 0,
      "explanation": "Context is for global shared values."
    },
    {
      "question": "What happens when context value changes?",
      "options": [
        "Nothing",
        "All consumers re-render",
        "Only Provider re-renders",
        "Only first consumer re-renders"
      ],
      "answer": 1,
      "explanation": "All consumers re-render on value change."
    },
    {
      "question": "How to optimize context performance?",
      "options": [
        "Use one big context",
        "Split contexts by concern",
        "Don't use context at all",
        "Use useReducer"
      ],
      "answer": 1,
      "explanation": "Split into multiple small contexts."
    },
    {
      "question": "Is Context a state management solution?",
      "options": [
        "Yes",
        "No - it's dependency injection with useState/useReducer",
        "Only with Redux",
        "Only for classes"
      ],
      "answer": 1,
      "explanation": "Context is dependency injection, not state management."
    }
  ]
};

TOPICS_DATA["react"]["react-redux"] = {
  "id": "react-redux",
  "title": "React Redux",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Redux is a predictable state container with a single store, actions, and reducers.",
    "The store holds the entire app state as a plain JS object. Actions are dispatched to trigger state changes.",
    "Reducers are pure functions that take current state and an action, and return the new state.",
    "React-Redux provides useSelector to read state and useDispatch to dispatch actions."
  ],
  "laymanDefinition": "Redux is like a bank vault. The vault (store) contains all the money (state). To get money, you fill out a withdrawal form (action) and hand it to the teller (dispatch). The teller follows the bank's rules (reducer) to update the vault. Any bank branch (component) can submit forms and see the vault balance, but no one can just grab money from the vault directly.",
  "deepDive": [
    {
      "heading": "The Three Principles",
      "text": "1. Single source of truth: one store for entire app state. 2. State is read-only: only changed by dispatching actions. 3. Changes are made by pure functions (reducers): given current state and action, return new state."
    },
    {
      "heading": "Actions and Action Creators",
      "text": "Action: a plain object with a type property (string) and optional payload: { type: 'INCREMENT', payload: 1 }. Action creators are functions that return action objects, making actions reusable and testable."
    },
    {
      "heading": "Reducers",
      "text": "Pure functions: (state, action) => newState. Never mutate state - return new objects. Use switch statements on action.type. Combine multiple reducers via combineReducers."
    },
    {
      "heading": "React-Redux Hooks",
      "text": "useSelector(selectorFn) - subscribes to store, returns selected state slice. useDispatch() - returns dispatch function. Components re-render only when their selected state changes."
    },
    {
      "heading": "Middleware (Redux Thunk)",
      "text": "Middleware intercepts dispatched actions before they reach the reducer. Redux Thunk enables async actions: action creators return a function (instead of an object) that receives dispatch and can dispatch multiple actions (like REQUEST, SUCCESS, FAILURE)."
    }
  ],
  "interviewAnswer": "Redux is a predictable state management library with a single store, immutable state updates via pure reducers, and action-based state changes. React-Redux connects React components via useSelector (read state) and useDispatch (dispatch actions). Reducers must be pure. Async operations use middleware like Redux Thunk. DevTools enable time-travel debugging.",
  "interviewQuestions": [
    {
      "question": "What are the three principles of Redux?",
      "answer": "1. Single source of truth (one store). 2. State is read-only (actions only). 3. Changes via pure functions (reducers)."
    },
    {
      "question": "What is an action?",
      "answer": "A plain JS object with a type property (string) and optional payload describing what changed."
    },
    {
      "question": "What is a reducer?",
      "answer": "A pure function (state, action) => newState. Never mutates state, always returns a new object."
    },
    {
      "question": "How does useSelector work?",
      "answer": "Takes a selector function that extracts data from the store. Component re-renders only when the selected value changes."
    },
    {
      "question": "What is middleware?",
      "answer": "Intercepts dispatches before they reach the reducer. Thunk enables async actions returning functions."
    },
    {
      "question": "Why must reducers be pure?",
      "answer": "Predictability: same input always produces same output. Enables time-travel debugging and easy testing."
    },
    {
      "question": "What is combineReducers?",
      "answer": "Utility that combines multiple reducer functions into a single reducer, each managing its own slice of state."
    },
    {
      "question": "How does Redux handle async operations?",
      "answer": "Via middleware (Thunk/Saga). Thunk: action creator returns (dispatch) => { fetch().then(dispatch) }."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrRx\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Redux Data Flow</text><rect x=\"40\" y=\"55\" width=\"180\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"130\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">React Component</text><text x=\"130\" y=\"95\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">useSelector + useDispatch</text><line x1=\"220\" y1=\"85\" x2=\"290\" y2=\"65\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrRx)\"/><text x=\"255\" y=\"58\" fill=\"#f87171\" font-size=\"9\" text-anchor=\"middle\">dispatch(action)</text><line x1=\"220\" y1=\"85\" x2=\"290\" y2=\"105\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrRx)\"/><text x=\"255\" y=\"118\" fill=\"#6c9fff\" font-size=\"9\" text-anchor=\"middle\">state via selector</text><rect x=\"290\" y=\"55\" width=\"180\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"380\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Action</text><text x=\"380\" y=\"95\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">{ type, payload }</text><line x1=\"470\" y1=\"85\" x2=\"540\" y2=\"85\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrRx)\"/><rect x=\"540\" y=\"55\" width=\"120\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"600\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Reducer</text><text x=\"600\" y=\"95\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">(state, action)</text><line x1=\"600\" y1=\"115\" x2=\"600\" y2=\"165\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrRx)\"/><rect x=\"250\" y=\"165\" width=\"200\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"188\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Store</text><text x=\"350\" y=\"205\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Single state tree</text><line x1=\"350\" y1=\"225\" x2=\"130\" y2=\"275\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrRx)\"/><text x=\"240\" y=\"260\" fill=\"#6c9fff\" font-size=\"9\" text-anchor=\"middle\">Updated state flows back to component</text><rect x=\"40\" y=\"275\" width=\"180\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"130\" y=\"298\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component Re-renders</text><text x=\"130\" y=\"315\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Unidirectional data flow</text></svg>",
  "codeExamples": [
    {
      "title": "Redux Counter Example",
      "useCase": "Basic Redux setup",
      "code": "// Action types\nconst INCREMENT = 'INCREMENT';\nconst DECREMENT = 'DECREMENT';\n\n// Action creators\nconst increment = (amount) => ({ type: INCREMENT, payload: amount });\nconst decrement = (amount) => ({ type: DECREMENT, payload: amount });\n\n// Reducer\nfunction counterReducer(state = { count: 0 }, action) {\n  switch (action.type) {\n    case INCREMENT: return { ...state, count: state.count + action.payload };\n    case DECREMENT: return { ...state, count: state.count - action.payload };\n    default: return state;\n  }\n}\n\n// Store\nconst store = createStore(counterReducer);\n\n// Component\nfunction Counter() {\n  const count = useSelector(state => state.count);\n  const dispatch = useDispatch();\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => dispatch(increment(1))}>+</button>\n      <button onClick={() => dispatch(decrement(1))}>-</button>\n    </div>\n  );\n}",
      "description": "Component reads state via useSelector and dispatches actions via useDispatch. Reducer returns new state immutably."
    },
    {
      "title": "Async Thunk Action",
      "useCase": "API data fetching with Redux",
      "code": "// Thunk action creator\nfunction fetchUser(id) {\n  return async (dispatch) => {\n    dispatch({ type: 'FETCH_USER_REQUEST' });\n    try {\n      const res = await fetch('/api/users/' + id);\n      const data = await res.json();\n      dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });\n    } catch (err) {\n      dispatch({ type: 'FETCH_USER_FAILURE', payload: err.message });\n    }\n  };\n}\n\n// Component\nfunction UserProfile({ userId }) {\n  const dispatch = useDispatch();\n  const { user, loading, error } = useSelector(state => state.user);\n\n  useEffect(() => { dispatch(fetchUser(userId)); }, [userId]);\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  return <div>{user.name}</div>;\n}",
      "description": "Thunk middleware enables async actions. The thunk dispatches REQUEST, then SUCCESS or FAILURE based on fetch outcome."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What are the three Redux principles?",
      "options": [
        "Store, component, props",
        "Single store, read-only state, pure reducers",
        "Actions, effects, selectors",
        "Provider, consumer, context"
      ],
      "answer": 1,
      "explanation": "One store, immutable actions, pure reducers."
    },
    {
      "question": "What is an action?",
      "options": [
        "A function",
        "A plain object with type",
        "A reducer",
        "A component"
      ],
      "answer": 1,
      "explanation": "Action is a plain object with type."
    },
    {
      "question": "What does a reducer return?",
      "options": [
        "Mutated state",
        "New state object",
        "Old state",
        "undefined"
      ],
      "answer": 1,
      "explanation": "Reducer returns new state object."
    },
    {
      "question": "How does useSelector work?",
      "options": [
        "Directly returns store state",
        "Takes selector, returns selected slice, triggers re-render on change",
        "Dispatch action",
        "Create store"
      ],
      "answer": 1,
      "explanation": "Selector extracts and subscribes to state slice."
    },
    {
      "question": "What does middleware do?",
      "options": [
        "Intercepts dispatches",
        "Creates store",
        "Renders components",
        "Manages props"
      ],
      "answer": 0,
      "explanation": "Middleware intercepts before reducer."
    },
    {
      "question": "Why must reducers be pure?",
      "options": [
        "Performance",
        "Predictability and testability",
        "Bundle size",
        "Security"
      ],
      "answer": 1,
      "explanation": "Pure functions enable predictable state and debugging."
    }
  ]
};

TOPICS_DATA["react"]["react-redux-toolkit"] = {
  "id": "react-redux-toolkit",
  "title": "React Redux Toolkit",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Redux Toolkit (RTK) is the official, opinionated way to write Redux logic, reducing boilerplate significantly.",
    "RTK provides configureStore, createSlice, createAsyncThunk, and createSelector utilities.",
    "createSlice generates actions and reducers automatically from a 'slice' definition.",
    "RTK includes Redux Thunk and Redux DevTools by default."
  ],
  "laymanDefinition": "Redux Toolkit is like a meal prep kit vs cooking from scratch. With plain Redux, you buy individual ingredients, chop, season, and cook everything separately. With RTK, you get pre-portioned ingredients with recipe cards (createSlice) - you still cook, but much faster and with less cleanup. The result is the same meal, but RTK eliminates the tedious parts.",
  "deepDive": [
    {
      "heading": "configureStore",
      "text": "Replaces createStore with sensible defaults: combines reducers, adds middleware (Thunk by default), enables DevTools. Single call sets up the entire store: configureStore({ reducer: { counter: counterSlice.reducer } })."
    },
    {
      "heading": "createSlice",
      "text": "Takes a name, initial state, and reducers object (key-value pairs of functions). Generates action creators and reducer automatically. reducers: { increment(state) { state.value += 1 } } - uses Immer for mutable-style syntax (immutable under the hood)."
    },
    {
      "heading": "createAsyncThunk",
      "text": "Generates action types (pending/fulfilled/rejected) for async operations. Takes a type string and async function returning a promise. The reducer handles extraReducers for these action types."
    },
    {
      "heading": "createEntityAdapter",
      "text": "Utility for normalized state: provides CRUD reducers and selectors for entity collections. Manages IDs array and entities map with operations like addOne, updateOne, removeOne."
    }
  ],
  "interviewAnswer": "Redux Toolkit (RTK) is the official Redux package that eliminates boilerplate. configureStore sets up the store with defaults. createSlice generates reducers and actions with Immer-powered immutable updates. createAsyncThunk simplifies async action patterns. RTK includes Thunk, DevTools, and middleware by default, making Redux development significantly faster and less error-prone.",
  "interviewQuestions": [
    {
      "question": "What is Redux Toolkit?",
      "answer": "The official, opinionated Redux package that reduces boilerplate. Includes configureStore, createSlice, createAsyncThunk."
    },
    {
      "question": "How does createSlice work?",
      "answer": "Takes name, initialState, reducers. Generates action creators and reducer. Uses Immer for mutable update syntax."
    },
    {
      "question": "What is configureStore?",
      "answer": "Replaces createStore. Combines reducers, adds Thunk middleware, enables DevTools, all with sensible defaults."
    },
    {
      "question": "What is createAsyncThunk?",
      "answer": "Generates pending/fulfilled/rejected action types for async operations. Handles loading states automatically."
    },
    {
      "question": "How does Immer work in RTK?",
      "answer": "Allows writing mutable update syntax (state.value += 1) in reducers. Immer converts it to immutable updates under the hood."
    },
    {
      "question": "What is createEntityAdapter?",
      "answer": "Manages normalized entity state: stores IDs + entities map. Provides built-in CRUD reducers and selectors."
    },
    {
      "question": "Does RTK replace Redux?",
      "answer": "RTK is Redux - it's the recommended way to write Redux logic. It wraps Redux core with utilities."
    },
    {
      "question": "What does createSelector do?",
      "answer": "Creates memoized selector functions that only recompute when inputs change. Optimizes useSelector performance."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrRTK\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Redux Toolkit Architecture</text><rect x=\"40\" y=\"55\" width=\"620\" height=\"100\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">configureStore</text><rect x=\"55\" y=\"90\" width=\"290\" height=\"50\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"200\" y=\"108\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">createSlice</text><text x=\"200\" y=\"125\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Generates actions + reducers</text><rect x=\"355\" y=\"90\" width=\"290\" height=\"50\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"500\" y=\"108\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">createAsyncThunk</text><text x=\"500\" y=\"125\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Pending/fulfilled/rejected</text><line x1=\"350\" y1=\"155\" x2=\"350\" y2=\"185\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrRTK)\"/><rect x=\"40\" y=\"185\" width=\"620\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"208\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Immer-powered reducers (mutable syntax, immutable output)</text><text x=\"350\" y=\"228\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">state.counter.value += 1 → produces new immutable state</text><line x1=\"350\" y1=\"245\" x2=\"350\" y2=\"272\" stroke=\"#e5c07b\" stroke-width=\"2\" marker-end=\"url(#arrRTK)\"/><rect x=\"40\" y=\"272\" width=\"620\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"292\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Built-in: Redux Thunk + DevTools + Middleware</text><text x=\"350\" y=\"312\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Zero-config setup, no manual middleware wiring</text></svg>",
  "codeExamples": [
    {
      "title": "Counter with Redux Toolkit",
      "useCase": "RTK basics",
      "code": "import { createSlice, configureStore } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; },\n    decrement: (state) => { state.value -= 1; },\n    incrementByAmount: (state, action) => { state.value += action.payload; },\n  },\n});\n\nexport const { increment, decrement, incrementByAmount } = counterSlice.actions;\n\nconst store = configureStore({ reducer: { counter: counterSlice.reducer } });\n\n// Component\nfunction Counter() {\n  const value = useSelector(state => state.counter.value);\n  const dispatch = useDispatch();\n  return (\n    <div>\n      <span>{value}</span>\n      <button onClick={() => dispatch(increment())}>+</button>\n      <button onClick={() => dispatch(decrement())}>-</button>\n      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>\n    </div>\n  );\n}",
      "description": "createSlice generates actions (increment, decrement, incrementByAmount) and reducer. configureStore sets up the store. Immer lets state.value += 1 work immutably."
    },
    {
      "title": "Async Thunk with createAsyncThunk",
      "useCase": "API data fetching",
      "code": "import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';\n\nexport const fetchUsers = createAsyncThunk(\n  'users/fetchAll',\n  async () => { const res = await fetch('/api/users'); return res.json(); }\n);\n\nconst usersSlice = createSlice({\n  name: 'users',\n  initialState: { items: [], loading: false, error: null },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchUsers.pending, (state) => { state.loading = true; })\n      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })\n      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });\n  },\n});\n\n// Component\nfunction UserList() {\n  const dispatch = useDispatch();\n  const { items, loading } = useSelector(state => state.users);\n  useEffect(() => { dispatch(fetchUsers()); }, []);\n  if (loading) return <div>Loading...</div>;\n  return <ul>{items.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
      "description": "createAsyncThunk automatically dispatches pending/fulfilled/rejected actions. extraReducers handles them with Immer syntax."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is Redux Toolkit?",
      "options": [
        "Alternative to Redux",
        "Official Redux with less boilerplate",
        "State management for Vue",
        "React Router"
      ],
      "answer": 1,
      "explanation": "RTK is the official Redux package reducing boilerplate."
    },
    {
      "question": "What does createSlice generate?",
      "options": [
        "Actions and reducers automatically",
        "Just reducers",
        "Just actions",
        "Middleware"
      ],
      "answer": 0,
      "explanation": "Generates both actions and reducers."
    },
    {
      "question": "How does Immer enable mutable syntax?",
      "options": [
        "It mutates state directly",
        "Converts mutable syntax to immutable updates",
        "Skips immutability",
        "Creates copies manually"
      ],
      "answer": 1,
      "explanation": "Immer translates mutable code to immutable state."
    },
    {
      "question": "What does configureStore include by default?",
      "options": [
        "Nothing",
        "Thunk middleware and DevTools",
        "Redux Saga",
        "React Router"
      ],
      "answer": 1,
      "explanation": "configureStore includes Thunk and DevTools."
    },
    {
      "question": "What is createAsyncThunk for?",
      "options": [
        "Synchronous actions",
        "Async operations with auto-generated pending/fulfilled/rejected",
        "Creating slices",
        "Combining reducers"
      ],
      "answer": 1,
      "explanation": "Simplifies async action patterns."
    },
    {
      "question": "What is createEntityAdapter?",
      "options": [
        "Manages normalized entity state with CRUD helpers",
        "Creates slices",
        "Configures store",
        "Handles routing"
      ],
      "answer": 0,
      "explanation": "Provides CRUD reducers and selectors for entities."
    }
  ]
};

TOPICS_DATA["react"]["react-react-query"] = {
  "id": "react-react-query",
  "title": "React React Query",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "React Query (TanStack Query) is a server-state management library for fetching, caching, and synchronizing async data.",
    "It manages caching, background refetching, pagination, and optimistic updates automatically.",
    "Queries use useQuery(key, fetcher). Mutations use useMutation for creating/updating/deleting data.",
    "React Query eliminates the need for global state management for server data (no Redux for API data)."
  ],
  "laymanDefinition": "React Query is like having a personal assistant for fetching data. You tell the assistant 'I need user data' (useQuery), and the assistant: 1) checks if it's already in the filing cabinet (cache), 2) if not, goes to get it (fetch), 3) keeps it updated when stale (background refetch), 4) shows you the latest version, and 5) handles errors and loading states. You don't micromanage the fetching process - the assistant handles it all.",
  "deepDive": [
    {
      "heading": "Queries with useQuery",
      "text": "useQuery(queryKey, fetcherFn, options). queryKey uniquely identifies the query (used for caching). fetcherFn returns a Promise resolving to data. Options: staleTime (how long until data is stale), cacheTime (how long to keep unused data), refetchInterval (auto-polling)."
    },
    {
      "heading": "Mutations with useMutation",
      "text": "useMutation(fetcherFn, options) for creating, updating, deleting. onMutate (optimistic update), onSuccess, onError, onSettled callbacks. Use queryClient.invalidateQueries to refetch related queries after mutation."
    },
    {
      "heading": "Caching and Staleness",
      "text": "Data is cached by queryKey. Stale data is shown immediately while background refetch happens. staleTime controls staleness. cacheTime controls garbage collection of unused cache entries. refetchOnWindowFocus refetches when user returns to tab."
    },
    {
      "heading": "Why Not Redux for Server State?",
      "text": "Server state is async, has stale-while-revalidate semantics, needs background refetching, pagination, and optimistic updates. Redux requires manual handling of all these. React Query automates them with 50 lines vs 200+ lines of Redux boilerplate."
    }
  ],
  "interviewAnswer": "React Query (TanStack Query) is a server-state management library that handles caching, background refetching, pagination, and optimistic updates. useQuery fetches and caches data. useMutation modifies server data with automatic cache invalidation. It eliminates the need to store API data in Redux, handling loading/error states, stale-while-revalidate caching, and window refocus refetching automatically.",
  "interviewQuestions": [
    {
      "question": "What is React Query?",
      "answer": "A server-state management library for fetching, caching, and synchronizing async data with automatic background updates."
    },
    {
      "question": "How does useQuery work?",
      "answer": "useQuery(['key'], fetchFn) returns { data, isLoading, error }. Caches by key. Refetches when key changes or data becomes stale."
    },
    {
      "question": "What is staleTime and cacheTime?",
      "answer": "staleTime: how long until data is considered stale (refetch on next read). cacheTime: how long to keep unused data in cache before garbage collection."
    },
    {
      "question": "How do mutations work?",
      "answer": "useMutation(mutationFn) with onMutate (optimistic), onSuccess (invalidate queries), onError (rollback). Returns mutate function."
    },
    {
      "question": "How to invalidate queries after mutation?",
      "answer": "queryClient.invalidateQueries(['key']) marks cached queries as stale and triggers refetch. Usually in mutation's onSuccess."
    },
    {
      "question": "What is optimistic update?",
      "answer": "Immediately update the cache before the server responds. If server fails, rollback to previous state using onError callback."
    },
    {
      "question": "How does refetchOnWindowFocus work?",
      "answer": "When user returns to the browser tab, React Query refetches stale queries to show latest data. Configurable per query or globally."
    },
    {
      "question": "Why prefer React Query over Redux for API data?",
      "answer": "Less boilerplate, automatic caching/refetching, loading/error states, pagination, polling, optimistic updates built-in."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrRQ\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"400\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Query Data Flow</text><rect x=\"40\" y=\"55\" width=\"180\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"130\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">React Component</text><text x=\"130\" y=\"95\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">useQuery / useMutation</text><line x1=\"220\" y1=\"85\" x2=\"280\" y2=\"115\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrRQ)\"/><rect x=\"280\" y=\"85\" width=\"180\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"370\" y=\"108\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Cache (by queryKey)</text><text x=\"370\" y=\"125\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Stale/active cache entries</text><line x1=\"460\" y1=\"115\" x2=\"520\" y2=\"85\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrRQ)\"/><text x=\"490\" y=\"78\" fill=\"#f87171\" font-size=\"9\" text-anchor=\"middle\">cache miss / stale</text><line x1=\"460\" y1=\"115\" x2=\"520\" y2=\"145\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrRQ)\"/><text x=\"500\" y=\"155\" fill=\"#34d399\" font-size=\"9\" text-anchor=\"middle\">cache hit</text><rect x=\"520\" y=\"55\" width=\"140\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"590\" y=\"78\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Fetcher</text><text x=\"590\" y=\"95\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">fetch / axios</text><line x1=\"590\" y1=\"115\" x2=\"590\" y2=\"165\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrRQ)\"/><rect x=\"520\" y=\"165\" width=\"140\" height=\"40\" rx=\"6\" fill=\"#2a2f45\"/><text x=\"590\" y=\"190\" fill=\"#e8eaed\" font-size=\"11\" text-anchor=\"middle\">API Server</text><path d=\"M590 205 Q590 250 370 250 L370 145\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\" marker-end=\"url(#arrRQ)\"/><text x=\"470\" y=\"240\" fill=\"#34d399\" font-size=\"9\" text-anchor=\"middle\">data stored in cache</text><path d=\"M130 115 L130 250 L280 250\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\" marker-end=\"url(#arrRQ)\"/><text x=\"200\" y=\"240\" fill=\"#fbbf24\" font-size=\"9\" text-anchor=\"middle\">data returned to component</text><rect x=\"280\" y=\"250\" width=\"180\" height=\"40\" rx=\"6\" fill=\"#2a2f45\" stroke=\"#e5c07b\" stroke-width=\"1\"/><text x=\"370\" y=\"275\" fill=\"#e5c07b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Background refetch on stale</text></svg>",
  "codeExamples": [
    {
      "title": "useQuery for User Data",
      "useCase": "Fetch with caching",
      "code": "import { useQuery } from '@tanstack/react-query';\n\nfunction UserProfile({ userId }) {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['user', userId],\n    queryFn: () => fetch('/api/users/' + userId).then(r => r.json()),\n    staleTime: 5 * 60 * 1000, // 5 min before refetch\n    retry: 2, // retry twice on failure\n  });\n\n  if (isLoading) return <div>Loading user...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n  return (\n    <div>\n      <h2>{data.name}</h2>\n      <p>{data.email}</p>\n    </div>\n  );\n}",
      "description": "Query is cached by ['user', userId]. StaleTime=5min prevents unnecessary refetches. isLoading/error handled automatically."
    },
    {
      "title": "Mutation with Optimistic Update",
      "useCase": "Updating data with instant UI feedback",
      "code": "import { useMutation, useQueryClient } from '@tanstack/react-query';\n\nfunction TodoItem({ todo }) {\n  const queryClient = useQueryClient();\n\n  const toggleMutation = useMutation({\n    mutationFn: () => fetch('/api/todos/' + todo.id, {\n      method: 'PATCH',\n      body: JSON.stringify({ done: !todo.done })\n    }),\n    onMutate: async () => {\n      // Cancel outgoing refetches\n      await queryClient.cancelQueries(['todos']);\n      // Snapshot previous value\n      const previous = queryClient.getQueryData(['todos']);\n      // Optimistically update\n      queryClient.setQueryData(['todos'], (old) =>\n        old.map(t => t.id === todo.id ? { ...t, done: !t.done } : t)\n      );\n      return { previous };\n    },\n    onError: (err, vars, context) => {\n      // Rollback on error\n      queryClient.setQueryData(['todos'], context.previous);\n    },\n    onSettled: () => {\n      // Refetch to ensure server matches\n      queryClient.invalidateQueries(['todos']);\n    },\n  });\n\n  return <li><input type=\"checkbox\" checked={todo.done} onChange={() => toggleMutation.mutate()} />{todo.text}</li>;\n}",
      "description": "Optimistic update: UI updates instantly. If server fails, rollback to previous state. onSettled refetches to ensure sync."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is React Query for?",
      "options": [
        "CSS styling",
        "Server-state fetching and caching",
        "Component state management",
        "Routing"
      ],
      "answer": 1,
      "explanation": "React Query handles server-state caching and fetching."
    },
    {
      "question": "What does useQuery return?",
      "options": [
        "{ data, isLoading, error }",
        "{ state, dispatch }",
        "{ value, setValue }",
        "{ ref, current }"
      ],
      "answer": 0,
      "explanation": "Returns data, loading, and error states."
    },
    {
      "question": "What is staleTime?",
      "options": [
        "Time until cache garbage collected",
        "Time until data considered stale (needs refetch)",
        "Time between retries",
        "Mutation timeout"
      ],
      "answer": 1,
      "explanation": "Data is considered stale after staleTime."
    },
    {
      "question": "How to refetch after mutation?",
      "options": [
        "Manually call fetch()",
        "queryClient.invalidateQueries()",
        "Refresh the page",
        "Re-mount component"
      ],
      "answer": 1,
      "explanation": "Invalidate queries to trigger refetch."
    },
    {
      "question": "What is optimistic update?",
      "options": [
        "Pessimistic assumption",
        "Immediately update cache before server responds",
        "Skip server update",
        "Cache only"
      ],
      "answer": 1,
      "explanation": "Optimistic update shows result instantly."
    },
    {
      "question": "Why React Query over Redux for API?",
      "options": [
        "More boilerplate",
        "Automatic caching and refetching built-in",
        "Better for UI state",
        "Faster rendering"
      ],
      "answer": 1,
      "explanation": "Less code, automatic features."
    }
  ]
};

TOPICS_DATA["react"]["react-custom-hooks"] = {
  "id": "react-custom-hooks",
  "title": "React Custom Hooks",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Custom hooks are JavaScript functions that use React hooks and start with 'use' (convention).",
    "They extract reusable stateful logic from components, enabling composition without changing component hierarchy.",
    "Custom hooks can call other hooks (built-in or custom) and return any value (state, functions, or JSX).",
    "They are the primary replacement for HOCs and render props patterns."
  ],
  "laymanDefinition": "Custom hooks are like specialized kitchen appliances. Instead of chopping vegetables by hand in every recipe (repeating logic in every component), you buy a food processor (custom hook). Every time a recipe needs chopped vegetables, you use the food processor. The processor does its job independently, and you can use it in any recipe without changing how your kitchen works.",
  "deepDive": [
    {
      "heading": "What Are Custom Hooks?",
      "text": "Functions that start with 'use' and may call other hooks. They encapsulate reusable stateful logic. Unlike HOCs or render props, custom hooks don't change your component hierarchy - they just return values your component can use."
    },
    {
      "heading": "Rules of Custom Hooks",
      "text": "1. Name must start with 'use' (linting rule). 2. Can call other hooks (built-in or custom). 3. Follow the Rules of Hooks: only call hooks at top level, only from React functions or custom hooks. 4. Should be composable - one hook can call another."
    },
    {
      "heading": "Common Use Cases",
      "text": "Form handling (useForm), window resize listener (useWindowSize), local storage sync (useLocalStorage), debounced search (useDebounce), online status (useOnlineStatus), fetch abstraction (useFetch)."
    },
    {
      "heading": "Custom Hooks vs HOCs vs Render Props",
      "text": "Custom hooks: simpler, no wrapper components, no nesting, direct return values. HOCs: wrap component, add props. Render props: pass function as child. Hooks are the modern React solution for code reuse."
    }
  ],
  "interviewAnswer": "Custom hooks are JavaScript functions that reuse stateful logic across components. They start with 'use', can call other hooks, and return values. Unlike HOCs or render props, they don't add wrapper components. Common uses: form handling, fetch abstraction, debounce, localStorage sync, and event listeners. Custom hooks make components thinner and logic reusable.",
  "interviewQuestions": [
    {
      "question": "What is a custom hook?",
      "answer": "A JavaScript function starting with 'use' that calls other hooks to encapsulate reusable stateful logic."
    },
    {
      "question": "Why the 'use' prefix?",
      "answer": "Convention for lint rules. Linters use the prefix to detect violations of the Rules of Hooks."
    },
    {
      "question": "Can custom hooks call other custom hooks?",
      "answer": "Yes - custom hooks are composable. One custom hook can call another."
    },
    {
      "question": "How do custom hooks differ from HOCs?",
      "answer": "Custom hooks return values directly, no wrapper components. HOCs wrap the component and inject props."
    },
    {
      "question": "What are common custom hook examples?",
      "answer": "useForm, useFetch, useDebounce, useLocalStorage, useWindowSize, useOnlineStatus, useToggle."
    },
    {
      "question": "Do custom hooks create new component instances?",
      "answer": "No - they're functions. Each component that uses a hook gets its own isolated state."
    },
    {
      "question": "Can custom hooks accept arguments?",
      "answer": "Yes, they're regular functions. useFetch(url) passes url to the fetch logic internally."
    },
    {
      "question": "What's the return value of a custom hook?",
      "answer": "Any value: primitive, object, array, or tuple. Typically returns [value, setters] or { data, loading, error }."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrH\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Custom Hook Architecture</text><rect x=\"40\" y=\"55\" width=\"250\" height=\"140\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"165\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component A</text><rect x=\"55\" y=\"90\" width=\"220\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"165\" y=\"109\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">const { data } = useFetch(url)</text><rect x=\"55\" y=\"130\" width=\"220\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"165\" y=\"149\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">const { form } = useForm(initial)</text><line x1=\"165\" y1=\"85\" x2=\"165\" y2=\"55\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><rect x=\"410\" y=\"55\" width=\"250\" height=\"140\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"535\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component B</text><rect x=\"425\" y=\"90\" width=\"220\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"535\" y=\"109\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">const { data } = useFetch(url)</text><rect x=\"425\" y=\"130\" width=\"220\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"535\" y=\"149\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">const { online } = useOnlineStatus()</text><rect x=\"100\" y=\"225\" width=\"500\" height=\"110\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"248\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Shared Custom Hooks Library</text><rect x=\"115\" y=\"260\" width=\"150\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"190\" y=\"279\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">useFetch(url)</text><rect x=\"275\" y=\"260\" width=\"150\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"350\" y=\"279\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">useForm(initial)</text><rect x=\"435\" y=\"260\" width=\"150\" height=\"30\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"510\" y=\"279\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">useOnlineStatus()</text></svg>",
  "codeExamples": [
    {
      "title": "useFetch Custom Hook",
      "useCase": "Reusable data fetching",
      "code": "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n    fetch(url)\n      .then(res => { if (!res.ok) throw new Error('Fetch failed'); return res.json(); })\n      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })\n      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Usage in any component:\nfunction UserList() {\n  const { data: users, loading, error } = useFetch('/api/users');\n  if (loading) return <Spinner />;\n  if (error) return <Error message={error} />;\n  return <List items={users} />;\n}",
      "description": "useFetch encapsulates fetch logic, loading/error states, and cleanup. Any component can use it with one line. Each component gets its own isolated state."
    },
    {
      "title": "useDebounce Custom Hook",
      "useCase": "Search input optimization",
      "code": "function useDebounce(value, delay = 300) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debouncedValue;\n}\n\n// Usage in search:\nfunction SearchPage() {\n  const [query, setQuery] = useState('');\n  const debouncedQuery = useDebounce(query, 500);\n  const { data: results } = useFetch('/api/search?q=' + debouncedQuery);\n\n  return (\n    <div>\n      <input value={query} onChange={e => setQuery(e.target.value)} />\n      <Results data={results} />\n    </div>\n  );\n}",
      "description": "useDebounce delays value updates. The search only fires after the user stops typing for 500ms, preventing excessive API calls."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a custom hook?",
      "options": [
        "React component",
        "Function starting with 'use' that calls other hooks",
        "Class with lifecycle",
        "JSX element"
      ],
      "answer": 1,
      "explanation": "Custom hook = function + hooks."
    },
    {
      "question": "Why must custom hooks start with 'use'?",
      "options": [
        "Syntax requirement",
        "Lint convention for Rules of Hooks enforcement",
        "Performance optimization",
        "Bundle size"
      ],
      "answer": 1,
      "explanation": "Convention for lint rule detection."
    },
    {
      "question": "Can custom hooks accept arguments?",
      "options": [
        "No",
        "Yes, they're regular functions",
        "Only objects",
        "Only strings"
      ],
      "answer": 1,
      "explanation": "Custom hooks are functions, can accept any args."
    },
    {
      "question": "What do custom hooks replace?",
      "options": [
        "JSX",
        "HOCs and render props",
        "CSS",
        "HTML"
      ],
      "answer": 1,
      "explanation": "Modern replacement for HOCs/render props."
    },
    {
      "question": "Do custom hooks share state between components?",
      "options": [
        "Yes, like singletons",
        "No, each component gets isolated state",
        "Only with useRef",
        "Only in production"
      ],
      "answer": 1,
      "explanation": "Each use gets its own independent state."
    },
    {
      "question": "Can a custom hook call another custom hook?",
      "options": [
        "No",
        "Yes, hooks are composable",
        "Only built-in hooks",
        "Only with wrapper"
      ],
      "answer": 1,
      "explanation": "Custom hooks compose like functions."
    }
  ]
};

TOPICS_DATA["react"]["react-usestate"] = {
  "id": "react-usestate",
  "title": "React useState",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "useState is the primary hook for adding state to functional components.",
    "const [state, setState] = useState(initialValue) returns current state and a setter.",
    "Calling the setter triggers a re-render of the component.",
    "State updates are asynchronous and batched in React 18 for performance."
  ],
  "laymanDefinition": "useState is like a scoreboard with a remote control. The scoreboard displays a number (state value). The remote has buttons (setter) to change the number. When you press a button, the scoreboard updates to show the new number, and everyone watching (the UI) sees the change. You can also press the button with a note saying 'make it one more than before' (functional update) to avoid mistakes.",
  "deepDive": [
    {
      "heading": "Basic Usage",
      "text": "const [count, setCount] = useState(0). useState takes the initial value and returns an array. Destructure it to get the current value and the updater function. The initial value is only used on the first render."
    },
    {
      "heading": "Functional Updates",
      "text": "setCount(prev => prev + 1). When the new state depends on the previous state, use the functional form. This avoids bugs with stale closures when multiple updates happen in the same render cycle."
    },
    {
      "heading": "Lazy Initial State",
      "text": "useState(() => expensiveComputation()). If the initial state is expensive to compute, pass a function instead of a value. The function only runs once (on initial render), not on every re-render."
    },
    {
      "heading": "State Update Batching",
      "text": "React 18 batches all state updates (event handlers, timeouts, promises). Multiple setState calls in the same event produce a single re-render. Use functional updates when reading state within the batch."
    }
  ],
  "interviewAnswer": "useState is the fundamental hook for functional component state. It returns [currentValue, setterFunction]. The setter triggers a re-render. Use functional updates (prev => prev + 1) when new state depends on old state. Use lazy initialization for expensive computations. State updates are async and batched. Never mutate state directly - always use the setter.",
  "interviewQuestions": [
    {
      "question": "What does useState return?",
      "answer": "An array [currentValue, setterFunction]. const [count, setCount] = useState(0)."
    },
    {
      "question": "What happens when you call the setter?",
      "answer": "The component re-renders with the new state value. If the same value (by reference), React may skip the re-render."
    },
    {
      "question": "What is a functional update?",
      "answer": "setCount(prev => prev + 1). Pass a function instead of a value. Safe when new state depends on old state."
    },
    {
      "question": "When to use lazy initialization?",
      "answer": "When initial state requires expensive computation: useState(() => computeExpensiveValue()). Runs only once."
    },
    {
      "question": "Are state updates synchronous?",
      "answer": "No - they are async and batched. Multiple setState calls trigger a single re-render."
    },
    {
      "question": "What happens if you mutate state directly?",
      "answer": "React doesn't detect the change (reference hasn't changed). No re-render occurs. Always use the setter."
    },
    {
      "question": "Can useState store objects and arrays?",
      "answer": "Yes, but always replace them immutably: setUser({ ...user, name: 'New' }). Never mutate the object directly."
    },
    {
      "question": "What is the bail out condition?",
      "answer": "If the setter is called with the same value (Object.is comparison), React skips re-rendering the children."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrUS\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useState Hook</text><rect x=\"40\" y=\"55\" width=\"620\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"75\" fill=\"#fbbf24\" font-size=\"13\" font-family=\"monospace\" font-weight=\"bold\" text-anchor=\"middle\">const [state, setState] = useState(initialValue)</text><text x=\"350\" y=\"92\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Returns array: [currentValue, setterFunction]</text><line x1=\"130\" y1=\"105\" x2=\"130\" y2=\"135\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrUS)\"/><line x1=\"570\" y1=\"105\" x2=\"570\" y2=\"135\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrUS)\"/><rect x=\"40\" y=\"135\" width=\"180\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"155\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">state (read only)</text><text x=\"130\" y=\"172\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Current value, do not mutate</text><rect x=\"480\" y=\"135\" width=\"180\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"570\" y=\"155\" fill=\"#6c9fff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">setState(newValue)</text><text x=\"570\" y=\"172\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Triggers re-render</text><line x1=\"350\" y1=\"105\" x2=\"350\" y2=\"135\" stroke=\"#e5c07b\" stroke-width=\"2\" marker-end=\"url(#arrUS)\"/><rect x=\"220\" y=\"135\" width=\"260\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"155\" fill=\"#e5c07b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">initialValue (first render only)</text><text x=\"350\" y=\"172\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Lazy init: () => expensive()</text><line x1=\"130\" y1=\"185\" x2=\"130\" y2=\"215\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#arrUS)\"/><line x1=\"570\" y1=\"185\" x2=\"570\" y2=\"215\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#arrUS)\"/><rect x=\"40\" y=\"215\" width=\"180\" height=\"50\" rx=\"6\" fill=\"#2a2f45\"/><text x=\"130\" y=\"235\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Value used in renders</text><rect x=\"480\" y=\"215\" width=\"180\" height=\"50\" rx=\"6\" fill=\"#2a2f45\"/><text x=\"570\" y=\"235\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Can pass prev =&gt; value</text></svg>",
  "codeExamples": [
    {
      "title": "Counter with useState Patterns",
      "useCase": "All useState patterns",
      "code": "function Counter() {\n  const [count, setCount] = useState(0);\n\n  // Direct update\n  const increment = () => setCount(count + 1);\n\n  // Functional update (safe in batches)\n  const incrementBy3 = () => {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1); // count increases by 3\n  };\n\n  // Object state\n  const [user, setUser] = useState({ name: '', age: 0 });\n  const updateName = (name) => setUser(prev => ({ ...prev, name }));\n\n  // Lazy initialization\n  const [data, setData] = useState(() => {\n    const saved = localStorage.getItem('data');\n    return saved ? JSON.parse(saved) : [];\n  });\n\n  return <div>...</div>;\n}",
      "description": "Functional updates (prev => prev + 1) are safe with batching. Object state requires immutable spread. Lazy init runs once."
    },
    {
      "title": "State with Previous Value Toggle",
      "useCase": "Boolean state patterns",
      "code": "function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n\n  // Toggle: always use functional form\n  const toggle = () => setIsOn(prev => !prev);\n\n  // Reset\n  const reset = () => setIsOn(false);\n\n  // Set based on some condition\n  const updateFromServer = (value) => setIsOn(value);\n\n  return (\n    <div>\n      <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>\n      <button onClick={reset}>Reset</button>\n    </div>\n  );\n}",
      "description": "Boolean state uses functional toggle: setIsOn(prev => !prev). Reset uses direct setter call."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does useState return?",
      "options": [
        "{ value, setValue }",
        "[value, setValue]",
        "A single value",
        "A promise"
      ],
      "answer": 1,
      "explanation": "Returns array [value, setter]."
    },
    {
      "question": "What triggers component re-render?",
      "options": [
        "Reading state",
        "Calling the setter",
        "Mutating state directly",
        "Declaring useState"
      ],
      "answer": 1,
      "explanation": "Setter call triggers re-render."
    },
    {
      "question": "What is a functional update?",
      "options": [
        "setCount(0)",
        "setCount(prev => prev + 1)",
        "count++",
        "count = count + 1"
      ],
      "answer": 1,
      "explanation": "Function that receives previous state."
    },
    {
      "question": "When to use lazy initialization?",
      "options": [
        "Always",
        "For expensive initial computations",
        "Never",
        "For primitive values"
      ],
      "answer": 1,
      "explanation": "Lazy init for expensive computations."
    },
    {
      "question": "Are state updates synchronous?",
      "options": [
        "Yes",
        "No, they are async and batched",
        "Only in React 18",
        "Only with functional updates"
      ],
      "answer": 1,
      "explanation": "Updates are async and batched."
    },
    {
      "question": "What happens if you mutate state directly?",
      "options": [
        "Component re-renders",
        "No re-render (reference unchanged)",
        "Error thrown",
        "Warning shown"
      ],
      "answer": 1,
      "explanation": "Direct mutation doesn't change reference."
    }
  ]
};

TOPICS_DATA["react"]["react-useeffect"] = {
  "id": "react-useeffect",
  "title": "React useEffect",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "useEffect lets you perform side effects in functional components: data fetching, subscriptions, DOM manipulation, timers.",
    "useEffect runs after the browser paints (after render, not during).",
    "The dependency array controls when the effect runs: [] on mount only, [deps] on mount and when deps change.",
    "The optional cleanup function runs before re-execution and on unmount to prevent memory leaks."
  ],
  "laymanDefinition": "useEffect is like a after-party cleanup crew. After the party (render) is over and guests have left (paint), the cleanup crew arrives to handle things: they might call for more pizza (fetch data), set up decorations for the next party (start a timer), or clean up last time's mess (remove event listeners). They get the address (dependency array) so they know which parties to attend. If the party changes (deps change), they clean up the old setup and set up the new one.",
  "deepDive": [
    {
      "heading": "Effect Basics",
      "text": "useEffect(setup, dependencies?). The setup function runs after the browser paints. If no dependency array, runs after every render. If [], runs only on mount. If [a, b], runs on mount and when a or b change."
    },
    {
      "heading": "Cleanup Function",
      "text": "Return a function from the effect: useEffect(() => { subscribe(); return () => { unsubscribe(); }; }, []). The cleanup runs before re-execution and on unmount. Essential for subscriptions, timers, and event listeners."
    },
    {
      "heading": "Fetching Data with useEffect",
      "text": "Standard pattern: useState for data/loading/error, useEffect to fetch, with cleanup flag to avoid setState on unmounted component. Use async function inside or .then(). Dependencies should include all reactive values."
    },
    {
      "heading": "Common Pitfalls",
      "text": "1. Missing dependency array causes infinite loops. 2. Missing cleanup causes memory leaks. 3. Stale closures: using state without dependencies. 4. Object/array dependencies cause re-runs on every render (use stable references)."
    }
  ],
  "interviewAnswer": "useEffect performs side effects after render. The setup function runs after paint; the cleanup runs before re-execution or unmount. The dependency array controls execution: []=mount only, [deps]=mount+change, undefined=every render. Always include all reactive values in deps (use exhaustive-deps lint rule). Cleanup is essential for subscriptions, timers, and listeners to prevent memory leaks.",
  "interviewQuestions": [
    {
      "question": "What is useEffect for?",
      "answer": "Side effects in functional components: data fetching, subscriptions, timers, DOM manipulation, logging."
    },
    {
      "question": "When does useEffect run?",
      "answer": "After the browser paints (after render). Not during render."
    },
    {
      "question": "What do different dependency arrays mean?",
      "answer": "[] = run on mount only. [a, b] = run on mount and when a/b change. undefined = run after every render."
    },
    {
      "question": "What is the cleanup function?",
      "answer": "The function returned from the effect. Runs before re-execution and on unmount. Cleans up subscriptions, timers, listeners."
    },
    {
      "question": "Why do I need cleanup?",
      "answer": "Prevents memory leaks: removes event listeners, clears timers, aborts fetch requests, unsubscribes from observables."
    },
    {
      "question": "How to fetch data with useEffect?",
      "answer": "useState for state, useEffect with []. Use cleanup flag to avoid setState on unmounted component."
    },
    {
      "question": "What is the exhaustive-deps rule?",
      "answer": "ESLint rule that warns when dependencies are missing from the dependency array. Ensures effects stay in sync."
    },
    {
      "question": "What happens if you omit the dependency array?",
      "answer": "Effect runs after every render. Usually causes infinite loops if the effect triggers a re-render."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 700 400\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrEff\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"380\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useEffect Lifecycle</text><rect x=\"40\" y=\"55\" width=\"290\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"185\" y=\"75\" fill=\"#6c9fff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component Renders</text><text x=\"185\" y=\"92\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Function executes, JSX returned</text><line x1=\"185\" y1=\"105\" x2=\"185\" y2=\"135\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrEff)\"/><rect x=\"40\" y=\"135\" width=\"290\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"185\" y=\"155\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Browser Paints</text><text x=\"185\" y=\"172\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React commits to DOM</text><line x1=\"185\" y1=\"185\" x2=\"185\" y2=\"215\" stroke=\"#34d399\" stroke-width=\"2\" marker-end=\"url(#arrEff)\"/><rect x=\"40\" y=\"215\" width=\"290\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"185\" y=\"235\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">useEffect Runs (after paint)</text><text x=\"185\" y=\"252\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Fetch / Subscribe / Timer / DOM</text><rect x=\"370\" y=\"55\" width=\"290\" height=\"190\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"515\" y=\"78\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">When Dependencies Change</text><rect x=\"385\" y=\"90\" width=\"260\" height=\"35\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"112\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Cleanup runs (unsubscribe)</text><rect x=\"385\" y=\"130\" width=\"260\" height=\"35\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"152\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Component Re-renders</text><rect x=\"385\" y=\"170\" width=\"260\" height=\"35\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"192\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Effect re-runs with new deps</text><rect x=\"370\" y=\"260\" width=\"290\" height=\"100\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"515\" y=\"283\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">On Unmount</text><rect x=\"385\" y=\"295\" width=\"260\" height=\"35\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"317\" fill=\"#e8eaed\" font-size=\"10\" text-anchor=\"middle\">Cleanup runs one last time</text><rect x=\"385\" y=\"335\" width=\"260\" height=\"18\" rx=\"3\" fill=\"#2a2f45\"/><text x=\"515\" y=\"348\" fill=\"#e8eaed\" font-size=\"9\" text-anchor=\"middle\">Component removed from DOM</text></svg>",
  "codeExamples": [
    {
      "title": "Data Fetching with Cleanup",
      "useCase": "Preventing memory leaks",
      "code": "function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n\n    fetch('/api/users/' + userId)\n      .then(res => {\n        if (!res.ok) throw new Error('Failed');\n        return res.json();\n      })\n      .then(data => {\n        if (!cancelled) {\n          setUser(data);\n          setLoading(false);\n        }\n      })\n      .catch(err => {\n        if (!cancelled) {\n          console.error(err);\n          setLoading(false);\n        }\n      });\n\n    return () => { cancelled = true; };\n  }, [userId]);\n\n  if (loading) return <div>Loading...</div>;\n  return <div>{user.name}</div>;\n}",
      "description": "Cleanup sets cancelled=true. If userId changes or component unmounts before fetch completes, setState is skipped - prevents memory leaks and React warnings."
    },
    {
      "title": "Timer with Cleanup",
      "useCase": "setInterval with proper cleanup",
      "code": "function Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(prev => prev + 1);\n    }, 1000);\n\n    // Cleanup: clear interval on unmount\n    return () => clearInterval(interval);\n  }, []); // Empty array: only on mount\n\n  return <div>Elapsed: {seconds}s</div>;\n}\n\n// Without cleanup, the interval keeps running\n// after component unmounts (memory leak)\n// With cleanup, interval is cleared when\n// component unmounts or deps change",
      "description": "Without cleanup, setInterval continues after unmount (memory leak + state update on unmounted component). Cleanup with clearInterval fixes this."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is useEffect for?",
      "options": [
        "Computing values",
        "Side effects after render",
        "Rendering JSX",
        "Styling"
      ],
      "answer": 1,
      "explanation": "useEffect handles side effects after paint."
    },
    {
      "question": "When does useEffect run?",
      "options": [
        "During render",
        "Before render",
        "After browser paints",
        "On every import"
      ],
      "answer": 2,
      "explanation": "Runs after browser paint."
    },
    {
      "question": "What does [] dependency mean?",
      "options": [
        "Run after every render",
        "Run only on mount",
        "Never run",
        "Run only on state change"
      ],
      "answer": 1,
      "explanation": "[] = runs once on mount."
    },
    {
      "question": "What is the cleanup function for?",
      "options": [
        "Optimization",
        "Preventing memory leaks",
        "Improving speed",
        "Styling"
      ],
      "answer": 1,
      "explanation": "Cleanup prevents memory leaks."
    },
    {
      "question": "What if no dependency array provided?",
      "options": [
        "Runs once only",
        "Runs after every render",
        "Never runs",
        "Runs only on unmount"
      ],
      "answer": 1,
      "explanation": "No array = runs after every render."
    },
    {
      "question": "What does exhaustive-deps lint rule check?",
      "options": [
        "Variable names",
        "Missing deps in dependency array",
        "Code formatting",
        "Import order"
      ],
      "answer": 1,
      "explanation": "Warns about missing dependencies."
    }
  ]
};


// Total topics: 20