// Comprehensive React Topic Generator - Full Interview-Ready Content
const fs = require('fs');
const path = require('path');
const dir = __dirname;

// Helpers
function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question, answer }; }
function m(question, options, answer, explanation) { return { question, options, answer, explanation }; }
function e(title, useCase, code, description) { return { title, useCase, code, description }; }
function d(heading, text) { return { heading, text }; }

// SVG components
function svgW(w, h, title, inner) {
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" style="max-width:' + w + 'px;"><defs><marker id="a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#6c9fff"/></marker></defs><rect x="10" y="10" width="' + (w-20) + '" height="' + (h-20) + '" rx="10" fill="var(--bg-card)" stroke="var(--border)" stroke-width="1"/><text x="' + (w/2) + '" y="38" fill="#e8eaed" font-size="14" font-weight="bold" text-anchor="middle">' + title + '</text>' + inner + '</svg>';
}
function R(x, y, w, h, fill, stroke, t1, t2, c1, c2) {
  var r = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5"/>';
  if (t1) r += '<text x="' + (x+w/2) + '" y="' + (y+h/2-5) + '" fill="' + (c1||'#e8eaed') + '" font-size="11" font-weight="' + (t2?'bold':'normal') + '" text-anchor="middle">' + t1 + '</text>';
  if (t2) r += '<text x="' + (x+w/2) + '" y="' + (y+h/2+12) + '" fill="' + (c2||'#9aa0b0') + '" font-size="10" text-anchor="middle">' + t2 + '</text>';
  return r;
}
function A(x1, y1, x2, y2, c) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c||'#6c9fff') + '" stroke-width="2" marker-end="url(#a)"/>'; }
function T(x, y, text, size, color, anchor) { return '<text x="' + x + '" y="' + y + '" fill="' + (color||'#9aa0b0') + '" font-size="' + (size||10) + '" text-anchor="' + (anchor||'middle') + '">' + text + '</text>'; }
function P(pts, fill, stroke, sw) { return '<polygon points="' + pts + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (sw||1.5) + '"/>'; }

// Generate all 19 topics
var topics = {};

// ========== 1. useLayoutEffect ==========
topics['react-uselayouteffect'] = {
  id:'react-uselayouteffect', title:'React useLayoutEffect', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'useLayoutEffect runs synchronously after DOM mutations but before the browser paints, unlike useEffect which runs after paint.',
    'Use useLayoutEffect when you need to read layout from the DOM and synchronously re-render before the user sees a visual flash.',
    'It blocks the browser from painting until the callback completes, so avoid expensive computations inside it.',
    'On the server, useLayoutEffect produces a warning because there is no browser DOM - use useEffect or an isomorphic pattern instead.'
  ],
  laymanDefinition:'useLayoutEffect is like a last-minute decorator who works between the time furniture is placed (DOM mutations) and when guests enter (browser paint). They can measure the room dimensions and quickly adjust decorations before anyone sees the room. useEffect, by contrast, works after guests have left - any adjustments they make will be visible as a flicker. Use useLayoutEffect when you need measurements or positions to be correct from the very first frame the user sees. Common examples: positioning a tooltip next to a button, measuring element dimensions for a layout calculation, or syncing scroll positions.',
  deepDive:[
    d('When to Use useLayoutEffect vs useEffect','useLayoutEffect fires synchronously after all DOM mutations are committed but before the browser has a chance to paint. useEffect fires asynchronously after the paint cycle completes. The rule of thumb: use useEffect by default for all side effects (data fetching, subscriptions, logging, analytics). Only reach for useLayoutEffect when you see a visual problem - typically a flash, flicker, or layout jump. Specific scenarios that demand useLayoutEffect: reading element dimensions (getBoundingClientRect, offsetHeight), measuring scroll positions, positioning absolutely-positioned elements like tooltips or dropdowns relative to a trigger, and synchronously applying scroll restoration. Every useLayoutEffect callback blocks the paint, so if it does heavy computation, the user sees a blank frame. Always measure whether useEffect actually causes a visual problem before upgrading to useLayoutEffect.'),
    d('The Flash Problem Explained','Consider a tooltip component that measures a target button and positions itself above it. With useEffect: component renders -> browser paints (user sees tooltip at default 0,0 position -> bad) -> useEffect runs -> setState with new position -> component re-renders -> browser paints again (user sees tooltip at correct position). The intermediate paint at 0,0 is the flash. With useLayoutEffect: component renders -> DOM is committed -> useLayoutEffect runs synchronously (before paint) -> setState updates position -> component re-renders -> browser paints once (user sees tooltip at correct position from the start). No flash. The same principle applies to scroll listeners, resize observers, and any case where DOM measurements drive visual output.'),
    d('Performance Implications and Best Practices','Because useLayoutEffect blocks the paint, it directly impacts perceived performance. If your callback takes 50ms, the user sees a blank screen for 50ms before anything appears. Best practices: (1) Keep useLayoutEffect callbacks extremely lightweight - do heavy computation elsewhere. (2) If you only need to read from the DOM but not write synchronously, use useEffect. (3) Consider using ResizeObserver or IntersectionObserver callbacks instead of useLayoutEffect for measurement. (4) If you need both async and sync behavior, split into two effects. (5) Profile with React DevTools to confirm useLayoutEffect is not a bottleneck. React 18s automatic batching can help reduce re-renders triggered by useLayoutEffect.'),
    d('Server-Side Rendering and Isomorphic Patterns','useLayoutEffect does not run on the server because there is no browser DOM or paint cycle. React logs a warning in the console when it detects useLayoutEffect during SSR. To handle this: (1) Use useEffect instead of useLayoutEffect for effects that do not require synchronous DOM access. (2) Use an isomorphic wrapper that checks the environment: if (typeof window === "undefined") return useEffect(fn, deps); else return useLayoutEffect(fn, deps);. (3) Libraries like react-popper and react-virtualized use this pattern to safely handle SSR. (4) In Next.js, you can use dynamic imports with ssr: false for components that must use useLayoutEffect. (5) Alternatively, use the useIsomorphicLayoutEffect pattern from popular open-source libraries that implements this check.'),
    d('useLayoutEffect in the React 18 Concurrent World','With React 18s concurrent mode, useLayoutEffect behaves the same way but with an important nuance: it guarantees that its callback runs before the browser paints the committed render, even if that render was interrupted and resumed. This makes useLayoutEffect the safest choice for imperative DOM mutations that must be visible synchronously. Note that useLayoutEffect cannot be used with Suspense data fetching in the same way as useEffect - the synchronous nature means it does not participate in the suspend/resume lifecycle. In practice, this rarely matters because layout effects are typically for DOM manipulation, not data side effects.')
  ],
  interviewAnswer:'useLayoutEffect runs synchronously after DOM mutations but before the browser paints. Its primary purpose is to read layout information (element dimensions, scroll positions) and apply synchronous visual updates without causing a visible flicker or layout jump. By default, you should always prefer useEffect because useLayoutEffect blocks the paint and can degrade perceived performance if the callback is expensive. Common use cases include tooltip positioning, scroll restoration, and measuring DOM elements. useLayoutEffect does not run on the server and produces a console warning; use an isomorphic pattern with environment detection for SSR-compatible code. In React 18 concurrent mode, useLayoutEffect guarantees its callback executes before paint even after render interruptions.',
  interviewQuestions:[
    q('What is the fundamental difference between useLayoutEffect and useEffect?','useLayoutEffect fires synchronously after DOM mutations are committed but before the browser paints. useEffect fires asynchronously after the browser completes its paint cycle. This means useLayoutEffect runs during the commit phase while useEffect runs during the passive effect phase, which occurs after painting.'),
    q('Can you describe a concrete scenario where useLayoutEffect is necessary and useEffect would cause a problem?','A tooltip component that measures a trigger button and positions itself accordingly. With useEffect: the tooltip renders at default position (0,0), the browser paints (user sees flash), useEffect reads button dimensions, setState updates position, component re-renders, browser paints again at correct position. The intermediate paint at 0,0 is the flash. useLayoutEffect eliminates this by running before the first paint.'),
    q('What happens if you use useLayoutEffect in a server-side rendered application?','React logs a warning because there is no browser DOM on the server. The effect does not execute at all during SSR. To handle this, implement the useIsomorphicLayoutEffect pattern: check typeof window and use useEffect on the server, useLayoutEffect in the browser.'),
    q('How does useLayoutEffect impact performance compared to useEffect?','useLayoutEffect blocks the browser paint. If the callback is expensive (say 100ms of computation), the user sees a blank screen for that duration. useEffect does not block paint. Therefore, useLayoutEffect should only contain lightweight synchronous DOM operations.'),
    q('In the React rendering lifecycle, where exactly does useLayoutEffect fit?','After React commits DOM mutations (render phase -> commit phase -> DOM updated) but before the browser performs its paint cycle. It runs after all synchronous DOM mutations are applied. useEffect comes after paint, during the passive effect phase.'),
    q('Can useLayoutEffect be used for data fetching?','Technically yes, but it is strongly discouraged. Data fetching is asynchronous and should not block paint. Data fetching also does not require synchronous DOM access. useEffect is the correct place for data fetching.'),
    q('What is the relationship between useLayoutEffect and the browsers requestAnimationFrame?','useLayoutEffect runs synchronously before paint. requestAnimationFrame runs right before the next paint cycle begins. useLayoutEffect runs earlier in the pipeline, which is why it can prevent the flash - it executes before the browser starts compositing the frame.'),
    q('How does React 18s automatic batching affect useLayoutEffect?','If you call setState multiple times inside useLayoutEffect, React 18 batches them into a single synchronous re-render before paint. This means you can make multiple state updates inside useLayoutEffect and only cause one synchronous re-render + one paint, improving performance.'),
    q('What happens if you forgot to provide a dependency array to useLayoutEffect?','Like useEffect, the effect runs after every render. Depending on what the effect does, this can cause infinite re-render loops (if it triggers state updates that cause re-renders). Always provide the correct dependencies.'),
    q('How do you test components that use useLayoutEffect?','Use the act() utility from React Testing Library or @testing-library/react. This ensures all layout effects are flushed before assertions. You can also mock useLayoutEffect to behave like useEffect in tests if synchronous behavior is not needed.')
  ],
  diagramSvg:svgW(720,350,'useLayoutEffect vs useEffect Timeline',
    R(30,55,200,45,'#1a1d28','#6c9fff','1. Render Phase','React calls component, computes VDOM')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#6c9fff','2. Commit Phase','React applies DOM mutations')+
    A(130,170,130,195)+
    R(30,195,200,50,'#1a1d28','#f59e0b','3. useLayoutEffect','Synchronous, before paint')+
    A(130,245,130,270)+
    R(30,270,200,45,'#1a1d28','#34d399','4. Browser Paints','User sees the frame')+
    A(130,315,130,330)+
    R(30,330,200,45,'#1a1d28','#f87171','5. useEffect','Async, after paint')+
    T(250,175,'useLayoutEffect path:',11,'#f59e0b','start')+
    T(250,192,'no extra paint before corrections',10,'#9aa0b0','start')+
    T(250,295,'useEffect path:',11,'#f87171','start')+
    T(250,312,'may cause intermediate paint flash',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Positioning a Dropdown with useLayoutEffect','Prevents menu from appearing in wrong position',
      codeBlock([
        'function DropdownMenu({ triggerRef, items, isOpen }) {',
        '  const [position, setPosition] = useState({ top: 0, left: 0 });',
        '  const menuRef = useRef(null);',
        '',
        '  useLayoutEffect(() => {',
        '    if (!isOpen || !triggerRef.current || !menuRef.current) return;',
        '',
        '    const triggerRect = triggerRef.current.getBoundingClientRect();',
        '    const menuRect = menuRef.current.getBoundingClientRect();',
        '    const viewportWidth = window.innerWidth;',
        '    const viewportHeight = window.innerHeight;',
        '',
        '    let top = triggerRect.bottom + 4;',
        '    let left = triggerRect.left;',
        '',
        '    if (left + menuRect.width > viewportWidth) {',
        '      left = viewportWidth - menuRect.width - 8;',
        '    }',
        '',
        '    if (top + menuRect.height > viewportHeight) {',
        '      top = triggerRect.top - menuRect.height - 4;',
        '    }',
        '',
        '    setPosition({ top, left });',
        '  }, [isOpen, triggerRef]);',
        '',
        '  if (!isOpen) return null;',
        '',
        '  return ReactDOM.createPortal(',
        '    <ul ref={menuRef} style={{',
        '      position: "fixed", top: position.top, left: position.left,',
        '      background: "#fff", border: "1px solid #ddd",',
        '      borderRadius: "4px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",',
        '      zIndex: 1000, listStyle: "none", minWidth: "160px"',
        '    }}>',
        '      {items.map((item, i) => (',
        '        <li key={i} style={{ padding: "8px 16px", cursor: "pointer" }}>{item}</li>',
        '      ))}',
        '    </ul>,',
        '    document.body',
        '  );',
        '}'
      ]),
      'This dropdown measures the trigger button and the menu itself, positions the menu before the first paint, clamps to viewport boundaries, and renders via portal. With useEffect, the user might briefly see the menu at (0,0) before it jumps to the correct position.'
    ),
    e('Scroll Restoration with useLayoutEffect','Maintain scroll position across navigation',
      codeBlock([
        'function useScrollRestoration(key) {',
        '  const scrollPositions = useRef({});',
        '',
        '  useEffect(() => {',
        '    return () => {',
        '      scrollPositions.current[key] = window.scrollY;',
        '    };',
        '  }, [key]);',
        '',
        '  useLayoutEffect(() => {',
        '    const saved = scrollPositions.current[key];',
        '    if (saved !== undefined) {',
        '      window.scrollTo(0, saved);',
        '    }',
        '  }, [key]);',
        '',
        '  return { scrollPositions };',
        '}',
        '',
        'function ProductListPage() {',
        '  useScrollRestoration("product-list");',
        '  const [products, setProducts] = useState([]);',
        '',
        '  useEffect(() => {',
        '    fetch("/api/products").then(r => r.json()).then(setProducts);',
        '  }, []);',
        '',
        '  return (',
        '    <div>',
        '      {products.map(p => (',
        '        <Link key={p.id} to={"/product/" + p.id}>',
        '          <div className="product-card"><h3>{p.name}</h3><p>${p.price}</p></div>',
        '        </Link>',
        '      ))}',
        '    </div>',
        '  );',
        '}'
      ]),
      'Without useLayoutEffect, scroll restoration would happen after paint, causing a visible jump from the top of the page to the saved position. useLayoutEffect restores the position before the user sees anything.'
    )
  ],
  mcqQuestions:[
    m('When does useLayoutEffect fire in the React lifecycle?',['Before DOM mutations','After DOM mutations, before browser paint','After browser paint','On every state change regardless of render'],1,'useLayoutEffect runs synchronously after DOM mutations are committed but before the browser has a chance to paint.'),
    m('What visual artifact does useLayoutEffect prevent that useEffect can cause?',['Memory leaks','Visual flicker or layout jump','Infinite loops','Network errors'],1,'When you read DOM layout and update state in useEffect, a stale paint occurs before the correction. useLayoutEffect applies corrections before the first paint, eliminating the flicker.'),
    m('What is the recommended default between useEffect and useLayoutEffect?',['Always use useLayoutEffect','Always use useEffect by default','Use useLayoutEffect for data fetching','They are interchangeable'],1,'React documentation explicitly recommends defaulting to useEffect because useLayoutEffect blocks the paint and can hurt perceived performance.'),
    m('What happens when you use useLayoutEffect during server-side rendering?',['It works normally','React logs a warning and skips it','It throws an error','It crashes the server'],1,'useLayoutEffect does not run on the server because there is no browser DOM. React logs a warning in development mode.'),
    m('Which type of operation specifically requires useLayoutEffect?',['Data fetching from an API','Synchronous DOM measurement (getBoundingClientRect)','Setting up a timer interval','Subscribing to a WebSocket'],1,'Synchronous DOM measurement that drives visual positioning requires useLayoutEffect to prevent the flash between the initial incorrect position and the corrected position.'),
    m('How does useLayoutEffect impact perceived performance?',['It always improves performance','It blocks the paint, so expensive callbacks delay the users first view','It has no impact on performance','It runs asynchronously so it never blocks'],1,'useLayoutEffect is synchronous and blocks the browser paint. If the callback takes 50ms, the user sees nothing for 50ms.')
  ]
};

// ========== 2. useMemo ==========
topics['react-usememo'] = {
  id:'react-usememo', title:'React useMemo', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'useMemo caches the result of an expensive computation between re-renders, recomputing only when dependencies change.',
    'It is a performance optimization, not a semantic guarantee - React may discard cached values under memory pressure.',
    'Only use useMemo for computationally expensive operations (O(n^2) or worse), not for trivial calculations.',
    'Overusing useMemo for every value can actually harm performance due to the overhead of dependency comparison.'
  ],
  laymanDefinition:'useMemo is like a notepad where you jot down the answer to a hard math problem so you don\'t have to solve it again unless the numbers change. When your component re-renders, instead of recalculating expensive values (like filtering a thousand items or computing a complex number), React checks the notepad and reuses the previous result if nothing changed. The key insight is that useMemo does not make the first calculation faster - it only saves time on subsequent re-renders when dependencies are unchanged. Use it sparingly: only when you have measured or can prove a computation is expensive enough to warrant the caching overhead.',
  deepDive:[
    d('How useMemo Works Internally','useMemo stores the result of the factory function in a memoization cache associated with the component fiber. On the initial render, it calls the factory function, stores the result, and returns it. On subsequent renders, it compares each dependency from the current render with the previous render using Object.is comparison. If all dependencies are equal, it returns the cached value without calling the factory function. If any dependency changed, it re-executes the factory, caches the new result, and returns it. React may evict cached values during the commit phase if component memory pressure is high - this is implementation-defined and should not be relied upon for correctness. Use useMemo only when the computation is genuinely expensive and you have confirmed it via profiling.'),
    d('When to Actually Use useMemo','The React docs recommend using useMemo only in these scenarios: (1) Skipping expensive recalculations - when a computation takes more than 1ms or processes large datasets (arrays with thousands of items). (2) Preserving referential equality for child component optimization - when passing objects or arrays as props to a memo()-ized child component. Without useMemo, every render creates a new object reference, causing the child to re-render even if the values are identical. (3) Skipping re-renders of expensive children when combined with React.memo. (4) Avoiding cascading effects - when a computed value is passed as a dependency to useEffect, preventing unnecessary effect re-runs. Profile first, optimize second - do not add useMemo preemptively.'),
    d('The Cost-Benefit Analysis of Memoization','Every useMemo call has a cost: (1) Memory cost - the cached value persists until dependencies change or the component unmounts. (2) CPU cost - dependency array comparison runs on every render using Object.is on each element. For arrays with many dependencies, this comparison itself can be significant. (3) Code complexity cost - the dependency array must be maintained correctly, and stale closures are a common bug. The benefit only outweighs these costs when: the computation is expensive (O(n^2) or worse with n > 100), or the computed value preserves referential stability for downstream memoized components. Rule of thumb: if the computation takes less than 0.5ms, useMemo adds more overhead than it saves.'),
    d('useMemo with React.memo Integration','The most common and effective use of useMemo is in combination with React.memo. Consider: <ExpensiveChild data={filteredData} />. If filteredData is computed with useMemo, the reference stays stable across renders where the source data hasnt changed. React.memo on ExpensiveChild can then skip re-rendering entirely. Without useMemo, every parent render creates a new filteredData array (even with identical contents), causing ExpensiveChild to re-render on every parent render. This pattern is especially important for large lists (FlatList, virtualization), chart components, and any component that does significant work on render. Profile before and after to confirm the optimization is effective.'),
    d('Common Pitfalls and Anti-Patterns','(1) Using useMemo for primitive values - memoizing const x = a + b is pure overhead. (2) Dependency array mismatches - lint rules with exhaustive-deps catch this, but developers often omit dependencies incorrectly. (3) Assuming useMemo guarantees the function wont re-run - React may discard cache under memory pressure. (4) Nesting useMemo too deeply in component trees - prefer extracting expensive computations to hooks or selectors. (5) Memoizing inline styles or class names - these are cheap to compute. (6) Using useMemo as a mental crutch for premature optimization - measure first with React DevTools Profiler.')
  ],
  interviewAnswer:'useMemo is a React hook that memoizes the result of a computation between re-renders. It takes a factory function and a dependency array, re-executing the factory only when dependencies change. Use useMemo only for genuinely expensive computations (processing large arrays, complex math, data transformations) or to preserve referential equality for props passed to React.memo-wrapped children. The default should be to compute values without memoization and only add useMemo after profiling confirms it is beneficial. React may discard cached values under memory pressure, so useMemo should never be relied upon for correctness - only for performance. Common anti-patterns include memoizing trivial calculations, incorrect dependency arrays, and premature optimization without profiling.',
  interviewQuestions:[
    q('What problem does useMemo solve?','It prevents expensive recalculations on every render by caching the result from the previous render and returning it when dependencies have not changed. This reduces the CPU cost of re-rendering components that perform heavy data processing.'),
    q('How does useMemo differ from useCallback?','useMemo memoizes the result of calling a function (the return value). useCallback memoizes the function itself (the reference). useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). useCallback is preferred when passing callbacks to memoized children.'),
    q('Can useMemo guarantee that the computation wont re-run?','No. React may discard cached values under memory pressure or during certain reconciliation scenarios. useMemo is strictly a performance optimization and should not be used to ensure a side effect runs only once - use useEffect for side effects.'),
    q('What is the most common legitimate use case for useMemo?','Preserving referential equality of objects/arrays passed as props to React.memo-wrapped children. Without useMemo, the child re-renders on every parent render because each render creates a new array/object reference, even with identical values.'),
    q('How should you decide whether a computation is expensive enough for useMemo?','Profile with React DevTools Profiler. If a component re-renders frequently and a specific computation takes more than 1ms or processes thousands of items, useMemo can help. As a heuristic, if the computation is O(n) or faster with small n, useMemo is unnecessary overhead.'),
    q('What happens if you omit a value from the dependency array?','The useMemo hook will not re-execute when that value changes, returning a stale result. This is caught by the react-hooks/exhaustive-deps ESLint rule. The dependency array must include every reactive value (props, state, derived values) used inside the factory function.'),
    q('How does useMemo interact with concurrent mode in React 18?','In concurrent mode, useMemo behaves identically. However, because renders can be interrupted and discarded, the memoization cache persists across render attempts for the same pending render. Once a render commits, the cache is updated with the final values.'),
    q('What is the performance cost of using useMemo unnecessarily?','(1) Memory allocation for the cached value. (2) Object.is comparison of each dependency on every render. (3) Extra function call overhead. For a trivial calculation like const double = useMemo(() => x * 2, [x]), the overhead of useMemo exceeds the cost of the computation itself.'),
    q('Can useMemo be used for functions?','Indirectly - useMemo can return a function, but useCallback is the idiomatic choice for memoizing functions. useCallback provides cleaner syntax: useCallback(fn, deps) vs useMemo(() => fn, deps).'),
    q('How do you test a component that uses useMemo?','Use React Testing Library with act(). useMemo behavior is transparent to tests - the component works identically with or without memoization, just potentially slower. Test correctness, not memoization. To test that memoization works, check that child components are not re-rendered (use jest.spyOn on the child render or check refs).')
  ],
  diagramSvg:svgW(720,300,'useMemo Flow Diagram',
    R(30,55,200,50,'#1a1d28','#6c9fff','Factory Function Called','expensiveComputation(data)')+
    A(130,105,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','Check Dependencies','Object.is comparison')+
    A(130,170,130,195)+
    R(30,195,90,50,'#1a1d28','#34d399','Same?','Return cached value')+
    R(140,195,90,50,'#1a1d28','#f87171','Changed?','Recompute & cache')+
    T(60,260,'Same dependencies => skip work',10,'#9aa0b0','start')+
    T(185,260,'Changed deps => recompute',10,'#9aa0b0','start')+
    A(120,220,120,180,34)+
    A(120,220,140,220,34)
  ),
  codeExamples:[
    e('Filtering a Large List with useMemo','Avoids re-filtering 10000 items on every render',
      codeBlock([
        'function ProductList({ products, searchTerm, category }) {',
        '  const filteredProducts = useMemo(() => {',
        '    console.log("Filtering", products.length, "items...");',
        '    return products.filter(p => {',
        '      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());',
        '      const matchesCategory = !category || p.category === category;',
        '      return matchesSearch && matchesCategory;',
        '    });',
        '  }, [products, searchTerm, category]);',
        '',
        '  return (',
        '    <ul>',
        '      {filteredProducts.map(p => (',
        '        <li key={p.id}>{p.name} - ${p.price}</li>',
        '      ))}',
        '    </ul>',
        '  );',
        '}'
      ]),
      'Without useMemo, every keystroke in the search box re-filters all 10000 items. useMemo skips filtering when only unrelated state changes (like a button toggle elsewhere in the component).'
    ),
    e('Preserving Referential Equality with React.memo','Prevents unnecessary re-renders of an expensive chart',
      codeBlock([
        'const SalesChart = React.memo(function SalesChart({ data, options }) {',
        '  useEffect(() => { /* renders chart using D3/Chart.js */ });',
        '  return <div ref={chartRef} />;',
        '});',
        '',
        'function Dashboard({ rawSales }) {',
        '  const chartData = useMemo(() => ({',
        '    labels: rawSales.map(r => r.date),',
        '    values: rawSales.map(r => r.amount),',
        '    total: rawSales.reduce((s, r) => s + r.amount, 0)',
        '  }), [rawSales]);',
        '',
        '  const chartOptions = useMemo(() => ({',
        '    responsive: true, maintainAspectRatio: false,',
        '    scales: { y: { beginAtZero: true } }',
        '  }), []);',
        '',
        '  return <SalesChart data={chartData} options={chartOptions} />;',
        '}'
      ]),
      'Without useMemo, chartData and chartOptions get new references on every render, causing SalesChart to re-render and re-render the chart even though nothing changed. useMemo ensures stable references so React.memo can skip rendering.'
    )
  ],
  mcqQuestions:[
    m('What does useMemo return?',['A memoized function','A memoized value (result of computation)','A memoized component','A memoized effect'],1,'useMemo returns the result of calling the factory function, cached until dependencies change.'),
    m('When should you use useMemo?',['For every computed value','Only for expensive computations confirmed by profiling','Never - it is deprecated','Only for JSX elements'],1,'React recommends profiling first and using useMemo only when a computation is genuinely expensive. Preemptive memoization adds overhead.'),
    m('What is useMemo(fn, []) equivalent to?',['useEffect(fn, [])','useCallback(fn, [])','useRef(fn())','useState(fn())'],1,'useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). So useCallback is just a specialization of useMemo for functions.'),
    m('If a dependency array element is an object, when will useMemo recompute?',['When any property of the object changes','When the object reference changes (Object.is)','Never for objects','Always on every render'],1,'useMemo uses Object.is comparison, which for objects means reference equality. Mutating an object property does not trigger recomputation - only a new object reference does.'),
    m('Can useMemo be used to skip re-rendering a child component?',['Yes, directly','No, useMemo alone does not skip child renders - it only memoizes values passed to children. Combine with React.memo on the child to skip renders','Yes, automatically for all children','Only with class components'],1,'useMemo prevents re-computation of values, but the child still re-renders unless it is wrapped in React.memo and receives stable props.'),
    m('What does the exhaustive-deps ESLint rule catch with useMemo?',['Missing dependencies that cause stale closures','Undefined variables in the component','Missing semicolons','Unused import statements'],1,'The react-hooks/exhaustive-deps rule ensures the dependency array includes every reactive value used inside the factory function. Missing dependencies lead to stale computed values.')
  ]
};

// ========== 3. useCallback ==========
topics['react-usecallback'] = {
  id:'react-usecallback', title:'React useCallback', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'useCallback returns a memoized version of a callback function that only changes when dependencies change.',
    'Its primary purpose is to prevent unnecessary re-renders of child components wrapped in React.memo.',
    'useCallback(fn, deps) is semantically equivalent to useMemo(() => fn, deps).',
    'Do not use useCallback for inline event handlers in the same component - the optimization only helps when passing callbacks to memoized children.'
  ],
  laymanDefinition:'useCallback is like giving someone your business card instead of rewriting your phone number on a napkin every time you meet. The function itself stays the same (same reference in memory) until its dependencies change. This matters because React.memo checks if props changed by reference - if you pass an inline arrow function as a prop, it is a new function reference every render, so React.memo sees a "change" every time and re-renders the child unnecessarily. useCallback keeps the reference stable so React.memo can actually skip renders. Like useMemo, do not add useCallback everywhere - only where profiling shows it helps.',
  deepDive:[
    d('The Referential Identity Problem','Every time a React component re-renders, all inline functions defined in the component body are recreated as new function objects in memory. Consider: <Child onClick={() => handleClick(id)} />. The arrow function is a new function reference on every render. If Child is wrapped in React.memo, it sees the onClick prop change on every parent render and cannot skip re-rendering. useCallback solves this by returning the same function reference (identity) across renders as long as dependencies have not changed. The function is only recreated when its closure variables actually change. This is the core reason useCallback exists - not to make the component faster directly, but to enable React.memo on children to work effectively.'),
    d('useCallback in the Component Lifecycle','During the render phase, useCallback checks its dependency array using Object.is comparison. If all dependencies are unchanged, it returns the previously memoized function reference. If any dependency changed, it stores and returns the new function. The old function becomes eligible for garbage collection (assuming no other references). A critical subtlety: if the callback uses state values from a closure, those values are captured at the time the callback was created. With stale closures, the callback may reference outdated state. Proper dependency management via exhaustive-deps lint rule is essential. React 18s automatic batching does not change useCallback behavior.'),
    d('Common Misconceptions and Overuse','The most common mistake is wrapping every event handler in useCallback, assuming it is a free optimization. In reality: (1) useCallback adds overhead - the dependency comparison runs on every render. (2) For handlers used on native DOM elements (<button onClick={handler}>), React.memo on DOM elements is irrelevant. (3) For handlers passed to non-memoized children, useCallback provides zero benefit because the child re-renders anyway. (4) The dependency array must be correct - omitting a dependency can cause the callback to reference stale values, leading to subtle bugs. (5) If the callback does expensive work internally, useMemo on the result is more appropriate than useCallback on the function.'),
    d('useCallback vs useMemo for Functions','useCallback(fn, deps) is exactly equivalent to useMemo(() => fn, deps). The React team added useCallback as syntactic sugar because memoizing functions is such a common pattern (passing callbacks to children). Use useCallback when you want to memoize a function reference. Use useMemo when you want to memoize a computed value (object, array, primitive). A common pattern: useCallback for callbacks, useMemo for data objects. Both hooks share the same internal implementation - useCallback is literally implemented as useMemo in React\'s source code.'),
    d('Best Practices for Production Use','(1) Always pair useCallback with React.memo on the receiving child - without React.memo, useCallback provides no rendering benefit. (2) Use the exhaustive-deps lint rule to catch missing dependencies. (3) In custom hooks, always return memoized callbacks via useCallback so consumers can memoize effectively. (4) For callbacks used in useEffect dependencies, useCallback helps prevent unnecessary effect re-runs. (5) In React 18 with automatic batching, multiple state updates inside a callback are batched automatically - useCallback does not affect this. (6) Consider using useEvent (React 18 experimental) or useMemoizedFn (from ahooks) for callbacks that should always have a stable identity regardless of dependencies.')
  ],
  interviewAnswer:'useCallback memoizes a function reference between re-renders. It is equivalent to useMemo(() => fn, deps) and exists to enable React.memo child components to skip re-rendering when the function identity is the only thing that changed. Without useCallback, every render creates a new function reference, making React.memo ineffective for children that receive callbacks. The optimization only provides value when: (1) the receiving child is wrapped in React.memo, AND (2) the function is recreated on every render unnecessarily. Do not wrap every handler in useCallback - profile first. Incorrect dependency arrays cause stale closures, caught by the exhaustive-deps lint rule.',
  interviewQuestions:[
    q('What problem does useCallback solve?','It preserves the reference identity of a function between renders so that React.memo-wrapped child components can detect that the callback prop hasnt actually changed and skip re-rendering. Without useCallback, every render creates a new function object, defeating React.memo.'),
    q('How is useCallback implemented internally?','useCallback(fn, deps) is identical to useMemo(() => fn, deps). React specialized it as a separate hook for developer convenience and readability. Internally, both store the memoized value in the hooks list of the fiber node and compare dependencies with Object.is on each render.'),
    q('Does useCallback prevent the function from being recreated?','Yes and no. The function expression still runs on every render (because it is in the component body). But the OLD function reference is reused from the cache if dependencies have not changed. The new function object created during render is discarded. This is why the function body captures closure values at render time.'),
    q('What is the only scenario where useCallback provides a rendering performance benefit?','When the callback is passed as a prop to a child component wrapped in React.memo. Without React.memo, the child re-renders regardless of prop identity. With React.memo and stable callback references, the child\'s render can be skipped entirely.'),
    q('What happens if you use useCallback without a dependency array?','useCallback(fn) with no array runs the callback creation every render and returns a new function each time - it provides zero memoization. With an empty array useCallback(fn, []), the function reference is stable forever but captures the initial closure values, which is usually incorrect for callbacks that use state or props.'),
    q('How does useCallback interact with useEffect?','If a callback is listed as a dependency of useEffect, wrapping it in useCallback prevents the effect from re-running on every render. Without useCallback, the effect sees a new callback reference on every render and re-runs unnecessarily.'),
    q('Can useCallback cause stale closures?','Yes. If you omit a state variable from the dependency array, the callback captures the value at the time it was last memoized (not the current value). This leads to bugs where the callback uses outdated state. The exhaustive-deps lint rule catches this.'),
    q('What is the performance cost of adding useCallback unnecessarily?','(1) The dependecy array comparison runs on every render (Object.is on each element). (2) Extra memory allocation for the memoization cache. (3) React must store and manage additional hook state in the fiber. For most handlers, the cost of creating a new function is negligible compared to these overheads.'),
    q('In concurrent mode, does useCallback behave differently?','No. useCallback behaves identically in concurrent mode. However, because renders can be interrupted, the memoized function reference from an interrupted render is discarded in favor of the previous committed render\'s reference. This ensures consistency.'),
    q('What is the recommended alternative to useCallback for custom hooks?','Custom hooks should always wrap returned functions in useCallback so consumers can use React.memo effectively. Libraries like ahooks provide useMemoizedFn which always returns a stable reference while always calling the latest function body, combining the best of both approaches.')
  ],
  diagramSvg:svgW(720,300,'useCallback Mechanism',
    R(30,55,200,45,'#1a1d28','#6c9fff','Component Render','New inline function created')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','useCallback Check','Object.is on deps array')+
    A(130,170,130,195)+
    R(30,195,90,50,'#1a1d28','#34d399','Unchanged?','Return cached fn ref')+
    R(140,195,90,50,'#1a1d28','#f87171','Changed?','Return NEW fn ref')+
    T(60,260,'Child memo sees stable ref => skip render',9,'#9aa0b0','start')+
    T(185,260,'Child memo sees new ref => re-render',9,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Preventing Unnecessary Child Renders with useCallback','Without useCallback, the child re-renders on every keystroke in the parent form',
      codeBlock([
        'const SubmitButton = React.memo(({ onPress, label }) => {',
        '  console.log("SubmitButton render");',
        '  return <button onClick={onPress}>{label}</button>;',
        '});',
        '',
        'function RegistrationForm() {',
        '  const [name, setName] = useState("");',
        '  const [email, setEmail] = useState("");',
        '',
        '  const handleSubmit = useCallback(() => {',
        '    console.log("Submit with:", { name, email });',
        '    api.register({ name, email });',
        '  }, [name, email]);',
        '',
        '  return (',
        '    <div>',
        '      <input value={name} onChange={e => setName(e.target.value)} />',
        '      <input value={email} onChange={e => setEmail(e.target.value)} />',
        '      <SubmitButton onPress={handleSubmit} label="Register" />',
        '    </div>',
        '  );',
        '}'
      ]),
      'Without useCallback, every keystroke creates a new handleSubmit function, causing SubmitButton to re-render despite React.memo. With useCallback, the reference changes only when name or email change.'
    ),
    e('Stable Callback in a Custom Hook with useCallback','Custom hooks should return memoized functions for consumer optimization',
      codeBlock([
        'function useDebouncedValue(value, delay) {',
        '  const [debounced, setDebounced] = useState(value);',
        '',
        '  useEffect(() => {',
        '    const timer = setTimeout(() => setDebounced(value), delay);',
        '    return () => clearTimeout(timer);',
        '  }, [value, delay]);',
        '',
        '  const clear = useCallback(() => {',
        '    setDebounced(value);',
        '  }, [value]);',
        '',
        '  return [debounced, useCallback(() => setDebounced(""), [])];',
        '}',
        '',
        'function SearchPage() {',
        '  const [query, setQuery] = useState("");',
        '  const [debounced, clearSearch] = useDebouncedValue(query, 300);',
        '',
        '  useEffect(() => {',
        '    if (debounced) fetch("/search?q=" + debounced);',
        '  }, [debounced]);',
        '',
        '  return (',
        '    <div>',
        '      <input value={query} onChange={e => setQuery(e.target.value)} />',
        '      <ClearButton onClear={clearSearch} />',
        '    </div>',
        '  );',
        '}'
      ]),
      'The useDebouncedValue hook wraps returned functions in useCallback so that the consuming component can pass them to memoized children without causing extra renders.'
    )
  ],
  mcqQuestions:[
    m('What is useCallback(fn, deps) equivalent to?',['useEffect(() => fn, deps)','useMemo(() => fn, deps)','useRef(fn)','useState(() => fn)'],1,'useCallback is syntax sugar over useMemo(() => fn, deps). Both return a memoized reference.'),
    m('Which condition is necessary for useCallback to improve render performance?',['The function must do expensive work','The child component must be wrapped in React.memo','The function must have no dependencies','The function must be async'],1,'useCallback only helps when the child receiving the callback is wrapped in React.memo, allowing the child to detect that the callback reference is stable and skip re-rendering.'),
    m('What happens if a dependency is missing from the useCallback array?',['The callback always uses the latest value anyway','The callback captures a stale value from when it was last memoized','React throws a warning but auto-fixes it','The dependency is inferred automatically'],1,'Missing dependencies cause stale closures where the callback references outdated state. The exhaustive-deps lint rule catches this.'),
    m('What is the overhead of adding useCallback unnecessarily?',['No overhead - it is always free','Dependency comparison on every render + memory for cache + hook state management','It slows down the first render only','It only affects production builds'],1,'Every useCallback call adds Object.is comparison of each dependency on every render, plus memory overhead for the cache. The cost is small but nonzero.'),
    m('Does useCallback prevent the function body from being evaluated on every render?',['No, the function expression still evaluates every render to produce the new function object. useCallback just discards it if deps unchanged','Yes, the function body is skipped entirely when deps are unchanged','It depends on the JavaScript engine','Only in strict mode'],1,'The function expression (e.g., () => handleClick()) runs every render as part of normal JS execution. useCallback only decides whether to return the old or new function reference.'),
    m('When is the most effective use case for useCallback?',['When the callback is passed to a native DOM element','When the callback is passed to a memoized child and the callback depends on props/state','When the callback is used in setTimeout','When the callback is async'],1,'The ideal scenario: a React.memo child receives a callback that depends on changing state, and without useCallback would cause the child to re-render on every parent render.')
  ]
};

// ========== 4. useRef ==========
topics['react-useref'] = {
  id:'react-useref', title:'React useRef', difficulty:'beginner', estimatedMinutes:20,
  tldr:[
    'useRef creates a mutable reference that persists across re-renders without causing re-renders when its value changes.',
    'Commonly used for DOM element references (ref={ref}) and for storing mutable values that should not trigger re-renders.',
    'The ref object has a .current property that can be read and written freely without causing component updates.',
    'useRef is the same as creating { current: initialValue } manually, except React guarantees the same object reference across renders.'
  ],
  laymanDefinition:'useRef is like a secret pocket notebook that React does not watch. When you write something in it, React does not re-render the component (unlike state, where every change causes a re-render). This makes it perfect for remembering things between renders without triggering updates. The most common use is holding a reference to a DOM element: <div ref={myRef}> gives you access to the actual HTML element. You can also use it to store interval IDs, previous values, or any mutable data that should survive re-renders but should not cause re-renders when changed.',
  deepDive:[
    d('useRef vs useState: The Fundamental Difference','useState creates state that triggers a re-render when updated. useRef creates a mutable container whose updates never trigger re-renders. When you change ref.current, the component does not re-render. This makes useRef ideal for: (1) Storing values that need to persist across renders but should not cause re-renders (e.g., interval IDs, timer handles, WebSocket connections). (2) Accessing DOM nodes imperatively. (3) Keeping track of previous values. (4) Storing expensive class instances (like D3 charts, Three.js scenes) that should be created once and reused across renders. The ref object itself is created once and the same reference is returned on every render - this is guaranteed by React.'),
    d('Refs and the DOM: The most common use case','The most widespread use of useRef is to access DOM elements. When you pass a ref to an element\'s ref attribute (e.g., <input ref={inputRef} />), React assigns the DOM node to inputRef.current after the component mounts AND after every update. This enables imperative operations: focusing inputs, measuring element dimensions (getBoundingClientRect), managing media playback, integrating with non-React libraries (D3, Chart.js, jQuery), and controlling scroll positions. Refs are set before useLayoutEffect runs and before useEffect runs. Note: you cannot use refs to access DOM during the render phase (ref.current is null during render for the initial mount).'),
    d('Advanced Patterns: Callback Refs and Ref Forwarding','For dynamic scenarios (like a list of unknown length), callback refs provide more flexibility: <div ref={(node) => { if (node) measure(node); }} />. The callback receives the DOM node when it mounts and null when it unmounts. For passing refs through component boundaries (e.g., from a parent to an <input> inside a child), use React.forwardRef in the child component. This allows the parent to focus the child\'s input imperatively. Refs can also be shared via props (avoiding forwardRef if desired, though forwardRef is the idiomatic pattern). In React 18, useImperativeHandle combined with forwardRef allows the child to expose a custom API (like focus, scrollTo, reset) to the parent.'),
    d('Storing Previous Values and Instance Variables','A powerful pattern is tracking previous values: useRef to store the previous state or props value, updated in useEffect. Similarly, useRef replaces instance variables from class components. In a class: this.intervalId = setInterval(...). In a function component: const intervalRef = useRef(); intervalRef.current = setInterval(...);. The ref persists across renders without causing re-renders when updated. This is especially useful for: (1) Debouncing/throttling - store the timer ID to cancel it on cleanup. (2) Tracking render count - increment ref.current on every render. (3) Storing component lifecycle flags - isMounted ref to avoid setting state on unmounted components.'),
    d('Refs in Concurrent Mode and StrictMode','In React 18 concurrent mode, ref behavior is consistent but with important nuances: (1) During development with StrictMode, effects are double-invoked, which means refs may be set, cleared, and set again on mount. (2) In concurrent mode, renders can be interrupted and discarded. However, ref mutations are visible immediately and are not rolled back if a render is discarded - this is usually fine because refs are imperative escape hatches. (3) The useRef hook itself is safe in concurrent mode because it does not depend on the render lifecycle - the ref object is created once and the same reference persists. (4) Avoid using refs as a synchronization mechanism for concurrent features - use state or transitions instead.')
  ],
  interviewAnswer:'useRef provides a mutable object with a .current property that persists across component re-renders without triggering re-renders when updated. It is primarily used for DOM element access (via the ref attribute), storing mutable values (timer IDs, interval handles), tracking previous state, and holding expensive instances that should be created once. The same ref object reference is returned on every render. Unlike state, updating ref.current does not cause a re-render, making it ideal for values that change frequently but do not require UI updates. Refs are set after DOM mutations during the commit phase, meaning they are accessible in useLayoutEffect and useEffect but not during initial render.',
  interviewQuestions:[
    q('What is the main difference between useRef and useState?','useRef updates do NOT trigger re-renders. useState updates trigger a re-render. useRef is for values that persist across renders without causing UI updates. useState is for values that drive the UI and should cause re-renders when changed.'),
    q('When does ref.current get populated with a DOM node?','After the component mounts, during the commit phase. Ref assignment happens after DOM mutations are applied but before useLayoutEffect runs. During the initial render (before commit), ref.current is still the initial value (usually null).'),
    q('Can you use useRef to force a re-render?','Yes, indirectly. You can store a counter in useRef and update it with useState to trigger re-renders. But this is an anti-pattern - if you need re-renders, use useState directly. A common pattern is using useRef with a forceUpdate function to re-render when the ref changes.'),
    q('What is the difference between useRef and creating { current: value } manually?','React guarantees that useRef returns the SAME object reference on every render. Creating { current: value } in the component body creates a new object every render. useRef also integrates with the React fiber lifecycle for cleanup during unmount.'),
    q('How do callback refs differ from useRef?','Callback refs are functions called by React when a DOM node mounts/unmounts. They provide more control: you receive the node as a parameter and can clean up when null is passed. useRef returns a ref object with a .current property that gets automatically populated.'),
    q('What is forwardRef and when do you need it?','forwardRef is a React API that lets a parent component pass a ref down to a DOM element inside a child component. It is needed because ref is not a prop - it is handled specially by React. forwardRef allows the child to accept a ref parameter and attach it to an internal DOM element.'),
    q('Can useRef store a function?','Yes, useRef can store any value including functions. This is useful for creating stable function references that always call the latest callback without re-rendering. Libraries like useMemoizedFn use this pattern internally.'),
    q('What is the useImperativeHandle hook used for?','useImperativeHandle customizes the instance value exposed by a forwardRef. Instead of exposing the raw DOM node, you can expose a limited API: { focus: () => inputRef.current.focus(), reset: () => inputRef.current.value = "" }. This encapsulates the implementation details.'),
    q('Does changing ref.current in useEffect cause an infinite loop?','No, because updating ref.current does not trigger a re-render. Unlike setState in useEffect (which would cause a re-render and re-run the effect), ref updates are silent.'),
    q('How do you test components that use useRef for DOM access?','Use React Testing Library. The ref is automatically populated when the component renders. You can assert on the DOM node: expect(inputRef.current).toBe(inputElement). For testing focus/blur, use element.focus() and check document.activeElement.')
  ],
  diagramSvg:svgW(720,280,'useRef Object Lifecycle',
    R(30,55,200,45,'#1a1d28','#6c9fff','1st Render','useRef creates { current: init }')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#34d399','Commit Phase','DOM node set to ref.current')+
    A(130,170,130,195)+
    R(30,195,200,45,'#1a1d28','#f59e0b','2nd+ Render','Same ref object returned')+
    T(260,78,'ref.current = timerId, prevValue, DOM node',11,'#9aa0b0','start')+
    T(260,150,'ref.current is now accessible',11,'#9aa0b0','start')+
    T(260,218,'No re-render triggered on ref.current change',11,'#9aa0b0','start')
  ),
  codeExamples:[
    e('DOM Focus and Measurement with useRef','Focus input on mount and measure element dimensions',
      codeBlock([
        'function AutoFocusInput() {',
        '  const inputRef = useRef(null);',
        '',
        '  useLayoutEffect(() => {',
        '    inputRef.current.focus();',
        '    console.log("Input width:", inputRef.current.offsetWidth);',
        '  }, []);',
        '',
        '  return <input ref={inputRef} placeholder="I am auto-focused" />;',
        '}',
        '',
        'function MeasureExample() {',
        '  const [rect, setRect] = useState(null);',
        '  const divRef = useRef(null);',
        '',
        '  useEffect(() => {',
        '    const observer = new ResizeObserver(entries => {',
        '      const entry = entries[0];',
        '      setRect(entry.contentRect);',
        '    });',
        '    if (divRef.current) observer.observe(divRef.current);',
        '    return () => observer.disconnect();',
        '  }, []);',
        '',
        '  return (',
        '    <div ref={divRef}>',
        '      <p>Width: {rect?.width}px, Height: {rect?.height}px</p>',
        '    </div>',
        '  );',
        '}'
      ]),
      'useRef provides direct imperative access to DOM nodes for focus management, measurements, and integration with non-React APIs like ResizeObserver.'
    ),
    e('Tracking Previous Value with useRef','Compare current value with previous value on each update',
      codeBlock([
        'function usePrevious(value) {',
        '  const ref = useRef();',
        '  useEffect(() => { ref.current = value; });',
        '  return ref.current;',
        '}',
        '',
        'function Counter() {',
        '  const [count, setCount] = useState(0);',
        '  const prevCount = usePrevious(count);',
        '',
        '  return (',
        '    <div>',
        '      <p>Now: {count}, Before: {prevCount}</p>',
        '      <p>Direction: {count > prevCount ? "Up" : count < prevCount ? "Down" : "Same"}</p>',
        '      <button onClick={() => setCount(c => c + 1)}>+</button>',
        '      <button onClick={() => setCount(c => c - 1)}>-</button>',
        '    </div>',
        '  );',
        '}',
        '',
        '// === Practical: Timer with cleanup ===',
        'function Timer() {',
        '  const intervalRef = useRef(null);',
        '  const [count, setCount] = useState(0);',
        '',
        '  useEffect(() => {',
        '    intervalRef.current = setInterval(() => {',
        '      setCount(c => c + 1);',
        '    }, 1000);',
        '    return () => clearInterval(intervalRef.current);',
        '  }, []);',
        '',
        '  const stopTimer = () => {',
        '    clearInterval(intervalRef.current);',
        '  };',
        '',
        '  return <div><p>Count: {count}</p><button onClick={stopTimer}>Stop</button></div>;',
        '}'
      ]),
      'useRef is ideal for storing mutable values that should not trigger re-renders. The usePrevious pattern compares state across renders. The timer pattern stores the interval ID for imperative cancellation.'
    )
  ],
  mcqQuestions:[
    m('Which of the following is true about useRef?',['Updating ref.current triggers a re-render','The ref object is created on every render','Updating ref.current does NOT trigger a re-render','useRef can only store DOM nodes'],1,'useRef updates are silent - they never cause a re-render. This is the fundamental difference from useState.'),
    m('When can you safely read ref.current to get a DOM node?',['During the render phase','After the component mounts (in useEffect/useLayoutEffect)','In the function body before return','At any time including during initial render'],1,'During initial render, ref.current is null because the DOM node does not exist yet. It gets populated during the commit phase, so it is accessible in effects but not during the render function.'),
    m('What does forwardRef do?',['Creates a ref in the parent component','Allows a parent to pass a ref through a child to its DOM element','Blocks refs from being passed to children','Automatically generates refs for all DOM elements'],1,'forwardRef is a higher-order component that lets a child receive a ref from its parent and attach it to a child DOM element, enabling imperative access from the parent.'),
    m('What is the purpose of useImperativeHandle?',['To prevent refs from being used','To customize the value exposed by a forwarded ref','To create a ref that only works in production','To automatically focus an input'],1,'useImperativeHandle works with forwardRef to define what the parent receives - typically a limited API object like { focus, reset } instead of the raw DOM node.'),
    m('What happens if you pass a ref to a functional component without forwardRef?',['React ignores the ref and logs a warning','The ref works normally','React throws an error','The ref attaches to the parent component'],1,'Functional components do not accept refs by default. Without forwardRef, the ref prop is ignored and React logs a warning that function components cannot be given refs.'),
    m('Can useRef be used to store the return value of setInterval?',['Yes - useRef can store any mutable value','No - useRef only stores DOM nodes','Yes but it triggers a re-render','No - useRef cannot store numbers'],1,'useRef can store any value including interval IDs, timer handles, WebSocket connections, or any other mutable data. Updating ref.current does not cause re-renders, making it ideal for timer handles.')
  ]
};

// ========== 5. useReducer ==========
topics['react-usereducer'] = {
  id:'react-usereducer', title:'React useReducer', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'useReducer manages complex state logic with actions and a reducer function, similar to Redux but built into React.',
    'It is preferred over useState when state transitions depend on previous state in complex ways or when multiple state values need to update together.',
    'The reducer is a pure function (state, action) => newState that must not have side effects.',
    'useReducer enables predictable state management and makes testing state logic easier by extracting the reducer into a standalone pure function.'
  ],
  laymanDefinition:'useReducer is like having a centralized rulebook (reducer) for how state can change. Instead of directly setting state with setState, you dispatch actions that describe what happened (like "INCREMENT" or "ADD_TODO") and let the reducer decide how the state should change based on those rules. This makes state updates predictable and debuggable because all the logic lives in one function. It is most useful when state is an object with multiple fields that change together, or when the next state depends on the previous state in complex ways. Think of it as a mini Redux without the extra library.',
  deepDive:[
    d('The Reducer Pattern: State, Action, Dispatch','useReducer follows the same pattern as Redux. The three core concepts: (1) State - a single value (often an object) representing the current state. (2) Action - an object describing what happened, typically with a type property and optional payload: { type: "ADD_TODO", payload: { text: "Learn React" } }. (3) Dispatch - a function that sends actions to the reducer: dispatch({ type: "INCREMENT" }). The reducer receives the current state and an action and returns the new state. The reducer must be a pure function - no side effects, no API calls, no random values. This purity makes the state transitions predictable and testable.'),
    d('useReducer vs useState: When to Choose Which','useState is simpler and sufficient for: independent primitive values, simple toggle or counter state, and state with only one or two fields. useReducer is better for: (1) Complex state objects with multiple fields that depend on each other (e.g., a form with name, email, errors, isSubmitting). (2) State transitions that require the previous state to compute the next state. (3) State logic scattered across multiple event handlers - centralizing it in the reducer makes it manageable. (4) State that needs to be tested independently of the component. (5) State where some actions require fetching or async work (combined with useEffect). Rule of thumb: if you find yourself calling setState three or more times in a single event handler, consider useReducer.'),
    d('Reducer Best Practices and Patterns','(1) Use action types as constants (or string literals in a switch). (2) Always return a new state object - do not mutate the previous state. (3) Use TypeScript for action types with discriminated unions for type safety. (4) Extract the reducer function outside the component for testability. (5) Use action creators (functions that return action objects) to encapsulate action shape. (6) For async workflows, dispatch actions inside useEffect: dispatch({ type: "FETCH_START" }) before the fetch, then dispatch({ type: "FETCH_SUCCESS", payload: data }) or FETCH_ERROR. (7) Use immer\'s produce for complex nested state updates to avoid deep cloning. (8) Keep reducers pure - no Math.random(), Date.now(), or API calls inside the reducer.'),
    d('useReducer with Context for Global State','useReducer combined with React Context provides a lightweight state management solution without external libraries. Pattern: (1) Create a context: const CounterContext = createContext(). (2) Create a provider component that uses useReducer and passes [state, dispatch] via context. (3) Wrap the app with the provider. (4) Consumer components call useContext(CounterContext) to read state and dispatch actions. This pattern avoids prop drilling for state that many components need. Unlike Redux, it does not have middleware or devtools built in, but for medium-sized apps it is often sufficient. The context value should be memoized if performance is a concern (split into separate contexts for state and dispatch).'),
    d('Testing Reducers and useReducer Components','Reducer functions are pure functions, making them trivially testable: call the reducer with known state and action, assert the returned state. This is the biggest advantage over useState - the state logic can be tested without rendering components. For testing the component that uses useReducer: (1) Use React Testing Library with act() to wrap dispatches. (2) Test that dispatching an action produces the expected UI change. (3) For async reducers (dispatching in useEffect), use waitFor or findBy queries. (4) The reducer itself can be tested with plain Jest: expect(reducer(initialState, { type: "INCREMENT" })).toEqual({ count: 1 }).')
  ],
  interviewAnswer:'useReducer is a React hook for managing complex state transitions with a reducer function and dispatched actions. It is preferable to useState when state logic is complex (multiple fields, interdependent updates), when the next state depends heavily on the previous state, or when state logic should be testable as a pure function. The reducer is always a pure function that takes (state, action) and returns newState. useReducer can be combined with React Context for lightweight global state management without Redux. The tradeoff is more boilerplate than useState, but much better predictability and testability for complex state scenarios.',
  interviewQuestions:[
    q('What is the difference between useState and useReducer?','useState is simpler - directly sets a new value. useReducer uses a reducer function and actions to update state. useReducer is better for complex state (multiple fields, interdependent updates) while useState is better for simple independent state values.'),
    q('Why must a reducer be a pure function?','Purity ensures predictable state transitions. If the reducer had side effects (API calls, random values, mutations), the same action on the same state could produce different results, breaking the predictability that makes useReducer valuable. Pure reducers are also testable and support time-travel debugging.'),
    q('What is the typical shape of an action object?','An action is usually an object with a type property (string or symbol describing the action) and an optional payload property with data: { type: "ADD_TODO", payload: { id: 1, text: "Learn React" } }. Some conventions use { type, payload } from Redux, while others use { type, ...rest }.'),
    q('How do you handle async operations with useReducer?','Async logic should not be inside the reducer. Instead, perform async work in useEffect or event handlers, then dispatch different actions based on the result: dispatch({ type: "FETCH_START" }), then on success dispatch({ type: "FETCH_SUCCESS", payload: data }), or on error dispatch({ type: "FETCH_ERROR", payload: error }).'),
    q('Can useReducer replace Redux?','For medium-sized apps, useReducer with Context can replace Redux. However, Redux provides middleware (thunk, saga), DevTools, action normalization, and performance optimizations that useReducer + Context does not have. For large enterprise apps, Redux is still the standard.'),
    q('How do you test a reducer?','Since reducers are pure functions, you call them directly with known inputs and assert outputs: expect(reducer(initialState, { type: "INCREMENT" })).toEqual({ count: 1 }). No component rendering needed.'),
    q('What is the initializer function in useReducer?','useReducer accepts an optional third argument - an initializer function: useReducer(reducer, initialArg, init). The init function receives initialArg and returns the initial state. This is useful for computing initial state from props or localStorage.'),
    q('What happens if the reducer mutates state directly?','React compares state using Object.is. If you mutate the previous state object (e.g., state.count++) instead of returning a new object, React will not detect the change and the component will not re-render. Always return a new object from the reducer.'),
    q('How does useReducer work with React 18 concurrent mode?','useReducer works consistently in concurrent mode. dispatch from useReducer does NOT trigger an immediate re-render in concurrent mode - it schedules an update. This means reading state synchronously after dispatch might return the old state. For synchronous reads, use useRef to track the latest state.'),
    q('What is the performance benefit of useReducer over multiple useState calls?','useReducer avoids multiple re-renders caused by sequential setState calls. A single dispatch can update multiple state fields simultaneously, resulting in one render instead of multiple renders. React 18s automatic batching already mitigates this for useState, but useReducer still provides cleaner code organization for complex updates.')
  ],
  diagramSvg:svgW(720,300,'useReducer Architecture',
    R(30,55,200,45,'#1a1d28','#6c9fff','Component','Triggers action via dispatch()')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','dispatch({ type, payload })','Sends action to reducer')+
    A(130,170,130,195)+
    R(30,195,200,50,'#1a1d28','#34d399','Reducer Function','(state, action) => newState')+
    A(130,245,130,260)+
    R(30,260,200,45,'#1a1d28','#f87171','New State','Component re-renders')+
    T(250,78,'User clicks, API responds, etc.',10,'#9aa0b0','start')+
    T(250,148,'Action describes what happened',10,'#9aa0b0','start')+
    T(250,222,'Pure function: no side effects',10,'#9aa0b0','start')+
    T(250,282,'React detects change via Object.is',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Shopping Cart with useReducer','Multiple state fields updated atomically on each action',
      codeBlock([
        'function cartReducer(state, action) {',
        '  switch (action.type) {',
        '    case "ADD_ITEM":',
        '      const existing = state.items.find(i => i.id === action.payload.id);',
        '      if (existing) {',
        '        return {',
        '          ...state,',
        '          items: state.items.map(i =>',
        '            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i',
        '          )',
        '        };',
        '      }',
        '      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };',
        '    case "REMOVE_ITEM":',
        '      return { ...state, items: state.items.filter(i => i.id !== action.payload) };',
        '    case "APPLY_DISCOUNT":',
        '      return { ...state, discount: action.payload };',
        '    default:',
        '      return state;',
        '  }',
        '}',
        '',
        'function Checkout() {',
        '  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 });',
        '  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0) - state.discount;',
        '',
        '  return (',
        '    <div>',
        '      {state.items.map(item => (',
        '        <div key={item.id}>',
        '          <span>{item.name} x{item.qty} - ${item.price * item.qty}</span>',
        '          <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>x</button>',
        '        </div>',
        '      ))}',
        '      <p>Total: ${Math.max(0, total)}</p>',
        '      <button onClick={() => dispatch({ type: "APPLY_DISCOUNT", payload: 10 })}>Apply $10 off</button>',
        '    </div>',
        '  );',
        '}'
      ]),
      'useReducer centralizes cart logic (add, remove, discount) into a single reducer, making state transitions predictable and testable. Multiple state fields (items array, total) update together in one dispatch.'
    ),
    e('Async Data Fetching with useReducer','Handle loading, success, and error states in one reducer',
      codeBlock([
        'function fetchReducer(state, action) {',
        '  switch (action.type) {',
        '    case "FETCH_START":  return { ...state, loading: true, error: null };',
        '    case "FETCH_SUCCESS": return { ...state, loading: false, data: action.payload };',
        '    case "FETCH_ERROR":  return { ...state, loading: false, error: action.payload };',
        '    case "RESET":        return { data: null, loading: false, error: null };',
        '    default: return state;',
        '  }',
        '}',
        '',
        'function UserProfile({ userId }) {',
        '  const [state, dispatch] = useReducer(fetchReducer, {',
        '    data: null, loading: false, error: null',
        '  });',
        '',
        '  useEffect(() => {',
        '    dispatch({ type: "FETCH_START" });',
        '    fetch("/api/users/" + userId)',
        '      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })',
        '      .then(data => dispatch({ type: "FETCH_SUCCESS", payload: data }))',
        '      .catch(err => dispatch({ type: "FETCH_ERROR", payload: err.message }));',
        '  }, [userId]);',
        '',
        '  if (state.loading) return <Spinner />;',
        '  if (state.error) return <Error message={state.error} />;',
        '  if (!state.data) return null;',
        '  return <ProfileCard user={state.data} />;',
        '}'
      ]),
      'The reducer cleanly handles three states (loading, success, error) without complex useState logic. Each state transition is explicit and predictable.'
    )
  ],
  mcqQuestions:[
    m('What is a reducer function?',['A function that creates React components','A pure function (state, action) => newState','A function that handles HTTP requests','A function that renders JSX'],1,'A reducer is a pure function that takes the current state and an action and returns the new state. It must not have side effects.'),
    m('Which is a valid action object for useReducer?',['{ type: "INCREMENT" }','{ action: "INCREMENT" }','{ event: "click" }','{ reducer: "count" }'],0,'Actions conventionally have a type property describing the action. The payload property is optional.'),
    m('When should you prefer useReducer over useState?',['Always - useReducer is always better','When state logic is complex with interdependent fields','When there is only one state value','Never - useState is always better'],1,'useReducer excels when state is an object with multiple fields that update together, or when state transitions depend heavily on previous state.'),
    m('Can a reducer have side effects like API calls?',['Yes, reducers commonly call APIs','No, reducers must be pure functions without side effects','Only if wrapped in useEffect','Yes, but only with async/await'],1,'Reducers must be pure. Side effects like API calls belong in useEffect or event handlers, which then dispatch actions to the reducer with the results.'),
    m('What happens if you mutate state directly in a reducer?',['React automatically detects the mutation','React cannot detect the change (Object.is comparison fails) and the component does not re-render','React throws an error','The mutation is automatically deep-cloned'],1,'React uses Object.is to compare state. Direct mutation keeps the same reference, so React skips the re-render. Always return a new object from the reducer.'),
    m('How do you test a reducer?',['Using React Testing Library to render the component','By calling the reducer directly as a pure function and asserting the returned state','By using Enzyme to simulate dispatches','Reducers cannot be tested'],1,'Reducers are trivially testable because they are pure functions. Call reducer(state, action) and assert on the returned state. No component rendering required.')
  ]
};

// ========== 6. React.memo ==========
topics['react-react-memo'] = {
  id:'react-react-memo', title:'React.memo', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'React.memo is a higher-order component that prevents re-rendering when props have not changed (shallow comparison).',
    'It is a performance optimization - only use it when profiling shows a component re-renders unnecessarily with the same props.',
    'React.memo uses Object.is shallow comparison by default but accepts a second argument: a custom comparison function.',
    'Do not wrap every component in React.memo - it adds comparison overhead and can cause bugs with unstable props (like inline objects/functions).'
  ],
  laymanDefinition:'React.memo is like a bouncer at a club who checks if your ID looks the same as last time. If you look the same (props havent changed), the bouncer says "go on in, nothing changed" and the component skips re-rendering entirely. Without React.memo, React re-renders the component every time the parent re-renders, regardless of whether the props actually changed. React.memo does a shallow comparison of props - if the prop references are the same (Object.is), it reuses the previous render output. For props like objects, arrays, and functions, this means the parent must use useMemo/useCallback to keep references stable, or the memoization is defeated.',
  deepDive:[
    d('How React.memo Works Internally','React.memo wraps a component and returns a new component that performs a shallow comparison of the current and next props during the render phase. If the comparison returns true (props are equal), React reuses the previously rendered virtual DOM subtree for this component and does not call the component function. If false, React calls the component function with the new props and reconciles as usual. The comparison is done by a function called by the `updateFunctionComponent` or `updateForwardRef` work loop in React\'s fiber reconciler. React.memo only affects re-renders triggered by parent re-renders - it does not prevent re-renders caused by the component\'s own state or context changes. The component will always re-render if its own useState or useContext updates.'),
    d('Shallow Comparison and Its Limitations','React.memo uses Object.is for each prop. For primitive values (string, number, boolean, null, undefined), this works as expected: "hello" === "hello". For objects, arrays, and functions, Object.is checks reference equality, not value equality. This means: { x: 1 } !== { x: 1 } - these are different object references even with identical content. The practical consequence: if the parent creates a new object/array/function on every render and passes it as a prop, React.memo sees a prop change every render and the optimization is completely defeated. To fix this, use useMemo for objects/arrays and useCallback for functions to stabilize references across renders. The comparison function can accept a second argument: React.memo(Component, (prevProps, nextProps) => boolean).'),
    d('React.memo vs useMemo vs PureComponent','React.memo is the function component equivalent of PureComponent for class components. Both perform shallow prop comparison. Differences: (1) React.memo can take a custom comparison function; PureComponent cannot (it uses shouldComponentUpdate with shallow comparison internally). (2) PureComponent compares both props and state; React.memo only compares props. (3) useMemo is different - it memoizes the result of a computation (a value), not a component. (4) React.memo wraps the entire component; useMemo wraps individual values. Use React.memo for component-level render optimization and useMemo/useCallback for prop-level reference stability that enables React.memo to work.'),
    d('Common Pitfalls and Anti-Patterns','(1) Wrapping every component in React.memo - this adds unnecessary comparison overhead for leaf components that render cheap JSX. (2) Inline objects and functions - if the parent creates { style: { color: "red" } } or onClick={() => handleClick()} on every render, React.memo is useless. (3) Children prop - React.memo does not prevent re-renders caused by parent context changes. (4) Using custom comparison functions incorrectly - they should be fast (synchronous, no deep equality). (5) HOC order - if you apply React.memo before a connect() or withRouter() HOC, the comparison runs on the outer components props, which may include injected props. Apply React.memo as the outermost wrapper after other HOCs.'),
    d('Profiling Before Memoizing - The Golden Rule','Always profile with React DevTools Profiler before adding React.memo. The Profiler shows: (1) Which components re-render and why. (2) The rendering time for each component. (3) Whether the re-render was caused by props, state, or context. Add React.memo only when: (a) A component renders frequently with unchanged props. (b) The component\'s render is expensive enough that the comparison overhead is worth it. (c) The props are stable (or can be made stable with useMemo/useCallback). For most apps, the top 5-10 most expensive components benefit from React.memo - the rest should not be wrapped. Premature memoization adds code complexity and potential bugs without measurable benefit.')
  ],
  interviewAnswer:'React.memo is a higher-order component that prevents re-rendering when props have not changed, using Object.is shallow comparison. It is a performance optimization, not a guarantee - the component still re-renders on its own state or context changes. React.memo only helps when props are stable references (primitives, or memoized objects/arrays/functions via useMemo/useCallback). The second argument allows a custom comparison function, but it should be fast (no deep equality). Always profile before adding React.memo - wrapping every component adds overhead. React.memo is the function component equivalent of PureComponent but only compares props, not state.',
  interviewQuestions:[
    q('What does React.memo do?','React.memo is a HOC that memoizes a component\'s rendered output. It performs a shallow comparison of the current and next props. If they are equal (Object.is), it reuses the previous render output, skipping the component function call and reconciliation for that subtree.'),
    q('When does React.memo NOT prevent a re-render?','When the component\'s own state changes (useState dispatch), when a context value used by the component changes, or when any prop reference changes (new object, array, function). React.memo only protects against re-renders caused by the parent re-rendering with the same props.'),
    q('How does React.memo compare to PureComponent?','Both prevent unnecessary re-renders by shallow prop comparison. PureComponent is for class components and compares both props and state. React.memo is for function components and compares only props. PureComponent uses shouldComponentUpdate; React.memo uses a built-in comparison.'),
    q('What is the second argument of React.memo?','A custom comparison function: React.memo(Component, (prevProps, nextProps) => boolean). Return true to skip the render (props are equal), false to re-render. Use this for custom comparison logic, but avoid deep equality checks as they are expensive.'),
    q('How do inline functions defeat React.memo?','An inline function like onClick={() => handleClick(id)} creates a new function reference on every parent render. React.memo detects a prop change (new function reference) and re-renders the child. useCallback on the function stabilizes the reference and restores the memoization benefit.'),
    q('Does React.memo affect the components state or effects?','No. React.memo only controls whether the component function is called. If the component has internal state (useState) or effects (useEffect), they behave normally. State updates always trigger a re-render regardless of React.memo.'),
    q('What is the performance cost of React.memo?','The shallow prop comparison runs on every render of the parent. For components with many props (10+), this comparison has a cost. If the component renders cheap JSX (a single div with some text), the comparison overhead may exceed the render cost. Profile to determine if React.memo is beneficial.'),
    q('Can React.memo be used with forwardRef?','Yes. React.memo(forwardRef(Component)) works correctly. React.memo wraps the forwardRef component, comparing the props (ref is handled separately by React and does not participate in the comparison).'),
    q('How does React.memo interact with context?','If the memoized component consumes context with useContext, it will re-render when the context value changes, regardless of React.memo. React.memo only skips renders triggered by prop changes from the parent.'),
    q('Should I wrap every component in React.memo?','No. Only wrap components where profiling confirms a performance benefit. Over-memoizing adds comparison overhead, increases code complexity, and can cause bugs if props are not stable. A targeted approach (wrapping expensive list items, charts, or deeply nested components) is more effective.')
  ],
  diagramSvg:svgW(720,300,'React.memo Decision Flow',
    R(30,55,200,45,'#1a1d28','#6c9fff','Parent Re-renders','Triggers child reconciliation')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','React.memo Check','Shallow compare props (Object.is)')+
    A(130,170,130,195)+
    R(30,195,90,50,'#1a1d28','#34d399','Props Equal?','Skip render, reuse VDOM')+
    R(140,195,90,50,'#1a1d28','#f87171','Props Changed?','Re-render component')+
    R(30,265,200,30,'#1a1d28','#f59e0b','Note: state/context changes bypass memo','')+
    T(260,78,'Parent state change',10,'#9aa0b0','start')+
    T(260,148,'Object.is on each prop',10,'#9aa0b0','start')+
    T(260,220,'Memoized component skipped',10,'#34d399','start')+
    T(260,220,'Component re-renders',10,'#f87171','start')
  ),
  codeExamples:[
    e('React.memo with Stable Props and useCallback','Correct pattern for effective memoization',
      codeBlock([
        'const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {',
        '  console.log("ProductCard render:", product.id);',
        '  return (',
        '    <div className="card">',
        '      <h3>{product.name}</h3>',
        '      <p>${product.price}</p>',
        '      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>',
        '    </div>',
        '  );',
        '});',
        '',
        'function ProductList({ products }) {',
        '  const handleAddToCart = useCallback((id) => {',
        '    console.log("Added:", id);',
        '  }, []);',
        '',
        '  return (',
        '    <div className="grid">',
        '      {products.map(p => (',
        '        <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />',
        '      ))}',
        '    </div>',
        '  );',
        '}'
      ]),
      'useCallback stabilizes the onAddToCart function reference. Without it, every parent render creates a new function, causing every ProductCard to re-render despite React.memo. The key prop already prevents re-rendering moved items; React.memo prevents re-rendering items whose data has not changed.'
    ),
    e('Custom Comparison Function for React.memo','Optimize comparison logic for specific prop shapes',
      codeBlock([
        'const WeatherWidget = React.memo(function WeatherWidget({ temp, unit }) {',
        '  console.log("WeatherWidget render");',
        '  const displayTemp = unit === "C" ? temp : (temp * 9/5 + 32);',
        '  return <p>{displayTemp.toFixed(1)}Â°{unit}</p>;',
        '}, (prev, next) => {',
        '  // Custom: round comparison to 1 decimal place',
        '  return Math.round(prev.temp * 10) === Math.round(next.temp * 10)',
        '      && prev.unit === next.unit;',
        '});',
        '',
        'function Dashboard({ sensorData }) {',
        '  const [refresh, setRefresh] = useState(0);',
        '',
        '  // Sensor data updates every second but often changes by < 0.01',
        '  return (',
        '    <div>',
        '      <WeatherWidget temp={sensorData.temperature} unit="C" />',
        '      <button onClick={() => setRefresh(r => r + 1)}>Refresh: {refresh}</button>',
        '    </div>',
        '  );',
        '}'
      ]),
      'The custom comparison function rounds temperature to 1 decimal place, preventing re-renders for tiny sensor fluctuations. The comparison is fast (math operations, no deep equals) and effectively reduces unnecessary renders.'
    )
  ],
  mcqQuestions:[
    m('What comparison does React.memo use by default?',['Deep equality (JSON.stringify)','Shallow comparison (Object.is on each prop)','Reference equality only on the props object','No comparison - it always re-renders'],1,'React.memo uses Object.is shallow comparison on each prop individually. It compares the previous prop values with the next prop values.'),
    m('When will a React.memo component always re-render?',['When its parent re-renders','When its own state changes (useState)','Never - React.memo prevents all re-renders','Only when the page reloads'],1,'React.memo does not protect against re-renders caused by the components own state changes, context changes, or prop changes. It only prevents re-renders triggered by the parent re-rendering with identical props.'),
    m('What is required for React.memo to work effectively with object props?',['The object must be deeply frozen','useMemo must stabilize the object reference','The object must have fewer than 10 properties','The object must use JSON.parse/stringify'],1,'Object props are compared by reference (Object.is). useMemo creates a stable reference so that React.memo sees the object as unchanged across renders where the content hasnt changed.'),
    m('What is the equivalent of React.memo in class components?',['React.createElement','PureComponent (via shouldComponentUpdate)','Component with forceUpdate','React.Fragment'],1,'PureComponent implements shouldComponentUpdate with shallow prop and state comparison. React.memo is the function component equivalent for props-only comparison.'),
    m('What does the custom comparison function in React.memo return to skip rendering?',['true (props are equal, skip render)','false (props are equal, skip render)','null (skip comparison)','undefined (default behavior)'],0,'React.memo(Component, (prev, next) => boolean). Return true if props are equal (skip render), false if props changed (re-render).'),
    m('Which of these completely defeats React.memo optimization?',['Using useCallback for event handlers','Passing inline objects as props: <Child config={{ dark: true }} />','Using the key prop in lists','Using useEffect inside the memoized component'],1,'Inline objects create new references on every render, causing React.memo to see a prop change every time. useMemo on the object or extracting it outside the component solves this.')
  ]
};

// ========== 7. Lazy Loading ==========
topics['react-lazy-loading'] = {
  id:'react-lazy-loading', title:'React Lazy Loading', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'React.lazy enables dynamic import of components, loading them only when they are first rendered.',
    'It must be used with Suspense to provide a fallback UI while the component is being loaded.',
    'Lazy loading splits the bundle into smaller chunks, reducing initial page load time.',
    'It works out of the box with Create React App, Next.js dynamic imports, and Vite.'
  ],
  laymanDefinition:'React lazy loading is like having a Netflix-style loading for your components. Instead of downloading the entire app code at once (like buying a whole Blu-ray box set), you download only the parts the user needs right now (like streaming just the episode they want to watch). React.lazy tells React "this component is in a separate file - load it when you need it." Combined with Suspense, you can show a spinner or placeholder while the chunk loads. This dramatically reduces the initial bundle size for large apps with many routes or heavy third-party libraries.',
  deepDive:[
    d('How React.lazy Works','React.lazy takes a function that returns a dynamic import: React.lazy(() => import("./HeavyComponent")). The import() is a webpack/ES module dynamic import syntax that tells the bundler to create a separate chunk file. When React first attempts to render the lazy component, it triggers the dynamic import, which initiates a network request for that chunk. While the chunk is loading, React suspends and looks up the nearest Suspense boundary to render the fallback. Once the chunk loads and resolves, React renders the actual component. If the import fails, the Suspense boundary can catch the error with an error boundary. React.lazy only supports default exports - named exports require an intermediate module.'),
    d('Code Splitting Architecture with React.lazy','The typical pattern is route-based code splitting: each top-level route gets its own chunk. This aligns with user behavior - users on the home page do not need the settings page code. Example: const Home = React.lazy(() => import("./routes/Home")). The bundler creates separate chunks for each lazy route. Chunk naming can be customized with webpack magic comments: import(/* webpackChunkName: "home" */ "./routes/Home"). For optimal loading: (1) Split at route boundaries, not component boundaries (too many small chunks = many HTTP requests). (2) Preload critical routes using <link rel="prefetch"> or webpack preload/prefetch. (3) Use Suspense with a meaningful fallback (skeleton screens > spinners). (4) Combine with React.memo for components that appear in multiple routes.'),
    d('Suspense and Fallback Strategies','Suspense is the required wrapper for lazy components. It takes a fallback prop: <Suspense fallback={<Spinner />}>. The fallback renders while any lazy component within the Suspense boundary is loading. Key strategies: (1) One Suspense per route for independent loading states. (2) Nested Suspense for granular loading - parent Suspense shows page shell, child Suspense shows section spinners. (3) SuspenseList (React experimental) for coordinating loading sequences. (4) Skeleton screens as fallbacks (match the layout of the actual component) to reduce layout shift (CLS). (5) Avoid wrapping an entire app in a single Suspense - a loading spinner replacing the whole page is poor UX. (6) In React 18, Suspense also works with server-side streaming and data fetching (concurrent features).'),
    d('Error Handling with Error Boundaries','Lazy imports can fail due to network errors, server issues, or chunk load failures. React.lazy does not provide built-in error handling - you must wrap the Suspense boundary with an error boundary. A custom ErrorBoundary class component (with componentDidCatch) wraps the Suspense and renders a fallback UI (retry button, error message) when chunk loading fails. For production: (1) Implement a RetryErrorBoundary that tries to reload the chunk. (2) Log chunk load failures to your monitoring service. (3) Provide a "Something went wrong" UI with a retry action. (4) Consider service worker caching for chunks to improve reliability. (5) Use webpack\'s chunk loading retry mechanism for transient failures.'),
    d('Performance Considerations and Bundle Analysis','Measure before and after with webpack-bundle-analyzer or source-map-explorer. Goals: (1) Initial bundle (main.js) should be under 200KB gzipped for fast first paint. (2) Each route chunk should be independently cacheable. (3) Avoid splitting very small components (< 5KB) - the HTTP overhead outweighs the benefit. (4) Consider using preload for chunks needed soon (e.g., next route prefetched on hover). (5) Monitor chunk sizes in CI to prevent regression. (6) Use import() for non-component modules too (utility libraries like moment.js, lodash) to defer their loading to when they are actually needed. (7) React.lazy combined with Suspense is the recommended approach for most React apps - it works with all modern bundlers and frameworks.')
  ],
  interviewAnswer:'React.lazy enables dynamic import of components for code splitting. It takes a function that returns import("./Component") and creates a separate bundle chunk. Lazy components must be wrapped in Suspense with a fallback UI shown during loading. The primary use case is route-based splitting where each page loads on demand, reducing the initial bundle. Error boundaries handle import failures (network errors). React.lazy only supports default exports. Combine with webpack magic comments for explicit chunk naming. Measure bundle impact with webpack-bundle-analyzer. Avoid splitting tiny components (under 5KB) where HTTP overhead negates the benefit.',
  interviewQuestions:[
    q('What does React.lazy do?','React.lazy creates a lazily-loaded component from a dynamic import. The component is not loaded until React attempts to render it. This enables code splitting by creating separate bundle chunks that load on demand.'),
    q('Why must React.lazy be used with Suspense?','Suspense provides the fallback UI while the lazy component\'s chunk is loading. Without Suspense, React cannot show interim UI during loading. Suspense catches the "pending" promise from the lazy import and renders the fallback.'),
    q('What happens if a lazy import fails (network error)?','React.lazy does not handle errors. An error boundary wrapping the Suspense boundary catches the rejected import promise and renders the fallback error UI. Error boundaries use componentDidCatch to handle rendering errors.'),
    q('Can React.lazy work with named exports?','No, React.lazy only works with default exports. For named exports, create an intermediate module that re-exports as default: export { MyComponent as default } from "./MyComponent".'),
    q('What is the best splitting strategy for React apps?','Route-based splitting - each top-level route is a separate lazy chunk. This aligns with user navigation patterns. Component-level splitting (individual buttons, modals) is usually too granular and creates excessive HTTP requests.'),
    q('How do you customize the chunk filename?','Use webpack magic comments: import(/* webpackChunkName: "home" */ "./Home"). The chunk will be named home.[hash].js. This helps with debugging and caching strategies.'),
    q('How does React.lazy interact with server-side rendering?','React.lazy does not work with SSR out of the box. Options: (1) Use @loadable/components which supports SSR. (2) In Next.js, use next/dynamic which handles SSR automatically. (3) React 18s streaming SSR integrates with Suspense for lazy components on the server.'),
    q('What is the difference between React.lazy and dynamic import()?','React.lazy is a React-specific wrapper around dynamic import() that integrates with the component lifecycle and Suspense. dynamic import() is a JavaScript feature that loads modules asynchronously. React.lazy depends on dynamic import() under the hood.'),
    q('How does lazy loading affect SEO?','If the lazy component is not rendered on initial page load, search engines may not index its content. Use SSR or static generation for SEO-critical content. Lazy loading is best for below-the-fold content, secondary routes, and authenticated pages.'),
    q('What tools can analyze bundle sizes after code splitting?','webpack-bundle-analyzer generates interactive treemap visualizations of bundle sizes. source-map-explorer shows source code size breakdown. Chrome DevTools coverage tab shows unused code. These help identify effective split points.')
  ],
  diagramSvg:svgW(720,300,'Lazy Loading Flow',
    R(30,55,200,45,'#1a1d28','#6c9fff','Initial Bundle','App shell + critical routes only')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','User Navigates','React attempts to render lazy route')+
    A(130,170,130,195)+
    R(30,195,200,50,'#1a1d28','#34d399','Network Request','Browser fetches chunk.js')+
    A(130,245,130,260)+
    R(30,260,200,45,'#1a1d28','#f87171','Suspense Fallback','Show loading UI while fetching')+
    T(250,78,'Small initial payload',10,'#9aa0b0','start')+
    T(250,148,'Triggers import()',10,'#9aa0b0','start')+
    T(250,222,'Separate JS file loaded',10,'#9aa0b0','start')+
    T(250,282,'Spinner or skeleton shown',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Route-Based Code Splitting with React.lazy','Standard pattern for React Router integration',
      codeBlock([
        'import { BrowserRouter, Routes, Route } from "react-router-dom";',
        'import React, { Suspense } from "react";',
        '',
        'const Home = React.lazy(() => import("./routes/Home"));',
        'const Dashboard = React.lazy(() => import("./routes/Dashboard"));',
        'const Settings = React.lazy(() => import("./routes/Settings"));',
        'const Profile = React.lazy(() => import("./routes/Profile"));',
        '',
        'function PageSkeleton() {',
        '  return <div className="skeleton"><div className="spinner"/></div>;',
        '}',
        '',
        'function App() {',
        '  return (',
        '    <BrowserRouter>',
        '      <Navbar />',
        '      <Suspense fallback={<PageSkeleton />}>',
        '        <Routes>',
        '          <Route path="/" element={<Home />} />',
        '          <Route path="/dashboard" element={<Dashboard />} />',
        '          <Route path="/settings" element={<Settings />} />',
        '          <Route path="/profile" element={<Profile />} />',
        '        </Routes>',
        '      </Suspense>',
        '    </BrowserRouter>',
        '  );',
        '}'
      ]),
      'Each route is a separate chunk. The Suspense boundary wraps all routes so navigation triggers chunk loading with a skeleton fallback. The Navbar (non-lazy) remains interactive during chunk loading.'
    ),
    e('Error Boundary with Lazy Loading','Handle chunk load failures gracefully with retry',
      codeBlock([
        'class ChunkErrorBoundary extends React.Component {',
        '  state = { hasError: false, error: null };',
        '',
        '  static getDerivedStateFromError(error) {',
        '    return { hasError: true, error };',
        '  }',
        '',
        '  componentDidCatch(error, info) {',
        '    logErrorToService(error, info);',
        '  }',
        '',
        '  handleRetry = () => {',
        '    this.setState({ hasError: false, error: null });',
        '  };',
        '',
        '  render() {',
        '    if (this.state.hasError) {',
        '      return (',
        '        <div className="error-fallback">',
        '          <h2>Failed to load section</h2>',
        '          <p>{this.state.error.message}</p>',
        '          <button onClick={this.handleRetry}>Try Again</button>',
        '        </div>',
        '      );',
        '    }',
        '    return this.props.children;',
        '  }',
        '}',
        '',
        '// Usage:',
        '<ChunkErrorBoundary>',
        '  <Suspense fallback={<Spinner />}>',
        '    <LazySettingsPanel />',
        '  </Suspense>',
        '</ChunkErrorBoundary>'
      ]),
      'The error boundary wraps Suspense. If the chunk fails to load, componentDidCatch fires, and the user sees a friendly error with a retry button. Retry resets the error state, causing React to re-attempt rendering the lazy component.'
    )
  ],
  mcqQuestions:[
    m('What must wrap a React.lazy component?',['React.Fragment','Suspense with a fallback','StrictMode','ErrorBoundary'],1,'Suspense with a fallback prop is required. The fallback renders while the lazy chunk is loading.'),
    m('What kind of export does React.lazy support?',['Named exports only','Default exports only','Both named and default','Only export default as component'],1,'React.lazy only works with default exports. Named exports require an intermediate module that re-exports as default.'),
    m('What is the recommended splitting strategy?',['Every component gets its own chunk','Route-based splitting for page-level chunks','Splitting every function call','No splitting - single bundle is better'],1,'Route-based splitting provides the best balance of chunk size and HTTP requests. Each route loads independently.'),
    m('What happens during development when a lazy module loads?',['The browser blocks until loaded','The Suspense fallback displays until the import resolves','React throws a warning','The component renders null'],1,'During loading, React suspends and renders the Suspense fallback. Once the import resolves, the lazy component renders.'),
    m('How do you handle a failed lazy import?',['React.lazy has built-in retry','Wrap Suspense in an error boundary','The browser automatically retries','Ignore the error - it recovers'],1,'Error boundaries catch rejected import promises. The boundary\'s fallback UI displays, typically with a retry button.'),
    m('What tool visualizes bundle sizes after code splitting?',['ESLint','webpack-bundle-analyzer','Babel','Prettier'],1,'webpack-bundle-analyzer generates an interactive treemap showing the size of each chunk, helping identify effective split points.')
  ]
};

// ========== 8. Code Splitting ==========
topics['react-code-splitting'] = {
  id:'react-code-splitting', title:'React Code Splitting', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'Code splitting breaks the JavaScript bundle into smaller chunks loaded on demand, reducing initial load time.',
    'React supports code splitting via dynamic import() combined with React.lazy and Suspense.',
    'Route-based splitting (one chunk per route) is the most effective strategy for most applications.',
    'Tools like webpack, Rollup, and Vite automatically create separate chunks for dynamic imports.'
  ],
  laymanDefinition:'Code splitting is like a restaurant menu where you only pay for the dishes you order, not the entire kitchen inventory. Instead of downloading the ENTIRE application code (every route, every library, every component) when the user first visits, you download only what they need for the current page. When they navigate to a new section, you download that code on demand. This means the first page loads much faster, especially on slow networks. Modern React apps use React.lazy, dynamic import(), and Suspense to make code splitting seamless.',
  deepDive:[
    d('Webpack Chunking Strategy','Webpack detects dynamic import() calls and creates separate output files (chunks). The bundler analyzes the module graph at build time and splits based on: (1) Entry points - each entry creates an initial chunk. (2) Dynamic imports - each import() creates a new chunk. (3) SplitChunksPlugin - extracts shared dependencies (like React, lodash) into common chunks for better caching. (4) Async chunks - loaded on demand when the dynamic import is triggered. The chunk filename is determined by [name], [id], or [contenthash] in webpack\'s output config. Magic comments customize the chunk name: import(/* webpackChunkName: "admin" */ "./Admin"). Multiple dynamic imports with the same name merge into one chunk.'),
    d('Measuring Code Splitting Impact','Use Chrome DevTools Coverage tab to measure unused bytes before and after splitting. Aim for: (1) Initial JS bundle under 150-200KB gzipped. (2) First Contentful Paint (FCP) under 1.5s. (3) Time to Interactive (TTI) under 3.5s. Bundle analysis tools: webpack-bundle-analyzer (interactive treemap), source-map-explorer (per-file sizes), and BundlePhobia (npm package size check). Track these metrics in CI to prevent bundle bloat. Lighthouse audits identify opportunities for code splitting. The key metric is not total app size but the critical path - code needed for the initial route.'),
    d('Advanced Splitting Patterns','Beyond route splitting: (1) Component-level splitting for heavy modals/dialogs that most users never open. (2) Library splitting - defer large libraries (charting, date pickers, markdown renderers) until needed: const Chart = React.lazy(() => import("chart.js")). (3) Conditional splitting - load polyfills only for older browsers: if (!("IntersectionObserver" in window)) { import("intersection-observer") }. (4) Vendor chunk splitting - extract third-party code into vendor.js for long-term caching. (5) Component splitting via webpack\'s SplitChunksPlugin for shared component directories. (6) Preload/prefetch critical chunks for predicted user navigation paths.'),
    d('Code Splitting with Server-Side Rendering','Standard React.lazy does not work with SSR because the server cannot make async import calls during rendering. Solutions: (1) @loadable/component - a community library that supports SSR code splitting with chunk extraction. (2) Next.js dynamic imports - next/dynamic handles SSR automatically with server-side chunk extraction. (3) React 18 streaming SSR - Suspense boundaries on the server enable lazy component loading in the stream. (4) Gatsby uses static rendering where page-level code splitting is automatic. The key challenge is ensuring the server-rendered HTML includes the necessary script tags for client-side hydration to pick up correctly.'),
    d('Caching Strategy for Split Chunks','Effective caching maximizes cache hits: (1) Use [contenthash] in chunk filenames - the hash changes only when file content changes. (2) Split vendor chunks (react, react-dom) with stable hashes that change only on library upgrades. (3) Extract webpack runtime chunk separately - it changes frequently but is tiny (< 5KB). (4) Use HTTP Cache-Control headers: immutable for hashed chunks (cache forever), no-cache for index.html. (5) Service worker caching (Workbox) for offline support and faster repeat visits. (6) Monitor chunk hash stability - unnecessary hash changes defeat caching. webpack 5s deterministic module IDs help maintain stable hashes.')
  ],
  interviewAnswer:'Code splitting breaks the JavaScript bundle into chunks loaded on demand using dynamic import() combined with React.lazy and Suspense. Route-based splitting (one chunk per route) is the most effective strategy. Measure impact with webpack-bundle-analyzer and Chrome DevTools Coverage - target initial bundle under 150-200KB gzipped. React.lazy does not support SSR without @loadable/component or Next.js dynamic imports. Use [contenthash] filenames, vendor chunk extraction, and service worker caching for optimal caching. Avoid splitting components under 5KB where HTTP overhead negates the benefit.',
  interviewQuestions:[
    q('What is code splitting?','Code splitting divides the JavaScript bundle into smaller chunks that load on demand. This reduces the initial download size and improves time to interactive. Dynamic import() is the JavaScript mechanism that enables it.'),
    q('How does webpack handle dynamic imports?','Webpack treats each import() call as a split point, creating a separate output chunk. The SplitChunksPlugin also extracts shared dependencies into common chunks. Magic comments customize chunk names for debugging and caching.'),
    q('What is the recommended chunk size for optimal loading?','Individual chunks should be 20-50KB (gzipped) for good cacheability and fast loading. Chunks under 5KB are usually not worth splitting due to HTTP overhead. Initial bundle should be under 150-200KB gzipped.'),
    q('How do you analyze bundle sizes?','webpack-bundle-analyzer generates a treemap visualization. source-map-explorer maps bundle bytes to source files. Chrome DevTools Coverage tab shows unused code. Lighthouse provides performance budgets and recommendations.'),
    q('What is the difference between React.lazy and dynamic import()?','dynamic import() is a JavaScript API for loading modules asynchronously. React.lazy is a React abstraction that wraps import() and integrates with the component lifecycle and Suspense for declarative loading states.'),
    q('How do you handle code splitting with SSR?','React.lazy does not support SSR directly. Use @loadable/components or Next.js dynamic imports for SSR-compatible code splitting. React 18s streaming SSR adds native support via Suspense boundaries.'),
    q('What is the vendor chunk strategy?','Extract third-party libraries (react, react-dom, lodash) into a separate vendor chunk using webpacks SplitChunksPlugin. This chunk changes infrequently (only on library upgrades) and benefits from long-term browser caching.'),
    q('How does contenthash improve caching?','contenthash in chunk filenames ensures the filename changes only when the file content changes. Unchanged chunks keep their URL and remain in the browser cache. This maximizes cache hit rates on repeat visits.'),
    q('What are magic comments in webpack imports?','Magic comments are webpack-specific annotations in import() calls: import(/* webpackChunkName: "admin" */ "./Admin"). They control chunk naming, prefetching, preloading, and chunk merging behavior.'),
    q('What is the downside of too many small chunks?','Each chunk requires an HTTP request (even with HTTP/2 multiplexing, there is overhead). Too many small chunks (under 5KB) increase load time due to request overhead, parse time, and queueing. Merge related small chunks into a single chunk.')
  ],
  diagramSvg:svgW(720,300,'Code Splitting Architecture',
    R(30,55,200,45,'#1a1d28','#6c9fff','Single Bundle','app.js (500KB) - all code')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','Code Splitting','Dynamic import() split points')+
    A(130,170,130,195)+
    R(30,195,60,50,'#1a1d28','#34d399','main.js','Shell + router')+
    R(100,195,60,50,'#1a1d28','#f87171','home.js','Home page')+
    R(170,195,60,50,'#1a1d28','#f87171','admin.js','Admin panel')+
    T(30,260,'Initial load: only main.js (80KB)',10,'#34d399','start')+
    T(30,278,'Navigation loads additional chunks on demand',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Library-Level Code Splitting','Load heavy chart library only when chart renders',
      codeBlock([
        'const Chart = React.lazy(() => import("react-chartjs-2"));',
        '',
        'function SalesDashboard() {',
        '  const [showChart, setShowChart] = useState(false);',
        '',
        '  return (',
        '    <div>',
        '      <button onClick={() => setShowChart(true)}>',
        '        Show Sales Chart (loads 150KB on demand)',
        '      </button>',
        '',
        '      {showChart && (',
        '        <Suspense fallback={<div>Loading chart library...</div>}>',
        '          <Chart',
        '            type="line"',
        '            data={chartData}',
        '            options={{ responsive: true }}',
        '          />',
        '        </Suspense>',
        '      )}',
        '    </div>',
        '  );',
        '}'
      ]),
      'The chartjs library (150KB+) is only downloaded when the user clicks "Show Sales Chart". Users who never view the chart save that bandwidth and parse time.'
    ),
    e('Conditional Polyfill Loading with Dynamic Import','Load polyfills only for browsers that need them',
      codeBlock([
        'async function loadPolyfills() {',
        '  if (!("IntersectionObserver" in window)) {',
        '    await import("intersection-observer");',
        '  }',
        '  if (!("ResizeObserver" in window)) {',
        '    await import("@juggle/resize-observer");',
        '  }',
        '  if (!("fetch" in window)) {',
        '    await import("whatwg-fetch");',
        '  }',
        '}',
        '',
        '// In app bootstrap:',
        'loadPolyfills().then(() => {',
        '  ReactDOM.createRoot(document.getElementById("root")).render(<App />);',
        '});',
        '',
        '// Webpack config for vendor splitting:',
        '// optimization: {',
        '//   splitChunks: {',
        '//     chunks: "all",',
        '//     cacheGroups: {',
        '//       vendor: { test: /[\\\\/]node_modules[\\\\/]/, name: "vendor" },',
        '//     }',
        '//   }',
        '// }'
      ]),
      'Modern browsers skip the polyfill chunks entirely. Older browsers load only the polyfills they need. The vendor chunking config extracts all node_modules into a long-term cached vendor.js.'
    )
  ],
  mcqQuestions:[
    m('What mechanism does React use for code splitting?',['React Router','Dynamic import() with React.lazy','Redux middleware','Higher-order components'],1,'React.lazy wraps dynamic import() calls and integrates with Suspense. The bundler creates separate chunks at each import() boundary.'),
    m('What is the recommended chunk size?',['Under 5KB','20-50KB gzipped','Over 500KB','Exactly 100KB'],1,'Chunks between 20-50KB gzipped provide good cacheability and fast loading. Smaller chunks suffer from HTTP overhead; larger chunks negate the benefits of splitting.'),
    m('Which tool visualizes webpack bundle sizes?',['ESLint','Prettier','webpack-bundle-analyzer','Babel'],2,'webpack-bundle-analyzer creates an interactive treemap where each rectangle represents a module, sized by its byte contribution.'),
    m('What does [contenthash] in chunk filenames do?',['Minimizes the chunk','Changes the filename when content changes for cache busting','Makes the chunk load faster','Encrypts the chunk'],1,'contenthash is a substitution that produces a hash based on the file content. Changed content = new hash = new URL = cache miss. Unchanged content = same URL = cache hit.'),
    m('How do you share code between chunks?',['Duplicate it in each chunk','webpacks SplitChunksPlugin extracts shared modules into common chunks','Use React.memo on shared components','Shared code must be inlined'],1,'SplitChunksPlugin analyzes the module graph and extracts modules imported by multiple chunks into a shared commons chunk.'),
    m('Which library supports code splitting with SSR?',['React.lazy alone','@loadable/component','React Router','Redux Toolkit'],1,'React.lazy does not work with SSR. @loadable/component provides SSR-compatible code splitting with server-side chunk extraction and client-side hydration support.')
  ]
};

// ========== 9. Suspense ==========
topics['react-suspense'] = {
  id:'react-suspense', title:'React Suspense', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'Suspense lets components "wait" for something (lazy loading, data fetching) before rendering, showing a fallback UI in the meantime.',
    'It works with React.lazy for code splitting and is being extended for data fetching in React 18+.',
    'Suspense boundaries can be nested for granular loading states - each boundary independently controls its fallback.',
    'In React 18, Suspense integrates with streaming SSR and concurrent features for better perceived performance.'
  ],
  laymanDefinition:'Suspense is like a placeholder frame at a construction site that says "Building coming soon!" while workers finish the actual building behind it. In React, when a component is loading (either code via lazy loading or data via a fetching library), Suspense automatically shows a fallback (spinner, skeleton, placeholder) in place of that component until its ready. Multiple Suspense boundaries can be nested like Russian dolls - each one manages its own loading state independently. The key benefit is declarative loading states: you tell React "show this spinner while this section loads", and React handles the timing automatically.',
  deepDive:[
    d('How Suspense Works Under the Hood','Suspense relies on the concept of "thrown promises". When React attempts to render a component tree and encounters a lazy component (or a data-fetching component wrapped with a Suspense-enabled library), the component "throws" a Promise instead of returning JSX. React catches this thrown promise, looks up the nearest parent Suspense boundary, and renders that boundary\'s fallback instead of the component subtree. When the promise resolves, React retries the render. If the promise rejects, the error propagates to the nearest error boundary. This throw/catch mechanism is the core of Suspense - it is not a React-specific feature but a pattern built on JavaScripts error handling. Async React in concurrent mode allows Suspense to work with interrupted and resumed renders.'),
    d('Suspense for Code Splitting (React.lazy)','This is the most mature Suspense use case. React.lazy creates a component that throws a promise when its chunk is not yet loaded. The Suspense boundary catches it and shows the fallback. Key patterns: (1) One Suspense per route for independent loading. (2) Nested Suspense - layout shell has its own Suspense, child sections have nested Suspense with smaller fallbacks. (3) Suspense with <Outlet /> in React Router v6 for route-level code splitting. (4) Avoid wrapping everything in a single Suspense - the entire page content is replaced by a spinner, creating a poor UX. (5) For frequently used lazy components, consider prefetching the chunk so Suspense resolves immediately.'),
    d('Suspense for Data Fetching (React 18+)','React 18 introduces Suspense support for data fetching via libraries like Relay, SWR, TanStack Query, and the new use hook. The pattern: (1) A component reads from a resource (e.g., fetchData(id)) that may suspend. (2) If the data is not ready, the resource throws a promise. (3) Suspense catches it and shows fallback. (4) When data resolves, the component re-renders with data. Benefits: (a) No manual loading/error state management - Suspense handles it. (b) Race conditions are eliminated because Suspense coordinates renders with data readiness. (c) Automatic parallel data loading - siblings under Suspense load concurrently. (d) Streaming SSR with Suspense boundaries for progressive HTML delivery.'),
    d('Nested Suspense and Coordinated Loading','Nested Suspense boundaries provide granular loading UX: (1) Outer Suspense shows page skeleton. (2) Inner Suspense boundaries show section-specific placeholders (e.g., sidebar skeleton, content skeleton, comments skeleton). (3) As each section loads independently, it replaces its placeholder without affecting other sections. (4) useTransition (React 18) defers showing fallback for pending transitions, maintaining the current UI until the new content is ready. (5) SuspenseList (experimental) coordinates the order of appearance - "together" (all reveal at once), "forwards" (top to bottom sequential reveal), or "backwards" (bottom to top). This prevents content from jumping around as sections load.'),
    d('Error Handling with Suspense','Suspense does not handle errors from rejected promises. Error boundaries are required: wrap Suspense with an error boundary to catch rendering errors including rejected Suspense promises. The error boundary renders a fallback UI when chunk loading fails or data fetching throws. This separation of concerns is intentional: Suspense handles loading (pending states), error boundaries handle failure (rejected states). The combination provides a complete async rendering model: pending -> Suspense fallback, resolved -> component renders, rejected -> error boundary fallback.')
  ],
  interviewAnswer:'Suspense is a React component that shows a fallback UI while child components are loading (code via React.lazy or data via Suspense-enabled libraries). It works via the thrown promise pattern - components throw a promise during loading, Suspense catches it and shows fallback. Multiple Suspense boundaries can be nested for granular loading states. In React 18, Suspense extends to data fetching and streaming SSR. Suspense does NOT handle errors - pair it with error boundaries for complete async handling. Avoid wrapping the entire app in a single Suspense - use focused boundaries for better UX.',
  interviewQuestions:[
    q('What is the thrown promise pattern in Suspense?','When a component needs to load data or code, it throws a Promise instead of returning JSX. React catches this, finds the nearest Suspense boundary, and renders its fallback. When the Promise resolves, React retries the render.'),
    q('What are the primary use cases for Suspense?','(1) Code splitting with React.lazy - loading component chunks on demand. (2) Data fetching with Suspense-enabled libraries (Relay, SWR, TanStack Query) - showing fallback while data loads. (3) Streaming SSR in React 18 - progressive HTML delivery.'),
    q('Can Suspense be nested? How does it behave?','Yes. Each Suspense boundary independently manages its fallback. Outer boundaries show larger skeletons while inner boundaries show section-specific placeholders. When an inner section loads, only its fallback is replaced - other sections remain.'),
    q('How does Suspense differ from a simple conditional loader?','Suspense is declarative and automatic. You define the boundary and fallback once; React handles timing, transitions, and race conditions. Conditional loaders require manual state management (loading, error, success flags) in every component and are prone to race conditions.'),
    q('Does Suspense handle errors?','No. Errors from rejected promises (failed chunk loads, API errors) propagate to the nearest error boundary. Always wrap Suspense with an error boundary for robust error handling.'),
    q('What is the relationship between Suspense and useTransition?','useTransition marks state updates as non-urgent. When a transition triggers a Suspense boundary, React can keep showing the current UI (instead of switching to fallback) while preparing the new content. This prevents jarring loading spinners during navigation.'),
    q('How does React 18s streaming SSR use Suspense?','The server streams HTML progressively. Suspense boundaries on the server create "holes" filled later with server-rendered content. The client shows Suspense fallbacks for unresolved boundaries. This reduces TTFB (Time to First Byte) and Time to Interactive.'),
    q('What happens if two sibling components both suspend?','Both suspend independently. React shows the common parent Suspense fallback until all siblings resolve. If each sibling has its own Suspense boundary, they load in parallel and each reveals independently.'),
    q('What is the SuspenseList component?','SuspenseList (experimental) coordinates the reveal order of multiple Suspense boundaries. Options: "together" (all reveal at once), "forwards" (top to bottom sequentially), or "backwards" (bottom to top). Prevents layout shifts and improves perceived performance.'),
    q('Can Suspense be used for server-side data fetching in Next.js?','Next.js 13+ App Router uses Suspense boundaries for streaming with React Server Components. Each Suspense boundary can independently stream its content from the server, enabling progressive rendering without blocking the page shell.')
  ],
  diagramSvg:svgW(720,300,'Suspense Flow',
    R(30,55,200,45,'#1a1d28','#6c9fff','Component Renders','Lazy import or data fetch needed')+
    A(130,100,130,125)+
    R(30,125,200,45,'#1a1d28','#f59e0b','Throws Promise','React catches the thrown promise')+
    A(130,170,130,195)+
    R(30,195,200,45,'#1a1d28','#f87171','Suspense Fallback','Loading spinner/skeleton shown')+
    A(130,240,130,258)+
    R(30,258,200,40,'#1a1d28','#34d399','Promise Resolves','React retries render, component shows'),
    T(250,78,'Component needs lazy chunk or async data',10,'#9aa0b0','start')+
    T(250,148,'React catches it automatically',10,'#9aa0b0','start')+
    T(250,218,'Declarative fallback UI',10,'#9aa0b0','start')+
    T(250,278,'Component renders with data/code ready',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Nested Suspense for Granular Loading','Page shell loads first, sections load independently',
      codeBlock([
        'function DashboardPage() {',
        '  return (',
        '    <Suspense fallback={<PageSkeleton />}>',
        '      <Header />',
        '',
        '      <div className="grid">',
        '        <Suspense fallback={<CardSkeleton />}>',
        '          <RevenueChart />',
        '        </Suspense>',
        '',
        '        <Suspense fallback={<CardSkeleton />}>',
        '          <UserActivityFeed />',
        '        </Suspense>',
        '      </div>',
        '',
        '      <Suspense fallback={<ListSkeleton />}>',
        '        <RecentOrdersTable />',
        '      </Suspense>',
        '    </Suspense>',
        '  );',
        '}',
        '',
        '// Each lazy-loaded section:',
        'const RevenueChart = React.lazy(() => import("./RevenueChart"));',
        'const UserActivityFeed = React.lazy(() => import("./UserActivityFeed"));',
        'const RecentOrdersTable = React.lazy(() => import("./RecentOrdersTable"));'
      ]),
      'The outer Suspense shows a full page skeleton. Inner Suspense boundaries show card/list skeletons. As each section loads, its skeleton is replaced independently. The Header (not lazy) renders immediately.'
    ),
    e('Suspense with Data Fetching (React 18 + use)','Declarative data loading with Suspense integration',
      codeBlock([
        'import { use, Suspense } from "react";',
        '',
        '// A Suspense-enabled data resource',
        'function fetchUser(id) {',
        '  const promise = fetch("/api/users/" + id).then(r => r.json());',
        '  return {',
        '    read() {',
        '      if (this.data) return this.data;',
        '      if (this.error) throw this.error;',
        '      if (this.promise) throw this.promise;',
        '      this.promise = promise.then(d => { this.data = d; },',
        '                                         e => { this.error = e; });',
        '      throw this.promise;',
        '    }',
        '  };',
        '}',
        '',
        'function UserProfile({ userId }) {',
        '  const user = use(fetchUser(userId));',
        '  return <div><h2>{user.name}</h2><p>{user.email}</p></div>;',
        '}',
        '',
        'function App() {',
        '  return (',
        '    <Suspense fallback={<div className="spinner" />}>',
        '      <UserProfile userId={42} />',
        '    </Suspense>',
        '  );',
        '}'
      ]),
      'The UserProfile component suspends until the fetch resolves. Suspense shows the fallback spinner automatically. When data arrives, the component re-renders with the user data. No manual loading/error state management needed.'
    )
  ],
  mcqQuestions:[
    m('What mechanism does Suspense use to detect loading?',['Checking a global loading variable','The thrown promise pattern - components throw a Promise while loading','Using setTimeout callbacks','React.memo comparison'],1,'Suspense relies on components throwing a Promise during loading. React catches it and shows the fallback.'),
    m('Does Suspense handle error states?',['Yes it shows error fallbacks','No - errors must be caught by Error Boundaries','Yes but only for code splitting','No - errors crash the app'],1,'Suspense only handles pending (loading) states. Errors (rejected promises) propagate to the nearest error boundary.'),
    m('What is the benefit of nested Suspense?',['Faster initial load','Granular loading UX - each section independently shows its loading state and reveals when ready','Smaller bundle size','Better SEO'],1,'Nested Suspense provides a better user experience by allowing sections to load independently without affecting other already-loaded sections.'),
    m('What does useTransition do in relation to Suspense?',['It disables Suspense','It defers showing the fallback during transitions, keeping the current UI visible','It turns off lazy loading','It shows multiple fallbacks at once'],1,'useTransition marks an update as non-urgent. React can keep showing the current UI instead of switching to a loading state during navigation or data transitions.'),
    m('In React 18, how does Suspense enhance SSR?',['It blocks SSR entirely','Streaming SSR - the server sends HTML progressively, Suspense boundaries stream independently','It makes SSR slower but more reliable','It replaces SSR with static generation'],1,'React 18s streaming SSR uses Suspense boundaries as streaming points. Each boundary can independently stream its content, reducing TTFB.'),
    m('Which library is NOT Suspense-compatible for data fetching?',['Relay','SWR','Axios (directly, without a wrapper)','TanStack Query'],2,'Axios needs a Suspense-compatible wrapper (like use() from React 18 or a library like @tanstack/react-query with suspense: true). Plain Axios calls do not integrate with Suspense.')
  ]
};

// ========== 10. Error Boundaries ==========
topics['react-error-boundaries'] = {
  id:'react-error-boundaries', title:'React Error Boundaries', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'Error boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI.',
    'They catch errors during rendering, lifecycle methods, and constructors - but NOT event handlers, async code, or SSR.',
    'Error boundaries are implemented as class components with static getDerivedStateFromError() and componentDidCatch().',
    'React 16+ introduced error boundaries; React 18 extends behavior with concurrent mode and Suspense integration.'
  ],
  laymanDefinition:'Error boundaries are like safety nets at a circus. When a trapeze artist falls (a component crashes due to a bug), the safety net catches them and shows a "We\'ll be right back!" sign instead of letting the whole show crash (the entire app going white). Without error boundaries, one component\'s error crashes the entire React tree, showing a blank page. With error boundaries, only the crashing section is replaced with a fallback UI, and the rest of the app continues working. They are implemented as class components because function components do not yet support componentDidCatch lifecycle.',
  deepDive:[
    d('Creating an Error Boundary Component','Error boundaries must be class components because they require lifecycle methods that function components do not have: getDerivedStateFromError (static) and componentDidCatch. getDerivedStateFromError receives the error and updates state to show fallback UI. componentDidCatCh receives the error and error info (component stack trace) for logging. The boundary renders this.props.children normally when no error occurred, and a fallback UI when an error is caught. Common practice: create a generic ErrorBoundary component that accepts a fallback prop, and reuse it throughout the app. In React 18, error boundaries work with concurrent mode and Suspense, catching errors from lazy-loaded components. A known limitation: error boundaries do not catch errors in server-side rendering or event handlers (use try-catch in event handlers instead).'),
    d('What Error Boundaries Catch vs What They Miss','CAUGHT: (1) Render phase errors - during component function/class render. (2) Lifecycle method errors - componentDidMount, componentDidUpdate, getDerivedStateFromProps, etc. (3) Constructor errors. (4) Errors in lazy-loaded components (Suspense integration). (5) Errors in nested event handlers triggered during commit phase effects (in useLayoutEffect). NOT CAUGHT: (1) Event handler errors (use try-catch). (2) Asynchronous code errors (setTimeout, requestAnimationFrame callbacks) - use .catch(). (3) Server-side rendering errors. (4) Errors thrown in the error boundary itself (these propagate up). (5) Errors in the event propagation phase (native DOM events). For event handlers and async code, use JavaScript try-catch or catch the promise rejection.'),
    d('Error Recovery Strategies','When an error boundary catches an error, the component tree below it is unmounted. Recovery requires: (1) Resetting the error state to retry rendering. A common pattern: give the fallback UI a "Try Again" button that calls this.setState({ hasError: false }). (2) Logging the error to a monitoring service (Sentry, LogRocket, Datadog) in componentDidCatch. (3) For permanent errors, displaying a meaningful error message with support contact info. (4) For transient errors (network failures, chunk load failures), automatic retry with exponential backoff. (5) Granular boundaries - smaller boundaries isolate errors better (a crash in the comments section does not take down the product listing).'),
    d('Granular Error Boundary Strategy','The key architectural decision is boundary placement: (1) Root-level boundary - one boundary at the app root catches all errors. Shows a full-page error screen. Use as a last resort to prevent a completely blank page. (2) Feature-level boundaries - each major feature (sidebar, main content, comments, header) gets its own boundary. An error in one feature does not affect others. (3) Component-level boundaries - async components, third-party widgets, and user-generated content each wrapped individually. This isolates crashes to the smallest possible area. (4) Suspense boundary integration - wrap lazy-loaded components with both error boundaries (for chunk load failures) and Suspense (for loading states). The combination provides complete coverage: loading -> Suspense fallback, error -> error boundary fallback, success -> component renders.'),
    d('React 18 Error Boundary Improvements','React 18 improves error boundaries with: (1) Concurrent mode - error boundaries correctly handle errors during concurrent renders, including render interruptions and resumptions. (2) Suspense integration - error boundaries catch errors from Suspense data fetching (rejected promises). (3) StrictMode double-invocation - in development, React intentionally double-invokes component functions to detect side effects; error boundaries must handle this without logging errors twice. (4) Recoverable errors - in some cases React 18 can recover from errors without unmounting the tree (experimental). (5) The upcoming react-error-boundary library provides a declarative <ErrorBoundary> component with hooks support for common patterns like retry and error logging.')
  ],
  interviewAnswer:'Error boundaries are class components that catch JavaScript errors in their child tree using getDerivedStateFromError (for render fallback) and componentDidCatch (for logging). They catch render, lifecycle, and constructor errors but NOT event handlers, async code, or SSR errors. Use a strategy of granular boundaries: one at each feature level rather than a single root boundary. The fallback UI should include a retry mechanism. Error boundaries pair with Suspense for complete async handling: Suspense for loading states, error boundary for error states. Log errors to monitoring services in componentDidCatch. React 18 improves boundary behavior in concurrent mode and with Suspense data fetching.',
  interviewQuestions:[
    q('What errors does an error boundary catch?','Errors in render, lifecycle methods (componentDidMount, componentDidUpdate, etc.), constructors, and useLayoutEffect. It does NOT catch event handler errors, async/setTimeout errors, SSR errors, or errors thrown in the boundary itself.'),
    q('How do you create an error boundary?','As a class component with getDerivedStateFromError(error) returning { hasError: true } and componentDidCatch(error, info) for logging. Render children if no error, render fallback UI if error. React does not have a built-in <ErrorBoundary> component - you must create your own.'),
    q('Why must error boundaries be class components?','Function components do not support the lifecycle methods getDerivedStateFromError and componentDidCatch. These are the only mechanisms React provides for intercepting render-phase errors. A future React version may add hooks-based error handling.'),
    q('Can error boundaries catch errors in event handlers?','No. Use try-catch in event handlers: try { doSomething() } catch (e) { setError(e) }. Or use the event handlers error property like window.onerror for uncaught errors.'),
    q('How do you reset an error boundary?','Set state in the fallback UI: this.setState({ hasError: false }). This re-attempts rendering the children. Combine with a "Try Again" button in the fallback UI for user-initiated retry.'),
    q('What is the recommended error boundary placement strategy?','Use multiple granular boundaries: one at the app root (last resort), one per major feature/widget, and one around third-party components and user-generated content. This prevents a single crash from taking down unrelated parts of the UI.'),
    q('How do error boundaries work with React.lazy and Suspense?','Wrap the Suspense component with an error boundary. If the lazy chunk fails to load (network error), the error boundary catches the rejected import promise and shows an error fallback (with retry). Suspense handles the loading state; the error boundary handles the error state.'),
    q('What information does componentDidCatch provide?','The error object (message, stack) and an info object with componentStack (the React component tree trace showing which component threw the error). This stack is crucial for debugging because it shows the component hierarchy, not just JavaScript call stack.'),
    q('How does React 18 concurrent mode affect error boundaries?','Error boundaries work correctly in concurrent mode. If a render is interrupted, errors from the interrupted render are discarded. Only errors from the committed render trigger the boundary. This prevents false positives from concurrent render cancellations.'),
    q('What is the react-error-boundary library?','A popular third-party library that provides a reusable <ErrorBoundary> component with fallback prop, onError callback, resetKeys for automatic reset, and a useErrorHandler hook for function components to report errors to the nearest boundary.')
  ],
  diagramSvg:svgW(720,300,'Error Boundary Architecture',
    R(30,55,200,45,'#1a1d28','#6c9fff','Error Boundary','Catches errors in child tree')+
    A(130,100,130,125)+
    R(55,125,150,30,'#1a1d28','#34d399','Header','Works normally')+
    A(130,155,130,175)+
    R(55,175,150,30,'#1a1d28','#f87171','Crashed Widget','Error caught by boundary')+
    A(130,205,130,225)+
    R(55,225,150,30,'#1a1d28','#34d399','Footer','Continues working')+
    T(250,78,'getDerivedStateFromError() + componentDidCatch()',10,'#9aa0b0','start')+
    T(250,140,'Operates independently',10,'#9aa0b0','start')+
    T(250,190,'Replaced by fallback UI',10,'#f87171','start')+
    T(250,240,'App continues functioning',10,'#34d399','start')
  ),
  codeExamples:[
    e('Reusable Error Boundary Component with Retry','Standard pattern for error isolation and recovery',
      codeBlock([
        'class ErrorBoundary extends React.Component {',
        '  constructor(props) {',
        '    super(props);',
        '    this.state = { hasError: false, error: null };',
        '  }',
        '',
        '  static getDerivedStateFromError(error) {',
        '    return { hasError: true, error };',
        '  }',
        '',
        '  componentDidCatch(error, info) {',
        '    console.error("Error caught:", error);',
        '    console.error("Component stack:", info.componentStack);',
        '    if (typeof this.props.onError === "function") {',
        '      this.props.onError(error, info);',
        '    }',
        '  }',
        '',
        '  handleRetry = () => {',
        '    this.setState({ hasError: false, error: null });',
        '  };',
        '',
        '  render() {',
        '    if (this.state.hasError) {',
        '      const Fallback = this.props.fallback;',
        '      if (Fallback) {',
        '        return <Fallback error={this.state.error} onRetry={this.handleRetry} />;',
        '      }',
        '      return (',
        '        <div role="alert" className="error-boundary-fallback">',
        '          <h2>Something went wrong</h2>',
        '          <p>{this.state.error.message}</p>',
        '          <button onClick={this.handleRetry}>Try Again</button>',
        '        </div>',
        '      );',
        '    }',
        '    return this.props.children;',
        '  }',
        '}',
        '',
        '// Usage:',
        '<ErrorBoundary fallback={WidgetErrorFallback}>',
        '  <Suspense fallback={<WidgetSkeleton />}>',
        '    <StockTicker />',
        '  </Suspense>',
        '</ErrorBoundary>'
      ]),
      'The reusable ErrorBoundary accepts an optional fallback component and onError callback. The fallback receives the error and a retry function. The retry resets state, causing React to re-render the children.'
    ),
    e('Granular Error Boundaries in a Dashboard','Isolate crashes to specific widgets without affecting others',
      codeBlock([
        'function Dashboard() {',
        '  return (',
        '    <div className="dashboard">',
        '      <h1>Dashboard</h1>',
        '',
        '      <ErrorBoundary fallback={WidgetError}>',
        '        <SalesChart />',
        '      </ErrorBoundary>',
        '',
        '      <ErrorBoundary fallback={WidgetError}>',
        '        <UserActivity />',
        '      </ErrorBoundary>',
        '',
        '      <ErrorBoundary fallback={WidgetError}>',
        '        <RecentOrders />',
        '      </ErrorBoundary>',
        '',
        '      <ErrorBoundary fallback={WidgetError}>',
        '        <StockTicker />',
        '      </ErrorBoundary>',
        '    </div>',
        '  );',
        '}',
        '',
        'function WidgetError({ onRetry }) {',
        '  return (',
        '    <div className="widget-error">',
        '      <p>This widget failed to load</p>',
        '      <button onClick={onRetry}>Reload Widget</button>',
        '    </div>',
        '  );',
        '}'
      ]),
      'If the StockTicker crashes due to a bad API response, only that widget shows the error fallback. SalesChart, UserActivity, and RecentOrders continue working normally. Each widget has independent error recovery.'
    )
  ],
  mcqQuestions:[
    m('Which lifecycle method updates state when an error is caught?',['componentDidCatch','getDerivedStateFromError (static)','componentWillUnmount','shouldComponentUpdate'],1,'getDerivedStateFromError is a static method that receives the error and returns state update (e.g., { hasError: true }). It runs during render phase to show fallback UI.'),
    m('Which errors does an error boundary NOT catch?',['Render errors','Event handler errors','Lifecycle errors','Constructor errors'],1,'Error boundaries do not catch event handler errors. Use try-catch in event handlers and update state to show error UI.'),
    m('Why cant function components be error boundaries?',['React does not support hooks for error handling','Function components lack getDerivedStateFromError and componentDidCatch lifecycle methods','Function components are inherently less stable','Error boundaries require a DOM node'],1,'Error boundary functionality requires lifecycle methods that only exist in class components. A future React version may add hooks support.'),
    m('What does componentDidCatch receive?',['Only the error object','The error object and an info object with componentStack','The error and the offending components props','Just the component stack trace'],1,'componentDidCatch(error, info) receives the error and an info object where info.componentStack is the React component stack trace.'),
    m('How does the retry mechanism work in error boundaries?',['Call this.forceUpdate()','Reset hasError state to false, causing React to re-render children','Reload the page','Call this.setState({ error: null })'],1,'Setting hasError: false causes render() to return this.props.children again. React re-mounts the child tree from the boundary down.'),
    m('What is the primary purpose of granular error boundaries?',['Improve bundle size','Isolate errors so one components crash does not take down unrelated parts of the UI','Reduce server load','Improve test coverage'],1,'Granular boundaries ensure that a crash in one section (e.g., comments widget) does not affect other sections (e.g., product list, navigation).')
  ]
};

// ========== 11. Portal ==========
topics['react-portal'] = {
  id:'react-portal', title:'React Portal', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'Portals render a component into a different DOM node outside the parent components DOM hierarchy.',
    'ReactDOM.createPortal(children, domNode) is the API - children render at domNode while maintaining React context and event bubbling.',
    'Portals are commonly used for modals, tooltips, dropdowns, and toast notifications that need to break out of overflow: hidden or z-index stacking contexts.',
    'Event propagation works through the React tree, not the DOM tree - events from portal content bubble to the portal parents React ancestors.'
  ],
  laymanDefinition:'Portals are like having a secret tunnel that lets a component escape its parent container and appear anywhere in the HTML document. Even though the portal content renders somewhere else in the DOM (like inside <body> for a modal overlay), from React\'s perspective it is still a child of the component that created the portal. This means: (1) The portal content can break out of CSS constraints like overflow: hidden, z-index stacking, or clipped parent containers. (2) Context providers (theme, auth) still work because the portal lives in the React tree as a child. (3) Events bubble up through the React component hierarchy, not the DOM hierarchy.',
  deepDive:[
    d('Portal DOM Architecture','ReactDOM.createPortal accepts two arguments: children (renderable React node) and domNode (a DOM element, typically document.body). The portal renders children inside domNode, bypassing the parent DOM hierarchy. This means: (1) The portaled content is not a child of the parent DOM element. (2) CSS styles that affect the parent (overflow: hidden, opacity, transform, z-index) do not affect the portal. (3) The portal is appended to domNode as a sibling to the root React mount. (4) Multiple portals can render into the same domNode - they are ordered by render order. (5) The portal is removed from the DOM when the parent component unmounts. React manages the portal lifecycle: mount the component -> portal created in DOM; unmount -> portal removed.'),
    d('Event Bubbling Through Portal Boundaries','This is the most important and often misunderstood portal behavior. Events from portal content bubble up through the React component tree, NOT the DOM tree. Example: A modal (rendered via portal to document.body) contains a button that triggers an onClick on the parent component. Even though the button is a DOM child of <body> and the parent is nested deep in <div id="root">, the onClick from the portal button bubbles up through the React component hierarchy and triggers the parents handler normally. This is because React uses its own synthetic event system that follows React component hierarchy, not DOM hierarchy. This behavior is crucial for event delegation, context providers, and redux connect() to work correctly across portal boundaries.'),
    d('Portal Use Cases and Patterns','(1) Modals/Dialogs - overlay needs to break out of parent z-index and overflow contexts. Render portal to document.body, position fixed, backdrop behind. (2) Tooltips - positioned relative to trigger element but must not be clipped by overflow: hidden ancestors. Use portal + absolute/fixed positioning calculated from trigger rect. (3) Dropdown menus - same as tooltips, must break out of overflow constraints and stacking contexts. (4) Toast notifications - render all toasts into a single portal container for consistent positioning and stacking. (5) Floating elements (context menus, date pickers) - need to escape parent boundaries for proper display. (6) Full-screen elements (lightboxes, onboarding overlays) - must cover the entire viewport regardless of parent constraints.'),
    d('Portal Accessibility Considerations','(1) Focus management - when a modal opens via portal, focus must be trapped inside the modal (use focus-trap-react or manual focus management). (2) ARIA attributes - modals should have role="dialog", aria-modal="true", aria-labelledby pointing to the title. (3) Keyboard navigation - Escape key should close the modal; Tab should cycle through focusable elements within the modal. (4) Screen reader announcements - use aria-live regions for dynamic content changes. (5) Ensure the portal container element is accessible (not hidden from screen readers). (6) For tooltips/dropdowns, ensure proper aria-describedby relationships between the trigger and the portal content. (7) Test with keyboard navigation and screen readers.'),
    d('Portal Performance and Edge Cases','(1) Rendering a portal causes work in two separate parts of the DOM - React handles this efficiently but be mindful of layout thrashing. (2) Avoid creating portal containers dynamically on every render - create the container element once (e.g., outside the component or with useRef + useEffect). (3) Multiple siblings rendering portals into the same container can cause ordering issues - use explicit ordering or unique containers. (4) Hydration - portals work during hydration but the server-rendered HTML must include the portal container element. (5) Testing - portal content renders outside the normal DOM tree. In React Testing Library, portal content is still queryable because RTL queries the entire document. (6) Error boundaries wrap the portal-creating component, not the portal content DOM location.')
  ],
  interviewAnswer:'ReactDOM.createPortal renders children into a different DOM node while maintaining React context and event bubbling. It is essential for modals, tooltips, and dropdowns that must escape CSS constraints like overflow: hidden or z-index contexts. Events from portal content bubble through the React component tree (not DOM tree), so context providers and event handlers in the parent still work. Portals support all React features including context, refs, and hydration. For accessibility, implement focus trapping and ARIA attributes (role="dialog", aria-modal) in modal portals. Create portal containers statically to avoid unnecessary DOM operations.',
  interviewQuestions:[
    q('What problem do portals solve?','They allow components to render outside their parents DOM hierarchy while maintaining React context and event propagation. This is essential for elements that must break out of CSS constraints like overflow: hidden or limited z-index stacking contexts.'),
    q('How does event bubbling work with portals?','Events bubble through the React component tree, not the DOM tree. A click on portal content will bubble up to the portal-creating components ancestors in the React tree, even though the portal content is a DOM child of a different node.'),
    q('What is the syntax for creating a portal?','ReactDOM.createPortal(children, domNode). children is the React node(s) to render and domNode is the target DOM element (e.g., document.getElementById("modal-root") or document.body).'),
    q('Do context providers work through portals?','Yes. Portals maintain React tree hierarchy for context. A context.Provider wrapping the portal-creating component will provide values to the portal content, even though the portal renders in a different part of the DOM.'),
    q('What are the common accessibility requirements for portal modals?','Focus trapping (Tab cycles within modal), role="dialog" and aria-modal="true", Escape key to close, aria-labelledby pointing to the modal title, and proper focus restoration when the modal closes.'),
    q('How do you test components that use portals?','React Testing Library queries the entire document, so portal content is findable. Use screen.getByRole("dialog") for modals. For positions, assert on computed styles or use data-testid. For event bubbling, simulate events on portal content and assert parent handlers fire.'),
    q('Can portals be used with server-side rendering?','Yes, but the portal container DOM node must exist in the server-rendered HTML. Create the container element in the HTML template (e.g., <div id="modal-root"></div>) so hydration can attach the portal correctly.'),
    q('What happens to portal content when the portal-creating component unmounts?','React automatically removes the portal content from the DOM. The lifecycle of the portal is tied to the creating component. Cleanup happens during the commit phase when the parent unmounts.'),
    q('How do you handle multiple modals with portals?','Stack them with z-index ordering. Each modal renders its own portal. The most recently opened modal has the highest z-index. For multiple modals, manage z-index explicitly (e.g., baseZIndex + index * 100) or use a modal manager that tracks the stack.'),
    q('Can you pass refs through portals?','Yes. React refs work normally with portals. If you pass a ref to an element inside portal content, the ref will point to the actual DOM node (which lives in the portal container, not the parent DOM tree).')
  ],
  diagramSvg:svgW(720,300,'Portal DOM vs React Tree',
    R(30,55,200,35,'#1a1d28','#6c9fff','React Tree','<App>')+
    T(30,110,'<ModalButton>',11,'#f59e0b','start')+
    T(30,130,'  <Modal> -> createPortal',10,'#9aa0b0','start')+
    T(30,150,'  </Modal>',10,'#9aa0b0','start')+
    T(30,170,'</ModalButton>',11,'#f59e0b','start')+
    T(350,78,'DOM Tree:','#6c9fff','start')+
    T(350,110,'<div id="root">',11,'#9aa0b0','start')+
    T(350,130,'  <ModalButton>...</ModalButton>',10,'#9aa0b0','start')+
    T(350,150,'</div>',10,'#9aa0b0','start')+
    T(350,170,'<div id="modal-root">',11,'#9aa0b0','start')+
    T(350,190,'  <Modal>...</Modal>  <-- Portal renders here',10,'#f59e0b','start')+
    T(350,210,'</div>',10,'#9aa0b0','start')+
    T(30,230,'React context flows through React tree',10,'#34d399','start')+
    T(30,250,'Events bubble through React hierarchy',10,'#34d399','start')
  ),
  codeExamples:[
    e('Modal Component with Portal','Full-screen modal with backdrop, focus trap, and keyboard handling',
      codeBlock([
        'function Modal({ isOpen, onClose, title, children }) {',
        '  const overlayRef = useRef(null);',
        '',
        '  useEffect(() => {',
        '    if (!isOpen) return;',
        '    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };',
        '    document.addEventListener("keydown", handleEsc);',
        '    return () => document.removeEventListener("keydown", handleEsc);',
        '  }, [isOpen, onClose]);',
        '',
        '  if (!isOpen) return null;',
        '',
        '  return ReactDOM.createPortal(',
        '    <div',
        '      ref={overlayRef}',
        '      role="dialog"',
        '      aria-modal="true"',
        '      aria-labelledby="modal-title"',
        '      style={{',
        '        position: "fixed", inset: 0, zIndex: 1000,',
        '        display: "flex", alignItems: "center", justifyContent: "center",',
        '        background: "rgba(0,0,0,0.5)"',
        '      }}',
        '      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}',
        '    >',
        '      <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 400 }}>',
        '        <h2 id="modal-title">{title}</h2>',
        '        {children}',
        '        <button onClick={onClose}>Close</button>',
        '      </div>',
        '    </div>,',
        '    document.getElementById("modal-root")',
        '  );',
        '}',
        '',
        'function App() {',
        '  const [open, setOpen] = useState(false);',
        '  return (',
        '    <div>',
        '      <button onClick={() => setOpen(true)}>Open Modal</button>',
        '      <Modal isOpen={open} onClose={() => setOpen(false)} title="Example">',
        '        <p>This content is rendered via portal.</p>',
        '      </Modal>',
        '      <div id="modal-root" />',
        '    </div>',
        '  );',
        '}'
      ]),
      'The modal renders into #modal-root which is outside the main app DOM hierarchy. Clicking the backdrop closes the modal. Escape key closes the modal. ARIA attributes provide accessibility. The portal container div is defined in JSX but could also be in the HTML template.'
    ),
    e('Tooltip Using Portal','Position tooltip relative to trigger without overflow clipping',
      codeBlock([
        'function Tooltip({ text, children }) {',
        '  const [visible, setVisible] = useState(false);',
        '  const [pos, setPos] = useState({ top: 0, left: 0 });',
        '  const triggerRef = useRef(null);',
        '',
        '  const show = () => {',
        '    if (triggerRef.current) {',
        '      const rect = triggerRef.current.getBoundingClientRect();',
        '      setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });',
        '    }',
        '    setVisible(true);',
        '  };',
        '',
        '  return (',
        '    <>',
        '      <span ref={triggerRef} onMouseEnter={show} onMouseLeave={() => setVisible(false)}>',
        '        {children}',
        '      </span>',
        '      {visible && ReactDOM.createPortal(',
        '        <div',
        '          role="tooltip"',
        '          style={{',
        '            position: "fixed", top: pos.top, left: pos.left,',
        '            transform: "translateX(-50%)",',
        '            padding: "6px 12px", background: "#333", color: "#fff",',
        '            borderRadius: 4, fontSize: 13, zIndex: 9999,',
        '            whiteSpace: "nowrap"',
        '          }}',
        '        >',
        '          {text}',
        '        </div>,',
        '        document.body',
        '      )}',
        '    </>',
        '  );',
        '}',
        '',
        '// Usage - tooltip wont be clipped by parent containers:',
        '<div style={{ overflow: "hidden", height: 50 }}>',
        '  <Tooltip text="Detailed explanation here">',
        '    <span>Hover me</span>',
        '  </Tooltip>',
        '</div>'
      ]),
      'Even though the trigger is inside an overflow: hidden container, the tooltip renders via portal into document.body and is fully visible. The position is calculated from the trigger elements bounding rect on hover.'
    )
  ],
  mcqQuestions:[
    m('What does ReactDOM.createPortal do?',['Creates a new React root component','Renders children into a different DOM node while preserving React context and event bubbling','Creates a new Redux store','Duplicates a component in the DOM'],1,'createPortal renders React children into a specified DOM node outside the parent hierarchy while maintaining React tree semantics.'),
    m('How do events bubble from portal content?',['Through the DOM tree only','Through the React component tree, not the DOM tree','Events do not bubble from portals','Through both DOM and React trees simultaneously'],1,'Events from portal content bubble through the React hierarchy. A click on portal content triggers event handlers on React ancestors of the portal-creating component.'),
    m('Which CSS constraints do portals help escape?',['Font-family rules','overflow: hidden, z-index stacking contexts, transform, and opacity','Color inheritance','Margin collapsing'],1,'Portals render outside the parent DOM element, escaping CSS constraints that clip or transform the parent container.'),
    m('Do React context providers work through portals?',['No, context stops at portal boundaries','Yes, context flows through React tree, not DOM tree','Only if the portal container is inside the provider','Only with useContext, not Context.Consumer'],1,'Context is propagated through the React component hierarchy, which is maintained across portal boundaries.'),
    m('What happens to a portal when its parent unmounts?',['The portal remains in the DOM forever','React automatically removes the portal content from the DOM','The portal moves to the document root','The portal throws an error'],1,'The portal lifecycle is tied to the creating component. When the component unmounts, React unmounts the portal content and removes it from the DOM.'),
    m('What is the recommended DOM node for modal portals?',['Inside the parent component','document.body or a dedicated <div id="modal-root">','The window object','The document head'],1,'A dedicated container element (e.g., <div id="modal-root">) or document.body is recommended. The container should be outside the main app root for proper z-index and overflow stacking.')
  ]
};

// ========== 12. forwardRef ==========
topics['react-forward-ref'] = {
  id:'react-forward-ref', title:'React forwardRef', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'forwardRef lets a parent component pass a ref through a child component to one of its DOM elements.',
    'It wraps a function component to accept a ref as the second argument after props.',
    'Essential for reusable component libraries where the parent needs imperative access to internal DOM nodes.',
    'forwardRef is often combined with useImperativeHandle to expose a limited API instead of the raw DOM node.'
  ],
  laymanDefinition:'forwardRef is like giving a child component a forwarding address. Normally, function components do not accept refs (they are not DOM elements). But forwardRef creates a "forwarding address" so the parent can send a ref to a child and have it automatically forwarded to a specific DOM element inside the child. This is useful when you build reusable components like FancyInput or CustomButton - the parent should be able to call .focus() on them, but the actual <input> is inside the child. Without forwardRef, you would need to expose a focus method manually or use prop drilling.',
  deepDive:[
    d('How forwardRef Works','forwardRef accepts a render function with two parameters: (props, ref). The component returns JSX normally, but attaches the ref to a specific DOM element (or another component). The ref passed by the parent arrives as the second argument. React handles the ref forwarding automatically during reconciliation: when the parent passes ref={myRef} to the wrapped component, the inner render function receives the ref and can attach it to a child. forwardRef is a higher-order component conceptually - it wraps the inner component and returns a new component that accepts ref. The ref is not a prop - React treats ref specially and does not pass it as props[ref]. forwardRef bridges this gap by making the ref accessible in the function signature.'),
    d('forwardRef with useImperativeHandle','useImperativeHandle customizes the instance value exposed by the forwarded ref. Instead of exposing the raw DOM node, the child defines a limited API object. Example: useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus(), reset: () => { inputRef.current.value = ""; }, validate: () => inputRef.current.checkValidity() }), []). The parent receives { focus, reset, validate } instead of the raw <input> element. Benefits: encapsulation (parent cannot access arbitrary DOM properties), abstraction (internal implementation can change without affecting parent), and security (expose only safe operations). Use useImperativeHandle sparingly - prefer declarative props over imperative refs when possible.'),
    d('When to Use forwardRef','(1) Reusable input components - FancyInput, PhoneInput, DatePicker where the parent needs to focus or validate. (2) Animation libraries - GSAP, Framer Motion need direct DOM access to animated elements inside custom components. (3) Scroll management - scrollTo methods on custom list components. (4) Media components - play/pause/seek on custom VideoPlayer. (5) Third-party library integration - D3, Chart.js, Leaflet need DOM nodes. (6) Measuring/positioning - getBoundingClientRect on internal elements. (7) Form libraries - react-hook-form uses refs for input registration. (8) Do NOT use forwardRef when the parent only needs to pass data - use props instead. forwardRef is for imperative access to DOM or component instance methods.'),
    d('forwardRef with TypeScript','TypeScript typing for forwardRef requires careful generic syntax: const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>((props, ref) => <input ref={ref} ... />). The first generic parameter is the ref type (HTMLInputElement), the second is the props type. The ref type must match the element type the ref is attached to. For useImperativeHandle, define a handle interface: interface FancyInputHandle { focus(): void; reset(): void; }. Then: React.forwardRef<FancyInputHandle, Props>((props, ref) => { useImperativeHandle(ref, () => ({ focus, reset }), []); ... }). The parent receives typed access: const ref = useRef<FancyInputHandle>(null); ref.current?.focus().'),
    d('forwardRef with Higher-Order Components','When combining forwardRef with HOCs (connect, withRouter, withStyles), ref forwarding must be manually handled. The HOC typically consumes the ref in its outer component and must forward it using forwardRef. This was a common pain point in class-component era Redux. Modern pattern: Redux Toolkit\'s connect has a { forwardRef: true } option. For custom HOCs, the pattern is: function withHOC(Component) { return React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />); }. The inner component receives ref via forwardedRef prop. Avoid combining multiple HOCs with forwardRef - prefer hooks for cross-cutting concerns.')
  ],
  interviewAnswer:'forwardRef allows a function component to accept a ref from its parent and forward it to a child DOM element. The component receives (props, ref) as arguments. forwardRef is essential for reusable component libraries where parents need imperative access (focus, scroll, measure). Combine with useImperativeHandle to expose a limited API instead of the raw DOM node. forwardRef supports TypeScript generics for type-safe refs. Avoid forwardRef when declarative props suffice - it is an escape hatch for imperative operations.',
  interviewQuestions:[
    q('What problem does forwardRef solve?','Function components do not accept refs by default. forwardRef creates a bridge so the parent can pass a ref through a child component to a specific DOM element inside it. Without forwardRef, the ref prop is ignored on function components.'),
    q('How is forwardRef different from passing a ref prop?','forwardRef uses Reacts built-in ref mechanism (second argument in the function signature). Passing a ref as a regular prop (e.g., <Child innerRef={ref} />) works but is non-standard and loses Reacts ref integration (e.g., callback refs, ref cleanup in React 18). forwardRef is the idiomatic approach.'),
    q('What does useImperativeHandle do?','It customizes the value exposed by the forwarded ref. Instead of exposing the raw DOM node, the child defines a specific API object (e.g., { focus, reset }). This encapsulates the implementation and prevents the parent from accessing arbitrary DOM properties.'),
    q('What is the TypeScript syntax for forwardRef?','React.forwardRef<RefType, PropsType>((props, ref) => ...). RefType is the type of the element or handle (e.g., HTMLInputElement or a custom interface). PropsType is the components props interface.'),
    q('Can forwardRef be used with React.memo?','Yes: React.memo(React.forwardRef(MyComponent)). Both HOCs compose correctly. The memoization compares the props (ref is excluded from comparison). The forwarded ref works normally through the memo wrapper.'),
    q('When should you NOT use forwardRef?','When the parent only needs to pass data or callbacks to the child. Use regular props instead. forwardRef is for imperative operations: focus, scroll, measure, play, seek. For data flow, props are declarative and should be preferred.'),
    q('How does forwardRef work with ref callback patterns?','Callback refs work the same way: the parent passes a callback function to ref, which forwardRef passes to the child. The child calls the callback with the DOM node when it mounts and null when it unmounts.'),
    q('What happens if a forwarded ref is not attached to any DOM element?','The ref.current will be null. This happens if the child does not use the ref or if the component renders conditionally. The parent must check ref.current !== null before accessing properties.'),
    q('Can you forward multiple refs from a single component?','No, forwardRef forwards only one ref. For multiple refs, use multiple wrapper components or pass additional refs via custom prop names (e.g., innerRef, scrollRef). React does not support forwarding multiple refs through a single forwardRef call.'),
    q('How do you debug ref forwarding issues?','Check that: (1) the component is wrapped in forwardRef, (2) the ref is attached to a DOM element (not a function component without forwardRef), (3) the parent creates the ref with useRef(null), (4) the component is mounted (ref.current is null before mount). React DevTools shows which components use forwardRef.')
  ],
  diagramSvg:svgW(720,280,'forwardRef Flow',
    R(30,55,200,45,'#1a1d28','#6c9fff','Parent','const inputRef = useRef(null)')+
    A(130,100,130,120)+
    R(30,120,200,40,'#1a1d28','#f59e0b','<FancyInput ref={inputRef}>','forwardRef wrapper')+
    A(130,160,130,180)+
    R(30,180,200,45,'#1a1d28','#34d399','<input ref={ref} />','DOM element receives the ref')+
    T(250,78,'useRef creates ref object',10,'#9aa0b0','start')+
    T(250,135,'forwardRef passes ref as 2nd arg',10,'#9aa0b0','start')+
    T(250,200,'inputRef.current = actual <input> DOM',10,'#34d399','start')
  ),
  codeExamples:[
    e('Reusable FancyInput with forwardRef and useImperativeHandle','Expose a focused API, not the raw DOM node',
      codeBlock([
        'const FancyInput = React.forwardRef((props, ref) => {',
        '  const inputRef = useRef(null);',
        '',
        '  useImperativeHandle(ref, () => ({',
        '    focus: () => {',
        '      inputRef.current.focus();',
        '      inputRef.current.style.outline = "2px solid #6c9fff";',
        '    },',
        '    reset: () => { inputRef.current.value = ""; },',
        '    validate: () => inputRef.current.checkValidity()',
        '  }), []);',
        '',
        '  return (',
        '    <div className="fancy-input">',
        '      <label>{props.label}</label>',
        '      <input ref={inputRef} {...props} className="input-field" />',
        '    </div>',
        '  );',
        '});',
        '',
        'function Form() {',
        '  const emailRef = useRef(null);',
        '  const passwordRef = useRef(null);',
        '',
        '  useEffect(() => { emailRef.current.focus(); }, []);',
        '',
        '  return (',
        '    <form>',
        '      <FancyInput ref={emailRef} label="Email" type="email" />',
        '      <FancyInput ref={passwordRef} label="Password" type="password" />',
        '      <button type="button" onClick={() => {',
        '        if (!emailRef.current.validate()) emailRef.current.focus();',
        '      }}>Submit</button>',
        '    </form>',
        '  );',
        '}'
      ]),
      'The parent receives a clean API (focus, reset, validate) instead of the raw input element. The implementation can change (e.g., switch from <input> to a third-party component) without affecting the parent.'
    ),
    e('forwardRef with Animation Library (GSAP)','Direct DOM access for animations inside a custom component',
      codeBlock([
        'const AnimatedCard = React.forwardRef(({ children, ...props }, ref) => {',
        '  return (',
        '    <div ref={ref} className="card" {...props}>',
        '      {children}',
        '    </div>',
        '  );',
        '});',
        '',
        'function App() {',
        '  const cardRef = useRef(null);',
        '',
        '  useEffect(() => {',
        '    gsap.from(cardRef.current, {',
        '      opacity: 0,',
        '      y: 50,',
        '      duration: 0.6,',
        '      ease: "power3.out"',
        '    });',
        '  }, []);',
        '',
        '  return (',
        '    <AnimatedCard ref={cardRef}>',
        '      <h2>Animated Content</h2>',
        '      <p>This card fades in and slides up using GSAP.</p>',
        '    </AnimatedCard>',
        '  );',
        '}'
      ]),
      'GSAP needs the actual DOM node to animate. forwardRef provides direct access to the card div inside AnimatedCard. The parent creates the animation imperatively without the child needing to know about GSAP.'
    )
  ],
  mcqQuestions:[
    m('What does forwardRef do?',['Creates a new ref','Allows function components to receive a ref from parent and forward it to a DOM element','Creates a forwarded copy of the component','Prevents refs from being passed to children'],1,'forwardRef wraps a function component so it receives ref as the second argument, enabling ref forwarding to a child DOM element.'),
    m('How many parameters does a forwardRef render function receive?',['One: props','Two: (props, ref)','Three: (props, ref, context)','Four: (props, ref, context, owner)'],1,'The render function inside forwardRef receives props as the first argument and ref as the second argument.'),
    m('What hook customizes the value exposed by a forwarded ref?',['useRef','useImperativeHandle','useCallback','useMemo'],1,'useImperativeHandle(ref, createHandle, deps) defines the object that the parent receives when accessing ref.current.'),
    m('Can forwardRef be used with class components?',['Yes, class components also need forwardRef','No, forwardRef is only for function components (class components already accept refs)','Only with PureComponent','Only with TypeScript'],1,'Class components already support refs natively via the instance. forwardRef is specifically for function components that cannot accept refs directly.'),
    m('What is the second generic parameter in React.forwardRef<RefType, PropsType>?',['The ref type','The props type','The return type','The children type'],1,'The first generic is the ref (element or handle) type. The second generic is the props type. Example: React.forwardRef<HTMLInputElement, { label: string }>.'),
    m('Which is NOT a valid use case for forwardRef?',['Focus management on a custom input','Passing data to a child component','Integrating with animation libraries','Measuring DOM element dimensions'],1,'forwardRef is for imperative operations (focus, measure, animate). Data passing should use declarative props.')
  ]
};

// ========== 13. Rendering Cycle ==========
topics['react-rendering-cycle'] = {
  id:'react-rendering-cycle', title:'React Rendering Cycle', difficulty:'advanced', estimatedMinutes:30,
  tldr:[
    'Rendering in React has three phases: Render (create VDOM), Reconciliation (diff VDOM), Commit (apply DOM changes).',
    'The render phase is pure and can be interrupted (in concurrent mode) - it creates a new VDOM tree.',
    'Reconciliation compares the new VDOM with the previous VDOM using the key-based diffing algorithm.',
    'The commit phase applies DOM mutations synchronously and runs lifecycle methods and effects.'
  ],
  laymanDefinition:'React\'s rendering cycle is like renovating a house with blueprints. First, React draws the new blueprints (Render phase - creates a virtual representation of the UI). Then it compares the new blueprints with the old ones to find differences (Reconciliation - like finding which rooms changed). Finally, it physically changes only the rooms that are different (Commit phase - updates the real DOM). The magic is that React figures out the minimal set of changes needed and batches them efficiently. In React 18, React can even pause the blueprint drawing if something more urgent comes in (concurrent mode), ensuring the app stays responsive.',
  deepDive:[
    d('Phase 1: Render Phase (Creating the VDOM)','The render phase starts when a state update, prop change, or context change triggers a re-render. React calls the component function to produce React elements (the Virtual DOM). This phase is "pure" - it must have no side effects (no API calls, no DOM mutations). React may call the component function multiple times for the same render in development (StrictMode). In concurrent mode, the render phase can be interrupted by higher-priority updates and resumed later. If React detects no change (via bailout from memo/useMemo/shouldComponentUpdate), it skips the subtree entirely. The output of the render phase is a fiber tree (React internal representation), not the actual DOM.'),
    d('Phase 2: Reconciliation (The Diffing Algorithm)','Reconciliation is the process of comparing the new VDOM tree with the previous one. React uses a heuristic O(n) algorithm based on two assumptions: (1) Different element types produce different trees (replacing <div> with <span> tears down the subtree). (2) Keys identify stable elements across renders. The algorithm: (a) If the element type changed (div -> span), destroy the old tree and build a new one. (b) If the type is the same, update the existing DOM element with changed props/attributes. (c) For lists, use keys to determine which items changed position, were added, or removed. The key prop is critical for list reconciliation - use stable, unique, and predictable keys (item IDs), avoiding array indices.'),
    d('Phase 3: Commit Phase (DOM Mutations and Effects)','After reconciliation produces a list of DOM mutations (insertions, deletions, updates), the commit phase applies them synchronously. This phase is not interruptible - it must complete atomically. The commit phase has sub-steps: (a) Before mutation - getSnapshotBeforeUpdate runs. (b) Mutation - React applies DOM changes (insert, update, remove nodes). (c) Layout effects - useLayoutEffect callbacks fire synchronously (before paint). (d) Passive effects - useEffect callbacks are scheduled to fire after paint. The commit phase is where side effects are safe because the DOM is available and React has finished all computations.'),
    d('Batching and Scheduling','React batches state updates for efficiency: (1) In React 17 and earlier, updates in event handlers (onClick, onChange) are batched. (2) React 18 adds automatic batching for all updates (setTimeout, Promises, native events) - multiple setState calls in the same microtask produce a single render. (3) Scheduling: React prioritizes updates based on their type (user input > network response > data prefetch). Lane priorities in the scheduler determine which updates to process first. (4) In concurrent mode, React can interrupt a low-priority render to process a high-priority input update, then resume the low-priority render. This ensures the app stays responsive during large renders.'),
    d('Concurrent Mode and the Rendering Cycle','React 18s concurrent mode fundamentally changes the render phase: (1) Rendering is interruptible - React can pause, yield to the browser, and resume. (2) Multiple renders can be in progress simultaneously (different priority levels). (3) Aborted renders are discarded - their DOM mutations never commit. (4) useTransition marks updates as low-priority, allowing React to show stale UI while preparing new content. (5) useDeferredValue defers re-rendering for non-urgent parts of the tree. (6) The render phase remains pure (no side effects) - this is crucial because aborted renders would leak side effects otherwise. Concurrent mode preserves all existing React patterns - it only affects scheduling, not component logic.')
  ],
  interviewAnswer:'React\'s rendering cycle has three phases: Render (pure, creates VDOM, can be interrupted in concurrent mode), Reconciliation (O(n) key-based diffing algorithm), and Commit (synchronous DOM mutations + layout effects + passive effects). The render phase must be pure with no side effects (this is critical for concurrent mode where renders can be aborted). React batches state updates automatically in React 18 for all contexts. Keys are essential for efficient list reconciliation - use stable IDs, avoid array indices. Concurrent mode adds prioritization: urgent updates (user input) interrupt non-urgent renders.',
  interviewQuestions:[
    q('What are the three phases of React rendering?','(1) Render phase - creates VDOM (pure, interruptible). (2) Reconciliation - diffs old and new VDOM using keys. (3) Commit phase - applies DOM mutations (synchronous, not interruptible) and runs effects.'),
    q('Why must the render phase be pure?','Because React may call component functions multiple times (StrictMode), interrupt renders in concurrent mode, or discard aborted renders. Side effects during render would cause bugs like double API calls or inconsistent state.'),
    q('How does React achieve O(n) reconciliation?','By making two assumptions: (1) Different element types produce different trees (full teardown). (2) Keys identify stable children across renders. This avoids a full tree diff (which would be O(n^3)).'),
    q('What is the role of keys in reconciliation?','Keys help React identify which list items changed position, were added, or removed. Stable keys (item IDs) allow React to preserve component state and avoid unnecessary unmounts/remounts when the list order changes.'),
    q('What happens in the commit phase?','React applies DOM mutations synchronously (insert, update, remove). Then runs useLayoutEffect (before paint) and schedules useEffect (after paint). The commit phase is not interruptible.'),
    q('What is batching in React?','Batching groups multiple state updates into a single re-render for performance. React 18 added automatic batching - all updates (event handlers, timeouts, Promises, native events) are batched. Previously only event handler updates were batched.'),
    q('How does concurrent mode make rendering interruptible?','React splits rendering into small units of work and yields to the browser between units. The scheduler prioritizes updates (user input > data fetching). A higher-priority update interrupts a lower-priority render, which is discarded.'),
    q('What is the difference between useLayoutEffect and useEffect in the cycle?','useLayoutEffect runs synchronously in the commit phase BEFORE the browser paints. useEffect runs asynchronously AFTER paint. useLayoutEffect blocks paint; useEffect does not.'),
    q('What is the fiber architecture?','Fiber is Reacts internal data structure representing a unit of work. Each component instance has a fiber node. The fiber tree enables incremental rendering: React can pause, resume, and prioritize work at the fiber (component) level.'),
    q('How does React bail out of rendering a subtree?','If React.memo, shouldComponentUpdate, or useMemo indicates no change, React skips the subtree during reconciliation. The child component function is not called, and the existing VDOM is reused. This is the primary performance optimization mechanism.')
  ],
  diagramSvg:svgW(720,350,'React Rendering Cycle',
    R(30,55,200,40,'#1a1d28','#6c9fff','1. Trigger','State/prop/context change')+
    A(130,95,130,115)+
    R(30,115,200,40,'#1a1d28','#f59e0b','2. Render Phase','Create VDOM (pure, interruptible)')+
    A(130,155,130,175)+
    R(30,175,200,40,'#1a1d28','#f87171','3. Reconciliation','Diff VDOM, find changes')+
    A(130,215,130,235)+
    R(30,235,200,40,'#1a1d28','#34d399','4. Commit Phase','Apply DOM mutations (sync)')+
    A(130,275,130,295)+
    R(30,295,200,40,'#1a1d28','#f59e0b','5. Effects','useLayoutEffect -> useEffect'),
    T(250,78,'setState, dispatch, props, context',10,'#9aa0b0','start')+
    T(250,138,'Component functions called',10,'#9aa0b0','start')+
    T(250,198,'key-based O(n) algorithm',10,'#9aa0b0','start')+
    T(250,258,'DOM insert/update/remove',10,'#9aa0b0','start')+
    T(250,318,'Layout effects before paint, passive after',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Understanding Reconciliation with Keys','Demonstrates how keys affect list re-rendering behavior',
      codeBlock([
        'function TodoList() {',
        '  const [todos, setTodos] = useState([',
        '    { id: 1, text: "Learn React", done: false },',
        '    { id: 2, text: "Build project", done: false },',
        '  ]);',
        '',
        '  const addFirst = () => {',
        '    setTodos([{ id: Date.now(), text: "New first", done: false }, ...todos]);',
        '  };',
        '',
        '  return (',
        '    <ul>',
        '      {todos.map(todo => (',
        '        // GOOD: key={todo.id} - stable identity',
        '        // BAD: key={index} - items shift, React remounts everything',
        '        <li key={todo.id}>',
        '          <Checkbox checked={todo.done} />',
        '          <span>{todo.text}</span>',
        '        </li>',
        '      ))}',
        '    </ul>',
        '  );',
        '}'
      ]),
      'With key={id}, adding an item at the beginning only inserts one new <li> - existing items keep their state. With key={index}, every item gets a new key, causing React to remount all <li> elements and lose input selections/scroll positions.'
    ),
    e('Profiling Re-renders with React DevTools','Identify unnecessary renders and optimize',
      codeBlock([
        '// 1. Wrap expensive subtree in React.memo',
        'const ExpensiveList = React.memo(function ExpensiveList({ items }) {',
        '  console.log("ExpensiveList render");',
        '  return items.map(item => <SlowItem key={item.id} data={item} />);',
        '});',
        '',
        '// 2. Use useMemo for computed data',
        'function Dashboard({ rawData }) {',
        '  const processed = useMemo(() => {',
        '    return rawData.filter(d => d.active).map(transform);',
        '  }, [rawData]);',
        '',
        '  // 3. Use useCallback for stable callbacks',
        '  const handleClick = useCallback((id) => {',
        '    setSelected(id);',
        '  }, []);',
        '',
        '  return (',
        '    <div>',
        '      <ExpensiveList items={processed} onItemClick={handleClick} />',
        '    </div>',
        '  );',
        '}',
        '',
        '// 4. Use React DevTools Profiler to:',
        '// - Record interactions and see which components re-rendered',
        '// - Check render timing (ms per component)',
        '// - Identify "why did this render?" tooltip'
      ]),
      'The React DevTools Profiler records renders and shows: which components re-rendered, why (props/state/context), and how long they took. This data-driven approach identifies actual optimization opportunities instead of guessing.'
    )
  ],
  mcqQuestions:[
    m('What is the correct order of React rendering phases?',['Commit -> Reconciliation -> Render','Render -> Reconciliation -> Commit','Render -> Commit -> Reconciliation','Reconciliation -> Render -> Commit'],1,'Render phase creates VDOM, Reconciliation diffs it, Commit phase applies DOM mutations.'),
    m('Which phase can be interrupted in concurrent mode?',['Commit phase','Render phase','Both phases','Neither phase'],1,'The render phase is interruptible in concurrent mode. The commit phase is always synchronous and not interruptible.'),
    m('What happens if a component returns the same element type but different props?',['React destroys and recreates the DOM node','React updates the existing DOM node with the new props','React ignores the change','React throws an error'],1,'Same element type + key = same DOM node. React updates only the changed attributes/properties on the existing node.'),
    m('What is the time complexity of Reacts reconciliation algorithm?',['O(n^2)','O(n)','O(log n)','O(n^3)'],1,'React\'s heuristic algorithm achieves O(n) by assuming element type stability and using keys, avoiding O(n^3) full tree diff.'),
    m('Which mechanism allows React to skip rendering a subtree entirely?',['Key prop','React.memo or shouldComponentUpdate','Ref forwarding','Error boundaries'],1,'React.memo (function) and shouldComponentUpdate (class) let React bail out of rendering the entire subtree if props have not changed.'),
    m('In React 18, which updates are batched?',['Only event handler updates','All updates (event handlers, timeouts, Promises, native events)','Only concurrent mode updates','Only useTransition updates'],1,'React 18 introduced automatic batching for all updates. Multiple setState calls anywhere in the same microtask produce a single render.')
  ]
};

// ========== 14. Hydration ==========
topics['react-hydration'] = {
  id:'react-hydration', title:'React Hydration', difficulty:'advanced', estimatedMinutes:25,
  tldr:[
    'Hydration is the process where React attaches event listeners and state to server-rendered HTML, making it interactive.',
    'ReactDOM.hydrateRoot() in React 18 replaces ReactDOM.hydrate() for attaching to pre-rendered HTML.',
    'Hydration mismatches occur when server HTML differs from the first client render - React attempts to reconcile but logs warnings.',
    'Streaming SSR in React 18 enables selective hydration - components hydrate as their content streams in.'
  ],
  laymanDefinition:'Hydration is like taking a photograph of a finished house (server-side rendered HTML) and then moving real furniture and people into it (making it interactive with JavaScript). The server sends HTML that looks complete (the photo), but the buttons do not work and nothing responds to clicks. Hydration is the process of attaching all the JavaScript event handlers, state, and logic to that static HTML so it becomes a living, interactive app. React walks through the server-rendered DOM tree, matches it to components, and attaches event listeners without recreating the DOM from scratch. This gives the user a fast initial paint (they see content immediately) while the JavaScript loads and hydrates.',
  deepDive:[
    d('How Hydration Works','When the server sends HTML (from renderToString or renderToPipeableStream), ReactDOM.hydrateRoot() takes over. It traverses the existing DOM tree and matches DOM nodes to React components. For each node, React attaches event listeners and initializes state without recreating the DOM element. This is fundamentally different from client-only rendering where React creates all DOM elements from scratch. Hydration is a one-time operation - after hydration completes, React switches to regular client-side rendering for subsequent updates. The key constraint: the server-rendered HTML must exactly match the first client render output. If there is a mismatch (different text, different attributes), React must reconcile the difference, which involves replacing parts of the DOM tree and can cause layout shifts or flickers.'),
    d('Hydration Mismatches: Causes and Solutions','Common causes of hydration mismatches: (1) Browser-only APIs - using window, document, localStorage during server render. (2) Dynamic timestamps or random values - Date.now(), Math.random(), or uuid generation produce different values on server vs client. (3) Different data - API responses may differ between server and client. (4) CSS-in-JS - server-rendered class names differ from client-rendered ones. (5) Browser extensions modifying the DOM. Solutions: (1) Use useEffect for browser-only code - the initial render matches the server. (2) Suppress hydration warnings with suppressHydrationWarning for intentional differences (timestamps). (3) Use next/dynamic or lazy loading with ssr:false for components that must differ. (4) Use consistent CSS-in-JS configuration (ExtractCritical for Emotion, styled-components ServerStyleSheet). (5) Ensure API data is consistent (serialize data in the HTML and hydrate from it).'),
    d('Streaming SSR and Selective Hydration (React 18)','React 18 introduces streaming SSR via renderToPipeableStream. The server sends HTML in chunks as components render. Suspense boundaries define streaming points - each boundary streams independently. Selective hydration: React can hydrate components as their HTML arrives, without waiting for the full page. This means: (1) The page shell hydrates first, making the header and navigation interactive. (2) Below-the-fold content hydrates later when its chunk arrives. (3) The user can interact with already-hydrated parts while other parts are still loading. (4) Priority is given to hydrating visible content first (hydration is prioritized like rendering). (5) This dramatically improves Time to Interactive (TTI) for complex pages. The same Suspense boundaries used for code splitting double as streaming boundaries.'),
    d('ReactDOM.hydrateRoot() API (React 18)','React 18 replaces ReactDOM.hydrate() with ReactDOM.hydrateRoot(): ReactDOM.hydrateRoot(document.getElementById("root"), <App />). Differences: (1) hydrateRoot does not take a callback - use useEffect instead. (2) hydrateRoot returns a Root object with render() and unmount() methods. (3) hydrateRoot supports concurrent features like transitions and Suspense. (4) The root can be updated with root.render(<NewApp />) for updates. (5) There is no hydrate() in React 18 - it was removed. Migration: replace ReactDOM.hydrate(element, container, callback) with ReactDOM.hydrateRoot(container, element). The callback pattern changes to useEffect in the root component.'),
    d('Hydration Performance Optimization','(1) Minimize hydration work - hydrate only once and avoid unnecessary tree walks. Each extra DOM node increases hydration time. (2) Lazy hydrate non-critical components - use libraries like react-lazily or custom IntersectionObserver-based hydration for below-the-fold content. (3) Partial hydration (islands architecture) - only hydrate interactive components on a mostly static page. Frameworks like Astro, Fresh, and Qwik use this approach. (4) Progressive hydration - hydrate sections in order of user interaction priority (navbar first, main content second, footer last). (5) Avoid hydration regressions - use lint rules to catch common mismatch patterns. (6) Measure hydration time with Performance Observer API or React Profiler. (7) For large lists, virtualize both server and client rendering to reduce hydration DOM size.')
  ],
  interviewAnswer:'Hydration attaches React event handlers and state to server-rendered HTML, making it interactive without recreating the DOM. ReactDOM.hydrateRoot() in React 18 traverses the existing DOM tree, matches nodes to components, and attaches listeners. Hydration mismatches occur when server HTML differs from client render - caused by browser APIs, timestamps, or inconsistent data. React 18\'s streaming SSR with selective hydration hydrates components as their HTML streams, improving TTI. Minimize hydration overhead with lazy hydration for non-critical components.',
  interviewQuestions:[
    q('What is hydration?','Hydration is the process where React takes over server-rendered HTML and attaches event listeners, state, and interactivity without recreating the DOM. It makes a static HTML page into a fully interactive React app.'),
    q('What is the difference between ReactDOM.hydrate() and ReactDOM.hydrateRoot()?','hydrateRoot is the React 18 replacement. hydrateRoot does not accept a callback, supports concurrent features, and returns a Root object. hydrate() is removed in React 18. Migration: replace hydrate() with hydrateRoot().'),
    q('What causes a hydration mismatch?','Differences between server-rendered HTML and first client render output. Common causes: browser APIs (window, document), dynamic values (Date.now(), Math.random()), different API data, CSS-in-JS class name differences, browser extensions modifying the DOM.'),
    q('How do you fix hydration mismatches intentionally?','Use suppressHydrationWarning attribute on the element. This tells React to skip the mismatch check for that specific element. Use sparingly - only for truly unavoidable differences like timestamps.'),
    q('What is selective hydration?','React 18 feature where components hydrate as their content streams from the server, rather than waiting for the full page. Suspense boundaries define hydration points. Already-hydrated components are interactive while others still load.'),
    q('How does streaming SSR work with hydration?','The server sends HTML in chunks via renderToPipeableStream. Each Suspense boundary streams independently. As each chunk arrives, React can hydrate that portion of the page selectively without waiting for the full stream.'),
    q('What is the islands architecture?','An approach where only interactive "islands" of components are hydrated on a mostly static page. Non-interactive content remains as static HTML without JavaScript. Frameworks: Astro, Fresh, Qwik. This minimizes hydration work.'),
    q('How do you lazy hydrate components?','Use IntersectionObserver-based hydration: hydrate a component only when it scrolls into the viewport. Libraries like react-lazily or custom hooks detect visibility and trigger hydration. Reduces initial hydration work for below-the-fold content.'),
    q('What is the relationship between Suspense and hydration?','Suspense boundaries act as hydration boundaries in React 18 streaming SSR. Each Suspense boundary streams independently and hydrates independently. Nested Suspense enables progressive hydration with granular loading states.'),
    q('How do you measure hydration performance?','Use Performance Observer (performance.mark/measure), React DevTools Profiler (records hydration commit), or custom timing with useEffect. Key metrics: time to interactive (TTI), first input delay (FID), and hydration DOM size.')
  ],
  diagramSvg:svgW(720,280,'Hydration Process',
    R(30,55,200,45,'#1a1d28','#6c9fff','Server Sends HTML','Static HTML with content')+
    A(130,100,130,120)+
    R(30,120,200,40,'#1a1d28','#f59e0b','Browser Renders HTML','User sees content immediately')+
    A(130,160,130,180)+
    R(30,180,200,45,'#1a1d28','#34d399','hydrateRoot()','React attaches to existing DOM'),
    T(250,78,'Content visible before JS loads',10,'#9aa0b0','start')+
    T(250,135,'No flash of blank content',10,'#34d399','start')+
    T(250,202,'Event listeners + state attached',10,'#34d399','start')+
    T(250,225,'DOM nodes NOT recreated',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('React 18 Hydration with Streaming SSR','Complete setup for a streaming SSR app',
      codeBlock([
        '// Server (Node.js with Express):',
        'import { renderToPipeableStream } from "react-dom/server";',
        'import App from "./App";',
        '',
        'app.get("/", (req, res) => {',
        '  res.setHeader("Content-Type", "text/html");',
        '  res.write(\'<div id="root">\');',
        '  const { pipe } = renderToPipeableStream(<App />, {',
        '    onShellReady() {',
        '      pipe(res);',
        '    },',
        '    onError(err) {',
        '      console.error(err);',
        '    }',
        '  });',
        '  res.write(\'</div><script src="/bundle.js"></script>\');',
        '});',
        '',
        '// Client:',
        'import { hydrateRoot } from "react-dom/client";',
        'import App from "./App";',
        '',
        'hydrateRoot(document.getElementById("root"), <App />);',
        '',
        '// App with Suspense boundaries for streaming:',
        'function App() {',
        '  return (',
        '    <html lang="en">',
        '      <head><title>My App</title></head>',
        '      <body>',
        '        <Navbar />',
        '        <Suspense fallback={<MainSkeleton />}>',
        '          <MainContent />',
        '        </Suspense>',
        '        <Suspense fallback={<SidebarSkeleton />}>',
        '          <Sidebar />',
        '        </Suspense>',
        '      </body>',
        '    </html>',
        '  );',
        '}'
      ]),
      'The server streams HTML. The client calls hydrateRoot once. Suspense boundaries in App become streaming points - each boundary\'s HTML streams independently. React hydrates each section when its chunk arrives.'
    ),
    e('Common Hydration Mismatch Pattern and Fix','Avoiding hydration issues with browser-only content',
      codeBlock([
        '// BAD: Causes hydration mismatch',
        'function TimeDisplay() {',
        '  return <p>Current time: {new Date().toLocaleTimeString()}</p>;',
        '}',
        '',
        '// GOOD: Match server render, update on client',
        'function TimeDisplay() {',
        '  const [time, setTime] = useState(null);',
        '',
        '  useEffect(() => {',
        '    setTime(new Date().toLocaleTimeString());',
        '    const interval = setInterval(() => {',
        '      setTime(new Date().toLocaleTimeString());',
        '    }, 1000);',
        '    return () => clearInterval(interval);',
        '  }, []);',
        '',
        '  // Server and first client render: show placeholder',
        '  // After hydration, useEffect updates to real time',
        '  return <p>Current time: {time ?? "loading..."}</p>;',
        '}',
        '',
        '// BAD: Browser API during render',
        'function WindowSize() {',
        '  const width = window.innerWidth; // crashes on server!',
        '  return <p>Width: {width}</p>;',
        '}',
        '',
        '// GOOD: Use useEffect for browser code',
        'function WindowSize() {',
        '  const [width, setWidth] = useState(1024); // sensible default',
        '',
        '  useEffect(() => {',
        '    setWidth(window.innerWidth);',
        '    const handle = () => setWidth(window.innerWidth);',
        '    window.addEventListener("resize", handle);',
        '    return () => window.removeEventListener("resize", handle);',
        '  }, []);',
        '',
        '  return <p>Width: {width}px</p>;',
        '}'
      ]),
      'The time and window width examples show the pattern: render the same thing on server and client first render, then use useEffect to update with the real value on the client. This avoids hydration mismatch while still providing correct interactive values.'
    )
  ],
  mcqQuestions:[
    m('What does hydration do?',['Renders React on the server','Attaches event listeners and state to server-rendered HTML without recreating the DOM','Creates new DOM elements from scratch','Removes server-rendered content'],1,'Hydration walks the existing DOM tree, matches nodes to components, and attaches interactivity without recreating the DOM.'),
    m('What is the React 18 API for hydration?',['ReactDOM.hydrate()','ReactDOM.hydrateRoot()','ReactDOM.createRoot()','ReactDOM.render()'],1,'ReactDOM.hydrateRoot(container, element) is the React 18 API. hydrate() is removed in React 18.'),
    m('What causes a hydration mismatch?',['The server has different React version','Server HTML differs from the first client render output','The client has no internet','The bundle is too large'],1,'Any difference between server-rendered HTML and the first client render output causes a mismatch warning. React may need to replace parts of the DOM tree to fix the mismatch.'),
    m('What is selective hydration?',['Choosing which components to hydrate','Hydrating components as their content streams from the server, one Suspense boundary at a time','Hydrating only on mobile devices','Hydrating in the background'],1,'Selective hydration allows components to hydrate independently as their streaming HTML arrives, without waiting for the full page.'),
    m('How do you fix an intentional hydration mismatch?',['Ignore the warning','Use suppressHydrationWarning on the element','Wrap the component in an error boundary','Use React.memo'],1,'suppressHydrationWarning tells React to skip the mismatch check for that specific element. Use only for unavoidable differences.'),
    m('What is the islands architecture pattern?',['Only interactive components are hydrated; static content remains as HTML without JavaScript','Every element is hydrated','No JavaScript is used at all','All components are server-only'],1,'In islands architecture, non-interactive content is pure HTML without JS. Only interactive "islands" (buttons, forms, widgets) are hydrated, minimizing JS payload.')
  ]
};

// ========== 15. Performance Optimization ==========
topics['react-performance-optimization'] = {
  id:'react-performance-optimization', title:'React Performance Optimization', difficulty:'advanced', estimatedMinutes:30,
  tldr:[
    'React performance optimization focuses on minimizing unnecessary re-renders and reducing reconciliation work.',
    'Key tools: React.memo, useMemo, useCallback, virtualization, and React DevTools Profiler.',
    'Always profile FIRST, optimize SECOND - premature optimization adds complexity without measurable benefit.',
    'React 18 automatic batching, transitions, and concurrent mode reduce the need for manual optimization.'
  ],
  laymanDefinition:'React performance optimization is like tuning a race car - you do not upgrade every part; you measure which parts are slowing you down and fix those specific ones. The most common bottleneck in React is unnecessary re-renders: a component re-rendering its entire tree when only a small part changed. React gives you tools to tell it "skip this part, nothing changed" (React.memo, useMemo, useCallback). The golden rule is to measure with React DevTools Profiler before optimizing, because React is already very fast for most cases. React 18s concurrent mode and automatic batching make many manual optimizations unnecessary.',
  deepDive:[
    d('React.memo: Component-Level Optimization','React.memo prevents re-rendering when props are unchanged (shallow comparison). It is most effective for: (1) Leaf components in the render tree that render expensive content (charts, lists, maps). (2) Components that receive stable props (primitives, memoized objects/arrays). (3) Components in lists (each list item wrapped in React.memo prevents re-rendering of untouched items). Implementation: React.memo compares previous and next props using Object.is. If all props are equal, the component function is skipped entirely. Important caveats: (a) Inline props (objects, functions) defeat the optimization - use useMemo/useCallback. (b) React.memo does not prevent re-renders from context changes or internal state. (c) The comparison function can be customized with React.memo(Component, areEqual).'),
    d('useMemo and useCallback: Value-Level Optimization','useMemo memoizes computed values; useCallback memoizes function references. These enable React.memo to work by stabilizing prop references. Critical pattern: (1) Expensive computations - filter/sort/map large arrays, complex math, data transformations. (2) Referential equality - objects/arrays passed to memoized children must be stable references. (3) Effect dependencies - stable callbacks prevent unnecessary effect re-runs. The cost-benefit analysis: each hook adds memory overhead and dependency comparison on every render. Only apply when: (a) the computation is O(n^2) or worse with n > 100, or (b) the child component is memoized and receives the value as a prop. Default to measuring first.'),
    d('Virtualization for Large Lists','Rendering thousands of DOM nodes is expensive even with React.memo. Virtualization renders only the visible items (plus a small buffer) and replaces off-screen items with empty spacer elements. Libraries: react-window (lightweight), react-virtuoso (feature-rich), TanStack Virtual (framework-agnostic). Key metrics: (1) DOM nodes reduced from N (all items) to ~20-30 (visible items). (2) Scroll performance stays at 60fps regardless of list size. (3) Initial render time drops from seconds to milliseconds for 10,000+ item lists. Implementation: measure the container element, calculate which items are visible based on scroll position, render only those items, and maintain correct scroll height with a spacer element.'),
    d('Code Splitting and Lazy Loading','Code splitting reduces the initial bundle size by deferring non-critical code. Strategy: (1) Route-based splitting - each page is a separate chunk loaded on navigation. (2) Component-based splitting - heavy components (charts, editors, modals) loaded on interaction. (3) Library splitting - large libraries (moment.js, lodash, chart.js) extracted to vendor chunks or lazy-loaded. Implementation: React.lazy(() => import("./HeavyComponent")) + Suspense. webpack magic comments control chunk naming: import(/* webpackChunkName: "admin" */ "./AdminPage"). Measure with webpack-bundle-analyzer to identify large modules and split points.'),
    d('React 18 Performance Features','React 18 reduces the need for manual optimization: (1) Automatic batching - all state updates (event handlers, timeouts, Promises) are batched into a single render. Previously only event handlers were batched. (2) useTransition - mark non-urgent updates as transitions: startTransition(() => setSearchQuery(query)). The UI stays responsive during large renders. (3) useDeferredValue - defer re-rendering a part of the tree: const deferredValue = useDeferredValue(value). The deferred part renders after the urgent part. (4) Concurrent mode - rendering is interruptible, so high-priority updates (user input) are not blocked by large renders. (5) Automatic render optimization - React 18s reconciler is more efficient, reducing overhead for all components.')
  ],
  interviewAnswer:'React performance optimization starts with profiling using React DevTools Profiler. Key techniques: React.memo for component-level render skipping, useMemo/useCallback for stable prop references, virtualization (react-window) for large lists, and code splitting (React.lazy + Suspense) for smaller bundles. React 18 reduces manual optimization needs with automatic batching, useTransition, useDeferredValue, and concurrent mode. The golden rule: profile first, optimize second. Premature optimization adds code complexity and can actually harm performance with unnecessary comparison overhead.',
  interviewQuestions:[
    q('What is the first step in React performance optimization?','Profile with React DevTools Profiler. Identify which components re-render unnecessarily and how long each render takes. Optimize only the top bottlenecks based on data, not intuition.'),
    q('How does React.memo prevent re-renders?','It performs a shallow comparison (Object.is) of current and next props. If all props are equal, it skips the component function and reuses the previously rendered VDOM subtree.'),
    q('When does React.memo fail to prevent re-renders?','When props include inline objects, arrays, or functions that create new references on every render (defeating shallow comparison). Use useMemo/useCallback to stabilize references.'),
    q('What is virtualization and when is it needed?','Virtualization renders only visible items in a large list (~20-30 DOM nodes regardless of total list size). Use when rendering 100+ items causes performance issues (layout thrashing, long initial render, low scroll FPS).'),
    q('What does useTransition do?','useTransition marks a state update as non-urgent. React can delay the update to keep the UI responsive: const [isPending, startTransition] = useTransition(); startTransition(() => setResults(query)).'),
    q('What is the cost of using useMemo unnecessarily?','(1) Memory allocation for the cached value. (2) Object.is comparison of each dependency on every render. (3) Extra function call overhead. For trivial computations, the cost exceeds the benefit.'),
    q('How does React 18 automatic batching improve performance?','Multiple setState calls in any context (event handlers, timeouts, promises, native events) produce a single render instead of multiple renders. This eliminates the need for unstable_batchedUpdates().'),
    q('What tools analyze bundle size for code splitting?','webpack-bundle-analyzer (interactive treemap), source-map-explorer (per-file sizes), Chrome DevTools Coverage tab (unused code), and BundlePhobia (npm package size).'),
    q('What is the difference between useDeferredValue and debouncing?','useDeferredValue tells React to render the deferred value with lower priority, not after a fixed delay. It is priority-based rather than time-based. React processes urgent updates first and deferred updates when idle.'),
    q('How do you identify unnecessary re-renders in production?','Use React DevTools Profiler in development, or add custom performance marks with performance.mark() and performance.measure(). In production, use browser DevTools Performance tab or tools like LogRocket that record re-renders.')
  ],
  diagramSvg:svgW(720,280,'Performance Optimization Decision Tree',
    R(30,55,200,40,'#1a1d28','#6c9fff','App feels slow?','Profile with React DevTools')+
    A(130,95,130,115)+
    R(30,115,200,40,'#1a1d28','#f59e0b','Identify bottleneck','Too many renders / Large list / Big bundle')+
    A(130,155,130,175)+
    R(30,175,65,50,'#1a1d28','#34d399','Renders','React.memo + useMemo'),
    R(105,175,65,50,'#1a1d28','#f87171','List','Virtualization'),
    R(180,175,60,50,'#1a1d28','#f59e0b','Bundle','Code splitting'),
    T(20,240,'Always measure before and after optimization',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Comprehensive Performance Optimization Pattern','Combining multiple strategies for a search page',
      codeBlock([
        'const SearchResult = React.memo(function SearchResult({ item }) {',
        '  console.log("Render:", item.id);',
        '  return (',
        '    <div className="result-item">',
        '      <h4>{item.title}</h4>',
        '      <p>{item.description}</p>',
        '    </div>',
        '  );',
        '});',
        '',
        'function SearchPage() {',
        '  const [query, setQuery] = useState("");',
        '  const [results, setResults] = useState([]);',
        '',
        '  // Debounced search to avoid fetching on every keystroke',
        '  const deferredQuery = useDeferredValue(query);',
        '',
        '  useEffect(() => {',
        '    if (!deferredQuery) { setResults([]); return; }',
        '    fetch("/api/search?q=" + deferredQuery)',
        '      .then(r => r.json())',
        '      .then(setResults);',
        '  }, [deferredQuery]);',
        '',
        '  // Memoize filtered results to avoid re-sorting on keystroke',
        '  const sortedResults = useMemo(() => {',
        '    return [...results].sort((a, b) => b.relevance - a.relevance);',
        '  }, [results]);',
        '',
        '  return (',
        '    <div>',
        '      <input value={query} onChange={e => setQuery(e.target.value)} />',
        '      {isPending && <Spinner />}',
        '      <VirtualList height={600} itemCount={sortedResults.length}>',
        '        {({ index, style }) => (',
        '          <div style={style}>',
        '            <SearchResult item={sortedResults[index]} />',
        '          </div>',
        '        )}',
        '      </VirtualList>',
        '    </div>',
        '  );',
        '}'
      ]),
      'This combines: (1) useDeferredValue for non-urgent search query. (2) useEffect debounce pattern. (3) useMemo for sort computation. (4) React.memo on each result item. (5) Virtualization for large result lists. Each optimization is targeted at a specific bottleneck.'
    ),
    e('Measuring Performance with React Profiler','Programmatic profiling with Profiler component',
      codeBlock([
        'import { Profiler } from "react";',
        '',
        'function onRenderCallback(',
        '  id, // the "id" prop of the Profiler tree',
        '  phase, // "mount" or "update"',
        '  actualDuration, // time spent rendering the committed update',
        '  baseDuration, // estimated time to render the entire subtree without memoization',
        '  startTime, // when React began rendering this update',
        '  commitTime, // when React committed this update',
        '  interactions // the Set of interactions belonging to this update',
        ') {',
        '  console.log(`${id} (${phase}): ${actualDuration.toFixed(2)}ms`);',
        '  if (actualDuration > 16) {',
        '    console.warn(`WARNING: ${id} took > 16ms (missed 60fps)`);',
        '  }',
        '}',
        '',
        'function App() {',
        '  return (',
        '    <Profiler id="SearchSection" onRender={onRenderCallback}>',
        '      <SearchPage />',
        '    </Profiler>',
        '  );',
        '}'
      ]),
      'The Profiler component measures render times programmatically. Log durations >16ms (60fps threshold). This data-driven approach identifies exactly which parts of the tree need optimization, replacing guesswork with measurement.'
    )
  ],
  mcqQuestions:[
    m('What is the first step in React performance optimization?',['Wrap everything in React.memo','Profile with React DevTools Profiler','Add useMemo everywhere','Use virtual DOM directly'],1,'Always profile first to identify actual bottlenecks. Premature optimization adds complexity without measured benefit.'),
    m('What does React.memo use for prop comparison?',['Deep equality (JSON.stringify)','Shallow comparison (Object.is)','Reference equality on props object','Custom comparison function'],1,'React.memo compares each prop individually using Object.is (shallow comparison). No deep equality by default.'),
    m('What is the main benefit of virtualization?',['Smaller bundle size','Only visible items render as DOM nodes, reducing total DOM size from N to ~20-30','Faster network requests','Better code organization'],1,'Virtualization reduces DOM node count from all items to only visible items, dramatically improving render time and scroll performance.'),
    m('What problem does useTransition solve?',['Makes effects run faster','Allows non-urgent state updates to be deferred, keeping UI responsive during large renders','Reduces bundle size','Prevents hydration mismatches'],1,'useTransition marks updates as non-urgent. React can delay them to keep the UI responsive to user input.'),
    m('What does automatic batching in React 18 do?',['Combines multiple state updates into a single render','Automatically adds React.memo to components','Splits code into smaller bundles','Prefetches lazy components'],0,'Automatic batching groups all state updates (event handlers, timeouts, promises) into one render cycle, eliminating intermediate renders.'),
    m('Which tool would you use to analyze bundle size?',['ESLint','webpack-bundle-analyzer','Prettier','Babel'],1,'webpack-bundle-analyzer visualizes the composition of each bundle chunk, identifying large libraries and effective split points.')
  ]
};

// ========== 16. Form Handling ==========
topics['react-form-handling'] = {
  id:'react-form-handling', title:'React Form Handling', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'React form handling uses controlled components where form state lives in React state, not the DOM.',
    'Uncontrolled components use refs to access form values directly from the DOM when needed.',
    'React Hook Form, Formik, and Final Form are popular libraries that simplify form validation and submission.',
    'Form validation can be synchronous (onChange, onBlur) or asynchronous (API-based validation).'
  ],
  laymanDefinition:'Form handling in React is about managing what users type into forms. There are two approaches: controlled (React watches every keystroke and stores the value in state) and uncontrolled (React only reads the values when the user submits). Controlled forms give you more power (instant validation, dynamic form fields, conditional sections) at the cost of more code. Uncontrolled forms are simpler but less flexible. For complex forms, libraries like React Hook Form or Formik handle all the boilerplate: validation, error messages, submission, and performance optimization so you do not have to write it yourself.',
  deepDive:[
    d('Controlled vs Uncontrolled Components','Controlled components: React state is the single source of truth. The input value is set from state, and onChange updates state. Every keystroke triggers a render. Benefits: (1) Instant validation. (2) Conditional rendering based on input values. (3) Programmatic value changes. (4) Integration with other state. Drawbacks: (1) More boilerplate. (2) Every keystroke triggers re-render (can be optimized with debouncing). (3) Larger state for complex forms. Uncontrolled components: The DOM maintains its own state. Use refs to read values on submit. Benefits: (1) Less code. (2) No re-renders on keystroke. (3) Better performance for large forms. Drawbacks: (1) No instant validation. (2) Harder to dynamically change values. (3) Cannot conditionally render based on input values. Recommendation: controlled for most cases, uncontrolled for simple forms or performance-critical large forms.'),
    d('Form Validation Strategies','(1) On submit validation - validate all fields when the user clicks submit. Simplest approach, used for simple forms. (2) On change validation - validate as the user types. Provides instant feedback but can be noisy (email format errors shown after first character). (3) On blur validation - validate when the field loses focus. Best UX balance - shows errors after the user finishes typing a field. (4) Debounced validation - wait for a pause in typing before validating. Best for API-based validation (checking if username is available). (5) Combination strategy: onBlur for field-level validation, onSubmit for form-level validation, debounced for async checks. Implementation: schema-based validation with Yup or Zod, or custom validation functions returning error strings.'),
    d('React Hook Form (RHF): The Modern Standard','React Hook Form is the most popular React form library. Key features: (1) Uncontrolled by default - uses refs internally for better performance. (2) register() function connects inputs to the form state. (3) Built-in validation with HTML5 constraints and custom rules: register("email", { required: "Email is required", pattern: { value: /^.../, message: "Invalid email" } }). (4) Integration with validation schemas: Yup, Zod, Joi. (5) handleSubmit() wraps submission with validation. (6) errors object for displaying error messages. (7) watch() for watching field values. (8) setValue() for programmatic updates. (9) useFieldArray for dynamic field lists. (10) Controller component for custom inputs. RHF minimizes re-renders: the form container renders once, individual fields re-render only on their own changes.'),
    d('Formik: The Established Alternative','Formik is an older but still widely used form library. Key concepts: (1) Controlled approach - state is explicitly managed. (2) useFormik() hook or <Formik> component. (3) initialValues, validationSchema (Yup), onSubmit. (4) handleChange, handleBlur, handleSubmit are passed to inputs. (5) touched and errors objects for validation state. (6) isSubmitting for submit button state. Formik renders more than RHF because it uses controlled inputs. For most new projects, React Hook Form is recommended over Formik due to better performance and smaller bundle size. Formik is maintained but not actively evolving. RHF has better TypeScript support, better performance, and a larger ecosystem.'),
    d('Custom Form Hooks and Accessibility','Building a custom form hook: (1) Manage form state with useReducer for complex validation. (2) Track touched fields, errors, and values. (3) Provide register() that returns { value, onChange, onBlur }. (4) Handle submission with async validation. (5) Provide reset() and setValue() methods. Accessibility essentials: (1) label elements with htmlFor matching input id. (2) aria-describedby linking to error message elements. (3) aria-invalid="true" on invalid inputs. (4) role="alert" on error summaries. (5) Proper tab order (tabIndex). (6) Focus management - focus the first error field on submit. (7) Error announcements for screen readers with aria-live="polite".')
  ],
  interviewAnswer:'React forms use controlled components (state-driven) or uncontrolled components (ref-driven). Controlled forms offer more power (instant validation, dynamic fields) at the cost of more renders per keystroke. React Hook Form is the current best practice - it uses uncontrolled inputs for performance with register(), supports schema validation (Yup/Zod), and minimizes re-renders. Formik is a controlled alternative still in wide use. Validation strategies: onBlur (best UX), debounced (for API checks), onSubmit (simple forms). Accessibility: aria-describedby for errors, aria-invalid for invalid fields, focus management on error.',
  interviewQuestions:[
    q('What is the difference between controlled and uncontrolled components?','Controlled: React state drives the input value (value + onChange). Uncontrolled: the DOM manages its own state, accessed via refs on submit. Controlled gives more control (instant validation, dynamic changes); uncontrolled has better performance for large forms.'),
    q('Why is React Hook Form faster than Formik?','React Hook Form uses uncontrolled inputs by default - inputs register via refs, not state. This means keystrokes do not trigger re-renders. Formik uses controlled inputs where every keystroke updates state and re-renders the entire form.'),
    q('What is the register() function in React Hook Form?','register() connects an input to the form state via a ref. It returns props (ref, onChange, onBlur, name) to spread onto the input. Validation rules are passed as the second argument: register("email", { required: true }).'),
    q('How do you integrate Yup with React Hook Form?','Use the @hookform/resolvers package: import { yupResolver } from "@hookform/resolvers/yup"; useForm({ resolver: yupResolver(schema) }). The schema defines validation rules, error messages, and types.'),
    q('What is the best validation strategy for a login form?','onBlur validation for email format + required check. onSubmit validation for credential verification against the server. This gives immediate feedback on format errors and server feedback on submit.'),
    q('How do you handle dynamic form fields (add/remove items)?','React Hook Form provides useFieldArray() for dynamic lists. It provides fields array, append(), remove(), insert(), swap(), move() methods. Each field needs a unique key (usually the auto-generated id from useFieldArray).'),
    q('What are the accessibility requirements for form errors?','(1) aria-describedby on input pointing to error element id. (2) aria-invalid="true" on invalid inputs. (3) role="alert" on error message. (4) aria-live="polite" for dynamic error announcements. (5) Focus first error field on submit.'),
    q('What is the Controller component in React Hook Form?','Controller wraps custom components (like React Select, date pickers) that do not expose a ref. It manages the value through render props: <Controller name="date" control={control} render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />} />.'),
    q('How do you handle form submission with loading state?','React Hook Form\'s handleSubmit receives an async function. The formState.isSubmitting flag shows a loading spinner. Disable the submit button during submission. Use setError() for server-side validation errors: setError("email", { message: "Email already exists" }).'),
    q('What is the difference between touched and dirty in form state?','touched tracks whether a field has been blurred (visited). dirty tracks whether a field value differs from its initial value. touched is used to decide when to show validation errors (show after field is visited). dirty is used to enable/disable the submit button (enable only when form is dirty).')
  ],
  diagramSvg:svgW(720,300,'Controlled vs Uncontrolled Flow',
    R(30,55,200,40,'#1a1d28','#6c9fff','Controlled','value from state, onChange updates state')+
    T(30,115,'User types -> onChange -> setState -> re-render -> new value',10,'#f59e0b','start')+
    T(30,135,'State is source of truth. Every keystroke = 1 render.',9,'#9aa0b0','start')+
    R(400,55,200,40,'#1a1d28','#34d399','Uncontrolled','DOM manages own value, ref reads on submit')+
    T(400,115,'User types -> DOM updates -> no React re-render',10,'#34d399','start')+
    T(400,135,'Read value when needed (submit) via ref.current',9,'#9aa0b0','start')+
    T(30,200,'React Hook Form = best of both:',11,'#f59e0b','start')+
    T(30,220,'Uncontrolled inputs (no re-renders on keystroke) +',10,'#9aa0b0','start')+
    T(30,240,'React-style validation and error management',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('React Hook Form with Yup Validation','Complete form with validation, error display, and submission',
      codeBlock([
        'import { useForm } from "react-hook-form";',
        'import { yupResolver } from "@hookform/resolvers/yup";',
        'import * as yup from "yup";',
        '',
        'const schema = yup.object({',
        '  name: yup.string().required("Name is required").min(2, "Too short"),',
        '  email: yup.string().required("Email is required").email("Invalid email"),',
        '  age: yup.number().required().min(18, "Must be 18+").max(120),',
        '  password: yup.string().required().min(8, "Min 8 characters"),',
        '  confirmPassword: yup.string()',
        '    .oneOf([yup.ref("password")], "Passwords must match")',
        '});',
        '',
        'function RegistrationForm() {',
        '  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({',
        '    resolver: yupResolver(schema)',
        '  });',
        '',
        '  const onSubmit = async (data) => {',
        '    await fetch("/api/register", { method: "POST", body: JSON.stringify(data) });',
        '    reset();',
        '  };',
        '',
        '  return (',
        '    <form onSubmit={handleSubmit(onSubmit)} noValidate>',
        '      <div>',
        '        <label htmlFor="name">Name</label>',
        '        <input id="name" {...register("name")} aria-invalid={errors.name ? "true" : undefined} />',
        '        {errors.name && <p role="alert" className="error">{errors.name.message}</p>}',
        '      </div>',
        '      <div>',
        '        <label htmlFor="email">Email</label>',
        '        <input id="email" type="email" {...register("email")} />',
        '        {errors.email && <p role="alert">{errors.email.message}</p>}',
        '      </div>',
        '      <div>',
        '        <label htmlFor="password">Password</label>',
        '        <input id="password" type="password" {...register("password")} />',
        '        {errors.password && <p role="alert">{errors.password.message}</p>}',
        '      </div>',
        '      <button type="submit" disabled={isSubmitting}>',
        '        {isSubmitting ? "Submitting..." : "Register"}',
        '      </button>',
        '    </form>',
        '  );',
        '}'
      ]),
      'The Yup schema defines all validation rules declaratively. React Hook Form integrates via yupResolver. Errors appear after onBlur (default RHF behavior). The submit button shows loading state. accessibility: htmlFor/labels, aria-invalid, role="alert" on errors.'
    ),
    e('Custom Controlled Input Component with Validation','Building a reusable text input with built-in validation',
      codeBlock([
        'function FormField({ label, name, register, errors, type = "text", validation }) {',
        '  return (',
        '    <div className="form-field">',
        '      <label htmlFor={name}>{label}</label>',
        '      <input',
        '        id={name}',
        '        type={type}',
        '        aria-invalid={errors[name] ? "true" : undefined}',
        '        aria-describedby={errors[name] ? name + "-error" : undefined}',
        '        {...register(name, validation)}',
        '      />',
        '      {errors[name] && (',
        '        <p id={name + "-error"} className="error" role="alert">',
        '          {errors[name].message}',
        '        </p>',
        '      )}',
        '    </div>',
        '  );',
        '}',
        '',
        'function ProfileForm() {',
        '  const { register, handleSubmit, formState: { errors }, watch } = useForm({',
        '    defaultValues: {',
        '      displayName: "",',
        '      bio: "",',
        '      website: "",',
        '      theme: "light"',
        '    }',
        '  });',
        '',
        '  const theme = watch("theme");',
        '',
        '  return (',
        '    <form onSubmit={handleSubmit(data => console.log(data))}>',
        '      <FormField label="Display Name" name="displayName"',
        '        register={register} errors={errors}',
        '        validation={{ required: "Display name is required" }}',
        '      />',
        '      <FormField label="Bio" name="bio"',
        '        register={register} errors={errors}',
        '        validation={{ maxLength: { value: 500, message: "Max 500 characters" } }}',
        '      />',
        '      <select {...register("theme")}>',
        '        <option value="light">Light</option>',
        '        <option value="dark">Dark</option>',
        '      </select>',
        '      {theme === "dark" && <p className="info">Tip: Use light mode for better readability</p>}',
        '      <input type="submit" />',
        '    </form>',
        '  );',
        '}'
      ]),
      'The reusable FormField component encapsulates label/input/error patterns. watch() enables conditional rendering based on form values. defaultValues provide initial state. Each field has proper aria attributes for accessibility.'
    )
  ],
  mcqQuestions:[
    m('What is a controlled component?',['A component where the DOM manages its own state','A component where React state drives the input value via value + onChange','A component that uses refs to read values','A component that cannot be validated'],1,'In controlled components, React state is the single source of truth. The input value comes from state, and state is updated via onChange.'),
    m('What is the main advantage of React Hook Form over Formik?',['Better TypeScript support','Better performance (uncontrolled by default, fewer re-renders)','Larger bundle size','More boilerplate'],1,'React Hook Form uses uncontrolled inputs to minimize re-renders. Formik uses controlled inputs that re-render the form on every keystroke.'),
    m('What does the register() function return?',['A state object','Props to spread onto an input (ref, onChange, onBlur, name)','A validation schema','An error object'],1,'register() returns the props needed to connect an input to the form state. Spread them onto the input: {...register("field")}.'),
    m('Which validation strategy provides the best UX balance?',['On submit only','On blur (validate when field loses focus)','On every keystroke','No validation'],1,'onBlur shows errors after the user finishes typing a field, providing feedback without the noise of per-keystroke validation.'),
    m('What is the purpose of aria-describedby on a form input?',['Sets the input label','Links the input to its error message element for screen reader announcements','Changes the input type','Enables autocomplete'],1,'aria-describedby points to the ID of the error message element. Screen readers announce the error message when the input receives focus.'),
    m('What does the Controller component wrap?',['Native HTML inputs','Custom components (like React Select, date pickers) that do not expose a ref','React Router links','Context providers'],1,'Controller wraps components that cannot use register() because they do not expose a ref. It manages the value through a render prop with field (value, onChange, onBlur).')
  ]
};

// ========== 17. React Router ==========
topics['react-react-router'] = {
  id:'react-react-router', title:'React Router', difficulty:'intermediate', estimatedMinutes:25,
  tldr:[
    'React Router v6 is the standard declarative routing library for React applications with nested routes, loaders, and actions.',
    'It uses a component-based approach: <BrowserRouter>, <Routes>, <Route>, <Link>, and <Outlet> for nested layouts.',
    'React Router v6 introduced loaders (data fetching before render) and actions (form submissions) for route-level data management.',
    'Nested routes with <Outlet> enable persistent layouts where the parent layout remains mounted while child routes change.'
  ],
  laymanDefinition:'React Router is like a GPS for your app. When a user clicks a link or navigates to a URL, React Router determines which components to show, just like a GPS determines which roads to take based on the destination. It enables Single Page Application (SPA) navigation where the page does not reload - the URL changes and React updates the visible components instantly. React Router v6 is the latest version with nested routing (like nested menus), loaders (fetch data before showing a page), and actions (handle form submissions at the route level). It replaces the mental model of "pages" with "component trees that match URL patterns."',
  deepDive:[
    d('React Router v6 Architecture','React Router v6 is built around a hierarchical route configuration. <BrowserRouter> provides the routing context (history, location). <Routes> evaluates the current URL against <Route> patterns and renders the matching route. Each <Route> has a path (URL pattern) and element (component to render). Routes can be nested: parent routes define layouts with <Outlet>, child routes fill the outlet. The match is made using a ranking algorithm (more specific paths win over less specific). Key concepts: (1) Relative links - <Link to="settings"> resolves relative to the parent route. (2) Index routes - the default child route at a path: <Route index element={<Home />} />. (3) Layout routes - routes that only provide layout (no path) with <Outlet> for children. (4) Path parameters: <Route path=":id" element={<Detail />} /> - accessed via useParams().'),
    d('Data Loading with Loaders','React Router v6.4+ introduced loaders for fetching data before a route renders. A loader is an async function exported from the route module: export async function loader({ params, request }) { const res = await fetch(/api/users/${params.id}); return res.json(); }. The route configuration connects the loader: <Route path=":id" element={<UserDetail />} loader={userLoader} />. The component accesses the loaded data via useLoaderData(). Benefits: (1) Data fetching is co-located with routes. (2) Navigation waits for data before rendering the new page (no loading spinners needed for initial data). (3) Loaders run on the server with SSR frameworks (Remix, Next.js). (4) Error handling with errorElement prop on routes. (5) Data revalidation - actions can invalidate and re-fetch loader data.'),
    d('Form Submissions with Actions','Actions handle form submissions at the route level. An action is an async function that receives the form data: export async function action({ request, params }) { const formData = await request.formData(); await fetch("/api/users", { method: "POST", body: formData }); return redirect("/users"); }. Forms use <Form method="post" action="/users"> instead of regular <form>. Benefits: (1) Progressive enhancement - works without JavaScript. (2) Automatic form data serialization. (3) Automatic revalidation of loader data after action completes. (4) useActionData() to access action return values (validation errors, success messages). (5) useNavigation() for pending states (loading indicators during form submission). Actions replace the manual form handling + navigation pattern with a declarative route-level approach.'),
    d('Nested Routes and Layouts','Nested routes are React Router v6s killer feature. Pattern: (1) Parent route: <Route path="dashboard" element={<DashboardLayout />}>. (2) DashboardLayout has <Outlet /> where child routes render. (3) Child routes: <Route path="settings" element={<Settings />} /> -> renders at /dashboard/settings inside DashboardLayout. Benefits: (1) The parent layout (sidebar, nav) persists while child content changes. (2) Parent data loaders run once; child loaders run independently. (3) Relative navigation: <Link to="../settings"> navigates relative to the current route. (4) Error boundaries at any level: <Route errorElement={<ErrorFallback />}> catches errors in all descendants. (5) Index routes provide a default child: <Route index element={<DashboardHome />} />. This eliminates the manual layout component pattern (wrapping children in layout components at each render).'),
    d('Navigation Methods and Hooks','React Router provides multiple navigation methods: (1) <Link to="/path"> - declarative navigation (renders an <a> tag). (2) <NavLink to="/path"> - Link with active state (className receives isActive). (3) useNavigate() - imperative navigation: const navigate = useNavigate(); navigate("/dashboard", { replace: true }). (4) <Navigate to="/path" /> - declarative redirect component. (5) useHref() - resolve a relative URL. (6) useResolvedPath() - resolve a path against the current route. (7) useSearchParams() - read/write URL query parameters: const [searchParams, setSearchParams] = useSearchParams(); searchParams.get("q"). (8) useLocation() - access the current location object (pathname, search, hash, state). (9) useNavigation() - pending state for loading indicators during navigation.')
  ],
  interviewAnswer:'React Router v6 provides declarative routing with <BrowserRouter>, <Routes>, and nested <Route> components. Key features: nested routes with <Outlet> for persistent layouts, loaders for data fetching before render, actions for form submissions, and relative navigation. Use <Link> for navigation, useParams() for URL parameters, useSearchParams() for query strings, and useNavigate() for imperative navigation. React Router v6.4+ added data APIs (loaders, actions) that enable server-renderable routing with automatic revalidation. Error handling via errorElement prop at any route level.',
  interviewQuestions:[
    q('How does React Router v6 differ from v5?','React Router v6 uses <Routes> instead of <Switch>, relative routing, automatic route ranking (no exact prop), nested routes with <Outlet>, and loaders/actions (v6.4+). No more withRouter HOC - hooks (useParams, useNavigate) replace it.'),
    q('What is the purpose of <Outlet>?','<Outlet> marks where child routes render inside a parent layout route. The parent component persists across child route changes. Think of it as {children} for routing.'),
    q('What is a loader in React Router?','A loader is an async function that fetches data before a route renders. Defined alongside the route: <Route loader={userLoader} />. The component accesses data via useLoaderData(). Navigation waits for the loader to complete before rendering.'),
    q('How do forms work in React Router v6.4+?','Use <Form method="post" action="/route"> instead of regular <form>. The action prop handles submission. An action function at the target route processes the form data and returns the result (redirect, errors, or data).'),
    q('What is an index route?','An index route is the default child route rendered when the parent URL matches exactly. <Route index element={<DashboardHome />} /> is equivalent to path="" but explicit. It renders inside the parent Outlet.'),
    q('How do you access URL parameters?','useParams() hook returns an object of URL parameters: const { id } = useParams() for a route path="/users/:id". URL parameters are strings by default - parse numbers as needed.'),
    q('How do you read and write query strings?','useSearchParams() returns [searchParams, setSearchParams]. searchParams.get("q") reads the q parameter. setSearchParams({ q: "react" }) updates query string. Preserves existing params by default.'),
    q('What is the difference between <Link> and <NavLink>?','<NavLink> extends <Link> with active state styling. It passes isActive and isPending booleans to the className or style render prop: className={({ isActive }) => isActive ? "active" : ""}.'),
    q('How does error handling work in React Router v6?','Each <Route> can have an errorElement prop: <Route errorElement={<ErrorFallback />} />. Errors from loaders, actions, or component rendering are caught by the nearest errorElement ancestor. Use useRouteError() to access the error in the fallback component.'),
    q('What is the difference between useNavigate and <Link>?','<Link> is declarative (renders an <a> tag, works with right-click/open in new tab). useNavigate is imperative (programmatic navigation, no <a> tag generated). Prefer <Link> for visible navigation, useNavigate for side effects (redirect after form submission).')
  ],
  diagramSvg:svgW(720,300,'React Router Route Hierarchy',
    R(30,55,200,35,'#1a1d28','#6c9fff','<Route path="/">','Root layout')+
    T(40,110,'<Route index element={<Home />} />',11,'#f59e0b','start')+
    T(40,135,'<Route path="about" element={<About />} />',11,'#f59e0b','start')+
    T(40,160,'<Route path="dashboard" element={<Layout />}>',11,'#f59e0b','start')+
    T(50,185,'<Route index element={<Overview />} />',10,'#9aa0b0','start')+
    T(50,210,'<Route path="settings" element={<Settings />} />',10,'#9aa0b0','start')+
    T(40,235,'</Route>',11,'#f59e0b','start')+
    T(40,260,'<Route path="*" element={<NotFound />} />',11,'#f59e0b','start'),
    T(350,78,'Browser URL determines match',10,'#9aa0b0','start')+
    T(350,110,'Matches /',10,'#9aa0b0','start')+
    T(350,135,'Matches /about',10,'#9aa0b0','start')+
    T(350,160,'Matches /dashboard/*',10,'#9aa0b0','start')+
    T(350,210,'Child routes in <Outlet>',10,'#9aa0b0','start')+
    T(350,260,'Catch-all 404 page',10,'#9aa0b0','start')
  ),
  codeExamples:[
    e('Complete React Router v6 Setup with Data Loading','Router configuration with nested routes, loader, and error handling',
      codeBlock([
        'import { createBrowserRouter, RouterProvider, Outlet, Link, useLoaderData } from "react-router-dom";',
        '',
        '// Layout component',
        'function RootLayout() {',
        '  return (',
        '    <div>',
        '      <nav><Link to="/">Home</Link> | <Link to="/users">Users</Link></nav>',
        '      <main><Outlet /></main>',
        '    </div>',
        '  );',
        '}',
        '',
        '// Loader for users',
        'async function usersLoader() {',
        '  const res = await fetch("/api/users");',
        '  if (!res.ok) throw new Error("Failed to load users");',
        '  return res.json();',
        '}',
        '',
        '// Component using loader data',
        'function Users() {',
        '  const users = useLoaderData();',
        '  return (',
        '    <ul>',
        '      {users.map(u => <li key={u.id}><Link to={"/users/" + u.id}>{u.name}</Link></li>)}',
        '    </ul>',
        '  );',
        '}',
        '',
        '// Router configuration',
        'const router = createBrowserRouter([',
        '  {',
        '    path: "/",',
        '    element: <RootLayout />,',
        '    errorElement: <div>Oops!<Link to="/">Go home</Link></div>,',
        '    children: [',
        '      { index: true, element: <Home /> },',
        '      { path: "users", element: <Users />, loader: usersLoader },',
        '      { path: "users/:id", element: <UserDetail />, loader: userDetailLoader },',
        '      { path: "*", element: <NotFound /> }',
        '    ]',
        '  }',
        ']);',
        '',
        'function App() {',
        '  return <RouterProvider router={router} />;',
        '}'
      ]),
      'createBrowserRouter defines the route hierarchy as a JS object, supporting loaders, actions, and errorElement. RouterProvider renders the matched route. Nested routes inherit the parent layout. The errorElement catches rendering/loader errors in the entire tree.'
    ),
    e('Protected Routes with Authentication','Guard routes with authentication check and redirect',
      codeBlock([
        'import { Navigate, useLocation, Outlet } from "react-router-dom";',
        '',
        'function useAuth() {',
        '  const [user, setUser] = useState(null);',
        '  useEffect(() => {',
        '    fetch("/api/auth/me").then(r => r.ok ? r.json() : null).then(setUser);',
        '  }, []);',
        '  return user;',
        '}',
        '',
        'function RequireAuth() {',
        '  const user = useAuth();',
        '  const location = useLocation();',
        '',
        '  if (user === undefined) return <Spinner />; // loading',
        '  if (!user) {',
        '    return <Navigate to="/login" state={{ from: location }} replace />;',
        '  }',
        '  return <Outlet />;',
        '}',
        '',
        '// Router:',
        'const router = createBrowserRouter([',
        '  { path: "/login", element: <LoginPage /> },',
        '  {',
        '    element: <RequireAuth />,',
        '    children: [',
        '      { path: "/dashboard", element: <Dashboard /> },',
        '      { path: "/settings", element: <Settings /> },',
        '      { path: "/admin", element: <AdminPanel /> }',
        '    ]',
        '  },',
        '  { path: "*", element: <NotFound /> }',
        ']);'
      ]),
      'The RequireAuth layout route checks authentication status. If not authenticated, it redirects to /login with the original location saved in state (for redirect-back after login). Authenticated routes render via <Outlet />. The loader pattern can also handle auth checks centrally.'
    )
  ],
  mcqQuestions:[
    m('What is the purpose of <Outlet> in React Router?',['Renders a loading spinner','Marks where child routes render inside a layout component','Creates a new browser tab','Redirects to the home page'],1,'<Outlet> is the placeholder where child routes render inside a parent layout route. The parent persists across child changes.'),
    m('What does useLoaderData() return?',['The current URL','Data fetched by the nearest route loader','The form state','The React component tree'],1,'useLoaderData() returns the data returned by the route\'s loader function. The data is available after the loader completes.'),
    m('What is the difference between <Routes> (v6) and <Switch> (v5)?',['They are the same','<Routes> uses automatic route ranking (no exact needed) and supports nested routes natively','<Switch> is faster','<Routes> does not support path parameters'],1,'React Router v6 <Routes> automatically ranks routes by specificity. The most specific match wins. No exact prop needed. Supports nested route configuration.'),
    m('What does the errorElement prop do?',['Catches errors in the route subtree and renders a fallback UI','Redirects to an error page','Logs errors to the console','Prevents the route from rendering'],0,'errorElement defines a fallback component for errors thrown in the route\'s children (loaders, actions, component rendering). Access the error with useRouteError().'),
    m('How do you create a catch-all 404 route?',['<Route path="*" element={<NotFound />} />','<Route path="404" element={<NotFound />} />','<Route catchAll element={<NotFound />} />','<Route default element={<NotFound />} />'],0,'path="*" is a wildcard that matches any URL not matched by previous routes. Place it last in the route configuration.'),
    m('What does useSearchParams() return?',['searchParams, setSearchParams] for reading and writing URL query parameters','The current URL pathname','[params, navigate] for URL manipulation','[query, setQuery] for search state'],0,'useSearchParams() returns a URLSearchParams object and a setter function. searchParams.get("q") reads the q parameter; setSearchParams({ q: "react" }) updates it.')
  ]
};

// ========== 18. Protected Routes ==========
topics['react-protected-routes'] = {
  id:'react-protected-routes', title:'React Protected Routes', difficulty:'intermediate', estimatedMinutes:20,
  tldr:[
    'Protected routes restrict access to certain pages based on authentication status, redirecting unauthenticated users to login.',
    'Implement as a wrapper component (RequireAuth) that checks auth state and renders <Outlet /> or <Navigate to="/login" />.',
    'React Router v6 makes this pattern clean with layout routes that conditionally render their children.',
    'Combine with loaders for server-side auth checks and useLocation() state for redirect-back-after-login flow.'
  ],
  laymanDefinition:'Protected routes are like VIP sections at a concert. You need a valid ticket (authentication) to enter. If you do not have a ticket, you get redirected to the box office (login page). In React, protected routes wrap sensitive pages and check if the user is logged in. If logged in, they show the page; if not, they redirect to the login page. The smart part: the redirect remembers where you were trying to go (via location.state), so after login, the app sends you back to the original page instead of just the home page. This pattern is essential for any app with authenticated content.',
  deepDive:[
    d('Authentication State Management','Before implementing protected routes, you need an auth system. Common patterns: (1) Context-based - AuthContext provides user object and login/logout methods. useAuth() custom hook accesses the context. (2) Token-based - JWT stored in localStorage or httpOnly cookie. Auth check decodes the token and validates expiry. (3) Session-based - server session with a /api/auth/me endpoint that returns the current user. (4) Third-party - Auth0, Firebase Auth, Supabase, Clerk provide SDKs with hooks. The auth state has three states: loading (initial check in progress), authenticated (user object available), unauthenticated (no user). Protected routes must handle all three states: loading spinner for loading, redirect for unauthenticated, render children for authenticated.'),
    d('RequireAuth Layout Route Pattern','The recommended approach in React Router v6: create a layout route component that checks authentication and conditionally renders children. Implementation: (1) Define a <RequireAuth> component that uses useAuth() and useLocation(). (2) If loading, return <Spinner />. (3) If not authenticated, return <Navigate to="/login" state={{ from: location }} replace />. (4) If authenticated, return <Outlet />. (5) In the route config, wrap protected routes as children of RequireAuth: <Route element={<RequireAuth />}><Route path="dashboard" element={<Dashboard />} /></Route>. This pattern is clean because RequireAuth does not need to know about specific routes - it just checks auth and renders children.'),
    d('Role-Based Access Control (Authorization)','Beyond authentication (are you logged in?), authorization (do you have permission?) controls access to specific features. Patterns: (1) Role-based - roles like admin, editor, viewer. RequireRole component checks user.role. (2) Permission-based - granular permissions like canEdit, canDelete. (3) Feature flags - enable/disable features based on A/B testing or subscription tier. Implementation: extend RequireAuth with a requiredRole or requiredPermissions prop: <RequireRole role="admin"><Route path="admin" element={<AdminPanel />} /></RequireRole>. For complex permissions, create a hasPermission utility that checks the current user against required permissions. (4) Server-side enforcement - always validate permissions on the server; client-side checks are UX convenience, not security.'),
    d('Login Redirect Flow (Return URL)','The standard login redirect pattern: (1) User visits /dashboard (protected). (2) Not authenticated, redirect to /login?redirect=/dashboard. (3) User logs in successfully. (4) Redirect to /dashboard (the original URL). React Router v6 implementation: (1) In RequireAuth: <Navigate to="/login" state={{ from: location }} replace /> saves the current location in state. (2) In LoginPage: const location = useLocation(); const from = location.state?.from?.pathname || "/". (3) On login success: navigate(from, { replace: true }). Benefits: (1) The redirect-back works even for deeply nested routes (/dashboard/settings/profile). (2) replace: true prevents the login page from remaining in browser history (back button goes to the original page, not login). (3) The redirect parameter can also be passed as a search param for server-rendered login flows.'),
    d('Protected Route with Loader-Based Auth','React Router v6 loaders can perform server-side auth checks. Pattern: (1) Define a loader that calls an auth API: async function authLoader() { const res = await fetch("/api/auth/me"); if (!res.ok) throw redirect("/login"); return res.json(); }. (2) Attach the loader to the parent protected route: <Route loader={authLoader} element={<RequireAuth />}>. (3) RequireAuth uses useLoaderData() to get the user. (4) If the loader redirects, the protected children never render. Benefits: (1) Auth check happens during navigation, before any component renders. (2) The redirect response from the loader is handled by React Router\'s data layer. (3) No flash of protected content - the login page replaces it directly. (4) Works with SSR (Remix, Next.js).')
  ],
  interviewAnswer:'Protected routes restrict access based on authentication. Implement as a RequireAuth layout route: check auth state, show spinner while loading, redirect to /login (with return URL in location.state) if unauthenticated, render <Outlet /> if authenticated. React Router v6 makes this clean with layout routes. For authorization, extend with role/permission checks. For server-side auth, use loaders that redirect on failure. The redirect-after-login flow saves the original URL in state and navigates back after successful login with replace:true to avoid history pollution.',
  interviewQuestions:[
    q('How do you implement protected routes in React Router v6?','Create a RequireAuth layout component that checks auth state. If not authenticated, return <Navigate to="/login" state={{ from: location }} replace />. If authenticated, return <Outlet />. Wrap protected routes as children of RequireAuth in the route config.'),
    q('What are the three auth states a protected route must handle?','(1) Loading - initial auth check in progress (show spinner). (2) Unauthenticated - redirect to login. (3) Authenticated - render the protected content. Skipping the loading state causes a flash of the login page on page refresh.'),
    q('How do you pass the return URL to the login page?','Use location.state: <Navigate to="/login" state={{ from: location }} replace />. In LoginPage, read useLocation().state?.from?.pathname. On success, navigate(from, { replace: true }) to redirect back.'),
    q('What is the difference between authentication and authorization?','Authentication verifies identity ("who are you?"). Authorization verifies permissions ("what are you allowed to do?"). Protected routes handle authentication; role-based access handles authorization.'),
    q('How do you implement role-based route protection?','Create a RequireRole component that checks user.role against required roles. Extend RequireAuth with role checking: if (!requiredRoles.includes(user.role)) { return <Navigate to="/unauthorized" />; }.'),
    q('Why should you also enforce authorization on the server?','Client-side protection is UX convenience, not security. A malicious user can modify JavaScript to bypass client checks. Always validate permissions on the server for any sensitive operation (API calls, data access, mutations).'),
    q('How do loaders improve protected routes?','Loaders can check auth before the route renders, preventing any flash of protected content. A loader can throw redirect("/login") if not authenticated, and React Router handles the navigation before rendering the route component.'),
    q('What is the purpose of replace: true in the redirect Navigate?','replace: true replaces the current history entry instead of adding a new one. After login, pressing back goes to the original page (before the protected route), not the login page. This keeps the navigation stack clean.'),
    q('How do you handle token expiration?','Check token expiry in the RequireAuth component. If expired, try to refresh the token (via /api/auth/refresh endpoint). If refresh fails, redirect to login. Use axios interceptors or fetch wrappers for automatic token refresh on API calls.'),
    q('What is the preferred authentication library for React apps?','Auth0 (auth0-react SDK), Firebase Authentication, Supabase Auth, Clerk, or NextAuth.js (for Next.js). For custom auth, use Context + JWT with httpOnly cookies for security, localStorage/ sessionStorage for simpler apps.')
  ],
  diagramSvg:svgW(720,280,'Protected Route Flow',
    R(30,55,200,40,'#1a1d28','#6c9fff','User visits /dashboard','Protected route requested')+
    A(130,95,130,115)+
    R(30,115,200,40,'#1a1d28','#f59e0b','Check Auth State','useAuth() from context')+
    A(130,155,130,175)+
    R(30,175,90,50,'#1a1d28','#34d399','Authenticated?','<Outlet /> renders dashboard'),
    R(140,175,90,50,'#1a1d28','#f87171','Not Auth?','<Navigate to="/login" />')+
    T(260,78,'Requires valid session/token',10,'#9aa0b0','start')+
    T(260,135,'May trigger loading state',10,'#9aa0b0','start')+
    T(260,200,'Protected content shown',10,'#34d399','start')+
    T(260,200,'Redirect with return URL',10,'#f87171','start')
  ),
  codeExamples:[
    e('Complete Protected Route Implementation','Auth context + RequireAuth + LoginPage with redirect-back',
      codeBlock([
        '// 1. Auth Context',
        'const AuthContext = React.createContext(null);',
        '',
        'function AuthProvider({ children }) {',
        '  const [user, setUser] = useState(undefined); // undefined = loading',
        '',
        '  useEffect(() => {',
        '    fetch("/api/auth/me")',
        '      .then(r => r.ok ? r.json() : null)',
        '      .then(setUser);',
        '  }, []);',
        '',
        '  const login = async (email, password) => {',
        '    const res = await fetch("/api/auth/login", {',
        '      method: "POST",',
        '      headers: { "Content-Type": "application/json" },',
        '      body: JSON.stringify({ email, password })',
        '    });',
        '    if (!res.ok) throw new Error("Invalid credentials");',
        '    const user = await res.json();',
        '    setUser(user);',
        '    return user;',
        '  };',
        '',
        '  const logout = () => {',
        '    fetch("/api/auth/logout", { method: "POST" }).then(() => setUser(null));',
        '  };',
        '',
        '  return (',
        '    <AuthContext.Provider value={{ user, login, logout, loading: user === undefined }}>',
        '      {children}',
        '    </AuthContext.Provider>',
        '  );',
        '}',
        '',
        'function useAuth() { return useContext(AuthContext); }',
        '',
        '// 2. RequireAuth Component',
        'function RequireAuth() {',
        '  const { user, loading } = useAuth();',
        '  const location = useLocation();',
        '',
        '  if (loading) return <FullPageSpinner />;',
        '  if (!user) {',
        '    return <Navigate to="/login" state={{ from: location }} replace />;',
        '  }',
        '  return <Outlet />;',
        '}',
        '',
        '// 3. LoginPage with redirect-back',
        'function LoginPage() {',
        '  const { login } = useAuth();',
        '  const navigate = useNavigate();',
        '  const location = useLocation();',
        '  const from = location.state?.from?.pathname || "/dashboard";',
        '',
        '  const handleSubmit = async (e) => {',
        '    e.preventDefault();',
        '    const form = new FormData(e.target);',
        '    await login(form.get("email"), form.get("password"));',
        '    navigate(from, { replace: true });',
        '  };',
        '',
        '  return <form onSubmit={handleSubmit}>...</form>;',
        '}',
        '',
        '// 4. Router Configuration',
        '<Route element={<RequireAuth />}>',
        '  <Route path="dashboard" element={<Dashboard />} />',
        '  <Route path="settings" element={<Settings />} />',
        '  <Route path="admin" element={<AdminPanel />} />',
        '</Route>',
        '<Route path="login" element={<LoginPage />} />'
      ]),
      'The AuthProvider manages auth state. RequireAuth checks auth and redirects with return URL. LoginPage reads the return URL from location.state and navigates there on success. replace:true ensures clean history.'
    ),
    e('Role-Based Access with RequireRole','Extend protected routes for admin-only sections',
      codeBlock([
        'function RequireRole({ role, children }) {',
        '  const { user } = useAuth();',
        '  const location = useLocation();',
        '',
        '  if (!user) {',
        '    return <Navigate to="/login" state={{ from: location }} replace />;',
        '  }',
        '',
        '  if (user.role !== role && user.role !== "superadmin") {',
        '    return <Navigate to="/unauthorized" replace />;',
        '  }',
        '',
        '  return children || <Outlet />;',
        '}',
        '',
        '// Router config:',
        '<Route element={<RequireAuth />}>',
        '  <Route path="dashboard" element={<Dashboard />} />',
        '  <Route element={<RequireRole role="admin" />}>',
        '    <Route path="admin/users" element={<UserManagement />} />',
        '    <Route path="admin/logs" element={<AuditLogs />} />',
        '  </Route>',
        '  <Route element={<RequireRole role="editor" />}>',
        '    <Route path="editor/posts" element={<PostEditor />} />',
        '  </Route>',
        '  <Route path="*" element={<NotFound />} />',
        '</Route>',
        '<Route path="/unauthorized" element={<UnauthorizedPage />} />'
      ]),
      'RequireRole extends RequireAuth with authorization. Admin routes require user.role === "admin". Editor routes require user.role === "editor". superadmin role bypasses all checks. Unauthorized redirects to a dedicated page instead of login.'
    )
  ],
  mcqQuestions:[
    m('What does a protected route component typically render for authenticated users?',['A login form','An <Outlet /> (the child routes)','A loading spinner','A redirect to home'],1,'Authenticated users see the protected content via <Outlet />. Unauthenticated users get redirected.'),
    m('What is the purpose of location.state in the redirect Navigate?',['To pass CSS classes','To save the original URL so the login page can redirect back after success','To disable the back button','To pass API tokens'],1,'location.state stores the current location. LoginPage reads it via useLocation().state?.from?.pathname and navigates back after successful authentication.'),
    m('Why is replace: true used in the redirect?',['To add a new history entry','To replace the current history entry so pressing back skips the login page','To reload the page','To clear browser cache'],1,'replace: true replaces the current history entry. After login, the user goes back to the original page (before the protected route), not to the login page.'),
    m('What is the difference between authentication and authorization?',['They are the same','Authentication = identity verification; Authorization = permission checking','Authentication = permission checking; Authorization = identity verification','Authentication = login; Authorization = logout'],1,'Authentication verifies who you are. Authorization verifies what you are allowed to do. Protected routes handle auth; role-based access handles authorization.'),
    m('What should RequireAuth show during the initial auth check?',['Nothing (null)','A loading spinner or skeleton','The protected content with errors','A redirect to login'],1,'During the initial auth check (loading state), show a loading indicator. Skipping this causes a flash of the login page or protected content.'),
    m('Why must authorization also be enforced server-side?',['Client-side checks are slower','Client-side JavaScript can be bypassed by malicious users','Server-side checks are optional','Authorization only works server-side'],1,'Client-side checks are UX convenience, not security. Anyone can modify client JS. Server-side authorization must protect all sensitive operations.')
  ]
};

// ========== 19. State Management Patterns ==========
topics['react-state-management-patterns'] = {
  id:'react-state-management-patterns', title:'React State Management Patterns', difficulty:'advanced', estimatedMinutes:30,
  tldr:[
    'React state management ranges from local (useState, useReducer) to global (Context, Redux, Zustand, Jotai).',
    'Choose the simplest solution: local state first, then lift state up, then Context, then external libraries.',
    'Redux provides predictable state with middleware, DevTools, and a mature ecosystem for large-scale apps.',
    'Modern alternatives (Zustand, Jotai, Valtio) offer simpler APIs with similar capabilities.'
  ],
  laymanDefinition:'State management is about deciding where each piece of data lives in your app. Think of state like water: it starts local (in a single component), but as more components need the same data, you move it higher up (lift state up), create streams (Context), or build a reservoir (Redux/Zustand). The golden rule: use the simplest solution that works. Do not add Redux to an app that only needs local state. React 18s useReducer + Context handles many cases that previously required Redux. For truly complex apps, Redux Toolkit or Zustand provide structure, DevTools, and predictable updates.',
  deepDive:[
    d('Local State: useState and useReducer','The foundation of React state management. useState for simple independent values (strings, numbers, booleans). useReducer for complex state objects with multiple fields that update together. Best practices: (1) Keep state as local as possible - only lift it up when multiple components need it. (2) Co-locate state with the component that renders it. (3) Use derived state (computed values) instead of storing redundant state: const total = items.reduce((s, i) => s + i.price, 0) instead of storing total separately. (4) Use callback setter for state that depends on previous state: setCount(c => c + 1). (5) Avoid storing props-derived state in useState - compute it directly. (6) useReducer centralizes complex update logic and makes it testable.'),
    d('Lifting State Up and Props Drilling','When multiple components need the same state, lift it to their nearest common ancestor and pass it down via props. This is the simplest form of shared state and works well for 2-3 levels of nesting. Beyond that, prop drilling (passing props through intermediate components that do not use them) becomes a problem. Signs of excessive prop drilling: (1) Props passed through 4+ levels of nesting. (2) Intermediate components have props only for passing down (not for their own use). (3) Adding a new feature requires threading new props through many components. Solutions: Context, composition (pass components as props/children), or external state management. Composition can reduce prop drilling: instead of <Layout><Page user={user} /></Layout>, use <Layout header={<UserHeader user={user} />} />.'),
    d('React Context for Global State','React Context provides a way to pass data through the component tree without prop drilling. Pattern: (1) Create context with createContext(defaultValue). (2) Create a Provider component that holds the state with useState/useReducer and passes it via context. (3) Consumer components use useContext() to access the state. Best practices: (1) Split contexts by domain (AuthContext, ThemeContext, CartContext) to avoid unnecessary re-renders. (2) Separate state and dispatch into two contexts for performance. (3) Memoize context values to prevent re-renders of all consumers when the provider re-renders: const value = useMemo(() => ({ user, login }), [user]). (4) Context is NOT a state management library - it is a dependency injection mechanism. (5) For frequently-updating state (mouse position, form input), Context can cause performance issues due to mass re-renders.'),
    d('Redux Toolkit: The Mature Solution','Redux Toolkit (RTK) is the modern recommended way to use Redux. Key features: (1) configureStore - creates store with middleware (thunk by default), DevTools, and combined reducers. (2) createSlice - defines reducers and actions in one concise API. (3) createAsyncThunk - handles async action lifecycle (pending, fulfilled, rejected). (4) RTK Query - built-in data fetching and caching (like React Query). Redux is best for: (1) Large-scale apps with complex state interactions. (2) Apps needing middleware (sagas, thunks for complex async flows). (3) Teams that benefit from the strict structure and patterns. (4) Apps where time-travel debugging is valuable. (5) Apps that share state across many unrelated components. The criticism: Redux has too much boilerplate (even with RTK) for small/medium apps.'),
    d('Modern Alternatives: Zustand, Jotai, and Valtio','These newer libraries address Redux boilerplate while providing similar capabilities: (1) Zustand - minimal API: const useStore = create((set) => ({ count: 0, increment: () => set(s => ({ count: s.count + 1 })) })). No provider needed, no reducers, no actions. (2) Jotai - atomic state model inspired by Recoil: const countAtom = atom(0); const [count, setCount] = useAtom(countAtom). Fine-grained re-renders. (3) Valtio - proxy-based: const state = proxy({ count: 0 }); state.count++ triggers re-renders automatically. These libraries are suitable for medium-scale apps where Context would cause excessive re-renders but Redux is overkill. They all support DevTools, TypeScript, and middleware. Choose based on mental model preference: Zustand (flux-like, single store), Jotai (atomic, fine-grained), Valtio (mutable proxy).')
  ],
  interviewAnswer:'React state management ranges from local (useState/useReducer) to global (Context, Redux, Zustand). The principle: choose the simplest solution - start with local state, lift state up as needed, use Context for medium-depth sharing, and external libraries for complex global state. Redux Toolkit provides structure for large apps with createSlice, createAsyncThunk, and RTK Query. Modern alternatives (Zustand, Jotai, Valtio) offer simpler APIs for medium scale. Split Context by domain and memoize values to avoid re-render issues. Never use Context for frequently-updating global state - use a library with selector-based subscriptions.',
  interviewQuestions:[
    q('What is the most important principle in choosing a state management solution?','Always start with the simplest solution that works: local state -> lift state up -> Context -> external library. Do not add complexity before it is needed.'),
    q('What problem does lifting state up solve?','When multiple sibling components need the same data, move the state to their nearest common ancestor and pass it down via props. This keeps the state in a single location and avoids duplicate state.'),
    q('What are the downsides of React Context for state management?','(1) All consumers re-render when the context value changes (no built-in selectors). (2) Frequent updates cause performance issues. (3) Context is not designed for high-frequency updates (mouse position, animations). (4) Deeply nested providers create complex component trees.'),
    q('How does Redux handle side effects?','Middleware. Redux Thunk (built into RTK) for async logic: createAsyncThunk handles pending/fulfilled/rejected. Redux Saga for complex workflows (race conditions, parallel tasks, debouncing). RTK Query for data fetching/caching.'),
    q('What is the difference between Zustand and Redux?','Zustand has minimal API (no reducers, no actions, no Provider), supports selectors by default, and requires less boilerplate. Redux provides more structure (middleware, DevTools, standardized patterns) suitable for large teams and complex apps.'),
    q('How does Jotai differ from Zustand?','Jotai uses atomic state - each piece of state is an independent atom. Components subscribe to individual atoms, so only components using the changed atom re-render. Zustand uses a single store with selector-based subscriptions.'),
    q('What is the purpose of splitting Context into multiple providers?','To prevent unnecessary re-renders. If auth state and theme state are in one context, any auth change re-renders theme consumers. Separate contexts isolate re-render scope. Split state and dispatch into separate contexts too.'),
    q('When would you use useReducer instead of useState?','When state is an object with multiple fields that update together (form state, async state with loading/error/data), or when the next state depends heavily on the previous state. useReducer makes complex transitions predictable and testable.'),
    q('What is RTK Query?','A data fetching and caching library built into Redux Toolkit. It manages API requests, caching, polling, optimistic updates, and automatic re-fetching. Inspired by React Query but integrated with Redux DevTools and middleware.'),
    q('What is the recommended state management approach for a new medium-scale React app?','Start with local state + Context for global concerns (theme, auth). If re-render performance becomes an issue, add Zustand or Jotai for specific state domains. Only reach for Redux Toolkit when the app has complex async flows, many state interactions, and a team that benefits from the strict patterns.')
  ],
  diagramSvg:svgW(720,280,'State Management Spectrum',
    R(30,55,120,40,'#1a1d28','#34d399','useState','Simple, local'),
    R(165,55,120,40,'#1a1d28','#34d399','useReducer','Complex, local'),
    R(300,55,120,40,'#1a1d28','#f59e0b','Context','Shared, medium'),
    R(435,55,120,40,'#1a1d28','#f59e0b','Zustand/Jotai','Medium, global'),
    R(570,55,120,40,'#1a1d28','#f87171','Redux','Large, global'),
    T(90,115,'One value',9,'#9aa0b0','middle')+
    T(225,115,'Multiple values',9,'#9aa0b0','middle')+
    T(360,115,'Prop drilling fix',9,'#9aa0b0','middle')+
    T(495,115,'Selector-based',9,'#9aa0b0','middle')+
    T(630,115,'Full middleware',9,'#9aa0b0','middle')+
    T(90,140,'Simple app',9,'#9aa0b0','middle')+
    T(360,140,'2-3 level depth',9,'#9aa0b0','middle')+
    T(630,140,'Enterprise scale',9,'#9aa0b0','middle')+
    T(360,180,'Choose the simplest solution for your needs',12,'#f59e0b','middle')+
    T(360,200,'Complexity increases left to right',10,'#9aa0b0','middle')
  ),
  codeExamples:[
    e('Zustand Store for Cart State','Modern state management with minimal boilerplate',
      codeBlock([
        'import { create } from "zustand";',
        'import { persist } from "zustand/middleware";',
        '',
        'const useCartStore = create(',
        '  persist(',
        '    (set, get) => ({',
        '      items: [],',
        '      discount: 0,',
        '',
        '      addItem: (product) => set((state) => {',
        '        const existing = state.items.find(i => i.id === product.id);',
        '        if (existing) {',
        '          return { items: state.items.map(i =>',
        '            i.id === product.id ? { ...i, qty: i.qty + 1 } : i',
        '          )};',
        '        }',
        '        return { items: [...state.items, { ...product, qty: 1 }] };',
        '      }),',
        '',
        '      removeItem: (id) => set((state) => ({',
        '        items: state.items.filter(i => i.id !== id)',
        '      })),',
        '',
        '      getTotal: () => {',
        '        const { items, discount } = get();',
        '        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);',
        '        return Math.max(0, subtotal - discount);',
        '      },',
        '',
        '      clearCart: () => set({ items: [], discount: 0 })',
        '    }),',
        '    { name: "cart-storage" }',
        '  )',
        ');',
        '',
        '// In components:',
        'function Cart() {',
        '  const items = useCartStore((state) => state.items);',
        '  const addItem = useCartStore((state) => state.addItem);',
        '  const total = useCartStore((state) => state.getTotal());',
        '',
        '  return (',
        '    <div>',
        '      {items.map(i => <div key={i.id}>{i.name} x{i.qty}</div>)}',
        '      <p>Total: ${total}</p>',
        '      <button onClick={() => addItem({ id: 1, name: "Widget", price: 9.99 })}>',
        '        Add Widget',
        '      </button>',
        '    </div>',
        '  );',
        '}'
      ]),
      'Zustand creates a store with a minimal API. Selector functions (state => state.items) subscribe to specific slices - only components using items re-render when items change. persist middleware saves/loads from localStorage automatically.'
    ),
    e('Redux Toolkit Slice with Async Thunk','Complete RTK pattern for a todo app',
      codeBlock([
        'import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";',
        'import { useSelector, useDispatch } from "react-redux";',
        '',
        '// Async thunk',
        'export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {',
        '  const res = await fetch("/api/todos");',
        '  return res.json();',
        '});',
        '',
        '// Slice',
        'const todosSlice = createSlice({',
        '  name: "todos",',
        '  initialState: { items: [], status: "idle", error: null },',
        '  reducers: {',
        '    toggleTodo: (state, action) => {',
        '      const todo = state.items.find(t => t.id === action.payload);',
        '      if (todo) todo.completed = !todo.completed;',
        '    },',
        '    removeTodo: (state, action) => {',
        '      state.items = state.items.filter(t => t.id !== action.payload);',
        '    }',
        '  },',
        '  extraReducers: (builder) => {',
        '    builder',
        '      .addCase(fetchTodos.pending, (state) => { state.status = "loading"; })',
        '      .addCase(fetchTodos.fulfilled, (state, action) => {',
        '        state.status = "succeeded";',
        '        state.items = action.payload;',
        '      })',
        '      .addCase(fetchTodos.rejected, (state, action) => {',
        '        state.status = "failed";',
        '        state.error = action.error.message;',
        '      });',
        '  }',
        '});',
        '',
        'export const { toggleTodo, removeTodo } = todosSlice.actions;',
        '',
        'const store = configureStore({ reducer: { todos: todosSlice.reducer } });',
        '',
        '// Usage in component:',
        'function TodoList() {',
        '  const dispatch = useDispatch();',
        '  const { items, status, error } = useSelector(s => s.todos);',
        '',
        '  useEffect(() => { dispatch(fetchTodos()); }, [dispatch]);',
        '',
        '  if (status === "loading") return <Spinner />;',
        '  if (status === "failed") return <Error message={error} />;',
        '',
        '  return items.map(t => (',
        '    <div key={t.id}>',
        '      <span onClick={() => dispatch(toggleTodo(t.id))}',
        '        style={{ textDecoration: t.completed ? "line-through" : "none" }}>',
        '        {t.title}',
        '      </span>',
        '      <button onClick={() => dispatch(removeTodo(t.id))}>x</button>',
        '    </div>',
        '  ));',
        '}'
      ]),
      'createSlice generates actions and reducers from a concise object definition. createAsyncThunk handles the async lifecycle (pending, fulfilled, rejected). configureStore sets up the store with middleware and DevTools. Redux DevTools provides time-travel debugging.'
    )
  ],
  mcqQuestions:[
    m('What is the simplest React state management solution?',['Redux','useState and local state','Zustand','Context'],1,'Always start with local useState. Only add complexity (Context, libraries) when local state + lifting state up is insufficient.'),
    m('What problem does lifting state up solve?',['Reduces bundle size','Multiple sibling components need the same state - move it to their common ancestor','Eliminates all re-renders','Replaces Redux'],1,'Lifting state up shares state between sibling components via a common parent. It is the simplest form of shared state.'),
    m('What is a major downside of React Context for global state?',['Too much boilerplate','All consumers re-render when the context value changes (no built-in selector optimization)','Does not work with TypeScript','Requires Redux to work'],1,'Context does not support selector-based subscriptions. Any change to the context value re-renders ALL consumers, which can be a performance issue for frequently-updating state.'),
    m('Which library provides atomic (fine-grained) state management?',['Redux Toolkit','Jotai','Zustand','Context'],1,'Jotai uses atomic state where each atom is an independent piece of state. Components subscribe to individual atoms, ensuring minimal re-renders.'),
    m('What does createAsyncThunk handle?',['Throttling user input','The full lifecycle of an async request (pending, fulfilled, rejected) with automatic action dispatching','Client-side caching','Form validation'],1,'createAsyncThunk generates three action types (pending/fulfilled/rejected) and dispatches them automatically during the async request lifecycle.'),
    m('What is the recommended state management for a new large-scale enterprise app?',['useState only','Zustand','Redux Toolkit (with RTK Query)','Context only'],2,'For large-scale apps with complex state, multiple teams, and advanced requirements (middleware, DevTools, normalized cache), Redux Toolkit with RTK Query is the recommended choice.')
  ]
};

// Write all files
for (var id in topics) {
  var obj = topics[id];
  var fp = path.join(dir, id + '.json');
  fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
  console.log('Created: ' + id);
}
console.log('\nAll ' + Object.keys(topics).length + ' topics generated.');
