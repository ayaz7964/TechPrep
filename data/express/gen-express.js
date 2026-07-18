const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }
var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 300, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: EXPRESS ARCHITECTURE =================== */
addTopic('express-architecture', 'Express Architecture', 'intermediate', 25,
  ['Express is a minimal, unopinionated Node.js web framework that provides a robust set of features for web and mobile applications.',
   'Built on top of Node.js HTTP module, Express adds middleware-based architecture, routing, and request/response handling abstractions.',
   'Follows a single-threaded, event-driven model using the request-response cycle with middleware functions that process requests in sequence.',
   'Its minimal core is extended through middleware packages, making it highly flexible and customizable for various application needs.'
  ],
  'Express is like a basic kitchen that provides the essential tools (stove, sink, counter) but lets you add your own appliances (middleware) as needed. It does not force a specific way of cooking (unopinionated).',
  [
    d('Core Architecture', 'Express is built around the concept of middleware - functions that have access to the request object, response object, and the next middleware function in the application\'s request-response cycle. Each middleware can modify the request/response, end the cycle, or call the next middleware. The app is essentially a pipeline of middleware functions.'),
    d('Application Object', 'The express() function creates an Express application object that represents the entire application. This object provides methods for routing (app.get, app.post), middleware configuration (app.use), settings (app.set), and starting the server (app.listen). The application object is the central organizing unit of an Express app.'),
    d('Request and Response Objects', 'Express extends Node.js native request and response objects with additional methods and properties. req.params, req.query, req.body provide access to request data. res.json(), res.send(), res.render(), res.redirect() provide convenient response methods. These extended objects are passed through the middleware chain.'),
    d('Middleware Pipeline', 'Middleware functions are executed in the order they are added to the application. Each middleware receives req, res, and next. It can modify req/res, send a response, or call next() to pass control to the next middleware. Error-handling middleware has four parameters (err, req, res, next) and catches errors passed via next(err).'),
    d('Configuration and Settings', 'Express supports application-level settings via app.set() and app.get(). Environment-based configuration (NODE_ENV) controls behavior like view caching, error formatting, and stack traces. The app can be configured to trust proxy headers, set view engines, and customize other behaviors without modifying application code.')
  ],
  'Express architecture is fundamentally middleware-based. Understanding the middleware pipeline, how request/response objects flow through it, and how to structure applications using the Express application object is essential for building robust server-side applications with Node.js.',
  [
    q('What is Express.js architecture?', 'Express follows a middleware-based architecture. The application is a pipeline of middleware functions that process incoming requests sequentially. Each middleware can modify the request and response objects, terminate the request-response cycle, or pass control to the next middleware. Express is minimal and unopinionated, allowing developers to structure applications as needed.'),
    q('How does the middleware pipeline work?', 'Middleware functions are executed in the order they are registered using app.use() or route-specific methods. Each middleware receives req, res, and next. It processes the request, optionally modifies req/res, and either sends a response or calls next() to pass control to the next middleware. If no middleware sends a response, the request hangs.'),
    q('What is the Express application object?', 'The application object is created by calling express(). It represents the Express application and provides methods for routing (get, post, put, delete), middleware registration (use), settings (set, get, enable, disable), and server startup (listen). It is the central organizing object.'),
    q('How does Express extend Node.js request/response objects?', 'Express adds properties like req.params (route parameters), req.query (query string), req.body (parsed request body), req.path, req.hostname, req.ip. Response methods include res.json(), res.send(), res.status(), res.redirect(), res.render(), res.set(). These make common web development tasks more convenient.'),
    q('What is the purpose of app.use()?', 'app.use() mounts middleware at a specified path or globally. Middleware mounted with app.use() runs for every request matching the path (or all requests if no path specified). It is used for application-level middleware like logging, parsing, authentication, and error handling.'),
    q('How does Express handle errors?', 'Express has built-in error handling. Errors in middleware are passed to error-handling middleware using next(err). Error-handling middleware has four parameters (err, req, res, next) and is defined last in the middleware chain. It can format and send error responses.'),
    q('What is the significance of calling next()?', 'next() passes control to the next middleware function in the pipeline. Without calling next(), the request hangs and eventually times out. next() can be called without arguments to proceed normally, or with an argument (like new Error()) to trigger error-handling middleware.'),
    q('How does Express compare to other Node.js frameworks?', 'Express is minimal and unopinionated compared to frameworks like Koa (which uses async/await natively), Fastify (which focuses on performance and schema validation), or NestJS (which provides an Angular-like structured architecture). Express has the largest ecosystem and community.'),
    q('What is the typical folder structure for an Express app?', 'Common structure: app.js or server.js as entry point, routes/ for route definitions, controllers/ for business logic, middleware/ for custom middleware, models/ for data models, config/ for configuration, views/ for templates, and public/ for static files. Express does not enforce any specific structure.'),
    q('How do you configure an Express app for production?', 'Set NODE_ENV=production (hides stack traces, enables caching), use a process manager like PM2, implement logging with morgan/winston, add compression (compression middleware), set security headers (helmet), configure rate limiting, use environment variables for configuration, and run behind a reverse proxy (nginx).')
  ],
  R(10,40,130,35,'#68a063','','Request In','HTTP') +
  A(140,58,170,58) +
  R(180,35,130,35,'#0070f3','','Middleware 1','Logging') +
  R(180,80,130,35,'#28a745','','Middleware 2','Parsing') +
  R(180,125,130,35,'#ffc107','','Middleware 3','Auth') +
  A(180,70,180,80) + A(180,115,180,125) +
  A(310,92,340,92) +
  R(350,60,120,65,'#e83e8c','','Route Handler','Response') +
  A(180,160,180,175) +
  R(180,175,130,20,'#dc3545','','Error Handler','4 params') +
  T(240,210,'Express Architecture: Middleware pipeline processes requests sequentially.',9,'#666','middle'),
  [
    e('Basic Express App', 'Creating a simple Express server.', codeBlock([
      "const express = require('express');",
      "const app = express();",
      "app.get('/', (req, res) => res.send('Hello World'));",
      "app.listen(3000, () => console.log('Server running on port 3000'));"
    ]), 'Creates an Express app with a single route and starts the server.'),
    e('Application Settings', 'Configuring Express settings.', codeBlock([
      "const express = require('express');",
      "const app = express();",
      "app.set('view engine', 'ejs');",
      "app.set('trust proxy', true);",
      "app.enable('case sensitive routing');",
      "console.log(app.get('view engine')); // 'ejs'"
    ]), 'Sets view engine, proxy trust, and case-sensitive routing options.'),
    e('Using app.use()', 'Mounting middleware globally.', codeBlock([
      "const express = require('express');",
      "const app = express();",
      "app.use(express.json());",
      "app.use(express.urlencoded({ extended: true }));",
      "app.use(express.static('public'));",
      "app.use('/api', require('./routes/api'));"
    ]), 'Registers body parsing and static file middleware at the application level.'),
    e('NODE_ENV Configuration', 'Environment-based behavior.', codeBlock([
      "const app = express();",
      "if (app.get('env') === 'production') {",
      "  app.set('trust proxy', 1);",
      "  // Disable stack traces in errors",
      "} else {",
      "  app.use(require('morgan')('dev'));",
      "}",
      "console.log('Environment:', app.get('env'));"
    ]), 'Checks NODE_ENV to conditionally apply production-specific configuration.'),
    e('Structuring with Express.Router', 'Modular route organization.', codeBlock([
      "const express = require('express');",
      "const app = express();",
      "const userRouter = require('./routes/users');",
      "const productRouter = require('./routes/products');",
      "app.use('/users', userRouter);",
      "app.use('/products', productRouter);"
    ]), 'Organizes routes into separate modules using Express.Router, mounted at specific paths.')
  ],
  [
    m('What is the central organizing object in Express?', ['Middleware', 'Application object', 'Router object', 'Request object'], 1, 'The application object (created by express()) is the central organizing unit.'),
    m('What happens if no middleware sends a response?', ['Express sends default response', 'Request hangs until timeout', 'Error is thrown', 'next() is called automatically'], 1, 'Without a response, the request hangs and eventually times out.'),
    m('How many parameters does error-handling middleware have?', ['2', '3', '4', '5'], 2, 'Error-handling middleware has four parameters: err, req, res, next.'),
    m('What does app.set() do?', ['Sets route handlers', 'Configures application settings', 'Sets middleware', 'Sets response headers'], 1, 'app.set() allows configuring Express application settings like view engine and proxy trust.'),
    m('How does middleware pass control to the next function?', ['return', 'next()', 'continue()', 'done()'], 1, 'Calling next() passes control to the next middleware in the pipeline.'),
    m('Which npm package extends Express with additional features?', ['express-settings', 'express-validator', 'helmet', 'express-core'], 2, 'helmet is a middleware package that adds security headers to Express responses.')
  ]
);

/* =================== TOPIC 2: ROUTING =================== */
addTopic('express-routing', 'Routing', 'beginner', 20,
  ['Routing refers to how an application responds to client requests at particular endpoints (URIs) and specific HTTP methods (GET, POST, PUT, PATCH, DELETE).',
   'Express provides app.get(), app.post(), app.put(), app.patch(), app.delete(), and app.all() methods for defining routes.',
   'Route parameters named segments prefixed with colon (:) capture values from the URL and make them available via req.params.',
   'Express.Router creates modular, mountable route handlers that can be organized into separate files for better code organization.'
  ],
  'Routing is like a reception desk directing visitors to the right department. Each URL and request type (method) has a specific handler that processes it and returns the appropriate response.',
  [
    d('Route Methods and Paths', 'Express supports all HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. Route paths can be strings, string patterns, or regular expressions. Methods are chainable: app.route(\'/path\').get(handler).post(handler) for cleaner code on the same path with different methods.'),
    d('Route Parameters', 'Route parameters are named URL segments defined with a colon: /users/:userId/books/:bookId. Values are captured in req.params: { userId: \'123\', bookId: \'456\' }. Parameters can only contain alphanumeric characters and underscores. Multiple parameters in a single path are supported.'),
    d('Query Parameters', 'Query parameters from the URL query string (?key=value) are available via req.query. Express parses the query string into an object. Multiple values for the same key become arrays. Access defaults with fallback: req.query.name || \'default\'.'),
    d('Express.Router', 'Express.Router creates modular route handlers. Define routes in separate files (routes/users.js) using router.get(), router.post(), etc. Export the router and mount it in the main app with app.use(\'/prefix\', router). Supports middleware at the router level for scoped functionality.'),
    d('Route Organization', 'Organize routes by resource (users, products, orders) in separate files. Use route files that export routers. Group related routes using app.use() prefixes. For larger apps, consider controllers to separate route definitions from business logic. Route ordering matters - more specific routes should come before parameterized ones.')
  ],
  'Express routing is intuitive and flexible. Route parameters capture dynamic URL segments, query parameters handle optional filters, and Express.Router enables modular organization of route handlers.',
  [
    q('What is routing in Express?', 'Routing defines how Express responds to client requests at specific endpoints (URLs) with specific HTTP methods. Each route can have one or more handler functions that process the request and send a response.'),
    q('How do you define a route in Express?', 'Use app.METHOD(PATH, HANDLER) where METHOD is an HTTP method (get, post, put, delete), PATH is the URL path, and HANDLER is a callback function that receives req and res. Example: app.get(\'/\', (req, res) => res.send(\'Hello\')).'),
    q('What are route parameters?', 'Route parameters are named URL segments defined with a colon prefix. For example, /users/:userId captures the userId value from the URL. The captured values are available in req.params.'),
    q('How do you access query parameters?', 'Query parameters are available via req.query. For a URL like /search?q=express&page=2, req.query returns { q: \'express\', page: \'2\' }. Express automatically parses the query string.'),
    q('What is Express.Router?', 'Express.Router is a class that creates modular, mountable route handlers. It acts like a mini Express application with its own middleware and routing. Routers can be exported and mounted in the main app using app.use().'),
    q('How do you organize routes in Express?', 'Create separate route files (routes/users.js, routes/products.js) using Express.Router. Mount them in the main app: app.use(\'/users\', userRouter), app.use(\'/products\', productRouter). For larger apps, add controllers to separate business logic from route definitions.'),
    q('How does route matching work?', 'Express matches routes in the order they are defined. More specific routes should be defined before parameterized routes to avoid conflicts. Express routes are case-sensitive by default (can be changed with app.enable(\'case sensitive routing\')).'),
    q('What is app.all() used for?', 'app.all(\'/path\', handler) matches all HTTP methods for the specified path. It is useful for global middleware, authentication checks, or logging that should apply to all methods on a specific path.'),
    q('Can you chain route handlers?', 'Yes, Express supports chaining multiple handlers for a single route: app.get(\'/path\', handler1, handler2, handler3). Handlers execute in sequence if each calls next() instead of sending a response. This is useful for validation, authentication, and then the main handler.'),
    q('How do you handle 404 in Express?', 'Define a catch-all middleware after all routes: app.use((req, res) => res.status(404).send(\'Not Found\')). This runs when no route matches the request path. It should be the last middleware before error handlers.')
  ],
  R(10,40,120,35,'#68a063','','/users','GET /users') +
  R(10,85,120,35,'#0070f3','','/users/:id','GET /users/:id') +
  R(10,130,120,35,'#28a745','','/users/:id','POST /users/:id') +
  A(130,58,160,58) + A(130,103,160,103) + A(130,148,160,148) +
  R(170,40,140,35,'#ffc107','','Route Handler','getUser') +
  R(170,85,140,35,'#e83e8c','','Route Handler','getUserById') +
  R(170,130,140,35,'#6610f2','','Route Handler','createUser') +
  T(240,190,'Routing: URL path + HTTP method maps to handler functions.',9,'#666','middle'),
  [
    e('Basic Route Methods', 'Different HTTP methods on the same path.', codeBlock([
      "app.get('/users', getAllUsers);",
      "app.get('/users/:id', getUserById);",
      "app.post('/users', createUser);",
      "app.put('/users/:id', updateUser);",
      "app.delete('/users/:id', deleteUser);"
    ]), 'Standard CRUD routes for a users resource with route parameters for ID.'),
    e('Route Parameters', 'Accessing URL parameters.', codeBlock([
      "app.get('/users/:userId/books/:bookId', (req, res) => {",
      "  const { userId, bookId } = req.params;",
      "  res.json({ userId, bookId });",
      "});"
    ]), 'Multiple route parameters captured from the URL path.'),
    e('Query Parameters', 'Handling optional query strings.', codeBlock([
      "app.get('/search', (req, res) => {",
      "  const { q, page = 1, limit = 10 } = req.query;",
      "  if (!q) return res.status(400).send('Search query required');",
      "  res.json({ q, page, limit });",
      "});"
    ]), 'Query parameters provide optional filters with default values.'),
    e('Express.Router Module', 'Creating a modular route file.', codeBlock([
      "const router = require('express').Router();",
      "router.get('/', getAllUsers);",
      "router.get('/:id', getUserById);",
      "router.post('/', createUser);",
      "module.exports = router;"
    ]), 'Exporting a router to be mounted in the main app.'),
    e('Chained Route Handlers', 'Middleware applied to a specific route.', codeBlock([
      "app.post('/users', validateUser, sanitizeInput, createUser);",
      "async function validateUser(req, res, next) {",
      "  if (!req.body.email) return res.status(400).send('Email required');",
      "  next();",
      "}"
    ]), 'Multiple handler functions execute in sequence for a single route.')
  ],
  [
    m('How do you define a route parameter in Express?', [':param', '{param}', '<param>', 'param'], 0, 'Route parameters are defined with a colon prefix (/:param).'),
    m('Where are route parameter values stored?', ['req.query', 'req.params', 'req.body', 'req.data'], 1, 'Route parameter values are available in req.params.'),
    m('What Express class creates modular route handlers?', ['express.Module', 'express.Router', 'express.Handler', 'express.Route'], 1, 'Express.Router creates modular, mountable route handlers.'),
    m('Which method matches all HTTP methods on a path?', ['app.match()', 'app.all()', 'app.every()', 'app.any()'], 1, 'app.all() matches GET, POST, PUT, DELETE, and all other methods.'),
    m('How do you access query string parameters?', ['req.params', 'req.query', 'req.body', 'req.data'], 1, 'Query string parameters are available via req.query.'),
    m('What should be placed before parameterized routes?', ['Other parameterized routes', 'More specific static routes', 'Error handlers', 'Nothing'], 1, 'More specific static routes should be defined before parameterized routes.')
  ]
);

/* =================== TOPIC 3: MIDDLEWARE =================== */
addTopic('express-middleware', 'Middleware', 'intermediate', 25,
  ['Middleware functions have access to the request object, response object, and the next middleware function in the application\'s request-response cycle.',
   'They can execute code, modify req/res, end the request-response cycle, or call next() to pass control to subsequent middleware.',
   'Express has built-in middleware (express.json, express.static, express.urlencoded) and a vast ecosystem of third-party middleware packages.',
   'Middleware can be application-level (app.use), router-level (router.use), error-handling (4 params), or built-in/third-party.'
  ],
  'Middleware is like an assembly line in a factory. Each station (middleware) performs a specific task on the product (request) before passing it along to the next station. Some stations complete the product (send response) while others just inspect or modify it.',
  [
    d('Application-Level Middleware', 'Bound to the express app instance using app.use() or app.METHOD(). Runs for every request (for app.use() without path) or for requests matching a specific path. Application-level middleware is registered in order and affects all routes.'),
    d('Router-Level Middleware', 'Works identically to application-level middleware but is bound to an Express.Router instance using router.use() or router.METHOD(). Scoped to routes handled by that router. Useful for middleware that should only apply to a specific group of routes.'),
    d('Built-in Middleware', 'Express includes: express.json() (parses JSON request bodies), express.urlencoded({extended: true}) (parses URL-encoded bodies), express.static (serves static files), express.Router (modular routing), express.errorHandler (basic error handling). Previously express.session and express.compress existed but were removed.'),
    d('Third-Party Middleware', 'Popular third-party middleware: morgan (HTTP logging), helmet (security headers), cors (Cross-Origin Resource Sharing), compression (gzip), passport (authentication), express-validator (input validation), express-rate-limit (rate limiting), cookie-parser (cookie parsing), csurf (CSRF protection).'),
    d('Middleware Execution Order', 'Middleware executes in the order it is registered. The first middleware registered runs first. If it calls next(), control passes to the next registered middleware. If it sends a response, subsequent middleware does not run. Error-handling middleware runs only when next(err) is called and is defined last.')
  ],
  'Middleware is the core of Express architecture. Understanding the different types (application, router, error-handling, built-in, third-party) and their execution order is essential for building secure, well-structured Express applications.',
  [
    q('What is middleware in Express?', 'Middleware is a function that sits between the request and response. It has access to req, res, and next. It can execute code, modify req/res, end the cycle, or pass control to the next middleware using next(). Middleware forms the processing pipeline of an Express application.'),
    q('What are the types of middleware?', 'Application-level (app.use), router-level (router.use), error-handling (4 params), built-in (express.json, express.static), and third-party (morgan, helmet, cors).'),
    q('How do you create custom middleware?', 'Define a function that accepts (req, res, next). Perform operations on req/res, then either call next() to continue or send a response to end the cycle. Example: function logger(req, res, next) { console.log(req.method, req.url); next(); }'),
    q('What is the difference between app.use and app.METHOD?', 'app.use() mounts middleware for all HTTP methods. app.get(), app.post(), etc. mount middleware only for the specified HTTP method. Both match the specified path (or all paths if none specified).'),
    q('How does middleware order affect execution?', 'Middleware executes in registration order. If middleware sends a response early, later middleware never runs. Error-handling middleware must be registered last and is only triggered by next(err).'),
    q('What happens when next() is called with an argument?', 'next(err) passes an error to Express. Express skips all remaining regular middleware and goes directly to the first error-handling middleware (4 params). If no error handler exists, Express sends a default 500 response.'),
    q('How does express.json() work?', 'express.json() parses incoming requests with JSON payloads. It reads the request body, parses it as JSON, and sets req.body to the parsed object. It returns an error for invalid JSON. Must be registered before routes that expect JSON input.'),
    q('Can middleware be conditional?', 'Yes, middleware can conditionally call next() or send a response. For example, authentication middleware checks credentials and either allows (next()) or rejects (send 401) the request. Route handlers can also conditionally apply middleware using arrays.'),
    q('How do you pass data between middleware?', 'Attach data to the req object: req.user = authenticatedUser; req.startTime = Date.now(); Subsequent middleware can read these values from req. This is the standard pattern for sharing data across middleware.'),
    q('What is the next() function?', 'next() is a callback function passed to middleware that passes control to the next middleware in the stack. Without calling next(), the request hangs. next(\'route\') bypasses remaining middleware on the same route. next(err) triggers error handling.')
  ],
  R(10,40,140,35,'#68a063','','Request In','HTTP') +
  A(150,58,170,58) +
  R(180,40,140,30,'#0070f3','','app.use(logger)','Logging') +
  A(180,70,180,78) +
  R(180,80,140,30,'#28a745','','app.use(express.json)','Body Parse') +
  A(180,110,180,118) +
  R(180,120,140,30,'#ffc107','','app.use(auth)','Auth Check') +
  A(320,78,350,78) + A(320,95,350,95) + A(320,135,350,135) +
  R(360,65,120,55,'#e83e8c','','Route Handler','Response') +
  A(180,150,180,165) +
  R(180,165,140,20,'#dc3545','','Error Handler','next(err)') +
  T(240,210,'Middleware Pipeline: Functions process requests sequentially in registered order.',9,'#666','middle'),
  [
    e('Creating Custom Middleware', 'Simple request logger.', codeBlock([
      "function requestLogger(req, res, next) {",
      "  const start = Date.now();",
      "  console.log(`${req.method} ${req.url}`);",
      "  res.on('finish', () => {",
      "    const duration = Date.now() - start;",
      "    console.log(`${res.statusCode} - ${duration}ms`);",
      "  });",
      "  next();",
      "}",
      "app.use(requestLogger);"
    ]), 'Logs the method, URL, status code, and duration for every request.'),
    e('Built-in Middleware: Body Parsing', 'Parsing JSON and form data.', codeBlock([
      "const express = require('express');",
      "const app = express();",
      "app.use(express.json());",
      "app.use(express.urlencoded({ extended: true }));",
      "app.post('/submit', (req, res) => {",
      "  console.log(req.body);",
      "  res.json({ received: true });",
      "});"
    ]), 'Parses JSON and form-encoded request bodies before route handlers.'),
    e('Third-Party: Morgan Logger', 'HTTP request logging.', codeBlock([
      "const morgan = require('morgan');",
      "app.use(morgan('combined'));",
      "// Formats: combined, common, dev, short, tiny"
    ]), 'morgan provides pre-formatted HTTP logging in various output formats.'),
    e('Conditional Middleware', 'Apply middleware only in development.', codeBlock([
      "if (process.env.NODE_ENV === 'development') {",
      "  app.use(morgan('dev'));",
      "  app.use(require('errorhandler')());",
      "}"
    ]), 'Middleware is conditionally applied based on environment.'),
    e('Passing Data via req', 'Sharing data between middleware.', codeBlock([
      "function loadUser(req, res, next) {",
      "  const userId = req.params.userId;",
      "  req.user = { id: userId, role: 'admin' };",
      "  next();",
      "}",
      "app.get('/admin/:userId', loadUser, (req, res) => {",
      "  res.json({ user: req.user });",
      "});"
    ]), 'Middleware attaches user data to req object, consumed by the route handler.')
  ],
  [
    m('What three arguments does standard middleware receive?', ['err, req, res', 'req, res, next', 'req, res, err', 'next, req, res'], 1, 'Standard middleware receives req, res, and next.'),
    m('What triggers error-handling middleware?', ['Any middleware error', 'Calling next(err)', 'Throwing an error', 'All of the above'], 1, 'Error-handling middleware is triggered by next(err).'),
    m('Which built-in middleware parses JSON bodies?', ['express.parse()', 'express.json()', 'express.bodyParser()', 'express.JSON()'], 1, 'express.json() parses incoming JSON request bodies.'),
    m('What is the purpose of next(\'route\')?', ['Trigger error handler', 'Skip remaining middleware on this route', 'Pass to next route', 'Restart the pipeline'], 1, 'next(\'route\') skips remaining middleware on the same route and jumps to the next matching route.'),
    m('How do you share data between middleware?', ['Global variables', 'req object', 'res.locals', 'Both req and res.locals'], 3, 'Data is shared via req object or res.locals for response-local data.'),
    m('Where should error-handling middleware be registered?', ['First', 'After routes', 'Last in the middleware stack', 'In a separate file'], 2, 'Error-handling middleware should be registered last in the middleware stack.')
  ]
);

/* =================== TOPIC 4: CUSTOM MIDDLEWARE =================== */
addTopic('express-custom-middleware', 'Custom Middleware', 'intermediate', 20,
  ['Custom middleware functions follow the pattern (req, res, next) and can perform any operation before passing control to the next handler.',
   'They are ideal for request logging, authentication, input validation, data enrichment, response timing, and access control.',
   'Custom middleware can be application-level (app.use), route-specific (inline in route definitions), or exported as reusable modules.',
   'Best practices include keeping middleware focused on a single responsibility, using next() consistently, and handling errors properly.'
  ],
  'Custom middleware is like having your own specialized tools in a workshop. While Express provides the basic tools (built-in middleware), custom middleware lets you build exactly what your application needs.',
  [
    d('Creating Reusable Middleware', 'Package middleware as modules that return a function. Accept options via a higher-order function pattern: function middleware(options) { return function(req, res, next) { ... } }. This allows configuration without global state. Export middleware as npm packages for reuse across projects.'),
    d('Route-Specific Middleware', 'Pass middleware inline in route definitions: app.get(\'/path\', authMiddleware, handler). Multiple middleware can be passed as an array: app.get(\'/path\', [validate, sanitize, handler]). Middleware runs only for that specific route and method.'),
    d('Async Middleware', 'For async operations, define middleware as async functions: async function(req, res, next) { try { ... } catch(err) { next(err) } }. Always wrap in try/catch and call next(err) on failure. Unhandled promise rejections in Express cause the process to exit.'),
    d('Middleware Configuration Patterns', 'Use factory functions for configurable middleware: function rateLimit(windowMs, max) { return function(req, res, next) { ... } }. Closure variables create isolated state per middleware instance. This pattern is used by popular middleware like morgan, cors, and helmet.'),
    d('Testing Custom Middleware', 'Test middleware by creating mock req/res/next objects. Invoke the middleware and assert: the correct response was sent, next() was called, or req/res were modified appropriately. Use libraries like sinon for spy/mock/stub on next().')
  ],
  'Custom middleware is essential for building maintainable Express applications. The key patterns are: focused single-responsibility functions, factory functions for configuration, async error handling with try/catch, and route-specific application.',
  [
    q('How do you create custom middleware in Express?', 'Define a function that accepts (req, res, next). Perform operations, then either call next() to continue or send a response. Example: function myMiddleware(req, res, next) { req.timestamp = Date.now(); next(); }'),
    q('How do you make middleware configurable?', 'Use a factory function pattern: function createMiddleware(options) { return function(req, res, next) { /* use options */ next(); } }. Register with options: app.use(createMiddleware({ key: \'value\' })).'),
    q('How do you handle async errors in middleware?', 'Always wrap async operations in try/catch and pass errors to next(err). Express 5+ handles async middleware errors automatically. In Express 4, unhandled promise rejections cause process crashes.'),
    q('How do you apply middleware to specific routes?', 'Pass middleware as additional arguments: app.get(\'/path\', middleware, handler). Or as an array: app.get(\'/path\', [mid1, mid2], handler). Middleware runs before the route handler for that specific path and method.'),
    q('What is a middleware factory function?', 'A function that returns a middleware function. It accepts configuration options and creates a closure: function logger(format) { return function(req, res, next) { console.log(format); next(); } }. Used by morgan, cors, helmet.'),
    q('How do you test custom middleware?', 'Create mock objects for req, res, and next. Invoke the middleware function. Assert that req/res were modified correctly, next() was called, or the response was sent with expected status and body.'),
    q('What are best practices for custom middleware?', 'Single responsibility (one task per middleware), consistent next() usage, proper error handling (try/catch for async), no side effects outside req/res, configurable via factory functions, well-documented, and tested.'),
    q('Can middleware be conditionally skipped?', 'Yes, check conditions and call next() early to skip: function conditional(req, res, next) { if (!shouldRun(req)) return next(); /* do work */ next(); }. Or use a wrapper that conditionally applies middleware.'),
    q('How do you terminate the request in middleware?', 'Send a response using res.send(), res.json(), res.status().end(), or res.redirect(). Do not call next() after sending a response. Calling both sends a response and calls next() causes the headers cannot be set error.'),
    q('What is the difference between app.use and app.METHOD for custom middleware?', 'app.use(middleware) runs for all HTTP methods. app.get(middleware) runs only for GET requests. Both can accept a path prefix: app.use(\'/api\', middleware) runs only for paths starting with /api.')
  ],
  R(10,40,140,35,'#68a063','','Factory Function','createLogger(opts)') +
  A(150,58,170,58) +
  R(180,40,140,35,'#0070f3','','Middleware','(req,res,next)') +
  A(180,75,180,93) +
  R(180,95,140,35,'#28a745','','next()','Pass Control') +
  A(320,78,350,78) +
  R(360,65,120,30,'#ffc107','','Route Handler','Response') +
  R(10,160,140,25,'#dc3545','','Error: next(err)','Catches async errors') +
  T(240,200,'Custom Middleware: Configurable, reusable functions that process requests.',9,'#666','middle'),
  [
    e('Basic Custom Middleware', 'Request timing middleware.', codeBlock([
      "function requestTime(req, res, next) {",
      "  req.requestTime = Date.now();",
      "  const originalEnd = res.end;",
      "  res.end = function(...args) {",
      "    console.log('Duration:', Date.now() - req.requestTime, 'ms');",
      "    originalEnd.apply(res, args);",
      "  };",
      "  next();",
      "}",
      "app.use(requestTime);"
    ]), 'Attaches start time and logs duration on response finish by wrapping res.end.'),
    e('Configurable Factory Middleware', 'Options-based logger.', codeBlock([
      "function createLogger(prefix) {",
      "  return function(req, res, next) {",
      "    console.log(`[${prefix}] ${req.method} ${req.url}`);",
      "    next();",
      "  };",
      "}",
      "app.use('/api', createLogger('API'));",
      "app.use('/admin', createLogger('ADMIN'));"
    ]), 'Factory function creates logger middleware with different prefixes for different paths.'),
    e('Async Middleware with Error Handling', 'Database lookup middleware.', codeBlock([
      "async function loadUser(req, res, next) {",
      "  try {",
      "    const user = await db.users.findById(req.params.id);",
      "    if (!user) return res.status(404).json({ error: 'User not found' });",
      "    req.user = user;",
      "    next();",
      "  } catch (err) {",
      "    next(err);",
      "  }",
      "}"
    ]), 'Async middleware with proper try/catch and error forwarding via next(err).'),
    e('Route-Specific Middleware Array', 'Validation on a specific route.', codeBlock([
      "function validateBody(req, res, next) {",
      "  if (!req.body.name) return res.status(400).json({ error: 'Name required' });",
      "  next();",
      "}",
      "function sanitizeInput(req, res, next) {",
      "  req.body.name = req.body.name.trim();",
      "  next();",
      "}",
      "app.post('/users', [validateBody, sanitizeInput], createUser);"
    ]), 'Multiple middleware functions applied as an array to a single route.'),
    e('Conditional Middleware', 'Skip middleware for certain conditions.', codeBlock([
      "function skipIfProduction(middleware) {",
      "  return (req, res, next) => {",
      "    if (process.env.NODE_ENV === 'production') return next();",
      "    middleware(req, res, next);",
      "  };",
      "}",
      "app.use(skipIfProduction(morgan('dev')));"
    ]), 'Higher-order function that conditionally applies morgan only in non-production environments.')
  ],
  [
    m('What pattern makes middleware configurable?', ['Class pattern', 'Factory function pattern', 'Singleton pattern', 'Proxy pattern'], 1, 'Factory functions accept options and return a middleware function with closure over the options.'),
    m('How do you pass next() after an async error?', ['throw error', 'next(err)', 'return error', 'res.send(error)'], 1, 'Pass errors via next(err) in the catch block.'),
    m('Can middleware be applied to a single route?', ['No', 'Yes, inline in route definition', 'Only with app.use', 'Only globally'], 1, 'Pass middleware inline: app.get(\'/path\', middleware, handler).'),
    m('What happens if you call next() after res.send()?', ['Works fine', 'Headers already sent error', 'next() is ignored', 'Both execute'], 1, 'Calling next() after sending a response causes a headers-already-sent error.'),
    m('How do you create a middleware that skips itself?', ['return null', 'Call next() early without work', 'Throw an error', 'Return res.send()'], 1, 'Call next() early without performing the middleware work to skip.'),
    m('What is the first argument to error-handling middleware?', ['req', 'res', 'err', 'next'], 2, 'Error-handling middleware receives err as its first parameter.')
  ]
);

/* =================== TOPIC 5: ERROR HANDLING MIDDLEWARE =================== */
addTopic('express-error-handling', 'Error Handling Middleware', 'intermediate', 25,
  ['Error-handling middleware has four parameters (err, req, res, next) and is used to catch and process errors that occur in other middleware or route handlers.',
   'Errors are triggered by calling next(err) or by throwing synchronously. Express skips all regular middleware and goes directly to error-handling middleware.',
   'Define error-handling middleware last in the middleware stack to catch errors from all preceding middleware and routes.',
   'Best practice: create a centralized error handler that formats responses consistently based on error type (validation, auth, not found, server error).'
  ],
  'Error-handling middleware is like a hospital emergency room. When something goes wrong anywhere in the building (application), the patient (error) is rushed past all other queues directly to the ER (error handler) where specialized doctors (handlers) treat it.',
  [
    d('Error-Handling Signature', 'Error-handling middleware is identified by having exactly four parameters: (err, req, res, next). Even if next is not used, all four parameters must be declared. Express differentiates error middleware from regular middleware by the parameter count.'),
    d('Triggering Error Middleware', 'Errors reach error middleware via next(err) or synchronous throws. Async errors must be caught and passed: try { ... } catch(err) { next(err) }. Express 5+ catches async errors automatically. Call next() without arguments to skip to regular middleware.'),
    d('Centralized Error Handler', 'Create a single error-handling middleware that checks the error type and responds appropriately. Use custom error classes with statusCode, message, and details properties. The handler should distinguish between operational errors (known, expected) and programmer errors (bugs).'),
    d('Error Response Format', 'Consistent JSON error format: { error: { message, status, details?, stack? } }. Include stack traces only in development (check NODE_ENV). Use HTTP status codes appropriately: 400 validation, 401 unauthorized, 403 forbidden, 404 not found, 500 server error.'),
    d('Custom Error Classes', 'Create AppError class extending Error with statusCode, isOperational fields. Controllers throw new AppError(\'Not Found\', 404). Error handler checks isOperational to determine whether to crash the process (programmer errors) or respond gracefully (operational errors).')
  ],
  'Proper error handling with centralized middleware is critical for production Express applications. It ensures consistent error responses, prevents information leakage, and helps debug issues effectively.',
  [
    q('What is error-handling middleware?', 'Middleware with four parameters (err, req, res, next) that catches errors from other middleware and routes. It runs only when next(err) is called or a synchronous error is thrown. It should be defined last in the middleware stack.'),
    q('How do you trigger error-handling middleware?', 'Call next(err) with an error argument. Express skips all regular middleware and jumps to the first error-handling middleware. Synchronous throws also trigger it. For async code, catch errors and call next(err).'),
    q('How do you create a centralized error handler?', 'Define error-handling middleware with (err, req, res, next) at the end of your middleware stack. Check err.statusCode or customize based on error type. Send a consistent JSON response with appropriate status code.'),
    q('What are custom error classes?', 'Classes that extend Error with additional properties like statusCode and isOperational. Example: class AppError extends Error { constructor(message, statusCode) { super(message); this.statusCode = statusCode; } }. They make error handling more consistent.'),
    q('How do you handle async errors in Express 4?', 'Wrap async route handlers in a utility function: const wrapAsync = fn => (req, res, next) => fn(req, res, next).catch(next). Or use express-async-errors package to patch Express. Without catching, promise rejections crash the process.'),
    q('What is the difference between operational and programmer errors?', 'Operational errors are expected (invalid input, not found, auth failure) - handle gracefully. Programmer errors are bugs (undefined variable, type error) - crash and restart. Error handler should distinguish between them.'),
    q('How do you prevent stack trace leakage in production?', 'Check NODE_ENV in error handler: if (process.env.NODE_ENV === \'production\') delete err.stack. Never send raw error messages to clients in production. Log full errors server-side, send sanitized messages to clients.'),
    q('What status codes should different errors return?', '400 (bad request/validation), 401 (unauthenticated), 403 (unauthorized/forbidden), 404 (not found), 409 (conflict), 422 (unprocessable entity), 429 (rate limited), 500 (internal server error).'),
    q('How do you handle 404 errors in Express?', 'Add a catch-all middleware after all routes: app.use((req, res) => res.status(404).json({ error: \'Not Found\' })). This runs when no route matches the incoming request path.'),
    q('Can you have multiple error-handling middleware?', 'Yes, you can chain error handlers. Each checks the error and either handles it (sends response) or passes to the next error handler via next(err). Useful for separating validation errors from server errors.')
  ],
  R(10,40,130,35,'#68a063','','app.get("/"...)','Route Handler') +
  A(140,58,170,58) + A(140,93,170,93) +
  A(180,75,180,93) +
  R(180,95,130,30,'#0070f3','','next(err)','Error Triggered') +
  A(310,110,340,110) +
  R(180,40,130,30,'#28a745','','app.get("/"...)','Works Fine') +
  A(310,55,340,55) +
  R(350,85,130,50,'#ffc107','','Error Handler','(err,req,res,next)') +
  T(240,180,'Error Handling: next(err) triggers error middleware that formats and sends error responses.',9,'#666','middle'),
  [
    e('Centralized Error Handler', 'Single error-handling middleware.', codeBlock([
      "app.use((err, req, res, next) => {",
      "  const status = err.statusCode || 500;",
      "  const message = err.isOperational ? err.message : 'Internal Server Error';",
      "  console.error('ERROR:', err);",
      "  res.status(status).json({",
      "    error: { message, status },",
      "    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })",
      "  });",
      "});"
    ]), 'Centralized handler that distinguishes operational errors from bugs, sanitizes output in production.'),
    e('Custom Error Class', 'Extending Error for consistent error handling.', codeBlock([
      "class AppError extends Error {",
      "  constructor(message, statusCode) {",
      "    super(message);",
      "    this.statusCode = statusCode;",
      "    this.isOperational = true;",
      "    Error.captureStackTrace(this, this.constructor);",
      "  }",
      "}",
      "throw new AppError('Invalid credentials', 401);"
    ]), 'Custom error class with status code and operational flag for centralized handling.'),
    e('Async Error Wrapper', 'Utility to catch async errors.', codeBlock([
      "const catchAsync = (fn) => {",
      "  return (req, res, next) => {",
      "    fn(req, res, next).catch(next);",
      "  };",
      "};",
      "app.get('/users', catchAsync(async (req, res) => {",
      "  const users = await db.findMany();",
      "  res.json(users);",
      "}));"
    ]), 'Wrapper function that catches async errors and passes them to next(err) automatically.'),
    e('404 Catch-All Handler', 'Handling unmatched routes.', codeBlock([
      "app.use('/api', apiRouter);",
      "app.use('/', webRouter);",
      "// 404 handler for unmatched routes",
      "app.use((req, res) => {",
      "  res.status(404).json({",
      "    error: { message: `Route ${req.method} ${req.url} not found` }",
      "  });",
      "});"
    ]), 'Catch-all middleware placed after all routes sends a 404 JSON response for unmatched paths.'),
    e('Multiple Error Handlers', 'Separate handling for different error types.', codeBlock([
      "// Handle validation errors first",
      "app.use((err, req, res, next) => {",
      "  if (err.name === 'ValidationError') {",
      "    return res.status(400).json({ error: err.message });",
      "  }",
      "  next(err);",
      "});",
      "// Handle all other errors",
      "app.use((err, req, res, next) => {",
      "  console.error(err);",
      "  res.status(500).json({ error: 'Something went wrong' });",
      "});"
    ]), 'Multiple error handlers: first handles validation errors, second handles everything else.')
  ],
  [
    m('How many parameters does error-handling middleware have?', ['2', '3', '4', '5'], 2, 'Error-handling middleware has exactly four parameters: err, req, res, next.'),
    m('What triggers error-handling middleware?', ['Calling next()', 'Calling next(err)', 'Calling res.send()', 'Calling next(\'route\')'], 1, 'next(err) with an error argument triggers error-handling middleware.'),
    m('Where should error-handling middleware be defined?', ['First in the stack', 'Before routes', 'Last in the stack', 'In a route file'], 2, 'Error-handling middleware should be defined last in the middleware stack.'),
    m('What is the purpose of custom error classes?', ['Make errors prettier', 'Add statusCode and type properties', 'Speed up error handling', 'Log errors automatically'], 1, 'Custom error classes add consistent properties like statusCode and isOperational.'),
    m('How do you prevent stack trace leakage?', ['Delete err.stack in production', 'Set NODE_ENV=production', 'Use try/catch', 'Both check NODE_ENV and conditionally include stack'], 3, 'Check NODE_ENV and only include stack traces in development mode.'),
    m('What utility catches async errors automatically?', ['express-async', 'catchAsync wrapper', 'async-handler', 'error-catcher'], 1, 'A catchAsync wrapper function catches promise rejections and passes them to next(err).')
  ]
);

/* =================== TOPIC 6: AUTHENTICATION MIDDLEWARE =================== */
addTopic('express-authentication-middleware', 'Authentication Middleware', 'intermediate', 30,
  ['Authentication middleware verifies user identity before granting access to protected routes, typically using JWT tokens, session cookies, or API keys.',
   'JWT (JSON Web Token) authentication is stateless: tokens are verified in middleware without server-side session storage.',
   'Session-based authentication stores session data server-side (in memory or Redis) and uses signed cookies for client identification.',
   'Authentication middleware attaches the authenticated user to req.user for downstream route and controller use.'
  ],
  'Authentication middleware is like a security guard checking IDs at the door of a building. It verifies that you are who you claim to be (authentication) before letting you proceed further into the building.',
  [
    d('JWT Authentication Flow', 'Client sends token in Authorization header (Bearer token). Middleware extracts token, verifies signature using secret key, decodes payload, and attaches user to req. Token contains claims (userId, role, exp). Stateless: no server-side session storage needed.'),
    d('Session Authentication Flow', 'Client sends session cookie. Middleware reads cookie, looks up session in store (memory, Redis, database). If valid, attaches user to req.user. Stateful: session data persists server-side. Easier to revoke than JWT. Requires a session store for production.'),
    d('Passport.js Integration', 'Passport is the most popular authentication middleware for Express. It uses strategies (passport-jwt, passport-local, passport-google-oauth). Configure strategy, serialize/deserialize user, and use passport.authenticate() middleware on protected routes.'),
    d('Protected Route Patterns', 'Create reusable auth middleware: const protect = (req, res, next) => { if (!req.user) return res.status(401).json({ error: \'Unauthorized\' }); next(); }. Apply globally: app.use(\'/api/protected\', protect, router). Or per route: app.get(\'/profile\', protect, getProfile).'),
    d('Role-Based Access Control', 'Extend auth middleware to check roles: const authorize = (...roles) => (req, res, next) => { if (!roles.includes(req.user.role)) return res.status(403).json({ error: \'Forbidden\' }); next(); }. Chain: app.get(\'/admin\', protect, authorize(\'admin\'), handler).')
  ],
  'Authentication middleware is a critical security layer in Express applications. Whether using JWT (stateless, scalable) or sessions (stateful, revocable), the middleware pattern keeps auth logic centralized and reusable.',
  [
    q('What does authentication middleware do?', 'It verifies the identity of a user by validating credentials (JWT, session, API key) attached to incoming requests. On success, it attaches the authenticated user object to req.user. On failure, it returns a 401 response.'),
    q('How does JWT authentication middleware work?', 'Extracts token from Authorization header (Bearer scheme), verifies the signature using a secret key, decodes the payload, and attaches user data to req.user. JWTs contain expiry (exp) and are stateless - no server-side storage needed.'),
    q('How does session-based auth differ from JWT?', 'Sessions store data server-side (memory, Redis). The client only holds a signed cookie ID. Sessions are easier to revoke but require storage. JWT is stateless, contains all user data in the token, and scales better but cannot be revoked before expiry.'),
    q('What is Passport.js?', 'Passport is authentication middleware for Express that supports over 500 strategies (local, JWT, OAuth, SAML). It uses the strategy pattern: configure a strategy, serialize/deserialize user, and call passport.authenticate() on routes.'),
    q('How do you protect multiple routes with auth middleware?', 'Mount the middleware on a router: router.use(protect). Or apply globally with path prefix: app.use(\'/api/protected\', authMiddleware, protectedRouter). This protects all routes in that router without repeating the middleware.'),
    q('How do you implement role-based access control?', 'Create an authorize middleware factory: const authorize = (...roles) => (req, res, next) => { if (!roles.includes(req.user.role)) return res.status(403).json({ error: \'Forbidden\' }); next(); }. Chain with protect: app.use(auth, authorize(\'admin\')).'),
    q('What should the auth middleware return on failure?', 'Return 401 for missing/invalid credentials, 403 for valid credentials but insufficient permissions. Include a clear error message. Do not reveal whether the user exists (prevents enumeration attacks).'),
    q('How do you handle token expiry in middleware?', 'Check the exp claim in JWT. Return 401 with \'Token expired\' message. The client should refresh the token using a refresh token endpoint. Session-based auth handles expiry via session TTL.'),
    q('Can you use multiple auth strategies simultaneously?', 'Yes, create middleware that tries each strategy in order. For example, first check JWT, then check session cookie, then check API key. If any succeeds, proceed. If all fail, return 401. Passport supports this with the concept of multiple strategies.'),
    q('How do you test authentication middleware?', 'Create mock req objects with headers and mock res with status and json spies. Invoke middleware and assert: 401 sent for missing token, req.user populated for valid token, correct error message for expired token.')
  ],
  R(10,40,120,35,'#68a063','','Client','Bearer token') +
  A(130,58,160,58) +
  R(170,40,130,35,'#0070f3','','Auth Middleware','Verify JWT') +
  A(170,75,170,93) + A(130,93,170,93) +
  R(10,95,120,35,'#28a745','','401 Error','Unauthorized') +
  R(180,95,120,35,'#ffc107','','req.user set','Valid Auth') +
  A(300,113,330,113) +
  R(340,80,120,50,'#e83e8c','','Route Handler','Access req.user') +
  T(240,180,'Auth Middleware: Verify token/session, attach user to req, deny or allow access.',9,'#666','middle'),
  [
    e('JWT Authentication Middleware', 'Verifying a JSON Web Token.', codeBlock([
      "const jwt = require('jsonwebtoken');",
      "function authenticate(req, res, next) {",
      "  const token = req.headers.authorization?.split(' ')[1];",
      "  if (!token) return res.status(401).json({ error: 'No token provided' });",
      "  try {",
      "    const decoded = jwt.verify(token, process.env.JWT_SECRET);",
      "    req.user = decoded;",
      "    next();",
      "  } catch (err) {",
      "    res.status(401).json({ error: 'Invalid token' });",
      "  }",
      "}"
    ]), 'Extracts Bearer token, verifies with JWT secret, attaches decoded payload to req.user.'),
    e('Role-Based Authorization', 'Admin-only route protection.', codeBlock([
      "function authorize(...roles) {",
      "  return (req, res, next) => {",
      "    if (!roles.includes(req.user.role)) {",
      "      return res.status(403).json({ error: 'Insufficient permissions' });",
      "    }",
      "    next();",
      "  };",
      "}",
      "app.delete('/users/:id', authenticate, authorize('admin'), deleteUser);"
    ]), 'authorize factory checks user role against allowed roles, returns 403 if unauthorized.'),
    e('Session Authentication', 'Express-session based auth.', codeBlock([
      "const session = require('express-session');",
      "app.use(session({",
      "  secret: process.env.SESSION_SECRET,",
      "  resave: false,",
      "  saveUninitialized: false,",
      "  cookie: { secure: true, httpOnly: true, maxAge: 3600000 }",
      "}));",
      "function sessionAuth(req, res, next) {",
      "  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });",
      "  req.user = { id: req.session.userId, role: req.session.role };",
      "  next();",
      "}"
    ]), 'Session-based auth reads userId from session store and attaches user to req.'),
    e('Passport JWT Strategy', 'Using Passport for JWT auth.', codeBlock([
      "const passport = require('passport');",
      "const JwtStrategy = require('passport-jwt').Strategy;",
      "const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET };",
      "passport.use(new JwtStrategy(opts, (payload, done) => {",
      "  done(null, { id: payload.sub, role: payload.role });",
      "}));",
      "app.use(passport.initialize());",
      "app.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);"
    ]), 'Passport JWT strategy handles token extraction and verification with minimal boilerplate.'),
    e('API Key Authentication', 'Simple key-based auth for services.', codeBlock([
      "function apiKeyAuth(req, res, next) {",
      "  const key = req.headers['x-api-key'];",
      "  if (!key || key !== process.env.API_KEY) {",
      "    return res.status(401).json({ error: 'Invalid API key' });",
      "  }",
      "  next();",
      "}",
      "app.use('/api/service', apiKeyAuth, serviceRouter);"
    ]), 'Simple API key check from a custom header, suitable for server-to-server communication.')
  ],
  [
    m('Where is a JWT token typically sent?', ['Query parameter', 'Authorization header', 'Request body', 'Cookie'], 1, 'JWT is typically sent in the Authorization header using the Bearer scheme.'),
    m('What does auth middleware attach to the request on success?', ['req.token', 'req.user', 'req.auth', 'req.session'], 1, 'Auth middleware attaches the authenticated user object to req.user.'),
    m('What status code indicates missing authentication?', ['403', '401', '400', '500'], 1, '401 Unauthorized indicates missing or invalid authentication.'),
    m('What does passport.use() configure?', ['Session store', 'Authentication strategy', 'Cookie parser', 'Error handler'], 1, 'passport.use() configures an authentication strategy like JWT or local.'),
    m('How do you implement role-based access?', ['Check role in route handler', 'Authorize middleware after auth', 'Use Passport roles', 'Check in app.use()'], 1, 'Create an authorize middleware that checks req.user.role against allowed roles.'),
    m('What status code indicates valid auth but insufficient permissions?', ['401', '403', '400', '404'], 1, '403 Forbidden indicates the user is authenticated but does not have permission.')
  ]
);

/* =================== TOPIC 7: REST API DEVELOPMENT =================== */
addTopic('express-rest-api', 'REST API Development', 'intermediate', 30,
  ['REST (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP methods and stateless operations.',
   'Express is the most popular framework for building REST APIs in Node.js, providing routing, middleware, and request/response handling.',
   'REST API principles: resource-based URLs, HTTP methods as verbs (GET=read, POST=create, PUT/PATCH=update, DELETE=delete), and stateless communication.',
   'Best practices: versioning (/api/v1/), consistent error format, input validation, proper status codes, pagination, filtering, and HATEOAS links.'
  ],
  'REST API development is like building a library catalog system. Resources (books) are accessed via standard operations: GET to browse, POST to add, PUT to update, DELETE to remove. The system is stateless - each request contains all needed information.',
  [
    d('Resource-Based URL Design', 'URLs represent resources (nouns), not actions (verbs). Examples: GET /api/users (list), POST /api/users (create), GET /api/users/:id (read), PUT /api/users/:id (replace), PATCH /api/users/:id (partial update), DELETE /api/users/:id (delete). Nested resources: GET /api/users/:id/orders.'),
    d('HTTP Status Codes', '200 OK (success), 201 Created (POST), 204 No Content (DELETE), 400 Bad Request (validation), 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error. Use the correct code for every response.'),
    d('Request Validation', 'Validate request data before processing. Use express-validator or Joi to validate req.body, req.params, req.query. Return 400 with specific error messages for invalid data. Never trust client input - always validate and sanitize on the server.'),
    d('Pagination, Sorting, Filtering', 'Pagination: GET /api/users?page=1&limit=20 returns { data: [...], total, page, totalPages }. Sorting: ?sort=-createdAt (minus for descending). Filtering: ?status=active&role=admin. Search: ?q=searchTerm. API consumers expect consistent query parameter patterns.'),
    d('API Versioning', 'Version your API to maintain backward compatibility. Common strategies: URL prefix (/api/v1/), custom header (Accept: application/vnd.myapp.v1+json), or query parameter (?version=1). URL versioning is the most common and explicit approach.')
  ],
  'REST API development with Express is about structuring routes, handling requests consistently, and following RESTful conventions. Proper status codes, validation, error handling, and documentation make APIs reliable and developer-friendly.',
  [
    q('What is REST API design?', 'REST is an architectural style where resources are accessed via URLs, and operations are performed using HTTP methods. GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing. APIs are stateless and use standard status codes.'),
    q('How do you structure RESTful routes in Express?', 'Use Express.Router for each resource. Define routes: GET / (list), POST / (create), GET /:id (read), PUT /:id (replace), PATCH /:id (partial update), DELETE /:id (delete). Mount routers: app.use(\'/api/users\', userRouter).'),
    q('What status codes should a REST API use?', '200 GET/PUT/PATCH success, 201 POST success, 204 DELETE success, 400 validation error, 401 unauth, 403 forbidden, 404 not found, 409 conflict, 422 unprocessable, 429 rate limited, 500 server error.'),
    q('How do you implement validation in REST APIs?', 'Use express-validator or Joi libraries. Define validation rules for each endpoint. Apply validation middleware before the route handler. Return 400 with field-level error messages. Sanitize inputs to prevent injection.'),
    q('How do you implement pagination?', 'Accept page and limit query parameters. Calculate offset = (page - 1) * limit. Return paginated data with metadata: { data: [], total, page, limit, totalPages }. Validate that page and limit are positive integers.'),
    q('What is API versioning and why is it important?', 'Versioning allows making breaking changes without affecting existing clients. URL versioning (/api/v1/users, /api/v2/users) is most common. It enables gradual migration and maintains backward compatibility.'),
    q('How do you handle errors consistently?', 'Create a centralized error handler that formats all errors as: { error: { message, status, details? } }. Use custom error classes with status codes. Log errors server-side. Include stack traces only in development.'),
    q('How do you structure a large Express API project?', 'Organize by feature/resource: routes/, controllers/, middleware/, models/, validators/, config/, utils/. Each resource gets its own folder with route, controller, and validator files. Use dependency injection for testability.'),
    q('What are best practices for REST API naming?', 'Use plural nouns (/users not /user), kebab-case for multi-word (/blog-posts), lowercase, nested routes for related resources (/users/:id/orders), avoid verbs in URLs (use HTTP methods instead).'),
    q('How do you document a REST API?', 'Use OpenAPI/Swagger specification. Tools: swagger-jsdoc for auto-generating specs from JSDoc comments, swagger-ui-express for serving the documentation UI. Document endpoints, parameters, request bodies, responses, and authentication.')
  ],
  R(10,40,100,35,'#68a063','','GET /users','List') +
  R(10,85,100,35,'#0070f3','','POST /users','Create') +
  R(10,130,100,35,'#28a745','','GET /users/:id','Read') +
  R(10,175,100,35,'#ffc107','','DELETE /users/:id','Delete') +
  A(110,58,140,58) + A(110,103,140,103) + A(110,148,140,148) + A(110,193,140,193) +
  R(150,40,140,170,'#e83e8c','','Express API','Version / Validation / Auth / Pagination / Error Handling') +
  T(240,230,'REST API: Resource-based URLs with HTTP method verbs and consistent response patterns.',9,'#666','middle'),
  [
    e('CRUD Routes for a Resource', 'Standard RESTful route setup.', codeBlock([
      "const router = require('express').Router();",
      "router.get('/', controller.list);",
      "router.post('/', validateCreate, controller.create);",
      "router.get('/:id', controller.getById);",
      "router.put('/:id', validateUpdate, controller.update);",
      "router.delete('/:id', controller.delete);",
      "module.exports = router;"
    ]), 'Standard CRUD routes for a resource with validation middleware on mutation endpoints.'),
    e('Pagination Middleware', 'Parsing pagination params.', codeBlock([
      "function paginate(req, res, next) {",
      "  const page = Math.max(1, parseInt(req.query.page) || 1);",
      "  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));",
      "  req.pagination = { page, limit, offset: (page - 1) * limit };",
      "  next();",
      "}",
      "router.get('/', paginate, controller.list);"
    ]), 'Middleware that parses and validates pagination parameters, attaching them to req.pagination.'),
    e('Consistent Response Wrapper', 'Standard response format.', codeBlock([
      "function sendSuccess(res, data, status = 200) {",
      "  res.status(status).json({ success: true, data });",
      "}",
      "function sendError(res, message, status = 400) {",
      "  res.status(status).json({ success: false, error: message });",
      "}",
      "// Usage:",
      "sendSuccess(res, { user }, 201);",
      "sendError(res, 'User not found', 404);"
    ]), 'Helper functions that standardize successful and error response formats across the API.'),
    e('API Versioning with Express Router', 'Versioned API structure.', codeBlock([
      "const v1Router = require('./routes/v1');",
      "const v2Router = require('./routes/v2');",
      "app.use('/api/v1', v1Router);",
      "app.use('/api/v2', v2Router);"
    ]), 'Different versions of the API mounted at different URL prefixes, allowing gradual migration.'),
    e('Filtering and Sorting', 'Flexible query parameter handling.', codeBlock([
      "router.get('/', (req, res) => {",
      "  const { status, role, sort = '-createdAt', q } = req.query;",
      "  const filter = {};",
      "  if (status) filter.status = status;",
      "  if (role) filter.role = role;",
      "  if (q) filter.$text = { $search: q };",
      "  const sortOrder = sort.startsWith('-')",
      "    ? { [sort.slice(1)]: -1 }",
      "    : { [sort]: 1 };",
      "  // Query database with filter and sortOrder",
      "});"
    ]), 'Flexible filtering by multiple fields, search via q parameter, and sorting with direction prefix.')
  ],
  [
    m('What HTTP method is used for creating a resource?', ['GET', 'POST', 'PUT', 'PATCH'], 1, 'POST creates a new resource, returning 201 Created on success.'),
    m('What status code indicates a successful DELETE?', ['200', '201', '204', '301'], 2, '204 No Content is returned for successful DELETE operations.'),
    m('What is the responsibility of express-validator?', ['Parse JSON', 'Validate request data', 'Authenticate users', 'Log requests'], 1, 'express-validator validates request data against defined rules.'),
    m('How do you implement pagination query params?', ['page and size', 'page and limit', 'offset and count', 'start and end'], 1, 'page and limit are the standard query parameter names for pagination.'),
    m('What is the purpose of API versioning?', ['Increase speed', 'Maintain backward compatibility', 'Reduce code', 'Simplify routing'], 1, 'Versioning maintains backward compatibility while allowing API evolution.'),
    m('What tool documents Express REST APIs?', ['JSDoc', 'Swagger/OpenAPI', 'ESLint', 'Mocha'], 1, 'Swagger/OpenAPI with swagger-jsdoc and swagger-ui-express documents REST APIs.')
  ]
);

/* =================== TOPIC 8: REQUEST LIFECYCLE =================== */
addTopic('express-request-lifecycle', 'Request Lifecycle', 'intermediate', 25,
  ['The Express request lifecycle describes the complete path of an HTTP request from arrival to response, including all middleware and handler execution.',
   'Request enters Express, passes through the middleware chain in registration order, reaches the matching route handler, and the response flows back through the middleware stack.',
   'Understanding the lifecycle is crucial for debugging, performance optimization, and correctly ordering middleware like body parsers before routes and error handlers last.',
   'The lifecycle includes: request parsing -> middleware chain -> route matching -> handler execution -> response generation -> middleware (response phase) -> send to client.'
  ],
  'The request lifecycle is like a package traveling through a sorting facility. It goes through multiple conveyor belts (middleware) in a specific order, gets sorted to the right destination (route), is processed (handler), and then the response travels back through the belts in reverse.',
  [
    d('Request Arrival and Parsing', 'The HTTP request hits the Express server. Node.js parses headers and creates the IncomingMessage (req) and ServerResponse (res) objects. Express extends these with its own properties and methods. Body parsing middleware (express.json(), express.urlencoded()) reads the stream and populates req.body.'),
    d('Middleware Chain Execution', 'Registered middleware executes in order of registration (first to last). Each middleware can: modify req/res, call next() to continue, call next(err) for errors, or send a response to end the cycle. Middleware without a path runs for all requests; middleware with a path runs only for matching paths.'),
    d('Route Matching and Handler Execution', 'Express matches the request path and method against registered routes. The first matching route handler executes. Route handlers are just middleware that typically send a response. If no route matches, Express falls through to the 404 handler (or default "Cannot GET /" response).'),
    d('Response Generation and Send', 'Route handlers generate responses using res.json(), res.send(), res.render(), res.redirect(), etc. These methods set appropriate headers and send the response body. After sending, the response phase begins where middleware can still modify the response via res.on(\'finish\') listeners.'),
    d('Response Phase and Cleanup', 'After response is sent, Express triggers res.on(\'finish\') and res.on(\'close\') events. Middleware that wrapped res.end() can execute cleanup code. The connection may be kept alive for HTTP/1.1 or closed. Error handling middleware catches any errors from any phase.')
  ],
  'The Express request lifecycle is a linear pipeline: request arrives -> middleware chain runs -> route handler executes -> response is sent -> response phase runs. Understanding this flow is essential for proper middleware ordering, debugging, and performance optimization.',
  [
    q('What is the Express request lifecycle?', 'The lifecycle is: 1) Request arrives and is parsed, 2) Middleware chain executes in registration order, 3) Route handler matches and executes, 4) Response is generated and sent, 5) Response phase runs (finish/close events). Each middleware can pass control with next() or end the cycle by sending a response.'),
    q('In what order does middleware execute?', 'Middleware executes in the exact order it is registered using app.use() or router.use(). First registered runs first. Middleware with path prefixes only runs for matching paths. Order matters: body parsers before routes, logging early, error handlers last.'),
    q('What happens if no route matches?', 'If no route matches the request path and method, Express falls through all middleware and routes. The default behavior is to send a 404 response with "Cannot GET /path" (HTML). Custom 404 middleware should be added after all routes: app.use((req, res) => res.status(404).send(\'Not Found\')).'),
    q('What is the difference between next() and next(err)?', 'next() passes control to the next middleware in the chain. next(err) skips all remaining regular middleware and jumps directly to the first error-handling middleware (4 parameters). This is how errors propagate in Express.'),
    q('When does body parsing happen?', 'Body parsing middleware (express.json(), express.urlencoded()) must be registered before routes that need the parsed body. It reads the request stream, parses it, and populates req.body. Without it, req.body is undefined. It should come early in the middleware chain.'),
    q('How does the response flow back?', 'After the route handler sends a response (res.json(), etc.), Express sends headers and body to the client. The response phase begins: res.on(\'finish\') fires when headers are sent, res.on(\'close\') fires when connection closes. Middleware that wrapped res.end() can run cleanup code here.'),
    q('What is the purpose of res.on(\'finish\')?', 'res.on(\'finish\') fires when the response headers are sent to the OS. It is used for logging, metrics, and cleanup. It fires after the response is sent but before the connection closes. Unlike close, it fires even on successful responses.'),
    q('How does Express handle async route handlers?', 'In Express 4, async route handlers must manually catch errors and call next(err) (or use express-async-errors). In Express 5, async errors are automatically caught and passed to error middleware. Unhandled promise rejections in Express 4 can crash the process.'),
    q('What is the difference between req and res lifecycle?', 'req lifecycle: created by Node.js -> extended by Express -> populated by middleware -> consumed by route handler. res lifecycle: created by Node.js -> extended by Express -> built up by route handler -> sent to client -> finish/close events. They are independent but coordinated.'),
    q('Why does middleware order matter?', 'Middleware executes in registration order. A middleware that sends a response stops the chain. Body parsers must run before routes that read req.body. Auth middleware must run before protected routes. Error handlers must be last. Logging should be early. Order determines behavior.')
  ],
  R(10,40,130,35,'#68a063','','Request','Incoming') +
  A(140,58,170,58) +
  R(180,40,140,30,'#0070f3','','Middleware 1','Logging') +
  R(180,80,140,30,'#28a745','','Middleware 2','Body Parse') +
  R(180,120,140,30,'#ffc107','','Middleware 3','Auth') +
  A(180,70,180,78) + A(180,110,180,118) +
  A(320,78,350,78) + A(320,95,350,95) + A(320,135,350,135) +
  R(360,65,120,100,'#e83e8c','','Route Handler','Response') +
  A(360,165,330,165) +
  R(180,175,140,20,'#dc3545','','Error Handler','next(err)') +
  T(240,220,'Request Lifecycle: Parse -> Middleware Chain -> Route Handler -> Response -> Cleanup.',9,'#666','middle'),
  [
    e('Middleware Order Example', 'Correct ordering of middleware.', codeBlock([
      "const app = express();",
      "app.use(morgan('combined'));        // 1. Logging (early)",
      "app.use(express.json());            // 2. Body parsing (before routes)",
      "app.use(cors());                    // 3. CORS",
      "app.use(helmet());                  // 4. Security headers",
      "app.use(authMiddleware);            // 5. Auth (before protected routes)",
      "app.use('/api', apiRouter);         // 6. Routes",
      "app.use(notFoundHandler);           // 7. 404 (after routes)",
      "app.use(errorHandler);              // 8. Error handler (last)"
    ]), 'Middleware order: logging -> body parsing -> CORS -> security -> auth -> routes -> 404 -> error handler.'),
    e('Wrapping res.end for Metrics', 'Capturing response timing.', codeBlock([
      "function responseTime(req, res, next) {",
      "  const start = process.hrtime.bigint();",
      "  const originalEnd = res.end;",
      "  res.end = function(chunk, encoding, callback) {",
      "    const duration = Number(process.hrtime.bigint() - start) / 1e6;",
      "    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration.toFixed(2)}ms`);",
      "    return originalEnd.call(res, chunk, encoding, callback);",
      "  };",
      "  next();",
      "}"
    ]), 'Wraps res.end to measure and log response time after the response is sent.'),
    e('Async Handler Wrapper', 'Auto-catch async errors in Express 4.', codeBlock([
      "const asyncHandler = fn => (req, res, next) =>",
      "  Promise.resolve(fn(req, res, next)).catch(next);",
      "",
      "app.get('/users', asyncHandler(async (req, res) => {",
      "  const users = await User.findAll();",
      "  res.json(users);",
      "}));"
    ]), 'Wraps async route handlers to automatically catch promise rejections and forward to error middleware.'),
    e('Finish Event for Cleanup', 'Running code after response is sent.', codeBlock([
      "app.use((req, res, next) => {",
      "  res.on('finish', () => {",
      "    console.log('Response sent:', res.statusCode);",
      "    // Cleanup: close db connections, release locks",
      "  });",
      "  next();",
      "});"
    ]), 'Uses res.on(\'finish\') to run cleanup code after the response headers are sent.'),
    e('Error Propagation', 'How errors flow through the lifecycle.', codeBlock([
      "app.get('/error', (req, res, next) => {",
      "  throw new Error('Sync error');  // Caught by Express",
      "});",
      "app.get('/async-error', asyncHandler(async (req, res) => {",
      "  throw new Error('Async error'); // Caught by wrapper",
      "}));",
      "app.use((err, req, res, next) => {",
      "  res.status(500).json({ error: err.message });",
      "});"
    ]), 'Sync throws and async rejections (with wrapper) both reach error-handling middleware.')
  ],
  [
    m('In what order does Express execute middleware?', ['Reverse registration', 'Registration order', 'Alphabetical', 'Random'], 1, 'Middleware executes in the exact order it is registered.'),
    m('What happens when next(err) is called?', ['Continues normal chain', 'Jumps to error handler', 'Stops all processing', 'Restarts middleware'], 1, 'next(err) skips all regular middleware and goes to error-handling middleware.'),
    m('Where should body parsers be registered?', ['After routes', 'Before routes', 'At the end', 'Order does not matter'], 1, 'Body parsers must be registered before routes that need req.body.'),
    m('What event fires after response headers are sent?', ['close', 'finish', 'end', 'complete'], 1, 'res.on(\'finish\') fires when headers are sent to the OS.'),
    m('What is the default 404 response in Express?', ['JSON', 'HTML with Cannot GET', 'Empty', 'Redirect'], 1, 'Default 404 is an HTML page saying "Cannot GET /path".'),
    m('How does Express 5 handle async errors differently?', ['Manual catch required', 'Auto-catches async errors', 'Ignores async errors', 'Throws sync errors'], 1, 'Express 5 automatically catches promise rejections from async handlers.')
  ]
);

/* =================== TOPIC 9: VALIDATION =================== */
addTopic('express-validation', 'Validation', 'intermediate', 25,
  ['Validation ensures incoming data meets expected format, type, and constraints before processing, preventing bad data from reaching business logic and databases.',
   'Express validation is commonly done with express-validator (declarative rules), Joi (schema-based), or Zod (TypeScript-first). Validation middleware runs before route handlers.',
   'Input sanitization removes or escapes dangerous characters (XSS prevention). Validation checks data integrity. Both should be applied at the boundary (routes/middleware).',
   'Validation errors should return 400 with detailed field-level messages. Custom validators can check business rules (unique email, valid date ranges, etc.).'
  ],
  'Validation is like a security checkpoint at an airport. Every bag (request) is scanned against rules (validators). If something suspicious is found (invalid data), the passenger is stopped and told exactly what to fix before proceeding.',
  [
    d('express-validator Basics', 'express-validator uses chainable validation methods on req.body, req.query, req.params, req.headers. Example: body(\'email\').isEmail().normalizeEmail(). Returns validation result with errors array. Errors contain field, location, message, and value. Use validationResult(req) to check results.'),
    d('Joi Schema Validation', 'Joi defines schemas as objects: Joi.object({ email: Joi.string().email().required() }). Validation returns { error, value } where error has details array. Joi supports complex validation: cross-field, conditional, custom rules. Better for complex nested objects.'),
    d('Zod Validation (TypeScript)', 'Zod provides TypeScript-first validation with inferred types: z.object({ email: z.string().email() }). Parsing returns typed object or throws ZodError. Integrates with express via middleware. Great for end-to-end type safety from request to database.'),
    d('Sanitization and Normalization', 'Sanitization transforms input: trim(), escape(), normalizeEmail(), toLowerCase(). Prevents issues like leading/trailing whitespace, XSS via script injection. Chain after validation: body(\'name\').trim().escape().isLength({ min: 1 }).'),
    d('Custom Validators and Error Handling', 'Custom validators: body(\'email\').custom(async (value) => { const exists = await User.findByEmail(value); if (exists) throw new Error(\'Email taken\'); }). Error formatting: return 400 with { errors: [{ field, message }] }. Consistent structure helps frontend display errors.')
  ],
  'Validation is a critical security and data integrity layer. Use declarative libraries (express-validator, Joi, Zod) for maintainable rules. Validate at the boundary, sanitize to prevent injection, and return clear error messages for better UX.',
  [
    q('What is the purpose of validation in Express?', 'Validation ensures incoming request data meets expected format, types, and constraints before reaching business logic. It prevents invalid data from corrupting databases and provides clear feedback to API consumers.'),
    q('How does express-validator work?', 'Use chainable methods on body, query, params: body(\'email\').isEmail().normalizeEmail(). In route handler, call validationResult(req). If errors exist, return 400 with formatted errors. Works as middleware chain.'),
    q('What is the difference between validation and sanitization?', 'Validation checks if data meets criteria (rejects invalid). Sanitization transforms data (trims, escapes, normalizes) to make it safe/clean. Often chained: validate then sanitize.'),
    q('How do you validate nested objects with Joi?', 'Use Joi.object() with nested keys: Joi.object({ user: Joi.object({ name: Joi.string().required() }) }). Supports array validation: Joi.array().items(Joi.object({ id: Joi.number() })).'),
    q('What is Zod and how does it differ?', 'Zod is TypeScript-first schema validation. Schemas infer TypeScript types: z.string().email() -> string. Use parse() for strict validation or safeParse() for typed result. Great for end-to-end type safety.'),
    q('How do you return validation errors to the client?', 'Return 400 status with structured JSON: { success: false, errors: [{ field, message, value }] }. Use validationResult(req).array() to get formatted errors. Frontend can display field-specific messages.'),
    q('What are common validation rules?', 'isEmail, isLength, isNumeric, isUUID, isISO8601, isIn, matches regex, custom async validators for DB uniqueness, conditional validation (if/else), cross-field validation (password/confirm).'),
    q('How do you validate query parameters?', 'Use query() instead of body(): query(\'page\').isInt({ min: 1 }).toInt(), query(\'sort\').isIn([\'asc\', \'desc\']). Validation runs on req.query object.'),
    q('How do you create custom async validators?', 'Use .custom(async (value) => { const exists = await db.check(value); if (exists) throw new Error(\'Already exists\'); }). The custom function can be async and throw or return a promise.'),
    q('Where should validation middleware be placed?', 'Before route handlers that need validated data. In chain: app.post(\'/users\', validateUser, createUser). Or as global middleware if all routes need it. Validation errors returned before handler executes.')
  ],
  R(10,40,140,35,'#68a063','','Request','Input') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Validator','express-validator') +
  R(190,90,140,35,'#28a745','','Sanitizer','trim/escape') +
  A(330,58,360,58) + A(330,108,360,108) +
  R(370,40,100,35,'#ffc107','','Valid','Data') +
  A(370,75,370,95) +
  R(230,110,140,35,'#17a2b8','','Errors','400 Response') +
  T(240,180,'Validation: Input -> Validate -> Sanitize -> Valid Data or 400 Error.',9,'#666','middle'),
  [
    e('express-validator Chain', 'Email and password validation.', codeBlock([
      "const { body, validationResult } = require('express-validator');",
      "",
      "const validateRegister = [",
      "  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),",
      "  body('password').isLength({ min: 8 }).withMessage('Min 8 characters'),",
      "  body('confirmPassword').custom((value, { req }) => {",
      "    if (value !== req.body.password) throw new Error('Passwords must match');",
      "    return true;",
      "  }),",
      "  (req, res, next) => {",
      "    const errors = validationResult(req);",
      "    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });",
      "    next();",
      "  }",
      "]"
    ]), 'Validates email format, password length, and password confirmation with custom validator.'),
    e('Joi Schema Validation', 'Complex nested object validation.', codeBlock([
      "const Joi = require('joi');",
      "",
      "const schema = Joi.object({",
      "  user: Joi.object({",
      "    name: Joi.string().min(2).max(50).required(),",
      "    email: Joi.string().email().required(),",
      "    age: Joi.number().integer().min(18).max(120)",
      "  }).required(),",
      "  tags: Joi.array().items(Joi.string()).max(5)",
      "});",
      "",
      "function validate(schema) {",
      "  return (req, res, next) => {",
      "    const { error, value } = schema.validate(req.body, { abortEarly: false });",
      "    if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });",
      "    req.body = value; // Use sanitized value",
      "    next();",
      "  };",
      "}"
    ]), 'Joi schema for nested user object with required fields and array of tags.'),
    e('Zod with TypeScript', 'Type-safe validation.', codeBlock([
      "import { z } from 'zod';",
      "",
      "const CreateUserSchema = z.object({",
      "  name: z.string().min(2).max(100),",
      "  email: z.string().email(),",
      "  role: z.enum(['user', 'admin']).default('user')",
      "});",
      "",
      "app.post('/users', (req, res, next) => {",
      "  const result = CreateUserSchema.safeParse(req.body);",
      "  if (!result.success) {",
      "    return res.status(400).json({ errors: result.error.flatten().fieldErrors });",
      "  }",
      "  req.validatedBody = result.data; // Fully typed",
      "  next();",
      "});"
    ]), 'Zod schema infers TypeScript types. safeParse returns typed success/error. Validated data is fully typed.'),
    e('Sanitization Chain', 'Trim and escape user input.', codeBlock([
      "const { body } = require('express-validator');",
      "",
      "body('comment')",
      "  .trim()",
      "  .escape()",
      "  .isLength({ min: 1, max: 1000 })",
      "  .withMessage('Comment must be 1-1000 characters')"
    ]), 'Trim removes whitespace, escape prevents XSS, isLength enforces bounds. Order matters: trim first, then escape.'),
    e('Custom Async Validator', 'Check database uniqueness.', codeBlock([
      "body('email').custom(async (email) => {",
      "  const user = await User.findOne({ email });",
      "  if (user) {",
      "    throw new Error('Email already registered');",
      "  }",
      "  return true;",
      "}).normalizeEmail()"
    ]), 'Async custom validator checks database for existing email. Throws error to fail validation. Normalizes after validation passes.')
  ],
  [
    m('Which library is TypeScript-first for validation?', ['Joi', 'express-validator', 'Zod', 'Yup'], 2, 'Zod provides TypeScript type inference from validation schemas.'),
    m('What method checks validation results in express-validator?', ['validationResult(req)', 'req.validate()', 'checkErrors()', 'validate()'], 0, 'validationResult(req) returns the validation result with isEmpty() and array() methods.'),
    m('What does sanitization do?', ['Rejects invalid data', 'Transforms/cleans data', 'Encrypts data', 'Logs data'], 1, 'Sanitization transforms input (trim, escape, normalize) to make it safe.'),
    m('How do you validate query params with express-validator?', ['query()', 'params()', 'queryString()', 'req.query()'], 0, 'Use query() chain: query(\'page\').isInt().')
  ]
);

/* =================== TOPIC 10: RATE LIMITING =================== */
addTopic('express-rate-limiting', 'Rate Limiting', 'intermediate', 20,
  ['Rate limiting controls the number of requests a client can make within a time window, protecting APIs from abuse, brute force attacks, and ensuring fair resource usage.',
   'Express rate limiting is commonly implemented with express-rate-limit (memory store) or express-rate-limit with Redis for distributed applications.',
   'Key strategies: fixed window (simple, burst at edges), sliding window (smoother), token bucket (granular control). Configuration includes windowMs, max requests, keyGenerator, and handler.',
   'Apply globally for general protection, stricter on auth endpoints (login, register), and use different limits for authenticated vs anonymous users.'
  ],
  'Rate limiting is like a nightclub bouncer who only lets a certain number of people in per hour. If too many try to enter at once, the rest must wait outside until the next hour starts.',
  [
    d('Fixed Window Counter', 'Simplest algorithm: divide time into fixed windows. Count requests per window. When window resets, counter resets. Problem: burst traffic at window boundaries (e.g., 100 requests at end of window + 100 at start of next = 200 in 2 seconds). Good for basic protection, easy to implement.'),
    d('Sliding Window Log', 'Records timestamp of each request. To check limit, count requests within the sliding window from now. More accurate, no boundary bursts, but stores all timestamps (memory intensive). Sliding window counter is a hybrid approximation using fixed windows with weighted counts.'),
    d('Token Bucket Algorithm', 'Each client has a bucket with tokens. Requests consume tokens. Tokens refill at a fixed rate. If bucket empty, request rejected. Allows bursts up to bucket size while maintaining average rate. More complex but provides smooth rate limiting.'),
    d('express-rate-limit Configuration', 'Options: windowMs (window duration), max (max requests), message (response), standardHeaders (RateLimit-* headers), legacyHeaders (X-RateLimit-*), keyGenerator (identifies client, default: IP), skip (condition to bypass), handler (custom response function). Use Redis store for multi-instance deployments.'),
    d('Strategic Rate Limiting', 'Apply globally: app.use(rateLimiter) for general API protection. Stricter on auth: login = 5/min, register = 3/hour. Higher limits for authenticated users (by user ID). Skip for health checks, static assets. Use different stores for distributed systems. Monitor and adjust based on traffic patterns.')
  ],
  'Rate limiting is essential for production APIs. Start with express-rate-limit for simplicity. Use Redis for distributed deployments. Tailor limits: strict on auth endpoints, generous on read-only endpoints. Monitor rate limit hits to detect abuse or adjust limits.',
  [
    q('What is rate limiting?', 'Rate limiting restricts the number of requests a client can make within a time window. It prevents abuse, brute force attacks, and ensures fair resource allocation. Commonly implemented per IP, user ID, or API key.'),
    q('What are the main rate limiting algorithms?', 'Fixed window (simple, boundary bursts), sliding window log (accurate, memory heavy), sliding window counter (hybrid), token bucket (smooth, burst allowance). Each has trade-offs between accuracy, memory, and implementation complexity.'),
    q('How do you configure express-rate-limit?', 'const rateLimit = require(\"express-rate-limit\"); const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: \"Too many requests\" }); app.use(limiter); Creates a 100 req/15min limit per IP.'),
    q('What headers does rate limiting add?', 'RateLimit-Limit (max requests), RateLimit-Remaining (remaining in window), RateLimit-Reset (seconds until reset). Also legacy: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. Enabled with standardHeaders/legacyHeaders options.'),
    q('How do you implement different limits for authenticated users?', 'Use keyGenerator to identify by user ID instead of IP: keyGenerator: (req) => req.user?.id || req.ip. Or create separate limiters: strictLimiter for anonymous, generousLimiter for authenticated. Apply conditionally with skip option.'),
    q('What is the token bucket algorithm?', 'Each client has a bucket with tokens. Each request consumes a token. Tokens refill at a fixed rate. If bucket empty, request rejected. Allows controlled bursts up to bucket size while maintaining average rate limit.'),
    q('How do you skip rate limiting for certain routes?', 'Use skip option: skip: (req, res) => req.path.startsWith(\"/health\") || req.path.startsWith(\"/static\"). Or apply limiter only to specific routes: app.use(\"/api/\", apiLimiter). Health checks and static assets typically skipped.'),
    q('How do you use Redis for distributed rate limiting?', 'Install rate-limit-redis: const RedisStore = require(\"rate-limit-redis\"); const limiter = rateLimit({ store: new RedisStore({ client: redisClient }), ... }). All instances share the same Redis counters.'),
    q('What status code should rate limiting return?', '429 Too Many Requests. Include Retry-After header with seconds until reset. Body should explain the limit and when to retry. Custom handler can format this response.'),
    q('How do you handle rate limiting for authenticated users?', 'Identify by user ID instead of IP. Higher limits for authenticated (trusted) users. Apply stricter limits on sensitive endpoints (password reset, payments). Use separate limiters for auth vs general API.')
  ],
  R(10,40,140,35,'#68a063','','Client','Request') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Fixed Window','Counter') +
  R(190,90,140,35,'#28a745','','Sliding Window','Log') +
  R(190,140,140,35,'#ffc107','','Token Bucket','Smooth') +
  A(330,58,360,58) + A(330,108,360,108) + A(330,158,360,158) +
  R(370,40,100,160,'#e83e8c','','Rate Limiter','429 if Exceeded') +
  T(240,230,'Rate Limiting: Control request frequency with fixed/sliding windows or token bucket.',9,'#666','middle'),
  [
    e('Basic Rate Limiter', 'Global API protection.', codeBlock([
      "const rateLimit = require('express-rate-limit');",
      "",
      "const limiter = rateLimit({",
      "  windowMs: 15 * 60 * 1000, // 15 minutes",
      "  max: 100, // limit each IP to 100 requests per window",
      "  message: 'Too many requests, please try again later',",
      "  standardHeaders: true,",
      "  legacyHeaders: true",
      "});",
      "app.use(limiter);"
    ]), 'Global rate limiter: 100 requests per 15 minutes per IP with standard rate limit headers.'),
    e('Strict Auth Limiter', 'Protect login endpoint from brute force.', codeBlock([
      "const loginLimiter = rateLimit({",
      "  windowMs: 15 * 60 * 1000, // 15 minutes",
      "  max: 5, // 5 attempts per window",
      "  message: 'Too many login attempts, please try again in 15 minutes',",
      "  skipSuccessfulRequests: true // Don't count successful logins",
      "});",
      "app.post('/login', loginLimiter, loginHandler);"
    ]), 'Strict limiter on login: 5 attempts per 15 min, skip counting successful logins.'),
    e('Per-User Rate Limiting', 'Higher limits for authenticated users.', codeBlock([
      "const userLimiter = rateLimit({",
      "  windowMs: 60 * 60 * 1000, // 1 hour",
      "  max: 1000, // 1000 requests/hour for authenticated users",
      "  keyGenerator: (req) => req.user?.id || req.ip,",
      "  skip: (req) => !req.user // Skip for unauthenticated",
      "});",
      "app.use('/api', userLimiter);"
    ]), 'Uses user ID as key for authenticated users, falls back to IP for anonymous. Higher limits for known users.'),
    e('Redis Store for Distributed', 'Shared rate limit across instances.', codeBlock([
      "const RedisStore = require('rate-limit-redis');",
      "const { createClient } = require('redis');",
      "",
      "const redisClient = createClient({ url: process.env.REDIS_URL });",
      "await redisClient.connect();",
      "",
      "const limiter = rateLimit({",
      "  store: new RedisStore({",
      "    sendCommand: (...args) => redisClient.sendCommand(args)",
      "  }),",
      "  windowMs: 15 * 60 * 1000,",
      "  max: 100",
      "});"
    ]), 'Redis store shares rate limit state across multiple server instances.'),
    e('Custom Handler', 'Custom 429 response format.', codeBlock([
      "const limiter = rateLimit({",
      "  windowMs: 15 * 60 * 1000,",
      "  max: 100,",
      "  handler: (req, res) => {",
      "    res.status(429).json({",
      "      error: 'Rate limit exceeded',",
      "      retryAfter: Math.ceil(res.get('Retry-After') || 900)",
      "    });",
      "  }",
      "});"
    ]), 'Custom handler returns structured JSON error with retry-after information.')
  ],
  [
    m('What is the default key generator in express-rate-limit?', ['User ID', 'API Key', 'IP Address', 'Session ID'], 2, 'Default keyGenerator uses req.ip (client IP address).'),
    m('What algorithm does express-rate-limit use by default?', ['Token bucket', 'Fixed window', 'Sliding window', 'Leaky bucket'], 1, 'express-rate-limit uses fixed window counter by default.'),
    m('What HTTP status code indicates rate limited?', ['400', '401', '403', '429'], 3, '429 Too Many Requests is the standard status code for rate limiting.'),
    m('How do you apply different limits to different routes?', ['Create separate limiters', 'Use max option', 'Use windowMs', 'Use message'], 0, 'Create separate rateLimit instances with different configs and apply to specific routes.'),
    m('What does skipSuccessfulRequests do?', ['Skips all requests', 'Does not count successful responses', 'Skips failed requests', 'Skips unauthenticated'], 1, 'When true, successful requests (2xx) do not count toward the rate limit.'),
    m('How do you use Redis with express-rate-limit?', ['rate-limit-redis package', 'Built-in Redis support', 'Custom store only', 'Not possible'], 0, 'Use rate-limit-redis package with RedisStore for distributed rate limiting.')
  ]
);

/* =================== TOPIC 11: HELMET =================== */
addTopic('express-helmet', 'Helmet', 'intermediate', 20,
  ['Helmet is a middleware collection that sets security-related HTTP response headers to protect Express apps from common web vulnerabilities.',
   'It includes 15+ smaller middleware functions that set headers like Content-Security-Policy, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, and X-Content-Type-Options.',
   'Helmet provides sensible defaults while allowing per-header customization for specific application needs, such as CSP directives for third-party scripts.',
   'Using Helmet is a security best practice that helps prevent clickjacking, XSS, MIME sniffing, and other common attacks with minimal configuration.'
  ],
  'Helmet is like putting armor on your Express application. It adds protective layers (security headers) that tell browsers to behave more securely when interacting with your site.',
  [
    d('What Helmet Protects Against', 'Clickjacking (X-Frame-Options), Cross-Site Scripting (X-XSS-Protection, Content-Security-Policy), MIME sniffing attacks (X-Content-Type-Options), SSL stripping (Strict-Transport-Security), referrer leakage (Referrer-Policy), permission overreach (Permissions-Policy).'),
    d('Content Security Policy (CSP)', 'CSP controls which resources can load on your page. Helmet sets Content-Security-Policy header. Configure: default-src, script-src, style-src, img-src, connect-src, font-src, frame-src. Use \'self\' for same-origin, specific domains for third-party resources.'),
    d('Helmet Configuration Options', 'helmet() with defaults is recommended. Customize: helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["\'self\'"], scriptSrc: ["\'self\'", "example.com"] } }, frameguard: { action: "deny" } }). Disable a header: contentSecurityPolicy: false.'),
    d('Using CSP with Development', 'CSP can block inline scripts and eval(). Development tools may need \'unsafe-eval\' for source maps, \'unsafe-inline\' for HMR. Use reportOnly mode for testing: helmet.contentSecurityPolicy({ useDefaults: true, reportOnly: true }).'),
    d('HSTS and HTTPS Enforcement', 'Strict-Transport-Security tells browsers to always use HTTPS. Helmet sets max-age (seconds), includeSubDomains, preload. Set high max-age (1 year = 31536000) for production. Use preload to submit to browser preload lists for permanent HTTPS enforcement.')
  ],
  'Helmet is an essential security middleware for Express applications. Its 15+ security headers protect against a wide range of web vulnerabilities. Use default configuration for most apps, customize CSP for third-party resources.',
  [
    q('What is Helmet?', 'Helmet is a collection of Express middleware functions that set security-related HTTP headers. It helps protect against common web vulnerabilities by configuring headers like Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, and X-Content-Type-Options.'),
    q('What headers does Helmet set?', 'Content-Security-Policy, Cross-Origin-Embedder-Policy, Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy, Expect-CT, Origin-Agent-Cluster, Referrer-Policy, Strict-Transport-Security, X-Content-Type-Options, X-DNS-Prefetch-Control, X-Download-Options, X-Frame-Options, X-Permitted-Cross-Domain-Policies, X-Powered-By (removes), X-XSS-Protection.'),
    q('What is Content-Security-Policy?', 'CSP is a header that controls which resources (scripts, styles, images, fonts) the browser is allowed to load. It prevents XSS attacks by restricting inline scripts and external resource origins. Configured via directives like default-src, script-src, style-src.'),
    q('How do you use Helmet with custom CSP?', 'helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["\'self\'"], scriptSrc: ["\'self\'", "https://cdn.example.com"], imgSrc: ["\'self\'", "data:"] } } }). Avoid \'unsafe-inline\' where possible.'),
    q('How do you test CSP without breaking your site?', 'Use reportOnly mode: helmet({ contentSecurityPolicy: { useDefaults: true, reportOnly: true } }). This sends violations as reports (CSP-Report-Only header) instead of blocking. Check browser console for violation reports, then adjust policy.'),
    q('What is X-Frame-Options?', 'X-Frame-Options prevents clickjacking by controlling whether your site can be embedded in iframes. Options: DENY (no embedding), SAMEORIGIN (only same site), ALLOW-FROM uri (deprecated). Helmet defaults to SAMEORIGIN.'),
    q('What is HSTS and how does Helmet configure it?', 'HTTP Strict-Transport-Security tells browsers to always use HTTPS. helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }). Once set, browsers will refuse HTTP connections to your domain.'),
    q('Can you disable specific Helmet headers?', 'Yes, pass false to the specific middleware: helmet({ frameguard: false, hsts: false }). Useful when a header conflicts with your hosting platform or specific requirements.'),
    q('How does Helmet remove X-Powered-By?', 'Helmet removes the X-Powered-By: Express header by default. This prevents attackers from knowing your server technology. It is a simple but effective security measure against targeted exploitation.'),
    q('What is Permissions-Policy (formerly Feature-Policy)?', 'Permissions-Policy controls which browser features your site can use: camera, microphone, geolocation, notifications, payment. Helmet sets restrictive defaults. Configure: helmet.permissionsPolicy({ features: { camera: ["\'self\'"], geolocation: [] } }).')
  ],
  R(10,40,140,35,'#68a063','','Request','Incoming') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Helmet','Security Headers') +
  R(190,90,140,35,'#28a745','','CSP','Content-Security-Policy') +
  R(190,140,140,35,'#ffc107','','HSTS','Strict-Transport-Security') +
  A(330,60,360,60) + A(330,108,360,108) + A(330,158,360,158) +
  R(370,40,100,150,'#e83e8c','','Response','Secured') +
  T(240,220,'Helmet: Security headers middleware protecting against XSS, clickjacking, and other web vulnerabilities.',9,'#666','middle'),
  [
    e('Default Helmet Usage', 'Apply all security headers with defaults.', codeBlock([
      "const helmet = require('helmet');",
      "app.use(helmet()); // Apply all default security headers"
    ]), 'One line adds 15+ security headers with sensible defaults. Place early in middleware chain.'),
    e('Custom CSP Configuration', 'Allow specific external sources.', codeBlock([
      "app.use(helmet({",
      "  contentSecurityPolicy: {",
      "    directives: {",
      "      defaultSrc: [\"'self'\"],",
      "      scriptSrc: [\"'self'\", \"'unsafe-inline'\", 'cdn.example.com'],",
      "      styleSrc: [\"'self'\", \"'unsafe-inline'\"],",
      "      imgSrc: [\"'self'\", 'data:', '*.cloudfront.net'],",
      "      connectSrc: [\"'self'\", 'api.example.com'],",
      "      fontSrc: [\"'self'\", 'fonts.googleapis.com'],",
      "      objectSrc: [\"'none'\"],",
      "      upgradeInsecureRequests: []",
      "    }",
      "  }",
      "}));"
    ]), 'Custom Content-Security-Policy directives controlling resources from specific domains.'),
    e('HSTS with Preload', 'Enforce HTTPS with preload.', codeBlock([
      "app.use(helmet({",
      "  hsts: {",
      "    maxAge: 31536000, // 1 year in seconds",
      "    includeSubDomains: true,",
      "    preload: true",
      "  }",
      "}));"
    ]), 'Tells browsers to always use HTTPS for one year, including subdomains. Preload for browser preload lists.'),
    e('Disabling Specific Headers', 'Remove headers that conflict.', codeBlock([
      "app.use(helmet({",
      "  frameguard: false, // Allow embedding in iframes",
      "  hsts: false,      // HTTPS handled by hosting platform",
      "  crossOriginEmbedderPolicy: false, // Allow cross-origin resources",
      "}));"
    ]), 'Disable specific headers when they conflict with your hosting provider or application requirements.'),
    e('CSP Report Only', 'Test CSP without blocking.', codeBlock([
      "app.use(helmet({",
      "  contentSecurityPolicy: {",
      "    useDefaults: true,",
      "    reportOnly: true,",
      "    directives: {",
      "      reportUri: '/csp-violation-report'",
      "    }",
      "  }",
      "}));"
    ]), 'Report-Only mode sends violation reports without blocking resources. Check browser console for violations.')
  ],
  [
    m('What class of vulnerabilities does Helmet primarily protect against?', ['SQL injection', 'XSS and clickjacking', 'DDoS attacks', 'CSRF'], 1, 'Helmet protects against XSS, clickjacking, MIME sniffing, and other browser-based attacks via security headers.'),
    m('What CSP directive controls script sources?', ['style-src', 'script-src', 'img-src', 'connect-src'], 1, 'script-src directive controls which scripts the browser is allowed to execute.'),
    m('What header prevents clickjacking?', ['CSP', 'X-Frame-Options', 'HSTS', 'X-Content-Type-Options'], 1, 'X-Frame-Options prevents your site from being embedded in iframes on other sites.'),
    m('What does Helmet do with X-Powered-By?', ['Sets it to Express', 'Removes it', 'Encrypts it', 'Leaves it'], 1, 'Helmet removes the X-Powered-By: Express header to hide server technology.'),
    m('How many seconds is 1 year for HSTS maxAge?', ['86400', '31536000', '2592000', '604800'], 1, '31536000 seconds = 1 year, the recommended maxAge for HSTS in production.'),
    m('What mode allows testing CSP without blocking resources?', ['Report-Only', 'Test mode', 'Debug mode', 'Preview mode'], 0, 'CSP Report-Only mode sends violation reports without blocking, useful for testing.')
  ]
);

/* =================== TOPIC 12: CORS =================== */
addTopic('express-cors', 'CORS', 'beginner', 20,
  ['CORS (Cross-Origin Resource Sharing) is a security mechanism that controls which origins, methods, and headers are allowed when browsers make cross-origin requests.',
   'Express CORS middleware (cors package) configures Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, and Access-Control-Allow-Credentials headers.',
   'CORS errors occur when a frontend from one origin (e.g., http://localhost:3000) tries to access an API from a different origin (e.g., http://localhost:5000) without proper headers.',
   'Configuration: specific origin for production, wildcard (*) for public APIs, credentials support for cookies/authorization headers, and preflight (OPTIONS) handling.'
  ],
  'CORS is like a guest list for a party. The server (bouncer) checks the browser\'s ID (origin) against the allowed list. If the origin is not on the list, the browser refuses to share any data from the server.',
  [
    d('Same-Origin vs Cross-Origin', 'Same-origin: same protocol (https), host (example.com), port (443). Different port, host, or protocol = cross-origin. Browsers block cross-origin requests by default for security (prevents one site from reading another site\'s data). CORS selectively relaxes these restrictions.'),
    d('Simple vs Preflight Requests', 'Simple requests: GET, HEAD, POST with content types text/plain, multipart/form-data, application/x-www-form-urlencoded. No custom headers. Preflight requests: all other requests send an OPTIONS preflight to check permissions before the actual request. CORS middleware handles both.'),
    d('CORS Headers', 'Access-Control-Allow-Origin (allowed origins), Access-Control-Allow-Methods (GET, POST, PUT, DELETE, etc.), Access-Control-Allow-Headers (custom headers like Authorization, Content-Type), Access-Control-Allow-Credentials (cookies/auth), Access-Control-Max-Age (cache preflight), Access-Control-Expose-Headers (client-accessible response headers).'),
    d('Credentials and Cookies', 'For cross-origin cookies and auth: set credentials: true in CORS config and withCredentials: true in fetch/axios. Access-Control-Allow-Origin must be a specific origin (not *) when using credentials. Cookies must have SameSite=None and Secure.'),
    d('CORS for Production', 'Use specific origins (not *) for production. Use environment variables: const allowedOrigins = process.env.CORS_ORIGIN?.split(\',\') || [\'http://localhost:3000\']. Set multi-origin whitelist for staging/ prod. Handle OPTIONS preflight correctly.')
  ],
  'CORS is a browser security mechanism that Express apps must configure correctly to serve frontend clients. Use specific origins in production, enable credentials when needed, and understand the simple vs preflight distinction.',
  [
    q('What is CORS and why is it needed?', 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls cross-origin HTTP requests. It is needed because browsers block cross-origin requests by default (Same-Origin Policy). CORS headers tell the browser which origins are allowed to access resources.'),
    q('How does express CORS middleware work?', 'The cors npm package intercepts responses and adds appropriate Access-Control-* headers. It handles simple requests (headers added to response) and preflight requests (responds to OPTIONS with allowed methods/headers). Configure via options object or per-route.'),
    q('What is a preflight request?', 'A preflight request is an OPTIONS request sent by the browser before the actual cross-origin request. It asks the server which methods, headers, and origins are allowed. The server responds with CORS headers. The actual request is sent only if the preflight succeeds.'),
    q('What are common CORS configuration options?', 'origin (allowed origins, or function for dynamic check), methods (allowed HTTP methods: GET, POST, PUT, DELETE, etc.), allowedHeaders (custom headers: Content-Type, Authorization), credentials (enable cookies/auth), maxAge (seconds to cache preflight).'),
    q('How do you enable credentials with CORS?', 'Set credentials: true in cors options and withCredentials: true in client fetch. Access-Control-Allow-Origin must be a specific origin (not *). Cookies must have SameSite=None and Secure. Only needed for authenticated cross-origin requests.'),
    q('How do you allow multiple origins?', 'Use a function: origin: function(origin, callback) { const allowed = [\'https://site1.com\', \'https://site2.com\']; if (!origin || allowed.includes(origin)) callback(null, true); else callback(new Error(\'Not allowed by CORS\')); }.'),
    q('What is the difference between * and specific origins?', '* allows any origin (public APIs). Specific origins restrict access to listed domains. Specific origins are required for credentials: true. Production APIs typically use specific origins. Development often uses * or environment-based configuration.'),
    q('How do you handle CORS with Express subdomain APIs?', 'Use dynamic origin check: origin: (origin, cb) => { const host = new URL(origin).hostname; cb(null, host.endsWith(\'.example.com\') || ALLOWED.includes(origin)); }. Allows subdomains and specific origins.'),
    q('How do you test CORS configuration?', 'Use curl to check headers: curl -H "Origin: http://example.com" -I http://localhost:3000/api. Check for Access-Control-Allow-Origin in response. Browser dev tools network tab shows CORS errors. Use online CORS testers or options endpoint check.'),
    q('How does CORS relate to security?', 'CORS is NOT authentication. It only controls which origins can read responses. Any origin can still send requests (POST data). Authentication and authorization are separate. CORS with credentials exposes cookies to allowed origins only.')
  ],
  R(10,40,140,35,'#68a063','','Browser','http://localhost:3000') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Preflight','OPTIONS') +
  A(190,75,190,95) +
  R(190,95,140,35,'#28a745','','Actual Request','GET /api') +
  A(330,113,360,113) +
  R(370,70,100,50,'#ffc107','','CORS Config','Access-Control-*') +
  A(370,50,370,40) +
  R(10,160,140,25,'#e83e8c','','Response','Headers Set') +
  T(240,200,'CORS: Browser sends Origin, server responds with Access-Control-Allow-Origin headers.',9,'#666','middle'),
  [
    e('Basic CORS for All Origins', 'Simple configuration for public APIs.', codeBlock([
      "const cors = require('cors');",
      "app.use(cors()); // Allow all origins (public API)"
    ]), 'Enables CORS for all origins with default settings. Suitable for public APIs.'),
    e('Specific Origin with Options', 'Restrict to specific frontend.', codeBlock([
      "const corsOptions = {",
      "  origin: 'https://myapp.example.com',",
      "  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],",
      "  allowedHeaders: ['Content-Type', 'Authorization'],",
      "  credentials: true,",
      "  maxAge: 3600",
      "};",
      "app.use(cors(corsOptions));"
    ]), 'Restricts to specific origin, allows standard methods and auth headers, enables credentials.'),
    e('Dynamic Origin Function', 'Allow multiple origins with fallback.', codeBlock([
      "const allowed = ['https://app.example.com', 'https://staging.example.com'];",
      "app.use(cors({",
      "  origin: (origin, cb) => {",
      "    if (!origin || allowed.includes(origin)) return cb(null, true);",
      "    cb(new Error('Not allowed by CORS'));",
      "  },",
      "  credentials: true",
      "}));"
    ]), 'Dynamic origin check allows multiple specific origins. No origin check for same-origin or non-browser requests.'),
    e('Per-Route CORS', 'Different CORS for different routes.', codeBlock([
      "const cors = require('cors');",
      "",
      "app.get('/public', cors(), publicHandler);",
      "app.get('/api/users', cors({ origin: 'https://dashboard.example.com' }), usersHandler);",
      "app.options('/api/users', cors()); // Handle preflight"
    ]), 'Public endpoints use open CORS, sensitive endpoints use restricted CORS.'),
    e('CORS with Auth and Cookies', 'Enabling cross-origin credentials.', codeBlock([
      "app.use(cors({",
      "  origin: 'https://myapp.example.com',",
      "  credentials: true",
      "}));",
      "",
      "// Client-side (fetch):",
      "fetch('https://api.example.com/user', {",
      "  credentials: 'include'",
      "});"
    ]), 'Enables cookies and auth headers cross-origin. Origin must be specific (not *). Client must set credentials: include.')
  ],
  [
    m('What header does CORS add to specify allowed origins?', ['Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials'], 1, 'Access-Control-Allow-Origin specifies which origins can access the resource.'),
    m('What HTTP method is used for preflight requests?', ['GET', 'POST', 'OPTIONS', 'HEAD'], 2, 'Preflight requests use the OPTIONS method to check permissions before the actual request.'),
    m('What is required when using credentials: true?', ['Wildcard origin (*)', 'Specific origin (not *)', 'No origin header', 'Any origin'], 1, 'When credentials are enabled, a specific origin must be specified (not wildcard).'),
    m('What npm package enables CORS in Express?', ['helmet', 'cors', 'express-cors', 'cors-handler'], 1, 'The cors package provides Express middleware for configuring CORS headers.'),
    m('What is a simple CORS request?', ['Any request with custom headers', 'GET, HEAD, POST with standard content types', 'PUT requests', 'DELETE requests'], 1, 'Simple requests are GET, HEAD, POST with standard content types and no custom headers.'),
    m('What does maxAge control?', ['Cookie expiry', 'How long preflight is cached', 'Request timeout', 'Session duration'], 1, 'maxAge specifies how many seconds the browser can cache the preflight response.')
  ]
);

/* =================== TOPIC 13: COOKIE PARSER =================== */
addTopic('express-cookie-parser', 'Cookie Parser', 'beginner', 15,
  ['Cookie parser middleware parses the Cookie header from incoming requests and populates req.cookies with an object keyed by cookie names.',
   'Supports signed cookies for integrity verification, preventing tampering by using a secret key to sign cookie values.',
   'Res.cookie() sets cookies on responses with options like maxAge, httpOnly, secure, sameSite, path, domain, and signed.',
   'Cookie options: httpOnly (not accessible via JS), secure (HTTPS only), sameSite (CSRF protection: strict, lax, none), maxAge/expires (lifetime).'
  ],
  'Cookie parser is like a mail sorter that opens all envelopes (cookies) from a package (request) and organizes them by sender name (cookie name) into separate piles (req.cookies object).',
  [
    d('Parsing Unsigned Cookies', 'cookie-parser reads the Cookie header from requests and parses it into req.cookies. Example: Cookie: name=John; token=abc -> req.cookies = { name: \'John\', token: \'abc\' }. Supports JSON cookies. Handles URL encoding/decoding automatically.'),
    d('Signed Cookies', 'Signed cookies use a secret key to create a signature: s:value.signature. cookie-parser verifies the signature and populates req.signedCookies. If signature is invalid, the cookie is rejected. Useful for session IDs, auth tokens stored in cookies.'),
    d('Setting Cookies with res.cookie()', 'Express provides res.cookie(name, value, options) for setting cookies. Options: maxAge (ms), httpOnly (prevent JS access), secure (HTTPS only), sameSite (CSRF protection), path (URL scope), domain (domain scope), signed (sign the cookie). Multiple cookies can be set sequentially.'),
    d('Cookie Options and Security', 'httpOnly: prevents XSS from reading cookies. secure: ensures cookies only sent over HTTPS in production. sameSite: strict (same-site only), lax (same-site + top-level GET), none (cross-site, requires secure). maxAge vs expires: maxAge is relative (ms), expires is absolute date.'),
    d('Clearing and Deleting Cookies', 'res.clearCookie(name, options) removes a cookie. Must match the original path and domain options. Cookie is expired by setting maxAge: 0 or past date. Browser removes expired cookies. Always clear cookies on logout to prevent stale sessions.')
  ],
  'Cookie parser middleware makes working with cookies simple. Parse incoming cookies, set outgoing cookies with security options, and use signed cookies for sensitive data that must not be tampered with.',
  [
    q('What does cookie-parser do?', 'It parses the Cookie header from HTTP requests and populates req.cookies with an object. For signed cookies, it populates req.signedCookies after verifying the signature.'),
    q('What is the difference between req.cookies and req.signedCookies?', 'req.cookies contains unsigned cookies (plain text). req.signedCookies contains cookies that were signed with the secret key. If a signed cookie was tampered with, it is excluded from req.signedCookies.'),
    q('How do you sign a cookie in Express?', 'Set the signed option: res.cookie(\'token\', \'myvalue\', { signed: true }). cookie-parser will sign it using the secret provided during initialization: app.use(cookieParser(\'mySecret\')).'),
    q('What are important cookie security options?', 'httpOnly (prevents XSS reading), secure (HTTPS only), sameSite (CSRF prevention: strict, lax, none), maxAge/expires (lifetime), signed (tamper detection), path and domain (scope restriction).'),
    q('What is the SameSite cookie attribute?', 'SameSite controls when cookies are sent in cross-site requests. Strict: only same-site. Lax: same-site + top-level GET navigations. None: always (requires Secure). Lax is the modern default. None enables cross-site auth with OAuth widgets.'),
    q('How do you remove a cookie?', 'res.clearCookie(\'name\', { path: \'/\' }). This sets the cookie with an expired date, causing the browser to remove it. Must match the original cookie\'s path and domain options.'),
    q('How do you set a cookie\'s expiration?', 'Use maxAge (milliseconds from now) or expires (Date object). res.cookie(\'session\', \'abc\', { maxAge: 3600000 }) expires in 1 hour. res.cookie(\'coupon\', \'SAVE20\', { expires: new Date(\'2025-12-31\') }).'),
    q('What happens if cookie parsing fails?', 'cookie-parser silently fails and returns an empty object for req.cookies. Invalid cookies are ignored. This prevents malformed cookies from crashing the application.'),
    q('How do you handle JSON cookies?', 'cookie-parser automatically parses JSON cookie values if they start with j:. Example: \'j:{\"name\":\"John\"}\' becomes the parsed object. This is useful for complex cookie values.'),
    q('Can cookies be too large?', 'Yes, browsers limit cookie size to ~4KB per cookie and ~50-100 cookies per domain. Store session IDs (small) in cookies, not large objects. Use server-side sessions for large data, with just the session ID in the cookie.')
  ],
  R(10,40,140,35,'#68a063','','Request','Cookie: token=abc') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','cookie-parser','Parse cookies') +
  A(190,75,190,93) +
  R(10,95,130,35,'#28a745','','req.cookies','Unsigned') +
  R(170,95,130,35,'#ffc107','','req.signedCookies','Verified') +
  A(300,113,340,113) +
  R(350,70,120,50,'#e83e8c','','Route Handler','Use cookies') +
  T(240,180,'Cookie Parser: Parse Cookie header into req.cookies and req.signedCookies.',9,'#666','middle'),
  [
    e('Basic cookie-parser Setup', 'Parsing cookies from requests.', codeBlock([
      "const cookieParser = require('cookie-parser');",
      "app.use(cookieParser());",
      "",
      "app.get('/', (req, res) => {",
      "  console.log(req.cookies); // { name: 'John' }",
      "  res.send('Check console');",
      "});"
    ]), 'Initializes cookie-parser without secret (unsigned cookies only). req.cookies contains all parsed cookies.'),
    e('Signed Cookies', 'Using signed cookies for integrity.', codeBlock([
      "app.use(cookieParser('my_secret_key'));",
      "",
      "app.get('/set', (req, res) => {",
      "  res.cookie('session', 'abc123', { signed: true, httpOnly: true });",
      "  res.send('Cookie set');",
      "});",
      "",
      "app.get('/read', (req, res) => {",
      "  console.log(req.signedCookies); // { session: 'abc123' }",
      "  res.json(req.signedCookies);",
      "});"
    ]), 'Sets a signed cookie with httpOnly. Signed cookies verified with secret. Tampered cookies excluded from req.signedCookies.'),
    e('Cookie Options', 'Setting secure and sameSite options.', codeBlock([
      "app.get('/set', (req, res) => {",
      "  res.cookie('preferences', JSON.stringify({ theme: 'dark', lang: 'en' }), {",
      "    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days",
      "    httpOnly: true,",
      "    secure: process.env.NODE_ENV === 'production',",
      "    sameSite: 'lax',",
      "    path: '/'",
      "  });",
      "  res.send('Preferences saved');",
      "});"
    ]), 'Sets a JSON cookie with maxAge, httpOnly, secure (production only), sameSite lax, and root path.'),
    e('Clearing Cookies', 'Removing cookies on logout.', codeBlock([
      "app.post('/logout', (req, res) => {",
      "  res.clearCookie('session', { path: '/' });",
      "  res.clearCookie('preferences', { path: '/' });",
      "  res.json({ message: 'Logged out' });",
      "});"
    ]), 'Clears cookies by expiring them. Must match original path option. Multiple cookies can be cleared.'),
    e('Reading Multiple Cookies', 'Accessing all cookie values.', codeBlock([
      "app.get('/dashboard', (req, res) => {",
      "  const { session, preferences } = req.signedCookies;",
      "  const theme = preferences ? JSON.parse(preferences).theme : 'light';",
      "  if (!session) return res.status(401).send('Not authenticated');",
      "  res.render('dashboard', { theme });",
      "});"
    ]), 'Reads signed session cookie for auth and signed preferences cookie for user settings.')
  ],
  [
    m('What does cookie-parser populate on the request object?', ['req.cookies', 'req.session', 'req.body', 'req.query'], 0, 'cookie-parser populates req.cookies with parsed cookie key-value pairs.'),
    m('How does cookie-parser handle signed cookies?', ['Decrypts them', 'Verifies signature with secret', 'Ignores them', 'Parses as JSON'], 1, 'cookie-parser verifies the signature using the secret key provided during initialization.'),
    m('What cookie option prevents JavaScript from accessing it?', ['secure', 'httpOnly', 'sameSite', 'maxAge'], 1, 'httpOnly prevents client-side JavaScript from accessing the cookie via document.cookie.'),
    m('What method removes a cookie?', ['res.deleteCookie()', 'res.clearCookie()', 'res.removeCookie()', 'res.expireCookie()'], 1, 'res.clearCookie() removes a cookie by setting it with an expired date.'),
    m('What does sameSite: \'lax\' allow?', ['All cross-site requests', 'Same-site + top-level GET navigations', 'Only same-site requests', 'All same-origin requests'], 1, 'Lax mode sends cookies for same-site requests and top-level GET navigations.'),
    m('How do you pass a secret to cookie-parser?', ['As argument to cookieParser()', 'In env variable', 'In config.json', 'In app.set()'], 0, 'Pass the secret as an argument: app.use(cookieParser(\'secret\')).')
  ]
);

/* =================== TOPIC 14: MORGAN =================== */
addTopic('express-morgan', 'Morgan', 'beginner', 15,
  ['Morgan is an HTTP request logger middleware for Express that automatically logs incoming requests with configurable formats and output streams.',
   'Built-in formats: combined (Apache standard), common (Apache common), dev (colorful for development), short, tiny.',
   'Morgan can log to console, file streams, or custom transports, making it useful for both development debugging and production logging with log rotation.',
   'Custom tokens can be defined to log additional data like response time, user ID, or custom headers.'
  ],
  'Morgan is like a security camera that records every visitor to your website. It automatically logs who came (IP), what they wanted (URL), how it was handled (status code), and how long they stayed (response time).',
  [
    d('Built-in Log Formats', 'combined: :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent". dev: :method :url :status :response-time ms - colored by status. short: :remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms. tiny: :method :url :status :res[content-length] - :response-time ms.'),
    d('Stream Configuration', 'Morgan writes to stdout by default. Write to a file: app.use(morgan(\'combined\', { stream: fs.createWriteStream(\'access.log\', { flags: \'a\' }) })). Use rotating-file-stream for log rotation. Combine with winston for structured logging to multiple transports.'),
    d('Custom Tokens', 'Define custom tokens: morgan.token(\'user\', (req, res) => req.user?.id || \'anonymous\'). Use in format string: \':method :url :user\'. Useful for logging authenticated user IDs, custom headers, or response data.'),
    d('Conditional Logging', 'Skip logging for specific routes: morgan(\'combined\', { skip: (req, res) => req.url.startsWith(\'/health\') || res.statusCode < 400 }). Skip function receives req and res. Log all requests in dev, skip health checks in production.'),
    d('Advanced Logging Patterns', 'Use multiple morgan instances: one for dev console (tiny format), one for combined file logs. Use different formats per environment. Combine with winston for production logging with log levels, JSON format, and log rotation. Log slow requests separately for performance monitoring.')
  ],
  'Morgan provides simple, effective HTTP logging for Express applications. Its built-in formats cover common needs, while custom tokens and streams enable advanced logging tailored to specific requirements.',
  [
    q('What is Morgan?', 'Morgan is HTTP request logger middleware for Express. It automatically logs details about incoming requests including method, URL, status code, response time, and other metadata using configurable format strings.'),
    q('What are the built-in Morgan formats?', 'combined (Apache combined log), common (Apache common), dev (color-coded for development), short, and tiny. Each format provides different levels of detail. combined is most verbose; tiny is most concise.'),
    q('How do you log to a file with Morgan?', 'Use the stream option: app.use(morgan(\'combined\', { stream: fs.createWriteStream(\'access.log\', { flags: \'a\' }) })). Use rotating-file-stream package for automatic log rotation based on date or size.'),
    q('How do you create custom Morgan tokens?', 'morgan.token(\'customName\', (req, res) => req.customData). Then use \':customName\' in the format string. Useful for logging user IDs, custom headers, session data, or business-specific information.'),
    q('How do you skip logging for specific routes?', 'Use the skip option: morgan(\'tiny\', { skip: (req, res) => req.path.startsWith(\'/health\') }). Skip function returns true to skip logging. Commonly used for health checks, static files, and successful responses.'),
    q('What is the difference between combined and dev formats?', 'combined is the Apache standard with full details: IP, user, date, method, URL, status, size, referrer, user-agent. dev is compact with color coding: method (colored), URL, status (colored by range), response time. dev is for development, combined for production.'),
    q('How do you use Morgan with Winston for structured logging?', 'Create a writable stream that writes to Winston: const stream = { write: (msg) => logger.info(msg.trim()) }; app.use(morgan(\'combined\', { stream })). Morgan provides the raw log string, Winston provides structured logging with levels and transports.'),
    q('How do you log response time in milliseconds?', 'The :response-time token logs the time between request and response in ms. It is included in tiny and dev formats. Custom formats: \':method :url :status :response-time ms\'.'),
    q('How do you use multiple Morgan instances?', 'app.use(morgan(\'dev\')); app.use(morgan(\'combined\', { stream: writeStream })); The first logs to console in dev format, the second logs to file in combined format. Multiple instances run independently.'),
    q('How do you customize the date format in Morgan?', 'Use :date[format] token: :date[web] (Web format), :date[clf] (Apache common log format), :date[iso] (ISO8601). Custom format: morgan.token(\'date\', () => new Date().toISOString()).')
  ],
  R(10,40,140,35,'#68a063','','Incoming','Request') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Morgan','Logger') +
  A(190,75,190,93) +
  R(10,95,130,35,'#28a745','','Console',':dev format') +
  R(170,95,130,35,'#ffc107','','Log File',':combined format') +
  R(350,40,120,35,'#e83e8c','','Route','Handler') +
  T(240,170,'Morgan: HTTP request logger with configurable formats and output streams.',9,'#666','middle'),
  [
    e('Development Logging', 'Color-coded logs for development.', codeBlock([
      "const morgan = require('morgan');",
      "if (process.env.NODE_ENV === 'development') {",
      "  app.use(morgan('dev'));",
      "}"
    ]), 'Enables color-coded concise logging only in development environment.'),
    e('Production File Logging', 'Apache combined format to file.', codeBlock([
      "const fs = require('fs');",
      "const path = require('path');",
      "",
      "const accessStream = fs.createWriteStream(",
      "  path.join(__dirname, 'access.log'),",
      "  { flags: 'a' }",
      ");",
      "app.use(morgan('combined', { stream: accessStream }));"
    ]), 'Logs in Apache combined format to a log file. Flag \'a\' appends to existing file.'),
    e('Custom Token for User ID', 'Log authenticated user info.', codeBlock([
      "morgan.token('user', (req, res) => req.user?.id || 'anonymous');",
      "morgan.token('role', (req, res) => req.user?.role || 'public');",
      "",
      "app.use(morgan(':method :url :status :user[role] - :response-time ms'));"
    ]), 'Custom tokens log user ID and role from request. Falls back to anonymous/public for unauthenticated.'),
    e('Skip Health Checks', 'Exclude monitoring traffic.', codeBlock([
      "app.use(morgan('combined', {",
      "  skip: (req, res) => {",
      "    return req.url === '/health' || req.url === '/ready';",
      "  }",
      "}));"
    ]), 'Skips logging for health check and readiness probe endpoints.'),
    e('Multiple Log Streams', 'Console + file + error log.', codeBlock([
      "const accessLog = fs.createWriteStream('access.log', { flags: 'a' });",
      "const errorLog = fs.createWriteStream('error.log', { flags: 'a' });",
      "",
      "app.use(morgan('tiny', {",
      "  stream: {",
      "    write: (msg) => {",
      "      accessLog.write(msg);",
      "      if (msg.includes(' 4') || msg.includes(' 5')) errorLog.write(msg);",
      "    }",
      "  }",
      "}));"
    ]), 'Custom stream writes all logs to access.log and error responses (4xx, 5xx) also to error.log.')
  ],
  [
    m('What format provides color-coded development logs?', ['combined', 'common', 'dev', 'tiny'], 2, 'The dev format provides color-coded output suitable for development.'),
    m('How do you log response time with Morgan?', [':response-time', ':duration', ':latency', ':elapsed'], 0, ':response-time logs the response time in milliseconds.'),
    m('What option controls where Morgan writes logs?', ['output', 'stream', 'file', 'target'], 1, 'The stream option controls where Morgan writes its log output.'),
    m('What is the most verbose Morgan format?', ['tiny', 'short', 'combined', 'dev'], 2, 'The combined format is the most verbose, following the Apache combined log format.'),
    m('How do you define a custom Morgan token?', ['morgan.add()', 'morgan.token()', 'morgan.format()', 'morgan.define()'], 1, 'morgan.token() defines a custom token that can be used in format strings.'),
    m('What does the skip option accept?', ['Boolean', 'Function returning boolean', 'String', 'Array'], 1, 'The skip option is a function (req, res) that returns true to skip logging.')
  ]
);

/* =================== TOPIC 15: API VERSIONING =================== */
addTopic('express-api-versioning', 'API Versioning', 'intermediate', 20,
  ['API versioning allows your API to evolve and introduce breaking changes without disrupting existing clients. Multiple versions can coexist simultaneously.',
   'Common strategies: URL prefix (/api/v1/, /api/v2/), custom request header (Accept: application/vnd.myapp.v1+json), query parameter (?version=1), and subdomain (v1.api.example.com).',
   'Express supports versioning through multiple routers, conditional middleware, or dedicated versioned route files.',
   'Best practices: version from day one, deprecate with notice, maintain backward compatibility when possible, document changes between versions.'
  ],
  'API versioning is like having different editions of a textbook. The 2nd edition adds new chapters and corrections, but the 1st edition is still available for students who already started using it.',
  [
    d('URL Prefix Versioning', 'Most common approach: /api/v1/users, /api/v2/users. In Express, create separate routers for each version: const v1Router = require(\'./routes/v1\'); const v2Router = require(\'./routes/v2\'); app.use(\'/api/v1\', v1Router); app.use(\'/api/v2\', v2Router). Simple, explicit, cache-friendly.'),
    d('Header-Based Versioning', 'Client specifies version via Accept header or custom header: Accept: application/vnd.myapp.v2+json. Middleware reads the header and routes to the appropriate handler. Keeps URLs clean. More complex to implement and test. Less visible to developers compared to URL versioning.'),
    d('Query Parameter Versioning', 'Client includes version in query: /api/users?version=2. Middleware checks req.query.version and routes accordingly. Simple but pollutes URLs, caching can be problematic, and version becomes part of the cache key. Not recommended for public APIs.'),
    d('Implementation Patterns', 'Pattern 1: Separate routers per version (recommended). Pattern 2: Version check middleware that selects handler. Pattern 3: Single router with versioned controllers. Pattern 1 is cleanest: version files are independent, easy to deprecate, and changes are isolated.'),
    d('Version Deprecation Strategy', 'Communicate deprecation via response headers (Sunset, Deprecation). Maintain old versions for a defined period (6-12 months). Log client usage to understand adoption. Redirect old versions to documentation with migration guides. Eventually return 410 Gone for fully deprecated versions.')
  ],
  'API versioning is essential for maintaining backward compatibility as your API evolves. URL prefix versioning with separate Express routers is the most practical approach. Plan deprecation with clear timelines and communication.',
  [
    q('Why is API versioning important?', 'It allows you to make breaking changes to your API (new fields, removed endpoints, changed behavior) without disrupting existing clients. Clients can migrate at their own pace while the old version remains functional.'),
    q('What are the main API versioning strategies?', 'URL prefix (/api/v1/), header-based (Accept header), query parameter (?version=1), and subdomain (v1.api.example.com). URL prefix is most common for Express APIs due to its simplicity and explicit visibility.'),
    q('How do you implement URL versioning in Express?', 'Create separate router files for each version. Mount at version-specific prefixes: app.use(\'/api/v1\', v1Router); app.use(\'/api/v2\', v2Router). Each router is independent and can evolve separately.'),
    q('What is header-based versioning?', 'The client specifies the desired version in an HTTP header (Accept: application/vnd.myapp.v2+json). Middleware parses the header and routes to the appropriate controller or version handler. URLs remain clean but the version is less discoverable.'),
    q('How do you deprecate an API version?', 'Add Sunset and Deprecation headers to responses. Log deprecated version usage to identify clients. Maintain old version for a defined period (e.g., 6 months minimum). Provide clear migration guides. Announce deprecation timeline well in advance.'),
    q('What is the best Express pattern for versioning?', 'Separate routers per version. Each version gets its own directory with routes, controllers, validators, and middleware. This isolates changes, makes deprecation easy (just remove the router), and allows different middleware per version.'),
    q('How do you handle shared logic across versions?', 'Extract common logic into shared modules (utils/, middleware/, validators/). Import into version-specific routers. Avoid sharing controllers across versions as they tend to diverge. Use adapters to transform data between versions if needed.'),
    q('What headers indicate API deprecation?', 'Deprecation: true (indicates the version is deprecated). Sunset: HTTP-date (when the version will be removed). Link: <https://docs.example.com/migration>; rel="deprecation" (link to migration guide). These help clients prepare for removal.'),
    q('How do you handle default versioning for unversioned requests?', 'Create a default router (e.g., /api) that redirects or serves the latest version. Or return a 300 Multiple Choices with available versions. Better to require explicit versioning from day one.'),
    q('What are the downsides of query parameter versioning?', 'URL pollution (version clutters query string), caching issues (version must be part of cache key), less RESTful (version is not part of the resource identifier), and easier for clients to forget to include.')
  ],
  R(10,40,120,35,'#68a063','','/api/v1/users','Version 1 Router') +
  R(10,90,120,35,'#0070f3','','/api/v2/users','Version 2 Router') +
  R(10,140,120,35,'#ffc107','','/api/v3/users','Version 3 Router') +
  A(130,58,160,58) + A(130,108,160,108) + A(130,158,160,158) +
  R(170,40,140,160,'#28a745','','Express App','Mounts versioned routers independently') +
  T(240,230,'API Versioning: URL-prefix versioning with independent Express routers per version.',9,'#666','middle'),
  [
    e('URL Prefix Versioning', 'Separate routers per version.', codeBlock([
      "// routes/v1/users.js",
      "const router = require('express').Router();",
      "router.get('/', v1Controller.list);",
      "router.post('/', v1Validation.create, v1Controller.create);",
      "module.exports = router;",
      "",
      "// app.js",
      "app.use('/api/v1', require('./routes/v1/users'));",
      "app.use('/api/v2', require('./routes/v2/users'));"
    ]), 'Clean separation: v1 and v2 routes in dedicated files, mounted at different URL prefixes.'),
    e('Header-Based Versioning Middleware', 'Routing via Accept header.', codeBlock([
      "const versionRouter = require('express').Router();",
      "",
      "versionRouter.all('*', (req, res, next) => {",
      "  const accept = req.headers['accept'] || '';",
      "  if (accept.includes('vnd.myapp.v2')) {",
      "    req.version = 2;",
      "  } else {",
      "    req.version = 1;",
      "  }",
      "  next();",
      "});",
      "",
      "app.use('/api', versionRouter);"
    ]), 'Parses Accept header to set req.version. Controllers use req.version to branch behavior.'),
    e('Versioned Response Transformation', 'Return different data per version.', codeBlock([
      "function userResponse(user, version) {",
      "  const base = { id: user.id, name: user.name };",
      "  if (version >= 2) {",
      "    return { ...base, email: user.email, role: user.role };",
      "  }",
      "  return base;",
      "}",
      "",
      "router.get('/:id', (req, res) => {",
      "  const user = users[req.params.id];",
      "  res.json(userResponse(user, req.version || 1));",
      "});"
    ]), 'Response shape changes based on version. v1 returns minimal fields, v2 adds email and role.'),
    e('Deprecation Headers Middleware', 'Notifying clients of deprecation.', codeBlock([
      "function deprecated(version, sunsetDate) {",
      "  return (req, res, next) => {",
      "    if (req.path.startsWith(`/api/v${version}`)) {",
      "      res.set('Deprecation', 'true');",
      "      res.set('Sunset', new Date(sunsetDate).toUTCString());",
      "      res.set('Link', '<https://docs.example.com/migration>; rel=\"deprecation\"');",
      "    }",
      "    next();",
      "  };",
      "}",
      "app.use(deprecated(1, '2025-06-01'));"
    ]), 'Adds deprecation headers to all v1 responses, informing clients about sunset date and migration guide.'),
    e('Shared Logic Across Versions', 'Reusable validation and middleware.', codeBlock([
      "// shared/validators.js",
      "function validateEmail(email) {",
      "  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);",
      "}",
      "",
      "// routes/v1/users.js",
      "const { validateEmail } = require('../shared/validators');",
      "",
      "// routes/v2/users.js",
      "const { validateEmail } = require('../shared/validators');"
    ]), 'Shared modules are imported by all version routers. Common logic stays in one place without duplication.')
  ],
  [
    m('What is the most common API versioning strategy for Express?', ['Header-based', 'URL prefix', 'Query parameter', 'Subdomain'], 1, 'URL prefix versioning (/api/v1/, /api/v2/) is the most common approach for Express APIs.'),
    m('How should shared logic be handled across versions?', ['Duplicated per version', 'Extracted to shared modules', 'In the main app.js', 'In environment config'], 1, 'Shared logic should be extracted to shared modules and imported by each version router.'),
    m('What header indicates an API version is deprecated?', ['Warning', 'Deprecation', 'Sunset', 'X-Deprecated'], 1, 'The Deprecation header indicates that a version is deprecated.'),
    m('What header indicates when a deprecated version will be removed?', ['Sunset', 'Expires', 'Retry-After', 'Remove-At'], 0, 'The Sunset header specifies when a deprecated version will be removed (HTTP-date format).'),
    m('Which versioning approach pollutes URLs?', ['Header-based', 'URL prefix', 'Query parameter', 'Subdomain'], 2, 'Query parameter versioning (?version=1) pollutes the URL with version information.'),
    m('Why separate version routers are recommended?', ['They share code', 'Changes are isolated per version', 'They are faster', 'They reduce memory'], 1, 'Separate routers isolate changes per version, making deprecation and maintenance simpler.')
  ]
);

/* =================== OUTPUT =================== */
var dataJs = 'var TOPICS_DATA = TOPICS_DATA || {};\n';
dataJs += 'TOPICS_DATA["express"] = TOPICS_DATA["express"] || {};\n\n';
for (var id in topics) {
  var t = topics[id];
  dataJs += 'TOPICS_DATA["express"]["' + id + '"] = ' + JSON.stringify(t, null, 2) + ';\n\n';
}
fs.writeFileSync('topics-data.js', dataJs, 'utf8');
console.log('Generated topics-data.js');

var metaList = topicList.map(function(t) {
  return { id: t.id, title: t.title, difficulty: t.difficulty, estimatedMinutes: t.estimatedMinutes, file: t.file };
});
fs.writeFileSync('topics.json', JSON.stringify(metaList, null, 2), 'utf8');
console.log('Generated topics.json');

console.log('Total topics: ' + topicList.length);
