var TOPICS_DATA = TOPICS_DATA || {};
TOPICS_DATA["nextjs"] = TOPICS_DATA["nextjs"] || {};

TOPICS_DATA["nextjs"]["nextjs-app-router"] = {
  "id": "nextjs-app-router",
  "title": "App Router",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,
  "tldr": [
    "The App Router is the new routing paradigm introduced in Next.js 13, built on React Server Components and nested layouts.",
    "Uses a file-system based routing where folders define route segments and special files (page.js, layout.js, loading.js, error.js) define the UI for each segment.",
    "Supports nested layouts, loading states (suspense boundaries), error boundaries, and parallel routes out of the box.",
    "All components in the App Router are Server Components by default, improving initial page load performance."
  ],
  "laymanDefinition": "The App Router is like a filing cabinet where every folder is a URL path, and each folder can contain specific files that tell Next.js what to show, how to load data, and how to handle errors.",
  "deepDive": [
    {
      "heading": "File-System Routing Convention",
      "text": "In the App Router, the directory structure directly maps to URL paths. Each folder represents a route segment, and special files define the behavior: page.js (public UI), layout.js (shared wrapper), loading.js (loading fallback), error.js (error boundary), and not-found.js (404 page). This convention eliminates manual route configuration."
    },
    {
      "heading": "Nested Layouts and Templates",
      "text": "Layouts wrap child routes and persist across navigations, avoiding re-renders. Multiple layouts can be nested hierarchically. Templates (template.js) are similar but remount on every navigation, useful for animations or state that should reset per route. Layouts can fetch data and share it with their children."
    },
    {
      "heading": "Loading and Error Boundaries",
      "text": "The App Router automatically wraps page segments in React Suspense boundaries when loading.js is provided. Error boundaries (error.js) catch errors in the segment and its children, showing fallback UI. Both can be nested at any level for granular control."
    },
    {
      "heading": "Parallel and Intercepting Routes",
      "text": "Parallel routes (defined with @folder convention) render multiple independent views in the same layout simultaneously, useful for dashboards. Intercepting routes (defined with (.)folder) intercept navigation from a matching parent route, enabling patterns like modals that work with URL sharing."
    },
    {
      "heading": "Route Groups and Private Folders",
      "text": "Route groups (folders wrapped in parentheses like (marketing)) organize routes without affecting the URL path. Private folders (prefixed with _) exclude a folder and its children from routing entirely. Both help maintain a clean project structure without impacting the public URL structure."
    }
  ],
  "interviewAnswer": "The App Router revolutionizes Next.js routing by embracing React Server Components, nested layouts, and file-system conventions. It reduces boilerplate, improves performance through automatic code splitting and suspense boundaries, and provides a more intuitive mental model compared to the Pages Router. Key advantages include automatic streaming, granular error handling, and co-located data fetching within components.",
  "interviewQuestions": [
    {
      "question": "What is the App Router in Next.js?",
      "answer": "The App Router is the modern routing system in Next.js 13+, built on React Server Components. It uses a file-system based routing convention where folders define URL path segments and special files (page.js, layout.js, loading.js, etc.) define the UI for each segment. It supports nested layouts, streaming, error boundaries, and server components by default."
    },
    {
      "question": "How does the App Router differ from the Pages Router?",
      "answer": "The App Router uses a new file convention (page.js, layout.js) instead of index.js. It supports nested layouts that persist across navigations, automatic loading boundaries with loading.js, error boundaries with error.js, and Server Components by default. The Pages Router uses _app.js, _document.js, and getServerSideProps/getStaticProps which are replaced by more intuitive patterns in the App Router."
    },
    {
      "question": "What special files are used in the App Router?",
      "answer": "page.js (route UI), layout.js (shared wrapper), loading.js (loading fallback), error.js (error boundary), not-found.js (404 page), template.js (re-mounting layout), default.js (parallel route fallback), and route.js (API routes). Each can be nested at any route segment level."
    },
    {
      "question": "How do nested layouts work in the App Router?",
      "answer": "Layouts are defined by placing layout.js files in route folders. They wrap child routes and persist across navigations, meaning the layout does not re-render when the user navigates between sibling pages. Layouts can fetch data independently using async component functions, and the data persists across navigations within the layout."
    },
    {
      "question": "What are parallel routes in the App Router?",
      "answer": "Parallel routes are defined using the @folder convention (e.g., @analytics, @team). They allow rendering multiple independent views within the same layout simultaneously. Each parallel route segment can have its own loading and error states. They are useful for dashboards, multi-panel views, and complex UI compositions."
    },
    {
      "question": "What are intercepting routes?",
      "answer": "Intercepting routes allow you to load a route from another part of the application within the current context. They use the (.) convention: (.) matches same level, (..) matches one level up, (..)(..) matches two levels up, (...) matches from the root. This is commonly used for modals that display content from another route while preserving the URL."
    },
    {
      "question": "How does data fetching work in the App Router?",
      "answer": "Data fetching is done using async Server Components with the fetch() API. Next.js extends fetch with automatic caching and revalidation. You can use cache() for memoization across components and revalidate data on demand using revalidatePath() or revalidateTag(). The App Router eliminates the need for getServerSideProps and getStaticProps."
    },
    {
      "question": "What are route groups in the App Router?",
      "answer": "Route groups are folders wrapped in parentheses (e.g., (marketing), (shop)). They organize routes logically without affecting the URL path. For example, (marketing)/about/page.js maps to /about, not /marketing/about. They are useful for organizing multiple layouts and segments without polluting the URL structure."
    },
    {
      "question": "How does the App Router handle metadata?",
      "answer": "The App Router supports the Metadata API, which allows defining metadata (title, description, Open Graph, etc.) using exported metadata objects or generateMetadata() functions in page.js and layout.js files. Metadata is automatically injected into the HTML head and supports both static and dynamic generation based on route parameters."
    },
    {
      "question": "What is the difference between a layout and a template in the App Router?",
      "answer": "A layout (layout.js) persists across navigations and does not re-mount. A template (template.js) creates a new instance on each navigation, causing all children to re-mount. Templates are useful for animations that should trigger on every navigation or for components that need to reset state per route (e.g., page-level scroll positions)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">App Router</text><rect x=\"10\" y=\"40\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"60\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/products</text><text x=\"60\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Catalog</text><rect x=\"120\" y=\"40\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"170\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/products/[id]</text><text x=\"170\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Detail</text><rect x=\"230\" y=\"40\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"280\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">layout.js</text><text x=\"280\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Layout</text><rect x=\"340\" y=\"40\" width=\"80\" height=\"40\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"380\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">page.js</text><text x=\"380\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Page</text><rect x=\"430\" y=\"40\" width=\"60\" height=\"40\" rx=\"4\" fill=\"#dc3545\" stroke=\"#dc3545\" stroke-width=\"1\"/><text x=\"460\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">error.js</text><text x=\"460\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Error</text><line x1=\"110\" y1=\"60\" x2=\"120\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"230\" y1=\"60\" x2=\"230\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"110\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"60\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">@sidebar</text><text x=\"60\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Parallel</text><rect x=\"120\" y=\"110\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"170\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">@feed</text><text x=\"170\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Parallel</text><rect x=\"230\" y=\"110\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"280\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">(.)photo</text><text x=\"280\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Intercept</text><text x=\"250\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">App Router: File-system based routing with nested layouts, parallel routes, and intercepting routes.</text></svg>",
  "codeExamples": [
    {
      "title": "Defining a Route with page.js",
      "useCase": "When you need to create a new public page at a specific URL path.",
      "code": "// app/products/page.js\nexport default function ProductsPage() {\n  return <div>Products List</div>\n}",
      "description": "Creates a route at /products with a Server Component that renders the products list."
    },
    {
      "title": "Nested Layout",
      "useCase": "When you want a shared header/nav that persists across pages in a section.",
      "code": "// app/shop/layout.js\nexport default function ShopLayout({ children }) {\n  return (\n    <section>\n      <nav>Shop Navigation</nav>\n      {children}\n    </section>\n  );\n}",
      "description": "Wraps all shop routes with a shared navigation that does not re-render on page changes."
    },
    {
      "title": "Loading UI with loading.js",
      "useCase": "When you want to show a loading spinner immediately while the page loads.",
      "code": "// app/products/loading.js\nexport default function Loading() {\n  return <div className=\"spinner\">Loading products...</div>\n}",
      "description": "Automatically wraps the products page in a Suspense boundary, showing this fallback immediately."
    },
    {
      "title": "Error Boundary with error.js",
      "useCase": "When you need to catch errors gracefully in a specific route segment.",
      "code": "// app/products/error.js\n\"use client\";\nexport default function Error({ error, reset }) {\n  return (\n    <div>\n      <h2>Something went wrong!</h2>\n      <button onClick={reset}>Try again</button>\n    </div>\n  );\n}",
      "description": "Catches errors in the products segment and provides a reset button to retry. Note error.js must be a Client Component."
    },
    {
      "title": "Parallel Routes with @folder",
      "useCase": "When you want to render a dashboard with independent panels.",
      "code": "// app/dashboard/@analytics/page.js\nexport default function Analytics() {\n  return <div>Analytics Panel</div>\n}\n\n// app/dashboard/layout.js\nexport default function Dashboard({ children, analytics, team }) {\n  return (\n    <div className=\"dashboard\">\n      {children}\n      <aside>{analytics}</aside>\n      <aside>{team}</aside>\n    </div>\n  );\n}",
      "description": "Renders analytics and team panels independently, each with their own loading/error states."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What special file is used to define a public route UI in the App Router?",
      "options": [
        "page.js",
        "index.js",
        "route.js",
        "view.js"
      ],
      "answer": 0,
      "explanation": "page.js is the special file that defines the public UI for a route segment in the App Router."
    },
    {
      "question": "How do layouts differ from pages in the App Router?",
      "options": [
        "Layouts re-render on every navigation",
        "Layouts persist across navigations",
        "Layouts can only be used at the root",
        "Layouts replace page.js entirely"
      ],
      "answer": 1,
      "explanation": "Layouts persist across navigations and do not re-render when switching between sibling pages."
    },
    {
      "question": "What convention is used for parallel routes in the App Router?",
      "options": [
        "(folder)",
        "@folder",
        "_folder",
        "[folder]"
      ],
      "answer": 1,
      "explanation": "Parallel routes use the @folder naming convention (e.g., @analytics, @team)."
    },
    {
      "question": "Which file convention creates an automatic Suspense boundary?",
      "options": [
        "error.js",
        "loading.js",
        "template.js",
        "not-found.js"
      ],
      "answer": 1,
      "explanation": "loading.js is automatically wrapped in a Suspense boundary by Next.js."
    },
    {
      "question": "What is the purpose of route groups (parentheses folders)?",
      "options": [
        "They create URL segments",
        "They organize routes without affecting the URL",
        "They enable API routes",
        "They disable caching"
      ],
      "answer": 1,
      "explanation": "Route groups organize related routes without adding their folder name to the URL path."
    },
    {
      "question": "What must error.js export to be valid?",
      "options": [
        "A Server Component",
        "A Client Component (\"use client\")",
        "An async function",
        "A metadata object"
      ],
      "answer": 1,
      "explanation": "error.js must be a Client Component because it uses the reset prop and interactivity for the retry button."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-pages-router"] = {
  "id": "nextjs-pages-router",
  "title": "Pages Router",
  "difficulty": "beginner",
  "estimatedMinutes": 25,
  "tldr": [
    "The Pages Router is Next.js' original routing system, using a file-system convention where files in the pages/ directory map directly to URL routes.",
    "Supports dynamic routes with bracket syntax ([id].js), catch-all routes ([...slug].js), and optional catch-all routes ([[...slug]].js).",
    "Uses getServerSideProps, getStaticProps, and getStaticPaths for data fetching at the page level.",
    "The _app.js file wraps all pages, _document.js customizes the HTML document structure, and API routes are defined in pages/api/."
  ],
  "laymanDefinition": "The Pages Router is like a filing system where every file you put in the \"pages\" folder automatically becomes a webpage, and the file name determines the website address.",
  "deepDive": [
    {
      "heading": "File-System Routing Basics",
      "text": "In the Pages Router, any .js, .jsx, .ts, or .tsx file inside the pages/ directory automatically becomes a route. The file path relative to pages/ determines the URL path. For example, pages/about.js maps to /about, and pages/blog/index.js maps to /blog. Index files (index.js) represent the root of their directory."
    },
    {
      "heading": "Dynamic Routes and Catch-All Routes",
      "text": "Dynamic routes use square brackets: [id].js maps to /1, /abc, etc. Catch-all routes use [...slug].js and match any number of path segments, returning them as an array. Optional catch-all routes use [[...slug]].js and match even without the parameter. These patterns enable flexible URL structures for content-driven sites."
    },
    {
      "heading": "Data Fetching Methods",
      "text": "The Pages Router provides three main data fetching functions: getStaticProps (build-time data fetching for SSG), getServerSideProps (request-time data fetching for SSR), and getStaticPaths (specifying dynamic paths to pre-render for SSG). These functions run on the server side only and inject props into the page component."
    },
    {
      "heading": "Custom App and Document",
      "text": "_app.js (pages/_app.js) initializes all pages, allowing global styles, layout components, and persistent state. _document.js (pages/_document.js) customizes the HTML document structure (html, head, body tags) and is only rendered on the server. _document.js is used for custom fonts, meta tags, and third-party scripts that must be in the <head>."
    },
    {
      "heading": "API Routes",
      "text": "API routes are defined in pages/api/ and allow building backend endpoints within the Next.js application. Each file in pages/api/ exports a handler function that receives req and res objects. API routes support middleware patterns, CORS configuration, and dynamic API routes using bracket syntax."
    }
  ],
  "interviewAnswer": "The Pages Router provides a straightforward, file-system-based routing approach that has powered Next.js applications for years. While the App Router is now recommended for new projects, the Pages Router remains widely used and supported. Its strength lies in its simplicity and explicit data fetching methods that clearly separate server and client concerns.",
  "interviewQuestions": [
    {
      "question": "How does file-system routing work in the Pages Router?",
      "answer": "Each file in the pages/ directory automatically becomes a route. The file path relative to pages/ maps to the URL path. For example, pages/about.js becomes /about, pages/blog/[id].js becomes /blog/:id. Index files (index.js) represent the root of their directory."
    },
    {
      "question": "What is the difference between getStaticProps and getServerSideProps?",
      "answer": "getStaticProps runs at build time and fetches data once, used for static generation (SSG). getServerSideProps runs on every request, used for server-side rendering (SSR). getStaticProps returns props that are cached and served to all users, while getServerSideProps returns fresh data on each request."
    },
    {
      "question": "How do dynamic routes work in the Pages Router?",
      "answer": "Dynamic routes use square brackets in file names: [param].js captures a single segment, [...slug].js captures multiple segments, [[...slug]].js captures multiple segments optionally. The dynamic parameters are available via the router.query object in the page component."
    },
    {
      "question": "What is the purpose of _app.js?",
      "answer": "_app.js is the root component that wraps every page. It is used to persist layout between navigations, inject global CSS, keep state when navigating, and pass global props to pages. It receives Component (the active page) and pageProps (data fetched by getStaticProps/getServerSideProps)."
    },
    {
      "question": "What is the purpose of _document.js?",
      "answer": "_document.js customizes the HTML document structure. It is only rendered server-side and is used to set the lang attribute, inject custom fonts, add external scripts to <head>, and modify the initial HTML structure. It runs before client-side JavaScript hydrates."
    },
    {
      "question": "How do API routes work in the Pages Router?",
      "answer": "API routes are files in pages/api/ that export a handler function: export default function handler(req, res) { ... }. They receive Express-like req and res objects. Dynamic API routes use bracket syntax (pages/api/[id].js). API routes do not increase client-side bundle size."
    },
    {
      "question": "What is getStaticPaths used for?",
      "answer": "getStaticPaths is used with getStaticProps to specify which dynamic routes should be pre-rendered at build time. It returns an object with paths (array of parameter objects) and fallback (false, true, or \"blocking\"). fallback: true enables on-demand generation of paths not specified at build time."
    },
    {
      "question": "How do you handle 404 pages in the Pages Router?",
      "answer": "Create a pages/404.js file to display a custom 404 page. Next.js automatically serves this page for any unmatched routes. It is statically generated at build time."
    },
    {
      "question": "Can the Pages Router and App Router coexist?",
      "answer": "Yes, both routers can coexist in the same project. Pages Router uses pages/ directory and App Router uses app/ directory. Routes in pages/ take precedence over app/ for the same URL. This is useful for incremental migration from Pages Router to App Router."
    },
    {
      "question": "How do middleware and redirects work in the Pages Router?",
      "answer": "Middleware can be defined in middleware.js at the project root. next.config.js supports redirects, rewrites, and headers. The Pages Router does not have built-in middleware files at the page level; instead, you use higher-order component patterns or getServerSideProps for middleware-like logic."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Pages Router</text><rect x=\"10\" y=\"40\" width=\"80\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"50\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">pages/</text><text x=\"50\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Dir</text><rect x=\"10\" y=\"90\" width=\"80\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"50\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">pages/about.js</text><text x=\"50\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">/about</text><rect x=\"10\" y=\"140\" width=\"80\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"50\" y=\"156\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">pages/blog/[id].js</text><text x=\"50\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">/blog/:id</text><line x1=\"90\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"90\" y1=\"110\" x2=\"100\" y2=\"110\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"110\" y=\"40\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"160\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">getStaticProps</text><text x=\"160\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">SSG</text><rect x=\"110\" y=\"90\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"160\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">getServerSideProps</text><text x=\"160\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">SSR</text><rect x=\"110\" y=\"140\" width=\"100\" height=\"40\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"160\" y=\"156\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">getStaticPaths</text><text x=\"160\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Paths</text><rect x=\"230\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"290\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">_app.js</text><text x=\"290\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Wrapper</text><rect x=\"230\" y=\"90\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"290\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">_document.js</text><text x=\"290\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">HTML</text><rect x=\"230\" y=\"140\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#dc3545\" stroke=\"#dc3545\" stroke-width=\"1\"/><text x=\"290\" y=\"156\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">api/</text><text x=\"290\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Backend</text><text x=\"250\" y=\"190\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Pages Router: File-system routing with SSR, SSG, and API routes.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Page Route",
      "useCase": "When you need a simple static page.",
      "code": "// pages/about.js\nexport default function About() {\n  return <h1>About Us</h1>\n}",
      "description": "This creates a route at /about automatically without any configuration."
    },
    {
      "title": "Dynamic Route with getStaticProps",
      "useCase": "When building a blog with dynamic post URLs.",
      "code": "// pages/posts/[id].js\nexport default function Post({ post }) {\n  return <div><h1>{post.title}</h1><p>{post.body}</p></div>\n}\n\nexport async function getStaticPaths() {\n  const posts = await fetch(\"https://api.example.com/posts\").then(r => r.json());\n  return { paths: posts.map(p => ({ params: { id: p.id } })), fallback: false };\n}\n\nexport async function getStaticProps({ params }) {\n  const post = await fetch(`https://api.example.com/posts/${params.id}`).then(r => r.json());\n  return { props: { post } };\n}",
      "description": "Pre-renders all blog posts at build time using static generation with dynamic routes."
    },
    {
      "title": "Server-Side Rendering with getServerSideProps",
      "useCase": "When you need fresh data on every request, like a user dashboard.",
      "code": "// pages/dashboard.js\nexport default function Dashboard({ userData }) {\n  return <div><h1>Welcome {userData.name}</h1></div>\n}\n\nexport async function getServerSideProps() {\n  const userData = await fetch(\"https://api.example.com/user\").then(r => r.json());\n  return { props: { userData } };\n}",
      "description": "Fetches fresh data on every request and renders the page server-side."
    },
    {
      "title": "API Route",
      "useCase": "When you need a serverless backend endpoint.",
      "code": "// pages/api/hello.js\nexport default function handler(req, res) {\n  res.status(200).json({ message: \"Hello World\" });\n}",
      "description": "Creates an API endpoint at /api/hello that returns JSON."
    },
    {
      "title": "Custom 404 Page",
      "useCase": "When you want a branded 404 page.",
      "code": "// pages/404.js\nexport default function Custom404() {\n  return <h1>404 - Page Not Found</h1>\n}",
      "description": "Automatically served for any unmatched routes."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which file in the Pages Router represents the root route?",
      "options": [
        "root.js",
        "index.js",
        "home.js",
        "main.js"
      ],
      "answer": 1,
      "explanation": "index.js at the root of pages/ maps to the homepage (/)."
    },
    {
      "question": "What is the purpose of getStaticProps?",
      "options": [
        "Fetch data on every request",
        "Fetch data at build time",
        "Fetch data client-side",
        "Fetch data from cache only"
      ],
      "answer": 1,
      "explanation": "getStaticProps fetches data at build time for static generation."
    },
    {
      "question": "How do you define a catch-all route in the Pages Router?",
      "options": [
        "[slug].js",
        "[...slug].js",
        "[...].js",
        "slug.js"
      ],
      "answer": 1,
      "explanation": "Catch-all routes use the [...slug].js naming convention."
    },
    {
      "question": "What is the fallback property in getStaticPaths used for?",
      "options": [
        "Handle form submissions",
        "Control rendering of non-prebuilt paths",
        "Set error pages",
        "Configure middleware"
      ],
      "answer": 1,
      "explanation": "fallback controls whether and how non-prebuilt dynamic paths are handled."
    },
    {
      "question": "Where are API routes defined in the Pages Router?",
      "options": [
        "pages/api/",
        "api/",
        "routes/api/",
        "server/api/"
      ],
      "answer": 0,
      "explanation": "API routes are defined in the pages/api/ directory."
    },
    {
      "question": "Which file customizes the HTML document structure?",
      "options": [
        "_app.js",
        "_document.js",
        "layout.js",
        "template.js"
      ],
      "answer": 1,
      "explanation": "_document.js customizes the HTML document structure and is only rendered server-side."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-ssr"] = {
  "id": "nextjs-ssr",
  "title": "Server-Side Rendering",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Server-Side Rendering (SSR) generates the full HTML for a page on the server for each request, sending a fully-rendered page to the client.",
    "In Next.js, SSR is achieved via getServerSideProps in the Pages Router or by using dynamic = \"force-dynamic\" in the App Router.",
    "SSR improves SEO by providing fully-rendered HTML to search engine crawlers and reduces time-to-first-contentful-paint.",
    "Trade-offs include higher server load, longer response times under high traffic, and no ability to cache the full HTML across users without additional configuration."
  ],
  "laymanDefinition": "SSR is like a restaurant that cooks your meal fresh every time you order. The kitchen (server) prepares the entire dish (HTML page) from scratch when you place your order (request), ensuring it is always hot and customized.",
  "deepDive": [
    {
      "heading": "How SSR Works",
      "text": "When a request hits a Next.js server for an SSR page, the server executes getServerSideProps (Pages Router) or the async Server Component (App Router) on each request. Data is fetched, React renders the page to HTML on the server, and the fully-rendered HTML is sent to the client. The client then hydrates the HTML to make it interactive."
    },
    {
      "heading": "SSR in the Pages Router vs App Router",
      "text": "In the Pages Router, SSR is explicit via getServerSideProps which runs on every request. In the App Router, SSR is implicit: Server Components render on the server by default, and you opt into static rendering. To force SSR, you use dynamic = \"force-dynamic\" export, or use cookies(), headers(), or searchParams() which opt the segment into dynamic rendering."
    },
    {
      "heading": "Performance Considerations",
      "text": "SSR pages have higher server response times because HTML is generated per request. Use streaming (App Router) to send HTML progressively. Implement CDN caching with s-maxage and stale-while-revalidate headers for non-personalized content. Monitor server CPU load as complex pages increase rendering time."
    },
    {
      "heading": "SEO Benefits of SSR",
      "text": "Search engine crawlers receive fully-rendered HTML, ensuring all content is indexed. SSR eliminates the need for Googlebot to execute JavaScript, which can be unreliable. Dynamic meta tags, Open Graph data, and structured data are all present in the initial HTML response, improving social sharing and search result snippets."
    },
    {
      "heading": "Hydration and Interactivity",
      "text": "After SSR HTML is delivered, React hydrates the page on the client, attaching event handlers and making the page interactive. Hydration must match the server-rendered HTML exactly; mismatches cause errors. The App Router improves on this with selective hydration and progressive enhancement."
    }
  ],
  "interviewAnswer": "SSR remains essential for applications requiring SEO with dynamic content, real-time data, or personalized content. Next.js makes SSR straightforward while offering performance optimizations like streaming and selective hydration. The choice between SSR, SSG, and ISR depends on data freshness requirements and traffic patterns.",
  "interviewQuestions": [
    {
      "question": "What is Server-Side Rendering in Next.js?",
      "answer": "SSR generates the complete HTML for a page on the server for each incoming request. The server fetches data, executes React components, and produces full HTML that is sent to the client. The client then hydrates the HTML to make it interactive. SSR provides SEO benefits and faster initial content display."
    },
    {
      "question": "How do you implement SSR in the Pages Router?",
      "answer": "Export an async getServerSideProps function from the page component. This function runs on every request, receives the context object (params, req, res, query, etc.), and returns props that are passed to the page component at render time."
    },
    {
      "question": "How do you implement SSR in the App Router?",
      "answer": "In the App Router, Server Components render on the server by default. To ensure dynamic rendering (SSR-like behavior) on every request, export const dynamic = \"force-dynamic\" from the segment, or use cookies(), headers(), or searchParams() which automatically opt into dynamic rendering. No explicit data fetching function is needed."
    },
    {
      "question": "What are the performance implications of SSR?",
      "answer": "SSR increases server response time because HTML is generated per request. This increases server CPU usage. Benefits include faster time-to-content for users and better SEO. Mitigations include HTTP caching headers (s-maxage), CDN caching, React streaming (App Router), and selective data fetching to minimize blocking."
    },
    {
      "question": "How does SSR affect SEO?",
      "answer": "SSR benefits SEO because search engine crawlers receive fully-rendered HTML with all content present. This ensures content is indexed even if crawlers do not execute JavaScript. Meta tags, Open Graph data, and structured data are all included in the initial server response."
    },
    {
      "question": "What is hydration in the context of SSR?",
      "answer": "Hydration is the process where React attaches event listeners and state to the server-rendered HTML on the client. It makes the static HTML interactive. React expects the client-side render tree to match the server-rendered HTML exactly; differences cause hydration errors."
    },
    {
      "question": "How does caching work with SSR pages?",
      "answer": "SSR pages can be cached using HTTP response headers. Set Cache-Control: s-maxage=60, stale-while-revalidate=300 for CDN caching. Avoid caching personalized content. Next.js does not cache SSR pages by default; caching must be configured in the hosting platform or via custom server."
    },
    {
      "question": "What is the difference between SSR and SSG?",
      "answer": "SSR generates HTML on every request (dynamic). SSG generates HTML once at build time (static). SSR is better for frequently changing data. SSG is better for content that does not change often and benefits from fast load times. ISR bridges the gap by allowing periodic revalidation of static pages."
    },
    {
      "question": "Can you use SSR with getStaticProps?",
      "answer": "No, getStaticProps is for SSG/ISR. A page can export either getServerSideProps (SSR) or getStaticProps (SSG/ISR), not both. Trying to export both will cause a build error."
    },
    {
      "question": "What happens if getServerSideProps throws an error?",
      "answer": "If getServerSideProps throws an error, Next.js shows a 500 error page in production. In development, it shows the error overlay. Use try-catch blocks in getServerSideProps to handle errors gracefully and return a notFound or redirect object instead of crashing."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Server-Side Rendering</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client Request</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Browser</text><line x1=\"130\" y1=\"60\" x2=\"150\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"160\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"220\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">getServerSideProps</text><text x=\"220\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Fetch Data</text><line x1=\"280\" y1=\"60\" x2=\"300\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"310\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"370\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Render to HTML</text><text x=\"370\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Server</text><line x1=\"430\" y1=\"60\" x2=\"450\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"110\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"70\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">HTML Response</text><text x=\"70\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">to Client</text><line x1=\"130\" y1=\"130\" x2=\"160\" y2=\"130\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"110\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"230\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Hydration</text><text x=\"230\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">JS Bundle</text><text x=\"250\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">SSR: Full HTML generated server-side per request, then hydrated client-side.</text></svg>",
  "codeExamples": [
    {
      "title": "SSR with getServerSideProps",
      "useCase": "When you need fresh data on every request.",
      "code": "export async function getServerSideProps(context) {\n  const { params, req, query } = context;\n  const data = await fetch(`https://api.example.com/data`).then(r => r.json());\n  return { props: { data } };\n}\n\nexport default function Page({ data }) {\n  return <div>{data.title}</div>\n}",
      "description": "Fetches fresh data on every request and passes it as props to the page. The context object provides access to params, query, req, res, and preview data."
    },
    {
      "title": "SSR in App Router",
      "useCase": "When you need dynamic rendering in the App Router.",
      "code": "// app/page.js\nexport const dynamic = \"force-dynamic\";\n\nexport default async function Page() {\n  const data = await fetch(\"https://api.example.com/data\");\n  const json = await data.json();\n  return <div>{json.title}</div>\n}",
      "description": "The dynamic export forces server-side rendering on every request. The async component fetches data directly."
    },
    {
      "title": "SSR with Streaming",
      "useCase": "When you want to improve perceived performance by streaming HTML.",
      "code": "// app/page.js\nimport { Suspense } from \"react\";\n\nasync function SlowComponent() {\n  const data = await fetch(\"https://api.example.com/slow\");\n  return <div>{data}</div>\n}\n\nexport default function Page() {\n  return (\n    <div>\n      <h1>Fast header</h1>\n      <Suspense fallback={<div>Loading...</div>}>\n        <SlowComponent />\n      </Suspense>\n    </div>\n  );\n}",
      "description": "The header renders immediately while the slow component streams in later, improving perceived performance."
    },
    {
      "title": "SSR with Custom Cache Headers",
      "useCase": "When you want to balance freshness with performance via CDN caching.",
      "code": "export async function getServerSideProps({ res }) {\n  res.setHeader(\n    \"Cache-Control\",\n    \"public, s-maxage=60, stale-while-revalidate=300\"\n  );\n  const data = await fetch(\"https://api.example.com/data\");\n  const json = await data.json();\n  return { props: { data: json } };\n}",
      "description": "Sets HTTP cache headers for CDN caching: 60 seconds fresh, 300 seconds stale-while-revalidate."
    },
    {
      "title": "SSR with Redirect",
      "useCase": "When you need to redirect based on authentication or conditions.",
      "code": "export async function getServerSideProps(context) {\n  const token = context.req.cookies.token;\n  if (!token) {\n    return { redirect: { destination: \"/login\", permanent: false } };\n  }\n  const data = await fetch(\"https://api.example.com/data\", {\n    headers: { Authorization: `Bearer ${token}` }\n  }).then(r => r.json());\n  return { props: { data } };\n}",
      "description": "Redirects unauthenticated users to /login before fetching data."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which function implements SSR in the Pages Router?",
      "options": [
        "getStaticProps",
        "getServerSideProps",
        "getInitialProps",
        "getStaticPaths"
      ],
      "answer": 1,
      "explanation": "getServerSideProps runs on every request to enable SSR."
    },
    {
      "question": "How do you force dynamic rendering in the App Router?",
      "options": [
        "export const dynamic = \"static\"",
        "export const dynamic = \"force-dynamic\"",
        "export const ssr = true",
        "export const render = \"server\""
      ],
      "answer": 1,
      "explanation": "export const dynamic = \"force-dynamic\" ensures the page renders on every request."
    },
    {
      "question": "What is the main SEO benefit of SSR?",
      "options": [
        "Smaller bundle size",
        "Fully-rendered HTML for crawlers",
        "Faster client navigation",
        "Lower server costs"
      ],
      "answer": 1,
      "explanation": "Search engine crawlers receive complete HTML with all content for proper indexing."
    },
    {
      "question": "What does hydration mean in SSR?",
      "options": [
        "Running code on server",
        "Attaching event listeners to server HTML",
        "Compressing HTML",
        "Optimizing images"
      ],
      "answer": 1,
      "explanation": "Hydration makes server-rendered static HTML interactive by attaching React event handlers."
    },
    {
      "question": "What happens if a page exports both getStaticProps and getServerSideProps?",
      "options": [
        "Both run",
        "getServerSideProps takes priority",
        "getStaticProps takes priority",
        "Build error"
      ],
      "answer": 3,
      "explanation": "A page cannot export both; it causes a build error."
    },
    {
      "question": "How can you cache SSR pages at the CDN level?",
      "options": [
        "Using Cache-Control headers",
        "Using localStorage",
        "Using cookies",
        "Using Redux"
      ],
      "answer": 0,
      "explanation": "Set Cache-Control headers like s-maxage and stale-while-revalidate for CDN caching."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-csr"] = {
  "id": "nextjs-csr",
  "title": "Client-Side Rendering",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "Client-Side Rendering (CSR) renders the page entirely in the browser using JavaScript, with Next.js serving a minimal HTML shell and React handling all rendering.",
    "In Next.js, CSR is achieved using \"use client\" components, useEffect for data fetching, or data fetching libraries like SWR and TanStack Query.",
    "CSR provides a rich, app-like experience after the initial load, with instant navigations and full interactivity.",
    "Downsides include slower initial load times, poorer SEO (empty HTML shell), and reliance on client JavaScript execution."
  ],
  "laymanDefinition": "CSR is like ordering a flat-pack furniture kit: you get a minimal box (HTML shell) and assembly instructions (JavaScript), and you build everything on-site (in the browser) using your own tools.",
  "deepDive": [
    {
      "heading": "How CSR Works in Next.js",
      "text": "The server sends a minimal HTML document with a <div id=\"root\"> and script tags. The browser downloads and executes the JavaScript bundle. React renders the UI in the browser, fetching data as needed. After the initial load, navigations are instant because no server round-trip is needed."
    },
    {
      "heading": "CSR vs SSR Trade-offs",
      "text": "CSR has slower initial load (JavaScript must download and execute) but faster subsequent navigations. SSR has faster initial HTML delivery but requires server round-trips for every navigation. CSR is better for authenticated dashboards and apps where SEO is not critical."
    },
    {
      "heading": "Data Fetching in CSR",
      "text": "CSR components use React hooks like useEffect, useSWR, or TanStack Query to fetch data client-side. Loading states, error handling, and optimistic updates are managed in the browser. Data can be cached client-side using SWR or React Query for improved performance."
    },
    {
      "heading": "SEO Implications of CSR",
      "text": "CSR pages serve an empty HTML shell to search engines, which may not index content properly. Use Next.js metadata API for basic SEO tags, but content-heavy pages benefit from SSR or SSG. Hybrid approaches use SSR for initial load and CSR for subsequent client-side navigation."
    },
    {
      "heading": "Performance Optimization for CSR",
      "text": "Minimize bundle size with code splitting, lazy loading, and dynamic imports. Use React.memo and useMemo to prevent unnecessary re-renders. Implement virtual scrolling for long lists. Use service workers for offline support and caching."
    }
  ],
  "interviewAnswer": "CSR is a valid choice for authenticated applications, dashboards, and tools where SEO is not a priority. Next.js supports CSR through \"use client\" components and client-side data fetching. The key is choosing the right rendering strategy for each page based on content type and user needs.",
  "interviewQuestions": [
    {
      "question": "What is Client-Side Rendering in Next.js?",
      "answer": "CSR renders the page entirely in the browser. The server sends a minimal HTML shell with JavaScript bundles. React takes over in the browser, rendering components, fetching data, and managing UI state. The initial load is slower, but subsequent navigations are instant."
    },
    {
      "question": "How do you create a Client Component in Next.js?",
      "answer": "Add \"use client\" at the top of the component file. This marks the component and its children as client-side rendered. Client Components can use React hooks, browser APIs, event handlers, and state management. They can be imported by Server Components."
    },
    {
      "question": "How does data fetching work in CSR?",
      "answer": "Data is fetched client-side using useEffect with fetch, or libraries like SWR and TanStack Query. These hooks manage loading states, caching, revalidation, and error handling. Data is fetched after the component mounts in the browser."
    },
    {
      "question": "What are the advantages of CSR?",
      "answer": "Fast subsequent navigations with no server round-trips, rich interactivity with client-side state management, reduced server load, ability to use browser APIs, and simpler deployment as static files."
    },
    {
      "question": "What are the disadvantages of CSR?",
      "answer": "Slow initial load (JavaScript download + parse + execute), poor SEO (empty HTML shell), reliance on client device performance, potential for flash of unstyled content, and JavaScript required for basic content visibility."
    },
    {
      "question": "How does CSR affect SEO in Next.js?",
      "answer": "CSR pages have minimal HTML content, so search engines may not index the actual page content. Next.js provides metadata API for basic tags, but for content-heavy pages, SSR, SSG, or ISR are preferred. Use dynamic rendering to serve SSR to bots and CSR to users."
    },
    {
      "question": "Can you mix CSR with SSR in Next.js?",
      "answer": "Yes, Next.js supports mixed rendering. A page can have a Server Component shell that handles SEO-critical content and metadata, with Client Components embedded for interactive sections. This hybrid approach is the recommended pattern in the App Router."
    },
    {
      "question": "What is the role of \"use client\" directive?",
      "answer": "The \"use client\" directive marks the boundary between server and client code. Components marked with \"use client\" are rendered on the client and can use hooks, event handlers, and browser APIs. All components imported into a Client Component also become client-rendered."
    },
    {
      "question": "How do you optimize CSR performance in Next.js?",
      "answer": "Use dynamic imports with next/dynamic for code splitting, lazy load below-the-fold components, use SWR/React Query for caching, implement virtual scrolling for lists, use React.memo for expensive renders, and minimize bundle size with tree shaking."
    },
    {
      "question": "When should you choose CSR over SSR?",
      "answer": "Choose CSR for authenticated dashboards, admin panels, tools with complex interactivity, real-time applications, and internal tools where SEO is not needed. Choose SSR/SSG for public content, e-commerce product pages, blogs, and any page that needs search engine visibility."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Client-Side Rendering</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server sends HTML shell</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Minimal</text><line x1=\"150\" y1=\"60\" x2=\"170\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Browser loads JS</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Bundle</text><line x1=\"320\" y1=\"60\" x2=\"340\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"410\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">React hydrates &</text><text x=\"410\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">renders UI</text><line x1=\"350\" y1=\"80\" x2=\"350\" y2=\"100\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"110\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"290\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">useEffect / SWR</text><text x=\"290\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Fetch Data</text><rect x=\"10\" y=\"110\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"80\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">User sees content</text><text x=\"80\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Interactive</text><text x=\"250\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">CSR: Minimal HTML served, JavaScript renders content in the browser.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Client Component",
      "useCase": "When you need a component with user interaction.",
      "code": "\"use client\";\nimport { useState } from \"react\";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>\n}",
      "description": "The \"use client\" directive enables hooks and event handlers. This component runs entirely in the browser."
    },
    {
      "title": "Client-Side Data Fetching",
      "useCase": "When you need to fetch data after page load.",
      "code": "\"use client\";\nimport { useState, useEffect } from \"react\";\n\nexport default function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser);\n  }, [userId]);\n  if (!user) return <div>Loading...</div>;\n  return <div>{user.name}</div>;\n}",
      "description": "Fetches user data client-side when the component mounts or userId changes."
    },
    {
      "title": "Using SWR for CSR",
      "useCase": "When you want automatic caching and revalidation.",
      "code": "\"use client\";\nimport useSWR from \"swr\";\n\nconst fetcher = (url) => fetch(url).then(r => r.json());\n\nexport default function Dashboard() {\n  const { data, error, isLoading } = useSWR(\"/api/dashboard\", fetcher);\n  if (isLoading) return <div>Loading...</div>;\n  if (error) return <div>Error loading data</div>;\n  return <div>{data.stats}</div>;\n}",
      "description": "SWR handles caching, revalidation, and error states automatically."
    },
    {
      "title": "Dynamic Import for Code Splitting",
      "useCase": "When you want to lazy-load heavy components.",
      "code": "import dynamic from \"next/dynamic\";\n\nconst HeavyChart = dynamic(() => import(\"../components/Chart\"), {\n  ssr: false,\n  loading: () => <div>Loading chart...</div>\n});\n\nexport default function Page() {\n  return <HeavyChart />;\n}",
      "description": "The chart component is loaded only when needed, reducing initial bundle size."
    },
    {
      "title": "Hybrid Server + Client Component",
      "useCase": "When you need SEO content with interactive sections.",
      "code": "// Server Component (default)\nexport default function ProductPage({ product }) {\n  return (\n    <div>\n      <h1>{product.name}</h1>\n      <p>{product.description}</p>\n      <AddToCartButton productId={product.id} />\n    </div>\n  );\n}\n\n// Client Component for interactivity\n\"use client\";\nexport function AddToCartButton({ productId }) {\n  const addToCart = () => fetch(\"/api/cart\", { method: \"POST\", body: JSON.stringify({ productId }) });\n  return <button onClick={addToCart}>Add to Cart</button>\n}",
      "description": "SEO content is server-rendered, while the interactive button is a Client Component."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What directive marks a component as client-side only?",
      "options": [
        "\"use server\"",
        "\"use client\"",
        "\"use browser\"",
        "\"use csr\""
      ],
      "answer": 1,
      "explanation": "\"use client\" marks the component boundary for client-side rendering with full browser API access."
    },
    {
      "question": "What is the main disadvantage of CSR?",
      "options": [
        "Fast subsequent navigations",
        "Poor SEO",
        "Reduced server load",
        "Rich interactivity"
      ],
      "answer": 1,
      "explanation": "CSR pages serve minimal HTML, making content indexing by search engines difficult."
    },
    {
      "question": "Which library is commonly used for client-side data fetching with caching?",
      "options": [
        "Redux",
        "SWR",
        "Zustand",
        "MobX"
      ],
      "answer": 1,
      "explanation": "SWR provides automatic caching, revalidation, and error handling for client-side data fetching."
    },
    {
      "question": "How do you lazy-load a component in Next.js?",
      "options": [
        "React.lazy",
        "next/dynamic",
        "import()",
        "loadable()"
      ],
      "answer": 1,
      "explanation": "next/dynamic is the Next.js-specific way to lazy-load components with SSR control."
    },
    {
      "question": "What is the recommended rendering strategy for a public blog?",
      "options": [
        "CSR",
        "SSR or SSG",
        "Only CSR",
        "No rendering needed"
      ],
      "answer": 1,
      "explanation": "Public blogs need SEO, so SSR or SSG is recommended over CSR."
    },
    {
      "question": "Can Client Components be imported into Server Components?",
      "options": [
        "No, never",
        "Yes, always",
        "Yes, but they remain client-rendered at the boundary",
        "Only with \"use server\""
      ],
      "answer": 2,
      "explanation": "Client Components can be imported by Server Components, but the boundary remains at the \"use client\" file."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-ssg"] = {
  "id": "nextjs-ssg",
  "title": "Static Site Generation",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Static Site Generation (SSG) pre-renders pages at build time, producing static HTML files that can be served instantly from a CDN.",
    "In the Pages Router, SSG is achieved via getStaticProps. In the App Router, Static Generation is the default behavior when no dynamic functions are used.",
    "SSG provides the fastest possible load times since HTML is pre-built and does not require server processing at request time.",
    "Best for content that does not change frequently: blogs, documentation, marketing pages, and e-commerce product pages with stable data."
  ],
  "laymanDefinition": "SSG is like printing a book: you write all the content, print it (build), and then anyone can read it instantly without waiting for pages to be written on the spot.",
  "deepDive": [
    {
      "heading": "How SSG Works in Next.js",
      "text": "At build time (next build), Next.js executes getStaticProps (Pages Router) or runs Server Components (App Router) for each page, generates the HTML, and saves it as static .html files. These files are served directly from a CDN or web server without any server-side processing."
    },
    {
      "heading": "SSG in the Pages Router",
      "text": "Export getStaticProps from a page to opt into SSG. The function runs at build time, fetches data, and returns props. For dynamic routes, getStaticPaths specifies which paths to pre-render. The fallback option controls behavior for paths not specified at build time."
    },
    {
      "heading": "SSG in the App Router",
      "text": "In the App Router, all pages are statically rendered by default unless they use dynamic functions (cookies(), headers(), searchParams()) or export const dynamic = \"force-dynamic\". Static pages are rendered at build time and cached. Data fetching with fetch() is automatically cached."
    },
    {
      "heading": "Incremental Static Regeneration (ISR)",
      "text": "ISR extends SSG by allowing pages to be re-rendered after build time without rebuilding the entire site. Set revalidate in getStaticProps or use next.revalidate in fetch() options. Pages are served from cache while being regenerated in the background."
    },
    {
      "heading": "SSG Performance and Caching",
      "text": "SSG pages can be aggressively cached at CDN edge nodes because they are identical for all users. This results in near-instant page loads regardless of geographic location. SSG significantly reduces server load and hosting costs compared to SSR."
    }
  ],
  "interviewAnswer": "SSG is the foundation of high-performance websites. It eliminates server processing at request time, enables global CDN distribution, and provides the best possible user experience. Combined with ISR, SSG can handle dynamic content while maintaining static-level performance.",
  "interviewQuestions": [
    {
      "question": "What is Static Site Generation in Next.js?",
      "answer": "SSG pre-renders pages into static HTML at build time. These HTML files are served directly to users without server-side processing on each request. This results in the fastest possible page loads and excellent SEO."
    },
    {
      "question": "How do you implement SSG in the Pages Router?",
      "answer": "Export an async getStaticProps function from the page. This function runs at build time, fetches data, and returns props. For dynamic routes, also export getStaticPaths to specify which paths to pre-render."
    },
    {
      "question": "How does SSG work in the App Router?",
      "answer": "In the App Router, static generation is the default. Pages are pre-rendered at build time unless they use dynamic functions like cookies(), headers(), or searchParams(). Data fetching with fetch() is automatically cached and deduplicated."
    },
    {
      "question": "What is the build-time execution context for getStaticProps?",
      "answer": "getStaticProps runs during next build on the server. It has access to the params for dynamic routes, preview mode, and the full Node.js API. It cannot access request-time data like cookies (unless using preview mode) or query parameters."
    },
    {
      "question": "What is the fallback option in getStaticPaths?",
      "answer": "fallback determines behavior for paths not generated at build time. false: show 404. true: generate on first request and cache. \"blocking\": generate on first request without a loading state (SSR-like)."
    },
    {
      "question": "How does SSG benefit SEO?",
      "answer": "SSG produces complete HTML at build time, so search engine crawlers receive fully-rendered pages with all content. Static HTML loads instantly, improving Core Web Vitals scores. Pages can be indexed immediately without JavaScript execution."
    },
    {
      "question": "What are the limitations of SSG?",
      "answer": "Build time increases with the number of pages. Dynamic or user-specific content cannot use SSG. Content updates require a rebuild (or ISR). Large sites may need incremental builds. Not suitable for authenticated pages or real-time data."
    },
    {
      "question": "How does SSG handle environment variables?",
      "answer": "Environment variables used in getStaticProps are resolved at build time. Public environment variables (NEXT_PUBLIC_) are inlined into the JavaScript bundle. Server-only environment variables are only available during build and are not exposed to the client."
    },
    {
      "question": "Can you use SSG with API routes?",
      "answer": "Yes, API routes are separate from SSG. API routes run server-side on each request. SSG generates static HTML pages. A page can use SSG while its data source is an API route that runs dynamically."
    },
    {
      "question": "How do you debug SSG build issues?",
      "answer": "Check the build output for errors. Use console.log in getStaticProps during build. Verify that data sources are accessible at build time. For ISR revalidation issues, check the revalidate interval and ensure CDN respects cache headers."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Static Site Generation</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">next build</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Build Time</text><line x1=\"130\" y1=\"60\" x2=\"160\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"230\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">getStaticProps</text><text x=\"230\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Fetch Data</text><line x1=\"290\" y1=\"60\" x2=\"320\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"330\" y=\"40\" width=\"120\" height=\"40\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"390\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Generate HTML</text><text x=\"390\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Static Files</text><line x1=\"330\" y1=\"80\" x2=\"330\" y2=\"100\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"110\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"300\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">CDN Cache</text><text x=\"300\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Served Globally</text><line x1=\"150\" y1=\"130\" x2=\"230\" y2=\"130\" stroke=\"#999\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"110\" width=\"130\" height=\"40\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"75\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">User Request</text><text x=\"75\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Instant Load</text><text x=\"250\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">SSG: Pages pre-built at build time, served statically from CDN for instant loads.</text></svg>",
  "codeExamples": [
    {
      "title": "SSG with getStaticProps",
      "useCase": "When building a marketing site with content from a CMS.",
      "code": "export async function getStaticProps() {\n  const data = await fetch(\"https://cms.example.com/pages/home\").then(r => r.json());\n  return { props: { content: data } };\n}\n\nexport default function Home({ content }) {\n  return <div><h1>{content.title}</h1><div>{content.body}</div></div>\n}",
      "description": "Fetches CMS data at build time and generates a static HTML page."
    },
    {
      "title": "SSG with Dynamic Routes",
      "useCase": "When building a blog with many posts.",
      "code": "export async function getStaticPaths() {\n  const posts = await fetch(\"https://api.example.com/posts\").then(r => r.json());\n  return { paths: posts.map(p => ({ params: { slug: p.slug } })), fallback: \"blocking\" };\n}\n\nexport async function getStaticProps({ params }) {\n  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(r => r.json());\n  return { props: { post } };\n}",
      "description": "Pre-renders all blog posts at build time with fallback: \"blocking\" for new posts."
    },
    {
      "title": "SSG in App Router (Default)",
      "useCase": "When building static pages in the App Router.",
      "code": "// app/page.js — This is statically rendered by default\nexport default async function Home() {\n  const data = await fetch(\"https://api.example.com/content\");\n  const json = await data.json();\n  return <div>{json.title}</div>\n}",
      "description": "No special exports needed. App Router defaults to static rendering with cached fetch()."
    },
    {
      "title": "SSG with Revalidation (ISR)",
      "useCase": "When you need static performance with periodic updates.",
      "code": "export async function getStaticProps() {\n  const data = await fetch(\"https://api.example.com/products\");\n  const products = await data.json();\n  return { props: { products }, revalidate: 3600 };\n}",
      "description": "Regenerates the page at most once every 3600 seconds (1 hour) while serving cached pages."
    },
    {
      "title": "SSG with Preview Mode",
      "useCase": "When editors need to preview draft content before publishing.",
      "code": "export async function getStaticProps({ preview, previewData }) {\n  const data = await fetch(`https://cms.example.com/pages/home${preview ? \"?draft=true\" : \"\"}`);\n  return { props: { content: await data.json(), isPreview: !!preview } };\n}",
      "description": "Preview mode enables draft content viewing at build time by passing a preview flag to the data source."
    }
  ],
  "mcqQuestions": [
    {
      "question": "When does getStaticProps execute?",
      "options": [
        "On every request",
        "At build time",
        "On the client",
        "On every navigation"
      ],
      "answer": 1,
      "explanation": "getStaticProps runs during next build to pre-render pages."
    },
    {
      "question": "What is the default rendering behavior in the App Router?",
      "options": [
        "Dynamic (SSR)",
        "Static (SSG)",
        "Client-side (CSR)",
        "No rendering"
      ],
      "answer": 1,
      "explanation": "App Router defaults to static generation unless dynamic functions are used."
    },
    {
      "question": "What does fallback: true do in getStaticPaths?",
      "options": [
        "Shows 404 for unknown paths",
        "Generates unknown paths on first request",
        "Prevents all path generation",
        "Requires all paths at build time"
      ],
      "answer": 1,
      "explanation": "fallback: true generates pages on first request and caches them for subsequent requests."
    },
    {
      "question": "Which option extends SSG by allowing periodic page regeneration?",
      "options": [
        "revalidate",
        "refresh",
        "regenerate",
        "update"
      ],
      "answer": 0,
      "explanation": "The revalidate option in getStaticProps enables ISR for periodic page regeneration."
    },
    {
      "question": "What is a limitation of SSG?",
      "options": [
        "Fast page loads",
        "Excellent SEO",
        "Build time grows with page count",
        "Reduced server load"
      ],
      "answer": 2,
      "explanation": "Build time increases as more pages are added, which can be a limitation for large sites."
    },
    {
      "question": "Can SSG pages use data from cookies?",
      "options": [
        "Yes, always",
        "Only with getServerSideProps",
        "Only with preview mode",
        "Yes, via client-side JS"
      ],
      "answer": 1,
      "explanation": "SSG pages cannot access cookies or request-time data because they are pre-built. Use getServerSideProps for this."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-isr"] = {
  "id": "nextjs-isr",
  "title": "Incremental Static Regeneration",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "ISR allows static pages to be updated after build time without rebuilding the entire site, combining the performance of SSG with the freshness of SSR.",
    "Implement ISR by setting the revalidate property in getStaticProps (Pages Router) or using next.revalidate in fetch() options (App Router).",
    "ISR serves cached pages while regenerating updated HTML in the background, ensuring zero downtime during updates.",
    "On-Demand ISR (revalidatePath / revalidateTag) provides instant invalidation triggered by CMS webhooks or admin actions."
  ],
  "laymanDefinition": "ISR is like a library that keeps popular books ready on the shelf (cached) while occasionally checking if new editions exist and swapping them in without closing the library.",
  "deepDive": [
    {
      "heading": "How ISR Works",
      "text": "When a page is first built, HTML is generated and cached. On subsequent requests within the revalidate window, the cached page is served instantly. When the revalidate window expires, the cached page is still served, but Next.js triggers a background regeneration. Once the new HTML is ready, it replaces the cached version atomically."
    },
    {
      "heading": "ISR in the Pages Router",
      "text": "Set revalidate in the return object of getStaticProps. The value is the maximum number of seconds between regenerations. For example, revalidate: 60 means the page regenerates at most once per 60 seconds. Dynamic routes also need getStaticPaths with the appropriate fallback strategy."
    },
    {
      "heading": "ISR in the App Router",
      "text": "Use the next.revalidate option in fetch() to set the cache duration for a specific data fetch. Alternatively, use the cache() function with next: { revalidate } options. On-Demand ISR is achieved via revalidatePath() and revalidateTag() imported from next/cache."
    },
    {
      "heading": "On-Demand ISR",
      "text": "On-Demand ISR uses revalidatePath(\"/path\") to invalidate a specific route or revalidateTag(\"tag\") to invalidate all routes using a specific fetch tag. These are typically called from API routes triggered by CMS webhooks. This eliminates the need to wait for time-based revalidation."
    },
    {
      "heading": "ISR Performance and Caching Strategies",
      "text": "ISR strikes a balance between build-time generation and dynamic rendering. Use short revalidate times (10-60s) for news sites, longer times (3600+) for marketing pages, and On-Demand ISR for CMS-driven content. ISR works well with CDN caching and stale-while-revalidate headers."
    }
  ],
  "interviewAnswer": "ISR represents a paradigm shift in web rendering, offering the best of both SSG and SSR. For content-driven sites, ISR with On-Demand invalidation provides static-level performance with dynamic-level freshness. The key is choosing the right revalidation strategy based on content update frequency.",
  "interviewQuestions": [
    {
      "question": "What is Incremental Static Regeneration?",
      "answer": "ISR enables static pages to be updated after deployment without rebuilding the entire site. Pages are served from cache while fresh HTML is generated in the background. When regeneration completes, the new version replaces the cached one atomically, ensuring zero downtime."
    },
    {
      "question": "How do you implement ISR in the Pages Router?",
      "answer": "Add a revalidate property to the object returned by getStaticProps. The value is the number of seconds between potential regenerations. For example, return { props: { data }, revalidate: 60 } regenerates at most once per minute."
    },
    {
      "question": "How do you implement ISR in the App Router?",
      "answer": "In the App Router, use the next.revalidate option in fetch(): fetch(url, { next: { revalidate: 60 } }). For On-Demand ISR, use revalidatePath() to invalidate a path or revalidateTag() to invalidate by tag, imported from next/cache."
    },
    {
      "question": "What is On-Demand ISR?",
      "answer": "On-Demand ISR allows instant invalidation of cached pages without waiting for time-based revalidation. It uses revalidatePath(\"/path\") or revalidateTag(\"tag\") functions, typically called from API routes triggered by CMS webhooks, admin actions, or content updates."
    },
    {
      "question": "What happens during the revalidation window?",
      "answer": "During the revalidation window, cached HTML is served immediately. After the window expires, the first request triggers a background regeneration while still serving the stale cached page. The new HTML replaces the cached version once regeneration completes."
    },
    {
      "question": "How does ISR handle high traffic?",
      "answer": "ISR handles high traffic well because most requests are served from cache. During regeneration, only one process (per page) performs the regeneration while all other requests receive the cached version. This prevents thundering herd problems."
    },
    {
      "question": "What are the downsides of ISR?",
      "answer": "Pages can serve stale content within the revalidation window. Build complexity increases compared to pure SSG. Not suitable for real-time data or highly personalized content. The first request after revalidation expiry may be slow (generation in background)."
    },
    {
      "question": "How do you debug ISR issues?",
      "answer": "Check the server logs for regeneration errors. Verify that data sources are accessible during regeneration. Monitor the revalidate time and ensure it matches expectations. Use the Next.js build output to confirm which pages are using ISR. Add console.log in getStaticProps during regeneration."
    },
    {
      "question": "Can ISR work with dynamic routes?",
      "answer": "Yes, ISR works with dynamic routes. Use getStaticPaths with fallback: true or \"blocking\" combined with revalidate in getStaticProps. The fallback strategy determines how non-prebuilt paths are handled on first request."
    },
    {
      "question": "What is the difference between revalidate and On-Demand ISR?",
      "answer": "Time-based revalidate regenerates at fixed intervals (e.g., every 60 seconds). On-Demand ISR regenerates instantly when triggered (e.g., via CMS webhook). On-Demand ISR is more efficient for content that updates unpredictably, while time-based is simpler for predictable schedules."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Incremental Static Regeneration</text><rect x=\"10\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"60\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Build: SSG</text><text x=\"60\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Static HTML</text><line x1=\"110\" y1=\"58\" x2=\"130\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"190\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">revalidate:60</text><text x=\"190\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Cache Window</text><line x1=\"240\" y1=\"58\" x2=\"260\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"270\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"320\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Expired</text><text x=\"320\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Stale Served</text><line x1=\"270\" y1=\"75\" x2=\"270\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"280\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Background</text><text x=\"280\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Regenerate</text><line x1=\"330\" y1=\"58\" x2=\"350\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"360\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"410\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Fresh HTML</text><text x=\"410\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Replaces Cache</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">ISR: Serve cached static pages, regenerate in background when stale.</text></svg>",
  "codeExamples": [
    {
      "title": "ISR with Time-Based Revalidation",
      "useCase": "When a blog post page should refresh content hourly.",
      "code": "export async function getStaticProps() {\n  const data = await fetch(\"https://cms.example.com/posts/latest\");\n  const posts = await data.json();\n  return { props: { posts }, revalidate: 3600 };\n}",
      "description": "Regenerates the page at most once per hour while serving cached content between regenerations."
    },
    {
      "title": "ISR in App Router with fetch",
      "useCase": "When using ISR with the App Router\\'s built-in fetch caching.",
      "code": "export default async function Page() {\n  const data = await fetch(\"https://api.example.com/data\", {\n    next: { revalidate: 60 }\n  });\n  const json = await data.json();\n  return <div>{json.title}</div>\n}",
      "description": "The fetch call is cached for 60 seconds. After that, the next request triggers background revalidation."
    },
    {
      "title": "On-Demand ISR with revalidatePath",
      "useCase": "When a CMS webhook needs to instantly update the homepage.",
      "code": "// app/api/revalidate/route.js\nimport { revalidatePath } from \"next/cache\";\n\nexport async function POST(request) {\n  const body = await request.json();\n  if (body.secret !== process.env.REVALIDATION_SECRET) {\n    return Response.json({ message: \"Invalid secret\" }, { status: 401 });\n  }\n  revalidatePath(\"/\");\n  return Response.json({ revalidated: true });\n}",
      "description": "Calling this API route instantly invalidates the homepage cache, triggering a fresh regeneration."
    },
    {
      "title": "On-Demand ISR with revalidateTag",
      "useCase": "When multiple pages share the same data and need collective invalidation.",
      "code": "// Data fetching with tag\nexport default async function Page() {\n  const data = await fetch(\"https://api.example.com/posts\", {\n    next: { tags: [\"posts\"] }\n  });\n  const posts = await data.json();\n  return <div>{posts.length} posts</div>\n}\n\n// Webhook handler to invalidate all tagged pages\nimport { revalidateTag } from \"next/cache\";\nexport async function POST(request) {\n  revalidateTag(\"posts\");\n  return Response.json({ revalidated: true });\n}",
      "description": "Invalidates all pages that fetch data tagged with \"posts\" in one call."
    },
    {
      "title": "ISR with Dynamic Routes and Fallback",
      "useCase": "When a dynamic blog has thousands of posts, not all built upfront.",
      "code": "export async function getStaticPaths() {\n  const posts = await fetch(\"https://cms.example.com/posts?limit=100\");\n  const data = await posts.json();\n  return { paths: data.map(p => ({ params: { slug: p.slug } })), fallback: \"blocking\" };\n}\n\nexport async function getStaticProps({ params }) {\n  const post = await fetch(`https://cms.example.com/posts/${params.slug}`);\n  const data = await post.json();\n  return { props: { post: data }, revalidate: 3600 };\n}",
      "description": "Pre-builds top 100 posts, generates others on first request (blocking), and revalidates hourly."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What property enables ISR in getStaticProps?",
      "options": [
        "refresh",
        "revalidate",
        "regenerate",
        "update"
      ],
      "answer": 1,
      "explanation": "The revalidate property (in seconds) enables ISR by setting the cache invalidation interval."
    },
    {
      "question": "How does ISR serve content during revalidation?",
      "options": [
        "Returns 503 error",
        "Serves stale cached page",
        "Blocks the request",
        "Returns empty page"
      ],
      "answer": 1,
      "explanation": "ISR serves the stale cached page while regenerating fresh content in the background."
    },
    {
      "question": "Which functions enable On-Demand ISR in the App Router?",
      "options": [
        "refreshPath and refreshTag",
        "revalidatePath and revalidateTag",
        "invalidatePath and invalidateTag",
        "clearCachePath and clearCacheTag"
      ],
      "answer": 1,
      "explanation": "On-Demand ISR uses revalidatePath() and revalidateTag() from next/cache."
    },
    {
      "question": "What is the main advantage of On-Demand ISR over time-based ISR?",
      "options": [
        "Simpler to implement",
        "Lower server costs",
        "Instant invalidation on content update",
        "Better SEO"
      ],
      "answer": 2,
      "explanation": "On-Demand ISR provides instant invalidation triggered by webhooks, eliminating wait times."
    },
    {
      "question": "What happens to traffic during ISR regeneration?",
      "options": [
        "All requests block until regeneration",
        "All requests get 503",
        "Requests get stale cached page",
        "Requests get empty page"
      ],
      "answer": 2,
      "explanation": "All incoming requests during regeneration receive the stale cached page without blocking."
    },
    {
      "question": "Which fallback strategy works best with ISR for dynamic routes?",
      "options": [
        "fallback: false",
        "fallback: true or \"blocking\"",
        "No fallback needed",
        "fallback: \"lazy\""
      ],
      "answer": 1,
      "explanation": "fallback: true or \"blocking\" enables ISR to generate pages on first request for dynamic routes."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-metadata-api"] = {
  "id": "nextjs-metadata-api",
  "title": "Metadata API",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "The Metadata API in Next.js allows defining HTML head metadata (title, description, Open Graph, Twitter cards, etc.) using exported objects or generateMetadata functions.",
    "Metadata can be defined statically via an exported metadata object or dynamically via an async generateMetadata function that receives route params and search params.",
    "Metadata is automatically deduplicated and merged following the hierarchy: parent layouts can define defaults with metadataBase and generateMetadata can override specific fields.",
    "Supports Open Graph, Twitter cards, robots.txt, alternate languages, icons/manifests, and other standard <head> meta tags."
  ],
  "laymanDefinition": "The Metadata API is like a dashboard where you fill in forms (title, description, social media preview) for each page, and Next.js automatically updates the browser tab name, search results, and social sharing cards.",
  "deepDive": [
    {
      "heading": "Static Metadata",
      "text": "Export a metadata object from any layout.js or page.js file. The object contains fields like title, description, openGraph, twitter, robots, alternates, and icons. Metadata defined in layout.js applies to all child pages and can be overridden by child metadata exports."
    },
    {
      "heading": "Dynamic Metadata with generateMetadata",
      "text": "Export an async generateMetadata function that receives { params, searchParams } and returns a metadata object. This enables dynamic metadata based on route parameters, fetched data, or request-time conditions. The function runs on every request for dynamic pages."
    },
    {
      "heading": "Metadata Field Types",
      "text": "Key fields include: title (string or template object with absolute and default), description, openGraph (url, title, description, images, siteName, locale), twitter (card, title, description, images), robots (index, follow), alternates (canonical, languages), icons, manifest, and other meta tags."
    },
    {
      "heading": "Metadata Inheritance and Merging",
      "text": "Metadata is inherited from parent layouts. A layout defines default metadata that applies to all child routes. Child pages can override specific fields. The metadataBase field sets the base URL for resolving relative paths in metadata. The title field supports template patterns like \"%s | Site Name\"."
    },
    {
      "heading": "File-Based Metadata",
      "text": "Next.js also supports file-based metadata through convention: favicon.ico, opengraph-image.png, twitter-image.png, robots.txt, sitemap.xml, and manifest.json can be placed in the app directory and are automatically served. These complement the Metadata API object approach."
    }
  ],
  "interviewAnswer": "The Metadata API simplifies SEO and social sharing configuration in Next.js applications. Its hierarchical merging system reduces duplication while allowing per-page customization. The generateMetadata function is particularly powerful for content-driven sites where metadata depends on fetched data.",
  "interviewQuestions": [
    {
      "question": "What is the Metadata API in Next.js?",
      "answer": "The Metadata API allows defining HTML head metadata by exporting metadata objects or generateMetadata functions from layout.js and page.js files. It supports title, description, Open Graph, Twitter cards, robots directives, canonical URLs, and more."
    },
    {
      "question": "How do you define static metadata?",
      "answer": "Export a metadata object from layout.js or page.js: export const metadata = { title: \"Page Title\", description: \"Page description\" }. This object can include nested openGraph, twitter, and other metadata groups."
    },
    {
      "question": "How do you define dynamic metadata?",
      "answer": "Export an async generateMetadata function that receives { params, searchParams }: export async function generateMetadata({ params }) { const post = await fetchPost(params.slug); return { title: post.title, description: post.excerpt } }."
    },
    {
      "question": "What is the title template feature?",
      "answer": "The title.template field in layout.js defines a template for child page titles. For example, { title: { template: \"%s | My Site\", default: \"My Site\" } } transforms child titles like \"About\" into \"About | My Site\"."
    },
    {
      "question": "How does metadata inheritance work?",
      "answer": "Metadata defined in a layout.js applies to all child routes. Child pages can override specific fields. If a child only defines title, the parent\\'s description is inherited. This hierarchical merging reduces duplication while allowing per-page customization."
    },
    {
      "question": "What is metadataBase used for?",
      "answer": "metadataBase sets the base URL for resolving relative paths in metadata fields. For example, metadataBase: new URL(\"https://example.com\") makes og:image: \"/og.png\" resolve to \"https://example.com/og.png\". It should match your production domain."
    },
    {
      "question": "How do you add Open Graph metadata?",
      "answer": "Include an openGraph field in the metadata object: { openGraph: { title: \"OG Title\", description: \"OG Description\", images: [{ url: \"/og.png\", width: 1200, height: 630 }] } }. Next.js generates the appropriate meta tags."
    },
    {
      "question": "What file-based metadata does Next.js support?",
      "answer": "Convention-based files: favicon.ico (root), opengraph-image.png (per-route), twitter-image.png (per-route), robots.txt (root), sitemap.xml (root), manifest.json (root). These files are automatically served and can supplement the Metadata API."
    },
    {
      "question": "How does metadata work with client-side navigation?",
      "answer": "When navigating between routes client-side, Next.js updates the document head using the new page\\'s metadata. The title and meta tags are updated dynamically without a full page reload."
    },
    {
      "question": "Can you use generateMetadata with ISR or SSG pages?",
      "answer": "Yes, generateMetadata runs during the build process for SSG pages and during revalidation for ISR pages. For dynamic metadata, it runs on the server during generation, not on the client."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Metadata API</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">layout.js metadata</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Defaults</text><line x1=\"150\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">page.js metadata</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Overrides</text><line x1=\"320\" y1=\"58\" x2=\"340\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"410\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Head Tags</text><text x=\"410\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Generated</text><line x1=\"350\" y1=\"75\" x2=\"350\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"260\" y=\"105\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"320\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Open Graph</text><text x=\"320\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Social Cards</text><rect x=\"10\" y=\"105\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"70\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">generateMetadata</text><text x=\"70\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Dynamic</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Metadata API: Hierarchical metadata with static and dynamic generation.</text></svg>",
  "codeExamples": [
    {
      "title": "Static Metadata Export",
      "useCase": "When a page has fixed SEO metadata.",
      "code": "export const metadata = {\n  title: \"About Us\",\n  description: \"Learn about our company mission and team.\",\n  openGraph: {\n    title: \"About Us | My Company\",\n    images: [\"/about-og.png\"]\n  }\n};",
      "description": "Defines static metadata that does not change between requests."
    },
    {
      "title": "Dynamic Metadata with generateMetadata",
      "useCase": "When metadata depends on fetched data.",
      "code": "export async function generateMetadata({ params }) {\n  const product = await fetch(`https://api.example.com/products/${params.id}`).then(r => r.json());\n  return {\n    title: product.name,\n    description: product.description,\n    openGraph: { images: [product.image] }\n  };\n}",
      "description": "Fetches product data and uses it to generate dynamic title, description, and OG image."
    },
    {
      "title": "Title Template in Layout",
      "useCase": "When all pages in a section should share a title suffix.",
      "code": "// app/layout.js\nexport const metadata = {\n  title: {\n    template: \"%s | My Store\",\n    default: \"My Store\"\n  }\n};\n\n// app/products/page.js — title becomes \"Products | My Store\"\nexport const metadata = { title: \"Products\" };",
      "description": "The title template automatically adds \" | My Store\" to every child page title."
    },
    {
      "title": "Open Graph and Twitter Cards",
      "useCase": "When social sharing previews are important.",
      "code": "export const metadata = {\n  openGraph: {\n    title: \"Blog Post\",\n    description: \"Read our latest blog post\",\n    type: \"article\",\n    publishedTime: \"2024-01-01\",\n    authors: [\"Author Name\"]\n  },\n  twitter: {\n    card: \"summary_large_image\",\n    title: \"Blog Post\",\n    images: [\"/blog-og.png\"]\n  }\n};",
      "description": "Configures both Open Graph and Twitter card metadata for rich social sharing previews."
    },
    {
      "title": "Using metadataBase",
      "useCase": "When you need absolute URLs in metadata.",
      "code": "export const metadata = {\n  metadataBase: new URL(\"https://example.com\"),\n  alternates: {\n    canonical: \"/products\",\n    languages: { \"en-US\": \"/en/products\", \"es\": \"/es/products\" }\n  },\n  robots: {\n    index: true,\n    follow: true\n  }\n};",
      "description": "Sets the base URL for resolving relative paths and defines canonical URL and language alternatives."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How do you define static metadata in Next.js?",
      "options": [
        "Export generateMetadata function",
        "Export metadata object",
        "Use next/head component",
        "Set document.title"
      ],
      "answer": 1,
      "explanation": "Export a metadata object from layout.js or page.js for static metadata."
    },
    {
      "question": "What does the title template pattern \"%s | Site Name\" do?",
      "options": [
        "Adds \"Site Name\" before the title",
        "Replaces \"Site Name\" with the page title",
        "Prepends page title with \" | Site Name\"",
        "Creates two title tags"
      ],
      "answer": 2,
      "explanation": "The %s placeholder is replaced with the page title, followed by \" | Site Name\"."
    },
    {
      "question": "Which function enables dynamic metadata generation?",
      "options": [
        "getMetadata",
        "generateMetadata",
        "createMetadata",
        "dynamicMetadata"
      ],
      "answer": 1,
      "explanation": "generateMetadata is an async function that receives params and returns a metadata object."
    },
    {
      "question": "What does metadataBase define?",
      "options": [
        "The HTML lang attribute",
        "The base URL for relative metadata URLs",
        "The database connection string",
        "The base font size"
      ],
      "answer": 1,
      "explanation": "metadataBase sets the base URL for resolving relative paths in metadata fields."
    },
    {
      "question": "Which file-based convention provides the Open Graph image for a route?",
      "options": [
        "favicon.ico",
        "opengraph-image.png",
        "twitter-image.jpg",
        "meta-image.png"
      ],
      "answer": 1,
      "explanation": "opengraph-image.png (or .jpg) placed in a route directory provides the OG image."
    },
    {
      "question": "How does metadata inheritance work between layout and page?",
      "options": [
        "Page replaces all layout metadata",
        "Page overrides only specified fields",
        "Layout overrides page",
        "No inheritance"
      ],
      "answer": 1,
      "explanation": "Child pages override only the fields they specify; parent layout fields are inherited for unspecified fields."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-route-handlers"] = {
  "id": "nextjs-route-handlers",
  "title": "Route Handlers",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Route Handlers allow creating API endpoints within Next.js using route.js files in the App Router directory.",
    "Support all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) via exported async functions named after the method.",
    "Route Handlers are server-only and do not increase client bundle size, making them ideal for form submissions, webhooks, and internal API calls.",
    "Support dynamic routes (route groups), middleware integration, cookies/headers access, streaming responses, and request body parsing."
  ],
  "laymanDefinition": "Route Handlers are like having a mini backend server built into your frontend project. You create files with special names and export functions for GET, POST, etc., and Next.js automatically turns them into API endpoints.",
  "deepDive": [
    {
      "heading": "Route Handler Basics",
      "text": "Create a route.js file in the app directory. Export async functions named after HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. Each function receives a Request object and returns a Response or NextResponse. Route Handlers are server-only and cannot be used in Client Components."
    },
    {
      "heading": "Request and Response Handling",
      "text": "Route Handlers receive the standard Web Request API. Parse JSON with request.json(), read form data with request.formData(), access headers with request.headers, and get query parameters from the URL. Responses use the standard Web Response API or NextResponse for convenience methods."
    },
    {
      "heading": "Dynamic Route Handlers",
      "text": "Create route handlers in dynamic route folders: app/api/items/[id]/route.js. Access route parameters via the second argument: export async function GET(request, { params }) { ... }. Supports catch-all routes ([...slug]) and optional catch-all routes ([[...slug]])."
    },
    {
      "heading": "Middleware and Authentication",
      "text": "Route Handlers integrate with Next.js middleware (middleware.js) for authentication, rate limiting, and request preprocessing. They can access cookies (via request.cookies or next/headers) and headers (via request.headers or headers() from next/headers)."
    },
    {
      "heading": "Streaming and Edge Runtime",
      "text": "Route Handlers support streaming responses using the Web Streams API. They can run on the Edge Runtime for low-latency global responses or the Node.js Runtime for full Node.js API access. The runtime is selected automatically based on used APIs or explicit configuration."
    }
  ],
  "interviewAnswer": "Route Handlers provide a first-class API layer within Next.js applications, eliminating the need for a separate backend server for many use cases. They are ideal for form handling, webhook endpoints, API proxies, and server-side business logic.",
  "interviewQuestions": [
    {
      "question": "What are Route Handlers in Next.js?",
      "answer": "Route Handlers are API endpoints defined by route.js files in the App Router directory. Each exported HTTP method function (GET, POST, PUT, etc.) handles requests to that route. They are server-only, do not affect client bundle size, and work with the standard Web Request/Response API."
    },
    {
      "question": "How do you create a GET Route Handler?",
      "answer": "Create a route.js file and export an async function named GET: export async function GET(request) { return Response.json({ message: \"Hello\" }) }. The function receives the incoming Request object and must return a Response or NextResponse."
    },
    {
      "question": "How do you access route parameters in handlers?",
      "answer": "Dynamic route parameters are available in the second argument: export async function GET(request, { params }) { const id = params.id }. The params object matches the dynamic segment names defined by the folder structure (e.g., [id] provides params.id)."
    },
    {
      "question": "How do you parse request bodies?",
      "answer": "Use the Request API methods: request.json() for JSON bodies, request.formData() for form data, request.text() for plain text. These return Promises that resolve to the parsed body. Always validate and type-check parsed data before use."
    },
    {
      "question": "Can Route Handlers access cookies?",
      "answer": "Yes, via the cookies() function from next/headers: import { cookies } from \"next/headers\"; const cookieStore = cookies(); const token = cookieStore.get(\"token\"). Alternatively, use request.cookies for read-only access."
    },
    {
      "question": "What runtimes do Route Handlers support?",
      "answer": "Route Handlers support both the Edge Runtime (fast, globally distributed, limited Node.js APIs) and the Node.js Runtime (full Node.js API access, filesystem, databases). The runtime is selected automatically or can be forced with export const runtime = \"edge\" or \"nodejs\"."
    },
    {
      "question": "How do Route Handlers differ from API Routes in the Pages Router?",
      "answer": "Route Handlers (App Router) use route.js files and the Web Request/Response API. API Routes (Pages Router) use pages/api/ files and Express-like req/res objects. Route Handlers support Edge Runtime, streaming, and better typing."
    },
    {
      "question": "Can Route Handlers be called from Client Components?",
      "answer": "Yes, Client Components can call Route Handlers via fetch() just like any external API. Route Handlers are essentially internal API endpoints. This is the recommended pattern for form submissions and server actions that need explicit API endpoints."
    },
    {
      "question": "How do you handle CORS in Route Handlers?",
      "answer": "Set CORS headers in the Response object: return new Response(null, { headers: { \"Access-Control-Allow-Origin\": \"*\", \"Access-Control-Allow-Methods\": \"GET, POST, PUT, DELETE\" } }). For preflight requests, export an OPTIONS handler."
    },
    {
      "question": "How do you implement error handling in Route Handlers?",
      "answer": "Use try-catch blocks and return appropriate HTTP status codes. Return Response.json({ error: message }, { status: 400 }) for client errors and Response.json({ error: \"Internal Server Error\" }, { status: 500 }) for server errors. Use NextResponse for convenience methods like NextResponse.redirect()."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Route Handlers</text><rect x=\"10\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"60\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client Request</text><text x=\"60\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Browser</text><line x1=\"110\" y1=\"58\" x2=\"130\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"140\" y=\"40\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"205\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">route.js</text><text x=\"205\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">GET / POST handler</text><line x1=\"270\" y1=\"58\" x2=\"290\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"300\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"350\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server Logic</text><text x=\"350\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Process</text><line x1=\"300\" y1=\"75\" x2=\"300\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"295\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Response.json()</text><text x=\"295\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">JSON Response</text><rect x=\"10\" y=\"105\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"60\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Headers/Cookies</text><text x=\"60\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Auth</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Route Handlers: API endpoints defined by route.js in the App Router directory.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic GET Route Handler",
      "useCase": "When you need a simple API endpoint.",
      "code": "// app/api/hello/route.js\nexport async function GET() {\n  return Response.json({ message: \"Hello World\" });\n}",
      "description": "Creates a GET endpoint at /api/hello that returns JSON."
    },
    {
      "title": "POST Handler with Body Parsing",
      "useCase": "When handling form submissions or webhook payloads.",
      "code": "// app/api/contact/route.js\nexport async function POST(request) {\n  const body = await request.json();\n  const { name, email } = body;\n  return Response.json({ success: true, name }, { status: 201 });\n}",
      "description": "Parses JSON request body and returns a 201 response."
    },
    {
      "title": "Dynamic Route Handler",
      "useCase": "When you need CRUD operations on a resource.",
      "code": "// app/api/items/[id]/route.js\nexport async function GET(request, { params }) {\n  const item = await db.findItem(params.id);\n  if (!item) return Response.json({ error: \"Not found\" }, { status: 404 });\n  return Response.json(item);\n}\n\nexport async function DELETE(request, { params }) {\n  await db.deleteItem(params.id);\n  return new Response(null, { status: 204 });\n}",
      "description": "Handles GET and DELETE for a specific item by ID, with 404 handling."
    },
    {
      "title": "Route Handler with Headers and Cookies",
      "useCase": "When you need authentication context.",
      "code": "import { cookies, headers } from \"next/headers\";\n\nexport async function GET() {\n  const cookieStore = cookies();\n  const token = cookieStore.get(\"auth-token\");\n  const headersList = headers();\n  const referer = headersList.get(\"referer\");\n  return Response.json({ token, referer });\n}",
      "description": "Accesses server-side cookies and request headers using next/headers utilities."
    },
    {
      "title": "CORS-Enabled Route Handler",
      "useCase": "When your API needs to be called from external origins.",
      "code": "export async function GET() {\n  return Response.json({ data: \"public\" }, {\n    headers: {\n      \"Access-Control-Allow-Origin\": \"*\",\n      \"Access-Control-Allow-Methods\": \"GET, OPTIONS\"\n    }\n  });\n}\n\nexport async function OPTIONS() {\n  return new Response(null, {\n    headers: {\n      \"Access-Control-Allow-Origin\": \"*\",\n      \"Access-Control-Allow-Methods\": \"GET, OPTIONS\"\n    }\n  });\n}",
      "description": "Handles CORS preflight requests and adds CORS headers to the response."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What file defines Route Handlers in the App Router?",
      "options": [
        "api.js",
        "route.js",
        "handler.js",
        "endpoint.js"
      ],
      "answer": 1,
      "explanation": "Route Handlers are defined in route.js files within the app directory."
    },
    {
      "question": "How do you access route parameters in a Route Handler?",
      "options": [
        "From request.params",
        "From the second function argument params",
        "From global params object",
        "From URL query string"
      ],
      "answer": 1,
      "explanation": "Parameters are available in the second argument: GET(request, { params })."
    },
    {
      "question": "What API should you use to parse a JSON request body?",
      "options": [
        "request.body",
        "request.json()",
        "JSON.parse(request)",
        "request.text()"
      ],
      "answer": 1,
      "explanation": "request.json() parses the JSON body and returns a Promise."
    },
    {
      "question": "Which import provides cookie access in Route Handlers?",
      "options": [
        "next/server",
        "next/cookies",
        "next/headers",
        "next/request"
      ],
      "answer": 2,
      "explanation": "cookies() is imported from next/headers for server-side cookie access."
    },
    {
      "question": "How do you set the runtime to Edge for a Route Handler?",
      "options": [
        "export const runtime = \"edge\"",
        "export const edge = true",
        "Set edgeRuntime in config",
        "Use edge.js extension"
      ],
      "answer": 0,
      "explanation": "Export export const runtime = \"edge\" to use the Edge Runtime."
    },
    {
      "question": "What does the OPTIONS handler do in a Route Handler?",
      "options": [
        "Handles PUT requests",
        "Handles CORS preflight requests",
        "Handles DELETE requests",
        "Handles redirect requests"
      ],
      "answer": 1,
      "explanation": "The OPTIONS handler responds to CORS preflight requests from browsers."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-server-components"] = {
  "id": "nextjs-server-components",
  "title": "Server Components",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "React Server Components (RSC) are components that render exclusively on the server, sending only the resulting HTML to the client.",
    "In Next.js, all components in the App Router are Server Components by default, reducing client-side JavaScript bundle size significantly.",
    "Server Components can directly access databases, filesystems, and backend services without exposing sensitive logic to the client.",
    "They cannot use React hooks, browser APIs, event handlers, or state management, making them ideal for data fetching and static content rendering."
  ],
  "laymanDefinition": "Server Components are like kitchen prep chefs who prepare all the ingredients (fetch data, query databases) before the food goes to the dining area (browser). The diners only see the finished dish (HTML), not the kitchen tools (server code).",
  "deepDive": [
    {
      "heading": "What Are Server Components",
      "text": "Server Components are React components that run exclusively on the server during rendering. They are the default in Next.js App Router. They reduce client bundle size because their code, dependencies, and imported libraries never reach the browser. They can use Node.js APIs directly (database queries, filesystem access)."
    },
    {
      "heading": "Benefits of Server Components",
      "text": "Reduced JavaScript bundle size (server-only code is excluded), direct backend access (no API layer needed for data fetching), automatic code splitting (only client components are bundled), improved initial page load (HTML is pre-rendered), and better SEO (complete HTML is served)."
    },
    {
      "heading": "Limitations and Constraints",
      "text": "Server Components cannot use useState, useEffect, useContext, useReducer, or any React hooks. They cannot use browser APIs (window, document, localStorage). They cannot handle user interactions (onClick, onChange). They cannot use context providers or event handlers. These features require Client Components."
    },
    {
      "heading": "Data Fetching in Server Components",
      "text": "Server Components can use async/await directly in the component function. They can fetch data from databases, APIs, or filesystems. The App Router automatically deduplicates fetch requests and caches responses. Data fetching is done at the component level, eliminating prop drilling for data."
    },
    {
      "heading": "Server Component Composition",
      "text": "Server Components can import and render Client Components, creating a seamless hybrid. Data can be passed from Server Components to Client Components as props. The boundary between server and client is clearly marked by the \"use client\" directive. Server Components can also be passed as children to Client Components."
    }
  ],
  "interviewAnswer": "Server Components represent a fundamental shift in React architecture. By moving data fetching and rendering to the server, they eliminate the need for client-side state management for data, reduce bundle sizes, and improve performance. The key to mastering Server Components is understanding the server/client boundary.",
  "interviewQuestions": [
    {
      "question": "What are React Server Components?",
      "answer": "Server Components are React components that run and render exclusively on the server. They never send their JavaScript code to the client; only the rendered HTML output is sent. This reduces bundle size and enables direct access to server-side resources like databases."
    },
    {
      "question": "How are Server Components different from Client Components?",
      "answer": "Server Components run on the server, have no client-side interactivity, and reduce bundle size. Client Components run in the browser, support hooks and event handlers, and increase bundle size. In the App Router, all components are Server Components by default."
    },
    {
      "question": "What can Server Components do that Client Components cannot?",
      "answer": "Server Components can directly access databases, read from the filesystem, use environment variables (non-NEXT_PUBLIC_), access backend services, and perform CPU-intensive computations without affecting client performance. They can also keep sensitive logic (API keys, business logic) server-side."
    },
    {
      "question": "What are the limitations of Server Components?",
      "answer": "Server Components cannot use React hooks (useState, useEffect, useContext, etc.), browser APIs (window, document), event handlers (onClick, onSubmit), or create React context. They are rendered only on the server and do not re-render on the client."
    },
    {
      "question": "How do you fetch data in Server Components?",
      "answer": "Use async/await directly in the component: export default async function Page() { const data = await fetch(\"https://api.example.com/data\"); return <div>{data.title}</div> }. Next.js automatically deduplicates and caches fetch requests."
    },
    {
      "question": "How do you add interactivity to Server Components?",
      "answer": "Server Components cannot be interactive. To add interactivity, import and render a Client Component (marked with \"use client\") from within a Server Component. The Client Component handles event handlers, state, and browser APIs while the Server Component handles data fetching and layout."
    },
    {
      "question": "What happens when a Server Component re-renders?",
      "answer": "Server Components only render on the server. When data changes, the component re-renders on the server, and the new HTML is sent to the client. Client-side state and UI are preserved during this process. Client Components nested inside Server Components maintain their state across re-renders."
    },
    {
      "question": "How does the Server Component pattern improve performance?",
      "answer": "By rendering on the server, Server Components eliminate the need to download, parse, and execute JavaScript for data fetching and rendering logic. This reduces the bundle size, improves Time to Interactive, and reduces the device resources required."
    },
    {
      "question": "Can Server Components use CSS-in-JS libraries?",
      "answer": "Most CSS-in-JS libraries require client-side JavaScript execution and cannot be used directly in Server Components. Use CSS Modules, Tailwind CSS, or other zero-runtime CSS solutions with Server Components. Some libraries like styled-components have experimental server-side support."
    },
    {
      "question": "How do Server Components handle authentication?",
      "answer": "Server Components can check authentication by reading cookies or session tokens server-side. They can conditionally render content based on auth state. For interactive auth flows (login forms, redirects), use Client Components wrapped by Server Components that provide the initial auth state."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Server Components</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server Component</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Runs on Server</text><line x1=\"150\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Direct DB/API</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Fetch Data</text><line x1=\"320\" y1=\"58\" x2=\"340\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"410\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">HTML Output</text><text x=\"410\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">to Client</text><line x1=\"350\" y1=\"75\" x2=\"350\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"300\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client Component</text><text x=\"300\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Interactive (useState)</text><line x1=\"230\" y1=\"123\" x2=\"180\" y2=\"123\" stroke=\"#999\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"105\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"80\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server Component</text><text x=\"80\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">No JS bundle</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Server Components: Server-rendered by default, reduce JS bundle, direct backend access.</text></svg>",
  "codeExamples": [
    {
      "title": "Async Server Component for Data Fetching",
      "useCase": "When you need to fetch data and render it directly.",
      "code": "// app/page.js — Server Component by default\nexport default async function Home() {\n  const res = await fetch(\"https://api.example.com/posts\");\n  const posts = await res.json();\n  return (\n    <ul>\n      {posts.map(p => <li key={p.id}>{p.title}</li>)}\n    </ul>\n  );\n}",
      "description": "Fetches posts directly in the component without useEffect, loading state, or API route."
    },
    {
      "title": "Server Component with Database Access",
      "useCase": "When you need to query a database directly.",
      "code": "import { sql } from \"@vercel/postgres\";\n\nexport default async function Users() {\n  const { rows } = await sql`SELECT * FROM users`;\n  return (\n    <table>\n      {rows.map(r => <tr key={r.id}><td>{r.name}</td></tr>)}\n    </table>\n  );\n}",
      "description": "Queries a PostgreSQL database directly in the Server Component without an API layer."
    },
    {
      "title": "Server Component with Client Composition",
      "useCase": "When you need both data and interactivity.",
      "code": "// Server Component (parent)\nimport LikeButton from \"./LikeButton\";\n\nexport default async function PostPage({ params }) {\n  const post = await fetchPost(params.id);\n  return (\n    <div>\n      <h1>{post.title}</h1>\n      <p>{post.content}</p>\n      <LikeButton initialLikes={post.likes} />\n    </div>\n  );\n}\n\n// Client Component (child)\n\"use client\"\nexport default function LikeButton({ initialLikes }) {\n  const [likes, setLikes] = useState(initialLikes);\n  return <button onClick={() => setLikes(l => l + 1)}>{likes} likes</button>\n}",
      "description": "Server Component handles data fetching, Client Component handles the interactive like button."
    },
    {
      "title": "Server Component with Error Handling",
      "useCase": "When you need graceful error handling.",
      "code": "export default async function Product({ id }) {\n  try {\n    const product = await fetchProduct(id);\n    return <div>{product.name}</div>;\n  } catch (error) {\n    console.error(\"Failed to fetch product:\", error);\n    return <div className=\"error\">Product not available</div>;\n  }\n}",
      "description": "Error handling in Server Components uses try-catch with fallback UI rendering."
    },
    {
      "title": "Server Component with Suspense",
      "useCase": "When you want streaming with loading states.",
      "code": "import { Suspense } from \"react\";\n\nasync function ProductList() {\n  const products = await fetchProducts();\n  return products.map(p => <div key={p.id}>{p.name}</div>);\n}\n\nexport default function Page() {\n  return (\n    <Suspense fallback={<div>Loading products...</div>}>\n      <ProductList />\n    </Suspense>\n  );\n}",
      "description": "Wraps the async Server Component in Suspense for streaming and immediate loading feedback."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the default component type in the App Router?",
      "options": [
        "Client Component",
        "Server Component",
        "Hybrid Component",
        "Static Component"
      ],
      "answer": 1,
      "explanation": "All components in the App Router are Server Components by default."
    },
    {
      "question": "Which of the following can a Server Component use?",
      "options": [
        "useState",
        "Database queries",
        "onClick handlers",
        "localStorage"
      ],
      "answer": 1,
      "explanation": "Server Components can directly access databases since they run on the server."
    },
    {
      "question": "How do you mark a component as a Client Component?",
      "options": [
        "Add \"use client\" at the top",
        "Export as client wrapper",
        "Use ClientComponent HOC",
        "Configure in next.config"
      ],
      "answer": 0,
      "explanation": "Add the \"use client\" directive at the top of the file to mark it as a Client Component."
    },
    {
      "question": "What is sent to the client from a Server Component?",
      "options": [
        "Component source code",
        "Rendered HTML (no JS)",
        "JavaScript bundle",
        "Server logs"
      ],
      "answer": 1,
      "explanation": "Only the rendered HTML output is sent; no JavaScript source code is included."
    },
    {
      "question": "Can Server Components use React context?",
      "options": [
        "Yes, always",
        "No, context requires Client Components",
        "Yes, with use client",
        "Only for theme context"
      ],
      "answer": 1,
      "explanation": "React context requires client-side state, so it is not available in Server Components."
    },
    {
      "question": "How are fetch requests optimized in Server Components?",
      "options": [
        "They are blocked",
        "They are automatically deduplicated",
        "They run on the client",
        "They are cached for one hour"
      ],
      "answer": 1,
      "explanation": "Next.js automatically deduplicates identical fetch requests within a render pass."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-client-components"] = {
  "id": "nextjs-client-components",
  "title": "Client Components",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Client Components are React components that render on the client browser, enabling interactivity through hooks, event handlers, and browser APIs.",
    "Marked with the \"use client\" directive at the top of the file, creating a clear boundary between server and client code.",
    "All components imported into a Client Component file also become part of the client bundle, making the placement of the \"use client\" directive strategically important.",
    "Client Components can be rendered server-side during the initial page load (SSR) but are hydrated and become interactive on the client."
  ],
  "laymanDefinition": "Client Components are like interactive touchscreens in a museum: the content may be prepared by the server, but the buttons, animations, and real-time updates all happen on your device.",
  "deepDive": [
    {
      "heading": "The \"use client\" Directive",
      "text": "Adding \"use client\" at the top of a file marks it and all its imports as Client Components. This directive creates the server-client boundary. All React hooks (useState, useEffect, useRef, useCallback, useMemo, useContext) and event handlers are only available in Client Components."
    },
    {
      "heading": "Server-Side Rendering of Client Components",
      "text": "Client Components are pre-rendered on the server during initial page load, producing static HTML. After the JavaScript loads, React hydrates the component, making it interactive. This means Client Components get both SSR benefits (fast initial HTML) and client interactivity."
    },
    {
      "heading": "Bundle Size Considerations",
      "text": "Client Components increase the JavaScript bundle size. Strategically place the \"use client\" directive at the lowest possible level to minimize the client bundle. Server Components that contain no client logic should remain server-only. Use dynamic imports with ssr: false for rarely-used client components."
    },
    {
      "heading": "Composition Patterns",
      "text": "Best practice: Server Components handle data fetching and static rendering, passing data as props to Client Components. Client Components handle interactivity. Use the children prop pattern to pass Server Component output into Client Component wrappers. Avoid importing Server Components into Client Components."
    },
    {
      "heading": "Third-Party Library Usage",
      "text": "Many React libraries (UI components, charts, form libraries) require client-side JavaScript. Wrap third-party client libraries in Client Components. Server Components can import and render these client wrappers. Some newer libraries offer both server and client exports."
    }
  ],
  "interviewAnswer": "Client Components are essential for interactive web applications but should be used strategically. The recommended pattern is maximal Server Components with minimal, targeted Client Components. Each \"use client\" boundary should be justified by actual interactivity requirements.",
  "interviewQuestions": [
    {
      "question": "What are Client Components in Next.js?",
      "answer": "Client Components are components that render on the client browser. They support React hooks, event handlers, browser APIs, and state management. They are marked with the \"use client\" directive and can be server-side rendered during initial load for SEO benefits."
    },
    {
      "question": "How do you create a Client Component?",
      "answer": "Add \"use client\" as the first line of the file. This marks the component and all its direct imports as client-side. Then you can use React hooks, event handlers, and browser APIs. The component will be pre-rendered on the server and hydrated on the client."
    },
    {
      "question": "What is the server-client boundary?",
      "answer": "The server-client boundary is defined by the \"use client\" directive. Everything above the boundary (server-side) is rendered on the server. Everything below the boundary (the Client Component and its imports) is rendered on the client. This boundary determines what code goes into the client bundle."
    },
    {
      "question": "Can Client Components be server-side rendered?",
      "answer": "Yes, Client Components are pre-rendered on the server during the initial page load. This produces static HTML that is sent to the client. After the JavaScript bundle loads, React hydrates the HTML, attaching event handlers and making it interactive."
    },
    {
      "question": "How do you minimize client bundle size with Client Components?",
      "answer": "Place the \"use client\" directive at the lowest possible component level. Keep data fetching and static rendering in Server Components. Use dynamic imports with next/dynamic for client components that are not immediately visible. Pass Server Components as children to Client Components using the children prop."
    },
    {
      "question": "What happens when you import a Server Component into a Client Component?",
      "answer": "If you import a Server Component directly into a Client Component, the Server Component becomes a Client Component too (it loses its server-side capabilities). Use the composition pattern: pass Server Components as children or props to Client Components instead of importing them."
    },
    {
      "question": "How do you use third-party UI libraries in the App Router?",
      "answer": "Third-party UI components that use hooks or browser APIs must be wrapped in Client Components. Create a wrapper file with \"use client\", import the library, and re-export it. Server Components can then import and render this client wrapper."
    },
    {
      "question": "What hooks are available in Client Components?",
      "answer": "All React hooks: useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, useImperativeHandle, useLayoutEffect, useDebugValue, useId, useSyncExternalStore, useTransition, useDeferredValue. Custom hooks that use these hooks are also available."
    },
    {
      "question": "Can Client Components use environment variables?",
      "answer": "Client Components can only access environment variables prefixed with NEXT_PUBLIC_. Server-only environment variables are not available in Client Components. Use NEXT_PUBLIC_ prefix for values that need to be accessed client-side."
    },
    {
      "question": "How do you handle loading states in Client Components?",
      "answer": "Use React hooks like useState for loading state, useEffect for data fetching with loading indicators, or libraries like SWR/TanStack Query that provide built-in loading states. For suspense-based loading, wrap Client Components in Suspense boundaries defined in Server Components."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Client Components</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">\"use client\"</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Directive</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"230\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client Bundle</text><text x=\"230\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Includes JS</text><line x1=\"290\" y1=\"58\" x2=\"320\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"330\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"390\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Hydration</text><text x=\"390\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">on Client</text><line x1=\"330\" y1=\"75\" x2=\"330\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"295\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Interactive</text><text x=\"295\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">useState/onClick</text><rect x=\"10\" y=\"105\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"75\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server Pre-render</text><text x=\"75\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Initial HTML</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Client Components: Browser-rendered with hooks, interactivity, and browser API access.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Client Component with State",
      "useCase": "When you need a counter or toggle.",
      "code": "\"use client\";\nimport { useState } from \"react\";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>\n}",
      "description": "A simple interactive counter using useState hook."
    },
    {
      "title": "Client Component with useEffect",
      "useCase": "When you need browser-side data fetching.",
      "code": "\"use client\";\nimport { useState, useEffect } from \"react\";\n\nexport default function GeoLocation() {\n  const [location, setLocation] = useState(null);\n  useEffect(() => {\n    navigator.geolocation.getCurrentPosition(pos => setLocation(pos.coords));\n  }, []);\n  return <div>Lat: {location?.latitude}, Lng: {location?.longitude}</div>;\n}",
      "description": "Uses the browser Geolocation API, which requires client-side execution."
    },
    {
      "title": "Client Component with Server Component Composition",
      "useCase": "When you want to minimize client code.",
      "code": "// Server Component (parent)\nimport InteractivePanel from \"./InteractivePanel\";\n\nexport default async function Dashboard() {\n  const data = await fetchDashboardData();\n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <InteractivePanel initialData={data} />\n    </div>\n  );\n}\n\n// Client Component (child)\n\"use client\";\nexport default function InteractivePanel({ initialData }) {\n  const [filtered, setFiltered] = useState(initialData);\n  return <div onClick={() => setFiltered(initialData.filter(f))}>...</div>\n}",
      "description": "Server Component fetches data, Client Component handles interactivity."
    },
    {
      "title": "Dynamic Import of Client Component",
      "useCase": "When you want to lazy-load a heavy client component.",
      "code": "import dynamic from \"next/dynamic\";\n\nconst HeavyChart = dynamic(() => import(\"../components/Chart\"), {\n  ssr: false,\n  loading: () => <div>Loading chart...</div>\n});\n\nexport default function Page() {\n  return <HeavyChart />;\n}",
      "description": "The Chart component is loaded only when needed, reducing initial bundle size."
    },
    {
      "title": "Third-Party Library Wrapper",
      "useCase": "When using a React library that requires client-side execution.",
      "code": "\"use client\";\nimport { motion } from \"framer-motion\";\n\nexport default function AnimatedElement({ children }) {\n  return <motion.div animate={{ opacity: 1 }}>{children}</motion.div>;\n}",
      "description": "Wraps framer-motion in a Client Component so it can be used from a Server Component."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What directive marks a component as a Client Component?",
      "options": [
        "\"use server\"",
        "\"use client\"",
        "\"use browser\"",
        "\"use csr\""
      ],
      "answer": 1,
      "explanation": "The \"use client\" directive marks the server-client boundary."
    },
    {
      "question": "Which feature is available in Client Components but NOT in Server Components?",
      "options": [
        "Database queries",
        "Environment variables",
        "useState hook",
        "Direct data fetching"
      ],
      "answer": 2,
      "explanation": "React hooks like useState are only available in Client Components."
    },
    {
      "question": "What happens to Client Components during initial page load?",
      "options": [
        "They are not rendered",
        "They are pre-rendered as HTML on the server",
        "They only render after hydration",
        "They require JavaScript to show anything"
      ],
      "answer": 1,
      "explanation": "Client Components are pre-rendered on the server for initial HTML, then hydrated."
    },
    {
      "question": "How should you minimize the client bundle?",
      "options": [
        "Use many Client Components",
        "Place \"use client\" at the leaf level only",
        "Avoid using hooks",
        "Use inline scripts"
      ],
      "answer": 1,
      "explanation": "Place \"use client\" at the lowest possible component level to minimize client bundle size."
    },
    {
      "question": "What happens when you import a Server Component directly into a Client Component?",
      "options": [
        "It stays a Server Component",
        "It becomes part of the client bundle",
        "It throws an error",
        "It renders on both sides"
      ],
      "answer": 1,
      "explanation": "Directly imported Server Components become part of the client bundle and lose server capabilities."
    },
    {
      "question": "Which environment variables can Client Components access?",
      "options": [
        "All environment variables",
        "Only NEXT_PUBLIC_ prefixed variables",
        "Only server variables",
        "No environment variables"
      ],
      "answer": 1,
      "explanation": "Client Components can only access environment variables with the NEXT_PUBLIC_ prefix."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-dynamic-routes"] = {
  "id": "nextjs-dynamic-routes",
  "title": "Dynamic Routes",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Dynamic Routes in Next.js allow creating parameterized URLs using bracket syntax in folder names, supporting both the App Router and Pages Router.",
    "Single dynamic segments use [slug] syntax, catch-all segments use [...slug], and optional catch-all segments use [[...slug]].",
    "Dynamic route parameters are accessible via the params prop in page components or the second argument in route handlers.",
    "generateStaticParams (App Router) or getStaticPaths (Pages Router) defines which dynamic paths are pre-rendered at build time for SSG/ISR."
  ],
  "laymanDefinition": "Dynamic Routes are like URL templates with blank fields. For example, /products/[id] means any product ID works: /products/1, /products/abc, or /products/blue-shirt all map to the same template.",
  "deepDive": [
    {
      "heading": "Dynamic Route Syntax",
      "text": "In the App Router, dynamic routes use folder-level bracket notation: app/products/[id]/page.js creates /products/1, /products/abc. Catch-all: app/posts/[...slug]/page.js matches /posts/a/b/c. Optional catch-all: app/posts/[[...slug]]/page.js also matches /posts."
    },
    {
      "heading": "Accessing Dynamic Parameters",
      "text": "In the App Router, page components receive params as a prop: export default function Page({ params }) { return <div>{params.id}</div> }. In the Pages Router, use the router.query object or getServerSideProps/getStaticProps context.params."
    },
    {
      "heading": "generateStaticParams for Static Generation",
      "text": "In the App Router, export async function generateStaticParams() to specify which dynamic paths to pre-render at build time. Returns an array of objects with the dynamic parameter values. Combine with revalidation for ISR."
    },
    {
      "heading": "Dynamic Routes in Route Handlers",
      "text": "Route Handlers support dynamic parameters: app/api/products/[id]/route.js. Access params in the second argument: export async function GET(request, { params }). Supports catch-all patterns for flexible API endpoints."
    },
    {
      "heading": "Matching and Precedence",
      "text": "Next.js resolves route conflicts by specificity: static routes take precedence over dynamic routes. More specific dynamic routes (e.g., [slug] vs [...slug]) take precedence over less specific ones. The order of definition does not matter; the framework determines the best match."
    }
  ],
  "interviewAnswer": "Dynamic Routes are a core feature of Next.js routing, enabling everything from blog posts to e-commerce product pages. Understanding the different bracket syntax patterns and when to use each is essential for building flexible, content-driven applications.",
  "interviewQuestions": [
    {
      "question": "What are Dynamic Routes in Next.js?",
      "answer": "Dynamic Routes allow parts of the URL to be variable, defined using bracket syntax in folder names. For example, app/blog/[slug]/page.js creates a route that matches /blog/any-slug-value. The captured value is available as the params prop."
    },
    {
      "question": "What is the difference between [slug] and [...slug]?",
      "answer": "[slug] matches a single URL segment (e.g., /blog/hello). [...slug] matches one or more segments (e.g., /blog/2024/01/hello). [...slug] captures segments as an array. Use [slug] for single parameters and [...slug] for nested paths."
    },
    {
      "question": "What is an optional catch-all route?",
      "answer": "[[...slug]] matches with or without the parameter. For example, app/[[...slug]]/page.js matches /, /a, /a/b. The params.slug is undefined for the root and an array for deeper paths. Useful for documentation or category hierarchies with optional nesting."
    },
    {
      "question": "How do you access dynamic route parameters?",
      "answer": "In App Router pages: export default function Page({ params }) { params.id }. In Route Handlers: export async function GET(request, { params }). In Pages Router: use router.query.id or getServerSideProps context.params."
    },
    {
      "question": "What is generateStaticParams?",
      "answer": "generateStaticParams is the App Router equivalent of getStaticPaths. It defines which dynamic paths are pre-rendered at build time. Returns an array of objects: [{ slug: \"post-1\" }, { slug: \"post-2\" }]. Used with static or ISR rendering strategies."
    },
    {
      "question": "How does route resolution work with conflicting routes?",
      "answer": "Static routes take precedence over dynamic routes. Among dynamic routes, more specific patterns take precedence. For example, /products/create (static) wins over /products/[id] (dynamic). The framework automatically handles precedence without explicit ordering."
    },
    {
      "question": "Can you have multiple dynamic segments in one route?",
      "answer": "Yes, you can have multiple dynamic segments: app/[category]/[product]/page.js matches /electronics/phone-1. Each segment captures its respective value in params: { category: \"electronics\", product: \"phone-1\" }."
    },
    {
      "question": "How do dynamic routes work with ISR?",
      "answer": "Dynamic routes can use ISR by combining generateStaticParams with fetch options like next: { revalidate: 60 } or by using revalidatePath for On-Demand ISR. Pages not specified in generateStaticParams use fallback behavior."
    },
    {
      "question": "How do you get query parameters in dynamic routes?",
      "answer": "Query parameters are available via searchParams in the App Router: export default function Page({ params, searchParams }). In the Pages Router, use router.query or getServerSideProps context.query."
    },
    {
      "question": "What happens if a dynamic route parameter is missing?",
      "answer": "For required dynamic segments ([slug]), the route only matches if the segment is present in the URL. For optional catch-all routes ([[...slug]]), both the root and nested paths match. Missing required parameters result in a 404."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Dynamic Routes</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">app/products/[id]/page.js</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Dynamic File</text><line x1=\"150\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/products/123</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">URL Match</text><line x1=\"320\" y1=\"58\" x2=\"340\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"400\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">params.id=123</text><text x=\"400\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Captured Value</text><line x1=\"350\" y1=\"75\" x2=\"350\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"300\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">generateStaticParams</text><text x=\"300\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Pre-render Paths</text><rect x=\"10\" y=\"105\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"80\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/products/[...slug]</text><text x=\"80\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Catch-all</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Dynamic Routes: Bracket syntax for parameterized URLs with flexible matching patterns.</text></svg>",
  "codeExamples": [
    {
      "title": "Single Dynamic Segment",
      "useCase": "When creating a product detail page.",
      "code": "// app/products/[id]/page.js\nexport default function ProductPage({ params }) {\n  return <h1>Product {params.id}</h1>\n}",
      "description": "Creates /products/1, /products/abc, etc. The id parameter is available via params.id."
    },
    {
      "title": "Catch-All Dynamic Route",
      "useCase": "When building a documentation section with nested pages.",
      "code": "// app/docs/[...slug]/page.js\nexport default function DocPage({ params }) {\n  return <h1>Docs / {params.slug.join(\" / \")}</h1>\n}",
      "description": "Matches /docs/getting-started, /docs/guides/advanced, etc. slug is an array of segments."
    },
    {
      "title": "generateStaticParams with Dynamic Routes",
      "useCase": "When pre-building known blog posts.",
      "code": "export async function generateStaticParams() {\n  const posts = await fetch(\"https://api.example.com/posts\").then(r => r.json());\n  return posts.map(p => ({ slug: p.slug }));\n}\n\nexport default async function PostPage({ params }) {\n  const post = await fetch(`https://api.example.com/posts/${params.slug}`);\n  const data = await post.json();\n  return <h1>{data.title}</h1>\n}",
      "description": "Pre-builds all blog posts at build time using their slugs as dynamic parameters."
    },
    {
      "title": "Dynamic Route with Multiple Segments",
      "useCase": "When building a nested category/product URL structure.",
      "code": "// app/[category]/[product]/page.js\nexport default function ProductPage({ params }) {\n  return <div>Category: {params.category}, Product: {params.product}</div>\n}",
      "description": "Matches /electronics/phone-1, /clothing/shirt, etc. Both segments are captured."
    },
    {
      "title": "Dynamic Route with Search Params",
      "useCase": "When filtering or paginating on a dynamic page.",
      "code": "// app/products/[category]/page.js\nexport default function ProductsPage({ params, searchParams }) {\n  const page = searchParams.page || \"1\";\n  return <div>Category: {params.category}, Page: {page}</div>\n}",
      "description": "Accesses both dynamic params and query string parameters (e.g., /products/electronics?page=2)."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What syntax creates a single dynamic route segment?",
      "options": [
        "[param]",
        "[...param]",
        "[[...param]]",
        "<param>"
      ],
      "answer": 0,
      "explanation": "Single bracket notation [param] captures one URL segment."
    },
    {
      "question": "What does [...slug] match in a dynamic route?",
      "options": [
        "Only the root path",
        "One or more URL segments",
        "Exactly one segment",
        "No segments"
      ],
      "answer": 1,
      "explanation": "Catch-all [...slug] matches one or more URL segments as an array."
    },
    {
      "question": "Which function pre-defines dynamic paths for SSG in the App Router?",
      "options": [
        "getStaticPaths",
        "generateStaticParams",
        "generatePaths",
        "preBuildPaths"
      ],
      "answer": 1,
      "explanation": "generateStaticParams returns an array of parameter objects for build-time pre-rendering."
    },
    {
      "question": "How do you access dynamic parameters in a Route Handler?",
      "options": [
        "From request.params",
        "From the second argument { params }",
        "From URL query",
        "From request body"
      ],
      "answer": 1,
      "explanation": "Route handlers receive params in the second argument: GET(request, { params })."
    },
    {
      "question": "When does a static route conflict with a dynamic route?",
      "options": [
        "Always conflicts",
        "Never conflicts",
        "Static takes precedence",
        "Dynamic takes precedence"
      ],
      "answer": 2,
      "explanation": "Static routes take precedence over dynamic routes in route resolution."
    },
    {
      "question": "What does [[...slug]] match?",
      "options": [
        "Only root",
        "Root and multiple segments",
        "Only one segment",
        "No paths"
      ],
      "answer": 1,
      "explanation": "Optional catch-all matches both the root path and nested paths."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-middleware"] = {
  "id": "nextjs-middleware",
  "title": "Middleware",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Middleware in Next.js runs code before a request is completed, allowing redirects, rewrites, authentication checks, and header manipulation at the edge.",
    "Defined in a single middleware.ts file at the project root, executing for every matching route before the page or API route responds.",
    "Middleware runs on the Edge Runtime for low-latency global execution, processing requests before they reach the application server.",
    "Supports conditional matching via the config.matcher array, regex patterns, and early returns for performance optimization."
  ],
  "laymanDefinition": "Middleware is like a security checkpoint at the entrance of a building. Before anyone reaches their destination, they pass through where guards can check IDs (authentication), redirect people to the right entrance, or add stamps (headers).",
  "deepDive": [
    {
      "heading": "Middleware Fundamentals",
      "text": "Middleware is defined in middleware.ts at the root of the project (same level as app/ or pages/). It exports a default async function that receives NextRequest and returns NextResponse or undefined. Middleware runs for every route that matches the config.matcher patterns before the route handler executes."
    },
    {
      "heading": "Authentication and Authorization",
      "text": "Middleware is commonly used for authentication by checking cookies, session tokens, or JWT. If unauthenticated, redirect to login. If unauthorized, show 403. Middleware can also check for specific headers or IP-based access control before the page renders."
    },
    {
      "heading": "Redirects and Rewrites",
      "text": "Middleware can perform server-side redirects (301/302) using NextResponse.redirect() and internal rewrites using NextResponse.rewrite(). Rewrites are invisible to the user but change which page handles the request. This is useful for A/B testing, localization, or legacy URL support."
    },
    {
      "heading": "Header and Cookie Manipulation",
      "text": "Middleware can set, modify, or delete request and response headers. It can set cookies, modify cache headers, or add security headers (CSP, HSTS). These modifications happen at the edge before the request reaches the application server."
    },
    {
      "heading": "Config and Matching",
      "text": "The config.matcher array specifies which routes trigger the middleware. Matchers can use exact paths, prefix patterns, or regex. Middleware should be as specific as possible to avoid unnecessary edge function invocations. Use negative lookaheads in regex to exclude specific paths like static files."
    }
  ],
  "interviewAnswer": "Middleware provides a powerful layer for request preprocessing at the edge. It is ideal for authentication, redirection, header manipulation, and A/B testing. The key is keeping middleware fast and specific, since it runs on every matched request.",
  "interviewQuestions": [
    {
      "question": "What is Middleware in Next.js?",
      "answer": "Middleware is a function that runs before a request completes, allowing you to modify the response, redirect, rewrite, or check authentication. It is defined in a single middleware.ts file at the project root and runs on the Edge Runtime for low-latency execution."
    },
    {
      "question": "Where is the middleware file placed?",
      "answer": "Middleware is placed at the root of the project, alongside the app/ or pages/ directories, not inside them. The file must be named middleware.ts (or .js) and export a default function."
    },
    {
      "question": "How do you specify which routes trigger middleware?",
      "answer": "Use the config.matcher export: export const config = { matcher: [\"/dashboard/:path*\", \"/api/:path*\"] }. Matchers can use path patterns, regex, or be omitted to match all routes. Be as specific as possible for performance."
    },
    {
      "question": "What runtime does middleware use?",
      "answer": "Middleware runs on the Edge Runtime, which is based on the Web API standards. It has limited Node.js API access but provides fast, globally distributed execution. You cannot use Node.js-specific modules like fs or path in middleware."
    },
    {
      "question": "How do you implement authentication in middleware?",
      "answer": "Check for auth tokens in cookies or headers. If missing, redirect to login: export function middleware(request) { const token = request.cookies.get(\"token\"); if (!token) return NextResponse.redirect(new URL(\"/login\", request.url)) }."
    },
    {
      "question": "Can middleware access the database?",
      "answer": "Middleware has limited capabilities and cannot directly access databases using typical drivers. Use middleware for lightweight checks (token validation, header inspection). For database-dependent logic, use Route Handlers or API routes."
    },
    {
      "question": "What is the difference between redirect and rewrite in middleware?",
      "answer": "redirect sends a 307/308 response telling the browser to go to a different URL. rewrite internally changes which route handles the request without the browser knowing. Rewrites are useful for A/B testing, localization, or proxying."
    },
    {
      "question": "How do you exclude certain paths from middleware?",
      "answer": "Use negative lookaheads in the matcher regex or exclude specific paths. For example: matcher: [\"/((?!api/auth|_next/static|favicon.ico).*)\"] excludes auth routes, static files, and favicon."
    },
    {
      "question": "Can middleware modify the response?",
      "answer": "Yes, middleware can set response headers, cookies, and even return a custom response. Use NextResponse.next() to continue with modifications, NextResponse.redirect() to redirect, or NextResponse.rewrite() to internally rewrite."
    },
    {
      "question": "How does middleware affect performance?",
      "answer": "Middleware runs on every matched request, so it should be lightweight. Avoid heavy computations, large library imports, or network requests in middleware. Use specific matchers to minimize the number of requests that trigger middleware execution."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Middleware</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client Request</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Incoming</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"230\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">middleware.ts</text><text x=\"230\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Check Auth</text><line x1=\"170\" y1=\"75\" x2=\"170\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"105\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"70\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Redirect to /login</text><text x=\"70\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Unauthorized</text><line x1=\"290\" y1=\"58\" x2=\"320\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"330\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"390\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Page / API Route</text><text x=\"390\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Proceed</text><line x1=\"330\" y1=\"75\" x2=\"330\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"290\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Set Headers</text><text x=\"290\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Cookies/CSP</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Middleware: Runs at the edge before request reaches the application server.</text></svg>",
  "codeExamples": [
    {
      "title": "Authentication Middleware",
      "useCase": "When you need to protect dashboard routes.",
      "code": "// middleware.ts\nimport { NextResponse } from \"next/server\";\nimport type { NextRequest } from \"next/server\";\n\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get(\"session\");\n  if (!token) {\n    return NextResponse.redirect(new URL(\"/login\", request.url));\n  }\n  return NextResponse.next();\n}\n\nexport const config = { matcher: [\"/dashboard/:path*\"] };",
      "description": "Redirects unauthenticated users to /login when accessing /dashboard/* routes."
    },
    {
      "title": "Middleware with Header Modification",
      "useCase": "When you need to add security headers to all responses.",
      "code": "export function middleware(request) {\n  const response = NextResponse.next();\n  response.headers.set(\"X-Frame-Options\", \"DENY\");\n  response.headers.set(\"X-Content-Type-Options\", \"nosniff\");\n  response.headers.set(\"Referrer-Policy\", \"strict-origin-when-cross-origin\");\n  return response;\n}",
      "description": "Adds security headers to every response before it reaches the browser."
    },
    {
      "title": "Middleware for Localization",
      "useCase": "When you need to detect user locale and redirect.",
      "code": "import { match } from \"@formatjs/intl-localematcher\";\nimport Negotiator from \"negotiator\";\n\nexport function middleware(request) {\n  const headers = { \"accept-language\": request.headers.get(\"accept-language\") || \"\" };\n  const languages = new Negotiator({ headers }).languages();\n  const defaultLocale = \"en\";\n  const locale = match(languages, [\"en\", \"fr\", \"es\"], defaultLocale);\n  if (!request.nextUrl.pathname.startsWith(\"/\" + locale)) {\n    return NextResponse.redirect(new URL(\"/\" + locale + request.nextUrl.pathname, request.url));\n  }\n}",
      "description": "Detects browser language and redirects to the appropriate locale prefix."
    },
    {
      "title": "Excluding Static Files from Middleware",
      "useCase": "When you want middleware to only run on matching routes.",
      "code": "export const config = {\n  matcher: [\n    \"/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)\",\n  ],\n};",
      "description": "Regex pattern that excludes auth API routes, static files, and common assets from middleware."
    },
    {
      "title": "Middleware for A/B Testing",
      "useCase": "When you want to route users to different page versions.",
      "code": "export function middleware(request) {\n  const variant = Math.random() > 0.5 ? \"a\" : \"b\";\n  const url = request.nextUrl.clone();\n  url.pathname = `/ab-test/${variant}${url.pathname}`;\n  return NextResponse.rewrite(url);\n}",
      "description": "Randomly assigns users to variant A or B by rewriting the request path."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Where is the middleware file located?",
      "options": [
        "Inside app/",
        "At the project root",
        "Inside pages/",
        "In the config/ folder"
      ],
      "answer": 1,
      "explanation": "middleware.ts is placed at the root of the project, next to app/ and pages/."
    },
    {
      "question": "What runtime does middleware use?",
      "options": [
        "Node.js Runtime",
        "Edge Runtime",
        "Browser Runtime",
        "Serverless Runtime"
      ],
      "answer": 1,
      "explanation": "Middleware runs on the Edge Runtime for fast, globally distributed execution."
    },
    {
      "question": "How do you redirect in middleware?",
      "options": [
        "NextResponse.redirect()",
        "response.redirect()",
        "router.push()",
        "window.location"
      ],
      "answer": 0,
      "explanation": "Use NextResponse.redirect() to send a redirect response from middleware."
    },
    {
      "question": "What does the config.matcher do?",
      "options": [
        "Defines middleware variables",
        "Specifies which routes trigger middleware",
        "Sets response headers",
        "Configures database connections"
      ],
      "answer": 1,
      "explanation": "config.matcher specifies route patterns that trigger middleware execution."
    },
    {
      "question": "Can middleware access the filesystem?",
      "options": [
        "Yes, fully",
        "No, limited Edge Runtime",
        "Yes, with fs module",
        "Only read-only"
      ],
      "answer": 1,
      "explanation": "Middleware runs on Edge Runtime which has limited Node.js API access, no filesystem."
    },
    {
      "question": "What is the difference between rewrite and redirect?",
      "options": [
        "Rewrite changes URL in browser",
        "Rewrite changes internal handler without browser knowing",
        "They are the same",
        "Redirect is client-side"
      ],
      "answer": 1,
      "explanation": "Rewrites internally change which handler serves the request without the browser being aware."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-server-actions"] = {
  "id": "nextjs-server-actions",
  "title": "Server Actions",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Server Actions are async functions that run on the server but can be called directly from Client Components, eliminating API route boilerplate for mutations.",
    "Defined with \"use server\" directive at file level (marking all exports) or inline within a Server Component function body.",
    "Server Actions support progressive enhancement: forms work without JavaScript, and the action receives FormData automatically.",
    "Integrate with caching via revalidatePath and revalidateTag for automatic cache invalidation after mutations."
  ],
  "laymanDefinition": "Server Actions are like having a direct phone line from your browser to the server database. Instead of going through an operator (API route), you dial directly and the server handles everything.",
  "deepDive": [
    {
      "heading": "What Are Server Actions",
      "text": "Server Actions are functions that run on the server but are callable from Client Components and forms. Defined with \"use server\", they handle database mutations, file operations, and business logic. They return data or trigger cache revalidation, and can be used with React hooks like useActionState."
    },
    {
      "heading": "Form Actions and Progressive Enhancement",
      "text": "Pass a Server Action to a form\\'s action prop. The form works without JavaScript (progressive enhancement). The action receives FormData automatically. After submission, Next.js merges the response with the client UI. This eliminates manual form state management."
    },
    {
      "heading": "Calling from Event Handlers",
      "text": "Import a Server Action and call it directly: onClick={() => myAction(data)}. The action runs server-side and returns a Promise. Use startTransition for pending states. Actions can receive FormData, JSON, or primitive arguments."
    },
    {
      "heading": "Cache Integration",
      "text": "Inside the action, call revalidatePath(\"/path\") or revalidateTag(\"tag\") to invalidate caches. Next.js re-renders affected routes with fresh data. Actions can also return values that update the client UI immediately."
    },
    {
      "heading": "Security",
      "text": "Always validate permissions inside the action (server-side). Never trust client-side checks. Server Action code is never exposed to the client; only a secure reference ID is included in the bundle. Use env vars for secrets."
    }
  ],
  "interviewAnswer": "Server Actions represent a paradigm shift in Next.js data mutations, replacing explicit API routes with direct server function calls. They simplify form handling, reduce boilerplate, and integrate deeply with the caching system.",
  "interviewQuestions": [
    {
      "question": "What are Server Actions in Next.js?",
      "answer": "Server Actions are async functions marked with \"use server\" that execute on the server but can be invoked from Client Components, form actions, or event handlers. They eliminate the need for separate API routes for mutations."
    },
    {
      "question": "How do you define a Server Action?",
      "answer": "Add \"use server\" at the top of a file (making all exports server actions) or inline inside a Server Component function. The action is an async function that receives FormData or arguments and returns a result."
    },
    {
      "question": "How do Server Actions work with forms?",
      "answer": "Pass the action to the form action prop. It receives FormData automatically. The form works without JS (progressive enhancement). Use useActionState for loading states and validation feedback."
    },
    {
      "question": "How do you invalidate cache from a Server Action?",
      "answer": "Call revalidatePath(\"/path\") to invalidate a specific route or revalidateTag(\"tag\") to invalidate all routes using a fetch tag. These are imported from next/cache."
    },
    {
      "question": "What is progressive enhancement in Server Actions?",
      "answer": "Forms with Server Actions work even with JavaScript disabled. Without JS, a traditional POST is made. With JS, the action runs via fetch. This ensures forms are functional everywhere."
    },
    {
      "question": "What hooks integrate with Server Actions?",
      "answer": "useActionState (React 19+) provides action state and pending status. useFormStatus provides the pending state of the parent form. Both integrate seamlessly with Server Actions."
    },
    {
      "question": "Are Server Actions exposed to the client?",
      "answer": "No. Only a secure reference ID is in the client bundle. The actual code stays server-side, preventing sensitive logic leakage."
    },
    {
      "question": "Can Server Actions be called from Server Components?",
      "answer": "Yes, Server Actions can be imported and called from Server Components too. This is useful for initial data seeding or server-side triggers."
    },
    {
      "question": "What are the limitations of Server Actions?",
      "answer": "POST-only, cannot be cached at the edge, not for data fetching (use Server Components instead), and authentication must be checked inside the action."
    },
    {
      "question": "How do you handle validation in Server Actions?",
      "answer": "Validate inputs inside the action and return error objects. Use try-catch for database errors. Return structured responses with success/error fields for the client to handle."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Server Actions</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Form/onClick</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"235\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">\"use server\"</text><text x=\"235\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Action</text><line x1=\"300\" y1=\"58\" x2=\"330\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"340\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"400\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Database</text><text x=\"400\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Mutation</text><line x1=\"340\" y1=\"75\" x2=\"340\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"295\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">revalidatePath</text><text x=\"295\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Cache</text><rect x=\"10\" y=\"105\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"75\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Response</text><text x=\"75\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">to Client</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Server Actions: Server functions callable from client, with cache integration.</text></svg>",
  "codeExamples": [
    {
      "title": "Server Action with Form",
      "useCase": "Contact form submission.",
      "code": "\"use server\";\nexport async function submitContact(prevState, formData) {\n  await saveToDB({ name: formData.get(\"name\"), email: formData.get(\"email\") });\n  revalidatePath(\"/contact\");\n  return { success: true };\n}",
      "description": "Saves form data to database and revalidates the contact page."
    },
    {
      "title": "Server Action with onClick",
      "useCase": "Delete item from a list.",
      "code": "\"use server\";\nexport async function deleteItem(id) {\n  await db.items.delete(id);\n  revalidatePath(\"/items\");\n}",
      "description": "Calls server action directly from an onClick handler without an API route."
    },
    {
      "title": "Server Action with useActionState",
      "useCase": "Form with validation feedback.",
      "code": "\"use client\";\nimport { useActionState } from \"react\";\nimport { submitForm } from \"./actions\";\nexport default function Form() {\n  const [state, formAction, pending] = useActionState(submitForm, null);\n  return <form action={formAction}>\n    <input name=\"email\" />\n    {state?.error && <p>{state.error}</p>}\n    <button disabled={pending}>{pending ? \"Saving...\" : \"Save\"}</button>\n  </form>\n}",
      "description": "useActionState manages pending state and action result."
    },
    {
      "title": "Server Action with revalidateTag",
      "useCase": "Invalidate by tag.",
      "code": "\"use server\";\nimport { revalidateTag } from \"next/cache\";\nexport async function createPost(formData) {\n  await db.posts.create({ title: formData.get(\"title\") });\n  revalidateTag(\"posts\");\n}",
      "description": "Invalidates all data tagged with \"posts\" after creation."
    },
    {
      "title": "Server Action with Validation",
      "useCase": "Input validation.",
      "code": "\"use server\";\nexport async function register(prevState, formData) {\n  const email = formData.get(\"email\");\n  if (!email?.includes(\"@\")) return { error: \"Invalid email\" };\n  try {\n    await db.users.create({ email });\n    revalidatePath(\"/users\");\n    return { success: true };\n  } catch {\n    return { error: \"Email exists\" };\n  }\n}",
      "description": "Validates server-side, returns errors or success."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What directive defines a Server Action?",
      "options": [
        "\"use client\"",
        "\"use server\"",
        "\"use action\"",
        "\"use handler\""
      ],
      "answer": 1,
      "explanation": "\"use server\" marks functions as Server Actions."
    },
    {
      "question": "How do you pass a Server Action to a form?",
      "options": [
        "onSubmit prop",
        "action prop",
        "method prop",
        "onAction prop"
      ],
      "answer": 1,
      "explanation": "Pass to the action prop for progressive enhancement."
    },
    {
      "question": "What hook provides parent form pending state?",
      "options": [
        "useActionState",
        "useFormStatus",
        "usePending",
        "useLoading"
      ],
      "answer": 1,
      "explanation": "useFormStatus provides the pending state of the parent form."
    },
    {
      "question": "How to invalidate cache after a Server Action?",
      "options": [
        "clearCache()",
        "revalidatePath()",
        "resetData()",
        "refresh()"
      ],
      "answer": 1,
      "explanation": "Use revalidatePath() or revalidateTag() from next/cache."
    },
    {
      "question": "What happens when a Server Action form submits without JS?",
      "options": [
        "Breaks",
        "Works via POST",
        "Shows error",
        "Nothing"
      ],
      "answer": 1,
      "explanation": "Progressive enhancement ensures forms work without JavaScript."
    },
    {
      "question": "Is Server Action code exposed to the client?",
      "options": [
        "Yes",
        "No, only reference ID",
        "Partially",
        "Only on error"
      ],
      "answer": 1,
      "explanation": "Only a reference ID is in the bundle; implementation stays server-side."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-image-optimization"] = {
  "id": "nextjs-image-optimization",
  "title": "Image Optimization",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Next.js Image Optimization via next/image auto-resizes, converts to modern formats (WebP/AVIF), lazy-loads, and generates responsive srcsets.",
    "The Image component extends HTML img with automatic optimization, requiring width/height (or fill) for layout stability (CLS prevention).",
    "Images are optimized on-demand at request time and cached, happening once per image regardless of page count.",
    "Remote images need remotePatterns config in next.config.js for security; local images auto-optimize during build."
  ],
  "laymanDefinition": "Next.js Image Optimization is like having a professional photo editor built in. Every image is auto-resized, converted to the best format, and only loaded when visible.",
  "deepDive": [
    {
      "heading": "The Image Component",
      "text": "Import Image from next/image. Key props: src, width/height (required for CLS prevention), alt (accessibility), priority (skip lazy loading for above-fold images), placeholder (blur|empty), quality (1-100), sizes (responsive breakpoints). The fill prop makes the image fill its positioned parent."
    },
    {
      "heading": "Auto-Optimization",
      "text": "Images are resized to rendered dimensions, converted to WebP/AVIF based on browser support, lazy-loaded by default, and quality-optimized. Optimization happens on first request and is cached."
    },
    {
      "heading": "Remote Images",
      "text": "Configure remotePatterns in next.config.js: { images: { remotePatterns: [{ protocol: \"https\", hostname: \"cdn.example.com\" }] } }. Remote images must specify width/height or use fill."
    },
    {
      "heading": "Responsive Images",
      "text": "The sizes prop generates appropriate srcset entries. Example: sizes=\"(max-width: 768px) 100vw, 50vw\". Users download only the size their viewport needs."
    },
    {
      "heading": "Performance Impact",
      "text": "Improves LCP via priority loading for hero images. Prevents CLS by requiring explicit dimensions. Lazy loading below-fold images saves bandwidth. Automatic format conversion reduces file size."
    }
  ],
  "interviewAnswer": "Image Optimization dramatically improves Core Web Vitals (LCP, CLS) and saves bandwidth. The Image component should replace all img tags for optimal performance.",
  "interviewQuestions": [
    {
      "question": "What is next/image?",
      "answer": "The built-in Image component that auto-optimizes images: resizing, format conversion, lazy loading, srcset generation, and blur placeholders. Imported from next/image."
    },
    {
      "question": "What props are required?",
      "answer": "src (path/URL), alt (accessibility), and either width+height or fill (with positioned parent)."
    },
    {
      "question": "How do you configure remote images?",
      "answer": "Add remotePatterns in next.config.js: images: { remotePatterns: [{ protocol: \"https\", hostname: \"example.com\" }] }"
    },
    {
      "question": "What formats does next/image convert to?",
      "answer": "WebP and AVIF, based on browser Accept headers. Falls back to original format if modern formats are unsupported."
    },
    {
      "question": "What does the priority prop do?",
      "answer": "Skips lazy loading for above-fold images critical for LCP. Use sparingly."
    },
    {
      "question": "How does the fill prop work?",
      "answer": "Makes image fill its parent container. Parent must have position: relative and defined dimensions."
    },
    {
      "question": "What is blurDataURL?",
      "answer": "A tiny base64-encoded preview shown as placeholder while the full image loads. Use placeholder=\"blur\". Auto-generated for local images."
    },
    {
      "question": "What does the sizes prop do?",
      "answer": "Defines rendered width at different viewports, generating corresponding srcset entries. Prevents downloading oversized images."
    },
    {
      "question": "How does next/image affect Core Web Vitals?",
      "answer": "Improves LCP (priority loading), prevents CLS (required dimensions), saves bandwidth (lazy loading, format conversion)."
    },
    {
      "question": "How do you set image quality?",
      "answer": "quality prop, 1-100. Default 75. Lower values (50-60) for thumbnails, higher (80-90) for product photos."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Image Optimization</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\"><Image></text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Component</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"230\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Auto Resize</text><text x=\"230\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Responsive</text><line x1=\"290\" y1=\"58\" x2=\"320\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"330\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"390\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">WebP/AVIF</text><text x=\"390\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Convert</text><line x1=\"330\" y1=\"75\" x2=\"330\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"290\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Lazy Load</text><text x=\"290\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">On Scroll</text><rect x=\"10\" y=\"105\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"70\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Cached</text><text x=\"70\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Optimized</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Image: Auto resizing, format conversion, lazy loading, and caching.</text></svg>",
  "codeExamples": [
    {
      "title": "Local Image",
      "useCase": "Displaying a local image.",
      "code": "import Image from \"next/image\";\nimport hero from \"../public/hero.jpg\";\nexport default function Hero() {\n  return <Image src={hero} alt=\"Hero\" priority />\n}",
      "description": "Local images auto-detect width/height and blurDataURL."
    },
    {
      "title": "Remote Image",
      "useCase": "External CMS image.",
      "code": "import Image from \"next/image\";\nexport default function Product({ p }) {\n  return <Image src={p.image} alt={p.name} width={600} height={400} />\n}",
      "description": "Remote images need explicit width/height and remotePatterns config."
    },
    {
      "title": "Fill Prop",
      "useCase": "Background cover image.",
      "code": "import Image from \"next/image\";\nexport default function Banner() {\n  return (\n    <div className=\"relative w-full h-[400px]\">\n      <Image src=\"/banner.jpg\" alt=\"Banner\" fill className=\"object-cover\" />\n    </div>\n  );\n}",
      "description": "fill prop requires positioned parent with dimensions."
    },
    {
      "title": "Sizes Prop",
      "useCase": "Responsive blog thumbnail.",
      "code": "<Image\n  src={post.thumbnail}\n  alt={post.title}\n  width={1200}\n  height={630}\n  sizes=\"(max-width: 768px) 100vw, 50vw\"\n/>",
      "description": "Generates srcset entries matching breakpoints."
    },
    {
      "title": "Blur Placeholder",
      "useCase": "Smooth loading.",
      "code": "<Image\n  src={image.url}\n  alt={image.alt}\n  width={800}\n  height={600}\n  placeholder=\"blur\"\n  blurDataURL=\"data:image/webp;base64,...\"\n/>",
      "description": "Blurred preview while loading. Auto-generated for local images."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which component provides image optimization?",
      "options": [
        "<img>",
        "<Image>",
        "<Picture>",
        "<OptImg>"
      ],
      "answer": 1,
      "explanation": "The Image component from next/image."
    },
    {
      "question": "What is required for remote images in production?",
      "options": [
        "Nothing",
        "remotePatterns config",
        "CDN setup",
        "Cloud account"
      ],
      "answer": 1,
      "explanation": "remotePatterns in next.config.js is required."
    },
    {
      "question": "What does the priority prop do?",
      "options": [
        "Reduces quality",
        "Skips lazy loading",
        "Converts format",
        "Adds border"
      ],
      "answer": 1,
      "explanation": "Priority skips lazy loading for above-fold images."
    },
    {
      "question": "What modern formats does next/image support?",
      "options": [
        "GIF/BMP",
        "WebP/AVIF",
        "TIFF/SVG",
        "ICO"
      ],
      "answer": 1,
      "explanation": "Converts to WebP and AVIF based on browser support."
    },
    {
      "question": "What does the fill prop do?",
      "options": [
        "Repeats image",
        "Fills parent container",
        "Fills with color",
        "Stretches"
      ],
      "answer": 1,
      "explanation": "fill makes the image fill its positioned parent."
    },
    {
      "question": "Purpose of blurDataURL?",
      "options": [
        "Blur effect",
        "Placeholder while loading",
        "Background blur",
        "Thumbnail"
      ],
      "answer": 1,
      "explanation": "blurDataURL shows a blurred preview while the full image loads."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-caching"] = {
  "id": "nextjs-caching",
  "title": "Caching",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Next.js has a multi-layered caching system: Full Route Cache (HTML), Data Cache (fetch results), Router Cache (client RSC payloads), and React Cache (request dedup).",
    "Full Route Cache stores static HTML at build time, served from CDN instantly. Data Cache persists fetch() results across deployments with time-based or on-demand revalidation.",
    "Router Cache caches RSC payloads client-side for instant back/forward navigation. React Cache deduplicates fetch calls within a single render pass.",
    "Each layer is independently configurable: use no-store, dynamic, revalidate, or revalidateTag/revalidatePath to control behavior."
  ],
  "laymanDefinition": "Next.js caching is like a multi-level warehouse: the fastest items are at the front counter (Router Cache), daily stock is in the main hall (Data Cache), and the full inventory is in the basement (Full Route Cache).",
  "deepDive": [
    {
      "heading": "Full Route Cache",
      "text": "Stores rendered HTML at build time for static routes. Served from CDN with zero server processing. Pages using cookies(), headers(), or searchParams skip this layer. Controlled by export const dynamic."
    },
    {
      "heading": "Data Cache",
      "text": "Stores fetch() responses. Persists across deploys. Revalidates via next.revalidate in fetch options (time-based) or revalidateTag/revalidatePath (on-demand). Controlled by cache option in fetch()."
    },
    {
      "heading": "Router Cache (Client Cache)",
      "text": "In-memory cache of RSC payloads. Prefetches visible links. Enables instant client-side transitions. Duration controlled by Cache-Control header (30s default for static pages). Cleared on full reload."
    },
    {
      "heading": "React Cache (Request Dedup)",
      "text": "React.cache() memoizes async functions within one render pass. If two components fetch the same URL, one request is made. Automatic for fetch() in Next.js. Extend to DB queries with React.cache()."
    },
    {
      "heading": "Cache Configuration",
      "text": "Opt out of Data Cache: fetch(url, { cache: \"no-store\" }). Opt out of Full Route Cache: export const dynamic = \"force-dynamic\" or use dynamic functions. On-Demand ISR: revalidatePath() or revalidateTag()."
    }
  ],
  "interviewAnswer": "Understanding the multi-layered cache is essential for Next.js performance. Static content benefits from aggressive defaults; dynamic apps need selective opt-outs. Each layer serves a distinct purpose and is independently configurable.",
  "interviewQuestions": [
    {
      "question": "What are the four cache layers?",
      "answer": "Full Route Cache (HTML at build time), Data Cache (fetch results), Router Cache (client-side RSC), React Cache (render-pass dedup)."
    },
    {
      "question": "What is the Full Route Cache?",
      "answer": "Stores static HTML at build time, served from CDN. Skipped for dynamic pages (those using cookies, headers, searchParams, or force-dynamic)."
    },
    {
      "question": "What is the Data Cache?",
      "answer": "Persists fetch() responses across requests and deployments. Revalidated via next.revalidate (time-based) or revalidatePath/revalidateTag (on-demand)."
    },
    {
      "question": "What is the Router Cache?",
      "answer": "Client-side in-memory cache of RSC payloads. Prefetches links for instant navigation. Duration set by Cache-Control header."
    },
    {
      "question": "How to opt out of Data Cache?",
      "answer": "fetch(url, { cache: \"no-store\" }) or fetch(url, { next: { revalidate: 0 } })."
    },
    {
      "question": "How to opt out of Full Route Cache?",
      "answer": "Use cookies(), headers(), or searchParams in the page, or export const dynamic = \"force-dynamic\"."
    },
    {
      "question": "What is React.cache() for?",
      "answer": "Memoizes function calls within a single render pass. Prevents duplicate DB queries when multiple components fetch the same data."
    },
    {
      "question": "How long does Router Cache last?",
      "answer": "Static pages: 30s default. Dynamic pages: 0s (no cache). Cleared on full page reload."
    },
    {
      "question": "How does On-Demand ISR work?",
      "answer": "Call revalidatePath(\"/path\") or revalidateTag(\"tag\") from Server Actions or Route Handlers. Instantly invalidates cache for matched routes."
    },
    {
      "question": "How to debug caching issues?",
      "answer": "Check build output (static vs dynamic). Use console.log in revalidation. Check DevTools network tab. Review Cache-Control headers in responses."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Caching</text><rect x=\"10\" y=\"35\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"75\" y=\"51\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Full Route</text><text x=\"75\" y=\"63\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">HTML (CDN)</text><rect x=\"10\" y=\"80\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"75\" y=\"96\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Data Cache</text><text x=\"75\" y=\"108\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">fetch()</text><rect x=\"10\" y=\"125\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"75\" y=\"141\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Router Cache</text><text x=\"75\" y=\"153\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Client RSC</text><rect x=\"10\" y=\"170\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"75\" y=\"186\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">React Cache</text><text x=\"75\" y=\"198\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Dedup</text><line x1=\"140\" y1=\"53\" x2=\"170\" y2=\"53\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"140\" y1=\"98\" x2=\"170\" y2=\"98\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"140\" y1=\"143\" x2=\"170\" y2=\"143\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"140\" y1=\"188\" x2=\"170\" y2=\"188\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"35\" width=\"200\" height=\"170\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"280\" y=\"51\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Control</text><text x=\"280\" y=\"63\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">revalidate / no-store / dynamic</text><text x=\"250\" y=\"225\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Caching: Four independent cache layers for HTML, data, client navigation, and request dedup.</text></svg>",
  "codeExamples": [
    {
      "title": "Opt Out Data Cache",
      "useCase": "Fresh data every request.",
      "code": "export default async function Page() {\n  const data = await fetch(\"https://api.example.com/data\", { cache: \"no-store\" });\n  return <div>{await data.text()}</div>\n}",
      "description": "cache: \"no-store\" bypasses Data Cache entirely."
    },
    {
      "title": "Time-Based Revalidation",
      "useCase": "ISR-style caching.",
      "code": "const data = await fetch(\"https://api.example.com/data\", {\n  next: { revalidate: 60 }\n});",
      "description": "Revalidates Data Cache at most once per 60 seconds."
    },
    {
      "title": "On-Demand Revalidation",
      "useCase": "Webhook-triggered.",
      "code": "import { revalidateTag } from \"next/cache\";\nexport async function POST(request) {\n  revalidateTag(\"products\");\n  return Response.json({ revalidated: true });\n}",
      "description": "Invalidates all fetch calls tagged with \"products\"."
    },
    {
      "title": "Dynamic Rendering",
      "useCase": "Opt out of Full Route Cache.",
      "code": "export const dynamic = \"force-dynamic\";\nexport default async function Page() {\n  const data = await fetch(\"https://api.example.com/data\");\n  return <div>{await data.text()}</div>\n}",
      "description": "Forces server-side rendering on every request."
    },
    {
      "title": "React.cache() for DB Queries",
      "useCase": "Deduplicate database calls.",
      "code": "import { cache } from \"react\";\nexport const getPosts = cache(async () => {\n  const posts = await db.query(\"SELECT * FROM posts\");\n  return posts;\n});",
      "description": "Memoizes the DB query within one render pass, preventing duplicates."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How many cache layers does Next.js have?",
      "options": [
        "Two",
        "Three",
        "Four",
        "Five"
      ],
      "answer": 2,
      "explanation": "Four: Full Route, Data, Router, and React Cache."
    },
    {
      "question": "What stores static HTML at build time?",
      "options": [
        "Data Cache",
        "Full Route Cache",
        "Router Cache",
        "React Cache"
      ],
      "answer": 1,
      "explanation": "Full Route Cache stores static HTML at build time."
    },
    {
      "question": "How do you skip the Data Cache?",
      "options": [
        "dynamic=\"force-dynamic\"",
        "cache: \"no-store\" in fetch",
        "useSearchParams()",
        "revalidatePath()"
      ],
      "answer": 1,
      "explanation": "cache: \"no-store\" in fetch options skips Data Cache."
    },
    {
      "question": "What does React.cache() do?",
      "options": [
        "Persists to disk",
        "Deduplicates per render pass",
        "Caches in browser",
        "Stores in CDN"
      ],
      "answer": 1,
      "explanation": "React.cache() deduplicates calls within one render pass."
    },
    {
      "question": "How long does Router Cache store static pages?",
      "options": [
        "Indefinitely",
        "30 seconds default",
        "1 hour",
        "Never caches"
      ],
      "answer": 1,
      "explanation": "Router Cache caches static pages for 30 seconds by default."
    },
    {
      "question": "Which function triggers On-Demand ISR?",
      "options": [
        "refreshCache()",
        "revalidatePath()",
        "clearData()",
        "resetCache()"
      ],
      "answer": 1,
      "explanation": "revalidatePath() and revalidateTag() trigger On-Demand ISR."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-streaming"] = {
  "id": "nextjs-streaming",
  "title": "Streaming",
  "difficulty": "advanced",
  "estimatedMinutes": 30,
  "tldr": [
    "Streaming allows sending HTML progressively from the server to the client as it is rendered, improving perceived performance and Time to First Byte.",
    "In the App Router, streaming is automatic when using Suspense boundaries with async Server Components inside.",
    "Streaming eliminates the \"all-or-nothing\" problem of SSR where the page blocks until all data is fetched, sending static shell content immediately.",
    "Works with the Edge Runtime for globally distributed streaming with low latency."
  ],
  "laymanDefinition": "Streaming is like a buffet where food is brought out as it is cooked rather than waiting for every dish to be ready before anyone can eat. You start with soup (the page shell), then get the main course (content) as it finishes.",
  "deepDive": [
    {
      "heading": "How Streaming Works",
      "text": "The server sends the HTML shell immediately while continuing to render async components. As each Suspense boundary resolves, its HTML is streamed to the client. React progressively hydrates streamed content. The user sees content loading in order, not all at once."
    },
    {
      "heading": "Streaming with Suspense",
      "text": "Wrap async Server Components in Suspense boundaries. Each boundary can have its own fallback (loading spinner, skeleton). The boundary content streams in when ready. Multiple boundaries can stream in parallel, independent of each other."
    },
    {
      "heading": "Streaming Benefits",
      "text": "Faster Time to First Byte (shell is immediate), progressive content delivery (users see content as it arrives), independent loading per section (one slow query doesnt block the whole page), and better Core Web Vitals (FCP improves significantly)."
    },
    {
      "heading": "Streaming vs SSR",
      "text": "Traditional SSR sends the complete page after all data is fetched. Streaming sends HTML in chunks as each component resolves. Streaming eliminates the \"request waterfall\" where all data must be fetched before any HTML is sent."
    },
    {
      "heading": "Streaming and SEO",
      "text": "Streamed content is fully indexed by search engines. Googlebot processes streamed HTML as it arrives. The initial shell includes metadata and key content for indexing. Streaming does not negatively impact SEO."
    }
  ],
  "interviewAnswer": "Streaming is one of the most impactful performance features in Next.js App Router. By eliminating blocking data fetches, it dramatically improves perceived performance. The key is strategic Suspense boundary placement around slower data dependencies.",
  "interviewQuestions": [
    {
      "question": "What is Streaming in Next.js?",
      "answer": "Streaming sends HTML from server to client progressively as it renders. The page shell is sent immediately, and async content streams in as Suspense boundaries resolve. This improves perceived performance and FCP."
    },
    {
      "question": "How do you implement streaming?",
      "answer": "Wrap async Server Components in Suspense boundaries. Each boundary streams independently when its data is ready. Next.js App Router handles streaming automatically when Suspense is used."
    },
    {
      "question": "What are the benefits of streaming?",
      "answer": "Instant page shell, progressive content loading, independent section loading (one slow query does not block others), improved FCP and LCP, and better user perceived performance."
    },
    {
      "question": "How is streaming different from SSR?",
      "answer": "SSR sends the complete HTML after all data fetches complete. Streaming sends HTML in chunks as components resolve. Streaming eliminates the all-or-nothing blocking of traditional SSR."
    },
    {
      "question": "Does streaming affect SEO?",
      "answer": "No, streaming does not negatively impact SEO. Googlebot processes streamed HTML as it arrives. Metadata and key content in the initial shell are indexed normally."
    },
    {
      "question": "Can you use streaming with the Pages Router?",
      "answer": "No, streaming is only available in the App Router. The Pages Router uses traditional SSR. Migrate to the App Router to leverage streaming."
    },
    {
      "question": "How does streaming work with loading.js?",
      "answer": "loading.js creates an automatic Suspense boundary for a route segment. The loading component is shown immediately, and the page content streams in when ready. It is the simplest way to add streaming."
    },
    {
      "question": "What happens to streamed content hydration?",
      "answer": "React progressively hydrates streamed HTML as it arrives. Each chunk is hydrated independently without waiting for the full stream. This means interactive elements become usable as soon as their chunk arrives."
    },
    {
      "question": "What runtime is required for streaming?",
      "answer": "Streaming works with both the Node.js Runtime and the Edge Runtime. Edge Runtime provides globally distributed streaming with lower latency for the initial shell."
    },
    {
      "question": "How do you handle errors in streaming?",
      "answer": "Use error.js for error boundaries at the route segment level. If a streamed component throws, the error boundary for that segment replaces the streamed content with the error fallback UI."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Streaming</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server starts</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Sends shell</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Suspense A</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Queries data</text><rect x=\"190\" y=\"90\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"260\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Suspense B</text><text x=\"260\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Queries data</text><line x1=\"190\" y1=\"75\" x2=\"190\" y2=\"90\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"58\" x2=\"360\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"108\" x2=\"360\" y2=\"108\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"370\" y=\"40\" width=\"100\" height=\"85\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"420\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Stream</text><text x=\"420\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Chunks sent</text><line x1=\"370\" y1=\"125\" x2=\"370\" y2=\"145\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"155\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"295\" y=\"171\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client</text><text x=\"295\" y=\"183\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Renders progressively</text><text x=\"250\" y=\"210\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Streaming: HTML sent progressively as Suspense boundaries resolve, improving FCP and perceived load.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Streaming with Suspense",
      "useCase": "Page with loading shell and streamed content.",
      "code": "import { Suspense } from \"react\";\n\nasync function SlowPosts() {\n  const posts = await fetch(\"https://api.example.com/posts\");\n  return (await posts.json()).map(p => <div key={p.id}>{p.title}</div>);\n}\n\nexport default function Page() {\n  return (\n    <div>\n      <h1>My Blog</h1>\n      <Suspense fallback={<div>Loading posts...</div>}>\n        <SlowPosts />\n      </Suspense>\n    </div>\n  );\n}",
      "description": "The heading renders immediately; posts stream in when fetched."
    },
    {
      "title": "Multiple Suspense Boundaries",
      "useCase": "Independent sections streaming in parallel.",
      "code": "export default function Dashboard() {\n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <Suspense fallback={<div>Loading stats...</div>}>\n        <Stats />\n      </Suspense>\n      <Suspense fallback={<div>Loading activity...</div>}>\n        <ActivityFeed />\n      </Suspense>\n    </div>\n  );\n}",
      "description": "Stats and Activity stream independently without blocking each other."
    },
    {
      "title": "Using loading.js",
      "useCase": "Route-level automatic streaming.",
      "code": "// app/dashboard/loading.js\nexport default function Loading() {\n  return <div className=\"skeleton\">Loading dashboard...</div>\n}\n\n// app/dashboard/page.js\nexport default async function DashboardPage() {\n  const data = await fetchDashboardData();\n  return <div>{/* render data */}</div>\n}",
      "description": "loading.js creates an automatic Suspense boundary for the dashboard route."
    },
    {
      "title": "Streaming with Nested Suspense",
      "useCase": "Prioritize critical content.",
      "code": "export default function ProductPage() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading...</div>}>\n        <ProductInfo /> {/* Critical - streams first */}\n      </Suspense>\n      <Suspense fallback={<div>Loading...</div>}>\n        <RelatedProducts /> {/* Less critical - streams later */}\n      </Suspense>\n    </div>\n  );\n}",
      "description": "Product info streams before related products."
    },
    {
      "title": "Streaming Error Handling",
      "useCase": "Error boundary with streamed content.",
      "code": "// app/products/error.js\n\"use client\";\nexport default function Error({ error, reset }) {\n  return <div><h2>Failed to load</h2><button onClick={reset}>Retry</button></div>\n}",
      "description": "If a streamed segment errors, the error boundary replaces it with fallback UI."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What enables streaming in the App Router?",
      "options": [
        "Server Components",
        "Suspense boundaries",
        "Route Handlers",
        "Middleware"
      ],
      "answer": 1,
      "explanation": "Suspense boundaries around async Server Components enable streaming."
    },
    {
      "question": "What does streaming improve most?",
      "options": [
        "SEO",
        "Perceived performance and FCP",
        "Bundle size",
        "Database queries"
      ],
      "answer": 1,
      "explanation": "Streaming improves perceived performance and First Contentful Paint."
    },
    {
      "question": "How is streaming different from SSR?",
      "options": [
        "Streaming sends HTML in chunks",
        "They are the same",
        "SSR is faster",
        "Streaming blocks rendering"
      ],
      "answer": 0,
      "explanation": "Streaming sends HTML progressively instead of waiting for all data."
    },
    {
      "question": "What does loading.js provide?",
      "options": [
        "API routes",
        "Automatic Suspense boundary",
        "Database connection",
        "Authentication"
      ],
      "answer": 1,
      "explanation": "loading.js creates an automatic Suspense boundary for the route segment."
    },
    {
      "question": "Does streaming affect SEO?",
      "options": [
        "Yes, negatively",
        "No, it is SEO-friendly",
        "Prevents indexing",
        "Requires extra config"
      ],
      "answer": 1,
      "explanation": "Streaming is SEO-friendly. Googlebot processes streamed HTML."
    },
    {
      "question": "Which runtimes support streaming?",
      "options": [
        "Node.js only",
        "Edge only",
        "Both Node.js and Edge",
        "Neither"
      ],
      "answer": 2,
      "explanation": "Both Node.js and Edge Runtime support streaming."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-authentication"] = {
  "id": "nextjs-authentication",
  "title": "Authentication in Next.js",
  "difficulty": "advanced",
  "estimatedMinutes": 35,
  "tldr": [
    "Authentication in Next.js involves securing pages, API routes, and Server Actions using middleware, session tokens, JWT, or third-party providers (NextAuth.js / Auth.js).",
    "Middleware is the primary layer for protecting routes, checking authentication before the page renders and redirecting unauthenticated users.",
    "Server Components handle auth by reading session cookies or tokens server-side, conditionally rendering content based on auth state.",
    "Client Components handle interactive auth flows (login forms, social login buttons) and display user-specific UI based on session status."
  ],
  "laymanDefinition": "Authentication is like having a membership card system: middleware is the bouncer at the door checking cards, Server Components are the employees who check your card before serving you, and Client Components are the interactive kiosks where you sign up for a new card.",
  "deepDive": [
    {
      "heading": "Authentication with Middleware",
      "text": "Middleware checks auth tokens/cookies before the request reaches the page. Use NextResponse.redirect() to send unauthenticated users to login. Use matcher config to protect specific route patterns. Middleware runs at the edge for low-latency auth checks."
    },
    {
      "heading": "Server-Side Auth in Server Components",
      "text": "Read session cookies or tokens using cookies() from next/headers. Fetch user data from database or auth provider. Conditionally render content based on auth state. Server Components handle the data side of auth without exposing logic to the client."
    },
    {
      "heading": "Client-Side Auth",
      "text": "Use Client Components for login forms, social login buttons, and auth UI. Use React context or state management for client-side auth state. Call Server Actions or Route Handlers for login/logout operations. Display user-specific UI based on session."
    },
    {
      "heading": "Third-Party Auth Providers (Auth.js)",
      "text": "Auth.js (formerly NextAuth.js) provides built-in providers (Google, GitHub, email, credentials). Configure in a Route Handler. Use middleware for session checks. Provides useSession hook for client-side auth state and getServerSession for server-side."
    },
    {
      "heading": "JWT vs Database Sessions",
      "text": "JWT: stateless, stored in cookies, no DB lookup on each request, good for performance, harder to revoke. Database sessions: stateful, stored in DB, easy to revoke, requires DB lookup on each request, good for apps needing session management."
    }
  ],
  "interviewAnswer": "Authentication in Next.js requires coordinating middleware, Server Components, and Client Components. Middleware provides the first line of defense, Server Components handle data-level auth, and Client Components manage interactive auth flows. Auth.js simplifies the process significantly.",
  "interviewQuestions": [
    {
      "question": "How do you protect routes in Next.js?",
      "answer": "Use middleware to check authentication before the request reaches the page. Middleware runs at the edge and can redirect unauthenticated users. Use matcher config to specify protected routes."
    },
    {
      "question": "How does middleware handle authentication?",
      "answer": "Middleware checks for session cookies or tokens. If missing, redirects to login. If present and valid, allows the request to proceed. Middleware is the most efficient auth layer because it runs before rendering."
    },
    {
      "question": "How do Server Components handle auth?",
      "answer": "Read session cookies with cookies() from next/headers. Fetch full user data server-side. Conditionally render content or redirect. Server Components keep auth logic secure and server-side."
    },
    {
      "question": "How do Client Components handle auth?",
      "answer": "Display login forms, social login buttons, and user profile UI. Use Auth.js useSession hook for client-side auth state. Call Server Actions for login/logout. Display different UI based on session status."
    },
    {
      "question": "What is Auth.js (NextAuth.js)?",
      "answer": "A complete authentication library for Next.js supporting multiple providers (Google, GitHub, email, credentials). Provides middleware helpers, Server Component helpers (getServerSession), and Client Component hooks (useSession)."
    },
    {
      "question": "What is the difference between JWT and database sessions?",
      "answer": "JWT: stateless, stored in cookie, no DB required, faster, harder to revoke. Database sessions: stored in DB, easy to revoke, requires DB query on each request, more secure for sensitive apps."
    },
    {
      "question": "How do you handle login form submissions?",
      "answer": "Use a Server Action that validates credentials, creates a session, and sets cookies. The form uses progressive enhancement. On success, redirect to the protected page. On failure, return validation errors."
    },
    {
      "question": "How do you implement role-based access control?",
      "answer": "In middleware, check user role from session. In Server Components, check role before rendering. In Route Handlers, verify permissions. Use a higher-order component pattern or auth utility functions."
    },
    {
      "question": "How does OAuth work in Next.js?",
      "answer": "Configure OAuth provider (Google, GitHub) in Auth.js. The provider redirects to their consent screen. On success, they redirect back to a callback URL. Auth.js handles the OAuth flow and creates a session."
    },
    {
      "question": "How do you handle auth in API routes and Route Handlers?",
      "answer": "In Routes Handlers, use getServerSession from Auth.js or read auth tokens from cookies/Authorization header. Validate permissions before processing the request. Return 401 for unauthorized, 403 for forbidden."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Authentication in Next.js</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Check Token</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"230\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Server Component</text><text x=\"230\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Fetch User</text><rect x=\"170\" y=\"90\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"230\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client Component</text><text x=\"230\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Login UI</text><line x1=\"290\" y1=\"58\" x2=\"320\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"290\" y1=\"108\" x2=\"320\" y2=\"108\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"330\" y=\"40\" width=\"140\" height=\"85\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"400\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Auth.js</text><text x=\"400\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">getServerSession / useSession</text><line x1=\"330\" y1=\"125\" x2=\"330\" y2=\"145\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"155\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"300\" y=\"171\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Protected Page</text><text x=\"300\" y=\"183\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Content</text><text x=\"250\" y=\"210\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Authentication: Middleware for route protection, Server Components for auth logic, Client Components for login UI.</text></svg>",
  "codeExamples": [
    {
      "title": "Auth Middleware",
      "useCase": "Protect dashboard routes.",
      "code": "// middleware.ts\nimport { NextResponse } from \"next/server\";\n\nexport function middleware(request) {\n  const token = request.cookies.get(\"session\");\n  if (!token) {\n    return NextResponse.redirect(new URL(\"/login\", request.url));\n  }\n  return NextResponse.next();\n}\n\nexport const config = { matcher: [\"/dashboard/:path*\"] };",
      "description": "Redirects unauthenticated users from /dashboard/* to /login."
    },
    {
      "title": "Server-Side Session Check",
      "useCase": "Read session in Server Component.",
      "code": "import { getServerSession } from \"next-auth\";\nimport { authOptions } from \"@/lib/auth\";\n\nexport default async function Dashboard() {\n  const session = await getServerSession(authOptions);\n  if (!session) return <div>Access denied</div>;\n  return <div>Welcome {session.user.name}</div>;\n}",
      "description": "Checks session server-side using Auth.js getServerSession."
    },
    {
      "title": "Client-Side Auth with Auth.js",
      "useCase": "Use session in Client Component.",
      "code": "\"use client\";\nimport { useSession, signIn, signOut } from \"next-auth/react\";\n\nexport default function AuthButton() {\n  const { data: session } = useSession();\n  if (session) {\n    return <button onClick={() => signOut()}>Sign out {session.user.name}</button>;\n  }\n  return <button onClick={() => signIn()}>Sign in</button>;\n}",
      "description": "useSession provides client-side auth state; signIn/signOut handle login flow."
    },
    {
      "title": "Login Server Action",
      "useCase": "Handle form login.",
      "code": "\"use server\";\nimport { signIn } from \"@/auth\";\n\nexport async function login(prevState, formData) {\n  try {\n    await signIn(\"credentials\", formData);\n    return { success: true };\n  } catch (error) {\n    return { error: \"Invalid credentials\" };\n  }\n}",
      "description": "Server Action handles credential validation and session creation."
    },
    {
      "title": "Role-Based Access in Server Component",
      "useCase": "Admin-only content.",
      "code": "export default async function AdminPanel() {\n  const session = await getServerSession(authOptions);\n  if (session?.user?.role !== \"admin\") {\n    return <div>Admin access required</div>;\n  }\n  return <div>Admin panel content</div>;\n}",
      "description": "Checks user role before rendering admin-only content."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the first line of defense for auth in Next.js?",
      "options": [
        "Server Components",
        "Middleware",
        "Client Components",
        "API Routes"
      ],
      "answer": 1,
      "explanation": "Middleware runs first and can redirect unauthenticated requests before rendering."
    },
    {
      "question": "Which Auth.js function reads session server-side?",
      "options": [
        "useSession",
        "getServerSession",
        "getSession",
        "session()"
      ],
      "answer": 1,
      "explanation": "getServerSession reads the session on the server."
    },
    {
      "question": "Which Auth.js hook provides client-side session state?",
      "options": [
        "getServerSession",
        "useSession",
        "useAuth",
        "session()"
      ],
      "answer": 1,
      "explanation": "useSession provides client-side session state in Client Components."
    },
    {
      "question": "How does JWT session differ from database sessions?",
      "options": [
        "JWT is stateful",
        "JWT is stateless",
        "They are identical",
        "JWT requires DB"
      ],
      "answer": 1,
      "explanation": "JWT is stateless (stored in cookie), database sessions are stateful (stored in DB)."
    },
    {
      "question": "What does middleware use to protect routes?",
      "options": [
        "Session token/cookie check",
        "Database query",
        "API call",
        "Client-side redirect"
      ],
      "answer": 0,
      "explanation": "Middleware checks tokens or cookies to determine authentication status."
    },
    {
      "question": "What status code should a Route Handler return for unauthorized access?",
      "options": [
        "200",
        "401",
        "500",
        "302"
      ],
      "answer": 1,
      "explanation": "401 Unauthorized for missing/invalid authentication."
    }
  ]
};

TOPICS_DATA["nextjs"]["nextjs-deployment-vercel"] = {
  "id": "nextjs-deployment-vercel",
  "title": "Deployment on Vercel",
  "difficulty": "beginner",
  "estimatedMinutes": 25,
  "tldr": [
    "Vercel is the official deployment platform for Next.js, providing automatic builds, serverless functions, edge functions, ISR, and global CDN distribution.",
    "Deploy by connecting a Git repository (GitHub, GitLab, Bitbucket) to Vercel, with automatic deployments on every push to the default branch.",
    "Preview Deployments are created for every pull request, allowing testing before merging to production.",
    "Environment variables, custom domains, analytics, and logs are managed through the Vercel Dashboard or vercel.json configuration."
  ],
  "laymanDefinition": "Vercel is like a self-publishing platform for websites. You connect your code repository, and Vercel automatically builds, optimizes, and hosts your site worldwide, creating preview versions for every change before it goes live.",
  "deepDive": [
    {
      "heading": "Deployment Process",
      "text": "Connect your Git repository to Vercel. Vercel automatically detects Next.js, sets up the build command (next build), and configures the output directory. Every push to the production branch triggers a deployment. Preview deployments are created for non-production branches."
    },
    {
      "heading": "Serverless Functions",
      "text": "API routes and Route Handlers are automatically deployed as serverless functions. Each endpoint scales independently based on demand. Serverless functions have cold starts (mitigated by the Edge Runtime for low-latency use cases). Node.js and Edge runtimes are supported."
    },
    {
      "heading": "ISR and Cache Management",
      "text": "ISR pages are revalidated by Vercel\\'s edge network. On-demand ISR (revalidatePath) triggers instant regeneration. The Vercel Data Cache stores fetch() results. Cache headers can be customized for CDN behavior."
    },
    {
      "heading": "Environment Variables",
      "text": "Configure environment variables in the Vercel Dashboard or .env files. Production, Preview, and Development environments can have different values. NEXT_PUBLIC_ variables are inlined into client bundles. Sensitive variables are encrypted at rest."
    },
    {
      "heading": "Monitoring and Analytics",
      "text": "Vercel provides built-in analytics (page views, web vitals), function logs, and error tracking. Speed Insights measures real-user performance. Analytics are privacy-friendly and cookie-free. Logs can be viewed per deployment or streamed to external services."
    }
  ],
  "interviewAnswer": "Vercel provides the best deployment experience for Next.js applications with automatic optimizations, global distribution, and zero-config setup. Understanding the deployment process, environment variables, and monitoring capabilities is essential for production Next.js applications.",
  "interviewQuestions": [
    {
      "question": "How do you deploy a Next.js app to Vercel?",
      "answer": "Push your code to a Git repository (GitHub, GitLab, Bitbucket), import the repository in Vercel, and Vercel automatically detects Next.js and configures the build. Deployments are automatic on every push to the production branch."
    },
    {
      "question": "What are Preview Deployments?",
      "answer": "Preview Deployments are created for every pull request and non-production branch. They provide a unique URL for testing changes before merging to production. Preview Deployments include serverless functions and environment variables."
    },
    {
      "question": "How does Vercel handle API routes?",
      "answer": "API routes and Route Handlers are automatically deployed as serverless functions. Each endpoint scales independently. Functions have configurable memory, timeout, and region settings. Edge functions provide globally distributed execution."
    },
    {
      "question": "How does ISR work on Vercel?",
      "answer": "ISR pages are cached on Vercel\\'s edge network. Revalidation is triggered by time-based or on-demand methods. The Vercel Data Cache stores fetch() responses. ISR works seamlessly without additional Vercel-specific configuration."
    },
    {
      "question": "How do you configure environment variables on Vercel?",
      "answer": "Set environment variables in the Vercel Dashboard under Project Settings > Environment Variables. Separate values for Production, Preview, and Development. Variables prefixed with NEXT_PUBLIC_ are available client-side."
    },
    {
      "question": "What is vercel.json?",
      "answer": "A configuration file at the project root for customizing Vercel behavior: build commands, headers, redirects, rewrites, function regions, and cron jobs. Overrides automatic detection and framework defaults."
    },
    {
      "question": "How does Vercel handle custom domains?",
      "answer": "Add custom domains in the Vercel Dashboard under Domains. Vercel automatically provisions SSL certificates via Let\\'s Encrypt. Supports apex domains (example.com), subdomains (app.example.com), and wildcard domains (*.example.com)."
    },
    {
      "question": "What analytics does Vercel provide?",
      "answer": "Web Analytics: page views, unique visitors, top pages. Speed Insights: real-user Core Web Vitals (LCP, CLS, INP). Both are privacy-friendly, cookie-free, and GDPR-compliant. Enable in the Vercel Dashboard."
    },
    {
      "question": "How do you debug production issues on Vercel?",
      "answer": "Use Vercel Logs (Runtime Logs and Build Logs). Check function execution logs for errors. Use Speed Insights for performance issues. Set up error monitoring with third-party services (Sentry, Datadog). Enable Vercel Integrations for external monitoring."
    },
    {
      "question": "How does Vercel handle serverless function cold starts?",
      "answer": "Cold starts occur when a function has not been invoked recently. Mitigations: use Edge Runtime (near-zero cold starts), increase function memory allocation, use cron jobs to keep functions warm, or implement function concurrency settings."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Deployment on Vercel</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Git Push</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Code trigger</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Vercel Build</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">next build</text><line x1=\"330\" y1=\"58\" x2=\"360\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"370\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"420\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Deploy</text><text x=\"420\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Serverless</text><line x1=\"370\" y1=\"75\" x2=\"370\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"105\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"300\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">CDN Edge</text><text x=\"300\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Global</text><rect x=\"10\" y=\"105\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"80\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Preview</text><text x=\"80\" y=\"133\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">PR URL</text><text x=\"250\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Vercel: Automatic Git-integrated deployment with serverless functions, ISR, and global CDN.</text></svg>",
  "codeExamples": [
    {
      "title": "vercel.json Configuration",
      "useCase": "Custom build and routing config.",
      "code": "{\n  \"buildCommand\": \"next build\",\n  \"outputDirectory\": \".next\",\n  \"installCommand\": \"npm install\",\n  \"regions\": [\"iad1\", \"sfo1\"],\n  \"headers\": [\n    {\n      \"source\": \"/(.*)\",\n      \"headers\": [\n        { \"key\": \"X-Frame-Options\", \"value\": \"DENY\" }\n      ]\n    }\n  ]\n}",
      "description": "Configures build settings, serverless function regions, and custom response headers."
    },
    {
      "title": "Environment Variables",
      "useCase": "Setting env vars per environment.",
      "code": "# .env.local (local development)\nDATABASE_URL=\"postgres://localhost:5432/mydb\"\nNEXT_PUBLIC_API_URL=\"http://localhost:3000\"\n\n# Vercel Dashboard (production)\nDATABASE_URL=\"postgres://prod:password@prod-host:5432/mydb\"\nNEXT_PUBLIC_API_URL=\"https://example.com\"",
      "description": "Different values for local, preview, and production environments."
    },
    {
      "title": "Custom Domain Setup",
      "useCase": "Add a custom domain.",
      "code": "// Vercel Dashboard > Domains\n// Add: example.com\n// Add: www.example.com\n\n// DNS Configuration (DNS provider)\n// A record: example.com -> 76.76.21.21\n// CNAME: www.example.com -> cname.vercel-dns.com",
      "description": "Vercel automatically provisions SSL and handles DNS routing."
    },
    {
      "title": "Preview Deployment URL",
      "useCase": "Accessing PR previews.",
      "code": "// Each PR gets a unique URL:\n// https://my-app-git-feature-branch-username.vercel.app\n\n// Or custom preview domain:\n// https://feature-branch.my-domain.com",
      "description": "Preview deployments provide sandboxed URLs for testing changes."
    },
    {
      "title": "Analytics Integration",
      "useCase": "Enable analytics.",
      "code": "// Vercel Dashboard > Analytics > Enable\n\n// OR via vercel.json:\n{ \"analytics\": { \"speedInsights\": true, \"webAnalytics\": true } }",
      "description": "Enables privacy-friendly analytics and real-user speed metrics."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What triggers a production deployment on Vercel?",
      "options": [
        "Manual only",
        "Push to default branch",
        "Weekly schedule",
        "Build button"
      ],
      "answer": 1,
      "explanation": "Pushing to the default branch (main/master) triggers automatic production deployment."
    },
    {
      "question": "What are Preview Deployments?",
      "options": [
        "Production deployments",
        "Per-PR deployments for testing",
        "Staging only",
        "Local builds"
      ],
      "answer": 1,
      "explanation": "Preview Deployments are created for each pull request with a unique URL."
    },
    {
      "question": "How does Vercel handle API routes?",
      "options": [
        "As static files",
        "As serverless functions",
        "As edge workers",
        "Not supported"
      ],
      "answer": 1,
      "explanation": "API routes are automatically deployed as serverless functions."
    },
    {
      "question": "Where do you configure environment variables?",
      "options": [
        ".env file only",
        "Vercel Dashboard",
        "next.config.js",
        "vercel.json"
      ],
      "answer": 1,
      "explanation": "Environment variables are configured in the Vercel Dashboard under Project Settings."
    },
    {
      "question": "What is vercel.json used for?",
      "options": [
        "Package management",
        "Build and routing configuration",
        "Database setup",
        "Authentication"
      ],
      "answer": 1,
      "explanation": "vercel.json customizes build commands, headers, redirects, and function configuration."
    },
    {
      "question": "What SSL support does Vercel provide?",
      "options": [
        "Manual SSL only",
        "Automatic Let's Encrypt SSL",
        "No SSL",
        "Paid SSL only"
      ],
      "answer": 1,
      "explanation": "Vercel automatically provisions and renews SSL certificates via Let\\'s Encrypt."
    }
  ]
};

