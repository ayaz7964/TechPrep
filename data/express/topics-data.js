var TOPICS_DATA = TOPICS_DATA || {};
TOPICS_DATA["express"] = TOPICS_DATA["express"] || {};

TOPICS_DATA["express"]["express-architecture"] = {
  "id": "express-architecture",
  "title": "Express Architecture",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Express is a minimal, unopinionated Node.js web framework that provides a robust set of features for web and mobile applications.",
    "Built on top of Node.js HTTP module, Express adds middleware-based architecture, routing, and request/response handling abstractions.",
    "Follows a single-threaded, event-driven model using the request-response cycle with middleware functions that process requests in sequence.",
    "Its minimal core is extended through middleware packages, making it highly flexible and customizable for various application needs."
  ],
  "laymanDefinition": "Express is like a basic kitchen that provides the essential tools (stove, sink, counter) but lets you add your own appliances (middleware) as needed. It does not force a specific way of cooking (unopinionated).",
  "deepDive": [
    {
      "heading": "Core Architecture",
      "text": "Express is built around the concept of middleware - functions that have access to the request object, response object, and the next middleware function in the application\\'s request-response cycle. Each middleware can modify the request/response, end the cycle, or call the next middleware. The app is essentially a pipeline of middleware functions."
    },
    {
      "heading": "Application Object",
      "text": "The express() function creates an Express application object that represents the entire application. This object provides methods for routing (app.get, app.post), middleware configuration (app.use), settings (app.set), and starting the server (app.listen). The application object is the central organizing unit of an Express app."
    },
    {
      "heading": "Request and Response Objects",
      "text": "Express extends Node.js native request and response objects with additional methods and properties. req.params, req.query, req.body provide access to request data. res.json(), res.send(), res.render(), res.redirect() provide convenient response methods. These extended objects are passed through the middleware chain."
    },
    {
      "heading": "Middleware Pipeline",
      "text": "Middleware functions are executed in the order they are added to the application. Each middleware receives req, res, and next. It can modify req/res, send a response, or call next() to pass control to the next middleware. Error-handling middleware has four parameters (err, req, res, next) and catches errors passed via next(err)."
    },
    {
      "heading": "Configuration and Settings",
      "text": "Express supports application-level settings via app.set() and app.get(). Environment-based configuration (NODE_ENV) controls behavior like view caching, error formatting, and stack traces. The app can be configured to trust proxy headers, set view engines, and customize other behaviors without modifying application code."
    }
  ],
  "interviewAnswer": "Express architecture is fundamentally middleware-based. Understanding the middleware pipeline, how request/response objects flow through it, and how to structure applications using the Express application object is essential for building robust server-side applications with Node.js.",
  "interviewQuestions": [
    {
      "question": "What is Express.js architecture?",
      "answer": "Express follows a middleware-based architecture. The application is a pipeline of middleware functions that process incoming requests sequentially. Each middleware can modify the request and response objects, terminate the request-response cycle, or pass control to the next middleware. Express is minimal and unopinionated, allowing developers to structure applications as needed."
    },
    {
      "question": "How does the middleware pipeline work?",
      "answer": "Middleware functions are executed in the order they are registered using app.use() or route-specific methods. Each middleware receives req, res, and next. It processes the request, optionally modifies req/res, and either sends a response or calls next() to pass control to the next middleware. If no middleware sends a response, the request hangs."
    },
    {
      "question": "What is the Express application object?",
      "answer": "The application object is created by calling express(). It represents the Express application and provides methods for routing (get, post, put, delete), middleware registration (use), settings (set, get, enable, disable), and server startup (listen). It is the central organizing object."
    },
    {
      "question": "How does Express extend Node.js request/response objects?",
      "answer": "Express adds properties like req.params (route parameters), req.query (query string), req.body (parsed request body), req.path, req.hostname, req.ip. Response methods include res.json(), res.send(), res.status(), res.redirect(), res.render(), res.set(). These make common web development tasks more convenient."
    },
    {
      "question": "What is the purpose of app.use()?",
      "answer": "app.use() mounts middleware at a specified path or globally. Middleware mounted with app.use() runs for every request matching the path (or all requests if no path specified). It is used for application-level middleware like logging, parsing, authentication, and error handling."
    },
    {
      "question": "How does Express handle errors?",
      "answer": "Express has built-in error handling. Errors in middleware are passed to error-handling middleware using next(err). Error-handling middleware has four parameters (err, req, res, next) and is defined last in the middleware chain. It can format and send error responses."
    },
    {
      "question": "What is the significance of calling next()?",
      "answer": "next() passes control to the next middleware function in the pipeline. Without calling next(), the request hangs and eventually times out. next() can be called without arguments to proceed normally, or with an argument (like new Error()) to trigger error-handling middleware."
    },
    {
      "question": "How does Express compare to other Node.js frameworks?",
      "answer": "Express is minimal and unopinionated compared to frameworks like Koa (which uses async/await natively), Fastify (which focuses on performance and schema validation), or NestJS (which provides an Angular-like structured architecture). Express has the largest ecosystem and community."
    },
    {
      "question": "What is the typical folder structure for an Express app?",
      "answer": "Common structure: app.js or server.js as entry point, routes/ for route definitions, controllers/ for business logic, middleware/ for custom middleware, models/ for data models, config/ for configuration, views/ for templates, and public/ for static files. Express does not enforce any specific structure."
    },
    {
      "question": "How do you configure an Express app for production?",
      "answer": "Set NODE_ENV=production (hides stack traces, enables caching), use a process manager like PM2, implement logging with morgan/winston, add compression (compression middleware), set security headers (helmet), configure rate limiting, use environment variables for configuration, and run behind a reverse proxy (nginx)."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Express Architecture</text><rect x=\"10\" y=\"40\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"75\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Request In</text><text x=\"75\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">HTTP</text><line x1=\"140\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"35\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"245\" y=\"51\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware 1</text><text x=\"245\" y=\"63\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Logging</text><rect x=\"180\" y=\"80\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"245\" y=\"96\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware 2</text><text x=\"245\" y=\"108\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Parsing</text><rect x=\"180\" y=\"125\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"245\" y=\"141\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware 3</text><text x=\"245\" y=\"153\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Auth</text><line x1=\"180\" y1=\"70\" x2=\"180\" y2=\"80\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"180\" y1=\"115\" x2=\"180\" y2=\"125\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"310\" y1=\"92\" x2=\"340\" y2=\"92\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"60\" width=\"120\" height=\"65\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"410\" y=\"76\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"410\" y=\"88\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Response</text><line x1=\"180\" y1=\"160\" x2=\"180\" y2=\"175\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"175\" width=\"130\" height=\"20\" rx=\"4\" fill=\"#dc3545\" stroke=\"#dc3545\" stroke-width=\"1\"/><text x=\"245\" y=\"191\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Error Handler</text><text x=\"245\" y=\"203\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">4 params</text><text x=\"240\" y=\"210\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Express Architecture: Middleware pipeline processes requests sequentially.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Express App",
      "useCase": "Creating a simple Express server.",
      "code": "const express = require('express');\nconst app = express();\napp.get('/', (req, res) => res.send('Hello World'));\napp.listen(3000, () => console.log('Server running on port 3000'));",
      "description": "Creates an Express app with a single route and starts the server."
    },
    {
      "title": "Application Settings",
      "useCase": "Configuring Express settings.",
      "code": "const express = require('express');\nconst app = express();\napp.set('view engine', 'ejs');\napp.set('trust proxy', true);\napp.enable('case sensitive routing');\nconsole.log(app.get('view engine')); // 'ejs'",
      "description": "Sets view engine, proxy trust, and case-sensitive routing options."
    },
    {
      "title": "Using app.use()",
      "useCase": "Mounting middleware globally.",
      "code": "const express = require('express');\nconst app = express();\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.use(express.static('public'));\napp.use('/api', require('./routes/api'));",
      "description": "Registers body parsing and static file middleware at the application level."
    },
    {
      "title": "NODE_ENV Configuration",
      "useCase": "Environment-based behavior.",
      "code": "const app = express();\nif (app.get('env') === 'production') {\n  app.set('trust proxy', 1);\n  // Disable stack traces in errors\n} else {\n  app.use(require('morgan')('dev'));\n}\nconsole.log('Environment:', app.get('env'));",
      "description": "Checks NODE_ENV to conditionally apply production-specific configuration."
    },
    {
      "title": "Structuring with Express.Router",
      "useCase": "Modular route organization.",
      "code": "const express = require('express');\nconst app = express();\nconst userRouter = require('./routes/users');\nconst productRouter = require('./routes/products');\napp.use('/users', userRouter);\napp.use('/products', productRouter);",
      "description": "Organizes routes into separate modules using Express.Router, mounted at specific paths."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the central organizing object in Express?",
      "options": [
        "Middleware",
        "Application object",
        "Router object",
        "Request object"
      ],
      "answer": 1,
      "explanation": "The application object (created by express()) is the central organizing unit."
    },
    {
      "question": "What happens if no middleware sends a response?",
      "options": [
        "Express sends default response",
        "Request hangs until timeout",
        "Error is thrown",
        "next() is called automatically"
      ],
      "answer": 1,
      "explanation": "Without a response, the request hangs and eventually times out."
    },
    {
      "question": "How many parameters does error-handling middleware have?",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "answer": 2,
      "explanation": "Error-handling middleware has four parameters: err, req, res, next."
    },
    {
      "question": "What does app.set() do?",
      "options": [
        "Sets route handlers",
        "Configures application settings",
        "Sets middleware",
        "Sets response headers"
      ],
      "answer": 1,
      "explanation": "app.set() allows configuring Express application settings like view engine and proxy trust."
    },
    {
      "question": "How does middleware pass control to the next function?",
      "options": [
        "return",
        "next()",
        "continue()",
        "done()"
      ],
      "answer": 1,
      "explanation": "Calling next() passes control to the next middleware in the pipeline."
    },
    {
      "question": "Which npm package extends Express with additional features?",
      "options": [
        "express-settings",
        "express-validator",
        "helmet",
        "express-core"
      ],
      "answer": 2,
      "explanation": "helmet is a middleware package that adds security headers to Express responses."
    }
  ]
};

TOPICS_DATA["express"]["express-routing"] = {
  "id": "express-routing",
  "title": "Routing",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "Routing refers to how an application responds to client requests at particular endpoints (URIs) and specific HTTP methods (GET, POST, PUT, PATCH, DELETE).",
    "Express provides app.get(), app.post(), app.put(), app.patch(), app.delete(), and app.all() methods for defining routes.",
    "Route parameters named segments prefixed with colon (:) capture values from the URL and make them available via req.params.",
    "Express.Router creates modular, mountable route handlers that can be organized into separate files for better code organization."
  ],
  "laymanDefinition": "Routing is like a reception desk directing visitors to the right department. Each URL and request type (method) has a specific handler that processes it and returns the appropriate response.",
  "deepDive": [
    {
      "heading": "Route Methods and Paths",
      "text": "Express supports all HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. Route paths can be strings, string patterns, or regular expressions. Methods are chainable: app.route(\\'/path\\').get(handler).post(handler) for cleaner code on the same path with different methods."
    },
    {
      "heading": "Route Parameters",
      "text": "Route parameters are named URL segments defined with a colon: /users/:userId/books/:bookId. Values are captured in req.params: { userId: \\'123\\', bookId: \\'456\\' }. Parameters can only contain alphanumeric characters and underscores. Multiple parameters in a single path are supported."
    },
    {
      "heading": "Query Parameters",
      "text": "Query parameters from the URL query string (?key=value) are available via req.query. Express parses the query string into an object. Multiple values for the same key become arrays. Access defaults with fallback: req.query.name || \\'default\\'."
    },
    {
      "heading": "Express.Router",
      "text": "Express.Router creates modular route handlers. Define routes in separate files (routes/users.js) using router.get(), router.post(), etc. Export the router and mount it in the main app with app.use(\\'/prefix\\', router). Supports middleware at the router level for scoped functionality."
    },
    {
      "heading": "Route Organization",
      "text": "Organize routes by resource (users, products, orders) in separate files. Use route files that export routers. Group related routes using app.use() prefixes. For larger apps, consider controllers to separate route definitions from business logic. Route ordering matters - more specific routes should come before parameterized ones."
    }
  ],
  "interviewAnswer": "Express routing is intuitive and flexible. Route parameters capture dynamic URL segments, query parameters handle optional filters, and Express.Router enables modular organization of route handlers.",
  "interviewQuestions": [
    {
      "question": "What is routing in Express?",
      "answer": "Routing defines how Express responds to client requests at specific endpoints (URLs) with specific HTTP methods. Each route can have one or more handler functions that process the request and send a response."
    },
    {
      "question": "How do you define a route in Express?",
      "answer": "Use app.METHOD(PATH, HANDLER) where METHOD is an HTTP method (get, post, put, delete), PATH is the URL path, and HANDLER is a callback function that receives req and res. Example: app.get(\\'/\\', (req, res) => res.send(\\'Hello\\'))."
    },
    {
      "question": "What are route parameters?",
      "answer": "Route parameters are named URL segments defined with a colon prefix. For example, /users/:userId captures the userId value from the URL. The captured values are available in req.params."
    },
    {
      "question": "How do you access query parameters?",
      "answer": "Query parameters are available via req.query. For a URL like /search?q=express&page=2, req.query returns { q: \\'express\\', page: \\'2\\' }. Express automatically parses the query string."
    },
    {
      "question": "What is Express.Router?",
      "answer": "Express.Router is a class that creates modular, mountable route handlers. It acts like a mini Express application with its own middleware and routing. Routers can be exported and mounted in the main app using app.use()."
    },
    {
      "question": "How do you organize routes in Express?",
      "answer": "Create separate route files (routes/users.js, routes/products.js) using Express.Router. Mount them in the main app: app.use(\\'/users\\', userRouter), app.use(\\'/products\\', productRouter). For larger apps, add controllers to separate business logic from route definitions."
    },
    {
      "question": "How does route matching work?",
      "answer": "Express matches routes in the order they are defined. More specific routes should be defined before parameterized routes to avoid conflicts. Express routes are case-sensitive by default (can be changed with app.enable(\\'case sensitive routing\\'))."
    },
    {
      "question": "What is app.all() used for?",
      "answer": "app.all(\\'/path\\', handler) matches all HTTP methods for the specified path. It is useful for global middleware, authentication checks, or logging that should apply to all methods on a specific path."
    },
    {
      "question": "Can you chain route handlers?",
      "answer": "Yes, Express supports chaining multiple handlers for a single route: app.get(\\'/path\\', handler1, handler2, handler3). Handlers execute in sequence if each calls next() instead of sending a response. This is useful for validation, authentication, and then the main handler."
    },
    {
      "question": "How do you handle 404 in Express?",
      "answer": "Define a catch-all middleware after all routes: app.use((req, res) => res.status(404).send(\\'Not Found\\')). This runs when no route matches the request path. It should be the last middleware before error handlers."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Routing</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/users</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">GET /users</text><rect x=\"10\" y=\"85\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"101\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/users/:id</text><text x=\"70\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">GET /users/:id</text><rect x=\"10\" y=\"130\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"70\" y=\"146\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/users/:id</text><text x=\"70\" y=\"158\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">POST /users/:id</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"130\" y1=\"103\" x2=\"160\" y2=\"103\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"130\" y1=\"148\" x2=\"160\" y2=\"148\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"240\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"240\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">getUser</text><rect x=\"170\" y=\"85\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"240\" y=\"101\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"240\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">getUserById</text><rect x=\"170\" y=\"130\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#6610f2\" stroke=\"#6610f2\" stroke-width=\"1\"/><text x=\"240\" y=\"146\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"240\" y=\"158\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">createUser</text><text x=\"240\" y=\"190\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Routing: URL path + HTTP method maps to handler functions.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Route Methods",
      "useCase": "Different HTTP methods on the same path.",
      "code": "app.get('/users', getAllUsers);\napp.get('/users/:id', getUserById);\napp.post('/users', createUser);\napp.put('/users/:id', updateUser);\napp.delete('/users/:id', deleteUser);",
      "description": "Standard CRUD routes for a users resource with route parameters for ID."
    },
    {
      "title": "Route Parameters",
      "useCase": "Accessing URL parameters.",
      "code": "app.get('/users/:userId/books/:bookId', (req, res) => {\n  const { userId, bookId } = req.params;\n  res.json({ userId, bookId });\n});",
      "description": "Multiple route parameters captured from the URL path."
    },
    {
      "title": "Query Parameters",
      "useCase": "Handling optional query strings.",
      "code": "app.get('/search', (req, res) => {\n  const { q, page = 1, limit = 10 } = req.query;\n  if (!q) return res.status(400).send('Search query required');\n  res.json({ q, page, limit });\n});",
      "description": "Query parameters provide optional filters with default values."
    },
    {
      "title": "Express.Router Module",
      "useCase": "Creating a modular route file.",
      "code": "const router = require('express').Router();\nrouter.get('/', getAllUsers);\nrouter.get('/:id', getUserById);\nrouter.post('/', createUser);\nmodule.exports = router;",
      "description": "Exporting a router to be mounted in the main app."
    },
    {
      "title": "Chained Route Handlers",
      "useCase": "Middleware applied to a specific route.",
      "code": "app.post('/users', validateUser, sanitizeInput, createUser);\nasync function validateUser(req, res, next) {\n  if (!req.body.email) return res.status(400).send('Email required');\n  next();\n}",
      "description": "Multiple handler functions execute in sequence for a single route."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How do you define a route parameter in Express?",
      "options": [
        ":param",
        "{param}",
        "<param>",
        "param"
      ],
      "answer": 0,
      "explanation": "Route parameters are defined with a colon prefix (/:param)."
    },
    {
      "question": "Where are route parameter values stored?",
      "options": [
        "req.query",
        "req.params",
        "req.body",
        "req.data"
      ],
      "answer": 1,
      "explanation": "Route parameter values are available in req.params."
    },
    {
      "question": "What Express class creates modular route handlers?",
      "options": [
        "express.Module",
        "express.Router",
        "express.Handler",
        "express.Route"
      ],
      "answer": 1,
      "explanation": "Express.Router creates modular, mountable route handlers."
    },
    {
      "question": "Which method matches all HTTP methods on a path?",
      "options": [
        "app.match()",
        "app.all()",
        "app.every()",
        "app.any()"
      ],
      "answer": 1,
      "explanation": "app.all() matches GET, POST, PUT, DELETE, and all other methods."
    },
    {
      "question": "How do you access query string parameters?",
      "options": [
        "req.params",
        "req.query",
        "req.body",
        "req.data"
      ],
      "answer": 1,
      "explanation": "Query string parameters are available via req.query."
    },
    {
      "question": "What should be placed before parameterized routes?",
      "options": [
        "Other parameterized routes",
        "More specific static routes",
        "Error handlers",
        "Nothing"
      ],
      "answer": 1,
      "explanation": "More specific static routes should be defined before parameterized routes."
    }
  ]
};

TOPICS_DATA["express"]["express-middleware"] = {
  "id": "express-middleware",
  "title": "Middleware",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Middleware functions have access to the request object, response object, and the next middleware function in the application's request-response cycle.",
    "They can execute code, modify req/res, end the request-response cycle, or call next() to pass control to subsequent middleware.",
    "Express has built-in middleware (express.json, express.static, express.urlencoded) and a vast ecosystem of third-party middleware packages.",
    "Middleware can be application-level (app.use), router-level (router.use), error-handling (4 params), or built-in/third-party."
  ],
  "laymanDefinition": "Middleware is like an assembly line in a factory. Each station (middleware) performs a specific task on the product (request) before passing it along to the next station. Some stations complete the product (send response) while others just inspect or modify it.",
  "deepDive": [
    {
      "heading": "Application-Level Middleware",
      "text": "Bound to the express app instance using app.use() or app.METHOD(). Runs for every request (for app.use() without path) or for requests matching a specific path. Application-level middleware is registered in order and affects all routes."
    },
    {
      "heading": "Router-Level Middleware",
      "text": "Works identically to application-level middleware but is bound to an Express.Router instance using router.use() or router.METHOD(). Scoped to routes handled by that router. Useful for middleware that should only apply to a specific group of routes."
    },
    {
      "heading": "Built-in Middleware",
      "text": "Express includes: express.json() (parses JSON request bodies), express.urlencoded({extended: true}) (parses URL-encoded bodies), express.static (serves static files), express.Router (modular routing), express.errorHandler (basic error handling). Previously express.session and express.compress existed but were removed."
    },
    {
      "heading": "Third-Party Middleware",
      "text": "Popular third-party middleware: morgan (HTTP logging), helmet (security headers), cors (Cross-Origin Resource Sharing), compression (gzip), passport (authentication), express-validator (input validation), express-rate-limit (rate limiting), cookie-parser (cookie parsing), csurf (CSRF protection)."
    },
    {
      "heading": "Middleware Execution Order",
      "text": "Middleware executes in the order it is registered. The first middleware registered runs first. If it calls next(), control passes to the next registered middleware. If it sends a response, subsequent middleware does not run. Error-handling middleware runs only when next(err) is called and is defined last."
    }
  ],
  "interviewAnswer": "Middleware is the core of Express architecture. Understanding the different types (application, router, error-handling, built-in, third-party) and their execution order is essential for building secure, well-structured Express applications.",
  "interviewQuestions": [
    {
      "question": "What is middleware in Express?",
      "answer": "Middleware is a function that sits between the request and response. It has access to req, res, and next. It can execute code, modify req/res, end the cycle, or pass control to the next middleware using next(). Middleware forms the processing pipeline of an Express application."
    },
    {
      "question": "What are the types of middleware?",
      "answer": "Application-level (app.use), router-level (router.use), error-handling (4 params), built-in (express.json, express.static), and third-party (morgan, helmet, cors)."
    },
    {
      "question": "How do you create custom middleware?",
      "answer": "Define a function that accepts (req, res, next). Perform operations on req/res, then either call next() to continue or send a response to end the cycle. Example: function logger(req, res, next) { console.log(req.method, req.url); next(); }"
    },
    {
      "question": "What is the difference between app.use and app.METHOD?",
      "answer": "app.use() mounts middleware for all HTTP methods. app.get(), app.post(), etc. mount middleware only for the specified HTTP method. Both match the specified path (or all paths if none specified)."
    },
    {
      "question": "How does middleware order affect execution?",
      "answer": "Middleware executes in registration order. If middleware sends a response early, later middleware never runs. Error-handling middleware must be registered last and is only triggered by next(err)."
    },
    {
      "question": "What happens when next() is called with an argument?",
      "answer": "next(err) passes an error to Express. Express skips all remaining regular middleware and goes directly to the first error-handling middleware (4 params). If no error handler exists, Express sends a default 500 response."
    },
    {
      "question": "How does express.json() work?",
      "answer": "express.json() parses incoming requests with JSON payloads. It reads the request body, parses it as JSON, and sets req.body to the parsed object. It returns an error for invalid JSON. Must be registered before routes that expect JSON input."
    },
    {
      "question": "Can middleware be conditional?",
      "answer": "Yes, middleware can conditionally call next() or send a response. For example, authentication middleware checks credentials and either allows (next()) or rejects (send 401) the request. Route handlers can also conditionally apply middleware using arrays."
    },
    {
      "question": "How do you pass data between middleware?",
      "answer": "Attach data to the req object: req.user = authenticatedUser; req.startTime = Date.now(); Subsequent middleware can read these values from req. This is the standard pattern for sharing data across middleware."
    },
    {
      "question": "What is the next() function?",
      "answer": "next() is a callback function passed to middleware that passes control to the next middleware in the stack. Without calling next(), the request hangs. next(\\'route\\') bypasses remaining middleware on the same route. next(err) triggers error handling."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Middleware</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Request In</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">HTTP</text><line x1=\"150\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">app.use(logger)</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Logging</text><line x1=\"180\" y1=\"70\" x2=\"180\" y2=\"78\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"80\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"96\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">app.use(express.json)</text><text x=\"250\" y=\"108\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Body Parse</text><line x1=\"180\" y1=\"110\" x2=\"180\" y2=\"118\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"120\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"250\" y=\"136\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">app.use(auth)</text><text x=\"250\" y=\"148\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Auth Check</text><line x1=\"320\" y1=\"78\" x2=\"350\" y2=\"78\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"320\" y1=\"95\" x2=\"350\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"320\" y1=\"135\" x2=\"350\" y2=\"135\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"360\" y=\"65\" width=\"120\" height=\"55\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"420\" y=\"81\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"420\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Response</text><line x1=\"180\" y1=\"150\" x2=\"180\" y2=\"165\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"165\" width=\"140\" height=\"20\" rx=\"4\" fill=\"#dc3545\" stroke=\"#dc3545\" stroke-width=\"1\"/><text x=\"250\" y=\"181\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Error Handler</text><text x=\"250\" y=\"193\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">next(err)</text><text x=\"240\" y=\"210\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Middleware Pipeline: Functions process requests sequentially in registered order.</text></svg>",
  "codeExamples": [
    {
      "title": "Creating Custom Middleware",
      "useCase": "Simple request logger.",
      "code": "function requestLogger(req, res, next) {\n  const start = Date.now();\n  console.log(`${req.method} ${req.url}`);\n  res.on('finish', () => {\n    const duration = Date.now() - start;\n    console.log(`${res.statusCode} - ${duration}ms`);\n  });\n  next();\n}\napp.use(requestLogger);",
      "description": "Logs the method, URL, status code, and duration for every request."
    },
    {
      "title": "Built-in Middleware: Body Parsing",
      "useCase": "Parsing JSON and form data.",
      "code": "const express = require('express');\nconst app = express();\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.post('/submit', (req, res) => {\n  console.log(req.body);\n  res.json({ received: true });\n});",
      "description": "Parses JSON and form-encoded request bodies before route handlers."
    },
    {
      "title": "Third-Party: Morgan Logger",
      "useCase": "HTTP request logging.",
      "code": "const morgan = require('morgan');\napp.use(morgan('combined'));\n// Formats: combined, common, dev, short, tiny",
      "description": "morgan provides pre-formatted HTTP logging in various output formats."
    },
    {
      "title": "Conditional Middleware",
      "useCase": "Apply middleware only in development.",
      "code": "if (process.env.NODE_ENV === 'development') {\n  app.use(morgan('dev'));\n  app.use(require('errorhandler')());\n}",
      "description": "Middleware is conditionally applied based on environment."
    },
    {
      "title": "Passing Data via req",
      "useCase": "Sharing data between middleware.",
      "code": "function loadUser(req, res, next) {\n  const userId = req.params.userId;\n  req.user = { id: userId, role: 'admin' };\n  next();\n}\napp.get('/admin/:userId', loadUser, (req, res) => {\n  res.json({ user: req.user });\n});",
      "description": "Middleware attaches user data to req object, consumed by the route handler."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What three arguments does standard middleware receive?",
      "options": [
        "err, req, res",
        "req, res, next",
        "req, res, err",
        "next, req, res"
      ],
      "answer": 1,
      "explanation": "Standard middleware receives req, res, and next."
    },
    {
      "question": "What triggers error-handling middleware?",
      "options": [
        "Any middleware error",
        "Calling next(err)",
        "Throwing an error",
        "All of the above"
      ],
      "answer": 1,
      "explanation": "Error-handling middleware is triggered by next(err)."
    },
    {
      "question": "Which built-in middleware parses JSON bodies?",
      "options": [
        "express.parse()",
        "express.json()",
        "express.bodyParser()",
        "express.JSON()"
      ],
      "answer": 1,
      "explanation": "express.json() parses incoming JSON request bodies."
    },
    {
      "question": "What is the purpose of next(\\'route\\')?",
      "options": [
        "Trigger error handler",
        "Skip remaining middleware on this route",
        "Pass to next route",
        "Restart the pipeline"
      ],
      "answer": 1,
      "explanation": "next(\\'route\\') skips remaining middleware on the same route and jumps to the next matching route."
    },
    {
      "question": "How do you share data between middleware?",
      "options": [
        "Global variables",
        "req object",
        "res.locals",
        "Both req and res.locals"
      ],
      "answer": 3,
      "explanation": "Data is shared via req object or res.locals for response-local data."
    },
    {
      "question": "Where should error-handling middleware be registered?",
      "options": [
        "First",
        "After routes",
        "Last in the middleware stack",
        "In a separate file"
      ],
      "answer": 2,
      "explanation": "Error-handling middleware should be registered last in the middleware stack."
    }
  ]
};

TOPICS_DATA["express"]["express-custom-middleware"] = {
  "id": "express-custom-middleware",
  "title": "Custom Middleware",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Custom middleware functions follow the pattern (req, res, next) and can perform any operation before passing control to the next handler.",
    "They are ideal for request logging, authentication, input validation, data enrichment, response timing, and access control.",
    "Custom middleware can be application-level (app.use), route-specific (inline in route definitions), or exported as reusable modules.",
    "Best practices include keeping middleware focused on a single responsibility, using next() consistently, and handling errors properly."
  ],
  "laymanDefinition": "Custom middleware is like having your own specialized tools in a workshop. While Express provides the basic tools (built-in middleware), custom middleware lets you build exactly what your application needs.",
  "deepDive": [
    {
      "heading": "Creating Reusable Middleware",
      "text": "Package middleware as modules that return a function. Accept options via a higher-order function pattern: function middleware(options) { return function(req, res, next) { ... } }. This allows configuration without global state. Export middleware as npm packages for reuse across projects."
    },
    {
      "heading": "Route-Specific Middleware",
      "text": "Pass middleware inline in route definitions: app.get(\\'/path\\', authMiddleware, handler). Multiple middleware can be passed as an array: app.get(\\'/path\\', [validate, sanitize, handler]). Middleware runs only for that specific route and method."
    },
    {
      "heading": "Async Middleware",
      "text": "For async operations, define middleware as async functions: async function(req, res, next) { try { ... } catch(err) { next(err) } }. Always wrap in try/catch and call next(err) on failure. Unhandled promise rejections in Express cause the process to exit."
    },
    {
      "heading": "Middleware Configuration Patterns",
      "text": "Use factory functions for configurable middleware: function rateLimit(windowMs, max) { return function(req, res, next) { ... } }. Closure variables create isolated state per middleware instance. This pattern is used by popular middleware like morgan, cors, and helmet."
    },
    {
      "heading": "Testing Custom Middleware",
      "text": "Test middleware by creating mock req/res/next objects. Invoke the middleware and assert: the correct response was sent, next() was called, or req/res were modified appropriately. Use libraries like sinon for spy/mock/stub on next()."
    }
  ],
  "interviewAnswer": "Custom middleware is essential for building maintainable Express applications. The key patterns are: focused single-responsibility functions, factory functions for configuration, async error handling with try/catch, and route-specific application.",
  "interviewQuestions": [
    {
      "question": "How do you create custom middleware in Express?",
      "answer": "Define a function that accepts (req, res, next). Perform operations, then either call next() to continue or send a response. Example: function myMiddleware(req, res, next) { req.timestamp = Date.now(); next(); }"
    },
    {
      "question": "How do you make middleware configurable?",
      "answer": "Use a factory function pattern: function createMiddleware(options) { return function(req, res, next) { /* use options */ next(); } }. Register with options: app.use(createMiddleware({ key: \\'value\\' }))."
    },
    {
      "question": "How do you handle async errors in middleware?",
      "answer": "Always wrap async operations in try/catch and pass errors to next(err). Express 5+ handles async middleware errors automatically. In Express 4, unhandled promise rejections cause process crashes."
    },
    {
      "question": "How do you apply middleware to specific routes?",
      "answer": "Pass middleware as additional arguments: app.get(\\'/path\\', middleware, handler). Or as an array: app.get(\\'/path\\', [mid1, mid2], handler). Middleware runs before the route handler for that specific path and method."
    },
    {
      "question": "What is a middleware factory function?",
      "answer": "A function that returns a middleware function. It accepts configuration options and creates a closure: function logger(format) { return function(req, res, next) { console.log(format); next(); } }. Used by morgan, cors, helmet."
    },
    {
      "question": "How do you test custom middleware?",
      "answer": "Create mock objects for req, res, and next. Invoke the middleware function. Assert that req/res were modified correctly, next() was called, or the response was sent with expected status and body."
    },
    {
      "question": "What are best practices for custom middleware?",
      "answer": "Single responsibility (one task per middleware), consistent next() usage, proper error handling (try/catch for async), no side effects outside req/res, configurable via factory functions, well-documented, and tested."
    },
    {
      "question": "Can middleware be conditionally skipped?",
      "answer": "Yes, check conditions and call next() early to skip: function conditional(req, res, next) { if (!shouldRun(req)) return next(); /* do work */ next(); }. Or use a wrapper that conditionally applies middleware."
    },
    {
      "question": "How do you terminate the request in middleware?",
      "answer": "Send a response using res.send(), res.json(), res.status().end(), or res.redirect(). Do not call next() after sending a response. Calling both sends a response and calls next() causes the headers cannot be set error."
    },
    {
      "question": "What is the difference between app.use and app.METHOD for custom middleware?",
      "answer": "app.use(middleware) runs for all HTTP methods. app.get(middleware) runs only for GET requests. Both can accept a path prefix: app.use(\\'/api\\', middleware) runs only for paths starting with /api."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Custom Middleware</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Factory Function</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">createLogger(opts)</text><line x1=\"150\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">(req,res,next)</text><line x1=\"180\" y1=\"75\" x2=\"180\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"95\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">next()</text><text x=\"250\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Pass Control</text><line x1=\"320\" y1=\"78\" x2=\"350\" y2=\"78\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"360\" y=\"65\" width=\"120\" height=\"30\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"420\" y=\"81\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"420\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Response</text><rect x=\"10\" y=\"160\" width=\"140\" height=\"25\" rx=\"4\" fill=\"#dc3545\" stroke=\"#dc3545\" stroke-width=\"1\"/><text x=\"80\" y=\"176\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Error: next(err)</text><text x=\"80\" y=\"188\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Catches async errors</text><text x=\"240\" y=\"200\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Custom Middleware: Configurable, reusable functions that process requests.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Custom Middleware",
      "useCase": "Request timing middleware.",
      "code": "function requestTime(req, res, next) {\n  req.requestTime = Date.now();\n  const originalEnd = res.end;\n  res.end = function(...args) {\n    console.log('Duration:', Date.now() - req.requestTime, 'ms');\n    originalEnd.apply(res, args);\n  };\n  next();\n}\napp.use(requestTime);",
      "description": "Attaches start time and logs duration on response finish by wrapping res.end."
    },
    {
      "title": "Configurable Factory Middleware",
      "useCase": "Options-based logger.",
      "code": "function createLogger(prefix) {\n  return function(req, res, next) {\n    console.log(`[${prefix}] ${req.method} ${req.url}`);\n    next();\n  };\n}\napp.use('/api', createLogger('API'));\napp.use('/admin', createLogger('ADMIN'));",
      "description": "Factory function creates logger middleware with different prefixes for different paths."
    },
    {
      "title": "Async Middleware with Error Handling",
      "useCase": "Database lookup middleware.",
      "code": "async function loadUser(req, res, next) {\n  try {\n    const user = await db.users.findById(req.params.id);\n    if (!user) return res.status(404).json({ error: 'User not found' });\n    req.user = user;\n    next();\n  } catch (err) {\n    next(err);\n  }\n}",
      "description": "Async middleware with proper try/catch and error forwarding via next(err)."
    },
    {
      "title": "Route-Specific Middleware Array",
      "useCase": "Validation on a specific route.",
      "code": "function validateBody(req, res, next) {\n  if (!req.body.name) return res.status(400).json({ error: 'Name required' });\n  next();\n}\nfunction sanitizeInput(req, res, next) {\n  req.body.name = req.body.name.trim();\n  next();\n}\napp.post('/users', [validateBody, sanitizeInput], createUser);",
      "description": "Multiple middleware functions applied as an array to a single route."
    },
    {
      "title": "Conditional Middleware",
      "useCase": "Skip middleware for certain conditions.",
      "code": "function skipIfProduction(middleware) {\n  return (req, res, next) => {\n    if (process.env.NODE_ENV === 'production') return next();\n    middleware(req, res, next);\n  };\n}\napp.use(skipIfProduction(morgan('dev')));",
      "description": "Higher-order function that conditionally applies morgan only in non-production environments."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What pattern makes middleware configurable?",
      "options": [
        "Class pattern",
        "Factory function pattern",
        "Singleton pattern",
        "Proxy pattern"
      ],
      "answer": 1,
      "explanation": "Factory functions accept options and return a middleware function with closure over the options."
    },
    {
      "question": "How do you pass next() after an async error?",
      "options": [
        "throw error",
        "next(err)",
        "return error",
        "res.send(error)"
      ],
      "answer": 1,
      "explanation": "Pass errors via next(err) in the catch block."
    },
    {
      "question": "Can middleware be applied to a single route?",
      "options": [
        "No",
        "Yes, inline in route definition",
        "Only with app.use",
        "Only globally"
      ],
      "answer": 1,
      "explanation": "Pass middleware inline: app.get(\\'/path\\', middleware, handler)."
    },
    {
      "question": "What happens if you call next() after res.send()?",
      "options": [
        "Works fine",
        "Headers already sent error",
        "next() is ignored",
        "Both execute"
      ],
      "answer": 1,
      "explanation": "Calling next() after sending a response causes a headers-already-sent error."
    },
    {
      "question": "How do you create a middleware that skips itself?",
      "options": [
        "return null",
        "Call next() early without work",
        "Throw an error",
        "Return res.send()"
      ],
      "answer": 1,
      "explanation": "Call next() early without performing the middleware work to skip."
    },
    {
      "question": "What is the first argument to error-handling middleware?",
      "options": [
        "req",
        "res",
        "err",
        "next"
      ],
      "answer": 2,
      "explanation": "Error-handling middleware receives err as its first parameter."
    }
  ]
};

TOPICS_DATA["express"]["express-error-handling"] = {
  "id": "express-error-handling",
  "title": "Error Handling Middleware",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Error-handling middleware has four parameters (err, req, res, next) and is used to catch and process errors that occur in other middleware or route handlers.",
    "Errors are triggered by calling next(err) or by throwing synchronously. Express skips all regular middleware and goes directly to error-handling middleware.",
    "Define error-handling middleware last in the middleware stack to catch errors from all preceding middleware and routes.",
    "Best practice: create a centralized error handler that formats responses consistently based on error type (validation, auth, not found, server error)."
  ],
  "laymanDefinition": "Error-handling middleware is like a hospital emergency room. When something goes wrong anywhere in the building (application), the patient (error) is rushed past all other queues directly to the ER (error handler) where specialized doctors (handlers) treat it.",
  "deepDive": [
    {
      "heading": "Error-Handling Signature",
      "text": "Error-handling middleware is identified by having exactly four parameters: (err, req, res, next). Even if next is not used, all four parameters must be declared. Express differentiates error middleware from regular middleware by the parameter count."
    },
    {
      "heading": "Triggering Error Middleware",
      "text": "Errors reach error middleware via next(err) or synchronous throws. Async errors must be caught and passed: try { ... } catch(err) { next(err) }. Express 5+ catches async errors automatically. Call next() without arguments to skip to regular middleware."
    },
    {
      "heading": "Centralized Error Handler",
      "text": "Create a single error-handling middleware that checks the error type and responds appropriately. Use custom error classes with statusCode, message, and details properties. The handler should distinguish between operational errors (known, expected) and programmer errors (bugs)."
    },
    {
      "heading": "Error Response Format",
      "text": "Consistent JSON error format: { error: { message, status, details?, stack? } }. Include stack traces only in development (check NODE_ENV). Use HTTP status codes appropriately: 400 validation, 401 unauthorized, 403 forbidden, 404 not found, 500 server error."
    },
    {
      "heading": "Custom Error Classes",
      "text": "Create AppError class extending Error with statusCode, isOperational fields. Controllers throw new AppError(\\'Not Found\\', 404). Error handler checks isOperational to determine whether to crash the process (programmer errors) or respond gracefully (operational errors)."
    }
  ],
  "interviewAnswer": "Proper error handling with centralized middleware is critical for production Express applications. It ensures consistent error responses, prevents information leakage, and helps debug issues effectively.",
  "interviewQuestions": [
    {
      "question": "What is error-handling middleware?",
      "answer": "Middleware with four parameters (err, req, res, next) that catches errors from other middleware and routes. It runs only when next(err) is called or a synchronous error is thrown. It should be defined last in the middleware stack."
    },
    {
      "question": "How do you trigger error-handling middleware?",
      "answer": "Call next(err) with an error argument. Express skips all regular middleware and jumps to the first error-handling middleware. Synchronous throws also trigger it. For async code, catch errors and call next(err)."
    },
    {
      "question": "How do you create a centralized error handler?",
      "answer": "Define error-handling middleware with (err, req, res, next) at the end of your middleware stack. Check err.statusCode or customize based on error type. Send a consistent JSON response with appropriate status code."
    },
    {
      "question": "What are custom error classes?",
      "answer": "Classes that extend Error with additional properties like statusCode and isOperational. Example: class AppError extends Error { constructor(message, statusCode) { super(message); this.statusCode = statusCode; } }. They make error handling more consistent."
    },
    {
      "question": "How do you handle async errors in Express 4?",
      "answer": "Wrap async route handlers in a utility function: const wrapAsync = fn => (req, res, next) => fn(req, res, next).catch(next). Or use express-async-errors package to patch Express. Without catching, promise rejections crash the process."
    },
    {
      "question": "What is the difference between operational and programmer errors?",
      "answer": "Operational errors are expected (invalid input, not found, auth failure) - handle gracefully. Programmer errors are bugs (undefined variable, type error) - crash and restart. Error handler should distinguish between them."
    },
    {
      "question": "How do you prevent stack trace leakage in production?",
      "answer": "Check NODE_ENV in error handler: if (process.env.NODE_ENV === \\'production\\') delete err.stack. Never send raw error messages to clients in production. Log full errors server-side, send sanitized messages to clients."
    },
    {
      "question": "What status codes should different errors return?",
      "answer": "400 (bad request/validation), 401 (unauthenticated), 403 (unauthorized/forbidden), 404 (not found), 409 (conflict), 422 (unprocessable entity), 429 (rate limited), 500 (internal server error)."
    },
    {
      "question": "How do you handle 404 errors in Express?",
      "answer": "Add a catch-all middleware after all routes: app.use((req, res) => res.status(404).json({ error: \\'Not Found\\' })). This runs when no route matches the incoming request path."
    },
    {
      "question": "Can you have multiple error-handling middleware?",
      "answer": "Yes, you can chain error handlers. Each checks the error and either handles it (sends response) or passes to the next error handler via next(err). Useful for separating validation errors from server errors."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Error Handling Middleware</text><rect x=\"10\" y=\"40\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"75\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">app.get(\"/\"...)</text><text x=\"75\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Route Handler</text><line x1=\"140\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"140\" y1=\"93\" x2=\"170\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"180\" y1=\"75\" x2=\"180\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"95\" width=\"130\" height=\"30\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"245\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">next(err)</text><text x=\"245\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Error Triggered</text><line x1=\"310\" y1=\"110\" x2=\"340\" y2=\"110\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"130\" height=\"30\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"245\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">app.get(\"/\"...)</text><text x=\"245\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Works Fine</text><line x1=\"310\" y1=\"55\" x2=\"340\" y2=\"55\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"85\" width=\"130\" height=\"50\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"415\" y=\"101\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Error Handler</text><text x=\"415\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">(err,req,res,next)</text><text x=\"240\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Error Handling: next(err) triggers error middleware that formats and sends error responses.</text></svg>",
  "codeExamples": [
    {
      "title": "Centralized Error Handler",
      "useCase": "Single error-handling middleware.",
      "code": "app.use((err, req, res, next) => {\n  const status = err.statusCode || 500;\n  const message = err.isOperational ? err.message : 'Internal Server Error';\n  console.error('ERROR:', err);\n  res.status(status).json({\n    error: { message, status },\n    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })\n  });\n});",
      "description": "Centralized handler that distinguishes operational errors from bugs, sanitizes output in production."
    },
    {
      "title": "Custom Error Class",
      "useCase": "Extending Error for consistent error handling.",
      "code": "class AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = true;\n    Error.captureStackTrace(this, this.constructor);\n  }\n}\nthrow new AppError('Invalid credentials', 401);",
      "description": "Custom error class with status code and operational flag for centralized handling."
    },
    {
      "title": "Async Error Wrapper",
      "useCase": "Utility to catch async errors.",
      "code": "const catchAsync = (fn) => {\n  return (req, res, next) => {\n    fn(req, res, next).catch(next);\n  };\n};\napp.get('/users', catchAsync(async (req, res) => {\n  const users = await db.findMany();\n  res.json(users);\n}));",
      "description": "Wrapper function that catches async errors and passes them to next(err) automatically."
    },
    {
      "title": "404 Catch-All Handler",
      "useCase": "Handling unmatched routes.",
      "code": "app.use('/api', apiRouter);\napp.use('/', webRouter);\n// 404 handler for unmatched routes\napp.use((req, res) => {\n  res.status(404).json({\n    error: { message: `Route ${req.method} ${req.url} not found` }\n  });\n});",
      "description": "Catch-all middleware placed after all routes sends a 404 JSON response for unmatched paths."
    },
    {
      "title": "Multiple Error Handlers",
      "useCase": "Separate handling for different error types.",
      "code": "// Handle validation errors first\napp.use((err, req, res, next) => {\n  if (err.name === 'ValidationError') {\n    return res.status(400).json({ error: err.message });\n  }\n  next(err);\n});\n// Handle all other errors\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ error: 'Something went wrong' });\n});",
      "description": "Multiple error handlers: first handles validation errors, second handles everything else."
    }
  ],
  "mcqQuestions": [
    {
      "question": "How many parameters does error-handling middleware have?",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "answer": 2,
      "explanation": "Error-handling middleware has exactly four parameters: err, req, res, next."
    },
    {
      "question": "What triggers error-handling middleware?",
      "options": [
        "Calling next()",
        "Calling next(err)",
        "Calling res.send()",
        "Calling next('route')"
      ],
      "answer": 1,
      "explanation": "next(err) with an error argument triggers error-handling middleware."
    },
    {
      "question": "Where should error-handling middleware be defined?",
      "options": [
        "First in the stack",
        "Before routes",
        "Last in the stack",
        "In a route file"
      ],
      "answer": 2,
      "explanation": "Error-handling middleware should be defined last in the middleware stack."
    },
    {
      "question": "What is the purpose of custom error classes?",
      "options": [
        "Make errors prettier",
        "Add statusCode and type properties",
        "Speed up error handling",
        "Log errors automatically"
      ],
      "answer": 1,
      "explanation": "Custom error classes add consistent properties like statusCode and isOperational."
    },
    {
      "question": "How do you prevent stack trace leakage?",
      "options": [
        "Delete err.stack in production",
        "Set NODE_ENV=production",
        "Use try/catch",
        "Both check NODE_ENV and conditionally include stack"
      ],
      "answer": 3,
      "explanation": "Check NODE_ENV and only include stack traces in development mode."
    },
    {
      "question": "What utility catches async errors automatically?",
      "options": [
        "express-async",
        "catchAsync wrapper",
        "async-handler",
        "error-catcher"
      ],
      "answer": 1,
      "explanation": "A catchAsync wrapper function catches promise rejections and passes them to next(err)."
    }
  ]
};

TOPICS_DATA["express"]["express-authentication-middleware"] = {
  "id": "express-authentication-middleware",
  "title": "Authentication Middleware",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,
  "tldr": [
    "Authentication middleware verifies user identity before granting access to protected routes, typically using JWT tokens, session cookies, or API keys.",
    "JWT (JSON Web Token) authentication is stateless: tokens are verified in middleware without server-side session storage.",
    "Session-based authentication stores session data server-side (in memory or Redis) and uses signed cookies for client identification.",
    "Authentication middleware attaches the authenticated user to req.user for downstream route and controller use."
  ],
  "laymanDefinition": "Authentication middleware is like a security guard checking IDs at the door of a building. It verifies that you are who you claim to be (authentication) before letting you proceed further into the building.",
  "deepDive": [
    {
      "heading": "JWT Authentication Flow",
      "text": "Client sends token in Authorization header (Bearer token). Middleware extracts token, verifies signature using secret key, decodes payload, and attaches user to req. Token contains claims (userId, role, exp). Stateless: no server-side session storage needed."
    },
    {
      "heading": "Session Authentication Flow",
      "text": "Client sends session cookie. Middleware reads cookie, looks up session in store (memory, Redis, database). If valid, attaches user to req.user. Stateful: session data persists server-side. Easier to revoke than JWT. Requires a session store for production."
    },
    {
      "heading": "Passport.js Integration",
      "text": "Passport is the most popular authentication middleware for Express. It uses strategies (passport-jwt, passport-local, passport-google-oauth). Configure strategy, serialize/deserialize user, and use passport.authenticate() middleware on protected routes."
    },
    {
      "heading": "Protected Route Patterns",
      "text": "Create reusable auth middleware: const protect = (req, res, next) => { if (!req.user) return res.status(401).json({ error: \\'Unauthorized\\' }); next(); }. Apply globally: app.use(\\'/api/protected\\', protect, router). Or per route: app.get(\\'/profile\\', protect, getProfile)."
    },
    {
      "heading": "Role-Based Access Control",
      "text": "Extend auth middleware to check roles: const authorize = (...roles) => (req, res, next) => { if (!roles.includes(req.user.role)) return res.status(403).json({ error: \\'Forbidden\\' }); next(); }. Chain: app.get(\\'/admin\\', protect, authorize(\\'admin\\'), handler)."
    }
  ],
  "interviewAnswer": "Authentication middleware is a critical security layer in Express applications. Whether using JWT (stateless, scalable) or sessions (stateful, revocable), the middleware pattern keeps auth logic centralized and reusable.",
  "interviewQuestions": [
    {
      "question": "What does authentication middleware do?",
      "answer": "It verifies the identity of a user by validating credentials (JWT, session, API key) attached to incoming requests. On success, it attaches the authenticated user object to req.user. On failure, it returns a 401 response."
    },
    {
      "question": "How does JWT authentication middleware work?",
      "answer": "Extracts token from Authorization header (Bearer scheme), verifies the signature using a secret key, decodes the payload, and attaches user data to req.user. JWTs contain expiry (exp) and are stateless - no server-side storage needed."
    },
    {
      "question": "How does session-based auth differ from JWT?",
      "answer": "Sessions store data server-side (memory, Redis). The client only holds a signed cookie ID. Sessions are easier to revoke but require storage. JWT is stateless, contains all user data in the token, and scales better but cannot be revoked before expiry."
    },
    {
      "question": "What is Passport.js?",
      "answer": "Passport is authentication middleware for Express that supports over 500 strategies (local, JWT, OAuth, SAML). It uses the strategy pattern: configure a strategy, serialize/deserialize user, and call passport.authenticate() on routes."
    },
    {
      "question": "How do you protect multiple routes with auth middleware?",
      "answer": "Mount the middleware on a router: router.use(protect). Or apply globally with path prefix: app.use(\\'/api/protected\\', authMiddleware, protectedRouter). This protects all routes in that router without repeating the middleware."
    },
    {
      "question": "How do you implement role-based access control?",
      "answer": "Create an authorize middleware factory: const authorize = (...roles) => (req, res, next) => { if (!roles.includes(req.user.role)) return res.status(403).json({ error: \\'Forbidden\\' }); next(); }. Chain with protect: app.use(auth, authorize(\\'admin\\'))."
    },
    {
      "question": "What should the auth middleware return on failure?",
      "answer": "Return 401 for missing/invalid credentials, 403 for valid credentials but insufficient permissions. Include a clear error message. Do not reveal whether the user exists (prevents enumeration attacks)."
    },
    {
      "question": "How do you handle token expiry in middleware?",
      "answer": "Check the exp claim in JWT. Return 401 with \\'Token expired\\' message. The client should refresh the token using a refresh token endpoint. Session-based auth handles expiry via session TTL."
    },
    {
      "question": "Can you use multiple auth strategies simultaneously?",
      "answer": "Yes, create middleware that tries each strategy in order. For example, first check JWT, then check session cookie, then check API key. If any succeeds, proceed. If all fail, return 401. Passport supports this with the concept of multiple strategies."
    },
    {
      "question": "How do you test authentication middleware?",
      "answer": "Create mock req objects with headers and mock res with status and json spies. Invoke middleware and assert: 401 sent for missing token, req.user populated for valid token, correct error message for expired token."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Authentication Middleware</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Bearer token</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"235\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Auth Middleware</text><text x=\"235\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Verify JWT</text><line x1=\"170\" y1=\"75\" x2=\"170\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"130\" y1=\"93\" x2=\"170\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"95\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"70\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">401 Error</text><text x=\"70\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Unauthorized</text><rect x=\"180\" y=\"95\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"240\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">req.user set</text><text x=\"240\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Valid Auth</text><line x1=\"300\" y1=\"113\" x2=\"330\" y2=\"113\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"340\" y=\"80\" width=\"120\" height=\"50\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"400\" y=\"96\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"400\" y=\"108\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Access req.user</text><text x=\"240\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Auth Middleware: Verify token/session, attach user to req, deny or allow access.</text></svg>",
  "codeExamples": [
    {
      "title": "JWT Authentication Middleware",
      "useCase": "Verifying a JSON Web Token.",
      "code": "const jwt = require('jsonwebtoken');\nfunction authenticate(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token provided' });\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    res.status(401).json({ error: 'Invalid token' });\n  }\n}",
      "description": "Extracts Bearer token, verifies with JWT secret, attaches decoded payload to req.user."
    },
    {
      "title": "Role-Based Authorization",
      "useCase": "Admin-only route protection.",
      "code": "function authorize(...roles) {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ error: 'Insufficient permissions' });\n    }\n    next();\n  };\n}\napp.delete('/users/:id', authenticate, authorize('admin'), deleteUser);",
      "description": "authorize factory checks user role against allowed roles, returns 403 if unauthorized."
    },
    {
      "title": "Session Authentication",
      "useCase": "Express-session based auth.",
      "code": "const session = require('express-session');\napp.use(session({\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  cookie: { secure: true, httpOnly: true, maxAge: 3600000 }\n}));\nfunction sessionAuth(req, res, next) {\n  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });\n  req.user = { id: req.session.userId, role: req.session.role };\n  next();\n}",
      "description": "Session-based auth reads userId from session store and attaches user to req."
    },
    {
      "title": "Passport JWT Strategy",
      "useCase": "Using Passport for JWT auth.",
      "code": "const passport = require('passport');\nconst JwtStrategy = require('passport-jwt').Strategy;\nconst opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET };\npassport.use(new JwtStrategy(opts, (payload, done) => {\n  done(null, { id: payload.sub, role: payload.role });\n}));\napp.use(passport.initialize());\napp.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);",
      "description": "Passport JWT strategy handles token extraction and verification with minimal boilerplate."
    },
    {
      "title": "API Key Authentication",
      "useCase": "Simple key-based auth for services.",
      "code": "function apiKeyAuth(req, res, next) {\n  const key = req.headers['x-api-key'];\n  if (!key || key !== process.env.API_KEY) {\n    return res.status(401).json({ error: 'Invalid API key' });\n  }\n  next();\n}\napp.use('/api/service', apiKeyAuth, serviceRouter);",
      "description": "Simple API key check from a custom header, suitable for server-to-server communication."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Where is a JWT token typically sent?",
      "options": [
        "Query parameter",
        "Authorization header",
        "Request body",
        "Cookie"
      ],
      "answer": 1,
      "explanation": "JWT is typically sent in the Authorization header using the Bearer scheme."
    },
    {
      "question": "What does auth middleware attach to the request on success?",
      "options": [
        "req.token",
        "req.user",
        "req.auth",
        "req.session"
      ],
      "answer": 1,
      "explanation": "Auth middleware attaches the authenticated user object to req.user."
    },
    {
      "question": "What status code indicates missing authentication?",
      "options": [
        "403",
        "401",
        "400",
        "500"
      ],
      "answer": 1,
      "explanation": "401 Unauthorized indicates missing or invalid authentication."
    },
    {
      "question": "What does passport.use() configure?",
      "options": [
        "Session store",
        "Authentication strategy",
        "Cookie parser",
        "Error handler"
      ],
      "answer": 1,
      "explanation": "passport.use() configures an authentication strategy like JWT or local."
    },
    {
      "question": "How do you implement role-based access?",
      "options": [
        "Check role in route handler",
        "Authorize middleware after auth",
        "Use Passport roles",
        "Check in app.use()"
      ],
      "answer": 1,
      "explanation": "Create an authorize middleware that checks req.user.role against allowed roles."
    },
    {
      "question": "What status code indicates valid auth but insufficient permissions?",
      "options": [
        "401",
        "403",
        "400",
        "404"
      ],
      "answer": 1,
      "explanation": "403 Forbidden indicates the user is authenticated but does not have permission."
    }
  ]
};

TOPICS_DATA["express"]["express-rest-api"] = {
  "id": "express-rest-api",
  "title": "REST API Development",
  "difficulty": "intermediate",
  "estimatedMinutes": 30,
  "tldr": [
    "REST (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP methods and stateless operations.",
    "Express is the most popular framework for building REST APIs in Node.js, providing routing, middleware, and request/response handling.",
    "REST API principles: resource-based URLs, HTTP methods as verbs (GET=read, POST=create, PUT/PATCH=update, DELETE=delete), and stateless communication.",
    "Best practices: versioning (/api/v1/), consistent error format, input validation, proper status codes, pagination, filtering, and HATEOAS links."
  ],
  "laymanDefinition": "REST API development is like building a library catalog system. Resources (books) are accessed via standard operations: GET to browse, POST to add, PUT to update, DELETE to remove. The system is stateless - each request contains all needed information.",
  "deepDive": [
    {
      "heading": "Resource-Based URL Design",
      "text": "URLs represent resources (nouns), not actions (verbs). Examples: GET /api/users (list), POST /api/users (create), GET /api/users/:id (read), PUT /api/users/:id (replace), PATCH /api/users/:id (partial update), DELETE /api/users/:id (delete). Nested resources: GET /api/users/:id/orders."
    },
    {
      "heading": "HTTP Status Codes",
      "text": "200 OK (success), 201 Created (POST), 204 No Content (DELETE), 400 Bad Request (validation), 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error. Use the correct code for every response."
    },
    {
      "heading": "Request Validation",
      "text": "Validate request data before processing. Use express-validator or Joi to validate req.body, req.params, req.query. Return 400 with specific error messages for invalid data. Never trust client input - always validate and sanitize on the server."
    },
    {
      "heading": "Pagination, Sorting, Filtering",
      "text": "Pagination: GET /api/users?page=1&limit=20 returns { data: [...], total, page, totalPages }. Sorting: ?sort=-createdAt (minus for descending). Filtering: ?status=active&role=admin. Search: ?q=searchTerm. API consumers expect consistent query parameter patterns."
    },
    {
      "heading": "API Versioning",
      "text": "Version your API to maintain backward compatibility. Common strategies: URL prefix (/api/v1/), custom header (Accept: application/vnd.myapp.v1+json), or query parameter (?version=1). URL versioning is the most common and explicit approach."
    }
  ],
  "interviewAnswer": "REST API development with Express is about structuring routes, handling requests consistently, and following RESTful conventions. Proper status codes, validation, error handling, and documentation make APIs reliable and developer-friendly.",
  "interviewQuestions": [
    {
      "question": "What is REST API design?",
      "answer": "REST is an architectural style where resources are accessed via URLs, and operations are performed using HTTP methods. GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing. APIs are stateless and use standard status codes."
    },
    {
      "question": "How do you structure RESTful routes in Express?",
      "answer": "Use Express.Router for each resource. Define routes: GET / (list), POST / (create), GET /:id (read), PUT /:id (replace), PATCH /:id (partial update), DELETE /:id (delete). Mount routers: app.use(\\'/api/users\\', userRouter)."
    },
    {
      "question": "What status codes should a REST API use?",
      "answer": "200 GET/PUT/PATCH success, 201 POST success, 204 DELETE success, 400 validation error, 401 unauth, 403 forbidden, 404 not found, 409 conflict, 422 unprocessable, 429 rate limited, 500 server error."
    },
    {
      "question": "How do you implement validation in REST APIs?",
      "answer": "Use express-validator or Joi libraries. Define validation rules for each endpoint. Apply validation middleware before the route handler. Return 400 with field-level error messages. Sanitize inputs to prevent injection."
    },
    {
      "question": "How do you implement pagination?",
      "answer": "Accept page and limit query parameters. Calculate offset = (page - 1) * limit. Return paginated data with metadata: { data: [], total, page, limit, totalPages }. Validate that page and limit are positive integers."
    },
    {
      "question": "What is API versioning and why is it important?",
      "answer": "Versioning allows making breaking changes without affecting existing clients. URL versioning (/api/v1/users, /api/v2/users) is most common. It enables gradual migration and maintains backward compatibility."
    },
    {
      "question": "How do you handle errors consistently?",
      "answer": "Create a centralized error handler that formats all errors as: { error: { message, status, details? } }. Use custom error classes with status codes. Log errors server-side. Include stack traces only in development."
    },
    {
      "question": "How do you structure a large Express API project?",
      "answer": "Organize by feature/resource: routes/, controllers/, middleware/, models/, validators/, config/, utils/. Each resource gets its own folder with route, controller, and validator files. Use dependency injection for testability."
    },
    {
      "question": "What are best practices for REST API naming?",
      "answer": "Use plural nouns (/users not /user), kebab-case for multi-word (/blog-posts), lowercase, nested routes for related resources (/users/:id/orders), avoid verbs in URLs (use HTTP methods instead)."
    },
    {
      "question": "How do you document a REST API?",
      "answer": "Use OpenAPI/Swagger specification. Tools: swagger-jsdoc for auto-generating specs from JSDoc comments, swagger-ui-express for serving the documentation UI. Document endpoints, parameters, request bodies, responses, and authentication."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">REST API Development</text><rect x=\"10\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"60\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">GET /users</text><text x=\"60\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">List</text><rect x=\"10\" y=\"85\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"60\" y=\"101\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">POST /users</text><text x=\"60\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Create</text><rect x=\"10\" y=\"130\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"60\" y=\"146\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">GET /users/:id</text><text x=\"60\" y=\"158\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Read</text><rect x=\"10\" y=\"175\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"60\" y=\"191\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">DELETE /users/:id</text><text x=\"60\" y=\"203\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Delete</text><line x1=\"110\" y1=\"58\" x2=\"140\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"110\" y1=\"103\" x2=\"140\" y2=\"103\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"110\" y1=\"148\" x2=\"140\" y2=\"148\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"110\" y1=\"193\" x2=\"140\" y2=\"193\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"150\" y=\"40\" width=\"140\" height=\"170\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"220\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Express API</text><text x=\"220\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Version / Validation / Auth / Pagination / Error Handling</text><text x=\"240\" y=\"230\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">REST API: Resource-based URLs with HTTP method verbs and consistent response patterns.</text></svg>",
  "codeExamples": [
    {
      "title": "CRUD Routes for a Resource",
      "useCase": "Standard RESTful route setup.",
      "code": "const router = require('express').Router();\nrouter.get('/', controller.list);\nrouter.post('/', validateCreate, controller.create);\nrouter.get('/:id', controller.getById);\nrouter.put('/:id', validateUpdate, controller.update);\nrouter.delete('/:id', controller.delete);\nmodule.exports = router;",
      "description": "Standard CRUD routes for a resource with validation middleware on mutation endpoints."
    },
    {
      "title": "Pagination Middleware",
      "useCase": "Parsing pagination params.",
      "code": "function paginate(req, res, next) {\n  const page = Math.max(1, parseInt(req.query.page) || 1);\n  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));\n  req.pagination = { page, limit, offset: (page - 1) * limit };\n  next();\n}\nrouter.get('/', paginate, controller.list);",
      "description": "Middleware that parses and validates pagination parameters, attaching them to req.pagination."
    },
    {
      "title": "Consistent Response Wrapper",
      "useCase": "Standard response format.",
      "code": "function sendSuccess(res, data, status = 200) {\n  res.status(status).json({ success: true, data });\n}\nfunction sendError(res, message, status = 400) {\n  res.status(status).json({ success: false, error: message });\n}\n// Usage:\nsendSuccess(res, { user }, 201);\nsendError(res, 'User not found', 404);",
      "description": "Helper functions that standardize successful and error response formats across the API."
    },
    {
      "title": "API Versioning with Express Router",
      "useCase": "Versioned API structure.",
      "code": "const v1Router = require('./routes/v1');\nconst v2Router = require('./routes/v2');\napp.use('/api/v1', v1Router);\napp.use('/api/v2', v2Router);",
      "description": "Different versions of the API mounted at different URL prefixes, allowing gradual migration."
    },
    {
      "title": "Filtering and Sorting",
      "useCase": "Flexible query parameter handling.",
      "code": "router.get('/', (req, res) => {\n  const { status, role, sort = '-createdAt', q } = req.query;\n  const filter = {};\n  if (status) filter.status = status;\n  if (role) filter.role = role;\n  if (q) filter.$text = { $search: q };\n  const sortOrder = sort.startsWith('-')\n    ? { [sort.slice(1)]: -1 }\n    : { [sort]: 1 };\n  // Query database with filter and sortOrder\n});",
      "description": "Flexible filtering by multiple fields, search via q parameter, and sorting with direction prefix."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What HTTP method is used for creating a resource?",
      "options": [
        "GET",
        "POST",
        "PUT",
        "PATCH"
      ],
      "answer": 1,
      "explanation": "POST creates a new resource, returning 201 Created on success."
    },
    {
      "question": "What status code indicates a successful DELETE?",
      "options": [
        "200",
        "201",
        "204",
        "301"
      ],
      "answer": 2,
      "explanation": "204 No Content is returned for successful DELETE operations."
    },
    {
      "question": "What is the responsibility of express-validator?",
      "options": [
        "Parse JSON",
        "Validate request data",
        "Authenticate users",
        "Log requests"
      ],
      "answer": 1,
      "explanation": "express-validator validates request data against defined rules."
    },
    {
      "question": "How do you implement pagination query params?",
      "options": [
        "page and size",
        "page and limit",
        "offset and count",
        "start and end"
      ],
      "answer": 1,
      "explanation": "page and limit are the standard query parameter names for pagination."
    },
    {
      "question": "What is the purpose of API versioning?",
      "options": [
        "Increase speed",
        "Maintain backward compatibility",
        "Reduce code",
        "Simplify routing"
      ],
      "answer": 1,
      "explanation": "Versioning maintains backward compatibility while allowing API evolution."
    },
    {
      "question": "What tool documents Express REST APIs?",
      "options": [
        "JSDoc",
        "Swagger/OpenAPI",
        "ESLint",
        "Mocha"
      ],
      "answer": 1,
      "explanation": "Swagger/OpenAPI with swagger-jsdoc and swagger-ui-express documents REST APIs."
    }
  ]
};

TOPICS_DATA["express"]["express-request-lifecycle"] = {
  "id": "express-request-lifecycle",
  "title": "Request Lifecycle",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "The Express request lifecycle describes the complete path of an HTTP request from arrival to response, including all middleware and handler execution.",
    "Request enters Express, passes through the middleware chain in registration order, reaches the matching route handler, and the response flows back through the middleware stack.",
    "Understanding the lifecycle is crucial for debugging, performance optimization, and correctly ordering middleware like body parsers before routes and error handlers last.",
    "The lifecycle includes: request parsing -> middleware chain -> route matching -> handler execution -> response generation -> middleware (response phase) -> send to client."
  ],
  "laymanDefinition": "The request lifecycle is like a package traveling through a sorting facility. It goes through multiple conveyor belts (middleware) in a specific order, gets sorted to the right destination (route), is processed (handler), and then the response travels back through the belts in reverse.",
  "deepDive": [
    {
      "heading": "Request Arrival and Parsing",
      "text": "The HTTP request hits the Express server. Node.js parses headers and creates the IncomingMessage (req) and ServerResponse (res) objects. Express extends these with its own properties and methods. Body parsing middleware (express.json(), express.urlencoded()) reads the stream and populates req.body."
    },
    {
      "heading": "Middleware Chain Execution",
      "text": "Registered middleware executes in order of registration (first to last). Each middleware can: modify req/res, call next() to continue, call next(err) for errors, or send a response to end the cycle. Middleware without a path runs for all requests; middleware with a path runs only for matching paths."
    },
    {
      "heading": "Route Matching and Handler Execution",
      "text": "Express matches the request path and method against registered routes. The first matching route handler executes. Route handlers are just middleware that typically send a response. If no route matches, Express falls through to the 404 handler (or default \"Cannot GET /\" response)."
    },
    {
      "heading": "Response Generation and Send",
      "text": "Route handlers generate responses using res.json(), res.send(), res.render(), res.redirect(), etc. These methods set appropriate headers and send the response body. After sending, the response phase begins where middleware can still modify the response via res.on(\\'finish\\') listeners."
    },
    {
      "heading": "Response Phase and Cleanup",
      "text": "After response is sent, Express triggers res.on(\\'finish\\') and res.on(\\'close\\') events. Middleware that wrapped res.end() can execute cleanup code. The connection may be kept alive for HTTP/1.1 or closed. Error handling middleware catches any errors from any phase."
    }
  ],
  "interviewAnswer": "The Express request lifecycle is a linear pipeline: request arrives -> middleware chain runs -> route handler executes -> response is sent -> response phase runs. Understanding this flow is essential for proper middleware ordering, debugging, and performance optimization.",
  "interviewQuestions": [
    {
      "question": "What is the Express request lifecycle?",
      "answer": "The lifecycle is: 1) Request arrives and is parsed, 2) Middleware chain executes in registration order, 3) Route handler matches and executes, 4) Response is generated and sent, 5) Response phase runs (finish/close events). Each middleware can pass control with next() or end the cycle by sending a response."
    },
    {
      "question": "In what order does middleware execute?",
      "answer": "Middleware executes in the exact order it is registered using app.use() or router.use(). First registered runs first. Middleware with path prefixes only runs for matching paths. Order matters: body parsers before routes, logging early, error handlers last."
    },
    {
      "question": "What happens if no route matches?",
      "answer": "If no route matches the request path and method, Express falls through all middleware and routes. The default behavior is to send a 404 response with \"Cannot GET /path\" (HTML). Custom 404 middleware should be added after all routes: app.use((req, res) => res.status(404).send(\\'Not Found\\'))."
    },
    {
      "question": "What is the difference between next() and next(err)?",
      "answer": "next() passes control to the next middleware in the chain. next(err) skips all remaining regular middleware and jumps directly to the first error-handling middleware (4 parameters). This is how errors propagate in Express."
    },
    {
      "question": "When does body parsing happen?",
      "answer": "Body parsing middleware (express.json(), express.urlencoded()) must be registered before routes that need the parsed body. It reads the request stream, parses it, and populates req.body. Without it, req.body is undefined. It should come early in the middleware chain."
    },
    {
      "question": "How does the response flow back?",
      "answer": "After the route handler sends a response (res.json(), etc.), Express sends headers and body to the client. The response phase begins: res.on(\\'finish\\') fires when headers are sent, res.on(\\'close\\') fires when connection closes. Middleware that wrapped res.end() can run cleanup code here."
    },
    {
      "question": "What is the purpose of res.on(\\'finish\\')?",
      "answer": "res.on(\\'finish\\') fires when the response headers are sent to the OS. It is used for logging, metrics, and cleanup. It fires after the response is sent but before the connection closes. Unlike close, it fires even on successful responses."
    },
    {
      "question": "How does Express handle async route handlers?",
      "answer": "In Express 4, async route handlers must manually catch errors and call next(err) (or use express-async-errors). In Express 5, async errors are automatically caught and passed to error middleware. Unhandled promise rejections in Express 4 can crash the process."
    },
    {
      "question": "What is the difference between req and res lifecycle?",
      "answer": "req lifecycle: created by Node.js -> extended by Express -> populated by middleware -> consumed by route handler. res lifecycle: created by Node.js -> extended by Express -> built up by route handler -> sent to client -> finish/close events. They are independent but coordinated."
    },
    {
      "question": "Why does middleware order matter?",
      "answer": "Middleware executes in registration order. A middleware that sends a response stops the chain. Body parsers must run before routes that read req.body. Auth middleware must run before protected routes. Error handlers must be last. Logging should be early. Order determines behavior."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Request Lifecycle</text><rect x=\"10\" y=\"40\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"75\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Request</text><text x=\"75\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Incoming</text><line x1=\"140\" y1=\"58\" x2=\"170\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"40\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"250\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware 1</text><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Logging</text><rect x=\"180\" y=\"80\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"250\" y=\"96\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware 2</text><text x=\"250\" y=\"108\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Body Parse</text><rect x=\"180\" y=\"120\" width=\"140\" height=\"30\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"250\" y=\"136\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Middleware 3</text><text x=\"250\" y=\"148\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Auth</text><line x1=\"180\" y1=\"70\" x2=\"180\" y2=\"78\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"180\" y1=\"110\" x2=\"180\" y2=\"118\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"320\" y1=\"78\" x2=\"350\" y2=\"78\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"320\" y1=\"95\" x2=\"350\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"320\" y1=\"135\" x2=\"350\" y2=\"135\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"360\" y=\"65\" width=\"120\" height=\"100\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"420\" y=\"81\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"420\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Response</text><line x1=\"360\" y1=\"165\" x2=\"330\" y2=\"165\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"180\" y=\"175\" width=\"140\" height=\"20\" rx=\"4\" fill=\"#dc3545\" stroke=\"#dc3545\" stroke-width=\"1\"/><text x=\"250\" y=\"191\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Error Handler</text><text x=\"250\" y=\"203\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">next(err)</text><text x=\"240\" y=\"220\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Request Lifecycle: Parse -> Middleware Chain -> Route Handler -> Response -> Cleanup.</text></svg>",
  "codeExamples": [
    {
      "title": "Middleware Order Example",
      "useCase": "Correct ordering of middleware.",
      "code": "const app = express();\napp.use(morgan('combined'));        // 1. Logging (early)\napp.use(express.json());            // 2. Body parsing (before routes)\napp.use(cors());                    // 3. CORS\napp.use(helmet());                  // 4. Security headers\napp.use(authMiddleware);            // 5. Auth (before protected routes)\napp.use('/api', apiRouter);         // 6. Routes\napp.use(notFoundHandler);           // 7. 404 (after routes)\napp.use(errorHandler);              // 8. Error handler (last)",
      "description": "Middleware order: logging -> body parsing -> CORS -> security -> auth -> routes -> 404 -> error handler."
    },
    {
      "title": "Wrapping res.end for Metrics",
      "useCase": "Capturing response timing.",
      "code": "function responseTime(req, res, next) {\n  const start = process.hrtime.bigint();\n  const originalEnd = res.end;\n  res.end = function(chunk, encoding, callback) {\n    const duration = Number(process.hrtime.bigint() - start) / 1e6;\n    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration.toFixed(2)}ms`);\n    return originalEnd.call(res, chunk, encoding, callback);\n  };\n  next();\n}",
      "description": "Wraps res.end to measure and log response time after the response is sent."
    },
    {
      "title": "Async Handler Wrapper",
      "useCase": "Auto-catch async errors in Express 4.",
      "code": "const asyncHandler = fn => (req, res, next) =>\n  Promise.resolve(fn(req, res, next)).catch(next);\n\napp.get('/users', asyncHandler(async (req, res) => {\n  const users = await User.findAll();\n  res.json(users);\n}));",
      "description": "Wraps async route handlers to automatically catch promise rejections and forward to error middleware."
    },
    {
      "title": "Finish Event for Cleanup",
      "useCase": "Running code after response is sent.",
      "code": "app.use((req, res, next) => {\n  res.on('finish', () => {\n    console.log('Response sent:', res.statusCode);\n    // Cleanup: close db connections, release locks\n  });\n  next();\n});",
      "description": "Uses res.on(\\'finish\\') to run cleanup code after the response headers are sent."
    },
    {
      "title": "Error Propagation",
      "useCase": "How errors flow through the lifecycle.",
      "code": "app.get('/error', (req, res, next) => {\n  throw new Error('Sync error');  // Caught by Express\n});\napp.get('/async-error', asyncHandler(async (req, res) => {\n  throw new Error('Async error'); // Caught by wrapper\n}));\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});",
      "description": "Sync throws and async rejections (with wrapper) both reach error-handling middleware."
    }
  ],
  "mcqQuestions": [
    {
      "question": "In what order does Express execute middleware?",
      "options": [
        "Reverse registration",
        "Registration order",
        "Alphabetical",
        "Random"
      ],
      "answer": 1,
      "explanation": "Middleware executes in the exact order it is registered."
    },
    {
      "question": "What happens when next(err) is called?",
      "options": [
        "Continues normal chain",
        "Jumps to error handler",
        "Stops all processing",
        "Restarts middleware"
      ],
      "answer": 1,
      "explanation": "next(err) skips all regular middleware and goes to error-handling middleware."
    },
    {
      "question": "Where should body parsers be registered?",
      "options": [
        "After routes",
        "Before routes",
        "At the end",
        "Order does not matter"
      ],
      "answer": 1,
      "explanation": "Body parsers must be registered before routes that need req.body."
    },
    {
      "question": "What event fires after response headers are sent?",
      "options": [
        "close",
        "finish",
        "end",
        "complete"
      ],
      "answer": 1,
      "explanation": "res.on(\\'finish\\') fires when headers are sent to the OS."
    },
    {
      "question": "What is the default 404 response in Express?",
      "options": [
        "JSON",
        "HTML with Cannot GET",
        "Empty",
        "Redirect"
      ],
      "answer": 1,
      "explanation": "Default 404 is an HTML page saying \"Cannot GET /path\"."
    },
    {
      "question": "How does Express 5 handle async errors differently?",
      "options": [
        "Manual catch required",
        "Auto-catches async errors",
        "Ignores async errors",
        "Throws sync errors"
      ],
      "answer": 1,
      "explanation": "Express 5 automatically catches promise rejections from async handlers."
    }
  ]
};

TOPICS_DATA["express"]["express-validation"] = {
  "id": "express-validation",
  "title": "Validation",
  "difficulty": "intermediate",
  "estimatedMinutes": 25,
  "tldr": [
    "Validation ensures incoming data meets expected format, type, and constraints before processing, preventing bad data from reaching business logic and databases.",
    "Express validation is commonly done with express-validator (declarative rules), Joi (schema-based), or Zod (TypeScript-first). Validation middleware runs before route handlers.",
    "Input sanitization removes or escapes dangerous characters (XSS prevention). Validation checks data integrity. Both should be applied at the boundary (routes/middleware).",
    "Validation errors should return 400 with detailed field-level messages. Custom validators can check business rules (unique email, valid date ranges, etc.)."
  ],
  "laymanDefinition": "Validation is like a security checkpoint at an airport. Every bag (request) is scanned against rules (validators). If something suspicious is found (invalid data), the passenger is stopped and told exactly what to fix before proceeding.",
  "deepDive": [
    {
      "heading": "express-validator Basics",
      "text": "express-validator uses chainable validation methods on req.body, req.query, req.params, req.headers. Example: body(\\'email\\').isEmail().normalizeEmail(). Returns validation result with errors array. Errors contain field, location, message, and value. Use validationResult(req) to check results."
    },
    {
      "heading": "Joi Schema Validation",
      "text": "Joi defines schemas as objects: Joi.object({ email: Joi.string().email().required() }). Validation returns { error, value } where error has details array. Joi supports complex validation: cross-field, conditional, custom rules. Better for complex nested objects."
    },
    {
      "heading": "Zod Validation (TypeScript)",
      "text": "Zod provides TypeScript-first validation with inferred types: z.object({ email: z.string().email() }). Parsing returns typed object or throws ZodError. Integrates with express via middleware. Great for end-to-end type safety from request to database."
    },
    {
      "heading": "Sanitization and Normalization",
      "text": "Sanitization transforms input: trim(), escape(), normalizeEmail(), toLowerCase(). Prevents issues like leading/trailing whitespace, XSS via script injection. Chain after validation: body(\\'name\\').trim().escape().isLength({ min: 1 })."
    },
    {
      "heading": "Custom Validators and Error Handling",
      "text": "Custom validators: body(\\'email\\').custom(async (value) => { const exists = await User.findByEmail(value); if (exists) throw new Error(\\'Email taken\\'); }). Error formatting: return 400 with { errors: [{ field, message }] }. Consistent structure helps frontend display errors."
    }
  ],
  "interviewAnswer": "Validation is a critical security and data integrity layer. Use declarative libraries (express-validator, Joi, Zod) for maintainable rules. Validate at the boundary, sanitize to prevent injection, and return clear error messages for better UX.",
  "interviewQuestions": [
    {
      "question": "What is the purpose of validation in Express?",
      "answer": "Validation ensures incoming request data meets expected format, types, and constraints before reaching business logic. It prevents invalid data from corrupting databases and provides clear feedback to API consumers."
    },
    {
      "question": "How does express-validator work?",
      "answer": "Use chainable methods on body, query, params: body(\\'email\\').isEmail().normalizeEmail(). In route handler, call validationResult(req). If errors exist, return 400 with formatted errors. Works as middleware chain."
    },
    {
      "question": "What is the difference between validation and sanitization?",
      "answer": "Validation checks if data meets criteria (rejects invalid). Sanitization transforms data (trims, escapes, normalizes) to make it safe/clean. Often chained: validate then sanitize."
    },
    {
      "question": "How do you validate nested objects with Joi?",
      "answer": "Use Joi.object() with nested keys: Joi.object({ user: Joi.object({ name: Joi.string().required() }) }). Supports array validation: Joi.array().items(Joi.object({ id: Joi.number() }))."
    },
    {
      "question": "What is Zod and how does it differ?",
      "answer": "Zod is TypeScript-first schema validation. Schemas infer TypeScript types: z.string().email() -> string. Use parse() for strict validation or safeParse() for typed result. Great for end-to-end type safety."
    },
    {
      "question": "How do you return validation errors to the client?",
      "answer": "Return 400 status with structured JSON: { success: false, errors: [{ field, message, value }] }. Use validationResult(req).array() to get formatted errors. Frontend can display field-specific messages."
    },
    {
      "question": "What are common validation rules?",
      "answer": "isEmail, isLength, isNumeric, isUUID, isISO8601, isIn, matches regex, custom async validators for DB uniqueness, conditional validation (if/else), cross-field validation (password/confirm)."
    },
    {
      "question": "How do you validate query parameters?",
      "answer": "Use query() instead of body(): query(\\'page\\').isInt({ min: 1 }).toInt(), query(\\'sort\\').isIn([\\'asc\\', \\'desc\\']). Validation runs on req.query object."
    },
    {
      "question": "How do you create custom async validators?",
      "answer": "Use .custom(async (value) => { const exists = await db.check(value); if (exists) throw new Error(\\'Already exists\\'); }). The custom function can be async and throw or return a promise."
    },
    {
      "question": "Where should validation middleware be placed?",
      "answer": "Before route handlers that need validated data. In chain: app.post(\\'/users\\', validateUser, createUser). Or as global middleware if all routes need it. Validation errors returned before handler executes."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Validation</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Request</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Input</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Validator</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">express-validator</text><rect x=\"190\" y=\"90\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"260\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Sanitizer</text><text x=\"260\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">trim/escape</text><line x1=\"330\" y1=\"58\" x2=\"360\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"108\" x2=\"360\" y2=\"108\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"370\" y=\"40\" width=\"100\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"420\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Valid</text><text x=\"420\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Data</text><line x1=\"370\" y1=\"75\" x2=\"370\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"230\" y=\"110\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#17a2b8\" stroke=\"#17a2b8\" stroke-width=\"1\"/><text x=\"300\" y=\"126\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Errors</text><text x=\"300\" y=\"138\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">400 Response</text><text x=\"240\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Validation: Input -> Validate -> Sanitize -> Valid Data or 400 Error.</text></svg>",
  "codeExamples": [
    {
      "title": "express-validator Chain",
      "useCase": "Email and password validation.",
      "code": "const { body, validationResult } = require('express-validator');\n\nconst validateRegister = [\n  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),\n  body('password').isLength({ min: 8 }).withMessage('Min 8 characters'),\n  body('confirmPassword').custom((value, { req }) => {\n    if (value !== req.body.password) throw new Error('Passwords must match');\n    return true;\n  }),\n  (req, res, next) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });\n    next();\n  }\n]",
      "description": "Validates email format, password length, and password confirmation with custom validator."
    },
    {
      "title": "Joi Schema Validation",
      "useCase": "Complex nested object validation.",
      "code": "const Joi = require('joi');\n\nconst schema = Joi.object({\n  user: Joi.object({\n    name: Joi.string().min(2).max(50).required(),\n    email: Joi.string().email().required(),\n    age: Joi.number().integer().min(18).max(120)\n  }).required(),\n  tags: Joi.array().items(Joi.string()).max(5)\n});\n\nfunction validate(schema) {\n  return (req, res, next) => {\n    const { error, value } = schema.validate(req.body, { abortEarly: false });\n    if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });\n    req.body = value; // Use sanitized value\n    next();\n  };\n}",
      "description": "Joi schema for nested user object with required fields and array of tags."
    },
    {
      "title": "Zod with TypeScript",
      "useCase": "Type-safe validation.",
      "code": "import { z } from 'zod';\n\nconst CreateUserSchema = z.object({\n  name: z.string().min(2).max(100),\n  email: z.string().email(),\n  role: z.enum(['user', 'admin']).default('user')\n});\n\napp.post('/users', (req, res, next) => {\n  const result = CreateUserSchema.safeParse(req.body);\n  if (!result.success) {\n    return res.status(400).json({ errors: result.error.flatten().fieldErrors });\n  }\n  req.validatedBody = result.data; // Fully typed\n  next();\n});",
      "description": "Zod schema infers TypeScript types. safeParse returns typed success/error. Validated data is fully typed."
    },
    {
      "title": "Sanitization Chain",
      "useCase": "Trim and escape user input.",
      "code": "const { body } = require('express-validator');\n\nbody('comment')\n  .trim()\n  .escape()\n  .isLength({ min: 1, max: 1000 })\n  .withMessage('Comment must be 1-1000 characters')",
      "description": "Trim removes whitespace, escape prevents XSS, isLength enforces bounds. Order matters: trim first, then escape."
    },
    {
      "title": "Custom Async Validator",
      "useCase": "Check database uniqueness.",
      "code": "body('email').custom(async (email) => {\n  const user = await User.findOne({ email });\n  if (user) {\n    throw new Error('Email already registered');\n  }\n  return true;\n}).normalizeEmail()",
      "description": "Async custom validator checks database for existing email. Throws error to fail validation. Normalizes after validation passes."
    }
  ],
  "mcqQuestions": [
    {
      "question": "Which library is TypeScript-first for validation?",
      "options": [
        "Joi",
        "express-validator",
        "Zod",
        "Yup"
      ],
      "answer": 2,
      "explanation": "Zod provides TypeScript type inference from validation schemas."
    },
    {
      "question": "What method checks validation results in express-validator?",
      "options": [
        "validationResult(req)",
        "req.validate()",
        "checkErrors()",
        "validate()"
      ],
      "answer": 0,
      "explanation": "validationResult(req) returns the validation result with isEmpty() and array() methods."
    },
    {
      "question": "What does sanitization do?",
      "options": [
        "Rejects invalid data",
        "Transforms/cleans data",
        "Encrypts data",
        "Logs data"
      ],
      "answer": 1,
      "explanation": "Sanitization transforms input (trim, escape, normalize) to make it safe."
    },
    {
      "question": "How do you validate query params with express-validator?",
      "options": [
        "query()",
        "params()",
        "queryString()",
        "req.query()"
      ],
      "answer": 0,
      "explanation": "Use query() chain: query(\\'page\\').isInt()."
    }
  ]
};

TOPICS_DATA["express"]["express-rate-limiting"] = {
  "id": "express-rate-limiting",
  "title": "Rate Limiting",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Rate limiting controls the number of requests a client can make within a time window, protecting APIs from abuse, brute force attacks, and ensuring fair resource usage.",
    "Express rate limiting is commonly implemented with express-rate-limit (memory store) or express-rate-limit with Redis for distributed applications.",
    "Key strategies: fixed window (simple, burst at edges), sliding window (smoother), token bucket (granular control). Configuration includes windowMs, max requests, keyGenerator, and handler.",
    "Apply globally for general protection, stricter on auth endpoints (login, register), and use different limits for authenticated vs anonymous users."
  ],
  "laymanDefinition": "Rate limiting is like a nightclub bouncer who only lets a certain number of people in per hour. If too many try to enter at once, the rest must wait outside until the next hour starts.",
  "deepDive": [
    {
      "heading": "Fixed Window Counter",
      "text": "Simplest algorithm: divide time into fixed windows. Count requests per window. When window resets, counter resets. Problem: burst traffic at window boundaries (e.g., 100 requests at end of window + 100 at start of next = 200 in 2 seconds). Good for basic protection, easy to implement."
    },
    {
      "heading": "Sliding Window Log",
      "text": "Records timestamp of each request. To check limit, count requests within the sliding window from now. More accurate, no boundary bursts, but stores all timestamps (memory intensive). Sliding window counter is a hybrid approximation using fixed windows with weighted counts."
    },
    {
      "heading": "Token Bucket Algorithm",
      "text": "Each client has a bucket with tokens. Requests consume tokens. Tokens refill at a fixed rate. If bucket empty, request rejected. Allows bursts up to bucket size while maintaining average rate. More complex but provides smooth rate limiting."
    },
    {
      "heading": "express-rate-limit Configuration",
      "text": "Options: windowMs (window duration), max (max requests), message (response), standardHeaders (RateLimit-* headers), legacyHeaders (X-RateLimit-*), keyGenerator (identifies client, default: IP), skip (condition to bypass), handler (custom response function). Use Redis store for multi-instance deployments."
    },
    {
      "heading": "Strategic Rate Limiting",
      "text": "Apply globally: app.use(rateLimiter) for general API protection. Stricter on auth: login = 5/min, register = 3/hour. Higher limits for authenticated users (by user ID). Skip for health checks, static assets. Use different stores for distributed systems. Monitor and adjust based on traffic patterns."
    }
  ],
  "interviewAnswer": "Rate limiting is essential for production APIs. Start with express-rate-limit for simplicity. Use Redis for distributed deployments. Tailor limits: strict on auth endpoints, generous on read-only endpoints. Monitor rate limit hits to detect abuse or adjust limits.",
  "interviewQuestions": [
    {
      "question": "What is rate limiting?",
      "answer": "Rate limiting restricts the number of requests a client can make within a time window. It prevents abuse, brute force attacks, and ensures fair resource allocation. Commonly implemented per IP, user ID, or API key."
    },
    {
      "question": "What are the main rate limiting algorithms?",
      "answer": "Fixed window (simple, boundary bursts), sliding window log (accurate, memory heavy), sliding window counter (hybrid), token bucket (smooth, burst allowance). Each has trade-offs between accuracy, memory, and implementation complexity."
    },
    {
      "question": "How do you configure express-rate-limit?",
      "answer": "const rateLimit = require(\"express-rate-limit\"); const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: \"Too many requests\" }); app.use(limiter); Creates a 100 req/15min limit per IP."
    },
    {
      "question": "What headers does rate limiting add?",
      "answer": "RateLimit-Limit (max requests), RateLimit-Remaining (remaining in window), RateLimit-Reset (seconds until reset). Also legacy: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. Enabled with standardHeaders/legacyHeaders options."
    },
    {
      "question": "How do you implement different limits for authenticated users?",
      "answer": "Use keyGenerator to identify by user ID instead of IP: keyGenerator: (req) => req.user?.id || req.ip. Or create separate limiters: strictLimiter for anonymous, generousLimiter for authenticated. Apply conditionally with skip option."
    },
    {
      "question": "What is the token bucket algorithm?",
      "answer": "Each client has a bucket with tokens. Each request consumes a token. Tokens refill at a fixed rate. If bucket empty, request rejected. Allows controlled bursts up to bucket size while maintaining average rate limit."
    },
    {
      "question": "How do you skip rate limiting for certain routes?",
      "answer": "Use skip option: skip: (req, res) => req.path.startsWith(\"/health\") || req.path.startsWith(\"/static\"). Or apply limiter only to specific routes: app.use(\"/api/\", apiLimiter). Health checks and static assets typically skipped."
    },
    {
      "question": "How do you use Redis for distributed rate limiting?",
      "answer": "Install rate-limit-redis: const RedisStore = require(\"rate-limit-redis\"); const limiter = rateLimit({ store: new RedisStore({ client: redisClient }), ... }). All instances share the same Redis counters."
    },
    {
      "question": "What status code should rate limiting return?",
      "answer": "429 Too Many Requests. Include Retry-After header with seconds until reset. Body should explain the limit and when to retry. Custom handler can format this response."
    },
    {
      "question": "How do you handle rate limiting for authenticated users?",
      "answer": "Identify by user ID instead of IP. Higher limits for authenticated (trusted) users. Apply stricter limits on sensitive endpoints (password reset, payments). Use separate limiters for auth vs general API."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Rate Limiting</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Client</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Request</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Fixed Window</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Counter</text><rect x=\"190\" y=\"90\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"260\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Sliding Window</text><text x=\"260\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Log</text><rect x=\"190\" y=\"140\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"260\" y=\"156\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Token Bucket</text><text x=\"260\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Smooth</text><line x1=\"330\" y1=\"58\" x2=\"360\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"108\" x2=\"360\" y2=\"108\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"158\" x2=\"360\" y2=\"158\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"370\" y=\"40\" width=\"100\" height=\"160\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"420\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Rate Limiter</text><text x=\"420\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">429 if Exceeded</text><text x=\"240\" y=\"230\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Rate Limiting: Control request frequency with fixed/sliding windows or token bucket.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic Rate Limiter",
      "useCase": "Global API protection.",
      "code": "const rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // limit each IP to 100 requests per window\n  message: 'Too many requests, please try again later',\n  standardHeaders: true,\n  legacyHeaders: true\n});\napp.use(limiter);",
      "description": "Global rate limiter: 100 requests per 15 minutes per IP with standard rate limit headers."
    },
    {
      "title": "Strict Auth Limiter",
      "useCase": "Protect login endpoint from brute force.",
      "code": "const loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 5, // 5 attempts per window\n  message: 'Too many login attempts, please try again in 15 minutes',\n  skipSuccessfulRequests: true // Don't count successful logins\n});\napp.post('/login', loginLimiter, loginHandler);",
      "description": "Strict limiter on login: 5 attempts per 15 min, skip counting successful logins."
    },
    {
      "title": "Per-User Rate Limiting",
      "useCase": "Higher limits for authenticated users.",
      "code": "const userLimiter = rateLimit({\n  windowMs: 60 * 60 * 1000, // 1 hour\n  max: 1000, // 1000 requests/hour for authenticated users\n  keyGenerator: (req) => req.user?.id || req.ip,\n  skip: (req) => !req.user // Skip for unauthenticated\n});\napp.use('/api', userLimiter);",
      "description": "Uses user ID as key for authenticated users, falls back to IP for anonymous. Higher limits for known users."
    },
    {
      "title": "Redis Store for Distributed",
      "useCase": "Shared rate limit across instances.",
      "code": "const RedisStore = require('rate-limit-redis');\nconst { createClient } = require('redis');\n\nconst redisClient = createClient({ url: process.env.REDIS_URL });\nawait redisClient.connect();\n\nconst limiter = rateLimit({\n  store: new RedisStore({\n    sendCommand: (...args) => redisClient.sendCommand(args)\n  }),\n  windowMs: 15 * 60 * 1000,\n  max: 100\n});",
      "description": "Redis store shares rate limit state across multiple server instances."
    },
    {
      "title": "Custom Handler",
      "useCase": "Custom 429 response format.",
      "code": "const limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n  handler: (req, res) => {\n    res.status(429).json({\n      error: 'Rate limit exceeded',\n      retryAfter: Math.ceil(res.get('Retry-After') || 900)\n    });\n  }\n});",
      "description": "Custom handler returns structured JSON error with retry-after information."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the default key generator in express-rate-limit?",
      "options": [
        "User ID",
        "API Key",
        "IP Address",
        "Session ID"
      ],
      "answer": 2,
      "explanation": "Default keyGenerator uses req.ip (client IP address)."
    },
    {
      "question": "What algorithm does express-rate-limit use by default?",
      "options": [
        "Token bucket",
        "Fixed window",
        "Sliding window",
        "Leaky bucket"
      ],
      "answer": 1,
      "explanation": "express-rate-limit uses fixed window counter by default."
    },
    {
      "question": "What HTTP status code indicates rate limited?",
      "options": [
        "400",
        "401",
        "403",
        "429"
      ],
      "answer": 3,
      "explanation": "429 Too Many Requests is the standard status code for rate limiting."
    },
    {
      "question": "How do you apply different limits to different routes?",
      "options": [
        "Create separate limiters",
        "Use max option",
        "Use windowMs",
        "Use message"
      ],
      "answer": 0,
      "explanation": "Create separate rateLimit instances with different configs and apply to specific routes."
    },
    {
      "question": "What does skipSuccessfulRequests do?",
      "options": [
        "Skips all requests",
        "Does not count successful responses",
        "Skips failed requests",
        "Skips unauthenticated"
      ],
      "answer": 1,
      "explanation": "When true, successful requests (2xx) do not count toward the rate limit."
    },
    {
      "question": "How do you use Redis with express-rate-limit?",
      "options": [
        "rate-limit-redis package",
        "Built-in Redis support",
        "Custom store only",
        "Not possible"
      ],
      "answer": 0,
      "explanation": "Use rate-limit-redis package with RedisStore for distributed rate limiting."
    }
  ]
};

TOPICS_DATA["express"]["express-helmet"] = {
  "id": "express-helmet",
  "title": "Helmet",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "Helmet is a middleware collection that sets security-related HTTP response headers to protect Express apps from common web vulnerabilities.",
    "It includes 15+ smaller middleware functions that set headers like Content-Security-Policy, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, and X-Content-Type-Options.",
    "Helmet provides sensible defaults while allowing per-header customization for specific application needs, such as CSP directives for third-party scripts.",
    "Using Helmet is a security best practice that helps prevent clickjacking, XSS, MIME sniffing, and other common attacks with minimal configuration."
  ],
  "laymanDefinition": "Helmet is like putting armor on your Express application. It adds protective layers (security headers) that tell browsers to behave more securely when interacting with your site.",
  "deepDive": [
    {
      "heading": "What Helmet Protects Against",
      "text": "Clickjacking (X-Frame-Options), Cross-Site Scripting (X-XSS-Protection, Content-Security-Policy), MIME sniffing attacks (X-Content-Type-Options), SSL stripping (Strict-Transport-Security), referrer leakage (Referrer-Policy), permission overreach (Permissions-Policy)."
    },
    {
      "heading": "Content Security Policy (CSP)",
      "text": "CSP controls which resources can load on your page. Helmet sets Content-Security-Policy header. Configure: default-src, script-src, style-src, img-src, connect-src, font-src, frame-src. Use \\'self\\' for same-origin, specific domains for third-party resources."
    },
    {
      "heading": "Helmet Configuration Options",
      "text": "helmet() with defaults is recommended. Customize: helmet({ contentSecurityPolicy: { directives: { defaultSrc: [\"\\'self\\'\"], scriptSrc: [\"\\'self\\'\", \"example.com\"] } }, frameguard: { action: \"deny\" } }). Disable a header: contentSecurityPolicy: false."
    },
    {
      "heading": "Using CSP with Development",
      "text": "CSP can block inline scripts and eval(). Development tools may need \\'unsafe-eval\\' for source maps, \\'unsafe-inline\\' for HMR. Use reportOnly mode for testing: helmet.contentSecurityPolicy({ useDefaults: true, reportOnly: true })."
    },
    {
      "heading": "HSTS and HTTPS Enforcement",
      "text": "Strict-Transport-Security tells browsers to always use HTTPS. Helmet sets max-age (seconds), includeSubDomains, preload. Set high max-age (1 year = 31536000) for production. Use preload to submit to browser preload lists for permanent HTTPS enforcement."
    }
  ],
  "interviewAnswer": "Helmet is an essential security middleware for Express applications. Its 15+ security headers protect against a wide range of web vulnerabilities. Use default configuration for most apps, customize CSP for third-party resources.",
  "interviewQuestions": [
    {
      "question": "What is Helmet?",
      "answer": "Helmet is a collection of Express middleware functions that set security-related HTTP headers. It helps protect against common web vulnerabilities by configuring headers like Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, and X-Content-Type-Options."
    },
    {
      "question": "What headers does Helmet set?",
      "answer": "Content-Security-Policy, Cross-Origin-Embedder-Policy, Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy, Expect-CT, Origin-Agent-Cluster, Referrer-Policy, Strict-Transport-Security, X-Content-Type-Options, X-DNS-Prefetch-Control, X-Download-Options, X-Frame-Options, X-Permitted-Cross-Domain-Policies, X-Powered-By (removes), X-XSS-Protection."
    },
    {
      "question": "What is Content-Security-Policy?",
      "answer": "CSP is a header that controls which resources (scripts, styles, images, fonts) the browser is allowed to load. It prevents XSS attacks by restricting inline scripts and external resource origins. Configured via directives like default-src, script-src, style-src."
    },
    {
      "question": "How do you use Helmet with custom CSP?",
      "answer": "helmet({ contentSecurityPolicy: { directives: { defaultSrc: [\"\\'self\\'\"], scriptSrc: [\"\\'self\\'\", \"https://cdn.example.com\"], imgSrc: [\"\\'self\\'\", \"data:\"] } } }). Avoid \\'unsafe-inline\\' where possible."
    },
    {
      "question": "How do you test CSP without breaking your site?",
      "answer": "Use reportOnly mode: helmet({ contentSecurityPolicy: { useDefaults: true, reportOnly: true } }). This sends violations as reports (CSP-Report-Only header) instead of blocking. Check browser console for violation reports, then adjust policy."
    },
    {
      "question": "What is X-Frame-Options?",
      "answer": "X-Frame-Options prevents clickjacking by controlling whether your site can be embedded in iframes. Options: DENY (no embedding), SAMEORIGIN (only same site), ALLOW-FROM uri (deprecated). Helmet defaults to SAMEORIGIN."
    },
    {
      "question": "What is HSTS and how does Helmet configure it?",
      "answer": "HTTP Strict-Transport-Security tells browsers to always use HTTPS. helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }). Once set, browsers will refuse HTTP connections to your domain."
    },
    {
      "question": "Can you disable specific Helmet headers?",
      "answer": "Yes, pass false to the specific middleware: helmet({ frameguard: false, hsts: false }). Useful when a header conflicts with your hosting platform or specific requirements."
    },
    {
      "question": "How does Helmet remove X-Powered-By?",
      "answer": "Helmet removes the X-Powered-By: Express header by default. This prevents attackers from knowing your server technology. It is a simple but effective security measure against targeted exploitation."
    },
    {
      "question": "What is Permissions-Policy (formerly Feature-Policy)?",
      "answer": "Permissions-Policy controls which browser features your site can use: camera, microphone, geolocation, notifications, payment. Helmet sets restrictive defaults. Configure: helmet.permissionsPolicy({ features: { camera: [\"\\'self\\'\"], geolocation: [] } })."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Helmet</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Request</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Incoming</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Helmet</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Security Headers</text><rect x=\"190\" y=\"90\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"260\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">CSP</text><text x=\"260\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Content-Security-Policy</text><rect x=\"190\" y=\"140\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"260\" y=\"156\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">HSTS</text><text x=\"260\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Strict-Transport-Security</text><line x1=\"330\" y1=\"60\" x2=\"360\" y2=\"60\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"108\" x2=\"360\" y2=\"108\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"330\" y1=\"158\" x2=\"360\" y2=\"158\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"370\" y=\"40\" width=\"100\" height=\"150\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"420\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Response</text><text x=\"420\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Secured</text><text x=\"240\" y=\"220\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Helmet: Security headers middleware protecting against XSS, clickjacking, and other web vulnerabilities.</text></svg>",
  "codeExamples": [
    {
      "title": "Default Helmet Usage",
      "useCase": "Apply all security headers with defaults.",
      "code": "const helmet = require('helmet');\napp.use(helmet()); // Apply all default security headers",
      "description": "One line adds 15+ security headers with sensible defaults. Place early in middleware chain."
    },
    {
      "title": "Custom CSP Configuration",
      "useCase": "Allow specific external sources.",
      "code": "app.use(helmet({\n  contentSecurityPolicy: {\n    directives: {\n      defaultSrc: [\"'self'\"],\n      scriptSrc: [\"'self'\", \"'unsafe-inline'\", 'cdn.example.com'],\n      styleSrc: [\"'self'\", \"'unsafe-inline'\"],\n      imgSrc: [\"'self'\", 'data:', '*.cloudfront.net'],\n      connectSrc: [\"'self'\", 'api.example.com'],\n      fontSrc: [\"'self'\", 'fonts.googleapis.com'],\n      objectSrc: [\"'none'\"],\n      upgradeInsecureRequests: []\n    }\n  }\n}));",
      "description": "Custom Content-Security-Policy directives controlling resources from specific domains."
    },
    {
      "title": "HSTS with Preload",
      "useCase": "Enforce HTTPS with preload.",
      "code": "app.use(helmet({\n  hsts: {\n    maxAge: 31536000, // 1 year in seconds\n    includeSubDomains: true,\n    preload: true\n  }\n}));",
      "description": "Tells browsers to always use HTTPS for one year, including subdomains. Preload for browser preload lists."
    },
    {
      "title": "Disabling Specific Headers",
      "useCase": "Remove headers that conflict.",
      "code": "app.use(helmet({\n  frameguard: false, // Allow embedding in iframes\n  hsts: false,      // HTTPS handled by hosting platform\n  crossOriginEmbedderPolicy: false, // Allow cross-origin resources\n}));",
      "description": "Disable specific headers when they conflict with your hosting provider or application requirements."
    },
    {
      "title": "CSP Report Only",
      "useCase": "Test CSP without blocking.",
      "code": "app.use(helmet({\n  contentSecurityPolicy: {\n    useDefaults: true,\n    reportOnly: true,\n    directives: {\n      reportUri: '/csp-violation-report'\n    }\n  }\n}));",
      "description": "Report-Only mode sends violation reports without blocking resources. Check browser console for violations."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What class of vulnerabilities does Helmet primarily protect against?",
      "options": [
        "SQL injection",
        "XSS and clickjacking",
        "DDoS attacks",
        "CSRF"
      ],
      "answer": 1,
      "explanation": "Helmet protects against XSS, clickjacking, MIME sniffing, and other browser-based attacks via security headers."
    },
    {
      "question": "What CSP directive controls script sources?",
      "options": [
        "style-src",
        "script-src",
        "img-src",
        "connect-src"
      ],
      "answer": 1,
      "explanation": "script-src directive controls which scripts the browser is allowed to execute."
    },
    {
      "question": "What header prevents clickjacking?",
      "options": [
        "CSP",
        "X-Frame-Options",
        "HSTS",
        "X-Content-Type-Options"
      ],
      "answer": 1,
      "explanation": "X-Frame-Options prevents your site from being embedded in iframes on other sites."
    },
    {
      "question": "What does Helmet do with X-Powered-By?",
      "options": [
        "Sets it to Express",
        "Removes it",
        "Encrypts it",
        "Leaves it"
      ],
      "answer": 1,
      "explanation": "Helmet removes the X-Powered-By: Express header to hide server technology."
    },
    {
      "question": "How many seconds is 1 year for HSTS maxAge?",
      "options": [
        "86400",
        "31536000",
        "2592000",
        "604800"
      ],
      "answer": 1,
      "explanation": "31536000 seconds = 1 year, the recommended maxAge for HSTS in production."
    },
    {
      "question": "What mode allows testing CSP without blocking resources?",
      "options": [
        "Report-Only",
        "Test mode",
        "Debug mode",
        "Preview mode"
      ],
      "answer": 0,
      "explanation": "CSP Report-Only mode sends violation reports without blocking, useful for testing."
    }
  ]
};

TOPICS_DATA["express"]["express-cors"] = {
  "id": "express-cors",
  "title": "CORS",
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "tldr": [
    "CORS (Cross-Origin Resource Sharing) is a security mechanism that controls which origins, methods, and headers are allowed when browsers make cross-origin requests.",
    "Express CORS middleware (cors package) configures Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, and Access-Control-Allow-Credentials headers.",
    "CORS errors occur when a frontend from one origin (e.g., http://localhost:3000) tries to access an API from a different origin (e.g., http://localhost:5000) without proper headers.",
    "Configuration: specific origin for production, wildcard (*) for public APIs, credentials support for cookies/authorization headers, and preflight (OPTIONS) handling."
  ],
  "laymanDefinition": "CORS is like a guest list for a party. The server (bouncer) checks the browser's ID (origin) against the allowed list. If the origin is not on the list, the browser refuses to share any data from the server.",
  "deepDive": [
    {
      "heading": "Same-Origin vs Cross-Origin",
      "text": "Same-origin: same protocol (https), host (example.com), port (443). Different port, host, or protocol = cross-origin. Browsers block cross-origin requests by default for security (prevents one site from reading another site\\'s data). CORS selectively relaxes these restrictions."
    },
    {
      "heading": "Simple vs Preflight Requests",
      "text": "Simple requests: GET, HEAD, POST with content types text/plain, multipart/form-data, application/x-www-form-urlencoded. No custom headers. Preflight requests: all other requests send an OPTIONS preflight to check permissions before the actual request. CORS middleware handles both."
    },
    {
      "heading": "CORS Headers",
      "text": "Access-Control-Allow-Origin (allowed origins), Access-Control-Allow-Methods (GET, POST, PUT, DELETE, etc.), Access-Control-Allow-Headers (custom headers like Authorization, Content-Type), Access-Control-Allow-Credentials (cookies/auth), Access-Control-Max-Age (cache preflight), Access-Control-Expose-Headers (client-accessible response headers)."
    },
    {
      "heading": "Credentials and Cookies",
      "text": "For cross-origin cookies and auth: set credentials: true in CORS config and withCredentials: true in fetch/axios. Access-Control-Allow-Origin must be a specific origin (not *) when using credentials. Cookies must have SameSite=None and Secure."
    },
    {
      "heading": "CORS for Production",
      "text": "Use specific origins (not *) for production. Use environment variables: const allowedOrigins = process.env.CORS_ORIGIN?.split(\\',\\') || [\\'http://localhost:3000\\']. Set multi-origin whitelist for staging/ prod. Handle OPTIONS preflight correctly."
    }
  ],
  "interviewAnswer": "CORS is a browser security mechanism that Express apps must configure correctly to serve frontend clients. Use specific origins in production, enable credentials when needed, and understand the simple vs preflight distinction.",
  "interviewQuestions": [
    {
      "question": "What is CORS and why is it needed?",
      "answer": "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls cross-origin HTTP requests. It is needed because browsers block cross-origin requests by default (Same-Origin Policy). CORS headers tell the browser which origins are allowed to access resources."
    },
    {
      "question": "How does express CORS middleware work?",
      "answer": "The cors npm package intercepts responses and adds appropriate Access-Control-* headers. It handles simple requests (headers added to response) and preflight requests (responds to OPTIONS with allowed methods/headers). Configure via options object or per-route."
    },
    {
      "question": "What is a preflight request?",
      "answer": "A preflight request is an OPTIONS request sent by the browser before the actual cross-origin request. It asks the server which methods, headers, and origins are allowed. The server responds with CORS headers. The actual request is sent only if the preflight succeeds."
    },
    {
      "question": "What are common CORS configuration options?",
      "answer": "origin (allowed origins, or function for dynamic check), methods (allowed HTTP methods: GET, POST, PUT, DELETE, etc.), allowedHeaders (custom headers: Content-Type, Authorization), credentials (enable cookies/auth), maxAge (seconds to cache preflight)."
    },
    {
      "question": "How do you enable credentials with CORS?",
      "answer": "Set credentials: true in cors options and withCredentials: true in client fetch. Access-Control-Allow-Origin must be a specific origin (not *). Cookies must have SameSite=None and Secure. Only needed for authenticated cross-origin requests."
    },
    {
      "question": "How do you allow multiple origins?",
      "answer": "Use a function: origin: function(origin, callback) { const allowed = [\\'https://site1.com\\', \\'https://site2.com\\']; if (!origin || allowed.includes(origin)) callback(null, true); else callback(new Error(\\'Not allowed by CORS\\')); }."
    },
    {
      "question": "What is the difference between * and specific origins?",
      "answer": "* allows any origin (public APIs). Specific origins restrict access to listed domains. Specific origins are required for credentials: true. Production APIs typically use specific origins. Development often uses * or environment-based configuration."
    },
    {
      "question": "How do you handle CORS with Express subdomain APIs?",
      "answer": "Use dynamic origin check: origin: (origin, cb) => { const host = new URL(origin).hostname; cb(null, host.endsWith(\\'.example.com\\') || ALLOWED.includes(origin)); }. Allows subdomains and specific origins."
    },
    {
      "question": "How do you test CORS configuration?",
      "answer": "Use curl to check headers: curl -H \"Origin: http://example.com\" -I http://localhost:3000/api. Check for Access-Control-Allow-Origin in response. Browser dev tools network tab shows CORS errors. Use online CORS testers or options endpoint check."
    },
    {
      "question": "How does CORS relate to security?",
      "answer": "CORS is NOT authentication. It only controls which origins can read responses. Any origin can still send requests (POST data). Authentication and authorization are separate. CORS with credentials exposes cookies to allowed origins only."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">CORS</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Browser</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">http://localhost:3000</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Preflight</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">OPTIONS</text><line x1=\"190\" y1=\"75\" x2=\"190\" y2=\"95\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"95\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"260\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Actual Request</text><text x=\"260\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">GET /api</text><line x1=\"330\" y1=\"113\" x2=\"360\" y2=\"113\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"370\" y=\"70\" width=\"100\" height=\"50\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"420\" y=\"86\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">CORS Config</text><text x=\"420\" y=\"98\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Access-Control-*</text><line x1=\"370\" y1=\"50\" x2=\"370\" y2=\"40\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"160\" width=\"140\" height=\"25\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"80\" y=\"176\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Response</text><text x=\"80\" y=\"188\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Headers Set</text><text x=\"240\" y=\"200\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">CORS: Browser sends Origin, server responds with Access-Control-Allow-Origin headers.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic CORS for All Origins",
      "useCase": "Simple configuration for public APIs.",
      "code": "const cors = require('cors');\napp.use(cors()); // Allow all origins (public API)",
      "description": "Enables CORS for all origins with default settings. Suitable for public APIs."
    },
    {
      "title": "Specific Origin with Options",
      "useCase": "Restrict to specific frontend.",
      "code": "const corsOptions = {\n  origin: 'https://myapp.example.com',\n  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true,\n  maxAge: 3600\n};\napp.use(cors(corsOptions));",
      "description": "Restricts to specific origin, allows standard methods and auth headers, enables credentials."
    },
    {
      "title": "Dynamic Origin Function",
      "useCase": "Allow multiple origins with fallback.",
      "code": "const allowed = ['https://app.example.com', 'https://staging.example.com'];\napp.use(cors({\n  origin: (origin, cb) => {\n    if (!origin || allowed.includes(origin)) return cb(null, true);\n    cb(new Error('Not allowed by CORS'));\n  },\n  credentials: true\n}));",
      "description": "Dynamic origin check allows multiple specific origins. No origin check for same-origin or non-browser requests."
    },
    {
      "title": "Per-Route CORS",
      "useCase": "Different CORS for different routes.",
      "code": "const cors = require('cors');\n\napp.get('/public', cors(), publicHandler);\napp.get('/api/users', cors({ origin: 'https://dashboard.example.com' }), usersHandler);\napp.options('/api/users', cors()); // Handle preflight",
      "description": "Public endpoints use open CORS, sensitive endpoints use restricted CORS."
    },
    {
      "title": "CORS with Auth and Cookies",
      "useCase": "Enabling cross-origin credentials.",
      "code": "app.use(cors({\n  origin: 'https://myapp.example.com',\n  credentials: true\n}));\n\n// Client-side (fetch):\nfetch('https://api.example.com/user', {\n  credentials: 'include'\n});",
      "description": "Enables cookies and auth headers cross-origin. Origin must be specific (not *). Client must set credentials: include."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What header does CORS add to specify allowed origins?",
      "options": [
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials"
      ],
      "answer": 1,
      "explanation": "Access-Control-Allow-Origin specifies which origins can access the resource."
    },
    {
      "question": "What HTTP method is used for preflight requests?",
      "options": [
        "GET",
        "POST",
        "OPTIONS",
        "HEAD"
      ],
      "answer": 2,
      "explanation": "Preflight requests use the OPTIONS method to check permissions before the actual request."
    },
    {
      "question": "What is required when using credentials: true?",
      "options": [
        "Wildcard origin (*)",
        "Specific origin (not *)",
        "No origin header",
        "Any origin"
      ],
      "answer": 1,
      "explanation": "When credentials are enabled, a specific origin must be specified (not wildcard)."
    },
    {
      "question": "What npm package enables CORS in Express?",
      "options": [
        "helmet",
        "cors",
        "express-cors",
        "cors-handler"
      ],
      "answer": 1,
      "explanation": "The cors package provides Express middleware for configuring CORS headers."
    },
    {
      "question": "What is a simple CORS request?",
      "options": [
        "Any request with custom headers",
        "GET, HEAD, POST with standard content types",
        "PUT requests",
        "DELETE requests"
      ],
      "answer": 1,
      "explanation": "Simple requests are GET, HEAD, POST with standard content types and no custom headers."
    },
    {
      "question": "What does maxAge control?",
      "options": [
        "Cookie expiry",
        "How long preflight is cached",
        "Request timeout",
        "Session duration"
      ],
      "answer": 1,
      "explanation": "maxAge specifies how many seconds the browser can cache the preflight response."
    }
  ]
};

TOPICS_DATA["express"]["express-cookie-parser"] = {
  "id": "express-cookie-parser",
  "title": "Cookie Parser",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "Cookie parser middleware parses the Cookie header from incoming requests and populates req.cookies with an object keyed by cookie names.",
    "Supports signed cookies for integrity verification, preventing tampering by using a secret key to sign cookie values.",
    "Res.cookie() sets cookies on responses with options like maxAge, httpOnly, secure, sameSite, path, domain, and signed.",
    "Cookie options: httpOnly (not accessible via JS), secure (HTTPS only), sameSite (CSRF protection: strict, lax, none), maxAge/expires (lifetime)."
  ],
  "laymanDefinition": "Cookie parser is like a mail sorter that opens all envelopes (cookies) from a package (request) and organizes them by sender name (cookie name) into separate piles (req.cookies object).",
  "deepDive": [
    {
      "heading": "Parsing Unsigned Cookies",
      "text": "cookie-parser reads the Cookie header from requests and parses it into req.cookies. Example: Cookie: name=John; token=abc -> req.cookies = { name: \\'John\\', token: \\'abc\\' }. Supports JSON cookies. Handles URL encoding/decoding automatically."
    },
    {
      "heading": "Signed Cookies",
      "text": "Signed cookies use a secret key to create a signature: s:value.signature. cookie-parser verifies the signature and populates req.signedCookies. If signature is invalid, the cookie is rejected. Useful for session IDs, auth tokens stored in cookies."
    },
    {
      "heading": "Setting Cookies with res.cookie()",
      "text": "Express provides res.cookie(name, value, options) for setting cookies. Options: maxAge (ms), httpOnly (prevent JS access), secure (HTTPS only), sameSite (CSRF protection), path (URL scope), domain (domain scope), signed (sign the cookie). Multiple cookies can be set sequentially."
    },
    {
      "heading": "Cookie Options and Security",
      "text": "httpOnly: prevents XSS from reading cookies. secure: ensures cookies only sent over HTTPS in production. sameSite: strict (same-site only), lax (same-site + top-level GET), none (cross-site, requires secure). maxAge vs expires: maxAge is relative (ms), expires is absolute date."
    },
    {
      "heading": "Clearing and Deleting Cookies",
      "text": "res.clearCookie(name, options) removes a cookie. Must match the original path and domain options. Cookie is expired by setting maxAge: 0 or past date. Browser removes expired cookies. Always clear cookies on logout to prevent stale sessions."
    }
  ],
  "interviewAnswer": "Cookie parser middleware makes working with cookies simple. Parse incoming cookies, set outgoing cookies with security options, and use signed cookies for sensitive data that must not be tampered with.",
  "interviewQuestions": [
    {
      "question": "What does cookie-parser do?",
      "answer": "It parses the Cookie header from HTTP requests and populates req.cookies with an object. For signed cookies, it populates req.signedCookies after verifying the signature."
    },
    {
      "question": "What is the difference between req.cookies and req.signedCookies?",
      "answer": "req.cookies contains unsigned cookies (plain text). req.signedCookies contains cookies that were signed with the secret key. If a signed cookie was tampered with, it is excluded from req.signedCookies."
    },
    {
      "question": "How do you sign a cookie in Express?",
      "answer": "Set the signed option: res.cookie(\\'token\\', \\'myvalue\\', { signed: true }). cookie-parser will sign it using the secret provided during initialization: app.use(cookieParser(\\'mySecret\\'))."
    },
    {
      "question": "What are important cookie security options?",
      "answer": "httpOnly (prevents XSS reading), secure (HTTPS only), sameSite (CSRF prevention: strict, lax, none), maxAge/expires (lifetime), signed (tamper detection), path and domain (scope restriction)."
    },
    {
      "question": "What is the SameSite cookie attribute?",
      "answer": "SameSite controls when cookies are sent in cross-site requests. Strict: only same-site. Lax: same-site + top-level GET navigations. None: always (requires Secure). Lax is the modern default. None enables cross-site auth with OAuth widgets."
    },
    {
      "question": "How do you remove a cookie?",
      "answer": "res.clearCookie(\\'name\\', { path: \\'/\\' }). This sets the cookie with an expired date, causing the browser to remove it. Must match the original cookie\\'s path and domain options."
    },
    {
      "question": "How do you set a cookie\\'s expiration?",
      "answer": "Use maxAge (milliseconds from now) or expires (Date object). res.cookie(\\'session\\', \\'abc\\', { maxAge: 3600000 }) expires in 1 hour. res.cookie(\\'coupon\\', \\'SAVE20\\', { expires: new Date(\\'2025-12-31\\') })."
    },
    {
      "question": "What happens if cookie parsing fails?",
      "answer": "cookie-parser silently fails and returns an empty object for req.cookies. Invalid cookies are ignored. This prevents malformed cookies from crashing the application."
    },
    {
      "question": "How do you handle JSON cookies?",
      "answer": "cookie-parser automatically parses JSON cookie values if they start with j:. Example: \\'j:{\"name\":\"John\"}\\' becomes the parsed object. This is useful for complex cookie values."
    },
    {
      "question": "Can cookies be too large?",
      "answer": "Yes, browsers limit cookie size to ~4KB per cookie and ~50-100 cookies per domain. Store session IDs (small) in cookies, not large objects. Use server-side sessions for large data, with just the session ID in the cookie."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Cookie Parser</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Request</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Cookie: token=abc</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">cookie-parser</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Parse cookies</text><line x1=\"190\" y1=\"75\" x2=\"190\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"95\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"75\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">req.cookies</text><text x=\"75\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Unsigned</text><rect x=\"170\" y=\"95\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"235\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">req.signedCookies</text><text x=\"235\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Verified</text><line x1=\"300\" y1=\"113\" x2=\"340\" y2=\"113\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"350\" y=\"70\" width=\"120\" height=\"50\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"410\" y=\"86\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route Handler</text><text x=\"410\" y=\"98\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Use cookies</text><text x=\"240\" y=\"180\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Cookie Parser: Parse Cookie header into req.cookies and req.signedCookies.</text></svg>",
  "codeExamples": [
    {
      "title": "Basic cookie-parser Setup",
      "useCase": "Parsing cookies from requests.",
      "code": "const cookieParser = require('cookie-parser');\napp.use(cookieParser());\n\napp.get('/', (req, res) => {\n  console.log(req.cookies); // { name: 'John' }\n  res.send('Check console');\n});",
      "description": "Initializes cookie-parser without secret (unsigned cookies only). req.cookies contains all parsed cookies."
    },
    {
      "title": "Signed Cookies",
      "useCase": "Using signed cookies for integrity.",
      "code": "app.use(cookieParser('my_secret_key'));\n\napp.get('/set', (req, res) => {\n  res.cookie('session', 'abc123', { signed: true, httpOnly: true });\n  res.send('Cookie set');\n});\n\napp.get('/read', (req, res) => {\n  console.log(req.signedCookies); // { session: 'abc123' }\n  res.json(req.signedCookies);\n});",
      "description": "Sets a signed cookie with httpOnly. Signed cookies verified with secret. Tampered cookies excluded from req.signedCookies."
    },
    {
      "title": "Cookie Options",
      "useCase": "Setting secure and sameSite options.",
      "code": "app.get('/set', (req, res) => {\n  res.cookie('preferences', JSON.stringify({ theme: 'dark', lang: 'en' }), {\n    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production',\n    sameSite: 'lax',\n    path: '/'\n  });\n  res.send('Preferences saved');\n});",
      "description": "Sets a JSON cookie with maxAge, httpOnly, secure (production only), sameSite lax, and root path."
    },
    {
      "title": "Clearing Cookies",
      "useCase": "Removing cookies on logout.",
      "code": "app.post('/logout', (req, res) => {\n  res.clearCookie('session', { path: '/' });\n  res.clearCookie('preferences', { path: '/' });\n  res.json({ message: 'Logged out' });\n});",
      "description": "Clears cookies by expiring them. Must match original path option. Multiple cookies can be cleared."
    },
    {
      "title": "Reading Multiple Cookies",
      "useCase": "Accessing all cookie values.",
      "code": "app.get('/dashboard', (req, res) => {\n  const { session, preferences } = req.signedCookies;\n  const theme = preferences ? JSON.parse(preferences).theme : 'light';\n  if (!session) return res.status(401).send('Not authenticated');\n  res.render('dashboard', { theme });\n});",
      "description": "Reads signed session cookie for auth and signed preferences cookie for user settings."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What does cookie-parser populate on the request object?",
      "options": [
        "req.cookies",
        "req.session",
        "req.body",
        "req.query"
      ],
      "answer": 0,
      "explanation": "cookie-parser populates req.cookies with parsed cookie key-value pairs."
    },
    {
      "question": "How does cookie-parser handle signed cookies?",
      "options": [
        "Decrypts them",
        "Verifies signature with secret",
        "Ignores them",
        "Parses as JSON"
      ],
      "answer": 1,
      "explanation": "cookie-parser verifies the signature using the secret key provided during initialization."
    },
    {
      "question": "What cookie option prevents JavaScript from accessing it?",
      "options": [
        "secure",
        "httpOnly",
        "sameSite",
        "maxAge"
      ],
      "answer": 1,
      "explanation": "httpOnly prevents client-side JavaScript from accessing the cookie via document.cookie."
    },
    {
      "question": "What method removes a cookie?",
      "options": [
        "res.deleteCookie()",
        "res.clearCookie()",
        "res.removeCookie()",
        "res.expireCookie()"
      ],
      "answer": 1,
      "explanation": "res.clearCookie() removes a cookie by setting it with an expired date."
    },
    {
      "question": "What does sameSite: \\'lax\\' allow?",
      "options": [
        "All cross-site requests",
        "Same-site + top-level GET navigations",
        "Only same-site requests",
        "All same-origin requests"
      ],
      "answer": 1,
      "explanation": "Lax mode sends cookies for same-site requests and top-level GET navigations."
    },
    {
      "question": "How do you pass a secret to cookie-parser?",
      "options": [
        "As argument to cookieParser()",
        "In env variable",
        "In config.json",
        "In app.set()"
      ],
      "answer": 0,
      "explanation": "Pass the secret as an argument: app.use(cookieParser(\\'secret\\'))."
    }
  ]
};

TOPICS_DATA["express"]["express-morgan"] = {
  "id": "express-morgan",
  "title": "Morgan",
  "difficulty": "beginner",
  "estimatedMinutes": 15,
  "tldr": [
    "Morgan is an HTTP request logger middleware for Express that automatically logs incoming requests with configurable formats and output streams.",
    "Built-in formats: combined (Apache standard), common (Apache common), dev (colorful for development), short, tiny.",
    "Morgan can log to console, file streams, or custom transports, making it useful for both development debugging and production logging with log rotation.",
    "Custom tokens can be defined to log additional data like response time, user ID, or custom headers."
  ],
  "laymanDefinition": "Morgan is like a security camera that records every visitor to your website. It automatically logs who came (IP), what they wanted (URL), how it was handled (status code), and how long they stayed (response time).",
  "deepDive": [
    {
      "heading": "Built-in Log Formats",
      "text": "combined: :remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\". dev: :method :url :status :response-time ms - colored by status. short: :remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms. tiny: :method :url :status :res[content-length] - :response-time ms."
    },
    {
      "heading": "Stream Configuration",
      "text": "Morgan writes to stdout by default. Write to a file: app.use(morgan(\\'combined\\', { stream: fs.createWriteStream(\\'access.log\\', { flags: \\'a\\' }) })). Use rotating-file-stream for log rotation. Combine with winston for structured logging to multiple transports."
    },
    {
      "heading": "Custom Tokens",
      "text": "Define custom tokens: morgan.token(\\'user\\', (req, res) => req.user?.id || \\'anonymous\\'). Use in format string: \\':method :url :user\\'. Useful for logging authenticated user IDs, custom headers, or response data."
    },
    {
      "heading": "Conditional Logging",
      "text": "Skip logging for specific routes: morgan(\\'combined\\', { skip: (req, res) => req.url.startsWith(\\'/health\\') || res.statusCode < 400 }). Skip function receives req and res. Log all requests in dev, skip health checks in production."
    },
    {
      "heading": "Advanced Logging Patterns",
      "text": "Use multiple morgan instances: one for dev console (tiny format), one for combined file logs. Use different formats per environment. Combine with winston for production logging with log levels, JSON format, and log rotation. Log slow requests separately for performance monitoring."
    }
  ],
  "interviewAnswer": "Morgan provides simple, effective HTTP logging for Express applications. Its built-in formats cover common needs, while custom tokens and streams enable advanced logging tailored to specific requirements.",
  "interviewQuestions": [
    {
      "question": "What is Morgan?",
      "answer": "Morgan is HTTP request logger middleware for Express. It automatically logs details about incoming requests including method, URL, status code, response time, and other metadata using configurable format strings."
    },
    {
      "question": "What are the built-in Morgan formats?",
      "answer": "combined (Apache combined log), common (Apache common), dev (color-coded for development), short, and tiny. Each format provides different levels of detail. combined is most verbose; tiny is most concise."
    },
    {
      "question": "How do you log to a file with Morgan?",
      "answer": "Use the stream option: app.use(morgan(\\'combined\\', { stream: fs.createWriteStream(\\'access.log\\', { flags: \\'a\\' }) })). Use rotating-file-stream package for automatic log rotation based on date or size."
    },
    {
      "question": "How do you create custom Morgan tokens?",
      "answer": "morgan.token(\\'customName\\', (req, res) => req.customData). Then use \\':customName\\' in the format string. Useful for logging user IDs, custom headers, session data, or business-specific information."
    },
    {
      "question": "How do you skip logging for specific routes?",
      "answer": "Use the skip option: morgan(\\'tiny\\', { skip: (req, res) => req.path.startsWith(\\'/health\\') }). Skip function returns true to skip logging. Commonly used for health checks, static files, and successful responses."
    },
    {
      "question": "What is the difference between combined and dev formats?",
      "answer": "combined is the Apache standard with full details: IP, user, date, method, URL, status, size, referrer, user-agent. dev is compact with color coding: method (colored), URL, status (colored by range), response time. dev is for development, combined for production."
    },
    {
      "question": "How do you use Morgan with Winston for structured logging?",
      "answer": "Create a writable stream that writes to Winston: const stream = { write: (msg) => logger.info(msg.trim()) }; app.use(morgan(\\'combined\\', { stream })). Morgan provides the raw log string, Winston provides structured logging with levels and transports."
    },
    {
      "question": "How do you log response time in milliseconds?",
      "answer": "The :response-time token logs the time between request and response in ms. It is included in tiny and dev formats. Custom formats: \\':method :url :status :response-time ms\\'."
    },
    {
      "question": "How do you use multiple Morgan instances?",
      "answer": "app.use(morgan(\\'dev\\')); app.use(morgan(\\'combined\\', { stream: writeStream })); The first logs to console in dev format, the second logs to file in combined format. Multiple instances run independently."
    },
    {
      "question": "How do you customize the date format in Morgan?",
      "answer": "Use :date[format] token: :date[web] (Web format), :date[clf] (Apache common log format), :date[iso] (ISO8601). Custom format: morgan.token(\\'date\\', () => new Date().toISOString())."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">Morgan</text><rect x=\"10\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"80\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Incoming</text><text x=\"80\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Request</text><line x1=\"150\" y1=\"58\" x2=\"180\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"190\" y=\"40\" width=\"140\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"260\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Morgan</text><text x=\"260\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Logger</text><line x1=\"190\" y1=\"75\" x2=\"190\" y2=\"93\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"10\" y=\"95\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"75\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Console</text><text x=\"75\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">:dev format</text><rect x=\"170\" y=\"95\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"235\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Log File</text><text x=\"235\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">:combined format</text><rect x=\"350\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#e83e8c\" stroke=\"#e83e8c\" stroke-width=\"1\"/><text x=\"410\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Route</text><text x=\"410\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Handler</text><text x=\"240\" y=\"170\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">Morgan: HTTP request logger with configurable formats and output streams.</text></svg>",
  "codeExamples": [
    {
      "title": "Development Logging",
      "useCase": "Color-coded logs for development.",
      "code": "const morgan = require('morgan');\nif (process.env.NODE_ENV === 'development') {\n  app.use(morgan('dev'));\n}",
      "description": "Enables color-coded concise logging only in development environment."
    },
    {
      "title": "Production File Logging",
      "useCase": "Apache combined format to file.",
      "code": "const fs = require('fs');\nconst path = require('path');\n\nconst accessStream = fs.createWriteStream(\n  path.join(__dirname, 'access.log'),\n  { flags: 'a' }\n);\napp.use(morgan('combined', { stream: accessStream }));",
      "description": "Logs in Apache combined format to a log file. Flag \\'a\\' appends to existing file."
    },
    {
      "title": "Custom Token for User ID",
      "useCase": "Log authenticated user info.",
      "code": "morgan.token('user', (req, res) => req.user?.id || 'anonymous');\nmorgan.token('role', (req, res) => req.user?.role || 'public');\n\napp.use(morgan(':method :url :status :user[role] - :response-time ms'));",
      "description": "Custom tokens log user ID and role from request. Falls back to anonymous/public for unauthenticated."
    },
    {
      "title": "Skip Health Checks",
      "useCase": "Exclude monitoring traffic.",
      "code": "app.use(morgan('combined', {\n  skip: (req, res) => {\n    return req.url === '/health' || req.url === '/ready';\n  }\n}));",
      "description": "Skips logging for health check and readiness probe endpoints."
    },
    {
      "title": "Multiple Log Streams",
      "useCase": "Console + file + error log.",
      "code": "const accessLog = fs.createWriteStream('access.log', { flags: 'a' });\nconst errorLog = fs.createWriteStream('error.log', { flags: 'a' });\n\napp.use(morgan('tiny', {\n  stream: {\n    write: (msg) => {\n      accessLog.write(msg);\n      if (msg.includes(' 4') || msg.includes(' 5')) errorLog.write(msg);\n    }\n  }\n}));",
      "description": "Custom stream writes all logs to access.log and error responses (4xx, 5xx) also to error.log."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What format provides color-coded development logs?",
      "options": [
        "combined",
        "common",
        "dev",
        "tiny"
      ],
      "answer": 2,
      "explanation": "The dev format provides color-coded output suitable for development."
    },
    {
      "question": "How do you log response time with Morgan?",
      "options": [
        ":response-time",
        ":duration",
        ":latency",
        ":elapsed"
      ],
      "answer": 0,
      "explanation": ":response-time logs the response time in milliseconds."
    },
    {
      "question": "What option controls where Morgan writes logs?",
      "options": [
        "output",
        "stream",
        "file",
        "target"
      ],
      "answer": 1,
      "explanation": "The stream option controls where Morgan writes its log output."
    },
    {
      "question": "What is the most verbose Morgan format?",
      "options": [
        "tiny",
        "short",
        "combined",
        "dev"
      ],
      "answer": 2,
      "explanation": "The combined format is the most verbose, following the Apache combined log format."
    },
    {
      "question": "How do you define a custom Morgan token?",
      "options": [
        "morgan.add()",
        "morgan.token()",
        "morgan.format()",
        "morgan.define()"
      ],
      "answer": 1,
      "explanation": "morgan.token() defines a custom token that can be used in format strings."
    },
    {
      "question": "What does the skip option accept?",
      "options": [
        "Boolean",
        "Function returning boolean",
        "String",
        "Array"
      ],
      "answer": 1,
      "explanation": "The skip option is a function (req, res) that returns true to skip logging."
    }
  ]
};

TOPICS_DATA["express"]["express-api-versioning"] = {
  "id": "express-api-versioning",
  "title": "API Versioning",
  "difficulty": "intermediate",
  "estimatedMinutes": 20,
  "tldr": [
    "API versioning allows your API to evolve and introduce breaking changes without disrupting existing clients. Multiple versions can coexist simultaneously.",
    "Common strategies: URL prefix (/api/v1/, /api/v2/), custom request header (Accept: application/vnd.myapp.v1+json), query parameter (?version=1), and subdomain (v1.api.example.com).",
    "Express supports versioning through multiple routers, conditional middleware, or dedicated versioned route files.",
    "Best practices: version from day one, deprecate with notice, maintain backward compatibility when possible, document changes between versions."
  ],
  "laymanDefinition": "API versioning is like having different editions of a textbook. The 2nd edition adds new chapters and corrections, but the 1st edition is still available for students who already started using it.",
  "deepDive": [
    {
      "heading": "URL Prefix Versioning",
      "text": "Most common approach: /api/v1/users, /api/v2/users. In Express, create separate routers for each version: const v1Router = require(\\'./routes/v1\\'); const v2Router = require(\\'./routes/v2\\'); app.use(\\'/api/v1\\', v1Router); app.use(\\'/api/v2\\', v2Router). Simple, explicit, cache-friendly."
    },
    {
      "heading": "Header-Based Versioning",
      "text": "Client specifies version via Accept header or custom header: Accept: application/vnd.myapp.v2+json. Middleware reads the header and routes to the appropriate handler. Keeps URLs clean. More complex to implement and test. Less visible to developers compared to URL versioning."
    },
    {
      "heading": "Query Parameter Versioning",
      "text": "Client includes version in query: /api/users?version=2. Middleware checks req.query.version and routes accordingly. Simple but pollutes URLs, caching can be problematic, and version becomes part of the cache key. Not recommended for public APIs."
    },
    {
      "heading": "Implementation Patterns",
      "text": "Pattern 1: Separate routers per version (recommended). Pattern 2: Version check middleware that selects handler. Pattern 3: Single router with versioned controllers. Pattern 1 is cleanest: version files are independent, easy to deprecate, and changes are isolated."
    },
    {
      "heading": "Version Deprecation Strategy",
      "text": "Communicate deprecation via response headers (Sunset, Deprecation). Maintain old versions for a defined period (6-12 months). Log client usage to understand adoption. Redirect old versions to documentation with migration guides. Eventually return 410 Gone for fully deprecated versions."
    }
  ],
  "interviewAnswer": "API versioning is essential for maintaining backward compatibility as your API evolves. URL prefix versioning with separate Express routers is the most practical approach. Plan deprecation with clear timelines and communication.",
  "interviewQuestions": [
    {
      "question": "Why is API versioning important?",
      "answer": "It allows you to make breaking changes to your API (new fields, removed endpoints, changed behavior) without disrupting existing clients. Clients can migrate at their own pace while the old version remains functional."
    },
    {
      "question": "What are the main API versioning strategies?",
      "answer": "URL prefix (/api/v1/), header-based (Accept header), query parameter (?version=1), and subdomain (v1.api.example.com). URL prefix is most common for Express APIs due to its simplicity and explicit visibility."
    },
    {
      "question": "How do you implement URL versioning in Express?",
      "answer": "Create separate router files for each version. Mount at version-specific prefixes: app.use(\\'/api/v1\\', v1Router); app.use(\\'/api/v2\\', v2Router). Each router is independent and can evolve separately."
    },
    {
      "question": "What is header-based versioning?",
      "answer": "The client specifies the desired version in an HTTP header (Accept: application/vnd.myapp.v2+json). Middleware parses the header and routes to the appropriate controller or version handler. URLs remain clean but the version is less discoverable."
    },
    {
      "question": "How do you deprecate an API version?",
      "answer": "Add Sunset and Deprecation headers to responses. Log deprecated version usage to identify clients. Maintain old version for a defined period (e.g., 6 months minimum). Provide clear migration guides. Announce deprecation timeline well in advance."
    },
    {
      "question": "What is the best Express pattern for versioning?",
      "answer": "Separate routers per version. Each version gets its own directory with routes, controllers, validators, and middleware. This isolates changes, makes deprecation easy (just remove the router), and allows different middleware per version."
    },
    {
      "question": "How do you handle shared logic across versions?",
      "answer": "Extract common logic into shared modules (utils/, middleware/, validators/). Import into version-specific routers. Avoid sharing controllers across versions as they tend to diverge. Use adapters to transform data between versions if needed."
    },
    {
      "question": "What headers indicate API deprecation?",
      "answer": "Deprecation: true (indicates the version is deprecated). Sunset: HTTP-date (when the version will be removed). Link: <https://docs.example.com/migration>; rel=\"deprecation\" (link to migration guide). These help clients prepare for removal."
    },
    {
      "question": "How do you handle default versioning for unversioned requests?",
      "answer": "Create a default router (e.g., /api) that redirects or serves the latest version. Or return a 300 Multiple Choices with available versions. Better to require explicit versioning from day one."
    },
    {
      "question": "What are the downsides of query parameter versioning?",
      "answer": "URL pollution (version clutters query string), caching issues (version must be part of cache key), less RESTful (version is not part of the resource identifier), and easier for clients to forget to include."
    }
  ],
  "diagramSvg": "<svg viewBox=\"0 0 500 200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\"><rect x=\"0\" y=\"0\" width=\"500\" height=\"200\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#dee2e6\" stroke-width=\"1\"/><text x=\"250\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">API Versioning</text><rect x=\"10\" y=\"40\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#68a063\" stroke=\"#68a063\" stroke-width=\"1\"/><text x=\"70\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/api/v1/users</text><text x=\"70\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Version 1 Router</text><rect x=\"10\" y=\"90\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#0070f3\" stroke=\"#0070f3\" stroke-width=\"1\"/><text x=\"70\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/api/v2/users</text><text x=\"70\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Version 2 Router</text><rect x=\"10\" y=\"140\" width=\"120\" height=\"35\" rx=\"4\" fill=\"#ffc107\" stroke=\"#ffc107\" stroke-width=\"1\"/><text x=\"70\" y=\"156\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">/api/v3/users</text><text x=\"70\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Version 3 Router</text><line x1=\"130\" y1=\"58\" x2=\"160\" y2=\"58\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"130\" y1=\"108\" x2=\"160\" y2=\"108\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><line x1=\"130\" y1=\"158\" x2=\"160\" y2=\"158\" stroke=\"#666\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/><rect x=\"170\" y=\"40\" width=\"140\" height=\"160\" rx=\"4\" fill=\"#28a745\" stroke=\"#28a745\" stroke-width=\"1\"/><text x=\"240\" y=\"56\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\">Express App</text><text x=\"240\" y=\"68\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ddd\">Mounts versioned routers independently</text><text x=\"240\" y=\"230\" font-size=\"9\" fill=\"#666\" text-anchor=\"middle\">API Versioning: URL-prefix versioning with independent Express routers per version.</text></svg>",
  "codeExamples": [
    {
      "title": "URL Prefix Versioning",
      "useCase": "Separate routers per version.",
      "code": "// routes/v1/users.js\nconst router = require('express').Router();\nrouter.get('/', v1Controller.list);\nrouter.post('/', v1Validation.create, v1Controller.create);\nmodule.exports = router;\n\n// app.js\napp.use('/api/v1', require('./routes/v1/users'));\napp.use('/api/v2', require('./routes/v2/users'));",
      "description": "Clean separation: v1 and v2 routes in dedicated files, mounted at different URL prefixes."
    },
    {
      "title": "Header-Based Versioning Middleware",
      "useCase": "Routing via Accept header.",
      "code": "const versionRouter = require('express').Router();\n\nversionRouter.all('*', (req, res, next) => {\n  const accept = req.headers['accept'] || '';\n  if (accept.includes('vnd.myapp.v2')) {\n    req.version = 2;\n  } else {\n    req.version = 1;\n  }\n  next();\n});\n\napp.use('/api', versionRouter);",
      "description": "Parses Accept header to set req.version. Controllers use req.version to branch behavior."
    },
    {
      "title": "Versioned Response Transformation",
      "useCase": "Return different data per version.",
      "code": "function userResponse(user, version) {\n  const base = { id: user.id, name: user.name };\n  if (version >= 2) {\n    return { ...base, email: user.email, role: user.role };\n  }\n  return base;\n}\n\nrouter.get('/:id', (req, res) => {\n  const user = users[req.params.id];\n  res.json(userResponse(user, req.version || 1));\n});",
      "description": "Response shape changes based on version. v1 returns minimal fields, v2 adds email and role."
    },
    {
      "title": "Deprecation Headers Middleware",
      "useCase": "Notifying clients of deprecation.",
      "code": "function deprecated(version, sunsetDate) {\n  return (req, res, next) => {\n    if (req.path.startsWith(`/api/v${version}`)) {\n      res.set('Deprecation', 'true');\n      res.set('Sunset', new Date(sunsetDate).toUTCString());\n      res.set('Link', '<https://docs.example.com/migration>; rel=\"deprecation\"');\n    }\n    next();\n  };\n}\napp.use(deprecated(1, '2025-06-01'));",
      "description": "Adds deprecation headers to all v1 responses, informing clients about sunset date and migration guide."
    },
    {
      "title": "Shared Logic Across Versions",
      "useCase": "Reusable validation and middleware.",
      "code": "// shared/validators.js\nfunction validateEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n\n// routes/v1/users.js\nconst { validateEmail } = require('../shared/validators');\n\n// routes/v2/users.js\nconst { validateEmail } = require('../shared/validators');",
      "description": "Shared modules are imported by all version routers. Common logic stays in one place without duplication."
    }
  ],
  "mcqQuestions": [
    {
      "question": "What is the most common API versioning strategy for Express?",
      "options": [
        "Header-based",
        "URL prefix",
        "Query parameter",
        "Subdomain"
      ],
      "answer": 1,
      "explanation": "URL prefix versioning (/api/v1/, /api/v2/) is the most common approach for Express APIs."
    },
    {
      "question": "How should shared logic be handled across versions?",
      "options": [
        "Duplicated per version",
        "Extracted to shared modules",
        "In the main app.js",
        "In environment config"
      ],
      "answer": 1,
      "explanation": "Shared logic should be extracted to shared modules and imported by each version router."
    },
    {
      "question": "What header indicates an API version is deprecated?",
      "options": [
        "Warning",
        "Deprecation",
        "Sunset",
        "X-Deprecated"
      ],
      "answer": 1,
      "explanation": "The Deprecation header indicates that a version is deprecated."
    },
    {
      "question": "What header indicates when a deprecated version will be removed?",
      "options": [
        "Sunset",
        "Expires",
        "Retry-After",
        "Remove-At"
      ],
      "answer": 0,
      "explanation": "The Sunset header specifies when a deprecated version will be removed (HTTP-date format)."
    },
    {
      "question": "Which versioning approach pollutes URLs?",
      "options": [
        "Header-based",
        "URL prefix",
        "Query parameter",
        "Subdomain"
      ],
      "answer": 2,
      "explanation": "Query parameter versioning (?version=1) pollutes the URL with version information."
    },
    {
      "question": "Why separate version routers are recommended?",
      "options": [
        "They share code",
        "Changes are isolated per version",
        "They are faster",
        "They reduce memory"
      ],
      "answer": 1,
      "explanation": "Separate routers isolate changes per version, making deprecation and maintenance simpler."
    }
  ]
};

