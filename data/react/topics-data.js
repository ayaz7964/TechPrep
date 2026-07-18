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

TOPICS_DATA["react"]["react-code-splitting"] = {
  "id": "react-code-splitting",
  "title": "React Code Splitting",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Code splitting breaks the JavaScript bundle into smaller chunks loaded on demand, reducing initial load time.",
    "React supports code splitting via dynamic import() combined with React.lazy and Suspense.",
    "Route-based splitting (one chunk per route) is the most effective strategy for most applications.",
    "Tools like webpack, Rollup, and Vite automatically create separate chunks for dynamic imports."
  ],
  "laymanDefinition": "Code splitting is like a restaurant menu where you only pay for the dishes you order, not the entire kitchen inventory. Instead of downloading the ENTIRE application code (every route, every library, every component) when the user first visits, you download only what they need for the current page. When they navigate to a new section, you download that code on demand. This means the first page loads much faster, especially on slow networks. Modern React apps use React.lazy, dynamic import(), and Suspense to make code splitting seamless.",
  "deepDive": [
    {
      "heading": "Webpack Chunking Strategy",
      "text": "Webpack detects dynamic import() calls and creates separate output files (chunks). The bundler analyzes the module graph at build time and splits based on: (1) Entry points - each entry creates an initial chunk. (2) Dynamic imports - each import() creates a new chunk. (3) SplitChunksPlugin - extracts shared dependencies (like React, lodash) into common chunks for better caching. (4) Async chunks - loaded on demand when the dynamic import is triggered. The chunk filename is determined by [name], [id], or [contenthash] in webpack's output config. Magic comments customize the chunk name: import(/* webpackChunkName: \"admin\" */ \"./Admin\"). Multiple dynamic imports with the same name merge into one chunk."
    },
    {
      "heading": "Measuring Code Splitting Impact",
      "text": "Use Chrome DevTools Coverage tab to measure unused bytes before and after splitting. Aim for: (1) Initial JS bundle under 150-200KB gzipped. (2) First Contentful Paint (FCP) under 1.5s. (3) Time to Interactive (TTI) under 3.5s. Bundle analysis tools: webpack-bundle-analyzer (interactive treemap), source-map-explorer (per-file sizes), and BundlePhobia (npm package size check). Track these metrics in CI to prevent bundle bloat. Lighthouse audits identify opportunities for code splitting. The key metric is not total app size but the critical path - code needed for the initial route."
    },
    {
      "heading": "Advanced Splitting Patterns",
      "text": "Beyond route splitting: (1) Component-level splitting for heavy modals/dialogs that most users never open. (2) Library splitting - defer large libraries (charting, date pickers, markdown renderers) until needed: const Chart = React.lazy(() => import(\"chart.js\")). (3) Conditional splitting - load polyfills only for older browsers: if (!(\"IntersectionObserver\" in window)) { import(\"intersection-observer\") }. (4) Vendor chunk splitting - extract third-party code into vendor.js for long-term caching. (5) Component splitting via webpack's SplitChunksPlugin for shared component directories. (6) Preload/prefetch critical chunks for predicted user navigation paths."
    },
    {
      "heading": "Code Splitting with Server-Side Rendering",
      "text": "Standard React.lazy does not work with SSR because the server cannot make async import calls during rendering. Solutions: (1) @loadable/component - a community library that supports SSR code splitting with chunk extraction. (2) Next.js dynamic imports - next/dynamic handles SSR automatically with server-side chunk extraction. (3) React 18 streaming SSR - Suspense boundaries on the server enable lazy component loading in the stream. (4) Gatsby uses static rendering where page-level code splitting is automatic. The key challenge is ensuring the server-rendered HTML includes the necessary script tags for client-side hydration to pick up correctly."
    },
    {
      "heading": "Caching Strategy for Split Chunks",
      "text": "Effective caching maximizes cache hits: (1) Use [contenthash] in chunk filenames - the hash changes only when file content changes. (2) Split vendor chunks (react, react-dom) with stable hashes that change only on library upgrades. (3) Extract webpack runtime chunk separately - it changes frequently but is tiny (< 5KB). (4) Use HTTP Cache-Control headers: immutable for hashed chunks (cache forever), no-cache for index.html. (5) Service worker caching (Workbox) for offline support and faster repeat visits. (6) Monitor chunk hash stability - unnecessary hash changes defeat caching. webpack 5s deterministic module IDs help maintain stable hashes."
    }
  ],
  "interviewAnswer": "Code splitting breaks the JavaScript bundle into chunks loaded on demand using dynamic import() combined with React.lazy and Suspense. Route-based splitting (one chunk per route) is the most effective strategy. Measure impact with webpack-bundle-analyzer and Chrome DevTools Coverage - target initial bundle under 150-200KB gzipped. React.lazy does not support SSR without @loadable/component or Next.js dynamic imports. Use [contenthash] filenames, vendor chunk extraction, and service worker caching for optimal caching. Avoid splitting components under 5KB where HTTP overhead negates the benefit.",
  "interviewQuestions": [
    {
      "question": "What is code splitting?",
      "answer": "Code splitting divides the JavaScript bundle into smaller chunks that load on demand. This reduces the initial download size and improves time to interactive. Dynamic import() is the JavaScript mechanism that enables it."
    },
    {
      "question": "How does webpack handle dynamic imports?",
      "answer": "Webpack treats each import() call as a split point, creating a separate output chunk. The SplitChunksPlugin also extracts shared dependencies into common chunks. Magic comments customize chunk names for debugging and caching."
    },
    {
      "question": "What is the recommended chunk size for optimal loading?",
      "answer": "Individual chunks should be 20-50KB (gzipped) for good cacheability and fast loading. Chunks under 5KB are usually not worth splitting due to HTTP overhead. Initial bundle should be under 150-200KB gzipped."
    },
    {
      "question": "How do you analyze bundle sizes?",
      "answer": "webpack-bundle-analyzer generates a treemap visualization. source-map-explorer maps bundle bytes to source files. Chrome DevTools Coverage tab shows unused code. Lighthouse provides performance budgets and recommendations."
    },
    {
      "question": "What is the difference between React.lazy and dynamic import()?",
      "answer": "dynamic import() is a JavaScript API for loading modules asynchronously. React.lazy is a React abstraction that wraps import() and integrates with the component lifecycle and Suspense for declarative loading states."
    },
    {
      "question": "How do you handle code splitting with SSR?",
      "answer": "React.lazy does not support SSR directly. Use @loadable/components or Next.js dynamic imports for SSR-compatible code splitting. React 18s streaming SSR adds native support via Suspense boundaries."
    },
    {
      "question": "What is the vendor chunk strategy?",
      "answer": "Extract third-party libraries (react, react-dom, lodash) into a separate vendor chunk using webpacks SplitChunksPlugin. This chunk changes infrequently (only on library upgrades) and benefits from long-term browser caching."
    },
    {
      "question": "How does contenthash improve caching?",
      "answer": "contenthash in chunk filenames ensures the filename changes only when the file content changes. Unchanged chunks keep their URL and remain in the browser cache. This maximizes cache hit rates on repeat visits."
    },
    {
      "question": "What are magic comments in webpack imports?",
      "answer": "Magic comments are webpack-specific annotations in import() calls: import(/* webpackChunkName: \"admin\" */ \"./Admin\"). They control chunk naming, prefetching, preloading, and chunk merging behavior."
    },
    {
      "question": "What is the downside of too many small chunks?",
      "answer": "Each chunk requires an HTTP request (even with HTTP/2 multiplexing, there is overhead). Too many small chunks (under 5KB) increase load time due to request overhead, parse time, and queueing. Merge related small chunks into a single chunk."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Code Splitting Architecture</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Single Bundle</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">app.js (500KB) - all code</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Code Splitting</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Dynamic import() split points</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"60\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">main.js</text><text x=\"60\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Shell + router</text><rect x=\"100\" y=\"195\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">home.js</text><text x=\"130\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Home page</text><rect x=\"170\" y=\"195\" width=\"60\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"200\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">admin.js</text><text x=\"200\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Admin panel</text><text x=\"30\" y=\"260\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">Initial load: only main.js (80KB)</text><text x=\"30\" y=\"278\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Navigation loads additional chunks on demand</text></svg>",
  "codeExamples": [
    {
      "title": "Library-Level Code Splitting",
      "useCase": "Load heavy chart library only when chart renders",
      "code": "const Chart = React.lazy(() => import(\"react-chartjs-2\"));\n\nfunction SalesDashboard() {\n  const [showChart, setShowChart] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setShowChart(true)}>\n        Show Sales Chart (loads 150KB on demand)\n      </button>\n\n      {showChart && (\n        <Suspense fallback={<div>Loading chart library...</div>}>\n          <Chart\n            type=\"line\"\n            data={chartData}\n            options={{ responsive: true }}\n          />\n        </Suspense>\n      )}\n    </div>\n  );\n}",
      "description": "The chartjs library (150KB+) is only downloaded when the user clicks \"Show Sales Chart\". Users who never view the chart save that bandwidth and parse time."
    },
    {
      "title": "Conditional Polyfill Loading with Dynamic Import",
      "useCase": "Load polyfills only for browsers that need them",
      "code": "async function loadPolyfills() {\n  if (!(\"IntersectionObserver\" in window)) {\n    await import(\"intersection-observer\");\n  }\n  if (!(\"ResizeObserver\" in window)) {\n    await import(\"@juggle/resize-observer\");\n  }\n  if (!(\"fetch\" in window)) {\n    await import(\"whatwg-fetch\");\n  }\n}\n\n// In app bootstrap:\nloadPolyfills().then(() => {\n  ReactDOM.createRoot(document.getElementById(\"root\")).render(<App />);\n});\n\n// Webpack config for vendor splitting:\n// optimization: {\n//   splitChunks: {\n//     chunks: \"all\",\n//     cacheGroups: {\n//       vendor: { test: /[\\\\/]node_modules[\\\\/]/, name: \"vendor\" },\n//     }\n//   }\n// }",
      "description": "Modern browsers skip the polyfill chunks entirely. Older browsers load only the polyfills they need. The vendor chunking config extracts all node_modules into a long-term cached vendor.js."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What mechanism does React use for code splitting?",
      "options": [
        "React Router",
        "Dynamic import() with React.lazy",
        "Redux middleware",
        "Higher-order components"
      ],
      "answer": 1,
      "explanation": "React.lazy wraps dynamic import() calls and integrates with Suspense. The bundler creates separate chunks at each import() boundary."
    },
    {
      "question": "What is the recommended chunk size?",
      "options": [
        "Under 5KB",
        "20-50KB gzipped",
        "Over 500KB",
        "Exactly 100KB"
      ],
      "answer": 1,
      "explanation": "Chunks between 20-50KB gzipped provide good cacheability and fast loading. Smaller chunks suffer from HTTP overhead; larger chunks negate the benefits of splitting."
    },
    {
      "question": "Which tool visualizes webpack bundle sizes?",
      "options": [
        "ESLint",
        "Prettier",
        "webpack-bundle-analyzer",
        "Babel"
      ],
      "answer": 2,
      "explanation": "webpack-bundle-analyzer creates an interactive treemap where each rectangle represents a module, sized by its byte contribution."
    },
    {
      "question": "What does [contenthash] in chunk filenames do?",
      "options": [
        "Minimizes the chunk",
        "Changes the filename when content changes for cache busting",
        "Makes the chunk load faster",
        "Encrypts the chunk"
      ],
      "answer": 1,
      "explanation": "contenthash is a substitution that produces a hash based on the file content. Changed content = new hash = new URL = cache miss. Unchanged content = same URL = cache hit."
    },
    {
      "question": "How do you share code between chunks?",
      "options": [
        "Duplicate it in each chunk",
        "webpacks SplitChunksPlugin extracts shared modules into common chunks",
        "Use React.memo on shared components",
        "Shared code must be inlined"
      ],
      "answer": 1,
      "explanation": "SplitChunksPlugin analyzes the module graph and extracts modules imported by multiple chunks into a shared commons chunk."
    },
    {
      "question": "Which library supports code splitting with SSR?",
      "options": [
        "React.lazy alone",
        "@loadable/component",
        "React Router",
        "Redux Toolkit"
      ],
      "answer": 1,
      "explanation": "React.lazy does not work with SSR. @loadable/component provides SSR-compatible code splitting with server-side chunk extraction and client-side hydration support."
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

TOPICS_DATA["react"]["react-error-boundaries"] = {
  "id": "react-error-boundaries",
  "title": "React Error Boundaries",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Error boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI.",
    "They catch errors during rendering, lifecycle methods, and constructors - but NOT event handlers, async code, or SSR.",
    "Error boundaries are implemented as class components with static getDerivedStateFromError() and componentDidCatch().",
    "React 16+ introduced error boundaries; React 18 extends behavior with concurrent mode and Suspense integration."
  ],
  "laymanDefinition": "Error boundaries are like safety nets at a circus. When a trapeze artist falls (a component crashes due to a bug), the safety net catches them and shows a \"We'll be right back!\" sign instead of letting the whole show crash (the entire app going white). Without error boundaries, one component's error crashes the entire React tree, showing a blank page. With error boundaries, only the crashing section is replaced with a fallback UI, and the rest of the app continues working. They are implemented as class components because function components do not yet support componentDidCatch lifecycle.",
  "deepDive": [
    {
      "heading": "Creating an Error Boundary Component",
      "text": "Error boundaries must be class components because they require lifecycle methods that function components do not have: getDerivedStateFromError (static) and componentDidCatch. getDerivedStateFromError receives the error and updates state to show fallback UI. componentDidCatCh receives the error and error info (component stack trace) for logging. The boundary renders this.props.children normally when no error occurred, and a fallback UI when an error is caught. Common practice: create a generic ErrorBoundary component that accepts a fallback prop, and reuse it throughout the app. In React 18, error boundaries work with concurrent mode and Suspense, catching errors from lazy-loaded components. A known limitation: error boundaries do not catch errors in server-side rendering or event handlers (use try-catch in event handlers instead)."
    },
    {
      "heading": "What Error Boundaries Catch vs What They Miss",
      "text": "CAUGHT: (1) Render phase errors - during component function/class render. (2) Lifecycle method errors - componentDidMount, componentDidUpdate, getDerivedStateFromProps, etc. (3) Constructor errors. (4) Errors in lazy-loaded components (Suspense integration). (5) Errors in nested event handlers triggered during commit phase effects (in useLayoutEffect). NOT CAUGHT: (1) Event handler errors (use try-catch). (2) Asynchronous code errors (setTimeout, requestAnimationFrame callbacks) - use .catch(). (3) Server-side rendering errors. (4) Errors thrown in the error boundary itself (these propagate up). (5) Errors in the event propagation phase (native DOM events). For event handlers and async code, use JavaScript try-catch or catch the promise rejection."
    },
    {
      "heading": "Error Recovery Strategies",
      "text": "When an error boundary catches an error, the component tree below it is unmounted. Recovery requires: (1) Resetting the error state to retry rendering. A common pattern: give the fallback UI a \"Try Again\" button that calls this.setState({ hasError: false }). (2) Logging the error to a monitoring service (Sentry, LogRocket, Datadog) in componentDidCatch. (3) For permanent errors, displaying a meaningful error message with support contact info. (4) For transient errors (network failures, chunk load failures), automatic retry with exponential backoff. (5) Granular boundaries - smaller boundaries isolate errors better (a crash in the comments section does not take down the product listing)."
    },
    {
      "heading": "Granular Error Boundary Strategy",
      "text": "The key architectural decision is boundary placement: (1) Root-level boundary - one boundary at the app root catches all errors. Shows a full-page error screen. Use as a last resort to prevent a completely blank page. (2) Feature-level boundaries - each major feature (sidebar, main content, comments, header) gets its own boundary. An error in one feature does not affect others. (3) Component-level boundaries - async components, third-party widgets, and user-generated content each wrapped individually. This isolates crashes to the smallest possible area. (4) Suspense boundary integration - wrap lazy-loaded components with both error boundaries (for chunk load failures) and Suspense (for loading states). The combination provides complete coverage: loading -> Suspense fallback, error -> error boundary fallback, success -> component renders."
    },
    {
      "heading": "React 18 Error Boundary Improvements",
      "text": "React 18 improves error boundaries with: (1) Concurrent mode - error boundaries correctly handle errors during concurrent renders, including render interruptions and resumptions. (2) Suspense integration - error boundaries catch errors from Suspense data fetching (rejected promises). (3) StrictMode double-invocation - in development, React intentionally double-invokes component functions to detect side effects; error boundaries must handle this without logging errors twice. (4) Recoverable errors - in some cases React 18 can recover from errors without unmounting the tree (experimental). (5) The upcoming react-error-boundary library provides a declarative <ErrorBoundary> component with hooks support for common patterns like retry and error logging."
    }
  ],
  "interviewAnswer": "Error boundaries are class components that catch JavaScript errors in their child tree using getDerivedStateFromError (for render fallback) and componentDidCatch (for logging). They catch render, lifecycle, and constructor errors but NOT event handlers, async code, or SSR errors. Use a strategy of granular boundaries: one at each feature level rather than a single root boundary. The fallback UI should include a retry mechanism. Error boundaries pair with Suspense for complete async handling: Suspense for loading states, error boundary for error states. Log errors to monitoring services in componentDidCatch. React 18 improves boundary behavior in concurrent mode and with Suspense data fetching.",
  "interviewQuestions": [
    {
      "question": "What errors does an error boundary catch?",
      "answer": "Errors in render, lifecycle methods (componentDidMount, componentDidUpdate, etc.), constructors, and useLayoutEffect. It does NOT catch event handler errors, async/setTimeout errors, SSR errors, or errors thrown in the boundary itself."
    },
    {
      "question": "How do you create an error boundary?",
      "answer": "As a class component with getDerivedStateFromError(error) returning { hasError: true } and componentDidCatch(error, info) for logging. Render children if no error, render fallback UI if error. React does not have a built-in <ErrorBoundary> component - you must create your own."
    },
    {
      "question": "Why must error boundaries be class components?",
      "answer": "Function components do not support the lifecycle methods getDerivedStateFromError and componentDidCatch. These are the only mechanisms React provides for intercepting render-phase errors. A future React version may add hooks-based error handling."
    },
    {
      "question": "Can error boundaries catch errors in event handlers?",
      "answer": "No. Use try-catch in event handlers: try { doSomething() } catch (e) { setError(e) }. Or use the event handlers error property like window.onerror for uncaught errors."
    },
    {
      "question": "How do you reset an error boundary?",
      "answer": "Set state in the fallback UI: this.setState({ hasError: false }). This re-attempts rendering the children. Combine with a \"Try Again\" button in the fallback UI for user-initiated retry."
    },
    {
      "question": "What is the recommended error boundary placement strategy?",
      "answer": "Use multiple granular boundaries: one at the app root (last resort), one per major feature/widget, and one around third-party components and user-generated content. This prevents a single crash from taking down unrelated parts of the UI."
    },
    {
      "question": "How do error boundaries work with React.lazy and Suspense?",
      "answer": "Wrap the Suspense component with an error boundary. If the lazy chunk fails to load (network error), the error boundary catches the rejected import promise and shows an error fallback (with retry). Suspense handles the loading state; the error boundary handles the error state."
    },
    {
      "question": "What information does componentDidCatch provide?",
      "answer": "The error object (message, stack) and an info object with componentStack (the React component tree trace showing which component threw the error). This stack is crucial for debugging because it shows the component hierarchy, not just JavaScript call stack."
    },
    {
      "question": "How does React 18 concurrent mode affect error boundaries?",
      "answer": "Error boundaries work correctly in concurrent mode. If a render is interrupted, errors from the interrupted render are discarded. Only errors from the committed render trigger the boundary. This prevents false positives from concurrent render cancellations."
    },
    {
      "question": "What is the react-error-boundary library?",
      "answer": "A popular third-party library that provides a reusable <ErrorBoundary> component with fallback prop, onError callback, resetKeys for automatic reset, and a useErrorHandler hook for function components to report errors to the nearest boundary."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Error Boundary Architecture</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Error Boundary</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Catches errors in child tree</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"55\" y=\"125\" width=\"150\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"135\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Header</text><text x=\"130\" y=\"152\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Works normally</text><line x1=\"130\" y1=\"155\" x2=\"130\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"55\" y=\"175\" width=\"150\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"185\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Crashed Widget</text><text x=\"130\" y=\"202\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Error caught by boundary</text><line x1=\"130\" y1=\"205\" x2=\"130\" y2=\"225\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"55\" y=\"225\" width=\"150\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"235\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Footer</text><text x=\"130\" y=\"252\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Continues working</text><text x=\"250\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">getDerivedStateFromError() + componentDidCatch()</text><text x=\"250\" y=\"140\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Operates independently</text><text x=\"250\" y=\"190\" fill=\"#f87171\" font-size=\"10\" text-anchor=\"start\">Replaced by fallback UI</text><text x=\"250\" y=\"240\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">App continues functioning</text></svg>",
  "codeExamples": [
    {
      "title": "Reusable Error Boundary Component with Retry",
      "useCase": "Standard pattern for error isolation and recovery",
      "code": "class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false, error: null };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error, info) {\n    console.error(\"Error caught:\", error);\n    console.error(\"Component stack:\", info.componentStack);\n    if (typeof this.props.onError === \"function\") {\n      this.props.onError(error, info);\n    }\n  }\n\n  handleRetry = () => {\n    this.setState({ hasError: false, error: null });\n  };\n\n  render() {\n    if (this.state.hasError) {\n      const Fallback = this.props.fallback;\n      if (Fallback) {\n        return <Fallback error={this.state.error} onRetry={this.handleRetry} />;\n      }\n      return (\n        <div role=\"alert\" className=\"error-boundary-fallback\">\n          <h2>Something went wrong</h2>\n          <p>{this.state.error.message}</p>\n          <button onClick={this.handleRetry}>Try Again</button>\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}\n\n// Usage:\n<ErrorBoundary fallback={WidgetErrorFallback}>\n  <Suspense fallback={<WidgetSkeleton />}>\n    <StockTicker />\n  </Suspense>\n</ErrorBoundary>",
      "description": "The reusable ErrorBoundary accepts an optional fallback component and onError callback. The fallback receives the error and a retry function. The retry resets state, causing React to re-render the children."
    },
    {
      "title": "Granular Error Boundaries in a Dashboard",
      "useCase": "Isolate crashes to specific widgets without affecting others",
      "code": "function Dashboard() {\n  return (\n    <div className=\"dashboard\">\n      <h1>Dashboard</h1>\n\n      <ErrorBoundary fallback={WidgetError}>\n        <SalesChart />\n      </ErrorBoundary>\n\n      <ErrorBoundary fallback={WidgetError}>\n        <UserActivity />\n      </ErrorBoundary>\n\n      <ErrorBoundary fallback={WidgetError}>\n        <RecentOrders />\n      </ErrorBoundary>\n\n      <ErrorBoundary fallback={WidgetError}>\n        <StockTicker />\n      </ErrorBoundary>\n    </div>\n  );\n}\n\nfunction WidgetError({ onRetry }) {\n  return (\n    <div className=\"widget-error\">\n      <p>This widget failed to load</p>\n      <button onClick={onRetry}>Reload Widget</button>\n    </div>\n  );\n}",
      "description": "If the StockTicker crashes due to a bad API response, only that widget shows the error fallback. SalesChart, UserActivity, and RecentOrders continue working normally. Each widget has independent error recovery."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which lifecycle method updates state when an error is caught?",
      "options": [
        "componentDidCatch",
        "getDerivedStateFromError (static)",
        "componentWillUnmount",
        "shouldComponentUpdate"
      ],
      "answer": 1,
      "explanation": "getDerivedStateFromError is a static method that receives the error and returns state update (e.g., { hasError: true }). It runs during render phase to show fallback UI."
    },
    {
      "question": "Which errors does an error boundary NOT catch?",
      "options": [
        "Render errors",
        "Event handler errors",
        "Lifecycle errors",
        "Constructor errors"
      ],
      "answer": 1,
      "explanation": "Error boundaries do not catch event handler errors. Use try-catch in event handlers and update state to show error UI."
    },
    {
      "question": "Why cant function components be error boundaries?",
      "options": [
        "React does not support hooks for error handling",
        "Function components lack getDerivedStateFromError and componentDidCatch lifecycle methods",
        "Function components are inherently less stable",
        "Error boundaries require a DOM node"
      ],
      "answer": 1,
      "explanation": "Error boundary functionality requires lifecycle methods that only exist in class components. A future React version may add hooks support."
    },
    {
      "question": "What does componentDidCatch receive?",
      "options": [
        "Only the error object",
        "The error object and an info object with componentStack",
        "The error and the offending components props",
        "Just the component stack trace"
      ],
      "answer": 1,
      "explanation": "componentDidCatch(error, info) receives the error and an info object where info.componentStack is the React component stack trace."
    },
    {
      "question": "How does the retry mechanism work in error boundaries?",
      "options": [
        "Call this.forceUpdate()",
        "Reset hasError state to false, causing React to re-render children",
        "Reload the page",
        "Call this.setState({ error: null })"
      ],
      "answer": 1,
      "explanation": "Setting hasError: false causes render() to return this.props.children again. React re-mounts the child tree from the boundary down."
    },
    {
      "question": "What is the primary purpose of granular error boundaries?",
      "options": [
        "Improve bundle size",
        "Isolate errors so one components crash does not take down unrelated parts of the UI",
        "Reduce server load",
        "Improve test coverage"
      ],
      "answer": 1,
      "explanation": "Granular boundaries ensure that a crash in one section (e.g., comments widget) does not affect other sections (e.g., product list, navigation)."
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

TOPICS_DATA["react"]["react-form-handling"] = {
  "id": "react-form-handling",
  "title": "React Form Handling",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "React form handling uses controlled components where form state lives in React state, not the DOM.",
    "Uncontrolled components use refs to access form values directly from the DOM when needed.",
    "React Hook Form, Formik, and Final Form are popular libraries that simplify form validation and submission.",
    "Form validation can be synchronous (onChange, onBlur) or asynchronous (API-based validation)."
  ],
  "laymanDefinition": "Form handling in React is about managing what users type into forms. There are two approaches: controlled (React watches every keystroke and stores the value in state) and uncontrolled (React only reads the values when the user submits). Controlled forms give you more power (instant validation, dynamic form fields, conditional sections) at the cost of more code. Uncontrolled forms are simpler but less flexible. For complex forms, libraries like React Hook Form or Formik handle all the boilerplate: validation, error messages, submission, and performance optimization so you do not have to write it yourself.",
  "deepDive": [
    {
      "heading": "Controlled vs Uncontrolled Components",
      "text": "Controlled components: React state is the single source of truth. The input value is set from state, and onChange updates state. Every keystroke triggers a render. Benefits: (1) Instant validation. (2) Conditional rendering based on input values. (3) Programmatic value changes. (4) Integration with other state. Drawbacks: (1) More boilerplate. (2) Every keystroke triggers re-render (can be optimized with debouncing). (3) Larger state for complex forms. Uncontrolled components: The DOM maintains its own state. Use refs to read values on submit. Benefits: (1) Less code. (2) No re-renders on keystroke. (3) Better performance for large forms. Drawbacks: (1) No instant validation. (2) Harder to dynamically change values. (3) Cannot conditionally render based on input values. Recommendation: controlled for most cases, uncontrolled for simple forms or performance-critical large forms."
    },
    {
      "heading": "Form Validation Strategies",
      "text": "(1) On submit validation - validate all fields when the user clicks submit. Simplest approach, used for simple forms. (2) On change validation - validate as the user types. Provides instant feedback but can be noisy (email format errors shown after first character). (3) On blur validation - validate when the field loses focus. Best UX balance - shows errors after the user finishes typing a field. (4) Debounced validation - wait for a pause in typing before validating. Best for API-based validation (checking if username is available). (5) Combination strategy: onBlur for field-level validation, onSubmit for form-level validation, debounced for async checks. Implementation: schema-based validation with Yup or Zod, or custom validation functions returning error strings."
    },
    {
      "heading": "React Hook Form (RHF): The Modern Standard",
      "text": "React Hook Form is the most popular React form library. Key features: (1) Uncontrolled by default - uses refs internally for better performance. (2) register() function connects inputs to the form state. (3) Built-in validation with HTML5 constraints and custom rules: register(\"email\", { required: \"Email is required\", pattern: { value: /^.../, message: \"Invalid email\" } }). (4) Integration with validation schemas: Yup, Zod, Joi. (5) handleSubmit() wraps submission with validation. (6) errors object for displaying error messages. (7) watch() for watching field values. (8) setValue() for programmatic updates. (9) useFieldArray for dynamic field lists. (10) Controller component for custom inputs. RHF minimizes re-renders: the form container renders once, individual fields re-render only on their own changes."
    },
    {
      "heading": "Formik: The Established Alternative",
      "text": "Formik is an older but still widely used form library. Key concepts: (1) Controlled approach - state is explicitly managed. (2) useFormik() hook or <Formik> component. (3) initialValues, validationSchema (Yup), onSubmit. (4) handleChange, handleBlur, handleSubmit are passed to inputs. (5) touched and errors objects for validation state. (6) isSubmitting for submit button state. Formik renders more than RHF because it uses controlled inputs. For most new projects, React Hook Form is recommended over Formik due to better performance and smaller bundle size. Formik is maintained but not actively evolving. RHF has better TypeScript support, better performance, and a larger ecosystem."
    },
    {
      "heading": "Custom Form Hooks and Accessibility",
      "text": "Building a custom form hook: (1) Manage form state with useReducer for complex validation. (2) Track touched fields, errors, and values. (3) Provide register() that returns { value, onChange, onBlur }. (4) Handle submission with async validation. (5) Provide reset() and setValue() methods. Accessibility essentials: (1) label elements with htmlFor matching input id. (2) aria-describedby linking to error message elements. (3) aria-invalid=\"true\" on invalid inputs. (4) role=\"alert\" on error summaries. (5) Proper tab order (tabIndex). (6) Focus management - focus the first error field on submit. (7) Error announcements for screen readers with aria-live=\"polite\"."
    }
  ],
  "interviewAnswer": "React forms use controlled components (state-driven) or uncontrolled components (ref-driven). Controlled forms offer more power (instant validation, dynamic fields) at the cost of more renders per keystroke. React Hook Form is the current best practice - it uses uncontrolled inputs for performance with register(), supports schema validation (Yup/Zod), and minimizes re-renders. Formik is a controlled alternative still in wide use. Validation strategies: onBlur (best UX), debounced (for API checks), onSubmit (simple forms). Accessibility: aria-describedby for errors, aria-invalid for invalid fields, focus management on error.",
  "interviewQuestions": [
    {
      "question": "What is the difference between controlled and uncontrolled components?",
      "answer": "Controlled: React state drives the input value (value + onChange). Uncontrolled: the DOM manages its own state, accessed via refs on submit. Controlled gives more control (instant validation, dynamic changes); uncontrolled has better performance for large forms."
    },
    {
      "question": "Why is React Hook Form faster than Formik?",
      "answer": "React Hook Form uses uncontrolled inputs by default - inputs register via refs, not state. This means keystrokes do not trigger re-renders. Formik uses controlled inputs where every keystroke updates state and re-renders the entire form."
    },
    {
      "question": "What is the register() function in React Hook Form?",
      "answer": "register() connects an input to the form state via a ref. It returns props (ref, onChange, onBlur, name) to spread onto the input. Validation rules are passed as the second argument: register(\"email\", { required: true })."
    },
    {
      "question": "How do you integrate Yup with React Hook Form?",
      "answer": "Use the @hookform/resolvers package: import { yupResolver } from \"@hookform/resolvers/yup\"; useForm({ resolver: yupResolver(schema) }). The schema defines validation rules, error messages, and types."
    },
    {
      "question": "What is the best validation strategy for a login form?",
      "answer": "onBlur validation for email format + required check. onSubmit validation for credential verification against the server. This gives immediate feedback on format errors and server feedback on submit."
    },
    {
      "question": "How do you handle dynamic form fields (add/remove items)?",
      "answer": "React Hook Form provides useFieldArray() for dynamic lists. It provides fields array, append(), remove(), insert(), swap(), move() methods. Each field needs a unique key (usually the auto-generated id from useFieldArray)."
    },
    {
      "question": "What are the accessibility requirements for form errors?",
      "answer": "(1) aria-describedby on input pointing to error element id. (2) aria-invalid=\"true\" on invalid inputs. (3) role=\"alert\" on error message. (4) aria-live=\"polite\" for dynamic error announcements. (5) Focus first error field on submit."
    },
    {
      "question": "What is the Controller component in React Hook Form?",
      "answer": "Controller wraps custom components (like React Select, date pickers) that do not expose a ref. It manages the value through render props: <Controller name=\"date\" control={control} render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />} />."
    },
    {
      "question": "How do you handle form submission with loading state?",
      "answer": "React Hook Form's handleSubmit receives an async function. The formState.isSubmitting flag shows a loading spinner. Disable the submit button during submission. Use setError() for server-side validation errors: setError(\"email\", { message: \"Email already exists\" })."
    },
    {
      "question": "What is the difference between touched and dirty in form state?",
      "answer": "touched tracks whether a field has been blurred (visited). dirty tracks whether a field value differs from its initial value. touched is used to decide when to show validation errors (show after field is visited). dirty is used to enable/disable the submit button (enable only when form is dirty)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Controlled vs Uncontrolled Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Controlled</text><text x=\"130\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">value from state, onChange updates state</text><text x=\"30\" y=\"115\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"start\">User types -> onChange -> setState -> re-render -> new value</text><text x=\"30\" y=\"135\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"start\">State is source of truth. Every keystroke = 1 render.</text><rect x=\"400\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"500\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Uncontrolled</text><text x=\"500\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">DOM manages own value, ref reads on submit</text><text x=\"400\" y=\"115\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">User types -> DOM updates -> no React re-render</text><text x=\"400\" y=\"135\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"start\">Read value when needed (submit) via ref.current</text><text x=\"30\" y=\"200\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\">React Hook Form = best of both:</text><text x=\"30\" y=\"220\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Uncontrolled inputs (no re-renders on keystroke) +</text><text x=\"30\" y=\"240\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">React-style validation and error management</text></svg>",
  "codeExamples": [
    {
      "title": "React Hook Form with Yup Validation",
      "useCase": "Complete form with validation, error display, and submission",
      "code": "import { useForm } from \"react-hook-form\";\nimport { yupResolver } from \"@hookform/resolvers/yup\";\nimport * as yup from \"yup\";\n\nconst schema = yup.object({\n  name: yup.string().required(\"Name is required\").min(2, \"Too short\"),\n  email: yup.string().required(\"Email is required\").email(\"Invalid email\"),\n  age: yup.number().required().min(18, \"Must be 18+\").max(120),\n  password: yup.string().required().min(8, \"Min 8 characters\"),\n  confirmPassword: yup.string()\n    .oneOf([yup.ref(\"password\")], \"Passwords must match\")\n});\n\nfunction RegistrationForm() {\n  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({\n    resolver: yupResolver(schema)\n  });\n\n  const onSubmit = async (data) => {\n    await fetch(\"/api/register\", { method: \"POST\", body: JSON.stringify(data) });\n    reset();\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)} noValidate>\n      <div>\n        <label htmlFor=\"name\">Name</label>\n        <input id=\"name\" {...register(\"name\")} aria-invalid={errors.name ? \"true\" : undefined} />\n        {errors.name && <p role=\"alert\" className=\"error\">{errors.name.message}</p>}\n      </div>\n      <div>\n        <label htmlFor=\"email\">Email</label>\n        <input id=\"email\" type=\"email\" {...register(\"email\")} />\n        {errors.email && <p role=\"alert\">{errors.email.message}</p>}\n      </div>\n      <div>\n        <label htmlFor=\"password\">Password</label>\n        <input id=\"password\" type=\"password\" {...register(\"password\")} />\n        {errors.password && <p role=\"alert\">{errors.password.message}</p>}\n      </div>\n      <button type=\"submit\" disabled={isSubmitting}>\n        {isSubmitting ? \"Submitting...\" : \"Register\"}\n      </button>\n    </form>\n  );\n}",
      "description": "The Yup schema defines all validation rules declaratively. React Hook Form integrates via yupResolver. Errors appear after onBlur (default RHF behavior). The submit button shows loading state. accessibility: htmlFor/labels, aria-invalid, role=\"alert\" on errors."
    },
    {
      "title": "Custom Controlled Input Component with Validation",
      "useCase": "Building a reusable text input with built-in validation",
      "code": "function FormField({ label, name, register, errors, type = \"text\", validation }) {\n  return (\n    <div className=\"form-field\">\n      <label htmlFor={name}>{label}</label>\n      <input\n        id={name}\n        type={type}\n        aria-invalid={errors[name] ? \"true\" : undefined}\n        aria-describedby={errors[name] ? name + \"-error\" : undefined}\n        {...register(name, validation)}\n      />\n      {errors[name] && (\n        <p id={name + \"-error\"} className=\"error\" role=\"alert\">\n          {errors[name].message}\n        </p>\n      )}\n    </div>\n  );\n}\n\nfunction ProfileForm() {\n  const { register, handleSubmit, formState: { errors }, watch } = useForm({\n    defaultValues: {\n      displayName: \"\",\n      bio: \"\",\n      website: \"\",\n      theme: \"light\"\n    }\n  });\n\n  const theme = watch(\"theme\");\n\n  return (\n    <form onSubmit={handleSubmit(data => console.log(data))}>\n      <FormField label=\"Display Name\" name=\"displayName\"\n        register={register} errors={errors}\n        validation={{ required: \"Display name is required\" }}\n      />\n      <FormField label=\"Bio\" name=\"bio\"\n        register={register} errors={errors}\n        validation={{ maxLength: { value: 500, message: \"Max 500 characters\" } }}\n      />\n      <select {...register(\"theme\")}>\n        <option value=\"light\">Light</option>\n        <option value=\"dark\">Dark</option>\n      </select>\n      {theme === \"dark\" && <p className=\"info\">Tip: Use light mode for better readability</p>}\n      <input type=\"submit\" />\n    </form>\n  );\n}",
      "description": "The reusable FormField component encapsulates label/input/error patterns. watch() enables conditional rendering based on form values. defaultValues provide initial state. Each field has proper aria attributes for accessibility."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a controlled component?",
      "options": [
        "A component where the DOM manages its own state",
        "A component where React state drives the input value via value + onChange",
        "A component that uses refs to read values",
        "A component that cannot be validated"
      ],
      "answer": 1,
      "explanation": "In controlled components, React state is the single source of truth. The input value comes from state, and state is updated via onChange."
    },
    {
      "question": "What is the main advantage of React Hook Form over Formik?",
      "options": [
        "Better TypeScript support",
        "Better performance (uncontrolled by default, fewer re-renders)",
        "Larger bundle size",
        "More boilerplate"
      ],
      "answer": 1,
      "explanation": "React Hook Form uses uncontrolled inputs to minimize re-renders. Formik uses controlled inputs that re-render the form on every keystroke."
    },
    {
      "question": "What does the register() function return?",
      "options": [
        "A state object",
        "Props to spread onto an input (ref, onChange, onBlur, name)",
        "A validation schema",
        "An error object"
      ],
      "answer": 1,
      "explanation": "register() returns the props needed to connect an input to the form state. Spread them onto the input: {...register(\"field\")}."
    },
    {
      "question": "Which validation strategy provides the best UX balance?",
      "options": [
        "On submit only",
        "On blur (validate when field loses focus)",
        "On every keystroke",
        "No validation"
      ],
      "answer": 1,
      "explanation": "onBlur shows errors after the user finishes typing a field, providing feedback without the noise of per-keystroke validation."
    },
    {
      "question": "What is the purpose of aria-describedby on a form input?",
      "options": [
        "Sets the input label",
        "Links the input to its error message element for screen reader announcements",
        "Changes the input type",
        "Enables autocomplete"
      ],
      "answer": 1,
      "explanation": "aria-describedby points to the ID of the error message element. Screen readers announce the error message when the input receives focus."
    },
    {
      "question": "What does the Controller component wrap?",
      "options": [
        "Native HTML inputs",
        "Custom components (like React Select, date pickers) that do not expose a ref",
        "React Router links",
        "Context providers"
      ],
      "answer": 1,
      "explanation": "Controller wraps components that cannot use register() because they do not expose a ref. It manages the value through a render prop with field (value, onChange, onBlur)."
    }
  ]
};

TOPICS_DATA["react"]["react-forward-ref"] = {
  "id": "react-forward-ref",
  "title": "React forwardRef",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "forwardRef lets a parent component pass a ref through a child component to one of its DOM elements.",
    "It wraps a function component to accept a ref as the second argument after props.",
    "Essential for reusable component libraries where the parent needs imperative access to internal DOM nodes.",
    "forwardRef is often combined with useImperativeHandle to expose a limited API instead of the raw DOM node."
  ],
  "laymanDefinition": "forwardRef is like giving a child component a forwarding address. Normally, function components do not accept refs (they are not DOM elements). But forwardRef creates a \"forwarding address\" so the parent can send a ref to a child and have it automatically forwarded to a specific DOM element inside the child. This is useful when you build reusable components like FancyInput or CustomButton - the parent should be able to call .focus() on them, but the actual <input> is inside the child. Without forwardRef, you would need to expose a focus method manually or use prop drilling.",
  "deepDive": [
    {
      "heading": "How forwardRef Works",
      "text": "forwardRef accepts a render function with two parameters: (props, ref). The component returns JSX normally, but attaches the ref to a specific DOM element (or another component). The ref passed by the parent arrives as the second argument. React handles the ref forwarding automatically during reconciliation: when the parent passes ref={myRef} to the wrapped component, the inner render function receives the ref and can attach it to a child. forwardRef is a higher-order component conceptually - it wraps the inner component and returns a new component that accepts ref. The ref is not a prop - React treats ref specially and does not pass it as props[ref]. forwardRef bridges this gap by making the ref accessible in the function signature."
    },
    {
      "heading": "forwardRef with useImperativeHandle",
      "text": "useImperativeHandle customizes the instance value exposed by the forwarded ref. Instead of exposing the raw DOM node, the child defines a limited API object. Example: useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus(), reset: () => { inputRef.current.value = \"\"; }, validate: () => inputRef.current.checkValidity() }), []). The parent receives { focus, reset, validate } instead of the raw <input> element. Benefits: encapsulation (parent cannot access arbitrary DOM properties), abstraction (internal implementation can change without affecting parent), and security (expose only safe operations). Use useImperativeHandle sparingly - prefer declarative props over imperative refs when possible."
    },
    {
      "heading": "When to Use forwardRef",
      "text": "(1) Reusable input components - FancyInput, PhoneInput, DatePicker where the parent needs to focus or validate. (2) Animation libraries - GSAP, Framer Motion need direct DOM access to animated elements inside custom components. (3) Scroll management - scrollTo methods on custom list components. (4) Media components - play/pause/seek on custom VideoPlayer. (5) Third-party library integration - D3, Chart.js, Leaflet need DOM nodes. (6) Measuring/positioning - getBoundingClientRect on internal elements. (7) Form libraries - react-hook-form uses refs for input registration. (8) Do NOT use forwardRef when the parent only needs to pass data - use props instead. forwardRef is for imperative access to DOM or component instance methods."
    },
    {
      "heading": "forwardRef with TypeScript",
      "text": "TypeScript typing for forwardRef requires careful generic syntax: const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>((props, ref) => <input ref={ref} ... />). The first generic parameter is the ref type (HTMLInputElement), the second is the props type. The ref type must match the element type the ref is attached to. For useImperativeHandle, define a handle interface: interface FancyInputHandle { focus(): void; reset(): void; }. Then: React.forwardRef<FancyInputHandle, Props>((props, ref) => { useImperativeHandle(ref, () => ({ focus, reset }), []); ... }). The parent receives typed access: const ref = useRef<FancyInputHandle>(null); ref.current?.focus()."
    },
    {
      "heading": "forwardRef with Higher-Order Components",
      "text": "When combining forwardRef with HOCs (connect, withRouter, withStyles), ref forwarding must be manually handled. The HOC typically consumes the ref in its outer component and must forward it using forwardRef. This was a common pain point in class-component era Redux. Modern pattern: Redux Toolkit's connect has a { forwardRef: true } option. For custom HOCs, the pattern is: function withHOC(Component) { return React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />); }. The inner component receives ref via forwardedRef prop. Avoid combining multiple HOCs with forwardRef - prefer hooks for cross-cutting concerns."
    }
  ],
  "interviewAnswer": "forwardRef allows a function component to accept a ref from its parent and forward it to a child DOM element. The component receives (props, ref) as arguments. forwardRef is essential for reusable component libraries where parents need imperative access (focus, scroll, measure). Combine with useImperativeHandle to expose a limited API instead of the raw DOM node. forwardRef supports TypeScript generics for type-safe refs. Avoid forwardRef when declarative props suffice - it is an escape hatch for imperative operations.",
  "interviewQuestions": [
    {
      "question": "What problem does forwardRef solve?",
      "answer": "Function components do not accept refs by default. forwardRef creates a bridge so the parent can pass a ref through a child component to a specific DOM element inside it. Without forwardRef, the ref prop is ignored on function components."
    },
    {
      "question": "How is forwardRef different from passing a ref prop?",
      "answer": "forwardRef uses Reacts built-in ref mechanism (second argument in the function signature). Passing a ref as a regular prop (e.g., <Child innerRef={ref} />) works but is non-standard and loses Reacts ref integration (e.g., callback refs, ref cleanup in React 18). forwardRef is the idiomatic approach."
    },
    {
      "question": "What does useImperativeHandle do?",
      "answer": "It customizes the value exposed by the forwarded ref. Instead of exposing the raw DOM node, the child defines a specific API object (e.g., { focus, reset }). This encapsulates the implementation and prevents the parent from accessing arbitrary DOM properties."
    },
    {
      "question": "What is the TypeScript syntax for forwardRef?",
      "answer": "React.forwardRef<RefType, PropsType>((props, ref) => ...). RefType is the type of the element or handle (e.g., HTMLInputElement or a custom interface). PropsType is the components props interface."
    },
    {
      "question": "Can forwardRef be used with React.memo?",
      "answer": "Yes: React.memo(React.forwardRef(MyComponent)). Both HOCs compose correctly. The memoization compares the props (ref is excluded from comparison). The forwarded ref works normally through the memo wrapper."
    },
    {
      "question": "When should you NOT use forwardRef?",
      "answer": "When the parent only needs to pass data or callbacks to the child. Use regular props instead. forwardRef is for imperative operations: focus, scroll, measure, play, seek. For data flow, props are declarative and should be preferred."
    },
    {
      "question": "How does forwardRef work with ref callback patterns?",
      "answer": "Callback refs work the same way: the parent passes a callback function to ref, which forwardRef passes to the child. The child calls the callback with the DOM node when it mounts and null when it unmounts."
    },
    {
      "question": "What happens if a forwarded ref is not attached to any DOM element?",
      "answer": "The ref.current will be null. This happens if the child does not use the ref or if the component renders conditionally. The parent must check ref.current !== null before accessing properties."
    },
    {
      "question": "Can you forward multiple refs from a single component?",
      "answer": "No, forwardRef forwards only one ref. For multiple refs, use multiple wrapper components or pass additional refs via custom prop names (e.g., innerRef, scrollRef). React does not support forwarding multiple refs through a single forwardRef call."
    },
    {
      "question": "How do you debug ref forwarding issues?",
      "answer": "Check that: (1) the component is wrapped in forwardRef, (2) the ref is attached to a DOM element (not a function component without forwardRef), (3) the parent creates the ref with useRef(null), (4) the component is mounted (ref.current is null before mount). React DevTools shows which components use forwardRef."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">forwardRef Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Parent</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">const inputRef = useRef(null)</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"120\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"120\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"135\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\"><FancyInput ref={inputRef}></text><text x=\"130\" y=\"152\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">forwardRef wrapper</text><line x1=\"130\" y1=\"160\" x2=\"130\" y2=\"180\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"180\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"197.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\"><input ref={ref} /></text><text x=\"130\" y=\"214.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">DOM element receives the ref</text><text x=\"250\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">useRef creates ref object</text><text x=\"250\" y=\"135\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">forwardRef passes ref as 2nd arg</text><text x=\"250\" y=\"200\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">inputRef.current = actual <input> DOM</text></svg>",
  "codeExamples": [
    {
      "title": "Reusable FancyInput with forwardRef and useImperativeHandle",
      "useCase": "Expose a focused API, not the raw DOM node",
      "code": "const FancyInput = React.forwardRef((props, ref) => {\n  const inputRef = useRef(null);\n\n  useImperativeHandle(ref, () => ({\n    focus: () => {\n      inputRef.current.focus();\n      inputRef.current.style.outline = \"2px solid #6c9fff\";\n    },\n    reset: () => { inputRef.current.value = \"\"; },\n    validate: () => inputRef.current.checkValidity()\n  }), []);\n\n  return (\n    <div className=\"fancy-input\">\n      <label>{props.label}</label>\n      <input ref={inputRef} {...props} className=\"input-field\" />\n    </div>\n  );\n});\n\nfunction Form() {\n  const emailRef = useRef(null);\n  const passwordRef = useRef(null);\n\n  useEffect(() => { emailRef.current.focus(); }, []);\n\n  return (\n    <form>\n      <FancyInput ref={emailRef} label=\"Email\" type=\"email\" />\n      <FancyInput ref={passwordRef} label=\"Password\" type=\"password\" />\n      <button type=\"button\" onClick={() => {\n        if (!emailRef.current.validate()) emailRef.current.focus();\n      }}>Submit</button>\n    </form>\n  );\n}",
      "description": "The parent receives a clean API (focus, reset, validate) instead of the raw input element. The implementation can change (e.g., switch from <input> to a third-party component) without affecting the parent."
    },
    {
      "title": "forwardRef with Animation Library (GSAP)",
      "useCase": "Direct DOM access for animations inside a custom component",
      "code": "const AnimatedCard = React.forwardRef(({ children, ...props }, ref) => {\n  return (\n    <div ref={ref} className=\"card\" {...props}>\n      {children}\n    </div>\n  );\n});\n\nfunction App() {\n  const cardRef = useRef(null);\n\n  useEffect(() => {\n    gsap.from(cardRef.current, {\n      opacity: 0,\n      y: 50,\n      duration: 0.6,\n      ease: \"power3.out\"\n    });\n  }, []);\n\n  return (\n    <AnimatedCard ref={cardRef}>\n      <h2>Animated Content</h2>\n      <p>This card fades in and slides up using GSAP.</p>\n    </AnimatedCard>\n  );\n}",
      "description": "GSAP needs the actual DOM node to animate. forwardRef provides direct access to the card div inside AnimatedCard. The parent creates the animation imperatively without the child needing to know about GSAP."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does forwardRef do?",
      "options": [
        "Creates a new ref",
        "Allows function components to receive a ref from parent and forward it to a DOM element",
        "Creates a forwarded copy of the component",
        "Prevents refs from being passed to children"
      ],
      "answer": 1,
      "explanation": "forwardRef wraps a function component so it receives ref as the second argument, enabling ref forwarding to a child DOM element."
    },
    {
      "question": "How many parameters does a forwardRef render function receive?",
      "options": [
        "One: props",
        "Two: (props, ref)",
        "Three: (props, ref, context)",
        "Four: (props, ref, context, owner)"
      ],
      "answer": 1,
      "explanation": "The render function inside forwardRef receives props as the first argument and ref as the second argument."
    },
    {
      "question": "What hook customizes the value exposed by a forwarded ref?",
      "options": [
        "useRef",
        "useImperativeHandle",
        "useCallback",
        "useMemo"
      ],
      "answer": 1,
      "explanation": "useImperativeHandle(ref, createHandle, deps) defines the object that the parent receives when accessing ref.current."
    },
    {
      "question": "Can forwardRef be used with class components?",
      "options": [
        "Yes, class components also need forwardRef",
        "No, forwardRef is only for function components (class components already accept refs)",
        "Only with PureComponent",
        "Only with TypeScript"
      ],
      "answer": 1,
      "explanation": "Class components already support refs natively via the instance. forwardRef is specifically for function components that cannot accept refs directly."
    },
    {
      "question": "What is the second generic parameter in React.forwardRef<RefType, PropsType>?",
      "options": [
        "The ref type",
        "The props type",
        "The return type",
        "The children type"
      ],
      "answer": 1,
      "explanation": "The first generic is the ref (element or handle) type. The second generic is the props type. Example: React.forwardRef<HTMLInputElement, { label: string }>."
    },
    {
      "question": "Which is NOT a valid use case for forwardRef?",
      "options": [
        "Focus management on a custom input",
        "Passing data to a child component",
        "Integrating with animation libraries",
        "Measuring DOM element dimensions"
      ],
      "answer": 1,
      "explanation": "forwardRef is for imperative operations (focus, measure, animate). Data passing should use declarative props."
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

TOPICS_DATA["react"]["react-hydration"] = {
  "id": "react-hydration",
  "title": "React Hydration",
  "difficulty": "advanced",
  "estimatedMinutes": 25,
  "tldr": [
    "Hydration is the process where React attaches event listeners and state to server-rendered HTML, making it interactive.",
    "ReactDOM.hydrateRoot() in React 18 replaces ReactDOM.hydrate() for attaching to pre-rendered HTML.",
    "Hydration mismatches occur when server HTML differs from the first client render - React attempts to reconcile but logs warnings.",
    "Streaming SSR in React 18 enables selective hydration - components hydrate as their content streams in."
  ],
  "laymanDefinition": "Hydration is like taking a photograph of a finished house (server-side rendered HTML) and then moving real furniture and people into it (making it interactive with JavaScript). The server sends HTML that looks complete (the photo), but the buttons do not work and nothing responds to clicks. Hydration is the process of attaching all the JavaScript event handlers, state, and logic to that static HTML so it becomes a living, interactive app. React walks through the server-rendered DOM tree, matches it to components, and attaches event listeners without recreating the DOM from scratch. This gives the user a fast initial paint (they see content immediately) while the JavaScript loads and hydrates.",
  "deepDive": [
    {
      "heading": "How Hydration Works",
      "text": "When the server sends HTML (from renderToString or renderToPipeableStream), ReactDOM.hydrateRoot() takes over. It traverses the existing DOM tree and matches DOM nodes to React components. For each node, React attaches event listeners and initializes state without recreating the DOM element. This is fundamentally different from client-only rendering where React creates all DOM elements from scratch. Hydration is a one-time operation - after hydration completes, React switches to regular client-side rendering for subsequent updates. The key constraint: the server-rendered HTML must exactly match the first client render output. If there is a mismatch (different text, different attributes), React must reconcile the difference, which involves replacing parts of the DOM tree and can cause layout shifts or flickers."
    },
    {
      "heading": "Hydration Mismatches: Causes and Solutions",
      "text": "Common causes of hydration mismatches: (1) Browser-only APIs - using window, document, localStorage during server render. (2) Dynamic timestamps or random values - Date.now(), Math.random(), or uuid generation produce different values on server vs client. (3) Different data - API responses may differ between server and client. (4) CSS-in-JS - server-rendered class names differ from client-rendered ones. (5) Browser extensions modifying the DOM. Solutions: (1) Use useEffect for browser-only code - the initial render matches the server. (2) Suppress hydration warnings with suppressHydrationWarning for intentional differences (timestamps). (3) Use next/dynamic or lazy loading with ssr:false for components that must differ. (4) Use consistent CSS-in-JS configuration (ExtractCritical for Emotion, styled-components ServerStyleSheet). (5) Ensure API data is consistent (serialize data in the HTML and hydrate from it)."
    },
    {
      "heading": "Streaming SSR and Selective Hydration (React 18)",
      "text": "React 18 introduces streaming SSR via renderToPipeableStream. The server sends HTML in chunks as components render. Suspense boundaries define streaming points - each boundary streams independently. Selective hydration: React can hydrate components as their HTML arrives, without waiting for the full page. This means: (1) The page shell hydrates first, making the header and navigation interactive. (2) Below-the-fold content hydrates later when its chunk arrives. (3) The user can interact with already-hydrated parts while other parts are still loading. (4) Priority is given to hydrating visible content first (hydration is prioritized like rendering). (5) This dramatically improves Time to Interactive (TTI) for complex pages. The same Suspense boundaries used for code splitting double as streaming boundaries."
    },
    {
      "heading": "ReactDOM.hydrateRoot() API (React 18)",
      "text": "React 18 replaces ReactDOM.hydrate() with ReactDOM.hydrateRoot(): ReactDOM.hydrateRoot(document.getElementById(\"root\"), <App />). Differences: (1) hydrateRoot does not take a callback - use useEffect instead. (2) hydrateRoot returns a Root object with render() and unmount() methods. (3) hydrateRoot supports concurrent features like transitions and Suspense. (4) The root can be updated with root.render(<NewApp />) for updates. (5) There is no hydrate() in React 18 - it was removed. Migration: replace ReactDOM.hydrate(element, container, callback) with ReactDOM.hydrateRoot(container, element). The callback pattern changes to useEffect in the root component."
    },
    {
      "heading": "Hydration Performance Optimization",
      "text": "(1) Minimize hydration work - hydrate only once and avoid unnecessary tree walks. Each extra DOM node increases hydration time. (2) Lazy hydrate non-critical components - use libraries like react-lazily or custom IntersectionObserver-based hydration for below-the-fold content. (3) Partial hydration (islands architecture) - only hydrate interactive components on a mostly static page. Frameworks like Astro, Fresh, and Qwik use this approach. (4) Progressive hydration - hydrate sections in order of user interaction priority (navbar first, main content second, footer last). (5) Avoid hydration regressions - use lint rules to catch common mismatch patterns. (6) Measure hydration time with Performance Observer API or React Profiler. (7) For large lists, virtualize both server and client rendering to reduce hydration DOM size."
    }
  ],
  "interviewAnswer": "Hydration attaches React event handlers and state to server-rendered HTML, making it interactive without recreating the DOM. ReactDOM.hydrateRoot() in React 18 traverses the existing DOM tree, matches nodes to components, and attaches listeners. Hydration mismatches occur when server HTML differs from client render - caused by browser APIs, timestamps, or inconsistent data. React 18's streaming SSR with selective hydration hydrates components as their HTML streams, improving TTI. Minimize hydration overhead with lazy hydration for non-critical components.",
  "interviewQuestions": [
    {
      "question": "What is hydration?",
      "answer": "Hydration is the process where React takes over server-rendered HTML and attaches event listeners, state, and interactivity without recreating the DOM. It makes a static HTML page into a fully interactive React app."
    },
    {
      "question": "What is the difference between ReactDOM.hydrate() and ReactDOM.hydrateRoot()?",
      "answer": "hydrateRoot is the React 18 replacement. hydrateRoot does not accept a callback, supports concurrent features, and returns a Root object. hydrate() is removed in React 18. Migration: replace hydrate() with hydrateRoot()."
    },
    {
      "question": "What causes a hydration mismatch?",
      "answer": "Differences between server-rendered HTML and first client render output. Common causes: browser APIs (window, document), dynamic values (Date.now(), Math.random()), different API data, CSS-in-JS class name differences, browser extensions modifying the DOM."
    },
    {
      "question": "How do you fix hydration mismatches intentionally?",
      "answer": "Use suppressHydrationWarning attribute on the element. This tells React to skip the mismatch check for that specific element. Use sparingly - only for truly unavoidable differences like timestamps."
    },
    {
      "question": "What is selective hydration?",
      "answer": "React 18 feature where components hydrate as their content streams from the server, rather than waiting for the full page. Suspense boundaries define hydration points. Already-hydrated components are interactive while others still load."
    },
    {
      "question": "How does streaming SSR work with hydration?",
      "answer": "The server sends HTML in chunks via renderToPipeableStream. Each Suspense boundary streams independently. As each chunk arrives, React can hydrate that portion of the page selectively without waiting for the full stream."
    },
    {
      "question": "What is the islands architecture?",
      "answer": "An approach where only interactive \"islands\" of components are hydrated on a mostly static page. Non-interactive content remains as static HTML without JavaScript. Frameworks: Astro, Fresh, Qwik. This minimizes hydration work."
    },
    {
      "question": "How do you lazy hydrate components?",
      "answer": "Use IntersectionObserver-based hydration: hydrate a component only when it scrolls into the viewport. Libraries like react-lazily or custom hooks detect visibility and trigger hydration. Reduces initial hydration work for below-the-fold content."
    },
    {
      "question": "What is the relationship between Suspense and hydration?",
      "answer": "Suspense boundaries act as hydration boundaries in React 18 streaming SSR. Each Suspense boundary streams independently and hydrates independently. Nested Suspense enables progressive hydration with granular loading states."
    },
    {
      "question": "How do you measure hydration performance?",
      "answer": "Use Performance Observer (performance.mark/measure), React DevTools Profiler (records hydration commit), or custom timing with useEffect. Key metrics: time to interactive (TTI), first input delay (FID), and hydration DOM size."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Hydration Process</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Server Sends HTML</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Static HTML with content</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"120\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"120\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"135\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Browser Renders HTML</text><text x=\"130\" y=\"152\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">User sees content immediately</text><line x1=\"130\" y1=\"160\" x2=\"130\" y2=\"180\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"180\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"197.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">hydrateRoot()</text><text x=\"130\" y=\"214.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React attaches to existing DOM</text></svg>",
  "codeExamples": [
    {
      "title": "React 18 Hydration with Streaming SSR",
      "useCase": "Complete setup for a streaming SSR app",
      "code": "// Server (Node.js with Express):\nimport { renderToPipeableStream } from \"react-dom/server\";\nimport App from \"./App\";\n\napp.get(\"/\", (req, res) => {\n  res.setHeader(\"Content-Type\", \"text/html\");\n  res.write('<div id=\"root\">');\n  const { pipe } = renderToPipeableStream(<App />, {\n    onShellReady() {\n      pipe(res);\n    },\n    onError(err) {\n      console.error(err);\n    }\n  });\n  res.write('</div><script src=\"/bundle.js\"></script>');\n});\n\n// Client:\nimport { hydrateRoot } from \"react-dom/client\";\nimport App from \"./App\";\n\nhydrateRoot(document.getElementById(\"root\"), <App />);\n\n// App with Suspense boundaries for streaming:\nfunction App() {\n  return (\n    <html lang=\"en\">\n      <head><title>My App</title></head>\n      <body>\n        <Navbar />\n        <Suspense fallback={<MainSkeleton />}>\n          <MainContent />\n        </Suspense>\n        <Suspense fallback={<SidebarSkeleton />}>\n          <Sidebar />\n        </Suspense>\n      </body>\n    </html>\n  );\n}",
      "description": "The server streams HTML. The client calls hydrateRoot once. Suspense boundaries in App become streaming points - each boundary's HTML streams independently. React hydrates each section when its chunk arrives."
    },
    {
      "title": "Common Hydration Mismatch Pattern and Fix",
      "useCase": "Avoiding hydration issues with browser-only content",
      "code": "// BAD: Causes hydration mismatch\nfunction TimeDisplay() {\n  return <p>Current time: {new Date().toLocaleTimeString()}</p>;\n}\n\n// GOOD: Match server render, update on client\nfunction TimeDisplay() {\n  const [time, setTime] = useState(null);\n\n  useEffect(() => {\n    setTime(new Date().toLocaleTimeString());\n    const interval = setInterval(() => {\n      setTime(new Date().toLocaleTimeString());\n    }, 1000);\n    return () => clearInterval(interval);\n  }, []);\n\n  // Server and first client render: show placeholder\n  // After hydration, useEffect updates to real time\n  return <p>Current time: {time ?? \"loading...\"}</p>;\n}\n\n// BAD: Browser API during render\nfunction WindowSize() {\n  const width = window.innerWidth; // crashes on server!\n  return <p>Width: {width}</p>;\n}\n\n// GOOD: Use useEffect for browser code\nfunction WindowSize() {\n  const [width, setWidth] = useState(1024); // sensible default\n\n  useEffect(() => {\n    setWidth(window.innerWidth);\n    const handle = () => setWidth(window.innerWidth);\n    window.addEventListener(\"resize\", handle);\n    return () => window.removeEventListener(\"resize\", handle);\n  }, []);\n\n  return <p>Width: {width}px</p>;\n}",
      "description": "The time and window width examples show the pattern: render the same thing on server and client first render, then use useEffect to update with the real value on the client. This avoids hydration mismatch while still providing correct interactive values."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does hydration do?",
      "options": [
        "Renders React on the server",
        "Attaches event listeners and state to server-rendered HTML without recreating the DOM",
        "Creates new DOM elements from scratch",
        "Removes server-rendered content"
      ],
      "answer": 1,
      "explanation": "Hydration walks the existing DOM tree, matches nodes to components, and attaches interactivity without recreating the DOM."
    },
    {
      "question": "What is the React 18 API for hydration?",
      "options": [
        "ReactDOM.hydrate()",
        "ReactDOM.hydrateRoot()",
        "ReactDOM.createRoot()",
        "ReactDOM.render()"
      ],
      "answer": 1,
      "explanation": "ReactDOM.hydrateRoot(container, element) is the React 18 API. hydrate() is removed in React 18."
    },
    {
      "question": "What causes a hydration mismatch?",
      "options": [
        "The server has different React version",
        "Server HTML differs from the first client render output",
        "The client has no internet",
        "The bundle is too large"
      ],
      "answer": 1,
      "explanation": "Any difference between server-rendered HTML and the first client render output causes a mismatch warning. React may need to replace parts of the DOM tree to fix the mismatch."
    },
    {
      "question": "What is selective hydration?",
      "options": [
        "Choosing which components to hydrate",
        "Hydrating components as their content streams from the server, one Suspense boundary at a time",
        "Hydrating only on mobile devices",
        "Hydrating in the background"
      ],
      "answer": 1,
      "explanation": "Selective hydration allows components to hydrate independently as their streaming HTML arrives, without waiting for the full page."
    },
    {
      "question": "How do you fix an intentional hydration mismatch?",
      "options": [
        "Ignore the warning",
        "Use suppressHydrationWarning on the element",
        "Wrap the component in an error boundary",
        "Use React.memo"
      ],
      "answer": 1,
      "explanation": "suppressHydrationWarning tells React to skip the mismatch check for that specific element. Use only for unavoidable differences."
    },
    {
      "question": "What is the islands architecture pattern?",
      "options": [
        "Only interactive components are hydrated; static content remains as HTML without JavaScript",
        "Every element is hydrated",
        "No JavaScript is used at all",
        "All components are server-only"
      ],
      "answer": 1,
      "explanation": "In islands architecture, non-interactive content is pure HTML without JS. Only interactive \"islands\" (buttons, forms, widgets) are hydrated, minimizing JS payload."
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

TOPICS_DATA["react"]["react-lazy-loading"] = {
  "id": "react-lazy-loading",
  "title": "React Lazy Loading",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "React.lazy enables dynamic import of components, loading them only when they are first rendered.",
    "It must be used with Suspense to provide a fallback UI while the component is being loaded.",
    "Lazy loading splits the bundle into smaller chunks, reducing initial page load time.",
    "It works out of the box with Create React App, Next.js dynamic imports, and Vite."
  ],
  "laymanDefinition": "React lazy loading is like having a Netflix-style loading for your components. Instead of downloading the entire app code at once (like buying a whole Blu-ray box set), you download only the parts the user needs right now (like streaming just the episode they want to watch). React.lazy tells React \"this component is in a separate file - load it when you need it.\" Combined with Suspense, you can show a spinner or placeholder while the chunk loads. This dramatically reduces the initial bundle size for large apps with many routes or heavy third-party libraries.",
  "deepDive": [
    {
      "heading": "How React.lazy Works",
      "text": "React.lazy takes a function that returns a dynamic import: React.lazy(() => import(\"./HeavyComponent\")). The import() is a webpack/ES module dynamic import syntax that tells the bundler to create a separate chunk file. When React first attempts to render the lazy component, it triggers the dynamic import, which initiates a network request for that chunk. While the chunk is loading, React suspends and looks up the nearest Suspense boundary to render the fallback. Once the chunk loads and resolves, React renders the actual component. If the import fails, the Suspense boundary can catch the error with an error boundary. React.lazy only supports default exports - named exports require an intermediate module."
    },
    {
      "heading": "Code Splitting Architecture with React.lazy",
      "text": "The typical pattern is route-based code splitting: each top-level route gets its own chunk. This aligns with user behavior - users on the home page do not need the settings page code. Example: const Home = React.lazy(() => import(\"./routes/Home\")). The bundler creates separate chunks for each lazy route. Chunk naming can be customized with webpack magic comments: import(/* webpackChunkName: \"home\" */ \"./routes/Home\"). For optimal loading: (1) Split at route boundaries, not component boundaries (too many small chunks = many HTTP requests). (2) Preload critical routes using <link rel=\"prefetch\"> or webpack preload/prefetch. (3) Use Suspense with a meaningful fallback (skeleton screens > spinners). (4) Combine with React.memo for components that appear in multiple routes."
    },
    {
      "heading": "Suspense and Fallback Strategies",
      "text": "Suspense is the required wrapper for lazy components. It takes a fallback prop: <Suspense fallback={<Spinner />}>. The fallback renders while any lazy component within the Suspense boundary is loading. Key strategies: (1) One Suspense per route for independent loading states. (2) Nested Suspense for granular loading - parent Suspense shows page shell, child Suspense shows section spinners. (3) SuspenseList (React experimental) for coordinating loading sequences. (4) Skeleton screens as fallbacks (match the layout of the actual component) to reduce layout shift (CLS). (5) Avoid wrapping an entire app in a single Suspense - a loading spinner replacing the whole page is poor UX. (6) In React 18, Suspense also works with server-side streaming and data fetching (concurrent features)."
    },
    {
      "heading": "Error Handling with Error Boundaries",
      "text": "Lazy imports can fail due to network errors, server issues, or chunk load failures. React.lazy does not provide built-in error handling - you must wrap the Suspense boundary with an error boundary. A custom ErrorBoundary class component (with componentDidCatch) wraps the Suspense and renders a fallback UI (retry button, error message) when chunk loading fails. For production: (1) Implement a RetryErrorBoundary that tries to reload the chunk. (2) Log chunk load failures to your monitoring service. (3) Provide a \"Something went wrong\" UI with a retry action. (4) Consider service worker caching for chunks to improve reliability. (5) Use webpack's chunk loading retry mechanism for transient failures."
    },
    {
      "heading": "Performance Considerations and Bundle Analysis",
      "text": "Measure before and after with webpack-bundle-analyzer or source-map-explorer. Goals: (1) Initial bundle (main.js) should be under 200KB gzipped for fast first paint. (2) Each route chunk should be independently cacheable. (3) Avoid splitting very small components (< 5KB) - the HTTP overhead outweighs the benefit. (4) Consider using preload for chunks needed soon (e.g., next route prefetched on hover). (5) Monitor chunk sizes in CI to prevent regression. (6) Use import() for non-component modules too (utility libraries like moment.js, lodash) to defer their loading to when they are actually needed. (7) React.lazy combined with Suspense is the recommended approach for most React apps - it works with all modern bundlers and frameworks."
    }
  ],
  "interviewAnswer": "React.lazy enables dynamic import of components for code splitting. It takes a function that returns import(\"./Component\") and creates a separate bundle chunk. Lazy components must be wrapped in Suspense with a fallback UI shown during loading. The primary use case is route-based splitting where each page loads on demand, reducing the initial bundle. Error boundaries handle import failures (network errors). React.lazy only supports default exports. Combine with webpack magic comments for explicit chunk naming. Measure bundle impact with webpack-bundle-analyzer. Avoid splitting tiny components (under 5KB) where HTTP overhead negates the benefit.",
  "interviewQuestions": [
    {
      "question": "What does React.lazy do?",
      "answer": "React.lazy creates a lazily-loaded component from a dynamic import. The component is not loaded until React attempts to render it. This enables code splitting by creating separate bundle chunks that load on demand."
    },
    {
      "question": "Why must React.lazy be used with Suspense?",
      "answer": "Suspense provides the fallback UI while the lazy component's chunk is loading. Without Suspense, React cannot show interim UI during loading. Suspense catches the \"pending\" promise from the lazy import and renders the fallback."
    },
    {
      "question": "What happens if a lazy import fails (network error)?",
      "answer": "React.lazy does not handle errors. An error boundary wrapping the Suspense boundary catches the rejected import promise and renders the fallback error UI. Error boundaries use componentDidCatch to handle rendering errors."
    },
    {
      "question": "Can React.lazy work with named exports?",
      "answer": "No, React.lazy only works with default exports. For named exports, create an intermediate module that re-exports as default: export { MyComponent as default } from \"./MyComponent\"."
    },
    {
      "question": "What is the best splitting strategy for React apps?",
      "answer": "Route-based splitting - each top-level route is a separate lazy chunk. This aligns with user navigation patterns. Component-level splitting (individual buttons, modals) is usually too granular and creates excessive HTTP requests."
    },
    {
      "question": "How do you customize the chunk filename?",
      "answer": "Use webpack magic comments: import(/* webpackChunkName: \"home\" */ \"./Home\"). The chunk will be named home.[hash].js. This helps with debugging and caching strategies."
    },
    {
      "question": "How does React.lazy interact with server-side rendering?",
      "answer": "React.lazy does not work with SSR out of the box. Options: (1) Use @loadable/components which supports SSR. (2) In Next.js, use next/dynamic which handles SSR automatically. (3) React 18s streaming SSR integrates with Suspense for lazy components on the server."
    },
    {
      "question": "What is the difference between React.lazy and dynamic import()?",
      "answer": "React.lazy is a React-specific wrapper around dynamic import() that integrates with the component lifecycle and Suspense. dynamic import() is a JavaScript feature that loads modules asynchronously. React.lazy depends on dynamic import() under the hood."
    },
    {
      "question": "How does lazy loading affect SEO?",
      "answer": "If the lazy component is not rendered on initial page load, search engines may not index its content. Use SSR or static generation for SEO-critical content. Lazy loading is best for below-the-fold content, secondary routes, and authenticated pages."
    },
    {
      "question": "What tools can analyze bundle sizes after code splitting?",
      "answer": "webpack-bundle-analyzer generates interactive treemap visualizations of bundle sizes. source-map-explorer shows source code size breakdown. Chrome DevTools coverage tab shows unused code. These help identify effective split points."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Lazy Loading Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Initial Bundle</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">App shell + critical routes only</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">User Navigates</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React attempts to render lazy route</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"200\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Network Request</text><text x=\"130\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Browser fetches chunk.js</text><line x1=\"130\" y1=\"245\" x2=\"130\" y2=\"260\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"260\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"277.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Suspense Fallback</text><text x=\"130\" y=\"294.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Show loading UI while fetching</text><text x=\"250\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Small initial payload</text><text x=\"250\" y=\"148\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Triggers import()</text><text x=\"250\" y=\"222\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Separate JS file loaded</text><text x=\"250\" y=\"282\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Spinner or skeleton shown</text></svg>",
  "codeExamples": [
    {
      "title": "Route-Based Code Splitting with React.lazy",
      "useCase": "Standard pattern for React Router integration",
      "code": "import { BrowserRouter, Routes, Route } from \"react-router-dom\";\nimport React, { Suspense } from \"react\";\n\nconst Home = React.lazy(() => import(\"./routes/Home\"));\nconst Dashboard = React.lazy(() => import(\"./routes/Dashboard\"));\nconst Settings = React.lazy(() => import(\"./routes/Settings\"));\nconst Profile = React.lazy(() => import(\"./routes/Profile\"));\n\nfunction PageSkeleton() {\n  return <div className=\"skeleton\"><div className=\"spinner\"/></div>;\n}\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Navbar />\n      <Suspense fallback={<PageSkeleton />}>\n        <Routes>\n          <Route path=\"/\" element={<Home />} />\n          <Route path=\"/dashboard\" element={<Dashboard />} />\n          <Route path=\"/settings\" element={<Settings />} />\n          <Route path=\"/profile\" element={<Profile />} />\n        </Routes>\n      </Suspense>\n    </BrowserRouter>\n  );\n}",
      "description": "Each route is a separate chunk. The Suspense boundary wraps all routes so navigation triggers chunk loading with a skeleton fallback. The Navbar (non-lazy) remains interactive during chunk loading."
    },
    {
      "title": "Error Boundary with Lazy Loading",
      "useCase": "Handle chunk load failures gracefully with retry",
      "code": "class ChunkErrorBoundary extends React.Component {\n  state = { hasError: false, error: null };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error, info) {\n    logErrorToService(error, info);\n  }\n\n  handleRetry = () => {\n    this.setState({ hasError: false, error: null });\n  };\n\n  render() {\n    if (this.state.hasError) {\n      return (\n        <div className=\"error-fallback\">\n          <h2>Failed to load section</h2>\n          <p>{this.state.error.message}</p>\n          <button onClick={this.handleRetry}>Try Again</button>\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}\n\n// Usage:\n<ChunkErrorBoundary>\n  <Suspense fallback={<Spinner />}>\n    <LazySettingsPanel />\n  </Suspense>\n</ChunkErrorBoundary>",
      "description": "The error boundary wraps Suspense. If the chunk fails to load, componentDidCatch fires, and the user sees a friendly error with a retry button. Retry resets the error state, causing React to re-attempt rendering the lazy component."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What must wrap a React.lazy component?",
      "options": [
        "React.Fragment",
        "Suspense with a fallback",
        "StrictMode",
        "ErrorBoundary"
      ],
      "answer": 1,
      "explanation": "Suspense with a fallback prop is required. The fallback renders while the lazy chunk is loading."
    },
    {
      "question": "What kind of export does React.lazy support?",
      "options": [
        "Named exports only",
        "Default exports only",
        "Both named and default",
        "Only export default as component"
      ],
      "answer": 1,
      "explanation": "React.lazy only works with default exports. Named exports require an intermediate module that re-exports as default."
    },
    {
      "question": "What is the recommended splitting strategy?",
      "options": [
        "Every component gets its own chunk",
        "Route-based splitting for page-level chunks",
        "Splitting every function call",
        "No splitting - single bundle is better"
      ],
      "answer": 1,
      "explanation": "Route-based splitting provides the best balance of chunk size and HTTP requests. Each route loads independently."
    },
    {
      "question": "What happens during development when a lazy module loads?",
      "options": [
        "The browser blocks until loaded",
        "The Suspense fallback displays until the import resolves",
        "React throws a warning",
        "The component renders null"
      ],
      "answer": 1,
      "explanation": "During loading, React suspends and renders the Suspense fallback. Once the import resolves, the lazy component renders."
    },
    {
      "question": "How do you handle a failed lazy import?",
      "options": [
        "React.lazy has built-in retry",
        "Wrap Suspense in an error boundary",
        "The browser automatically retries",
        "Ignore the error - it recovers"
      ],
      "answer": 1,
      "explanation": "Error boundaries catch rejected import promises. The boundary's fallback UI displays, typically with a retry button."
    },
    {
      "question": "What tool visualizes bundle sizes after code splitting?",
      "options": [
        "ESLint",
        "webpack-bundle-analyzer",
        "Babel",
        "Prettier"
      ],
      "answer": 1,
      "explanation": "webpack-bundle-analyzer generates an interactive treemap showing the size of each chunk, helping identify effective split points."
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

TOPICS_DATA["react"]["react-performance-optimization"] = {
  "id": "react-performance-optimization",
  "title": "React Performance Optimization",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "React performance optimization focuses on minimizing unnecessary re-renders and reducing reconciliation work.",
    "Key tools: React.memo, useMemo, useCallback, virtualization, and React DevTools Profiler.",
    "Always profile FIRST, optimize SECOND - premature optimization adds complexity without measurable benefit.",
    "React 18 automatic batching, transitions, and concurrent mode reduce the need for manual optimization."
  ],
  "laymanDefinition": "React performance optimization is like tuning a race car - you do not upgrade every part; you measure which parts are slowing you down and fix those specific ones. The most common bottleneck in React is unnecessary re-renders: a component re-rendering its entire tree when only a small part changed. React gives you tools to tell it \"skip this part, nothing changed\" (React.memo, useMemo, useCallback). The golden rule is to measure with React DevTools Profiler before optimizing, because React is already very fast for most cases. React 18s concurrent mode and automatic batching make many manual optimizations unnecessary.",
  "deepDive": [
    {
      "heading": "React.memo: Component-Level Optimization",
      "text": "React.memo prevents re-rendering when props are unchanged (shallow comparison). It is most effective for: (1) Leaf components in the render tree that render expensive content (charts, lists, maps). (2) Components that receive stable props (primitives, memoized objects/arrays). (3) Components in lists (each list item wrapped in React.memo prevents re-rendering of untouched items). Implementation: React.memo compares previous and next props using Object.is. If all props are equal, the component function is skipped entirely. Important caveats: (a) Inline props (objects, functions) defeat the optimization - use useMemo/useCallback. (b) React.memo does not prevent re-renders from context changes or internal state. (c) The comparison function can be customized with React.memo(Component, areEqual)."
    },
    {
      "heading": "useMemo and useCallback: Value-Level Optimization",
      "text": "useMemo memoizes computed values; useCallback memoizes function references. These enable React.memo to work by stabilizing prop references. Critical pattern: (1) Expensive computations - filter/sort/map large arrays, complex math, data transformations. (2) Referential equality - objects/arrays passed to memoized children must be stable references. (3) Effect dependencies - stable callbacks prevent unnecessary effect re-runs. The cost-benefit analysis: each hook adds memory overhead and dependency comparison on every render. Only apply when: (a) the computation is O(n^2) or worse with n > 100, or (b) the child component is memoized and receives the value as a prop. Default to measuring first."
    },
    {
      "heading": "Virtualization for Large Lists",
      "text": "Rendering thousands of DOM nodes is expensive even with React.memo. Virtualization renders only the visible items (plus a small buffer) and replaces off-screen items with empty spacer elements. Libraries: react-window (lightweight), react-virtuoso (feature-rich), TanStack Virtual (framework-agnostic). Key metrics: (1) DOM nodes reduced from N (all items) to ~20-30 (visible items). (2) Scroll performance stays at 60fps regardless of list size. (3) Initial render time drops from seconds to milliseconds for 10,000+ item lists. Implementation: measure the container element, calculate which items are visible based on scroll position, render only those items, and maintain correct scroll height with a spacer element."
    },
    {
      "heading": "Code Splitting and Lazy Loading",
      "text": "Code splitting reduces the initial bundle size by deferring non-critical code. Strategy: (1) Route-based splitting - each page is a separate chunk loaded on navigation. (2) Component-based splitting - heavy components (charts, editors, modals) loaded on interaction. (3) Library splitting - large libraries (moment.js, lodash, chart.js) extracted to vendor chunks or lazy-loaded. Implementation: React.lazy(() => import(\"./HeavyComponent\")) + Suspense. webpack magic comments control chunk naming: import(/* webpackChunkName: \"admin\" */ \"./AdminPage\"). Measure with webpack-bundle-analyzer to identify large modules and split points."
    },
    {
      "heading": "React 18 Performance Features",
      "text": "React 18 reduces the need for manual optimization: (1) Automatic batching - all state updates (event handlers, timeouts, Promises) are batched into a single render. Previously only event handlers were batched. (2) useTransition - mark non-urgent updates as transitions: startTransition(() => setSearchQuery(query)). The UI stays responsive during large renders. (3) useDeferredValue - defer re-rendering a part of the tree: const deferredValue = useDeferredValue(value). The deferred part renders after the urgent part. (4) Concurrent mode - rendering is interruptible, so high-priority updates (user input) are not blocked by large renders. (5) Automatic render optimization - React 18s reconciler is more efficient, reducing overhead for all components."
    }
  ],
  "interviewAnswer": "React performance optimization starts with profiling using React DevTools Profiler. Key techniques: React.memo for component-level render skipping, useMemo/useCallback for stable prop references, virtualization (react-window) for large lists, and code splitting (React.lazy + Suspense) for smaller bundles. React 18 reduces manual optimization needs with automatic batching, useTransition, useDeferredValue, and concurrent mode. The golden rule: profile first, optimize second. Premature optimization adds code complexity and can actually harm performance with unnecessary comparison overhead.",
  "interviewQuestions": [
    {
      "question": "What is the first step in React performance optimization?",
      "answer": "Profile with React DevTools Profiler. Identify which components re-render unnecessarily and how long each render takes. Optimize only the top bottlenecks based on data, not intuition."
    },
    {
      "question": "How does React.memo prevent re-renders?",
      "answer": "It performs a shallow comparison (Object.is) of current and next props. If all props are equal, it skips the component function and reuses the previously rendered VDOM subtree."
    },
    {
      "question": "When does React.memo fail to prevent re-renders?",
      "answer": "When props include inline objects, arrays, or functions that create new references on every render (defeating shallow comparison). Use useMemo/useCallback to stabilize references."
    },
    {
      "question": "What is virtualization and when is it needed?",
      "answer": "Virtualization renders only visible items in a large list (~20-30 DOM nodes regardless of total list size). Use when rendering 100+ items causes performance issues (layout thrashing, long initial render, low scroll FPS)."
    },
    {
      "question": "What does useTransition do?",
      "answer": "useTransition marks a state update as non-urgent. React can delay the update to keep the UI responsive: const [isPending, startTransition] = useTransition(); startTransition(() => setResults(query))."
    },
    {
      "question": "What is the cost of using useMemo unnecessarily?",
      "answer": "(1) Memory allocation for the cached value. (2) Object.is comparison of each dependency on every render. (3) Extra function call overhead. For trivial computations, the cost exceeds the benefit."
    },
    {
      "question": "How does React 18 automatic batching improve performance?",
      "answer": "Multiple setState calls in any context (event handlers, timeouts, promises, native events) produce a single render instead of multiple renders. This eliminates the need for unstable_batchedUpdates()."
    },
    {
      "question": "What tools analyze bundle size for code splitting?",
      "answer": "webpack-bundle-analyzer (interactive treemap), source-map-explorer (per-file sizes), Chrome DevTools Coverage tab (unused code), and BundlePhobia (npm package size)."
    },
    {
      "question": "What is the difference between useDeferredValue and debouncing?",
      "answer": "useDeferredValue tells React to render the deferred value with lower priority, not after a fixed delay. It is priority-based rather than time-based. React processes urgent updates first and deferred updates when idle."
    },
    {
      "question": "How do you identify unnecessary re-renders in production?",
      "answer": "Use React DevTools Profiler in development, or add custom performance marks with performance.mark() and performance.measure(). In production, use browser DevTools Performance tab or tools like LogRocket that record re-renders."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Performance Optimization Decision Tree</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">App feels slow?</text><text x=\"130\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Profile with React DevTools</text><line x1=\"130\" y1=\"95\" x2=\"130\" y2=\"115\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"115\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"130\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Identify bottleneck</text><text x=\"130\" y=\"147\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Too many renders / Large list / Big bundle</text><line x1=\"130\" y1=\"155\" x2=\"130\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"175\" width=\"65\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"62.5\" y=\"195\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Renders</text><text x=\"62.5\" y=\"212\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React.memo + useMemo</text></svg>",
  "codeExamples": [
    {
      "title": "Comprehensive Performance Optimization Pattern",
      "useCase": "Combining multiple strategies for a search page",
      "code": "const SearchResult = React.memo(function SearchResult({ item }) {\n  console.log(\"Render:\", item.id);\n  return (\n    <div className=\"result-item\">\n      <h4>{item.title}</h4>\n      <p>{item.description}</p>\n    </div>\n  );\n});\n\nfunction SearchPage() {\n  const [query, setQuery] = useState(\"\");\n  const [results, setResults] = useState([]);\n\n  // Debounced search to avoid fetching on every keystroke\n  const deferredQuery = useDeferredValue(query);\n\n  useEffect(() => {\n    if (!deferredQuery) { setResults([]); return; }\n    fetch(\"/api/search?q=\" + deferredQuery)\n      .then(r => r.json())\n      .then(setResults);\n  }, [deferredQuery]);\n\n  // Memoize filtered results to avoid re-sorting on keystroke\n  const sortedResults = useMemo(() => {\n    return [...results].sort((a, b) => b.relevance - a.relevance);\n  }, [results]);\n\n  return (\n    <div>\n      <input value={query} onChange={e => setQuery(e.target.value)} />\n      {isPending && <Spinner />}\n      <VirtualList height={600} itemCount={sortedResults.length}>\n        {({ index, style }) => (\n          <div style={style}>\n            <SearchResult item={sortedResults[index]} />\n          </div>\n        )}\n      </VirtualList>\n    </div>\n  );\n}",
      "description": "This combines: (1) useDeferredValue for non-urgent search query. (2) useEffect debounce pattern. (3) useMemo for sort computation. (4) React.memo on each result item. (5) Virtualization for large result lists. Each optimization is targeted at a specific bottleneck."
    },
    {
      "title": "Measuring Performance with React Profiler",
      "useCase": "Programmatic profiling with Profiler component",
      "code": "import { Profiler } from \"react\";\n\nfunction onRenderCallback(\n  id, // the \"id\" prop of the Profiler tree\n  phase, // \"mount\" or \"update\"\n  actualDuration, // time spent rendering the committed update\n  baseDuration, // estimated time to render the entire subtree without memoization\n  startTime, // when React began rendering this update\n  commitTime, // when React committed this update\n  interactions // the Set of interactions belonging to this update\n) {\n  console.log(`${id} (${phase}): ${actualDuration.toFixed(2)}ms`);\n  if (actualDuration > 16) {\n    console.warn(`WARNING: ${id} took > 16ms (missed 60fps)`);\n  }\n}\n\nfunction App() {\n  return (\n    <Profiler id=\"SearchSection\" onRender={onRenderCallback}>\n      <SearchPage />\n    </Profiler>\n  );\n}",
      "description": "The Profiler component measures render times programmatically. Log durations >16ms (60fps threshold). This data-driven approach identifies exactly which parts of the tree need optimization, replacing guesswork with measurement."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the first step in React performance optimization?",
      "options": [
        "Wrap everything in React.memo",
        "Profile with React DevTools Profiler",
        "Add useMemo everywhere",
        "Use virtual DOM directly"
      ],
      "answer": 1,
      "explanation": "Always profile first to identify actual bottlenecks. Premature optimization adds complexity without measured benefit."
    },
    {
      "question": "What does React.memo use for prop comparison?",
      "options": [
        "Deep equality (JSON.stringify)",
        "Shallow comparison (Object.is)",
        "Reference equality on props object",
        "Custom comparison function"
      ],
      "answer": 1,
      "explanation": "React.memo compares each prop individually using Object.is (shallow comparison). No deep equality by default."
    },
    {
      "question": "What is the main benefit of virtualization?",
      "options": [
        "Smaller bundle size",
        "Only visible items render as DOM nodes, reducing total DOM size from N to ~20-30",
        "Faster network requests",
        "Better code organization"
      ],
      "answer": 1,
      "explanation": "Virtualization reduces DOM node count from all items to only visible items, dramatically improving render time and scroll performance."
    },
    {
      "question": "What problem does useTransition solve?",
      "options": [
        "Makes effects run faster",
        "Allows non-urgent state updates to be deferred, keeping UI responsive during large renders",
        "Reduces bundle size",
        "Prevents hydration mismatches"
      ],
      "answer": 1,
      "explanation": "useTransition marks updates as non-urgent. React can delay them to keep the UI responsive to user input."
    },
    {
      "question": "What does automatic batching in React 18 do?",
      "options": [
        "Combines multiple state updates into a single render",
        "Automatically adds React.memo to components",
        "Splits code into smaller bundles",
        "Prefetches lazy components"
      ],
      "answer": 0,
      "explanation": "Automatic batching groups all state updates (event handlers, timeouts, promises) into one render cycle, eliminating intermediate renders."
    },
    {
      "question": "Which tool would you use to analyze bundle size?",
      "options": [
        "ESLint",
        "webpack-bundle-analyzer",
        "Prettier",
        "Babel"
      ],
      "answer": 1,
      "explanation": "webpack-bundle-analyzer visualizes the composition of each bundle chunk, identifying large libraries and effective split points."
    }
  ]
};

TOPICS_DATA["react"]["react-portal"] = {
  "id": "react-portal",
  "title": "React Portal",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Portals render a component into a different DOM node outside the parent components DOM hierarchy.",
    "ReactDOM.createPortal(children, domNode) is the API - children render at domNode while maintaining React context and event bubbling.",
    "Portals are commonly used for modals, tooltips, dropdowns, and toast notifications that need to break out of overflow: hidden or z-index stacking contexts.",
    "Event propagation works through the React tree, not the DOM tree - events from portal content bubble to the portal parents React ancestors."
  ],
  "laymanDefinition": "Portals are like having a secret tunnel that lets a component escape its parent container and appear anywhere in the HTML document. Even though the portal content renders somewhere else in the DOM (like inside <body> for a modal overlay), from React's perspective it is still a child of the component that created the portal. This means: (1) The portal content can break out of CSS constraints like overflow: hidden, z-index stacking, or clipped parent containers. (2) Context providers (theme, auth) still work because the portal lives in the React tree as a child. (3) Events bubble up through the React component hierarchy, not the DOM hierarchy.",
  "deepDive": [
    {
      "heading": "Portal DOM Architecture",
      "text": "ReactDOM.createPortal accepts two arguments: children (renderable React node) and domNode (a DOM element, typically document.body). The portal renders children inside domNode, bypassing the parent DOM hierarchy. This means: (1) The portaled content is not a child of the parent DOM element. (2) CSS styles that affect the parent (overflow: hidden, opacity, transform, z-index) do not affect the portal. (3) The portal is appended to domNode as a sibling to the root React mount. (4) Multiple portals can render into the same domNode - they are ordered by render order. (5) The portal is removed from the DOM when the parent component unmounts. React manages the portal lifecycle: mount the component -> portal created in DOM; unmount -> portal removed."
    },
    {
      "heading": "Event Bubbling Through Portal Boundaries",
      "text": "This is the most important and often misunderstood portal behavior. Events from portal content bubble up through the React component tree, NOT the DOM tree. Example: A modal (rendered via portal to document.body) contains a button that triggers an onClick on the parent component. Even though the button is a DOM child of <body> and the parent is nested deep in <div id=\"root\">, the onClick from the portal button bubbles up through the React component hierarchy and triggers the parents handler normally. This is because React uses its own synthetic event system that follows React component hierarchy, not DOM hierarchy. This behavior is crucial for event delegation, context providers, and redux connect() to work correctly across portal boundaries."
    },
    {
      "heading": "Portal Use Cases and Patterns",
      "text": "(1) Modals/Dialogs - overlay needs to break out of parent z-index and overflow contexts. Render portal to document.body, position fixed, backdrop behind. (2) Tooltips - positioned relative to trigger element but must not be clipped by overflow: hidden ancestors. Use portal + absolute/fixed positioning calculated from trigger rect. (3) Dropdown menus - same as tooltips, must break out of overflow constraints and stacking contexts. (4) Toast notifications - render all toasts into a single portal container for consistent positioning and stacking. (5) Floating elements (context menus, date pickers) - need to escape parent boundaries for proper display. (6) Full-screen elements (lightboxes, onboarding overlays) - must cover the entire viewport regardless of parent constraints."
    },
    {
      "heading": "Portal Accessibility Considerations",
      "text": "(1) Focus management - when a modal opens via portal, focus must be trapped inside the modal (use focus-trap-react or manual focus management). (2) ARIA attributes - modals should have role=\"dialog\", aria-modal=\"true\", aria-labelledby pointing to the title. (3) Keyboard navigation - Escape key should close the modal; Tab should cycle through focusable elements within the modal. (4) Screen reader announcements - use aria-live regions for dynamic content changes. (5) Ensure the portal container element is accessible (not hidden from screen readers). (6) For tooltips/dropdowns, ensure proper aria-describedby relationships between the trigger and the portal content. (7) Test with keyboard navigation and screen readers."
    },
    {
      "heading": "Portal Performance and Edge Cases",
      "text": "(1) Rendering a portal causes work in two separate parts of the DOM - React handles this efficiently but be mindful of layout thrashing. (2) Avoid creating portal containers dynamically on every render - create the container element once (e.g., outside the component or with useRef + useEffect). (3) Multiple siblings rendering portals into the same container can cause ordering issues - use explicit ordering or unique containers. (4) Hydration - portals work during hydration but the server-rendered HTML must include the portal container element. (5) Testing - portal content renders outside the normal DOM tree. In React Testing Library, portal content is still queryable because RTL queries the entire document. (6) Error boundaries wrap the portal-creating component, not the portal content DOM location."
    }
  ],
  "interviewAnswer": "ReactDOM.createPortal renders children into a different DOM node while maintaining React context and event bubbling. It is essential for modals, tooltips, and dropdowns that must escape CSS constraints like overflow: hidden or z-index contexts. Events from portal content bubble through the React component tree (not DOM tree), so context providers and event handlers in the parent still work. Portals support all React features including context, refs, and hydration. For accessibility, implement focus trapping and ARIA attributes (role=\"dialog\", aria-modal) in modal portals. Create portal containers statically to avoid unnecessary DOM operations.",
  "interviewQuestions": [
    {
      "question": "What problem do portals solve?",
      "answer": "They allow components to render outside their parents DOM hierarchy while maintaining React context and event propagation. This is essential for elements that must break out of CSS constraints like overflow: hidden or limited z-index stacking contexts."
    },
    {
      "question": "How does event bubbling work with portals?",
      "answer": "Events bubble through the React component tree, not the DOM tree. A click on portal content will bubble up to the portal-creating components ancestors in the React tree, even though the portal content is a DOM child of a different node."
    },
    {
      "question": "What is the syntax for creating a portal?",
      "answer": "ReactDOM.createPortal(children, domNode). children is the React node(s) to render and domNode is the target DOM element (e.g., document.getElementById(\"modal-root\") or document.body)."
    },
    {
      "question": "Do context providers work through portals?",
      "answer": "Yes. Portals maintain React tree hierarchy for context. A context.Provider wrapping the portal-creating component will provide values to the portal content, even though the portal renders in a different part of the DOM."
    },
    {
      "question": "What are the common accessibility requirements for portal modals?",
      "answer": "Focus trapping (Tab cycles within modal), role=\"dialog\" and aria-modal=\"true\", Escape key to close, aria-labelledby pointing to the modal title, and proper focus restoration when the modal closes."
    },
    {
      "question": "How do you test components that use portals?",
      "answer": "React Testing Library queries the entire document, so portal content is findable. Use screen.getByRole(\"dialog\") for modals. For positions, assert on computed styles or use data-testid. For event bubbling, simulate events on portal content and assert parent handlers fire."
    },
    {
      "question": "Can portals be used with server-side rendering?",
      "answer": "Yes, but the portal container DOM node must exist in the server-rendered HTML. Create the container element in the HTML template (e.g., <div id=\"modal-root\"></div>) so hydration can attach the portal correctly."
    },
    {
      "question": "What happens to portal content when the portal-creating component unmounts?",
      "answer": "React automatically removes the portal content from the DOM. The lifecycle of the portal is tied to the creating component. Cleanup happens during the commit phase when the parent unmounts."
    },
    {
      "question": "How do you handle multiple modals with portals?",
      "answer": "Stack them with z-index ordering. Each modal renders its own portal. The most recently opened modal has the highest z-index. For multiple modals, manage z-index explicitly (e.g., baseZIndex + index * 100) or use a modal manager that tracks the stack."
    },
    {
      "question": "Can you pass refs through portals?",
      "answer": "Yes. React refs work normally with portals. If you pass a ref to an element inside portal content, the ref will point to the actual DOM node (which lives in the portal container, not the parent DOM tree)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Portal DOM vs React Tree</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"35\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"67.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">React Tree</text><text x=\"130\" y=\"84.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\"><App></text><text x=\"30\" y=\"110\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"><ModalButton></text><text x=\"30\" y=\"130\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">  <Modal> -> createPortal</text><text x=\"30\" y=\"150\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">  </Modal></text><text x=\"30\" y=\"170\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"></ModalButton></text><text x=\"350\" y=\"78\" fill=\"start\" font-size=\"#6c9fff\" text-anchor=\"middle\">DOM Tree:</text><text x=\"350\" y=\"110\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"start\"><div id=\"root\"></text><text x=\"350\" y=\"130\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">  <ModalButton>...</ModalButton></text><text x=\"350\" y=\"150\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\"></div></text><text x=\"350\" y=\"170\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"start\"><div id=\"modal-root\"></text><text x=\"350\" y=\"190\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"start\">  <Modal>...</Modal>  <-- Portal renders here</text><text x=\"350\" y=\"210\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\"></div></text><text x=\"30\" y=\"230\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">React context flows through React tree</text><text x=\"30\" y=\"250\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">Events bubble through React hierarchy</text></svg>",
  "codeExamples": [
    {
      "title": "Modal Component with Portal",
      "useCase": "Full-screen modal with backdrop, focus trap, and keyboard handling",
      "code": "function Modal({ isOpen, onClose, title, children }) {\n  const overlayRef = useRef(null);\n\n  useEffect(() => {\n    if (!isOpen) return;\n    const handleEsc = (e) => { if (e.key === \"Escape\") onClose(); };\n    document.addEventListener(\"keydown\", handleEsc);\n    return () => document.removeEventListener(\"keydown\", handleEsc);\n  }, [isOpen, onClose]);\n\n  if (!isOpen) return null;\n\n  return ReactDOM.createPortal(\n    <div\n      ref={overlayRef}\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"modal-title\"\n      style={{\n        position: \"fixed\", inset: 0, zIndex: 1000,\n        display: \"flex\", alignItems: \"center\", justifyContent: \"center\",\n        background: \"rgba(0,0,0,0.5)\"\n      }}\n      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}\n    >\n      <div style={{ background: \"#fff\", padding: 24, borderRadius: 8, minWidth: 400 }}>\n        <h2 id=\"modal-title\">{title}</h2>\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.getElementById(\"modal-root\")\n  );\n}\n\nfunction App() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open Modal</button>\n      <Modal isOpen={open} onClose={() => setOpen(false)} title=\"Example\">\n        <p>This content is rendered via portal.</p>\n      </Modal>\n      <div id=\"modal-root\" />\n    </div>\n  );\n}",
      "description": "The modal renders into #modal-root which is outside the main app DOM hierarchy. Clicking the backdrop closes the modal. Escape key closes the modal. ARIA attributes provide accessibility. The portal container div is defined in JSX but could also be in the HTML template."
    },
    {
      "title": "Tooltip Using Portal",
      "useCase": "Position tooltip relative to trigger without overflow clipping",
      "code": "function Tooltip({ text, children }) {\n  const [visible, setVisible] = useState(false);\n  const [pos, setPos] = useState({ top: 0, left: 0 });\n  const triggerRef = useRef(null);\n\n  const show = () => {\n    if (triggerRef.current) {\n      const rect = triggerRef.current.getBoundingClientRect();\n      setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });\n    }\n    setVisible(true);\n  };\n\n  return (\n    <>\n      <span ref={triggerRef} onMouseEnter={show} onMouseLeave={() => setVisible(false)}>\n        {children}\n      </span>\n      {visible && ReactDOM.createPortal(\n        <div\n          role=\"tooltip\"\n          style={{\n            position: \"fixed\", top: pos.top, left: pos.left,\n            transform: \"translateX(-50%)\",\n            padding: \"6px 12px\", background: \"#333\", color: \"#fff\",\n            borderRadius: 4, fontSize: 13, zIndex: 9999,\n            whiteSpace: \"nowrap\"\n          }}\n        >\n          {text}\n        </div>,\n        document.body\n      )}\n    </>\n  );\n}\n\n// Usage - tooltip wont be clipped by parent containers:\n<div style={{ overflow: \"hidden\", height: 50 }}>\n  <Tooltip text=\"Detailed explanation here\">\n    <span>Hover me</span>\n  </Tooltip>\n</div>",
      "description": "Even though the trigger is inside an overflow: hidden container, the tooltip renders via portal into document.body and is fully visible. The position is calculated from the trigger elements bounding rect on hover."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does ReactDOM.createPortal do?",
      "options": [
        "Creates a new React root component",
        "Renders children into a different DOM node while preserving React context and event bubbling",
        "Creates a new Redux store",
        "Duplicates a component in the DOM"
      ],
      "answer": 1,
      "explanation": "createPortal renders React children into a specified DOM node outside the parent hierarchy while maintaining React tree semantics."
    },
    {
      "question": "How do events bubble from portal content?",
      "options": [
        "Through the DOM tree only",
        "Through the React component tree, not the DOM tree",
        "Events do not bubble from portals",
        "Through both DOM and React trees simultaneously"
      ],
      "answer": 1,
      "explanation": "Events from portal content bubble through the React hierarchy. A click on portal content triggers event handlers on React ancestors of the portal-creating component."
    },
    {
      "question": "Which CSS constraints do portals help escape?",
      "options": [
        "Font-family rules",
        "overflow: hidden, z-index stacking contexts, transform, and opacity",
        "Color inheritance",
        "Margin collapsing"
      ],
      "answer": 1,
      "explanation": "Portals render outside the parent DOM element, escaping CSS constraints that clip or transform the parent container."
    },
    {
      "question": "Do React context providers work through portals?",
      "options": [
        "No, context stops at portal boundaries",
        "Yes, context flows through React tree, not DOM tree",
        "Only if the portal container is inside the provider",
        "Only with useContext, not Context.Consumer"
      ],
      "answer": 1,
      "explanation": "Context is propagated through the React component hierarchy, which is maintained across portal boundaries."
    },
    {
      "question": "What happens to a portal when its parent unmounts?",
      "options": [
        "The portal remains in the DOM forever",
        "React automatically removes the portal content from the DOM",
        "The portal moves to the document root",
        "The portal throws an error"
      ],
      "answer": 1,
      "explanation": "The portal lifecycle is tied to the creating component. When the component unmounts, React unmounts the portal content and removes it from the DOM."
    },
    {
      "question": "What is the recommended DOM node for modal portals?",
      "options": [
        "Inside the parent component",
        "document.body or a dedicated <div id=\"modal-root\">",
        "The window object",
        "The document head"
      ],
      "answer": 1,
      "explanation": "A dedicated container element (e.g., <div id=\"modal-root\">) or document.body is recommended. The container should be outside the main app root for proper z-index and overflow stacking."
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

TOPICS_DATA["react"]["react-protected-routes"] = {
  "id": "react-protected-routes",
  "title": "React Protected Routes",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Protected routes restrict access to certain pages based on authentication status, redirecting unauthenticated users to login.",
    "Implement as a wrapper component (RequireAuth) that checks auth state and renders <Outlet /> or <Navigate to=\"/login\" />.",
    "React Router v6 makes this pattern clean with layout routes that conditionally render their children.",
    "Combine with loaders for server-side auth checks and useLocation() state for redirect-back-after-login flow."
  ],
  "laymanDefinition": "Protected routes are like VIP sections at a concert. You need a valid ticket (authentication) to enter. If you do not have a ticket, you get redirected to the box office (login page). In React, protected routes wrap sensitive pages and check if the user is logged in. If logged in, they show the page; if not, they redirect to the login page. The smart part: the redirect remembers where you were trying to go (via location.state), so after login, the app sends you back to the original page instead of just the home page. This pattern is essential for any app with authenticated content.",
  "deepDive": [
    {
      "heading": "Authentication State Management",
      "text": "Before implementing protected routes, you need an auth system. Common patterns: (1) Context-based - AuthContext provides user object and login/logout methods. useAuth() custom hook accesses the context. (2) Token-based - JWT stored in localStorage or httpOnly cookie. Auth check decodes the token and validates expiry. (3) Session-based - server session with a /api/auth/me endpoint that returns the current user. (4) Third-party - Auth0, Firebase Auth, Supabase, Clerk provide SDKs with hooks. The auth state has three states: loading (initial check in progress), authenticated (user object available), unauthenticated (no user). Protected routes must handle all three states: loading spinner for loading, redirect for unauthenticated, render children for authenticated."
    },
    {
      "heading": "RequireAuth Layout Route Pattern",
      "text": "The recommended approach in React Router v6: create a layout route component that checks authentication and conditionally renders children. Implementation: (1) Define a <RequireAuth> component that uses useAuth() and useLocation(). (2) If loading, return <Spinner />. (3) If not authenticated, return <Navigate to=\"/login\" state={{ from: location }} replace />. (4) If authenticated, return <Outlet />. (5) In the route config, wrap protected routes as children of RequireAuth: <Route element={<RequireAuth />}><Route path=\"dashboard\" element={<Dashboard />} /></Route>. This pattern is clean because RequireAuth does not need to know about specific routes - it just checks auth and renders children."
    },
    {
      "heading": "Role-Based Access Control (Authorization)",
      "text": "Beyond authentication (are you logged in?), authorization (do you have permission?) controls access to specific features. Patterns: (1) Role-based - roles like admin, editor, viewer. RequireRole component checks user.role. (2) Permission-based - granular permissions like canEdit, canDelete. (3) Feature flags - enable/disable features based on A/B testing or subscription tier. Implementation: extend RequireAuth with a requiredRole or requiredPermissions prop: <RequireRole role=\"admin\"><Route path=\"admin\" element={<AdminPanel />} /></RequireRole>. For complex permissions, create a hasPermission utility that checks the current user against required permissions. (4) Server-side enforcement - always validate permissions on the server; client-side checks are UX convenience, not security."
    },
    {
      "heading": "Login Redirect Flow (Return URL)",
      "text": "The standard login redirect pattern: (1) User visits /dashboard (protected). (2) Not authenticated, redirect to /login?redirect=/dashboard. (3) User logs in successfully. (4) Redirect to /dashboard (the original URL). React Router v6 implementation: (1) In RequireAuth: <Navigate to=\"/login\" state={{ from: location }} replace /> saves the current location in state. (2) In LoginPage: const location = useLocation(); const from = location.state?.from?.pathname || \"/\". (3) On login success: navigate(from, { replace: true }). Benefits: (1) The redirect-back works even for deeply nested routes (/dashboard/settings/profile). (2) replace: true prevents the login page from remaining in browser history (back button goes to the original page, not login). (3) The redirect parameter can also be passed as a search param for server-rendered login flows."
    },
    {
      "heading": "Protected Route with Loader-Based Auth",
      "text": "React Router v6 loaders can perform server-side auth checks. Pattern: (1) Define a loader that calls an auth API: async function authLoader() { const res = await fetch(\"/api/auth/me\"); if (!res.ok) throw redirect(\"/login\"); return res.json(); }. (2) Attach the loader to the parent protected route: <Route loader={authLoader} element={<RequireAuth />}>. (3) RequireAuth uses useLoaderData() to get the user. (4) If the loader redirects, the protected children never render. Benefits: (1) Auth check happens during navigation, before any component renders. (2) The redirect response from the loader is handled by React Router's data layer. (3) No flash of protected content - the login page replaces it directly. (4) Works with SSR (Remix, Next.js)."
    }
  ],
  "interviewAnswer": "Protected routes restrict access based on authentication. Implement as a RequireAuth layout route: check auth state, show spinner while loading, redirect to /login (with return URL in location.state) if unauthenticated, render <Outlet /> if authenticated. React Router v6 makes this clean with layout routes. For authorization, extend with role/permission checks. For server-side auth, use loaders that redirect on failure. The redirect-after-login flow saves the original URL in state and navigates back after successful login with replace:true to avoid history pollution.",
  "interviewQuestions": [
    {
      "question": "How do you implement protected routes in React Router v6?",
      "answer": "Create a RequireAuth layout component that checks auth state. If not authenticated, return <Navigate to=\"/login\" state={{ from: location }} replace />. If authenticated, return <Outlet />. Wrap protected routes as children of RequireAuth in the route config."
    },
    {
      "question": "What are the three auth states a protected route must handle?",
      "answer": "(1) Loading - initial auth check in progress (show spinner). (2) Unauthenticated - redirect to login. (3) Authenticated - render the protected content. Skipping the loading state causes a flash of the login page on page refresh."
    },
    {
      "question": "How do you pass the return URL to the login page?",
      "answer": "Use location.state: <Navigate to=\"/login\" state={{ from: location }} replace />. In LoginPage, read useLocation().state?.from?.pathname. On success, navigate(from, { replace: true }) to redirect back."
    },
    {
      "question": "What is the difference between authentication and authorization?",
      "answer": "Authentication verifies identity (\"who are you?\"). Authorization verifies permissions (\"what are you allowed to do?\"). Protected routes handle authentication; role-based access handles authorization."
    },
    {
      "question": "How do you implement role-based route protection?",
      "answer": "Create a RequireRole component that checks user.role against required roles. Extend RequireAuth with role checking: if (!requiredRoles.includes(user.role)) { return <Navigate to=\"/unauthorized\" />; }."
    },
    {
      "question": "Why should you also enforce authorization on the server?",
      "answer": "Client-side protection is UX convenience, not security. A malicious user can modify JavaScript to bypass client checks. Always validate permissions on the server for any sensitive operation (API calls, data access, mutations)."
    },
    {
      "question": "How do loaders improve protected routes?",
      "answer": "Loaders can check auth before the route renders, preventing any flash of protected content. A loader can throw redirect(\"/login\") if not authenticated, and React Router handles the navigation before rendering the route component."
    },
    {
      "question": "What is the purpose of replace: true in the redirect Navigate?",
      "answer": "replace: true replaces the current history entry instead of adding a new one. After login, pressing back goes to the original page (before the protected route), not the login page. This keeps the navigation stack clean."
    },
    {
      "question": "How do you handle token expiration?",
      "answer": "Check token expiry in the RequireAuth component. If expired, try to refresh the token (via /api/auth/refresh endpoint). If refresh fails, redirect to login. Use axios interceptors or fetch wrappers for automatic token refresh on API calls."
    },
    {
      "question": "What is the preferred authentication library for React apps?",
      "answer": "Auth0 (auth0-react SDK), Firebase Authentication, Supabase Auth, Clerk, or NextAuth.js (for Next.js). For custom auth, use Context + JWT with httpOnly cookies for security, localStorage/ sessionStorage for simpler apps."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Protected Route Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">User visits /dashboard</text><text x=\"130\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Protected route requested</text><line x1=\"130\" y1=\"95\" x2=\"130\" y2=\"115\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"115\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"130\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Check Auth State</text><text x=\"130\" y=\"147\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">useAuth() from context</text><line x1=\"130\" y1=\"155\" x2=\"130\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"175\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"75\" y=\"195\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Authenticated?</text><text x=\"75\" y=\"212\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\"><Outlet /> renders dashboard</text></svg>",
  "codeExamples": [
    {
      "title": "Complete Protected Route Implementation",
      "useCase": "Auth context + RequireAuth + LoginPage with redirect-back",
      "code": "// 1. Auth Context\nconst AuthContext = React.createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(undefined); // undefined = loading\n\n  useEffect(() => {\n    fetch(\"/api/auth/me\")\n      .then(r => r.ok ? r.json() : null)\n      .then(setUser);\n  }, []);\n\n  const login = async (email, password) => {\n    const res = await fetch(\"/api/auth/login\", {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify({ email, password })\n    });\n    if (!res.ok) throw new Error(\"Invalid credentials\");\n    const user = await res.json();\n    setUser(user);\n    return user;\n  };\n\n  const logout = () => {\n    fetch(\"/api/auth/logout\", { method: \"POST\" }).then(() => setUser(null));\n  };\n\n  return (\n    <AuthContext.Provider value={{ user, login, logout, loading: user === undefined }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nfunction useAuth() { return useContext(AuthContext); }\n\n// 2. RequireAuth Component\nfunction RequireAuth() {\n  const { user, loading } = useAuth();\n  const location = useLocation();\n\n  if (loading) return <FullPageSpinner />;\n  if (!user) {\n    return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  }\n  return <Outlet />;\n}\n\n// 3. LoginPage with redirect-back\nfunction LoginPage() {\n  const { login } = useAuth();\n  const navigate = useNavigate();\n  const location = useLocation();\n  const from = location.state?.from?.pathname || \"/dashboard\";\n\n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    const form = new FormData(e.target);\n    await login(form.get(\"email\"), form.get(\"password\"));\n    navigate(from, { replace: true });\n  };\n\n  return <form onSubmit={handleSubmit}>...</form>;\n}\n\n// 4. Router Configuration\n<Route element={<RequireAuth />}>\n  <Route path=\"dashboard\" element={<Dashboard />} />\n  <Route path=\"settings\" element={<Settings />} />\n  <Route path=\"admin\" element={<AdminPanel />} />\n</Route>\n<Route path=\"login\" element={<LoginPage />} />",
      "description": "The AuthProvider manages auth state. RequireAuth checks auth and redirects with return URL. LoginPage reads the return URL from location.state and navigates there on success. replace:true ensures clean history."
    },
    {
      "title": "Role-Based Access with RequireRole",
      "useCase": "Extend protected routes for admin-only sections",
      "code": "function RequireRole({ role, children }) {\n  const { user } = useAuth();\n  const location = useLocation();\n\n  if (!user) {\n    return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  }\n\n  if (user.role !== role && user.role !== \"superadmin\") {\n    return <Navigate to=\"/unauthorized\" replace />;\n  }\n\n  return children || <Outlet />;\n}\n\n// Router config:\n<Route element={<RequireAuth />}>\n  <Route path=\"dashboard\" element={<Dashboard />} />\n  <Route element={<RequireRole role=\"admin\" />}>\n    <Route path=\"admin/users\" element={<UserManagement />} />\n    <Route path=\"admin/logs\" element={<AuditLogs />} />\n  </Route>\n  <Route element={<RequireRole role=\"editor\" />}>\n    <Route path=\"editor/posts\" element={<PostEditor />} />\n  </Route>\n  <Route path=\"*\" element={<NotFound />} />\n</Route>\n<Route path=\"/unauthorized\" element={<UnauthorizedPage />} />",
      "description": "RequireRole extends RequireAuth with authorization. Admin routes require user.role === \"admin\". Editor routes require user.role === \"editor\". superadmin role bypasses all checks. Unauthorized redirects to a dedicated page instead of login."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does a protected route component typically render for authenticated users?",
      "options": [
        "A login form",
        "An <Outlet /> (the child routes)",
        "A loading spinner",
        "A redirect to home"
      ],
      "answer": 1,
      "explanation": "Authenticated users see the protected content via <Outlet />. Unauthenticated users get redirected."
    },
    {
      "question": "What is the purpose of location.state in the redirect Navigate?",
      "options": [
        "To pass CSS classes",
        "To save the original URL so the login page can redirect back after success",
        "To disable the back button",
        "To pass API tokens"
      ],
      "answer": 1,
      "explanation": "location.state stores the current location. LoginPage reads it via useLocation().state?.from?.pathname and navigates back after successful authentication."
    },
    {
      "question": "Why is replace: true used in the redirect?",
      "options": [
        "To add a new history entry",
        "To replace the current history entry so pressing back skips the login page",
        "To reload the page",
        "To clear browser cache"
      ],
      "answer": 1,
      "explanation": "replace: true replaces the current history entry. After login, the user goes back to the original page (before the protected route), not to the login page."
    },
    {
      "question": "What is the difference between authentication and authorization?",
      "options": [
        "They are the same",
        "Authentication = identity verification; Authorization = permission checking",
        "Authentication = permission checking; Authorization = identity verification",
        "Authentication = login; Authorization = logout"
      ],
      "answer": 1,
      "explanation": "Authentication verifies who you are. Authorization verifies what you are allowed to do. Protected routes handle auth; role-based access handles authorization."
    },
    {
      "question": "What should RequireAuth show during the initial auth check?",
      "options": [
        "Nothing (null)",
        "A loading spinner or skeleton",
        "The protected content with errors",
        "A redirect to login"
      ],
      "answer": 1,
      "explanation": "During the initial auth check (loading state), show a loading indicator. Skipping this causes a flash of the login page or protected content."
    },
    {
      "question": "Why must authorization also be enforced server-side?",
      "options": [
        "Client-side checks are slower",
        "Client-side JavaScript can be bypassed by malicious users",
        "Server-side checks are optional",
        "Authorization only works server-side"
      ],
      "answer": 1,
      "explanation": "Client-side checks are UX convenience, not security. Anyone can modify client JS. Server-side authorization must protect all sensitive operations."
    }
  ]
};

TOPICS_DATA["react"]["react-react-memo"] = {
  "id": "react-react-memo",
  "title": "React.memo",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "React.memo is a higher-order component that prevents re-rendering when props have not changed (shallow comparison).",
    "It is a performance optimization - only use it when profiling shows a component re-renders unnecessarily with the same props.",
    "React.memo uses Object.is shallow comparison by default but accepts a second argument: a custom comparison function.",
    "Do not wrap every component in React.memo - it adds comparison overhead and can cause bugs with unstable props (like inline objects/functions)."
  ],
  "laymanDefinition": "React.memo is like a bouncer at a club who checks if your ID looks the same as last time. If you look the same (props havent changed), the bouncer says \"go on in, nothing changed\" and the component skips re-rendering entirely. Without React.memo, React re-renders the component every time the parent re-renders, regardless of whether the props actually changed. React.memo does a shallow comparison of props - if the prop references are the same (Object.is), it reuses the previous render output. For props like objects, arrays, and functions, this means the parent must use useMemo/useCallback to keep references stable, or the memoization is defeated.",
  "deepDive": [
    {
      "heading": "How React.memo Works Internally",
      "text": "React.memo wraps a component and returns a new component that performs a shallow comparison of the current and next props during the render phase. If the comparison returns true (props are equal), React reuses the previously rendered virtual DOM subtree for this component and does not call the component function. If false, React calls the component function with the new props and reconciles as usual. The comparison is done by a function called by the `updateFunctionComponent` or `updateForwardRef` work loop in React's fiber reconciler. React.memo only affects re-renders triggered by parent re-renders - it does not prevent re-renders caused by the component's own state or context changes. The component will always re-render if its own useState or useContext updates."
    },
    {
      "heading": "Shallow Comparison and Its Limitations",
      "text": "React.memo uses Object.is for each prop. For primitive values (string, number, boolean, null, undefined), this works as expected: \"hello\" === \"hello\". For objects, arrays, and functions, Object.is checks reference equality, not value equality. This means: { x: 1 } !== { x: 1 } - these are different object references even with identical content. The practical consequence: if the parent creates a new object/array/function on every render and passes it as a prop, React.memo sees a prop change every render and the optimization is completely defeated. To fix this, use useMemo for objects/arrays and useCallback for functions to stabilize references across renders. The comparison function can accept a second argument: React.memo(Component, (prevProps, nextProps) => boolean)."
    },
    {
      "heading": "React.memo vs useMemo vs PureComponent",
      "text": "React.memo is the function component equivalent of PureComponent for class components. Both perform shallow prop comparison. Differences: (1) React.memo can take a custom comparison function; PureComponent cannot (it uses shouldComponentUpdate with shallow comparison internally). (2) PureComponent compares both props and state; React.memo only compares props. (3) useMemo is different - it memoizes the result of a computation (a value), not a component. (4) React.memo wraps the entire component; useMemo wraps individual values. Use React.memo for component-level render optimization and useMemo/useCallback for prop-level reference stability that enables React.memo to work."
    },
    {
      "heading": "Common Pitfalls and Anti-Patterns",
      "text": "(1) Wrapping every component in React.memo - this adds unnecessary comparison overhead for leaf components that render cheap JSX. (2) Inline objects and functions - if the parent creates { style: { color: \"red\" } } or onClick={() => handleClick()} on every render, React.memo is useless. (3) Children prop - React.memo does not prevent re-renders caused by parent context changes. (4) Using custom comparison functions incorrectly - they should be fast (synchronous, no deep equality). (5) HOC order - if you apply React.memo before a connect() or withRouter() HOC, the comparison runs on the outer components props, which may include injected props. Apply React.memo as the outermost wrapper after other HOCs."
    },
    {
      "heading": "Profiling Before Memoizing - The Golden Rule",
      "text": "Always profile with React DevTools Profiler before adding React.memo. The Profiler shows: (1) Which components re-render and why. (2) The rendering time for each component. (3) Whether the re-render was caused by props, state, or context. Add React.memo only when: (a) A component renders frequently with unchanged props. (b) The component's render is expensive enough that the comparison overhead is worth it. (c) The props are stable (or can be made stable with useMemo/useCallback). For most apps, the top 5-10 most expensive components benefit from React.memo - the rest should not be wrapped. Premature memoization adds code complexity and potential bugs without measurable benefit."
    }
  ],
  "interviewAnswer": "React.memo is a higher-order component that prevents re-rendering when props have not changed, using Object.is shallow comparison. It is a performance optimization, not a guarantee - the component still re-renders on its own state or context changes. React.memo only helps when props are stable references (primitives, or memoized objects/arrays/functions via useMemo/useCallback). The second argument allows a custom comparison function, but it should be fast (no deep equality). Always profile before adding React.memo - wrapping every component adds overhead. React.memo is the function component equivalent of PureComponent but only compares props, not state.",
  "interviewQuestions": [
    {
      "question": "What does React.memo do?",
      "answer": "React.memo is a HOC that memoizes a component's rendered output. It performs a shallow comparison of the current and next props. If they are equal (Object.is), it reuses the previous render output, skipping the component function call and reconciliation for that subtree."
    },
    {
      "question": "When does React.memo NOT prevent a re-render?",
      "answer": "When the component's own state changes (useState dispatch), when a context value used by the component changes, or when any prop reference changes (new object, array, function). React.memo only protects against re-renders caused by the parent re-rendering with the same props."
    },
    {
      "question": "How does React.memo compare to PureComponent?",
      "answer": "Both prevent unnecessary re-renders by shallow prop comparison. PureComponent is for class components and compares both props and state. React.memo is for function components and compares only props. PureComponent uses shouldComponentUpdate; React.memo uses a built-in comparison."
    },
    {
      "question": "What is the second argument of React.memo?",
      "answer": "A custom comparison function: React.memo(Component, (prevProps, nextProps) => boolean). Return true to skip the render (props are equal), false to re-render. Use this for custom comparison logic, but avoid deep equality checks as they are expensive."
    },
    {
      "question": "How do inline functions defeat React.memo?",
      "answer": "An inline function like onClick={() => handleClick(id)} creates a new function reference on every parent render. React.memo detects a prop change (new function reference) and re-renders the child. useCallback on the function stabilizes the reference and restores the memoization benefit."
    },
    {
      "question": "Does React.memo affect the components state or effects?",
      "answer": "No. React.memo only controls whether the component function is called. If the component has internal state (useState) or effects (useEffect), they behave normally. State updates always trigger a re-render regardless of React.memo."
    },
    {
      "question": "What is the performance cost of React.memo?",
      "answer": "The shallow prop comparison runs on every render of the parent. For components with many props (10+), this comparison has a cost. If the component renders cheap JSX (a single div with some text), the comparison overhead may exceed the render cost. Profile to determine if React.memo is beneficial."
    },
    {
      "question": "Can React.memo be used with forwardRef?",
      "answer": "Yes. React.memo(forwardRef(Component)) works correctly. React.memo wraps the forwardRef component, comparing the props (ref is handled separately by React and does not participate in the comparison)."
    },
    {
      "question": "How does React.memo interact with context?",
      "answer": "If the memoized component consumes context with useContext, it will re-render when the context value changes, regardless of React.memo. React.memo only skips renders triggered by prop changes from the parent."
    },
    {
      "question": "Should I wrap every component in React.memo?",
      "answer": "No. Only wrap components where profiling confirms a performance benefit. Over-memoizing adds comparison overhead, increases code complexity, and can cause bugs if props are not stable. A targeted approach (wrapping expensive list items, charts, or deeply nested components) is more effective."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React.memo Decision Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Parent Re-renders</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Triggers child reconciliation</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">React.memo Check</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Shallow compare props (Object.is)</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"75\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Props Equal?</text><text x=\"75\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Skip render, reuse VDOM</text><rect x=\"140\" y=\"195\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"185\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Props Changed?</text><text x=\"185\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Re-render component</text><rect x=\"30\" y=\"265\" width=\"200\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"275\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"normal\" text-anchor=\"middle\">Note: state/context changes bypass memo</text><text x=\"260\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Parent state change</text><text x=\"260\" y=\"148\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Object.is on each prop</text><text x=\"260\" y=\"220\" fill=\"#34d399\" font-size=\"10\" text-anchor=\"start\">Memoized component skipped</text><text x=\"260\" y=\"220\" fill=\"#f87171\" font-size=\"10\" text-anchor=\"start\">Component re-renders</text></svg>",
  "codeExamples": [
    {
      "title": "React.memo with Stable Props and useCallback",
      "useCase": "Correct pattern for effective memoization",
      "code": "const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {\n  console.log(\"ProductCard render:\", product.id);\n  return (\n    <div className=\"card\">\n      <h3>{product.name}</h3>\n      <p>${product.price}</p>\n      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>\n    </div>\n  );\n});\n\nfunction ProductList({ products }) {\n  const handleAddToCart = useCallback((id) => {\n    console.log(\"Added:\", id);\n  }, []);\n\n  return (\n    <div className=\"grid\">\n      {products.map(p => (\n        <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />\n      ))}\n    </div>\n  );\n}",
      "description": "useCallback stabilizes the onAddToCart function reference. Without it, every parent render creates a new function, causing every ProductCard to re-render despite React.memo. The key prop already prevents re-rendering moved items; React.memo prevents re-rendering items whose data has not changed."
    },
    {
      "title": "Custom Comparison Function for React.memo",
      "useCase": "Optimize comparison logic for specific prop shapes",
      "code": "const WeatherWidget = React.memo(function WeatherWidget({ temp, unit }) {\n  console.log(\"WeatherWidget render\");\n  const displayTemp = unit === \"C\" ? temp : (temp * 9/5 + 32);\n  return <p>{displayTemp.toFixed(1)}Ã‚Â°{unit}</p>;\n}, (prev, next) => {\n  // Custom: round comparison to 1 decimal place\n  return Math.round(prev.temp * 10) === Math.round(next.temp * 10)\n      && prev.unit === next.unit;\n});\n\nfunction Dashboard({ sensorData }) {\n  const [refresh, setRefresh] = useState(0);\n\n  // Sensor data updates every second but often changes by < 0.01\n  return (\n    <div>\n      <WeatherWidget temp={sensorData.temperature} unit=\"C\" />\n      <button onClick={() => setRefresh(r => r + 1)}>Refresh: {refresh}</button>\n    </div>\n  );\n}",
      "description": "The custom comparison function rounds temperature to 1 decimal place, preventing re-renders for tiny sensor fluctuations. The comparison is fast (math operations, no deep equals) and effectively reduces unnecessary renders."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What comparison does React.memo use by default?",
      "options": [
        "Deep equality (JSON.stringify)",
        "Shallow comparison (Object.is on each prop)",
        "Reference equality only on the props object",
        "No comparison - it always re-renders"
      ],
      "answer": 1,
      "explanation": "React.memo uses Object.is shallow comparison on each prop individually. It compares the previous prop values with the next prop values."
    },
    {
      "question": "When will a React.memo component always re-render?",
      "options": [
        "When its parent re-renders",
        "When its own state changes (useState)",
        "Never - React.memo prevents all re-renders",
        "Only when the page reloads"
      ],
      "answer": 1,
      "explanation": "React.memo does not protect against re-renders caused by the components own state changes, context changes, or prop changes. It only prevents re-renders triggered by the parent re-rendering with identical props."
    },
    {
      "question": "What is required for React.memo to work effectively with object props?",
      "options": [
        "The object must be deeply frozen",
        "useMemo must stabilize the object reference",
        "The object must have fewer than 10 properties",
        "The object must use JSON.parse/stringify"
      ],
      "answer": 1,
      "explanation": "Object props are compared by reference (Object.is). useMemo creates a stable reference so that React.memo sees the object as unchanged across renders where the content hasnt changed."
    },
    {
      "question": "What is the equivalent of React.memo in class components?",
      "options": [
        "React.createElement",
        "PureComponent (via shouldComponentUpdate)",
        "Component with forceUpdate",
        "React.Fragment"
      ],
      "answer": 1,
      "explanation": "PureComponent implements shouldComponentUpdate with shallow prop and state comparison. React.memo is the function component equivalent for props-only comparison."
    },
    {
      "question": "What does the custom comparison function in React.memo return to skip rendering?",
      "options": [
        "true (props are equal, skip render)",
        "false (props are equal, skip render)",
        "null (skip comparison)",
        "undefined (default behavior)"
      ],
      "answer": 0,
      "explanation": "React.memo(Component, (prev, next) => boolean). Return true if props are equal (skip render), false if props changed (re-render)."
    },
    {
      "question": "Which of these completely defeats React.memo optimization?",
      "options": [
        "Using useCallback for event handlers",
        "Passing inline objects as props: <Child config={{ dark: true }} />",
        "Using the key prop in lists",
        "Using useEffect inside the memoized component"
      ],
      "answer": 1,
      "explanation": "Inline objects create new references on every render, causing React.memo to see a prop change every time. useMemo on the object or extracting it outside the component solves this."
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

TOPICS_DATA["react"]["react-react-router"] = {
  "id": "react-react-router",
  "title": "React Router",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "React Router v6 is the standard declarative routing library for React applications with nested routes, loaders, and actions.",
    "It uses a component-based approach: <BrowserRouter>, <Routes>, <Route>, <Link>, and <Outlet> for nested layouts.",
    "React Router v6 introduced loaders (data fetching before render) and actions (form submissions) for route-level data management.",
    "Nested routes with <Outlet> enable persistent layouts where the parent layout remains mounted while child routes change."
  ],
  "laymanDefinition": "React Router is like a GPS for your app. When a user clicks a link or navigates to a URL, React Router determines which components to show, just like a GPS determines which roads to take based on the destination. It enables Single Page Application (SPA) navigation where the page does not reload - the URL changes and React updates the visible components instantly. React Router v6 is the latest version with nested routing (like nested menus), loaders (fetch data before showing a page), and actions (handle form submissions at the route level). It replaces the mental model of \"pages\" with \"component trees that match URL patterns.\"",
  "deepDive": [
    {
      "heading": "React Router v6 Architecture",
      "text": "React Router v6 is built around a hierarchical route configuration. <BrowserRouter> provides the routing context (history, location). <Routes> evaluates the current URL against <Route> patterns and renders the matching route. Each <Route> has a path (URL pattern) and element (component to render). Routes can be nested: parent routes define layouts with <Outlet>, child routes fill the outlet. The match is made using a ranking algorithm (more specific paths win over less specific). Key concepts: (1) Relative links - <Link to=\"settings\"> resolves relative to the parent route. (2) Index routes - the default child route at a path: <Route index element={<Home />} />. (3) Layout routes - routes that only provide layout (no path) with <Outlet> for children. (4) Path parameters: <Route path=\":id\" element={<Detail />} /> - accessed via useParams()."
    },
    {
      "heading": "Data Loading with Loaders",
      "text": "React Router v6.4+ introduced loaders for fetching data before a route renders. A loader is an async function exported from the route module: export async function loader({ params, request }) { const res = await fetch(/api/users/${params.id}); return res.json(); }. The route configuration connects the loader: <Route path=\":id\" element={<UserDetail />} loader={userLoader} />. The component accesses the loaded data via useLoaderData(). Benefits: (1) Data fetching is co-located with routes. (2) Navigation waits for data before rendering the new page (no loading spinners needed for initial data). (3) Loaders run on the server with SSR frameworks (Remix, Next.js). (4) Error handling with errorElement prop on routes. (5) Data revalidation - actions can invalidate and re-fetch loader data."
    },
    {
      "heading": "Form Submissions with Actions",
      "text": "Actions handle form submissions at the route level. An action is an async function that receives the form data: export async function action({ request, params }) { const formData = await request.formData(); await fetch(\"/api/users\", { method: \"POST\", body: formData }); return redirect(\"/users\"); }. Forms use <Form method=\"post\" action=\"/users\"> instead of regular <form>. Benefits: (1) Progressive enhancement - works without JavaScript. (2) Automatic form data serialization. (3) Automatic revalidation of loader data after action completes. (4) useActionData() to access action return values (validation errors, success messages). (5) useNavigation() for pending states (loading indicators during form submission). Actions replace the manual form handling + navigation pattern with a declarative route-level approach."
    },
    {
      "heading": "Nested Routes and Layouts",
      "text": "Nested routes are React Router v6s killer feature. Pattern: (1) Parent route: <Route path=\"dashboard\" element={<DashboardLayout />}>. (2) DashboardLayout has <Outlet /> where child routes render. (3) Child routes: <Route path=\"settings\" element={<Settings />} /> -> renders at /dashboard/settings inside DashboardLayout. Benefits: (1) The parent layout (sidebar, nav) persists while child content changes. (2) Parent data loaders run once; child loaders run independently. (3) Relative navigation: <Link to=\"../settings\"> navigates relative to the current route. (4) Error boundaries at any level: <Route errorElement={<ErrorFallback />}> catches errors in all descendants. (5) Index routes provide a default child: <Route index element={<DashboardHome />} />. This eliminates the manual layout component pattern (wrapping children in layout components at each render)."
    },
    {
      "heading": "Navigation Methods and Hooks",
      "text": "React Router provides multiple navigation methods: (1) <Link to=\"/path\"> - declarative navigation (renders an <a> tag). (2) <NavLink to=\"/path\"> - Link with active state (className receives isActive). (3) useNavigate() - imperative navigation: const navigate = useNavigate(); navigate(\"/dashboard\", { replace: true }). (4) <Navigate to=\"/path\" /> - declarative redirect component. (5) useHref() - resolve a relative URL. (6) useResolvedPath() - resolve a path against the current route. (7) useSearchParams() - read/write URL query parameters: const [searchParams, setSearchParams] = useSearchParams(); searchParams.get(\"q\"). (8) useLocation() - access the current location object (pathname, search, hash, state). (9) useNavigation() - pending state for loading indicators during navigation."
    }
  ],
  "interviewAnswer": "React Router v6 provides declarative routing with <BrowserRouter>, <Routes>, and nested <Route> components. Key features: nested routes with <Outlet> for persistent layouts, loaders for data fetching before render, actions for form submissions, and relative navigation. Use <Link> for navigation, useParams() for URL parameters, useSearchParams() for query strings, and useNavigate() for imperative navigation. React Router v6.4+ added data APIs (loaders, actions) that enable server-renderable routing with automatic revalidation. Error handling via errorElement prop at any route level.",
  "interviewQuestions": [
    {
      "question": "How does React Router v6 differ from v5?",
      "answer": "React Router v6 uses <Routes> instead of <Switch>, relative routing, automatic route ranking (no exact prop), nested routes with <Outlet>, and loaders/actions (v6.4+). No more withRouter HOC - hooks (useParams, useNavigate) replace it."
    },
    {
      "question": "What is the purpose of <Outlet>?",
      "answer": "<Outlet> marks where child routes render inside a parent layout route. The parent component persists across child route changes. Think of it as {children} for routing."
    },
    {
      "question": "What is a loader in React Router?",
      "answer": "A loader is an async function that fetches data before a route renders. Defined alongside the route: <Route loader={userLoader} />. The component accesses data via useLoaderData(). Navigation waits for the loader to complete before rendering."
    },
    {
      "question": "How do forms work in React Router v6.4+?",
      "answer": "Use <Form method=\"post\" action=\"/route\"> instead of regular <form>. The action prop handles submission. An action function at the target route processes the form data and returns the result (redirect, errors, or data)."
    },
    {
      "question": "What is an index route?",
      "answer": "An index route is the default child route rendered when the parent URL matches exactly. <Route index element={<DashboardHome />} /> is equivalent to path=\"\" but explicit. It renders inside the parent Outlet."
    },
    {
      "question": "How do you access URL parameters?",
      "answer": "useParams() hook returns an object of URL parameters: const { id } = useParams() for a route path=\"/users/:id\". URL parameters are strings by default - parse numbers as needed."
    },
    {
      "question": "How do you read and write query strings?",
      "answer": "useSearchParams() returns [searchParams, setSearchParams]. searchParams.get(\"q\") reads the q parameter. setSearchParams({ q: \"react\" }) updates query string. Preserves existing params by default."
    },
    {
      "question": "What is the difference between <Link> and <NavLink>?",
      "answer": "<NavLink> extends <Link> with active state styling. It passes isActive and isPending booleans to the className or style render prop: className={({ isActive }) => isActive ? \"active\" : \"\"}."
    },
    {
      "question": "How does error handling work in React Router v6?",
      "answer": "Each <Route> can have an errorElement prop: <Route errorElement={<ErrorFallback />} />. Errors from loaders, actions, or component rendering are caught by the nearest errorElement ancestor. Use useRouteError() to access the error in the fallback component."
    },
    {
      "question": "What is the difference between useNavigate and <Link>?",
      "answer": "<Link> is declarative (renders an <a> tag, works with right-click/open in new tab). useNavigate is imperative (programmatic navigation, no <a> tag generated). Prefer <Link> for visible navigation, useNavigate for side effects (redirect after form submission)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Router Route Hierarchy</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"35\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"67.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\"><Route path=\"/\"></text><text x=\"130\" y=\"84.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Root layout</text><text x=\"40\" y=\"110\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"><Route index element={<Home />} /></text><text x=\"40\" y=\"135\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"><Route path=\"about\" element={<About />} /></text><text x=\"40\" y=\"160\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"><Route path=\"dashboard\" element={<Layout />}></text><text x=\"50\" y=\"185\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\"><Route index element={<Overview />} /></text><text x=\"50\" y=\"210\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\"><Route path=\"settings\" element={<Settings />} /></text><text x=\"40\" y=\"235\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"></Route></text><text x=\"40\" y=\"260\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\"><Route path=\"*\" element={<NotFound />} /></text></svg>",
  "codeExamples": [
    {
      "title": "Complete React Router v6 Setup with Data Loading",
      "useCase": "Router configuration with nested routes, loader, and error handling",
      "code": "import { createBrowserRouter, RouterProvider, Outlet, Link, useLoaderData } from \"react-router-dom\";\n\n// Layout component\nfunction RootLayout() {\n  return (\n    <div>\n      <nav><Link to=\"/\">Home</Link> | <Link to=\"/users\">Users</Link></nav>\n      <main><Outlet /></main>\n    </div>\n  );\n}\n\n// Loader for users\nasync function usersLoader() {\n  const res = await fetch(\"/api/users\");\n  if (!res.ok) throw new Error(\"Failed to load users\");\n  return res.json();\n}\n\n// Component using loader data\nfunction Users() {\n  const users = useLoaderData();\n  return (\n    <ul>\n      {users.map(u => <li key={u.id}><Link to={\"/users/\" + u.id}>{u.name}</Link></li>)}\n    </ul>\n  );\n}\n\n// Router configuration\nconst router = createBrowserRouter([\n  {\n    path: \"/\",\n    element: <RootLayout />,\n    errorElement: <div>Oops!<Link to=\"/\">Go home</Link></div>,\n    children: [\n      { index: true, element: <Home /> },\n      { path: \"users\", element: <Users />, loader: usersLoader },\n      { path: \"users/:id\", element: <UserDetail />, loader: userDetailLoader },\n      { path: \"*\", element: <NotFound /> }\n    ]\n  }\n]);\n\nfunction App() {\n  return <RouterProvider router={router} />;\n}",
      "description": "createBrowserRouter defines the route hierarchy as a JS object, supporting loaders, actions, and errorElement. RouterProvider renders the matched route. Nested routes inherit the parent layout. The errorElement catches rendering/loader errors in the entire tree."
    },
    {
      "title": "Protected Routes with Authentication",
      "useCase": "Guard routes with authentication check and redirect",
      "code": "import { Navigate, useLocation, Outlet } from \"react-router-dom\";\n\nfunction useAuth() {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    fetch(\"/api/auth/me\").then(r => r.ok ? r.json() : null).then(setUser);\n  }, []);\n  return user;\n}\n\nfunction RequireAuth() {\n  const user = useAuth();\n  const location = useLocation();\n\n  if (user === undefined) return <Spinner />; // loading\n  if (!user) {\n    return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  }\n  return <Outlet />;\n}\n\n// Router:\nconst router = createBrowserRouter([\n  { path: \"/login\", element: <LoginPage /> },\n  {\n    element: <RequireAuth />,\n    children: [\n      { path: \"/dashboard\", element: <Dashboard /> },\n      { path: \"/settings\", element: <Settings /> },\n      { path: \"/admin\", element: <AdminPanel /> }\n    ]\n  },\n  { path: \"*\", element: <NotFound /> }\n]);",
      "description": "The RequireAuth layout route checks authentication status. If not authenticated, it redirects to /login with the original location saved in state (for redirect-back after login). Authenticated routes render via <Outlet />. The loader pattern can also handle auth checks centrally."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the purpose of <Outlet> in React Router?",
      "options": [
        "Renders a loading spinner",
        "Marks where child routes render inside a layout component",
        "Creates a new browser tab",
        "Redirects to the home page"
      ],
      "answer": 1,
      "explanation": "<Outlet> is the placeholder where child routes render inside a parent layout route. The parent persists across child changes."
    },
    {
      "question": "What does useLoaderData() return?",
      "options": [
        "The current URL",
        "Data fetched by the nearest route loader",
        "The form state",
        "The React component tree"
      ],
      "answer": 1,
      "explanation": "useLoaderData() returns the data returned by the route's loader function. The data is available after the loader completes."
    },
    {
      "question": "What is the difference between <Routes> (v6) and <Switch> (v5)?",
      "options": [
        "They are the same",
        "<Routes> uses automatic route ranking (no exact needed) and supports nested routes natively",
        "<Switch> is faster",
        "<Routes> does not support path parameters"
      ],
      "answer": 1,
      "explanation": "React Router v6 <Routes> automatically ranks routes by specificity. The most specific match wins. No exact prop needed. Supports nested route configuration."
    },
    {
      "question": "What does the errorElement prop do?",
      "options": [
        "Catches errors in the route subtree and renders a fallback UI",
        "Redirects to an error page",
        "Logs errors to the console",
        "Prevents the route from rendering"
      ],
      "answer": 0,
      "explanation": "errorElement defines a fallback component for errors thrown in the route's children (loaders, actions, component rendering). Access the error with useRouteError()."
    },
    {
      "question": "How do you create a catch-all 404 route?",
      "options": [
        "<Route path=\"*\" element={<NotFound />} />",
        "<Route path=\"404\" element={<NotFound />} />",
        "<Route catchAll element={<NotFound />} />",
        "<Route default element={<NotFound />} />"
      ],
      "answer": 0,
      "explanation": "path=\"*\" is a wildcard that matches any URL not matched by previous routes. Place it last in the route configuration."
    },
    {
      "question": "What does useSearchParams() return?",
      "options": [
        "searchParams, setSearchParams] for reading and writing URL query parameters",
        "The current URL pathname",
        "[params, navigate] for URL manipulation",
        "[query, setQuery] for search state"
      ],
      "answer": 0,
      "explanation": "useSearchParams() returns a URLSearchParams object and a setter function. searchParams.get(\"q\") reads the q parameter; setSearchParams({ q: \"react\" }) updates it."
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
  "diagramSvg": "<svg viewBox=\"0 0 700 380\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:700px;\"><defs><marker id=\"arrRTK\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"680\" height=\"360\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"350\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Redux Toolkit Architecture</text><rect x=\"40\" y=\"55\" width=\"620\" height=\"100\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"350\" y=\"78\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">configureStore</text><rect x=\"55\" y=\"90\" width=\"290\" height=\"50\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"200\" y=\"108\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">createSlice</text><text x=\"200\" y=\"125\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Generates actions + reducers</text><rect x=\"355\" y=\"90\" width=\"290\" height=\"50\" rx=\"4\" fill=\"#2a2f45\"/><text x=\"500\" y=\"108\" fill=\"#e8eaed\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">createAsyncThunk</text><text x=\"500\" y=\"125\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">Pending/fulfilled/rejected</text><line x1=\"350\" y1=\"155\" x2=\"350\" y2=\"185\" stroke=\"#fbbf24\" stroke-width=\"2\" marker-end=\"url(#arrRTK)\"/><rect x=\"40\" y=\"185\" width=\"620\" height=\"60\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"350\" y=\"208\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Immer-powered reducers (mutable syntax, immutable output)</text><text x=\"350\" y=\"228\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">state.counter.value += 1 â†’ produces new immutable state</text><line x1=\"350\" y1=\"245\" x2=\"350\" y2=\"272\" stroke=\"#e5c07b\" stroke-width=\"2\" marker-end=\"url(#arrRTK)\"/><rect x=\"40\" y=\"272\" width=\"620\" height=\"55\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#e5c07b\" stroke-width=\"1.5\"/><text x=\"350\" y=\"292\" fill=\"#e5c07b\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Built-in: Redux Thunk + DevTools + Middleware</text><text x=\"350\" y=\"312\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Zero-config setup, no manual middleware wiring</text></svg>",
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

TOPICS_DATA["react"]["react-rendering-cycle"] = {
  "id": "react-rendering-cycle",
  "title": "React Rendering Cycle",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Rendering in React has three phases: Render (create VDOM), Reconciliation (diff VDOM), Commit (apply DOM changes).",
    "The render phase is pure and can be interrupted (in concurrent mode) - it creates a new VDOM tree.",
    "Reconciliation compares the new VDOM with the previous VDOM using the key-based diffing algorithm.",
    "The commit phase applies DOM mutations synchronously and runs lifecycle methods and effects."
  ],
  "laymanDefinition": "React's rendering cycle is like renovating a house with blueprints. First, React draws the new blueprints (Render phase - creates a virtual representation of the UI). Then it compares the new blueprints with the old ones to find differences (Reconciliation - like finding which rooms changed). Finally, it physically changes only the rooms that are different (Commit phase - updates the real DOM). The magic is that React figures out the minimal set of changes needed and batches them efficiently. In React 18, React can even pause the blueprint drawing if something more urgent comes in (concurrent mode), ensuring the app stays responsive.",
  "deepDive": [
    {
      "heading": "Phase 1: Render Phase (Creating the VDOM)",
      "text": "The render phase starts when a state update, prop change, or context change triggers a re-render. React calls the component function to produce React elements (the Virtual DOM). This phase is \"pure\" - it must have no side effects (no API calls, no DOM mutations). React may call the component function multiple times for the same render in development (StrictMode). In concurrent mode, the render phase can be interrupted by higher-priority updates and resumed later. If React detects no change (via bailout from memo/useMemo/shouldComponentUpdate), it skips the subtree entirely. The output of the render phase is a fiber tree (React internal representation), not the actual DOM."
    },
    {
      "heading": "Phase 2: Reconciliation (The Diffing Algorithm)",
      "text": "Reconciliation is the process of comparing the new VDOM tree with the previous one. React uses a heuristic O(n) algorithm based on two assumptions: (1) Different element types produce different trees (replacing <div> with <span> tears down the subtree). (2) Keys identify stable elements across renders. The algorithm: (a) If the element type changed (div -> span), destroy the old tree and build a new one. (b) If the type is the same, update the existing DOM element with changed props/attributes. (c) For lists, use keys to determine which items changed position, were added, or removed. The key prop is critical for list reconciliation - use stable, unique, and predictable keys (item IDs), avoiding array indices."
    },
    {
      "heading": "Phase 3: Commit Phase (DOM Mutations and Effects)",
      "text": "After reconciliation produces a list of DOM mutations (insertions, deletions, updates), the commit phase applies them synchronously. This phase is not interruptible - it must complete atomically. The commit phase has sub-steps: (a) Before mutation - getSnapshotBeforeUpdate runs. (b) Mutation - React applies DOM changes (insert, update, remove nodes). (c) Layout effects - useLayoutEffect callbacks fire synchronously (before paint). (d) Passive effects - useEffect callbacks are scheduled to fire after paint. The commit phase is where side effects are safe because the DOM is available and React has finished all computations."
    },
    {
      "heading": "Batching and Scheduling",
      "text": "React batches state updates for efficiency: (1) In React 17 and earlier, updates in event handlers (onClick, onChange) are batched. (2) React 18 adds automatic batching for all updates (setTimeout, Promises, native events) - multiple setState calls in the same microtask produce a single render. (3) Scheduling: React prioritizes updates based on their type (user input > network response > data prefetch). Lane priorities in the scheduler determine which updates to process first. (4) In concurrent mode, React can interrupt a low-priority render to process a high-priority input update, then resume the low-priority render. This ensures the app stays responsive during large renders."
    },
    {
      "heading": "Concurrent Mode and the Rendering Cycle",
      "text": "React 18s concurrent mode fundamentally changes the render phase: (1) Rendering is interruptible - React can pause, yield to the browser, and resume. (2) Multiple renders can be in progress simultaneously (different priority levels). (3) Aborted renders are discarded - their DOM mutations never commit. (4) useTransition marks updates as low-priority, allowing React to show stale UI while preparing new content. (5) useDeferredValue defers re-rendering for non-urgent parts of the tree. (6) The render phase remains pure (no side effects) - this is crucial because aborted renders would leak side effects otherwise. Concurrent mode preserves all existing React patterns - it only affects scheduling, not component logic."
    }
  ],
  "interviewAnswer": "React's rendering cycle has three phases: Render (pure, creates VDOM, can be interrupted in concurrent mode), Reconciliation (O(n) key-based diffing algorithm), and Commit (synchronous DOM mutations + layout effects + passive effects). The render phase must be pure with no side effects (this is critical for concurrent mode where renders can be aborted). React batches state updates automatically in React 18 for all contexts. Keys are essential for efficient list reconciliation - use stable IDs, avoid array indices. Concurrent mode adds prioritization: urgent updates (user input) interrupt non-urgent renders.",
  "interviewQuestions": [
    {
      "question": "What are the three phases of React rendering?",
      "answer": "(1) Render phase - creates VDOM (pure, interruptible). (2) Reconciliation - diffs old and new VDOM using keys. (3) Commit phase - applies DOM mutations (synchronous, not interruptible) and runs effects."
    },
    {
      "question": "Why must the render phase be pure?",
      "answer": "Because React may call component functions multiple times (StrictMode), interrupt renders in concurrent mode, or discard aborted renders. Side effects during render would cause bugs like double API calls or inconsistent state."
    },
    {
      "question": "How does React achieve O(n) reconciliation?",
      "answer": "By making two assumptions: (1) Different element types produce different trees (full teardown). (2) Keys identify stable children across renders. This avoids a full tree diff (which would be O(n^3))."
    },
    {
      "question": "What is the role of keys in reconciliation?",
      "answer": "Keys help React identify which list items changed position, were added, or removed. Stable keys (item IDs) allow React to preserve component state and avoid unnecessary unmounts/remounts when the list order changes."
    },
    {
      "question": "What happens in the commit phase?",
      "answer": "React applies DOM mutations synchronously (insert, update, remove). Then runs useLayoutEffect (before paint) and schedules useEffect (after paint). The commit phase is not interruptible."
    },
    {
      "question": "What is batching in React?",
      "answer": "Batching groups multiple state updates into a single re-render for performance. React 18 added automatic batching - all updates (event handlers, timeouts, Promises, native events) are batched. Previously only event handler updates were batched."
    },
    {
      "question": "How does concurrent mode make rendering interruptible?",
      "answer": "React splits rendering into small units of work and yields to the browser between units. The scheduler prioritizes updates (user input > data fetching). A higher-priority update interrupts a lower-priority render, which is discarded."
    },
    {
      "question": "What is the difference between useLayoutEffect and useEffect in the cycle?",
      "answer": "useLayoutEffect runs synchronously in the commit phase BEFORE the browser paints. useEffect runs asynchronously AFTER paint. useLayoutEffect blocks paint; useEffect does not."
    },
    {
      "question": "What is the fiber architecture?",
      "answer": "Fiber is Reacts internal data structure representing a unit of work. Each component instance has a fiber node. The fiber tree enables incremental rendering: React can pause, resume, and prioritize work at the fiber (component) level."
    },
    {
      "question": "How does React bail out of rendering a subtree?",
      "answer": "If React.memo, shouldComponentUpdate, or useMemo indicates no change, React skips the subtree during reconciliation. The child component function is not called, and the existing VDOM is reused. This is the primary performance optimization mechanism."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 350\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"330\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Rendering Cycle</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. Trigger</text><text x=\"130\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">State/prop/context change</text><line x1=\"130\" y1=\"95\" x2=\"130\" y2=\"115\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"115\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"130\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. Render Phase</text><text x=\"130\" y=\"147\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Create VDOM (pure, interruptible)</text><line x1=\"130\" y1=\"155\" x2=\"130\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"175\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"190\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. Reconciliation</text><text x=\"130\" y=\"207\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Diff VDOM, find changes</text><line x1=\"130\" y1=\"215\" x2=\"130\" y2=\"235\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"235\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"250\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. Commit Phase</text><text x=\"130\" y=\"267\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Apply DOM mutations (sync)</text><line x1=\"130\" y1=\"275\" x2=\"130\" y2=\"295\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"295\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"310\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">5. Effects</text><text x=\"130\" y=\"327\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">useLayoutEffect -> useEffect</text></svg>",
  "codeExamples": [
    {
      "title": "Understanding Reconciliation with Keys",
      "useCase": "Demonstrates how keys affect list re-rendering behavior",
      "code": "function TodoList() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: \"Learn React\", done: false },\n    { id: 2, text: \"Build project\", done: false },\n  ]);\n\n  const addFirst = () => {\n    setTodos([{ id: Date.now(), text: \"New first\", done: false }, ...todos]);\n  };\n\n  return (\n    <ul>\n      {todos.map(todo => (\n        // GOOD: key={todo.id} - stable identity\n        // BAD: key={index} - items shift, React remounts everything\n        <li key={todo.id}>\n          <Checkbox checked={todo.done} />\n          <span>{todo.text}</span>\n        </li>\n      ))}\n    </ul>\n  );\n}",
      "description": "With key={id}, adding an item at the beginning only inserts one new <li> - existing items keep their state. With key={index}, every item gets a new key, causing React to remount all <li> elements and lose input selections/scroll positions."
    },
    {
      "title": "Profiling Re-renders with React DevTools",
      "useCase": "Identify unnecessary renders and optimize",
      "code": "// 1. Wrap expensive subtree in React.memo\nconst ExpensiveList = React.memo(function ExpensiveList({ items }) {\n  console.log(\"ExpensiveList render\");\n  return items.map(item => <SlowItem key={item.id} data={item} />);\n});\n\n// 2. Use useMemo for computed data\nfunction Dashboard({ rawData }) {\n  const processed = useMemo(() => {\n    return rawData.filter(d => d.active).map(transform);\n  }, [rawData]);\n\n  // 3. Use useCallback for stable callbacks\n  const handleClick = useCallback((id) => {\n    setSelected(id);\n  }, []);\n\n  return (\n    <div>\n      <ExpensiveList items={processed} onItemClick={handleClick} />\n    </div>\n  );\n}\n\n// 4. Use React DevTools Profiler to:\n// - Record interactions and see which components re-rendered\n// - Check render timing (ms per component)\n// - Identify \"why did this render?\" tooltip",
      "description": "The React DevTools Profiler records renders and shows: which components re-rendered, why (props/state/context), and how long they took. This data-driven approach identifies actual optimization opportunities instead of guessing."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the correct order of React rendering phases?",
      "options": [
        "Commit -> Reconciliation -> Render",
        "Render -> Reconciliation -> Commit",
        "Render -> Commit -> Reconciliation",
        "Reconciliation -> Render -> Commit"
      ],
      "answer": 1,
      "explanation": "Render phase creates VDOM, Reconciliation diffs it, Commit phase applies DOM mutations."
    },
    {
      "question": "Which phase can be interrupted in concurrent mode?",
      "options": [
        "Commit phase",
        "Render phase",
        "Both phases",
        "Neither phase"
      ],
      "answer": 1,
      "explanation": "The render phase is interruptible in concurrent mode. The commit phase is always synchronous and not interruptible."
    },
    {
      "question": "What happens if a component returns the same element type but different props?",
      "options": [
        "React destroys and recreates the DOM node",
        "React updates the existing DOM node with the new props",
        "React ignores the change",
        "React throws an error"
      ],
      "answer": 1,
      "explanation": "Same element type + key = same DOM node. React updates only the changed attributes/properties on the existing node."
    },
    {
      "question": "What is the time complexity of Reacts reconciliation algorithm?",
      "options": [
        "O(n^2)",
        "O(n)",
        "O(log n)",
        "O(n^3)"
      ],
      "answer": 1,
      "explanation": "React's heuristic algorithm achieves O(n) by assuming element type stability and using keys, avoiding O(n^3) full tree diff."
    },
    {
      "question": "Which mechanism allows React to skip rendering a subtree entirely?",
      "options": [
        "Key prop",
        "React.memo or shouldComponentUpdate",
        "Ref forwarding",
        "Error boundaries"
      ],
      "answer": 1,
      "explanation": "React.memo (function) and shouldComponentUpdate (class) let React bail out of rendering the entire subtree if props have not changed."
    },
    {
      "question": "In React 18, which updates are batched?",
      "options": [
        "Only event handler updates",
        "All updates (event handlers, timeouts, Promises, native events)",
        "Only concurrent mode updates",
        "Only useTransition updates"
      ],
      "answer": 1,
      "explanation": "React 18 introduced automatic batching for all updates. Multiple setState calls anywhere in the same microtask produce a single render."
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

TOPICS_DATA["react"]["react-state-management-patterns"] = {
  "id": "react-state-management-patterns",
  "title": "React State Management Patterns",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "React state management ranges from local (useState, useReducer) to global (Context, Redux, Zustand, Jotai).",
    "Choose the simplest solution: local state first, then lift state up, then Context, then external libraries.",
    "Redux provides predictable state with middleware, DevTools, and a mature ecosystem for large-scale apps.",
    "Modern alternatives (Zustand, Jotai, Valtio) offer simpler APIs with similar capabilities."
  ],
  "laymanDefinition": "State management is about deciding where each piece of data lives in your app. Think of state like water: it starts local (in a single component), but as more components need the same data, you move it higher up (lift state up), create streams (Context), or build a reservoir (Redux/Zustand). The golden rule: use the simplest solution that works. Do not add Redux to an app that only needs local state. React 18s useReducer + Context handles many cases that previously required Redux. For truly complex apps, Redux Toolkit or Zustand provide structure, DevTools, and predictable updates.",
  "deepDive": [
    {
      "heading": "Local State: useState and useReducer",
      "text": "The foundation of React state management. useState for simple independent values (strings, numbers, booleans). useReducer for complex state objects with multiple fields that update together. Best practices: (1) Keep state as local as possible - only lift it up when multiple components need it. (2) Co-locate state with the component that renders it. (3) Use derived state (computed values) instead of storing redundant state: const total = items.reduce((s, i) => s + i.price, 0) instead of storing total separately. (4) Use callback setter for state that depends on previous state: setCount(c => c + 1). (5) Avoid storing props-derived state in useState - compute it directly. (6) useReducer centralizes complex update logic and makes it testable."
    },
    {
      "heading": "Lifting State Up and Props Drilling",
      "text": "When multiple components need the same state, lift it to their nearest common ancestor and pass it down via props. This is the simplest form of shared state and works well for 2-3 levels of nesting. Beyond that, prop drilling (passing props through intermediate components that do not use them) becomes a problem. Signs of excessive prop drilling: (1) Props passed through 4+ levels of nesting. (2) Intermediate components have props only for passing down (not for their own use). (3) Adding a new feature requires threading new props through many components. Solutions: Context, composition (pass components as props/children), or external state management. Composition can reduce prop drilling: instead of <Layout><Page user={user} /></Layout>, use <Layout header={<UserHeader user={user} />} />."
    },
    {
      "heading": "React Context for Global State",
      "text": "React Context provides a way to pass data through the component tree without prop drilling. Pattern: (1) Create context with createContext(defaultValue). (2) Create a Provider component that holds the state with useState/useReducer and passes it via context. (3) Consumer components use useContext() to access the state. Best practices: (1) Split contexts by domain (AuthContext, ThemeContext, CartContext) to avoid unnecessary re-renders. (2) Separate state and dispatch into two contexts for performance. (3) Memoize context values to prevent re-renders of all consumers when the provider re-renders: const value = useMemo(() => ({ user, login }), [user]). (4) Context is NOT a state management library - it is a dependency injection mechanism. (5) For frequently-updating state (mouse position, form input), Context can cause performance issues due to mass re-renders."
    },
    {
      "heading": "Redux Toolkit: The Mature Solution",
      "text": "Redux Toolkit (RTK) is the modern recommended way to use Redux. Key features: (1) configureStore - creates store with middleware (thunk by default), DevTools, and combined reducers. (2) createSlice - defines reducers and actions in one concise API. (3) createAsyncThunk - handles async action lifecycle (pending, fulfilled, rejected). (4) RTK Query - built-in data fetching and caching (like React Query). Redux is best for: (1) Large-scale apps with complex state interactions. (2) Apps needing middleware (sagas, thunks for complex async flows). (3) Teams that benefit from the strict structure and patterns. (4) Apps where time-travel debugging is valuable. (5) Apps that share state across many unrelated components. The criticism: Redux has too much boilerplate (even with RTK) for small/medium apps."
    },
    {
      "heading": "Modern Alternatives: Zustand, Jotai, and Valtio",
      "text": "These newer libraries address Redux boilerplate while providing similar capabilities: (1) Zustand - minimal API: const useStore = create((set) => ({ count: 0, increment: () => set(s => ({ count: s.count + 1 })) })). No provider needed, no reducers, no actions. (2) Jotai - atomic state model inspired by Recoil: const countAtom = atom(0); const [count, setCount] = useAtom(countAtom). Fine-grained re-renders. (3) Valtio - proxy-based: const state = proxy({ count: 0 }); state.count++ triggers re-renders automatically. These libraries are suitable for medium-scale apps where Context would cause excessive re-renders but Redux is overkill. They all support DevTools, TypeScript, and middleware. Choose based on mental model preference: Zustand (flux-like, single store), Jotai (atomic, fine-grained), Valtio (mutable proxy)."
    }
  ],
  "interviewAnswer": "React state management ranges from local (useState/useReducer) to global (Context, Redux, Zustand). The principle: choose the simplest solution - start with local state, lift state up as needed, use Context for medium-depth sharing, and external libraries for complex global state. Redux Toolkit provides structure for large apps with createSlice, createAsyncThunk, and RTK Query. Modern alternatives (Zustand, Jotai, Valtio) offer simpler APIs for medium scale. Split Context by domain and memoize values to avoid re-render issues. Never use Context for frequently-updating global state - use a library with selector-based subscriptions.",
  "interviewQuestions": [
    {
      "question": "What is the most important principle in choosing a state management solution?",
      "answer": "Always start with the simplest solution that works: local state -> lift state up -> Context -> external library. Do not add complexity before it is needed."
    },
    {
      "question": "What problem does lifting state up solve?",
      "answer": "When multiple sibling components need the same data, move the state to their nearest common ancestor and pass it down via props. This keeps the state in a single location and avoids duplicate state."
    },
    {
      "question": "What are the downsides of React Context for state management?",
      "answer": "(1) All consumers re-render when the context value changes (no built-in selectors). (2) Frequent updates cause performance issues. (3) Context is not designed for high-frequency updates (mouse position, animations). (4) Deeply nested providers create complex component trees."
    },
    {
      "question": "How does Redux handle side effects?",
      "answer": "Middleware. Redux Thunk (built into RTK) for async logic: createAsyncThunk handles pending/fulfilled/rejected. Redux Saga for complex workflows (race conditions, parallel tasks, debouncing). RTK Query for data fetching/caching."
    },
    {
      "question": "What is the difference between Zustand and Redux?",
      "answer": "Zustand has minimal API (no reducers, no actions, no Provider), supports selectors by default, and requires less boilerplate. Redux provides more structure (middleware, DevTools, standardized patterns) suitable for large teams and complex apps."
    },
    {
      "question": "How does Jotai differ from Zustand?",
      "answer": "Jotai uses atomic state - each piece of state is an independent atom. Components subscribe to individual atoms, so only components using the changed atom re-render. Zustand uses a single store with selector-based subscriptions."
    },
    {
      "question": "What is the purpose of splitting Context into multiple providers?",
      "answer": "To prevent unnecessary re-renders. If auth state and theme state are in one context, any auth change re-renders theme consumers. Separate contexts isolate re-render scope. Split state and dispatch into separate contexts too."
    },
    {
      "question": "When would you use useReducer instead of useState?",
      "answer": "When state is an object with multiple fields that update together (form state, async state with loading/error/data), or when the next state depends heavily on the previous state. useReducer makes complex transitions predictable and testable."
    },
    {
      "question": "What is RTK Query?",
      "answer": "A data fetching and caching library built into Redux Toolkit. It manages API requests, caching, polling, optimistic updates, and automatic re-fetching. Inspired by React Query but integrated with Redux DevTools and middleware."
    },
    {
      "question": "What is the recommended state management approach for a new medium-scale React app?",
      "answer": "Start with local state + Context for global concerns (theme, auth). If re-render performance becomes an issue, add Zustand or Jotai for specific state domains. Only reach for Redux Toolkit when the app has complex async flows, many state interactions, and a team that benefits from the strict patterns."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">State Management Spectrum</text><rect x=\"30\" y=\"55\" width=\"120\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"90\" y=\"70\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useState</text><text x=\"90\" y=\"87\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Simple, local</text></svg>",
  "codeExamples": [
    {
      "title": "Zustand Store for Cart State",
      "useCase": "Modern state management with minimal boilerplate",
      "code": "import { create } from \"zustand\";\nimport { persist } from \"zustand/middleware\";\n\nconst useCartStore = create(\n  persist(\n    (set, get) => ({\n      items: [],\n      discount: 0,\n\n      addItem: (product) => set((state) => {\n        const existing = state.items.find(i => i.id === product.id);\n        if (existing) {\n          return { items: state.items.map(i =>\n            i.id === product.id ? { ...i, qty: i.qty + 1 } : i\n          )};\n        }\n        return { items: [...state.items, { ...product, qty: 1 }] };\n      }),\n\n      removeItem: (id) => set((state) => ({\n        items: state.items.filter(i => i.id !== id)\n      })),\n\n      getTotal: () => {\n        const { items, discount } = get();\n        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);\n        return Math.max(0, subtotal - discount);\n      },\n\n      clearCart: () => set({ items: [], discount: 0 })\n    }),\n    { name: \"cart-storage\" }\n  )\n);\n\n// In components:\nfunction Cart() {\n  const items = useCartStore((state) => state.items);\n  const addItem = useCartStore((state) => state.addItem);\n  const total = useCartStore((state) => state.getTotal());\n\n  return (\n    <div>\n      {items.map(i => <div key={i.id}>{i.name} x{i.qty}</div>)}\n      <p>Total: ${total}</p>\n      <button onClick={() => addItem({ id: 1, name: \"Widget\", price: 9.99 })}>\n        Add Widget\n      </button>\n    </div>\n  );\n}",
      "description": "Zustand creates a store with a minimal API. Selector functions (state => state.items) subscribe to specific slices - only components using items re-render when items change. persist middleware saves/loads from localStorage automatically."
    },
    {
      "title": "Redux Toolkit Slice with Async Thunk",
      "useCase": "Complete RTK pattern for a todo app",
      "code": "import { createSlice, createAsyncThunk, configureStore } from \"@reduxjs/toolkit\";\nimport { useSelector, useDispatch } from \"react-redux\";\n\n// Async thunk\nexport const fetchTodos = createAsyncThunk(\"todos/fetchTodos\", async () => {\n  const res = await fetch(\"/api/todos\");\n  return res.json();\n});\n\n// Slice\nconst todosSlice = createSlice({\n  name: \"todos\",\n  initialState: { items: [], status: \"idle\", error: null },\n  reducers: {\n    toggleTodo: (state, action) => {\n      const todo = state.items.find(t => t.id === action.payload);\n      if (todo) todo.completed = !todo.completed;\n    },\n    removeTodo: (state, action) => {\n      state.items = state.items.filter(t => t.id !== action.payload);\n    }\n  },\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchTodos.pending, (state) => { state.status = \"loading\"; })\n      .addCase(fetchTodos.fulfilled, (state, action) => {\n        state.status = \"succeeded\";\n        state.items = action.payload;\n      })\n      .addCase(fetchTodos.rejected, (state, action) => {\n        state.status = \"failed\";\n        state.error = action.error.message;\n      });\n  }\n});\n\nexport const { toggleTodo, removeTodo } = todosSlice.actions;\n\nconst store = configureStore({ reducer: { todos: todosSlice.reducer } });\n\n// Usage in component:\nfunction TodoList() {\n  const dispatch = useDispatch();\n  const { items, status, error } = useSelector(s => s.todos);\n\n  useEffect(() => { dispatch(fetchTodos()); }, [dispatch]);\n\n  if (status === \"loading\") return <Spinner />;\n  if (status === \"failed\") return <Error message={error} />;\n\n  return items.map(t => (\n    <div key={t.id}>\n      <span onClick={() => dispatch(toggleTodo(t.id))}\n        style={{ textDecoration: t.completed ? \"line-through\" : \"none\" }}>\n        {t.title}\n      </span>\n      <button onClick={() => dispatch(removeTodo(t.id))}>x</button>\n    </div>\n  ));\n}",
      "description": "createSlice generates actions and reducers from a concise object definition. createAsyncThunk handles the async lifecycle (pending, fulfilled, rejected). configureStore sets up the store with middleware and DevTools. Redux DevTools provides time-travel debugging."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the simplest React state management solution?",
      "options": [
        "Redux",
        "useState and local state",
        "Zustand",
        "Context"
      ],
      "answer": 1,
      "explanation": "Always start with local useState. Only add complexity (Context, libraries) when local state + lifting state up is insufficient."
    },
    {
      "question": "What problem does lifting state up solve?",
      "options": [
        "Reduces bundle size",
        "Multiple sibling components need the same state - move it to their common ancestor",
        "Eliminates all re-renders",
        "Replaces Redux"
      ],
      "answer": 1,
      "explanation": "Lifting state up shares state between sibling components via a common parent. It is the simplest form of shared state."
    },
    {
      "question": "What is a major downside of React Context for global state?",
      "options": [
        "Too much boilerplate",
        "All consumers re-render when the context value changes (no built-in selector optimization)",
        "Does not work with TypeScript",
        "Requires Redux to work"
      ],
      "answer": 1,
      "explanation": "Context does not support selector-based subscriptions. Any change to the context value re-renders ALL consumers, which can be a performance issue for frequently-updating state."
    },
    {
      "question": "Which library provides atomic (fine-grained) state management?",
      "options": [
        "Redux Toolkit",
        "Jotai",
        "Zustand",
        "Context"
      ],
      "answer": 1,
      "explanation": "Jotai uses atomic state where each atom is an independent piece of state. Components subscribe to individual atoms, ensuring minimal re-renders."
    },
    {
      "question": "What does createAsyncThunk handle?",
      "options": [
        "Throttling user input",
        "The full lifecycle of an async request (pending, fulfilled, rejected) with automatic action dispatching",
        "Client-side caching",
        "Form validation"
      ],
      "answer": 1,
      "explanation": "createAsyncThunk generates three action types (pending/fulfilled/rejected) and dispatches them automatically during the async request lifecycle."
    },
    {
      "question": "What is the recommended state management for a new large-scale enterprise app?",
      "options": [
        "useState only",
        "Zustand",
        "Redux Toolkit (with RTK Query)",
        "Context only"
      ],
      "answer": 2,
      "explanation": "For large-scale apps with complex state, multiple teams, and advanced requirements (middleware, DevTools, normalized cache), Redux Toolkit with RTK Query is the recommended choice."
    }
  ]
};

TOPICS_DATA["react"]["react-suspense"] = {
  "id": "react-suspense",
  "title": "React Suspense",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Suspense lets components \"wait\" for something (lazy loading, data fetching) before rendering, showing a fallback UI in the meantime.",
    "It works with React.lazy for code splitting and is being extended for data fetching in React 18+.",
    "Suspense boundaries can be nested for granular loading states - each boundary independently controls its fallback.",
    "In React 18, Suspense integrates with streaming SSR and concurrent features for better perceived performance."
  ],
  "laymanDefinition": "Suspense is like a placeholder frame at a construction site that says \"Building coming soon!\" while workers finish the actual building behind it. In React, when a component is loading (either code via lazy loading or data via a fetching library), Suspense automatically shows a fallback (spinner, skeleton, placeholder) in place of that component until its ready. Multiple Suspense boundaries can be nested like Russian dolls - each one manages its own loading state independently. The key benefit is declarative loading states: you tell React \"show this spinner while this section loads\", and React handles the timing automatically.",
  "deepDive": [
    {
      "heading": "How Suspense Works Under the Hood",
      "text": "Suspense relies on the concept of \"thrown promises\". When React attempts to render a component tree and encounters a lazy component (or a data-fetching component wrapped with a Suspense-enabled library), the component \"throws\" a Promise instead of returning JSX. React catches this thrown promise, looks up the nearest parent Suspense boundary, and renders that boundary's fallback instead of the component subtree. When the promise resolves, React retries the render. If the promise rejects, the error propagates to the nearest error boundary. This throw/catch mechanism is the core of Suspense - it is not a React-specific feature but a pattern built on JavaScripts error handling. Async React in concurrent mode allows Suspense to work with interrupted and resumed renders."
    },
    {
      "heading": "Suspense for Code Splitting (React.lazy)",
      "text": "This is the most mature Suspense use case. React.lazy creates a component that throws a promise when its chunk is not yet loaded. The Suspense boundary catches it and shows the fallback. Key patterns: (1) One Suspense per route for independent loading. (2) Nested Suspense - layout shell has its own Suspense, child sections have nested Suspense with smaller fallbacks. (3) Suspense with <Outlet /> in React Router v6 for route-level code splitting. (4) Avoid wrapping everything in a single Suspense - the entire page content is replaced by a spinner, creating a poor UX. (5) For frequently used lazy components, consider prefetching the chunk so Suspense resolves immediately."
    },
    {
      "heading": "Suspense for Data Fetching (React 18+)",
      "text": "React 18 introduces Suspense support for data fetching via libraries like Relay, SWR, TanStack Query, and the new use hook. The pattern: (1) A component reads from a resource (e.g., fetchData(id)) that may suspend. (2) If the data is not ready, the resource throws a promise. (3) Suspense catches it and shows fallback. (4) When data resolves, the component re-renders with data. Benefits: (a) No manual loading/error state management - Suspense handles it. (b) Race conditions are eliminated because Suspense coordinates renders with data readiness. (c) Automatic parallel data loading - siblings under Suspense load concurrently. (d) Streaming SSR with Suspense boundaries for progressive HTML delivery."
    },
    {
      "heading": "Nested Suspense and Coordinated Loading",
      "text": "Nested Suspense boundaries provide granular loading UX: (1) Outer Suspense shows page skeleton. (2) Inner Suspense boundaries show section-specific placeholders (e.g., sidebar skeleton, content skeleton, comments skeleton). (3) As each section loads independently, it replaces its placeholder without affecting other sections. (4) useTransition (React 18) defers showing fallback for pending transitions, maintaining the current UI until the new content is ready. (5) SuspenseList (experimental) coordinates the order of appearance - \"together\" (all reveal at once), \"forwards\" (top to bottom sequential reveal), or \"backwards\" (bottom to top). This prevents content from jumping around as sections load."
    },
    {
      "heading": "Error Handling with Suspense",
      "text": "Suspense does not handle errors from rejected promises. Error boundaries are required: wrap Suspense with an error boundary to catch rendering errors including rejected Suspense promises. The error boundary renders a fallback UI when chunk loading fails or data fetching throws. This separation of concerns is intentional: Suspense handles loading (pending states), error boundaries handle failure (rejected states). The combination provides a complete async rendering model: pending -> Suspense fallback, resolved -> component renders, rejected -> error boundary fallback."
    }
  ],
  "interviewAnswer": "Suspense is a React component that shows a fallback UI while child components are loading (code via React.lazy or data via Suspense-enabled libraries). It works via the thrown promise pattern - components throw a promise during loading, Suspense catches it and shows fallback. Multiple Suspense boundaries can be nested for granular loading states. In React 18, Suspense extends to data fetching and streaming SSR. Suspense does NOT handle errors - pair it with error boundaries for complete async handling. Avoid wrapping the entire app in a single Suspense - use focused boundaries for better UX.",
  "interviewQuestions": [
    {
      "question": "What is the thrown promise pattern in Suspense?",
      "answer": "When a component needs to load data or code, it throws a Promise instead of returning JSX. React catches this, finds the nearest Suspense boundary, and renders its fallback. When the Promise resolves, React retries the render."
    },
    {
      "question": "What are the primary use cases for Suspense?",
      "answer": "(1) Code splitting with React.lazy - loading component chunks on demand. (2) Data fetching with Suspense-enabled libraries (Relay, SWR, TanStack Query) - showing fallback while data loads. (3) Streaming SSR in React 18 - progressive HTML delivery."
    },
    {
      "question": "Can Suspense be nested? How does it behave?",
      "answer": "Yes. Each Suspense boundary independently manages its fallback. Outer boundaries show larger skeletons while inner boundaries show section-specific placeholders. When an inner section loads, only its fallback is replaced - other sections remain."
    },
    {
      "question": "How does Suspense differ from a simple conditional loader?",
      "answer": "Suspense is declarative and automatic. You define the boundary and fallback once; React handles timing, transitions, and race conditions. Conditional loaders require manual state management (loading, error, success flags) in every component and are prone to race conditions."
    },
    {
      "question": "Does Suspense handle errors?",
      "answer": "No. Errors from rejected promises (failed chunk loads, API errors) propagate to the nearest error boundary. Always wrap Suspense with an error boundary for robust error handling."
    },
    {
      "question": "What is the relationship between Suspense and useTransition?",
      "answer": "useTransition marks state updates as non-urgent. When a transition triggers a Suspense boundary, React can keep showing the current UI (instead of switching to fallback) while preparing the new content. This prevents jarring loading spinners during navigation."
    },
    {
      "question": "How does React 18s streaming SSR use Suspense?",
      "answer": "The server streams HTML progressively. Suspense boundaries on the server create \"holes\" filled later with server-rendered content. The client shows Suspense fallbacks for unresolved boundaries. This reduces TTFB (Time to First Byte) and Time to Interactive."
    },
    {
      "question": "What happens if two sibling components both suspend?",
      "answer": "Both suspend independently. React shows the common parent Suspense fallback until all siblings resolve. If each sibling has its own Suspense boundary, they load in parallel and each reveals independently."
    },
    {
      "question": "What is the SuspenseList component?",
      "answer": "SuspenseList (experimental) coordinates the reveal order of multiple Suspense boundaries. Options: \"together\" (all reveal at once), \"forwards\" (top to bottom sequentially), or \"backwards\" (bottom to top). Prevents layout shifts and improves perceived performance."
    },
    {
      "question": "Can Suspense be used for server-side data fetching in Next.js?",
      "answer": "Next.js 13+ App Router uses Suspense boundaries for streaming with React Server Components. Each Suspense boundary can independently stream its content from the server, enabling progressive rendering without blocking the page shell."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Suspense Flow</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Component Renders</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Lazy import or data fetch needed</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Throws Promise</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React catches the thrown promise</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"212.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Suspense Fallback</text><text x=\"130\" y=\"229.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Loading spinner/skeleton shown</text><line x1=\"130\" y1=\"240\" x2=\"130\" y2=\"258\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"258\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"273\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Promise Resolves</text><text x=\"130\" y=\"290\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React retries render, component shows</text></svg>",
  "codeExamples": [
    {
      "title": "Nested Suspense for Granular Loading",
      "useCase": "Page shell loads first, sections load independently",
      "code": "function DashboardPage() {\n  return (\n    <Suspense fallback={<PageSkeleton />}>\n      <Header />\n\n      <div className=\"grid\">\n        <Suspense fallback={<CardSkeleton />}>\n          <RevenueChart />\n        </Suspense>\n\n        <Suspense fallback={<CardSkeleton />}>\n          <UserActivityFeed />\n        </Suspense>\n      </div>\n\n      <Suspense fallback={<ListSkeleton />}>\n        <RecentOrdersTable />\n      </Suspense>\n    </Suspense>\n  );\n}\n\n// Each lazy-loaded section:\nconst RevenueChart = React.lazy(() => import(\"./RevenueChart\"));\nconst UserActivityFeed = React.lazy(() => import(\"./UserActivityFeed\"));\nconst RecentOrdersTable = React.lazy(() => import(\"./RecentOrdersTable\"));",
      "description": "The outer Suspense shows a full page skeleton. Inner Suspense boundaries show card/list skeletons. As each section loads, its skeleton is replaced independently. The Header (not lazy) renders immediately."
    },
    {
      "title": "Suspense with Data Fetching (React 18 + use)",
      "useCase": "Declarative data loading with Suspense integration",
      "code": "import { use, Suspense } from \"react\";\n\n// A Suspense-enabled data resource\nfunction fetchUser(id) {\n  const promise = fetch(\"/api/users/\" + id).then(r => r.json());\n  return {\n    read() {\n      if (this.data) return this.data;\n      if (this.error) throw this.error;\n      if (this.promise) throw this.promise;\n      this.promise = promise.then(d => { this.data = d; },\n                                         e => { this.error = e; });\n      throw this.promise;\n    }\n  };\n}\n\nfunction UserProfile({ userId }) {\n  const user = use(fetchUser(userId));\n  return <div><h2>{user.name}</h2><p>{user.email}</p></div>;\n}\n\nfunction App() {\n  return (\n    <Suspense fallback={<div className=\"spinner\" />}>\n      <UserProfile userId={42} />\n    </Suspense>\n  );\n}",
      "description": "The UserProfile component suspends until the fetch resolves. Suspense shows the fallback spinner automatically. When data arrives, the component re-renders with the user data. No manual loading/error state management needed."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What mechanism does Suspense use to detect loading?",
      "options": [
        "Checking a global loading variable",
        "The thrown promise pattern - components throw a Promise while loading",
        "Using setTimeout callbacks",
        "React.memo comparison"
      ],
      "answer": 1,
      "explanation": "Suspense relies on components throwing a Promise during loading. React catches it and shows the fallback."
    },
    {
      "question": "Does Suspense handle error states?",
      "options": [
        "Yes it shows error fallbacks",
        "No - errors must be caught by Error Boundaries",
        "Yes but only for code splitting",
        "No - errors crash the app"
      ],
      "answer": 1,
      "explanation": "Suspense only handles pending (loading) states. Errors (rejected promises) propagate to the nearest error boundary."
    },
    {
      "question": "What is the benefit of nested Suspense?",
      "options": [
        "Faster initial load",
        "Granular loading UX - each section independently shows its loading state and reveals when ready",
        "Smaller bundle size",
        "Better SEO"
      ],
      "answer": 1,
      "explanation": "Nested Suspense provides a better user experience by allowing sections to load independently without affecting other already-loaded sections."
    },
    {
      "question": "What does useTransition do in relation to Suspense?",
      "options": [
        "It disables Suspense",
        "It defers showing the fallback during transitions, keeping the current UI visible",
        "It turns off lazy loading",
        "It shows multiple fallbacks at once"
      ],
      "answer": 1,
      "explanation": "useTransition marks an update as non-urgent. React can keep showing the current UI instead of switching to a loading state during navigation or data transitions."
    },
    {
      "question": "In React 18, how does Suspense enhance SSR?",
      "options": [
        "It blocks SSR entirely",
        "Streaming SSR - the server sends HTML progressively, Suspense boundaries stream independently",
        "It makes SSR slower but more reliable",
        "It replaces SSR with static generation"
      ],
      "answer": 1,
      "explanation": "React 18s streaming SSR uses Suspense boundaries as streaming points. Each boundary can independently stream its content, reducing TTFB."
    },
    {
      "question": "Which library is NOT Suspense-compatible for data fetching?",
      "options": [
        "Relay",
        "SWR",
        "Axios (directly, without a wrapper)",
        "TanStack Query"
      ],
      "answer": 2,
      "explanation": "Axios needs a Suspense-compatible wrapper (like use() from React 18 or a library like @tanstack/react-query with suspense: true). Plain Axios calls do not integrate with Suspense."
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

TOPICS_DATA["react"]["react-usecallback"] = {
  "id": "react-usecallback",
  "title": "React useCallback",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "useCallback returns a memoized version of a callback function that only changes when dependencies change.",
    "Its primary purpose is to prevent unnecessary re-renders of child components wrapped in React.memo.",
    "useCallback(fn, deps) is semantically equivalent to useMemo(() => fn, deps).",
    "Do not use useCallback for inline event handlers in the same component - the optimization only helps when passing callbacks to memoized children."
  ],
  "laymanDefinition": "useCallback is like giving someone your business card instead of rewriting your phone number on a napkin every time you meet. The function itself stays the same (same reference in memory) until its dependencies change. This matters because React.memo checks if props changed by reference - if you pass an inline arrow function as a prop, it is a new function reference every render, so React.memo sees a \"change\" every time and re-renders the child unnecessarily. useCallback keeps the reference stable so React.memo can actually skip renders. Like useMemo, do not add useCallback everywhere - only where profiling shows it helps.",
  "deepDive": [
    {
      "heading": "The Referential Identity Problem",
      "text": "Every time a React component re-renders, all inline functions defined in the component body are recreated as new function objects in memory. Consider: <Child onClick={() => handleClick(id)} />. The arrow function is a new function reference on every render. If Child is wrapped in React.memo, it sees the onClick prop change on every parent render and cannot skip re-rendering. useCallback solves this by returning the same function reference (identity) across renders as long as dependencies have not changed. The function is only recreated when its closure variables actually change. This is the core reason useCallback exists - not to make the component faster directly, but to enable React.memo on children to work effectively."
    },
    {
      "heading": "useCallback in the Component Lifecycle",
      "text": "During the render phase, useCallback checks its dependency array using Object.is comparison. If all dependencies are unchanged, it returns the previously memoized function reference. If any dependency changed, it stores and returns the new function. The old function becomes eligible for garbage collection (assuming no other references). A critical subtlety: if the callback uses state values from a closure, those values are captured at the time the callback was created. With stale closures, the callback may reference outdated state. Proper dependency management via exhaustive-deps lint rule is essential. React 18s automatic batching does not change useCallback behavior."
    },
    {
      "heading": "Common Misconceptions and Overuse",
      "text": "The most common mistake is wrapping every event handler in useCallback, assuming it is a free optimization. In reality: (1) useCallback adds overhead - the dependency comparison runs on every render. (2) For handlers used on native DOM elements (<button onClick={handler}>), React.memo on DOM elements is irrelevant. (3) For handlers passed to non-memoized children, useCallback provides zero benefit because the child re-renders anyway. (4) The dependency array must be correct - omitting a dependency can cause the callback to reference stale values, leading to subtle bugs. (5) If the callback does expensive work internally, useMemo on the result is more appropriate than useCallback on the function."
    },
    {
      "heading": "useCallback vs useMemo for Functions",
      "text": "useCallback(fn, deps) is exactly equivalent to useMemo(() => fn, deps). The React team added useCallback as syntactic sugar because memoizing functions is such a common pattern (passing callbacks to children). Use useCallback when you want to memoize a function reference. Use useMemo when you want to memoize a computed value (object, array, primitive). A common pattern: useCallback for callbacks, useMemo for data objects. Both hooks share the same internal implementation - useCallback is literally implemented as useMemo in React's source code."
    },
    {
      "heading": "Best Practices for Production Use",
      "text": "(1) Always pair useCallback with React.memo on the receiving child - without React.memo, useCallback provides no rendering benefit. (2) Use the exhaustive-deps lint rule to catch missing dependencies. (3) In custom hooks, always return memoized callbacks via useCallback so consumers can memoize effectively. (4) For callbacks used in useEffect dependencies, useCallback helps prevent unnecessary effect re-runs. (5) In React 18 with automatic batching, multiple state updates inside a callback are batched automatically - useCallback does not affect this. (6) Consider using useEvent (React 18 experimental) or useMemoizedFn (from ahooks) for callbacks that should always have a stable identity regardless of dependencies."
    }
  ],
  "interviewAnswer": "useCallback memoizes a function reference between re-renders. It is equivalent to useMemo(() => fn, deps) and exists to enable React.memo child components to skip re-rendering when the function identity is the only thing that changed. Without useCallback, every render creates a new function reference, making React.memo ineffective for children that receive callbacks. The optimization only provides value when: (1) the receiving child is wrapped in React.memo, AND (2) the function is recreated on every render unnecessarily. Do not wrap every handler in useCallback - profile first. Incorrect dependency arrays cause stale closures, caught by the exhaustive-deps lint rule.",
  "interviewQuestions": [
    {
      "question": "What problem does useCallback solve?",
      "answer": "It preserves the reference identity of a function between renders so that React.memo-wrapped child components can detect that the callback prop hasnt actually changed and skip re-rendering. Without useCallback, every render creates a new function object, defeating React.memo."
    },
    {
      "question": "How is useCallback implemented internally?",
      "answer": "useCallback(fn, deps) is identical to useMemo(() => fn, deps). React specialized it as a separate hook for developer convenience and readability. Internally, both store the memoized value in the hooks list of the fiber node and compare dependencies with Object.is on each render."
    },
    {
      "question": "Does useCallback prevent the function from being recreated?",
      "answer": "Yes and no. The function expression still runs on every render (because it is in the component body). But the OLD function reference is reused from the cache if dependencies have not changed. The new function object created during render is discarded. This is why the function body captures closure values at render time."
    },
    {
      "question": "What is the only scenario where useCallback provides a rendering performance benefit?",
      "answer": "When the callback is passed as a prop to a child component wrapped in React.memo. Without React.memo, the child re-renders regardless of prop identity. With React.memo and stable callback references, the child's render can be skipped entirely."
    },
    {
      "question": "What happens if you use useCallback without a dependency array?",
      "answer": "useCallback(fn) with no array runs the callback creation every render and returns a new function each time - it provides zero memoization. With an empty array useCallback(fn, []), the function reference is stable forever but captures the initial closure values, which is usually incorrect for callbacks that use state or props."
    },
    {
      "question": "How does useCallback interact with useEffect?",
      "answer": "If a callback is listed as a dependency of useEffect, wrapping it in useCallback prevents the effect from re-running on every render. Without useCallback, the effect sees a new callback reference on every render and re-runs unnecessarily."
    },
    {
      "question": "Can useCallback cause stale closures?",
      "answer": "Yes. If you omit a state variable from the dependency array, the callback captures the value at the time it was last memoized (not the current value). This leads to bugs where the callback uses outdated state. The exhaustive-deps lint rule catches this."
    },
    {
      "question": "What is the performance cost of adding useCallback unnecessarily?",
      "answer": "(1) The dependecy array comparison runs on every render (Object.is on each element). (2) Extra memory allocation for the memoization cache. (3) React must store and manage additional hook state in the fiber. For most handlers, the cost of creating a new function is negligible compared to these overheads."
    },
    {
      "question": "In concurrent mode, does useCallback behave differently?",
      "answer": "No. useCallback behaves identically in concurrent mode. However, because renders can be interrupted, the memoized function reference from an interrupted render is discarded in favor of the previous committed render's reference. This ensures consistency."
    },
    {
      "question": "What is the recommended alternative to useCallback for custom hooks?",
      "answer": "Custom hooks should always wrap returned functions in useCallback so consumers can use React.memo effectively. Libraries like ahooks provide useMemoizedFn which always returns a stable reference while always calling the latest function body, combining the best of both approaches."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useCallback Mechanism</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Component Render</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">New inline function created</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">useCallback Check</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Object.is on deps array</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"75\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Unchanged?</text><text x=\"75\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Return cached fn ref</text><rect x=\"140\" y=\"195\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"185\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Changed?</text><text x=\"185\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Return NEW fn ref</text><text x=\"60\" y=\"260\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"start\">Child memo sees stable ref => skip render</text><text x=\"185\" y=\"260\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"start\">Child memo sees new ref => re-render</text></svg>",
  "codeExamples": [
    {
      "title": "Preventing Unnecessary Child Renders with useCallback",
      "useCase": "Without useCallback, the child re-renders on every keystroke in the parent form",
      "code": "const SubmitButton = React.memo(({ onPress, label }) => {\n  console.log(\"SubmitButton render\");\n  return <button onClick={onPress}>{label}</button>;\n});\n\nfunction RegistrationForm() {\n  const [name, setName] = useState(\"\");\n  const [email, setEmail] = useState(\"\");\n\n  const handleSubmit = useCallback(() => {\n    console.log(\"Submit with:\", { name, email });\n    api.register({ name, email });\n  }, [name, email]);\n\n  return (\n    <div>\n      <input value={name} onChange={e => setName(e.target.value)} />\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      <SubmitButton onPress={handleSubmit} label=\"Register\" />\n    </div>\n  );\n}",
      "description": "Without useCallback, every keystroke creates a new handleSubmit function, causing SubmitButton to re-render despite React.memo. With useCallback, the reference changes only when name or email change."
    },
    {
      "title": "Stable Callback in a Custom Hook with useCallback",
      "useCase": "Custom hooks should return memoized functions for consumer optimization",
      "code": "function useDebouncedValue(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  const clear = useCallback(() => {\n    setDebounced(value);\n  }, [value]);\n\n  return [debounced, useCallback(() => setDebounced(\"\"), [])];\n}\n\nfunction SearchPage() {\n  const [query, setQuery] = useState(\"\");\n  const [debounced, clearSearch] = useDebouncedValue(query, 300);\n\n  useEffect(() => {\n    if (debounced) fetch(\"/search?q=\" + debounced);\n  }, [debounced]);\n\n  return (\n    <div>\n      <input value={query} onChange={e => setQuery(e.target.value)} />\n      <ClearButton onClear={clearSearch} />\n    </div>\n  );\n}",
      "description": "The useDebouncedValue hook wraps returned functions in useCallback so that the consuming component can pass them to memoized children without causing extra renders."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is useCallback(fn, deps) equivalent to?",
      "options": [
        "useEffect(() => fn, deps)",
        "useMemo(() => fn, deps)",
        "useRef(fn)",
        "useState(() => fn)"
      ],
      "answer": 1,
      "explanation": "useCallback is syntax sugar over useMemo(() => fn, deps). Both return a memoized reference."
    },
    {
      "question": "Which condition is necessary for useCallback to improve render performance?",
      "options": [
        "The function must do expensive work",
        "The child component must be wrapped in React.memo",
        "The function must have no dependencies",
        "The function must be async"
      ],
      "answer": 1,
      "explanation": "useCallback only helps when the child receiving the callback is wrapped in React.memo, allowing the child to detect that the callback reference is stable and skip re-rendering."
    },
    {
      "question": "What happens if a dependency is missing from the useCallback array?",
      "options": [
        "The callback always uses the latest value anyway",
        "The callback captures a stale value from when it was last memoized",
        "React throws a warning but auto-fixes it",
        "The dependency is inferred automatically"
      ],
      "answer": 1,
      "explanation": "Missing dependencies cause stale closures where the callback references outdated state. The exhaustive-deps lint rule catches this."
    },
    {
      "question": "What is the overhead of adding useCallback unnecessarily?",
      "options": [
        "No overhead - it is always free",
        "Dependency comparison on every render + memory for cache + hook state management",
        "It slows down the first render only",
        "It only affects production builds"
      ],
      "answer": 1,
      "explanation": "Every useCallback call adds Object.is comparison of each dependency on every render, plus memory overhead for the cache. The cost is small but nonzero."
    },
    {
      "question": "Does useCallback prevent the function body from being evaluated on every render?",
      "options": [
        "No, the function expression still evaluates every render to produce the new function object. useCallback just discards it if deps unchanged",
        "Yes, the function body is skipped entirely when deps are unchanged",
        "It depends on the JavaScript engine",
        "Only in strict mode"
      ],
      "answer": 1,
      "explanation": "The function expression (e.g., () => handleClick()) runs every render as part of normal JS execution. useCallback only decides whether to return the old or new function reference."
    },
    {
      "question": "When is the most effective use case for useCallback?",
      "options": [
        "When the callback is passed to a native DOM element",
        "When the callback is passed to a memoized child and the callback depends on props/state",
        "When the callback is used in setTimeout",
        "When the callback is async"
      ],
      "answer": 1,
      "explanation": "The ideal scenario: a React.memo child receives a callback that depends on changing state, and without useCallback would cause the child to re-render on every parent render."
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

TOPICS_DATA["react"]["react-uselayouteffect"] = {
  "id": "react-uselayouteffect",
  "title": "React useLayoutEffect",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, unlike useEffect which runs after paint.",
    "Use useLayoutEffect when you need to read layout from the DOM and synchronously re-render before the user sees a visual flash.",
    "It blocks the browser from painting until the callback completes, so avoid expensive computations inside it.",
    "On the server, useLayoutEffect produces a warning because there is no browser DOM - use useEffect or an isomorphic pattern instead."
  ],
  "laymanDefinition": "useLayoutEffect is like a last-minute decorator who works between the time furniture is placed (DOM mutations) and when guests enter (browser paint). They can measure the room dimensions and quickly adjust decorations before anyone sees the room. useEffect, by contrast, works after guests have left - any adjustments they make will be visible as a flicker. Use useLayoutEffect when you need measurements or positions to be correct from the very first frame the user sees. Common examples: positioning a tooltip next to a button, measuring element dimensions for a layout calculation, or syncing scroll positions.",
  "deepDive": [
    {
      "heading": "When to Use useLayoutEffect vs useEffect",
      "text": "useLayoutEffect fires synchronously after all DOM mutations are committed but before the browser has a chance to paint. useEffect fires asynchronously after the paint cycle completes. The rule of thumb: use useEffect by default for all side effects (data fetching, subscriptions, logging, analytics). Only reach for useLayoutEffect when you see a visual problem - typically a flash, flicker, or layout jump. Specific scenarios that demand useLayoutEffect: reading element dimensions (getBoundingClientRect, offsetHeight), measuring scroll positions, positioning absolutely-positioned elements like tooltips or dropdowns relative to a trigger, and synchronously applying scroll restoration. Every useLayoutEffect callback blocks the paint, so if it does heavy computation, the user sees a blank frame. Always measure whether useEffect actually causes a visual problem before upgrading to useLayoutEffect."
    },
    {
      "heading": "The Flash Problem Explained",
      "text": "Consider a tooltip component that measures a target button and positions itself above it. With useEffect: component renders -> browser paints (user sees tooltip at default 0,0 position -> bad) -> useEffect runs -> setState with new position -> component re-renders -> browser paints again (user sees tooltip at correct position). The intermediate paint at 0,0 is the flash. With useLayoutEffect: component renders -> DOM is committed -> useLayoutEffect runs synchronously (before paint) -> setState updates position -> component re-renders -> browser paints once (user sees tooltip at correct position from the start). No flash. The same principle applies to scroll listeners, resize observers, and any case where DOM measurements drive visual output."
    },
    {
      "heading": "Performance Implications and Best Practices",
      "text": "Because useLayoutEffect blocks the paint, it directly impacts perceived performance. If your callback takes 50ms, the user sees a blank screen for 50ms before anything appears. Best practices: (1) Keep useLayoutEffect callbacks extremely lightweight - do heavy computation elsewhere. (2) If you only need to read from the DOM but not write synchronously, use useEffect. (3) Consider using ResizeObserver or IntersectionObserver callbacks instead of useLayoutEffect for measurement. (4) If you need both async and sync behavior, split into two effects. (5) Profile with React DevTools to confirm useLayoutEffect is not a bottleneck. React 18s automatic batching can help reduce re-renders triggered by useLayoutEffect."
    },
    {
      "heading": "Server-Side Rendering and Isomorphic Patterns",
      "text": "useLayoutEffect does not run on the server because there is no browser DOM or paint cycle. React logs a warning in the console when it detects useLayoutEffect during SSR. To handle this: (1) Use useEffect instead of useLayoutEffect for effects that do not require synchronous DOM access. (2) Use an isomorphic wrapper that checks the environment: if (typeof window === \"undefined\") return useEffect(fn, deps); else return useLayoutEffect(fn, deps);. (3) Libraries like react-popper and react-virtualized use this pattern to safely handle SSR. (4) In Next.js, you can use dynamic imports with ssr: false for components that must use useLayoutEffect. (5) Alternatively, use the useIsomorphicLayoutEffect pattern from popular open-source libraries that implements this check."
    },
    {
      "heading": "useLayoutEffect in the React 18 Concurrent World",
      "text": "With React 18s concurrent mode, useLayoutEffect behaves the same way but with an important nuance: it guarantees that its callback runs before the browser paints the committed render, even if that render was interrupted and resumed. This makes useLayoutEffect the safest choice for imperative DOM mutations that must be visible synchronously. Note that useLayoutEffect cannot be used with Suspense data fetching in the same way as useEffect - the synchronous nature means it does not participate in the suspend/resume lifecycle. In practice, this rarely matters because layout effects are typically for DOM manipulation, not data side effects."
    }
  ],
  "interviewAnswer": "useLayoutEffect runs synchronously after DOM mutations but before the browser paints. Its primary purpose is to read layout information (element dimensions, scroll positions) and apply synchronous visual updates without causing a visible flicker or layout jump. By default, you should always prefer useEffect because useLayoutEffect blocks the paint and can degrade perceived performance if the callback is expensive. Common use cases include tooltip positioning, scroll restoration, and measuring DOM elements. useLayoutEffect does not run on the server and produces a console warning; use an isomorphic pattern with environment detection for SSR-compatible code. In React 18 concurrent mode, useLayoutEffect guarantees its callback executes before paint even after render interruptions.",
  "interviewQuestions": [
    {
      "question": "What is the fundamental difference between useLayoutEffect and useEffect?",
      "answer": "useLayoutEffect fires synchronously after DOM mutations are committed but before the browser paints. useEffect fires asynchronously after the browser completes its paint cycle. This means useLayoutEffect runs during the commit phase while useEffect runs during the passive effect phase, which occurs after painting."
    },
    {
      "question": "Can you describe a concrete scenario where useLayoutEffect is necessary and useEffect would cause a problem?",
      "answer": "A tooltip component that measures a trigger button and positions itself accordingly. With useEffect: the tooltip renders at default position (0,0), the browser paints (user sees flash), useEffect reads button dimensions, setState updates position, component re-renders, browser paints again at correct position. The intermediate paint at 0,0 is the flash. useLayoutEffect eliminates this by running before the first paint."
    },
    {
      "question": "What happens if you use useLayoutEffect in a server-side rendered application?",
      "answer": "React logs a warning because there is no browser DOM on the server. The effect does not execute at all during SSR. To handle this, implement the useIsomorphicLayoutEffect pattern: check typeof window and use useEffect on the server, useLayoutEffect in the browser."
    },
    {
      "question": "How does useLayoutEffect impact performance compared to useEffect?",
      "answer": "useLayoutEffect blocks the browser paint. If the callback is expensive (say 100ms of computation), the user sees a blank screen for that duration. useEffect does not block paint. Therefore, useLayoutEffect should only contain lightweight synchronous DOM operations."
    },
    {
      "question": "In the React rendering lifecycle, where exactly does useLayoutEffect fit?",
      "answer": "After React commits DOM mutations (render phase -> commit phase -> DOM updated) but before the browser performs its paint cycle. It runs after all synchronous DOM mutations are applied. useEffect comes after paint, during the passive effect phase."
    },
    {
      "question": "Can useLayoutEffect be used for data fetching?",
      "answer": "Technically yes, but it is strongly discouraged. Data fetching is asynchronous and should not block paint. Data fetching also does not require synchronous DOM access. useEffect is the correct place for data fetching."
    },
    {
      "question": "What is the relationship between useLayoutEffect and the browsers requestAnimationFrame?",
      "answer": "useLayoutEffect runs synchronously before paint. requestAnimationFrame runs right before the next paint cycle begins. useLayoutEffect runs earlier in the pipeline, which is why it can prevent the flash - it executes before the browser starts compositing the frame."
    },
    {
      "question": "How does React 18s automatic batching affect useLayoutEffect?",
      "answer": "If you call setState multiple times inside useLayoutEffect, React 18 batches them into a single synchronous re-render before paint. This means you can make multiple state updates inside useLayoutEffect and only cause one synchronous re-render + one paint, improving performance."
    },
    {
      "question": "What happens if you forgot to provide a dependency array to useLayoutEffect?",
      "answer": "Like useEffect, the effect runs after every render. Depending on what the effect does, this can cause infinite re-render loops (if it triggers state updates that cause re-renders). Always provide the correct dependencies."
    },
    {
      "question": "How do you test components that use useLayoutEffect?",
      "answer": "Use the act() utility from React Testing Library or @testing-library/react. This ensures all layout effects are flushed before assertions. You can also mock useLayoutEffect to behave like useEffect in tests if synchronous behavior is not needed."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 350\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"330\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useLayoutEffect vs useEffect Timeline</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. Render Phase</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React calls component, computes VDOM</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. Commit Phase</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">React applies DOM mutations</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"200\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. useLayoutEffect</text><text x=\"130\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Synchronous, before paint</text><line x1=\"130\" y1=\"245\" x2=\"130\" y2=\"270\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"270\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"287.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. Browser Paints</text><text x=\"130\" y=\"304.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">User sees the frame</text><line x1=\"130\" y1=\"315\" x2=\"130\" y2=\"330\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"330\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"347.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">5. useEffect</text><text x=\"130\" y=\"364.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Async, after paint</text><text x=\"250\" y=\"175\" fill=\"#f59e0b\" font-size=\"11\" text-anchor=\"start\">useLayoutEffect path:</text><text x=\"250\" y=\"192\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">no extra paint before corrections</text><text x=\"250\" y=\"295\" fill=\"#f87171\" font-size=\"11\" text-anchor=\"start\">useEffect path:</text><text x=\"250\" y=\"312\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">may cause intermediate paint flash</text></svg>",
  "codeExamples": [
    {
      "title": "Positioning a Dropdown with useLayoutEffect",
      "useCase": "Prevents menu from appearing in wrong position",
      "code": "function DropdownMenu({ triggerRef, items, isOpen }) {\n  const [position, setPosition] = useState({ top: 0, left: 0 });\n  const menuRef = useRef(null);\n\n  useLayoutEffect(() => {\n    if (!isOpen || !triggerRef.current || !menuRef.current) return;\n\n    const triggerRect = triggerRef.current.getBoundingClientRect();\n    const menuRect = menuRef.current.getBoundingClientRect();\n    const viewportWidth = window.innerWidth;\n    const viewportHeight = window.innerHeight;\n\n    let top = triggerRect.bottom + 4;\n    let left = triggerRect.left;\n\n    if (left + menuRect.width > viewportWidth) {\n      left = viewportWidth - menuRect.width - 8;\n    }\n\n    if (top + menuRect.height > viewportHeight) {\n      top = triggerRect.top - menuRect.height - 4;\n    }\n\n    setPosition({ top, left });\n  }, [isOpen, triggerRef]);\n\n  if (!isOpen) return null;\n\n  return ReactDOM.createPortal(\n    <ul ref={menuRef} style={{\n      position: \"fixed\", top: position.top, left: position.left,\n      background: \"#fff\", border: \"1px solid #ddd\",\n      borderRadius: \"4px\", boxShadow: \"0 4px 12px rgba(0,0,0,0.15)\",\n      zIndex: 1000, listStyle: \"none\", minWidth: \"160px\"\n    }}>\n      {items.map((item, i) => (\n        <li key={i} style={{ padding: \"8px 16px\", cursor: \"pointer\" }}>{item}</li>\n      ))}\n    </ul>,\n    document.body\n  );\n}",
      "description": "This dropdown measures the trigger button and the menu itself, positions the menu before the first paint, clamps to viewport boundaries, and renders via portal. With useEffect, the user might briefly see the menu at (0,0) before it jumps to the correct position."
    },
    {
      "title": "Scroll Restoration with useLayoutEffect",
      "useCase": "Maintain scroll position across navigation",
      "code": "function useScrollRestoration(key) {\n  const scrollPositions = useRef({});\n\n  useEffect(() => {\n    return () => {\n      scrollPositions.current[key] = window.scrollY;\n    };\n  }, [key]);\n\n  useLayoutEffect(() => {\n    const saved = scrollPositions.current[key];\n    if (saved !== undefined) {\n      window.scrollTo(0, saved);\n    }\n  }, [key]);\n\n  return { scrollPositions };\n}\n\nfunction ProductListPage() {\n  useScrollRestoration(\"product-list\");\n  const [products, setProducts] = useState([]);\n\n  useEffect(() => {\n    fetch(\"/api/products\").then(r => r.json()).then(setProducts);\n  }, []);\n\n  return (\n    <div>\n      {products.map(p => (\n        <Link key={p.id} to={\"/product/\" + p.id}>\n          <div className=\"product-card\"><h3>{p.name}</h3><p>${p.price}</p></div>\n        </Link>\n      ))}\n    </div>\n  );\n}",
      "description": "Without useLayoutEffect, scroll restoration would happen after paint, causing a visible jump from the top of the page to the saved position. useLayoutEffect restores the position before the user sees anything."
    }
  ],
  "mcqQuestions": [
    {
      "question": "When does useLayoutEffect fire in the React lifecycle?",
      "options": [
        "Before DOM mutations",
        "After DOM mutations, before browser paint",
        "After browser paint",
        "On every state change regardless of render"
      ],
      "answer": 1,
      "explanation": "useLayoutEffect runs synchronously after DOM mutations are committed but before the browser has a chance to paint."
    },
    {
      "question": "What visual artifact does useLayoutEffect prevent that useEffect can cause?",
      "options": [
        "Memory leaks",
        "Visual flicker or layout jump",
        "Infinite loops",
        "Network errors"
      ],
      "answer": 1,
      "explanation": "When you read DOM layout and update state in useEffect, a stale paint occurs before the correction. useLayoutEffect applies corrections before the first paint, eliminating the flicker."
    },
    {
      "question": "What is the recommended default between useEffect and useLayoutEffect?",
      "options": [
        "Always use useLayoutEffect",
        "Always use useEffect by default",
        "Use useLayoutEffect for data fetching",
        "They are interchangeable"
      ],
      "answer": 1,
      "explanation": "React documentation explicitly recommends defaulting to useEffect because useLayoutEffect blocks the paint and can hurt perceived performance."
    },
    {
      "question": "What happens when you use useLayoutEffect during server-side rendering?",
      "options": [
        "It works normally",
        "React logs a warning and skips it",
        "It throws an error",
        "It crashes the server"
      ],
      "answer": 1,
      "explanation": "useLayoutEffect does not run on the server because there is no browser DOM. React logs a warning in development mode."
    },
    {
      "question": "Which type of operation specifically requires useLayoutEffect?",
      "options": [
        "Data fetching from an API",
        "Synchronous DOM measurement (getBoundingClientRect)",
        "Setting up a timer interval",
        "Subscribing to a WebSocket"
      ],
      "answer": 1,
      "explanation": "Synchronous DOM measurement that drives visual positioning requires useLayoutEffect to prevent the flash between the initial incorrect position and the corrected position."
    },
    {
      "question": "How does useLayoutEffect impact perceived performance?",
      "options": [
        "It always improves performance",
        "It blocks the paint, so expensive callbacks delay the users first view",
        "It has no impact on performance",
        "It runs asynchronously so it never blocks"
      ],
      "answer": 1,
      "explanation": "useLayoutEffect is synchronous and blocks the browser paint. If the callback takes 50ms, the user sees nothing for 50ms."
    }
  ]
};

TOPICS_DATA["react"]["react-usememo"] = {
  "id": "react-usememo",
  "title": "React useMemo",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "useMemo caches the result of an expensive computation between re-renders, recomputing only when dependencies change.",
    "It is a performance optimization, not a semantic guarantee - React may discard cached values under memory pressure.",
    "Only use useMemo for computationally expensive operations (O(n^2) or worse), not for trivial calculations.",
    "Overusing useMemo for every value can actually harm performance due to the overhead of dependency comparison."
  ],
  "laymanDefinition": "useMemo is like a notepad where you jot down the answer to a hard math problem so you don't have to solve it again unless the numbers change. When your component re-renders, instead of recalculating expensive values (like filtering a thousand items or computing a complex number), React checks the notepad and reuses the previous result if nothing changed. The key insight is that useMemo does not make the first calculation faster - it only saves time on subsequent re-renders when dependencies are unchanged. Use it sparingly: only when you have measured or can prove a computation is expensive enough to warrant the caching overhead.",
  "deepDive": [
    {
      "heading": "How useMemo Works Internally",
      "text": "useMemo stores the result of the factory function in a memoization cache associated with the component fiber. On the initial render, it calls the factory function, stores the result, and returns it. On subsequent renders, it compares each dependency from the current render with the previous render using Object.is comparison. If all dependencies are equal, it returns the cached value without calling the factory function. If any dependency changed, it re-executes the factory, caches the new result, and returns it. React may evict cached values during the commit phase if component memory pressure is high - this is implementation-defined and should not be relied upon for correctness. Use useMemo only when the computation is genuinely expensive and you have confirmed it via profiling."
    },
    {
      "heading": "When to Actually Use useMemo",
      "text": "The React docs recommend using useMemo only in these scenarios: (1) Skipping expensive recalculations - when a computation takes more than 1ms or processes large datasets (arrays with thousands of items). (2) Preserving referential equality for child component optimization - when passing objects or arrays as props to a memo()-ized child component. Without useMemo, every render creates a new object reference, causing the child to re-render even if the values are identical. (3) Skipping re-renders of expensive children when combined with React.memo. (4) Avoiding cascading effects - when a computed value is passed as a dependency to useEffect, preventing unnecessary effect re-runs. Profile first, optimize second - do not add useMemo preemptively."
    },
    {
      "heading": "The Cost-Benefit Analysis of Memoization",
      "text": "Every useMemo call has a cost: (1) Memory cost - the cached value persists until dependencies change or the component unmounts. (2) CPU cost - dependency array comparison runs on every render using Object.is on each element. For arrays with many dependencies, this comparison itself can be significant. (3) Code complexity cost - the dependency array must be maintained correctly, and stale closures are a common bug. The benefit only outweighs these costs when: the computation is expensive (O(n^2) or worse with n > 100), or the computed value preserves referential stability for downstream memoized components. Rule of thumb: if the computation takes less than 0.5ms, useMemo adds more overhead than it saves."
    },
    {
      "heading": "useMemo with React.memo Integration",
      "text": "The most common and effective use of useMemo is in combination with React.memo. Consider: <ExpensiveChild data={filteredData} />. If filteredData is computed with useMemo, the reference stays stable across renders where the source data hasnt changed. React.memo on ExpensiveChild can then skip re-rendering entirely. Without useMemo, every parent render creates a new filteredData array (even with identical contents), causing ExpensiveChild to re-render on every parent render. This pattern is especially important for large lists (FlatList, virtualization), chart components, and any component that does significant work on render. Profile before and after to confirm the optimization is effective."
    },
    {
      "heading": "Common Pitfalls and Anti-Patterns",
      "text": "(1) Using useMemo for primitive values - memoizing const x = a + b is pure overhead. (2) Dependency array mismatches - lint rules with exhaustive-deps catch this, but developers often omit dependencies incorrectly. (3) Assuming useMemo guarantees the function wont re-run - React may discard cache under memory pressure. (4) Nesting useMemo too deeply in component trees - prefer extracting expensive computations to hooks or selectors. (5) Memoizing inline styles or class names - these are cheap to compute. (6) Using useMemo as a mental crutch for premature optimization - measure first with React DevTools Profiler."
    }
  ],
  "interviewAnswer": "useMemo is a React hook that memoizes the result of a computation between re-renders. It takes a factory function and a dependency array, re-executing the factory only when dependencies change. Use useMemo only for genuinely expensive computations (processing large arrays, complex math, data transformations) or to preserve referential equality for props passed to React.memo-wrapped children. The default should be to compute values without memoization and only add useMemo after profiling confirms it is beneficial. React may discard cached values under memory pressure, so useMemo should never be relied upon for correctness - only for performance. Common anti-patterns include memoizing trivial calculations, incorrect dependency arrays, and premature optimization without profiling.",
  "interviewQuestions": [
    {
      "question": "What problem does useMemo solve?",
      "answer": "It prevents expensive recalculations on every render by caching the result from the previous render and returning it when dependencies have not changed. This reduces the CPU cost of re-rendering components that perform heavy data processing."
    },
    {
      "question": "How does useMemo differ from useCallback?",
      "answer": "useMemo memoizes the result of calling a function (the return value). useCallback memoizes the function itself (the reference). useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). useCallback is preferred when passing callbacks to memoized children."
    },
    {
      "question": "Can useMemo guarantee that the computation wont re-run?",
      "answer": "No. React may discard cached values under memory pressure or during certain reconciliation scenarios. useMemo is strictly a performance optimization and should not be used to ensure a side effect runs only once - use useEffect for side effects."
    },
    {
      "question": "What is the most common legitimate use case for useMemo?",
      "answer": "Preserving referential equality of objects/arrays passed as props to React.memo-wrapped children. Without useMemo, the child re-renders on every parent render because each render creates a new array/object reference, even with identical values."
    },
    {
      "question": "How should you decide whether a computation is expensive enough for useMemo?",
      "answer": "Profile with React DevTools Profiler. If a component re-renders frequently and a specific computation takes more than 1ms or processes thousands of items, useMemo can help. As a heuristic, if the computation is O(n) or faster with small n, useMemo is unnecessary overhead."
    },
    {
      "question": "What happens if you omit a value from the dependency array?",
      "answer": "The useMemo hook will not re-execute when that value changes, returning a stale result. This is caught by the react-hooks/exhaustive-deps ESLint rule. The dependency array must include every reactive value (props, state, derived values) used inside the factory function."
    },
    {
      "question": "How does useMemo interact with concurrent mode in React 18?",
      "answer": "In concurrent mode, useMemo behaves identically. However, because renders can be interrupted and discarded, the memoization cache persists across render attempts for the same pending render. Once a render commits, the cache is updated with the final values."
    },
    {
      "question": "What is the performance cost of using useMemo unnecessarily?",
      "answer": "(1) Memory allocation for the cached value. (2) Object.is comparison of each dependency on every render. (3) Extra function call overhead. For a trivial calculation like const double = useMemo(() => x * 2, [x]), the overhead of useMemo exceeds the cost of the computation itself."
    },
    {
      "question": "Can useMemo be used for functions?",
      "answer": "Indirectly - useMemo can return a function, but useCallback is the idiomatic choice for memoizing functions. useCallback provides cleaner syntax: useCallback(fn, deps) vs useMemo(() => fn, deps)."
    },
    {
      "question": "How do you test a component that uses useMemo?",
      "answer": "Use React Testing Library with act(). useMemo behavior is transparent to tests - the component works identically with or without memoization, just potentially slower. Test correctness, not memoization. To test that memoization works, check that child components are not re-rendered (use jest.spyOn on the child render or check refs)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useMemo Flow Diagram</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"75\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Factory Function Called</text><text x=\"130\" y=\"92\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">expensiveComputation(data)</text><line x1=\"130\" y1=\"105\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Check Dependencies</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Object.is comparison</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"75\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Same?</text><text x=\"75\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Return cached value</text><rect x=\"140\" y=\"195\" width=\"90\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"185\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Changed?</text><text x=\"185\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Recompute & cache</text><text x=\"60\" y=\"260\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Same dependencies => skip work</text><text x=\"185\" y=\"260\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Changed deps => recompute</text><line x1=\"120\" y1=\"220\" x2=\"120\" y2=\"180\" stroke=\"34\" stroke-width=\"2\" marker-end=\"url(#a)\"/><line x1=\"120\" y1=\"220\" x2=\"140\" y2=\"220\" stroke=\"34\" stroke-width=\"2\" marker-end=\"url(#a)\"/></svg>",
  "codeExamples": [
    {
      "title": "Filtering a Large List with useMemo",
      "useCase": "Avoids re-filtering 10000 items on every render",
      "code": "function ProductList({ products, searchTerm, category }) {\n  const filteredProducts = useMemo(() => {\n    console.log(\"Filtering\", products.length, \"items...\");\n    return products.filter(p => {\n      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());\n      const matchesCategory = !category || p.category === category;\n      return matchesSearch && matchesCategory;\n    });\n  }, [products, searchTerm, category]);\n\n  return (\n    <ul>\n      {filteredProducts.map(p => (\n        <li key={p.id}>{p.name} - ${p.price}</li>\n      ))}\n    </ul>\n  );\n}",
      "description": "Without useMemo, every keystroke in the search box re-filters all 10000 items. useMemo skips filtering when only unrelated state changes (like a button toggle elsewhere in the component)."
    },
    {
      "title": "Preserving Referential Equality with React.memo",
      "useCase": "Prevents unnecessary re-renders of an expensive chart",
      "code": "const SalesChart = React.memo(function SalesChart({ data, options }) {\n  useEffect(() => { /* renders chart using D3/Chart.js */ });\n  return <div ref={chartRef} />;\n});\n\nfunction Dashboard({ rawSales }) {\n  const chartData = useMemo(() => ({\n    labels: rawSales.map(r => r.date),\n    values: rawSales.map(r => r.amount),\n    total: rawSales.reduce((s, r) => s + r.amount, 0)\n  }), [rawSales]);\n\n  const chartOptions = useMemo(() => ({\n    responsive: true, maintainAspectRatio: false,\n    scales: { y: { beginAtZero: true } }\n  }), []);\n\n  return <SalesChart data={chartData} options={chartOptions} />;\n}",
      "description": "Without useMemo, chartData and chartOptions get new references on every render, causing SalesChart to re-render and re-render the chart even though nothing changed. useMemo ensures stable references so React.memo can skip rendering."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does useMemo return?",
      "options": [
        "A memoized function",
        "A memoized value (result of computation)",
        "A memoized component",
        "A memoized effect"
      ],
      "answer": 1,
      "explanation": "useMemo returns the result of calling the factory function, cached until dependencies change."
    },
    {
      "question": "When should you use useMemo?",
      "options": [
        "For every computed value",
        "Only for expensive computations confirmed by profiling",
        "Never - it is deprecated",
        "Only for JSX elements"
      ],
      "answer": 1,
      "explanation": "React recommends profiling first and using useMemo only when a computation is genuinely expensive. Preemptive memoization adds overhead."
    },
    {
      "question": "What is useMemo(fn, []) equivalent to?",
      "options": [
        "useEffect(fn, [])",
        "useCallback(fn, [])",
        "useRef(fn())",
        "useState(fn())"
      ],
      "answer": 1,
      "explanation": "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). So useCallback is just a specialization of useMemo for functions."
    },
    {
      "question": "If a dependency array element is an object, when will useMemo recompute?",
      "options": [
        "When any property of the object changes",
        "When the object reference changes (Object.is)",
        "Never for objects",
        "Always on every render"
      ],
      "answer": 1,
      "explanation": "useMemo uses Object.is comparison, which for objects means reference equality. Mutating an object property does not trigger recomputation - only a new object reference does."
    },
    {
      "question": "Can useMemo be used to skip re-rendering a child component?",
      "options": [
        "Yes, directly",
        "No, useMemo alone does not skip child renders - it only memoizes values passed to children. Combine with React.memo on the child to skip renders",
        "Yes, automatically for all children",
        "Only with class components"
      ],
      "answer": 1,
      "explanation": "useMemo prevents re-computation of values, but the child still re-renders unless it is wrapped in React.memo and receives stable props."
    },
    {
      "question": "What does the exhaustive-deps ESLint rule catch with useMemo?",
      "options": [
        "Missing dependencies that cause stale closures",
        "Undefined variables in the component",
        "Missing semicolons",
        "Unused import statements"
      ],
      "answer": 1,
      "explanation": "The react-hooks/exhaustive-deps rule ensures the dependency array includes every reactive value used inside the factory function. Missing dependencies lead to stale computed values."
    }
  ]
};

TOPICS_DATA["react"]["react-usereducer"] = {
  "id": "react-usereducer",
  "title": "React useReducer",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "useReducer manages complex state logic with actions and a reducer function, similar to Redux but built into React.",
    "It is preferred over useState when state transitions depend on previous state in complex ways or when multiple state values need to update together.",
    "The reducer is a pure function (state, action) => newState that must not have side effects.",
    "useReducer enables predictable state management and makes testing state logic easier by extracting the reducer into a standalone pure function."
  ],
  "laymanDefinition": "useReducer is like having a centralized rulebook (reducer) for how state can change. Instead of directly setting state with setState, you dispatch actions that describe what happened (like \"INCREMENT\" or \"ADD_TODO\") and let the reducer decide how the state should change based on those rules. This makes state updates predictable and debuggable because all the logic lives in one function. It is most useful when state is an object with multiple fields that change together, or when the next state depends on the previous state in complex ways. Think of it as a mini Redux without the extra library.",
  "deepDive": [
    {
      "heading": "The Reducer Pattern: State, Action, Dispatch",
      "text": "useReducer follows the same pattern as Redux. The three core concepts: (1) State - a single value (often an object) representing the current state. (2) Action - an object describing what happened, typically with a type property and optional payload: { type: \"ADD_TODO\", payload: { text: \"Learn React\" } }. (3) Dispatch - a function that sends actions to the reducer: dispatch({ type: \"INCREMENT\" }). The reducer receives the current state and an action and returns the new state. The reducer must be a pure function - no side effects, no API calls, no random values. This purity makes the state transitions predictable and testable."
    },
    {
      "heading": "useReducer vs useState: When to Choose Which",
      "text": "useState is simpler and sufficient for: independent primitive values, simple toggle or counter state, and state with only one or two fields. useReducer is better for: (1) Complex state objects with multiple fields that depend on each other (e.g., a form with name, email, errors, isSubmitting). (2) State transitions that require the previous state to compute the next state. (3) State logic scattered across multiple event handlers - centralizing it in the reducer makes it manageable. (4) State that needs to be tested independently of the component. (5) State where some actions require fetching or async work (combined with useEffect). Rule of thumb: if you find yourself calling setState three or more times in a single event handler, consider useReducer."
    },
    {
      "heading": "Reducer Best Practices and Patterns",
      "text": "(1) Use action types as constants (or string literals in a switch). (2) Always return a new state object - do not mutate the previous state. (3) Use TypeScript for action types with discriminated unions for type safety. (4) Extract the reducer function outside the component for testability. (5) Use action creators (functions that return action objects) to encapsulate action shape. (6) For async workflows, dispatch actions inside useEffect: dispatch({ type: \"FETCH_START\" }) before the fetch, then dispatch({ type: \"FETCH_SUCCESS\", payload: data }) or FETCH_ERROR. (7) Use immer's produce for complex nested state updates to avoid deep cloning. (8) Keep reducers pure - no Math.random(), Date.now(), or API calls inside the reducer."
    },
    {
      "heading": "useReducer with Context for Global State",
      "text": "useReducer combined with React Context provides a lightweight state management solution without external libraries. Pattern: (1) Create a context: const CounterContext = createContext(). (2) Create a provider component that uses useReducer and passes [state, dispatch] via context. (3) Wrap the app with the provider. (4) Consumer components call useContext(CounterContext) to read state and dispatch actions. This pattern avoids prop drilling for state that many components need. Unlike Redux, it does not have middleware or devtools built in, but for medium-sized apps it is often sufficient. The context value should be memoized if performance is a concern (split into separate contexts for state and dispatch)."
    },
    {
      "heading": "Testing Reducers and useReducer Components",
      "text": "Reducer functions are pure functions, making them trivially testable: call the reducer with known state and action, assert the returned state. This is the biggest advantage over useState - the state logic can be tested without rendering components. For testing the component that uses useReducer: (1) Use React Testing Library with act() to wrap dispatches. (2) Test that dispatching an action produces the expected UI change. (3) For async reducers (dispatching in useEffect), use waitFor or findBy queries. (4) The reducer itself can be tested with plain Jest: expect(reducer(initialState, { type: \"INCREMENT\" })).toEqual({ count: 1 })."
    }
  ],
  "interviewAnswer": "useReducer is a React hook for managing complex state transitions with a reducer function and dispatched actions. It is preferable to useState when state logic is complex (multiple fields, interdependent updates), when the next state depends heavily on the previous state, or when state logic should be testable as a pure function. The reducer is always a pure function that takes (state, action) and returns newState. useReducer can be combined with React Context for lightweight global state management without Redux. The tradeoff is more boilerplate than useState, but much better predictability and testability for complex state scenarios.",
  "interviewQuestions": [
    {
      "question": "What is the difference between useState and useReducer?",
      "answer": "useState is simpler - directly sets a new value. useReducer uses a reducer function and actions to update state. useReducer is better for complex state (multiple fields, interdependent updates) while useState is better for simple independent state values."
    },
    {
      "question": "Why must a reducer be a pure function?",
      "answer": "Purity ensures predictable state transitions. If the reducer had side effects (API calls, random values, mutations), the same action on the same state could produce different results, breaking the predictability that makes useReducer valuable. Pure reducers are also testable and support time-travel debugging."
    },
    {
      "question": "What is the typical shape of an action object?",
      "answer": "An action is usually an object with a type property (string or symbol describing the action) and an optional payload property with data: { type: \"ADD_TODO\", payload: { id: 1, text: \"Learn React\" } }. Some conventions use { type, payload } from Redux, while others use { type, ...rest }."
    },
    {
      "question": "How do you handle async operations with useReducer?",
      "answer": "Async logic should not be inside the reducer. Instead, perform async work in useEffect or event handlers, then dispatch different actions based on the result: dispatch({ type: \"FETCH_START\" }), then on success dispatch({ type: \"FETCH_SUCCESS\", payload: data }), or on error dispatch({ type: \"FETCH_ERROR\", payload: error })."
    },
    {
      "question": "Can useReducer replace Redux?",
      "answer": "For medium-sized apps, useReducer with Context can replace Redux. However, Redux provides middleware (thunk, saga), DevTools, action normalization, and performance optimizations that useReducer + Context does not have. For large enterprise apps, Redux is still the standard."
    },
    {
      "question": "How do you test a reducer?",
      "answer": "Since reducers are pure functions, you call them directly with known inputs and assert outputs: expect(reducer(initialState, { type: \"INCREMENT\" })).toEqual({ count: 1 }). No component rendering needed."
    },
    {
      "question": "What is the initializer function in useReducer?",
      "answer": "useReducer accepts an optional third argument - an initializer function: useReducer(reducer, initialArg, init). The init function receives initialArg and returns the initial state. This is useful for computing initial state from props or localStorage."
    },
    {
      "question": "What happens if the reducer mutates state directly?",
      "answer": "React compares state using Object.is. If you mutate the previous state object (e.g., state.count++) instead of returning a new object, React will not detect the change and the component will not re-render. Always return a new object from the reducer."
    },
    {
      "question": "How does useReducer work with React 18 concurrent mode?",
      "answer": "useReducer works consistently in concurrent mode. dispatch from useReducer does NOT trigger an immediate re-render in concurrent mode - it schedules an update. This means reading state synchronously after dispatch might return the old state. For synchronous reads, use useRef to track the latest state."
    },
    {
      "question": "What is the performance benefit of useReducer over multiple useState calls?",
      "answer": "useReducer avoids multiple re-renders caused by sequential setState calls. A single dispatch can update multiple state fields simultaneously, resulting in one render instead of multiple renders. React 18s automatic batching already mitigates this for useState, but useReducer still provides cleaner code organization for complex updates."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useReducer Architecture</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Component</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Triggers action via dispatch()</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">dispatch({ type, payload })</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Sends action to reducer</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"200\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"215\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Reducer Function</text><text x=\"130\" y=\"232\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">(state, action) => newState</text><line x1=\"130\" y1=\"245\" x2=\"130\" y2=\"260\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"260\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"130\" y=\"277.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">New State</text><text x=\"130\" y=\"294.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Component re-renders</text><text x=\"250\" y=\"78\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">User clicks, API responds, etc.</text><text x=\"250\" y=\"148\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Action describes what happened</text><text x=\"250\" y=\"222\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">Pure function: no side effects</text><text x=\"250\" y=\"282\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"start\">React detects change via Object.is</text></svg>",
  "codeExamples": [
    {
      "title": "Shopping Cart with useReducer",
      "useCase": "Multiple state fields updated atomically on each action",
      "code": "function cartReducer(state, action) {\n  switch (action.type) {\n    case \"ADD_ITEM\":\n      const existing = state.items.find(i => i.id === action.payload.id);\n      if (existing) {\n        return {\n          ...state,\n          items: state.items.map(i =>\n            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i\n          )\n        };\n      }\n      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };\n    case \"REMOVE_ITEM\":\n      return { ...state, items: state.items.filter(i => i.id !== action.payload) };\n    case \"APPLY_DISCOUNT\":\n      return { ...state, discount: action.payload };\n    default:\n      return state;\n  }\n}\n\nfunction Checkout() {\n  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 });\n  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0) - state.discount;\n\n  return (\n    <div>\n      {state.items.map(item => (\n        <div key={item.id}>\n          <span>{item.name} x{item.qty} - ${item.price * item.qty}</span>\n          <button onClick={() => dispatch({ type: \"REMOVE_ITEM\", payload: item.id })}>x</button>\n        </div>\n      ))}\n      <p>Total: ${Math.max(0, total)}</p>\n      <button onClick={() => dispatch({ type: \"APPLY_DISCOUNT\", payload: 10 })}>Apply $10 off</button>\n    </div>\n  );\n}",
      "description": "useReducer centralizes cart logic (add, remove, discount) into a single reducer, making state transitions predictable and testable. Multiple state fields (items array, total) update together in one dispatch."
    },
    {
      "title": "Async Data Fetching with useReducer",
      "useCase": "Handle loading, success, and error states in one reducer",
      "code": "function fetchReducer(state, action) {\n  switch (action.type) {\n    case \"FETCH_START\":  return { ...state, loading: true, error: null };\n    case \"FETCH_SUCCESS\": return { ...state, loading: false, data: action.payload };\n    case \"FETCH_ERROR\":  return { ...state, loading: false, error: action.payload };\n    case \"RESET\":        return { data: null, loading: false, error: null };\n    default: return state;\n  }\n}\n\nfunction UserProfile({ userId }) {\n  const [state, dispatch] = useReducer(fetchReducer, {\n    data: null, loading: false, error: null\n  });\n\n  useEffect(() => {\n    dispatch({ type: \"FETCH_START\" });\n    fetch(\"/api/users/\" + userId)\n      .then(r => { if (!r.ok) throw new Error(\"Not found\"); return r.json(); })\n      .then(data => dispatch({ type: \"FETCH_SUCCESS\", payload: data }))\n      .catch(err => dispatch({ type: \"FETCH_ERROR\", payload: err.message }));\n  }, [userId]);\n\n  if (state.loading) return <Spinner />;\n  if (state.error) return <Error message={state.error} />;\n  if (!state.data) return null;\n  return <ProfileCard user={state.data} />;\n}",
      "description": "The reducer cleanly handles three states (loading, success, error) without complex useState logic. Each state transition is explicit and predictable."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a reducer function?",
      "options": [
        "A function that creates React components",
        "A pure function (state, action) => newState",
        "A function that handles HTTP requests",
        "A function that renders JSX"
      ],
      "answer": 1,
      "explanation": "A reducer is a pure function that takes the current state and an action and returns the new state. It must not have side effects."
    },
    {
      "question": "Which is a valid action object for useReducer?",
      "options": [
        "{ type: \"INCREMENT\" }",
        "{ action: \"INCREMENT\" }",
        "{ event: \"click\" }",
        "{ reducer: \"count\" }"
      ],
      "answer": 0,
      "explanation": "Actions conventionally have a type property describing the action. The payload property is optional."
    },
    {
      "question": "When should you prefer useReducer over useState?",
      "options": [
        "Always - useReducer is always better",
        "When state logic is complex with interdependent fields",
        "When there is only one state value",
        "Never - useState is always better"
      ],
      "answer": 1,
      "explanation": "useReducer excels when state is an object with multiple fields that update together, or when state transitions depend heavily on previous state."
    },
    {
      "question": "Can a reducer have side effects like API calls?",
      "options": [
        "Yes, reducers commonly call APIs",
        "No, reducers must be pure functions without side effects",
        "Only if wrapped in useEffect",
        "Yes, but only with async/await"
      ],
      "answer": 1,
      "explanation": "Reducers must be pure. Side effects like API calls belong in useEffect or event handlers, which then dispatch actions to the reducer with the results."
    },
    {
      "question": "What happens if you mutate state directly in a reducer?",
      "options": [
        "React automatically detects the mutation",
        "React cannot detect the change (Object.is comparison fails) and the component does not re-render",
        "React throws an error",
        "The mutation is automatically deep-cloned"
      ],
      "answer": 1,
      "explanation": "React uses Object.is to compare state. Direct mutation keeps the same reference, so React skips the re-render. Always return a new object from the reducer."
    },
    {
      "question": "How do you test a reducer?",
      "options": [
        "Using React Testing Library to render the component",
        "By calling the reducer directly as a pure function and asserting the returned state",
        "By using Enzyme to simulate dispatches",
        "Reducers cannot be tested"
      ],
      "answer": 1,
      "explanation": "Reducers are trivially testable because they are pure functions. Call reducer(state, action) and assert on the returned state. No component rendering required."
    }
  ]
};

TOPICS_DATA["react"]["react-useref"] = {
  "id": "react-useref",
  "title": "React useRef",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "useRef creates a mutable reference that persists across re-renders without causing re-renders when its value changes.",
    "Commonly used for DOM element references (ref={ref}) and for storing mutable values that should not trigger re-renders.",
    "The ref object has a .current property that can be read and written freely without causing component updates.",
    "useRef is the same as creating { current: initialValue } manually, except React guarantees the same object reference across renders."
  ],
  "laymanDefinition": "useRef is like a secret pocket notebook that React does not watch. When you write something in it, React does not re-render the component (unlike state, where every change causes a re-render). This makes it perfect for remembering things between renders without triggering updates. The most common use is holding a reference to a DOM element: <div ref={myRef}> gives you access to the actual HTML element. You can also use it to store interval IDs, previous values, or any mutable data that should survive re-renders but should not cause re-renders when changed.",
  "deepDive": [
    {
      "heading": "useRef vs useState: The Fundamental Difference",
      "text": "useState creates state that triggers a re-render when updated. useRef creates a mutable container whose updates never trigger re-renders. When you change ref.current, the component does not re-render. This makes useRef ideal for: (1) Storing values that need to persist across renders but should not cause re-renders (e.g., interval IDs, timer handles, WebSocket connections). (2) Accessing DOM nodes imperatively. (3) Keeping track of previous values. (4) Storing expensive class instances (like D3 charts, Three.js scenes) that should be created once and reused across renders. The ref object itself is created once and the same reference is returned on every render - this is guaranteed by React."
    },
    {
      "heading": "Refs and the DOM: The most common use case",
      "text": "The most widespread use of useRef is to access DOM elements. When you pass a ref to an element's ref attribute (e.g., <input ref={inputRef} />), React assigns the DOM node to inputRef.current after the component mounts AND after every update. This enables imperative operations: focusing inputs, measuring element dimensions (getBoundingClientRect), managing media playback, integrating with non-React libraries (D3, Chart.js, jQuery), and controlling scroll positions. Refs are set before useLayoutEffect runs and before useEffect runs. Note: you cannot use refs to access DOM during the render phase (ref.current is null during render for the initial mount)."
    },
    {
      "heading": "Advanced Patterns: Callback Refs and Ref Forwarding",
      "text": "For dynamic scenarios (like a list of unknown length), callback refs provide more flexibility: <div ref={(node) => { if (node) measure(node); }} />. The callback receives the DOM node when it mounts and null when it unmounts. For passing refs through component boundaries (e.g., from a parent to an <input> inside a child), use React.forwardRef in the child component. This allows the parent to focus the child's input imperatively. Refs can also be shared via props (avoiding forwardRef if desired, though forwardRef is the idiomatic pattern). In React 18, useImperativeHandle combined with forwardRef allows the child to expose a custom API (like focus, scrollTo, reset) to the parent."
    },
    {
      "heading": "Storing Previous Values and Instance Variables",
      "text": "A powerful pattern is tracking previous values: useRef to store the previous state or props value, updated in useEffect. Similarly, useRef replaces instance variables from class components. In a class: this.intervalId = setInterval(...). In a function component: const intervalRef = useRef(); intervalRef.current = setInterval(...);. The ref persists across renders without causing re-renders when updated. This is especially useful for: (1) Debouncing/throttling - store the timer ID to cancel it on cleanup. (2) Tracking render count - increment ref.current on every render. (3) Storing component lifecycle flags - isMounted ref to avoid setting state on unmounted components."
    },
    {
      "heading": "Refs in Concurrent Mode and StrictMode",
      "text": "In React 18 concurrent mode, ref behavior is consistent but with important nuances: (1) During development with StrictMode, effects are double-invoked, which means refs may be set, cleared, and set again on mount. (2) In concurrent mode, renders can be interrupted and discarded. However, ref mutations are visible immediately and are not rolled back if a render is discarded - this is usually fine because refs are imperative escape hatches. (3) The useRef hook itself is safe in concurrent mode because it does not depend on the render lifecycle - the ref object is created once and the same reference persists. (4) Avoid using refs as a synchronization mechanism for concurrent features - use state or transitions instead."
    }
  ],
  "interviewAnswer": "useRef provides a mutable object with a .current property that persists across component re-renders without triggering re-renders when updated. It is primarily used for DOM element access (via the ref attribute), storing mutable values (timer IDs, interval handles), tracking previous state, and holding expensive instances that should be created once. The same ref object reference is returned on every render. Unlike state, updating ref.current does not cause a re-render, making it ideal for values that change frequently but do not require UI updates. Refs are set after DOM mutations during the commit phase, meaning they are accessible in useLayoutEffect and useEffect but not during initial render.",
  "interviewQuestions": [
    {
      "question": "What is the main difference between useRef and useState?",
      "answer": "useRef updates do NOT trigger re-renders. useState updates trigger a re-render. useRef is for values that persist across renders without causing UI updates. useState is for values that drive the UI and should cause re-renders when changed."
    },
    {
      "question": "When does ref.current get populated with a DOM node?",
      "answer": "After the component mounts, during the commit phase. Ref assignment happens after DOM mutations are applied but before useLayoutEffect runs. During the initial render (before commit), ref.current is still the initial value (usually null)."
    },
    {
      "question": "Can you use useRef to force a re-render?",
      "answer": "Yes, indirectly. You can store a counter in useRef and update it with useState to trigger re-renders. But this is an anti-pattern - if you need re-renders, use useState directly. A common pattern is using useRef with a forceUpdate function to re-render when the ref changes."
    },
    {
      "question": "What is the difference between useRef and creating { current: value } manually?",
      "answer": "React guarantees that useRef returns the SAME object reference on every render. Creating { current: value } in the component body creates a new object every render. useRef also integrates with the React fiber lifecycle for cleanup during unmount."
    },
    {
      "question": "How do callback refs differ from useRef?",
      "answer": "Callback refs are functions called by React when a DOM node mounts/unmounts. They provide more control: you receive the node as a parameter and can clean up when null is passed. useRef returns a ref object with a .current property that gets automatically populated."
    },
    {
      "question": "What is forwardRef and when do you need it?",
      "answer": "forwardRef is a React API that lets a parent component pass a ref down to a DOM element inside a child component. It is needed because ref is not a prop - it is handled specially by React. forwardRef allows the child to accept a ref parameter and attach it to an internal DOM element."
    },
    {
      "question": "Can useRef store a function?",
      "answer": "Yes, useRef can store any value including functions. This is useful for creating stable function references that always call the latest callback without re-rendering. Libraries like useMemoizedFn use this pattern internally."
    },
    {
      "question": "What is the useImperativeHandle hook used for?",
      "answer": "useImperativeHandle customizes the instance value exposed by a forwardRef. Instead of exposing the raw DOM node, you can expose a limited API: { focus: () => inputRef.current.focus(), reset: () => inputRef.current.value = \"\" }. This encapsulates the implementation details."
    },
    {
      "question": "Does changing ref.current in useEffect cause an infinite loop?",
      "answer": "No, because updating ref.current does not trigger a re-render. Unlike setState in useEffect (which would cause a re-render and re-run the effect), ref updates are silent."
    },
    {
      "question": "How do you test components that use useRef for DOM access?",
      "answer": "Use React Testing Library. The ref is automatically populated when the component renders. You can assert on the DOM node: expect(inputRef.current).toBe(inputElement). For testing focus/blur, use element.focus() and check document.activeElement."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 720 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:720px;\"><defs><marker id=\"a\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"700\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"360\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">useRef Object Lifecycle</text><rect x=\"30\" y=\"55\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#6c9fff\" stroke-width=\"1.5\"/><text x=\"130\" y=\"72.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1st Render</text><text x=\"130\" y=\"89.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">useRef creates { current: init }</text><line x1=\"130\" y1=\"100\" x2=\"130\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"125\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"130\" y=\"142.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Commit Phase</text><text x=\"130\" y=\"159.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">DOM node set to ref.current</text><line x1=\"130\" y1=\"170\" x2=\"130\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#a)\"/><rect x=\"30\" y=\"195\" width=\"200\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/><text x=\"130\" y=\"212.5\" fill=\"#e8eaed\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2nd+ Render</text><text x=\"130\" y=\"229.5\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Same ref object returned</text><text x=\"260\" y=\"78\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"start\">ref.current = timerId, prevValue, DOM node</text><text x=\"260\" y=\"150\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"start\">ref.current is now accessible</text><text x=\"260\" y=\"218\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"start\">No re-render triggered on ref.current change</text></svg>",
  "codeExamples": [
    {
      "title": "DOM Focus and Measurement with useRef",
      "useCase": "Focus input on mount and measure element dimensions",
      "code": "function AutoFocusInput() {\n  const inputRef = useRef(null);\n\n  useLayoutEffect(() => {\n    inputRef.current.focus();\n    console.log(\"Input width:\", inputRef.current.offsetWidth);\n  }, []);\n\n  return <input ref={inputRef} placeholder=\"I am auto-focused\" />;\n}\n\nfunction MeasureExample() {\n  const [rect, setRect] = useState(null);\n  const divRef = useRef(null);\n\n  useEffect(() => {\n    const observer = new ResizeObserver(entries => {\n      const entry = entries[0];\n      setRect(entry.contentRect);\n    });\n    if (divRef.current) observer.observe(divRef.current);\n    return () => observer.disconnect();\n  }, []);\n\n  return (\n    <div ref={divRef}>\n      <p>Width: {rect?.width}px, Height: {rect?.height}px</p>\n    </div>\n  );\n}",
      "description": "useRef provides direct imperative access to DOM nodes for focus management, measurements, and integration with non-React APIs like ResizeObserver."
    },
    {
      "title": "Tracking Previous Value with useRef",
      "useCase": "Compare current value with previous value on each update",
      "code": "function usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => { ref.current = value; });\n  return ref.current;\n}\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const prevCount = usePrevious(count);\n\n  return (\n    <div>\n      <p>Now: {count}, Before: {prevCount}</p>\n      <p>Direction: {count > prevCount ? \"Up\" : count < prevCount ? \"Down\" : \"Same\"}</p>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <button onClick={() => setCount(c => c - 1)}>-</button>\n    </div>\n  );\n}\n\n// === Practical: Timer with cleanup ===\nfunction Timer() {\n  const intervalRef = useRef(null);\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    intervalRef.current = setInterval(() => {\n      setCount(c => c + 1);\n    }, 1000);\n    return () => clearInterval(intervalRef.current);\n  }, []);\n\n  const stopTimer = () => {\n    clearInterval(intervalRef.current);\n  };\n\n  return <div><p>Count: {count}</p><button onClick={stopTimer}>Stop</button></div>;\n}",
      "description": "useRef is ideal for storing mutable values that should not trigger re-renders. The usePrevious pattern compares state across renders. The timer pattern stores the interval ID for imperative cancellation."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which of the following is true about useRef?",
      "options": [
        "Updating ref.current triggers a re-render",
        "The ref object is created on every render",
        "Updating ref.current does NOT trigger a re-render",
        "useRef can only store DOM nodes"
      ],
      "answer": 1,
      "explanation": "useRef updates are silent - they never cause a re-render. This is the fundamental difference from useState."
    },
    {
      "question": "When can you safely read ref.current to get a DOM node?",
      "options": [
        "During the render phase",
        "After the component mounts (in useEffect/useLayoutEffect)",
        "In the function body before return",
        "At any time including during initial render"
      ],
      "answer": 1,
      "explanation": "During initial render, ref.current is null because the DOM node does not exist yet. It gets populated during the commit phase, so it is accessible in effects but not during the render function."
    },
    {
      "question": "What does forwardRef do?",
      "options": [
        "Creates a ref in the parent component",
        "Allows a parent to pass a ref through a child to its DOM element",
        "Blocks refs from being passed to children",
        "Automatically generates refs for all DOM elements"
      ],
      "answer": 1,
      "explanation": "forwardRef is a higher-order component that lets a child receive a ref from its parent and attach it to a child DOM element, enabling imperative access from the parent."
    },
    {
      "question": "What is the purpose of useImperativeHandle?",
      "options": [
        "To prevent refs from being used",
        "To customize the value exposed by a forwarded ref",
        "To create a ref that only works in production",
        "To automatically focus an input"
      ],
      "answer": 1,
      "explanation": "useImperativeHandle works with forwardRef to define what the parent receives - typically a limited API object like { focus, reset } instead of the raw DOM node."
    },
    {
      "question": "What happens if you pass a ref to a functional component without forwardRef?",
      "options": [
        "React ignores the ref and logs a warning",
        "The ref works normally",
        "React throws an error",
        "The ref attaches to the parent component"
      ],
      "answer": 1,
      "explanation": "Functional components do not accept refs by default. Without forwardRef, the ref prop is ignored and React logs a warning that function components cannot be given refs."
    },
    {
      "question": "Can useRef be used to store the return value of setInterval?",
      "options": [
        "Yes - useRef can store any mutable value",
        "No - useRef only stores DOM nodes",
        "Yes but it triggers a re-render",
        "No - useRef cannot store numbers"
      ],
      "answer": 1,
      "explanation": "useRef can store any value including interval IDs, timer handles, WebSocket connections, or any other mutable data. Updating ref.current does not cause re-renders, making it ideal for timer handles."
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
        "O(nÂ³)",
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

TOPICS_DATA["react"]["react-zustand"] = {
  "id": "react-zustand",
  "title": "Zustand State Management",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Zustand is a lightweight, minimal state management library for React with a simple hook-based API.",
    "No boilerplate: no providers, no reducers, no actions — just a store created via create().",
    "Stores return a hook that gives direct access to state and setter functions.",
    "Built-in support for middleware (persist, devtools, immer) and selectors for performance."
  ],
  "laymanDefinition": "Zustand is like a shared whiteboard in an office. Anyone (component) can walk up and write or erase something directly without filling out forms (actions) or going through a receptionist (reducer). The whiteboard is always visible to everyone, and changes appear instantly. Unlike Redux which is like a bank vault requiring official forms, Zustand is like a shared notebook — fast, simple, and direct.",
  "deepDive": [
    {
      "heading": "Creating a Store",
      "text": "Zustand stores are created with create(callback) where the callback receives set and get. The set function merges state (like React setState). The store returns a custom hook. Example: const useStore = create((set, get) => ({ count: 0, increment: () => set(state => ({ count: state.count + 1 })) })). No Provider wrapper needed — the hook is used directly in any component. Multiple stores are created by calling create() multiple times, each independent."
    },
    {
      "heading": "Using Store in Components",
      "text": "Components access store state by calling the store hook: const count = useStore(state => state.count). Selector functions enable fine-grained subscriptions — the component only re-renders when the selected slice changes. Without a selector, the entire store is subscribed. You can also destructure multiple values: const { count, increment } = useStore(). For equality, Zustand uses Object.is by default, or you can pass a custom equality function."
    },
    {
      "heading": "Async Actions and Middleware",
      "text": "Async actions are straightforward — just use async/await inside the store: fetchUsers: async () => { set({ loading: true }); const data = await api.getUsers(); set({ users: data, loading: false }); }. Middleware wraps the store: persist (localStorage/AsyncStorage), immer (mutable syntax), devtools (Redux DevTools), and subscribeWithSelector. Example: const useStore = create(persist(devtools(storeLogic), { name: \"app-state\" }))."
    },
    {
      "heading": "Zustand vs Context vs Redux",
      "text": "Context API re-renders ALL consumers when any value changes, requiring manual splitting. Redux has heavy boilerplate (actions, reducers, dispatch). Zustand provides selector-based subscriptions (no extra re-renders), zero boilerplate, and no provider nesting. For small-to-medium apps, Zustand is often the best choice. For large enterprise apps with complex async workflows and multiple teams, Redux Toolkit's structure and devtools may still be preferred. Zustand bundles to ~1KB minified vs Redux Toolkit's ~12KB."
    },
    {
      "heading": "Advanced Patterns",
      "text": "Slices pattern: split large stores into multiple slice files and combine them. Computed values: derive state outside the store using useMemo or selector functions. Actions outside React: call store.getState() or store.setState() directly. Subscriptions: useStore.subscribe(listener) for external integrations. Immer middleware enables mutable syntax: set(produce(state => { state.count++ }))."
    }
  ],
  "interviewAnswer": "Zustand is a lightweight state management library for React that provides a hook-based API with no boilerplate. Stores are created via create() and return a custom hook. Components subscribe to specific state slices via selectors, preventing unnecessary re-renders. Zustand supports middleware (persist, devtools, immer), async actions, and multiple independent stores. Unlike Context, Zustand provides selector-based subscriptions. Unlike Redux, it requires no action types, reducers, or Provider wrappers. Zustand is ideal for small-to-medium apps where simplicity matters.",
  "interviewQuestions": [
    {
      "question": "How is Zustand different from Redux?",
      "answer": "Zustand has no boilerplate: no action types, no reducers, no Provider wrapper. Stores are created with create() and used directly as hooks. State updates use direct setters instead of dispatch. Selectors provide fine-grained subscriptions. Bundle size is ~1KB vs Redux Toolkit's ~12KB."
    },
    {
      "question": "How do selectors work in Zustand?",
      "answer": "The store hook accepts a selector function: useStore(state => state.count). The component only re-renders when the selected value changes. This is similar to Redux's useSelector but built directly into the store. No selector = subscribe to entire store."
    },
    {
      "question": "How do you handle async operations in Zustand?",
      "answer": "Async functions are defined directly in the store using set(): fetchUsers: async () => { set({ loading: true }); const data = await api.get(); set({ users: data, loading: false }); }. No middleware needed for basic async."
    },
    {
      "question": "What middleware does Zustand support?",
      "answer": "persist (localStorage/AsyncStorage), immer (mutable syntax), devtools (Redux DevTools integration), subscribeWithSelector, and redux (compatible with Redux middleware). Middleware wraps the store: create(persist(devtools(store)))"
    },
    {
      "question": "How do you handle multiple slices/domains with Zustand?",
      "answer": "Option 1: create multiple independent stores (recommended). Option 2: use the slices pattern — define each slice as a function that receives set/get and returns its state + actions, then combine them into one store."
    },
    {
      "question": "How does Zustand prevent unnecessary re-renders?",
      "answer": "Through selector-based subscriptions. A component that uses useStore(state => state.count) only re-renders when count changes. Other state changes in the same store do not trigger re-render. Zustand uses Object.is for equality by default."
    },
    {
      "question": "Can Zustand be used outside React?",
      "answer": "Yes. store.getState() and store.setState() work outside React components. This is useful for integrating with non-React code, router transitions, or event handlers. store.subscribe(listener) enables external subscriptions."
    },
    {
      "question": "What is the Immer middleware in Zustand?",
      "answer": "Allows mutable update syntax while maintaining immutability: set(produce(state => { state.items.push(newItem) })). This simplifies updates to deeply nested state without spread operators."
    },
    {
      "question": "How does Zustand compare to Context API?",
      "answer": "Context re-renders ALL consumers when the context value changes. Zustand provides selector-based subscriptions — only components consuming the changed slice re-render. Zustand also avoids Provider nesting and works outside React."
    },
    {
      "question": "How do you test Zustand stores?",
      "answer": "Stores are plain functions — test them directly: create store, call actions, assert state. No component wrapping needed. For component tests, render the component normally — Zustand integrates naturally with React Testing Library."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 650 320\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:650px;\"><defs><marker id=\"zArr\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"630\" height=\"300\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"325\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Zustand Architecture</text><rect x=\"40\" y=\"55\" width=\"150\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"115\" y=\"83\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component A</text><rect x=\"250\" y=\"55\" width=\"150\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"325\" y=\"83\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component B</text><rect x=\"460\" y=\"55\" width=\"150\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"535\" y=\"83\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Component C</text><line x1=\"115\" y1=\"105\" x2=\"115\" y2=\"145\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#zArr)\"/><line x1=\"325\" y1=\"105\" x2=\"325\" y2=\"145\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#zArr)\"/><line x1=\"535\" y1=\"105\" x2=\"535\" y2=\"145\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#zArr)\"/><rect x=\"40\" y=\"150\" width=\"570\" height=\"80\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"325\" y=\"175\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Zustand Store (single or multiple)</text><text x=\"325\" y=\"195\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">create((set, get) =&gt; ({ state, actions }))</text><text x=\"325\" y=\"215\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Selectors: useStore(s =&gt; s.count) — fine-grained subscriptions</text><line x1=\"115\" y1=\"230\" x2=\"115\" y2=\"260\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#zArr)\"/><line x1=\"535\" y1=\"230\" x2=\"535\" y2=\"260\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#zArr)\"/><rect x=\"40\" y=\"260\" width=\"570\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"325\" y=\"280\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Middleware: persist (localStorage) | devtools | immer | subscribeWithSelector</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Zustand Counter",
      "useCase": "Simple state with direct access",
      "code": "import { create } from \"zustand\";\n\nconst useCounterStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n  decrement: () => set((state) => ({ count: state.count - 1 })),\n  reset: () => set({ count: 0 })\n}));\n\nfunction Counter() {\n  const count = useCounterStore((s) => s.count);\n  const { increment, decrement, reset } = useCounterStore();\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>+</button>\n      <button onClick={decrement}>-</button>\n      <button onClick={reset}>Reset</button>\n    </div>\n  );\n}",
      "description": "No Provider needed. Store hook used directly. Selector ensures minimal re-renders."
    },
    {
      "title": "Async Store with API Fetch",
      "useCase": "Data fetching with loading state",
      "code": "import { create } from \"zustand\";\n\nconst useUserStore = create((set) => ({\n  user: null,\n  loading: false,\n  error: null,\n  fetchUser: async (id) => {\n    set({ loading: true, error: null });\n    try {\n      const res = await fetch(`/api/users/${id}`);\n      const data = await res.json();\n      set({ user: data, loading: false });\n    } catch (err) {\n      set({ error: err.message, loading: false });\n    }\n  },\n}));\n\nfunction UserProfile({ userId }) {\n  const { user, loading, error, fetchUser } = useUserStore();\n  useEffect(() => { fetchUser(userId); }, [userId]);\n  if (loading) return <Spinner />;\n  if (error) return <Error msg={error} />;\n  return <div>{user.name}</div>;\n}",
      "description": "Async actions are defined directly in the store. No middleware needed for basic async."
    },
    {
      "title": "Persist Middleware",
      "useCase": "Save state to localStorage",
      "code": "import { create } from \"zustand\";\nimport { persist } from \"zustand/middleware\";\n\nconst useAuthStore = create(\n  persist(\n    (set) => ({\n      token: null,\n      user: null,\n      login: async (email, password) => {\n        const res = await authApi.login(email, password);\n        set({ token: res.token, user: res.user });\n      },\n      logout: () => set({ token: null, user: null }),\n    }),\n    { name: \"auth-storage\" } // localStorage key\n  )\n);",
      "description": "persist middleware automatically syncs store state to localStorage. On reload, state is rehydrated."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does Zustand's create() return?",
      "options": [
        "A provider component",
        "A custom hook",
        "A reducer",
        "A context object"
      ],
      "answer": 1,
      "explanation": "create() returns a custom hook that provides direct access to store state and actions."
    },
    {
      "question": "How do selectors help performance?",
      "options": [
        "They cache API responses",
        "Component only re-renders when selected value changes",
        "They memoize all functions",
        "They reduce bundle size"
      ],
      "answer": 1,
      "explanation": "Selector-based subscriptions ensure components only re-render when their specific slice of state changes."
    },
    {
      "question": "Which Zustand middleware saves state to localStorage?",
      "options": [
        "devtools",
        "persist",
        "immer",
        "subscribeWithSelector"
      ],
      "answer": 1,
      "explanation": "persist middleware automatically saves and rehydrates state from localStorage."
    },
    {
      "question": "Does Zustand require a Provider wrapper?",
      "options": [
        "Yes, always",
        "No, never",
        "Only for TypeScript",
        "Only for async"
      ],
      "answer": 1,
      "explanation": "Zustand does NOT require any Provider. The store hook is used directly in components."
    },
    {
      "question": "How does Zustand handle async actions?",
      "options": [
        "Requires Redux Thunk",
        "Async functions defined directly in the store using set()",
        "Requires Saga middleware",
        "Async is not supported"
      ],
      "answer": 1,
      "explanation": "Async actions are plain async functions inside the store definition that call set() on completion."
    },
    {
      "question": "What is the bundle size advantage of Zustand over Redux Toolkit?",
      "options": [
        "10x smaller (~1KB vs ~12KB)",
        "Same size",
        "Larger",
        "No difference"
      ],
      "answer": 0,
      "explanation": "Zustand is approximately 1KB minified vs Redux Toolkit at approximately 12KB."
    },
    {
      "question": "How do you create multiple independent state domains?",
      "options": [
        "Use combineReducers",
        "Create multiple stores via separate create() calls",
        "Use Provider nesting",
        "Use createContext"
      ],
      "answer": 1,
      "explanation": "Each create() call creates an independent store. Multiple stores are recommended for separate domains."
    }
  ]
};

TOPICS_DATA["react"]["react-testing"] = {
  "id": "react-testing",
  "title": "React Testing Library",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,
  "tldr": [
    "React Testing Library (RTL) is a testing utility focused on testing components as users interact with them.",
    "Guiding principle: test behavior, not implementation. Query elements by accessibility (role, label, text), not internal details.",
    "RTL integrates with Jest or Vitest. Key helpers: render(), screen, fireEvent, waitFor, act.",
    "Avoid testing internal state, prop types, or implementation details — test rendered output and user interactions."
  ],
  "laymanDefinition": "React Testing Library is like a robot user who tests your app by doing what a real person would do: clicking buttons, typing into fields, reading text on screen. It never looks at the internal wiring of your components (state, props). If the robot can complete the task by interacting with the UI the same way a human would, the test passes. This means your tests break only when functionality actually breaks — not when you refactor internal code.",
  "deepDive": [
    {
      "heading": "Core Philosophy: Testing by Behavior",
      "text": "RTL's guiding principle is \"the more your tests resemble the way your software is used, the more confidence they can give you.\" Query elements by accessibility roles (button, textbox, heading), label text, aria attributes, or displayed text. Never query by component name, state variable, or CSS class. Use getByRole as the primary query (most accessible), then getByLabelText, getByPlaceholderText, getByText, getByDisplayValue. Use queryBy for non-existence checks. Use findBy for async elements that appear after a delay."
    },
    {
      "heading": "Rendering and Querying",
      "text": "render(<MyComponent props={...} />) renders into a DOM container. screen.getByRole('button', { name: /submit/i }) finds the submit button. screen.getByLabelText(/email/i) finds input associated with an email label. screen.getByText('Hello World') finds text elements. screen.getByTestId('my-id') is the escape hatch — prefer accessible queries first. Multiple matches throw an error; use getAllBy for multiple expected matches. screen.debug() prints the current DOM for debugging."
    },
    {
      "heading": "User Interactions and Events",
      "text": "fireEvent.click(element) dispatches DOM events. For realistic interactions, prefer @testing-library/user-event: const user = userEvent.setup(); await user.click(button); await user.type(input, 'text'); await user.selectOptions(select, 'option'). user-event fires more realistic event sequences (focus, blur, keyDown, keyUp, click, change) compared to raw fireEvent. Always await user-event methods since they return promises."
    },
    {
      "heading": "Async Patterns: waitFor and findBy",
      "text": "For testing asynchronous UI (loading states, data fetching), use screen.findByRole('button', { name: /submit/i }) which returns a promise that resolves when the element appears (default timeout 1000ms). Alternatively, await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument()). For negative assertions, use waitFor with expect to eventually evaluate. Mock API calls with msw (Mock Service Worker) for realistic network mocking."
    },
    {
      "heading": "Mocking and Best Practices",
      "text": "Mock external dependencies: wrap API calls in custom hooks and mock at the hook level. Use msw for network-level mocking — it intercepts actual fetch requests. Mock child components sparingly. Test accessibility: toHaveAccessibleName, toHaveAccessibleDescription. Use jest-dom matchers: toBeInTheDocument(), toHaveTextContent(), toHaveClass(), toBeDisabled(), toBeChecked(). Group tests by user behavior: describe('when user submits form'). Avoid testing internal state — test the UI output instead."
    }
  ],
  "interviewAnswer": "React Testing Library tests components from a user's perspective. The core principle is testing behavior not implementation. Queries prioritize accessibility: getByRole > getByLabelText > getByText > getByTestId. Use fireEvent for simple events, user-event for realistic interactions. Use waitFor/findBy for async. Mock external dependencies with msw (Mock Service Worker). Use jest-dom for custom matchers. Never test internal state, props, or implementation — test what renders and how it responds to interaction. This ensures tests provide real confidence and don't break on refactoring.",
  "interviewQuestions": [
    {
      "question": "What is the guiding philosophy of React Testing Library?",
      "answer": "Test behavior, not implementation. Tests should resemble how the software is used — query by accessibility, interact realistically, assert on visible output. This gives confidence that the app works for users, not just that internal code runs."
    },
    {
      "question": "What are the different query types and their priority order?",
      "answer": "getByRole (most preferred, accessible) → getByLabelText → getByPlaceholderText → getByText → getByDisplayValue → getByAltText → getByTitle → getByTestId (last resort). getBy throws if not found, queryBy returns null, findBy returns a promise for async."
    },
    {
      "question": "How do you test async operations like data fetching?",
      "answer": "Use screen.findByRole() which returns a promise that resolves when the element appears. Or await waitFor(() => expect(...).toBeInTheDocument()). For network mocking, use msw to intercept fetch requests at the network level for the most realistic tests."
    },
    {
      "question": "What is the difference between fireEvent and user-event?",
      "answer": "fireEvent dispatches a single DOM event (e.g., click). user-event simulates the full user interaction sequence: focus, keyDown, keyUp, click, blur, change — more realistic. user-event methods return promises and should be awaited. Prefer user-event for realistic tests."
    },
    {
      "question": "When would you use getByTestId?",
      "answer": "As a last resort when no accessible query works — custom components without roles, non-semantic elements, or dynamically generated content where text/role queries are impractical. Avoid overusing it — it tests implementation details."
    },
    {
      "question": "How do you test form submission?",
      "answer": "Use userEvent.type() for each input, then userEvent.click() the submit button. Assert on the submitted data, navigation, or success message. For forms with validation, test valid and invalid states. Use screen.getByRole('alert') for error messages."
    },
    {
      "question": "What are jest-dom matchers and why use them?",
      "answer": "Custom matchers from @testing-library/jest-dom: toBeInTheDocument(), toHaveTextContent(), toHaveClass(), toBeDisabled(), toBeChecked(), toBeVisible(), etc. They provide better error messages and are more semantic than raw Jest matchers."
    },
    {
      "question": "How do you test a component that uses React Context?",
      "answer": "Render the component wrapped in the Provider with the desired value: render(<ThemeProvider value={theme}><MyComponent /></ThemeProvider>). Alternatively, create a helper that wraps components with common providers. Test that the component renders correctly based on context values."
    },
    {
      "question": "What is the act() utility in testing?",
      "answer": "act() ensures all React updates (state changes, effects) are flushed and applied before assertions. React Testing Library automatically wraps renders and user interactions in act(). Only use it manually for custom scenarios like testing effects outside RTL's scope."
    },
    {
      "question": "How do you test error boundaries?",
      "answer": "Render a component that throws, then assert the fallback UI renders. Use a test helper component that throws on demand. Assert that the error boundary catches the error and displays the fallback using screen.getByRole('alert') or similar."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 650 300\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:650px;\"><defs><marker id=\"tArr\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"630\" height=\"280\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"325\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Testing Library Workflow</text><rect x=\"50\" y=\"55\" width=\"180\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"140\" y=\"82\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">1. render(component)</text><line x1=\"230\" y1=\"78\" x2=\"290\" y2=\"78\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#tArr)\"/><rect x=\"290\" y=\"55\" width=\"180\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"380\" y=\"82\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">2. Query Elements (getByRole)</text><line x1=\"470\" y1=\"78\" x2=\"530\" y2=\"78\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#tArr)\"/><rect x=\"530\" y=\"55\" width=\"70\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"565\" y=\"82\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">3. Interact</text><line x1=\"565\" y1=\"100\" x2=\"565\" y2=\"140\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#tArr)\"/><line x1=\"380\" y1=\"100\" x2=\"380\" y2=\"140\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#tArr)\"/><rect x=\"50\" y=\"145\" width=\"550\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"325\" y=\"172\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">4. Assert: expect(element).toBeInTheDocument() / toHaveTextContent() / toBeDisabled()</text><line x1=\"325\" y1=\"190\" x2=\"325\" y2=\"215\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#tArr)\"/><rect x=\"50\" y=\"220\" width=\"550\" height=\"45\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"325\" y=\"247\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Key: Test behavior, not implementation — no state/prop checking, query by accessibility</text></svg>",
  "codeExamples": [
    {
      "title": "Testing a Counter Component",
      "useCase": "Basic component interaction",
      "code": "import { render, screen } from \"@testing-library/react\";\nimport userEvent from \"@testing-library/user-event\";\nimport Counter from \"./Counter\";\n\ndescribe(\"Counter\", () => {\n  it(\"increments count when button is clicked\", async () => {\n    const user = userEvent.setup();\n    render(<Counter />);\n    const button = screen.getByRole(\"button\", { name: /increment/i });\n    await user.click(button);\n    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();\n  });\n\n  it(\"decrements count when decrement clicked\", async () => {\n    const user = userEvent.setup();\n    render(<Counter />);\n    await user.click(screen.getByRole(\"button\", { name: /decrement/i }));\n    expect(screen.getByText(/count: -1/i)).toBeInTheDocument();\n  });\n});",
      "description": "Tests simulate user clicks and assert on rendered output. No internal state checking."
    },
    {
      "title": "Testing Form Submission with Async",
      "useCase": "Form with API call",
      "code": "import { render, screen, waitFor } from \"@testing-library/react\";\nimport userEvent from \"@testing-library/user-event\";\nimport { http, HttpResponse } from \"msw\";\nimport { setupServer } from \"msw/node\";\nimport LoginForm from \"./LoginForm\";\n\nconst server = setupServer(\n  http.post(\"/api/login\", () => {\n    return HttpResponse.json({ token: \"abc\" });\n  })\n);\n\nbeforeAll(() => server.listen());\nafterEach(() => server.resetHandlers());\nafterAll(() => server.close());\n\nit(\"shows success message on valid login\", async () => {\n  const user = userEvent.setup();\n  render(<LoginForm />);\n  await user.type(screen.getByLabelText(/email/i), \"test@test.com\");\n  await user.type(screen.getByLabelText(/password/i), \"password123\");\n  await user.click(screen.getByRole(\"button\", { name: /login/i }));\n  await waitFor(() => {\n    expect(screen.getByText(/welcome/i)).toBeInTheDocument();\n  });\n});",
      "description": "msw intercepts the network request. userEvent provides realistic interaction. waitFor handles async assertions."
    },
    {
      "title": "Testing Accessible Queries",
      "useCase": "Best practice query patterns",
      "code": "// Prefer role queries first\nscreen.getByRole(\"button\", { name: /submit/i });\nscreen.getByRole(\"heading\", { name: /welcome/i });\nscreen.getByRole(\"textbox\", { name: /email/i });\nscreen.getByRole(\"combobox\", { name: /country/i });\nscreen.getByRole(\"alert\"); // error/success messages\nscreen.getByRole(\"progressbar\"); // loading state\n\n// Label association\nscreen.getByLabelText(/email/i);\n\n// Text content\nscreen.getByText(\"Total: $50.00\");\n\n// For non-existence\nexpect(screen.queryByRole(\"alert\")).not.toBeInTheDocument();\n\n// For async appearance\nconst btn = await screen.findByRole(\"button\", { name: /retry/i });",
      "description": "Always prefer the most accessible query. Role queries ensure your components are accessible to screen readers."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the primary query to prefer in React Testing Library?",
      "options": [
        "getByTestId",
        "getByRole",
        "getByClassName",
        "querySelector"
      ],
      "answer": 1,
      "explanation": "getByRole is the most accessible and preferred query. It encourages semantic, accessible components."
    },
    {
      "question": "What does findBy return?",
      "options": [
        "An element or null",
        "A promise that resolves when the element appears",
        "An array of elements",
        "undefined"
      ],
      "answer": 1,
      "explanation": "findBy queries return a promise that resolves when the element appears (with timeout)."
    },
    {
      "question": "What is the purpose of user-event over fireEvent?",
      "options": [
        "Faster execution",
        "More realistic event sequences (focus, blur, key events)",
        "Less code required",
        "Better error messages"
      ],
      "answer": 1,
      "explanation": "user-event simulates the full realistic interaction sequence, not just a single event."
    },
    {
      "question": "What is the best way to mock API calls in RTL tests?",
      "options": [
        "Jest mock for fetch",
        "msw (Mock Service Worker)",
        "Mock component props",
        "jest.mock for axios"
      ],
      "answer": 1,
      "explanation": "msw intercepts at the network level, providing the most realistic test setup without mocking internal code."
    },
    {
      "question": "Which matcher checks if an element exists in the document?",
      "options": [
        "toBeVisible",
        "toBeInTheDocument",
        "toExist",
        "toBePresent"
      ],
      "answer": 1,
      "explanation": "toBeInTheDocument() from jest-dom checks if the element is in the DOM."
    },
    {
      "question": "What should you NOT test with React Testing Library?",
      "options": [
        "Rendered output",
        "User interactions",
        "Accessibility",
        "Internal state and implementation details"
      ],
      "answer": 3,
      "explanation": "RTL philosophy is to test behavior, not implementation — never test state values, prop types, or internal methods."
    },
    {
      "question": "What does render() return in RTL?",
      "options": [
        "A rendered component",
        "An object with container, unmount, and rerender utilities",
        "A DOM element",
        "Nothing"
      ],
      "answer": 1,
      "explanation": "render() returns utilities for container access, unmounting, and re-rendering."
    }
  ]
};

TOPICS_DATA["react"]["react-hoc"] = {
  "id": "react-hoc",
  "title": "Higher-Order Components",
  "difficulty": "advanced",
  "estimatedMinutes": 25,
  "tldr": [
    "A Higher-Order Component (HOC) is a function that takes a component and returns an enhanced component.",
    "HOCs are a pattern to reuse component logic: authentication, logging, data fetching, styling.",
    "The pattern: const EnhancedComponent = withFeature(WrappedComponent). Name conventionally starts with \"with\".",
    "HOCs compose via nesting: withAuth(withLogger(MyComponent)). Avoid HOCs for new code — prefer hooks instead."
  ],
  "laymanDefinition": "A Higher-Order Component is like a gift-wrapping service. You give them your plain box (component), and they wrap it with fancy paper, add a bow, and attach a gift tag (extra props/behavior). You get back a wrapped component that looks nicer and has additional features, but the original box is still inside. The wrapper doesn't change what's inside — it just adds decoration around it.",
  "deepDive": [
    {
      "heading": "Basic HOC Pattern",
      "text": "A HOC is a function that receives a component and returns a new component that renders the original component with additional props. Example: function withLogger(WrappedComponent) { return function Enhanced(props) { console.log('Rendering with props:', props); return <WrappedComponent {...props} />; }; }. The HOC can add state, lifecycle methods, event handlers, or modify props before passing them down. The wrapped component receives all original props plus any injected props."
    },
    {
      "heading": "Common Use Cases",
      "text": "Authentication: withAuth redirects unauthenticated users to login. Data fetching: withData fetches data and passes it as props. Logging: withLogger logs renders and prop changes. Styling: withStyles injects CSS classes or inline styles. Permission: withPermission checks user roles and conditionally renders. Redux's connect() is a classic HOC that injects state and dispatch as props. React Router's withRouter injects location, match, history."
    },
    {
      "heading": "Composing HOCs",
      "text": "Multiple HOCs are composed via nesting: withAuth(withLogger(withData(MyComponent))). For better readability, use compose utility (from Redux or lodash): compose(withAuth, withLogger, withData)(MyComponent). The order matters — innermost HOC wraps the base component, outermost HOC is applied last. Each HOC adds a layer of wrapper components in the React devtools tree, which can make debugging harder."
    },
    {
      "heading": "HOC Pitfalls and Best Practices",
      "text": "(1) Copy static methods: the wrapped component's static methods are lost; use hoist-non-react-statics. (2) Forward refs: refs don't pass through HOCs; use React.forwardRef. (3) Display name: set displayName for debugging — withLogger.displayName = `withLogger(${getDisplayName(WrappedComponent)})`. (4) Don't mutate the original component — return a new wrapper component. (5) Pass unrelated props through via {...props}. (6) Prefer hooks over HOCs for new code — hooks are simpler, more composable, and don't create wrapper nesting."
    },
    {
      "heading": "Migrating from HOCs to Hooks",
      "text": "The same logic can usually be expressed as a custom hook: function useLogger(props) { useEffect(() => { console.log('Props changed:', props); }); } then used directly: function MyComponent(props) { useLogger(props); return <div>...</div>; }. Hooks avoid wrapper nesting, are easier to type with TypeScript, and don't have the static method/ref forwarding issues. However, HOCs remain useful for cross-cutting concerns in class components and for libraries that need to inject props declaratively."
    }
  ],
  "interviewAnswer": "A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior. It's a pattern for reusing component logic: withAuth, withLogger, withData. HOCs compose via nesting or compose(). Key considerations: copy static methods, forward refs, set display names, and don't mutate the original. For new code, prefer React hooks over HOCs — hooks are simpler, compose naturally without nesting, and avoid the static method/ref forwarding issues. HOCs remain relevant for class components and library APIs.",
  "interviewQuestions": [
    {
      "question": "What is a Higher-Order Component?",
      "answer": "A function that takes a component and returns an enhanced component with additional props or behavior. Example: const Enhanced = withHOC(Base)."
    },
    {
      "question": "What are common use cases for HOCs?",
      "answer": "Authentication (withAuth), data fetching (withData), logging (withLogger), styling (withStyles), permission checks, Redux connect(), React Router withRouter."
    },
    {
      "question": "How do you compose multiple HOCs?",
      "answer": "Nesting: withAuth(withLogger(MyComponent)). Or using a compose utility: compose(withAuth, withLogger)(MyComponent). The order matters — each adds a wrapper layer."
    },
    {
      "question": "What are the main pitfalls with HOCs?",
      "answer": "(1) Static methods are lost — use hoist-non-react-statics. (2) Refs don't pass through — use React.forwardRef. (3) Debugging is harder due to wrapper nesting. (4) Display names need manual setting."
    },
    {
      "question": "Why do hooks replace HOCs?",
      "answer": "Hooks are simpler, compose naturally without nesting, don't require static method copying, work seamlessly with refs, and are easier to type with TypeScript. Custom hooks like useAuth() or useData() replace HOC patterns."
    },
    {
      "question": "How do you handle refs in HOCs?",
      "answer": "Use React.forwardRef to pass refs through the HOC to the wrapped component: function withLogger(WrappedComponent) { return React.forwardRef((props, ref) => <WrappedComponent ref={ref} {...props} />); }."
    },
    {
      "question": "What is the display name convention for HOCs?",
      "answer": "Set a custom displayName for debugging: EnhancedComponent.displayName = `withLogger(${getDisplayName(WrappedComponent)})`. Helper: function getDisplayName(WC) { return WC.displayName || WC.name || \"Component\"; }."
    },
    {
      "question": "Can HOCs be used with functional components?",
      "answer": "Yes. HOCs wrap both class and functional components. However, hooks are preferred for new functional component code as they achieve the same results with less complexity."
    },
    {
      "question": "How does Redux's connect() work as a HOC?",
      "answer": "connect(mapStateToProps, mapDispatchToProps)(Component) returns an enhanced component that subscribes to the Redux store and injects state and dispatch as props. It handles optimizations like selector memoization and re-render prevention."
    },
    {
      "question": "What is the difference between HOC and Render Props?",
      "answer": "HOC: function that returns a new component wrapping the input. Render Props: a component that accepts a function prop to render its content. HOCs add wrapper layers, render props don't. Both are superseded by hooks for most use cases."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 650 320\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:650px;\"><defs><marker id=\"hArr\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"630\" height=\"300\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"325\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Higher-Order Component Pattern</text><rect x=\"40\" y=\"55\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"140\" y=\"80\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">withAuth(WrappedComponent)</text><line x1=\"140\" y1=\"95\" x2=\"140\" y2=\"125\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#hArr)\"/><rect x=\"40\" y=\"125\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"140\" y=\"150\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">withLogger(WrappedComponent)</text><line x1=\"140\" y1=\"165\" x2=\"140\" y2=\"195\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#hArr)\"/><rect x=\"40\" y=\"195\" width=\"200\" height=\"40\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"140\" y=\"220\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">WrappedComponent</text><line x1=\"240\" y1=\"215\" x2=\"310\" y2=\"175\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#hArr)\"/><text x=\"350\" y=\"160\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"middle\">Enhanced props flow</text><text x=\"350\" y=\"175\" fill=\"#9aa0b0\" font-size=\"11\" text-anchor=\"middle\">(original + injected)</text><line x1=\"240\" y1=\"215\" x2=\"310\" y2=\"255\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#hArr)\"/><rect x=\"310\" y=\"245\" width=\"250\" height=\"30\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"435\" y=\"265\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">HOC concerns: static methods, refs, displayName</text></svg>",
  "codeExamples": [
    {
      "title": "Simple withLogger HOC",
      "useCase": "Logging component renders",
      "code": "function withLogger(WrappedComponent) {\n  function Enhanced(props) {\n    useEffect(() => {\n      console.log(\"Rendered:\", WrappedComponent.name, props);\n    });\n    return <WrappedComponent {...props} />;\n  }\n  Enhanced.displayName = `withLogger(${getDisplayName(WrappedComponent)})`;\n  return Enhanced;\n}\n\nconst LoggedButton = withLogger(Button);",
      "description": "HOC wraps component, adds logging behavior. displayName helps debugging."
    },
    {
      "title": "withAuth Authentication HOC",
      "useCase": "Protecting routes",
      "code": "function withAuth(WrappedComponent) {\n  function Enhanced(props) {\n    const { user, loading } = useAuth();\n    if (loading) return <Spinner />;\n    if (!user) return <Navigate to=\"/login\" />;\n    return <WrappedComponent user={user} {...props} />;\n  }\n  return Enhanced;\n}\n\nconst ProtectedDashboard = withAuth(Dashboard);\n\n// Usage in router:\n<Route path=\"/dashboard\" element={<ProtectedDashboard />} />",
      "description": "HOC handles authentication logic. Unauthenticated users are redirected."
    },
    {
      "title": "withData Data Fetching HOC",
      "useCase": "Injecting fetched data as props",
      "code": "function withData(fetchFn, dataProp = \"data\") {\n  return function(WrappedComponent) {\n    function Enhanced(props) {\n      const [data, setData] = useState(null);\n      const [loading, setLoading] = useState(true);\n      useEffect(() => {\n        setLoading(true);\n        fetchFn(props).then((result) => {\n          setData(result);\n          setLoading(false);\n        });\n      }, []);\n      const injected = { [dataProp]: data, loading };\n      return <WrappedComponent {...props} {...injected} />;\n    }\n    return Enhanced;\n  };\n}\n\nconst UserProfileWithData = withData(fetchUser, \"user\")(UserProfile);",
      "description": "HOC fetches data and injects it as prop. Configurable: fetch function and prop name."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does a Higher-Order Component return?",
      "options": [
        "A React element",
        "A new component with enhanced behavior",
        "A hook",
        "A context provider"
      ],
      "answer": 1,
      "explanation": "HOC is a function that returns a new component wrapping the input with additional behavior."
    },
    {
      "question": "Why should you copy static methods in HOCs?",
      "options": [
        "Better performance",
        "Static methods are lost when wrapping — use hoist-non-react-statics",
        "Static methods are automatically inherited",
        "Static methods are not needed"
      ],
      "answer": 1,
      "explanation": "The wrapper component does not inherit static methods from the wrapped component."
    },
    {
      "question": "How do you handle refs in HOCs?",
      "options": [
        "Refs work automatically",
        "Use React.forwardRef to forward refs through the HOC",
        "HOCs cannot use refs",
        "Ignore refs"
      ],
      "answer": 1,
      "explanation": "React.forwardRef allows the HOC to forward refs to the wrapped component."
    },
    {
      "question": "What is the modern alternative to HOCs?",
      "options": [
        "Class components",
        "React hooks",
        "Render props",
        "Context API"
      ],
      "answer": 1,
      "explanation": "React hooks are the recommended modern alternative — they are simpler and more composable."
    },
    {
      "question": "How are multiple HOCs composed?",
      "options": [
        "Using + operator",
        "Via nesting or compose() utility",
        "Using HOC.add() method",
        "They cannot be composed"
      ],
      "answer": 1,
      "explanation": "HOCs compose via nesting: HOC1(HOC2(Component)) or compose(HOC1, HOC2)(Component)."
    },
    {
      "question": "What naming convention do HOCs follow?",
      "options": [
        "Prefix \"hoc\"",
        "Prefix \"with\" (e.g., withAuth)",
        "Suffix \"HOC\"",
        "No convention"
      ],
      "answer": 1,
      "explanation": "HOCs conventionally start with the prefix \"with\" (e.g., withAuth, withLogger, withRouter)."
    },
    {
      "question": "What issue does HOC nesting cause in development?",
      "options": [
        "Slower performance",
        "Deeper component tree in React DevTools, harder debugging",
        "Larger bundle size",
        "Cannot use TypeScript"
      ],
      "answer": 1,
      "explanation": "Each HOC adds a wrapper component layer, making the React DevTools tree deeper and harder to debug."
    }
  ]
};

TOPICS_DATA["react"]["react-render-props"] = {
  "id": "react-render-props",
  "title": "Render Props Pattern",
  "difficulty": "advanced",
  "estimatedMinutes": 20,
  "tldr": [
    "Render Props is a pattern where a component receives a function as a prop (usually called render or children) that returns React elements.",
    "The component calls the render function with its internal state, giving the parent control over what gets rendered.",
    "Common example: React Router's Route component which passes route params to its render function.",
    "Hooks have largely replaced render props for shareable logic, but the pattern is still important for understanding React composition."
  ],
  "laymanDefinition": "Render Props is like having a custom cake shop where you provide an empty cake base (the component), and the customer gives you a recipe function that describes exactly how they want their cake decorated. The shop handles the baking (internal logic), then passes you the baked cake so you can add your own frosting. You control the final decoration, while the shop handles the complexity of baking.",
  "deepDive": [
    {
      "heading": "How Render Props Work",
      "text": "A component with a render prop accepts a function as a prop. Inside its render, it calls the function, passing relevant state/data as arguments. The function returns JSX. Example: <DataProvider render={data => <div>{data.name}</div>} />. The component controls the logic, the parent controls the rendering. The prop can be named \"render\" or \"children\" (when used as a function child pattern: <DataProvider>{data => <div>{data.name}</div>}</DataProvider>)."
    },
    {
      "heading": "Render Props vs HOC",
      "text": "Render Props: component calls a function prop to render, the parent controls the output. HOC: wraps the component, injects props. Render Props are more flexible because the parent controls rendering at the usage site. However, render props can create deeply nested callbacks (\"wrapper hell\"). HOCs add wrapper components in the tree but keep the usage site flat. Both are superseded by hooks for logic reuse, but render props remain useful for context-like patterns where a parent controls rendering of child UI."
    },
    {
      "heading": "Common Real-World Examples",
      "text": "React Router's Route: <Route path=\"/user\" render={props => <User {...props} />} />. React Motion's Motion: <Motion style={{x: spring(10)}}>{interpolated => <div style={interpolated} />}</Motion>. Formik's <Formik> component uses render props to give form state. React Context's Consumer was a render prop before hooks: <ThemeContext.Consumer>{theme => <div>{theme}</div>}</ThemeContext.Consumer>."
    },
    {
      "heading": "Performance Considerations",
      "text": "Render prop functions create new function references on each render, which can break PureComponent/memo optimizations. Solutions: (1) Define the render function as a class method or useCallback. (2) Use React.memo on the child. (3) Pass stable references when possible. (4) Consider whether the re-render is actually causing a performance problem before optimizing. React's reconciliation handles most cases efficiently."
    },
    {
      "heading": "Render Props with React.memo",
      "text": "When using render props with React.memo, the memo comparison fails because the render function is a new reference each time. To optimize: (1) Use useCallback for the render function in the parent. (2) Extract the render function outside the component. (3) The render prop component can implement shouldComponentUpdate (class) or use useMemo (hooks) to compare the render result. In practice, this level of optimization is rarely needed unless rendering large lists or complex trees."
    }
  ],
  "interviewAnswer": "Render Props is a pattern where a component receives a function prop (render or children) that returns React elements. The component calls the function with its internal state, giving the parent control over rendering. Common examples: React Router Route render prop, React Context Consumer. Render Props offer more flexibility than HOCs (parent controls rendering at usage site) but can create nested callback patterns. Hooks are the recommended modern alternative for logic reuse, but the render props pattern is still important for understanding React composition and is used in some library APIs.",
  "interviewQuestions": [
    {
      "question": "What is the Render Props pattern?",
      "answer": "A component receives a function prop (render/children) that returns React elements. The component calls this function with its internal state, delegating rendering control to the parent."
    },
    {
      "question": "How is Render Props different from HOC?",
      "answer": "Render Props: parent controls rendering at the usage site via a function prop. HOC: wraps the component at definition time, injecting props. Render Props are more flexible at the call site but can create nested callbacks. Hooks replace both."
    },
    {
      "question": "What is the function child pattern in Render Props?",
      "answer": "Using children as the render function: <Provider>{value => <Child value={value} />}</Provider>. The component renders props.children(value) instead of props.render(value). It's a syntactic variation of the same pattern."
    },
    {
      "question": "What are real-world examples of Render Props?",
      "answer": "React Router's Route render prop, React Context Consumer, Formik's Formik component render prop, React Motion's Motion component."
    },
    {
      "question": "What performance concern exists with Render Props?",
      "answer": "Render functions create new references each render, potentially breaking PureComponent/memo optimizations. Use useCallback or define functions outside the render path to mitigate."
    },
    {
      "question": "Why did hooks replace Render Props?",
      "answer": "Hooks provide the same logic reuse without the nesting/callback overhead. useMyHook() gives direct access to state and logic without wrapping components or passing render functions."
    },
    {
      "question": "Can you use Render Props with functional components?",
      "answer": "Yes. Both the provider component and the render function can be functional components. The pattern works identically in class and functional components."
    },
    {
      "question": "What is the \"wrapper hell\" concern with Render Props?",
      "answer": "Deeply nested render prop calls create pyramid-shaped code: <A>{a => <B b={a}>{c => <C c={c}>...</C></B></A>. This is harder to read and maintain. Hooks avoid this entirely."
    },
    {
      "question": "How does TypeScript work with Render Props?",
      "answer": "The component is generic over the render function's return type: function Provider<T>(props: { render: (value: T) => ReactNode, value: T }). The render function's parameter type is inferred from the component's internal type."
    },
    {
      "question": "When would you still use Render Props today?",
      "answer": "In library APIs where the user needs to control rendering while the library manages logic. For example, virtualization libraries (react-virtualized), drag-and-drop libraries (react-dnd), and some chart libraries use render props for flexible rendering."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 600 280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:600px;\"><defs><marker id=\"rArr\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"580\" height=\"260\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"300\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Render Props Pattern</text><rect x=\"30\" y=\"55\" width=\"240\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"150\" y=\"82\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Parent Component</text><line x1=\"270\" y1=\"80\" x2=\"330\" y2=\"80\" stroke=\"#f87171\" stroke-width=\"2\" marker-end=\"url(#rArr)\"/><text x=\"300\" y=\"68\" fill=\"#f87171\" font-size=\"9\" text-anchor=\"middle\">passes render function</text><rect x=\"330\" y=\"55\" width=\"240\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"450\" y=\"82\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Provider Component</text><line x1=\"450\" y1=\"105\" x2=\"450\" y2=\"145\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#rArr)\"/><text x=\"300\" y=\"128\" fill=\"#9aa0b0\" font-size=\"9\" text-anchor=\"middle\">calls render(state)</text><rect x=\"330\" y=\"145\" width=\"240\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"450\" y=\"172\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Renders: {render(state)}</text><line x1=\"330\" y1=\"170\" x2=\"270\" y2=\"170\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#rArr)\"/><text x=\"300\" y=\"185\" fill=\"#6c9fff\" font-size=\"9\" text-anchor=\"middle\">returns JSX</text><rect x=\"30\" y=\"145\" width=\"240\" height=\"50\" rx=\"6\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"150\" y=\"172\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Custom JSX from render function</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Mouse Position Tracker",
      "useCase": "Render Props for shared mouse logic",
      "code": "function MouseTracker({ render }) {\n  const [position, setPosition] = useState({ x: 0, y: 0 });\n\n  useEffect(() => {\n    function handleMouseMove(e) {\n      setPosition({ x: e.clientX, y: e.clientY });\n    }\n    window.addEventListener(\"mousemove\", handleMouseMove);\n    return () => window.removeEventListener(\"mousemove\", handleMouseMove);\n  }, []);\n\n  return render(position);\n}\n\n// Usage:\n<MouseTracker\n  render={({ x, y }) => (\n    <div>The mouse is at ({x}, {y})</div>\n  )}\n/>",
      "description": "The MouseTracker component handles mouse event logic. The parent controls what UI renders."
    },
    {
      "title": "Function Child Pattern",
      "useCase": "Using children as render prop",
      "code": "function DataFetcher({ url, children }) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(result => {\n        setData(result);\n        setLoading(false);\n      });\n  }, [url]);\n\n  return children({ data, loading });\n}\n\n// Usage with function child:\n<DataFetcher url=\"/api/users\">\n  {({ data, loading }) => (\n    loading ? <Spinner /> : <UserList users={data} />\n  )}\n</DataFetcher>",
      "description": "Using children as the render function creates a more natural JSX structure."
    },
    {
      "title": "Toggle Component with Render Props",
      "useCase": "Stateful toggle behavior",
      "code": "function Toggle({ render }) {\n  const [on, setOn] = useState(false);\n  const toggle = () => setOn(prev => !prev);\n  return render({ on, toggle });\n}\n\n// Reusable toggle with custom UI:\n<Toggle\n  render={({ on, toggle }) => (\n    <div>\n      <Switch checked={on} onChange={toggle} />\n      <p>The switch is {on ? \"ON\" : \"OFF\"}</p>\n      <button onClick={toggle}>Toggle</button>\n    </div>\n  )}\n/>",
      "description": "Toggle logic is encapsulated. The parent fully controls how the toggle state is displayed."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the Render Props pattern?",
      "options": [
        "A component that renders props directly",
        "A component that calls a function prop with its internal state to render",
        "A function that returns a component",
        "A pattern for styling"
      ],
      "answer": 1,
      "explanation": "Render Props delegates rendering control to the parent via a function prop called with internal state."
    },
    {
      "question": "What is the function child pattern?",
      "options": [
        "A component with a child function component",
        "Using props.children as the render function",
        "Calling setState with a function",
        "A controlled component pattern"
      ],
      "answer": 1,
      "explanation": "Function child pattern uses children prop as the render function: <Provider>{value => <UI />}</Provider>."
    },
    {
      "question": "What replaced Render Props in modern React?",
      "options": [
        "Class components",
        "React hooks",
        "ComponentDidCatch",
        "setState"
      ],
      "answer": 1,
      "explanation": "React hooks provide the same logic reuse without nesting or callback patterns."
    },
    {
      "question": "How is Render Props different from HOC?",
      "options": [
        "No difference",
        "Render Props give parent control over rendering at usage site; HOC wraps at definition time",
        "HOC is more flexible",
        "Render Props are only for classes"
      ],
      "answer": 1,
      "explanation": "Render Props delegate rendering to the parent at call site. HOCs inject props at definition time."
    },
    {
      "question": "What is a performance concern with Render Props?",
      "options": [
        "Infinite loops",
        "New function reference each render breaks PureComponent/memo optimization",
        "Memory leaks",
        "Slow mounting"
      ],
      "answer": 1,
      "explanation": "Render functions create new references each render, preventing memoization. Mitigate with useCallback."
    },
    {
      "question": "Which React API used a Consumer render prop before hooks?",
      "options": [
        "React.memo",
        "React.createRef",
        "React Context Consumer",
        "React.Suspense"
      ],
      "answer": 2,
      "explanation": "React Context's Consumer used the render prop pattern: <Consumer>{value => ...}</Consumer>."
    },
    {
      "question": "What is \"wrapper hell\" in Render Props?",
      "options": [
        "Too many wrapper components in JSX",
        "Deeply nested render function callbacks creating pyramid code",
        "Multiple HOCs wrapping a component",
        "Circular dependencies"
      ],
      "answer": 1,
      "explanation": "Deep nesting of render props creates hard-to-read pyramid code: <A>{a => <B b={a}>...}"
    }
  ]
};

TOPICS_DATA["react"]["react-server-components"] = {
  "id": "react-server-components",
  "title": "React Server Components",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "React Server Components (RSC) are components that run and render on the server, sending only the resulting HTML/UI to the client.",
    "RSCs can directly access databases, file systems, and backend APIs without exposing sensitive logic to the client.",
    "Server Components can fetch data at the component level without useEffect, SWR, or React Query — just async/await directly.",
    "RSCs reduce client-side JavaScript bundle size because their dependencies never ship to the browser."
  ],
  "laymanDefinition": "React Server Components are like a chef who prepares the complex parts of a meal in the kitchen (server) and only sends the finished dish to the dining table (client). The diner never sees the raw ingredients, the chef's recipes, or the cooking process. They just see the beautiful plated dish. Regular client components are like a DIY meal kit — the ingredients and instructions are sent to the table, and the diner cooks it themselves. Server Components make apps faster by doing the heavy lifting on the server.",
  "deepDive": [
    {
      "heading": "What Are Server Components?",
      "text": "Server Components are React components that execute exclusively on the server. They can be async, directly access databases, read files, and call internal APIs. The result is serialized as a special format (RSC payload) and streamed to the client. Server Components never re-render on the client — they have no state, no effects, no browser APIs. This dramatically reduces client-side JavaScript. In Next.js, Server Components are the default in the App Router — every component is a Server Component unless you add \"use client\" directive."
    },
    {
      "heading": "Server Components vs Client Components",
      "text": "Server Components: run on server, async, direct DB/FS access, no state/effects, smaller bundle. Client Components: run in browser, useState/useEffect, browser APIs, interactivity. The \"use client\" directive marks the boundary. Server Components can import and render Client Components. Client Components cannot import Server Components (but can receive Server Components as children via props or composition patterns). The key optimization: keep expensive dependencies (markdown parsers, date libraries) in Server Components — they never ship to the client."
    },
    {
      "heading": "Data Fetching in Server Components",
      "text": "Server Components can use async/await directly at the component level: async function Page() { const posts = await db.query(\"SELECT * FROM posts\"); return <PostList posts={posts} />; }. No useEffect, no SWR, no loading state boilerplate. The server suspends while the data fetches, then streams the result. This eliminates the waterfall problem where a component fetches, renders, then its child fetches — all fetching happens in parallel on the server. Data fetching is secure — credentials stay on the server."
    },
    {
      "heading": "Performance and Bundle Size Benefits",
      "text": "Server Components reduce client bundle size because their dependencies (libraries, utilities) never ship to the browser. Example: a markdown parser used in a Server Component is not included in the client bundle. The RSC payload is a compact binary format. Combined with streaming, the client can progressively render content as it arrives. Server Components also eliminate the need for API endpoints for internal data — the component fetches directly from the database. This simplifies the architecture and reduces network round trips."
    },
    {
      "heading": "Limitations and Caveats",
      "text": "Server Components cannot: use state/effects, handle user interactions, access browser APIs, use context (for now), use hooks. They run once per request (or once during build for SSG). The \"use client\" boundary is explicit — components that need interactivity must be split. Caching considerations: data in Server Components can be cached with Next.js's fetch cache or React's cache() function. Error handling uses error boundaries in Client Components wrapping Server Components."
    }
  ],
  "interviewAnswer": "React Server Components run and render on the server, sending only the resulting UI to the client. They reduce the client bundle by keeping dependencies server-side. Server Components can be async and directly access databases/file systems without exposing credentials. They enable component-level data fetching without useEffect or external data libraries. The \"use client\" directive marks client boundaries. Server Components have no state, effects, or browser APIs — they are for static/derived content. Next.js App Router uses Server Components by default. Key benefits: zero client bundle impact for server logic, direct data access, parallel data fetching, and streaming.",
  "interviewQuestions": [
    {
      "question": "What are React Server Components?",
      "answer": "Components that run exclusively on the server, producing a serialized RSC payload sent to the client. They have no state, effects, or browser APIs, and can directly access server-side resources."
    },
    {
      "question": "How do you mark a component as a Client Component?",
      "answer": "Add \"use client\" directive at the top of the file. Every component without this directive is a Server Component by default in Next.js App Router."
    },
    {
      "question": "How does data fetching work in Server Components?",
      "answer": "Direct async/await at the component level: async function Page() { const data = await db.query(...); return <View data={data} />; }. No hooks, no loading states, no waterfall."
    },
    {
      "question": "What is the bundle size benefit of Server Components?",
      "answer": "Dependencies imported only in Server Components are never included in the client bundle. A markdown parser, date library, or utility used solely in server code has zero cost for the client."
    },
    {
      "question": "Can Server Components use hooks or state?",
      "answer": "No. Server Components cannot use useState, useEffect, useContext, or any React hooks. They cannot handle events or browser interactions. Use Client Components for interactivity."
    },
    {
      "question": "How do Server Components relate to Next.js App Router?",
      "answer": "In Next.js App Router, all components are Server Components by default. Adding \"use client\" at the top of a file makes it a Client Component. This is the recommended approach for new Next.js apps."
    },
    {
      "question": "Can Server Components import Client Components?",
      "answer": "Yes. Server Components can import and render Client Components. Client Components can receive Server Components as children (via composition), but cannot import them directly."
    },
    {
      "question": "How does caching work with Server Components?",
      "answer": "Server Components run per request (dynamic) or once at build time (static). Next.js provides fetch caching: fetch(url, { cache: \"force-cache\" }) or { next: { revalidate: 60 } }. React's cache() function deduplicates requests during a render pass."
    },
    {
      "question": "How do you handle errors in Server Components?",
      "answer": "Wrap Server Components in Client Component error boundaries. The error boundary must be a Client Component that catches errors during rendering of its Server Component children."
    },
    {
      "question": "What is the RSC payload format?",
      "answer": "A compact binary/JSON format that represents the rendered tree. It can be streamed to the client progressively. The client merges the RSC payload with existing Client Component state to produce the final UI."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 650 320\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:650px;\"><defs><marker id=\"sArr\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0,10 3.5,0 7\" fill=\"#6c9fff\"/></marker></defs><rect x=\"10\" y=\"10\" width=\"630\" height=\"300\" rx=\"10\" fill=\"var(--bg-card)\" stroke=\"var(--border)\" stroke-width=\"1\"/><text x=\"325\" y=\"38\" fill=\"#e8eaed\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">React Server Components Architecture</text><rect x=\"30\" y=\"55\" width=\"260\" height=\"100\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><text x=\"160\" y=\"80\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">🔵 Server (Node.js)</text><text x=\"160\" y=\"100\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Server Components run here</text><text x=\"160\" y=\"115\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Direct DB, FS, API access</text><text x=\"160\" y=\"130\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Async fetch, no client JS cost</text><line x1=\"290\" y1=\"105\" x2=\"350\" y2=\"105\" stroke=\"#6c9fff\" stroke-width=\"2\" marker-end=\"url(#sArr)\"/><text x=\"320\" y=\"95\" fill=\"#34d399\" font-size=\"9\" text-anchor=\"middle\">RSC payload</text><rect x=\"350\" y=\"55\" width=\"260\" height=\"100\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"480\" y=\"80\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">🟢 Client (Browser)</text><text x=\"480\" y=\"100\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Client Components with \"use client\"</text><text x=\"480\" y=\"115\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">State, effects, interactivity</text><text x=\"480\" y=\"130\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">Receives serialized RSC result</text><rect x=\"30\" y=\"180\" width=\"580\" height=\"100\" rx=\"8\" fill=\"#1a1d28\" stroke=\"#f87171\" stroke-width=\"1.5\"/><text x=\"320\" y=\"205\" fill=\"#f87171\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Key Principles</text><text x=\"320\" y=\"225\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">1. Server Components: no state, no effects, no browser APIs — pure rendering from server data</text><text x=\"320\" y=\"242\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">2. \"use client\" marks the boundary — everything else is Server Component by default (Next.js App Router)</text><text x=\"320\" y=\"259\" fill=\"#9aa0b0\" font-size=\"10\" text-anchor=\"middle\">3. Server Components can import Client Components; Client Components cannot import Server Components</text></svg>",
  "codeExamples": [
    {
      "title": "Server Component Data Fetching",
      "useCase": "Direct database access without hooks",
      "code": "// This is a Server Component (no \"use client\" directive)\nasync function BlogPage() {\n  const posts = await db.query(`\n    SELECT id, title, excerpt, created_at\n    FROM posts\n    ORDER BY created_at DESC\n    LIMIT 10\n  `);\n\n  return (\n    <div>\n      <h1>Latest Posts</h1>\n      {posts.map(post => (\n        <article key={post.id}>\n          <h2>{post.title}</h2>\n          <p>{post.excerpt}</p>\n          <small>{post.created_at.toLocaleDateString()}</small>\n        </article>\n      ))}\n    </div>\n  );\n}",
      "description": "Server Component fetches data directly from the database. No API endpoint, no useEffect, no loading state. The component is async — it suspends while the query runs, then streams the result."
    },
    {
      "title": "Client Component Interactivity",
      "useCase": "Interactive parts use \"use client\"",
      "code": "\"use client\";\n\nimport { useState } from \"react\";\n\nfunction LikeButton({ postId, initialLikes }) {\n  const [likes, setLikes] = useState(initialLikes);\n  const [liked, setLiked] = useState(false);\n\n  async function handleLike() {\n    const res = await fetch(\"/api/like\", {\n      method: \"POST\",\n      body: JSON.stringify({ postId }),\n    });\n    const data = await res.json();\n    setLikes(data.likes);\n    setLiked(true);\n  }\n\n  return (\n    <button onClick={handleLike} disabled={liked}>\n      {liked ? `${likes} ❤️` : `${likes} 🤍`}\n    </button>\n  );\n}",
      "description": "Client Component handles interactivity (state, effects, events). Server Component passes initial data as props."
    },
    {
      "title": "Server + Client Composition",
      "useCase": "Best practice for mixing both",
      "code": "// Server Component (parent)\nasync function PostPage({ params }) {\n  const post = await db.query(\"SELECT * FROM posts WHERE id = $1\", [params.id]);\n  const comments = await db.query(\"SELECT * FROM comments WHERE post_id = $1\", [params.id]);\n\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <div>{post.content}</div>\n      {/* Server Component renders Client Component */}\n      <LikeButton postId={post.id} initialLikes={post.likes} />\n      <CommentList initialComments={comments} postId={post.id} />\n    </article>\n  );\n}\n\n// Client Component with \"use client\"\n\"use client\";\nfunction CommentList({ initialComments, postId }) {\n  const [comments, setComments] = useState(initialComments);\n  // ... interactivity logic\n}",
      "description": "Server Component handles data fetching. Client Components handle interactivity. Composition pattern: Server Component wraps Client Components with initial data as props."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is a React Server Component?",
      "options": [
        "A component that renders on the server and sends only the resulting UI to the client",
        "A component that runs in the browser",
        "A component that is pre-rendered at build time",
        "A component that cannot have props"
      ],
      "answer": 0,
      "explanation": "Server Components run on the server, producing a serialized payload sent to the client."
    },
    {
      "question": "How do you mark a component as a Client Component?",
      "options": [
        "Add \"use server\" directive",
        "Add \"use client\" directive",
        "No special marking needed",
        "Import from \"react-dom\""
      ],
      "answer": 1,
      "explanation": "\"use client\" at the top of the file marks the client boundary."
    },
    {
      "question": "Can Server Components use hooks?",
      "options": [
        "Yes, all hooks",
        "No, no hooks or state",
        "Only useState",
        "Only useEffect"
      ],
      "answer": 1,
      "explanation": "Server Components cannot use any hooks, state, effects, or browser APIs."
    },
    {
      "question": "How does data fetching work in Server Components?",
      "options": [
        "useEffect hook",
        "Direct async/await at component level",
        "React Query",
        "SWR"
      ],
      "answer": 1,
      "explanation": "Server Components can be async and use direct async/await for data fetching without hooks."
    },
    {
      "question": "What is the bundle size benefit of RSC?",
      "options": [
        "Dependencies used only in Server Components are not included in the client bundle",
        "No benefit",
        "Smaller HTML files",
        "Faster CSS loading"
      ],
      "answer": 0,
      "explanation": "Dependencies imported only in Server Components have zero cost for the client bundle."
    },
    {
      "question": "Can Client Components import Server Components?",
      "options": [
        "Yes, directly",
        "No, but can receive them as children via composition",
        "Only with \"use server\" directive",
        "Only in development"
      ],
      "answer": 1,
      "explanation": "Client Components cannot import Server Components directly but can receive them as children."
    },
    {
      "question": "What is the default in Next.js App Router?",
      "options": [
        "All components are Client Components",
        "All components are Server Components",
        "Must explicitly choose each component",
        "Components are hybrid"
      ],
      "answer": 1,
      "explanation": "In Next.js App Router, all components are Server Components by default unless marked with \"use client\"."
    }
  ]
};

