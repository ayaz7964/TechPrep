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
    { id: "devops-fundamentals", name: "DevOps Fundamentals", icon: "\uD83D\uDD04", color: "#00bcd4", description: "DevOps principles, culture, lifecycle, and deployment strategies" },
    { id: "version-control-git", name: "Version Control - Git", icon: "\uD83D\uDCC1", color: "#f05032", description: "Git basics, branching, merging, rebasing, and advanced commands" },
    { id: "github",      name: "GitHub",             icon: "\uD83D\uDC65", color: "#6e40c9", description: "PRs, Actions, Pages, security, projects, and collaboration" },
    { id: "cicd",        name: "CI/CD",              icon: "\u2699\uFE0F", color: "#2396ed", description: "Pipeline automation, testing, deployment, and tooling" },
    { id: "github-actions", name: "GitHub Actions",  icon: "\u2699\uFE0F", color: "#2088ff", description: "Workflows, runners, matrix builds, and CI/CD automation on GitHub" },
    { id: "jenkins",     name: "Jenkins",            icon: "\uD83D\uDD27", color: "#d24939", description: "Pipeline, agents, plugins, and automation server configuration" },
    { id: "docker",      name: "Docker",             icon: "\uD83D\uDC21", color: "#2496ed", description: "Containers, images, Dockerfile, Compose, storage, networking, and containerization" },
    { id: "kubernetes",  name: "Kubernetes",         icon: "\u2699\uFE0F", color: "#326CE5", description: "Cluster orchestration, pods, deployments, services, networking, and scaling" },
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
    ],
    mongodb: [
      { id: "mongodb-documents",                 title: "Documents",                    difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-documents.json" },
      { id: "mongodb-collections",               title: "Collections",                  difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-collections.json" },
      { id: "mongodb-bson",                      title: "BSON",                         difficulty: "intermediate", estimatedMinutes: 20, file: "mongodb-bson.json" },
      { id: "mongodb-crud",                      title: "CRUD Operations",              difficulty: "beginner",     estimatedMinutes: 20, file: "mongodb-crud.json" },
      { id: "mongodb-find",                      title: "find()",                       difficulty: "beginner",     estimatedMinutes: 20, file: "mongodb-find.json" },
      { id: "mongodb-findone",                   title: "findOne()",                    difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-findone.json" },
      { id: "mongodb-insertone",                 title: "insertOne()",                  difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-insertone.json" },
      { id: "mongodb-updateone",                 title: "updateOne()",                  difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-updateone.json" },
      { id: "mongodb-deleteone",                 title: "deleteOne()",                  difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-deleteone.json" },
      { id: "mongodb-aggregation-pipeline",      title: "Aggregation Pipeline",         difficulty: "advanced",     estimatedMinutes: 35, file: "mongodb-aggregation-pipeline.json" },
      { id: "mongodb-aggregation-match",         title: "$match",                       difficulty: "intermediate", estimatedMinutes: 15, file: "mongodb-aggregation-match.json" },
      { id: "mongodb-aggregation-group",         title: "$group",                       difficulty: "intermediate", estimatedMinutes: 20, file: "mongodb-aggregation-group.json" },
      { id: "mongodb-aggregation-project",       title: "$project",                     difficulty: "intermediate", estimatedMinutes: 15, file: "mongodb-aggregation-project.json" },
      { id: "mongodb-aggregation-lookup",        title: "$lookup",                      difficulty: "advanced",     estimatedMinutes: 30, file: "mongodb-aggregation-lookup.json" },
      { id: "mongodb-aggregation-sort",          title: "$sort",                        difficulty: "beginner",     estimatedMinutes: 15, file: "mongodb-aggregation-sort.json" },
      { id: "mongodb-aggregation-skip",          title: "$skip",                        difficulty: "beginner",     estimatedMinutes: 10, file: "mongodb-aggregation-skip.json" },
      { id: "mongodb-aggregation-limit",         title: "$limit",                       difficulty: "beginner",     estimatedMinutes: 10, file: "mongodb-aggregation-limit.json" },
      { id: "mongodb-indexing",                  title: "Indexing",                     difficulty: "intermediate", estimatedMinutes: 30, file: "mongodb-indexing.json" },
      { id: "mongodb-compound-index",            title: "Compound Index",               difficulty: "intermediate", estimatedMinutes: 25, file: "mongodb-compound-index.json" },
      { id: "mongodb-text-index",                title: "Text Index",                   difficulty: "intermediate", estimatedMinutes: 25, file: "mongodb-text-index.json" },
      { id: "mongodb-atlas",                     title: "MongoDB Atlas",                difficulty: "beginner",     estimatedMinutes: 20, file: "mongodb-atlas.json" },
      { id: "mongodb-transactions",              title: "Transactions",                 difficulty: "advanced",     estimatedMinutes: 30, file: "mongodb-transactions.json" },
      { id: "mongodb-schema-design",             title: "Schema Design",                difficulty: "advanced",     estimatedMinutes: 35, file: "mongodb-schema-design.json" },
      { id: "mongodb-embedding-vs-referencing",  title: "Embedding vs Referencing",     difficulty: "intermediate", estimatedMinutes: 25, file: "mongodb-embedding-vs-referencing.json" },
      { id: "mongodb-mongoose",                  title: "Mongoose",                     difficulty: "intermediate", estimatedMinutes: 30, file: "mongodb-mongoose.json" }
    ],
    sql: [
      { id: "sql-database-basics",            title: "Database Basics",                difficulty: "beginner",     estimatedMinutes: 20, file: "sql-database-basics.json" },
      { id: "sql-create-database",            title: "CREATE & DROP Database",         difficulty: "beginner",     estimatedMinutes: 15, file: "sql-create-database.json" },
      { id: "sql-create-alter-drop-table",    title: "CREATE, ALTER & DROP Table",     difficulty: "beginner",     estimatedMinutes: 20, file: "sql-create-alter-drop-table.json" },
      { id: "sql-constraints",                title: "Constraints",                    difficulty: "intermediate", estimatedMinutes: 25, file: "sql-constraints.json" },
      { id: "sql-crud",                       title: "CRUD Operations",                difficulty: "beginner",     estimatedMinutes: 20, file: "sql-crud.json" },
      { id: "sql-select-filtering",          title: "SELECT & Filtering",              difficulty: "beginner",     estimatedMinutes: 25, file: "sql-select-filtering.json" },
      { id: "sql-where-operators",           title: "WHERE Operators",                 difficulty: "beginner",     estimatedMinutes: 20, file: "sql-where-operators.json" },
      { id: "sql-aggregate-functions",       title: "Aggregate Functions",             difficulty: "intermediate", estimatedMinutes: 20, file: "sql-aggregate-functions.json" },
      { id: "sql-group-by",                  title: "GROUP BY & HAVING",               difficulty: "intermediate", estimatedMinutes: 25, file: "sql-group-by.json" },
      { id: "sql-grouping-sets",             title: "GROUPING SETS, ROLLUP & CUBE",    difficulty: "advanced",     estimatedMinutes: 20, file: "sql-grouping-sets.json" },
      { id: "sql-joins",                     title: "Joins (INNER, LEFT, RIGHT, FULL)",difficulty: "intermediate", estimatedMinutes: 30, file: "sql-joins.json" },
      { id: "sql-subqueries",                title: "Subqueries & EXISTS",             difficulty: "intermediate", estimatedMinutes: 25, file: "sql-subqueries.json" },
      { id: "sql-ctes",                      title: "CTEs (Common Table Expressions)", difficulty: "intermediate", estimatedMinutes: 25, file: "sql-ctes.json" },
      { id: "sql-recursive-ctes",            title: "Recursive CTEs",                  difficulty: "advanced",     estimatedMinutes: 30, file: "sql-recursive-ctes.json" },
      { id: "sql-window-functions",           title: "Window Functions",               difficulty: "advanced",     estimatedMinutes: 35, file: "sql-window-functions.json" },
      { id: "sql-set-operations",            title: "Set Operations",                  difficulty: "intermediate", estimatedMinutes: 20, file: "sql-set-operations.json" },
      { id: "sql-indexes",                   title: "Indexes",                         difficulty: "intermediate", estimatedMinutes: 25, file: "sql-indexes.json" },
      { id: "sql-views",                     title: "Views & Materialized Views",      difficulty: "intermediate", estimatedMinutes: 25, file: "sql-views.json" },
      { id: "sql-transactions",              title: "Transactions & ACID",             difficulty: "intermediate", estimatedMinutes: 30, file: "sql-transactions.json" },
      { id: "sql-string-functions",          title: "String Functions",                difficulty: "beginner",     estimatedMinutes: 20, file: "sql-string-functions.json" },
      { id: "sql-date-functions",            title: "Date/Time Functions",             difficulty: "beginner",     estimatedMinutes: 20, file: "sql-date-functions.json" },
      { id: "sql-conditional-expressions",   title: "Conditional Expressions",         difficulty: "intermediate", estimatedMinutes: 20, file: "sql-conditional-expressions.json" },
      { id: "sql-stored-procedures",         title: "Stored Procedures & Functions",   difficulty: "advanced",     estimatedMinutes: 30, file: "sql-stored-procedures.json" },
      { id: "sql-triggers",                  title: "Triggers",                        difficulty: "advanced",     estimatedMinutes: 25, file: "sql-triggers.json" },
      { id: "sql-normalization",             title: "Database Normalization",          difficulty: "intermediate", estimatedMinutes: 30, file: "sql-normalization.json" },
      { id: "sql-json",                      title: "JSON & JSONB",                    difficulty: "advanced",     estimatedMinutes: 25, file: "sql-json.json" },
      { id: "sql-full-text-search",          title: "Full-Text Search",                difficulty: "advanced",     estimatedMinutes: 25, file: "sql-full-text-search.json" },
      { id: "sql-explain",                   title: "Query Optimization & EXPLAIN",    difficulty: "advanced",     estimatedMinutes: 30, file: "sql-explain.json" },
      { id: "sql-injection",                 title: "SQL Injection & Prevention",      difficulty: "intermediate", estimatedMinutes: 25, file: "sql-injection.json" },
      { id: "sql-backup-restore",            title: "Backup & Restore",                difficulty: "intermediate", estimatedMinutes: 25, file: "sql-backup-restore.json" },
      { id: "sql-users-permissions",         title: "Users, Roles & Permissions",      difficulty: "intermediate", estimatedMinutes: 25, file: "sql-users-permissions.json" },
      { id: "sql-upsert",                    title: "UPSERT & MERGE",                  difficulty: "intermediate", estimatedMinutes: 20, file: "sql-upsert.json" },
      { id: "sql-sequences",                 title: "Sequences & Identity",            difficulty: "beginner",     estimatedMinutes: 15, file: "sql-sequences.json" },
      { id: "sql-data-types",                title: "Data Types Deep Dive",            difficulty: "intermediate", estimatedMinutes: 25, file: "sql-data-types.json" },
      { id: "sql-partitioning",              title: "Table Partitioning",              difficulty: "advanced",     estimatedMinutes: 30, file: "sql-partitioning.json" },
      { id: "sql-pivot",                     title: "PIVOT & Crosstab Queries",        difficulty: "advanced",     estimatedMinutes: 25, file: "sql-pivot.json" },
      { id: "sql-er-diagrams",               title: "ER Diagrams & Database Design",   difficulty: "intermediate", estimatedMinutes: 25, file: "sql-er-diagrams.json" },
      { id: "sql-null-handling",              title: "NULL Handling & Three-Valued Logic",difficulty: "intermediate", estimatedMinutes: 20, file: "sql-null-handling.json" },
      { id: "sql-lateral-joins",              title: "LATERAL Joins",                   difficulty: "advanced",     estimatedMinutes: 25, file: "sql-lateral-joins.json" },
      { id: "sql-locking-concurrency",        title: "Locking & Concurrency",           difficulty: "intermediate", estimatedMinutes: 25, file: "sql-locking-concurrency.json" },
      { id: "sql-pattern-matching",           title: "Advanced Pattern Matching",        difficulty: "intermediate", estimatedMinutes: 20, file: "sql-pattern-matching.json" },
      { id: "sql-pagination",                 title: "Pagination Strategies",            difficulty: "intermediate", estimatedMinutes: 20, file: "sql-pagination.json" },
      { id: "sql-anti-patterns",              title: "SQL Anti-Patterns",                difficulty: "intermediate", estimatedMinutes: 25, file: "sql-anti-patterns.json" },
      { id: "sql-db-comparison",              title: "PostgreSQL vs MySQL vs SQL Server",difficulty: "beginner",     estimatedMinutes: 20, file: "sql-db-comparison.json" },
      { id: "sql-orms",                       title: "ORMs & SQL",                      difficulty: "intermediate", estimatedMinutes: 20, file: "sql-orms.json" },
      { id: "sql-migrations",                 title: "Database Migration & Version Control",difficulty: "intermediate",estimatedMinutes: 20, file: "sql-migrations.json" }
    ],
    auth: [
      { id: "auth-authentication",    title: "Authentication",                   difficulty: "beginner",     estimatedMinutes: 20, file: "auth-authentication.json" },
      { id: "auth-authorization",     title: "Authorization",                    difficulty: "intermediate", estimatedMinutes: 20, file: "auth-authorization.json" },
      { id: "auth-jwt",               title: "JWT (JSON Web Tokens)",            difficulty: "intermediate", estimatedMinutes: 25, file: "auth-jwt.json" },
      { id: "auth-oauth",             title: "OAuth 2.0",                        difficulty: "advanced",     estimatedMinutes: 35, file: "auth-oauth.json" },
      { id: "auth-refresh-tokens",    title: "Refresh Tokens",                   difficulty: "intermediate", estimatedMinutes: 25, file: "auth-refresh-tokens.json" },
      { id: "auth-access-tokens",     title: "Access Tokens",                    difficulty: "intermediate", estimatedMinutes: 20, file: "auth-access-tokens.json" },
      { id: "auth-session-auth",      title: "Session Authentication",           difficulty: "beginner",     estimatedMinutes: 20, file: "auth-session-auth.json" },
      { id: "auth-rbac",              title: "RBAC (Role-Based Access Control)", difficulty: "intermediate", estimatedMinutes: 25, file: "auth-rbac.json" },
      { id: "auth-multi-tenant",      title: "Multi Tenant Security",            difficulty: "advanced",     estimatedMinutes: 30, file: "auth-multi-tenant.json" },
      { id: "auth-password-hashing",  title: "Password Hashing",                 difficulty: "intermediate", estimatedMinutes: 25, file: "auth-password-hashing.json" },
      { id: "auth-bcrypt",            title: "bcrypt",                           difficulty: "beginner",     estimatedMinutes: 15, file: "auth-bcrypt.json" },
      { id: "auth-csrf",              title: "CSRF (Cross-Site Request Forgery)",difficulty: "intermediate", estimatedMinutes: 25, file: "auth-csrf.json" },
      { id: "auth-xss",               title: "XSS (Cross-Site Scripting)",       difficulty: "intermediate", estimatedMinutes: 25, file: "auth-xss.json" },
      { id: "auth-sql-injection",     title: "SQL Injection",                    difficulty: "intermediate", estimatedMinutes: 25, file: "auth-sql-injection.json" },
      { id: "auth-nosql-injection",   title: "NoSQL Injection",                  difficulty: "intermediate", estimatedMinutes: 20, file: "auth-nosql-injection.json" },
      { id: "auth-https",             title: "HTTPS (HTTP over TLS)",            difficulty: "beginner",     estimatedMinutes: 20, file: "auth-https.json" },
      { id: "auth-cors",              title: "CORS (Cross-Origin Resource Sharing)",difficulty: "intermediate",estimatedMinutes: 20, file: "auth-cors.json" },
      { id: "auth-owasp",             title: "OWASP Top 10",                     difficulty: "advanced",     estimatedMinutes: 35, file: "auth-owasp.json" }
    ],
    "devops-fundamentals": [
      { id: "devops-what-is-devops", title: "What is DevOps", difficulty: "beginner", estimatedMinutes: 15, file: "devops-what-is-devops.json" },
      { id: "devops-lifecycle", title: "DevOps Lifecycle", difficulty: "beginner", estimatedMinutes: 15, file: "devops-lifecycle.json" },
      { id: "devops-culture", title: "DevOps Culture", difficulty: "beginner", estimatedMinutes: 15, file: "devops-culture.json" },
      { id: "devops-agile-vs-devops", title: "Agile vs DevOps", difficulty: "beginner", estimatedMinutes: 15, file: "devops-agile-vs-devops.json" },
      { id: "devops-sdlc", title: "SDLC (Software Development Lifecycle)", difficulty: "beginner", estimatedMinutes: 15, file: "devops-sdlc.json" },
      { id: "devops-ci", title: "Continuous Integration", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-ci.json" },
      { id: "devops-cd", title: "Continuous Delivery", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-cd.json" },
      { id: "devops-continuous-deployment", title: "Continuous Deployment", difficulty: "advanced", estimatedMinutes: 20, file: "devops-continuous-deployment.json" },
      { id: "devops-iac", title: "Infrastructure as Code (IaC)", difficulty: "intermediate", estimatedMinutes: 25, file: "devops-iac.json" },
      { id: "devops-config-mgmt", title: "Configuration Management", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-config-mgmt.json" },
      { id: "devops-immutable-infra", title: "Immutable Infrastructure", difficulty: "advanced", estimatedMinutes: 20, file: "devops-immutable-infra.json" },
      { id: "devops-shift-left", title: "Shift Left Testing", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-shift-left.json" },
      { id: "devops-gitops", title: "GitOps", difficulty: "advanced", estimatedMinutes: 25, file: "devops-gitops.json" },
      { id: "devops-devsecops", title: "DevSecOps", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-devsecops.json" },
      { id: "devops-platform-engineering", title: "Platform Engineering", difficulty: "advanced", estimatedMinutes: 25, file: "devops-platform-engineering.json" },
      { id: "devops-sre", title: "SRE (Site Reliability Engineering)", difficulty: "advanced", estimatedMinutes: 30, file: "devops-sre.json" },
      { id: "devops-blue-green", title: "Blue-Green Deployment", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-blue-green.json" },
      { id: "devops-canary", title: "Canary Deployment", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-canary.json" },
      { id: "devops-rolling", title: "Rolling Deployment", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-rolling.json" },
      { id: "devops-recreate", title: "Recreate Deployment", difficulty: "beginner", estimatedMinutes: 10, file: "devops-recreate.json" },
      { id: "devops-feature-flags", title: "Feature Flags", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-feature-flags.json" },
      { id: "devops-release-mgmt", title: "Release Management", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-release-mgmt.json" },
      { id: "devops-change-mgmt", title: "Change Management", difficulty: "intermediate", estimatedMinutes: 20, file: "devops-change-mgmt.json" }
    ],
    "version-control-git": [
      { id: "git-basics", title: "Git Basics", difficulty: "beginner", estimatedMinutes: 15, file: "git-basics.json" },
      { id: "git-branching", title: "Git Branching", difficulty: "intermediate", estimatedMinutes: 20, file: "git-branching.json" },
      { id: "git-init", title: "Git Init", difficulty: "beginner", estimatedMinutes: 10, file: "git-init.json" },
      { id: "git-clone", title: "Git Clone", difficulty: "beginner", estimatedMinutes: 10, file: "git-clone.json" },
      { id: "git-status", title: "Git Status", difficulty: "beginner", estimatedMinutes: 5, file: "git-status.json" },
      { id: "git-add", title: "Git Add", difficulty: "beginner", estimatedMinutes: 5, file: "git-add.json" },
      { id: "git-commit", title: "Git Commit", difficulty: "beginner", estimatedMinutes: 10, file: "git-commit.json" },
      { id: "git-push", title: "Git Push", difficulty: "beginner", estimatedMinutes: 10, file: "git-push.json" },
      { id: "git-pull", title: "Git Pull", difficulty: "beginner", estimatedMinutes: 10, file: "git-pull.json" },
      { id: "git-merge", title: "Git Merge", difficulty: "intermediate", estimatedMinutes: 15, file: "git-merge.json" },
      { id: "git-rebase", title: "Git Rebase", difficulty: "intermediate", estimatedMinutes: 15, file: "git-rebase.json" },
      { id: "git-stash", title: "Git Stash", difficulty: "intermediate", estimatedMinutes: 10, file: "git-stash.json" },
      { id: "git-cherry-pick", title: "Git Cherry Pick", difficulty: "intermediate", estimatedMinutes: 15, file: "git-cherry-pick.json" },
      { id: "git-revert", title: "Git Revert", difficulty: "intermediate", estimatedMinutes: 10, file: "git-revert.json" },
      { id: "git-reset", title: "Git Reset", difficulty: "intermediate", estimatedMinutes: 15, file: "git-reset.json" },
      { id: "git-tags", title: "Git Tags", difficulty: "intermediate", estimatedMinutes: 10, file: "git-tags.json" },
      { id: "git-hooks", title: "Git Hooks", difficulty: "intermediate", estimatedMinutes: 15, file: "git-hooks.json" },
      { id: "git-ignore", title: "Git Ignore", difficulty: "beginner", estimatedMinutes: 10, file: "git-ignore.json" },
      { id: "git-log", title: "Git Log", difficulty: "beginner", estimatedMinutes: 10, file: "git-log.json" },
      { id: "git-diff", title: "Git Diff", difficulty: "intermediate", estimatedMinutes: 10, file: "git-diff.json" },
      { id: "git-blame", title: "Git Blame", difficulty: "intermediate", estimatedMinutes: 10, file: "git-blame.json" },
      { id: "git-reflog", title: "Git Reflog", difficulty: "advanced", estimatedMinutes: 15, file: "git-reflog.json" },
      { id: "git-bisect", title: "Git Bisect", difficulty: "advanced", estimatedMinutes: 20, file: "git-bisect.json" },
      { id: "git-submodule", title: "Git Submodule", difficulty: "advanced", estimatedMinutes: 20, file: "git-submodule.json" },
      { id: "git-worktree", title: "Git Worktree", difficulty: "advanced", estimatedMinutes: 15, file: "git-worktree.json" },
      { id: "git-clean", title: "Git Clean", difficulty: "intermediate", estimatedMinutes: 5, file: "git-clean.json" },
      { id: "git-archive", title: "Git Archive", difficulty: "intermediate", estimatedMinutes: 10, file: "git-archive.json" }
    ],
    github: [
      { id: "github-basics", title: "GitHub Basics", difficulty: "beginner", estimatedMinutes: 15, file: "github-basics.json" },
      { id: "github-repos", title: "GitHub Repositories", difficulty: "beginner", estimatedMinutes: 15, file: "github-repos.json" },
      { id: "github-pull-requests", title: "Pull Requests", difficulty: "intermediate", estimatedMinutes: 20, file: "github-pull-requests.json" },
      { id: "github-code-reviews", title: "Code Reviews", difficulty: "intermediate", estimatedMinutes: 20, file: "github-code-reviews.json" },
      { id: "github-branch-protection", title: "Branch Protection Rules", difficulty: "intermediate", estimatedMinutes: 20, file: "github-branch-protection.json" },
      { id: "github-issues", title: "GitHub Issues", difficulty: "beginner", estimatedMinutes: 15, file: "github-issues.json" },
      { id: "github-actions-basics", title: "GitHub Actions Basics", difficulty: "intermediate", estimatedMinutes: 25, file: "github-actions-basics.json" },
      { id: "github-actions-advanced", title: "GitHub Actions Advanced", difficulty: "advanced", estimatedMinutes: 30, file: "github-actions-advanced.json" },
      { id: "github-pages", title: "GitHub Pages", difficulty: "beginner", estimatedMinutes: 15, file: "github-pages.json" },
      { id: "github-wikis", title: "GitHub Wikis", difficulty: "beginner", estimatedMinutes: 10, file: "github-wikis.json" },
      { id: "github-security", title: "GitHub Security", difficulty: "intermediate", estimatedMinutes: 20, file: "github-security.json" },
      { id: "github-cli", title: "GitHub CLI & Desktop", difficulty: "beginner", estimatedMinutes: 15, file: "github-cli.json" },
      { id: "github-orgs", title: "GitHub Organizations", difficulty: "intermediate", estimatedMinutes: 15, file: "github-orgs.json" },
      { id: "github-gists", title: "GitHub Gists", difficulty: "beginner", estimatedMinutes: 10, file: "github-gists.json" },
      { id: "github-projects", title: "GitHub Projects (Beta)", difficulty: "intermediate", estimatedMinutes: 20, file: "github-projects.json" },
      { id: "github-releases", title: "GitHub Releases", difficulty: "beginner", estimatedMinutes: 10, file: "github-releases.json" },
      { id: "github-api", title: "GitHub API & Webhooks", difficulty: "advanced", estimatedMinutes: 25, file: "github-api.json" },
      { id: "github-discussions", title: "GitHub Discussions", difficulty: "beginner", estimatedMinutes: 10, file: "github-discussions.json" }
    ],
    cicd: [
      { id: "cicd-fundamentals", title: "CI/CD Fundamentals", difficulty: "beginner", estimatedMinutes: 20, file: "cicd-fundamentals.json" },
      { id: "cicd-pipeline", title: "CI/CD Pipeline", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-pipeline.json" },
      { id: "cicd-build-automation", title: "Build Automation", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-build-automation.json" },
      { id: "cicd-test-automation", title: "Test Automation in CI/CD", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-test-automation.json" },
      { id: "cicd-code-quality", title: "Linting & Code Quality", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-code-quality.json" },
      { id: "cicd-artifacts", title: "Artifacts & Build Outputs", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-artifacts.json" },
      { id: "cicd-docker", title: "Docker in CI/CD", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-docker.json" },
      { id: "cicd-environments", title: "Environment Management", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-environments.json" },
      { id: "cicd-secrets", title: "Secrets Management in CI/CD", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-secrets.json" },
      { id: "cicd-triggers", title: "Pipeline Triggers", difficulty: "beginner", estimatedMinutes: 10, file: "cicd-triggers.json" },
      { id: "cicd-parallel", title: "Parallel Execution", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-parallel.json" },
      { id: "cicd-caching", title: "Pipeline Caching", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-caching.json" },
      { id: "cicd-blue-green", title: "Blue-Green Deployment", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-blue-green.json" },
      { id: "cicd-canary", title: "Canary Deployment", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-canary.json" },
      { id: "cicd-rollback", title: "Rollback Strategies", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-rollback.json" },
      { id: "cicd-deploy-envs", title: "Deployment Environments & Promotion", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-deploy-envs.json" },
      { id: "cicd-iac", title: "Infrastructure as Code in CI/CD", difficulty: "advanced", estimatedMinutes: 25, file: "cicd-iac.json" },
      { id: "cicd-monitoring", title: "Monitoring & Observability", difficulty: "advanced", estimatedMinutes: 20, file: "cicd-monitoring.json" },
      { id: "cicd-security", title: "CI/CD Security", difficulty: "advanced", estimatedMinutes: 20, file: "cicd-security.json" },
      { id: "cicd-notifications", title: "Pipeline Notifications", difficulty: "beginner", estimatedMinutes: 10, file: "cicd-notifications.json" },
      { id: "cicd-jenkins", title: "Jenkins", difficulty: "intermediate", estimatedMinutes: 25, file: "cicd-jenkins.json" },
      { id: "cicd-gitlab", title: "GitLab CI/CD", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-gitlab.json" },
      { id: "cicd-circleci", title: "CircleCI", difficulty: "intermediate", estimatedMinutes: 15, file: "cicd-circleci.json" },
      { id: "cicd-best-practices", title: "CI/CD Best Practices", difficulty: "intermediate", estimatedMinutes: 20, file: "cicd-best-practices.json" }
    ],
    "github-actions": [
      { id: "github-actions-workflow", title: "Workflow", difficulty: "beginner", estimatedMinutes: 15, file: "github-actions-workflow.json" },
      { id: "github-actions-yaml", title: "Workflow YAML Syntax", difficulty: "intermediate", estimatedMinutes: 20, file: "github-actions-yaml.json" },
      { id: "github-actions-events", title: "Events", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-events.json" },
      { id: "github-actions-triggers", title: "Triggers", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-triggers.json" },
      { id: "github-actions-jobs", title: "Jobs", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-jobs.json" },
      { id: "github-actions-steps", title: "Steps", difficulty: "beginner", estimatedMinutes: 10, file: "github-actions-steps.json" },
      { id: "github-actions-runners", title: "Runners", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-runners.json" },
      { id: "github-actions-self-hosted", title: "Self-Hosted Runner", difficulty: "advanced", estimatedMinutes: 20, file: "github-actions-self-hosted.json" },
      { id: "github-actions-matrix", title: "Matrix Builds", difficulty: "intermediate", estimatedMinutes: 20, file: "github-actions-matrix.json" },
      { id: "github-actions-marketplace", title: "Actions Marketplace", difficulty: "beginner", estimatedMinutes: 15, file: "github-actions-marketplace.json" },
      { id: "github-actions-composite", title: "Composite Actions", difficulty: "advanced", estimatedMinutes: 20, file: "github-actions-composite.json" },
      { id: "github-actions-reusable", title: "Reusable Workflows", difficulty: "advanced", estimatedMinutes: 20, file: "github-actions-reusable.json" },
      { id: "github-actions-cache", title: "Cache", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-cache.json" },
      { id: "github-actions-artifacts", title: "Artifacts", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-artifacts.json" },
      { id: "github-actions-secrets", title: "Secrets", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-secrets.json" },
      { id: "github-actions-variables", title: "Variables", difficulty: "beginner", estimatedMinutes: 10, file: "github-actions-variables.json" },
      { id: "github-actions-environments", title: "Environments", difficulty: "intermediate", estimatedMinutes: 20, file: "github-actions-environments.json" },
      { id: "github-actions-deployment-protection", title: "Deployment Protection Rules", difficulty: "advanced", estimatedMinutes: 15, file: "github-actions-deployment-protection.json" },
      { id: "github-actions-scheduled", title: "Scheduled Workflows", difficulty: "intermediate", estimatedMinutes: 10, file: "github-actions-scheduled.json" },
      { id: "github-actions-conditional", title: "Conditional Execution", difficulty: "intermediate", estimatedMinutes: 15, file: "github-actions-conditional.json" },
      { id: "github-actions-complete-cicd", title: "Complete CI/CD Pipeline with GitHub Actions", difficulty: "advanced", estimatedMinutes: 45, file: "github-actions-complete-cicd.json" }
    ],
    jenkins: [
      { id: "jenkins-architecture", title: "Jenkins Architecture", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-architecture.json" },
      { id: "jenkins-installation", title: "Jenkins Installation", difficulty: "beginner", estimatedMinutes: 15, file: "jenkins-installation.json" },
      { id: "jenkins-dashboard", title: "Jenkins Dashboard", difficulty: "beginner", estimatedMinutes: 10, file: "jenkins-dashboard.json" },
      { id: "jenkins-jobs", title: "Jenkins Jobs", difficulty: "beginner", estimatedMinutes: 15, file: "jenkins-jobs.json" },
      { id: "jenkins-freestyle", title: "Freestyle Jobs", difficulty: "beginner", estimatedMinutes: 15, file: "jenkins-freestyle.json" },
      { id: "jenkins-pipeline", title: "Pipeline Jobs", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-pipeline.json" },
      { id: "jenkins-multibranch", title: "Multibranch Pipeline", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-multibranch.json" },
      { id: "jenkins-jenkinsfile", title: "Jenkinsfile", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-jenkinsfile.json" },
      { id: "jenkins-declarative", title: "Declarative Pipeline", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-declarative.json" },
      { id: "jenkins-scripted", title: "Scripted Pipeline", difficulty: "advanced", estimatedMinutes: 20, file: "jenkins-scripted.json" },
      { id: "jenkins-pipeline-stages", title: "Pipeline Stages", difficulty: "beginner", estimatedMinutes: 10, file: "jenkins-pipeline-stages.json" },
      { id: "jenkins-build-agents", title: "Build Agents", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-build-agents.json" },
      { id: "jenkins-master-agent", title: "Master-Agent Architecture", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-master-agent.json" },
      { id: "jenkins-distributed", title: "Distributed Builds", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-distributed.json" },
      { id: "jenkins-nodes", title: "Jenkins Nodes", difficulty: "intermediate", estimatedMinutes: 10, file: "jenkins-nodes.json" },
      { id: "jenkins-plugins", title: "Jenkins Plugins", difficulty: "beginner", estimatedMinutes: 15, file: "jenkins-plugins.json" },
      { id: "jenkins-credentials", title: "Credentials Management", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-credentials.json" },
      { id: "jenkins-shared-libraries", title: "Jenkins Shared Libraries", difficulty: "advanced", estimatedMinutes: 20, file: "jenkins-shared-libraries.json" },
      { id: "jenkins-parameters", title: "Jenkins Parameters", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-parameters.json" },
      { id: "jenkins-triggers", title: "Jenkins Triggers", difficulty: "beginner", estimatedMinutes: 15, file: "jenkins-triggers.json" },
      { id: "jenkins-poll-scm", title: "Poll SCM", difficulty: "intermediate", estimatedMinutes: 10, file: "jenkins-poll-scm.json" },
      { id: "jenkins-webhooks", title: "Webhooks", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-webhooks.json" },
      { id: "jenkins-build-artifacts", title: "Build Artifacts", difficulty: "beginner", estimatedMinutes: 10, file: "jenkins-build-artifacts.json" },
      { id: "jenkins-build-history", title: "Build History", difficulty: "beginner", estimatedMinutes: 10, file: "jenkins-build-history.json" },
      { id: "jenkins-backup", title: "Backup and Restore", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-backup.json" },
      { id: "jenkins-security", title: "Jenkins Security", difficulty: "advanced", estimatedMinutes: 20, file: "jenkins-security.json" },
      { id: "jenkins-rbac", title: "Jenkins RBAC", difficulty: "advanced", estimatedMinutes: 15, file: "jenkins-rbac.json" },
      { id: "jenkins-blue-ocean", title: "Blue Ocean", difficulty: "beginner", estimatedMinutes: 15, file: "jenkins-blue-ocean.json" },
      { id: "jenkins-docker", title: "Jenkins with Docker", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-docker.json" },
      { id: "jenkins-kubernetes", title: "Jenkins with Kubernetes", difficulty: "advanced", estimatedMinutes: 25, file: "jenkins-kubernetes.json" },
      { id: "jenkins-sonarqube", title: "Jenkins with SonarQube", difficulty: "intermediate", estimatedMinutes: 20, file: "jenkins-sonarqube.json" },
      { id: "jenkins-nexus", title: "Jenkins with Nexus", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-nexus.json" },
      { id: "jenkins-maven", title: "Jenkins with Maven", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-maven.json" },
      { id: "jenkins-gradle", title: "Jenkins with Gradle", difficulty: "intermediate", estimatedMinutes: 15, file: "jenkins-gradle.json" },
      { id: "jenkins-complete-cicd", title: "Complete CI/CD Pipeline with Jenkins", difficulty: "advanced", estimatedMinutes: 45, file: "jenkins-complete-cicd.json" }
    ],
    docker: [
      { id: "docker-what-is-docker",  title: "What is Docker?",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-what-is-docker.json" },
      { id: "docker-vs-vm",  title: "Docker vs Virtual Machines",         difficulty: "beginner",    estimatedMinutes: 15, file: "docker-vs-vm.json" },
      { id: "docker-architecture",  title: "Docker Architecture",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-architecture.json" },
      { id: "docker-installation",  title: "Docker Installation",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-installation.json" },
      { id: "docker-commands",  title: "Docker Commands",         difficulty: "beginner",    estimatedMinutes: 15, file: "docker-commands.json" },
      { id: "docker-hub",  title: "Docker Hub",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-hub.json" },
      { id: "docker-images-basics",  title: "Docker Images (Basics)",         difficulty: "beginner",    estimatedMinutes: 15, file: "docker-images-basics.json" },
      { id: "docker-containers-basics",  title: "Docker Containers (Basics)",         difficulty: "beginner",    estimatedMinutes: 15, file: "docker-containers-basics.json" },
      { id: "docker-registry",  title: "Docker Registry",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-registry.json" },
      { id: "docker-engine",  title: "Docker Engine",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-engine.json" },
      { id: "docker-daemon",  title: "Docker Daemon",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-daemon.json" },
      { id: "docker-client-server",  title: "Docker Client-Server Model",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-client-server.json" },
      { id: "docker-object-labels",  title: "Docker Object Labels",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-object-labels.json" },
      { id: "docker-image-layers",  title: "Image Layers",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-image-layers.json" },
      { id: "docker-image-creation",  title: "Image Creation",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-image-creation.json" },
      { id: "docker-dockerfile-vs-image",  title: "Dockerfile vs Image",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-dockerfile-vs-image.json" },
      { id: "docker-image-tagging",  title: "Image Tagging",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-image-tagging.json" },
      { id: "docker-image-size",  title: "Image Size",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-image-size.json" },
      { id: "docker-image-security",  title: "Image Security",         difficulty: "advanced",    estimatedMinutes: 20, file: "docker-image-security.json" },
      { id: "docker-image-distribution",  title: "Image Distribution",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-image-distribution.json" },
      { id: "docker-image-caching",  title: "Image Caching",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-image-caching.json" },
      { id: "docker-multi-stage-builds",  title: "Multi-Stage Builds",         difficulty: "intermediate",    estimatedMinutes: 20, file: "docker-multi-stage-builds.json" },
      { id: "docker-image-versioning",  title: "Image Versioning",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-image-versioning.json" },
      { id: "docker-base-images",  title: "Base Images",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-base-images.json" },
      { id: "docker-alpine-images",  title: "Alpine Images",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-alpine-images.json" },
      { id: "docker-distroless-images",  title: "Distroless Images",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-distroless-images.json" },
      { id: "docker-container-lifecycle",  title: "Container Lifecycle",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-container-lifecycle.json" },
      { id: "docker-run-vs-exec",  title: "docker run vs docker exec",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-run-vs-exec.json" },
      { id: "docker-port-mapping",  title: "Port Mapping",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-port-mapping.json" },
      { id: "docker-volume-mounts",  title: "Volume Mounts",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-volume-mounts.json" },
      { id: "docker-environment-variables",  title: "Environment Variables",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-environment-variables.json" },
      { id: "docker-resource-limits",  title: "Resource Limits",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-resource-limits.json" },
      { id: "docker-container-networking",  title: "Container Networking",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-container-networking.json" },
      { id: "docker-container-logs",  title: "Container Logs",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-container-logs.json" },
      { id: "docker-container-health",  title: "Container Health Checks",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-container-health.json" },
      { id: "docker-restart-policies",  title: "Restart Policies",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-restart-policies.json" },
      { id: "docker-container-cleanup",  title: "Container Cleanup",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-container-cleanup.json" },
      { id: "docker-container-security",  title: "Container Security",         difficulty: "advanced",    estimatedMinutes: 20, file: "docker-container-security.json" },
      { id: "docker-container-orchestration",  title: "Container Orchestration",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-container-orchestration.json" },
      { id: "docker-dockerfile-syntax",  title: "Dockerfile Syntax",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-dockerfile-syntax.json" },
      { id: "docker-from",  title: "FROM Instruction",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-from.json" },
      { id: "docker-run",  title: "RUN Instruction",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-run.json" },
      { id: "docker-copy-vs-add",  title: "COPY vs ADD",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-copy-vs-add.json" },
      { id: "docker-cmd-vs-entrypoint",  title: "CMD vs ENTRYPOINT",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-cmd-vs-entrypoint.json" },
      { id: "docker-workdir",  title: "WORKDIR Instruction",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-workdir.json" },
      { id: "docker-env",  title: "ENV Instruction",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-env.json" },
      { id: "docker-expose",  title: "EXPOSE Instruction",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-expose.json" },
      { id: "docker-volume",  title: "VOLUME Instruction",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-volume.json" },
      { id: "docker-user",  title: "USER Instruction",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-user.json" },
      { id: "docker-label",  title: "LABEL Instruction",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-label.json" },
      { id: "docker-arg",  title: "ARG Instruction",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-arg.json" },
      { id: "docker-multi-stage",  title: "Multi-Stage Builds (Dockerfile)",         difficulty: "intermediate",    estimatedMinutes: 20, file: "docker-multi-stage.json" },
      { id: "docker-what-is-compose",  title: "What is Docker Compose?",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-what-is-compose.json" },
      { id: "docker-compose-yml",  title: "docker-compose.yml Structure",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-compose-yml.json" },
      { id: "docker-compose-services",  title: "Compose Services",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-compose-services.json" },
      { id: "docker-compose-networks",  title: "Compose Networks",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-compose-networks.json" },
      { id: "docker-compose-volumes",  title: "Compose Volumes",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-compose-volumes.json" },
      { id: "docker-compose-environment",  title: "Compose Environment",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-compose-environment.json" },
      { id: "docker-compose-depends-on",  title: "Depends On",         difficulty: "beginner",    estimatedMinutes: 10, file: "docker-compose-depends-on.json" },
      { id: "docker-compose-ports",  title: "Compose Ports",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-compose-ports.json" },
      { id: "docker-compose-build",  title: "Compose Build",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-compose-build.json" },
      { id: "docker-compose-profiles",  title: "Compose Profiles",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-compose-profiles.json" },
      { id: "docker-compose-extends",  title: "Compose Extends",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-compose-extends.json" },
      { id: "docker-compose-watch",  title: "Compose Watch",         difficulty: "advanced",    estimatedMinutes: 10, file: "docker-compose-watch.json" },
      { id: "docker-compose-production",  title: "Compose in Production",         difficulty: "advanced",    estimatedMinutes: 20, file: "docker-compose-production.json" },
      { id: "docker-volumes",  title: "Docker Volumes",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-volumes.json" },
      { id: "docker-bind-mounts",  title: "Bind Mounts",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-bind-mounts.json" },
      { id: "docker-tmpfs-mounts",  title: "tmpfs Mounts",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-tmpfs-mounts.json" },
      { id: "docker-volume-drivers",  title: "Volume Drivers",         difficulty: "advanced",    estimatedMinutes: 15, file: "docker-volume-drivers.json" },
      { id: "docker-backup-restore",  title: "Volume Backup and Restore",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-backup-restore.json" },
      { id: "docker-storage-drivers",  title: "Storage Drivers",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-storage-drivers.json" },
      { id: "docker-union-filesystem",  title: "Union File System",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-union-filesystem.json" },
      { id: "docker-copy-on-write",  title: "Copy-on-Write",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-copy-on-write.json" },
      { id: "docker-layer-caching",  title: "Layer Caching (Storage)",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-layer-caching.json" },
      { id: "docker-volume-vs-bind",  title: "Volume vs Bind Mount",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-volume-vs-bind.json" },
      { id: "docker-nfs-volumes",  title: "NFS Volumes",         difficulty: "advanced",    estimatedMinutes: 15, file: "docker-nfs-volumes.json" },
      { id: "docker-volume-plugins",  title: "Volume Plugins",         difficulty: "advanced",    estimatedMinutes: 10, file: "docker-volume-plugins.json" },
      { id: "docker-storage-best-practices",  title: "Storage Best Practices",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-storage-best-practices.json" },
      { id: "docker-bridge-network",  title: "Bridge Network",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-bridge-network.json" },
      { id: "docker-host-network",  title: "Host Network",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-host-network.json" },
      { id: "docker-overlay-network",  title: "Overlay Network",         difficulty: "advanced",    estimatedMinutes: 20, file: "docker-overlay-network.json" },
      { id: "docker-macvlan-network",  title: "Macvlan Network",         difficulty: "advanced",    estimatedMinutes: 20, file: "docker-macvlan-network.json" },
      { id: "docker-none-network",  title: "None Network",         difficulty: "beginner",    estimatedMinutes: 5, file: "docker-none-network.json" },
      { id: "docker-port-publishing",  title: "Port Publishing",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-port-publishing.json" },
      { id: "docker-dns",  title: "DNS in Docker",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-dns.json" },
      { id: "docker-network-drivers",  title: "Network Drivers",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-network-drivers.json" },
      { id: "docker-custom-networks",  title: "Custom Networks",         difficulty: "intermediate",    estimatedMinutes: 10, file: "docker-custom-networks.json" },
      { id: "docker-container-communication",  title: "Container Communication",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-container-communication.json" },
      { id: "docker-network-security",  title: "Network Security",         difficulty: "advanced",    estimatedMinutes: 15, file: "docker-network-security.json" },
      { id: "docker-ingress-network",  title: "Ingress Network",         difficulty: "advanced",    estimatedMinutes: 10, file: "docker-ingress-network.json" },
      { id: "docker-network-troubleshooting",  title: "Network Troubleshooting",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-network-troubleshooting.json" },
      { id: "docker-containerization-best-practices",  title: "Containerization Best Practices",         difficulty: "intermediate",    estimatedMinutes: 15, file: "docker-containerization-best-practices.json" },
      { id: "docker-application-containerization",  title: "Application Containerization",         difficulty: "intermediate",    estimatedMinutes: 20, file: "docker-application-containerization.json" },
      { id: "docker-complete-cicd",  title: "Complete CI/CD Pipeline with Docker",         difficulty: "advanced",    estimatedMinutes: 45, file: "docker-complete-cicd.json" }
    ],
    kubernetes: [
      { id: "k8s-architecture",  title: "Kubernetes Architecture",         difficulty: "beginner",    estimatedMinutes: 15, file: "k8s-architecture.json" },
      { id: "k8s-cluster",  title: "Cluster",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-cluster.json" },
      { id: "k8s-control-plane",  title: "Control Plane",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-control-plane.json" },
      { id: "k8s-worker-node",  title: "Worker Node",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-worker-node.json" },
      { id: "k8s-apiserver",  title: "kube-apiserver",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-apiserver.json" },
      { id: "k8s-scheduler",  title: "kube-scheduler",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-scheduler.json" },
      { id: "k8s-controller-manager",  title: "kube-controller-manager",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-controller-manager.json" },
      { id: "k8s-etcd",  title: "etcd",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-etcd.json" },
      { id: "k8s-kubelet",  title: "kubelet",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-kubelet.json" },
      { id: "k8s-kube-proxy",  title: "kube-proxy",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-kube-proxy.json" },
      { id: "k8s-container-runtime",  title: "Container Runtime",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-container-runtime.json" },
      { id: "k8s-pod",  title: "Pod",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-pod.json" },
      { id: "k8s-replicaset",  title: "ReplicaSet",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-replicaset.json" },
      { id: "k8s-deployment",  title: "Deployment",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-deployment.json" },
      { id: "k8s-statefulset",  title: "StatefulSet",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-statefulset.json" },
      { id: "k8s-daemonset",  title: "DaemonSet",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-daemonset.json" },
      { id: "k8s-job",  title: "Job",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-job.json" },
      { id: "k8s-cronjob",  title: "CronJob",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-cronjob.json" },
      { id: "k8s-namespace",  title: "Namespace",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-namespace.json" },
      { id: "k8s-service",  title: "Service",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-service.json" },
      { id: "k8s-configmap",  title: "ConfigMap",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-configmap.json" },
      { id: "k8s-secret",  title: "Secret",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-secret.json" },
      { id: "k8s-persistent-volume",  title: "Persistent Volume",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-persistent-volume.json" },
      { id: "k8s-persistent-volume-claim",  title: "Persistent Volume Claim",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-persistent-volume-claim.json" },
      { id: "k8s-storage-class",  title: "Storage Class",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-storage-class.json" },
      { id: "k8s-ingress",  title: "Ingress",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-ingress.json" },
      { id: "k8s-network-policy",  title: "Network Policy",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-network-policy.json" },
      { id: "k8s-service-account",  title: "Service Account",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-service-account.json" },
      { id: "k8s-resource-quota",  title: "ResourceQuota",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-resource-quota.json" },
      { id: "k8s-limit-range",  title: "LimitRange",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-limit-range.json" },
      { id: "k8s-pod-lifecycle",  title: "Pod Lifecycle",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-pod-lifecycle.json" },
      { id: "k8s-init-containers",  title: "Init Containers",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-init-containers.json" },
      { id: "k8s-sidecar-containers",  title: "Sidecar Containers",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-sidecar-containers.json" },
      { id: "k8s-multi-container-pods",  title: "Multi-container Pods",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-multi-container-pods.json" },
      { id: "k8s-pod-scheduling",  title: "Pod Scheduling",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-pod-scheduling.json" },
      { id: "k8s-pod-affinity",  title: "Pod Affinity",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-pod-affinity.json" },
      { id: "k8s-anti-affinity",  title: "Anti-Affinity",         difficulty: "advanced",    estimatedMinutes: 15, file: "k8s-anti-affinity.json" },
      { id: "k8s-taints",  title: "Taints",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-taints.json" },
      { id: "k8s-tolerations",  title: "Tolerations",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-tolerations.json" },
      { id: "k8s-pod-priority",  title: "Pod Priority",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-pod-priority.json" },
      { id: "k8s-pdb",  title: "Pod Disruption Budget",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-pdb.json" },
      { id: "k8s-rolling-updates",  title: "Rolling Updates",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-rolling-updates.json" },
      { id: "k8s-rollback",  title: "Rollback",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-rollback.json" },
      { id: "k8s-replica-management",  title: "Replica Management",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-replica-management.json" },
      { id: "k8s-deployment-strategy",  title: "Deployment Strategy",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-deployment-strategy.json" },
      { id: "k8s-canary-deployment",  title: "Canary Deployment",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-canary-deployment.json" },
      { id: "k8s-blue-green-deployment",  title: "Blue Green Deployment",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-blue-green-deployment.json" },
      { id: "k8s-clusterip",  title: "ClusterIP",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-clusterip.json" },
      { id: "k8s-nodeport",  title: "NodePort",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-nodeport.json" },
      { id: "k8s-loadbalancer",  title: "LoadBalancer",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-loadbalancer.json" },
      { id: "k8s-externalname",  title: "ExternalName",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-externalname.json" },
      { id: "k8s-headless-service",  title: "Headless Service",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-headless-service.json" },
      { id: "k8s-service-discovery",  title: "Service Discovery",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-service-discovery.json" },
      { id: "k8s-configmap-create",  title: "Create ConfigMap",         difficulty: "beginner",    estimatedMinutes: 5, file: "k8s-configmap-create.json" },
      { id: "k8s-configmap-env",  title: "Environment Variables",         difficulty: "beginner",    estimatedMinutes: 5, file: "k8s-configmap-env.json" },
      { id: "k8s-configmap-volume",  title: "Mount as Volume",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-configmap-volume.json" },
      { id: "k8s-configmap-update",  title: "Update ConfigMap",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-configmap-update.json" },
      { id: "k8s-secret-opaque",  title: "Opaque Secret",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-secret-opaque.json" },
      { id: "k8s-secret-tls",  title: "TLS Secret",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-secret-tls.json" },
      { id: "k8s-secret-regcred",  title: "Docker Registry Secret",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-secret-regcred.json" },
      { id: "k8s-secret-encryption",  title: "Secret Encryption",         difficulty: "advanced",    estimatedMinutes: 15, file: "k8s-secret-encryption.json" },
      { id: "k8s-secret-management",  title: "Secret Management",         difficulty: "advanced",    estimatedMinutes: 15, file: "k8s-secret-management.json" },
      { id: "k8s-storage-pv",  title: "Persistent Volumes",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-storage-pv.json" },
      { id: "k8s-storage-pvc",  title: "Persistent Volume Claims",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-storage-pvc.json" },
      { id: "k8s-dynamic-provisioning",  title: "Dynamic Provisioning",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-dynamic-provisioning.json" },
      { id: "k8s-csi-drivers",  title: "CSI Drivers",         difficulty: "advanced",    estimatedMinutes: 15, file: "k8s-csi-drivers.json" },
      { id: "k8s-storage-local",  title: "Local Storage",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-storage-local.json" },
      { id: "k8s-storage-cloud",  title: "Cloud Storage",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-storage-cloud.json" },
      { id: "k8s-ingress-controller",  title: "Ingress Controller",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-ingress-controller.json" },
      { id: "k8s-nginx-ingress",  title: "NGINX Ingress",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-nginx-ingress.json" },
      { id: "k8s-traefik",  title: "Traefik",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-traefik.json" },
      { id: "k8s-haproxy",  title: "HAProxy",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-haproxy.json" },
      { id: "k8s-ingress-tls",  title: "TLS",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-ingress-tls.json" },
      { id: "k8s-ssl-certificates",  title: "SSL Certificates",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-ssl-certificates.json" },
      { id: "k8s-host-routing",  title: "Host Routing",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-host-routing.json" },
      { id: "k8s-path-routing",  title: "Path Routing",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-path-routing.json" },
      { id: "k8s-hpa",  title: "Horizontal Pod Autoscaler (HPA)",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-hpa.json" },
      { id: "k8s-vpa",  title: "Vertical Pod Autoscaler (VPA)",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-vpa.json" },
      { id: "k8s-cluster-autoscaler",  title: "Cluster Autoscaler",         difficulty: "advanced",    estimatedMinutes: 15, file: "k8s-cluster-autoscaler.json" },
      { id: "k8s-scaling-manual",  title: "Manual Scaling",         difficulty: "beginner",    estimatedMinutes: 5, file: "k8s-scaling-manual.json" },
      { id: "k8s-auto-scaling",  title: "Auto Scaling",         difficulty: "advanced",    estimatedMinutes: 15, file: "k8s-auto-scaling.json" },
      { id: "k8s-cluster-networking",  title: "Cluster Networking",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-cluster-networking.json" },
      { id: "k8s-dns",  title: "DNS",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-dns.json" },
      { id: "k8s-coredns",  title: "CoreDNS",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-coredns.json" },
      { id: "k8s-cni",  title: "CNI",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-cni.json" },
      { id: "k8s-calico",  title: "Calico",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-calico.json" },
      { id: "k8s-flannel",  title: "Flannel",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-flannel.json" },
      { id: "k8s-weave",  title: "Weave",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-weave.json" },
      { id: "k8s-istio",  title: "Istio",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-istio.json" },
      { id: "k8s-linkerd",  title: "Linkerd",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-linkerd.json" },
      { id: "k8s-service-mesh",  title: "Service Mesh",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-service-mesh.json" },
      { id: "k8s-lb-internal",  title: "Internal Load Balancer",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-lb-internal.json" },
      { id: "k8s-lb-external",  title: "External Load Balancer",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-lb-external.json" },
      { id: "k8s-lb-layer4",  title: "Layer 4 Load Balancer",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-lb-layer4.json" },
      { id: "k8s-lb-layer7",  title: "Layer 7 Load Balancer",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-lb-layer7.json" },
      { id: "k8s-lb-round-robin",  title: "Round Robin",         difficulty: "beginner",    estimatedMinutes: 5, file: "k8s-lb-round-robin.json" },
      { id: "k8s-lb-least-connections",  title: "Least Connections",         difficulty: "intermediate",    estimatedMinutes: 5, file: "k8s-lb-least-connections.json" },
      { id: "k8s-lb-sticky-sessions",  title: "Sticky Sessions",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-lb-sticky-sessions.json" },
      { id: "k8s-lb-health-checks",  title: "Health Checks",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-lb-health-checks.json" },
      { id: "k8s-nginx-basics",  title: "NGINX Basics",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-nginx-basics.json" },
      { id: "k8s-nginx-reverse-proxy",  title: "Reverse Proxy",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-nginx-reverse-proxy.json" },
      { id: "k8s-nginx-load-balancer",  title: "Load Balancer",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-nginx-load-balancer.json" },
      { id: "k8s-nginx-ssl",  title: "SSL/TLS",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-nginx-ssl.json" },
      { id: "k8s-nginx-https",  title: "HTTPS",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-nginx-https.json" },
      { id: "k8s-nginx-url-rewrite",  title: "URL Rewrite",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-nginx-url-rewrite.json" },
      { id: "k8s-nginx-compression",  title: "Compression",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-nginx-compression.json" },
      { id: "k8s-nginx-caching",  title: "Caching",         difficulty: "intermediate",    estimatedMinutes: 10, file: "k8s-nginx-caching.json" },
      { id: "k8s-nginx-rate-limiting",  title: "Rate Limiting",         difficulty: "intermediate",    estimatedMinutes: 15, file: "k8s-nginx-rate-limiting.json" },
      { id: "k8s-nginx-static-files",  title: "Static File Hosting",         difficulty: "beginner",    estimatedMinutes: 10, file: "k8s-nginx-static-files.json" },
      { id: "k8s-nginx-ingress-controller",  title: "NGINX Ingress Controller",         difficulty: "advanced",    estimatedMinutes: 20, file: "k8s-nginx-ingress-controller.json" },
      { id: "k8s-ci-cd-pipeline",  title: "Kubernetes CI/CD Pipeline",         difficulty: "advanced",    estimatedMinutes: 30, file: "k8s-ci-cd-pipeline.json" }
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
