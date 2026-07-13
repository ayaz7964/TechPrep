/* =================== STATE =================== */
const PREFS_DEFAULTS = {
  theme: 'dark',
  textColor: '#e8eaed',
  bgColor: '#0f1117',
  accentColor: '#6c9fff',
  bodyFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headingFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: 15,
  lineHeight: 1.6,
  contentWidth: 900
};

const THEME_PRESETS = {
  dark: {
    textColor: '#e8eaed', bgColor: '#0f1117', accentColor: '#6c9fff',
    bgSecondary: '#1a1d28', bgCard: '#222639', bgHover: '#2a2f45',
    textSecondary: '#9aa0b0', textMuted: '#5f6578', border: '#2e3348',
    success: '#34d399', warning: '#fbbf24', danger: '#f87171',
    purple: '#a78bfa', pink: '#f472b6'
  },
  light: {
    textColor: '#1a1d2e', bgColor: '#ffffff', accentColor: '#4f7cff',
    bgSecondary: '#f5f6fa', bgCard: '#ffffff', bgHover: '#eef0f6',
    textSecondary: '#5a5f7a', textMuted: '#9aa0b0', border: '#dde0ea',
    success: '#22c57e', warning: '#e6a817', danger: '#e74c4c',
    purple: '#8b6cf7', pink: '#e472b6'
  },
  sepia: {
    textColor: '#3b2e1a', bgColor: '#fbf3e8', accentColor: '#8b6c42',
    bgSecondary: '#f0e6d3', bgCard: '#faf1e2', bgHover: '#e8dcc8',
    textSecondary: '#6b5d4a', textMuted: '#9a8a75', border: '#d6c8b4',
    success: '#5c8f6a', warning: '#c4943a', danger: '#b3513a',
    purple: '#7f6a9e', pink: '#b06a8e'
  },
  forest: {
    textColor: '#dce8d8', bgColor: '#0f1a12', accentColor: '#6abf69',
    bgSecondary: '#1a2a1f', bgCard: '#223528', bgHover: '#2a4030',
    textSecondary: '#9aaf96', textMuted: '#5f785c', border: '#2e4a35',
    success: '#4ecdc4', warning: '#f4d03f', danger: '#e67e5a',
    purple: '#9b8ec4', pink: '#d4849a'
  },
  ocean: {
    textColor: '#d6e6f5', bgColor: '#0a1628', accentColor: '#4fc3f7',
    bgSecondary: '#14223a', bgCard: '#1a2d48', bgHover: '#223a58',
    textSecondary: '#8aa9cc', textMuted: '#5a7a9a', border: '#26466a',
    success: '#66bb6a', warning: '#ffb74d', danger: '#ef5350',
    purple: '#9575cd', pink: '#f06292'
  }
};

function loadPrefs() {
  var saved = localStorage.getItem('tp_prefs');
  if (saved) {
    try { return Object.assign({}, PREFS_DEFAULTS, JSON.parse(saved)); }
    catch(e) { /* ignore */ }
  }
  return Object.assign({}, PREFS_DEFAULTS);
}

function savePrefs() {
  var toStore = {};
  for (var k in PREFS_DEFAULTS) toStore[k] = state.prefs[k];
  localStorage.setItem('tp_prefs', JSON.stringify(toStore));
}

function applyPrefs() {
  var p = state.prefs;
  var root = document.documentElement;

  // Theme class
  root.className = 'theme-' + p.theme;

  if (p.theme === 'custom') {
    root.className = '';
    var preset = THEME_PRESETS.dark;
    for (var key in preset) {
      var cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(cssVar, preset[key]);
    }
    root.style.setProperty('--bg-primary', p.bgColor);
    root.style.setProperty('--text-primary', p.textColor);
    root.style.setProperty('--accent', p.accentColor);
    root.style.setProperty('--accent-hover', adjustColor(p.accentColor, -20));
  } else {
    // Let the theme class handle everything
    for (var key in THEME_PRESETS.dark) {
      var cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.removeProperty(cssVar);
    }
    root.style.removeProperty('--bg-primary');
    root.style.removeProperty('--text-primary');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-hover');
  }

  // Fonts
  root.style.setProperty('--body-font', p.bodyFont);
  root.style.setProperty('--heading-font', p.headingFont);

  // Size & spacing
  root.style.fontSize = p.fontSize + 'px';
  document.body.style.lineHeight = String(p.lineHeight);

  var content = document.querySelector('.content-panel');
  if (content) content.style.maxWidth = p.contentWidth + 'px';
}

function adjustColor(hex, amount) {
  var c = parseInt(hex.slice(1), 16);
  var r = Math.max(0, Math.min(255, ((c >> 16) & 255) + amount));
  var g = Math.max(0, Math.min(255, ((c >> 8) & 255) + amount));
  var b = Math.max(0, Math.min(255, (c & 255) + amount));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const state = {
  categories: [],
  currentCategory: null,
  currentTopic: null,
  topicData: null,
  completed: JSON.parse(localStorage.getItem('tp_completed') || '{}'),
  searchQuery: '',
  prefs: loadPrefs()
};

/* =================== HELPERS =================== */
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function saveCompleted() {
  localStorage.setItem('tp_completed', JSON.stringify(state.completed));
}

function isCompleted(catId, topicId) {
  return !!(state.completed[catId] && state.completed[catId][topicId]);
}

function toggleCompleted(catId, topicId) {
  if (!state.completed[catId]) state.completed[catId] = {};
  if (state.completed[catId][topicId]) {
    state.completed[catId][topicId] = false;
  } else {
    state.completed[catId][topicId] = true;
  }
  saveCompleted();
  renderSidebar();
  updateProgressRing();
}

function getCategoryProgress(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat || !cat._topics) return { done: 0, total: 0 };
  const total = cat._topics.length;
  const done = cat._topics.filter(t => isCompleted(catId, t.id)).length;
  return { done, total };
}

function getOverallProgress() {
  let total = 0, done = 0;
  for (const cat of state.categories) {
    if (cat._topics) {
      total += cat._topics.length;
      done += cat._topics.filter(t => isCompleted(cat.id, t.id)).length;
    }
  }
  return { done, total };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightCode(code) {
  var placeholders = [];
  var uid = 0;

  function save(replacement) {
    return function(match) {
      var key = '\x00HL' + (uid++) + '\x00';
      placeholders.push({ key: key, value: replacement(match) });
      return key;
    };
  }

  // 1) Escape HTML first
  code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // 2) Extract strings & comments into placeholders (preserve escape sequences)
  code = code.replace(/\/\/.*$/gm, save(function(m) { return '<span class="hl-comment">' + m + '</span>'; }));
  code = code.replace(/\/\*[\s\S]*?\*\//g, save(function(m) { return '<span class="hl-comment">' + m + '</span>'; }));
  code = code.replace(/`[^`]*`/g, save(function(m) { return '<span class="hl-string">' + m + '</span>'; }));
  code = code.replace(/"[^"]*"/g, save(function(m) { return '<span class="hl-string">' + m + '</span>'; }));
  code = code.replace(/'[^']*'/g, save(function(m) { return '<span class="hl-string">' + m + '</span>'; }));

  // 3) Apply keywords & numbers on code (safe — no strings/comments remain)
  code = code.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|this|async|await|import|export|default|from|try|catch|throw|typeof|instanceof|in|of|yield|switch|case|break|continue|do|void|delete)\b/g, '<span class="hl-keyword">$1</span>');
  code = code.replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="hl-builtin">$1</span>');
  code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');

  // 4) Restore placeholders
  for (var i = 0; i < placeholders.length; i++) {
    code = code.split(placeholders[i].key).join(placeholders[i].value);
  }

  return code;
}

/* =================== EMBEDDED DATA (works with file://) =================== */
var EMBEDDED = {
  categories: [
    { id: "javascript",  name: "JavaScript",       icon: "\u26A1", color: "#f7df1e", description: "Core JavaScript concepts, ES6+, and advanced patterns" },
    { id: "react",       name: "React.js",          icon: "\u269B\uFE0F", color: "#61dafb", description: "React fundamentals, hooks, state management, and ecosystem" },
    { id: "nodejs",      name: "Node.js & Express",  icon: "\uD83D\uDFE2", color: "#339933", description: "Server-side JS, Express APIs, middleware, and backend patterns" },
    { id: "mern",        name: "MERN Stack",         icon: "\uD83E\uDDE9", color: "#4caf50", description: "Full-stack development with MongoDB, Express, React, Node.js" },
    { id: "nextjs",      name: "Next.js",            icon: "\u25B2", color: "#000000", description: "SSR, SSG, App Router, server components, and Next.js patterns" },
    { id: "express",     name: "Express.js",          icon: "\uD83D\uDEE0\uFE0F", color: "#68a063", description: "Express.js architecture, middleware, routing, and API development" },
    { id: "mongodb",     name: "MongoDB",            icon: "\uD83C\uDF43", color: "#47A248", description: "NoSQL databases, aggregation, indexing, and data modeling" },
    { id: "sql",         name: "SQL",                icon: "\uD83D\uDCC4\uFE0F", color: "#336791", description: "Relational databases, queries, normalization, and optimization" },
    { id: "auth",        name: "Authentication & Security", icon: "\uD83D\uDD12", color: "#ff4444", description: "JWT, OAuth, sessions, encryption, and web security" },
    { id: "system-design", name: "System Design",    icon: "\uD83C\uDFD7\uFE0F", color: "#6c5ce7", description: "Architecture patterns, scalability, microservices, and design" },
    { id: "devops",      name: "DevOps & Cloud",     icon: "\u2601\uFE0F", color: "#0078D4", description: "Docker, AWS, CI/CD pipelines, deployment, and monitoring" },
    { id: "git",         name: "Git & CI/CD",        icon: "\uD83D\uDD00", color: "#f05032", description: "Version control, branching strategies, and automation" },
    { id: "dsa",         name: "DSA",                icon: "\uD83D\uDCCA", color: "#ff6b35", description: "Data structures, algorithms, problem-solving patterns" },
    { id: "oop",         name: "OOP & CS Fundamentals", icon: "\uD83D\uDCBB", color: "#9b59b6", description: "OOP principles, design patterns, and CS core concepts" }
  ],
  topics: {
    javascript: [
      { id: "execution-context",  title: "Execution Context",         difficulty: "beginner",    estimatedMinutes: 20, file: "execution-context.json" },
      { id: "call-stack",         title: "Call Stack",                difficulty: "beginner",    estimatedMinutes: 15, file: "call-stack.json" },
      { id: "memory-heap",        title: "Memory Heap",               difficulty: "beginner",    estimatedMinutes: 15, file: "memory-heap.json" },
      { id: "event-loop",         title: "Event Loop",                difficulty: "advanced",    estimatedMinutes: 35, file: "event-loop.json" },
      { id: "micro-task-queue",   title: "Micro Task Queue",          difficulty: "intermediate",estimatedMinutes: 20, file: "micro-task-queue.json" },
      { id: "macro-task-queue",   title: "Macro Task Queue",          difficulty: "intermediate",estimatedMinutes: 20, file: "macro-task-queue.json" },
      { id: "hoisting",           title: "Hoisting & Scope",          difficulty: "beginner",    estimatedMinutes: 20, file: "hoisting.json" },
      { id: "temporal-dead-zone", title: "Temporal Dead Zone",        difficulty: "intermediate",estimatedMinutes: 15, file: "temporal-dead-zone.json" },
      { id: "scope",              title: "Scope",                     difficulty: "beginner",    estimatedMinutes: 15, file: "scope.json" },
      { id: "lexical-scope",      title: "Lexical Scope",             difficulty: "intermediate",estimatedMinutes: 15, file: "lexical-scope.json" },
      { id: "closures",           title: "Closures",                  difficulty: "intermediate",estimatedMinutes: 25, file: "closures.json" },
      { id: "prototype",          title: "Prototype",                 difficulty: "advanced",    estimatedMinutes: 25, file: "prototype.json" },
      { id: "prototype-chain",    title: "Prototype Chain",           difficulty: "advanced",    estimatedMinutes: 25, file: "prototype-chain.json" },
      { id: "this-keyword",       title: "'this' Keyword",            difficulty: "intermediate",estimatedMinutes: 25, file: "this-keyword.json" },
      { id: "bind",               title: "bind()",                    difficulty: "intermediate",estimatedMinutes: 20, file: "bind.json" },
      { id: "call",               title: "call()",                    difficulty: "intermediate",estimatedMinutes: 15, file: "call.json" },
      { id: "apply",              title: "apply()",                   difficulty: "intermediate",estimatedMinutes: 15, file: "apply.json" },
      { id: "currying",           title: "Currying",                  difficulty: "advanced",    estimatedMinutes: 25, file: "currying.json" },
      { id: "debouncing",         title: "Debouncing & Throttling",   difficulty: "intermediate",estimatedMinutes: 20, file: "debouncing.json" },
      { id: "event-delegation",   title: "Event Delegation",          difficulty: "intermediate",estimatedMinutes: 20, file: "event-delegation.json" },
      { id: "promise-chaining",   title: "Promise Chaining",          difficulty: "intermediate",estimatedMinutes: 20, file: "promise-chaining.json" },
      { id: "promise-combinators",title: "Promise Combinators",       difficulty: "intermediate",estimatedMinutes: 25, file: "promise-combinators.json" },
      { id: "async-await",        title: "Async/Await",               difficulty: "intermediate",estimatedMinutes: 25, file: "async-await.json" },
      { id: "fetch-api",          title: "Fetch API",                 difficulty: "intermediate",estimatedMinutes: 20, file: "fetch-api.json" },
      { id: "abort-controller",   title: "AbortController",           difficulty: "intermediate",estimatedMinutes: 15, file: "abort-controller.json" },
      { id: "error-handling",     title: "Error Handling",            difficulty: "beginner",    estimatedMinutes: 20, file: "error-handling.json" },
      { id: "web-storage",        title: "Web Storage",               difficulty: "beginner",    estimatedMinutes: 20, file: "web-storage.json" },
      { id: "cookies",            title: "Cookies",                   difficulty: "beginner",    estimatedMinutes: 15, file: "cookies.json" },
      { id: "json",               title: "JSON",                      difficulty: "beginner",    estimatedMinutes: 20, file: "json.json" },
      { id: "shallow-deep-copy",  title: "Shallow & Deep Copy",       difficulty: "intermediate",estimatedMinutes: 20, file: "shallow-deep-copy.json" },
      { id: "spread-operator",    title: "Spread Operator",            difficulty: "beginner",    estimatedMinutes: 20, file: "spread-operator.json" },
      { id: "rest-operator",      title: "Rest Operator",              difficulty: "beginner",    estimatedMinutes: 20, file: "rest-operator.json" },
      { id: "destructuring",      title: "Destructuring",              difficulty: "beginner",    estimatedMinutes: 20, file: "destructuring.json" },
      { id: "modules",            title: "Modules (import/export)",    difficulty: "intermediate",estimatedMinutes: 25, file: "modules.json" },
      { id: "var-let-const",      title: "var, let & const",           difficulty: "beginner",    estimatedMinutes: 15, file: "var-let-const.json" },
      { id: "arrow-functions",    title: "Arrow Functions",            difficulty: "beginner",    estimatedMinutes: 20, file: "arrow-functions.json" },
      { id: "higher-order-functions", title: "Higher Order Functions", difficulty: "intermediate",estimatedMinutes: 20, file: "higher-order-functions.json" },
      { id: "map",                title: "Array.map()",                difficulty: "beginner",    estimatedMinutes: 15, file: "map.json" },
      { id: "filter",             title: "Array.filter()",             difficulty: "beginner",    estimatedMinutes: 15, file: "filter.json" },
      { id: "reduce",             title: "Array.reduce()",             difficulty: "intermediate",estimatedMinutes: 20, file: "reduce.json" },
      { id: "foreach",            title: "Array.forEach()",            difficulty: "beginner",    estimatedMinutes: 15, file: "foreach.json" },
      { id: "find",               title: "Array.find()",               difficulty: "beginner",    estimatedMinutes: 15, file: "find.json" },
      { id: "some",               title: "Array.some()",               difficulty: "beginner",    estimatedMinutes: 15, file: "some.json" },
      { id: "every",              title: "Array.every()",              difficulty: "beginner",    estimatedMinutes: 15, file: "every.json" },
      { id: "generator-functions", title: "Generator Functions",       difficulty: "advanced",    estimatedMinutes: 30, file: "generator-functions.json" },
      { id: "iterators",          title: "Iterators & Iterables",      difficulty: "intermediate",estimatedMinutes: 25, file: "iterators.json" },
      { id: "weakmap",            title: "WeakMap",                    difficulty: "advanced",    estimatedMinutes: 25, file: "weakmap.json" },
      { id: "weakset",            title: "WeakSet",                    difficulty: "advanced",    estimatedMinutes: 20, file: "weakset.json" },
      { id: "symbol",             title: "Symbol",                     difficulty: "advanced",    estimatedMinutes: 25, file: "symbol.json" },
      { id: "garbage-collection", title: "Garbage Collection",         difficulty: "advanced",    estimatedMinutes: 25, file: "garbage-collection.json" },
      { id: "es6-features",       title: "ES6+ Features Overview",    difficulty: "beginner",    estimatedMinutes: 30, file: "es6-features.json" }
    ],
    react: [
      { id: "react-architecture",          title: "React SPA Architecture",           difficulty: "intermediate", estimatedMinutes: 25, file: "react-architecture.json" },
      { id: "react-virtual-dom",           title: "React Virtual DOM",                difficulty: "intermediate", estimatedMinutes: 20, file: "react-virtual-dom.json" },
      { id: "react-fiber",                 title: "React Fiber",                      difficulty: "advanced",     estimatedMinutes: 30, file: "react-fiber.json" },
      { id: "react-reconciliation",        title: "React Reconciliation",             difficulty: "advanced",     estimatedMinutes: 25, file: "react-reconciliation.json" },
      { id: "react-jsx",                   title: "React JSX",                        difficulty: "beginner",     estimatedMinutes: 15, file: "react-jsx.json" },
      { id: "react-functional-components", title: "React Functional Components",       difficulty: "beginner",     estimatedMinutes: 15, file: "react-functional-components.json" },
      { id: "react-component-lifecycle",   title: "React Component Lifecycle",        difficulty: "intermediate", estimatedMinutes: 20, file: "react-component-lifecycle.json" },
      { id: "react-props",                 title: "React Props",                      difficulty: "beginner",     estimatedMinutes: 15, file: "react-props.json" },
      { id: "react-state",                 title: "React State",                      difficulty: "beginner",     estimatedMinutes: 20, file: "react-state.json" },
      { id: "react-controlled-components", title: "React Controlled Components",       difficulty: "intermediate", estimatedMinutes: 15, file: "react-controlled-components.json" },
      { id: "react-uncontrolled-components",title: "React Uncontrolled Components",    difficulty: "intermediate", estimatedMinutes: 15, file: "react-uncontrolled-components.json" },
      { id: "react-lifting-state-up",      title: "React Lifting State Up",           difficulty: "intermediate", estimatedMinutes: 20, file: "react-lifting-state-up.json" },
      { id: "react-prop-drilling",         title: "React Prop Drilling",              difficulty: "intermediate", estimatedMinutes: 15, file: "react-prop-drilling.json" },
      { id: "react-context-api",           title: "React Context API",                difficulty: "intermediate", estimatedMinutes: 25, file: "react-context-api.json" },
      { id: "react-redux",                 title: "React Redux",                      difficulty: "advanced",     estimatedMinutes: 30, file: "react-redux.json" },
      { id: "react-redux-toolkit",         title: "React Redux Toolkit",              difficulty: "advanced",     estimatedMinutes: 30, file: "react-redux-toolkit.json" },
      { id: "react-react-query",           title: "React React Query",                difficulty: "intermediate", estimatedMinutes: 25, file: "react-react-query.json" },
      { id: "react-custom-hooks",          title: "React Custom Hooks",               difficulty: "intermediate", estimatedMinutes: 25, file: "react-custom-hooks.json" },
      { id: "react-usestate",              title: "React useState",                   difficulty: "beginner",     estimatedMinutes: 20, file: "react-usestate.json" },
      { id: "react-useeffect",             title: "React useEffect",                  difficulty: "intermediate", estimatedMinutes: 20, file: "react-useeffect.json" },
      { id: "react-uselayouteffect",       title: "React useLayoutEffect",            difficulty: "intermediate", estimatedMinutes: 20, file: "react-uselayouteffect.json" },
      { id: "react-usememo",               title: "React useMemo",                    difficulty: "intermediate", estimatedMinutes: 25, file: "react-usememo.json" },
      { id: "react-usecallback",           title: "React useCallback",                difficulty: "intermediate", estimatedMinutes: 20, file: "react-usecallback.json" },
      { id: "react-useref",                title: "React useRef",                     difficulty: "beginner",     estimatedMinutes: 20, file: "react-useref.json" },
      { id: "react-usereducer",            title: "React useReducer",                 difficulty: "intermediate", estimatedMinutes: 25, file: "react-usereducer.json" },
      { id: "react-react-memo",            title: "React React.memo",                 difficulty: "intermediate", estimatedMinutes: 20, file: "react-react-memo.json" },
      { id: "react-lazy-loading",          title: "React Lazy Loading",               difficulty: "intermediate", estimatedMinutes: 20, file: "react-lazy-loading.json" },
      { id: "react-code-splitting",        title: "React Code Splitting",             difficulty: "intermediate", estimatedMinutes: 20, file: "react-code-splitting.json" },
      { id: "react-suspense",              title: "React Suspense",                   difficulty: "intermediate", estimatedMinutes: 20, file: "react-suspense.json" },
      { id: "react-error-boundaries",      title: "React Error Boundaries",           difficulty: "intermediate", estimatedMinutes: 25, file: "react-error-boundaries.json" },
      { id: "react-portal",                title: "React Portal",                     difficulty: "intermediate", estimatedMinutes: 20, file: "react-portal.json" },
      { id: "react-forward-ref",           title: "React Forward Ref",                difficulty: "advanced",     estimatedMinutes: 20, file: "react-forward-ref.json" },
      { id: "react-rendering-cycle",       title: "React Rendering Cycle",            difficulty: "advanced",     estimatedMinutes: 25, file: "react-rendering-cycle.json" },
      { id: "react-hydration",             title: "React Hydration",                  difficulty: "advanced",     estimatedMinutes: 25, file: "react-hydration.json" },
      { id: "react-performance-optimization",title: "React Performance Optimization",  difficulty: "advanced",     estimatedMinutes: 30, file: "react-performance-optimization.json" },
      { id: "react-form-handling",         title: "React Form Handling",              difficulty: "intermediate", estimatedMinutes: 25, file: "react-form-handling.json" },
      { id: "react-react-router",          title: "React React Router",               difficulty: "intermediate", estimatedMinutes: 30, file: "react-react-router.json" },
      { id: "react-protected-routes",      title: "React Protected Routes",           difficulty: "intermediate", estimatedMinutes: 20, file: "react-protected-routes.json" },
      { id: "react-state-management-patterns",title: "React State Management Patterns",difficulty: "advanced",     estimatedMinutes: 30, file: "react-state-management-patterns.json" }
    ],
    nodejs: [
      { id: "node-node-runtime",                title: "Node.js Runtime",                difficulty: "intermediate", estimatedMinutes: 25, file: "node-node-runtime.json" },
      { id: "node-event-driven-architecture",   title: "Event Driven Architecture",      difficulty: "intermediate", estimatedMinutes: 25, file: "node-event-driven-architecture.json" },
      { id: "node-event-loop",                  title: "Event Loop",                     difficulty: "advanced",     estimatedMinutes: 30, file: "node-event-loop.json" },
      { id: "node-streams",                     title: "Streams",                        difficulty: "advanced",     estimatedMinutes: 30, file: "node-streams.json" },
      { id: "node-buffers",                     title: "Buffers",                        difficulty: "intermediate", estimatedMinutes: 20, file: "node-buffers.json" },
      { id: "node-fs-module",                   title: "File System Module",             difficulty: "intermediate", estimatedMinutes: 25, file: "node-fs-module.json" },
      { id: "node-path-module",                 title: "Path Module",                    difficulty: "beginner",     estimatedMinutes: 15, file: "node-path-module.json" },
      { id: "node-os-module",                   title: "OS Module",                      difficulty: "beginner",     estimatedMinutes: 15, file: "node-os-module.json" },
      { id: "node-cluster-module",              title: "Cluster Module",                 difficulty: "advanced",     estimatedMinutes: 30, file: "node-cluster-module.json" },
      { id: "node-child-processes",             title: "Child Processes",                difficulty: "advanced",     estimatedMinutes: 25, file: "node-child-processes.json" },
      { id: "node-worker-threads",              title: "Worker Threads",                 difficulty: "advanced",     estimatedMinutes: 30, file: "node-worker-threads.json" },
      { id: "node-process-object",              title: "Process Object",                 difficulty: "intermediate", estimatedMinutes: 20, file: "node-process-object.json" },
      { id: "node-env-variables",               title: "Environment Variables",          difficulty: "beginner",     estimatedMinutes: 15, file: "node-env-variables.json" },
      { id: "node-commonjs",                    title: "CommonJS Modules",               difficulty: "intermediate", estimatedMinutes: 20, file: "node-commonjs.json" },
      { id: "node-es-modules",                  title: "ES Modules",                     difficulty: "advanced",     estimatedMinutes: 25, file: "node-es-modules.json" },
      { id: "node-npm",                         title: "npm (Node Package Manager)",      difficulty: "beginner",     estimatedMinutes: 20, file: "node-npm.json" },
      { id: "node-package-management",          title: "Package Management Ecosystem",   difficulty: "intermediate", estimatedMinutes: 20, file: "node-package-management.json" }
    ],
    nextjs: [
      { id: "nextjs-app-router",           title: "App Router",                    difficulty: "intermediate", estimatedMinutes: 30, file: "nextjs-app-router.json" },
      { id: "nextjs-pages-router",         title: "Pages Router",                  difficulty: "beginner",     estimatedMinutes: 25, file: "nextjs-pages-router.json" },
      { id: "nextjs-ssr",                  title: "Server-Side Rendering",         difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-ssr.json" },
      { id: "nextjs-csr",                  title: "Client-Side Rendering",         difficulty: "beginner",     estimatedMinutes: 20, file: "nextjs-csr.json" },
      { id: "nextjs-ssg",                  title: "Static Site Generation",        difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-ssg.json" },
      { id: "nextjs-isr",                  title: "Incremental Static Regeneration",difficulty: "advanced",     estimatedMinutes: 30, file: "nextjs-isr.json" },
      { id: "nextjs-metadata-api",         title: "Metadata API",                  difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-metadata-api.json" },
      { id: "nextjs-route-handlers",       title: "Route Handlers",                difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-route-handlers.json" },
      { id: "nextjs-server-components",    title: "Server Components",             difficulty: "advanced",     estimatedMinutes: 30, file: "nextjs-server-components.json" },
      { id: "nextjs-client-components",    title: "Client Components",             difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-client-components.json" },
      { id: "nextjs-dynamic-routes",       title: "Dynamic Routes",                difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-dynamic-routes.json" },
      { id: "nextjs-middleware",           title: "Middleware",                    difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-middleware.json" },
      { id: "nextjs-server-actions",       title: "Server Actions",                difficulty: "advanced",     estimatedMinutes: 30, file: "nextjs-server-actions.json" },
      { id: "nextjs-image-optimization",   title: "Image Optimization",            difficulty: "intermediate", estimatedMinutes: 25, file: "nextjs-image-optimization.json" },
      { id: "nextjs-caching",              title: "Caching",                       difficulty: "advanced",     estimatedMinutes: 30, file: "nextjs-caching.json" },
      { id: "nextjs-streaming",            title: "Streaming",                     difficulty: "advanced",     estimatedMinutes: 30, file: "nextjs-streaming.json" },
      { id: "nextjs-authentication",       title: "Authentication in Next.js",     difficulty: "advanced",     estimatedMinutes: 35, file: "nextjs-authentication.json" },
      { id: "nextjs-deployment-vercel",    title: "Deployment on Vercel",          difficulty: "beginner",     estimatedMinutes: 25, file: "nextjs-deployment-vercel.json" }
    ],
    express: [
      { id: "express-architecture",            title: "Express Architecture",           difficulty: "intermediate", estimatedMinutes: 25, file: "express-architecture.json" },
      { id: "express-routing",                 title: "Routing",                       difficulty: "beginner",     estimatedMinutes: 20, file: "express-routing.json" },
      { id: "express-middleware",              title: "Middleware",                    difficulty: "intermediate", estimatedMinutes: 25, file: "express-middleware.json" },
      { id: "express-custom-middleware",       title: "Custom Middleware",             difficulty: "intermediate", estimatedMinutes: 20, file: "express-custom-middleware.json" },
      { id: "express-error-handling",          title: "Error Handling Middleware",     difficulty: "intermediate", estimatedMinutes: 25, file: "express-error-handling.json" },
      { id: "express-authentication-middleware",title: "Authentication Middleware",      difficulty: "intermediate", estimatedMinutes: 30, file: "express-authentication-middleware.json" },
      { id: "express-rest-api",               title: "REST API Development",          difficulty: "intermediate", estimatedMinutes: 30, file: "express-rest-api.json" },
      { id: "express-request-lifecycle",       title: "Request Lifecycle",            difficulty: "intermediate", estimatedMinutes: 25, file: "express-request-lifecycle.json" },
      { id: "express-validation",             title: "Validation",                    difficulty: "intermediate", estimatedMinutes: 25, file: "express-validation.json" },
      { id: "express-rate-limiting",           title: "Rate Limiting",                 difficulty: "intermediate", estimatedMinutes: 20, file: "express-rate-limiting.json" },
      { id: "express-helmet",                 title: "Helmet",                        difficulty: "intermediate", estimatedMinutes: 20, file: "express-helmet.json" },
      { id: "express-cors",                   title: "CORS",                           difficulty: "beginner",     estimatedMinutes: 20, file: "express-cors.json" },
      { id: "express-cookie-parser",          title: "Cookie Parser",                 difficulty: "beginner",     estimatedMinutes: 15, file: "express-cookie-parser.json" },
      { id: "express-morgan",                 title: "Morgan",                        difficulty: "beginner",     estimatedMinutes: 15, file: "express-morgan.json" },
      { id: "express-api-versioning",          title: "API Versioning",                difficulty: "intermediate", estimatedMinutes: 20, file: "express-api-versioning.json" }
    ]
  }
};

// Pre-populate completed topics
(function preloadCompleted() {
  var preset = {
    "javascript": {
      "execution-context": true, "call-stack": true, "memory-heap": true,
      "event-loop": true, "micro-task-queue": true, "macro-task-queue": true,
      "hoisting": true, "scope": true, "lexical-scope": true,
      "closures": true, "prototype": true, "prototype-chain": true,
      "this-keyword": true
    }
  };
  var existing = JSON.parse(localStorage.getItem('tp_completed') || '{}');
  var changed = false;
  for (var cat in preset) {
    if (!existing[cat]) { existing[cat] = {}; changed = true; }
    for (var topic in preset[cat]) {
      if (existing[cat][topic] === undefined) { existing[cat][topic] = true; changed = true; }
    }
  }
  if (changed) localStorage.setItem('tp_completed', JSON.stringify(existing));
  state.completed = existing;
})();

/* =================== DATA LOADING =================== */
function loadJSON(path) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.overrideMimeType('application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200 || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Failed to load ' + path + ' (status: ' + xhr.status + ')'));
        }
      }
    };
    xhr.onerror = function() { reject(new Error('Network error loading ' + path)); };
    try { xhr.send(null); } catch(e) { reject(e); }
  });
}

/* =================== PREFERENCES =================== */
function renderPreferencesPanel() {
  var p = state.prefs;
  var body = $('#prefs-body');
  if (!body) return;

  var themeOpts = ['dark', 'light', 'sepia', 'forest', 'ocean', 'custom'].map(function(t) {
    var active = p.theme === t ? ' active' : '';
    var label = t.charAt(0).toUpperCase() + t.slice(1);
    return '<button class="theme-option' + active + '" data-theme="' + t + '">' + label + '</button>';
  }).join('');

  body.innerHTML =
    '<div class="prefs-section">' +
      '<span class="prefs-label">Theme</span>' +
      '<div class="prefs-row">' + themeOpts + '</div>' +
    '</div>' +
    '<div class="prefs-section" id="prefs-custom-colors"' + (p.theme !== 'custom' ? ' style="display:none"' : '') + '>' +
      '<span class="prefs-label">Custom Colors</span>' +
      '<div class="prefs-field"><label>Background</label><input type="color" id="prefs-bg" value="' + p.bgColor + '" /></div>' +
      '<div class="prefs-field"><label>Text</label><input type="color" id="prefs-text" value="' + p.textColor + '" /></div>' +
      '<div class="prefs-field"><label>Accent</label><input type="color" id="prefs-accent" value="' + p.accentColor + '" /></div>' +
    '</div>' +
    '<div class="prefs-section">' +
      '<span class="prefs-label">Typography</span>' +
      '<div class="prefs-field"><label>Body Font</label><select id="prefs-body-font">' +
        '<option value="-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif"' + (p.bodyFont.includes('Segoe UI') ? ' selected' : '') + '>System Default</option>' +
        '<option value="\'Georgia\', serif"' + (p.bodyFont.includes('Georgia') ? ' selected' : '') + '>Georgia (Serif)</option>' +
        '<option value="\'Merriweather\', \'Georgia\', serif"' + (p.bodyFont.includes('Merriweather') ? ' selected' : '') + '>Merriweather</option>' +
        '<option value="\'Inter\', sans-serif"' + (p.bodyFont.includes('Inter') ? ' selected' : '') + '>Inter (Sans)</option>' +
        '<option value="\'Atkinson Hyperlegible\', sans-serif"' + (p.bodyFont.includes('Atkinson') ? ' selected' : '') + '>Atkinson Hyperlegible</option>' +
        '<option value="\'JetBrains Mono\', monospace"' + (p.bodyFont.includes('JetBrains') ? ' selected' : '') + '>JetBrains Mono</option>' +
        '<option value="\'OpenDyslexic\', sans-serif"' + (p.bodyFont.includes('OpenDyslexic') ? ' selected' : '') + '>OpenDyslexic</option>' +
      '</select></div>' +
      '<div class="prefs-field"><label>Heading Font</label><select id="prefs-heading-font">' +
        '<option value="-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif"' + (p.headingFont.includes('Segoe UI') ? ' selected' : '') + '>System Default</option>' +
        '<option value="\'Georgia\', serif"' + (p.headingFont.includes('Georgia') ? ' selected' : '') + '>Georgia (Serif)</option>' +
        '<option value="\'Merriweather\', \'Georgia\', serif"' + (p.headingFont.includes('Merriweather') ? ' selected' : '') + '>Merriweather</option>' +
        '<option value="\'Playfair Display\', serif"' + (p.headingFont.includes('Playfair') ? ' selected' : '') + '>Playfair Display</option>' +
        '<option value="\'Inter\', sans-serif"' + (p.headingFont.includes('Inter') ? ' selected' : '') + '>Inter (Sans)</option>' +
        '<option value="\'Poppins\', sans-serif"' + (p.headingFont.includes('Poppins') ? ' selected' : '') + '>Poppins</option>' +
      '</select></div>' +
      '<div class="prefs-field"><label>Font Size</label><input type="range" id="prefs-font-size" min="12" max="22" step="0.5" value="' + p.fontSize + '" /><span class="range-value" id="prefs-font-size-val">' + p.fontSize + 'px</span></div>' +
      '<div class="prefs-field"><label>Line Height</label><input type="range" id="prefs-line-height" min="1.2" max="2.2" step="0.05" value="' + p.lineHeight + '" /><span class="range-value" id="prefs-line-height-val">' + p.lineHeight + '</span></div>' +
    '</div>' +
    '<div class="prefs-section">' +
      '<span class="prefs-label">Layout</span>' +
      '<div class="prefs-field"><label>Content Width</label><input type="range" id="prefs-content-width" min="600" max="1200" step="20" value="' + p.contentWidth + '" /><span class="range-value" id="prefs-content-width-val">' + p.contentWidth + 'px</span></div>' +
    '</div>' +
    '<button class="prefs-reset" id="prefs-reset">Reset to Defaults</button>';

  // Attach events
  body.querySelectorAll('.theme-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      state.prefs.theme = this.dataset.theme;
      savePrefs();
      applyPrefs();
      renderPreferencesPanel();
    });
  });

  var customSection = $('#prefs-custom-colors');
  if (customSection) {
    var bgInput = $('#prefs-bg');
    var textInput = $('#prefs-text');
    var accentInput = $('#prefs-accent');
    if (bgInput) bgInput.addEventListener('input', function() { state.prefs.bgColor = this.value; savePrefs(); applyPrefs(); });
    if (textInput) textInput.addEventListener('input', function() { state.prefs.textColor = this.value; savePrefs(); applyPrefs(); });
    if (accentInput) accentInput.addEventListener('input', function() { state.prefs.accentColor = this.value; savePrefs(); applyPrefs(); });
  }

  var bodyFont = $('#prefs-body-font');
  if (bodyFont) bodyFont.addEventListener('change', function() { state.prefs.bodyFont = this.value; savePrefs(); applyPrefs(); });

  var headingFont = $('#prefs-heading-font');
  if (headingFont) headingFont.addEventListener('change', function() { state.prefs.headingFont = this.value; savePrefs(); applyPrefs(); });

  ['font-size', 'line-height', 'content-width'].forEach(function(id) {
    var input = $('#prefs-' + id);
    var val = $('#prefs-' + id + '-val');
    if (input && val) {
      input.addEventListener('input', function() {
        var v = this.value;
        var key = id === 'content-width' ? 'contentWidth' : id.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
        state.prefs[key] = id === 'line-height' ? parseFloat(v) : Number(v);
        val.textContent = id === 'line-height' ? v : v + (id === 'font-size' ? 'px' : 'px');
        savePrefs();
        applyPrefs();
      });
    }
  });

  var resetBtn = $('#prefs-reset');
  if (resetBtn) resetBtn.addEventListener('click', function() {
    for (var k in PREFS_DEFAULTS) state.prefs[k] = PREFS_DEFAULTS[k];
    savePrefs();
    applyPrefs();
    renderPreferencesPanel();
  });
}

function init() {
  // Apply saved preferences
  applyPrefs();

  // Use embedded data for categories and topic lists (always works)
  state.categories = EMBEDDED.categories.map(function(c) {
    return { id: c.id, name: c.name, icon: c.icon, color: c.color, description: c.description, _topics: null };
  });

  // Search listener
  var searchEl = $('#topic-search');
  if (searchEl) {
    searchEl.addEventListener('input', function() {
      state.searchQuery = this.value;
      renderSidebar();
    });
  }

  // Settings button
  var settingsBtn = $('#settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function() {
      renderPreferencesPanel();
      $('#prefs-overlay').classList.add('open');
    });
  }

  // Preferences close
  var closeBtn = $('#prefs-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      $('#prefs-overlay').classList.remove('open');
    });
  }

  // Click overlay to close
  var overlay = $('#prefs-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }

  renderSidebar();
  updateProgressRing();
  updateStats();

  // Load topic lists from embedded data
  for (var i = 0; i < state.categories.length; i++) {
    var cat = state.categories[i];
    cat._topics = (EMBEDDED.topics[cat.id] || []).map(function(t) { return { id: t.id, title: t.title, difficulty: t.difficulty, estimatedMinutes: t.estimatedMinutes, file: t.file }; });
  }
  renderSidebar();
  updateStats();
  updateProgressRing();

  // Open first category and auto-select first topic
  if (state.categories.length > 0) {
    var firstCat = state.categories[0];
    var catEl = document.querySelector('[data-cat-id="' + firstCat.id + '"]');
    if (catEl) {
      catEl.classList.add('open');
      var topicsEl = catEl.nextElementSibling;
      if (topicsEl) topicsEl.classList.add('open');
    }
    if (firstCat._topics && firstCat._topics.length > 0) {
      loadTopic(firstCat.id, firstCat._topics[0].id);
    }
  }
}

function loadCategoryTopics(catId) {
  // Already loaded from embedded data
  var cat = state.categories.find(function(c) { return c.id === catId; });
  if (!cat) return;
  var catEl = document.querySelector('[data-cat-id="' + cat.id + '"]');
  if (catEl) {
    catEl.classList.add('open');
    var topicsEl = catEl.nextElementSibling;
    if (topicsEl) topicsEl.classList.add('open');
  }
}

function loadTopic(catId, topicId) {
  var cat = state.categories.find(function(c) { return c.id === catId; });
  if (!cat || !cat._topics) return;
  var topicMeta = cat._topics.find(function(t) { return t.id === topicId; });
  if (!topicMeta) return;

  state.currentCategory = catId;
  state.currentTopic = topicId;

  // First try embedded data (works reliably with file://)
  var embeddedData = null;
  if (typeof TOPICS_DATA !== 'undefined' && TOPICS_DATA[catId] && TOPICS_DATA[catId][topicId]) {
    embeddedData = TOPICS_DATA[catId][topicId];
  }

  if (embeddedData) {
    state.topicData = embeddedData;
    renderTopic();
    updateActiveTopicInSidebar();
  } else {
    // Fallback: load via XHR (works when served via HTTP)
    loadJSON('data/' + catId + '/' + topicMeta.file).then(function(data) {
      state.topicData = data;
      renderTopic();
      updateActiveTopicInSidebar();
    }).catch(function() {
      // Final fallback: show placeholder
      state.topicData = createPlaceholderTopic(topicMeta);
      renderTopic();
      updateActiveTopicInSidebar();
    });
  }
}

function createPlaceholderTopic(meta) {
  var title = meta.title;
  return {
    title: title,
    difficulty: meta.difficulty || 'intermediate',
    estimatedMinutes: meta.estimatedMinutes || 20,
    tldr: ['Content for <strong>' + title + '</strong> is being prepared.'],
    laymanDefinition: 'Detailed content for this topic is coming soon.',
    deepDive: [{ heading: 'Coming Soon', text: 'This topic is being developed. Check back for a comprehensive deep dive, interview questions, code examples, and assessment.' }],
    interviewAnswer: 'Content in progress.',
    interviewQuestions: [{ question: 'When will this content be available?', answer: 'This topic is being developed as part of the curriculum. Please check back soon.' }],
    diagramSvg: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="10" fill="var(--bg-card)" stroke="var(--border)" stroke-width="1"/><text x="200" y="100" text-anchor="middle" fill="#9aa0b0" font-size="14">Diagram coming soon for ' + title + '</text></svg>',
    codeExamples: [{ title: 'Coming Soon', useCase: 'In Progress', code: '// Code examples for ' + title + ' are being prepared', description: 'Check back for real-world code examples.' }],
    mcqQuestions: [{ question: 'Sample question for ' + title + '?', options: ['Option A', 'Option B', 'Option C', 'Option D'], answer: 0, explanation: 'Content being developed.' }]
  };
}

/* =================== SIDEBAR =================== */
function renderSidebar() {
  const nav = $('#category-nav');
  const q = state.searchQuery.toLowerCase().trim();
  nav.innerHTML = state.categories.map(cat => {
    const progress = getCategoryProgress(cat.id);
    const hasTopics = cat._topics && cat._topics.length > 0;
    const filteredTopics = hasTopics
      ? cat._topics.filter(t => !q || t.title.toLowerCase().includes(q))
      : [];
    const hasVisible = q === '' || filteredTopics.length > 0;
    const topicsHtml = filteredTopics.length > 0
      ? filteredTopics.map(t => {
          const done = isCompleted(cat.id, t.id);
          const active = (state.currentCategory === cat.id && state.currentTopic === t.id);
          return `
            <div class="topic-link${active ? ' active' : ''}" data-cat="${cat.id}" data-topic="${t.id}">
              <span class="check${done ? ' done' : ''}">${done ? '✓' : '○'}</span>
              <span>${escapeHtml(t.title)}</span>
            </div>
          `;
        }).join('')
      : (q ? '<div style="padding:6px 56px;font-size:0.78rem;color:var(--text-muted)">No match</div>'
           : '<div style="padding:6px 56px;font-size:0.78rem;color:var(--text-muted)">No topics yet</div>');

    if (!hasVisible && q !== '') return '';

    return `
      <div class="cat-item">
        <div class="cat-header" data-cat-id="${cat.id}" style="border-left: 3px solid ${cat.color};">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${escapeHtml(cat.name)}</span>
          <span class="cat-progress">${progress.done}/${progress.total}</span>
          <span class="cat-arrow">▶</span>
        </div>
        <div class="cat-topics${state.currentCategory === cat.id || q ? ' open' : ''}">
          ${topicsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Attach events
  $$('.cat-header').forEach(el => {
    el.addEventListener('click', async () => {
      const catId = el.dataset.catId;
      const cat = state.categories.find(c => c.id === catId);
      if (!cat._topics) {
        await loadCategoryTopics(catId);
      }
      const isOpen = el.classList.toggle('open');
      const topicsEl = el.nextElementSibling;
      if (isOpen) {
        topicsEl.classList.add('open');
      } else {
        topicsEl.classList.remove('open');
      }
    });
  });

  $$('.topic-link').forEach(el => {
    el.addEventListener('click', () => {
      const catId = el.dataset.cat;
      const topicId = el.dataset.topic;
      loadTopic(catId, topicId);
    });
  });
}

function updateActiveTopicInSidebar() {
  $$('.topic-link').forEach(el => {
    el.classList.toggle('active',
      el.dataset.cat === state.currentCategory && el.dataset.topic === state.currentTopic
    );
  });
}

function updateProgressRing() {
  const { done, total } = getOverallProgress();
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const fill = $('#progress-ring-fill');
  if (fill) {
    fill.style.strokeDashoffset = 100 - pct;
  }
  const text = $('#progress-percent');
  if (text) text.textContent = `${pct}%`;
}

function updateStats() {
  let totalTopics = 0;
  let totalCompleted = 0;
  for (const cat of state.categories) {
    if (cat._topics) {
      totalTopics += cat._topics.length;
      totalCompleted += cat._topics.filter(t => isCompleted(cat.id, t.id)).length;
    }
  }
  const totalEl = $('#total-topics');
  const completedEl = $('#completed-count');
  const catCountEl = $('#categories-count');
  if (totalEl) totalEl.textContent = totalTopics;
  if (completedEl) completedEl.textContent = totalCompleted;
  if (catCountEl) catCountEl.textContent = state.categories.length;
}

/* =================== RENDER TOPIC =================== */
function renderTopic() {
  const d = state.topicData;
  if (!d) return;

  $('#welcome-screen').style.display = 'none';
  $('#topic-view').style.display = 'block';

  const cat = state.categories.find(c => c.id === state.currentCategory);

  // Header
  $('#topic-breadcrumb').textContent = `${cat ? cat.name : ''} / ${d.title}`;
  $('#topic-title').textContent = d.title;

  const diffEl = $('#topic-difficulty');
  diffEl.textContent = d.difficulty || 'intermediate';
  diffEl.className = `difficulty-badge ${d.difficulty || 'intermediate'}`;

  $('#topic-time').textContent = `⏱ ${d.estimatedMinutes || 20} min`;

  const checkEl = $('#mark-completed');
  checkEl.checked = isCompleted(state.currentCategory, state.currentTopic);
  checkEl.onchange = () => {
    toggleCompleted(state.currentCategory, state.currentTopic);
    const { done, total } = getCategoryProgress(state.currentCategory);
    const sidebarProgress = $(`.cat-header[data-cat-id="${state.currentCategory}"] .cat-progress`);
    if (sidebarProgress) sidebarProgress.textContent = `${done}/${total}`;
    updateStats();
    updateProgressRing();
    // re-render sidebar topic list for check marks
    renderSidebar();
    // re-check checkbox after re-render
    const newCheck = $('#mark-completed');
    if (newCheck) newCheck.checked = isCompleted(state.currentCategory, state.currentTopic);
  };

  // TLDR
  renderTLDR(d);

  // Layman
  $('#layman-content').textContent = d.laymanDefinition || '';

  // Deep Dive
  renderDeepDive(d);

  // Interview Q&A
  renderInterviews(d);

  // Diagram
  renderDiagram(d);

  // Code
  renderCode(d);

  // MCQ
  renderMCQ(d);

  // Activate first tab
  $$('.tab').forEach(t => t.classList.remove('active'));
  $$('.tab-content').forEach(t => t.classList.remove('active'));
  const firstTab = $('.tab');
  const firstContent = $('#sec-tldr');
  if (firstTab) firstTab.classList.add('active');
  if (firstContent) firstContent.classList.add('active');
}

/* =================== TLDR =================== */
function renderTLDR(d) {
  const container = $('#tldr-content');
  if (d.tldr) {
    if (Array.isArray(d.tldr)) {
      container.innerHTML = `<ul>${d.tldr.map(item => `<li>${item}</li>`).join('')}</ul>`;
    } else {
      container.innerHTML = `<p>${d.tldr}</p>`;
    }
  } else {
    container.innerHTML = '<p>No TL;DR available.</p>';
  }
}

/* =================== DEEP DIVE =================== */
function renderDeepDive(d) {
  const container = $('#deepdive-content');
  let html = '';

  if (d.deepDive && Array.isArray(d.deepDive)) {
    for (const section of d.deepDive) {
      if (section.heading) {
        html += `<h3>${section.heading}</h3>`;
      }
      if (section.text) {
        html += section.text.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
      }
      if (section.list && Array.isArray(section.list)) {
        html += '<ul>' + section.list.map(li => `<li>${li}</li>`).join('') + '</ul>';
      }
    }
  } else if (d.deepDive && typeof d.deepDive === 'string') {
    html = d.deepDive.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  }

  // Interview answer
  if (d.interviewAnswer) {
    html += `
      <div class="interview-definition">
        <strong>📌 Interview Ready Definition:</strong><br/><br/>
        ${d.interviewAnswer}
      </div>
    `;
  }

  container.innerHTML = html || '<p>No deep dive content available.</p>';
}

/* =================== INTERVIEW Q&A =================== */
function renderInterviews(d) {
  const container = $('#interview-list');
  if (!d.interviewQuestions || !d.interviewQuestions.length) {
    container.innerHTML = '<div class="section-card"><p>No interview questions available.</p></div>';
    return;
  }

  container.innerHTML = d.interviewQuestions.map((qa, i) => `
    <div class="interview-item" data-index="${i}">
      <div class="interview-q">
        <span><span class="q-number">Q${i + 1}.</span> ${escapeHtml(qa.question)}</span>
        <span class="q-toggle">▼</span>
      </div>
      <div class="interview-a">
        <p>${qa.answer}</p>
      </div>
    </div>
  `).join('');

  // Accordion
  $$('.interview-q').forEach(el => {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('open');
    });
  });
}

/* =================== DIAGRAM =================== */
function renderDiagram(d) {
  const container = $('#diagram-content');
  if (d.diagramSvg) {
    container.innerHTML = d.diagramSvg;
  } else if (d.diagramDescription) {
    container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px 0;">${d.diagramDescription}</p>`;
  } else {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px 0;">Diagram coming soon.</p>';
  }
}

/* =================== CODE EXAMPLES =================== */
function renderCode(d) {
  const container = $('#code-examples');
  if (!d.codeExamples || !d.codeExamples.length) {
    container.innerHTML = '<div class="section-card"><p>No code examples available.</p></div>';
    return;
  }

  container.innerHTML = d.codeExamples.map((ex, i) => `
    <div class="code-example">
      <div class="code-example-header">
        <span class="code-title">${escapeHtml(ex.title || `Example ${i + 1}`)}</span>
        <span class="code-use">${escapeHtml(ex.useCase || '')}</span>
      </div>
      <pre><code>${highlightCode(ex.code)}</code></pre>
      <div class="code-desc">${ex.description || ''}</div>
    </div>
  `).join('');
}

/* =================== MCQ =================== */
function renderMCQ(d) {
  const container = $('#mcq-questions');
  if (!d.mcqQuestions || !d.mcqQuestions.length) {
    container.innerHTML = '<div class="section-card"><p>No assessment questions available.</p></div>';
    $('#mcq-submit').style.display = 'none';
    return;
  }

  container.innerHTML = d.mcqQuestions.map((q, i) => `
    <div class="mcq-question" data-q="${i}">
      <div class="mcq-q-text">
        <span class="mcq-q-num">${i + 1}.</span> ${escapeHtml(q.question)}
      </div>
      <div class="mcq-options">
        ${q.options.map((opt, oi) => `
          <label class="mcq-option" data-opt="${oi}">
            <input type="radio" name="mcq-${i}" value="${oi}" />
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join('')}
      </div>
      <div class="mcq-explanation" id="mcq-explain-${i}"></div>
    </div>
  `).join('');

  $('#mcq-submit').style.display = 'block';
  $('#mcq-result').className = '';
  $('#mcq-result').style.display = 'none';

  // Submit handler
  $('#mcq-submit').onclick = () => evaluateMCQ(d.mcqQuestions);
}

function evaluateMCQ(questions) {
  let correct = 0;
  const total = questions.length;

  // Remove previous feedback
  $$('.mcq-option').forEach(el => {
    el.classList.remove('correct', 'wrong', 'reveal-correct');
  });
  $$('.mcq-explanation').forEach(el => {
    el.classList.remove('show');
  });

  questions.forEach((q, i) => {
    const selected = $(`input[name="mcq-${i}"]:checked`);
    const userAnswer = selected ? parseInt(selected.value) : -1;
    const correctAnswer = q.answer;
    const allOptions = $$(`.mcq-question[data-q="${i}"] .mcq-option`);

    // Highlight correct answer
    allOptions.forEach((opt, oi) => {
      if (oi === correctAnswer) {
        opt.classList.add('correct');
      }
    });

    if (userAnswer === correctAnswer) {
      correct++;
    } else if (userAnswer >= 0) {
      // Wrong answer - highlight it
      allOptions[userAnswer].classList.add('wrong');
    }

    // Show explanation
    if (q.explanation) {
      const expEl = $(`#mcq-explain-${i}`);
      if (expEl) {
        expEl.textContent = q.explanation;
        expEl.classList.add('show');
      }
    }
  });

  const pct = Math.round((correct / total) * 100);
  const resultEl = $('#mcq-result');
  resultEl.style.display = 'block';
  resultEl.className = 'show ' + (pct >= 70 ? 'pass' : 'fail');
  resultEl.innerHTML = `
    <strong>${correct}/${total} correct (${pct}%)</strong><br/>
    ${pct >= 70 ? '✅ Great job! You have a solid understanding of this topic.' : '📖 Review the material above and try again.'}
  `;
}

/* =================== TAB SWITCHING =================== */
$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    $$('.tab-content').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const section = $(`#sec-${tab.dataset.section}`);
    if (section) section.classList.add('active');
  });
});

/* =================== INIT =================== */
document.addEventListener('DOMContentLoaded', init);
