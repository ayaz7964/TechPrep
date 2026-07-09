const fs = require('fs');

/* =================== HELPERS =================== */
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
function P(pts,fill,stroke,sw) {
  return '<polygon points="'+pts+'" fill="'+(fill||'none')+'" stroke="'+(stroke||'#666')+'" stroke-width="'+(sw||1)+'"/>';
}

/* =================== TOPIC HELPER =================== */
function topic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  return {
    id: id,
    title: title,
    difficulty: difficulty,
    estimatedMinutes: estimatedMinutes,
    tldr: tldrItems,
    laymanDefinition: laymanDef,
    deepDive: deepDiveArr,
    interviewAnswer: interviewAns,
    interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 200, title, svgInner),
    codeExamples: codeExamplesArr,
    mcqQuestions: mcqArr
  };
}

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = topic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr);
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: APP ROUTER =================== */
addTopic('nextjs-app-router', 'App Router', 'intermediate', 30,
  [
    'The App Router is the new routing paradigm introduced in Next.js 13, built on React Server Components and nested layouts.',
    'Uses a file-system based routing where folders define route segments and special files (page.js, layout.js, loading.js, error.js) define the UI for each segment.',
    'Supports nested layouts, loading states (suspense boundaries), error boundaries, and parallel routes out of the box.',
    'All components in the App Router are Server Components by default, improving initial page load performance.'
  ],
  'The App Router is like a filing cabinet where every folder is a URL path, and each folder can contain specific files that tell Next.js what to show, how to load data, and how to handle errors.',
  [
    d('File-System Routing Convention', 'In the App Router, the directory structure directly maps to URL paths. Each folder represents a route segment, and special files define the behavior: page.js (public UI), layout.js (shared wrapper), loading.js (loading fallback), error.js (error boundary), and not-found.js (404 page). This convention eliminates manual route configuration.'),
    d('Nested Layouts and Templates', 'Layouts wrap child routes and persist across navigations, avoiding re-renders. Multiple layouts can be nested hierarchically. Templates (template.js) are similar but remount on every navigation, useful for animations or state that should reset per route. Layouts can fetch data and share it with their children.'),
    d('Loading and Error Boundaries', 'The App Router automatically wraps page segments in React Suspense boundaries when loading.js is provided. Error boundaries (error.js) catch errors in the segment and its children, showing fallback UI. Both can be nested at any level for granular control.'),
    d('Parallel and Intercepting Routes', 'Parallel routes (defined with @folder convention) render multiple independent views in the same layout simultaneously, useful for dashboards. Intercepting routes (defined with (.)folder) intercept navigation from a matching parent route, enabling patterns like modals that work with URL sharing.'),
    d('Route Groups and Private Folders', 'Route groups (folders wrapped in parentheses like (marketing)) organize routes without affecting the URL path. Private folders (prefixed with _) exclude a folder and its children from routing entirely. Both help maintain a clean project structure without impacting the public URL structure.')
  ],
  'The App Router revolutionizes Next.js routing by embracing React Server Components, nested layouts, and file-system conventions. It reduces boilerplate, improves performance through automatic code splitting and suspense boundaries, and provides a more intuitive mental model compared to the Pages Router. Key advantages include automatic streaming, granular error handling, and co-located data fetching within components.',
  [
    q('What is the App Router in Next.js?', 'The App Router is the modern routing system in Next.js 13+, built on React Server Components. It uses a file-system based routing convention where folders define URL path segments and special files (page.js, layout.js, loading.js, etc.) define the UI for each segment. It supports nested layouts, streaming, error boundaries, and server components by default.'),
    q('How does the App Router differ from the Pages Router?', 'The App Router uses a new file convention (page.js, layout.js) instead of index.js. It supports nested layouts that persist across navigations, automatic loading boundaries with loading.js, error boundaries with error.js, and Server Components by default. The Pages Router uses _app.js, _document.js, and getServerSideProps/getStaticProps which are replaced by more intuitive patterns in the App Router.'),
    q('What special files are used in the App Router?', 'page.js (route UI), layout.js (shared wrapper), loading.js (loading fallback), error.js (error boundary), not-found.js (404 page), template.js (re-mounting layout), default.js (parallel route fallback), and route.js (API routes). Each can be nested at any route segment level.'),
    q('How do nested layouts work in the App Router?', 'Layouts are defined by placing layout.js files in route folders. They wrap child routes and persist across navigations, meaning the layout does not re-render when the user navigates between sibling pages. Layouts can fetch data independently using async component functions, and the data persists across navigations within the layout.'),
    q('What are parallel routes in the App Router?', 'Parallel routes are defined using the @folder convention (e.g., @analytics, @team). They allow rendering multiple independent views within the same layout simultaneously. Each parallel route segment can have its own loading and error states. They are useful for dashboards, multi-panel views, and complex UI compositions.'),
    q('What are intercepting routes?', 'Intercepting routes allow you to load a route from another part of the application within the current context. They use the (.) convention: (.) matches same level, (..) matches one level up, (..)(..) matches two levels up, (...) matches from the root. This is commonly used for modals that display content from another route while preserving the URL.'),
    q('How does data fetching work in the App Router?', 'Data fetching is done using async Server Components with the fetch() API. Next.js extends fetch with automatic caching and revalidation. You can use cache() for memoization across components and revalidate data on demand using revalidatePath() or revalidateTag(). The App Router eliminates the need for getServerSideProps and getStaticProps.'),
    q('What are route groups in the App Router?', 'Route groups are folders wrapped in parentheses (e.g., (marketing), (shop)). They organize routes logically without affecting the URL path. For example, (marketing)/about/page.js maps to /about, not /marketing/about. They are useful for organizing multiple layouts and segments without polluting the URL structure.'),
    q('How does the App Router handle metadata?', 'The App Router supports the Metadata API, which allows defining metadata (title, description, Open Graph, etc.) using exported metadata objects or generateMetadata() functions in page.js and layout.js files. Metadata is automatically injected into the HTML head and supports both static and dynamic generation based on route parameters.'),
    q('What is the difference between a layout and a template in the App Router?', 'A layout (layout.js) persists across navigations and does not re-mount. A template (template.js) creates a new instance on each navigation, causing all children to re-mount. Templates are useful for animations that should trigger on every navigation or for components that need to reset state per route (e.g., page-level scroll positions).')
  ],
  R(10,40,100,40,'#0070f3','','/products','Catalog') +
  R(120,40,100,40,'#0070f3','','/products/[id]','Detail') +
  R(230,40,100,40,'#28a745','','layout.js','Layout') +
  R(340,40,80,40,'#ffc107','','page.js','Page') +
  R(430,40,60,40,'#dc3545','','error.js','Error') +
  A(110,60,120,60) + A(230,60,230,60) +
  R(10,110,100,40,'#17a2b8','','@sidebar','Parallel') +
  R(120,110,100,40,'#6610f2','','@feed','Parallel') +
  R(230,110,100,40,'#e83e8c','','(.)photo','Intercept') +
  T(250,180,'App Router: File-system based routing with nested layouts, parallel routes, and intercepting routes.',9,'#666','middle'),
  [
    e('Defining a Route with page.js', 'When you need to create a new public page at a specific URL path.', codeBlock([
      '// app/products/page.js',
      'export default function ProductsPage() {',
      '  return <div>Products List</div>',
      '}'
    ]), 'Creates a route at /products with a Server Component that renders the products list.'),
    e('Nested Layout', 'When you want a shared header/nav that persists across pages in a section.', codeBlock([
      '// app/shop/layout.js',
      'export default function ShopLayout({ children }) {',
      '  return (',
      '    <section>',
      '      <nav>Shop Navigation</nav>',
      '      {children}',
      '    </section>',
      '  );',
      '}'
    ]), 'Wraps all shop routes with a shared navigation that does not re-render on page changes.'),
    e('Loading UI with loading.js', 'When you want to show a loading spinner immediately while the page loads.', codeBlock([
      '// app/products/loading.js',
      'export default function Loading() {',
      '  return <div className="spinner">Loading products...</div>',
      '}'
    ]), 'Automatically wraps the products page in a Suspense boundary, showing this fallback immediately.'),
    e('Error Boundary with error.js', 'When you need to catch errors gracefully in a specific route segment.', codeBlock([
      '// app/products/error.js',
      '"use client";',
      'export default function Error({ error, reset }) {',
      '  return (',
      '    <div>',
      '      <h2>Something went wrong!</h2>',
      '      <button onClick={reset}>Try again</button>',
      '    </div>',
      '  );',
      '}'
    ]), 'Catches errors in the products segment and provides a reset button to retry. Note error.js must be a Client Component.'),
    e('Parallel Routes with @folder', 'When you want to render a dashboard with independent panels.', codeBlock([
      '// app/dashboard/@analytics/page.js',
      'export default function Analytics() {',
      '  return <div>Analytics Panel</div>',
      '}',
      '',
      '// app/dashboard/layout.js',
      'export default function Dashboard({ children, analytics, team }) {',
      '  return (',
      '    <div className="dashboard">',
      '      {children}',
      '      <aside>{analytics}</aside>',
      '      <aside>{team}</aside>',
      '    </div>',
      '  );',
      '}'
    ]), 'Renders analytics and team panels independently, each with their own loading/error states.')
  ],
  [
    m('What special file is used to define a public route UI in the App Router?', ['page.js', 'index.js', 'route.js', 'view.js'], 0, 'page.js is the special file that defines the public UI for a route segment in the App Router.'),
    m('How do layouts differ from pages in the App Router?', ['Layouts re-render on every navigation', 'Layouts persist across navigations', 'Layouts can only be used at the root', 'Layouts replace page.js entirely'], 1, 'Layouts persist across navigations and do not re-render when switching between sibling pages.'),
    m('What convention is used for parallel routes in the App Router?', ['(folder)', '@folder', '_folder', '[folder]'], 1, 'Parallel routes use the @folder naming convention (e.g., @analytics, @team).'),
    m('Which file convention creates an automatic Suspense boundary?', ['error.js', 'loading.js', 'template.js', 'not-found.js'], 1, 'loading.js is automatically wrapped in a Suspense boundary by Next.js.'),
    m('What is the purpose of route groups (parentheses folders)?', ['They create URL segments', 'They organize routes without affecting the URL', 'They enable API routes', 'They disable caching'], 1, 'Route groups organize related routes without adding their folder name to the URL path.'),
    m('What must error.js export to be valid?', ['A Server Component', 'A Client Component ("use client")', 'An async function', 'A metadata object'], 1, 'error.js must be a Client Component because it uses the reset prop and interactivity for the retry button.')
  ]
);

/* =================== TOPIC 2: PAGES ROUTER =================== */
addTopic('nextjs-pages-router', 'Pages Router', 'beginner', 25,
  [
    'The Pages Router is Next.js\' original routing system, using a file-system convention where files in the pages/ directory map directly to URL routes.',
    'Supports dynamic routes with bracket syntax ([id].js), catch-all routes ([...slug].js), and optional catch-all routes ([[...slug]].js).',
    'Uses getServerSideProps, getStaticProps, and getStaticPaths for data fetching at the page level.',
    'The _app.js file wraps all pages, _document.js customizes the HTML document structure, and API routes are defined in pages/api/.'
  ],
  'The Pages Router is like a filing system where every file you put in the "pages" folder automatically becomes a webpage, and the file name determines the website address.',
  [
    d('File-System Routing Basics', 'In the Pages Router, any .js, .jsx, .ts, or .tsx file inside the pages/ directory automatically becomes a route. The file path relative to pages/ determines the URL path. For example, pages/about.js maps to /about, and pages/blog/index.js maps to /blog. Index files (index.js) represent the root of their directory.'),
    d('Dynamic Routes and Catch-All Routes', 'Dynamic routes use square brackets: [id].js maps to /1, /abc, etc. Catch-all routes use [...slug].js and match any number of path segments, returning them as an array. Optional catch-all routes use [[...slug]].js and match even without the parameter. These patterns enable flexible URL structures for content-driven sites.'),
    d('Data Fetching Methods', 'The Pages Router provides three main data fetching functions: getStaticProps (build-time data fetching for SSG), getServerSideProps (request-time data fetching for SSR), and getStaticPaths (specifying dynamic paths to pre-render for SSG). These functions run on the server side only and inject props into the page component.'),
    d('Custom App and Document', '_app.js (pages/_app.js) initializes all pages, allowing global styles, layout components, and persistent state. _document.js (pages/_document.js) customizes the HTML document structure (html, head, body tags) and is only rendered on the server. _document.js is used for custom fonts, meta tags, and third-party scripts that must be in the <head>.'),
    d('API Routes', 'API routes are defined in pages/api/ and allow building backend endpoints within the Next.js application. Each file in pages/api/ exports a handler function that receives req and res objects. API routes support middleware patterns, CORS configuration, and dynamic API routes using bracket syntax.')
  ],
  'The Pages Router provides a straightforward, file-system-based routing approach that has powered Next.js applications for years. While the App Router is now recommended for new projects, the Pages Router remains widely used and supported. Its strength lies in its simplicity and explicit data fetching methods that clearly separate server and client concerns.',
  [
    q('How does file-system routing work in the Pages Router?', 'Each file in the pages/ directory automatically becomes a route. The file path relative to pages/ maps to the URL path. For example, pages/about.js becomes /about, pages/blog/[id].js becomes /blog/:id. Index files (index.js) represent the root of their directory.'),
    q('What is the difference between getStaticProps and getServerSideProps?', 'getStaticProps runs at build time and fetches data once, used for static generation (SSG). getServerSideProps runs on every request, used for server-side rendering (SSR). getStaticProps returns props that are cached and served to all users, while getServerSideProps returns fresh data on each request.'),
    q('How do dynamic routes work in the Pages Router?', 'Dynamic routes use square brackets in file names: [param].js captures a single segment, [...slug].js captures multiple segments, [[...slug]].js captures multiple segments optionally. The dynamic parameters are available via the router.query object in the page component.'),
    q('What is the purpose of _app.js?', '_app.js is the root component that wraps every page. It is used to persist layout between navigations, inject global CSS, keep state when navigating, and pass global props to pages. It receives Component (the active page) and pageProps (data fetched by getStaticProps/getServerSideProps).'),
    q('What is the purpose of _document.js?', '_document.js customizes the HTML document structure. It is only rendered server-side and is used to set the lang attribute, inject custom fonts, add external scripts to <head>, and modify the initial HTML structure. It runs before client-side JavaScript hydrates.'),
    q('How do API routes work in the Pages Router?', 'API routes are files in pages/api/ that export a handler function: export default function handler(req, res) { ... }. They receive Express-like req and res objects. Dynamic API routes use bracket syntax (pages/api/[id].js). API routes do not increase client-side bundle size.'),
    q('What is getStaticPaths used for?', 'getStaticPaths is used with getStaticProps to specify which dynamic routes should be pre-rendered at build time. It returns an object with paths (array of parameter objects) and fallback (false, true, or "blocking"). fallback: true enables on-demand generation of paths not specified at build time.'),
    q('How do you handle 404 pages in the Pages Router?', 'Create a pages/404.js file to display a custom 404 page. Next.js automatically serves this page for any unmatched routes. It is statically generated at build time.'),
    q('Can the Pages Router and App Router coexist?', 'Yes, both routers can coexist in the same project. Pages Router uses pages/ directory and App Router uses app/ directory. Routes in pages/ take precedence over app/ for the same URL. This is useful for incremental migration from Pages Router to App Router.'),
    q('How do middleware and redirects work in the Pages Router?', 'Middleware can be defined in middleware.js at the project root. next.config.js supports redirects, rewrites, and headers. The Pages Router does not have built-in middleware files at the page level; instead, you use higher-order component patterns or getServerSideProps for middleware-like logic.')
  ],
  R(10,40,80,40,'#0070f3','','pages/','Dir') +
  R(10,90,80,40,'#0070f3','','pages/about.js','/about') +
  R(10,140,80,40,'#0070f3','','pages/blog/[id].js','/blog/:id') +
  A(90,60,100,60) + A(90,110,100,110) +
  R(110,40,100,40,'#28a745','','getStaticProps','SSG') +
  R(110,90,100,40,'#ffc107','','getServerSideProps','SSR') +
  R(110,140,100,40,'#17a2b8','','getStaticPaths','Paths') +
  R(230,40,120,40,'#6610f2','','_app.js','Wrapper') +
  R(230,90,120,40,'#e83e8c','','_document.js','HTML') +
  R(230,140,120,40,'#dc3545','','api/','Backend') +
  T(250,190,'Pages Router: File-system routing with SSR, SSG, and API routes.',9,'#666','middle'),
  [
    e('Basic Page Route', 'When you need a simple static page.', codeBlock([
      '// pages/about.js',
      'export default function About() {',
      '  return <h1>About Us</h1>',
      '}'
    ]), 'This creates a route at /about automatically without any configuration.'),
    e('Dynamic Route with getStaticProps', 'When building a blog with dynamic post URLs.', codeBlock([
      '// pages/posts/[id].js',
      'export default function Post({ post }) {',
      '  return <div><h1>{post.title}</h1><p>{post.body}</p></div>',
      '}',
      '',
      'export async function getStaticPaths() {',
      '  const posts = await fetch("https://api.example.com/posts").then(r => r.json());',
      '  return { paths: posts.map(p => ({ params: { id: p.id } })), fallback: false };',
      '}',
      '',
      'export async function getStaticProps({ params }) {',
      '  const post = await fetch(`https://api.example.com/posts/${params.id}`).then(r => r.json());',
      '  return { props: { post } };',
      '}'
    ]), 'Pre-renders all blog posts at build time using static generation with dynamic routes.'),
    e('Server-Side Rendering with getServerSideProps', 'When you need fresh data on every request, like a user dashboard.', codeBlock([
      '// pages/dashboard.js',
      'export default function Dashboard({ userData }) {',
      '  return <div><h1>Welcome {userData.name}</h1></div>',
      '}',
      '',
      'export async function getServerSideProps() {',
      '  const userData = await fetch("https://api.example.com/user").then(r => r.json());',
      '  return { props: { userData } };',
      '}'
    ]), 'Fetches fresh data on every request and renders the page server-side.'),
    e('API Route', 'When you need a serverless backend endpoint.', codeBlock([
      '// pages/api/hello.js',
      'export default function handler(req, res) {',
      '  res.status(200).json({ message: "Hello World" });',
      '}'
    ]), 'Creates an API endpoint at /api/hello that returns JSON.'),
    e('Custom 404 Page', 'When you want a branded 404 page.', codeBlock([
      '// pages/404.js',
      'export default function Custom404() {',
      '  return <h1>404 - Page Not Found</h1>',
      '}'
    ]), 'Automatically served for any unmatched routes.')
  ],
  [
    m('Which file in the Pages Router represents the root route?', ['root.js', 'index.js', 'home.js', 'main.js'], 1, 'index.js at the root of pages/ maps to the homepage (/).'),
    m('What is the purpose of getStaticProps?', ['Fetch data on every request', 'Fetch data at build time', 'Fetch data client-side', 'Fetch data from cache only'], 1, 'getStaticProps fetches data at build time for static generation.'),
    m('How do you define a catch-all route in the Pages Router?', ['[slug].js', '[...slug].js', '[...].js', 'slug.js'], 1, 'Catch-all routes use the [...slug].js naming convention.'),
    m('What is the fallback property in getStaticPaths used for?', ['Handle form submissions', 'Control rendering of non-prebuilt paths', 'Set error pages', 'Configure middleware'], 1, 'fallback controls whether and how non-prebuilt dynamic paths are handled.'),
    m('Where are API routes defined in the Pages Router?', ['pages/api/', 'api/', 'routes/api/', 'server/api/'], 0, 'API routes are defined in the pages/api/ directory.'),
    m('Which file customizes the HTML document structure?', ['_app.js', '_document.js', 'layout.js', 'template.js'], 1, '_document.js customizes the HTML document structure and is only rendered server-side.')
  ]
);

/* =================== TOPIC 3: SSR =================== */
addTopic('nextjs-ssr', 'Server-Side Rendering', 'intermediate', 25,
  [
    'Server-Side Rendering (SSR) generates the full HTML for a page on the server for each request, sending a fully-rendered page to the client.',
    'In Next.js, SSR is achieved via getServerSideProps in the Pages Router or by using dynamic = "force-dynamic" in the App Router.',
    'SSR improves SEO by providing fully-rendered HTML to search engine crawlers and reduces time-to-first-contentful-paint.',
    'Trade-offs include higher server load, longer response times under high traffic, and no ability to cache the full HTML across users without additional configuration.'
  ],
  'SSR is like a restaurant that cooks your meal fresh every time you order. The kitchen (server) prepares the entire dish (HTML page) from scratch when you place your order (request), ensuring it is always hot and customized.',
  [
    d('How SSR Works', 'When a request hits a Next.js server for an SSR page, the server executes getServerSideProps (Pages Router) or the async Server Component (App Router) on each request. Data is fetched, React renders the page to HTML on the server, and the fully-rendered HTML is sent to the client. The client then hydrates the HTML to make it interactive.'),
    d('SSR in the Pages Router vs App Router', 'In the Pages Router, SSR is explicit via getServerSideProps which runs on every request. In the App Router, SSR is implicit: Server Components render on the server by default, and you opt into static rendering. To force SSR, you use dynamic = "force-dynamic" export, or use cookies(), headers(), or searchParams() which opt the segment into dynamic rendering.'),
    d('Performance Considerations', 'SSR pages have higher server response times because HTML is generated per request. Use streaming (App Router) to send HTML progressively. Implement CDN caching with s-maxage and stale-while-revalidate headers for non-personalized content. Monitor server CPU load as complex pages increase rendering time.'),
    d('SEO Benefits of SSR', 'Search engine crawlers receive fully-rendered HTML, ensuring all content is indexed. SSR eliminates the need for Googlebot to execute JavaScript, which can be unreliable. Dynamic meta tags, Open Graph data, and structured data are all present in the initial HTML response, improving social sharing and search result snippets.'),
    d('Hydration and Interactivity', 'After SSR HTML is delivered, React hydrates the page on the client, attaching event handlers and making the page interactive. Hydration must match the server-rendered HTML exactly; mismatches cause errors. The App Router improves on this with selective hydration and progressive enhancement.')
  ],
  'SSR remains essential for applications requiring SEO with dynamic content, real-time data, or personalized content. Next.js makes SSR straightforward while offering performance optimizations like streaming and selective hydration. The choice between SSR, SSG, and ISR depends on data freshness requirements and traffic patterns.',
  [
    q('What is Server-Side Rendering in Next.js?', 'SSR generates the complete HTML for a page on the server for each incoming request. The server fetches data, executes React components, and produces full HTML that is sent to the client. The client then hydrates the HTML to make it interactive. SSR provides SEO benefits and faster initial content display.'),
    q('How do you implement SSR in the Pages Router?', 'Export an async getServerSideProps function from the page component. This function runs on every request, receives the context object (params, req, res, query, etc.), and returns props that are passed to the page component at render time.'),
    q('How do you implement SSR in the App Router?', 'In the App Router, Server Components render on the server by default. To ensure dynamic rendering (SSR-like behavior) on every request, export const dynamic = "force-dynamic" from the segment, or use cookies(), headers(), or searchParams() which automatically opt into dynamic rendering. No explicit data fetching function is needed.'),
    q('What are the performance implications of SSR?', 'SSR increases server response time because HTML is generated per request. This increases server CPU usage. Benefits include faster time-to-content for users and better SEO. Mitigations include HTTP caching headers (s-maxage), CDN caching, React streaming (App Router), and selective data fetching to minimize blocking.'),
    q('How does SSR affect SEO?', 'SSR benefits SEO because search engine crawlers receive fully-rendered HTML with all content present. This ensures content is indexed even if crawlers do not execute JavaScript. Meta tags, Open Graph data, and structured data are all included in the initial server response.'),
    q('What is hydration in the context of SSR?', 'Hydration is the process where React attaches event listeners and state to the server-rendered HTML on the client. It makes the static HTML interactive. React expects the client-side render tree to match the server-rendered HTML exactly; differences cause hydration errors.'),
    q('How does caching work with SSR pages?', 'SSR pages can be cached using HTTP response headers. Set Cache-Control: s-maxage=60, stale-while-revalidate=300 for CDN caching. Avoid caching personalized content. Next.js does not cache SSR pages by default; caching must be configured in the hosting platform or via custom server.'),
    q('What is the difference between SSR and SSG?', 'SSR generates HTML on every request (dynamic). SSG generates HTML once at build time (static). SSR is better for frequently changing data. SSG is better for content that does not change often and benefits from fast load times. ISR bridges the gap by allowing periodic revalidation of static pages.'),
    q('Can you use SSR with getStaticProps?', 'No, getStaticProps is for SSG/ISR. A page can export either getServerSideProps (SSR) or getStaticProps (SSG/ISR), not both. Trying to export both will cause a build error.'),
    q('What happens if getServerSideProps throws an error?', 'If getServerSideProps throws an error, Next.js shows a 500 error page in production. In development, it shows the error overlay. Use try-catch blocks in getServerSideProps to handle errors gracefully and return a notFound or redirect object instead of crashing.')
  ],
  R(10,40,120,40,'#0070f3','','Client Request','Browser') +
  A(130,60,150,60) +
  R(160,40,120,40,'#28a745','','getServerSideProps','Fetch Data') +
  A(280,60,300,60) +
  R(310,40,120,40,'#ffc107','','Render to HTML','Server') +
  A(430,60,450,60) +
  R(10,110,120,40,'#17a2b8','','HTML Response','to Client') +
  A(130,130,160,130) +
  R(170,110,120,40,'#6610f2','','Hydration','JS Bundle') +
  T(250,180,'SSR: Full HTML generated server-side per request, then hydrated client-side.',9,'#666','middle'),
  [
    e('SSR with getServerSideProps', 'When you need fresh data on every request.', codeBlock([
      'export async function getServerSideProps(context) {',
      '  const { params, req, query } = context;',
      '  const data = await fetch(`https://api.example.com/data`).then(r => r.json());',
      '  return { props: { data } };',
      '}',
      '',
      'export default function Page({ data }) {',
      '  return <div>{data.title}</div>',
      '}'
    ]), 'Fetches fresh data on every request and passes it as props to the page. The context object provides access to params, query, req, res, and preview data.'),
    e('SSR in App Router', 'When you need dynamic rendering in the App Router.', codeBlock([
      '// app/page.js',
      'export const dynamic = "force-dynamic";',
      '',
      'export default async function Page() {',
      '  const data = await fetch("https://api.example.com/data");',
      '  const json = await data.json();',
      '  return <div>{json.title}</div>',
      '}'
    ]), 'The dynamic export forces server-side rendering on every request. The async component fetches data directly.'),
    e('SSR with Streaming', 'When you want to improve perceived performance by streaming HTML.', codeBlock([
      '// app/page.js',
      'import { Suspense } from "react";',
      '',
      'async function SlowComponent() {',
      '  const data = await fetch("https://api.example.com/slow");',
      '  return <div>{data}</div>',
      '}',
      '',
      'export default function Page() {',
      '  return (',
      '    <div>',
      '      <h1>Fast header</h1>',
      '      <Suspense fallback={<div>Loading...</div>}>',
      '        <SlowComponent />',
      '      </Suspense>',
      '    </div>',
      '  );',
      '}'
    ]), 'The header renders immediately while the slow component streams in later, improving perceived performance.'),
    e('SSR with Custom Cache Headers', 'When you want to balance freshness with performance via CDN caching.', codeBlock([
      'export async function getServerSideProps({ res }) {',
      '  res.setHeader(',
      '    "Cache-Control",',
      '    "public, s-maxage=60, stale-while-revalidate=300"',
      '  );',
      '  const data = await fetch("https://api.example.com/data");',
      '  const json = await data.json();',
      '  return { props: { data: json } };',
      '}'
    ]), 'Sets HTTP cache headers for CDN caching: 60 seconds fresh, 300 seconds stale-while-revalidate.'),
    e('SSR with Redirect', 'When you need to redirect based on authentication or conditions.', codeBlock([
      'export async function getServerSideProps(context) {',
      '  const token = context.req.cookies.token;',
      '  if (!token) {',
      '    return { redirect: { destination: "/login", permanent: false } };',
      '  }',
      '  const data = await fetch("https://api.example.com/data", {',
      '    headers: { Authorization: `Bearer ${token}` }',
      '  }).then(r => r.json());',
      '  return { props: { data } };',
      '}'
    ]), 'Redirects unauthenticated users to /login before fetching data.')
  ],
  [
    m('Which function implements SSR in the Pages Router?', ['getStaticProps', 'getServerSideProps', 'getInitialProps', 'getStaticPaths'], 1, 'getServerSideProps runs on every request to enable SSR.'),
    m('How do you force dynamic rendering in the App Router?', ['export const dynamic = "static"', 'export const dynamic = "force-dynamic"', 'export const ssr = true', 'export const render = "server"'], 1, 'export const dynamic = "force-dynamic" ensures the page renders on every request.'),
    m('What is the main SEO benefit of SSR?', ['Smaller bundle size', 'Fully-rendered HTML for crawlers', 'Faster client navigation', 'Lower server costs'], 1, 'Search engine crawlers receive complete HTML with all content for proper indexing.'),
    m('What does hydration mean in SSR?', ['Running code on server', 'Attaching event listeners to server HTML', 'Compressing HTML', 'Optimizing images'], 1, 'Hydration makes server-rendered static HTML interactive by attaching React event handlers.'),
    m('What happens if a page exports both getStaticProps and getServerSideProps?', ['Both run', 'getServerSideProps takes priority', 'getStaticProps takes priority', 'Build error'], 3, 'A page cannot export both; it causes a build error.'),
    m('How can you cache SSR pages at the CDN level?', ['Using Cache-Control headers', 'Using localStorage', 'Using cookies', 'Using Redux'], 0, 'Set Cache-Control headers like s-maxage and stale-while-revalidate for CDN caching.')
  ]
);

/* =================== TOPIC 4: CSR =================== */
addTopic('nextjs-csr', 'Client-Side Rendering', 'beginner', 20,
  [
    'Client-Side Rendering (CSR) renders the page entirely in the browser using JavaScript, with Next.js serving a minimal HTML shell and React handling all rendering.',
    'In Next.js, CSR is achieved using "use client" components, useEffect for data fetching, or data fetching libraries like SWR and TanStack Query.',
    'CSR provides a rich, app-like experience after the initial load, with instant navigations and full interactivity.',
    'Downsides include slower initial load times, poorer SEO (empty HTML shell), and reliance on client JavaScript execution.'
  ],
  'CSR is like ordering a flat-pack furniture kit: you get a minimal box (HTML shell) and assembly instructions (JavaScript), and you build everything on-site (in the browser) using your own tools.',
  [
    d('How CSR Works in Next.js', 'The server sends a minimal HTML document with a <div id="root"> and script tags. The browser downloads and executes the JavaScript bundle. React renders the UI in the browser, fetching data as needed. After the initial load, navigations are instant because no server round-trip is needed.'),
    d('CSR vs SSR Trade-offs', 'CSR has slower initial load (JavaScript must download and execute) but faster subsequent navigations. SSR has faster initial HTML delivery but requires server round-trips for every navigation. CSR is better for authenticated dashboards and apps where SEO is not critical.'),
    d('Data Fetching in CSR', 'CSR components use React hooks like useEffect, useSWR, or TanStack Query to fetch data client-side. Loading states, error handling, and optimistic updates are managed in the browser. Data can be cached client-side using SWR or React Query for improved performance.'),
    d('SEO Implications of CSR', 'CSR pages serve an empty HTML shell to search engines, which may not index content properly. Use Next.js metadata API for basic SEO tags, but content-heavy pages benefit from SSR or SSG. Hybrid approaches use SSR for initial load and CSR for subsequent client-side navigation.'),
    d('Performance Optimization for CSR', 'Minimize bundle size with code splitting, lazy loading, and dynamic imports. Use React.memo and useMemo to prevent unnecessary re-renders. Implement virtual scrolling for long lists. Use service workers for offline support and caching.')
  ],
  'CSR is a valid choice for authenticated applications, dashboards, and tools where SEO is not a priority. Next.js supports CSR through "use client" components and client-side data fetching. The key is choosing the right rendering strategy for each page based on content type and user needs.',
  [
    q('What is Client-Side Rendering in Next.js?', 'CSR renders the page entirely in the browser. The server sends a minimal HTML shell with JavaScript bundles. React takes over in the browser, rendering components, fetching data, and managing UI state. The initial load is slower, but subsequent navigations are instant.'),
    q('How do you create a Client Component in Next.js?', 'Add "use client" at the top of the component file. This marks the component and its children as client-side rendered. Client Components can use React hooks, browser APIs, event handlers, and state management. They can be imported by Server Components.'),
    q('How does data fetching work in CSR?', 'Data is fetched client-side using useEffect with fetch, or libraries like SWR and TanStack Query. These hooks manage loading states, caching, revalidation, and error handling. Data is fetched after the component mounts in the browser.'),
    q('What are the advantages of CSR?', 'Fast subsequent navigations with no server round-trips, rich interactivity with client-side state management, reduced server load, ability to use browser APIs, and simpler deployment as static files.'),
    q('What are the disadvantages of CSR?', 'Slow initial load (JavaScript download + parse + execute), poor SEO (empty HTML shell), reliance on client device performance, potential for flash of unstyled content, and JavaScript required for basic content visibility.'),
    q('How does CSR affect SEO in Next.js?', 'CSR pages have minimal HTML content, so search engines may not index the actual page content. Next.js provides metadata API for basic tags, but for content-heavy pages, SSR, SSG, or ISR are preferred. Use dynamic rendering to serve SSR to bots and CSR to users.'),
    q('Can you mix CSR with SSR in Next.js?', 'Yes, Next.js supports mixed rendering. A page can have a Server Component shell that handles SEO-critical content and metadata, with Client Components embedded for interactive sections. This hybrid approach is the recommended pattern in the App Router.'),
    q('What is the role of "use client" directive?', 'The "use client" directive marks the boundary between server and client code. Components marked with "use client" are rendered on the client and can use hooks, event handlers, and browser APIs. All components imported into a Client Component also become client-rendered.'),
    q('How do you optimize CSR performance in Next.js?', 'Use dynamic imports with next/dynamic for code splitting, lazy load below-the-fold components, use SWR/React Query for caching, implement virtual scrolling for lists, use React.memo for expensive renders, and minimize bundle size with tree shaking.'),
    q('When should you choose CSR over SSR?', 'Choose CSR for authenticated dashboards, admin panels, tools with complex interactivity, real-time applications, and internal tools where SEO is not needed. Choose SSR/SSG for public content, e-commerce product pages, blogs, and any page that needs search engine visibility.')
  ],
  R(10,40,140,40,'#0070f3','','Server sends HTML shell','Minimal') +
  A(150,60,170,60) +
  R(180,40,140,40,'#28a745','','Browser loads JS','Bundle') +
  A(320,60,340,60) +
  R(350,40,120,40,'#ffc107','','React hydrates &','renders UI') +
  A(350,80,350,100) +
  R(230,110,120,40,'#17a2b8','','useEffect / SWR','Fetch Data') +
  R(10,110,140,40,'#6610f2','','User sees content','Interactive') +
  T(250,180,'CSR: Minimal HTML served, JavaScript renders content in the browser.',9,'#666','middle'),
  [
    e('Basic Client Component', 'When you need a component with user interaction.', codeBlock([
      '"use client";',
      'import { useState } from "react";',
      '',
      'export default function Counter() {',
      '  const [count, setCount] = useState(0);',
      '  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>',
      '}'
    ]), 'The "use client" directive enables hooks and event handlers. This component runs entirely in the browser.'),
    e('Client-Side Data Fetching', 'When you need to fetch data after page load.', codeBlock([
      '"use client";',
      'import { useState, useEffect } from "react";',
      '',
      'export default function UserProfile({ userId }) {',
      '  const [user, setUser] = useState(null);',
      '  useEffect(() => {',
      '    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser);',
      '  }, [userId]);',
      '  if (!user) return <div>Loading...</div>;',
      '  return <div>{user.name}</div>;',
      '}'
    ]), 'Fetches user data client-side when the component mounts or userId changes.'),
    e('Using SWR for CSR', 'When you want automatic caching and revalidation.', codeBlock([
      '"use client";',
      'import useSWR from "swr";',
      '',
      'const fetcher = (url) => fetch(url).then(r => r.json());',
      '',
      'export default function Dashboard() {',
      '  const { data, error, isLoading } = useSWR("/api/dashboard", fetcher);',
      '  if (isLoading) return <div>Loading...</div>;',
      '  if (error) return <div>Error loading data</div>;',
      '  return <div>{data.stats}</div>;',
      '}'
    ]), 'SWR handles caching, revalidation, and error states automatically.'),
    e('Dynamic Import for Code Splitting', 'When you want to lazy-load heavy components.', codeBlock([
      'import dynamic from "next/dynamic";',
      '',
      'const HeavyChart = dynamic(() => import("../components/Chart"), {',
      '  ssr: false,',
      '  loading: () => <div>Loading chart...</div>',
      '});',
      '',
      'export default function Page() {',
      '  return <HeavyChart />;',
      '}'
    ]), 'The chart component is loaded only when needed, reducing initial bundle size.'),
    e('Hybrid Server + Client Component', 'When you need SEO content with interactive sections.', codeBlock([
      '// Server Component (default)',
      'export default function ProductPage({ product }) {',
      '  return (',
      '    <div>',
      '      <h1>{product.name}</h1>',
      '      <p>{product.description}</p>',
      '      <AddToCartButton productId={product.id} />',
      '    </div>',
      '  );',
      '}',
      '',
      '// Client Component for interactivity',
      '"use client";',
      'export function AddToCartButton({ productId }) {',
      '  const addToCart = () => fetch("/api/cart", { method: "POST", body: JSON.stringify({ productId }) });',
      '  return <button onClick={addToCart}>Add to Cart</button>',
      '}'
    ]), 'SEO content is server-rendered, while the interactive button is a Client Component.')
  ],
  [
    m('What directive marks a component as client-side only?', ['"use server"', '"use client"', '"use browser"', '"use csr"'], 1, '"use client" marks the component boundary for client-side rendering with full browser API access.'),
    m('What is the main disadvantage of CSR?', ['Fast subsequent navigations', 'Poor SEO', 'Reduced server load', 'Rich interactivity'], 1, 'CSR pages serve minimal HTML, making content indexing by search engines difficult.'),
    m('Which library is commonly used for client-side data fetching with caching?', ['Redux', 'SWR', 'Zustand', 'MobX'], 1, 'SWR provides automatic caching, revalidation, and error handling for client-side data fetching.'),
    m('How do you lazy-load a component in Next.js?', ['React.lazy', 'next/dynamic', 'import()', 'loadable()'], 1, 'next/dynamic is the Next.js-specific way to lazy-load components with SSR control.'),
    m('What is the recommended rendering strategy for a public blog?', ['CSR', 'SSR or SSG', 'Only CSR', 'No rendering needed'], 1, 'Public blogs need SEO, so SSR or SSG is recommended over CSR.'),
    m('Can Client Components be imported into Server Components?', ['No, never', 'Yes, always', 'Yes, but they remain client-rendered at the boundary', 'Only with "use server"'], 2, 'Client Components can be imported by Server Components, but the boundary remains at the "use client" file.')
  ]
);

/* =================== TOPIC 5: SSG =================== */
addTopic('nextjs-ssg', 'Static Site Generation', 'intermediate', 25,
  [
    'Static Site Generation (SSG) pre-renders pages at build time, producing static HTML files that can be served instantly from a CDN.',
    'In the Pages Router, SSG is achieved via getStaticProps. In the App Router, Static Generation is the default behavior when no dynamic functions are used.',
    'SSG provides the fastest possible load times since HTML is pre-built and does not require server processing at request time.',
    'Best for content that does not change frequently: blogs, documentation, marketing pages, and e-commerce product pages with stable data.'
  ],
  'SSG is like printing a book: you write all the content, print it (build), and then anyone can read it instantly without waiting for pages to be written on the spot.',
  [
    d('How SSG Works in Next.js', 'At build time (next build), Next.js executes getStaticProps (Pages Router) or runs Server Components (App Router) for each page, generates the HTML, and saves it as static .html files. These files are served directly from a CDN or web server without any server-side processing.'),
    d('SSG in the Pages Router', 'Export getStaticProps from a page to opt into SSG. The function runs at build time, fetches data, and returns props. For dynamic routes, getStaticPaths specifies which paths to pre-render. The fallback option controls behavior for paths not specified at build time.'),
    d('SSG in the App Router', 'In the App Router, all pages are statically rendered by default unless they use dynamic functions (cookies(), headers(), searchParams()) or export const dynamic = "force-dynamic". Static pages are rendered at build time and cached. Data fetching with fetch() is automatically cached.'),
    d('Incremental Static Regeneration (ISR)', 'ISR extends SSG by allowing pages to be re-rendered after build time without rebuilding the entire site. Set revalidate in getStaticProps or use next.revalidate in fetch() options. Pages are served from cache while being regenerated in the background.'),
    d('SSG Performance and Caching', 'SSG pages can be aggressively cached at CDN edge nodes because they are identical for all users. This results in near-instant page loads regardless of geographic location. SSG significantly reduces server load and hosting costs compared to SSR.')
  ],
  'SSG is the foundation of high-performance websites. It eliminates server processing at request time, enables global CDN distribution, and provides the best possible user experience. Combined with ISR, SSG can handle dynamic content while maintaining static-level performance.',
  [
    q('What is Static Site Generation in Next.js?', 'SSG pre-renders pages into static HTML at build time. These HTML files are served directly to users without server-side processing on each request. This results in the fastest possible page loads and excellent SEO.'),
    q('How do you implement SSG in the Pages Router?', 'Export an async getStaticProps function from the page. This function runs at build time, fetches data, and returns props. For dynamic routes, also export getStaticPaths to specify which paths to pre-render.'),
    q('How does SSG work in the App Router?', 'In the App Router, static generation is the default. Pages are pre-rendered at build time unless they use dynamic functions like cookies(), headers(), or searchParams(). Data fetching with fetch() is automatically cached and deduplicated.'),
    q('What is the build-time execution context for getStaticProps?', 'getStaticProps runs during next build on the server. It has access to the params for dynamic routes, preview mode, and the full Node.js API. It cannot access request-time data like cookies (unless using preview mode) or query parameters.'),
    q('What is the fallback option in getStaticPaths?', 'fallback determines behavior for paths not generated at build time. false: show 404. true: generate on first request and cache. "blocking": generate on first request without a loading state (SSR-like).'),
    q('How does SSG benefit SEO?', 'SSG produces complete HTML at build time, so search engine crawlers receive fully-rendered pages with all content. Static HTML loads instantly, improving Core Web Vitals scores. Pages can be indexed immediately without JavaScript execution.'),
    q('What are the limitations of SSG?', 'Build time increases with the number of pages. Dynamic or user-specific content cannot use SSG. Content updates require a rebuild (or ISR). Large sites may need incremental builds. Not suitable for authenticated pages or real-time data.'),
    q('How does SSG handle environment variables?', 'Environment variables used in getStaticProps are resolved at build time. Public environment variables (NEXT_PUBLIC_) are inlined into the JavaScript bundle. Server-only environment variables are only available during build and are not exposed to the client.'),
    q('Can you use SSG with API routes?', 'Yes, API routes are separate from SSG. API routes run server-side on each request. SSG generates static HTML pages. A page can use SSG while its data source is an API route that runs dynamically.'),
    q('How do you debug SSG build issues?', 'Check the build output for errors. Use console.log in getStaticProps during build. Verify that data sources are accessible at build time. For ISR revalidation issues, check the revalidate interval and ensure CDN respects cache headers.')
  ],
  R(10,40,120,40,'#0070f3','','next build','Build Time') +
  A(130,60,160,60) +
  R(170,40,120,40,'#28a745','','getStaticProps','Fetch Data') +
  A(290,60,320,60) +
  R(330,40,120,40,'#ffc107','','Generate HTML','Static Files') +
  A(330,80,330,100) +
  R(230,110,140,40,'#17a2b8','','CDN Cache','Served Globally') +
  A(150,130,230,130, '#999') +
  R(10,110,130,40,'#6610f2','','User Request','Instant Load') +
  T(250,180,'SSG: Pages pre-built at build time, served statically from CDN for instant loads.',9,'#666','middle'),
  [
    e('SSG with getStaticProps', 'When building a marketing site with content from a CMS.', codeBlock([
      'export async function getStaticProps() {',
      '  const data = await fetch("https://cms.example.com/pages/home").then(r => r.json());',
      '  return { props: { content: data } };',
      '}',
      '',
      'export default function Home({ content }) {',
      '  return <div><h1>{content.title}</h1><div>{content.body}</div></div>',
      '}'
    ]), 'Fetches CMS data at build time and generates a static HTML page.'),
    e('SSG with Dynamic Routes', 'When building a blog with many posts.', codeBlock([
      'export async function getStaticPaths() {',
      '  const posts = await fetch("https://api.example.com/posts").then(r => r.json());',
      '  return { paths: posts.map(p => ({ params: { slug: p.slug } })), fallback: "blocking" };',
      '}',
      '',
      'export async function getStaticProps({ params }) {',
      '  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(r => r.json());',
      '  return { props: { post } };',
      '}'
    ]), 'Pre-renders all blog posts at build time with fallback: "blocking" for new posts.'),
    e('SSG in App Router (Default)', 'When building static pages in the App Router.', codeBlock([
      '// app/page.js \u2014 This is statically rendered by default',
      'export default async function Home() {',
      '  const data = await fetch("https://api.example.com/content");',
      '  const json = await data.json();',
      '  return <div>{json.title}</div>',
      '}'
    ]), 'No special exports needed. App Router defaults to static rendering with cached fetch().'),
    e('SSG with Revalidation (ISR)', 'When you need static performance with periodic updates.', codeBlock([
      'export async function getStaticProps() {',
      '  const data = await fetch("https://api.example.com/products");',
      '  const products = await data.json();',
      '  return { props: { products }, revalidate: 3600 };',
      '}'
    ]), 'Regenerates the page at most once every 3600 seconds (1 hour) while serving cached pages.'),
    e('SSG with Preview Mode', 'When editors need to preview draft content before publishing.', codeBlock([
      'export async function getStaticProps({ preview, previewData }) {',
      '  const data = await fetch(`https://cms.example.com/pages/home${preview ? "?draft=true" : ""}`);',
      '  return { props: { content: await data.json(), isPreview: !!preview } };',
      '}'
    ]), 'Preview mode enables draft content viewing at build time by passing a preview flag to the data source.')
  ],
  [
    m('When does getStaticProps execute?', ['On every request', 'At build time', 'On the client', 'On every navigation'], 1, 'getStaticProps runs during next build to pre-render pages.'),
    m('What is the default rendering behavior in the App Router?', ['Dynamic (SSR)', 'Static (SSG)', 'Client-side (CSR)', 'No rendering'], 1, 'App Router defaults to static generation unless dynamic functions are used.'),
    m('What does fallback: true do in getStaticPaths?', ['Shows 404 for unknown paths', 'Generates unknown paths on first request', 'Prevents all path generation', 'Requires all paths at build time'], 1, 'fallback: true generates pages on first request and caches them for subsequent requests.'),
    m('Which option extends SSG by allowing periodic page regeneration?', ['revalidate', 'refresh', 'regenerate', 'update'], 0, 'The revalidate option in getStaticProps enables ISR for periodic page regeneration.'),
    m('What is a limitation of SSG?', ['Fast page loads', 'Excellent SEO', 'Build time grows with page count', 'Reduced server load'], 2, 'Build time increases as more pages are added, which can be a limitation for large sites.'),
    m('Can SSG pages use data from cookies?', ['Yes, always', 'Only with getServerSideProps', 'Only with preview mode', 'Yes, via client-side JS'], 1, 'SSG pages cannot access cookies or request-time data because they are pre-built. Use getServerSideProps for this.')
  ]
);

/* =================== TOPIC 6: ISR =================== */
addTopic('nextjs-isr', 'Incremental Static Regeneration', 'advanced', 30,
  [
    'ISR allows static pages to be updated after build time without rebuilding the entire site, combining the performance of SSG with the freshness of SSR.',
    'Implement ISR by setting the revalidate property in getStaticProps (Pages Router) or using next.revalidate in fetch() options (App Router).',
    'ISR serves cached pages while regenerating updated HTML in the background, ensuring zero downtime during updates.',
    'On-Demand ISR (revalidatePath / revalidateTag) provides instant invalidation triggered by CMS webhooks or admin actions.'
  ],
  'ISR is like a library that keeps popular books ready on the shelf (cached) while occasionally checking if new editions exist and swapping them in without closing the library.',
  [
    d('How ISR Works', 'When a page is first built, HTML is generated and cached. On subsequent requests within the revalidate window, the cached page is served instantly. When the revalidate window expires, the cached page is still served, but Next.js triggers a background regeneration. Once the new HTML is ready, it replaces the cached version atomically.'),
    d('ISR in the Pages Router', 'Set revalidate in the return object of getStaticProps. The value is the maximum number of seconds between regenerations. For example, revalidate: 60 means the page regenerates at most once per 60 seconds. Dynamic routes also need getStaticPaths with the appropriate fallback strategy.'),
    d('ISR in the App Router', 'Use the next.revalidate option in fetch() to set the cache duration for a specific data fetch. Alternatively, use the cache() function with next: { revalidate } options. On-Demand ISR is achieved via revalidatePath() and revalidateTag() imported from next/cache.'),
    d('On-Demand ISR', 'On-Demand ISR uses revalidatePath("/path") to invalidate a specific route or revalidateTag("tag") to invalidate all routes using a specific fetch tag. These are typically called from API routes triggered by CMS webhooks. This eliminates the need to wait for time-based revalidation.'),
    d('ISR Performance and Caching Strategies', 'ISR strikes a balance between build-time generation and dynamic rendering. Use short revalidate times (10-60s) for news sites, longer times (3600+) for marketing pages, and On-Demand ISR for CMS-driven content. ISR works well with CDN caching and stale-while-revalidate headers.')
  ],
  'ISR represents a paradigm shift in web rendering, offering the best of both SSG and SSR. For content-driven sites, ISR with On-Demand invalidation provides static-level performance with dynamic-level freshness. The key is choosing the right revalidation strategy based on content update frequency.',
  [
    q('What is Incremental Static Regeneration?', 'ISR enables static pages to be updated after deployment without rebuilding the entire site. Pages are served from cache while fresh HTML is generated in the background. When regeneration completes, the new version replaces the cached one atomically, ensuring zero downtime.'),
    q('How do you implement ISR in the Pages Router?', 'Add a revalidate property to the object returned by getStaticProps. The value is the number of seconds between potential regenerations. For example, return { props: { data }, revalidate: 60 } regenerates at most once per minute.'),
    q('How do you implement ISR in the App Router?', 'In the App Router, use the next.revalidate option in fetch(): fetch(url, { next: { revalidate: 60 } }). For On-Demand ISR, use revalidatePath() to invalidate a path or revalidateTag() to invalidate by tag, imported from next/cache.'),
    q('What is On-Demand ISR?', 'On-Demand ISR allows instant invalidation of cached pages without waiting for time-based revalidation. It uses revalidatePath("/path") or revalidateTag("tag") functions, typically called from API routes triggered by CMS webhooks, admin actions, or content updates.'),
    q('What happens during the revalidation window?', 'During the revalidation window, cached HTML is served immediately. After the window expires, the first request triggers a background regeneration while still serving the stale cached page. The new HTML replaces the cached version once regeneration completes.'),
    q('How does ISR handle high traffic?', 'ISR handles high traffic well because most requests are served from cache. During regeneration, only one process (per page) performs the regeneration while all other requests receive the cached version. This prevents thundering herd problems.'),
    q('What are the downsides of ISR?', 'Pages can serve stale content within the revalidation window. Build complexity increases compared to pure SSG. Not suitable for real-time data or highly personalized content. The first request after revalidation expiry may be slow (generation in background).'),
    q('How do you debug ISR issues?', 'Check the server logs for regeneration errors. Verify that data sources are accessible during regeneration. Monitor the revalidate time and ensure it matches expectations. Use the Next.js build output to confirm which pages are using ISR. Add console.log in getStaticProps during regeneration.'),
    q('Can ISR work with dynamic routes?', 'Yes, ISR works with dynamic routes. Use getStaticPaths with fallback: true or "blocking" combined with revalidate in getStaticProps. The fallback strategy determines how non-prebuilt paths are handled on first request.'),
    q('What is the difference between revalidate and On-Demand ISR?', 'Time-based revalidate regenerates at fixed intervals (e.g., every 60 seconds). On-Demand ISR regenerates instantly when triggered (e.g., via CMS webhook). On-Demand ISR is more efficient for content that updates unpredictably, while time-based is simpler for predictable schedules.')
  ],
  R(10,40,100,35,'#0070f3','','Build: SSG','Static HTML') +
  A(110,58,130,58) +
  R(140,40,100,35,'#28a745','','revalidate:60','Cache Window') +
  A(240,58,260,58) +
  R(270,40,100,35,'#ffc107','','Expired','Stale Served') +
  A(270,75,270,95) +
  R(230,105,100,35,'#17a2b8','','Background','Regenerate') +
  A(330,58,350,58) +
  R(360,40,100,35,'#6610f2','','Fresh HTML','Replaces Cache') +
  T(250,170,'ISR: Serve cached static pages, regenerate in background when stale.',9,'#666','middle'),
  [
    e('ISR with Time-Based Revalidation', 'When a blog post page should refresh content hourly.', codeBlock([
      'export async function getStaticProps() {',
      '  const data = await fetch("https://cms.example.com/posts/latest");',
      '  const posts = await data.json();',
      '  return { props: { posts }, revalidate: 3600 };',
      '}'
    ]), 'Regenerates the page at most once per hour while serving cached content between regenerations.'),
    e('ISR in App Router with fetch', 'When using ISR with the App Router\'s built-in fetch caching.', codeBlock([
      'export default async function Page() {',
      '  const data = await fetch("https://api.example.com/data", {',
      '    next: { revalidate: 60 }',
      '  });',
      '  const json = await data.json();',
      '  return <div>{json.title}</div>',
      '}'
    ]), 'The fetch call is cached for 60 seconds. After that, the next request triggers background revalidation.'),
    e('On-Demand ISR with revalidatePath', 'When a CMS webhook needs to instantly update the homepage.', codeBlock([
      '// app/api/revalidate/route.js',
      'import { revalidatePath } from "next/cache";',
      '',
      'export async function POST(request) {',
      '  const body = await request.json();',
      '  if (body.secret !== process.env.REVALIDATION_SECRET) {',
      '    return Response.json({ message: "Invalid secret" }, { status: 401 });',
      '  }',
      '  revalidatePath("/");',
      '  return Response.json({ revalidated: true });',
      '}'
    ]), 'Calling this API route instantly invalidates the homepage cache, triggering a fresh regeneration.'),
    e('On-Demand ISR with revalidateTag', 'When multiple pages share the same data and need collective invalidation.', codeBlock([
      '// Data fetching with tag',
      'export default async function Page() {',
      '  const data = await fetch("https://api.example.com/posts", {',
      '    next: { tags: ["posts"] }',
      '  });',
      '  const posts = await data.json();',
      '  return <div>{posts.length} posts</div>',
      '}',
      '',
      '// Webhook handler to invalidate all tagged pages',
      'import { revalidateTag } from "next/cache";',
      'export async function POST(request) {',
      '  revalidateTag("posts");',
      '  return Response.json({ revalidated: true });',
      '}'
    ]), 'Invalidates all pages that fetch data tagged with "posts" in one call.'),
    e('ISR with Dynamic Routes and Fallback', 'When a dynamic blog has thousands of posts, not all built upfront.', codeBlock([
      'export async function getStaticPaths() {',
      '  const posts = await fetch("https://cms.example.com/posts?limit=100");',
      '  const data = await posts.json();',
      '  return { paths: data.map(p => ({ params: { slug: p.slug } })), fallback: "blocking" };',
      '}',
      '',
      'export async function getStaticProps({ params }) {',
      '  const post = await fetch(`https://cms.example.com/posts/${params.slug}`);',
      '  const data = await post.json();',
      '  return { props: { post: data }, revalidate: 3600 };',
      '}'
    ]), 'Pre-builds top 100 posts, generates others on first request (blocking), and revalidates hourly.')
  ],
  [
    m('What property enables ISR in getStaticProps?', ['refresh', 'revalidate', 'regenerate', 'update'], 1, 'The revalidate property (in seconds) enables ISR by setting the cache invalidation interval.'),
    m('How does ISR serve content during revalidation?', ['Returns 503 error', 'Serves stale cached page', 'Blocks the request', 'Returns empty page'], 1, 'ISR serves the stale cached page while regenerating fresh content in the background.'),
    m('Which functions enable On-Demand ISR in the App Router?', ['refreshPath and refreshTag', 'revalidatePath and revalidateTag', 'invalidatePath and invalidateTag', 'clearCachePath and clearCacheTag'], 1, 'On-Demand ISR uses revalidatePath() and revalidateTag() from next/cache.'),
    m('What is the main advantage of On-Demand ISR over time-based ISR?', ['Simpler to implement', 'Lower server costs', 'Instant invalidation on content update', 'Better SEO'], 2, 'On-Demand ISR provides instant invalidation triggered by webhooks, eliminating wait times.'),
    m('What happens to traffic during ISR regeneration?', ['All requests block until regeneration', 'All requests get 503', 'Requests get stale cached page', 'Requests get empty page'], 2, 'All incoming requests during regeneration receive the stale cached page without blocking.'),
    m('Which fallback strategy works best with ISR for dynamic routes?', ['fallback: false', 'fallback: true or "blocking"', 'No fallback needed', 'fallback: "lazy"'], 1, 'fallback: true or "blocking" enables ISR to generate pages on first request for dynamic routes.')
  ]
);

/* =================== TOPIC 7: METADATA API =================== */
addTopic('nextjs-metadata-api', 'Metadata API', 'intermediate', 25,
  [
    'The Metadata API in Next.js allows defining HTML head metadata (title, description, Open Graph, Twitter cards, etc.) using exported objects or generateMetadata functions.',
    'Metadata can be defined statically via an exported metadata object or dynamically via an async generateMetadata function that receives route params and search params.',
    'Metadata is automatically deduplicated and merged following the hierarchy: parent layouts can define defaults with metadataBase and generateMetadata can override specific fields.',
    'Supports Open Graph, Twitter cards, robots.txt, alternate languages, icons/manifests, and other standard <head> meta tags.'
  ],
  'The Metadata API is like a dashboard where you fill in forms (title, description, social media preview) for each page, and Next.js automatically updates the browser tab name, search results, and social sharing cards.',
  [
    d('Static Metadata', 'Export a metadata object from any layout.js or page.js file. The object contains fields like title, description, openGraph, twitter, robots, alternates, and icons. Metadata defined in layout.js applies to all child pages and can be overridden by child metadata exports.'),
    d('Dynamic Metadata with generateMetadata', 'Export an async generateMetadata function that receives { params, searchParams } and returns a metadata object. This enables dynamic metadata based on route parameters, fetched data, or request-time conditions. The function runs on every request for dynamic pages.'),
    d('Metadata Field Types', 'Key fields include: title (string or template object with absolute and default), description, openGraph (url, title, description, images, siteName, locale), twitter (card, title, description, images), robots (index, follow), alternates (canonical, languages), icons, manifest, and other meta tags.'),
    d('Metadata Inheritance and Merging', 'Metadata is inherited from parent layouts. A layout defines default metadata that applies to all child routes. Child pages can override specific fields. The metadataBase field sets the base URL for resolving relative paths in metadata. The title field supports template patterns like "%s | Site Name".'),
    d('File-Based Metadata', 'Next.js also supports file-based metadata through convention: favicon.ico, opengraph-image.png, twitter-image.png, robots.txt, sitemap.xml, and manifest.json can be placed in the app directory and are automatically served. These complement the Metadata API object approach.')
  ],
  'The Metadata API simplifies SEO and social sharing configuration in Next.js applications. Its hierarchical merging system reduces duplication while allowing per-page customization. The generateMetadata function is particularly powerful for content-driven sites where metadata depends on fetched data.',
  [
    q('What is the Metadata API in Next.js?', 'The Metadata API allows defining HTML head metadata by exporting metadata objects or generateMetadata functions from layout.js and page.js files. It supports title, description, Open Graph, Twitter cards, robots directives, canonical URLs, and more.'),
    q('How do you define static metadata?', 'Export a metadata object from layout.js or page.js: export const metadata = { title: "Page Title", description: "Page description" }. This object can include nested openGraph, twitter, and other metadata groups.'),
    q('How do you define dynamic metadata?', 'Export an async generateMetadata function that receives { params, searchParams }: export async function generateMetadata({ params }) { const post = await fetchPost(params.slug); return { title: post.title, description: post.excerpt } }.'),
    q('What is the title template feature?', 'The title.template field in layout.js defines a template for child page titles. For example, { title: { template: "%s | My Site", default: "My Site" } } transforms child titles like "About" into "About | My Site".'),
    q('How does metadata inheritance work?', 'Metadata defined in a layout.js applies to all child routes. Child pages can override specific fields. If a child only defines title, the parent\'s description is inherited. This hierarchical merging reduces duplication while allowing per-page customization.'),
    q('What is metadataBase used for?', 'metadataBase sets the base URL for resolving relative paths in metadata fields. For example, metadataBase: new URL("https://example.com") makes og:image: "/og.png" resolve to "https://example.com/og.png". It should match your production domain.'),
    q('How do you add Open Graph metadata?', 'Include an openGraph field in the metadata object: { openGraph: { title: "OG Title", description: "OG Description", images: [{ url: "/og.png", width: 1200, height: 630 }] } }. Next.js generates the appropriate meta tags.'),
    q('What file-based metadata does Next.js support?', 'Convention-based files: favicon.ico (root), opengraph-image.png (per-route), twitter-image.png (per-route), robots.txt (root), sitemap.xml (root), manifest.json (root). These files are automatically served and can supplement the Metadata API.'),
    q('How does metadata work with client-side navigation?', 'When navigating between routes client-side, Next.js updates the document head using the new page\'s metadata. The title and meta tags are updated dynamically without a full page reload.'),
    q('Can you use generateMetadata with ISR or SSG pages?', 'Yes, generateMetadata runs during the build process for SSG pages and during revalidation for ISR pages. For dynamic metadata, it runs on the server during generation, not on the client.')
  ],
  R(10,40,140,35,'#0070f3','','layout.js metadata','Defaults') +
  A(150,58,170,58) +
  R(180,40,140,35,'#28a745','','page.js metadata','Overrides') +
  A(320,58,340,58) +
  R(350,40,120,35,'#ffc107','','Head Tags','Generated') +
  A(350,75,350,95) +
  R(260,105,120,35,'#17a2b8','','Open Graph','Social Cards') +
  R(10,105,120,35,'#6610f2','','generateMetadata','Dynamic') +
  T(250,170,'Metadata API: Hierarchical metadata with static and dynamic generation.',9,'#666','middle'),
  [
    e('Static Metadata Export', 'When a page has fixed SEO metadata.', codeBlock([
      'export const metadata = {',
      '  title: "About Us",',
      '  description: "Learn about our company mission and team.",',
      '  openGraph: {',
      '    title: "About Us | My Company",',
      '    images: ["/about-og.png"]',
      '  }',
      '};'
    ]), 'Defines static metadata that does not change between requests.'),
    e('Dynamic Metadata with generateMetadata', 'When metadata depends on fetched data.', codeBlock([
      'export async function generateMetadata({ params }) {',
      '  const product = await fetch(`https://api.example.com/products/${params.id}`).then(r => r.json());',
      '  return {',
      '    title: product.name,',
      '    description: product.description,',
      '    openGraph: { images: [product.image] }',
      '  };',
      '}'
    ]), 'Fetches product data and uses it to generate dynamic title, description, and OG image.'),
    e('Title Template in Layout', 'When all pages in a section should share a title suffix.', codeBlock([
      '// app/layout.js',
      'export const metadata = {',
      '  title: {',
      '    template: "%s | My Store",',
      '    default: "My Store"',
      '  }',
      '};',
      '',
      '// app/products/page.js \u2014 title becomes "Products | My Store"',
      'export const metadata = { title: "Products" };'
    ]), 'The title template automatically adds " | My Store" to every child page title.'),
    e('Open Graph and Twitter Cards', 'When social sharing previews are important.', codeBlock([
      'export const metadata = {',
      '  openGraph: {',
      '    title: "Blog Post",',
      '    description: "Read our latest blog post",',
      '    type: "article",',
      '    publishedTime: "2024-01-01",',
      '    authors: ["Author Name"]',
      '  },',
      '  twitter: {',
      '    card: "summary_large_image",',
      '    title: "Blog Post",',
      '    images: ["/blog-og.png"]',
      '  }',
      '};'
    ]), 'Configures both Open Graph and Twitter card metadata for rich social sharing previews.'),
    e('Using metadataBase', 'When you need absolute URLs in metadata.', codeBlock([
      'export const metadata = {',
      '  metadataBase: new URL("https://example.com"),',
      '  alternates: {',
      '    canonical: "/products",',
      '    languages: { "en-US": "/en/products", "es": "/es/products" }',
      '  },',
      '  robots: {',
      '    index: true,',
      '    follow: true',
      '  }',
      '};'
    ]), 'Sets the base URL for resolving relative paths and defines canonical URL and language alternatives.')
  ],
  [
    m('How do you define static metadata in Next.js?', ['Export generateMetadata function', 'Export metadata object', 'Use next/head component', 'Set document.title'], 1, 'Export a metadata object from layout.js or page.js for static metadata.'),
    m('What does the title template pattern "%s | Site Name" do?', ['Adds "Site Name" before the title', 'Replaces "Site Name" with the page title', 'Prepends page title with " | Site Name"', 'Creates two title tags'], 2, 'The %s placeholder is replaced with the page title, followed by " | Site Name".'),
    m('Which function enables dynamic metadata generation?', ['getMetadata', 'generateMetadata', 'createMetadata', 'dynamicMetadata'], 1, 'generateMetadata is an async function that receives params and returns a metadata object.'),
    m('What does metadataBase define?', ['The HTML lang attribute', 'The base URL for relative metadata URLs', 'The database connection string', 'The base font size'], 1, 'metadataBase sets the base URL for resolving relative paths in metadata fields.'),
    m('Which file-based convention provides the Open Graph image for a route?', ['favicon.ico', 'opengraph-image.png', 'twitter-image.jpg', 'meta-image.png'], 1, 'opengraph-image.png (or .jpg) placed in a route directory provides the OG image.'),
    m('How does metadata inheritance work between layout and page?', ['Page replaces all layout metadata', 'Page overrides only specified fields', 'Layout overrides page', 'No inheritance'], 1, 'Child pages override only the fields they specify; parent layout fields are inherited for unspecified fields.')
  ]
);

/* =================== TOPIC 8: ROUTE HANDLERS =================== */
addTopic('nextjs-route-handlers', 'Route Handlers', 'intermediate', 25,
  [
    'Route Handlers allow creating API endpoints within Next.js using route.js files in the App Router directory.',
    'Support all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) via exported async functions named after the method.',
    'Route Handlers are server-only and do not increase client bundle size, making them ideal for form submissions, webhooks, and internal API calls.',
    'Support dynamic routes (route groups), middleware integration, cookies/headers access, streaming responses, and request body parsing.'
  ],
  'Route Handlers are like having a mini backend server built into your frontend project. You create files with special names and export functions for GET, POST, etc., and Next.js automatically turns them into API endpoints.',
  [
    d('Route Handler Basics', 'Create a route.js file in the app directory. Export async functions named after HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. Each function receives a Request object and returns a Response or NextResponse. Route Handlers are server-only and cannot be used in Client Components.'),
    d('Request and Response Handling', 'Route Handlers receive the standard Web Request API. Parse JSON with request.json(), read form data with request.formData(), access headers with request.headers, and get query parameters from the URL. Responses use the standard Web Response API or NextResponse for convenience methods.'),
    d('Dynamic Route Handlers', 'Create route handlers in dynamic route folders: app/api/items/[id]/route.js. Access route parameters via the second argument: export async function GET(request, { params }) { ... }. Supports catch-all routes ([...slug]) and optional catch-all routes ([[...slug]]).'),
    d('Middleware and Authentication', 'Route Handlers integrate with Next.js middleware (middleware.js) for authentication, rate limiting, and request preprocessing. They can access cookies (via request.cookies or next/headers) and headers (via request.headers or headers() from next/headers).'),
    d('Streaming and Edge Runtime', 'Route Handlers support streaming responses using the Web Streams API. They can run on the Edge Runtime for low-latency global responses or the Node.js Runtime for full Node.js API access. The runtime is selected automatically based on used APIs or explicit configuration.')
  ],
  'Route Handlers provide a first-class API layer within Next.js applications, eliminating the need for a separate backend server for many use cases. They are ideal for form handling, webhook endpoints, API proxies, and server-side business logic.',
  [
    q('What are Route Handlers in Next.js?', 'Route Handlers are API endpoints defined by route.js files in the App Router directory. Each exported HTTP method function (GET, POST, PUT, etc.) handles requests to that route. They are server-only, do not affect client bundle size, and work with the standard Web Request/Response API.'),
    q('How do you create a GET Route Handler?', 'Create a route.js file and export an async function named GET: export async function GET(request) { return Response.json({ message: "Hello" }) }. The function receives the incoming Request object and must return a Response or NextResponse.'),
    q('How do you access route parameters in handlers?', 'Dynamic route parameters are available in the second argument: export async function GET(request, { params }) { const id = params.id }. The params object matches the dynamic segment names defined by the folder structure (e.g., [id] provides params.id).'),
    q('How do you parse request bodies?', 'Use the Request API methods: request.json() for JSON bodies, request.formData() for form data, request.text() for plain text. These return Promises that resolve to the parsed body. Always validate and type-check parsed data before use.'),
    q('Can Route Handlers access cookies?', 'Yes, via the cookies() function from next/headers: import { cookies } from "next/headers"; const cookieStore = cookies(); const token = cookieStore.get("token"). Alternatively, use request.cookies for read-only access.'),
    q('What runtimes do Route Handlers support?', 'Route Handlers support both the Edge Runtime (fast, globally distributed, limited Node.js APIs) and the Node.js Runtime (full Node.js API access, filesystem, databases). The runtime is selected automatically or can be forced with export const runtime = "edge" or "nodejs".'),
    q('How do Route Handlers differ from API Routes in the Pages Router?', 'Route Handlers (App Router) use route.js files and the Web Request/Response API. API Routes (Pages Router) use pages/api/ files and Express-like req/res objects. Route Handlers support Edge Runtime, streaming, and better typing.'),
    q('Can Route Handlers be called from Client Components?', 'Yes, Client Components can call Route Handlers via fetch() just like any external API. Route Handlers are essentially internal API endpoints. This is the recommended pattern for form submissions and server actions that need explicit API endpoints.'),
    q('How do you handle CORS in Route Handlers?', 'Set CORS headers in the Response object: return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE" } }). For preflight requests, export an OPTIONS handler.'),
    q('How do you implement error handling in Route Handlers?', 'Use try-catch blocks and return appropriate HTTP status codes. Return Response.json({ error: message }, { status: 400 }) for client errors and Response.json({ error: "Internal Server Error" }, { status: 500 }) for server errors. Use NextResponse for convenience methods like NextResponse.redirect().')
  ],
  R(10,40,100,35,'#0070f3','','Client Request','Browser') +
  A(110,58,130,58) +
  R(140,40,130,35,'#28a745','','route.js','GET / POST handler') +
  A(270,58,290,58) +
  R(300,40,100,35,'#ffc107','','Server Logic','Process') +
  A(300,75,300,95) +
  R(230,105,130,35,'#17a2b8','','Response.json()','JSON Response') +
  R(10,105,100,35,'#6610f2','','Headers/Cookies','Auth') +
  T(250,170,'Route Handlers: API endpoints defined by route.js in the App Router directory.',9,'#666','middle'),
  [
    e('Basic GET Route Handler', 'When you need a simple API endpoint.', codeBlock([
      '// app/api/hello/route.js',
      'export async function GET() {',
      '  return Response.json({ message: "Hello World" });',
      '}'
    ]), 'Creates a GET endpoint at /api/hello that returns JSON.'),
    e('POST Handler with Body Parsing', 'When handling form submissions or webhook payloads.', codeBlock([
      '// app/api/contact/route.js',
      'export async function POST(request) {',
      '  const body = await request.json();',
      '  const { name, email } = body;',
      '  return Response.json({ success: true, name }, { status: 201 });',
      '}'
    ]), 'Parses JSON request body and returns a 201 response.'),
    e('Dynamic Route Handler', 'When you need CRUD operations on a resource.', codeBlock([
      '// app/api/items/[id]/route.js',
      'export async function GET(request, { params }) {',
      '  const item = await db.findItem(params.id);',
      '  if (!item) return Response.json({ error: "Not found" }, { status: 404 });',
      '  return Response.json(item);',
      '}',
      '',
      'export async function DELETE(request, { params }) {',
      '  await db.deleteItem(params.id);',
      '  return new Response(null, { status: 204 });',
      '}'
    ]), 'Handles GET and DELETE for a specific item by ID, with 404 handling.'),
    e('Route Handler with Headers and Cookies', 'When you need authentication context.', codeBlock([
      'import { cookies, headers } from "next/headers";',
      '',
      'export async function GET() {',
      '  const cookieStore = cookies();',
      '  const token = cookieStore.get("auth-token");',
      '  const headersList = headers();',
      '  const referer = headersList.get("referer");',
      '  return Response.json({ token, referer });',
      '}'
    ]), 'Accesses server-side cookies and request headers using next/headers utilities.'),
    e('CORS-Enabled Route Handler', 'When your API needs to be called from external origins.', codeBlock([
      'export async function GET() {',
      '  return Response.json({ data: "public" }, {',
      '    headers: {',
      '      "Access-Control-Allow-Origin": "*",',
      '      "Access-Control-Allow-Methods": "GET, OPTIONS"',
      '    }',
      '  });',
      '}',
      '',
      'export async function OPTIONS() {',
      '  return new Response(null, {',
      '    headers: {',
      '      "Access-Control-Allow-Origin": "*",',
      '      "Access-Control-Allow-Methods": "GET, OPTIONS"',
      '    }',
      '  });',
      '}'
    ]), 'Handles CORS preflight requests and adds CORS headers to the response.')
  ],
  [
    m('What file defines Route Handlers in the App Router?', ['api.js', 'route.js', 'handler.js', 'endpoint.js'], 1, 'Route Handlers are defined in route.js files within the app directory.'),
    m('How do you access route parameters in a Route Handler?', ['From request.params', 'From the second function argument params', 'From global params object', 'From URL query string'], 1, 'Parameters are available in the second argument: GET(request, { params }).'),
    m('What API should you use to parse a JSON request body?', ['request.body', 'request.json()', 'JSON.parse(request)', 'request.text()'], 1, 'request.json() parses the JSON body and returns a Promise.'),
    m('Which import provides cookie access in Route Handlers?', ['next/server', 'next/cookies', 'next/headers', 'next/request'], 2, 'cookies() is imported from next/headers for server-side cookie access.'),
    m('How do you set the runtime to Edge for a Route Handler?', ['export const runtime = "edge"', 'export const edge = true', 'Set edgeRuntime in config', 'Use edge.js extension'], 0, 'Export export const runtime = "edge" to use the Edge Runtime.'),
    m('What does the OPTIONS handler do in a Route Handler?', ['Handles PUT requests', 'Handles CORS preflight requests', 'Handles DELETE requests', 'Handles redirect requests'], 1, 'The OPTIONS handler responds to CORS preflight requests from browsers.')
  ]
);

/* =================== TOPIC 9: SERVER COMPONENTS =================== */
addTopic('nextjs-server-components', 'Server Components', 'advanced', 30,
  [
    'React Server Components (RSC) are components that render exclusively on the server, sending only the resulting HTML to the client.',
    'In Next.js, all components in the App Router are Server Components by default, reducing client-side JavaScript bundle size significantly.',
    'Server Components can directly access databases, filesystems, and backend services without exposing sensitive logic to the client.',
    'They cannot use React hooks, browser APIs, event handlers, or state management, making them ideal for data fetching and static content rendering.'
  ],
  'Server Components are like kitchen prep chefs who prepare all the ingredients (fetch data, query databases) before the food goes to the dining area (browser). The diners only see the finished dish (HTML), not the kitchen tools (server code).',
  [
    d('What Are Server Components', 'Server Components are React components that run exclusively on the server during rendering. They are the default in Next.js App Router. They reduce client bundle size because their code, dependencies, and imported libraries never reach the browser. They can use Node.js APIs directly (database queries, filesystem access).'),
    d('Benefits of Server Components', 'Reduced JavaScript bundle size (server-only code is excluded), direct backend access (no API layer needed for data fetching), automatic code splitting (only client components are bundled), improved initial page load (HTML is pre-rendered), and better SEO (complete HTML is served).'),
    d('Limitations and Constraints', 'Server Components cannot use useState, useEffect, useContext, useReducer, or any React hooks. They cannot use browser APIs (window, document, localStorage). They cannot handle user interactions (onClick, onChange). They cannot use context providers or event handlers. These features require Client Components.'),
    d('Data Fetching in Server Components', 'Server Components can use async/await directly in the component function. They can fetch data from databases, APIs, or filesystems. The App Router automatically deduplicates fetch requests and caches responses. Data fetching is done at the component level, eliminating prop drilling for data.'),
    d('Server Component Composition', 'Server Components can import and render Client Components, creating a seamless hybrid. Data can be passed from Server Components to Client Components as props. The boundary between server and client is clearly marked by the "use client" directive. Server Components can also be passed as children to Client Components.')
  ],
  'Server Components represent a fundamental shift in React architecture. By moving data fetching and rendering to the server, they eliminate the need for client-side state management for data, reduce bundle sizes, and improve performance. The key to mastering Server Components is understanding the server/client boundary.',
  [
    q('What are React Server Components?', 'Server Components are React components that run and render exclusively on the server. They never send their JavaScript code to the client; only the rendered HTML output is sent. This reduces bundle size and enables direct access to server-side resources like databases.'),
    q('How are Server Components different from Client Components?', 'Server Components run on the server, have no client-side interactivity, and reduce bundle size. Client Components run in the browser, support hooks and event handlers, and increase bundle size. In the App Router, all components are Server Components by default.'),
    q('What can Server Components do that Client Components cannot?', 'Server Components can directly access databases, read from the filesystem, use environment variables (non-NEXT_PUBLIC_), access backend services, and perform CPU-intensive computations without affecting client performance. They can also keep sensitive logic (API keys, business logic) server-side.'),
    q('What are the limitations of Server Components?', 'Server Components cannot use React hooks (useState, useEffect, useContext, etc.), browser APIs (window, document), event handlers (onClick, onSubmit), or create React context. They are rendered only on the server and do not re-render on the client.'),
    q('How do you fetch data in Server Components?', 'Use async/await directly in the component: export default async function Page() { const data = await fetch("https://api.example.com/data"); return <div>{data.title}</div> }. Next.js automatically deduplicates and caches fetch requests.'),
    q('How do you add interactivity to Server Components?', 'Server Components cannot be interactive. To add interactivity, import and render a Client Component (marked with "use client") from within a Server Component. The Client Component handles event handlers, state, and browser APIs while the Server Component handles data fetching and layout.'),
    q('What happens when a Server Component re-renders?', 'Server Components only render on the server. When data changes, the component re-renders on the server, and the new HTML is sent to the client. Client-side state and UI are preserved during this process. Client Components nested inside Server Components maintain their state across re-renders.'),
    q('How does the Server Component pattern improve performance?', 'By rendering on the server, Server Components eliminate the need to download, parse, and execute JavaScript for data fetching and rendering logic. This reduces the bundle size, improves Time to Interactive, and reduces the device resources required.'),
    q('Can Server Components use CSS-in-JS libraries?', 'Most CSS-in-JS libraries require client-side JavaScript execution and cannot be used directly in Server Components. Use CSS Modules, Tailwind CSS, or other zero-runtime CSS solutions with Server Components. Some libraries like styled-components have experimental server-side support.'),
    q('How do Server Components handle authentication?', 'Server Components can check authentication by reading cookies or session tokens server-side. They can conditionally render content based on auth state. For interactive auth flows (login forms, redirects), use Client Components wrapped by Server Components that provide the initial auth state.')
  ],
  R(10,40,140,35,'#0070f3','','Server Component','Runs on Server') +
  A(150,58,170,58) +
  R(180,40,140,35,'#28a745','','Direct DB/API','Fetch Data') +
  A(320,58,340,58) +
  R(350,40,120,35,'#ffc107','','HTML Output','to Client') +
  A(350,75,350,95) +
  R(230,105,140,35,'#17a2b8','','Client Component','Interactive (useState)') +
  A(230,123,180,123,'#999') +
  R(10,105,140,35,'#6610f2','','Server Component','No JS bundle') +
  T(250,170,'Server Components: Server-rendered by default, reduce JS bundle, direct backend access.',9,'#666','middle'),
  [
    e('Async Server Component for Data Fetching', 'When you need to fetch data and render it directly.', codeBlock([
      '// app/page.js \u2014 Server Component by default',
      'export default async function Home() {',
      '  const res = await fetch("https://api.example.com/posts");',
      '  const posts = await res.json();',
      '  return (',
      '    <ul>',
      '      {posts.map(p => <li key={p.id}>{p.title}</li>)}',
      '    </ul>',
      '  );',
      '}'
    ]), 'Fetches posts directly in the component without useEffect, loading state, or API route.'),
    e('Server Component with Database Access', 'When you need to query a database directly.', codeBlock([
      'import { sql } from "@vercel/postgres";',
      '',
      'export default async function Users() {',
      '  const { rows } = await sql`SELECT * FROM users`;',
      '  return (',
      '    <table>',
      '      {rows.map(r => <tr key={r.id}><td>{r.name}</td></tr>)}',
      '    </table>',
      '  );',
      '}'
    ]), 'Queries a PostgreSQL database directly in the Server Component without an API layer.'),
    e('Server Component with Client Composition', 'When you need both data and interactivity.', codeBlock([
      '// Server Component (parent)',
      'import LikeButton from "./LikeButton";',
      '',
      'export default async function PostPage({ params }) {',
      '  const post = await fetchPost(params.id);',
      '  return (',
      '    <div>',
      '      <h1>{post.title}</h1>',
      '      <p>{post.content}</p>',
      '      <LikeButton initialLikes={post.likes} />',
      '    </div>',
      '  );',
      '}',
      '',
      '// Client Component (child)',
      '"use client"',
      'export default function LikeButton({ initialLikes }) {',
      '  const [likes, setLikes] = useState(initialLikes);',
      '  return <button onClick={() => setLikes(l => l + 1)}>{likes} likes</button>',
      '}'
    ]), 'Server Component handles data fetching, Client Component handles the interactive like button.'),
    e('Server Component with Error Handling', 'When you need graceful error handling.', codeBlock([
      'export default async function Product({ id }) {',
      '  try {',
      '    const product = await fetchProduct(id);',
      '    return <div>{product.name}</div>;',
      '  } catch (error) {',
      '    console.error("Failed to fetch product:", error);',
      '    return <div className="error">Product not available</div>;',
      '  }',
      '}'
    ]), 'Error handling in Server Components uses try-catch with fallback UI rendering.'),
    e('Server Component with Suspense', 'When you want streaming with loading states.', codeBlock([
      'import { Suspense } from "react";',
      '',
      'async function ProductList() {',
      '  const products = await fetchProducts();',
      '  return products.map(p => <div key={p.id}>{p.name}</div>);',
      '}',
      '',
      'export default function Page() {',
      '  return (',
      '    <Suspense fallback={<div>Loading products...</div>}>',
      '      <ProductList />',
      '    </Suspense>',
      '  );',
      '}'
    ]), 'Wraps the async Server Component in Suspense for streaming and immediate loading feedback.')
  ],
  [
    m('What is the default component type in the App Router?', ['Client Component', 'Server Component', 'Hybrid Component', 'Static Component'], 1, 'All components in the App Router are Server Components by default.'),
    m('Which of the following can a Server Component use?', ['useState', 'Database queries', 'onClick handlers', 'localStorage'], 1, 'Server Components can directly access databases since they run on the server.'),
    m('How do you mark a component as a Client Component?', ['Add "use client" at the top', 'Export as client wrapper', 'Use ClientComponent HOC', 'Configure in next.config'], 0, 'Add the "use client" directive at the top of the file to mark it as a Client Component.'),
    m('What is sent to the client from a Server Component?', ['Component source code', 'Rendered HTML (no JS)', 'JavaScript bundle', 'Server logs'], 1, 'Only the rendered HTML output is sent; no JavaScript source code is included.'),
    m('Can Server Components use React context?', ['Yes, always', 'No, context requires Client Components', 'Yes, with use client', 'Only for theme context'], 1, 'React context requires client-side state, so it is not available in Server Components.'),
    m('How are fetch requests optimized in Server Components?', ['They are blocked', 'They are automatically deduplicated', 'They run on the client', 'They are cached for one hour'], 1, 'Next.js automatically deduplicates identical fetch requests within a render pass.')
  ]
);

/* =================== TOPIC 10: CLIENT COMPONENTS =================== */
addTopic('nextjs-client-components', 'Client Components', 'intermediate', 25,
  [
    'Client Components are React components that render on the client browser, enabling interactivity through hooks, event handlers, and browser APIs.',
    'Marked with the "use client" directive at the top of the file, creating a clear boundary between server and client code.',
    'All components imported into a Client Component file also become part of the client bundle, making the placement of the "use client" directive strategically important.',
    'Client Components can be rendered server-side during the initial page load (SSR) but are hydrated and become interactive on the client.'
  ],
  'Client Components are like interactive touchscreens in a museum: the content may be prepared by the server, but the buttons, animations, and real-time updates all happen on your device.',
  [
    d('The "use client" Directive', 'Adding "use client" at the top of a file marks it and all its imports as Client Components. This directive creates the server-client boundary. All React hooks (useState, useEffect, useRef, useCallback, useMemo, useContext) and event handlers are only available in Client Components.'),
    d('Server-Side Rendering of Client Components', 'Client Components are pre-rendered on the server during initial page load, producing static HTML. After the JavaScript loads, React hydrates the component, making it interactive. This means Client Components get both SSR benefits (fast initial HTML) and client interactivity.'),
    d('Bundle Size Considerations', 'Client Components increase the JavaScript bundle size. Strategically place the "use client" directive at the lowest possible level to minimize the client bundle. Server Components that contain no client logic should remain server-only. Use dynamic imports with ssr: false for rarely-used client components.'),
    d('Composition Patterns', 'Best practice: Server Components handle data fetching and static rendering, passing data as props to Client Components. Client Components handle interactivity. Use the children prop pattern to pass Server Component output into Client Component wrappers. Avoid importing Server Components into Client Components.'),
    d('Third-Party Library Usage', 'Many React libraries (UI components, charts, form libraries) require client-side JavaScript. Wrap third-party client libraries in Client Components. Server Components can import and render these client wrappers. Some newer libraries offer both server and client exports.')
  ],
  'Client Components are essential for interactive web applications but should be used strategically. The recommended pattern is maximal Server Components with minimal, targeted Client Components. Each "use client" boundary should be justified by actual interactivity requirements.',
  [
    q('What are Client Components in Next.js?', 'Client Components are components that render on the client browser. They support React hooks, event handlers, browser APIs, and state management. They are marked with the "use client" directive and can be server-side rendered during initial load for SEO benefits.'),
    q('How do you create a Client Component?', 'Add "use client" as the first line of the file. This marks the component and all its direct imports as client-side. Then you can use React hooks, event handlers, and browser APIs. The component will be pre-rendered on the server and hydrated on the client.'),
    q('What is the server-client boundary?', 'The server-client boundary is defined by the "use client" directive. Everything above the boundary (server-side) is rendered on the server. Everything below the boundary (the Client Component and its imports) is rendered on the client. This boundary determines what code goes into the client bundle.'),
    q('Can Client Components be server-side rendered?', 'Yes, Client Components are pre-rendered on the server during the initial page load. This produces static HTML that is sent to the client. After the JavaScript bundle loads, React hydrates the HTML, attaching event handlers and making it interactive.'),
    q('How do you minimize client bundle size with Client Components?', 'Place the "use client" directive at the lowest possible component level. Keep data fetching and static rendering in Server Components. Use dynamic imports with next/dynamic for client components that are not immediately visible. Pass Server Components as children to Client Components using the children prop.'),
    q('What happens when you import a Server Component into a Client Component?', 'If you import a Server Component directly into a Client Component, the Server Component becomes a Client Component too (it loses its server-side capabilities). Use the composition pattern: pass Server Components as children or props to Client Components instead of importing them.'),
    q('How do you use third-party UI libraries in the App Router?', 'Third-party UI components that use hooks or browser APIs must be wrapped in Client Components. Create a wrapper file with "use client", import the library, and re-export it. Server Components can then import and render this client wrapper.'),
    q('What hooks are available in Client Components?', 'All React hooks: useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, useImperativeHandle, useLayoutEffect, useDebugValue, useId, useSyncExternalStore, useTransition, useDeferredValue. Custom hooks that use these hooks are also available.'),
    q('Can Client Components use environment variables?', 'Client Components can only access environment variables prefixed with NEXT_PUBLIC_. Server-only environment variables are not available in Client Components. Use NEXT_PUBLIC_ prefix for values that need to be accessed client-side.'),
    q('How do you handle loading states in Client Components?', 'Use React hooks like useState for loading state, useEffect for data fetching with loading indicators, or libraries like SWR/TanStack Query that provide built-in loading states. For suspense-based loading, wrap Client Components in Suspense boundaries defined in Server Components.')
  ],
  R(10,40,120,35,'#0070f3','','"use client"','Directive') +
  A(130,58,160,58) +
  R(170,40,120,35,'#28a745','','Client Bundle','Includes JS') +
  A(290,58,320,58) +
  R(330,40,120,35,'#ffc107','','Hydration','on Client') +
  A(330,75,330,95) +
  R(230,105,130,35,'#17a2b8','','Interactive','useState/onClick') +
  R(10,105,130,35,'#6610f2','','Server Pre-render','Initial HTML') +
  T(250,170,'Client Components: Browser-rendered with hooks, interactivity, and browser API access.',9,'#666','middle'),
  [
    e('Basic Client Component with State', 'When you need a counter or toggle.', codeBlock([
      '"use client";',
      'import { useState } from "react";',
      '',
      'export default function Counter() {',
      '  const [count, setCount] = useState(0);',
      '  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>',
      '}'
    ]), 'A simple interactive counter using useState hook.'),
    e('Client Component with useEffect', 'When you need browser-side data fetching.', codeBlock([
      '"use client";',
      'import { useState, useEffect } from "react";',
      '',
      'export default function GeoLocation() {',
      '  const [location, setLocation] = useState(null);',
      '  useEffect(() => {',
      '    navigator.geolocation.getCurrentPosition(pos => setLocation(pos.coords));',
      '  }, []);',
      '  return <div>Lat: {location?.latitude}, Lng: {location?.longitude}</div>;',
      '}'
    ]), 'Uses the browser Geolocation API, which requires client-side execution.'),
    e('Client Component with Server Component Composition', 'When you want to minimize client code.', codeBlock([
      '// Server Component (parent)',
      'import InteractivePanel from "./InteractivePanel";',
      '',
      'export default async function Dashboard() {',
      '  const data = await fetchDashboardData();',
      '  return (',
      '    <div>',
      '      <h1>Dashboard</h1>',
      '      <InteractivePanel initialData={data} />',
      '    </div>',
      '  );',
      '}',
      '',
      '// Client Component (child)',
      '"use client";',
      'export default function InteractivePanel({ initialData }) {',
      '  const [filtered, setFiltered] = useState(initialData);',
      '  return <div onClick={() => setFiltered(initialData.filter(f))}>...</div>',
      '}'
    ]), 'Server Component fetches data, Client Component handles interactivity.'),
    e('Dynamic Import of Client Component', 'When you want to lazy-load a heavy client component.', codeBlock([
      'import dynamic from "next/dynamic";',
      '',
      'const HeavyChart = dynamic(() => import("../components/Chart"), {',
      '  ssr: false,',
      '  loading: () => <div>Loading chart...</div>',
      '});',
      '',
      'export default function Page() {',
      '  return <HeavyChart />;',
      '}'
    ]), 'The Chart component is loaded only when needed, reducing initial bundle size.'),
    e('Third-Party Library Wrapper', 'When using a React library that requires client-side execution.', codeBlock([
      '"use client";',
      'import { motion } from "framer-motion";',
      '',
      'export default function AnimatedElement({ children }) {',
      '  return <motion.div animate={{ opacity: 1 }}>{children}</motion.div>;',
      '}'
    ]), 'Wraps framer-motion in a Client Component so it can be used from a Server Component.')
  ],
  [
    m('What directive marks a component as a Client Component?', ['"use server"', '"use client"', '"use browser"', '"use csr"'], 1, 'The "use client" directive marks the server-client boundary.'),
    m('Which feature is available in Client Components but NOT in Server Components?', ['Database queries', 'Environment variables', 'useState hook', 'Direct data fetching'], 2, 'React hooks like useState are only available in Client Components.'),
    m('What happens to Client Components during initial page load?', ['They are not rendered', 'They are pre-rendered as HTML on the server', 'They only render after hydration', 'They require JavaScript to show anything'], 1, 'Client Components are pre-rendered on the server for initial HTML, then hydrated.'),
    m('How should you minimize the client bundle?', ['Use many Client Components', 'Place "use client" at the leaf level only', 'Avoid using hooks', 'Use inline scripts'], 1, 'Place "use client" at the lowest possible component level to minimize client bundle size.'),
    m('What happens when you import a Server Component directly into a Client Component?', ['It stays a Server Component', 'It becomes part of the client bundle', 'It throws an error', 'It renders on both sides'], 1, 'Directly imported Server Components become part of the client bundle and lose server capabilities.'),
    m('Which environment variables can Client Components access?', ['All environment variables', 'Only NEXT_PUBLIC_ prefixed variables', 'Only server variables', 'No environment variables'], 1, 'Client Components can only access environment variables with the NEXT_PUBLIC_ prefix.')
  ]
);

/* =================== TOPIC 11: DYNAMIC ROUTES =================== */
addTopic('nextjs-dynamic-routes', 'Dynamic Routes', 'intermediate', 25,
  [
    'Dynamic Routes in Next.js allow creating parameterized URLs using bracket syntax in folder names, supporting both the App Router and Pages Router.',
    'Single dynamic segments use [slug] syntax, catch-all segments use [...slug], and optional catch-all segments use [[...slug]].',
    'Dynamic route parameters are accessible via the params prop in page components or the second argument in route handlers.',
    'generateStaticParams (App Router) or getStaticPaths (Pages Router) defines which dynamic paths are pre-rendered at build time for SSG/ISR.'
  ],
  'Dynamic Routes are like URL templates with blank fields. For example, /products/[id] means any product ID works: /products/1, /products/abc, or /products/blue-shirt all map to the same template.',
  [
    d('Dynamic Route Syntax', 'In the App Router, dynamic routes use folder-level bracket notation: app/products/[id]/page.js creates /products/1, /products/abc. Catch-all: app/posts/[...slug]/page.js matches /posts/a/b/c. Optional catch-all: app/posts/[[...slug]]/page.js also matches /posts.'),
    d('Accessing Dynamic Parameters', 'In the App Router, page components receive params as a prop: export default function Page({ params }) { return <div>{params.id}</div> }. In the Pages Router, use the router.query object or getServerSideProps/getStaticProps context.params.'),
    d('generateStaticParams for Static Generation', 'In the App Router, export async function generateStaticParams() to specify which dynamic paths to pre-render at build time. Returns an array of objects with the dynamic parameter values. Combine with revalidation for ISR.'),
    d('Dynamic Routes in Route Handlers', 'Route Handlers support dynamic parameters: app/api/products/[id]/route.js. Access params in the second argument: export async function GET(request, { params }). Supports catch-all patterns for flexible API endpoints.'),
    d('Matching and Precedence', 'Next.js resolves route conflicts by specificity: static routes take precedence over dynamic routes. More specific dynamic routes (e.g., [slug] vs [...slug]) take precedence over less specific ones. The order of definition does not matter; the framework determines the best match.')
  ],
  'Dynamic Routes are a core feature of Next.js routing, enabling everything from blog posts to e-commerce product pages. Understanding the different bracket syntax patterns and when to use each is essential for building flexible, content-driven applications.',
  [
    q('What are Dynamic Routes in Next.js?', 'Dynamic Routes allow parts of the URL to be variable, defined using bracket syntax in folder names. For example, app/blog/[slug]/page.js creates a route that matches /blog/any-slug-value. The captured value is available as the params prop.'),
    q('What is the difference between [slug] and [...slug]?', '[slug] matches a single URL segment (e.g., /blog/hello). [...slug] matches one or more segments (e.g., /blog/2024/01/hello). [...slug] captures segments as an array. Use [slug] for single parameters and [...slug] for nested paths.'),
    q('What is an optional catch-all route?', '[[...slug]] matches with or without the parameter. For example, app/[[...slug]]/page.js matches /, /a, /a/b. The params.slug is undefined for the root and an array for deeper paths. Useful for documentation or category hierarchies with optional nesting.'),
    q('How do you access dynamic route parameters?', 'In App Router pages: export default function Page({ params }) { params.id }. In Route Handlers: export async function GET(request, { params }). In Pages Router: use router.query.id or getServerSideProps context.params.'),
    q('What is generateStaticParams?', 'generateStaticParams is the App Router equivalent of getStaticPaths. It defines which dynamic paths are pre-rendered at build time. Returns an array of objects: [{ slug: "post-1" }, { slug: "post-2" }]. Used with static or ISR rendering strategies.'),
    q('How does route resolution work with conflicting routes?', 'Static routes take precedence over dynamic routes. Among dynamic routes, more specific patterns take precedence. For example, /products/create (static) wins over /products/[id] (dynamic). The framework automatically handles precedence without explicit ordering.'),
    q('Can you have multiple dynamic segments in one route?', 'Yes, you can have multiple dynamic segments: app/[category]/[product]/page.js matches /electronics/phone-1. Each segment captures its respective value in params: { category: "electronics", product: "phone-1" }.'),
    q('How do dynamic routes work with ISR?', 'Dynamic routes can use ISR by combining generateStaticParams with fetch options like next: { revalidate: 60 } or by using revalidatePath for On-Demand ISR. Pages not specified in generateStaticParams use fallback behavior.'),
    q('How do you get query parameters in dynamic routes?', 'Query parameters are available via searchParams in the App Router: export default function Page({ params, searchParams }). In the Pages Router, use router.query or getServerSideProps context.query.'),
    q('What happens if a dynamic route parameter is missing?', 'For required dynamic segments ([slug]), the route only matches if the segment is present in the URL. For optional catch-all routes ([[...slug]]), both the root and nested paths match. Missing required parameters result in a 404.')
  ],
  R(10,40,140,35,'#0070f3','','app/products/[id]/page.js','Dynamic File') +
  A(150,58,170,58) +
  R(180,40,140,35,'#28a745','','/products/123','URL Match') +
  A(320,58,340,58) +
  R(350,40,100,35,'#ffc107','','params.id=123','Captured Value') +
  A(350,75,350,95) +
  R(230,105,140,35,'#17a2b8','','generateStaticParams','Pre-render Paths') +
  R(10,105,140,35,'#6610f2','','/products/[...slug]','Catch-all') +
  T(250,170,'Dynamic Routes: Bracket syntax for parameterized URLs with flexible matching patterns.',9,'#666','middle'),
  [
    e('Single Dynamic Segment', 'When creating a product detail page.', codeBlock([
      '// app/products/[id]/page.js',
      'export default function ProductPage({ params }) {',
      '  return <h1>Product {params.id}</h1>',
      '}'
    ]), 'Creates /products/1, /products/abc, etc. The id parameter is available via params.id.'),
    e('Catch-All Dynamic Route', 'When building a documentation section with nested pages.', codeBlock([
      '// app/docs/[...slug]/page.js',
      'export default function DocPage({ params }) {',
      '  return <h1>Docs / {params.slug.join(" / ")}</h1>',
      '}'
    ]), 'Matches /docs/getting-started, /docs/guides/advanced, etc. slug is an array of segments.'),
    e('generateStaticParams with Dynamic Routes', 'When pre-building known blog posts.', codeBlock([
      'export async function generateStaticParams() {',
      '  const posts = await fetch("https://api.example.com/posts").then(r => r.json());',
      '  return posts.map(p => ({ slug: p.slug }));',
      '}',
      '',
      'export default async function PostPage({ params }) {',
      '  const post = await fetch(`https://api.example.com/posts/${params.slug}`);',
      '  const data = await post.json();',
      '  return <h1>{data.title}</h1>',
      '}'
    ]), 'Pre-builds all blog posts at build time using their slugs as dynamic parameters.'),
    e('Dynamic Route with Multiple Segments', 'When building a nested category/product URL structure.', codeBlock([
      '// app/[category]/[product]/page.js',
      'export default function ProductPage({ params }) {',
      '  return <div>Category: {params.category}, Product: {params.product}</div>',
      '}'
    ]), 'Matches /electronics/phone-1, /clothing/shirt, etc. Both segments are captured.'),
    e('Dynamic Route with Search Params', 'When filtering or paginating on a dynamic page.', codeBlock([
      '// app/products/[category]/page.js',
      'export default function ProductsPage({ params, searchParams }) {',
      '  const page = searchParams.page || "1";',
      '  return <div>Category: {params.category}, Page: {page}</div>',
      '}'
    ]), 'Accesses both dynamic params and query string parameters (e.g., /products/electronics?page=2).')
  ],
  [
    m('What syntax creates a single dynamic route segment?', ['[param]', '[...param]', '[[...param]]', '<param>'], 0, 'Single bracket notation [param] captures one URL segment.'),
    m('What does [...slug] match in a dynamic route?', ['Only the root path', 'One or more URL segments', 'Exactly one segment', 'No segments'], 1, 'Catch-all [...slug] matches one or more URL segments as an array.'),
    m('Which function pre-defines dynamic paths for SSG in the App Router?', ['getStaticPaths', 'generateStaticParams', 'generatePaths', 'preBuildPaths'], 1, 'generateStaticParams returns an array of parameter objects for build-time pre-rendering.'),
    m('How do you access dynamic parameters in a Route Handler?', ['From request.params', 'From the second argument { params }', 'From URL query', 'From request body'], 1, 'Route handlers receive params in the second argument: GET(request, { params }).'),
    m('When does a static route conflict with a dynamic route?', ['Always conflicts', 'Never conflicts', 'Static takes precedence', 'Dynamic takes precedence'], 2, 'Static routes take precedence over dynamic routes in route resolution.'),
    m('What does [[...slug]] match?', ['Only root', 'Root and multiple segments', 'Only one segment', 'No paths'], 1, 'Optional catch-all matches both the root path and nested paths.')
  ]
);

/* =================== TOPIC 12: MIDDLEWARE =================== */
addTopic('nextjs-middleware', 'Middleware', 'intermediate', 25,
  [
    'Middleware in Next.js runs code before a request is completed, allowing redirects, rewrites, authentication checks, and header manipulation at the edge.',
    'Defined in a single middleware.ts file at the project root, executing for every matching route before the page or API route responds.',
    'Middleware runs on the Edge Runtime for low-latency global execution, processing requests before they reach the application server.',
    'Supports conditional matching via the config.matcher array, regex patterns, and early returns for performance optimization.'
  ],
  'Middleware is like a security checkpoint at the entrance of a building. Before anyone reaches their destination, they pass through where guards can check IDs (authentication), redirect people to the right entrance, or add stamps (headers).',
  [
    d('Middleware Fundamentals', 'Middleware is defined in middleware.ts at the root of the project (same level as app/ or pages/). It exports a default async function that receives NextRequest and returns NextResponse or undefined. Middleware runs for every route that matches the config.matcher patterns before the route handler executes.'),
    d('Authentication and Authorization', 'Middleware is commonly used for authentication by checking cookies, session tokens, or JWT. If unauthenticated, redirect to login. If unauthorized, show 403. Middleware can also check for specific headers or IP-based access control before the page renders.'),
    d('Redirects and Rewrites', 'Middleware can perform server-side redirects (301/302) using NextResponse.redirect() and internal rewrites using NextResponse.rewrite(). Rewrites are invisible to the user but change which page handles the request. This is useful for A/B testing, localization, or legacy URL support.'),
    d('Header and Cookie Manipulation', 'Middleware can set, modify, or delete request and response headers. It can set cookies, modify cache headers, or add security headers (CSP, HSTS). These modifications happen at the edge before the request reaches the application server.'),
    d('Config and Matching', 'The config.matcher array specifies which routes trigger the middleware. Matchers can use exact paths, prefix patterns, or regex. Middleware should be as specific as possible to avoid unnecessary edge function invocations. Use negative lookaheads in regex to exclude specific paths like static files.')
  ],
  'Middleware provides a powerful layer for request preprocessing at the edge. It is ideal for authentication, redirection, header manipulation, and A/B testing. The key is keeping middleware fast and specific, since it runs on every matched request.',
  [
    q('What is Middleware in Next.js?', 'Middleware is a function that runs before a request completes, allowing you to modify the response, redirect, rewrite, or check authentication. It is defined in a single middleware.ts file at the project root and runs on the Edge Runtime for low-latency execution.'),
    q('Where is the middleware file placed?', 'Middleware is placed at the root of the project, alongside the app/ or pages/ directories, not inside them. The file must be named middleware.ts (or .js) and export a default function.'),
    q('How do you specify which routes trigger middleware?', 'Use the config.matcher export: export const config = { matcher: ["/dashboard/:path*", "/api/:path*"] }. Matchers can use path patterns, regex, or be omitted to match all routes. Be as specific as possible for performance.'),
    q('What runtime does middleware use?', 'Middleware runs on the Edge Runtime, which is based on the Web API standards. It has limited Node.js API access but provides fast, globally distributed execution. You cannot use Node.js-specific modules like fs or path in middleware.'),
    q('How do you implement authentication in middleware?', 'Check for auth tokens in cookies or headers. If missing, redirect to login: export function middleware(request) { const token = request.cookies.get("token"); if (!token) return NextResponse.redirect(new URL("/login", request.url)) }.'),
    q('Can middleware access the database?', 'Middleware has limited capabilities and cannot directly access databases using typical drivers. Use middleware for lightweight checks (token validation, header inspection). For database-dependent logic, use Route Handlers or API routes.'),
    q('What is the difference between redirect and rewrite in middleware?', 'redirect sends a 307/308 response telling the browser to go to a different URL. rewrite internally changes which route handles the request without the browser knowing. Rewrites are useful for A/B testing, localization, or proxying.'),
    q('How do you exclude certain paths from middleware?', 'Use negative lookaheads in the matcher regex or exclude specific paths. For example: matcher: ["/((?!api/auth|_next/static|favicon.ico).*)"] excludes auth routes, static files, and favicon.'),
    q('Can middleware modify the response?', 'Yes, middleware can set response headers, cookies, and even return a custom response. Use NextResponse.next() to continue with modifications, NextResponse.redirect() to redirect, or NextResponse.rewrite() to internally rewrite.'),
    q('How does middleware affect performance?', 'Middleware runs on every matched request, so it should be lightweight. Avoid heavy computations, large library imports, or network requests in middleware. Use specific matchers to minimize the number of requests that trigger middleware execution.')
  ],
  R(10,40,120,35,'#0070f3','','Client Request','Incoming') +
  A(130,58,160,58) +
  R(170,40,120,35,'#28a745','','middleware.ts','Check Auth') +
  A(170,75,170,95) +
  R(10,105,120,35,'#ffc107','','Redirect to /login','Unauthorized') +
  A(290,58,320,58) +
  R(330,40,120,35,'#17a2b8','','Page / API Route','Proceed') +
  A(330,75,330,95) +
  R(230,105,120,35,'#6610f2','','Set Headers','Cookies/CSP') +
  T(250,170,'Middleware: Runs at the edge before request reaches the application server.',9,'#666','middle'),
  [
    e('Authentication Middleware', 'When you need to protect dashboard routes.', codeBlock([
      '// middleware.ts',
      'import { NextResponse } from "next/server";',
      'import type { NextRequest } from "next/server";',
      '',
      'export function middleware(request: NextRequest) {',
      '  const token = request.cookies.get("session");',
      '  if (!token) {',
      '    return NextResponse.redirect(new URL("/login", request.url));',
      '  }',
      '  return NextResponse.next();',
      '}',
      '',
      'export const config = { matcher: ["/dashboard/:path*"] };'
    ]), 'Redirects unauthenticated users to /login when accessing /dashboard/* routes.'),
    e('Middleware with Header Modification', 'When you need to add security headers to all responses.', codeBlock([
      'export function middleware(request) {',
      '  const response = NextResponse.next();',
      '  response.headers.set("X-Frame-Options", "DENY");',
      '  response.headers.set("X-Content-Type-Options", "nosniff");',
      '  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");',
      '  return response;',
      '}'
    ]), 'Adds security headers to every response before it reaches the browser.'),
    e('Middleware for Localization', 'When you need to detect user locale and redirect.', codeBlock([
      'import { match } from "@formatjs/intl-localematcher";',
      'import Negotiator from "negotiator";',
      '',
      'export function middleware(request) {',
      '  const headers = { "accept-language": request.headers.get("accept-language") || "" };',
      '  const languages = new Negotiator({ headers }).languages();',
      '  const defaultLocale = "en";',
      '  const locale = match(languages, ["en", "fr", "es"], defaultLocale);',
      '  if (!request.nextUrl.pathname.startsWith("/" + locale)) {',
      '    return NextResponse.redirect(new URL("/" + locale + request.nextUrl.pathname, request.url));',
      '  }',
      '}'
    ]), 'Detects browser language and redirects to the appropriate locale prefix.'),
    e('Excluding Static Files from Middleware', 'When you want middleware to only run on matching routes.', codeBlock([
      'export const config = {',
      '  matcher: [',
      '    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",',
      '  ],',
      '};'
    ]), 'Regex pattern that excludes auth API routes, static files, and common assets from middleware.'),
    e('Middleware for A/B Testing', 'When you want to route users to different page versions.', codeBlock([
      'export function middleware(request) {',
      '  const variant = Math.random() > 0.5 ? "a" : "b";',
      '  const url = request.nextUrl.clone();',
      '  url.pathname = `/ab-test/${variant}${url.pathname}`;',
      '  return NextResponse.rewrite(url);',
      '}'
    ]), 'Randomly assigns users to variant A or B by rewriting the request path.')
  ],
  [
    m('Where is the middleware file located?', ['Inside app/', 'At the project root', 'Inside pages/', 'In the config/ folder'], 1, 'middleware.ts is placed at the root of the project, next to app/ and pages/.'),
    m('What runtime does middleware use?', ['Node.js Runtime', 'Edge Runtime', 'Browser Runtime', 'Serverless Runtime'], 1, 'Middleware runs on the Edge Runtime for fast, globally distributed execution.'),
    m('How do you redirect in middleware?', ['NextResponse.redirect()', 'response.redirect()', 'router.push()', 'window.location'], 0, 'Use NextResponse.redirect() to send a redirect response from middleware.'),
    m('What does the config.matcher do?', ['Defines middleware variables', 'Specifies which routes trigger middleware', 'Sets response headers', 'Configures database connections'], 1, 'config.matcher specifies route patterns that trigger middleware execution.'),
    m('Can middleware access the filesystem?', ['Yes, fully', 'No, limited Edge Runtime', 'Yes, with fs module', 'Only read-only'], 1, 'Middleware runs on Edge Runtime which has limited Node.js API access, no filesystem.'),
    m('What is the difference between rewrite and redirect?', ['Rewrite changes URL in browser', 'Rewrite changes internal handler without browser knowing', 'They are the same', 'Redirect is client-side'], 1, 'Rewrites internally change which handler serves the request without the browser being aware.')
  ]
);

/* =================== TOPIC 13: SERVER ACTIONS =================== */
addTopic('nextjs-server-actions', 'Server Actions', 'advanced', 30,
  [
    'Server Actions are async functions that run on the server but can be called directly from Client Components, eliminating API route boilerplate for mutations.',
    'Defined with "use server" directive at file level (marking all exports) or inline within a Server Component function body.',
    'Server Actions support progressive enhancement: forms work without JavaScript, and the action receives FormData automatically.',
    'Integrate with caching via revalidatePath and revalidateTag for automatic cache invalidation after mutations.'
  ],
  'Server Actions are like having a direct phone line from your browser to the server database. Instead of going through an operator (API route), you dial directly and the server handles everything.',
  [
    d('What Are Server Actions', 'Server Actions are functions that run on the server but are callable from Client Components and forms. Defined with "use server", they handle database mutations, file operations, and business logic. They return data or trigger cache revalidation, and can be used with React hooks like useActionState.'),
    d('Form Actions and Progressive Enhancement', 'Pass a Server Action to a form\'s action prop. The form works without JavaScript (progressive enhancement). The action receives FormData automatically. After submission, Next.js merges the response with the client UI. This eliminates manual form state management.'),
    d('Calling from Event Handlers', 'Import a Server Action and call it directly: onClick={() => myAction(data)}. The action runs server-side and returns a Promise. Use startTransition for pending states. Actions can receive FormData, JSON, or primitive arguments.'),
    d('Cache Integration', 'Inside the action, call revalidatePath("/path") or revalidateTag("tag") to invalidate caches. Next.js re-renders affected routes with fresh data. Actions can also return values that update the client UI immediately.'),
    d('Security', 'Always validate permissions inside the action (server-side). Never trust client-side checks. Server Action code is never exposed to the client; only a secure reference ID is included in the bundle. Use env vars for secrets.')
  ],
  'Server Actions represent a paradigm shift in Next.js data mutations, replacing explicit API routes with direct server function calls. They simplify form handling, reduce boilerplate, and integrate deeply with the caching system.',
  [
    q('What are Server Actions in Next.js?', 'Server Actions are async functions marked with "use server" that execute on the server but can be invoked from Client Components, form actions, or event handlers. They eliminate the need for separate API routes for mutations.'),
    q('How do you define a Server Action?', 'Add "use server" at the top of a file (making all exports server actions) or inline inside a Server Component function. The action is an async function that receives FormData or arguments and returns a result.'),
    q('How do Server Actions work with forms?', 'Pass the action to the form action prop. It receives FormData automatically. The form works without JS (progressive enhancement). Use useActionState for loading states and validation feedback.'),
    q('How do you invalidate cache from a Server Action?', 'Call revalidatePath("/path") to invalidate a specific route or revalidateTag("tag") to invalidate all routes using a fetch tag. These are imported from next/cache.'),
    q('What is progressive enhancement in Server Actions?', 'Forms with Server Actions work even with JavaScript disabled. Without JS, a traditional POST is made. With JS, the action runs via fetch. This ensures forms are functional everywhere.'),
    q('What hooks integrate with Server Actions?', 'useActionState (React 19+) provides action state and pending status. useFormStatus provides the pending state of the parent form. Both integrate seamlessly with Server Actions.'),
    q('Are Server Actions exposed to the client?', 'No. Only a secure reference ID is in the client bundle. The actual code stays server-side, preventing sensitive logic leakage.'),
    q('Can Server Actions be called from Server Components?', 'Yes, Server Actions can be imported and called from Server Components too. This is useful for initial data seeding or server-side triggers.'),
    q('What are the limitations of Server Actions?', 'POST-only, cannot be cached at the edge, not for data fetching (use Server Components instead), and authentication must be checked inside the action.'),
    q('How do you handle validation in Server Actions?', 'Validate inputs inside the action and return error objects. Use try-catch for database errors. Return structured responses with success/error fields for the client to handle.')
  ],
  R(10,40,120,35,'#0070f3','','Client','Form/onClick') +
  A(130,58,160,58) +
  R(170,40,130,35,'#28a745','','"use server"','Action') +
  A(300,58,330,58) +
  R(340,40,120,35,'#ffc107','','Database','Mutation') +
  A(340,75,340,95) +
  R(230,105,130,35,'#17a2b8','','revalidatePath','Cache') +
  R(10,105,130,35,'#6610f2','','Response','to Client') +
  T(250,170,'Server Actions: Server functions callable from client, with cache integration.',9,'#666','middle'),
  [
    e('Server Action with Form', 'Contact form submission.', codeBlock([
      '"use server";',
      'export async function submitContact(prevState, formData) {',
      '  await saveToDB({ name: formData.get("name"), email: formData.get("email") });',
      '  revalidatePath("/contact");',
      '  return { success: true };',
      '}'
    ]), 'Saves form data to database and revalidates the contact page.'),
    e('Server Action with onClick', 'Delete item from a list.', codeBlock([
      '"use server";',
      'export async function deleteItem(id) {',
      '  await db.items.delete(id);',
      '  revalidatePath("/items");',
      '}'
    ]), 'Calls server action directly from an onClick handler without an API route.'),
    e('Server Action with useActionState', 'Form with validation feedback.', codeBlock([
      '"use client";',
      'import { useActionState } from "react";',
      'import { submitForm } from "./actions";',
      'export default function Form() {',
      '  const [state, formAction, pending] = useActionState(submitForm, null);',
      '  return <form action={formAction}>',
      '    <input name="email" />',
      '    {state?.error && <p>{state.error}</p>}',
      '    <button disabled={pending}>{pending ? "Saving..." : "Save"}</button>',
      '  </form>',
      '}'
    ]), 'useActionState manages pending state and action result.'),
    e('Server Action with revalidateTag', 'Invalidate by tag.', codeBlock([
      '"use server";',
      'import { revalidateTag } from "next/cache";',
      'export async function createPost(formData) {',
      '  await db.posts.create({ title: formData.get("title") });',
      '  revalidateTag("posts");',
      '}'
    ]), 'Invalidates all data tagged with "posts" after creation.'),
    e('Server Action with Validation', 'Input validation.', codeBlock([
      '"use server";',
      'export async function register(prevState, formData) {',
      '  const email = formData.get("email");',
      '  if (!email?.includes("@")) return { error: "Invalid email" };',
      '  try {',
      '    await db.users.create({ email });',
      '    revalidatePath("/users");',
      '    return { success: true };',
      '  } catch {',
      '    return { error: "Email exists" };',
      '  }',
      '}'
    ]), 'Validates server-side, returns errors or success.')
  ],
  [
    m('What directive defines a Server Action?', ['"use client"', '"use server"', '"use action"', '"use handler"'], 1, '"use server" marks functions as Server Actions.'),
    m('How do you pass a Server Action to a form?', ['onSubmit prop', 'action prop', 'method prop', 'onAction prop'], 1, 'Pass to the action prop for progressive enhancement.'),
    m('What hook provides parent form pending state?', ['useActionState', 'useFormStatus', 'usePending', 'useLoading'], 1, 'useFormStatus provides the pending state of the parent form.'),
    m('How to invalidate cache after a Server Action?', ['clearCache()', 'revalidatePath()', 'resetData()', 'refresh()'], 1, 'Use revalidatePath() or revalidateTag() from next/cache.'),
    m('What happens when a Server Action form submits without JS?', ['Breaks', 'Works via POST', 'Shows error', 'Nothing'], 1, 'Progressive enhancement ensures forms work without JavaScript.'),
    m('Is Server Action code exposed to the client?', ['Yes', 'No, only reference ID', 'Partially', 'Only on error'], 1, 'Only a reference ID is in the bundle; implementation stays server-side.')
  ]
);

/* =================== TOPIC 14: IMAGE OPTIMIZATION =================== */
addTopic('nextjs-image-optimization', 'Image Optimization', 'intermediate', 25,
  [
    'Next.js Image Optimization via next/image auto-resizes, converts to modern formats (WebP/AVIF), lazy-loads, and generates responsive srcsets.',
    'The Image component extends HTML img with automatic optimization, requiring width/height (or fill) for layout stability (CLS prevention).',
    'Images are optimized on-demand at request time and cached, happening once per image regardless of page count.',
    'Remote images need remotePatterns config in next.config.js for security; local images auto-optimize during build.'
  ],
  'Next.js Image Optimization is like having a professional photo editor built in. Every image is auto-resized, converted to the best format, and only loaded when visible.',
  [
    d('The Image Component', 'Import Image from next/image. Key props: src, width/height (required for CLS prevention), alt (accessibility), priority (skip lazy loading for above-fold images), placeholder (blur|empty), quality (1-100), sizes (responsive breakpoints). The fill prop makes the image fill its positioned parent.'),
    d('Auto-Optimization', 'Images are resized to rendered dimensions, converted to WebP/AVIF based on browser support, lazy-loaded by default, and quality-optimized. Optimization happens on first request and is cached.'),
    d('Remote Images', 'Configure remotePatterns in next.config.js: { images: { remotePatterns: [{ protocol: "https", hostname: "cdn.example.com" }] } }. Remote images must specify width/height or use fill.'),
    d('Responsive Images', 'The sizes prop generates appropriate srcset entries. Example: sizes="(max-width: 768px) 100vw, 50vw". Users download only the size their viewport needs.'),
    d('Performance Impact', 'Improves LCP via priority loading for hero images. Prevents CLS by requiring explicit dimensions. Lazy loading below-fold images saves bandwidth. Automatic format conversion reduces file size.')
  ],
  'Image Optimization dramatically improves Core Web Vitals (LCP, CLS) and saves bandwidth. The Image component should replace all img tags for optimal performance.',
  [
    q('What is next/image?', 'The built-in Image component that auto-optimizes images: resizing, format conversion, lazy loading, srcset generation, and blur placeholders. Imported from next/image.'),
    q('What props are required?', 'src (path/URL), alt (accessibility), and either width+height or fill (with positioned parent).'),
    q('How do you configure remote images?', 'Add remotePatterns in next.config.js: images: { remotePatterns: [{ protocol: "https", hostname: "example.com" }] }'),
    q('What formats does next/image convert to?', 'WebP and AVIF, based on browser Accept headers. Falls back to original format if modern formats are unsupported.'),
    q('What does the priority prop do?', 'Skips lazy loading for above-fold images critical for LCP. Use sparingly.'),
    q('How does the fill prop work?', 'Makes image fill its parent container. Parent must have position: relative and defined dimensions.'),
    q('What is blurDataURL?', 'A tiny base64-encoded preview shown as placeholder while the full image loads. Use placeholder="blur". Auto-generated for local images.'),
    q('What does the sizes prop do?', 'Defines rendered width at different viewports, generating corresponding srcset entries. Prevents downloading oversized images.'),
    q('How does next/image affect Core Web Vitals?', 'Improves LCP (priority loading), prevents CLS (required dimensions), saves bandwidth (lazy loading, format conversion).'),
    q('How do you set image quality?', 'quality prop, 1-100. Default 75. Lower values (50-60) for thumbnails, higher (80-90) for product photos.')
  ],
  R(10,40,120,35,'#0070f3','','<Image>','Component') +
  A(130,58,160,58) +
  R(170,40,120,35,'#28a745','','Auto Resize','Responsive') +
  A(290,58,320,58) +
  R(330,40,120,35,'#ffc107','','WebP/AVIF','Convert') +
  A(330,75,330,95) +
  R(230,105,120,35,'#17a2b8','','Lazy Load','On Scroll') +
  R(10,105,120,35,'#6610f2','','Cached','Optimized') +
  T(250,170,'Image: Auto resizing, format conversion, lazy loading, and caching.',9,'#666','middle'),
  [
    e('Local Image', 'Displaying a local image.', codeBlock([
      'import Image from "next/image";',
      'import hero from "../public/hero.jpg";',
      'export default function Hero() {',
      '  return <Image src={hero} alt="Hero" priority />',
      '}'
    ]), 'Local images auto-detect width/height and blurDataURL.'),
    e('Remote Image', 'External CMS image.', codeBlock([
      'import Image from "next/image";',
      'export default function Product({ p }) {',
      '  return <Image src={p.image} alt={p.name} width={600} height={400} />',
      '}'
    ]), 'Remote images need explicit width/height and remotePatterns config.'),
    e('Fill Prop', 'Background cover image.', codeBlock([
      'import Image from "next/image";',
      'export default function Banner() {',
      '  return (',
      '    <div className="relative w-full h-[400px]">',
      '      <Image src="/banner.jpg" alt="Banner" fill className="object-cover" />',
      '    </div>',
      '  );',
      '}'
    ]), 'fill prop requires positioned parent with dimensions.'),
    e('Sizes Prop', 'Responsive blog thumbnail.', codeBlock([
      '<Image',
      '  src={post.thumbnail}',
      '  alt={post.title}',
      '  width={1200}',
      '  height={630}',
      '  sizes="(max-width: 768px) 100vw, 50vw"',
      '/>'
    ]), 'Generates srcset entries matching breakpoints.'),
    e('Blur Placeholder', 'Smooth loading.', codeBlock([
      '<Image',
      '  src={image.url}',
      '  alt={image.alt}',
      '  width={800}',
      '  height={600}',
      '  placeholder="blur"',
      '  blurDataURL="data:image/webp;base64,..."',
      '/>'
    ]), 'Blurred preview while loading. Auto-generated for local images.')
  ],
  [
    m('Which component provides image optimization?', ['<img>', '<Image>', '<Picture>', '<OptImg>'], 1, 'The Image component from next/image.'),
    m('What is required for remote images in production?', ['Nothing', 'remotePatterns config', 'CDN setup', 'Cloud account'], 1, 'remotePatterns in next.config.js is required.'),
    m('What does the priority prop do?', ['Reduces quality', 'Skips lazy loading', 'Converts format', 'Adds border'], 1, 'Priority skips lazy loading for above-fold images.'),
    m('What modern formats does next/image support?', ['GIF/BMP', 'WebP/AVIF', 'TIFF/SVG', 'ICO'], 1, 'Converts to WebP and AVIF based on browser support.'),
    m('What does the fill prop do?', ['Repeats image', 'Fills parent container', 'Fills with color', 'Stretches'], 1, 'fill makes the image fill its positioned parent.'),
    m('Purpose of blurDataURL?', ['Blur effect', 'Placeholder while loading', 'Background blur', 'Thumbnail'], 1, 'blurDataURL shows a blurred preview while the full image loads.')
  ]
);

/* =================== TOPIC 15: CACHING =================== */
addTopic('nextjs-caching', 'Caching', 'advanced', 30,
  [
    'Next.js has a multi-layered caching system: Full Route Cache (HTML), Data Cache (fetch results), Router Cache (client RSC payloads), and React Cache (request dedup).',
    'Full Route Cache stores static HTML at build time, served from CDN instantly. Data Cache persists fetch() results across deployments with time-based or on-demand revalidation.',
    'Router Cache caches RSC payloads client-side for instant back/forward navigation. React Cache deduplicates fetch calls within a single render pass.',
    'Each layer is independently configurable: use no-store, dynamic, revalidate, or revalidateTag/revalidatePath to control behavior.'
  ],
  'Next.js caching is like a multi-level warehouse: the fastest items are at the front counter (Router Cache), daily stock is in the main hall (Data Cache), and the full inventory is in the basement (Full Route Cache).',
  [
    d('Full Route Cache', 'Stores rendered HTML at build time for static routes. Served from CDN with zero server processing. Pages using cookies(), headers(), or searchParams skip this layer. Controlled by export const dynamic.'),
    d('Data Cache', 'Stores fetch() responses. Persists across deploys. Revalidates via next.revalidate in fetch options (time-based) or revalidateTag/revalidatePath (on-demand). Controlled by cache option in fetch().'),
    d('Router Cache (Client Cache)', 'In-memory cache of RSC payloads. Prefetches visible links. Enables instant client-side transitions. Duration controlled by Cache-Control header (30s default for static pages). Cleared on full reload.'),
    d('React Cache (Request Dedup)', 'React.cache() memoizes async functions within one render pass. If two components fetch the same URL, one request is made. Automatic for fetch() in Next.js. Extend to DB queries with React.cache().'),
    d('Cache Configuration', 'Opt out of Data Cache: fetch(url, { cache: "no-store" }). Opt out of Full Route Cache: export const dynamic = "force-dynamic" or use dynamic functions. On-Demand ISR: revalidatePath() or revalidateTag().')
  ],
  'Understanding the multi-layered cache is essential for Next.js performance. Static content benefits from aggressive defaults; dynamic apps need selective opt-outs. Each layer serves a distinct purpose and is independently configurable.',
  [
    q('What are the four cache layers?', 'Full Route Cache (HTML at build time), Data Cache (fetch results), Router Cache (client-side RSC), React Cache (render-pass dedup).'),
    q('What is the Full Route Cache?', 'Stores static HTML at build time, served from CDN. Skipped for dynamic pages (those using cookies, headers, searchParams, or force-dynamic).'),
    q('What is the Data Cache?', 'Persists fetch() responses across requests and deployments. Revalidated via next.revalidate (time-based) or revalidatePath/revalidateTag (on-demand).'),
    q('What is the Router Cache?', 'Client-side in-memory cache of RSC payloads. Prefetches links for instant navigation. Duration set by Cache-Control header.'),
    q('How to opt out of Data Cache?', 'fetch(url, { cache: "no-store" }) or fetch(url, { next: { revalidate: 0 } }).'),
    q('How to opt out of Full Route Cache?', 'Use cookies(), headers(), or searchParams in the page, or export const dynamic = "force-dynamic".'),
    q('What is React.cache() for?', 'Memoizes function calls within a single render pass. Prevents duplicate DB queries when multiple components fetch the same data.'),
    q('How long does Router Cache last?', 'Static pages: 30s default. Dynamic pages: 0s (no cache). Cleared on full page reload.'),
    q('How does On-Demand ISR work?', 'Call revalidatePath("/path") or revalidateTag("tag") from Server Actions or Route Handlers. Instantly invalidates cache for matched routes.'),
    q('How to debug caching issues?', 'Check build output (static vs dynamic). Use console.log in revalidation. Check DevTools network tab. Review Cache-Control headers in responses.')
  ],
  R(10,35,130,35,'#0070f3','','Full Route','HTML (CDN)') +
  R(10,80,130,35,'#28a745','','Data Cache','fetch()') +
  R(10,125,130,35,'#ffc107','','Router Cache','Client RSC') +
  R(10,170,130,35,'#6610f2','','React Cache','Dedup') +
  A(140,53,170,53) + A(140,98,170,98) + A(140,143,170,143) + A(140,188,170,188) +
  R(180,35,200,170,'#e83e8c','','Control','revalidate / no-store / dynamic') +
  T(250,225,'Caching: Four independent cache layers for HTML, data, client navigation, and request dedup.',9,'#666','middle'),
  [
    e('Opt Out Data Cache', 'Fresh data every request.', codeBlock([
      'export default async function Page() {',
      '  const data = await fetch("https://api.example.com/data", { cache: "no-store" });',
      '  return <div>{await data.text()}</div>',
      '}'
    ]), 'cache: "no-store" bypasses Data Cache entirely.'),
    e('Time-Based Revalidation', 'ISR-style caching.', codeBlock([
      'const data = await fetch("https://api.example.com/data", {',
      '  next: { revalidate: 60 }',
      '});'
    ]), 'Revalidates Data Cache at most once per 60 seconds.'),
    e('On-Demand Revalidation', 'Webhook-triggered.', codeBlock([
      'import { revalidateTag } from "next/cache";',
      'export async function POST(request) {',
      '  revalidateTag("products");',
      '  return Response.json({ revalidated: true });',
      '}'
    ]), 'Invalidates all fetch calls tagged with "products".'),
    e('Dynamic Rendering', 'Opt out of Full Route Cache.', codeBlock([
      'export const dynamic = "force-dynamic";',
      'export default async function Page() {',
      '  const data = await fetch("https://api.example.com/data");',
      '  return <div>{await data.text()}</div>',
      '}'
    ]), 'Forces server-side rendering on every request.'),
    e('React.cache() for DB Queries', 'Deduplicate database calls.', codeBlock([
      'import { cache } from "react";',
      'export const getPosts = cache(async () => {',
      '  const posts = await db.query("SELECT * FROM posts");',
      '  return posts;',
      '});'
    ]), 'Memoizes the DB query within one render pass, preventing duplicates.')
  ],
  [
    m('How many cache layers does Next.js have?', ['Two', 'Three', 'Four', 'Five'], 2, 'Four: Full Route, Data, Router, and React Cache.'),
    m('What stores static HTML at build time?', ['Data Cache', 'Full Route Cache', 'Router Cache', 'React Cache'], 1, 'Full Route Cache stores static HTML at build time.'),
    m('How do you skip the Data Cache?', ['dynamic="force-dynamic"', 'cache: "no-store" in fetch', 'useSearchParams()', 'revalidatePath()'], 1, 'cache: "no-store" in fetch options skips Data Cache.'),
    m('What does React.cache() do?', ['Persists to disk', 'Deduplicates per render pass', 'Caches in browser', 'Stores in CDN'], 1, 'React.cache() deduplicates calls within one render pass.'),
    m('How long does Router Cache store static pages?', ['Indefinitely', '30 seconds default', '1 hour', 'Never caches'], 1, 'Router Cache caches static pages for 30 seconds by default.'),
    m('Which function triggers On-Demand ISR?', ['refreshCache()', 'revalidatePath()', 'clearData()', 'resetCache()'], 1, 'revalidatePath() and revalidateTag() trigger On-Demand ISR.')
  ]
);

/* =================== TOPIC 16: STREAMING =================== */
addTopic('nextjs-streaming', 'Streaming', 'advanced', 30,
  [
    'Streaming allows sending HTML progressively from the server to the client as it is rendered, improving perceived performance and Time to First Byte.',
    'In the App Router, streaming is automatic when using Suspense boundaries with async Server Components inside.',
    'Streaming eliminates the "all-or-nothing" problem of SSR where the page blocks until all data is fetched, sending static shell content immediately.',
    'Works with the Edge Runtime for globally distributed streaming with low latency.'
  ],
  'Streaming is like a buffet where food is brought out as it is cooked rather than waiting for every dish to be ready before anyone can eat. You start with soup (the page shell), then get the main course (content) as it finishes.',
  [
    d('How Streaming Works', 'The server sends the HTML shell immediately while continuing to render async components. As each Suspense boundary resolves, its HTML is streamed to the client. React progressively hydrates streamed content. The user sees content loading in order, not all at once.'),
    d('Streaming with Suspense', 'Wrap async Server Components in Suspense boundaries. Each boundary can have its own fallback (loading spinner, skeleton). The boundary content streams in when ready. Multiple boundaries can stream in parallel, independent of each other.'),
    d('Streaming Benefits', 'Faster Time to First Byte (shell is immediate), progressive content delivery (users see content as it arrives), independent loading per section (one slow query doesnt block the whole page), and better Core Web Vitals (FCP improves significantly).'),
    d('Streaming vs SSR', 'Traditional SSR sends the complete page after all data is fetched. Streaming sends HTML in chunks as each component resolves. Streaming eliminates the "request waterfall" where all data must be fetched before any HTML is sent.'),
    d('Streaming and SEO', 'Streamed content is fully indexed by search engines. Googlebot processes streamed HTML as it arrives. The initial shell includes metadata and key content for indexing. Streaming does not negatively impact SEO.')
  ],
  'Streaming is one of the most impactful performance features in Next.js App Router. By eliminating blocking data fetches, it dramatically improves perceived performance. The key is strategic Suspense boundary placement around slower data dependencies.',
  [
    q('What is Streaming in Next.js?', 'Streaming sends HTML from server to client progressively as it renders. The page shell is sent immediately, and async content streams in as Suspense boundaries resolve. This improves perceived performance and FCP.'),
    q('How do you implement streaming?', 'Wrap async Server Components in Suspense boundaries. Each boundary streams independently when its data is ready. Next.js App Router handles streaming automatically when Suspense is used.'),
    q('What are the benefits of streaming?', 'Instant page shell, progressive content loading, independent section loading (one slow query does not block others), improved FCP and LCP, and better user perceived performance.'),
    q('How is streaming different from SSR?', 'SSR sends the complete HTML after all data fetches complete. Streaming sends HTML in chunks as components resolve. Streaming eliminates the all-or-nothing blocking of traditional SSR.'),
    q('Does streaming affect SEO?', 'No, streaming does not negatively impact SEO. Googlebot processes streamed HTML as it arrives. Metadata and key content in the initial shell are indexed normally.'),
    q('Can you use streaming with the Pages Router?', 'No, streaming is only available in the App Router. The Pages Router uses traditional SSR. Migrate to the App Router to leverage streaming.'),
    q('How does streaming work with loading.js?', 'loading.js creates an automatic Suspense boundary for a route segment. The loading component is shown immediately, and the page content streams in when ready. It is the simplest way to add streaming.'),
    q('What happens to streamed content hydration?', 'React progressively hydrates streamed HTML as it arrives. Each chunk is hydrated independently without waiting for the full stream. This means interactive elements become usable as soon as their chunk arrives.'),
    q('What runtime is required for streaming?', 'Streaming works with both the Node.js Runtime and the Edge Runtime. Edge Runtime provides globally distributed streaming with lower latency for the initial shell.'),
    q('How do you handle errors in streaming?', 'Use error.js for error boundaries at the route segment level. If a streamed component throws, the error boundary for that segment replaces the streamed content with the error fallback UI.')
  ],
  R(10,40,140,35,'#0070f3','','Server starts','Sends shell') +
  A(150,58,180,58) +
  R(190,40,140,35,'#28a745','','Suspense A','Queries data') +
  R(190,90,140,35,'#ffc107','','Suspense B','Queries data') +
  A(190,75,190,90) +
  A(330,58,360,58) + A(330,108,360,108) +
  R(370,40,100,85,'#17a2b8','','Stream','Chunks sent') +
  A(370,125,370,145) +
  R(230,155,130,35,'#6610f2','','Client','Renders progressively') +
  T(250,210,'Streaming: HTML sent progressively as Suspense boundaries resolve, improving FCP and perceived load.',9,'#666','middle'),
  [
    e('Basic Streaming with Suspense', 'Page with loading shell and streamed content.', codeBlock([
      'import { Suspense } from "react";',
      '',
      'async function SlowPosts() {',
      '  const posts = await fetch("https://api.example.com/posts");',
      '  return (await posts.json()).map(p => <div key={p.id}>{p.title}</div>);',
      '}',
      '',
      'export default function Page() {',
      '  return (',
      '    <div>',
      '      <h1>My Blog</h1>',
      '      <Suspense fallback={<div>Loading posts...</div>}>',
      '        <SlowPosts />',
      '      </Suspense>',
      '    </div>',
      '  );',
      '}'
    ]), 'The heading renders immediately; posts stream in when fetched.'),
    e('Multiple Suspense Boundaries', 'Independent sections streaming in parallel.', codeBlock([
      'export default function Dashboard() {',
      '  return (',
      '    <div>',
      '      <h1>Dashboard</h1>',
      '      <Suspense fallback={<div>Loading stats...</div>}>',
      '        <Stats />',
      '      </Suspense>',
      '      <Suspense fallback={<div>Loading activity...</div>}>',
      '        <ActivityFeed />',
      '      </Suspense>',
      '    </div>',
      '  );',
      '}'
    ]), 'Stats and Activity stream independently without blocking each other.'),
    e('Using loading.js', 'Route-level automatic streaming.', codeBlock([
      '// app/dashboard/loading.js',
      'export default function Loading() {',
      '  return <div className="skeleton">Loading dashboard...</div>',
      '}',
      '',
      '// app/dashboard/page.js',
      'export default async function DashboardPage() {',
      '  const data = await fetchDashboardData();',
      '  return <div>{/* render data */}</div>',
      '}'
    ]), 'loading.js creates an automatic Suspense boundary for the dashboard route.'),
    e('Streaming with Nested Suspense', 'Prioritize critical content.', codeBlock([
      'export default function ProductPage() {',
      '  return (',
      '    <div>',
      '      <Suspense fallback={<div>Loading...</div>}>',
      '        <ProductInfo /> {/* Critical - streams first */}',
      '      </Suspense>',
      '      <Suspense fallback={<div>Loading...</div>}>',
      '        <RelatedProducts /> {/* Less critical - streams later */}',
      '      </Suspense>',
      '    </div>',
      '  );',
      '}'
    ]), 'Product info streams before related products.'),
    e('Streaming Error Handling', 'Error boundary with streamed content.', codeBlock([
      '// app/products/error.js',
      '"use client";',
      'export default function Error({ error, reset }) {',
      '  return <div><h2>Failed to load</h2><button onClick={reset}>Retry</button></div>',
      '}'
    ]), 'If a streamed segment errors, the error boundary replaces it with fallback UI.')
  ],
  [
    m('What enables streaming in the App Router?', ['Server Components', 'Suspense boundaries', 'Route Handlers', 'Middleware'], 1, 'Suspense boundaries around async Server Components enable streaming.'),
    m('What does streaming improve most?', ['SEO', 'Perceived performance and FCP', 'Bundle size', 'Database queries'], 1, 'Streaming improves perceived performance and First Contentful Paint.'),
    m('How is streaming different from SSR?', ['Streaming sends HTML in chunks', 'They are the same', 'SSR is faster', 'Streaming blocks rendering'], 0, 'Streaming sends HTML progressively instead of waiting for all data.'),
    m('What does loading.js provide?', ['API routes', 'Automatic Suspense boundary', 'Database connection', 'Authentication'], 1, 'loading.js creates an automatic Suspense boundary for the route segment.'),
    m('Does streaming affect SEO?', ['Yes, negatively', 'No, it is SEO-friendly', 'Prevents indexing', 'Requires extra config'], 1, 'Streaming is SEO-friendly. Googlebot processes streamed HTML.'),
    m('Which runtimes support streaming?', ['Node.js only', 'Edge only', 'Both Node.js and Edge', 'Neither'], 2, 'Both Node.js and Edge Runtime support streaming.')
  ]
);

/* =================== TOPIC 17: AUTHENTICATION =================== */
addTopic('nextjs-authentication', 'Authentication in Next.js', 'advanced', 35,
  [
    'Authentication in Next.js involves securing pages, API routes, and Server Actions using middleware, session tokens, JWT, or third-party providers (NextAuth.js / Auth.js).',
    'Middleware is the primary layer for protecting routes, checking authentication before the page renders and redirecting unauthenticated users.',
    'Server Components handle auth by reading session cookies or tokens server-side, conditionally rendering content based on auth state.',
    'Client Components handle interactive auth flows (login forms, social login buttons) and display user-specific UI based on session status.'
  ],
  'Authentication is like having a membership card system: middleware is the bouncer at the door checking cards, Server Components are the employees who check your card before serving you, and Client Components are the interactive kiosks where you sign up for a new card.',
  [
    d('Authentication with Middleware', 'Middleware checks auth tokens/cookies before the request reaches the page. Use NextResponse.redirect() to send unauthenticated users to login. Use matcher config to protect specific route patterns. Middleware runs at the edge for low-latency auth checks.'),
    d('Server-Side Auth in Server Components', 'Read session cookies or tokens using cookies() from next/headers. Fetch user data from database or auth provider. Conditionally render content based on auth state. Server Components handle the data side of auth without exposing logic to the client.'),
    d('Client-Side Auth', 'Use Client Components for login forms, social login buttons, and auth UI. Use React context or state management for client-side auth state. Call Server Actions or Route Handlers for login/logout operations. Display user-specific UI based on session.'),
    d('Third-Party Auth Providers (Auth.js)', 'Auth.js (formerly NextAuth.js) provides built-in providers (Google, GitHub, email, credentials). Configure in a Route Handler. Use middleware for session checks. Provides useSession hook for client-side auth state and getServerSession for server-side.'),
    d('JWT vs Database Sessions', 'JWT: stateless, stored in cookies, no DB lookup on each request, good for performance, harder to revoke. Database sessions: stateful, stored in DB, easy to revoke, requires DB lookup on each request, good for apps needing session management.')
  ],
  'Authentication in Next.js requires coordinating middleware, Server Components, and Client Components. Middleware provides the first line of defense, Server Components handle data-level auth, and Client Components manage interactive auth flows. Auth.js simplifies the process significantly.',
  [
    q('How do you protect routes in Next.js?', 'Use middleware to check authentication before the request reaches the page. Middleware runs at the edge and can redirect unauthenticated users. Use matcher config to specify protected routes.'),
    q('How does middleware handle authentication?', 'Middleware checks for session cookies or tokens. If missing, redirects to login. If present and valid, allows the request to proceed. Middleware is the most efficient auth layer because it runs before rendering.'),
    q('How do Server Components handle auth?', 'Read session cookies with cookies() from next/headers. Fetch full user data server-side. Conditionally render content or redirect. Server Components keep auth logic secure and server-side.'),
    q('How do Client Components handle auth?', 'Display login forms, social login buttons, and user profile UI. Use Auth.js useSession hook for client-side auth state. Call Server Actions for login/logout. Display different UI based on session status.'),
    q('What is Auth.js (NextAuth.js)?', 'A complete authentication library for Next.js supporting multiple providers (Google, GitHub, email, credentials). Provides middleware helpers, Server Component helpers (getServerSession), and Client Component hooks (useSession).'),
    q('What is the difference between JWT and database sessions?', 'JWT: stateless, stored in cookie, no DB required, faster, harder to revoke. Database sessions: stored in DB, easy to revoke, requires DB query on each request, more secure for sensitive apps.'),
    q('How do you handle login form submissions?', 'Use a Server Action that validates credentials, creates a session, and sets cookies. The form uses progressive enhancement. On success, redirect to the protected page. On failure, return validation errors.'),
    q('How do you implement role-based access control?', 'In middleware, check user role from session. In Server Components, check role before rendering. In Route Handlers, verify permissions. Use a higher-order component pattern or auth utility functions.'),
    q('How does OAuth work in Next.js?', 'Configure OAuth provider (Google, GitHub) in Auth.js. The provider redirects to their consent screen. On success, they redirect back to a callback URL. Auth.js handles the OAuth flow and creates a session.'),
    q('How do you handle auth in API routes and Route Handlers?', 'In Routes Handlers, use getServerSession from Auth.js or read auth tokens from cookies/Authorization header. Validate permissions before processing the request. Return 401 for unauthorized, 403 for forbidden.')
  ],
  R(10,40,120,35,'#0070f3','','Middleware','Check Token') +
  A(130,58,160,58) +
  R(170,40,120,35,'#28a745','','Server Component','Fetch User') +
  R(170,90,120,35,'#ffc107','','Client Component','Login UI') +
  A(290,58,320,58) + A(290,108,320,108) +
  R(330,40,140,85,'#17a2b8','','Auth.js','getServerSession / useSession') +
  A(330,125,330,145) +
  R(230,155,140,35,'#6610f2','','Protected Page','Content') +
  T(250,210,'Authentication: Middleware for route protection, Server Components for auth logic, Client Components for login UI.',9,'#666','middle'),
  [
    e('Auth Middleware', 'Protect dashboard routes.', codeBlock([
      '// middleware.ts',
      'import { NextResponse } from "next/server";',
      '',
      'export function middleware(request) {',
      '  const token = request.cookies.get("session");',
      '  if (!token) {',
      '    return NextResponse.redirect(new URL("/login", request.url));',
      '  }',
      '  return NextResponse.next();',
      '}',
      '',
      'export const config = { matcher: ["/dashboard/:path*"] };'
    ]), 'Redirects unauthenticated users from /dashboard/* to /login.'),
    e('Server-Side Session Check', 'Read session in Server Component.', codeBlock([
      'import { getServerSession } from "next-auth";',
      'import { authOptions } from "@/lib/auth";',
      '',
      'export default async function Dashboard() {',
      '  const session = await getServerSession(authOptions);',
      '  if (!session) return <div>Access denied</div>;',
      '  return <div>Welcome {session.user.name}</div>;',
      '}'
    ]), 'Checks session server-side using Auth.js getServerSession.'),
    e('Client-Side Auth with Auth.js', 'Use session in Client Component.', codeBlock([
      '"use client";',
      'import { useSession, signIn, signOut } from "next-auth/react";',
      '',
      'export default function AuthButton() {',
      '  const { data: session } = useSession();',
      '  if (session) {',
      '    return <button onClick={() => signOut()}>Sign out {session.user.name}</button>;',
      '  }',
      '  return <button onClick={() => signIn()}>Sign in</button>;',
      '}'
    ]), 'useSession provides client-side auth state; signIn/signOut handle login flow.'),
    e('Login Server Action', 'Handle form login.', codeBlock([
      '"use server";',
      'import { signIn } from "@/auth";',
      '',
      'export async function login(prevState, formData) {',
      '  try {',
      '    await signIn("credentials", formData);',
      '    return { success: true };',
      '  } catch (error) {',
      '    return { error: "Invalid credentials" };',
      '  }',
      '}'
    ]), 'Server Action handles credential validation and session creation.'),
    e('Role-Based Access in Server Component', 'Admin-only content.', codeBlock([
      'export default async function AdminPanel() {',
      '  const session = await getServerSession(authOptions);',
      '  if (session?.user?.role !== "admin") {',
      '    return <div>Admin access required</div>;',
      '  }',
      '  return <div>Admin panel content</div>;',
      '}'
    ]), 'Checks user role before rendering admin-only content.')
  ],
  [
    m('What is the first line of defense for auth in Next.js?', ['Server Components', 'Middleware', 'Client Components', 'API Routes'], 1, 'Middleware runs first and can redirect unauthenticated requests before rendering.'),
    m('Which Auth.js function reads session server-side?', ['useSession', 'getServerSession', 'getSession', 'session()'], 1, 'getServerSession reads the session on the server.'),
    m('Which Auth.js hook provides client-side session state?', ['getServerSession', 'useSession', 'useAuth', 'session()'], 1, 'useSession provides client-side session state in Client Components.'),
    m('How does JWT session differ from database sessions?', ['JWT is stateful', 'JWT is stateless', 'They are identical', 'JWT requires DB'], 1, 'JWT is stateless (stored in cookie), database sessions are stateful (stored in DB).'),
    m('What does middleware use to protect routes?', ['Session token/cookie check', 'Database query', 'API call', 'Client-side redirect'], 0, 'Middleware checks tokens or cookies to determine authentication status.'),
    m('What status code should a Route Handler return for unauthorized access?', ['200', '401', '500', '302'], 1, '401 Unauthorized for missing/invalid authentication.')
  ]
);

/* =================== TOPIC 18: DEPLOYMENT ON VERCEL =================== */
addTopic('nextjs-deployment-vercel', 'Deployment on Vercel', 'beginner', 25,
  [
    'Vercel is the official deployment platform for Next.js, providing automatic builds, serverless functions, edge functions, ISR, and global CDN distribution.',
    'Deploy by connecting a Git repository (GitHub, GitLab, Bitbucket) to Vercel, with automatic deployments on every push to the default branch.',
    'Preview Deployments are created for every pull request, allowing testing before merging to production.',
    'Environment variables, custom domains, analytics, and logs are managed through the Vercel Dashboard or vercel.json configuration.'
  ],
  'Vercel is like a self-publishing platform for websites. You connect your code repository, and Vercel automatically builds, optimizes, and hosts your site worldwide, creating preview versions for every change before it goes live.',
  [
    d('Deployment Process', 'Connect your Git repository to Vercel. Vercel automatically detects Next.js, sets up the build command (next build), and configures the output directory. Every push to the production branch triggers a deployment. Preview deployments are created for non-production branches.'),
    d('Serverless Functions', 'API routes and Route Handlers are automatically deployed as serverless functions. Each endpoint scales independently based on demand. Serverless functions have cold starts (mitigated by the Edge Runtime for low-latency use cases). Node.js and Edge runtimes are supported.'),
    d('ISR and Cache Management', 'ISR pages are revalidated by Vercel\'s edge network. On-demand ISR (revalidatePath) triggers instant regeneration. The Vercel Data Cache stores fetch() results. Cache headers can be customized for CDN behavior.'),
    d('Environment Variables', 'Configure environment variables in the Vercel Dashboard or .env files. Production, Preview, and Development environments can have different values. NEXT_PUBLIC_ variables are inlined into client bundles. Sensitive variables are encrypted at rest.'),
    d('Monitoring and Analytics', 'Vercel provides built-in analytics (page views, web vitals), function logs, and error tracking. Speed Insights measures real-user performance. Analytics are privacy-friendly and cookie-free. Logs can be viewed per deployment or streamed to external services.')
  ],
  'Vercel provides the best deployment experience for Next.js applications with automatic optimizations, global distribution, and zero-config setup. Understanding the deployment process, environment variables, and monitoring capabilities is essential for production Next.js applications.',
  [
    q('How do you deploy a Next.js app to Vercel?', 'Push your code to a Git repository (GitHub, GitLab, Bitbucket), import the repository in Vercel, and Vercel automatically detects Next.js and configures the build. Deployments are automatic on every push to the production branch.'),
    q('What are Preview Deployments?', 'Preview Deployments are created for every pull request and non-production branch. They provide a unique URL for testing changes before merging to production. Preview Deployments include serverless functions and environment variables.'),
    q('How does Vercel handle API routes?', 'API routes and Route Handlers are automatically deployed as serverless functions. Each endpoint scales independently. Functions have configurable memory, timeout, and region settings. Edge functions provide globally distributed execution.'),
    q('How does ISR work on Vercel?', 'ISR pages are cached on Vercel\'s edge network. Revalidation is triggered by time-based or on-demand methods. The Vercel Data Cache stores fetch() responses. ISR works seamlessly without additional Vercel-specific configuration.'),
    q('How do you configure environment variables on Vercel?', 'Set environment variables in the Vercel Dashboard under Project Settings > Environment Variables. Separate values for Production, Preview, and Development. Variables prefixed with NEXT_PUBLIC_ are available client-side.'),
    q('What is vercel.json?', 'A configuration file at the project root for customizing Vercel behavior: build commands, headers, redirects, rewrites, function regions, and cron jobs. Overrides automatic detection and framework defaults.'),
    q('How does Vercel handle custom domains?', 'Add custom domains in the Vercel Dashboard under Domains. Vercel automatically provisions SSL certificates via Let\'s Encrypt. Supports apex domains (example.com), subdomains (app.example.com), and wildcard domains (*.example.com).'),
    q('What analytics does Vercel provide?', 'Web Analytics: page views, unique visitors, top pages. Speed Insights: real-user Core Web Vitals (LCP, CLS, INP). Both are privacy-friendly, cookie-free, and GDPR-compliant. Enable in the Vercel Dashboard.'),
    q('How do you debug production issues on Vercel?', 'Use Vercel Logs (Runtime Logs and Build Logs). Check function execution logs for errors. Use Speed Insights for performance issues. Set up error monitoring with third-party services (Sentry, Datadog). Enable Vercel Integrations for external monitoring.'),
    q('How does Vercel handle serverless function cold starts?', 'Cold starts occur when a function has not been invoked recently. Mitigations: use Edge Runtime (near-zero cold starts), increase function memory allocation, use cron jobs to keep functions warm, or implement function concurrency settings.')
  ],
  R(10,40,140,35,'#0070f3','','Git Push','Code trigger') +
  A(150,58,180,58) +
  R(190,40,140,35,'#28a745','','Vercel Build','next build') +
  A(330,58,360,58) +
  R(370,40,100,35,'#ffc107','','Deploy','Serverless') +
  A(370,75,370,95) +
  R(230,105,140,35,'#17a2b8','','CDN Edge','Global') +
  R(10,105,140,35,'#6610f2','','Preview','PR URL') +
  T(250,170,'Vercel: Automatic Git-integrated deployment with serverless functions, ISR, and global CDN.',9,'#666','middle'),
  [
    e('vercel.json Configuration', 'Custom build and routing config.', codeBlock([
      '{',
      '  "buildCommand": "next build",',
      '  "outputDirectory": ".next",',
      '  "installCommand": "npm install",',
      '  "regions": ["iad1", "sfo1"],',
      '  "headers": [',
      '    {',
      '      "source": "/(.*)",',
      '      "headers": [',
      '        { "key": "X-Frame-Options", "value": "DENY" }',
      '      ]',
      '    }',
      '  ]',
      '}'
    ]), 'Configures build settings, serverless function regions, and custom response headers.'),
    e('Environment Variables', 'Setting env vars per environment.', codeBlock([
      '# .env.local (local development)',
      'DATABASE_URL="postgres://localhost:5432/mydb"',
      'NEXT_PUBLIC_API_URL="http://localhost:3000"',
      '',
      '# Vercel Dashboard (production)',
      'DATABASE_URL="postgres://prod:password@prod-host:5432/mydb"',
      'NEXT_PUBLIC_API_URL="https://example.com"'
    ]), 'Different values for local, preview, and production environments.'),
    e('Custom Domain Setup', 'Add a custom domain.', codeBlock([
      '// Vercel Dashboard > Domains',
      '// Add: example.com',
      '// Add: www.example.com',
      '',
      '// DNS Configuration (DNS provider)',
      '// A record: example.com -> 76.76.21.21',
      '// CNAME: www.example.com -> cname.vercel-dns.com'
    ]), 'Vercel automatically provisions SSL and handles DNS routing.'),
    e('Preview Deployment URL', 'Accessing PR previews.', codeBlock([
      '// Each PR gets a unique URL:',
      '// https://my-app-git-feature-branch-username.vercel.app',
      '',
      '// Or custom preview domain:',
      '// https://feature-branch.my-domain.com'
    ]), 'Preview deployments provide sandboxed URLs for testing changes.'),
    e('Analytics Integration', 'Enable analytics.', codeBlock([
      '// Vercel Dashboard > Analytics > Enable',
      '',
      '// OR via vercel.json:',
      '{ "analytics": { "speedInsights": true, "webAnalytics": true } }'
    ]), 'Enables privacy-friendly analytics and real-user speed metrics.')
  ],
  [
    m('What triggers a production deployment on Vercel?', ['Manual only', 'Push to default branch', 'Weekly schedule', 'Build button'], 1, 'Pushing to the default branch (main/master) triggers automatic production deployment.'),
    m('What are Preview Deployments?', ['Production deployments', 'Per-PR deployments for testing', 'Staging only', 'Local builds'], 1, 'Preview Deployments are created for each pull request with a unique URL.'),
    m('How does Vercel handle API routes?', ['As static files', 'As serverless functions', 'As edge workers', 'Not supported'], 1, 'API routes are automatically deployed as serverless functions.'),
    m('Where do you configure environment variables?', ['.env file only', 'Vercel Dashboard', 'next.config.js', 'vercel.json'], 1, 'Environment variables are configured in the Vercel Dashboard under Project Settings.'),
    m('What is vercel.json used for?', ['Package management', 'Build and routing configuration', 'Database setup', 'Authentication'], 1, 'vercel.json customizes build commands, headers, redirects, and function configuration.'),
    m('What SSL support does Vercel provide?', ['Manual SSL only', 'Automatic Let\'s Encrypt SSL', 'No SSL', 'Paid SSL only'], 1, 'Vercel automatically provisions and renews SSL certificates via Let\'s Encrypt.')
  ]
);

/* =================== OUTPUT =================== */
// Generate topics-data.js (embedded TOPICS_DATA)
var dataJs = 'var TOPICS_DATA = TOPICS_DATA || {};\n';
dataJs += 'TOPICS_DATA["nextjs"] = TOPICS_DATA["nextjs"] || {};\n\n';
for (var id in topics) {
  var t = topics[id];
  var json = JSON.stringify(t, null, 2)
    .replace(/'/g, "\\'")
    .replace(/\\"/g, '"')
    .replace(/^\{/m, '{\n  ')
    .replace(/\n\s*"tldr"/, '\n  "tldr"');
  dataJs += 'TOPICS_DATA["nextjs"]["' + id + '"] = ' + JSON.stringify(t, null, 2) + ';\n\n';
}
fs.writeFileSync('topics-data.js', dataJs, 'utf8');
console.log('Generated topics-data.js');

// Generate topics.json (metadata index)
var metaList = topicList.map(function(t) {
  return { id: t.id, title: t.title, difficulty: t.difficulty, estimatedMinutes: t.estimatedMinutes, file: t.file };
});
fs.writeFileSync('topics.json', JSON.stringify(metaList, null, 2), 'utf8');
console.log('Generated topics.json');

console.log('Total topics: ' + topicList.length);

